/** Qué muestra el bloque "Esta semana" de un plan según la fecha en Colombia. */
import { FECHA_PRUEBA, diaDeLaSemana, fechaEnColombia, semanaActual, type RangoSemana } from './fechas';

export type PanelSemana =
  | { tipo: 'semana'; id: string; indice: number; domingo: boolean }
  | { tipo: 'antes' }
  | { tipo: 'hueco' }
  | { tipo: 'prueba' }
  | { tipo: 'despues' };

export function panelDeHoy(semanas: readonly RangoSemana[], instante: Date): PanelSemana {
  const hoy = fechaEnColombia(instante);
  const r = semanaActual(semanas, instante);
  switch (r.estado) {
    case 'durante':
      return { tipo: 'semana', id: r.semana.id, indice: r.indice, domingo: diaDeLaSemana(hoy) === 0 };
    case 'antes':
      return { tipo: 'antes' };
    case 'hueco':
      return { tipo: 'hueco' };
    case 'despues':
      return hoy === FECHA_PRUEBA ? { tipo: 'prueba' } : { tipo: 'despues' };
  }
}

/** Clave del panel en el HTML (data-panel). */
export function clavePanel(p: PanelSemana): string {
  return p.tipo === 'semana' ? `semana:${p.id}` : p.tipo;
}
