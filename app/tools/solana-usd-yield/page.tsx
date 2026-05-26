import type { Metadata } from 'next'
import YieldTable, { type YieldToken } from './YieldTable'
import { X_OVERRIDES, PROJECT_BLOCKLIST } from './xOverrides'
import { MULTIPLY_PROTOCOLS } from './multiplyMap'
import { fetchJupiterTokens } from './sources/jupiter'
import { fetchKaminoTokens } from './sources/kamino'
import { fetchLoopscaleTokens } from './sources/loopscale'

export const revalidate = 3600 // 1 hour

export const metadata: Metadata = {
  title: 'Solana USD イールドベアリング一覧',
  description: 'Solanaチェーン上のUSDイールドベアリングトークンの利回り・流通規模を一覧できるツール。Jupiter・DeFiLlamaのデータを1時間ごとに更新。',
}

type LlamaPool = {
  pool: string
  chain: string
  project: string
  symbol: string
  tvlUsd: number
  apy: number
  apyBase: number | null
  apyReward: number | null
  apyBorrow: number | null
  stablecoin: boolean
  ilRisk: string | null
  exposure: string | null
}

type LlamaProtocol = {
  slug: string
  name: string
  twitter: string | null
}

const USD_SYMBOL = /usd|usx|pst|onyc|syrup|cash/i

function isUsdYieldToken(p: LlamaPool): boolean {
  return USD_SYMBOL.test(p.symbol)
}

function isLiquidityPool(p: LlamaPool): boolean {
  if (p.symbol.includes('/')) return true
  if (p.ilRisk === 'yes') return true
  if (p.exposure === 'multi') return true
  return false
}

async function fetchDeFiLlamaTokens(minBorrowRate: number): Promise<{ tokens: YieldToken[]; minBorrowRate: number }> {
  const fetchOpts = {
    cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'default',
    next: { revalidate },
  } as RequestInit

  const [poolsRes, protocolsRes] = await Promise.all([
    fetch('https://yields.llama.fi/pools', fetchOpts),
    fetch('https://api.llama.fi/protocols', fetchOpts),
  ])

  if (!poolsRes.ok || !protocolsRes.ok) throw new Error('DeFiLlama API fetch failed')

  const pools: LlamaPool[] = (await poolsRes.json()).data
  const protocols: LlamaProtocol[] = await protocolsRes.json()

  const twitterMap = new Map<string, string | null>()
  for (const p of protocols) {
    twitterMap.set(p.slug.toLowerCase(), p.twitter ?? null)
    twitterMap.set(p.name.toLowerCase(), p.twitter ?? null)
  }
  for (const [slug, handle] of Object.entries(X_OVERRIDES)) {
    twitterMap.set(slug, handle)
  }

  const solanaBorrowRates = pools
    .filter(p =>
      p.chain === 'Solana' &&
      p.apyBorrow != null &&
      (p.symbol === 'USDC' || p.symbol === 'USDT') &&
      (p.apyBorrow as number) > 0
    )
    .map(p => p.apyBorrow as number)

  const computedMinBorrowRate = solanaBorrowRates.length > 0
    ? Math.min(...solanaBorrowRates)
    : minBorrowRate

  const tokens = pools
    .filter(p =>
      p.chain === 'Solana' &&
      isUsdYieldToken(p) &&
      p.apy >= 4 &&
      p.tvlUsd >= 1_000_000 &&
      !isLiquidityPool(p) &&
      !PROJECT_BLOCKLIST.has(p.project.toLowerCase())
    )
    .map(p => {
      const slug = p.project.toLowerCase()
      const llamaTwitter = twitterMap.get(slug) ?? null
      const twitter = Object.prototype.hasOwnProperty.call(X_OVERRIDES, slug)
        ? X_OVERRIDES[slug]
        : llamaTwitter

      const estimatedLTV = 0.75
      const netAPY = p.apy - computedMinBorrowRate
      const maxMultiplyAPY = netAPY > 0 ? netAPY / (1 - estimatedLTV) : null

      return {
        pool: p.pool,
        symbol: p.symbol,
        project: p.project,
        apy: p.apy,
        tvlUsd: p.tvlUsd,
        apyBase: p.apyBase,
        apyReward: p.apyReward,
        twitter: twitter ?? null,
        maxMultiplyAPY,
        multiplyProtocols: MULTIPLY_PROTOCOLS[slug] ?? null,
        minBorrowRate: computedMinBorrowRate,
        source: 'defillama' as const,
      } satisfies YieldToken
    })

  return { tokens, minBorrowRate: computedMinBorrowRate }
}

async function getData(): Promise<{ tokens: YieldToken[]; minBorrowRate: number }> {
  // Fetch all sources in parallel
  const [jupiterTokens, kaminoTokens, loopscaleTokens, { tokens: llamaTokens, minBorrowRate }] =
    await Promise.all([
      fetchJupiterTokens().catch(() => [] as YieldToken[]),
      fetchKaminoTokens().catch(() => [] as YieldToken[]),
      fetchLoopscaleTokens().catch(() => [] as YieldToken[]),
      fetchDeFiLlamaTokens(5),
    ])

  // Fill in minBorrowRate for Jupiter tokens (Kamino already has leverage-adjusted APY)
  const jupiterFilled = jupiterTokens.map(t => {
    const netAPY = t.apy - minBorrowRate
    return {
      ...t,
      minBorrowRate,
      maxMultiplyAPY: netAPY > 0 ? netAPY / (1 - 0.75) : null,
    }
  })

  // Fill in minBorrowRate for Kamino tokens
  const kaminoFilled = kaminoTokens.map(t => ({ ...t, minBorrowRate }))

  // Deduplicate: direct sources take priority over DeFiLlama
  const directSlugs = new Set([
    ...jupiterFilled.map(t => t.symbol.toLowerCase()),
    ...kaminoFilled.map(t => t.pool), // use pool (kamino-{slug}) as unique key
  ])
  const filteredLlama = llamaTokens.filter(t =>
    t.project.toLowerCase() !== 'jupiter lend' &&
    t.project.toLowerCase() !== 'kamino-finance' &&
    !directSlugs.has(t.symbol.toLowerCase())
  )

  const all = [
    ...jupiterFilled,
    ...kaminoFilled,
    ...loopscaleTokens,
    ...filteredLlama,
  ].sort((a, b) => b.apy - a.apy)

  return { tokens: all, minBorrowRate }
}

export default async function SolanaUsdYieldPage() {
  let tokens: YieldToken[] = []
  let minBorrowRate = 0
  let error = false

  try {
    ;({ tokens, minBorrowRate } = await getData())
  } catch {
    error = true
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>TOOLS</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
          Solana USD イールドベアリング一覧
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Solanaチェーン上のUSDステーブルコイン・イールドベアリングトークンの利回りと流通規模。流動性プール・TVL $1M未満を除く。
        </p>
      </div>

      {error ? (
        <div className="p-6 rounded-xl text-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
          データの取得に失敗しました。しばらく経ってから再度お試しください。
        </div>
      ) : tokens.length === 0 ? (
        <div className="p-6 rounded-xl text-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
          該当するトークンが見つかりませんでした。
        </div>
      ) : (
        <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="text-xs mb-4" style={{ color: 'var(--muted)' }}>
            {tokens.length} 件（TVL $1M以上・APY 4%以上・LPプール除外）
          </div>
          <YieldTable tokens={tokens} minBorrowRate={minBorrowRate} />
        </div>
      )}
    </div>
  )
}
