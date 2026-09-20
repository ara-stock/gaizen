'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Phase, Project, ProjectStatus } from '@/types/project'
import {
  ACTIVITY_COLOR, ACTIVITY_LABEL, ACTIVITY_ORDER, POINTS_STORAGE_KEY, STATUS_LABEL, STATUS_ORDER, STATUS_STORAGE_KEY,
  airdropPoolUsdM, formatFollowers, formatFunding, formatUsd, formatUsdM,
  readStored, usdPerPoint,
} from './labels'
import { PhaseMeter, ProjectLogo, TgeCell } from './cells'

type SortKey = 'focus' | 'phase' | 'tge' | 'pool' | 'funding' | 'followers'
type Tab = ProjectStatus | 'all'

const TABS: Tab[] = [...STATUS_ORDER, 'all']
const PHASE_RANK: Record<Phase, number> = { early: 0, mid: 1, late: 2, none: 3, ended: 4 }

/** Column widths are fixed so every value lines up vertically across all groups. */
const COLUMNS: { key?: SortKey; label: string; width?: number; align?: 'right' }[] = [
  { label: 'プロジェクト' },
  { key: 'phase', label: 'フェーズ', width: 124 },
  { key: 'tge', label: 'TGE', width: 150 },
  { key: 'pool', label: 'エアドロ規模', width: 132, align: 'right' },
  { key: 'funding', label: 'VC調達額', width: 108, align: 'right' },
  { key: 'followers', label: 'Xフォロワー', width: 116, align: 'right' },
  { label: '拠点', width: 140 },
  { label: '', width: 92 },
]

const hasInvite = (p: Project) => Boolean(p.links.referral || p.links.inviteCodes?.length)

/** Default order: not-recommended last, then venues with an invite link, then main focus, then phase. */
function focusOrder(a: Project, b: Project): number {
  return (
    Number(a.priority === 3) - Number(b.priority === 3) ||
    Number(hasInvite(b)) - Number(hasInvite(a)) ||
    a.priority - b.priority ||
    PHASE_RANK[a.phase] - PHASE_RANK[b.phase] ||
    a.name.localeCompare(b.name)
  )
}

function tgeSortValue(p: Project): string {
  if (p.token.launched) return 'z'
  return p.token.tgeTarget ?? 'y'
}

export default function TrackerBoard({ projects }: { projects: Project[] }) {
  const [overrides, setOverrides] = useState<Record<string, ProjectStatus>>({})
  const [myPoints, setMyPoints] = useState<Record<string, number>>({})
  const [tab, setTab] = useState<Tab>('active')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('focus')

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- localStorage is only readable after mount */
    setOverrides(readStored<ProjectStatus>(STATUS_STORAGE_KEY))
    setMyPoints(readStored<number>(POINTS_STORAGE_KEY))
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  // A stored status from an older version of the page may no longer exist.
  const statusOf = (p: Project) => (STATUS_ORDER.includes(overrides[p.slug]) ? overrides[p.slug] : p.status)
  const countOf = (t: Tab) => (t === 'all' ? projects.length : projects.filter(p => statusOf(p) === t).length)

  const visible = projects
    .filter(p => tab === 'all' || statusOf(p) === tab)
    .filter(p => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      return [p.name, p.category, ACTIVITY_LABEL[p.activity], p.chain, p.team.base, ...p.team.founders, ...p.funding.investors]
        .some(v => v.toLowerCase().includes(q))
    })
    .sort((a, b) => {
      switch (sortKey) {
        case 'tge': return tgeSortValue(a).localeCompare(tgeSortValue(b))
        case 'funding': return (b.funding.totalUsdM ?? -1) - (a.funding.totalUsdM ?? -1)
        case 'pool': return (airdropPoolUsdM(b) ?? -1) - (airdropPoolUsdM(a) ?? -1)
        case 'followers': return (b.audience?.xFollowers ?? -1) - (a.audience?.xFollowers ?? -1)
        case 'phase': return PHASE_RANK[a.phase] - PHASE_RANK[b.phase] || a.name.localeCompare(b.name)
        default: return focusOrder(a, b)
      }
    })

  const groups = ACTIVITY_ORDER
    .map(activity => ({ activity, items: visible.filter(p => p.activity === activity) }))
    .filter(g => g.items.length > 0)

  const muted = { color: 'var(--muted)' }
  const controlStyle = { backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }

  const airdropCell = (p: Project) => {
    const pool = airdropPoolUsdM(p)
    if (pool === null) return <span style={muted}>—</span>
    const perPoint = usdPerPoint(p)
    const mine = myPoints[p.slug]
    return (
      <span>
        <span className="font-mono tabular-nums">{formatUsdM(pool)}</span>
        {p.airdrop?.estimated && <span className="text-xs ml-1" style={muted}>推定</span>}
        {perPoint !== null && mine ? (
          <span className="block text-xs font-mono tabular-nums" style={{ color: 'var(--accent)' }}>自分 {formatUsd(perPoint * mine)}</span>
        ) : null}
      </span>
    )
  }

  const referral = (p: Project) => p.links.referral ? (
    <a href={p.links.referral} target="_blank" rel="sponsored nofollow noopener"
      className="inline-block whitespace-nowrap text-xs font-semibold px-2.5 py-1 rounded-md border"
      style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
      始める
    </a>
  ) : p.links.inviteCodes?.length ? (
    <Link href={`/tracker/${p.slug}/#invite`}
      className="inline-block whitespace-nowrap text-xs font-semibold px-2.5 py-1 rounded-md border"
      style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
      招待制
    </Link>
  ) : null

  const usesPhase = (p: Project) => p.activity === 'perps' || p.activity === 'points'

  const nameBlock = (p: Project) => (
    <span className="min-w-0">
      <span className="flex items-center gap-1.5 min-w-0">
        <span className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>{p.name}</span>
        {p.priority === 1 && (
          <span className="flex-shrink-0 text-[10px] font-semibold px-1.5 py-px rounded" style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-subtle)' }}>主力</span>
        )}
        {p.priority === 3 && (
          <span className="flex-shrink-0 text-[10px] font-semibold px-1.5 py-px rounded border" style={{ ...muted, borderColor: 'var(--border)' }}>おすすめ外</span>
        )}
      </span>
      <span className="block text-xs truncate" style={muted}>{p.chain}</span>
    </span>
  )

  const stakingCell = (p: Project) => (
    <span>
      {p.staking?.apy && <span className="block font-semibold">{p.staking.apy}</span>}
      <span className="block text-xs leading-snug" style={muted}>{p.staking?.reward ?? p.phaseNote ?? '—'}</span>
    </span>
  )

  const tokenCell = (p: Project) => <span className="font-mono">{p.token.ticker ? `$${p.token.ticker}` : '—'}</span>

  const groupHeading = (activity: typeof ACTIVITY_ORDER[number], count: number) => (
    <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
      <span aria-hidden="true" className="w-1 h-4 rounded-full" style={{ backgroundColor: ACTIVITY_COLOR[activity] }} />
      {ACTIVITY_LABEL[activity]}
      <span className="font-mono font-normal text-xs" style={muted}>{count}</span>
    </span>
  )

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div role="tablist" aria-label="ステータス" className="inline-flex p-1 rounded-lg border overflow-x-auto"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          {TABS.map(t => {
            const selected = tab === t
            return (
              <button key={t} type="button" role="tab" aria-selected={selected} onClick={() => setTab(t)}
                className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md whitespace-nowrap transition-colors"
                style={{ color: selected ? 'var(--background)' : 'var(--muted)', backgroundColor: selected ? 'var(--accent)' : 'transparent', fontWeight: selected ? 600 : 400 }}>
                {t === 'all' ? 'すべて' : STATUS_LABEL[t]}
                <span className="ml-1 font-mono text-xs">{countOf(t)}</span>
              </button>
            )
          })}
        </div>
        <input type="search" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="プロジェクト名・VC・国で検索" aria-label="プロジェクト名・VC・国で検索"
          className="flex-1 text-base sm:text-sm rounded-lg border px-3 py-2" style={controlStyle} />
        <select value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)} aria-label="並び替え"
          className="xl:hidden text-base sm:text-sm rounded-lg border px-3 py-2" style={controlStyle}>
          <option value="focus">おすすめ順</option>
          <option value="phase">フェーズが早い順</option>
          <option value="tge">TGEが近い順</option>
          <option value="pool">エアドロ規模が大きい順</option>
          <option value="funding">調達額が多い順</option>
          <option value="followers">Xフォロワーが多い順</option>
        </select>
      </div>

      {groups.length === 0 && <p className="text-sm py-12 text-center" style={muted}>条件に合うプロジェクトがありません。</p>}

      {/* Desktop: one table per group. All tables share the same column widths, so values line up page-wide. */}
      <div className="hidden xl:flex flex-col gap-8">
        {groups.map(({ activity, items }) => {
          const phased = activity === 'perps' || activity === 'points'
          return (
            <section key={activity}>
              <h2 className="mb-2.5">{groupHeading(activity, items.length)}</h2>
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                <table className="w-full text-sm table-fixed">
                  <colgroup>{COLUMNS.map((c, i) => <col key={i} style={c.width ? { width: c.width } : undefined} />)}</colgroup>
                  <thead>
                    <tr className="text-xs" style={{ ...muted, backgroundColor: 'var(--surface-2)' }}>
                      {COLUMNS.map((c, i) => {
                        // Staking and hold rows have no campaign: those three columns become token + reward.
                        if (!phased && i === 2) return <th key={i} scope="col" colSpan={2} className="px-3 py-2.5 font-medium text-left whitespace-nowrap">{activity === 'staking' ? '報酬・APY' : 'メモ'}</th>
                        if (!phased && i === 3) return null
                        const label = !phased && i === 1 ? 'トークン' : c.label
                        const sortable = c.key && (phased || i > 3)
                        return (
                          <th key={i} scope="col" className={`px-3 py-2.5 font-medium whitespace-nowrap ${c.align === 'right' ? 'text-right' : 'text-left'}`}
                            aria-sort={sortable && sortKey === c.key ? 'ascending' : undefined}>
                            {sortable ? (
                              <button type="button" onClick={() => setSortKey(sortKey === c.key ? 'focus' : c.key!)} className="inline-flex items-center gap-1"
                                style={{ color: sortKey === c.key ? 'var(--accent)' : undefined, fontWeight: sortKey === c.key ? 600 : undefined }}>
                                {label}
                                <span aria-hidden="true" style={{ opacity: sortKey === c.key ? 1 : 0.35 }}>↓</span>
                              </button>
                            ) : label}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(p => (
                      <tr key={p.slug} className="border-t align-middle" style={{ borderColor: 'var(--border)', opacity: p.priority === 3 ? 0.6 : 1 }}>
                        <th scope="row" className="px-3 py-2.5 text-left font-normal">
                          <Link href={`/tracker/${p.slug}/`} className="flex items-center gap-3 min-w-0">
                            <ProjectLogo project={p} size={28} />
                            {nameBlock(p)}
                          </Link>
                        </th>
                        {usesPhase(p) ? (
                          <>
                            <td className="px-3 py-2.5"><PhaseMeter phase={p.phase} /></td>
                            <td className="px-3 py-2.5"><TgeCell project={p} /></td>
                            <td className="px-3 py-2.5 text-right">{airdropCell(p)}</td>
                          </>
                        ) : (
                          <>
                            <td className="px-3 py-2.5">{tokenCell(p)}</td>
                            <td colSpan={2} className="px-3 py-2.5">{stakingCell(p)}</td>
                          </>
                        )}
                        <td className="px-3 py-2.5 text-right font-mono tabular-nums">{formatFunding(p.funding.totalUsdM)}</td>
                        <td className="px-3 py-2.5 text-right font-mono tabular-nums">{p.audience?.xFollowers ? formatFollowers(p.audience.xFollowers) : '—'}</td>
                        <td className="px-3 py-2.5 text-xs leading-snug">{p.team.base}</td>
                        <td className="px-3 py-2.5 text-right">{referral(p)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        })}
      </div>

      {/* Phone / tablet: the same fields as label–value rows, so labels line up card to card. */}
      <div className="xl:hidden flex flex-col gap-8">
        {groups.map(({ activity, items }) => (
          <section key={activity}>
            <h2 className="mb-3">{groupHeading(activity, items.length)}</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map(p => (
                <li key={p.slug} className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', opacity: p.priority === 3 ? 0.6 : 1 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <ProjectLogo project={p} size={28} />
                    <Link href={`/tracker/${p.slug}/`} className="min-w-0 flex-1">{nameBlock(p)}</Link>
                    {referral(p)}
                  </div>
                  <dl className="grid grid-cols-[6.5rem_1fr] gap-y-1.5 text-sm border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                    {([
                      ...(usesPhase(p) ? [
                        ['フェーズ', <PhaseMeter key="ph" phase={p.phase} />],
                        ['TGE', <TgeCell key="tge" project={p} />],
                        ['エアドロ規模', airdropCell(p)],
                      ] as const : [
                        ['トークン', tokenCell(p)],
                        [p.activity === 'staking' ? '報酬・APY' : 'メモ', stakingCell(p)],
                      ] as const),
                      ['VC調達額', <span key="f" className="font-mono tabular-nums">{formatFunding(p.funding.totalUsdM)}</span>],
                      ['Xフォロワー', <span key="x" className="font-mono tabular-nums">{p.audience?.xFollowers ? formatFollowers(p.audience.xFollowers) : '—'}</span>],
                      ['拠点', p.team.base],
                    ] as const).map(([label, value]) => (
                      <div key={label} className="contents">
                        <dt className="text-xs pt-0.5" style={muted}>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
