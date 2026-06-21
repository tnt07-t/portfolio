import { contents } from '@/lib/content'

const MONO = 'var(--font-mono)'
const DISPLAY = 'var(--font-cabinet)'

/** Page 3 — table of contents (leader dots → page numbers). Chess omitted. */
export default function Contents() {
  return (
    <div className="flex h-full w-full flex-col justify-center" style={{ padding: 'clamp(40px,6vw,84px) clamp(28px,7vw,110px)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(28px,4vw,48px)' }}>
          <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.24em', color: '#9a9082', marginBottom: 12 }}>THE REST OF THE BOOK</div>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 'clamp(34px,5vw,62px)', letterSpacing: '-0.02em' }}>Contents</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {contents.map((entry) => (
            <div key={entry.title} style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: '15px 6px', fontSize: 'clamp(18px,2vw,23px)' }}>
              <span style={{ fontFamily: DISPLAY, fontWeight: 500 }}>{entry.title}</span>
              <span className="leader" />
              <span style={{ fontFamily: MONO, fontSize: 13, color: '#9a9082' }}>{entry.page}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 'clamp(24px,4vw,40px)', fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: '#9a9082' }}>KEEP TURNING ↓</div>
      </div>
    </div>
  )
}
