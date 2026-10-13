import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Plan = CollectionEntry<'planes'>['data'];

/** Plan que se usa cuando el usuario aún no ha elegido uno. */
export { PLAN_POR_DEFECTO } from './plan-elegido';
export const TRONCO_COMUN = 'tronco-comun';

export async function todosLosPlanes(): Promise<Plan[]> {
  const entradas = await getCollection('planes');
  return entradas.map((e) => e.data).sort((a, b) => a.orden - b.orden);
}

/** Solo los planes seleccionables (excluye el tronco común). */
export async function planesSeleccionables(): Promise<Plan[]> {
  return (await todosLosPlanes()).filter((p) => p.tipo === 'plan');
}

export async function troncoComun(): Promise<Plan> {
  const entrada = await getEntry('planes', TRONCO_COMUN);
  if (!entrada) throw new Error('Falta src/content/planes/tronco-comun.json');
  return entrada.data;
}

/** Identificadores de los elementos que se pueden marcar en un plan. */
export const idItemSemana = (id: string) => `semana:${id}`;
export const idItemTarea = (id: string) => `tarea:${id}`;
