window.EVAL = {
 "date": "2026-11-25",
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
      "123581070"
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
        11,
        "123581070"
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
        "123581070"
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
        "123581070"
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
        "123581070"
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
        "123581070"
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
     "sql": "SELECT \"CUSTOMER_NAME\" AS \"Customer Name\", \"TOTAL_ASSETS\" AS \"Total Assets\" FROM \"FIN_DEMO\".\"CUSTOMER\" WHERE \"TOTAL_ASSETS\" >= 100000000",
     "result": {
      "columns": [
       "Customer Name",
       "Total Assets"
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
      9000171,
      17,
      "70910.00"
     ],
     [
      9000174,
      18,
      "71310.00"
     ],
     [
      9000175,
      21,
      "71090.00"
     ],
     [
      9000178,
      50,
      "71070.00"
     ],
     [
      9000179,
      724,
      "71120.00"
     ]
    ],
    "row_count": 10
   },
   "runs": [
    {
     "sql": "SELECT \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_ID\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_QTY\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_PRICE\", \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" WHERE \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" = '삼성전자' AND \"FIN_DEMO\".\"ORDERS\".\"SIDE\" = 'BUY' AND DATE(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = CURRENT DATE - 1 DAY ORDER BY \"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\"",
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
        9000171,
        "2026-11-24 09:28:10",
        17,
        "70910.00",
        "1205470"
       ],
       [
        9000175,
        "2026-11-24 10:29:17",
        21,
        "71090.00",
        "1492890"
       ],
       [
        9000174,
        "2026-11-24 10:33:04",
        18,
        "71310.00",
        "1283580"
       ],
       [
        9000178,
        "2026-11-24 11:38:04",
        50,
        "71070.00",
        "3553500"
       ],
       [
        9000179,
        "2026-11-24 11:49:17",
        724,
        "71120.00",
        "51490880"
       ]
      ],
      "row_count": 10
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
        9000171,
        5000151,
        "1205470",
        "70910.00",
        17,
        "2026-11-24 09:28:10",
        "0",
        "180.82"
       ],
       [
        9000174,
        5000154,
        "1283580",
        "71310.00",
        18,
        "2026-11-24 10:33:04",
        "0",
        "192.54"
       ],
       [
        9000175,
        5000155,
        "1492890",
        "71090.00",
        21,
        "2026-11-24 10:29:17",
        "0",
        "223.93"
       ],
       [
        9000178,
        5000159,
        "3553500",
        "71070.00",
        50,
        "2026-11-24 11:38:04",
        "0",
        "533.02"
       ],
       [
        9000179,
        5000160,
        "51490880",
        "71120.00",
        724,
        "2026-11-24 11:49:17",
        "0",
        "7723.63"
       ]
      ],
      "row_count": 10
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
        9000171,
        5000151,
        "1205470",
        "70910.00",
        17,
        "2026-11-24 09:28:10",
        "0",
        "180.82"
       ],
       [
        9000174,
        5000154,
        "1283580",
        "71310.00",
        18,
        "2026-11-24 10:33:04",
        "0",
        "192.54"
       ],
       [
        9000175,
        5000155,
        "1492890",
        "71090.00",
        21,
        "2026-11-24 10:29:17",
        "0",
        "223.93"
       ],
       [
        9000178,
        5000159,
        "3553500",
        "71070.00",
        50,
        "2026-11-24 11:38:04",
        "0",
        "533.02"
       ],
       [
        9000179,
        5000160,
        "51490880",
        "71120.00",
        724,
        "2026-11-24 11:49:17",
        "0",
        "7723.63"
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
        9000171,
        "2026-11-24 09:28:10",
        17,
        "70910.00",
        "1205470"
       ],
       [
        9000175,
        "2026-11-24 10:29:17",
        21,
        "71090.00",
        "1492890"
       ],
       [
        9000174,
        "2026-11-24 10:33:04",
        18,
        "71310.00",
        "1283580"
       ],
       [
        9000178,
        "2026-11-24 11:38:04",
        50,
        "71070.00",
        "3553500"
       ],
       [
        9000179,
        "2026-11-24 11:49:17",
        724,
        "71120.00",
        "51490880"
       ]
      ],
      "row_count": 10
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
        9000171,
        5000151,
        "1205470",
        "70910.00",
        17,
        "2026-11-24 09:28:10",
        "0",
        "180.82"
       ],
       [
        9000174,
        5000154,
        "1283580",
        "71310.00",
        18,
        "2026-11-24 10:33:04",
        "0",
        "192.54"
       ],
       [
        9000175,
        5000155,
        "1492890",
        "71090.00",
        21,
        "2026-11-24 10:29:17",
        "0",
        "223.93"
       ],
       [
        9000178,
        5000159,
        "3553500",
        "71070.00",
        50,
        "2026-11-24 11:38:04",
        "0",
        "533.02"
       ],
       [
        9000179,
        5000160,
        "51490880",
        "71120.00",
        724,
        "2026-11-24 11:49:17",
        "0",
        "7723.63"
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
      "지지후",
      "175090620"
     ],
     [
      "진건우",
      "101877320"
     ],
     [
      "심지우",
      "92632380"
     ],
     [
      "박수빈",
      "77406890"
     ],
     [
      "심서준",
      "56433840"
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
        23,
        "지지후",
        "175090620"
       ],
       [
        31,
        "진건우",
        "101877320"
       ],
       [
        15,
        "심지우",
        "92632380"
       ],
       [
        18,
        "박수빈",
        "77406890"
       ],
       [
        35,
        "심서준",
        "56433840"
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
        23,
        "지지후",
        "175090620"
       ],
       [
        31,
        "진건우",
        "101877320"
       ],
       [
        15,
        "심지우",
        "92632380"
       ],
       [
        18,
        "박수빈",
        "77406890"
       ],
       [
        35,
        "심서준",
        "56433840"
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
        23,
        "지지후",
        "175090620"
       ],
       [
        31,
        "진건우",
        "101877320"
       ],
       [
        15,
        "심지우",
        "92632380"
       ],
       [
        18,
        "박수빈",
        "77406890"
       ],
       [
        35,
        "심서준",
        "56433840"
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
        23,
        "지지후",
        "175090620"
       ],
       [
        31,
        "진건우",
        "101877320"
       ],
       [
        15,
        "심지우",
        "92632380"
       ],
       [
        18,
        "박수빈",
        "77406890"
       ],
       [
        35,
        "심서준",
        "56433840"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"C\".\"CUSTOMER_ID\", \"C\".\"CUSTOMER_NAME\", SUM(\"E\".\"EXEC_AMOUNT\") AS \"TOTAL_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"E\" JOIN \"FIN_DEMO\".\"ORDERS\" \"O\" ON \"E\".\"ORDER_ID\" = \"O\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"A\" ON \"O\".\"ACCOUNT_ID\" = \"A\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"C\" ON \"A\".\"CUSTOMER_ID\" = \"C\".\"CUSTOMER_ID\" WHERE YEAR(\"E\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"E\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"C\".\"CUSTOMER_ID\", \"C\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        23,
        "지지후",
        "175090620"
       ],
       [
        31,
        "진건우",
        "101877320"
       ],
       [
        15,
        "심지우",
        "92632380"
       ],
       [
        18,
        "박수빈",
        "77406890"
       ],
       [
        35,
        "심서준",
        "56433840"
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
        "2023-02-12",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-16",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-08",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-11-01",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-11",
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
        "2023-02-12",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-16",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-08",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-11-01",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-11",
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
        "2023-02-12",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-16",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-08",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-11-01",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-11",
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
        "2023-02-12",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-16",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-08",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-11-01",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-11",
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
      "지지후",
      "175090620"
     ],
     [
      "진건우",
      "101877320"
     ],
     [
      "심지우",
      "92632380"
     ],
     [
      "박수빈",
      "77406890"
     ],
     [
      "심서준",
      "56433840"
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
        23,
        "지지후",
        "175090620"
       ],
       [
        31,
        "진건우",
        "101877320"
       ],
       [
        15,
        "심지우",
        "92632380"
       ],
       [
        18,
        "박수빈",
        "77406890"
       ],
       [
        35,
        "심서준",
        "56433840"
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
        23,
        "지지후",
        "175090620"
       ],
       [
        31,
        "진건우",
        "101877320"
       ],
       [
        15,
        "심지우",
        "92632380"
       ],
       [
        18,
        "박수빈",
        "77406890"
       ],
       [
        35,
        "심서준",
        "56433840"
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
        23,
        "지지후",
        "175090620"
       ],
       [
        31,
        "진건우",
        "101877320"
       ],
       [
        15,
        "심지우",
        "92632380"
       ],
       [
        18,
        "박수빈",
        "77406890"
       ],
       [
        35,
        "심서준",
        "56433840"
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
        23,
        "지지후",
        "175090620"
       ],
       [
        31,
        "진건우",
        "101877320"
       ],
       [
        15,
        "심지우",
        "92632380"
       ],
       [
        18,
        "박수빈",
        "77406890"
       ],
       [
        35,
        "심서준",
        "56433840"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\" JOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\" WHERE YEAR(\"e\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"e\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_TRANSACTION_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        23,
        "지지후",
        "175090620"
       ],
       [
        31,
        "진건우",
        "101877320"
       ],
       [
        15,
        "심지우",
        "92632380"
       ],
       [
        18,
        "박수빈",
        "77406890"
       ],
       [
        35,
        "심서준",
        "56433840"
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
      "115288200",
      1
     ],
     [
      "2차전지",
      "삼성SDI",
      "72153180",
      2
     ],
     [
      "2차전지",
      "에코프로",
      "68089720",
      3
     ],
     [
      "IT서비스",
      "카카오",
      "176627560",
      1
     ],
     [
      "IT서비스",
      "NAVER",
      "15166320",
      2
     ]
    ],
    "row_count": 31
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
        "115288200",
        1
       ],
       [
        "2차전지",
        "삼성SDI",
        "72153180",
        2
       ],
       [
        "2차전지",
        "에코프로",
        "68089720",
        3
       ],
       [
        "IT서비스",
        "카카오",
        "176627560",
        1
       ],
       [
        "IT서비스",
        "NAVER",
        "15166320",
        2
       ]
      ],
      "row_count": 31
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
        "115288200",
        1
       ],
       [
        "2차전지",
        "삼성SDI",
        "72153180",
        2
       ],
       [
        "2차전지",
        "에코프로",
        "68089720",
        3
       ],
       [
        "IT서비스",
        "카카오",
        "176627560",
        1
       ],
       [
        "IT서비스",
        "NAVER",
        "15166320",
        2
       ]
      ],
      "row_count": 31
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
        "115288200",
        1
       ],
       [
        "2차전지",
        "삼성SDI",
        "72153180",
        2
       ],
       [
        "2차전지",
        "에코프로",
        "68089720",
        3
       ],
       [
        "IT서비스",
        "카카오",
        "176627560",
        1
       ],
       [
        "IT서비스",
        "NAVER",
        "15166320",
        2
       ]
      ],
      "row_count": 31
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
        "115288200",
        1
       ],
       [
        "2차전지",
        "삼성SDI",
        "72153180",
        2
       ],
       [
        "2차전지",
        "에코프로",
        "68089720",
        3
       ],
       [
        "IT서비스",
        "카카오",
        "176627560",
        1
       ],
       [
        "IT서비스",
        "NAVER",
        "15166320",
        2
       ]
      ],
      "row_count": 31
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
        "115288200",
        1
       ],
       [
        "2차전지",
        "삼성SDI",
        "72153180",
        2
       ],
       [
        "2차전지",
        "에코프로",
        "68089720",
        3
       ],
       [
        "IT서비스",
        "카카오",
        "176627560",
        1
       ],
       [
        "IT서비스",
        "NAVER",
        "15166320",
        2
       ]
      ],
      "row_count": 31
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
      5000097
     ],
     [
      5000044
     ],
     [
      5000079
     ]
    ],
    "row_count": 15
   },
   "runs": [
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
        "2026-11-25 09:26:05"
       ],
       [
        5000097,
        1000017,
        "2026-06-03 14:47:57"
       ],
       [
        5000044,
        1000056,
        "2026-02-25 11:04:25"
       ],
       [
        5000079,
        1000030,
        "2026-04-09 13:28:35"
       ]
      ],
      "row_count": 15
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\", \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_TS\" FROM \"FIN_DEMO\".\"ORDERS\" LEFT JOIN \"FIN_DEMO\".\"EXECUTIONS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" WHERE \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" IS NULL AND \"FIN_DEMO\".\"ORDERS\".\"ORDER_TYPE\" = 'LIMIT' AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"FIN_DEMO\".\"ORDERS\".\"ORDER_TS\")) > 30",
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
        "2026-11-25 09:26:05"
       ],
       [
        5000097,
        1000017,
        "2026-06-03 14:47:57"
       ],
       [
        5000044,
        1000056,
        "2026-02-25 11:04:25"
       ],
       [
        5000079,
        1000030,
        "2026-04-09 13:28:35"
       ]
      ],
      "row_count": 15
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ACCOUNT_ID\", \"o\".\"ORDER_TS\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" LEFT JOIN \"FIN_DEMO\".\"EXECUTIONS\" \"e\" ON \"o\".\"ORDER_ID\" = \"e\".\"ORDER_ID\" WHERE \"o\".\"ORDER_TYPE\" = 'LIMIT' AND \"o\".\"ORDER_PRICE\" IS NOT NULL AND \"e\".\"ORDER_ID\" IS NULL AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS\")) > 30",
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
        "2026-11-25 09:26:05"
       ],
       [
        5000097,
        1000017,
        "2026-06-03 14:47:57"
       ],
       [
        5000044,
        1000056,
        "2026-02-25 11:04:25"
       ],
       [
        5000079,
        1000030,
        "2026-04-09 13:28:35"
       ]
      ],
      "row_count": 15
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"o\".\"ORDER_ID\", \"o\".\"ACCOUNT_ID\", \"o\".\"ORDER_TS\" FROM \"FIN_DEMO\".\"ORDERS\" \"o\" LEFT JOIN \"FIN_DEMO\".\"EXECUTIONS\" \"e\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" WHERE \"e\".\"ORDER_ID\" IS NULL AND \"o\".\"ORDER_TYPE\" = 'LIMIT' AND TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - \"o\".\"ORDER_TS)) > 30",
     "result": null,
     "error": "[IBM][CLI Driver][DB2/LINUXX8664] SQL0010N  The string constant beginning with \"\"ORDER_TS)) > 30\" does not have an ending string delimiter.  SQLSTATE=42603 SQLCODE=-10",
     "pass": false,
     "status": "실행오류 TS)) > 30\" does not have an ending string delimiter.  SQLSTATE=42603 SQLCODE=-10"
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
        "2026-11-25 09:26:05"
       ],
       [
        5000097,
        1000017,
        "2026-06-03 14:47:57"
       ],
       [
        5000044,
        1000056,
        "2026-02-25 11:04:25"
       ],
       [
        5000079,
        1000030,
        "2026-04-09 13:28:35"
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
        "0.860007"
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
        "0.860007"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"d\".\"DESK_ID\", \"d\".\"DESK_NAME\", SUM(\"s\".\"EXPOSURE_AMOUNT\") / \"d\".\"LIMIT_AMOUNT\" AS \"USAGE_RATIO\" FROM \"FIN_DEMO\".\"DESK\" \"d\" JOIN \"FIN_DEMO\".\"ST_POSITIONS\" \"s\" ON \"d\".\"DESK_ID\" = \"s\".\"DESK_ID\" WHERE \"s\".\"BASE_DATE\" = (SELECT MAX(\"BASE_DATE\") FROM \"FIN_DEMO\".\"ST_POSITIONS\") GROUP BY \"d\".\"DESK_ID\", \"d\".\"DESK_NAME\", \"d\".\"LIMIT_AMOUNT\" HAVING SUM(\"s\".\"EXPOSURE_AMOUNT\") / \"d\".\"LIMIT_AMOUNT\" > 0.8",
     "result": {
      "columns": [
       "DESK_ID",
       "DESK_NAME",
       "USAGE_RATIO"
      ],
      "rows": [
       [
        2,
        "주식2데스크",
        "0.860007"
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
        "0.860007"
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
        "0.860007"
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
