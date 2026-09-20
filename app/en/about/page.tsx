import type { Metadata } from 'next'
import AuthorProfile from '@/components/blog/AuthorProfile'

export const metadata: Metadata = {
  title: 'About the Author',
  description: 'Meet ara, an individual investor focused on business growth and durability. Read about the experience, research process, investment theses, and asset tracking behind GAIZEN FINANCE.',
  alternates: { canonical: 'https://gaizen.xyz/en/about/' },
}

export default function EnAboutPage() {
  return <AuthorProfile locale="en" />
}
