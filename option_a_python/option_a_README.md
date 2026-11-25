# A안 (SQL 생성만 wxO)

B안과 같은 구성이되, SQL 생성만 바꿨다. B안은 `generate_sql`에서 wxdi Text-to-SQL을 불렀다. A안은 wxO 에이전트의 LLM(`groq/openai/gpt-oss-120b`)이 SQL을 직접 쓴다. 용어집과 카탈로그는 B안처럼 wxdi에서 읽는다. B안 파일은 수정하지 않았고, 모든 파일과 wxO 자산 이름에 `option_a`를 붙였다.

| | B안 | A안 |
|---|---|---|
| 용어집 (`map_terms`) | wxdi | wxdi (같은 방식, `option_a_map_terms`) |
| 카탈로그 (`get_catalog`) | wxdi | wxdi (`option_a_get_catalog`, 컬럼 설명과 FK 조인 조건까지 한 번에 반환) |
| SQL 생성 | wxdi `generate_queries` | wxO 에이전트(gpt-oss-120b)가 용어 정의와 카탈로그를 보고 직접 작성 |
| SQL 실행 | `run_sql` (Db2) | `option_a_run_sql` (Db2) |
| 오류 재시도 | generate_sql에 이전 SQL과 오류를 넘김 | 에이전트가 오류 메시지를 보고 SQL을 고쳐 재실행 (최대 2회) |

## 구성

- 에이전트(B안과 같은 4개): `option_a_supervisor_agent`, `option_a_context_agent`(용어·메타데이터 검색), `option_a_sql_agent`, `option_a_insight_agent`
- 툴: `option_a_map_terms`, `option_a_get_catalog`, `option_a_run_sql`, `option_a_make_chart`
- 연결: `option_a_wxdi`(url, api_key, project_id), `option_a_db2`

```
option_a_python/
├── wxo/agents/       option_a_{supervisor,context,sql,insight}_agent.yaml
├── wxo/connections/  option_a_{db2,wxdi}.yaml
├── wxo/tools/        option_a_{sql,context,chart}_tools.py, option_a_requirements.txt
├── wxo/scripts/      option_a_import_all.sh
└── tests/option_a_eval_golden.py
```

## 올리기와 평가

```
bash option_a_python/wxo/scripts/option_a_import_all.sh
./venv/bin/python option_a_python/tests/option_a_eval_golden.py [-n 3] [ID ...]
```

평가는 `shared/spec/golden/golden.json` 10문항을 `option_a_sql_agent`에 보내고, 답변의 SQL을 Db2에서 실행해 골든 결과와 비교한다. 지시문 보정 후 3회 모두 10/10(30/30). 정리 페이지는 `docs/option-a/`(B안 페이지와 같은 구성, 초록 테마)이며, 평가 결과는 `option_a_python/tests/option_a_make_eval_js.py`로 `eval_results.js`에 옮기고, 질문별 시험은 `option_a_run_questions.py`로 돌린다.
