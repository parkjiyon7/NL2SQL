window.SAMPLES = {
 "tables": {
  "BRANCH": {
   "count": 5,
   "desc": "지점 정보. 지점 코드와 지점명",
   "columns": [
    {
     "name": "BRANCH_CODE",
     "type": "VARCHAR",
     "desc": "지점 코드 (예: GN01 강남지점)",
     "pii": false,
     "pk": true,
     "fk": ""
    },
    {
     "name": "BRANCH_NAME",
     "type": "VARCHAR",
     "desc": "지점명",
     "pii": false,
     "pk": false,
     "fk": ""
    }
   ],
   "rows": [
    [
     "GN01",
     "강남지점"
    ],
    [
     "YS01",
     "여의도지점"
    ],
    [
     "BD01",
     "분당지점"
    ],
    [
     "SC01",
     "서초지점"
    ],
    [
     "BS01",
     "부산지점"
    ]
   ]
  },
  "CUSTOMER": {
   "count": 40,
   "desc": "고객 정보. 주민번호, 전화, 이메일은 개인정보(PII)",
   "columns": [
    {
     "name": "CUSTOMER_ID",
     "type": "INTEGER",
     "desc": "고객 ID",
     "pii": false,
     "pk": true,
     "fk": ""
    },
    {
     "name": "CUSTOMER_NAME",
     "type": "VARCHAR",
     "desc": "고객 이름",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "SSN",
     "type": "VARCHAR",
     "desc": "주민등록번호 (개인정보 PII, 가상 번호)",
     "pii": true,
     "pk": false,
     "fk": ""
    },
    {
     "name": "PHONE",
     "type": "VARCHAR",
     "desc": "전화번호 (개인정보 PII, 가상 번호)",
     "pii": true,
     "pk": false,
     "fk": ""
    },
    {
     "name": "EMAIL",
     "type": "VARCHAR",
     "desc": "이메일 (개인정보 PII, 가상 주소)",
     "pii": true,
     "pk": false,
     "fk": ""
    },
    {
     "name": "GRADE",
     "type": "VARCHAR",
     "desc": "고객 등급. VIP는 총자산 3억원 이상, GOLD는 1억원 이상, 그 외 GENERAL",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "BRANCH_CODE",
     "type": "VARCHAR",
     "desc": "소속 지점 코드. 지점 테이블 참조",
     "pii": false,
     "pk": false,
     "fk": "BRANCH"
    },
    {
     "name": "TOTAL_ASSETS",
     "type": "DECIMAL",
     "desc": "총자산(원). 최근 기준일 예수금과 평가금액의 합",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "JOINED_DATE",
     "type": "DATE",
     "desc": "고객 가입일",
     "pii": false,
     "pk": false,
     "fk": ""
    }
   ],
   "rows": [
    [
     1,
     "박민준",
     "620109-2538915",
     "010-2263-4338",
     "user0001@example.com",
     "GOLD",
     "GN01",
     "295980000",
     "2020-12-25"
    ],
    [
     2,
     "양예은",
     "961105-1201030",
     "010-3035-6123",
     "user0002@example.com",
     "GENERAL",
     "SC01",
     "53160000",
     "2026-07-26"
    ],
    [
     3,
     "홍도현",
     "931224-2847304",
     "010-7060-0287",
     "user0003@example.com",
     "GOLD",
     "BD01",
     "144750000",
     "2026-02-11"
    ],
    [
     4,
     "우민준",
     "760207-2409494",
     "010-2866-8434",
     "user0004@example.com",
     "GOLD",
     "BS01",
     "184080000",
     "2025-03-27"
    ],
    [
     5,
     "강지유",
     "570322-2507561",
     "010-7657-5442",
     "user0005@example.com",
     "GENERAL",
     "YS01",
     "58470000",
     "2021-06-06"
    ]
   ]
  },
  "ACCOUNT": {
   "count": 57,
   "desc": "고객 계좌. 한 고객이 여러 계좌를 가질 수 있다",
   "columns": [
    {
     "name": "ACCOUNT_ID",
     "type": "INTEGER",
     "desc": "계좌 ID",
     "pii": false,
     "pk": true,
     "fk": ""
    },
    {
     "name": "CUSTOMER_ID",
     "type": "INTEGER",
     "desc": "계좌 소유 고객 ID. 고객 테이블 참조",
     "pii": false,
     "pk": false,
     "fk": "CUSTOMER"
    },
    {
     "name": "ACCOUNT_TYPE",
     "type": "VARCHAR",
     "desc": "계좌 유형. BROKERAGE 위탁, PENSION 연금, CMA",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "OPEN_DATE",
     "type": "DATE",
     "desc": "계좌 개설일",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "CREDIT_LOAN_YN",
     "type": "CHARACTER",
     "desc": "신용융자 계좌 여부. Y면 신용융자 계좌",
     "pii": false,
     "pk": false,
     "fk": ""
    }
   ],
   "rows": [
    [
     1000001,
     1,
     "BROKERAGE",
     "2025-12-28",
     "N"
    ],
    [
     1000002,
     2,
     "BROKERAGE",
     "2026-09-23",
     "N"
    ],
    [
     1000003,
     2,
     "PENSION",
     "2026-09-28",
     "N"
    ],
    [
     1000004,
     3,
     "BROKERAGE",
     "2026-04-06",
     "N"
    ],
    [
     1000005,
     4,
     "BROKERAGE",
     "2025-03-27",
     "N"
    ]
   ]
  },
  "PRODUCT": {
   "count": 32,
   "desc": "종목 정보. 주식과 채권",
   "columns": [
    {
     "name": "PRODUCT_CODE",
     "type": "VARCHAR",
     "desc": "종목 코드",
     "pii": false,
     "pk": true,
     "fk": ""
    },
    {
     "name": "PRODUCT_NAME",
     "type": "VARCHAR",
     "desc": "종목명 (예: 삼성전자)",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "MARKET",
     "type": "VARCHAR",
     "desc": "시장 구분. KOSPI 코스피, KOSDAQ 코스닥, BOND 채권",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "SECTOR",
     "type": "VARCHAR",
     "desc": "업종 (예: 반도체, 2차전지, 채권)",
     "pii": false,
     "pk": false,
     "fk": ""
    }
   ],
   "rows": [
    [
     "005930",
     "삼성전자",
     "KOSPI",
     "반도체"
    ],
    [
     "000660",
     "SK하이닉스",
     "KOSPI",
     "반도체"
    ],
    [
     "035420",
     "NAVER",
     "KOSPI",
     "IT서비스"
    ],
    [
     "005380",
     "현대차",
     "KOSPI",
     "자동차"
    ],
    [
     "000270",
     "기아",
     "KOSPI",
     "자동차"
    ]
   ]
  },
  "ORDERS": {
   "count": 200,
   "desc": "주문 내역. 주문 한 건당 한 행. 체결은 체결 테이블에 있고, 체결이 없는 주문은 미체결",
   "columns": [
    {
     "name": "ORDER_ID",
     "type": "BIGINT",
     "desc": "주문 ID",
     "pii": false,
     "pk": true,
     "fk": ""
    },
    {
     "name": "ACCOUNT_ID",
     "type": "INTEGER",
     "desc": "주문 계좌 ID. 계좌 테이블 참조",
     "pii": false,
     "pk": false,
     "fk": "ACCOUNT"
    },
    {
     "name": "PRODUCT_CODE",
     "type": "VARCHAR",
     "desc": "주문 종목 코드. 종목 테이블 참조",
     "pii": false,
     "pk": false,
     "fk": "PRODUCT"
    },
    {
     "name": "SIDE",
     "type": "VARCHAR",
     "desc": "매매 구분. BUY 매수, SELL 매도",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "ORDER_TYPE",
     "type": "VARCHAR",
     "desc": "주문 유형. LIMIT 지정가, MARKET 시장가",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "ORDER_TS",
     "type": "TIMESTAMP",
     "desc": "주문 시각",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "ORDER_QTY",
     "type": "INTEGER",
     "desc": "주문 수량",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "ORDER_PRICE",
     "type": "DECIMAL",
     "desc": "주문 가격. 지정가 주문만 값이 있고 시장가는 NULL",
     "pii": false,
     "pk": false,
     "fk": ""
    }
   ],
   "rows": [
    [
     5000001,
     1000026,
     "MB2401",
     "SELL",
     "MARKET",
     "2025-10-27 10:19:41",
     959,
     null
    ],
    [
     5000002,
     1000004,
     "015760",
     "SELL",
     "LIMIT",
     "2025-10-27 12:37:22",
     74,
     "22700.00"
    ],
    [
     5000003,
     1000035,
     "000270",
     "BUY",
     "LIMIT",
     "2025-10-28 13:22:20",
     75,
     "111800.00"
    ],
    [
     5000004,
     1000016,
     "035900",
     "SELL",
     "LIMIT",
     "2025-10-30 10:05:05",
     197,
     "62210.00"
    ],
    [
     5000005,
     1000055,
     "005930",
     "SELL",
     "LIMIT",
     "2025-10-31 11:05:26",
     578,
     "67210.00"
    ]
   ]
  },
  "EXECUTIONS": {
   "count": 243,
   "desc": "체결 내역. 한 주문이 여러 번 나뉘어 체결될 수 있다",
   "columns": [
    {
     "name": "EXEC_ID",
     "type": "BIGINT",
     "desc": "체결 ID",
     "pii": false,
     "pk": true,
     "fk": ""
    },
    {
     "name": "ORDER_ID",
     "type": "BIGINT",
     "desc": "체결된 주문 ID. 주문 테이블 참조",
     "pii": false,
     "pk": false,
     "fk": "ORDERS"
    },
    {
     "name": "EXEC_TS",
     "type": "TIMESTAMP",
     "desc": "체결 시각",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "EXEC_QTY",
     "type": "INTEGER",
     "desc": "체결 수량",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "EXEC_PRICE",
     "type": "DECIMAL",
     "desc": "체결 가격",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "EXEC_AMOUNT",
     "type": "DECIMAL",
     "desc": "체결대금(원). 거래대금, 약정금액과 같은 의미. 체결 수량 x 체결 가격",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "FEE",
     "type": "DECIMAL",
     "desc": "수수료(원)",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "REALIZED_PNL",
     "type": "DECIMAL",
     "desc": "실현손익(원). 매도 체결에만 값이 있고 매수 체결은 0",
     "pii": false,
     "pk": false,
     "fk": ""
    }
   ],
   "rows": [
    [
     9000001,
     5000001,
     "2025-10-27 10:19:53",
     959,
     "9990.00",
     "9580410",
     "1437.06",
     "950134"
    ],
    [
     9000002,
     5000002,
     "2025-10-27 12:42:34",
     42,
     "22710.00",
     "953820",
     "143.07",
     "75769"
    ],
    [
     9000003,
     5000003,
     "2025-10-28 14:23:18",
     55,
     "111690.00",
     "6142950",
     "921.44",
     "0"
    ],
    [
     9000004,
     5000003,
     "2025-10-28 14:23:42",
     20,
     "111800.00",
     "2236000",
     "335.40",
     "0"
    ],
    [
     9000005,
     5000004,
     "2025-10-30 10:11:01",
     57,
     "62210.00",
     "3545970",
     "531.90",
     "-112938"
    ]
   ]
  },
  "BALANCE_DAILY": {
   "count": 285,
   "desc": "계좌별 일별 잔고. 최근 5일",
   "columns": [
    {
     "name": "ACCOUNT_ID",
     "type": "INTEGER",
     "desc": "계좌 ID. 계좌 테이블 참조",
     "pii": false,
     "pk": true,
     "fk": "ACCOUNT"
    },
    {
     "name": "BASE_DATE",
     "type": "DATE",
     "desc": "기준일",
     "pii": false,
     "pk": true,
     "fk": ""
    },
    {
     "name": "CASH_BALANCE",
     "type": "DECIMAL",
     "desc": "예수금(원). 계좌에 있는 현금 잔고",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "EVAL_AMOUNT",
     "type": "DECIMAL",
     "desc": "평가금액(원). 보유 종목의 평가액",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "RECEIVABLE",
     "type": "DECIMAL",
     "desc": "미수금(원). 0보다 크면 미수가 있는 계좌",
     "pii": false,
     "pk": false,
     "fk": ""
    }
   ],
   "rows": [
    [
     1000001,
     "2026-11-23",
     "73378531",
     "222604757",
     "0"
    ],
    [
     1000002,
     "2026-11-23",
     "6799871",
     "13364081",
     "0"
    ],
    [
     1000003,
     "2026-11-23",
     "10656438",
     "22339853",
     "0"
    ],
    [
     1000004,
     "2026-11-23",
     "27907812",
     "116842850",
     "0"
    ],
    [
     1000005,
     "2026-11-23",
     "65553162",
     "118522611",
     "0"
    ]
   ]
  },
  "DESK": {
   "count": 4,
   "desc": "S&T 데스크 정보와 한도",
   "columns": [
    {
     "name": "DESK_ID",
     "type": "INTEGER",
     "desc": "데스크 ID",
     "pii": false,
     "pk": true,
     "fk": ""
    },
    {
     "name": "DESK_NAME",
     "type": "VARCHAR",
     "desc": "데스크명 (예: 채권데스크)",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "LIMIT_AMOUNT",
     "type": "DECIMAL",
     "desc": "데스크 한도(원). 한도 소진율은 노출금액 합계를 이 값으로 나눈 비율",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "TRADER_NAME",
     "type": "VARCHAR",
     "desc": "담당 트레이더 이름",
     "pii": false,
     "pk": false,
     "fk": ""
    }
   ],
   "rows": [
    [
     1,
     "주식1데스크",
     "17027000000",
     "박트레이더"
    ],
    [
     2,
     "주식2데스크",
     "10759000000",
     "한트레이더"
    ],
    [
     3,
     "채권데스크",
     "21393000000",
     "최트레이더"
    ],
    [
     4,
     "글로벌데스크",
     "27139000000",
     "강트레이더"
    ]
   ]
  },
  "ST_POSITIONS": {
   "count": 260,
   "desc": "데스크별 종목 포지션. 일별 스냅샷",
   "columns": [
    {
     "name": "DESK_ID",
     "type": "INTEGER",
     "desc": "데스크 ID. 데스크 테이블 참조",
     "pii": false,
     "pk": true,
     "fk": "DESK"
    },
    {
     "name": "PRODUCT_CODE",
     "type": "VARCHAR",
     "desc": "종목 코드. 종목 테이블 참조",
     "pii": false,
     "pk": true,
     "fk": "PRODUCT"
    },
    {
     "name": "BASE_DATE",
     "type": "DATE",
     "desc": "기준일",
     "pii": false,
     "pk": true,
     "fk": ""
    },
    {
     "name": "QTY",
     "type": "INTEGER",
     "desc": "보유 수량",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "EXPOSURE_AMOUNT",
     "type": "DECIMAL",
     "desc": "노출금액(원). 한도 소진에 쓰이는 포지션 금액",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "UNREALIZED_PNL",
     "type": "DECIMAL",
     "desc": "평가손익(원). 그날의 값",
     "pii": false,
     "pk": false,
     "fk": ""
    },
    {
     "name": "REALIZED_PNL",
     "type": "DECIMAL",
     "desc": "실현손익(원). 그날의 값",
     "pii": false,
     "pk": false,
     "fk": ""
    }
   ],
   "rows": [
    [
     1,
     "005930",
     "2026-11-23",
     30852,
     "2198860557",
     "-61156518",
     "-20480607"
    ],
    [
     1,
     "105560",
     "2026-11-23",
     12512,
     "1019168437",
     "-38240274",
     "13800533"
    ],
    [
     1,
     "000270",
     "2026-11-23",
     7808,
     "906755313",
     "3637290",
     "8793993"
    ],
    [
     1,
     "005380",
     "2026-11-23",
     3211,
     "816574301",
     "13761680",
     "-5118883"
    ],
    [
     1,
     "000660",
     "2026-11-23",
     12201,
     "2083514363",
     "-26605408",
     "-859229"
    ]
   ]
  }
 },
 "erd": "erDiagram\n  BRANCH ||--o{ CUSTOMER : \"소속\"\n  CUSTOMER ||--o{ ACCOUNT : \"보유\"\n  ACCOUNT ||--o{ ORDERS : \"주문\"\n  PRODUCT ||--o{ ORDERS : \"종목\"\n  ORDERS ||--o{ EXECUTIONS : \"체결\"\n  ACCOUNT ||--o{ BALANCE_DAILY : \"일별잔고\"\n  DESK ||--o{ ST_POSITIONS : \"포지션\"\n  PRODUCT ||--o{ ST_POSITIONS : \"종목\"\n  BRANCH {\n    string BRANCH_CODE PK\n    string BRANCH_NAME\n  }\n  CUSTOMER {\n    int CUSTOMER_ID PK\n    string CUSTOMER_NAME\n    string SSN\n    string PHONE\n    string EMAIL\n    string GRADE\n    string BRANCH_CODE FK\n    decimal TOTAL_ASSETS\n    date JOINED_DATE\n  }\n  ACCOUNT {\n    int ACCOUNT_ID PK\n    int CUSTOMER_ID FK\n    string ACCOUNT_TYPE\n    date OPEN_DATE\n    string CREDIT_LOAN_YN\n  }\n  PRODUCT {\n    string PRODUCT_CODE PK\n    string PRODUCT_NAME\n    string MARKET\n    string SECTOR\n  }\n  ORDERS {\n    bigint ORDER_ID PK\n    int ACCOUNT_ID FK\n    string PRODUCT_CODE FK\n    string SIDE\n    string ORDER_TYPE\n    timestamp ORDER_TS\n    int ORDER_QTY\n    decimal ORDER_PRICE\n  }\n  EXECUTIONS {\n    bigint EXEC_ID PK\n    bigint ORDER_ID FK\n    timestamp EXEC_TS\n    int EXEC_QTY\n    decimal EXEC_PRICE\n    decimal EXEC_AMOUNT\n    decimal FEE\n    decimal REALIZED_PNL\n  }\n  BALANCE_DAILY {\n    int ACCOUNT_ID PK,FK\n    date BASE_DATE PK\n    decimal CASH_BALANCE\n    decimal EVAL_AMOUNT\n    decimal RECEIVABLE\n  }\n  DESK {\n    int DESK_ID PK\n    string DESK_NAME\n    decimal LIMIT_AMOUNT\n    string TRADER_NAME\n  }\n  ST_POSITIONS {\n    int DESK_ID PK,FK\n    string PRODUCT_CODE PK,FK\n    date BASE_DATE PK\n    int QTY\n    decimal EXPOSURE_AMOUNT\n    decimal UNREALIZED_PNL\n    decimal REALIZED_PNL\n  }"
};
