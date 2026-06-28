import { Link } from 'react-router-dom';
import { Cross, Scroll, ArrowRight } from 'lucide-react';
import { IconBautismo, IconEucaristia, IconConfirmacion, IconMatrimonio } from '../components/icons/ParishIcons';
import { REQUISITOS } from '../data/requisitos';
import './Sacramentos.css';

// Los textos completos (descripción, requisitos, contacto) viven en la
// página de detalle /sacramentos/:id — aquí solo mostramos una tarjeta de
// acceso por cada tipo, usando la misma fuente de datos (../data/requisitos).
// Para bautizo/primera-comunion/boda usamos el set de iconos propio de la
// parroquia (line-art, ../components/icons/ParishIcons); difuntos y notaría
// no tienen equivalente en ese set todavía, así que siguen con lucide-react.
const ICON_SIZE = 32;
const ICONS: Record<string, React.ReactNode> = {
  bautizo: <IconBautismo width={ICON_SIZE} height={ICON_SIZE} />,
  'primera-comunion': <IconEucaristia width={ICON_SIZE} height={ICON_SIZE} />,
  confirmacion: <IconConfirmacion width={ICON_SIZE} height={ICON_SIZE} />,
  boda: <IconMatrimonio width={ICON_SIZE} height={ICON_SIZE} />,
  difuntos: <Cross size={ICON_SIZE} strokeWidth={1.5} />,
  notaria: <Scroll size={ICON_SIZE} strokeWidth={1.5} />,
};

export default function Sacramentos() {
  return (
    <section id="sacramentos" className="sacramentos">
      <div className="section-container">
        <h2 className="section-title">Sacramentos e Información</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Los sacramentos son signos eficaces de la gracia, instituidos por Cristo
        </p>

        <div className="sacramentos__grid">
          {REQUISITOS.map((s, i) => (
            <Link
              key={s.id}
              to={`/sacramentos/${s.id}`}
              className="card sacramentos__card reveal"
              style={{ transitionDelay: `${Math.min(i, 4) * 60}ms` }}
            >
              <div className="sacramentos__card-icon">{ICONS[s.id]}</div>
              <h3 className="sacramentos__card-title">{s.titulo}</h3>
              <p className="sacramentos__card-sub">{s.subtitulo}</p>
              <span className="sacramentos__card-link">
                Ver información <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
