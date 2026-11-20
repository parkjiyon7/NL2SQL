(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------- 다이어그램 원문 ---------- */
  var ARCH = [
    "flowchart TB",
    '  U["사용자 (홈페이지 챗)"] --> SUP["Supervisor<br/>findemo_supervisor_agent"]',
    '  SUP --> CTX["용어·메타데이터 검색 에이전트<br/>(용어, 구조 질문 전용)"]',
    '  SUP --> SQLA["SQL 에이전트"]',
    '  SUP --> INS["Insight 에이전트"]',
    '  CTX --> T1["map_terms (공용)"]',
    '  CTX --> T2["get_catalog"]',
    '  SQLA --> T1',
    '  SQLA --> T3["generate_sql"]',
    '  SQLA --> T4["run_sql"]',
    '  INS --> T1',
    '  INS --> T3',
    '  INS --> T4',
    '  INS --> T5["make_chart"]',
    '  T1 --> G["wxdi 용어집"]',
    '  T2 --> C["wxdi 카탈로그 (프로젝트 자산)"]',
    '  T3 -->|"FK 조인 조건 읽기"| C',
    '  T3 -->|"질문 + Note"| TS["wxdi Text-to-SQL REST<br/>(내부 LLM: Llama 3.3 70B)"]',
    '  T4 --> DB[("Db2 FIN_DEMO")]',
    '  T5 --> CH["차트 스펙, 텍스트 렌더링"]'
  ].join("\n");

  var SEQ = [
    "sequenceDiagram",
    "  autonumber",
    "  actor U as 사용자",
    "  participant S as Supervisor",
    "  participant I as Insight",
    "  participant W as wxdi",
    "  participant D as Db2",
    "  U->>S: 월별 거래대금 추이를 라인 차트로",
    "  S->>I: 차트 요청",
    "  I->>W: map_terms (용어집 조회)",
    "  W-->>I: 거래대금 = EXEC_AMOUNT (약정 같은 동의어도 같은 용어)",
    "  I->>W: generate_sql (표준 용어로 바꾼 질문 + 용어 정의)",
    "  W->>W: 카탈로그에서 FK 조인 조건을 읽어 Note로 첨부",
    "  W-->>I: SQL",
    "  I->>D: run_sql",
    "  D-->>I: 월별 집계 행",
    "  I->>I: make_chart (line)",
    "  I-->>S: 차트와 요약",
    "  S-->>U: 답변 + 근거 보기"
  ].join("\n");

  /* ---------- 에이전트별 구조도 (wxO = 파랑, wxdi = 초록, Db2 = 주황) ---------- */
  function agentDiagram(lines) {
    return ["flowchart TB"].concat(lines, [
      "  classDef wxo fill:#dbeafe,stroke:#1b5fc1,stroke-width:2px,color:#0a2a5e",
      "  classDef wxdi fill:#dcfce7,stroke:#0f7b3f,stroke-width:2px,color:#064e2b",
      "  classDef db fill:#ffedd5,stroke:#c2410c,stroke-width:2px,color:#7c2d12",
      "  classDef user fill:#f1f5f9,stroke:#64748b,stroke-width:2px,color:#1f2937",
      "  style WXO fill:#f0f6ff,stroke:#1b5fc1,stroke-width:2px,stroke-dasharray:6 4",
      "  style WXDI fill:#f0fdf4,stroke:#0f7b3f,stroke-width:2px,stroke-dasharray:6 4"
    ]).join("\n");
  }

  var AG_SUP = agentDiagram([
    '  U(["사용자 질문<br/>홈페이지 AI 챗"]):::user --> SUP',
    '  subgraph WXO["watsonx Orchestrate (wxO)"]',
    '    SUP["Supervisor<br/>질문 분류, 되묻기, 맥락 유지, 근거 조립"]:::wxo',
    '    CTX["용어·메타데이터 검색 에이전트"]:::wxo',
    '    SQLA["SQL 에이전트"]:::wxo',
    '    INS["Insight 에이전트"]:::wxo',
    '    SUP -->|"용어, 구조 질문"| CTX',
    '    SUP -->|"값 조회 질문"| SQLA',
    '    SUP -->|"차트, 원인 질문"| INS',
    "  end",
    '  subgraph WXDI["watsonx.data intelligence (wxdi)"]',
    '    GL[("용어집")]:::wxdi',
    '    CAT[("카탈로그")]:::wxdi',
    '    TS["Text-to-SQL<br/>Llama 3.3 70B"]:::wxdi',
    '    GL ~~~ CAT ~~~ TS',
    "  end",
    '  DB[("Db2 FIN_DEMO")]:::db',
    '  CTX -->|"map_terms, get_catalog"| WXDI',
    '  SQLA -->|"map_terms, generate_sql"| WXDI',
    '  INS -->|"map_terms, generate_sql"| WXDI',
    '  SQLA -->|"run_sql"| DB',
    '  INS -->|"run_sql"| DB',
    '  SUP --> R(["표, 차트, 설명<br/>+ 근거 보기"]):::user'
  ]);

  var AG_CTX = agentDiagram([
    '  U(["용어, 구조 질문<br/>예: 약정이 뭐야?"]):::user --> CTX',
    '  subgraph WXO["watsonx Orchestrate (wxO)"]',
    '    CTX["용어·메타데이터 검색 에이전트<br/>findemo_context_agent"]:::wxo',
    '    M["map_terms<br/>질문 속 용어를 표준 용어와 컬럼에 연결"]:::wxo',
    '    G["get_catalog<br/>테이블 구조, 키, 개인정보 컬럼 조회"]:::wxo',
    "    CTX --> M",
    "    CTX --> G",
    "  end",
    '  subgraph WXDI["watsonx.data intelligence (wxdi)"]',
    '    GL[("용어집<br/>표준 용어 25 + 동의어 35")]:::wxdi',
    '    CAT[("카탈로그<br/>테이블 9, PK, FK, PII 표시")]:::wxdi',
    "  end",
    '  M -->|"용어, 동의어, 정의 조회"| GL',
    '  G -->|"테이블, 컬럼, 조인 키 조회"| CAT',
    '  CTX --> R(["용어 정의 + 대응 컬럼<br/>+ 조인 경로 + 개인정보 여부"]):::user'
  ]);

  var AG_SQL = agentDiagram([
    '  U(["값 조회 질문<br/>예: 고객별 총 거래 약정 상위 5명"]):::user --> SQLA',
    '  subgraph WXO["watsonx Orchestrate (wxO)"]',
    '    SQLA["SQL 에이전트<br/>findemo_sql_agent"]:::wxo',
    '    T1["① map_terms<br/>동의어를 표준 용어로 보정"]:::wxo',
    '    T2["② generate_sql<br/>카탈로그에서 조인 조건을 조회해 질문 뒤에 첨부"]:::wxo',
    '    T3["③ run_sql<br/>SELECT만 실행"]:::wxo',
    "    SQLA --> T1 --> T2 --> T3",
    "  end",
    '  subgraph WXDI["watsonx.data intelligence (wxdi)"]',
    '    GL[("용어집<br/>표준 용어 25 + 동의어 35")]:::wxdi',
    '    CAT[("카탈로그<br/>테이블 9, FK 8")]:::wxdi',
    '    TS["Text-to-SQL<br/>SQL 생성, Llama 3.3 70B"]:::wxdi',
    '    GL ~~~ CAT ~~~ TS',
    "  end",
    '  DB[("Db2 FIN_DEMO")]:::db',
    '  T1 -->|"용어, 정의 조회"| GL',
    '  T2 -->|"조인 조건 조회"| CAT',
    '  T2 -->|"질문 + Note"| TS',
    '  T3 -->|"SQL 실행"| DB',
    '  T3 --> R(["표 + SQL + 용어 매핑"]):::user'
  ]);

  var AG_INS = agentDiagram([
    '  U(["차트, 원인 질문<br/>예: 업종별 거래대금 비중을 파이 차트로"]):::user --> INS',
    '  subgraph WXO["watsonx Orchestrate (wxO)"]',
    '    INS["Insight 에이전트<br/>findemo_insight_agent"]:::wxo',
    '    T1["① map_terms<br/>동의어를 표준 용어로 보정"]:::wxo',
    '    T2["② generate_sql<br/>카탈로그에서 조인 조건을 조회해 질문 뒤에 첨부"]:::wxo',
    '    T3["③ run_sql<br/>집계 결과 조회"]:::wxo',
    '    T4["④ make_chart<br/>line, bar, pie 차트 작성"]:::wxo',
    "    INS --> T1 --> T2 --> T3 --> T4",
    "  end",
    '  subgraph WXDI["watsonx.data intelligence (wxdi)"]',
    '    GL[("용어집")]:::wxdi',
    '    CAT[("카탈로그")]:::wxdi',
    '    TS["Text-to-SQL<br/>Llama 3.3 70B"]:::wxdi',
    '    GL ~~~ CAT ~~~ TS',
    "  end",
    '  DB[("Db2 FIN_DEMO")]:::db',
    '  T1 -->|"용어, 정의 조회"| GL',
    '  T2 -->|"조인 조건 조회"| CAT',
    '  T2 -->|"질문 + Note"| TS',
    '  T3 -->|"SQL 실행"| DB',
    '  T4 --> R(["차트 + 요약 + 근거 설명"]):::user'
  ]);

  /* ---------- DB 포함 전체 구조도 (솔루션 매핑) ---------- */
  var FULL = agentDiagram([
    '  U(["사용자<br/>홈페이지 AI 챗"]):::user --> SUP',
    '  subgraph WXO["watsonx Orchestrate (wxO)  ·  에이전트 실행"]',
    '    SUP["Supervisor<br/>질문 분류, 되묻기, 맥락 유지"]:::wxo',
    '    CTX["용어·메타데이터 검색<br/>map_terms, get_catalog"]:::wxo',
    '    SQLA["SQL<br/>map_terms, generate_sql, run_sql"]:::wxo',
    '    INS["Insight<br/>map_terms, generate_sql,<br/>run_sql, make_chart"]:::wxo',
    '    subgraph TOOLS["툴 (Python)"]',
    '      T1["map_terms"]:::wxo',
    '      T2["get_catalog"]:::wxo',
    '      T3["generate_sql"]:::wxo',
    '      T4["run_sql"]:::wxo',
    '      T5["make_chart"]:::wxo',
    "    end",
    "    SUP --> CTX",
    "    SUP --> SQLA",
    "    SUP --> INS",
    '    CTX --> TOOLS',
    '    SQLA -->|"툴 호출"| TOOLS',
    '    INS --> TOOLS',
    "  end",
    '  subgraph WXDI["watsonx.data intelligence (wxdi)"]',
    '    GL[("비즈니스 용어집<br/>표준 용어 25 + 동의어 35")]:::wxdi',
    '    CAT[("카탈로그<br/>테이블 9, FK 8, PII 표시")]:::wxdi',
    '    TS["Text-to-SQL (generate_queries REST)<br/>LLM: meta-llama/llama-3-3-70b-instruct<br/>임베딩: granite-embedding-278m-multilingual"]:::wxdi',
    "  end",
    '  DB[("Db2 FIN_DEMO<br/>9개 테이블")]:::db',
    '  T1 -->|"용어, 정의 조회"| GL',
    '  T2 -->|"구조 조회"| CAT',
    '  T3 -->|"FK 조인 조건 조회"| CAT',
    '  T3 -->|"질문 + Note"| TS',
    '  T4 -->|"SELECT 실행"| DB',
    '  TS -.->|"스키마 참조"| CAT',
    '  DB -.->|"메타데이터 가져오기"| CAT'
  ]);

  /* ---------- 화면 / 서브탭 전환 ---------- */
  var rendered = {};
  var mermaidReady = false;

  function showView(name) {
    $$(".stab").forEach(function (b) { b.classList.toggle("active", b.dataset.view === name); });
    $$(".view").forEach(function (v) { v.classList.toggle("active", v.id === "view-" + name); });
    if (name === "demo") renderVisible();
  }

  function showSec(name) {
    $$(".sn").forEach(function (b) { b.classList.toggle("active", b.dataset.sec === name); });
    $$(".sec").forEach(function (s) { s.classList.toggle("active", s.id === "sec-" + name); });
    renderVisible();
  }

  function applyHash() {
    var h = (location.hash || "").replace("#", "");
    var p = h.split("/");
    if (p[0] === "demo") {
      showView("demo");
      if (p[1] && $("#sec-" + p[1])) showSec(p[1]);
    } else {
      showView("home");
    }
    if (typeof syncChat === "function") syncChat();
  }

  $$(".stab").forEach(function (b) {
    b.addEventListener("click", function () {
      location.hash = b.dataset.view === "demo" ? "demo" : "home";
    });
  });
  $$(".sn").forEach(function (b) {
    b.addEventListener("click", function () { location.hash = "demo/" + b.dataset.sec; });
  });
  window.addEventListener("hashchange", applyHash);

  /* ---------- mermaid ---------- */
  function diagramText(key) {
    if (key === "arch") return ARCH;
    if (key === "seq") return SEQ;
    if (key === "full") return FULL;
    if (key === "ag-sup") return AG_SUP;
    if (key === "ag-ctx") return AG_CTX;
    if (key === "ag-sql") return AG_SQL;
    if (key === "ag-ins") return AG_INS;
    if (key === "erd") return (window.SAMPLES && window.SAMPLES.erd) || "";
    return "";
  }

  function renderVisible() {
    $$(".sec.active .diagram").forEach(function (el) {
      var key = el.dataset.key;
      if (rendered[key]) return;
      var src = diagramText(key);
      if (!window.mermaid) {
        el.innerHTML = '<p class="muted">다이어그램 라이브러리(mermaid)를 불러오지 못했습니다. 아래는 원문입니다.</p><div class="fallback">' + esc(src) + "</div>";
        rendered[key] = true;
        return;
      }
      if (!mermaidReady) {
        window.mermaid.initialize({ startOnLoad: false, securityLevel: "loose", theme: "neutral", themeVariables: { fontSize: "15px" },
          flowchart: { htmlLabels: true, curve: "basis", nodeSpacing: 40, rankSpacing: 46, padding: 14 } });
        mermaidReady = true;
      }
      rendered[key] = true;
      Promise.resolve(window.mermaid.render("mm-" + key, src)).then(function (out) {
        el.innerHTML = out.svg || out;
      }).catch(function (e) {
        el.innerHTML = '<p class="muted">다이어그램을 그리지 못했습니다(' + esc(e && e.message) + '). 원문:</p><div class="fallback">' + esc(src) + "</div>";
      });
    });
  }

  /* ---------- 데이터 섹션 ---------- */
  function renderTable(name) {
    var t = window.SAMPLES.tables[name];
    $$("#tbl-tabs button").forEach(function (b) { b.classList.toggle("active", b.dataset.t === name); });
    var h = "<p><b>" + esc(name) + "</b> · " + esc(t.count) + "행 · " + esc(t.desc) + "</p>";
    h += "<h3>컬럼 사전</h3><div class=\"scroll-x\"><table class=\"tbl\"><thead><tr><th>컬럼</th><th>타입</th><th>설명</th><th>표시</th></tr></thead><tbody>";
    t.columns.forEach(function (c) {
      var m = [];
      if (c.pk) m.push("PK");
      if (c.fk) m.push("FK→" + c.fk);
      if (c.pii) m.push('<span class="pii">PII</span>');
      h += "<tr><td><code>" + esc(c.name) + "</code></td><td>" + esc(c.type) + "</td><td>" + esc(c.desc) + "</td><td>" + (m.join(" ") || "") + "</td></tr>";
    });
    h += "</tbody></table></div><h3>샘플 데이터 (" + t.rows.length + "행, 개인정보는 가림)</h3><div class=\"scroll-x\"><table class=\"tbl\"><thead><tr>";
    t.columns.forEach(function (c) { h += "<th>" + esc(c.name) + "</th>"; });
    h += "</tr></thead><tbody>";
    t.rows.forEach(function (r) {
      h += "<tr>" + r.map(function (v) { return "<td>" + esc(v) + "</td>"; }).join("") + "</tr>";
    });
    h += "</tbody></table></div>";
    $("#tbl-detail").innerHTML = h;
  }

  function initData() {
    var tabs = $("#tbl-tabs");
    if (!window.SAMPLES || !window.SAMPLES.tables) {
      tabs.innerHTML = '<span class="muted">samples.js를 불러오지 못했습니다.</span>';
      return;
    }
    var names = Object.keys(window.SAMPLES.tables);
    tabs.innerHTML = names.map(function (n) {
      return '<button data-t="' + esc(n) + '">' + esc(n) + "</button>";
    }).join("");
    tabs.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (b) renderTable(b.dataset.t);
    });
    renderTable(names[0]);
  }

  /* ---------- 예상 질문 ---------- */
  var Q = [
    ["S1-01", "1막 단순 조회", "오늘 우리 지점(강남지점) 체결 건수와 거래대금 알려줘", "불안정", "골든 3/3 (직전 3/3, 그 앞 1/3). Supervisor 시험에서는 오늘 7건, 104,115,980원. 가끔 없는 컬럼을 지어내 SQL0206 오류가 남"],
    ["S1-02", "1막 단순 조회", "잔고가 1억 이상인 고객 이름과 총자산을 보여줘", "확인됨", "골든 3/3. Supervisor 시험(부산지점 조건 추가)에서도 3명 확인"],
    ["S1-03", "1막 단순 조회", "삼성전자 어제 체결 중 매수만 보여줘", "확인됨", "골든 3/3"],
    ["S2-01", "2막 업무 용어", "VIP 고객 중 예수금 많은 순으로 10명", "불안정", "골든 2/3 (직전 1/3, 정의 보강 전 0/3). 예수금 정의에 '여러 날짜의 값을 더하면 안 된다'를 넣은 뒤 같은 질문 20번 중 19번이 최근 기준일 조건을 썼음(보강 전 6~8/10). 가끔 5일치를 합산하는 SQL이 나옴"],
    ["S2-02", "2막 업무 용어", "이번 달 약정 상위 고객 5명", "확인됨", "골든 3/3. 약정은 거래대금의 동의어"],
    ["S2-03", "2막 업무 용어", "미수 있는 계좌 보여줘", "부분 확인", "1회 시험. 미수금이 0보다 큰 행을 찾지만 날짜별 행을 그대로 나열해 30행이 나옴"],
    ["S2-04", "2막 업무 용어", "신용융자 계좌 보여줘", "확인됨", "골든 3/3. ACCOUNT.CREDIT_LOAN_YN = 'Y'"],
    ["S2-05", "2막 업무 용어", "이번 달 체결대금 상위 고객 5명", "불안정", "골든 3/3 (직전 3/3, 그 앞 2/3). S2-02와 같은 값이 나와야 하는데 가끔 값이 달라짐"],
    ["S3-01", "3막 복잡 질의", "이번 달 약정 상위 10 고객과 이들의 주력 종목", "미해결", "1회 시험. CTE에서 정의한 별칭을 잘못 참조해 SQL0206 오류"],
    ["S3-02", "3막 복잡 질의", "고객별 월 거래대금과 전월 대비 증감률", "미해결", "1회 시험. LAG는 쓰나 첫 달을 0으로 나눠 SQL0801 오류"],
    ["S3-03", "3막 복잡 질의", "종목별 거래대금 순위를 섹터 내에서 매겨줘", "확인됨", "골든 3/3. 용어집에 '업종 내 순위'를 추가한 뒤 순위 컬럼이 생김"],
    ["S3-04", "3막 복잡 질의", "주문 후 30분 넘게 미체결인 지정가 주문", "불안정", "골든 1/3 (직전 1/3). '30분 안에 체결이 없는 주문'으로 해석하면 20~30행, 정답은 체결이 하나도 없는 5행. 가끔 Db2 날짜 연산 문법 오류(SQL0182)"],
    ["S3-05", "3막 복잡 질의", "계좌 잔고의 7일 이동평균", "부분 확인", "1회 시험. 실행은 되나 계좌별로 나누지 않고 전체 행을 날짜순으로 평균냄"],
    ["S4-01", "4막 대화", "수익 좋은 고객 보여줘", "확인됨", "Supervisor가 수익 기준(실현손익, 수수료 차감 후)을 되물음"],
    ["S4-02", "4막 대화", "이번 분기 실현손익 기준 상위 10명", "확인됨", "S4-01에 이어 질의 실행, 10명 표 반환"],
    ["S4-03", "4막 대화", "그 중에 코스닥 종목 위주로 거래한 고객만", "부분 확인", "분기, 실현손익, 상위 10명 조건은 이어 붙임. 직전 10명으로 한정하지 않고 코스닥 조건으로 다시 집계"],
    ["S4-04", "4막 대화", "작년 같은 기간이랑 비교해줘", "부분 확인", "맥락은 이어 붙이나 올해와 작년이 한 표에 섞이고 조건 우선순위가 틀려 순위 제한이 한쪽에만 걸림"],
    ["S5-01", "5막 트레이딩", "데스크별 오늘 PnL과 한도 소진율", "부분 확인", "1회 시험. 4개 데스크의 소진율(주식2데스크 0.86 등)은 나오나 기준일을 오늘 날짜로 고정함"],
    ["S5-02", "5막 트레이딩", "한도의 80%를 넘긴 데스크가 있어?", "확인됨", "골든 3/3. 용어집 정의에 '가장 최근 기준일만 합산'을 넣은 뒤 정답 1행(주식2데스크 86%)"],
    ["S5-03", "5막 트레이딩", "채권 데스크 포지션 상위 5종목과 전일 대비 변동", "미해결", "1회 시험. 상위 5종목 노출금액은 나오나 전일 대비 변동은 계산하지 않음"],
    ["S6-01", "6막 차트", "월별 거래대금 추이 보여줘 (라인 차트)", "확인됨", "Insight 시험, 연도와 월로 묶어 14개월이 나옴"],
    ["S6-02", "6막 차트", "데스크별 PnL 비교해줘", "부분 확인", "Supervisor 시험. 막대 차트는 나오나 데스크 이름 대신 ID를 쓰고 날짜별 스냅샷을 전부 합산함"],
    ["S6-03", "6막 차트", "왜 3월에 급증했어?", "부분 확인", "Insight 시험, 2월 대비 증가 값은 나오나 업종별로 쪼개지는 않음 (실행마다 설명이 다름)"]
  ];

  function initQuestions() {
    var cls = { "확인됨": "ok", "불안정": "warn", "부분 확인": "warn", "미해결": "bad" };
    $("#qtable").innerHTML = Q.map(function (q) {
      return "<tr><td>" + esc(q[0]) + "</td><td>" + esc(q[1]) + "</td><td>" + esc(q[2]) + '</td><td><span class="tag ' + (cls[q[3]] || "") + '">' + esc(q[3]) + "</span>" +
        (q[4] ? ' <span class="muted">' + esc(q[4]) + "</span>" : "") + "</td></tr>";
    }).join("");
  }

  /* ---------- Text-to-SQL 평가 결과 (eval_results.js) ---------- */
  function evalTable(r) {
    if (!r) return "";
    var h = '<div class="scroll-x"><table class="tbl"><thead><tr>' + r.columns.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>";
    r.rows.forEach(function (row) {
      h += "<tr>" + row.map(function (v) { return "<td>" + esc(v) + "</td>"; }).join("") + "</tr>";
    });
    return h + "</tbody></table></div><p class=\"muted\">총 " + esc(r.row_count) + "행" + (r.row_count > r.rows.length ? " 중 앞 " + r.rows.length + "행" : "") + "</p>";
  }

  function initEval() {
    var box = $("#eval-body");
    var E = window.EVAL;
    if (!E || !E.items) return;
    var pct = Math.round(E.ok * 100 / E.total);
    var h = '<div class="grid3"><div class="stat"><b>' + E.ok + " / " + E.total + "</b><span>통과 (" + pct + '%)<br>' + E.items.length + "문항 x " + E.n + '회</span></div>' +
      '<div class="stat"><b>' + esc(E.date) + '</b><span>실행일<br>' + (E.glossary ? "용어집 사용(SQL 에이전트와 같은 구성)" : "용어집 없음") + "</span></div>" +
      '<div class="stat"><b>24 · 24 · 26 → 27</b><span>잔고 용어 정의 보강 전 세 번과 보강 후 한 번(30점 만점)<br>이 탭은 마지막 실행입니다. 실행마다 1~2점 달라집니다</span></div></div>';
    h += "<h3>질문별 점수</h3>";
    h += '<table class="tbl"><thead><tr><th>번호</th><th>질문</th><th>점수</th><th>3회 결과</th></tr></thead><tbody>';
    E.items.forEach(function (it) {
      var ok = it.runs.filter(function (r) { return r.pass; }).length;
      var cls = ok === it.runs.length ? "ok" : (ok === 0 ? "bad" : "warn");
      h += "<tr><td>" + esc(it.id) + "</td><td>" + esc(it.question) + '</td><td><span class="tag ' + cls + '">' + ok + " / " + it.runs.length + "</span></td><td>" +
        it.runs.map(function (r) { return '<span class="tag ' + (r.pass ? "ok" : "bad") + '">' + (r.pass ? "통과" : "실패") + "</span>"; }).join(" ") + "</td></tr>";
    });
    h += "</tbody></table>";
    h += "<h3>질문별 상세 (골든 SQL, 생성 SQL, 결과)</h3><p class=\"muted\">질문을 눌러 펼치세요. 골든 SQL은 사람이 정한 정답이고, 시도 1~3은 wxdi Text-to-SQL이 실제로 만든 SQL과 Db2 실행 결과입니다.</p>";
    E.items.forEach(function (it) {
      var ok = it.runs.filter(function (r) { return r.pass; }).length;
      var cls = ok === it.runs.length ? "ok" : (ok === 0 ? "bad" : "warn");
      h += '<details class="eval-item"><summary><b>' + esc(it.id) + "</b> " + esc(it.question) + ' <span class="tag ' + cls + '">' + ok + " / " + it.runs.length + "</span></summary>";
      h += "<h4>골든 SQL (정답)</h4><pre>" + esc(it.golden_sql) + "</pre>" + evalTable(it.golden_result);
      it.runs.forEach(function (r, i) {
        h += '<div class="run ' + (r.pass ? "pass" : "fail") + '"><h4>시도 ' + (i + 1) + ' <span class="tag ' + (r.pass ? "ok" : "bad") + '">' + (r.pass ? "통과" : "실패") + "</span> <span class=\"muted\">" + esc(r.pass ? "골든과 같은 값" : r.status) + "</span></h4>";
        h += r.sql ? "<pre>" + esc(r.sql) + "</pre>" : '<p class="muted">SQL을 만들지 못했습니다.</p>';
        if (r.result) h += evalTable(r.result);
        else if (r.error) h += '<p class="muted">실행 오류: ' + esc(r.error) + "</p>";
        h += "</div>";
      });
      h += "</details>";
    });
    box.innerHTML = h;
  }

  /* ---------- 에이전트 탭: 에이전트별 서브탭 ---------- */
  function resetAgentChatUI() {
    $$(".ag-chat-host").forEach(function (h) { h.hidden = true; });
    $$(".ag-chat-btn").forEach(function (b) { b.hidden = false; });
  }

  function showAgent(key) {
    $$("#agent-tabs button").forEach(function (b) { b.classList.toggle("active", b.dataset.ag === key); });
    $$(".agent[data-ag]").forEach(function (a) { a.classList.toggle("on", a.dataset.ag === key); });
    if (chatMode === "inline") { destroyChat(); resetAgentChatUI(); }
  }

  /* ---------- 챗 ---------- */
  var chatInstance = null;
  var chatMode = null;   // "float"(홈, Supervisor) | "inline"(에이전트 탭) | null
  var chatSeq = 0;       // 로딩 중에 요청이 바뀌면 이전 요청을 버린다
  var mockOpen = false;

  function chatReady() {
    var c = window.CHAT_CONFIG || {};
    return !!(c.enabled && c.orchestrationID && c.hostURL && c.crn && c.agents && c.agents.sup && c.agents.sup.id);
  }

  function setMock(open) {
    mockOpen = open;
    $("#mock-chat").hidden = !open;
    $("#mock-launcher").hidden = open;
  }

  function loadLoader(cb) {
    if (window.wxoLoader && window.wxoLoader.init) { cb(); return; }
    var c = window.CHAT_CONFIG;
    var s = document.createElement("script");
    s.src = c.hostURL.replace(/\/$/, "") + "/wxochat/wxoLoader.js?embed=true";
    s.addEventListener("load", cb);
    document.head.appendChild(s);
  }

  // 플로팅 챗을 연다. 인스턴스에 toggle()은 없고 changeView()로 런처와 본창을 바꾼다.
  function openFloat() {
    if (chatInstance && chatInstance.changeView && chatMode === "float") chatInstance.changeView({ launcher: false, mainWindow: true });
  }

  function destroyChat() {
    chatSeq++;
    if (chatInstance && chatInstance.destroy) { try { chatInstance.destroy(); } catch (e) { /* 이미 정리됨 */ } }
    chatInstance = null;
    chatMode = null;
  }

  // host가 없으면 홈 화면용 플로팅 챗, 있으면 그 요소 안에 챗을 그린다. wxO 설정이 전역 하나라서 한 번에 하나만 띄운다.
  function mountChat(key, host) {
    destroyChat();
    var seq = chatSeq;
    var c = window.CHAT_CONFIG;
    chatMode = host ? "inline" : "float";
    loadLoader(function () {
      if (seq !== chatSeq) return;
      var chatOptions = {
        agentId: c.agents[key].id,
        onLoad: function (instance) {
          if (seq !== chatSeq) { try { instance.destroy(); } catch (e) { /* 무시 */ } return; }
          chatInstance = instance;
        }
      };
      if (c.agentEnvironmentId) chatOptions.agentEnvironmentId = c.agentEnvironmentId;
      var config = {
        orchestrationID: c.orchestrationID,
        hostURL: c.hostURL,
        rootElementID: "root",
        deploymentPlatform: c.deploymentPlatform || "ibmcloud",
        crn: c.crn,
        showLauncher: !host,
        layout: host ? { form: "custom", customElement: host, showOrchestrateHeader: false }
                     : { form: "float", showOrchestrateHeader: true, showAgentSwitcher: false },
        chatOptions: chatOptions
      };
      window.wxoLoader.init(config);   // 전역 window.wxOConfiguration은 폐기 예정이고 챗 하나만 담을 수 있어 쓰지 않는다
    });
  }

  // 화면에 맞는 챗을 맞춘다. 에이전트 탭에서는 사용자가 "대화 시작"을 누른 챗만, 그 밖에서는 Supervisor 플로팅 챗.
  function syncChat() {
    if (!chatReady()) return;
    var view = $(".view.active");
    var sec = $(".sec.active");
    var inAgents = view && view.id === "view-demo" && sec && sec.id === "sec-agents";
    if (inAgents) {
      if (chatMode === "float") destroyChat();
      return;
    }
    if (chatMode !== "float") {
      resetAgentChatUI();
      mountChat("sup", null);
    }
  }

  function initChat() {
    $$("#agent-tabs button").forEach(function (b) {
      b.addEventListener("click", function () { showAgent(b.dataset.ag); });
    });
    showAgent("sup");

    if (chatReady()) {
      $("#open-chat").addEventListener("click", function () {
        openFloat();
      });
      $$(".ag-chat-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var box = btn.closest(".agent-chat");
          var host = $(".ag-chat-host", box);
          resetAgentChatUI();
          host.hidden = false;
          btn.hidden = true;
          mountChat(box.dataset.ag, host);
        });
      });
    } else {
      $$(".agent-chat").forEach(function (box) {
        box.hidden = true;
        if (box.previousElementSibling) box.previousElementSibling.hidden = true;
      });
      setMock(false);
      $("#mock-launcher").addEventListener("click", function () { setMock(true); });
      $("#mc-close").addEventListener("click", function () { setMock(false); });
      $("#open-chat").addEventListener("click", function () { setMock(true); });
    }

    $("#chips").addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      var text = b.textContent.trim();
      if (chatInstance && chatInstance.send) {
        openFloat();
        chatInstance.send(text);
      } else if (!chatReady()) {
        setMock(true);
        var p = $("#mc-pending");
        p.hidden = false;
        p.textContent = text;
        var body = $(".mc-body");
        body.scrollTop = body.scrollHeight;
      }
    });
  }

  /* ---------- 시작 ---------- */
  initData();
  initQuestions();
  initEval();
  initChat();
  applyHash();
})();
