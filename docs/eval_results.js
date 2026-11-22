window.EVAL = {
 "date": "2026-11-22",
 "n": 3,
 "ok": 27,
 "total": 30,
 "glossary": true,
 "items": [
  {
   "id": "S1-01",
   "question": "오늘 강남지점 체결 건수와 거래대금 알려줘",
   "golden_sql": "SELECT COUNT(*) AS CNT, SUM(e.EXEC_AMOUNT) AS AMT FROM FIN_DEMO.EXECUTIONS e JOIN FIN_DEMO.ORDERS o ON e.ORDER_ID = o.ORDER_ID JOIN FIN_DEMO.ACCOUNT a ON o.ACCOUNT_ID = a.ACCOUNT_ID JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID JOIN FIN_DEMO.BRANCH b ON c.BRANCH_CODE = b.BRANCH_CODE WHERE b.BRANCH_NAME = '강남지점' AND DATE(e.EXEC_TS) = CURRENT DATE",
   "golden_result": {
    "columns": [
     "CNT",
     "AMT"
    ],
    "rows": [
     [
      13,
      "262971250"
     ]
    ],
    "row_count": 1
   },
   "runs": [
    {
     "sql": "SELECT COUNT(\"e\".\"EXEC_ID\") AS \"execution_count\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"total_transaction_amount\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "execution_count",
       "total_transaction_amount"
      ],
      "rows": [
       [
        13,
        "262971250"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT COUNT(\"e\".\"EXEC_ID\") AS \"EXECUTION_COUNT\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"TOTAL_TRANSACTION_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "EXECUTION_COUNT",
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        13,
        "262971250"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT COUNT(\"e\".\"EXEC_ID\") AS \"EXECUTION_COUNT\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"TOTAL_TRANSACTION_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "EXECUTION_COUNT",
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        13,
        "262971250"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S1-02",
   "question": "잔고가 1억 이상인 고객 이름과 총자산을 보여줘",
   "golden_sql": "SELECT CUSTOMER_NAME, TOTAL_ASSETS FROM FIN_DEMO.CUSTOMER WHERE TOTAL_ASSETS >= 100000000",
   "golden_result": {
    "columns": [
     "CUSTOMER_NAME",
     "TOTAL_ASSETS"
    ],
    "rows": [
     [
      "박**",
      "295980000"
     ],
     [
      "홍**",
      "144750000"
     ],
     [
      "우**",
      "184080000"
     ],
     [
      "원**",
      "124120000"
     ],
     [
      "고**",
      "2076190000"
     ]
    ],
    "row_count": 15
   },
   "runs": [
    {
     "sql": "SELECT \"CUSTOMER_NAME\", \"TOTAL_ASSETS\" FROM \"FIN_DEMO\".\"CUSTOMER\" WHERE \"TOTAL_ASSETS\" > 100000000",
     "result": {
      "columns": [
       "CUSTOMER_NAME",
       "TOTAL_ASSETS"
      ],
      "rows": [
       [
        "박**",
        "295980000"
       ],
       [
        "홍**",
        "144750000"
       ],
       [
        "우**",
        "184080000"
       ],
       [
        "원**",
        "124120000"
       ],
       [
        "고**",
        "2076190000"
       ]
      ],
      "row_count": 15
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"CUSTOMER_NAME\", \"TOTAL_ASSETS\" FROM \"FIN_DEMO\".\"CUSTOMER\" WHERE \"TOTAL_ASSETS\" > 100000000",
     "result": {
      "columns": [
       "CUSTOMER_NAME",
       "TOTAL_ASSETS"
      ],
      "rows": [
       [
        "박**",
        "295980000"
       ],
       [
        "홍**",
        "144750000"
       ],
       [
        "우**",
        "184080000"
       ],
       [
        "원**",
        "124120000"
       ],
       [
        "고**",
        "2076190000"
       ]
      ],
      "row_count": 15
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"CUSTOMER_NAME\", \"TOTAL_ASSETS\" FROM \"FIN_DEMO\".\"CUSTOMER\" WHERE \"TOTAL_ASSETS\" > 100000000",
     "result": {
      "columns": [
       "CUSTOMER_NAME",
       "TOTAL_ASSETS"
      ],
      "rows": [
       [
        "박**",
        "295980000"
       ],
       [
        "홍**",
        "144750000"
       ],
       [
        "우**",
        "184080000"
       ],
       [
        "원**",
        "124120000"
       ],
       [
        "고**",
        "2076190000"
       ]
      ],
      "row_count": 15
     },
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S1-03",
   "question": "삼성전자 어제 체결 중 매수만 보여줘",
   "golden_sql": "SELECT e.EXEC_ID, e.EXEC_QTY, e.EXEC_PRICE FROM FIN_DEMO.EXECUTIONS e JOIN FIN_DEMO.ORDERS o ON e.ORDER_ID = o.ORDER_ID JOIN FIN_DEMO.PRODUCT p ON o.PRODUCT_CODE = p.PRODUCT_CODE WHERE p.PRODUCT_NAME = '삼성전자' AND o.SIDE = 'BUY' AND DATE(e.EXEC_TS) = CURRENT DATE - 1 DAY",
   "golden_result": {
    "columns": [
     "EXEC_ID",
     "EXEC_QTY",
     "EXEC_PRICE"
    ],
    "rows": [
     [
      9000180,
      64,
      "71800.00"
     ],
     [
      9000183,
      4,
      "71830.00"
     ],
     [
      9000184,
      123,
      "71960.00"
     ],
     [
      9000187,
      532,
      "71930.00"
     ],
     [
      9000189,
      88,
      "71800.00"
     ]
    ],
    "row_count": 11
   },
   "runs": [
    {
     "sql": "SELECT \"e\".\"EXEC_ID\", \"e\".\"ORDER_ID\", \"e\".\"EXEC_AMOUNT\", \"e\".\"EXEC_PRICE\", \"e\".\"EXEC_TS\", \"o\".\"ACCOUNT_ID\", \"o\".\"ORDER_PRICE\", \"o\".\"ORDER_QTY\", \"o\".\"SIDE\", \"p\".\"PRODUCT_NAME\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" WHERE \"p\".\"PRODUCT_NAME\" = '삼성전자' AND \"o\".\"SIDE\" = 'BUY' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
     "result": {
      "columns": [
       "EXEC_ID",
       "ORDER_ID",
       "EXEC_AMOUNT",
       "EXEC_PRICE",
       "EXEC_TS",
       "ACCOUNT_ID",
       "ORDER_PRICE",
       "ORDER_QTY",
       "SIDE",
       "PRODUCT_NAME"
      ],
      "rows": [
       [
        9000180,
        5000151,
        "4595200",
        "71800.00",
        "2026-11-21 09:28:09",
        1000017,
        null,
        64,
        "BUY",
        "삼성전자"
       ],
       [
        9000183,
        5000154,
        "287320",
        "71830.00",
        "2026-11-21 10:32:42",
        1000013,
        "71890.00",
        4,
        "BUY",
        "삼성전자"
       ],
       [
        9000184,
        5000155,
        "8851080",
        "71960.00",
        "2026-11-21 10:29:23",
        1000045,
        null,
        123,
        "BUY",
        "삼성전자"
       ],
       [
        9000187,
        5000157,
        "38266760",
        "71930.00",
        "2026-11-21 10:55:21",
        1000049,
        "71930.00",
        532,
        "BUY",
        "삼성전자"
       ],
       [
        9000189,
        5000159,
        "6318400",
        "71800.00",
        "2026-11-21 11:37:46",
        1000049,
        null,
        88,
        "BUY",
        "삼성전자"
       ]
      ],
      "row_count": 11
     },
     "pass": false,
     "status": "불일치(11행/정답 11행)"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"EXECUTIONS\".*, \"FIN_DEMO\".\"ORDERS\".*, \"FIN_DEMO\".\"PRODUCT\".* FROM \"FIN_DEMO\".\"EXECUTIONS\" JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" WHERE \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" = '삼성전자' AND \"FIN_DEMO\".\"ORDERS\".\"SIDE\" = 'BUY' AND DATE(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
     "result": {
      "columns": [
       "EXEC_ID",
       "ORDER_ID",
       "EXEC_TS",
       "EXEC_QTY",
       "EXEC_PRICE",
       "EXEC_AMOUNT",
       "FEE",
       "REALIZED_PNL",
       "ORDER_ID",
       "ACCOUNT_ID",
       "PRODUCT_CODE",
       "SIDE",
       "ORDER_TYPE",
       "ORDER_TS",
       "ORDER_QTY",
       "ORDER_PRICE",
       "PRODUCT_CODE",
       "PRODUCT_NAME",
       "MARKET",
       "SECTOR"
      ],
      "rows": [
       [
        9000180,
        5000151,
        "2026-11-21 09:28:09",
        64,
        "71800.00",
        "4595200",
        "689.28",
        "0",
        5000151,
        1000017,
        "005930",
        "BUY",
        "MARKET",
        "2026-11-21 09:27:52",
        64,
        null,
        "005930",
        "삼성전자",
        "KOSPI",
        "반도체"
       ],
       [
        9000183,
        5000154,
        "2026-11-21 10:32:42",
        4,
        "71830.00",
        "287320",
        "43.10",
        "0",
        5000154,
        1000013,
        "005930",
        "BUY",
        "LIMIT",
        "2026-11-21 10:24:59",
        4,
        "71890.00",
        "005930",
        "삼성전자",
        "KOSPI",
        "반도체"
       ],
       [
        9000184,
        5000155,
        "2026-11-21 10:29:23",
        123,
        "71960.00",
        "8851080",
        "1327.66",
        "0",
        5000155,
        1000045,
        "005930",
        "BUY",
        "MARKET",
        "2026-11-21 10:29:07",
        123,
        null,
        "005930",
        "삼성전자",
        "KOSPI",
        "반도체"
       ],
       [
        9000187,
        5000157,
        "2026-11-21 10:55:21",
        532,
        "71930.00",
        "38266760",
        "5740.01",
        "0",
        5000157,
        1000049,
        "005930",
        "BUY",
        "LIMIT",
        "2026-11-21 10:46:32",
        532,
        "71930.00",
        "005930",
        "삼성전자",
        "KOSPI",
        "반도체"
       ],
       [
        9000189,
        5000159,
        "2026-11-21 11:37:46",
        88,
        "71800.00",
        "6318400",
        "947.76",
        "0",
        5000159,
        1000049,
        "005930",
        "BUY",
        "MARKET",
        "2026-11-21 11:37:44",
        88,
        null,
        "005930",
        "삼성전자",
        "KOSPI",
        "반도체"
       ]
      ],
      "row_count": 11
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"e\".\"EXEC_ID\", \"e\".\"ORDER_ID\", \"e\".\"EXEC_AMOUNT\", \"e\".\"EXEC_PRICE\", \"e\".\"EXEC_QTY\", \"e\".\"EXEC_TS\", \"e\".\"REALIZED_PNL\", \"e\".\"FEE\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" WHERE \"p\".\"PRODUCT_NAME\" = '삼성전자' AND \"o\".\"SIDE\" = 'BUY' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
     "result": {
      "columns": [
       "EXEC_ID",
       "ORDER_ID",
       "EXEC_AMOUNT",
       "EXEC_PRICE",
       "EXEC_QTY",
       "EXEC_TS",
       "REALIZED_PNL",
       "FEE"
      ],
      "rows": [
       [
        9000180,
        5000151,
        "4595200",
        "71800.00",
        64,
        "2026-11-21 09:28:09",
        "0",
        "689.28"
       ],
       [
        9000183,
        5000154,
        "287320",
        "71830.00",
        4,
        "2026-11-21 10:32:42",
        "0",
        "43.10"
       ],
       [
        9000184,
        5000155,
        "8851080",
        "71960.00",
        123,
        "2026-11-21 10:29:23",
        "0",
        "1327.66"
       ],
       [
        9000187,
        5000157,
        "38266760",
        "71930.00",
        532,
        "2026-11-21 10:55:21",
        "0",
        "5740.01"
       ],
       [
        9000189,
        5000159,
        "6318400",
        "71800.00",
        88,
        "2026-11-21 11:37:46",
        "0",
        "947.76"
       ]
      ],
      "row_count": 11
     },
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S2-01",
   "question": "VIP 고객 중 예수금 많은 순으로 10명",
   "golden_sql": "SELECT c.CUSTOMER_NAME, SUM(b.CASH_BALANCE) AS CASH FROM FIN_DEMO.CUSTOMER c JOIN FIN_DEMO.ACCOUNT a ON a.CUSTOMER_ID = c.CUSTOMER_ID JOIN FIN_DEMO.BALANCE_DAILY b ON b.ACCOUNT_ID = a.ACCOUNT_ID WHERE c.GRADE = 'VIP' AND b.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY) GROUP BY c.CUSTOMER_ID, c.CUSTOMER_NAME ORDER BY CASH DESC FETCH FIRST 10 ROWS ONLY",
   "golden_result": {
    "columns": [
     "CUSTOMER_NAME",
     "CASH"
    ],
    "rows": [
     [
      "고**",
      "466173370"
     ],
     [
      "남**",
      "124173333"
     ],
     [
      "신**",
      "103005096"
     ],
     [
      "남**",
      "101626002"
     ]
    ],
    "row_count": 4
   },
   "runs": [
    {
     "sql": "SELECT \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\", SUM(\"bd\".\"CASH_BALANCE\") AS \"TOTAL_CASH_BALANCE\" FROM \"FIN_DEMO\".\"CUSTOMER\" \"c\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"c\".\"CUSTOMER_ID\" = \"a\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BALANCE_DAILY\" \"bd\" ON \"a\".\"ACCOUNT_ID\" = \"bd\".\"ACCOUNT_ID\" WHERE \"c\".\"GRADE\" = 'VIP' AND \"bd\".\"BASE_DATE\" = (SELECT MAX(\"BASE_DATE\") FROM \"FIN_DEMO\".\"BALANCE_DAILY\") GROUP BY \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_CASH_BALANCE\" DESC FETCH FIRST 10 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_CASH_BALANCE"
      ],
      "rows": [
       [
        14,
        "고**",
        "466173370"
       ],
       [
        37,
        "남**",
        "124173333"
       ],
       [
        30,
        "신**",
        "103005096"
       ],
       [
        29,
        "남**",
        "101626002"
       ]
      ],
      "row_count": 4
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\", SUM(\"bd\".\"CASH_BALANCE\") AS \"TOTAL_CASH_BALANCE\" FROM \"FIN_DEMO\".\"BALANCE_DAILY\" \"bd\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"bd\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" WHERE \"c\".\"GRADE\" = 'VIP' AND \"bd\".\"BASE_DATE\" = (SELECT MAX(\"BASE_DATE\") FROM \"FIN_DEMO\".\"BALANCE_DAILY\") GROUP BY \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_CASH_BALANCE\" DESC FETCH FIRST 10 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_CASH_BALANCE"
      ],
      "rows": [
       [
        14,
        "고**",
        "466173370"
       ],
       [
        37,
        "남**",
        "124173333"
       ],
       [
        30,
        "신**",
        "103005096"
       ],
       [
        29,
        "남**",
        "101626002"
       ]
      ],
      "row_count": 4
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\", SUM(\"bd\".\"CASH_BALANCE\") AS \"TOTAL_CASH_BALANCE\" FROM \"FIN_DEMO\".\"BALANCE_DAILY\" \"bd\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"bd\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" WHERE \"c\".\"GRADE\" = 'VIP' AND \"bd\".\"BASE_DATE\" = (SELECT MAX(\"BASE_DATE\") FROM \"FIN_DEMO\".\"BALANCE_DAILY\") GROUP BY \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_CASH_BALANCE\" DESC FETCH FIRST 10 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_CASH_BALANCE"
      ],
      "rows": [
       [
        14,
        "고**",
        "466173370"
       ],
       [
        37,
        "남**",
        "124173333"
       ],
       [
        30,
        "신**",
        "103005096"
       ],
       [
        29,
        "남**",
        "101626002"
       ]
      ],
      "row_count": 4
     },
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S2-02",
   "question": "이번 달 약정 상위 고객 5명",
   "golden_sql": "SELECT c.CUSTOMER_NAME, SUM(e.EXEC_AMOUNT) AS AMT FROM FIN_DEMO.EXECUTIONS e JOIN FIN_DEMO.ORDERS o ON e.ORDER_ID = o.ORDER_ID JOIN FIN_DEMO.ACCOUNT a ON o.ACCOUNT_ID = a.ACCOUNT_ID JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID WHERE YEAR(e.EXEC_TS) = YEAR(CURRENT DATE) AND MONTH(e.EXEC_TS) = MONTH(CURRENT DATE) GROUP BY c.CUSTOMER_ID, c.CUSTOMER_NAME ORDER BY AMT DESC FETCH FIRST 5 ROWS ONLY",
   "golden_result": {
    "columns": [
     "CUSTOMER_NAME",
     "AMT"
    ],
    "rows": [
     [
      "진**",
      "198465120"
     ],
     [
      "박**",
      "90599610"
     ],
     [
      "심**",
      "85510310"
     ],
     [
      "서**",
      "68488870"
     ],
     [
      "채**",
      "61692740"
     ]
    ],
    "row_count": 5
   },
   "runs": [
    {
     "sql": "SELECT \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" WHERE YEAR(\"e\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"e\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        31,
        "진**",
        "198465120"
       ],
       [
        1,
        "박**",
        "90599610"
       ],
       [
        35,
        "심**",
        "85510310"
       ],
       [
        11,
        "서**",
        "68488870"
       ],
       [
        20,
        "채**",
        "61692740"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" WHERE YEAR(\"e\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"e\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        31,
        "진**",
        "198465120"
       ],
       [
        1,
        "박**",
        "90599610"
       ],
       [
        35,
        "심**",
        "85510310"
       ],
       [
        11,
        "서**",
        "68488870"
       ],
       [
        20,
        "채**",
        "61692740"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" WHERE YEAR(\"e\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"e\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        31,
        "진**",
        "198465120"
       ],
       [
        1,
        "박**",
        "90599610"
       ],
       [
        35,
        "심**",
        "85510310"
       ],
       [
        11,
        "서**",
        "68488870"
       ],
       [
        20,
        "채**",
        "61692740"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S2-04",
   "question": "신용융자 계좌 보여줘",
   "golden_sql": "SELECT ACCOUNT_ID FROM FIN_DEMO.ACCOUNT WHERE CREDIT_LOAN_YN = 'Y'",
   "golden_result": {
    "columns": [
     "ACCOUNT_ID"
    ],
    "rows": [
     [
      1000006
     ],
     [
      1000007
     ],
     [
      1000021
     ],
     [
      1000023
     ],
     [
      1000036
     ]
    ],
    "row_count": 8
   },
   "runs": [
    {
     "sql": "SELECT \"ACCOUNT_ID\", \"CUSTOMER_ID\", \"CREDIT_LOAN_YN\", \"ACCOUNT_TYPE\" FROM \"FIN_DEMO\".\"ACCOUNT\" WHERE \"CREDIT_LOAN_YN\" = 'Y'",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "CUSTOMER_ID",
       "CREDIT_LOAN_YN",
       "ACCOUNT_TYPE"
      ],
      "rows": [
       [
        1000006,
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        26,
        "Y",
        "BROKERAGE"
       ]
      ],
      "row_count": 8
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"ACCOUNT_ID\", \"CUSTOMER_ID\", \"OPEN_DATE\", \"CREDIT_LOAN_YN\", \"ACCOUNT_TYPE\" FROM \"FIN_DEMO\".\"ACCOUNT\" WHERE \"CREDIT_LOAN_YN\" = 'Y'",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "CUSTOMER_ID",
       "OPEN_DATE",
       "CREDIT_LOAN_YN",
       "ACCOUNT_TYPE"
      ],
      "rows": [
       [
        1000006,
        5,
        "2023-02-09",
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        6,
        "2026-02-13",
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        14,
        "2026-04-05",
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        16,
        "2025-10-29",
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        26,
        "2025-08-08",
        "Y",
        "BROKERAGE"
       ]
      ],
      "row_count": 8
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"ACCOUNT_ID\", \"CUSTOMER_ID\", \"CREDIT_LOAN_YN\", \"ACCOUNT_TYPE\" FROM \"FIN_DEMO\".\"ACCOUNT\" WHERE \"CREDIT_LOAN_YN\" = 'Y'",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "CUSTOMER_ID",
       "CREDIT_LOAN_YN",
       "ACCOUNT_TYPE"
      ],
      "rows": [
       [
        1000006,
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        26,
        "Y",
        "BROKERAGE"
       ]
      ],
      "row_count": 8
     },
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S2-05",
   "question": "이번 달 체결대금 상위 고객 5명",
   "golden_sql": "SELECT c.CUSTOMER_NAME, SUM(e.EXEC_AMOUNT) AS AMT FROM FIN_DEMO.EXECUTIONS e JOIN FIN_DEMO.ORDERS o ON e.ORDER_ID = o.ORDER_ID JOIN FIN_DEMO.ACCOUNT a ON o.ACCOUNT_ID = a.ACCOUNT_ID JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID WHERE YEAR(e.EXEC_TS) = YEAR(CURRENT DATE) AND MONTH(e.EXEC_TS) = MONTH(CURRENT DATE) GROUP BY c.CUSTOMER_ID, c.CUSTOMER_NAME ORDER BY AMT DESC FETCH FIRST 5 ROWS ONLY",
   "golden_result": {
    "columns": [
     "CUSTOMER_NAME",
     "AMT"
    ],
    "rows": [
     [
      "진**",
      "198465120"
     ],
     [
      "박**",
      "90599610"
     ],
     [
      "심**",
      "85510310"
     ],
     [
      "서**",
      "68488870"
     ],
     [
      "채**",
      "61692740"
     ]
    ],
    "row_count": 5
   },
   "runs": [
    {
     "sql": "SELECT \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" WHERE YEAR(\"e\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"e\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        31,
        "진**",
        "198465120"
       ],
       [
        1,
        "박**",
        "90599610"
       ],
       [
        35,
        "심**",
        "85510310"
       ],
       [
        11,
        "서**",
        "68488870"
       ],
       [
        20,
        "채**",
        "61692740"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\", SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" ON \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" WHERE YEAR(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        31,
        "진**",
        "198465120"
       ],
       [
        1,
        "박**",
        "90599610"
       ],
       [
        35,
        "심**",
        "85510310"
       ],
       [
        11,
        "서**",
        "68488870"
       ],
       [
        20,
        "채**",
        "61692740"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" WHERE YEAR(\"e\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"e\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        31,
        "진**",
        "198465120"
       ],
       [
        1,
        "박**",
        "90599610"
       ],
       [
        35,
        "심**",
        "85510310"
       ],
       [
        11,
        "서**",
        "68488870"
       ],
       [
        20,
        "채**",
        "61692740"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S3-03",
   "question": "종목별 거래대금을 업종 내에서 순위 매겨줘",
   "golden_sql": "SELECT p.SECTOR, p.PRODUCT_NAME, SUM(e.EXEC_AMOUNT) AS AMT, RANK() OVER (PARTITION BY p.SECTOR ORDER BY SUM(e.EXEC_AMOUNT) DESC) AS RNK FROM FIN_DEMO.EXECUTIONS e JOIN FIN_DEMO.ORDERS o ON e.ORDER_ID = o.ORDER_ID JOIN FIN_DEMO.PRODUCT p ON o.PRODUCT_CODE = p.PRODUCT_CODE GROUP BY p.SECTOR, p.PRODUCT_NAME",
   "golden_result": {
    "columns": [
     "SECTOR",
     "PRODUCT_NAME",
     "AMT",
     "RNK"
    ],
    "rows": [
     [
      "2차전지",
      "에코프로비엠",
      "260297410",
      1
     ],
     [
      "2차전지",
      "삼성SDI",
      "68212950",
      2
     ],
     [
      "2차전지",
      "에코프로",
      "41504330",
      3
     ],
     [
      "IT서비스",
      "카카오",
      "68400910",
      1
     ],
     [
      "IT서비스",
      "NAVER",
      "11463680",
      2
     ]
    ],
    "row_count": 32
   },
   "runs": [
    {
     "sql": "SELECT \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\", RANK() OVER (PARTITION BY \"p\".\"SECTOR\" ORDER BY SUM(\"e\".\"EXEC_AMOUNT\") DESC) AS \"RANK_IN_SECTOR\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" GROUP BY \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\" ORDER BY \"p\".\"SECTOR\", \"RANK_IN_SECTOR\"",
     "result": {
      "columns": [
       "SECTOR",
       "PRODUCT_NAME",
       "TOTAL_AMOUNT",
       "RANK_IN_SECTOR"
      ],
      "rows": [
       [
        "2차전지",
        "에코프로비엠",
        "260297410",
        1
       ],
       [
        "2차전지",
        "삼성SDI",
        "68212950",
        2
       ],
       [
        "2차전지",
        "에코프로",
        "41504330",
        3
       ],
       [
        "IT서비스",
        "카카오",
        "68400910",
        1
       ],
       [
        "IT서비스",
        "NAVER",
        "11463680",
        2
       ]
      ],
      "row_count": 32
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\", RANK() OVER (PARTITION BY \"p\".\"SECTOR\" ORDER BY SUM(\"e\".\"EXEC_AMOUNT\") DESC) AS \"RANK_IN_SECTOR\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" GROUP BY \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\" ORDER BY \"p\".\"SECTOR\", \"RANK_IN_SECTOR\"",
     "result": {
      "columns": [
       "SECTOR",
       "PRODUCT_NAME",
       "TOTAL_AMOUNT",
       "RANK_IN_SECTOR"
      ],
      "rows": [
       [
        "2차전지",
        "에코프로비엠",
        "260297410",
        1
       ],
       [
        "2차전지",
        "삼성SDI",
        "68212950",
        2
       ],
       [
        "2차전지",
        "에코프로",
        "41504330",
        3
       ],
       [
        "IT서비스",
        "카카오",
        "68400910",
        1
       ],
       [
        "IT서비스",
        "NAVER",
        "11463680",
        2
       ]
      ],
      "row_count": 32
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\", RANK() OVER (PARTITION BY \"p\".\"SECTOR\" ORDER BY SUM(\"e\".\"EXEC_AMOUNT\") DESC) AS \"RANK_IN_SECTOR\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" GROUP BY \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\" ORDER BY \"p\".\"SECTOR\", \"RANK_IN_SECTOR\"",
     "result": {
      "columns": [
       "SECTOR",
       "PRODUCT_NAME",
       "TOTAL_AMOUNT",
       "RANK_IN_SECTOR"
      ],
      "rows": [
       [
        "2차전지",
        "에코프로비엠",
        "260297410",
        1
       ],
       [
        "2차전지",
        "삼성SDI",
        "68212950",
        2
       ],
       [
        "2차전지",
        "에코프로",
        "41504330",
        3
       ],
       [
        "IT서비스",
        "카카오",
        "68400910",
        1
       ],
       [
        "IT서비스",
        "NAVER",
        "11463680",
        2
       ]
      ],
      "row_count": 32
     },
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S3-04",
   "question": "주문 후 30분 넘게 미체결인 지정가 주문",
   "golden_sql": "SELECT o.ORDER_ID FROM FIN_DEMO.ORDERS o WHERE o.ORDER_TYPE = 'LIMIT' AND NOT EXISTS (SELECT 1 FROM FIN_DEMO.EXECUTIONS e WHERE e.ORDER_ID = o.ORDER_ID) AND o.ORDER_TS < CURRENT TIMESTAMP - 30 MINUTES",
   "golden_result": {
    "columns": [
     "ORDER_ID"
    ],
    "rows": [
     [
      5000049
     ],
     [
      5000178
     ],
     [
      5000183
     ],
     [
      5000195
     ],
     [
      5000044
     ]
    ],
    "row_count": 16
   },
   "runs": [
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ORDER_TS\", \"o\".\"ORDER_TYPE\", \"o\".\"ORDER_PRICE\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" LEFT JOIN \"FIN_DEMO\".\"EXECUTIONS\" \"e\" ON \"o\".\"ORDER_ID\" = \"e\".\"ORDER_ID\" WHERE \"e\".\"ORDER_ID\" IS NULL AND \"o\".\"ORDER_TYPE\" = 'LIMIT' AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS)) > 30",
     "result": null,
     "error": "[IBM][CLI Driver][DB2/LINUXX8664] SQL0010N  The string constant beginning with \"\"ORDER_TS)) > 30\" does not have an ending string delimiter.  SQLSTATE=42603 SQLCODE=-10",
     "pass": false,
     "status": "실행오류 TS)) > 30\" does not have an ending string delimiter.  SQLSTATE=42603 SQLCODE=-10"
    },
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ORDER_TS\", \"o\".\"ORDER_TYPE\", \"o\".\"ORDER_PRICE\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" LEFT JOIN \"FIN_DEMO\".\"EXECUTIONS\" \"e\" ON \"o\".\"ORDER_ID\" = \"e\".\"ORDER_ID\" WHERE \"o\".\"ORDER_TYPE\" = 'LIMIT' AND \"e\".\"ORDER_ID\" IS NULL AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS)) > 30",
     "result": null,
     "error": "[IBM][CLI Driver][DB2/LINUXX8664] SQL0010N  The string constant beginning with \"\"ORDER_TS)) > 30\" does not have an ending string delimiter.  SQLSTATE=42603 SQLCODE=-10",
     "pass": false,
     "status": "실행오류 TS)) > 30\" does not have an ending string delimiter.  SQLSTATE=42603 SQLCODE=-10"
    },
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ACCOUNT_ID\", \"o\".\"ORDER_TS\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" LEFT JOIN \"FIN_DEMO\".\"EXECUTIONS\" \"e\" ON \"o\".\"ORDER_ID\" = \"e\".\"ORDER_ID\" WHERE \"e\".\"ORDER_ID\" IS NULL AND \"o\".\"ORDER_TYPE\" = 'LIMIT' AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS\")) > 30",
     "result": {
      "columns": [
       "ORDER_ID",
       "ACCOUNT_ID",
       "ORDER_TS"
      ],
      "rows": [
       [
        5000049,
        1000033,
        "2026-03-06 14:05:54"
       ],
       [
        5000178,
        1000003,
        "2026-11-22 09:26:05"
       ],
       [
        5000183,
        1000022,
        "2026-11-22 10:26:20"
       ],
       [
        5000195,
        1000035,
        "2026-11-22 12:50:03"
       ],
       [
        5000044,
        1000056,
        "2026-02-23 11:04:25"
       ]
      ],
      "row_count": 16
     },
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S5-02",
   "question": "한도 대비 노출금액 비율이 80%를 넘는 데스크가 있어?",
   "golden_sql": "SELECT d.DESK_NAME FROM FIN_DEMO.ST_POSITIONS s JOIN FIN_DEMO.DESK d ON s.DESK_ID = d.DESK_ID WHERE s.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.ST_POSITIONS) GROUP BY d.DESK_NAME, d.LIMIT_AMOUNT HAVING SUM(s.EXPOSURE_AMOUNT) / d.LIMIT_AMOUNT > 0.8",
   "golden_result": {
    "columns": [
     "DESK_NAME"
    ],
    "rows": [
     [
      "주식2데스크"
     ]
    ],
    "row_count": 1
   },
   "runs": [
    {
     "sql": "SELECT \"d\".\"DESK_NAME\", SUM(\"s\".\"EXPOSURE_AMOUNT\") / \"d\".\"LIMIT_AMOUNT\" AS \"USAGE_RATIO\" FROM \"FIN_DEMO\".\"ST_POSITIONS\" \"s\" JOIN \"FIN_DEMO\".\"DESK\" \"d\" ON \"s\".\"DESK_ID\" = \"d\".\"DESK_ID\" WHERE \"s\".\"BASE_DATE\" = (SELECT MAX(\"BASE_DATE\") FROM \"FIN_DEMO\".\"ST_POSITIONS\") GROUP BY \"d\".\"DESK_NAME\", \"d\".\"LIMIT_AMOUNT\" HAVING SUM(\"s\".\"EXPOSURE_AMOUNT\") / \"d\".\"LIMIT_AMOUNT\" > 0.8",
     "result": {
      "columns": [
       "DESK_NAME",
       "USAGE_RATIO"
      ],
      "rows": [
       [
        "주식2데스크",
        "0.859991"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"d\".\"DESK_NAME\", SUM(\"s\".\"EXPOSURE_AMOUNT\") / \"d\".\"LIMIT_AMOUNT\" AS \"USAGE_RATIO\" FROM \"FIN_DEMO\".\"ST_POSITIONS\" \"s\" JOIN \"FIN_DEMO\".\"DESK\" \"d\" ON \"s\".\"DESK_ID\" = \"d\".\"DESK_ID\" WHERE \"s\".\"BASE_DATE\" = (SELECT MAX(\"BASE_DATE\") FROM \"FIN_DEMO\".\"ST_POSITIONS\") GROUP BY \"d\".\"DESK_NAME\", \"d\".\"LIMIT_AMOUNT\" HAVING SUM(\"s\".\"EXPOSURE_AMOUNT\") / \"d\".\"LIMIT_AMOUNT\" > 0.8",
     "result": {
      "columns": [
       "DESK_NAME",
       "USAGE_RATIO"
      ],
      "rows": [
       [
        "주식2데스크",
        "0.859991"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"d\".\"DESK_NAME\", SUM(\"s\".\"EXPOSURE_AMOUNT\") / \"d\".\"LIMIT_AMOUNT\" AS \"USAGE_RATIO\" FROM \"FIN_DEMO\".\"ST_POSITIONS\" \"s\" JOIN \"FIN_DEMO\".\"DESK\" \"d\" ON \"s\".\"DESK_ID\" = \"d\".\"DESK_ID\" WHERE \"s\".\"BASE_DATE\" = (SELECT MAX(\"BASE_DATE\") FROM \"FIN_DEMO\".\"ST_POSITIONS\") GROUP BY \"d\".\"DESK_NAME\", \"d\".\"LIMIT_AMOUNT\" HAVING SUM(\"s\".\"EXPOSURE_AMOUNT\") / \"d\".\"LIMIT_AMOUNT\" > 0.8",
     "result": {
      "columns": [
       "DESK_NAME",
       "USAGE_RATIO"
      ],
      "rows": [
       [
        "주식2데스크",
        "0.859991"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    }
   ]
  }
 ]
};
