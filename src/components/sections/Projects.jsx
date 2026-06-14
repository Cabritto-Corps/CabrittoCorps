import { useRef } from 'react'
import Reveal          from '../ui/Reveal'
import useGitHubRepos  from '../../hooks/useGitHubRepos'

/* ── helpers ── */
function StatDot() {
  return (
    <span
      className="w-[6px] h-[6px] rounded-full inline-block"
      style={{ background: 'var(--cyan)', boxShadow: 'var(--glow)' }}
    />
  )
}

function SkeletonCard() {
  return (
    <div className="proj-card animate-pulse">
      <div className="flex justify-between mb-5">
        <div className="h-3 w-16 rounded" style={{ background: 'var(--border)' }} />
        <div className="h-3 w-20 rounded" style={{ background: 'var(--border)' }} />
      </div>
      <div className="h-6 w-2/3 rounded mb-3" style={{ background: 'var(--border)' }} />
      <div className="space-y-2">
        <div className="h-3 w-full rounded" style={{ background: 'var(--border)' }} />
        <div className="h-3 w-4/5 rounded" style={{ background: 'var(--border)' }} />
      </div>
      <div className="flex gap-2 mt-5">
        <div className="h-5 w-14 rounded" style={{ background: 'var(--border)' }} />
        <div className="h-5 w-16 rounded" style={{ background: 'var(--border)' }} />
      </div>
    </div>
  )
}

/* ── project card ── */
function ProjectCard({ repo, index, delay }) {
  const cardRef = useRef(null)

  function handlePointerMove(e) {
    const r = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mx', e.clientX - r.left + 'px')
    cardRef.current.style.setProperty('--my', e.clientY - r.top  + 'px')
  }

  return (
    <Reveal as="article" delay={delay}>
      <div ref={cardRef} className="proj-card h-full" onPointerMove={handlePointerMove}>
        {/* Card header */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-[12px] tracking-[0.1em]" style={{ color: 'var(--muted-2)' }}>
            PRJ_{String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="flex items-center gap-[7px] text-[10.5px] tracking-[0.14em] uppercase"
            style={{ color: 'var(--cyan)' }}
          >
            <StatDot /> {repo.stat}
          </span>
        </div>

        {/* Repo name */}
        <div
          className="text-[22px] font-extrabold tracking-[0.02em] mb-3 break-all"
          style={{ color: '#eef4f6' }}
        >
          <span style={{ color: 'var(--cyan)' }}>[</span>
          {repo.name}
          <span style={{ color: 'var(--cyan)' }}>]</span>
        </div>

        {/* Description */}
        <p
          className="text-[13.5px] leading-[1.7] min-h-[3.4em]"
          style={{ color: 'var(--muted)' }}
        >
          {repo.desc}
        </p>

        {/* Tags */}
        {repo.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {repo.tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] tracking-[0.04em] px-[11px] py-[5px] rounded-[3px]"
                style={{
                  color:      'var(--cyan)',
                  border:     '1px solid var(--cyan-soft)',
                  background: 'rgba(0,229,255,0.05)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div
          className="mt-5 pt-[18px] flex items-center justify-between"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <span className="text-[11px] tracking-[0.06em]" style={{ color: 'var(--muted-2)' }}>
            {repo.meta}
          </span>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-go flex items-center gap-2 text-[12px] no-underline transition-all duration-200"
            style={{ color: 'var(--muted)' }}
          >
            ver no GitHub →
          </a>
        </div>
      </div>
    </Reveal>
  )
}

/* ── section ── */
export default function Projects() {
  const { repos, loading, error } = useGitHubRepos()

  return (
    <section id="projetos" className="py-[110px] relative">
      <div className="mx-auto px-6" style={{ maxWidth: '1180px' }}>
        {/* Section header */}
        <Reveal className="mb-14">
          <div className="sec-tag"><span className="sec-tag-n">01 //</span> PORTFÓLIO</div>
          <h2 className="sec-title">Projetos da manada</h2>
          <p className="sec-sub">
            Repositórios públicos da{' '}
            <a
              href="https://github.com/Cabritto-Corps"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--cyan)', textDecoration: 'none' }}
            >
              @Cabritto-Corps
            </a>
            {' '}ordenados por popularidade, carregados em tempo real.
          </p>
        </Reveal>

        {/* Error state */}
        {error && (
          <div
            className="text-center py-10 text-[13px] tracking-[0.05em]"
            style={{ color: 'var(--muted)' }}
          >
            // erro ao buscar repositórios: {error}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : repos.map((repo, i) => (
                <ProjectCard
                  key={repo.name}
                  repo={repo}
                  index={i}
                  delay={`d${i % 3}`}
                />
              ))
          }
        </div>

        {!loading && !error && (
          <Reveal className="mt-[26px]">
            <p className="text-[11px] tracking-[0.05em]" style={{ color: 'var(--muted-2)' }}>
              // {repos.length} repositório{repos.length !== 1 ? 's' : ''} encontrado{repos.length !== 1 ? 's' : ''} em{' '}
              <a
                href="https://github.com/Cabritto-Corps"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--muted)', textDecoration: 'none' }}
              >
                github.com/Cabritto-Corps
              </a>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
