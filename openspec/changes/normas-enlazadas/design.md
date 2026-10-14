# Design

## Context

Ver proposal.md (Why). Estado actual:

- `src/content/reglas.json`: 98 reglas tomadas de las filas "Verificado" de la investigación. Su prueba compara la cita con la fila de la investigación, no con la norma. Algunas citas son paráfrasis sin comillas (por ejemplo, la lista de excepciones del ET 831 o la inembargabilidad del ET 837-1).
- `src/content/tarjetas.json`: 59 tarjetas del dossier y 80 de reglas; la `fuente` de cada una es `{ ruta, ancla? }` o `{ regla }`. `DatosTarjetas.astro` incrusta todas las tarjetas en las páginas de Repasar.
- La lógica de repaso (`repaso.ts`, `repaso-cliente.ts`) trata como "para hoy" toda tarjeta sin historial: hoy son 139 el primer día.
- Las descargas de prueba muestran las fuentes y sus formatos:
  - Senado (Avance Jurídico): ET, CPACA, Leyes 1116, 1609, 1952 y 2220. Páginas `_prNNN`, Latin-1, notas de vigencia y jurisprudencia intercaladas.
  - Normograma DIAN: Decreto 1165, DL 920, Ley 2586, DL 2245 y Ley 2010. Una sola página por norma, UTF-8, con notas propias.
  - Función Pública: DL 927. Con `curl` simple no devolvió contenido.
- Tamaño aproximado: D. 1165 ≈ 780 artículos; ET ≈ 900, de los cuales Libro V ≈ 330; CPACA 309; Ley 2010 ≈ 290; Ley 1952 ≈ 265; DL 920 ≈ 190; Ley 2220 ≈ 147; Ley 2586 ≈ 114; Ley 1116 ≈ 126; DL 2245 ≈ 50; Ley 1609 ≈ 7.

## Goals / Non-Goals

**Goals:**
- Que ninguna cita del sitio dependa de la memoria de un modelo: toda cita se comprueba contra una copia del texto oficial guardada en el repositorio.
- Que el usuario vea qué parte de cada norma cubre el sitio y pueda ir directo al texto oficial del resto.
- Tarjetas para todo artículo de nivel 1 que se pueda volver pregunta, con un ritmo diario manejable.

**Non-Goals:**
- Tarjetas para artículos de nivel 2 o 3.
- Normas mencionadas sin enlace en Normativa (Código Penal, CGP, Ley 1755 fuera del CPACA, Ley 2277, Ley 80 y otras): quedan para un cambio posterior.
- El Decreto Ley 071 de 2020 (derogado).
- Casos de práctica o líneas de términos nuevos; este cambio solo agrega reglas y tarjetas.

## Decisions

### 1. Copias como JSON por norma
`fuentes/normas/<id>.json` con:
- `id`, `titulo`, `fuentes` (URL de cada página) y `consultado` (fecha).
- `articulos`: lista de `{ numero, texto, estado: 'vigente' | 'derogado' | 'modificado' }`.

`numero` es texto, porque el ET tiene artículos como "555-2" o "689-3"; el orden del archivo es el de la fuente. Ids: `et`, `cpaca`, `ley-1952-2019`, `ley-2220-2022`, `ley-2010-2019`, `ley-1116-2006`, `ley-1609-2013`, `decreto-1165-2019`, `dl-920-2023`, `ley-2586-2026`, `dl-2245-2011`, `dl-927-2023`.
- **Alcance del ET:** Libro V completo (arts. 555 a 869-2 y sus numerales "-n"), más los artículos de otros libros que citan los planes (365-368, 420). El resto del ET queda fuera de la copia, y la cobertura lo dice.
- *Alternativa descartada:* guardar el HTML. Pesa decenas de MB, trae las notas editoriales y complica la búsqueda de citas.

### 2. Descarga y limpieza
`scripts/descargar-normas.py` (Python estándar, sin dependencias) tiene un analizador por fuente:
- **Senado:** recorre las páginas `_prNNN` hasta que no haya más, decodifica Latin-1 y separa por `ARTÍCULO N.`.
- **Normograma:** decodifica UTF-8 y separa igual.
- **Función Pública:** el DL 927 se intenta con un agente de usuario de navegador. Si falla, se usa la copia del normograma DIAN si existe; si tampoco, la regla de cobertura del DL 927 queda marcada "texto oficial no disponible" y la tarea lo reporta en vez de inventar.

Limpieza: se cortan los bloques que empiezan con marcadores editoriales ("Jurisprudencia Vigencia", "Notas de Vigencia", "Concordancias", "Doctrina Concordante", "Legislación Anterior", "Notas del Editor", "Notas de Vigencia del Editor") hasta el siguiente artículo, y se conservan las anotaciones cortas `<Artículo modificado por …>` como `estado: 'modificado'`, o `derogado` si dicen "derogado". El script guarda las copias e informa de los cambios frente a la versión anterior (Decisión 7). Las descargas de esta sesión no se ejecutan con permisos especiales; los archivos descargados se tratan como datos.

### 3. Derechos sobre los textos
Se guarda solo el texto normativo, no las notas, porque la reproducción de leyes, decretos y actos oficiales está permitida en Colombia (Ley 23 de 1982, art. 41), mientras que las notas editoriales de las compilaciones pueden tener autor. La implementación confirma ese artículo contra su texto oficial antes de guardar las copias, y lo cita en `fuentes/normas/LEEME.md`.

### 4. Verificación de citas y revalidación de las 98 reglas
`reglas.json` gana `articulos: [{ norma: <id>, numero }]`. `tests/textos-oficiales.test.ts`:
1. Toma los fragmentos entre comillas de cada `cita`; si no hay comillas, toma la cita entera.
2. Comprueba que cada fragmento normalizado, con las elipsis (`…`) partiendo el fragmento en trozos que deben aparecer en orden, está en el texto de alguno de los artículos indicados.

Las reglas existentes que son paráfrasis (sin comillas) se reescriben con una cita literal del artículo. Sus tarjetas se ajustan para que el reverso siga siendo un fragmento de la cita, conservando su id para no perder el avance. La prueba de la investigación (`tests/reglas.test.ts`) pasa a ser informativa: una regla nueva puede venir solo de la copia.

### 5. Índice y niveles
`src/content/indice-normas.json` con `[{ norma, numero, nivel: 1|2|3, tema, razon? }]`.
- `scripts/indexar-normas.py` propone el nivel por palabras clave en el texto (términos: "días", "meses", "años", "dentro de"; competencia; "recurso", "nulidad", "caducidad", "prescripción", "sanción", "multa") y por estado (derogado da nivel 3). Cada propuesta se revisa a mano por norma, con el criterio de la proposal.
- `tests/indice-normas.test.ts` comprueba:
  - Cada artículo de cada copia está una vez en el índice.
  - Todo nivel 1 tiene una tarjeta (vía una regla cuyo `articulos` lo incluya) o una `razon`.
  - Los derogados son nivel 3.
  - Cada norma tiene al menos 3 tarjetas.

### 6. Reparto de las tarjetas nuevas
Meta: unas 250 tarjetas, con las mismas reglas de autoría de antes (reverso dentro de la cita; frente que no afirma nada fuera de ella; quiz solo si el reverso es comparable dentro del mazo). Reparto por mazo:

| Norma | Mazo |
| --- | --- |
| ET 823-849, Ley 1116 | Caso B: cobranzas |
| Resto del ET (Libro V y artículos citados por los planes) | Caso A: fiscalización |
| CPACA arts. 1-99 | Procedimiento administrativo |
| CPACA arts. 100 en adelante, Ley 2220, Ley 2010 | Caso C: jurídica |
| Ley 1609, D. 1165, DL 920, Ley 2586, DL 2245 | Caso D: aduanas y cambiario |
| Ley 1952, DL 927 | Carrera y disciplinario (mazo nuevo) |

Las tarjetas existentes no cambian de mazo, para no perder el avance.

Cifras orientativas de tarjetas nuevas: ET 60, CPACA 35, Ley 2586 30, D. 1165 25, Ley 1952 20, DL 927 15, Ley 2220 12, Ley 1116 10, DL 2245 10, DL 920 (solo donde difiere de la Ley 2586) 8, Ley 1609 4, Ley 2010 4. La cifra real la fija la cobertura de nivel 1.

### 7. Copias y cambios de texto
El script de descarga compara con la copia guardada y lista los artículos con texto distinto, sin tocar índice ni reglas. Si una cita deja de aparecer, la prueba falla y nombra la regla.

### 8. Límite diario de tarjetas nuevas
- `EstadoTarjeta` gana `inicio` (fecha de la primera respuesta). Los estados viejos sin `inicio` cuentan como iniciados antes de hoy.
- `nuevasPermitidas(estados, hoy, limite) = limite − (estados con inicio === hoy)`.
- Las tarjetas sin historial se ordenan con una mezcla determinista (semilla = fecha) e intercaladas por mazo, así que Inicio, `/repasar` y la sesión cuentan y muestran las mismas.
- Se elige en `/repasar` con chips 10/25/50 (clave `dian2676:repaso:nuevas`). Con `?mazo=` no hay límite. Las tarjetas propias no cuentan.
- Funciones puras en `repaso.ts` y `repaso-cliente.ts`, con pruebas.

### 9. Cobertura
`/normativa/cobertura` se arma en el build con las copias, el índice, las reglas y las tarjetas: un `Plegable` por norma (ancla `#<id>`), una tabla-lista de nivel 1 y 2, y una línea con el conteo de nivel 3. `/normativa` agrega en Lo esencial un enlace a la página; Lo esencial no cambia de contenido, porque el enlace va en la sección de Contexto.

### 10. Peso de las páginas de Repasar
Con unas 390 tarjetas, el JSON incrustado ronda 100-150 KB sin comprimir. Se mide; si pasa de 150 KB comprimido, `DatosTarjetas` se cambia por un archivo JSON estático en `/datos/tarjetas.json` que se pide una vez y queda en caché.

## Risks / Trade-offs

- [La limpieza deja notas editoriales o corta texto normativo] → se comparan 3 artículos por norma contra la página oficial y una prueba busca marcadores editoriales en las copias.
- [El DL 927 no se puede descargar] → se intenta el normograma; si no, se reporta y la cobertura lo muestra como "texto oficial no disponible".
- [Niveles mal asignados] → la heurística solo propone y se revisa a mano por norma; la página de cobertura los hace visibles para corregirlos.
- [Volumen de autoría (unas 250 tarjetas)] → tareas por grupo de normas, cada una con su prueba; las metas por norma son orientativas.
- [Cambio de citas existentes] → se conservan los id de reglas y tarjetas; solo cambia el texto del reverso cuando la cita era paráfrasis.
- [El repaso de los últimos días] → con 25 nuevas por día y cerca de 25 días restantes, entran hasta unas 600; alcanza para las unas 390 tarjetas.

## Migration Plan

Se agregan archivos, campos opcionales (`inicio` en el estado, `articulos` en las reglas) y una clave de almacenamiento. El avance existente se conserva. Para volver atrás, se revierte el merge.
