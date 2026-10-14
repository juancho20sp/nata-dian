/**
 * Repetición espaciada con cajas Leitner (1 a 5). Todas las fechas son ISO
 * (AAAA-MM-DD) de Colombia: quien llama pasa `hoy = fechaEnColombia(new Date())`.
 */
import { sumarDias } from './fechas';

export interface EstadoTarjeta {
  caja: number;
  /** Próxima fecha de repaso. */
  proxima: string;
  /** Fecha de la primera respuesta (los estados guardados antes de existir este campo no lo tienen). */
  inicio?: string;
}

export type Estados = Record<string, EstadoTarjeta>;

/** Días hasta el próximo repaso según la caja de llegada (1 a 5). */
export const INTERVALOS = [1, 2, 4, 7, 14] as const;
export const CAJA_MAXIMA = 5;

/** Última fecha útil antes de la prueba y comienzo del repaso final. */
export const ULTIMO_DIA = '2026-11-07';
export const REPASO_FINAL = '2026-11-05';

/** Ninguna tarjeta vuelve después del 7 de noviembre: si pasaría, vuelve el 5 (o hoy, si ya pasó el 5). */
export function limitarAntesDeLaPrueba(fecha: string, hoy: string): string {
  if (fecha <= ULTIMO_DIA) return fecha;
  return hoy > REPASO_FINAL ? hoy : REPASO_FINAL;
}

export function responder(estado: EstadoTarjeta | undefined, sabia: boolean, hoy: string): EstadoTarjeta {
  const actual = estado?.caja ?? 1;
  const caja = sabia ? Math.min(actual + 1, CAJA_MAXIMA) : 1;
  const inicio = estado ? estado.inicio : hoy;
  return { caja, proxima: limitarAntesDeLaPrueba(sumarDias(hoy, INTERVALOS[caja - 1]!), hoy), ...(inicio ? { inicio } : {}) };
}

/** Una tarjeta sin historial está en la caja 1 y toca hoy. */
export function tocaHoy(estado: EstadoTarjeta | undefined, hoy: string): boolean {
  return !estado || estado.proxima <= hoy;
}

export function dominada(estado: EstadoTarjeta | undefined): boolean {
  return (estado?.caja ?? 1) >= CAJA_MAXIMA;
}

export interface ResumenMazo {
  total: number;
  paraHoy: number;
  dominadas: number;
}

export function resumenMazo(ids: readonly string[], estados: Estados, hoy: string): ResumenMazo {
  return {
    total: ids.length,
    paraHoy: ids.filter((id) => tocaHoy(estados[id], hoy)).length,
    dominadas: ids.filter((id) => dominada(estados[id])).length,
  };
}

/** Deja solo los estados válidos de tarjetas que todavía existen. */
export function estadosVigentes(guardados: unknown, ids: readonly string[]): Estados {
  if (!guardados || typeof guardados !== 'object') return {};
  const validos = new Set(ids);
  const salida: Estados = {};
  for (const [id, e] of Object.entries(guardados as Record<string, unknown>)) {
    if (!validos.has(id) || !e || typeof e !== 'object') continue;
    const { caja, proxima, inicio } = e as Partial<EstadoTarjeta>;
    if (typeof caja === 'number' && caja >= 1 && caja <= CAJA_MAXIMA && typeof proxima === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(proxima)) {
      salida[id] = { caja: Math.trunc(caja), proxima, ...(typeof inicio === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(inicio) ? { inicio } : {}) };
    }
  }
  return salida;
}

// ── Límite diario de tarjetas nuevas ─────────────────────────────────────────

export const LIMITES_NUEVAS = [10, 25, 50] as const;
export type LimiteNuevas = (typeof LIMITES_NUEVAS)[number];
export const LIMITE_NUEVAS_POR_DEFECTO: LimiteNuevas = 25;

export function limiteValido(valor: unknown): LimiteNuevas {
  return (LIMITES_NUEVAS as readonly unknown[]).includes(valor) ? (valor as LimiteNuevas) : LIMITE_NUEVAS_POR_DEFECTO;
}

/** Cuántas tarjetas se empezaron hoy (primera respuesta con fecha de hoy). */
export function iniciadasHoy(estados: Estados, hoy: string): number {
  return Object.values(estados).filter((e) => e.inicio === hoy).length;
}

/** Semilla numérica de una fecha ISO, para que el orden de las nuevas sea el mismo todo el día. */
function semilla(texto: string): number {
  let h = 2166136261;
  for (const c of texto) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

function azar(semilla_: number): () => number {
  let a = semilla_;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Tarjetas sin historial ordenadas para hoy: mezcla determinista por mazo (semilla = fecha)
 * e intercaladas entre mazos, para que ningún mazo acapare las nuevas del día.
 */
export function nuevasIntercaladas<T extends { id: string; mazo: string }>(tarjetas: readonly T[], estados: Estados, hoy: string): T[] {
  const r = azar(semilla(hoy));
  const porMazo = new Map<string, T[]>();
  for (const t of tarjetas) if (!estados[t.id]) porMazo.set(t.mazo, [...(porMazo.get(t.mazo) ?? []), t]);
  const colas = [...porMazo.keys()].sort().map((m) => {
    const lista = [...porMazo.get(m)!];
    for (let i = lista.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [lista[i], lista[j]] = [lista[j]!, lista[i]!];
    }
    return lista;
  });
  const salida: T[] = [];
  while (colas.some((c) => c.length > 0)) for (const c of colas) if (c.length > 0) salida.push(c.shift()!);
  return salida;
}

/**
 * Tarjetas de hoy: las que tienen historial y tocan hoy, las exentas del límite que tocan
 * (p. ej. las propias) y como máximo `limite` nuevas por día, contando las ya empezadas hoy.
 */
export function seleccionDelDia<T extends { id: string; mazo: string }>(
  tarjetas: readonly T[],
  estados: Estados,
  hoy: string,
  limite: number,
  exentas: ReadonlySet<string> = new Set(),
): T[] {
  const conHistorial = tarjetas.filter((t) => estados[t.id] && tocaHoy(estados[t.id], hoy));
  const nuevasExentas = tarjetas.filter((t) => !estados[t.id] && exentas.has(t.id));
  const cupo = Math.max(0, limite - iniciadasHoy(estados, hoy));
  const nuevas = nuevasIntercaladas(
    tarjetas.filter((t) => !exentas.has(t.id)),
    estados,
    hoy,
  ).slice(0, cupo);
  return [...conHistorial, ...nuevasExentas, ...nuevas];
}
