import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ポートフォリオ配分シミュレーター',
  description: '日本株・米国株・REIT・仮想通貨・現金の配分比率を調整し、仮定したリターン・リスク・シャープレシオを比較するシナリオ試算ツール。',
  keywords: ['ポートフォリオ', '資産配分', '期待リターン', 'シャープレシオ', '分散投資', 'リスク管理'],
  alternates: {
    canonical: 'https://gaizen.xyz/tools/allocation/',
    languages: {
      ja: 'https://gaizen.xyz/tools/allocation/',
      en: 'https://gaizen.xyz/en/tools/allocation/',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
