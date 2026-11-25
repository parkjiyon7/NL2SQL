"""A안 정리 페이지(docs/option-a/index.html)를 평가 결과 JSON으로 생성한다.

사용법: python3 option_a_python/tests/option_a_build_page.py
입력: option_a_python/tests/results/option_a_eval_r{1,2,3}.json (option_a_eval_golden.py --json 결과)
"""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
runs = [json.loads((ROOT / f"option_a_python/tests/results/option_a_eval_r{i}.json").read_text(encoding="utf-8"))
        for i in (1, 2, 3)]
items = runs[0]["items"]
passes = {it["id"]: sum(r["items"][k]["runs"][0]["pass"] for r in runs) for k, it in enumerate(items)}
total_ok = sum(passes.values())
total = 3 * len(items)
e = html.escape

rows, details = [], []
for it in items:
    p = passes[it["id"]]
    rows.append(f"<tr><td><code>{it['id']}</code></td><td>{e(it['question'])}</td>"
                f"<td><span class='tag ok'>{p}/3</span></td></tr>")
    details.append(f"<details><summary>{it['id']}<span class='q'>{e(it['question'])}</span></summary>"
                   f"<h3>wxO 에이전트(gpt-oss-120b)가 쓴 SQL</h3><pre><code>{e(it['runs'][0]['sql'])}</code></pre>"
                   f"<h3>골든 SQL</h3><pre><code>{e(it['golden_sql'])}</code></pre></details>")

page = f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>A안 - wxO로 SQL을 만드는 Text-to-SQL</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="layout">
<nav class="side">
  <div class="brand">Text-to-SQL <span>A안</span></div>
  <div class="sub">SQL 생성만 wxO</div>
  <a href="#summary">요약</a>
  <a href="#diff">B안과 달라진 점</a>
  <a href="#flow">구성도</a>
  <a href="#agents">에이전트</a>
  <a href="#tools">툴과 연결</a>
  <a href="#eval">골든 평가</a>
  <a href="#fix">평가로 찾은 문제</a>
  <a href="#run">재현 방법</a>
  <div class="other">B안 데모는 <a href="../">상위 페이지</a>에 있습니다.</div>
</nav>
<main>
<section id="summary">
<p class="eyebrow">OPTION A</p>
<h1>SQL을 wxO 에이전트가 직접 씁니다</h1>
<p class="lead">B안과 같은 구성에서 한 가지만 바꿨습니다. B안은 <code>generate_sql</code>에서 watsonx.data intelligence(wxdi) Text-to-SQL을 호출합니다. A안은 watsonx Orchestrate(wxO)의 <code>gpt-oss-120b</code> 에이전트가 wxdi 용어집과 카탈로그를 읽고 Db2 SQL을 작성합니다. 용어집, 카탈로그, Db2 실행은 그대로입니다.</p>
<div class="cards">
  <div class="card"><div class="num">{total_ok}/{total}</div><div class="lbl">골든 10문항 x 3회 통과 (지시문 보정 후)</div></div>
  <div class="card"><div class="num">1</div><div class="lbl">B안에서 바꾼 부분: SQL 생성</div></div>
  <div class="card"><div class="num">0</div><div class="lbl">수정한 B안 파일</div></div>
</div>
</section>

<section id="diff">
<h2>B안과 달라진 점</h2>
<table>
<tr><th>단계</th><th>B안</th><th>A안</th><th></th></tr>
<tr><td>용어집</td><td>wxdi 용어집 (<code>map_terms</code>)</td><td>wxdi 용어집 (<code>option_a_map_terms</code>)</td><td><span class="tag same">같음</span></td></tr>
<tr><td>카탈로그</td><td>wxdi 카탈로그 (<code>get_catalog</code>)</td><td>wxdi 카탈로그 (<code>option_a_get_catalog</code>). 컬럼 설명과 FK 조인 조건까지 한 번에 반환</td><td><span class="tag same">같음</span></td></tr>
<tr class="changed"><td>SQL 생성</td><td>wxdi <code>generate_queries</code> 호출</td><td>wxO 에이전트가 <code>gpt-oss-120b</code>로 직접 작성</td><td><span class="tag ok">변경</span></td></tr>
<tr class="changed"><td>오류 재시도</td><td><code>generate_sql</code>에 이전 SQL과 오류를 넘겨 재생성</td><td>에이전트가 오류 메시지를 읽고 SQL을 고쳐 재실행 (최대 2회)</td><td><span class="tag ok">변경</span></td></tr>
<tr><td>SQL 실행</td><td>Db2 (<code>run_sql</code>)</td><td>Db2 (<code>option_a_run_sql</code>)</td><td><span class="tag same">같음</span></td></tr>
<tr><td>차트</td><td><code>make_chart</code></td><td><code>option_a_make_chart</code></td><td><span class="tag same">같음</span></td></tr>
</table>
<p class="muted">wxO에 올린 자산과 파일 이름은 모두 <code>option_a</code> 접두사를 붙였고, B안 코드와 wxO 자산은 건드리지 않았습니다.</p>
</section>

<section id="flow">
<h2>구성도</h2>
<div class="flow">
  <div class="row"><div class="node hl"><b>option_a_supervisor_agent</b><small>의도 분류, 모호한 질문 되묻기, 하위 에이전트 호출, 근거 정리</small></div></div>
  <div class="arrow">▼</div>
  <div class="row">
    <div class="node hl"><b>option_a_sql_agent</b><small>값 조회. 용어 확인 → 카탈로그 → SQL 작성 → 실행 → 오류 시 수정</small></div>
    <div class="node hl"><b>option_a_insight_agent</b><small>차트(line, bar, pie)와 원인 설명. 직접 SQL을 쓰고 실행</small></div>
  </div>
  <div class="arrow">▼</div>
  <div class="row">
    <div class="node"><b>option_a_map_terms</b><small>wxdi 용어집 조회</small></div>
    <div class="node"><b>option_a_get_catalog</b><small>wxdi 카탈로그 조회</small></div>
    <div class="node"><b>option_a_run_sql</b><small>Db2 SELECT 실행</small></div>
    <div class="node"><b>option_a_make_chart</b><small>차트 이미지 조립</small></div>
  </div>
  <div class="arrow">▼</div>
  <div class="row">
    <div class="node ext"><b>watsonx.data intelligence</b><small>용어집, 카탈로그 (Text-to-SQL은 사용하지 않음)</small></div>
    <div class="node ext"><b>Db2 FIN_DEMO</b><small>9개 테이블, 읽기 전용 실행</small></div>
  </div>
</div>
</section>

<section id="agents">
<h2>에이전트</h2>
<table>
<tr><th>이름</th><th>모델 / style</th><th>역할</th></tr>
<tr><td><code>option_a_supervisor_agent</code></td><td>gpt-oss-120b / react_core</td><td>질문 분류, 모호한 질문(수익, 최근, 상위) 되묻기, 하위 에이전트 응답 정리</td></tr>
<tr><td><code>option_a_sql_agent</code></td><td>gpt-oss-120b / react_core</td><td><code>option_a_map_terms</code> → <code>option_a_get_catalog</code> → SQL 작성 → <code>option_a_run_sql</code>. Db2 문법, 날짜, 한국어 숫자 단위 규칙은 지시문에 둠</td></tr>
<tr><td><code>option_a_insight_agent</code></td><td>gpt-oss-120b / react_core</td><td>SQL 작성과 실행 후 <code>option_a_make_chart</code>로 차트 생성. "왜 늘었어"는 드릴다운 SQL 한 번 더 실행</td></tr>
</table>
<p class="muted">업무 용어의 뜻(약정 = 거래대금, 미체결, 스냅샷 테이블 처리 등)은 지시문이 아니라 wxdi 용어집에서 가져옵니다.</p>
</section>

<section id="tools">
<h2>툴과 연결</h2>
<table>
<tr><th>툴</th><th>하는 일</th><th>연결</th></tr>
<tr><td><code>option_a_map_terms</code></td><td>질문 속 용어와 동의어를 wxdi 용어집에서 찾아 정의(<code>glossary_hints</code>)와 대응 컬럼을 반환</td><td><code>option_a_wxdi</code></td></tr>
<tr><td><code>option_a_get_catalog</code></td><td>wxdi 카탈로그에서 테이블, 컬럼 설명, PK, FK 조인 조건을 읽어 스키마 텍스트로 반환</td><td><code>option_a_wxdi</code></td></tr>
<tr><td><code>option_a_run_sql</code></td><td>단일 SELECT 또는 WITH만 실행. 그 외는 <code>blocked</code>. 실패해도 예외 대신 <code>error</code> 필드를 채움</td><td><code>option_a_db2</code></td></tr>
<tr><td><code>option_a_make_chart</code></td><td>실행 결과를 차트 이미지, 요약, 표, 근거 SQL로 조립</td><td>없음</td></tr>
</table>
</section>

<section id="eval">
<h2>골든 평가</h2>
<p>골든 10문항을 <code>option_a_sql_agent</code>에 보내고, 답변의 SQL을 Db2에서 실행해 골든 SQL 결과와 비교했습니다. 행 수가 같고 골든의 각 행 값이 결과에 모두 있으면 통과입니다(컬럼 순서, 이름, 추가 컬럼은 무관). 문항당 3회 실행했고, 아래는 지시문 보정 후 결과입니다.</p>
<table>
<tr><th>ID</th><th>질문</th><th>통과</th></tr>
{''.join(rows)}
</table>
<p><b>합계 {total_ok}/{total}.</b> 문항을 펼치면 에이전트가 쓴 SQL과 골든 SQL을 볼 수 있습니다(첫 번째 실행 기준).</p>
{''.join(details)}
<div class="note">용어집 정의는 B안과 같은 wxdi 용어집을 씁니다. 그래서 이 수치는 "wxdi 용어집과 카탈로그를 제공받은 gpt-oss-120b"의 결과이며, 메타데이터 없이 모델만 쓴 결과가 아닙니다. 감독 에이전트를 거친 전체 경로는 이 평가에 포함하지 않았습니다.</div>
</section>

<section id="fix">
<h2>평가로 찾은 문제</h2>
<p>보정 전 평가에서는 <code>S3-03</code>(업종 내 순위) 한 문항이 불일치여서 10문항 중 9개만 통과하는 실행이 있었습니다. 에이전트가 질문에 없던 <code>FETCH FIRST 20 ROWS ONLY</code>를 SQL에 붙여 32행 중 20행만 가져온 것이 원인이었습니다. 지시문의 "표는 20행까지 보여준다"는 답변 규칙을 SQL 제한으로 잘못 옮긴 것입니다.</p>
<p>"개수를 정하지 않은 질문에는 <code>FETCH FIRST</code>를 붙이지 않고, 20행 제한은 답변에서만 적용한다"는 규칙을 <code>option_a_sql_agent</code>와 <code>option_a_insight_agent</code> 지시문에 추가한 뒤 3회 모두 10/10이었습니다.</p>
</section>

<section id="run">
<h2>재현 방법</h2>
<pre><code># wxO에 연결, 툴, 에이전트 올리기 (루트 .env의 DB2_*, WXDI_* 사용)
bash option_a_python/wxo/scripts/option_a_import_all.sh

# 골든 평가
./venv/bin/python option_a_python/tests/option_a_eval_golden.py [-n 3] [--json 결과.json] [ID ...]

# 이 페이지 다시 만들기
python3 option_a_python/tests/option_a_build_page.py</code></pre>
<p class="muted">파일 위치: <code>option_a_python/wxo/{{agents,connections,tools,scripts}}</code>, <code>option_a_python/tests</code>, 설명서 <code>option_a_python/option_a_README.md</code></p>
</section>
<footer>A안 정리 페이지</footer>
</main>
</div>
</body>
</html>
"""
(ROOT / "docs/option-a/index.html").write_text(page, encoding="utf-8")
print(total_ok, total, passes)
