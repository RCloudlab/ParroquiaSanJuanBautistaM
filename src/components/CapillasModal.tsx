import { Clock, MapPin, X } from "lucide-react";
import type { Capilla } from "../data/capillas";

type ModalProps = {
  capilla: Capilla;
  onCerrar: () => void;
};

// Los horarios de misa de las capillas aún no están confirmados: se ocultan
// hasta tener la información definitiva. Cambiar a true para mostrarlos.
const MOSTRAR_HORARIOS = false;


export function CapillaModal({ capilla, onCerrar }: ModalProps) {
  return (
    <div className="capilla-modal__overlay" onClick={onCerrar}>
      <div
        className="capilla-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="capilla-modal-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="capilla-modal__cerrar" onClick={onCerrar} aria-label="Cerrar">
          <X size={22} />
        </button>

        {/* Imagen */}
        <div className="capillas__img-wrap">
          <img
            src={capilla.imagen}
            alt={capilla.nombre}
            className="capillas__img"
            decoding="async"
          />
          <div className="capillas__img-overlay" />
        </div>

        {/* Contenido completo */}
        <div className="capilla-modal__body">
          <h2 id="capilla-modal-titulo" className="capillas__nombre">{capilla.nombre}</h2>

          <div className="capillas__meta">
            <span className="capillas__lugar">
              <MapPin size={14} />
              {capilla.lugar}
            </span>
          </div>

          {MOSTRAR_HORARIOS && (
            <div className="capillas__misas">
              <h3 className="capillas__misas-title">
                <Clock size={15} />
                Horario de Misas
              </h3>
              <ul className="capillas__misas-list">
                {capilla.misas.map((m, j) => (
                  <li key={j} className="capillas__misa-item">
                    <span className="capillas__misa-dia">{m.dia}</span>
                    <span className="capillas__misa-hora">{m.hora}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="capillas__historia">
            <h3 className="capillas__historia-title">Historia</h3>
            {capilla.historia.map((p, j) => (
              <p key={j} className="capillas__historia-p">{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
