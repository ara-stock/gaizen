import type { Metadata } from 'next'
import AuthorProfile from '@/components/blog/AuthorProfile'

export const metadata: Metadata = {
  title: '筆者について',
  description: '事業の成長性と持続性を軸に長期投資を行う個人投資家ara。大学院時代の投資の失敗、現在の調査手順、公開している判断事例と資産管理の方法を紹介します。',
  alternates: { canonical: 'https://gaizen.xyz/about/' },
}

export default function AboutPage() {
  return <AuthorProfile />
}
