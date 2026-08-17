import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';
import Hero from './sections/Hero';
import Horarios from './sections/Horarios';
import EvangelioDia from './sections/EvangelioDia';
import RezaRosario from './sections/RezaRosario';
import Eventos from './sections/Eventos';
import Galeria from './sections/Galeria';
import VaticanNews from './sections/VaticanNews';
import VirgenDolores from './sections/VirgenDolores';
import Contacto from './sections/Contacto';
import SacramentosLayout from './pages/SacramentosLayout';
import Sacramento from './pages/Sacramento';
import Historia from './pages/Historia';
import GaleriaPage from './pages/GaleriaPage';
import VirgenDoloresPage from './pages/VirgenDoloresPage';
import HorariosPage from './pages/HorariosPage';
import EvangelioPage from './pages/EvangelioPage';
import EventosPage from './pages/EventosPage';
import ContactoPage from './pages/ContactoPage';
import CapillasPage from './pages/CapillasPage';
import { REQUISITOS } from './data/requisitos';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import Seo from './components/Seo';

// La sección del rosario se carga bajo demanda (code splitting): sus textos
// y componentes no pesan en el bundle inicial de quien solo visita el home.
const RosarioPage = lazy(() => import('./pages/RosarioPage'));
const RosarioGuiado = lazy(() => import('./pages/RosarioGuiado'));
const RosarioContador = lazy(() => import('./pages/RosarioContador'));
const RosarioLibro = lazy(() => import('./pages/RosarioLibro'));

// React Router conserva la posición de scroll al cambiar de ruta; esto hace
// que cada página nueva abra siempre desde arriba. 'instant' evita que el
// scroll-behavior: smooth global anime el salto entre páginas.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function Home() {
  useRevealOnScroll();

  return (
    <>
      <Seo
        titulo="Parroquia Católica en Morelia"
        descripcion="Horarios de misas y confesiones, sacramentos, eventos y contacto de la Parroquia San Juan Bautista. Te esperamos con las puertas abiertas."
      />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider tone="cream" />
        <Horarios />
        <VirgenDolores />
        <SectionDivider tone="cream" />
        <EvangelioDia />
        <RezaRosario />
        <SectionDivider tone="dark" />
        <Eventos />
        <SectionDivider tone="dark" />
        <Galeria />
        <VaticanNews />
        <SectionDivider tone="cream" />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Suspense fallback={null}>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/historia" element={<Historia />} />
      <Route path="/horarios" element={<HorariosPage />} />
      <Route path="/evangelio" element={<EvangelioPage />} />
      <Route path="/virgen-de-los-dolores" element={<VirgenDoloresPage />} />
      <Route path="/eventos" element={<EventosPage />} />
      <Route path="/galeria" element={<GaleriaPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/capillas" element={<CapillasPage />} />
      <Route path="/rosario" element={<RosarioPage />} />
      <Route path="/rosario/guiado" element={<RosarioGuiado />} />
      <Route path="/rosario/contador" element={<RosarioContador />} />
      <Route path="/rosario/libro" element={<RosarioLibro />} />
      <Route path="/sacramentos" element={<SacramentosLayout />}>
        <Route index element={<Navigate to={`/sacramentos/${REQUISITOS[0].id}`} replace />} />
        <Route path=":id" element={<Sacramento />} />
      </Route>
    </Routes>
    </Suspense>
  );
}
