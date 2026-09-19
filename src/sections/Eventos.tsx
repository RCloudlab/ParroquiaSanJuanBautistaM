import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, Loader2 } from 'lucide-react';
import type { EventoRow } from '../lib/database.types';
import { listarEventosPublicados } from '../admin/eventos/eventosApi';
import EventoCard from '../components/EventoCard';
import EventoModal from '../components/EventoModal';
import EventosCarrusel from './EventosCarrusel';
import './Eventos.css';

export default function Eventos() {
  const [eventos, setEventos] = useState<EventoRow[] | null>(null);
  const [abierto, setAbierto] = useState<EventoRow | null>(null);

  useEffect(() => {
    let vivo = true;
    listarEventosPublicados()
      .then(data => { if (vivo) setEventos(data); })
      .catch(err => {
        // No se oculta el error: si algo falla (RLS, red, etc.) queda
        // registrado en consola en vez de mostrar silenciosamente "no hay
        // eventos" cuando en realidad sí los hay pero la consulta truena.
        console.error('No se pudieron cargar los eventos:', err);
        if (vivo) setEventos([]);
      });
    return () => { vivo = false; };
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setAbierto(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [abierto]);

  const hayEventos = !!eventos && eventos.length > 0;
  // eventos ya viene ordenado por fecha desde listarEventosPublicados().
  // Los de tipo "especial" (fiestas patronales, etc.) se destacan arriba en
  // grande: uno solo como tarjeta fija, dos o más como carrusel. Además
  // siguen apareciendo también abajo, en su lugar normal dentro de la
  // grilla junto al resto — el destacado es un adelanto, no un reemplazo.
  const destacados = eventos?.filter(ev => ev.tipo === 'especial') ?? [];

  return (
    <section id="eventos" className="eventos">
      {/* Banner con foto real del interior en celebración */}
      <div className="eventos__banner">
        <div className="eventos__banner-overlay" />
        <div className="eventos__banner-text">
          <h2 className="eventos__banner-title">Eventos y Actividades</h2>
          <p className="eventos__banner-sub">Próximas celebraciones de nuestra comunidad parroquial</p>
        </div>
      </div>

      <div className="section-container" style={{ paddingTop: '3rem' }}>

        {eventos === null ? (
          <div className="eventos__cargando">
            <Loader2 size={22} className="eventos__spin" />
          </div>
        ) : !hayEventos ? (
          <div className="eventos__aviso reveal">
            <CalendarClock size={20} className="eventos__aviso-icon" />
            <p>
              <strong>Próximamente.</strong> Aquí se publicarán los eventos y actividades
              de la parroquia.
            </p>
          </div>
        ) : (
          <>
            {destacados.length === 1 && (
              <EventoCard
                evento={destacados[0]}
                destacado
                className="reveal"
                onClick={() => setAbierto(destacados[0])}
              />
            )}
            {destacados.length > 1 && (
              <EventosCarrusel eventos={destacados} onAbrir={setAbierto} />
            )}

            <div className="eventos__grid">
              {eventos.map((ev, i) => (
                <EventoCard
                  key={ev.id}
                  evento={ev}
                  className="reveal"
                  style={{ transitionDelay: `${Math.min(i, 4) * 60}ms` }}
                  onClick={() => setAbierto(ev)}
                />
              ))}
            </div>

            <div className="eventos__more">
              <Link to="/eventos" className="btn-gold">
                Ver calendario completo <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>

      {abierto && <EventoModal evento={abierto} onCerrar={() => setAbierto(null)} />}
    </section>
  );
}
