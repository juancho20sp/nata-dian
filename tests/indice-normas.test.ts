import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(import.meta.dirname, '..');
const leer = <T,>(...p: string[]) => JSON.parse(readFileSync(join(raiz, ...p), 'utf8')) as T;

interface Copia {
  id: string;
  articulos: { numero: string; estado: string }[];
}
interface Entrada {
  norma: string;
  numero: string;
  nivel: 1 | 2 | 3;
  tema: string;
  razon?: string;
}

const DIR = join(raiz, 'fuentes', 'normas');
const copias = readdirSync(DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => leer<Copia>('fuentes', 'normas', f));
const indice = leer<Entrada[]>('src', 'content', 'indice-normas.json');
const reglas = leer<{ id: string; articulos: { norma: string; numero: string }[] }[]>('src', 'content', 'reglas.json');
const tarjetas = leer<{ fuente: { regla?: string } }[]>('src', 'content', 'tarjetas.json');

const conTarjeta = new Set(tarjetas.filter((t) => t.fuente.regla).map((t) => t.fuente.regla!));
/** Artículos cubiertos por al menos una tarjeta (vía la regla que los cita). */
const cubiertos = new Set(reglas.filter((r) => conTarjeta.has(r.id)).flatMap((r) => r.articulos.map((a) => `${a.norma}:${a.numero}`)));
const clave = (e: { norma: string; numero: string }) => `${e.norma}:${e.numero}`;

describe('índice de artículos', () => {
  it('cada artículo de cada copia aparece una sola vez en el índice', () => {
    const enIndice = indice.map(clave);
    expect(new Set(enIndice).size).toBe(enIndice.length);
    const enCopias = copias.flatMap((c) => c.articulos.map((a) => `${c.id}:${a.numero}`));
    expect([...enIndice].sort()).toEqual([...enCopias].sort());
  });

  it('los artículos derogados son nivel 3', () => {
    const derogados = new Set(copias.flatMap((c) => c.articulos.filter((a) => a.estado === 'derogado').map((a) => `${c.id}:${a.numero}`)));
    const mal = indice.filter((e) => derogados.has(clave(e)) && e.nivel !== 3).map(clave);
    expect(mal).toEqual([]);
  });

  it('todo artículo de nivel 1 tiene tarjeta o una razón registrada', () => {
    const pendientes = indice.filter((e) => e.nivel === 1 && !cubiertos.has(clave(e)) && !e.razon?.trim()).map(clave);
    expect(pendientes).toEqual([]);
  });

  for (const c of copias) {
    it(`${c.id}: al menos 3 tarjetas`, () => {
      const n = tarjetas.filter((t) => {
        const r = reglas.find((x) => x.id === t.fuente.regla);
        return r?.articulos.some((a) => a.norma === c.id);
      }).length;
      expect(n).toBeGreaterThanOrEqual(3);
    });
  }
});
