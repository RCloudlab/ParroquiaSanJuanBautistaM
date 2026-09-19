import { useState, type FormEvent } from 'react';
import { Loader2, Plus, X } from 'lucide-react';
import type { EvangelioInsert, EvangelioRow, EvangelioEstado } from '../../lib/database.types';
import {
  subirImagenEvangelio, borrarImagenEvangelio, subirAudioEvangelio, borrarAudioEvangelio,
} from './evangelioApi';
import { calcularDiaLiturgico } from './calendarioLiturgico';
import EvangelioLectura from '../../components/EvangelioLectura';
import ImagenInput from '../components/ImagenInput';
import AudioInput from '../components/AudioInput';

interface Props {
  fecha: string;
  inicial: EvangelioRow | null;
  onGuardar: (datos: EvangelioInsert) => Promise<void>;
  onCancelar: () => void;
}

function vacio(fecha: string): EvangelioInsert {
  return {
    fecha,
    liturgia: '',
    titulo: '',
    referencia: '',
    cita: '',
    resumen: '',
    imagen_url: null,
    imagen_credito: '',
    imagen_enlace: null,
    audio_url: null,
    autor_audio: '',
    duracion_audio: '',
    texto: [''],
    reflexion: [''],
    estado: 'borrador',
  };
}

/** Textarea por párrafo, con botón para agregar/quitar — para "texto" y "reflexion" (string[]). */
function ListaParrafos({
  label, valores, onChange, placeholder,
}: {
  label: string;
  valores: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
}) {
  const cambiarParrafo = (i: number, v: string) => {
    const copia = [...valores];
    copia[i] = v;
    onChange(copia);
  };
  const agregar = () => onChange([...valores, '']);
  const quitar = (i: number) => onChange(valores.filter((_, j) => j !== i));

  return (
    <div className="admin-field">
      <span>{label}</span>
      <div className="admin-parrafos">
        {valores.map((p, i) => (
          <div key={i} className="admin-parrafos__item">
            <textarea
              rows={3}
              value={p}
              onChange={e => cambiarParrafo(i, e.target.value)}
              placeholder={`${placeholder} (párrafo ${i + 1})`}
            />
            {valores.length > 1 && (
              <button type="button" onClick={() => quitar(i)} aria-label="Quitar párrafo">
                <X size={14} />
              </button>
            )}
          </div>
        ))}
        <button type="button" className="admin-parrafos__agregar" onClick={agregar}>
          <Plus size={14} /> Agregar párrafo
        </button>
      </div>
    </div>
  );
}

export default function EvangelioForm({ fecha, inicial, onGuardar, onCancelar }: Props) {
  const [datos, setDatos] = useState<EvangelioInsert>(
    inicial
      ? {
          fecha: inicial.fecha,
          liturgia: inicial.liturgia,
          titulo: inicial.titulo,
          referencia: inicial.referencia,
          cita: inicial.cita,
          resumen: inicial.resumen,
          imagen_url: inicial.imagen_url,
          imagen_credito: inicial.imagen_credito,
          imagen_enlace: inicial.imagen_enlace,
          audio_url: inicial.audio_url,
          autor_audio: inicial.autor_audio,
          duracion_audio: inicial.duracion_audio,
          texto: inicial.texto.length > 0 ? inicial.texto : [''],
          reflexion: inicial.reflexion.length > 0 ? inicial.reflexion : [''],
          estado: inicial.estado,
        }
      : vacio(fecha)
  );
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const campo = <K extends keyof EvangelioInsert>(k: K, v: EvangelioInsert[K]) =>
    setDatos(prev => ({ ...prev, [k]: v }));

  const diaLiturgico = calcularDiaLiturgico(fecha);

  const handleSubmit = async (e: FormEvent, estado: EvangelioEstado) => {
    e.preventDefault();
    setError(null);
    setGuardando(true);
    try {
      await onGuardar({
        ...datos,
        texto: datos.texto.filter(p => p.trim() !== ''),
        reflexion: datos.reflexion.filter(p => p.trim() !== ''),
        estado,
      });
    } catch {
      setError('No se pudo guardar el evangelio. Intenta de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  // Para la vista previa se arma un EvangelioRow "de mentira" con los campos
  // que EvangelioLectura necesita — id/timestamps no importan aquí.
  const previewRow = {
    ...datos,
    id: 'preview',
    created_at: '',
    updated_at: '',
    texto: datos.texto.filter(p => p.trim() !== ''),
    reflexion: datos.reflexion.filter(p => p.trim() !== ''),
  };

  return (
    <div className="admin-evento-form">
      <form className="admin-card admin-evento-form__campos">
        <p className="admin-evangelio__dia-liturgico">
          {new Date(fecha + 'T00:00:00').toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
          {' · '}{diaLiturgico.nombre} <span className="admin-evangelio__ciclo">(ciclo {diaLiturgico.ciclo})</span>
        </p>

        <div className="admin-field-row">
          <label className="admin-field">
            <span>Título</span>
            <input
              required
              value={datos.titulo}
              onChange={e => campo('titulo', e.target.value)}
              placeholder="Cada árbol se conoce por su fruto"
            />
          </label>
        </div>

        <div className="admin-field-row">
          <label className="admin-field">
            <span>Referencia bíblica</span>
            <input
              value={datos.referencia}
              onChange={e => campo('referencia', e.target.value)}
              placeholder="Lucas 6, 43-49"
            />
          </label>
          <label className="admin-field">
            <span>Liturgia del día (opcional)</span>
            <input
              value={datos.liturgia}
              onChange={e => campo('liturgia', e.target.value)}
              placeholder={diaLiturgico.nombre}
            />
          </label>
        </div>

        <label className="admin-field">
          <span>Cita destacada</span>
          <input
            value={datos.cita}
            onChange={e => campo('cita', e.target.value)}
            placeholder="«De lo que rebosa el corazón habla la boca.»"
          />
        </label>

        <label className="admin-field">
          <span>Resumen (aparece en el Home)</span>
          <textarea
            rows={3}
            value={datos.resumen}
            onChange={e => campo('resumen', e.target.value)}
            placeholder="Resumen breve para la tarjeta del Home…"
          />
        </label>

        <ListaParrafos
          label="Texto completo del evangelio"
          valores={datos.texto}
          onChange={v => campo('texto', v)}
          placeholder="Texto del evangelio"
        />

        <ListaParrafos
          label="Reflexión (opcional)"
          valores={datos.reflexion}
          onChange={v => campo('reflexion', v)}
          placeholder="Reflexión"
        />

        <label className="admin-field">
          <span>Imagen (opcional)</span>
          <ImagenInput
            value={datos.imagen_url}
            onChange={url => campo('imagen_url', url)}
            onSubirArchivo={subirImagenEvangelio}
            onReemplazarUrlAnterior={url => { borrarImagenEvangelio(url).catch(() => {}); }}
          />
        </label>

        {datos.imagen_url && (
          <label className="admin-field">
            <span>Crédito de la imagen (opcional)</span>
            <input
              value={datos.imagen_credito}
              onChange={e => campo('imagen_credito', e.target.value)}
              placeholder="Carl Bloch, «El Sermón de la Montaña» (1877) · Dominio público"
            />
          </label>
        )}

        <label className="admin-field">
          <span>Audio (opcional, ~11 MB máx. recomendado)</span>
          <AudioInput
            value={datos.audio_url}
            onChange={url => campo('audio_url', url)}
            onSubirArchivo={subirAudioEvangelio}
            onReemplazarUrlAnterior={url => { borrarAudioEvangelio(url).catch(() => {}); }}
          />
        </label>

        {datos.audio_url && (
          <div className="admin-field-row">
            <label className="admin-field">
              <span>Quién graba (opcional)</span>
              <input
                value={datos.autor_audio}
                onChange={e => campo('autor_audio', e.target.value)}
                placeholder="P. Nombre del párroco"
              />
            </label>
            <label className="admin-field">
              <span>Duración (opcional)</span>
              <input
                value={datos.duracion_audio}
                onChange={e => campo('duracion_audio', e.target.value)}
                placeholder="16 min"
              />
            </label>
          </div>
        )}

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

      <div className="admin-preview admin-preview--evangelio">
        <p className="admin-preview__label">Así se verá en el sitio:</p>
        <div className="admin-preview__stage admin-preview__stage--evangelio">
          <EvangelioLectura evangelio={previewRow} conAcciones={false} />
        </div>
      </div>
    </div>
  );
}
