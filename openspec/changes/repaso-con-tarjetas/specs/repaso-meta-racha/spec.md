# Spec Delta

## Purpose

Sostiene el hábito de repaso diario hasta la prueba con una meta pequeña y elegible y una racha que premia la constancia sin castigar un mal día.

## ADDED Requirements

### Requirement: Meta diaria elegible
El usuario SHALL poder elegir en `/repasar` una meta diaria de 10, 20 o 30 respuestas; por defecto es 20. Cada tarjeta respondida y cada pregunta de quiz respondida SHALL sumar 1 al día en curso según la fecha de Colombia.

#### Scenario: Meta por defecto
- **WHEN** el usuario abre `/repasar` por primera vez
- **THEN** la meta es 20 y el avance de hoy es 0 de 20

#### Scenario: Sumar desde el quiz
- **WHEN** el usuario responde 10 preguntas de quiz y 5 tarjetas el mismo día
- **THEN** el avance de hoy es 15

#### Scenario: Cambio de día
- **WHEN** el usuario respondió 12 el 20 de octubre y abre el sitio el 21 de octubre en Colombia
- **THEN** el avance de hoy es 0

### Requirement: Meta cumplida
Al llegar a la meta, Repasar SHALL mostrar "Meta de hoy cumplida." sin animaciones ni sonidos, y SHALL permitir seguir repasando.

#### Scenario: Llegar a la meta
- **WHEN** el usuario responde la vigésima tarjeta con meta 20
- **THEN** ve "Meta de hoy cumplida." y puede seguir con la siguiente tarjeta

### Requirement: Racha indulgente
La racha SHALL contar los días cumplidos (meta alcanzada, fecha de Colombia) yendo hacia atrás desde hoy, o desde ayer si hoy aún no se cumple. Un día sin cumplir no corta la racha si es un hueco de un solo día entre dos días cumplidos y es el único hueco de su semana (lunes a domingo); no suma. Cualquier otro día sin cumplir corta la racha ahí.

#### Scenario: Días seguidos
- **WHEN** el usuario cumplió la meta el 19, 20 y 21 de octubre, y hoy es el 21
- **THEN** la racha es de 3 días

#### Scenario: Un día perdido en la semana
- **WHEN** el usuario cumplió el 19, no el 20, y sí el 21 y el 22 de octubre (misma semana), y hoy es el 22
- **THEN** la racha es de 3 días

#### Scenario: Dos días perdidos en la semana
- **WHEN** el usuario cumplió el 19, no el 20 ni el 21, y sí el 22 de octubre, y hoy es el 22
- **THEN** la racha es de 1 día

#### Scenario: Dos huecos sueltos en la semana
- **WHEN** el usuario cumplió el 19, 21 y 23 de octubre, no el 20 ni el 22, y hoy es el 23
- **THEN** la racha es de 2 días (el 22 se perdona; el 20 es el segundo hueco de la semana y la corta)

#### Scenario: Hoy aún sin cumplir
- **WHEN** el usuario cumplió el 20 y el 21 de octubre y hoy, 22, lleva 5 de 20
- **THEN** la racha sigue en 2 días

### Requirement: Tono sin culpa
Ningún texto de meta o racha SHALL usar reproches, signos de exclamación ni emojis. Si la racha siguió gracias al día de gracia, SHALL decir "Le faltó un día esta semana; la racha sigue."

#### Scenario: Día de gracia
- **WHEN** la racha se mantuvo con un día sin cumplir esta semana
- **THEN** Repasar muestra "Le faltó un día esta semana; la racha sigue."

### Requirement: Repaso en Inicio
Inicio SHALL mostrar una línea con las tarjetas que tocan hoy y la racha ("Hoy: N tarjetas para repasar · racha de D días") que lleva a `/repasar`. Después del 8 de noviembre de 2026, la meta y la racha SHALL dejar de mostrarse en Inicio y en Repasar.

#### Scenario: Línea en Inicio
- **WHEN** el usuario abre Inicio con 18 tarjetas para hoy y una racha de 4 días
- **THEN** ve "Hoy: 18 tarjetas para repasar · racha de 4 días" y al tocarla llega a `/repasar`

#### Scenario: Después de la prueba
- **WHEN** el usuario abre Inicio el 9 de noviembre de 2026
- **THEN** no ve la línea de meta y racha
