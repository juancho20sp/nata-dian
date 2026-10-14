import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(import.meta.dirname, '..');
const investigacion = readFileSync(join(raiz, 'fuentes', 'investigacion-casos.md'), 'utf8');
const reglas = JSON.parse(readFileSync(join(raiz, 'src', 'content', 'reglas.json'), 'utf8')) as {
  id: string;
  caso: string;
  cita: string;
  url: string;
  url2?: string;
}[];

const OFICIALES = ['secretariasenado.gov.co', 'normograma.dian.gov.co', 'funcionpublica.gov.co', 'suin-juriscol.gov.co', 'cnsc.gov.co'];

/** Filas de tabla de la sección 3 marcadas "Verificado". */
const filasVerificadas = investigacion
  .split('## 3. Sustancia verificada por caso')[1]!
  .split('## 4.')[0]!
  .split('\n')
  .filter((l) => l.startsWith('|') && /\|\s*Verificado/.test(l));

describe('registro de reglas', () => {
  it('tiene una regla por fila verificada de la investigación', () => {
    expect(reglas.length).toBe(filasVerificadas.length);
  });

  it('los id son únicos', () => {
    expect(new Set(reglas.map((r) => r.id)).size).toBe(reglas.length);
  });

  it('cubre los cuatro casos y el tronco común', () => {
    expect(new Set(reglas.map((r) => r.caso))).toEqual(new Set(['A', 'B', 'C', 'D', 'T']));
  });

  for (const r of reglas) {
    it(`${r.id}: la cita está en una fila "Verificado"`, () => {
      expect(filasVerificadas.some((f) => f.includes(r.cita))).toBe(true);
    });

    it(`${r.id}: las URL son de dominios oficiales`, () => {
      for (const u of [r.url, r.url2].filter(Boolean) as string[]) {
        const host = new URL(u).hostname;
        expect(OFICIALES.some((d) => host === d || host.endsWith(`.${d}`))).toBe(true);
      }
    });
  }
});
