import { useEffect, useRef } from 'react';

/**
 * Aplica un desplazamiento parallax sutil a un elemento mientras su
 * contenedor de referencia cruza el viewport: la imagen se mueve más
 * lento que el scroll, dando sensación de profundidad.
 *
 * Implementado a mano (sin librerías) con un único listener de scroll
 * pasivo + rAF para no bloquear el hilo principal, y respeta
 * prefers-reduced-motion (el elemento queda estático).
 *
 * @param strength desplazamiento máximo en px aplicado en el eje Y
 */
export function useParallax<T extends HTMLElement>(strength = 60) {
  const containerRef = useRef<T>(null);
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progreso 0→1 mientras el contenedor recorre el viewport
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.min(1, Math.max(0, progress));
      const offset = (clamped - 0.5) * strength;
      target.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [strength]);

  return { containerRef, targetRef };
}
