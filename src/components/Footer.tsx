import { Church, Heart } from 'lucide-react';
import './Footer.css';

const LINKS = [
  { label: 'Horarios',       href: '#horarios' },
  { label: 'Sacramentos',    href: '#sacramentos' },
  { label: 'Eventos',        href: '#eventos' },
  { label: 'Galería',        href: '#galeria' },
  { label: 'Vatican News',   href: '#vatican-news' },
  { label: 'Virgen Dolores', href: '#virgen-dolores' },
  { label: 'Contacto',       href: '#contacto' },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Franja dorada */}
      <div className="footer__top-band" />

      <div className="footer__body">
        <div className="footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <Church size={32} strokeWidth={1.2} className="footer__brand-icon" />
            <h3 className="footer__brand-name">San Juan Bautista</h3>
            <p className="footer__brand-sub">Parroquia Católica — Apóstol</p>
            <p className="footer__brand-quote">
              «Ecce Agnus Dei»
            </p>
          </div>

          {/* Nav links */}
          <nav className="footer__nav" aria-label="Navegación del pie de página">
            <h4 className="footer__nav-title">Secciones</h4>
            <ul className="footer__nav-list">
              {LINKS.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="footer__nav-link"
                    onClick={e => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copatronato badge */}
          <div className="footer__copatronato">
            <h4 className="footer__nav-title">Copatrona</h4>
            <div className="footer__copatronato-badge">
              <Heart size={20} className="footer__heart" fill="currentColor" />
              <p>
                Nuestra Señora<br />
                de los Dolores
              </p>
            </div>
            <p className="footer__copatronato-feast">
              Fiesta: 15 de Septiembre
            </p>
            <div className="footer__diocese">
              <p>Diócesis de …</p>
              <a
                href="https://www.vaticannews.va/es.html"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__vatican-link"
              >
                Vatican News
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} Parroquia San Juan Bautista · Todos los derechos reservados
        </p>
        <p className="footer__made-with">
          Hecho con <Heart size={13} className="footer__bottom-heart" fill="currentColor" /> para la comunidad
        </p>
      </div>
    </footer>
  );
}
