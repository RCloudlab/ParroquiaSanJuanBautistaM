import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail } from 'lucide-react';
import { REQUISITOS } from '../data/requisitos';
import './Navbar.css';

interface NavLink {
  label: string;
  href: string;
  /** Si está presente, el link es una ruta de página completa (react-router
   *  <Link>) en vez de un ancla con scroll dentro de la home. */
  route?: string;
  children?: { label: string; route: string }[];
}

// Cada sección vive ahora en su propia ruta (como cualquier sitio web
// multipágina), salvo "Inicio" (vuelve arriba de la home) y "Sacramentos"
// (dropdown cuyos hijos sí son rutas /sacramentos/:id). Los sub-enlaces de
// "Sacramentos" se generan desde la misma fuente de datos que alimenta esa
// página y la grilla de la sección (ver src/data/requisitos.ts).
const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Horarios', href: '/horarios', route: '/horarios' },
  { label: 'Virgen de los Dolores', href: '/virgen-de-los-dolores', route: '/virgen-de-los-dolores' },
  {
    label: 'Sacramentos',
    href: '/sacramentos',
    children: REQUISITOS.map(r => ({ label: r.titulo, route: `/sacramentos/${r.id}` })),
  },
  { label: 'Historia', href: '/historia', route: '/historia' },
  { label: 'Eventos', href: '/eventos', route: '/eventos' },
  { label: 'Galería', href: '/galeria', route: '/galeria' },
  { label: 'Contacto', href: '/contacto', route: '/contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('hero');
  const [drawerSacramentosOpen, setDrawerSacramentosOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lastScrollY = useRef(0);

  // Oculta el navbar al bajar y lo vuelve a mostrar al subir (o al estar
  // arriba del todo). Con el menú móvil abierto nunca se oculta, para no
  // cortar la navegación mientras el usuario lo está usando.
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (!open) {
        const goingDown = y > lastScrollY.current;
        setHidden(goingDown && y > 120);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  // Scroll-spy: en la home solo queda "hero" como ancla real en el DOM (el
  // resto de las secciones ya son rutas propias). Mientras estemos en "/",
  // el link activo se resalta por scroll; en cualquier otra ruta, se resalta
  // por la URL actual (ver más abajo, isActive).
  useEffect(() => {
    if (pathname !== '/') return;
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting);
        setActive(visible ? 'hero' : 'scrolled');
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  // Si la sección no existe en el DOM (p.ej. estamos en /sacramentos/:id),
  // navegamos primero a la home y luego hacemos scroll a la sección.
  const handleLink = (href: string) => {
    setOpen(false);
    setDrawerSacramentosOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  const handleRoute = () => {
    setOpen(false);
    setDrawerSacramentosOpen(false);
  };

  const isActive = (link: NavLink) => {
    if (link.route) return pathname.startsWith(link.route);
    if (link.children) return pathname.startsWith('/sacramentos');
    return active === link.href.slice(1);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <a className="navbar__brand" href="#hero" onClick={e => { e.preventDefault(); handleLink('#hero'); }}>
          <img src="/logo.png" alt="Parroquia San Juan Bautista" className="navbar__logo" />
          <span className="navbar__brand-text">
            <span className="navbar__brand-title">San Juan Bautista</span>
            <span className="navbar__brand-sub">Parroquia</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Navegación principal">
          {NAV_LINKS.map(link =>
            link.children ? (
              <div key={link.href} className="navbar__dropdown">
                <Link
                  className={`navbar__link navbar__link--dropdown ${isActive(link) ? 'navbar__link--active' : ''}`}
                  to={link.href}
                  onClick={handleRoute}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown size={14} className="navbar__chevron" />
                </Link>
                <div className="navbar__dropdown-menu">
                  {link.children.map(child => (
                    <Link
                      key={child.route}
                      className="navbar__dropdown-item"
                      to={child.route}
                      onClick={handleRoute}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : link.route ? (
              <Link
                key={link.href}
                className={`navbar__link ${isActive(link) ? 'navbar__link--active' : ''}`}
                to={link.route}
                onClick={handleRoute}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                className={`navbar__link ${isActive(link) ? 'navbar__link--active' : ''}`}
                href={link.href}
                onClick={e => { e.preventDefault(); handleLink(link.href); }}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="navbar__actions">
          {/* Contacto — enlace secundario discreto, no compite con la nav principal */}
          <Link
            className="navbar__contact-link"
            to="/contacto"
            onClick={handleRoute}
            title="Contactar a la parroquia"
          >
            <Mail size={16} />
            <span className="navbar__contact-text">Contacto</span>
          </Link>

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen(v => { if (!v) setHidden(false); return !v; })}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="navbar__drawer" aria-label="Menú móvil">
          {NAV_LINKS.map(link =>
            link.children ? (
              <div key={link.href} className="navbar__drawer-group">
                <button
                  className={`navbar__drawer-link navbar__drawer-link--toggle ${isActive(link) ? 'navbar__drawer-link--active' : ''}`}
                  onClick={() => setDrawerSacramentosOpen(v => !v)}
                  aria-expanded={drawerSacramentosOpen}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`navbar__chevron ${drawerSacramentosOpen ? 'navbar__chevron--open' : ''}`}
                  />
                </button>
                {drawerSacramentosOpen && (
                  <div className="navbar__drawer-submenu">
                    {link.children.map(child => (
                      <Link
                        key={child.route}
                        className="navbar__drawer-sublink"
                        to={child.route}
                        onClick={handleRoute}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : link.route ? (
              <Link
                key={link.href}
                className={`navbar__drawer-link ${isActive(link) ? 'navbar__drawer-link--active' : ''}`}
                to={link.route}
                onClick={handleRoute}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                className={`navbar__drawer-link ${isActive(link) ? 'navbar__drawer-link--active' : ''}`}
                href={link.href}
                onClick={e => { e.preventDefault(); handleLink(link.href); }}
              >
                {link.label}
              </a>
            )
          )}
          <Link
            className="navbar__drawer-link navbar__drawer-link--contact"
            to="/contacto"
            onClick={handleRoute}
          >
            <Mail size={16} />
            Contacto
          </Link>
        </nav>
      )}
    </header>
  );
}
