# Design

## Context

Ver proposal.md (Why). El sitio es estático (Astro + Tailwind, sin framework de UI). Lo que se reutiliza:

- `src/lib/fechas.ts`: `fechaEnColombia`, `sumarDias`, `diaDeLaSemana`, `FECHA_PRUEBA`.
- `src/lib/almacen.ts`: `leer`, `escribir` y `borrar` con try/catch, y el prefijo de claves `dian2676:`.
- `src/lib/destinos.ts` y `BarraInferior.astro`: la lista única de destinos.
- El patrón de `esencial.json` y su prueba `tests/esencial.test.ts`, que verifica fragmentos literales del dossier.

Restricción: el dossier es la única fuente. Las tarjetas del dossier no agregan datos; el frente es una pregunta y el reverso un fragmento literal.

## Goals / Non-Goals

**Goals:**
- Lógica de repaso (cajas, quiz, meta, racha) en funciones puras con pruebas, y páginas delgadas que solo la conectan al DOM.
- Funcionar sin conexión una vez cargada la página y sin cuenta: todo el estado vive en `localStorage`.

**Non-Goals:**
- Sincronizar entre dispositivos, exportar o importar el avance.
- Preguntas de juicio situacional: el dossier no trae casos, así que el quiz es solo de normas y datos.
- Insignias, puntos, sonidos o animaciones de celebración.

## Decisions

### 1. Tarjetas del dossier como colección de datos
`src/content/tarjetas.json` (cargador `file`) con el esquema: `id` estable, `mazo` (enum de 6 mazos), `frente`, `reverso`, `quiz` (booleano: apta para quiz) y `fuente` (`ruta` interna y `ancla` opcional). Se curan a mano, unas 40 a 60, a partir de: la tabla del tronco común (tema → norma), Normativa (área o concepto → artículos), los datos de la prueba y del día (cifras y horarios), y el contexto normativo.
- `tests/tarjetas.test.ts` extiende el método de `esencial.test.ts`: cada `reverso` debe aparecer en el dossier normalizado; los `id` son únicos; cada mazo tiene al menos 3 tarjetas aptas para quiz; y ningún mazo repite el mismo reverso entre tarjetas aptas, para que el quiz nunca muestre dos opciones iguales.
- *Por qué:* mismo patrón que Lo esencial, con verificación automática del origen.
- *Alternativa descartada:* generar tarjetas automáticamente desde `normativa.json` y los planes. Produce frentes torpes y reversos demasiado largos para una tarjeta.

### 2. Repetición espaciada en `src/lib/repaso.ts`
Estado por tarjeta: `{ caja: 1..5, proxima: 'AAAA-MM-DD' }`. Funciones puras:
- `responder(estado | undefined, sabia, hoy)` devuelve el nuevo estado. Los intervalos son `[1, 2, 4, 7, 14]` por caja de llegada, y el resultado se recorta con `limitarAntesDeLaPrueba(fecha, hoy)`: si pasa del 7 de noviembre, devuelve el 5 de noviembre, o `hoy` si `hoy` es posterior al 5.
- `tocaHoy(estado | undefined, hoy)`: sin estado, toca hoy.
- `resumenMazo(tarjetas, estados, hoy)` devuelve el total, las que tocan hoy y las dominadas.
`hoy` siempre llega como fecha ISO de Colombia (`fechaEnColombia`). Así las funciones son deterministas y probables.

### 3. Quiz en `src/lib/quiz.ts`
`armarQuiz(tarjetas, estados, hoy, azar)` recibe `azar: () => number` inyectable, para que las pruebas usen una semilla fija.
- Candidatas: las tarjetas con `quiz: true` de los mazos que tienen 3 o más aptas.
- Orden: primero las que tocan hoy, luego las de caja baja, y el resto se completa al azar. Se toman 10 sin repetir.
- Opciones: el reverso propio más 2 reversos distintos de otras tarjetas aptas del mismo mazo, mezclados.
- `corregir` se resuelve en la página: si falla, se aplica `responder(estado, false, hoy)`, que devuelve la tarjeta a la caja 1. Si acierta, el estado no cambia (spec `repaso-quiz`).

### 4. Meta y racha en `src/lib/racha.ts`
`registro`: `Record<fechaISO, número de respuestas>`. Funciones:
- `sumar(registro, hoy)`, que también descarta días con más de 60 días de antigüedad.
- `avanceDeHoy`.
- `racha(registro, meta, hoy)` devuelve `{ dias, graciaUsada }`.

Algoritmo de `racha`: el inicio es hoy si se cumplió y, si no, ayer. Se recorre hacia atrás:
- Un día cumplido suma 1.
- Un día no cumplido se perdona si el día anterior se cumplió y su semana (lunes a domingo, `diaDeLaSemana`) aún no usó su hueco. Se marca `graciaUsada`.
- Cualquier otro día no cumplido corta.

Los escenarios de la spec se copian tal cual como pruebas.

Una meta "se cumple" con el valor de meta vigente al consultar. Cambiar la meta puede alterar la racha pasada; se acepta por simplicidad.

### 5. Claves de almacenamiento
`CLAVES` en `almacen.ts` gana `tarjetasEstado` (`dian2676:tarjetas:estado`), `tarjetasPropias` (`dian2676:tarjetas:propias`), `repasoMeta` (`dian2676:repaso:meta`) y `repasoDias` (`dian2676:repaso:dias`). Las claves existentes no cambian. Se agrega `almacenDisponible()`, que prueba escribir y borrar una clave temporal, para el aviso "Este navegador no guarda el avance."

### 6. Tarjetas propias
`src/lib/tarjetas-propias.ts`: `crear(frente, reverso)` y `validar`, que exige frente y reverso no vacíos, recorta espacios y limita a 300 caracteres. El `id` es `propia-<base36 de Date.now()>-<aleatorio>`. Las propias tienen mazo "Mis tarjetas", `quiz: false` y sin `fuente`. Al borrar se elimina también su estado.

### 7. Páginas como esqueletos y un script por página
- `/repasar`: meta (selector 10, 20 o 30), racha, mazos con contadores, botones "Repasar tarjetas" y "Hacer un quiz". Los mazos del dossier se generan en el servidor; los contadores y Mis tarjetas, en el cliente.
- `/repasar/tarjetas`: lee `?mazo=` opcional. Usa un `<template>` para la tarjeta, que es un `button` con `aria-pressed` para el volteo, y una región `aria-live` que anuncia el reverso. Atajos: Espacio y Enter voltean; 1 y 2 responden.
- `/repasar/quiz`: 10 preguntas con botones A, B y C, y atajos 1/2/3 o A/B/C.
- `/repasar/mis-tarjetas`: formulario, lista con editar y borrar (`confirm`).
- Los datos del dossier se incrustan como JSON en un `data-` del contenedor, como en `/hoy` antes. Todo con `sinIndice`, salvo `/repasar`, que se indexa para que la búsqueda lo encuentre.
- Volteo: transición de opacidad de 150 ms; sin giro 3D, y sin transición con `prefers-reduced-motion`.

### 8. Navegación de seis destinos
`Destino` gana `corto` (Inicio, Prueba, Normas, Concurso, Repasar, Mi plan). `BarraInferior` usa `corto` y `grid-cols-6`; la barra superior usa `texto`. Icono nuevo para Repasar (dos tarjetas superpuestas). `tests/destinos.test.ts` se actualiza: 6 destinos, y `/repasar/quiz` activa Repasar.

### 9. Inicio
Una línea `hidden` que el script llena con `resumen` de tarjetas para hoy (del dossier más las propias) y `racha`. Se oculta cuando `fechaEnColombia(hoy) > FECHA_PRUEBA`; Repasar oculta la meta y la racha con la misma regla.

## Risks / Trade-offs

- [Seis etiquetas no caben a 360 px] → etiquetas cortas y la medición de desborde por etiqueta (como en el rediseño) a 320 y 360 px.
- [Tarjetas curadas a mano con errores] → la prueba de fragmento literal y la revisión de que cada `fuente` lleve a una sección existente (ruta conocida y ancla presente en el HTML construido, comprobado en la verificación).
- [Cambiar la meta altera la racha histórica] → aceptado; se documenta en el selector ("La racha se calcula con la meta actual.").
- [Muchas tarjetas el primer día] → todas empiezan en la caja 1 y tocan hoy; la sesión muestra "N de M" y se puede parar en cualquier momento. La meta (20) marca un tope razonable.
- [localStorage borrado] → se pierde el avance; mismo comportamiento que el progreso del plan, ya documentado en el sitio.

## Migration Plan

Solo se agregan claves y rutas. Los enlaces existentes no cambian. Para volver atrás, se revierte el merge del cambio y las claves nuevas quedan huérfanas sin efecto.
