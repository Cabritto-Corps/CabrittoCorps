import ParticleCanvas from './components/ui/ParticleCanvas'
import CursorGlow    from './components/ui/CursorGlow'
import Navbar        from './components/layout/Navbar'
import Footer        from './components/layout/Footer'
import Hero          from './components/sections/Hero'
import Projects      from './components/sections/Projects'
import Team          from './components/sections/Team'

export default function App() {
  return (
    <>
      {/* Fixed ambient layers (behind everything) */}
      <div className="atmosphere" />
      <ParticleCanvas />
      <CursorGlow />
      <div className="vignette" />
      <div className="scanlines" />

      {/* Page content */}
      <div className="relative" style={{ zIndex: 2 }}>
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Team />
        </main>
        <Footer />
      </div>
    </>
  )
}
