import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Minus, Plus } from 'lucide-react';
import { useAjustesRosario } from '../hooks/useRosario';
import './RosarioMarco.css';

/**
 * Marco inmersivo para los modos de rezo (sin navbar del sitio): barra
 * superior con regreso a /rosario, tamaño de letra (A− / A+) y tema
 * claro/oscuro ("modo capilla"). Aplica las variables de tema a todo
 * su contenido vía data-attributes.
 */

interface Props {
  titulo: string;
  children: ReactNode;
}

export default function RosarioMarco({ titulo, children }: Props) {
  const { tema, fuente, alternarTema, aumentarFuente, reducirFuente } = useAjustesRosario();

  return (
    <div className="rosario-marco" data-tema={tema} data-fuente={fuente}>
      <header className="rosario-marco__barra">
        <Link to="/rosario" className="rosario-marco__volver" aria-label="Volver al inicio del rosario">
          <ArrowLeft size={20} />
          <span className="rosario-marco__titulo">{titulo}</span>
        </Link>
        <div className="rosario-marco__ajustes" role="group" aria-label="Ajustes de lectura">
          <button
            className="rosario-marco__boton"
            onClick={reducirFuente}
            disabled={fuente === 'm'}
            aria-label="Reducir tamaño de letra"
          >
            <Minus size={13} />
            <span className="rosario-marco__a">A</span>
          </button>
          <button
            className="rosario-marco__boton"
            onClick={aumentarFuente}
            disabled={fuente === 'xg'}
            aria-label="Aumentar tamaño de letra"
          >
            <Plus size={13} />
            <span className="rosario-marco__a rosario-marco__a--grande">A</span>
          </button>
          <button
            className="rosario-marco__boton"
            onClick={alternarTema}
            aria-label={tema === 'claro' ? 'Activar modo capilla (oscuro)' : 'Activar modo claro'}
          >
            {tema === 'claro' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}

/* ─── Aviso para reanudar un rezo guardado ──────────────────────────────── */

interface ReanudarProps {
  descripcion: string;
  onContinuar: () => void;
  onEmpezar: () => void;
}

export function ReanudarAviso({ descripcion, onContinuar, onEmpezar }: ReanudarProps) {
  return (
    <div className="rosario-reanudar" role="dialog" aria-label="Rezo guardado">
      <div className="rosario-reanudar__tarjeta">
        <p className="rosario-reanudar__texto">
          Tienes un rezo sin terminar: <strong>{descripcion}</strong>
        </p>
        <div className="rosario-reanudar__acciones">
          <button className="rosario-reanudar__continuar" onClick={onContinuar}>
            Continuar donde me quedé
          </button>
          <button className="rosario-reanudar__nuevo" onClick={onEmpezar}>
            Empezar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
