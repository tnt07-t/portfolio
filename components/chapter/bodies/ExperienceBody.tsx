import { experience } from '@/lib/data/experience'

const MONO = 'var(--font-mono)'
const DISPLAY = 'var(--font-cabinet)'

/** The Experience chapter content — the timeline of roles. Shared by the
 *  /experience route and the in-book chapter leaf. */
export default function ExperienceBody() {
  return (
    <div style={{ display: 'grid', gap: 'clamp(24px,4vw,40px)' }}>
      {experience.map((e) => (
        <article key={e.org} style={{ borderLeft: '2px solid #2F4A3C', paddingLeft: 'clamp(16px,2.4vw,28px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 12, justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 'clamp(22px,2.8vw,32px)', letterSpacing: '-0.02em' }}>{e.org}</h2>
            <span style={{ fontFamily: MONO, fontSize: 12, color: '#9a9082' }}>{e.period}</span>
          </div>
          <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 13, color: '#2F4A3C' }}>{e.role}</div>
          <p style={{ marginTop: 12, fontSize: 'clamp(15px,1.6vw,18px)', color: '#6B6358', maxWidth: '62ch' }}>{e.summary}</p>
          <ul style={{ marginTop: 12, paddingLeft: 18, color: '#1A1714' }}>
            {e.highlights.map((h) => (
              <li key={h} style={{ fontSize: 'clamp(14px,1.5vw,16px)', marginTop: 6 }}>{h}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
