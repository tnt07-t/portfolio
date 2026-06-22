import type { Metadata } from 'next'
import { projects, projectsChapter } from '@/lib/data/projects'
import ChapterShell from '@/components/chapter/ChapterShell'

export const metadata: Metadata = {
  title: 'Projects — Tran Tran',
  description: 'Projects by Tran Tran — Uplift (1,000+ downloads), Lumeo, SupplyBistro.',
}

const MONO = 'var(--font-mono)'
const DISPLAY = 'var(--font-cabinet)'

export default function ProjectsPage() {
  const chapter = projectsChapter

  return (
    <ChapterShell chapter={chapter} prevLabel="Back to the book">
      <div style={{ display: 'grid', gap: 'clamp(20px,3vw,32px)' }}>
        {projects.map((p) => (
          <article
            key={p.name}
            style={{ border: '1px solid rgba(26,23,20,0.12)', borderRadius: 4, padding: 'clamp(20px,3vw,32px)', background: '#FFFDF9' }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 12, justifyContent: 'space-between' }}>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 'clamp(24px,3vw,34px)', letterSpacing: '-0.02em' }}>{p.name}</h2>
              <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.04em', color: '#2F4A3C' }}>{p.role}</span>
            </div>
            <p style={{ marginTop: 12, fontSize: 'clamp(15px,1.6vw,18px)', color: '#6B6358', maxWidth: '62ch' }}>{p.summary}</p>
            <div style={{ marginTop: 14, fontFamily: MONO, fontSize: 14, fontWeight: 600, color: '#1A1714' }}>{p.metric}</div>
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {p.stack.map((s) => (
                <span key={s} style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.04em', color: '#2F4A3C', border: '1px solid rgba(47,74,60,0.3)', borderRadius: 999, padding: '4px 11px' }}>{s}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </ChapterShell>
  )
}
