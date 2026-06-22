'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { chapters } from '@/lib/content'
import Cover from './Cover'
import Highlights from './Highlights'
import ChapterLeaf from './ChapterLeaf'
import Wordmark from '@/components/nav/Wordmark'
import PaperGrain from '@/components/PaperGrain'
import { registerBookNav } from './bookNav'

interface PageDescriptor {
  key: string
  node: React.ReactNode
  frontBg: string
  backBg: string
  /** Full-viewport pages (cover, highlights) never scroll their content — the
   *  page is the screen. Chapter leaves are taller and scroll inside the pin. */
  fullViewport?: boolean
  /** Cover gets a deeper drop shadow, a scroll dwell + an "Ex Libris" verso. */
  cover?: boolean
  backNode?: React.ReactNode
  /** id for the plain-base section + the deep-link hash (e.g. "projects"). */
  domId: string
  /** Chapter route this page mirrors, if any (used to resolve ToC targets). */
  href?: string
}

const PAGES: PageDescriptor[] = [
  {
    key: 'cover',
    node: <Cover />,
    frontBg: '#16241B',
    backBg: '#11201A',
    fullViewport: true,
    cover: true,
    domId: 'top',
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
  { key: 'highlights', node: <Highlights />, frontBg: '#FCFAF6', backBg: '#F4EFE6', fullViewport: true, domId: 'highlights' },
  ...chapters.map((c, i) => ({
    key: c.title,
    node: <ChapterLeaf chapter={c} closing={i === chapters.length - 1} />,
    frontBg: '#FCFAF6',
    backBg: '#F4EFE6',
    href: c.href,
    domId: c.href.replace(/^\//, ''),
  })),
]

const N = PAGES.length

// Scroll, in fractions of a viewport, spent on each motion.
const COVER_DWELL = 0.34 // lead-in before the cover starts to turn
const FLIP_FACTOR = 0.72 // distance over which one page-turn plays

function smootherstep(p: number) {
  return p * p * p * (p * (p * 6 - 15) + 10)
}
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)

// Page index a target lands on: "/" → cover, a chapter href or its bare hash
// ("projects" / "/projects") → that chapter. -1 if unknown.
function pageIndexForTarget(target: string) {
  if (target === '/' || target === '' || target === 'top') return 0
  const href = target.startsWith('/') ? target : `/${target}`
  const ci = chapters.findIndex((c) => c.href === href)
  return ci < 0 ? -1 : 2 + ci
}

interface Geom {
  read: number[] // px of content scroll per page
  dwell: number[] // px of lead-in per page
  offset: number[] // cumulative scroll where each page begins
  seg: number[] // total scroll budget per page
  flipPx: number // px of one page-turn
  range: number // total scrollable distance (= sum of seg)
}

export default function BookStage() {
  // Plain stacked scroll is the SSR-safe base; we upgrade to the pinned
  // page-flip engine on desktop after mount (progressive enhancement).
  const [flip, setFlip] = useState(false)

  const stageRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const curlRefs = useRef<(HTMLDivElement | null)[]>([])
  const barRef = useRef<HTMLElement>(null)
  const geomRef = useRef<Geom | null>(null)
  // Mirror `flip` into a ref so the registered scroll handler (stable identity)
  // always reads the current mode without re-registering.
  const flipRef = useRef(false)
  flipRef.current = flip

  // Decide the mode before paint, and keep it in sync with viewport / motion pref.
  useLayoutEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const decide = () => {
      setFlip(!(mq.matches || window.innerWidth < 720))
    }
    decide()
    mq.addEventListener?.('change', decide)
    window.addEventListener('resize', decide)
    return () => {
      mq.removeEventListener?.('change', decide)
      window.removeEventListener('resize', decide)
    }
  }, [])

  // Register the contents-click handler so the global SpineMenu (which lives in
  // the layout, outside this React tree) can drive an in-page scroll. Clicking a
  // contents entry stays on the page and smooth-scrolls to that chapter's
  // section — in flip mode the scroll-driven engine plays the page-turns along
  // the way and lands on the chapter. Deferred a frame so the menu's close
  // (which releases its scroll-lock) settles first, else the scroll is dropped.
  useEffect(() => {
    registerBookNav((target: string) => {
      const idx = pageIndexForTarget(target)
      if (idx < 0) return
      const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)')
        .matches
        ? 'auto'
        : 'smooth'
      requestAnimationFrame(() => {
        const stage = stageRef.current
        const geom = geomRef.current
        if (flipRef.current && stage && geom) {
          const top = stage.getBoundingClientRect().top + window.scrollY + geom.offset[idx]
          window.scrollTo({ top, behavior })
        } else {
          // Plain base (mobile / reduced-motion): scroll the section into view.
          document.getElementById(PAGES[idx].domId)?.scrollIntoView({ behavior, block: 'start' })
        }
      })
    })
    return () => registerBookNav(null)
  }, [])

  // The pinned page-flip engine. Runs only in flip mode.
  useEffect(() => {
    if (!flip) return
    const stage = stageRef.current
    if (!stage) return

    let ticking = false

    const measure = () => {
      const vh = window.innerHeight
      const read: number[] = []
      const dwell: number[] = []
      const seg: number[] = []
      const offset: number[] = []
      const flipPx = FLIP_FACTOR * vh
      let total = 0
      for (let i = 0; i < N; i++) {
        const contentH = contentRefs.current[i]?.offsetHeight ?? vh
        read[i] = PAGES[i].fullViewport ? 0 : Math.max(0, contentH - vh)
        dwell[i] = PAGES[i].cover ? COVER_DWELL * vh : 0
        const turn = i < N - 1 ? flipPx : 0
        seg[i] = dwell[i] + read[i] + turn
        offset[i] = total
        total += seg[i]
      }
      geomRef.current = { read, dwell, offset, seg, flipPx, range: total }
      stage.style.height = `${total + vh}px`
    }

    const update = () => {
      ticking = false
      const geom = geomRef.current
      if (!geom) return
      const rect = stage.getBoundingClientRect()
      const scroll = clamp(-rect.top, 0, geom.range)

      // Active page = the one whose scroll budget currently contains us.
      let i = 0
      while (i < N - 1 && scroll >= geom.offset[i] + geom.seg[i]) i++
      const local = scroll - geom.offset[i]
      const read = clamp(local - geom.dwell[i], 0, geom.read[i])
      const afterRead = local - geom.dwell[i] - geom.read[i]
      const f = i < N - 1 ? clamp(afterRead / geom.flipPx, 0, 1) : 0

      for (let j = 0; j < N; j++) {
        const pg = pageRefs.current[j]
        if (!pg) continue
        const content = contentRefs.current[j]
        const curl = curlRefs.current[j]

        let rotate = 0
        let z = 500 - j
        let pe = 'none'
        let filter = 'none'
        let curlOp = 0
        let curlBg = ''
        let contentY = 0
        let willChange = 'auto'

        if (j === i) {
          contentY = read
          if (f > 0) {
            const e = j === 0 ? smootherstep(f) : 0.5 - 0.5 * Math.cos(Math.PI * f)
            const sweep = Math.sin(f * Math.PI)
            rotate = -178 * e
            z = 1000
            willChange = 'transform'
            filter =
              j === 0
                ? `drop-shadow(${sweep * 34}px ${14 + sweep * 22}px ${26 + sweep * 46}px rgba(0,0,0,${0.2 + sweep * 0.26}))`
                : `drop-shadow(${sweep * 26}px ${14 + sweep * 22}px ${44 + sweep * 70}px rgba(0,0,0,${0.16 + sweep * 0.24}))`
            curlOp = sweep
            curlBg =
              j === 0
                ? 'linear-gradient(94deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.30) 26%, rgba(0,0,0,0.04) 56%, rgba(235,205,128,0.12) 84%, rgba(255,242,205,0.30) 100%)'
                : 'linear-gradient(94deg, rgba(20,17,14,0.50) 0%, rgba(20,17,14,0.22) 26%, rgba(20,17,14,0.03) 56%, rgba(255,255,255,0.10) 84%, rgba(255,255,255,0.30) 100%)'
          } else {
            z = 900 // flat, on top, being read
          }
          // Keep the page interactive through its read and the first half of its
          // turn so links on it (cover résumé/socials, project links) stay live.
          pe = f < 0.5 ? 'auto' : 'none'
        } else if (j < i) {
          rotate = -178 // already turned, resting on the left stack
          z = 2
          contentY = geom.read[j]
        } else if (j === i + 1) {
          z = 500 // the page being revealed underneath, at its top
        }

        if (content) {
          content.style.transform = `translateY(${-contentY}px)`
        }
        pg.style.transform = `rotateY(${rotate}deg)`
        pg.style.zIndex = String(z)
        pg.style.pointerEvents = pe
        pg.style.filter = filter
        pg.style.willChange = willChange
        if (curl) {
          if (curlOp > 0) {
            curl.style.background = curlBg
            curl.style.opacity = String(curlOp)
          } else {
            curl.style.opacity = '0'
          }
        }
      }

      const bar = barRef.current
      if (bar) {
        const show = i > 0 || f > 0.15
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
    // Deep link (e.g. arriving from a chapter route via "/#projects") → jump
    // straight to that chapter, no flip animation on first load.
    const geom = geomRef.current
    const hashIdx = pageIndexForTarget(window.location.hash.slice(1))
    if (geom && hashIdx > 0) {
      const stageTopDoc = stage.getBoundingClientRect().top + window.scrollY
      window.scrollTo(0, stageTopDoc + geom.offset[hashIdx])
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    // Fonts settle after first paint and change content height → re-measure.
    document.fonts?.ready.then(() => {
      measure()
      update()
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [flip])

  // Plain base: honour a deep-link hash by scrolling to that section on mount.
  useEffect(() => {
    if (flip) return
    const id = window.location.hash.slice(1)
    if (!id) return
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
  }, [flip])

  const grain = <PaperGrain />

  // Plain base: every page is a normal stacked section, natural scroll, no 3D.
  if (!flip) {
    return (
      <>
        {grain}
        <Wordmark revealed />
        {PAGES.map((page) => (
          <section
            key={page.key}
            id={page.domId}
            style={{
              position: 'relative',
              minHeight: page.fullViewport ? '100vh' : undefined,
              overflow: 'hidden',
              background: page.frontBg,
            }}
          >
            {page.node}
          </section>
        ))}
      </>
    )
  }

  // Flip mode: one tall stage with a pinned 100vh viewport; pages turn on scroll.
  return (
    <>
      {grain}
      <Wordmark ref={barRef} />
      <div id="top" />

      {/* Height is a placeholder; measure() sets the real px height from content. */}
      <div ref={stageRef} style={{ position: 'relative', height: '100vh', background: '#0C140F' }}>
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
                {/* content wrapper — translated up as the chapter is read */}
                <div
                  ref={(el) => {
                    contentRefs.current[i] = el
                  }}
                  style={{ position: 'relative', height: page.fullViewport ? '100%' : undefined }}
                >
                  {page.node}
                </div>
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
    </>
  )
}
