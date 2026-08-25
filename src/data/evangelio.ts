// Evangelio del día — fuente única para la sección del home (EvangelioDia.tsx)
// y la página de detalle (/evangelio, EvangelioPage.tsx).
//
// Para actualizarlo cada día basta editar este archivo:
//   - fecha:      en formato ISO (AAAA-MM-DD); se muestra formateada en español.
//   - imagen:     cualquier foto de public/optimized (o una nueva).
//   - audio:      opcional. Sube el mp3 a public/audio/ y pon aquí la ruta,
//                 p. ej. '/audio/evangelio-2026-08-24.mp3'. Si se omite, la
//                 página muestra el texto sin reproductor.
//   - autorAudio: quién graba la reflexión (aparece bajo el reproductor).

export interface EvangelioDelDia {
  fecha: string;
  liturgia: string;
  titulo: string;
  referencia: string;
  /** Frase breve del evangelio, para destacar sobre la imagen. */
  cita: string;
  /** Resumen corto que aparece en la sección del home. */
  resumen: string;
  imagen: {
    src: string;
    alt: string;
    /** Opcional: variantes por ancho para no cargar la grande en móvil. */
    srcSet?: string;
  };
  audio?: string;
  /** Quién graba la reflexión en audio, p. ej. 'P. José Martínez'. */
  autorAudio?: string;
  /** Duración aproximada del audio, p. ej. '4 min'. */
  duracionAudio?: string;
  /** Texto completo del evangelio, un párrafo por elemento. */
  texto: string[];
  /** Reflexión o meditación, un párrafo por elemento. */
  reflexion: string[];
}

export const EVANGELIO_HOY: EvangelioDelDia = {
  fecha: '2026-08-24',
  liturgia: 'Fiesta de San Bartolomé, Apóstol',
  titulo: 'Ahí tienes a un israelita de verdad',
  referencia: 'Juan 1, 45-51',
  cita: '«Verán el cielo abierto y a los ángeles de Dios subir y bajar sobre el Hijo del hombre.»',
  resumen:
    'Felipe invita a Natanael a acercarse y comprobarlo por sí mismo. Jesús lo mira, lo ' +
    'conoce por dentro y despierta en él una fe que llegará hasta el cielo abierto.',
  imagen: {
    src: '/optimized/gallery-1599.webp',
    srcSet:
      '/optimized/gallery-480.webp 480w, /optimized/gallery-960.webp 960w, ' +
      '/optimized/gallery-1599.webp 1599w',
    alt: 'Puertas del templo abriéndose con una cruz de luz al fondo',
  },
  // Coloca aquí la ruta del mp3 cuando esté grabado, p. ej.:
  // audio: '/audio/evangelio-2026-08-24.mp3',
  // autorAudio: 'P. [Nombre del párroco]',
  // duracionAudio: '5 min',
  texto: [
    'En aquel tiempo, Felipe encontró a Natanael y le dijo: «Hemos encontrado a aquel de ' +
      'quien escribió Moisés en la Ley y también los profetas: a Jesús, hijo de José, de Nazaret».',
    'Natanael le replicó: «¿De Nazaret puede salir algo bueno?». Felipe le contestó: ' +
      '«Ven y verás».',
    'Vio Jesús que se acercaba Natanael y dijo de él: «Ahí tienes a un israelita de verdad, ' +
      'en quien no hay engaño». Natanael le contesta: «¿De qué me conoces?». Jesús le responde: ' +
      '«Antes de que Felipe te llamara, cuando estabas debajo de la higuera, te vi».',
    'Natanael respondió: «Rabí, tú eres el Hijo de Dios, tú eres el Rey de Israel». ' +
      'Jesús le contestó: «¿Por haberte dicho que te vi debajo de la higuera, crees? ' +
      'Has de ver cosas mayores». Y le añadió: «En verdad, en verdad les digo: verán el cielo ' +
      'abierto y a los ángeles de Dios subir y bajar sobre el Hijo del hombre».',
  ],
  reflexion: [
    'Natanael comienza con un prejuicio: «¿De Nazaret puede salir algo bueno?». No pretende ' +
      'ser mejor de lo que es, y quizá por eso Jesús lo llama «israelita de verdad, en quien no ' +
      'hay engaño». Dios no necesita que lleguemos perfectos; le basta que lleguemos sinceros.',
    'La respuesta de Felipe es la mejor catequesis posible: «Ven y verás». No discute ni ' +
      'argumenta, invita a hacer la experiencia. Así se transmite la fe en una familia y en una ' +
      'comunidad: no convenciendo con palabras, sino acercando a las personas a Cristo.',
    'Y entonces sucede lo decisivo: Jesús lo había visto antes, bajo la higuera, cuando nadie ' +
      'lo miraba. También a nosotros nos conoce en lo escondido de nuestra vida. San Bartolomé ' +
      'dio la vida por aquel que lo miró primero; pidamos hoy esa misma valentía sencilla.',
  ],
};

/** Fecha del evangelio formateada en español, p. ej. «domingo 16 de agosto de 2026». */
export function fechaEvangelio(): string {
  const [y, m, d] = EVANGELIO_HOY.fecha.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
