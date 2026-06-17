import { useEffect, useRef } from 'react'
import useTypewriter from '../../hooks/useTypewriter'

const PHRASES = [
  'Desenvolvimento & Infraestrutura.',
  'Construímos sistemas em proporção perfeita.',
  'Quatro artífices. Um só rebanho.',
  'Engenho do Renascimento, ofício de hoje.',
]

export default function Hero() {
  const plateRef = useRef(null)
  const videoRef = useRef(null)
  const typedText = useTypewriter(PHRASES)

  useEffect(() => {
    const plate = plateRef.current
    if (!plate) return

    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { plate.classList.add('in'); io.disconnect() } },
      { threshold: 0.3 },
    )
    io.observe(plate)

    let ptx = 0, pty = 0, px = 0, py = 0, animId

    function onPointerMove(e) {
      ptx = e.clientX / innerWidth  - 0.5
      pty = e.clientY / innerHeight - 0.5
    }

    function loop() {
      px += (ptx - px) * 0.06
      py += (pty - py) * 0.06
      plate.style.transform = `perspective(1100px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateZ(0)`
      animId = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    loop()

    return () => {
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  function handleLogoClick() {
    if (!videoRef.current) return
    videoRef.current.currentTime = 0
    videoRef.current.play()
  }

  return (
    <header
      id="proemio"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 0 70px', position: 'relative' }}
    >
      <div style={{ width: 'min(1200px, 90vw)', margin: '0 auto' }} className="px-6 md:px-0">
        <div className="hero-grid">

          {/* ── Left: text ── */}
          <div>
            {/* Eyebrow */}
            <div style={{ marginBottom: '26px', display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ width: '30px', height: '1px', background: 'var(--line)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--serif-b)', fontSize: '13px', letterSpacing: '0.34em', textTransform: 'uppercase', color: 'var(--bronze)', fontWeight: 600 }}>
                Ars · Scientia · Infraestrutura
              </span>
              <span style={{ width: '30px', height: '1px', background: 'var(--line)', flexShrink: 0 }} />
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: 'var(--serif-d)', fontWeight: 600, lineHeight: 0.92, fontSize: 'clamp(56px, 9vw, 122px)', letterSpacing: '-0.01em', color: 'var(--ink)' }}>
              Cabritto Corps
              <span style={{ display: 'block', fontStyle: 'italic', fontWeight: 500, color: 'var(--bronze)', fontSize: '0.46em', letterSpacing: '0.02em', marginTop: '0.15em' }}>
                a proporção perfeita do código
              </span>
            </h1>

            {/* Typewriter */}
            <p style={{ marginTop: '26px', fontFamily: 'var(--serif-d)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(19px, 2.6vw, 27px)', color: 'var(--ink-soft)', minHeight: '1.5em', letterSpacing: '0.01em' }}>
              {typedText}<span className="typed-caret" />
            </p>

            {/* CTAs */}
            <div style={{ marginTop: '40px', display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
              <a href="#obras" className="btn-primary">
                Conheça nossos projetos <span className="arrow">→</span>
              </a>
              <a href="#confraria" className="btn-ghost">Os Goats</a>
            </div>

            {/* Motto */}
            <p style={{ marginTop: '34px', fontFamily: 'var(--serif-d)', fontStyle: 'italic', fontSize: '16px', color: 'var(--ink-faint)', letterSpacing: '0.04em' }}>
              "Onde a engenharia encontra a geometria divina."
            </p>
          </div>

          {/* ── Right: plate ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div ref={plateRef} className="plate-frame">
              <div className="plate-inner">
                <img
                  src="/assets/CabrittoLogoSvg.svg"
                  alt="Cabritto Corps"
                  className="plate-logo"
                  onClick={handleLogoClick}
                />
                <svg
                  style={{ position: 'absolute', inset: '14px', pointerEvents: 'none' }}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <circle className="geo-line"    cx="50" cy="50" r="42" />
                  <rect   className="geo-line d2" x="9" y="9" width="82" height="82" />
                  <line stroke="var(--umber)" fill="none" opacity="0.12" x1="50" y1="6" x2="50" y2="94" />
                </svg>
              </div>
              <span className="plate-tick tl" />
              <span className="plate-tick tr" />
              <span className="plate-tick bl" />
              <span className="plate-tick br" />
            </div>
            <p style={{ marginTop: '18px', fontFamily: 'var(--serif-d)', fontStyle: 'italic', fontSize: '15px', color: 'var(--ink-faint)', letterSpacing: '0.06em' }}>
              Vitruvian Goat · Anno MMXXVI
            </p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{ position: 'absolute', bottom: '26px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', fontFamily: 'var(--serif-b)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--ink-faint)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '9px' }}
        className="hidden md:flex"
      >
        <span>Role o pergaminho</span>
        <span className="scroll-hint-bar" />
      </div>

      {/* Easter egg audio */}
      <video ref={videoRef} style={{ display: 'none' }}>
        <source src="/assets/beeeh.ogg" type="audio/ogg" />
        <source src="/assets/beeeh.mp4" type="audio/mp4" />
      </video>
    </header>
  )
}
