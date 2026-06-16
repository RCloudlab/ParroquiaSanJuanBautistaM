import { Outlet, useLocation, Link } from 'react-router-dom';
import { Cross, Scroll, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IconBautismo, IconEucaristia, IconMatrimonio } from '../components/icons/ParishIcons';
import { REQUISITOS } from '../data/requisitos';
import './SacramentosLayout.css';

// Mismo set de íconos que la grilla de la home (Sacramentos.tsx) y que la
// página de detalle, para que la identidad visual de cada sacramento se
// mantenga al navegar entre secciones.
const ICON_SIZE = 22;
const ICONS: Record<string, React.ReactNode> = {
  bautizo: <IconBautismo width={ICON_SIZE} height={ICON_SIZE} />,
  'primera-comunion': <IconEucaristia width={ICON_SIZE} height={ICON_SIZE} />,
  boda: <IconMatrimonio width={ICON_SIZE} height={ICON_SIZE} />,
  difuntos: <Cross size={ICON_SIZE} strokeWidth={1.5} />,
  notaria: <Scroll size={ICON_SIZE} strokeWidth={1.5} />,
};

// Layout persistente de /sacramentos: un sidebar (tabs horizontales en
// móvil) con los 5 sacramentos siempre visibles, más un <Outlet /> donde se
// monta el detalle de cada uno (Sacramento.tsx). Como ambos viven bajo la
// misma ruta padre, cambiar de sacramento solo re-renderiza el panel
// derecho — el menú nunca se desmonta.
export default function SacramentosLayout() {
  // useParams() no sirve aquí: este componente es el padre de la ruta
  // ("/sacramentos"), y el segmento ":id" solo existe en la ruta hija que
  // se monta en el <Outlet />. Leemos el id directo del pathname para
  // saber qué item resaltar en el sidebar.
  const { pathname } = useLocation();
  const activeId = pathname.replace(/^\/sacramentos\/?/, '');

  return (
    <>
      <Navbar />
      <div className="sacramentos-layout page-standalone">
        <div className="sacramentos-layout__inner">
          <Link className="sacramentos-layout__back" to="/#sacramentos">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>

          <div className="sacramentos-layout__body">
            <nav className="sacramentos-layout__sidebar" aria-label="Sacramentos">
              {REQUISITOS.map(s => (
                <Link
                  key={s.id}
                  to={`/sacramentos/${s.id}`}
                  className={`sacramentos-layout__item ${activeId === s.id ? 'sacramentos-layout__item--active' : ''}`}
                  aria-current={activeId === s.id ? 'page' : undefined}
                >
                  <span className="sacramentos-layout__item-icon">{ICONS[s.id]}</span>
                  <span className="sacramentos-layout__item-text">
                    <span className="sacramentos-layout__item-title">{s.titulo}</span>
                    <span className="sacramentos-layout__item-sub">{s.subtitulo}</span>
                  </span>
                </Link>
              ))}
            </nav>

            <div className="sacramentos-layout__panel">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
