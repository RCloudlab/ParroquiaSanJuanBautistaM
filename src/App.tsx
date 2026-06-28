import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';
import Hero from './sections/Hero';
import Horarios from './sections/Horarios';
import Sacramentos from './sections/Sacramentos';
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
import EventosPage from './pages/EventosPage';
import ContactoPage from './pages/ContactoPage';
import CapillasPage from './pages/CapillasPage';
import { REQUISITOS } from './data/requisitos';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';

function Home() {
  useRevealOnScroll();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionDivider tone="cream" />
        <Horarios />
        <VirgenDolores />
        <SectionDivider tone="cream" />
        <Sacramentos />
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/historia" element={<Historia />} />
      <Route path="/horarios" element={<HorariosPage />} />
      <Route path="/virgen-de-los-dolores" element={<VirgenDoloresPage />} />
      <Route path="/eventos" element={<EventosPage />} />
      <Route path="/galeria" element={<GaleriaPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/capillas" element={<CapillasPage />} />
      <Route path="/sacramentos" element={<SacramentosLayout />}>
        <Route index element={<Navigate to={`/sacramentos/${REQUISITOS[0].id}`} replace />} />
        <Route path=":id" element={<Sacramento />} />
      </Route>
    </Routes>
  );
}
