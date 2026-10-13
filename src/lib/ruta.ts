/** Antepone el `base` del sitio (p. ej. /nata-dian) a una ruta interna. */
export function ruta(camino: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${camino.replace(/^\//, '')}`;
}
