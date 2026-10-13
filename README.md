# Estudio DIAN 2676

Sitio de estudio **no oficial** para la prueba escrita del Proceso de Selección DIAN 2676 (CNSC), el domingo 8 de noviembre de 2026. Es 100 % estático: Astro, Tailwind, Content Collections con Zod y búsqueda con Pagefind. El progreso y el plan elegido se guardan solo en el navegador (`localStorage`).

La única fuente del contenido es [`fuentes/contenido-dossier.md`](fuentes/contenido-dossier.md). Lo que publique SIMO y el Acuerdo CNSC No. 21 de 2025 prevalece sobre este sitio.

## Requisitos

- Node.js 22.12 o superior
- pnpm 12 (con `corepack enable` se usa la versión fijada en `package.json`)

## Instalar y correr en local

```bash
pnpm install
pnpm dev        # http://localhost:4321/nata-dian/
```

La búsqueda solo funciona sobre el sitio construido, porque Pagefind crea el índice al final del build:

```bash
pnpm build      # astro check + astro build + pagefind
pnpm preview    # sirve dist/ con búsqueda
```

Otros comandos:

| Comando        | Qué hace                                                                       |
| -------------- | ------------------------------------------------------------------------------ |
| `pnpm check`   | Revisión de tipos (`astro check`)                                              |
| `pnpm test`    | Pruebas con Vitest (fechas, Esta semana, progreso, navegación, filtros, origen de Lo esencial) |
| `pnpm validar` | Verifica que cada plan cubra del 12-oct al 7-nov sin huecos, que los ids de tareas sean únicos y que las advertencias estén declaradas |

## Estructura del sitio

| Destino | Ruta | Contenido |
| --- | --- | --- |
| Inicio | `/` | Cuenta regresiva, semana en curso, preguntas frecuentes y lo que falta |
| La prueba | `/prueba`, `/prueba/dia`, `/prueba/practicar` | Estructura y calificación; día de la prueba; práctica y recursos |
| Normativa | `/normativa` | Normas por área, filtrables por tipo de empleo (`?empleo=`) |
| Convocatoria | `/convocatoria` | Proceso, empleos para abogados (`#empleos`) y cargo de Gestor (`#gestor`) |
| Mi plan | `/plan`, `/plan/elegir`, `/planes/<slug>` | Lleva al plan elegido; selector; plan con Esta semana, semanas y progreso |

`/fuentes` se enlaza desde el pie. `/hoy`, `/planes` y `/recursos` redirigen a su nueva ubicación. El diseño y el comportamiento están en `_bmad-output/planning-artifacts/ux-designs/ux-nata-dian-2026-10-13/` (DESIGN.md y EXPERIENCE.md).

## Editar el contenido

Todo está en `src/content/`. Al guardar, `pnpm dev` recarga y Zod avisa si un dato no cumple el esquema (`src/content.config.ts`).

| Quiero cambiar…                         | Archivo                                                         |
| --------------------------------------- | --------------------------------------------------------------- |
| Las semanas o tareas de un plan         | `src/content/planes/<slug>.json`                                |
| El tronco común (tabla de temas, rutina) | `src/content/planes/tronco-comun.json`                          |
| Una norma de la tabla de Normativa      | `src/content/normativa.json`                                    |
| Guías, simulacros y recursos            | `src/content/recursos.json`                                     |
| Ponderación por modalidad               | `src/content/ponderacion.json` (cada fila debe sumar 100 %)     |
| Fuentes                                 | `src/content/fuentes.json`                                      |
| Textos narrativos (convocatoria, día de la prueba, cargo de Gestor, contexto normativo…) | `src/content/paginas/*.md` |
| El bloque "Lo esencial" de una página de consulta | `src/content/esencial.json` |
| La línea de resumen de una sección plegable | `resumen` en el frontmatter de `src/content/paginas/*.md` |
| La marca de advertencia de una sección | `aviso` en el frontmatter de `src/content/paginas/*.md` |
| Las preguntas de entrada y "Lo que falta" de Inicio | `src/pages/index.astro` |
| Los destinos de la navegación | `src/lib/destinos.ts` |
| Las redirecciones de rutas antiguas | `redirects` en `astro.config.mjs` |
| Fecha "Información actualizada al…"     | `ACTUALIZADO_AL` en `src/lib/fechas.ts`                         |
| Hora de inicio o fin de la prueba       | `INICIO_PRUEBA` y `FIN_PRUEBA` en `src/lib/fechas.ts`           |

Reglas para las páginas de consulta:

- Cada viñeta de `esencial.json` debe copiar una frase del dossier: `pnpm test` comprueba que su texto aparece en `fuentes/contenido-dossier.md`. Cada página lleva de 3 a 5 viñetas, y en el celular el bloque debe caber en la primera pantalla (360 × 640).
- Si un Markdown de `paginas/` tiene una advertencia (`> **Dato inferido.** …`), su rótulo debe estar en `aviso`; `pnpm validar` lo comprueba.

Reglas para los planes:

- Las fechas van en formato `AAAA-MM-DD` y las semanas deben ser contiguas; `pnpm validar` lo comprueba.
- Los `id` de semanas y tareas son estables: el progreso guardado se asocia a ellos. Si cambia un `id`, esa casilla aparece desmarcada (los ids que ya no existen se ignoran). Para corregir solo la redacción, cambie `texto` y deje el `id`.
- Lo que el dossier no trae va en `todo` del plan y se muestra en la página como "Pendiente (TODO)". No se inventan normas, fechas ni cifras.

### Cuando salga la OPEC

1. Elegir el caso (A–D) que corresponda al subproceso del empleo; si no encaja, seguir con el plan por defecto.
2. Pasar los indicadores temáticos al plan correspondiente (`temas`, `normas`, `tareas`) y quitar los `todo` resueltos.
3. Quitar lo resuelto de "Lo que falta" en `src/pages/index.astro`.
4. Actualizar `ACTUALIZADO_AL` y el dossier.

## Desplegar en GitHub Pages

El workflow `.github/workflows/deploy.yml` corre `pnpm validar`, `pnpm test` y `pnpm build`, y publica `dist/` en cada push a `main` (o a mano desde la pestaña Actions).

Una sola vez, en GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

`astro.config.mjs` calcula `site` y `base` a partir de `GITHUB_REPOSITORY`. Con este repositorio, el sitio queda en `https://juancho20sp.github.io/nata-dian/`. Si el repositorio se llama `<usuario>.github.io`, se publica en la raíz.

## Pendientes conocidos

- La OPEC, los indicadores temáticos y la citación aún no se conocen (ver "Lo que falta" en el inicio).
- Plan por defecto: el dossier no asigna normas por semana ni trae tareas; se puede marcar cada semana como completada.
- Lighthouse móvil (meta ≥ 90 en rendimiento y accesibilidad) y la ausencia de scroll horizontal a 360 px se verifican a mano: no hay prueba automática.
