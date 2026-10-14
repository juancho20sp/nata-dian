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

/**
 * Citas oficiales que corrigen al dossier: los textos entre comillas de la sección
 * "Alertas" de fuentes/investigacion-casos.md (p. ej. la duración de la GOA 2676).
 */
const investigacion = readFileSync(join(raiz, 'fuentes', 'investigacion-casos.md'), 'utf8');
const alertas = investigacion.split('## Alertas antes de hacer tarjetas')[1]!.split('\n---')[0]!;
const citasOficiales = [...alertas.matchAll(/"([^"]+)"/g)].map((m) => m[1]!);

const fuentesNormalizadas = [normalizar(dossier), ...citasOficiales.map(normalizar)];

describe('Lo esencial', () => {
  for (const pagina of esencial) {
    describe(pagina.id, () => {
      it('tiene de 3 a 5 viñetas', () => {
        expect(pagina.vinetas.length).toBeGreaterThanOrEqual(3);
        expect(pagina.vinetas.length).toBeLessThanOrEqual(5);
      });

      for (const v of pagina.vinetas) {
        it(`sale del dossier o de una cita oficial: "${v.texto.slice(0, 50)}…"`, () => {
          expect(fuentesNormalizadas.some((f) => f.includes(normalizar(v.texto)))).toBe(true);
        });
      }
    });
  }
});
