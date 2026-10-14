import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(import.meta.dirname, '..');
const dossier = readFileSync(join(raiz, 'fuentes', 'contenido-dossier.md'), 'utf8');
const tarjetas = JSON.parse(readFileSync(join(raiz, 'src', 'content', 'tarjetas.json'), 'utf8')) as {
  id: string;
  mazo: string;
  frente: string;
  reverso: string;
  quiz: boolean;
}[];

/** Solo letras y números en minúscula, con espacios: ignora negritas, enlaces, tablas y puntuación. */
function normalizar(texto: string): string {
  return texto
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}
const dossierNormalizado = ` ${normalizar(dossier)} `;

describe('tarjetas del dossier', () => {
  it('hay entre 40 y 60', () => {
    expect(tarjetas.length).toBeGreaterThanOrEqual(40);
    expect(tarjetas.length).toBeLessThanOrEqual(60);
  });

  it('los id son únicos', () => {
    expect(new Set(tarjetas.map((t) => t.id)).size).toBe(tarjetas.length);
  });

  for (const t of tarjetas) {
    it(`el reverso sale del dossier: ${t.id}`, () => {
      // Con espacios a los lados, para que "714" no coincida dentro de "7140".
      expect(dossierNormalizado).toContain(` ${normalizar(t.reverso)} `);
    });
  }

  const mazos = [...new Set(tarjetas.map((t) => t.mazo))];
  for (const mazo of mazos) {
    const aptas = tarjetas.filter((t) => t.mazo === mazo && t.quiz);
    it(`${mazo}: al menos 3 aptas para quiz`, () => {
      expect(aptas.length).toBeGreaterThanOrEqual(3);
    });
    it(`${mazo}: sin reversos repetidos entre las aptas`, () => {
      const reversos = aptas.map((t) => normalizar(t.reverso));
      expect(new Set(reversos).size).toBe(reversos.length);
    });
  }
});
