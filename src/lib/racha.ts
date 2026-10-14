/**
 * Meta diaria y racha indulgente. `registro` guarda cuántas respuestas hubo
 * cada día (fecha ISO de Colombia).
 */
import { diaDeLaSemana, sumarDias } from './fechas';

export type Registro = Record<string, number>;

export const METAS = [10, 20, 30] as const;
export type Meta = (typeof METAS)[number];
export const META_POR_DEFECTO: Meta = 20;
/** Días que se conservan en el registro. */
export const DIAS_GUARDADOS = 60;

export function metaValida(valor: unknown): Meta {
  return (METAS as readonly unknown[]).includes(valor) ? (valor as Meta) : META_POR_DEFECTO;
}

/** Suma `n` respuestas a hoy y descarta días de hace más de 60 días. */
export function sumar(registro: Registro, hoy: string, n = 1): Registro {
  const limite = sumarDias(hoy, -DIAS_GUARDADOS);
  const salida: Registro = {};
  for (const [dia, cuenta] of Object.entries(registro)) if (dia > limite && Number.isFinite(cuenta)) salida[dia] = cuenta;
  salida[hoy] = (salida[hoy] ?? 0) + n;
  return salida;
}

export function avanceDeHoy(registro: Registro, hoy: string): number {
  return registro[hoy] ?? 0;
}

/** Lunes (ISO) de la semana de `fecha`; la semana va de lunes a domingo. */
function lunesDe(fecha: string): string {
  return sumarDias(fecha, -((diaDeLaSemana(fecha) + 6) % 7));
}

export interface Racha {
  dias: number;
  /** Algún hueco perdonado dentro de la racha cayó en la semana actual. */
  graciaUsada: boolean;
}

/**
 * Cuenta días cumplidos hacia atrás desde hoy (o desde ayer si hoy aún no se cumple).
 * Un día sin cumplir no corta si es un hueco de un solo día entre dos días cumplidos
 * y es el único hueco de su semana; cualquier otro día sin cumplir corta.
 */
export function racha(registro: Registro, meta: number, hoy: string): Racha {
  const cumplido = (d: string) => (registro[d] ?? 0) >= meta;
  let dia = cumplido(hoy) ? hoy : sumarDias(hoy, -1);
  const semanasConHueco = new Set<string>();
  let dias = 0;
  let graciaUsada = false;
  // Tope de seguridad: el registro solo guarda 60 días.
  for (let i = 0; i <= DIAS_GUARDADOS + 1; i++) {
    if (cumplido(dia)) {
      dias++;
    } else {
      const anterior = sumarDias(dia, -1);
      const semana = lunesDe(dia);
      if (dias > 0 && cumplido(anterior) && !semanasConHueco.has(semana)) {
        semanasConHueco.add(semana);
        if (semana === lunesDe(hoy)) graciaUsada = true;
      } else {
        break;
      }
    }
    dia = sumarDias(dia, -1);
  }
  return { dias, graciaUsada };
}
