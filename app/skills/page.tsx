import type { Metadata } from 'next'
import { skillGroups, skillsChapter } from '@/lib/data/skills'
import ChapterShell from '@/components/chapter/ChapterShell'

export const metadata: Metadata = {
  title: 'Skills — Tran Tran',
  description: 'The stack Tran Tran works in, end to end.',
}

const MONO = 'var(--font-mono)'
const DISPLAY = 'var(--font-cabinet)'

export default function SkillsPage() {
  const chapter = skillsChapter
  const groups = skillGroups

  return (
    <ChapterShell chapter={chapter} prevLabel="Back to the book">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 'clamp(20px,3vw,32px)' }}>
        {groups.map((g) => (
          <section key={g.category}>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(18px,2vw,22px)', color: '#2F4A3C', letterSpacing: '-0.01em' }}>{g.category}</h2>
            <ul style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {g.items.map((s) => (
                <li key={s} style={{ listStyle: 'none', fontFamily: MONO, fontSize: 13, color: '#1A1714', border: '1px solid rgba(26,23,20,0.14)', borderRadius: 999, padding: '6px 13px' }}>{s}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </ChapterShell>
  )
}
