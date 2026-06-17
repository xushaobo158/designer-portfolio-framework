import { useEffect, useState } from 'react'
import { MenuIcon } from './Icons'

function Navbar({ copy, language, onLanguageChange }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    [copy.home, 'home'],
    [copy.work, 'work'],
    [copy.ability, 'ability'],
    [copy.contact, 'contact'],
  ]

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`} data-motion-nav>
      <a className="brand" href="#home" aria-label={copy.homeLabel}>
        <span className="brand-mark">X</span>
        <span className="brand-name">PORTFOLIO</span>
      </a>

      <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label={copy.navLabel}>
        {links.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            <span>{label}</span>
            <span className="nav-dot" />
          </a>
        ))}
      </nav>

      <div className="nav-tools">
        <div className="language-switch" aria-label={copy.languageLabel}>
          <button className={language === 'zh' ? 'is-active' : ''} onClick={() => onLanguageChange('zh')} aria-pressed={language === 'zh'}>中文</button>
          <span>/</span>
          <button className={language === 'en' ? 'is-active' : ''} onClick={() => onLanguageChange('en')} aria-pressed={language === 'en'}>EN</button>
        </div>
        <div className="nav-status"><span /> {copy.available}</div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={copy.menuLabel} aria-expanded={open}>
          <MenuIcon open={open} />
        </button>
      </div>
    </header>
  )
}

export default Navbar
