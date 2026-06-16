// Set de iconos line-art para la interfaz de la parroquia.
//
// Convenciones compartidas por todo el set (no las repitas distinto en
// nuevos iconos, rompe la coherencia visual):
//   - viewBox="0 0 24 24"
//   - stroke="currentColor" + fill="none" → heredan el color por CSS/Tailwind
//   - strokeWidth 1.5, strokeLinecap/strokeLinejoin "round"
//   - cada componente acepta `className` para inyectar utilidades de Tailwind
//     (tamaño, color, animaciones) sin tocar el SVG.
import type { ReactNode, SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

/** Envoltorio común: fija los atributos compartidos y deja pasar el resto (className, onClick, etc.). */
function IconBase({ className, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/**
 * Bautismo: concha de vieira (símbolo bautismal clásico) + tres gotas cayendo.
 * La concha se construye en dos mitades simétricas (igual técnica que la flor
 * de lis de SectionDivider.tsx): un contorno exterior abovedado, una base
 * recta y "costillas" radiales desde un mismo punto focal en la base. Las
 * gotas son una forma cerrada (pico + panza redondeada), no un trazo abierto.
 */
export function IconBautismo(props: IconProps) {
  return (
    <IconBase {...props}>
      {/* Contorno exterior de la concha: domo + dos bordes que bajan a la base */}
      <path d="M4.5 12.5C4.5 7.8 7.8 4 12 4s7.5 3.8 7.5 8.5" />
      <path d="M4.5 12.5h15" />
      {/* Costillas radiales, todas convergiendo en el mismo foco de la base */}
      <path d="M12 4v8.5" />
      <path d="M8.7 4.6 11 12.5" />
      <path d="M15.3 4.6 13 12.5" />
      <path d="M6.1 6.3l4.3 6.2" />
      <path d="M17.9 6.3l-4.3 6.2" />
      {/* Tres gotas cayendo, forma cerrada (pico arriba, panza redonda abajo) */}
      <path d="M7.7 14.8c1.1 1.2 1.7 2.1 1.7 2.9a1.7 1.7 0 1 1-3.4 0c0-.8.6-1.7 1.7-2.9Z" />
      <path d="M12 15.6c1.1 1.2 1.7 2.1 1.7 2.9a1.7 1.7 0 1 1-3.4 0c0-.8.6-1.7 1.7-2.9Z" />
      <path d="M16.3 14.8c1.1 1.2 1.7 2.1 1.7 2.9a1.7 1.7 0 1 1-3.4 0c0-.8.6-1.7 1.7-2.9Z" />
    </IconBase>
  );
}

/**
 * Eucaristía: hostia (círculo con la cruz que suele llevar grabada) flotando
 * justo encima de la copa del cáliz, separada por un pequeño espacio para
 * que ambas formas se lean por separado antes de leerse como conjunto.
 */
export function IconEucaristia(props: IconProps) {
  return (
    <IconBase {...props}>
      {/* Hostia con la cruz grabada */}
      <circle cx="12" cy="4.3" r="1.9" />
      <path d="M12 3.3v2" />
      <path d="M11 4.3h2" />
      {/* Copa del cáliz: borde superior recto, panza redondeada hacia el tallo */}
      <path d="M7 8.5h10c0 2.9-2.1 5.2-5 5.2s-5-2.3-5-5.2Z" />
      {/* Tallo y base */}
      <path d="M12 13.7v3.6" />
      <path d="M9 17.3h6" />
      <path d="M8.5 20.5h7" />
      <path d="M9 20.5c0-1.2.6-2.2 1.7-3.2" />
      <path d="M15 20.5c0-1.2-.6-2.2-1.7-3.2" />
    </IconBase>
  );
}

/**
 * Confirmación: paloma del Espíritu Santo descendiendo, vista frontal en el
 * trazo clásico de "paloma de paz" (dos alas en V cayendo desde un punto
 * central, cabeza y pico a la izquierda) — es la lectura más reconocible
 * del símbolo en formato de icono pequeño. Tres rayos arriba sugieren la
 * luz que la acompaña en la iconografía tradicional.
 */
export function IconConfirmacion(props: IconProps) {
  return (
    <IconBase {...props}>
      {/* Cabeza + pico, mirando a la izquierda */}
      <circle cx="6.3" cy="10.5" r="1.5" />
      <path d="M4.9 10.2 3 9.7" />
      {/* Cuerpo: del cuello hacia la cola, ligeramente descendente */}
      <path d="M7.6 11.2c2 .2 3.6 1 4.8 2.4" />
      {/* Ala izquierda (la más cercana, más grande) */}
      <path d="M7.3 11.5c-1.7 1-2.7 2.5-3 4.5 2.1.1 3.8-.7 5-2.4" />
      {/* Ala derecha (la lejana, algo más pequeña, da sensación de vuelo) */}
      <path d="M9.6 12.8c.2 1.9-.4 3.5-1.8 5 2.1-.1 3.6-1.1 4.4-3" />
      {/* Cola, abierta en abanico corto */}
      <path d="M12.4 13.6c1.6-.1 2.9-.7 4-1.8" />
      <path d="M12.4 13.6c1.5.5 3 .5 4.4 0" />
      {/* Rayos de luz arriba */}
      <path d="M6.3 6.3v1.2" />
      <path d="M3.9 7.6l.8.8" />
      <path d="M8.7 7.6l-.8.8" />
    </IconBase>
  );
}

/** Matrimonio: dos anillos entrelazados. */
export function IconMatrimonio(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="9" cy="13.5" r="5" />
      <circle cx="15" cy="13.5" r="5" />
    </IconBase>
  );
}

/** Horarios de Misa: reloj de pared clásico con manecillas. */
export function IconHorarios(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12.5" r="8.5" />
      <path d="M12 4v1.2" />
      <path d="M12 19.8V21" />
      <path d="M20.5 12.5h-1.2" />
      <path d="M4.7 12.5H3.5" />
      <path d="M12 8v4.5l3 2" />
      <path d="M9.5 2.8h5" />
    </IconBase>
  );
}

/**
 * Avisos Parroquiales: campana clásica sonando, con ondas a los lados.
 * Silueta de una sola pieza: asa arriba, cuerpo que se abre en curva desde
 * el asa hasta un reborde inferior recto y ancho (la "boca" de la campana),
 * apoyada sobre una línea base. El badajo cuelga del centro y dos pares de
 * ondas a los lados (más cortas arriba, más largas abajo) sugieren el sonido.
 */
export function IconAvisos(props: IconProps) {
  return (
    <IconBase {...props}>
      {/* Asa */}
      <path d="M11 3.2a1 1 0 1 1 2 0" />
      {/* Cuerpo de la campana: del asa se abre hasta el reborde inferior */}
      <path d="M12 3.2c-3.6 0-6 3-6 7.3 0 2.1-.5 3.5-1.5 4.8h15c-1-1.3-1.5-2.7-1.5-4.8 0-4.3-2.4-7.3-6-7.3Z" />
      {/* Reborde / boca de la campana */}
      <path d="M3.8 17.3h16.4" />
      {/* Badajo */}
      <path d="M11.2 17.3c0 1 .4 1.9 1.4 1.9" />
      {/* Ondas de sonido, dos a cada lado (corta arriba, larga abajo) */}
      <path d="M3.6 8.6c-.6.7-1 1.5-1.1 2.4" />
      <path d="M2.6 6.4c-1.1 1.3-1.8 2.9-2 4.7" />
      <path d="M20.4 8.6c.6.7 1 1.5 1.1 2.4" />
      <path d="M21.4 6.4c1.1 1.3 1.8 2.9 2 4.7" />
    </IconBase>
  );
}

/**
 * Donaciones/Diezmo: corazón flotando sobre un par de manos abiertas hacia
 * arriba en ofrenda. Para que se lea con claridad a tamaño de icono, cada
 * mano se simplifica a su silueta más reconocible: una palma en V abierta
 * con tres dedos como picos redondeados en el borde superior, más un
 * pulgar corto hacia afuera — nada de muñecas ni curvas superpuestas que
 * compitan visualmente con el corazón.
 */
export function IconDonaciones(props: IconProps) {
  return (
    <IconBase {...props}>
      {/* Corazón, flotando sobre el hueco entre las dos manos */}
      <path d="M12 11.8c-.6-.9-1.5-1.4-2.5-1.4-1.4 0-2.5 1-2.5 2.3 0 2 2.4 3.3 5 5.3 2.6-2 5-3.3 5-5.3 0-1.3-1.1-2.3-2.5-2.3-1 0-1.9.5-2.5 1.4Z" />
      {/* Mano izquierda: palma en V con tres dedos + pulgar hacia afuera */}
      <path d="M11 20.5c0-1.7-.2-2.9-.9-4.1-.5-1-.8-1.8-.8-2.9" />
      <path d="M9.3 13.5c0-.7.1-1.3.4-2" />
      <path d="M7.6 14.3c-.1-.8-.1-1.5.1-2.3" />
      <path d="M6 15.6c-.3-.7-.4-1.4-.4-2.1" />
      <path d="M11 20.5c-2.2.3-4-.2-5.4-1.5.3-1.2.4-2.3.2-3.4" />
      {/* Mano derecha, reflejo de la izquierda */}
      <path d="M13 20.5c0-1.7.2-2.9.9-4.1.5-1 .8-1.8.8-2.9" />
      <path d="M14.7 13.5c0-.7-.1-1.3-.4-2" />
      <path d="M16.4 14.3c.1-.8.1-1.5-.1-2.3" />
      <path d="M18 15.6c.3-.7.4-1.4.4-2.1" />
      <path d="M13 20.5c2.2.3 4-.2 5.4-1.5-.3-1.2-.4-2.3-.2-3.4" />
    </IconBase>
  );
}

/** Contacto: pin de ubicación con una cruz en el centro. */
export function IconContacto(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 21c-4-3.8-7-7.4-7-11.2A7 7 0 0 1 19 9.8C19 13.6 16 17.2 12 21Z" />
      <path d="M12 6.7v6" />
      <path d="M9.3 9.7h5.4" />
    </IconBase>
  );
}
