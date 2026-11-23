"""골든 질의 대비 Text-to-SQL 정확도 평가.

shared/spec/golden/golden.json의 질문마다 wxdi generate_queries를 N회 호출하고,
생성 SQL의 실행 결과가 골든 SQL 결과와 같은지 비교한다.
같다의 기준: 행 수가 같고, 골든의 각 행 값이 후보의 어떤 행에 (컬럼 순서, 이름, 추가 컬럼 무관) 모두 들어 있다.

사용법: ./venv/bin/python option_b_watsonxdata/tests/eval_golden.py [-n 3] [--no-glossary] [--export docs/eval_results.js] [ID ...]
  기본은 SQL 에이전트와 같은 구성(map_terms로 용어 치환과 정의 전달)이다.
  --no-glossary: 용어집 단계 없이 질문 원문만 넘긴다.
  --export: 질문별 골든 SQL과 결과, 생성 SQL과 결과(앞 5행)를 HTML 데모용 JS 파일로 저장한다.
"""
import argparse
import datetime
import json
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[2]
load_dotenv(ROOT / ".env")
sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(ROOT / "option_b_watsonxdata" / "load"))
from db2_conn import connect, fetch  # noqa: E402
from eval_text2sql import WXDI_CFG, generate  # noqa: E402
from findemo_sql_tools import load_catalog_info  # noqa: E402


def norm(v) -> str:
    try:
        return str(round(float(v), 2))
    except (TypeError, ValueError):
        return str(v).strip()


def same(gold_rows, cand_rows) -> bool:
    if len(gold_rows) != len(cand_rows):
        return False
    pool = [[norm(v) for v in r] for r in cand_rows]
    for g in gold_rows:
        gv = [norm(v) for v in g]
        for i, c in enumerate(pool):
            tmp = list(c)
            if all(x in tmp and not tmp.remove(x) for x in gv):
                pool.pop(i)
                break
        else:
            return False
    return True


def preview(cols, rows, limit=5) -> dict:
    """HTML에 보여줄 결과 요약(앞 5행). 합성 데이터라서 값은 가리지 않는다."""
    out = []
    for r in rows[:limit]:
        out.append([v if isinstance(v, (int, float, str, type(None))) else str(v) for v in r])
    return {"columns": [str(c) for c in cols], "rows": out, "row_count": len(rows)}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("-n", type=int, default=3)
    ap.add_argument("--no-glossary", action="store_true")
    ap.add_argument("--export")
    ap.add_argument("ids", nargs="*")
    args = ap.parse_args()
    golden = [g for g in json.loads((ROOT / "shared/spec/golden/golden.json").read_text(encoding="utf-8"))
              if not args.ids or g["id"] in args.ids]
    load_catalog_info(WXDI_CFG)  # 스레드가 동시에 카탈로그를 읽지 않도록 캐시를 미리 채운다
    conn = connect()

    def gen(q):
        try:
            return generate(q, glossary=not args.no_glossary)
        except Exception as exc:  # noqa: BLE001
            return f"__ERR__ {exc}"

    jobs = [(g, i) for g in golden for i in range(args.n)]
    with ThreadPoolExecutor(4) as ex:
        sqls = list(ex.map(lambda j: gen(j[0]["question"]), jobs))

    total = ok = 0
    results = {}
    details = {}
    for (g, _), sql in zip(jobs, sqls):
        gcols, gold = fetch(conn, g["sql"])
        d = details.setdefault(g["id"], {"id": g["id"], "question": g["question"], "golden_sql": g["sql"],
                                         "golden_result": preview(gcols, gold), "runs": []})
        total += 1
        run = {"sql": "" if sql.startswith("__ERR__") else sql, "result": None}
        if sql.startswith("__ERR__"):
            status = "생성실패"
            run["error"] = sql[8:].strip()[:200]
        else:
            try:
                ccols, rows = fetch(conn, sql)
                run["result"] = preview(ccols, rows)
                status = "OK" if same(gold, rows) else f"불일치({len(rows)}행/정답 {len(gold)}행)"
            except Exception as exc:  # noqa: BLE001
                status = "실행오류 " + str(exc).splitlines()[0][-80:]
                run["error"] = str(exc).splitlines()[0][-200:]
        run["pass"] = status == "OK"
        run["status"] = status
        d["runs"].append(run)
        ok += status == "OK"
        results.setdefault(g["id"], []).append(status)
    for g in golden:
        s = results[g["id"]]
        print(f"{g['id']} {s.count('OK')}/{len(s)}  {g['question']}")
        for x in s:
            if x != "OK":
                print("      -", x)
    print(f"\n합계 {ok}/{total} = {ok / total:.0%}")
    if args.export:
        payload = {"date": datetime.date.today().isoformat(), "n": args.n, "ok": ok, "total": total,
                   "glossary": not args.no_glossary, "items": [details[g["id"]] for g in golden]}
        Path(args.export).write_text("window.EVAL = " + json.dumps(payload, ensure_ascii=False, indent=1) + ";\n",
                                     encoding="utf-8")
        print("저장:", args.export)
    return 0


if __name__ == "__main__":
    sys.exit(main())
