# Estudio DIAN 2676

Sitio de estudio **no oficial** para la prueba escrita del Proceso de Selección DIAN 2676 (CNSC), el domingo 8 de noviembre de 2026. Es 100 % estático: Astro, Tailwind, Content Collections con Zod y búsqueda con Pagefind. El progreso y el plan elegido se guardan solo en el navegador (`localStorage`).

Hay tres fuentes de contenido:

- [`fuentes/contenido-dossier.md`](fuentes/contenido-dossier.md): el dossier original (convocatoria, planes, normativa, recursos).
- [`fuentes/investigacion-casos.md`](fuentes/investigacion-casos.md): investigación del 13 de octubre de 2026 sobre las pruebas anteriores y la sustancia de los cuatro casos. Solo se usan sus reglas marcadas **Verificado** contra el texto oficial de la norma (Senado, normograma DIAN), y las citas oficiales de su sección "Alertas" que corrigen al dossier (por ejemplo, la duración de cinco horas según la guía oficial de la prueba 2676).
- [`fuentes/normas/`](fuentes/normas/): copias del texto oficial de las 12 normas enlazadas (Senado, normograma DIAN), una por archivo JSON con sus artículos, su estado (`vigente`, `modificado`, `derogado`) y la fecha de consulta. Las citas de las reglas se verifican contra ellas. Ver [`fuentes/normas/LEEME.md`](fuentes/normas/LEEME.md) para el fundamento de la reproducción (Ley 23 de 1982, art. 41).

Lo que publique SIMO y el Acuerdo CNSC No. 21 de 2025 prevalece sobre este sitio.

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
| `pnpm test`    | Pruebas con Vitest (fechas, Esta semana, progreso, navegación, filtros, origen de Lo esencial y de las tarjetas, repaso, quiz, racha) |
| `pnpm validar` | Verifica que cada plan cubra del 12-oct al 7-nov sin huecos, que los ids de tareas sean únicos y que las advertencias estén declaradas |

## Estructura del sitio

| Destino | Ruta | Contenido |
| --- | --- | --- |
| Inicio | `/` | Cuenta regresiva, semana en curso, preguntas frecuentes y lo que falta |
| La prueba | `/prueba`, `/prueba/dia`, `/prueba/practicar` | Estructura y calificación; día de la prueba; práctica y recursos |
| Normativa | `/normativa` | Normas por área, filtrables por tipo de empleo (`?empleo=`) |
| Convocatoria | `/convocatoria` | Proceso, empleos para abogados (`#empleos`) y cargo de Gestor (`#gestor`) |
| Repasar | `/repasar`, `/repasar/tarjetas`, `/repasar/quiz`, `/repasar/casos`, `/repasar/terminos`, `/repasar/mis-tarjetas` | Tarjetas con repetición espaciada (del dossier y de reglas por caso), quiz de normas A/B/C, casos de práctica, términos por caso, meta diaria, racha y tarjetas propias |
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
| Los destinos de la navegación (y sus etiquetas cortas) | `src/lib/destinos.ts` |
| Las tarjetas de repaso y sus mazos | `src/content/tarjetas.json` (mazos en `MAZOS`, `src/content.config.ts`) |
| Las reglas verificadas de los cuatro casos | `src/content/reglas.json` (las de `origen: investigacion` se extraen con `python3 scripts/extraer-reglas.py`; las de `origen: copia` se escriben citando la copia oficial) |
| El índice de artículos por niveles | `src/content/indice-normas.json` (se genera con `python3 scripts/indexar-normas.py`; el nivel 1 se elige en `scripts/seleccion-nivel1.json`) |
| Las copias del texto oficial | `fuentes/normas/*.json` (se descargan con `python3 scripts/descargar-normas.py`) |
| Tarjetas nuevas por día (10, 25 o 50) | `LIMITES_NUEVAS` en `src/lib/repaso.ts` |
| Los casos de práctica | `src/content/casos.json` |
| Las líneas de tiempo de términos | `src/content/terminos.json` |
| Intervalos de repaso y fechas del repaso final | `INTERVALOS`, `ULTIMO_DIA` y `REPASO_FINAL` en `src/lib/repaso.ts` |
| Metas diarias disponibles | `METAS` en `src/lib/racha.ts` |
| Las redirecciones de rutas antiguas | `redirects` en `astro.config.mjs` |
| Fecha "Información actualizada al…"     | `ACTUALIZADO_AL` en `src/lib/fechas.ts`                         |
| Hora de inicio o fin de la prueba       | `INICIO_PRUEBA` y `FIN_PRUEBA` en `src/lib/fechas.ts`           |

Reglas para las páginas de consulta:

- Cada viñeta de `esencial.json` debe copiar una frase del dossier: `pnpm test` comprueba que su texto aparece en `fuentes/contenido-dossier.md`. Cada página lleva de 3 a 5 viñetas, y en el celular el bloque debe caber en la primera pantalla (360 × 640).
- Si un Markdown de `paginas/` tiene una advertencia (`> **Dato inferido.** …`), su rótulo debe estar en `aviso`; `pnpm validar` lo comprueba.

Reglas para las tarjetas de repaso:

- El `reverso` de cada tarjeta debe ser un fragmento literal del dossier o, en las tarjetas de regla, de la cita de su regla: `pnpm test` lo comprueba (`tests/tarjetas.test.ts`). El `frente` es una pregunta que no debe afirmar nada que el dossier no diga.
- `quiz: true` la hace apta para el quiz. Cada mazo necesita al menos 3 tarjetas aptas, sin reversos repetidos, porque las opciones incorrectas salen del mismo mazo.
- `fuente` es la página (y sección) de donde sale el dato; se usa para el enlace "Ver en el sitio".
- Los `id` son estables: el avance de cada tarjeta se guarda por `id`.

Reglas para el contenido de casos:

- Una regla entra a `reglas.json` solo si su fila de la investigación dice **Verificado** y su URL es de un dominio oficial; `tests/reglas.test.ts` lo comprueba.
- Una tarjeta de regla tiene `fuente: { "regla": "<id>" }`, y su reverso debe estar en la cita de esa regla (`tests/tarjetas.test.ts`).
- Cada regla lista en `articulos` los artículos que cita (`{ "norma": "<id de la copia>", "numero": "<n>" }`). Los fragmentos entre comillas de su `cita` deben aparecer en el texto de esos artículos en `fuentes/normas/`; "…" separa trozos que van en orden (`tests/textos-oficiales.test.ts`).
- Las reglas con `origen: copia` no necesitan fila en la investigación; las de `origen: investigacion` sí, y no pueden ser más que las filas **Verificado** (`tests/reglas.test.ts`).
- Cada paso de `terminos.json` debe tener su plazo en la cita de su regla (`tests/terminos.test.ts`).
- Cada caso de práctica tiene tres opciones distintas, una correcta, al menos una regla y una explicación que nombra su artículo (`tests/casos.test.ts`). Los distractores deben contradecir una cita, no ser opiniones discutibles. Se publican con el rótulo "Caso de práctica elaborado para este sitio; no es una pregunta de la prueba".
- Las reglas de aduanas que coinciden en la Ley 2586 de 2026 y el Decreto Ley 920 de 2023 llevan `ambasNormasAduaneras` y muestran el aviso de vigencia.

Reglas para el índice de normas (página `/normativa/cobertura`):

- Cada artículo de cada copia está una sola vez en `indice-normas.json`, con `nivel` 1 (decide casos), 2 (contexto) o 3 (no se estudia). Los derogados y las cláusulas de vigencia son nivel 3.
- Un artículo de nivel 1 tiene al menos una tarjeta (por medio de una regla que lo cita) o una `razon` escrita a mano. Cada norma tiene al menos 3 tarjetas (`tests/indice-normas.test.ts`).
- `indexar-normas.py` conserva el `tema` y la `razon` editados a mano; solo recalcula el `nivel`. Para cambiar el nivel 1, edite `scripts/seleccion-nivel1.json` y vuelva a correr el script.
- Para actualizar las copias, corra `python3 scripts/descargar-normas.py` (guarda las páginas en `.cache/normas/`; borre esa carpeta para volver a descargarlas). El script informa qué artículos cambiaron; después corra `pnpm test` para ver qué citas ya no coinciden.

Reglas para los planes:

- Las fechas van en formato `AAAA-MM-DD` y las semanas deben ser contiguas; `pnpm validar` lo comprueba.
- Los `id` de semanas y tareas son estables: el progreso guardado se asocia a ellos. Si cambia un `id`, esa casilla aparece desmarcada (los ids que ya no existen se ignoran). Para corregir solo la redacción, cambie `texto` y deje el `id`.
- Lo que el dossier no trae va en `todo` del plan y se muestra en la página como "Pendiente (TODO)". No se inventan normas, fechas ni cifras.

### Cuando salga la OPEC

1. Elegir el caso (A–D) que corresponda al subproceso del empleo; si no encaja, seguir con el plan por defecto.
2. Pasar los indicadores temáticos al plan correspondiente (`temas`, `normas`, `tareas`) y quitar los `todo` resueltos.
3. Quitar lo resuelto de "Lo que falta" en `src/pages/index.astro`.
4. Actualizar `ACTUALIZADO_AL` y el dossier.

## Datos guardados en el navegador

Todo se guarda en `localStorage` con el prefijo `dian2676:` (ver `CLAVES` en `src/lib/almacen.ts`):

| Clave | Contenido |
| --- | --- |
| `dian2676:plan` | Plan elegido |
| `dian2676:tema` | Tema claro u oscuro elegido a mano |
| `dian2676:progreso:<slug>` | Semanas y tareas marcadas de cada plan |
| `dian2676:tarjetas:estado` | Caja y próxima fecha de cada tarjeta |
| `dian2676:tarjetas:propias` | Tarjetas escritas por el usuario |
| `dian2676:repaso:meta` | Meta diaria (10, 20 o 30) |
| `dian2676:repaso:dias` | Respuestas por día de los últimos 60 días (para la meta y la racha) |
| `dian2676:casos:avance` | Último resultado de cada caso de práctica |
| `dian2676:repaso:nuevas` | Tarjetas nuevas por día (10, 25 o 50; por defecto 25) |

Si el navegador bloquea el almacenamiento, el sitio funciona igual pero no recuerda nada entre visitas.

## Desplegar en GitHub Pages

El workflow `.github/workflows/deploy.yml` corre `pnpm validar`, `pnpm test` y `pnpm build`, y publica `dist/` en cada push a `main` (o a mano desde la pestaña Actions).

Una sola vez, en GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

`astro.config.mjs` calcula `site` y `base` a partir de `GITHUB_REPOSITORY`. Con este repositorio, el sitio queda en `https://juancho20sp.github.io/nata-dian/`. Si el repositorio se llama `<usuario>.github.io`, se publica en la raíz.

## Pendientes conocidos

- La OPEC, los indicadores temáticos y la citación aún no se conocen (ver "Lo que falta" en el inicio).
- Plan por defecto: el dossier no asigna normas por semana ni trae tareas; se puede marcar cada semana como completada.
- Lighthouse móvil (meta ≥ 90 en rendimiento y accesibilidad) y la ausencia de scroll horizontal a 360 px se verifican a mano: no hay prueba automática.
