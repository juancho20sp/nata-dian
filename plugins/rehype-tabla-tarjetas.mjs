/**
 * Plugin rehype: marca las tablas Markdown con la clase `tabla-tarjetas` y
 * copia el encabezado de cada columna en `data-label` de sus celdas, para
 * que en pantallas pequeñas se muestren como tarjetas (ver global.css).
 */
const texto = (nodo) =>
  nodo.type === 'text' ? nodo.value : (nodo.children ?? []).map(texto).join('');

const hijos = (nodo, tag) => (nodo.children ?? []).filter((n) => n.type === 'element' && n.tagName === tag);

function visitar(nodo, fn) {
  fn(nodo);
  for (const hijo of nodo.children ?? []) visitar(hijo, fn);
}

export default function rehypeTablaTarjetas() {
  return (arbol) => {
    visitar(arbol, (nodo) => {
      if (nodo.type !== 'element' || nodo.tagName !== 'table') return;
      const clases = nodo.properties.className ?? [];
      nodo.properties.className = [...clases, 'tabla-tarjetas'];
      const [thead] = hijos(nodo, 'thead');
      const [filaEncabezado] = thead ? hijos(thead, 'tr') : [];
      if (!filaEncabezado) return;
      const etiquetas = hijos(filaEncabezado, 'th').map((th) => texto(th).trim());
      for (const tbody of hijos(nodo, 'tbody')) {
        for (const tr of hijos(tbody, 'tr')) {
          hijos(tr, 'td').forEach((td, i) => {
            if (etiquetas[i]) td.properties['dataLabel'] = etiquetas[i];
          });
        }
      }
    });
  };
}
