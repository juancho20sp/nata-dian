# mi-plan Specification

## Purpose

Reúne en una sola sección el plan de estudio: qué plan sigue el usuario, qué toca esta semana y cuánto lleva, sin competir con las páginas de consulta.

## Requirements

### Requirement: Entrada a Mi plan
`/plan` SHALL llevar a la página del plan elegido por el usuario. Si no hay plan elegido, o el guardado ya no existe, SHALL llevar al plan por defecto (mixto). Sin JavaScript, `/plan` SHALL ofrecer un enlace al plan por defecto y otro al selector.

#### Scenario: Plan elegido
- **WHEN** el usuario eligió el caso B y abre `/plan`
- **THEN** llega a `/planes/caso-b-cobranzas`

#### Scenario: Sin elección
- **WHEN** el usuario nunca eligió plan y abre `/plan`
- **THEN** llega a `/planes/por-defecto`

### Requirement: Selector de plan
`/plan/elegir` SHALL listar los cinco planes seleccionables (el por defecto y los casos A a D), explicar en una línea por qué el por defecto es el mixto, marcar el plan elegido y guardar la elección en el navegador. El tronco común no SHALL ser seleccionable.

#### Scenario: Elegir un plan
- **WHEN** el usuario elige el caso C en `/plan/elegir`
- **THEN** el caso C queda marcado, y al abrir `/plan` llega a `/planes/caso-c-juridica`

### Requirement: Encabezado del plan
La página de un plan seleccionable SHALL mostrar en su encabezado qué plan es, si es el elegido, y un enlace "Cambiar" a `/plan/elegir`.

#### Scenario: Plan por defecto sin elección
- **WHEN** el usuario sin plan elegido abre `/planes/por-defecto`
- **THEN** el encabezado dice que es el plan por defecto y ofrece "Cambiar"

### Requirement: Esta semana primero
La página de un plan seleccionable SHALL mostrar primero un bloque "Esta semana" con la semana en curso según la fecha de Colombia: número de semana, rango de fechas, temas, normas y horas si existen, y la rutina diaria sugerida plegada. Fuera del rango del plan, el bloque SHALL mostrar el estado correspondiente.

#### Scenario: Semana en curso
- **WHEN** el usuario abre `/planes/por-defecto` el 21 de octubre de 2026
- **THEN** el primer bloque es "Semana 2 de 4 · 19 al 25 de octubre" con sus temas

#### Scenario: Antes del plan
- **WHEN** la fecha en Colombia es anterior al 12 de octubre de 2026
- **THEN** el bloque dice que el plan empieza el lunes 12 de octubre y enlaza al tronco común

#### Scenario: Día de la prueba
- **WHEN** la fecha en Colombia es el 8 de noviembre de 2026
- **THEN** el bloque dice "Hoy es la prueba" y enlaza a `/prueba/dia`

#### Scenario: Después de la prueba
- **WHEN** la fecha en Colombia es posterior al 8 de noviembre de 2026
- **THEN** el bloque muestra cómo hacer reclamaciones

#### Scenario: Domingo
- **WHEN** la fecha en Colombia es un domingo dentro del plan
- **THEN** el bloque recuerda que toca simulacro

### Requirement: Semanas plegadas
Debajo de Esta semana, todas las semanas del plan SHALL aparecer como secciones plegables cerradas, con la semana en curso marcada. Cada semana SHALL conservar su casilla "Semana completada".

#### Scenario: Ver otra semana
- **WHEN** el usuario abre la semana 3 en la lista
- **THEN** ve sus temas y normas sin que se cierre otra semana abierta

### Requirement: Progreso del plan
El progreso SHALL seguir guardándose por plan en el navegador, con una casilla por semana y por tarea, una barra con hechos, total y porcentaje, y un botón para reiniciar que pide confirmación. Los elementos guardados que ya no existan en el plan SHALL ignorarse.

#### Scenario: Marcar y recargar
- **WHEN** el usuario marca una tarea y recarga la página
- **THEN** la tarea sigue marcada y la barra refleja el avance

#### Scenario: Reiniciar
- **WHEN** el usuario toca "Reiniciar progreso" y confirma
- **THEN** todas las casillas del plan quedan desmarcadas

### Requirement: Semana en curso en Inicio
Inicio SHALL mostrar una sola línea con la semana en curso del plan elegido (o del plan por defecto) y un enlace a `/plan`.

#### Scenario: Línea en Inicio
- **WHEN** el usuario abre Inicio el 21 de octubre de 2026 sin plan elegido
- **THEN** ve una línea con la semana 2 del plan mixto y un enlace a Mi plan

### Requirement: Impresión del plan
Al imprimir la página de un plan, todas las semanas SHALL salir desplegadas y no SHALL imprimirse la navegación, el bloque Esta semana ni los botones.

#### Scenario: Imprimir
- **WHEN** el usuario imprime `/planes/caso-a-fiscalizacion`
- **THEN** la impresión contiene las cuatro semanas desplegadas y las tareas, sin barras de navegación
