import { aboutSections } from '@/lib/data/about'

const DISPLAY = 'var(--font-cabinet)'

/** The About chapter content — the prose sections. Shared by the /about route
 *  and the in-book chapter leaf. */
export default function AboutBody() {
  return (
    <div style={{ display: 'grid', gap: 'clamp(24px,4vw,40px)', maxWidth: '64ch' }}>
      {aboutSections.map((s) => (
        <section key={s.heading}>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(20px,2.4vw,26px)', color: '#2F4A3C', letterSpacing: '-0.01em' }}>{s.heading}</h2>
          <p style={{ marginTop: 10, fontSize: 'clamp(16px,1.7vw,19px)', color: '#3a352e', lineHeight: 1.7 }}>{s.body}</p>
        </section>
      ))}
    </div>
  )
}
