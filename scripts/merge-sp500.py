"""
S&P500データを取得してsharpe-prices.jsonに追加するスクリプト
"""
import json
import pandas as pd
import yfinance as yf

START = "2020-01-01"
END = "2026-01-01"
OUTPUT_JSON = "public/data/sharpe-prices.json"

# S&P500取得
print("Fetching S&P500 (^GSPC)...")
df = yf.download("^GSPC", start=START, end=END, interval="1mo", auto_adjust=True, progress=False)

if isinstance(df.columns, pd.MultiIndex):
    df.columns = df.columns.get_level_values(0)

df = df[["Close"]].copy()
df.index = pd.to_datetime(df.index) + pd.offsets.MonthEnd(0)
df = df.sort_index()

dates = df.index.strftime("%Y-%m-%d").tolist()
prices = [round(float(p), 4) for p in df["Close"].tolist()]
print(f"  OK: {len(prices)} months")

# 既存JSONに追加
with open(OUTPUT_JSON, encoding="utf-8") as f:
    data = json.load(f)

data["series"]["S&P500"] = {
    "ticker": "^GSPC",
    "dates": dates,
    "prices": prices,
}

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Merged into: {OUTPUT_JSON}")
print(f"Total series: {len(data['series'])}")
