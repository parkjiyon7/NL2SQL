"""합성 금융 데이터 생성기 (A안, B안 공통). 같은 입력이면 같은 결과가 나오도록 시드를 고정한다.

실행일(today)을 기준으로 "오늘, 어제" 질의가 동작하도록 최근 날짜를 만든다.
사용법: ./venv/bin/python shared/datagen/generate.py   (건수 요약만 출력, DB에는 쓰지 않는다)

심어 둔 장치 (시나리오 막)
- PII 컬럼(이름, 주민번호, 전화, 이메일)과 지점 컬럼 (1, 7막)
- 동의어 함정: 예수금 cash_balance, 약정 = 체결대금 합계 exec_amount, 미수 receivable (2막)
- VIP 등급: 총자산 3억 이상 (2막)
- FK 사슬: 고객 > 계좌 > 주문 > 체결 > 종목 (3막)
- 시계열: 주문과 체결 13개월, 일별 잔고 최근 수일(행 상한 BALANCE_MAX_ROWS) (3, 6막)
- 30분 넘게 미체결인 지정가 주문 (3막)
- 한도 80% 초과 데스크 1개: 주식2데스크 (5막)
- 3월 반도체 거래 급증 (6막)
- 오늘, 어제 주문 (어제는 강남지점 삼성전자 매수 포함) (1막)
"""
import datetime as dt
import math
import random

SEED = 20260101
# 데모용 소량 데이터: 모든 테이블이 300행 이내가 되도록 맞춘다.
N_CUSTOMERS = 40
N_ORDERS = 130
RECENT_DAY_ORDERS = 25  # 오늘과 어제 각각 추가로 만드는 주문 수
SURGE_EXTRA_ORDERS = 20  # 3월에 추가하는 주문 수
BALANCE_MAX_ROWS = 290  # BALANCE_DAILY 행 상한. 일수 = 상한 // 계좌 수
POSITION_DAYS = 10
HISTORY_DAYS = 395

TABLE_ORDER = [
    "BRANCH", "CUSTOMER", "ACCOUNT", "PRODUCT", "ORDERS", "EXECUTIONS",
    "BALANCE_DAILY", "DESK", "ST_POSITIONS",
]

COLUMNS = {
    "BRANCH": ["BRANCH_CODE", "BRANCH_NAME"],
    "CUSTOMER": ["CUSTOMER_ID", "CUSTOMER_NAME", "SSN", "PHONE", "EMAIL", "GRADE",
                 "BRANCH_CODE", "TOTAL_ASSETS", "JOINED_DATE"],
    "ACCOUNT": ["ACCOUNT_ID", "CUSTOMER_ID", "ACCOUNT_TYPE", "OPEN_DATE", "CREDIT_LOAN_YN"],
    "PRODUCT": ["PRODUCT_CODE", "PRODUCT_NAME", "MARKET", "SECTOR"],
    "ORDERS": ["ORDER_ID", "ACCOUNT_ID", "PRODUCT_CODE", "SIDE", "ORDER_TYPE", "ORDER_TS",
               "ORDER_QTY", "ORDER_PRICE"],
    "EXECUTIONS": ["EXEC_ID", "ORDER_ID", "EXEC_TS", "EXEC_QTY", "EXEC_PRICE", "EXEC_AMOUNT",
                   "FEE", "REALIZED_PNL"],
    "BALANCE_DAILY": ["ACCOUNT_ID", "BASE_DATE", "CASH_BALANCE", "EVAL_AMOUNT", "RECEIVABLE"],
    "DESK": ["DESK_ID", "DESK_NAME", "LIMIT_AMOUNT", "TRADER_NAME"],
    "ST_POSITIONS": ["DESK_ID", "PRODUCT_CODE", "BASE_DATE", "QTY", "EXPOSURE_AMOUNT",
                     "UNREALIZED_PNL", "REALIZED_PNL"],
}

BRANCHES = [
    ("GN01", "강남지점", 0.30), ("YS01", "여의도지점", 0.20), ("BD01", "분당지점", 0.15),
    ("SC01", "서초지점", 0.20), ("BS01", "부산지점", 0.15),
]

# (코드, 종목명, 시장, 업종, 기준가)
PRODUCTS = [
    ("005930", "삼성전자", "KOSPI", "반도체", 70000), ("000660", "SK하이닉스", "KOSPI", "반도체", 180000),
    ("035420", "NAVER", "KOSPI", "IT서비스", 200000), ("005380", "현대차", "KOSPI", "자동차", 240000),
    ("000270", "기아", "KOSPI", "자동차", 110000), ("051910", "LG화학", "KOSPI", "화학", 400000),
    ("006400", "삼성SDI", "KOSPI", "2차전지", 380000), ("068270", "셀트리온", "KOSPI", "바이오", 180000),
    ("105560", "KB금융", "KOSPI", "금융", 80000), ("055550", "신한지주", "KOSPI", "금융", 50000),
    ("005490", "POSCO홀딩스", "KOSPI", "철강", 370000), ("035720", "카카오", "KOSPI", "IT서비스", 50000),
    ("012330", "현대모비스", "KOSPI", "자동차", 230000), ("028260", "삼성물산", "KOSPI", "건설", 130000),
    ("015760", "한국전력", "KOSPI", "유틸리티", 22000),
    ("247540", "에코프로비엠", "KOSDAQ", "2차전지", 200000), ("086520", "에코프로", "KOSDAQ", "2차전지", 90000),
    ("196170", "알테오젠", "KOSDAQ", "바이오", 300000), ("028300", "HLB", "KOSDAQ", "바이오", 60000),
    ("263750", "펄어비스", "KOSDAQ", "게임", 35000), ("293490", "카카오게임즈", "KOSDAQ", "게임", 17000),
    ("035900", "JYP Ent.", "KOSDAQ", "엔터", 65000), ("041510", "에스엠", "KOSDAQ", "엔터", 80000),
    ("058470", "리노공업", "KOSDAQ", "반도체", 190000),
    ("KR3010", "국고채 3년", "BOND", "채권", 10000), ("KR5010", "국고채 5년", "BOND", "채권", 10000),
    ("KR1010", "국고채 10년", "BOND", "채권", 10000), ("KR2010", "국고채 20년", "BOND", "채권", 10000),
    ("CB2401", "회사채 AA- 24-1", "BOND", "채권", 10000), ("CB2402", "회사채 A+ 24-2", "BOND", "채권", 10000),
    ("CB2403", "회사채 AA 24-3", "BOND", "채권", 10000), ("MB2401", "통안채 24-1", "BOND", "채권", 10000),
]

SURNAMES = list("김이박최정강조윤장임한오서신권황안송류전홍고문양손배백허유남심노하곽성차주우구민진지엄채원천방공")
GIVEN = ["민준", "서준", "도윤", "예준", "시우", "하준", "지호", "지후", "준우", "현우", "서연", "서윤", "지우",
         "서현", "민서", "하은", "하윤", "윤서", "지유", "채원", "수빈", "지민", "유진", "은서", "다은", "소율",
         "예은", "도현", "건우", "우진"]

DESKS = [  # (id, 이름, 트레이더, 한도 소진율 목표, 종목 코드)
    (1, "주식1데스크", "박트레이더", 0.58, ["005930", "000660", "005380", "000270", "105560", "035420"]),
    (2, "주식2데스크", "한트레이더", 0.86, ["247540", "086520", "196170", "028300", "263750", "035900"]),
    (3, "채권데스크", "최트레이더", 0.67, ["KR3010", "KR5010", "KR1010", "KR2010", "CB2401", "CB2402", "CB2403", "MB2401"]),
    (4, "글로벌데스크", "강트레이더", 0.44, ["006400", "051910", "068270", "005490", "058470", "293490"]),
]


def _weekdays(start, end):
    d = start
    while d <= end:
        if d.weekday() < 5:
            yield d
        d += dt.timedelta(days=1)


def _price(base, code, d):
    """날짜별로 결정되는 가상 시세. 같은 입력이면 같은 값."""
    phase = sum(ord(c) for c in code) % 17
    px = base * (1 + 0.06 * math.sin(d.toordinal() / 37 + phase) + 0.02 * math.sin(d.toordinal() / 5 + phase))
    if code.startswith(("KR", "CB", "MB")):
        return round(px, 2)
    return round(px, -1)


def generate(today=None, now=None, seed=SEED):
    """모든 테이블 행을 {테이블명: [튜플, ...]} 로 돌려준다. 값은 SQL 바인딩에 쓸 수 있는 문자열과 숫자."""
    rng = random.Random(seed)
    today = today or dt.date.today()
    now = now or dt.datetime.now().replace(microsecond=0)
    yesterday = today - dt.timedelta(days=1)
    start = today - dt.timedelta(days=HISTORY_DAYS)
    fmt_d = lambda d: d.isoformat()
    fmt_t = lambda t: t.strftime("%Y-%m-%d %H:%M:%S")

    # 지점
    branch_rows = [(c, n) for c, n, _ in BRANCHES]
    branch_codes = [c for c, _, _ in BRANCHES]
    branch_w = [w for _, _, w in BRANCHES]

    # 종목
    product_rows = [(c, n, m, s) for c, n, m, s, _ in PRODUCTS]
    base_px = {c: b for c, _, _, _, b in PRODUCTS}
    sector_of = {c: s for c, _, _, s, _ in PRODUCTS}
    codes = [c for c, *_ in PRODUCTS]

    # 고객과 계좌 (총자산과 등급은 잔고를 만든 뒤 확정한다)
    customers = []
    for cid in range(1, N_CUSTOMERS + 1):
        customers.append({
            "id": cid,
            "name": rng.choice(SURNAMES) + rng.choice(GIVEN),
            "branch": rng.choices(branch_codes, branch_w)[0],
            "target": rng.lognormvariate(math.log(8e7), 1.1),
            "activity": rng.lognormvariate(0, 0.9),
            "joined": today - dt.timedelta(days=rng.randint(60, 2200)),
            "ssn": "%02d%02d%02d-%d%06d" % (rng.randint(55, 99), rng.randint(1, 12), rng.randint(1, 28),
                                           rng.choice([1, 2]), rng.randint(0, 999999)),
            "phone": "010-%04d-%04d" % (rng.randint(0, 9999), rng.randint(0, 9999)),
        })
    accounts = []
    next_acc = 1000001
    for c in customers:
        n_acc = rng.choices([1, 2, 3], [0.6, 0.3, 0.1])[0]
        shares = [rng.random() + 0.2 for _ in range(n_acc)]
        tot = sum(shares)
        for i in range(n_acc):
            atype = "BROKERAGE" if i == 0 else rng.choice(["PENSION", "CMA", "BROKERAGE"])
            accounts.append({
                "id": next_acc, "cust": c, "type": atype,
                "open": max(c["joined"], today - dt.timedelta(days=rng.randint(30, 2000))),
                "credit": "Y" if atype == "BROKERAGE" and rng.random() < 0.15 else "N",
                "share": c["target"] * shares[i] / tot,
                "weight": c["activity"] * {"BROKERAGE": 1.0, "PENSION": 0.25, "CMA": 0.15}[atype],
            })
            next_acc += 1
    for a in accounts:
        a["open"] = min(a["open"], today - dt.timedelta(days=30))

    # 일별 잔고 (행 수가 BALANCE_MAX_ROWS 이내가 되는 최근 일수)
    balance_rows = []
    cust_assets = {c["id"]: 0 for c in customers}
    balance_days = max(1, BALANCE_MAX_ROWS // len(accounts))
    days = [today - dt.timedelta(days=i) for i in range(balance_days - 1, -1, -1)]
    for a in accounts:
        cash_frac = rng.uniform(0.1, 0.5)
        cash = a["share"] * cash_frac
        ev = a["share"] * (1 - cash_frac)
        has_recv = a["credit"] == "Y" and rng.random() < 0.5
        recv = a["share"] * rng.uniform(0.02, 0.15) if has_recv else 0.0
        for d in days:
            cash *= 1 + rng.gauss(0, 0.01)
            ev *= 1 + rng.gauss(0.0003, 0.012)
            if has_recv:
                recv *= 1 + rng.gauss(0, 0.05)
            balance_rows.append((a["id"], fmt_d(d), round(cash), round(ev), round(recv)))
        cust_assets[a["cust"]["id"]] += round(cash) + round(ev)

    customer_rows = []
    for c in customers:
        total = int(round(cust_assets[c["id"]], -4))
        grade = "VIP" if total >= 300_000_000 else "GOLD" if total >= 100_000_000 else "GENERAL"
        customer_rows.append((c["id"], c["name"], c["ssn"], c["phone"], "user%04d@example.com" % c["id"],
                              grade, c["branch"], total, fmt_d(c["joined"])))
    account_rows = [(a["id"], a["cust"]["id"], a["type"], fmt_d(a["open"]), a["credit"]) for a in accounts]

    # 주문
    surge_year = today.year if today.month >= 3 else today.year - 1
    prod_w = [{"005930": 4, "000660": 3}.get(c, 0.5 if c.startswith(("KR", "CB", "MB")) else 1.0) for c in codes]
    prod_w_surge = [w * (6 if sector_of[c] == "반도체" else 1) for c, w in zip(codes, prod_w)]
    bdays = [d for d in _weekdays(start, today - dt.timedelta(days=2))]
    acc_w = [a["weight"] for a in accounts]
    gn_accounts = [a for a in accounts if a["cust"]["branch"] == "GN01" and a["type"] == "BROKERAGE"]

    def make_order(d, force=None):
        a = rng.choices(accounts, acc_w)[0]
        month_surge = d.month == 3 and d.year == surge_year
        code = rng.choices(codes, prod_w_surge if month_surge else prod_w)[0]
        side = "BUY" if rng.random() < 0.55 else "SELL"
        if force:
            a = rng.choice(gn_accounts)
            code, side = "005930", "BUY"
        otype = "LIMIT" if rng.random() < 0.65 else "MARKET"
        return {"acc": a, "code": code, "side": side, "type": otype, "date": d}

    raw = [make_order(rng.choice(bdays)) for _ in range(N_ORDERS)]
    surge_days = [d for d in bdays if d.month == 3 and d.year == surge_year]
    if surge_days:  # 3월 거래대금 급증: 반도체 비중이 큰 주문을 추가한다
        raw += [make_order(rng.choice(surge_days)) for _ in range(SURGE_EXTRA_ORDERS)]
    recent = []
    for k, d in enumerate([yesterday, today]):
        for i in range(RECENT_DAY_ORDERS):
            recent.append(make_order(d, force=(d == yesterday and i < 10)))
    raw += recent

    # 오늘 주문 시각은 지금보다 35분 이전으로 두어 미체결 30분 초과 건을 만들 수 있게 한다.
    today_limit = max(now - dt.timedelta(minutes=35), dt.datetime.combine(today, dt.time(9, 30)))
    forced_unfilled = 6
    orders, execs = [], []
    for o in raw:
        d = o["date"]
        if d == today:
            lo, hi = dt.datetime.combine(d, dt.time(9, 0)), min(dt.datetime.combine(d, dt.time(15, 20)), today_limit)
            ts = lo + dt.timedelta(seconds=rng.randint(0, max(1, int((hi - lo).total_seconds()))))
        else:
            ts = dt.datetime.combine(d, dt.time(9, 0)) + dt.timedelta(seconds=rng.randint(0, 6 * 3600 + 20 * 60))
        o["ts"] = ts
    raw.sort(key=lambda o: o["ts"])

    close = lambda d: dt.datetime.combine(d, dt.time(15, 30))
    next_oid, next_eid = 5000001, 9000001
    for o in raw:
        oid = next_oid
        next_oid += 1
        d, code, ts = o["date"], o["code"], o["ts"]
        mkt = _price(base_px[code], code, d)
        amount = rng.lognormvariate(math.log(4e6), 1.0) * min(o["acc"]["cust"]["activity"], 3)
        qty = max(1, int(round(amount / mkt)))
        limit_px = None
        if o["type"] == "LIMIT":
            limit_px = round(mkt * (1 + rng.uniform(-0.005, 0.005)), 2 if mkt < 1000 else -1)
        orders.append((oid, o["acc"]["id"], code, o["side"], o["type"], fmt_t(ts), qty, limit_px))

        if o["type"] == "LIMIT":
            fill = rng.random()
            unfilled = fill < 0.08
            if d == today and o["type"] == "LIMIT" and forced_unfilled > 0:
                unfilled, forced_unfilled = True, forced_unfilled - 1
            if unfilled:
                continue
            filled_qty = qty if fill > 0.2 else max(1, int(qty * rng.uniform(0.3, 0.8)))
            u = rng.random()
            delay = rng.randint(10, 600) if u < 0.6 else rng.randint(600, 1800) if u < 0.85 else rng.randint(1860, 10800)
            px_ref = limit_px
        else:
            filled_qty = qty
            delay = rng.randint(1, 20)
            px_ref = round(mkt * (1 + rng.uniform(-0.002, 0.002)), 2 if mkt < 1000 else -1)

        parts = [filled_qty]
        if filled_qty >= 2 and rng.random() < 0.25:
            first = rng.randint(1, filled_qty - 1)
            parts = [first, filled_qty - first]
        et = ts
        for i, q in enumerate(parts):
            et = et + dt.timedelta(seconds=delay if i == 0 else rng.randint(5, 120))
            if et > close(d):
                et = close(d) - dt.timedelta(seconds=rng.randint(1, 600))
            if d == today and et > now:
                et = now - dt.timedelta(seconds=rng.randint(1, 30))
            px = px_ref
            if o["type"] == "LIMIT":
                better = 1 - 0.001 * rng.random() if o["side"] == "BUY" else 1 + 0.001 * rng.random()
                px = round(px_ref * better, 2 if mkt < 1000 else -1)
            amt = int(round(q * px))
            pnl = int(round(amt * rng.gauss(0.012, 0.06))) if o["side"] == "SELL" else 0
            execs.append((next_eid, oid, fmt_t(et), q, px, amt, round(amt * 0.00015, 2), pnl))
            next_eid += 1

    # 데스크와 포지션
    last_bd = max(_weekdays(today - dt.timedelta(days=10), today))
    pos_days = list(_weekdays(last_bd - dt.timedelta(days=POSITION_DAYS * 2), last_bd))[-POSITION_DAYS:]
    desk_rows, pos_rows = [], []
    for desk_id, name, trader, util, dcodes in DESKS:
        exposure = {c: rng.uniform(5e8, 3e9) for c in dcodes}
        series = []
        for d in pos_days:
            for c in dcodes:
                exposure[c] = max(1e8, exposure[c] * rng.gauss(1.0, 0.05))
                px = _price(base_px[c], c, d)
                series.append((desk_id, c, d, int(exposure[c] / px), int(exposure[c]),
                               int(exposure[c] * rng.gauss(0, 0.03)), int(exposure[c] * rng.gauss(0.001, 0.01))))
        latest_sum = sum(r[4] for r in series if r[2] == pos_days[-1])
        desk_rows.append((desk_id, name, int(round(latest_sum / util, -6)), trader))
        pos_rows += [(r[0], r[1], fmt_d(r[2]), r[3], r[4], r[5], r[6]) for r in series]

    return {
        "BRANCH": branch_rows, "CUSTOMER": customer_rows, "ACCOUNT": account_rows, "PRODUCT": product_rows,
        "ORDERS": orders, "EXECUTIONS": execs, "BALANCE_DAILY": balance_rows, "DESK": desk_rows,
        "ST_POSITIONS": pos_rows,
    }


if __name__ == "__main__":
    data = generate()
    for t in TABLE_ORDER:
        print(f"{t:14s} {len(data[t]):>7d}")
