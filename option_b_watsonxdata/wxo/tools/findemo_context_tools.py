"""FIN_DEMO Context 툴 (B안). wxdi의 비즈니스 용어집과 카탈로그(메타데이터)를 읽는다.

계약: shared/spec/tool-contract.md (map_terms, get_catalog). 실패해도 예외를 던지지 않고 error 필드를 채운다.
연결(connection)
  findemo_wxdi : url, api_key, project_id
"""
import re
import time
from typing import Any, Dict, List, Optional

import requests
from ibm_watsonx_orchestrate.agent_builder.connections import ConnectionType, ExpectedCredentials
from ibm_watsonx_orchestrate.agent_builder.tools import ToolPermission, tool
from ibm_watsonx_orchestrate.run import connections

WXDI_APP = "findemo_wxdi"
GLOSSARY_CATEGORY = "증권업무 용어"
CACHE_SECONDS = 300

# wxdi에 가져온 용어에는 동의어가 연결되지 않아(CSV Synonyms 열은 다른 용어 참조를 기대한다) 여기서 보완한다.
# 원본: option_b_watsonxdata/glossary/fin_demo_glossary.csv
SYNONYMS = {
    "거래대금": ["약정", "약정금액", "체결대금", "약정대금"],
    "체결": ["체결내역"],
    "예수금": ["현금잔고", "현금 잔고"],
    "평가금액": ["주식평가금액"],
    "총자산": ["잔고", "자산"],
    "미수금": ["미수"],
    "신용융자": ["신용거래", "신용 융자"],
    "VIP 고객": ["VIP", "우수고객"],
    "고객 등급": ["등급"],
    "지점": ["영업점", "우리 지점"],
    "종목": ["상품"],
    "업종": ["섹터", "산업"],
    "실현손익": ["실현 PnL", "확정손익"],
    "평가손익": ["미실현손익", "평가 PnL"],
    "노출금액": ["익스포저", "포지션 금액"],
    "한도 소진율": ["한도 대비 노출 비율", "한도율"],
    "데스크": ["S&T 데스크"],
    "주민등록번호": ["주민번호", "SSN"],
}

_token_cache: Dict[str, Any] = {"token": None, "exp": 0.0}
_cache: Dict[str, Any] = {}


def _ms(t0: float) -> int:
    return int((time.time() - t0) * 1000)


def _cfg(app_id: str, *keys: str) -> Dict[str, str]:
    cfg = dict(connections.key_value(app_id))
    missing = [k for k in keys if k not in cfg]
    if missing:
        raise KeyError(f"connection {app_id}: missing {missing}, available keys {sorted(cfg)}")
    return cfg


def _iam_token(api_key: str) -> str:
    if _token_cache["token"] and time.time() < _token_cache["exp"] - 60:
        return _token_cache["token"]
    r = requests.post("https://iam.cloud.ibm.com/identity/token", timeout=30,
                      data={"grant_type": "urn:ibm:params:oauth:grant-type:apikey", "apikey": api_key})
    r.raise_for_status()
    body = r.json()
    _token_cache["token"] = body["access_token"]
    _token_cache["exp"] = time.time() + int(body.get("expires_in", 3600))
    return _token_cache["token"]


def _cached(key: str, loader):
    hit = _cache.get(key)
    if hit and time.time() < hit[0]:
        return hit[1]
    value = loader()
    _cache[key] = (time.time() + CACHE_SECONDS, value)
    return value


def _headers(cfg: Dict[str, str]) -> Dict[str, str]:
    return {"Authorization": f"Bearer {_iam_token(cfg['api_key'])}", "Content-Type": "application/json"}


# ---------------------------------------------------------------- 용어집

def _load_terms(cfg: Dict[str, str]) -> List[Dict[str, Any]]:
    r = requests.get(f"{cfg['url'].rstrip('/')}/v3/search", headers=_headers(cfg), timeout=60,
                     params={"query": "metadata.artifact_type:glossary_term", "auth_scope": "all", "limit": 500})
    r.raise_for_status()
    terms = []
    for row in r.json().get("rows", []):
        meta = row["metadata"]
        category = row.get("categories", {}).get("primary_category_name")
        if category != GLOSSARY_CATEGORY or meta.get("state") != "PUBLISHED":
            continue
        desc = meta.get("description") or ""
        terms.append({
            "term": meta["name"],
            "definition": desc,
            "maps_to": sorted(set(re.findall(r"\b[A-Z][A-Z_]+\.[A-Z][A-Z_]+\b", desc))
                              or set(re.findall(r"(?:테이블|컬럼)\s+([A-Z][A-Z_]+)", desc))),
            "ref": f"terms/{meta['name']}",
            "aliases": [meta["name"]] + SYNONYMS.get(meta["name"], []),
        })
    return terms


def find_terms(cfg: Dict[str, str], question: Optional[str], terms: Optional[List[str]]) -> Dict[str, Any]:
    glossary = _cached("terms", lambda: _load_terms(cfg))
    texts = [question] if question else []
    texts += list(terms or [])
    # 긴 표현부터 찾고, 이미 찾은 구간과 겹치는 짧은 표현은 건너뛴다(예: "미체결" 안의 "체결").
    candidates = sorted(((a, t) for t in glossary for a in t["aliases"]), key=lambda x: -len(x[0]))
    hits: Dict[str, List[Dict[str, Any]]] = {}
    unmapped: List[str] = []
    for text in texts:
        taken: List[range] = []
        found = False
        for alias, t in candidates:
            for m in re.finditer(re.escape(alias), text):
                span = range(m.start(), m.end())
                if any(span.start < s.stop and s.start < span.stop for s in taken):
                    continue
                taken.append(span)
                found = True
                hits.setdefault(alias, []).append(t)
        if not found and not question:
            unmapped.append(text)
    mappings, ambiguous = [], []
    for alias, ts in hits.items():
        uniq = {t["term"]: t for t in ts}
        if len(uniq) > 1:
            ambiguous.append({"matched_text": alias, "choices": list(uniq)})
            continue
        t = next(iter(uniq.values()))
        mappings.append({"matched_text": alias, "term": t["term"], "definition": t["definition"],
                         "maps_to": t["maps_to"], "expression": None,
                         "evidence": {"source": "glossary", "ref": t["ref"]}})
    return {"mappings": mappings, "unmapped": unmapped, "ambiguous": ambiguous}


# ---------------------------------------------------------------- 카탈로그

def _search_assets(cfg: Dict[str, str], query: str) -> List[Dict[str, Any]]:
    r = requests.post(f"{cfg['url'].rstrip('/')}/v2/asset_types/asset/search", headers=_headers(cfg), timeout=60,
                      params={"project_id": cfg["project_id"], "limit": 100}, json={"query": query})
    r.raise_for_status()
    return r.json().get("results", [])


def _load_catalog(cfg: Dict[str, str]) -> List[Dict[str, Any]]:
    base, pid = cfg["url"].rstrip("/"), cfg["project_id"]
    fks: Dict[str, List[Dict[str, str]]] = {}
    for item in _search_assets(cfg, "asset.name:FK_CONSTRAINT*"):
        m = re.match(r"FK_CONSTRAINT (\w+) (\w+) \[ (.+) \]", item["metadata"]["name"])
        if m:  # 이름 형식: FK_CONSTRAINT <부모> <자식> [ <컬럼> ]
            parent, child, cols = m.groups()
            fks.setdefault(child, []).append({"columns": cols.replace(" ", ""), "references": parent})
    tables = []
    for item in _search_assets(cfg, "asset.tags:FIN_DEMO"):
        meta = item["metadata"]
        a = requests.get(f"{base}/v2/assets/{meta['asset_id']}", headers=_headers(cfg), timeout=60,
                         params={"project_id": pid}).json()
        data = a.get("entity", {}).get("data_asset", {})
        if not data.get("columns"):
            continue
        disc = {p["name"]: p["value"] for p in a["entity"].get("discovered_asset", {}).get("extended_metadata", [])}
        pk = (disc.get("primary_key") or {}).get("key_columns") or []
        cols = []
        for c in data["columns"]:
            desc = c.get("description") or ""
            pii = "PII" in desc
            cols.append({"name": c["name"], "type": c["type"].get("native_type", c["type"].get("type")),
                         "description": desc, "pii": pii, "sensitivity": "PII" if pii else None})
        name = a["metadata"]["name"]
        tables.append({"name": name, "description": a["metadata"].get("description") or "", "columns": cols,
                       "keys": {"primary": pk, "foreign": fks.get(name, [])}})
    return sorted(tables, key=lambda t: t["name"])


def find_catalog(cfg: Dict[str, str], table: Optional[str], keyword: Optional[str]) -> Dict[str, Any]:
    tables = _cached("catalog", lambda: _load_catalog(cfg))
    if table:
        tables = [t for t in tables if t["name"].upper() == table.strip().upper().split(".")[-1]]
    if keyword:
        k = keyword.lower()
        picked = []
        for t in tables:
            cols = [c for c in t["columns"] if k in c["name"].lower() or k in c["description"].lower()]
            if k in t["name"].lower() or k in t["description"].lower():
                picked.append(t)
            elif cols:
                picked.append({**t, "columns": cols})
        tables = picked
    if not table and not keyword:  # 전체 요약: 컬럼 목록은 이름만 남겨 응답을 줄인다
        tables = [{**t, "columns": [{"name": c["name"], "pii": c["pii"]} for c in t["columns"]]} for t in tables]
    return {"tables": tables}


# ---------------------------------------------------------------- 툴

@tool(permission=ToolPermission.READ_ONLY,
      expected_credentials=[ExpectedCredentials(app_id=WXDI_APP, type=ConnectionType.KEY_VALUE)])
def map_terms(question: Optional[str] = None, terms: Optional[List[str]] = None) -> dict:
    """Find business glossary terms in a Korean question and map them to FIN_DEMO tables and columns using the watsonx.data intelligence glossary. For example 약정 maps to the term 거래대금 and the column EXECUTIONS.EXEC_AMOUNT. Use this before writing SQL to learn what a business word means.

    Args:
        question (Optional[str]): The user question in natural language. Terms are searched inside this text.
        terms (Optional[List[str]]): Specific words to look up instead of or in addition to the question.
    Returns:
        dict: mappings, unmapped, ambiguous, engine, elapsed_ms, error. error is null on success.
    """
    t0 = time.time()
    out: Dict[str, Any] = {"mappings": [], "unmapped": [], "ambiguous": [], "engine": "ikc", "elapsed_ms": 0, "error": None}
    try:
        if not question and not terms:
            out["error"] = {"type": "input", "message": "question or terms is required"}
        else:
            out.update(find_terms(_cfg(WXDI_APP, "url", "api_key", "project_id"), question, terms))
    except Exception as exc:  # noqa: BLE001
        out["error"] = {"type": "glossary", "message": f"{type(exc).__name__}: {exc}"[:300]}
    out["elapsed_ms"] = _ms(t0)
    return out


@tool(permission=ToolPermission.READ_ONLY,
      expected_credentials=[ExpectedCredentials(app_id=WXDI_APP, type=ConnectionType.KEY_VALUE)])
def get_catalog(table: Optional[str] = None, keyword: Optional[str] = None) -> dict:
    """Read the FIN_DEMO table catalog from watsonx.data intelligence: table and column descriptions, primary keys, foreign keys and which columns are personal data (PII). Leave table empty for a summary of all tables.

    Args:
        table (Optional[str]): A table name such as EXECUTIONS. Empty returns all tables with column names only.
        keyword (Optional[str]): A word to search in table, column names and descriptions, for example 체결.
    Returns:
        dict: tables, engine, elapsed_ms, error. error is null on success.
    """
    t0 = time.time()
    out: Dict[str, Any] = {"tables": [], "engine": "ikc", "elapsed_ms": 0, "error": None}
    try:
        out.update(find_catalog(_cfg(WXDI_APP, "url", "api_key", "project_id"), table, keyword))
    except Exception as exc:  # noqa: BLE001
        out["error"] = {"type": "catalog", "message": f"{type(exc).__name__}: {exc}"[:300]}
    out["elapsed_ms"] = _ms(t0)
    return out
