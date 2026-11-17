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
- **발견: 가져온 용어의 `synonyms`가 비어 있다.** CSV의 Synonyms 열은 다른 용어 참조를 기대해서 약정, 잔고 같은 동의어가 wxdi에 연결되지 않았다. wxdi Text-to-SQL도 이 동의어를 모른다. `map_terms`는 툴 안의 `SYNONYMS`로 보완한다. 동의어를 제품에 넣으려면 동의어 용어를 따로 만들어야 한다.
- 확인한 질문: "약정 상위 고객" 매핑(약정 → 거래대금, EXECUTIONS.EXEC_AMOUNT), "고객 테이블 개인정보 컬럼"(CUSTOMER_NAME, SSN, PHONE, EMAIL), "체결에서 고객까지 조인 경로"(EXECUTIONS, ORDERS, ACCOUNT, CUSTOMER).
