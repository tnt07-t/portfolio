import { aboutSections } from '@/lib/data/about'
import FloatIn from '@/components/FloatIn'

const DISPLAY = 'var(--font-cabinet)'

/** The About chapter content — the prose sections. Shared by the /about route
 *  and the in-book chapter leaf. */
export default function AboutBody() {
  return (
    <div style={{ display: 'grid', gap: 'clamp(24px,4vw,40px)' }}>
      {aboutSections.map((s, i) => (
        <FloatIn key={s.heading} index={i}>
        <section style={{ background: '#FFFFFF', border: '1px solid rgba(26,23,20,0.06)', borderRadius: 4, padding: 'clamp(20px,2.8vw,30px)', boxShadow: '0 1px 2px rgba(22,36,27,0.05), 0 10px 30px rgba(22,36,27,0.06)' }}>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(20px,2.4vw,26px)', color: '#2F4A3C', letterSpacing: '-0.01em' }}>{s.heading}</h2>
          <p style={{ marginTop: 10, fontSize: 'clamp(16px,1.7vw,19px)', color: '#1A1714', lineHeight: 1.7 }}>{s.body}</p>
        </section>
        </FloatIn>
      ))}
    </div>
  )
}
