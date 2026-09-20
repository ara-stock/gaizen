import type { Phase, Project, ProjectStatus, TgeSourceType } from '@/types/project'

export const STATUS_ORDER: ProjectStatus[] = ['active', 'waiting', 'watching', 'claimed', 'dropped']

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: '継続中',
  waiting: '受取待ち',
  watching: '様子見',
  claimed: '受領済',
  dropped: '撤退',
}

export const STATUS_COLOR: Record<ProjectStatus, string> = {
  active: 'var(--chart-jp)',
  waiting: 'var(--chart-crypto)',
  watching: 'var(--chart-gold)',
  claimed: 'var(--chart-us)',
  dropped: 'var(--chart-cash)',
}

export const PHASE_LABEL: Record<Phase, string> = {
  early: '序盤',
  mid: '中盤',
  late: '終盤',
  ended: '終了',
  none: '未発表',
}

/** How many of the three progress segments are filled. */
export const PHASE_STEP: Record<Phase, number> = { early: 1, mid: 2, late: 3, ended: 0, none: 0 }

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
