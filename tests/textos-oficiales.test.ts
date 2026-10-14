import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const DIR = join(import.meta.dirname, '..', 'fuentes', 'normas');
const OFICIALES = ['secretariasenado.gov.co', 'normograma.dian.gov.co', 'funcionpublica.gov.co', 'suin-juriscol.gov.co'];
/** Rótulos de notas editoriales de las compilaciones, que no deben quedar en las copias. */
// "derecho de autor" a secas no se busca: es texto normativo en artículos de propiedad intelectual (D. 1165).
const EDITORIAL = /Jurisprudencia Vigencia|Notas de Vigencia|Concordancias|Doctrina Concordante|Legislaci[oó]n Anterior|Notas del Editor|Ir al inicio|Avance Jur[íi]dico|protegidas por las normas sobre derecho de autor/i;

export interface Copia {
  id: string;
  titulo: string;
  fuentes: string[];
  consultado: string;
  articulos: { numero: string; texto: string; estado: 'vigente' | 'derogado' | 'modificado' }[];
}

export const copias: Copia[] = readdirSync(DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(DIR, f), 'utf8')) as Copia);

/** Errores de formato de una copia (vacío si está bien). */
export function erroresDeCopia(c: Copia): string[] {
  const errores: string[] = [];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(c.consultado)) errores.push('fecha de consulta inválida');
  for (const u of c.fuentes) {
    const host = new URL(u).hostname;
    if (!OFICIALES.some((d) => host === d || host.endsWith(`.${d}`))) errores.push(`fuente no oficial: ${u}`);
  }
  const numeros = c.articulos.map((a) => a.numero);
  if (new Set(numeros).size !== numeros.length) errores.push('números de artículo repetidos');
  for (const a of c.articulos) {
    if (!/^\d+(-\d+)?$/.test(a.numero)) errores.push(`número inválido: ${a.numero}`);
    if (EDITORIAL.test(a.texto)) errores.push(`nota editorial en el art. ${a.numero}`);
    if (!['vigente', 'derogado', 'modificado'].includes(a.estado)) errores.push(`estado inválido en el art. ${a.numero}`);
  }
  return errores;
}

describe('copias del texto oficial', () => {
  it('hay una copia por cada norma enlazada (12)', () => {
    expect(copias.map((c) => c.id).sort()).toEqual(
      [
        'cpaca',
        'decreto-1165-2019',
        'dl-2245-2011',
        'dl-920-2023',
        'dl-927-2023',
        'et',
        'ley-1116-2006',
        'ley-1609-2013',
        'ley-1952-2019',
        'ley-2010-2019',
        'ley-2220-2022',
        'ley-2586-2026',
      ].sort(),
    );
  });

  for (const c of copias) {
    it(`${c.id}: formato, fuentes oficiales y sin notas editoriales`, () => {
      expect(c.articulos.length).toBeGreaterThan(0);
      expect(erroresDeCopia(c)).toEqual([]);
    });
  }

  it('detecta una nota editorial insertada en un artículo', () => {
    const c = copias[0]!;
    const alterada: Copia = { ...c, articulos: [{ ...c.articulos[0]!, texto: `${c.articulos[0]!.texto} Jurisprudencia Vigencia` }] };
    expect(erroresDeCopia(alterada)).toContain(`nota editorial en el art. ${c.articulos[0]!.numero}`);
  });
});

// ── Citas de las reglas contra la copia oficial ─────────────────────────────

interface Regla {
  id: string;
  cita: string;
  articulos: { norma: string; numero: string }[];
}
const reglas = JSON.parse(readFileSync(join(import.meta.dirname, '..', 'src', 'content', 'reglas.json'), 'utf8')) as Regla[];
const porNorma = new Map(copias.map((c) => [c.id, new Map(c.articulos.map((a) => [a.numero, a.texto]))]));

/** Solo letras y números en minúscula, separados por un espacio. */
const normalizar = (t: string) =>
  ` ${t
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()} `;

/** Fragmentos citados: los textos entre comillas; si no hay, la cita completa. */
export function fragmentos(cita: string): string[] {
  const entreComillas = [...cita.matchAll(/["“]([^"”]+)["”]/g)].map((m) => m[1]!);
  return entreComillas.length > 0 ? entreComillas : [cita];
}

/** true si los trozos del fragmento (separados por "…") aparecen en orden en el texto. */
function aparece(fragmento: string, texto: string): boolean {
  const t = normalizar(texto);
  let desde = 0;
  for (const trozo of fragmento.split(/…|\.\.\./)) {
    const n = normalizar(trozo);
    if (n.trim() === '') continue;
    const i = t.indexOf(n, desde);
    if (i === -1) return false;
    desde = i + n.length - 1;
  }
  return true;
}

/** Errores de verificación de una regla: fragmentos que no aparecen en ninguno de sus artículos. */
export function erroresDeRegla(r: Regla): string[] {
  const textos = r.articulos.map((a) => porNorma.get(a.norma)?.get(a.numero));
  if (textos.some((t) => t === undefined)) {
    const faltan = r.articulos.filter((_, i) => textos[i] === undefined).map((a) => `${a.norma} art. ${a.numero}`);
    return [`${r.id}: artículo sin copia (${faltan.join(', ')})`];
  }
  return fragmentos(r.cita)
    .filter((f) => !textos.some((t) => aparece(f, t!)))
    .map((f) => `${r.id}: "${f.slice(0, 60)}" no aparece en ${r.articulos.map((a) => `${a.norma} art. ${a.numero}`).join(', ')}`);
}

describe('citas de las reglas verificadas contra la copia oficial', () => {
  for (const r of reglas) {
    it(r.id, () => {
      expect(erroresDeRegla(r)).toEqual([]);
    });
  }

  it('una cita alterada falla nombrando la regla y el artículo', () => {
    const r = reglas.find((x) => x.id === 'a-respuesta-al-requerimiento')!;
    const alterada = { ...r, cita: r.cita.replace('tres (3) meses', 'cuatro (4) meses') };
    const errores = erroresDeRegla(alterada);
    expect(errores).toHaveLength(1);
    expect(errores[0]).toContain('a-respuesta-al-requerimiento');
    expect(errores[0]).toContain('et art. 707');
  });
});
