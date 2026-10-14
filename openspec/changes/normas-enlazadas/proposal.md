# Proposal

## Why

El sitio enlaza 13 normas oficiales, pero sus tarjetas y casos cubren solo una parte. Por ejemplo, de los cerca de 114 artículos de la Ley 2586 de 2026 cubre 14, en 11 reglas. El usuario pidió cubrir todas las normas enlazadas. Juntas suman más de 3.000 artículos: el Decreto 1165 de 2019 tiene unos 780, el Estatuto Tributario unos 900 y el CPACA 309. Una tarjeta por artículo enterraría lo útil, así que "cubrir" se define como:
1. Un índice completo de cada norma, donde se ve qué se estudia y qué no.
2. Tarjetas verificadas para los artículos que deciden un caso.
3. Un ritmo diario que permita absorberlas antes del 8 de noviembre.

## What Changes

- **Copias del texto oficial en el repositorio** (`fuentes/normas/`): solo el texto normativo de cada artículo, sin notas editoriales, con URL y fecha de consulta. Normas: Estatuto Tributario (Libro V completo y los artículos de los otros libros que citan los planes), CPACA, Ley 1952 de 2019, Ley 2220 de 2022, Ley 2010 de 2019, Ley 1116 de 2006, Ley 1609 de 2013, Decreto 1165 de 2019, Decreto Ley 920 de 2023, Ley 2586 de 2026, Decreto Ley 2245 de 2011 y Decreto Ley 927 de 2023. El Decreto Ley 071 de 2020 queda fuera porque está derogado; ya tiene su tarjeta de contexto.
- **Verificación automática contra esas copias:** toda cita de una regla debe aparecer literal en el artículo que dice citar. Esto reemplaza la dependencia de la tabla de la investigación como única prueba; las reglas existentes se revalidan contra las copias.
- **Índice de artículos por norma** con un nivel por artículo:
  - 1: decide casos (términos, competencias, recursos, nulidades, caducidad, prescripción, sanciones).
  - 2: contexto.
  - 3: no se estudia (vigencias, derogatorias, temas fuera del cargo).
- **Página de cobertura** `/normativa/cobertura`: por norma, cuántos artículos hay en cada nivel y cuántos de nivel 1 tienen tarjeta. Por artículo, su nivel, su tema, sus tarjetas y el enlace al texto oficial.
- **Tarjetas de nivel 1:** unas 250 tarjetas de reglas nuevas, repartidas en los mazos por caso existentes y en un mazo nuevo, **Carrera y disciplinario** (Decreto Ley 927 de 2023 y Ley 1952 de 2019). Las aptas entran al quiz.
- **Límite de tarjetas nuevas por día** en Repasar (por defecto 25, elegible), intercalando los mazos, para que cientos de tarjetas no lleguen el mismo día.

## Capabilities

### New Capabilities
- `textos-oficiales`: copias del texto normativo oficial en el repositorio, índice de artículos con niveles y verificación automática de citas.
- `cobertura-normativa`: página de cobertura por norma y por artículo.

### Modified Capabilities
- `tarjetas-reglas`: el registro de reglas se verifica contra las copias oficiales (además de la investigación); se agrega el mazo Carrera y disciplinario y la cobertura mínima por norma.
- `repaso-tarjetas`: límite diario de tarjetas nuevas e intercalado de mazos.

## Impact

- **Datos nuevos:**
  - `fuentes/normas/<norma>.json`: artículos con número y texto, URL y fecha.
  - `src/content/indice-normas.json`: nivel y tema por artículo.
  - Ampliación de `src/content/reglas.json` (campos `normaId` y `articulos`) y de `src/content/tarjetas.json`.
- **Scripts:**
  - `scripts/descargar-normas.py`: descarga y extrae solo el texto normativo.
  - `scripts/indexar-normas.py`: propone niveles por palabras clave, para revisión.
- **Pruebas:** `tests/textos-oficiales.test.ts` (citas literales en su artículo), `tests/indice-normas.test.ts` (todo artículo indexado; todo nivel 1 con tarjeta o con razón registrada), y ampliación de `tests/reglas.test.ts` y `tests/tarjetas.test.ts`.
- **Páginas:** `src/pages/normativa/cobertura.astro` (nueva), enlace desde `/normativa`, ajustes en `/repasar` (límite diario) y en `repaso-cliente.ts`.
- **Tamaño:** el JSON de tarjetas incrustado crece (unas 390 tarjetas); se mide su peso en la página.
