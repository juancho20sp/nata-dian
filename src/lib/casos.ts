/** Casos de práctica: orden de presentación y avance guardado. */

export const CASOS = ['A', 'B', 'C', 'D', 'T'] as const;
export type Caso = (typeof CASOS)[number];

export interface CasoPractica {
  id: string;
  caso: Caso;
}

/** Último resultado de cada caso de práctica respondido. */
export type AvanceCasos = Record<string, { acierto: boolean }>;

function mezclar<T>(lista: readonly T[], azar: () => number): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [copia[i], copia[j]] = [copia[j]!, copia[i]!];
  }
  return copia;
}

/** 0 = fallado, 1 = sin responder, 2 = acertado. */
function prioridad(id: string, avance: AvanceCasos): number {
  const r = avance[id];
  if (!r) return 1;
  return r.acierto ? 2 : 0;
}

/**
 * Orden de una sesión. Dentro de cada caso: fallados, luego sin responder, luego
 * acertados (al azar dentro de cada grupo). Con filtro "todos", se alterna
 * A, B, C, D, T por rondas, de modo que ningún caso pesa más y nada se repite.
 */
export function ordenarCasos<T extends CasoPractica>(
  casos: readonly T[],
  avance: AvanceCasos,
  filtro: Caso | 'todos',
  azar: () => number = Math.random,
): T[] {
  const colas = new Map<Caso, T[]>();
  for (const c of CASOS) {
    if (filtro !== 'todos' && c !== filtro) continue;
    const delCaso = mezclar(casos.filter((x) => x.caso === c), azar).sort((a, b) => prioridad(a.id, avance) - prioridad(b.id, avance));
    if (delCaso.length > 0) colas.set(c, delCaso);
  }
  const salida: T[] = [];
  while ([...colas.values()].some((q) => q.length > 0)) {
    for (const c of CASOS) {
      const siguiente = colas.get(c)?.shift();
      if (siguiente) salida.push(siguiente);
    }
  }
  return salida;
}

export function registrarCaso(avance: AvanceCasos, id: string, acierto: boolean): AvanceCasos {
  return { ...avance, [id]: { acierto } };
}

/** Acertados y total por caso. */
export function resumenCasos(casos: readonly CasoPractica[], avance: AvanceCasos): Record<Caso, { acertados: number; total: number }> {
  const r = Object.fromEntries(CASOS.map((c) => [c, { acertados: 0, total: 0 }])) as Record<Caso, { acertados: number; total: number }>;
  for (const x of casos) {
    r[x.caso].total++;
    if (avance[x.id]?.acierto) r[x.caso].acertados++;
  }
  return r;
}

/** Lee `?caso=` y lo acepta solo si es un caso conocido. */
export function casoDeLaUrl(busqueda: string): Caso | 'todos' {
  const v = new URLSearchParams(busqueda).get('caso');
  return (CASOS as readonly string[]).includes(v ?? '') ? (v as Caso) : 'todos';
}

/** Descarta avance corrupto o de casos que ya no existen. */
export function avanceVigente(guardado: unknown, ids: readonly string[]): AvanceCasos {
  if (!guardado || typeof guardado !== 'object') return {};
  const validos = new Set(ids);
  const salida: AvanceCasos = {};
  for (const [id, v] of Object.entries(guardado as Record<string, unknown>)) {
    if (validos.has(id) && v && typeof v === 'object' && typeof (v as { acierto?: unknown }).acierto === 'boolean') {
      salida[id] = { acierto: (v as { acierto: boolean }).acierto };
    }
  }
  return salida;
}
