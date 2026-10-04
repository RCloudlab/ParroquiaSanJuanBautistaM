import { useCallback, useEffect, useRef, useState } from 'react';

type Estado = 'inactivo' | 'leyendo' | 'pausado';

/**
 * Lee en voz alta un texto usando la síntesis de voz del propio navegador
 * (Web Speech API) — sin backend, sin costo, sin depender de que haya un
 * audio grabado. Pensado como respaldo accesible para quien no puede leer
 * el evangelio en pantalla mientras el párroco no ha grabado la reflexión.
 *
 * Soporte: todos los navegadores modernos de escritorio y Android; Safari
 * de iOS lo soporta desde iOS 7 pero requiere que la primera reproducción
 * ocurra dentro de un gesto del usuario (un clic) — por eso `leer()` se
 * llama siempre desde el propio onClick del botón, nunca automáticamente.
 */
export function useLectorTexto(parrafos: string[]) {
  const [estado, setEstado] = useState<Estado>('inactivo');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const soportado = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const detener = useCallback(() => {
    if (!soportado) return;
    window.speechSynthesis.cancel();
    setEstado('inactivo');
  }, [soportado]);

  const leer = useCallback(() => {
    if (!soportado || parrafos.length === 0) return;

    if (estado === 'pausado') {
      window.speechSynthesis.resume();
      setEstado('leyendo');
      return;
    }

    window.speechSynthesis.cancel(); // por si quedó algo de una lectura anterior
    const texto = parrafos.join('. ');
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-MX';
    utterance.rate = 0.95;
    utterance.onend = () => setEstado('inactivo');
    utterance.onerror = () => setEstado('inactivo');
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setEstado('leyendo');
  }, [soportado, parrafos, estado]);

  const pausar = useCallback(() => {
    if (!soportado) return;
    window.speechSynthesis.pause();
    setEstado('pausado');
  }, [soportado]);

  // Si el usuario cambia de página con la lectura activa, se detiene: no
  // tiene sentido que la voz siga sonando sobre una pantalla distinta.
  useEffect(() => {
    return () => {
      if (soportado) window.speechSynthesis.cancel();
    };
  }, [soportado]);

  return { soportado, estado, leer, pausar, detener };
}
