'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { contents, profile } from '@/lib/content'
import { scrollToChapter } from '@/components/book/bookNav'
import { GitHubIcon, LinkedInIcon, EmailIcon, ResumeIcon, mailHref, safeHref } from '@/components/book/icons'

const SERIF = 'var(--font-cormorant)'
const MONO = 'var(--font-mono)'

/**
 * The book-spine hamburger. Lives top-left where the cover's vertical spine is.
 * Three gold rules → click expands a vertical panel (the spine "opening") with
 * the chapters + résumé + socials. On the book page a contents entry just
 * scrolls to that chapter's section (no route change); from a standalone
 * chapter route it returns home to that section. Keyboard-accessible;
 * reduced-motion → instant panel.
 */
export default function SpineMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // On the cover (home, dark spine) the rules are gold; on paper pages, ink.
  const onCover = pathname === '/'
  const lineColor = open ? '#E8C97A' : onCover ? '#C9A24B' : '#2F4A3C'

  // A contents entry stays on the page: when the book is mounted (home), flow-
  // scroll to that section through the page-flip; from a standalone chapter
  // route there's no book, so go home with a hash and the book opens scrolled
  // to it. Either way no new chapter page is loaded.
  const goTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    document.body.style.overflow = ''
    if (!scrollToChapter(href)) {
      router.push(href === '/' ? '/' : `/#${href.replace(/^\//, '')}`)
    }
  }

  // Close on route change.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Esc to close; lock scroll while open; focus the panel.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  const dur = reduce ? 0 : 0.32

  return (
    <>
      {/* Trigger — 3 rules, fixed top-left over the spine. */}
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="spine-menu-panel"
        onClick={() => setOpen((v) => !v)}
        className="fixed left-0 top-0 z-[120] flex flex-col items-center justify-center gap-[5px]"
        style={{
          width: 'clamp(46px,3.4vw,56px)',
          height: 'clamp(46px,3.4vw,56px)',
          background: 'transparent',
          border: 'none',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: 22,
              height: 2,
              borderRadius: 2,
              background: lineColor,
              transition: 'transform .3s ease, opacity .2s ease, background .25s ease',
              transform: open
                ? i === 0
                  ? 'translateY(7px) rotate(45deg)'
                  : i === 2
                    ? 'translateY(-7px) rotate(-45deg)'
                    : 'none'
                : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              aria-hidden
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[110]"
              style={{ background: 'rgba(8,14,10,0.55)', backdropFilter: 'blur(2px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: dur }}
            />

            {/* Vertical panel — the spine "opening". */}
            <motion.div
              id="spine-menu-panel"
              ref={panelRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Chapters"
              className="fixed left-0 top-0 z-[115] flex h-full flex-col outline-none"
              style={{
                width: 'min(330px, 84vw)',
                background: 'linear-gradient(180deg,#16241B,#0C140F)',
                borderRight: '1px solid rgba(201,162,75,0.3)',
                padding: 'clamp(64px,8vh,96px) clamp(24px,4vw,40px) clamp(28px,4vh,40px)',
                boxShadow: '24px 0 60px rgba(0,0,0,0.5)',
              }}
              initial={{ x: reduce ? 0 : '-100%', opacity: reduce ? 0 : 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: reduce ? 0 : '-100%', opacity: reduce ? 0 : 1 }}
              transition={{ duration: dur, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em', color: 'rgba(201,162,75,0.7)', marginBottom: 24 }}>
                TABLE OF CONTENTS
              </div>

              <nav className="flex flex-col" aria-label="Chapters">
                {/* Cover — the masthead, no page number. */}
                <Link
                  href="/"
                  onClick={goTo('/')}
                  className="py-[8px]"
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    letterSpacing: '0.22em',
                    color: pathname === '/' ? '#E8C97A' : 'rgba(243,236,223,0.6)',
                  }}
                >
                  COVER
                </Link>

                {/* The four chapters as a numbered table of contents. */}
                {contents.map((entry) => {
                  const active = entry.href === pathname
                  return (
                    <Link
                      key={entry.href}
                      href={entry.href}
                      onClick={goTo(entry.href)}
                      className="flex items-baseline gap-3 py-[9px] transition-colors hover:text-gold-bright"
                      style={{ color: active ? '#E8C97A' : '#F3ECDF' }}
                    >
                      <span
                        style={{
                          fontFamily: SERIF,
                          fontWeight: active ? 700 : 600,
                          fontSize: 'clamp(22px,2.8vw,27px)',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.1,
                        }}
                      >
                        {entry.title}
                      </span>
                      <span className="leader leader-gold" />
                      <span style={{ fontFamily: MONO, fontSize: 13, color: active ? '#C9A24B' : 'rgba(243,236,223,0.55)' }}>
                        {entry.page}
                      </span>
                    </Link>
                  )
                })}
              </nav>

              <div style={{ marginTop: 'auto', paddingTop: 28, borderTop: '1px solid rgba(201,162,75,0.18)' }}>
                <a
                  href={profile.resumeUrl}
                  className="inline-flex items-center gap-2"
                  style={{
                    fontFamily: MONO,
                    fontSize: 13,
                    letterSpacing: '0.04em',
                    color: '#0C140F',
                    background: '#C9A24B',
                    padding: '10px 18px',
                    borderRadius: 8,
                    fontWeight: 600,
                  }}
                >
                  <ResumeIcon size={14} /> RÉSUMÉ
                </a>
                <div style={{ display: 'flex', gap: 14, marginTop: 18, color: 'rgba(243,236,223,0.8)' }}>
                  <a href={safeHref(profile.github)} aria-label="GitHub" title="GitHub" className="transition-colors hover:text-gold-bright">
                    <GitHubIcon size={18} />
                  </a>
                  <a href={safeHref(profile.linkedin)} aria-label="LinkedIn" title="LinkedIn" className="transition-colors hover:text-gold-bright">
                    <LinkedInIcon size={17} />
                  </a>
                  <a href={mailHref(profile.email)} aria-label="Email" title="Email" className="transition-colors hover:text-gold-bright">
                    <EmailIcon size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
