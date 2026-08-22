import { MapPin, Clock, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CAPILLAS, type Capilla } from '../data/capillas';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import './CapillasPage.css';
import Seo from '../components/Seo';
import { CapillaModal } from '../components/CapillasModal';


export default function CapillasPage() {
  useRevealOnScroll();

  const [capillaActiva, setCapillaActiva] = useState<Capilla | null>();
  const openModal = (capilla: Capilla) => setCapillaActiva(capilla);
  const closeModal = () => setCapillaActiva(null);


  useEffect(() => {
  if (!capillaActiva) return;
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, [capillaActiva]);



  return (
    <>
      <Seo
        titulo="Capillas"
        descripcion="Conoce las capillas que forman parte del territorio de la Parroquia San Juan Bautista y sus horarios de celebración."
      />
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
                <button
                  key={cap.id}
                  className="capillas__card reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                  onClick={() => openModal(cap)}
                  aria-label={`Ver información de ${cap.nombre}`}
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
                    <h4 className="capillas__santo"> <span className="capillas__label">Patrono:</span> {cap.santo} </h4>
                    
                    {cap.aniversario && (
                      <p className="capillas__aniversario"> <span className="capillas__label">Aniversario de la llegada del Santísimo: {cap.aniversario}</span> </p>
                    )}
                    
                    {cap.fiesta && (
                      <p className="capillas__fiesta"> <span className="capillas__label">Fiesta: {cap.fiesta}</span></p>
                    )}                                      

                    <div className="capillas__meta">
                      <span className="capillas__lugar">
                        <MapPin size={14} />
                        {cap.lugar}
                      </span>
                    </div>                   
                  </div>
                </button>
              ))}
            </div>

            <p className="capillas__nota">
              La parroquia cuenta con aproximadamente 11 capillas en sus comunidades.
              La información completa se actualizará próximamente.
            </p>
          </div>
        </section>
      </main>
      {capillaActiva && (
        <CapillaModal capilla={capillaActiva} onCerrar={closeModal} />
      )}
      <Footer />
    </>
  );
}
