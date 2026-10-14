# Spec Delta

## Purpose

Guarda en el repositorio el texto normativo oficial de cada norma enlazada y su índice de artículos, para verificar automáticamente cada cita del sitio y saber qué parte de cada norma se estudia.

## ADDED Requirements

### Requirement: Copias del texto oficial
El repositorio SHALL guardar, para cada norma enlazada salvo el Decreto Ley 071 de 2020, el texto normativo de sus artículos tal como aparece en la fuente oficial (Secretaría del Senado, normograma DIAN o Función Pública), con la URL y la fecha de consulta. Las copias SHALL excluir notas editoriales, de jurisprudencia y de vigencia, salvo la indicación de que un artículo está derogado o fue modificado.

#### Scenario: Norma copiada
- **WHEN** se abre la copia de la Ley 2586 de 2026
- **THEN** tiene la URL del normograma DIAN, la fecha de consulta y el texto de cada artículo por número

#### Scenario: Sin notas editoriales
- **WHEN** se revisa la copia de un artículo del Estatuto Tributario con notas de jurisprudencia en la fuente
- **THEN** la copia contiene el texto del artículo y no las notas

### Requirement: Citas verificadas contra la copia
Cada regla del registro SHALL indicar la norma y los artículos que cita, y cada fragmento entre comillas de su cita SHALL aparecer literal, sin contar mayúsculas, espacios ni puntuación, en el texto de alguno de esos artículos en la copia oficial. Si no aparece, la verificación SHALL fallar.

#### Scenario: Cita correcta
- **WHEN** se verifica la regla del término para responder el requerimiento especial
- **THEN** "Dentro de los tres (3) meses siguientes, contados a partir de la fecha de notificación del requerimiento especial" aparece en el artículo 707 de la copia del Estatuto Tributario

#### Scenario: Cita alterada
- **WHEN** una cita dice "cuatro (4) meses" y el artículo dice "tres (3) meses"
- **THEN** la verificación falla y nombra la regla y el artículo

### Requirement: Índice de artículos con niveles
Cada norma copiada SHALL tener un índice con todos sus artículos, cada uno con un nivel: 1 (decide casos: términos, competencias, recursos, nulidades, caducidad, prescripción o sanciones), 2 (contexto) o 3 (no se estudia: vigencias, derogatorias o temas ajenos a los empleos de abogado), y un tema corto. Un artículo derogado SHALL tener nivel 3.

#### Scenario: Índice completo
- **WHEN** se compara el índice de una norma con su copia
- **THEN** cada artículo de la copia aparece una vez en el índice con su nivel

#### Scenario: Artículo de nivel 1 sin tarjeta
- **WHEN** un artículo de nivel 1 no tiene tarjetas
- **THEN** el índice registra la razón (por ejemplo, "cubierto por el art. X" o "solo enumera")

### Requirement: Actualización reproducible
Un script SHALL volver a descargar las normas, regenerar las copias y avisar qué artículos cambiaron de texto respecto de la copia guardada, sin modificar el índice ni las reglas.

#### Scenario: Norma modificada en la fuente
- **WHEN** la fuente oficial cambia el texto de un artículo y se corre el script
- **THEN** el script lista ese artículo como cambiado, y la verificación de citas falla si alguna regla citaba el texto anterior
