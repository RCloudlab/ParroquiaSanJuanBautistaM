import { useCallback, useEffect, useState } from 'react';
import PapelPicado, { type TiraPapelPicado } from './PapelPicado';
import Veladora from './Veladora';
import './IntroSantos.css';

// Intro de la página de Todos los Santos: pantalla de noche donde cae el
// papel picado, se enciende una veladora al centro, su luz se abre y
// aparece el título; luego todo se desvanece y deja ver la página completa.
// Se muestra una vez por visita (sessionStorage), se puede saltar, y no se
// muestra si el dispositivo pide reducir el movimiento.

const CLAVE = 'tls-intro-vista';
const DURACION = 4600; // ms hasta empezar a desvanecerse
const SALIDA = 900;    // ms del desvanecido

const TIRAS: TiraPapelPicado[] = [
  { ancho: 120, colgado: 30, desfase: 2, fondo: true, escalonada: true, ocupa: 0.6 },
  { ancho: 120, colgado: 46, arriba: 22, ocupa: 0.72 },
];

function debeMostrarse() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(CLAVE);
  } catch {
    return true;
  }
}

export default function IntroSantos() {
  const [visible, setVisible] = useState(debeMostrarse);
  const [saliendo, setSaliendo] = useState(false);

  const terminar = useCallback(() => {
    setSaliendo(true);
    try {
      sessionStorage.setItem(CLAVE, '1');
    } catch {
      /* sin almacenamiento: se volverá a ver en la próxima visita */
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Sin scroll mientras corre la intro
    const html = document.documentElement;
    const previo = html.style.overflow;
    html.style.overflow = 'hidden';
    const t = window.setTimeout(terminar, DURACION);
    return () => {
      window.clearTimeout(t);
      html.style.overflow = previo;
    };
  }, [visible, terminar]);

  useEffect(() => {
    if (!saliendo) return;
    const t = window.setTimeout(() => setVisible(false), SALIDA);
    return () => window.clearTimeout(t);
  }, [saliendo]);

  if (!visible) return null;

  return (
    <div className={`intro${saliendo ? ' intro--saliendo' : ''}`} onClick={terminar} aria-hidden="true">
      <PapelPicado tiras={TIRAS} className="intro__papel" entrada />
      <span className="intro__luz" />

      <div className="intro__centro">
        <Veladora className="intro__vela" color="blanca" alto={120} semilla={3} />
        <p className="intro__parroquia">Parroquia San Juan Bautista</p>
        <p className="intro__titulo">
          <span className="intro__titulo-pre">Día de</span>
          <span className="intro__titulo-main">Todos los Santos</span>
        </p>
        <p className="intro__fecha">1 de noviembre</p>
      </div>

      <button type="button" className="intro__saltar" onClick={terminar}>
        Saltar intro
      </button>
    </div>
  );
}
