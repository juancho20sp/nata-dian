# Tasks

## 1. Navegación de cinco destinos

- [x] 1.1 Crear `src/lib/destinos.ts` con la lista `DESTINOS` (Inicio, La prueba, Normativa, Convocatoria, Mi plan) y una función de destino activo por prefijo de ruta; verificar con pruebas Vitest en `tests/destinos.test.ts` que `/prueba/dia` activa La prueba, que `/planes/caso-b-cobranzas` y `/plan/elegir` activan Mi plan, que `/` solo activa Inicio, y que todo funciona con y sin `base`
- [x] 1.2 Crear `BarraInferior.astro` (5 destinos con icono y etiqueta, `aria-current`, objetivos de 44 px o más, visible por debajo de `lg`) y añadir al `body` el `padding-bottom` con `safe-area-inset-bottom`; verificar en `pnpm preview` a 360 px que no hay scroll horizontal y que el pie queda visible por encima de la barra
- [x] 1.3 Simplificar `Navegacion.astro`: quitar el menú hamburguesa, mostrar los 5 destinos solo en `lg` y dejar nombre, búsqueda y tema en todos los anchos; verificar que el diálogo de búsqueda abre a 360 px y a 1280 px
- [x] 1.4 Mover el enlace a Fuentes y la nota de SIMO y Acuerdo 21 al pie (`Pie.astro`) si falta alguno; verificar en `dist/` que todas las páginas los contienen

## 2. Componentes de consulta

- [x] 2.1 Ampliar el esquema de `paginas` en `src/content.config.ts` con `resumen` (obligatorio) y `aviso` (enum opcional), y completar el frontmatter de los 9 Markdown de `src/content/paginas/`, declarando `aviso` donde haya un blockquote de advertencia; verificar que `pnpm check` pasa y que el build falla si se borra un `resumen`
- [x] 2.2 Crear la colección `esencial` (`src/content/esencial.json`, Zod con 3 a 5 viñetas, `ancla` opcional) con las entradas de `prueba`, `prueba-dia`, `prueba-practicar`, `normativa` y `convocatoria`, copiadas de frases del dossier; verificar cada viñeta contra `fuentes/contenido-dossier.md` y que el build falla con 2 o con 6 viñetas
- [x] 2.3 Crear `LoEsencial.astro` y `Plegable.astro` (`details` y `summary`, título, resumen, marca de aviso) según DESIGN.md, y hacer que `Prosa.astro` renderice dentro de un `Plegable` por defecto; verificar con teclado que Enter abre y cierra, y que abrir una sección no cierra otra
- [x] 2.4 Agregar en `Base.astro` el script de apertura por ancla (al cargar y en `hashchange`, con desplazamiento y foco en el `summary`) y el despliegue en `beforeprint` y `afterprint`; verificar que `/prueba#calificacion` abre la sección y que la vista previa de impresión muestra todo desplegado
- [x] 2.5 Crear `Chips.astro` (botones con `aria-pressed`, uno activo, conteo con `aria-live`) y la función pura de filtrado de normativa en `src/lib/filtros.ts`; verificar con pruebas Vitest que un área de "Todos" aparece con cualquier empleo y que un empleo desconocido muestra solo esas áreas

## 3. Páginas de consulta

- [x] 3.1 Reescribir `/prueba` como `src/pages/prueba/index.astro`: Lo esencial, sección de estructura y sección `#calificacion` con la tabla de ponderación y su nota, y enlaces a Día de la prueba y Practicar; verificar a 360 × 640 que no hay ninguna tabla visible sin abrir una sección
- [x] 3.2 Crear `/prueba/dia` con Lo esencial (horarios, documento, qué llevar) y el detalle de `dia-prueba.md` plegado con su marca "Fecha no oficial"; verificar que las horas 7:15, 8:00 y 8:30 aparecen en Lo esencial
- [x] 3.3 Crear `/prueba/practicar` con el método de juicio situacional, comportamentales e integridad, y los recursos con chips "Solo oficiales" (activo al cargar) y "Todos", más la precaución de `recursos-intro.md` visible; verificar que el conteo cambia al tocar "Todos" y que sin JavaScript se ven todos los recursos
- [x] 3.4 Reescribir `/normativa`: Lo esencial con el contexto normativo, chips por empleo sincronizados con `?empleo=`, cada área como `Plegable` con normas y enlace, y el mensaje "Ninguna norma para este empleo." con "Ver todas"; verificar que abrir `/normativa?empleo=<tipo>` aplica el filtro y que sin JavaScript se ven todas las áreas
- [x] 3.5 Reescribir `/convocatoria`: Lo esencial y tres secciones plegables (cronograma, `#empleos`, `#gestor`); verificar que `/convocatoria#empleos` y `/convocatoria#gestor` abren su sección

## 4. Mi plan

- [x] 4.1 Crear `EstaSemana.astro` a partir de los paneles de `hoy.astro` (semana en curso, antes, día de la prueba, después, hueco, aviso de domingo y rutina plegada) y ponerlo primero en `planes/[slug].astro` para planes de tipo `plan`, con `no-imprimir`; verificar cambiando la fecha del sistema o con una prueba Vitest de la función que elige el panel (12-oct, 21-oct, domingo 25-oct, 8-nov, 9-nov)
- [x] 4.2 Añadir el encabezado del plan ("Plan elegido" o "Plan por defecto" y "Cambiar" a `/plan/elegir`); verificar que el texto cambia tras elegir otro plan
- [x] 4.3 Cambiar `LineaTiempo.astro` para que cada semana sea un `Plegable` (`id="semana-<id>"`), con la casilla "Semana completada" dentro y la semana en curso marcada en el `summary`; verificar que el progreso guardado antes del cambio sigue marcado (mismas claves `data-item`)
- [x] 4.4 Crear `/plan` (redirección en el cliente al plan guardado y validado, `noscript` con enlaces) y mover el selector a `/plan/elegir`; extraer la validación del slug a una función pura y verificar con Vitest que un slug inexistente o `tronco-comun` cae en `por-defecto`
- [x] 4.5 Verificar la impresión de `/planes/caso-a-fiscalizacion`: cuatro semanas desplegadas, tareas visibles, sin barras ni Esta semana

## 5. Inicio y redirecciones

- [x] 5.1 Reescribir Inicio: cuenta regresiva, Lo que falta, 5 tarjetas-pregunta (enlace en toda la tarjeta), línea de semana en curso del plan elegido con enlace a `/plan`, y bloque del día de la prueba primero, visible solo el 8 de noviembre en hora de Colombia; verificar que la tarjeta de calificación abre `/prueba#calificacion`
- [x] 5.2 Declarar en `astro.config.mjs` las redirecciones `/hoy`, `/planes` y `/recursos`, y borrar `hoy.astro`, `recursos.astro` y `planes/index.astro`; verificar en `dist/hoy/index.html` que el destino incluye `/nata-dian` y que Pagefind no indexa esas páginas
- [x] 5.3 Actualizar el README (tabla "Quiero cambiar…" con `esencial.json`, `resumen` y `aviso`, y las nuevas rutas); verificar que cada archivo citado existe

## 6. Verificación integral

- [ ] 6.1 Correr `pnpm validar`, `pnpm test` y `pnpm build` sin errores ni advertencias; verificar que Pagefind encuentra "Likert" en `/prueba`
- [ ] 6.2 Recorrer en `pnpm preview` a 360 px y a 1280 px, en modo claro y oscuro, los cuatro flujos de EXPERIENCE.md (consulta rápida, qué norma estudio, sesión del sábado, la víspera), y comprobar que no hay scroll horizontal
- [ ] 6.3 Comprobar que no se agregó contenido fuera del dossier: revisar el diff de `src/content/` y de los textos de las páginas

## Workflow follow-up

- Archivar el cambio con `/opsx:archive` una vez revisado y publicado.
