import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import './Contacto.css';

interface FormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

export default function Contacto() {
  const [form, setForm] = useState<FormData>({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — conectar con backend / EmailJS / Formspree
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
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
                    <p>Calle de la Parroquia, 1<br />28001 – Tu Ciudad, España</p>
                  </div>
                </li>
                <li className="contacto__item">
                  <span className="contacto__icon-wrap">
                    <Phone size={20} />
                  </span>
                  <div>
                    <strong>Teléfono</strong>
                    <p>
                      <a href="tel:+34900000000">+34 900 000 000</a><br />
                      <span className="contacto__note">Urgencias 24h disponible</span>
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
                      <a href="mailto:parrquia@sjbautista.es">parroquia@sjbautista.es</a>
                    </p>
                  </div>
                </li>
                <li className="contacto__item">
                  <span className="contacto__icon-wrap">
                    <Clock size={20} />
                  </span>
                  <div>
                    <strong>Secretaría</strong>
                    <p>Lun–Vie: 9:00 – 14:00 / 16:00 – 19:00<br />Sáb: 9:00 – 13:00</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Mapa embebido — Google Maps embed genérico */}
            <div className="contacto__map-wrapper">
              <iframe
                title="Ubicación de la Parroquia San Juan Bautista"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12141.556!2d-3.7037902!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid%2C%20Spain!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: 'var(--radius)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className="contacto__map-note">
                * Reemplaza el enlace del mapa con la ubicación exacta de tu parroquia
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="card contacto__form-card reveal" style={{ transitionDelay: '100ms' }}>
            <h3 className="contacto__form-title">
              <Send size={20} /> Envíanos un mensaje
            </h3>

            {sent && (
              <div className="contacto__success">
                ¡Mensaje enviado! Te responderemos a la brevedad. Dios te bendiga.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contacto__form">
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
                />
              </div>
              <button type="submit" className="btn-primary contacto__submit">
                <Send size={16} />
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
