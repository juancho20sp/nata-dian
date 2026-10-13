# Proposal

## Why

El sitio muestra demasiada información por pantalla y reparte el contenido en 9 secciones con nombres administrativos. Quien estudia (un abogado de propiedad intelectual que llega nuevo al procedimiento tributario y aduanero) usa el sitio sobre todo para **consultar** algo puntual entre clases, en el celular, y hoy tiene que desplazarse por tablas y textos largos para encontrarlo. Faltan menos de cuatro semanas para la prueba (8 de noviembre de 2026). La especificación de UX ya está cerrada en `_bmad-output/planning-artifacts/ux-designs/ux-nata-dian-2026-10-13/` (DESIGN.md y EXPERIENCE.md).

## What Changes

- Navegación de **5 destinos** (Inicio, La prueba, Normativa, Convocatoria, Mi plan) más búsqueda. En móvil van en una barra inferior fija; en escritorio, en la barra superior. Fuentes pasa al pie. **BREAKING** para enlaces guardados: cambian rutas (ver redirecciones).
- Cada página de consulta abre con un bloque **Lo esencial** (3 a 5 viñetas armadas con frases del dossier) y deja el resto en **secciones plegables** cerradas, con una línea de resumen visible y una marca cuando contienen una advertencia del dossier.
- **La prueba** se divide en `/prueba` (estructura y calificación), `/prueba/dia` (logística del día) y `/prueba/practicar` (juicio situacional y recursos; absorbe la página Recursos, con "Solo oficiales" activo por defecto).
- **Normativa** cambia los `select` por chips de tipo de empleo, con el filtro en la URL (`?empleo=`), y muestra cada área como sección plegable. El contexto normativo pasa a Lo esencial.
- **Convocatoria** queda como Lo esencial más secciones plegables (cronograma, empleos para abogados, cargo de Gestor).
- **Mi plan** reúne Hoy, Elige tu plan y el plan detallado: `/plan` lleva al plan elegido, `/plan/elegir` es el selector, y la página del plan muestra primero "Esta semana" (temas, normas, rutina) y luego las demás semanas plegadas. `/planes/[slug]` sigue existiendo para imprimir y compartir.
- **Inicio** cambia los accesos por sección por 5 tarjetas-pregunta, agrega una línea con la semana en curso del plan elegido y, el día de la prueba, pone primero la logística.
- Las rutas `/hoy`, `/planes` y `/recursos` redirigen a su nueva ubicación.
- No se agrega contenido: todo texto nuevo es una frase o cifra que ya está en el dossier.

## Capabilities

### New Capabilities
- `navegacion-sitio`: destinos principales, barra inferior y superior, pie con Fuentes, y redirecciones de rutas anteriores.
- `paginas-consulta`: estructura de las páginas de consulta (Lo esencial, secciones plegables, avisos, apertura por ancla, filtros con chips) y su aplicación en La prueba, Normativa, Convocatoria e Inicio.
- `mi-plan`: sección del plan de estudio (plan elegido, selector, semana en curso, semanas plegadas, progreso e impresión).

### Modified Capabilities
<!-- No hay specs previas en openspec/specs/. -->

## Impact

- **Páginas:** `src/pages/index.astro`, `prueba.astro` (se divide en `prueba/index.astro`, `prueba/dia.astro`, `prueba/practicar.astro`), `normativa.astro`, `convocatoria.astro`, `planes/index.astro`, `planes/[slug].astro`, `hoy.astro` y `recursos.astro` (pasan a redirecciones), nuevas `plan/index.astro` y `plan/elegir.astro`.
- **Componentes:** `Navegacion.astro`, `Pie.astro`, `Prosa.astro`, `LineaTiempo.astro`; nuevos `LoEsencial`, `Plegable`, `BarraInferior`, `Chips`, `Redireccion`.
- **Contenido:** `src/content/paginas/*.md` gana `resumen`, `esencial` y `aviso` en el frontmatter; `src/content.config.ts` amplía el esquema de `paginas`.
- **Estilos:** `src/styles/global.css` (plegables, barra inferior, chips, impresión de plegables).
- Sin dependencias nuevas. Pagefind sigue indexando el contenido plegado porque está en el HTML.
