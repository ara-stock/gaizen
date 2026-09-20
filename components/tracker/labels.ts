import type { Phase, Project, ProjectStatus, TgeSourceType } from '@/types/project'

export const STATUS_ORDER: ProjectStatus[] = ['active', 'waiting', 'watching', 'done']

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: '継続中',
  waiting: '受取待ち',
  watching: '様子見',
  done: '終了',
}

export const STATUS_COLOR: Record<ProjectStatus, string> = {
  active: 'var(--chart-jp)',
  waiting: 'var(--chart-crypto)',
  watching: 'var(--chart-gold)',
  done: 'var(--chart-cash)',
}

export const PHASE_LABEL: Record<Phase, string> = {
  early: '序盤',
  mid: '中盤',
  late: '終盤',
  ended: '終了',
  none: '未発表',
}

/** Early is the best time to join, late the worst — the badge colour follows that. */
export const PHASE_BADGE: Record<Phase, { mark: string; color: string }> = {
  early: { mark: '○', color: 'var(--chart-jp)' },
  mid: { mark: '△', color: 'var(--chart-gold)' },
  late: { mark: '×', color: 'var(--chart-real-estate)' },
  ended: { mark: '–', color: 'var(--chart-cash)' },
  none: { mark: '–', color: 'var(--chart-cash)' },
}

export const TGE_SOURCE_LABEL: Record<TgeSourceType, string> = {
  official: '公式',
  media: '報道',
  rumor: '噂',
  none: '未発表',
}

export const POINTS_STORAGE_KEY = 'gaizen-tracker-points'
export const STATUS_STORAGE_KEY = 'gaizen-tracker-status'

export function formatUsdM(valueUsdM: number): string {
  if (valueUsdM >= 1000) return `$${(valueUsdM / 1000).toFixed(valueUsdM >= 10000 ? 0 : 1)}B`
  return `$${valueUsdM >= 100 ? Math.round(valueUsdM) : Number(valueUsdM.toFixed(1))}M`
}

export function formatFunding(totalUsdM: number | null): string {
  if (totalUsdM === null) return '非開示'
  if (totalUsdM === 0) return 'なし'
  return formatUsdM(totalUsdM)
}

export function formatUsd(value: number): string {
  return `$${Math.round(value).toLocaleString('en-US')}`
}

export function formatFollowers(count: number): string {
  if (count >= 10000) return `${Number((count / 10000).toFixed(1))}万`
  return count.toLocaleString('en-US')
}

/** Estimated airdrop pool in USD millions: FDV scenario × airdrop share. */
export function airdropPoolUsdM(p: Project): number | null {
  const { sharePct, fdvUsdM } = p.airdrop ?? {}
  if (!sharePct || !fdvUsdM) return null
  return (fdvUsdM * sharePct) / 100
}

/** Estimated USD value of one point, when the total issued is published. */
export function usdPerPoint(p: Project): number | null {
  const pool = airdropPoolUsdM(p)
  const total = p.airdrop?.totalPoints
  if (pool === null || !total) return null
  return (pool * 1_000_000) / total
}

export function countryFlag(code?: string): string {
  if (!code || code.length !== 2) return ''
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1f1e6 + c.charCodeAt(0) - 65))
}

export function readStored<T>(key: string): Record<string, T> {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '{}') as Record<string, T>
  } catch {
    return {}
  }
}

export function writeStored<T>(key: string, value: Record<string, T>) {
  try {
    if (Object.keys(value).length === 0) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // The page keeps working for this visit when browser storage is unavailable.
  }
}

/** 0..1 position of `value` between `min` and `max` on a log scale. */
function logScale(value: number, min: number, max: number): number {
  if (value <= min) return 0
  return Math.min(1, Math.log10(value / min) / Math.log10(max / min))
}

export interface Score {
  quality: number
  reward: number
  total: number
}

/**
 * Mechanical score from published data. 質 (quality, 0–50) = funding + X audience + team disclosure.
 * 酬 (reward, 0–50) = whether a programme runs + how early it is + estimated airdrop pool.
 * The formula is described on the home page; `scoreOverride` wins when the author sets it.
 */
export function scoreProject(p: Project): Score {
  const { totalUsdM } = p.funding
  // Self-funded by choice (0) is not a weakness; undisclosed (null) is scored low.
  const funding = totalUsdM === null ? 5 : totalUsdM === 0 ? 12 : 5 + 20 * logScale(totalUsdM, 1, 100)
  const audience = 15 * logScale(p.audience?.xFollowers ?? 0, 5_000, 500_000)
  const team = (p.team.doxxed ? 6 : 0) + (p.team.baseKind !== 'unverified' ? 4 : 0)

  const programme = p.points.exists ? 15 : p.token.launched ? 0 : 8
  const timing = { early: 15, mid: 10, late: 5, none: 6, ended: 0 }[p.phase]
  const pool = airdropPoolUsdM(p)
  const size = pool !== null ? 20 * logScale(pool, 10, 500) : p.token.launched ? (p.points.exists ? 6 : 0) : 8

  const quality = Math.round(p.scoreOverride?.quality ?? Math.min(50, funding + audience + team))
  const reward = Math.round(p.scoreOverride?.reward ?? Math.min(50, programme + timing + size))
  return { quality, reward, total: quality + reward }
}

export function scoreColor(total: number): string {
  if (total >= 75) return 'var(--chart-jp)'
  if (total >= 55) return 'var(--chart-us-2)'
  if (total >= 35) return 'var(--chart-gold)'
  return 'var(--muted)'
}
