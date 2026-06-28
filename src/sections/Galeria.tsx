import { Link } from 'react-router-dom';
import { ArrowRight, ZoomIn } from 'lucide-react';
import { FOTOS } from '../data/galeria';
import './Galeria.css';

// El resumen en home muestra solo las primeras 4 fotos de la fuente
// compartida (src/data/galeria.ts); la página /galeria (GaleriaPage.tsx)
// muestra el set completo. Cada foto navega a /galeria — no hay URL por
// foto individual, el detalle "en grande" se resuelve con un lightbox
// dentro de esa página.
const FOTOS_HOME = FOTOS.slice(0, 4);

export default function Galeria() {
  return (
    <section id="galeria" className="galeria">
      <div className="section-container">
        <h2 className="section-title">Nuestra Parroquia</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Maravatío, Michoacán — Testigos de fe desde hace siglos
        </p>

        <div className="galeria__grid">
          {FOTOS_HOME.map((foto, i) => {
            const maxW = foto.widths[foto.widths.length - 1];
            const srcSet = foto.widths.map(w => `/optimized/${foto.name}-${w}.webp ${w}w`).join(', ');
            return (
              <Link
                to="/galeria"
                key={i}
                className={`galeria__item reveal ${i === 0 ? 'galeria__item--featured' : ''}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <img
                  src={`/optimized/${foto.name}-${maxW}.webp`}
                  srcSet={srcSet}
                  sizes={i === 0 ? '100vw' : '50vw'}
                  alt={foto.alt}
                  className="galeria__img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="galeria__hover-overlay" aria-hidden="true">
                  <ZoomIn size={36} strokeWidth={1.5} />
                </div>
                <span className="galeria__caption">{foto.caption}</span>
              </Link>
            );
          })}
        </div>

        <div className="galeria__cta">
          <Link to="/galeria" className="btn-gold">
            Ver galería completa <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
