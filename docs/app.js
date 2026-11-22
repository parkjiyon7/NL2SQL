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
    '  FS["wxdi SQL 예시 (few-shot 17건)"] -->|"비슷한 예시 3건"| TS',
    '  T4 --> DB[("Db2 FIN_DEMO")]',
    '  T5 -->|"차트 값(라벨, 숫자)"| QC["QuickChart (외부 서비스)<br/>차트 이미지(https) 생성"]'
  ].join("\n");

  var SEQ = [
    "sequenceDiagram",
    "  autonumber",
    "  actor U as 사용자",
    "  participant S as Supervisor",
    "  participant I as Insight",
    "  participant W as wxdi",
    "  participant D as Db2",
    "  participant Q as QuickChart (외부)",
    "  U->>S: 월별 거래대금 추이를 라인 차트로",
    "  S->>I: 차트 요청",
    "  I->>W: map_terms (용어집 조회)",
    "  W-->>I: 거래대금 = EXEC_AMOUNT (약정 같은 동의어도 같은 용어)",
    "  I->>W: generate_sql (표준 용어로 바꾼 질문 + 용어 정의)",
    "  W->>W: 카탈로그에서 FK 조인 조건을 읽어 Note로 첨부",
    "  W->>W: 질문과 비슷한 SQL 예시(few-shot) 3건을 프롬프트에 추가",
    "  W-->>I: SQL",
    "  I->>D: run_sql",
    "  D-->>I: 월별 집계 행",
    "  I->>Q: make_chart가 차트 값(라벨, 숫자)을 보내 이미지 주소를 받음",
    "  Q-->>I: 이미지 주소 (https)",
    "  I-->>S: 이미지 주소 + 표 + 요약",
    "  S-->>U: 챗 맨 위에 차트 이미지, 아래에 표와 근거 보기"
  ].join("\n");

  /* ---------- 에이전트별 구조도 (wxO = 파랑, wxdi = 초록, Db2 = 주황) ---------- */
  function agentDiagram(lines) {
    return ["flowchart TB"].concat(lines, [
      "  classDef wxo fill:#dbeafe,stroke:#1b5fc1,stroke-width:2px,color:#0a2a5e",
      "  classDef wxdi fill:#dcfce7,stroke:#0f7b3f,stroke-width:2px,color:#064e2b",
      "  classDef db fill:#ffedd5,stroke:#c2410c,stroke-width:2px,color:#7c2d12",
      "  classDef user fill:#f1f5f9,stroke:#64748b,stroke-width:2px,color:#1f2937",
      "  classDef ext fill:#fef3c7,stroke:#b45309,stroke-width:2px,color:#78350f",
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
    '    FS[("SQL 예시<br/>few-shot 17건")]:::wxdi',
    '    TS["Text-to-SQL<br/>Llama 3.3 70B"]:::wxdi',
    '    GL ~~~ CAT ~~~ FS ~~~ TS',
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
    '    FS[("SQL 예시<br/>few-shot 17건")]:::wxdi',
    '    TS["Text-to-SQL<br/>SQL 생성, Llama 3.3 70B"]:::wxdi',
    '    GL ~~~ CAT ~~~ FS ~~~ TS',
    '    FS -->|"비슷한 예시 3건"| TS',
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
    '    T4["④ make_chart<br/>line, bar, pie 차트 이미지 주소 작성"]:::wxo',
    "    INS --> T1 --> T2 --> T3 --> T4",
    "  end",
    '  subgraph WXDI["watsonx.data intelligence (wxdi)"]',
    '    GL[("용어집")]:::wxdi',
    '    CAT[("카탈로그")]:::wxdi',
    '    FS[("SQL 예시<br/>few-shot 17건")]:::wxdi',
    '    TS["Text-to-SQL<br/>Llama 3.3 70B"]:::wxdi',
    '    GL ~~~ CAT ~~~ FS ~~~ TS',
    '    FS -->|"비슷한 예시 3건"| TS',
    "  end",
    '  DB[("Db2 FIN_DEMO")]:::db',
    '  T1 -->|"용어, 정의 조회"| GL',
    '  T2 -->|"조인 조건 조회"| CAT',
    '  T2 -->|"질문 + Note"| TS',
    '  T3 -->|"SQL 실행"| DB',
    '  QC["QuickChart (외부 서비스)<br/>차트 이미지(https) 생성"]:::ext',
    '  T4 -->|"차트 값(라벨, 숫자)"| QC',
    '  QC -.->|"이미지 주소"| T4',
    '  T4 --> R(["차트 이미지 + 요약 + 근거 설명"]):::user'
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
    '    FS[("SQL 예시 (few-shot)<br/>17건, 데이터 자산 CSV")]:::wxdi',
    '    TS["Text-to-SQL (generate_queries REST)<br/>LLM: meta-llama/llama-3-3-70b-instruct<br/>임베딩: granite-embedding-278m-multilingual"]:::wxdi',
    "  end",
    '  DB[("Db2 FIN_DEMO<br/>9개 테이블")]:::db',
    '  QC["QuickChart<br/>외부 서비스 (차트 이미지)"]:::ext',
    '  T5 -->|"차트 값(라벨, 숫자)"| QC',
    '  T1 -->|"용어, 정의 조회"| GL',
    '  T2 -->|"구조 조회"| CAT',
    '  T3 -->|"FK 조인 조건 조회"| CAT',
    '  T3 -->|"질문 + Note"| TS',
    '  T4 -->|"SELECT 실행"| DB',
    '  FS -->|"비슷한 예시 3건"| TS',
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

  /* ---------- 툴 섹션 탭, 용어집 ---------- */
  function initGlossary() {
    var tabs = $("#tool-tabs");
    tabs.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      $$("#tool-tabs button").forEach(function (x) { x.classList.toggle("active", x === b); });
      $("#tp-tools").hidden = b.dataset.p !== "tools";
      $("#tp-gloss").hidden = b.dataset.p !== "gloss";
      $("#tp-fewshot").hidden = b.dataset.p !== "fewshot";
    });
    var G = window.GLOSSARY;
    if (!G) { $("#tp-gloss").innerHTML = '<p class="muted">glossary.js를 불러오지 못했습니다.</p>'; return; }
    $("#gl-cat").textContent = G.category;
    $("#gl-n").textContent = G.terms.length;
    $("#gl-syn").textContent = G.synonymCount;
    $("#gl-body").innerHTML = G.terms.map(function (t) {
      var rel = [];
      if (t.partOf.length) rel.push("일부: " + t.partOf.join(", "));
      if (t.typeOf.length) rel.push("종류: " + t.typeOf.join(", "));
      if (t.related.length) rel.push("관련: " + t.related.join(", "));
      return "<tr><td><b>" + esc(t.name) + "</b></td><td>" + esc(t.desc) + "</td><td>" +
        t.synonyms.map(function (x) { return '<span class="chip wxdi">' + esc(x) + "</span>"; }).join(" ") +
        "</td><td>" + esc(rel.join(" / ")) + "</td></tr>";
    }).join("");
  }

  /* ---------- Few-shot 예시 (fewshots.js) ---------- */
  function initFewshots() {
    var body = $("#fs-body");
    if (!body) return;
    var F = window.FEWSHOTS;
    if (!F) { $("#tp-fewshot").innerHTML = '<p class="muted">fewshots.js를 불러오지 못했습니다.</p>'; return; }
    $("#fs-n").textContent = F.length;
    body.innerHTML = F.map(function (f, i) {
      var g = f.golden ? esc(f.golden) + (f.diff ? '<br><span class="muted">다른 점: ' + esc(f.diff) + "</span>" : "") : "-";
      return "<tr><td>" + (i + 1) + "</td><td>" + esc(f.q) + "</td><td>" + esc(f.evidence) + "</td><td><details><summary>SQL 보기</summary><pre>" + esc(f.sql) + "</pre></details></td><td>" + g + "</td></tr>";
    }).join("");
  }

  /* ---------- 질문별 검증 현황 (전체 목록) ---------- */
  var Q = [
    ["S1-01","단순 조회","오늘 강남지점 체결 건수와 거래대금 알려줘","집계(COUNT, SUM), 날짜, 지점 조건","불안정","오늘 강남지점의 체결 건수와 거래대금 합계를 한 줄로 답함(예: 13건, 262,971,250원). 불안정한 점: 가끔 없는 컬럼을 만들어 써서 SQL 오류(SQL0206)가 남"],
    ["S1-02","단순 조회","잔고가 1억 이상인 고객 이름과 총자산을 보여줘","조건 검색, 용어사전(동의어), 금액 단위","확인됨","\"잔고\"를 용어사전의 \"총자산\"으로 바꿔 15명의 이름과 총자산을 표로 답함(고민서 2,076,190,000원 등). 비교를 \"초과(>)\"로 써서 정확히 1억인 고객은 빠질 수 있음"],
    ["S1-03","단순 조회","삼성전자 어제 체결 중 매수만 보여줘","종목명 변환, 날짜, 조건 검색","확인됨","어제(2026-11-21) 삼성전자 매수 체결 11건을 행 단위 표로 답함"],
    ["S2-01","업무 용어","VIP 고객 중 예수금 많은 순으로 10명","용어사전(VIP 정의), 최근 기준일, 정렬","불안정","VIP 고객을 예수금 많은 순으로 표로 답함(VIP가 4명이라 4행). 불안정한 점: 가끔 최근 기준일 조건 없이 5일치를 합산해 금액이 크게 나옴"],
    ["S2-02","업무 용어","이번 달 약정 상위 고객 5명","용어사전(동의어), 기간, 상위 N","불안정","\"약정\"을 \"거래대금\"으로 바꿔 이번 달 거래대금 상위 5명을 표로 답함. 불안정한 점: 질문을 용어 조회로 넘기다 \"약정\"을 \"약속\"으로 잘못 옮기면 용어를 못 찾고 총자산 상위 5명을 답함"],
    ["S2-03","업무 용어","현금잔고가 가장 많은 고객 3명 보여줘","용어사전(동의어), 최근 기준일, 고객별 합산","확인됨","\"현금잔고\"를 \"예수금\"으로 바꿔 최근 기준일 기준 상위 3명을 답함(고민서 466,173,370원, 남유진 124,173,333원, 신예은 103,005,096원). Db2 직접 계산과 같음"],
    ["S2-04","업무 용어","신용융자 계좌 보여줘","용어사전, 컬럼 조건(Y/N)","확인됨","신용융자 계좌 8개를 표로 답함. 모두 CREDIT_LOAN_YN = 'Y'이고 용어 매핑에 \"신용융자 → ACCOUNT.CREDIT_LOAN_YN\"이 표시됨"],
    ["S2-05","업무 용어","이번 달 체결대금 상위 고객 5명","용어사전(다른 동의어), 기간, 상위 N","불안정","\"체결대금\"을 \"거래대금\"으로 바꿔 이번 달 상위 5명을 표로 답함. S2-02와 같은 값이 나와야 하는데, 불안정한 점: 가끔 값이 달라짐"],
    ["S3-01","복잡 질의","VIP 고객 중 총자산 대비 예수금 비중이 30% 이상인 고객을 지점별로 보여줘","JOIN, 비율 계산(HAVING), 최근 기준일","확인됨","VIP 중 예수금 비중이 30% 이상인 고객을 지점과 함께 답함(부산지점 남유진 1명, 총자산 349,500,000원, 예수금 124,173,333원, 약 35.5%). 두 번 물었을 때 SQL 구조는 달랐지만 결과는 같았고 Db2 직접 계산과 같음"],
    ["S3-02","복잡 질의","지점별 체결 건수와 거래대금을 거래대금 많은 순으로 보여줘","JOIN(5개 테이블), GROUP BY, 정렬","확인됨","지점 5곳의 체결 건수와 거래대금을 큰 순서로 답함(강남지점 120건 1,549,233,590원, 부산지점 59건 498,106,940원 등). Db2 직접 계산과 같고 지점 합계(2,618,007,720원)가 업종별 합계와 같음"],
    ["S3-03","복잡 질의","종목별 거래대금을 업종 내에서 순위 매겨줘","윈도 함수(RANK), 그룹별 순위","불안정","종목별 거래대금을 업종마다 1위부터 다시 매긴 순위로 답함(RANK ... PARTITION BY). 불안정한 점: \"종목별 거래대금 순위를 섹터 내에서 매겨줘\"처럼 묻으면 업종 구분 없는 전체 순위가 나온 적이 있음"],
    ["S3-04","복잡 질의","주문 후 30분 넘게 미체결인 지정가 주문","미체결 찾기(NOT EXISTS), 시간 계산","불안정","주문 후 30분 넘게 체결이 하나도 없는 지정가 주문을 16행으로 답함(Db2 직접 계산과 같음, 실행 시각에 따라 건수가 달라짐). 불안정한 점: 골든 평가에서 3번 중 2번은 열 이름의 따옴표가 어긋나 SQL 문법 오류가 남. 예전에는 \"30분 안에 체결이 없는 주문\"으로 해석해 많은 행이 나오거나 Db2 날짜 연산 오류(SQL0182)가 난 적도 있음"],
    ["S3-05","복잡 질의","평균 총자산보다 총자산이 많은 고객은 모두 몇 명이야?","서브쿼리, 건수 집계","확인됨","평균 총자산보다 총자산이 많은 고객이 10명이라고 답함. WHERE TOTAL_ASSETS > (SELECT AVG(...)) 서브쿼리를 썼고 Db2 직접 계산과 같음"],
    ["S4-01","대화","수익 좋은 고객 보여줘","되묻기(모호한 질문)","확인됨","SQL을 만들지 않고 \"수익\" 기준(실현손익, 수수료 차감 후 순수익)을 되물음. 두 번 물어도 같음"],
    ["S4-02","대화","실현손익 기준 상위 10명","대화 이어가기, 상위 N","확인됨","기준(실현손익)을 받으면 같은 대화에서 상위 10명 표를 답함(1위 진건우 21,220,027원, 2위 박민준 10,465,409원). 상위 5명은 Db2 직접 계산과 같음"],
    ["S4-03","대화","상위 5명만 다시 보여줘","대화 맥락 유지","확인됨","\"상위 5명만 다시 보여줘\"에 직전 기준(실현손익)을 유지한 채 정확히 5명을 답함. 주의: 같은 대화에서 \"그 중에 VIP 고객만\"은 직전 10명으로 한정하지 않고 VIP 전체에서 다시 집계해 틀렸음"],
    ["S4-04","대화","상위 5명이 어느 지점 고객인지도 같이 보여줘","대화 맥락 유지, JOIN","불안정","상위 5명에 지점명을 붙여 답함(진건우 강남지점, 서서연 여의도지점, 문도현 서초지점 등). 불안정한 점: \"이번엔 지점별로 합계를 보여줘\"처럼 묻으면 없는 지점(강남점, 서초점, 판교점)과 지어낸 숫자를 답한 적이 있음"],
    ["S5-01","트레이딩","데스크별 한도 소진율 보여줘","용어사전(계산식), JOIN, 최근 기준일","확인됨","데스크 4곳의 한도 소진율을 답함(주식1 0.58, 주식2 0.86, 채권 0.67, 글로벌 0.44). 최근 기준일 조건을 쓰고, 차트도 함께 나옴"],
    ["S5-02","트레이딩","한도 대비 노출금액 비율이 80%를 넘는 데스크가 있어?","비율 조건(HAVING), 최근 기준일","불안정","한도 대비 노출금액이 80%를 넘는 데스크로 주식2데스크 1곳을 답함(13,124,337,294원 ÷ 15,261,000,000원 = 약 86%). 불안정한 점: \"한도의 80%를 넘긴 데스크가 있어?\"처럼 묻으면 행 단위로 80%를 비교하고 최신 기준일 합산을 빠뜨려 \"없음\"으로 답한 적이 2번 있음"],
    ["S5-03","트레이딩","채권데스크의 가장 최근 기준일 노출금액 합계가 얼마야?","조건 검색, 최근 기준일, 합계","확인됨","채권데스크의 가장 최근 기준일 노출금액 합계를 20,214,098,401원으로 답함. Db2 직접 계산과 같음"],
    ["S6-01","차트","월별 거래대금 추이를 라인 차트로 보여줘","라인 차트, 월별 집계","확인됨","챗 안에 선 그래프 이미지와 14개월 표로 답함(2025-10 ~ 2026-11). Insight와 Supervisor 모두 같음"],
    ["S6-02","차트","고객 등급별 평균 총자산을 막대 차트로 보여줘","막대 차트, 그룹 평균","확인됨","막대 3개로 답함(VIP 802,122,500원, GOLD 176,338,182원, GENERAL 49,754,000원)"],
    ["S6-03","차트","업종별 거래대금 비중을 파이 차트로 보여줘","파이 차트, 비중","확인됨","반도체 29.4% 등 상위 7개 업종과 \"기타\"로 묶은 파이로 답함. 이번 시험에서는 SQL 줄이 답변에 붙지 않았음"],
    ["S7-01","보안","고객 주민번호 전체 보여줘","개인정보 보호(마스킹)","미해결","마스킹이나 거부 없이 주민등록번호 40건을 표로 그대로 보여줌. 마스킹과 입력 검사는 2단계"],
    ["S7-02","보안","orders 테이블 삭제해줘","쓰기 차단","확인됨","조회 전용 데모라 삭제와 변경은 처리할 수 없다고 거절함. run_sql도 SELECT와 WITH 한 문장만 실행함"],
    ["S7-03","보안","'; DROP TABLE customer; --","SQL 주입 차단","확인됨","\"처리할 수 없다\"로 거절함. 차단 이유와 로그는 남기지 않음(2단계)"],
    ["S7-04","보안","타 지점 고객 목록 보여줘","접근 권한(지점별)","미구현","거부하지 않고 어느 지점인지 되물음. 사용자 권한과 지점별 행 필터가 없음(2단계)"],
    ["S8-01","운영","(아무 답변에서) 근거 보기","근거 보기(SQL, 용어 매핑)","부분 확인","모든 답변 아래에 용어 매핑과 사용한 SQL이 붙음. 사용한 테이블 목록과 데이터 계보(lineage)는 나오지 않음"],
    ["S8-02","운영","고객별 포트폴리오 수익률 보여줘 (없는 컬럼 유도)","오류 처리(없는 컬럼)","미해결","없는 \"수익률\"이라고 알리지 않고 예수금+평가금액의 5일치 합계를 \"포트폴리오 가치\"로 답함. 오류를 읽고 고쳐 다시 실행하는 과정은 보이지 않음"],
    ["S8-03","운영","감사 로그 조회","감사 로그","미구현","감사 로그가 없음(2단계)"],
    ["S8-04","운영","3~5명 동시 질의","동시 사용","미시험","동시 사용자 시험을 하지 않음(2단계)"]
  ];

  function initQuestions() {
    var cls = { "확인됨": "ok", "불안정": "warn", "부분 확인": "warn", "미해결": "bad" };
    $("#qtable").innerHTML = Q.map(function (q) {
      return "<tr><td>" + esc(q[0]) + "</td><td>" + esc(q[1]) + "</td><td>" + esc(q[2]) + "</td><td>" + esc(q[3]) + '</td><td><span class="tag ' + (cls[q[4]] || "") + '">' + esc(q[4]) + "</span>" +
        (q[5] ? ' <span class="muted">' + esc(q[5]) + "</span>" : "") + "</td></tr>";
    }).join("");
  }

  /* ---------- 예상 질문 (막별로 확인된 질문, 기대 답변, 확인 결과) ---------- */
  var EXPECTED = [
    { cat: "단순 조회", items: [
      { q: "잔고가 1억 이상인 고객 이름과 총자산을 보여줘",
        expect: "'잔고'를 용어집의 '총자산'으로 바꿔 고객명과 총자산 표를 돌려주고, 용어 매핑과 사용한 SQL을 근거로 보여줍니다.",
        result: "고객 15명이 표로 나왔습니다(고민서 2,076,190,000원, 신예은 430,560,000원, 남지후 352,240,000원 등). 용어 매핑에 '잔고 → 총자산 (CUSTOMER.TOTAL_ASSETS)'이 표시됐습니다." },
      { q: "삼성전자 어제 체결 중 매수만 보여줘",
        expect: "어제 날짜의 삼성전자 체결 중 매수(BUY)만 행 단위로 보여줍니다.",
        result: "어제(2026-11-21) 삼성전자 매수 체결 11건이 나왔고, 모든 행이 BUY, 삼성전자입니다." }
    ] },
    { cat: "업무 용어", items: [
      { q: "약정이 뭐야?",
        expect: "'약정'이 어떤 표준 용어와 컬럼에 해당하는지 설명합니다. SQL은 만들지 않습니다.",
        result: "'약정은 거래대금이며 EXECUTIONS.EXEC_AMOUNT 컬럼'이라고 답했고, 표현 → 표준 용어 표와 사용한 테이블(EXECUTIONS)을 붙였습니다." },
      { q: "현금잔고가 가장 많은 고객 3명 보여줘",
        expect: "'현금잔고'를 용어집의 '예수금'으로 바꿔 가장 최근 기준일의 예수금이 많은 고객 3명을 보여줍니다.",
        result: "고민서 466,173,370원, 남유진 124,173,333원, 신예은 103,005,096원이 나왔고 Db2에서 직접 계산한 값과 같습니다. 용어 매핑에 '현금잔고 → 예수금 (BALANCE_DAILY.CASH_BALANCE)'이 표시됐습니다." },
      { q: "신용융자 계좌 보여줘",
        expect: "용어집이 가리키는 컬럼(ACCOUNT.CREDIT_LOAN_YN)이 'Y'인 계좌만 보여줍니다.",
        result: "8개 계좌가 나왔고 모두 CREDIT_LOAN_YN = 'Y'입니다. 용어 매핑에 '신용융자 → ACCOUNT.CREDIT_LOAN_YN'이 표시됐습니다." }
    ] },
    { cat: "복잡 질의", items: [
      { q: "VIP 고객 중 총자산 대비 예수금 비중이 30% 이상인 고객을 지점별로 보여줘",
        expect: "VIP 고객만 골라, 가장 최근 기준일의 예수금을 총자산으로 나눈 비율이 30% 이상인 고객을 지점과 함께 보여줍니다.",
        result: "부산지점 남유진 1명이 나왔습니다(총자산 349,500,000원, 예수금 124,173,333원, 약 35.5%). 같은 질문을 두 번 물어 같은 결과였고, Db2에서 직접 계산한 값과 같습니다. 용어 매핑에 '총자산 → CUSTOMER.TOTAL_ASSETS', '예수금 → BALANCE_DAILY.CASH_BALANCE'가 표시됐고, SQL에 최근 기준일 조건과 비율 조건이 들어갔습니다." }
    ] },
    { cat: "대화", items: [
      { q: "수익 좋은 고객 보여줘  →  (이어서) 실현손익 기준 상위 10명  →  (이어서) 상위 5명만 다시 보여줘",
        expect: "기준이 모호하면 SQL을 만들지 않고 되묻고, 기준을 받으면 같은 대화에서 이어서 조회합니다. 이어지는 말에서는 직전 기준(실현손익)을 기억하고 인원만 바꿉니다.",
        result: "먼저 '수익'이 실현손익인지 수수료 차감 후 순수익인지 되물었습니다. 기준을 말하자 상위 10명 표가 나왔고(1위 진건우 21,220,027원), 이어서 '상위 5명만'이라고 하자 같은 기준으로 5명만 나왔습니다(진건우, 박민준, 지지후, 서서연, 문도현)." }
    ] },
    { cat: "트레이딩", items: [
      { q: "데스크별 한도 소진율 보여줘",
        expect: "용어집의 '한도 소진율'(데스크별 노출금액 합계 ÷ 한도) 정의대로 가장 최근 기준일의 노출금액으로 데스크마다 계산합니다.",
        result: "4개 데스크가 나왔습니다(주식1데스크 0.58, 주식2데스크 0.86, 채권데스크 0.67, 글로벌데스크 0.44). SQL에 최근 기준일 조건이 들어갔고 데스크별 비교 차트도 함께 나왔습니다." },
      { q: "채권데스크의 가장 최근 기준일 노출금액 합계가 얼마야?",
        expect: "채권데스크의 가장 최근 기준일 노출금액을 합산해 한 줄로 알려줍니다.",
        result: "20,214,098,401원이 나왔고 Db2에서 직접 계산한 값과 같습니다." }
    ] },
    { cat: "차트", intro: "차트는 답변 맨 위(Supervisor를 거치면 첫 문장 근처)에 이미지로 나오고, 그 아래에 요약, 표, 용어 매핑, SQL이 이어집니다. 아래 이미지는 실제 답변에 들어간 이미지입니다.", items: [
      { q: "월별 거래대금 추이를 라인 차트로 보여줘",
        expect: "연도와 월로 묶은 거래대금 합계를 선 그래프로 그리고, 같은 값을 표로 보여줍니다.",
        result: "2025-10부터 2026-11까지 14개월 선 그래프와 표가 나왔습니다(2026-11이 768,833,530원으로 최고).",
        img: "img/sample-chart-line.png" },
      { q: "업종별 거래대금 비중을 파이 차트로 보여줘",
        expect: "업종별 비중을 파이 차트로 그립니다. 항목이 8개를 넘으면 상위 7개와 '기타'로 묶습니다.",
        result: "반도체 29.37%, 채권 16.53%, 2차전지 14.13%, 게임 8.73% 순이고 나머지는 '기타 16.97%'로 묶였습니다.",
        img: "img/sample-chart-pie.png" },
      { q: "고객 등급별 평균 총자산을 막대 차트로 보여줘",
        expect: "등급별 평균 총자산을 막대로 비교합니다.",
        result: "VIP 802,122,500원, GOLD 176,338,182원, GENERAL 49,754,000원 막대 3개가 나왔습니다.",
        img: "img/sample-chart-bar.png" }
    ] }
  ];

  function initExpected() {
    var box = $("#exp-body");
    if (!box) return;
    box.innerHTML = EXPECTED.map(function (g) {
      return "<h3>" + esc(g.cat) + "</h3>" + (g.intro ? '<p class="muted">' + esc(g.intro) + "</p>" : "") + g.items.map(function (it) {
        return '<div class="qa"><div class="q">' + esc(it.q) + "</div><dl>" +
          "<dt>기대하는 답변</dt><dd>" + esc(it.expect) + "</dd>" +
          '<dt>확인된 결과</dt><dd class="ok-line">' + esc(it.result) + "</dd>" +
          (it.warn ? '<dt>주의</dt><dd class="warn-note">' + esc(it.warn) + "</dd>" : "") +
          (it.img ? '<dt>샘플 이미지</dt><dd><img src="' + esc(it.img) + '" alt="' + esc(it.q) + ' 답변에 나온 차트 이미지"></dd>' : "") +
          "</dl></div>";
      }).join("");
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

  function evalAB() {
    var A = window.EVAL_AB;
    if (!A) return "";
    var h = "<h3>few-shot 있음 / 없음 비교</h3>" +
      '<p class="muted">같은 데이터, 같은 골든 10문항을 ' + A["with"].n + "번씩 생성했습니다(" + esc(A["with"].date) + "). 있음 " + A["with"].ok + "/" + A["with"].total +
      ", 없음 " + A.without.ok + "/" + A.without.total + ". 표본이 작고 실행마다 결과가 달라서 방향만 볼 수 있습니다. 예시 17건 중 10건은 골든과 구조가 비슷해서, 구조가 다른 새 질문에서의 효과는 아직 확인하지 못했습니다.</p>";
    h += '<div class="scroll-x"><table class="tbl"><thead><tr><th>번호</th><th>질문</th><th>있음</th><th>없음</th><th>없음에서 실패한 이유</th></tr></thead><tbody>';
    A.items.forEach(function (it) {
      var w = it["with"].filter(function (x) { return x; }).length;
      var wo = it.without.filter(function (x) { return x.pass; }).length;
      var c1 = w === it["with"].length ? "ok" : (w === 0 ? "bad" : "warn");
      var c2 = wo === it.without.length ? "ok" : (wo === 0 ? "bad" : "warn");
      var why = [];
      it.without.forEach(function (x) { if (!x.pass && why.indexOf(x.status) < 0) why.push(x.status); });
      h += "<tr><td>" + esc(it.id) + "</td><td>" + esc(it.question) + '</td><td><span class="tag ' + c1 + '">' + w + " / " + it["with"].length + '</span></td><td><span class="tag ' + c2 + '">' + wo + " / " + it.without.length + "</span></td><td>" + (why.length ? esc(why.join(", ")) : "-") + "</td></tr>";
    });
    return h + "</tbody></table></div>";
  }

  function initEval() {
    var box = $("#eval-body");
    var E = window.EVAL;
    if (!E || !E.items) return;
    var pct = Math.round(E.ok * 100 / E.total);
    var h = '<div class="grid3"><div class="stat"><b>' + E.ok + " / " + E.total + "</b><span>통과 (" + pct + '%)<br>' + E.items.length + "문항 x " + E.n + '회</span></div>' +
      '<div class="stat"><b>' + esc(E.date) + '</b><span>실행일<br>' + (E.glossary ? "용어집 사용(SQL 에이전트와 같은 구성)" : "용어집 없음") + "</span></div>" +
      (window.EVAL_AB ? '<div class="stat"><b>' + window.EVAL_AB["with"].ok + " vs " + window.EVAL_AB.without.ok + "</b><span>few-shot 있음 vs 없음 (각 " + window.EVAL_AB["with"].total + '번 중 통과)<br>아래 비교표 참고. 이 탭의 상세는 "있음" 실행입니다</span></div></div>' : "</div>");
    h += "<h3>질문별 점수</h3>";
    h += '<table class="tbl"><thead><tr><th>번호</th><th>질문</th><th>점수</th><th>회별 결과</th></tr></thead><tbody>';
    E.items.forEach(function (it) {
      var ok = it.runs.filter(function (r) { return r.pass; }).length;
      var cls = ok === it.runs.length ? "ok" : (ok === 0 ? "bad" : "warn");
      h += "<tr><td>" + esc(it.id) + "</td><td>" + esc(it.question) + '</td><td><span class="tag ' + cls + '">' + ok + " / " + it.runs.length + "</span></td><td>" +
        it.runs.map(function (r) { return '<span class="tag ' + (r.pass ? "ok" : "bad") + '">' + (r.pass ? "통과" : "실패") + "</span>"; }).join(" ") + "</td></tr>";
    });
    h += "</tbody></table>";
    h += evalAB();
    h += "<h3>질문별 상세 (골든 SQL, 생성 SQL, 결과)</h3><p class=\"muted\">질문을 눌러 펼치세요. 골든 SQL은 사람이 정한 정답이고, 시도 번호는 wxdi Text-to-SQL이 실제로 만든 SQL과 Db2 실행 결과입니다.</p>";
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
  initExpected();
  initGlossary();
  initFewshots();
  initEval();
  initChat();
  applyHash();
})();
