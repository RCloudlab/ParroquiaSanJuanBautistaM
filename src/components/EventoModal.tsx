import { useState } from 'react';
import { Clock, MapPin, X, Maximize2 } from 'lucide-react';
import type { EventoRow } from '../lib/database.types';
import ImagenZoom from './ImagenZoom';

const TIPO_COLORS: Record<string, string> = {
  especial: 'var(--gold-mid)',
  liturgico: 'var(--terracotta)',
  pastoral: 'var(--red-mid)',
  social: 'var(--teal-zocalo)',
  cultural: 'var(--purple-sorrow)',
};

const TIPO_LABELS: Record<string, string> = {
  especial: 'Patronal',
  liturgico: 'Litúrgico',
  pastoral: 'Pastoral',
  social: 'Social',
  cultural: 'Cultural',
};

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function fechaLarga(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} de ${MESES[(m - 1 + 12) % 12]} de ${y}`;
}

interface Props {
  evento: EventoRow;
  onCerrar: () => void;
}

type Orientacion = 'horizontal' | 'vertical' | null;

/** Modal con el detalle completo de un evento; se abre al hacer clic en su tarjeta. */
export default function EventoModal({ evento, onCerrar }: Props) {
  const color = TIPO_COLORS[evento.tipo] ?? TIPO_COLORS.pastoral;
  // Se detecta con las dimensiones reales de la imagen ya cargada, para que
  // una foto vertical (más alta que ancha) se muestre completa en vez de
  // recortada como si fuera un banner horizontal.
  const [orientacion, setOrientacion] = useState<Orientacion>(null);
  const [zoomAbierto, setZoomAbierto] = useState(false);

  return (
    <div className="evento-modal__overlay" onClick={onCerrar}>
      <div
        className={`evento-modal${orientacion === 'vertical' ? ' evento-modal--vertical' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="evento-modal-titulo"
        onClick={e => e.stopPropagation()}
      >
        <button className="evento-modal__cerrar" onClick={onCerrar} aria-label="Cerrar">
          <X size={22} />
        </button>

        <div
          className={`evento-modal__foto${!evento.imagen_url ? ' evento-modal__foto--vacia' : ''}${orientacion === 'vertical' ? ' evento-modal__foto--vertical' : ''}`}
          style={!evento.imagen_url ? { background: `linear-gradient(135deg, ${color}, var(--brown-deep))` } : undefined}
        >
          {evento.imagen_url && (
            <>
              <button
                className="evento-modal__ampliar"
                onClick={() => setZoomAbierto(true)}
                aria-label="Ver imagen en grande"
                title="Ver imagen en grande"
              >
                <img
                  src={evento.imagen_url}
                  alt=""
                  onLoad={e => {
                    const { naturalWidth, naturalHeight } = e.currentTarget;
                    setOrientacion(naturalHeight > naturalWidth ? 'vertical' : 'horizontal');
                  }}
                />
                <span className="evento-modal__ampliar-icono">
                  <Maximize2 size={18} />
                </span>
              </button>
            </>
          )}
          <div className="evento-modal__foto-velo" />
          <span
            className="evento-modal__badge"
            style={{ background: color }}
          >
            {TIPO_LABELS[evento.tipo] ?? evento.tipo}
          </span>
        </div>

        <div className="evento-modal__body">
          <h2 id="evento-modal-titulo" className="evento-modal__titulo">{evento.titulo}</h2>
          <p className="evento-modal__fecha">{fechaLarga(evento.fecha)}</p>

          <div className="evento-modal__meta">
            {evento.hora && (
              <span className="evento-modal__meta-item">
                <Clock size={16} /> {evento.hora}
              </span>
            )}
            {evento.lugar && (
              <span className="evento-modal__meta-item">
                <MapPin size={16} /> {evento.lugar}
              </span>
            )}
          </div>

          {evento.descripcion && (
            <p className="evento-modal__desc">{evento.descripcion}</p>
          )}
        </div>
      </div>

      {zoomAbierto && evento.imagen_url && (
        <ImagenZoom
          src={evento.imagen_url}
          alt={evento.titulo}
          onCerrar={() => setZoomAbierto(false)}
        />
      )}
    </div>
  );
}
