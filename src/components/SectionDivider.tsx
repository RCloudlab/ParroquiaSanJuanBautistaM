import './SectionDivider.css';

type SectionDividerProps = {
  /** Variante de color del trazo: dorado sobre fondos claros u oscuros. */
  tone?: 'cream' | 'dark';
};

/**
 * Divisor minimalista entre secciones: una línea con degradado que se
 * desvanece hacia los extremos y un pequeño rombo dorado en el centro.
 * Sin fondo propio — se apoya directo sobre la sección que lo contiene,
 * así no corta el flujo visual entre una sección y la siguiente.
 */
export default function SectionDivider({ tone = 'cream' }: SectionDividerProps) {
  return (
    <div className={`section-divider section-divider--${tone}`} aria-hidden="true">
      <span className="section-divider__line" />
      <span className="section-divider__diamond" />
      <span className="section-divider__line" />
    </div>
  );
}
