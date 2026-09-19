// Cálculo del día litúrgico a partir de una fecha: es información puramente
// matemática (fecha de Pascua vía el algoritmo de Meeus/Jones/Butcher, y las
// reglas fijas del calendario romano) — NO calcula la referencia bíblica del
// leccionario, que varía por año y requiere una fuente autorizada. Sirve
// como ayuda visual en el panel para ubicar la fecha dentro del año
// litúrgico; el texto y la cita del evangelio los sigue escribiendo el
// administrador a mano.

const DIAS_SEMANA = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
];

const MS_POR_DIA = 86400000;

function sumarDias(fecha: Date, dias: number): Date {
  const d = new Date(fecha);
  d.setDate(d.getDate() + dias);
  return d;
}

function diffDias(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / MS_POR_DIA);
}

/** Domingo de Pascua del año dado (algoritmo de Meeus/Jones/Butcher, calendario gregoriano). */
function calcularPascua(anio: number): Date {
  const a = anio % 19;
  const b = Math.floor(anio / 100);
  const c = anio % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31); // 3=marzo, 4=abril
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(anio, mes - 1, dia);
}

/** Primer domingo de Adviento: el domingo más cercano al 30 de noviembre. */
function calcularPrimerDomingoAdviento(anio: number): Date {
  const nov30 = new Date(anio, 10, 30);
  const offset = (nov30.getDay() + 7) % 7;
  return sumarDias(nov30, -offset);
}

/** Bautismo del Señor: domingo siguiente a la Epifanía (6 de enero). */
function calcularBautismoDelSenor(anio: number): Date {
  const epifania = new Date(anio, 0, 6);
  const diaSemana = epifania.getDay();
  return diaSemana === 0 ? sumarDias(epifania, 7) : sumarDias(epifania, 7 - diaSemana);
}

const CICLOS_DOMINICALES = ['C', 'A', 'B'] as const;

/** Ciclo dominical (A/B/C) del año litúrgico que contiene esta fecha. El año
 *  litúrgico empieza en Adviento (finales de noviembre) del año civil
 *  anterior, así que diciembre ya pertenece al ciclo del año siguiente. */
function cicloDominical(fecha: Date): 'A' | 'B' | 'C' {
  const anioLiturgico = fecha.getMonth() === 11 ? fecha.getFullYear() + 1 : fecha.getFullYear();
  return CICLOS_DOMINICALES[anioLiturgico % 3];
}

/** Conversión a número romano (suficiente para semanas litúrgicas, 1-40). */
function romano(n: number): string {
  if (n <= 0) return 'I';
  const valores: [number, string][] = [
    [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let resto = n;
  let out = '';
  while (resto > 0) {
    const [valor, simbolo] = valores.find(([v]) => v <= resto)!;
    out += simbolo;
    resto -= valor;
  }
  return out;
}

function nombreSemana(diaSemana: string, semana: number, tiempo: string): string {
  return diaSemana === 'Domingo'
    ? `Domingo ${romano(semana)} de ${tiempo}`
    : `${diaSemana} de la ${romano(semana)} semana de ${tiempo}`;
}

export interface DiaLiturgico {
  /** Ej. "Domingo XXV del Tiempo Ordinario" o "Miércoles de Ceniza". */
  nombre: string;
  /** Ciclo dominical A/B/C, para referencia. */
  ciclo: 'A' | 'B' | 'C';
}

/**
 * Calcula el día litúrgico correspondiente a una fecha 'YYYY-MM-DD', evaluando
 * los tiempos litúrgicos en el orden real del año (Adviento → Navidad →
 * Tiempo Ordinario I → Cuaresma → Pascua → Tiempo Ordinario II → Adviento…),
 * anclado siempre a las fechas fijas de ese año civil concreto.
 */
export function calcularDiaLiturgico(fechaIso: string): DiaLiturgico {
  const [y, m, d] = fechaIso.split('-').map(Number);
  const fecha = new Date(y, m - 1, d);
  const diaSemana = DIAS_SEMANA[fecha.getDay()];
  const ciclo = cicloDominical(fecha);

  // Fechas ancla del año civil de `fecha`, y las del año anterior que hacen
  // falta para cubrir los tramos que cruzan el 1 de enero.
  const pascua = calcularPascua(y);
  const bautismo = calcularBautismoDelSenor(y);
  const navidad = new Date(y, 11, 25);
  const navidadAnterior = new Date(y - 1, 11, 25);
  const advientoEsteAnio = calcularPrimerDomingoAdviento(y);
  const advientoAnioAnterior = calcularPrimerDomingoAdviento(y - 1);

  const ceniza = sumarDias(pascua, -46);
  const domingoRamos = sumarDias(pascua, -7);
  const juevesSanto = sumarDias(pascua, -3);
  const viernesSanto = sumarDias(pascua, -2);
  const sabadoSanto = sumarDias(pascua, -1);
  const pentecostes = sumarDias(pascua, 49);

  // ─── 1. Fechas puntuales exactas ───────────────────────────────────────
  if (mismoDia(fecha, ceniza)) return { nombre: 'Miércoles de Ceniza', ciclo };
  if (mismoDia(fecha, domingoRamos)) return { nombre: 'Domingo de Ramos', ciclo };
  if (mismoDia(fecha, juevesSanto)) return { nombre: 'Jueves Santo', ciclo };
  if (mismoDia(fecha, viernesSanto)) return { nombre: 'Viernes Santo', ciclo };
  if (mismoDia(fecha, sabadoSanto)) return { nombre: 'Sábado Santo', ciclo };
  if (mismoDia(fecha, pascua)) return { nombre: 'Domingo de Resurrección', ciclo };
  if (mismoDia(fecha, pentecostes)) return { nombre: 'Domingo de Pentecostés', ciclo };
  if (mismoDia(fecha, navidad)) return { nombre: 'Natividad del Señor', ciclo };
  if (mismoDia(fecha, bautismo)) return { nombre: 'Bautismo del Señor', ciclo };

  // ─── 2. Semana Santa (Ramos a Sábado Santo, excluyendo días ya cubiertos) ─
  if (fecha > domingoRamos && fecha < pascua) {
    return { nombre: 'Semana Santa', ciclo };
  }

  // ─── 3. Octava y Tiempo Pascual (de Pascua a Pentecostés) ──────────────
  if (fecha > pascua && fecha <= pentecostes) {
    // La Octava dura del lunes siguiente a Pascua hasta el sábado antes del
    // II Domingo de Pascua (6 días: no incluye ese domingo, que ya abre el
    // siguiente tramo numerado).
    if (fecha < sumarDias(pascua, 7)) {
      return { nombre: `${diaSemana} de la Octava de Pascua`, ciclo };
    }
    const semana = Math.floor(diffDias(fecha, pascua) / 7) + 1;
    return { nombre: nombreSemana(diaSemana, semana, 'Pascua'), ciclo };
  }

  // ─── 4. Cuaresma (de Ceniza al Domingo de Ramos) ───────────────────────
  if (fecha >= ceniza && fecha <= domingoRamos) {
    const semana = Math.floor(diffDias(fecha, ceniza) / 7) + 1;
    return { nombre: nombreSemana(diaSemana, semana, 'Cuaresma'), ciclo };
  }

  // ─── 5. Tiempo de Navidad (de Navidad al Bautismo del Señor) ───────────
  // Cubre tanto "26 dic - 5 ene" (Navidad de este año civil, previa al
  // Bautismo de enero) como "1 ene - Bautismo" cuando `fecha` cae en enero
  // y la Navidad que le corresponde es la del año civil anterior.
  if (fecha >= navidad || fecha <= bautismo) {
    return { nombre: 'Tiempo de Navidad', ciclo };
  }

  // ─── 6. Adviento (del 1er domingo de Adviento a Nochebuena) ────────────
  // Puede ser el Adviento de este año civil (nov/dic) o, si `fecha` es de
  // enero y aún así cayera antes del Bautismo (no debería, ya cubierto
  // arriba), el del año anterior — se contemplan ambos por seguridad.
  if (fecha >= advientoEsteAnio && fecha < navidad) {
    const semana = Math.floor(diffDias(fecha, advientoEsteAnio) / 7) + 1;
    return { nombre: nombreSemana(diaSemana, semana, 'Adviento'), ciclo };
  }
  if (fecha >= advientoAnioAnterior && fecha < navidadAnterior) {
    const semana = Math.floor(diffDias(fecha, advientoAnioAnterior) / 7) + 1;
    return { nombre: nombreSemana(diaSemana, semana, 'Adviento'), ciclo };
  }

  // ─── 7. Tiempo Ordinario (Bautismo → Ceniza, y Pentecostés → Adviento) ──
  // Sin número de semana: la numeración oficial "salta" semanas según el
  // año (depende de reglas adicionales del calendario romano que no se
  // pueden derivar solo de las fechas de Pascua/Adviento), así que mostrar
  // un número aquí podría desfasarse respecto al calendario real. Los demás
  // tiempos litúrgicos arriba sí tienen fechas ancla exactas y confiables.
  return { nombre: 'Tiempo Ordinario', ciclo };
}

function mismoDia(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
