import Reveal from '../ui/Reveal'
import { TEAM } from '../../data/team'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.2 5.7.4.3.8 1 .8 2.1v3.1c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/>
  </svg>
)

function MemberCard({ member, delay }) {
  const initials = member.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  function handleImgError(e) {
    e.currentTarget.style.display = 'none'
    e.currentTarget.nextElementSibling.style.display = 'flex'
  }

  return (
    <Reveal as="article" delay={delay} className="member-card">
      {/* Tondo avatar */}
      <div className="tondo">
        <div className="tondo-ring2" />
        <div className="tondo-inner">
          <img
            src={`https://github.com/${member.user}.png`}
            alt={member.name}
            className="tondo-img"
            loading="lazy"
            onError={handleImgError}
          />
          <div className="tondo-fallback">{initials}</div>
        </div>
      </div>

      {/* Info */}
      <div style={{ fontFamily: 'var(--serif-d)', fontWeight: 600, fontSize: '23px', color: 'var(--ink)', letterSpacing: '0.01em' }}>
        {member.name}
      </div>
      <div style={{ fontFamily: 'var(--serif-b)', fontSize: '14px', color: 'var(--ink-faint)', marginTop: '3px' }}>
        @{member.user}
      </div>
      <div style={{ fontFamily: 'var(--serif-b)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bronze)', marginTop: '14px' }}>
        {member.role}
      </div>
      <div style={{ width: '26px', height: '1px', background: 'var(--line)', margin: '14px auto 0' }} />

      {/* GitHub link */}
      <a className="gh-btn" href={`https://github.com/${member.user}`} target="_blank" rel="noopener noreferrer">
        <GitHubIcon />
        Ver no GitHub
      </a>
    </Reveal>
  )
}

export default function Team() {
  return (
    <section id="confraria" style={{ padding: '120px 0', position: 'relative' }}>
      <div style={{ width: 'min(1200px, 90vw)', margin: '0 auto' }} className="px-6 md:px-0">
        {/* Section header */}
        <Reveal style={{ marginBottom: '60px', textAlign: 'center' }}>
          <span className="sec-num">— Caput II —</span>
          <h2 className="sec-title">Os <em>Goats</em></h2>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <MemberCard key={member.user} member={member} delay={`d${i % 3}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
