import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(import.meta.dirname, '..');
const leer = <T,>(f: string) => JSON.parse(readFileSync(join(raiz, 'src', 'content', f), 'utf8')) as T;
const reglas = new Map(leer<{ id: string; norma: string }[]>('reglas.json').map((r) => [r.id, r]));
const casos = leer<{ id: string; caso: string; opciones: string[]; correcta: number; explicacion: string; reglas: string[] }[]>('casos.json');

/** Números de artículo o de norma (2 o más cifras) que aparecen en la norma de una regla. */
const numeros = (norma: string) => norma.match(/\d{2,}(-\d+)?/g) ?? [];

describe('casos de práctica', () => {
  it('los id son únicos', () => {
    expect(new Set(casos.map((c) => c.id)).size).toBe(casos.length);
  });

  for (const c of ['A', 'B', 'C', 'D', 'T']) {
    it(`caso ${c}: al menos 4`, () => {
      expect(casos.filter((x) => x.caso === c).length).toBeGreaterThanOrEqual(4);
    });
  }

  it('la respuesta correcta no está siempre en la misma posición', () => {
    expect(new Set(casos.map((c) => c.correcta)).size).toBe(3);
  });

  for (const c of casos) {
    it(`${c.id}: tres opciones distintas y una correcta en rango`, () => {
      expect(c.opciones).toHaveLength(3);
      expect(new Set(c.opciones).size).toBe(3);
      expect(c.correcta).toBeGreaterThanOrEqual(0);
      expect(c.correcta).toBeLessThanOrEqual(2);
    });

    it(`${c.id}: se apoya en reglas existentes y la explicación cita su norma`, () => {
      expect(c.reglas.length).toBeGreaterThan(0);
      for (const id of c.reglas) expect(reglas.has(id), id).toBe(true);
      const citados = c.reglas.flatMap((id) => numeros(reglas.get(id)!.norma));
      expect(citados.some((n) => c.explicacion.includes(n))).toBe(true);
    });
  }
});
