// Evangelio del día — fuente única para la sección del home (EvangelioDia.tsx)
// y la página de detalle (/evangelio, EvangelioPage.tsx).
//
// Para actualizarlo cada día basta editar este archivo:
//   - fecha:      en formato ISO (AAAA-MM-DD); se muestra formateada en español.
//   - imagen:     una obra de arte sacro acorde al evangelio del día. Para
//                 añadir una nueva: descarga el original a public/, agrégalo a
//                 scripts/optimize-images.mjs y corre `node scripts/optimize-images.mjs`.
//                 Usa solo obras de dominio público (Wikimedia Commons, Met Museum,
//                 Google Arts & Culture) y llena siempre el campo `credito`.
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
    /**
     * Autoría de la obra. Obligatorio ponerlo cuando la imagen viene de fuera
     * (museos, Wikimedia Commons): se muestra bajo la imagen en /evangelio.
     */
    credito?: string;
    /**
     * Enlace externo relacionado con el evangelio del día (la lectura en
     * vaticannews, un video, etc.). Si se define, la imagen del home lleva
     * ahí en vez de a /evangelio.
     */
    enlace?: string;
    /** Texto del distintivo que se muestra sobre la imagen enlazada. */
    enlaceTexto?: string;
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
  fecha: '2026-09-12',
  liturgia: 'Santísimo Nombre de María',
  titulo: 'Cada árbol se conoce por su fruto',
  referencia: 'Lucas 6, 43-49',
  cita: '«De lo que rebosa el corazón habla la boca.»',
  resumen:
    'Jesús nos enseña que la fe se reconoce por los frutos y que solo cimentar la vida ' +
    'sobre su palabra sostiene la casa cuando llega la tormenta.',
  imagen: {
    src: '/optimized/evangelio-sermon-montana-1377.webp',
    srcSet:
      '/optimized/evangelio-sermon-montana-480.webp 480w, ' +
      '/optimized/evangelio-sermon-montana-960.webp 960w, ' +
      '/optimized/evangelio-sermon-montana-1377.webp 1377w',
    alt: 'El Sermón de la Montaña, pintura de Carl Bloch (1877)',
    credito: 'Carl Bloch, «El Sermón de la Montaña» (1877) · Dominio público',
    enlace: 'https://www.vaticannews.va/es/evangelio-de-hoy.html',
    enlaceTexto: 'Evangelio de hoy en Vatican News',
  },
  // Coloca aquí la ruta del mp3 cuando esté grabado, p. ej.:
  // audio: '/audio/evangelio-2026-09-12.mp3',
  // autorAudio: 'P. [Nombre del párroco]',
  // duracionAudio: '5 min',
  texto: [
    'En aquel tiempo, Jesús dijo a sus discípulos: «No hay árbol bueno que dé fruto malo, ' +
      'ni árbol malo que dé fruto bueno. Cada árbol se conoce por su fruto: no se cosechan ' +
      'higos de las zarzas, ni se vendimian uvas de los espinos».',
    'El hombre bueno saca cosas buenas del tesoro bueno de su corazón, y el que es malo saca ' +
      'cosas malas del tesoro malo. Porque de lo que rebosa el corazón habla la boca.',
    '«¿Por qué me llaman "Señor, Señor", y no hacen lo que digo? Les voy a decir a quién se ' +
      'parece el que viene a mí y escucha mis palabras y las pone por obra: se parece a uno que ' +
      'edificaba una casa. Cavó, ahondó y puso los cimientos sobre roca. Vino una crecida, ' +
      'arremetió el río contra aquella casa y no pudo derribarla, porque estaba sólidamente ' +
      'construida».',
    '«Pero el que escucha y no pone por obra se parece a uno que edificó una casa sobre tierra, ' +
      'sin cimiento. Arremetió contra ella el río, y en seguida se derrumbó, y fue grande la ' +
      'ruina de aquella casa».',
  ],
  reflexion: [
    'Jesús habla de frutos y de cimientos, dos imágenes que cualquiera entiende. Nuestra fe no ' +
      'se mide por lo que decimos creer, sino por lo que va brotando de nosotros en el trato de ' +
      'todos los días: la paciencia con los de casa, la honradez en el trabajo, la palabra que ' +
      'levanta en lugar de herir.',
    '«De lo que rebosa el corazón habla la boca». Por eso importa tanto cuidar lo que guardamos ' +
      'dentro. Quien llena su corazón de oración, de perdón y de Evangelio, tarde o temprano lo ' +
      'reparte sin darse cuenta.',
    'Y está el cimiento. Las crecidas llegan a todas las casas: la enfermedad, las pérdidas, ' +
      'los años difíciles. La diferencia no está en librarse de ellas, sino en sobre qué estaba ' +
      'construida la vida. Hoy, que celebramos el Santísimo Nombre de María, pidámosle a ella —' +
      'que guardaba y meditaba la palabra en su corazón— que nos enseñe a cavar hondo.',
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
