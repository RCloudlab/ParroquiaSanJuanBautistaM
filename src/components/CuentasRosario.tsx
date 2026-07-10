import { useMemo } from 'react';
import type { Paso } from '../data/rosario';
import './CuentasRosario.css';

/**
 * Decena del rosario dibujada en SVG con aspecto realista: cuentas de
 * granate/madera con luz especular y una cuenta dorada de Padre Nuestro.
 * Todo son gradientes SVG + transiciones CSS (transform/opacity), sin imágenes.
 *
 * Recibe el paso actual y deduce qué cuenta resaltar:
 *  - padrenuestro / anuncio → cuenta dorada superior activa
 *  - avemaría n → cuenta n activa, las anteriores llenas
 *  - gloria / jaculatoria → decena completa (brillo de cierre)
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

interface PosCuenta {
  x: number;
  y: number;
}

function posiciones(): PosCuenta[] {
  // 11 posiciones en círculo: la dorada arriba (-90°) y las 10 avemarías después
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
          {/* Cuenta granate (madera pulida) */}
          <radialGradient id="cuenta-granate" cx="0.35" cy="0.3" r="0.85">
            <stop offset="0%" stopColor="#d96a5a" />
            <stop offset="35%" stopColor="#a52020" />
            <stop offset="80%" stopColor="#6e1414" />
            <stop offset="100%" stopColor="#4a0d0d" />
          </radialGradient>
          {/* Cuenta apagada (aún no rezada) */}
          <radialGradient id="cuenta-apagada" cx="0.35" cy="0.3" r="0.85">
            <stop offset="0%" stopColor="#b9a08e" />
            <stop offset="45%" stopColor="#8d7360" />
            <stop offset="100%" stopColor="#5f4a3a" />
          </radialGradient>
          {/* Cuenta dorada del Padre Nuestro */}
          <radialGradient id="cuenta-oro" cx="0.35" cy="0.3" r="0.9">
            <stop offset="0%" stopColor="#f7e7ae" />
            <stop offset="40%" stopColor="#d9b254" />
            <stop offset="85%" stopColor="#9a7420" />
            <stop offset="100%" stopColor="#6e5214" />
          </radialGradient>
          <radialGradient id="brillo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Cordón que une las cuentas */}
        <circle
          className="cuentas__cordon"
          cx={CX}
          cy={CY}
          r={RADIO_ANILLO}
          fill="none"
        />

        {/* Cuenta dorada (Padre Nuestro) arriba */}
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
          <circle
            cx={CX}
            cy={CY - RADIO_ANILLO}
            r={RADIO_PN}
            fill="url(#cuenta-oro)"
          />
          <ellipse
            cx={CX - 6}
            cy={CY - RADIO_ANILLO - 7}
            rx={6}
            ry={4}
            fill="url(#brillo)"
          />
        </g>

        {/* Las diez avemarías */}
        {puntos.map((p, i) => {
          const n = i + 1;
          const activa = esAve && n === cuentaActiva;
          const rellena = llena(n);
          const atenuada = n > visibles;
          return (
            <g
              key={n}
              className={[
                'cuentas__cuenta',
                activa ? 'cuentas__cuenta--activa' : '',
                rellena ? 'cuentas__cuenta--llena' : '',
                atenuada ? 'cuentas__cuenta--atenuada' : '',
              ].filter(Boolean).join(' ')}
              style={{
                transformOrigin: `${p.x}px ${p.y}px`,
                // Entrada escalonada de las cuentas al montar
                animationDelay: `${i * 45}ms`,
              }}
            >
              {activa && (
                <circle className="cuentas__halo" cx={p.x} cy={p.y} r={RADIO_CUENTA + 6} />
              )}
              <circle
                className="cuentas__esfera"
                cx={p.x}
                cy={p.y}
                r={RADIO_CUENTA}
                fill={rellena || activa ? 'url(#cuenta-granate)' : 'url(#cuenta-apagada)'}
              />
              <ellipse
                cx={p.x - 4.5}
                cy={p.y - 5.5}
                rx={4.5}
                ry={3}
                fill="url(#brillo)"
                opacity={rellena || activa ? 0.85 : 0.4}
              />
            </g>
          );
        })}

        {/* Cruz central */}
        <g className="cuentas__cruz" opacity={0.9}>
          <rect x={CX - 3} y={CY - 26} width={6} height={52} rx={2.5} fill="url(#cuenta-oro)" />
          <rect x={CX - 17} y={CY - 12} width={34} height={6} rx={2.5} fill="url(#cuenta-oro)" />
        </g>
      </svg>
    </div>
  );
}
