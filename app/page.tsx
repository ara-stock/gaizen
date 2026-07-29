import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import { getPortfolioData } from '@/lib/portfolio'
import ArticleCard from '@/components/blog/ArticleCard'
import { CATEGORY_COLORS } from '@/components/portfolio/AllocationChart'
import ReadingGuide from '@/components/blog/ReadingGuide'

export const metadata: Metadata = {
  title: {
    absolute: 'GAIZEN FINANCE — 長期投資を、迷わず続けるために',
  },
  description: '投資の始め方、NISA、資産管理、企業分析を、個人投資家の経験と一次情報から学ぶ長期投資メディア。',
  alternates: {
    canonical: 'https://gaizen.xyz/',
    languages: { ja: 'https://gaizen.xyz/', en: 'https://gaizen.xyz/en/' },
    types: { 'application/rss+xml': 'https://gaizen.xyz/feed.xml' },
  },
}

const EXPLORE_LINKS = [
  {
    href: '/blog/',
    label: 'Blog',
    desc: '投資を体系的に読む',
  },
  {
    href: '/tools/',
    label: 'Tools',
    desc: 'FIRE・配分・利回り計算',
  },
  {
    href: '/about/',
    label: 'About',
    desc: 'このサイトについて',
  },
  {
    href: '/disclaimer/',
    label: 'Policy',
    desc: '免責事項・運営方針',
  },
]

const PILLARS = [
  {
    label: '01',
    title: 'まずは小さく始める',
    description: 'NISA口座、生活防衛資金、月1,000円の積立など、投資初心者が迷いやすい最初の手順を具体化します。',
  },
  {
    label: '02',
    title: '商品を理解して選ぶ',
    description: '投資信託の目論見書・月報・信託報酬・実質コストを確認し、SNSの流行ではなく自分で判断する力を重視します。',
  },
  {
    label: '03',
    title: '事業を理解して投資する',
    description: '現在の利益創出力、事業の持続性、将来の成長余地を確認し、自分の言葉で投資理由を説明できる企業を選びます。',
  },
  {
    label: '04',
    title: '長期で続ける仕組みを作る',
    description: '毎月の資産記録、入金ルール、リバランス方針を整理し、短期の値動きに振り回されにくい運用を目指します。',
  },
]

const TRUST_POINTS = [
  '投資助言ではなく、個人投資家の経験と調査に基づく教育コンテンツです。',
  '制度・手数料・リスクは公式情報を確認し、必要に応じて記事を更新します。',
  '広告・紹介リンクの有無にかかわらず、長期投資に不要な商品は推奨しません。',
]

export default function HomePage() {
  const allPosts = getAllPosts()
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
            長期投資を、迷わず続けるために。
          </h1>
          <p className="text-base sm:text-lg leading-relaxed mb-10" style={{ color: 'var(--muted)' }}>
            投資の始め方から、NISA・資産管理・企業分析まで。実際の判断と失敗をもとに、
            自分で納得して長期投資を続けるための考え方を整理します。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/blog/investing-first-30-days/"
              className="px-5 py-2.5 text-sm font-semibold rounded-md transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
            >
              最初の30日を読む
            </Link>
            <Link href="/blog/"
              className="px-5 py-2.5 text-sm font-medium rounded-md border transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              記事一覧へ
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
            { label: '対象読者', value: '投資初心者・長期投資家' },
            { label: '主テーマ', value: '制度・企業・資産管理' },
            { label: '投資期間', value: '長期前提' },
            { label: '運営方針', value: '経験 + 一次情報' },
          ].map(({ label, value }) => (
            <div key={label} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-xs mb-1.5" style={{ color: 'var(--muted)' }}>{label}</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      <ReadingGuide compact />

      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>FEATURED</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>まず読んでほしい記事</h2>
          </div>
          <Link href="/blog/" className="text-xs hover:text-green-600 transition-colors" style={{ color: 'var(--muted)' }}>
            すべて見る →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPosts.map(post => <ArticleCard key={post.slug} post={post} />)}
        </div>
      </section>

      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>BLOG</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>最新記事</h2>
          </div>
          <Link href="/blog/" className="text-xs hover:text-green-600 transition-colors" style={{ color: 'var(--muted)' }}>
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

      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
          <div>
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>TRUST</p>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>運営方針</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              投資判断の代行ではなく、判断材料の整理を目的にしています。読者が自分で調べ、納得して選べる状態を重視します。
            </p>
            <Link href="/editorial-policy/" className="inline-block mt-4 text-xs transition-colors hover:text-green-500" style={{ color: 'var(--accent)' }}>
              編集・検証方針を読む →
            </Link>
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
          <Link href="/portfolio/" className="text-xs transition-colors hover:text-green-600" style={{ color: 'var(--muted)' }}>
            詳細を見る →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {portfolio.assets.map(asset => (
            <div key={asset.name} className="p-4 rounded-xl border text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="text-2xl font-bold mb-1 tabular-nums" style={{ color: CATEGORY_COLORS[asset.category] ?? 'var(--accent)' }}>
                {asset.allocation}%
              </div>
              <div className="text-xs font-medium mb-0.5 leading-snug" style={{ color: 'var(--foreground)' }}>{asset.name}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{asset.note}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs" style={{ color: 'var(--muted)' }}>資産配分基準日: {portfolio.allocationAsOf}</p>
      </section>

      <section className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="mb-8">
          <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>EXPLORE</p>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>サイトを探索する</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EXPLORE_LINKS.map(({ href, label, desc }, index) => (
            <Link key={href} href={href}
              className="group p-5 rounded-xl border flex flex-col gap-3 transition-colors hover:border-green-800"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>0{index + 1}</span>
              <div>
                <p className="text-sm font-semibold mb-0.5 group-hover:text-green-600 transition-colors" style={{ color: 'var(--foreground)' }}>{label}</p>
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
          蓋然（がいぜん）——確からしさを積み重ねる投資。<br />
          相場を予測するのではなく、蓋然性の高い選択を続けること。
        </p>
      </section>
    </div>
  )
}
