import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
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

const EVENTOS: Evento[] = [
  {
    id: 1,
    fecha: '24',
    mes: 'Jun',
    titulo: 'Solemnidad de San Juan Bautista',
    descripcion: 'Gran celebración patronal con Misa solemne, procesión y actos culturales en honor a nuestro patrono. Noche de hogueras y tradición.',
    lugar: 'Iglesia y Plaza Mayor',
    hora: '11:00 – Misa Solemne / 20:00 – Procesión',
    tipo: 'especial',
  },
  {
    id: 2,
    fecha: '15',
    mes: 'Sep',
    titulo: 'Fiesta de la Virgen de los Dolores',
    descripcion: 'Celebración de nuestra copatrona con novena, misa solemne y procesión vespertina. Uno de los momentos más emotivos del año litúrgico.',
    lugar: 'Iglesia Parroquial',
    hora: '19:30 – Misa / 20:30 – Procesión',
    tipo: 'especial',
  },
  {
    id: 3,
    fecha: '01',
    mes: 'Jul',
    titulo: 'Adoración Nocturna',
    descripcion: 'Vigilia de oración y adoración eucarística para toda la comunidad parroquial. Noche de encuentro con el Señor.',
    lugar: 'Iglesia Parroquial',
    hora: '22:00 – 06:00',
    tipo: 'liturgico',
  },
  {
    id: 4,
    fecha: '10',
    mes: 'Jul',
    titulo: 'Cáritas: Reparto de Alimentos',
    descripcion: 'Colabora con Cáritas parroquial en la distribución de alimentos a familias necesitadas del barrio. ¡Tu ayuda es fundamental!',
    lugar: 'Salón parroquial',
    hora: '10:00 – 13:00',
    tipo: 'social',
  },
  {
    id: 5,
    fecha: '20',
    mes: 'Jul',
    titulo: 'Grupo Juvenil: Campamento de Verano',
    descripcion: 'Campamento de fe y aventura para jóvenes de 14 a 20 años. Inscripciones abiertas hasta el 15 de julio.',
    lugar: 'Sierra de Gredos',
    hora: 'Del 20 al 27 de Julio',
    tipo: 'pastoral',
  },
  {
    id: 6,
    fecha: '02',
    mes: 'Ago',
    titulo: 'Concierto de Órgano',
    descripcion: 'Velada musical sacra con obras de Bach, Buxtehude y compositores contemporáneos. Entrada libre hasta completar aforo.',
    lugar: 'Iglesia Parroquial',
    hora: '20:00',
    tipo: 'cultural' as any,
  },
];

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

        <div className="eventos__more">
          <Link to="/eventos" className="btn-gold">
            Ver calendario completo <ArrowRight size={16} />
          </Link>
        </div>

        <div className="eventos__cta">
          <Calendar size={20} />
          <span>¿Tienes un evento parroquial? Contacta con la secretaría para incluirlo en el calendario.</span>
          <Link className="btn-primary" to="/contacto">
            Proponer evento
          </Link>
        </div>
      </div>
    </section>
  );
}
