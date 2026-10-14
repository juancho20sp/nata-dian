import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(import.meta.dirname, '..');
const dossier = readFileSync(join(raiz, 'fuentes', 'contenido-dossier.md'), 'utf8');
interface Tarjeta {
  id: string;
  mazo: string;
  frente: string;
  reverso: string;
  quiz: boolean;
  fuente: { ruta?: string; ancla?: string; regla?: string };
}
const todas = JSON.parse(readFileSync(join(raiz, 'src', 'content', 'tarjetas.json'), 'utf8')) as Tarjeta[];
/** Tarjetas del dossier (fuente: página del sitio) y de reglas (fuente: regla verificada). */
const tarjetas = todas.filter((t) => !t.fuente.regla);
const deReglas = todas.filter((t) => t.fuente.regla);
const reglas = new Map(
  (JSON.parse(readFileSync(join(raiz, 'src', 'content', 'reglas.json'), 'utf8')) as { id: string; cita: string }[]).map((r) => [r.id, r]),
);

/** Solo letras y números en minúscula, con espacios: ignora negritas, enlaces, tablas y puntuación. */
function normalizar(texto: string): string {
  return texto
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}
const dossierNormalizado = ` ${normalizar(dossier)} `;

/** Citas oficiales que corrigen al dossier (sección "Alertas" de la investigación). */
const investigacion = readFileSync(join(raiz, 'fuentes', 'investigacion-casos.md'), 'utf8');
const alertas = investigacion.split('## Alertas antes de hacer tarjetas')[1]!.split('\n---')[0]!;
const citasOficiales = [...alertas.matchAll(/"([^"]+)"/g)].map((m) => ` ${normalizar(m[1]!)} `);

describe('tarjetas del dossier', () => {
  it('hay entre 40 y 60', () => {
    expect(tarjetas.length).toBeGreaterThanOrEqual(40);
    expect(tarjetas.length).toBeLessThanOrEqual(60);
  });

  it('los id son únicos (en todas las tarjetas)', () => {
    expect(new Set(todas.map((t) => t.id)).size).toBe(todas.length);
  });

  for (const t of tarjetas) {
    it(`el reverso sale del dossier o de una cita oficial: ${t.id}`, () => {
      // Con espacios a los lados, para que "714" no coincida dentro de "7140".
      const buscado = ` ${normalizar(t.reverso)} `;
      expect([dossierNormalizado, ...citasOficiales].some((f) => f.includes(buscado))).toBe(true);
    });
  }

  const mazos = [...new Set(todas.map((t) => t.mazo))];
  for (const mazo of mazos) {
    const aptas = todas.filter((t) => t.mazo === mazo && t.quiz);
    it(`${mazo}: al menos 3 aptas para quiz`, () => {
      expect(aptas.length).toBeGreaterThanOrEqual(3);
    });
    it(`${mazo}: sin reversos repetidos entre las aptas`, () => {
      const reversos = aptas.map((t) => normalizar(t.reverso));
      expect(new Set(reversos).size).toBe(reversos.length);
    });
  }
});

describe('tarjetas de reglas', () => {
  for (const t of deReglas) {
    it(`${t.id}: remite a una regla existente y su reverso está en la cita`, () => {
      const regla = reglas.get(t.fuente.regla!);
      expect(regla, `regla ${t.fuente.regla}`).toBeDefined();
      expect(` ${normalizar(regla!.cita)} `).toContain(` ${normalizar(t.reverso)} `);
    });
  }

  const mazosDeReglas = [...new Set(deReglas.map((t) => t.mazo))];
  for (const mazo of mazosDeReglas) {
    it(`${mazo}: al menos 10 tarjetas`, () => {
      expect(deReglas.filter((t) => t.mazo === mazo).length).toBeGreaterThanOrEqual(10);
    });
  }
});
