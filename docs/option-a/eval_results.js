window.EVAL = {
 "date": "2026-11-25",
 "n": 3,
 "ok": 30,
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
      11,
      "123581070"
     ]
    ],
    "row_count": 1
   },
   "runs": [
    {
     "sql": "SELECT COUNT(E.EXEC_ID) AS EXEC_COUNT,\n       SUM(E.EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE DATE(E.EXEC_TS) = CURRENT DATE\n  AND B.BRANCH_NAME LIKE '%강남%'",
     "pass": true,
     "status": "통과",
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
     }
    },
    {
     "sql": "SELECT COUNT(E.EXEC_ID) AS EXEC_COUNT, SUM(E.EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE DATE(E.EXEC_TS) = CURRENT DATE\n  AND B.BRANCH_NAME = '강남지점'",
     "pass": true,
     "status": "통과",
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
     }
    },
    {
     "sql": "SELECT COUNT(E.EXEC_ID) AS EXEC_COUNT, SUM(E.EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE DATE(E.EXEC_TS) = CURRENT DATE AND B.BRANCH_NAME = '강남지점'",
     "pass": true,
     "status": "통과",
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
     }
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
     "sql": "SELECT C.CUSTOMER_NAME, C.TOTAL_ASSETS\nFROM FIN_DEMO.CUSTOMER C\nWHERE C.TOTAL_ASSETS >= 100000000",
     "pass": true,
     "status": "통과",
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
     }
    },
    {
     "sql": "SELECT C.CUSTOMER_NAME, C.TOTAL_ASSETS \nFROM FIN_DEMO.CUSTOMER C \nWHERE C.TOTAL_ASSETS >= 100000000",
     "pass": true,
     "status": "통과",
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
     }
    },
    {
     "sql": "SELECT C.CUSTOMER_NAME, C.TOTAL_ASSETS AS TOTAL_ASSETS\nFROM FIN_DEMO.CUSTOMER C\nWHERE C.TOTAL_ASSETS >= 100000000",
     "pass": true,
     "status": "통과",
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
     }
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
     "sql": "SELECT E.EXEC_ID, E.EXEC_TS, E.EXEC_QTY, E.EXEC_PRICE, E.EXEC_AMOUNT, P.PRODUCT_NAME, O.SIDE\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE P.PRODUCT_NAME = '삼성전자'\n  AND DATE(E.EXEC_TS) = CURRENT DATE - 1 DAY\n  AND O.SIDE = 'BUY'",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "EXEC_ID",
       "EXEC_TS",
       "EXEC_QTY",
       "EXEC_PRICE",
       "EXEC_AMOUNT",
       "PRODUCT_NAME",
       "SIDE"
      ],
      "rows": [
       [
        9000171,
        "2026-11-24 09:28:10",
        17,
        "70910.00",
        "1205470",
        "삼성전자",
        "BUY"
       ],
       [
        9000174,
        "2026-11-24 10:33:04",
        18,
        "71310.00",
        "1283580",
        "삼성전자",
        "BUY"
       ],
       [
        9000175,
        "2026-11-24 10:29:17",
        21,
        "71090.00",
        "1492890",
        "삼성전자",
        "BUY"
       ],
       [
        9000178,
        "2026-11-24 11:38:04",
        50,
        "71070.00",
        "3553500",
        "삼성전자",
        "BUY"
       ],
       [
        9000179,
        "2026-11-24 11:49:17",
        724,
        "71120.00",
        "51490880",
        "삼성전자",
        "BUY"
       ]
      ],
      "row_count": 10
     }
    },
    {
     "sql": "SELECT E.EXEC_ID, P.PRODUCT_NAME, E.EXEC_TS, E.EXEC_QTY, E.EXEC_PRICE, E.EXEC_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE P.PRODUCT_NAME = '삼성전자'\n  AND DATE(E.EXEC_TS) = CURRENT DATE - 1 DAY\n  AND O.SIDE = 'BUY'",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "EXEC_ID",
       "PRODUCT_NAME",
       "EXEC_TS",
       "EXEC_QTY",
       "EXEC_PRICE",
       "EXEC_AMOUNT"
      ],
      "rows": [
       [
        9000171,
        "삼성전자",
        "2026-11-24 09:28:10",
        17,
        "70910.00",
        "1205470"
       ],
       [
        9000174,
        "삼성전자",
        "2026-11-24 10:33:04",
        18,
        "71310.00",
        "1283580"
       ],
       [
        9000175,
        "삼성전자",
        "2026-11-24 10:29:17",
        21,
        "71090.00",
        "1492890"
       ],
       [
        9000178,
        "삼성전자",
        "2026-11-24 11:38:04",
        50,
        "71070.00",
        "3553500"
       ],
       [
        9000179,
        "삼성전자",
        "2026-11-24 11:49:17",
        724,
        "71120.00",
        "51490880"
       ]
      ],
      "row_count": 10
     }
    },
    {
     "sql": "SELECT E.EXEC_ID, E.EXEC_TS, E.EXEC_QTY, E.EXEC_PRICE, E.EXEC_AMOUNT,\n       O.SIDE, P.PRODUCT_NAME\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE P.PRODUCT_NAME = '삼성전자'\n  AND DATE(E.EXEC_TS) = CURRENT DATE - 1 DAY\n  AND O.SIDE = 'BUY'",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "EXEC_ID",
       "EXEC_TS",
       "EXEC_QTY",
       "EXEC_PRICE",
       "EXEC_AMOUNT",
       "SIDE",
       "PRODUCT_NAME"
      ],
      "rows": [
       [
        9000171,
        "2026-11-24 09:28:10",
        17,
        "70910.00",
        "1205470",
        "BUY",
        "삼성전자"
       ],
       [
        9000174,
        "2026-11-24 10:33:04",
        18,
        "71310.00",
        "1283580",
        "BUY",
        "삼성전자"
       ],
       [
        9000175,
        "2026-11-24 10:29:17",
        21,
        "71090.00",
        "1492890",
        "BUY",
        "삼성전자"
       ],
       [
        9000178,
        "2026-11-24 11:38:04",
        50,
        "71070.00",
        "3553500",
        "BUY",
        "삼성전자"
       ],
       [
        9000179,
        "2026-11-24 11:49:17",
        724,
        "71120.00",
        "51490880",
        "BUY",
        "삼성전자"
       ]
      ],
      "row_count": 10
     }
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
     "sql": "SELECT C.CUSTOMER_ID,\n       C.CUSTOMER_NAME,\n       SUM(B.CASH_BALANCE) AS TOTAL_CASH\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.ACCOUNT A ON C.CUSTOMER_ID = A.CUSTOMER_ID\nJOIN FIN_DEMO.BALANCE_DAILY B ON A.ACCOUNT_ID = B.ACCOUNT_ID\nWHERE C.GRADE = 'VIP'\n  AND B.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)\nGROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME\nORDER BY TOTAL_CASH DESC\nFETCH FIRST 10 ROWS ONLY",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_CASH"
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
     }
    },
    {
     "sql": "SELECT C.CUSTOMER_ID, C.CUSTOMER_NAME, SUM(B.CASH_BALANCE) AS TOTAL_CASH\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.ACCOUNT A ON C.CUSTOMER_ID = A.CUSTOMER_ID\nJOIN FIN_DEMO.BALANCE_DAILY B ON A.ACCOUNT_ID = B.ACCOUNT_ID\nWHERE C.GRADE = 'VIP'\n  AND B.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)\nGROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME\nORDER BY TOTAL_CASH DESC\nFETCH FIRST 10 ROWS ONLY",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_CASH"
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
     }
    },
    {
     "sql": "SELECT C.CUSTOMER_ID, C.CUSTOMER_NAME, SUM(B.CASH_BALANCE) AS TOTAL_CASH\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.ACCOUNT A ON C.CUSTOMER_ID = A.CUSTOMER_ID\nJOIN FIN_DEMO.BALANCE_DAILY B ON A.ACCOUNT_ID = B.ACCOUNT_ID\nWHERE C.GRADE = 'VIP'\n  AND B.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)\nGROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME\nORDER BY TOTAL_CASH DESC\nFETCH FIRST 10 ROWS ONLY",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_CASH"
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
     }
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
     "sql": "SELECT C.CUSTOMER_ID, C.CUSTOMER_NAME, SUM(E.EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nWHERE YEAR(DATE(E.EXEC_TS)) = YEAR(CURRENT DATE)\n  AND MONTH(DATE(E.EXEC_TS)) = MONTH(CURRENT DATE)\nGROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME\nORDER BY TOTAL_AMOUNT DESC\nFETCH FIRST 5 ROWS ONLY",
     "pass": true,
     "status": "통과",
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
     }
    },
    {
     "sql": "SELECT C.CUSTOMER_ID, C.CUSTOMER_NAME, SUM(E.EXEC_AMOUNT) AS TOTAL_TRADE_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nWHERE YEAR(DATE(E.EXEC_TS)) = YEAR(CURRENT DATE)\n  AND MONTH(DATE(E.EXEC_TS)) = MONTH(CURRENT DATE)\nGROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME\nORDER BY TOTAL_TRADE_AMOUNT DESC\nFETCH FIRST 5 ROWS ONLY",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_TRADE_AMOUNT"
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
     }
    },
    {
     "sql": "SELECT C.CUSTOMER_ID, C.CUSTOMER_NAME, SUM(E.EXEC_AMOUNT) AS TOTAL_EXEC_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nWHERE YEAR(E.EXEC_TS) = YEAR(CURRENT DATE) AND MONTH(E.EXEC_TS) = MONTH(CURRENT DATE)\nGROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME\nORDER BY TOTAL_EXEC_AMOUNT DESC\nFETCH FIRST 5 ROWS ONLY",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_EXEC_AMOUNT"
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
     }
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
     "sql": "SELECT A.ACCOUNT_ID, A.CUSTOMER_ID, A.ACCOUNT_TYPE, A.OPEN_DATE\nFROM FIN_DEMO.ACCOUNT A\nWHERE A.CREDIT_LOAN_YN = 'Y'",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "CUSTOMER_ID",
       "ACCOUNT_TYPE",
       "OPEN_DATE"
      ],
      "rows": [
       [
        1000006,
        5,
        "BROKERAGE",
        "2023-02-12"
       ],
       [
        1000007,
        6,
        "BROKERAGE",
        "2026-02-16"
       ],
       [
        1000021,
        14,
        "BROKERAGE",
        "2026-04-08"
       ],
       [
        1000023,
        16,
        "BROKERAGE",
        "2025-11-01"
       ],
       [
        1000036,
        26,
        "BROKERAGE",
        "2025-08-11"
       ]
      ],
      "row_count": 8
     }
    },
    {
     "sql": "SELECT A.ACCOUNT_ID, A.ACCOUNT_TYPE, A.OPEN_DATE \nFROM FIN_DEMO.ACCOUNT A \nWHERE A.CREDIT_LOAN_YN = 'Y'",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "ACCOUNT_TYPE",
       "OPEN_DATE"
      ],
      "rows": [
       [
        1000006,
        "BROKERAGE",
        "2023-02-12"
       ],
       [
        1000007,
        "BROKERAGE",
        "2026-02-16"
       ],
       [
        1000021,
        "BROKERAGE",
        "2026-04-08"
       ],
       [
        1000023,
        "BROKERAGE",
        "2025-11-01"
       ],
       [
        1000036,
        "BROKERAGE",
        "2025-08-11"
       ]
      ],
      "row_count": 8
     }
    },
    {
     "sql": "SELECT A.ACCOUNT_ID, A.CUSTOMER_ID, A.ACCOUNT_TYPE, A.OPEN_DATE\nFROM FIN_DEMO.ACCOUNT A\nWHERE A.CREDIT_LOAN_YN = 'Y'",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "ACCOUNT_ID",
       "CUSTOMER_ID",
       "ACCOUNT_TYPE",
       "OPEN_DATE"
      ],
      "rows": [
       [
        1000006,
        5,
        "BROKERAGE",
        "2023-02-12"
       ],
       [
        1000007,
        6,
        "BROKERAGE",
        "2026-02-16"
       ],
       [
        1000021,
        14,
        "BROKERAGE",
        "2026-04-08"
       ],
       [
        1000023,
        16,
        "BROKERAGE",
        "2025-11-01"
       ],
       [
        1000036,
        26,
        "BROKERAGE",
        "2025-08-11"
       ]
      ],
      "row_count": 8
     }
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
     "sql": "SELECT C.CUSTOMER_ID, C.CUSTOMER_NAME, SUM(E.EXEC_AMOUNT) AS TOTAL_EXEC_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nWHERE YEAR(DATE(E.EXEC_TS)) = YEAR(CURRENT DATE)\n  AND MONTH(DATE(E.EXEC_TS)) = MONTH(CURRENT DATE)\nGROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME\nORDER BY TOTAL_EXEC_AMOUNT DESC\nFETCH FIRST 5 ROWS ONLY",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_EXEC_AMOUNT"
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
     }
    },
    {
     "sql": "SELECT C.CUSTOMER_ID, C.CUSTOMER_NAME, SUM(E.EXEC_AMOUNT) AS TOTAL_EXEC_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nWHERE YEAR(DATE(E.EXEC_TS)) = YEAR(CURRENT DATE)\n  AND MONTH(DATE(E.EXEC_TS)) = MONTH(CURRENT DATE)\nGROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME\nORDER BY TOTAL_EXEC_AMOUNT DESC\nFETCH FIRST 5 ROWS ONLY",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_EXEC_AMOUNT"
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
     }
    },
    {
     "sql": "SELECT C.CUSTOMER_ID,\n       C.CUSTOMER_NAME,\n       SUM(E.EXEC_AMOUNT) AS TOTAL_EXEC_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nWHERE YEAR(DATE(E.EXEC_TS)) = YEAR(CURRENT DATE)\n  AND MONTH(DATE(E.EXEC_TS)) = MONTH(CURRENT DATE)\nGROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME\nORDER BY TOTAL_EXEC_AMOUNT DESC\nFETCH FIRST 5 ROWS ONLY",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "CUSTOMER_ID",
       "CUSTOMER_NAME",
       "TOTAL_EXEC_AMOUNT"
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
     }
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
     "sql": "SELECT P.PRODUCT_CODE, P.PRODUCT_NAME, P.SECTOR,\n       SUM(E.EXEC_AMOUNT) AS TOTAL_TRADE_AMOUNT,\n       RANK() OVER (PARTITION BY P.SECTOR ORDER BY SUM(E.EXEC_AMOUNT) DESC) AS SECTOR_RANK\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nGROUP BY P.PRODUCT_CODE, P.PRODUCT_NAME, P.SECTOR\nORDER BY P.SECTOR, SECTOR_RANK",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "PRODUCT_CODE",
       "PRODUCT_NAME",
       "SECTOR",
       "TOTAL_TRADE_AMOUNT",
       "SECTOR_RANK"
      ],
      "rows": [
       [
        "247540",
        "에코프로비엠",
        "2차전지",
        "115288200",
        1
       ],
       [
        "006400",
        "삼성SDI",
        "2차전지",
        "72153180",
        2
       ],
       [
        "086520",
        "에코프로",
        "2차전지",
        "68089720",
        3
       ],
       [
        "035720",
        "카카오",
        "IT서비스",
        "176627560",
        1
       ],
       [
        "035420",
        "NAVER",
        "IT서비스",
        "15166320",
        2
       ]
      ],
      "row_count": 31
     }
    },
    {
     "sql": "SELECT P.SECTOR,\n       P.PRODUCT_CODE,\n       P.PRODUCT_NAME,\n       SUM(E.EXEC_AMOUNT) AS TOTAL_TRADE_AMOUNT,\n       RANK() OVER (PARTITION BY P.SECTOR ORDER BY SUM(E.EXEC_AMOUNT) DESC) AS SECTOR_RANK\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nGROUP BY P.SECTOR, P.PRODUCT_CODE, P.PRODUCT_NAME\nORDER BY P.SECTOR, SECTOR_RANK",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "SECTOR",
       "PRODUCT_CODE",
       "PRODUCT_NAME",
       "TOTAL_TRADE_AMOUNT",
       "SECTOR_RANK"
      ],
      "rows": [
       [
        "2차전지",
        "247540",
        "에코프로비엠",
        "115288200",
        1
       ],
       [
        "2차전지",
        "006400",
        "삼성SDI",
        "72153180",
        2
       ],
       [
        "2차전지",
        "086520",
        "에코프로",
        "68089720",
        3
       ],
       [
        "IT서비스",
        "035720",
        "카카오",
        "176627560",
        1
       ],
       [
        "IT서비스",
        "035420",
        "NAVER",
        "15166320",
        2
       ]
      ],
      "row_count": 31
     }
    },
    {
     "sql": "SELECT \n    RANK() OVER (PARTITION BY P.SECTOR ORDER BY SUM(E.EXEC_AMOUNT) DESC) AS RANK,\n    P.PRODUCT_CODE,\n    P.PRODUCT_NAME,\n    P.SECTOR,\n    SUM(E.EXEC_AMOUNT) AS TOTAL_TRADE_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O\n    ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P\n    ON O.PRODUCT_CODE = P.PRODUCT_CODE\nGROUP BY P.PRODUCT_CODE, P.PRODUCT_NAME, P.SECTOR",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "RANK",
       "PRODUCT_CODE",
       "PRODUCT_NAME",
       "SECTOR",
       "TOTAL_TRADE_AMOUNT"
      ],
      "rows": [
       [
        1,
        "247540",
        "에코프로비엠",
        "2차전지",
        "115288200"
       ],
       [
        2,
        "006400",
        "삼성SDI",
        "2차전지",
        "72153180"
       ],
       [
        3,
        "086520",
        "에코프로",
        "2차전지",
        "68089720"
       ],
       [
        1,
        "035720",
        "카카오",
        "IT서비스",
        "176627560"
       ],
       [
        2,
        "035420",
        "NAVER",
        "IT서비스",
        "15166320"
       ]
      ],
      "row_count": 31
     }
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
     "sql": "SELECT O.ORDER_ID, O.ACCOUNT_ID, O.PRODUCT_CODE, O.SIDE, O.ORDER_QTY, O.ORDER_PRICE, O.ORDER_TS\nFROM FIN_DEMO.ORDERS O\nWHERE O.ORDER_TYPE = 'LIMIT'\n  AND NOT EXISTS (SELECT 1 FROM FIN_DEMO.EXECUTIONS E WHERE E.ORDER_ID = O.ORDER_ID)\n  AND O.ORDER_TS < CURRENT TIMESTAMP - 30 MINUTES",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "ORDER_ID",
       "ACCOUNT_ID",
       "PRODUCT_CODE",
       "SIDE",
       "ORDER_QTY",
       "ORDER_PRICE",
       "ORDER_TS"
      ],
      "rows": [
       [
        5000004,
        1000016,
        "035900",
        "SELL",
        198,
        "62310.00",
        "2025-10-31 10:05:05"
       ],
       [
        5000017,
        1000032,
        "000270",
        "SELL",
        90,
        "107430.00",
        "2025-12-02 10:46:26"
       ],
       [
        5000034,
        1000009,
        "035900",
        "SELL",
        57,
        "68800.00",
        "2026-01-30 15:03:36"
       ],
       [
        5000044,
        1000056,
        "247540",
        "BUY",
        43,
        "213280.00",
        "2026-02-25 11:04:25"
       ],
       [
        5000049,
        1000033,
        "012330",
        "BUY",
        49,
        "231490.00",
        "2026-03-06 14:05:54"
       ]
      ],
      "row_count": 15
     }
    },
    {
     "sql": "SELECT O.ORDER_ID, O.ACCOUNT_ID, O.PRODUCT_CODE, O.SIDE, O.ORDER_QTY, O.ORDER_PRICE, O.ORDER_TS\nFROM FIN_DEMO.ORDERS O\nWHERE O.ORDER_TYPE = 'LIMIT'\n  AND O.ORDER_TS <= CURRENT TIMESTAMP - 30 MINUTES\n  AND NOT EXISTS (SELECT 1 FROM FIN_DEMO.EXECUTIONS E WHERE E.ORDER_ID = O.ORDER_ID)",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "ORDER_ID",
       "ACCOUNT_ID",
       "PRODUCT_CODE",
       "SIDE",
       "ORDER_QTY",
       "ORDER_PRICE",
       "ORDER_TS"
      ],
      "rows": [
       [
        5000004,
        1000016,
        "035900",
        "SELL",
        198,
        "62310.00",
        "2025-10-31 10:05:05"
       ],
       [
        5000017,
        1000032,
        "000270",
        "SELL",
        90,
        "107430.00",
        "2025-12-02 10:46:26"
       ],
       [
        5000034,
        1000009,
        "035900",
        "SELL",
        57,
        "68800.00",
        "2026-01-30 15:03:36"
       ],
       [
        5000044,
        1000056,
        "247540",
        "BUY",
        43,
        "213280.00",
        "2026-02-25 11:04:25"
       ],
       [
        5000049,
        1000033,
        "012330",
        "BUY",
        49,
        "231490.00",
        "2026-03-06 14:05:54"
       ]
      ],
      "row_count": 15
     }
    },
    {
     "sql": "SELECT O.ORDER_ID, O.ACCOUNT_ID, O.PRODUCT_CODE, O.SIDE, O.ORDER_QTY, O.ORDER_PRICE, O.ORDER_TS\nFROM FIN_DEMO.ORDERS O\nWHERE O.ORDER_TYPE = 'LIMIT'\n  AND NOT EXISTS (SELECT 1 FROM FIN_DEMO.EXECUTIONS E WHERE E.ORDER_ID = O.ORDER_ID)\n  AND O.ORDER_TS < CURRENT TIMESTAMP - 30 MINUTES",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "ORDER_ID",
       "ACCOUNT_ID",
       "PRODUCT_CODE",
       "SIDE",
       "ORDER_QTY",
       "ORDER_PRICE",
       "ORDER_TS"
      ],
      "rows": [
       [
        5000004,
        1000016,
        "035900",
        "SELL",
        198,
        "62310.00",
        "2025-10-31 10:05:05"
       ],
       [
        5000017,
        1000032,
        "000270",
        "SELL",
        90,
        "107430.00",
        "2025-12-02 10:46:26"
       ],
       [
        5000034,
        1000009,
        "035900",
        "SELL",
        57,
        "68800.00",
        "2026-01-30 15:03:36"
       ],
       [
        5000044,
        1000056,
        "247540",
        "BUY",
        43,
        "213280.00",
        "2026-02-25 11:04:25"
       ],
       [
        5000049,
        1000033,
        "012330",
        "BUY",
        49,
        "231490.00",
        "2026-03-06 14:05:54"
       ]
      ],
      "row_count": 15
     }
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
     "sql": "SELECT D.DESK_NAME,\n       SUM(P.EXPOSURE_AMOUNT) AS TOTAL_EXPOSURE,\n       D.LIMIT_AMOUNT,\n       (SUM(P.EXPOSURE_AMOUNT) / D.LIMIT_AMOUNT) AS UTILIZATION_RATIO\nFROM FIN_DEMO.ST_POSITIONS P\nJOIN FIN_DEMO.DESK D ON D.DESK_ID = P.DESK_ID\nWHERE P.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.ST_POSITIONS)\nGROUP BY D.DESK_ID, D.DESK_NAME, D.LIMIT_AMOUNT\nHAVING (SUM(P.EXPOSURE_AMOUNT) / D.LIMIT_AMOUNT) > 0.8",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "DESK_NAME",
       "TOTAL_EXPOSURE",
       "LIMIT_AMOUNT",
       "UTILIZATION_RATIO"
      ],
      "rows": [
       [
        "주식2데스크",
        "8079766770",
        "9395000000",
        "0.860007"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "sql": "SELECT D.DESK_NAME,\n       SUM(S.EXPOSURE_AMOUNT) AS TOTAL_EXPOSURE,\n       D.LIMIT_AMOUNT,\n       (SUM(S.EXPOSURE_AMOUNT) / D.LIMIT_AMOUNT) * 100 AS EXCEED_PCT\nFROM FIN_DEMO.ST_POSITIONS S\nJOIN FIN_DEMO.DESK D ON D.DESK_ID = S.DESK_ID\nWHERE S.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.ST_POSITIONS)\nGROUP BY D.DESK_ID, D.DESK_NAME, D.LIMIT_AMOUNT\nHAVING (SUM(S.EXPOSURE_AMOUNT) / D.LIMIT_AMOUNT) > 0.8",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "DESK_NAME",
       "TOTAL_EXPOSURE",
       "LIMIT_AMOUNT",
       "EXCEED_PCT"
      ],
      "rows": [
       [
        "주식2데스크",
        "8079766770",
        "9395000000",
        "86.000700"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "sql": "SELECT\n    D.DESK_ID,\n    D.DESK_NAME,\n    D.LIMIT_AMOUNT,\n    SUM(S.EXPOSURE_AMOUNT) AS TOTAL_EXPOSURE,\n    DECIMAL(SUM(S.EXPOSURE_AMOUNT) / D.LIMIT_AMOUNT * 100, 5, 2) AS EXPOSE_RATIO\nFROM\n    FIN_DEMO.DESK D\nJOIN\n    FIN_DEMO.ST_POSITIONS S\n    ON D.DESK_ID = S.DESK_ID\nWHERE\n    S.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.ST_POSITIONS)\nGROUP BY\n    D.DESK_ID,\n    D.DESK_NAME,\n    D.LIMIT_AMOUNT\nHAVING\n    SUM(S.EXPOSURE_AMOUNT) / D.LIMIT_AMOUNT > 0.8",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "DESK_ID",
       "DESK_NAME",
       "LIMIT_AMOUNT",
       "TOTAL_EXPOSURE",
       "EXPOSE_RATIO"
      ],
      "rows": [
       [
        2,
        "주식2데스크",
        "9395000000",
        "8079766770",
        "86.00"
       ]
      ],
      "row_count": 1
     }
    }
   ]
  }
 ]
};
