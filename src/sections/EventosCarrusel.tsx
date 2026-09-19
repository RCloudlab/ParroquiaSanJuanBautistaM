import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { EventoRow } from '../lib/database.types';
import EventoCard from '../components/EventoCard';

interface Props {
  eventos: EventoRow[];
  onAbrir: (evento: EventoRow) => void;
}

const INTERVALO_MS = 4000;

/**
 * Carrusel de eventos destacados (tipo "especial"): avanza solo cada 4s y
 * se puede navegar a mano con las flechas o los puntos. El avance automático
 * se pausa mientras el cursor está encima.
 *
 * Todas las tarjetas viven en una sola pista (.eventos__carrusel-track) que
 * se desplaza con translateX; solo cambia qué porcentaje se ve, así que la
 * transición es un slide horizontal continuo en vez de un fade entre nodos.
 */
export default function EventosCarrusel({ eventos, onAbrir }: Props) {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const timerRef = useRef<number | null>(null);

  const total = eventos.length;

  const ir = useCallback((i: number) => {
    setIndice(((i % total) + total) % total);
  }, [total]);

  const siguiente = useCallback(() => ir(indice + 1), [ir, indice]);
  const anterior = useCallback(() => ir(indice - 1), [ir, indice]);

  useEffect(() => {
    if (pausado || total < 2) return;
    timerRef.current = window.setTimeout(siguiente, INTERVALO_MS);
    return () => { if (timerRef.current) window.clearTimeout(timerRef.current); };
  }, [indice, pausado, total, siguiente]);

  // Si la lista de eventos destacados cambia (p. ej. se publicó uno nuevo)
  // y el índice actual queda fuera de rango, se recoloca al principio.
  useEffect(() => {
    if (indice >= total) setIndice(0);
  }, [total, indice]);

  if (total === 0) return null;

  return (
    <div
      className="eventos__carrusel"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="eventos__carrusel-viewport">
        <div
          className="eventos__carrusel-track"
          style={{ transform: `translateX(-${indice * 100}%)` }}
        >
          {eventos.map(ev => (
            <div className="eventos__carrusel-slide" key={ev.id}>
              <EventoCard evento={ev} destacado className="reveal" onClick={() => onAbrir(ev)} />
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            className="eventos__carrusel-flecha eventos__carrusel-flecha--izq"
            onClick={e => { e.stopPropagation(); anterior(); }}
            aria-label="Evento destacado anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="eventos__carrusel-flecha eventos__carrusel-flecha--der"
            onClick={e => { e.stopPropagation(); siguiente(); }}
            aria-label="Siguiente evento destacado"
          >
            <ChevronRight size={22} />
          </button>

          <div className="eventos__carrusel-puntos">
            {eventos.map((ev, i) => (
              <button
                key={ev.id}
                className={`eventos__carrusel-punto${i === indice ? ' eventos__carrusel-punto--activo' : ''}`}
                onClick={e => { e.stopPropagation(); ir(i); }}
                aria-label={`Ir al evento destacado ${i + 1}`}
                aria-current={i === indice}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
