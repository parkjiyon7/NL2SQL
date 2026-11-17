"""SQL 샘플 CSV를 wxdi 프로젝트에 데이터 자산으로 올린다 (Watson Data API).

사용법: ./venv/bin/python option_b_watsonxdata/fewshots/upload_fewshots.py
같은 이름의 자산이 이미 있으면 지우고 다시 올린다. .env의 WXDI_URL, WXDI_API_KEY, WXDI_PROJECT_ID 필요.
"""
import os
import sys
from pathlib import Path

import requests
from dotenv import load_dotenv

HERE = Path(__file__).resolve().parent
load_dotenv(HERE.parents[1] / ".env")
NAME = "text_to_sql_fewshots_0.csv"
URL = os.environ["WXDI_URL"].rstrip("/")
PROJECT = os.environ["WXDI_PROJECT_ID"]


def token() -> str:
    r = requests.post("https://iam.cloud.ibm.com/identity/token", timeout=30,
                      data={"grant_type": "urn:ibm:params:oauth:grant-type:apikey", "apikey": os.environ["WXDI_API_KEY"]})
    r.raise_for_status()
    return r.json()["access_token"]


def main() -> int:
    h = {"Authorization": f"Bearer {token()}"}
    jh = {**h, "Content-Type": "application/json"}
    p = {"project_id": PROJECT}

    # 기존 자산 삭제
    s = requests.post(f"{URL}/v2/asset_types/data_asset/search", params=p, headers=jh, timeout=60,
                      json={"query": f"asset.name:{NAME}", "limit": 10})
    for it in s.json().get("results", []):
        aid = it["metadata"]["asset_id"]
        if it["metadata"]["name"] == NAME:
            requests.delete(f"{URL}/v2/assets/{aid}", params=p, headers=h, timeout=60)
            print("기존 자산 삭제:", aid)

    r = requests.post(f"{URL}/v2/assets", params=p, headers=jh, timeout=60, json={
        "metadata": {"name": NAME, "asset_type": "data_asset", "origin_country": "us", "asset_category": "USER"},
        "entity": {"data_asset": {"mime_type": "text/csv"}},
    })
    r.raise_for_status()
    aid = r.json()["metadata"]["asset_id"]

    r = requests.post(f"{URL}/v2/assets/{aid}/attachments", params=p, headers=jh, timeout=60,
                      json={"asset_type": "data_asset", "name": "remote", "mime": "text/csv"})
    r.raise_for_status()
    att = r.json()
    up = att["url1"]
    if up.startswith("/"):
        up = URL + up
    put = requests.put(up, data=(HERE / NAME).read_bytes(), headers={"Content-Type": "text/csv"}, timeout=120)
    put.raise_for_status()

    r = requests.post(f"{URL}/v2/assets/{aid}/attachments/{att['attachment_id']}/complete", params=p, headers=h, timeout=60)
    r.raise_for_status()
    print("업로드 완료. asset_id =", aid)
    return 0


if __name__ == "__main__":
    sys.exit(main())
