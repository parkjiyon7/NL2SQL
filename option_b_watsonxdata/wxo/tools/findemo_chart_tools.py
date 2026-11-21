"""FIN_DEMO 차트 툴 (B안). run_sql 결과를 차트 명세(ECharts option)로 바꾼다.

계약: shared/spec/tool-contract.md (make_chart). 실패해도 예외를 던지지 않고 error 필드를 채운다.
성공하면 차트 이미지(QuickChart https 주소, 마크다운 이미지; 먼저 /chart/create POST로 짧은 주소를 받고 실패하면 긴 주소)를 답변 맨 위에 넣고 요약, 표, 용어 매핑, SQL까지 조립해 돌려준다.
위젯(user_defined)은 툴 응답을 그대로 최종 답변으로 쓰게 하려고 함께 싣는다. `build_chart`의 `rendered`(막대 █, 스파크라인)는
이미지를 못 쓰는 화면용 텍스트 대체이며 wxO 응답에는 쓰지 않는다.
"""
import json
import time
from urllib.parse import quote
from typing import Any, Dict, List, Optional

import requests
from ibm_watsonx_orchestrate.agent_builder.tools import ToolPermission, tool

CHART_TYPES = ("line", "bar", "pie")
MAX_POINTS = 60
BAR_WIDTH = 20
PIE_MAX = 8
SPARK = "▁▂▃▄▅▆▇█"


def _ms(t0: float) -> int:
    return int((time.time() - t0) * 1000)


def _num(v: Any) -> Optional[float]:
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def _fmt(v: float) -> str:
    return f"{v:,.0f}" if abs(v) >= 100 or v == int(v) else f"{v:,.2f}"


def _table(headers: List[str], rows: List[List[Any]]) -> str:
    lines = ["| " + " | ".join(headers) + " |", "|" + "|".join("---" for _ in headers) + "|"]
    lines += ["| " + " | ".join("" if c is None else str(c) for c in r) + " |" for r in rows]
    return "\n".join(lines)


def build_chart(chart_type: str, columns: List[str], rows: List[List[Any]], x: str, y: List[str],
                title: Optional[str]) -> Dict[str, Any]:
    if chart_type not in CHART_TYPES:
        raise ValueError(f"chart_type must be one of {CHART_TYPES}")
    xs = [c.strip() for c in x.split(",")]  # "year,month"처럼 여러 컬럼이면 "2025-10" 형태로 합친다
    for name in [*xs, *y]:
        if name not in columns:
            raise ValueError(f"column {name} is not in columns {columns}")
    if not y:
        raise ValueError("y needs at least one column")
    if not rows:
        raise ValueError("rows is empty")
    xis = [columns.index(c) for c in xs]
    yis = [columns.index(c) for c in y]
    rows = rows[:MAX_POINTS]
    cats = ["-".join(f"{int(r[i]):02d}" if str(r[i]).isdigit() and k else str(r[i]) for k, i in enumerate(xis))
            for r in rows]
    series_vals = [[_num(r[i]) for r in rows] for i in yis]
    if any(v is None for vals in series_vals for v in vals):
        raise ValueError("y columns must be numeric")

    if chart_type == "pie":
        if len(cats) > PIE_MAX:  # 상위 PIE_MAX-1개와 나머지를 합친 '기타'
            order = sorted(range(len(cats)), key=lambda k: series_vals[0][k], reverse=True)
            keep, rest = order[:PIE_MAX - 1], order[PIE_MAX - 1:]
            cats = [cats[k] for k in keep] + ["기타"]
            series_vals = [[s[k] for k in keep] + [sum(s[k] for k in rest)] for s in series_vals]
        option = {"title": {"text": title or ""}, "tooltip": {"trigger": "item"},
                  "series": [{"type": "pie", "name": y[0],
                              "data": [{"name": c, "value": v} for c, v in zip(cats, series_vals[0])]}]}
    else:
        option = {"title": {"text": title or ""}, "tooltip": {"trigger": "axis"}, "legend": {"data": y},
                  "xAxis": {"type": "category", "data": cats}, "yAxis": {"type": "value"},
                  "series": [{"type": chart_type, "name": n, "data": v} for n, v in zip(y, series_vals)]}

    fallback = _table([x, *y], [[c, *[_fmt(s[k]) for s in series_vals]] for k, c in enumerate(cats)])

    head = f"**{title}**\n\n" if title else ""
    if chart_type == "line":
        parts = []
        for name, vals in zip(y, series_vals):
            lo, hi = min(vals), max(vals)
            span = (hi - lo) or 1
            spark = "".join(SPARK[int((v - lo) / span * (len(SPARK) - 1))] for v in vals)
            parts.append(f"{name}: {spark}  (최소 {_fmt(lo)}, 최대 {_fmt(hi)}, {cats[0]} → {cats[-1]})")
        rendered = head + "\n\n".join(parts) + "\n\n" + fallback
    else:
        vals = series_vals[0]
        top = max(abs(v) for v in vals) or 1
        total = sum(vals) or 1
        body = []
        for c, v in zip(cats, vals):
            bar = "█" * max(1, round(abs(v) / top * BAR_WIDTH)) if v else ""
            share = f" ({v / total:.0%})" if chart_type == "pie" else ""
            body.append([c, _fmt(v) + share, bar])
        rendered = head + _table([x, y[0], "차트"], body)
    return {"chart_spec": option, "fallback_table": fallback, "rendered": rendered,
            "image_url": _chart_url(chart_type, cats, series_vals, y, title)}


def _chart_url(chart_type: str, cats: List[str], series_vals: List[List[float]], names: List[str],
               title: Optional[str]) -> str:
    """차트 이미지 https 주소(QuickChart). wxO 기본 챗은 https 마크다운 이미지만 그리므로 여기에 맞춘다."""
    top = max(abs(v) for s in series_vals for v in s)
    div, unit = (1e8, "억") if top >= 1e8 else (1e4, "만") if top >= 1e5 else (1, "")
    sets = [{"label": n, "data": [round(v / div, 2) for v in vals]} for n, vals in zip(names, series_vals)]
    if chart_type == "pie":
        sets = [{"data": sets[0]["data"]}]
    else:
        for d in sets:
            d["fill"] = False
    opts: Dict[str, Any] = {"plugins": {"title": {"display": bool(title), "text": title or ""},
                                        "legend": {"display": chart_type == "pie" or len(sets) > 1}}}
    if unit and chart_type != "pie":
        opts["scales"] = {"y": {"title": {"display": True, "text": f"({unit})"}}}
    cfg = {"type": chart_type, "data": {"labels": cats, "datasets": sets}, "options": opts}
    try:  # 짧은 주소를 먼저 받는다. LLM이 긴 %인코딩 주소를 복사하다 글자를 빠뜨리기 때문
        r = requests.post("https://quickchart.io/chart/create", timeout=8, json={
            "version": "4", "width": 640, "height": 340, "backgroundColor": "white", "format": "png", "chart": cfg})
        if r.ok and r.json().get("url", "").startswith("https://"):
            return r.json()["url"]
    except Exception:  # noqa: BLE001
        pass
    return ("https://quickchart.io/chart?v=4&w=640&h=340&bkg=white&c="
            + quote(json.dumps(cfg, ensure_ascii=False, separators=(",", ":"))))


def _answer_text(fallback_table: str, summary: Optional[str], term_mapping: Optional[str],
                 sql: Optional[str]) -> str:
    parts = []
    if summary:
        parts.append(summary.strip())
    parts.append(fallback_table)
    if term_mapping:
        parts.append("**용어 매핑**\n" + term_mapping.strip())
    if sql:
        parts.append("**사용한 SQL**\n```sql\n" + sql.strip() + "\n```")
    return "\n\n".join(parts)


@tool(permission=ToolPermission.READ_ONLY)
def make_chart(chart_type: str, columns: List[str], rows: List[List[Any]], x: str, y: List[str],
               title: Optional[str] = None, summary: Optional[str] = None,
               term_mapping: Optional[str] = None, sql: Optional[str] = None) -> dict:
    """Turn a run_sql result into a chart and show it to the user. On success the reply starts with the chart as an https image and the reply text is built by this tool from summary, a data table, term_mapping and sql, then sent to the user as it is. Nothing can be added after this tool, so pass the full answer text through the arguments. Use line for a time series, bar to compare items, pie for shares of a whole. Pass columns and rows exactly as run_sql returned them.

    Args:
        chart_type (str): One of line, bar, pie.
        columns (List[str]): Column names from the run_sql result.
        rows (List[List[Any]]): Rows from the run_sql result. At most 60 rows are charted.
        x (str): Column used for the x axis or the categories. For year and month in separate columns, pass both comma separated, for example "year,month".
        y (List[str]): Numeric column names for the values. Pie uses the first one.
        title (Optional[str]): Chart title.
        summary (Optional[str]): One or two sentences with the key conclusion, shown above the table.
        term_mapping (Optional[str]): Lines like "표현 → 표준 용어 (대응 컬럼)", shown under the heading 용어 매핑.
        sql (Optional[str]): The SQL that produced the rows, shown under the heading 사용한 SQL.
    Returns:
        dict: On success a chat response with the answer text and a chart widget. On failure chart_spec null, fallback_table, error.
    """
    t0 = time.time()
    out: Dict[str, Any] = {"chart_spec": None, "fallback_table": None, "rendered": None,
                           "image_url": None, "engine": "python", "elapsed_ms": 0, "error": None}
    try:
        out.update(build_chart(chart_type, columns, rows, x, y, title))
    except Exception as exc:  # noqa: BLE001
        out["error"] = {"type": "chart", "message": f"{type(exc).__name__}: {exc}"[:300]}
        if rows and columns:  # 차트를 못 만들면 표라도 돌려준다
            out["fallback_table"] = _table(columns, [[str(c) for c in r] for r in rows[:MAX_POINTS]])
        out["elapsed_ms"] = _ms(t0)
        return out
    text = _answer_text(out["fallback_table"], summary, term_mapping, sql)
    text = f"![{title or '차트'}]({out['image_url']})\n\n" + text  # 기본 챗에서도 보이는 https 이미지
    return {
        "content": [{"type": "text", "annotations": {"audience": ["user", "assistant"]}, "text": text}],
        "_meta": {"com.ibm.orchestrate/widget": {
            "response_type": "user_defined",
            "user_defined": {"user_defined_type": "chart", "title": title or "", "chart_spec": out["chart_spec"]},
        }},
    }
