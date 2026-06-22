'use client'

import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Caret from './Caret'
import { BookActiveContext } from './book/bookActive'

/**
 * A chapter title that types itself out ONCE, fully, with a solid (non-blinking)
 * caret. Once it starts it always runs to completion — further scrolling never
 * interrupts it — and it never replays, so the title is always shown whole and
 * readable. No looping.
 *
 * When it starts depends on context:
 *  • flip book — the 3D stage stacks every page in the same place, so an
 *    IntersectionObserver can't tell which is shown. BookActiveContext reports
 *    the page coming into view (this page = triggerId); the title types the
 *    first time its page becomes active (forward or backward).
 *  • routes & mobile book — normal document scroll, so a plain
 *    IntersectionObserver fires the first time the heading scrolls into view.
 *
 * SSR/no-JS safe: first paint renders the full title (state starts whole), so
 * the title is always present and there's no hydration mismatch. Under
 * prefers-reduced-motion it stays whole and never animates.
 */
const TYPE_MS = 80 // per char on the one-time reveal
const FALLBACK_MS = 1800 // routes only: type anyway if the observer never fires

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function TypingTitle({
  text,
  caretColor = 'currentColor',
  triggerId,
}: {
  text: string
  caretColor?: string
  /** This page's book domId; set inside the book so the stage can trigger it. */
  triggerId?: string
}) {
  const full = text.length
  const [count, setCount] = useState(full)
  const [done, setDone] = useState(false) // hide the caret once fully typed
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false) // type exactly once, ever
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const { mode, activeId } = useContext(BookActiveContext)

  const willAnimate = () =>
    !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches && full > 0

  // Reveal from empty and run to completion. Guarded by `started` so it fires
  // once, and the tick chain is never cleared by scrolling, so it always
  // finishes typing the whole title.
  const start = () => {
    if (started.current) return
    started.current = true
    let c = 0
    setCount(0)
    const tick = () => {
      c += 1
      setCount(c)
      if (c < full) timer.current = setTimeout(tick, TYPE_MS)
      else setDone(true) // finished — drop the caret
    }
    timer.current = setTimeout(tick, TYPE_MS)
  }

  // Hide to empty before paint when we're going to type, so there's no flash.
  // When we won't animate (reduced motion / no JS), the title is already whole,
  // so mark it done and show no caret.
  useIso(() => {
    if (willAnimate()) setCount(0)
    else setDone(true)
  }, [full])

  // Flip book: type the first time this page becomes the one coming into view.
  useEffect(() => {
    if (mode !== 'flip' || !willAnimate()) return
    if (triggerId != null && activeId === triggerId) start()
  }, [mode, activeId, triggerId, full])

  // Routes & plain (mobile) book: type the first time the heading scrolls in.
  useEffect(() => {
    if (mode === 'flip' || !willAnimate()) return
    const el = ref.current
    if (!el) return
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
    // Standalone routes only get a safety net; IO is reliable on normal scroll.
    const fallback = mode === 'none' ? setTimeout(start, FALLBACK_MS) : undefined
    return () => {
      io.disconnect()
      if (fallback) clearTimeout(fallback)
    }
  }, [mode, full])

  // Clear any pending type tick on unmount.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  return (
    <span ref={ref}>
      {text.slice(0, count)}
      {!done && <Caret color={caretColor} blink={false} />}
    </span>
  )
}
