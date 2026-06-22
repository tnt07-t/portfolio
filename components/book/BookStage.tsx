'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { chapters } from '@/lib/content'
import Cover from './Cover'
import Highlights from './Highlights'
import ChapterDivider from './ChapterDivider'
import Wordmark from '@/components/nav/Wordmark'
import { BookNavContext } from './bookNav'

interface PageDescriptor {
  key: string
  node: React.ReactNode
  frontBg: string
  backBg: string
  /** Cover gets a deeper drop shadow + an "Ex Libris" verso. */
  cover?: boolean
  backNode?: React.ReactNode
}

const PAGES: PageDescriptor[] = [
  {
    key: 'cover',
    node: <Cover />,
    frontBg: '#16241B',
    backBg: '#11201A',
    cover: true,
    backNode: (
      <>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(36,56,44,0.4), rgba(8,14,10,0.9) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ border: '1px solid rgba(201,162,75,0.4)', padding: '20px 30px', textAlign: 'center', color: 'rgba(201,162,75,0.78)' }}>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 22 }}>Ex Libris</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', marginTop: 8 }}>TRAN TRAN</div>
          </div>
        </div>
      </>
    ),
  },
  { key: 'highlights', node: <Highlights />, frontBg: '#FCFAF6', backBg: '#F4EFE6' },
  ...chapters.map((c, i) => ({
    key: c.title,
    node: <ChapterDivider chapter={c} closing={i === chapters.length - 1} />,
    frontBg: '#FCFAF6',
    backBg: '#F4EFE6',
  })),
]

const N = PAGES.length
// Stage height tuned so each flip segment is ~60vh of scroll (plus a viewport).
const STAGE_VH = 60 * (N - 1) + 100

function smootherstep(p: number) {
  return p * p * p * (p * (p * 6 - 15) + 10)
}

// Page index a chapter href lands on (cover=0, highlights=1, chapters after).
function pageIndexForHref(href: string) {
  const ci = chapters.findIndex((c) => c.href === href)
  return ci < 0 ? -1 : 2 + ci
}

// Flip-through total duration. Constant regardless of how many pages are flipped
// (per-page time = TOTAL ÷ pages), so impatience stays the same near or far.
const FLIP_TOTAL_MS = 820

export default function BookStage() {
  const router = useRouter()
  const stageRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<(HTMLDivElement | null)[]>([])
  const curlRefs = useRef<(HTMLDivElement | null)[]>([])
  const barRef = useRef<HTMLElement>(null)
  const animatingRef = useRef(false)

  // Click a contents entry → flip through to that chapter's page, then navigate.
  const flipTo = useCallback(
    (href: string) => {
      const stage = stageRef.current
      const target = pageIndexForHref(href)
      const reduce =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.innerWidth < 720
      // No 3D flip on mobile / reduced-motion (or unknown target): just navigate;
      // the route cross-fade in app/template.tsx carries the transition.
      if (!stage || target < 0 || reduce) {
        router.push(href)
        return
      }
      if (animatingRef.current) return
      animatingRef.current = true

      const range = stage.offsetHeight - window.innerHeight
      const seg = range / (N - 1)
      const stageTopDoc = stage.getBoundingClientRect().top + window.scrollY
      const start = window.scrollY
      const end = stageTopDoc + target * seg
      const docEl = document.documentElement
      const prevBehavior = docEl.style.scrollBehavior
      docEl.style.scrollBehavior = 'auto' // beat CSS smooth-scroll; we ease ourselves

      const t0 = performance.now()
      const step = (now: number) => {
        // Linear progress → each intermediate page gets an equal slice of time.
        const p = Math.min((now - t0) / FLIP_TOTAL_MS, 1)
        window.scrollTo(0, start + (end - start) * p)
        if (p < 1) {
          requestAnimationFrame(step)
        } else {
          docEl.style.scrollBehavior = prevBehavior
          animatingRef.current = false
          router.push(href)
        }
      }
      requestAnimationFrame(step)
    },
    [router],
  )

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Cache layout reads; only refresh on resize to avoid per-scroll thrash.
    let range = 0
    let ticking = false
    const measure = () => {
      range = stage.offsetHeight - window.innerHeight
    }

    const update = () => {
      ticking = false
      const reduce = mq.matches || window.innerWidth < 720
      const rect = stage.getBoundingClientRect()
      const scroll = Math.min(Math.max(-rect.top, 0), range)
      const seg = range / (N - 1)
      const cur = Math.min(N - 1, Math.floor(scroll / seg + 0.0001))

      for (let i = 0; i < N; i++) {
        const pg = pageRefs.current[i]
        if (!pg) continue
        const curl = curlRefs.current[i]

        if (reduce) {
          // Mobile / reduced-motion: plain opacity cross-fade, no 3D.
          const active = Math.min(N - 1, Math.round(scroll / seg))
          pg.style.transform = 'none'
          pg.style.filter = 'none'
          pg.style.willChange = 'auto'
          pg.style.opacity = i === active ? '1' : '0'
          pg.style.zIndex = i === active ? '10' : '1'
          pg.style.transition = 'opacity .35s ease'
          pg.style.pointerEvents = i === active ? 'auto' : 'none'
          if (curl) curl.style.opacity = '0'
          continue
        }

        pg.style.transition = ''
        const dwell = i === 0 ? 0.32 : 0.06
        const local = (scroll - i * seg) / seg
        let fp = 0
        if (i < N - 1) fp = Math.min(Math.max((local - dwell) / (1 - dwell), 0), 1)
        const e = i === 0 ? smootherstep(fp) : 0.5 - 0.5 * Math.cos(Math.PI * fp)
        const rot = -178 * e
        const sweep = Math.sin(Math.min(fp, 1) * Math.PI)
        pg.style.transform = `translateY(${-sweep * 2.2}%) rotateY(${rot}deg) translateZ(${sweep * 26}px)`
        pg.style.willChange = fp > 0 && fp < 1 ? 'transform' : 'auto'
        pg.style.opacity = '1'

        let z: number
        if (fp > 0 && fp < 1) {
          z = 1000
          pg.style.filter =
            i === 0
              ? `drop-shadow(${sweep * 34}px ${14 + sweep * 22}px ${26 + sweep * 46}px rgba(0,0,0,${0.2 + sweep * 0.26}))`
              : `drop-shadow(${sweep * 26}px ${14 + sweep * 22}px ${44 + sweep * 70}px rgba(0,0,0,${0.16 + sweep * 0.24}))`
        } else if (fp >= 1) {
          z = 2
          pg.style.filter = 'none'
        } else {
          z = 500 - i
          pg.style.filter = 'none'
        }
        pg.style.zIndex = String(z)
        // Keep the current page interactive while it still dominates the screen
        // (through its dwell and the first half of its flip) so links on it —
        // notably the cover's Résumé/socials — stay clickable, not just at rest.
        pg.style.pointerEvents = fp < 0.5 && i === cur ? 'auto' : 'none'

        if (curl) {
          if (fp > 0 && fp < 1) {
            curl.style.background =
              i === 0
                ? 'linear-gradient(94deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.30) 26%, rgba(0,0,0,0.04) 56%, rgba(235,205,128,0.12) 84%, rgba(255,242,205,0.30) 100%)'
                : 'linear-gradient(94deg, rgba(20,17,14,0.50) 0%, rgba(20,17,14,0.22) 26%, rgba(20,17,14,0.03) 56%, rgba(255,255,255,0.10) 84%, rgba(255,255,255,0.30) 100%)'
            curl.style.opacity = String(sweep)
          } else {
            curl.style.opacity = '0'
          }
        }
      }

      const bar = barRef.current
      if (bar) {
        const show = scroll > (range / (N - 1)) * 0.55
        bar.style.transform = show ? 'translateY(0)' : 'translateY(-105%)'
        bar.style.opacity = show ? '1' : '0'
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    mq.addEventListener?.('change', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      mq.removeEventListener?.('change', onScroll)
    }
  }, [])

  return (
    <BookNavContext.Provider value={{ flipTo }}>
      {/* subtle paper grain over everything */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 60,
          opacity: 0.04,
          mixBlendMode: 'multiply',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <Wordmark ref={barRef} />

      <div id="top" />

      <div ref={stageRef} style={{ position: 'relative', height: `${STAGE_VH}vh`, background: '#0C140F' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            background: '#0C140F',
            perspective: '3200px',
            perspectiveOrigin: '0% 50%',
          }}
        >
          {PAGES.map((page, i) => (
            <div
              key={page.key}
              ref={(el) => {
                pageRefs.current[i] = el
              }}
              data-page
              style={{
                position: 'absolute',
                inset: 0,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                zIndex: 500 - i,
              }}
            >
              {/* front face */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  overflow: 'hidden',
                  background: page.frontBg,
                  boxShadow: page.cover ? '14px 0 70px rgba(0,0,0,0.5)' : undefined,
                }}
              >
                {page.node}
                {/* curl-shadow sweep (opacity driven by scroll loop) */}
                <div
                  aria-hidden
                  ref={(el) => {
                    curlRefs.current[i] = el
                  }}
                  className="pointer-events-none absolute inset-0"
                  style={{ opacity: 0, zIndex: 45, willChange: 'opacity, background' }}
                />
              </div>
              {/* back face */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  overflow: 'hidden',
                  background: page.backBg,
                }}
              >
                {page.backNode}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BookNavContext.Provider>
  )
}
