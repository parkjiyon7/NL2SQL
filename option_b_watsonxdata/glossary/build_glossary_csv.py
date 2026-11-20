"""wxdi 용어집 가져오기용 CSV(fin_demo_glossary.csv)를 만든다.

- 카테고리는 이미 wxdi에 있는 `증권업무 용어`다(카테고리 행은 넣지 않는다).
- 동의어는 wxdi 규칙대로 "동의어도 하나의 용어"로 만들고, 대표 용어에서 `카테고리 >> 용어` 형식으로 연결한다.
  한 행에 관계 하나씩 쓴다(같은 용어를 여러 행으로 반복).
- 관계 열: Synonyms, Related Terms, Part of Terms, Type of Terms.

실행: ./venv/bin/python option_b_watsonxdata/glossary/build_glossary_csv.py
"""
import csv
import pathlib

CATEGORY = "증권업무 용어"
OUT = pathlib.Path(__file__).with_name("fin_demo_glossary.csv")

# 대표 용어와 정의 (정의에 컬럼명이 있으면 map_terms가 대응 컬럼으로 읽는다)
TERMS = {
    "VIP 고객": "총자산 3억원 이상인 고객. CUSTOMER.GRADE 값 VIP. GOLD는 1억원 이상",
    "거래대금": "체결된 주문의 금액 합계. 체결 수량 x 체결 가격. 컬럼 EXECUTIONS.EXEC_AMOUNT",
    "고객 등급": "고객 분류. CUSTOMER.GRADE 값 VIP GOLD GENERAL",
    "노출금액": "데스크 포지션의 금액으로 한도 소진 계산에 쓴다. 컬럼 ST_POSITIONS.EXPOSURE_AMOUNT",
    "데스크": "S&T 매매 부서 단위. 테이블 DESK. 한도와 담당 트레이더가 있다",
    "매도": "종목을 파는 주문. ORDERS.SIDE 값 SELL. 실현손익은 매도 체결에서만 발생한다",
    "매수": "종목을 사는 주문. ORDERS.SIDE 값 BUY",
    "미수금": "결제 대금이 부족해 생긴 미수 금액. 컬럼 BALANCE_DAILY.RECEIVABLE. 0보다 크면 미수가 있는 계좌. "
            "BALANCE_DAILY는 날짜(BASE_DATE)별 스냅샷 테이블이라 여러 날짜의 값을 더하면 안 된다. BASE_DATE가 테이블에서 가장 최근 날짜인 행만 사용한다",
    "미체결": "체결이 하나도 없는 주문. ORDERS에는 있고 EXECUTIONS에는 없는 주문(NOT EXISTS). "
            "미체결 시간은 현재 시각(CURRENT TIMESTAMP)과 주문 시각(ORDERS.ORDER_TS)의 차이다",
    "시장가 주문": "가격을 지정하지 않고 시장 가격으로 내는 주문. ORDERS.ORDER_TYPE 값 MARKET. ORDER_PRICE는 NULL",
    "신용융자": "증권사에서 돈을 빌려 매매하는 계좌. 컬럼 ACCOUNT.CREDIT_LOAN_YN이 Y",
    "실현손익": "매도 체결로 확정된 손익. 컬럼 EXECUTIONS.REALIZED_PNL 또는 ST_POSITIONS.REALIZED_PNL",
    "업종": "종목이 속한 산업 분류. 컬럼 PRODUCT.SECTOR. 예 반도체 2차전지 바이오 채권",
    "예수금": "계좌에 있는 현금 잔고. 컬럼 BALANCE_DAILY.CASH_BALANCE. BALANCE_DAILY는 날짜(BASE_DATE)별 스냅샷 테이블이라 여러 날짜의 값을 더하면 안 된다. BASE_DATE가 테이블에서 가장 최근 날짜인 행만 사용한다. "
            "고객별로 볼 때는 그 날짜의 계좌별 값을 고객 단위로 합산한다",
    "종목": "거래 대상 주식과 채권. 테이블 PRODUCT. 종목명은 PRODUCT_NAME",
    "주문": "고객이 낸 매매 요청 한 건. 테이블 ORDERS. 매매 구분은 SIDE 컬럼으로 BUY는 매수 SELL은 매도",
    "주민등록번호": "고객 개인정보(PII). 컬럼 CUSTOMER.SSN. 마스킹 대상",
    "지점": "고객이 소속된 영업점. 테이블 BRANCH. 고객은 CUSTOMER.BRANCH_CODE로 지점에 연결된다",
    "지정가 주문": "가격을 지정한 주문. ORDERS.ORDER_TYPE 값 LIMIT. ORDER_PRICE에 가격이 있다",
    "체결": "주문이 실제로 매매된 내역. 한 주문이 여러 번 나뉘어 체결될 수 있다. 테이블 EXECUTIONS. "
            "체결에는 계좌 정보가 없고 주문(ORDERS)을 거쳐 계좌와 고객에 연결된다",
    "총자산": "고객의 예수금과 평가금액의 합. 컬럼 CUSTOMER.TOTAL_ASSETS. 잔고라고 부르기도 한다",
    "평가금액": "보유 종목의 평가액. 컬럼 BALANCE_DAILY.EVAL_AMOUNT. BALANCE_DAILY는 날짜(BASE_DATE)별 스냅샷 테이블이라 여러 날짜의 값을 더하면 안 된다. BASE_DATE가 테이블에서 가장 최근 날짜인 행만 사용한다",
    "평가손익": "보유 포지션의 아직 확정되지 않은 손익. 컬럼 ST_POSITIONS.UNREALIZED_PNL",
    "한도 소진율": "데스크별 노출금액 합계를 데스크 한도(DESK.LIMIT_AMOUNT)로 나눈 비율. 노출금액은 날짜별 스냅샷이라 "
                "가장 최근 BASE_DATE 하루치(ST_POSITIONS.BASE_DATE = 최댓값)만 합산한다",
    "업종 내 순위": "같은 업종 안에서 종목을 거래대금 합계가 큰 순서로 매긴 순위. 업종(PRODUCT.SECTOR)별로 나누어 "
                 "거래대금 합계(SUM(EXEC_AMOUNT))를 내림차순으로 순위 함수(RANK() OVER (PARTITION BY ...))로 계산한다. 순위 값을 컬럼으로 함께 보여준다",
}

# 대표 용어 -> 같은 뜻의 다른 말. 각각 별도 용어로 만들고 대표 용어와 동의어로 연결한다.
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
    "한도 소진율": ["한도 대비 노출 비율", "한도율", "한도 대비 노출금액 비율"],
    "업종 내 순위": ["업종별 순위", "업종 내에서 순위"],
    "데스크": ["S&T 데스크"],
    "주민등록번호": ["주민번호", "SSN"],
}

# 서로 관련은 있지만 뜻이 다른 용어 (양방향이라 한쪽에만 쓴다)
RELATED = [("주문", "체결"), ("체결", "미체결"), ("실현손익", "평가손익"),
           ("노출금액", "한도 소진율"), ("VIP 고객", "고객 등급"), ("업종 내 순위", "업종"), ("업종 내 순위", "거래대금")]
# (부분, 전체): 예수금과 평가금액은 총자산의 일부다
PART_OF = [("예수금", "총자산"), ("평가금액", "총자산")]
# (하위, 상위): 주문의 한 종류
TYPE_OF = [("지정가 주문", "주문"), ("시장가 주문", "주문"), ("매수", "주문"), ("매도", "주문")]


def path(name: str) -> str:
    return f"{CATEGORY} >> {name}"


def main() -> None:
    header = ["Name", "Artifact Type", "Category", "Description", "Related Terms", "Synonyms", "Part of Terms", "Type of Terms"]
    rows = []

    def add(name, desc, **rel):
        row = {"Name": name, "Artifact Type": "glossary_term", "Category": CATEGORY, "Description": desc}
        row.update(rel)
        rows.append([row.get(h, "") for h in header])

    # wxdi 규칙: 한 용어의 값이 여러 개면 "연속된" 행으로 쓰고, 둘째 행부터는 설명을 비운다.
    # (떨어진 위치에서 같은 용어를 다시 쓰면 "artifact already imported"로 건너뛴다)
    for rep, aliases in SYNONYMS.items():
        for a in aliases:  # 동의어 용어는 먼저 한 번씩만 쓴다
            add(a, f"{rep}의 동의어. 같은 뜻으로 쓰는 다른 말이며 표준 용어는 {rep}이다")

    related, part_of, type_of = {}, {}, {}
    for a, b in RELATED:
        related.setdefault(a, []).append(path(b))
    for a, b in PART_OF:
        part_of.setdefault(a, []).append(path(b))
    for a, b in TYPE_OF:
        type_of.setdefault(a, []).append(path(b))

    for name, desc in TERMS.items():
        cols = {
            "Synonyms": [path(a) for a in SYNONYMS.get(name, [])],
            "Related Terms": related.get(name, []),
            "Part of Terms": part_of.get(name, []),
            "Type of Terms": type_of.get(name, []),
        }
        n = max([1] + [len(v) for v in cols.values()])
        for i in range(n):
            add(name, desc if i == 0 else "", **{k: v[i] for k, v in cols.items() if i < len(v)})

    with OUT.open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(header)
        w.writerows(rows)
    n_alias = sum(len(v) for v in SYNONYMS.values())
    print(f"wrote {OUT.name}: {len(rows)} rows, terms={len(TERMS)}, synonym terms={n_alias}")


if __name__ == "__main__":
    main()
