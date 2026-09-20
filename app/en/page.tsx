import type { Metadata } from 'next'
import PublicationHome from '@/components/blog/PublicationHome'

export const metadata: Metadata = {
  title: { absolute: 'GAIZEN FINANCE | Invest steadily. Stay the course.' },
  description: 'First-hand Alphabet and MUFG investment theses, a monthly asset tracking workbook, and practical guides to fund documents and NISA. Learn from the reasoning, not just the conclusion.',
  alternates: { canonical: 'https://gaizen.xyz/en/' },
}

export default function EnHomePage() {
  return <PublicationHome locale="en" />
}
