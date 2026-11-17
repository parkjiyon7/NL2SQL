# 툴 인터페이스 계약 (A안과 B안 공통)

A안과 B안은 이 계약을 바꾸지 않는다. B안에서 바뀌는 것은 툴 내부 구현뿐이다.
모든 툴은 JSON 직렬화 가능한 dict를 반환한다. 실패해도 예외를 던지지 않고 `error` 필드를 채운다. 그래야 에이전트가 오류를 읽고 스스로 고칠 수 있다.

공통 원칙
- 모든 응답에 `engine`(사용한 엔진)과 `elapsed_ms`(소요 시간)를 넣는다. 근거 보기와 2단계 감사 로그가 이 값을 쓴다.
- `user_context`는 1단계에서는 받기만 하고 쓰지 않는다. 2단계의 접근 제어(지점 필터, PII 마스킹)가 이 값을 쓴다.
- 에이전트에게 DB 접속 수단을 주지 않는다. SQL 실행은 `run_sql` 하나뿐이다.

## user_context

```json
{ "user_id": "kim_branch", "persona": "김지점", "branch_code": "GN01", "pii_level": "masked" }
```

| 필드 | 설명 |
|---|---|
| `user_id` | 사용자 식별자 |
| `persona` | 김지점, 박트레이더, 이감사 중 하나 |
| `branch_code` | 소속 지점 코드. 박트레이더, 이감사는 `null` |
| `pii_level` | `masked`(기본), `none`(PII 컬럼 접근 불가), `full` |

## run_sql

| 입력 | 타입 | 설명 |
|---|---|---|
| `sql` | string | 실행할 SQL 한 문장 (현재 엔진 방언) |
| `user_context` | object, 선택 | 위 형식 |
| `max_rows` | int, 선택 | 반환 행 상한. 기본 200 |

| 출력 | 타입 | 설명 |
|---|---|---|
| `ok` | bool | 성공 여부 |
| `columns` | string[] | 결과 컬럼명 |
| `rows` | any[][] | 결과 행 (`max_rows`까지) |
| `row_count` | int | 반환된 행 수 |
| `truncated` | bool | 상한으로 잘렸는지 |
| `executed_sql` | string | 실제로 실행한 SQL (2단계에서 게이트웨이가 바꿀 수 있음) |
| `elapsed_ms` | int | 소요 시간 |
| `engine` | string | `db2` 또는 `presto` (폴백 시 `duckdb`) |
| `error` | object 또는 null | 실패 시 `{ "type": "...", "message": "..." }` |

`error.type` 값: `syntax`, `unknown_object`, `execution`, `timeout`, `blocked`(2단계)

## map_terms

| 입력 | 타입 | 설명 |
|---|---|---|
| `question` | string, 선택 | 사용자 질문 원문. 질문에서 용어를 찾는다. |
| `terms` | string[], 선택 | 직접 지정한 용어 목록. `question`과 둘 중 하나는 필수 |

| 출력 | 타입 | 설명 |
|---|---|---|
| `mappings` | object[] | 아래 항목의 배열 |
| `unmapped` | string[] | 용어집에 없는 용어 후보 |
| `ambiguous` | object[] | 정의가 여러 개라 되물어야 하는 용어와 선택지 |
| `engine` | string | `yaml_glossary` 또는 `ikc` |
| `elapsed_ms` | int | 소요 시간 |

`mappings` 항목

| 필드 | 설명 |
|---|---|
| `matched_text` | 질문 속 표현 (예: "약정") |
| `term` | 표준 용어 (예: "거래대금") |
| `definition` | 용어 정의 |
| `maps_to` | 매핑된 `테이블.컬럼` 목록 |
| `expression` | 계산식 SQL 조각. 없으면 `null` |
| `evidence` | 근거. `{"source": "glossary", "ref": "terms/거래대금"}` |

## get_catalog

| 입력 | 타입 | 설명 |
|---|---|---|
| `table` | string, 선택 | 테이블명. 생략하면 전체 테이블 요약 |
| `keyword` | string, 선택 | 설명 검색 키워드 |

| 출력 | 설명 |
|---|---|
| `tables` | `[{name, description, columns:[{name, type, description, pii, sensitivity}], keys:{primary, foreign}}]` |
| `engine` | `yaml_catalog` 또는 `ikc` |
| `elapsed_ms` | 소요 시간 |

## get_lineage

| 입력 | 타입 | 설명 |
|---|---|---|
| `target` | string | 테이블명 또는 지표명 (예: "거래대금") |

| 출력 | 설명 |
|---|---|
| `target` | 조회 대상 |
| `upstream` | `[{node, type, via}]` 원천 방향 |
| `downstream` | 같은 형식, 하위 방향 |
| `flow_text` | 사람이 읽을 수 있는 흐름 한 줄 (예: `executions.exec_amount → SUM → 거래대금`) |
| `engine` | `yaml_lineage` 또는 `manta` |
| `elapsed_ms` | 소요 시간 |

## make_chart

| 입력 | 타입 | 설명 |
|---|---|---|
| `chart_type` | string | `line`, `bar`, `pie` |
| `columns` | string[] | `run_sql` 결과의 컬럼명 |
| `rows` | any[][] | `run_sql` 결과의 행 |
| `x` | string | x축(또는 범주) 컬럼 |
| `y` | string[] | y축 컬럼(들) |
| `title` | string, 선택 | 차트 제목 |

| 출력 | 설명 |
|---|---|
| `chart_spec` | 차트 명세 (ECharts 호환 option JSON) |
| `fallback_table` | 차트를 못 보여줄 때 대신 쓰는 마크다운 표 |
| `rendered` | 렌더링 결과 형태. A-2에서 wxO 표시 방식을 확인한 뒤 확정 (`image_base64`, `markdown` 등) |

## check_input (2단계)

| 입력 | 출력 |
|---|---|
| `text`, `user_context` | `{ "allowed": bool, "reason": string, "rule": string }` |

1단계에서는 만들지 않는다. 이름과 형식만 예약한다.
