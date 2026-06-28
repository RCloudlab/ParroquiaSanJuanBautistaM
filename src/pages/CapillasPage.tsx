import { MapPin, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CAPILLAS } from '../data/capillas';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import './CapillasPage.css';

export default function CapillasPage() {
  useRevealOnScroll();

  return (
    <>
      <Navbar />
      <main className="page-standalone">
        <section className="capillas">
          <div className="section-container">
            <h1 className="section-title">Capillas de la Parroquia</h1>
            <div className="gold-divider" />
            <p className="section-subtitle">
              Comunidades de fe que forman parte de la Parroquia San Juan Bautista de Maravatío
            </p>

            <div className="capillas__grid">
              {CAPILLAS.map((cap, i) => (
                <article
                  key={cap.id}
                  className="capillas__card reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Imagen */}
                  <div className="capillas__img-wrap">
                    <img
                      src={cap.imagen}
                      alt={cap.nombre}
                      className="capillas__img"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="capillas__img-overlay" />
                  </div>

                  {/* Contenido */}
                  <div className="capillas__body">
                    <h2 className="capillas__nombre">{cap.nombre}</h2>

                    <div className="capillas__meta">
                      <span className="capillas__lugar">
                        <MapPin size={14} />
                        {cap.lugar}
                      </span>
                    </div>

                    {/* Horario de misas */}
                    <div className="capillas__misas">
                      <h3 className="capillas__misas-title">
                        <Clock size={15} />
                        Horario de Misas
                      </h3>
                      <ul className="capillas__misas-list">
                        {cap.misas.map((m, j) => (
                          <li key={j} className="capillas__misa-item">
                            <span className="capillas__misa-dia">{m.dia}</span>
                            <span className="capillas__misa-hora">{m.hora}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Historia */}
                    <div className="capillas__historia">
                      <h3 className="capillas__historia-title">Historia</h3>
                      {cap.historia.map((p, j) => (
                        <p key={j} className="capillas__historia-p">{p}</p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="capillas__nota">
              La parroquia cuenta con aproximadamente 11 capillas en sus comunidades.
              La información completa se actualizará próximamente.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
