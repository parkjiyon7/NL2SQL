window.EVAL = {
 "date": "2026-11-24",
 "n": 5,
 "ok": 49,
 "total": 50,
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
      11,
      "101068930"
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
        11,
        "101068930"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT COUNT(\"e\".\"EXEC_ID\") AS \"EXECUTION_COUNT\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "EXECUTION_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        11,
        "101068930"
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
        11,
        "101068930"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT COUNT(\"e\".\"EXEC_ID\") AS \"EXEC_COUNT\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        11,
        "101068930"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT COUNT(\"e\".\"EXEC_ID\") AS \"EXEC_COUNT\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        11,
        "101068930"
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
      "박민준",
      "295980000"
     ],
     [
      "홍도현",
      "144750000"
     ],
     [
      "우민준",
      "184080000"
     ],
     [
      "원서현",
      "124120000"
     ],
     [
      "고민서",
      "2076190000"
     ]
    ],
    "row_count": 15
   },
   "runs": [
    {
     "sql": "SELECT \"CUSTOMER_NAME\", \"TOTAL_ASSETS\" FROM \"FIN_DEMO\".\"CUSTOMER\" WHERE \"TOTAL_ASSETS\" >= 100000000",
     "result": {
      "columns": [
       "CUSTOMER_NAME",
       "TOTAL_ASSETS"
      ],
      "rows": [
       [
        "박민준",
        "295980000"
       ],
       [
        "홍도현",
        "144750000"
       ],
       [
        "우민준",
        "184080000"
       ],
       [
        "원서현",
        "124120000"
       ],
       [
        "고민서",
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
        "박민준",
        "295980000"
       ],
       [
        "홍도현",
        "144750000"
       ],
       [
        "우민준",
        "184080000"
       ],
       [
        "원서현",
        "124120000"
       ],
       [
        "고민서",
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
        "박민준",
        "295980000"
       ],
       [
        "홍도현",
        "144750000"
       ],
       [
        "우민준",
        "184080000"
       ],
       [
        "원서현",
        "124120000"
       ],
       [
        "고민서",
        "2076190000"
       ]
      ],
      "row_count": 15
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"CUSTOMER_NAME\", \"TOTAL_ASSETS\" FROM \"FIN_DEMO\".\"CUSTOMER\" WHERE \"TOTAL_ASSETS\" >= 100000000",
     "result": {
      "columns": [
       "CUSTOMER_NAME",
       "TOTAL_ASSETS"
      ],
      "rows": [
       [
        "박민준",
        "295980000"
       ],
       [
        "홍도현",
        "144750000"
       ],
       [
        "우민준",
        "184080000"
       ],
       [
        "원서현",
        "124120000"
       ],
       [
        "고민서",
        "2076190000"
       ]
      ],
      "row_count": 15
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"CUSTOMER_NAME\", \"TOTAL_ASSETS\" FROM \"FIN_DEMO\".\"CUSTOMER\" WHERE \"TOTAL_ASSETS\" >= 100000000",
     "result": {
      "columns": [
       "CUSTOMER_NAME",
       "TOTAL_ASSETS"
      ],
      "rows": [
       [
        "박민준",
        "295980000"
       ],
       [
        "홍도현",
        "144750000"
       ],
       [
        "우민준",
        "184080000"
       ],
       [
        "원서현",
        "124120000"
       ],
       [
        "고민서",
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
      9000183,
      30,
      "71290.00"
     ],
     [
      9000187,
      39,
      "71380.00"
     ],
     [
      9000188,
      57,
      "71280.00"
     ],
     [
      9000190,
      461,
      "71130.00"
     ],
     [
      9000192,
      50,
      "71290.00"
     ]
    ],
    "row_count": 10
   },
   "runs": [
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
        9000183,
        5000151,
        "2138700",
        "71290.00",
        30,
        "2026-11-23 09:28:12",
        "0",
        "320.80"
       ],
       [
        9000187,
        5000154,
        "2783820",
        "71380.00",
        39,
        "2026-11-23 10:33:48",
        "0",
        "417.57"
       ],
       [
        9000188,
        5000155,
        "4062960",
        "71280.00",
        57,
        "2026-11-23 10:29:09",
        "0",
        "609.44"
       ],
       [
        9000190,
        5000157,
        "32790930",
        "71130.00",
        461,
        "2026-11-23 12:39:25",
        "0",
        "4918.64"
       ],
       [
        9000192,
        5000159,
        "3564500",
        "71290.00",
        50,
        "2026-11-23 11:37:47",
        "0",
        "534.67"
       ]
      ],
      "row_count": 10
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_ID\", \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_PRICE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_QTY\", \"FIN_DEMO\".\"ORDERS\".\"SIDE\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" FROM \"FIN_DEMO\".\"EXECUTIONS\" JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" WHERE \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" = '삼성전자' AND \"FIN_DEMO\".\"ORDERS\".\"SIDE\" = 'BUY' AND DATE(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
     "result": {
      "columns": [
       "EXEC_ID",
       "ORDER_ID",
       "EXEC_AMOUNT",
       "ORDER_PRICE",
       "ORDER_QTY",
       "SIDE",
       "PRODUCT_NAME"
      ],
      "rows": [
       [
        9000183,
        5000151,
        "2138700",
        null,
        30,
        "BUY",
        "삼성전자"
       ],
       [
        9000187,
        5000154,
        "2783820",
        "71380.00",
        39,
        "BUY",
        "삼성전자"
       ],
       [
        9000188,
        5000155,
        "4062960",
        null,
        57,
        "BUY",
        "삼성전자"
       ],
       [
        9000190,
        5000157,
        "32790930",
        "71200.00",
        461,
        "BUY",
        "삼성전자"
       ],
       [
        9000192,
        5000159,
        "3564500",
        null,
        50,
        "BUY",
        "삼성전자"
       ]
      ],
      "row_count": 10
     },
     "pass": false,
     "status": "불일치(10행/정답 10행)"
    },
    {
     "sql": "SELECT \"e\".\"EXEC_ID\", \"e\".\"ORDER_ID\", \"e\".\"EXEC_AMOUNT\", \"e\".\"EXEC_PRICE\", \"e\".\"EXEC_QTY\", \"e\".\"REALIZED_PNL\", \"e\".\"FEE\", \"o\".\"ORDER_TS\", \"p\".\"PRODUCT_NAME\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" WHERE \"p\".\"PRODUCT_NAME\" = '삼성전자' AND \"o\".\"SIDE\" = 'BUY' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
     "result": {
      "columns": [
       "EXEC_ID",
       "ORDER_ID",
       "EXEC_AMOUNT",
       "EXEC_PRICE",
       "EXEC_QTY",
       "REALIZED_PNL",
       "FEE",
       "ORDER_TS",
       "PRODUCT_NAME"
      ],
      "rows": [
       [
        9000183,
        5000151,
        "2138700",
        "71290.00",
        30,
        "0",
        "320.80",
        "2026-11-23 09:27:52",
        "삼성전자"
       ],
       [
        9000187,
        5000154,
        "2783820",
        "71380.00",
        39,
        "0",
        "417.57",
        "2026-11-23 10:24:59",
        "삼성전자"
       ],
       [
        9000188,
        5000155,
        "4062960",
        "71280.00",
        57,
        "0",
        "609.44",
        "2026-11-23 10:29:07",
        "삼성전자"
       ],
       [
        9000190,
        5000157,
        "32790930",
        "71130.00",
        461,
        "0",
        "4918.64",
        "2026-11-23 10:46:32",
        "삼성전자"
       ],
       [
        9000192,
        5000159,
        "3564500",
        "71290.00",
        50,
        "0",
        "534.67",
        "2026-11-23 11:37:44",
        "삼성전자"
       ]
      ],
      "row_count": 10
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"e\".\"EXEC_ID\", \"e\".\"EXEC_TS\", \"e\".\"EXEC_QTY\", \"e\".\"EXEC_PRICE\", \"e\".\"EXEC_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" WHERE \"p\".\"PRODUCT_NAME\" = '삼성전자' AND \"o\".\"SIDE\" = 'BUY' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE - 1 DAY ORDER BY \"e\".\"EXEC_TS\"",
     "result": {
      "columns": [
       "EXEC_ID",
       "EXEC_TS",
       "EXEC_QTY",
       "EXEC_PRICE",
       "EXEC_AMOUNT"
      ],
      "rows": [
       [
        9000183,
        "2026-11-23 09:28:12",
        30,
        "71290.00",
        "2138700"
       ],
       [
        9000188,
        "2026-11-23 10:29:09",
        57,
        "71280.00",
        "4062960"
       ],
       [
        9000187,
        "2026-11-23 10:33:48",
        39,
        "71380.00",
        "2783820"
       ],
       [
        9000192,
        "2026-11-23 11:37:47",
        50,
        "71290.00",
        "3564500"
       ],
       [
        9000193,
        "2026-11-23 11:49:12",
        92,
        "71190.00",
        "6549480"
       ]
      ],
      "row_count": 10
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"e\".\"EXEC_ID\", \"e\".\"ORDER_ID\", \"e\".\"EXEC_AMOUNT\", \"e\".\"EXEC_QTY\", \"e\".\"EXEC_PRICE\", \"e\".\"EXEC_TS\", \"o\".\"ORDER_ID\", \"o\".\"ACCOUNT_ID\", \"o\".\"ORDER_PRICE\", \"o\".\"ORDER_QTY\", \"o\".\"SIDE\", \"o\".\"PRODUCT_CODE\", \"o\".\"ORDER_TYPE\", \"o\".\"ORDER_TS\", \"p\".\"PRODUCT_NAME\", \"p\".\"PRODUCT_CODE\", \"p\".\"SECTOR\", \"p\".\"MARKET\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" WHERE \"p\".\"PRODUCT_NAME\" = '삼성전자' AND \"o\".\"SIDE\" = 'BUY' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
     "result": {
      "columns": [
       "EXEC_ID",
       "ORDER_ID",
       "EXEC_AMOUNT",
       "EXEC_QTY",
       "EXEC_PRICE",
       "EXEC_TS",
       "ORDER_ID",
       "ACCOUNT_ID",
       "ORDER_PRICE",
       "ORDER_QTY",
       "SIDE",
       "PRODUCT_CODE",
       "ORDER_TYPE",
       "ORDER_TS",
       "PRODUCT_NAME",
       "PRODUCT_CODE",
       "SECTOR",
       "MARKET"
      ],
      "rows": [
       [
        9000183,
        5000151,
        "2138700",
        30,
        "71290.00",
        "2026-11-23 09:28:12",
        5000151,
        1000017,
        null,
        30,
        "BUY",
        "005930",
        "MARKET",
        "2026-11-23 09:27:52",
        "삼성전자",
        "005930",
        "반도체",
        "KOSPI"
       ],
       [
        9000187,
        5000154,
        "2783820",
        39,
        "71380.00",
        "2026-11-23 10:33:48",
        5000154,
        1000013,
        "71380.00",
        39,
        "BUY",
        "005930",
        "LIMIT",
        "2026-11-23 10:24:59",
        "삼성전자",
        "005930",
        "반도체",
        "KOSPI"
       ],
       [
        9000188,
        5000155,
        "4062960",
        57,
        "71280.00",
        "2026-11-23 10:29:09",
        5000155,
        1000045,
        null,
        57,
        "BUY",
        "005930",
        "MARKET",
        "2026-11-23 10:29:07",
        "삼성전자",
        "005930",
        "반도체",
        "KOSPI"
       ],
       [
        9000190,
        5000157,
        "32790930",
        461,
        "71130.00",
        "2026-11-23 12:39:25",
        5000157,
        1000049,
        "71200.00",
        461,
        "BUY",
        "005930",
        "LIMIT",
        "2026-11-23 10:46:32",
        "삼성전자",
        "005930",
        "반도체",
        "KOSPI"
       ],
       [
        9000192,
        5000159,
        "3564500",
        50,
        "71290.00",
        "2026-11-23 11:37:47",
        5000159,
        1000049,
        null,
        50,
        "BUY",
        "005930",
        "MARKET",
        "2026-11-23 11:37:44",
        "삼성전자",
        "005930",
        "반도체",
        "KOSPI"
       ]
      ],
      "row_count": 10
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
      "고민서",
      "466173370"
     ],
     [
      "남유진",
      "124173333"
     ],
     [
      "신예은",
      "103005096"
     ],
     [
      "남지후",
      "101626002"
     ]
    ],
    "row_count": 4
   },
   "runs": [
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
        "고민서",
        "466173370"
       ],
       [
        37,
        "남유진",
        "124173333"
       ],
       [
        30,
        "신예은",
        "103005096"
       ],
       [
        29,
        "남지후",
        "101626002"
       ]
      ],
      "row_count": 4
     },
     "pass": true,
     "status": "OK"
    },
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
        "고민서",
        "466173370"
       ],
       [
        37,
        "남유진",
        "124173333"
       ],
       [
        30,
        "신예은",
        "103005096"
       ],
       [
        29,
        "남지후",
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
        "고민서",
        "466173370"
       ],
       [
        37,
        "남유진",
        "124173333"
       ],
       [
        30,
        "신예은",
        "103005096"
       ],
       [
        29,
        "남지후",
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
        "고민서",
        "466173370"
       ],
       [
        37,
        "남유진",
        "124173333"
       ],
       [
        30,
        "신예은",
        "103005096"
       ],
       [
        29,
        "남지후",
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
        "고민서",
        "466173370"
       ],
       [
        37,
        "남유진",
        "124173333"
       ],
       [
        30,
        "신예은",
        "103005096"
       ],
       [
        29,
        "남지후",
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
      "박수빈",
      "149474210"
     ],
     [
      "심지우",
      "138282380"
     ],
     [
      "채지호",
      "125028230"
     ],
     [
      "진건우",
      "74600150"
     ],
     [
      "서도현",
      "70062560"
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
        18,
        "박수빈",
        "149474210"
       ],
       [
        15,
        "심지우",
        "138282380"
       ],
       [
        20,
        "채지호",
        "125028230"
       ],
       [
        31,
        "진건우",
        "74600150"
       ],
       [
        11,
        "서도현",
        "70062560"
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
        18,
        "박수빈",
        "149474210"
       ],
       [
        15,
        "심지우",
        "138282380"
       ],
       [
        20,
        "채지호",
        "125028230"
       ],
       [
        31,
        "진건우",
        "74600150"
       ],
       [
        11,
        "서도현",
        "70062560"
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
        18,
        "박수빈",
        "149474210"
       ],
       [
        15,
        "심지우",
        "138282380"
       ],
       [
        20,
        "채지호",
        "125028230"
       ],
       [
        31,
        "진건우",
        "74600150"
       ],
       [
        11,
        "서도현",
        "70062560"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"CUSTOMER\".\"CUSTOMER_ID\", \"CUSTOMER\".\"CUSTOMER_NAME\", SUM(\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"EXECUTIONS\" JOIN \"FIN_DEMO\".\"ORDERS\" \"ORDERS\" ON \"EXECUTIONS\".\"ORDER_ID\" = \"ORDERS\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"ACCOUNT\" ON \"ORDERS\".\"ACCOUNT_ID\" = \"ACCOUNT\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"CUSTOMER\" ON \"ACCOUNT\".\"CUSTOMER_ID\" = \"CUSTOMER\".\"CUSTOMER_ID\" WHERE YEAR(\"EXECUTIONS\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"EXECUTIONS\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"CUSTOMER\".\"CUSTOMER_ID\", \"CUSTOMER\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        18,
        "박수빈",
        "149474210"
       ],
       [
        15,
        "심지우",
        "138282380"
       ],
       [
        20,
        "채지호",
        "125028230"
       ],
       [
        31,
        "진건우",
        "74600150"
       ],
       [
        11,
        "서도현",
        "70062560"
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
        18,
        "박수빈",
        "149474210"
       ],
       [
        15,
        "심지우",
        "138282380"
       ],
       [
        20,
        "채지호",
        "125028230"
       ],
       [
        31,
        "진건우",
        "74600150"
       ],
       [
        11,
        "서도현",
        "70062560"
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
     "sql": "SELECT \"ACCOUNT_ID\", \"OPEN_DATE\", \"CUSTOMER_ID\", \"CREDIT_LOAN_YN\", \"ACCOUNT_TYPE\" FROM \"FIN_DEMO\".\"ACCOUNT\" WHERE \"CREDIT_LOAN_YN\" = 'Y'",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "OPEN_DATE",
       "CUSTOMER_ID",
       "CREDIT_LOAN_YN",
       "ACCOUNT_TYPE"
      ],
      "rows": [
       [
        1000006,
        "2023-02-11",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-15",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-07",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-10-31",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-10",
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
        "2023-02-11",
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        6,
        "2026-02-15",
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        14,
        "2026-04-07",
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        16,
        "2025-10-31",
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        26,
        "2025-08-10",
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
     "sql": "SELECT \"ACCOUNT_ID\", \"OPEN_DATE\", \"CUSTOMER_ID\", \"CREDIT_LOAN_YN\", \"ACCOUNT_TYPE\" FROM \"FIN_DEMO\".\"ACCOUNT\" WHERE \"CREDIT_LOAN_YN\" = 'Y'",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "OPEN_DATE",
       "CUSTOMER_ID",
       "CREDIT_LOAN_YN",
       "ACCOUNT_TYPE"
      ],
      "rows": [
       [
        1000006,
        "2023-02-11",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-15",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-07",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-10-31",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-10",
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
     "sql": "SELECT \"ACCOUNT_ID\", \"OPEN_DATE\", \"CUSTOMER_ID\", \"CREDIT_LOAN_YN\", \"ACCOUNT_TYPE\" FROM \"FIN_DEMO\".\"ACCOUNT\" WHERE \"CREDIT_LOAN_YN\" = 'Y'",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "OPEN_DATE",
       "CUSTOMER_ID",
       "CREDIT_LOAN_YN",
       "ACCOUNT_TYPE"
      ],
      "rows": [
       [
        1000006,
        "2023-02-11",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-15",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-07",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-10-31",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-10",
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
     "sql": "SELECT \"ACCOUNT_ID\", \"OPEN_DATE\", \"CUSTOMER_ID\", \"CREDIT_LOAN_YN\", \"ACCOUNT_TYPE\" FROM \"FIN_DEMO\".\"ACCOUNT\" WHERE \"CREDIT_LOAN_YN\" = 'Y'",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "OPEN_DATE",
       "CUSTOMER_ID",
       "CREDIT_LOAN_YN",
       "ACCOUNT_TYPE"
      ],
      "rows": [
       [
        1000006,
        "2023-02-11",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-15",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-07",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-10-31",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-10",
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
      "박수빈",
      "149474210"
     ],
     [
      "심지우",
      "138282380"
     ],
     [
      "채지호",
      "125028230"
     ],
     [
      "진건우",
      "74600150"
     ],
     [
      "서도현",
      "70062560"
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
        18,
        "박수빈",
        "149474210"
       ],
       [
        15,
        "심지우",
        "138282380"
       ],
       [
        20,
        "채지호",
        "125028230"
       ],
       [
        31,
        "진건우",
        "74600150"
       ],
       [
        11,
        "서도현",
        "70062560"
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
        18,
        "박수빈",
        "149474210"
       ],
       [
        15,
        "심지우",
        "138282380"
       ],
       [
        20,
        "채지호",
        "125028230"
       ],
       [
        31,
        "진건우",
        "74600150"
       ],
       [
        11,
        "서도현",
        "70062560"
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
        18,
        "박수빈",
        "149474210"
       ],
       [
        15,
        "심지우",
        "138282380"
       ],
       [
        20,
        "채지호",
        "125028230"
       ],
       [
        31,
        "진건우",
        "74600150"
       ],
       [
        11,
        "서도현",
        "70062560"
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
        18,
        "박수빈",
        "149474210"
       ],
       [
        15,
        "심지우",
        "138282380"
       ],
       [
        20,
        "채지호",
        "125028230"
       ],
       [
        31,
        "진건우",
        "74600150"
       ],
       [
        11,
        "서도현",
        "70062560"
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
        18,
        "박수빈",
        "149474210"
       ],
       [
        15,
        "심지우",
        "138282380"
       ],
       [
        20,
        "채지호",
        "125028230"
       ],
       [
        31,
        "진건우",
        "74600150"
       ],
       [
        11,
        "서도현",
        "70062560"
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
      "에코프로",
      "151102670",
      1
     ],
     [
      "2차전지",
      "에코프로비엠",
      "97297210",
      2
     ],
     [
      "2차전지",
      "삼성SDI",
      "60173990",
      3
     ],
     [
      "IT서비스",
      "NAVER",
      "205479720",
      1
     ],
     [
      "IT서비스",
      "카카오",
      "80895060",
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
        "에코프로",
        "151102670",
        1
       ],
       [
        "2차전지",
        "에코프로비엠",
        "97297210",
        2
       ],
       [
        "2차전지",
        "삼성SDI",
        "60173990",
        3
       ],
       [
        "IT서비스",
        "NAVER",
        "205479720",
        1
       ],
       [
        "IT서비스",
        "카카오",
        "80895060",
        2
       ]
      ],
      "row_count": 32
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"p\".\"SECTOR\", \"p\".\"PRODUCT_CODE\", \"p\".\"PRODUCT_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\", RANK() OVER (PARTITION BY \"p\".\"SECTOR\" ORDER BY SUM(\"e\".\"EXEC_AMOUNT\") DESC) AS \"RANK_IN_SECTOR\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" GROUP BY \"p\".\"SECTOR\", \"p\".\"PRODUCT_CODE\", \"p\".\"PRODUCT_NAME\" ORDER BY \"p\".\"SECTOR\", \"RANK_IN_SECTOR\"",
     "result": {
      "columns": [
       "SECTOR",
       "PRODUCT_CODE",
       "PRODUCT_NAME",
       "TOTAL_AMOUNT",
       "RANK_IN_SECTOR"
      ],
      "rows": [
       [
        "2차전지",
        "086520",
        "에코프로",
        "151102670",
        1
       ],
       [
        "2차전지",
        "247540",
        "에코프로비엠",
        "97297210",
        2
       ],
       [
        "2차전지",
        "006400",
        "삼성SDI",
        "60173990",
        3
       ],
       [
        "IT서비스",
        "035420",
        "NAVER",
        "205479720",
        1
       ],
       [
        "IT서비스",
        "035720",
        "카카오",
        "80895060",
        2
       ]
      ],
      "row_count": 32
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"p\".\"PRODUCT_CODE\", \"p\".\"PRODUCT_NAME\", \"p\".\"SECTOR\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\", RANK() OVER (PARTITION BY \"p\".\"SECTOR\" ORDER BY SUM(\"e\".\"EXEC_AMOUNT\") DESC) AS \"RANK_IN_SECTOR\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" GROUP BY \"p\".\"SECTOR\", \"p\".\"PRODUCT_CODE\", \"p\".\"PRODUCT_NAME\" ORDER BY \"p\".\"SECTOR\", \"RANK_IN_SECTOR\"",
     "result": {
      "columns": [
       "PRODUCT_CODE",
       "PRODUCT_NAME",
       "SECTOR",
       "TOTAL_AMOUNT",
       "RANK_IN_SECTOR"
      ],
      "rows": [
       [
        "086520",
        "에코프로",
        "2차전지",
        "151102670",
        1
       ],
       [
        "247540",
        "에코프로비엠",
        "2차전지",
        "97297210",
        2
       ],
       [
        "006400",
        "삼성SDI",
        "2차전지",
        "60173990",
        3
       ],
       [
        "035420",
        "NAVER",
        "IT서비스",
        "205479720",
        1
       ],
       [
        "035720",
        "카카오",
        "IT서비스",
        "80895060",
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
        "에코프로",
        "151102670",
        1
       ],
       [
        "2차전지",
        "에코프로비엠",
        "97297210",
        2
       ],
       [
        "2차전지",
        "삼성SDI",
        "60173990",
        3
       ],
       [
        "IT서비스",
        "NAVER",
        "205479720",
        1
       ],
       [
        "IT서비스",
        "카카오",
        "80895060",
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
        "에코프로",
        "151102670",
        1
       ],
       [
        "2차전지",
        "에코프로비엠",
        "97297210",
        2
       ],
       [
        "2차전지",
        "삼성SDI",
        "60173990",
        3
       ],
       [
        "IT서비스",
        "NAVER",
        "205479720",
        1
       ],
       [
        "IT서비스",
        "카카오",
        "80895060",
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
      5000069
     ],
     [
      5000082
     ],
     [
      5000005
     ],
     [
      5000105
     ],
     [
      5000059
     ]
    ],
    "row_count": 10
   },
   "runs": [
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ORDER_TS\", \"o\".\"ORDER_TYPE\", \"o\".\"ORDER_PRICE\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" WHERE \"o\".\"ORDER_TYPE\" = 'LIMIT' AND \"o\".\"ORDER_PRICE\" IS NOT NULL AND NOT EXISTS ( SELECT 1 FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" WHERE \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" ) AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS\")) > 30",
     "result": {
      "columns": [
       "ORDER_ID",
       "ORDER_TS",
       "ORDER_TYPE",
       "ORDER_PRICE"
      ],
      "rows": [
       [
        5000069,
        "2026-03-30 12:10:40",
        "LIMIT",
        "73380.00"
       ],
       [
        5000082,
        "2026-04-23 11:57:10",
        "LIMIT",
        "185860.00"
       ],
       [
        5000005,
        "2025-11-03 11:05:26",
        "LIMIT",
        "66650.00"
       ],
       [
        5000105,
        "2026-07-03 15:11:48",
        "LIMIT",
        "48260.00"
       ],
       [
        5000059,
        "2026-03-19 10:42:58",
        "LIMIT",
        "176230.00"
       ]
      ],
      "row_count": 10
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ACCOUNT_ID\", \"o\".\"ORDER_TS\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" LEFT JOIN \"FIN_DEMO\".\"EXECUTIONS\" \"e\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" WHERE \"e\".\"ORDER_ID\" IS NULL AND \"o\".\"ORDER_TYPE\" = 'LIMIT' AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS\")) > 30",
     "result": {
      "columns": [
       "ORDER_ID",
       "ACCOUNT_ID",
       "ORDER_TS"
      ],
      "rows": [
       [
        5000069,
        1000022,
        "2026-03-30 12:10:40"
       ],
       [
        5000082,
        1000031,
        "2026-04-23 11:57:10"
       ],
       [
        5000005,
        1000055,
        "2025-11-03 11:05:26"
       ],
       [
        5000105,
        1000044,
        "2026-07-03 15:11:48"
       ],
       [
        5000059,
        1000032,
        "2026-03-19 10:42:58"
       ]
      ],
      "row_count": 10
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ORDER_TS\", \"o\".\"ORDER_TYPE\", \"o\".\"ORDER_PRICE\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" LEFT JOIN \"FIN_DEMO\".\"EXECUTIONS\" \"e\" ON \"o\".\"ORDER_ID\" = \"e\".\"ORDER_ID\" WHERE \"e\".\"ORDER_ID\" IS NULL AND \"o\".\"ORDER_TYPE\" = 'LIMIT' AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS\")) > 30",
     "result": {
      "columns": [
       "ORDER_ID",
       "ORDER_TS",
       "ORDER_TYPE",
       "ORDER_PRICE"
      ],
      "rows": [
       [
        5000069,
        "2026-03-30 12:10:40",
        "LIMIT",
        "73380.00"
       ],
       [
        5000082,
        "2026-04-23 11:57:10",
        "LIMIT",
        "185860.00"
       ],
       [
        5000005,
        "2025-11-03 11:05:26",
        "LIMIT",
        "66650.00"
       ],
       [
        5000105,
        "2026-07-03 15:11:48",
        "LIMIT",
        "48260.00"
       ],
       [
        5000059,
        "2026-03-19 10:42:58",
        "LIMIT",
        "176230.00"
       ]
      ],
      "row_count": 10
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ACCOUNT_ID\", \"o\".\"ORDER_TS\", \"o\".\"ORDER_TYPE\", \"o\".\"ORDER_PRICE\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" WHERE \"o\".\"ORDER_TYPE\" = 'LIMIT' AND \"o\".\"ORDER_PRICE\" IS NOT NULL AND NOT EXISTS ( SELECT 1 FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" WHERE \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" ) AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS\")) > 30",
     "result": {
      "columns": [
       "ORDER_ID",
       "ACCOUNT_ID",
       "ORDER_TS",
       "ORDER_TYPE",
       "ORDER_PRICE"
      ],
      "rows": [
       [
        5000069,
        1000022,
        "2026-03-30 12:10:40",
        "LIMIT",
        "73380.00"
       ],
       [
        5000082,
        1000031,
        "2026-04-23 11:57:10",
        "LIMIT",
        "185860.00"
       ],
       [
        5000005,
        1000055,
        "2025-11-03 11:05:26",
        "LIMIT",
        "66650.00"
       ],
       [
        5000105,
        1000044,
        "2026-07-03 15:11:48",
        "LIMIT",
        "48260.00"
       ],
       [
        5000059,
        1000032,
        "2026-03-19 10:42:58",
        "LIMIT",
        "176230.00"
       ]
      ],
      "row_count": 10
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ORDER_TS\", \"o\".\"ORDER_TYPE\", \"o\".\"ORDER_PRICE\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" WHERE \"o\".\"ORDER_TYPE\" = 'LIMIT' AND \"o\".\"ORDER_PRICE\" IS NOT NULL AND \"o\".\"ORDER_ID\" NOT IN (SELECT \"e\".\"ORDER_ID\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\") AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS\")) > 30",
     "result": {
      "columns": [
       "ORDER_ID",
       "ORDER_TS",
       "ORDER_TYPE",
       "ORDER_PRICE"
      ],
      "rows": [
       [
        5000069,
        "2026-03-30 12:10:40",
        "LIMIT",
        "73380.00"
       ],
       [
        5000082,
        "2026-04-23 11:57:10",
        "LIMIT",
        "185860.00"
       ],
       [
        5000005,
        "2025-11-03 11:05:26",
        "LIMIT",
        "66650.00"
       ],
       [
        5000105,
        "2026-07-03 15:11:48",
        "LIMIT",
        "48260.00"
       ],
       [
        5000059,
        "2026-03-19 10:42:58",
        "LIMIT",
        "176230.00"
       ]
      ],
      "row_count": 10
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
        "0.859985"
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
        "0.859985"
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
        "0.859985"
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
        "0.859985"
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
        "0.859985"
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
