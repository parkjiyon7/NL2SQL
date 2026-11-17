"""Db2 접속 점검 (읽기 전용). 사용법: ./venv/bin/python option_a_python/tests/check_db2.py

.env의 DB2_* 값으로 접속해서 서버 정보와 현재 사용자의 DB 권한을 조회한다. 데이터를 바꾸지 않는다.
"""
import os
import sys
from pathlib import Path

import ibm_db
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[2]
load_dotenv(ROOT / ".env")


def dsn() -> str:
    cert = ROOT / os.environ["DB2_SSL_CERT"]
    parts = {
        "DATABASE": os.environ["DB2_DATABASE"],
        "HOSTNAME": os.environ["DB2_HOST"],
        "PORT": os.environ["DB2_PORT"],
        "PROTOCOL": "TCPIP",
        "UID": os.environ["DB2_USER"],
        "PWD": os.environ["DB2_PASSWORD"],
    }
    if os.environ.get("DB2_SSL", "true").lower() == "true":
        parts["SECURITY"] = "SSL"
        parts["SSLServerCertificate"] = str(cert)
    return ";".join(f"{k}={v}" for k, v in parts.items()) + ";"


def fetch(conn, sql):
    stmt = ibm_db.exec_immediate(conn, sql)
    rows = []
    row = ibm_db.fetch_tuple(stmt)
    while row:
        rows.append(row)
        row = ibm_db.fetch_tuple(stmt)
    return rows


def main() -> int:
    try:
        conn = ibm_db.connect(dsn(), "", "")
    except Exception as exc:  # 접속 오류 메시지를 그대로 보여 준다 (비밀번호는 포함되지 않는다)
        print(f"접속 실패: {exc}")
        return 1
    print("접속 성공")
    print("서버/사용자:", fetch(conn, "SELECT CURRENT SERVER, CURRENT USER FROM SYSIBM.SYSDUMMY1")[0])
    try:
        print("서비스 레벨:", fetch(conn, "SELECT SERVICE_LEVEL FROM SYSIBMADM.ENV_INST_INFO")[0][0])
    except Exception as exc:
        print("서비스 레벨 조회 불가:", str(exc).splitlines()[0])
    try:
        rows = fetch(
            conn,
            "SELECT GRANTEE, CONNECTAUTH, CREATETABAUTH, IMPLSCHEMAAUTH, LOADAUTH "
            "FROM SYSCAT.DBAUTH WHERE GRANTEE = CURRENT USER",
        )
        print("DB 권한 (GRANTEE, CONNECT, CREATETAB, IMPLSCHEMA, LOAD):", rows)
    except Exception as exc:
        print("권한 조회 불가:", str(exc).splitlines()[0])
    ibm_db.close(conn)
    return 0


if __name__ == "__main__":
    sys.exit(main())
