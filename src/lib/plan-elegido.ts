/** Resuelve a qué plan lleva /plan a partir de lo guardado en el navegador. */

export const PLAN_POR_DEFECTO = 'por-defecto';

/** Devuelve el slug guardado si es uno de los planes seleccionables; si no, el por defecto. */
export function planDestino(guardado: unknown, seleccionables: readonly string[]): string {
  return typeof guardado === 'string' && seleccionables.includes(guardado) ? guardado : PLAN_POR_DEFECTO;
}
