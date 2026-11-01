import { useEffect, useId, useRef, useState } from 'react';

// Arco de cempasúchil como los de los altares tradicionales: flores
// ensartadas sobre un mecate que sube por dos "patas" y se curva arriba,
// con hojas y alguna flor roja intercalada. Sin patas queda como guirnalda
// en arco. Las flores son las ilustraciones de public/todos-los-santos/.
//
// Se mide a sí mismo y dibuja en píxeles reales para que las flores sean
// siempre redondas (un viewBox estirado las aplastaría). Cada flor es un
// <use> de un único <symbol>, así cientos de flores no pesan.

const FLOR = '/todos-los-santos/flor-cempasuchil.webp';
const FLOR_ROJA = '/todos-los-santos/flor-roja.webp';

interface Props {
  className?: string;
  /** Con patas (arco completo, que llega al piso) o solo la curva superior. */
  patas?: boolean;
  /** Diámetro base de cada flor, en px. */
  flor?: number;
}

function useTamano() {
  const ref = useRef<HTMLDivElement>(null);
  const [tam, setTam] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const medir = () => setTam({ w: el.clientWidth, h: el.clientHeight });
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, tam] as const;
}

const azar = (s: number) => {
  const x = Math.sin(s * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** Puntos equiespaciados sobre el arco: pata izquierda, semielipse, pata derecha. */
function puntosArco(w: number, h: number, margen: number, paso: number, patas: boolean) {
  const rx = w / 2 - margen;
  const ry = patas ? Math.min(rx * 0.62, h * 0.42) : h - margen * 1.4;
  const cy = margen + ry;
  // Muestreo fino de la curva y luego reparto por longitud recorrida
  const fino: { x: number; y: number; a: number }[] = [];
  if (patas) for (let y = h - margen * 0.6; y > cy; y -= 2) fino.push({ x: margen, y, a: 180 });
  for (let t = 180; t <= 360; t += 0.5) {
    const r = (t * Math.PI) / 180;
    fino.push({ x: w / 2 + Math.cos(r) * rx, y: cy + Math.sin(r) * ry, a: t });
  }
  if (patas) for (let y = cy; y < h - margen * 0.6; y += 2) fino.push({ x: w - margen, y, a: 360 });

  const puntos: { x: number; y: number; a: number }[] = [];
  let acumulado = paso;
  for (let i = 1; i < fino.length; i++) {
    acumulado += Math.hypot(fino[i].x - fino[i - 1].x, fino[i].y - fino[i - 1].y);
    if (acumulado >= paso) {
      puntos.push(fino[i]);
      acumulado = 0;
    }
  }
  return { puntos, rx, ry, cy };
}

export default function ArcoCempasuchil({ className = '', patas = true, flor = 30 }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [ref, { w, h }] = useTamano();
  const margen = flor * 0.75;
  const listo = w > flor * 4 && h > flor * 4;
  const { puntos, rx, ry, cy } = listo ? puntosArco(w, h, margen, flor * 0.62, patas) : { puntos: [], rx: 0, ry: 0, cy: 0 };

  return (
    <div ref={ref} className={`arco-cempa ${className}`} aria-hidden="true">
      {listo && (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
          <defs>
            <symbol id={`${uid}-flor`} viewBox="-50 -50 100 100">
              <image href={FLOR} x="-50" y="-50" width="100" height="100" />
            </symbol>
            <symbol id={`${uid}-hoja`} viewBox="-10 -4 20 8">
              <path d="M-10 0C-5 -4 5 -4 10 0C5 4 -5 4 -10 0Z" fill="#3F7F35" />
              <path d="M-9 0H9" stroke="#8CC47A" strokeWidth="0.6" />
            </symbol>
            <symbol id={`${uid}-roja`} viewBox="-50 -50 100 100">
              <image href={FLOR_ROJA} x="-50" y="-50" width="100" height="100" />
            </symbol>
          </defs>

          {/* Mecate que sostiene las flores */}
          <path
            d={patas
              ? `M${margen} ${h}V${cy}A${rx} ${ry} 0 0 1 ${w - margen} ${cy}V${h}`
              : `M${margen} ${cy}A${rx} ${ry} 0 0 1 ${w - margen} ${cy}`}
            fill="none"
            stroke="#8A6A3E"
            strokeWidth="3"
          />

          {/* Hojas hacia afuera y hacia adentro, detrás de las flores */}
          {puntos.map((p, i) => i % 2 === 0 && (
            <g key={`h${i}`}>
              {[-1, 1].map(lado => {
                const ang = p.a + 90 * lado + (azar(i + lado) - 0.5) * 50;
                const r = (ang * Math.PI) / 180;
                const d = flor * 0.5;
                return (
                  <use
                    key={lado}
                    href={`#${uid}-hoja`}
                    width={flor * 0.9}
                    height={flor * 0.36}
                    x={-flor * 0.45}
                    y={-flor * 0.18}
                    transform={`translate(${p.x + Math.cos(r) * d} ${p.y + Math.sin(r) * d}) rotate(${ang})`}
                  />
                );
              })}
            </g>
          ))}

          {puntos.map((p, i) => {
            const tam = flor * (0.95 + azar(i * 3) * 0.3);
            const roja = i % 9 === 4;
            const t = roja ? tam * 0.85 : tam;
            return (
              <use
                key={i}
                  href={`#${uid}-${roja ? 'roja' : 'flor'}`}
                  width={t}
                  height={t}
                  x={-t / 2}
                  y={-t / 2}
                  transform={`translate(${p.x + (azar(i) - 0.5) * flor * 0.18} ${p.y + (azar(i + 9) - 0.5) * flor * 0.18}) rotate(${azar(i * 7) * 360})`}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}
