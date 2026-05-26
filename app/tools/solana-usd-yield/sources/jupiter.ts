import type { YieldToken } from '../YieldTable'

// Jupiter REST API response type (field names verified from API)
// NOTE: supplyRate/rewardsRate are annual rates as decimals (e.g. 0.05 = 5%)
// If they appear as very large numbers, they may be scaled by 1e12 — adjust RATE_SCALE below
const RATE_SCALE = 1 // set to 1e12 if rates come back as scaled big numbers

type JupiterTokenRaw = Record<string, unknown>

function toNumber(v: unknown): number {
  if (typeof v === 'number') return v
  if (typeof v === 'string') return parseFloat(v)
  return 0
}

function toAPY(rate: unknown): number {
  const r = toNumber(rate) / RATE_SCALE
  // If rate looks like a decimal (< 10), treat as fraction → convert to %
  // If rate looks like a % already (>= 1 and < 500), use as-is
  if (r > 0 && r < 10) return r * 100
  return r
}

export async function fetchJupiterTokens(): Promise<YieldToken[]> {
  const apiKey = process.env.JUPITER_API_KEY
  if (!apiKey) {
    console.warn('[Jupiter] JUPITER_API_KEY not set — skipping Jupiter data')
    return []
  }

  const res = await fetch('https://api.jup.ag/lend/v1/earn/tokens', {
    headers: { 'x-api-key': apiKey },
    cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'default',
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    console.error(`[Jupiter] API error: ${res.status}`)
    return []
  }

  const raw: unknown = await res.json()

  // Log raw response in development to verify field names
  if (process.env.NODE_ENV === 'development') {
    const sample = Array.isArray(raw) ? raw[0] : Object.values(raw as object)[0]
    console.log('[Jupiter] sample token fields:', JSON.stringify(sample, null, 2))
  }

  const items: JupiterTokenRaw[] = Array.isArray(raw)
    ? raw
    : Object.values(raw as Record<string, JupiterTokenRaw>)

  return items
    .map((t): YieldToken | null => {
      // Field name candidates — adjust after seeing real response
      const symbol = String(t.symbol ?? t.mint ?? t.tokenAddress ?? '')
      const supplyRate = t.supplyRate ?? t.supplyApy ?? t.apy ?? 0
      const rewardsRate = t.rewardsRate ?? t.rewardApy ?? t.rewardsApy ?? 0
      const totalAssets = toNumber(t.totalAssets ?? t.tvl ?? t.liquidity ?? 0)
      const decimals = toNumber(t.decimals ?? 6)

      const apy = toAPY(supplyRate) + toAPY(rewardsRate)
      // totalAssets is in token units — divide by decimals to get real amount, assume $1 peg
      const tvlUsd = totalAssets / Math.pow(10, decimals)

      if (!symbol || apy < 4 || tvlUsd < 1_000_000) return null

      return {
        pool: String(t.tokenAddress ?? t.mint ?? symbol),
        symbol,
        project: 'Jupiter Lend',
        apy,
        tvlUsd,
        apyBase: toAPY(supplyRate),
        apyReward: toAPY(rewardsRate) || null,
        twitter: 'JupiterExchange',
        maxMultiplyAPY: null,   // calculated in page.tsx after merging
        multiplyProtocols: ['Jupiter Multiply'],
        minBorrowRate: 0,       // filled in page.tsx
        source: 'jupiter',
      }
    })
    .filter((t): t is YieldToken => t !== null)
}
