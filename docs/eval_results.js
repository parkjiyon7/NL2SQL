window.EVAL = {
 "date": "2026-11-20",
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
      7,
      "104115980"
     ]
    ],
    "row_count": 1
   },
   "runs": [
    {
     "sql": "SELECT COUNT(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_ID\") AS \"execution_count\", SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"transaction_amount\" FROM \"FIN_DEMO\".\"EXECUTIONS\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" INNER JOIN \"FIN_DEMO\".\"CUSTOMER\" ON \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" INNER JOIN \"FIN_DEMO\".\"BRANCH\" ON \"FIN_DEMO\".\"CUSTOMER\".\"BRANCH_CODE\" = \"FIN_DEMO\".\"BRANCH\".\"BRANCH_CODE\" WHERE \"FIN_DEMO\".\"BRANCH\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "execution_count",
       "transaction_amount"
      ],
      "rows": [
       [
        7,
        "104115980"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT COUNT(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_ID\") AS \"execution_count\", SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"total_transaction_amount\" FROM \"FIN_DEMO\".\"EXECUTIONS\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" INNER JOIN \"FIN_DEMO\".\"CUSTOMER\" ON \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" INNER JOIN \"FIN_DEMO\".\"BRANCH\" ON \"FIN_DEMO\".\"CUSTOMER\".\"BRANCH_CODE\" = \"FIN_DEMO\".\"BRANCH\".\"BRANCH_CODE\" WHERE \"FIN_DEMO\".\"BRANCH\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "execution_count",
       "total_transaction_amount"
      ],
      "rows": [
       [
        7,
        "104115980"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT COUNT(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_ID\") AS \"number_of_executions\", SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"transaction_amount\" FROM \"FIN_DEMO\".\"CUSTOMER\" INNER JOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\" INNER JOIN \"FIN_DEMO\".\"EXECUTIONS\" ON \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" = \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"BRANCH\" ON \"FIN_DEMO\".\"CUSTOMER\".\"BRANCH_CODE\" = \"FIN_DEMO\".\"BRANCH\".\"BRANCH_CODE\" WHERE \"FIN_DEMO\".\"BRANCH\".\"BRANCH_NAME\" = '강남지점' AND DATE(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = CURRENT DATE",
     "result": {
      "columns": [
       "number_of_executions",
       "transaction_amount"
      ],
      "rows": [
       [
        7,
        "104115980"
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
      9000184,
      2,
      "72420.00"
     ],
     [
      9000185,
      21,
      "72420.00"
     ],
     [
      9000188,
      2,
      "72720.00"
     ],
     [
      9000189,
      4,
      "72670.00"
     ],
     [
      9000190,
      18,
      "72420.00"
     ]
    ],
    "row_count": 15
   },
   "runs": [
    {
     "sql": "SELECT \"FIN_DEMO\".\"EXECUTIONS\".*, \"FIN_DEMO\".\"ORDERS\".\"ORDER_PRICE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_QTY\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_TYPE\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" FROM \"FIN_DEMO\".\"EXECUTIONS\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"PRODUCT\" ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" WHERE \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" = '삼성전자' AND \"FIN_DEMO\".\"ORDERS\".\"SIDE\" = 'BUY' AND DATE(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
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
       "ORDER_PRICE",
       "ORDER_QTY",
       "ORDER_TYPE",
       "PRODUCT_NAME"
      ],
      "rows": [
       [
        9000184,
        5000151,
        "2026-11-19 09:28:12",
        2,
        "72420.00",
        "144840",
        "21.73",
        "0",
        null,
        23,
        "MARKET",
        "삼성전자"
       ],
       [
        9000185,
        5000151,
        "2026-11-19 09:29:23",
        21,
        "72420.00",
        "1520820",
        "228.12",
        "0",
        null,
        23,
        "MARKET",
        "삼성전자"
       ],
       [
        9000188,
        5000154,
        "2026-11-19 10:32:11",
        2,
        "72720.00",
        "145440",
        "21.82",
        "0",
        "72740.00",
        6,
        "LIMIT",
        "삼성전자"
       ],
       [
        9000189,
        5000154,
        "2026-11-19 10:34:07",
        4,
        "72670.00",
        "290680",
        "43.60",
        "0",
        "72740.00",
        6,
        "LIMIT",
        "삼성전자"
       ],
       [
        9000190,
        5000155,
        "2026-11-19 10:29:16",
        18,
        "72420.00",
        "1303560",
        "195.53",
        "0",
        null,
        18,
        "MARKET",
        "삼성전자"
       ]
      ],
      "row_count": 15
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"EXECUTIONS\".*, \"FIN_DEMO\".\"ORDERS\".\"ORDER_PRICE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_QTY\", \"FIN_DEMO\".\"ORDERS\".\"SIDE\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" FROM \"FIN_DEMO\".\"EXECUTIONS\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"PRODUCT\" ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" WHERE \"FIN_DEMO\".\"ORDERS\".\"SIDE\" = 'BUY' AND \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" LIKE '%삼성전자%' AND DATE(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
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
       "ORDER_PRICE",
       "ORDER_QTY",
       "SIDE",
       "PRODUCT_NAME"
      ],
      "rows": [
       [
        9000184,
        5000151,
        "2026-11-19 09:28:12",
        2,
        "72420.00",
        "144840",
        "21.73",
        "0",
        null,
        23,
        "BUY",
        "삼성전자"
       ],
       [
        9000185,
        5000151,
        "2026-11-19 09:29:23",
        21,
        "72420.00",
        "1520820",
        "228.12",
        "0",
        null,
        23,
        "BUY",
        "삼성전자"
       ],
       [
        9000188,
        5000154,
        "2026-11-19 10:32:11",
        2,
        "72720.00",
        "145440",
        "21.82",
        "0",
        "72740.00",
        6,
        "BUY",
        "삼성전자"
       ],
       [
        9000189,
        5000154,
        "2026-11-19 10:34:07",
        4,
        "72670.00",
        "290680",
        "43.60",
        "0",
        "72740.00",
        6,
        "BUY",
        "삼성전자"
       ],
       [
        9000190,
        5000155,
        "2026-11-19 10:29:16",
        18,
        "72420.00",
        "1303560",
        "195.53",
        "0",
        null,
        18,
        "BUY",
        "삼성전자"
       ]
      ],
      "row_count": 15
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"EXECUTIONS\".*, \"FIN_DEMO\".\"ORDERS\".*, \"FIN_DEMO\".\"PRODUCT\".* FROM \"FIN_DEMO\".\"EXECUTIONS\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"PRODUCT\" ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" WHERE \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" = '삼성전자' AND \"FIN_DEMO\".\"ORDERS\".\"SIDE\" = 'BUY' AND DATE(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = CURRENT DATE - 1 DAY",
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
        9000184,
        5000151,
        "2026-11-19 09:28:12",
        2,
        "72420.00",
        "144840",
        "21.73",
        "0",
        5000151,
        1000017,
        "005930",
        "BUY",
        "MARKET",
        "2026-11-19 09:27:52",
        23,
        null,
        "005930",
        "삼성전자",
        "KOSPI",
        "반도체"
       ],
       [
        9000185,
        5000151,
        "2026-11-19 09:29:23",
        21,
        "72420.00",
        "1520820",
        "228.12",
        "0",
        5000151,
        1000017,
        "005930",
        "BUY",
        "MARKET",
        "2026-11-19 09:27:52",
        23,
        null,
        "005930",
        "삼성전자",
        "KOSPI",
        "반도체"
       ],
       [
        9000188,
        5000154,
        "2026-11-19 10:32:11",
        2,
        "72720.00",
        "145440",
        "21.82",
        "0",
        5000154,
        1000013,
        "005930",
        "BUY",
        "LIMIT",
        "2026-11-19 10:24:59",
        6,
        "72740.00",
        "005930",
        "삼성전자",
        "KOSPI",
        "반도체"
       ],
       [
        9000189,
        5000154,
        "2026-11-19 10:34:07",
        4,
        "72670.00",
        "290680",
        "43.60",
        "0",
        5000154,
        1000013,
        "005930",
        "BUY",
        "LIMIT",
        "2026-11-19 10:24:59",
        6,
        "72740.00",
        "005930",
        "삼성전자",
        "KOSPI",
        "반도체"
       ],
       [
        9000190,
        5000155,
        "2026-11-19 10:29:16",
        18,
        "72420.00",
        "1303560",
        "195.53",
        "0",
        5000155,
        1000045,
        "005930",
        "BUY",
        "MARKET",
        "2026-11-19 10:29:07",
        18,
        null,
        "005930",
        "삼성전자",
        "KOSPI",
        "반도체"
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
     "sql": "SELECT \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\", SUM(\"FIN_DEMO\".\"BALANCE_DAILY\".\"CASH_BALANCE\") AS \"TOTAL_CASH_BALANCE\" FROM \"FIN_DEMO\".\"CUSTOMER\" INNER JOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" INNER JOIN \"FIN_DEMO\".\"BALANCE_DAILY\" ON \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"BALANCE_DAILY\".\"ACCOUNT_ID\" WHERE \"FIN_DEMO\".\"CUSTOMER\".\"GRADE\" = 'VIP' AND \"FIN_DEMO\".\"BALANCE_DAILY\".\"BASE_DATE\" = (SELECT MAX(\"BASE_DATE\") FROM \"FIN_DEMO\".\"BALANCE_DAILY\") GROUP BY \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_CASH_BALANCE\" DESC FETCH FIRST 10 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_NAME",
       "TOTAL_CASH_BALANCE"
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
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\", SUM(\"FIN_DEMO\".\"BALANCE_DAILY\".\"CASH_BALANCE\") AS \"total_cash_balance\" FROM \"FIN_DEMO\".\"CUSTOMER\" JOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" JOIN \"FIN_DEMO\".\"BALANCE_DAILY\" ON \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"BALANCE_DAILY\".\"ACCOUNT_ID\" WHERE \"FIN_DEMO\".\"CUSTOMER\".\"GRADE\" = 'VIP' AND \"FIN_DEMO\".\"BALANCE_DAILY\".\"BASE_DATE\" = (SELECT MAX(\"BASE_DATE\") FROM \"FIN_DEMO\".\"BALANCE_DAILY\") GROUP BY \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\" ORDER BY \"total_cash_balance\" DESC FETCH FIRST 10 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_NAME",
       "total_cash_balance"
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
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "WITH RECENT_BALANCE AS ( SELECT \"ACCOUNT_ID\", \"CASH_BALANCE\", ROW_NUMBER() OVER (PARTITION BY \"ACCOUNT_ID\" ORDER BY \"BASE_DATE\" DESC) AS ROW_NUM FROM \"FIN_DEMO\".\"BALANCE_DAILY\" ), LATEST_BALANCE AS ( SELECT \"ACCOUNT_ID\", \"CASH_BALANCE\" FROM RECENT_BALANCE WHERE ROW_NUM = 1 ), CUSTOMER_BALANCE AS ( SELECT \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"CUSTOMER\".\"GRADE\", SUM(\"LATEST_BALANCE\".\"CASH_BALANCE\") AS TOTAL_CASH_BALANCE FROM \"FIN_DEMO\".\"CUSTOMER\" JOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" JOIN LATEST_BALANCE ON \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" = LATEST_BALANCE.\"ACCOUNT_ID\" WHERE \"FIN_DEMO\".\"CUSTOMER\".\"GRADE\" = 'VIP' GROUP BY \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"CUSTOMER\".\"GRADE\" ) SELECT \"CUSTOMER_ID\", \"GRADE\", \"TOTAL_CASH_BALANCE\" FROM CUSTOMER_BALANCE ORDER BY \"TOTAL_CASH_BALANCE\" DESC FETCH FIRST 10 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "GRADE",
       "TOTAL_CASH_BALANCE"
      ],
      "rows": [
       [
        14,
        "VIP",
        "466173370"
       ],
       [
        37,
        "VIP",
        "124173333"
       ],
       [
        30,
        "VIP",
        "103005096"
       ],
       [
        29,
        "VIP",
        "101626002"
       ]
      ],
      "row_count": 4
     },
     "pass": false,
     "status": "불일치(4행/정답 4행)"
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
      "심**",
      "113627100"
     ],
     [
      "진**",
      "106559270"
     ],
     [
      "지**",
      "105427220"
     ],
     [
      "박**",
      "86241880"
     ],
     [
      "심**",
      "49963830"
     ]
    ],
    "row_count": 5
   },
   "runs": [
    {
     "sql": "SELECT \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\", SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" INNER JOIN \"FIN_DEMO\".\"CUSTOMER\" ON \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" WHERE MONTH(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = MONTH(CURRENT DATE) AND YEAR(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = YEAR(CURRENT DATE) GROUP BY \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_TRANSACTION_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        15,
        "심**",
        "113627100"
       ],
       [
        31,
        "진**",
        "106559270"
       ],
       [
        23,
        "지**",
        "105427220"
       ],
       [
        18,
        "박**",
        "86241880"
       ],
       [
        35,
        "심**",
        "49963830"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\", SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS total_transaction_amount FROM \"FIN_DEMO\".\"EXECUTIONS\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" INNER JOIN \"FIN_DEMO\".\"CUSTOMER\" ON \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" WHERE YEAR(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\" ORDER BY total_transaction_amount DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        15,
        "심**",
        "113627100"
       ],
       [
        31,
        "진**",
        "106559270"
       ],
       [
        23,
        "지**",
        "105427220"
       ],
       [
        18,
        "박**",
        "86241880"
       ],
       [
        35,
        "심**",
        "49963830"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\", SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" INNER JOIN \"FIN_DEMO\".\"CUSTOMER\" ON \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" WHERE MONTH(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = MONTH(CURRENT DATE) AND YEAR(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = YEAR(CURRENT DATE) GROUP BY \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_TRANSACTION_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_NAME",
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        "심**",
        "113627100"
       ],
       [
        "진**",
        "106559270"
       ],
       [
        "지**",
        "105427220"
       ],
       [
        "박**",
        "86241880"
       ],
       [
        "심**",
        "49963830"
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
     "sql": "SELECT \"FIN_DEMO\".\"ACCOUNT\".* FROM \"FIN_DEMO\".\"ACCOUNT\" WHERE \"FIN_DEMO\".\"ACCOUNT\".\"CREDIT_LOAN_YN\" = 'Y'",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "CUSTOMER_ID",
       "ACCOUNT_TYPE",
       "OPEN_DATE",
       "CREDIT_LOAN_YN"
      ],
      "rows": [
       [
        1000006,
        5,
        "BROKERAGE",
        "2023-02-07",
        "Y"
       ],
       [
        1000007,
        6,
        "BROKERAGE",
        "2026-02-11",
        "Y"
       ],
       [
        1000021,
        14,
        "BROKERAGE",
        "2026-04-03",
        "Y"
       ],
       [
        1000023,
        16,
        "BROKERAGE",
        "2025-10-27",
        "Y"
       ],
       [
        1000036,
        26,
        "BROKERAGE",
        "2025-08-06",
        "Y"
       ]
      ],
      "row_count": 8
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"ACCOUNT\".\"OPEN_DATE\", \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\", \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"ACCOUNT\".\"CREDIT_LOAN_YN\", \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_TYPE\" FROM \"FIN_DEMO\".\"ACCOUNT\" WHERE \"FIN_DEMO\".\"ACCOUNT\".\"CREDIT_LOAN_YN\" = 'Y'",
     "result": {
      "columns": [
       "OPEN_DATE",
       "ACCOUNT_ID",
       "CUSTOMER_ID",
       "CREDIT_LOAN_YN",
       "ACCOUNT_TYPE"
      ],
      "rows": [
       [
        "2023-02-07",
        1000006,
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        "2026-02-11",
        1000007,
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        "2026-04-03",
        1000021,
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        "2025-10-27",
        1000023,
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        "2025-08-06",
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
        "2023-02-07",
        5,
        "Y",
        "BROKERAGE"
       ],
       [
        1000007,
        "2026-02-11",
        6,
        "Y",
        "BROKERAGE"
       ],
       [
        1000021,
        "2026-04-03",
        14,
        "Y",
        "BROKERAGE"
       ],
       [
        1000023,
        "2025-10-27",
        16,
        "Y",
        "BROKERAGE"
       ],
       [
        1000036,
        "2025-08-06",
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
      "심**",
      "113627100"
     ],
     [
      "진**",
      "106559270"
     ],
     [
      "지**",
      "105427220"
     ],
     [
      "박**",
      "86241880"
     ],
     [
      "심**",
      "49963830"
     ]
    ],
    "row_count": 5
   },
   "runs": [
    {
     "sql": "SELECT \"C\".\"CUSTOMER_ID\", \"C\".\"CUSTOMER_NAME\", SUM(\"E\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"E\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" \"O\" ON \"E\".\"ORDER_ID\" = \"O\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"ACCOUNT\" \"A\" ON \"O\".\"ACCOUNT_ID\" = \"A\".\"ACCOUNT_ID\" INNER JOIN \"FIN_DEMO\".\"CUSTOMER\" \"C\" ON \"A\".\"CUSTOMER_ID\" = \"C\".\"CUSTOMER_ID\" WHERE YEAR(\"E\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"E\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"C\".\"CUSTOMER_ID\", \"C\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_TRANSACTION_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        15,
        "심**",
        "113627100"
       ],
       [
        31,
        "진**",
        "106559270"
       ],
       [
        23,
        "지**",
        "105427220"
       ],
       [
        18,
        "박**",
        "86241880"
       ],
       [
        35,
        "심**",
        "49963830"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\", SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" INNER JOIN \"FIN_DEMO\".\"CUSTOMER\" ON \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" WHERE YEAR(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_TRANSACTION_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        15,
        "심**",
        "113627100"
       ],
       [
        31,
        "진**",
        "106559270"
       ],
       [
        23,
        "지**",
        "105427220"
       ],
       [
        18,
        "박**",
        "86241880"
       ],
       [
        35,
        "심**",
        "49963830"
       ]
      ],
      "row_count": 5
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\", SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\" FROM \"FIN_DEMO\".\"EXECUTIONS\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" INNER JOIN \"FIN_DEMO\".\"CUSTOMER\" ON \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" WHERE YEAR(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = YEAR(CURRENT DATE) AND MONTH(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = MONTH(CURRENT DATE) GROUP BY \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\", \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_NAME\" ORDER BY \"TOTAL_TRANSACTION_AMOUNT\" DESC FETCH FIRST 5 ROWS ONLY",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        15,
        "심**",
        "113627100"
       ],
       [
        31,
        "진**",
        "106559270"
       ],
       [
        23,
        "지**",
        "105427220"
       ],
       [
        18,
        "박**",
        "86241880"
       ],
       [
        35,
        "심**",
        "49963830"
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
      "삼성SDI",
      "144532720",
      1
     ],
     [
      "2차전지",
      "에코프로",
      "117660640",
      2
     ],
     [
      "2차전지",
      "에코프로비엠",
      "112601720",
      3
     ],
     [
      "IT서비스",
      "카카오",
      "90423190",
      1
     ],
     [
      "IT서비스",
      "NAVER",
      "15517380",
      2
     ]
    ],
    "row_count": 31
   },
   "runs": [
    {
     "sql": "SELECT \"p\".\"PRODUCT_CODE\", \"p\".\"PRODUCT_NAME\", \"p\".\"SECTOR\", SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\", RANK() OVER (PARTITION BY \"p\".\"SECTOR\" ORDER BY SUM(\"e\".\"EXEC_AMOUNT\") DESC) AS \"RANK_WITHIN_INDUSTRY\" FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\" JOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\" JOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" GROUP BY \"p\".\"PRODUCT_CODE\", \"p\".\"PRODUCT_NAME\", \"p\".\"SECTOR\" ORDER BY \"p\".\"SECTOR\", SUM(\"e\".\"EXEC_AMOUNT\") DESC",
     "result": {
      "columns": [
       "PRODUCT_CODE",
       "PRODUCT_NAME",
       "SECTOR",
       "TOTAL_TRANSACTION_AMOUNT",
       "RANK_WITHIN_INDUSTRY"
      ],
      "rows": [
       [
        "006400",
        "삼성SDI",
        "2차전지",
        "144532720",
        1
       ],
       [
        "086520",
        "에코프로",
        "2차전지",
        "117660640",
        2
       ],
       [
        "247540",
        "에코프로비엠",
        "2차전지",
        "112601720",
        3
       ],
       [
        "035720",
        "카카오",
        "IT서비스",
        "90423190",
        1
       ],
       [
        "035420",
        "NAVER",
        "IT서비스",
        "15517380",
        2
       ]
      ],
      "row_count": 31
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"PRODUCT\".\"SECTOR\" AS \"SECTOR\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" AS \"PRODUCT_CODE\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" AS \"PRODUCT_NAME\", SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\", RANK() OVER (PARTITION BY \"FIN_DEMO\".\"PRODUCT\".\"SECTOR\" ORDER BY SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") DESC) AS \"RANK_WITHIN_SECTOR\" FROM \"FIN_DEMO\".\"EXECUTIONS\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"PRODUCT\" ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" GROUP BY \"FIN_DEMO\".\"PRODUCT\".\"SECTOR\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" ORDER BY \"FIN_DEMO\".\"PRODUCT\".\"SECTOR\", \"RANK_WITHIN_SECTOR\"",
     "result": {
      "columns": [
       "SECTOR",
       "PRODUCT_CODE",
       "PRODUCT_NAME",
       "TOTAL_TRANSACTION_AMOUNT",
       "RANK_WITHIN_SECTOR"
      ],
      "rows": [
       [
        "2차전지",
        "006400",
        "삼성SDI",
        "144532720",
        1
       ],
       [
        "2차전지",
        "086520",
        "에코프로",
        "117660640",
        2
       ],
       [
        "2차전지",
        "247540",
        "에코프로비엠",
        "112601720",
        3
       ],
       [
        "IT서비스",
        "035720",
        "카카오",
        "90423190",
        1
       ],
       [
        "IT서비스",
        "035420",
        "NAVER",
        "15517380",
        2
       ]
      ],
      "row_count": 31
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"PRODUCT\".\"SECTOR\" AS \"industry\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" AS \"product_code\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" AS \"product_name\", SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"total_transaction_amount\", RANK() OVER (PARTITION BY \"FIN_DEMO\".\"PRODUCT\".\"SECTOR\" ORDER BY SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") DESC) AS \"rank_within_industry\" FROM \"FIN_DEMO\".\"EXECUTIONS\" INNER JOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" INNER JOIN \"FIN_DEMO\".\"PRODUCT\" ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\" GROUP BY \"FIN_DEMO\".\"PRODUCT\".\"SECTOR\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\", \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" ORDER BY \"FIN_DEMO\".\"PRODUCT\".\"SECTOR\", \"rank_within_industry\"",
     "result": {
      "columns": [
       "industry",
       "product_code",
       "product_name",
       "total_transaction_amount",
       "rank_within_industry"
      ],
      "rows": [
       [
        "2차전지",
        "006400",
        "삼성SDI",
        "144532720",
        1
       ],
       [
        "2차전지",
        "086520",
        "에코프로",
        "117660640",
        2
       ],
       [
        "2차전지",
        "247540",
        "에코프로비엠",
        "112601720",
        3
       ],
       [
        "IT서비스",
        "035720",
        "카카오",
        "90423190",
        1
       ],
       [
        "IT서비스",
        "035420",
        "NAVER",
        "15517380",
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
      5000041
     ],
     [
      5000054
     ],
     [
      5000088
     ],
     [
      5000012
     ],
     [
      5000053
     ]
    ],
    "row_count": 5
   },
   "runs": [
    {
     "sql": "SELECT \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_TS\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_TYPE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_PRICE\" FROM \"FIN_DEMO\".\"ORDERS\" WHERE \"FIN_DEMO\".\"ORDERS\".\"ORDER_TYPE\" = 'LIMIT' AND \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" NOT IN (SELECT \"ORDER_ID\" FROM \"FIN_DEMO\".\"EXECUTIONS\") AND (\"CURRENT TIMESTAMP\" - \"FIN_DEMO\".\"ORDERS\".\"ORDER_TS\") > 30 MINUTES",
     "result": null,
     "error": "[IBM][CLI Driver][DB2/LINUXX8664] SQL0206N  \"CURRENT TIMESTAMP\" is not valid in the context where it is used.  SQLSTATE=42703 SQLCODE=-206",
     "pass": false,
     "status": "실행오류 TAMP\" is not valid in the context where it is used.  SQLSTATE=42703 SQLCODE=-206"
    },
    {
     "sql": "SELECT \"O\".\"ORDER_ID\", \"O\".\"ORDER_PRICE\", \"O\".\"ORDER_TS\", \"O\".\"ORDER_QTY\", \"O\".\"ACCOUNT_ID\", \"O\".\"ORDER_TYPE\", \"O\".\"PRODUCT_CODE\", \"O\".\"SIDE\" FROM \"FIN_DEMO\".\"ORDERS\" \"O\" LEFT JOIN \"FIN_DEMO\".\"EXECUTIONS\" \"E\" ON \"E\".\"ORDER_ID\" = \"O\".\"ORDER_ID\" AND \"E\".\"EXEC_TS\" <= \"O\".\"ORDER_TS\" + 30 MINUTE WHERE \"O\".\"ORDER_TYPE\" = 'LIMIT' AND \"E\".\"ORDER_ID\" IS NULL",
     "result": {
      "columns": [
       "ORDER_ID",
       "ORDER_PRICE",
       "ORDER_TS",
       "ORDER_QTY",
       "ACCOUNT_ID",
       "ORDER_TYPE",
       "PRODUCT_CODE",
       "SIDE"
      ],
      "rows": [
       [
        5000178,
        "32920.00",
        "2026-11-20 09:26:05",
        22,
        1000003,
        "LIMIT",
        "263750",
        "BUY"
       ],
       [
        5000018,
        "63360.00",
        "2025-11-27 13:04:29",
        199,
        1000033,
        "LIMIT",
        "028300",
        "SELL"
       ],
       [
        5000102,
        "379490.00",
        "2026-06-29 14:46:49",
        55,
        1000026,
        "LIMIT",
        "051910",
        "BUY"
       ],
       [
        5000013,
        "111090.00",
        "2025-11-11 14:28:55",
        56,
        1000020,
        "LIMIT",
        "000270",
        "BUY"
       ],
       [
        5000041,
        "223560.00",
        "2026-02-16 09:17:01",
        8,
        1000051,
        "LIMIT",
        "012330",
        "BUY"
       ]
      ],
      "row_count": 30
     },
     "pass": false,
     "status": "불일치(30행/정답 5행)"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_PRICE\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_TS\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_QTY\", \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\", \"FIN_DEMO\".\"ORDERS\".\"ORDER_TYPE\", \"FIN_DEMO\".\"ORDERS\".\"SIDE\", \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" FROM \"FIN_DEMO\".\"ORDERS\" WHERE \"FIN_DEMO\".\"ORDERS\".\"ORDER_TYPE\" = 'LIMIT' AND \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\" NOT IN (SELECT \"ORDER_ID\" FROM \"FIN_DEMO\".\"EXECUTIONS\") AND \"FIN_DEMO\".\"ORDERS\".\"ORDER_TS\" < CURRENT TIMESTAMP - 30 MINUTES",
     "result": {
      "columns": [
       "ORDER_ID",
       "ORDER_PRICE",
       "ORDER_TS",
       "ORDER_QTY",
       "ACCOUNT_ID",
       "ORDER_TYPE",
       "SIDE",
       "PRODUCT_CODE"
      ],
      "rows": [
       [
        5000012,
        "9820.00",
        "2025-11-11 12:04:58",
        737,
        1000032,
        "LIMIT",
        "BUY",
        "KR1010"
       ],
       [
        5000041,
        "223560.00",
        "2026-02-16 09:17:01",
        8,
        1000051,
        "LIMIT",
        "BUY",
        "012330"
       ],
       [
        5000053,
        "176250.00",
        "2026-03-13 10:42:58",
        22,
        1000032,
        "LIMIT",
        "BUY",
        "000660"
       ],
       [
        5000054,
        "175100.00",
        "2026-03-13 14:02:20",
        212,
        1000029,
        "LIMIT",
        "SELL",
        "000660"
       ],
       [
        5000088,
        "17660.00",
        "2026-05-12 13:38:18",
        805,
        1000022,
        "LIMIT",
        "SELL",
        "293490"
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
     "sql": "SELECT \"FIN_DEMO\".\"DESK\".\"DESK_ID\", \"FIN_DEMO\".\"DESK\".\"DESK_NAME\", \"FIN_DEMO\".\"DESK\".\"LIMIT_AMOUNT\", SUM(\"FIN_DEMO\".\"ST_POSITIONS\".\"EXPOSURE_AMOUNT\") AS \"TOTAL_EXPOSURE_AMOUNT\", SUM(\"FIN_DEMO\".\"ST_POSITIONS\".\"EXPOSURE_AMOUNT\") / \"FIN_DEMO\".\"DESK\".\"LIMIT_AMOUNT\" AS \"LIMIT_USAGE_RATE\" FROM \"FIN_DEMO\".\"DESK\" JOIN \"FIN_DEMO\".\"ST_POSITIONS\" ON \"FIN_DEMO\".\"DESK\".\"DESK_ID\" = \"FIN_DEMO\".\"ST_POSITIONS\".\"DESK_ID\" WHERE \"FIN_DEMO\".\"ST_POSITIONS\".\"BASE_DATE\" = (SELECT MAX(\"BASE_DATE\") FROM \"FIN_DEMO\".\"ST_POSITIONS\") GROUP BY \"FIN_DEMO\".\"DESK\".\"DESK_ID\", \"FIN_DEMO\".\"DESK\".\"DESK_NAME\", \"FIN_DEMO\".\"DESK\".\"LIMIT_AMOUNT\" HAVING SUM(\"FIN_DEMO\".\"ST_POSITIONS\".\"EXPOSURE_AMOUNT\") / \"FIN_DEMO\".\"DESK\".\"LIMIT_AMOUNT\" > 0.8",
     "result": {
      "columns": [
       "DESK_ID",
       "DESK_NAME",
       "LIMIT_AMOUNT",
       "TOTAL_EXPOSURE_AMOUNT",
       "LIMIT_USAGE_RATE"
      ],
      "rows": [
       [
        2,
        "주식2데스크",
        "13437000000",
        "11555633582",
        "0.859986"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"DESK\".\"DESK_ID\", \"FIN_DEMO\".\"DESK\".\"DESK_NAME\", \"FIN_DEMO\".\"DESK\".\"LIMIT_AMOUNT\", SUM(\"FIN_DEMO\".\"ST_POSITIONS\".\"EXPOSURE_AMOUNT\") AS \"TOTAL_EXPOSURE_AMOUNT\" FROM \"FIN_DEMO\".\"DESK\" JOIN \"FIN_DEMO\".\"ST_POSITIONS\" ON \"FIN_DEMO\".\"DESK\".\"DESK_ID\" = \"FIN_DEMO\".\"ST_POSITIONS\".\"DESK_ID\" WHERE \"FIN_DEMO\".\"ST_POSITIONS\".\"BASE_DATE\" = (SELECT MAX(\"BASE_DATE\") FROM \"FIN_DEMO\".\"ST_POSITIONS\") GROUP BY \"FIN_DEMO\".\"DESK\".\"DESK_ID\", \"FIN_DEMO\".\"DESK\".\"DESK_NAME\", \"FIN_DEMO\".\"DESK\".\"LIMIT_AMOUNT\" HAVING SUM(\"FIN_DEMO\".\"ST_POSITIONS\".\"EXPOSURE_AMOUNT\") / \"FIN_DEMO\".\"DESK\".\"LIMIT_AMOUNT\" > 0.8",
     "result": {
      "columns": [
       "DESK_ID",
       "DESK_NAME",
       "LIMIT_AMOUNT",
       "TOTAL_EXPOSURE_AMOUNT"
      ],
      "rows": [
       [
        2,
        "주식2데스크",
        "13437000000",
        "11555633582"
       ]
      ],
      "row_count": 1
     },
     "pass": true,
     "status": "OK"
    },
    {
     "sql": "SELECT \"FIN_DEMO\".\"DESK\".\"DESK_ID\", \"FIN_DEMO\".\"DESK\".\"DESK_NAME\", \"FIN_DEMO\".\"DESK\".\"LIMIT_AMOUNT\", SUM(\"FIN_DEMO\".\"ST_POSITIONS\".\"EXPOSURE_AMOUNT\") / \"FIN_DEMO\".\"DESK\".\"LIMIT_AMOUNT\" AS \"LIMIT_USAGE_RATE\" FROM \"FIN_DEMO\".\"DESK\" JOIN \"FIN_DEMO\".\"ST_POSITIONS\" ON \"FIN_DEMO\".\"DESK\".\"DESK_ID\" = \"FIN_DEMO\".\"ST_POSITIONS\".\"DESK_ID\" WHERE \"FIN_DEMO\".\"ST_POSITIONS\".\"BASE_DATE\" = (SELECT MAX(\"BASE_DATE\") FROM \"FIN_DEMO\".\"ST_POSITIONS\") GROUP BY \"FIN_DEMO\".\"DESK\".\"DESK_ID\", \"FIN_DEMO\".\"DESK\".\"DESK_NAME\", \"FIN_DEMO\".\"DESK\".\"LIMIT_AMOUNT\" HAVING SUM(\"FIN_DEMO\".\"ST_POSITIONS\".\"EXPOSURE_AMOUNT\") / \"FIN_DEMO\".\"DESK\".\"LIMIT_AMOUNT\" > 0.8",
     "result": {
      "columns": [
       "DESK_ID",
       "DESK_NAME",
       "LIMIT_AMOUNT",
       "LIMIT_USAGE_RATE"
      ],
      "rows": [
       [
        2,
        "주식2데스크",
        "13437000000",
        "0.859986"
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
