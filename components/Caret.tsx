/**
 * A non-typing text caret that blinks beside a chapter title — as if a line
 * is about to be written, but nothing ever types. Decorative only (aria-hidden).
 * Sized in em so it scales with the heading; sits on the text baseline.
 * Under prefers-reduced-motion the global rule freezes the blink, leaving a
 * solid caret. Reuses the `blink` keyframe in globals.css.
 */
export default function Caret({
  color = 'currentColor',
  blink = true,
}: {
  color?: string
  blink?: boolean
}) {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-block',
        width: '0.07em',
        height: '0.72em',
        marginLeft: '0.12em',
        background: color,
        verticalAlign: 'baseline',
        // Bottom sits on the baseline; nudge down a touch so the caret reads as
        // grounded on the writing line rather than floating above it.
        transform: 'translateY(0.06em)',
        animation: blink ? 'blink 1.05s step-end infinite' : undefined,
      }}
    />
  )
}
