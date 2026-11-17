"""FIN_DEMO 차트 툴 (B안). run_sql 결과를 차트 명세(ECharts option)와 마크다운 표현으로 바꾼다.

계약: shared/spec/tool-contract.md (make_chart). 실패해도 예외를 던지지 않고 error 필드를 채운다.
wxO 챗은 마크다운만 보여 주므로 `rendered`에 막대(█)와 스파크라인(▁▂▃▄▅▆▇█)을 넣은 마크다운 표를 함께 돌려준다.
"""
import time
from typing import Any, Dict, List, Optional

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
    return {"chart_spec": option, "fallback_table": fallback, "rendered": rendered}


@tool(permission=ToolPermission.READ_ONLY)
def make_chart(chart_type: str, columns: List[str], rows: List[List[Any]], x: str, y: List[str],
               title: Optional[str] = None) -> dict:
    """Turn a run_sql result into a chart. Returns an ECharts-compatible chart_spec and a markdown rendering with text bars (bar, pie) or a sparkline (line) that can be shown in chat as it is. Use line for a time series, bar to compare items, pie for shares of a whole. Pass columns and rows exactly as run_sql returned them.

    Args:
        chart_type (str): One of line, bar, pie.
        columns (List[str]): Column names from the run_sql result.
        rows (List[List[Any]]): Rows from the run_sql result. At most 60 rows are charted.
        x (str): Column used for the x axis or the categories. For year and month in separate columns, pass both comma separated, for example "year,month".
        y (List[str]): Numeric column names for the values. Pie uses the first one.
        title (Optional[str]): Chart title.
    Returns:
        dict: chart_spec, fallback_table, rendered, engine, elapsed_ms, error. error is null on success.
    """
    t0 = time.time()
    out: Dict[str, Any] = {"chart_spec": None, "fallback_table": None, "rendered": None,
                           "engine": "python", "elapsed_ms": 0, "error": None}
    try:
        out.update(build_chart(chart_type, columns, rows, x, y, title))
    except Exception as exc:  # noqa: BLE001
        out["error"] = {"type": "chart", "message": f"{type(exc).__name__}: {exc}"[:300]}
        if rows and columns:  # 차트를 못 만들면 표라도 돌려준다
            out["fallback_table"] = _table(columns, [[str(c) for c in r] for r in rows[:MAX_POINTS]])
    out["elapsed_ms"] = _ms(t0)
    return out
