import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { armarQuiz, azarConSemilla, candidatas, type TarjetaQuiz } from '../src/lib/quiz';

const tarjetas = JSON.parse(readFileSync(join(import.meta.dirname, '..', 'src', 'content', 'tarjetas.json'), 'utf8')) as TarjetaQuiz[];
const HOY = '2026-10-20';

describe('armarQuiz con las tarjetas reales', () => {
  for (const semilla of [1, 2, 3, 42, 2676]) {
    const quiz = armarQuiz(tarjetas, {}, HOY, azarConSemilla(semilla));
    const porId = new Map(tarjetas.map((t) => [t.id, t]));

    it(`semilla ${semilla}: 10 preguntas sin repetir`, () => {
      expect(quiz).toHaveLength(10);
      expect(new Set(quiz.map((p) => p.id)).size).toBe(10);
    });

    it(`semilla ${semilla}: tres opciones distintas del mismo mazo y una sola correcta`, () => {
      for (const p of quiz) {
        const t = porId.get(p.id)!;
        expect(new Set(p.opciones).size).toBe(3);
        expect(p.opciones[p.correcta]).toBe(t.reverso);
        expect(p.opciones.filter((o) => o === t.reverso)).toHaveLength(1);
        const reversosDelMazo = tarjetas.filter((o) => o.mazo === t.mazo && o.quiz).map((o) => o.reverso);
        for (const o of p.opciones) expect(reversosDelMazo).toContain(o);
      }
    });
  }

  it('la misma semilla da el mismo quiz', () => {
    expect(armarQuiz(tarjetas, {}, HOY, azarConSemilla(7))).toEqual(armarQuiz(tarjetas, {}, HOY, azarConSemilla(7)));
  });
});

describe('selección', () => {
  const mazo = (m: string, n: number, quiz = true): TarjetaQuiz[] =>
    Array.from({ length: n }, (_, i) => ({ id: `${m}-${i}`, mazo: m, frente: `¿${m} ${i}?`, reverso: `${m} r${i}`, quiz }));

  it('excluye mazos con menos de 3 aptas', () => {
    const ids = candidatas([...mazo('chico', 2), ...mazo('grande', 5)]).map((t) => t.mazo);
    expect(ids).not.toContain('chico');
    const quiz = armarQuiz([...mazo('chico', 2), ...mazo('grande', 5)], {}, HOY, azarConSemilla(1));
    expect(quiz.every((p) => p.mazo === 'grande')).toBe(true);
  });

  it('ignora las tarjetas no aptas', () => {
    expect(candidatas([...mazo('a', 4, false), ...mazo('b', 3)]).every((t) => t.mazo === 'b')).toBe(true);
  });

  it('prioriza las que tocan hoy sobre las que no', () => {
    const lote = mazo('m', 14);
    const estados = Object.fromEntries(lote.slice(0, 10).map((t) => [t.id, { caja: 3, proxima: '2026-10-25' }]));
    const elegidas = armarQuiz(lote, estados, HOY, azarConSemilla(9)).map((p) => p.id);
    for (const id of ['m-10', 'm-11', 'm-12', 'm-13']) expect(elegidas).toContain(id);
  });

  it('con menos de 10 candidatas, usa las que hay', () => {
    expect(armarQuiz(mazo('m', 4), {}, HOY, azarConSemilla(1))).toHaveLength(4);
  });
});
