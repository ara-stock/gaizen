'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import AdUnit from '@/components/ads/AdUnit'

type SeriesItem = { ticker: string; dates: string[]; prices: number[] }
type RawData = { updatedAt: string; start: string; series: Record<string, SeriesItem> }
type SharpePoint = { date: string; sharpe: number }

const WINDOW = 12

const GROUPS = [
  { label: 'Index',      names: ['S&P500'] },
  { label: 'Trading Co', names: ['三菱商事', '伊藤忠商事', '三井物産', '住友商事', '丸紅', '兼松'] },
  { label: 'Finance',    names: ['三菱UFJ FG', '三井住友 FG', '東京海上HD', 'SBIホールディングス', 'オリックス', '三菱HCキャピタル', 'みずほリース'] },
  { label: 'Real Estate',names: ['三井不動産', 'ソフトバンクグループ'] },
  { label: 'US Stocks',  names: ['Microsoft', 'Alphabet', 'Amazon', 'Cloudflare', 'Apple', 'Palantir'] },
  { label: 'Crypto',     names: ['Bitcoin'] },
]

const PALETTE = [
  '#f59e0b',
  '#00c97a','#00a862','#4ade80','#86efac','#34d399','#6ee7b7',
  '#22d3ee','#0ea5e9','#38bdf8','#7dd3fc','#93c5fd','#a5b4fc',
  '#c4b5fd','#e879f9','#f472b6','#fb7185','#f97316','#fb923c',
  '#fbbf24','#facc15','#a78bfa','#60a5fa',
]

function calcRolling(prices: number[], dates: string[]): SharpePoint[] {
  const returns: number[] = []
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1])
  }
  const result: SharpePoint[] = []
  for (let i = WINDOW - 1; i < returns.length; i++) {
    const w = returns.slice(i - WINDOW + 1, i + 1)
    const mean = w.reduce((a, b) => a + b, 0) / WINDOW
    const std = Math.sqrt(w.reduce((a, b) => a + (b - mean) ** 2, 0) / WINDOW)
    const sharpe = std > 0 ? (mean / std) * Math.sqrt(12) : 0
    result.push({ date: dates[i + 1], sharpe: Math.round(sharpe * 100) / 100 })
  }
  return result
}

function LineChart({ data }: { data: Record<string, { points: SharpePoint[]; color: string }> }) {
  const allPoints = Object.values(data).flatMap(d => d.points)
  if (allPoints.length === 0) return null

  const allDates = [...new Set(allPoints.map(p => p.date))].sort()
  const sharpes = allPoints.map(p => p.sharpe)
  const minY = Math.floor(Math.min(...sharpes, -1))
  const maxY = Math.ceil(Math.max(...sharpes, 1))
  const PL = 36, PR = 12, PT = 12, PB = 28
  const W = 600, H = 240

  const xOf = (date: string) => {
    const i = allDates.indexOf(date)
    return PL + (i / (allDates.length - 1)) * (W - PL - PR)
  }
  const yOf = (v: number) => PT + (1 - (v - minY) / (maxY - minY)) * (H - PT - PB)
  const yTicks = Array.from({ length: maxY - minY + 1 }, (_, i) => minY + i)
  const xTicks = allDates.filter(d => d.slice(5, 7) === '12')

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', minWidth: '480px', height: '260px' }}>
        {yTicks.map(v => (
          <g key={v}>
            <line x1={PL} x2={W - PR} y1={yOf(v)} y2={yOf(v)}
              stroke={v === 0 ? 'var(--muted)' : 'var(--border)'}
              strokeWidth={v === 0 ? 1 : 0.5}
              strokeDasharray={v === 0 ? '' : '4 3'} />
            <text x={PL - 4} y={yOf(v) + 3.5} textAnchor="end" fontSize="9" fill="var(--muted)">{v}</text>
          </g>
        ))}
        {xTicks.map(d => (
          <text key={d} x={xOf(d)} y={H - 6} textAnchor="middle" fontSize="9" fill="var(--muted)">{d.slice(0, 4)}</text>
        ))}
        {Object.entries(data).map(([name, { points, color }]) => {
          const pathD = points.map((p, i) =>
            `${i === 0 ? 'M' : 'L'}${xOf(p.date).toFixed(1)},${yOf(p.sharpe).toFixed(1)}`
          ).join(' ')
          return <path key={name} d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
        })}
      </svg>
    </div>
  )
}

export default function EnSharpePage() {
  const [raw, setRaw] = useState<RawData | null>(null)
  const [selected, setSelected] = useState<string[]>(['S&P500', '三菱UFJ FG'])
  const [activeGroup, setActiveGroup] = useState('Index')

  useEffect(() => {
    fetch('/data/sharpe-prices.json').then(r => r.json()).then(setRaw).catch(console.error)
  }, [])

  const allNames = useMemo(() => raw ? Object.keys(raw.series) : [], [raw])

  const colorMap = useMemo(() => {
    const allGroupNames = GROUPS.flatMap(g => g.names)
    const map: Record<string, string> = {}
    allGroupNames.forEach((name, i) => { map[name] = PALETTE[i % PALETTE.length] })
    return map
  }, [])

  const sharpeMap = useMemo(() => {
    if (!raw) return {} as Record<string, SharpePoint[]>
    const map: Record<string, SharpePoint[]> = {}
    for (const [name, { prices, dates }] of Object.entries(raw.series)) {
      map[name] = calcRolling(prices, dates)
    }
    return map
  }, [raw])

  const chartData = useMemo(() => {
    const result: Record<string, { points: SharpePoint[]; color: string }> = {}
    for (const name of selected) {
      if (sharpeMap[name]) result[name] = { points: sharpeMap[name], color: colorMap[name] }
    }
    return result
  }, [selected, sharpeMap, colorMap])

  const currentGroup = GROUPS.find(g => g.label === activeGroup)
  const groupNames = currentGroup?.names.filter(n => allNames.includes(n)) ?? []

  const toggle = (name: string) =>
    setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])

  const selectAll = () => setSelected(prev => {
    const toAdd = groupNames.filter(n => !prev.includes(n))
    return [...prev, ...toAdd]
  })
  const deselectAll = () => setSelected(prev => prev.filter(n => !groupNames.includes(n)))
  const allSelected = groupNames.length > 0 && groupNames.every(n => selected.includes(n))

  if (!raw) return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Rolling Sharpe Ratio Chart</h1>
      <p className="text-sm" style={{ color: 'var(--muted)' }}>Loading...</p>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <Link href="/en/tools/" className="text-xs mb-4 block" style={{ color: 'var(--muted)' }}>← Back to Tools</Link>
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>TOOLS</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Rolling Sharpe Ratio Chart</h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          Calculates a rolling 12-month Sharpe ratio, shifting one month at a time, and plots the result as a line chart.
          Higher values indicate better risk-adjusted returns. Trend changes reveal improving or deteriorating efficiency per asset.
          Data updated: {raw.updatedAt}
        </p>
      </div>

      <div className="mb-6 p-3 rounded-lg text-xs" style={{ backgroundColor: 'var(--accent-subtle)', border: '1px solid var(--accent-border)', color: 'var(--muted)' }}>
        Sharpe = (mean monthly return ÷ monthly std. deviation) × √12　&nbsp;·&nbsp; Risk-free rate = 0, Window = 12 months. Uses adjusted monthly prices from Yahoo Finance via yfinance; taxes and fees are excluded. Results may differ from total-return indexes and actual portfolio performance.
      </div>

      <div className="rounded-xl border mb-6 overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <div className="flex overflow-x-auto" style={{ backgroundColor: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
          {GROUPS.map(g => {
            const active = activeGroup === g.label
            const selectedCount = g.names.filter(n => selected.includes(n)).length
            return (
              <button
                key={g.label}
                onClick={() => setActiveGroup(g.label)}
                className="flex-shrink-0 px-4 py-3 text-xs font-medium relative transition-colors"
                style={{
                  color: active ? 'var(--accent)' : 'var(--muted)',
                  borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                  backgroundColor: 'transparent',
                }}
              >
                {g.label}
                {selectedCount > 0 && (
                  <span className="ml-1.5 text-xs font-mono px-1 rounded"
                    style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)', fontSize: '10px' }}>
                    {selectedCount}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="p-4" style={{ backgroundColor: 'var(--surface)' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Select assets (multiple)</p>
            <button
              onClick={allSelected ? deselectAll : selectAll}
              className="text-xs px-2 py-1 rounded"
              style={{ color: 'var(--accent)', border: '1px solid var(--accent-border)' }}
            >
              {allSelected ? 'Deselect all' : 'Select all'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {groupNames.map(name => {
              const isSelected = selected.includes(name)
              const color = colorMap[name]
              return (
                <button
                  key={name}
                  onClick={() => toggle(name)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{
                    backgroundColor: isSelected ? `${color}18` : 'var(--surface-2)',
                    border: `1px solid ${isSelected ? color : 'var(--border)'}`,
                    color: isSelected ? color : 'var(--muted)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: isSelected ? color : 'var(--border)' }} />
                  {name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl border mb-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
          Rolling 12-month Sharpe Ratio
        </h2>
        {Object.keys(chartData).length > 0
          ? <LineChart data={chartData} />
          : <p className="text-xs py-10 text-center" style={{ color: 'var(--muted)' }}>Select assets from the panel above</p>
        }
        <div className="flex flex-wrap gap-4 mt-3">
          {Object.entries(chartData).map(([name, { color }]) => (
            <div key={name} className="flex items-center gap-1.5">
              <div className="w-6 h-0.5 rounded" style={{ backgroundColor: color }} />
              <span className="text-xs" style={{ color: 'var(--muted)' }}>{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Average of Rolling 12-Month Sharpe Ratios</h2>
        <div>
          {Object.entries(sharpeMap)
            .map(([name, pts]) => ({
              name,
              avg: pts.reduce((a, b) => a + b.sharpe, 0) / pts.length,
              color: colorMap[name] ?? 'var(--accent)',
            }))
            .sort((a, b) => b.avg - a.avg)
            .map((item, i) => (
              <div key={item.name} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs font-mono w-5 text-right flex-shrink-0" style={{ color: 'var(--muted)' }}>{i + 1}</span>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs w-36 flex-shrink-0" style={{ color: 'var(--foreground)' }}>{item.name}</span>
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                  <div className="h-full rounded-full" style={{
                    width: `${Math.max(0, Math.min(100, item.avg / 3 * 100))}%`,
                    backgroundColor: item.color,
                  }} />
                </div>
                <span className="text-sm font-semibold font-mono w-10 text-right flex-shrink-0" style={{ color: item.color }}>
                  {item.avg.toFixed(2)}
                </span>
              </div>
            ))}
        </div>
      </div>
      <AdUnit slot="5904640354" format="auto" className="mt-10" />
    </div>
  )
}
