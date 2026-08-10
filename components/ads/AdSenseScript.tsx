'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

function isContentRoute(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  return segments.length === 2 && segments[0] === 'blog'
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
