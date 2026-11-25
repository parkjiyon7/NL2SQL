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
      0,
      null
     ]
    ],
    "row_count": 1
   },
   "runs": [
    {
     "sql": "SELECT COUNT(E.EXEC_ID) AS EXEC_COUNT,\n       SUM(E.EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE DATE(E.EXEC_TS) = CURRENT DATE\n  AND B.BRANCH_NAME = '강남지점'",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        0,
        null
       ]
      ],
      "row_count": 1
     }
    },
    {
     "sql": "SELECT COUNT(EXECUTIONS.EXEC_ID) AS EXEC_COUNT,\n       SUM(EXECUTIONS.EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS EXECUTIONS\nJOIN FIN_DEMO.ORDERS ORDERS ON EXECUTIONS.ORDER_ID = ORDERS.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT ACCOUNT ON ORDERS.ACCOUNT_ID = ACCOUNT.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER CUSTOMER ON ACCOUNT.CUSTOMER_ID = CUSTOMER.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH BRANCH ON CUSTOMER.BRANCH_CODE = BRANCH.BRANCH_CODE\nWHERE DATE(EXECUTIONS.EXEC_TS) = CURRENT DATE\n  AND BRANCH.BRANCH_NAME = '강남지점'",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        0,
        null
       ]
      ],
      "row_count": 1
     }
    },
    {
     "sql": "SELECT COUNT(E.EXEC_ID) AS EXEC_COUNT,\n       SUM(E.EXEC_AMOUNT) AS TOTAL_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nJOIN FIN_DEMO.BRANCH B ON C.BRANCH_CODE = B.BRANCH_CODE\nWHERE DATE(E.EXEC_TS) = CURRENT DATE\n  AND B.BRANCH_NAME = '강남지점'",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "EXEC_COUNT",
       "TOTAL_AMOUNT"
      ],
      "rows": [
       [
        0,
        null
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
     "sql": "SELECT C.CUSTOMER_NAME,\n       C.TOTAL_ASSETS\nFROM FIN_DEMO.CUSTOMER C\nWHERE C.TOTAL_ASSETS >= 100000000",
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
      9000217,
      160,
      "71110.00"
     ],
     [
      9000224,
      524,
      "71130.00"
     ]
    ],
    "row_count": 2
   },
   "runs": [
    {
     "sql": "SELECT E.EXEC_ID, P.PRODUCT_NAME, E.EXEC_QTY, E.EXEC_PRICE, E.EXEC_AMOUNT, E.EXEC_TS\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE P.PRODUCT_NAME = '삼성전자'\n  AND DATE(E.EXEC_TS) = CURRENT DATE - 1 DAY\n  AND O.SIDE = 'BUY'",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "EXEC_ID",
       "PRODUCT_NAME",
       "EXEC_QTY",
       "EXEC_PRICE",
       "EXEC_AMOUNT",
       "EXEC_TS"
      ],
      "rows": [
       [
        9000217,
        "삼성전자",
        160,
        "71110.00",
        "11377600",
        "2026-11-24 09:36:21"
       ],
       [
        9000224,
        "삼성전자",
        524,
        "71130.00",
        "37272120",
        "2026-11-24 09:46:20"
       ]
      ],
      "row_count": 2
     }
    },
    {
     "sql": "SELECT E.EXEC_ID, E.EXEC_TS, E.EXEC_QTY, E.EXEC_PRICE, E.EXEC_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE P.PRODUCT_NAME = '삼성전자'\n  AND DATE(E.EXEC_TS) = CURRENT DATE - 1 DAY\n  AND O.SIDE = 'BUY'",
     "pass": true,
     "status": "통과",
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
        9000217,
        "2026-11-24 09:36:21",
        160,
        "71110.00",
        "11377600"
       ],
       [
        9000224,
        "2026-11-24 09:46:20",
        524,
        "71130.00",
        "37272120"
       ]
      ],
      "row_count": 2
     }
    },
    {
     "sql": "SELECT E.EXEC_ID, P.PRODUCT_NAME, E.EXEC_TS, E.EXEC_QTY, E.EXEC_PRICE, E.EXEC_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nWHERE DATE(E.EXEC_TS) = CURRENT DATE - 1 DAY\n  AND O.SIDE = 'BUY'\n  AND P.PRODUCT_NAME = '삼성전자'",
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
        9000217,
        "삼성전자",
        "2026-11-24 09:36:21",
        160,
        "71110.00",
        "11377600"
       ],
       [
        9000224,
        "삼성전자",
        "2026-11-24 09:46:20",
        524,
        "71130.00",
        "37272120"
       ]
      ],
      "row_count": 2
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
     "sql": "SELECT C.CUSTOMER_ID, C.CUSTOMER_NAME, SUM(BD.CASH_BALANCE) AS TOTAL_CASH\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.ACCOUNT A ON C.CUSTOMER_ID = A.CUSTOMER_ID\nJOIN FIN_DEMO.BALANCE_DAILY BD ON A.ACCOUNT_ID = BD.ACCOUNT_ID\nWHERE C.GRADE = 'VIP'\n  AND BD.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)\nGROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME\nORDER BY TOTAL_CASH DESC\nFETCH FIRST 10 ROWS ONLY",
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
     "sql": "SELECT C.CUSTOMER_ID,\n       C.CUSTOMER_NAME,\n       SUM(BD.CASH_BALANCE) AS TOTAL_CASH_BALANCE\nFROM FIN_DEMO.CUSTOMER C\nJOIN FIN_DEMO.ACCOUNT A ON C.CUSTOMER_ID = A.CUSTOMER_ID\nJOIN FIN_DEMO.BALANCE_DAILY BD ON A.ACCOUNT_ID = BD.ACCOUNT_ID\nWHERE C.GRADE = 'VIP'\n  AND BD.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.BALANCE_DAILY)\nGROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME\nORDER BY TOTAL_CASH_BALANCE DESC\nFETCH FIRST 10 ROWS ONLY",
     "pass": true,
     "status": "통과",
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
     "sql": "SELECT\n    C.CUSTOMER_NAME AS 고객명,\n    C.CUSTOMER_ID AS 고객ID,\n    SUM(E.EXEC_AMOUNT) AS 총약정금액\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O\n  ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A\n  ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C\n  ON A.CUSTOMER_ID = C.CUSTOMER_ID\nWHERE YEAR(DATE(E.EXEC_TS)) = YEAR(CURRENT DATE)\n  AND MONTH(DATE(E.EXEC_TS)) = MONTH(CURRENT DATE)\nGROUP BY C.CUSTOMER_NAME, C.CUSTOMER_ID\nORDER BY 총약정금액 DESC\nFETCH FIRST 5 ROWS ONLY",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "고객명",
       "고객ID",
       "총약정금액"
      ],
      "rows": [
       [
        "박수빈",
        18,
        "149474210"
       ],
       [
        "심지우",
        15,
        "138282380"
       ],
       [
        "채지호",
        20,
        "125028230"
       ],
       [
        "진건우",
        31,
        "74600150"
       ],
       [
        "서도현",
        11,
        "70062560"
       ]
      ],
      "row_count": 5
     }
    },
    {
     "sql": "SELECT C.CUSTOMER_ID, C.CUSTOMER_NAME,\n       SUM(E.EXEC_AMOUNT) AS TOTAL_EXEC_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nWHERE YEAR(DATE(E.EXEC_TS)) = YEAR(CURRENT DATE)\n  AND MONTH(DATE(E.EXEC_TS)) = MONTH(CURRENT DATE)\nGROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME\nORDER BY TOTAL_EXEC_AMOUNT DESC\nFETCH FIRST 5 ROWS ONLY",
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
     "sql": "SELECT A.ACCOUNT_ID, A.CUSTOMER_ID, A.ACCOUNT_TYPE, A.OPEN_DATE \nFROM FIN_DEMO.ACCOUNT A \nWHERE A.CREDIT_LOAN_YN = 'Y'",
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
        "2023-02-11"
       ],
       [
        1000007,
        6,
        "BROKERAGE",
        "2026-02-15"
       ],
       [
        1000021,
        14,
        "BROKERAGE",
        "2026-04-07"
       ],
       [
        1000023,
        16,
        "BROKERAGE",
        "2025-10-31"
       ],
       [
        1000036,
        26,
        "BROKERAGE",
        "2025-08-10"
       ]
      ],
      "row_count": 8
     }
    },
    {
     "sql": "SELECT ACCOUNT_ID, CUSTOMER_ID, ACCOUNT_TYPE, OPEN_DATE, CREDIT_LOAN_YN \nFROM FIN_DEMO.ACCOUNT \nWHERE CREDIT_LOAN_YN = 'Y'",
     "pass": true,
     "status": "통과",
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
        "2023-02-11",
        "Y"
       ],
       [
        1000007,
        6,
        "BROKERAGE",
        "2026-02-15",
        "Y"
       ],
       [
        1000021,
        14,
        "BROKERAGE",
        "2026-04-07",
        "Y"
       ],
       [
        1000023,
        16,
        "BROKERAGE",
        "2025-10-31",
        "Y"
       ],
       [
        1000036,
        26,
        "BROKERAGE",
        "2025-08-10",
        "Y"
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
        "2023-02-11"
       ],
       [
        1000007,
        "BROKERAGE",
        "2026-02-15"
       ],
       [
        1000021,
        "BROKERAGE",
        "2026-04-07"
       ],
       [
        1000023,
        "BROKERAGE",
        "2025-10-31"
       ],
       [
        1000036,
        "BROKERAGE",
        "2025-08-10"
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
     "sql": "SELECT C.CUSTOMER_NAME AS CUSTOMER_NAME, SUM(E.EXEC_AMOUNT) AS TOTAL_EXEC_AMOUNT\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.ACCOUNT A ON O.ACCOUNT_ID = A.ACCOUNT_ID\nJOIN FIN_DEMO.CUSTOMER C ON A.CUSTOMER_ID = C.CUSTOMER_ID\nWHERE YEAR(DATE(E.EXEC_TS)) = YEAR(CURRENT DATE)\n  AND MONTH(DATE(E.EXEC_TS)) = MONTH(CURRENT DATE)\nGROUP BY C.CUSTOMER_NAME\nORDER BY TOTAL_EXEC_AMOUNT DESC\nFETCH FIRST 5 ROWS ONLY",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "CUSTOMER_NAME",
       "TOTAL_EXEC_AMOUNT"
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
     "sql": "SELECT P.PRODUCT_NAME, P.SECTOR,\n       SUM(E.EXEC_AMOUNT) AS TOTAL_AMOUNT,\n       RANK() OVER (PARTITION BY P.SECTOR ORDER BY SUM(E.EXEC_AMOUNT) DESC) AS RN\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nGROUP BY P.PRODUCT_NAME, P.SECTOR",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "PRODUCT_NAME",
       "SECTOR",
       "TOTAL_AMOUNT",
       "RN"
      ],
      "rows": [
       [
        "에코프로",
        "2차전지",
        "151102670",
        1
       ],
       [
        "에코프로비엠",
        "2차전지",
        "97297210",
        2
       ],
       [
        "삼성SDI",
        "2차전지",
        "60173990",
        3
       ],
       [
        "NAVER",
        "IT서비스",
        "205479720",
        1
       ],
       [
        "카카오",
        "IT서비스",
        "80895060",
        2
       ]
      ],
      "row_count": 32
     }
    },
    {
     "sql": "SELECT P.SECTOR,\n       P.PRODUCT_CODE,\n       P.PRODUCT_NAME,\n       SUM(E.EXEC_AMOUNT) AS TOTAL_EXEC_AMOUNT,\n       RANK() OVER (PARTITION BY P.SECTOR ORDER BY SUM(E.EXEC_AMOUNT) DESC) AS SECTOR_RANK\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nGROUP BY P.SECTOR, P.PRODUCT_CODE, P.PRODUCT_NAME",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "SECTOR",
       "PRODUCT_CODE",
       "PRODUCT_NAME",
       "TOTAL_EXEC_AMOUNT",
       "SECTOR_RANK"
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
     }
    },
    {
     "sql": "SELECT P.SECTOR, P.PRODUCT_CODE, P.PRODUCT_NAME,\n       SUM(E.EXEC_AMOUNT) AS TOTAL_TRADE_AMOUNT,\n       RANK() OVER (PARTITION BY P.SECTOR ORDER BY SUM(E.EXEC_AMOUNT) DESC) AS SECTOR_RANK\nFROM FIN_DEMO.EXECUTIONS E\nJOIN FIN_DEMO.ORDERS O ON E.ORDER_ID = O.ORDER_ID\nJOIN FIN_DEMO.PRODUCT P ON O.PRODUCT_CODE = P.PRODUCT_CODE\nGROUP BY P.SECTOR, P.PRODUCT_CODE, P.PRODUCT_NAME\nORDER BY P.SECTOR, SECTOR_RANK",
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
      5000069
     ],
     [
      5000082
     ],
     [
      5000178
     ],
     [
      5000005
     ],
     [
      5000105
     ]
    ],
    "row_count": 17
   },
   "runs": [
    {
     "sql": "SELECT O.ORDER_ID, O.ACCOUNT_ID, O.PRODUCT_CODE, O.SIDE, O.ORDER_QTY, O.ORDER_PRICE, O.ORDER_TS\nFROM FIN_DEMO.ORDERS O\nWHERE O.ORDER_TYPE = 'LIMIT'\n  AND O.ORDER_TS < CURRENT TIMESTAMP - 30 MINUTES\n  AND NOT EXISTS (SELECT 1 FROM FIN_DEMO.EXECUTIONS E WHERE E.ORDER_ID = O.ORDER_ID)",
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
        5000005,
        1000055,
        "005930",
        "SELL",
        583,
        "66650.00",
        "2025-11-03 11:05:26"
       ],
       [
        5000059,
        1000032,
        "000660",
        "BUY",
        29,
        "176230.00",
        "2026-03-19 10:42:58"
       ],
       [
        5000069,
        1000022,
        "005930",
        "SELL",
        340,
        "73380.00",
        "2026-03-30 12:10:40"
       ],
       [
        5000081,
        1000043,
        "015760",
        "SELL",
        1450,
        "22830.00",
        "2026-04-22 12:32:18"
       ],
       [
        5000082,
        1000031,
        "058470",
        "BUY",
        31,
        "185860.00",
        "2026-04-23 11:57:10"
       ]
      ],
      "row_count": 17
     }
    },
    {
     "sql": "SELECT O.ORDER_ID, O.ACCOUNT_ID, O.PRODUCT_CODE, O.ORDER_TS, O.ORDER_PRICE, O.ORDER_QTY\nFROM FIN_DEMO.ORDERS O\nWHERE O.ORDER_TYPE = 'LIMIT'\n  AND O.ORDER_TS < (CURRENT TIMESTAMP - 30 MINUTES)\n  AND NOT EXISTS (\n    SELECT 1 FROM FIN_DEMO.EXECUTIONS E WHERE E.ORDER_ID = O.ORDER_ID\n  )",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "ORDER_ID",
       "ACCOUNT_ID",
       "PRODUCT_CODE",
       "ORDER_TS",
       "ORDER_PRICE",
       "ORDER_QTY"
      ],
      "rows": [
       [
        5000005,
        1000055,
        "005930",
        "2025-11-03 11:05:26",
        "66650.00",
        583
       ],
       [
        5000059,
        1000032,
        "000660",
        "2026-03-19 10:42:58",
        "176230.00",
        29
       ],
       [
        5000069,
        1000022,
        "005930",
        "2026-03-30 12:10:40",
        "73380.00",
        340
       ],
       [
        5000081,
        1000043,
        "015760",
        "2026-04-22 12:32:18",
        "22830.00",
        1450
       ],
       [
        5000082,
        1000031,
        "058470",
        "2026-04-23 11:57:10",
        "185860.00",
        31
       ]
      ],
      "row_count": 17
     }
    },
    {
     "sql": "SELECT O.ORDER_ID, O.ACCOUNT_ID, O.PRODUCT_CODE, O.SIDE, O.ORDER_TS, O.ORDER_QTY, O.ORDER_PRICE\nFROM FIN_DEMO.ORDERS O\nWHERE O.ORDER_TYPE = 'LIMIT'\n  AND NOT EXISTS (SELECT 1 FROM FIN_DEMO.EXECUTIONS E WHERE E.ORDER_ID = O.ORDER_ID)\n  AND O.ORDER_TS < CURRENT TIMESTAMP - 30 MINUTES",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "ORDER_ID",
       "ACCOUNT_ID",
       "PRODUCT_CODE",
       "SIDE",
       "ORDER_TS",
       "ORDER_QTY",
       "ORDER_PRICE"
      ],
      "rows": [
       [
        5000005,
        1000055,
        "005930",
        "SELL",
        "2025-11-03 11:05:26",
        583,
        "66650.00"
       ],
       [
        5000059,
        1000032,
        "000660",
        "BUY",
        "2026-03-19 10:42:58",
        29,
        "176230.00"
       ],
       [
        5000069,
        1000022,
        "005930",
        "SELL",
        "2026-03-30 12:10:40",
        340,
        "73380.00"
       ],
       [
        5000081,
        1000043,
        "015760",
        "SELL",
        "2026-04-22 12:32:18",
        1450,
        "22830.00"
       ],
       [
        5000082,
        1000031,
        "058470",
        "BUY",
        "2026-04-23 11:57:10",
        31,
        "185860.00"
       ]
      ],
      "row_count": 17
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
     "sql": "SELECT D.DESK_NAME,\n       D.LIMIT_AMOUNT,\n       SUM(P.EXPOSURE_AMOUNT) AS TOTAL_EXPOSURE,\n       (SUM(P.EXPOSURE_AMOUNT) / D.LIMIT_AMOUNT) AS RATIO\nFROM FIN_DEMO.DESK D\nJOIN FIN_DEMO.ST_POSITIONS P ON D.DESK_ID = P.DESK_ID\nWHERE P.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.ST_POSITIONS)\nGROUP BY D.DESK_ID, D.DESK_NAME, D.LIMIT_AMOUNT\nHAVING (SUM(P.EXPOSURE_AMOUNT) / D.LIMIT_AMOUNT) > 0.8",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "DESK_NAME",
       "LIMIT_AMOUNT",
       "TOTAL_EXPOSURE",
       "RATIO"
      ],
      "rows": [
       [
        "주식2데스크",
        "11094000000",
        "9540679018",
        "0.859985"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "sql": "WITH latest_date AS (\n    SELECT MAX(BASE_DATE) AS max_date\n    FROM FIN_DEMO.ST_POSITIONS\n),\nexposure_per_desk AS (\n    SELECT \n        sp.DESK_ID,\n        SUM(sp.EXPOSURE_AMOUNT) AS total_exposure\n    FROM FIN_DEMO.ST_POSITIONS sp\n    JOIN latest_date ld ON sp.BASE_DATE = ld.max_date\n    GROUP BY sp.DESK_ID\n)\nSELECT \n    d.DESK_ID,\n    d.DESK_NAME,\n    d.LIMIT_AMOUNT,\n    e.total_exposure,\n    DECIMAL(e.total_exposure / d.LIMIT_AMOUNT * 100, 5, 2) || '%' AS RATIO\nFROM exposure_per_desk e\nJOIN FIN_DEMO.DESK d ON e.DESK_ID = d.DESK_ID\nWHERE e.total_exposure / d.LIMIT_AMOUNT > 0.8",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "DESK_ID",
       "DESK_NAME",
       "LIMIT_AMOUNT",
       "TOTAL_EXPOSURE",
       "RATIO"
      ],
      "rows": [
       [
        2,
        "주식2데스크",
        "11094000000",
        "9540679018",
        "85.99%"
       ]
      ],
      "row_count": 1
     }
    },
    {
     "sql": "SELECT D.DESK_NAME,\n       SUM(S.EXPOSURE_AMOUNT) AS TOTAL_EXPOSURE,\n       D.LIMIT_AMOUNT,\n       (SUM(S.EXPOSURE_AMOUNT) / D.LIMIT_AMOUNT) AS RATIO\nFROM FIN_DEMO.ST_POSITIONS S\nJOIN FIN_DEMO.DESK D ON D.DESK_ID = S.DESK_ID\nWHERE S.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.ST_POSITIONS)\nGROUP BY D.DESK_ID, D.DESK_NAME, D.LIMIT_AMOUNT\nHAVING (SUM(S.EXPOSURE_AMOUNT) / D.LIMIT_AMOUNT) > 0.8",
     "pass": true,
     "status": "통과",
     "result": {
      "columns": [
       "DESK_NAME",
       "TOTAL_EXPOSURE",
       "LIMIT_AMOUNT",
       "RATIO"
      ],
      "rows": [
       [
        "주식2데스크",
        "9540679018",
        "11094000000",
        "0.859985"
       ]
      ],
      "row_count": 1
     }
    }
   ]
  }
 ]
};
