import { Link } from 'react-router-dom';
import { BookOpenText, Headphones, ArrowLeft, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { EVANGELIO_HOY, fechaEvangelio } from '../data/evangelio';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import './EvangelioPage.css';

export default function EvangelioPage() {
  useRevealOnScroll();

  return (
    <>
      <Seo
        titulo="Evangelio del Día"
        descripcion={`${EVANGELIO_HOY.referencia} — ${EVANGELIO_HOY.titulo}. Lee y medita el evangelio de hoy con la Parroquia San Juan Bautista.`}
      />
      <Navbar />
      <main className="page-standalone">
        <section className="evangelio-page">
          {/* Cabecera con imagen */}
          <div className="evangelio-page__hero">
            <img
              src={EVANGELIO_HOY.imagen.src}
              srcSet={EVANGELIO_HOY.imagen.srcSet}
              sizes="100vw"
              alt={EVANGELIO_HOY.imagen.alt}
            />
            <div className="evangelio-page__hero-overlay" />
            <div className="evangelio-page__hero-text">
              <p className="evangelio-page__eyebrow">
                <BookOpenText size={15} /> Evangelio del Día
              </p>
              <h1 className="evangelio-page__titulo">{EVANGELIO_HOY.titulo}</h1>
              <p className="evangelio-page__fecha">
                {fechaEvangelio()} · {EVANGELIO_HOY.liturgia}
              </p>
            </div>
          </div>

          <div className="section-container evangelio-page__container">
            {/* Audio protagonista: se escucha primero, se lee después */}
            {EVANGELIO_HOY.audio ? (
              <div className="evangelio-page__reproductor reveal">
                <div className="evangelio-page__reproductor-head">
                  <span className="evangelio-page__reproductor-icono">
                    <Headphones size={24} />
                  </span>
                  <div>
                    <h2 className="evangelio-page__reproductor-titulo">
                      Escucha el evangelio de hoy
                    </h2>
                    <p className="evangelio-page__reproductor-sub">
                      {[EVANGELIO_HOY.autorAudio, EVANGELIO_HOY.duracionAudio]
                        .filter(Boolean)
                        .join(' · ') || 'Reflexión de la parroquia'}
                    </p>
                  </div>
                </div>
                <audio
                  className="evangelio-page__reproductor-audio"
                  controls
                  preload="metadata"
                  src={EVANGELIO_HOY.audio}
                >
                  Tu navegador no soporta audio HTML5.
                </audio>
                <p className="evangelio-page__reproductor-nota">
                  Puedes seguir la lectura completa más abajo mientras escuchas.
                </p>
              </div>
            ) : (
              <div className="evangelio-page__reproductor evangelio-page__reproductor--vacio reveal">
                <span className="evangelio-page__reproductor-icono">
                  <Headphones size={22} />
                </span>
                <p className="evangelio-page__reproductor-pendiente">
                  El audio de hoy se publicará en breve. Mientras tanto, puedes leer el
                  evangelio completo aquí abajo.
                </p>
              </div>
            )}

            {/* Evangelio completo */}
            <article className="evangelio-page__lectura reveal">
              <div className="evangelio-page__lectura-header">
                <h2>Lectura del santo Evangelio según san {EVANGELIO_HOY.referencia.split(' ')[0]}</h2>
                <span className="evangelio-page__referencia">{EVANGELIO_HOY.referencia}</span>
              </div>

              {EVANGELIO_HOY.texto.map((parrafo, i) => (
                <p key={i} className="evangelio-page__parrafo">{parrafo}</p>
              ))}

              <p className="evangelio-page__aclamacion">Palabra del Señor. — Gloria a ti, Señor Jesús.</p>
            </article>

            {/* Reflexión */}
            <article className="evangelio-page__reflexion reveal">
              <h2 className="evangelio-page__reflexion-titulo">
                <Sparkles size={18} /> Para meditar hoy
              </h2>
              {EVANGELIO_HOY.reflexion.map((parrafo, i) => (
                <p key={i} className="evangelio-page__parrafo">{parrafo}</p>
              ))}
            </article>

            <div className="evangelio-page__acciones">
              <Link to="/" className="btn-gold">
                <ArrowLeft size={16} /> Volver al inicio
              </Link>
              <Link to="/rosario" className="btn-primary">
                Reza el Rosario de hoy
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
