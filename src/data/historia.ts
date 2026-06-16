// Fuente única de los hitos históricos de la parroquia, usada por la
// página /historia (src/pages/Historia.tsx).
//
// TODO: contenido real pendiente de la parroquia — los textos de abajo son
// placeholders de ejemplo (fechas y datos ilustrativos) para dar forma al
// diseño. Sustituir por la historia verídica de la Parroquia de San Juan
// Bautista de Maravatío antes de publicar.

export interface HitoHistorico {
  anio: string; // admite año puntual ("1850") o periodo ("Siglo XIX")
  titulo: string;
  descripcion: string;
}

export const HISTORIA: HitoHistorico[] = [
  {
    anio: 'Siglo XVI',
    titulo: 'Fundación de la parroquia',
    descripcion:
      'Los primeros misioneros establecen la parroquia dedicada a San Juan Bautista, levantando una capilla provisional que serviría de germen al templo actual.',
  },
  {
    anio: '1750 (aprox.)',
    titulo: 'Construcción del templo actual',
    descripcion:
      'Se erige la fachada de cantera que hoy conocemos, con su torre característica, gracias a las limosnas y el trabajo de la comunidad de Maravatío.',
  },
  {
    anio: 'Siglo XIX',
    titulo: 'Llegada de la Virgen de los Dolores',
    descripcion:
      'La imagen de Nuestra Señora de los Dolores es entronizada en el altar lateral derecho y, con el tiempo, es proclamada copatrona de la parroquia.',
  },
  {
    anio: '1930',
    titulo: 'Restauración tras los años difíciles',
    descripcion:
      'Tras un periodo de cierre y restricciones al culto, la comunidad restaura el templo y retoma con fuerza las celebraciones y procesiones tradicionales.',
  },
  {
    anio: 'Actualidad',
    titulo: 'Una comunidad viva',
    descripcion:
      'Hoy la parroquia continúa acompañando a las familias de Maravatío en cada sacramento, fiesta patronal y obra de caridad, fiel a su historia centenaria.',
  },
];
