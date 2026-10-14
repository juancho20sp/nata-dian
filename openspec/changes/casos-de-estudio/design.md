# Design

## Context

Ver proposal.md (Why). Estado actual que se reutiliza:

- `src/content/tarjetas.json` y su colección (58 tarjetas del dossier, 6 mazos en `MAZOS`), `tests/tarjetas.test.ts`, que compara reversos con el dossier normalizado, y `DatosTarjetas.astro`, que incrusta las tarjetas para los scripts.
- La lógica de repaso (`repaso.ts`, `quiz.ts`, `racha.ts`, `repaso-cliente.ts`): cajas, quiz por mazo, meta y racha. No conoce el origen de una tarjeta; trabaja con id, mazo, frente, reverso y quiz.
- `Plegable`, `Chips` y el script de anclas de `Base.astro`.
- `fuentes/investigacion-casos.md`: 98 filas "Verificado", agrupadas por caso en tablas con las columnas Regla | Texto operativo citado | Norma y artículo | Fuente URL | Confianza. Los encabezados de sección dicen menos reglas que las filas reales; se cuentan las filas.

La verificación propia, antes de esta propuesta, confirmó la guía oficial 2676 (p. 11 y p. 23), el normograma del Decreto Ley 920 y 6 reglas del Estatuto Tributario (705, 707, 720, 732, 734) contra el texto del Senado.

## Goals / Non-Goals

**Goals:**
- Contenido de casos trazable de punta a punta: cada tarjeta, caso de práctica y paso remite a una regla con cita literal, norma y URL oficial; las pruebas lo comprueban.
- Corregir la duración y la vigencia aduanera en todo el sitio, sin editar el dossier.

**Non-Goals:**
- Volver a investigar la web durante la implementación. Si una regla no está "Verificado", no se usa.
- Revisión humana previa (decisión del usuario). Se mitiga con las comprobaciones automáticas.
- Reproducir preguntas reales de la CNSC, que no son públicas.

## Decisions

### 1. Registro de reglas como colección
`src/content/reglas.json` con `{ id, caso: 'A'|'B'|'C'|'D'|'T', regla, cita, norma, url, otraNorma? }`. Se arma a mano desde las filas "Verificado" de la investigación. `cita` es el texto operativo citado, sin las comillas de apertura y cierre; `otraNorma` se usa en aduanas cuando coinciden el Decreto Ley 920 y la Ley 2586.
- `tests/reglas.test.ts` lee la investigación, extrae las filas con `Verificado`, y comprueba:
  - Cada `cita` normalizada aparece en alguna de esas filas.
  - Las `url` usan dominios oficiales: `secretariasenado.gov.co`, `normograma.dian.gov.co`, `funcionpublica.gov.co`, `suin-juriscol.gov.co` y `cnsc.gov.co`.
  - Los `id` son únicos.
- *Por qué:* separa la evidencia (reglas) de la pedagogía (tarjetas, casos, términos), y las tres apuntan al mismo registro.

### 2. Tarjetas de reglas en la misma colección de tarjetas
`MAZOS` gana `Caso A: fiscalización`, `Caso B: cobranzas`, `Caso C: jurídica`, `Caso D: aduanas y cambiario` y `Procedimiento administrativo`. La `fuente` de una tarjeta pasa a ser una unión:
- `{ ruta, ancla? }` para las del dossier.
- `{ regla: <id> }` para las de reglas.

La prueba de tarjetas se divide: las del dossier se comparan con el dossier o con las citas oficiales registradas (corrección de 5 horas); las de reglas, con la `cita` de su regla.
- `DatosTarjetas` agrega, para las de reglas, `norma`, `url` y `aviso` (vigencia aduanera si `otraNorma`). La sesión de tarjetas muestra la norma y "Ver el texto oficial" en vez de "Ver en el sitio".
- *Alternativa descartada:* una colección aparte de tarjetas de reglas. Duplica la integración con la repetición espaciada, el quiz y los contadores.
- Meta: unas 60 a 80 tarjetas de reglas, al menos 10 por mazo y al menos 3 aptas para quiz, con reversos distintos.

### 3. Casos de práctica
`src/content/casos.json` con `{ id, caso, situacion, pregunta, opciones: [3], correcta: 0..2, explicacion, reglas: [ids] }`. Al menos 4 por caso (A, B, C, D, T), basados en los 24 patrones de la sección 4 de la investigación y en las reglas.
- `tests/casos.test.ts` comprueba: 3 opciones distintas; `correcta` en rango; al menos 1 regla existente; que la explicación mencione la norma de alguna de sus reglas; y la cobertura por caso.
- La redacción es propia del sitio, pero cada hecho jurídico de la opción correcta y de la explicación sale de una cita. La tarea de autoría incluye esa comprobación.
- Lógica pura nueva en `src/lib/casos.ts`:
  - `ordenarCasos(casos, avance, filtro, azar)`: primero los fallados, luego los no respondidos, luego los acertados; con "Todos", rondas que alternan A, B, C, D y T.
  - `registrarCaso(avance, id, acierto)`.
  Avance en `CLAVES.casosAvance` (`dian2676:casos:avance`). Cada respuesta usa `sumar` de la meta.

### 4. Términos
`src/content/terminos.json` con `{ caso, pasos: [{ acto, plazo, desde, regla }] }`. La norma y la URL salen de la regla. La prueba comprueba que el `plazo` normalizado aparece en la cita de su regla. `/repasar/terminos` muestra cinco `Plegable` con `ol` de pasos; los planes de caso (`planes/[slug].astro`, tipo plan, slug `caso-*`) agregan "Términos del caso" con un enlace al ancla. El plan por defecto enlaza la página sin ancla.

### 5. Correcciones
- **Duración:** `esencial.json` (viñetas de `/prueba` y `/prueba/dia`), `paginas/estructura-prueba.md`, `paginas/dia-prueba.md` (con la cita y la fuente), la tarjeta `prueba-duracion`, el dato clave de Inicio y el comentario de `FIN_PRUEBA`. La viñeta usa la cita literal de la guía: "El aspirante dispondrá de cinco (5) horas para responder las pruebas escritas, es decir, la sesión terminará a la 1:00 p.m."
- `tests/esencial.test.ts` y `tests/tarjetas.test.ts` aceptan como fuente, además del dossier, las citas entre comillas de la sección "Alertas" de la investigación.
- **Simulacros:** "dos simulacros de 4 horas" del plan por defecto pasa a 5 horas, para igualar la duración oficial, con una nota en el plan.
- **Aduanas:** se agrega `'Vigencia'` a `AVISOS`. En `normativa.json` (área Aduanero), `planes/caso-d-aduanas.json` y `paginas/cargo-gestor.md`, se cita la Ley 2586 de 2026 junto al Decreto Ley 920 con la marca de vigencia. La tarjeta `ac-sanciones` conserva su reverso del dossier y su frente pasa a "regulaba… hasta junio de 2026"; una tarjeta nueva del mazo Contexto (`ctx-2586`) pregunta qué norma lo derogó, con reverso tomado de la cita oficial de las Alertas. Las tarjetas de reglas del Caso D citan ambas normas.

### 6. Repasar
`/repasar` agrega accesos a "Casos de práctica" y "Términos por caso". Los mazos de reglas aparecen en la lista con sus contadores; no hace falta cambiar código, porque la lista sale de `MAZOS`.

## Risks / Trade-offs

- [Una cita mal transcrita por el agente de investigación] → la verificación propia tomó 6 de 6 sin errores; la tarea 1.2 vuelve a comprobar, con el texto oficial descargado, una muestra de al menos 2 reglas por caso, y documenta en la investigación cualquier diferencia.
- [Un caso de práctica con una opción "incorrecta" que también es defendible] → cada distractor debe contradecir una cita (plazo distinto, acto distinto o competencia excedida), y la explicación dice por qué no aplica; lo revisa la tarea de autoría.
- [La prueba usa el Decreto Ley 920 y no la Ley 2586] → se citan ambos cuando coinciden; donde difieren (reducciones por allanamiento), no se hacen tarjetas.
- [Muchas tarjetas nuevas el primer día] → todas empiezan en la caja 1; la meta diaria sigue marcando el ritmo. Se acepta.
- [Publicar sin revisión humana] → decisión del usuario; el rótulo de los casos de práctica y el enlace al texto oficial de cada tarjeta permiten contrastar.

## Migration Plan

Solo se agregan datos, colecciones, rutas y una clave de almacenamiento. Los ids de tarjetas existentes no cambian, salvo el reverso de `prueba-duracion` y `ac-sanciones`, que conservan su id y su avance. Para volver atrás, se revierte el merge.
