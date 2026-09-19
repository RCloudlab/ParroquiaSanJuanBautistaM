import { useEffect } from 'react';

const SELECTOR = '.reveal:not(.reveal--visible)';

/**
 * Activa un fade-in + slide-up sutil para los elementos con clase
 * "reveal" cuando entran en el viewport, usando un único IntersectionObserver
 * compartido (no uno por elemento) para mantener el costo en runtime bajo.
 *
 * No depende de ninguna librería externa y respeta prefers-reduced-motion:
 * si el usuario lo tiene activado, los elementos se muestran directamente
 * sin animar.
 *
 * Contenido ".reveal" que aparece después del primer render (p. ej. tarjetas
 * que llegan tras una consulta a Supabase) también queda cubierto: un
 * MutationObserver detecta nodos nuevos, y un barrido periódico ligero actúa
 * como red de seguridad para el caso — real en desarrollo con StrictMode,
 * donde el efecto se monta/desmonta/remonta — en que una inserción del DOM
 * cae justo en el hueco entre un observer viejo desconectándose y el nuevo
 * arrancando. El barrido es barato (un querySelectorAll ya acotado por
 * :not(.reveal--visible)) y se detiene solo en cuanto no queda nada por
 * revelar.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sinIntersectionObserver = !('IntersectionObserver' in window);

    const revelar = (el: HTMLElement) => el.classList.add('reveal--visible');

    const intersectionObserver = !prefersReducedMotion && !sinIntersectionObserver
      ? new IntersectionObserver(
          entries => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                revelar(entry.target as HTMLElement);
                intersectionObserver!.unobserve(entry.target);
              }
            }
          },
          { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        )
      : null;

    const procesar = (el: HTMLElement) => {
      if (el.classList.contains('reveal--visible')) return;

      if (prefersReducedMotion || sinIntersectionObserver) {
        revelar(el);
        return;
      }

      // Si el elemento ya está visible en el viewport en el momento de
      // procesarlo (p. ej. contenido sobre el pliegue, o llega ya dentro
      // del área visible tras cargar datos), el observer puede no disparar
      // un nuevo evento de intersección. Se revela de inmediato en ese caso.
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (alreadyVisible) {
        revelar(el);
      } else {
        intersectionObserver!.observe(el);
      }
    };

    const barrer = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach(procesar);
    };

    barrer();

    const mutationObserver = new MutationObserver(barrer);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Red de seguridad: cubre inserciones que el MutationObserver pudiera
    // perder por una ventana de desconexión (StrictMode en dev) sin costar
    // nada una vez que todo el contenido .reveal ya fue revelado.
    const intervalo = window.setInterval(() => {
      if (!document.querySelector(SELECTOR)) {
        window.clearInterval(intervalo);
        return;
      }
      barrer();
    }, 400);

    return () => {
      intersectionObserver?.disconnect();
      mutationObserver.disconnect();
      window.clearInterval(intervalo);
    };
  }, []);
}
