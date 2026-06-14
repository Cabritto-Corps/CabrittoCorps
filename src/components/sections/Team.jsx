import Reveal from '../ui/Reveal'
import { TEAM } from '../../data/team'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.2 5.7.4.3.8 1 .8 2.1v3.1c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/>
  </svg>
)

function MemberCard({ member, delay }) {
  const initials = member.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  function handleImgError(e) {
    e.currentTarget.style.display = 'none'
    e.currentTarget.nextElementSibling.style.display = 'flex'
  }

  return (
    <Reveal as="article" delay={delay} className="member-card">
      {/* Avatar */}
      <div className="avatar-ring">
        <div className="avatar-inner">
          <img
            src={`https://github.com/${member.user}.png`}
            alt={member.name}
            className="avatar-img"
            loading="lazy"
            onError={handleImgError}
          />
          <div className="avatar-fallback">{initials}</div>
        </div>
      </div>

      {/* Info */}
      <div
        className="text-[18px] font-bold tracking-[0.02em]"
        style={{ color: '#eef4f6' }}
      >
        {member.name}
      </div>
      <div
        className="text-[12px] mt-[5px] tracking-[0.03em]"
        style={{ color: 'var(--muted)' }}
      >
        @{member.user}
      </div>
      <div
        className="text-[10.5px] tracking-[0.14em] uppercase mt-[14px] opacity-80"
        style={{ color: 'var(--cyan)' }}
      >
        {member.role}
      </div>

      {/* GitHub link */}
      <a
        className="gh-btn"
        href={`https://github.com/${member.user}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
        github.com/{member.user}
      </a>
    </Reveal>
  )
}

export default function Team() {
  return (
    <section id="equipe" className="py-[110px] relative">
      <div className="mx-auto px-6" style={{ maxWidth: '1180px' }}>
        {/* Section header */}
        <Reveal className="mb-14">
          <div className="sec-tag"><span className="sec-tag-n">02 //</span> INTEGRANTES</div>
          <h2 className="sec-title">Quem move a Cabritto</h2>
          <p className="sec-sub">
            Quatro desenvolvedores, uma só manada.
          </p>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, i) => (
            <MemberCard
              key={member.user}
              member={member}
              delay={`d${i % 3}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
