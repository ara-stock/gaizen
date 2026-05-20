'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function LanguageDetector() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    try {
      const stored = localStorage.getItem('gaizen-lang')
      if (stored !== null) return // respect stored preference, no auto-redirect

      const lang = navigator.language || navigator.languages?.[0] || 'ja'
      if (!lang.startsWith('ja') && !pathname.startsWith('/en')) {
        const enPath = pathname === '/' ? '/en' : `/en${pathname}`
        router.replace(enPath)
      }
    } catch {
      // localStorage unavailable (private browsing, etc.)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
