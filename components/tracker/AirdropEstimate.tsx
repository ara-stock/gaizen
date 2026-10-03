'use client'

import { useEffect, useState } from 'react'
import type { Project } from '@/types/project'
import { dict, type Locale } from './i18n'
import { POINTS_STORAGE_KEY, airdropPoolUsdM, formatUsd, formatUsdM, readStored, usdPerPoint, writeStored } from './labels'

export default function AirdropEstimate({ project, locale = 'ja' }: { project: Project; locale?: Locale }) {
  const text = dict(locale).estimate
  const [points, setPoints] = useState('')
  const pool = airdropPoolUsdM(project)
  const perPoint = usdPerPoint(project)
  const { airdrop } = project

  useEffect(() => {
    const saved = readStored<number>(POINTS_STORAGE_KEY)[project.slug]
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    if (saved) setPoints(String(saved))
  }, [project.slug])

  const update = (value: string) => {
    setPoints(value)
    const all = readStored<number>(POINTS_STORAGE_KEY)
    const n = Number(value)
    if (n > 0) all[project.slug] = n
    else delete all[project.slug]
    writeStored(POINTS_STORAGE_KEY, all)
  }

  if (!airdrop || pool === null) {
    return <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{airdrop?.basis ?? text.unavailable}</p>
  }

  const mine = Number(points) > 0 && perPoint !== null ? perPoint * Number(points) : null
  const muted = { color: 'var(--muted)' }

  return (
    <div className="text-sm">
      {airdrop.estimated && (
        <p className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4"
          style={{ color: 'var(--chart-gold)', backgroundColor: 'color-mix(in srgb, var(--chart-gold) 14%, transparent)' }}>
          {text.estimated}
        </p>
      )}
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {([
          [text.fdv, airdrop.fdvUsdM ? formatUsdM(airdrop.fdvUsdM) : '—'],
          [text.share, airdrop.sharePct ? `${airdrop.sharePct}%` : '—'],
          [text.pool, formatUsdM(pool)],
          [text.perPoint, perPoint === null ? '—' : `$${perPoint < 1 ? perPoint.toPrecision(3) : perPoint.toFixed(2)}`],
        ] as const).map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs mb-1" style={muted}>{label}</dt>
            <dd className="font-mono font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      {perPoint !== null && (
        <div className="flex flex-wrap items-end gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-2)' }}>
          <label className="flex flex-col gap-1 text-xs" style={muted}>
            {text.myPoints}
            <input type="number" min="0" inputMode="decimal" value={points} onChange={e => update(e.target.value)}
              className="text-base sm:text-sm rounded-md border px-3 py-2 w-40 font-mono"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
          </label>
          <p>
            <span className="block text-xs" style={muted}>{text.payout}</span>
            <span className="text-xl font-bold font-mono" style={{ color: 'var(--accent)' }}>{mine === null ? '—' : formatUsd(mine)}</span>
          </p>
        </div>
      )}

      <p className="text-xs leading-relaxed mt-4" style={muted}>
        {text.basis}: {airdrop.basis}
        {airdrop.totalPoints && text.issued(airdrop.totalPoints.toLocaleString('en-US'), airdrop.totalPointsAsOf)}
      </p>
      <p className="text-xs leading-relaxed mt-2" style={muted}>
        {text.footnote}
      </p>
    </div>
  )
}
