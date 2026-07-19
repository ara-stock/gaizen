import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rolling Sharpe Ratio Chart',
  description: 'Compare rolling 12-month Sharpe ratios for the S&P 500, Japanese and US stocks, and Bitcoin using monthly price data.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/tools/sharpe/',
    languages: {
      ja: 'https://gaizen.xyz/tools/sharpe/',
      en: 'https://gaizen.xyz/en/tools/sharpe/',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
