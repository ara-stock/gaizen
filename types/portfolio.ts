export interface Asset {
  name: string
  category: string
  allocation: number
  note?: string
}

export type AssetCategory =
  | 'jp-stock'
  | 'us-stock'
  | 'us-stock-2'
  | 'mutual-fund'
  | 'crypto'
  | 'gold'
  | 'cash'
  | 'real-estate'

export interface HoldingItem {
  name: string
  ticker: string
  note?: string
}

export interface HoldingGroup {
  group: string
  region: 'JP' | 'US' | 'Crypto' | 'DeFi'
  items: HoldingItem[]
}

export interface MonthlyNote {
  month: string
  note: string
}

export interface PortfolioData {
  updatedAt: string
  totalAssets?: string
  holdingPolicy: string[]
  assets: Asset[]
  holdings: HoldingGroup[]
  monthlyNotes: MonthlyNote[]
}
