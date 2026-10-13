/**
 * Lógica de fechas del sitio. Todo se calcula en hora de Colombia
 * (America/Bogota, UTC−5 todo el año, sin horario de verano), sin importar
 * la zona horaria del navegador.
 */

export const ZONA_COLOMBIA = 'America/Bogota';

/** Inicio de la prueba escrita: domingo 8 de noviembre de 2026, 8:00 a. m. hora de Colombia. */
export const INICIO_PRUEBA = new Date('2026-11-08T08:00:00-05:00');

/** Fecha de la prueba en formato ISO (AAAA-MM-DD). */
export const FECHA_PRUEBA = '2026-11-08';

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const formatoISO = new Intl.DateTimeFormat('en-CA', {
  timeZone: ZONA_COLOMBIA,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** Fecha calendario (AAAA-MM-DD) que corresponde a `instante` en Colombia. */
export function fechaEnColombia(instante: Date): string {
  return formatoISO.format(instante);
}

function aUTC(iso: string): Date {
  const [a, m, d] = iso.split('-').map(Number) as [number, number, number];
  return new Date(Date.UTC(a, m - 1, d));
}

/** Suma `n` días a una fecha ISO (AAAA-MM-DD). */
export function sumarDias(iso: string, n: number): string {
  const f = aUTC(iso);
  f.setUTCDate(f.getUTCDate() + n);
  return f.toISOString().slice(0, 10);
}

/** Día de la semana de una fecha ISO: 0 = domingo … 6 = sábado. */
export function diaDeLaSemana(iso: string): number {
  return aUTC(iso).getUTCDay();
}

/** "martes 13 de octubre" */
export function fechaLarga(iso: string): string {
  const f = aUTC(iso);
  return `${DIAS[f.getUTCDay()]} ${f.getUTCDate()} de ${MESES[f.getUTCMonth()]}`;
}

/** "12 al 18 de octubre" o "26 de octubre al 1 de noviembre" */
export function rangoLegible(inicio: string, fin: string): string {
  const a = aUTC(inicio);
  const b = aUTC(fin);
  const mesA = MESES[a.getUTCMonth()];
  const mesB = MESES[b.getUTCMonth()];
  return mesA === mesB
    ? `${a.getUTCDate()} al ${b.getUTCDate()} de ${mesB}`
    : `${a.getUTCDate()} de ${mesA} al ${b.getUTCDate()} de ${mesB}`;
}

export interface RangoSemana {
  id: string;
  inicio: string;
  fin: string;
}

export type EstadoSemana<S extends RangoSemana> =
  | { estado: 'antes'; primera: S }
  | { estado: 'durante'; semana: S; indice: number }
  /** Ningún rango contiene la fecha pero está entre la primera y la última (hueco). */
  | { estado: 'hueco' }
  | { estado: 'despues'; ultima: S };

/**
 * Semana del plan que corre en `instante` (hora de Colombia).
 * Las semanas deben venir ordenadas por fecha de inicio.
 */
export function semanaActual<S extends RangoSemana>(semanas: readonly S[], instante: Date): EstadoSemana<S> {
  if (semanas.length === 0) throw new Error('El plan no tiene semanas');
  const hoy = fechaEnColombia(instante);
  const primera = semanas[0]!;
  const ultima = semanas[semanas.length - 1]!;
  if (hoy < primera.inicio) return { estado: 'antes', primera };
  if (hoy > ultima.fin) return { estado: 'despues', ultima };
  const indice = semanas.findIndex((s) => s.inicio <= hoy && hoy <= s.fin);
  if (indice === -1) return { estado: 'hueco' };
  return { estado: 'durante', semana: semanas[indice]!, indice };
}

export interface CuentaRegresiva {
  terminada: boolean;
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

/** Tiempo que falta desde `instante` hasta `objetivo` (por defecto, el inicio de la prueba). */
export function cuentaRegresiva(instante: Date, objetivo: Date = INICIO_PRUEBA): CuentaRegresiva {
  const ms = objetivo.getTime() - instante.getTime();
  if (ms <= 0) return { terminada: true, dias: 0, horas: 0, minutos: 0, segundos: 0 };
  const totalSegundos = Math.floor(ms / 1000);
  return {
    terminada: false,
    dias: Math.floor(totalSegundos / 86_400),
    horas: Math.floor((totalSegundos % 86_400) / 3_600),
    minutos: Math.floor((totalSegundos % 3_600) / 60),
    segundos: totalSegundos % 60,
  };
}
