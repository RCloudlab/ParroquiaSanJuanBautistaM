import { useEffect } from 'react';
import { CLAVE_INTRO } from '../data/theChosen';
import './IntroCine.css';

/** Duración total de la intro (ms); debe coincidir con los tiempos del CSS. */
const DURACION_INTRO = 4500;

/**
 * Entrada de cine: cinta de conteo de proyector antiguo (3·2·1 con barrido
 * circular), carrete corriendo a los lados, rayones y parpadeo; luego el
 * rótulo "Parroquia San Juan Bautista & Come and See presentan" y un destello de proyector
 * que deja ver la página. Se puede saltar con el botón o con Esc.
 */
export default function IntroCine({ onFin }: { onFin: () => void }) {
  useEffect(() => {
    try { sessionStorage.setItem(CLAVE_INTRO, '1'); } catch { /* sin almacenamiento */ }

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(onFin, DURACION_INTRO);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onFin(); };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = overflowPrevio;
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [onFin]);

  return (
    <div className="chosen-intro" role="presentation">
      <div className="chosen-intro__carrete chosen-intro__carrete--izq" aria-hidden="true" />
      <div className="chosen-intro__carrete chosen-intro__carrete--der" aria-hidden="true" />

      <div className="chosen-intro__cuadro" aria-hidden="true">
        <div className="chosen-intro__conteo">
          <span className="chosen-intro__barrido" />
          <svg className="chosen-intro__mira" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="92" />
            <circle cx="100" cy="100" r="74" />
            <line x1="100" y1="0" x2="100" y2="200" />
            <line x1="0" y1="100" x2="200" y2="100" />
          </svg>
          <span className="chosen-intro__num chosen-intro__num--3">3</span>
          <span className="chosen-intro__num chosen-intro__num--2">2</span>
          <span className="chosen-intro__num chosen-intro__num--1">1</span>
        </div>

        <div className="chosen-intro__rotulo">
          <span className="chosen-intro__rotulo-linea">Parroquia San Juan Bautista</span>
          <span className="chosen-intro__rotulo-y">&amp;</span>
          <span className="chosen-intro__rotulo-linea">Come and See</span>
          <span className="chosen-intro__rotulo-presenta">presentan</span>
        </div>
      </div>

      <div className="chosen-intro__rayones" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div className="chosen-intro__grano" aria-hidden="true" />
      <div className="chosen-intro__parpadeo" aria-hidden="true" />
      <div className="chosen-intro__destello" aria-hidden="true" />

      <button type="button" className="chosen-intro__saltar" onClick={onFin}>
        Saltar intro ›
      </button>
    </div>
  );
}
