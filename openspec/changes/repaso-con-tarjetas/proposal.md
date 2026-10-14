# Proposal

## Why

El sitio sirve para consultar, pero no para fijar lo consultado. Quedan menos de cuatro semanas para la prueba, y un abogado que viene de propiedad intelectual tiene que memorizar qué norma regula cada tema y los datos del examen. La práctica de recuperación (tarjetas con repetición espaciada) y un quiz con el formato A/B/C de la prueba son la forma más eficiente de hacerlo en ratos cortos. El usuario pidió además una meta diaria y una racha para sostener el hábito. La especificación de UX está actualizada en `_bmad-output/planning-artifacts/ux-designs/ux-nata-dian-2026-10-13/`.

## What Changes

- Nuevo destino **Repasar** (`/repasar`), sexto de la navegación. La barra pasa a etiquetas cortas: Inicio, Prueba, Normas, Concurso, Repasar, Mi plan.
- **Tarjetas del dossier** en mazos (La prueba, Tronco común, Procedimiento tributario, Cobro, Aduanero y cambiario, Contexto). El reverso es siempre un fragmento literal del dossier, comprobado por una prueba automática.
- **Mis tarjetas:** el usuario crea, edita y borra tarjetas propias, guardadas solo en su navegador.
- **Repetición espaciada** (cajas Leitner 1 a 5, intervalos de 1, 2, 4, 7 y 14 días, y repaso final del 5 al 7 de noviembre).
- **Quiz de normas:** 10 preguntas con tres opciones (A, B, C) cuyas opciones incorrectas salen de otras tarjetas del mismo mazo; las falladas vuelven a la caja 1.
- **Meta diaria** de 10, 20 o 30 respuestas (por defecto 20) y **racha indulgente** (un día sin cumplir por semana no la rompe), con fechas de Colombia.
- **Inicio** muestra una línea con las tarjetas que tocan hoy y la racha.
- Revierte el antipatrón "sin gamificación" de la especificación de UX, a pedido del usuario. Siguen fuera las insignias, los puntos y el confeti.

## Capabilities

### New Capabilities
- `repaso-tarjetas`: mazos de tarjetas del dossier y propias, sesión de repaso y repetición espaciada.
- `repaso-quiz`: quiz de normas de tres opciones y su efecto en las tarjetas.
- `repaso-meta-racha`: meta diaria, racha indulgente y su resumen en Repasar y en Inicio.

### Modified Capabilities
- `navegacion-sitio`: pasa de cinco a seis destinos (se agrega Repasar), con etiquetas cortas en la barra; Repasar se marca activo en sus subpáginas.

## Impact

- **Datos:** nueva colección `tarjetas` (`src/content/tarjetas.json`) con esquema Zod; prueba que compara cada reverso con el dossier.
- **Lógica pura nueva en `src/lib/`:** repetición espaciada, armado del quiz, meta y racha, almacenamiento de tarjetas propias; todas con pruebas Vitest.
- **Páginas nuevas:** `src/pages/repasar/index.astro`, `tarjetas.astro`, `quiz.astro` y `mis-tarjetas.astro`.
- **Cambios:** `src/lib/destinos.ts` y `BarraInferior.astro` (6 destinos, etiquetas cortas), `src/pages/index.astro` (línea de repaso), `src/lib/almacen.ts` (claves nuevas), README.
- **localStorage:** claves nuevas para estado de tarjetas, tarjetas propias, meta y días cumplidos. No cambian las claves existentes.
- Sin dependencias nuevas.
