'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import AdUnit from '@/components/ads/AdUnit'

function Input({ label, value, onChange, unit, step = '1', min = '0' }: {
  label: string; value: string; onChange: (v: string) => void
  unit?: string; step?: string; min?: string
}) {
  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: 'var(--muted)' }}>{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number" value={value} onChange={e => onChange(e.target.value)}
          step={step} min={min}
          className="flex-1 px-3 py-2 rounded-md text-sm outline-none"
          style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
        />
        {unit && <span className="text-xs flex-shrink-0" style={{ color: 'var(--muted)' }}>{unit}</span>}
      </div>
    </div>
  )
}

function LineChart({ data, target }: { data: { year: number; value: number }[]; target: number }) {
  if (data.length < 2) return null
  const maxVal = Math.max(target * 1.15, data[data.length - 1].value, 1)
  const W = 560, H = 180
  const PAD = { top: 8, right: 16, bottom: 28, left: 64 }
  const iW = W - PAD.left - PAD.right
  const iH = H - PAD.top - PAD.bottom

  const xS = (i: number) => PAD.left + (i / (data.length - 1)) * iW
  const yS = (v: number) => H - PAD.bottom - (v / maxVal) * iH

  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xS(i).toFixed(1)},${yS(d.value).toFixed(1)}`).join(' ')
  const targetY = yS(target)
  const fireIdx = data.findIndex(d => d.value >= target)

  const yTicks = [0, 0.25, 0.5, 0.75, 1]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '180px' }}>
      {yTicks.map(t => {
        const v = t * maxVal
        const y = yS(v)
        return (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="#141f19" strokeWidth="1" />
            <text x={PAD.left - 4} y={y + 3} textAnchor="end" fill="#5a7566" fontSize="8">
              ¥{(v / 1000000).toFixed(0)}M
            </text>
          </g>
        )
      })}

      {data.filter((_, i) => i % Math.ceil(data.length / 6) === 0).map(d => {
        const i = data.indexOf(d)
        return (
          <text key={d.year} x={xS(i)} y={H - 4} textAnchor="middle" fill="#5a7566" fontSize="8">
            yr {d.year}
          </text>
        )
      })}

      <line x1={PAD.left} x2={W - PAD.right} y1={targetY} y2={targetY}
        stroke="#00c97a" strokeWidth="1" strokeDasharray="4 3" />
      <text x={W - PAD.right - 2} y={targetY - 3} textAnchor="end" fill="#00c97a" fontSize="8">FIRE target</text>

      <path d={`${path} L${xS(data.length - 1)},${yS(0)} L${xS(0)},${yS(0)} Z`}
        fill="rgba(0,201,122,0.07)" />
      <path d={path} fill="none" stroke="#00c97a" strokeWidth="2" />

      {fireIdx >= 0 && (
        <>
          <line x1={xS(fireIdx)} x2={xS(fireIdx)} y1={PAD.top} y2={H - PAD.bottom}
            stroke="#00c97a" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
          <circle cx={xS(fireIdx)} cy={yS(data[fireIdx].value)} r="4"
            fill="#00c97a" stroke="#080c0a" strokeWidth="2" />
        </>
      )}
    </svg>
  )
}

type TargetMode = 'auto' | 'manual'

export default function EnFireSimulator() {
  const [currentAssets, setCurrentAssets] = useState('500')
  const [monthlySavings, setMonthlySavings] = useState('10')
  const [annualReturn, setAnnualReturn] = useState('7')
  const [years, setYears] = useState('30')

  const [targetMode, setTargetMode] = useState<TargetMode>('auto')
  const [monthlyExpense, setMonthlyExpense] = useState('30')
  const [withdrawalRate, setWithdrawalRate] = useState('4')
  const [manualTarget, setManualTarget] = useState('10000')

  const { fireTarget, chartData, fireYear, finalAssets } = useMemo(() => {
    const ca = (parseFloat(currentAssets) || 0) * 10000
    const ms = (parseFloat(monthlySavings) || 0) * 10000
    const r = (parseFloat(annualReturn) || 0) / 100
    const maxYears = parseInt(years) || 30
    const monthlyRate = r / 12

    const fireTarget = targetMode === 'manual'
      ? (parseFloat(manualTarget) || 0) * 10000
      : (parseFloat(monthlyExpense) || 0) * 10000 * 12 / ((parseFloat(withdrawalRate) || 4) / 100)

    const chartData: { year: number; value: number }[] = [{ year: 0, value: ca }]
    let balance = ca
    let fireYear = balance >= fireTarget ? 0 : -1

    for (let m = 1; m <= maxYears * 12; m++) {
      balance = balance * (1 + monthlyRate) + ms
      if (m % 12 === 0) {
        const yr = m / 12
        chartData.push({ year: yr, value: balance })
        if (fireYear === -1 && balance >= fireTarget) fireYear = yr
      }
    }

    return { fireTarget, chartData, fireYear, finalAssets: balance }
  }, [currentAssets, monthlySavings, annualReturn, years, targetMode, monthlyExpense, withdrawalRate, manualTarget])

  const fmt = (n: number) => {
    if (n >= 100000000) return `¥${(n / 100000000).toFixed(1)}B`
    return `¥${(n / 1000000).toFixed(1)}M`
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <Link href="/en/tools/" className="text-xs mb-4 block hover:text-green-600 transition-colors" style={{ color: 'var(--muted)' }}>
          ← Back to Tools
        </Link>
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>TOOLS</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>FIRE Asset Growth Simulator</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Calculate how many years until FIRE with monthly contributions and compound growth.
          <span className="ml-2" style={{ color: 'var(--muted)', opacity: 0.7 }}>Inputs in 万 (1 unit = ¥10,000)</span>
        </p>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-8">
        {/* Inputs */}
        <div className="space-y-5 p-6 rounded-xl border self-start" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Assets & Returns</h2>
          <Input label="Current total assets" value={currentAssets} onChange={setCurrentAssets} unit="万 (¥10K)" />
          <Input label="Monthly contribution" value={monthlySavings} onChange={setMonthlySavings} unit="万/month" />
          <Input label="Expected annual return" value={annualReturn} onChange={setAnnualReturn} unit="%" step="0.5" />
          <Input label="Simulation period" value={years} onChange={setYears} unit="years" />

          <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>FIRE target method</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {(['auto', 'manual'] as TargetMode[]).map(mode => (
                <button key={mode} onClick={() => setTargetMode(mode)}
                  className="py-2 rounded-md text-xs font-medium transition-colors border"
                  style={{
                    backgroundColor: targetMode === mode ? 'rgba(0,201,122,0.15)' : 'transparent',
                    borderColor: targetMode === mode ? 'var(--accent)' : 'var(--border)',
                    color: targetMode === mode ? 'var(--accent)' : 'var(--muted)',
                  }}>
                  {mode === 'auto' ? 'From expenses' : 'Enter amount'}
                </button>
              ))}
            </div>

            {targetMode === 'auto' ? (
              <div className="space-y-4">
                <Input label="Monthly expenses after FIRE" value={monthlyExpense} onChange={setMonthlyExpense} unit="万/month" />
                <Input label="Withdrawal rate" value={withdrawalRate} onChange={setWithdrawalRate} unit="%" step="0.5" />
              </div>
            ) : (
              <Input label="Target portfolio size" value={manualTarget} onChange={setManualTarget} unit="万" step="100" />
            )}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'rgba(0,201,122,0.3)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>FIRE target</p>
              <p className="text-lg font-bold leading-tight" style={{ color: 'var(--accent)' }}>{fmt(fireTarget)}</p>
              {targetMode === 'auto' && (
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{withdrawalRate}% rule</p>
              )}
            </div>
            <div className="p-4 rounded-xl border text-center" style={{ backgroundColor: 'var(--surface)', borderColor: fireYear >= 0 ? 'rgba(0,201,122,0.3)' : 'var(--border)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>FIRE achieved</p>
              {fireYear >= 0
                ? <p className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{fireYear === 0 ? 'Already reached' : `yr ${fireYear}`}</p>
                : <p className="text-base font-bold" style={{ color: 'var(--muted)' }}>Not reached</p>
              }
            </div>
            <div className="p-4 rounded-xl border text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>After {years} years</p>
              <p className="text-lg font-bold leading-tight" style={{ color: finalAssets >= fireTarget ? 'var(--accent)' : 'var(--foreground)' }}>
                {fmt(finalAssets)}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Asset Growth Chart</h3>
            <LineChart data={chartData} target={fireTarget} />
          </div>

          <div className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Milestones</h3>
            <div className="space-y-0">
              {[1, 3, 5, 10, 15, 20, 25, 30].map(yr => {
                const d = chartData.find(c => c.year === yr)
                if (!d) return null
                const reached = d.value >= fireTarget
                const progress = Math.min(d.value / fireTarget * 100, 100)
                return (
                  <div key={yr} className="flex items-center gap-3 py-2.5 border-b" style={{ borderColor: 'var(--border)' }}>
                    <span className="text-xs w-12 flex-shrink-0" style={{ color: 'var(--muted)' }}>yr {yr}</span>
                    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: reached ? 'var(--accent)' : '#00a862' }} />
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {reached && (
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(0,201,122,0.15)', color: 'var(--accent)', fontSize: '10px' }}>✓</span>
                      )}
                      <span className="text-sm font-semibold tabular-nums w-24 text-right"
                        style={{ color: reached ? 'var(--accent)' : 'var(--foreground)' }}>
                        {fmt(d.value)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            * Approximate estimate. Does not account for taxes, inflation, or management fees.
          </p>
        </div>
      </div>
      <AdUnit slot="5904640354" format="auto" className="mt-10" />
    </div>
  )
}
