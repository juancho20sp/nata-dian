# Tasks

## 1. Copias del texto oficial

- [x] 1.1 Confirmar contra su texto oficial la Ley 23 de 1982, art. 41 (reproducción de normas oficiales) y escribir `fuentes/normas/LEEME.md` con la fuente, el alcance de las copias y la exclusión de notas editoriales; verificar que la cita aparece en la página oficial descargada
- [x] 1.2 Escribir `scripts/descargar-normas.py` (analizadores Senado y normograma, intento de Función Pública con alternativa, limpieza de notas, estados vigente/derogado/modificado, aviso de cambios) y generar `fuentes/normas/<id>.json` para las 12 normas; verificar los conteos de artículos frente a la estructura de cada norma y comparar a mano 3 artículos por norma con la página oficial
- [x] 1.3 Agregar `tests/textos-oficiales.test.ts` (formato de las copias, números de artículo únicos, URL de dominios oficiales, ningún marcador editorial dentro del texto); verificar que pasa y que falla si se inserta "Jurisprudencia Vigencia" en un artículo

## 2. Registro verificado contra las copias

- [x] 2.1 Agregar `articulos: [{ norma, numero }]` al esquema de reglas y completarlo en las 98 reglas existentes a partir de su norma; verificar con `pnpm check` que todas lo tienen
- [x] 2.2 Ampliar `tests/textos-oficiales.test.ts` con la verificación de citas (fragmentos entre comillas o cita completa; elipsis como cortes en orden) contra los artículos indicados; reescribir las reglas parafraseadas con citas literales y ajustar el reverso de sus tarjetas sin cambiar ids; verificar que pasa y que una cita alterada ("cuatro (4) meses" en el ET 707) falla nombrando la regla

## 3. Índice de artículos

- [x] 3.1 Escribir `scripts/indexar-normas.py`, que propone nivel y tema por palabras clave y estado, y generar la propuesta de `src/content/indice-normas.json`; verificar que cada artículo de cada copia tiene una entrada
- [x] 3.2 Revisar a mano los niveles de ET, CPACA, Ley 2220, Ley 2010 y Ley 1116; verificar que los derogados son nivel 3 y que el criterio de nivel 1 se aplicó (términos, competencias, recursos, nulidades, caducidad, prescripción, sanciones)
- [x] 3.3 Revisar a mano los niveles de D. 1165, DL 920, Ley 2586, Ley 1609, DL 2245, Ley 1952 y DL 927, con la misma verificación
- [x] 3.4 Agregar `tests/indice-normas.test.ts` (índice completo y sin duplicados, derogados en nivel 3, nivel 1 con tarjeta o razón, al menos 3 tarjetas por norma); verificar que pasa al final del grupo 4 y que hoy falla mostrando los artículos de nivel 1 pendientes

## 4. Reglas y tarjetas de nivel 1

- [x] 4.1 Agregar el mazo "Carrera y disciplinario" a `MAZOS` y el caso de regla correspondiente; verificar con `pnpm check`
- [x] 4.2 Reglas y tarjetas del Estatuto Tributario (Libro V y artículos citados por los planes), en los mazos A y B; verificar con `pnpm test` (citas en la copia, reversos en la cita) y que los artículos de nivel 1 del ET quedan cubiertos o con razón
- [x] 4.3 Reglas y tarjetas de CPACA, Ley 2220, Ley 2010 y Ley 1116 en sus mazos; verificar igual
- [x] 4.4 Reglas y tarjetas de Ley 1609, D. 1165, DL 920 (donde difiere de la Ley 2586), Ley 2586 y DL 2245 en el mazo D, con el aviso de vigencia donde corresponde; verificar igual
- [x] 4.5 Reglas y tarjetas de Ley 1952 y DL 927 en el mazo Carrera y disciplinario; verificar igual y que `tests/indice-normas.test.ts` pasa completo

## 5. Ritmo diario

- [x] 5.1 Agregar `inicio` al estado de tarjeta y las funciones de límite diario e intercalado determinista en `repaso.ts` y `repaso-cliente.ts`; verificar con Vitest: primera visita con 25 nuevas de mazos intercalados, ninguna nueva tras agotar el límite, estados viejos sin `inicio` y propias fuera del límite
- [x] 5.2 Agregar los chips 10/25/50 en `/repasar`, aplicar el límite en la sesión (salvo con `?mazo=`) y en los contadores de `/repasar` e Inicio; verificar en el navegador que Inicio, `/repasar` y la sesión muestran el mismo número el primer día

## 6. Cobertura

- [x] 6.1 Crear `/normativa/cobertura` (resumen por norma, plegables con nivel 1 y 2, línea de nivel 3, anclas por norma, enlaces oficiales) y enlazarla desde `/normativa`; verificar a 360 px sin scroll horizontal, la apertura por ancla y que Normativa aparece activo

## 7. Documentación y verificación

- [x] 7.1 Actualizar el README (copias oficiales, scripts, índice, niveles, límite diario, nueva clave de almacenamiento); verificar que cada archivo citado existe
- [x] 7.2 Correr `pnpm validar`, `pnpm test` y `pnpm build` sin errores ni advertencias, y medir el peso del JSON de tarjetas en `/repasar/tarjetas` (aplicar la Decisión 10 si pasa de 150 KB comprimido)
- [x] 7.3 Recorrer `/normativa/cobertura`, `/repasar` y una sesión a 360 y 1280 px, en claro y oscuro, con teclado

## Workflow follow-up

- Archivar el cambio con `/opsx:archive` una vez revisado y publicado.
