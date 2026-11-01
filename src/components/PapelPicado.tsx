import { useEffect, useRef, useState } from 'react';
import './PapelPicado.css';

// Papel picado colgando de lado a lado, sobre una cuerda curva y meciéndose
// apenas, como con una corriente de aire. Todas las banderas son el mismo
// diseño, el Cordero con la concha (símbolos de San Juan Bautista, patrono
// de la parroquia), en papel de distintos colores, como se cuelga
// tradicionalmente. Imágenes en public/todos-los-santos/papel-cordero-*.webp.
//
// El número de banderas se calcula según el ancho real del contenedor para
// que en un teléfono no queden diminutas ni en una pantalla ancha enormes.

export interface TiraPapelPicado {
  /** Ancho aproximado de cada bandera en px; define cuántas caben. */
  ancho: number;
  /** Cuánto se cuelga la cuerda al centro, en px. */
  colgado: number;
  /** Distancia desde el borde superior del contenedor, en px. */
  arriba?: number;
  /** Desplaza el ciclo de banderas para que dos tiras no coincidan. */
  desfase?: number;
  /** Tiras "de fondo": un poco más tenues, para dar profundidad. */
  fondo?: boolean;
  /** Fracción del espacio de cada bandera que ocupa el papel (el resto es
   *  aire entre banderas). Por omisión 0.9. */
  ocupa?: number;
  /** Cuelga las banderas en los huecos de una tira con el mismo `ancho`
   *  (medio paso corridas): así dos tiras superpuestas se ven las dos. */
  escalonada?: boolean;
}

const COLORES = ['rosa', 'amarillo', 'turquesa', 'naranja', 'morado', 'verde', 'rojo', 'azul'];
const PROPORCION = 1.25; // alto / ancho de la bandera

/** Pseudoaleatorio estable a partir de una semilla: mismas variaciones en cada render. */
const azar = (semilla: number) => {
  const s = Math.sin(semilla * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

function useAnchoContenedor() {
  const ref = useRef<HTMLDivElement>(null);
  const [ancho, setAncho] = useState(() => (typeof window === 'undefined' ? 1200 : window.innerWidth));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const medir = () => setAncho(el.clientWidth);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, ancho] as const;
}

/** Con `entrada`, al montarse las banderas caen desde arriba una tras otra
 *  (de la orilla al centro) y se columpian hasta quedar colgadas. */
export default function PapelPicado({ tiras, className = '', entrada = false }: { tiras: TiraPapelPicado[]; className?: string; entrada?: boolean }) {
  const [ref, ancho] = useAnchoContenedor();

  const calculadas = tiras.map((tira, t) => {
    const n = Math.max(4, Math.round(ancho / tira.ancho));
    const anchoBandera = (ancho / n) * (tira.ocupa ?? 0.9);
    const arriba = tira.arriba ?? 0;
    return { ...tira, t, n, anchoBandera, arriba, alto: arriba + tira.colgado + anchoBandera * PROPORCION + 12 };
  });
  const altoTotal = Math.max(0, ...calculadas.map(c => c.alto));

  return (
    <div ref={ref} className={`pp${entrada ? ' pp--entrada' : ''} ${className}`} style={{ height: altoTotal }} aria-hidden="true">
      {calculadas.map(({ t, n, anchoBandera, arriba, colgado, desfase = 0, fondo, escalonada }) => (
        <div key={t} className={`pp__tira${fondo ? ' pp__tira--fondo' : ''}`} style={{ top: arriba }}>
          <svg className="pp__cuerda" viewBox={`0 0 1000 ${colgado + 6}`} preserveAspectRatio="none" style={{ height: colgado + 6 }}>
            <path d={`M-4 3Q500 ${3 + colgado * 2} 1004 3`} vectorEffect="non-scaling-stroke" />
          </svg>

          {/* Escalonada: n + 1 banderas en las fronteras entre las de la otra
              tira (las de los extremos quedan medio fuera, como si la cuerda
              siguiera más allá). */}
          {Array.from({ length: escalonada ? n + 1 : n }, (_, i) => {
            const x = escalonada ? i / n : (i + 0.5) / n;
            const semilla = (t + 1) * 101 + i * 7;
            const color = COLORES[(i + desfase) % COLORES.length];
            return (
              <div
                key={i}
                className="pp__bandera"
                style={{
                  left: `${x * 100}%`,
                  top: colgado * 4 * x * (1 - x),
                  width: anchoBandera,
                  marginLeft: -anchoBandera / 2,
                  ['--giro' as string]: `${(azar(semilla) - 0.5) * 4}deg`,
                  ['--dur' as string]: `${4.5 + azar(semilla + 1) * 1.2}s`,
                  ['--retraso' as string]: `${-azar(semilla + 2) * 3}s`,
                  // Orden de caída en la entrada: de las orillas hacia el centro
                  ['--orden' as string]: Math.round(Math.abs(x - 0.5) * -n + n / 2),
                }}
              >
                <img
                  className="pp__papel"
                  src={`/todos-los-santos/papel-cordero-${color}.webp`}
                  alt=""
                  draggable={false}
                  decoding="async"
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
