# terminos-caso Specification

## Purpose

Ordena los términos de cada caso en la secuencia en que ocurren los actos, para que el usuario ubique en qué momento del procedimiento está una situación y cuánto tiempo hay.

## Requirements

### Requirement: Línea de tiempo por caso
`/repasar/terminos` SHALL mostrar una línea de tiempo por caso (A, B, C, D) y una para el tronco común. Cada paso tiene el acto, el plazo, el punto desde el que se cuenta, la norma y artículo, y el enlace oficial, y remite a una regla del registro verificado.

#### Scenario: Caso A
- **WHEN** el usuario abre la línea de tiempo del Caso A
- **THEN** ve en orden: requerimiento especial (3 años desde el vencimiento para declarar, ET 705), respuesta (3 meses, ET 707), liquidación de revisión (6 meses, ET 710), reconsideración (2 meses, ET 720) y fallo (1 año, ET 732)

#### Scenario: Paso sustentado
- **WHEN** se revisa cualquier paso
- **THEN** su plazo aparece en la cita de la regla a la que remite

### Requirement: Navegación entre casos
La página SHALL mostrar los cinco tramos como secciones plegables (con su ancla `#caso-a`, `#caso-b`, `#caso-c`, `#caso-d`, `#tronco`). La página del plan de cada caso SHALL enlazar a su ancla.

#### Scenario: Desde el plan del Caso B
- **WHEN** el usuario toca "Términos del caso" en `/planes/caso-b-cobranzas`
- **THEN** llega a `/repasar/terminos#caso-b` con esa sección abierta

### Requirement: Lectura accesible e imprimible
Cada línea de tiempo SHALL ser una lista ordenada (no solo un dibujo), legible a 360 px sin desplazamiento horizontal, e imprimirse desplegada.

#### Scenario: Lector de pantalla
- **WHEN** un lector de pantalla recorre la línea del Caso C
- **THEN** anuncia una lista ordenada con acto, plazo y norma por paso
