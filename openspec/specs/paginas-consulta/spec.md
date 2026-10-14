# paginas-consulta Specification

## Purpose

Define cómo se presenta la información de consulta para que cada pantalla responda primero en corto y el detalle se abra solo cuando se pide, sin agregar contenido fuera del dossier.

## Requirements

### Requirement: Bloque Lo esencial
Cada página de consulta (`/prueba`, `/prueba/dia`, `/prueba/practicar`, `/normativa`, `/convocatoria`) SHALL empezar, después del título, con un bloque "Lo esencial" de 3 a 5 viñetas. Cada viñeta SHALL reproducir una frase o cifra del dossier o, cuando una fuente oficial corrige al dossier, de la cita oficial registrada en `fuentes/investigacion-casos.md`, sin datos nuevos.

#### Scenario: Primer pantallazo
- **WHEN** el usuario abre `/prueba` en una pantalla de 360 × 640
- **THEN** ve el título y el bloque Lo esencial sin desplazarse, y ninguna tabla abierta

#### Scenario: Contenido verificable
- **WHEN** se revisa una viñeta de Lo esencial
- **THEN** su dato aparece en `fuentes/contenido-dossier.md` o en una cita oficial de `fuentes/investigacion-casos.md`

### Requirement: Secciones plegables
Todo el contenido de una página de consulta que no esté en Lo esencial SHALL agruparse en secciones plegables, cerradas al cargar. Cada sección SHALL mostrar su título y una línea de resumen aun cerrada. Abrir una sección no SHALL cerrar las demás.

#### Scenario: Abrir dos secciones
- **WHEN** el usuario abre "Empleos para abogados" y luego "Si el cargo es Gestor" en `/convocatoria`
- **THEN** ambas quedan abiertas

#### Scenario: Teclado
- **WHEN** el usuario llega a una sección con Tab y pulsa Enter
- **THEN** la sección se abre y el lector de pantalla anuncia su estado

### Requirement: Advertencias visibles aunque la sección esté cerrada
Si una sección plegable contiene una advertencia del dossier (dato de terceros, inferido, aproximado o no oficial), su encabezado SHALL mostrar una marca de advertencia con su tipo, visible con la sección cerrada. El texto completo de la advertencia SHALL seguir dentro de la sección.

#### Scenario: Dato aproximado
- **WHEN** la sección de estructura de `/prueba` está cerrada
- **THEN** su encabezado muestra la marca "Dato aproximado"

### Requirement: Apertura por ancla
Si la URL trae el ancla de una sección plegable, esa sección SHALL abrirse al cargar, desplazarse a la vista y recibir el foco.

#### Scenario: Enlace a la calificación
- **WHEN** el usuario abre `/prueba#calificacion`
- **THEN** la sección de calificación está abierta, visible y con el foco

### Requirement: Contenido plegado buscable e imprimible
El contenido de las secciones plegadas SHALL estar en el HTML de la página, de modo que la búsqueda lo encuentre, y SHALL imprimirse desplegado.

#### Scenario: Buscar un término plegado
- **WHEN** el usuario busca "Likert"
- **THEN** la búsqueda devuelve `/prueba`, aunque ese texto esté en una sección cerrada

#### Scenario: Imprimir
- **WHEN** el usuario imprime una página de consulta
- **THEN** todas las secciones salen desplegadas

### Requirement: Estructura de La prueba
La prueba SHALL dividirse en tres páginas: `/prueba` (estructura y calificación, con la ponderación por modalidad plegada en la sección `#calificacion`), `/prueba/dia` (horarios, documento, qué llevar, qué no, citación y reclamaciones) y `/prueba/practicar` (cómo resolver un ítem de juicio situacional, comportamentales e integridad, y recursos). `/prueba` SHALL enlazar a las otras dos.

#### Scenario: Logística del día
- **WHEN** el usuario abre `/prueba/dia`
- **THEN** ve en Lo esencial la hora de apertura de puertas, la de inicio y la de cierre de puertas

### Requirement: Recursos con filtro de oficiales
`/prueba/practicar` SHALL listar los recursos con chips "Solo oficiales" y "Todos", con "Solo oficiales" activo al cargar. La advertencia sobre datos desactualizados en blogs SHALL seguir visible en la página.

#### Scenario: Carga inicial
- **WHEN** el usuario abre `/prueba/practicar`
- **THEN** solo ve los recursos oficiales y el número de resultados

#### Scenario: Ver todos
- **WHEN** el usuario toca "Todos"
- **THEN** ve también los recursos no oficiales, cada uno con su advertencia si la tiene

### Requirement: Normativa filtrable por empleo
`/normativa` SHALL mostrar cada área como sección plegable con sus normas y enlaces, y SHALL ofrecer chips por tipo de empleo con "Todos" activo al cargar. Las áreas marcadas para todos los empleos SHALL aparecer con cualquier filtro. El filtro SHALL reflejarse en la URL (`?empleo=`) y SHALL anunciarse el número de áreas visibles.

#### Scenario: Filtrar por empleo
- **WHEN** el usuario toca el chip de un tipo de empleo
- **THEN** solo quedan las áreas de ese empleo y las que aplican a todos, y la URL incluye `?empleo=`

#### Scenario: Enlace compartido con filtro
- **WHEN** el usuario abre `/normativa?empleo=<tipo>`
- **THEN** el chip de ese tipo está activo y el filtro ya está aplicado

#### Scenario: Sin JavaScript
- **WHEN** JavaScript está desactivado
- **THEN** se ven todas las áreas

### Requirement: Convocatoria en secciones
`/convocatoria` SHALL mostrar Lo esencial y luego tres secciones plegables: convocatoria y cronograma, empleos para abogados (`#empleos`) y el cargo de Gestor (`#gestor`).

#### Scenario: Enlace a empleos
- **WHEN** el usuario abre `/convocatoria#empleos`
- **THEN** la sección de empleos para abogados está abierta

### Requirement: Inicio con preguntas de entrada
Inicio SHALL mostrar la cuenta regresiva, la lista "Lo que falta" y cinco tarjetas-pregunta que lleven a: logística del día (`/prueba/dia`), calificación (`/prueba#calificacion`), normativa (`/normativa`), empleos para abogados (`/convocatoria#empleos`) y práctica (`/prueba/practicar`). Toda la tarjeta SHALL ser el enlace.

#### Scenario: Tocar una pregunta
- **WHEN** el usuario toca "¿Cómo se califica y cuánto necesito?"
- **THEN** llega a `/prueba` con la sección de calificación abierta

### Requirement: Inicio el día de la prueba
El 8 de noviembre de 2026 (hora de Colombia), Inicio SHALL mostrar la logística del día como primer bloque, antes de la cuenta regresiva.

#### Scenario: Mañana de la prueba
- **WHEN** el usuario abre Inicio el 8 de noviembre de 2026 a las 6:00 a. m. hora de Colombia
- **THEN** el primer bloque muestra los horarios del día y enlaza a `/prueba/dia`

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
