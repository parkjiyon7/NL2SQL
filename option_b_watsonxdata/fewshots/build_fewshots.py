"""Text-to-SQL SQL 샘플(few-shot) CSV 생성기.

각 SQL을 Db2에서 실제로 실행해 검증한 뒤 `text_to_sql_fewshots_0.csv`(헤더 없음)를 쓴다.
형식: natural_language_query,evidence,sql  (IBM 문서 규칙)
평가 질문(eval_text2sql.py)과 같은 종목, 지점은 쓰지 않는다. 일반화를 보려는 의도다.

사용법: ./venv/bin/python option_b_watsonxdata/fewshots/build_fewshots.py
"""
import csv
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "load"))
from db2_conn import connect, fetch  # noqa: E402

OUT = Path(__file__).resolve().parent / "text_to_sql_fewshots_0.csv"

E = "FIN_DEMO.EXECUTIONS"
O = "FIN_DEMO.ORDERS"
A = "FIN_DEMO.ACCOUNT"
C = "FIN_DEMO.CUSTOMER"
P = "FIN_DEMO.PRODUCT"
B = "FIN_DEMO.BRANCH"

SAMPLES = [
    # 종목명, 매수/매도, 어제
    ("SK하이닉스 어제 체결 중 매도만 보여줘",
     "종목명은 PRODUCT.PRODUCT_NAME으로 필터한다. 매수는 ORDERS.SIDE='BUY', 매도는 'SELL'. 체결은 EXECUTIONS이고 ORDERS를 거쳐 종목과 매매구분을 얻는다. 어제는 CURRENT DATE - 1 DAY",
     f"SELECT e.EXEC_ID, e.EXEC_TS, e.EXEC_QTY, e.EXEC_PRICE, e.EXEC_AMOUNT FROM {E} e JOIN {O} o ON e.ORDER_ID = o.ORDER_ID JOIN {P} p ON o.PRODUCT_CODE = p.PRODUCT_CODE WHERE p.PRODUCT_NAME = 'SK하이닉스' AND o.SIDE = 'SELL' AND DATE(e.EXEC_TS) = CURRENT DATE - 1 DAY ORDER BY e.EXEC_TS"),
    # 지점명 필터 + 오늘 + 건수/대금
    ("오늘 여의도지점 체결 건수와 거래대금 알려줘",
     "지점명은 BRANCH.BRANCH_NAME. 체결 -> 주문 -> 계좌 -> 고객 -> 지점 순으로 조인한다. 거래대금은 EXECUTIONS.EXEC_AMOUNT 합계. 오늘은 CURRENT DATE",
     f"SELECT COUNT(*) AS EXEC_COUNT, COALESCE(SUM(e.EXEC_AMOUNT), 0) AS TOTAL_AMOUNT FROM {E} e JOIN {O} o ON e.ORDER_ID = o.ORDER_ID JOIN {A} a ON o.ACCOUNT_ID = a.ACCOUNT_ID JOIN {C} c ON a.CUSTOMER_ID = c.CUSTOMER_ID JOIN {B} b ON c.BRANCH_CODE = b.BRANCH_CODE WHERE b.BRANCH_NAME = '여의도지점' AND DATE(e.EXEC_TS) = CURRENT DATE"),
    # 고객별 거래대금 상위 N (조인 경로)
    ("거래대금이 큰 고객 상위 3명",
     "거래대금, 약정, 체결대금은 같은 뜻으로 EXECUTIONS.EXEC_AMOUNT 합계다. EXECUTIONS에는 계좌나 고객 컬럼이 없으므로 ORDERS -> ACCOUNT -> CUSTOMER 순서로 조인한다",
     f"SELECT c.CUSTOMER_ID, c.CUSTOMER_NAME, SUM(e.EXEC_AMOUNT) AS TOTAL_AMOUNT FROM {E} e JOIN {O} o ON e.ORDER_ID = o.ORDER_ID JOIN {A} a ON o.ACCOUNT_ID = a.ACCOUNT_ID JOIN {C} c ON a.CUSTOMER_ID = c.CUSTOMER_ID GROUP BY c.CUSTOMER_ID, c.CUSTOMER_NAME ORDER BY TOTAL_AMOUNT DESC FETCH FIRST 3 ROWS ONLY"),
    # 이번 달 약정 상위
    ("올해 약정이 큰 고객 7명",
     "약정은 거래대금(EXEC_AMOUNT 합계)의 동의어. 올해는 체결일의 연도가 현재 연도와 같은 것",
     f"SELECT c.CUSTOMER_ID, c.CUSTOMER_NAME, SUM(e.EXEC_AMOUNT) AS TOTAL_AMOUNT FROM {E} e JOIN {O} o ON e.ORDER_ID = o.ORDER_ID JOIN {A} a ON o.ACCOUNT_ID = a.ACCOUNT_ID JOIN {C} c ON a.CUSTOMER_ID = c.CUSTOMER_ID WHERE YEAR(e.EXEC_TS) = YEAR(CURRENT DATE) GROUP BY c.CUSTOMER_ID, c.CUSTOMER_NAME ORDER BY TOTAL_AMOUNT DESC FETCH FIRST 7 ROWS ONLY"),
    # 업종 내 순위 (Window)
    ("고객 등급별로 고객 거래대금 순위를 매겨줘",
     "등급은 CUSTOMER.GRADE. 등급 안의 순위는 RANK() OVER (PARTITION BY c.GRADE ORDER BY 합계 DESC). 고객별 거래대금은 EXECUTIONS -> ORDERS -> ACCOUNT -> CUSTOMER 순서로 조인해 EXEC_AMOUNT를 합한다. 테이블명을 따옴표로 감싸지 않는다",
     f"SELECT c.GRADE, c.CUSTOMER_NAME, SUM(e.EXEC_AMOUNT) AS TOTAL_AMOUNT, RANK() OVER (PARTITION BY c.GRADE ORDER BY SUM(e.EXEC_AMOUNT) DESC) AS RANK_IN_GRADE FROM {E} e JOIN {O} o ON e.ORDER_ID = o.ORDER_ID JOIN {A} a ON o.ACCOUNT_ID = a.ACCOUNT_ID JOIN {C} c ON a.CUSTOMER_ID = c.CUSTOMER_ID GROUP BY c.GRADE, c.CUSTOMER_ID, c.CUSTOMER_NAME ORDER BY c.GRADE, RANK_IN_GRADE"),
    # 데스크 한도 소진율 (집계 후 비교)
    ("노출금액이 한도의 60%를 넘은 데스크 이름과 소진율",
     "한도 소진율 = 데스크별 최신 기준일 노출금액(ST_POSITIONS.EXPOSURE_AMOUNT) 합계 / DESK.LIMIT_AMOUNT. 행 단위가 아니라 데스크별로 합계를 낸 뒤 비교한다(HAVING). 최신 기준일은 MAX(BASE_DATE)",
     "SELECT d.DESK_NAME, SUM(s.EXPOSURE_AMOUNT) / d.LIMIT_AMOUNT AS USAGE_RATIO FROM FIN_DEMO.ST_POSITIONS s JOIN FIN_DEMO.DESK d ON s.DESK_ID = d.DESK_ID WHERE s.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.ST_POSITIONS) GROUP BY d.DESK_NAME, d.LIMIT_AMOUNT HAVING SUM(s.EXPOSURE_AMOUNT) / d.LIMIT_AMOUNT > 0.6"),
    # 등급 정의
    ("GOLD 등급 고객을 지점별로 세어줘",
     "고객 등급은 CUSTOMER.GRADE 값 VIP, GOLD, GENERAL. 지점명은 BRANCH.BRANCH_NAME",
     f"SELECT b.BRANCH_NAME, COUNT(*) AS CUSTOMER_COUNT FROM {C} c JOIN {B} b ON c.BRANCH_CODE = b.BRANCH_CODE WHERE c.GRADE = 'GOLD' GROUP BY b.BRANCH_NAME ORDER BY CUSTOMER_COUNT DESC"),
    # 예수금 (최신일 기준)
    ("GOLD 등급 고객 중 예수금이 많은 순으로 3명",
     "예수금은 BALANCE_DAILY.CASH_BALANCE. 고객의 예수금은 계좌별 최신 기준일 값의 합. GOLD는 CUSTOMER.GRADE='GOLD'",
     "SELECT c.CUSTOMER_ID, c.CUSTOMER_NAME, SUM(bd.CASH_BALANCE) AS CASH_BALANCE FROM FIN_DEMO.BALANCE_DAILY bd JOIN FIN_DEMO.ACCOUNT a ON bd.ACCOUNT_ID = a.ACCOUNT_ID JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID WHERE c.GRADE = 'GOLD' AND bd.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY) GROUP BY c.CUSTOMER_ID, c.CUSTOMER_NAME ORDER BY CASH_BALANCE DESC FETCH FIRST 3 ROWS ONLY"),
    # 미수 / 신용융자
    ("미수가 있는 계좌 보여줘",
     "미수는 BALANCE_DAILY.RECEIVABLE가 0보다 큰 경우. 최신 기준일 기준",
     "SELECT bd.ACCOUNT_ID, bd.RECEIVABLE FROM FIN_DEMO.BALANCE_DAILY bd WHERE bd.RECEIVABLE > 0 AND bd.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY) ORDER BY bd.RECEIVABLE DESC"),
    ("연금 계좌만 보여줘",
     "계좌 유형은 ACCOUNT.ACCOUNT_TYPE 값 BROKERAGE 위탁, CMA, PENSION 연금",
     f"SELECT a.ACCOUNT_ID, a.CUSTOMER_ID, a.ACCOUNT_TYPE FROM {A} a WHERE a.ACCOUNT_TYPE = 'PENSION'"),
    # 미체결 (anti-join + 시간)
    ("주문 후 1시간 넘게 미체결인 매수 주문",
     "미체결은 EXECUTIONS에 행이 없는 주문(LEFT JOIN ... IS NULL). 매수는 ORDERS.SIDE='BUY', 매도는 'SELL'. 경과 시간은 TIMESTAMPDIFF(4, ...) 분 단위이고 1시간은 60분",
     f"SELECT o.ORDER_ID, o.ACCOUNT_ID, o.ORDER_TS FROM {O} o LEFT JOIN {E} e ON e.ORDER_ID = o.ORDER_ID WHERE e.ORDER_ID IS NULL AND o.SIDE = 'BUY' AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - o.ORDER_TS)) > 60"),
    ("체결이 하나도 없는 매도 주문을 종목별로 세어줘",
     "미체결은 부분체결도 아닌, EXECUTIONS에 행이 하나도 없는 주문이다. NOT EXISTS (SELECT 1 FROM EXECUTIONS e WHERE e.ORDER_ID = o.ORDER_ID). 매도는 ORDERS.SIDE='SELL'. 종목명은 PRODUCT.PRODUCT_NAME",
     f"SELECT p.PRODUCT_NAME, COUNT(*) AS UNFILLED_CNT FROM {O} o JOIN {P} p ON o.PRODUCT_CODE = p.PRODUCT_CODE WHERE o.SIDE = 'SELL' AND NOT EXISTS (SELECT 1 FROM {E} e WHERE e.ORDER_ID = o.ORDER_ID) GROUP BY p.PRODUCT_NAME ORDER BY UNFILLED_CNT DESC"),
    # 월별 추이
    ("월별 거래대금 추이",
     "거래대금은 EXEC_AMOUNT 합계. 월 단위는 연, 월로 묶는다",
     f"SELECT YEAR(e.EXEC_TS) AS YR, MONTH(e.EXEC_TS) AS MN, SUM(e.EXEC_AMOUNT) AS TOTAL_AMOUNT FROM {E} e GROUP BY YEAR(e.EXEC_TS), MONTH(e.EXEC_TS) ORDER BY YR, MN"),
    # LAG
    ("고객별 월 거래대금과 전월 대비 증감률",
     "LAG(월 거래대금) OVER (PARTITION BY 고객 ORDER BY 연, 월). 먼저 월별 합계 서브쿼리를 만든다",
     f"SELECT t.CUSTOMER_ID, t.YR, t.MN, t.AMT, LAG(t.AMT) OVER (PARTITION BY t.CUSTOMER_ID ORDER BY t.YR, t.MN) AS PREV_AMT, (t.AMT - LAG(t.AMT) OVER (PARTITION BY t.CUSTOMER_ID ORDER BY t.YR, t.MN)) * 100.0 / NULLIF(LAG(t.AMT) OVER (PARTITION BY t.CUSTOMER_ID ORDER BY t.YR, t.MN), 0) AS CHANGE_PCT FROM (SELECT a.CUSTOMER_ID, YEAR(e.EXEC_TS) AS YR, MONTH(e.EXEC_TS) AS MN, SUM(e.EXEC_AMOUNT) AS AMT FROM {E} e JOIN {O} o ON e.ORDER_ID = o.ORDER_ID JOIN {A} a ON o.ACCOUNT_ID = a.ACCOUNT_ID GROUP BY a.CUSTOMER_ID, YEAR(e.EXEC_TS), MONTH(e.EXEC_TS)) t ORDER BY t.CUSTOMER_ID, t.YR, t.MN"),
    # 실현손익
    ("이번 분기 실현손익 기준 상위 10명",
     "실현손익은 EXECUTIONS.REALIZED_PNL 합계(매도 체결에만 값이 있음). 이번 분기는 현재 날짜의 분기와 같은 체결. QUARTER() 사용",
     f"SELECT c.CUSTOMER_ID, c.CUSTOMER_NAME, SUM(e.REALIZED_PNL) AS TOTAL_PNL FROM {E} e JOIN {O} o ON e.ORDER_ID = o.ORDER_ID JOIN {A} a ON o.ACCOUNT_ID = a.ACCOUNT_ID JOIN {C} c ON a.CUSTOMER_ID = c.CUSTOMER_ID WHERE YEAR(e.EXEC_TS) = YEAR(CURRENT DATE) AND QUARTER(e.EXEC_TS) = QUARTER(CURRENT DATE) GROUP BY c.CUSTOMER_ID, c.CUSTOMER_NAME ORDER BY TOTAL_PNL DESC FETCH FIRST 10 ROWS ONLY"),
    # 업종 집계
    ("업종별 거래대금 비중",
     "업종은 PRODUCT.SECTOR. 비중은 업종 합계 / 전체 합계",
     f"SELECT p.SECTOR, SUM(e.EXEC_AMOUNT) AS TOTAL_AMOUNT, SUM(e.EXEC_AMOUNT) * 100.0 / SUM(SUM(e.EXEC_AMOUNT)) OVER () AS SHARE_PCT FROM {E} e JOIN {O} o ON e.ORDER_ID = o.ORDER_ID JOIN {P} p ON o.PRODUCT_CODE = p.PRODUCT_CODE GROUP BY p.SECTOR ORDER BY TOTAL_AMOUNT DESC"),
    # 7일 이동평균
    ("계좌 잔고의 7일 이동평균",
     "잔고는 BALANCE_DAILY의 CASH_BALANCE + EVAL_AMOUNT. 이동평균은 AVG(...) OVER (PARTITION BY ACCOUNT_ID ORDER BY BASE_DATE ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)",
     "SELECT ACCOUNT_ID, BASE_DATE, AVG(CASH_BALANCE + EVAL_AMOUNT) OVER (PARTITION BY ACCOUNT_ID ORDER BY BASE_DATE ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS MA7 FROM FIN_DEMO.BALANCE_DAILY ORDER BY ACCOUNT_ID, BASE_DATE"),
]


def main() -> int:
    conn = connect()
    failed = 0
    for q, _, sql in SAMPLES:
        try:
            _, rows = fetch(conn, sql)
            print(f"OK   {len(rows):>5}행  {q}")
        except Exception as exc:
            failed += 1
            print(f"FAIL {q}\n     {str(exc).splitlines()[0][:200]}")
    if failed:
        print(f"\n{failed}건 실패. CSV를 쓰지 않는다.")
        return 1
    with OUT.open("w", newline="", encoding="utf-8") as f:
        csv.writer(f, quoting=csv.QUOTE_ALL).writerows(SAMPLES)
    print(f"\n{len(SAMPLES)}건 검증 완료 -> {OUT}")
    return 0


if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parents[2] / ".env")
    sys.exit(main())
