# Tasks

## 1. Registro de reglas

- [ ] 1.1 Crear la colección `reglas` (`src/content.config.ts`) y `src/content/reglas.json` con todas las filas "Verificado" de `fuentes/investigacion-casos.md` (A, B, C, D y tronco común; `otraNorma` en aduanas cuando coinciden); verificar con `tests/reglas.test.ts` que cada cita está en una fila "Verificado", que las URL son de dominios oficiales y que los id son únicos
- [ ] 1.2 Volver a comprobar contra el texto oficial descargado (Senado o normograma) una muestra de al menos 2 reglas por caso que no estaban en la verificación previa, y anotar el resultado en la sección "Alertas" de la investigación; verificar que ninguna difiere, o corregir la regla y dejar constancia

## 2. Correcciones

- [ ] 2.1 Corregir la duración a cinco (5) horas en `esencial.json`, `paginas/estructura-prueba.md`, `paginas/dia-prueba.md`, la tarjeta `prueba-duracion`, el dato clave de Inicio, el comentario de `FIN_PRUEBA` y los simulacros del plan por defecto; ampliar `tests/esencial.test.ts` y `tests/tarjetas.test.ts` para aceptar las citas oficiales de las Alertas; verificar que `pnpm test` pasa y que `grep "4 horas" dist` no encuentra la duración de la prueba
- [ ] 2.2 Agregar `'Vigencia'` a `AVISOS` y citar la Ley 2586 de 2026 junto al Decreto Ley 920 de 2023, con su aviso, en `normativa.json`, `planes/caso-d-aduanas.json`, `paginas/cargo-gestor.md` y la tarjeta `ac-sanciones`; verificar con `pnpm validar` y en `/normativa` que el área Aduanero muestra ambas normas y el aviso

## 3. Tarjetas de reglas

- [ ] 3.1 Ampliar `MAZOS` con los cinco mazos de reglas y la `fuente` de tarjeta con `{ regla }`; dividir `tests/tarjetas.test.ts` (dossier o cita oficial frente a cita de la regla); verificar que un reverso que no está en la cita de su regla hace fallar la prueba
- [ ] 3.2 Escribir de 60 a 80 tarjetas de reglas (al menos 10 por mazo y al menos 3 aptas para quiz con reversos distintos), con frentes que no afirmen nada fuera de la cita; verificar con `pnpm test`
- [ ] 3.3 Mostrar en la sesión de tarjetas la norma, "Ver el texto oficial" y el aviso de vigencia aduanera para las tarjetas de reglas (`DatosTarjetas.astro` y `repasar/tarjetas.astro`); verificar en el navegador con una tarjeta del Caso A y otra del Caso D

## 4. Casos de práctica

- [ ] 4.1 Crear `src/lib/casos.ts` (`ordenarCasos`, `registrarCaso`) y la clave `casosAvance`; verificar con Vitest que los fallados van primero, que "Todos" alterna A, B, C, D y T en cada ronda y que no se repite un caso hasta mostrar todos
- [ ] 4.2 Escribir `src/content/casos.json` (al menos 4 por caso A, B, C, D y T) a partir de los patrones de la investigación, con distractores que contradicen una cita y explicación con la norma; verificar con `tests/casos.test.ts` (3 opciones distintas, correcta en rango, reglas existentes, norma en la explicación, cobertura)
- [ ] 4.3 Crear `/repasar/casos` (rótulo de caso elaborado, nota de que las preguntas reales no se publican, chips con `?caso=`, opciones con teclas, marcas "Correcta" y "Su respuesta", explicación con enlaces oficiales, avance "N de M acertados", suma a la meta); verificar en el navegador un caso fallado que vuelve primero y la alternancia de cinco seguidos

## 5. Términos y accesos

- [ ] 5.1 Crear `src/content/terminos.json` y `/repasar/terminos` (cinco plegables con `ol`, anclas `#caso-a` a `#caso-d` y `#tronco`); verificar con Vitest que cada plazo aparece en la cita de su regla y, en el navegador, el orden del Caso A
- [ ] 5.2 Agregar "Términos del caso" en los planes de caso y los accesos a Casos de práctica y Términos en `/repasar`; verificar que `/planes/caso-b-cobranzas` lleva a `/repasar/terminos#caso-b` con la sección abierta
- [ ] 5.3 Actualizar el README (reglas verificadas, regla de cita, casos de práctica, términos, la nueva clave de almacenamiento y la política de fuentes); verificar que cada archivo citado existe

## 6. Verificación integral

- [ ] 6.1 Correr `pnpm validar`, `pnpm test` y `pnpm build` sin errores ni advertencias, y comprobar que todo enlace "Ver el texto oficial" usa un dominio oficial
- [ ] 6.2 Recorrer `/repasar/casos`, `/repasar/terminos` y una sesión con tarjetas de reglas a 360 y 1280 px, en claro y oscuro, con teclado, sin scroll horizontal y con el rótulo de caso elaborado visible

## Workflow follow-up

- Archivar el cambio con `/opsx:archive` una vez revisado y publicado.
