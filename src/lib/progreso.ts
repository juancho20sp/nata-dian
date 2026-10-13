/**
 * Progreso de un plan: el conjunto de ids de elementos marcados como hechos.
 * Los ids guardados que ya no existen en el plan (por ejemplo, una tarea
 * renombrada) se descartan en vez de contar.
 */

export interface ResumenProgreso {
  hechos: number;
  total: number;
  porcentaje: number;
}

/** Deja solo los ids guardados que siguen existiendo en el plan. */
export function filtrarVigentes(guardados: unknown, vigentes: readonly string[]): string[] {
  if (!Array.isArray(guardados)) return [];
  const validos = new Set(vigentes);
  return [...new Set(guardados.filter((id): id is string => typeof id === 'string' && validos.has(id)))];
}

export function resumir(hechos: number, total: number): ResumenProgreso {
  return { hechos, total, porcentaje: total === 0 ? 0 : Math.round((hechos / total) * 100) };
}
