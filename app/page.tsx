import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { getPortfolioData } from '@/lib/portfolio'
import ArticleCard from '@/components/blog/ArticleCard'
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/components/portfolio/AllocationChart'

export default function HomePage() {
  const allPosts = getAllPosts()
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
            Focused on long-term, diversified growth —<br className="hidden sm:block" />
            bridging traditional markets and crypto.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/portfolio"
              className="px-5 py-2.5 text-sm font-semibold rounded-md transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--accent)', color: '#080c0a' }}
            >
              Portfolio を見る
            </Link>
            <Link href="/blog"
              className="px-5 py-2.5 text-sm font-medium rounded-md border transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              Blog を読む
            </Link>
          </div>
        </div>
      </section>

      {/* Stats — シンプルな投資方針サマリー */}
      <section className="py-12 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'コア資産', value: '株式' },
            { label: '投資期間', value: '5年以上' },
            { label: '運用方法', value: 'インデックス + 個別株' },
            { label: '目標', value: '継続的な資産形成' },
          ].map(({ label, value }) => (
            <div key={label} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-xs mb-1.5" style={{ color: 'var(--muted)' }}>{label}</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio overview */}
      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>PORTFOLIO</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Asset Allocation</h2>
          </div>
          <Link href="/portfolio" className="text-xs transition-colors hover:text-white" style={{ color: 'var(--muted)' }}>
            詳細を見る →
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
        <p className="mt-3 text-xs" style={{ color: 'var(--muted)' }}>更新: {portfolio.updatedAt}</p>
      </section>

      {/* Latest articles */}
      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>BLOG</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>最新記事</h2>
          </div>
          <Link href="/blog" className="text-xs hover:text-white transition-colors" style={{ color: 'var(--muted)' }}>
            すべて見る →
          </Link>
        </div>
        {latestPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestPosts.map(post => <ArticleCard key={post.slug} post={post} />)}
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--muted)' }}>記事はまだありません。</p>
        )}
      </section>

      {/* Featured */}
      {featuredPosts.length > 0 && (
        <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="mb-8">
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>FEATURED</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>おすすめ記事</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {featuredPosts.map(post => <ArticleCard key={post.slug} post={post} />)}
          </div>
        </section>
      )}

      {/* Brand closing */}
      <section className="py-24 text-center">
        <p className="text-3xl font-bold tracking-widest mb-4" style={{ color: 'var(--foreground)' }}>
          Invest. Grow. Breathe.
        </p>
        <p className="text-base" style={{ color: 'var(--muted)' }}>
          Focused on long-term, diversified growth —<br />
          bridging traditional markets and crypto.
        </p>
      </section>
    </div>
  )
}
