import { useEffect, useMemo, useReducer, useRef, useState, useCallback } from 'react';
import {
  GRUPOS_MISTERIOS,
  generarSecuencia,
  grupoDelDia,
  type GrupoId,
  type GrupoMisterios,
  type Paso,
} from '../data/rosario';

/* ─── Progreso del rezo (contador y guiado comparten la misma cuenta) ───── */

const CLAVE_PROGRESO = 'rosario-progreso-v1';

interface Estado {
  grupoId: GrupoId;
  indice: number;
}

type Accion =
  | { tipo: 'avanzar'; total: number }
  | { tipo: 'retroceder' }
  | { tipo: 'reiniciar' }
  | { tipo: 'cambiarGrupo'; grupoId: GrupoId }
  | { tipo: 'restaurar'; estado: Estado };

function reducer(estado: Estado, accion: Accion): Estado {
  switch (accion.tipo) {
    case 'avanzar':
      return estado.indice < accion.total - 1
        ? { ...estado, indice: estado.indice + 1 }
        : estado;
    case 'retroceder':
      return estado.indice > 0 ? { ...estado, indice: estado.indice - 1 } : estado;
    case 'reiniciar':
      return { ...estado, indice: 0 };
    case 'cambiarGrupo':
      return { grupoId: accion.grupoId, indice: 0 };
    case 'restaurar':
      return accion.estado;
  }
}

interface ProgresoGuardado extends Estado {
  guardadoEn: number;
}

function leerProgreso(): ProgresoGuardado | null {
  try {
    const crudo = localStorage.getItem(CLAVE_PROGRESO);
    if (!crudo) return null;
    const datos = JSON.parse(crudo) as ProgresoGuardado;
    if (
      typeof datos.indice !== 'number' ||
      !GRUPOS_MISTERIOS.some(g => g.id === datos.grupoId)
    ) {
      return null;
    }
    return datos;
  } catch {
    return null;
  }
}

export interface Rosario {
  grupo: GrupoMisterios;
  secuencia: Paso[];
  paso: Paso;
  indice: number;
  total: number;
  terminado: boolean;
  /** Progreso pendiente de una sesión anterior (solo al montar, si existe). */
  progresoPendiente: ProgresoGuardado | null;
  avanzar: () => void;
  retroceder: () => void;
  reiniciar: () => void;
  cambiarGrupo: (id: GrupoId) => void;
  continuarGuardado: () => void;
  descartarGuardado: () => void;
}

export function useRosario(): Rosario {
  const [estado, dispatch] = useReducer(reducer, null, (): Estado => ({
    grupoId: grupoDelDia().id,
    indice: 0,
  }));

  // Progreso guardado de una sesión anterior; se ofrece reanudar una sola vez.
  const [progresoPendiente, setProgresoPendiente] = useState<ProgresoGuardado | null>(() => {
    const guardado = leerProgreso();
    return guardado && guardado.indice > 0 ? guardado : null;
  });

  const grupo = useMemo(
    () => GRUPOS_MISTERIOS.find(g => g.id === estado.grupoId) ?? GRUPOS_MISTERIOS[0],
    [estado.grupoId],
  );
  const secuencia = useMemo(() => generarSecuencia(grupo), [grupo]);
  const total = secuencia.length;
  const indice = Math.min(estado.indice, total - 1);
  const paso = secuencia[indice];
  const terminado = indice === total - 1;

  // Persistencia con debounce corto: si cierras a media decena, se reanuda después.
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        if (indice === 0 || terminado) {
          localStorage.removeItem(CLAVE_PROGRESO);
        } else {
          const datos: ProgresoGuardado = {
            grupoId: estado.grupoId,
            indice,
            guardadoEn: Date.now(),
          };
          localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(datos));
        }
      } catch {
        // localStorage no disponible (modo privado, etc.) — no es crítico
      }
    }, 400);
    return () => window.clearTimeout(id);
  }, [estado.grupoId, indice, terminado]);

  // Ref para conocer el índice actual dentro de avanzar sin recrear el callback
  const indiceRef = useRef(indice);
  indiceRef.current = indice;

  const avanzar = useCallback(() => {
    setProgresoPendiente(null);
    dispatch({ tipo: 'avanzar', total });
    vibrar(secuencia, Math.min(indiceRef.current + 1, total - 1));
  }, [total, secuencia]);

  const retroceder = useCallback(() => {
    setProgresoPendiente(null);
    dispatch({ tipo: 'retroceder' });
  }, []);

  const reiniciar = useCallback(() => {
    setProgresoPendiente(null);
    dispatch({ tipo: 'reiniciar' });
  }, []);

  const cambiarGrupo = useCallback((id: GrupoId) => {
    setProgresoPendiente(null);
    dispatch({ tipo: 'cambiarGrupo', grupoId: id });
  }, []);

  const continuarGuardado = useCallback(() => {
    if (progresoPendiente) {
      dispatch({
        tipo: 'restaurar',
        estado: { grupoId: progresoPendiente.grupoId, indice: progresoPendiente.indice },
      });
      setProgresoPendiente(null);
    }
  }, [progresoPendiente]);

  const descartarGuardado = useCallback(() => {
    setProgresoPendiente(null);
    try {
      localStorage.removeItem(CLAVE_PROGRESO);
    } catch { /* sin localStorage */ }
  }, []);

  return {
    grupo,
    secuencia,
    paso,
    indice,
    total,
    terminado,
    progresoPendiente,
    avanzar,
    retroceder,
    reiniciar,
    cambiarGrupo,
    continuarGuardado,
    descartarGuardado,
  };
}

/* ─── Vibración háptica ─────────────────────────────────────────────────── */

/**
 * Pulso corto por cuenta, doble al cerrar una decena (Gloria) y largo al
 * terminar el rosario — permite rezar sin mirar la pantalla.
 * iOS Safari no soporta la API: ahí simplemente no vibra.
 */
function vibrar(secuencia: Paso[], nuevoIndice: number) {
  if (!('vibrate' in navigator)) return;
  const paso = secuencia[nuevoIndice];
  if (!paso) return;
  try {
    if (nuevoIndice === secuencia.length - 1) {
      navigator.vibrate([60, 80, 60, 80, 120]);
    } else if (paso.tipo === 'gloria' || paso.tipo === 'anuncio') {
      navigator.vibrate([35, 70, 35]);
    } else {
      navigator.vibrate(18);
    }
  } catch { /* algunos navegadores lanzan si el usuario no ha interactuado */ }
}

/* ─── Wake Lock: que la pantalla no se apague a media decena ────────────── */

export function useWakeLock() {
  useEffect(() => {
    // Tipado laxo: la API aún no está en todos los lib.dom
    type SentinelLike = { release: () => Promise<void> } | null;
    let sentinel: SentinelLike = null;
    let activo = true;

    const solicitar = async () => {
      try {
        const wl = (navigator as Navigator & {
          wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> };
        }).wakeLock;
        if (!wl) return;
        const s = await wl.request('screen');
        if (activo) sentinel = s;
        else s.release().catch(() => {});
      } catch { /* denegado o sin soporte: fallback silencioso */ }
    };

    const alCambiarVisibilidad = () => {
      if (document.visibilityState === 'visible') solicitar();
    };

    solicitar();
    document.addEventListener('visibilitychange', alCambiarVisibilidad);

    return () => {
      activo = false;
      document.removeEventListener('visibilitychange', alCambiarVisibilidad);
      sentinel?.release().catch(() => {});
      sentinel = null;
    };
  }, []);
}

/* ─── Ajustes de apariencia: tema claro/oscuro y tamaño de letra ────────── */

const CLAVE_AJUSTES = 'rosario-ajustes-v1';

export type Tema = 'claro' | 'oscuro';
export type Fuente = 'm' | 'g' | 'xg';

interface Ajustes {
  tema: Tema;
  fuente: Fuente;
}

function leerAjustes(): Ajustes {
  const porDefecto: Ajustes = {
    tema:
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches
        ? 'oscuro'
        : 'claro',
    // Texto mediano/grande por defecto (público mixto, mucha gente mayor)
    fuente: 'g',
  };
  try {
    const crudo = localStorage.getItem(CLAVE_AJUSTES);
    if (!crudo) return porDefecto;
    const datos = JSON.parse(crudo) as Partial<Ajustes>;
    return {
      tema: datos.tema === 'claro' || datos.tema === 'oscuro' ? datos.tema : porDefecto.tema,
      fuente: datos.fuente === 'm' || datos.fuente === 'g' || datos.fuente === 'xg'
        ? datos.fuente
        : porDefecto.fuente,
    };
  } catch {
    return porDefecto;
  }
}

const FUENTES: Fuente[] = ['m', 'g', 'xg'];

export function useAjustesRosario() {
  const [ajustes, setAjustes] = useState<Ajustes>(leerAjustes);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_AJUSTES, JSON.stringify(ajustes));
    } catch { /* sin localStorage */ }
  }, [ajustes]);

  const alternarTema = useCallback(
    () => setAjustes(a => ({ ...a, tema: a.tema === 'claro' ? 'oscuro' : 'claro' })),
    [],
  );
  const aumentarFuente = useCallback(
    () => setAjustes(a => ({
      ...a,
      fuente: FUENTES[Math.min(FUENTES.indexOf(a.fuente) + 1, FUENTES.length - 1)],
    })),
    [],
  );
  const reducirFuente = useCallback(
    () => setAjustes(a => ({
      ...a,
      fuente: FUENTES[Math.max(FUENTES.indexOf(a.fuente) - 1, 0)],
    })),
    [],
  );

  return { ...ajustes, alternarTema, aumentarFuente, reducirFuente };
}
