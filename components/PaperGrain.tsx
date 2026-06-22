/**
 * A clean, even paper tooth laid over the whole viewport so cream pages read
 * as printed stock rather than flat screen. Deliberately ONE fine, uniform
 * grain — high frequency, single octave so it speckles evenly instead of
 * clumping into cloudy blotches (which read as dirt). Multiplied at low
 * opacity so it only just deepens tone and never touches legibility.
 * Shared by the book (BookStage) and the standalone chapter routes.
 */
export default function PaperGrain() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 60,
        opacity: 0.05,
        mixBlendMode: 'multiply',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23p)'/%3E%3C/svg%3E\")",
      }}
    />
  )
}
