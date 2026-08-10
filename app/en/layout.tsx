import type { Metadata } from 'next'

const DESCRIPTION = 'Long-term investing guidance and research grounded in first-hand experience and primary sources.'

export const metadata: Metadata = {
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'GAIZEN FINANCE',
    title: 'GAIZEN FINANCE',
    description: DESCRIPTION,
    images: [{ url: 'https://gaizen.xyz/og-image.png', width: 1200, height: 630, alt: 'GAIZEN FINANCE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GAIZEN FINANCE',
    description: DESCRIPTION,
    images: ['https://gaizen.xyz/og-image.png'],
  },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
