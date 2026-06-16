import { useParams, Link } from 'react-router-dom';
import { Cross, Scroll } from 'lucide-react';
import { IconBautismo, IconEucaristia, IconMatrimonio } from '../components/icons/ParishIcons';
import { getRequisito } from '../data/requisitos';
import './Sacramento.css';

// Mismo set de íconos que la grilla de la home (Sacramentos.tsx) y el
// sidebar (SacramentosLayout.tsx), para que la identidad visual de cada
// sacramento se mantenga al navegar entre secciones.
const ICON_SIZE = 28;
const ICONS: Record<string, React.ReactNode> = {
  bautizo: <IconBautismo width={ICON_SIZE} height={ICON_SIZE} />,
  'primera-comunion': <IconEucaristia width={ICON_SIZE} height={ICON_SIZE} />,
  boda: <IconMatrimonio width={ICON_SIZE} height={ICON_SIZE} />,
  difuntos: <Cross size={ICON_SIZE} strokeWidth={1.5} />,
  notaria: <Scroll size={ICON_SIZE} strokeWidth={1.5} />,
};

// Panel de detalle de un sacramento, montado dentro del <Outlet /> de
// SacramentosLayout (que aporta el sidebar/tabs persistente y el botón de
// volver al inicio). Este componente ya no es una página de pantalla
// completa por sí mismo.
export default function Sacramento() {
  const { id } = useParams<{ id: string }>();
  const data = id ? getRequisito(id) : undefined;

  if (!data) {
    return (
      <div className="sacramento-card sacramento-card--notfound">
        <h1>Sacramento no encontrado</h1>
        <p>No se encontró información para este sacramento.</p>
      </div>
    );
  }

  return (
    <div className="sacramento-card">
      <header className="sacramento-header">
        <div className="sacramento-icon">{ICONS[data.id]}</div>
        <p className="sacramento-parroquia">Parroquia de San Juan Bautista — Maravatío, Mich.</p>
        <h1>{data.titulo}</h1>
        <p className="sacramento-subtitulo">{data.subtitulo}</p>
      </header>

      <div className="gold-divider" />

      <p className="sacramento-desc">{data.descripcion}</p>

      <h2 className="sacramento-section-label">Requisitos y pasos</h2>
      <ul className="sacramento-lista">
        {data.requisitos.map((r, i) => (
          <li key={i}>
            <span className="sacramento-bullet">✦</span>
            {r}
          </li>
        ))}
      </ul>

      {data.notas && data.notas.length > 0 && (
        <div className="sacramento-notas">
          {data.notas.map((n, i) => (
            <p key={i}>{n}</p>
          ))}
        </div>
      )}

      <div className="sacramento-contacto">
        <span className="sacramento-contacto-label">Contacto / Horario</span>
        <span>{data.contacto}</span>
      </div>

      <Link className="sacramento-volver" to="/#contacto">
        ¿Tienes dudas? Contáctanos →
      </Link>
    </div>
  );
}
