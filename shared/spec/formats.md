# 메타데이터와 골든 질의 형식 (A안과 B안 공통)

원본은 한국어 YAML 하나다. A안 툴이 직접 읽고, B안은 같은 원본에서 IKC 업로드 CSV와 Text-to-SQL 샘플 CSV를 변환해 만든다.

파일 위치
- `shared/spec/glossary.yaml`: 용어집
- `shared/spec/catalog.yaml`: 카탈로그
- `shared/spec/lineage.yaml`: lineage
- `shared/spec/golden/*.yaml`: 골든 질의 (막별 파일)
- `shared/spec/questions.md`: 시나리오 질문 목록

## glossary.yaml

```yaml
terms:
  - name: 거래대금                  # 표준 용어
    synonyms: [약정, 약정금액, 체결대금, 거래금액]
    definition: 기간 내 체결된 금액의 합계
    maps_to: [executions.exec_amount]
    expression: SUM(executions.exec_amount)   # 없으면 생략
    examples: ["이번 달 약정 상위 고객", "오늘 거래대금"]
    dialect_notes:                  # 방언별 주의. 계산식 자체가 다를 때만
      db2: ""
      presto: ""
    ambiguous: false                # true면 정의가 여러 개라 되묻는다
    options: []                     # ambiguous일 때 선택지 [{label, maps_to, expression}]
```

`ambiguous: true` 예 (수익)

```yaml
  - name: 수익
    synonyms: [수익률, 이익, 손익]
    definition: 기준에 따라 다른 값. 반드시 기준을 확인한다.
    ambiguous: true
    options:
      - { label: 실현손익, maps_to: [st_positions.realized_pnl] }
      - { label: 평가손익, maps_to: [st_positions.unrealized_pnl] }
      - { label: 수익률,   expression: "실현손익 / 매입금액" }
```

규칙
- 용어, 동의어, 정의는 한국어로 쓴다.
- `maps_to`는 항상 `테이블.컬럼` 형식이다.
- 한 동의어는 한 용어에만 속한다. 겹치면 `ambiguous`로 처리한다.

## catalog.yaml

```yaml
tables:
  - name: customer
    description: 고객 마스터
    columns:
      - { name: customer_id, type: VARCHAR, description: 고객 ID }
      - { name: customer_name, type: VARCHAR, description: 고객 이름, pii: true, sensitivity: high }
      - { name: grade, type: VARCHAR, description: "고객 등급 (VIP, GOLD, GENERAL)" }
      - { name: branch_code, type: VARCHAR, description: 소속 지점 코드 }
    keys:
      primary: [customer_id]
      foreign: []
```

규칙
- `pii: true`인 컬럼은 `sensitivity`를 반드시 쓴다 (`high`, `medium`).
- `foreign`은 `{columns: [..], references: "table(col)"}` 형식이다.

## lineage.yaml

```yaml
nodes:
  - { id: executions.exec_amount, type: column, source: executions }
  - { id: 거래대금, type: metric, expression: "SUM(executions.exec_amount)" }
edges:
  - { from: executions.exec_amount, to: 거래대금, via: SUM }
  - { from: orders.order_id, to: executions.order_id, via: FK }
```

규칙
- `type`은 `table`, `column`, `metric` 중 하나다.
- 흐름 문자열 `flow_text`는 툴이 edges를 따라가 만든다.

## 골든 질의: golden/*.yaml

```yaml
- id: S1-01
  scene: 1
  persona: 김지점
  question: 오늘 우리 지점 체결 건수와 거래대금 알려줘
  tags: [집계, 날짜필터, 지점필터]
  terms: [거래대금]
  sql:
    db2: |
      SELECT COUNT(*) AS exec_cnt, SUM(e.exec_amount) AS exec_amount
      FROM executions e ...
    presto: |
      SELECT COUNT(*) AS exec_cnt, SUM(e.exec_amount) AS exec_amount
      FROM executions e ...
  expected:
    columns: [exec_cnt, exec_amount]
    row_count: 1
    order_sensitive: false      # true면 행 순서까지 비교
    numeric_tolerance: 0.01     # 실수 비교 허용 오차
    summary: 체결 건수와 합계가 각각 1행으로 나온다
```

규칙
- 골든 질의는 `sql.db2`와 `sql.presto`를 모두 둔다. A안 회귀는 db2, B안 회귀는 presto를 쓴다. (DuckDB 폴백을 쓰게 되면 `sql.duckdb`를 추가한다.) Db2 SQL의 행 제한은 `FETCH FIRST n ROWS ONLY`를 쓴다.
- 비교 기준은 SQL 문자열이 아니라 실행 결과다. SQL 에이전트가 만든 SQL과 골든 SQL의 결과가 같으면 통과다.
- `expected.row_count`와 `columns`는 생성기 시드가 고정이어서 재현 가능할 때만 쓴다. 날짜가 실행일에 따라 바뀌는 질의는 `summary`와 골든 SQL 결과 비교로만 검증한다.
- 데이터가 확정된 뒤(A-2, A-8)에 `expected` 값을 채운다. A-1에서는 질문, 태그, 용어까지만 정한다.
