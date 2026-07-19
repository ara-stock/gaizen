'use client'

import { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import AdUnit from '@/components/ads/AdUnit'

type AssetKey = 'jp_stock' | 'us_stock' | 'reit' | 'crypto' | 'cash'

const ASSETS: { key: AssetKey; label: string; expectedReturn: number; volatility: number; color: string }[] = [
  { key: 'jp_stock', label: 'Japan Stocks', expectedReturn: 0.07, volatility: 0.18, color: '#00c97a' },
  { key: 'us_stock', label: 'US Stocks',    expectedReturn: 0.10, volatility: 0.17, color: '#00a862' },
  { key: 'reit',     label: 'REIT',         expectedReturn: 0.06, volatility: 0.20, color: '#4ade80' },
  { key: 'crypto',   label: 'Crypto',       expectedReturn: 0.30, volatility: 0.80, color: '#86efac' },
  { key: 'cash',     label: 'Cash',         expectedReturn: 0.005,volatility: 0.00, color: '#3d5e4a' },
]

const RISK_FREE_RATE = 0.005

function DonutChart({ allocs, total }: { allocs: Record<AssetKey, number>; total: number }) {
  const cx = 80, cy = 80, r = 58, strokeW = 18
  const circumference = 2 * Math.PI * r

  const segments = ASSETS
    .filter(a => allocs[a.key] > 0 && total > 0)
    .map((a, index, visibleAssets) => {
      const pct = allocs[a.key] / total
      const dash = pct * circumference
      const previousPct = visibleAssets
        .slice(0, index)
        .reduce((sum, previous) => sum + allocs[previous.key] / total, 0)
      return { key: a.key, color: a.color, label: a.label, pct, dash, offset: circumference * (0.25 - previousPct) }
    })

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={strokeW} />
        {segments.map(seg => (
          <circle
            key={seg.key}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeW}
            strokeDasharray={`${seg.dash - 1.5} ${circumference - seg.dash + 1.5}`}
            strokeDashoffset={seg.offset}
            style={{ transition: 'stroke-dasharray 0.25s, stroke-dashoffset 0.25s' }}
          />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="var(--foreground)" fontSize="18" fontWeight="bold">
          {total}%
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#5a7566" fontSize="9">
          {total === 100 ? 'Allocated' : total < 100 ? `${100 - total}% left` : `${total - 100}% over`}
        </text>
      </svg>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
        {ASSETS.filter(a => allocs[a.key] > 0).map(a => (
          <div key={a.key} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: a.color }} />
            <span className="text-xs" style={{ color: 'var(--muted)' }}>{a.label} {total > 0 ? Math.round(allocs[a.key] / total * 100) : 0}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Slider({ label, color, value, onChange }: {
  label: string; color: string; value: number; onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-sm" style={{ color: 'var(--foreground)' }}>{label}</span>
        </div>
        <span className="text-sm font-semibold tabular-nums font-mono" style={{ color }}>
          {value}%
        </span>
      </div>
      <input
        type="range" min={0} max={100} step={5} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: color, backgroundColor: 'var(--border)' }}
      />
    </div>
  )
}

function Metric({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="p-4 rounded-lg border text-center" style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }}>
      <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{label}</p>
      <p className="text-xl font-bold tabular-nums" style={{ color: accent ? 'var(--accent)' : 'var(--foreground)' }}>{value}</p>
      {sub && <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{sub}</p>}
    </div>
  )
}

export default function EnAllocationSimulator() {
  const [allocs, setAllocs] = useState<Record<AssetKey, number>>({
    jp_stock: 40, us_stock: 30, reit: 10, crypto: 10, cash: 10,
  })

  const total = Object.values(allocs).reduce((a, b) => a + b, 0)

  const { expectedReturn, volatility, sharpe } = useMemo(() => {
    if (total === 0) return { expectedReturn: 0, volatility: 0, sharpe: 0 }
    const weights = ASSETS.map(a => allocs[a.key] / total)
    const er = ASSETS.reduce((s, a, i) => s + weights[i] * a.expectedReturn, 0)
    const vol = Math.sqrt(ASSETS.reduce((s, a, i) => s + Math.pow(weights[i] * a.volatility, 2), 0))
    return { expectedReturn: er, volatility: vol, sharpe: vol > 0 ? (er - RISK_FREE_RATE) / vol : 0 }
  }, [allocs, total])

  const updateAlloc = useCallback((key: AssetKey, val: number) => {
    setAllocs(prev => ({ ...prev, [key]: val }))
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <Link href="/en/tools/" className="text-xs mb-4 block hover:text-white transition-colors" style={{ color: 'var(--muted)' }}>
          ← Back to Tools
        </Link>
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>TOOLS</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Portfolio Allocation Simulator</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Adjust allocation sliders to compare hypothetical return, risk, and Sharpe ratio scenarios.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Asset Allocation</h2>
              <span className="text-xs tabular-nums font-mono"
                style={{ color: total === 100 ? 'var(--accent)' : total > 100 ? '#ef4444' : 'var(--muted)' }}>
                Total {total}%
              </span>
            </div>
            <div className="space-y-6">
              {ASSETS.map(a => (
                <Slider key={a.key} label={a.label} color={a.color} value={allocs[a.key]}
                  onChange={v => updateAlloc(a.key, v)} />
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Allocation Chart</h2>
            <DonutChart allocs={allocs} total={total} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <Metric label="Scenario Return (annual)" value={`${(expectedReturn * 100).toFixed(1)}%`} accent />
            <Metric label="Simplified Risk Estimate" value={`${(volatility * 100).toFixed(1)}%`} />
            <Metric label="Sharpe Ratio" value={sharpe.toFixed(2)} sub="Higher = more efficient" accent={sharpe > 0.5} />
          </div>

          <div className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Compound Growth on ¥1M</h3>
            <div className="space-y-2">
              {[1, 3, 5, 10, 20].map(year => {
                const val = 100 * Math.pow(1 + expectedReturn, year)
                const gain = val - 100
                return (
                  <div key={year} className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                    <span className="text-xs w-14" style={{ color: 'var(--muted)' }}>yr {year}</span>
                    <div className="flex-1 mx-3 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(val / (100 * Math.pow(1.3, year)) * 100, 100)}%`, backgroundColor: 'var(--accent)', transition: 'width 0.3s' }} />
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--accent)' }}>
                        ¥{(val * 10000).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                      <span className="text-xs ml-2" style={{ color: gain >= 0 ? '#4ade80' : '#ef4444' }}>
                        +¥{(gain * 10000).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Assumptions per Asset Class</h3>
            <div className="space-y-1">
              {ASSETS.map(a => (
                <div key={a.key} className="flex items-center justify-between text-xs py-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: a.color }} />
                    <span style={{ color: 'var(--foreground)' }}>{a.label}</span>
                  </div>
                  <div className="flex gap-4 font-mono" style={{ color: 'var(--muted)' }}>
                    <span>Return <span style={{ color: a.color }}>{(a.expectedReturn * 100).toFixed(1)}%</span></span>
                    <span>Risk {(a.volatility * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>
              * Simplified estimate assuming zero correlation among assets. Inputs are scenarios, not forecasts, and may understate actual risk.
            </p>
          </div>
        </div>
      </div>
      <AdUnit slot="5904640354" format="auto" className="mt-10" />
    </div>
  )
}
