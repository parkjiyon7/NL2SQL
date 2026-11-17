#!/usr/bin/env bash
# wxO(활성 환경)에 연결, 툴, 에이전트를 순서대로 올린다. 저장소 루트의 .env에서 비밀 값을 읽는다.
# 사용법: bash option_b_watsonxdata/wxo/scripts/import-all.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
WXO="$ROOT/option_b_watsonxdata/wxo"
cd "$ROOT"
# shellcheck disable=SC1091
source venv/bin/activate
set -a; source .env; set +a

echo "== 활성 환경"; orchestrate env list | grep -E "\(active\)" || true

echo "== connections"
orchestrate connections import -f "$WXO/connections/findemo_db2.yaml"
orchestrate connections import -f "$WXO/connections/findemo_wxdi.yaml"
for app in findemo_db2 findemo_wxdi; do
  orchestrate connections configure -a "$app" --env draft --kind key_value --type team
done
CERT_B64="$(base64 < "$ROOT/$DB2_SSL_CERT" | tr -d '\n=')"
orchestrate connections set-credentials -a findemo_db2 --env draft \
  -e "host=$DB2_HOST" -e "port=$DB2_PORT" -e "database=$DB2_DATABASE" \
  -e "user=$DB2_USER" -e "password=$DB2_PASSWORD" -e "ssl_cert_b64=$CERT_B64"
orchestrate connections set-credentials -a findemo_wxdi --env draft \
  -e "url=$WXDI_URL" -e "api_key=$WXDI_API_KEY" -e "project_id=$WXDI_PROJECT_ID"

echo "== tools"
orchestrate tools import -k python -f "$WXO/tools/findemo_sql_tools.py" -r "$WXO/tools/requirements.txt" \
  --app-id findemo_db2 --app-id findemo_wxdi
orchestrate tools import -k python -f "$WXO/tools/findemo_context_tools.py" -r "$WXO/tools/requirements.txt" \
  --app-id findemo_wxdi
orchestrate tools import -k python -f "$WXO/tools/findemo_chart_tools.py" -r "$WXO/tools/requirements.txt"

# 에이전트가 있으면 올린다
if ls "$WXO"/agents/*.yaml >/dev/null 2>&1; then
  echo "== agents"
  for f in "$WXO"/agents/*.yaml; do orchestrate agents import -f "$f"; done
fi
echo "완료"
