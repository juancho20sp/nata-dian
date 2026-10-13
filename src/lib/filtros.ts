/** Lógica pura de los filtros con chips (Normativa y Practicar). */

/** Valor de los datos de normativa que marca un área como común a todos los empleos. */
export const TODOS = 'Todos';

/**
 * Un área de normativa se ve si no hay filtro, si aplica a todos los empleos
 * o si incluye el empleo elegido.
 */
export function areaVisible(empleosDelArea: readonly string[], empleo: string | null): boolean {
  if (!empleo) return true;
  return empleosDelArea.includes(TODOS) || empleosDelArea.includes(empleo);
}

/** Tipos de empleo para los chips: todos los de los datos, sin "Todos", en orden alfabético. */
export function tiposDeEmpleo(areas: readonly { empleos: readonly string[] }[]): string[] {
  return [...new Set(areas.flatMap((a) => a.empleos))].filter((e) => e !== TODOS).sort((a, b) => a.localeCompare(b, 'es'));
}

/** Lee `?empleo=` y lo acepta solo si es uno de los tipos conocidos. */
export function empleoDeLaUrl(busqueda: string, tipos: readonly string[]): string | null {
  const valor = new URLSearchParams(busqueda).get('empleo');
  return valor && tipos.includes(valor) ? valor : null;
}

export type ModoRecursos = 'oficiales' | 'todos';

export function recursoVisible(oficial: boolean, modo: ModoRecursos): boolean {
  return modo === 'todos' || oficial;
}
