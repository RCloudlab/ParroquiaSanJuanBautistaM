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
