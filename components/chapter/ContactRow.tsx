import { profile } from '@/lib/content'
import { GitHubIcon, LinkedInIcon, EmailIcon, mailHref, safeHref } from '@/components/book/icons'

const MONO = 'var(--font-mono)'

const box = {
  width: 40,
  height: 40,
  border: '1px solid rgba(47,74,60,0.3)',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#2F4A3C',
  transition: '.25s',
} as const

/** The LET'S TALK contact row — kicker, social links, one-click résumé. Shared
 *  by the chapter route shell and the in-book closing leaf so the recruiter's
 *  links and résumé button can't drift between the two. */
export default function ContactRow({ kicker = "LET'S TALK —" }: { kicker?: string }) {
  return (
    <div style={{ marginTop: 'clamp(40px,6vw,72px)', display: 'flex', gap: 11, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.16em', color: '#2F4A3C' }}>{kicker}</span>
      <a href={safeHref(profile.github)} aria-label="GitHub" style={box} className="hover:!bg-forest hover:!text-paper"><GitHubIcon size={18} /></a>
      <a href={safeHref(profile.linkedin)} aria-label="LinkedIn" style={box} className="hover:!bg-forest hover:!text-paper"><LinkedInIcon size={17} /></a>
      <a href={mailHref(profile.email)} aria-label="Email" style={box} className="hover:!bg-forest hover:!text-paper"><EmailIcon size={18} /></a>
      <a href={profile.resumeUrl} style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.04em', color: '#FCFAF6', background: '#2F4A3C', padding: '11px 18px', borderRadius: 8, marginLeft: 4 }}>RÉSUMÉ</a>
    </div>
  )
}
