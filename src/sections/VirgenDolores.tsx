
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';
import './VirgenDolores.css';

const SIETE_DOLORES = [
  'La profecía de Simeón',
  'La huida a Egipto',
  'La pérdida del Niño Jesús en el Templo',
  'El encuentro con Jesús camino del Calvario',
  'La Crucifixión y muerte de Jesús',
  'El descendimiento de la Cruz',
  'La sepultura de Jesús',
];

export default function VirgenDolores() {
  const { containerRef } = useParallax<HTMLDivElement>(70);

  return (
    <section id="virgen-dolores" className="virgen-dolores">
      {/* Composición diagonal: la imagen se recorta con un borde en
          ángulo (no un rectángulo) y se desplaza en parallax sutil al
          hacer scroll. El título queda montado a caballo entre la
          imagen y el fondo morado para dar sensación de profundidad. */}
      <div className="virgen-dolores__hero" ref={containerRef}>
        <div className="virgen-dolores__img-wrap">
          <img
            src="/optimized/virgen-780.webp"
            srcSet="/optimized/virgen-480.webp 480w, /optimized/virgen-780.webp 780w"
            sizes="(max-width: 860px) 100vw, 64vw"
            alt="Nuestra Señora de los Dolores — imagen de la parroquia"
            className="virgen-dolores__img"
            loading="lazy"
            decoding="async"
          />
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
          Su imagen preside el altar lateral derecho desde la fundación de la parroquia, y cada
          septiembre la comunidad la celebra con novena, triduo solemne, Misa pontifical y procesión.
        </p>

        <div className="virgen-dolores__dolores reveal">
          <h3 className="virgen-dolores__dolores-title">Los Siete Dolores de María</h3>
          <ul className="virgen-dolores__chips">
            {SIETE_DOLORES.map((dolor, i) => (
              <li key={i} className="virgen-dolores__chip">
                <span className="virgen-dolores__chip-num">{i + 1}</span>
                {dolor}
              </li>
            ))}
          </ul>
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
