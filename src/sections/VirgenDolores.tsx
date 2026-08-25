
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';
import './VirgenDolores.css';

export default function VirgenDolores() {
  const { containerRef, targetRef } = useParallax<HTMLDivElement, HTMLImageElement>(70);

  return (
    <section id="virgen-dolores" className="virgen-dolores">
      {/* Composición diagonal: la imagen se recorta con un borde en
          ángulo (no un rectángulo) y se desplaza en parallax sutil al
          hacer scroll. El título queda montado a caballo entre la
          imagen y el fondo morado para dar sensación de profundidad. */}
      <div className="virgen-dolores__hero" ref={containerRef}>
        <div className="virgen-dolores__img-wrap">
          {/* Art direction: en escritorio la toma amplia del altar (se ve
              la escena casi completa dentro del recorte diagonal); en
              móvil, el retrato vertical que llena mejor la pantalla. */}
          <picture>
            <source
              media="(max-width: 860px)"
              srcSet="/optimized/virgen-480.webp 480w, /optimized/virgen-960.webp 960w, /optimized/virgen-1600.webp 1600w"
              sizes="100vw"
            />
            <img
              ref={targetRef}
              src="/optimized/virgen-dolores-cal-960.webp"
              srcSet="/optimized/virgen-dolores-cal-480.webp 480w, /optimized/virgen-dolores-cal-960.webp 960w, /optimized/virgen-dolores-cal-1600.webp 1600w, /optimized/virgen-dolores-cal-2200.webp 2200w"
              sizes="(max-width: 860px) 100vw, 70vw"
              alt="Nuestra Señora de los Dolores en su altar — imagen de la parroquia"
              className="virgen-dolores__img"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className="virgen-dolores__img-scrim" aria-hidden="true" />
        </div>

        <div className="virgen-dolores__crown reveal">
          <Star className="virgen-dolores__star" size={16} fill="currentColor" />
          <span className="virgen-dolores__copatronato-label">Copatronato Parroquial</span>
          <Star className="virgen-dolores__star" size={16} fill="currentColor" />
        </div>

        <h2 className="virgen-dolores__title reveal">
          <span>Nuestra</span>
          <span>Señora</span>
          <span className="virgen-dolores__title-accent">de los Dolores</span>
        </h2>

        <p className="virgen-dolores__subtitle reveal">
          Copatrona de la Parroquia de San Juan Bautista · 15 de septiembre
        </p>
      </div>

      {/* Franja inferior — contenido condensado al mínimo imprescindible */}
      <div className="section-container virgen-dolores__below">
        <p className="virgen-dolores__lead reveal">
          <em>Mater Dolorosa</em>: María contemplando el sufrimiento, muerte y sepultura de su Hijo.
          Su imagen preside el altar mayor desde la fundación de la parroquia.
        </p>

        <div className="virgen-dolores__dolores reveal">
          <Link className="virgen-dolores__dolores-link" to="/virgen-de-los-dolores">
            <span className="virgen-dolores__dolores-num">7</span>
            <span className="virgen-dolores__dolores-texto">Dolores de la Virgen</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="virgen-dolores__oracion-banner reveal">
          <p className="virgen-dolores__oracion-text">
            Cada viernes de Cuaresma, 18:30h — Rosario de los Siete Dolores. Todos estáis invitados.
          </p>
          <Link className="btn-primary virgen-dolores__btn" to="/horarios">
            Ver horarios
          </Link>
        </div>

        <div className="virgen-dolores__more reveal">
          <Link className="btn-gold" to="/virgen-de-los-dolores">
            Conoce su historia, novena y galería <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
