# repaso-tarjetas Specification

## Purpose

Permite fijar en la memoria lo que se consulta en el sitio mediante tarjetas de pregunta y respuesta, sacadas del dossier o escritas por el usuario, que vuelven con más o menos frecuencia según se recuerden.

## Requirements

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

### Requirement: Tarjetas propias
El usuario SHALL poder crear, editar y borrar tarjetas propias (frente y reverso en texto plano) en `/repasar/mis-tarjetas`. Se guardan solo en su navegador, forman el mazo "Mis tarjetas" y siguen la misma repetición espaciada. Borrar SHALL pedir confirmación.

#### Scenario: Crear una tarjeta
- **WHEN** el usuario guarda una tarjeta con frente y reverso
- **THEN** aparece en Mis tarjetas y toca repasarla hoy

#### Scenario: Campos vacíos
- **WHEN** el usuario intenta guardar sin frente o sin reverso
- **THEN** no se guarda y se indica qué campo falta

#### Scenario: Recargar
- **WHEN** el usuario recarga la página después de crear una tarjeta
- **THEN** la tarjeta sigue ahí

### Requirement: Sesión de tarjetas
En `/repasar/tarjetas` el sistema SHALL mostrar, una a una, las tarjetas que tocan hoy (o las de un mazo elegido). Cada tarjeta muestra primero el frente; tocarla, Espacio o Enter muestra el reverso. Con el reverso visible, el usuario responde "No la sabía" o "La sabía" (también con las teclas 1 y 2).

#### Scenario: Voltear y responder
- **WHEN** el usuario voltea una tarjeta y toca "La sabía"
- **THEN** pasa a la siguiente tarjeta y el contador de la sesión avanza

#### Scenario: Nada para hoy
- **WHEN** no hay tarjetas que toquen hoy
- **THEN** la página dice "No hay tarjetas para hoy." y ofrece repasar un mazo o hacer un quiz

#### Scenario: Lector de pantalla
- **WHEN** el usuario voltea una tarjeta con un lector de pantalla
- **THEN** se anuncia el texto del reverso

### Requirement: Repetición espaciada
Cada tarjeta SHALL estar en una caja de 1 a 5. "La sabía" la sube una caja (máximo 5); "No la sabía" la devuelve a la caja 1. La próxima fecha de repaso es la fecha de hoy en Colombia más 1, 2, 4, 7 o 14 días según la caja de llegada. Una tarjeta sin historial está en la caja 1 y toca hoy.

#### Scenario: Acierto
- **WHEN** el 20 de octubre de 2026 el usuario acierta una tarjeta de la caja 2
- **THEN** la tarjeta pasa a la caja 3 y vuelve el 24 de octubre

#### Scenario: Fallo
- **WHEN** el usuario falla una tarjeta de la caja 4
- **THEN** la tarjeta pasa a la caja 1 y vuelve al día siguiente

#### Scenario: Fecha de Colombia
- **WHEN** el usuario responde a las 11:30 p. m. del 20 de octubre en Colombia
- **THEN** el cálculo usa el 20 de octubre, aunque en UTC ya sea 21

### Requirement: Repaso final antes de la prueba
Ninguna próxima fecha de repaso SHALL caer después del 7 de noviembre de 2026: si el intervalo la pasaría de esa fecha, la tarjeta vuelve el 5 de noviembre (o hoy, si hoy es posterior al 5 de noviembre).

#### Scenario: Intervalo largo cerca de la prueba
- **WHEN** el 30 de octubre el usuario acierta una tarjeta de la caja 4 (intervalo de 14 días)
- **THEN** la tarjeta vuelve el 5 de noviembre

### Requirement: Dominio por mazo
`/repasar` SHALL mostrar cada mazo con su número de tarjetas, cuántas tocan hoy y cuántas están dominadas (caja 5).

#### Scenario: Resumen de mazos
- **WHEN** el usuario abre `/repasar`
- **THEN** ve cada mazo con tarjetas totales, para hoy y dominadas

### Requirement: Avance guardado sin romper
El estado de las tarjetas SHALL guardarse en el navegador sin afectar las claves existentes del sitio. Si el almacenamiento falla, el repaso SHALL funcionar durante la sesión y mostrar "Este navegador no guarda el avance." El estado de tarjetas que ya no existen SHALL ignorarse.

#### Scenario: Almacenamiento bloqueado
- **WHEN** el navegador bloquea localStorage
- **THEN** el usuario puede repasar y ve el aviso de que el avance no se guarda

#### Scenario: Sin JavaScript
- **WHEN** JavaScript está desactivado
- **THEN** `/repasar` explica que el repaso necesita JavaScript y enlaza a las páginas de consulta
