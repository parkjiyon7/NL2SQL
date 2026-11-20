"""FIN_DEMO Text-to-SQL 툴 (B안). wxdi 제품 Text-to-SQL로 SQL을 만들고, Db2에서 실행한다.

계약: shared/spec/tool-contract.md. 실패해도 예외를 던지지 않고 error 필드를 채운다.
연결(connection)
  findemo_wxdi : url, api_key, project_id
  findemo_db2  : host, port, database, user, password, ssl_cert_b64(PEM을 base64, '=' 패딩 제거)
"""
import base64
import os
import re
import tempfile
import time
from concurrent.futures import ThreadPoolExecutor
from typing import Any, Dict, List, Optional

import requests
from ibm_watsonx_orchestrate.agent_builder.connections import ConnectionType, ExpectedCredentials
from ibm_watsonx_orchestrate.agent_builder.tools import ToolPermission, tool
from ibm_watsonx_orchestrate.run import connections

WXDI_APP = "findemo_wxdi"
DB2_APP = "findemo_db2"

# Text-to-SQL에 넘기는 고정 규칙. Db2 문법과 한국어 날짜, 숫자 표현만 둔다. 업무 용어, 조인 경로, 데이터 값 위치는 두지 않는다.
#  - 업무 용어의 뜻: wxdi 용어집이 정의하고, 에이전트가 map_terms로 읽어 glossary_hints로 넘긴다.
#  - 조인 경로: wxdi 카탈로그의 FK(foreign_keys.join_condition)를 generate_sql이 읽는다.
# 용어 정의와 조인 조건은 wxdi 제품이 LLM에 자동으로 넘기지 않으므로, 질문 뒤에 "Note:"로 붙여 보낸다(공식 질문별 보충 방식).
INSTRUCTIONS = [
    'Use only tables in the FIN_DEMO schema. Write schema and table as separate quoted identifiers, e.g. "FIN_DEMO"."PRODUCT", never "FIN_DEMO.PRODUCT".',
    "Dates use Db2 syntax: 어제 is CURRENT DATE - 1 DAY, compared with DATE(EXEC_TS) or DATE(ORDER_TS). A month such as 3월 means MONTH(date) = 3; never assume a year unless the question gives one. 이번 달 means YEAR(date) = YEAR(CURRENT DATE) AND MONTH(date) = MONTH(CURRENT DATE). Whenever results are grouped by month (monthly trend, per-month comparison), group by both YEAR(date) and MONTH(date), never by MONTH alone, because the data spans more than 12 months.",
    'Db2 quoted identifiers are case sensitive. Always write table and column names in UPPERCASE exactly as in the catalog, e.g. "EXEC_AMOUNT", never "exec_amount".',
    "When joining tables, qualify every column with its table name or alias, including in GROUP BY, HAVING and SELECT, so that no column such as DESK_ID is ambiguous.",
    "Korean number units: 1억 = 100000000, 1만 = 10000, 1조 = 1000000000000.",
]


def build_note(glossary_hints: Optional[List[str]], joins: List[str]) -> str:
    """질문 뒤에 붙일 Note. 틀 문구만 코드에 있고, 용어 정의는 wxdi 용어집, 조인 조건은 wxdi 카탈로그가 원본이다."""
    parts = []
    if glossary_hints:
        parts.append("Business glossary from watsonx.data intelligence. Interpret these terms exactly as defined: "
                     + " | ".join(glossary_hints) + ".")
    if joins:
        parts.append("Join tables only with these foreign keys defined in the watsonx.data intelligence catalog and never "
                     "invent other join columns: " + "; ".join(joins))
    return ("\nNote: " + " ".join(parts)) if parts else ""


_token_cache: Dict[str, Any] = {"token": None, "exp": 0.0}
_catalog_cache: Dict[str, Any] = {"val": None, "exp": 0.0}


def _ms(t0: float) -> int:
    return int((time.time() - t0) * 1000)


def _cfg(app_id: str, *keys: str) -> Dict[str, str]:
    """연결의 key-value를 읽고, 빠진 키가 있으면 어떤 키가 있는지 알려준다."""
    cfg = dict(connections.key_value(app_id))
    missing = [k for k in keys if k not in cfg]
    if missing:
        raise KeyError(f"connection {app_id}: missing {missing}, available keys {sorted(cfg)}")
    return cfg


def _iam_token(api_key: str) -> str:
    if _token_cache["token"] and time.time() < _token_cache["exp"] - 60:
        return _token_cache["token"]
    r = requests.post(
        "https://iam.cloud.ibm.com/identity/token",
        data={"grant_type": "urn:ibm:params:oauth:grant-type:apikey", "apikey": api_key},
        timeout=30,
    )
    r.raise_for_status()
    body = r.json()
    _token_cache["token"] = body["access_token"]
    _token_cache["exp"] = time.time() + int(body.get("expires_in", 3600))
    return _token_cache["token"]


def load_catalog_info(cfg: Dict[str, str]) -> Dict[str, Any]:
    """wxdi 카탈로그(프로젝트 자산, 태그 FIN_DEMO)에서 테이블명, FK 조인 조건, 연결 ID를 읽는다. 5분 캐시."""
    if _catalog_cache["val"] and time.time() < _catalog_cache["exp"]:
        return _catalog_cache["val"]
    base, pid = cfg["url"].rstrip("/"), cfg["project_id"]
    headers = {"Authorization": f"Bearer {_iam_token(cfg['api_key'])}", "Content-Type": "application/json"}
    r = requests.post(f"{base}/v2/asset_types/asset/search", headers=headers, timeout=60,
                      params={"project_id": pid, "limit": 100}, json={"query": "asset.tags:FIN_DEMO"})
    r.raise_for_status()
    ids = [it["metadata"]["asset_id"] for it in r.json().get("results", [])]

    def fetch(asset_id: str) -> dict:
        return requests.get(f"{base}/v2/assets/{asset_id}", headers=headers, timeout=60, params={"project_id": pid}).json()

    with ThreadPoolExecutor(max_workers=8) as pool:
        assets = list(pool.map(fetch, ids))
    tables: List[str] = []
    joins: List[str] = []
    conns: List[str] = []
    for a in assets:
        entity = a.get("entity", {})
        if not entity.get("data_asset", {}).get("columns"):
            continue  # 제약 조건 자산 등 테이블이 아닌 것
        tables.append(a["metadata"]["name"])
        disc = entity.get("discovered_asset", {})
        if disc.get("connection_id") and disc["connection_id"] not in conns:
            conns.append(disc["connection_id"])
        for p in disc.get("extended_metadata", []):
            if p["name"] == "foreign_keys":
                joins += [fk["join_condition"] for fk in p["value"] if fk.get("join_condition")]
    if not tables:
        raise RuntimeError("wxdi 카탈로그에서 FIN_DEMO 태그 테이블을 찾지 못했다")
    val = {"tables": sorted(tables), "joins": sorted(joins), "connection_ids": conns}
    _catalog_cache.update(val=val, exp=time.time() + 300)
    return val


def fix_qualifiers(sql: str, tables: List[str]) -> str:
    """Db2는 FROM에 "FIN_DEMO"."T"로 쓴 테이블의 컬럼을 "T"."C"로 한정하면 SQL0206을 낸다. 별칭이 아니면 스키마를 붙여 고친다."""
    bare = re.compile(r'(?<![\w."])"(' + "|".join(map(re.escape, tables)) + r')"\.(?=")')
    aliased = set(re.findall(r'"(\w+)"\s*(?:AS\s+)?"\1"', sql, re.I))
    return bare.sub(lambda m: m.group(0) if m.group(1) in aliased else f'"FIN_DEMO"."{m.group(1)}".', sql)


def call_wxdi(cfg: Dict[str, str], question: str, retry: Optional[List[Dict[str, str]]] = None,
              glossary_hints: Optional[List[str]] = None) -> dict:
    """카탈로그의 FK와 용어 정의를 질문 뒤에 Note로 붙여 wxdi generate_queries를 부른다. 결과에 tables를 함께 돌려준다."""
    info = load_catalog_info(cfg)
    params: Dict[str, Any] = {
        "type": "sql",
        "sql_dialect": "db2",
        "instructions": list(INSTRUCTIONS),
        "context": {"containers": [{"container_id": cfg["project_id"], "container_type": "project"}],
                    "connection_ids": info["connection_ids"]},
    }
    if retry:
        params["retry_on_error"] = retry
    r = requests.post(
        f"{cfg['url'].rstrip('/')}/semantic_automation/v1/generate_queries",
        params={"top_n": 1},
        headers={"Authorization": f"Bearer {_iam_token(cfg['api_key'])}", "Content-Type": "application/json"},
        json={"input_question": question + build_note(glossary_hints, info["joins"]), "parameters": params},
        timeout=180,
    )
    if r.status_code >= 400:
        raise RuntimeError(f"HTTP {r.status_code}: {r.text[:300]}")
    res = r.json()["results"][0]
    res["tables"] = info["tables"]
    return res


@tool(permission=ToolPermission.READ_ONLY,
      expected_credentials=[ExpectedCredentials(app_id=WXDI_APP, type=ConnectionType.KEY_VALUE)])
def generate_sql(question: str, previous_sql: Optional[str] = None, previous_error: Optional[str] = None,
                 glossary_hints: Optional[List[str]] = None) -> dict:
    """Convert a Korean business question into a Db2 SQL query for the FIN_DEMO schema using the watsonx.data intelligence Text-to-SQL service. It only generates SQL and does not run it. If a previous SQL failed, pass previous_sql and previous_error to get a corrected query.

    Args:
        question (str): The user question in natural language, for example "삼성전자 어제 체결 중 매수만 보여줘".
        previous_sql (Optional[str]): A SQL generated earlier that failed or returned a wrong result. Leave empty on the first attempt.
        previous_error (Optional[str]): The error message returned when previous_sql was run. Leave empty on the first attempt.
        glossary_hints (Optional[List[str]]): The glossary_hints list returned by map_terms for this question, passed through unchanged. Leave empty if map_terms found no terms.
    Returns:
        dict: ok, sql, score, engine, elapsed_ms, error. error is null on success.
    """
    t0 = time.time()
    out: Dict[str, Any] = {"ok": False, "sql": None, "score": None, "engine": "wxdi_text2sql", "elapsed_ms": 0, "error": None}
    try:
        cfg = _cfg(WXDI_APP, "url", "api_key", "project_id")
        retry = [{"original_query": previous_sql, "error": previous_error}] if previous_sql and previous_error else None
        res = call_wxdi(cfg, question, retry, glossary_hints)
        sql = fix_qualifiers(res["generated_query"].strip().rstrip(";"), res["tables"])
        out.update(sql=sql, score=res.get("score"), ok=True)
    except Exception as exc:  # noqa: BLE001
        out["error"] = {"type": "generation", "message": f"{type(exc).__name__}: {exc}"[:300]}
    out["elapsed_ms"] = _ms(t0)
    return out


def _error_type(msg: str) -> str:
    if re.search(r"SQL0104N|SQL0199N|SQL0103N|SQL0105N", msg):
        return "syntax"
    if re.search(r"SQL0204N|SQL0206N|SQL0203N", msg):
        return "unknown_object"
    if "SQL0952N" in msg or "timeout" in msg.lower():
        return "timeout"
    return "execution"


@tool(permission=ToolPermission.READ_ONLY,
      expected_credentials=[ExpectedCredentials(app_id=DB2_APP, type=ConnectionType.KEY_VALUE)])
def run_sql(sql: str, max_rows: int = 200) -> dict:
    """Run one read-only SELECT statement on the FIN_DEMO Db2 database and return the rows. Only SELECT or WITH statements are accepted. Use this for every SQL execution; there is no other database access.

    Args:
        sql (str): One Db2 SELECT statement.
        max_rows (int): Maximum number of rows to return. Default 200.
    Returns:
        dict: ok, columns, rows, row_count, truncated, executed_sql, elapsed_ms, engine, error. error is null on success, otherwise an object with type and message.
    """
    t0 = time.time()
    out: Dict[str, Any] = {"ok": False, "columns": [], "rows": [], "row_count": 0, "truncated": False,
                           "executed_sql": sql, "elapsed_ms": 0, "engine": "db2", "error": None}
    statement = sql.strip().rstrip(";").strip()
    if ";" in statement or not re.match(r"(?is)^\s*(select|with)\b", statement):
        out["error"] = {"type": "blocked", "message": "Only a single SELECT statement is allowed."}
        out["elapsed_ms"] = _ms(t0)
        return out
    cert_path = None
    conn = None
    try:
        import ibm_db  # 런타임에만 필요

        cfg = _cfg(DB2_APP, "host", "port", "database", "user", "password", "ssl_cert_b64")
        pem = base64.b64decode(cfg["ssl_cert_b64"] + "=" * (-len(cfg["ssl_cert_b64"]) % 4))
        fd, cert_path = tempfile.mkstemp(suffix=".crt")
        with os.fdopen(fd, "wb") as f:
            f.write(pem)
        dsn = (f"DATABASE={cfg['database']};HOSTNAME={cfg['host']};PORT={cfg['port']};PROTOCOL=TCPIP;"
               f"UID={cfg['user']};PWD={cfg['password']};SECURITY=SSL;SSLServerCertificate={cert_path};")
        conn = ibm_db.connect(dsn, "", "")
        stmt = ibm_db.exec_immediate(conn, statement)
        cols = [ibm_db.field_name(stmt, i) for i in range(ibm_db.num_fields(stmt))]
        rows: List[List[Any]] = []
        row = ibm_db.fetch_tuple(stmt)
        while row:
            if len(rows) >= max_rows:
                out["truncated"] = True
                break
            rows.append([v if isinstance(v, (int, float, str, type(None))) else str(v) for v in row])
            row = ibm_db.fetch_tuple(stmt)
        out.update(ok=True, columns=cols, rows=rows, row_count=len(rows))
    except Exception as exc:  # noqa: BLE001
        msg = str(exc)
        out["error"] = {"type": _error_type(msg), "message": msg.splitlines()[0][:400] if msg else type(exc).__name__}
    finally:
        if conn is not None:
            try:
                ibm_db.close(conn)
            except Exception:  # noqa: BLE001
                pass
        if cert_path:
            try:
                os.remove(cert_path)
            except OSError:
                pass
    out["elapsed_ms"] = _ms(t0)
    return out
