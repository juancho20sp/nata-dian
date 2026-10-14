# Spec Delta

## ADDED Requirements

### Requirement: Límite de tarjetas nuevas por día
La sesión de tarjetas SHALL mostrar por día, además de las que ya tienen historial y tocan hoy, como máximo N tarjetas nuevas (sin historial), con N elegible en `/repasar` entre 10, 25 y 50 (25 por defecto). Las tarjetas nuevas SHALL intercalarse entre mazos. Las tarjetas propias SHALL quedar fuera del límite.

#### Scenario: Primera visita
- **WHEN** el usuario sin historial abre `/repasar/tarjetas` con el límite en 25
- **THEN** la sesión tiene 25 tarjetas, de mazos distintos intercalados

#### Scenario: Tarjetas con historial
- **WHEN** ya vio 25 nuevas hoy y tiene 8 tarjetas con historial que tocan hoy
- **THEN** la sesión siguiente tiene esas 8 y ninguna nueva hasta mañana

#### Scenario: Mazo elegido
- **WHEN** el usuario abre `/repasar/tarjetas?mazo=Caso%20B:%20cobranzas`
- **THEN** ve todas las tarjetas de ese mazo, sin el límite diario

### Requirement: Contadores coherentes con el límite
`/repasar` e Inicio SHALL contar como "para hoy" las tarjetas con historial que tocan hoy más las nuevas que permite el límite del día.

#### Scenario: Inicio
- **WHEN** el usuario sin historial abre Inicio con el límite en 25
- **THEN** la línea de repaso dice 25 tarjetas para repasar
