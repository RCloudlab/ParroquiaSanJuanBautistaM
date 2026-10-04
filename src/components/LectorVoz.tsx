import { Play, Pause, Square, Volume2 } from 'lucide-react';
import { useLectorTexto } from '../hooks/useLectorTexto';

interface Props {
  parrafos: string[];
}

/**
 * Botón de "escuchar" que lee el texto en voz alta con la síntesis del
 * propio navegador — se muestra solo cuando NO hay audio grabado, como
 * respaldo accesible para quien no puede leer el evangelio en pantalla.
 */
export default function LectorVoz({ parrafos }: Props) {
  const { soportado, estado, leer, pausar, detener } = useLectorTexto(parrafos);

  if (!soportado) return null;

  return (
    <div className="evangelio-page__lector">
      <span className="evangelio-page__lector-icono">
        <Volume2 size={20} />
      </span>
      <div className="evangelio-page__lector-texto">
        <p className="evangelio-page__lector-titulo">Escuchar con voz automática</p>
        <p className="evangelio-page__lector-sub">
          Lee el evangelio en voz alta usando tu dispositivo, para quien no pueda leer en pantalla.
        </p>
      </div>
      <div className="evangelio-page__lector-controles">
        {estado === 'leyendo' ? (
          <button onClick={pausar} className="evangelio-page__lector-btn" aria-label="Pausar lectura">
            <Pause size={16} /> Pausar
          </button>
        ) : (
          <button onClick={leer} className="evangelio-page__lector-btn" aria-label={estado === 'pausado' ? 'Reanudar lectura' : 'Escuchar lectura'}>
            <Play size={16} /> {estado === 'pausado' ? 'Reanudar' : 'Escuchar'}
          </button>
        )}
        {estado !== 'inactivo' && (
          <button onClick={detener} className="evangelio-page__lector-btn evangelio-page__lector-btn--detener" aria-label="Detener lectura">
            <Square size={14} /> Detener
          </button>
        )}
      </div>
    </div>
  );
}
