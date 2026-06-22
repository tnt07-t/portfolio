'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Caret from './Caret'

/**
 * A chapter title that types itself out ONCE, the first time it scrolls into
 * view, then rests — no looping, no blink. A solid caret trails the text as a
 * quiet "this was just written" mark. Motion resolves and stays calm, so it
 * never competes with the content a recruiter is reading.
 *
 * SSR/no-JS safe: first paint renders the full title (state starts whole), so
 * there's no hydration mismatch and the title is always present without JS.
 * Under prefers-reduced-motion it stays whole and never animates. A fallback
 * timer guarantees the title types even if the observer never fires (e.g. the
 * 3D book stage), so it can't get stuck blank.
 */
const TYPE_MS = 80 // per char on the one-time reveal
const FALLBACK_MS = 1800 // type anyway if the observer hasn't fired by now

// Run before paint on the client (avoids a full→empty flash) but fall back to
// useEffect on the server, where useLayoutEffect would warn.
const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function TypingTitle({
  text,
  caretColor = 'currentColor',
}: {
  text: string
  caretColor?: string
}) {
  const full = text.length
  const [count, setCount] = useState(full)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  const willAnimate = () =>
    !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches && full > 0

  // Hide to empty before paint when we're going to type, so there's no flash.
  useIso(() => {
    if (willAnimate()) setCount(0)
  }, [full])

  useEffect(() => {
    if (!willAnimate()) return
    const el = ref.current
    if (!el) return

    let typeTimer: ReturnType<typeof setTimeout> | undefined
    const start = () => {
      if (started.current) return
      started.current = true
      let c = 0
      const tick = () => {
        c += 1
        setCount(c)
        if (c < full) typeTimer = setTimeout(tick, TYPE_MS)
      }
      tick()
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          start()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    const fallback = setTimeout(start, FALLBACK_MS)

    return () => {
      io.disconnect()
      clearTimeout(fallback)
      if (typeTimer) clearTimeout(typeTimer)
    }
  }, [full])

  return (
    <span ref={ref}>
      {text.slice(0, count)}
      <Caret color={caretColor} blink={false} />
    </span>
  )
}
