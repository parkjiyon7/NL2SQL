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
    '  SUP --> CTX["Context 에이전트"]',
    '  SUP --> SQLA["SQL 에이전트"]',
    '  SUP --> INS["Insight 에이전트"]',
    '  CTX --> T1["map_terms"]',
    '  CTX --> T2["get_catalog"]',
    '  SQLA --> T3["generate_sql"]',
    '  SQLA --> T4["run_sql"]',
    '  INS --> T3',
    '  INS --> T4',
    '  INS --> T5["make_chart"]',
    '  T1 --> G["wxdi 용어집"]',
    '  T2 --> C["wxdi 카탈로그 (프로젝트 자산)"]',
    '  T3 --> TS["wxdi Text-to-SQL REST"]',
    '  T4 --> DB[("Db2 FIN_DEMO")]',
    '  T5 --> CH["차트 스펙, 텍스트 렌더링"]'
  ].join("\n");

  var SEQ = [
    "sequenceDiagram",
    "  autonumber",
    "  actor U as 사용자",
    "  participant S as Supervisor",
    "  participant C as Context",
    "  participant I as Insight",
    "  participant W as wxdi",
    "  participant D as Db2",
    "  U->>S: 월별 거래대금 추이를 라인 차트로",
    "  S->>C: 용어 확인 요청",
    "  C->>W: map_terms, get_catalog",
    "  W-->>C: 거래대금 = EXEC_AMOUNT",
    "  C-->>S: 용어 매핑, 테이블 구조",
    "  S->>I: 차트 요청 (매핑 포함)",
    "  I->>W: generate_sql (필요 시 재생성)",
    "  W-->>I: SQL",
    "  I->>D: run_sql",
    "  D-->>I: 월별 집계 행",
    "  I->>I: make_chart (line)",
    "  I-->>S: 차트와 요약",
    "  S-->>U: 답변 + 근거 보기"
  ].join("\n");

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
        window.mermaid.initialize({ startOnLoad: false, securityLevel: "loose", theme: "neutral", flowchart: { htmlLabels: true, curve: "basis" } });
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
    ["1막 값 조회", "오늘 강남지점 체결 건수와 거래대금", "확인됨", "골든 3/3"],
    ["1막 값 조회", "삼성전자 어제 체결 중 매수만 보여줘", "확인됨", "Supervisor 시험, 11건"],
    ["2막 용어", "약정이 뭐야? 약정 상위 고객", "확인됨", "Context 시험"],
    ["2막 용어", "VIP 고객 수를 지점별로 알려줘", "확인됨", "Supervisor 시험"],
    ["2막 용어", "신용융자를 쓰는 고객은 몇 명이야?", "확인됨", "골든 3/3"],
    ["2막 용어", "고객별 총 거래대금 상위 5명", "확인됨", "골든 3/3"],
    ["3막 복잡 질의", "3월 거래대금 큰 종목 상위 3개", "확인됨", "골든 2/3"],
    ["3막 복잡 질의", "종목별 거래대금을 업종 내 순위로", "확인됨", "골든 3/3"],
    ["4막 대화", "수익 좋은 고객 보여줘", "확인됨", "기준을 되묻기"],
    ["4막 대화", "VIP 고객을 지점별로 → 그럼 강남지점만", "확인됨", "맥락 유지"],
    ["5막 트레이딩", "한도 대비 노출금액이 80%를 넘는 데스크가 있어?", "확인됨", "골든 2/3"],
    ["6막 차트", "월별 거래대금 추이를 라인 차트로 보여줘", "확인됨", "Supervisor 시험, 14개월"],
    ["6막 차트", "업종별 거래대금 비중을 파이 차트로", "확인됨", "Insight 시험"],
    ["6막 차트", "3월에 거래대금이 왜 늘었어?", "확인됨", "Insight 시험, 반도체 쏠림"]
  ];

  function initQuestions() {
    var cls = { "확인됨": "ok" };
    $("#qtable").innerHTML = Q.map(function (q) {
      return "<tr><td>" + esc(q[0]) + "</td><td>" + esc(q[1]) + '</td><td><span class="tag ' + (cls[q[2]] || "") + '">' + esc(q[2]) + "</span>" +
        (q[3] ? ' <span class="muted">' + esc(q[3]) + "</span>" : "") + "</td></tr>";
    }).join("");
  }

  /* ---------- 챗 ---------- */
  var chatInstance = null;
  var mockOpen = false;

  function chatReady() {
    var c = window.CHAT_CONFIG || {};
    return !!(c.enabled && c.orchestrationID && c.hostURL && c.crn && c.agentId && c.agentEnvironmentId);
  }

  function setMock(open) {
    mockOpen = open;
    $("#mock-chat").hidden = !open;
    $("#mock-launcher").hidden = open;
  }

  function initChat() {
    if (chatReady()) {
      var c = window.CHAT_CONFIG;
      window.wxOConfiguration = {
        orchestrationID: c.orchestrationID,
        hostURL: c.hostURL,
        rootElementID: "root",
        deploymentPlatform: c.deploymentPlatform || "ibmcloud",
        crn: c.crn,
        showLauncher: true,
        layout: { form: "float", showOrchestrateHeader: true, showAgentSwitcher: false },
        chatOptions: {
          agentId: c.agentId,
          agentEnvironmentId: c.agentEnvironmentId,
          onLoad: function (instance) { chatInstance = instance; }
        }
      };
      var s = document.createElement("script");
      s.src = c.hostURL.replace(/\/$/, "") + "/wxochat/wxoLoader.js?embed=true";
      s.addEventListener("load", function () {
        if (window.wxoLoader && window.wxoLoader.init) window.wxoLoader.init();
      });
      document.head.appendChild(s);
      $("#open-chat").addEventListener("click", function () {
        if (chatInstance && chatInstance.toggle) chatInstance.toggle();
      });
    } else {
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
        if (chatInstance.toggle) chatInstance.toggle();
        chatInstance.send(text);
      } else {
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
  initChat();
  applyHash();
})();
