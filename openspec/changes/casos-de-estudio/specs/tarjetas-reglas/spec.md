# Spec Delta

## Purpose

Enseña la sustancia de los cuatro casos probables (términos, competencias y consecuencias) con tarjetas cuya respuesta viene de una regla verificada contra el texto oficial de la norma.

## ADDED Requirements

### Requirement: Registro de reglas verificadas
El sitio SHALL mantener un registro de reglas tomado de `fuentes/investigacion-casos.md`, con solo las filas marcadas "Verificado". Cada regla tiene un id estable, un caso (A, B, C, D o tronco común), una cita literal del texto oficial, la norma y artículo, y la URL oficial. Una regla de aduanas cuyo texto coincide en el Decreto Ley 920 de 2023 y en la Ley 2586 de 2026 SHALL citar ambas normas.

#### Scenario: Solo verificadas
- **WHEN** se compara el registro con la investigación
- **THEN** cada regla del registro corresponde a una fila marcada "Verificado" y su cita aparece literal en esa fila

#### Scenario: Regla aduanera con dos normas
- **WHEN** se revisa la regla del término para objetar la aprehensión
- **THEN** cita la Ley 2586 de 2026 y el Decreto Ley 920 de 2023

### Requirement: Mazos de reglas por caso
El sitio SHALL incluir los mazos Caso A: fiscalización, Caso B: cobranzas, Caso C: jurídica, Caso D: aduanas y cambiario, y Procedimiento administrativo. Cada tarjeta de estos mazos remite a una regla del registro; su reverso SHALL ser un fragmento de la cita de esa regla.

#### Scenario: Reverso desde la cita
- **WHEN** se revisa cualquier tarjeta de un mazo de reglas
- **THEN** su reverso, sin contar puntuación, aparece en la cita de la regla a la que remite

#### Scenario: Cobertura por caso
- **WHEN** se cuentan las tarjetas de cada mazo de reglas
- **THEN** cada mazo tiene al menos 10 tarjetas y al menos 3 aptas para quiz

### Requirement: Norma visible y enlace oficial
Al voltear una tarjeta de regla, el sitio SHALL mostrar la norma y artículo ("ET art. 707") y un enlace "Ver el texto oficial" a la URL de la regla, además del reverso.

#### Scenario: Voltear una tarjeta de regla
- **WHEN** el usuario voltea la tarjeta "¿Plazo para responder el requerimiento especial?"
- **THEN** ve la respuesta, "ET art. 707" y el enlace al texto oficial del Estatuto Tributario

### Requirement: Mismo repaso que las demás tarjetas
Las tarjetas de reglas SHALL usar la misma repetición espaciada, meta diaria y racha que las tarjetas existentes, y SHALL aparecer en `/repasar` como mazos con sus contadores. Las aptas SHALL entrar al quiz con distractores de su mismo mazo.

#### Scenario: Mazo de reglas en Repasar
- **WHEN** el usuario abre `/repasar`
- **THEN** ve los cinco mazos de reglas con total, para hoy y dominadas, junto a los mazos existentes

### Requirement: Aviso de vigencia aduanera
Las tarjetas del mazo Caso D que citan el Decreto Ley 920 de 2023 SHALL mostrar el aviso "El Decreto Ley 920 de 2023 fue derogado por la Ley 2586 de 2026 (19 de junio de 2026); la prueba solo incluye normas expedidas antes de esa fecha. Se citan ambas cuando coinciden."

#### Scenario: Tarjeta aduanera
- **WHEN** el usuario voltea una tarjeta del mazo Caso D que cita ambas normas
- **THEN** ve el aviso de vigencia
