import type { Metadata } from 'next'
import type { AboutPayload } from '@/lib/types'
import { fetchApi } from '@/lib/api-base'
import ChapterShell from '@/components/chapter/ChapterShell'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About — Tran Tran',
  description: 'About Tran Tran — the person behind the work.',
}

const DISPLAY = 'var(--font-cabinet)'

export default async function AboutPage() {
  const { chapter, sections, contact } = await fetchApi<AboutPayload>('/api/about')

  return (
    <ChapterShell chapter={chapter} contactKicker={contact.kicker} prevLabel="Back to the book">
      <div style={{ display: 'grid', gap: 'clamp(24px,4vw,40px)', maxWidth: '64ch' }}>
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(20px,2.4vw,26px)', color: '#2F4A3C', letterSpacing: '-0.01em' }}>{s.heading}</h2>
            <p style={{ marginTop: 10, fontSize: 'clamp(16px,1.7vw,19px)', color: '#3a352e', lineHeight: 1.7 }}>{s.body}</p>
          </section>
        ))}
      </div>
    </ChapterShell>
  )
}
