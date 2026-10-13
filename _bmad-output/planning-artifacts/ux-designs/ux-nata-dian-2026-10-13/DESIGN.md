---
name: Estudio DIAN 2676
description: Sitio de consulta no oficial para la prueba escrita DIAN 2676. Sobrio, institucional, de lectura en el celular. Menos por pantalla, más por toque.
status: final
updated: 2026-10-13
colors:
  fondo: '#f6f7f9'
  superficie: '#ffffff'
  superficie-2: '#eef1f5'
  texto: '#1a2230'
  texto-suave: '#4a5565'
  borde: '#cfd6df'
  primario: '#1d4e89'
  primario-texto: '#ffffff'
  primario-suave: '#e3ecf7'
  aviso-fondo: '#fff6e0'
  aviso-borde: '#c98a00'
  aviso-texto: '#5c3d00'
  exito: '#1f6b3a'
  resalte: '#fff1b8'
  fondo-dark: '#10151c'
  superficie-dark: '#18202a'
  superficie-2-dark: '#212b37'
  texto-dark: '#e7eaef'
  texto-suave-dark: '#aab4c2'
  borde-dark: '#33404f'
  primario-dark: '#8fb8f0'
  primario-texto-dark: '#0d1520'
  primario-suave-dark: '#1c2c42'
  aviso-fondo-dark: '#2e2510'
  aviso-borde-dark: '#d9a227'
  aviso-texto-dark: '#f5dfa8'
  exito-dark: '#7fd39b'
  resalte-dark: '#3a3214'
typography:
  titulo-pagina:
    fontFamily: system-ui
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  titulo-seccion:
    fontFamily: system-ui
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.3'
  cuerpo:
    fontFamily: system-ui
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.6'
  etiqueta:
    fontFamily: system-ui
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.03em
  dato-grande:
    fontFamily: system-ui
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
rounded:
  sm: 8px
  md: 12px
  full: 9999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '6': 24px
  '8': 32px
  '12': 48px
  margen-movil: 16px
  ancho-lectura: 42rem
components:
  lo-esencial:
    background: '{colors.primario-suave}'
    foreground: '{colors.texto}'
    radius: '{rounded.md}'
    padding: '{spacing.4}'
  seccion-plegable:
    background: '{colors.superficie}'
    border: '1px solid {colors.borde}'
    radius: '{rounded.md}'
  tarjeta-pregunta:
    background: '{colors.superficie}'
    foreground: '{colors.primario}'
    border: '1px solid {colors.borde}'
    radius: '{rounded.md}'
  aviso:
    background: '{colors.aviso-fondo}'
    foreground: '{colors.aviso-texto}'
    border-left: '4px solid {colors.aviso-borde}'
    radius: '{rounded.sm}'
  barra-inferior:
    background: '{colors.superficie}'
    foreground: '{colors.texto-suave}'
    active: '{colors.primario}'
  boton-primario:
    background: '{colors.primario}'
    foreground: '{colors.primario-texto}'
    radius: '{rounded.sm}'
  chip-filtro:
    background: '{colors.superficie-2}'
    active: '{colors.primario}'
    radius: '{rounded.full}'
---

## Brand & Style

Un cuaderno de consulta, no un portal. Quien lo abre es un abogado que ya sabe leer normas y necesita saber **dónde está lo que importa** para un examen de procedimiento que no es su especialidad. Cada pantalla responde una pregunta y la responde primero en corto; el detalle existe, pero se pide.

Se conserva la identidad actual: sobria, institucional, azul y gris, sin logos ni marcas de la DIAN o la CNSC. [ASSUMPTION] El cambio no es de identidad sino de **densidad y jerarquía**: menos bordes, menos tarjetas apiladas, más aire y un único bloque destacado por pantalla.

## Colors

La paleta no cambia; cambia cuánto se usa.

- **Primario (`#1d4e89` / `#8fb8f0` oscuro)**: enlaces, la acción principal de la pantalla y el estado activo de la navegación. Nunca como relleno decorativo.
- **Primario suave (`#e3ecf7` / `#1c2c42`)**: fondo exclusivo del bloque {components.lo-esencial}. Si aparece en otro lugar, deja de señalar "esto es lo que hay que saber".
- **Aviso (`#fff6e0`, borde `#c98a00`)**: advertencias del dossier (datos de terceros, inferidos, aproximados; SIMO prevalece). Un aviso por pantalla como máximo; si hay varios, se agrupan.
- **Éxito (`#1f6b3a` / `#7fd39b`)**: solo progreso del plan (casillas y barra).
- **Superficie y borde**: estructura. Los bordes se reservan para lo que se toca (secciones plegables, tarjetas-pregunta, filtros); el texto corrido va sin caja.

Contraste AA ya verificado sobre `fondo` y `superficie` en ambos modos.

## Typography

Fuente del sistema, cuerpo a 17 px con interlineado 1,6 y ancho de línea limitado a {spacing.ancho-lectura}. Tres niveles visibles por pantalla como máximo: {typography.titulo-pagina}, {typography.titulo-seccion} y {typography.cuerpo}. {typography.etiqueta} en versalitas solo para metadatos ("Semana 2 de 4", "Oficial"). {typography.dato-grande} solo para cifras clave (días que faltan, 70/100).

## Layout & Spacing

Una columna en móvil con margen de {spacing.margen-movil}; a partir de 1024 px la columna de lectura se centra y no pasa de {spacing.ancho-lectura}. Entre secciones, {spacing.8}; dentro de una sección, {spacing.3}–{spacing.4}.

**Regla del primer pantallazo (360 × 640):** título, {components.lo-esencial} y, como mucho, una acción. Todo lo demás empieza abajo o plegado.

## Elevation & Depth

Sin sombras salvo en el diálogo de búsqueda y la barra inferior fija. La jerarquía sale del tamaño de letra y del bloque {components.lo-esencial}, no de capas.

## Shapes

{rounded.sm} para botones y avisos, {rounded.md} para bloques y tarjetas, {rounded.full} solo para chips de filtro.

## Components

- **Lo esencial**: bloque de 3 a 5 viñetas cortas que resume la pantalla. Fondo {colors.primario-suave}, sin borde. Uno por pantalla, siempre arriba.
- **Sección plegable**: `details/summary` con título {typography.titulo-seccion} y una línea de resumen en {colors.texto-suave} visible aun cerrada. Chevron a la derecha.
- **Tarjeta-pregunta**: enlace a una consulta frecuente, redactado como pregunta ("¿Qué llevo el día de la prueba?"). Pregunta en {colors.primario}, una línea de respuesta corta debajo.
- **Aviso**: borde izquierdo {colors.aviso-borde}. Una frase visible; el detalle, plegado.
- **Barra inferior** (móvil): 5 destinos con icono y etiqueta; activo en {colors.primario}. En escritorio pasa a la barra superior.
- **Chip de filtro**: reemplaza los `select` de Normativa y el checkbox de Recursos.
- **Tabla**: se mantiene la conversión a tarjetas en móvil; nunca más de una tabla abierta por pantalla.

## Do's and Don'ts

| Hacer | No hacer |
|---|---|
| Un bloque {components.lo-esencial} por pantalla | Apilar tarjetas con borde para todo |
| Secciones plegadas con resumen de una línea | Dejar abiertas varias tablas largas a la vez |
| Un aviso agrupado por pantalla | Repetir la misma advertencia en cada sección |
| Redactar accesos como preguntas | Nombres de sección institucionales sin pista del contenido |
| Mantener el estilo sobrio actual | Logos, marcas o colores de la DIAN o la CNSC |
