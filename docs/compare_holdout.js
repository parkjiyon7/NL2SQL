window.COMPARE = {
 "date": "2026-11-25",
 "preview_date": "2026-11-26",
 "n": 3,
 "seed": 20261125,
 "A": {
  "agent": "option_a_sql_agent",
  "ok": 54,
  "total": 60
 },
 "B": {
  "agent": "findemo_sql_agent",
  "ok": 46,
  "total": 60
 },
 "items": [
  {
   "id": "H-01",
   "question": "국고채 10년의 체결 건수와 체결대금 합계를 알려줘",
   "template": "q_product_exec",
   "golden_sql": "SELECT COUNT(*) AS CNT, SUM(e.EXEC_AMOUNT) AS AMT FROM FIN_DEMO.EXECUTIONS e JOIN FIN_DEMO.ORDERS o ON e.ORDER_ID = o.ORDER_ID JOIN FIN_DEMO.PRODUCT p ON o.PRODUCT_CODE = p.PRODUCT_CODE WHERE p.PRODUCT_NAME = '국고채 10년'",
   "golden_result": {
    "columns": [
     "CNT",
     "AMT"
    ],
    "rows": [
     [
      5,
      "146005150"
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(E.EXEC_ID) AS TRADE_COUNT,\n       SUM(E.EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE P.PRODUCT_NAME = '국고채 10년'",
     "result": {
      "columns": [
       "TRADE_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        5,
        "146005150"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS TRADE_COUNT,\n       SUM(EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE P.PRODUCT_NAME = '국고채 10년'",
     "result": {
      "columns": [
       "TRADE_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        5,
        "146005150"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(E.EXEC_ID) AS EXEC_COUNT, SUM(E.EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE P.PRODUCT_NAME = '국고채 10년'",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        5,
        "146005150"
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_ID\") AS \"EXECUTION_COUNT\",\n       SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"TOTAL_EXECUTION_AMOUNT\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\"\nJOIN \"FIN_DEMO\".\"ORDERS\"\n  ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"PRODUCT\"\n  ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\"\nWHERE \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" = '국고채 10년'",
     "result": {
      "columns": [
       "EXECUTION_COUNT",
       "TOTAL_EXECUTION_AMOUNT"
      ],
      "rows": [
       [
        5,
        "146005150"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"e\".\"EXEC_ID\") AS \"SETTLEMENT_COUNT\",\n       SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_SETTLEMENT_AMOUNT\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\"\nWHERE \"p\".\"PRODUCT_NAME\" = '국고채 10년'",
     "result": {
      "columns": [
       "SETTLEMENT_COUNT",
       "TOTAL_SETTLEMENT_AMOUNT"
      ],
      "rows": [
       [
        5,
        "146005150"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_ID\") AS \"EXECUTION_COUNT\",\n       SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_AMOUNT\") AS \"TOTAL_EXECUTION_AMOUNT\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\"\nJOIN \"FIN_DEMO\".\"ORDERS\"\n  ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"PRODUCT\"\n  ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\"\nWHERE \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\" = '국고채 10년'",
     "result": {
      "columns": [
       "EXECUTION_COUNT",
       "TOTAL_EXECUTION_AMOUNT"
      ],
      "rows": [
       [
        5,
        "146005150"
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-02",
   "question": "5월 체결 건수와 거래대금 합계를 알려줘",
   "template": "q_month_exec",
   "golden_sql": "SELECT COUNT(*) AS CNT, SUM(e.EXEC_AMOUNT) AS AMT FROM FIN_DEMO.EXECUTIONS e WHERE MONTH(e.EXEC_TS) = 5",
   "golden_result": {
    "columns": [
     "CNT",
     "AMT"
    ],
    "rows": [
     [
      11,
      "145922650"
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS EXEC_COUNT,\n       SUM(EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS\nWHERE MONTH(DATE(EXEC_TS)) = 5",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        11,
        "145922650"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS EXEC_COUNT, SUM(EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS\nWHERE MONTH(EXEC_TS) = 5",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        11,
        "145922650"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS EXEC_COUNT,\n       SUM(EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS\nWHERE MONTH(EXEC_TS) = 5",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        11,
        "145922650"
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"e\".\"EXEC_ID\") AS \"num_executions\",\n       SUM(\"e\".\"EXEC_AMOUNT\") AS \"total_transaction_amount\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\"\nWHERE MONTH(\"e\".\"EXEC_TS\") = 5",
     "result": {
      "columns": [
       "num_executions",
       "total_transaction_amount"
      ],
      "rows": [
       [
        11,
        "145922650"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"EXEC_ID\") AS \"NUMBER_OF_EXECUTIONS\",\n       SUM(\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\"\nWHERE YEAR(\"EXEC_TS\") = YEAR(CURRENT DATE)\n  AND MONTH(\"EXEC_TS\") = 5",
     "result": {
      "columns": [
       "NUMBER_OF_EXECUTIONS",
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        11,
        "145922650"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"EXEC_ID\") AS \"NUMBER_OF_EXECUTIONS\",\n       SUM(\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\"\nWHERE MONTH(\"EXEC_TS\") = 5",
     "result": {
      "columns": [
       "NUMBER_OF_EXECUTIONS",
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        11,
        "145922650"
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-03",
   "question": "우예은 고객의 계좌는 몇 개야?",
   "template": "q_cust_accounts",
   "golden_sql": "SELECT COUNT(*) AS CNT FROM FIN_DEMO.ACCOUNT a JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID WHERE c.CUSTOMER_NAME = '우예은'",
   "golden_result": {
    "columns": [
     "CNT"
    ],
    "rows": [
     [
      2
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(1) AS ACCOUNT_COUNT \nFROM FIN_DEMO.ACCOUNT A \nJOIN FIN_DEMO.CUSTOMER C \n  ON A.CUSTOMER_ID = C.CUSTOMER_ID \nWHERE C.CUSTOMER_NAME = '우예은'",
     "result": {
      "columns": [
       "ACCOUNT_COUNT"
      ],
      "rows": [
       [
        2
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS ACCOUNT_COUNT \nFROM FIN_DEMO.CUSTOMER C \nJOIN FIN_DEMO.ACCOUNT A ON C.CUSTOMER_ID = A.CUSTOMER_ID \nWHERE C.CUSTOMER_NAME = '우예은'",
     "result": {
      "columns": [
       "ACCOUNT_COUNT"
      ],
      "rows": [
       [
        2
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT C.CUSTOMER_NAME, COUNT(A.ACCOUNT_ID) AS ACCOUNT_COUNT\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.ACCOUNT A ON C.CUSTOMER_ID = A.CUSTOMER_ID\nWHERE C.CUSTOMER_NAME = '우예은'\nGROUP BY C.CUSTOMER_NAME",
     "result": {
      "columns": [
       "CUSTOMER_NAME",
       "ACCOUNT_COUNT"
      ],
      "rows": [
       [
        "우예은",
        2
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\", COUNT(\"a\".\"ACCOUNT_ID\") AS \"NUMBER_OF_ACCOUNTS\"\nFROM \"FIN_DEMO\".\"CUSTOMER\" \"c\"\nLEFT JOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"c\".\"CUSTOMER_ID\" = \"a\".\"CUSTOMER_ID\"\nWHERE \"c\".\"CUSTOMER_NAME\" = '우예은'\nGROUP BY \"c\".\"CUSTOMER_ID\", \"c\".\"CUSTOMER_NAME\"",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "NUMBER_OF_ACCOUNTS"
      ],
      "rows": [
       [
        26,
        "우예은",
        2
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"a\".\"ACCOUNT_ID\") AS \"NUMBER_OF_ACCOUNTS\"\nFROM \"FIN_DEMO\".\"CUSTOMER\" \"c\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\"\n  ON \"c\".\"CUSTOMER_ID\" = \"a\".\"CUSTOMER_ID\"\nWHERE \"c\".\"CUSTOMER_NAME\" = '우예은'",
     "result": {
      "columns": [
       "NUMBER_OF_ACCOUNTS"
      ],
      "rows": [
       [
        2
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"a\".\"ACCOUNT_ID\") AS \"NUMBER_OF_ACCOUNTS\"\nFROM \"FIN_DEMO\".\"CUSTOMER\" \"c\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"c\".\"CUSTOMER_ID\" = \"a\".\"CUSTOMER_ID\"\nWHERE \"c\".\"CUSTOMER_NAME\" = '우예은'",
     "result": {
      "columns": [
       "NUMBER_OF_ACCOUNTS"
      ],
      "rows": [
       [
        2
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-04",
   "question": "분당지점 고객들의 지정가 주문은 몇 건이야?",
   "template": "q_branch_limit_orders",
   "golden_sql": "SELECT COUNT(*) AS CNT FROM FIN_DEMO.ORDERS o JOIN FIN_DEMO.ACCOUNT a ON o.ACCOUNT_ID = a.ACCOUNT_ID JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID JOIN FIN_DEMO.BRANCH b ON c.BRANCH_CODE = b.BRANCH_CODE WHERE b.BRANCH_NAME = '분당지점' AND o.ORDER_TYPE = 'LIMIT'",
   "golden_result": {
    "columns": [
     "CNT"
    ],
    "rows": [
     [
      3
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS ORDER_COUNT\nFROM FIN_DEMO.ORDERS O\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE B.BRANCH_NAME = '분당지점' AND O.ORDER_TYPE = 'LIMIT'",
     "result": {
      "columns": [
       "ORDER_COUNT"
      ],
      "rows": [
       [
        3
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS ORDER_COUNT\nFROM FIN_DEMO.ORDERS O\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE B.BRANCH_NAME = '분당지점'\n  AND O.ORDER_TYPE = 'LIMIT'",
     "result": {
      "columns": [
       "ORDER_COUNT"
      ],
      "rows": [
       [
        3
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS ORDER_COUNT\nFROM FIN_DEMO.ORDERS O\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE B.BRANCH_NAME = '분당지점'\n  AND O.ORDER_TYPE = 'LIMIT'",
     "result": {
      "columns": [
       "ORDER_COUNT"
      ],
      "rows": [
       [
        3
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"o\".\"ORDER_ID\") AS \"NUMBER_OF_LIMIT_ORDERS\"\nFROM \"FIN_DEMO\".\"CUSTOMER\" \"c\"\nJOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"c\".\"CUSTOMER_ID\" = \"a\".\"CUSTOMER_ID\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"a\".\"ACCOUNT_ID\" = \"o\".\"ACCOUNT_ID\"\nWHERE \"b\".\"BRANCH_NAME\" = '분당지점'\n  AND \"o\".\"ORDER_TYPE\" = 'LIMIT'",
     "result": {
      "columns": [
       "NUMBER_OF_LIMIT_ORDERS"
      ],
      "rows": [
       [
        3
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"o\".\"ORDER_ID\") AS \"NUMBER_OF_ORDERS\"\nFROM \"FIN_DEMO\".\"CUSTOMER\" \"c\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"c\".\"CUSTOMER_ID\" = \"a\".\"CUSTOMER_ID\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"a\".\"ACCOUNT_ID\" = \"o\".\"ACCOUNT_ID\"\nJOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\"\nWHERE \"b\".\"BRANCH_NAME\" = '분당지점'\n  AND \"o\".\"ORDER_TYPE\" = 'LIMIT'",
     "result": {
      "columns": [
       "NUMBER_OF_ORDERS"
      ],
      "rows": [
       [
        3
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\") AS \"NUMBER_OF_ORDERS\"\nFROM \"FIN_DEMO\".\"CUSTOMER\"\nJOIN \"FIN_DEMO\".\"BRANCH\"\n  ON \"FIN_DEMO\".\"CUSTOMER\".\"BRANCH_CODE\" = \"FIN_DEMO\".\"BRANCH\".\"BRANCH_CODE\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\"\n  ON \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\"\nJOIN \"FIN_DEMO\".\"ORDERS\"\n  ON \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\"\nWHERE \"FIN_DEMO\".\"BRANCH\".\"BRANCH_NAME\" = '분당지점'\n  AND \"FIN_DEMO\".\"ORDERS\".\"ORDER_TYPE\" = 'LIMIT'",
     "result": {
      "columns": [
       "NUMBER_OF_ORDERS"
      ],
      "rows": [
       [
        3
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-05",
   "question": "총자산이 2억 원 이상인 고객은 몇 명이야?",
   "template": "q_assets_threshold",
   "golden_sql": "SELECT COUNT(*) AS CNT FROM FIN_DEMO.CUSTOMER WHERE TOTAL_ASSETS >= 200000000",
   "golden_result": {
    "columns": [
     "CNT"
    ],
    "rows": [
     [
      7
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS CUSTOMER_COUNT FROM FIN_DEMO.CUSTOMER WHERE TOTAL_ASSETS >= 200000000",
     "result": {
      "columns": [
       "CUSTOMER_COUNT"
      ],
      "rows": [
       [
        7
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS CUSTOMER_COUNT FROM FIN_DEMO.CUSTOMER WHERE TOTAL_ASSETS >= 200000000",
     "result": {
      "columns": [
       "CUSTOMER_COUNT"
      ],
      "rows": [
       [
        7
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS CUSTOMER_COUNT \nFROM FIN_DEMO.CUSTOMER C \nWHERE C.TOTAL_ASSETS >= 200000000",
     "result": {
      "columns": [
       "CUSTOMER_COUNT"
      ],
      "rows": [
       [
        7
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"CUSTOMER_ID\") AS \"NUMBER_OF_CUSTOMERS\"\nFROM \"FIN_DEMO\".\"CUSTOMER\"\nWHERE \"TOTAL_ASSETS\" >= 200000000",
     "result": {
      "columns": [
       "NUMBER_OF_CUSTOMERS"
      ],
      "rows": [
       [
        7
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"CUSTOMER_ID\") AS \"NUMBER_OF_CUSTOMERS\"\nFROM \"FIN_DEMO\".\"CUSTOMER\"\nWHERE \"TOTAL_ASSETS\" >= 200000000",
     "result": {
      "columns": [
       "NUMBER_OF_CUSTOMERS"
      ],
      "rows": [
       [
        7
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"CUSTOMER_ID\") AS \"NUMBER_OF_CUSTOMERS\"\nFROM \"FIN_DEMO\".\"CUSTOMER\"\nWHERE \"TOTAL_ASSETS\" >= 200000000",
     "result": {
      "columns": [
       "NUMBER_OF_CUSTOMERS"
      ],
      "rows": [
       [
        7
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-06",
   "question": "코스닥 종목은 몇 개야?",
   "template": "q_market_count",
   "golden_sql": "SELECT COUNT(*) AS CNT FROM FIN_DEMO.PRODUCT WHERE MARKET = 'KOSDAQ'",
   "golden_result": {
    "columns": [
     "CNT"
    ],
    "rows": [
     [
      9
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS COUNT FROM FIN_DEMO.PRODUCT P WHERE P.MARKET = 'KOSDAQ'",
     "result": {
      "columns": [
       "COUNT"
      ],
      "rows": [
       [
        9
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS KOSDAQ_COUNT FROM FIN_DEMO.PRODUCT WHERE MARKET = 'KOSDAQ'",
     "result": {
      "columns": [
       "KOSDAQ_COUNT"
      ],
      "rows": [
       [
        9
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS KOSDAQ_COUNT FROM FIN_DEMO.PRODUCT WHERE MARKET = 'KOSDAQ'",
     "result": {
      "columns": [
       "KOSDAQ_COUNT"
      ],
      "rows": [
       [
        9
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"PRODUCT_CODE\") AS \"KOSDAQ_PRODUCT_COUNT\"\nFROM \"FIN_DEMO\".\"PRODUCT\"\nWHERE \"MARKET\" = 'KOSDAQ'",
     "result": {
      "columns": [
       "KOSDAQ_PRODUCT_COUNT"
      ],
      "rows": [
       [
        9
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS KOSDAQ_STOCK_COUNT FROM \"FIN_DEMO\".\"PRODUCT\" WHERE \"MARKET\" = 'KOSDAQ'",
     "result": {
      "columns": [
       "KOSDAQ_STOCK_COUNT"
      ],
      "rows": [
       [
        9
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS \"KOSDAQ_STOCKS_COUNT\"\nFROM \"FIN_DEMO\".\"PRODUCT\"\nWHERE \"MARKET\" = 'KOSDAQ'",
     "result": {
      "columns": [
       "KOSDAQ_STOCKS_COUNT"
      ],
      "rows": [
       [
        9
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-07",
   "question": "이번 달 분당지점 체결 건수는 몇 건이야?",
   "template": "q_month_current",
   "golden_sql": "SELECT COUNT(*) AS CNT FROM FIN_DEMO.EXECUTIONS e JOIN FIN_DEMO.ORDERS o ON e.ORDER_ID = o.ORDER_ID JOIN FIN_DEMO.ACCOUNT a ON o.ACCOUNT_ID = a.ACCOUNT_ID JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID JOIN FIN_DEMO.BRANCH b ON c.BRANCH_CODE = b.BRANCH_CODE WHERE b.BRANCH_NAME = '분당지점' AND YEAR(e.EXEC_TS) = YEAR(CURRENT DATE) AND MONTH(e.EXEC_TS) = MONTH(CURRENT DATE)",
   "golden_result": {
    "columns": [
     "CNT"
    ],
    "rows": [
     [
      1
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": false,
     "status": "불일치(1행/정답 1행)",
     "sql": "SELECT COUNT(*) AS EXEC_COUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE YEAR(DATE(E.EXEC_TS)) = YEAR(CURRENT DATE)\n  AND MONTH(DATE(E.EXEC_TS)) = MONTH(CURRENT DATE)\n  AND B.BRANCH_NAME = '분당'",
     "result": {
      "columns": [
       "EXEC_COUNT"
      ],
      "rows": [
       [
        0
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS EXEC_COUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE YEAR(DATE(E.EXEC_TS)) = YEAR(CURRENT DATE)\n  AND MONTH(DATE(E.EXEC_TS)) = MONTH(CURRENT DATE)\n  AND B.BRANCH_NAME = '분당지점'",
     "result": {
      "columns": [
       "EXEC_COUNT"
      ],
      "rows": [
       [
        1
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS EXEC_COUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE YEAR(DATE(E.EXEC_TS)) = YEAR(CURRENT DATE)\n  AND MONTH(DATE(E.EXEC_TS)) = MONTH(CURRENT DATE)\n  AND B.BRANCH_NAME = '분당지점'",
     "result": {
      "columns": [
       "EXEC_COUNT"
      ],
      "rows": [
       [
        1
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"e\".\"EXEC_ID\") AS \"execution_count\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\"\nJOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\"\nJOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\"\nWHERE \"b\".\"BRANCH_NAME\" = '분당지점'\n  AND YEAR(\"e\".\"EXEC_TS\") = YEAR(CURRENT DATE)\n  AND MONTH(\"e\".\"EXEC_TS\") = MONTH(CURRENT DATE)",
     "result": {
      "columns": [
       "execution_count"
      ],
      "rows": [
       [
        1
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"e\".\"EXEC_ID\") AS \"execution_count\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\"\nJOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\"\nJOIN \"FIN_DEMO\".\"BRANCH\" \"b\" ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\"\nWHERE \"b\".\"BRANCH_NAME\" = '분당지점'\n  AND YEAR(\"e\".\"EXEC_TS\") = YEAR(CURRENT DATE)\n  AND MONTH(\"e\".\"EXEC_TS\") = MONTH(CURRENT DATE)",
     "result": {
      "columns": [
       "execution_count"
      ],
      "rows": [
       [
        1
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_ID\") AS \"EXECUTION_COUNT\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\"\nJOIN \"FIN_DEMO\".\"ORDERS\" ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\" ON \"FIN_DEMO\".\"ORDERS\".\"ACCOUNT_ID\" = \"FIN_DEMO\".\"ACCOUNT\".\"ACCOUNT_ID\"\nJOIN \"FIN_DEMO\".\"CUSTOMER\" ON \"FIN_DEMO\".\"ACCOUNT\".\"CUSTOMER_ID\" = \"FIN_DEMO\".\"CUSTOMER\".\"CUSTOMER_ID\"\nJOIN \"FIN_DEMO\".\"BRANCH\" ON \"FIN_DEMO\".\"CUSTOMER\".\"BRANCH_CODE\" = \"FIN_DEMO\".\"BRANCH\".\"BRANCH_CODE\"\nWHERE \"FIN_DEMO\".\"BRANCH\".\"BRANCH_NAME\" = '분당지점'\n  AND YEAR(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = YEAR(CURRENT DATE)\n  AND MONTH(\"FIN_DEMO\".\"EXECUTIONS\".\"EXEC_TS\") = MONTH(CURRENT DATE)",
     "result": {
      "columns": [
       "EXECUTION_COUNT"
      ],
      "rows": [
       [
        1
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-08",
   "question": "신용융자 계좌를 가진 고객은 몇 명이야?",
   "template": "q_credit_customers",
   "golden_sql": "SELECT COUNT(DISTINCT CUSTOMER_ID) AS CNT FROM FIN_DEMO.ACCOUNT WHERE CREDIT_LOAN_YN = 'Y'",
   "golden_result": {
    "columns": [
     "CNT"
    ],
    "rows": [
     [
      8
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(DISTINCT A.CUSTOMER_ID) AS CUSTOMER_COUNT \nFROM FIN_DEMO.ACCOUNT A \nWHERE A.CREDIT_LOAN_YN = 'Y'",
     "result": {
      "columns": [
       "CUSTOMER_COUNT"
      ],
      "rows": [
       [
        8
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(DISTINCT A.CUSTOMER_ID) AS CREDIT_LOAN_CUSTOMER_COUNT\nFROM FIN_DEMO.ACCOUNT A\nWHERE A.CREDIT_LOAN_YN = 'Y'",
     "result": {
      "columns": [
       "CREDIT_LOAN_CUSTOMER_COUNT"
      ],
      "rows": [
       [
        8
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(DISTINCT A.CUSTOMER_ID) AS CREDIT_LOAN_CUSTOMER_COUNT\nFROM FIN_DEMO.ACCOUNT A\nWHERE A.CREDIT_LOAN_YN = 'Y'",
     "result": {
      "columns": [
       "CREDIT_LOAN_CUSTOMER_COUNT"
      ],
      "rows": [
       [
        8
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(DISTINCT \"c\".\"CUSTOMER_ID\") AS \"number_of_customers\"\nFROM \"FIN_DEMO\".\"ACCOUNT\" \"a\"\nJOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\"\nWHERE \"a\".\"CREDIT_LOAN_YN\" = 'Y'",
     "result": {
      "columns": [
       "number_of_customers"
      ],
      "rows": [
       [
        8
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(DISTINCT \"c\".\"CUSTOMER_ID\") AS \"number_of_customers\"\nFROM \"FIN_DEMO\".\"ACCOUNT\" \"a\"\nJOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\"\nWHERE \"a\".\"CREDIT_LOAN_YN\" = 'Y'",
     "result": {
      "columns": [
       "number_of_customers"
      ],
      "rows": [
       [
        8
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(DISTINCT \"c\".\"CUSTOMER_ID\") AS \"number_of_customers\"\nFROM \"FIN_DEMO\".\"ACCOUNT\" \"a\"\nJOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\"\nWHERE \"a\".\"CREDIT_LOAN_YN\" = 'Y'",
     "result": {
      "columns": [
       "number_of_customers"
      ],
      "rows": [
       [
        8
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-09",
   "question": "카카오 매수 체결대금 합계를 알려줘",
   "template": "q_buy_amount",
   "golden_sql": "SELECT SUM(e.EXEC_AMOUNT) AS AMT FROM FIN_DEMO.EXECUTIONS e JOIN FIN_DEMO.ORDERS o ON e.ORDER_ID = o.ORDER_ID JOIN FIN_DEMO.PRODUCT p ON o.PRODUCT_CODE = p.PRODUCT_CODE WHERE p.PRODUCT_NAME = '카카오' AND o.SIDE = 'BUY'",
   "golden_result": {
    "columns": [
     "AMT"
    ],
    "rows": [
     [
      "64855810"
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(EXECUTIONS.EXEC_AMOUNT) AS TOTAL_BUY_AMOUNT\nFROM FIN_DEMO.EXECUTIONS EXECUTIONS\nJOIN FIN_DEMO.ORDERS ORDERS ON EXECUTIONS.ORDER_ID = ORDERS.ORDER_ID\nJOIN FIN_DEMO.PRODUCT PRODUCT ON ORDERS.PRODUCT_CODE = PRODUCT.PRODUCT_CODE\nWHERE ORDERS.SIDE = 'BUY'\n  AND PRODUCT.PRODUCT_NAME = '카카오'",
     "result": {
      "columns": [
       "TOTAL_BUY_AMOUNT"
      ],
      "rows": [
       [
        "64855810"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(EX.EXEC_AMOUNT) AS TOTAL_BUY_AMOUNT\nFROM FIN_DEMO.EXECUTIONS EX\nJOIN FIN_DEMO.ORDERS O ON EX.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE O.SIDE = 'BUY'\n  AND P.PRODUCT_NAME = '카카오'",
     "result": {
      "columns": [
       "TOTAL_BUY_AMOUNT"
      ],
      "rows": [
       [
        "64855810"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(E.EXEC_AMOUNT) AS TOTAL_BUY_EXEC_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE O.SIDE = 'BUY'\n  AND P.PRODUCT_NAME = '카카오'",
     "result": {
      "columns": [
       "TOTAL_BUY_EXEC_AMOUNT"
      ],
      "rows": [
       [
        "64855810"
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": false,
     "status": "불일치(1행/정답 1행)",
     "sql": "SELECT SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\"\nWHERE \"o\".\"SIDE\" = 'BUY' AND \"p\".\"PRODUCT_NAME\" = 'Kakao'",
     "result": {
      "columns": [
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        null
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(\"e\".\"EXEC_AMOUNT\") AS \"total_execution_amount\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\"\nWHERE \"p\".\"PRODUCT_NAME\" = '카카오' \n  AND \"o\".\"SIDE\" = 'BUY'",
     "result": {
      "columns": [
       "total_execution_amount"
      ],
      "rows": [
       [
        "64855810"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(\"e\".\"EXEC_AMOUNT\") AS \"TOTAL_TRANSACTION_AMOUNT\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\"\nWHERE \"o\".\"SIDE\" = 'BUY' \n  AND \"p\".\"PRODUCT_NAME\" = '카카오'",
     "result": {
      "columns": [
       "TOTAL_TRANSACTION_AMOUNT"
      ],
      "rows": [
       [
        "64855810"
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-10",
   "question": "분당지점 고객들의 총자산 합계는 얼마야?",
   "template": "q_branch_assets",
   "golden_sql": "SELECT SUM(c.TOTAL_ASSETS) AS TA FROM FIN_DEMO.CUSTOMER c JOIN FIN_DEMO.BRANCH b ON c.BRANCH_CODE = b.BRANCH_CODE WHERE b.BRANCH_NAME = '분당지점'",
   "golden_result": {
    "columns": [
     "TA"
    ],
    "rows": [
     [
      "2466320000"
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(C.TOTAL_ASSETS) AS TOTAL_ASSETS_SUM\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE B.BRANCH_NAME = '분당지점'",
     "result": {
      "columns": [
       "TOTAL_ASSETS_SUM"
      ],
      "rows": [
       [
        "2466320000"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(C.TOTAL_ASSETS) AS TOTAL_ASSETS_SUM\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE B.BRANCH_NAME = '분당지점'",
     "result": {
      "columns": [
       "TOTAL_ASSETS_SUM"
      ],
      "rows": [
       [
        "2466320000"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(C.TOTAL_ASSETS) AS TOTAL_ASSETS_SUM\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE B.BRANCH_NAME = '분당지점'",
     "result": {
      "columns": [
       "TOTAL_ASSETS_SUM"
      ],
      "rows": [
       [
        "2466320000"
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(\"c\".\"TOTAL_ASSETS\") AS \"total_assets\"\nFROM \"FIN_DEMO\".\"CUSTOMER\" \"c\"\nJOIN \"FIN_DEMO\".\"BRANCH\" \"b\"\n  ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\"\nWHERE \"b\".\"BRANCH_NAME\" = '분당지점'",
     "result": {
      "columns": [
       "total_assets"
      ],
      "rows": [
       [
        "2466320000"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(\"c\".\"TOTAL_ASSETS\") AS \"total_assets\"\nFROM \"FIN_DEMO\".\"CUSTOMER\" \"c\"\nJOIN \"FIN_DEMO\".\"BRANCH\" \"b\"\n  ON \"c\".\"BRANCH_CODE\" = \"b\".\"BRANCH_CODE\"\nWHERE \"b\".\"BRANCH_NAME\" = '분당지점'",
     "result": {
      "columns": [
       "total_assets"
      ],
      "rows": [
       [
        "2466320000"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(\"FIN_DEMO\".\"CUSTOMER\".\"TOTAL_ASSETS\") AS \"TOTAL_ASSETS_SUM\"\nFROM \"FIN_DEMO\".\"CUSTOMER\"\nWHERE \"FIN_DEMO\".\"CUSTOMER\".\"BRANCH_CODE\" IN (\n    SELECT \"FIN_DEMO\".\"BRANCH\".\"BRANCH_CODE\"\n    FROM \"FIN_DEMO\".\"BRANCH\"\n    WHERE \"FIN_DEMO\".\"BRANCH\".\"BRANCH_NAME\" = '분당지점'\n)",
     "result": {
      "columns": [
       "TOTAL_ASSETS_SUM"
      ],
      "rows": [
       [
        "2466320000"
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-11",
   "question": "2025년 1월 1일 이후에 개설된 계좌는 몇 개야?",
   "template": "q_open_year",
   "golden_sql": "SELECT COUNT(*) AS CNT FROM FIN_DEMO.ACCOUNT WHERE OPEN_DATE >= DATE('2025-01-01')",
   "golden_result": {
    "columns": [
     "CNT"
    ],
    "rows": [
     [
      37
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS ACCOUNT_COUNT FROM FIN_DEMO.ACCOUNT WHERE OPEN_DATE > DATE('2025-01-01')",
     "result": {
      "columns": [
       "ACCOUNT_COUNT"
      ],
      "rows": [
       [
        37
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS ACCOUNT_COUNT \nFROM FIN_DEMO.ACCOUNT \nWHERE OPEN_DATE > DATE('2025-01-01')",
     "result": {
      "columns": [
       "ACCOUNT_COUNT"
      ],
      "rows": [
       [
        37
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS ACCOUNT_COUNT\nFROM FIN_DEMO.ACCOUNT\nWHERE OPEN_DATE > DATE('2025-01-01')",
     "result": {
      "columns": [
       "ACCOUNT_COUNT"
      ],
      "rows": [
       [
        37
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"ACCOUNT_ID\") AS \"NUMBER_OF_ACCOUNTS\"\nFROM \"FIN_DEMO\".\"ACCOUNT\"\nWHERE \"OPEN_DATE\" > DATE '2025-01-01'",
     "result": {
      "columns": [
       "NUMBER_OF_ACCOUNTS"
      ],
      "rows": [
       [
        37
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"ACCOUNT_ID\") AS number_of_accounts \nFROM \"FIN_DEMO\".\"ACCOUNT\" \nWHERE \"OPEN_DATE\" > DATE '2025-01-01'",
     "result": {
      "columns": [
       "NUMBER_OF_ACCOUNTS"
      ],
      "rows": [
       [
        37
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"ACCOUNT_ID\") AS \"NUMBER_OF_ACCOUNTS\"\nFROM \"FIN_DEMO\".\"ACCOUNT\"\nWHERE \"OPEN_DATE\" > DATE '2025-01-01'",
     "result": {
      "columns": [
       "NUMBER_OF_ACCOUNTS"
      ],
      "rows": [
       [
        37
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-12",
   "question": "채권데스크의 한도와 담당 트레이더가 누구야?",
   "template": "q_desk_limit",
   "golden_sql": "SELECT LIMIT_AMOUNT, TRADER_NAME FROM FIN_DEMO.DESK WHERE DESK_NAME = '채권데스크'",
   "golden_result": {
    "columns": [
     "LIMIT_AMOUNT",
     "TRADER_NAME"
    ],
    "rows": [
     [
      "21087000000",
      "최트레이더"
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT DESK.LIMIT_AMOUNT AS LIMIT_AMOUNT, DESK.TRADER_NAME AS TRADER_NAME \nFROM FIN_DEMO.DESK DESK \nWHERE DESK.DESK_NAME = '채권데스크'",
     "result": {
      "columns": [
       "LIMIT_AMOUNT",
       "TRADER_NAME"
      ],
      "rows": [
       [
        "21087000000",
        "최트레이더"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT D.DESK_NAME, D.LIMIT_AMOUNT, D.TRADER_NAME \nFROM FIN_DEMO.DESK D \nWHERE D.DESK_NAME = '채권데스크'",
     "result": {
      "columns": [
       "DESK_NAME",
       "LIMIT_AMOUNT",
       "TRADER_NAME"
      ],
      "rows": [
       [
        "채권데스크",
        "21087000000",
        "최트레이더"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT D.DESK_NAME, D.LIMIT_AMOUNT, D.TRADER_NAME \nFROM FIN_DEMO.DESK D \nWHERE D.DESK_NAME = '채권데스크'",
     "result": {
      "columns": [
       "DESK_NAME",
       "LIMIT_AMOUNT",
       "TRADER_NAME"
      ],
      "rows": [
       [
        "채권데스크",
        "21087000000",
        "최트레이더"
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT \"LIMIT_AMOUNT\", \"TRADER_NAME\"\nFROM \"FIN_DEMO\".\"DESK\"\nWHERE \"DESK_NAME\" = '채권데스크'",
     "result": {
      "columns": [
       "LIMIT_AMOUNT",
       "TRADER_NAME"
      ],
      "rows": [
       [
        "21087000000",
        "최트레이더"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT \"LIMIT_AMOUNT\", \"TRADER_NAME\"\nFROM \"FIN_DEMO\".\"DESK\"\nWHERE \"DESK_NAME\" = '채권데스크'",
     "result": {
      "columns": [
       "LIMIT_AMOUNT",
       "TRADER_NAME"
      ],
      "rows": [
       [
        "21087000000",
        "최트레이더"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": false,
     "status": "실행오류 4N  \"FIN_DEMO.BOND_DESK_INFO\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204",
     "sql": "SELECT DESK_NAME AS \"데스크명\",\n       LIMIT_AMOUNT AS \"한도\",\n       TRADER_NAME AS \"담당 트레이더\"\nFROM FIN_DEMO.BOND_DESK_INFO\nWHERE DESK_NAME = '채권데스크'",
     "error": "[IBM][CLI Driver][DB2/LINUXX8664] SQL0204N  \"FIN_DEMO.BOND_DESK_INFO\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204"
    }
   ]
  },
  {
   "id": "H-13",
   "question": "HLB 매도 주문은 총 몇 건이야?",
   "template": "q_product_sell_orders",
   "golden_sql": "SELECT COUNT(*) AS CNT FROM FIN_DEMO.ORDERS o JOIN FIN_DEMO.PRODUCT p ON o.PRODUCT_CODE = p.PRODUCT_CODE WHERE p.PRODUCT_NAME = 'HLB' AND o.SIDE = 'SELL'",
   "golden_result": {
    "columns": [
     "CNT"
    ],
    "rows": [
     [
      3
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": false,
     "status": "생성실패 답변에 SQL 코드 블록이 없다",
     "sql": "__ERR__ 답변에 SQL 코드 블록이 없다"
    },
    {
     "pass": false,
     "status": "생성실패 답변에 SQL 코드 블록이 없다",
     "sql": "__ERR__ 답변에 SQL 코드 블록이 없다"
    },
    {
     "pass": false,
     "status": "불일치(1행/정답 1행)",
     "sql": "SELECT COUNT(*) AS TOTAL_SELL_ORDERS \nFROM FIN_DEMO.ORDERS O \nWHERE O.SIDE = 'SELL' \n  AND O.PRODUCT_CODE = 'HLB'",
     "result": {
      "columns": [
       "TOTAL_SELL_ORDERS"
      ],
      "rows": [
       [
        0
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": false,
     "status": "불일치(1행/정답 1행)",
     "sql": "SELECT COUNT(*) AS TOTAL_SELL_ORDERS FROM \"FIN_DEMO\".\"ORDERS\" WHERE \"SIDE\" = 'SELL'",
     "result": {
      "columns": [
       "TOTAL_SELL_ORDERS"
      ],
      "rows": [
       [
        88
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": false,
     "status": "불일치(1행/정답 1행)",
     "sql": "SELECT COUNT(*) AS TOTAL_ORDERS \nFROM \"FIN_DEMO\".\"ORDERS\" \nWHERE \"SIDE\" = 'SELL' \n  AND \"PRODUCT_CODE\" = 'HLB'",
     "result": {
      "columns": [
       "TOTAL_ORDERS"
      ],
      "rows": [
       [
        0
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"o\".\"ORDER_ID\") AS total_orders \nFROM \"FIN_DEMO\".\"ORDERS\" \"o\" \nJOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" \n  ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\" \nWHERE \"o\".\"SIDE\" = 'SELL' \n  AND \"p\".\"PRODUCT_NAME\" = 'HLB'",
     "result": {
      "columns": [
       "TOTAL_ORDERS"
      ],
      "rows": [
       [
        3
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-14",
   "question": "신예은 고객의 가장 최근 기준일 예수금 합계는 얼마야?",
   "template": "q_cust_cash",
   "golden_sql": "SELECT SUM(bd.CASH_BALANCE) AS CASH FROM FIN_DEMO.BALANCE_DAILY bd JOIN FIN_DEMO.ACCOUNT a ON bd.ACCOUNT_ID = a.ACCOUNT_ID JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID WHERE c.CUSTOMER_NAME = '신예은' AND bd.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)",
   "golden_result": {
    "columns": [
     "CASH"
    ],
    "rows": [
     [
      "103005096"
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(BD.CASH_BALANCE) AS TOTAL_CASH\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.ACCOUNT A ON C.CUSTOMER_ID = A.CUSTOMER_ID\nJOIN FIN_DEMO.BALANCE_DAILY BD ON A.ACCOUNT_ID = BD.ACCOUNT_ID\nWHERE C.CUSTOMER_NAME = '신예은'\n  AND BD.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)",
     "result": {
      "columns": [
       "TOTAL_CASH"
      ],
      "rows": [
       [
        "103005096"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "WITH LATEST AS (SELECT MAX(BASE_DATE) AS MAX_DATE FROM FIN_DEMO.BALANCE_DAILY)\nSELECT C.CUSTOMER_NAME AS 고객명, SUM(B.CASH_BALANCE) AS 예수금합계\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.ACCOUNT A ON C.CUSTOMER_ID = A.CUSTOMER_ID\nJOIN FIN_DEMO.BALANCE_DAILY B ON A.ACCOUNT_ID = B.ACCOUNT_ID\nJOIN LATEST L ON B.BASE_DATE = L.MAX_DATE\nWHERE C.CUSTOMER_NAME = '신예은'\nGROUP BY C.CUSTOMER_NAME",
     "result": {
      "columns": [
       "고객명",
       "예수금합계"
      ],
      "rows": [
       [
        "신예은",
        "103005096"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(BD.CASH_BALANCE) AS TOTAL_CASH\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.ACCOUNT A ON C.CUSTOMER_ID = A.CUSTOMER_ID\nJOIN FIN_DEMO.BALANCE_DAILY BD ON A.ACCOUNT_ID = BD.ACCOUNT_ID\nWHERE C.CUSTOMER_NAME = '신예은'\n  AND BD.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)",
     "result": {
      "columns": [
       "TOTAL_CASH"
      ],
      "rows": [
       [
        "103005096"
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(\"bd\".\"CASH_BALANCE\") AS \"total_cash_balance\"\nFROM \"FIN_DEMO\".\"BALANCE_DAILY\" \"bd\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"bd\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\"\nJOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\"\nWHERE \"c\".\"CUSTOMER_NAME\" = '신예은'\n  AND \"bd\".\"BASE_DATE\" = (\n      SELECT MAX(\"BASE_DATE\")\n      FROM \"FIN_DEMO\".\"BALANCE_DAILY\"\n  )",
     "result": {
      "columns": [
       "total_cash_balance"
      ],
      "rows": [
       [
        "103005096"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(\"bd\".\"CASH_BALANCE\") AS \"total_cash_balance\"\nFROM \"FIN_DEMO\".\"BALANCE_DAILY\" \"bd\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"bd\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\"\nJOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\"\nWHERE \"c\".\"CUSTOMER_NAME\" = '신예은'\n  AND \"bd\".\"BASE_DATE\" = (\n    SELECT MAX(\"BASE_DATE\")\n    FROM \"FIN_DEMO\".\"BALANCE_DAILY\"\n  )",
     "result": {
      "columns": [
       "total_cash_balance"
      ],
      "rows": [
       [
        "103005096"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(\"bd\".\"CASH_BALANCE\") AS \"total_cash_balance\"\nFROM \"FIN_DEMO\".\"BALANCE_DAILY\" \"bd\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"bd\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\"\nJOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\"\nWHERE \"c\".\"CUSTOMER_NAME\" = '신예은'\n  AND \"bd\".\"BASE_DATE\" = (\n      SELECT MAX(\"BASE_DATE\")\n      FROM \"FIN_DEMO\".\"BALANCE_DAILY\"\n  )",
     "result": {
      "columns": [
       "total_cash_balance"
      ],
      "rows": [
       [
        "103005096"
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-15",
   "question": "부산지점 고객의 체결되지 않은 주문은 몇 건이야?",
   "template": "q_unexecuted_branch",
   "golden_sql": "SELECT COUNT(*) AS CNT FROM FIN_DEMO.ORDERS o JOIN FIN_DEMO.ACCOUNT a ON o.ACCOUNT_ID = a.ACCOUNT_ID JOIN FIN_DEMO.CUSTOMER c ON a.CUSTOMER_ID = c.CUSTOMER_ID JOIN FIN_DEMO.BRANCH b ON c.BRANCH_CODE = b.BRANCH_CODE WHERE b.BRANCH_NAME = '부산지점' AND NOT EXISTS (SELECT 1 FROM FIN_DEMO.EXECUTIONS e WHERE e.ORDER_ID = o.ORDER_ID)",
   "golden_result": {
    "columns": [
     "CNT"
    ],
    "rows": [
     [
      4
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS UNFILLED_ORDER_COUNT\nFROM FIN_DEMO.ORDERS O\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nLEFT JOIN FIN_DEMO.EXECUTIONS E ON O.ORDER_ID = E.ORDER_ID\nWHERE B.BRANCH_NAME = '부산지점' AND E.ORDER_ID IS NULL",
     "result": {
      "columns": [
       "UNFILLED_ORDER_COUNT"
      ],
      "rows": [
       [
        4
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS UNFILLED_ORDER_COUNT\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nJOIN FIN_DEMO.ACCOUNT A ON C.CUSTOMER_ID = A.CUSTOMER_ID\nJOIN FIN_DEMO.ORDERS O ON A.ACCOUNT_ID = O.ACCOUNT_ID\nLEFT JOIN FIN_DEMO.EXECUTIONS E ON O.ORDER_ID = E.ORDER_ID\nWHERE B.BRANCH_NAME = '부산지점' AND E.ORDER_ID IS NULL",
     "result": {
      "columns": [
       "UNFILLED_ORDER_COUNT"
      ],
      "rows": [
       [
        4
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS UNFILLED_ORDER_COUNT\nFROM FIN_DEMO.ORDERS O\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE B.BRANCH_NAME = '부산지점'\n  AND NOT EXISTS (\n        SELECT 1\n        FROM FIN_DEMO.EXECUTIONS E\n        WHERE E.ORDER_ID = O.ORDER_ID\n      )",
     "result": {
      "columns": [
       "UNFILLED_ORDER_COUNT"
      ],
      "rows": [
       [
        4
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": false,
     "status": "불일치(1행/정답 1행)",
     "sql": "SELECT COUNT(\"o\".\"ORDER_ID\") AS \"UNFILLED_ORDERS\"\nFROM \"FIN_DEMO\".\"ORDERS\" \"o\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"o\".\"ACCOUNT_ID\" = \"a\".\"ACCOUNT_ID\"\nJOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"a\".\"CUSTOMER_ID\" = \"c\".\"CUSTOMER_ID\"\nWHERE \"c\".\"BRANCH_CODE\" = '부산지점'\n  AND NOT EXISTS (\n    SELECT 1\n    FROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\"\n    WHERE \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\"\n  )",
     "result": {
      "columns": [
       "UNFILLED_ORDERS"
      ],
      "rows": [
       [
        0
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": false,
     "status": "실행오류 ] SQL0204N  \"9DDBC44B.ORDERS\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204",
     "sql": "SELECT COUNT(*) AS 미체결_주문_건수\nFROM ORDERS O\nJOIN CUSTOMERS C ON O.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN BRANCHES B ON C.BRANCH_ID = B.BRANCH_ID\nWHERE B.BRANCH_NAME = '부산지점'\n  AND O.ORDER_STATUS <> '체결'",
     "error": "[IBM][CLI Driver][DB2/LINUXX8664] SQL0204N  \"9DDBC44B.ORDERS\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204"
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(\"o\".\"ORDER_ID\") AS \"UNEXECUTED_ORDERS\"\nFROM \"FIN_DEMO\".\"BRANCH\" \"b\"\nJOIN \"FIN_DEMO\".\"CUSTOMER\" \"c\" ON \"b\".\"BRANCH_CODE\" = \"c\".\"BRANCH_CODE\"\nJOIN \"FIN_DEMO\".\"ACCOUNT\" \"a\" ON \"c\".\"CUSTOMER_ID\" = \"a\".\"CUSTOMER_ID\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"a\".\"ACCOUNT_ID\" = \"o\".\"ACCOUNT_ID\"\nLEFT JOIN \"FIN_DEMO\".\"EXECUTIONS\" \"e\" ON \"o\".\"ORDER_ID\" = \"e\".\"ORDER_ID\"\nWHERE \"b\".\"BRANCH_NAME\" = '부산지점'\n  AND \"e\".\"ORDER_ID\" IS NULL",
     "result": {
      "columns": [
       "UNEXECUTED_ORDERS"
      ],
      "rows": [
       [
        4
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-16",
   "question": "카카오게임즈 체결 수수료 합계는 얼마야?",
   "template": "q_fee",
   "golden_sql": "SELECT SUM(e.FEE) AS FEE_SUM FROM FIN_DEMO.EXECUTIONS e JOIN FIN_DEMO.ORDERS o ON e.ORDER_ID = o.ORDER_ID JOIN FIN_DEMO.PRODUCT p ON o.PRODUCT_CODE = p.PRODUCT_CODE WHERE p.PRODUCT_NAME = '카카오게임즈'",
   "golden_result": {
    "columns": [
     "FEE_SUM"
    ],
    "rows": [
     [
      "23081.18"
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(E.FEE) AS TOTAL_FEE\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE P.PRODUCT_NAME = '카카오게임즈'",
     "result": {
      "columns": [
       "TOTAL_FEE"
      ],
      "rows": [
       [
        "23081.18"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": false,
     "status": "불일치(1행/정답 1행)",
     "sql": "SELECT SUM(EXE.FEE) AS TOTAL_FEE\nFROM FIN_DEMO.EXECUTIONS EXE\nJOIN FIN_DEMO.ORDERS ORD ON EXE.ORDER_ID = ORD.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT ACC ON ORD.ACCOUNT_ID = ACC.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER CUS ON ACC.CUSTOMER_ID = CUS.CUSTOMER_ID\nWHERE CUS.CUSTOMER_NAME = '카카오게임즈'",
     "result": {
      "columns": [
       "TOTAL_FEE"
      ],
      "rows": [
       [
        null
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(E.FEE) AS TOTAL_FEE\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE P.PRODUCT_NAME = '카카오게임즈'",
     "result": {
      "columns": [
       "TOTAL_FEE"
      ],
      "rows": [
       [
        "23081.18"
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(\"e\".\"FEE\") AS \"total_execution_fee\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\"\nWHERE LOWER(\"p\".\"PRODUCT_NAME\") LIKE LOWER('%카카오게임즈%')",
     "result": {
      "columns": [
       "total_execution_fee"
      ],
      "rows": [
       [
        "23081.18"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(\"e\".\"FEE\") AS \"total_fee\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\"\nWHERE LOWER(\"p\".\"PRODUCT_NAME\") LIKE LOWER('%카카오게임즈%')",
     "result": {
      "columns": [
       "total_fee"
      ],
      "rows": [
       [
        "23081.18"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT SUM(\"e\".\"FEE\") AS \"total_execution_fee\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\" \"e\"\nJOIN \"FIN_DEMO\".\"ORDERS\" \"o\" ON \"e\".\"ORDER_ID\" = \"o\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"PRODUCT\" \"p\" ON \"o\".\"PRODUCT_CODE\" = \"p\".\"PRODUCT_CODE\"\nWHERE LOWER(\"p\".\"PRODUCT_NAME\") LIKE LOWER('%카카오게임즈%')",
     "result": {
      "columns": [
       "total_execution_fee"
      ],
      "rows": [
       [
        "23081.18"
       ]
      ],
      "row_count": 1
     }
    }
   ]
  },
  {
   "id": "H-17",
   "question": "연금 계좌는 몇 개야?",
   "template": "q_acct_type",
   "golden_sql": "SELECT COUNT(*) AS CNT FROM FIN_DEMO.ACCOUNT WHERE ACCOUNT_TYPE = 'PENSION'",
   "golden_result": {
    "columns": [
     "CNT"
    ],
    "rows": [
     [
      7
     ]
    ],
    "row_count": 1
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS ACCOUNT_COUNT FROM FIN_DEMO.ACCOUNT WHERE ACCOUNT_TYPE = 'PENSION'",
     "result": {
      "columns": [
       "ACCOUNT_COUNT"
      ],
      "rows": [
       [
        7
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS PENSION_ACCOUNT_COUNT \nFROM FIN_DEMO.ACCOUNT \nWHERE ACCOUNT_TYPE = 'PENSION'",
     "result": {
      "columns": [
       "PENSION_ACCOUNT_COUNT"
      ],
      "rows": [
       [
        7
       ]
      ],
      "row_count": 1
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT COUNT(*) AS ACCOUNT_COUNT FROM FIN_DEMO.ACCOUNT WHERE ACCOUNT_TYPE = 'PENSION'",
     "result": {
      "columns": [
       "ACCOUNT_COUNT"
      ],
      "rows": [
       [
        7
       ]
      ],
      "row_count": 1
     }
    }
   ],
   "B": [
    {
     "pass": false,
     "status": "실행오류 SQL0204N  \"FIN_DEMO.ACCOUNTS\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204",
     "sql": "SELECT COUNT(*) AS ACCOUNT_COUNT\nFROM FIN_DEMO.ACCOUNTS\nWHERE ACCOUNT_TYPE = '연금'",
     "error": "[IBM][CLI Driver][DB2/LINUXX8664] SQL0204N  \"FIN_DEMO.ACCOUNTS\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204"
    },
    {
     "pass": false,
     "status": "실행오류  SQL0204N  \"9DDBC44B.ACCOUNT\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204",
     "sql": "SELECT COUNT(*) AS 연금계좌수\nFROM ACCOUNT\nWHERE ACCOUNT_TYPE = '연금'",
     "error": "[IBM][CLI Driver][DB2/LINUXX8664] SQL0204N  \"9DDBC44B.ACCOUNT\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204"
    },
    {
     "pass": false,
     "status": "실행오류 SQL0204N  \"FIN_DEMO.ACCOUNTS\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204",
     "sql": "SELECT COUNT(*) AS 계좌수\nFROM FIN_DEMO.ACCOUNTS\nWHERE ACCOUNT_TYPE = '연금'",
     "error": "[IBM][CLI Driver][DB2/LINUXX8664] SQL0204N  \"FIN_DEMO.ACCOUNTS\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204"
    }
   ]
  },
  {
   "id": "H-18",
   "question": "미수금이 있는 계좌와 미수금액을 보여줘",
   "template": "q_receivable",
   "golden_sql": "SELECT ACCOUNT_ID, RECEIVABLE FROM FIN_DEMO.BALANCE_DAILY WHERE RECEIVABLE > 0 AND BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)",
   "golden_result": {
    "columns": [
     "ACCOUNT_ID",
     "RECEIVABLE"
    ],
    "rows": [
     [
      1000006,
      "5624724"
     ],
     [
      1000021,
      "259797218"
     ],
     [
      1000023,
      "8390208"
     ],
     [
      1000036,
      "10390365"
     ],
     [
      1000042,
      "17815101"
     ]
    ],
    "row_count": 6
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT BD.ACCOUNT_ID, BD.RECEIVABLE\nFROM FIN_DEMO.BALANCE_DAILY BD\nWHERE BD.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)\n  AND BD.RECEIVABLE > 0",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "RECEIVABLE"
      ],
      "rows": [
       [
        1000006,
        "5624724"
       ],
       [
        1000021,
        "259797218"
       ],
       [
        1000023,
        "8390208"
       ],
       [
        1000036,
        "10390365"
       ],
       [
        1000042,
        "17815101"
       ]
      ],
      "row_count": 6
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT BD.ACCOUNT_ID, BD.RECEIVABLE \nFROM FIN_DEMO.BALANCE_DAILY BD \nWHERE BD.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY) \n  AND BD.RECEIVABLE > 0",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "RECEIVABLE"
      ],
      "rows": [
       [
        1000006,
        "5624724"
       ],
       [
        1000021,
        "259797218"
       ],
       [
        1000023,
        "8390208"
       ],
       [
        1000036,
        "10390365"
       ],
       [
        1000042,
        "17815101"
       ]
      ],
      "row_count": 6
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT BD.ACCOUNT_ID, BD.RECEIVABLE\nFROM FIN_DEMO.BALANCE_DAILY BD\nJOIN FIN_DEMO.ACCOUNT A ON A.ACCOUNT_ID = BD.ACCOUNT_ID\nWHERE BD.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)\n  AND BD.RECEIVABLE > 0",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "RECEIVABLE"
      ],
      "rows": [
       [
        1000006,
        "5624724"
       ],
       [
        1000021,
        "259797218"
       ],
       [
        1000023,
        "8390208"
       ],
       [
        1000036,
        "10390365"
       ],
       [
        1000042,
        "17815101"
       ]
      ],
      "row_count": 6
     }
    }
   ],
   "B": [
    {
     "pass": false,
     "status": "실행오류 SQL0204N  \"FIN_DEMO.ACCOUNTS\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204",
     "sql": "SELECT ACCOUNT_ID,\n       OUTSTANDING_AMOUNT\nFROM   FIN_DEMO.ACCOUNTS\nWHERE  OUTSTANDING_AMOUNT > 0",
     "error": "[IBM][CLI Driver][DB2/LINUXX8664] SQL0204N  \"FIN_DEMO.ACCOUNTS\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204"
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT \"FIN_DEMO\".\"BALANCE_DAILY\".\"ACCOUNT_ID\",\n       \"FIN_DEMO\".\"BALANCE_DAILY\".\"RECEIVABLE\"\nFROM \"FIN_DEMO\".\"BALANCE_DAILY\"\nWHERE \"FIN_DEMO\".\"BALANCE_DAILY\".\"RECEIVABLE\" > 0\n  AND \"FIN_DEMO\".\"BALANCE_DAILY\".\"BASE_DATE\" = (\n        SELECT MAX(\"BASE_DATE\")\n        FROM \"FIN_DEMO\".\"BALANCE_DAILY\")\nORDER BY \"FIN_DEMO\".\"BALANCE_DAILY\".\"RECEIVABLE\" DESC",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "RECEIVABLE"
      ],
      "rows": [
       [
        1000021,
        "259797218"
       ],
       [
        1000042,
        "17815101"
       ],
       [
        1000036,
        "10390365"
       ],
       [
        1000023,
        "8390208"
       ],
       [
        1000006,
        "5624724"
       ]
      ],
      "row_count": 6
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT \"FIN_DEMO\".\"BALANCE_DAILY\".\"ACCOUNT_ID\", \"FIN_DEMO\".\"BALANCE_DAILY\".\"RECEIVABLE\"\nFROM \"FIN_DEMO\".\"BALANCE_DAILY\"\nWHERE \"FIN_DEMO\".\"BALANCE_DAILY\".\"RECEIVABLE\" > 0\n  AND \"FIN_DEMO\".\"BALANCE_DAILY\".\"BASE_DATE\" = (\n    SELECT MAX(\"BASE_DATE\")\n    FROM \"FIN_DEMO\".\"BALANCE_DAILY\"\n)\nORDER BY \"FIN_DEMO\".\"BALANCE_DAILY\".\"RECEIVABLE\" DESC",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "RECEIVABLE"
      ],
      "rows": [
       [
        1000021,
        "259797218"
       ],
       [
        1000042,
        "17815101"
       ],
       [
        1000036,
        "10390365"
       ],
       [
        1000023,
        "8390208"
       ],
       [
        1000006,
        "5624724"
       ]
      ],
      "row_count": 6
     }
    }
   ]
  },
  {
   "id": "H-19",
   "question": "실현손익 합계가 가장 큰 종목 4개를 보여줘",
   "template": "q_top_pnl_products",
   "golden_sql": "SELECT p.PRODUCT_NAME, SUM(e.REALIZED_PNL) AS PNL FROM FIN_DEMO.EXECUTIONS e JOIN FIN_DEMO.ORDERS o ON e.ORDER_ID = o.ORDER_ID JOIN FIN_DEMO.PRODUCT p ON o.PRODUCT_CODE = p.PRODUCT_CODE GROUP BY p.PRODUCT_CODE, p.PRODUCT_NAME ORDER BY PNL DESC FETCH FIRST 4 ROWS ONLY",
   "golden_result": {
    "columns": [
     "PRODUCT_NAME",
     "PNL"
    ],
    "rows": [
     [
      "카카오",
      "4633228"
     ],
     [
      "회사채 AA 24-3",
      "4588602"
     ],
     [
      "삼성물산",
      "3799092"
     ],
     [
      "셀트리온",
      "3083723"
     ]
    ],
    "row_count": 4
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT P.PRODUCT_NAME, SUM(E.REALIZED_PNL) AS TOTAL_REALIZED_PNL\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nGROUP BY P.PRODUCT_NAME\nORDER BY TOTAL_REALIZED_PNL DESC\nFETCH FIRST 4 ROWS ONLY",
     "result": {
      "columns": [
       "PRODUCT_NAME",
       "TOTAL_REALIZED_PNL"
      ],
      "rows": [
       [
        "카카오",
        "4633228"
       ],
       [
        "회사채 AA 24-3",
        "4588602"
       ],
       [
        "삼성물산",
        "3799092"
       ],
       [
        "셀트리온",
        "3083723"
       ]
      ],
      "row_count": 4
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT P.PRODUCT_NAME, SUM(E.REALIZED_PNL) AS TOTAL_REALIZED_PNL\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nGROUP BY P.PRODUCT_NAME\nORDER BY TOTAL_REALIZED_PNL DESC\nFETCH FIRST 4 ROWS ONLY",
     "result": {
      "columns": [
       "PRODUCT_NAME",
       "TOTAL_REALIZED_PNL"
      ],
      "rows": [
       [
        "카카오",
        "4633228"
       ],
       [
        "회사채 AA 24-3",
        "4588602"
       ],
       [
        "삼성물산",
        "3799092"
       ],
       [
        "셀트리온",
        "3083723"
       ]
      ],
      "row_count": 4
     }
    },
    {
     "pass": false,
     "status": "불일치(4행/정답 4행)",
     "sql": "SELECT P.PRODUCT_NAME AS PRODUCT_NAME,\n       SUM(SP.REALIZED_PNL) AS TOTAL_REALIZED_PNL\nFROM FIN_DEMO.ST_POSITIONS SP\nJOIN FIN_DEMO.PRODUCT P ON SP.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE SP.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.ST_POSITIONS)\nGROUP BY P.PRODUCT_NAME\nORDER BY TOTAL_REALIZED_PNL DESC\nFETCH FIRST 4 ROWS ONLY",
     "result": {
      "columns": [
       "PRODUCT_NAME",
       "TOTAL_REALIZED_PNL"
      ],
      "rows": [
       [
        "JYP Ent.",
        "42559525"
       ],
       [
        "통안채 24-1",
        "19291352"
       ],
       [
        "HLB",
        "15762042"
       ],
       [
        "삼성SDI",
        "15113690"
       ]
      ],
      "row_count": 4
     }
    }
   ],
   "B": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\",\n       \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\",\n       SUM(\"FIN_DEMO\".\"EXECUTIONS\".\"REALIZED_PNL\") AS \"TOTAL_REALIZED_PNL\"\nFROM \"FIN_DEMO\".\"EXECUTIONS\"\nJOIN \"FIN_DEMO\".\"ORDERS\"\n  ON \"FIN_DEMO\".\"EXECUTIONS\".\"ORDER_ID\" = \"FIN_DEMO\".\"ORDERS\".\"ORDER_ID\"\nJOIN \"FIN_DEMO\".\"PRODUCT\"\n  ON \"FIN_DEMO\".\"ORDERS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\"\nGROUP BY \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\",\n         \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\"\nORDER BY \"TOTAL_REALIZED_PNL\" DESC\nFETCH FIRST 4 ROWS ONLY",
     "result": {
      "columns": [
       "PRODUCT_CODE",
       "PRODUCT_NAME",
       "TOTAL_REALIZED_PNL"
      ],
      "rows": [
       [
        "035720",
        "카카오",
        "4633228"
       ],
       [
        "CB2403",
        "회사채 AA 24-3",
        "4588602"
       ],
       [
        "028260",
        "삼성물산",
        "3799092"
       ],
       [
        "068270",
        "셀트리온",
        "3083723"
       ]
      ],
      "row_count": 4
     }
    },
    {
     "pass": false,
     "status": "불일치(4행/정답 4행)",
     "sql": "SELECT \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\",\n       \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\",\n       SUM(\"FIN_DEMO\".\"ST_POSITIONS\".\"REALIZED_PNL\") AS \"TOTAL_REALIZED_PNL\"\nFROM \"FIN_DEMO\".\"ST_POSITIONS\"\nJOIN \"FIN_DEMO\".\"PRODUCT\"\n  ON \"FIN_DEMO\".\"ST_POSITIONS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\"\nGROUP BY \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\",\n         \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\"\nORDER BY \"TOTAL_REALIZED_PNL\" DESC\nFETCH FIRST 4 ROWS ONLY",
     "result": {
      "columns": [
       "PRODUCT_CODE",
       "PRODUCT_NAME",
       "TOTAL_REALIZED_PNL"
      ],
      "rows": [
       [
        "035900",
        "JYP Ent.",
        "91094110"
       ],
       [
        "035420",
        "NAVER",
        "69324458"
       ],
       [
        "028300",
        "HLB",
        "49211443"
       ],
       [
        "000270",
        "기아",
        "49052199"
       ]
      ],
      "row_count": 4
     }
    },
    {
     "pass": false,
     "status": "불일치(4행/정답 4행)",
     "sql": "SELECT \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\",\n       \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\",\n       SUM(\"FIN_DEMO\".\"ST_POSITIONS\".\"REALIZED_PNL\") AS \"TOTAL_REALIZED_PNL\"\nFROM \"FIN_DEMO\".\"ST_POSITIONS\"\nJOIN \"FIN_DEMO\".\"PRODUCT\"\n  ON \"FIN_DEMO\".\"ST_POSITIONS\".\"PRODUCT_CODE\" = \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\"\nGROUP BY \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_CODE\",\n         \"FIN_DEMO\".\"PRODUCT\".\"PRODUCT_NAME\"\nORDER BY \"TOTAL_REALIZED_PNL\" DESC\nFETCH FIRST 4 ROWS ONLY",
     "result": {
      "columns": [
       "PRODUCT_CODE",
       "PRODUCT_NAME",
       "TOTAL_REALIZED_PNL"
      ],
      "rows": [
       [
        "035900",
        "JYP Ent.",
        "91094110"
       ],
       [
        "035420",
        "NAVER",
        "69324458"
       ],
       [
        "028300",
        "HLB",
        "49211443"
       ],
       [
        "000270",
        "기아",
        "49052199"
       ]
      ],
      "row_count": 4
     }
    }
   ]
  },
  {
   "id": "H-20",
   "question": "GOLD 등급 고객의 이름과 총자산을 보여줘",
   "template": "q_grade_assets",
   "golden_sql": "SELECT CUSTOMER_NAME, TOTAL_ASSETS FROM FIN_DEMO.CUSTOMER WHERE GRADE = 'GOLD'",
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
      "백건우",
      "156640000"
     ]
    ],
    "row_count": 11
   },
   "A": [
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT C.CUSTOMER_NAME, C.TOTAL_ASSETS \nFROM FIN_DEMO.CUSTOMER C \nWHERE C.GRADE = 'GOLD'",
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
        "백건우",
        "156640000"
       ]
      ],
      "row_count": 11
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT C.CUSTOMER_NAME, C.TOTAL_ASSETS \nFROM FIN_DEMO.CUSTOMER C \nWHERE C.GRADE = 'GOLD'",
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
        "백건우",
        "156640000"
       ]
      ],
      "row_count": 11
     }
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT C.CUSTOMER_NAME, C.TOTAL_ASSETS \nFROM FIN_DEMO.CUSTOMER C \nWHERE C.GRADE = 'GOLD'",
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
        "백건우",
        "156640000"
       ]
      ],
      "row_count": 11
     }
    }
   ],
   "B": [
    {
     "pass": false,
     "status": "실행오류 QL0204N  \"FIN_DEMO.CUSTOMERS\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204",
     "sql": "SELECT C.CUST_NAME AS 고객명,\n       C.TOTAL_ASSETS AS 총자산\nFROM FIN_DEMO.CUSTOMERS C\nWHERE C.CUSTOMER_TIER = 'GOLD'",
     "error": "[IBM][CLI Driver][DB2/LINUXX8664] SQL0204N  \"FIN_DEMO.CUSTOMERS\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204"
    },
    {
     "pass": true,
     "status": "OK",
     "sql": "SELECT \"CUSTOMER_NAME\", \"TOTAL_ASSETS\"\nFROM \"FIN_DEMO\".\"CUSTOMER\"\nWHERE \"GRADE\" = 'GOLD'",
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
        "백건우",
        "156640000"
       ]
      ],
      "row_count": 11
     }
    },
    {
     "pass": false,
     "status": "실행오류 QL0204N  \"FIN_DEMO.CUSTOMERS\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204",
     "sql": "SELECT C.CUSTOMER_NAME AS 고객이름,\n       C.TOTAL_ASSETS AS 총자산\nFROM FIN_DEMO.CUSTOMERS C\nWHERE C.CUSTOMER_TIER = 'GOLD'\nORDER BY C.CUSTOMER_NAME",
     "error": "[IBM][CLI Driver][DB2/LINUXX8664] SQL0204N  \"FIN_DEMO.CUSTOMERS\" is an undefined name.  SQLSTATE=42704 SQLCODE=-204"
    }
   ]
  }
 ]
};
