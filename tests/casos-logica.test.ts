import { describe, expect, it } from 'vitest';
import { avanceVigente, casoDeLaUrl, ordenarCasos, registrarCaso, resumenCasos, type CasoPractica } from '../src/lib/casos';
import { azarConSemilla } from '../src/lib/quiz';

const casos: CasoPractica[] = (['A', 'B', 'C', 'D', 'T'] as const).flatMap((c) =>
  [1, 2, 3, 4].map((n) => ({ id: `${c.toLowerCase()}${n}`, caso: c })),
);

describe('ordenarCasos', () => {
  it('con "todos", cada ronda de cinco tiene un caso de cada tipo', () => {
    const orden = ordenarCasos(casos, {}, 'todos', azarConSemilla(3));
    expect(orden).toHaveLength(20);
    for (let r = 0; r < 4; r++) {
      expect(new Set(orden.slice(r * 5, r * 5 + 5).map((c) => c.caso)).size).toBe(5);
    }
  });

  it('no repite ningún caso de práctica', () => {
    const orden = ordenarCasos(casos, {}, 'todos', azarConSemilla(8));
    expect(new Set(orden.map((c) => c.id)).size).toBe(orden.length);
  });

  it('los fallados van primero, luego los sin responder y al final los acertados', () => {
    const avance = { b1: { acierto: true }, b2: { acierto: false } };
    const orden = ordenarCasos(casos, avance, 'B', azarConSemilla(1)).map((c) => c.id);
    expect(orden[0]).toBe('b2');
    expect(orden.at(-1)).toBe('b1');
    expect(orden.every((id) => id.startsWith('b'))).toBe(true);
  });

  it('si un caso se agota, siguen alternando los demás', () => {
    const pocos = [...casos.filter((c) => c.caso !== 'C'), { id: 'c1', caso: 'C' as const }];
    const orden = ordenarCasos(pocos, {}, 'todos', azarConSemilla(2));
    expect(orden.filter((c) => c.caso === 'C')).toHaveLength(1);
    expect(orden).toHaveLength(17);
  });
});

describe('avance', () => {
  it('registra el último resultado y resume por caso', () => {
    let a = registrarCaso({}, 'a1', false);
    a = registrarCaso(a, 'a1', true);
    a = registrarCaso(a, 'b1', false);
    expect(a).toEqual({ a1: { acierto: true }, b1: { acierto: false } });
    const r = resumenCasos(casos, a);
    expect(r.A).toEqual({ acertados: 1, total: 4 });
    expect(r.B).toEqual({ acertados: 0, total: 4 });
  });

  it('descarta avance corrupto o de casos inexistentes', () => {
    expect(avanceVigente({ a1: { acierto: true }, zz: { acierto: true }, a2: 'x' }, ['a1', 'a2'])).toEqual({ a1: { acierto: true } });
    expect(avanceVigente(null, ['a1'])).toEqual({});
  });

  it('lee el filtro de la URL', () => {
    expect(casoDeLaUrl('?caso=B')).toBe('B');
    expect(casoDeLaUrl('?caso=X')).toBe('todos');
    expect(casoDeLaUrl('')).toBe('todos');
  });
});
