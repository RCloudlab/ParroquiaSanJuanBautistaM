import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, CalendarClock } from 'lucide-react';
import './Eventos.css';

interface Evento {
  id: number;
  fecha: string;
  mes: string;
  titulo: string;
  descripcion: string;
  lugar: string;
  hora: string;
  tipo: 'liturgico' | 'pastoral' | 'social' | 'especial';
}

// Aún no hay eventos confirmados: la sección muestra solo el aviso
// "Próximamente". Cuando haya eventos reales, agrégalos aquí y la grilla
// y el botón de calendario reaparecen solos.
const EVENTOS: Evento[] = [];

const TIPO_COLORS: Record<string, string> = {
  especial: 'var(--gold-mid)',
  liturgico: 'var(--terracotta)',
  pastoral:  'var(--red-mid)',
  social:    'var(--teal-zocalo)',
  cultural:  'var(--purple-sorrow)',
};

const TIPO_LABELS: Record<string, string> = {
  especial:  'Patronal',
  liturgico: 'Litúrgico',
  pastoral:  'Pastoral',
  social:    'Social',
  cultural:  'Cultural',
};

export default function Eventos() {
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

        <div className="eventos__aviso reveal">
          <CalendarClock size={20} className="eventos__aviso-icon" />
          <p>
            <strong>Próximamente.</strong> Aquí se publicarán los eventos y actividades
            de la parroquia.
          </p>
        </div>

        {EVENTOS.length > 0 && (
        <div className="eventos__grid">
          {EVENTOS.map((ev, i) => (
            <article
              key={ev.id}
              className="card eventos__card reveal"
              style={{ transitionDelay: `${Math.min(i, 4) * 60}ms` }}
            >
              {/* Fecha */}
              <div className="eventos__date" style={{ background: TIPO_COLORS[ev.tipo] }}>
                <span className="eventos__day">{ev.fecha}</span>
                <span className="eventos__month">{ev.mes}</span>
              </div>

              {/* Contenido */}
              <div className="eventos__content">
                <span
                  className="eventos__badge"
                  style={{ borderColor: TIPO_COLORS[ev.tipo], color: TIPO_COLORS[ev.tipo] }}
                >
                  {TIPO_LABELS[ev.tipo]}
                </span>
                <h3 className="eventos__title">{ev.titulo}</h3>
                <p className="eventos__desc">{ev.descripcion}</p>
                <div className="eventos__meta">
                  <span className="eventos__meta-item">
                    <Clock size={14} /> {ev.hora}
                  </span>
                  <span className="eventos__meta-item">
                    <MapPin size={14} /> {ev.lugar}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        )}

        {EVENTOS.length > 0 && (
        <div className="eventos__more">
          <Link to="/eventos" className="btn-gold">
            Ver calendario completo <ArrowRight size={16} />
          </Link>
        </div>
        )}
      </div>
    </section>
  );
}
