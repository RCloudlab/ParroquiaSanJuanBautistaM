import './Galeria.css';

const FOTOS = [
  {
    src: '/gallery2.png',
    alt: 'Vista aérea de la Parroquia San Juan Bautista al atardecer',
    caption: 'Nuestra parroquia desde el cielo',
  },
  {
    src: '/interior.png',
    alt: 'Interior de la parroquia durante celebración solemne',
    caption: 'Una celebración que ilumina el alma',
  },
  {
    src: '/gallery.png',
    alt: 'Celebración especial en la parroquia',
    caption: 'Momentos de fe y comunidad',
  },
  {
    src: '/hero-backgorund.png',
    alt: 'Fachada de la Parroquia San Juan Bautista al atardecer',
    caption: 'La torre que guía a nuestra comunidad',
  },
];

export default function Galeria() {
  return (
    <section id="galeria" className="galeria">
      <div className="section-container">
        <h2 className="section-title">Nuestra Parroquia</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Maravatío, Michoacán — Testigos de fe desde hace siglos
        </p>

        <div className="galeria__grid">
          {FOTOS.map((foto, i) => (
            <figure key={i} className={`galeria__item ${i === 0 ? 'galeria__item--featured' : ''}`}>
              <img src={foto.src} alt={foto.alt} className="galeria__img" loading="lazy" />
              <figcaption className="galeria__caption">{foto.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
