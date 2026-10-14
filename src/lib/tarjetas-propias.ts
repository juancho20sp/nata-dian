/** Tarjetas que escribe el usuario. Viven solo en su navegador. */

export const MAZO_PROPIAS = 'Mis tarjetas';
export const MAX_CARACTERES = 300;

export interface TarjetaPropia {
  id: string;
  frente: string;
  reverso: string;
}

export type ErroresTarjeta = Partial<Record<'frente' | 'reverso', string>>;

/** Recorta espacios y limita el largo; devuelve los errores por campo (vacío si es válida). */
export function validar(frente: string, reverso: string): { frente: string; reverso: string; errores: ErroresTarjeta } {
  const f = frente.trim().slice(0, MAX_CARACTERES);
  const r = reverso.trim().slice(0, MAX_CARACTERES);
  const errores: ErroresTarjeta = {};
  if (!f) errores.frente = 'Escriba la pregunta del frente.';
  if (!r) errores.reverso = 'Escriba la respuesta del reverso.';
  return { frente: f, reverso: r, errores };
}

export function nuevoId(ahora: number = Date.now(), azar: () => number = Math.random): string {
  return `propia-${ahora.toString(36)}-${Math.floor(azar() * 36 ** 4).toString(36).padStart(4, '0')}`;
}

/** Crea una tarjeta válida o devuelve los errores. */
export function crear(frente: string, reverso: string, id: string = nuevoId()): TarjetaPropia | { errores: ErroresTarjeta } {
  const v = validar(frente, reverso);
  if (Object.keys(v.errores).length > 0) return { errores: v.errores };
  return { id, frente: v.frente, reverso: v.reverso };
}

/** Lee la lista guardada y descarta lo que no tenga forma de tarjeta. */
export function propiasValidas(guardadas: unknown): TarjetaPropia[] {
  if (!Array.isArray(guardadas)) return [];
  return guardadas.filter(
    (t): t is TarjetaPropia =>
      !!t && typeof t === 'object' && typeof t.id === 'string' && t.id.startsWith('propia-') && typeof t.frente === 'string' && typeof t.reverso === 'string',
  );
}
