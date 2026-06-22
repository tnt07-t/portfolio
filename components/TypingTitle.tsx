'use client'

import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Caret from './Caret'
import { BookActiveContext } from './book/bookActive'

/**
 * A chapter title that types itself out ONCE, when its page first comes on
 * screen, then rests — no looping, no blink. A solid caret trails it as a quiet
 * "just written" mark.
 *
 * How "on screen" is detected depends on context:
 *  • flip book — the 3D stage stacks every page in the same place, so an
 *    IntersectionObserver fires for all of them at once. Instead we type when
 *    BookActiveContext reports this page (triggerId) as the active, flat one.
 *  • routes & mobile book — normal document scroll, so a plain
 *    IntersectionObserver on the heading is reliable.
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
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const { mode, activeId } = useContext(BookActiveContext)

  const willAnimate = () =>
    !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches && full > 0

  const start = () => {
    if (started.current) return
    started.current = true
    let c = 0
    const tick = () => {
      c += 1
      setCount(c)
      if (c < full) timer.current = setTimeout(tick, TYPE_MS)
    }
    tick()
  }

  // Hide to empty before paint when we're going to type, so there's no flash.
  useIso(() => {
    if (willAnimate()) setCount(0)
  }, [full])

  // Flip book: type when the stage reports this page as the active, flat one.
  useEffect(() => {
    if (mode !== 'flip' || !willAnimate()) return
    if (triggerId != null && activeId === triggerId) start()
  }, [mode, activeId, triggerId, full])

  // Routes & plain (mobile) book: type when the heading scrolls into view.
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
      <Caret color={caretColor} blink={false} />
    </span>
  )
}
