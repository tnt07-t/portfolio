/**
 * A non-typing text caret that blinks beside a chapter title — as if a line
 * is about to be written, but nothing ever types. Decorative only (aria-hidden).
 * Sized in em so it scales with the heading; sits on the text baseline.
 * Under prefers-reduced-motion the global rule freezes the blink, leaving a
 * solid caret. Reuses the `blink` keyframe in globals.css.
 */
export default function Caret({ color = 'currentColor' }: { color?: string }) {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-block',
        width: '0.065em',
        height: '0.78em',
        marginLeft: '0.16em',
        background: color,
        verticalAlign: 'baseline',
        animation: 'blink 1.05s step-end infinite',
      }}
    />
  )
}
