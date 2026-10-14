# Tasks

## 1. Datos de tarjetas

- [x] 1.1 Agregar la colección `tarjetas` en `src/content.config.ts` (id, mazo con enum de 6 mazos, frente, reverso, quiz, fuente con ruta y ancla opcional); verificar que `pnpm check` pasa y que un mazo inexistente hace fallar el build
- [x] 1.2 Curar `src/content/tarjetas.json` con 40 a 60 tarjetas de los 6 mazos, con reversos copiados del dossier y `fuente` apuntando a la sección del sitio; verificar con `tests/tarjetas.test.ts` que cada reverso está en el dossier, que los id son únicos, que cada mazo tiene al menos 3 aptas para quiz y que no se repiten reversos aptos dentro de un mazo

## 2. Lógica de repaso

- [x] 2.1 Crear `src/lib/repaso.ts` (`responder`, `limitarAntesDeLaPrueba`, `tocaHoy`, `resumenMazo`); verificar con Vitest los escenarios de la spec: caja 2 a 3 el 20-oct vuelve el 24-oct, fallo a caja 1 al día siguiente, 30-oct caja 4 a 5 vuelve el 5-nov, después del 5-nov vuelve hoy, y tarjeta sin estado toca hoy
- [x] 2.2 Crear `src/lib/quiz.ts` (`armarQuiz` con `azar` inyectable); verificar con Vitest y semilla fija: 10 preguntas sin repetir, 3 opciones distintas del mismo mazo con exactamente una correcta, mazos con menos de 3 aptas excluidos, y prioridad para las que tocan hoy
- [x] 2.3 Crear `src/lib/racha.ts` (`sumar` con poda a 60 días, `avanceDeHoy`, `racha`); verificar con Vitest los cinco escenarios de racha de la spec (días seguidos, un hueco, dos huecos seguidos, dos huecos sueltos, hoy sin cumplir) y el cambio de día en hora de Colombia
- [x] 2.4 Crear `src/lib/tarjetas-propias.ts` (`crear`, `validar`) y las claves nuevas y `almacenDisponible()` en `src/lib/almacen.ts`; verificar con Vitest el rechazo de campos vacíos, el recorte de espacios, el límite de 300 caracteres y que las claves existentes no cambian

## 3. Navegación de seis destinos

- [x] 3.1 Agregar Repasar y las etiquetas cortas en `src/lib/destinos.ts`, usar `corto` y 6 columnas en `BarraInferior.astro` con un icono nuevo, y actualizar `tests/destinos.test.ts`; verificar con Vitest que `/repasar/quiz` activa Repasar y, en el navegador a 320 y 360 px, que ninguna etiqueta se desborda ni se corta y no hay scroll horizontal

## 4. Páginas de Repasar

- [x] 4.1 Crear `/repasar` (meta 10/20/30 con 20 por defecto, avance de hoy, racha con el texto del día de gracia, mazos con total, para hoy y dominadas, accesos a Tarjetas y Quiz, aviso sin almacenamiento, mensaje sin JavaScript); verificar en el navegador la primera visita (0 de 20) y el cambio de meta
- [x] 4.2 Crear `/repasar/tarjetas` (filtro `?mazo=`, volteo con toque, Espacio o Enter, respuesta con botones o teclas 1 y 2, contador "N de M", "Meta de hoy cumplida.", "No hay tarjetas para hoy.", enlace "Ver en el sitio", anuncio `aria-live`, sin animación con reduced motion); verificar en el navegador con el reloj fijo que acertar y fallar mueven la tarjeta de caja y que el avance se conserva al recargar
- [x] 4.3 Crear `/repasar/quiz` (10 preguntas, opciones A/B/C con teclas, marcas "Correcta" y "Su respuesta", resultado con falladas, "Otro quiz", falladas a la caja 1, cada respuesta suma a la meta); verificar en el navegador un quiz completo con una respuesta incorrecta
- [x] 4.4 Crear `/repasar/mis-tarjetas` (crear, editar, borrar con confirmación, validación con mensaje por campo) e incluir las propias en la sesión de tarjetas y en el resumen; verificar en el navegador crear, recargar, repasar y borrar una tarjeta propia
- [x] 4.5 Verificar el tono: ningún texto de Repasar tiene signos de exclamación, emojis ni reproches (búsqueda en `src/pages/repasar/` y en los textos de los scripts)

## 5. Inicio y documentación

- [x] 5.1 Agregar en Inicio la línea "Hoy: N tarjetas para repasar · racha de D días" con enlace a `/repasar`, oculta después del 8 de noviembre; verificar en el navegador con el reloj el 22-oct y el 9-nov
- [x] 5.2 Actualizar el README (tabla "Quiero cambiar…" con `tarjetas.json`, regla de reverso literal, claves nuevas de localStorage y la ruta `/repasar`); verificar que cada archivo citado existe

## 6. Verificación integral

- [x] 6.1 Correr `pnpm validar`, `pnpm test` y `pnpm build` sin errores ni advertencias, y comprobar que la `fuente` de cada tarjeta lleva a una página existente con su ancla presente en el HTML construido
- [x] 6.2 Recorrer en `pnpm preview` los flujos 5 y 6 de EXPERIENCE.md a 360 y 1280 px, en claro y oscuro, con teclado, y sin scroll horizontal en ninguna página de Repasar

## Workflow follow-up

- Archivar el cambio con `/opsx:archive` una vez revisado y publicado.
