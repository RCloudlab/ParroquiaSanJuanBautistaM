import { useId } from 'react';
import SimboloSanto from './SimboloSanto';
import type { Santo, TonoSanto } from '../data/todosLosSantos';

// Ilustración de cada santo al estilo de una estampita: arco de medio punto
// con rayos, aureola dorada y el símbolo del santo al centro, guirnalda de
// flores al pie y un grano de papel encima. Todo en SVG, sin fotos.

const TONOS: Record<TonoSanto, { claro: string; oscuro: string }> = {
  vino:      { claro: '#B8263F', oscuro: '#6A0F22' },
  terracota: { claro: '#D2593A', oscuro: '#8A2A14' },
  azul:      { claro: '#3B7EA1', oscuro: '#173E5C' },
  olivo:     { claro: '#4E9440', oscuro: '#1F4A1D' },
  mostaza:   { claro: '#DDA81C', oscuro: '#8A5A06' },
};

const CEMPASUCHIL = '/todos-los-santos/flor-cempasuchil.webp';

/** Flor de cempasúchil (ilustración) centrada en (x, y). */
function Flor({ x, y, d, giro = 0 }: { x: number; y: number; d: number; giro?: number }) {
  return <image href={CEMPASUCHIL} x={x - d / 2} y={y - d / 2} width={d} height={d} transform={giro ? `rotate(${giro} ${x} ${y})` : undefined} />;
}

const ARCO = 'M0 380V150A150 150 0 0 1 300 150V380Z';
const ARCO_INTERIOR = 'M11 369V150A139 139 0 0 1 289 150V369Z';
const CENTRO = { x: 150, y: 168 };

// Arquito de florecitas de cempasúchil siguiendo el arco de la estampa
// (como los arcos de flores de los altares): puntos sobre la curva interior.
const ARQUITO = (() => {
  const puntos: { x: number; y: number }[] = [];
  const r = 126;
  for (let y = 330; y > 150; y -= 15) puntos.push({ x: 150 - r, y }, { x: 150 + r, y });
  for (let a = 180; a <= 360; a += 9) {
    const rad = (a * Math.PI) / 180;
    puntos.push({ x: 150 + Math.cos(rad) * r, y: 150 + Math.sin(rad) * r });
  }
  return puntos;
})();

function Florecita({ x, y, r, color }: { x: number; y: number; r: number; color: string }) {
  return (
    <g>
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i * 72 - 90) * (Math.PI / 180);
        return <circle key={i} cx={x + Math.cos(a) * r} cy={y + Math.sin(a) * r} r={r * 0.8} fill={color} />;
      })}
      <circle cx={x} cy={y} r={r * 0.55} fill="#E9C770" />
    </g>
  );
}

export default function EstampaSanto({ santo, className }: { santo: Santo; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const tono = TONOS[santo.tono];

  return (
    <svg className={className} viewBox="0 0 300 380" role="img" aria-label={`Estampa de ${santo.nombre}`}>
      <defs>
        <linearGradient id={`${uid}-fondo`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tono.claro} />
          <stop offset="1" stopColor={tono.oscuro} />
        </linearGradient>
        <radialGradient id={`${uid}-luz`} cx="0.5" cy="0.44" r="0.55">
          <stop offset="0" stopColor="#FFE9B0" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#FFE9B0" stopOpacity="0.06" />
          <stop offset="1" stopColor="#FFE9B0" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${uid}-arco`}>
          <path d={ARCO} />
        </clipPath>
        <filter id={`${uid}-grano`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <g clipPath={`url(#${uid}-arco)`}>
        <rect width="300" height="380" fill={`url(#${uid}-fondo)`} />

        <rect width="300" height="380" fill={`url(#${uid}-luz)`} />
        <g>
          {ARQUITO.map((p, i) => <Flor key={i} x={p.x} y={p.y} d={14} giro={(i * 47) % 360} />)}
        </g>

        <circle cx={CENTRO.x} cy={CENTRO.y} r="74" fill="#FFF1CC" fillOpacity="0.1" stroke="#E9C770" strokeWidth="1.6" />
        <circle cx={CENTRO.x} cy={CENTRO.y} r="85" fill="none" stroke="#E9C770" strokeWidth="2.2" strokeDasharray="0.1 7" strokeLinecap="round" />

        <g color="#FBF3E2" style={{ ['--simbolo-fondo' as string]: tono.claro }}>
          <SimboloSanto simbolo={santo.simbolo} x={CENTRO.x - 47} y={CENTRO.y - 47} size={94} />
        </g>

        {/* Guirnalda al pie: hojas, cempasúchil y florecitas */}
        <g fill="#7BC46A" opacity="0.6">
          {Array.from({ length: 12 }, (_, i) => {
            const x = 6 + i * 26;
            const y = 352 - Math.sin((i / 11) * Math.PI) * 10;
            return <ellipse key={i} cx={x} cy={y} rx="15" ry="5.5" transform={`rotate(${i % 2 ? 28 : -28} ${x} ${y})`} />;
          })}
        </g>
        <Flor x={40} y={350} d={38} giro={15} />
        <Flor x={150} y={346} d={46} />
        <Flor x={260} y={350} d={38} giro={-15} />
        <Florecita x={95} y={358} r={4.5} color="#FBF3E2" />
        <Florecita x={205} y={358} r={4.5} color="#FBF3E2" />

        <rect width="300" height="380" filter={`url(#${uid}-grano)`} opacity="0.16" style={{ mixBlendMode: 'multiply' }} />
      </g>

      <path d={ARCO_INTERIOR} fill="none" stroke="#E9C770" strokeWidth="1.3" opacity="0.85" />
    </svg>
  );
}
