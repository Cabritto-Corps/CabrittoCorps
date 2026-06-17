import { useRef } from 'react'
import Reveal         from '../ui/Reveal'
import useGitHubRepos from '../../hooks/useGitHubRepos'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

function SkeletonFolio() {
  return (
    <div className="folio animate-pulse">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div style={{ height: '16px', width: '60px', background: 'var(--line)', borderRadius: '2px' }} />
        <div style={{ height: '16px', width: '80px', background: 'var(--line)', borderRadius: '2px' }} />
      </div>
      <div style={{ height: '32px', width: '55%', background: 'var(--line)', borderRadius: '2px', marginBottom: '12px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ height: '14px', width: '100%', background: 'var(--line)', borderRadius: '2px' }} />
        <div style={{ height: '14px', width: '80%', background: 'var(--line)', borderRadius: '2px' }} />
      </div>
      <div style={{ display: 'flex', gap: '9px', marginTop: '22px' }}>
        <div style={{ height: '26px', width: '60px', background: 'var(--line)', borderRadius: '2px' }} />
        <div style={{ height: '26px', width: '70px', background: 'var(--line)', borderRadius: '2px' }} />
      </div>
    </div>
  )
}

function FolioCard({ repo, index, delay }) {
  const cardRef = useRef(null)

  function handlePointerMove(e) {
    const r = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mx', (e.clientX - r.left) + 'px')
    cardRef.current.style.setProperty('--my', (e.clientY - r.top)  + 'px')
  }

  return (
    <Reveal as="article" delay={delay}>
      <div ref={cardRef} className="folio" onPointerMove={handlePointerMove}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '18px' }}>
          <span style={{ fontFamily: 'var(--serif-d)', fontStyle: 'italic', fontSize: '19px', color: 'var(--gold)', letterSpacing: '0.08em' }}>
            Folio {ROMAN[index] ?? index + 1}
          </span>
          <span style={{ fontFamily: 'var(--serif-b)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bronze)' }}>
            {repo.stat}
          </span>
        </div>

        {/* Name */}
        <div style={{ fontFamily: 'var(--serif-d)', fontWeight: 600, fontSize: '32px', letterSpacing: '0.01em', color: 'var(--ink)', lineHeight: 1.05 }}>
          {repo.name}
        </div>

        {/* Description */}
        <p style={{ marginTop: '12px', fontSize: '17px', color: 'var(--ink-soft)', minHeight: '3.2em' }}>
          {repo.desc}
        </p>

        {/* Tags */}
        {repo.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px', marginTop: '22px' }}>
            {repo.tags.map(tag => (
              <span
                key={tag}
                style={{ fontFamily: 'var(--serif-b)', fontSize: '13px', letterSpacing: '0.08em', color: 'var(--umber)', padding: '4px 13px', border: '1px solid var(--line)', borderRadius: '2px', background: 'rgba(140,121,97,0.07)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--serif-d)', fontStyle: 'italic', fontSize: '15px', color: 'var(--ink-faint)' }}>
            {repo.meta}
          </span>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="folio-go"
            style={{ fontFamily: 'var(--serif-b)', fontSize: '14px', letterSpacing: '0.06em', color: 'var(--bronze)', display: 'inline-flex', gap: '8px', alignItems: 'center', transition: 'color .25s ease, gap .25s ease', textDecoration: 'none' }}
          >
            examinar →
          </a>
        </div>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos()

  return (
    <section id="obras" style={{ padding: '120px 0', position: 'relative' }}>
      <div style={{ width: 'min(1200px, 90vw)', margin: '0 auto' }} className="px-6 md:px-0">
        {/* Section header */}
        <Reveal style={{ marginBottom: '60px' }}>
          <span className="sec-num">— Caput I —</span>
          <h2 className="sec-title"><em>Projetos</em></h2>
          <p className="sec-sub">{' '}
            Repositórios da{' '}
            <a href="https://github.com/Cabritto-Corps" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
              @Cabritto-Corps
            </a>.
          </p>
        </Reveal>

        {/* Error */}
        {error && (
          <p style={{ textAlign: 'center', padding: '40px 0', fontFamily: 'var(--serif-d)', fontStyle: 'italic', color: 'var(--ink-faint)' }}>
            Erro ao consultar os arquivos: {error}
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[26px]">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonFolio key={i} />)
            : repos.map((repo, i) => (
                <FolioCard key={repo.name} repo={repo} index={i} delay={`d${i % 3}`} />
              ))
          }
        </div>

        {!loading && !error && (
          <Reveal>
            <p style={{ marginTop: '28px', fontFamily: 'var(--serif-d)', fontStyle: 'italic', fontSize: '15px', color: 'var(--ink-faint)', textAlign: 'center' }}>
              ❧ {repos.length} {repos.length === 1 ? 'repositório encontrado' : 'repositórios encontrados'} em github.com/Cabritto-Corps
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
