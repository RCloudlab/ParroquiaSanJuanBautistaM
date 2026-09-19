import { useCallback, useEffect, useRef, useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import './ImagenZoom.css';

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_PASO_RUEDA = 0.0025;
const ZOOM_DOBLE_CLIC = 2.5;

interface Props {
  src: string;
  alt?: string;
  onCerrar: () => void;
}

/**
 * Visor de imagen a pantalla completa con zoom: rueda del mouse, doble clic,
 * pellizco (pinch) en móvil, y arrastre cuando está ampliada. Reutilizable
 * desde cualquier modal del sitio (eventos, evangelio, galería…).
 */
export default function ImagenZoom({ src, alt = '', onCerrar }: Props) {
  const [escala, setEscala] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const arrastrando = useRef(false);
  const inicio = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const pinchDistanciaInicial = useRef<number | null>(null);
  const pinchEscalaInicial = useRef(1);

  const limitar = (v: number) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, v));

  const resetear = useCallback(() => {
    setEscala(1);
    setPos({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Este visor se monta encima de otro modal (p. ej. el detalle de un
      // evento) que también escucha Escape en window. stopImmediatePropagation
      // + fase de captura asegura que Escape cierre solo el zoom (la capa de
      // arriba) sin que el listener del modal padre también reaccione al
      // mismo evento en el mismo tick.
      e.stopImmediatePropagation();
      onCerrar();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onCerrar]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setEscala(prev => {
      const nueva = limitar(prev - e.deltaY * ZOOM_PASO_RUEDA * prev);
      if (nueva === ZOOM_MIN) setPos({ x: 0, y: 0 });
      return nueva;
    });
  };

  const handleDoubleClick = () => {
    setEscala(prev => (prev > ZOOM_MIN ? ZOOM_MIN : ZOOM_DOBLE_CLIC));
    setPos({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (escala <= ZOOM_MIN) return;
    arrastrando.current = true;
    inicio.current = { x: e.clientX, y: e.clientY, posX: pos.x, posY: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!arrastrando.current) return;
    setPos({
      x: inicio.current.posX + (e.clientX - inicio.current.x),
      y: inicio.current.posY + (e.clientY - inicio.current.y),
    });
  };

  const handlePointerUp = () => {
    arrastrando.current = false;
  };

  // Pellizco (pinch-to-zoom) táctil: dos dedos, se mide la distancia entre
  // ellos en touchstart y se escala proporcionalmente en touchmove.
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const [a, b] = [e.touches[0], e.touches[1]];
      pinchDistanciaInicial.current = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      pinchEscalaInicial.current = escala;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchDistanciaInicial.current) {
      const [a, b] = [e.touches[0], e.touches[1]];
      const distancia = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const factor = distancia / pinchDistanciaInicial.current;
      const nueva = limitar(pinchEscalaInicial.current * factor);
      setEscala(nueva);
      if (nueva === ZOOM_MIN) setPos({ x: 0, y: 0 });
    }
  };

  const handleTouchEnd = () => {
    pinchDistanciaInicial.current = null;
  };

  return (
    // stopPropagation en el propio overlay: este visor puede montarse dentro
    // de otro modal (p. ej. el detalle de un evento), que también cierra al
    // hacer clic en su fondo. Sin esto, un clic aquí burbujearía en el árbol
    // de React y cerraría también el modal padre.
    <div className="imagen-zoom__overlay" onClick={e => { e.stopPropagation(); onCerrar(); }}>
      <div className="imagen-zoom__barra" onClick={e => e.stopPropagation()}>
        <button
          className="imagen-zoom__btn"
          onClick={() => setEscala(prev => limitar(prev - 0.5))}
          disabled={escala <= ZOOM_MIN}
          aria-label="Alejar"
        >
          <ZoomOut size={20} />
        </button>
        <button
          className="imagen-zoom__btn"
          onClick={() => setEscala(prev => limitar(prev + 0.5))}
          disabled={escala >= ZOOM_MAX}
          aria-label="Acercar"
        >
          <ZoomIn size={20} />
        </button>
        <button className="imagen-zoom__btn imagen-zoom__btn--cerrar" onClick={onCerrar} aria-label="Cerrar">
          <X size={22} />
        </button>
      </div>

      <div
        className="imagen-zoom__stage"
        onClick={e => e.stopPropagation()}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={src}
          alt={alt}
          className="imagen-zoom__img"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${escala})`,
            cursor: escala > ZOOM_MIN ? 'grab' : 'zoom-in',
          }}
          draggable={false}
          onLoad={resetear}
        />
      </div>

      <p className="imagen-zoom__ayuda">
        Rueda del mouse o doble clic para hacer zoom · Arrastra para mover la imagen
      </p>
    </div>
  );
}
