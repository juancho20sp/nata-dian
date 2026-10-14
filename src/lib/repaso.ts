/**
 * Repetición espaciada con cajas Leitner (1 a 5). Todas las fechas son ISO
 * (AAAA-MM-DD) de Colombia: quien llama pasa `hoy = fechaEnColombia(new Date())`.
 */
import { sumarDias } from './fechas';

export interface EstadoTarjeta {
  caja: number;
  /** Próxima fecha de repaso. */
  proxima: string;
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
  return { caja, proxima: limitarAntesDeLaPrueba(sumarDias(hoy, INTERVALOS[caja - 1]!), hoy) };
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
    const { caja, proxima } = e as Partial<EstadoTarjeta>;
    if (typeof caja === 'number' && caja >= 1 && caja <= CAJA_MAXIMA && typeof proxima === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(proxima)) {
      salida[id] = { caja: Math.trunc(caja), proxima };
    }
  }
  return salida;
}
