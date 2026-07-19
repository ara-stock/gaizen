import json
import os
import time
from datetime import date

import yfinance as yf
import pandas as pd

# =====================================
# 設定
# =====================================

TICKERS = {
    "^GSPC": "S&P500",
    "8058.T": "三菱商事",
    "8001.T": "伊藤忠商事",
    "8031.T": "三井物産",
    "8053.T": "住友商事",
    "8002.T": "丸紅",
    "8020.T": "兼松",
    "8306.T": "三菱UFJ FG",
    "8316.T": "三井住友 FG",
    "8766.T": "東京海上HD",
    "8473.T": "SBIホールディングス",
    "8591.T": "オリックス",
    "8593.T": "三菱HCキャピタル",
    "8425.T": "みずほリース",
    "8801.T": "三井不動産",
    "9984.T": "ソフトバンクグループ",
    "MSFT": "Microsoft",
    "GOOGL": "Alphabet",
    "AMZN": "Amazon",
    "NET": "Cloudflare",
    "AAPL": "Apple",
    "PLTR": "Palantir",
    "BTC-USD": "Bitcoin",
}

START = "2020-01-01"
# Exclude the current partial month from rolling comparisons.
END = date.today().replace(day=1).isoformat()

OUTPUT_JSON = "public/data/sharpe-prices.json"

# =====================================
# メイン
# =====================================


def fetch_monthly(ticker: str) -> pd.DataFrame:
    df = yf.download(ticker, start=START, end=END, interval="1mo", auto_adjust=True, progress=False)

    if df.empty:
        raise ValueError(f"No data: {ticker}")

    df = df[["Close"]].copy()
    df.index = pd.to_datetime(df.index)
    df.index = df.index + pd.offsets.MonthEnd(0)
    df = df.sort_index()
    df.columns = ["close"]

    return df


def main():
    series = {}

    for ticker, name in TICKERS.items():
        print(f"Fetching: {name} ({ticker})")
        try:
            df = fetch_monthly(ticker)
            dates = df.index.strftime("%Y-%m-%d").tolist()
            prices = [round(float(p), 4) for p in df["close"].tolist()]

            series[name] = {
                "ticker": ticker,
                "dates": dates,
                "prices": prices,
            }
            print(f"  OK: {len(prices)} months")

        except Exception as e:
            print(f"  ERROR: {e}")

        time.sleep(0.3)

    latest_month = max(item["dates"][-1][:7] for item in series.values())
    output = {
        "updatedAt": latest_month,
        "start": START[:7],
        "series": series,
    }

    os.makedirs("public/data", exist_ok=True)

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\nSaved: {OUTPUT_JSON}")
    print(f"Tickers OK: {len(series)} / {len(TICKERS)}")


if __name__ == "__main__":
    main()
