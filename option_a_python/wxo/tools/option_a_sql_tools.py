"""FIN_DEMO SQL 실행 툴 (A안). SQL은 wxO 에이전트의 LLM(gpt-oss-120b)이 쓰고, 이 툴은 Db2에서 실행만 한다.

계약: shared/spec/tool-contract.md (run_sql). 실패해도 예외를 던지지 않고 error 필드를 채운다.
연결(connection)
  option_a_db2 : host, port, database, user, password, ssl_cert_b64(PEM을 base64, '=' 패딩 제거)
"""
import base64
import os
import re
import tempfile
import time
from typing import Any, Dict, List, Optional

from ibm_watsonx_orchestrate.agent_builder.connections import ConnectionType, ExpectedCredentials
from ibm_watsonx_orchestrate.agent_builder.tools import ToolPermission, tool
from ibm_watsonx_orchestrate.run import connections

DB2_APP = "option_a_db2"

def _ms(t0: float) -> int:
    return int((time.time() - t0) * 1000)


def _cfg() -> Dict[str, str]:
    cfg = dict(connections.key_value(DB2_APP))
    missing = [k for k in ("host", "port", "database", "user", "password", "ssl_cert_b64") if k not in cfg]
    if missing:
        raise KeyError(f"connection {DB2_APP}: missing {missing}, available keys {sorted(cfg)}")
    return cfg


class _Db2:
    """Db2 연결 한 번. with 블록이 끝나면 연결과 임시 인증서 파일을 정리한다."""

    def __enter__(self):
        import ibm_db  # 런타임에만 필요

        self.ibm_db = ibm_db
        cfg = _cfg()
        pem = base64.b64decode(cfg["ssl_cert_b64"] + "=" * (-len(cfg["ssl_cert_b64"]) % 4))
        fd, self.cert_path = tempfile.mkstemp(suffix=".crt")
        with os.fdopen(fd, "wb") as f:
            f.write(pem)
        dsn = (f"DATABASE={cfg['database']};HOSTNAME={cfg['host']};PORT={cfg['port']};PROTOCOL=TCPIP;"
               f"UID={cfg['user']};PWD={cfg['password']};SECURITY=SSL;SSLServerCertificate={self.cert_path};")
        self.conn = ibm_db.connect(dsn, "", "")
        return self

    def __exit__(self, *exc):
        try:
            self.ibm_db.close(self.conn)
        except Exception:  # noqa: BLE001
            pass
        try:
            os.remove(self.cert_path)
        except OSError:
            pass
        return False

    def query(self, sql: str, max_rows: Optional[int] = None):
        """(컬럼명 목록, 행 목록, 잘렸는지)를 돌려준다."""
        stmt = self.ibm_db.exec_immediate(self.conn, sql)
        cols = [self.ibm_db.field_name(stmt, i) for i in range(self.ibm_db.num_fields(stmt))]
        rows: List[List[Any]] = []
        truncated = False
        row = self.ibm_db.fetch_tuple(stmt)
        while row:
            if max_rows is not None and len(rows) >= max_rows:
                truncated = True
                break
            rows.append([v if isinstance(v, (int, float, str, type(None))) else str(v) for v in row])
            row = self.ibm_db.fetch_tuple(stmt)
        return cols, rows, truncated


def _error_type(msg: str) -> str:
    if re.search(r"SQL0104N|SQL0199N|SQL0103N|SQL0105N", msg):
        return "syntax"
    if re.search(r"SQL0204N|SQL0206N|SQL0203N", msg):
        return "unknown_object"
    if "SQL0952N" in msg or "timeout" in msg.lower():
        return "timeout"
    return "execution"


@tool(permission=ToolPermission.READ_ONLY,
      expected_credentials=[ExpectedCredentials(app_id=DB2_APP, type=ConnectionType.KEY_VALUE)])
def option_a_run_sql(sql: str, max_rows: int = 200) -> dict:
    """Run one read-only SELECT statement on the FIN_DEMO Db2 database and return the rows. Only SELECT or WITH statements are accepted. Use this for every SQL execution; there is no other database access.

    Args:
        sql (str): One Db2 SELECT statement.
        max_rows (int): Maximum number of rows to return. Default 200.
    Returns:
        dict: ok, columns, rows, row_count, truncated, executed_sql, elapsed_ms, engine, error. error is null on success, otherwise an object with type and message.
    """
    t0 = time.time()
    out: Dict[str, Any] = {"ok": False, "columns": [], "rows": [], "row_count": 0, "truncated": False,
                           "executed_sql": sql, "elapsed_ms": 0, "engine": "db2", "error": None}
    statement = sql.strip().rstrip(";").strip()
    if ";" in statement or not re.match(r"(?is)^\s*(select|with)\b", statement):
        out["error"] = {"type": "blocked", "message": "Only a single SELECT statement is allowed."}
        out["elapsed_ms"] = _ms(t0)
        return out
    try:
        with _Db2() as db:
            cols, rows, truncated = db.query(statement, max_rows)
        out.update(ok=True, columns=cols, rows=rows, row_count=len(rows), truncated=truncated)
    except Exception as exc:  # noqa: BLE001
        msg = str(exc)
        out["error"] = {"type": _error_type(msg), "message": msg.splitlines()[0][:400] if msg else type(exc).__name__}
    out["elapsed_ms"] = _ms(t0)
    return out
