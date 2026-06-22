import { experience } from '@/lib/data/experience'

const MONO = 'var(--font-mono)'
const DISPLAY = 'var(--font-cabinet)'

/** The Experience chapter content — the timeline of roles. Shared by the
 *  /experience route and the in-book chapter leaf. */
export default function ExperienceBody() {
  return (
    <div style={{ display: 'grid', gap: 'clamp(24px,4vw,40px)' }}>
      {experience.map((e) => (
        <article key={e.org} style={{ background: '#FFFFFF', borderLeft: '3px solid #2F4A3C', borderRadius: 4, padding: 'clamp(18px,2.6vw,30px)', boxShadow: '0 1px 2px rgba(22,36,27,0.05), 0 10px 30px rgba(22,36,27,0.06)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 12, justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 'clamp(22px,2.8vw,32px)', letterSpacing: '-0.02em', color: '#2F4A3C' }}>{e.org}</h2>
            <span style={{ fontFamily: MONO, fontSize: 12, color: '#9a9082' }}>{e.period}</span>
          </div>
          <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 13, color: '#2F4A3C' }}>{e.role}</div>
          <p style={{ marginTop: 12, fontSize: 'clamp(15px,1.6vw,18px)', color: '#1A1714', maxWidth: '62ch' }}>{e.summary}</p>
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
