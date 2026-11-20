"""제품 Text-to-SQL(wxdi generate_queries)이 만든 SQL을 Db2에서 실행해 보는 점검 스크립트.

사용법
  ./venv/bin/python option_b_watsonxdata/tests/eval_text2sql.py                 # 기본 질문 세트
  ./venv/bin/python option_b_watsonxdata/tests/eval_text2sql.py "질문1" "질문2" # 직접 지정

필요한 .env 값: WXDI_URL, WXDI_API_KEY, WXDI_PROJECT_ID, DB2_*
SQL 생성만 하는 API라서 실행은 Db2 접속으로 직접 한다. 실행은 SELECT만 한다.
"""
import os
import sys
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "load"))
from db2_conn import connect, fetch  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "wxo" / "tools"))
from findemo_context_tools import find_terms  # noqa: E402
from findemo_sql_tools import call_wxdi, fix_qualifiers, load_catalog_info  # noqa: E402

URL = os.environ["WXDI_URL"].rstrip("/")
PROJECT = os.environ["WXDI_PROJECT_ID"]
WXDI_CFG = {"url": URL, "api_key": os.environ["WXDI_API_KEY"], "project_id": PROJECT}
DEFAULT_QUESTIONS = [
    "잔고가 1억 이상인 고객 이름과 총자산을 보여줘",
    "VIP 고객 수를 지점별로 알려줘",
    "삼성전자 어제 체결 중 매수만 보여줘",
    "고객별 총 거래대금 상위 5명",
    "종목별 거래대금을 업종 내에서 순위 매겨줘",
    "한도 대비 노출금액 비율이 80%를 넘는 데스크가 있어?",
]


def apply_glossary(question: str):
    """SQL 에이전트가 하는 map_terms 단계를 흉내 낸다. 질문 속 별칭을 표준 용어로 바꾸고 glossary_hints를 돌려준다."""
    res = find_terms(WXDI_CFG, question, None)
    for m in res["mappings"]:
        if m["matched_text"] != m["term"]:
            question = question.replace(m["matched_text"], m["term"])
    return question, res["glossary_hints"]


def generate(question: str, glossary: bool = True) -> str:
    """wxdi로 SQL을 한 번 만든다. wxO generate_sql 툴과 같은 call_wxdi를 쓴다(카탈로그 FK를 Note로 첨부). glossary면 map_terms 단계(용어 치환과 정의 전달)를 거친다."""
    hints = None
    if glossary:
        question, hints = apply_glossary(question)
    res = call_wxdi(WXDI_CFG, question, None, hints)
    return fix_qualifiers(res["generated_query"].strip().rstrip(";"), res["tables"])


def main(questions) -> int:
    load_catalog_info(WXDI_CFG)  # 캐시를 미리 채운다
    conn = connect()
    for q in questions or DEFAULT_QUESTIONS:
        print("Q:", q)
        try:
            sql = generate(q)
        except Exception as exc:
            print("  생성 실패:", exc)
            continue
        print("  SQL:", sql)
        try:
            _, rows = fetch(conn, sql)
            print("  실행 OK:", len(rows), "행", rows[:2])
        except Exception as exc:
            print("  실행 오류:", str(exc).splitlines()[0][:200])
    return 0


if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parents[2] / ".env")
    sys.exit(main(sys.argv[1:]))
