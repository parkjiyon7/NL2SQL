"""홀드아웃 골든셋 생성기. 기존 golden.json과 겹치지 않는 새 질문을 시드 고정 난수로 뽑는다.

방법: 질문 템플릿마다 Db2 실제 값(지점, 종목, 업종, 고객 등)을 난수로 골라 질문과 골든 SQL을 만들고,
골든 결과가 비어 있거나 0인 후보는 버린다(정답이 있는 질문만 남긴다). 그다음 템플릿 중 N개를 난수로 뽑는다.
상위 N 질문은 N번째와 N+1번째 값이 같은 동점이면 버린다.
에이전트의 출력은 보지 않는다. 골든 SQL은 이 파일의 템플릿에서만 나온다.

사용법: ./venv/bin/python shared/spec/golden/make_holdout.py [--seed 20261125] [-n 20]
출력: shared/spec/golden/golden_holdout.json
"""
import argparse
import json
import random
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "option_b_watsonxdata" / "load"))
from db2_conn import connect, fetch  # noqa: E402

EXEC_JOIN = ("FROM FIN_DEMO.EXECUTIONS e JOIN FIN_DEMO.ORDERS o ON e.ORDER_ID = o.ORDER_ID "
             "JOIN FIN_DEMO.PRODUCT p ON o.PRODUCT_CODE = p.PRODUCT_CODE")
EXEC_BRANCH = ("FROM FIN_DEMO.EXECUTIONS e JOIN FIN_DEMO.ORDERS o ON e.ORDER_ID = o.ORDER_ID "
               "JOIN FIN_DEMO.ACCOUNT a ON o.ACCOUNT_ID = a.ACCOUNT_ID "
               "JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID "
               "JOIN FIN_DEMO.BRANCH b ON c.BRANCH_CODE = b.BRANCH_CODE")
ORDER_BRANCH = ("FROM FIN_DEMO.ORDERS o JOIN FIN_DEMO.ACCOUNT a ON o.ACCOUNT_ID = a.ACCOUNT_ID "
                "JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID "
                "JOIN FIN_DEMO.BRANCH b ON c.BRANCH_CODE = b.BRANCH_CODE")
KR_ACCT = {"BROKERAGE": "위탁", "PENSION": "연금", "CMA": "CMA"}
KR_MARKET = {"KOSPI": "코스피", "KOSDAQ": "코스닥"}


def col(conn, sql):
    return [r[0] for r in fetch(conn, sql)[1]]


def build(conn, rnd):
    branches = col(conn, "SELECT BRANCH_NAME FROM FIN_DEMO.BRANCH")
    products = col(conn, "SELECT DISTINCT p.PRODUCT_NAME FROM FIN_DEMO.PRODUCT p JOIN FIN_DEMO.ORDERS o "
                         "ON o.PRODUCT_CODE = p.PRODUCT_CODE JOIN FIN_DEMO.EXECUTIONS e ON e.ORDER_ID = o.ORDER_ID")
    sectors = col(conn, "SELECT DISTINCT SECTOR FROM FIN_DEMO.PRODUCT WHERE MARKET <> 'BOND'")
    desks = col(conn, "SELECT DESK_NAME FROM FIN_DEMO.DESK")
    names = col(conn, "SELECT CUSTOMER_NAME FROM FIN_DEMO.CUSTOMER GROUP BY CUSTOMER_NAME HAVING COUNT(*) = 1")
    join_years = col(conn, "SELECT DISTINCT YEAR(JOINED_DATE) FROM FIN_DEMO.CUSTOMER")
    open_years = col(conn, "SELECT DISTINCT YEAR(OPEN_DATE) FROM FIN_DEMO.ACCOUNT")
    pick = rnd.choice

    def q_branch_customers():
        b = pick(branches)
        return (f"{b}에 소속된 고객은 몇 명이야?",
                f"SELECT COUNT(*) AS CNT FROM FIN_DEMO.CUSTOMER c JOIN FIN_DEMO.BRANCH b ON c.BRANCH_CODE = b.BRANCH_CODE "
                f"WHERE b.BRANCH_NAME = '{b}'")

    def q_grade_assets():
        g = pick(["VIP", "GOLD"])
        return (f"{g} 등급 고객의 이름과 총자산을 보여줘",
                f"SELECT CUSTOMER_NAME, TOTAL_ASSETS FROM FIN_DEMO.CUSTOMER WHERE GRADE = '{g}'")

    def q_assets_threshold():
        x = pick([1, 2, 3, 5])
        return (f"총자산이 {x}억 원 이상인 고객은 몇 명이야?",
                f"SELECT COUNT(*) AS CNT FROM FIN_DEMO.CUSTOMER WHERE TOTAL_ASSETS >= {x * 100000000}")

    def q_product_exec():
        p = pick(products)
        return (f"{p}의 체결 건수와 체결대금 합계를 알려줘",
                f"SELECT COUNT(*) AS CNT, SUM(e.EXEC_AMOUNT) AS AMT {EXEC_JOIN} WHERE p.PRODUCT_NAME = '{p}'")

    def q_product_sell_orders():
        p = pick(products)
        return (f"{p} 매도 주문은 총 몇 건이야?",
                f"SELECT COUNT(*) AS CNT FROM FIN_DEMO.ORDERS o JOIN FIN_DEMO.PRODUCT p ON o.PRODUCT_CODE = p.PRODUCT_CODE "
                f"WHERE p.PRODUCT_NAME = '{p}' AND o.SIDE = 'SELL'")

    def q_acct_type():
        code = pick(list(KR_ACCT))
        return (f"{KR_ACCT[code]} 계좌는 몇 개야?",
                f"SELECT COUNT(*) AS CNT FROM FIN_DEMO.ACCOUNT WHERE ACCOUNT_TYPE = '{code}'")

    def q_month_exec():
        m = pick(range(1, 10))  # 10~12월은 2025년과 2026년이 모두 있어 연도 해석이 갈리므로 제외
        return (f"{m}월 체결 건수와 거래대금 합계를 알려줘",
                f"SELECT COUNT(*) AS CNT, SUM(e.EXEC_AMOUNT) AS AMT FROM FIN_DEMO.EXECUTIONS e WHERE MONTH(e.EXEC_TS) = {m}")

    def q_sector_products():
        s = pick(sectors)
        return (f"{s} 업종 종목은 뭐가 있어?",
                f"SELECT PRODUCT_NAME FROM FIN_DEMO.PRODUCT WHERE SECTOR = '{s}'")

    def q_market_count():
        m = pick(list(KR_MARKET))
        return (f"{KR_MARKET[m]} 종목은 몇 개야?",
                f"SELECT COUNT(*) AS CNT FROM FIN_DEMO.PRODUCT WHERE MARKET = '{m}'")

    def q_desk_limit():
        d = pick(desks)
        return (f"{d}의 한도와 담당 트레이더가 누구야?",
                f"SELECT LIMIT_AMOUNT, TRADER_NAME FROM FIN_DEMO.DESK WHERE DESK_NAME = '{d}'")

    def q_desk_exposure():
        d = pick(desks)
        return (f"{d}의 최근 기준일 노출금액 합계는 얼마야?",
                f"SELECT SUM(s.EXPOSURE_AMOUNT) AS EXPO FROM FIN_DEMO.ST_POSITIONS s JOIN FIN_DEMO.DESK d ON s.DESK_ID = d.DESK_ID "
                f"WHERE d.DESK_NAME = '{d}' AND s.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.ST_POSITIONS)")

    def q_credit_customers():
        return ("신용융자 계좌를 가진 고객은 몇 명이야?",
                "SELECT COUNT(DISTINCT CUSTOMER_ID) AS CNT FROM FIN_DEMO.ACCOUNT WHERE CREDIT_LOAN_YN = 'Y'")

    def q_receivable():
        return ("미수금이 있는 계좌와 미수금액을 보여줘",
                "SELECT ACCOUNT_ID, RECEIVABLE FROM FIN_DEMO.BALANCE_DAILY WHERE RECEIVABLE > 0 "
                "AND BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)")

    def q_branch_limit_orders():
        b = pick(branches)
        return (f"{b} 고객들의 지정가 주문은 몇 건이야?",
                f"SELECT COUNT(*) AS CNT {ORDER_BRANCH} WHERE b.BRANCH_NAME = '{b}' AND o.ORDER_TYPE = 'LIMIT'")

    def q_top_products():
        n = pick([3, 4, 5, 6, 7])
        return (f"체결대금이 큰 종목 상위 {n}개를 알려줘",
                f"SELECT p.PRODUCT_NAME, SUM(e.EXEC_AMOUNT) AS AMT {EXEC_JOIN} GROUP BY p.PRODUCT_CODE, p.PRODUCT_NAME "
                f"ORDER BY AMT DESC FETCH FIRST {n} ROWS ONLY", n,
                f"SELECT SUM(e.EXEC_AMOUNT) AS AMT {EXEC_JOIN} GROUP BY p.PRODUCT_CODE ORDER BY AMT DESC")

    def q_fee():
        p = pick(products)
        return (f"{p} 체결 수수료 합계는 얼마야?",
                f"SELECT SUM(e.FEE) AS FEE_SUM {EXEC_JOIN} WHERE p.PRODUCT_NAME = '{p}'")

    def q_top_pnl_products():
        n = pick([3, 4, 5])
        return (f"실현손익 합계가 가장 큰 종목 {n}개를 보여줘",
                f"SELECT p.PRODUCT_NAME, SUM(e.REALIZED_PNL) AS PNL {EXEC_JOIN} GROUP BY p.PRODUCT_CODE, p.PRODUCT_NAME "
                f"ORDER BY PNL DESC FETCH FIRST {n} ROWS ONLY", n,
                f"SELECT SUM(e.REALIZED_PNL) AS PNL {EXEC_JOIN} GROUP BY p.PRODUCT_CODE ORDER BY PNL DESC")

    def q_join_year():
        y = pick(join_years)
        return (f"{y}년에 가입한 고객은 몇 명이야?",
                f"SELECT COUNT(*) AS CNT FROM FIN_DEMO.CUSTOMER WHERE YEAR(JOINED_DATE) = {y}")

    def q_cust_accounts():
        n = pick(names)
        return (f"{n} 고객의 계좌는 몇 개야?",
                f"SELECT COUNT(*) AS CNT FROM FIN_DEMO.ACCOUNT a JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID "
                f"WHERE c.CUSTOMER_NAME = '{n}'")

    def q_cust_cash():
        n = pick(names)
        return (f"{n} 고객의 가장 최근 기준일 예수금 합계는 얼마야?",
                f"SELECT SUM(bd.CASH_BALANCE) AS CASH FROM FIN_DEMO.BALANCE_DAILY bd "
                f"JOIN FIN_DEMO.ACCOUNT a ON bd.ACCOUNT_ID = a.ACCOUNT_ID JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID "
                f"WHERE c.CUSTOMER_NAME = '{n}' AND bd.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)")

    def q_open_year():
        y = pick(open_years)
        return (f"{y}년 1월 1일 이후에 개설된 계좌는 몇 개야?",
                f"SELECT COUNT(*) AS CNT FROM FIN_DEMO.ACCOUNT WHERE OPEN_DATE >= DATE('{y}-01-01')")

    def q_unexecuted_branch():
        b = pick(branches)
        return (f"{b} 고객의 체결되지 않은 주문은 몇 건이야?",
                f"SELECT COUNT(*) AS CNT {ORDER_BRANCH} WHERE b.BRANCH_NAME = '{b}' "
                f"AND NOT EXISTS (SELECT 1 FROM FIN_DEMO.EXECUTIONS e WHERE e.ORDER_ID = o.ORDER_ID)")

    def q_buy_amount():
        p = pick(products)
        return (f"{p} 매수 체결대금 합계를 알려줘",
                f"SELECT SUM(e.EXEC_AMOUNT) AS AMT {EXEC_JOIN} WHERE p.PRODUCT_NAME = '{p}' AND o.SIDE = 'BUY'")

    def q_month_current():
        b = pick(branches)
        return (f"이번 달 {b} 체결 건수는 몇 건이야?",
                f"SELECT COUNT(*) AS CNT {EXEC_BRANCH} WHERE b.BRANCH_NAME = '{b}' "
                f"AND YEAR(e.EXEC_TS) = YEAR(CURRENT DATE) AND MONTH(e.EXEC_TS) = MONTH(CURRENT DATE)")

    def q_branch_assets():
        b = pick(branches)
        return (f"{b} 고객들의 총자산 합계는 얼마야?",
                f"SELECT SUM(c.TOTAL_ASSETS) AS TA FROM FIN_DEMO.CUSTOMER c JOIN FIN_DEMO.BRANCH b "
                f"ON c.BRANCH_CODE = b.BRANCH_CODE WHERE b.BRANCH_NAME = '{b}'")

    return [q_branch_customers, q_grade_assets, q_assets_threshold, q_product_exec, q_product_sell_orders,
            q_acct_type, q_month_exec, q_sector_products, q_market_count, q_desk_limit, q_desk_exposure,
            q_credit_customers, q_receivable, q_branch_limit_orders, q_top_products, q_fee, q_top_pnl_products,
            q_join_year, q_cust_accounts, q_cust_cash, q_open_year, q_unexecuted_branch, q_buy_amount,
            q_month_current, q_branch_assets]


def has_answer(rows) -> bool:
    """정답이 있는 질문인가: 행이 있고, 단일 집계 값이면 NULL이나 0이 아니다."""
    if not rows:
        return False
    if len(rows) == 1:
        return all(v not in (None, 0) and str(v) not in ("0", "0.0") for v in rows[0])
    return True


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--seed", type=int, default=20261125)
    ap.add_argument("-n", type=int, default=20)
    args = ap.parse_args()
    rnd = random.Random(args.seed)
    conn = connect()
    old = {g["question"] for g in json.loads((ROOT / "shared/spec/golden/golden.json").read_text(encoding="utf-8"))}
    templates = build(conn, rnd)
    rnd.shuffle(templates)
    items = []
    for tpl in templates:
        for _ in range(30):  # 정답이 없거나 동점인 파라미터는 다시 뽑는다
            out = tpl()
            question, sql = out[0], out[1]
            if question in old:
                continue
            _, rows = fetch(conn, sql)
            if not has_answer(rows):
                continue
            if len(out) == 4:  # 상위 N: N번째와 N+1번째 값이 같으면 정답이 하나로 정해지지 않는다
                n, rank_sql = out[2], out[3]
                vals = [r[0] for r in fetch(conn, rank_sql)[1]]
                if len(vals) > n and vals[n - 1] == vals[n]:
                    continue
            items.append({"question": question, "sql": sql, "template": tpl.__name__, "rows": len(rows)})
            break
        if len(items) == args.n:
            break
    for i, it in enumerate(items, 1):
        it["id"] = f"H-{i:02d}"
    out_path = ROOT / "shared/spec/golden/golden_holdout.json"
    out_path.write_text(json.dumps(items, ensure_ascii=False, indent=1), encoding="utf-8")
    for it in items:
        print(it["id"], f"({it['rows']}행)", it["question"])
    print("저장:", out_path, "seed", args.seed)
    return 0


if __name__ == "__main__":
    sys.exit(main())
