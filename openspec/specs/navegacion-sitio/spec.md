# navegacion-sitio Specification

## Purpose

Define cómo se llega a cada parte del sitio: los cinco destinos principales, la búsqueda, el pie y qué pasa con las rutas anteriores al rediseño.

## Requirements

### Requirement: Cinco destinos principales
El sitio SHALL ofrecer exactamente cinco destinos principales, en este orden: Inicio (`/`), La prueba (`/prueba`), Normativa (`/normativa`), Convocatoria (`/convocatoria`) y Mi plan (`/plan`). Ninguna otra página SHALL aparecer en la navegación principal.

#### Scenario: Destinos visibles
- **WHEN** el usuario abre cualquier página
- **THEN** la navegación principal muestra Inicio, La prueba, Normativa, Convocatoria y Mi plan, y no muestra Hoy, Recursos ni Fuentes

### Requirement: Destino activo
La navegación SHALL marcar como activo el destino al que pertenece la página actual, con `aria-current="page"`. Las subpáginas pertenecen a su destino: `/prueba/*` a La prueba; `/plan`, `/plan/*` y `/planes/*` a Mi plan.

#### Scenario: Subpágina de La prueba
- **WHEN** el usuario está en `/prueba/dia`
- **THEN** La prueba aparece activo en la navegación

#### Scenario: Página de un plan
- **WHEN** el usuario está en `/planes/caso-b-cobranzas`
- **THEN** Mi plan aparece activo en la navegación

### Requirement: Barra inferior en móvil
Por debajo de 1024 px de ancho, los cinco destinos SHALL mostrarse en una barra fija en la parte inferior, con icono y etiqueta, y objetivos táctiles de al menos 44 px. La barra superior SHALL conservar solo el nombre del sitio, la búsqueda y el cambio de tema. El contenido no SHALL quedar tapado por la barra.

#### Scenario: Celular de 360 px
- **WHEN** el usuario abre el sitio en una pantalla de 360 px de ancho
- **THEN** ve los cinco destinos en la barra inferior, sin desplazamiento horizontal, y el último elemento de la página queda visible por encima de la barra

#### Scenario: Escritorio
- **WHEN** el ancho es de 1024 px o más
- **THEN** no hay barra inferior y los cinco destinos están en la barra superior

### Requirement: Búsqueda siempre disponible
La búsqueda SHALL estar disponible desde la barra superior en todas las páginas y en todos los anchos.

#### Scenario: Buscar desde el celular
- **WHEN** el usuario toca el botón de búsqueda en una pantalla de 360 px
- **THEN** se abre el diálogo de búsqueda

### Requirement: Fuentes en el pie
El pie de todas las páginas SHALL enlazar a `/fuentes` y conservar la leyenda de actualización, la aclaración de sitio no oficial y la nota de que SIMO y el Acuerdo 21 prevalecen.

#### Scenario: Llegar a Fuentes
- **WHEN** el usuario baja al pie de cualquier página
- **THEN** encuentra el enlace a Fuentes y la nota de que SIMO y el Acuerdo 21 prevalecen

### Requirement: Redirección de rutas anteriores
Las rutas anteriores SHALL redirigir a su nueva ubicación: `/hoy` a `/plan`, `/planes` a `/plan/elegir` y `/recursos` a `/prueba/practicar`. Cada redirección SHALL funcionar sin JavaScript, SHALL incluir un enlace visible al destino y SHALL quedar fuera del índice de búsqueda.

#### Scenario: Enlace guardado a Hoy
- **WHEN** el usuario abre `/hoy`
- **THEN** llega a `/plan`

#### Scenario: Redirección sin JavaScript
- **WHEN** el usuario abre `/recursos` con JavaScript desactivado
- **THEN** llega a `/prueba/practicar`
