import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenText, ArrowRight, Headphones, ExternalLink, Loader2 } from 'lucide-react';
import type { EvangelioRow } from '../lib/database.types';
import { obtenerEvangelioDeHoy } from '../admin/evangelio/evangelioApi';
import { fechaLargaEvangelio } from '../components/evangelioFormato';
import './EvangelioDia.css';

export default function EvangelioDia() {
  const [evangelio, setEvangelio] = useState<EvangelioRow | null | undefined>(undefined);

  useEffect(() => {
    let vivo = true;
    obtenerEvangelioDeHoy()
      .then(data => { if (vivo) setEvangelio(data); })
      .catch(err => {
        console.error('No se pudo cargar el evangelio del día:', err);
        if (vivo) setEvangelio(null);
      });
    return () => { vivo = false; };
  }, []);

  // Sin evangelio publicado hoy: la sección no se muestra (nada que ver aún).
  if (evangelio === null) return null;

  const enlace = evangelio?.imagen_enlace;

  const imagen = evangelio && (
    <img src={evangelio.imagen_url ?? undefined} alt="" loading="lazy" />
  );

  return (
    <section id="evangelio" className="evangelio">
      <div className="section-container">
        <h2 className="section-title">Evangelio del Día</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          «Tu palabra es lámpara para mis pasos» — Sal 119,105
        </p>

        {evangelio === undefined ? (
          <div className="evangelio__cargando"><Loader2 size={22} className="evangelio__spin" /></div>
        ) : (
          <article className="evangelio__card reveal">
            {enlace ? (
              <a
                href={enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="evangelio__media"
                aria-label="Abrir el evangelio del día"
              >
                {imagen}
                <span className="evangelio__media-enlace">
                  <ExternalLink size={14} />
                  Ver más
                </span>
              </a>
            ) : (
              <Link
                to="/evangelio"
                className="evangelio__media"
                aria-label="Leer el evangelio completo del día"
              >
                {imagen}
              </Link>
            )}

            <div className="evangelio__body">
              <p className="evangelio__eyebrow">
                <BookOpenText size={15} className="evangelio__eyebrow-icon" />
                {fechaLargaEvangelio(evangelio.fecha)}{evangelio.liturgia ? ` · ${evangelio.liturgia}` : ''}
              </p>

              <h3 className="evangelio__titulo">{evangelio.titulo}</h3>
              {evangelio.referencia && <span className="evangelio__referencia">{evangelio.referencia}</span>}

              <p className="evangelio__resumen">{evangelio.resumen}</p>

              {evangelio.audio_url && (
                <Link to="/evangelio" className="evangelio__audio-aviso">
                  <Headphones size={16} />
                  Escucha la reflexión de hoy
                </Link>
              )}

              <Link to="/evangelio" className="btn-gold evangelio__cta">
                {evangelio.audio_url ? 'Escuchar y leer' : 'Leer el evangelio completo'}{' '}
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
