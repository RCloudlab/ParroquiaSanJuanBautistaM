// Fuente única de los datos de cada sacramento/trámite parroquial.
// Sacramentos.tsx usa esto para las tarjetas de acceso en la home; Sacramento.tsx
// (página /sacramentos/:id) lo usa para la vista de detalle a página completa.

export interface RequisitoSacramento {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  requisitos: string[];
  notas?: string[];
  contacto: string;
}

export const REQUISITOS: RequisitoSacramento[] = [
  {
    id: 'bautizo',
    titulo: 'Bautismo',
    subtitulo: 'El primer sacramento de la vida cristiana',
    descripcion:
      'El bautismo incorpora al cristiano en la Iglesia y borra el pecado original. Celebramos el bautismo de infantes y adultos con toda la solemnidad que merece este sacramento.',
    requisitos: [
      'Solicitar cita en la notaría parroquial',
      'Carta de compromiso de los padres padrinos',
      'Fotocopia del acta de nacimiento del bautizando',
      'Asistir al curso prebautismal (2 sesiones)',
      'Al menos uno de los padres debe ser católico bautizado',
    ],
    notas: [
      'Los padrinos deben ser católicos practicantes, mayores de edad y con vida sacramental al día.',
    ],
    contacto: 'Notaría parroquial: Lun–Vie 9–14h',
  },
  {
    id: 'primera-comunion',
    titulo: 'Primera Comunión y Confirmación',
    subtitulo: 'Sacramentos de iniciación cristiana',
    descripcion:
      'La Primera Comunión y la Confirmación son sacramentos de madurez en la fe. La preparación catequética ayuda a los jóvenes a acoger el Espíritu Santo y comprometerse con la comunidad.',
    requisitos: [
      'Haber recibido el bautismo',
      'Inscripción en catequesis (inicio en octubre)',
      'Edad mínima: 8 años para Primera Comunión, 14 para Confirmación',
      'Asistencia regular a la Misa dominical',
      'Participar en las convivencias de preparación',
    ],
    contacto: 'Secretaría de catequesis: Sábados 10–12h',
  },
  {
    id: 'boda',
    titulo: 'Matrimonio',
    subtitulo: 'Sacramento del amor y la alianza',
    descripcion:
      'El matrimonio cristiano es un sacramento permanente y fructífero. Acompañamos a las parejas desde la preparación hasta la celebración de su Misa nupcial.',
    requisitos: [
      'Solicitar fecha con al menos 6 meses de antelación',
      'Ambos contrayentes bautizados en la Iglesia Católica',
      'Partidas de bautismo recientes (menos de 6 meses)',
      'Curso prematrimonial (obligatorio)',
      'DNI de los contrayentes y testigos',
    ],
    contacto: 'Notaría: con cita previa — cita@parroquiasjb.es',
  },
  {
    id: 'difuntos',
    titulo: 'Difuntos',
    subtitulo: 'Acompañamiento en el dolor y la esperanza',
    descripcion:
      'La Iglesia acompaña a las familias en el camino de despedida. Celebramos funerales, misas de aniversario y el sufragio por las almas del purgatorio.',
    requisitos: [
      'Contactar a la parroquia a la brevedad posible',
      'Certificado de defunción',
      'Indicar si se desea misa de cuerpo presente o posterior',
      'Se pueden solicitar misas de aniversario en cualquier momento',
    ],
    contacto: 'Urgencias: disponible las 24h — Tel. 900 000 000',
  },
  {
    id: 'notaria',
    titulo: 'Notaría Parroquial',
    subtitulo: 'Certificados y gestiones eclesiásticas',
    descripcion:
      'La notaría parroquial emite certificados de los sacramentos administrados en esta parroquia: bautismo, confirmación, matrimonio y defunción.',
    requisitos: [
      'Certificados de bautismo, confirmación y matrimonio',
      'Inscripciones marginales (matrimonio, confirmación)',
      'Certificados para procesos de nulidad matrimonial',
      'Solicitudes con DNI del interesado o familiar directo',
    ],
    contacto: 'Lun–Vie: 9:00–14:00 / 16:00–19:00 · Sáb: 9:00–13:00',
  },
];

export function getRequisito(id: string): RequisitoSacramento | undefined {
  return REQUISITOS.find(r => r.id === id);
}
