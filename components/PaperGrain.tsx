/**
 * A paper texture laid over the whole viewport so the cream pages read as
 * printed book stock rather than flat screen. Two fixed, non-interactive
 * layers, both multiplied onto the paper so they only ever deepen tone:
 *
 *  1. A warm wash + faint vignette — nudges the cream toward aged paper and
 *     hints at a sheet catching light, so it doesn't look screen-white.
 *  2. Grain — vertical fibres (anisotropic noise), a fine tooth, and a soft
 *     large-scale mottle for uneven stock. Together these are what the eye
 *     reads as "paper" instead of digital noise.
 *
 * Opacity stays low so text legibility is untouched. Shared by the book
 * (BookStage) and the standalone chapter routes so the texture is identical.
 */

// Vertical paper fibres: low x-frequency, high y-frequency → faint streaks.
const FIBRES =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.009 0.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23a)'/%3E%3C/svg%3E\")"

// Fine tooth: the close-up grain of the sheet.
const TOOTH =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='b'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23b)'/%3E%3C/svg%3E\")"

// Soft mottle: large-scale unevenness in the stock.
const MOTTLE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.013' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='480' height='480' filter='url(%23c)'/%3E%3C/svg%3E\")"

export default function PaperGrain() {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 59,
          mixBlendMode: 'multiply',
          background:
            'radial-gradient(125% 135% at 50% 32%, rgba(247,240,222,0) 58%, rgba(206,188,150,0.42) 100%)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 60,
          opacity: 0.1,
          mixBlendMode: 'multiply',
          backgroundImage: [FIBRES, TOOTH, MOTTLE].join(','),
          backgroundSize: '240px 100%, 180px 180px, 480px 480px',
        }}
      />
    </>
  )
}
