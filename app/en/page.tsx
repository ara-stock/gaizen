import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { getPortfolioData } from '@/lib/portfolio'
import ArticleCard from '@/components/blog/ArticleCard'
import { CATEGORY_COLORS } from '@/components/portfolio/AllocationChart'
import type { Metadata } from 'next'
import ReadingGuide from '@/components/blog/ReadingGuide'

export const metadata: Metadata = {
  title: {
    absolute: 'GAIZEN FINANCE',
  },
  description: 'High-probability investing through long-term accumulation. Building wealth with index funds and selective individual stocks.',
  openGraph: {
    title: 'GAIZEN FINANCE',
    description: 'High-probability investing through long-term accumulation. Building wealth with index funds and selective individual stocks.',
    url: 'https://gaizen.xyz/en/',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://gaizen.xyz/en/',
    languages: { 'ja': 'https://gaizen.xyz/' },
  },
}

export default function EnHomePage() {
  const allPosts = getAllPosts('en')
  const latestPosts = allPosts.slice(0, 3)
  const featuredPosts = allPosts.filter(p => p.frontmatter.featured).slice(0, 2)
  const portfolio = getPortfolioData()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Hero */}
      <section className="py-24 sm:py-32 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-2xl">
          <p className="text-xs tracking-widest mb-6 font-semibold" style={{ color: 'var(--accent)' }}>
            GAIZEN FINANCE
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight" style={{ color: 'var(--foreground)' }}>
            Invest. Grow. Breathe.
          </h1>
          <p className="text-base sm:text-lg leading-relaxed mb-10" style={{ color: 'var(--muted)' }}>
            High-probability investing through long-term accumulation.<br className="hidden sm:block" />
            Not predicting markets — making consistently sound choices.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/en/portfolio"
              className="px-5 py-2.5 text-sm font-semibold rounded-md transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--accent)', color: '#080c0a' }}
            >
              View Portfolio
            </Link>
            <Link href="/en/blog"
              className="px-5 py-2.5 text-sm font-medium rounded-md border transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Core Asset', value: 'Equities' },
            { label: 'Time Horizon', value: '5+ Years' },
            { label: 'Strategy', value: 'Index + Individual' },
            { label: 'Goal', value: 'Compounding Wealth' },
          ].map(({ label, value }) => (
            <div key={label} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-xs mb-1.5" style={{ color: 'var(--muted)' }}>{label}</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      <ReadingGuide locale="en" compact />

      {/* Portfolio overview */}
      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>PORTFOLIO</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Asset Allocation</h2>
          </div>
          <Link href="/en/portfolio" className="text-xs transition-colors hover:text-white" style={{ color: 'var(--muted)' }}>
            View details →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {portfolio.assets.map(asset => (
            <div key={asset.name} className="p-4 rounded-lg border text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="text-2xl font-bold mb-1 tabular-nums" style={{ color: CATEGORY_COLORS[asset.category] ?? 'var(--accent)' }}>
                {asset.allocation}%
              </div>
              <div className="text-xs font-medium mb-0.5 leading-snug" style={{ color: 'var(--foreground)' }}>{asset.name}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{asset.note}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs" style={{ color: 'var(--muted)' }}>Updated: {portfolio.updatedAt}</p>
      </section>

      {/* Latest articles */}
      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>BLOG</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Latest Articles</h2>
          </div>
          <Link href="/en/blog" className="text-xs hover:text-white transition-colors" style={{ color: 'var(--muted)' }}>
            View all →
          </Link>
        </div>
        {latestPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestPosts.map(post => <ArticleCard key={post.slug} post={post} basePath="/en/blog" locale="en" />)}
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--muted)' }}>No articles yet. Check back soon.</p>
        )}
      </section>

      {/* Featured */}
      {featuredPosts.length > 0 && (
        <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="mb-8">
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>FEATURED</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Recommended</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {featuredPosts.map(post => <ArticleCard key={post.slug} post={post} basePath="/en/blog" locale="en" />)}
          </div>
        </section>
      )}

      {/* Brand closing */}
      <section className="py-24 text-center">
        <p className="text-3xl font-bold tracking-widest mb-4" style={{ color: 'var(--foreground)' }}>
          Invest. Grow. Breathe.
        </p>
        <p className="text-base" style={{ color: 'var(--muted)' }}>
          High-probability investing through long-term accumulation.<br />
          Not predicting markets — making consistently sound choices.
        </p>
      </section>
    </div>
  )
}
