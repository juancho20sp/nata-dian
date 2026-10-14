# repaso-quiz Specification

## Purpose

Entrena el formato de la prueba (una pregunta, tres opciones, una correcta) con los datos del dossier, para reconocer qué norma regula cada tema entre opciones parecidas.

## Requirements

### Requirement: Preguntas de tres opciones
`/repasar/quiz` SHALL presentar 10 preguntas, una a la vez. Cada pregunta usa una tarjeta del dossier marcada como apta para quiz: el frente es la pregunta, su reverso es la opción correcta y las otras dos opciones son reversos de otras tarjetas aptas del mismo mazo. Las tres opciones SHALL ser distintas y aparecer en orden aleatorio como A, B y C.

#### Scenario: Opciones de un mismo mazo
- **WHEN** aparece una pregunta del mazo Tronco común
- **THEN** las tres opciones son reversos de tarjetas del mazo Tronco común y solo una es la correcta

#### Scenario: Sin repetir
- **WHEN** el usuario completa un quiz
- **THEN** ninguna pregunta se repitió

### Requirement: Responder y ver la correcta
Al elegir una opción (con toque o con las teclas 1, 2, 3 o A, B, C), el quiz SHALL bloquear las opciones, marcar la correcta y, si falló, la elegida, con texto además de color ("Correcta", "Su respuesta"), y mostrar "Siguiente".

#### Scenario: Respuesta incorrecta
- **WHEN** el usuario elige B y la correcta es C
- **THEN** C se marca "Correcta", B se marca "Su respuesta" y se anuncia "La correcta era C"

### Requirement: Resultado del quiz
Al terminar, el quiz SHALL mostrar el puntaje (aciertos sobre 10) y la lista de preguntas falladas con su respuesta correcta, y ofrecer otro quiz.

#### Scenario: Final
- **WHEN** el usuario responde la décima pregunta y toca "Siguiente"
- **THEN** ve "8 de 10" (o el puntaje que corresponda) y las falladas con su respuesta

### Requirement: Efecto en las tarjetas
Cada pregunta fallada SHALL devolver su tarjeta a la caja 1 de la repetición espaciada. Las acertadas no cambian de caja.

#### Scenario: Fallo en el quiz
- **WHEN** el usuario falla en el quiz la pregunta de una tarjeta que estaba en la caja 3
- **THEN** la tarjeta queda en la caja 1 y vuelve al día siguiente en Tarjetas

### Requirement: Selección de preguntas
El quiz SHALL priorizar las tarjetas aptas que tocan hoy o están en cajas bajas, y completar con otras al azar. Un mazo SHALL participar solo si tiene al menos tres tarjetas aptas.

#### Scenario: Mazo pequeño
- **WHEN** un mazo tiene solo dos tarjetas aptas para quiz
- **THEN** ninguna pregunta del quiz sale de ese mazo
