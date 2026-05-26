import type { Metadata } from 'next'
import YieldTable, { type YieldToken } from './YieldTable'
import { fetchJupiterTokens } from './sources/jupiter'
import { fetchKaminoTokens } from './sources/kamino'
import { fetchLoopscaleTokens } from './sources/loopscale'
import AdUnit from '@/components/ads/AdUnit'

export const revalidate = 3600 // 1 hour

export const metadata: Metadata = {
  title: 'Solana USD イールドベアリング一覧',
  description: 'Solanaチェーン上のUSDイールドベアリングトークンの利回り・流通規模を一覧できるツール。Jupiter・Kaminoのデータを1時間ごとに更新。',
  alternates: { canonical: 'https://gaizen.xyz/tools/solana-usd-yield' },
}

async function fetchMinBorrowRate(): Promise<number> {
  try {
    const res = await fetch('https://api.jup.ag/lend/v1/earn/tokens', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return 5
    const data: unknown = await res.json()
    const items = Array.isArray(data) ? data : Object.values(data as object)
    // Use USDC supply rate as a proxy for the minimum borrow rate
    const usdcRates = (items as Array<Record<string, unknown>>)
      .filter(t => {
        const sym = String((t.asset as Record<string, unknown>)?.symbol ?? t.symbol ?? '')
        return sym.toUpperCase() === 'USDC'
      })
      .map(t => Number(t.supplyRate ?? 0) / 100)
      .filter(r => r > 0)
    return usdcRates.length > 0 ? Math.min(...usdcRates) : 5
  } catch {
    return 5
  }
}

async function getData(): Promise<{ tokens: YieldToken[]; minBorrowRate: number }> {
  const [jupiterTokens, kaminoTokens, loopscaleTokens, minBorrowRate] =
    await Promise.all([
      fetchJupiterTokens().catch(() => [] as YieldToken[]),
      fetchKaminoTokens().catch(() => [] as YieldToken[]),
      fetchLoopscaleTokens().catch(() => [] as YieldToken[]),
      fetchMinBorrowRate(),
    ])

  const jupiterFilled = jupiterTokens.map(t => ({
    ...t,
    minBorrowRate,
    maxMultiplyAPY: t.multiplyProtocols && t.apy > 0.75 * minBorrowRate
      ? (t.apy - 0.75 * minBorrowRate) / (1 - 0.75)
      : null,
  }))

  const kaminoFilled = kaminoTokens.map(t => ({ ...t, minBorrowRate }))

  const all = [
    ...jupiterFilled,
    ...kaminoFilled,
    ...loopscaleTokens,
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
          Solanaチェーン上のUSDステーブルコイン・イールドベアリングトークンの利回りとトークン流通規模。流動性プール・$1M未満を除く。
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
            {tokens.length} 件（流通規模 $1M以上・APY 4%以上・LPプール除外）
          </div>
          <YieldTable tokens={tokens} minBorrowRate={minBorrowRate} />
        </div>
      )}
      <AdUnit slot="5904640354" format="auto" className="mt-10" />
    </div>
  )
}
