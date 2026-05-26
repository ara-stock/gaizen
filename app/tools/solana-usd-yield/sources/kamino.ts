import type { YieldToken } from '../YieldTable'

// Extract a short symbol from vault name
// e.g. "Ondo USDY Loop" → "USDY", "Ethena Prime" → "USDe", "USDC Stable" → "USDC"
function extractSymbol(name: string, tags: string[]): string {
  const upper = name.toUpperCase()
  const candidates = ['USDY', 'USDC', 'USDT', 'USDS', 'USDE', 'USDV', 'USD1', 'USX', 'EUSX', 'PST', 'ONYC', 'SYRUP']
  for (const c of candidates) {
    if (upper.includes(c)) return c
  }
  // fallback: first word
  return name.split(' ')[0]
}

export async function fetchKaminoTokens(): Promise<YieldToken[]> {
  const res = await fetch('https://api.kamino.finance/kvaults/vaults', {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    console.error(`[Kamino] API error: ${res.status}`)
    return []
  }

  const allVaults: Array<{
    title: string
    slug: string
    tags: string[] | null
    metrics: { apy?: string | null; tvl?: string | null } | null
  }> = await res.json()

  return allVaults
    .filter(v => {
      if (!v.tags || !Array.isArray(v.tags)) return false
      return v.tags.includes('RWA Loops') || v.tags.includes('Stable Loops')
    })
    .map(v => {
      const rawApy = parseFloat(v.metrics?.apy ?? '0')
      const apy = rawApy * 100
      const tvlRaw = v.metrics?.tvl
      const tvlUsd = tvlRaw ? parseFloat(tvlRaw) : 0

      if (apy < 4 || tvlUsd < 1_000_000) return null

      const token: YieldToken = {
        pool: `kamino-${v.slug}`,
        symbol: extractSymbol(v.title, v.tags ?? []),
        project: v.title,
        apy,
        tvlUsd,
        apyBase: apy,
        apyReward: null,
        twitter: 'KaminoFinance',
        maxMultiplyAPY: apy, // already leverage-adjusted APY from Kamino
        multiplyProtocols: ['Kamino Multiply'],
        minBorrowRate: 0,
        source: 'kamino',
      }
      return token
    })
    .filter((t): t is YieldToken => t !== null)
}
