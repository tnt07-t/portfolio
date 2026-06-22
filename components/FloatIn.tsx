'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Reveals its child by floating it up + fading in the first time it scrolls
 * into view, then leaves it be. Gives chapter content a calm, easy-to-follow
 * cadence as the reader scrolls. A small index-based stagger lets a cluster of
 * cards cascade rather than pop in all at once.
 *
 * SSR/no-JS safe: first paint is fully visible (state starts shown), so content
 * is always present without JS and there's no hydration mismatch. Under
 * prefers-reduced-motion it never hides. A fallback timer reveals anyway if the
 * observer never fires (e.g. inside the 3D book stage), so nothing stays hidden.
 */
const RISE_PX = 18
const DUR_MS = 560
const STAGGER_MS = 70
const STAGGER_CAP = 4 // don't delay past this many cards
const FALLBACK_MS = 1800

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function FloatIn({
  children,
  index = 0,
}: {
  children: ReactNode
  index?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)
  const revealed = useRef(false)

  const willAnimate = () =>
    !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  // Hide before paint when we're going to animate, so there's no flash.
  useIso(() => {
    if (willAnimate()) setHidden(true)
  }, [])

  useEffect(() => {
    if (!willAnimate()) return
    const el = ref.current
    if (!el) return

    const reveal = () => {
      if (revealed.current) return
      revealed.current = true
      setHidden(false)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          reveal()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    const fallback = setTimeout(reveal, FALLBACK_MS)

    return () => {
      io.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  const delay = Math.min(index, STAGGER_CAP) * STAGGER_MS

  return (
    <div
      ref={ref}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${RISE_PX}px)` : 'none',
        transition: `opacity ${DUR_MS}ms ease, transform ${DUR_MS}ms cubic-bezier(0.22,1,0.36,1)`,
        transitionDelay: hidden ? '0ms' : `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
