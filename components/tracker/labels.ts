import type { Activity, Phase, Project, ProjectStatus, TgeSourceType } from '@/types/project'

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

export const ACTIVITY_ORDER: Activity[] = ['perps', 'defi', 'staking', 'points', 'hold']

export const ACTIVITY_LABEL: Record<Activity, string> = {
  perps: 'Perp取引',
  defi: 'DeFi（レンディング）',
  staking: 'Staking',
  points: 'ポイント活動',
  hold: 'ホールド',
}

export const ACTIVITY_COLOR: Record<Activity, string> = {
  perps: 'var(--chart-us)',
  defi: 'var(--chart-jp)',
  staking: 'var(--chart-crypto)',
  points: 'var(--chart-us-2)',
  hold: 'var(--chart-gold)',
}

export const PHASE_LABEL: Record<Phase, string> = {
  early: '序盤',
  mid: '中盤',
  late: '終盤',
  ended: '終了',
  none: '未発表',
}

/** How many of the three progress segments are filled. */
export const PHASE_STEP: Record<Phase, number> = { early: 1, mid: 2, late: 3, ended: 3, none: 0 }

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
  const { sharePct, fdvUsdM, poolUsdM } = p.airdrop ?? {}
  if (poolUsdM) return poolUsdM
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

/** The author treats FDV ÷ annual revenue at or below this as cheap. */
export const CHEAP_MULTIPLE = 5

export interface Multiples {
  /** FDV ÷ trailing 365-day revenue. */
  trailing: number | null
  /** FDV ÷ (last 90 days × 4). */
  runRate: number | null
  /** FDV ÷ (holders' revenue, last 90 days × 4). */
  holdersRunRate: number | null
}

export function fdvMultiples(p: Project): Multiples | null {
  const v = p.valuation
  if (!v?.fdvUsdM) return null
  const ratio = (annual?: number | null) => (annual && annual > 0 ? v.fdvUsdM! / annual : null)
  return {
    trailing: ratio(v.revenue365UsdM),
    runRate: ratio((v.revenue90UsdM ?? 0) * 4),
    holdersRunRate: ratio((v.holders90UsdM ?? 0) * 4),
  }
}

export function formatMultiple(value: number | null): string {
  if (value === null) return '—'
  return `${value >= 100 ? Math.round(value) : value.toFixed(1)}倍`
}
