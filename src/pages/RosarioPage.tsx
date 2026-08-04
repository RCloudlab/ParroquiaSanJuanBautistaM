import { Link } from "react-router-dom";
import { BookOpen, Sparkles, Circle, CalendarDays } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { grupoDelDia } from "../data/rosario";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import "./RosarioPage.css";
import Seo from "../components/Seo";

const MODOS = [
  {
    ruta: "/rosario/guiado",
    icono: Sparkles,
    titulo: "Rosario guiado",
    descripcion:
      "Te acompaña paso a paso: cada oración completa, los misterios del día y las cuentas para no perderte.",
    destacado: true,
  },
  {
    ruta: "/rosario/contador",
    icono: Circle,
    titulo: "Contador de cuentas",
    descripcion:
      "Solo las cuentas, para quien reza de memoria. Un toque por Ave María, con vibración al cerrar cada decena.",
    destacado: false,
  },
  {
    ruta: "/rosario/libro",
    icono: BookOpen,
    titulo: "Libro de oraciones",
    descripcion:
      "Todas las oraciones, los misterios y las letanías para leer con calma o acompañar el rezo en grupo.",
    destacado: false,
  },
];

export default function RosarioPage() {
  useRevealOnScroll();
  const grupoHoy = grupoDelDia();

  return (
    <>
      <Seo
        titulo="Reza el Rosario en línea"
        descripcion="Rosario guiado paso a paso, contador de cuentas y libro de oraciones con los misterios de cada día. Tu avance se guarda en tu dispositivo."
        imagen="/optimized/virgen-dolores-ext-960.webp"
      />

      <Navbar />
      <main className="page-standalone">
        <section className="rosario-inicio">
          {/* Cabecera con la Virgen de los Dolores */}
          <div className="rosario-inicio__hero">
            <img
              className="rosario-inicio__hero-img"
              src="/optimized/virgen-dolores-ext-960.webp"
              srcSet="/optimized/virgen-dolores-ext-480.webp 480w, /optimized/virgen-dolores-ext-960.webp 960w, /optimized/virgen-dolores-ext-1600.webp 1600w"
              sizes="100vw"
              alt="Virgen de los Dolores en su altar de la Parroquia San Juan Bautista"
              decoding="async"
              fetchPriority="high"
            />
            <div className="rosario-inicio__hero-velo" />
            <div className="rosario-inicio__hero-texto">
              <h1 className="rosario-inicio__titulo">Reza el Rosario</h1>
              <p className="rosario-inicio__lema">
                «El Rosario es mi oración predilecta» — San Juan Pablo II
              </p>
            </div>
          </div>

          <div className="section-container">
            {/* Misterio del día */}
            <div className="rosario-inicio__hoy reveal">
              <CalendarDays size={17} />
              <span>
                Hoy corresponden los <strong>{grupoHoy.nombre}</strong>
                <span className="rosario-inicio__hoy-dias">
                  {" "}
                  · {grupoHoy.dias}
                </span>
              </span>
            </div>

            {/* Modos */}
            <div className="rosario-inicio__modos">
              {MODOS.map((modo, i) => (
                <Link
                  key={modo.ruta}
                  to={modo.ruta}
                  className={`rosario-inicio__modo reveal ${modo.destacado ? "rosario-inicio__modo--destacado" : ""}`}
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  {modo.destacado && (
                    <span className="rosario-inicio__etiqueta">
                      Recomendado
                    </span>
                  )}
                  <span className="rosario-inicio__modo-icono">
                    <modo.icono size={26} />
                  </span>
                  <span className="rosario-inicio__modo-titulo">
                    {modo.titulo}
                  </span>
                  <span className="rosario-inicio__modo-desc">
                    {modo.descripcion}
                  </span>
                  <span className="rosario-inicio__modo-cta">Comenzar →</span>
                </Link>
              ))}
            </div>

            <p className="rosario-inicio__nota reveal">
              Tu avance se guarda en tu dispositivo: si interrumpes el rezo,
              puedes continuar después donde te quedaste. En los modos de rezo
              encontrarás el <strong>modo capilla</strong> (pantalla oscura) y
              el ajuste de tamaño de letra.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
