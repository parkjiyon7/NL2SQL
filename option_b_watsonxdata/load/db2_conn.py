"""Db2 접속 공통 모듈. .env의 DB2_* 값을 읽는다. 비밀번호는 코드에 쓰지 않는다."""
import os
from pathlib import Path

import ibm_db
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[2]
load_dotenv(ROOT / ".env")

SCHEMA = os.environ.get("DB2_SCHEMA", "FIN_DEMO")


def dsn() -> str:
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
        parts["SSLServerCertificate"] = str(ROOT / os.environ["DB2_SSL_CERT"])
    return ";".join(f"{k}={v}" for k, v in parts.items()) + ";"


def connect():
    return ibm_db.connect(dsn(), "", "")


def fetch(conn, sql: str):
    """SELECT를 실행해 (컬럼명 목록, 행 목록)을 돌려준다."""
    stmt = ibm_db.exec_immediate(conn, sql)
    cols = [ibm_db.field_name(stmt, i) for i in range(ibm_db.num_fields(stmt))]
    rows = []
    row = ibm_db.fetch_tuple(stmt)
    while row:
        rows.append(row)
        row = ibm_db.fetch_tuple(stmt)
    return cols, rows
