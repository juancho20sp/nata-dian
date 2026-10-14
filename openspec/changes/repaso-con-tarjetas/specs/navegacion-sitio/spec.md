# Spec Delta

## RENAMED Requirements

- FROM: `### Requirement: Cinco destinos principales`
- TO: `### Requirement: Destinos principales`

## MODIFIED Requirements

### Requirement: Destinos principales
El sitio SHALL ofrecer exactamente seis destinos principales, en este orden: Inicio (`/`), La prueba (`/prueba`), Normativa (`/normativa`), Convocatoria (`/convocatoria`), Repasar (`/repasar`) y Mi plan (`/plan`). Ninguna otra página SHALL aparecer en la navegación principal.

#### Scenario: Destinos visibles
- **WHEN** el usuario abre cualquier página
- **THEN** la navegación principal muestra Inicio, La prueba, Normativa, Convocatoria, Repasar y Mi plan, y no muestra Hoy, Recursos ni Fuentes

### Requirement: Destino activo
La navegación SHALL marcar como activo el destino al que pertenece la página actual, con `aria-current="page"`. Las subpáginas pertenecen a su destino: `/prueba/*` a La prueba; `/repasar` y `/repasar/*` a Repasar; `/plan`, `/plan/*` y `/planes/*` a Mi plan.

#### Scenario: Subpágina de La prueba
- **WHEN** el usuario está en `/prueba/dia`
- **THEN** La prueba aparece activo en la navegación

#### Scenario: Página de un plan
- **WHEN** el usuario está en `/planes/caso-b-cobranzas`
- **THEN** Mi plan aparece activo en la navegación

#### Scenario: Subpágina de Repasar
- **WHEN** el usuario está en `/repasar/quiz`
- **THEN** Repasar aparece activo en la navegación

### Requirement: Barra inferior en móvil
Por debajo de 1024 px de ancho, los seis destinos SHALL mostrarse en una barra fija en la parte inferior, con icono y etiqueta corta (Inicio, Prueba, Normas, Concurso, Repasar, Mi plan), en una sola línea y con objetivos táctiles de al menos 44 px. La barra superior SHALL conservar solo el nombre del sitio, la búsqueda y el cambio de tema. El contenido no SHALL quedar tapado por la barra.

#### Scenario: Celular de 360 px
- **WHEN** el usuario abre el sitio en una pantalla de 360 px de ancho
- **THEN** ve los seis destinos en la barra inferior con su etiqueta en una línea sin cortes, sin desplazamiento horizontal, y el último elemento de la página queda visible por encima de la barra

#### Scenario: Escritorio
- **WHEN** el ancho es de 1024 px o más
- **THEN** no hay barra inferior y los seis destinos están en la barra superior con sus nombres completos
