export type ProjectStatus = 'active' | 'watching' | 'claimed' | 'dropped'

export type TgeSourceType = 'official' | 'media' | 'rumor' | 'none'

/** 1 (low) – 5 (high). Subjective rating by the author, always shown with a note. */
export type Rating = 1 | 2 | 3 | 4 | 5

export interface ProjectSource {
  title: string
  url: string
  date?: string
}

export interface Project {
  slug: string
  name: string
  category: string
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
    expectation?: Rating
    expectationNote?: string
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
    trust?: Rating
    trustNote?: string
  }
  flags: string[]
  links: {
    site: string
    x?: string
    referral?: string
    /** Related article on this site, e.g. "/blog/jupiter-defi-yield/". */
    article?: string
  }
  sources: ProjectSource[]
  updatedAt: string
}

export interface ProjectsData {
  updatedAt: string
  projects: Project[]
}
