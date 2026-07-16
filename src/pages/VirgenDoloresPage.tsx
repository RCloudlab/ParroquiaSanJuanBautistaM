import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HISTORIA_DEVOCION, NOVENA, CULTOS, GALERIA_VIRGEN } from '../data/virgenDolores';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import './VirgenDoloresPage.css';
import Seo from '../components/Seo';

// Página /virgen-de-los-dolores: amplía la sección resumen de home
// (src/sections/VirgenDolores.tsx) con historia de la devoción, novena
// completa (acordeón día por día), galería propia y horario detallado de
// cultos. Contenido en src/data/virgenDolores.ts.
export default function VirgenDoloresPage() {
  useRevealOnScroll();
  const [diaAbierto, setDiaAbierto] = useState<number | null>(1);

  return (
    <>
      <Seo
        titulo="Virgen de los Dolores"
        descripcion="Historia y devoción a la Virgen de los Dolores, venerada en la Parroquia San Juan Bautista."
      />
      <Navbar />
      <main className="virgen-page">
        {/* Cabecera cinematográfica: el contenedor adopta la proporción
            exacta de cada foto (panorámica en escritorio, retrato en móvil
            vía <picture>) para que la imagen se vea COMPLETA, sin recortes.
            La entrada anima un zoom-out suave + textos escalonados, con un
            halo dorado pulsante tras la imagen y un marco fino interior. */}
        <header className="virgen-page__hero">
          <picture>
            <source
              media="(max-width: 860px)"
              srcSet="/optimized/virgen-480.webp 480w, /optimized/virgen-960.webp 960w, /optimized/virgen-1600.webp 1600w"
              sizes="100vw"
            />
            <img
              src="/optimized/virgen-dolores-ext-1600.webp"
              srcSet="/optimized/virgen-dolores-ext-480.webp 480w, /optimized/virgen-dolores-ext-960.webp 960w, /optimized/virgen-dolores-ext-1600.webp 1600w, /optimized/virgen-dolores-ext-2200.webp 2200w"
              sizes="100vw"
              alt="Nuestra Señora de los Dolores en su altar, entre columnas doradas"
              className="virgen-page__hero-img"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="virgen-page__hero-glow" aria-hidden="true" />
          <div className="virgen-page__hero-scrim" />
          <div className="virgen-page__hero-frame" aria-hidden="true" />
          <div className="virgen-page__hero-content">
            <Link className="virgen-page__back" to="/">
              <ArrowLeft size={16} /> Volver al inicio
            </Link>
            <div className="virgen-page__crown">
              <Star size={16} fill="currentColor" />
              <span>Copatronato Parroquial</span>
              <Star size={16} fill="currentColor" />
            </div>
            <h1 className="virgen-page__title">
              <span className="virgen-page__title-line">Nuestra Señora</span>
              <span className="virgen-page__title-accent">de los Dolores</span>
            </h1>
            <p className="virgen-page__subtitle">Copatrona de la Parroquia de San Juan Bautista · 15 de septiembre</p>
          </div>
          <div className="virgen-page__hero-cue" aria-hidden="true">
            <ChevronDown size={22} />
          </div>
        </header>

        <div className="section-container virgen-page__body">
          {/* Historia */}
          <section className="virgen-page__section reveal">
            <h2 className="virgen-page__section-title">Historia de la devoción</h2>
            <div className="gold-divider" />
            {HISTORIA_DEVOCION.map((p, i) => (
              <p key={i} className="virgen-page__text">{p}</p>
            ))}
          </section>

          {/* Novena */}
          <section className="virgen-page__section reveal">
            <h2 className="virgen-page__section-title">Novena de los Siete Dolores</h2>
            <div className="gold-divider" />
            <p className="virgen-page__text virgen-page__text--lead">
              Nueve días de oración en preparación a su fiesta. Cada día medita uno de los dolores de María.
            </p>
            <div className="virgen-page__novena">
              {NOVENA.map(d => (
                <div key={d.dia} className="virgen-page__novena-item">
                  <button
                    className="virgen-page__novena-toggle"
                    onClick={() => setDiaAbierto(v => (v === d.dia ? null : d.dia))}
                    aria-expanded={diaAbierto === d.dia}
                  >
                    <span className="virgen-page__novena-day">Día {d.dia}</span>
                    <span className="virgen-page__novena-titulo">{d.titulo}</span>
                    <ChevronDown
                      size={18}
                      className={`virgen-page__novena-chevron ${diaAbierto === d.dia ? 'virgen-page__novena-chevron--open' : ''}`}
                    />
                  </button>
                  {diaAbierto === d.dia && (
                    <p className="virgen-page__novena-texto">{d.texto}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Rezo de los Siete Dolores — PENDIENTE de desarrollar.
              TODO: experiencia guiada paso a paso (meditación + oración de
              cada dolor), al estilo del Rosario en /rosario. Por ahora solo
              se anuncia como "en preparación". */}
          <section className="virgen-page__section reveal">
            <h2 className="virgen-page__section-title">Rezo de los Siete Dolores</h2>
            <div className="gold-divider" />
            <div className="virgen-page__rezo-pendiente">
              <span className="virgen-page__rezo-badge">En preparación</span>
              <p className="virgen-page__rezo-texto">
                Muy pronto podrás rezar aquí los Siete Dolores de la Virgen paso a paso,
                con la meditación y la oración de cada dolor.
              </p>
            </div>
          </section>

          {/* Horario de cultos */}
          <section className="virgen-page__section reveal">
            <h2 className="virgen-page__section-title">Horario de cultos</h2>
            <div className="gold-divider" />
            <table className="virgen-page__table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Celebración</th>
                </tr>
              </thead>
              <tbody>
                {CULTOS.map(c => (
                  <tr key={c.dia}>
                    <td className="virgen-page__table-dia">{c.dia}</td>
                    <td>{c.horario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Galería propia */}
          <section className="virgen-page__section reveal">
            <h2 className="virgen-page__section-title">Galería</h2>
            <div className="gold-divider" />
            <div className="virgen-page__galeria">
              {GALERIA_VIRGEN.map((foto, i) => (
                <figure key={i} className="virgen-page__galeria-item">
                  <img
                    src={`/optimized/${foto.name}-${foto.width}.webp`}
                    alt={foto.alt}
                    className="virgen-page__galeria-img"
                    loading="lazy"
                  />
                  <figcaption>{foto.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
