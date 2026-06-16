const GithubIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.2 5.7.4.3.8 1 .8 2.1v3.1c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
)
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.5c1.7.4 2.5.9 3.4 1.5a13.3 13.3 0 0 0-12.2 0c.9-.6 1.8-1.1 3.4-1.5L9.6 3a19.8 19.8 0 0 0-4.9 1.4C1.6 9 .8 13.5 1.2 18a20 20 0 0 0 6 3l.5-.7c-1-.4-1.7-.8-2.4-1.4l.6-.3a14.2 14.2 0 0 0 12.2 0l.6.3c-.7.6-1.5 1-2.4 1.4l.5.7a20 20 0 0 0 6-3c.5-5.2-.8-9.7-2.4-13.6zM8.5 15.3c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/></svg>
)
const EmailIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 7.2L3.4 6H20.6L12 11.2zM3 8.1V18h18V8.1l-9 5.5-9-5.5z"/></svg>
)

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

        {/* Socials */}
        <div style={{ display: 'flex', gap: '13px' }}>
          <a href="https://github.com/Cabritto-Corps" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-btn">
            <GithubIcon />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="social-btn">
            <DiscordIcon />
          </a>
          <a href="mailto:contato@cabrittocorps.dev" aria-label="Email" className="social-btn">
            <EmailIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}
