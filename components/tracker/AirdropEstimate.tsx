'use client'

import { useEffect, useState } from 'react'
import type { Project } from '@/types/project'
import { POINTS_STORAGE_KEY, airdropPoolUsdM, formatUsd, formatUsdM, readStored, usdPerPoint, writeStored } from './labels'

export default function AirdropEstimate({ project }: { project: Project }) {
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
    return <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{airdrop?.basis ?? '配分比率または評価額の手がかりがなく、現時点では試算できません。'}</p>
  }

  const mine = Number(points) > 0 && perPoint !== null ? perPoint * Number(points) : null
  const muted = { color: 'var(--muted)' }

  return (
    <div className="text-sm">
      {airdrop.estimated && (
        <p className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4"
          style={{ color: 'var(--chart-gold)', backgroundColor: 'color-mix(in srgb, var(--chart-gold) 14%, transparent)' }}>
          推定・仮置きの数値を含みます
        </p>
      )}
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {([
          ['FDVの想定', airdrop.fdvUsdM ? formatUsdM(airdrop.fdvUsdM) : '—'],
          ['エアドロ配分', airdrop.sharePct ? `${airdrop.sharePct}%` : '—'],
          ['配布総額の見込み', formatUsdM(pool)],
          ['1ポイントあたり', perPoint === null ? '—' : `$${perPoint < 1 ? perPoint.toPrecision(3) : perPoint.toFixed(2)}`],
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
            自分の保有ポイント
            <input type="number" min="0" inputMode="decimal" value={points} onChange={e => update(e.target.value)}
              className="text-sm rounded-md border px-3 py-2 w-40 font-mono"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
          </label>
          <p>
            <span className="block text-xs" style={muted}>受取見込み</span>
            <span className="text-2xl font-bold font-mono" style={{ color: 'var(--accent)' }}>{mine === null ? '—' : formatUsd(mine)}</span>
          </p>
        </div>
      )}

      <p className="text-xs leading-relaxed mt-4" style={muted}>
        根拠: {airdrop.basis}
        {airdrop.totalPoints && `（発行済みポイント ${airdrop.totalPoints.toLocaleString('en-US')}、${airdrop.totalPointsAsOf}時点）`}
      </p>
      <p className="text-xs leading-relaxed mt-2" style={muted}>
        配布総額 = FDVの想定 × エアドロ配分。1ポイントの価値は現時点の発行済みポイントで割っているため、今後ポイントが増えるほど下がります。
        配分方法・ロック・シビル判定によって実際の受取額は大きく変わります。入力したポイントはこのブラウザにだけ保存されます。
      </p>
    </div>
  )
}
