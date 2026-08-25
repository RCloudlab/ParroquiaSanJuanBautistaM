import { Link } from 'react-router-dom';
import { BookOpenText, ArrowRight, Headphones } from 'lucide-react';
import { EVANGELIO_HOY, fechaEvangelio } from '../data/evangelio';
import './EvangelioDia.css';

export default function EvangelioDia() {
  return (
    <section id="evangelio" className="evangelio">
      <div className="section-container">
        <h2 className="section-title">Evangelio del Día</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          «Tu palabra es lámpara para mis pasos» — Sal 119,105
        </p>

        <article className="evangelio__card reveal">
          {/* Imagen limpia; al hacer clic lleva al evangelio completo */}
          <Link
            to="/evangelio"
            className="evangelio__media"
            aria-label="Leer el evangelio completo del día"
          >
            <img
              src={EVANGELIO_HOY.imagen.src}
              srcSet={EVANGELIO_HOY.imagen.srcSet}
              sizes="(max-width: 860px) 100vw, 50vw"
              alt={EVANGELIO_HOY.imagen.alt}
              loading="lazy"
            />
          </Link>

          {/* Contenido */}
          <div className="evangelio__body">
            <p className="evangelio__eyebrow">
              <BookOpenText size={15} className="evangelio__eyebrow-icon" />
              {fechaEvangelio()} · {EVANGELIO_HOY.liturgia}
            </p>

            <h3 className="evangelio__titulo">{EVANGELIO_HOY.titulo}</h3>
            <span className="evangelio__referencia">{EVANGELIO_HOY.referencia}</span>

            <p className="evangelio__resumen">{EVANGELIO_HOY.resumen}</p>

            {EVANGELIO_HOY.audio && (
              <Link to="/evangelio" className="evangelio__audio-aviso">
                <Headphones size={16} />
                Escucha la reflexión de hoy
              </Link>
            )}

            <Link to="/evangelio" className="btn-gold evangelio__cta">
              {EVANGELIO_HOY.audio ? 'Escuchar y leer' : 'Leer el evangelio completo'}{' '}
              <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
