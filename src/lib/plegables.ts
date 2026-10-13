/**
 * Comportamiento global de las secciones plegables (details[data-plegable]):
 * - abre la sección que contiene el destino del ancla (#id), la desplaza a la vista y enfoca su summary;
 * - al imprimir, despliega todas y luego restaura las que estaban cerradas.
 */

function abrirPorAncla(): void {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const destino = document.getElementById(id);
  if (!destino) return;
  let abrio = false;
  for (let d = destino.closest('details'); d; d = d.parentElement?.closest('details') ?? null) {
    if (!d.open) {
      d.open = true;
      abrio = true;
    }
  }
  const resumen = destino.closest('summary') ?? destino.closest('details')?.querySelector(':scope > summary');
  if (abrio || resumen) {
    destino.scrollIntoView({ block: 'start' });
    // Al cargar, el navegador procesa el fragmento después de los scripts y puede
    // devolver el foco al documento; se enfoca en el siguiente cuadro.
    requestAnimationFrame(() => (resumen as HTMLElement | null)?.focus({ preventScroll: true }));
  }
}

export function iniciarPlegables(): void {
  abrirPorAncla();
  window.addEventListener('hashchange', abrirPorAncla);

  let cerradas: HTMLDetailsElement[] = [];
  window.addEventListener('beforeprint', () => {
    cerradas = [...document.querySelectorAll<HTMLDetailsElement>('details:not([open])')];
    for (const d of cerradas) d.open = true;
  });
  window.addEventListener('afterprint', () => {
    for (const d of cerradas) d.open = false;
    cerradas = [];
  });
}
