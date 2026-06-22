'use client'

import { useEffect, useRef, useState } from 'react'
import Caret from './Caret'

/**
 * A chapter title that idly "rewrites" itself: it deletes the last couple of
 * characters, retypes them, and — once whole again — holds for a few seconds
 * before the next pass. The blinking caret rides along at the end. Nothing
 * ever fully clears; it only ever nibbles the tail, so the title stays legible.
 *
 * SSR-safe: first paint renders the full text (state starts whole), so there's
 * no hydration mismatch and no-JS users still get the complete title. Under
 * prefers-reduced-motion the loop never starts and the title stays static.
 */
const DELETE_COUNT = 2
const DELETE_MS = 180 // per char while erasing
const TYPE_MS = 260 // per char while retyping
const HOLD_MIN_MS = 450 // brief beat at the shortest point
const HOLD_FULL_MS = 2600 // pause once the title is whole

export default function TypingTitle({
  text,
  caretColor = 'currentColor',
}: {
  text: string
  caretColor?: string
}) {
  const full = text.length
  const [count, setCount] = useState(full)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || full <= 1) return

    const min = Math.max(1, full - DELETE_COUNT)
    let c = full
    let erasing = true

    const tick = () => {
      if (erasing) {
        if (c > min) {
          c -= 1
          setCount(c)
          timer.current = setTimeout(tick, DELETE_MS)
        } else {
          erasing = false
          timer.current = setTimeout(tick, HOLD_MIN_MS)
        }
      } else {
        if (c < full) {
          c += 1
          setCount(c)
          timer.current = setTimeout(tick, TYPE_MS)
        } else {
          erasing = true
          timer.current = setTimeout(tick, HOLD_FULL_MS)
        }
      }
    }

    timer.current = setTimeout(tick, HOLD_FULL_MS)
    return () => clearTimeout(timer.current)
  }, [full])

  return (
    <>
      {text.slice(0, count)}
      <Caret color={caretColor} />
    </>
  )
}
