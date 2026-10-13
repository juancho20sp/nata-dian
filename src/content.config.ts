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

const paginas = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/paginas' }),
  schema: z.object({
    titulo: z.string(),
  }),
});

export const collections = { planes, normativa, recursos, ponderacion, fuentes, paginas };
