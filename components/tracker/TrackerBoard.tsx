'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { Project, ProjectStatus } from '@/types/project'
import {
  POINTS_STORAGE_KEY, STATUS_LABEL, STATUS_ORDER, STATUS_STORAGE_KEY,
  airdropPoolUsdM, countryFlag, formatFollowers, formatFunding, formatUsd, formatUsdM,
  readStored, scoreColor, scoreProject, usdPerPoint,
} from './labels'
import { PhaseBadge, ProjectLogo } from './cells'

type SortKey = 'score' | 'tge' | 'funding' | 'pool' | 'followers'
type Tab = ProjectStatus | 'all'

const TABS: Tab[] = [...STATUS_ORDER, 'all']

function tgeSortValue(p: Project): string {
  if (p.token.launched) return 'z'
  return p.token.tgeTarget ?? 'y'
}

function tgeText(p: Project): string {
  if (p.token.launched) return p.token.ticker ? `$${p.token.ticker} 上場済` : '上場済'
  return p.token.tgeExpectation || '未発表'
}

export default function TrackerBoard({ projects }: { projects: Project[] }) {
  const [overrides, setOverrides] = useState<Record<string, ProjectStatus>>({})
  const [myPoints, setMyPoints] = useState<Record<string, number>>({})
  const [tab, setTab] = useState<Tab>('active')
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('score')

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- localStorage is only readable after mount */
    setOverrides(readStored<ProjectStatus>(STATUS_STORAGE_KEY))
    setMyPoints(readStored<number>(POINTS_STORAGE_KEY))
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  const scores = useMemo(() => new Map(projects.map(p => [p.slug, scoreProject(p)])), [projects])
  const categories = useMemo(() => [...new Set(projects.map(p => p.category))].sort(), [projects])
  // A stored status from an older version of the page may no longer exist.
  const statusOf = (p: Project) => (STATUS_ORDER.includes(overrides[p.slug]) ? overrides[p.slug] : p.status)
  const countOf = (t: Tab) => (t === 'all' ? projects.length : projects.filter(p => statusOf(p) === t).length)

  const visible = projects
    .filter(p => tab === 'all' || statusOf(p) === tab)
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
        default: return scores.get(b.slug)!.total - scores.get(a.slug)!.total || a.name.localeCompare(b.name)
      }
    })

  const controlStyle = { backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }
  const muted = { color: 'var(--muted)' }

  const airdropText = (p: Project) => {
    const pool = airdropPoolUsdM(p)
    if (pool === null) return null
    const perPoint = usdPerPoint(p)
    const mine = myPoints[p.slug]
    if (perPoint !== null && mine) return `受取見込み ${formatUsd(perPoint * mine)}`
    return `エアドロ規模 ${formatUsdM(pool)}`
  }

  const tabButton = (t: Tab) => {
    const selected = tab === t
    return (
      <button key={t} type="button" role="tab" aria-selected={selected} onClick={() => setTab(t)}
        className="flex-1 lg:flex-none px-2 lg:px-4 py-2.5 text-xs lg:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
        style={{ color: selected ? 'var(--accent)' : 'var(--muted)', backgroundColor: selected ? 'var(--accent-subtle)' : 'transparent' }}>
        {t === 'all' ? 'すべて' : STATUS_LABEL[t]}
        <span className="ml-1 font-mono font-normal">{countOf(t)}</span>
      </button>
    )
  }

  return (
    <div>
      {/* Tabs sit above the list on desktop and stay fixed at the bottom on phones. */}
      <div role="tablist" aria-label="ステータス"
        className="fixed bottom-0 inset-x-0 z-40 flex gap-1 px-2 py-2 border-t lg:static lg:inline-flex lg:p-1 lg:mb-5 lg:rounded-xl lg:border"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        {TABS.map(tabButton)}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-5">
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
          <option value="score">スコア順</option>
          <option value="tge">TGEが近い順</option>
          <option value="funding">調達額が多い順</option>
          <option value="pool">エアドロ規模が大きい順</option>
          <option value="followers">Xフォロワーが多い順</option>
        </select>
      </div>

      {visible.length === 0 && <p className="text-sm py-12 text-center" style={muted}>条件に合うプロジェクトがありません。</p>}

      <ol className="flex flex-col gap-2.5">
        {visible.map((p, i) => {
          const score = scores.get(p.slug)!
          const airdrop = airdropText(p)
          const facts = [
            `TGE ${tgeText(p)}`,
            `調達 ${formatFunding(p.funding.totalUsdM)}`,
            p.audience?.xFollowers ? `X ${formatFollowers(p.audience.xFollowers)}` : null,
            `${countryFlag(p.team.countryCode)} ${p.team.base}`.trim(),
            airdrop,
          ].filter(Boolean)

          return (
            <li key={p.slug} className="relative rounded-2xl border transition-colors hover:border-[var(--accent)]"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
              <div className="flex items-center gap-3 px-3 sm:px-5 py-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono flex-shrink-0"
                  style={i < 3
                    ? { backgroundColor: ['var(--chart-gold)', 'var(--chart-cash)', 'var(--chart-real-estate)'][i], color: 'var(--background)' }
                    : { backgroundColor: 'var(--surface-2)', color: 'var(--muted)' }}>
                  {i + 1}
                </span>
                <ProjectLogo project={p} />
                <div className="min-w-0 flex-1">
                  {/* The stretched link makes the whole card clickable; the referral button sits above it. */}
                  <Link href={`/tracker/${p.slug}/`} className="font-bold text-base sm:text-lg leading-tight after:absolute after:inset-0 after:rounded-2xl"
                    style={{ color: 'var(--foreground)' }}>
                    {p.name}
                  </Link>
                  <p className="text-xs truncate" style={muted}>
                    {p.category} · {p.chain}
                    {overrides[p.slug] && STATUS_ORDER.includes(overrides[p.slug]) && `（ara: ${STATUS_LABEL[p.status]}）`}
                  </p>
                </div>
                <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums" style={{ color: scoreColor(score.total) }}
                  aria-label={`スコア ${score.total}`}>
                  {score.total}
                </span>
                <PhaseBadge phase={p.phase} />
                <span className="hidden sm:flex items-baseline gap-3 text-sm font-mono tabular-nums">
                  <span><span className="text-xs mr-1" style={muted}>質</span><b>{score.quality}</b></span>
                  <span><span className="text-xs mr-1" style={muted}>酬</span><b>{score.reward}</b></span>
                </span>
                {p.links.referral && (
                  <a href={p.links.referral} target="_blank" rel="sponsored nofollow noopener"
                    className="relative z-10 hidden md:inline-block text-xs font-semibold px-3 py-2 rounded-lg"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}>
                    始める
                  </a>
                )}
              </div>
              <p className="px-3 sm:px-5 pb-3 -mt-1 text-xs flex flex-wrap gap-x-4 gap-y-0.5" style={muted}>
                <span className="sm:hidden font-mono">質 {score.quality} · 酬 {score.reward}</span>
                {facts.map(f => <span key={f}>{f}</span>)}
              </p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
