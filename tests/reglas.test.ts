import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(import.meta.dirname, '..');
const investigacion = readFileSync(join(raiz, 'fuentes', 'investigacion-casos.md'), 'utf8');
const todas = JSON.parse(readFileSync(join(raiz, 'src', 'content', 'reglas.json'), 'utf8')) as {
  id: string;
  caso: string;
  cita: string;
  url: string;
  url2?: string;
  origen: 'investigacion' | 'copia';
}[];
/** Las reglas tomadas de la investigación se comparan con su fila; todas se verifican además contra la copia oficial (tests/textos-oficiales.test.ts). */
const reglas = todas.filter((r) => r.origen === 'investigacion');

const OFICIALES = ['secretariasenado.gov.co', 'normograma.dian.gov.co', 'funcionpublica.gov.co', 'suin-juriscol.gov.co', 'cnsc.gov.co'];

/** Filas de tabla de la sección 3 marcadas "Verificado". */
const filasVerificadas = investigacion
  .split('## 3. Sustancia verificada por caso')[1]!
  .split('## 4.')[0]!
  .split('\n')
  .filter((l) => l.startsWith('|') && /\|\s*Verificado/.test(l));

describe('registro de reglas', () => {
  it('no hay más reglas de la investigación que filas verificadas', () => {
    // Las reglas reescritas con cita literal de la norma pasan a origen "copia" (se verifican contra la copia oficial).
    expect(reglas.length).toBeLessThanOrEqual(filasVerificadas.length);
  });

  it('los id son únicos', () => {
    expect(new Set(todas.map((r) => r.id)).size).toBe(todas.length);
  });

  it('cubre los cuatro casos y el tronco común', () => {
    for (const c of ['A', 'B', 'C', 'D', 'T']) expect(todas.some((r) => r.caso === c)).toBe(true);
  });

  for (const r of reglas) {
    it(`${r.id}: la cita está en una fila "Verificado"`, () => {
      expect(filasVerificadas.some((f) => f.includes(r.cita))).toBe(true);
    });
  }

  for (const r of todas) {
    it(`${r.id}: las URL son de dominios oficiales`, () => {
      for (const u of [r.url, r.url2].filter(Boolean) as string[]) {
        const host = new URL(u).hostname;
        expect(OFICIALES.some((d) => host === d || host.endsWith(`.${d}`))).toBe(true);
      }
    });
  }
});
