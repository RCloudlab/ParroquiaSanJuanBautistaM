import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Horarios from './sections/Horarios';
import Sacramentos from './sections/Sacramentos';
import Eventos from './sections/Eventos';
import Galeria from './sections/Galeria';
import VaticanNews from './sections/VaticanNews';
import VirgenDolores from './sections/VirgenDolores';
import Contacto from './sections/Contacto';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Horarios />
        <Sacramentos />
        <Eventos />
        <Galeria />
        <VaticanNews />
        <VirgenDolores />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
