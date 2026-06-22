'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import type { Chapter } from '@/lib/types'
import { profile } from '@/lib/content'
import Wordmark from '@/components/nav/Wordmark'
import { GitHubIcon, LinkedInIcon, EmailIcon, mailHref, safeHref } from '@/components/book/icons'

const MONO = 'var(--font-mono)'
const DISPLAY = 'var(--font-cabinet)'

/**
 * Layout for a full chapter route. Header mirrors the book's ChapterDivider so
 * arriving from the flip-through reads as "the chapter opening". Paper page,
 * fade-up on mount. The closing chapter (About) gets the contact row.
 */
export default function ChapterShell({
  chapter,
  children,
  contactKicker,
  prevHref,
  prevLabel,
}: {
  chapter: Chapter
  children: ReactNode
  contactKicker?: string
  prevHref?: string
  prevLabel?: string
}) {
  const contactBox = {
    width: 40,
    height: 40,
    border: '1px solid rgba(47,74,60,0.3)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2F4A3C',
    transition: '.25s',
  } as const

  return (
    <main
      className="relative min-h-screen w-full bg-paper text-ink"
      style={{ animation: 'fadeUp .5s ease both' }}
    >
      <Wordmark revealed />

      <div
        style={{
          maxWidth: 920,
          margin: '0 auto',
          padding: 'clamp(96px,14vh,160px) clamp(24px,7vw,96px) clamp(60px,10vh,120px)',
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.22em', color: '#2F4A3C' }}>
          {chapter.number}
        </div>
        <h1
          style={{
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: 'clamp(44px,7vw,92px)',
            letterSpacing: '-0.025em',
            marginTop: 14,
            lineHeight: 0.95,
          }}
        >
          {chapter.title}
        </h1>
        <p style={{ marginTop: 16, fontSize: 'clamp(16px,1.8vw,20px)', color: '#6B6358', maxWidth: '56ch' }}>
          {chapter.blurb}
        </p>

        <div style={{ marginTop: 'clamp(36px,6vw,64px)' }}>{children}</div>

        {contactKicker && (
          <div style={{ marginTop: 'clamp(40px,6vw,72px)', display: 'flex', gap: 11, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.16em', color: '#2F4A3C' }}>{contactKicker}</span>
            <a href={safeHref(profile.github)} aria-label="GitHub" style={contactBox} className="hover:!bg-forest hover:!text-paper"><GitHubIcon size={18} /></a>
            <a href={safeHref(profile.linkedin)} aria-label="LinkedIn" style={contactBox} className="hover:!bg-forest hover:!text-paper"><LinkedInIcon size={17} /></a>
            <a href={mailHref(profile.email)} aria-label="Email" style={contactBox} className="hover:!bg-forest hover:!text-paper"><EmailIcon size={18} /></a>
            <a href={profile.resumeUrl} style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.04em', color: '#FCFAF6', background: '#2F4A3C', padding: '11px 18px', borderRadius: 8, marginLeft: 4 }}>RÉSUMÉ</a>
          </div>
        )}

        <div style={{ marginTop: 'clamp(48px,8vw,88px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(26,23,20,0.12)', paddingTop: 22 }}>
          <Link href={prevHref ?? '/'} style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.08em', color: '#6B6358' }}>
            ← {prevLabel ?? 'Back to the book'}
          </Link>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', color: '#9a9082' }}>{chapter.footer}</span>
        </div>
      </div>
    </main>
  )
}
