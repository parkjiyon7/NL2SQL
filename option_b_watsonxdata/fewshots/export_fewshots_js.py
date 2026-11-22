"""HTML(docs/fewshots.js)용 few-shot 예시 목록을 만든다. 원본은 wxdi에 올린 text_to_sql_fewshots_0.csv다.

실행: ./venv/bin/python option_b_watsonxdata/fewshots/export_fewshots_js.py
"""
import csv
import json
import pathlib

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parents[1] / "docs" / "fewshots.js"

# 구조가 비슷한 골든 질문과, 골든과 다르게 한 점 (질문 문장 -> (골든 번호, 다른 점))
NEAR_GOLDEN = {
    "SK하이닉스 어제 체결 중 매도만 보여줘": ("S1-03", "종목(삼성전자 → SK하이닉스), 매수 → 매도"),
    "오늘 여의도지점 체결 건수와 거래대금 알려줘": ("S1-01", "지점(강남 → 여의도)"),
    "거래대금이 큰 고객 상위 3명": ("S2-05", "기간(이번 달)이 없고 3명"),
    "올해 약정이 큰 고객 7명": ("S2-02", "기간(이번 달 → 올해), 5명 → 7명"),
    "고객 등급별로 고객 거래대금 순위를 매겨줘": ("S3-03", "순위 기준(업종 → 고객 등급), 대상(종목 → 고객)"),
    "노출금액이 한도의 60%를 넘은 데스크 이름과 소진율": ("S5-02", "기준(80% → 60%), 문장"),
    "GOLD 등급 고객 중 예수금이 많은 순으로 3명": ("S2-01", "등급(VIP → GOLD), 10명 → 3명"),
    "연금 계좌만 보여줘": ("S2-04", "조건(신용융자 여부 → 계좌 유형)"),
    "주문 후 1시간 넘게 미체결인 매수 주문": ("S3-04", "시간(30분 → 1시간), 지정가 → 매수"),
    "체결이 하나도 없는 매도 주문을 종목별로 세어줘": ("S3-04", "지정가 → 매도, 종목별 건수"),
}


def main() -> None:
    items = []
    with (HERE / "text_to_sql_fewshots_0.csv").open(encoding="utf-8", newline="") as f:
        for q, evidence, sql in csv.reader(f):
            near = NEAR_GOLDEN.get(q)
            items.append({"q": q, "evidence": evidence, "sql": sql,
                          "golden": near[0] if near else "", "diff": near[1] if near else ""})
    OUT.write_text("window.FEWSHOTS = " + json.dumps(items, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    print(f"wrote {OUT.name}: {len(items)}건, 골든과 구조가 비슷한 예시 {sum(1 for i in items if i['golden'])}건")


if __name__ == "__main__":
    main()
