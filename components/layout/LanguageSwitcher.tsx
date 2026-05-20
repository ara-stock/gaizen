'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const isEnglish = pathname.startsWith('/en')

  const jaPath = isEnglish ? pathname.slice(3) || '/' : pathname
  const enPath = isEnglish ? pathname : `/en${pathname === '/' ? '' : pathname}`

  return (
    <div className="flex items-center gap-1.5 text-xs">
      <Link
        href={jaPath}
        className="transition-colors"
        style={{ color: isEnglish ? 'var(--muted)' : 'var(--foreground)', fontWeight: isEnglish ? 400 : 600 }}
      >
        Japanese
      </Link>
      <span style={{ color: 'var(--border)' }}>/</span>
      <Link
        href={enPath}
        className="transition-colors"
        style={{ color: isEnglish ? 'var(--foreground)' : 'var(--muted)', fontWeight: isEnglish ? 600 : 400 }}
      >
        English
      </Link>
    </div>
  )
}
