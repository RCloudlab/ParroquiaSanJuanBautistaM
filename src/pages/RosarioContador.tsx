import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Undo2, RotateCcw } from 'lucide-react';
import RosarioMarco, { ReanudarAviso } from '../components/RosarioMarco';
import CuentasRosario from '../components/CuentasRosario';
import { useRosario, useWakeLock } from '../hooks/useRosario';
import { GRUPOS_MISTERIOS } from '../data/rosario';
import './RosarioRezo.css';

/**
 * Modo contador: solo las cuentas, para quien reza de memoria.
 * Un toque en la zona inferior avanza una cuenta (con vibración),
 * sin necesidad de mirar la pantalla.
 */
export default function RosarioContador() {
  const rosario = useRosario();
  useWakeLock();
  const [completado, setCompletado] = useState(false);

  const {
    grupo, paso, indice, total, terminado, progresoPendiente,
    avanzar, retroceder, reiniciar, cambiarGrupo, continuarGuardado, descartarGuardado,
  } = rosario;

  const progreso = total > 1 ? indice / (total - 1) : 0;

  const alTocar = () => {
    if (terminado) {
      setCompletado(true);
    } else {
      avanzar();
    }
  };

  const alRezarOtraVez = () => {
    setCompletado(false);
    reiniciar();
  };

  return (
    <RosarioMarco titulo="Contador">
      {progresoPendiente && (
        <ReanudarAviso
          descripcion={
            GRUPOS_MISTERIOS.find(g => g.id === progresoPendiente.grupoId)?.nombre ?? 'Rosario'
          }
          onContinuar={continuarGuardado}
          onEmpezar={descartarGuardado}
        />
      )}

      {completado ? (
        <section className="rezo__fin">
          <CuentasRosario paso={paso} />
          <h2 className="rezo__fin-titulo">Has rezado el Santo Rosario</h2>
          <p className="rezo__fin-texto">
            Que la Virgen de los Dolores te acompañe y te bendiga.
          </p>
          <div className="rezo__fin-acciones">
            <button className="rezo__avanzar" onClick={alRezarOtraVez}>
              <RotateCcw size={18} />
              Rezar otra vez
            </button>
            <Link className="rezo__fin-volver" to="/rosario">
              Volver al inicio
            </Link>
          </div>
        </section>
      ) : (
        <>
          <nav className="rezo__grupos" aria-label="Grupo de misterios">
            {GRUPOS_MISTERIOS.map(g => (
              <button
                key={g.id}
                className={`rezo__grupo ${g.id === grupo.id ? 'rezo__grupo--activo' : ''}`}
                onClick={() => g.id !== grupo.id && cambiarGrupo(g.id)}
              >
                {g.singular}s
              </button>
            ))}
          </nav>

          <div
            className="rezo__progreso"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progreso * 100)}
            aria-label="Avance del rosario"
          >
            <div className="rezo__progreso-relleno" style={{ transform: `scaleX(${progreso})` }} />
          </div>

          <main className="contador__cuerpo">
            <p className="rezo__contexto" aria-live="polite">{paso.contexto}</p>
            <h2 className="contador__paso">{paso.titulo}</h2>
            <CuentasRosario paso={paso} />
          </main>

          <button className="contador__zona" onClick={alTocar}>
            <span className="contador__zona-onda" key={indice} />
            <span className="contador__zona-texto">
              {terminado ? 'Amén · Terminar' : 'Toca para avanzar'}
            </span>
          </button>

          <footer className="rezo__controles rezo__controles--contador">
            <button
              className="rezo__retroceder"
              onClick={retroceder}
              disabled={indice === 0}
              aria-label="Regresar una cuenta"
            >
              <Undo2 size={20} />
            </button>
            <button
              className="rezo__retroceder"
              onClick={reiniciar}
              disabled={indice === 0}
              aria-label="Reiniciar el rosario"
            >
              <RotateCcw size={20} />
            </button>
          </footer>
        </>
      )}
    </RosarioMarco>
  );
}
