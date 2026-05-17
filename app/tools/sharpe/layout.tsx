import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'シャープレシオ チャート',
  description: 'S&P500・日本株・米国株・Bitcoin など主要資産のシャープレシオ推移をチャートで比較。リスク調整後リターンで資産クラスを評価できる無料分析ツール。',
  keywords: ['シャープレシオ', 'リスク調整後リターン', 'S&P500', 'Bitcoin', '資産比較', '投資分析'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
