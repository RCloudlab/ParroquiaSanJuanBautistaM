import { Link } from 'react-router-dom';
import { BookOpenText, Headphones, ArrowLeft, Sparkles } from 'lucide-react';
import type { EvangelioRow } from '../lib/database.types';
import { fechaLargaEvangelio } from './evangelioFormato';
import '../pages/EvangelioPage.css';

interface Props {
  evangelio: EvangelioRow;
  /** false en la vista previa del panel: oculta los links de navegación del sitio. */
  conAcciones?: boolean;
}

/** Cuerpo completo del evangelio (hero + audio + texto + reflexión), compartido
 *  entre /evangelio (sitio público) y la vista previa del panel admin. */
export default function EvangelioLectura({ evangelio, conAcciones = true }: Props) {
  const primeraPalabraReferencia = evangelio.referencia.split(' ')[0] || '';

  return (
    <section className="evangelio-page">
      <div className="evangelio-page__hero">
        {evangelio.imagen_url && <img src={evangelio.imagen_url} alt="" />}
        <div className="evangelio-page__hero-overlay" />
        <div className="evangelio-page__hero-text">
          <p className="evangelio-page__eyebrow">
            <BookOpenText size={15} /> Evangelio del Día
          </p>
          <h1 className="evangelio-page__titulo">{evangelio.titulo || 'Título del evangelio'}</h1>
          <p className="evangelio-page__fecha">
            {fechaLargaEvangelio(evangelio.fecha)}{evangelio.liturgia ? ` · ${evangelio.liturgia}` : ''}
          </p>
        </div>
        {evangelio.imagen_credito && (
          <p className="evangelio-page__credito">{evangelio.imagen_credito}</p>
        )}
      </div>

      <div className="section-container evangelio-page__container">
        {evangelio.audio_url ? (
          <div className="evangelio-page__reproductor reveal">
            <div className="evangelio-page__reproductor-head">
              <span className="evangelio-page__reproductor-icono">
                <Headphones size={24} />
              </span>
              <div>
                <h2 className="evangelio-page__reproductor-titulo">Escucha el evangelio de hoy</h2>
                <p className="evangelio-page__reproductor-sub">
                  {[evangelio.autor_audio, evangelio.duracion_audio].filter(Boolean).join(' · ') || 'Reflexión de la parroquia'}
                </p>
              </div>
            </div>
            <audio className="evangelio-page__reproductor-audio" controls preload="metadata" src={evangelio.audio_url}>
              Tu navegador no soporta audio HTML5.
            </audio>
            <p className="evangelio-page__reproductor-nota">
              Puedes seguir la lectura completa más abajo mientras escuchas.
            </p>
          </div>
        ) : (
          <div className="evangelio-page__reproductor evangelio-page__reproductor--vacio reveal">
            <span className="evangelio-page__reproductor-icono">
              <Headphones size={22} />
            </span>
            <p className="evangelio-page__reproductor-pendiente">
              El audio de hoy se publicará en breve. Mientras tanto, puedes leer el evangelio completo aquí abajo.
            </p>
          </div>
        )}

        <article className="evangelio-page__lectura reveal">
          <div className="evangelio-page__lectura-header">
            <h2>Lectura del santo Evangelio según san {primeraPalabraReferencia}</h2>
            <span className="evangelio-page__referencia">{evangelio.referencia}</span>
          </div>

          {evangelio.texto.map((parrafo, i) => (
            <p key={i} className="evangelio-page__parrafo">{parrafo}</p>
          ))}

          <p className="evangelio-page__aclamacion">Palabra del Señor. — Gloria a ti, Señor Jesús.</p>
        </article>

        {evangelio.reflexion.length > 0 && (
          <article className="evangelio-page__reflexion reveal">
            <h2 className="evangelio-page__reflexion-titulo">
              <Sparkles size={18} /> Para meditar hoy
            </h2>
            {evangelio.reflexion.map((parrafo, i) => (
              <p key={i} className="evangelio-page__parrafo">{parrafo}</p>
            ))}
          </article>
        )}

        {conAcciones && (
          <div className="evangelio-page__acciones">
            <Link to="/" className="btn-gold">
              <ArrowLeft size={16} /> Volver al inicio
            </Link>
            <Link to="/rosario" className="btn-primary">
              Reza el Rosario de hoy
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
