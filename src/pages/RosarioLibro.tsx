import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import RosarioMarco from '../components/RosarioMarco';
import { GRUPOS_MISTERIOS, LETANIAS, ORACIONES } from '../data/rosario';
import './RosarioLibro.css';
import Seo from '../components/Seo';

/** Libro de oraciones: todos los textos del rosario para leer o consultar. */

const ORDEN_ORACIONES = [
  'senal', 'credo', 'padrenuestro', 'avemaria', 'gloria',
  'jaculatoria', 'salve', 'bajoTuAmparo', 'oracionFinal',
] as const;

const PASOS_REZO = [
  'La señal de la Santa Cruz y el Credo de los Apóstoles.',
  'Un Padre Nuestro, tres Ave Marías (por la fe, la esperanza y la caridad) y un Gloria.',
  'Se anuncia el primer misterio del día y se medita brevemente.',
  'Un Padre Nuestro, diez Ave Marías, un Gloria y la jaculatoria.',
  'Se repite lo anterior con los cinco misterios.',
  'Al terminar: la Salve, las letanías y la oración final.',
];

interface AcordeonProps {
  id: string;
  titulo: string;
  subtitulo?: string;
  abierto: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

function Acordeon({ id, titulo, subtitulo, abierto, onToggle, children }: AcordeonProps) {
  return (
    <div className={`libro__item ${abierto ? 'libro__item--abierto' : ''}`}>
      <Seo
        titulo="Libro de Oraciones del Rosario"
        descripcion="Todas las oraciones del Rosario, los misterios y las letanías para leer con calma o acompañar el rezo en grupo."
      />
      <button
        className="libro__cabecera"
        onClick={() => onToggle(id)}
        aria-expanded={abierto}
      >
        <span className="libro__cabecera-textos">
          <span className="libro__cabecera-titulo">{titulo}</span>
          {subtitulo && <span className="libro__cabecera-sub">{subtitulo}</span>}
        </span>
        <ChevronDown size={18} className="libro__chevron" />
      </button>
      <div className="libro__panel">
        <div className="libro__contenido">{children}</div>
      </div>
    </div>
  );
}

export default function RosarioLibro() {
  const [abierto, setAbierto] = useState<string | null>(null);
  const toggle = (id: string) => setAbierto(actual => (actual === id ? null : id));

  return (
    <RosarioMarco titulo="Libro de oraciones">
      <main className="libro">
        <section className="libro__seccion">
          <h2 className="libro__seccion-titulo">Cómo se reza el rosario</h2>
          <ol className="libro__pasos">
            {PASOS_REZO.map((p, i) => (
              <li key={i} className="libro__paso">{p}</li>
            ))}
          </ol>
        </section>

        <section className="libro__seccion">
          <h2 className="libro__seccion-titulo">Oraciones</h2>
          {ORDEN_ORACIONES.map(id => {
            const o = ORACIONES[id];
            return (
              <Acordeon key={o.id} id={`o-${o.id}`} titulo={o.titulo} abierto={abierto === `o-${o.id}`} onToggle={toggle}>
                {o.texto.split('\n\n').map((p, i) => (
                  <p key={i} className="libro__texto">{p}</p>
                ))}
              </Acordeon>
            );
          })}
        </section>

        <section className="libro__seccion">
          <h2 className="libro__seccion-titulo">Los misterios</h2>
          <p className="libro__nota">
            Según el orden de San Juan Pablo II en <em>Rosarium Virginis Mariae</em>.
          </p>
          {GRUPOS_MISTERIOS.map(g => (
            <Acordeon
              key={g.id}
              id={`m-${g.id}`}
              titulo={g.nombre}
              subtitulo={g.dias}
              abierto={abierto === `m-${g.id}`}
              onToggle={toggle}
            >
              <p className="libro__texto libro__texto--descripcion">{g.descripcion}</p>
              <ol className="libro__misterios">
                {g.misterios.map((m, i) => (
                  <li key={i} className="libro__misterio">
                    <h3 className="libro__misterio-titulo">{m.titulo}</h3>
                    <p className="libro__misterio-cita">{m.cita}</p>
                    <p className="libro__texto">{m.pasaje}</p>
                    <p className="libro__misterio-fruto">Fruto: {m.fruto}</p>
                  </li>
                ))}
              </ol>
            </Acordeon>
          ))}
        </section>

        <section className="libro__seccion">
          <h2 className="libro__seccion-titulo">Letanías Lauretanas</h2>
          <Acordeon
            id="letanias"
            titulo="Letanías de la Santísima Virgen"
            abierto={abierto === 'letanias'}
            onToggle={toggle}
          >
            {LETANIAS.map((seccion, i) => (
              <div key={i} className="libro__letania-seccion">
                <p className="libro__letania-respuesta">R. {seccion.respuesta}</p>
                <ul className="libro__letania-lista">
                  {seccion.invocaciones.map((inv, j) => (
                    <li key={j} className="libro__letania-item">{inv}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Acordeon>
        </section>
      </main>
    </RosarioMarco>
  );
}
