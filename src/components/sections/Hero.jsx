import { useEffect, useRef } from 'react'
import useTypewriter from '../../hooks/useTypewriter'

const PHRASES = [
  'Desenvolvimento & Infraestrutura.',
  'Construímos sistemas que não dormem.',
  '4 desenvolvedores. 1 manada.',
  'Código limpo. Deploy implacável.',
]

export default function Hero() {
  const glitchRef = useRef(null)
  const typedText = useTypewriter(PHRASES)

  useEffect(() => {
    const timeout = setTimeout(() => {
      glitchRef.current?.classList.add('go')
    }, 200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <header
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ paddingTop: '120px', paddingBottom: '80px' }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: '1180px' }}>
        {/* Floating logo */}
        <img
          className="hero-logo"
          src="/assets/goat.svg"
          alt="Cabritto Corps"
        />

        {/* Eyebrow */}
        <div className="eyebrow">Desenvolvimento &amp; Infraestrutura</div>

        {/* Glitch title */}
        <h1
          ref={glitchRef}
          className="glitch-title"
          data-text="CABRITTO CORPS"
        >
          CABRITTO CORPS
        </h1>

        {/* Typewriter */}
        <p
          className="mt-6 min-h-[1.6em] tracking-[0.01em]"
          style={{ fontSize: 'clamp(14px, 2.4vw, 20px)', color: 'var(--text)' }}
        >
          <span style={{ color: 'var(--cyan)' }}>&gt;&nbsp;</span>
          {typedText}
          <span className="caret" />
        </p>

        {/* CTA Buttons */}
        <div className="mt-11 flex gap-4 flex-wrap justify-center">
          <a href="#projetos" className="btn-primary">
            Conheça nossos Projetos <span className="arrow">→</span>
          </a>
          <a href="#equipe" className="btn-ghost">
            Ver a Equipe
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 uppercase"
        style={{ fontSize: '10.5px', letterSpacing: '0.25em', color: 'var(--muted)' }}
      >
        <span>scroll</span>
        <span className="scroll-hint-bar" />
      </div>
    </header>
  )
}
