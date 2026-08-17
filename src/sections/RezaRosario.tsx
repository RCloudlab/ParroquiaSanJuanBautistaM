import { Link } from 'react-router-dom';
import { Timer, ArrowRight, Sparkle } from 'lucide-react';
import './RezaRosario.css';

// Días según "Rosarium Virginis Mariae" (san Juan Pablo II). Solo el nombre y
// los días viven aquí: los textos completos de cada misterio están en
// src/data/rosario.ts, que se carga bajo demanda con las páginas /rosario
// (no lo importamos aquí para no engordar el bundle inicial del home).
interface GrupoResumen {
  nombre: string;
  dias: string;
  /** getDay(): 0=domingo ... 6=sábado */
  diasSemana: number[];
}

const GRUPOS: GrupoResumen[] = [
  { nombre: 'Gozosos',   dias: 'Lunes y sábado',    diasSemana: [1, 6] },
  { nombre: 'Dolorosos', dias: 'Martes y viernes',  diasSemana: [2, 5] },
  { nombre: 'Gloriosos', dias: 'Miércoles y domingo', diasSemana: [3, 0] },
  { nombre: 'Luminosos', dias: 'Jueves',            diasSemana: [4] },
];

export default function RezaRosario() {
  const hoy = new Date();
  const grupoHoy = GRUPOS.find(g => g.diasSemana.includes(hoy.getDay())) ?? GRUPOS[0];
  const diaNombre = hoy.toLocaleDateString('es-MX', { weekday: 'long' });

  return (
    <section id="reza-rosario" className="reza-rosario">
      <div className="section-container">
        <div className="reza-rosario__card reveal">
          <p className="reza-rosario__eyebrow">
            <Sparkle size={14} /> Oración del día
          </p>
          <h2 className="reza-rosario__titulo">Reza el Rosario</h2>
          <p className="reza-rosario__hoy">
            Hoy, <strong>{diaNombre}</strong>: <strong>Misterios {grupoHoy.nombre}</strong>
          </p>
          <p className="reza-rosario__tiempo">
            <Timer size={16} /> Entre <strong>15 y 20 minutos</strong>
          </p>
          <Link to="/rosario" className="btn-gold reza-rosario__cta">
            Rezar ahora <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
