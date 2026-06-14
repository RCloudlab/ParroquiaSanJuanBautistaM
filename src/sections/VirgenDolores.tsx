import { Heart, Star } from 'lucide-react';
import './VirgenDolores.css';

const SIETE_DOLORES = [
  'La profecía de Simeón',
  'La huida a Egipto',
  'La pérdida del Niño Jesús en el Templo',
  'El encuentro de María con Jesús camino del Calvario',
  'La Crucifixión y muerte de Jesús',
  'El descendimiento de la Cruz',
  'La sepultura de Jesús',
];

export default function VirgenDolores() {
  return (
    <section id="virgen-dolores" className="virgen-dolores">
      {/* Franja decorativa superior */}
      <div className="virgen-dolores__band" aria-hidden="true" />

      <div className="section-container">
        {/* Encabezado especial */}
        <div className="virgen-dolores__crown">
          <Star className="virgen-dolores__star" size={18} fill="currentColor" />
          <span className="virgen-dolores__copatronato-label">Copatronato Parroquial</span>
          <Star className="virgen-dolores__star" size={18} fill="currentColor" />
        </div>

        <h2 className="section-title virgen-dolores__title">
          Nuestra Señora de los Dolores
        </h2>
        <div className="virgen-dolores__divider" />
        <p className="section-subtitle virgen-dolores__subtitle">
          Copatrona de la Parroquia de San Juan Bautista
        </p>

        <div className="virgen-dolores__layout">
          {/* Imagen / panel visual */}
          <div className="virgen-dolores__image-panel">
            <div className="virgen-dolores__image-frame">
              <img
                src="/virgen.png"
                alt="Nuestra Señora de los Dolores — imagen de la parroquia"
                className="virgen-dolores__img"
              />
            </div>
            <blockquote className="virgen-dolores__quote">
              «Stabat Mater dolorosa<br />
              iuxta Crucem lacrimosa»
              <footer>— Himno medieval, s. XIII</footer>
            </blockquote>
          </div>

          {/* Contenido */}
          <div className="virgen-dolores__content">
            <div className="card virgen-dolores__info-card">
              <h3 className="virgen-dolores__info-title">
                <Heart size={20} className="virgen-dolores__heart-icon" />
                Historia y Devoción
              </h3>
              <p>
                La Virgen de los Dolores, o <em>Mater Dolorosa</em>, representa a María en su dolor más profundo:
                la contemplación del sufrimiento, muerte y sepultura de su Hijo Jesucristo.
                Su fiesta litúrgica se celebra el <strong>15 de septiembre</strong>, día después de la
                Exaltación de la Santa Cruz.
              </p>
              <p>
                Esta advocación es copatrona de nuestra parroquia desde su fundación, y su imagen
                preside el altar lateral derecho. Cada septiembre, la comunidad la celebra con
                novena, triduo solemne, Misa pontifical y procesión.
              </p>
            </div>

            {/* Los 7 Dolores */}
            <div className="card virgen-dolores__dolores-card">
              <h3 className="virgen-dolores__info-title">
                <Star size={18} className="virgen-dolores__heart-icon" fill="currentColor" />
                Los Siete Dolores de María
              </h3>
              <ol className="virgen-dolores__list">
                {SIETE_DOLORES.map((dolor, i) => (
                  <li key={i} className="virgen-dolores__dolor-item">
                    <span className="virgen-dolores__dolor-num">{i + 1}</span>
                    <span>{dolor}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Devoción */}
            <div className="virgen-dolores__oracion-banner">
              <p className="virgen-dolores__oracion-text">
                Cada viernes de Cuaresma a las 18:30h se reza el Rosario de los Siete Dolores en la iglesia.
                ¡Todos los fieles estáis invitados!
              </p>
              <a className="btn-primary virgen-dolores__btn" href="#horarios" onClick={e => { e.preventDefault(); document.querySelector('#horarios')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Ver horarios
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
