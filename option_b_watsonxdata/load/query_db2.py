"""Db2에 SELECT 질의를 실행하고 결과를 표로 보여 준다. (읽기 전용: SELECT와 WITH만 허용)

사용법
  ./venv/bin/python option_b_watsonxdata/load/query_db2.py "SELECT * FROM FIN_DEMO.BRANCH"
  ./venv/bin/python option_b_watsonxdata/load/query_db2.py --tables       # FIN_DEMO 테이블 목록과 건수
  ./venv/bin/python option_b_watsonxdata/load/query_db2.py --columns ORDERS # 테이블 컬럼과 설명
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from db2_conn import SCHEMA, connect, fetch  # noqa: E402

TABLES_SQL = (
    "SELECT TABNAME AS TABLE_NAME, CARD AS ROWS_STAT, REMARKS FROM SYSCAT.TABLES "
    f"WHERE TABSCHEMA = '{SCHEMA}' AND TYPE = 'T' ORDER BY TABNAME"
)


def show(cols, rows, limit=50):
    cells = [[("" if v is None else str(v)) for v in r] for r in rows[:limit]]
    widths = [max([len(c)] + [len(r[i]) for r in cells]) for i, c in enumerate(cols)]
    line = lambda vals: " | ".join(v.ljust(w) for v, w in zip(vals, widths))
    print(line(cols))
    print("-+-".join("-" * w for w in widths))
    for r in cells:
        print(line(r))
    print(f"({len(rows)}행{', 처음 %d행만 표시' % limit if len(rows) > limit else ''})")


def main(argv) -> int:
    if not argv:
        print(__doc__)
        return 1
    conn = connect()
    if argv[0] == "--tables":
        cols, rows = fetch(conn, TABLES_SQL)
        out = []
        for name, _, remarks in rows:
            _, c = fetch(conn, f"SELECT COUNT(*) FROM {SCHEMA}.{name}")
            out.append((name, c[0][0], remarks))
        show(["TABLE_NAME", "ROWS", "REMARKS"], out)
        return 0
    if argv[0] == "--columns":
        sql = ("SELECT COLNAME, TYPENAME, LENGTH, REMARKS FROM SYSCAT.COLUMNS "
               f"WHERE TABSCHEMA = '{SCHEMA}' AND TABNAME = '{argv[1].upper()}' ORDER BY COLNO")
        show(*fetch(conn, sql), limit=200)
        return 0
    sql = " ".join(argv).strip().rstrip(";")
    if not sql.upper().startswith(("SELECT", "WITH")) or ";" in sql:
        print("SELECT 또는 WITH로 시작하는 한 문장만 실행할 수 있다.")
        return 1
    show(*fetch(conn, sql))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
