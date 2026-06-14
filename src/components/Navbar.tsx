import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Inicio',       href: '#hero' },
  { label: 'Horarios',     href: '#horarios' },
  { label: 'Sacramentos',  href: '#sacramentos' },
  { label: 'Eventos',      href: '#eventos' },
  { label: 'Galería',      href: '#galeria' },
  { label: 'Vatican News', href: '#vatican-news' },
  { label: 'Virgen Dolores', href: '#virgen-dolores' },
  { label: 'Contacto',     href: '#contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <a className="navbar__brand" href="#hero" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Parroquia San Juan Bautista" className="navbar__logo" />
        </a>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Navegación principal">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              className="navbar__link"
              href={link.href}
              onClick={e => { e.preventDefault(); handleLink(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="navbar__drawer" aria-label="Menú móvil">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              className="navbar__drawer-link"
              href={link.href}
              onClick={e => { e.preventDefault(); handleLink(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
