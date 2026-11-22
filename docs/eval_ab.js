window.EVAL_AB = {
 "with": {
  "date": "2026-11-22",
  "n": 5,
  "ok": 50,
  "total": 50
 },
 "without": {
  "date": "2026-11-22",
  "n": 5,
  "ok": 45,
  "total": 50
 },
 "items": [
  {
   "id": "S1-01",
   "question": "오늘 강남지점 체결 건수와 거래대금 알려줘",
   "with": [
    true,
    true,
    true,
    true,
    true
   ],
   "without": [
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S1-02",
   "question": "잔고가 1억 이상인 고객 이름과 총자산을 보여줘",
   "with": [
    true,
    true,
    true,
    true,
    true
   ],
   "without": [
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S1-03",
   "question": "삼성전자 어제 체결 중 매수만 보여줘",
   "with": [
    true,
    true,
    true,
    true,
    true
   ],
   "without": [
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": false,
     "status": "불일치(0행/정답 11행)"
    },
    {
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S2-01",
   "question": "VIP 고객 중 예수금 많은 순으로 10명",
   "with": [
    true,
    true,
    true,
    true,
    true
   ],
   "without": [
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S2-02",
   "question": "이번 달 약정 상위 고객 5명",
   "with": [
    true,
    true,
    true,
    true,
    true
   ],
   "without": [
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": false,
     "status": "불일치(5행/정답 5행)"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S2-04",
   "question": "신용융자 계좌 보여줘",
   "with": [
    true,
    true,
    true,
    true,
    true
   ],
   "without": [
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S2-05",
   "question": "이번 달 체결대금 상위 고객 5명",
   "with": [
    true,
    true,
    true,
    true,
    true
   ],
   "without": [
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S3-03",
   "question": "종목별 거래대금을 업종 내에서 순위 매겨줘",
   "with": [
    true,
    true,
    true,
    true,
    true
   ],
   "without": [
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S3-04",
   "question": "주문 후 30분 넘게 미체결인 지정가 주문",
   "with": [
    true,
    true,
    true,
    true,
    true
   ],
   "without": [
    {
     "pass": false,
     "status": "불일치(32행/정답 16행)"
    },
    {
     "pass": false,
     "status": "불일치(121행/정답 16행)"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": false,
     "status": "불일치(121행/정답 16행)"
    },
    {
     "pass": true,
     "status": "OK"
    }
   ]
  },
  {
   "id": "S5-02",
   "question": "한도 대비 노출금액 비율이 80%를 넘는 데스크가 있어?",
   "with": [
    true,
    true,
    true,
    true,
    true
   ],
   "without": [
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    },
    {
     "pass": true,
     "status": "OK"
    }
   ]
  }
 ]
};
