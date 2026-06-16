// Contenido ampliado para la página /virgen-de-los-dolores. La sección
// resumen en home (src/sections/VirgenDolores.tsx) mantiene su propio
// contenido corto; esta fuente alimenta solo la página de detalle
// (src/pages/VirgenDoloresPage.tsx).
//
// TODO: contenido real pendiente de la parroquia — historia, novena y
// horarios de abajo son placeholders de ejemplo para dar forma al diseño.
// Sustituir por los textos verídicos de la devoción en la Parroquia de San
// Juan Bautista antes de publicar.

export const HISTORIA_DEVOCION: string[] = [
  'La devoción a Nuestra Señora de los Dolores llega a la parroquia en el siglo XIX, cuando la comunidad decide entronizar una imagen de la Virgen contemplando la Pasión de su Hijo en el altar lateral derecho del templo.',
  'Con el paso de los años, la imagen se convirtió en una de las devociones más queridas de Maravatío, y la parroquia la proclamó copatrona, junto a San Juan Bautista, por el consuelo que su intercesión ha traído a generaciones de familias en momentos de dolor y prueba.',
  'Cada 15 de septiembre, fecha en que la Iglesia universal celebra a la Virgen de los Dolores, la comunidad entera se vuelca en su honor con novena, triduo solemne y procesión, renovando un vínculo de fe que ya tiene más de un siglo.',
];

export interface DiaNovena {
  dia: number;
  titulo: string;
  texto: string;
}

export const NOVENA: DiaNovena[] = [
  { dia: 1, titulo: 'La profecía de Simeón', texto: 'Oremos por las familias que hoy reciben una noticia dolorosa, para que encuentren en María consuelo y fortaleza.' },
  { dia: 2, titulo: 'La huida a Egipto', texto: 'Oremos por los migrantes y desplazados, para que no les falte un hogar que los acoja.' },
  { dia: 3, titulo: 'La pérdida del Niño Jesús en el Templo', texto: 'Oremos por los padres que buscan a sus hijos alejados de la fe.' },
  { dia: 4, titulo: 'El encuentro con Jesús camino del Calvario', texto: 'Oremos por quienes cargan una cruz pesada en este momento de su vida.' },
  { dia: 5, titulo: 'La Crucifixión y muerte de Jesús', texto: 'Oremos por los enfermos y los que acompañan a un ser querido en su última hora.' },
  { dia: 6, titulo: 'El descendimiento de la Cruz', texto: 'Oremos por quienes han perdido la esperanza, para que no se sientan solos.' },
  { dia: 7, titulo: 'La sepultura de Jesús', texto: 'Oremos por nuestros difuntos y por la paz eterna de sus almas.' },
  { dia: 8, titulo: 'María, Madre de la Iglesia', texto: 'Oremos por la unidad de nuestra comunidad parroquial.' },
  { dia: 9, titulo: 'María, Reina de los Mártires', texto: 'Oremos pidiendo la fortaleza para perseverar en la fe hasta el final.' },
];

export interface CultoVirgen {
  dia: string;
  horario: string;
}

export const CULTOS: CultoVirgen[] = [
  { dia: 'Viernes de Cuaresma', horario: '18:30 — Rosario de los Siete Dolores' },
  { dia: '6 al 14 de septiembre', horario: '19:00 — Novena en su honor' },
  { dia: '14 de septiembre', horario: '20:00 — Triduo solemne / Vigilia' },
  { dia: '15 de septiembre', horario: '11:00 — Misa solemne · 19:30 — Procesión' },
  { dia: 'Resto del año', horario: 'Capilla abierta en horario de misas (ver Horarios)' },
];

export interface FotoVirgen {
  name: string;
  width: number;
  alt: string;
  caption: string;
}

export const GALERIA_VIRGEN: FotoVirgen[] = [
  { name: 'virgen', width: 780, alt: 'Imagen de Nuestra Señora de los Dolores en el altar lateral', caption: 'En su altar, presidiendo la nave lateral' },
  { name: 'interior', width: 1280, alt: 'Interior de la parroquia durante una celebración', caption: 'Celebración solemne en su honor' },
  { name: 'gallery', width: 1599, alt: 'Comunidad reunida en celebración', caption: 'La comunidad reunida en oración' },
];
