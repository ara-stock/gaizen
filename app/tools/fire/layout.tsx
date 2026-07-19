import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FIRE 資産推移シミュレーター',
  description: '現在の資産・毎月の積立額・期待リターンを入力するだけで、FIRE達成までの年数と資産推移を試算。経済的自立・早期退職を目指す方向けの無料シミュレーターツール。',
  keywords: ['FIRE', '経済的自立', '早期退職', '資産推移', '積立投資', '複利', 'シミュレーター'],
  alternates: {
    canonical: 'https://gaizen.xyz/tools/fire/',
    languages: {
      ja: 'https://gaizen.xyz/tools/fire/',
      en: 'https://gaizen.xyz/en/tools/fire/',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
