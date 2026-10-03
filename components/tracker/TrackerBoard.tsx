'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Phase, Project, ProjectStatus } from '@/types/project'
import {
  ACTIVITY_COLOR, ACTIVITY_ORDER, CHEAP_MULTIPLE, STATUS_ORDER, STATUS_STORAGE_KEY,
  formatFollowers, formatFunding, formatUsdM,
  fdvMultiples, formatMultiple, readStored,
} from './labels'
import { airdropHref, dict, type Dict, type Locale } from './i18n'
import { PhaseMeter, ProjectLogo, TgeCell } from './cells'

type SortKey = 'focus' | 'phase' | 'tge' | 'funding' | 'followers'
type Tab = ProjectStatus | 'all'

const TABS: Tab[] = [...STATUS_ORDER, 'all']
const PHASE_RANK: Record<Phase, number> = { early: 0, mid: 1, late: 2, none: 3, ended: 4 }

/** Column widths are fixed so every value lines up vertically across all groups. */
const COLUMNS: { key?: SortKey; label?: Exclude<keyof Dict['board'], 'sortOptions'>; width?: number; align?: 'right' }[] = [
  { label: 'project' },
  { key: 'phase', label: 'phase', width: 124 },
  { key: 'tge', label: 'tge', width: 170 },
  { key: 'funding', label: 'funding', width: 116, align: 'right' },
  { key: 'followers', label: 'followers', width: 116, align: 'right' },
  { label: 'base', width: 140 },
]

const hasInvite = (p: Project) => Boolean(p.links.referral || p.links.inviteCodes?.length)

/**
 * Default order: the author's explicit `rank` first, then not-recommended last,
 * then venues with an invite link, then main focus, then phase.
 */
function focusOrder(a: Project, b: Project): number {
  return (
    (a.rank ?? Infinity) - (b.rank ?? Infinity) ||
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

export default function TrackerBoard({ projects, locale = 'ja' }: { projects: Project[]; locale?: Locale }) {
  const router = useRouter()
  const d = dict(locale)
  const b = d.board
  const href = (slug: string) => airdropHref(locale, slug)
  const [overrides, setOverrides] = useState<Record<string, ProjectStatus>>({})
  const [tab, setTab] = useState<Tab>('active')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('focus')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    setOverrides(readStored<ProjectStatus>(STATUS_STORAGE_KEY))
  }, [])

  // A stored status from an older version of the page may no longer exist.
  const statusOf = (p: Project) => (STATUS_ORDER.includes(overrides[p.slug]) ? overrides[p.slug] : p.status)
  const countOf = (t: Tab) => (t === 'all' ? projects.length : projects.filter(p => statusOf(p) === t).length)

  const visible = projects
    .filter(p => tab === 'all' || statusOf(p) === tab)
    .filter(p => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      return [p.name, p.category, d.activity[p.activity], p.chain, p.team.base, ...p.team.founders, ...p.funding.investors]
        .some(v => v.toLowerCase().includes(q))
    })
    .sort((a, b) => {
      switch (sortKey) {
        case 'tge': return tgeSortValue(a).localeCompare(tgeSortValue(b))
        case 'funding': return (b.funding.totalUsdM ?? -1) - (a.funding.totalUsdM ?? -1)
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

  /**
   * The whole row or card opens the detail page. The name stays a real <Link> for keyboard,
   * screen readers and open-in-new-tab; clicks on the referral button or while selecting text are left alone.
   */
  const openDetail = (slug: string) => (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a, button, select, input')) return
    if (window.getSelection()?.toString()) return
    router.push(href(slug))
  }

  // The button fills on hover while the card or row drops its own highlight (see has-[.cta:hover]),
  // so it is clear the button does something different from opening the detail page.
  const CTA = 'cta inline-block whitespace-nowrap text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)]'

  const referral = (p: Project) => p.links.referral ? (
    <a href={p.links.referral} target="_blank" rel="sponsored nofollow noopener"
      className={CTA}>
      {b.start}
    </a>
  ) : p.links.inviteCodes?.length ? (
    <Link href={`${href(p.slug)}#invite`}
      className={CTA}>
      {b.inviteOnly}
    </Link>
  ) : null

  const usesPhase = (p: Project) => p.activity === 'perps' || p.activity === 'points'

  // The chevron is always visible so the link reads as a link on touch screens, where hover never fires.
  const nameBlock = (p: Project) => (
    <span className="min-w-0">
      <span className="flex items-center gap-1.5 min-w-0">
        <span className="text-sm font-semibold truncate transition-colors text-[var(--foreground)] group-hover:text-[var(--accent)] group-hover:underline underline-offset-2 group-has-[.cta:hover]:text-[var(--foreground)] group-has-[.cta:hover]:no-underline">{p.name}</span>
        {p.priority === 1 && (
          <span className="flex-shrink-0 text-[10px] font-semibold px-1.5 py-px rounded" style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-subtle)' }}>{b.main}</span>
        )}
        {p.priority === 3 && (
          <span className="flex-shrink-0 text-[10px] font-semibold px-1.5 py-px rounded border" style={{ ...muted, borderColor: 'var(--border)' }}>{b.sideOnly}</span>
        )}
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className="flex-shrink-0 transition-transform text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-has-[.cta:hover]:text-[var(--muted)] group-has-[.cta:hover]:translate-x-0">
          <path d="m9 18 6-6-6-6" />
        </svg>
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

  /** Held tokens are judged on valuation, so those groups swap funding and followers for FDV and its multiple. */
  const valued = (p: Project) => p.activity === 'staking' || p.activity === 'hold'

  const multipleCell = (p: Project) => {
    const m = fdvMultiples(p)
    if (!m || (m.trailing === null && m.runRate === null)) return <span style={muted}>—</span>
    const cheap = m.trailing !== null && m.trailing <= CHEAP_MULTIPLE
    return (
      <span>
        <span className="font-mono tabular-nums font-semibold" style={{ color: cheap ? 'var(--accent)' : undefined }}>{formatMultiple(m.trailing, locale)}</span>
        <span className="block text-xs font-mono tabular-nums" style={muted}>{b.recent} {formatMultiple(m.runRate, locale)}</span>
        {m.atEntry !== null && (
          <span className="block text-xs font-mono tabular-nums" style={{ color: m.atEntry <= CHEAP_MULTIPLE ? 'var(--accent)' : 'var(--muted)' }}>{b.atEntry} {formatMultiple(m.atEntry, locale)}</span>
        )}
      </span>
    )
  }

  const fdvCell = (p: Project) => <span className="font-mono tabular-nums">{p.valuation?.fdvUsdM ? formatUsdM(p.valuation.fdvUsdM) : '—'}</span>

  const tokenCell = (p: Project) => {
    const token = p.staking?.token ?? p.token.ticker
    return <span className="font-mono">{token ? (p.activity === 'defi' ? token : `$${token}`) : '—'}</span>
  }

  const groupHeading = (activity: typeof ACTIVITY_ORDER[number], count: number) => (
    <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
      <span aria-hidden="true" className="w-1 h-4 rounded-full" style={{ backgroundColor: ACTIVITY_COLOR[activity] }} />
      {d.activity[activity]}
      <span className="font-mono font-normal text-xs" style={muted}>{count}</span>
    </span>
  )

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div role="tablist" aria-label={b.statusTabs} className="inline-flex p-1 rounded-lg border overflow-x-auto"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          {TABS.map(t => {
            const selected = tab === t
            return (
              <button key={t} type="button" role="tab" aria-selected={selected} onClick={() => setTab(t)}
                className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md whitespace-nowrap transition-colors"
                style={{ color: selected ? 'var(--background)' : 'var(--muted)', backgroundColor: selected ? 'var(--accent)' : 'transparent', fontWeight: selected ? 600 : 400 }}>
                {t === 'all' ? b.all : d.status[t]}
                <span className="ml-1 font-mono text-xs">{countOf(t)}</span>
              </button>
            )
          })}
        </div>
        <input type="search" value={query} onChange={e => setQuery(e.target.value)}
          placeholder={b.search} aria-label={b.search}
          className="flex-1 text-base sm:text-sm rounded-lg border px-3 py-2" style={controlStyle} />
        <select value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)} aria-label={b.sort}
          className="xl:hidden text-base sm:text-sm rounded-lg border px-3 py-2" style={controlStyle}>
          {(Object.keys(b.sortOptions) as SortKey[]).map(k => <option key={k} value={k}>{b.sortOptions[k]}</option>)}
        </select>
      </div>

      {groups.length === 0 && <p className="text-sm py-12 text-center" style={muted}>{b.empty}</p>}

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
                        // Staking and hold rows have no campaign: the phase and TGE columns become token + reward.
                        if (!phased && i === 2) return <th key={i} scope="col" className="px-3 py-2.5 font-medium text-left whitespace-nowrap">{activity === 'hold' ? b.memo : b.yield}</th>
                        const valuedGroup = activity === 'staking' || activity === 'hold'
                        const label = !phased && i === 1 ? (activity === 'defi' ? b.deposit : b.token)
                          : valuedGroup && i === 3 ? b.fdv
                          : valuedGroup && i === 4 ? b.fdvRevenue
                          : c.label ? b[c.label] : ''
                        const sortable = c.key && (phased || (i > 2 && !valuedGroup))
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
                      <tr key={p.slug} onClick={openDetail(p.slug)}
                        className="group border-t align-middle cursor-pointer transition-colors hover:bg-[var(--surface-2)] has-[.cta:hover]:bg-transparent"
                        style={{ borderColor: 'var(--border)', opacity: p.priority === 3 ? 0.6 : 1 }}>
                        {/* The button sits next to the name, as on the cards, instead of in a far-right column. */}
                        <th scope="row" className="px-3 py-2.5 text-left font-normal">
                          <span className="flex items-center gap-3 min-w-0">
                            <Link href={href(p.slug)} className="flex items-center gap-3 min-w-0 flex-1">
                              <ProjectLogo project={p} size={28} />
                              {nameBlock(p)}
                            </Link>
                            {referral(p)}
                          </span>
                        </th>
                        {usesPhase(p) ? (
                          <>
                            <td className="px-3 py-2.5"><PhaseMeter phase={p.phase} locale={locale} /></td>
                            <td className="px-3 py-2.5"><TgeCell project={p} locale={locale} /></td>
                          </>
                        ) : (
                          <>
                            <td className="px-3 py-2.5">{tokenCell(p)}</td>
                            <td className="px-3 py-2.5">{stakingCell(p)}</td>
                          </>
                        )}
                        {valued(p) ? (
                          <>
                            <td className="px-3 py-2.5 text-right">{fdvCell(p)}</td>
                            <td className="px-3 py-2.5 text-right">{multipleCell(p)}</td>
                          </>
                        ) : (
                          <>
                            <td className="px-3 py-2.5 text-right font-mono tabular-nums">{formatFunding(p.funding.totalUsdM, locale)}</td>
                            <td className="px-3 py-2.5 text-right font-mono tabular-nums">{p.audience?.xFollowers ? formatFollowers(p.audience.xFollowers, locale) : '—'}</td>
                          </>
                        )}
                        <td className="px-3 py-2.5 text-xs leading-snug">{p.team.base}</td>
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
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map(p => (
                <li key={p.slug} onClick={openDetail(p.slug)}
                  className="group min-w-0 rounded-xl border p-4 cursor-pointer transition-colors border-[var(--border)] hover:border-[var(--accent)] has-[.cta:hover]:border-[var(--border)]"
                  style={{ backgroundColor: 'var(--surface)', opacity: p.priority === 3 ? 0.6 : 1 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <ProjectLogo project={p} size={28} />
                    <Link href={href(p.slug)} className="min-w-0 flex-1">{nameBlock(p)}</Link>
                    {referral(p)}
                  </div>
                  <dl className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-y-1.5 text-sm border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                    {([
                      ...(usesPhase(p) ? [
                        [b.phase, <PhaseMeter key="ph" phase={p.phase} locale={locale} />],
                        [b.tge, <TgeCell key="tge" project={p} locale={locale} />],
                      ] as const : [
                        [p.activity === 'defi' ? b.deposit : b.token, tokenCell(p)],
                        [p.activity === 'hold' ? b.memo : b.yield, stakingCell(p)],
                      ] as const),
                      ...(valued(p) ? [
                        [b.fdv, fdvCell(p)],
                        [b.fdvRevenue, multipleCell(p)],
                      ] as const : [
                        [b.funding, <span key="f" className="font-mono tabular-nums">{formatFunding(p.funding.totalUsdM, locale)}</span>],
                        [b.followers, <span key="x" className="font-mono tabular-nums">{p.audience?.xFollowers ? formatFollowers(p.audience.xFollowers, locale) : '—'}</span>],
                      ] as const),
                      [b.base, p.team.base],
                    ] as const).map(([label, value]) => (
                      <div key={label} className="contents">
                        <dt className="text-xs pt-0.5" style={muted}>{label}</dt>
                        <dd className="min-w-0 break-words">{value}</dd>
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
