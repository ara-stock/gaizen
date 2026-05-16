'use client'

import type { Asset, AssetCategory } from '@/types/portfolio'

export const CATEGORY_LABELS: Record<string, string> = {
  'jp-stock': '日本株',
  'us-stock': '米国株',
  'us-stock-2': '米国株',
  'mutual-fund': '投資信託',
  'crypto': '仮想通貨',
  'gold': '金',
  'cash': '現金',
  'real-estate': '不動産',
}

export const CATEGORY_COLORS: Record<string, string> = {
  'jp-stock': '#00c97a',
  'us-stock': '#00a862',
  'us-stock-2': '#009955',
  'mutual-fund': '#33d994',
  'crypto': '#4ade80',
  'gold': '#86efac',
  'cash': '#3d5e4a',
  'real-estate': '#6ee7b7',
}

export default function AllocationChart({ assets }: { assets: Asset[] }) {
  const total = assets.reduce((sum, a) => sum + a.allocation, 0)
  const radius = 48
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <div className="relative flex-shrink-0">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--surface-2)" strokeWidth="16" />
          {assets.map((asset, i) => {
            const dashLength = (asset.allocation / total) * circumference
            const currentOffset = offset
            offset += dashLength
            return (
              <circle key={i} cx="60" cy="60" r={radius} fill="none"
                stroke={CATEGORY_COLORS[asset.category] ?? '#00c97a'}
                strokeWidth="16"
                strokeDasharray={`${dashLength - 1.5} ${circumference - dashLength + 1.5}`}
                strokeDashoffset={-currentOffset + circumference * 0.25}
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold tabular-nums" style={{ color: 'var(--foreground)' }}>{total}%</span>
          <span className="text-xs" style={{ color: 'var(--muted)', fontSize: '10px' }}>allocated</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {assets.map(asset => {
          const color = CATEGORY_COLORS[asset.category] ?? '#00c97a'
          const pct = asset.allocation / total
          return (
            <div key={asset.name} className="flex items-center gap-2 min-w-0">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              <span className="text-sm font-medium w-20 flex-shrink-0" style={{ color: 'var(--foreground)' }}>{asset.name}</span>
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-2)' }}>
                <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, backgroundColor: color }} />
              </div>
              <span className="text-xs font-semibold tabular-nums w-8 text-right flex-shrink-0" style={{ color }}>{asset.allocation}%</span>
              <span className="text-xs hidden sm:block w-28 flex-shrink-0 ml-1 truncate" style={{ color: 'var(--muted)' }}>{asset.note ?? ''}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
