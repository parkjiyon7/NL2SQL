"""A안(wxO 전용) 골든 질의 평가. 배포된 option_a_sql_agent에 질문을 보내고, 답변의 "사용한 SQL" 코드 블록을 Db2에서 실행해 골든 SQL 결과와 비교한다.

같다의 기준: 행 수가 같고, 골든의 각 행 값이 후보의 어떤 행에 (컬럼 순서, 이름, 추가 컬럼 무관) 모두 들어 있다.
사용법: ./venv/bin/python option_a_python/tests/option_a_eval_golden.py [-n 1] [--agent option_a_sql_agent] [--json 결과.json] [ID ...]
필요한 .env: WXO_URL, WXO_API_KEY, DB2_*
"""
import argparse
import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import requests
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "option_b_watsonxdata" / "load"))
import os  # noqa: E402

load_dotenv(ROOT / ".env")
from db2_conn import connect, fetch  # noqa: E402

WXO_URL = os.environ["WXO_URL"].rstrip("/")
_tok = {"v": None, "exp": 0.0}


def token() -> str:
    if _tok["v"] and time.time() < _tok["exp"] - 60:
        return _tok["v"]
    r = requests.post("https://iam.cloud.ibm.com/identity/token", timeout=30,
                      data={"grant_type": "urn:ibm:params:oauth:grant-type:apikey", "apikey": os.environ["WXO_API_KEY"]})
    r.raise_for_status()
    _tok.update(v=r.json()["access_token"], exp=time.time() + int(r.json().get("expires_in", 3600)))
    return _tok["v"]


def hdr() -> dict:
    return {"Authorization": f"Bearer {token()}", "Content-Type": "application/json"}


def agent_id(name: str) -> str:
    r = requests.get(f"{WXO_URL}/v1/orchestrate/agents", headers=hdr(), timeout=60)
    r.raise_for_status()
    for a in r.json():
        if a.get("name") == name:
            return a["id"]
    raise SystemExit(f"agent not found: {name}")


def ask(aid: str, question: str) -> str:
    """질문을 보내고 최종 답변 텍스트를 돌려준다."""
    r = requests.post(f"{WXO_URL}/v1/orchestrate/runs", headers=hdr(), timeout=60, params={"stream": "false"},
                      json={"agent_id": aid, "message": {"role": "user", "content": question}})
    r.raise_for_status()
    run_id = r.json()["run_id"]
    for _ in range(120):
        time.sleep(3)
        s = requests.get(f"{WXO_URL}/v1/orchestrate/runs/{run_id}", headers=hdr(), timeout=60).json()
        if s.get("status") in ("completed", "failed"):
            break
    if s.get("status") != "completed":
        raise RuntimeError(f"run {s.get('status')}: {str(s.get('last_error'))[:200]}")
    msgs = requests.get(f"{WXO_URL}/v1/orchestrate/threads/{s['thread_id']}/messages", headers=hdr(), timeout=60).json()
    texts = []
    for m in msgs:
        if m.get("role") == "assistant":
            for c in m.get("content", []):
                if c.get("response_type") == "text":
                    texts.append(c.get("text", ""))
    return texts[-1] if texts else ""


def last_sql(answer: str) -> str:
    blocks = re.findall(r"```(?:sql)?\s*(.*?)```", answer, re.S | re.I)
    sqls = [b.strip().rstrip(";") for b in blocks if re.match(r"(?is)^\s*(select|with)\b", b.strip())]
    if not sqls:
        raise ValueError("답변에 SQL 코드 블록이 없다")
    return sqls[-1]


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
    ap.add_argument("-n", type=int, default=1)
    ap.add_argument("--agent", default="option_a_sql_agent")
    ap.add_argument("--golden", default="shared/spec/golden/golden.json", help="골든 JSON 경로(ROOT 기준)")
    ap.add_argument("--json", help="질문별 생성 SQL과 판정을 JSON으로 저장")
    ap.add_argument("ids", nargs="*")
    args = ap.parse_args()
    golden = [g for g in json.loads((ROOT / args.golden).read_text(encoding="utf-8"))
              if not args.ids or g["id"] in args.ids]
    aid = agent_id(args.agent)
    conn = connect()

    def run(g):
        try:
            return last_sql(ask(aid, g["question"]))
        except Exception as exc:  # noqa: BLE001
            return f"__ERR__ {exc}"

    jobs = [g for g in golden for _ in range(args.n)]
    with ThreadPoolExecutor(4) as ex:
        sqls = list(ex.map(run, jobs))

    results, ok = {}, 0
    for g, sql in zip(jobs, sqls):
        _, gold = fetch(conn, g["sql"])
        if sql.startswith("__ERR__"):
            status = "생성실패 " + sql[8:].strip()[:100]
        else:
            try:
                _, rows = fetch(conn, sql)
                status = "OK" if same(gold, rows) else f"불일치({len(rows)}행/정답 {len(gold)}행)"
            except Exception as exc:  # noqa: BLE001
                status = "실행오류 " + str(exc).splitlines()[0][-80:]
        ok += status == "OK"
        results.setdefault(g["id"], []).append((status, sql))
    for g in golden:
        s = results[g["id"]]
        print(f"{g['id']} {sum(x[0] == 'OK' for x in s)}/{len(s)}  {g['question']}")
        for status, sql in s:
            if status != "OK":
                print("      -", status, "|", sql[:300].replace("\n", " "))
    print(f"\n합계 {ok}/{len(jobs)} = {ok / len(jobs):.0%}")
    if args.json:
        payload = {"ok": ok, "total": len(jobs), "agent": args.agent,
                   "items": [{"id": g["id"], "question": g["question"], "golden_sql": g["sql"],
                              "runs": [{"pass": st == "OK", "status": st, "sql": q} for st, q in results[g["id"]]]}
                             for g in golden]}
        Path(args.json).write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")
        print("저장:", args.json)
    return 0


if __name__ == "__main__":
    sys.exit(main())
