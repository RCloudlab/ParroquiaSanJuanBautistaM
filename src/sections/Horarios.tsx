import { Link } from 'react-router-dom';
import { Clock, BookOpen, FileText, ArrowRight } from 'lucide-react';
import './Horarios.css';

interface MisaRow {
  dia: string;
  horas: string[];
}

const MISAS: MisaRow[] = [
  { dia: 'Lunes',     horas: ['07:00', '19:00'] },
  { dia: 'Martes',    horas: ['07:00', '19:00'] },
  { dia: 'Miércoles', horas: ['07:00', '19:00'] },
  { dia: 'Jueves',    horas: ['07:00', '19:00'] },
  { dia: 'Viernes',   horas: ['07:00', '19:00'] },
  { dia: 'Sábado',    horas: ['08:00', '12:00', '19:00'] },
  { dia: 'Domingo',   horas: ['07:00', '09:00', '11:00', '13:00', '19:00'] },
];

const NOTARIA = [
  { dia: 'Lunes – Viernes', horario: '09:00 – 14:00 / 16:00 – 19:00' },
  { dia: 'Sábado',          horario: '09:00 – 13:00' },
  { dia: 'Domingo',         horario: 'Cerrado' },
];

const LIBRERIA = [
  { dia: 'Lunes – Viernes', horario: '09:00 – 14:00 / 16:00 – 18:30' },
  { dia: 'Sábado',          horario: '10:00 – 13:00' },
  { dia: 'Domingo',         horario: 'Cerrado' },
];

export default function Horarios() {
  return (
    <section id="horarios" className="horarios">
      <div className="section-container">
        <h2 className="section-title">Horarios de Misas y Servicios</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          «Venid a mí todos los que estáis cansados y agobiados» — Mt 11,28
        </p>

        <div className="horarios__grid">
          {/* Tabla de misas */}
          <div className="card horarios__card-misas reveal">
            <div className="horarios__card-header">
              <Clock size={22} className="horarios__icon" />
              <h3>Horario de Misas</h3>
            </div>
            <table className="horarios__table">
              <thead>
                <tr>
                  <th>Día</th>
                  <th>Horas</th>
                </tr>
              </thead>
              <tbody>
                {MISAS.map(row => (
                  <tr key={row.dia} className={row.dia === 'Domingo' ? 'horarios__row--highlight' : ''}>
                    <td className="horarios__dia">{row.dia}</td>
                    <td className="horarios__horas">
                      {row.horas.map(h => (
                        <span key={h} className="horarios__hora-badge">{h}</span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="horarios__note">
              * Los horarios pueden variar en días festivos. Consulta el tablón de avisos.
            </p>
          </div>

          {/* Notaría y Librería */}
          <div className="horarios__side">
            <div className="card horarios__card-notaria reveal">
              <div className="horarios__card-header">
                <FileText size={22} className="horarios__icon" />
                <h3>Notaría Parroquial</h3>
              </div>
              <p className="horarios__side-desc">
                Tramitación de certificados de bautismo, confirmación, matrimonio y defunción.
              </p>
              <ul className="horarios__schedule-list">
                {NOTARIA.map(n => (
                  <li key={n.dia} className="horarios__schedule-item">
                    <span className="horarios__schedule-day">{n.dia}</span>
                    <span className="horarios__schedule-time">{n.horario}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card horarios__card-libreria reveal">
              <div className="horarios__card-header">
                <BookOpen size={22} className="horarios__icon" />
                <h3>Librería / Tienda Religiosa</h3>
              </div>
              <p className="horarios__side-desc">
                Biblias, rosarios, medallas, velas y artículos religiosos para toda la familia.
              </p>
              <ul className="horarios__schedule-list">
                {LIBRERIA.map(n => (
                  <li key={n.dia} className="horarios__schedule-item">
                    <span className="horarios__schedule-day">{n.dia}</span>
                    <span className="horarios__schedule-time">{n.horario}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="horarios__cta">
          <Link to="/horarios" className="btn-gold">
            Ver horario completo <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
