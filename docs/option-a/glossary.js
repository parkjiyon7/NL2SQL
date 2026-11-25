window.GLOSSARY = {
 "category": "증권업무 용어",
 "terms": [
  {
   "name": "VIP 고객",
   "desc": "총자산 3억원 이상인 고객. CUSTOMER.GRADE 값 VIP. GOLD는 1억원 이상",
   "synonyms": [
    "VIP",
    "우수고객"
   ],
   "related": [
    "고객 등급"
   ],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "거래대금",
   "desc": "체결된 주문의 금액 합계. 체결 수량 x 체결 가격. 컬럼 EXECUTIONS.EXEC_AMOUNT",
   "synonyms": [
    "약정",
    "약정금액",
    "체결대금",
    "약정대금"
   ],
   "related": [
    "업종 내 순위"
   ],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "고객 등급",
   "desc": "고객 분류. CUSTOMER.GRADE 값 VIP GOLD GENERAL",
   "synonyms": [
    "등급"
   ],
   "related": [
    "VIP 고객"
   ],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "노출금액",
   "desc": "데스크 포지션의 금액으로 한도 소진 계산에 쓴다. 컬럼 ST_POSITIONS.EXPOSURE_AMOUNT",
   "synonyms": [
    "익스포저",
    "포지션 금액"
   ],
   "related": [
    "한도 소진율"
   ],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "데스크",
   "desc": "S&T 매매 부서 단위. 테이블 DESK. 한도와 담당 트레이더가 있다",
   "synonyms": [
    "S&T 데스크"
   ],
   "related": [],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "매도",
   "desc": "종목을 파는 주문. ORDERS.SIDE 값 SELL. 실현손익은 매도 체결에서만 발생한다",
   "synonyms": [],
   "related": [],
   "partOf": [],
   "typeOf": [
    "주문"
   ]
  },
  {
   "name": "매수",
   "desc": "종목을 사는 주문. ORDERS.SIDE 값 BUY",
   "synonyms": [],
   "related": [],
   "partOf": [],
   "typeOf": [
    "주문"
   ]
  },
  {
   "name": "미수금",
   "desc": "결제 대금이 부족해 생긴 미수 금액. 컬럼 BALANCE_DAILY.RECEIVABLE. 0보다 크면 미수가 있는 계좌. BALANCE_DAILY는 날짜(BASE_DATE)별 스냅샷 테이블이라 여러 날짜의 값을 더하면 안 된다. BASE_DATE가 테이블에서 가장 최근 날짜인 행만 사용한다",
   "synonyms": [
    "미수"
   ],
   "related": [],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "미체결",
   "desc": "체결이 하나도 없는 주문. ORDERS에는 있고 EXECUTIONS에는 없는 주문(NOT EXISTS). 미체결 시간은 현재 시각(CURRENT TIMESTAMP)과 주문 시각(ORDERS.ORDER_TS)의 차이다",
   "synonyms": [],
   "related": [
    "체결"
   ],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "시장가 주문",
   "desc": "가격을 지정하지 않고 시장 가격으로 내는 주문. ORDERS.ORDER_TYPE 값 MARKET. ORDER_PRICE는 NULL",
   "synonyms": [],
   "related": [],
   "partOf": [],
   "typeOf": [
    "주문"
   ]
  },
  {
   "name": "신용융자",
   "desc": "증권사에서 돈을 빌려 매매하는 계좌. 컬럼 ACCOUNT.CREDIT_LOAN_YN이 Y",
   "synonyms": [
    "신용거래",
    "신용 융자"
   ],
   "related": [],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "실현손익",
   "desc": "매도 체결로 확정된 손익. 컬럼 EXECUTIONS.REALIZED_PNL 또는 ST_POSITIONS.REALIZED_PNL",
   "synonyms": [
    "실현 PnL",
    "확정손익"
   ],
   "related": [
    "평가손익"
   ],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "업종",
   "desc": "종목이 속한 산업 분류. 컬럼 PRODUCT.SECTOR. 예 반도체 2차전지 바이오 채권",
   "synonyms": [
    "섹터",
    "산업"
   ],
   "related": [
    "업종 내 순위"
   ],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "예수금",
   "desc": "계좌에 있는 현금 잔고. 컬럼 BALANCE_DAILY.CASH_BALANCE. BALANCE_DAILY는 날짜(BASE_DATE)별 스냅샷 테이블이라 여러 날짜의 값을 더하면 안 된다. BASE_DATE가 테이블에서 가장 최근 날짜인 행만 사용한다. 고객별로 볼 때는 그 날짜의 계좌별 값을 고객 단위로 합산한다",
   "synonyms": [
    "현금잔고",
    "현금 잔고"
   ],
   "related": [],
   "partOf": [
    "총자산"
   ],
   "typeOf": []
  },
  {
   "name": "종목",
   "desc": "거래 대상 주식과 채권. 테이블 PRODUCT. 종목명은 PRODUCT_NAME",
   "synonyms": [
    "상품"
   ],
   "related": [],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "주문",
   "desc": "고객이 낸 매매 요청 한 건. 테이블 ORDERS. 매매 구분은 SIDE 컬럼으로 BUY는 매수 SELL은 매도",
   "synonyms": [],
   "related": [
    "체결"
   ],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "주민등록번호",
   "desc": "고객 개인정보(PII). 컬럼 CUSTOMER.SSN. 마스킹 대상",
   "synonyms": [
    "주민번호",
    "SSN"
   ],
   "related": [],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "지점",
   "desc": "고객이 소속된 영업점. 테이블 BRANCH. 고객은 CUSTOMER.BRANCH_CODE로 지점에 연결된다",
   "synonyms": [
    "영업점",
    "우리 지점"
   ],
   "related": [],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "지정가 주문",
   "desc": "가격을 지정한 주문. ORDERS.ORDER_TYPE 값 LIMIT. ORDER_PRICE에 가격이 있다",
   "synonyms": [],
   "related": [],
   "partOf": [],
   "typeOf": [
    "주문"
   ]
  },
  {
   "name": "체결",
   "desc": "주문이 실제로 매매된 내역. 한 주문이 여러 번 나뉘어 체결될 수 있다. 테이블 EXECUTIONS. 체결에는 계좌 정보가 없고 주문(ORDERS)을 거쳐 계좌와 고객에 연결된다",
   "synonyms": [
    "체결내역"
   ],
   "related": [
    "미체결",
    "주문"
   ],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "총자산",
   "desc": "고객의 예수금과 평가금액의 합. 컬럼 CUSTOMER.TOTAL_ASSETS. 잔고라고 부르기도 한다",
   "synonyms": [
    "잔고",
    "자산"
   ],
   "related": [],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "평가금액",
   "desc": "보유 종목의 평가액. 컬럼 BALANCE_DAILY.EVAL_AMOUNT. BALANCE_DAILY는 날짜(BASE_DATE)별 스냅샷 테이블이라 여러 날짜의 값을 더하면 안 된다. BASE_DATE가 테이블에서 가장 최근 날짜인 행만 사용한다",
   "synonyms": [
    "주식평가금액"
   ],
   "related": [],
   "partOf": [
    "총자산"
   ],
   "typeOf": []
  },
  {
   "name": "평가손익",
   "desc": "보유 포지션의 아직 확정되지 않은 손익. 컬럼 ST_POSITIONS.UNREALIZED_PNL",
   "synonyms": [
    "미실현손익",
    "평가 PnL"
   ],
   "related": [
    "실현손익"
   ],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "한도 소진율",
   "desc": "데스크별 노출금액 합계를 데스크 한도(DESK.LIMIT_AMOUNT)로 나눈 비율. 노출금액은 날짜별 스냅샷이라 가장 최근 BASE_DATE 하루치(ST_POSITIONS.BASE_DATE = 최댓값)만 합산한다",
   "synonyms": [
    "한도 대비 노출 비율",
    "한도율",
    "한도 대비 노출금액 비율"
   ],
   "related": [
    "노출금액"
   ],
   "partOf": [],
   "typeOf": []
  },
  {
   "name": "업종 내 순위",
   "desc": "같은 업종 안에서 종목을 거래대금 합계가 큰 순서로 매긴 순위. 업종(PRODUCT.SECTOR)별로 나누어 거래대금 합계(SUM(EXEC_AMOUNT))를 내림차순으로 순위 함수(RANK() OVER (PARTITION BY ...))로 계산한다. 순위 값을 컬럼으로 함께 보여준다",
   "synonyms": [
    "업종별 순위",
    "업종 내에서 순위"
   ],
   "related": [
    "업종",
    "거래대금"
   ],
   "partOf": [],
   "typeOf": []
  }
 ],
 "synonymCount": 35
};
