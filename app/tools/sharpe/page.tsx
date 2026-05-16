'use client'

import { useState } from 'react'
import Link from 'next/link'

// 参考値: 各資産クラスの年次シャープレシオ（2015-2024 推定）
const SHARPE_DATA: { year: string; [key: string]: number | string }[] = [
  { year: '2015', jp_stock: 0.12, us_stock: 0.08, reit: 0.30, gold: -0.12, crypto: 1.20 },
  { year: '2016', jp_stock: 0.35, us_stock: 0.90, reit: 0.10, gold: 0.40, crypto: 2.10 },
  { year: '2017', jp_stock: 1.20, us_stock: 1.50, reit: 0.20, gold: 0.35, crypto: 4.80 },
  { year: '2018', jp_stock: -0.80, us_stock: -0.70, reit: -0.30, gold: -0.20, crypto: -1.20 },
  { year: '2019', jp_stock: 1.10, us_stock: 2.20, reit: 1.80, gold: 1.40, crypto: 1.60 },
  { year: '2020', jp_stock: 0.80, us_stock: 1.30, reit: -0.40, gold: 1.10, crypto: 2.40 },
  { year: '2021', jp_stock: 0.40, us_stock: 2.10, reit: 0.90, gold: -0.50, crypto: 1.80 },
  { year: '2022', jp_stock: -0.30, us_stock: -1.80, reit: -1.20, gold: -0.20, crypto: -1.50 },
  { year: '2023', jp_stock: 2.10, us_stock: 2.30, reit: -0.10, gold: 0.60, crypto: 2.20 },
  { year: '2024', jp_stock: 1.40, us_stock: 1.80, reit: 0.40, gold: 1.80, crypto: 1.40 },
]

const ASSETS = [
  { key: 'jp_stock', label: '日本株',   color: '#00c97a' },
  { key: 'us_stock', label: '米国株',   color: '#00a862' },
  { key: 'reit',     label: 'REIT',     color: '#4ade80' },
  { key: 'gold',     label: '金',       color: '#86efac' },
  { key: 'crypto',   label: '仮想通貨', color: '#6ee7b7' },
]

function BarChart({ selectedAssets }: { selectedAssets: string[] }) {
  const filtered = ASSETS.filter(a => selectedAssets.includes(a.key))
  const allValues = SHARPE_DATA.flatMap(d => filtered.map(a => d[a.key] as number))
  const maxAbs = Math.max(...allValues.map(Math.abs), 1)
  const barW = 180 / SHARPE_DATA.length
  const chartH = 160
  const zeroY = chartH / 2

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: '600px' }}>
        <svg viewBox={`0 0 ${SHARPE_DATA.length * barW * (filtered.length + 0.5) + 40} ${chartH + 40}`}
          style={{ width: '100%', height: '220px' }}>
          {/* Zero line */}
          <line x1="40" x2="100%" y1={zeroY + 20} y2={zeroY + 20} stroke="#1a2e22" strokeWidth="1" />

          {/* Y axis labels */}
          {[-2, -1, 0, 1, 2].map(v => {
            const y = zeroY + 20 - (v / maxAbs) * (chartH / 2 - 10)
            return (
              <g key={v}>
                <line x1="38" x2="100%" y1={y} y2={y} stroke="#0d1510" strokeWidth="0.5" />
                <text x="35" y={y + 3} textAnchor="end" fill="#5a7566" fontSize="8">{v}</text>
              </g>
            )
          })}

          {/* Bars */}
          {SHARPE_DATA.map((d, xi) => {
            const groupX = 44 + xi * (barW * (filtered.length + 0.5))
            return (
              <g key={d.year}>
                {filtered.map((a, ai) => {
                  const val = d[a.key] as number
                  const h = Math.abs(val) / maxAbs * (chartH / 2 - 10)
                  const x = groupX + ai * barW
                  const y = val >= 0 ? zeroY + 20 - h : zeroY + 20
                  return (
                    <g key={a.key}>
                      <rect x={x} y={y} width={barW - 2} height={h}
                        fill={a.color} opacity="0.8" rx="1" />
                    </g>
                  )
                })}
                <text x={groupX + (filtered.length * barW) / 2} y={chartH + 32}
                  textAnchor="middle" fill="#5a7566" fontSize="8">
                  {d.year}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default function SharpePage() {
  const [selected, setSelected] = useState<string[]>(['jp_stock', 'us_stock', 'gold', 'crypto'])

  const toggle = (key: string) => {
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  // Average Sharpe per asset
  const averages = ASSETS.map(a => ({
    ...a,
    avg: SHARPE_DATA.reduce((sum, d) => sum + (d[a.key] as number), 0) / SHARPE_DATA.length,
    min: Math.min(...SHARPE_DATA.map(d => d[a.key] as number)),
    max: Math.max(...SHARPE_DATA.map(d => d[a.key] as number)),
  })).sort((a, b) => b.avg - a.avg)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <Link href="/tools" className="text-xs mb-4 block transition-colors hover:text-white" style={{ color: 'var(--muted)' }}>
          ← Tools に戻る
        </Link>
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>TOOLS</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>シャープレシオ チャート</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          主要資産クラスのシャープレシオ年次推移。リスク調整後リターンで各資産を比較します。
        </p>
      </div>

      <div className="mb-4 p-3 rounded-lg text-xs" style={{ backgroundColor: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', color: 'var(--muted)' }}>
        表示データは参考値（過去データ推定）です。リアルタイムデータではありません。シャープレシオ ＝ (リターン − 無リスク金利) ÷ 標準偏差
      </div>

      {/* Toggle */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ASSETS.map(a => (
          <button key={a.key} onClick={() => toggle(a.key)}
            className="text-xs px-3 py-1.5 rounded-full border transition-colors font-medium"
            style={{
              backgroundColor: selected.includes(a.key) ? `${a.color}20` : 'transparent',
              borderColor: selected.includes(a.key) ? a.color : 'var(--border)',
              color: selected.includes(a.key) ? a.color : 'var(--muted)',
            }}>
            {a.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="p-5 rounded-xl border mb-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>年次シャープレシオ（2015–2024）</h2>
        <BarChart selectedAssets={selected} />
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4">
          {ASSETS.filter(a => selected.includes(a.key)).map(a => (
            <div key={a.key} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: a.color }} />
              <span className="text-xs" style={{ color: 'var(--muted)' }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary table */}
      <div className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>10年平均サマリー</h2>
        <div className="space-y-2">
          {averages.map((a, i) => (
            <div key={a.key} className="flex items-center gap-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
              <span className="text-xs font-mono w-4" style={{ color: 'var(--muted)' }}>{i + 1}</span>
              <div className="flex items-center gap-2 w-20">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: a.color }} />
                <span className="text-xs" style={{ color: 'var(--foreground)' }}>{a.label}</span>
              </div>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                <div className="h-full rounded-full" style={{
                  width: `${Math.max(0, a.avg / 3 * 100)}%`,
                  backgroundColor: a.color,
                }} />
              </div>
              <span className="text-sm font-semibold tabular-nums font-mono w-12 text-right" style={{ color: a.color }}>
                {a.avg.toFixed(2)}
              </span>
              <span className="text-xs tabular-nums" style={{ color: 'var(--muted)' }}>
                {a.min.toFixed(1)} ~ {a.max.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
