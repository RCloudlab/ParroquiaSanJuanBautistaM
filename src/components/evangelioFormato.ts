/** Fecha en español, p. ej. «domingo 16 de agosto de 2026». */
export function fechaLargaEvangelio(fechaIso: string): string {
  const [y, m, d] = fechaIso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
