import { skillGroups } from '@/lib/data/skills'

const MONO = 'var(--font-mono)'
const DISPLAY = 'var(--font-cabinet)'

/** The Skills chapter content — grouped skill chips. Shared by the /skills
 *  route and the in-book chapter leaf. */
export default function SkillsBody() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 'clamp(20px,3vw,32px)' }}>
      {skillGroups.map((g) => (
        <section key={g.category} style={{ background: '#FFFFFF', border: '1px solid rgba(26,23,20,0.06)', borderRadius: 4, padding: 'clamp(18px,2.4vw,26px)', boxShadow: '0 1px 2px rgba(22,36,27,0.05), 0 10px 30px rgba(22,36,27,0.06)' }}>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(18px,2vw,22px)', color: '#2F4A3C', letterSpacing: '-0.01em' }}>{g.category}</h2>
          <ul style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {g.items.map((s) => (
              <li key={s} style={{ listStyle: 'none', fontFamily: MONO, fontSize: 13, color: '#1A1714', border: '1px solid rgba(26,23,20,0.14)', borderRadius: 999, padding: '6px 13px' }}>{s}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
