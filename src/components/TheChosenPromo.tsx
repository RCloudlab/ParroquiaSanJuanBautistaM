import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Ticket } from 'lucide-react';
import { DETALLES, FIN, INICIO } from '../data/theChosen';
import './TheChosenPromo.css';

// Chispas que suben por el banner (posiciones fijas: render estable).
const CHISPAS = Array.from({ length: 12 }, (_, i) => ({
  left: 40 + ((i * 29) % 58),
  delay: (i * 0.9) % 7,
  dur: 5 + ((i * 3) % 5),
  size: 2 + (i % 3),
}));

/** Días de calendario (hora de México) entre hoy y el evento. */
function textoFaltan() {
  const dia = (d: Date) => Date.parse(d.toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' }));
  const dias = Math.round((dia(INICIO) - dia(new Date())) / 86_400_000);
  if (dias <= 0) return 'Es hoy';
  if (dias === 1) return 'Es mañana';
  return `Faltan ${dias} días`;
}

/** Banner que lleva a la página especial de The Chosen T6. Se oculta solo
 *  una vez terminada la proyección, sin tener que quitarlo a mano.
 *  Animación: al entrar en pantalla se abren franjas de cine y el texto
 *  sube escalonado; luego borde dorado con una luz que lo recorre, zoom
 *  lento de la foto, chispas y un destello que cruza cada pocos segundos. */
export default function TheChosenPromo() {
  const [terminado] = useState(() => Date.now() > FIN.getTime());
  const [faltan] = useState(textoFaltan);
  if (terminado) return null;

  return (
    <Link to="/eventos/the-chosen" className="chosen-promo reveal" aria-label="The Chosen Temporada 6: acceso anticipado. Ver evento y conseguir boletos">
      <div className="chosen-promo__marco">
        <img
          className="chosen-promo__img"
          src="/optimized/the-chosen-panoramica-960.webp"
          srcSet="/optimized/the-chosen-panoramica-480.webp 480w, /optimized/the-chosen-panoramica-960.webp 960w, /optimized/the-chosen-panoramica-1600.webp 1600w"
          sizes="(max-width: 1200px) 100vw, 1150px"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="chosen-promo__velo" aria-hidden="true" />
        <div className="chosen-promo__chispas" aria-hidden="true">
          {CHISPAS.map((c, i) => (
            <span
              key={i}
              style={{
                left: `${c.left}%`,
                width: c.size,
                height: c.size,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.dur}s`,
              }}
            />
          ))}
        </div>
        <div className="chosen-promo__destello" aria-hidden="true" />

        <div className="chosen-promo__contenido">
          <span className="chosen-promo__tag">
            <Ticket size={13} className="chosen-promo__tag-icono" /> Evento especial
            <span className="chosen-promo__faltan"><span className="chosen-promo__punto" />{faltan}</span>
          </span>
          <span className="chosen-promo__titulo">The Chosen · Temporada 6</span>
          <span className="chosen-promo__sub">Acceso anticipado al Episodio 1 · {DETALLES.fecha}, {DETALLES.hora}</span>
          <span className="chosen-promo__cta">Ver evento y boletos <ArrowRight size={15} className="chosen-promo__flecha" /></span>
        </div>

        <div className="chosen-promo__franja chosen-promo__franja--arriba" aria-hidden="true" />
        <div className="chosen-promo__franja chosen-promo__franja--abajo" aria-hidden="true" />
      </div>
    </Link>
  );
}
