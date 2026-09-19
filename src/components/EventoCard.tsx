import { MapPin, Clock } from 'lucide-react';
import type { EventoRow } from '../lib/database.types';
// Estilos de .eventos__card y todo lo que dibuja la tarjeta: viven aquí (no
// en el import de quien la usa) para que este componente se vea igual sin
// importar si lo monta la sección pública (Eventos.tsx) o la vista previa
// del panel admin (EventoForm.tsx).
import '../sections/Eventos.css';

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

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

interface Props {
  evento: Pick<EventoRow, 'titulo' | 'descripcion' | 'fecha' | 'hora' | 'lugar' | 'tipo'> &
    Partial<Pick<EventoRow, 'imagen_url'>>;
  style?: React.CSSProperties;
  /** Clases extra: el sitio público añade "reveal" para el fade-in al hacer
   *  scroll (requiere useRevealOnScroll() en la página); la vista previa del
   *  panel admin no la usa, así que no viene incluida por defecto. */
  className?: string;
  /** Variante grande para eventos importantes (fiestas patronales, etc.):
   *  foto a ancho/alto completo con el título y descripción superpuestos
   *  encima, en vez de la tarjeta compacta con foto arriba y texto abajo. */
  destacado?: boolean;
  /** Si se pasa, la tarjeta completa es clicable (abre el modal de detalle
   *  en el sitio público); en la vista previa del panel no se pasa. */
  onClick?: () => void;
}

/** Tarjeta de evento compartida entre el sitio público y la vista previa del panel admin. */
export default function EventoCard({ evento, style, className = '', destacado = false, onClick }: Props) {
  // fecha llega como 'YYYY-MM-DD'; se parsea en local para no perder un día
  // por desfase de zona horaria al construir el Date.
  const [, m, d] = evento.fecha.split('-').map(Number);
  const dia = String(d).padStart(2, '0');
  const mes = MESES[(m - 1 + 12) % 12] ?? '';
  const color = TIPO_COLORS[evento.tipo] ?? TIPO_COLORS.pastoral;

  if (destacado) {
    return (
      <article
        className={`card eventos__card eventos__card--destacado ${className}`.trim()}
        style={style}
        onClick={onClick}
      >
        <div
          className={`eventos__foto eventos__foto--destacada${!evento.imagen_url ? ' eventos__foto--vacia' : ''}`}
          style={!evento.imagen_url ? { background: `linear-gradient(135deg, ${color}, var(--brown-deep))` } : undefined}
        >
          {evento.imagen_url && <img src={evento.imagen_url} alt="" loading="lazy" />}
          <div className="eventos__foto-velo eventos__foto-velo--destacado" />

          <div className="eventos__sello eventos__sello--destacado" style={{ background: color }}>
            <span className="eventos__sello-dia">{dia}</span>
            <span className="eventos__sello-mes">{mes}</span>
          </div>

          <div className="eventos__destacado-contenido">
            <span
              className="eventos__badge eventos__badge--sobre-foto"
              style={{ borderColor: color, color: 'var(--white-pure)', background: color }}
            >
              {TIPO_LABELS[evento.tipo] ?? evento.tipo}
            </span>
            <h3 className="eventos__title eventos__title--destacado">
              {evento.titulo || 'Título del evento'}
            </h3>
            <p className="eventos__desc eventos__desc--destacado">{evento.descripcion}</p>
            <div className="eventos__meta eventos__meta--destacado">
              {evento.hora && (
                <span className="eventos__meta-item eventos__meta-item--destacado">
                  <Clock size={16} /> {evento.hora}
                </span>
              )}
              {evento.lugar && (
                <span className="eventos__meta-item eventos__meta-item--destacado">
                  <MapPin size={16} /> {evento.lugar}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`card eventos__card ${className}`.trim()} style={style} onClick={onClick}>
      {/* Foto protagonista; si no hay imagen, queda un fondo del color del
          tipo de evento para que la tarjeta no se vea "rota" sin foto. */}
      <div
        className={`eventos__foto${!evento.imagen_url ? ' eventos__foto--vacia' : ''}`}
        style={!evento.imagen_url ? { background: `linear-gradient(135deg, ${color}, var(--brown-deep))` } : undefined}
      >
        {evento.imagen_url && <img src={evento.imagen_url} alt="" loading="lazy" />}
        <div className="eventos__foto-velo" />

        {/* Sello de fecha grande, superpuesto sobre la foto */}
        <div className="eventos__sello" style={{ background: color }}>
          <span className="eventos__sello-dia">{dia}</span>
          <span className="eventos__sello-mes">{mes}</span>
        </div>

        <span
          className="eventos__badge eventos__badge--sobre-foto"
          style={{ borderColor: color, color: 'var(--white-pure)', background: color }}
        >
          {TIPO_LABELS[evento.tipo] ?? evento.tipo}
        </span>
      </div>

      <div className="eventos__content">
        <h3 className="eventos__title">{evento.titulo || 'Título del evento'}</h3>
        <p className="eventos__desc">{evento.descripcion}</p>
        <div className="eventos__meta">
          {evento.hora && (
            <span className="eventos__meta-item">
              <Clock size={14} /> {evento.hora}
            </span>
          )}
          {evento.lugar && (
            <span className="eventos__meta-item">
              <MapPin size={14} /> {evento.lugar}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
