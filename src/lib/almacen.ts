/**
 * Acceso a localStorage tolerante a fallos: en modo privado, con datos
 * bloqueados o en vistas previas el acceso puede lanzar o volver vacío.
 */

export const CLAVES = {
  plan: 'dian2676:plan',
  tema: 'dian2676:tema',
  progreso: (slug: string) => `dian2676:progreso:${slug}`,
} as const;

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
