import { getAllPosts } from '@/lib/posts'
import EditorialLibrary from '@/components/blog/EditorialLibrary'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: '投資の始め方、NISA、資産管理、企業分析を、実体験と一次情報から順番に学べる長期投資の記事一覧。',
  openGraph: {
    title: '投資ブログ | GAIZEN FINANCE',
    description: '投資の始め方、NISA、資産管理、企業分析を、実体験と一次情報から順番に学べる長期投資の記事一覧。',
    url: 'https://gaizen.xyz/blog/',
    locale: 'ja_JP',
  },
  alternates: {
    canonical: 'https://gaizen.xyz/blog/',
    languages: { ja: 'https://gaizen.xyz/blog/', en: 'https://gaizen.xyz/en/blog/' },
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>BLOG</p>
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>
          長期投資を、順番に理解する。
        </h1>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
          投資の始め方、NISA、資産管理、企業分析を、実際の失敗と運用経験を交えながら整理しています。
          初心者向けの手順と、筆者自身の投資判断ノートを分けて読むことができます。
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs" style={{ color: 'var(--muted)' }}>
          <span>執筆: 個人投資家 ara</span>
          <Link href="/editorial-policy/" className="transition-colors hover:text-green-500">編集・検証方針を読む →</Link>
        </div>
      </div>

      {posts.length > 0 ? <EditorialLibrary posts={posts} /> : (
        <div className="py-24 text-center">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>記事はまだありません。</p>
        </div>
      )}
    </div>
  )
}
