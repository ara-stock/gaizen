'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

const CONTENT_ROUTES = [
  '/blog',
  '/en/blog',
  '/about',
  '/en/about',
  '/portfolio',
  '/en/portfolio',
  '/thesis',
  '/en/thesis',
]

function isContentRoute(pathname: string) {
  if (pathname === '/' || pathname === '/en') return true

  return CONTENT_ROUTES.some(route => (
    pathname === route || pathname.startsWith(`${route}/`)
  ))
}

export default function AdSenseScript() {
  const pathname = usePathname()
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

  if (
    !publisherId ||
    publisherId === 'ca-pub-XXXXXXXXXXXXXXXX' ||
    !isContentRoute(pathname)
  ) {
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
