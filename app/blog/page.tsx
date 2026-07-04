import { getAllPosts, getTopTags } from '@/lib/posts'
import ArticleCard from '@/components/blog/ArticleCard'
import Tag from '@/components/ui/Tag'
import ReadingGuide from '@/components/blog/ReadingGuide'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'NISA・投資信託・資産管理・ポートフォリオ設計を中心に、長期投資を順番に学べる記事一覧。',
  openGraph: {
    title: '投資ブログ | GAIZEN FINANCE',
    description: 'NISA・投資信託・資産管理・ポートフォリオ設計を中心に、長期投資を順番に学べる記事一覧。',
    url: 'https://gaizen.xyz/blog/',
    locale: 'ja_JP',
  },
  alternates: {
    canonical: 'https://gaizen.xyz/blog/',
    languages: { 'en': 'https://gaizen.xyz/en/blog/' },
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getTopTags('ja', 10)
  const featuredPosts = posts.filter(post => post.frontmatter.featured).slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>BLOG</p>
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>
          長期投資を、順番に理解する。
        </h1>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
          NISA、投資信託、資産管理、ポートフォリオ設計を中心に、投資初心者が自分で判断できるようになるための記事を整理しています。全 {posts.length} 記事。
        </p>
      </div>

      <ReadingGuide />

      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <div className="mb-6">
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>EDITOR&apos;S PICKS</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>最初に読む記事</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPosts.map(post => <ArticleCard key={post.slug} post={post} />)}
          </div>
        </section>
      )}

      {tags.length > 0 && (
        <section className="mb-12 p-5 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="mb-4">
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>TOPICS</p>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>よく読まれるテーマ</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => <Tag key={tag} tag={tag} linked={false} />)}
          </div>
        </section>
      )}

      {posts.length > 0 ? (
        <section>
          <div className="mb-6">
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>ALL ARTICLES</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>最新記事</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(post => <ArticleCard key={post.slug} post={post} />)}
          </div>
        </section>
      ) : (
        <div className="py-24 text-center">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>記事はまだありません。</p>
        </div>
      )}
    </div>
  )
}
