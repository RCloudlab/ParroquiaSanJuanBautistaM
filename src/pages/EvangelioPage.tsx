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
            {/* Evangelio completo */}
            <article className="evangelio-page__lectura reveal">
              <div className="evangelio-page__lectura-header">
                <h2>Lectura del santo Evangelio según san {EVANGELIO_HOY.referencia.split(' ')[0]}</h2>
                <span className="evangelio-page__referencia">{EVANGELIO_HOY.referencia}</span>
              </div>

              {EVANGELIO_HOY.audio && (
                <div className="evangelio-page__audio">
                  <span className="evangelio-page__audio-label">
                    <Headphones size={16} /> Escucha el evangelio
                  </span>
                  <audio controls preload="none" src={EVANGELIO_HOY.audio}>
                    Tu navegador no soporta audio HTML5.
                  </audio>
                </div>
              )}

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
