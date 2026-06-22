/**
 * A faint paper grain laid over the whole viewport so cream pages read as
 * printed book stock rather than flat screen. Two multiplied layers: a fine
 * fractal "tooth" plus a soft large-scale mottle for uneven paper tone.
 * Non-interactive; opacity stays low so it never hurts text legibility.
 * Shared by the book (BookStage) and the standalone chapter routes so the
 * texture is identical everywhere.
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
        opacity: 0.07,
        mixBlendMode: 'multiply',
        backgroundImage: [
          // fine tooth
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23f)'/%3E%3C/svg%3E\")",
          // soft mottle (uneven paper tone)
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23m)'/%3E%3C/svg%3E\")",
        ].join(','),
      }}
    />
  )
}
