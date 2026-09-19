import { useState, type FormEvent } from 'react';
import { Loader2, Image as ImageIcon, Eye, X } from 'lucide-react';
import type { EventoInsert, EventoRow, EventoTipo, EventoEstado } from '../../lib/database.types';
import { subirImagenEvento, borrarImagenEvento } from './eventosApi';
import EventoCard from '../../components/EventoCard';
import LugarSelect from './LugarSelect';

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
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [vistaPrevia, setVistaPrevia] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const campo = <K extends keyof EventoInsert>(k: K, v: EventoInsert[K]) =>
    setDatos(prev => ({ ...prev, [k]: v }));

  const handleImagen = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setSubiendoImagen(true);
    const imagenAnterior = datos.imagen_url;
    try {
      const url = await subirImagenEvento(file);
      campo('imagen_url', url);
      // La imagen vieja ya no la usa nadie: se borra para no acumular
      // archivos huérfanos en el bucket. Si falla (ya no existía, red, etc.)
      // no se interrumpe el flujo: la nueva imagen ya quedó guardada.
      if (imagenAnterior) await borrarImagenEvento(imagenAnterior).catch(() => {});
    } catch {
      setError('No se pudo subir la imagen. Verifica que sea JPG, PNG o WebP y pese menos de 15 MB.');
    } finally {
      setSubiendoImagen(false);
    }
  };

  const handleQuitarImagen = async () => {
    const url = datos.imagen_url;
    campo('imagen_url', null);
    if (url) await borrarImagenEvento(url).catch(() => {});
  };

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
      <form className="admin-card">
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
            <input
              value={datos.hora}
              onChange={e => campo('hora', e.target.value)}
              placeholder="11:00 – Misa Solemne"
            />
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
          <div className="admin-upload">
            {datos.imagen_url && (
              <div className="admin-upload__preview">
                <img src={datos.imagen_url} alt="" />
                <button type="button" onClick={handleQuitarImagen} aria-label="Quitar imagen">
                  <X size={14} />
                </button>
              </div>
            )}
            <label className="admin-upload__btn">
              {subiendoImagen ? <Loader2 size={16} className="admin-spin" /> : <ImageIcon size={16} />}
              {subiendoImagen ? 'Subiendo…' : datos.imagen_url ? 'Cambiar imagen' : 'Subir imagen'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                hidden
                onChange={e => handleImagen(e.target.files?.[0])}
                disabled={subiendoImagen}
              />
            </label>
          </div>
        </label>

        {error && <p className="admin-form-error">{error}</p>}

        <div className="admin-form-actions">
          <button type="button" className="btn-ghost" onClick={onCancelar} disabled={guardando}>
            Cancelar
          </button>
          <button
            type="button"
            className="btn-ghost admin-preview-btn"
            onClick={() => setVistaPrevia(v => !v)}
          >
            <Eye size={15} /> {vistaPrevia ? 'Ocultar vista previa' : 'Vista previa'}
          </button>
          <button
            type="button"
            className="btn-gold"
            onClick={e => handleSubmit(e, 'borrador')}
            disabled={guardando || subiendoImagen}
          >
            {guardando ? <Loader2 size={16} className="admin-spin" /> : null} Guardar borrador
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={e => handleSubmit(e, 'publicado')}
            disabled={guardando || subiendoImagen}
          >
            {guardando ? <Loader2 size={16} className="admin-spin" /> : null} Publicar
          </button>
        </div>
      </form>

      {vistaPrevia && (
        <div className="admin-preview">
          <p className="admin-preview__label">Así se verá en el sitio:</p>
          <div className="admin-preview__stage">
            <EventoCard evento={datos} />
          </div>
        </div>
      )}
    </div>
  );
}
