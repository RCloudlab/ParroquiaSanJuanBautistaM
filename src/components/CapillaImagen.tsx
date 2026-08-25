import { Camera } from 'lucide-react';
import type { Capilla } from '../data/capillas';

const FACEBOOK_URL = 'https://www.facebook.com/ParroquiaSanJuanBautistaMaravatioMich';

/**
 * Una capilla "sin foto propia" es la que aún usa el logotipo de la parroquia
 * como relleno. Mientras la comunidad no mande una fotografía real, en vez de
 * repetir el logo se muestra un marcador que invita a aportarla.
 */
export function faltaFoto(capilla: Capilla): boolean {
  return capilla.imagen.includes('parroquia_post_060706');
}

type Props = {
  capilla: Capilla;
  /** En el modal el marcador puede enlazar a Facebook; en la tarjeta no
   *  (la tarjeta entera ya es un botón que abre el modal). */
  enlazable?: boolean;
};

export default function CapillaImagen({ capilla, enlazable = false }: Props) {
  if (!faltaFoto(capilla)) {
    return (
      <div className="capillas__img-wrap">
        <img
          src={capilla.imagen}
          alt={capilla.nombre}
          className="capillas__img"
          loading="lazy"
          decoding="async"
        />
        <div className="capillas__img-overlay" />
      </div>
    );
  }

  const contenido = (
    <>
      <Camera size={30} className="capillas__sinfoto-icono" aria-hidden="true" />
      <span className="capillas__sinfoto-titulo">Aún nos falta esta imagen</span>
      <span className="capillas__sinfoto-cta">
        {enlazable ? 'Compártenos alguna por Facebook' : 'Compártenos alguna'}
      </span>
    </>
  );

  return (
    <div className="capillas__img-wrap capillas__img-wrap--sinfoto">
      {enlazable ? (
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="capillas__sinfoto"
          title={`Enviar una fotografía de ${capilla.nombre} por Facebook`}
        >
          {contenido}
        </a>
      ) : (
        <div className="capillas__sinfoto">{contenido}</div>
      )}
    </div>
  );
}
