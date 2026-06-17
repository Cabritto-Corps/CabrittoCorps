export default function Footer() {
  return (
    <footer style={{ padding: '70px 0 56px', borderTop: '1px solid var(--line)', position: 'relative', zIndex: 3 }}>
      <div
        style={{ width: 'min(1200px, 90vw)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '28px' }}
        className="px-6 md:px-0"
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
          <img src="/assets/goat-dark.svg" alt="" style={{ width: '30px', height: '30px' }} />
          <span style={{ fontFamily: 'var(--serif-d)', fontSize: '19px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--ink)' }}>
            Cabritto<span style={{ color: 'var(--gold)', fontStyle: 'normal' }}>·</span>Corps
          </span>
        </div>

        {/* Copyright */}
        <div style={{ fontFamily: 'var(--serif-d)', fontStyle: 'italic', fontSize: '15px', color: 'var(--ink-faint)' }}>
          © {new Date().getFullYear()} Cabritto Corps · Florença Digital · Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
