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
      'El bautismo incorpora al cristiano en la Iglesia y borra el pecado original. En la Parroquia San Juan Bautista de Maravatío celebramos el bautismo los sábados y domingos a las 12:00 md en la Capilla de la Purísima. Presentar todo en copia.',
    requisitos: [
      'Acta de nacimiento del niño o niña (de 0 a 6 años)',
      'Credencial de elector de los papás; si son menores de edad, carta de identidad',
      'Boleta de Matrimonio por la Iglesia de los papás, si están casados',
      'Boleta de Matrimonio por la Iglesia de los padrinos',
      'Boleta de Confirmación reciente del padrino o madrina, si es soltero(a) — solo es una persona que no viva en unión libre ni esté casado(a) por el civil',
      'Comprobante de plática pre-bautismal de papás y padrinos vigente (si no tienen, se les programará)',
      'Realizar el pago de la boleta el día del registro',
      'La documentación debe entregarse el mes anterior al Bautismo',
    ],
    notas: [
      'No hay padrinos ausentes ni representantes.',
      'Los bautismos se celebran sábados y domingos a las 12:00 md en la Capilla de la Purísima.',
      'Si pertenecen a otra parroquia: traer permiso expedido por el Párroco con vigencia no mayor de un mes, y comprobantes de plática de papás y padrinos vigente.',
    ],
    contacto: 'Notaría Parroquial: Mar–Vie 9:00–14:00 / 16:00–19:00 · Sáb: 9:00–13:00 · Dom: 10:00–14:00',
  },
  {
    id: 'primera-comunion',
    titulo: 'Primera Comunión',
    subtitulo: 'Sacramento de la Eucaristía',
    descripcion:
      'La Primera Comunión es el sacramento por el que el fiel recibe por primera vez el Cuerpo y la Sangre de Cristo. Presentar todo en copia.',
    requisitos: [
      'Boleta de Bautismo',
      'Acta de nacimiento del niño o niña',
      'Credencial de elector de los papás; si son menores de edad, carta de identidad',
      'Boleta de Matrimonio por la Iglesia de los papás, si están casados',
      'Boleta de Matrimonio por la Iglesia de los padrinos',
      'Boleta de Confirmación reciente del padrino o madrina, si es soltero(a) — solo es una persona que no viva en unión libre ni esté casado(a) por el civil',
      'Comprobante de plática pre-bautismal de papás y padrinos vigente (si no tienen, se les programará)',
      'Realizar el pago de la boleta el día del registro',
      'La documentación debe entregarse el mes anterior a la celebración',
    ],
    notas: [
      'No hay padrinos ausentes ni representantes.',
      'Si pertenecen a otra parroquia: traer permiso expedido por el Párroco con vigencia no mayor de un mes.',
    ],
    contacto: 'Notaría Parroquial: Mar–Vie 9:00–14:00 / 16:00–19:00 · Sáb: 9:00–13:00 · Dom: 10:00–14:00',
  },
  {
    id: 'confirmacion',
    titulo: 'Confirmación',
    subtitulo: 'Sacramento del Espíritu Santo',
    descripcion:
      'La Confirmación perfecciona la gracia bautismal y fortalece al cristiano con los dones del Espíritu Santo para vivir y defender la fe. Presentar todo en copia.',
    requisitos: [
      'Boleta de Primera Comunión',
      'Acta de nacimiento',
      'Credencial de elector de los papás; si son menores de edad, carta de identidad',
      'Boleta de Matrimonio por la Iglesia de los papás, si están casados',
      'Boleta de Matrimonio por la Iglesia de los padrinos',
      'Boleta de Confirmación reciente del padrino o madrina, si es soltero(a) — solo es una persona que no viva en unión libre ni esté casado(a) por el civil',
      'Comprobante de plática de papás y padrinos vigente (si no tienen, se les programará)',
      'Realizar el pago de la boleta el día del registro',
      'La documentación debe entregarse el mes anterior a la celebración',
    ],
    notas: [
      'No hay padrinos ausentes ni representantes.',
      'Si pertenecen a otra parroquia: traer permiso expedido por el Párroco con vigencia no mayor de un mes.',
    ],
    contacto: 'Notaría Parroquial: Mar–Vie 9:00–14:00 / 16:00–19:00 · Sáb: 9:00–13:00 · Dom: 10:00–14:00',
  },
  {
    id: 'boda',
    titulo: 'Matrimonio',
    subtitulo: 'Sacramento del amor y la alianza',
    descripcion:
      'El matrimonio cristiano es un sacramento permanente. Acompañamos a las parejas desde la preparación hasta la celebración de su Misa nupcial en la Parroquia San Juan Bautista de Maravatío.',
    requisitos: [
      '1. Reservar la fecha con 6 meses de anticipación presentando boletas de: Bautismo, Primera Comunión, Confirmación, Credencial de elector vigente, Acta de Matrimonio por el civil (si ya se casaron). Con el 50% de anticipo del estipendio de la Misa',
      '2. Solicitar 3 meses antes de la boda la Presentación Matrimonial en la Notaría Parroquial: presentar boletas de Bautismo, Primera Comunión y Confirmación de los contrayentes',
      '3. El día de la Presentación Matrimonial traer: boletas de Bautismo, Primera Comunión y Confirmación de los contrayentes · Fotografías tamaño infantil recientes (no instantáneas) · Dos testigos por cada contrayente · Credencial de elector de contrayentes y testigos · Acta de Matrimonio civil · Si algún contrayente es viudo o divorciado por el civil, presentar el acta correspondiente (indispensable) · El estipendio de la Presentación Matrimonial es $350.00',
      '4. Asistir a Catequesis Pre-Matrimonial (primer y segundo domingo de mes) — Cooperación $150.00 por pareja, en el Salón Parroquial de 9:00 am a 2:00 pm',
      '5. Entregar el Rezo 15 días antes de la boda en la Notaría Parroquial, de martes a sábado por la tarde',
      '6. Presentar Boleta de Matrimonio por la Iglesia de los Padrinos de Velación',
      '7. Haber cubierto el estipendio total de la celebración de la Misa 15 días antes',
    ],
    notas: [
      'No pueden contraer matrimonio menores de edad.',
      'No hay padrinos ausentes ni representantes.',
      'Si no se cumplen todos los requisitos, no se celebrará el Matrimonio.',
    ],
    contacto: 'Notaría Parroquial: Mar–Vie 9:00–14:00 / 16:00–19:00 · Sáb: 9:00–13:00 · Dom: 10:00–14:00',
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
    contacto: 'Tel. 447 478 2005 · Notaría Parroquial: Mar–Vie 9:00–14:00 / 16:00–19:00',
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
      'Solicitudes con identificación oficial del interesado o familiar directo',
    ],
    notas: [
      'Lunes: no hay servicio.',
    ],
    contacto: 'Mar–Vie: 9:00–14:00 / 16:00–19:00 · Sáb: 9:00–13:00 · Dom: 10:00–14:00 · Tel. 447 478 2005',
  },
];

export function getRequisito(id: string): RequisitoSacramento | undefined {
  return REQUISITOS.find(r => r.id === id);
}
