import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FIRE Asset Growth Simulator',
  description: 'Estimate asset growth and the time to a FIRE target from current assets, monthly contributions, and an assumed annual return.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/tools/fire/',
    languages: {
      ja: 'https://gaizen.xyz/tools/fire/',
      en: 'https://gaizen.xyz/en/tools/fire/',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
