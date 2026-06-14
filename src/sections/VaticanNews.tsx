import { Rss, Globe } from 'lucide-react';
import './VaticanNews.css';

export default function VaticanNews() {
  return (
    <section id="vatican-news" className="vatican-news">
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

        {/* Widget oficial de Vatican News */}
        <div className="vatican-news__widget-wrapper">
          <div className="vatican-news__rss-note">
            <Rss size={16} />
            <span>
              Contenido proporcionado por{' '}
              <a
                href="https://www.vaticannews.va/es.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vatican News
              </a>{' '}
              — Medio oficial del Vaticano
            </span>
          </div>

          {/* Script embed de Vatican News */}
          <div
            className="vatican-news__embed"
            dangerouslySetInnerHTML={{
              __html: `
                <div id="vn-widget-container">
                  <script
                    src="https://www.vaticannews.va/es/widget/news.js"
                    data-lang="es"
                    data-category="church"
                    data-num="6"
                    type="text/javascript"
                    async
                  ></script>
                  <noscript>
                    <p style="text-align:center;color:#6B6560;padding:2rem;">
                      Para ver las noticias de Vatican News activa JavaScript en tu navegador.
                    </p>
                  </noscript>
                </div>
              `,
            }}
          />

          {/* Fallback visual mientras carga */}
          <div className="vatican-news__fallback">
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
            <p className="vatican-news__fallback-text">
              Accede a las secciones de Vatican News para mantenerte informado sobre la vida de la Iglesia universal.
            </p>
            <a
              className="btn-gold"
              href="https://www.vaticannews.va/es.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ir a Vatican News
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
