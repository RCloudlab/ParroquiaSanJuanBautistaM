import { Link } from 'react-router-dom';
import { Clock, BookOpen, FileText, ArrowRight, Tv2 } from 'lucide-react';
import './Horarios.css';

interface MisaRow {
  dia: string;
  horas: string[];
  nota?: string;
}

const MISAS: MisaRow[] = [
  { dia: 'Lunes a Viernes', horas: ['7:00 am', '7:00 pm'] },
  { dia: 'Sábado',          horas: ['7:00 am', '8:00 pm'] },
  {
    dia: 'Domingo',
    horas: ['6:00', '7:00', '8:00', '9:00', '11:00 am'],
    nota: '12 md "Misa Pro Pópulo" · 1:00 pm · 6:00 pm',
  },
];

const CONFESIONES = [
  { dia: 'Lunes a Viernes', horario: 'Durante las misas de 7:00 am y 7:00 pm' },
];

const NOTARIA = [
  { dia: 'Lunes',          horario: 'No hay servicio' },
  { dia: 'Martes a Viernes', horario: '9:00 am – 2:00 pm / 4:00 – 7:00 pm' },
  { dia: 'Sábado',         horario: '9:00 am – 1:00 pm' },
  { dia: 'Domingo',        horario: '10:00 am – 2:00 pm' },
];

const LIBRERIA = [
  { dia: 'Lunes',          horario: 'No hay servicio' },
  { dia: 'Martes a Viernes', horario: '9:00 am – 2:00 pm / 4:00 – 7:00 pm' },
  { dia: 'Sábado',         horario: '9:00 am – 1:00 pm' },
  { dia: 'Domingo',        horario: '10:00 am – 2:00 pm' },
];

const TRANSMISIONES = [
  { dia: 'Domingo', horario: '9:00 am y 12:00 del medio día' },
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
              <h3>Santa Misa</h3>
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
                      {row.nota && <span className="horarios__hora-nota">{row.nota}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Confesiones */}
            <div className="horarios__confesiones">
              <div className="horarios__card-header horarios__card-header--sub">
                <FileText size={18} className="horarios__icon" />
                <h4>Confesiones</h4>
              </div>
              <ul className="horarios__schedule-list">
                {CONFESIONES.map(c => (
                  <li key={c.dia} className="horarios__schedule-item">
                    <span className="horarios__schedule-day">{c.dia}</span>
                    <span className="horarios__schedule-time">{c.horario}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Transmisiones en vivo */}
            <div className="horarios__confesiones">
              <div className="horarios__card-header horarios__card-header--sub">
                <Tv2 size={18} className="horarios__icon" />
                <h4>Transmisiones de Misa</h4>
              </div>
              <ul className="horarios__schedule-list">
                {TRANSMISIONES.map(t => (
                  <li key={t.dia} className="horarios__schedule-item">
                    <span className="horarios__schedule-day">{t.dia}</span>
                    <span className="horarios__schedule-time">{t.horario}</span>
                  </li>
                ))}
              </ul>
              <p className="horarios__note">
                En vivo por{' '}
                <a
                  href="https://www.facebook.com/ParroquiaSanJuanBautistaMaravatioMich"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="horarios__fb-link"
                >
                  Facebook
                </a>
              </p>
            </div>

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
                  <li key={n.dia} className={`horarios__schedule-item${n.horario === 'No hay servicio' ? ' horarios__schedule-item--closed' : ''}`}>
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
                  <li key={n.dia} className={`horarios__schedule-item${n.horario === 'No hay servicio' ? ' horarios__schedule-item--closed' : ''}`}>
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
