import ParticleCanvas from './components/ui/ParticleCanvas'
import CursorGlow    from './components/ui/CursorGlow'
import Navbar        from './components/layout/Navbar'
import Footer        from './components/layout/Footer'
import Hero          from './components/sections/Hero'
import Projects      from './components/sections/Projects'
import Team          from './components/sections/Team'
import Reveal        from './components/ui/Reveal'

const CONTAINER = { width: 'min(1200px, 90vw)', margin: '0 auto' }

export default function App() {
  return (
    <>
      <div className="atmosphere" />
      <ParticleCanvas />
      <CursorGlow />
      <div className="grain" />
      <div className="edge-burn" />

      <div className="relative" style={{ zIndex: 3 }}>
        <Navbar />
        <main>
          <Hero />
          <div style={CONTAINER} className="px-6 md:px-0">
            <Reveal><div className="divider" /></Reveal>
          </div>
          <Projects />
          <div style={CONTAINER} className="px-6 md:px-0">
            <Reveal><div className="divider" /></Reveal>
          </div>
          <Team />
        </main>
        <Footer />
      </div>
    </>
  )
}
