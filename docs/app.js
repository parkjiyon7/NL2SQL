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
    '    T4["④ make_chart<br/>line, bar, pie 차트 이미지 주소 작성"]:::wxo',
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

  /* ---------- 질문별 검증 현황 (전체 목록) ---------- */
  var Q = [
    ["S1-01", "단순 조회", "오늘 우리 지점(강남지점) 체결 건수와 거래대금 알려줘", "불안정", "골든 3/3 (직전 3/3, 그 앞 1/3). Supervisor 시험에서는 오늘 7건, 104,115,980원. 가끔 없는 컬럼을 지어내 SQL0206 오류가 남"],
    ["S1-02", "단순 조회", "잔고가 1억 이상인 고객 이름과 총자산을 보여줘", "확인됨", "골든 3/3. Supervisor 재시험(2026-11-20)에서 15명 표와 잔고 → 총자산 매핑이 나옴. 비교를 '초과(>)'로 써서 정확히 1억인 고객은 빠질 수 있음"],
    ["S1-03", "단순 조회", "삼성전자 어제 체결 중 매수만 보여줘", "확인됨", "골든 3/3. Supervisor 재시험에서 어제(2026-11-19) 삼성전자 매수 체결 15건"],
    ["S2-01", "업무 용어", "VIP 고객 중 예수금 많은 순으로 10명", "불안정", "골든 2/3 (직전 1/3, 정의 보강 전 0/3). 예수금 정의에 '여러 날짜의 값을 더하면 안 된다'를 넣은 뒤 같은 질문 20번 중 19번이 최근 기준일 조건을 썼음(보강 전 6~8/10). 가끔 5일치를 합산하는 SQL이 나옴"],
    ["S2-02", "업무 용어", "이번 달 약정 상위 고객 5명", "불안정", "골든 3/3. 에이전트 재시험에서 2번(Supervisor, SQL 에이전트)은 map_terms에 질문을 옮기며 '약정'을 '약속'으로 잘못 적어 용어를 못 찾고 총자산 상위 5명을 답함. 'question은 한 글자도 바꾸지 말고 복사' 지침을 추가한 뒤 1번은 거래대금 상위 5명으로 정답"],
    ["S2-03", "업무 용어", "미수 있는 계좌 보여줘", "부분 확인", "1회 시험. 미수금이 0보다 큰 행을 찾지만 날짜별 행을 그대로 나열해 30행이 나옴"],
    ["S2-04", "업무 용어", "신용융자 계좌 보여줘", "확인됨", "골든 3/3. Supervisor 재시험에서 8개 계좌, 모두 ACCOUNT.CREDIT_LOAN_YN = 'Y'"],
    ["S2-05", "업무 용어", "이번 달 체결대금 상위 고객 5명", "불안정", "골든 3/3 (직전 3/3, 그 앞 2/3). S2-02와 같은 값이 나와야 하는데 가끔 값이 달라짐"],
    ["S3-01", "복잡 질의", "이번 달 약정 상위 10 고객과 이들의 주력 종목", "미해결", "1회 시험. CTE에서 정의한 별칭을 잘못 참조해 SQL0206 오류"],
    ["S3-02", "복잡 질의", "고객별 월 거래대금과 전월 대비 증감률", "미해결", "1회 시험. LAG는 쓰나 첫 달을 0으로 나눠 SQL0801 오류"],
    ["S3-03", "복잡 질의", "종목별 거래대금을 업종 내에서 순위 매겨줘", "불안정", "골든 3/3, Supervisor 재시험도 업종마다 순위가 1부터 다시 시작(RANK ... PARTITION BY). 질문 목록 원문 '종목별 거래대금 순위를 섹터 내에서 매겨줘'로 물으면 업종 내가 아니라 전체 순위가 나온 적이 있음"],
    ["S3-06", "복잡 질의", "VIP 고객 중 총자산 대비 예수금 비중이 30% 이상인 고객을 지점별로 보여줘", "확인됨", "Supervisor 2회 시험(2026-11-21). 두 번 모두 부산지점 남유진 1명(약 35.5%)이고 Db2 직접 계산과 같음. 최근 기준일 조건과 비율 조건 사용. 두 번째는 CTE로 짜고 > 0.3을 써서 SQL이 달랐으나 결과는 같음"],
    ["S3-07", "복잡 질의", "지점별 체결 건수와 거래대금을 거래대금 많은 순으로 보여줘", "확인됨", "Supervisor 2회 시험(2026-11-21). 두 번 모두 5개 지점, 같은 값(강남지점 116건 1,172,888,190원 등). 지점, 고객, 계좌, 주문, 체결 5개 테이블 JOIN. 합계가 업종별 합계와 같음"],
    ["S3-04", "복잡 질의", "주문 후 30분 넘게 미체결인 지정가 주문", "불안정", "골든 1/3 (직전 1/3). '30분 안에 체결이 없는 주문'으로 해석하면 20~30행, 정답은 체결이 하나도 없는 5행. 가끔 Db2 날짜 연산 문법 오류(SQL0182)"],
    ["S3-05", "복잡 질의", "계좌 잔고의 7일 이동평균", "부분 확인", "1회 시험. 실행은 되나 계좌별로 나누지 않고 전체 행을 날짜순으로 평균냄"],
    ["S4-01", "대화", "수익 좋은 고객 보여줘", "확인됨", "Supervisor가 수익 기준(실현손익, 수수료 차감 후)을 되물음 (재시험에서도 같음)"],
    ["S4-02", "대화", "이번 분기 실현손익 기준 상위 10명", "확인됨", "S4-01에 이어 같은 대화에서 질의 실행, 10명 표 반환 (재시험)"],
    ["S4-03", "대화", "그 중에 코스닥 종목 위주로 거래한 고객만", "부분 확인", "분기, 실현손익, 상위 10명 조건은 이어 붙임. 직전 10명으로 한정하지 않고 코스닥 조건으로 다시 집계"],
    ["S4-04", "대화", "작년 같은 기간이랑 비교해줘", "부분 확인", "맥락은 이어 붙이나 올해와 작년이 한 표에 섞이고 조건 우선순위가 틀려 순위 제한이 한쪽에만 걸림"],
    ["S5-01", "트레이딩", "데스크별 오늘 PnL과 한도 소진율", "부분 확인", "1회 시험. 4개 데스크의 소진율(주식2데스크 0.86 등)은 나오나 기준일을 오늘 날짜로 고정함"],
    ["S5-02", "트레이딩", "한도 대비 노출금액 비율이 80%를 넘는 데스크가 있어?", "불안정", "골든 3/3, Supervisor 재시험도 정답(주식2데스크 약 86%). 질문 목록 원문 '한도의 80%를 넘긴 데스크가 있어?'로 물으면 2번 모두 '없음'(행 단위로 80%를 비교하고 최신 기준일 합산을 빠뜨림)"],
    ["S5-03", "트레이딩", "채권 데스크 포지션 상위 5종목과 전일 대비 변동", "미해결", "1회 시험. 상위 5종목 노출금액은 나오나 전일 대비 변동은 계산하지 않음"],
    ["S6-01", "차트", "월별 거래대금 추이 보여줘 (라인 차트)", "확인됨", "Insight와 Supervisor 모두 챗 안에 선 그래프 이미지와 14개월 표가 나옴 (재시험)"],
    ["S6-02", "차트", "데스크별 PnL 비교해줘", "부분 확인", "Supervisor 재시험. 차트 이미지가 나오고 데스크 이름도 표시되나, ST_POSITIONS의 날짜별 스냅샷을 전부 합산함"],
    ["S6-03", "차트", "왜 3월에 급증했어?", "부분 확인", "Supervisor는 무엇이 급증했는지 되물음. Insight(왜 3월 거래대금이 급증했어?)는 월별 추이 이미지와 표를 주지만 업종별로 쪼개지 않고, 데이터에 없는 '전년 동월 대비' 비교 문장을 씀(데이터는 2025-10부터)"]
  ];

  function initQuestions() {
    var cls = { "확인됨": "ok", "불안정": "warn", "부분 확인": "warn", "미해결": "bad" };
    $("#qtable").innerHTML = Q.map(function (q) {
      return "<tr><td>" + esc(q[0]) + "</td><td>" + esc(q[1]) + "</td><td>" + esc(q[2]) + '</td><td><span class="tag ' + (cls[q[3]] || "") + '">' + esc(q[3]) + "</span>" +
        (q[4] ? ' <span class="muted">' + esc(q[4]) + "</span>" : "") + "</td></tr>";
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
        result: "어제(2026-11-19) 삼성전자 매수 체결 15건이 나왔고, 모든 행이 BUY, 삼성전자입니다." }
    ] },
    { cat: "업무 용어", items: [
      { q: "약정이 뭐야?",
        expect: "'약정'이 어떤 표준 용어와 컬럼에 해당하는지 설명합니다. SQL은 만들지 않습니다.",
        result: "'약정은 거래대금이며 EXECUTIONS.EXEC_AMOUNT 컬럼'이라고 답했고, 표현 → 표준 용어 표와 사용한 테이블(EXECUTIONS)을 붙였습니다." },
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
      { q: "수익 좋은 고객 보여줘  →  (이어서) 이번 분기 실현손익 기준 상위 10명",
        expect: "기준이 모호하면 SQL을 만들지 않고 되묻고, 기준을 받으면 같은 대화에서 이어서 조회합니다.",
        result: "먼저 '수익'이 실현 손익인지 수수료 차감 후 순수익인지 되물었습니다. 이어서 기준을 말하자 상위 10명 표가 나왔습니다(1위 심지우 12,068,189원)." }
    ] },
    { cat: "트레이딩", items: [
      { q: "한도 대비 노출금액 비율이 80%를 넘는 데스크가 있어?",
        expect: "가장 최근 기준일의 노출금액을 데스크별로 합산해 한도 대비 비율이 80%를 넘는 데스크를 찾습니다.",
        result: "주식2데스크 1곳이 나왔습니다(노출금액 11,555,633,582원 ÷ 한도 13,437,000,000원 = 약 86%). SQL에 최신 기준일 조건과 HAVING이 들어갔습니다.",
        warn: "'한도의 80%를 넘긴 데스크가 있어?'로 물으면 '없음'으로 답한 적이 2번 있습니다." }
    ] },
    { cat: "차트", intro: "차트는 답변 맨 위(Supervisor를 거치면 첫 문장 근처)에 이미지로 나오고, 그 아래에 요약, 표, 용어 매핑, SQL이 이어집니다. 아래 이미지는 실제 답변에 들어간 이미지입니다.", items: [
      { q: "월별 거래대금 추이를 라인 차트로 보여줘",
        expect: "연도와 월로 묶은 거래대금 합계를 선 그래프로 그리고, 같은 값을 표로 보여줍니다.",
        result: "2025-10부터 2026-11까지 14개월 선 그래프와 표가 나왔습니다(2026-11이 651,680,430원으로 최고).",
        img: "img/sample-chart-line.png" },
      { q: "업종별 거래대금 비중을 파이 차트로 보여줘",
        expect: "업종별 비중을 파이 차트로 그립니다. 항목이 8개를 넘으면 상위 7개와 '기타'로 묶습니다.",
        result: "반도체 27.43%, 2차전지 14.32%, 채권 12.54%, 게임 7.18% 순이고 나머지는 '기타 19.70%'로 묶였습니다.",
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
  initExpected();
  initGlossary();
  initEval();
  initChat();
  applyHash();
})();
