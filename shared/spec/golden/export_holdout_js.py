"""홀드아웃 골든셋 A안/B안 비교 결과를 HTML 데모용 JS(docs/compare_holdout.js)로 내보낸다.

입력: shared/spec/golden/golden_holdout.json (make_holdout.py가 만듦)
      option_a_python/tests/results/holdout_A.json, holdout_B.json (option_a_eval_golden.py --golden ... --json)
출력: docs/compare_holdout.js, docs/option-a/compare_holdout.js (같은 내용)
사용법: ./venv/bin/python shared/spec/golden/export_holdout_js.py
"""
import datetime
import json
import sys
from decimal import Decimal
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "option_b_watsonxdata" / "load"))
from db2_conn import connect, fetch  # noqa: E402

RES = ROOT / "option_a_python" / "tests" / "results"


def cell(v):
    if isinstance(v, (Decimal, datetime.date, datetime.datetime)):
        return str(v)
    return v


def main() -> int:
    gold = json.loads((ROOT / "shared/spec/golden/golden_holdout.json").read_text(encoding="utf-8"))
    runs = {k: json.loads((RES / f"holdout_{k}.json").read_text(encoding="utf-8")) for k in ("A", "B")}
    conn = connect()
    items = []
    for g in gold:
        cols, rows = fetch(conn, g["sql"])
        item = {"id": g["id"], "question": g["question"], "template": g["template"], "golden_sql": g["sql"],
                "golden_result": {"columns": cols, "rows": [[cell(v) for v in r] for r in rows[:5]], "row_count": len(rows)}}
        for k in ("A", "B"):
            it = next(x for x in runs[k]["items"] if x["id"] == g["id"])
            assert it["question"] == g["question"], (k, g["id"])
            item[k] = [{"pass": r["pass"], "status": r["status"], "sql": r.get("sql", "")} for r in it["runs"]]
        items.append(item)
    payload = {
        "date": datetime.date.today().isoformat(),
        "n": len(items[0]["A"]), "seed": 20261125,
        "A": {"agent": runs["A"]["agent"], "ok": runs["A"]["ok"], "total": runs["A"]["total"]},
        "B": {"agent": runs["B"]["agent"], "ok": runs["B"]["ok"], "total": runs["B"]["total"]},
        "items": items,
    }
    text = "window.COMPARE = " + json.dumps(payload, ensure_ascii=False, indent=1) + ";\n"
    for p in (ROOT / "docs" / "compare_holdout.js", ROOT / "docs" / "option-a" / "compare_holdout.js"):
        p.write_text(text, encoding="utf-8")
        print("저장:", p)
    print("A", payload["A"], "B", payload["B"])
    return 0


if __name__ == "__main__":
    sys.exit(main())
