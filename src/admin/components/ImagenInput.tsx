import { useState, type ChangeEvent } from 'react';
import { Loader2, Image as ImageIcon, Link as LinkIcon, X, AlertTriangle } from 'lucide-react';

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  /** Sube un archivo y devuelve su URL pública (típicamente a un bucket de Supabase). */
  onSubirArchivo: (file: File) => Promise<string>;
  /** Se llama con la URL anterior cuando se reemplaza o quita, para borrar el
   *  archivo huérfano del bucket. No se llama si la URL anterior venía de un
   *  link externo pegado a mano (no hay nada propio que borrar). */
  onReemplazarUrlAnterior?: (urlAnterior: string) => void;
  accept?: string;
  maxSizeLabel?: string;
}

type Modo = 'archivo' | 'link';

/**
 * Campo de imagen con dos formas de cargarla: subir un archivo (a Storage) o
 * pegar el link de una imagen ya alojada en otro sitio. En ambos casos se
 * muestra una vista previa antes de guardar — si el link no es una imagen
 * válida, se ve de inmediato en vez de descubrirlo hasta publicar.
 */
export default function ImagenInput({
  value,
  onChange,
  onSubirArchivo,
  onReemplazarUrlAnterior,
  accept = 'image/jpeg,image/png,image/webp',
  maxSizeLabel = '15 MB',
}: Props) {
  const [modo, setModo] = useState<Modo>('archivo');
  const [subiendo, setSubiendo] = useState(false);
  const [linkTexto, setLinkTexto] = useState(value ?? '');
  const [linkError, setLinkError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleArchivo = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setSubiendo(true);
    const anterior = value;
    try {
      const url = await onSubirArchivo(file);
      onChange(url);
      setLinkTexto(url);
      if (anterior) onReemplazarUrlAnterior?.(anterior);
    } catch {
      setError(`No se pudo subir la imagen. Verifica que sea JPG, PNG o WebP y pese menos de ${maxSizeLabel}.`);
    } finally {
      setSubiendo(false);
      e.target.value = '';
    }
  };

  const handleLink = (url: string) => {
    setLinkTexto(url);
    setLinkError(false);
    const limpio = url.trim();
    if (!limpio) {
      onChange(null);
      return;
    }
    // Se guarda tal cual lo escribió; la vista previa (más abajo) confirma
    // visualmente si el link realmente carga una imagen.
    onChange(limpio);
  };

  const handleQuitar = () => {
    const anterior = value;
    onChange(null);
    setLinkTexto('');
    setLinkError(false);
    if (anterior) onReemplazarUrlAnterior?.(anterior);
  };

  return (
    <div className="admin-imagen">
      <div className="admin-imagen__tabs">
        <button
          type="button"
          className={`admin-imagen__tab${modo === 'archivo' ? ' admin-imagen__tab--activo' : ''}`}
          onClick={() => setModo('archivo')}
        >
          <ImageIcon size={14} /> Subir archivo
        </button>
        <button
          type="button"
          className={`admin-imagen__tab${modo === 'link' ? ' admin-imagen__tab--activo' : ''}`}
          onClick={() => setModo('link')}
        >
          <LinkIcon size={14} /> Pegar link
        </button>
      </div>

      {modo === 'archivo' ? (
        <label className="admin-upload__btn">
          {subiendo ? <Loader2 size={16} className="admin-spin" /> : <ImageIcon size={16} />}
          {subiendo ? 'Subiendo…' : value ? 'Cambiar imagen' : 'Subir imagen'}
          <input type="file" accept={accept} hidden onChange={handleArchivo} disabled={subiendo} />
        </label>
      ) : (
        <input
          className="admin-imagen__link-input"
          type="url"
          inputMode="url"
          placeholder="https://ejemplo.com/foto.jpg"
          value={linkTexto}
          onChange={e => handleLink(e.target.value)}
        />
      )}

      {error && <p className="admin-form-error">{error}</p>}

      {value && (
        <div className="admin-upload__preview admin-upload__preview--grande">
          {!linkError ? (
            <img src={value} alt="" onError={() => setLinkError(true)} onLoad={() => setLinkError(false)} />
          ) : (
            <div className="admin-imagen__link-error">
              <AlertTriangle size={18} />
              <span>No se pudo cargar esta imagen. Revisa el link.</span>
            </div>
          )}
          <button type="button" onClick={handleQuitar} aria-label="Quitar imagen">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
