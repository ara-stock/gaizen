export type ProjectStatus = 'active' | 'waiting' | 'watching' | 'done'

/** How the author takes part: trading perps, lending in DeFi, staking the token, farming points, or just holding. */
export type Activity = 'perps' | 'defi' | 'staking' | 'points' | 'hold'

/** Where the points / airdrop campaign stands. */
export type Phase = 'early' | 'mid' | 'late' | 'ended' | 'none'

export type TgeSourceType = 'official' | 'media' | 'rumor' | 'none'

export interface ProjectSource {
  title: string
  url: string
  date?: string
}

export interface Project {
  slug: string
  name: string
  /** Path under /public, e.g. "/logos/extended.svg". */
  logo?: string
  category: string
  activity: Activity
  /** 1 = main focus, 2 = normal, 3 = not recommended (listed last and dimmed). */
  priority: 1 | 2 | 3
  /** Shown instead of phase and airdrop size for DeFi lending and staking positions. `token` is the asset put in. */
  staking?: { token: string; reward: string; apy?: string; note?: string }
  chain: string
  /** Author's own engagement status. Visitors can override it locally in the browser. */
  status: ProjectStatus
  statusNote?: string
  token: {
    launched: boolean
    ticker?: string
    tgeDate?: string
    /** Free text such as "2026 Q4". Empty when nothing is announced. */
    tgeExpectation?: string
    /** Machine-sortable version of tgeExpectation, "YYYY-MM". Omit when unknown. */
    tgeTarget?: string
    tgeSourceType: TgeSourceType
  }
  points: {
    exists: boolean
    name?: string
    status?: string
    communityAllocation?: string
  }
  phase: Phase
  phaseNote?: string
  /** Inputs for the airdrop estimate. Every number needs a source in `basis`; omit what is unknown. */
  airdrop?: {
    /** Share of total supply expected to go to the airdrop, in percent. */
    sharePct?: number
    /** Fully diluted valuation scenario in USD millions. */
    fdvUsdM?: number
    /** Pool size in USD millions when it is known directly; takes precedence over sharePct × fdvUsdM. */
    poolUsdM?: number
    /** True when any input is the author's placeholder rather than a published figure. */
    estimated?: boolean
    /** Total points issued so far, used for the per-point value. */
    totalPoints?: number
    totalPointsAsOf?: string
    basis: string
  }
  audience?: {
    xHandle?: string
    xFollowers?: number
    asOf?: string
    /** Published user metric, e.g. "累計トレーダー 12万人". */
    users?: string
    usersSource?: string
  }
  funding: {
    /** Disclosed total in USD millions. null = undisclosed / unverified. */
    totalUsdM: number | null
    rounds?: string
    investors: string[]
  }
  team: {
    founders: string[]
    doxxed: boolean
    /** ISO 3166-1 alpha-2 code, used for the flag. */
    countryCode?: string
    base: string
    baseKind: 'company HQ' | 'founder base' | 'unverified'
    background?: string
  }
  /** Filled by scripts/fetch-valuation.py. All amounts in USD millions. */
  valuation?: {
    coingeckoId: string
    defillamaSlug: string
    note?: string
    /** Author's average purchase price, used to show the multiple at cost. */
    entryPriceUsd?: number
    priceUsd?: number
    marketCapUsdM?: number
    fdvUsdM?: number
    revenue365UsdM?: number | null
    revenue90UsdM?: number | null
    /** Revenue passed to holders through buybacks, burns or distributions. */
    holders365UsdM?: number | null
    holders90UsdM?: number | null
    asOf?: string
  }
  flags: string[]
  links: {
    site: string
    referral?: string
    /** One-time invitation codes, for venues that have no referral URL. */
    inviteCodes?: string[]
    inviteNote?: string
  }
  sources: ProjectSource[]
  updatedAt: string
}

export interface ProjectsData {
  updatedAt: string
  projects: Project[]
}
