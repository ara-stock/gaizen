'use client'

import { useState } from 'react'

export type YieldToken = {
  pool: string
  symbol: string
  project: string
  apy: number
  tvlUsd: number
  apyBase: number | null
  apyReward: number | null
  twitter: string | null
  maxMultiplyAPY: number | null
  multiplyProtocols: string[] | null
  minBorrowRate: number
  source: 'jupiter' | 'kamino' | 'defillama'
}

type SortKey = 'apy' | 'tvlUsd' | 'maxMultiplyAPY'

function fmt(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

export default function YieldTable({ tokens, minBorrowRate }: { tokens: YieldToken[]; minBorrowRate: number }) {
  const [sort, setSort] = useState<SortKey>('apy')

  const sorted = [...tokens].sort((a, b) => {
    const av = sort === 'maxMultiplyAPY' ? (a.maxMultiplyAPY ?? -Infinity) : a[sort]
    const bv = sort === 'maxMultiplyAPY' ? (b.maxMultiplyAPY ?? -Infinity) : b[sort]
    return bv - av
  })

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button
      onClick={() => setSort(k)}
      className="px-3 py-1 rounded text-xs font-mono transition-colors"
      style={{
        backgroundColor: sort === k ? 'rgba(0,201,122,0.15)' : 'var(--surface-2)',
        color: sort === k ? 'var(--accent)' : 'var(--muted)',
        border: `1px solid ${sort === k ? 'rgba(0,201,122,0.4)' : 'var(--border)'}`,
      }}
    >
      {label}
    </button>
  )

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs mr-1" style={{ color: 'var(--muted)' }}>並び替え:</span>
        <SortBtn k="apy" label="APY 高い順" />
        <SortBtn k="maxMultiplyAPY" label="Multiply APY 高い順" />
        <SortBtn k="tvlUsd" label="TVL 大きい順" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-xs" style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
              <th className="text-left py-2 pr-4 font-mono font-normal whitespace-nowrap">銘柄</th>
              <th className="text-left py-2 pr-4 font-mono font-normal whitespace-nowrap">プロジェクト</th>
              <th className="text-left py-2 pr-4 font-mono font-normal whitespace-nowrap">公式X</th>
              <th className="text-right py-2 pr-4 font-mono font-normal whitespace-nowrap">APY</th>
              <th className="text-right py-2 pr-4 font-mono font-normal whitespace-nowrap">
                Max Multiply APY
                <span className="block font-normal" style={{ fontSize: '9px', opacity: 0.6 }}>75% LTV 理論値</span>
              </th>
              <th className="text-left py-2 pr-4 font-mono font-normal whitespace-nowrap">Multiplyプロダクト</th>
              <th className="text-right py-2 font-mono font-normal whitespace-nowrap">流通規模 (TVL)</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(t => (
              <tr
                key={t.pool}
                style={{ borderBottom: '1px solid var(--border)' }}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="py-3 pr-4">
                  <span className="font-mono font-semibold text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'rgba(0,201,122,0.08)', color: 'var(--accent)', border: '1px solid rgba(0,201,122,0.15)' }}>
                    {t.symbol}
                  </span>
                </td>
                <td className="py-3 pr-4 text-sm" style={{ color: 'var(--foreground)' }}>
                  {t.project}
                </td>
                <td className="py-3 pr-4">
                  {t.twitter ? (
                    <a
                      href={`https://x.com/${t.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono hover:underline"
                      style={{ color: 'var(--accent)' }}
                    >
                      @{t.twitter}
                    </a>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>—</span>
                  )}
                </td>
                <td className="py-3 pr-4 text-right">
                  <span className="font-mono font-bold" style={{ color: t.apy >= 10 ? '#f59e0b' : 'var(--foreground)' }}>
                    {t.apy.toFixed(2)}%
                  </span>
                  {((t.apyBase != null && t.apyBase > 0) || (t.apyReward != null && t.apyReward > 0)) && (
                    <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                      {t.apyBase != null && t.apyBase > 0 && <span>base {t.apyBase.toFixed(1)}%</span>}
                      {t.apyReward != null && t.apyReward > 0 && <span className="ml-1">+rwd {t.apyReward.toFixed(1)}%</span>}
                    </div>
                  )}
                </td>
                <td className="py-3 pr-4 text-right">
                  {t.maxMultiplyAPY != null ? (
                    <span className="font-mono font-bold" style={{ color: '#a78bfa' }}>
                      {t.maxMultiplyAPY.toFixed(1)}%
                    </span>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>—</span>
                  )}
                </td>
                <td className="py-3 pr-4">
                  {t.multiplyProtocols ? (
                    <div className="flex flex-wrap gap-1">
                      {t.multiplyProtocols.map(proto => (
                        <span key={proto} className="text-xs px-1.5 py-0.5 rounded font-mono"
                          style={{ backgroundColor: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.25)', fontSize: '10px' }}>
                          {proto}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>—</span>
                  )}
                </td>
                <td className="py-3 text-right font-mono" style={{ color: 'var(--foreground)' }}>
                  {fmt(t.tvlUsd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-xs" style={{ color: 'var(--muted)' }}>
          ※ Max Multiply APY は理論値。計算式: (APY − 借入レート {minBorrowRate.toFixed(1)}%) ÷ (1 − 75% LTV)。実際のAPYはKamino・Loopscale等のプロトコルにより異なります。
        </p>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>
          データソース: <a href="https://jup.ag" target="_blank" rel="noopener noreferrer" className="hover:underline">Jupiter</a> / <a href="https://kamino.finance" target="_blank" rel="noopener noreferrer" className="hover:underline">Kamino</a> / <a href="https://defillama.com" target="_blank" rel="noopener noreferrer" className="hover:underline">DeFiLlama</a> / 1時間ごとに更新
        </p>
      </div>
    </div>
  )
}
