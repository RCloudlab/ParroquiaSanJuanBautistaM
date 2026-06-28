import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import './Contacto.css';

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Crea tu formulario en https://formspree.io → New Form → copia el ID aquí
const FORMSPREE_ID = 'TU_FORMSPREE_ID';

interface FormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

type Estado = 'idle' | 'enviando' | 'ok' | 'error';

export default function Contacto() {
  const [form, setForm] = useState<FormData>({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [estado, setEstado] = useState<Estado>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEstado('enviando');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          asunto: form.asunto,
          mensaje: form.mensaje,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setEstado('ok');
      setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
    } catch {
      setEstado('error');
    }
  };

  return (
    <section id="contacto" className="contacto">
      <div className="section-container">
        <h2 className="section-title">Ubicación y Contacto</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Estamos aquí para servirte. No dudes en contactarnos
        </p>

        <div className="contacto__grid">
          {/* Info de contacto */}
          <div className="contacto__info">
            <div className="card contacto__info-card reveal">
              <h3 className="contacto__info-title">Parroquia San Juan Bautista</h3>

              <ul className="contacto__list">
                <li className="contacto__item">
                  <span className="contacto__icon-wrap">
                    <MapPin size={20} />
                  </span>
                  <div>
                    <strong>Dirección</strong>
                    <p>Calle Madero s/n, Colonia Centro<br />Maravatío, Michoacán, México C.P. 61250</p>
                  </div>
                </li>
                <li className="contacto__item">
                  <span className="contacto__icon-wrap">
                    <Phone size={20} />
                  </span>
                  <div>
                    <strong>Teléfono</strong>
                    <p>
                      <a href="tel:+524474782005">447 478 2005</a>
                    </p>
                  </div>
                </li>
                <li className="contacto__item">
                  <span className="contacto__icon-wrap">
                    <Mail size={20} />
                  </span>
                  <div>
                    <strong>Correo electrónico</strong>
                    <p>
                      <a href="mailto:pastoraldemediospsjb@gmail.com">pastoraldemediospsjb@gmail.com</a>
                    </p>
                  </div>
                </li>
                <li className="contacto__item">
                  <span className="contacto__icon-wrap">
                    <Clock size={20} />
                  </span>
                  <div>
                    <strong>Notaría y Librería</strong>
                    <p>Mar–Vie: 9:00 – 14:00 / 16:00 – 19:00<br />Sáb: 9:00 – 13:00 · Dom: 10:00 – 14:00</p>
                  </div>
                </li>
              </ul>

              {/* Redes sociales */}
              <div className="contacto__social">
                <a
                  href="https://www.facebook.com/ParroquiaSanJuanBautistaMaravatioMich"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacto__social-link contacto__social-link--fb"
                  aria-label="Facebook de la parroquia"
                >
                  <IconFacebook />
                  <span>ParroquiaSanJuanBautistaMaravatioMich</span>
                </a>
                <a
                  href="https://www.instagram.com/psjbautistamaravatio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacto__social-link contacto__social-link--ig"
                  aria-label="Instagram de la parroquia"
                >
                  <IconInstagram />
                  <span>@psjbautistamaravatio</span>
                </a>
              </div>
            </div>

            {/* Mapa embebido — Google Maps embed genérico */}
            <div className="contacto__map-wrapper">
              <iframe
                title="Ubicación de la Parroquia San Juan Bautista"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3747.4!2d-100.4498!3d19.9009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842d4b2b2b2b2b2b%3A0x0!2sParroquia%20San%20Juan%20Bautista%2C%20Calle%20Madero%20s%2Fn%2C%20Maravat%C3%ADo%2C%20Mich.!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: 'var(--radius)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className="contacto__map-note">
                Calle Madero s/n, Col. Centro · Maravatío, Michoacán
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="card contacto__form-card reveal" style={{ transitionDelay: '100ms' }}>
            <h3 className="contacto__form-title">
              <Send size={20} /> Envíanos un mensaje
            </h3>

            {estado === 'ok' && (
              <div className="contacto__success">
                ¡Mensaje enviado! Te responderemos a la brevedad. Dios te bendiga.
              </div>
            )}

            {estado === 'error' && (
              <div className="contacto__error">
                Ocurrió un error al enviar. Por favor escríbenos directamente a{' '}
                <a href="mailto:pastoraldemediospsjb@gmail.com">pastoraldemediospsjb@gmail.com</a>
              </div>
            )}

            {estado !== 'ok' && (
              <form onSubmit={handleSubmit} className="contacto__form">
                {/* Honeypot anti-spam: campo oculto que los bots llenan y los humanos no */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div className="contacto__field">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    disabled={estado === 'enviando'}
                  />
                </div>
                <div className="contacto__field">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={estado === 'enviando'}
                  />
                </div>
                <div className="contacto__field">
                  <label htmlFor="asunto">Asunto</label>
                  <select
                    id="asunto"
                    name="asunto"
                    required
                    value={form.asunto}
                    onChange={handleChange}
                    disabled={estado === 'enviando'}
                  >
                    <option value="">Selecciona un asunto…</option>
                    <option value="bautismo">Bautismo</option>
                    <option value="comunion">Primera Comunión / Confirmación</option>
                    <option value="matrimonio">Matrimonio</option>
                    <option value="difuntos">Difuntos</option>
                    <option value="notaria">Notaría / Certificados</option>
                    <option value="eventos">Eventos y actividades</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="contacto__field">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    required
                    placeholder="Escríbenos tu consulta…"
                    value={form.mensaje}
                    onChange={handleChange}
                    disabled={estado === 'enviando'}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary contacto__submit"
                  disabled={estado === 'enviando'}
                >
                  {estado === 'enviando' ? (
                    <><Loader2 size={16} className="contacto__spinner" /> Enviando…</>
                  ) : (
                    <><Send size={16} /> Enviar mensaje</>
                  )}
                </button>
              </form>
            )}

            {estado === 'ok' && (
              <button
                className="btn-gold contacto__retry"
                onClick={() => setEstado('idle')}
              >
                Enviar otro mensaje
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
