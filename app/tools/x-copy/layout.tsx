import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '𝕏 コピーツール',
  description: '𝕏 の文字をクリップボードにコピーする小さなユーティリティ。',
  alternates: { canonical: 'https://gaizen.xyz/tools/x-copy/' },
  robots: { index: false, follow: true },
}

export default function XCopyLayout({ children }: { children: React.ReactNode }) {
  return children
}
