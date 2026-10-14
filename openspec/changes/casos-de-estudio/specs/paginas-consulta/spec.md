# Spec Delta

## MODIFIED Requirements

### Requirement: Bloque Lo esencial
Cada página de consulta (`/prueba`, `/prueba/dia`, `/prueba/practicar`, `/normativa`, `/convocatoria`) SHALL empezar, después del título, con un bloque "Lo esencial" de 3 a 5 viñetas. Cada viñeta SHALL reproducir una frase o cifra del dossier o, cuando una fuente oficial corrige al dossier, de la cita oficial registrada en `fuentes/investigacion-casos.md`, sin datos nuevos.

#### Scenario: Primer pantallazo
- **WHEN** el usuario abre `/prueba` en una pantalla de 360 × 640
- **THEN** ve el título y el bloque Lo esencial sin desplazarse, y ninguna tabla abierta

#### Scenario: Contenido verificable
- **WHEN** se revisa una viñeta de Lo esencial
- **THEN** su dato aparece en `fuentes/contenido-dossier.md` o en una cita oficial de `fuentes/investigacion-casos.md`

## ADDED Requirements

### Requirement: Duración oficial de la prueba
Todas las páginas que mencionan la duración de la prueba (Inicio, `/prueba`, `/prueba/dia`) SHALL decir cinco (5) horas, de 8:00 a. m. a 1:00 p. m., citando la guía oficial de la prueba 2676 (p. 23). Ninguna página SHALL decir que la prueba dura 4 horas.

#### Scenario: Día de la prueba
- **WHEN** el usuario abre `/prueba/dia`
- **THEN** Lo esencial dice que hay cinco (5) horas y que la sesión termina a la 1:00 p. m.

#### Scenario: Sin rastro de 4 horas
- **WHEN** se busca "4 horas" en el sitio construido
- **THEN** no aparece como duración de la prueba

### Requirement: Vigencia de la norma aduanera
Donde Normativa, el Plan del Caso D o la sección del cargo de Gestor citan el Decreto Ley 920 de 2023, el sitio SHALL agregar la Ley 2586 de 2026 y un aviso con la marca "Vigencia" que explique que el Decreto Ley 920 fue derogado por el artículo 114 de la Ley 2586 de 2026 (19 de junio de 2026) y que la prueba solo incluye normas expedidas antes de esa fecha.

#### Scenario: Normativa aduanera
- **WHEN** el usuario abre el área Aduanero en `/normativa`
- **THEN** ve el Decreto Ley 920 de 2023 y la Ley 2586 de 2026, con el aviso de vigencia
