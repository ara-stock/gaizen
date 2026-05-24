import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LanguageDetector from '@/components/layout/LanguageDetector'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const SITE_URL = 'https://gaizen.xyz'
const SITE_NAME = 'GAIZEN FINANCE'
const SITE_DESCRIPTION = 'Focused on long-term, diversified growth — bridging traditional markets and crypto.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['長期投資', '分散投資', 'BTC', 'S&P500', 'インデックス投資', '資産運用', '仮想通貨', '不動産投資'],
  authors: [{ name: 'GAIZEN FINANCE' }],
  creator: 'GAIZEN FINANCE',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: SITE_URL,
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
    languages: { 'ja': SITE_URL, 'en': `${SITE_URL}/en` },
    types: { 'application/rss+xml': `${SITE_URL}/feed.xml` },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${inter.variable} h-full`} suppressHydrationWarning>
      {/* Prevent flash: apply saved theme before paint */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}else if(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark');}}catch(e){}})()` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          inLanguage: ['ja', 'en'],
          potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/blog?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
        }) }} />
      </head>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        {process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID &&
          process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID !== 'ca-pub-XXXXXXXXXXXXXXXX' && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
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
