import type { Metadata } from 'next'
import PublicationHome from '@/components/blog/PublicationHome'

export const metadata: Metadata = {
  title: { absolute: 'GAIZEN FINANCE | 長期投資を、迷わず続けるために。' },
  description: 'Alphabet・MUFGを保有する個人投資家の企業分析と判断手順。月次資産管理のExcel、投資信託の資料の読み方、最初のNISA積立まで、実例から自分で判断するための投資ブログ。',
  alternates: {
    canonical: 'https://gaizen.xyz/',
    types: { 'application/rss+xml': 'https://gaizen.xyz/feed.xml' },
  },
}

export default function HomePage() {
  return <PublicationHome />
}
