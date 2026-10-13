import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(import.meta.dirname, '..');
const dossier = readFileSync(join(raiz, 'fuentes', 'contenido-dossier.md'), 'utf8');
const esencial = JSON.parse(readFileSync(join(raiz, 'src', 'content', 'esencial.json'), 'utf8')) as {
  id: string;
  vinetas: { texto: string }[];
}[];

/** Solo letras y números en minúscula: ignora negritas, enlaces, tablas y puntuación. */
function normalizar(texto: string): string {
  return texto
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

const dossierNormalizado = normalizar(dossier);

describe('Lo esencial', () => {
  for (const pagina of esencial) {
    describe(pagina.id, () => {
      it('tiene de 3 a 5 viñetas', () => {
        expect(pagina.vinetas.length).toBeGreaterThanOrEqual(3);
        expect(pagina.vinetas.length).toBeLessThanOrEqual(5);
      });

      for (const v of pagina.vinetas) {
        it(`sale del dossier: "${v.texto.slice(0, 50)}…"`, () => {
          expect(dossierNormalizado).toContain(normalizar(v.texto));
        });
      }
    });
  }
});
