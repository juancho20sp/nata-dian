/** Destinos principales de la navegación (barra superior e inferior). */

export type Icono = 'inicio' | 'prueba' | 'normativa' | 'convocatoria' | 'plan';

export interface Destino {
  href: string;
  texto: string;
  icono: Icono;
  /** Rutas (sin base) que pertenecen a este destino, además de `href`. */
  prefijos: readonly string[];
}

export const DESTINOS: readonly Destino[] = [
  { href: '/', texto: 'Inicio', icono: 'inicio', prefijos: [] },
  { href: '/prueba', texto: 'La prueba', icono: 'prueba', prefijos: ['/prueba'] },
  { href: '/normativa', texto: 'Normativa', icono: 'normativa', prefijos: ['/normativa'] },
  { href: '/convocatoria', texto: 'Convocatoria', icono: 'convocatoria', prefijos: ['/convocatoria'] },
  { href: '/plan', texto: 'Mi plan', icono: 'plan', prefijos: ['/plan', '/planes'] },
];

function normalizar(ruta: string): string {
  const sin = ruta.replace(/\/+$/, '');
  return sin === '' ? '/' : sin;
}

/** Quita el `base` del sitio (p. ej. /nata-dian) de una ruta. */
export function quitarBase(ruta: string, base: string): string {
  const b = normalizar(base);
  if (b === '/') return normalizar(ruta);
  const r = normalizar(ruta);
  if (r === b) return '/';
  return r.startsWith(b + '/') ? r.slice(b.length) : r;
}

/** Destino al que pertenece `ruta`, o `undefined` si no pertenece a ninguno (p. ej. /fuentes). */
export function destinoActivo(ruta: string, base = '/'): Destino | undefined {
  const r = quitarBase(ruta, base);
  if (r === '/') return DESTINOS[0];
  return DESTINOS.find((d) => d.prefijos.some((p) => r === p || r.startsWith(p + '/')));
}
