import { Link } from 'react-router-dom';
import { Church, Heart, Facebook, Instagram } from 'lucide-react';
import './Footer.css';

// Mismo criterio que el Navbar: cada sección vive en su propia ruta.
const LINKS = [
  { label: 'Horarios',       route: '/horarios' },
  { label: 'Virgen Dolores', route: '/virgen-de-los-dolores' },
  { label: 'Sacramentos',    route: '/sacramentos' },
  { label: 'Historia',       route: '/historia' },
  { label: 'Eventos',        route: '/eventos' },
  { label: 'Galería',        route: '/galeria' },
  { label: 'Contacto',       route: '/contacto' },
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
            <p className="footer__brand-quote">
              «Ecce Agnus Dei»
            </p>
          </div>

          {/* Nav links */}
          <nav className="footer__nav" aria-label="Navegación del pie de página">
            <h4 className="footer__nav-title">Secciones</h4>
            <ul className="footer__nav-list">
              {LINKS.map(l => (
                <li key={l.route}>
                  <Link to={l.route} className="footer__nav-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copatronato + Redes sociales */}
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
              <p>Diócesis de Zamora, Michoacán</p>
              <a
                href="https://www.vaticannews.va/es.html"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__vatican-link"
              >
                Vatican News
              </a>
            </div>

            <div className="footer__social">
              <h4 className="footer__nav-title">Síguenos</h4>
              <div className="footer__social-links">
                <a
                  href="https://www.facebook.com/ParroquiaSanJuanBautistaMaravatioMich"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link footer__social-link--fb"
                  aria-label="Facebook de la parroquia"
                >
                  <Facebook size={18} />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/psjbautistamaravatio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link footer__social-link--ig"
                  aria-label="Instagram de la parroquia"
                >
                  <Instagram size={18} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} Parroquia San Juan Bautista · Todos los derechos reservados
        </p>
        <p className="footer__made-with">
          Donado por <a href="https://www.facebook.com/codeservemx?locale=vi_VN" target="_blank" className="footer__codeserve-link" rel="noopener noreferrer">CodeServe</a>
        </p>
      </div>
    </footer>
  );
}
