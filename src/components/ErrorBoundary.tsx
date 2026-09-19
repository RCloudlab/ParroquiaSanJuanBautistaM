import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Nombre de la sección, para que el mensaje diga dónde ocurrió. */
  seccion: string;
}

interface State {
  error: Error | null;
}

/**
 * Si una sección revienta al renderizar (dato inesperado, undefined donde no
 * se esperaba, etc.), React por defecto desmonta TODO el árbol hacia arriba
 * y deja la pantalla en blanco sin ninguna pista. Este límite aísla el fallo
 * a la sección afectada y muestra el error real en pantalla — temporal,
 * mientras depuramos; una vez estable puede simplificarse a un mensaje
 * genérico sin el detalle técnico.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`Error en sección "${this.props.seccion}":`, error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          margin: '2rem auto',
          maxWidth: 700,
          padding: '1.25rem 1.5rem',
          background: '#fff3f3',
          border: '1.5px solid #c23b3b',
          borderRadius: 12,
          color: '#4a2c18',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          whiteSpace: 'pre-wrap',
        }}>
          <strong>Error al mostrar "{this.props.seccion}":</strong>
          <br />
          {this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}
