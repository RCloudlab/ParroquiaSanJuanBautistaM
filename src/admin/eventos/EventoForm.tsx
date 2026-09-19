import { useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import type { EventoInsert, EventoRow, EventoTipo, EventoEstado } from '../../lib/database.types';
import { subirImagenEvento, borrarImagenEvento } from './eventosApi';
import EventoCard from '../../components/EventoCard';
import LugarSelect from './LugarSelect';
import HoraSelect from './HoraSelect';
import ImagenInput from '../components/ImagenInput';

const TIPOS: { value: EventoTipo; label: string }[] = [
  { value: 'liturgico', label: 'Litúrgico' },
  { value: 'pastoral', label: 'Pastoral' },
  { value: 'social', label: 'Social' },
  { value: 'especial', label: 'Especial / Patronal' },
  { value: 'cultural', label: 'Cultural' },
];

interface Props {
  inicial: EventoRow | null;
  onGuardar: (datos: EventoInsert) => Promise<void>;
  onCancelar: () => void;
}

const VACIO: EventoInsert = {
  titulo: '',
  descripcion: '',
  fecha: new Date().toISOString().slice(0, 10),
  hora: '',
  lugar: '',
  tipo: 'pastoral',
  imagen_url: null,
  estado: 'borrador',
  orden: 0,
};

export default function EventoForm({ inicial, onGuardar, onCancelar }: Props) {
  const [datos, setDatos] = useState<EventoInsert>(
    inicial
      ? {
          titulo: inicial.titulo,
          descripcion: inicial.descripcion,
          fecha: inicial.fecha,
          hora: inicial.hora,
          lugar: inicial.lugar,
          tipo: inicial.tipo,
          imagen_url: inicial.imagen_url,
          estado: inicial.estado,
          orden: inicial.orden,
        }
      : VACIO
  );
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const campo = <K extends keyof EventoInsert>(k: K, v: EventoInsert[K]) =>
    setDatos(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: FormEvent, estado: EventoEstado) => {
    e.preventDefault();
    setError(null);
    setGuardando(true);
    try {
      await onGuardar({ ...datos, estado });
    } catch {
      setError('No se pudo guardar el evento. Intenta de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="admin-evento-form">
      <form className="admin-card admin-evento-form__campos">
        <div className="admin-field-row">
          <label className="admin-field">
            <span>Título</span>
            <input
              required
              value={datos.titulo}
              onChange={e => campo('titulo', e.target.value)}
              placeholder="Solemnidad de San Juan Bautista"
            />
          </label>
        </div>

        <label className="admin-field">
          <span>Descripción</span>
          <textarea
            rows={3}
            required
            value={datos.descripcion}
            onChange={e => campo('descripcion', e.target.value)}
            placeholder="Breve descripción del evento…"
          />
        </label>

        <div className="admin-field-row">
          <label className="admin-field">
            <span>Fecha</span>
            <input
              type="date"
              required
              value={datos.fecha}
              onChange={e => campo('fecha', e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Hora</span>
            <HoraSelect value={datos.hora} onChange={v => campo('hora', v)} />
          </label>
        </div>

        <div className="admin-field-row">
          <label className="admin-field">
            <span>Lugar</span>
            <LugarSelect value={datos.lugar} onChange={v => campo('lugar', v)} />
          </label>
          <label className="admin-field">
            <span>Tipo</span>
            <select value={datos.tipo} onChange={e => campo('tipo', e.target.value as EventoTipo)}>
              {TIPOS.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="admin-field">
          <span>Imagen (opcional)</span>
          <ImagenInput
            value={datos.imagen_url}
            onChange={url => campo('imagen_url', url)}
            onSubirArchivo={subirImagenEvento}
            onReemplazarUrlAnterior={url => { borrarImagenEvento(url).catch(() => {}); }}
          />
        </label>

        {error && <p className="admin-form-error">{error}</p>}

        <div className="admin-form-actions">
          <button type="button" className="btn-ghost" onClick={onCancelar} disabled={guardando}>
            Cancelar
          </button>
          <button
            type="button"
            className="btn-gold"
            onClick={e => handleSubmit(e, 'borrador')}
            disabled={guardando}
          >
            {guardando ? <Loader2 size={16} className="admin-spin" /> : null} Guardar borrador
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={e => handleSubmit(e, 'publicado')}
            disabled={guardando}
          >
            {guardando ? <Loader2 size={16} className="admin-spin" /> : null} Publicar
          </button>
        </div>
      </form>

      {/* Vista previa siempre visible al lado (se apila abajo en pantallas
          angostas — ver .admin-evento-form en admin.css). */}
      <div className="admin-preview">
        <p className="admin-preview__label">Así se verá en el sitio:</p>
        <div className="admin-preview__stage">
          <EventoCard evento={datos} />
        </div>
      </div>
    </div>
  );
}
