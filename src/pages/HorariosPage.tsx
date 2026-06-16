import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Horarios from '../sections/Horarios';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

// Wrapper de página completa para /horarios: monta la sección existente
// (autocontenida, con su propio <section id="horarios">) fuera de la home,
// con Navbar/Footer propios. No duplica contenido — Horarios.tsx es la
// única fuente del horario de misas, notaría y librería.
export default function HorariosPage() {
  useRevealOnScroll();
  return (
    <>
      <Navbar />
      <main className="page-standalone">
        <Horarios />
      </main>
      <Footer />
    </>
  );
}
