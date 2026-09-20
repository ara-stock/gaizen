'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { Project, ProjectStatus } from '@/types/project'
import {
  STATUS_COLOR, STATUS_LABEL, STATUS_ORDER, T, TGE_SOURCE_LABEL,
  countryFlag, formatFunding, type Locale,
} from './labels'
import RatingDots from './RatingDots'

const STORAGE_KEY = 'gaizen-tracker-status'

type SortKey = 'status' | 'tge' | 'funding' | 'points' | 'trust'
type Overrides = Record<string, ProjectStatus>

function readOverrides(): Overrides {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Overrides
  } catch {
    return {}
  }
}

function tgeSortValue(p: Project): string {
  if (p.token.launched) return 'z'
  return p.token.tgeTarget ?? 'y'
}

export function TgeCell({ project, locale }: { project: Project; locale: Locale }) {
  const { token } = project
  if (token.launched) {
    return (
      <span>
        <span className="font-mono">{token.ticker ? `$${token.ticker}` : T[locale].launched}</span>
        <span className="block text-xs" style={{ color: 'var(--muted)' }}>{token.tgeDate ?? T[locale].launched}</span>
      </span>
    )
  }
  return (
    <span>
      <span>{token.tgeExpectation || TGE_SOURCE_LABEL[locale].none}</span>
      {token.tgeExpectation && (
        <span className="block text-xs" style={{ color: 'var(--muted)' }}>{TGE_SOURCE_LABEL[locale][token.tgeSourceType]}</span>
      )}
    </span>
  )
}

export default function TrackerBoard({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const t = T[locale]
  const prefix = locale === 'en' ? '/en' : ''
  const [overrides, setOverrides] = useState<Overrides>({})
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all')
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('status')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    setOverrides(readOverrides())
  }, [])

  const setStatus = (slug: string, status: ProjectStatus, authorStatus: ProjectStatus) => {
    const next = { ...overrides }
    if (status === authorStatus) delete next[slug]
    else next[slug] = status
    setOverrides(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Filtering still works for this visit when browser storage is unavailable.
    }
  }

  const resetOverrides = () => {
    setOverrides({})
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Nothing to clear when browser storage is unavailable.
    }
  }

  const statusOf = (p: Project) => overrides[p.slug] ?? p.status
  const categories = useMemo(() => [...new Set(projects.map(p => p.category))].sort(), [projects])

  const counts = STATUS_ORDER.map(s => ({ status: s, count: projects.filter(p => statusOf(p) === s).length }))

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
        case 'points': return (b.points.expectation ?? 0) - (a.points.expectation ?? 0)
        case 'trust': return (b.team.trust ?? 0) - (a.team.trust ?? 0)
        default: return STATUS_ORDER.indexOf(statusOf(a)) - STATUS_ORDER.indexOf(statusOf(b)) || a.name.localeCompare(b.name)
      }
    })

  const controlStyle = { backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }

  const statusSelect = (p: Project) => (
    <span className="inline-flex flex-col gap-1">
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden="true" className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: STATUS_COLOR[statusOf(p)] }} />
        <select
          aria-label={`${p.name} ${t.status}`}
          value={statusOf(p)}
          onChange={e => setStatus(p.slug, e.target.value as ProjectStatus, p.status)}
          className="text-xs rounded border px-1.5 py-1"
          style={controlStyle}
        >
          {STATUS_ORDER.map(s => <option key={s} value={s}>{STATUS_LABEL[locale][s]}</option>)}
        </select>
      </span>
      {overrides[p.slug] && (
        <span className="text-xs" style={{ color: 'var(--muted)' }}>{t.authorStatus}: {STATUS_LABEL[locale][p.status]}</span>
      )}
    </span>
  )

  const baseCell = (p: Project) => (
    <span>
      <span>{countryFlag(p.team.countryCode)} {p.team.base}</span>
      <span className="block text-xs" style={{ color: 'var(--muted)' }}>
        {p.team.doxxed ? p.team.founders.slice(0, 2).join(', ') : t.anonymous}
      </span>
    </span>
  )

  const actions = (p: Project) => (
    <span className="inline-flex items-center gap-2">
      <Link href={`${prefix}/tracker/${p.slug}/`} className="text-xs underline min-h-8 inline-flex items-center" style={{ color: 'var(--accent)' }}>
        {t.detail}
      </Link>
      {p.links.referral && (
        <a href={p.links.referral} target="_blank" rel="sponsored nofollow noopener"
          className="text-xs font-semibold px-2.5 py-1.5 rounded"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}>
          {t.start}
        </a>
      )}
    </span>
  )

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {counts.map(({ status, count }) => {
          const selected = statusFilter === status
          return (
            <button key={status} type="button" aria-pressed={selected}
              onClick={() => setStatusFilter(selected ? 'all' : status)}
              className="p-4 rounded-xl border text-left transition-colors"
              style={{ backgroundColor: selected ? 'var(--accent-subtle)' : 'var(--surface)', borderColor: selected ? 'var(--accent)' : 'var(--border)' }}>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
                <span aria-hidden="true" className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLOR[status] }} />
                {STATUS_LABEL[locale][status]}
              </span>
              <span className="block text-2xl font-bold mt-1" style={{ color: 'var(--foreground)' }}>{count}</span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search} aria-label={t.search}
          className="flex-1 text-sm rounded-md border px-3 py-2.5" style={controlStyle} />
        <select value={category} onChange={e => setCategory(e.target.value)} aria-label={t.category}
          className="text-sm rounded-md border px-3 py-2.5" style={controlStyle}>
          <option value="all">{t.category}: {t.all}</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)} aria-label={t.sort}
          className="text-sm rounded-md border px-3 py-2.5" style={controlStyle}>
          <option value="status">{t.sortStatus}</option>
          <option value="tge">{t.sortTge}</option>
          <option value="funding">{t.sortFunding}</option>
          <option value="points">{t.sortPoints}</option>
          <option value="trust">{t.sortTrust}</option>
        </select>
      </div>
      <p className="text-xs mb-6" style={{ color: 'var(--muted)' }}>
        {t.myStatusHint}
        {Object.keys(overrides).length > 0 && (
          <button type="button" onClick={resetOverrides} className="underline ml-2" style={{ color: 'var(--accent)' }}>{t.reset}</button>
        )}
      </p>

      {visible.length === 0 && <p className="text-sm py-12 text-center" style={{ color: 'var(--muted)' }}>{t.empty}</p>}

      {/* Desktop: table */}
      {visible.length > 0 && (
        <div className="hidden lg:block rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs" style={{ color: 'var(--muted)', backgroundColor: 'var(--surface-2)' }}>
                {[t.project, t.status, t.tge, t.points, t.trust, t.funding, t.base, ''].map((h, i) => (
                  <th key={i} scope="col" className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map(p => (
                <tr key={p.slug} className="border-t align-top" style={{ borderColor: 'var(--border)' }}>
                  <th scope="row" className="px-4 py-3 text-left font-normal">
                    <Link href={`${prefix}/tracker/${p.slug}/`} className="font-semibold" style={{ color: 'var(--foreground)' }}>{p.name}</Link>
                    <span className="block text-xs" style={{ color: 'var(--muted)' }}>{p.category} · {p.chain}</span>
                  </th>
                  <td className="px-4 py-3">{statusSelect(p)}</td>
                  <td className="px-4 py-3"><TgeCell project={p} locale={locale} /></td>
                  <td className="px-4 py-3"><RatingDots value={p.points.exists ? p.points.expectation : undefined} emptyLabel={p.points.exists ? t.unrated : t.noPoints} /></td>
                  <td className="px-4 py-3"><RatingDots value={p.team.trust} emptyLabel={t.unrated} /></td>
                  <td className="px-4 py-3 font-mono">{formatFunding(p.funding.totalUsdM, locale)}</td>
                  <td className="px-4 py-3">{baseCell(p)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{actions(p)}</td>
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
              <div>
                <Link href={`${prefix}/tracker/${p.slug}/`} className="font-semibold" style={{ color: 'var(--foreground)' }}>{p.name}</Link>
                <span className="block text-xs" style={{ color: 'var(--muted)' }}>{p.category} · {p.chain}</span>
              </div>
              {statusSelect(p)}
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-4">
              {([
                [t.tge, <TgeCell key="tge" project={p} locale={locale} />],
                [t.funding, <span key="f" className="font-mono">{formatFunding(p.funding.totalUsdM, locale)}</span>],
                [t.points, <RatingDots key="p" value={p.points.exists ? p.points.expectation : undefined} emptyLabel={p.points.exists ? t.unrated : t.noPoints} />],
                [t.trust, <RatingDots key="t" value={p.team.trust} emptyLabel={t.unrated} />],
                [t.base, baseCell(p)],
              ] as const).map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>{label}</dt>
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
