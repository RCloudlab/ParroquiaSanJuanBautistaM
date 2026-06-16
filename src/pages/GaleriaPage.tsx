import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FOTOS } from '../data/galeria';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import './GaleriaPage.css';

// Página /galeria: grilla completa (todas las fotos de src/data/galeria.ts,
// no solo las 4 destacadas de home) + lightbox propio a pantalla completa.
// Sin librería externa: un overlay fixed controlado por el índice abierto,
// con teclado (Esc / flechas) y clic-fuera para cerrar.
export default function GaleriaPage() {
  useRevealOnScroll();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const prev = () => setOpenIndex(i => (i === null ? null : (i - 1 + FOTOS.length) % FOTOS.length));
  const next = () => setOpenIndex(i => (i === null ? null : (i + 1) % FOTOS.length));

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex]);

  return (
    <>
      <Navbar />
      <main className="galeria-page">
        <div className="section-container">
          <Link className="galeria-page__back" to="/">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>

          <h1 className="section-title">Galería de la Parroquia</h1>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Maravatío, Michoacán — Testigos de fe desde hace siglos
          </p>

          <div className="galeria-page__grid">
            {FOTOS.map((foto, i) => {
              const maxW = foto.widths[foto.widths.length - 1];
              const srcSet = foto.widths.map(w => `/optimized/${foto.name}-${w}.webp ${w}w`).join(', ');
              return (
                <button
                  key={i}
                  type="button"
                  className="galeria-page__item reveal"
                  style={{ transitionDelay: `${Math.min(i, 6) * 60}ms` }}
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Ver en grande: ${foto.caption}`}
                >
                  <img
                    src={`/optimized/${foto.name}-${maxW}.webp`}
                    srcSet={srcSet}
                    sizes="(max-width: 700px) 100vw, 33vw"
                    alt={foto.alt}
                    className="galeria-page__img"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="galeria-page__caption">{foto.caption}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />

      {openIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="lightbox__close" aria-label="Cerrar" onClick={close}>
            <X size={28} />
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Foto anterior"
            onClick={e => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={32} />
          </button>

          <figure className="lightbox__figure" onClick={e => e.stopPropagation()}>
            <img
              src={`/optimized/${FOTOS[openIndex].name}-${FOTOS[openIndex].widths[FOTOS[openIndex].widths.length - 1]}.webp`}
              alt={FOTOS[openIndex].alt}
              className="lightbox__img"
            />
            <figcaption className="lightbox__caption">{FOTOS[openIndex].caption}</figcaption>
          </figure>

          <button
            className="lightbox__nav lightbox__nav--next"
            aria-label="Foto siguiente"
            onClick={e => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  );
}
