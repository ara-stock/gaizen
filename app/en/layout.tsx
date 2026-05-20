import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    languages: {
      'ja': 'https://gaizen.xyz',
      'en': 'https://gaizen.xyz/en',
    },
  },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
