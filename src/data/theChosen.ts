// Datos del evento especial "The Chosen — Temporada 6, acceso anticipado"
// (página /eventos/the-chosen). Todo lo que podría cambiar (fecha, hora,
// lugar, enlaces) vive aquí para no tener que tocar el componente.

export const FACEBOOK_URL = 'https://www.facebook.com/ParroquiaSanJuanBautistaMaravatioMich';
/** Abre directamente el chat de Messenger con la página de la parroquia. */
export const MESSENGER_URL = 'https://m.me/ParroquiaSanJuanBautistaMaravatioMich';

/** Inicio de la proyección. Maravatío usa la hora del centro (UTC-6, sin
 *  horario de verano desde 2022), por eso el desfase va fijo en la cadena. */
export const INICIO = new Date('2026-10-11T19:30:00-06:00');
/** Fin estimado: marca cuándo dejar de anunciar el evento como "próximo". */
export const FIN = new Date('2026-10-11T21:30:00-06:00');

export const DETALLES = {
  fecha: 'Domingo 11 de octubre',
  hora: '7:30 p.m.',
};

export const PASOS_BOLETO = [
  { icono: 'mensaje', titulo: 'Escríbenos por Facebook' },
  { icono: 'numero', titulo: 'Recibe tu número' },
  { icono: 'boleto', titulo: 'Preséntalo en el atrio' },
] as const;

export const RECOMENDACIONES = [
  { icono: 'reloj', titulo: 'Llega temprano', texto: 'Asegura buen lugar.' },
  { icono: 'frio', titulo: 'Abrígate', texto: 'Es al aire libre.' },
  { icono: 'boleto', titulo: 'Trae tu boleto', texto: 'Es tu entrada.' },
  { icono: 'familia', titulo: 'Invita a tu familia', texto: 'Vívanlo juntos.' },
] as const;

/** Teaser oficial de la Temporada 6, publicado por el canal oficial de
 *  Prime Video (27 jul 2026). Para cambiarlo (p. ej. por uno en español de
 *  un canal oficial) basta con reemplazar el ID del video de YouTube. */
export const TRAILER = {
  youtubeId: 'Vk3pgmu0zZA',
  titulo: 'The Chosen Temporada 6: teaser oficial',
  fuente: 'Prime Video',
};

export type RedId = 'web' | 'youtube' | 'instagram' | 'facebook' | 'tiktok' | 'x';

/** Redes oficiales de la serie, tomadas del pie de página de thechosen.tv. */
export const REDES: { id: RedId; nombre: string; usuario: string; url: string; color: string }[] = [
  { id: 'web', nombre: 'Sitio oficial', usuario: 'thechosen.tv', url: 'https://thechosen.tv/en-us', color: '#d9c08a' },
  { id: 'youtube', nombre: 'YouTube', usuario: '@TheChosenSeries', url: 'https://www.youtube.com/@TheChosenSeries', color: '#ff3d3d' },
  { id: 'instagram', nombre: 'Instagram', usuario: '@thechosentv', url: 'https://www.instagram.com/thechosentv', color: '#e1306c' },
  { id: 'facebook', nombre: 'Facebook', usuario: 'Inside The Chosen', url: 'https://www.facebook.com/InsideTheChosen', color: '#4b8ff5' },
  { id: 'tiktok', nombre: 'TikTok', usuario: '@thechosentv', url: 'https://www.tiktok.com/@thechosentv', color: '#25f4ee' },
  { id: 'x', nombre: 'X (Twitter)', usuario: '@thechosentv', url: 'https://twitter.com/thechosentv', color: '#e9e2d4' },
];

/** App oficial de The Chosen, para ver las temporadas anteriores. */
export const APP = {
  android: 'https://play.google.com/store/apps/details?id=net.comeandsee.thechosen',
  ios: 'https://apps.apple.com/us/app/the-chosen/id6443956656',
};

/** Marca de sessionStorage: la intro de cine ya se vio en esta sesión. */
export const CLAVE_INTRO = 'chosen-intro-vista';

/** ¿Toca mostrar la intro de cine? Solo una vez por sesión y nunca con
 *  "reducir movimiento" activado. */
export function debeMostrarIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem(CLAVE_INTRO) !== '1';
  } catch {
    return false;
  }
}
