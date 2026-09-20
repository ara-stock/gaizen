import type { ProjectStatus, TgeSourceType } from '@/types/project'

export type Locale = 'ja' | 'en'

export const STATUS_ORDER: ProjectStatus[] = ['active', 'watching', 'claimed', 'dropped']

export const STATUS_LABEL: Record<Locale, Record<ProjectStatus, string>> = {
  ja: { active: '取組中', watching: '様子見', claimed: 'TGE済・受領', dropped: '撤退' },
  en: { active: 'Active', watching: 'Watching', claimed: 'TGE done', dropped: 'Dropped' },
}

export const STATUS_COLOR: Record<ProjectStatus, string> = {
  active: 'var(--chart-jp)',
  watching: 'var(--chart-gold)',
  claimed: 'var(--chart-us)',
  dropped: 'var(--chart-cash)',
}

export const TGE_SOURCE_LABEL: Record<Locale, Record<TgeSourceType, string>> = {
  ja: { official: '公式', media: '報道', rumor: '噂', none: '未発表' },
  en: { official: 'Official', media: 'Media', rumor: 'Rumor', none: 'Unannounced' },
}

export const T = {
  ja: {
    all: 'すべて',
    search: 'プロジェクト名・VC・国で検索',
    category: 'カテゴリ',
    sort: '並び替え',
    sortStatus: 'ステータス順',
    sortTge: 'TGEが近い順',
    sortFunding: '調達額が多い順',
    sortPoints: 'ポイント期待値順',
    sortTrust: 'チーム信頼度順',
    project: 'プロジェクト',
    status: 'ステータス',
    tge: 'TGE',
    points: 'ポイント期待値',
    trust: 'チーム信頼度',
    funding: 'VC調達額',
    base: '拠点・トップ',
    undisclosed: '非開示',
    unrated: '未評価',
    launched: '上場済',
    noPoints: 'ポイントなし',
    detail: '詳細',
    start: '始める',
    authorStatus: 'araの状況',
    myStatusHint: 'ステータスは自分用に変更できます。変更内容はこのブラウザにだけ保存され、外部には送信されません。',
    reset: '自分用の変更をリセット',
    empty: '条件に合うプロジェクトがありません。',
    anonymous: '匿名チーム',
  },
  en: {
    all: 'All',
    search: 'Search by project, investor or country',
    category: 'Category',
    sort: 'Sort',
    sortStatus: 'By status',
    sortTge: 'Nearest TGE',
    sortFunding: 'Largest funding',
    sortPoints: 'Points expectation',
    sortTrust: 'Team trust',
    project: 'Project',
    status: 'Status',
    tge: 'TGE',
    points: 'Points outlook',
    trust: 'Team trust',
    funding: 'VC funding',
    base: 'Base / lead',
    undisclosed: 'Undisclosed',
    unrated: 'Unrated',
    launched: 'Live',
    noPoints: 'No points',
    detail: 'Details',
    start: 'Start',
    authorStatus: "ara's status",
    myStatusHint: 'You can change each status for yourself. Changes stay in this browser only and are never sent anywhere.',
    reset: 'Reset my changes',
    empty: 'No projects match these filters.',
    anonymous: 'Anonymous team',
  },
} as const

export function formatFunding(totalUsdM: number | null, locale: Locale): string {
  if (totalUsdM === null) return T[locale].undisclosed
  return `$${totalUsdM >= 100 ? Math.round(totalUsdM) : totalUsdM}M`
}

export function countryFlag(code?: string): string {
  if (!code || code.length !== 2) return ''
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1f1e6 + c.charCodeAt(0) - 65))
}
