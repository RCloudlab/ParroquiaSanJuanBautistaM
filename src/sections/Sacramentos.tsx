import { useState } from 'react';
import { Droplets, Heart, Star, Cross, Scroll } from 'lucide-react';
import './Sacramentos.css';

interface Sacramento {
  id: string;
  icon: React.ReactNode;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  requisitos: string[];
  contacto: string;
}

const SACRAMENTOS: Sacramento[] = [
  {
    id: 'bautizo',
    icon: <Droplets size={32} strokeWidth={1.5} />,
    titulo: 'Bautismo',
    subtitulo: 'El primer sacramento de la vida cristiana',
    descripcion:
      'El bautismo incorpora al cristiano en la Iglesia y borra el pecado original. Celebramos el bautismo de infantes y adultos con toda la solemnidad que merece este sacramento.',
    requisitos: [
      'Solicitar cita en la notaría parroquial',
      'Carta de compromiso de los padres padrinos',
      'Fotocopia del acta de nacimiento del bautizando',
      'Asistir al curso prebautismal (2 sesiones)',
      'Al menos uno de los padres debe ser católico bautizado',
    ],
    contacto: 'Notaría parroquial: Lun–Vie 9–14h',
  },
  {
    id: 'primera-comunion',
    icon: <Star size={32} strokeWidth={1.5} />,
    titulo: 'Primera Comunión y Confirmación',
    subtitulo: 'Sacramentos de iniciación cristiana',
    descripcion:
      'La Primera Comunión y la Confirmación son sacramentos de madurez en la fe. La preparación catequética ayuda a los jóvenes a acoger el Espíritu Santo y comprometerse con la comunidad.',
    requisitos: [
      'Haber recibido el bautismo',
      'Inscripción en catequesis (inicio en octubre)',
      'Edad mínima: 8 años para Primera Comunión, 14 para Confirmación',
      'Asistencia regular a la Misa dominical',
      'Participar en las convivencias de preparación',
    ],
    contacto: 'Secretaría de catequesis: Sábados 10–12h',
  },
  {
    id: 'boda',
    icon: <Heart size={32} strokeWidth={1.5} />,
    titulo: 'Matrimonio',
    subtitulo: 'Sacramento del amor y la alianza',
    descripcion:
      'El matrimonio cristiano es un sacramento permanente y fructífero. Acompañamos a las parejas desde la preparación hasta la celebración de su Misa nupcial.',
    requisitos: [
      'Solicitar fecha con al menos 6 meses de antelación',
      'Ambos contrayentes bautizados en la Iglesia Católica',
      'Partidas de bautismo recientes (menos de 6 meses)',
      'Curso prematrimonial (obligatorio)',
      'DNI de los contrayentes y testigos',
    ],
    contacto: 'Notaría: con cita previa — cita@parroquiasjb.es',
  },
  {
    id: 'difuntos',
    icon: <Cross size={32} strokeWidth={1.5} />,
    titulo: 'Difuntos',
    subtitulo: 'Acompañamiento en el dolor y la esperanza',
    descripcion:
      'La Iglesia acompaña a las familias en el camino de despedida. Celebramos funerales, misas de aniversario y el sufragio por las almas del purgatorio.',
    requisitos: [
      'Contactar a la parroquia a la brevedad posible',
      'Certificado de defunción',
      'Indicar si se desea misa de cuerpo presente o posterior',
      'Se pueden solicitar misas de aniversario en cualquier momento',
    ],
    contacto: 'Urgencias: disponible las 24h — Tel. 900 000 000',
  },
  {
    id: 'notaria',
    icon: <Scroll size={32} strokeWidth={1.5} />,
    titulo: 'Notaría Parroquial',
    subtitulo: 'Certificados y gestiones eclesiásticas',
    descripcion:
      'La notaría parroquial emite certificados de los sacramentos administrados en esta parroquia: bautismo, confirmación, matrimonio y defunción.',
    requisitos: [
      'Certificados de bautismo, confirmación y matrimonio',
      'Inscripciones marginales (matrimonio, confirmación)',
      'Certificados para procesos de nulidad matrimonial',
      'Solicitudes con DNI del interesado o familiar directo',
    ],
    contacto: 'Lun–Vie: 9:00–14:00 / 16:00–19:00 · Sáb: 9:00–13:00',
  },
];

export default function Sacramentos() {
  const [active, setActive] = useState<string>('bautizo');
  const current = SACRAMENTOS.find(s => s.id === active)!;

  return (
    <section id="sacramentos" className="sacramentos">
      <div className="section-container">
        <h2 className="section-title">Sacramentos e Información</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Los sacramentos son signos eficaces de la gracia, instituidos por Cristo
        </p>

        {/* Tabs */}
        <div className="sacramentos__tabs" role="tablist">
          {SACRAMENTOS.map(s => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === s.id}
              className={`sacramentos__tab ${active === s.id ? 'sacramentos__tab--active' : ''}`}
              onClick={() => setActive(s.id)}
            >
              <span className="sacramentos__tab-icon">{s.icon}</span>
              <span className="sacramentos__tab-label">{s.titulo}</span>
            </button>
          ))}
        </div>

        {/* Panel activo */}
        <div className="sacramentos__panel card" role="tabpanel">
          <div className="sacramentos__panel-header">
            <div className="sacramentos__panel-icon">{current.icon}</div>
            <div>
              <h3 className="sacramentos__panel-title">{current.titulo}</h3>
              <p className="sacramentos__panel-sub">{current.subtitulo}</p>
            </div>
          </div>

          <p className="sacramentos__panel-desc">{current.descripcion}</p>

          <div className="sacramentos__panel-body">
            <div className="sacramentos__requisitos">
              <h4>Requisitos y pasos</h4>
              <ul>
                {current.requisitos.map((r, i) => (
                  <li key={i}>
                    <span className="sacramentos__bullet">✦</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sacramentos__contacto-box">
              <p className="sacramentos__contacto-label">Contacto / Horario</p>
              <p className="sacramentos__contacto-val">{current.contacto}</p>
              <a className="btn-primary" href="#contacto" onClick={e => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Solicitar información
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
