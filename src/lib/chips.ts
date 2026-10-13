/** Marca como activo el chip `valor` de un grupo (Chips.astro) sin emitir `cambio-chip`. */
export function marcarChip(grupo: HTMLElement, valor: string): void {
  for (const b of grupo.querySelectorAll<HTMLElement>('button[data-valor]')) {
    b.setAttribute('aria-pressed', String(b.dataset.valor === valor));
  }
}

/** Escucha los cambios de un grupo de chips. */
export function alCambiarChip(grupo: HTMLElement, fn: (valor: string) => void): void {
  grupo.addEventListener('cambio-chip', (e) => fn((e as CustomEvent<{ valor: string }>).detail.valor));
}
