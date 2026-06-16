import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HISTORIA } from '../data/historia';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import './Historia.css';

// Página /historia: línea de tiempo vertical con los hitos de HISTORIA
// (src/data/historia.ts). Reusa los tokens y utilidades globales
// (.section-title, .gold-divider, .card) definidos en src/index.css para
// mantener la misma identidad visual que el resto del sitio.
export default function Historia() {
  useRevealOnScroll();

  return (
    <>
      <Navbar />
      <main className="historia-page page-standalone">
        <div className="section-container">
          <Link className="historia-back" to="/">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>

          <h1 className="section-title">Historia de la Parroquia</h1>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Siglos de fe acompañando a la comunidad de Maravatío, Michoacán
          </p>

          <ol className="historia-timeline">
            {HISTORIA.map((hito, i) => (
              <li key={i} className="historia-timeline__item reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="historia-timeline__marker" aria-hidden="true" />
                <div className="card historia-timeline__card">
                  <span className="historia-timeline__anio">{hito.anio}</span>
                  <h2 className="historia-timeline__titulo">{hito.titulo}</h2>
                  <p className="historia-timeline__desc">{hito.descripcion}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}
