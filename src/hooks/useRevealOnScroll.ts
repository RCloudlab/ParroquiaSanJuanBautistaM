import { useEffect } from 'react';

/**
 * Activa un fade-in + slide-up sutil para los elementos con clase
 * "reveal" cuando entran en el viewport, usando un único IntersectionObserver
 * compartido (no uno por elemento) para mantener el costo en runtime bajo.
 *
 * No depende de ninguna librería externa y respeta prefers-reduced-motion:
 * si el usuario lo tiene activado, los elementos se muestran directamente
 * sin animar.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll<HTMLElement>('.reveal');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('reveal--visible'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => {
      // Si el elemento ya está visible en el viewport en el momento de
      // observar (p. ej. contenido sobre el pliegue, o un remontaje de
      // StrictMode en desarrollo), el observer puede no disparar un nuevo
      // evento de intersección. Se revela de inmediato en ese caso en vez
      // de depender solo del callback del observer.
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (alreadyVisible) {
        el.classList.add('reveal--visible');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);
}
