import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Real Estate Yield Calculator',
  description: 'Calculate gross yield, net yield, monthly cash flow, and cash-on-cash return from rent, expenses, financing, and purchase assumptions.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/tools/realestate/',
    languages: {
      ja: 'https://gaizen.xyz/tools/realestate/',
      en: 'https://gaizen.xyz/en/tools/realestate/',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
