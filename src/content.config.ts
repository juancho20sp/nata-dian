import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const fechaISO = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use el formato AAAA-MM-DD');
const idEstable = z.string().regex(/^[a-z0-9-]+$/, 'Solo minúsculas, números y guiones');

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

/** Rótulos de las advertencias del dossier (el texto en negrita que abre cada blockquote). */
export const AVISOS = [
  'Datos de terceros',
  'Dato inferido',
  'Dato aproximado',
  'Fecha no oficial',
  'Lista construida',
  'Precaución',
  'Verifique el enlace',
] as const;

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

/**
 * Reglas verificadas contra el texto oficial de la norma, copiadas de las filas
 * "Verificado" de fuentes/investigacion-casos.md (ver tests/reglas.test.ts).
 */
const reglas = defineCollection({
  loader: file('src/content/reglas.json'),
  schema: z.object({
    id: idEstable,
    /** A fiscalización, B cobranzas, C jurídica, D aduanas y cambiario, T tronco común. */
    caso: z.enum(['A', 'B', 'C', 'D', 'T']),
    regla: z.string(),
    cita: z.string().min(5),
    norma: z.string(),
    url: urlOficial,
    url2: urlOficial.optional(),
    /** Texto igual en la Ley 2586 de 2026 y en el Decreto Ley 920 de 2023. */
    ambasNormasAduaneras: z.boolean().optional(),
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
    /** Página y sección del sitio de donde sale el dato. */
    fuente: z.object({ ruta: z.string().regex(/^\/[a-z0-9/-]*$/), ancla: idEstable.optional() }),
  }),
});

export const collections = { planes, normativa, recursos, ponderacion, fuentes, paginas, esencial, tarjetas, reglas };
