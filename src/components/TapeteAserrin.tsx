import { useId, type ReactNode } from 'react';
import './TapeteAserrin.css';

// Tapete de aserrín, como los que se tienden en las calles para las
// procesiones (Huamantla, Tlaxcala): visto desde arriba, con una banda
// exterior de rombos, una cenefa de flores, el campo de aserrín natural y
// florones en las esquinas.
//
// El "polvo" es una capa de fondo aparte: un filtro SVG le desordena las
// orillas como aserrín espolvoreado con plantilla, y encima va el grano.
// El contenido (texto, botones) queda nítido por encima del filtro.

/** Florón de esquina: pétalos rosas y naranjas, centro amarillo y hojas. */
function Floron({ esquina }: { esquina: 'si' | 'sd' | 'ii' | 'id' }) {
  return (
    <svg className={`tapete__floron tapete__floron--${esquina}`} viewBox="-50 -50 100 100" aria-hidden="true">
      {[45, 135, 225, 315].map(a => (
        <path key={a} d="M0 0C10 -8 26 -10 40 0C26 10 10 8 0 0Z" fill="#2E8A3A" transform={`rotate(${a})`} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="0" cy="-19" rx="8.5" ry="14" fill="#D3286F" transform={`rotate(${i * 45})`} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="0" cy="-10" rx="5" ry="8" fill="#F07A12" transform={`rotate(${i * 45 + 22.5})`} />
      ))}
      <circle r="7" fill="#F4B41A" />
      <circle r="2.6" fill="#7A2E10" />
    </svg>
  );
}

export default function TapeteAserrin({ children, className = '' }: { children: ReactNode; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <div className={`tapete ${className}`}>
      <svg className="tapete__defs" width="0" height="0" aria-hidden="true" focusable="false">
        <filter id={`${id}-aserrin`} x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="11" result="ruido" />
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="tapete__polvo" style={{ filter: `url(#${id}-aserrin)` }} aria-hidden="true">
        <div className="tapete__banda tapete__banda--exterior" />
        <div className="tapete__banda tapete__banda--cenefa" />
        <div className="tapete__campo">
          <Floron esquina="si" />
          <Floron esquina="sd" />
          <Floron esquina="ii" />
          <Floron esquina="id" />
        </div>
      </div>

      <div className="tapete__contenido">
        {/* Cruz de aserrín morado con dos hojas, al centro arriba */}
        <svg className="tapete__cruz" viewBox="0 0 80 50" aria-hidden="true">
          <path d="M40 25C30 16 16 16 6 25C16 34 30 34 40 25Z" fill="#2E8A3A" />
          <path d="M40 25C50 16 64 16 74 25C64 34 50 34 40 25Z" fill="#2E8A3A" />
          <path d="M36 2h8v14h12v8H44v24h-8V24H24v-8h12z" fill="#5B2A86" />
        </svg>
        {children}
      </div>
    </div>
  );
}
