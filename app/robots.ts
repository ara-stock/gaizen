export const dynamic = 'force-static'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: [
      'https://gaizen.xyz/sitemap.xml',
      'https://gaizen.xyz/sitemap-index.xml',
    ],
  }
}
