/**
 * Acceso a localStorage tolerante a fallos: en modo privado, con datos
 * bloqueados o en vistas previas el acceso puede lanzar o volver vacío.
 */

export const CLAVES = {
  plan: 'dian2676:plan',
  tema: 'dian2676:tema',
  progreso: (slug: string) => `dian2676:progreso:${slug}`,
  tarjetasEstado: 'dian2676:tarjetas:estado',
  tarjetasPropias: 'dian2676:tarjetas:propias',
  repasoMeta: 'dian2676:repaso:meta',
  repasoDias: 'dian2676:repaso:dias',
  casosAvance: 'dian2676:casos:avance',
} as const;

/** true si el navegador deja escribir en localStorage (falla en modo privado o con datos bloqueados). */
export function almacenDisponible(): boolean {
  try {
    const prueba = 'dian2676:prueba';
    window.localStorage.setItem(prueba, '1');
    window.localStorage.removeItem(prueba);
    return true;
  } catch {
    return false;
  }
}

export function leer<T>(clave: string, porDefecto: T): T {
  try {
    const crudo = window.localStorage.getItem(clave);
    if (crudo === null) return porDefecto;
    return JSON.parse(crudo) as T;
  } catch {
    return porDefecto;
  }
}

export function escribir(clave: string, valor: unknown): boolean {
  try {
    window.localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

export function borrar(clave: string): void {
  try {
    window.localStorage.removeItem(clave);
  } catch {
    /* sin almacenamiento disponible */
  }
}
