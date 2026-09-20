'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  responsive?: boolean
  className?: string
}

export default function AdUnit({ slot, format = 'auto', responsive = true, className }: AdUnitProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
  const adUnitsEnabled = process.env.NEXT_PUBLIC_ADSENSE_AD_UNITS_ENABLED === 'true'
  const enabled = adUnitsEnabled && !!publisherId && publisherId !== 'ca-pub-XXXXXXXXXXXXXXXX'
  const initialized = useRef(false)

  useEffect(() => {
    if (!enabled || initialized.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      initialized.current = true
    } catch {
      // ignore if adsbygoogle is not yet loaded
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <aside className={`ad-slot ${className ?? ''}`} aria-label="Advertisement">
      <p className="mb-2 text-center text-[10px] tracking-[0.2em]" style={{ color: 'var(--muted)' }}>広告 / ADVERTISEMENT</p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '250px' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </aside>
  )
}
