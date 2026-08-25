import { useMemo } from 'react';
import type { Paso } from '../data/rosario';
import './CuentasRosario.css';

/**
 * Decena del rosario dibujada en SVG: cada cuenta es una rosa (el rosario es,
 * literalmente, una corona de rosas para la Virgen). Paleta mariana —
 * azul lapislázuli en el cordón, rosa encendido para las avemarías rezadas y
 * blanco nacarado con plata para los padrenuestros y la cruz.
 *
 * Todo son gradientes SVG + transiciones CSS (transform/opacity), sin imágenes.
 *
 * Recibe el paso actual y deduce qué rosa resaltar:
 *  - padrenuestro / anuncio → rosa blanca superior activa
 *  - avemaría n → rosa n activa (abierta y girando), las anteriores florecidas
 *  - gloria / jaculatoria → decena completa (florecimiento de cierre)
 */

interface Props {
  paso: Paso;
  /** Diámetro en px del área del SVG (por defecto se adapta al contenedor) */
  compacto?: boolean;
}

const CUENTAS = 10;
const CX = 110;
const CY = 110;
const RADIO_ANILLO = 78;
const RADIO_CUENTA = 13.5;
const RADIO_PN = 18;
/** Pétalos de cada corola de la rosa */
const PETALOS_EXT = 6;
const PETALOS_INT = 5;

interface PosCuenta {
  x: number;
  y: number;
}

function posiciones(): PosCuenta[] {
  // 11 posiciones en círculo: la rosa blanca arriba (-90°) y las 10 avemarías después
  const puntos: PosCuenta[] = [];
  for (let i = 1; i <= CUENTAS; i++) {
    const ang = (-90 + (360 / (CUENTAS + 1)) * i) * (Math.PI / 180);
    puntos.push({
      x: CX + RADIO_ANILLO * Math.cos(ang),
      y: CY + RADIO_ANILLO * Math.sin(ang),
    });
  }
  return puntos;
}

interface RosaProps {
  x: number;
  y: number;
  r: number;
  /** id del gradiente de los pétalos exteriores */
  petalo: string;
  /** id del gradiente de los pétalos interiores */
  petaloInt: string;
  /** id del gradiente del botón central */
  corazon: string;
  /** desfase para que no todas las rosas salgan idénticas */
  semilla?: number;
}

/**
 * Rosa vista de frente: dos coronas de pétalos (elipses rotadas alrededor del
 * centro) más un botón enroscado. Las corolas llevan clase propia para que el
 * CSS pueda abrirlas/cerrarlas por separado.
 */
function Rosa({ x, y, r, petalo, petaloInt, corazon, semilla = 0 }: RosaProps) {
  const giro = (semilla * 37) % 60;
  // El origen se fija en coordenadas del SVG: transform-box:fill-box sobre <g>
  // no es fiable en todos los navegadores.
  const origen = { transformOrigin: `${x}px ${y}px` };
  return (
    // Capa exterior: giro fijo de la semilla (atributo SVG).
    // Capa interior: la que anima el CSS, para que no se pisen entre sí.
    <g transform={`rotate(${giro} ${x} ${y})`}>
      <g className="cuentas__rosa" style={origen}>
        <g className="cuentas__corola cuentas__corola--ext" style={origen}>
          {Array.from({ length: PETALOS_EXT }, (_, i) => (
            <ellipse
              key={i}
              cx={x}
              cy={y - r * 0.52}
              rx={r * 0.46}
              ry={r * 0.5}
              fill={`url(#${petalo})`}
              transform={`rotate(${(360 / PETALOS_EXT) * i} ${x} ${y})`}
            />
          ))}
        </g>
        <g className="cuentas__corola cuentas__corola--int" style={origen}>
          {Array.from({ length: PETALOS_INT }, (_, i) => (
            <ellipse
              key={i}
              cx={x}
              cy={y - r * 0.28}
              rx={r * 0.3}
              ry={r * 0.32}
              fill={`url(#${petaloInt})`}
              transform={`rotate(${(360 / PETALOS_INT) * i + 36} ${x} ${y})`}
            />
          ))}
        </g>
        <circle cx={x} cy={y} r={r * 0.28} fill={`url(#${corazon})`} />
        <circle
          cx={x}
          cy={y}
          r={r * 0.14}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={r * 0.06}
        />
      </g>
    </g>
  );
}

export default function CuentasRosario({ paso, compacto = false }: Props) {
  const puntos = useMemo(posiciones, []);

  const esAve = paso.tipo === 'avemaria';
  const cuentaActiva = esAve ? (paso.cuenta ?? 0) : 0;
  const decenaCerrada = paso.tipo === 'gloria' || paso.tipo === 'jaculatoria';
  const pnActiva = paso.tipo === 'padrenuestro' || paso.tipo === 'anuncio';
  // En las oraciones iniciales solo hay 3 avemarías: se atenúan las demás
  const visibles = paso.decena === 0 ? 3 : CUENTAS;

  const llena = (n: number) =>
    decenaCerrada || (esAve && n < cuentaActiva);

  return (
    <div
      className={`cuentas ${compacto ? 'cuentas--compacto' : ''} ${decenaCerrada ? 'cuentas--cerrada' : ''}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 220 220" className="cuentas__svg">
        <defs>
          {/* Rosa rezada. Los colores salen de las variables --rosa-* del marco,
              que cambian con el grupo de misterios (ver RosarioMarco.css). */}
          <radialGradient id="petalo-rosa" cx="0.4" cy="0.25" r="0.9">
            <stop offset="0%" stopColor="var(--rosa-1, #ffb3b3)" />
            <stop offset="45%" stopColor="var(--rosa-2, #d92b2b)" />
            <stop offset="100%" stopColor="var(--rosa-3, #8a0f18)" />
          </radialGradient>
          <radialGradient id="petalo-rosa-int" cx="0.45" cy="0.3" r="0.9">
            <stop offset="0%" stopColor="var(--rosa-int-1, #ffe0e0)" />
            <stop offset="55%" stopColor="var(--rosa-int-2, #ee5f60)" />
            <stop offset="100%" stopColor="var(--rosa-int-3, #a81d28)" />
          </radialGradient>
          {/* Rosa en capullo: aún no rezada, azul grisáceo apagado */}
          <radialGradient id="petalo-apagado" cx="0.4" cy="0.25" r="0.9">
            <stop offset="0%" stopColor="#c3cadd" />
            <stop offset="50%" stopColor="#8d99b8" />
            <stop offset="100%" stopColor="#5d688a" />
          </radialGradient>
          <radialGradient id="petalo-apagado-int" cx="0.45" cy="0.3" r="0.9">
            <stop offset="0%" stopColor="#dde2ef" />
            <stop offset="60%" stopColor="#a2accb" />
            <stop offset="100%" stopColor="#6f7a9c" />
          </radialGradient>
          {/* Rosa blanca del Padre Nuestro: nácar con reflejo azulado */}
          <radialGradient id="petalo-blanco" cx="0.4" cy="0.25" r="0.9">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#eef2fb" />
            <stop offset="100%" stopColor="#b9c6e4" />
          </radialGradient>
          <radialGradient id="petalo-blanco-int" cx="0.45" cy="0.3" r="0.9">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f6f8ff" />
            <stop offset="100%" stopColor="#cdd8ef" />
          </radialGradient>
          {/* Botones centrales */}
          <radialGradient id="corazon-oro" cx="0.4" cy="0.35" r="0.8">
            <stop offset="0%" stopColor="#fff4cf" />
            <stop offset="60%" stopColor="#e3c168" />
            <stop offset="100%" stopColor="#a98526" />
          </radialGradient>
          <radialGradient id="corazon-apagado" cx="0.4" cy="0.35" r="0.8">
            <stop offset="0%" stopColor="#e7ebf5" />
            <stop offset="100%" stopColor="#94a0bf" />
          </radialGradient>
          {/* Plata mariana para la cruz */}
          <linearGradient id="plata" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4f7ff" />
            <stop offset="45%" stopColor="#c9d4ea" />
            <stop offset="100%" stopColor="#8d9cbe" />
          </linearGradient>
        </defs>

        {/* Cordón que une las rosas */}
        <circle
          className="cuentas__cordon"
          cx={CX}
          cy={CY}
          r={RADIO_ANILLO}
          fill="none"
        />

        {/* Rosa blanca (Padre Nuestro) arriba */}
        <g
          className={`cuentas__pn ${pnActiva ? 'cuentas__cuenta--activa' : ''}`}
          style={{ transformOrigin: `${CX}px ${CY - RADIO_ANILLO}px` }}
        >
          {pnActiva && (
            <circle
              className="cuentas__halo"
              cx={CX}
              cy={CY - RADIO_ANILLO}
              r={RADIO_PN + 7}
            />
          )}
          <Rosa
            x={CX}
            y={CY - RADIO_ANILLO}
            r={RADIO_PN}
            petalo="petalo-blanco"
            petaloInt="petalo-blanco-int"
            corazon="corazon-oro"
          />
        </g>

        {/* Las diez avemarías */}
        {puntos.map((p, i) => {
          const n = i + 1;
          const activa = esAve && n === cuentaActiva;
          const rellena = llena(n);
          const atenuada = n > visibles;
          const abierta = rellena || activa;
          return (
            <g
              key={n}
              className={[
                'cuentas__cuenta',
                activa ? 'cuentas__cuenta--activa' : '',
                rellena ? 'cuentas__cuenta--llena' : '',
                atenuada ? 'cuentas__cuenta--atenuada' : '',
                abierta ? '' : 'cuentas__cuenta--capullo',
              ].filter(Boolean).join(' ')}
              style={{
                transformOrigin: `${p.x}px ${p.y}px`,
                // Entrada escalonada de las rosas al montar
                animationDelay: `${i * 45}ms`,
              }}
            >
              {activa && (
                <circle className="cuentas__halo" cx={p.x} cy={p.y} r={RADIO_CUENTA + 6} />
              )}
              <Rosa
                x={p.x}
                y={p.y}
                r={RADIO_CUENTA}
                petalo={abierta ? 'petalo-rosa' : 'petalo-apagado'}
                petaloInt={abierta ? 'petalo-rosa-int' : 'petalo-apagado-int'}
                corazon={abierta ? 'corazon-oro' : 'corazon-apagado'}
                semilla={n}
              />
            </g>
          );
        })}

        {/* Cruz central en plata mariana */}
        <g className="cuentas__cruz" opacity={0.9}>
          <rect x={CX - 3} y={CY - 26} width={6} height={52} rx={2.5} fill="url(#plata)" />
          <rect x={CX - 17} y={CY - 12} width={34} height={6} rx={2.5} fill="url(#plata)" />
        </g>
      </svg>
    </div>
  );
}
