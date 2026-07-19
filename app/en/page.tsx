import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { getPortfolioData } from '@/lib/portfolio'
import ArticleCard from '@/components/blog/ArticleCard'
import { CATEGORY_COLORS } from '@/components/portfolio/AllocationChart'
import type { Metadata } from 'next'
import ReadingGuide from '@/components/blog/ReadingGuide'

export const metadata: Metadata = {
  title: {
    absolute: 'GAIZEN FINANCE — Invest steadily. Stay the course.',
  },
  description: 'A long-term investing publication covering first steps, NISA, asset tracking, and business analysis through first-hand experience and primary sources.',
  openGraph: {
    title: 'GAIZEN FINANCE',
    description: 'A long-term investing publication covering first steps, NISA, asset tracking, and business analysis through first-hand experience and primary sources.',
    url: 'https://gaizen.xyz/en/',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://gaizen.xyz/en/',
    languages: { ja: 'https://gaizen.xyz/', en: 'https://gaizen.xyz/en/' },
  },
}

const PILLARS = [
  {
    label: '01',
    title: 'Start small and avoid avoidable mistakes',
    description: 'Practical steps for opening accounts, setting aside emergency cash, and starting with a small recurring NISA investment.',
  },
  {
    label: '02',
    title: 'Understand funds before choosing them',
    description: 'How to read prospectuses, monthly reports, expense ratios, actual costs, and fund scale before investing.',
  },
  {
    label: '03',
    title: 'Understand the business you own',
    description: 'Evaluate current earnings power, business durability, and room for growth until you can explain the investment in your own words.',
  },
  {
    label: '04',
    title: 'Build a system you can keep following',
    description: 'Monthly asset tracking, contribution rules, and a long-term policy that reduces emotional decisions.',
  },
]

const TRUST_POINTS = [
  'This site is educational commentary, not personalized investment advice.',
  'Figures, fees, rules, and product details are reviewed against official sources when relevant.',
  'Editorial judgment is kept separate from advertising, affiliate, or referral compensation.',
]

const EXPLORE_LINKS = [
  { href: '/en/blog/', label: 'Blog', desc: 'Read by topic and goal' },
  { href: '/en/tools/', label: 'Tools', desc: 'Simulators and calculators' },
  { href: '/en/about/', label: 'About', desc: 'Philosophy and policy' },
  { href: '/en/disclaimer/', label: 'Policy', desc: 'Disclaimer and risk notes' },
]

const ASSET_TRANSLATIONS: Record<string, { name: string; note: string }> = {
  '日本株': { name: 'Japan Stocks', note: 'Trading companies, banks, insurance, finance, real estate, and AI' },
  'S&P500': { name: 'S&P 500', note: 'eMAXIS Slim S&P 500 (long-term holding)' },
  '米国株': { name: 'US Stocks', note: 'Individual stocks' },
  '仮想通貨': { name: 'Crypto', note: 'BTC, crypto assets, and stable yield strategies' },
  '金': { name: 'Gold', note: 'Gold accumulation plan' },
  '現金': { name: 'Cash', note: 'Standby cash and emergency fund' },
}

export default function EnHomePage() {
  const allPosts = getAllPosts('en')
  const latestPosts = allPosts.filter(post => !post.frontmatter.featured).slice(0, 3)
  const featuredPosts = allPosts.filter(p => p.frontmatter.featured).slice(0, 3)
  const portfolio = getPortfolioData()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <section className="py-20 sm:py-28 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
          <p className="text-xs tracking-widest mb-6 font-semibold" style={{ color: 'var(--accent)' }}>
            LONG-TERM INVESTING GUIDE
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight" style={{ color: 'var(--foreground)' }}>
            Invest steadily. Stay the course.
          </h1>
          <p className="text-base sm:text-lg leading-relaxed mb-10" style={{ color: 'var(--muted)' }}>
            From first steps and NISA to asset tracking and business analysis, this site turns real decisions and mistakes into a framework for staying invested with conviction.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/en/blog/investing-first-30-days/"
              className="px-5 py-2.5 text-sm font-semibold rounded-md transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
            >
              Start with 30 days
            </Link>
            <Link href="/en/blog/"
              className="px-5 py-2.5 text-sm font-medium rounded-md border transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              Browse articles
            </Link>
          </div>
          </div>
          <div className="rounded-3xl border p-6 sm:p-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-xs tracking-widest mb-5 font-semibold" style={{ color: 'var(--accent)' }}>EDITORIAL FOCUS</p>
            <div className="space-y-5">
              {PILLARS.map(({ label, title, description }) => (
                <div key={label} className="flex gap-4">
                  <span className="text-xs font-mono mt-1" style={{ color: 'var(--accent)' }}>{label}</span>
                  <div>
                    <h2 className="text-sm font-semibold mb-1" style={{ color: 'var(--foreground)' }}>{title}</h2>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Published Articles', value: `${allPosts.length}` },
            { label: 'Core Topics', value: 'Systems & Businesses' },
            { label: 'Time Horizon', value: 'Long Term' },
            { label: 'Editorial Basis', value: 'Experience + Sources' },
          ].map(({ label, value }) => (
            <div key={label} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-xs mb-1.5" style={{ color: 'var(--muted)' }}>{label}</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      <ReadingGuide locale="en" compact />

      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>FEATURED</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Start Here</h2>
          </div>
          <Link href="/en/blog/" className="text-xs hover:text-white transition-colors" style={{ color: 'var(--muted)' }}>
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPosts.map(post => <ArticleCard key={post.slug} post={post} basePath="/en/blog" locale="en" />)}
        </div>
      </section>

      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>BLOG</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Latest Articles</h2>
          </div>
          <Link href="/en/blog/" className="text-xs hover:text-white transition-colors" style={{ color: 'var(--muted)' }}>
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

      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
          <div>
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>TRUST</p>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Editorial Policy</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              The goal is not to tell readers what to buy, but to organize the information needed to make their own decisions.
            </p>
          </div>
          <div className="grid gap-3">
            {TRUST_POINTS.map((point, index) => (
              <div key={point} className="p-4 rounded-xl border flex gap-3" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>{index + 1}</span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>PORTFOLIO</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Asset Allocation</h2>
          </div>
          <Link href="/en/portfolio/" className="text-xs transition-colors hover:text-white" style={{ color: 'var(--muted)' }}>
            View details →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {portfolio.assets.map(asset => {
            const translated = ASSET_TRANSLATIONS[asset.name] ?? { name: asset.name, note: asset.note }
            return <div key={asset.name} className="p-4 rounded-xl border text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="text-2xl font-bold mb-1 tabular-nums" style={{ color: CATEGORY_COLORS[asset.category] ?? 'var(--accent)' }}>
                {asset.allocation}%
              </div>
              <div className="text-xs font-medium mb-0.5 leading-snug" style={{ color: 'var(--foreground)' }}>{translated.name}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{translated.note}</div>
            </div>
          })}
        </div>
        <p className="mt-3 text-xs" style={{ color: 'var(--muted)' }}>Allocation as of: {portfolio.allocationAsOf}</p>
      </section>

      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="mb-8">
          <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>EXPLORE</p>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Explore the site</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EXPLORE_LINKS.map(({ href, label, desc }, index) => (
            <Link key={href} href={href}
              className="group p-5 rounded-xl border flex flex-col gap-3 transition-colors hover:border-green-800"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>0{index + 1}</span>
              <div>
                <p className="text-sm font-semibold mb-0.5 group-hover:text-white transition-colors" style={{ color: 'var(--foreground)' }}>{label}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
