import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contacto from '../sections/Contacto';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import Seo from '../components/Seo';

// Wrapper de página completa para /contacto — ver HorariosPage.tsx para el
// criterio (sección existente, autocontenida, montada fuera de la home).
// El navbar enlaza aquí directamente (botón "Contacto" que antes era
// "Vatican News").
export default function ContactoPage() {
  useRevealOnScroll();
  return (
    <>
      <Seo
        titulo="Contacto y Ubicación"
        descripcion="Dirección, teléfono y horarios de oficina de la Parroquia San Juan Bautista. Escríbenos o visítanos."
      />
      <Navbar />
      <main className="page-standalone">
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
