'use client'

import { useState } from 'react'
import { dict, type Locale } from './i18n'

export default function InviteCodes({ codes, locale = 'ja' }: { codes: string[]; locale?: Locale }) {
  const d = dict(locale)
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(code)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // Clipboard access can be blocked; the code stays selectable as text.
    }
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {codes.map(code => (
        <li key={code}>
          <button type="button" onClick={() => copy(code)}
            className="font-mono text-sm px-3 py-2 rounded-lg border select-all"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--foreground)' }}>
            {code}
            <span className="ml-2 text-xs font-sans" style={{ color: 'var(--accent)' }}>{copied === code ? d.copied : d.copy}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
