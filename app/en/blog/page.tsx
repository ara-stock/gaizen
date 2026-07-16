import { getAllPosts } from '@/lib/posts'
import EditorialLibrary from '@/components/blog/EditorialLibrary'
import ReadingGuide from '@/components/blog/ReadingGuide'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical articles on NISA, index funds, asset tracking, and portfolio design for long-term investors.',
  openGraph: {
    title: 'Investment Blog | GAIZEN FINANCE',
    description: 'Practical articles on NISA, index funds, asset tracking, and portfolio design for long-term investors.',
    url: 'https://gaizen.xyz/en/blog/',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://gaizen.xyz/en/blog/',
    languages: { 'ja': 'https://gaizen.xyz/blog/' },
  },
}

export default function EnBlogPage() {
  const posts = getAllPosts('en')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>BLOG</p>
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>
          Learn long-term investing in order.
        </h1>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
          Practical articles on NISA, index funds, and asset tracking, grounded in the author&apos;s mistakes and ongoing investing routine.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs" style={{ color: 'var(--muted)' }}>
          <span>Written by individual investor ara</span>
          <Link href="/en/editorial-policy/" className="transition-colors hover:text-green-500">Read our editorial policy →</Link>
        </div>
      </div>

      <ReadingGuide locale="en" />
      {posts.length > 0 ? <EditorialLibrary posts={posts} locale="en" /> : (
        <div className="py-24 text-center">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>No articles yet. Check back soon.</p>
        </div>
      )}
    </div>
  )
}
