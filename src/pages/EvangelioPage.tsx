import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { ErrorBoundary } from '../components/ErrorBoundary';
import EvangelioLectura from '../components/EvangelioLectura';
import type { EvangelioRow } from '../lib/database.types';
import { obtenerEvangelioDeHoy } from '../admin/evangelio/evangelioApi';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import './EvangelioPage.css';

export default function EvangelioPage() {
  useRevealOnScroll();
  const [evangelio, setEvangelio] = useState<EvangelioRow | null | undefined>(undefined);

  useEffect(() => {
    let vivo = true;
    obtenerEvangelioDeHoy()
      .then(data => { if (vivo) setEvangelio(data); })
      .catch(err => {
        console.error('No se pudo cargar el evangelio del día:', err);
        if (vivo) setEvangelio(null);
      });
    return () => { vivo = false; };
  }, []);

  return (
    <>
      <Seo
        titulo="Evangelio del Día"
        descripcion={
          evangelio
            ? `${evangelio.referencia} — ${evangelio.titulo}. Lee y medita el evangelio de hoy con la Parroquia San Juan Bautista.`
            : 'Lee y medita el evangelio de hoy con la Parroquia San Juan Bautista.'
        }
      />
      <Navbar />
      <main className="page-standalone">
        <ErrorBoundary seccion="Evangelio del Día">
          {evangelio === undefined ? (
            <div className="evangelio-page__cargando"><Loader2 size={24} className="evangelio-page__spin" /></div>
          ) : evangelio === null ? (
            <div className="section-container evangelio-page__container">
              <div className="evangelio-page__vacio reveal">
                <p>Aún no se ha publicado el evangelio de hoy. Vuelve más tarde.</p>
              </div>
            </div>
          ) : (
            <EvangelioLectura evangelio={evangelio} />
          )}
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
