import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Undo2, RotateCcw } from 'lucide-react';
import RosarioMarco, { ReanudarAviso } from '../components/RosarioMarco';
import CuentasRosario from '../components/CuentasRosario';
import { useRosario, useWakeLock } from '../hooks/useRosario';
import { GRUPOS_MISTERIOS } from '../data/rosario';
import './RosarioRezo.css';
import Seo from '../components/Seo';

/** Modo guiado: texto de la oración actual + cuentas, paso a paso. */
export default function RosarioGuiado() {
  const rosario = useRosario();
  useWakeLock();
  const [completado, setCompletado] = useState(false);

  const {
    grupo, paso, indice, total, terminado, progresoPendiente,
    avanzar, retroceder, reiniciar, cambiarGrupo, continuarGuardado, descartarGuardado,
  } = rosario;

  const progreso = total > 1 ? indice / (total - 1) : 0;

  const alContinuar = () => {
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
    <RosarioMarco titulo="Rosario guiado">
      <Seo
        titulo="Rosario Guiado"
        descripcion="Reza el Rosario acompañado paso a paso: oraciones completas, misterios del día y cuentas para no perderte."
      />
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
          {/* Selector de misterios (cambiar reinicia el rezo) */}
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

          <main className="rezo__cuerpo">
            <div className="rezo__cuentas-mini">
              <CuentasRosario paso={paso} compacto />
            </div>

            <article className="rezo__tarjeta" key={indice} aria-live="polite">
              <p className="rezo__contexto">{paso.contexto}</p>
              <h2 className="rezo__titulo">{paso.titulo}</h2>
              {paso.letania ? (
                <dl className="rezo__letania">
                  {paso.letania.map((fila, i) => (
                    <div key={i} className="rezo__letania-fila">
                      <dt className="rezo__letania-invocacion">{fila.invocacion}</dt>
                      <dd className="rezo__letania-respuesta">{fila.respuesta}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                paso.texto.split('\n\n').map((parrafo, i) => (
                  <p key={i} className="rezo__texto">{parrafo}</p>
                ))
              )}
            </article>
          </main>

          <footer className="rezo__controles">
            <button
              className="rezo__retroceder"
              onClick={retroceder}
              disabled={indice === 0}
              aria-label="Regresar un paso"
            >
              <Undo2 size={20} />
            </button>
            <button className="rezo__avanzar" onClick={alContinuar}>
              {terminado ? 'Amén · Terminar' : 'Continuar'}
            </button>
          </footer>
        </>
      )}
    </RosarioMarco>
  );
}
