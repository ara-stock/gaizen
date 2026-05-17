import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ポートフォリオ配分シミュレーター',
  description: '日本株・米国株・REIT・仮想通貨・現金の配分比率を調整し、期待リターン・リスク・シャープレシオをリアルタイムで試算。最適な資産配分を探せる無料ツール。',
  keywords: ['ポートフォリオ', '資産配分', '期待リターン', 'シャープレシオ', '分散投資', 'リスク管理'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
