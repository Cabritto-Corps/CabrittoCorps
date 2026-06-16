const NAV_LINKS = [
  { href: '#proemio',   label: 'Proêmio'    },
  { href: '#obras',     label: 'Obras'       },
  { href: '#confraria', label: 'A Confraria' },
]

export default function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'linear-gradient(to bottom, rgba(231,218,198,0.92), rgba(231,218,198,0.55))',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        style={{ width: 'min(1200px, 90vw)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0' }}
      >
        {/* Brand */}
        <button
          style={{ display: 'flex', alignItems: 'center', gap: '13px', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="/assets/goat-dark.svg" alt="Cabritto Corps" style={{ width: '34px', height: '34px' }} />
          <span style={{ fontFamily: 'var(--serif-d)', fontWeight: 600, fontSize: '21px', letterSpacing: '0.14em', color: 'var(--ink)' }}>
            Cabritto<span style={{ color: 'var(--gold)', fontStyle: 'normal' }}>·</span>Corps
          </span>
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>

        {/* Anno */}
        <span style={{ fontFamily: 'var(--serif-d)', fontStyle: 'italic', fontSize: '15px', color: 'var(--bronze)', letterSpacing: '0.05em' }}>
          Anno MMXXVI
        </span>
      </div>
    </nav>
  )
}
