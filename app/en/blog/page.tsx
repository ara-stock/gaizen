import { getAllPosts, getTopTags } from '@/lib/posts'
import ArticleCard from '@/components/blog/ArticleCard'
import Tag from '@/components/ui/Tag'
import ReadingGuide from '@/components/blog/ReadingGuide'
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
  const tags = getTopTags('en', 10)
  const featuredPosts = posts.filter(post => post.frontmatter.featured).slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>BLOG</p>
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>
          Learn long-term investing in order.
        </h1>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
          Practical articles on NISA, index funds, asset tracking, and portfolio design for readers who want to make their own decisions. {posts.length} articles.
        </p>
      </div>

      <ReadingGuide locale="en" />

      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <div className="mb-6">
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>EDITOR&apos;S PICKS</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Start Here</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPosts.map(post => <ArticleCard key={post.slug} post={post} basePath="/en/blog" locale="en" />)}
          </div>
        </section>
      )}

      {tags.length > 0 && (
        <section className="mb-12 p-5 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="mb-4">
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>TOPICS</p>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Popular Topics</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => <Tag key={tag} tag={tag} basePath="/en/blog" linked={false} />)}
          </div>
        </section>
      )}

      {posts.length > 0 ? (
        <section>
          <div className="mb-6">
            <p className="text-xs tracking-widest mb-1 font-semibold" style={{ color: 'var(--accent)' }}>ALL ARTICLES</p>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Latest Articles</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(post => <ArticleCard key={post.slug} post={post} basePath="/en/blog" locale="en" />)}
          </div>
        </section>
      ) : (
        <div className="py-24 text-center">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>No articles yet. Check back soon.</p>
        </div>
      )}
    </div>
  )
}
