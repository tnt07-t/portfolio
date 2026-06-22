'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { profile } from '@/lib/content'

/**
 * Top-right wordmark + one-click Résumé, shown on every page except the bare
 * cover. Two modes:
 *  - `revealed` (chapter routes): rendered visible immediately.
 *  - default (home): starts hidden; BookStage toggles transform/opacity via ref
 *    once the cover has flipped (same mechanism the old TopBar used).
 */
const Wordmark = forwardRef<HTMLElement, { revealed?: boolean }>(function Wordmark(
  { revealed = false },
  ref,
) {
  return (
    <header
      ref={ref}
      className="fixed right-0 top-0 z-[100] flex items-center gap-[14px]"
      style={{
        padding: '12px clamp(16px,3vw,34px)',
        transform: revealed ? 'translateY(0)' : 'translateY(-105%)',
        opacity: revealed ? 1 : 0,
        transition: 'transform .5s cubic-bezier(.22,.61,.36,1),opacity .5s ease',
      }}
    >
      <Link
        href="/"
        className="font-display text-ink"
        style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em' }}
      >
        {profile.name}
      </Link>
      <a
        href={profile.resumeUrl}
        className="font-mono text-paper"
        style={{
          fontSize: 12.5,
          fontWeight: 500,
          letterSpacing: '0.04em',
          background: '#2F4A3C',
          padding: '8px 16px',
          borderRadius: 8,
        }}
      >
        RÉSUMÉ
      </a>
    </header>
  )
})

export default Wordmark
