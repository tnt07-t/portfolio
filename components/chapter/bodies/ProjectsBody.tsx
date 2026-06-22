import { projects } from '@/lib/data/projects'

const MONO = 'var(--font-mono)'
const DISPLAY = 'var(--font-cabinet)'

/** The Projects chapter content — the project card grid. Shared by the /projects
 *  route and the in-book chapter leaf so there's a single source of markup. */
export default function ProjectsBody() {
  return (
    <div style={{ display: 'grid', gap: 'clamp(20px,3vw,32px)' }}>
      {projects.map((p) => (
        <article
          key={p.name}
          style={{ border: '1px solid rgba(26,23,20,0.06)', borderRadius: 4, padding: 'clamp(20px,3vw,32px)', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(22,36,27,0.05), 0 10px 30px rgba(22,36,27,0.06)' }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 12, justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 'clamp(24px,3vw,34px)', letterSpacing: '-0.02em', color: '#2F4A3C' }}>{p.name}</h2>
            <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.04em', color: '#2F4A3C' }}>{p.role}</span>
          </div>
          <p style={{ marginTop: 12, fontSize: 'clamp(15px,1.6vw,18px)', color: '#1A1714', maxWidth: '62ch' }}>{p.summary}</p>
          <div style={{ marginTop: 14, fontFamily: MONO, fontSize: 14, fontWeight: 600, color: '#1A1714' }}>{p.metric}</div>
          <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {p.stack.map((s) => (
              <span key={s} style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.04em', color: '#2F4A3C', border: '1px solid rgba(47,74,60,0.3)', borderRadius: 999, padding: '4px 11px' }}>{s}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
