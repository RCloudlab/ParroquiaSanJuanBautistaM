import { ChevronDown } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const scrollDown = () => {
    document.querySelector('#horarios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Overlay decorativo */}
      <div className="hero__overlay" />

      {/* Ornamento central superior */}
      <div className="hero__cross-ornament" aria-hidden="true">✝</div>

      <div className="hero__content">
        {/* Escudo / imagen del santo representativa con SVG decorativo */}
        <div className="hero__emblem">
          <div className="hero__emblem-circle">
            <img
              src="/sanJuan.png"
              alt="Estatua de San Juan Bautista Apóstol"
              className="hero__emblem-img"
            />
          </div>
        </div>

        <p className="hero__eyebrow">Parroquia Católica</p>
        <h1 className="hero__title">
          San Juan Bautista
          <span className="hero__title-apostol">Apóstol</span>
        </h1>
        <div className="hero__gold-line" />
        <p className="hero__quote">
          «Ecce Agnus Dei, qui tollit peccatum mundi»
          <br />
          <em>«He aquí el Cordero de Dios, que quita el pecado del mundo»</em>
          <span className="hero__quote-ref">Jn 1,29</span>
        </p>

        <div className="hero__buttons">
          <a className="btn-primary" href="#horarios" onClick={e => { e.preventDefault(); scrollDown(); }}>
            Ver Horarios de Misas
          </a>
          <a className="btn-gold" href="#contacto" onClick={e => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Contacto
          </a>
        </div>
      </div>

      <button className="hero__scroll-hint" onClick={scrollDown} aria-label="Ir a la sección siguiente">
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
