# B-0 확인 결과 (wxdi MCP 연결 테스트)

확인일: 2026-11-16. API key는 `.env`의 `WXDI_API_KEY`에만 있다. 이 문서에 적지 않는다.

## 연결

| 항목 | 결과 |
|---|---|
| 엔드포인트 | `https://api.ca-tor.dai.cloud.ibm.com/semantic_agents/public/v1/mcp_server/mcp` (끝 슬래시 없음. 슬래시를 붙이면 307로 슬래시 없는 주소로 돌아온다) |
| 인증 | 헤더 `x-api-key`. 성공 |
| 서버 | `WXDI MCP Server 1.0.0`, 프로토콜 `2025-03-26`, 도구 59개 |
| 읽기 호출 | `list_containers`, `dynamic_query_search`, `get_asset_details`, `list_glossary_categories`, `search_connection` 성공 |

## 인스턴스 현황 (읽기 전용 조회)

- 프로젝트: `Jiyon's sandbox`, `test`, `Default trial experience project`
- 카탈로그: `Platform assets catalog`, `Sample trial experience catalog`
- `Default trial experience project`
  - 데이터 자산: `eu_daily_trades`, `na_daily_trades`, `otco_trades` (태그 `techxchange`, 설명 없음)
  - 연결: `Data Fabric Trial - PostgreSQL` (IBM Cloud Databases for PostgreSQL 계열로 보이는 `ibmclouddb` 소스)
  - `na_daily_trades` 컬럼 예: `sndr_msg_id`, `msg_fctn`, `settle_dte`, `trade_dte` 등 (증권 체결 메시지 형태)
- 용어집 카테고리: `[uncategorized]`, `Locations`, `Sample Trial Data`
- watsonx.data Presto 인스턴스는 이 MCP로는 확인되지 않았다. 별도 확인 필요.

## 핵심 발견: 제품 Text-to-SQL

- MCP의 SQL 생성 도구 `create_reporting_sql_query(project_name, query, instructions, raw_output)`를 호출했더니 실패했다.
  - 오류: `IKCBI2008E: Tenant not registered for reporting data` (404)
  - 도구 설명이 "reporting database"용 text-to-SQL이다. 사용자 데이터 자산(`na_daily_trades` 등)용 자연어 질의 기능으로 쓰는 도구인지 확인되지 않았다.
- `run_reporting_select_query(sql_query)`도 "tenant reporting database"에 SELECT를 실행하는 도구라서, 사용자 데이터 실행에 쓸 수 있는지 확인되지 않았다.
- 따라서 계획서의 가정 "wxdi MCP의 Text-to-SQL 도구로 `fin_demo` 질의를 생성한다"는 아직 검증되지 않았다.
  - 프로젝트의 자연어 질의(Onboard for generative AI)를 UI에서 켜는 방식이 필요한지, 별도 API가 있는지 확인해야 한다.
- 이 MCP에는 SQL을 사용자 데이터 소스에 실행하는 도구가 없다. `run_sql`은 데이터 소스(PostgreSQL 연결, 또는 Presto/Db2)로 직접 실행해야 한다.

## 계획에 쓸 수 있는 도구 (영역별)

| 영역 | 도구 |
|---|---|
| 용어집 | `import_glossary_from_csv`, `get_glossary_csv_schema`, `import_glossary_status`, `create_glossary_from_files`, `glossary_curator`, `explain_glossary_artifact`, `list_glossary_categories`, `list_business_terms`, `list_business_terms_by_category`, `get_artifact_details`, `search_governance_artifacts` |
| 카탈로그, 자산 | `search_asset`, `dynamic_query_search`, `get_asset_details`, `get_asset_details_for_assets`, `get_asset_glossary_artifacts`, `update_asset_metadata`, `list_containers`, `get_container`, `create_project`, `add_asset_to_project` |
| 연결, 메타데이터 가져오기 | `search_connection`, `copy_connection`, `list_connection_paths`, `create_or_update_metadata_import`, `run_metadata_import`, `search_metadata_import`, `bulk_publish_assets` |
| 메타데이터 보강 | `create_or_update_metadata_enrichment_asset`, `create_or_metadata_enrichment_asset_jobs`, `run_metadata_enrichment_job`, `run_term_generation`, `run_metadata_expansion`, `run_metadata_relationship_analysis`, `execute_advanced_profiling`, `run_data_quality_analysis`, `get_metadata_enrichment_job_status` |
| 데이터 보호 | `search_data_protection_rules`, `create_data_protection_rule`, `get_data_protection_rule_schema`, `get_policy_metrics` |
| SQL 생성, 실행 | `create_reporting_sql_query`(위 오류), `run_reporting_select_query` |
| lineage | 이 목록에는 이름이 `lineage`인 도구가 없다. 별도 확인 필요 |
| 기타 | 워크플로(`list_workflows`, `perform_workflow_task_action` 등), 문서 검색 `search_data_intelligence_documentation` |

## B-0 결정 필요 사항

1. 데이터 실행 대상: watsonx.data Presto가 없으면 기존 `Data Fabric Trial - PostgreSQL` 연결, 또는 A안 Db2 중에서 정한다.
2. 제품 Text-to-SQL: 프로젝트에서 자연어 질의를 켤 수 있는지 UI 또는 문서로 확인한다. 안 되면 SQL 생성은 wxO SQL 에이전트가 하고, wxdi는 용어집, 메타데이터 보강, 카탈로그에 쓴다.
3. lineage: MCP에 도구가 없으므로 Manta 사용 여부와 조회 방법을 별도로 확인한다.

## 추가 확인 (자연어 질의 활성화 후)

- `Default trial experience project`(ID `917a0517-ed0d-4c8e-8160-4cb69c531245`)에서 Manage > Data intelligence의 자연어 질의(Text-to-SQL)가 켜져 있음을 화면으로 확인했다. 작업 `Onboard for generative AI_Nov 16, 2026 3:02:51 PM`도 생성되어 있다.
- MCP `create_reporting_sql_query`는 활성화 후에도 같은 오류(`IKCBI2008E: Tenant not registered for reporting data`, 404)가 난다. OpenAPI 명세의 `request_source` 값 `reporting_datamart`가 이 도구의 용도로 보인다. 프로젝트 Text-to-SQL과는 다른 경로로 추정한다.

## 제품 Text-to-SQL은 REST API로 동작한다

- 서비스: Semantic Automation API. 명세는 `GET https://api.ca-tor.dai.cloud.ibm.com/semantic_automation/v1/v3/api-docs` (IAM Bearer 토큰 필요)
- 엔드포인트: `POST https://api.ca-tor.dai.cloud.ibm.com/semantic_automation/v1/generate_queries?top_n=1`
- 인증: `WXDI_API_KEY`로 `https://iam.cloud.ibm.com/identity/token` 에서 발급한 Bearer 토큰
- 요청 본문 (최소):

```json
{
  "input_question": "na_daily_trades 에서 거래일자별 거래 건수를 보여줘",
  "parameters": {
    "type": "sql",
    "sql_dialect": "postgresql",
    "context": { "containers": [ { "container_id": "<project id>", "container_type": "project" } ] }
  }
}
```

- 지원 방언: `presto`, `postgresql`, `mssql`, `oracle`, `presto_sql`, `snowflake`, `db2`
- 선택 입력: `instructions`(최대 10개), `retry_on_error`(이전 SQL과 오류를 주면 고쳐서 다시 생성), `context.asset_ids`, `connection_ids`, `schema_names`
- 응답: `results[].generated_query`, `results[].score`, `resource_usage`
- 시험 결과 (한국어 질문, HTTP 200, score 100):
  `SELECT "trade_dte", COUNT(*) AS "number_of_trades" FROM "techxchange"."na_daily_trades" GROUP BY "trade_dte" ORDER BY "trade_dte";`
- 이 API는 SQL을 생성만 한다. 실행은 하지 않는다.

## 갱신된 결정 사항

1. SQL 생성: wxO에서 `generate_queries` REST를 호출하는 Python 툴로 제품 Text-to-SQL을 쓸 수 있다. `retry_on_error`로 오류 자동 수정 장면도 만들 수 있다.
2. SQL 실행: 별도 데이터 소스가 필요하다. 후보는 `Data Fabric Trial - PostgreSQL` 연결(스키마 `techxchange`), watsonx.data Presto, Db2다.
3. lineage: MCP에 도구가 없다. 별도 확인이 필요하다.

## 확정: 실행 대상은 Db2 `FIN_DEMO` (2026-11-16)

- 사용자 결정으로 PostgreSQL 연결 대신 Db2(`bludb`, ca-tor)에 `FIN_DEMO` 스키마를 새로 만들었다. 9개 테이블 적재는 `load/load_db2.py`로 재현한다.
- 이 Db2 연결은 REST로 만들었다. MCP에는 연결 생성 도구가 없다.
  - `POST https://api.ca-tor.dai.cloud.ibm.com/v2/connections?project_id=<project id>`
  - 이름 `FIN_DEMO Db2 (ca-tor)`, 데이터소스 타입 `db2`, `ssl_certificate`에 `secrets/db2_ca.crt` 사용
  - 연결 테스트 `PUT .../actions/test`는 HTTP 200
- 메타데이터 가져오기 `FIN_DEMO metadata import`(뷰 제외, PK/FK 포함)를 MCP로 만들고 실행했다. 9개 자산이 모두 `Completed`(실패 0, 약 316초)였다.

## Text-to-SQL 정확도 평가 (Db2, 메타데이터 보강 전)

`tests/eval_text2sql.py`로 `generate_queries`(`sql_dialect: db2`) 결과를 Db2에서 실행했다.

| 질문 | 결과 |
|---|---|
| 잔고 1억 이상 고객 | OK. `TOTAL_ASSETS > 1e8`, 117행 |
| VIP 고객 수를 지점별로 | OK |
| 삼성전자 어제 체결 중 매수만 | 실행은 되지만 종목, 매수 조건이 빠짐 (의미 오류) |
| 오늘 강남지점 체결 건수와 거래대금 | 실행은 되지만 강남지점 조건이 빠짐 |
| 고객별 총 거래대금 상위 5 | 오류. 없는 `EXECUTIONS.ACCOUNT_ID` 사용 (`ORDERS`를 거쳐야 함) |
| 종목별 거래대금 업종 내 순위 | 오류. `"FIN_DEMO.PRODUCT"` 따옴표 오류, `EXEC_ID = ORDER_ID` 잘못된 조인 |
| 한도 대비 80% 초과 데스크 | 0행. 데스크별 합계가 아니라 행 단위로 비교 |

결론: 단순 질의는 맞고, 코드값 해석(종목명, 지점명, 매수), 조인 경로, 집계 후 비교는 틀린다. 다음 단계(B-3)에서 용어 할당, 관계 분석, SQL 샘플(`text_to_sql_fewshots_<n>.csv`)로 개선하고 같은 질문으로 재평가한다.

## 데이터 축소와 골든 재평가 (메타데이터 보강 후)

- 샘플 데이터를 모든 테이블 300행 이내로 줄였다(`shared/datagen/generate.py`). 건수: CUSTOMER 40, ACCOUNT 57, ORDERS 200, EXECUTIONS 약 220~240, BALANCE_DAILY 285(최근 5일), ST_POSITIONS 260(10영업일). 3월 거래대금 급증(약 2.5~3배), 주식2데스크 한도 소진율 0.86, 어제 삼성전자 매수, 미체결 지정가는 그대로 유지된다. 상수는 `N_CUSTOMERS`, `N_ORDERS`, `RECENT_DAY_ORDERS`, `SURGE_EXTRA_ORDERS`, `BALANCE_MAX_ROWS`, `POSITION_DAYS`다.
- 보강(MDE) 자체는 효과가 보이지 않았다. 보강 후 골든은 10/21(48%)로 기준선과 같았다. 가져오기 단계의 `foreign_keys`는 비어 있었고(DDL의 FK는 `parent_tables`로만 반영), 관계 분석은 EXECUTIONS에 FK 1개를 할당했다.
- 주요 실패 원인은 생성기가 `EXECUTIONS.EXEC_ID = ORDERS.ORDER_ID`로 오조인하는 것이다. instructions에 정답 조인을 명시해도 무시한다. `retry_on_error`로 되돌려 주면 3번 중 1번만 고친다.
- 대응으로 `generate_sql` 툴에 **오류 패턴 검사와 재생성**을 넣었다(`check_sql`, 최대 3회 재시도). 검사 대상은 `EXEC_ID`와 `ORDER_ID` 조인, `ACCOUNT_ID`와 `CUSTOMER_ID` 조인, 최신 기준일 필터 없는 `ST_POSITIONS`다. 평가기도 같은 검사를 쓴다.
- instructions에서 SIDE 규칙을 종목명 규칙에 합치고, "1억 = 100000000" 같은 숫자 단위와 총자산 규칙을 추가했다. 생성기가 1억을 10억(1000000000)으로 쓰는 오류가 있었다.

| 단계 | 골든 정확도 |
|---|---|
| 기준선 (보강 전) | 10/21 (48%) |
| 보강 후, 데이터 축소 | 10/21 (48%) |
| + 오조인, 최신일 검사와 재생성 | 16/21 (76%) |
| + 숫자 단위, 계좌-고객 조인 검사 | 19/21 (90%) |

남은 실패: S1-02(가끔 `BALANCE_DAILY`를 거쳐 행 수가 달라짐), S3-03(가끔 테이블명을 스키마 없이 써서 SQL0206 오류). 둘 다 비결정적이다.
wxO 에이전트 end-to-end: "삼성전자 어제 체결 중 매수만"(12건)과 "한도 80% 초과 데스크"(주식2데스크 1건)가 정상 응답했다.

## Context 에이전트 (map_terms, get_catalog)

- 툴: [`findemo_context_tools.py`](wxo/tools/findemo_context_tools.py). 엔진은 `ikc`(wxdi REST). 에이전트: [`findemo_context_agent.yaml`](wxo/agents/findemo_context_agent.yaml).
- `map_terms`는 `GET /v3/search`(`metadata.artifact_type:glossary_term`)로 게시된 용어를 읽고, 질문 속 용어를 긴 표현부터 찾는다. `get_catalog`는 `POST /v2/asset_types/asset/search`(태그 `FIN_DEMO`)와 `FK_CONSTRAINT` 자산 이름에서 컬럼, 키, PII를 구한다. 둘 다 5분 캐시한다.
- **발견(초기): 가져온 용어의 `synonyms`가 비어 있었다.** CSV의 Synonyms 열은 글자가 아니라 다른 용어 참조를 기대해서 약정, 잔고 같은 동의어가 wxdi에 연결되지 않았다. 처음에는 `map_terms`의 `SYNONYMS` 사전으로 보완했으나 아래 "동의어를 wxdi로 이전"에서 제거했다.
- 확인한 질문: "약정 상위 고객" 매핑(약정 → 거래대금, EXECUTIONS.EXEC_AMOUNT), "고객 테이블 개인정보 컬럼"(CUSTOMER_NAME, SSN, PHONE, EMAIL), "체결에서 고객까지 조인 경로"(EXECUTIONS, ORDERS, ACCOUNT, CUSTOMER).

## 동의어를 wxdi로 이전하고 에이전트 구조 변경 (2026-11-19)

**용어집(카테고리 `증권업무 용어`)**
- 게시된 용어는 24개가 아니라 **표준 용어 24개 + 동의어 용어 32개 = 56개**다. (이전 기록의 "25개"는 틀렸고 실제 표준 용어는 24개다. 카테고리 이름은 `FIN_DEMO Terms`가 아니라 `증권업무 용어`다.)
- 동의어 형식(시험으로 확인): `Synonyms` 열에는 글자가 아니라 **다른 용어의 경로**(`증권업무 용어 >> 약정`)를 쓴다. 동의어는 그 자체로 하나의 용어라 설명이 있는 별도 행으로 만든다. 한 용어의 값이 여러 개면 **연속된 행**으로 쓰고 둘째 행부터 `Description`을 비운다. 떨어진 위치에서 같은 용어를 다시 쓰면 `GIM00007E ... artifact already imported`로 건너뛴다.
- 관계: 동의어(`Synonyms`), 관련 용어(`Related Terms`: 주문↔체결, 체결↔미체결, 실현손익↔평가손익, 노출금액↔한도 소진율, VIP 고객↔고객 등급), 부분(`Part of Terms`: 예수금과 평가금액은 총자산의 일부), 유형(`Type of Terms`: 지정가 주문, 시장가 주문, 매수, 매도는 주문의 한 종류).
- 생성: [`build_glossary_csv.py`](glossary/build_glossary_csv.py)가 [`fin_demo_glossary.csv`](glossary/fin_demo_glossary.csv)를 만든다. 가져오기는 워크플로 초안을 만들므로 인박스의 Publish 작업을 `#publish`로 완료해야 게시된다.
- **검색 색인에서는 동의어 연결이 한쪽 용어에만 보이는 경우가 있다**(예: 약정은 `synonyms`가 비고 거래대금에 4개가 보임. 예수금은 비고 현금잔고에 예수금이 보임). 32쌍 모두 한쪽 이상에서 보이므로 `map_terms`는 양쪽을 합쳐 그룹을 만든다.

**`map_terms`**
- `SYNONYMS` 사전을 없앴다. 게시된 용어의 `entity.artifacts.synonyms`로 같은 뜻의 용어를 묶고, 그룹의 **대표는 정의에 컬럼명이 있는 용어 중 정의가 가장 긴 용어**로 정한다. 나머지는 대표의 별칭이 된다. 그룹 수는 24개다.
- 같은 툴을 용어·메타데이터 검색, SQL, Insight 세 에이전트가 쓴다.

**에이전트 구조**
- `findemo_context_agent`는 이름은 두고 표시 이름만 **"용어·메타데이터 검색 에이전트"**로 바꿨다(`display_name`). 설명은 "지정된 비즈니스 용어와 메타데이터 구조가 궁금할 때 물어보는 에이전트"이며, 용어와 구조를 직접 묻는 질문에만 쓰이고 값 조회 흐름에는 끼지 않는다.
- SQL 에이전트는 `map_terms`를 먼저 호출해 별칭을 표준 용어로 바꾼 질문을 `generate_sql`에 넘기고, 응답에 "용어 매핑"을 붙인다. Insight 에이전트도 같은 방식으로 `map_terms`를 쓴다(질문만 받은 경우). Supervisor는 값 조회와 차트 질문에서 더 이상 Context를 먼저 부르지 않고, "근거 보기"의 용어 매핑을 SQL/Insight 응답에서 옮긴다.
- 한계: `map_terms` 결과가 wxdi Text-to-SQL에 자동으로 전달되지는 않는다. 에이전트가 질문 속 별칭을 표준 용어로 바꿔 넘기는 방식이다. 용어집에서 동의어를 지우면 별칭이 매핑되지 않아 결과가 달라진다.
- 시험(Supervisor를 gpt-oss-120b로 임시 전환한 상태): "이번 달 체결대금 큰 우수고객 상위 3명" → 체결대금→거래대금, 우수고객→VIP 고객으로 매핑 후 SQL 실행, "약정이 뭐야? 어떤 컬럼이야?" → 용어·메타데이터 검색 에이전트만 호출, "업종별 약정 비중을 파이 차트로" → Insight가 `map_terms` 호출 후 차트. SQL 에이전트 단독: "이번 달 약정이 큰 고객 상위 5명" → 약정→거래대금.

## Insight 에이전트와 Supervisor (2026-11-19)

**make_chart** ([`findemo_chart_tools.py`](wxo/tools/findemo_chart_tools.py))
- line, bar, pie를 받아 ECharts `chart_spec`을 만든다. 성공하면 wxO 위젯 규격(`_meta["com.ibm.orchestrate/widget"]`, `response_type: user_defined`, `user_defined_type: chart`)과 본문 텍스트(`summary`, 데이터 표, `term_mapping`, `sql`)를 돌려준다. 임베디드 챗에서는 [`docs/app.js`](../docs/app.js)의 `userDefinedResponse` 핸들러가 ECharts로 실제 차트를 그린다. 위젯이 있으면 툴 응답이 그대로 사용자 답변이 되므로, Insight 에이전트가 요약·용어 매핑·SQL을 인자로 함께 넘긴다.
- 실패하면 위젯 없이 `fallback_table`과 `error`를 돌려준다. 위젯은 임베디드 챗에서만 렌더링된다.
- x에 `"year,month"`처럼 쉼표로 여러 컬럼을 주면 `2025-10` 라벨로 합친다. pie는 8개를 넘으면 상위 7개와 `기타`로 묶는다.

**생성기 오류와 대응** (`findemo_sql_tools.py`)
- Db2는 `FROM "FIN_DEMO"."T"`로 쓴 테이블의 컬럼을 `"T"."C"`로 한정하면 SQL0206을 낸다. 생성기가 자주 이렇게 쓴다. `fix_qualifiers`가 `"FIN_DEMO"."T"."C"`로 고친다.
- 월별 거래대금 추이에서 `BALANCE_DAILY.BASE_DATE`를 조인하거나 `MONTH`만으로 묶는 오답이 나온다. `check_sql`에 두 규칙을 추가했다. 거래대금 SQL에 `BALANCE_DAILY`나 `ST_POSITIONS`가 있으면 안 되고, 월별 GROUP BY에는 연도가 있어야 한다.
- 골든 3회 평가 22/30(73%), 규칙 추가 후 23/30(77%).

**Supervisor** ([`findemo_supervisor_agent.yaml`](wxo/agents/findemo_supervisor_agent.yaml))
- `collaborators`: context, sql, insight. 모호한 질문은 되묻고, 후속 질문은 직전 조건을 이어 붙이고(같은 `thread_id`), 차트와 원인 질문은 sql 에이전트를 건너뛰고 insight로 보낸다.
- `groq/openai/gpt-oss-120b`로는 하위 에이전트를 부르고도 응답을 못 받으면 2023년 데이터를 지어내거나, 받은 표의 숫자를 다시 쓰다가 틀렸다. `bedrock/us.anthropic.claude-sonnet-4-6`, style `react`로 바꾸자 숫자가 그대로 옮겨졌다. 하위 에이전트는 gpt-oss-120b를 유지한다.
- 데이터는 적재일 기준이라 날짜가 지나면 "어제" 결과가 0건이 된다. 시연 전에 `load_db2.py`를 다시 돌린다.
- 알려진 한계: 생성기가 VIP 목록 질문에 `SSN`, `EMAIL`, `PHONE`까지 SELECT한다. 접근 제어와 가드레일은 2단계 과제다.

## 하드코딩 제거와 용어집 전달 (Text-to-SQL에는 용어와 규칙을 넣지 않는다)

- `generate_sql`의 `INSTRUCTIONS`에서 용어 정의(거래대금, 업종, 한도 소진율, 매수/매도, 총자산)를 뺐다. 대신 `map_terms`가 `glossary_hints`("용어: 정의" 목록)를 돌려주고, SQL/Insight 에이전트가 이를 `generate_sql(glossary_hints=...)`에 그대로 넘긴다. 확인: SQL 에이전트가 "이번 달 약정이 큰 고객 상위 5명"에서 `map_terms` → `generate_sql(glossary_hints)` 순서로 호출했다.
- 이어서 `check_sql`(오조인, 거래대금 테이블 제한, 최신 기준일, 월별 연도)과 재생성 루프, `INSTRUCTIONS`의 조인 경로, 종목명/지점명 컬럼, 월별 추이 규칙을 제거했다. 남은 것은 Db2 문법(따옴표, 대문자, 컬럼 한정, 날짜, 숫자 단위)과 `fix_qualifiers`(Db2 호환 보정)다.
- 카탈로그 FK 점검: DDL의 FK 8개가 모두 있다(부모 테이블의 `foreign_keys`와 `FK_CONSTRAINT` 자산). PK도 9개 테이블 모두 있다. 앞서 "FK가 비어 있다"고 한 것은 자식 테이블의 `foreign_keys`만 본 오해였다(FK는 부모 쪽에 저장된다).
- 골든 평가(n=3, 에이전트 대신 코드로 map_terms 단계를 흉내 냄):

| 구성 | 점수 |
|---|---|
| 이전 하드코딩(용어 정의, 조인 경로, check_sql) | 23/30 (77%) |
| 용어 정의 제거, 용어집 전달, check_sql 유지 | 22/30 (73%) |
| 용어집 없이, check_sql 유지 | 20/30 (67%) |
| 용어집 전달, check_sql 끔 | 18/30 (60%) |
| **용어집 전달, 조인 경로와 check_sql까지 제거** | **12/30 (40%)** |

- 마지막 구성의 실패는 대부분 SQL0206이다. 생성기가 없는 컬럼(`EXECUTIONS.ACCOUNT_ID`, `ORDERS.EXEC_ID`, `PRODUCT_ID`)을 만든다. 카탈로그에 FK가 있어도, 프로젝트에 올린 SQL 샘플(`text_to_sql_fewshots_0.csv`, "거래대금이 큰 고객 상위 3명" 포함)과 같은 질문을 해도 조인이 틀린다. 즉 이 `generate_queries` 호출에서는 카탈로그 FK와 SQL 샘플이 조인 경로에 반영되지 않는 것으로 보인다.

## 카탈로그 FK를 Note로 전달 (2026-11-19)

바로 위 구성(12/30)의 원인은 `generate_queries`가 카탈로그 FK를 LLM에 넘기지 않는다는 것이다. 프롬프트 원문(`include_raw_model_input_output`)에서 `FOREIGN KEY`/`REFERENCES`가 0건이었고, 스키마 링킹이 질문과 비슷한 컬럼만 잘라 보내서 조인키(`ORDER_ID` 등)가 빠졌다. 공식 문서는 질문별 보충 정보를 질문 뒤 `Note:`로 붙이라고 안내한다.

- 구현: `generate_sql`(`call_wxdi`)이 호출 때마다 wxdi 카탈로그(태그 `FIN_DEMO` 자산)에서 `foreign_keys[].join_condition`, 테이블명, `discovered_asset.connection_id`를 읽고(5분 캐시), 질문 뒤에 `Note:`로 `glossary_hints`(용어 정의)와 FK 조인 조건을 붙인다. `context.connection_ids`로 검색 범위를 FIN_DEMO 연결로 제한해 `techxchange.*` 테이블이 프롬프트에 섞이는 것을 막는다. `fix_qualifiers`의 테이블 목록(`_TABLES`)도 카탈로그에서 읽는다. 코드에는 틀 문구만 남고 용어 정의와 조인 조건의 원본은 wxdi다.
- `eval_text2sql.py`는 툴과 같은 `call_wxdi`를 쓴다(평가와 배포의 경로가 같다).
- 골든 평가(n=3): **19/30 (63%)**. 이전 구성 12/30(40%)에서 올랐다. 조인 오류(SQL0206)는 줄었고 남은 실패는 아래와 같다. 하드코딩 구성(A, 22/30)보다 3문항 낮다. n=3이라 실행마다 ±2~3문항은 흔들린다.

| 문항 | 결과 | 원인 |
|---|---|---|
| S3-03 업종 내 순위 | 0/3 | 순위 컬럼 없이 정렬만 한다. 윈도우 함수 패턴은 용어가 아니라 SQL 샘플 영역 |
| S5-02 한도 대비 노출금액 비율 | 0/3 | 용어집 별칭이 `한도 대비 노출 비율`이라 글자가 달라 `map_terms`가 매칭하지 못함. 별칭 추가가 필요(wxdi 변경이라 승인 필요) |
| S1-03 삼성전자 어제 매수 | 1/3 | 같은 질문이 실행마다 0행/11행으로 갈림 |
| S1-01, S2-02, S4-01 | 2/3 | 컬럼 오류, 결과값 차이, Db2 날짜 연산 문법 오류가 한 번씩 |

- end-to-end: SQL 에이전트에 "고객별 총 거래 약정 상위 5명"을 질문 → `map_terms`(약정 → 거래대금, `glossary_hints`) → `generate_sql` → `run_sql` 5행. `generate_sql` 소요 19초(첫 호출은 카탈로그 읽기 포함).
- 카탈로그가 바뀌어도 코드는 그대로다. 단 Db2 변경 후 wxdi 메타데이터 가져오기를 다시 실행해야 하고, 새 테이블에는 `FIN_DEMO` 태그가 붙어야 한다.

## 용어집 추가와 wxdi 정리 (2026-11-20)

- 용어집에 추가(승인받음): `한도 소진율`의 동의어 `한도 대비 노출금액 비율`, 새 용어 `업종 내 순위`(동의어 `업종별 순위`, `업종 내에서 순위`). 원본은 [`build_glossary_csv.py`](glossary/build_glossary_csv.py)이고 표준 용어 25개, 동의어 용어 35개다. 일부 행만 `merge_option=specified`로 가져오고 인박스 Publish 작업을 `#publish`로 완료했다.
- 골든 재평가(10문항 x 3회): **24/30 (80%)**. S3-03(업종 내 순위) 0/3 → 3/3(순위 컬럼 `RANK() OVER (PARTITION BY SECTOR ...)` 생성). S5-02(한도 대비 노출금액 비율)는 용어는 매칭되지만 최신 기준일 조건이 빠져 4행(정답 1행)으로 0/3. S4-01(30분 넘게 미체결)은 0/3으로 이전(2/3)보다 나빠졌다. n=3이라 문항별 흔들림이 있다.
- wxdi 시험 찌꺼기 삭제: 카테고리 `ZZ동의어시험`, 용어 `ZZ대표어`, `ZZ별칭하나`, `ZZ별칭둘`, 미게시 초안 `TradeAmount`와 11-16 중복 초안 23건, Publish 작업 3건. 게시된 용어는 삭제 대상이 아니라서 그대로다.
- wxdi 삭제 방법: 게시된 용어는 `DELETE /v3/glossary_terms/{artifact_id}/versions/{version_id}`가 삭제 워크플로를 만들고 인박스 작업을 `#delete`로 완료해야 `DELETED`가 된다. 미게시 초안은 Publish 작업을 `?discard`로 완료한다. 카테고리는 `DELETE /v3/categories/{artifact_id}`가 바로 삭제한다.

## 재적재와 동기 점검, 재평가 (2026-11-20)

- `load_db2.py`로 FIN_DEMO를 다시 만들고 적재했다(9개 테이블 건수는 이전과 같음: ORDERS 200, EXECUTIONS 236 등). 체결 날짜 범위는 2025-10-22 ~ 2026-11-20으로 오늘이 들어왔다. 오늘 체결 20건, 어제 33건, 30분 넘은 미체결 지정가 5건.
- wxdi 카탈로그와 Db2 대조(SYSCAT): 테이블 9개, 컬럼 이름과 컬럼 설명, FK 8개가 모두 일치했다(차이 0). 같은 DDL로 다시 만들었기 때문에 메타데이터 가져오기를 다시 하지 않아도 된다.
- 규칙과 용어집 변경: `INSTRUCTIONS` 날짜 규칙에 "이번 달", "월 단위로 묶을 때는 YEAR와 MONTH를 함께 묶는다" 추가. 용어집 `한도 소진율` 정의에 "가장 최근 BASE_DATE 하루치만 합산", `미체결` 정의에 "현재 시각과 ORDER_TS의 차이"를 추가하고 wxdi에 게시했다.
- 골든(10문항 x 3회) 새 데이터 기준: 23/30 → (한도 소진율, 미체결 정의 보강) 26/30 → (월 묶음 규칙 확장) **27/30 (90%)**. S5-02 3/3, S3-03 3/3. 남은 감점은 S1-01(없는 컬럼 지어냄), S2-01(지점 코드 대신 지점명을 같이 냄), S4-01(Db2 날짜 연산 문법)이 각각 2/3이다. n=3이라 ±2~3문항은 흔들린다.
- 에이전트 end-to-end(새 데이터): Supervisor "오늘 강남지점 체결 건수와 거래대금"(7건, 104,115,980원)과 후속 "어제는?"(24건, 169,195,980원), context 에이전트(한도 소진율 정의 반영), Insight 월별 추이(14개월), 업종 비중(반도체 27%, 2차전지 14%, 채권 13%) 정상. "3월에 거래대금이 왜 늘었어?"는 값은 맞지만 업종별 분해는 하지 않는다.

## 골든 재구성과 용어 정의 보강, HTML 동기화 (2026-11-20)

- 골든을 `shared/spec/questions.md`의 번호·질문과 맞췄다. 골든은 SQL 정답이 있는 질문 전용이다: S1-01, S1-02, S1-03, S2-01(VIP 예수금 상위 10명), S2-02(이번 달 약정 상위 5명), S2-04(신용융자 계좌), S2-05(이번 달 체결대금 상위 5명), S3-03, S3-04(옛 S4-01의 번호 정정), S5-02. 4막 대화와 6막 차트는 정답 SQL이 없어 에이전트 평가로 따로 확인한다. 옛 S2-01/S2-02/S2-03/S3-01은 제거했다. 이전 점수(27/30)는 문항이 달라 직접 비교할 수 없다.
- 용어집 `예수금`, `평가금액`, `미수금` 정의에 "날짜별 스냅샷이므로 가장 최근 BASE_DATE 기준, 고객 단위는 합산"을 추가하고 게시했다. S2-01이 0/3 → 2/3(생성 SQL이 날짜별 행을 그대로 나열하던 문제 해소).
- 새 골든 평가(10문항 x 3회): **24/30 (80%)** (S1-01 1/3, S1-02 3/3, S1-03 3/3, S2-01 2/3, S2-02 3/3, S2-04 3/3, S2-05 2/3, S3-03 3/3, S3-04 1/3, S5-02 3/3). 같은 구성으로 앞선 1회는 24/30(S2-01 0/3, S3-04 2/3)이었다. 한 번 더 돌리면 1~2건 달라질 수 있다. S3-04는 "30분 안에 체결이 없는 주문"으로 해석하면 30행이 나와 불일치다.
- 골든 밖 질문 시험(1회): S2-03(30행, 날짜별 행 나열), S3-01(SQL0206), S3-02(SQL0801 0으로 나눔), S3-05(계좌 분할 없음), S5-01(4개 데스크 소진율), S5-03(전일 대비 변동 없음). 4막 S4-01~S4-04는 맥락은 이어지나 S4-03, S4-04의 결과 구성이 질문과 일부 어긋난다. 코드나 용어를 점수에 맞춰 고치지 않았다.
- Db2 `BALANCE_DAILY` 테이블 설명의 "최근 90일"이 실제(5일치, 285행)와 달라 "최근 5일"로 고쳤다(`db2_ddl.sql`과 Db2 COMMENT). wxdi 카탈로그의 같은 설명은 아직 옛 문구일 수 있어 다음 메타데이터 가져오기 때 반영된다.
- `docs/` 갱신: 통계 카드(80%, 24/30), 용어집 수(25+35), 툴 설명의 날짜 규칙, 에이전트 샘플 질문(현재 결과 기준으로 교체, 종목 순위는 삼성전자, SK하이닉스, 삼성SDI), 예상 질문 표(`questions.md` 번호 전체와 상태), 한계, `samples.js` 재생성(`site/export_samples.py`).
- 세 번째 골든 평가(같은 구성, `eval_golden.py --export docs/eval_results.js`): **26/30 (87%)**. S1-01 3/3, S2-05 3/3으로 올랐고 S2-01은 1/3으로 내렸다(최근 기준일 조건 없이 5일치를 합산하거나 `TOTAL_ASSETS` 조건으로 대체하는 SQL), S3-04는 1/3(20~30행으로 "30분 안에 체결 없음"으로 해석). 같은 구성의 세 번이 24, 24, 26점이라 실행마다 1~2점 흔들린다고 보면 된다. 질문별 골든 SQL, 생성 SQL, 실행 결과는 HTML "Text-to-SQL 평가" 탭에 들어 있다(고객 이름은 가림).
- `eval_golden.py`에 `--export <파일>` 옵션을 추가했다. 같은 파일을 다시 만들면 HTML 탭이 갱신된다(점수 이력 "24 · 24 · 26"은 `docs/app.js`의 `initEval`에 적혀 있어 직접 고쳐야 한다).

## Text-to-SQL이 쓰는 모델과 few-shot 상태 (2026-11-20)

- `generate_queries` 응답의 `resource_usage.model_usages`에 모델이 나온다(3번 호출해 같은 값 확인). **LLM(foundation): `meta-llama/llama-3-3-70b-instruct`**, 임베딩: `granite-embedding-278m-multilingual`. `gpt-oss-120b`는 wxO 에이전트 4종의 모델이고 SQL은 쓰지 않는다. 모델 선택 파라미터는 요청에 없다.
- 프롬프트 원문은 요청 본문 `parameters`가 아니라 **본문 최상위 `include_raw_model_input_output: true`**로 받는다(쿼리 파라미터나 `parameters` 안에 넣으면 응답에 안 온다). 응답의 `raw_model_input_output.model_input`이 프롬프트다.
- few-shot 확인: 업로드한 CSV(`text_to_sql_fewshots_0.csv`)의 질문과 같은 "SK하이닉스 어제 체결 중 매도만 보여줘"를 보냈는데 프롬프트에 샘플 SQL이 없다(`e.EXEC_ID, e.EXEC_TS` 부재). 프롬프트의 "Examples" 블록은 IBM 고정 서식 예시뿐이다.
- 가능한 원인: 프로젝트에 있는 job `Onboard for generative AI_Nov 16, 2026 3:02:51 PM`의 유일한 실행이 2026-11-16 06:02Z이고, CSV 자산은 같은 날 16:21Z에 만들어졌다. 샘플이 온보딩 시점에 색인된다면 그 뒤에 올린 파일은 반영되지 않는다. IBM 문서(Providing additional context for converting natural language queries to SQL)에는 파일명 규칙(`text_to_sql_fewshots_<n>.csv`, 헤더 없음, `natural_language_query,evidence,sql`)과 "모든 샘플이 매 변환마다 검색되어 관련 샘플이 few-shot으로 LLM에 제공된다"만 있고 재온보딩 필요 여부는 없다. 이 원인은 아직 검증하지 않았다(job 재실행이 필요하고 wxdi 상태가 바뀌므로 승인 후 시험).

## 예수금이 5일치 합계로 나오던 원인과 수정 (2026-11-20)

- 증상: "VIP 고객 중 예수금 많은 순으로 10명"에서 예수금이 최근 기준일 값(1위 466,173,370원)이 아니라 5일치 합계(2,343,219,813원)로 나오는 일이 있었다. 정답 SQL은 문제가 없다. VIP가 4명이라 4행이 나오는 것이 맞고, `FETCH FIRST 10`은 상한이다. 4행, 고객 순서는 같고 금액만 달라서 골든이 불일치로 채점했다.
- 원인: wxdi가 모델(Llama 3.3 70B)에 주는 프롬프트에는 용어 정의("가장 최근 BASE_DATE만 쓰고")가 `Note:`로 들어가 있었다. 그러나 스키마의 컬럼 설명은 `CASH_BALANCE` "예수금(원). 계좌에 있는 현금 잔고", `BASE_DATE` "기준일"뿐이라 스냅샷이라는 단서가 없었다. 모델이 정의를 항상 따르지는 않아서 같은 질문 10번 중 2~4번이 날짜 조건 없이 합산했다(정상 6/10, 8/10).
- 수정: 용어집 `예수금`, `평가금액`, `미수금` 정의를 "BALANCE_DAILY는 날짜(BASE_DATE)별 스냅샷 테이블이라 여러 날짜의 값을 더하면 안 된다. BASE_DATE가 테이블에서 가장 최근 날짜인 행만 사용한다"로 바꾸고 wxdi에 게시했다(`build_glossary_csv.py`, 설명 컬럼만 `merge_option: specified`로 가져옴). SQL 문장은 용어집에 넣지 않았다. 툴 코드는 바꾸지 않았다.
- 효과: 같은 질문 20번 중 19번이 최근 기준일 조건을 썼다(수정 전 6~8/10). 문구는 후보 2개(SQL 예시 포함 20/20, 자연어만 19/20)를 이 질문으로 시험해 자연어 쪽을 골랐다.
- 네 번째 골든 평가(정의 보강 후, 같은 구성): **27/30 (90%)**. S2-01 2/3(직전 1/3), S3-04 1/3(Db2 SQL0206 오류 1건, 30행 불일치 1건), 나머지 8문항 3/3. 앞선 세 번은 24, 24, 26이었다. 보강한 정의는 S2-01에 맞춰 문구를 고른 것이라, 다른 질문에서의 효과는 이 한 번의 평가로는 단정할 수 없다.
- 남은 한계: 정의를 항상 따르지는 않는다(20번 중 1번은 여전히 틀릴 수 있다). 컬럼 설명 자체(`CASH_BALANCE`, `BASE_DATE`)에 스냅샷 규칙을 넣으면 더 안정될 수 있으나, 그러려면 Db2 COMMENT 수정과 wxdi 메타데이터 재가져오기가 필요하고 재가져오기는 별도 승인 사항이라 하지 않았다.
- `docs/` 갱신: 통계 카드 90%, 27/30, 평가 탭 점수 이력("24 · 24 · 26 → 27"), 질문 표 S2-01·S1-01·S2-05 비고, 한계 문단, `map_terms` 설명. `shared/spec/questions.md` S2-01 행, `tool-contract.md` generate_sql 동작에 스냅샷 규칙의 위치(용어집)를 적었다.
