"""골든 질의 대비 Text-to-SQL 정확도 평가.

shared/spec/golden/golden.json의 질문마다 wxdi generate_queries를 N회 호출하고,
생성 SQL의 실행 결과가 골든 SQL 결과와 같은지 비교한다.
같다의 기준: 행 수가 같고, 골든의 각 행 값이 후보의 어떤 행에 (컬럼 순서, 이름, 추가 컬럼 무관) 모두 들어 있다.

사용법: ./venv/bin/python option_b_watsonxdata/tests/eval_golden.py [-n 3] [ID ...]
"""
import argparse
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
from eval_text2sql import generate, token  # noqa: E402


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


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("-n", type=int, default=3)
    ap.add_argument("ids", nargs="*")
    args = ap.parse_args()
    golden = [g for g in json.loads((ROOT / "shared/spec/golden/golden.json").read_text(encoding="utf-8"))
              if not args.ids or g["id"] in args.ids]
    headers = {"Authorization": f"Bearer {token()}", "Content-Type": "application/json"}
    conn = connect()

    def gen(q):
        try:
            return generate(headers, q)
        except Exception as exc:  # noqa: BLE001
            return f"__ERR__ {exc}"

    jobs = [(g, i) for g in golden for i in range(args.n)]
    with ThreadPoolExecutor(4) as ex:
        sqls = list(ex.map(lambda j: gen(j[0]["question"]), jobs))

    total = ok = 0
    results = {}
    for (g, _), sql in zip(jobs, sqls):
        _, gold = fetch(conn, g["sql"])
        total += 1
        if sql.startswith("__ERR__"):
            status = "생성실패"
        else:
            try:
                _, rows = fetch(conn, sql)
                status = "OK" if same(gold, rows) else f"불일치({len(rows)}행/정답 {len(gold)}행)"
            except Exception as exc:  # noqa: BLE001
                status = "실행오류 " + str(exc).splitlines()[0][-80:]
        ok += status == "OK"
        results.setdefault(g["id"], []).append(status)
    for g in golden:
        s = results[g["id"]]
        print(f"{g['id']} {s.count('OK')}/{len(s)}  {g['question']}")
        for x in s:
            if x != "OK":
                print("      -", x)
    print(f"\n합계 {ok}/{total} = {ok / total:.0%}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
