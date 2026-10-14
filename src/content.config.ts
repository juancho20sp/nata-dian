import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const fechaISO = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use el formato AAAA-MM-DD');
const idEstable = z.string().regex(/^[a-z0-9-]+$/, 'Solo minúsculas, números y guiones');

/** Rótulos de las advertencias del dossier (el texto en negrita que abre cada blockquote). */
export const AVISOS = [
  'Datos de terceros',
  'Dato inferido',
  'Dato aproximado',
  'Fecha no oficial',
  'Lista construida',
  'Precaución',
  'Verifique el enlace',
  'Vigencia',
] as const;

export const semanaSchema = z.object({
  id: idEstable,
  inicio: fechaISO,
  fin: fechaISO,
  temas: z.string(),
  normas: z.array(z.string()),
  horas: z.number().int().positive().optional(),
  /** "estudio": la semana es el tronco común; "repaso": se repasa el tronco común. */
  tronco: z.enum(['estudio', 'repaso']).optional(),
});

export const tareaSchema = z.object({
  id: idEstable,
  texto: z.string(),
});

const planes = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/planes' }),
  schema: z
    .object({
      slug: idEstable,
      tipo: z.enum(['plan', 'tronco']),
      orden: z.number().int(),
      titulo: z.string(),
      tituloCorto: z.string(),
      resumen: z.string(),
      notas: z.array(z.string()).default([]),
      /** Aclaración sobre la columna de normas (p. ej. "Estatuto Tributario salvo indicación"). */
      notaNormas: z.string().optional(),
      semanas: z.array(semanaSchema),
      tareas: z.array(tareaSchema),
      /** Pendientes visibles: datos que el dossier no trae. */
      todo: z.array(z.string()).default([]),
      /** Advertencias que se marcan en "Sobre este plan". */
      aviso: z.array(z.enum(AVISOS)).default([]),
      // Solo para el tronco común
      temas: z
        .array(z.object({ tema: z.string(), dominar: z.string(), norma: z.string() }))
        .optional(),
      rutina: z
        .object({ horas: z.string(), pasos: z.array(z.string()) })
        .optional(),
      juicioSituacional: z.string().optional(),
      comportamentales: z.string().optional(),
    })
    .refine((p) => p.tipo === 'tronco' || p.semanas.length > 0, {
      message: 'Un plan de tipo "plan" necesita semanas',
    })
    .refine((p) => p.tipo === 'plan' || (p.temas?.length ?? 0) > 0, {
      message: 'El tronco común necesita la tabla de temas',
    }),
});

const normativa = defineCollection({
  loader: file('src/content/normativa.json'),
  schema: z.object({
    id: idEstable,
    area: z.string(),
    normas: z.string(),
    empleos: z.array(z.string()).min(1),
    enlace: z.object({ texto: z.string(), url: z.url() }).optional(),
    aviso: z.array(z.enum(AVISOS)).default([]),
    /** Texto del aviso, visible dentro del área. */
    nota: z.string().optional(),
  }),
});

const recursos = defineCollection({
  loader: file('src/content/recursos.json'),
  schema: z.object({
    id: idEstable,
    nombre: z.string(),
    url: z.url(),
    tipo: z.string(),
    uso: z.string(),
    oficial: z.boolean(),
    advertencia: z.string().optional(),
  }),
});

const porcentaje = z.number().int().min(0).max(100);

const ponderacion = defineCollection({
  loader: file('src/content/ponderacion.json'),
  schema: z
    .object({
      id: idEstable,
      modalidad: z.enum(['Ingreso', 'Ascenso']),
      tipoEmpleo: z.string(),
      funcionales: porcentaje,
      comportamentales: porcentaje,
      integridad: porcentaje,
      /** null = "No aplica" */
      antecedentes: porcentaje.nullable(),
    })
    .refine(
      (f) => f.funcionales + f.comportamentales + f.integridad + (f.antecedentes ?? 0) === 100,
      { message: 'La ponderación de cada fila debe sumar 100 %' },
    ),
});

const fuentes = defineCollection({
  loader: file('src/content/fuentes.json'),
  schema: z.object({
    id: idEstable,
    titulo: z.string(),
    url: z.url(),
  }),
});


const paginas = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/paginas' }),
  schema: z.object({
    titulo: z.string(),
    /** Una línea que se ve con la sección plegada. */
    resumen: z.string().min(10).max(140),
    /** Advertencias que contiene la sección; se marcan en su encabezado. */
    aviso: z.array(z.enum(AVISOS)).default([]),
  }),
});

/** Bloque "Lo esencial" de cada página de consulta: frases copiadas del dossier. */
const esencial = defineCollection({
  loader: file('src/content/esencial.json'),
  schema: z.object({
    id: z.enum(['prueba', 'prueba-dia', 'prueba-practicar', 'normativa', 'convocatoria']),
    vinetas: z
      .array(
        z.object({
          texto: z.string(),
          /** Id de la sección plegable de la misma página a la que lleva la viñeta. */
          ancla: idEstable.optional(),
          aviso: z.enum(AVISOS).optional(),
        }),
      )
      .min(3, 'Lo esencial necesita al menos 3 viñetas')
      .max(5, 'Lo esencial admite como máximo 5 viñetas'),
  }),
});

/** Dominios oficiales admitidos como fuente de una regla. */
export const DOMINIOS_OFICIALES = [
  'secretariasenado.gov.co',
  'normograma.dian.gov.co',
  'funcionpublica.gov.co',
  'suin-juriscol.gov.co',
  'cnsc.gov.co',
] as const;

const urlOficial = z.url().refine(
  (u) => DOMINIOS_OFICIALES.some((d) => new URL(u).hostname === d || new URL(u).hostname.endsWith(`.${d}`)),
  'La URL debe ser de un dominio oficial',
);

/** Ids de las copias del texto oficial en fuentes/normas/. */
export const NORMAS_COPIADAS = [
  'et',
  'cpaca',
  'ley-1952-2019',
  'ley-2220-2022',
  'ley-2010-2019',
  'ley-1116-2006',
  'ley-1609-2013',
  'decreto-1165-2019',
  'dl-920-2023',
  'ley-2586-2026',
  'dl-2245-2011',
  'dl-927-2023',
] as const;

/**
 * Reglas verificadas contra el texto oficial de la norma, copiadas de las filas
 * "Verificado" de fuentes/investigacion-casos.md (ver tests/reglas.test.ts).
 */
const reglas = defineCollection({
  loader: file('src/content/reglas.json'),
  schema: z.object({
    id: idEstable,
    /** A fiscalización, B cobranzas, C jurídica, D aduanas y cambiario, T tronco común, CD carrera y disciplinario. */
    caso: z.enum(['A', 'B', 'C', 'D', 'T', 'CD']),
    regla: z.string(),
    cita: z.string().min(5),
    norma: z.string(),
    url: urlOficial,
    url2: urlOficial.optional(),
    /** Texto igual en la Ley 2586 de 2026 y en el Decreto Ley 920 de 2023. */
    ambasNormasAduaneras: z.boolean().optional(),
    /** De dónde salió: una fila "Verificado" de la investigación o directamente la copia oficial. */
    origen: z.enum(['investigacion', 'copia']),
    /** Artículos que cita, para verificar la cita contra la copia oficial (fuentes/normas/). */
    articulos: z.array(z.object({ norma: z.enum(NORMAS_COPIADAS), numero: z.string().regex(/^\d+(-\d+)?$/) })).min(1),
  }),
});

/** Mazos de las tarjetas de repaso. "Mis tarjetas" no está aquí: esas viven en el navegador. */
export const MAZOS = [
  'La prueba',
  'Tronco común',
  'Procedimiento tributario',
  'Cobro',
  'Aduanero y cambiario',
  'Contexto',
  // Mazos de reglas verificadas (fuentes/investigacion-casos.md)
  'Caso A: fiscalización',
  'Caso B: cobranzas',
  'Caso C: jurídica',
  'Caso D: aduanas y cambiario',
  'Procedimiento administrativo',
  'Carrera y disciplinario',
] as const;

/** Tarjetas de repaso: el reverso es siempre un fragmento literal del dossier (ver tests/tarjetas.test.ts). */
const tarjetas = defineCollection({
  loader: file('src/content/tarjetas.json'),
  schema: z.object({
    id: idEstable,
    mazo: z.enum(MAZOS),
    frente: z.string().min(5),
    reverso: z.string().min(1),
    /** Apta para el quiz de tres opciones. */
    quiz: z.boolean(),
    /**
     * De dónde sale el dato: una página y sección del sitio (tarjetas del dossier)
     * o una regla verificada de src/content/reglas.json (tarjetas de reglas).
     */
    fuente: z.union([
      z.object({ ruta: z.string().regex(/^\/[a-z0-9/-]*$/), ancla: idEstable.optional() }),
      z.object({ regla: idEstable }),
    ]),
  }),
});

/** Casos de práctica elaborados para el sitio, sustentados en reglas verificadas (ver tests/casos.test.ts). */
const casos = defineCollection({
  loader: file('src/content/casos.json'),
  schema: z.object({
    id: idEstable,
    caso: z.enum(['A', 'B', 'C', 'D', 'T']),
    situacion: z.string(),
    pregunta: z.string(),
    opciones: z.tuple([z.string(), z.string(), z.string()]),
    correcta: z.number().int().min(0).max(2),
    explicacion: z.string(),
    reglas: z.array(idEstable).min(1),
  }),
});

/** Líneas de tiempo de términos por caso; cada plazo sale de la cita de su regla (ver tests/terminos.test.ts). */
const terminos = defineCollection({
  loader: file('src/content/terminos.json'),
  schema: z.object({
    id: z.enum(['caso-a', 'caso-b', 'caso-c', 'caso-d', 'tronco']),
    caso: z.enum(['A', 'B', 'C', 'D', 'T']),
    titulo: z.string(),
    pasos: z
      .array(z.object({ acto: z.string(), plazo: z.string(), desde: z.string().optional(), regla: idEstable }))
      .min(3),
  }),
});

/**
 * Índice de artículos de las normas copiadas (scripts/indexar-normas.py): nivel 1 decide casos,
 * 2 contexto, 3 no se estudia. Un nivel 1 sin tarjeta registra su razón (tests/indice-normas.test.ts).
 */
const indiceNormas = defineCollection({
  loader: file('src/content/indice-normas.json'),
  schema: z.object({
    id: z.string(),
    norma: z.enum(NORMAS_COPIADAS),
    numero: z.string().regex(/^\d+(-\d+)?$/),
    nivel: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    tema: z.string(),
    razon: z.string().optional(),
  }),
});

export const collections = { planes, normativa, recursos, ponderacion, fuentes, paginas, esencial, tarjetas, reglas, casos, terminos, indiceNormas };
