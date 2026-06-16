import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Eventos from '../sections/Eventos';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

// Wrapper de página completa para /eventos — ver HorariosPage.tsx para el
// criterio (sección existente, autocontenida, montada fuera de la home).
export default function EventosPage() {
  useRevealOnScroll();
  return (
    <>
      <Navbar />
      <main className="page-standalone">
        <Eventos />
      </main>
      <Footer />
    </>
  );
}
