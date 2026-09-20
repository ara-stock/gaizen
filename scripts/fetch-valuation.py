#!/usr/bin/env python3
"""Refresh the `valuation` block of each project in content/projects/projects.json.

FDV and market cap come from CoinGecko, revenue and holders' revenue from DefiLlama.
Only projects that already carry `valuation.coingeckoId` and `valuation.defillamaSlug` are touched.

Usage: python3 scripts/fetch-valuation.py
"""
import json
import time
import urllib.request
from datetime import date
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / 'content/projects/projects.json'
DAY = 86400


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'gaizen-tracker'})
    with urllib.request.urlopen(req, timeout=30) as res:
        return json.load(res)


def window(chart, days):
    """Sum of the last `days` days, in USD millions."""
    if not chart:
        return None
    end = chart[-1][0]
    return round(sum(v or 0 for t, v in chart if end - days * DAY < t <= end) / 1e6, 2)


def llama(slug, data_type):
    try:
        return get(f'https://api.llama.fi/summary/fees/{slug}?dataType={data_type}').get('totalDataChart') or []
    except Exception as err:  # a protocol without holders' revenue returns an error page
        print(f'  {slug} {data_type}: {err}')
        return []


def main():
    data = json.loads(DATA.read_text(encoding='utf-8'))
    targets = [p for p in data['projects'] if p.get('valuation', {}).get('coingeckoId')]
    ids = ','.join(p['valuation']['coingeckoId'] for p in targets)
    markets = {m['id']: m for m in get(f'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids={ids}')}

    for p in targets:
        v = p['valuation']
        market = markets.get(v['coingeckoId'])
        if not market:
            print(f"{p['slug']}: not found on CoinGecko, skipped")
            continue
        revenue = llama(v['defillamaSlug'], 'dailyRevenue')
        holders = llama(v['defillamaSlug'], 'dailyHoldersRevenue')
        v.update({
            'priceUsd': market['current_price'],
            'marketCapUsdM': round(market['market_cap'] / 1e6, 1),
            'fdvUsdM': round((market['fully_diluted_valuation'] or market['market_cap']) / 1e6, 1),
            'revenue365UsdM': window(revenue, 365),
            'revenue90UsdM': window(revenue, 90),
            'holders365UsdM': window(holders, 365),
            'holders90UsdM': window(holders, 90),
            'asOf': date.today().isoformat(),
        })
        print(f"{p['slug']}: FDV ${v['fdvUsdM']}M, revenue 365d ${v['revenue365UsdM']}M")
        time.sleep(1.5)  # stay under the public rate limits

    DATA.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


if __name__ == '__main__':
    main()
