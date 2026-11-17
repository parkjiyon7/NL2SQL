"""Db2에 FIN_DEMO 스키마의 테이블을 만들고 합성 데이터를 적재한다.

사용법: ./venv/bin/python option_b_watsonxdata/load/load_db2.py

- FIN_DEMO 스키마의 테이블만 지우고 다시 만든다. 다른 스키마는 건드리지 않는다.
- 몇 번 실행해도 같은 상태가 된다. (실행일 기준으로 최근 날짜가 만들어진다.)
"""
import sys
from pathlib import Path

import ibm_db

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
sys.path.insert(0, str(HERE.parents[1] / "shared" / "datagen"))

from db2_conn import SCHEMA, connect, fetch  # noqa: E402
from generate import COLUMNS, TABLE_ORDER, generate  # noqa: E402

BATCH = 1000


def run(conn, sql: str):
    ibm_db.exec_immediate(conn, sql)


def main() -> int:
    if SCHEMA.upper() != "FIN_DEMO":
        print(f"DB2_SCHEMA가 FIN_DEMO가 아니다: {SCHEMA}. 안전을 위해 중단한다.")
        return 1
    conn = connect()
    ibm_db.autocommit(conn, ibm_db.SQL_AUTOCOMMIT_OFF)

    _, rows = fetch(conn, f"SELECT COUNT(*) FROM SYSCAT.SCHEMATA WHERE SCHEMANAME = '{SCHEMA}'")
    if rows[0][0] == 0:
        run(conn, f"CREATE SCHEMA {SCHEMA}")
        ibm_db.commit(conn)

    for t in reversed(TABLE_ORDER):
        _, ex = fetch(conn, f"SELECT COUNT(*) FROM SYSCAT.TABLES WHERE TABSCHEMA = '{SCHEMA}' AND TABNAME = '{t}'")
        if ex[0][0]:
            run(conn, f"DROP TABLE {SCHEMA}.{t}")
    ibm_db.commit(conn)

    ddl = (HERE / "db2_ddl.sql").read_text(encoding="utf-8")
    for stmt in [s.strip() for s in ddl.split(";\n") if s.strip()]:
        run(conn, stmt.rstrip(";"))
    ibm_db.commit(conn)
    print("테이블과 코멘트 생성 완료")

    data = generate()
    for t in TABLE_ORDER:
        cols = COLUMNS[t]
        stmt = ibm_db.prepare(conn, f"INSERT INTO {SCHEMA}.{t} ({', '.join(cols)}) VALUES ({', '.join('?' * len(cols))})")
        rows = data[t]
        for i in range(0, len(rows), BATCH):
            ibm_db.execute_many(stmt, tuple(rows[i:i + BATCH]))
        ibm_db.commit(conn)
        print(f"{t:14s} {len(rows):>7d}건 적재")
    ibm_db.close(conn)
    return 0


if __name__ == "__main__":
    sys.exit(main())
