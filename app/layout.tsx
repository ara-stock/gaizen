import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LanguageDetector from '@/components/layout/LanguageDetector'
import AdSenseScript from '@/components/ads/AdSenseScript'
import { serializeJsonLd } from '@/lib/json-ld'

const SITE_URL = 'https://gaizen.xyz'
const SITE_NAME = 'GAIZEN FINANCE'
const SITE_DESCRIPTION = '投資の始め方から企業分析まで、個人投資家の実体験と一次情報から学ぶ長期投資メディア。'
const ADSENSE_ACCOUNT = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['長期投資', '企業分析', 'NISA', '投資信託', '個別株', '資産管理', '暗号資産'],
  authors: [{ name: 'ara', url: `${SITE_URL}/about/` }],
  creator: 'ara',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    types: { 'application/rss+xml': `${SITE_URL}/feed.xml` },
  },
  ...(ADSENSE_ACCOUNT && ADSENSE_ACCOUNT !== 'ca-pub-XXXXXXXXXXXXXXXX' && {
    other: { 'google-adsense-account': ADSENSE_ACCOUNT },
  }),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full" suppressHydrationWarning>
      {/* Prevent flash: apply saved theme before paint */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}else if(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark');}}catch(e){}})()` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          inLanguage: ['ja', 'en'],
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/icon.svg`,
            },
            founder: {
              '@type': 'Person',
              name: 'ara',
              url: `${SITE_URL}/about/`,
              sameAs: ['https://x.com/ara_stock'],
            },
          },
        }) }} />
      </head>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <AdSenseScript />
        <LanguageDetector />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
