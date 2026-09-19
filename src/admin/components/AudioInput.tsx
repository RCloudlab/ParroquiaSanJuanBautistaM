import { useState, type ChangeEvent } from 'react';
import { Loader2, Music, X } from 'lucide-react';

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  onSubirArchivo: (file: File) => Promise<string>;
  /** Se llama con la URL anterior al reemplazar o quitar, para borrarla del bucket. */
  onReemplazarUrlAnterior?: (urlAnterior: string) => void;
  accept?: string;
  maxSizeLabel?: string;
}

/** Campo de audio: subir archivo, con reproductor de vista previa y borrado del anterior al reemplazar. */
export default function AudioInput({
  value,
  onChange,
  onSubirArchivo,
  onReemplazarUrlAnterior,
  accept = 'audio/mpeg,audio/mp3,audio/wav,audio/ogg',
  maxSizeLabel = '20 MB',
}: Props) {
  const [subiendo, setSubiendo] = useState(false);
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
      if (anterior) onReemplazarUrlAnterior?.(anterior);
    } catch {
      setError(`No se pudo subir el audio. Verifica que sea MP3, WAV u OGG y pese menos de ${maxSizeLabel}.`);
    } finally {
      setSubiendo(false);
      e.target.value = '';
    }
  };

  const handleQuitar = () => {
    const anterior = value;
    onChange(null);
    if (anterior) onReemplazarUrlAnterior?.(anterior);
  };

  return (
    <div className="admin-audio">
      <label className="admin-upload__btn">
        {subiendo ? <Loader2 size={16} className="admin-spin" /> : <Music size={16} />}
        {subiendo ? 'Subiendo…' : value ? 'Cambiar audio' : 'Subir audio'}
        <input type="file" accept={accept} hidden onChange={handleArchivo} disabled={subiendo} />
      </label>

      {error && <p className="admin-form-error">{error}</p>}

      {value && (
        <div className="admin-audio__preview">
          <audio controls preload="metadata" src={value} />
          <button type="button" onClick={handleQuitar} aria-label="Quitar audio">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
