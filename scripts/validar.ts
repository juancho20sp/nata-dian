/**
 * Valida los planes de estudio:
 * - cada plan de tipo "plan" tiene semanas contiguas del 2026-10-12 al 2026-11-07;
 * - los ids de semanas son únicos dentro de cada plan;
 * - los ids de tareas son únicos en todo el sitio.
 *
 * Uso: pnpm validar
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { sumarDias } from '../src/lib/fechas.ts';

const INICIO = '2026-10-12';
const FIN = '2026-11-07';
const DIRECTORIO = join(import.meta.dirname, '..', 'src', 'content', 'planes');

interface Semana {
  id: string;
  inicio: string;
  fin: string;
}
interface Plan {
  slug: string;
  tipo: 'plan' | 'tronco';
  semanas: Semana[];
  tareas: { id: string }[];
}

const errores: string[] = [];
const tareasVistas = new Map<string, string>();

const archivos = readdirSync(DIRECTORIO).filter((f) => f.endsWith('.json')).sort();

for (const archivo of archivos) {
  const plan = JSON.parse(readFileSync(join(DIRECTORIO, archivo), 'utf8')) as Plan;
  const donde = `${archivo}`;

  if (`${plan.slug}.json` !== archivo) {
    errores.push(`${donde}: el slug "${plan.slug}" no coincide con el nombre del archivo`);
  }

  for (const tarea of plan.tareas) {
    const previo = tareasVistas.get(tarea.id);
    if (previo) errores.push(`${donde}: la tarea "${tarea.id}" ya existe en ${previo}`);
    else tareasVistas.set(tarea.id, donde);
  }

  if (plan.tipo !== 'plan') continue;

  const idsSemana = new Set<string>();
  for (const s of plan.semanas) {
    if (idsSemana.has(s.id)) errores.push(`${donde}: la semana "${s.id}" está repetida`);
    idsSemana.add(s.id);
    if (s.inicio > s.fin) errores.push(`${donde}: la semana "${s.id}" empieza después de terminar`);
  }

  const semanas = [...plan.semanas];
  if (semanas.length === 0) {
    errores.push(`${donde}: no tiene semanas`);
    continue;
  }
  if (semanas[0]!.inicio !== INICIO) {
    errores.push(`${donde}: la primera semana empieza el ${semanas[0]!.inicio}, se esperaba ${INICIO}`);
  }
  if (semanas.at(-1)!.fin !== FIN) {
    errores.push(`${donde}: la última semana termina el ${semanas.at(-1)!.fin}, se esperaba ${FIN}`);
  }
  for (let i = 1; i < semanas.length; i++) {
    const esperado = sumarDias(semanas[i - 1]!.fin, 1);
    if (semanas[i]!.inicio !== esperado) {
      errores.push(
        `${donde}: la semana "${semanas[i]!.id}" empieza el ${semanas[i]!.inicio}; se esperaba ${esperado} (hueco o solapamiento)`,
      );
    }
  }
}

if (errores.length > 0) {
  console.error(`✗ ${errores.length} problema(s) en los planes:\n` + errores.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✓ ${archivos.length} planes válidos; ${tareasVistas.size} tareas con id único.`);
