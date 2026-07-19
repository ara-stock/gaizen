import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '不動産投資 利回り計算ツール',
  description: '家賃収入・管理費・修繕費・ローンなどを入力して表面利回り・実質利回り・キャッシュフローを自動計算。不動産投資判断をサポートする無料シミュレーターツール。',
  keywords: ['不動産投資', '利回り計算', '表面利回り', '実質利回り', 'キャッシュフロー', '投資シミュレーター'],
  alternates: {
    canonical: 'https://gaizen.xyz/tools/realestate/',
    languages: {
      ja: 'https://gaizen.xyz/tools/realestate/',
      en: 'https://gaizen.xyz/en/tools/realestate/',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
