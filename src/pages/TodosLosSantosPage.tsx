import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, ChevronRight, Lightbulb, Quote, Shuffle, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import PapelPicado, { type TiraPapelPicado } from '../components/PapelPicado';
import EstampaSanto from '../components/EstampaSanto';
import ArcoCempasuchil from '../components/ArcoCempasuchil';
import TapeteAserrin from '../components/TapeteAserrin';
import IntroSantos from '../components/IntroSantos';
import Veladora, { Cirio, type ColorVeladora } from '../components/Veladora';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { CELEBRACIONES, DETALLES, SANTOS, type Santo } from '../data/todosLosSantos';
import './TodosLosSantosPage.css';

// Página /eventos/todos-los-santos: Solemnidad de Todos los Santos (1 nov).
// Estética mexicana tradicional: papel picado, arcos de cempasúchil, un
// altar escalonado con los santos, veladoras y marcos de estampa (piezas
// ilustradas en public/todos-los-santos/; la imagen de cada santo es SVG).
// Diseño de noche: cielo con el pueblo y su iglesia en el horizonte, luz de
// veladoras. Los colores de noche viven en las reglas [data-modo="noche"]
// de TodosLosSantosPage.css, sobre la paleta base. Datos en
// data/todosLosSantos.ts.

/** Cuántos santos lleva cada escalón del altar, de arriba hacia abajo. Los
 *  dos últimos solo aparecen con "Ver más historias". */
const ESCALONES = [3, 4, 5, 5, 6];
const ESCALONES_INICIALES = 3;
/** Los santos repartidos por escalón, en el orden del catálogo. */
const GRUPOS_ALTAR = ESCALONES.map((n, e) => {
  const inicio = ESCALONES.slice(0, e).reduce((a, b) => a + b, 0);
  return SANTOS.slice(inicio, inicio + n);
});


// Dos tiras escalonadas con el mismo paso (ancho): la del frente con aire
// entre banderas; la de atrás, más arriba y más chica, colgando justo en
// esos huecos. El desfase cambia el orden de colores entre tiras.
const TIRAS_ESCRITORIO: TiraPapelPicado[] = [
  { ancho: 120, colgado: 34, arriba: 0, desfase: 2, fondo: true, escalonada: true, ocupa: 0.6 },
  { ancho: 120, colgado: 50, arriba: 24, ocupa: 0.72 },
];
const TIRAS_MOVIL: TiraPapelPicado[] = [
  { ancho: 84, colgado: 14, arriba: 0, desfase: 2, fondo: true, escalonada: true, ocupa: 0.6 },
  { ancho: 84, colgado: 26, arriba: 16, ocupa: 0.74 },
];
const TIRA_CIERRE: TiraPapelPicado[] = [
  { ancho: 110, colgado: 26, desfase: 4, fondo: true, escalonada: true, ocupa: 0.6 },
  { ancho: 110, colgado: 40, arriba: 18, desfase: 1, ocupa: 0.72 },
];

function useEsMovil(consulta = '(max-width: 640px)') {
  const [coincide, setCoincide] = useState(() => window.matchMedia(consulta).matches);
  useEffect(() => {
    const mq = window.matchMedia(consulta);
    const cambiar = () => setCoincide(mq.matches);
    mq.addEventListener('change', cambiar);
    return () => mq.removeEventListener('change', cambiar);
  }, [consulta]);
  return coincide;
}

/* ─── Adornos (piezas ilustradas en public/todos-los-santos/) ─── */

const img = (nombre: string) => `/todos-los-santos/${nombre}.webp`;

/** Divisor ornamental bajo los títulos. */
function Divisor({ tipo, className = '' }: { tipo: 'oro' | 'vino' | 'cruz' | 'rayos'; className?: string }) {
  return <img className={`tls-ornamento ${className}`} src={img(`divisor-${tipo}`)} alt="" aria-hidden="true" decoding="async" />;
}

/** Candelería: tres cirios en candeleros de latón, de alturas distintas,
 *  a cada lado del título (con --der se reflejan). */
function Candeleria({ className, alto }: { className?: string; alto: number }) {
  return (
    <div className={`tls-candeleria ${className ?? ''}`} aria-hidden="true">
      <Cirio alto={alto * 0.78} semilla={3} />
      <Cirio alto={alto} semilla={7} />
      <Cirio alto={alto * 0.64} semilla={11} />
    </div>
  );
}

// Casitas del pueblo: [x, ancho, alto, ventanas encendidas (x relativa)]
const CASAS: [number, number, number, number[]][] = [
  [120, 70, 34, [14]], [200, 52, 44, [10, 32]], [262, 80, 30, [40]],
  [372, 60, 40, [12]], [446, 90, 36, [18, 60]], [548, 56, 46, [28]],
  [868, 64, 42, [14, 40]], [944, 86, 34, [60]], [1042, 54, 48, [12]],
  [1110, 92, 38, [20, 64]], [1214, 60, 32, []], [1286, 74, 44, [30]],
];

/** Horizonte nocturno del hero: lomas, el pueblo y su iglesia con las
 *  ventanas y la puerta encendidas, como en noche de fiesta. Se recorta
 *  desde el centro (slice) para que la iglesia siempre quede al medio. */
function Pueblo() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const luz = '#FFB547';
  return (
    <svg className="tls-pueblo" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-brillo`} cx="0.5" cy="1" r="0.6">
          <stop offset="0" stopColor="#F28C1B" stopOpacity="0.32" />
          <stop offset="0.5" stopColor="#B4466A" stopOpacity="0.12" />
          <stop offset="1" stopColor="#B4466A" stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-halo`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <rect x="220" y="40" width="1000" height="260" fill={`url(#${uid}-brillo)`} />
      <path d="M0 222C180 192 320 207 460 200C620 191 760 211 900 198C1060 185 1220 206 1440 192V300H0Z" fill="#231D52" />

      {/* El pueblo se escala desde el pie al centro: así se achica sin que
          las lomas dejen de cubrir todo el ancho. */}
      <g transform="translate(720 300) scale(0.62) translate(-720 -300)">
      <g fill="#0B0D24">
        {CASAS.map(([x, w, h]) => <rect key={x} x={x} y={262 - h} width={w} height={h + 40} />)}
        {/* Cipreses */}
        {[90, 340, 612, 828, 1190, 1370].map(x => <ellipse key={x} cx={x} cy={236} rx="9" ry="30" />)}

        {/* Iglesia: dos torres con cúpula y cruz, nave con frontón y cúpula */}
        <path d="M684 160A36 34 0 0 1 756 160Z" />
        <rect x="718" y="110" width="4" height="22" />
        <rect x="712" y="116" width="16" height="3.5" />
        <rect x="660" y="172" width="120" height="100" />
        <polygon points="650,175 720,140 790,175" />
        {[618, 782].map(x => (
          <g key={x}>
            <rect x={x} y="118" width="40" height="154" />
            <rect x={x - 4} y="114" width="48" height="6" />
            <path d={`M${x} 118Q${x + 20} 86 ${x + 40} 118Z`} />
            <rect x={x + 18} y="74" width="4" height="22" />
            <rect x={x + 13} y="80" width="14" height="3.5" />
          </g>
        ))}
      </g>

      {/* Luces: halo difuso y, encima, la ventana nítida */}
      {[true, false].map(halo => (
        <g key={String(halo)} fill={luz} filter={halo ? `url(#${uid}-halo)` : undefined} opacity={halo ? 0.9 : 0.95}>
          {CASAS.flatMap(([x, , h, ventanas]) => ventanas.map(v => <rect key={`${x}-${v}`} x={x + v} y={262 - h + 10} width="7" height="9" rx="1" />))}
          <path d="M708 272V246A12 12 0 0 1 732 246V272Z" />
          <circle cx="720" cy="196" r="7" />
          {[618, 782].map(x => <path key={x} d={`M${x + 13} 148V136A7 7 0 0 1 ${x + 27} 136V148Z`} />)}
        </g>
      ))}
      </g>

      <path d="M0 252C200 232 380 246 560 240C760 233 980 252 1180 240C1300 233 1380 244 1440 238V300H0Z" fill="#070919" />
    </svg>
  );
}

/** Rincón de ofrenda: veladoras de distintas alturas con flores de
 *  cempasúchil y pétalos sueltos al pie. Adorna los costados de las
 *  secciones en pantallas anchas (con --der se refleja). */
function Rincon({ lado, semilla = 0 }: { lado: 'izq' | 'der'; semilla?: number }) {
  return (
    <div className={`tls-rincon tls-rincon--${lado} reveal`} aria-hidden="true">
      <div className="tls-rincon__velas">
        <Veladora color="blanca" alto={50} semilla={semilla + 1} />
        <Veladora color="roja" alto={66} semilla={semilla + 2} />
        <Veladora color="ambar" alto={44} semilla={semilla + 3} />
      </div>
      <img className="tls-rincon__flor tls-rincon__flor--a" src={img('flor-cempasuchil')} alt="" loading="lazy" />
      <img className="tls-rincon__flor tls-rincon__flor--b" src={img('flor-cempasuchil')} alt="" loading="lazy" />
      <img className="tls-rincon__flor tls-rincon__flor--c" src={img('flor-roja')} alt="" loading="lazy" />
      <span className="tls-rincon__petalos" />
    </div>
  );
}

/** Separador entre secciones: dos tiras escalonadas de lado a lado. */
const TIRAS_SEPARADOR: TiraPapelPicado[] = [
  { ancho: 104, colgado: 22, desfase: 6, fondo: true, escalonada: true, ocupa: 0.6 },
  { ancho: 104, colgado: 34, arriba: 16, desfase: 3, ocupa: 0.72 },
];

/* ─── Laurel: la corona de gloria de los santos ─── */

/** Rama de laurel a lo largo de un arco de circunferencia (grados, 0° a la
 *  derecha y en sentido horario): en cada nudo, un par de hojas, una hacia
 *  afuera y otra hacia adentro, que se achican hacia la punta. */
function hojasLaurel(cx: number, cy: number, r: number, desde: number, hasta: number, n: number, tam: number) {
  const sentido = hasta > desde ? 1 : -1;
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const a = desde + (hasta - desde) * t;
    const rad = (a * Math.PI) / 180;
    const hoja = tam * (1 - t * 0.4);
    return [1, -1].map(lado => {
      const d = r + lado * hoja * 0.62;
      const x = cx + Math.cos(rad) * d;
      const y = cy + Math.sin(rad) * d;
      const giro = a + 90 * sentido - lado * 38 * sentido;
      return <ellipse key={`${i}${lado}`} cx={x} cy={y} rx={hoja} ry={hoja * 0.4} transform={`rotate(${giro} ${x} ${y})`} />;
    });
  });
}

function DefsOro({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stopColor="#FFE7A3" />
      <stop offset="0.45" stopColor="#E3AE45" />
      <stop offset="1" stopColor="#9A6A18" />
    </linearGradient>
  );
}

/** Corona de laurel con la cruz al centro y su moño: emblema del reverso
 *  de la estampa ("Una estampa te espera"). */
function CoronaLaurel({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <defs><DefsOro id={`${id}-oro`} /></defs>
      <g fill={`url(#${id}-oro)`}>
        <path d="M60 104C30 102 14 80 16 52" fill="none" stroke={`url(#${id}-oro)`} strokeWidth="1.6" />
        <path d="M60 104C90 102 106 80 104 52" fill="none" stroke={`url(#${id}-oro)`} strokeWidth="1.6" />
        {hojasLaurel(60, 60, 42, 104, 222, 12, 7.5)}
        {hojasLaurel(60, 60, 42, 76, -42, 12, 7.5)}
        {/* Moño */}
        <path d="M60 103l-11 7 2-9zM60 103l11 7-2-9z" />
        <circle cx="60" cy="103" r="2.6" />
        {/* Cruz con remates */}
        <path d="M56.5 33h7v13h13v7h-13v26h-7V53h-13v-7h13z" />
      </g>
    </svg>
  );
}

/** Divisor: línea, ramita de laurel, cruz, ramita, línea. */
function DivisorLaurel() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <svg className="tls-ornamento tls-ornamento--laurel" viewBox="0 0 260 40" aria-hidden="true">
      <defs><DefsOro id={`${id}-oro`} /></defs>
      <g fill={`url(#${id}-oro)`} stroke="none">
        <rect x="0" y="19.2" width="78" height="1.6" rx="0.8" />
        <rect x="182" y="19.2" width="78" height="1.6" rx="0.8" />
        <circle cx="82" cy="20" r="2" />
        <circle cx="178" cy="20" r="2" />
        {hojasLaurel(130, 70, 52, 252, 212, 6, 6)}
        {hojasLaurel(130, 70, 52, 288, 328, 6, 6)}
        <path d="M127.5 6h5v8h8v5h-8v15h-5V19h-8v-5h8z" />
      </g>
    </svg>
  );
}

/** Ícono de estampita (tarjeta con arco y cruz) para "Descubrir un santo". */
function IconoEstampa({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2.5" width="14" height="19" rx="2" />
      <path d="M8.5 18.5v-7a3.5 3.5 0 0 1 7 0v7z" />
      <path d="M12 9.5v5M10.2 11.3h3.6" />
    </svg>
  );
}

const ICONOGRAFIA = [
  'cruz', 'sagrado-corazon', 'paloma', 'lirio', 'estrella', 'mariano',
  'rama', 'caliz', 'biblia', 'rosario', 'manos', 'capilla',
];

/** Franja de iconografía cristiana sobre "Conoce a un santo". */
function Iconografia() {
  return (
    <ul className="tls-iconografia" aria-hidden="true">
      {ICONOGRAFIA.map((nombre, i) => (
        <li key={nombre} style={{ animationDelay: `${i * 0.6}s` }}>
          <img src={img(`icono-${nombre}`)} alt="" decoding="async" loading="lazy" />
        </li>
      ))}
    </ul>
  );
}

const MARCO_POR_TONO: Record<Santo['tono'], string> = {
  vino: 'vino', terracota: 'vino', mostaza: 'oro', azul: 'azul', olivo: 'verde',
};

/** La ilustración del santo dentro de un marco de estampa del color de su tono. */
function EstampaEnMarco({ santo }: { santo: Santo }) {
  return (
    <div className="tls-marco" style={{ backgroundImage: `url(${img(`marco-${MARCO_POR_TONO[santo.tono]}`)})` }}>
      <EstampaSanto santo={santo} />
    </div>
  );
}

// Pétalos de cempasúchil y de rosa que caen despacio sobre el hero, como
// esparcidos desde el papel picado. Cada pétalo combina tres movimientos
// independientes — caída, vaivén lateral y giro 3D sobre sí mismo — para
// que ninguno repita la trayectoria de otro. Los "cercanos" son más grandes,
// van desenfocados y pasan por delante del texto: profundidad de campo.
// Valores fijos (no Math.random) para que el render sea estable.
const PETALOS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 41 + 5) % 96,
  tipo: i % 3,
  size: 13 + ((i * 7) % 13),
  caida: 17 + ((i * 5) % 9),
  retraso: -((i * 3.7) % 22),
  amplitud: 16 + ((i * 11) % 30),
  vaiven: 3.2 + (i % 4) * 0.7,
  giro: 3.5 + ((i * 3) % 5),
  cerca: i % 5 === 2,
}));

/** Forma de cada tipo de pétalo en una caja de 40×40. */
const FORMAS_PETALO = [
  // Cempasúchil: abanico con el borde superior rizado
  'M20 38C12 34 5 26 4 15c2.5 1.4 4 .4 5-1.8 1.8 2.2 4 2.2 5.4 0 1.6 2.2 3.8 2.2 5.6 0 1.8 2.2 4 2.2 5.6 0 1.4 2.2 3.4 2.6 5.4 1.8-1 11-8 19-16 23z',
  // Rosa: gota de pétalo con la punta redondeada
  'M20 3c9 6 15 15 13 24-1.6 7-7.4 11-13 11S8.6 34 7 27C5 18 11 9 20 3z',
  // Cempasúchil pequeño, más cerrado
  'M20 37c-7-3-12-10-12-19 2 1 3.4.2 4.2-1.6 1.6 1.8 3.6 1.8 4.8 0 1.4 1.8 3.4 1.8 4.8 0 1.2 1.8 2.8 2.4 4.2 1.6 0 9-5 16-12 19z',
];

function Petalos() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const gradientes = [
    { id: `${uid}-cempa`, de: '#FFC23D', a: '#E2610C' },
    { id: `${uid}-rosa`, de: '#EC6A93', a: '#A3124A' },
    { id: `${uid}-oro`, de: '#FFD55A', a: '#F08A12' },
  ];

  return (
    <div className="tls-petalos" aria-hidden="true">
      <svg className="tls-petalos__defs" width="0" height="0" focusable="false">
        <defs>
          {gradientes.map(g => (
            <linearGradient key={g.id} id={g.id} x1="0.2" y1="0" x2="0.6" y2="1">
              <stop offset="0" stopColor={g.de} />
              <stop offset="1" stopColor={g.a} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {PETALOS.map((p, i) => (
        <span
          key={i}
          className={`tls-petalo${p.cerca ? ' tls-petalo--cerca' : ''}`}
          style={{
            left: `${p.left}%`,
            width: p.cerca ? p.size * 1.7 : p.size,
            animationDuration: `${p.cerca ? p.caida * 0.7 : p.caida}s`,
            animationDelay: `${p.retraso}s`,
          }}
        >
          <span
            className="tls-petalo__vaiven"
            style={{ ['--amplitud' as string]: `${p.amplitud}px`, animationDuration: `${p.vaiven}s` }}
          >
            <svg viewBox="0 0 40 40" style={{ animationDuration: `${p.giro}s` }}>
              <path d={FORMAS_PETALO[p.tipo]} fill={`url(#${gradientes[p.tipo].id})`} />
              {/* Nervaduras: líneas finas desde la base hacia el borde */}
              <path
                d={p.tipo === 1 ? 'M20 36C19 26 19 16 20 7' : 'M20 36L11 17M20 36L20 15M20 36L29 17'}
                fill="none"
                stroke="#fff"
                strokeOpacity="0.32"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
}

/* ─── Conoce a un santo ─── */

/** Baraja sin repetir: entrega todos los santos en orden aleatorio antes de
 *  volver a mezclar, y nunca repite el último al empezar una ronda nueva. */
function useBaraja(lista: Santo[]) {
  const mazo = useRef<Santo[]>([]);
  return useCallback((ultimo: Santo | null) => {
    if (mazo.current.length === 0) {
      const nuevo = [...lista];
      for (let i = nuevo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]];
      }
      if (ultimo && nuevo[nuevo.length - 1].id === ultimo.id) nuevo.unshift(nuevo.pop()!);
      mazo.current = nuevo;
    }
    return mazo.current.pop()!;
  }, [lista]);
}

function ConoceUnSanto({ onHistoria }: { onHistoria: (s: Santo) => void }) {
  const [santo, setSanto] = useState<Santo | null>(null);
  const [tirada, setTirada] = useState(0);
  const sacar = useBaraja(SANTOS);
  const tarjetaRef = useRef<HTMLDivElement>(null);

  const descubrir = () => {
    setSanto(sacar(santo));
    setTirada(t => t + 1);
  };

  // En pantallas bajas la tarjeta puede quedar fuera de vista al aparecer.
  useEffect(() => {
    if (tirada > 0) tarjetaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [tirada]);

  return (
    <section id="conoce" className="tls-conoce">
      <Rincon lado="izq" semilla={50} />
      <Rincon lado="der" semilla={60} />
      <div className="tls-contenedor">
        <Iconografia />
        <div className="tls-encabezado reveal">
          <DivisorLaurel />
          <h2 className="tls-titulo">Conoce a un santo</h2>
          <p className="tls-lead">Hay miles de historias de fe esperando ser descubiertas.</p>
          <button type="button" className="tls-btn tls-btn--grande" onClick={descubrir}>
            {santo ? <Shuffle size={19} /> : <IconoEstampa size={20} />}
            {santo ? 'Descubrir otro santo' : 'Descubrir un santo'}
            <ArrowRight size={18} className="tls-btn__flecha" />
          </button>
        </div>

        <div ref={tarjetaRef} className="tls-conoce__escenario" aria-live="polite">
          {santo ? (
            <article key={tirada} className="tls-estampita">
              <div className="tls-estampita__imagen">
                <EstampaEnMarco santo={santo} />
              </div>
              <div className="tls-estampita__cuerpo">
                <p className="tls-estampita__fiesta">
                  <CalendarDays size={15} /> Se celebra el {santo.fiesta}
                </p>
                <h3 className="tls-estampita__nombre">{santo.nombre}</h3>
                <p className="tls-estampita__patrono">{santo.patronazgo}</p>
                <blockquote className="tls-estampita__frase">«{santo.frase}»</blockquote>
                <p className="tls-estampita__descripcion">{santo.descripcion}</p>
                <button type="button" className="tls-btn tls-btn--contorno" onClick={() => onHistoria(santo)}>
                  <BookOpen size={17} /> Conocer su historia <ChevronRight size={17} className="tls-btn__flecha" />
                </button>
              </div>
            </article>
          ) : (
            <button type="button" className="tls-reverso reveal" onClick={descubrir} aria-label="Descubrir un santo">
              <span className="tls-reverso__marco" style={{ backgroundImage: `url(${img('marco-oro')})` }}>
                <CoronaLaurel className="tls-reverso__emblema" />
                <span className="tls-reverso__texto">Una estampa te espera</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Galería ─── */

function CartaSanto({ santo, indice, onHistoria }: { santo: Santo; indice: number; onHistoria: (s: Santo) => void }) {
  return (
    <article className="tls-carta reveal" style={{ transitionDelay: `${(indice % 4) * 70}ms` }}>
      <div className="tls-carta__imagen">
        <EstampaEnMarco santo={santo} />
      </div>
      <div className="tls-carta__cuerpo">
        <p className="tls-carta__fiesta">{santo.fiesta}</p>
        <h3 className="tls-carta__nombre">{santo.nombre}</h3>
        <p className="tls-carta__descripcion">{santo.descripcion}</p>
        <button type="button" className="tls-carta__boton" onClick={() => onHistoria(santo)}>
          <BookOpen size={15} aria-hidden="true" /> Conocer su historia <ChevronRight size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

/* ─── Altar de los santos ─── */

const COLORES_VELA: ColorVeladora[] = ['blanca', 'roja', 'ambar', 'rosa', 'verde', 'blanca'];
const TIRAS_ALTAR: TiraPapelPicado[] = [
  { ancho: 112, colgado: 32, desfase: 5, fondo: true, escalonada: true, ocupa: 0.6 },
  { ancho: 112, colgado: 48, arriba: 22, desfase: 3, ocupa: 0.74 },
];

/** Jarro de barro bruñido (estilo Tonalá) con un manojo de flores. */
function JarroFlores({ lado }: { lado: 'izq' | 'der' }) {
  return (
    <span className={`tls-jarro tls-jarro--${lado}`} aria-hidden="true">
      <img className="tls-jarro__flor tls-jarro__flor--a" src={img('flor-azucena')} alt="" loading="lazy" />
      <img className="tls-jarro__flor tls-jarro__flor--b" src={img('flor-cempasuchil')} alt="" loading="lazy" />
      <img className="tls-jarro__flor tls-jarro__flor--c" src={img('flor-dalia-roja')} alt="" loading="lazy" />
      <img className="tls-jarro__flor tls-jarro__flor--d" src={img('flor-cempasuchil')} alt="" loading="lazy" />
      <svg className="tls-jarro__barro" viewBox="0 0 60 70">
        <defs>
          <linearGradient id={`jarro-${lado}`} x1="0" x2="1">
            <stop offset="0" stopColor="#7A3418" />
            <stop offset="0.4" stopColor="#C2683A" />
            <stop offset="1" stopColor="#6A2C12" />
          </linearGradient>
        </defs>
        <path d="M15 4h30l-3 9c11 6 15 19 13 31-2 14-12 24-25 24S7 58 5 44C3 32 7 19 18 13z" fill={`url(#jarro-${lado})`} />
        <path d="M15 4h30" stroke="#5A2410" strokeWidth="3" strokeLinecap="round" />
        {/* Decoración pintada a mano: cenefa de ondas y puntos */}
        <path d="M9 34q5-5 10 0t10 0 10 0 10 0 10 0" fill="none" stroke="#F3E3C3" strokeWidth="1.6" opacity="0.85" />
        <path d="M8 46q5 4 11 0t11 0 11 0 11 0" fill="none" stroke="#F3E3C3" strokeWidth="1.2" opacity="0.7" />
        {[14, 22, 30, 38, 46].map(x => <circle key={x} cx={x} cy="40" r="1.4" fill="#F3E3C3" opacity="0.8" />)}
        <path d="M24 56c2-4 10-4 12 0-2 3-10 3-12 0z" fill="#F3E3C3" opacity="0.6" />
      </svg>
    </span>
  );
}

/** Altar escalonado: arco de cempasúchil, papel picado y la cruz arriba;
 *  en cada escalón, cubierto con su mantel bordado, una fila de santos
 *  entre veladoras; al pie, jarros con flores y más veladoras. */
function Altar({ verTodos, esMovil, onHistoria }: { verTodos: boolean; esMovil: boolean; onHistoria: (s: Santo) => void }) {
  const escalones = verTodos ? GRUPOS_ALTAR : GRUPOS_ALTAR.slice(0, ESCALONES_INICIALES);

  return (
    <div className="tls-altar">
      <ArcoCempasuchil className="tls-altar__arco" flor={esMovil ? 20 : 30} />
      {/* Corona en la bóveda del arco; el papel picado, amarrado de pata a pata */}
      <CoronaLaurel className="tls-altar__corona" />
      <div className="tls-altar__cabecera" aria-hidden="true">
        <PapelPicado tiras={TIRAS_ALTAR} />
      </div>

      {escalones.map((grupo, e) => {
        // Arriba, cirios de altar; en los demás escalones, veladoras.
        const vela = (lado: number) => e === 0
          ? <Cirio className="tls-escalon__vela" alto={esMovil ? 140 : 230} semilla={lado + 30} />
          : <Veladora className="tls-escalon__vela" color={COLORES_VELA[e + lado]} alto={60 + e * 5} semilla={e * 2 + lado} />;
        return (
          <div key={e} className="tls-escalon">
            {vela(0)}
            <div className="tls-escalon__santos">
              {grupo.map((santo, i) => (
                <CartaSanto key={santo.id} santo={santo} indice={i} onHistoria={onHistoria} />
              ))}
            </div>
            {vela(1)}
            <span className="tls-escalon__mantel" aria-hidden="true" />
          </div>
        );
      })}

      <div className="tls-altar__pie" aria-hidden="true">
        <JarroFlores lado="izq" />
        <div className="tls-altar__velas">
          {(['roja', 'blanca', 'ambar', 'blanca', 'roja'] as ColorVeladora[]).map((c, i) => (
            <Veladora key={i} color={c} alto={i % 2 ? 76 : 56} semilla={i + 11} />
          ))}
        </div>
        <JarroFlores lado="der" />
      </div>
    </div>
  );
}

/* ─── Historia completa ─── */

function HistoriaSanto({ santo, onCerrar }: { santo: Santo | null; onCerrar: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;
    if (santo && !dialogo.open) {
      dialogo.showModal();
      document.documentElement.classList.add('tls-sin-scroll');
    }
    if (!santo && dialogo.open) dialogo.close();
  }, [santo]);

  useEffect(() => () => document.documentElement.classList.remove('tls-sin-scroll'), []);

  return (
    <dialog
      ref={ref}
      className="tls-historia"
      aria-labelledby="tls-historia-titulo"
      onClose={() => {
        document.documentElement.classList.remove('tls-sin-scroll');
        onCerrar();
      }}
      // Clic en el fondo oscuro (fuera del panel) cierra el diálogo.
      onClick={e => { if (e.target === e.currentTarget) ref.current?.close(); }}
    >
      {santo && (
        <div className="tls-historia__panel">
          <button type="button" className="tls-historia__cerrar" onClick={() => ref.current?.close()} aria-label="Cerrar">
            <X size={20} />
          </button>
          <div className="tls-historia__imagen">
            <EstampaEnMarco santo={santo} />
            {santo.credito && <p className="tls-historia__credito">{santo.credito}</p>}
          </div>
          <div className="tls-historia__texto">
            <p className="tls-estampita__fiesta"><CalendarDays size={15} /> {santo.fiesta}</p>
            <h2 id="tls-historia-titulo" className="tls-historia__nombre">{santo.nombre}</h2>
            <p className="tls-estampita__patrono">{santo.patronazgo}</p>
            <blockquote className="tls-historia__frase">
              <Quote size={18} aria-hidden="true" />
              {santo.frase}
            </blockquote>
            {/* Solo el primer párrafo: más fácil de leer de un vistazo. */}
            <p className="tls-historia__parrafo">{santo.historia[0]}</p>
            <div className="tls-estampita__dato">
              <Lightbulb size={17} aria-hidden="true" />
              <p><strong>Dato interesante.</strong> {santo.dato}</p>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

/* ─── Página ─── */

export default function TodosLosSantosPage() {
  useRevealOnScroll();
  const esMovil = useEsMovil();
  const [verTodos, setVerTodos] = useState(false);
  const [historia, setHistoria] = useState<Santo | null>(null);

  const enAltar = ESCALONES.slice(0, ESCALONES_INICIALES).reduce((a, b) => a + b, 0);

  return (
    <>
      <Seo
        titulo="Día de Todos los Santos"
        descripcion="2 de noviembre, Solemnidad de Todos los Santos en la Parroquia San Juan Bautista: descubre la historia de hombres y mujeres que hicieron de su vida un camino hacia Dios."
      />
      <IntroSantos />
      <Navbar />
      <main className="tls" data-modo="noche">
        {/* ─── Hero ─── */}
        <header className="tls-hero">
          {/* Cielo nocturno con luna y, en el horizonte, el pueblo */}
          <div className="tls-cielo" aria-hidden="true">
            <span className="tls-cielo__luna" />
          </div>
          <Pueblo />
          <PapelPicado tiras={esMovil ? TIRAS_MOVIL : TIRAS_ESCRITORIO} className="tls-hero__papel" />
          <Petalos />

          <div className="tls-contenedor tls-hero__barra">
            <Link className="tls-volver" to="/eventos">
              <ArrowLeft size={15} /> Eventos
            </Link>
          </div>

          <div className="tls-hero__composicion">
            <ArcoCempasuchil className="tls-hero__arco" flor={esMovil ? 20 : 30} />
            <Candeleria className="tls-hero__cirios tls-hero__cirios--izq" alto={esMovil ? 150 : 250} />
            <Candeleria className="tls-hero__cirios tls-hero__cirios--der" alto={esMovil ? 150 : 250} />

            <div className="tls-hero__contenido">
              <p className="tls-hero__fecha">
                <span aria-hidden="true" className="tls-hero__fecha-linea" />
                2 de noviembre
                <span aria-hidden="true" className="tls-hero__fecha-linea" />
              </p>
              <h1 className="tls-hero__titulo">
                <span className="tls-hero__titulo-pre">Día de</span>
                <span className="tls-hero__titulo-main">Todos los Santos</span>
              </h1>
              <Divisor tipo="oro" className="tls-hero__ornamento" />
              <p className="tls-hero__texto">
                Conoce las historias de hombres y mujeres que hicieron de su vida un camino hacia Dios.
              </p>
              <div className="tls-hero__acciones">
                <a className="tls-btn" href="#conoce">
                  <IconoEstampa /> Descubrir un santo <ArrowRight size={17} className="tls-btn__flecha" />
                </a>
                <a className="tls-btn tls-btn--suave" href="#historias">Historias de santidad</a>
              </div>
            </div>

            {/* Camino de veladoras al pie del arco */}
            <div className="tls-hero__velas" aria-hidden="true">
              {[34, 46, 38, 54, 40, 48, 36].map((alto, i) => (
                <Veladora key={i} color={(['blanca', 'roja', 'ambar', 'blanca', 'rosa', 'ambar', 'blanca'] as ColorVeladora[])[i]} alto={esMovil ? alto * 0.7 : alto} semilla={i} />
              ))}
            </div>
          </div>
        </header>

        <PapelPicado tiras={TIRAS_SEPARADOR} className="tls-separador" />

        <ConoceUnSanto onHistoria={setHistoria} />

        <PapelPicado tiras={TIRAS_SEPARADOR} className="tls-separador" />

        {/* ─── Galería ─── */}
        <section id="historias" className="tls-historias">
          <div className="tls-contenedor">
            <div className="tls-encabezado reveal">
              <Divisor tipo="vino" />
              <h2 className="tls-titulo">Historias de santidad</h2>
              <p className="tls-lead">
                Campesinos y papas, madres de familia, frailes, estudiantes y jóvenes como tú.
                Cada uno encontró su propio camino hacia Dios.
              </p>
            </div>
          </div>

          <div className="tls-contenedor tls-contenedor--altar">
            <Altar verTodos={verTodos} esMovil={esMovil} onHistoria={setHistoria} />

            {!verTodos && SANTOS.length > enAltar && (
              <div className="tls-galeria__mas">
                <button type="button" className="tls-btn tls-btn--contorno" onClick={() => setVerTodos(true)}>
                  Ver más historias ({SANTOS.length - enAltar})
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ─── Cierre ─── */}
        <section className="tls-cierre">
          <div className="tls-cierre__papel">
            <PapelPicado tiras={TIRA_CIERRE} />
          </div>
          <div className="tls-contenedor tls-cierre__contenido reveal">
            <h2 className="tls-cierre__titulo">Todos estamos llamados a la santidad.</h2>
            <Divisor tipo="cruz" />
            <p className="tls-cierre__texto">
              Los santos no fueron personas perfectas ni lejanas. Fueron personas reales, con
              su carácter, sus dudas y sus caídas, que vivieron en tiempos y lugares muy
              distintos: en el campo y en la ciudad, en un convento o en una familia, en la
              escuela, en el trabajo, frente a una computadora.
            </p>
            <p className="tls-cierre__texto">
              Cada uno, desde su propia historia, encontró una manera de amar a Dios y a los
              demás. Su vida nos recuerda que la santidad no es para unos cuantos: se construye
              en lo cotidiano, con gestos pequeños hechos con mucho amor.
            </p>
            <blockquote className="tls-cierre__cita">
              «Todos los fieles, de cualquier estado o condición, son llamados a la plenitud de la vida
              cristiana y a la perfección de la caridad.»
              <cite>Lumen gentium, 40</cite>
            </blockquote>

            {/* La invitación a la misa, sobre un tapete de aserrín con su
                camino de veladoras al pie, como en las procesiones. */}
            <div className="tls-cierre__ofrenda">
              <Rincon lado="izq" semilla={70} />
              <TapeteAserrin className="tls-cierre__tapete">
                <p className="tls-cierre__misa-etiqueta">Te esperamos a celebrar</p>
                <p className="tls-cierre__misa-fecha">{DETALLES.fecha}</p>
                <ul className="tls-cierre__misa-lista">
                  {CELEBRACIONES.map(c => (
                    <li key={c.lugar} className="tls-cierre__misa-item">
                      <span className="tls-cierre__misa-lugar">{c.lugar}</span>
                      <span className="tls-cierre__misa-horario">{c.horario}</span>
                    </li>
                  ))}
                </ul>
                <Link className="tls-btn" to="/eventos">Ver más eventos de la parroquia</Link>
              </TapeteAserrin>
              <Rincon lado="der" semilla={80} />
            </div>
            <div className="tls-cierre__velas" aria-hidden="true">
              {(['blanca', 'roja', 'ambar', 'blanca', 'rosa', 'ambar', 'blanca', 'roja', 'blanca'] as ColorVeladora[]).map((c, i) => (
                <Veladora key={i} color={c} alto={esMovil ? 34 : i % 2 ? 46 : 38} semilla={i + 40} />
              ))}
            </div>
          </div>
        </section>

        <HistoriaSanto santo={historia} onCerrar={() => setHistoria(null)} />
      </main>
      <Footer />
    </>
  );
}
