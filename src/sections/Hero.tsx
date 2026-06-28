import { ChevronDown } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const scrollDown = () => {
    document.querySelector('#horarios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Foto real de la fachada — es el LCP de la página, se carga con
          alta prioridad y sin lazy, pero en WebP responsive para pesar poco */}
      <img
        className="hero__bg-img"
        src="/optimized/hero-2200.webp"
        srcSet="/optimized/hero-480.webp 480w, /optimized/hero-960.webp 960w, /optimized/hero-1600.webp 1600w, /optimized/hero-2200.webp 2200w"
        sizes="100vw"
        alt=""
        fetchPriority="high"
        decoding="async"
      />

      {/* Overlay decorativo */}
      <div className="hero__overlay" />

      {/* Cruz ornamental SVG — reemplaza el emoji ✝ */}
      <div className="hero__cross-ornament" aria-hidden="true">
        <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero__cross-svg">
          <rect x="17" y="0"  width="6" height="60" rx="2" fill="currentColor"/>
          <rect x="0"  y="16" width="40" height="6"  rx="2" fill="currentColor"/>
        </svg>
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">Parroquia de</p>
        <h1 className="hero__title">San Juan Bautista</h1>
        <div className="hero__gold-line" />
        <p className="hero__quote">
          «Ecce Agnus Dei, qui tollit peccatum mundi»
          <br />
          <em>«He aquí el Cordero de Dios, que quita el pecado del mundo»</em>
          <span className="hero__quote-ref">Jn 1,29</span>
        </p>
      </div>

      <button className="hero__scroll-hint" onClick={scrollDown} aria-label="Ir a la sección siguiente">
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
