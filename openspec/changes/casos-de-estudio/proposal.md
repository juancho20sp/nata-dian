# Proposal

## Why

Las tarjetas actuales enseñan datos de la prueba y qué norma regula cada tema, pero no la sustancia que deciden los ítems de juicio situacional: términos, competencias y consecuencias dentro de cada caso (fiscalización, cobranzas, jurídica, aduanas). La investigación de pruebas anteriores (`fuentes/investigacion-casos.md`, corte 13-oct-2026) muestra que los ítems oficiales presentan un caso, un enunciado y tres opciones, y que los temarios oficiales de 2020 y 2022 cubrieron cobro coactivo, fiscalización y liquidación, conciliación, derecho aduanero y régimen cambiario. La investigación verificó 98 reglas contra el texto oficial de la norma.

También encontró dos errores en el sitio:
- La Guía de Orientación oficial de la prueba 2676 dice **cinco (5) horas** (el sitio dice 4).
- El **Decreto Ley 920 de 2023**, citado para aduanas, fue derogado por la Ley 2586 de 2026.

## What Changes

- **Nueva fuente admitida:** `fuentes/investigacion-casos.md`, solo para reglas marcadas "Verificado" contra el texto oficial. Cada contenido nuevo cita norma, artículo y URL oficial. El dossier sigue siendo la fuente del resto.
- **Tarjetas de reglas por caso:** mazos nuevos Caso A (fiscalización), Caso B (cobranzas), Caso C (jurídica), Caso D (aduanas y cambiario) y Procedimiento administrativo. El reverso sale de la cita verificada y muestra la norma con enlace a su texto oficial. Entran a la repetición espaciada y al quiz.
- **Casos de práctica** (`/repasar/casos`): situación, pregunta y tres opciones (A, B, C) con el formato de la guía oficial, escritos para el sitio. Cada uno lleva el rótulo "Caso de práctica elaborado para este sitio; no es una pregunta de la prueba", y tras responder muestra la explicación con el artículo. Se pueden filtrar por caso; los cuatro casos pesan igual.
- **Términos por caso** (`/repasar/terminos`): línea de tiempo de los actos de cada caso con su plazo y artículo. Se enlaza desde el plan de cada caso.
- **Corrección de la duración:** 5 horas en Inicio, La prueba, Día de la prueba, las tarjetas y las fechas (`FIN_PRUEBA` ya es la 1:00 p. m.). La fuente es la guía oficial, p. 23.
- **Corrección de aduanas:** donde el sitio cita el Decreto Ley 920 de 2023, se agrega la Ley 2586 de 2026 con un aviso de vigencia. Como la prueba solo incluye normas "expedidas antes del 19 de junio de 2026" y la Ley 2586 es de ese mismo día, las tarjetas citan ambas normas cuando el texto coincide.
- **Verificación automática:** cada tarjeta de regla y cada caso de práctica remite a una regla "Verificado" de la investigación; una prueba comprueba que el dato del reverso aparece en su cita. Se publica sin revisión humana, a pedido del usuario.

## Capabilities

### New Capabilities
- `tarjetas-reglas`: mazos de reglas por caso salidos de la investigación verificada, con norma y enlace oficial, dentro de la repetición espaciada y el quiz.
- `casos-practica`: casos de práctica de tres opciones por caso, con rótulo, explicación, filtro y efecto en la meta diaria.
- `terminos-caso`: líneas de tiempo de términos por caso.

### Modified Capabilities
- `repaso-tarjetas`: el reverso de las tarjetas del dossier puede venir también de una fuente oficial registrada en la investigación cuando corrige al dossier (5 horas); la lista de mazos crece con los mazos de reglas.
- `paginas-consulta`: Lo esencial admite cifras de una fuente oficial que corrige al dossier, citada; el Día de la prueba y La prueba muestran 5 horas.

## Impact

- **Datos:**
  - `src/content/reglas.json` (nuevo): reglas verificadas con id, caso, regla, cita, norma, url y vigencia.
  - `src/content/tarjetas.json`: más tarjetas de reglas y la corrección de "4 horas".
  - `src/content/casos.json` (nuevo).
  - `src/content/terminos.json` (nuevo).
  - `src/content/esencial.json`, `paginas/*.md`, `normativa.json`, `planes/caso-d-aduanas.json` y `planes/por-defecto.json`: correcciones.
- **Esquemas:** `src/content.config.ts` (colecciones nuevas, `MAZOS` ampliado, `fuente` de tarjeta con regla).
- **Páginas:** `src/pages/repasar/casos.astro`, `src/pages/repasar/terminos.astro` (nuevas); cambios en `src/pages/repasar/index.astro`, `src/pages/index.astro` y los planes de caso.
- **Pruebas:** `tests/tarjetas.test.ts` y `tests/esencial.test.ts` (aceptan citas oficiales registradas), y `tests/reglas.test.ts`, `tests/casos.test.ts` (nuevos).
- **Lógica:** sin cambios en `repaso.ts`, `quiz.ts` ni `racha.ts`; los mazos nuevos usan la lógica existente.
- `fuentes/contenido-dossier.md` no se modifica: las correcciones quedan registradas en `fuentes/investigacion-casos.md`.
