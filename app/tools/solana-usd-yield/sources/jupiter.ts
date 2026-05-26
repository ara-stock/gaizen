import type { YieldToken } from '../YieldTable'

// Jupiter API returns rates in basis points (e.g. 550 = 5.50%)
type JupiterTokenRaw = Record<string, unknown>

function toNumber(v: unknown): number {
  if (typeof v === 'number') return v
  if (typeof v === 'string') return parseFloat(v)
  return 0
}

function toAPY(rate: unknown): number {
  // API returns APR in basis points (e.g. 550 = 5.50% APR)
  // Convert to APY with daily compounding: (1 + APR/365)^365 - 1
  const apr = toNumber(rate) / 100 / 100 // bps → decimal
  return (Math.pow(1 + apr / 365, 365) - 1) * 100
}

export async function fetchJupiterTokens(): Promise<YieldToken[]> {
  const res = await fetch('https://api.jup.ag/lend/v1/earn/tokens', {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    console.error(`[Jupiter] API error: ${res.status}`)
    return []
  }

  const raw: unknown = await res.json()

  const items: JupiterTokenRaw[] = Array.isArray(raw)
    ? raw
    : Object.values(raw as Record<string, JupiterTokenRaw>)

  return items
    .map((t): YieldToken | null => {
      const asset = t.asset as Record<string, unknown> | null
      const symbol = String(t.uiSymbol ?? asset?.symbol ?? t.symbol ?? '')
      const supplyRate = t.supplyRate ?? 0
      const rewardsRate = t.rewardsRate ?? 0
      const totalAssets = toNumber(t.totalAssets ?? 0)
      const decimals = toNumber(t.decimals ?? 6)

      const apyBase = toAPY(supplyRate)
      const apyReward = toAPY(rewardsRate)
      const apy = apyBase + apyReward
      // totalAssets is in token units — divide by 10^decimals, assume $1 peg
      const tvlUsd = totalAssets / Math.pow(10, decimals)

      if (!symbol || apy < 4 || tvlUsd < 1_000_000) return null

      const assetSymbol = String(asset?.symbol ?? '').toUpperCase()
      const isPlainStablecoin = ['USDC', 'USDT', 'USDG', 'USDS', 'USDB', 'DAI', 'BUSD'].includes(assetSymbol)

      return {
        pool: String(t.address ?? symbol),
        symbol,
        project: 'Jupiter Lend',
        apy,
        tvlUsd,
        apyBase,
        apyReward: apyReward > 0 ? apyReward : null,
        twitter: 'JupiterExchange',
        maxMultiplyAPY: null,   // calculated in page.tsx after merging
        multiplyProtocols: isPlainStablecoin ? null : ['Jupiter Multiply'],
        minBorrowRate: 0,       // filled in page.tsx
        source: 'jupiter',
      }
    })
    .filter((t): t is YieldToken => t !== null)
}
