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
from typing import Any, Dict, List, Optional

import requests
from ibm_watsonx_orchestrate.agent_builder.connections import ConnectionType, ExpectedCredentials
from ibm_watsonx_orchestrate.agent_builder.tools import ToolPermission, tool
from ibm_watsonx_orchestrate.run import connections

WXDI_APP = "findemo_wxdi"
DB2_APP = "findemo_db2"

# Text-to-SQL에 넘기는 도메인 규칙 (최대 10개). 용어집과 별개로 조인 경로 같은 규칙을 못 박는다.
INSTRUCTIONS = [
    'Use only tables in the FIN_DEMO schema. Write schema and table as separate quoted identifiers, e.g. "FIN_DEMO"."PRODUCT", never "FIN_DEMO.PRODUCT".',
    "EXECUTIONS has no account or customer column. Join EXECUTIONS.ORDER_ID = ORDERS.ORDER_ID, ORDERS.ACCOUNT_ID = ACCOUNT.ACCOUNT_ID, ACCOUNT.CUSTOMER_ID = CUSTOMER.CUSTOMER_ID, CUSTOMER.BRANCH_CODE = BRANCH.BRANCH_CODE. The product of an execution is ORDERS.PRODUCT_CODE = PRODUCT.PRODUCT_CODE.",
    "Stock names such as 삼성전자 are values of PRODUCT.PRODUCT_NAME. Branch names such as 강남지점 are values of BRANCH.BRANCH_NAME. Always filter by these name columns through the joins. ORDERS.SIDE is 'BUY' for 매수 and 'SELL' for 매도.",
    "거래대금, 약정, 체결대금 all mean SUM(EXECUTIONS.EXEC_AMOUNT).",
    "업종 means PRODUCT.SECTOR. 업종 내 순위 means RANK() OVER (PARTITION BY PRODUCT.SECTOR ORDER BY SUM(EXEC_AMOUNT) DESC).",
    "Desk limit usage (한도 소진율) = SUM(ST_POSITIONS.EXPOSURE_AMOUNT) per desk on the latest BASE_DATE divided by DESK.LIMIT_AMOUNT. Aggregate per desk with GROUP BY and compare with HAVING, never per row.",
    "Dates use Db2 syntax: 어제 is CURRENT DATE - 1 DAY, compared with DATE(EXEC_TS) or DATE(ORDER_TS). A month such as 3월 means MONTH(date) = 3; never assume a year unless the question gives one. A monthly trend groups by YEAR(EXEC_TS) and MONTH(EXEC_TS) of the execution time, never by MONTH alone.",
    'Db2 quoted identifiers are case sensitive. Always write table and column names in UPPERCASE exactly as in the catalog, e.g. "EXEC_AMOUNT", never "exec_amount".',
    "When joining tables, qualify every column with its table name or alias, including in GROUP BY, HAVING and SELECT, so that no column such as DESK_ID is ambiguous.",
    "Korean number units: 1억 = 100000000, 1만 = 10000, 1조 = 1000000000000. A customer's 총자산 or 잔고 is CUSTOMER.TOTAL_ASSETS; use BALANCE_DAILY only for daily or per-account balances. ACCOUNT.CUSTOMER_ID joins CUSTOMER.CUSTOMER_ID; never join ACCOUNT_ID to CUSTOMER_ID.",
]

_token_cache: Dict[str, Any] = {"token": None, "exp": 0.0}


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


# 생성기가 자주 틀리는 패턴. 걸리면 retry_on_error로 다시 생성한다(최대 GUARD_RETRIES회).
GUARD_RETRIES = 3
_BAD_EXEC_JOIN = re.compile(
    r'"?EXEC_ID"?\s*=\s*(?:"?\w+"?\.)*"?ORDER_ID"?|"?ORDER_ID"?\s*=\s*(?:"?\w+"?\.)*"?EXEC_ID"?', re.I)
_BAD_ACCOUNT_JOIN = re.compile(
    r'"?ACCOUNT_ID"?\s*=\s*(?:"?\w+"?\.)*"?CUSTOMER_ID"?|"?CUSTOMER_ID"?\s*=\s*(?:"?\w+"?\.)*"?ACCOUNT_ID"?', re.I)
_BASE_DATE_FILTER = re.compile(r'BASE_DATE"?\s*(=|>=|<=|>|<|BETWEEN)', re.I)


_TABLES = ("BRANCH", "CUSTOMER", "ACCOUNT", "PRODUCT", "ORDERS", "EXECUTIONS", "BALANCE_DAILY", "DESK", "ST_POSITIONS")
_BARE_QUALIFIER = re.compile(r'(?<![\w."])"(' + "|".join(_TABLES) + r')"\.(?=")')


def fix_qualifiers(sql: str) -> str:
    """Db2는 FROM에 "FIN_DEMO"."T"로 쓴 테이블의 컬럼을 "T"."C"로 한정하면 SQL0206을 낸다. 별칭이 아니면 스키마를 붙여 고친다."""
    aliased = set(re.findall(r'"(\w+)"\s*(?:AS\s+)?"\1"', sql, re.I))
    return _BARE_QUALIFIER.sub(lambda m: m.group(0) if m.group(1) in aliased else f'"FIN_DEMO"."{m.group(1)}".', sql)


def check_sql(sql: str) -> Optional[str]:
    """알려진 오류 패턴이 있으면 생성기에 돌려줄 오류 설명을, 없으면 None을 돌려준다."""
    if _BAD_EXEC_JOIN.search(sql):
        return ("Wrong join: EXECUTIONS.EXEC_ID is the execution's own key and is not related to ORDERS.ORDER_ID. "
                "Join EXECUTIONS.ORDER_ID = ORDERS.ORDER_ID.")
    if _BAD_ACCOUNT_JOIN.search(sql):
        return "Wrong join: ACCOUNT_ID and CUSTOMER_ID are different keys. Join ORDERS.ACCOUNT_ID = ACCOUNT.ACCOUNT_ID and ACCOUNT.CUSTOMER_ID = CUSTOMER.CUSTOMER_ID."
    if re.search(r"EXEC_AMOUNT", sql, re.I) and re.search(r'BALANCE_DAILY|ST_POSITIONS', sql, re.I):
        return ("Wrong tables: 거래대금 is SUM(EXECUTIONS.EXEC_AMOUNT) and needs only EXECUTIONS (plus ORDERS, PRODUCT, ACCOUNT, CUSTOMER, BRANCH when grouping). "
                "Do not join BALANCE_DAILY or ST_POSITIONS; use EXECUTIONS.EXEC_TS for dates.")
    group_by = re.search(r"GROUP\s+BY(.*?)(?:ORDER\s+BY|HAVING|$)", sql, re.I | re.S)
    if group_by and re.search(r"MONTH", group_by.group(1), re.I) and not re.search(r"YEAR|TO_CHAR|VARCHAR_FORMAT", group_by.group(1), re.I):
        return ("Monthly grouping must include the year: GROUP BY YEAR(EXECUTIONS.EXEC_TS), MONTH(EXECUTIONS.EXEC_TS), "
                "because the data spans 14 months and the same month number occurs twice.")
    if re.search(r"ST_POSITIONS", sql, re.I) and not _BASE_DATE_FILTER.search(sql):
        return ("ST_POSITIONS holds many BASE_DATE rows per desk. Filter to the latest day: "
                'WHERE BASE_DATE = (SELECT MAX(BASE_DATE) FROM "FIN_DEMO"."ST_POSITIONS"), then aggregate per desk.')
    return None


def _call_wxdi(cfg: Dict[str, str], question: str, retry: Optional[List[Dict[str, str]]]) -> dict:
    params: Dict[str, Any] = {
        "type": "sql",
        "sql_dialect": "db2",
        "instructions": INSTRUCTIONS,
        "context": {"containers": [{"container_id": cfg["project_id"], "container_type": "project"}]},
    }
    if retry:
        params["retry_on_error"] = retry
    r = requests.post(
        f"{cfg['url'].rstrip('/')}/semantic_automation/v1/generate_queries",
        params={"top_n": 1},
        headers={"Authorization": f"Bearer {_iam_token(cfg['api_key'])}", "Content-Type": "application/json"},
        json={"input_question": question, "parameters": params},
        timeout=180,
    )
    if r.status_code >= 400:
        raise RuntimeError(f"HTTP {r.status_code}: {r.text[:300]}")
    return r.json()["results"][0]


@tool(permission=ToolPermission.READ_ONLY,
      expected_credentials=[ExpectedCredentials(app_id=WXDI_APP, type=ConnectionType.KEY_VALUE)])
def generate_sql(question: str, previous_sql: Optional[str] = None, previous_error: Optional[str] = None) -> dict:
    """Convert a Korean business question into a Db2 SQL query for the FIN_DEMO schema using the watsonx.data intelligence Text-to-SQL service. It only generates SQL and does not run it. If a previous SQL failed, pass previous_sql and previous_error to get a corrected query.

    Args:
        question (str): The user question in natural language, for example "삼성전자 어제 체결 중 매수만 보여줘".
        previous_sql (Optional[str]): A SQL generated earlier that failed or returned a wrong result. Leave empty on the first attempt.
        previous_error (Optional[str]): The error message returned when previous_sql was run. Leave empty on the first attempt.
    Returns:
        dict: ok, sql, score, engine, elapsed_ms, error. error is null on success.
    """
    t0 = time.time()
    out: Dict[str, Any] = {"ok": False, "sql": None, "score": None, "engine": "wxdi_text2sql", "elapsed_ms": 0, "error": None}
    try:
        cfg = _cfg(WXDI_APP, "url", "api_key", "project_id")
        retry = [{"original_query": previous_sql, "error": previous_error}] if previous_sql and previous_error else None
        for _ in range(GUARD_RETRIES + 1):
            res = _call_wxdi(cfg, question, retry)
            sql = fix_qualifiers(res["generated_query"].strip().rstrip(";"))
            out.update(sql=sql, score=res.get("score"), ok=True)
            problem = check_sql(sql)
            if not problem:
                break
            retry = [{"original_query": sql, "error": problem}]
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
