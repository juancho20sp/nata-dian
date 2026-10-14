# Spec Delta

## Purpose

Entrena el razonamiento de los ítems de juicio situacional con casos de práctica escritos para el sitio, en el formato oficial (un caso, un enunciado, tres opciones), apoyados en reglas verificadas.

## ADDED Requirements

### Requirement: Casos de práctica con el formato oficial
El sitio SHALL incluir casos de práctica para los casos A, B, C, D y el tronco común, cada uno con situación, pregunta, tres opciones (A, B, C) con una sola correcta, explicación y al menos una regla del registro verificado que la sustenta. Cada caso de los cuatro y el tronco común SHALL tener al menos 4 casos de práctica.

#### Scenario: Caso sustentado
- **WHEN** se revisa cualquier caso de práctica
- **THEN** tiene tres opciones distintas, una correcta y al menos una regla verificada citada en su explicación

#### Scenario: Cobertura
- **WHEN** se cuentan los casos de práctica por caso
- **THEN** A, B, C, D y tronco común tienen al menos 4 cada uno

### Requirement: Rótulo de caso elaborado
Cada caso de práctica SHALL mostrar, antes de responder, el rótulo "Caso de práctica elaborado para este sitio; no es una pregunta de la prueba." La página SHALL explicar que las preguntas reales de la CNSC no se publican.

#### Scenario: Rótulo visible
- **WHEN** aparece un caso de práctica
- **THEN** el rótulo es visible antes de las opciones

### Requirement: Responder y aprender
En `/repasar/casos` el usuario SHALL elegir una opción (toque o teclas 1, 2, 3 o A, B, C). El sitio SHALL bloquear las opciones, marcar la correcta y la elegida con texto además de color, y mostrar la explicación con la norma, el artículo y el enlace oficial de cada regla citada. Cada respuesta SHALL sumar 1 a la meta diaria.

#### Scenario: Respuesta incorrecta
- **WHEN** el usuario elige una opción incorrecta
- **THEN** ve "Su respuesta" en la elegida, "Correcta" en la correcta y la explicación con el artículo

#### Scenario: Suma a la meta
- **WHEN** el usuario responde un caso de práctica
- **THEN** el avance de la meta de hoy sube en 1

### Requirement: Filtro por caso con peso igual
`/repasar/casos` SHALL ofrecer chips Todos, A, B, C, D y Tronco común (Todos al cargar), con el filtro en la URL (`?caso=`). Con Todos, el orden SHALL alternar los casos para que ninguno pese más, sin repetir un caso de práctica hasta haber mostrado todos los del filtro.

#### Scenario: Filtrar por Caso B
- **WHEN** el usuario toca el chip B
- **THEN** solo ve casos de práctica de cobranzas y la URL incluye `?caso=B`

#### Scenario: Alternancia
- **WHEN** el usuario responde cinco casos seguidos con Todos
- **THEN** los cinco son de casos distintos (A, B, C, D y tronco común)

### Requirement: Avance de casos
El sitio SHALL recordar en el navegador qué casos de práctica se respondieron bien y mostrar por caso "N de M acertados". Los fallados SHALL volver primero en la siguiente visita.

#### Scenario: Volver a los fallados
- **WHEN** el usuario falló un caso de práctica de cobranzas y vuelve a `/repasar/casos?caso=B`
- **THEN** ese caso aparece antes que los no respondidos
