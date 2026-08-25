// Resumen ligero de los grupos de misterios para el home.
//
// Deliberadamente separado de src/data/rosario.ts: aquel módulo lleva los
// textos completos de las oraciones y los misterios (~14 KB) y se carga bajo
// demanda con las páginas /rosario. El home solo necesita el nombre y el día,
// así que duplicamos esos pocos datos antes que engordar el bundle inicial.
//
// Días según "Rosarium Virginis Mariae" (san Juan Pablo II).

export type GrupoId = 'gozosos' | 'luminosos' | 'dolorosos' | 'gloriosos';

export interface GrupoResumen {
  id: GrupoId;
  nombre: string;
  dias: string;
  /** getDay(): 0=domingo ... 6=sábado */
  diasSemana: number[];
}

export const GRUPOS: GrupoResumen[] = [
  { id: 'gozosos',   nombre: 'Gozosos',   dias: 'Lunes y sábado',      diasSemana: [1, 6] },
  { id: 'dolorosos', nombre: 'Dolorosos', dias: 'Martes y viernes',    diasSemana: [2, 5] },
  { id: 'gloriosos', nombre: 'Gloriosos', dias: 'Miércoles y domingo', diasSemana: [3, 0] },
  { id: 'luminosos', nombre: 'Luminosos', dias: 'Jueves',              diasSemana: [4] },
];

/** Grupo que corresponde rezar en la fecha dada (por defecto, hoy). */
export function grupoDelDia(fecha: Date = new Date()): GrupoResumen {
  return GRUPOS.find(g => g.diasSemana.includes(fecha.getDay())) ?? GRUPOS[0];
}
