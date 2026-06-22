import { highlights } from '@/lib/content'

const MONO = 'var(--font-mono)'
// Same serif as the cover name; titles sit a step below chapter names (lighter + smaller).
const SERIF = 'var(--font-cormorant)'

/** Page 2 — "The proof, in numbers." Numbered, metric-forward rows. */
export default function Highlights() {
  return (
    <div className="flex h-full w-full flex-col justify-center" style={{ padding: 'clamp(40px,6vw,84px) clamp(28px,7vw,110px)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%' }}>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.24em', color: '#2F4A3C', marginBottom: 14 }}>WHAT I&apos;VE SHIPPED</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(30px,4.6vw,58px)', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 'clamp(20px,3vw,36px)' }}>The proof, in numbers.</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {highlights.map((h, i) => (
            <div
              key={h.index}
              style={{
                display: 'flex',
                gap: 24,
                alignItems: 'baseline',
                flexWrap: 'wrap',
                padding: '16px 0',
                borderTop: '1px solid rgba(26,23,20,0.12)',
                borderBottom: i === highlights.length - 1 ? '1px solid rgba(26,23,20,0.12)' : undefined,
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: 12, color: '#2F4A3C', width: 26, flex: '0 0 auto' }}>{h.index}</span>
              <div style={{ flex: '1 1 280px', minWidth: 0 }}>
                <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(20px,2.4vw,28px)' }}>{h.name}</span>
                <span style={{ color: '#6B6358', fontSize: 15 }}>{h.blurb}</span>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 'clamp(13px,1.5vw,16px)', color: '#2F4A3C' }}>{h.metric}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
