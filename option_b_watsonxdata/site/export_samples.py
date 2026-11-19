"""FIN_DEMO 테이블의 건수, 컬럼 설명, 샘플 5행, ERD(mermaid)를 docs/samples.js로 내보낸다. 개인정보 컬럼은 마스킹한다."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "option_b_watsonxdata" / "load"))
from db2_conn import connect, fetch  # noqa: E402

TABLES = ["BRANCH", "CUSTOMER", "ACCOUNT", "PRODUCT", "ORDERS", "EXECUTIONS", "BALANCE_DAILY", "DESK", "ST_POSITIONS"]
ORDER = {"ORDERS": "ORDER_ID", "EXECUTIONS": "EXEC_ID", "BALANCE_DAILY": "BASE_DATE DESC, ACCOUNT_ID",
         "ST_POSITIONS": "BASE_DATE DESC, DESK_ID", "CUSTOMER": "CUSTOMER_ID", "ACCOUNT": "ACCOUNT_ID"}
MASK = {"SSN": lambda v: str(v)[:6] + "-*******", "PHONE": lambda v: str(v)[:4] + "****" + str(v)[-4:],
        "EMAIL": lambda v: str(v)[:2] + "***@" + str(v).split("@")[-1], "CUSTOMER_NAME": lambda v: str(v)[0] + "**"}
PII = {"CUSTOMER_NAME", "SSN", "PHONE", "EMAIL"}

# db2_ddl.sql의 키 정의
PK = {"BRANCH": ["BRANCH_CODE"], "CUSTOMER": ["CUSTOMER_ID"], "ACCOUNT": ["ACCOUNT_ID"], "PRODUCT": ["PRODUCT_CODE"],
      "ORDERS": ["ORDER_ID"], "EXECUTIONS": ["EXEC_ID"], "BALANCE_DAILY": ["ACCOUNT_ID", "BASE_DATE"],
      "DESK": ["DESK_ID"], "ST_POSITIONS": ["DESK_ID", "PRODUCT_CODE", "BASE_DATE"]}
FK = {("CUSTOMER", "BRANCH_CODE"): "BRANCH", ("ACCOUNT", "CUSTOMER_ID"): "CUSTOMER", ("ORDERS", "ACCOUNT_ID"): "ACCOUNT",
      ("ORDERS", "PRODUCT_CODE"): "PRODUCT", ("EXECUTIONS", "ORDER_ID"): "ORDERS", ("BALANCE_DAILY", "ACCOUNT_ID"): "ACCOUNT",
      ("ST_POSITIONS", "DESK_ID"): "DESK", ("ST_POSITIONS", "PRODUCT_CODE"): "PRODUCT"}
RELATIONS = [("BRANCH", "CUSTOMER", "소속"), ("CUSTOMER", "ACCOUNT", "보유"), ("ACCOUNT", "ORDERS", "주문"),
             ("PRODUCT", "ORDERS", "종목"), ("ORDERS", "EXECUTIONS", "체결"), ("ACCOUNT", "BALANCE_DAILY", "일별잔고"),
             ("DESK", "ST_POSITIONS", "포지션"), ("PRODUCT", "ST_POSITIONS", "종목")]
TYPE = {"VARCHAR": "string", "CHARACTER": "string", "INTEGER": "int", "BIGINT": "bigint", "DECIMAL": "decimal",
        "DATE": "date", "TIMESTAMP": "timestamp"}


def build_erd(meta: dict) -> str:
    lines = ["erDiagram"]
    for a, b, label in RELATIONS:
        lines.append(f'  {a} ||--o{{ {b} : "{label}"')
    for t in TABLES:
        lines.append(f"  {t} {{")
        for c in meta[t]["columns"]:
            keys = []
            if c["name"] in PK[t]:
                keys.append("PK")
            if (t, c["name"]) in FK:
                keys.append("FK")
            lines.append(f'    {TYPE.get(c["type"], "string")} {c["name"]} {",".join(keys)}'.rstrip())
        lines.append("  }")
    return "\n".join(lines)


def main() -> None:
    conn = connect()
    out = {}
    for t in TABLES:
        count = fetch(conn, f"SELECT COUNT(*) FROM FIN_DEMO.{t}")[1][0][0]
        _, trem = fetch(conn, f"SELECT REMARKS FROM SYSCAT.TABLES WHERE TABSCHEMA='FIN_DEMO' AND TABNAME='{t}'")
        _, crow = fetch(conn, "SELECT COLNAME, TYPENAME, REMARKS FROM SYSCAT.COLUMNS "
                              f"WHERE TABSCHEMA='FIN_DEMO' AND TABNAME='{t}' ORDER BY COLNO")
        meta = [{"name": r[0], "type": r[1], "desc": r[2] or "", "pii": r[0] in PII,
                 "pk": r[0] in PK[t], "fk": FK.get((t, r[0]), "")} for r in crow]
        order = f" ORDER BY {ORDER[t]}" if t in ORDER else ""
        cols, rows = fetch(conn, f"SELECT * FROM FIN_DEMO.{t}{order} FETCH FIRST 5 ROWS ONLY")
        idx = {c: i for i, c in enumerate(cols)}
        clean = []
        for r in rows:
            r = list(r)
            for c, f in MASK.items():
                if c in idx and r[idx[c]] is not None:
                    r[idx[c]] = f(r[idx[c]])
            clean.append([v if isinstance(v, (int, float, str, type(None))) else str(v) for v in r])
        out[t] = {"count": int(count), "desc": trem[0][0] or "", "columns": meta, "rows": clean}
    payload = {"tables": out, "erd": build_erd(out)}
    (ROOT / "docs").mkdir(exist_ok=True)
    (ROOT / "docs" / "samples.js").write_text(
        "window.SAMPLES = " + json.dumps(payload, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    print({t: v["count"] for t, v in out.items()})


main()
