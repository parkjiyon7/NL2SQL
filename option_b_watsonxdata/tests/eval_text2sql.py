"""제품 Text-to-SQL(wxdi generate_queries)이 만든 SQL을 Db2에서 실행해 보는 점검 스크립트.

사용법
  ./venv/bin/python option_b_watsonxdata/tests/eval_text2sql.py                 # 기본 질문 세트
  ./venv/bin/python option_b_watsonxdata/tests/eval_text2sql.py "질문1" "질문2" # 직접 지정

필요한 .env 값: WXDI_URL, WXDI_API_KEY, WXDI_PROJECT_ID, DB2_*
SQL 생성만 하는 API라서 실행은 Db2 접속으로 직접 한다. 실행은 SELECT만 한다.
"""
import os
import sys
from pathlib import Path

import requests

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "load"))
from db2_conn import connect, fetch  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "wxo" / "tools"))
from findemo_sql_tools import GUARD_RETRIES, check_sql, fix_qualifiers  # noqa: E402

URL = os.environ["WXDI_URL"].rstrip("/")
PROJECT = os.environ["WXDI_PROJECT_ID"]
INSTRUCTIONS = [
    "Use only tables in the FIN_DEMO schema. Write schema and table as separate quoted identifiers, e.g. \"FIN_DEMO\".\"PRODUCT\", never \"FIN_DEMO.PRODUCT\".",
    "EXECUTIONS has no account or customer column. Join EXECUTIONS.ORDER_ID = ORDERS.ORDER_ID, ORDERS.ACCOUNT_ID = ACCOUNT.ACCOUNT_ID, ACCOUNT.CUSTOMER_ID = CUSTOMER.CUSTOMER_ID, CUSTOMER.BRANCH_CODE = BRANCH.BRANCH_CODE. The product of an execution is ORDERS.PRODUCT_CODE = PRODUCT.PRODUCT_CODE.",
    "Stock names such as 삼성전자 are values of PRODUCT.PRODUCT_NAME. Branch names such as 강남지점 are values of BRANCH.BRANCH_NAME. Always filter by these name columns through the joins. ORDERS.SIDE is 'BUY' for 매수 and 'SELL' for 매도.",
    "거래대금, 약정, 체결대금 all mean SUM(EXECUTIONS.EXEC_AMOUNT).",
    "업종 means PRODUCT.SECTOR. 업종 내 순위 means RANK() OVER (PARTITION BY PRODUCT.SECTOR ORDER BY SUM(EXEC_AMOUNT) DESC).",
    "Desk limit usage (한도 소진율) = SUM(ST_POSITIONS.EXPOSURE_AMOUNT) per desk on the latest BASE_DATE divided by DESK.LIMIT_AMOUNT. Aggregate per desk with GROUP BY and compare with HAVING, never per row.",
    "Dates use Db2 syntax: 어제 is CURRENT DATE - 1 DAY, compared with DATE(EXEC_TS) or DATE(ORDER_TS). A month such as 3월 means MONTH(date) = 3; never assume a year unless the question gives one. A monthly trend groups by YEAR(EXEC_TS) and MONTH(EXEC_TS) of the execution time, never by MONTH alone.",
    "Db2 quoted identifiers are case sensitive. Always write table and column names in UPPERCASE exactly as in the catalog, e.g. \"EXEC_AMOUNT\", never \"exec_amount\".",
    "When joining tables, qualify every column with its table name or alias, including in GROUP BY, HAVING and SELECT, so that no column such as DESK_ID is ambiguous.",
    "Korean number units: 1억 = 100000000, 1만 = 10000, 1조 = 1000000000000. A customer's 총자산 or 잔고 is CUSTOMER.TOTAL_ASSETS; use BALANCE_DAILY only for daily or per-account balances. ACCOUNT.CUSTOMER_ID joins CUSTOMER.CUSTOMER_ID; never join ACCOUNT_ID to CUSTOMER_ID.",
]
DEFAULT_QUESTIONS = [
    "잔고가 1억 이상인 고객 이름과 총자산을 보여줘",
    "VIP 고객 수를 지점별로 알려줘",
    "삼성전자 어제 체결 중 매수만 보여줘",
    "고객별 총 거래대금 상위 5명",
    "종목별 거래대금을 업종 내에서 순위 매겨줘",
    "한도 대비 노출금액 비율이 80%를 넘는 데스크가 있어?",
]


def token() -> str:
    r = requests.post("https://iam.cloud.ibm.com/identity/token", timeout=30,
                      data={"grant_type": "urn:ibm:params:oauth:grant-type:apikey", "apikey": os.environ["WXDI_API_KEY"]})
    return r.json()["access_token"]


def generate(headers: dict, question: str, guard: bool = True) -> str:
    """wxdi로 SQL을 만든다. guard면 wxO 툴과 같은 오류 패턴 검사(check_sql)와 재생성을 적용한다."""
    retry = None
    for _ in range(GUARD_RETRIES + 1 if guard else 1):
        params = {"type": "sql", "sql_dialect": "db2", "instructions": INSTRUCTIONS,
                  "context": {"containers": [{"container_id": PROJECT, "container_type": "project"}]}}
        if retry:
            params["retry_on_error"] = retry
        r = requests.post(f"{URL}/semantic_automation/v1/generate_queries", params={"top_n": 1},
                          headers=headers, json={"input_question": question, "parameters": params}, timeout=180)
        r.raise_for_status()
        sql = fix_qualifiers(r.json()["results"][0]["generated_query"].strip().rstrip(";"))
        problem = check_sql(sql) if guard else None
        if not problem:
            break
        retry = [{"original_query": sql, "error": problem}]
    return sql


def main(questions) -> int:
    headers = {"Authorization": f"Bearer {token()}", "Content-Type": "application/json"}
    conn = connect()
    for q in questions or DEFAULT_QUESTIONS:
        print("Q:", q)
        try:
            sql = generate(headers, q)
        except Exception as exc:
            print("  생성 실패:", exc)
            continue
        print("  SQL:", sql)
        try:
            _, rows = fetch(conn, sql)
            print("  실행 OK:", len(rows), "행", rows[:2])
        except Exception as exc:
            print("  실행 오류:", str(exc).splitlines()[0][:200])
    return 0


if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parents[2] / ".env")
    sys.exit(main(sys.argv[1:]))
