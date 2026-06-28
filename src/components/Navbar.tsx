import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail } from 'lucide-react';
import { REQUISITOS } from '../data/requisitos';
import './Navbar.css';

interface NavChild {
  label: string;
  route: string;
}

interface NavLink {
  label: string;
  route?: string;
  anchor?: string; // solo para "Inicio"
  children?: NavChild[];
}

// 5 elementos visibles en desktop (vs 8 anteriores):
// Inicio · Horarios · Parroquia▾ · Sacramentos▾ · Eventos
// El botón Contacto vive solo en navbar__actions (no duplicado en la lista).
const NAV_LINKS: NavLink[] = [
  { label: 'Inicio',      anchor: '#hero' },
  { label: 'Horarios',    route: '/horarios' },
  {
    label: 'Parroquia',
    children: [
      { label: 'Historia',              route: '/historia' },
      { label: 'Capillas',              route: '/capillas' },
      { label: 'Virgen de los Dolores', route: '/virgen-de-los-dolores' },
      { label: 'Galería',               route: '/galeria' },
    ],
  },
  {
    label: 'Sacramentos',
    route: '/sacramentos',
    children: REQUISITOS.map(r => ({ label: r.titulo, route: `/sacramentos/${r.id}` })),
  },
  { label: 'Eventos', route: '/eventos' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState<string | null>(null); // id del grupo abierto
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();

  // Cierra el drawer móvil al cambiar de ruta
  useEffect(() => {
    setOpen(false);
    setDrawerOpen(null);
  }, [pathname]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (!open) {
        setHidden(y > lastScrollY.current && y > 120);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  const handleAnchor = (hash: string) => {
    setOpen(false);
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navega a home y después hace scroll — usando history para no romper React Router
      window.location.href = `/${hash}`;
    }
  };

  // Determina si un link debe aparecer como activo.
  // Regla: exactamente la ruta actual, excepto /sacramentos que es prefijo.
  const isActive = (link: NavLink): boolean => {
    if (link.anchor) return pathname === '/';
    if (link.children && !link.route) {
      return link.children.some(c => pathname.startsWith(c.route));
    }
    if (link.route === '/sacramentos') return pathname.startsWith('/sacramentos');
    if (link.route) return pathname === link.route;
    return false;
  };

  const isChildActive = (child: NavChild) =>
    pathname === child.route || pathname.startsWith(child.route + '/');

  return (
    <header
      className={[
        'navbar',
        scrolled ? 'navbar--scrolled' : '',
        hidden  ? 'navbar--hidden'  : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="navbar__inner">
        {/* Logo — Link limpio, sin setTimeout */}
        <Link
          className="navbar__brand"
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="/logo.png" alt="Parroquia San Juan Bautista" className="navbar__logo" />
          <span className="navbar__brand-text">
            <span className="navbar__brand-title">San Juan Bautista</span>
            <span className="navbar__brand-sub">Parroquia · Maravatío</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Navegación principal">
          {NAV_LINKS.map(link => {
            const active = isActive(link);

            if (link.children) {
              return (
                <div key={link.label} className="navbar__dropdown">
                  {link.route ? (
                    <Link
                      className={`navbar__link navbar__link--dropdown ${active ? 'navbar__link--active' : ''}`}
                      to={link.route}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown size={13} className="navbar__chevron" />
                    </Link>
                  ) : (
                    <button
                      className={`navbar__link navbar__link--dropdown ${active ? 'navbar__link--active' : ''}`}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown size={13} className="navbar__chevron" />
                    </button>
                  )}
                  <div className="navbar__dropdown-menu" role="menu">
                    {link.children.map(child => (
                      <Link
                        key={child.route}
                        className={`navbar__dropdown-item ${isChildActive(child) ? 'navbar__dropdown-item--active' : ''}`}
                        to={child.route}
                        role="menuitem"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            if (link.anchor) {
              return (
                <a
                  key={link.label}
                  className={`navbar__link ${active ? 'navbar__link--active' : ''}`}
                  href={link.anchor}
                  onClick={e => { e.preventDefault(); handleAnchor(link.anchor!); }}
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.label}
                className={`navbar__link ${active ? 'navbar__link--active' : ''}`}
                to={link.route!}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="navbar__actions">
          <Link
            className={`navbar__contact-link ${pathname === '/contacto' ? 'navbar__contact-link--active' : ''}`}
            to="/contacto"
            title="Contactar a la parroquia"
          >
            <Mail size={15} />
            <span className="navbar__contact-text">Contacto</span>
          </Link>

          <button
            className="navbar__hamburger"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => { setOpen(v => !v); if (!open) setHidden(false); }}
          >
            <span className={`navbar__hamburger-icon ${open ? 'navbar__hamburger-icon--open' : ''}`}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <nav
        className={`navbar__drawer ${open ? 'navbar__drawer--open' : ''}`}
        aria-label="Menú móvil"
        aria-hidden={!open}
      >
        {NAV_LINKS.map(link => {
          const active = isActive(link);
          const groupId = link.label;

          if (link.children) {
            const isGroupOpen = drawerOpen === groupId;
            return (
              <div key={groupId} className="navbar__drawer-group">
                <button
                  className={`navbar__drawer-link navbar__drawer-link--toggle ${active ? 'navbar__drawer-link--active' : ''}`}
                  onClick={() => setDrawerOpen(isGroupOpen ? null : groupId)}
                  aria-expanded={isGroupOpen}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`navbar__chevron ${isGroupOpen ? 'navbar__chevron--open' : ''}`}
                  />
                </button>
                <div className={`navbar__drawer-submenu ${isGroupOpen ? 'navbar__drawer-submenu--open' : ''}`}>
                  {link.children.map(child => (
                    <Link
                      key={child.route}
                      className={`navbar__drawer-sublink ${isChildActive(child) ? 'navbar__drawer-sublink--active' : ''}`}
                      to={child.route}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          if (link.anchor) {
            return (
              <a
                key={link.label}
                className={`navbar__drawer-link ${active ? 'navbar__drawer-link--active' : ''}`}
                href={link.anchor}
                onClick={e => { e.preventDefault(); handleAnchor(link.anchor!); }}
              >
                {link.label}
              </a>
            );
          }

          return (
            <Link
              key={link.label}
              className={`navbar__drawer-link ${active ? 'navbar__drawer-link--active' : ''}`}
              to={link.route!}
            >
              {link.label}
            </Link>
          );
        })}

        <Link
          className={`navbar__drawer-link navbar__drawer-link--contact ${pathname === '/contacto' ? 'navbar__drawer-link--active' : ''}`}
          to="/contacto"
        >
          <Mail size={16} />
          Contacto
        </Link>
      </nav>
    </header>
  );
}
