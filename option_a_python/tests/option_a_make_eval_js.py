"""option_a_eval_r{1,2,3}.json(골든 평가 결과)을 페이지용 docs/option-a/eval_results.js(window.EVAL)로 바꾼다.

통과 여부와 생성 SQL은 저장된 평가 결과 그대로 쓰고, 골든 SQL과 각 시도 SQL의 결과 미리보기(앞 5행)만 지금 Db2에서 다시 실행해 채운다.
사용법: ./venv/bin/python option_a_python/tests/option_a_make_eval_js.py
"""
import json
import sys
from datetime import date, datetime
from decimal import Decimal
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "option_b_watsonxdata" / "load"))
load_dotenv(ROOT / ".env")
from db2_conn import connect, fetch  # noqa: E402

RES = ROOT / "option_a_python" / "tests" / "results"
OUT = ROOT / "docs" / "option-a" / "eval_results.js"
DATE = date.today().isoformat()


def cell(v):
    if isinstance(v, (Decimal, datetime, date)):
        return str(v)
    return v


def preview(conn, sql):
    cols, rows = fetch(conn, sql)
    return {"columns": cols, "rows": [[cell(v) for v in r] for r in rows[:5]], "row_count": len(rows)}


def main() -> None:
    runs = [json.loads((RES / f"option_a_eval_r{i}.json").read_text(encoding="utf-8")) for i in (1, 2, 3)]
    conn = connect()
    items, ok, total = [], 0, 0
    for idx, base in enumerate(runs[0]["items"]):
        item = {"id": base["id"], "question": base["question"], "golden_sql": base["golden_sql"],
                "golden_result": preview(conn, base["golden_sql"]), "runs": []}
        for r in runs:
            src = r["items"][idx]
            assert src["id"] == base["id"]
            for run in src["runs"]:
                entry = {"sql": run["sql"], "pass": run["pass"], "status": "통과" if run["pass"] else run["status"]}
                try:
                    entry["result"] = preview(conn, run["sql"])
                except Exception as exc:  # noqa: BLE001
                    entry["result"] = None
                    entry["error"] = str(exc).splitlines()[0][-150:]
                item["runs"].append(entry)
                ok += run["pass"]
                total += 1
        items.append(item)
    payload = {"date": DATE, "n": 3, "ok": ok, "total": total, "glossary": True, "items": items}
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("window.EVAL = " + json.dumps(payload, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    print("저장:", OUT, f"{ok}/{total}")


if __name__ == "__main__":
    main()
