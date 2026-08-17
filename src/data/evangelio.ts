// Evangelio del día — fuente única para la sección del home (EvangelioDia.tsx)
// y la página de detalle (/evangelio, EvangelioPage.tsx).
//
// Para actualizarlo cada día basta editar este archivo:
//   - fecha:      en formato ISO (AAAA-MM-DD); se muestra formateada en español.
//   - imagen:     cualquier foto de public/optimized (o una nueva).
//   - audio:      opcional. Coloca un mp3 en public/audio/ y pon aquí la ruta,
//                 p. ej. '/audio/evangelio-2026-08-16.mp3'. Si se omite, la
//                 sección simplemente no muestra el reproductor.

export interface EvangelioDelDia {
  fecha: string;
  liturgia: string;
  titulo: string;
  referencia: string;
  /** Frase breve del evangelio, para destacar sobre la imagen. */
  cita: string;
  /** Resumen corto que aparece en la sección del home. */
  resumen: string;
  imagen: { src: string; alt: string };
  audio?: string;
  /** Texto completo del evangelio, un párrafo por elemento. */
  texto: string[];
  /** Reflexión o meditación, un párrafo por elemento. */
  reflexion: string[];
}

export const EVANGELIO_HOY: EvangelioDelDia = {
  fecha: '2026-08-16',
  liturgia: 'Domingo XX del Tiempo Ordinario',
  titulo: 'Mujer, qué grande es tu fe',
  referencia: 'Mateo 15, 21-28',
  cita: '«Mujer, qué grande es tu fe: que se cumpla lo que deseas.»',
  resumen:
    'Una madre no se cansa de suplicar a Jesús por su hija, y su fe lo alcanza todo. ' +
    'La oración perseverante siempre toca el corazón de Dios.',
  imagen: {
    src: '/optimized/interior-960.webp',
    alt: 'Interior de la Parroquia San Juan Bautista durante una celebración',
  },
  texto: [
    'En aquel tiempo, Jesús se retiró a la comarca de Tiro y Sidón. Entonces una mujer ' +
      'cananea, saliendo de uno de aquellos lugares, se puso a gritar: «Ten compasión de mí, ' +
      'Señor, Hijo de David. Mi hija tiene un demonio muy malo».',
    'Él no le respondió nada. Entonces los discípulos se acercaron a decirle: «Atiéndela, ' +
      'que viene detrás gritando». Él les contestó: «Solo he sido enviado a las ovejas ' +
      'descarriadas de Israel».',
    'Ella los alcanzó y se postró ante él, diciendo: «Señor, ayúdame». Él le contestó: ' +
      '«No está bien tomar el pan de los hijos y echárselo a los perritos». Pero ella repuso: ' +
      '«Tienes razón, Señor; pero también los perritos se comen las migajas que caen de la ' +
      'mesa de los amos».',
    'Jesús le respondió: «Mujer, qué grande es tu fe: que se cumpla lo que deseas». ' +
      'En aquel momento quedó curada su hija.',
  ],
  reflexion: [
    'La mujer cananea no pertenecía al pueblo de Israel y, sin embargo, se convirtió en ' +
      'maestra de fe para los propios discípulos. No se ofendió ante el silencio de Jesús ni ' +
      'ante la aparente dureza de sus palabras: insistió con humildad, porque sabía que en él ' +
      'había misericordia para todos.',
    'Cuántas veces nos cansamos de pedir, o sentimos que Dios guarda silencio. Este evangelio ' +
      'nos recuerda que la oración perseverante nunca cae en el vacío. Dios escucha siempre, y ' +
      'a veces su silencio es una invitación a confiar más profundamente.',
    'Pidamos hoy la fe de esta madre: una fe que no se rinde, que suplica por los que ama y ' +
      'que reconoce en Jesús al único que puede sanar y salvar.',
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
