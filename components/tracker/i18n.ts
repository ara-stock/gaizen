import type { Activity, Phase, ProjectStatus, TgeSourceType } from '@/types/project'

export type Locale = 'ja' | 'en'

/** Home of the Airdrop list for a locale; with a slug, that project's page. */
export function airdropHref(locale: Locale, slug?: string): string {
  const root = locale === 'en' ? '/en/' : '/'
  return slug ? `${root}tracker/${slug}/` : root
}

const ja = {
  status: { active: '継続中', waiting: '受取待ち', watching: '様子見', done: '終了' } as Record<ProjectStatus, string>,
  activity: { perps: 'Perp取引', defi: 'DeFi（レンディング）', staking: 'Staking', points: 'ポイント活動', hold: 'ホールド' } as Record<Activity, string>,
  phase: { early: '序盤', mid: '中盤', late: '終盤', ended: '終了', none: '未発表' } as Record<Phase, string>,
  tgeSource: { official: '公式', media: '報道', rumor: '噂', none: '未発表' } as Record<TgeSourceType, string>,
  board: {
    all: 'すべて',
    statusTabs: 'ステータス',
    search: 'プロジェクト名・VC・国で検索',
    sort: '並び替え',
    sortOptions: { focus: 'おすすめ順', phase: 'フェーズが早い順', tge: 'TGEが近い順', funding: '調達額が多い順', followers: 'Xフォロワーが多い順' },
    empty: '条件に合うプロジェクトがありません。',
    project: 'プロジェクト',
    phase: 'フェーズ',
    tge: 'TGE',
    funding: 'VC調達額',
    followers: 'Xフォロワー',
    base: '拠点',
    token: 'トークン',
    deposit: '預ける資産',
    yield: '利回り・報酬',
    memo: 'メモ',
    fdv: 'FDV',
    fdvRevenue: 'FDV÷収益',
    recent: '直近',
    atEntry: '取得時',
    start: '始める',
    inviteOnly: '招待制',
    main: '主力',
    sideOnly: 'おすすめ外',
  },
  listed: '上場済',
  undisclosed: '非開示',
  none: 'なし',
  estimate: {
    unavailable: '配分比率または評価額の手がかりがなく、現時点では試算できません。',
    estimated: '推定・仮置きの数値を含みます',
    fdv: 'FDVの想定',
    share: 'エアドロップ配分',
    pool: '配布総額の見込み',
    perPoint: '1ポイントあたり',
    myPoints: '自分の保有ポイント',
    payout: '受取見込み',
    basis: '根拠',
    issued: (n: string, asOf?: string) => `（発行済みポイント ${n}、${asOf}時点）`,
    footnote: '配布総額 = FDVの想定 × エアドロップ配分。1ポイントの価値は現時点の発行済みポイントで割っているため、今後ポイントが増えるほど下がります。配分方法・ロック・シビル判定によって実際の受取額は大きく変わります。入力したポイントはこのブラウザにだけ保存されます。',
  },
  copy: 'コピー',
  copied: 'コピーしました',
  myStatus: '自分のステータス',
}

export type Dict = typeof ja

const en: Dict = {
  status: { active: 'Active', waiting: 'Awaiting payout', watching: 'Watching', done: 'Ended' },
  activity: { perps: 'Perp trading', defi: 'DeFi (lending)', staking: 'Staking', points: 'Points', hold: 'Holding' },
  phase: { early: 'Early', mid: 'Mid', late: 'Late', ended: 'Ended', none: 'TBA' },
  tgeSource: { official: 'Official', media: 'Press', rumor: 'Rumor', none: 'Not announced' },
  board: {
    all: 'All',
    statusTabs: 'Status',
    search: 'Search by project, VC or country',
    sort: 'Sort',
    sortOptions: { focus: 'Recommended', phase: 'Earliest phase', tge: 'Nearest TGE', funding: 'Most funding', followers: 'Most X followers' },
    empty: 'No projects match.',
    project: 'Project',
    phase: 'Phase',
    tge: 'TGE',
    funding: 'VC funding',
    followers: 'X followers',
    base: 'Base',
    token: 'Token',
    deposit: 'Deposit',
    yield: 'Yield / rewards',
    memo: 'Note',
    fdv: 'FDV',
    fdvRevenue: 'FDV ÷ revenue',
    recent: 'Recent',
    atEntry: 'At cost',
    start: 'Start',
    inviteOnly: 'Invite',
    main: 'Main',
    sideOnly: 'Side only',
  },
  listed: 'Listed',
  undisclosed: 'Undisclosed',
  none: 'None',
  estimate: {
    unavailable: 'There is no basis for the allocation or valuation yet, so no estimate is possible.',
    estimated: 'Includes estimates and placeholders',
    fdv: 'FDV assumption',
    share: 'Airdrop share',
    pool: 'Expected pool',
    perPoint: 'Per point',
    myPoints: 'Your points',
    payout: 'Estimated payout',
    basis: 'Basis',
    issued: (n: string, asOf?: string) => ` (${n} points issued, as of ${asOf})`,
    footnote: 'Pool = FDV assumption × airdrop share. The value per point divides by the points issued so far, so it falls as more points are issued. The actual payout varies widely with the distribution method, locks and sybil filtering. The points you enter are saved only in this browser.',
  },
  copy: 'Copy',
  copied: 'Copied',
  myStatus: 'Your status',
}

export function dict(locale: Locale): Dict {
  return locale === 'en' ? en : ja
}
