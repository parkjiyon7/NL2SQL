window.EVAL = {
 "date": "2026-11-23",
 "n": 5,
 "ok": 50,
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
      14,
      "120744180"
     ]
    ],
    "row_count": 1
   },
   "runs": [
    {
     "sql": "SELECT COUNT(*) AS \"EXEC_COUNT\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        14,
        "120744180"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT COUNT(*) AS \"EXEC_COUNT\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        14,
        "120744180"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT COUNT(*) AS \"EXEC_COUNT\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        14,
        "120744180"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT COUNT(*) AS \"EXEC_COUNT\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        14,
        "120744180"
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
        14,
        "120744180"
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
      9000188,
      36,
      "71600.00"
     ],
     [
      9000190,
      6,
      "71720.00"
     ],
     [
      9000191,
      74,
      "71460.00"
     ],
     [
      9000194,
      213,
      "71520.00"
     ],
     [
      9000196,
      738,
      "71380.00"
     ]
    ],
    "row_count": 13
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
        9000188,
        5000151,
        "2577600",
        "71600.00",
        36,
        "2026-11-22 09:28:02",
        "0",
        "386.64"
       ],
       [
        9000190,
        5000154,
        "430320",
        "71720.00",
        6,
        "2026-11-22 10:29:27",
        "0",
        "64.55"
       ],
       [
        9000191,
        5000155,
        "5288040",
        "71460.00",
        74,
        "2026-11-22 10:29:21",
        "0",
        "793.21"
       ],
       [
        9000194,
        5000157,
        "15233760",
        "71520.00",
        213,
        "2026-11-22 10:53:25",
        "0",
        "2285.06"
       ],
       [
        9000196,
        5000159,
        "52678440",
        "71380.00",
        738,
        "2026-11-22 11:37:47",
        "0",
        "7901.77"
       ]
      ],
      "row_count": 13
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_ID\", \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_PRICE\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_QTY\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_PRICE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_QTY\", \"FIN_DEMO\".\"ORDERS\".\"SIDE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_TYPE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_TS\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" FROM \"FIN_DEMO\".\"EXECUTIONS\" JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" WHERE \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" = '삼성전자' AND \"FIN_DEMO\".\"ORDERS\".\"SIDE\" = 'BUY' AND DATE(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
     "result": {
      "columns": [
       "EXEC_ID",
       "ORDER_ID",
       "EXEC_AMOUNT",
       "EXEC_PRICE",
       "EXEC_QTY",
       "EXEC_TS",
       "ORDER_PRICE",
       "ORDER_QTY",
       "SIDE",
       "ORDER_TYPE",
       "ORDER_TS",
       "PRODUCT_NAME",
       "PRODUCT_CODE"
      ],
      "rows": [
       [
        9000188,
        5000151,
        "2577600",
        "71600.00",
        36,
        "2026-11-22 09:28:02",
        null,
        36,
        "BUY",
        "MARKET",
        "2026-11-22 09:27:52",
        "삼성전자",
        "005930"
       ],
       [
        9000190,
        5000154,
        "430320",
        "71720.00",
        6,
        "2026-11-22 10:29:27",
        "71730.00",
        6,
        "BUY",
        "LIMIT",
        "2026-11-22 10:24:59",
        "삼성전자",
        "005930"
       ],
       [
        9000191,
        5000155,
        "5288040",
        "71460.00",
        74,
        "2026-11-22 10:29:21",
        null,
        74,
        "BUY",
        "MARKET",
        "2026-11-22 10:29:07",
        "삼성전자",
        "005930"
       ],
       [
        9000194,
        5000157,
        "15233760",
        "71520.00",
        213,
        "2026-11-22 10:53:25",
        "71530.00",
        213,
        "BUY",
        "LIMIT",
        "2026-11-22 10:46:32",
        "삼성전자",
        "005930"
       ],
       [
        9000196,
        5000159,
        "52678440",
        "71380.00",
        738,
        "2026-11-22 11:37:47",
        null,
        738,
        "BUY",
        "MARKET",
        "2026-11-22 11:37:44",
        "삼성전자",
        "005930"
       ]
      ],
      "row_count": 13
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
        9000188,
        5000151,
        "2577600",
        "71600.00",
        36,
        "2026-11-22 09:28:02",
        "0",
        "386.64"
       ],
       [
        9000190,
        5000154,
        "430320",
        "71720.00",
        6,
        "2026-11-22 10:29:27",
        "0",
        "64.55"
       ],
       [
        9000191,
        5000155,
        "5288040",
        "71460.00",
        74,
        "2026-11-22 10:29:21",
        "0",
        "793.21"
       ],
       [
        9000194,
        5000157,
        "15233760",
        "71520.00",
        213,
        "2026-11-22 10:53:25",
        "0",
        "2285.06"
       ],
       [
        9000196,
        5000159,
        "52678440",
        "71380.00",
        738,
        "2026-11-22 11:37:47",
        "0",
        "7901.77"
       ]
      ],
      "row_count": 13
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_ID\", \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_PRICE\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_QTY\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_PRICE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_QTY\", \"FIN_DEMO\".\"ORDERS\".\"SIDE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_TYPE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_TS\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" FROM \"FIN_DEMO\".\"EXECUTIONS\" JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" WHERE \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" = '삼성전자' AND \"FIN_DEMO\".\"ORDERS\".\"SIDE\" = 'BUY' AND DATE(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
     "result": {
      "columns": [
       "EXEC_ID",
       "ORDER_ID",
       "EXEC_AMOUNT",
       "EXEC_PRICE",
       "EXEC_QTY",
       "EXEC_TS",
       "ORDER_PRICE",
       "ORDER_QTY",
       "SIDE",
       "ORDER_TYPE",
       "ORDER_TS",
       "PRODUCT_NAME"
      ],
      "rows": [
       [
        9000188,
        5000151,
        "2577600",
        "71600.00",
        36,
        "2026-11-22 09:28:02",
        null,
        36,
        "BUY",
        "MARKET",
        "2026-11-22 09:27:52",
        "삼성전자"
       ],
       [
        9000190,
        5000154,
        "430320",
        "71720.00",
        6,
        "2026-11-22 10:29:27",
        "71730.00",
        6,
        "BUY",
        "LIMIT",
        "2026-11-22 10:24:59",
        "삼성전자"
       ],
       [
        9000191,
        5000155,
        "5288040",
        "71460.00",
        74,
        "2026-11-22 10:29:21",
        null,
        74,
        "BUY",
        "MARKET",
        "2026-11-22 10:29:07",
        "삼성전자"
       ],
       [
        9000194,
        5000157,
        "15233760",
        "71520.00",
        213,
        "2026-11-22 10:53:25",
        "71530.00",
        213,
        "BUY",
        "LIMIT",
        "2026-11-22 10:46:32",
        "삼성전자"
       ],
       [
        9000196,
        5000159,
        "52678440",
        "71380.00",
        738,
        "2026-11-22 11:37:47",
        null,
        738,
        "BUY",
        "MARKET",
        "2026-11-22 11:37:44",
        "삼성전자"
       ]
      ],
      "row_count": 13
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
        9000188,
        "2026-11-22 09:28:02",
        36,
        "71600.00",
        "2577600"
       ],
       [
        9000191,
        "2026-11-22 10:29:21",
        74,
        "71460.00",
        "5288040"
       ],
       [
        9000190,
        "2026-11-22 10:29:27",
        6,
        "71720.00",
        "430320"
       ],
       [
        9000194,
        "2026-11-22 10:53:25",
        213,
        "71520.00",
        "15233760"
       ],
       [
        9000196,
        "2026-11-22 11:37:47",
        738,
        "71380.00",
        "52678440"
       ]
      ],
      "row_count": 13
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
      "진건우",
      "165364500"
     ],
     [
      "지지후",
      "103706940"
     ],
     [
      "심서준",
      "90555280"
     ],
     [
      "박수빈",
      "81340750"
     ],
     [
      "심지우",
      "56289560"
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
        "진건우",
        "165364500"
       ],
       [
        23,
        "지지후",
        "103706940"
       ],
       [
        35,
        "심서준",
        "90555280"
       ],
       [
        18,
        "박수빈",
        "81340750"
       ],
       [
        15,
        "심지우",
        "56289560"
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
        "진건우",
        "165364500"
       ],
       [
        23,
        "지지후",
        "103706940"
       ],
       [
        35,
        "심서준",
        "90555280"
       ],
       [
        18,
        "박수빈",
        "81340750"
       ],
       [
        15,
        "심지우",
        "56289560"
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
        "진건우",
        "165364500"
       ],
       [
        23,
        "지지후",
        "103706940"
       ],
       [
        35,
        "심서준",
        "90555280"
       ],
       [
        18,
        "박수빈",
        "81340750"
       ],
       [
        15,
        "심지우",
        "56289560"
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
        "진건우",
        "165364500"
       ],
       [
        23,
        "지지후",
        "103706940"
       ],
       [
        35,
        "심서준",
        "90555280"
       ],
       [
        18,
        "박수빈",
        "81340750"
       ],
       [
        15,
        "심지우",
        "56289560"
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
        "진건우",
        "165364500"
       ],
       [
        23,
        "지지후",
        "103706940"
       ],
       [
        35,
        "심서준",
        "90555280"
       ],
       [
        18,
        "박수빈",
        "81340750"
       ],
       [
        15,
        "심지우",
        "56289560"
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
        "2023-02-10",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-14",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-06",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-10-30",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-09",
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
        "2023-02-10",
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        6,
        "2026-02-14",
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        14,
        "2026-04-06",
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        16,
        "2025-10-30",
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        26,
        "2025-08-09",
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
        "2023-02-10",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-14",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-06",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-10-30",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-09",
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
        "2023-02-10",
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        6,
        "2026-02-14",
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        14,
        "2026-04-06",
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        16,
        "2025-10-30",
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        26,
        "2025-08-09",
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
        "2023-02-10",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-14",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-06",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-10-30",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-09",
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
      "진건우",
      "165364500"
     ],
     [
      "지지후",
      "103706940"
     ],
     [
      "심서준",
      "90555280"
     ],
     [
      "박수빈",
      "81340750"
     ],
     [
      "심지우",
      "56289560"
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
        "진건우",
        "165364500"
       ],
       [
        23,
        "지지후",
        "103706940"
       ],
       [
        35,
        "심서준",
        "90555280"
       ],
       [
        18,
        "박수빈",
        "81340750"
       ],
       [
        15,
        "심지우",
        "56289560"
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
        "진건우",
        "165364500"
       ],
       [
        23,
        "지지후",
        "103706940"
       ],
       [
        35,
        "심서준",
        "90555280"
       ],
       [
        18,
        "박수빈",
        "81340750"
       ],
       [
        15,
        "심지우",
        "56289560"
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
        "진건우",
        "165364500"
       ],
       [
        23,
        "지지후",
        "103706940"
       ],
       [
        35,
        "심서준",
        "90555280"
       ],
       [
        18,
        "박수빈",
        "81340750"
       ],
       [
        15,
        "심지우",
        "56289560"
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
        "진건우",
        "165364500"
       ],
       [
        23,
        "지지후",
        "103706940"
       ],
       [
        35,
        "심서준",
        "90555280"
       ],
       [
        18,
        "박수빈",
        "81340750"
       ],
       [
        15,
        "심지우",
        "56289560"
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
        "진건우",
        "165364500"
       ],
       [
        23,
        "지지후",
        "103706940"
       ],
       [
        35,
        "심서준",
        "90555280"
       ],
       [
        18,
        "박수빈",
        "81340750"
       ],
       [
        15,
        "심지우",
        "56289560"
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
      "133143390",
      1
     ],
     [
      "2차전지",
      "에코프로",
      "109834310",
      2
     ],
     [
      "2차전지",
      "삼성SDI",
      "86917010",
      3
     ],
     [
      "IT서비스",
      "NAVER",
      "228186800",
      1
     ],
     [
      "IT서비스",
      "카카오",
      "111170730",
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
        "133143390",
        1
       ],
       [
        "2차전지",
        "에코프로",
        "109834310",
        2
       ],
       [
        "2차전지",
        "삼성SDI",
        "86917010",
        3
       ],
       [
        "IT서비스",
        "NAVER",
        "228186800",
        1
       ],
       [
        "IT서비스",
        "카카오",
        "111170730",
        2
       ]
      ],
      "row_count": 32
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\", RANK() OVER (PARTITION BY \"p\".\"SECTOR\" ORDER BY SUM(\"e\".\"EXEC_AMOUNT\") DESC) AS \"RANK_WITHIN_SECTOR\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" GROUP BY \"p\".\"SECTOR\", \"p\".\"PRODUCT_CODE\", \"p\".\"PRODUCT_NAME\" ORDER BY \"p\".\"SECTOR\", \"RANK_WITHIN_SECTOR\"",
     "result": {
      "columns": [
       "SECTOR",
       "PRODUCT_NAME",
       "TOTAL_TRANSACTION_AMOUNT",
       "RANK_WITHIN_SECTOR"
      ],
      "rows": [
       [
        "2차전지",
        "에코프로비엠",
        "133143390",
        1
       ],
       [
        "2차전지",
        "에코프로",
        "109834310",
        2
       ],
       [
        "2차전지",
        "삼성SDI",
        "86917010",
        3
       ],
       [
        "IT서비스",
        "NAVER",
        "228186800",
        1
       ],
       [
        "IT서비스",
        "카카오",
        "111170730",
        2
       ]
      ],
      "row_count": 32
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\", RANK() OVER (PARTITION BY \"p\".\"SECTOR\" ORDER BY SUM(\"e\".\"EXEC_AMOUNT\") DESC) AS \"RANK_WITHIN_INDUSTRY\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" GROUP BY \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\" ORDER BY \"p\".\"SECTOR\", \"RANK_WITHIN_INDUSTRY\"",
     "result": {
      "columns": [
       "SECTOR",
       "PRODUCT_NAME",
       "TOTAL_TRANSACTION_AMOUNT",
       "RANK_WITHIN_INDUSTRY"
      ],
      "rows": [
       [
        "2차전지",
        "에코프로비엠",
        "133143390",
        1
       ],
       [
        "2차전지",
        "에코프로",
        "109834310",
        2
       ],
       [
        "2차전지",
        "삼성SDI",
        "86917010",
        3
       ],
       [
        "IT서비스",
        "NAVER",
        "228186800",
        1
       ],
       [
        "IT서비스",
        "카카오",
        "111170730",
        2
       ]
      ],
      "row_count": 32
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT p.\"SECTOR\", p.\"PRODUCT_NAME\", SUM(e.\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\", RANK() OVER (PARTITION BY p.\"SECTOR\" ORDER BY SUM(e.\"EXEC_AMOUNT\") DESC) AS \"RANK_WITHIN_SECTOR\" FROM \"FIN_DEMO\".\"EXECUTIONS\" e JOIN \"FIN_DEMO\".\"ORDERS\" o ON e.\"ORDER_ID\" = o.\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" p ON o.\"PRODUCT_CODE\" = p.\"PRODUCT_CODE\" GROUP BY p.\"SECTOR\", p.\"PRODUCT_NAME\" ORDER BY p.\"SECTOR\", \"RANK_WITHIN_SECTOR\"",
     "result": {
      "columns": [
       "SECTOR",
       "PRODUCT_NAME",
       "TOTAL_TRANSACTION_AMOUNT",
       "RANK_WITHIN_SECTOR"
      ],
      "rows": [
       [
        "2차전지",
        "에코프로비엠",
        "133143390",
        1
       ],
       [
        "2차전지",
        "에코프로",
        "109834310",
        2
       ],
       [
        "2차전지",
        "삼성SDI",
        "86917010",
        3
       ],
       [
        "IT서비스",
        "NAVER",
        "228186800",
        1
       ],
       [
        "IT서비스",
        "카카오",
        "111170730",
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
        "133143390",
        1
       ],
       [
        "2차전지",
        "에코프로",
        "109834310",
        2
       ],
       [
        "2차전지",
        "삼성SDI",
        "86917010",
        3
       ],
       [
        "IT서비스",
        "NAVER",
        "228186800",
        1
       ],
       [
        "IT서비스",
        "카카오",
        "111170730",
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
      5000168
     ],
     [
      5000005
     ],
     [
      5000153
     ],
     [
      5000093
     ],
     [
      5000059
     ]
    ],
    "row_count": 9
   },
   "runs": [
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
        5000168,
        "2026-11-22 14:21:12",
        "LIMIT",
        "243070.00"
       ],
       [
        5000005,
        "2025-10-31 11:05:26",
        "LIMIT",
        "67210.00"
       ],
       [
        5000153,
        "2026-11-22 10:22:04",
        "LIMIT",
        "80480.00"
       ],
       [
        5000093,
        "2026-05-25 13:24:43",
        "LIMIT",
        "9790.00"
       ],
       [
        5000059,
        "2026-03-18 11:14:29",
        "LIMIT",
        "72300.00"
       ]
      ],
      "row_count": 9
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
        5000168,
        "2026-11-22 14:21:12",
        "LIMIT",
        "243070.00"
       ],
       [
        5000005,
        "2025-10-31 11:05:26",
        "LIMIT",
        "67210.00"
       ],
       [
        5000153,
        "2026-11-22 10:22:04",
        "LIMIT",
        "80480.00"
       ],
       [
        5000093,
        "2026-05-25 13:24:43",
        "LIMIT",
        "9790.00"
       ],
       [
        5000059,
        "2026-03-18 11:14:29",
        "LIMIT",
        "72300.00"
       ]
      ],
      "row_count": 9
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ACCOUNT_ID\", \"o\".\"ORDER_TS\", \"o\".\"ORDER_TYPE\", \"o\".\"ORDER_PRICE\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" LEFT JOIN \"FIN_DEMO\".\"EXECUTIONS\" \"e\" ON \"o\".\"ORDER_ID\" = \"e\".\"ORDER_ID\" WHERE \"e\".\"ORDER_ID\" IS NULL AND \"o\".\"ORDER_TYPE\" = 'LIMIT' AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS\")) > 30",
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
        5000168,
        1000051,
        "2026-11-22 14:21:12",
        "LIMIT",
        "243070.00"
       ],
       [
        5000005,
        1000055,
        "2025-10-31 11:05:26",
        "LIMIT",
        "67210.00"
       ],
       [
        5000153,
        1000029,
        "2026-11-22 10:22:04",
        "LIMIT",
        "80480.00"
       ],
       [
        5000093,
        1000033,
        "2026-05-25 13:24:43",
        "LIMIT",
        "9790.00"
       ],
       [
        5000059,
        1000042,
        "2026-03-18 11:14:29",
        "LIMIT",
        "72300.00"
       ]
      ],
      "row_count": 9
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ORDER_TS\", \"o\".\"ORDER_TYPE\", \"o\".\"ORDER_PRICE\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" WHERE \"o\".\"ORDER_TYPE\" = 'LIMIT' AND NOT EXISTS ( SELECT 1 FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" WHERE \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" ) AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS\")) > 30",
     "result": {
      "columns": [
       "ORDER_ID",
       "ORDER_TS",
       "ORDER_TYPE",
       "ORDER_PRICE"
      ],
      "rows": [
       [
        5000168,
        "2026-11-22 14:21:12",
        "LIMIT",
        "243070.00"
       ],
       [
        5000005,
        "2025-10-31 11:05:26",
        "LIMIT",
        "67210.00"
       ],
       [
        5000153,
        "2026-11-22 10:22:04",
        "LIMIT",
        "80480.00"
       ],
       [
        5000093,
        "2026-05-25 13:24:43",
        "LIMIT",
        "9790.00"
       ],
       [
        5000059,
        "2026-03-18 11:14:29",
        "LIMIT",
        "72300.00"
       ]
      ],
      "row_count": 9
     },
     "pass": true,
     "status": "OK"
    },
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
        5000168,
        "2026-11-22 14:21:12",
        "LIMIT",
        "243070.00"
       ],
       [
        5000005,
        "2025-10-31 11:05:26",
        "LIMIT",
        "67210.00"
       ],
       [
        5000153,
        "2026-11-22 10:22:04",
        "LIMIT",
        "80480.00"
       ],
       [
        5000093,
        "2026-05-25 13:24:43",
        "LIMIT",
        "9790.00"
       ],
       [
        5000059,
        "2026-03-18 11:14:29",
        "LIMIT",
        "72300.00"
       ]
      ],
      "row_count": 9
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
        "0.860032"
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
        "0.860032"
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
        "0.860032"
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
        "0.860032"
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
        "0.860032"
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
