window.EVAL = {
 "date": "2026-11-22",
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
      13,
      "262971250"
     ]
    ],
    "row_count": 1
   },
   "runs": [
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
     "sql": "SELECT COUNT(\"e\".\"EXEC_ID\") AS \"EXEC_COUNT\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
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
     "sql": "SELECT COUNT(*) AS \"EXECUTION_COUNT\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"TOTAL_TRANSACTION_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
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
     "sql": "SELECT COUNT(*) AS \"EXECUTION_COUNT\", COALESCE(SUM(\"e\".\"EXEC_AMOUNT\"), 0) AS \"TOTAL_TRANSACTION_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\" WHERE \"b\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE",
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
     "sql": "SELECT \"CUSTOMER_NAME\", \"TOTAL_ASSETS\" FROM \"FIN_DEMO\".\"CUSTOMER\" WHERE \"TOTAL_ASSETS\" >= 100000000",
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
     "sql": "SELECT \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_ID\", \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_PRICE\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_QTY\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_PRICE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_QTY\", \"FIN_DEMO\".\"ORDERS\".\"SIDE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_TYPE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_TS\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\", \"FIN_DEMO\".\"PRODUCT\".\"SECTOR\", \"FIN_DEMO\".\"PRODUCT\".\"MARKET\" FROM \"FIN_DEMO\".\"EXECUTIONS\" JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" WHERE \"FIN_DEMO\".\"ORDERS\".\"SIDE\" = 'BUY' AND \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" = '삼성전자' AND DATE(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
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
       "PRODUCT_CODE",
       "SECTOR",
       "MARKET"
      ],
      "rows": [
       [
        9000180,
        5000151,
        "4595200",
        "71800.00",
        64,
        "2026-11-21 09:28:09",
        null,
        64,
        "BUY",
        "MARKET",
        "2026-11-21 09:27:52",
        "삼성전자",
        "005930",
        "반도체",
        "KOSPI"
       ],
       [
        9000183,
        5000154,
        "287320",
        "71830.00",
        4,
        "2026-11-21 10:32:42",
        "71890.00",
        4,
        "BUY",
        "LIMIT",
        "2026-11-21 10:24:59",
        "삼성전자",
        "005930",
        "반도체",
        "KOSPI"
       ],
       [
        9000184,
        5000155,
        "8851080",
        "71960.00",
        123,
        "2026-11-21 10:29:23",
        null,
        123,
        "BUY",
        "MARKET",
        "2026-11-21 10:29:07",
        "삼성전자",
        "005930",
        "반도체",
        "KOSPI"
       ],
       [
        9000187,
        5000157,
        "38266760",
        "71930.00",
        532,
        "2026-11-21 10:55:21",
        "71930.00",
        532,
        "BUY",
        "LIMIT",
        "2026-11-21 10:46:32",
        "삼성전자",
        "005930",
        "반도체",
        "KOSPI"
       ],
       [
        9000189,
        5000159,
        "6318400",
        "71800.00",
        88,
        "2026-11-21 11:37:46",
        null,
        88,
        "BUY",
        "MARKET",
        "2026-11-21 11:37:44",
        "삼성전자",
        "005930",
        "반도체",
        "KOSPI"
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
    },
    {
     "sql": "SELECT \"e\".\"EXEC_ID\", \"e\".\"ORDER_ID\", \"e\".\"EXEC_AMOUNT\", \"e\".\"EXEC_PRICE\", \"e\".\"EXEC_TS\", \"e\".\"EXEC_QTY\", \"e\".\"REALIZED_PNL\", \"e\".\"FEE\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" WHERE \"p\".\"PRODUCT_NAME\" = '삼성전자' AND \"o\".\"SIDE\" = 'BUY' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
     "result": {
      "columns": [
       "EXEC_ID",
       "ORDER_ID",
       "EXEC_AMOUNT",
       "EXEC_PRICE",
       "EXEC_TS",
       "EXEC_QTY",
       "REALIZED_PNL",
       "FEE"
      ],
      "rows": [
       [
        9000180,
        5000151,
        "4595200",
        "71800.00",
        "2026-11-21 09:28:09",
        64,
        "0",
        "689.28"
       ],
       [
        9000183,
        5000154,
        "287320",
        "71830.00",
        "2026-11-21 10:32:42",
        4,
        "0",
        "43.10"
       ],
       [
        9000184,
        5000155,
        "8851080",
        "71960.00",
        "2026-11-21 10:29:23",
        123,
        "0",
        "1327.66"
       ],
       [
        9000187,
        5000157,
        "38266760",
        "71930.00",
        "2026-11-21 10:55:21",
        532,
        "0",
        "5740.01"
       ],
       [
        9000189,
        5000159,
        "6318400",
        "71800.00",
        "2026-11-21 11:37:46",
        88,
        "0",
        "947.76"
       ]
      ],
      "row_count": 11
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"e\".\"EXEC_ID\", \"e\".\"ORDER_ID\", \"e\".\"EXEC_AMOUNT\", \"e\".\"EXEC_PRICE\", \"e\".\"EXEC_QTY\", \"e\".\"EXEC_TS\", \"o\".\"ORDER_ID\", \"o\".\"ACCOUNT_ID\", \"o\".\"ORDER_PRICE\", \"o\".\"ORDER_QTY\", \"o\".\"SIDE\", \"o\".\"PRODUCT_CODE\", \"o\".\"ORDER_TYPE\", \"o\".\"ORDER_TS\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" WHERE \"o\".\"SIDE\" = 'BUY' AND \"p\".\"PRODUCT_NAME\" = '삼성전자' AND DATE(\"e\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
     "result": {
      "columns": [
       "EXEC_ID",
       "ORDER_ID",
       "EXEC_AMOUNT",
       "EXEC_PRICE",
       "EXEC_QTY",
       "EXEC_TS",
       "ORDER_ID",
       "ACCOUNT_ID",
       "ORDER_PRICE",
       "ORDER_QTY",
       "SIDE",
       "PRODUCT_CODE",
       "ORDER_TYPE",
       "ORDER_TS"
      ],
      "rows": [
       [
        9000180,
        5000151,
        "4595200",
        "71800.00",
        64,
        "2026-11-21 09:28:09",
        5000151,
        1000017,
        null,
        64,
        "BUY",
        "005930",
        "MARKET",
        "2026-11-21 09:27:52"
       ],
       [
        9000183,
        5000154,
        "287320",
        "71830.00",
        4,
        "2026-11-21 10:32:42",
        5000154,
        1000013,
        "71890.00",
        4,
        "BUY",
        "005930",
        "LIMIT",
        "2026-11-21 10:24:59"
       ],
       [
        9000184,
        5000155,
        "8851080",
        "71960.00",
        123,
        "2026-11-21 10:29:23",
        5000155,
        1000045,
        null,
        123,
        "BUY",
        "005930",
        "MARKET",
        "2026-11-21 10:29:07"
       ],
       [
        9000187,
        5000157,
        "38266760",
        "71930.00",
        532,
        "2026-11-21 10:55:21",
        5000157,
        1000049,
        "71930.00",
        532,
        "BUY",
        "005930",
        "LIMIT",
        "2026-11-21 10:46:32"
       ],
       [
        9000189,
        5000159,
        "6318400",
        "71800.00",
        88,
        "2026-11-21 11:37:46",
        5000159,
        1000049,
        null,
        88,
        "BUY",
        "005930",
        "MARKET",
        "2026-11-21 11:37:44"
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
        "2023-02-09",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-13",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-05",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-10-29",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-08",
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
        "2023-02-09",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-13",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-05",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-10-29",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-08",
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
        "2023-02-09",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-13",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-05",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-10-29",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-08",
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
        "2023-02-09",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-13",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-05",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-10-29",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-08",
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
     "sql": "SELECT \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\", RANK() OVER (PARTITION BY \"p\".\"SECTOR\" ORDER BY SUM(\"e\".\"EXEC_AMOUNT\") DESC) AS \"RANK_WITHIN_SECTOR\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" GROUP BY \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\" ORDER BY \"p\".\"SECTOR\", \"RANK_WITHIN_SECTOR\"",
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
     "sql": "SELECT \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\", RANK() OVER (PARTITION BY \"p\".\"SECTOR\" ORDER BY SUM(\"e\".\"EXEC_AMOUNT\") DESC) AS \"RANK_WITHIN_SECTOR\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" GROUP BY \"p\".\"SECTOR\", \"p\".\"PRODUCT_NAME\" ORDER BY \"p\".\"SECTOR\", \"RANK_WITHIN_SECTOR\"",
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
    },
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ACCOUNT_ID\", \"o\".\"ORDER_TS\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" WHERE \"o\".\"ORDER_TYPE\" = 'LIMIT' AND NOT EXISTS ( SELECT 1 FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" WHERE \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" ) AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS\")) > 30",
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
        5000049,
        "2026-03-06 14:05:54",
        "LIMIT",
        "231360.00"
       ],
       [
        5000178,
        "2026-11-22 09:26:05",
        "LIMIT",
        "32950.00"
       ],
       [
        5000183,
        "2026-11-22 10:26:20",
        "LIMIT",
        "255940.00"
       ],
       [
        5000195,
        "2026-11-22 12:50:03",
        "LIMIT",
        "283880.00"
       ],
       [
        5000044,
        "2026-02-23 11:04:25",
        "LIMIT",
        "212250.00"
       ]
      ],
      "row_count": 16
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
