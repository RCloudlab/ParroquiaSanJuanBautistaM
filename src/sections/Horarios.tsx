import { Link } from 'react-router-dom';
import { Clock, BookOpen, FileText, ArrowRight, Tv2, Radio } from 'lucide-react';
import './Horarios.css';

interface HoraMisa {
  hora: string;
  meridiano: 'am' | 'pm';
  envivo?: boolean;
  etiqueta?: string; // texto destacado junto a la hora (p. ej. "Pro pópulo")
}

interface TurnoMisa {
  etiqueta: 'Mañana' | 'Tarde';
  horas: HoraMisa[];
}

interface MisaRow {
  dia: string;
  turnos: TurnoMisa[];
  destacado?: boolean;
}

const MISAS: MisaRow[] = [
  {
    dia: 'Lunes a Viernes',
    turnos: [
      { etiqueta: 'Mañana', horas: [{ hora: '7:00', meridiano: 'am' }] },
      { etiqueta: 'Tarde',  horas: [{ hora: '7:00', meridiano: 'pm' }] },
    ],
  },
  {
    dia: 'Sábado',
    turnos: [
      { etiqueta: 'Mañana', horas: [{ hora: '7:00', meridiano: 'am' }] },
      { etiqueta: 'Tarde',  horas: [{ hora: '8:00', meridiano: 'pm' }] },
    ],
  },
  {
    dia: 'Domingo',
    destacado: true,
    turnos: [
      {
        etiqueta: 'Mañana',
        horas: [
          { hora: '6:00',  meridiano: 'am' },
          { hora: '7:00',  meridiano: 'am' },
          { hora: '8:00',  meridiano: 'am', envivo: true },
          { hora: '9:00',  meridiano: 'am' },
          { hora: '11:00', meridiano: 'am' },
        ],
      },
      {
        etiqueta: 'Tarde',
        horas: [
          { hora: '12:00', meridiano: 'pm', etiqueta: 'Pro pópulo' },
          { hora: '1:00',  meridiano: 'pm' },
          { hora: '6:00',  meridiano: 'pm' },
        ],
      },
    ],
  },
];

const FACEBOOK_URL = 'https://www.facebook.com/ParroquiaSanJuanBautistaMaravatioMich';
const RADIO_URL = 'https://www.facebook.com/RadioSensitiva88.3Fm';

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
  { medio: 'Facebook',        detalle: 'Domingo · 8:00 am',  tipo: 'facebook' as const, url: FACEBOOK_URL },
  { medio: 'Radio Sensitiva', detalle: 'Domingo · 10:00 am', tipo: 'radio' as const,    url: RADIO_URL },
];

// mostrarCta: el botón "Ver horario completo" solo tiene sentido fuera de
// /horarios (en la home); la página standalone lo apaga.
export default function Horarios({ mostrarCta = true }: { mostrarCta?: boolean }) {
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
            <div className="horarios__dias">
              {MISAS.map(row => (
                <div
                  key={row.dia}
                  className={`horarios__dia-bloque${row.destacado ? ' horarios__dia-bloque--destacado' : ''}`}
                >
                  <div className="horarios__dia-nombre">
                    <span>{row.dia}</span>
                    {row.destacado && <span className="horarios__dia-tag">Día del Señor</span>}
                  </div>
                  <div className="horarios__turnos">
                    {row.turnos.map(turno => (
                      <div key={turno.etiqueta} className="horarios__turno">
                        <span className="horarios__turno-etiqueta">{turno.etiqueta}</span>
                        <div className="horarios__turno-horas">
                          {turno.horas.map(h =>
                            h.envivo ? (
                              <a
                                key={`${h.hora}-${h.meridiano}`}
                                href={FACEBOOK_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="horarios__hora-chip horarios__hora-chip--envivo"
                                aria-label={`Misa de ${h.hora} ${h.meridiano} transmitida en vivo por Facebook`}
                                title="Ver transmisión en Facebook"
                              >
                                <span className="horarios__hora-num">{h.hora}</span>
                                <span className="horarios__hora-mer">{h.meridiano}</span>
                                <span className="horarios__envivo-tag">
                                  <span className="horarios__envivo-dot" />
                                  En vivo
                                </span>
                              </a>
                            ) : h.etiqueta ? (
                              <span
                                key={`${h.hora}-${h.meridiano}`}
                                className="horarios__hora-chip horarios__hora-chip--envivo horarios__hora-chip--etiqueta"
                                aria-label={`Misa de ${h.hora} ${h.meridiano}, ${h.etiqueta}`}
                              >
                                <span className="horarios__hora-num">{h.hora}</span>
                                <span className="horarios__hora-mer">{h.meridiano}</span>
                                <span className="horarios__envivo-tag">{h.etiqueta}</span>
                              </span>
                            ) : (
                              <span key={`${h.hora}-${h.meridiano}`} className="horarios__hora-chip">
                                <span className="horarios__hora-num">{h.hora}</span>
                                <span className="horarios__hora-mer">{h.meridiano}</span>
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

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
                  <li key={t.medio} className="horarios__schedule-item">
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="horarios__schedule-day horarios__medio horarios__medio--link"
                      title={`Abrir la página de ${t.medio} en Facebook`}
                    >
                      {t.tipo === 'facebook' ? (
                        <Tv2 size={15} className="horarios__medio-icon" />
                      ) : (
                        <Radio size={15} className="horarios__medio-icon" />
                      )}
                      {t.medio}
                    </a>
                    <span className="horarios__schedule-time">{t.detalle}</span>
                  </li>
                ))}
              </ul>
              <p className="horarios__note">
                La misa de 8:00 am se transmite en vivo por{' '}
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="horarios__fb-link"
                >
                  Facebook
                </a>
                {' '}y a las 10:00 am por{' '}
                <a
                  href={RADIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="horarios__radio horarios__radio--link"
                >
                  <Radio size={14} className="horarios__radio-icon" />
                  Radio Sensitiva
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

        {mostrarCta && (
          <div className="horarios__cta">
            <Link to="/horarios" className="btn-gold">
              Ver horario completo <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
