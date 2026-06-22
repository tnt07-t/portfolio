import Image from 'next/image'
import { coverPopups, coverFocus, coverTerminal, profile } from '@/lib/content'
import { GitHubIcon, LinkedInIcon, EmailIcon, ResumeIcon, mailHref, safeHref } from './icons'

const SERIF = 'var(--font-cormorant)'
const MONO = 'var(--font-mono)'

/** A small gold "road" label orbiting the laptop. */
function Popup({
  popup,
  delay,
}: {
  popup: (typeof coverPopups)[number]
  delay: number
}) {
  const right = popup.side === 'right'
  return (
    <div
      style={{
        position: 'absolute',
        [popup.side]: right ? '7%' : 0,
        top: popup.top,
        zIndex: 7,
        maxWidth: '27%',
        display: 'flex',
        gap: 8,
        alignItems: 'flex-start',
        flexDirection: right ? 'row-reverse' : 'row',
        textAlign: right ? 'right' : 'left',
        animation: `popIn .6s ease ${delay}s both`,
      }}
    >
      {popup.thumb && (
        <div
          style={{
            flex: '0 0 auto',
            width: 48,
            height: 38,
            border: '1px dashed rgba(201,162,75,0.5)',
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: MONO,
            fontSize: 6,
            color: 'rgba(201,162,75,0.5)',
            lineHeight: 1.25,
          }}
        >
          {/* [PLACEHOLDER: project image] */}
          IMG
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: '0.1em', color: '#C9A24B' }}>{popup.kicker}</div>
        <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 13.5, color: '#E6C77C', lineHeight: 1.1 }}>{popup.title}</div>
        <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: '0.08em', color: 'rgba(201,162,75,0.65)' }}>{popup.sub}</div>
      </div>
    </div>
  )
}

export default function Cover() {
  const socialBox = {
    width: 28,
    height: 28,
    border: '1px solid rgba(201,162,75,0.45)',
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#C9A24B',
    transition: '.25s',
  } as const

  return (
    <>
      {/* vignette */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 82% 72% at 50% 42%, rgba(48,76,60,0.55), rgba(9,15,11,0.94) 100%)' }} />

      {/* left spine (the global SpineMenu hamburger lives over its top) */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 'clamp(26px,3.2vw,42px)', background: '#101A14', borderRight: '1px solid rgba(201,162,75,0.28)', zIndex: 5 }}>
        <div style={{ position: 'absolute', bottom: 22, left: 8, right: 8, height: 1, background: 'rgba(201,162,75,0.4)' }} />
      </div>

      {/* ornamental frame */}
      <div style={{ position: 'absolute', top: 'clamp(14px,2vw,24px)', right: 'clamp(14px,2vw,24px)', bottom: 'clamp(14px,2vw,24px)', left: 'calc(clamp(26px,3.2vw,42px) + clamp(10px,1.4vw,20px))', border: '1px solid rgba(201,162,75,0.38)', zIndex: 4, pointerEvents: 'none', animation: 'fadeIn 1s ease 0.4s both' }}>
        <div style={{ position: 'absolute', inset: 5, border: '1px solid rgba(201,162,75,0.16)' }} />
        {(['top:-4px;left:-4px', 'top:-4px;right:-4px', 'bottom:-4px;left:-4px', 'bottom:-4px;right:-4px'] as const).map((pos, i) => {
          const [a, b] = pos.split(';').map((p) => p.split(':'))
          return <div key={i} style={{ position: 'absolute', [a[0]]: a[1], [b[0]]: b[1], width: 7, height: 7, background: '#C9A24B', transform: 'rotate(45deg)' } as React.CSSProperties} />
        })}
      </div>

      {/* content column */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 'clamp(26px,3.2vw,42px)', zIndex: 7, padding: 'clamp(18px,2.4vw,32px) clamp(22px,3vw,42px) clamp(14px,1.8vw,26px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, position: 'relative', minHeight: 0, margin: 'clamp(14px,2.4vh,26px) 0' }}>
          {/* soft road */}
          <svg viewBox="0 0 360 280" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 4 }} aria-hidden>
            <path pathLength={1} d="M28,52 C150,14 132,150 200,150 C286,150 264,250 338,244" fill="none" stroke="rgba(201,162,75,0.72)" strokeWidth={1.3} strokeLinecap="round" style={{ strokeDasharray: 1, strokeDashoffset: 0, animation: 'drawLine 2.2s ease 1.1s both' }} />
            <path pathLength={1} d="M86,48 C72,42 56,33 50,27" fill="none" stroke="rgba(201,162,75,0.72)" strokeWidth={1.3} strokeLinecap="round" style={{ strokeDasharray: 1, strokeDashoffset: 0, animation: 'drawLine .3s ease 2.45s both' }} />
            <path pathLength={1} d="M150,113 C112,105 72,129 34,120" fill="none" stroke="rgba(201,162,75,0.72)" strokeWidth={1.3} strokeLinecap="round" style={{ strokeDasharray: 1, strokeDashoffset: 0, animation: 'drawLine .3s ease 3.95s both' }} />
            <path pathLength={1} d="M200,150 C148,158 92,200 40,206" fill="none" stroke="rgba(201,162,75,0.72)" strokeWidth={1.3} strokeLinecap="round" style={{ strokeDasharray: 1, strokeDashoffset: 0, animation: 'drawLine .3s ease 5.55s both' }} />
            <path pathLength={1} d="M168,136 C222,117 256,67 310,48" fill="none" stroke="rgba(201,162,75,0.72)" strokeWidth={1.3} strokeLinecap="round" style={{ strokeDasharray: 1, strokeDashoffset: 0, animation: 'drawLine .3s ease 5.95s both' }} />
            <path pathLength={1} d="M282,214 C301,213 303,189 322,188" fill="none" stroke="rgba(201,162,75,0.72)" strokeWidth={1.3} strokeLinecap="round" style={{ strokeDasharray: 1, strokeDashoffset: 0, animation: 'drawLine .3s ease 7.55s both' }} />
          </svg>

          {/* orbiting labels */}
          {coverPopups.map((p, i) => (
            <Popup key={p.title} popup={p} delay={[2.75, 4.25, 5.85, 6.25][i] ?? 2.75} />
          ))}

          {/* focus callout */}
          <div style={{ position: 'absolute', right: 0, top: '63%', zIndex: 7, maxWidth: '27%', textAlign: 'right', animation: 'popIn .6s ease 7.85s both' }}>
            <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: '0.1em', color: '#C9A24B' }}>{coverFocus.kicker}</div>
            {coverFocus.lines.map((line, i) => (
              <div key={line} style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 13.5, color: '#E6C77C', lineHeight: 1.1, marginTop: i === 0 ? 0 : 2 }}>{line}</div>
            ))}
            <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: '0.08em', color: 'rgba(201,162,75,0.65)' }}>{coverFocus.sub}</div>
          </div>

          {/* the laptop */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeUp .8s ease 0.3s both' }}>
              <div style={{ position: 'relative', width: 'clamp(316px,40vw,476px)', height: 'clamp(220px,27vw,330px)', background: '#0B130E', border: '2.5px solid rgba(201,162,75,0.6)', borderRadius: '13px 13px 5px 5px', boxShadow: '0 0 40px rgba(201,162,75,0.16),inset 0 0 56px rgba(0,0,0,0.72)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.24, animation: 'glow 2.8s ease-in-out infinite', background: 'radial-gradient(circle at 50% 40%, rgba(143,182,143,0.18), transparent 72%)' }} />

                <div data-reveal style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(14px,1.8vw,22px)', padding: 'clamp(14px,2vw,26px)', opacity: 0, animation: 'fadeUp .8s ease 0.55s both' }}>
                  <Image src="/assets/author.png" alt={`Portrait of ${profile.name}`} width={356} height={448} style={{ flex: '0 0 auto', height: 'clamp(142px,18vw,212px)', width: 'auto', maxWidth: '47%', objectFit: 'cover', objectPosition: '50% 28%', borderRadius: 9, border: '1px solid rgba(201,162,75,0.5)', boxShadow: '0 12px 28px rgba(0,0,0,0.55)' }} priority />
                  <div style={{ minWidth: 0 }}>
                    <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(24px,2.9vw,40px)', lineHeight: 0.9, letterSpacing: '0.01em', color: '#E8C97A', textShadow: '0 1px 2px rgba(0,0,0,0.55)', whiteSpace: 'nowrap' }}>{profile.name}</h1>
                    <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(11px,1.25vw,14px)', color: 'rgba(216,180,94,0.92)', marginTop: 3, whiteSpace: 'nowrap' }}>{profile.tagline}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                      <a href={safeHref(profile.github)} aria-label="GitHub" title="GitHub" style={socialBox} className="hover:!bg-gold hover:!text-cover hover:!border-gold"><GitHubIcon size={14} /></a>
                      <a href={safeHref(profile.linkedin)} aria-label="LinkedIn" title="LinkedIn" style={socialBox} className="hover:!bg-gold hover:!text-cover hover:!border-gold"><LinkedInIcon size={13} /></a>
                      <a href={mailHref(profile.email)} aria-label="Email" title="Email" style={socialBox} className="hover:!bg-gold hover:!text-cover hover:!border-gold"><EmailIcon size={14} /></a>
                      <a href={profile.resumeUrl} aria-label="Résumé" title="Résumé" style={socialBox} className="hover:!bg-gold hover:!text-cover hover:!border-gold"><ResumeIcon size={13} /></a>
                    </div>
                    <p style={{ fontFamily: SERIF, fontSize: 'clamp(9px,0.95vw,11.5px)', lineHeight: 1.45, color: 'rgba(216,180,94,0.82)', marginTop: 10, maxWidth: '30ch', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{profile.bio}</p>
                  </div>
                </div>

                {/* terminal line: types the categories */}
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 9, height: 14, textAlign: 'center', fontFamily: MONO, fontSize: 10, color: '#A6D2AE' }}>
                  {coverTerminal.map((cmd, i) => {
                    const anims = [
                      'fadeIn .01s linear 1.6s forwards, typech .8s steps(9) 1.6s forwards, termOut .3s ease 2.9s forwards',
                      'fadeIn .01s linear 3.1s forwards, typech .8s steps(9) 3.1s forwards, termOut .3s ease 4.4s forwards',
                      'fadeIn .01s linear 4.6s forwards, typech .9s steps(13) 4.6s forwards, termOut .3s ease 6.8s forwards',
                      'fadeIn .01s linear 6.9s forwards, typech .6s steps(7) 6.9s forwards',
                    ]
                    return (
                      <span key={cmd} style={{ position: 'absolute', left: 0, right: 0, display: 'block', overflow: 'hidden', whiteSpace: 'nowrap', width: '13ch', margin: '0 auto', opacity: 0, animation: anims[i] }}>{cmd}</span>
                    )
                  })}
                  <span style={{ position: 'absolute', left: '50%', marginLeft: 46, top: 1, width: 6, height: 11, background: '#C9A24B', animation: 'blink 1s step-end infinite 1.6s' }} />
                </div>
              </div>
              {/* laptop base */}
              <div style={{ width: 'calc(clamp(316px,40vw,476px) + 58px)', height: 12, background: 'linear-gradient(#A9822F,#6E531E)', borderRadius: '0 0 11px 11px', boxShadow: '0 11px 24px rgba(0,0,0,0.55)' }} />
              <div style={{ width: 92, height: 5, background: '#5E481A', borderRadius: '0 0 4px 4px' }} />
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div style={{ display: 'flex', justifyContent: 'center', animation: 'fadeIn 1s ease 8.5s both' }}>
          <span style={{ display: 'inline-block', width: 11, height: 11, borderRight: '1.5px solid rgba(201,162,75,0.7)', borderBottom: '1.5px solid rgba(201,162,75,0.7)', animation: 'cuebob 2.4s ease-in-out infinite' }} />
        </div>
      </div>
    </>
  )
}
