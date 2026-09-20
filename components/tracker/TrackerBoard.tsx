'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { Project, ProjectStatus } from '@/types/project'
import {
  POINTS_STORAGE_KEY, STATUS_COLOR, STATUS_LABEL, STATUS_ORDER, STATUS_STORAGE_KEY,
  airdropPoolUsdM, countryFlag, formatFollowers, formatFunding, formatUsd, formatUsdM,
  readStored, usdPerPoint, writeStored,
} from './labels'
import { PhaseMeter, TgeCell } from './cells'

type SortKey = 'status' | 'tge' | 'funding' | 'pool' | 'followers'
type Overrides = Record<string, ProjectStatus>

function tgeSortValue(p: Project): string {
  if (p.token.launched) return 'z'
  return p.token.tgeTarget ?? 'y'
}

export default function TrackerBoard({ projects }: { projects: Project[] }) {
  const [overrides, setOverrides] = useState<Overrides>({})
  const [myPoints, setMyPoints] = useState<Record<string, number>>({})
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all')
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('status')

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- localStorage is only readable after mount */
    setOverrides(readStored<ProjectStatus>(STATUS_STORAGE_KEY))
    setMyPoints(readStored<number>(POINTS_STORAGE_KEY))
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  const setStatus = (slug: string, status: ProjectStatus, authorStatus: ProjectStatus) => {
    const next = { ...overrides }
    if (status === authorStatus) delete next[slug]
    else next[slug] = status
    setOverrides(next)
    writeStored(STATUS_STORAGE_KEY, next)
  }

  const resetOverrides = () => {
    setOverrides({})
    writeStored(STATUS_STORAGE_KEY, {})
  }

  const statusOf = (p: Project) => overrides[p.slug] ?? p.status
  const categories = useMemo(() => [...new Set(projects.map(p => p.category))].sort(), [projects])
  const counts = STATUS_ORDER
    .map(s => ({ status: s, count: projects.filter(p => statusOf(p) === s).length }))
    .filter(({ status, count }) => count > 0 || status === 'active' || status === 'watching')

  const visible = projects
    .filter(p => statusFilter === 'all' || statusOf(p) === statusFilter)
    .filter(p => category === 'all' || p.category === category)
    .filter(p => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      return [p.name, p.category, p.chain, p.team.base, ...p.team.founders, ...p.funding.investors]
        .some(v => v.toLowerCase().includes(q))
    })
    .sort((a, b) => {
      switch (sortKey) {
        case 'tge': return tgeSortValue(a).localeCompare(tgeSortValue(b))
        case 'funding': return (b.funding.totalUsdM ?? -1) - (a.funding.totalUsdM ?? -1)
        case 'pool': return (airdropPoolUsdM(b) ?? -1) - (airdropPoolUsdM(a) ?? -1)
        case 'followers': return (b.audience?.xFollowers ?? -1) - (a.audience?.xFollowers ?? -1)
        default: return STATUS_ORDER.indexOf(statusOf(a)) - STATUS_ORDER.indexOf(statusOf(b)) || a.name.localeCompare(b.name)
      }
    })

  const controlStyle = { backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }
  const muted = { color: 'var(--muted)' }

  const statusSelect = (p: Project) => (
    <span className="inline-flex flex-col gap-1">
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden="true" className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: STATUS_COLOR[statusOf(p)] }} />
        <select
          aria-label={`${p.name} ステータス`}
          value={statusOf(p)}
          onChange={e => setStatus(p.slug, e.target.value as ProjectStatus, p.status)}
          className="text-xs rounded border px-1.5 py-1"
          style={controlStyle}
        >
          {STATUS_ORDER.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
        </select>
      </span>
      {overrides[p.slug] && <span className="text-xs" style={muted}>ara: {STATUS_LABEL[p.status]}</span>}
    </span>
  )

  const airdropCell = (p: Project) => {
    const pool = airdropPoolUsdM(p)
    const perPoint = usdPerPoint(p)
    const mine = myPoints[p.slug]
    if (pool === null) return <span className="text-xs" style={muted}>{p.phase === 'ended' && !p.airdrop ? '—' : '試算不可'}</span>
    return (
      <span>
        {perPoint !== null && mine ? (
          <span className="font-mono font-semibold" style={{ color: 'var(--accent)' }}>{formatUsd(perPoint * mine)}</span>
        ) : (
          <Link href={`/tracker/${p.slug}/#estimate`} className="text-xs underline" style={{ color: 'var(--accent)' }}>自分の分を試算</Link>
        )}
        <span className="block text-xs" style={muted}>全体 {formatUsdM(pool)}</span>
      </span>
    )
  }

  const audienceCell = (p: Project) => p.audience?.xFollowers ? (
    <span>
      <span className="font-mono">{formatFollowers(p.audience.xFollowers)}</span>
      {p.audience.users && <span className="block text-xs" style={muted}>{p.audience.users}</span>}
    </span>
  ) : <span className="text-xs" style={muted}>—</span>

  const baseCell = (p: Project) => (
    <span>
      <span>{countryFlag(p.team.countryCode)} {p.team.base}</span>
      <span className="block text-xs" style={muted}>{p.team.founders.length > 0 ? p.team.founders.slice(0, 2).join(', ') : '創業者未公表'}</span>
    </span>
  )

  const actions = (p: Project) => (
    <span className="inline-flex items-center gap-2">
      <Link href={`/tracker/${p.slug}/`} className="text-xs underline min-h-8 inline-flex items-center" style={{ color: 'var(--accent)' }}>詳細</Link>
      {p.links.referral && (
        <a href={p.links.referral} target="_blank" rel="sponsored nofollow noopener"
          className="text-xs font-semibold px-2.5 py-1.5 rounded"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}>
          始める
        </a>
      )}
    </span>
  )

  const nameCell = (p: Project) => (
    <>
      <Link href={`/tracker/${p.slug}/`} className="font-semibold" style={{ color: 'var(--foreground)' }}>{p.name}</Link>
      <span className="block text-xs" style={muted}>{p.category} · {p.chain}</span>
    </>
  )

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
        {counts.map(({ status, count }) => {
          const selected = statusFilter === status
          return (
            <button key={status} type="button" aria-pressed={selected}
              onClick={() => setStatusFilter(selected ? 'all' : status)}
              className="p-4 rounded-xl border text-left transition-colors"
              style={{ backgroundColor: selected ? 'var(--accent-subtle)' : 'var(--surface)', borderColor: selected ? 'var(--accent)' : 'var(--border)' }}>
              <span className="flex items-center gap-1.5 text-xs" style={muted}>
                <span aria-hidden="true" className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLOR[status] }} />
                {STATUS_LABEL[status]}
              </span>
              <span className="block text-2xl font-bold mt-1" style={{ color: 'var(--foreground)' }}>{count}</span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input type="search" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="プロジェクト名・VC・国で検索" aria-label="プロジェクト名・VC・国で検索"
          className="flex-1 text-sm rounded-md border px-3 py-2.5" style={controlStyle} />
        <select value={category} onChange={e => setCategory(e.target.value)} aria-label="カテゴリ"
          className="text-sm rounded-md border px-3 py-2.5" style={controlStyle}>
          <option value="all">カテゴリ: すべて</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)} aria-label="並び替え"
          className="text-sm rounded-md border px-3 py-2.5" style={controlStyle}>
          <option value="status">ステータス順</option>
          <option value="tge">TGEが近い順</option>
          <option value="funding">調達額が多い順</option>
          <option value="pool">エアドロ規模が大きい順</option>
          <option value="followers">Xフォロワーが多い順</option>
        </select>
      </div>
      <p className="text-xs mb-6" style={muted}>
        ステータスと保有ポイントは自分用に変更できます。内容はこのブラウザにだけ保存され、外部には送信されません。
        {Object.keys(overrides).length > 0 && (
          <button type="button" onClick={resetOverrides} className="underline ml-2" style={{ color: 'var(--accent)' }}>ステータスの変更をリセット</button>
        )}
      </p>

      {visible.length === 0 && <p className="text-sm py-12 text-center" style={muted}>条件に合うプロジェクトがありません。</p>}

      {/* Desktop: table */}
      {visible.length > 0 && (
        <div className="hidden lg:block rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs" style={{ ...muted, backgroundColor: 'var(--surface-2)' }}>
                {['プロジェクト', 'ステータス', 'フェーズ', 'TGE', '受取見込み', 'VC調達額', 'Xフォロワー', '拠点・トップ', ''].map((h, i) => (
                  <th key={i} scope="col" className="px-3 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map(p => (
                <tr key={p.slug} className="border-t align-top" style={{ borderColor: 'var(--border)' }}>
                  <th scope="row" className="px-3 py-3 text-left font-normal">{nameCell(p)}</th>
                  <td className="px-3 py-3">{statusSelect(p)}</td>
                  <td className="px-3 py-3"><PhaseMeter phase={p.phase} /></td>
                  <td className="px-3 py-3"><TgeCell project={p} /></td>
                  <td className="px-3 py-3">{airdropCell(p)}</td>
                  <td className="px-3 py-3 font-mono">{formatFunding(p.funding.totalUsdM)}</td>
                  <td className="px-3 py-3">{audienceCell(p)}</td>
                  <td className="px-3 py-3">{baseCell(p)}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{actions(p)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile / tablet: cards */}
      <ul className="lg:hidden grid sm:grid-cols-2 gap-3">
        {visible.map(p => (
          <li key={p.slug} className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>{nameCell(p)}</div>
              {statusSelect(p)}
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-4">
              {([
                ['フェーズ', <PhaseMeter key="ph" phase={p.phase} />],
                ['TGE', <TgeCell key="tge" project={p} />],
                ['受取見込み', airdropCell(p)],
                ['VC調達額', <span key="f" className="font-mono">{formatFunding(p.funding.totalUsdM)}</span>],
                ['Xフォロワー', audienceCell(p)],
                ['拠点・トップ', baseCell(p)],
              ] as const).map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs mb-0.5" style={muted}>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            {actions(p)}
          </li>
        ))}
      </ul>
    </div>
  )
}
