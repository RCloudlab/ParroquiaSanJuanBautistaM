import { Link } from 'react-router-dom';
import { Timer, ArrowRight, Sparkle, BookOpen } from 'lucide-react';
import RosarioHero from './RosarioHero';
import { GRUPOS, grupoDelDia } from './rosarioResumen';
import './RezaRosario.css';

/* Datos estructurados: describen el Rosario como práctica de oración de la
   parroquia, con el enlace directo a la herramienta para rezarlo. Es contenido
   estático, así que se define fuera del componente (no se recrea en cada
   render). */
const DATOS_ESTRUCTURADOS = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo rezar el Santo Rosario',
  description:
    'Guía para rezar el Santo Rosario paso a paso, con las oraciones completas ' +
    'y los misterios que corresponden a cada día de la semana.',
  url: 'https://parroquiasanjuanbautista.com/rosario',
  totalTime: 'PT20M',
  step: GRUPOS.map((g, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: `Misterios ${g.nombre}`,
    text: `Los Misterios ${g.nombre} se rezan: ${g.dias.toLowerCase()}.`,
  })),
};

export default function RezaRosario() {
  const hoy = new Date();
  const grupoHoy = grupoDelDia(hoy);
  const diaNombre = hoy.toLocaleDateString('es-MX', { weekday: 'long' });

  return (
    <section id="reza-rosario" className="reza-rosario" aria-labelledby="reza-rosario-titulo">
      <script
        type="application/ld+json"
        // El contenido es constante y definido por nosotros, no entrada de usuario
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DATOS_ESTRUCTURADOS) }}
      />
      <div className="section-container">
        <div className="reza-rosario__card reveal">
          {/* Columna visual: rosario animado en SVG (decorativo, aria-hidden) */}
          <div className="reza-rosario__visual">
            <RosarioHero grupo={grupoHoy.id} />
          </div>

          {/* Columna de texto: todo el contenido real que indexa el buscador */}
          <div className="reza-rosario__texto">
            <p className="reza-rosario__eyebrow">
              <Sparkle size={14} aria-hidden="true" /> Oración del día
            </p>
            <h2 id="reza-rosario-titulo" className="reza-rosario__titulo">
              Reza el Santo Rosario
            </h2>
            <p className="reza-rosario__hoy">
              Hoy, <strong>{diaNombre}</strong>, se rezan los{' '}
              <strong>Misterios {grupoHoy.nombre}</strong>
            </p>
            <p className="reza-rosario__desc">
              Te acompañamos paso a paso con las oraciones completas, los misterios
              del día y las cuentas para no perderte.
            </p>

            {/* Los cuatro grupos, con su día. Texto indexable y útil de por sí. */}
            <ul className="reza-rosario__grupos">
              {GRUPOS.map(g => (
                <li
                  key={g.id}
                  className={`reza-rosario__grupo ${g.id === grupoHoy.id ? 'reza-rosario__grupo--hoy' : ''}`}
                >
                  <span className="reza-rosario__grupo-nombre">{g.nombre}</span>
                  <span className="reza-rosario__grupo-dias">{g.dias}</span>
                </li>
              ))}
            </ul>

            <p className="reza-rosario__tiempo">
              <Timer size={16} aria-hidden="true" /> Entre <strong>15 y 20 minutos</strong>
            </p>

            <div className="reza-rosario__acciones">
              <Link to="/rosario" className="btn-gold reza-rosario__cta">
                Rezar ahora <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/rosario/libro" className="reza-rosario__secundario">
                <BookOpen size={15} aria-hidden="true" /> Libro de oraciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
