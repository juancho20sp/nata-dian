# Spec Delta

## Purpose

Muestra al usuario qué parte de cada norma enlazada cubre el sitio y qué no, para que sepa qué leer directamente en el texto oficial.

## ADDED Requirements

### Requirement: Página de cobertura
`/normativa/cobertura` SHALL listar cada norma enlazada con el total de artículos, cuántos hay de cada nivel, cuántos de nivel 1 tienen tarjeta y el enlace al texto oficial. `/normativa` SHALL enlazar a esta página.

#### Scenario: Resumen por norma
- **WHEN** el usuario abre `/normativa/cobertura`
- **THEN** ve, por ejemplo, para la Ley 2586 de 2026: total de artículos, artículos de nivel 1, 2 y 3, y "N de M artículos de nivel 1 con tarjeta"

### Requirement: Detalle por artículo
Cada norma SHALL tener una sección plegable con la lista de sus artículos de nivel 1 y 2: número, tema, nivel, número de tarjetas y enlace al texto oficial. Los de nivel 3 SHALL aparecer agrupados en una línea con su conteo.

#### Scenario: Ver artículos de una norma
- **WHEN** el usuario abre la sección del Decreto Ley 2245 de 2011
- **THEN** ve sus artículos de nivel 1 y 2 con tema, tarjetas y enlace, y una línea con cuántos son de nivel 3

### Requirement: Navegación y búsqueda
La página SHALL pertenecer al destino Normativa, abrirse por ancla de norma (`#ley-2586-2026`), imprimirse desplegada y verse a 360 px sin desplazamiento horizontal.

#### Scenario: Ancla de norma
- **WHEN** el usuario abre `/normativa/cobertura#ley-2586-2026`
- **THEN** la sección de la Ley 2586 de 2026 está abierta y Normativa aparece activo en la navegación
