const NAV_LINKS = [
  { href: '#inicio',   label: 'início'   },
  { href: '#projetos', label: 'projetos' },
  { href: '#equipe',   label: 'equipe'   },
]

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-[10px]"
      style={{
        background: 'linear-gradient(to bottom, rgba(6,7,9,0.85), rgba(6,7,9,0.35))',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="flex items-center justify-between py-4 px-6 mx-auto"
        style={{ maxWidth: '1180px' }}
      >
        {/* Brand */}
        <button
          className="flex items-center gap-3 bg-transparent border-none cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/assets/goat.svg"
            alt="Cabritto Corps"
            className="w-[30px] h-[30px]"
            style={{ filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.45))' }}
          />
          <span className="font-extrabold tracking-[0.18em] text-[14px] text-[#d7dee3]">
            CABRITTO<span style={{ color: 'var(--cyan)' }}>_</span>CORPS
          </span>
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 text-[11px] text-[#707c85] tracking-[0.08em]">
          <span className="status-dot" />
          SISTEMAS ONLINE
        </div>
      </div>
    </nav>
  )
}
