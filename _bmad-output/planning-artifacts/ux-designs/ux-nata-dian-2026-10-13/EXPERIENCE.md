---
name: Estudio DIAN 2676
status: final
sources:
  - fuentes/contenido-dossier.md
updated: 2026-10-13
---

# Estudio DIAN 2676: experiencia

## Foundation

Sitio web estático (Astro + Tailwind), mobile-first, en español de Colombia. Sin sistema de UI externo; las clases y variables de `src/styles/global.css` son la base. `DESIGN.md` es la referencia visual; este documento define cómo se organiza y se comporta.

**Trabajo principal: consulta.** El sitio responde preguntas puntuales sobre la prueba; el plan de estudio es secundario. **Restricción:** no se agrega contenido; el dossier sigue siendo la única fuente. El rediseño reorganiza, resume con frases del propio dossier y pliega.

**Protagonista.** Abogado de 27 años, cursa una maestría y tiene amplia experiencia en propiedad intelectual. Lee normas con soltura, pero el procedimiento tributario, el aduanero y la estructura de la DIAN son terreno nuevo. [ASSUMPTION] Estudia en ratos cortos en el celular entre clases y en sesiones largas el fin de semana. En los recorridos se le llama Andrea (nombre provisional).

## Information Architecture

Hoy hay 9 secciones en la navegación. Pasan a **6 destinos y búsqueda** (el sexto, Repasar, se agregó en la actualización de tarjetas):

| Destino | Ruta | Reúne | Propósito |
|---|---|---|---|
| Inicio | `/` | Inicio actual | Cuenta regresiva, lo que falta y las preguntas frecuentes como puerta de entrada |
| La prueba | `/prueba` | La prueba + Recursos | Cómo es y cómo se califica; cómo practicar |
| Normativa | `/normativa` | Normativa + contexto normativo | Qué norma estudiar según el tema y el empleo |
| Convocatoria | `/convocatoria` | Convocatoria y empleos | Proceso, cronograma, empleos para abogados, cargo de Gestor |
| Repasar | `/repasar` | Nuevo | Tarjetas con repetición espaciada, quiz de normas, meta diaria y racha |
| Mi plan | `/plan` | Hoy + Elige tu plan + plan detallado | Esta semana, el plan elegido y el progreso |
| Buscar | diálogo | Pagefind | Cualquier término |

Los 6 destinos van en la barra con etiquetas cortas: Inicio, Prueba, Normas, Concurso, Repasar y Mi plan. Los títulos de página siguen completos (La prueba, Normativa, Convocatoria). "Fuentes" pasa al pie. "Recursos" deja de ser sección y se vuelve la subpágina "Practicar".

### Subpáginas

| Ruta | Contenido | Viene de |
|---|---|---|
| `/prueba` | Lo esencial, estructura, calificación (ponderación plegada) | La prueba |
| `/prueba/dia` | Logística del día como lista: horarios, documento, qué llevar, qué no, reclamaciones | La prueba, "Día de la prueba" |
| `/prueba/practicar` | Cómo resolver un ítem de juicio situacional, recursos (solo oficiales por defecto) | La prueba + Recursos |
| `/normativa` | Lo esencial (2 avisos de contexto), chips por empleo, áreas plegables | Normativa |
| `/convocatoria` | Lo esencial, cronograma plegado, empleos para abogados, cargo de Gestor | Convocatoria |
| `/plan` | Esta semana del plan elegido, luego semanas y tareas | Hoy + plan detallado |
| `/plan/elegir` | Selector de plan | Elige tu plan |
| `/repasar` | Resumen: tarjetas para hoy, meta, racha, mazos y entrada a los dos modos | Nuevo |
| `/repasar/tarjetas` | Sesión de tarjetas (todas las que tocan hoy o un mazo) | Nuevo |
| `/repasar/quiz` | Quiz de 10 preguntas A/B/C | Nuevo |
| `/repasar/mis-tarjetas` | Crear, editar y borrar tarjetas propias | Nuevo |
| `/repasar/casos` | Casos de práctica A/B/C por caso, con explicación y artículo | Nuevo (casos) |
| `/repasar/terminos` | Líneas de tiempo de términos por caso | Nuevo (casos) |
| `/normativa/cobertura` | Índice de artículos de cada norma enlazada, con su nivel, sus tarjetas y el enlace al texto oficial | Nuevo (normas) |
| `/planes/[slug]` | Vista completa e imprimible de un plan | Se conserva para imprimir y compartir |

Rutas anteriores (`/hoy`, `/planes`, `/recursos`, `/fuentes`) redirigen a la nueva ubicación. `/fuentes` sigue existiendo, enlazada desde el pie.

### Preguntas de entrada (Inicio)

[ASSUMPTION] Las cinco consultas más frecuentes, cada una como tarjeta-pregunta:

1. ¿Qué llevo y a qué hora llego el día de la prueba? → `/prueba/dia`
2. ¿Cómo se califica y cuánto necesito? → `/prueba#calificacion`
3. ¿Qué norma estudio para este tema? → `/normativa`
4. ¿Qué empleos aplican para un abogado? → `/convocatoria#empleos`
5. ¿Dónde practico con preguntas oficiales? → `/prueba/practicar`

### Repasar: tarjetas y quiz

**Mazos.** Tarjetas del dossier, agrupadas en mazos: La prueba (datos del examen y del día), Tronco común (tema → norma), Procedimiento tributario (concepto → artículos del ET), Cobro, Aduanero y cambiario, y Contexto (cambios normativos y datos que los blogs repiten mal). Más **Mis tarjetas**, que escribe el usuario y viven solo en su dispositivo. El reverso de una tarjeta del dossier es siempre un fragmento literal del dossier; el frente es una pregunta que lo pide. [ASSUMPTION] Los mazos y su número (unas 40 a 60 tarjetas).

**Sustancia de los casos (actualización).** Además de los mazos del dossier, mazos de reglas por caso (A fiscalización, B cobranzas, C jurídica, D aduanas y cambiario, y Procedimiento administrativo del tronco común) salidos de `fuentes/investigacion-casos.md`, solo con reglas Verificado contra el texto oficial de la norma; cada tarjeta muestra la norma y enlaza a su texto oficial. **Casos de práctica**: situación, pregunta y tres opciones como en la GOA, escritos para el sitio y rotulados "Caso de práctica elaborado para este sitio; no es una pregunta de la prueba". Tras responder, explicación con el artículo. **Términos**: por caso, la secuencia de actos con su plazo (p. ej. requerimiento especial → respuesta 3 meses → liquidación de revisión 6 meses → reconsideración 2 meses → fallo 1 año). Los cuatro casos pesan igual. [ASSUMPTION] Rutas `/repasar/casos` y `/repasar/terminos`.

**Normas enlazadas (actualización).** Cada norma oficial enlazada tiene un índice completo de artículos en `/normativa/cobertura`, con el nivel de cada artículo (1: decide casos; 2: contexto; 3: no se estudia) y cuántas tarjetas lo cubren. Las tarjetas salen de copias del texto oficial guardadas en el repositorio y verificadas automáticamente. Repasar limita las tarjetas nuevas por día. [ASSUMPTION] Niveles, límite diario y reparto por mazos.

**Repetición espaciada.** Cajas Leitner 1 a 5. Acertar sube una caja; fallar vuelve a la caja 1. Intervalos 1, 2, 4, 7 y 14 días [ASSUMPTION], recortados para que del 5 al 7 de noviembre todas las tarjetas vuelvan una vez ("repaso final"). Una tarjeta "domina" cuando llega a la caja 5.

**Quiz.** 10 preguntas de "¿qué norma regula…?" con tres opciones (A, B, C), como en la prueba. La correcta es el reverso de una tarjeta; las otras dos son reversos de otras tarjetas del mismo mazo. Al final, puntaje y repaso de las falladas. Las falladas vuelven a la caja 1 de su tarjeta.

**Meta diaria y racha.** Meta de 10, 20 o 30 respuestas al día (por defecto 20), elegible en Repasar. Cada tarjeta respondida y cada pregunta del quiz suma 1. Un día cuenta para la racha si se cumple la meta (fecha de Colombia). La racha es indulgente: un día sin cumplir por semana (lunes a domingo) no la rompe. Nunca se muestran mensajes de culpa.

## Voice and Tone

| Hacer | No hacer |
|---|---|
| Títulos como preguntas o tareas: "¿Qué llevo el día de la prueba?" | Títulos institucionales sin pista: "Logística" |
| Primero la respuesta corta, después el detalle | Abrir con contexto histórico |
| Cifras con unidad: "70/100", "4 horas", "5 días hábiles" | "Un mínimo establecido" |
| Advertencia en una frase: "Dato de terceros; verifique en SIMO." | Párrafos de advertencia repetidos |
| Usted (como el dossier) | Tuteo mezclado con usted |
| "Meta de hoy: 12 de 20." / "Racha: 5 días." | "¡Vas genial! 🔥" / "Perdiste tu racha" |
| "Le faltó un día esta semana; la racha sigue." | "No olvides estudiar" |
| Tras fallar: "Vuelve mañana." | "Incorrecto ✗" en rojo |

Los textos de Lo esencial se arman con frases del dossier, sin agregar datos.

## Component Patterns

Las especificaciones visuales están en `DESIGN.md.Components`.

| Componente | Dónde | Reglas de comportamiento |
|---|---|---|
| Lo esencial | Toda página de consulta | Siempre visible y arriba. 3 a 5 viñetas. Cada viñeta puede enlazar a su sección. |
| Sección plegable | Páginas de consulta, Mi plan | Cerrada por defecto, salvo si la URL trae su ancla (`#calificacion`), que la abre y desplaza. Su resumen se ve aun cerrada. Pagefind indexa el contenido plegado. |
| Tarjeta-pregunta | Inicio | Toda la tarjeta es el enlace. |
| Aviso | Páginas con datos de terceros, inferidos o aproximados | Uno por página, agrupado. Primera frase visible; detalle plegado. La nota de que SIMO y el Acuerdo 21 prevalecen sigue en el pie de todas las páginas. |
| Chips de filtro | Normativa, Practicar | Selección única por grupo. "Todos" es el estado inicial en Normativa; "Solo oficiales" está activo por defecto en Practicar. El filtro se refleja en la URL (`?empleo=`) para poder compartirlo. |
| Barra inferior | Global, móvil | 6 destinos fijos abajo, con etiquetas cortas. La búsqueda y el tema siguen en la barra superior. |
| Tarjeta | Repasar → Tarjetas | Muestra el frente; tocar o Espacio la voltea. Con el reverso visible aparecen "La sabía" y "No la sabía". La respuesta mueve la tarjeta de caja y pasa a la siguiente. Enlace "Ver en el sitio" a la sección de donde sale. |
| Pregunta de quiz | Repasar → Quiz | Tres opciones A, B, C como botones. Elegir revela la correcta y la elegida; "Siguiente" avanza. Teclas 1, 2, 3 o A, B, C. |
| Meta y racha | Repasar, Inicio (una línea) | Barra de meta "N de M" y número de días de racha. En Inicio, una línea: "Hoy: N tarjetas para repasar · racha de D días". |
| Editor de tarjeta propia | Mis tarjetas | Frente y reverso (texto plano), mazo fijo "Mis tarjetas". Guardar, editar, borrar con confirmación. |
| Esta semana | Mi plan, Inicio (versión de una línea) | Muestra la semana que corre del plan elegido. En Inicio es una sola línea con enlace a Mi plan. |

## State Patterns

| Estado | Superficie | Tratamiento |
|---|---|---|
| Sin plan elegido | Mi plan | Usa el plan por defecto y lo dice: "Plan mixto (por defecto) · Cambiar". |
| Antes del 12 de octubre | Mi plan | "El plan empieza el lunes 12 de octubre." Enlace al tronco común. |
| Día de la prueba | Inicio, Mi plan | Inicio pone arriba la tarjeta de logística; Mi plan muestra "Hoy es la prueba" y enlaza a `/prueba/dia`. |
| Después del 8 de noviembre | Inicio, Mi plan | La cuenta regresiva cambia a "La prueba terminó"; Mi plan muestra reclamaciones. |
| Sin JavaScript | Mi plan, filtros | Mi plan muestra el plan por defecto completo; los filtros muestran todo. |
| Filtro sin resultados | Normativa | "Ninguna norma para este empleo." Botón "Ver todas". |
| Ancla en la URL | Páginas de consulta | Abre la sección plegable correspondiente. |
| Nada para hoy | Repasar → Tarjetas | "No hay tarjetas para hoy." Ofrece repasar un mazo igual o hacer un quiz. |
| Primera visita a Repasar | Repasar | Todas las tarjetas del dossier están en la caja 1 y tocan hoy. La meta por defecto es 20. |
| Meta cumplida | Repasar, Inicio | "Meta de hoy cumplida." Se puede seguir repasando; no hay confeti. |
| Sin almacenamiento | Repasar | Funciona en la sesión, con aviso de una línea: "Este navegador no guarda el avance." |
| Sin JavaScript | Repasar | Mensaje: el repaso necesita JavaScript; enlace a las páginas de consulta. |
| Después de la prueba | Repasar | Sigue disponible; la meta y la racha dejan de mostrarse. |

## Interaction Primitives

- Tocar para abrir y cerrar secciones. Sin acordeón exclusivo: abrir una no cierra las demás.
- Filtros con chips, sin `select`.
- La búsqueda abre un diálogo; Escape lo cierra.
- Tarjetas: tocar para voltear; Espacio o Enter voltea; 1 = no la sabía, 2 = la sabía.
- **Prohibido:** carruseles, pestañas que oculten contenido indexable, más de una tabla abierta al cargar, ventanas emergentes de bienvenida.

## Accessibility Floor

- Las secciones plegables usan `details` y `summary` nativos (teclado y lector de pantalla sin código).
- Los chips son botones con `aria-pressed`; el número de resultados se anuncia con `aria-live`.
- La barra inferior es un `nav` con `aria-current="page"` en el destino activo; objetivos táctiles de 44 px o más.
- Al abrir una sección por ancla, el foco va a su `summary`.
- La tarjeta es un botón; al voltear se anuncia el reverso (`aria-live`). Las opciones del quiz son botones; el resultado se anuncia como texto ("Correcta" / "La correcta era B"), no solo por color.
- Con `prefers-reduced-motion`, la tarjeta cambia sin animación de giro.
- Se mantienen el salto al contenido, el contraste AA y el respeto de `prefers-reduced-motion`.

## Responsive & Platform

| Ancho | Comportamiento |
|---|---|
| < 1024 px | Barra inferior con 6 destinos; barra superior solo con nombre, búsqueda y tema. |
| ≥ 1024 px | Sin barra inferior; los destinos pasan a la barra superior. Columna de lectura centrada. |
| Impresión | `/planes/[slug]` con todo desplegado; sin barras. |

## Inspiration & Anti-patterns

- **Rechazado: el portal institucional.** Muchas secciones con nombres administrativos y todo abierto a la vez. Es lo que hoy se percibe como sobrecarga.
- **Aceptado (actualización de tarjetas): meta diaria y racha**, a pedido del usuario. La racha es indulgente y sin culpa.
- **Rechazado: insignias, puntos, tablas de posiciones y confeti.** El refuerzo es el número de días y la meta cumplida.
- **Inspiración: Anki y Leitner** para la repetición espaciada; el quiz copia el formato A/B/C de la prueba.

## Key Flows

### Flujo 1: consulta rápida entre clases (Andrea, martes, 15 minutos libres, celular)

1. Andrea abre el sitio y cae en Inicio.
2. Ve cuántos días faltan y, debajo, cinco preguntas.
3. Toca "¿Cómo se califica y cuánto necesito?".
4. `/prueba` abre la sección de calificación: Lo esencial dice que la funcional es eliminatoria, exige 70/100 y pesa 60 % a 70 %.
5. **Clímax:** en menos de un minuto tiene la cifra que buscaba, sin desplazarse por la estructura ni por la logística. La tabla de ponderación por modalidad queda plegada por si la necesita.

### Flujo 2: ¿qué norma estudio? (Andrea, primera semana, sin saber nada de cobro coactivo)

1. Andrea entra a Normativa desde la barra inferior.
2. Lo esencial le dice en dos líneas qué cambió (Decreto Ley 071 derogado; base: Ley 2277 de 2022).
3. Toca el chip de su tipo de empleo; las áreas se reducen.
4. Abre el área de cobro y ve las normas con su enlace.
5. **Clímax:** sabe qué leer esta semana y dónde está, sin haber visto la tabla completa de todas las áreas.

### Flujo 3: sesión de estudio del sábado (Andrea, portátil, 3 horas)

1. Andrea entra a Mi plan.
2. Arriba ve "Semana 2 de 4" con los temas de la semana y la rutina (60/30/10) plegada.
3. Marca la semana anterior como completada; la barra sube.
4. **Clímax:** el plan le dice exactamente qué toca hoy, y el resto de las semanas espera plegado.

### Flujo 4: la víspera (Andrea, sábado 7 de noviembre por la noche)

1. Andrea abre Inicio; la tarjeta "¿Qué llevo y a qué hora llego?" está primera.
2. `/prueba/dia` muestra la lista: puertas 7:15, inicio 8:00, cierre 8:30; documento válido; qué llevar.
3. **Clímax:** revisa la lista punto por punto y cierra el celular tranquilo.

### Flujo 5: diez minutos de tarjetas en el bus (Andrea, jueves 22 de octubre, celular)

1. Andrea abre Inicio y ve "Hoy: 18 tarjetas para repasar · racha de 4 días".
2. Toca la línea y llega a Repasar; toca "Repasar tarjetas".
3. Frente: "¿Qué decreto derogó el Decreto Ley 071 de 2020?" Toca para voltear.
4. Reverso: "fue derogado por el artículo 152 del Decreto Ley 927 de 2023". Toca "La sabía".
5. Sigue hasta llegar a 20; la barra dice "Meta de hoy cumplida".
6. **Clímax:** la racha pasa a 5 días, y las tarjetas que falló volverán mañana, no dentro de dos semanas.

### Flujo 6: quiz antes de dormir (Andrea, domingo, después del simulacro)

1. Andrea entra a Repasar → Quiz.
2. Diez preguntas "¿Qué norma regula…?" con opciones A, B y C.
3. Falla dos; al final ve 8/10 y las dos falladas con la respuesta correcta.
4. **Clímax:** las dos falladas quedan en la caja 1 y aparecen mañana entre sus tarjetas.

## Open Questions

- [ASSUMPTION] Nombre del protagonista y hábitos de estudio (dispositivo, momentos).
- [ASSUMPTION] Las cinco preguntas de entrada.

- [ASSUMPTION] Se mantiene la identidad visual actual.
- [ASSUMPTION] Mazos de tarjetas e intervalos Leitner (1, 2, 4, 7, 14 días con repaso final del 5 al 7 de noviembre).
