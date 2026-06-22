import Link from 'next/link'
import type { Chapter } from '@/lib/content'
import { profile } from '@/lib/content'
import { GitHubIcon, LinkedInIcon, EmailIcon, mailHref, safeHref } from './icons'

const MONO = 'var(--font-mono)'
// Chapter names use the same editorial serif (and weight) as "Tran Tran" on the cover.
const SERIF = 'var(--font-cormorant)'

/**
 * A chapter-divider page (Projects / Experience / Skills / About).
 * Teaser copy per the design ("[ EXPANDING NEXT ]"); real content lands later.
 * The closing page (About) gets the "LET'S TALK" contact row so the book ends
 * on a reachable résumé + links (recruiter-first).
 */
export default function ChapterDivider({
  chapter,
  closing = false,
}: {
  chapter: Chapter
  closing?: boolean
}) {
  const contactBox = {
    width: 38,
    height: 38,
    border: '1px solid rgba(47,74,60,0.3)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2F4A3C',
    transition: '.25s',
  } as const

  return (
    <div className="relative flex h-full w-full flex-col justify-center" style={{ padding: 'clamp(40px,6vw,84px) clamp(28px,7vw,110px)' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', width: '100%' }}>
        <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.22em', color: '#2F4A3C' }}>{chapter.number}</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(46px,7.4vw,104px)', letterSpacing: '-0.02em', lineHeight: 0.95, marginTop: 14 }}>{chapter.title}</h2>
        <p style={{ marginTop: 18, fontSize: 'clamp(16px,1.8vw,20px)', color: '#6B6358', maxWidth: '52ch' }}>
          {chapter.blurb}
        </p>
        <Link
          href={chapter.href}
          className="inline-block transition-colors hover:text-forest"
          style={{ marginTop: 18, fontFamily: MONO, fontSize: 13, letterSpacing: '0.1em', color: '#2F4A3C', borderBottom: '1px solid rgba(47,74,60,0.4)', paddingBottom: 3 }}
        >
          READ THE CHAPTER →
        </Link>

        {closing && (
          <div style={{ marginTop: 'clamp(24px,4vw,40px)', display: 'flex', gap: 11, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.16em', color: '#2F4A3C' }}>LET&apos;S TALK —</span>
            <a href={safeHref(profile.github)} aria-label="GitHub" style={contactBox} className="hover:!bg-forest hover:!text-paper"><GitHubIcon size={18} /></a>
            <a href={safeHref(profile.linkedin)} aria-label="LinkedIn" style={contactBox} className="hover:!bg-forest hover:!text-paper"><LinkedInIcon size={17} /></a>
            <a href={mailHref(profile.email)} aria-label="Email" style={contactBox} className="hover:!bg-forest hover:!text-paper"><EmailIcon size={18} /></a>
            <a href={profile.resumeUrl} style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.04em', color: '#FCFAF6', background: '#2F4A3C', padding: '10px 16px', borderRadius: 8, marginLeft: 4 }}>RÉSUMÉ</a>
          </div>
        )}
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(22px,3vw,40px)', textAlign: 'center', fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', color: '#9a9082' }}>{chapter.footer}</div>
    </div>
  )
}
