import { useEffect, useMemo, useRef, useState } from 'react';
import type { GrupoId } from './rosarioResumen';
import './RosarioHero.css';

/**
 * Rosario decorativo del home, dibujado en SVG (sin WebGL ni imágenes).
 *
 * Por qué SVG y no 3D real: un canvas WebGL costaría ~150 KB de JS, bloquearía
 * el hilo principal en móviles de gama baja y no aportaría nada al SEO. Aquí la
 * sensación de volumen se consigue con gradientes radiales, sombra proyectada y
 * un balanceo suave — todo en CSS, animando solo transform/opacity (propiedades
 * compositables, sin reflow) y con un coste de red de 0 KB adicionales.
 *
 * Es puramente decorativo: aria-hidden, para que el lector de pantalla lea el
 * texto real de la sección y no una lista de círculos.
 */

interface Props {
  /** Grupo del día: tiñe las rosas con su color litúrgico */
  grupo: GrupoId;
}

/** Las diez avemarías de una decena. Las cinco decenas completas serían
 *  ilegibles a este tamaño, así que el aro representa una sola. */
const CUENTAS_ARO = 10;
/** Arco que ocupan. Se deja abajo un hueco para la cola exactamente igual de
 *  ancho que la separación entre rosas, para que el aro se vea regular. */
const ARCO = (360 / CUENTAS_ARO) * (CUENTAS_ARO - 1);
const CX = 100;
const CY = 88;
const RADIO = 62;

interface Punto {
  x: number;
  y: number;
  /** Ángulo en grados, para orientar cada rosa hacia fuera */
  ang: number;
}

function puntosAro(): Punto[] {
  const p: Punto[] = [];
  for (let i = 0; i < CUENTAS_ARO; i++) {
    // Se reparten sobre el arco dejando abajo el hueco de la cola. El paso va
    // entre CUENTAS_ARO - 1 intervalos: con CUENTAS_ARO el último hueco salía
    // del doble de ancho que los demás y parecía faltar una rosa.
    const grados = -90 + (ARCO / (CUENTAS_ARO - 1)) * i + (360 - ARCO) / 2;
    const rad = grados * (Math.PI / 180);
    p.push({
      x: CX + RADIO * Math.cos(rad),
      y: CY + RADIO * Math.sin(rad),
      ang: grados + 90,
    });
  }
  return p;
}

/**
 * Rosa compacta: corola exterior de pétalos en gota + tres pétalos internos
 * enroscados + botón. Menos detalle que en el rezo, porque aquí se ve a ~18 px.
 *
 * El pétalo es un path en forma de gota (ancho arriba, en punta hacia el
 * centro) en vez de una elipse: a este tamaño la elipse lee como margarita,
 * mientras que la gota conserva la silueta de rosa.
 */
function petaloD(x: number, y: number, r: number) {
  const a = r * 0.52;   // medio ancho del pétalo
  const alto = r * 1.02; // desde el centro hasta el borde exterior
  return `M ${x} ${y}
          C ${x - a} ${y - alto * 0.34}, ${x - a} ${y - alto * 0.86}, ${x} ${y - alto}
          C ${x + a} ${y - alto * 0.86}, ${x + a} ${y - alto * 0.34}, ${x} ${y} Z`;
}

function Rosa({ x, y, r, ang, clase }: { x: number; y: number; r: number; ang: number; clase: string }) {
  return (
    <g className={clase} transform={`rotate(${ang} ${x} ${y})`} style={{ transformOrigin: `${x}px ${y}px` }}>
      {/* Corola exterior: cinco pétalos abiertos */}
      {[0, 1, 2, 3, 4].map(i => (
        <path
          key={i}
          d={petaloD(x, y, r)}
          fill="url(#rh-petalo)"
          transform={`rotate(${72 * i} ${x} ${y})`}
        />
      ))}
      {/* Corola interior: tres pétalos más pequeños y girados, que dan el
          enroscado del centro de la rosa */}
      {[0, 1, 2].map(i => (
        <path
          key={`i${i}`}
          d={petaloD(x, y, r * 0.58)}
          fill="url(#rh-petalo-int)"
          transform={`rotate(${120 * i + 40} ${x} ${y})`}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.2} fill="url(#rh-corazon)" />
    </g>
  );
}

export default function RosarioHero({ grupo }: Props) {
  const puntos = useMemo(puntosAro, []);
  const ref = useRef<HTMLDivElement>(null);
  // Las animaciones son en bucle: fuera del viewport se pausan para no gastar
  // batería ni GPU mientras el usuario lee otra parte de la página.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo || !('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver(
      ([entrada]) => setVisible(entrada.isIntersecting),
      { rootMargin: '120px' },
    );
    obs.observe(nodo);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rh ${visible ? '' : 'rh--pausado'}`}
      data-misterio={grupo}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 232" className="rh__svg" role="presentation">
        <defs>
          {/* Pétalo: el gradiente descentrado hace de luz alta y da volumen */}
          <radialGradient id="rh-petalo" cx="0.36" cy="0.28" r="0.85">
            <stop offset="0%" stopColor="var(--rh-1)" />
            <stop offset="48%" stopColor="var(--rh-2)" />
            <stop offset="100%" stopColor="var(--rh-3)" />
          </radialGradient>
          {/* Corola interior: un tono más clara, para que el centro no se
              empaste con los pétalos exteriores */}
          <radialGradient id="rh-petalo-int" cx="0.4" cy="0.3" r="0.85">
            <stop offset="0%" stopColor="var(--rh-1)" />
            <stop offset="60%" stopColor="var(--rh-2)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--rh-3)" stopOpacity="0.9" />
          </radialGradient>
          <radialGradient id="rh-corazon" cx="0.4" cy="0.35" r="0.8">
            <stop offset="0%" stopColor="#fff6da" />
            <stop offset="65%" stopColor="#e3c168" />
            <stop offset="100%" stopColor="#a07a28" />
          </radialGradient>
          {/* Oro de la cruz y la medalla */}
          <linearGradient id="rh-oro" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f3dfa2" />
            <stop offset="45%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#8a6620" />
          </linearGradient>
          {/* Resplandor detrás del aro */}
          <radialGradient id="rh-aura" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--rh-aura)" stopOpacity="0.5" />
            <stop offset="70%" stopColor="var(--rh-aura)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--rh-aura)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Aura de fondo: late lentamente, como luz de vela */}
        <circle className="rh__aura" cx={CX} cy={CY} r={86} fill="url(#rh-aura)" />

        {/* Grupo que balancea: da la sensación de rosario colgando */}
        <g className="rh__balanceo">
          {/* Cordón del aro */}
          <circle
            className="rh__cordon"
            cx={CX}
            cy={CY}
            r={RADIO}
            fill="none"
            strokeDasharray="1 6"
          />

          {puntos.map((p, i) => (
            <g
              key={i}
              className="rh__cuenta"
              style={{ animationDelay: `${i * 160}ms` }}
            >
              <Rosa x={p.x} y={p.y} r={15} ang={p.ang} clase="rh__rosa" />
            </g>
          ))}

          {/* Cola: baja desde el hueco inferior del aro hasta la cruz */}
          <path
            className="rh__cordon rh__cola"
            d={`M ${CX} ${CY + RADIO} L ${CX} ${CY + RADIO + 84}`}
            strokeDasharray="1 6"
          />

          {/* Medalla de unión, justo bajo el aro */}
          <circle cx={CX} cy={CY + RADIO + 11} r={6} fill="url(#rh-oro)" />

          {/* Tres rosas de la cola, bien separadas para que se lean sueltas */}
          {[30, 52, 74].map((dy, i) => (
            <g key={dy} className="rh__cuenta" style={{ animationDelay: `${(i + CUENTAS_ARO) * 160}ms` }}>
              <Rosa x={CX} y={CY + RADIO + dy} r={10} ang={0} clase="rh__rosa" />
            </g>
          ))}

          {/* Cruz */}
          <g className="rh__cruz">
            <rect x={CX - 2.6} y={CY + RADIO + 86} width={5.2} height={30} rx={2} fill="url(#rh-oro)" />
            <rect x={CX - 11} y={CY + RADIO + 96} width={22} height={5.2} rx={2} fill="url(#rh-oro)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
