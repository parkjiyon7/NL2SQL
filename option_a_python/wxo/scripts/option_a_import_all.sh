#!/usr/bin/env bash
# A안(SQL 생성은 wxO gpt-oss-120b, 용어집과 카탈로그는 wxdi): wxO(활성 환경)에 연결, 툴, 에이전트를 순서대로 올린다. 저장소 루트의 .env에서 비밀 값을 읽는다.
# 사용법: bash option_a_python/wxo/scripts/option_a_import_all.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
WXO="$ROOT/option_a_python/wxo"
cd "$ROOT"
# shellcheck disable=SC1091
source venv/bin/activate
set -a; source .env; set +a

echo "== 활성 환경"; orchestrate env list | grep -E "\(active\)" || true

echo "== connections"
orchestrate connections import -f "$WXO/connections/option_a_db2.yaml"
orchestrate connections configure -a option_a_db2 --env draft --kind key_value --type team
CERT_B64="$(base64 < "$ROOT/$DB2_SSL_CERT" | tr -d '\n=')"
orchestrate connections set-credentials -a option_a_db2 --env draft \
  -e "host=$DB2_HOST" -e "port=$DB2_PORT" -e "database=$DB2_DATABASE" \
  -e "user=$DB2_USER" -e "password=$DB2_PASSWORD" -e "ssl_cert_b64=$CERT_B64"

orchestrate connections import -f "$WXO/connections/option_a_wxdi.yaml"
orchestrate connections configure -a option_a_wxdi --env draft --kind key_value --type team
orchestrate connections set-credentials -a option_a_wxdi --env draft \
  -e "url=$WXDI_URL" -e "api_key=$WXDI_API_KEY" -e "project_id=$WXDI_PROJECT_ID"

echo "== tools"
REQ="$WXO/tools/option_a_requirements.txt"
orchestrate tools import -k python -f "$WXO/tools/option_a_sql_tools.py" -r "$REQ" --app-id option_a_db2
orchestrate tools import -k python -f "$WXO/tools/option_a_context_tools.py" -r "$REQ" --app-id option_a_wxdi
orchestrate tools import -k python -f "$WXO/tools/option_a_chart_tools.py" -r "$REQ"

echo "== agents (하위 에이전트 먼저)"
for name in option_a_context_agent option_a_sql_agent option_a_insight_agent option_a_supervisor_agent; do
  orchestrate agents import -f "$WXO/agents/$name.yaml"
done
echo "완료"
