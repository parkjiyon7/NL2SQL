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
- line, bar, pie를 받아 ECharts `chart_spec`을 만든다. 성공하면 wxO 위젯 규격(`_meta["com.ibm.orchestrate/widget"]`, `response_type: user_defined`, `user_defined_type: chart`)과 본문 텍스트(`summary`, 데이터 표, `term_mapping`, `sql`)를 돌려준다. 차트는 QuickChart의 https 이미지 주소를 마크다운 이미지로 답변 맨 위에 넣어 wxO 기본 챗과 임베디드 챗 모두에서 보인다(`data:` 이미지는 wxO 챗이 막아서 깨진다). 이미지 주소에 차트 값이 담겨 외부 서비스로 나가므로 실데이터에는 자체 호스팅이 필요하다. 위젯이 있으면 툴 응답이 그대로 사용자 답변이 되므로, Insight 에이전트가 요약·용어 매핑·SQL을 인자로 함께 넘긴다.
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

## 차트 이미지 외부 서비스 도입과 Supervisor 경유 시험 (2026-11-20)

- wxO 기본 챗은 JS를 못 돌리고 마크다운 텍스트, 표, https 이미지만 보여준다(`data:` 이미지는 깨진다). 그래서 차트는 QuickChart(`quickchart.io`) 이미지로 만들고, 임베디드 챗용 ECharts 렌더 코드는 제거했다.
- `make_chart`는 차트 설정을 `/chart/create`에 POST해 짧은 주소를 받고, 실패하면 긴 `%` 인코딩 주소로 대체한다. 긴 주소는 Supervisor(LLM)가 옮기다 `%`를 하나 빠뜨려 "2차전지"가 깨진 적이 있어 짧은 주소를 도입했다.
- **데이터 외부 전송**: 차트의 라벨과 숫자가 QuickChart로 나가고, POST 방식은 그쪽 서버에 저장된다. 합성 데이터라 데모는 가능하지만 실데이터는 자체 호스팅이 필요하다. QuickChart의 로그, 보관 정책은 확인하지 못했다.
- Supervisor 지시에 "Insight 답변의 이미지 줄(`![제목](https://quickchart.io/...)`)을 그대로 옮긴다"를 넣었다. Supervisor 경유로 원, 막대, 선, PnL 차트의 이미지가 나오는 것을 확인했다. 선 차트는 이미지가 맨 위가 아니라 첫 문장 뒤에 나왔다.
- **전사 오류**: SQL, Supervisor 에이전트가 "약정"을 "약속"으로 바꿔 `map_terms`에 넘겨 매핑이 빠지고 "총자산 상위"로 답한 일이 두 번 있었다. SQL, Insight 에이전트 지시에 "question 인자는 한 글자도 바꾸지 말고 복사"를 넣은 뒤 1회 정상(거래대금 상위 5명 1위 심지우 113,627,100원)이었으나 아직 불안정하다.
- **표현 민감성**: S3-03은 골든 문구("종목별 거래대금을 업종 내에서 순위 매겨줘")는 `RANK() PARTITION BY SECTOR`로 맞고, `questions.md`의 문구는 전체 순위가 나왔다. S5-02는 골든 문구("한도 대비 노출금액 비율이 80%를 넘는 데스크가 있어?")는 주식2데스크 86%로 맞고, "한도의 80%를 넘긴 데스크가 있어?"는 "없음"이 두 번 나왔다. 두 질문을 문서에서 "불안정"으로 낮췄다.
- S6-03은 데이터가 2025-10부터라 없는 "전년 동월 대비"를 Insight가 만들어 낸다. S6-02는 모든 스냅샷 날짜를 합산한다.
- `docs/` 갱신: 예상 질문 탭을 막별로 "할 수 있는 질문 / 나와야 하는 답 / 확인된 답" 카드로 새로 만들고(차트 샘플 이미지 3장 `docs/img/sample-chart-*.png`), 전체 목록은 맨 뒤 "질문별 검증 현황" 탭으로 옮겼다. 구성도 4곳에 QuickChart 외부 서비스 노드를 추가했다.

## 질문 목록 재정리와 추가 시험 (2026-11-21)

- 골든 10문항은 그대로 두고, 나머지 질문을 막마다 "보려는 능력"이 분명하고 어렵지 않은 질문으로 바꿨다(`shared/spec/questions.md`). 바꾼 질문은 모두 Supervisor에 물어 답을 Db2에서 직접 계산한 값과 비교했다(조회만).
- 확인됨: S2-03 현금잔고 상위 3명(동의어 → 예수금), S3-01 VIP 예수금 비중 30% 이상(부산지점 남유진 1명, 2회), S3-02 지점별 체결 건수와 거래대금(2회), S3-05 평균 초과 고객 10명(서브쿼리), S4-01~S4-03 대화, S5-01 데스크별 한도 소진율, S5-03 채권데스크 최근 기준일 노출금액 합계 12,011,982,379원, S6 차트 3종.
- 틀렸거나 불안정: 
  - 4막 "그 중에 VIP 고객만"은 직전 상위 10명으로 한정하지 않고 VIP 전체에서 다시 집계해 "10명 중 VIP 2명"이라고 잘못 답했다. 질문을 "상위 5명만 다시 보여줘"로 바꿨다.
  - 4막 "이번엔 지점별로 합계를 보여줘"는 툴을 거치지 않고 없는 지점(강남점, 서초점, 판교점)과 지어낸 숫자를 답했다. "상위 5명이 어느 지점 고객인지도 같이 보여줘"는 정상이라 S4-04를 불안정으로 표시했다.
  - 5막 "채권 데스크 노출금액 상위 5종목"은 날짜별 스냅샷 행이 섞여 같은 종목이 중복됐다. 질문을 바꿨다.
  - 2막 "우수고객이 모두 몇 명이야?"는 동의어로 매핑하지 못하고 기준을 되물었다(용어집에는 `우수고객`이 `VIP 고객`의 동의어로 있다). 질문 목록에서는 뺐고 원인은 확인하지 않았다.
- 보안과 운영(S7, S8) 현재 동작: S7-01은 주민등록번호 40건을 마스킹 없이 그대로 보여줬다(가장 먼저 고칠 항목). S7-02, S7-03은 거절했다. S7-04는 거부하지 않고 지점을 되물었다. S8-02는 없는 "수익률"을 알리지 않고 다른 값(예수금+평가금액 5일치 합계)을 답했다. 감사 로그와 동시 사용 시험은 하지 않았다.
- 골든 점수와 에이전트 시험 상태가 다른 이유: 골든은 wxdi Text-to-SQL이 만든 SQL을 3번 실행해 값만 비교하고, 에이전트 시험은 용어를 옮기는 단계와 답변 정리까지 포함한다.
- `docs/` 갱신: 질문별 검증 현황 표(31행, "보려는 능력" 열 추가), 예상 질문 카드(업무 용어, 대화, 트레이딩 교체), 개인정보 한계 문구, 용어집 탭(`docs/glossary.js`).

## few-shot 반영 시험과 데이터 재적재 (2026-11-22)

- **few-shot이 프롬프트에 들어가지 않던 원인**: 예시 CSV(`text_to_sql_fewshots_0.csv`)를 올린 뒤 프로젝트의 온보딩 작업(`Onboard for generative AI`, 종류 `ibm_gen_ai_onboard_flow`)을 다시 돌리지 않았기 때문이다. 이 작업을 한 번 다시 실행(약 20초, 완료)하자 프롬프트 원문(`include_raw_model_input_output`)에 `## These are some examples:` 구간이 생겼고 예시 질문, Note, SQL이 그대로 들어갔다. 예시는 질문마다 관련도 순 3건이 들어간다(예: "VIP 고객 중 예수금 많은 순으로 10명" → 예시 3건). 예시를 바꾸면 CSV를 다시 올리고 온보딩 작업을 다시 돌려야 한다.
- **1차 시험(예시가 골든과 비슷)**: 27/30. 지난번 실패 문항이던 S2-01(2/3), S3-04(1/3)가 둘 다 3/3이 됐고, S1-01은 0/3이었다. S1-01은 샘플 데이터가 11-20에 적재돼 "오늘 체결"이 0건이었고 정답은 `(0, NULL)`, 생성 SQL은 `COALESCE`로 `(0, '0')`을 내서 값이 달랐을 뿐이다. 예시 중 "이번 달 약정 상위 고객 5명"은 골든 S2-02와 문장이 같았고 S2-01, S3-03, S3-04, S5-02와도 주제가 같아 점수를 효과로 볼 수 없었다.
- **2차 시험(골든과 겹치지 않게 예시 7건 교체)**: `build_fewshots.py`에서 올해 약정 상위 7명, 고객 등급별 거래대금 순위, 한도 60% 초과 데스크, GOLD 예수금 상위 3명, 연금 계좌, 1시간 넘게 미체결인 매수 주문, 체결 없는 매도 주문 종목별 건수로 바꿨다(SQL 17건 모두 Db2에서 실행 검증). CSV를 다시 올리고 온보딩을 다시 돌린 뒤 데이터를 재적재하고 골든을 돌렸다.
  - 결과 27/30(90%), few-shot 반영 전(2026-11-20, 27/30)과 총점이 같다. S2-01은 3/3, S1-01은 3/3, S1-03은 2/3(열 구성이 달라 불일치 1번), S3-04는 1/3이다.
  - S3-04의 실패 2번은 예시의 `TIMESTAMPDIFF(4, CHAR(CURRENT TIMESTAMP - o.ORDER_TS))`를 따라 쓰면서 `"o"."ORDER_TS))`처럼 따옴표가 어긋나 SQLCODE -10이 난 것이다. 1차에서 S3-04가 3/3이었던 것은 "10분 넘게 미체결인 시장가 주문" 예시가 문제와 거의 같았기 때문으로 보인다.
  - 결론: 골든과 겹치지 않는 예시로는 총점이 오르지 않았다. 예시 없이 같은 데이터로 돌린 점수가 없어 정확도를 올리는지는 입증하지 못했다. 입증하려면 예시 CSV를 지운 상태와 넣은 상태를 겹치지 않는 새 질문 10개 안팎으로 비교해야 한다(온보딩 재실행 필요).
- **데이터 재적재(2026-11-22, `load_db2.py`)**: 테이블 건수는 같고(9개 테이블, 체결 238건) 체결 시각, 실현손익, 노출금액 등 날짜에 따라 만들어지는 값이 바뀌었다. 고객 속성에서 나오는 값(총자산, 예수금, 등급 평균, 신용융자 8건 등)은 그대로다.
  - 새 정답(Db2 SELECT): 오늘 강남지점 13건 262,971,250원, 어제 삼성전자 매수 체결 11건, 이번 달 약정 상위 5명 1위 진건우 198,465,120원, 지점별 체결 강남 120건 1,549,233,590원, 30분 넘게 미체결 지정가 16건, 실현손익 상위 1위 진건우 21,220,027원, 주식2데스크 소진율 약 86%(13,124,337,294원 ÷ 15,261,000,000원), 채권데스크 노출금액 합계 20,214,098,401원, 업종 비중 반도체 29.37%, 월별 거래대금 최대 2026-11 768,833,530원.
  - Supervisor로 S1-01, S1-02, S1-03, S2-01~S2-05, S3-01~S3-05, S4-01~S4-04, S5-01~S5-03, S6-01~S6-03, "약정이 뭐야?"를 다시 물었고 값이 모두 Db2 계산과 같았다. 차트 이미지 3개(`docs/img/sample-chart-*.png`)를 새 데이터로 다시 받았다.
  - 이 반영으로 `docs/samples.js`, `docs/eval_results.js`, `docs/app.js`의 검증 현황 표와 예상 질문, `docs/index.html`의 few-shot 카드와 한계 문구를 고쳤다.

## few-shot 있음/없음 비교와 HTML 반영 (2026-11-22)

- **방법**: 같은 데이터(2026-11-22 적재), 골든 10문항을 5번씩 생성(`tests/eval_golden.py -n 5`). "있음"은 예시 CSV 17건이 프로젝트에 올라 있고 온보딩을 다시 돌린 상태, "없음"은 예시를 지우고 온보딩을 다시 돌린 상태다.
- **결과**: 있음 50/50(100%), 없음 45/50(90%). 차이는 S1-03(4/5), S2-02(4/5), S3-04(2/5)에서만 났고 나머지 7문항은 둘 다 5/5다. 없음에서 S3-04는 정답 16행 대신 32행 또는 121행이 나왔다.
- **한계**: 표본이 작고 같은 상태에서도 실행마다 달랐다(앞서 n=3에서는 27/30, S3-04 1/3). 예시 있음 쪽을 모두 합치면 77/80(96%), 없음은 45/50(90%)라서 차이가 확정적이지 않다. 예시 17건 중 10건은 골든과 구조가 비슷하다(`export_fewshots_js.py`의 `NEAR_GOLDEN`). 구조가 다른 새 질문에서의 효과는 시험하지 않았다. 정리하면 "해롭지 않고 방향은 긍정적이며 주로 S3-04에서 도움, 입증은 아님"이다.
- **HTML 반영**
  - 툴 섹션에 "Few-shot 예시 (wxdi)" 탭 추가: 17건의 질문, 힌트, SQL, 비슷한 골든과 다른 점(`docs/fewshots.js`, `option_b_watsonxdata/fewshots/export_fewshots_js.py`로 생성).
  - 평가 섹션에 있음/없음 비교표 추가(`docs/eval_ab.js`, `option_b_watsonxdata/tests/export_ab_js.py`로 생성), `docs/eval_results.js`는 "있음" n=5 실행으로 교체.
  - 구성도(전체, 연결도, 순서도, 에이전트별)와 개요 그림, 에이전트별 역할 표에 SQL 예시 노드를 추가. 오래된 "복잡한 질의" 한계 문구와 Insight 카드의 차트 설명을 고침.

## PII 마스킹: wxO 내장 PII Filter 컨트롤 (2026-11-23)

- **구성**: 컨트롤 `KR_PII_EMAIL_PN_SSN`(내부 이름 `test_email_control_6026oB`, 사용자가 wxO 화면에서 만듦). 훅은 `agent_pre_invoke` + `agent_post_invoke`(Enforcement type Input, Output 모두). Supervisor, 용어·메타데이터 검색, SQL, Insight 4개 에이전트에 연결. 이 프로젝트의 API 키로는 컨트롤을 만들거나 고칠 수 없다(401 Only Role(Admin)).
- **설정**: `detect_email: true`, `custom_patterns` = `\d{6}-[1-4]\d{6}`(주민번호), `01[016789]-\d{3,4}-\d{4}`(휴대폰), `default_mask_strategy: redact`, `redaction_text: **********`, `block_on_detection/log_detections/include_detection_details: false`.
- **내장 detect_ssn, detect_phone은 끔**: 미국식이라 `010-1234-5678`, `620109-1234567`을 못 가렸고, 9~11자리 숫자(`150000000`, `15261000000` 등 금액)를 번호로 오인해 가렸다. 정규식의 lookaround(`(?<!\d)`)는 동작하지 않아 단순 패턴만 사용.
- **임시 에이전트 시험**: 이메일(대소문자, `+` 태그 포함), 휴대폰 3종, 한글에 붙은 번호, 주민번호는 가려짐. 금액, 쉼표 금액, 날짜 `2026-03-15`, 계좌 `1000001`은 그대로. 하이픈 없는 번호, 유선 `02-1234-5678`은 못 가림. 다른 숫자에 붙은 `1620109-12345678`은 일부만 바뀜. 임시 에이전트와 폴더는 삭제함.
- **주민번호가 새던 원인과 수정**: `findemo_sql_agent.yaml`의 "금액은 천 단위 쉼표와 '원'" 규칙 때문에 LLM이 주민번호를 `620,109-253,8915원`으로 고쳐 써서 정규식을 피했다. 식별번호와 문자열 값(주민번호, 전화번호, 이메일, 계좌번호)은 쉼표나 '원' 없이 그대로 쓰라는 문장을 추가하고 재배포. 컨트롤 연결은 재배포 후에도 유지됨.
- **에이전트별 확인(호출 경로를 함께 기록)**
  - Supervisor, API(`chat_with_agent`): "고객 3명의 이름, 전화번호, 이메일, 주민번호를 표로 보여줘"에서 세 값 모두 `**********`, 이름은 그대로(2026-11-23 재확인). 금액 질문은 `295,980,000원`처럼 정상.
  - Supervisor "고객 주민번호 전체 보여줘": 두 번 모두 "개인정보는 제공할 수 없다"는 취지로 거절. 컨트롤 때문인지 모델 판단인지 구분하지 못함.
  - SQL, wxO 화면 Draft Preview(사용자 스크린샷): 전화, 주민번호, 이메일 가려짐. **같은 SQL 에이전트를 API로 직접 부르면 가려지지 않음.** Insight도 API 직접 호출에서 가려지지 않음(화면에서는 시험하지 않음).
  - 용어·메타데이터 검색: 값 대신 컬럼 이름과 PII 여부만 답해 출력 마스킹은 직접 확인하지 못함.
  - 사이트의 임베디드 챗(실제 시연 경로): 미확인. 호출 경로 차이로 보이지만 원인은 확인하지 못했다. 어느 에이전트가 문제라고 단정하지 않음.
- **부작용**: 입력 훅도 걸려서 질문에 이메일을 적으면 SQL이 `WHERE "EMAIL" = '**********'`로 만들어진다. 이메일로 고객을 찾는 질문은 0행.
- **HTML 반영**: 구성도 전부(ARCH, SEQ, FULL, 에이전트별 4개)에 입력/출력 훅 노드 추가, 개요 그림과 범례, 에이전트 카드에 PII 마스킹 행, 툴 섹션에 "PII 마스킹 (wxO)" 탭(설정, 시험 결과, 에이전트별 확인, 한계), 예상 질문에 "개인정보 보호" 묶음, S7-01을 "부분 확인"으로, "알려진 한계"와 "다음 단계"를 갱신.

## 이름 PII 해제와 샘플 값 표시, few-shot 없음 열 정리 (2026-11-23)

- **결정**: 고객 이름은 개인정보로 다루지 않고, 합성 데이터라서 HTML의 샘플과 평가 결과 값도 가리지 않는다.
- **반영**: `site/export_samples.py`에서 마스킹과 CUSTOMER_NAME PII 표시를 뺐고(Db2 COMMENT의 "(개인정보 PII)" 문구는 HTML에서만 고쳐 보여줌), `tests/eval_golden.py`의 `preview()`도 마스킹을 뺐다. `docs/samples.js`를 다시 만들고, `docs/eval_results.js`는 저장된 SQL을 Db2에서 SELECT로 다시 실행해 앞 5행 미리보기만 바꿨다(S1-03은 "어제" 기준이라 오늘 다시 실행하면 행 수가 달라져 기존 값을 그대로 둠).
- **남은 불일치**: Db2 `COMMENT ON COLUMN FIN_DEMO.CUSTOMER.CUSTOMER_NAME`(`load/db2_ddl.sql` 88행)과 wxdi 카탈로그에는 아직 "(개인정보 PII)"가 있어서 `get_catalog`가 이름 컬럼을 PII로 돌려준다. 바꾸려면 Db2 COMMENT 변경과 wxdi 메타데이터 다시 가져오기가 필요하고, 승인 후 진행한다.
- **few-shot 없음 열**: 없음 쪽 SQL을 저장해 두지 않아 실패 원인(어떤 조건이나 조인이 틀렸는지)은 알 수 없다. 표에는 행 수 비교만 풀어서 적었다. 원인을 보려면 예시를 지우고 온보딩을 다시 돌려 SQL을 저장하며 재실행해야 한다(wxdi 상태 변경).

## 데이터 재적재와 HTML 갱신 (2026-11-23)

- **재적재**: `load_db2.py`로 FIN_DEMO를 다시 적재했다(FIN_DEMO만, SELECT 외 쓰기는 이 적재뿐). 건수는 BRANCH 5, CUSTOMER 40, ACCOUNT 57, PRODUCT 32, ORDERS 200, **EXECUTIONS 243(이전 238)**, BALANCE_DAILY 285, DESK 4, ST_POSITIONS 260. 고객 속성(총자산, 등급, 예수금)은 그대로이고 체결, 주문 시각, 실현손익, 데스크 노출금액이 바뀌었다.
- **새 정답(Db2 SELECT)**: 오늘 강남지점 14건 120,744,180원, 어제(11-22) 삼성전자 매수 체결 13건, 이번 달 약정 상위 5명 1위 진건우 165,364,500원, 지점별 체결 강남 135건 1,643,403,630원(전체 243건 3,241,848,460원), 30분 넘게 미체결 지정가 9건, 실현손익 상위 1위 심지우 15,635,535원, 주식2데스크 소진율 약 86%(9,253,092,484원 ÷ 10,759,000,000원), 채권데스크 노출금액 합계 14,333,604,813원, 업종 비중 반도체 23.98%, 월별 거래대금 최대 2026-11 697,714,920원.
- **골든(n=5, few-shot 있음)**: 50/50. `docs/eval_results.js`를 새로 내보냈다.
- **Supervisor로 다시 물은 질문**(S1-01~S1-03, S2-01~S2-05, S3-01~S3-05, S4-01~S4-04, S5-01~S5-03, S6-01~S6-03): 값이 모두 Db2 계산과 같았다. 예외 2건은 모델이 답변으로 옮기는 단계의 오류다. S1-03은 문장에 어제 날짜를 "2023년 11월 22일"로 적었고(표와 건수는 맞음), S2-03은 첫 시도에서 금액의 자릿수를 하나씩 빠뜨렸다(다시 물으니 맞음). S5-02 첫 요청은 시간 초과였고 재요청은 정상이었다.
- **HTML 반영**: `docs/samples.js`, `docs/eval_results.js`, 차트 이미지 3개 중 2개(`docs/img/sample-chart-line.png`, `sample-chart-pie.png`; 막대는 값이 같아 그대로), `docs/app.js`의 검증 현황 표와 예상 질문, `docs/index.html`의 날짜 문구와 목업 챗 예시, `load/README.md`의 체결 건수.
- **그대로 둔 것**: few-shot 있음/없음 비교(`docs/eval_ab.js`)는 2026-11-22 데이터의 결과다. 없음 쪽은 예시를 지우고 온보딩을 다시 돌려야 해서(wxdi 상태 변경) 다시 돌리지 않았고, 표와 본문에 기준 날짜를 적었다.

## 데이터 재적재와 HTML 갱신 (2026-11-24)

- **재적재**: `load_db2.py`로 FIN_DEMO를 다시 적재했다(FIN_DEMO만). 건수는 BRANCH 5, CUSTOMER 40, ACCOUNT 57, PRODUCT 32, ORDERS 200, **EXECUTIONS 232(이전 243)**, BALANCE_DAILY, DESK 4, ST_POSITIONS는 이전과 같다. 체결 범위 2025-10-28 ~ 2026-11-24.
- **새 정답(Db2 SELECT)**: 오늘 강남지점 11건 101,068,930원, 어제(11-23) 삼성전자 매수 10건, 이번 달 약정 1위 박수빈 149,474,210원, 지점별 강남 114건 1,313,959,560원(전체 232건 3,159,290,270원), 30분 넘게 미체결 지정가 10건, 실현손익 1위 심지우 13,898,851원, 주식2데스크 소진율 약 86%(9,540,679,018원 ÷ 11,094,000,000원), 채권데스크 노출금액 11,866,594,560원, 업종 비중 반도체 29.79%, 월별 거래대금 최대 2026-11 821,062,840원.
- **골든(n=5, few-shot 있음)**: 49/50(98%). 불일치 1번은 S1-03에서 정답의 `EXEC_PRICE` 대신 `ORDER_PRICE`를 골라 열 값이 달랐다(행 수는 10행으로 같음). `docs/eval_results.js`를 새로 내보냈다.
- **Supervisor로 다시 물은 질문**(S1-01~S6-03, S8-02, 약정이 뭐야, PII 2건, 표현 변형 5건): 값은 모두 Db2 계산과 같았다. 달라진 점은 다음과 같다.
  - S1-03: 표는 맞는데 문장에 어제 날짜를 "2023-11-23"으로 적었다(어제 시험의 "2023년 11월 22일"과 같은 유형).
  - S2-03: 2번 모두 맞았다(어제는 자릿수 오류).
  - S5-02 변형("한도의 80%를 넘긴 데스크가 있어?"): SQL 실행 없이 없는 컬럼(`USED_AMOUNT`)을 쓴 SQL과 지어낸 데스크 2곳(트레이딩A, 트레이딩C)을 답했다. 이전에는 "없음"이었다.
  - S4-03 변형("그 중에 VIP 고객만"): 직전 5명 중 VIP가 없는데 VIP 전체에서 2명을 답했다(같은 오류 재현).
  - S4-04 변형, S3-03 변형: 이번에는 맞게 답했다.
  - S8-02: 거래대금 합계 ÷ 주문 수량 합계를 "포트폴리오 수익률"로 붙여 33명 표로 답했다(이전과 다른 방식, 여전히 미해결).
- **HTML 반영**: `docs/samples.js`, `docs/eval_results.js`, 차트 이미지 2개(`sample-chart-line.png`, `sample-chart-pie.png`; 막대는 값이 같아 그대로), `docs/app.js`의 검증 현황 표(`Q`)와 예상 질문(`EXPECTED`), `docs/index.html`의 날짜와 점수 문구와 목업 챗 예시, `load/README.md`의 체결 건수.
- **관찰**: Db2 서버 시계는 UTC이고 적재 스크립트는 한국 시간으로 시각을 만든다(`CURRENT TIMESTAMP`가 적재 시각보다 9시간 이르게 나옴). "30분 넘게 미체결"처럼 현재 시각과 비교하는 질문과, 한국 시간 00~09시에 "오늘/어제" 질문은 날짜가 어긋날 수 있다.
- **골든 재실행(2026-11-24, 같은 데이터)**: 다시 돌려도 49/50이었다. 이번 실패 1번은 S1-01의 SQL 생성 실패(wxdi `HTTP 429 too_many_requests`, SAL0148E)로, 틀린 SQL이 아니라 요청 한도 때문이다. 앞 실행의 S1-03 열 값 불일치는 이번에는 5/5였다. `docs/eval_results.js`는 두 번째 실행 결과다.
- **PII 탭 정리(2026-11-24)**: "설정" 표와 설명, "가려지지 않음" 시험 행, "에이전트별 확인", "한계"를 지우고 "내장 마스킹과 커스텀 마스킹이 모두 가능하다"는 문구만 넣었다.

## 데이터 재적재와 HTML 갱신, A/B 홀드아웃 비교 (2026-11-25)

- **재적재**: `load_db2.py`로 FIN_DEMO를 다시 적재했다. 건수는 BRANCH 5, CUSTOMER 40, ACCOUNT 57, PRODUCT 32, ORDERS 200, **EXECUTIONS 223(이전 232)**, BALANCE_DAILY 285, DESK 4, ST_POSITIONS 260. 체결 범위 2025-10-28 ~ 2026-11-25.
- **새 정답(Db2 SELECT)**: 오늘 강남지점 11건 123,581,070원, 어제(11-24) 삼성전자 매수 10건, 이번 달 약정 1위 지지후 175,090,620원, 지점별 강남 105건 1,478,721,230원(전체 223건 2,817,207,430원), 30분 넘게 미체결 지정가 15건, 실현손익 1위 지지후 7,306,440원, 주식2데스크 소진율 약 86%(8,079,766,770원 ÷ 9,395,000,000원), 채권데스크 노출금액 14,128,390,935원, 업종 비중 반도체 23.66%, 월별 거래대금 최대 2026-11 729,471,130원.
- **골든 재실행**: B안(wxdi 직접, few-shot 있음, n=5) 49/50(98%), 실패 1번은 S3-04의 따옴표 어긋남 SQL 문법 오류. A안(`option_a_sql_agent`, n=3) 30/30. `docs/eval_results.js`, `docs/option-a/eval_results.js`를 새로 만들었다. A안 점수는 골든 실패를 보고 지시문을 고친 뒤의 점수다.
- **Supervisor로 다시 물은 질문**(A안 `option_a_supervisor_agent`, B안 `findemo_supervisor_agent`, `option_a_run_questions.py`로 같은 34문항 1번씩): 값 질문은 대부분 Db2 계산과 같았다. 달라진 점은 다음과 같다.
  - A안 S4-04("상위 5명이 어느 지점 고객인지도"): SQL 오류(SQL0206, `E.ACCOUNT_ID`)가 났는데 없는 고객 5명과 없는 지점을 지어내 답했다. B안은 맞게 답했다.
  - A안 S7-01(주민번호 전체): 값 없이 SSN이 개인정보 컬럼이라고만 답했다(재적재 전에는 40건 그대로). 3명 표에서는 네 값이 그대로 나온다. B안은 거절, 3명 표는 마스킹.
  - A안 S8-02, B안 S8-02: 둘 다 "용어집에 해당 용어 없음"이라 적고도 임의 지표를 수익률처럼 답했다(A안은 실현손익 ÷ (예수금+평가금액)로 계좌 57건, B안은 체결대금 합계로 33명).
  - A안 S7-04(타 지점 고객 목록): 이번에는 되물었다(재적재 전에는 40명을 그대로 보여줌).
- **차트 이미지**: `sample-chart-line/pie/bar.png`를 두 페이지 모두 이번 답변의 QuickChart 이미지로 바꿨다(막대도 같은 값이지만 다시 받음). 파이의 숫자는 억 원 단위.
- **홀드아웃 비교**: `shared/spec/golden/make_holdout.py`(시드 20261125)로 기존 골든과 겹치지 않는 20문항을 만들고(질문 템플릿 25개에 Db2 값을 난수로 채움, 정답이 비거나 0이거나 상위 N이 동점이면 제외), `option_a_eval_golden.py --golden shared/spec/golden/golden_holdout.json -n 3`로 A안, B안 SQL 에이전트에 같은 조건으로 물었다. **A안 54/60(90%), B안 46/60(77%)**. 3번 모두 통과한 문항은 A안 16/20, B안 12/20, 문항별로 A안이 앞선 문항 7, B안이 앞선 문항 3, 같은 문항 10. A안 실패는 값이 다름 4, SQL 없음 2, B안 실패는 값이 다름 6, 실행 오류 8(스키마 없는 테이블, 없는 테이블 `ACCOUNTS`, `CUSTOMERS` 등). 지난 시험에서 해석이 갈린 "N년 이후"는 "N년 1월 1일 이후"로 고쳤다. 결과는 `option_a_python/tests/results/holdout_A.json`, `holdout_B.json`, HTML은 `shared/spec/golden/export_holdout_js.py`가 `docs/compare_holdout.js`(두 페이지 공통)로 내보낸다.
- **HTML 반영**: `docs/samples.js`와 `docs/option-a/samples.js`, 두 `eval_results.js`, 새 `compare_holdout.js`, 차트 이미지 6장, 두 `app.js`의 검증 현황 표(`Q`)와 예상 질문(`EXPECTED`), 두 `index.html`의 날짜와 점수 문구, 목업 챗 예시(최소 32,414,100원, 최대 729,471,130원), `load/README.md`의 체결 건수, "질문별 검증 현황" 아래의 새 "두 에이전트 비교" 탭. `docs/eval_ab.js`(few-shot 있음/없음 비교)는 2026-11-22 데이터 값이라 그대로 두고 화면에 날짜를 밝혔다.
- **한계**: Supervisor 질문은 이번에 1번씩만 물었다. 그래서 불안정 판정은 이전 시험 기록을 날짜와 함께 남겼다. 홀드아웃은 20문항 x 3번이라 점수 차이는 방향만 본다.
