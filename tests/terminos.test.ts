import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(import.meta.dirname, '..');
const leer = <T,>(f: string) => JSON.parse(readFileSync(join(raiz, 'src', 'content', f), 'utf8')) as T;
const reglas = new Map(leer<{ id: string; cita: string; norma: string }[]>('reglas.json').map((r) => [r.id, r]));
const terminos = leer<{ id: string; pasos: { acto: string; plazo: string; regla: string }[] }[]>('terminos.json');
const normalizar = (t: string) => ` ${t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()} `;

describe('líneas de tiempo de términos', () => {
  it('hay una por caso y una para el tronco común', () => {
    expect(terminos.map((t) => t.id).sort()).toEqual(['caso-a', 'caso-b', 'caso-c', 'caso-d', 'tronco']);
  });

  it('el Caso A sigue el orden requerimiento → respuesta → liquidación → reconsideración → fallo', () => {
    const normas = terminos.find((t) => t.id === 'caso-a')!.pasos.map((p) => reglas.get(p.regla)!.norma);
    const pos = (art: string) => normas.findIndex((n) => n.includes(art));
    const orden = ['705', '707', '710', '720', '732'].map(pos);
    expect(orden.every((x) => x >= 0)).toBe(true);
    expect([...orden].sort((a, b) => a - b)).toEqual(orden);
  });

  for (const t of terminos) {
    for (const p of t.pasos) {
      it(`${t.id} · ${p.acto.slice(0, 40)}: el plazo está en la cita de su regla`, () => {
        const r = reglas.get(p.regla);
        expect(r, p.regla).toBeDefined();
        expect(normalizar(r!.cita)).toContain(normalizar(p.plazo));
      });
    }
  }
});
