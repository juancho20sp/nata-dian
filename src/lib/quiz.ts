/** Quiz de tres opciones (A, B, C) armado con las tarjetas del dossier aptas para quiz. */
import { tocaHoy, type Estados } from './repaso';

export interface TarjetaQuiz {
  id: string;
  mazo: string;
  frente: string;
  reverso: string;
  quiz: boolean;
}

export interface PreguntaQuiz {
  id: string;
  mazo: string;
  pregunta: string;
  /** Tres opciones distintas, ya mezcladas. */
  opciones: [string, string, string];
  /** Índice (0 a 2) de la opción correcta. */
  correcta: number;
}

export const PREGUNTAS_POR_QUIZ = 10;
export const MINIMO_POR_MAZO = 3;

/** Generador pseudoaleatorio con semilla (mulberry32), para pruebas reproducibles. */
export function azarConSemilla(semilla: number): () => number {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mezclar<T>(lista: readonly T[], azar: () => number): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [copia[i], copia[j]] = [copia[j]!, copia[i]!];
  }
  return copia;
}

/** Tarjetas aptas de los mazos que tienen al menos tres aptas. */
export function candidatas(tarjetas: readonly TarjetaQuiz[]): TarjetaQuiz[] {
  const aptas = tarjetas.filter((t) => t.quiz);
  const porMazo = new Map<string, number>();
  for (const t of aptas) porMazo.set(t.mazo, (porMazo.get(t.mazo) ?? 0) + 1);
  return aptas.filter((t) => (porMazo.get(t.mazo) ?? 0) >= MINIMO_POR_MAZO);
}

/**
 * Elige hasta 10 tarjetas: primero las que tocan hoy, luego las de caja más baja,
 * y desempata al azar. Cada pregunta lleva su reverso y dos reversos distintos
 * de otras tarjetas aptas del mismo mazo.
 */
export function armarQuiz(tarjetas: readonly TarjetaQuiz[], estados: Estados, hoy: string, azar: () => number = Math.random): PreguntaQuiz[] {
  const pool = candidatas(tarjetas);
  const prioridad = (t: TarjetaQuiz) => (tocaHoy(estados[t.id], hoy) ? 0 : 10) + (estados[t.id]?.caja ?? 1);
  const elegidas = mezclar(pool, azar)
    .sort((a, b) => prioridad(a) - prioridad(b))
    .slice(0, PREGUNTAS_POR_QUIZ);

  return elegidas.map((t) => {
    const otros = [...new Set(pool.filter((o) => o.mazo === t.mazo && o.id !== t.id && o.reverso !== t.reverso).map((o) => o.reverso))];
    const distractores = mezclar(otros, azar).slice(0, 2);
    const opciones = mezclar([t.reverso, ...distractores], azar) as [string, string, string];
    return { id: t.id, mazo: t.mazo, pregunta: t.frente, opciones, correcta: opciones.indexOf(t.reverso) };
  });
}
