export interface MisaCapilla {
  dia: string;
  hora: string;
}

export interface Capilla {
  id: string;
  nombre: string;
  lugar: string;          // colonia / comunidad
  imagen: string;         // ruta en /public o /optimized
  misas: MisaCapilla[];
  historia: string[];     // párrafos
}

export const CAPILLAS: Capilla[] = [
  {
    id: 'capilla-purisima',
    nombre: 'Capilla de la Purísima Concepción',
    lugar: 'Centro Histórico, Maravatío, Mich.',
    imagen: '/optimized/interior-960.webp',
    misas: [
      { dia: 'Sábado',  hora: '12:00 md' },
      { dia: 'Domingo', hora: '12:00 md' },
    ],
    historia: [
      'La Capilla de la Purísima Concepción se encuentra en el corazón del centro histórico de Maravatío y forma parte del conjunto parroquial de San Juan Bautista desde sus primeros años de fundación.',
      'Es el espacio donde se celebran los bautismos de la parroquia cada sábado y domingo a las 12:00 del mediodía, siendo testigo de la incorporación de nuevos fieles a la comunidad cristiana.',
      'Su arquitectura colonial conserva elementos originales que la convierten en un patrimonio cultural y espiritual invaluable para los feligreses de Maravatío y la región.',
    ],
  },

  {
    id: 'capilla-san-nicolas',
    nombre: 'Capilla de San Nicolás',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-balbuena',
    nombre: 'Capilla de Balbuena',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-balbuena',
    nombre: 'Capilla de Balbuena',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-cristo-rey',
    nombre: 'Capilla de Cristo Rey',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  
  {
    id: 'capilla-senor-de-la-columna',
    nombre: 'Capilla del Señor de la Columna',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-francisco-i-madero',
    nombre: 'Capilla de Francisco I. Madero',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-san-isidro',
    nombre: 'Capilla de San Isidro',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-5-de-mayo',
    nombre: 'Capilla 5 de Mayo',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-del-aguaje',
    nombre: 'Capilla del Aguaje',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-apeo',
    nombre: 'Capilla de Apeo',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-del-aserradero',
    nombre: 'Capilla del Aserradero',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-campo-hermoso',
    nombre: 'Capilla de Campo Hermoso',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-cebadillas-i',
    nombre: 'Capilla de Cebadillas I',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-cebadillas-ii',
    nombre: 'Capilla de Cebadillas II',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-del-colorado',
    nombre: 'Capilla del Colorado',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-la-coyota',
    nombre: 'Capilla de la Coyota',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-guapamacataro-arriba',
    nombre: 'Capilla de Guapamacataro (arriba)',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-guapamacataro-abajo',
    nombre: 'Capilla de Guapamacataro (abajo)',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-lagunillas',
    nombre: 'Capilla de Lagunillas',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-llano-grande',
    nombre: 'Capilla de Llano Grande',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-la-huerta',
    nombre: 'Capilla de la Huerta',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-del-jaguey',
    nombre: 'Capilla del Jaguey',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-la-nopalera',
    nombre: 'Capilla de la Nopalera',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-pomoca',
    nombre: 'Capilla de Pomoca',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-santa-ana',
    nombre: 'Capilla de Santa Ana',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-santa-elena',
    nombre: 'Capilla de Santa Elena',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-san-miguel-el-alto',
    nombre: 'Capilla de San Miguel el Alto',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-santo-nino',
    nombre: 'Capilla de Santo Niño',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-san-ramon',
    nombre: 'Capilla de San Ramón',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-del-tejero',
    nombre: 'Capilla del Tejero',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-tenerias',
    nombre: 'Capilla de Tenerías',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-toluquilla',
    nombre: 'Capilla de Toluquilla',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

  {
    id: 'capilla-de-torre-blanca',
    nombre: 'Capilla de Torre Blanca',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },




  {
    id: 'capilla-ejemplo',
    nombre: 'Capilla de [Nombre pendiente]',
    lugar: '[Colonia / Comunidad] · Maravatío, Mich.',
    imagen: '/optimized/gallery2-960.webp',
    misas: [
      { dia: 'Domingo', hora: '10:00 am' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },

];

export function getCapilla(id: string): Capilla | undefined {
  return CAPILLAS.find(c => c.id === id);
}
