# Spec Delta

## MODIFIED Requirements

### Requirement: Tarjetas del dossier
El sitio SHALL incluir tarjetas agrupadas en los mazos La prueba, Tronco común, Procedimiento tributario, Cobro, Aduanero y cambiario, y Contexto. El reverso de cada tarjeta SHALL ser un fragmento literal de `fuentes/contenido-dossier.md` o, cuando una fuente oficial corrige al dossier, de la cita oficial registrada en `fuentes/investigacion-casos.md`. Cada tarjeta SHALL enlazar a la página del sitio donde está ese dato.

#### Scenario: Reverso verificable
- **WHEN** se revisa el reverso de cualquier tarjeta del dossier
- **THEN** su texto aparece en el dossier o en una cita oficial de la investigación, sin contar negritas, enlaces ni puntuación

#### Scenario: Ver en el sitio
- **WHEN** el usuario toca "Ver en el sitio" en una tarjeta del mazo Contexto
- **THEN** llega a la sección de la página de donde sale el dato

#### Scenario: Duración corregida
- **WHEN** el usuario voltea la tarjeta sobre el tiempo de la prueba
- **THEN** la respuesta dice cinco (5) horas, según la guía oficial de la prueba 2676
