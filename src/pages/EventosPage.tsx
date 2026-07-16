import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Eventos from '../sections/Eventos';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import Seo from '../components/Seo';

// Wrapper de página completa para /eventos — ver HorariosPage.tsx para el
// criterio (sección existente, autocontenida, montada fuera de la home).
export default function EventosPage() {
  useRevealOnScroll();
  return (
    <>
      <Seo
        titulo="Eventos y Avisos"
        descripcion="Calendario de eventos, fiestas patronales, retiros y avisos de la comunidad de la Parroquia San Juan Bautista."
      />
      <Navbar />
      <main className="page-standalone">
        <Eventos />
      </main>
      <Footer />
    </>
  );
}
