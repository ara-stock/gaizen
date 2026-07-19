import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio Allocation Simulator',
  description: 'Compare hypothetical return, risk, and Sharpe ratio scenarios for allocations across Japanese stocks, US stocks, REITs, crypto, and cash.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/tools/allocation/',
    languages: {
      ja: 'https://gaizen.xyz/tools/allocation/',
      en: 'https://gaizen.xyz/en/tools/allocation/',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
