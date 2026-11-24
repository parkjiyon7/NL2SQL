# Db2 FIN_DEMO 테이블 확인 방법

Db2 SaaS(`bludb`, ca-tor)의 `FIN_DEMO` 스키마에 합성 데이터를 적재해 두었다. 접속 정보는 `.env`의 `DB2_*` 값이고, CA 인증서는 `secrets/db2_ca.crt`다. 이 문서에는 비밀번호를 적지 않는다.

## 1. 터미널에서 확인 (이 저장소에서 검증됨)

저장소 루트에서 실행한다.

```bash
# 테이블 목록과 건수
./venv/bin/python option_b_watsonxdata/load/query_db2.py --tables

# 테이블 컬럼과 설명
./venv/bin/python option_b_watsonxdata/load/query_db2.py --columns ORDERS

# 임의의 SELECT (SELECT 또는 WITH로 시작하는 한 문장만 허용)
./venv/bin/python option_b_watsonxdata/load/query_db2.py "SELECT * FROM FIN_DEMO.CUSTOMER FETCH FIRST 5 ROWS ONLY"

# 접속 점검만
./venv/bin/python option_a_python/tests/check_db2.py
```

## 2. 다시 적재하기

```bash
# FIN_DEMO 테이블을 지우고 다시 만들어 적재한다. (약 2분. 다른 스키마는 건드리지 않는다.)
./venv/bin/python option_b_watsonxdata/load/load_db2.py

# DB에 쓰지 않고 생성될 건수만 보기
./venv/bin/python shared/datagen/generate.py
```

"오늘, 어제" 질의가 동작하도록 실행일 기준으로 최근 날짜를 만든다. 날짜가 지나면 다시 적재한다.

## 3. 다른 도구로 접속 (직접 접속 정보를 넣는 방식, 이 저장소에서는 시험하지 않음)

| 항목 | 값 |
|---|---|
| 호스트, 포트 | `.env`의 `DB2_HOST`, `DB2_PORT` |
| 데이터베이스 | `bludb` |
| 사용자, 비밀번호 | `.env`의 `DB2_USER`, `DB2_PASSWORD` |
| SSL | 사용. CA 인증서는 `secrets/db2_ca.crt` |
| JDBC URL 형식 | `jdbc:db2://<호스트>:<포트>/bludb:sslConnection=true;` |

- IBM Cloud 콘솔: Resource list에서 Db2 인스턴스를 열고 웹 콘솔의 SQL 편집기를 사용한다. 메뉴 이름은 콘솔 버전에 따라 다를 수 있다.
- DBeaver 같은 SQL 클라이언트: 위 값을 넣고, SSL 옵션에서 CA 인증서를 지정한다. 자체 서명 인증서라 클라이언트의 신뢰 저장소에 추가해야 할 수 있다.

## 4. 테이블

데모용 소량 데이터라 모든 테이블이 300행 이내다.

| 테이블 | 건수(약) | 내용 |
|---|---|---|
| `BRANCH` | 5 | 지점 (GN01 강남, YS01 여의도, BD01 분당, SC01 서초, BS01 부산) |
| `CUSTOMER` | 40 | 고객. 이름, 주민번호, 전화, 이메일은 가상 PII. 등급 VIP는 총자산 3억 이상 |
| `ACCOUNT` | 57 | 계좌. `CREDIT_LOAN_YN`이 신용융자 여부 |
| `PRODUCT` | 32 | 종목 (KOSPI, KOSDAQ, 채권) |
| `ORDERS` | 200 | 주문. 체결이 없는 주문이 미체결 |
| `EXECUTIONS` | 232 | 체결. `EXEC_AMOUNT`가 거래대금(약정), `REALIZED_PNL`은 매도 체결에만 값 |
| `BALANCE_DAILY` | 285 | 일별 잔고 최근 5일(행 상한 290을 계좌 수로 나눈 일수). `CASH_BALANCE` 예수금, `RECEIVABLE` 미수 |
| `DESK` | 4 | 데스크와 한도 |
| `ST_POSITIONS` | 260 | 데스크 포지션 10영업일. `EXPOSURE_AMOUNT`로 한도 소진율 계산 |

관계: `CUSTOMER` > `ACCOUNT` > `ORDERS` > `EXECUTIONS`, `ORDERS` > `PRODUCT`, `CUSTOMER` > `BRANCH`, `ST_POSITIONS` > `DESK`, `PRODUCT`

## 5. 확인용 질의 예

```sql
-- 등급별 고객 수
SELECT GRADE, COUNT(*) FROM FIN_DEMO.CUSTOMER GROUP BY GRADE;

-- 월별 거래대금 (3월에 급증하도록 심어 둠)
SELECT YEAR(EXEC_TS) Y, MONTH(EXEC_TS) M, SUM(EXEC_AMOUNT) AMT
FROM FIN_DEMO.EXECUTIONS GROUP BY YEAR(EXEC_TS), MONTH(EXEC_TS) ORDER BY 1, 2;

-- 어제 강남지점 삼성전자 매수 주문
SELECT o.ORDER_ID, o.ORDER_TS, o.ORDER_QTY
FROM FIN_DEMO.ORDERS o
JOIN FIN_DEMO.ACCOUNT a ON a.ACCOUNT_ID = o.ACCOUNT_ID
JOIN FIN_DEMO.CUSTOMER c ON c.CUSTOMER_ID = a.CUSTOMER_ID
WHERE c.BRANCH_CODE = 'GN01' AND o.PRODUCT_CODE = '005930' AND o.SIDE = 'BUY'
  AND DATE(o.ORDER_TS) = CURRENT DATE - 1 DAY;

-- 30분 넘게 미체결인 지정가 주문
SELECT o.ORDER_ID, o.ORDER_TS FROM FIN_DEMO.ORDERS o
WHERE o.ORDER_TYPE = 'LIMIT'
  AND NOT EXISTS (SELECT 1 FROM FIN_DEMO.EXECUTIONS e WHERE e.ORDER_ID = o.ORDER_ID)
  AND o.ORDER_TS < CURRENT TIMESTAMP - 30 MINUTES;

-- 데스크 한도 소진율 (주식2데스크가 80% 초과)
SELECT d.DESK_NAME, DECIMAL(SUM(p.EXPOSURE_AMOUNT) * 1.0 / d.LIMIT_AMOUNT, 5, 3) AS UTIL
FROM FIN_DEMO.DESK d JOIN FIN_DEMO.ST_POSITIONS p ON p.DESK_ID = d.DESK_ID
WHERE p.BASE_DATE = (SELECT MAX(BASE_DATE) FROM FIN_DEMO.ST_POSITIONS)
GROUP BY d.DESK_NAME, d.LIMIT_AMOUNT;
```
