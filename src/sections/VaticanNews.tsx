import { useEffect, useState } from 'react';
import { Rss, Globe, AlertCircle, ExternalLink } from 'lucide-react';
import './VaticanNews.css';

interface NoticiaVatican {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
}

// Vatican News no ofrece un widget JS embebible; usamos su RSS oficial
// (sin CORS) pasado por rss2json para poder consumirlo desde el navegador.
// Nota: el parámetro "count" de rss2json requiere API key; sin él (plan
// gratuito) la API siempre devuelve el feed completo y recortamos en cliente.
const RSS_URL = 'https://www.vaticannews.va/es.rss.xml';
const PROXY_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
const MAX_NOTICIAS = 6;

function limpiarDescripcion(html: string): string {
  const texto = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return texto.length > 140 ? `${texto.slice(0, 140)}…` : texto;
}

function formatearFecha(fecha: string): string {
  const d = new Date(fecha.replace(' ', 'T'));
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

export default function VaticanNews() {
  const [noticias, setNoticias] = useState<NoticiaVatican[]>([]);
  const [estado, setEstado] = useState<'cargando' | 'ok' | 'error'>('cargando');

  useEffect(() => {
    let cancelado = false;

    fetch(PROXY_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (cancelado) return;
        if (data.status !== 'ok' || !Array.isArray(data.items)) {
          throw new Error('Respuesta inválida');
        }
        setNoticias(data.items.slice(0, MAX_NOTICIAS));
        setEstado('ok');
      })
      .catch(() => {
        if (!cancelado) setEstado('error');
      });

    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <section id="vatican-news" className="vatican-news">
      {/* Cabecera con imagen propia de la parroquia (generada por
          scripts/optimize-images.mjs) en vez de fondo liso — da identidad
          visual propia a la sección antes del contenido externo del RSS. */}
      <div className="vatican-news__banner">
        <img
          src="/optimized/san-juan-961.webp"
          srcSet="/optimized/san-juan-480.webp 480w, /optimized/san-juan-961.webp 961w"
          sizes="100vw"
          alt="San Juan Bautista, patrono de la parroquia"
          className="vatican-news__banner-img"
          loading="lazy"
        />
        <div className="vatican-news__banner-scrim" />
      </div>

      <div className="section-container">
        <div className="vatican-news__header">
          <div className="vatican-news__logo-area">
            <Globe size={28} className="vatican-news__globe-icon" />
            <div>
              <h2 className="section-title vatican-news__title">Vatican News</h2>
              <p className="vatican-news__byline">Noticias oficiales de la Santa Sede</p>
            </div>
          </div>
          <div className="gold-divider" style={{ margin: '1rem auto 2rem' }} />
        </div>

        <div className="vatican-news__widget-wrapper">
          <div className="vatican-news__rss-note">
            <Rss size={16} />
            <span>
              Contenido proporcionado por{' '}
              <a href="https://www.vaticannews.va/es.html" target="_blank" rel="noopener noreferrer">
                Vatican News
              </a>{' '}
              — Medio oficial del Vaticano
            </span>
          </div>

          {estado === 'cargando' && (
            <div className="vatican-news__loading">
              {[0, 1, 2].map(i => (
                <div key={i} className="vatican-news__skeleton-card" />
              ))}
            </div>
          )}

          {estado === 'ok' && (
            <div className="vatican-news__grid">
              {noticias.map(n => (
                <a
                  key={n.link}
                  className="vatican-news__card"
                  href={n.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {n.thumbnail && (
                    <div className="vatican-news__card-img">
                      <img src={n.thumbnail} alt="" loading="lazy" />
                    </div>
                  )}
                  <div className="vatican-news__card-body">
                    {formatearFecha(n.pubDate) && (
                      <span className="vatican-news__card-date">{formatearFecha(n.pubDate)}</span>
                    )}
                    <h3 className="vatican-news__card-title">{n.title}</h3>
                    <p className="vatican-news__card-desc">{limpiarDescripcion(n.description)}</p>
                    <span className="vatican-news__card-link">
                      Leer más <ExternalLink size={12} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {estado === 'error' && (
            <div className="vatican-news__fallback">
              <div className="vatican-news__error-note">
                <AlertCircle size={18} />
                <span>No se pudieron cargar las noticias en este momento.</span>
              </div>
              <div className="vatican-news__fallback-cards">
                {[
                  { label: 'Papa Francisco', url: 'https://www.vaticannews.va/es/papa.html' },
                  { label: 'Iglesia', url: 'https://www.vaticannews.va/es/iglesia.html' },
                  { label: 'Mundo', url: 'https://www.vaticannews.va/es/mundo.html' },
                  { label: 'Vaticano', url: 'https://www.vaticannews.va/es/vaticano.html' },
                ].map(cat => (
                  <a
                    key={cat.label}
                    className="vatican-news__cat-link"
                    href={cat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe size={20} />
                    <span>{cat.label}</span>
                  </a>
                ))}
              </div>
              <a className="btn-gold" href="https://www.vaticannews.va/es.html" target="_blank" rel="noopener noreferrer">
                Ir a Vatican News
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
