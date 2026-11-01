import { useId, type CSSProperties } from 'react';
import './Veladora.css';

// Velas del altar, dibujadas en SVG para que se vean de verdad:
// - Veladora: vaso de vidrio con la llama hundida adentro, la cera
//   iluminada desde arriba, charquito de cera derretida, banda impresa y
//   reflejos del vidrio.
// - Cirio: vela alta de cera con escurrimientos, sobre candelero de latón.
// La llama tiembla con ritmo propio por vela (semilla) para que nunca se
// muevan todas al unísono; el resplandor es un degradado aparte.

export type ColorVeladora = 'blanca' | 'roja' | 'ambar' | 'rosa' | 'verde';

const CERA: Record<ColorVeladora, [string, string, string]> = {
  // [iluminada, media, sombra]
  blanca: ['#FFF4D6', '#F2E7CF', '#BFAF92'],
  roja:   ['#F0584E', '#B3192F', '#5E0A18'],
  ambar:  ['#FFC85A', '#E2901A', '#8A4E08'],
  rosa:   ['#F26AA0', '#C2185B', '#6A0C33'],
  verde:  ['#6CC46A', '#2E8A3A', '#134A1C'],
};

interface Props {
  color?: ColorVeladora;
  /** Alto de la vela en px. */
  alto?: number;
  /** Semilla para desfasar el temblor de la llama. */
  semilla?: number;
  className?: string;
}

const ritmo = (semilla: number): CSSProperties => ({
  ['--retraso' as string]: `${-((semilla * 0.37) % 2.3)}s`,
  ['--ritmo' as string]: `${1.4 + ((semilla * 0.53) % 1.1)}s`,
});

/** Llama con núcleo blanco, cuerpo amarillo-naranja y base azul. Su base
 *  queda en (cx, base) y mide `alto` unidades del SVG. */
function Llama({ cx, base, alto, id }: { cx: number; base: number; alto: number; id: string }) {
  const a = alto;
  const w = a * 0.3;
  return (
    <g className="vela__llama">
      <path
        d={`M${cx} ${base - a}C${cx + w * 0.7} ${base - a * 0.62} ${cx + w} ${base - a * 0.32} ${cx + w * 0.82} ${base - a * 0.14}C${cx + w * 0.62} ${base} ${cx - w * 0.62} ${base} ${cx - w * 0.82} ${base - a * 0.14}C${cx - w} ${base - a * 0.32} ${cx - w * 0.7} ${base - a * 0.62} ${cx} ${base - a}Z`}
        fill={`url(#${id}-llama)`}
      />
      <ellipse cx={cx} cy={base - a * 0.2} rx={w * 0.36} ry={a * 0.2} fill="#FFFDF2" opacity="0.9" />
      <ellipse cx={cx} cy={base - a * 0.05} rx={w * 0.42} ry={a * 0.07} fill="#4E8CFF" opacity="0.55" />
    </g>
  );
}

function DefsLlama({ id }: { id: string }) {
  return (
    <radialGradient id={`${id}-llama`} cx="0.5" cy="0.72" r="0.62">
      <stop offset="0" stopColor="#FFFBE8" />
      <stop offset="0.3" stopColor="#FFE58A" />
      <stop offset="0.6" stopColor="#FFAE2E" />
      <stop offset="0.85" stopColor="#F26A12" stopOpacity="0.85" />
      <stop offset="1" stopColor="#E0480A" stopOpacity="0" />
    </radialGradient>
  );
}

export default function Veladora({ color = 'blanca', alto = 64, semilla = 0, className = '' }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [luz, media, sombra] = CERA[color];
  return (
    <span className={`vela vela--veladora ${className}`} style={{ ['--alto' as string]: `${alto}px`, ...ritmo(semilla) }} aria-hidden="true">
      <span className="vela__resplandor" />
      <svg viewBox="0 0 40 80" width={alto * 0.5} height={alto}>
        <defs>
          <DefsLlama id={id} />
          <linearGradient id={`${id}-cera`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={luz} />
            <stop offset="0.35" stopColor={media} />
            <stop offset="1" stopColor={sombra} />
          </linearGradient>
          <linearGradient id={`${id}-vidrio`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000" stopOpacity="0.35" />
            <stop offset="0.18" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="0.8" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id={`${id}-dentro`} cx="0.5" cy="0.32" r="0.5">
            <stop offset="0" stopColor="#FFD580" stopOpacity="0.75" />
            <stop offset="1" stopColor="#FFB040" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sombra en la mesa */}
        <ellipse cx="20" cy="78.5" rx="17" ry="1.8" fill="#000" opacity="0.35" />
        {/* Interior del vaso iluminado por la llama */}
        <rect x="4" y="7" width="32" height="71" rx="3" fill="rgba(255,240,210,0.08)" />
        <ellipse cx="20" cy="24" rx="17" ry="20" fill={`url(#${id}-dentro)`} />
        {/* Cera */}
        <rect x="5" y="30" width="30" height="47.5" rx="2.5" fill={`url(#${id}-cera)`} />
        <ellipse cx="20" cy="30.5" rx="14.5" ry="2.4" fill={luz} />
        <ellipse cx="20" cy="30.6" rx="6" ry="1.2" fill="#FFF8E4" opacity="0.8" />
        {/* Banda impresa del vaso */}
        <rect x="5" y="50" width="30" height="13" fill="#fff" opacity={color === 'blanca' ? 0 : 0.14} />
        {color === 'blanca' ? (
          <g opacity="0.85">
            <rect x="5" y="51" width="30" height="1.3" fill="#2C6A8E" />
            <rect x="5" y="61.5" width="30" height="1.3" fill="#2C6A8E" />
            {[9, 15, 21, 27, 33].map(x => <circle key={x} cx={x - 1} cy="56.8" r="1.6" fill="#C2185B" />)}
          </g>
        ) : (
          [9, 15, 21, 27, 33].map(x => <circle key={x} cx={x - 1} cy="56.5" r="1.2" fill="#fff" opacity="0.55" />)
        )}
        {/* Pabilo y llama, hundidos en el vaso */}
        <path d="M20 31.5v-4.5" stroke="#2A1A10" strokeWidth="0.9" strokeLinecap="round" />
        <Llama cx={20} base={29} alto={17} id={id} />
        {/* Vidrio por encima: sombras laterales, reflejos y borde */}
        <rect x="4" y="7" width="32" height="71" rx="3" fill={`url(#${id}-vidrio)`} />
        <rect x="8" y="10" width="2.2" height="64" rx="1.1" fill="#fff" opacity="0.4" />
        <rect x="31" y="14" width="1" height="56" rx="0.5" fill="#fff" opacity="0.2" />
        <ellipse cx="20" cy="7.2" rx="16" ry="1.6" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8" />
      </svg>
    </span>
  );
}

/** Cirio de altar sobre candelero de latón. `alto` es el alto total en px. */
export function Cirio({ alto = 220, semilla = 0, className = '' }: Omit<Props, 'color'>) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <span className={`vela vela--cirio ${className}`} style={{ ['--alto' as string]: `${alto}px`, ...ritmo(semilla) }} aria-hidden="true">
      <span className="vela__resplandor" />
      <svg viewBox="0 0 40 200" width={alto * 0.2} height={alto}>
        <defs>
          <DefsLlama id={id} />
          <linearGradient id={`${id}-cera`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#A8977A" />
            <stop offset="0.3" stopColor="#FFF6E0" />
            <stop offset="0.55" stopColor="#F3E6C8" />
            <stop offset="1" stopColor="#9E8B6A" />
          </linearGradient>
          <linearGradient id={`${id}-cima`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFE2A0" />
            <stop offset="1" stopColor="#FFE2A0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-laton`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6E4C12" />
            <stop offset="0.35" stopColor="#F6D77E" />
            <stop offset="0.5" stopColor="#C99A34" />
            <stop offset="1" stopColor="#5E400E" />
          </linearGradient>
        </defs>

        {/* Cera, con la parte alta encendida por la llama y escurrimientos */}
        <rect x="11" y="30" width="18" height="118" rx="1.5" fill={`url(#${id}-cera)`} />
        <rect x="11" y="30" width="18" height="26" fill={`url(#${id}-cima)`} opacity="0.55" />
        <path d="M11 32c0 6 2.4 8 2.4 13s-2 5-2.4 2z" fill="#FFF6E0" />
        <path d="M26.5 31c0 9 2.5 11 2.5 18s-2.2 6-2.5 2z" fill="#E9DABA" />
        <path d="M18 31c0 3 1.4 4 1.4 6.5s-1.4 2.5-1.4 1z" fill="#FFF6E0" opacity="0.8" />
        <ellipse cx="20" cy="30.5" rx="9" ry="2" fill="#FFF1C8" />
        <path d="M20 31v-4" stroke="#2A1A10" strokeWidth="0.9" strokeLinecap="round" />
        <Llama cx={20} base={28} alto={24} id={id} />

        {/* Candelero: platillo, nudos, columna y pie */}
        <ellipse cx="20" cy="149" rx="15" ry="3.2" fill={`url(#${id}-laton)`} />
        <rect x="14" y="150" width="12" height="5" rx="2" fill={`url(#${id}-laton)`} />
        <ellipse cx="20" cy="160" rx="6.5" ry="4.5" fill={`url(#${id}-laton)`} />
        <rect x="17.2" y="163" width="5.6" height="18" fill={`url(#${id}-laton)`} />
        <ellipse cx="20" cy="182" rx="5.5" ry="3.2" fill={`url(#${id}-laton)`} />
        <path d="M8 197c2-9 7-13 12-13s10 4 12 13z" fill={`url(#${id}-laton)`} />
        <ellipse cx="20" cy="197.5" rx="13" ry="2" fill="#4A320A" />
      </svg>
    </span>
  );
}
