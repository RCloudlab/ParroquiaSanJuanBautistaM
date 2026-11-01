// Temporada en que todo el sitio lleva adornos de Todos los Santos (papel
// picado bajo el menú y la ofrenda sobre el pie de página): del 15 de
// octubre al 3 de noviembre de cada año. Fuera de esas fechas se quitan
// solos. Módulo aparte para que el menú y el pie no carguen el catálogo de
// santos de data/todosLosSantos.ts.

const TEMPORADA = { desde: { mes: 10, dia: 15 }, hasta: { mes: 11, dia: 3 } };

export function esTemporadaSantos(hoy = new Date()) {
  const valor = (hoy.getMonth() + 1) * 100 + hoy.getDate();
  return valor >= TEMPORADA.desde.mes * 100 + TEMPORADA.desde.dia
    && valor <= TEMPORADA.hasta.mes * 100 + TEMPORADA.hasta.dia;
}
