import type { ReactNode } from 'react';
import type { SimboloSanto as Simbolo } from '../data/todosLosSantos';

// Símbolos dibujados a mano en una caja de 100×100, pintados con
// currentColor. Se usan igual dentro de la estampa de cada santo y como
// "recorte" dentro de las máscaras del papel picado (ahí el color es negro).

/** Puntos de una estrella de `puntas` picos centrada en (cx, cy). */
function puntosEstrella(cx: number, cy: number, puntas: number, rExt: number, rInt: number) {
  return Array.from({ length: puntas * 2 }, (_, i) => {
    const r = i % 2 === 0 ? rExt : rInt;
    const a = (Math.PI / puntas) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
}

/** Rayos finos (triángulos) alrededor de un centro. */
function Rayos({ cx, cy, n, r1, r2, ancho = 2.2 }: { cx: number; cy: number; n: number; r1: number; r2: number; ancho?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <polygon
          key={i}
          points={`${cx - ancho},${cy - r1} ${cx + ancho},${cy - r1} ${cx},${cy - r2}`}
          transform={`rotate(${(360 / n) * i} ${cx} ${cy})`}
        />
      ))}
    </>
  );
}

// Líneas de detalle (vetas de la concha, lomo del libro…) en el color del
// fondo: en la estampa es el tono del santo; en la máscara del papel picado
// es blanco, así esas líneas quedan como "puentes" de papel. Va por style
// porque los atributos de presentación SVG no aceptan var().
const FONDO = 'var(--simbolo-fondo, #000)';
const DETALLE = { stroke: FONDO };

const SIMBOLOS: Record<Simbolo, ReactNode> = {
  cruz: <path d="M45 12h10v24h22v10H55v42H45V46H23V36h22z" />,

  paloma: (
    <path d="M14 56c7-5 15-7 23-5 5-13 16-25 33-31-6 10-8 19-8 27 8-3 17-2 24 3-9 2-16 6-21 11-3 11-14 19-29 19 6-6 8-11 8-15-11 0-22-3-30-9z" />
  ),

  lirio: (
    <>
      <path d="M50 10c8 14 8 30 0 44-8-14-8-30 0-44z" />
      <path d="M47 52c-12-2-24-12-26-28 10 8 18 14 26 22z" />
      <path d="M53 52c12-2 24-12 26-28-10 8-18 14-26 22z" />
      <rect x="48.4" y="52" width="3.2" height="38" />
      <path d="M50 82c-10-2-18-10-20-18 8 4 16 8 20 14z" />
      <path d="M50 74c10-2 18-10 20-18-8 4-16 8-20 14z" />
    </>
  ),

  estrella: <polygon points={puntosEstrella(50, 50, 8, 40, 17)} />,

  corazon: (
    <>
      <path d="M50 90C30 76 18 64 18 50c0-10 8-18 18-18 6 0 11 3 14 8 3-5 8-8 14-8 10 0 18 8 18 18 0 14-12 26-32 40z" />
      <path d="M50 30c-6-6-5-14 0-22 5 8 6 16 0 22z" />
      <path d="M41 32c-5-3-6-8-3-13 4 4 5 8 3 13z" />
      <path d="M59 32c5-3 6-8 3-13-4 4-5 8-3 13z" />
    </>
  ),

  custodia: (
    <>
      <circle cx="50" cy="40" r="12" />
      <circle cx="50" cy="40" r="17.5" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <Rayos cx={50} cy={40} n={18} r1={22} r2={38} ancho={2} />
      <rect x="47" y="60" width="6" height="22" />
      <path d="M34 92c2-7 8-10 16-10s14 3 16 10z" />
    </>
  ),

  flor: (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx="50" cy="30" rx="9.5" ry="19" transform={`rotate(${i * 60} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="7" opacity="0.55" />
    </>
  ),

  rosa: (
    <>
      <path d="M50 18c12 0 24 8 24 22 0 14-10 22-24 22S26 54 26 40c0-14 12-22 24-22z" />
      <path d="M40 38c2-8 12-11 18-6 5 4 3 12-3 13" fill="none" style={DETALLE} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M36 46c4 6 14 8 22 3" fill="none" style={DETALLE} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="48.5" y="60" width="3" height="30" />
      <path d="M50 76c-10 0-18-6-20-14 8 1 16 6 20 12z" />
      <path d="M50 70c10 0 17-6 19-13-8 1-15 5-19 11z" />
    </>
  ),

  concha: (
    <>
      <path d="M50 82L16 44a36 34 0 0 1 68 0z" />
      {[-30, -15, 0, 15, 30].map(dx => (
        <line key={dx} x1="50" y1="80" x2={50 + dx} y2="18" style={DETALLE} strokeWidth="2" />
      ))}
      <path d="M38 80h24l-4 10H42z" />
    </>
  ),

  trigo: (
    <>
      <rect x="48.6" y="20" width="2.8" height="72" />
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i}>
          <ellipse cx="42" cy={26 + i * 11} rx="5" ry="10" transform={`rotate(-32 42 ${26 + i * 11})`} />
          <ellipse cx="58" cy={26 + i * 11} rx="5" ry="10" transform={`rotate(32 58 ${26 + i * 11})`} />
        </g>
      ))}
      <ellipse cx="50" cy="14" rx="4.5" ry="9" />
    </>
  ),

  libro: (
    <>
      <path d="M50 30C40 23 26 21 12 23v54c14-2 28 0 38 7 10-7 24-9 38-7V23c-14-2-28 0-38 7z" />
      <line x1="50" y1="32" x2="50" y2="80" style={DETALLE} strokeWidth="2.4" />
      <path d="M50 22l-4-10h8z" />
    </>
  ),

  llaves: (
    <>
      {[-38, 38].map(rot => (
        <g key={rot} transform={`rotate(${rot} 50 52)`}>
          <circle cx="50" cy="18" r="9" fill="none" stroke="currentColor" strokeWidth="5" />
          <rect x="47.5" y="26" width="5" height="60" />
          <rect x="52" y="72" width="11" height="5" />
          <rect x="52" y="80" width="8" height="5" />
        </g>
      ))}
    </>
  ),

  lira: (
    <>
      <path d="M30 18c-10 22-6 46 12 60h16c18-14 22-38 12-60" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <rect x="24" y="26" width="52" height="5" rx="2" />
      {[40, 47, 53, 60].map(x => (
        <rect key={x} x={x - 0.8} y="30" width="1.6" height="46" />
      ))}
      <rect x="38" y="76" width="24" height="10" rx="3" />
    </>
  ),

  palma: (
    <>
      <path d="M30 92C38 66 48 40 70 10" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      {Array.from({ length: 8 }, (_, i) => {
        const t = i / 8;
        const x = 32 + t * 36;
        const y = 86 - t * 72;
        const largo = 20 - i * 1.4;
        return (
          <g key={i}>
            <path d={`M${x} ${y}q${-largo * 0.6} ${-largo * 0.1} ${-largo} ${-largo * 0.7}q${largo * 0.7} ${largo * 0.05} ${largo} ${largo * 0.5}z`} />
            <path d={`M${x} ${y}q${largo * 0.8} ${largo * 0.05} ${largo * 1.1} ${-largo * 0.3}q${-largo * 0.6} ${largo * 0.5} ${-largo * 1.1} ${largo * 0.5}z`} />
          </g>
        );
      })}
    </>
  ),

  montana: (
    <>
      <path d="M6 86L36 44l12 16 16-30 30 56z" />
      <path d="M64 30l-8 15 5-2 3 5 3-5 5 2z" style={{ fill: FONDO }} opacity="0.5" />
      <rect x="62.6" y="8" width="2.8" height="18" />
      <rect x="58" y="12.5" width="12" height="2.8" />
    </>
  ),

  llama: (
    <path d="M50 90c-20-4-26-22-18-36 2 8 8 10 10 10-6-16 2-34 14-48 0 16 10 24 14 36 2-6 2-10 0-16 10 12 10 30 2 42-6 8-14 12-22 12z" />
  ),
};

/** El símbolo como grupo SVG; `x`, `y` y `size` lo colocan dentro del SVG padre. */
export default function SimboloSanto({ simbolo, x = 0, y = 0, size = 100 }: { simbolo: Simbolo; x?: number; y?: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`} fill="currentColor">
      {SIMBOLOS[simbolo]}
    </g>
  );
}
