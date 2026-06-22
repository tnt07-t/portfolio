import type { Chapter } from '@/lib/content'
import ProjectsBody from '@/components/chapter/bodies/ProjectsBody'
import ExperienceBody from '@/components/chapter/bodies/ExperienceBody'
import SkillsBody from '@/components/chapter/bodies/SkillsBody'
import AboutBody from '@/components/chapter/bodies/AboutBody'
import ContactRow from '@/components/chapter/ContactRow'
import Caret from '@/components/Caret'

const MONO = 'var(--font-mono)'
// Chapter names use the same editorial serif (and weight) as "Tran Tran" on the cover.
const SERIF = 'var(--font-cormorant)'

/** Chapter content keyed by route, so the book leaf always renders the same
 *  body as the standalone /route — one source of markup, order can't drift. */
const BODIES: Record<string, () => React.ReactNode> = {
  '/projects': ProjectsBody,
  '/experience': ExperienceBody,
  '/skills': SkillsBody,
  '/about': AboutBody,
}

/**
 * A full chapter rendered *inside* the book — the divider-style header followed
 * by the chapter's real content (the same body the /route shows). This is what
 * the reader scrolls through; BookStage plays the page-turn when it runs out.
 * The closing chapter (About) ends on the LET'S TALK contact row so the book
 * closes on a one-click résumé + links (recruiter-first).
 */
export default function ChapterLeaf({
  chapter,
  closing = false,
}: {
  chapter: Chapter
  closing?: boolean
}) {
  const Body = BODIES[chapter.href]

  return (
    <div className="relative w-full" style={{ padding: 'clamp(88px,12vh,150px) clamp(28px,7vw,110px) clamp(40px,6vh,80px)' }}>
      <div style={{ maxWidth: 920, margin: '0 auto', width: '100%' }}>
        <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.22em', color: '#2F4A3C' }}>{chapter.number}</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(42px,7vw,96px)', letterSpacing: '-0.02em', lineHeight: 0.95, marginTop: 14, color: 'var(--forest-deep)' }}>{chapter.title}<Caret color="var(--forest-deep)" /></h2>
        <p style={{ marginTop: 16, fontSize: 'clamp(16px,1.8vw,20px)', color: '#6B6358', maxWidth: '56ch' }}>
          {chapter.blurb}
        </p>

        <div style={{ marginTop: 'clamp(32px,5vw,56px)' }}>{Body ? <Body /> : null}</div>

        {closing && <ContactRow />}

        <div style={{ marginTop: 'clamp(40px,7vw,80px)', textAlign: 'center', fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', color: '#9a9082' }}>{chapter.footer}</div>
      </div>
    </div>
  )
}
