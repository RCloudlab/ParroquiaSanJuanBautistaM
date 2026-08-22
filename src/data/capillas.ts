export interface MisaCapilla {
  dia: string;
  hora: string;
}

export interface Capilla {
  id: string;
  nombre: string;
  santo: string;
  aniversario?: string;
  fiesta?: string;
  lugar: string;          // colonia / comunidad
  imagen: string;         // ruta en /public o /optimized
  misas: MisaCapilla[];
  historia: string[];     // párrafos
}

export const CAPILLAS: Capilla[] = [
  {
    id: 'capilla-purisima',
    nombre: 'Capilla de la Purísima Concepción',
    santo: 'Capilla Expiatoria',
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
    santo: 'San Nicolás Tolentino',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-balbuena',
    nombre: 'Capilla de Balbuena',
    santo: 'Sagrado Corazón de María',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-cristo-rey',
    nombre: 'Capilla de Cristo Rey',
    santo: 'Cristo Rey',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-senor-de-la-columna',
    nombre: 'Capilla del Señor de la Columna',
    santo: 'Señor de la Columna',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-francisco-i-madero',
    nombre: 'Capilla de Francisco I. Madero',
    santo: 'Por definir',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-san-isidro',
    nombre: 'Capilla de San Isidro',
    santo: 'San Isidro Labrador',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-5-de-mayo',
    nombre: 'Capilla 5 de Mayo',
    santo: 'Santo Niño',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-del-aguaje',
    nombre: 'Capilla del Aguaje',
    santo: 'Inmaculada Concepción',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-apeo',
    nombre: 'Capilla de Apeo',
    santo: 'Virgen de Guadalupe',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-del-aserradero',
    nombre: 'Capilla del Aserradero',
    santo: 'La Presentación del Señor',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-campo-hermoso',
    nombre: 'Capilla de Campo Hermoso',
    santo: 'Virgen de Guadalupe',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-cebadillas-i',
    nombre: 'Capilla de Cebadillas I',
    santo: 'San José',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-cebadillas-ii',
    nombre: 'Capilla de Cebadillas II',
    santo: 'Virgen de Guadalupe',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-del-colorado',
    nombre: 'Capilla del Colorado',
    santo: 'La Presentación del Señor',
    aniversario: '23 de octubre',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-la-coyota',
    nombre: 'Capilla de la Coyota',
    santo: 'Sagrado Corazón de Jesús',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-guapamacataro-arriba',
    nombre: 'Capilla de Guapamacataro (arriba)',
    santo: 'Señor de la Misericordia',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-guapamacataro-abajo',
    nombre: 'Capilla de Guapamacataro (abajo)',
    santo: 'Cristo de Guapamacataro',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-lagunillas',
    nombre: 'Capilla de Lagunillas',
    santo: 'Santa Teresita del Niño Jesús',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-llano-grande',
    nombre: 'Capilla de Llano Grande',
    santo: 'Virgen de Ocotlán',
    fiesta: '17 de mayo',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-la-huerta',
    nombre: 'Capilla de la Huerta',
    santo: 'San Isidro Labrador',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-del-jaguey',
    nombre: 'Capilla del Jaguey',
    santo: 'Virgen de Guadalupe',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-la-nopalera',
    nombre: 'Capilla de la Nopalera',
    santo: 'Virgen de Guadalupe',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-pomoca',
    nombre: 'Capilla de Pomoca',
    santo: 'Virgen del Carmen',
    aniversario: '15 de julio',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-santa-ana',
    nombre: 'Capilla de Santa Ana',
    santo: 'Santa Ana',
    aniversario: '17 de julio',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-santa-elena',
    nombre: 'Capilla de Santa Elena',
    santo: 'Nuestra Señora del Rosario',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-san-miguel-el-alto',
    nombre: 'Capilla de San Miguel el Alto',
    santo: 'San Miguel Arcángel',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-santo-nino',
    nombre: 'Capilla de Santo Niño',
    santo: 'Santo Niño',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-san-ramon',
    nombre: 'Capilla de San Ramón',
    santo: 'San Ramón Nonato',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-del-tejero',
    nombre: 'Capilla del Tejero',
    santo: 'Virgen de Guadalupe',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-tenerias',
    nombre: 'Capilla de Tenerías',
    santo: 'Virgen de Guadalupe',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-toluquilla',
    nombre: 'Capilla de Toluquilla',
    santo: 'Virgen de Guadalupe',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
    ],
    historia: [
      'Información histórica de esta capilla pendiente de proporcionar por la parroquia.',
      'Cuando tengas los datos reales, envíalos y los actualizamos en el sistema.',
    ],
  },
  {
    id: 'capilla-de-torre-blanca',
    nombre: 'Capilla de Torre Blanca',
    santo: 'Virgen de Guadalupe',
    lugar: '[Colonia / Comunidad] · Por Definir',
    imagen: '/optimized/parroquia_post_060706.png',
    misas: [
      { dia: 'Por definir', hora: '00:00 aa' },
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
