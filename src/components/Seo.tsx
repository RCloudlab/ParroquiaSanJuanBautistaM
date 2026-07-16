import { useLocation } from "react-router-dom";

const SITE_URL = "https://parroquiasanjuanbautista.com";
const SITE_NAME = "Parroquia San Juan Bautista";
const IMAGEN_DEFAULT = "/optimized/hero-1600.webp";

type SeoProps = {
  titulo: string;
  descripcion: string;
  imagen?: string;
};

export default function Seo({
  titulo,
  descripcion,
  imagen = IMAGEN_DEFAULT,
}: SeoProps) {
  const { pathname } = useLocation();
  const urlCompleta = `${SITE_URL}${pathname}`;
  const imagenCompleta = `${SITE_URL}${imagen}`;

  return (
    <>
      {/*lo que Google muestra en resultados */}
      <title>{`${titulo} — ${SITE_NAME}`}</title>
      <meta name="description" content={descripcion} />

      {/* Canonical: la URL "oficial" de esta página */}
      <link rel="canonical" href={urlCompleta} />

      {/* Open Graph: vista previa en WhatsApp y Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={titulo} />
      <meta property="og:description" content={descripcion} />
      <meta property="og:url" content={urlCompleta} />
      <meta property="og:image" content={imagenCompleta} />
      <meta property="og:locale" content="es_MX" />

      {/* Twitter/X*/}
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
