import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowUpRight, Check, ChevronDown, Clock3, Hash, MessageCircle, Pointer, Share2, Snowflake, Ticket, Users,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import IntroCine from '../components/IntroCine';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import {
  APP, DETALLES, FIN, INICIO, MESSENGER_URL, PASOS_BOLETO, RECOMENDACIONES, REDES, TRAILER,
  debeMostrarIntro, type RedId,
} from '../data/theChosen';
import './TheChosenPage.css';

/* ─── Íconos de marca (lucide-react ya no incluye logos de redes) ─── */
function RedIcono({ id, size = 22 }: { id: RedId; size?: number }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true } as const;
  switch (id) {
    case 'youtube':
      return (
        <svg {...p} fill="currentColor">
          <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...p} fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...p} fill="currentColor">
          <path d="M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.2a6.3 6.3 0 1 0 5.3 6.2V8.6a7.9 7.9 0 0 0 4.6 1.5V6.8a4.6 4.6 0 0 1-4.6-4.8z" />
        </svg>
      );
    case 'x':
      return (
        <svg {...p} fill="currentColor">
          <path d="M17.8 2.5h3.1l-6.8 7.8 8 10.6h-6.3l-4.9-6.4-5.6 6.4H2.2l7.3-8.3L1.8 2.5h6.4l4.4 5.9zm-1.1 16.5h1.7L7.4 4.3H5.6z" />
        </svg>
      );
    default:
      return (
        <svg {...p} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M2.5 12h19M12 2.5c2.6 2.6 3.9 5.8 3.9 9.5s-1.3 6.9-3.9 9.5c-2.6-2.6-3.9-5.8-3.9-9.5S9.4 5.1 12 2.5z" />
        </svg>
      );
  }
}

// Brasas/polvo dorado que flotan sobre el hero. Posiciones fijas (no
// Math.random) para que el render sea estable entre montajes.
const BRASAS = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: (i * 1.7) % 9,
  dur: 9 + ((i * 5) % 7),
  size: 2 + (i % 3),
}));

type Restante = { dias: number; horas: number; min: number; seg: number } | 'en-curso' | 'terminado';

function calcularRestante(): Restante {
  const ahora = Date.now();
  if (ahora >= FIN.getTime()) return 'terminado';
  const ms = INICIO.getTime() - ahora;
  if (ms <= 0) return 'en-curso';
  const s = Math.floor(ms / 1000);
  return { dias: Math.floor(s / 86400), horas: Math.floor(s / 3600) % 24, min: Math.floor(s / 60) % 60, seg: s % 60 };
}

function useCuentaRegresiva() {
  const [restante, setRestante] = useState(calcularRestante);
  useEffect(() => {
    const id = setInterval(() => setRestante(calcularRestante()), 1000);
    return () => clearInterval(id);
  }, []);
  return restante;
}

function CuentaRegresiva() {
  const r = useCuentaRegresiva();

  if (r === 'en-curso') {
    return <p className="chosen__countdown-msg">La proyección está comenzando en el atrio parroquial.</p>;
  }
  if (r === 'terminado') {
    return <p className="chosen__countdown-msg">Gracias por acompañarnos en esta noche especial.</p>;
  }

  // Cada número va dentro de un anillo que se vacía según su unidad.
  const bloques = [
    { valor: r.dias, max: 30, etiqueta: r.dias === 1 ? 'Día' : 'Días' },
    { valor: r.horas, max: 24, etiqueta: 'Horas' },
    { valor: r.min, max: 60, etiqueta: 'Min' },
    { valor: r.seg, max: 60, etiqueta: 'Seg' },
  ];

  return (
    <div className="chosen__countdown" role="timer" aria-label={`Faltan ${r.dias} días y ${r.horas} horas`}>
      {bloques.map(b => (
        <div key={b.etiqueta} className="chosen__countdown-item">
          <svg className="chosen__countdown-anillo" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="45" className="chosen__countdown-pista" />
            <circle
              cx="50" cy="50" r="45"
              className="chosen__countdown-progreso"
              pathLength={100}
              style={{ strokeDashoffset: 100 - Math.min(1, b.valor / b.max) * 100 }}
            />
          </svg>
          {/* key = valor: cada cambio remonta el número y repite el "volteo" */}
          <span key={b.valor} className="chosen__countdown-num" aria-hidden="true">
            {String(b.valor).padStart(2, '0')}
          </span>
          <span className="chosen__countdown-label" aria-hidden="true">{b.etiqueta}</span>
        </div>
      ))}
    </div>
  );
}

/** Publica en `--scroll` del elemento su avance por la pantalla
 *  (0 = entrando por abajo, 1 = saliendo por arriba). Sirve para animar con
 *  el scroll, que en celular sustituye al movimiento del mouse. */
function useProgresoScroll(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const actualizar = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const p = 1 - (r.top + r.height / 2) / window.innerHeight;
      el.style.setProperty('--scroll', String(Math.min(1, Math.max(0, p))));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(actualizar); };
    actualizar();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}

// Línea troquelada del arte del boleto (x = 1394 de 1919 px): separa el
// cuerpo del talón para la animación de "rasgado".
const PERFORACION = '72.64%';

const BOLETO_SRCSET =
  '/optimized/the-chosen-boleto-480.webp 480w, /optimized/the-chosen-boleto-960.webp 960w, /optimized/the-chosen-boleto-1600.webp 1600w, /optimized/the-chosen-boleto-1919.webp 1919w';

// Fibras de papel que se desprenden de la línea troquelada al rasgarse.
const FIBRAS = Array.from({ length: 9 }, (_, i) => ({
  top: 8 + i * 10.5,
  dx: 10 + ((i * 13) % 26),
  rot: ((i * 47) % 160) - 80,
  delay: (i % 4) * 0.06,
}));

/** Destellos de cuatro puntas sobre el arte (sin tocar el contorno). El
 *  viewBox coincide con los píxeles del PNG (1919×820). */
function Destellos() {
  const puntos = [
    { x: 300, y: 300, s: 1, d: 0 },
    { x: 690, y: 340, s: 0.8, d: 1.3 },
    { x: 880, y: 175, s: 1.1, d: 0.6 },
    { x: 1700, y: 90, s: 0.9, d: 2 },
    { x: 1080, y: 560, s: 0.6, d: 3.3 },
  ];
  return (
    <svg className="chosen__ticket-svg" viewBox="0 0 1919 820" aria-hidden="true">
      <defs>
        <filter id="ch-brillo" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {puntos.map((d, i) => (
        <g key={i} transform={`translate(${d.x} ${d.y}) scale(${d.s})`}>
          <path
            className="chosen__ticket-destello"
            style={{ animationDelay: `${d.d}s` }}
            d="M0 -26 C3 -6 6 -3 26 0 C6 3 3 6 0 26 C-3 6 -6 3 -26 0 C-6 -3 -3 -6 0 -26Z"
            fill="#fff3d4"
            filter="url(#ch-brillo)"
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * Boleto animado:
 * - Entrada: llega girando en 3D (como carta repartida) y luego el talón se
 *   rasga por la línea troquelada, suelta fibras de papel y regresa.
 * - Brillo holográfico ligado al scroll (funciona igual en celular, donde
 *   no hay cursor) y, con mouse, inclinación 3D que lo sigue.
 * - Tocar / hacer clic lo voltea: el reverso invita a pedirlo por Facebook.
 */
function BoletoInteractivo() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [volteado, setVolteado] = useState(false);

  useProgresoScroll(ref);

  // Solo con mouse: en táctil un toque también dispara mousemove y dejaría
  // el boleto inclinado.
  const mover = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  return (
    <div className="chosen__ticket-escena">
      <div
        ref={ref}
        className="chosen__ticket"
        onPointerMove={mover}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ '--tilt-x': `${tilt.x}deg`, '--tilt-y': `${tilt.y}deg`, '--perforacion': PERFORACION } as React.CSSProperties}
      >
        <button
          type="button"
          className={`chosen__ticket-volteo${volteado ? ' chosen__ticket-volteo--atras' : ''}`}
          onClick={() => setVolteado(v => !v)}
          aria-pressed={volteado}
          aria-label={volteado ? 'Ver el frente del boleto' : 'Voltear el boleto'}
        >
          {/* Frente: cuerpo + talón como dos capas recortadas de la misma imagen */}
          <span className="chosen__ticket-cara chosen__ticket-cara--frente">
            <span className="chosen__ticket-cuerpo">
              <img
                src="/optimized/the-chosen-boleto-1600.webp"
                srcSet={BOLETO_SRCSET}
                sizes="(max-width: 1100px) 100vw, 1000px"
                alt="Boleto de The Chosen Temporada 6, acceso anticipado: 11 de octubre, 7:30 p.m., atrio de la Parroquia San Juan Bautista, Maravatío"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="chosen__ticket-talon" aria-hidden="true">
              <img src="/optimized/the-chosen-boleto-1600.webp" srcSet={BOLETO_SRCSET} sizes="(max-width: 1100px) 100vw, 1000px" alt="" loading="lazy" decoding="async" />
            </span>
            <span className="chosen__ticket-fibras" aria-hidden="true">
              {FIBRAS.map((f, i) => (
                <span
                  key={i}
                  style={{
                    top: `${f.top}%`,
                    '--dx': `${f.dx}px`,
                    '--rot': `${f.rot}deg`,
                    animationDelay: `${1.35 + f.delay}s`,
                  } as React.CSSProperties}
                />
              ))}
            </span>
            <span className="chosen__ticket-holo" aria-hidden="true" />
            <Destellos />
          </span>

          {/* Reverso: la misma silueta en oscuro, con la invitación */}
          <span className="chosen__ticket-cara chosen__ticket-cara--atras" aria-hidden={!volteado}>
            <img src="/optimized/the-chosen-boleto-960.webp" alt="" loading="lazy" decoding="async" />
            <span className="chosen__ticket-reverso">
              <span className="chosen__ticket-reverso-eyebrow">Admite uno · Acceso anticipado</span>
              <span className="chosen__ticket-reverso-titulo">Tu lugar te espera</span>
              <span className="chosen__ticket-reverso-texto">Pide tu boleto numerado por mensaje en Facebook</span>
            </span>
          </span>
        </button>
      </div>

      <p className="chosen__ticket-pista" aria-hidden="true">
        <Pointer size={15} /> {volteado ? 'Toca para ver el frente' : 'Toca el boleto para voltearlo'}
      </p>
      {volteado && (
        <a className="chosen__btn chosen__btn--facebook chosen__ticket-cta" href={MESSENGER_URL} target="_blank" rel="noopener noreferrer">
          <RedIcono id="facebook" size={18} /> Pedir mi boleto
        </a>
      )}
    </div>
  );
}

/** Tráiler con "fachada": se muestra la miniatura y el reproductor de
 *  YouTube (pesado, con rastreo) solo se carga cuando la persona da clic.
 *  Se usa el dominio youtube-nocookie para no dejar cookies antes de tiempo. */
function Trailer() {
  const [activo, setActivo] = useState(false);
  const [miniatura, setMiniatura] = useState(`https://i.ytimg.com/vi/${TRAILER.youtubeId}/maxresdefault.jpg`);

  return (
    <div className="chosen__trailer">
      <span className="chosen__trailer-esquina chosen__trailer-esquina--tl" aria-hidden="true" />
      <span className="chosen__trailer-esquina chosen__trailer-esquina--tr" aria-hidden="true" />
      <span className="chosen__trailer-esquina chosen__trailer-esquina--bl" aria-hidden="true" />
      <span className="chosen__trailer-esquina chosen__trailer-esquina--br" aria-hidden="true" />
      {activo ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${TRAILER.youtubeId}?autoplay=1&rel=0&hl=es&cc_lang_pref=es`}
          title={TRAILER.titulo}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="chosen__trailer-fachada" onClick={() => setActivo(true)}>
          <img
            src={miniatura}
            alt=""
            loading="lazy"
            onError={() => setMiniatura(`https://i.ytimg.com/vi/${TRAILER.youtubeId}/hqdefault.jpg`)}
          />
          <span className="chosen__trailer-velo" aria-hidden="true" />
          <span className="chosen__play" aria-hidden="true">
            <span className="chosen__play-onda" />
            <span className="chosen__play-onda" style={{ animationDelay: '1.1s' }} />
            <svg viewBox="0 0 120 120">
              <circle className="chosen__play-anillo" cx="60" cy="60" r="56" pathLength={100} />
              <circle cx="60" cy="60" r="46" fill="rgba(14,13,12,0.65)" stroke="rgba(240,217,160,0.5)" />
              <path d="M51 41 L81 60 L51 79 Z" fill="#f0d9a0" />
            </svg>
          </span>
          <span className="chosen__trailer-label">
            Ver tráiler <small>· {TRAILER.fuente}</small>
          </span>
        </button>
      )}
    </div>
  );
}

function BotonCompartir() {
  const [copiado, setCopiado] = useState(false);
  const compartir = async () => {
    const datos = {
      title: 'The Chosen T6 en la Parroquia San Juan Bautista',
      text: 'Acceso anticipado al Episodio 1 de la Temporada 6 de The Chosen. 11 de octubre, 7:30 p.m., atrio parroquial.',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(datos);
      } else {
        await navigator.clipboard.writeText(datos.url);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2200);
      }
    } catch {
      /* el usuario canceló el diálogo de compartir */
    }
  };
  return (
    <button type="button" className="chosen__btn chosen__btn--ghost" onClick={compartir}>
      {copiado ? <Check size={16} /> : <Share2 size={16} />}
      {copiado ? 'Enlace copiado' : 'Compartir'}
    </button>
  );
}

/** Título que aparece palabra por palabra (cuando su contenedor .reveal
 *  entra en pantalla). Las palabras en `resaltar` van en dorado. */
function TituloAnimado({
  texto, resaltar = [], como: Tag = 'h2', className,
}: { texto: string; resaltar?: string[]; como?: 'h1' | 'h2'; className: string }) {
  return (
    <Tag className={className} aria-label={texto}>
      {texto.split(' ').map((palabra, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`chosen__palabra${resaltar.includes(palabra) ? ' chosen__palabra--oro' : ''}`}
          style={{ '--i': i } as React.CSSProperties}
        >
          {palabra}{' '}
        </span>
      ))}
    </Tag>
  );
}

/** Barra dorada de progreso de lectura, arriba de la pantalla. */
function BarraProgreso() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const actualizar = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      ref.current?.style.setProperty('transform', `scaleX(${p})`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(actualizar); };
    actualizar();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={ref} className="chosen__progreso" aria-hidden="true" />;
}

// Polvo dorado que flota por toda la página (capa fija, no bloquea clics).
const POLVO = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 41 + 7) % 100,
  delay: (i * 2.3) % 14,
  dur: 14 + ((i * 7) % 10),
  size: 2 + (i % 3),
}));

const ICONOS_PASO = { mensaje: MessageCircle, numero: Hash, boleto: Ticket } as const;
const ICONOS_TIP = { reloj: Clock3, frio: Snowflake, boleto: Ticket, familia: Users } as const;

/** Póster que se inclina en 3D según su paso por la pantalla. */
function PosterAnimado() {
  const ref = useRef<HTMLElement>(null);
  useProgresoScroll(ref);
  return (
    <figure ref={ref} className="chosen__poster reveal">
      <span className="chosen__poster-rayos" aria-hidden="true" />
      <img
        src="/optimized/the-chosen-poster-960.webp"
        srcSet="/optimized/the-chosen-poster-480.webp 480w, /optimized/the-chosen-poster-960.webp 960w, /optimized/the-chosen-poster-1294.webp 1294w"
        sizes="(max-width: 860px) 80vw, 420px"
        alt="Póster de The Chosen Temporada 6"
        loading="lazy"
        decoding="async"
      />
      <span className="chosen__poster-brillo" aria-hidden="true" />
    </figure>
  );
}

const CITA = 'El que quiera venir detrás de mí, que se niegue a sí mismo, tome su cruz y me siga.';

// Página /eventos/the-chosen: evento especial de acceso anticipado al
// Episodio 1 de la Temporada 6. Estética de estreno de cine (negro y oro,
// franjas de pantalla, brasas flotando) acorde a los artes oficiales.
// Orden: portada → cuenta regresiva → tráiler → boleto → póster →
// recomendaciones → conoce The Chosen → cierre.
// Datos del evento en src/data/theChosen.ts.
export default function TheChosenPage() {
  useRevealOnScroll();
  // Intro de cine (una vez por sesión). Mientras dura, las animaciones de
  // la portada esperan: arrancan al quitarse la intro (clase chosen--lista).
  const [intro, setIntro] = useState(debeMostrarIntro);
  const terminarIntro = useCallback(() => setIntro(false), []);

  return (
    <>
      {intro && <IntroCine onFin={terminarIntro} />}
      <Seo
        titulo="The Chosen Temporada 6: Acceso Anticipado"
        descripcion="Proyección del Episodio 1 de la Temporada 6 de The Chosen en el atrio de la Parroquia San Juan Bautista, Maravatío. Domingo 11 de octubre, 7:30 p.m. Consigue tu boleto por Facebook."
        imagen="/optimized/the-chosen-panoramica-1600.webp"
      />
      <Navbar />
      <BarraProgreso />
      <div className="chosen__polvo" aria-hidden="true">
        {POLVO.map((p, i) => (
          <span
            key={i}
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>
      <main className={`chosen${intro ? '' : ' chosen--lista'}`}>
        {/* ─── Hero: arte oficial completo (panorámico en escritorio,
            vertical en móvil) con franjas de cine que se abren. ─── */}
        <header className="chosen__hero">
          <picture>
            <source
              media="(max-width: 760px)"
              srcSet="/optimized/the-chosen-vertical-480.webp 480w, /optimized/the-chosen-vertical-960.webp 960w, /optimized/the-chosen-vertical-1080.webp 1080w"
              sizes="100vw"
            />
            <img
              className="chosen__hero-img"
              src="/optimized/the-chosen-panoramica-1600.webp"
              srcSet="/optimized/the-chosen-panoramica-960.webp 960w, /optimized/the-chosen-panoramica-1600.webp 1600w, /optimized/the-chosen-panoramica-1920.webp 1920w"
              sizes="100vw"
              alt="The Chosen, Temporada 6: Jesús con la corona de espinas carga la cruz entre la multitud. Evento de acceso anticipado, Episodio 1."
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="chosen__hero-rayos" aria-hidden="true" />
          <div className="chosen__hero-scrim" aria-hidden="true" />
          <div className="chosen__grano" aria-hidden="true" />
          <div className="chosen__embers" aria-hidden="true">
            {BRASAS.map((b, i) => (
              <span
                key={i}
                style={{
                  left: `${b.left}%`,
                  width: b.size,
                  height: b.size,
                  animationDelay: `${b.delay}s`,
                  animationDuration: `${b.dur}s`,
                }}
              />
            ))}
          </div>
          <div className="chosen__letterbox chosen__letterbox--top" aria-hidden="true" />
          <div className="chosen__letterbox chosen__letterbox--bottom" aria-hidden="true" />

          <Link className="chosen__back" to="/eventos">
            <ArrowLeft size={16} /> Eventos
          </Link>

          <div className="chosen__hero-cta">
            <span className="chosen__hero-tag">
              <Ticket size={14} /> Acceso anticipado · Cupo limitado
            </span>
            <p className="chosen__hero-date">{DETALLES.fecha} · {DETALLES.hora}</p>
            <div className="chosen__hero-botones">
              <a className="chosen__btn chosen__btn--gold" href="#boletos">
                Consigue tu boleto
              </a>
              <a className="chosen__btn chosen__btn--ghost chosen__btn--ghost-hero" href="#trailer">
                Ver tráiler
              </a>
            </div>
          </div>

          <a className="chosen__hero-cue" href="#cuenta" aria-label="Ir a la cuenta regresiva">
            <ChevronDown size={22} />
          </a>
        </header>

        {/* ─── Cuenta regresiva ─── */}
        <section id="cuenta" className="chosen__strip">
          <p className="chosen__eyebrow">La función comienza en</p>
          <CuentaRegresiva />
        </section>

        {/* ─── 1. Tráiler ─── */}
        <section id="trailer" className="chosen__trailer-section">
          <div className="chosen__container">
            <div className="chosen__section-head reveal">
              <p className="chosen__eyebrow">Un adelanto</p>
              <TituloAnimado className="chosen__subtitle" texto="Mira el tráiler" />
              <div className="chosen__rule chosen__rule--center" aria-hidden="true"><span>✦</span></div>
            </div>
            <div className="reveal chosen__trailer-wrap">
              <Trailer />
            </div>
          </div>
        </section>

        {/* ─── 2. Boleto ─── */}
        <section id="boletos" className="chosen__tickets">
          <div className="chosen__container">
            <div className="chosen__section-head reveal">
              <p className="chosen__eyebrow">Tu lugar en la función</p>
              <TituloAnimado className="chosen__subtitle" texto="Consigue tu boleto" resaltar={['boleto']} />
            </div>

            <div className="reveal chosen__ticket-wrap">
              <BoletoInteractivo />
            </div>

            {/* Pasos en una sola línea de íconos unidos por un hilo que avanza */}
            <ol className="chosen__pasos reveal">
              {PASOS_BOLETO.map((p, i) => {
                const Icono = ICONOS_PASO[p.icono];
                return (
                  <li key={p.titulo} className="chosen__paso" style={{ '--i': i } as React.CSSProperties}>
                    <span className="chosen__paso-icono"><Icono size={22} /></span>
                    <span className="chosen__paso-titulo">{p.titulo}</span>
                  </li>
                );
              })}
            </ol>

            <div className="chosen__boleto-cta reveal">
              <a className="chosen__btn chosen__btn--facebook chosen__btn--pulso" href={MESSENGER_URL} target="_blank" rel="noopener noreferrer">
                <RedIcono id="facebook" size={18} /> Pedir boletos por Facebook
              </a>
            </div>
          </div>
        </section>

        {/* ─── 3. Póster ─── */}
        <section className="chosen__intro">
          <div className="chosen__container chosen__intro-grid">
            <PosterAnimado />
            <div className="chosen__intro-text reveal">
              <p className="chosen__eyebrow">Episodio 1 · Temporada 6</p>
              <TituloAnimado
                como="h1"
                className="chosen__title"
                texto="Una noche para acompañar a Jesús camino a la cruz"
                resaltar={['acompañar', 'Jesús']}
              />
              <div className="chosen__rule" aria-hidden="true"><span>✝</span></div>
              <blockquote className="chosen__quote">
                <p className="chosen__quote-texto" aria-label={`«${CITA}»`}>
                  {`«${CITA}»`.split(' ').map((w, i) => (
                    <span key={i} aria-hidden="true" className="chosen__cita-palabra" style={{ '--i': i } as React.CSSProperties}>
                      {w}{' '}
                    </span>
                  ))}
                </p>
                <cite>Mateo 16, 24</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ─── 4. Recomendaciones ─── */}
        <section className="chosen__tips">
          <div className="chosen__container">
            <div className="chosen__section-head reveal">
              <TituloAnimado className="chosen__subtitle chosen__subtitle--small" texto="Para que disfrutes la noche" />
            </div>
            <div className="chosen__tips-grid">
              {RECOMENDACIONES.map((r, i) => {
                const Icono = ICONOS_TIP[r.icono];
                return (
                  <div key={r.titulo} className={`chosen__tip chosen__tip--${r.icono} reveal`} style={{ transitionDelay: `${i * 90}ms` }}>
                    <span className="chosen__tip-icono"><Icono size={26} /></span>
                    <h3>{r.titulo}</h3>
                    <p>{r.texto}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 5. Conoce The Chosen: redes oficiales ─── */}
        <section className="chosen__redes">
          <div className="chosen__container">
            <div className="chosen__section-head reveal">
              <p className="chosen__eyebrow">La serie sobre la vida de Jesús</p>
              <TituloAnimado className="chosen__subtitle" texto="Conoce The Chosen" resaltar={['Chosen']} />
            </div>

            <div className="chosen__redes-grid">
              {REDES.map((r, i) => (
                <a
                  key={r.id}
                  className="chosen__red reveal"
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ '--red-color': r.color, '--i': i, transitionDelay: `${i * 70}ms` } as React.CSSProperties}
                >
                  <span className="chosen__red-icono"><RedIcono id={r.id} /></span>
                  <span className="chosen__red-texto">
                    <span className="chosen__red-nombre">{r.nombre}</span>
                    <span className="chosen__red-usuario">{r.usuario}</span>
                  </span>
                  <ArrowUpRight size={16} className="chosen__red-flecha" />
                </a>
              ))}
            </div>

            <div className="chosen__app reveal">
              <span>App oficial:</span>
              <a href={APP.android} target="_blank" rel="noopener noreferrer">Android</a>
              <span aria-hidden="true">·</span>
              <a href={APP.ios} target="_blank" rel="noopener noreferrer">iPhone</a>
            </div>
          </div>
        </section>

        {/* ─── Cierre: "Ven y verás" (Come and See) ─── */}
        <section className="chosen__closing">
          <div className="chosen__closing-glow" aria-hidden="true" />
          <div className="chosen__container chosen__closing-inner reveal">
            {/* Cruz que se traza sola al aparecer, con rayos detrás */}
            <svg className="chosen__cruz" viewBox="0 0 120 160" aria-hidden="true">
              <g className="chosen__cruz-rayos">
                {Array.from({ length: 12 }, (_, i) => (
                  <line key={i} x1="60" y1="52" x2="60" y2="2" transform={`rotate(${i * 30} 60 52)`} />
                ))}
              </g>
              <path
                className="chosen__cruz-trazo"
                pathLength={1000}
                d="M52 8 h16 v36 h30 v16 h-30 v92 h-16 v-92 h-30 v-16 h30 z"
              />
            </svg>
            <p className="chosen__closing-quote">«Ven y verás»</p>
            <p className="chosen__closing-cite">Juan 1, 46</p>
            <div className="chosen__message-actions">
              <a className="chosen__btn chosen__btn--gold" href={MESSENGER_URL} target="_blank" rel="noopener noreferrer">
                <Ticket size={16} /> Apartar mis boletos
              </a>
              <BotonCompartir />
            </div>
            <p className="chosen__credit">The Chosen Temporada 6 · Presentado por Come and See</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
