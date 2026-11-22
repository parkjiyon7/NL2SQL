"""few-shot 있음/없음 골든 평가 결과(eval_golden.py --export 산출물 2개)를 HTML용 docs/eval_ab.js로 합친다.

실행: ./venv/bin/python option_b_watsonxdata/tests/export_ab_js.py <있음.js> <없음.js>
"""
import json
import pathlib
import re
import sys

OUT = pathlib.Path(__file__).resolve().parents[2] / "docs" / "eval_ab.js"


def load(p):
    return json.loads(re.sub(r"^window\.EVAL = |;\s*$", "", pathlib.Path(p).read_text(encoding="utf-8")))


def main(with_p, without_p) -> None:
    a, b = load(with_p), load(without_p)
    items = []
    for x, y in zip(a["items"], b["items"]):
        assert x["id"] == y["id"]
        items.append({"id": x["id"], "question": x["question"],
                      "with": [r["pass"] for r in x["runs"]],
                      "without": [{"pass": r["pass"], "status": r["status"]} for r in y["runs"]]})
    data = {"with": {"date": a["date"], "n": a["n"], "ok": a["ok"], "total": a["total"]},
            "without": {"date": b["date"], "n": b["n"], "ok": b["ok"], "total": b["total"]}, "items": items}
    OUT.write_text("window.EVAL_AB = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    print(f"wrote {OUT.name}: 있음 {a['ok']}/{a['total']}, 없음 {b['ok']}/{b['total']}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
