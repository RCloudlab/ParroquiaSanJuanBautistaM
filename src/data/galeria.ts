// Fuente única de las fotos de la parroquia. Galeria.tsx (resumen en home) y
// GaleriaPage.tsx (página /galeria, grilla completa + lightbox) consumen
// este mismo array para no desincronizarse.
//
// Los anchos listados deben existir como public/optimized/<name>-<w>.webp
// (generados por scripts/optimize-images.mjs).

export interface FotoGaleria {
  name: string;
  widths: number[];
  alt: string;
  caption: string;
}

export const FOTOS: FotoGaleria[] = [
  {
    name: 'gallery2',
    widths: [480, 960, 1600, 2200],
    alt: 'Vista aérea de la Parroquia San Juan Bautista al atardecer',
    caption: 'Nuestra parroquia desde el cielo',
  },
  {
    name: 'interior',
    widths: [480, 960, 1280],
    alt: 'Interior de la parroquia durante celebración solemne',
    caption: 'Una celebración que ilumina el alma',
  },
  {
    name: 'gallery',
    widths: [480, 960, 1599],
    alt: 'Celebración especial en la parroquia',
    caption: 'Momentos de fe y comunidad',
  },
  {
    name: 'hero',
    widths: [480, 960, 1600, 2200],
    alt: 'Fachada de la Parroquia San Juan Bautista al atardecer',
    caption: 'La torre que guía a nuestra comunidad',
  },
  {
    name: 'san-juan',
    widths: [480, 961],
    alt: 'Imagen de San Juan Bautista, patrono de la parroquia',
    caption: 'San Juan Bautista, nuestro patrono',
  },
  {
    name: 'virgen',
    widths: [480, 780],
    alt: 'Nuestra Señora de los Dolores, copatrona de la parroquia',
    caption: 'Nuestra Señora de los Dolores',
  },
];
