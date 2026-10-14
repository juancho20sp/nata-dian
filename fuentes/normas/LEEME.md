# Copias del texto oficial de las normas

Esta carpeta guarda el **texto normativo** de las normas que enlaza el sitio, un archivo JSON por norma (`<id>.json`), para verificar automáticamente que cada cita del sitio aparece literal en el artículo que dice citar (`tests/textos-oficiales.test.ts`).

## Por qué se pueden guardar

La Ley 23 de 1982, art. 41, dice: "Es permitido a todos reproducir la Constitución, Leyes, Decretos, ordenanzas, acuerdos, reglamentos, demás actos administrativos y decisiones judiciales, bajo la obligación de conformarse puntualmente con la edición oficial, siempre y cuando no esté prohibido." ([normograma DIAN, Ley 23 de 1982](https://normograma.dian.gov.co/dian/compilacion/docs/ley_0023_1982.htm), consultado el 14-oct-2026).

Por eso:

- Se copia **solo el texto de cada artículo**, tal como aparece en la fuente oficial.
- **No** se copian las notas editoriales de las compilaciones (jurisprudencia, concordancias, notas de vigencia, doctrina, legislación anterior), que no son parte de la norma. De esas notas solo se conserva, en el campo `estado`, si el artículo entero salió del ordenamiento (`derogado`: derogado o declarado inexequible) o si cambió él o alguna de sus partes (`modificado`).

## Formato

```json
{
  "id": "ley-2586-2026",
  "titulo": "Ley 2586 de 2026",
  "fuentes": ["https://normograma.dian.gov.co/dian/compilacion/docs/ley_2586_2026.htm"],
  "consultado": "2026-10-14",
  "articulos": [{ "numero": "45", "texto": "…", "estado": "vigente" }]
}
```

## Actualizar

`python3 scripts/descargar-normas.py` vuelve a descargar las normas, regenera las copias y lista los artículos cuyo texto cambió. Si una cita deja de aparecer, `pnpm test` falla y nombra la regla.

## Alcance

- **Estatuto Tributario:** Libro V (procedimiento) completo y los artículos de otros libros que citan los planes (365 a 368 y 420).
- Las demás normas enlazadas, completas: CPACA, Ley 1952 de 2019, Ley 2220 de 2022, Ley 2010 de 2019, Ley 1116 de 2006, Ley 1609 de 2013, Decreto 1165 de 2019, Decreto Ley 920 de 2023, Ley 2586 de 2026, Decreto Ley 2245 de 2011 y Decreto Ley 927 de 2023 (este último, del normograma DIAN, porque la página de Función Pública no responde a descargas automáticas).
- El Decreto Ley 071 de 2020 no se copia: está derogado.
