# Design

## Context

Sitio Astro estático con Tailwind, Content Collections y Pagefind (ver proposal.md, Why). Hoy:

- `Navegacion.astro` muestra 8 enlaces en la barra superior (menú hamburguesa en móvil).
- Las páginas de consulta encadenan componentes `Prosa` (un Markdown de `src/content/paginas/` cada uno) y tablas, todo abierto.
- `/hoy` genera en el servidor un panel por semana y por plan, y el cliente muestra el que corresponde. `/planes/[slug]` tiene la línea de tiempo, las casillas y la barra de progreso.
- `localStorage` usa las claves `dian2676:plan` y `dian2676:progreso:<slug>` (`src/lib/almacen.ts`); las fechas se calculan en hora de Colombia en `src/lib/fechas.ts`.

Restricción: el dossier es la única fuente; no se agregan datos.

## Goals / Non-Goals

**Goals:**
- Implementar las specs `navegacion-sitio`, `paginas-consulta` y `mi-plan` reutilizando la lógica existente (fechas, almacenamiento, progreso, búsqueda).
- Conservar el progreso y el plan elegido que ya están guardados en el navegador.

**Non-Goals:**
- Cambiar la identidad visual (colores, tipografía), salvo los componentes nuevos de DESIGN.md.
- Cambiar el contenido del dossier o los datos de los planes.
- Agregar pruebas de navegador (Playwright); la verificación visual sigue siendo manual.

## Decisions

### 1. Lo esencial en un archivo de datos, no en los Markdown
Nueva colección `esencial` (`src/content/esencial.json`, cargador `file`): una entrada por página (`prueba`, `prueba-dia`, `prueba-practicar`, `normativa`, `convocatoria`) con `vinetas` (Zod: mínimo 3, máximo 5), y cada viñeta con `texto` y `ancla` opcional.
- *Por qué:* Lo esencial resume una página entera, que reúne varios Markdown; ponerlo en uno de ellos lo ataría a una sección. El esquema hace cumplir el rango 3–5 en el build.
- *Alternativa descartada:* frontmatter de cada Markdown. Obliga a elegir un Markdown "dueño" por página.

### 2. Metadatos de sección en el frontmatter de `paginas`
El esquema de `paginas` gana `resumen` (una línea, obligatoria) y `aviso` (lista, por defecto vacía, de rótulos `AVISOS`: "Datos de terceros", "Dato inferido", "Dato aproximado", "Fecha no oficial", "Lista construida", "Precaución", "Verifique el enlace"). Es una lista porque una misma sección puede traer dos advertencias (empleos para abogados, cargo de Gestor). `pnpm validar` comprueba que los rótulos de los blockquotes y los declarados coinciden.
- *Por qué:* la marca de advertencia debe verse con la sección cerrada (spec `paginas-consulta`), y detectarla leyendo el HTML del blockquote sería frágil.

### 3. Secciones plegables con `details` y `summary` nativos
Nuevo componente `Plegable.astro` (props: `id`, `titulo`, `resumen`, `aviso?`, slot). `Prosa.astro` pasa a renderizar su Markdown dentro de un `Plegable` (prop `plegable`, por defecto `true`).
- Un script global en `Base.astro` abre el `details` cuyo `id` coincide con el hash (al cargar y en `hashchange`), lo desplaza a la vista y enfoca su `summary`. En `beforeprint` abre todos y en `afterprint` restaura los que estaban cerrados.
- *Por qué:* teclado, lector de pantalla y búsqueda en la página funcionan sin código; el contenido sigue en el HTML para Pagefind.
- *Alternativa descartada:* acordeón propio con botones y `hidden`. Más código y peor accesibilidad por defecto.

### 4. Redirecciones con `redirects` de Astro
`astro.config.mjs` declara `'/hoy': '/plan'`, `'/planes': '/plan/elegir'` y `'/recursos': '/prueba/practicar'`. En build estático Astro genera HTML con `meta refresh` y enlace. Se borran `hoy.astro`, `recursos.astro` y `planes/index.astro`.
- *Por qué:* funciona sin JavaScript y queda fuera del índice, porque esas páginas no tienen `data-pagefind-body`.
- *Riesgo:* hay que confirmar que Astro antepone `base` (`/nata-dian`) al destino; si no, se declaran con el `base` incluido.

### 5. `/plan` redirige en el cliente al plan elegido
`plan/index.astro` lleva un script en línea en el `head` que lee `dian2676:plan`, lo valida contra la lista de planes seleccionables (incrustada en el build) y hace `location.replace` a `/planes/<slug>/`. Un `noscript` ofrece los enlaces al plan por defecto y al selector. `plan/elegir.astro` es el selector actual movido (`planes/index.astro`).
- *Por qué:* evita duplicar la página del plan para cada plan dentro de `/plan`; las URLs `/planes/<slug>` siguen sirviendo para imprimir y compartir.
- *Alternativa descartada:* renderizar los cinco planes ocultos en `/plan`. Pesa más y duplica contenido para Pagefind.

### 6. Bloque Esta semana extraído de `/hoy`
Nuevo componente `EstaSemana.astro` (prop `plan`) con los paneles por semana y por estado que hoy genera `hoy.astro` (antes, prueba, después, hueco) y la rutina dentro de un `Plegable`. Su script usa `semanaActual` y `fechaEnColombia`. Va primero en `planes/[slug].astro` para planes de tipo `plan`, con la clase `no-imprimir`.
- `LineaTiempo.astro` cambia cada tarjeta de semana por un `Plegable` (`id="semana-<id>"`), con la casilla "Semana completada" dentro. La semana en curso se marca en el `summary`.

### 7. Barra inferior y barra superior
Nuevo `BarraInferior.astro` (`nav aria-label="Secciones"`, 5 destinos con SVG en línea, visible `< lg`). `Navegacion.astro` pierde el menú hamburguesa; en `lg` muestra los 5 destinos. Una única lista `DESTINOS` en `src/lib/destinos.ts` alimenta ambas barras y la regla de destino activo (prefijos: `/prueba` → La prueba; `/plan` y `/planes` → Mi plan). `body` lleva `padding-bottom` igual a la altura de la barra más `env(safe-area-inset-bottom)` por debajo de `lg`.

### 8. Chips de filtro
Nuevo `Chips.astro` (grupo de botones con `aria-pressed`, un activo). Normativa: chips por empleo (los valores salen de `normativa.json`, sin "Todos" de los datos), filtro que oculta las secciones de área y sincroniza `?empleo=` con `history.replaceState`. Practicar: "Solo oficiales" y "Todos". Los conteos se anuncian con `aria-live`. Sin JavaScript todo queda visible, porque el filtrado solo lo aplica el script.

### 9. Inicio
Las tarjetas-pregunta salen de una lista en `index.astro`. La línea de semana en curso y el bloque del día de la prueba son marcado del servidor con `hidden`, y un script los muestra según `fechaEnColombia` y el plan guardado (los rangos de semanas se incrustan como JSON, como en `/hoy`). El bloque del día se coloca antes de la cuenta regresiva en el HTML y solo se muestra el 8 de noviembre.

### 10. Origen de las viñetas
Cada viñeta de `esencial.json` se copia o se recorta de una frase del dossier. Una tarea de verificación compara cada viñeta con `fuentes/contenido-dossier.md` antes del commit.

## Risks / Trade-offs

- [El contenido plegado se descubre menos] → resumen de una línea visible en cada sección, Lo esencial arriba y apertura por ancla desde Inicio.
- [Una advertencia queda dentro de una sección cerrada] → marca de aviso en el `summary` (Decisión 2) y la nota de SIMO y el Acuerdo 21 sigue en el pie.
- [`/plan` parpadea al redirigir] → el script va en línea en el `head`, antes de pintar.
- [Esta semana depende de JavaScript] → sin JavaScript la página del plan sigue mostrando todas las semanas en la línea de tiempo.
- [La barra inferior tapa contenido o choca con el gesto de inicio en iOS] → `padding-bottom` del `body` y `safe-area-inset-bottom`.
- [Redirecciones sin `base`] → verificar en `dist/hoy/index.html` tras el build (Decisión 4).

## Migration Plan

- Las claves de `localStorage` no cambian; el plan elegido y el progreso se conservan.
- Las rutas antiguas redirigen (Decisión 4); `/planes/<slug>` y `/fuentes` no cambian.
- Despliegue normal por push a `main`. Para volver atrás, se revierte el merge del cambio.
