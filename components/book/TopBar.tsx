import { forwardRef } from 'react'
import { profile } from '@/lib/content'
import { GitHubIcon, LinkedInIcon, EmailIcon, mailHref, safeHref } from './icons'

/**
 * Fixed top bar — name (left); GitHub / LinkedIn / Email / Résumé (right).
 * Hidden until the first page-flip; BookStage toggles transform/opacity via ref.
 * Résumé is always present here (recruiter-first: reachable from every page).
 */
const TopBar = forwardRef<HTMLElement>(function TopBar(_props, ref) {
  return (
    <header
      ref={ref}
      className="fixed left-0 right-0 top-0 z-[90] flex items-center justify-between border-b border-ink/10 bg-paper/90 backdrop-blur-md"
      style={{
        padding: '12px clamp(18px,4vw,42px)',
        transform: 'translateY(-105%)',
        opacity: 0,
        transition:
          'transform .5s cubic-bezier(.22,.61,.36,1),opacity .5s ease',
      }}
    >
      <a
        href="#top"
        className="font-display text-ink"
        style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em' }}
      >
        {profile.name}
      </a>
      <nav className="flex items-center gap-[14px]">
        <a href={safeHref(profile.github)} aria-label="GitHub" title="GitHub" className="flex text-ink-faded transition-colors hover:text-forest">
          <GitHubIcon />
        </a>
        <a href={safeHref(profile.linkedin)} aria-label="LinkedIn" title="LinkedIn" className="flex text-ink-faded transition-colors hover:text-forest">
          <LinkedInIcon />
        </a>
        <a href={mailHref(profile.email)} aria-label="Email" title="Email" className="flex text-ink-faded transition-colors hover:text-forest">
          <EmailIcon />
        </a>
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
      </nav>
    </header>
  )
})

export default TopBar
