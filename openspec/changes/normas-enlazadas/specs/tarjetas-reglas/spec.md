# Spec Delta

## MODIFIED Requirements

### Requirement: Registro de reglas verificadas
El sitio SHALL mantener un registro de reglas con id estable, caso (A, B, C, D, T o carrera y disciplinario), norma, artículos citados, una cita literal del texto oficial y la URL oficial. Cada regla SHALL venir de una fila "Verificado" de `fuentes/investigacion-casos.md` o de la copia oficial de su norma en `fuentes/normas/`, y en ambos casos su cita SHALL verificarse contra la copia oficial. Una regla de aduanas cuyo texto coincide en el Decreto Ley 920 de 2023 y en la Ley 2586 de 2026 SHALL citar ambas normas.

#### Scenario: Solo verificadas
- **WHEN** se verifica el registro
- **THEN** cada fragmento citado de cada regla aparece en el artículo correspondiente de la copia oficial

#### Scenario: Regla aduanera con dos normas
- **WHEN** se revisa la regla del término para objetar la aprehensión
- **THEN** cita la Ley 2586 de 2026 y el Decreto Ley 920 de 2023

### Requirement: Mazos de reglas por caso
El sitio SHALL incluir los mazos Caso A: fiscalización, Caso B: cobranzas, Caso C: jurídica, Caso D: aduanas y cambiario, Procedimiento administrativo y Carrera y disciplinario. Cada tarjeta de estos mazos remite a una regla del registro; su reverso SHALL ser un fragmento de la cita de esa regla.

#### Scenario: Reverso desde la cita
- **WHEN** se revisa cualquier tarjeta de un mazo de reglas
- **THEN** su reverso, sin contar puntuación, aparece en la cita de la regla a la que remite

#### Scenario: Cobertura por caso
- **WHEN** se cuentan las tarjetas de cada mazo de reglas
- **THEN** cada mazo tiene al menos 10 tarjetas y al menos 3 aptas para quiz

## ADDED Requirements

### Requirement: Cobertura de nivel 1 por norma
Cada artículo de nivel 1 del índice SHALL estar cubierto por al menos una tarjeta o tener registrada la razón por la que no la tiene. Cada norma enlazada (salvo el Decreto Ley 071 de 2020) SHALL tener al menos 3 tarjetas.

#### Scenario: Norma pequeña
- **WHEN** se cuentan las tarjetas de la Ley 1609 de 2013
- **THEN** hay al menos 3, o cada artículo de nivel 1 sin tarjeta tiene su razón

#### Scenario: Nivel 1 cubierto
- **WHEN** se recorre el índice de la Ley 2586 de 2026
- **THEN** ningún artículo de nivel 1 queda sin tarjeta y sin razón
