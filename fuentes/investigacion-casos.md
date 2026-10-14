# Investigación: formato de exámenes DIAN y sustancia de los cuatro casos

- **Fecha de corte:** 2026-10-13.
- **Para qué sirve:** insumo para tarjetas y casos de práctica sobre la sustancia de los casos A a D y del tronco común. Complementa `contenido-dossier.md`, que no se modificó.
- **Método:** se descargaron y leyeron las Guías de Orientación al Aspirante (GOA) oficiales de la CNSC de los procesos DIAN 1461 de 2020, DIAN 2022, DIAN 2667 y DIAN 2676. Las de 2020 y 2022 se tomaron de copias del Internet Archive, porque `historico.cnsc.gov.co` ya no resuelve. Cada regla se verificó contra el texto vigente en la Secretaría del Senado (base documental actualizada al 30 de septiembre de 2026) o en la Compilación Jurídica (normograma) de la DIAN. Las citas son textuales y cortas.
- **Páginas:** las de la GOA 2676 son las impresas en el documento (desde la p. 19 van una por detrás de la numeración del PDF); las demás coinciden con el PDF.
- **Escala de confianza:** **Verificado** (se leyó el texto primario), **Secundario** (solo hay fuente de terceros), **No verificado**.

**Limitaciones**

- Los indicadores temáticos de cada empleo de DIAN 2676 (portal Areandina `dian-2676-areandina.com.co/indicadores-dian-2667/`) exigen número de inscripción, así que no se pudieron consultar. Tampoco abre el portal de indicadores de DIAN 2667 (`dian2667-areandina.co` no resuelve).
- `historico.cnsc.gov.co` no resuelve. Los documentos de 2020 y 2022 vienen de copias del Wayback Machine, que son copias fieles de los PDF oficiales.
- Los certificados TLS de cnsc.gov.co no validan con la cadena local. Los PDF se descargaron sin verificar el certificado; son documentos públicos de solo lectura.
- Las notas de vigencia y de jurisprudencia del Senado y del normograma se cargan de forma dinámica. Por eso no se identificó qué sentencia condicionó el artículo 131 de la Ley 2010 de 2019.
- No se leyó directamente la sentencia C-072 de 2025 ni el texto completo del Decreto 1165 de 2019 con todas sus modificaciones. Solo se leyeron los artículos citados.
- No se buscaron ítems reales filtrados, que son confidenciales, ni se copiaron bancos de preguntas de academias.

---

## Alertas antes de hacer tarjetas

1. **Decreto Ley 920 de 2023 ya no rige.** El normograma DIAN lo marca así: "Ley derogada por el artículo 114 de la Ley 2586 de 2026" y "Decreto Ley INEXEQUIBLE, por consecuencia, con efectos diferidos hasta el 20 de junio de 2026, Sentencia C-072-25". La **Ley 2586 de 2026** (19 de junio de 2026, Diario Oficial 53.527) adopta el nuevo régimen sancionatorio y de decomiso aduanero ([normograma DIAN, Ley 2586](https://normograma.dian.gov.co/dian/compilacion/docs/ley_2586_2026.htm), art. 114). **Verificado.**
   - La GOA 2676 dice que solo entran normas "vigentes y [que] fueron expedidas antes del 19 de junio de 2026" (GOA 2676, p. 11). La Ley 2586 se expidió el **mismo** 19 de junio, así que en sentido literal no es "anterior". Es posible que el examen se haya construido sobre el DL 920. Esto es una inferencia y no está confirmado.
   - **Consecuencia práctica:** los términos procesales que más se preguntan (objeción a la aprehensión, respuesta al requerimiento especial aduanero, decisión de fondo, reconsideración, silencio positivo, caducidad) son **idénticos** en ambas normas. Las tarjetas deben enseñar el término y citar las dos normas.
2. **Duración de la prueba.** La GOA oficial 2676 dice: "El aspirante dispondrá de cinco (5) horas para responder las pruebas escritas, es decir, la sesión terminará a la 1:00 p.m." (GOA 2676, p. 23). El dossier dice 4 horas, pero de 8:00 a. m. a 1:00 p. m. son 5. **Verificado.**
3. **Estructura del ítem en 2676:** "Por cada caso habrá un enunciado con sus respectivas opciones de respuesta" (GOA 2676, p. 12). Antes era distinto: en 1461 eran de 3 a 5 preguntas por caso y en 2667, tres enunciados por caso. Las tarjetas de práctica para 2676 deberían ser **caso corto, una pregunta y tres opciones**. **Verificado.**
4. **Segunda verificación (13-oct-2026, al construir las tarjetas).** Se volvieron a descargar los textos oficiales y se buscó la cita literal de una muestra de reglas por caso. Coincidieron las 16, sin diferencias:
   - En la primera revisión: ET 705, 707, 720, 732 y 734 (Senado).
   - En la segunda: ET 710 y 714 (caso A); ET 817 y 830 (caso B); CPACA 164 y Ley 2220 art. 90 (caso C); Ley 2586 art. 47 y DL 920 art. 90 (decomiso), y Ley 2586, objeción a la aprehensión (caso D); CPACA 14 y 76 (tronco común). Fuentes: Senado y normograma DIAN.

5. **Tercera verificación (14-oct-2026, contra copias completas del texto oficial).** Al guardar copias de las normas en `fuentes/normas/` y comparar cada cita de forma automática:
   - **Error de transcripción corregido:** CPACA art. 76 dice que la apelación "cuando proceda será obligatorio para acceder a la jurisdicción" (concuerda con *recurso*); la tabla de abajo decía "obligatoria". El sitio usa ya el texto exacto.
   - **Paráfrasis reemplazadas:** 17 filas resumían la norma sin cita literal (sanciones del ET 641-648, gradualidad 640, excepciones 831, ejecutoria 829, facilidades 814, inembargabilidad 837-1, per saltum 720 par., nulidad CPACA 137, firmeza CPACA 87, sanciones Ley 1952 art. 48, pruebas en el decomiso Ley 2586 art. 46, entre otras). En el sitio se reemplazaron por citas literales del artículo.
   - **Notas editoriales dentro de citas:** "CONDICIONALMENTE exequible" (Ley 2010 art. 131) y "<2024, 2025, 2026>" (ET 689-3) son anotaciones de la compilación, no texto de la norma; se quitaron de las citas.

---

## 1. Formato de los exámenes anteriores y ejemplos oficiales

### 1.1 Documentos oficiales encontrados

| Proceso | Documento | Operador | Fecha de prueba | URL |
|---|---|---|---|---|
| DIAN 1461 de 2020 | GOA presentación pruebas escritas; Bibliografía general sobre dominios temáticos | UT Mérito y Oportunidad DIAN 2020 (Areandina + U. Sergio Arboleda) | 5 de julio de 2021 | [GOA 1461 (archivo)](https://web.archive.org/web/20210803002125/https://www.cnsc.gov.co/index.php/1461-de-2020-dian-guias?download=43432:goa-presentacion-pruebas-escritas-dian), [Bibliografía 1461 (archivo)](https://web.archive.org/web/20210625102643/https://www.cnsc.gov.co/index.php/1461-de-2020-dian-guias?download=43434:bibliografia-general) |
| DIAN 2022 (Acuerdo 08 de 2022, mod. Acuerdo 24 de 2023) | GOA pruebas escritas; Anexo bibliografía sugerida | Areandina | 17 de septiembre de 2023 | [GOA 2022 (archivo)](https://web.archive.org/web/20231223105916/https://historico.cnsc.gov.co/index.php/dian-2022-guias?download=62977%3Aguia-de-orientacion-al-aspirante-presentacion-de-pruebas-escritas), [Bibliografía 2022 (archivo)](https://web.archive.org/web/20231223105923/https://historico.cnsc.gov.co/index.php/dian-2022-guias?download=62994%3Aanexo-bibliografia-sugerida-dian2022), [aviso CNSC](https://www.cnsc.gov.co/node/21312) |
| DIAN 2667 (Acuerdo 205 de 2024) | GOA aplicación y acceso a pruebas escritas | Areandina (contrato 436 de 2025) | 17 de agosto de 2025 | [GOA 2667](https://www.cnsc.gov.co/sites/default/files/2025-07/goa_aplicacion-y-acceso-pruebas-escritas-dian-2667.pdf) |
| **DIAN 2676** (Acuerdo 21 de 2025) | **GOA presentación pruebas escritas** (publicada el 8 de octubre de 2026) | Areandina | 8 de noviembre de 2026 | [GOA 2676](https://www.cnsc.gov.co/sites/default/files/2026-10/dian-2676_guia_orientacion_aspirante_presentacion-pruebas-escritas_0.pdf), [aviso de publicación](https://www.cnsc.gov.co/node/69407), [pestaña Guías](https://www.cnsc.gov.co/convocatorias/dian-2676?field_tipo_de_contenido_convocat_target_id=1410) |

### 1.2 Estructura del ítem funcional (juicio situacional)

| Elemento | DIAN 1461 (2020) | DIAN 2022 | DIAN 2667 | DIAN 2676 |
|---|---|---|---|---|
| Partes | Caso, enunciado, 3 opciones | Caso, enunciado, 3 opciones | Caso, enunciado, 3 opciones | Caso, enunciado, 3 opciones |
| Ítems por caso | "de cada Caso se pueden realizar de 3 a 5 preguntas" (p. 4) | Un caso y un enunciado (p. 6) | "Por cada caso, se plantean tres enunciados" (p. 11) | "Por cada caso habrá un enunciado" (p. 12) |
| Clave | Una sola correcta | Una sola correcta | Una sola correcta | "solamente una (1) es la correcta y es la única que presenta una solución efectiva" (p. 12) |
| N.º de ítems profesional | No publicado | No publicado | Funcional 66, comportamental 66, integridad 20; total 152 (p. 15) | No publicado en el texto de la GOA |
| Tiempo | 5 horas (p. 19) | 5 horas | 5 horas (p. 23) | 5 horas (p. 23) |

Todo lo de esta tabla está **Verificado** en las GOA citadas.

**Cómo define la GOA 2676 las opciones:** "Son las alternativas de acción, de las cuales el aspirante debe decidirse por aquella que considere correcta o que se ajuste mejor a la conducta que seguirá como funcionario de carrera administrativa" (GOA 2676, p. 12). El enunciado termina con frases como "al profesional le corresponde" y cada opción empieza con un verbo en infinitivo y minúscula ("aplicar…", "consultar…", "revisar…"). Así deberían redactarse las tarjetas.

### 1.3 Ítems de ejemplo publicados oficialmente (citas cortas)

**DIAN 2676, Ejemplo 1, Nivel Profesional** ([GOA 2676](https://www.cnsc.gov.co/sites/default/files/2026-10/dian-2676_guia_orientacion_aspirante_presentacion-pruebas-escritas_0.pdf), pp. 12-13). Tema: talento humano y MIPG, no tributario. **Verificado.**

> Enunciado: "Para diagnosticar el estado de la gestión con base en la información descrita, al profesional le corresponde"
> A. "aplicar la Matriz de Gestión Estratégica del Talento Humano y calificar las variables que la componen." B. "consultar el Plan de Acción de Talento Humano…" C. "revisar el Plan Estratégico de Talento Humano…" **Clave: A.**

La justificación explica por qué cada distractor corresponde a una **etapa posterior** del mismo procedimiento (el plan de acción es la etapa 3, posterior al diagnóstico). Ese es el patrón de trampa: opciones válidas pero fuera de secuencia.

**DIAN 2667, ejemplo funcional** ([GOA 2667](https://www.cnsc.gov.co/sites/default/files/2025-07/goa_aplicacion-y-acceso-pruebas-escritas-dian-2667.pdf), pp. 11-13). **Verificado.**

> "Un ciudadano entrega una petición anónima dirigida a un servidor público específico de la entidad; al funcionario que lo recepciona, en primera instancia le corresponde" A. "radicar el documento en la oficina de su competencia para dar respuesta a la solicitud." **Clave: A.**

El sustento citado es el art. 4.2.6 del Acuerdo AGN 001 de 2024 y la Ley 1755 de 2015. Otra vez, los distractores (codificar, numerar) son pasos posteriores.

**DIAN 2022, Ejemplo 2, prueba de competencias funcionales, Nivel profesional, Indicador: fiscalización** ([GOA 2022](https://web.archive.org/web/20231223105916/https://historico.cnsc.gov.co/index.php/dian-2022-guias?download=62977%3Aguia-de-orientacion-al-aspirante-presentacion-de-pruebas-escritas), p. 11). **Verificado.**

> "Un ciudadano colombiano radica la solicitud de calificación al régimen tributario especial para un emprendimiento como empresa unipersonal de asesorías contables… Usted como funcionario revisa los documentos y procede a: a. enviar la resolución con la aprobación b. informar la inadmisión de la solicitud c. devolver el expediente al contribuyente." **Clave: b.**

**DIAN 1461 de 2020, Caso 1, Nivel profesional, Dominio temático: Cobro Coactivo y Persuasivo** ([GOA 1461](https://web.archive.org/web/20210803002125/https://www.cnsc.gov.co/index.php/1461-de-2020-dian-guias?download=43432:goa-presentacion-pruebas-escritas-dian), pp. 8-9). Pese al dominio, el caso trata devoluciones de IVA. **Verificado.**

> Enunciado 1: el funcionario "debe proceder a a. revisar que los bienes se clasifiquen con la calidad de exentos. b. verificar que las mercancías estén en la categoría de excluidas. c. comprobar que los productos estén catalogados como no gravados." **Clave: A** (ET art. 481).

**DIAN 1461, Caso 2, Nivel técnico, Sistema tributario, aduanero y cambiario** (p. 9-10). Inicio de fiscalización: "a. enviar la notificación al correo electrónico autorizado…" **Clave: A** (ET art. 565). En el segundo enunciado, sobre la inspección tributaria, la clave es "mencionar que se solicitará la exhibición de los soportes de contabilidad" (ET art. 684). **Verificado.**

> Nota: en el ejemplo 1461, Enunciado 2 (plazo para pedir devolución de IVA), la justificación oficial cita el art. 477 ET. No se verificó si ese sustento es correcto; no usarlo como fuente de regla.

### 1.4 Calificación

| Regla | Texto citado | Fuente | Confianza |
|---|---|---|---|
| Escala | "escala de cero (0) a cien (100) puntos, con una parte entera y dos (2) decimales truncados" | GOA 2676, p. 21 | Verificado |
| Mínimo eliminatorio | "mínimo aprobatorio de puntuación de 70,00 en las pruebas de Competencias Funcionales" | GOA 2676, p. 22 | Verificado |
| Depuración psicométrica | "Aquellos ítems que no cumplen con esos criterios técnicos no harán parte de la calificación" | GOA 2676, p. 22 | Verificado |
| Omisiones | "Los ítems sin marcar en la hoja de respuestas se consideran 'omisiones' y no serán tenidos en cuenta para la calificación" | GOA 2676, p. 17 | Verificado |
| Doble marca | "No marcar más de una respuesta por ítem, pues le será anulada" | GOA 2676, p. 17 | Verificado |
| Ítems dudosos | Se entrega un "Formato de ítems dudosos" en el salón | GOA 2676, p. 26 (p. 27 del PDF) | Verificado |
| Calificación por OPEC | "La calificación de estas pruebas se realiza por OPEC" | GOA 1461, p. 19; GOA 2022, p. 19 del PDF | Verificado (procesos anteriores) |

Ninguna GOA menciona penalización por respuesta incorrecta. Una omisión simplemente no suma, así que conviene responder todo. Esta conclusión es una inferencia.

---

## 2. Temas que cubrieron los exámenes DIAN anteriores

### 2.1 Fuente oficial: dominios temáticos 2020 e indicadores 2022

El temario por empleo nunca se publica completo; se consulta con el número de inscripción. Lo que sí es público y oficial son las **bibliografías sugeridas**, organizadas por dominio o indicador. Esa lista muestra qué temas existían en el banco de pruebas.

**DIAN 1461 de 2020**, *Bibliografía general sobre dominios temáticos* (47 pp.). Dominios relevantes para un abogado (**Verificado**):

- Cobro coactivo; Cobro coactivo y persuasivo; Cobro persuasivo; Medidas cautelares; Procesos concursales.
- Proceso de fiscalización y liquidación de la DIAN; Procedimiento Tributario; Procedimientos y sanciones en materia tributaria, aduanera y cambiaria; Régimen probatorio; Devolución y compensaciones.
- Procedimiento administrativo y contencioso administrativo; Jurisdicción y proceso contencioso administrativo; Representación extrajudicial y conciliación; Precedente judicial y administrativo; Principio de legalidad y convencionalidad.
- Derecho aduanero; Procedimiento aduanero de competencia de la DIAN; Régimen probatorio y sancionatorio en el control aduanero; Régimen sancionatorio: clases de sanciones y cancelación / suspensión y multa; Contrabando y medición del contrabando; Administración de la custodia y disposición de mercancías.
- Régimen cambiario; Régimen cambiario en las operaciones de cambio de competencia de la DIAN; Control y vigilancia en materia cambiaria (Decreto Ley 2245 de 2011, Res. Externa 1 de 2018, DCIN 83).
- Aplicación del régimen disciplinario servidores públicos; Principios de la ley disciplinaria y elementos de la falta disciplinaria; Régimen penal.

**DIAN 2022**, *Bibliografía sugerida* (33 pp.). Indicadores jurídicos (**Verificado**):

- Derecho administrativo (incluye la Ley 1437 de 2011 y la Ley 1755).
- Derecho aduanero y comercio exterior (Decreto 1165 de 2019, Res. 046 de 2019, Decreto 2245 de 2011).
- Derecho tributario; Generalidades procedimiento tributario; Derecho penal; Derecho contractual; Derecho disciplinario (parte sustantiva).
- Conformación, competencia y funciones de los órganos de control disciplinario.
- Órgano especial defensor del contribuyente y del usuario aduanero (cita el Decreto Ley 920 de 2023).
- Operación logística de mercancías aprehendidas, decomisadas y abandonadas (ADA).
- Generalidades de recepción de declaraciones y recaudo.

La bibliografía 2022 advierte: "la Fundación Universitaria del Área Andina no se encuentra obligada a realizar preguntas textuales de dichos documentos, recalcando que la metodología evalúa la aplicación de conocimientos" (p. 1). **Verificado.**

**DIAN 2667 y 2676:** solo se publicó el enlace de consulta por inscripción. La GOA 2676 dice que los indicadores se delimitaron "a la luz del perfil establecido en el manual de funciones de los empleos" (p. 11). **Verificado.**

### 2.2 Fuentes de terceros (no oficiales)

- Construyendo Méritos publicó en julio de 2022 que se "divulgaron ejes temáticos" de DIAN Ascenso, pero no los lista; solo remite al portal de consulta. Es una empresa privada de preparación ([enlace](https://www.construyendomeritos.com/blog/divulgados-ejes-tematicos-a-evaluarse-en-la-convocatoria-dian-ascenso)). **Secundario.**
- Grupo Geard, Material Concursos, Senpro y otros venden simulacros y bancos de preguntas "tipo DIAN". Existen, pero no son fuente de temario ni de claves y aquí no se reproducen. **Secundario.**

---

## 3. Sustancia verificada por caso

Todas las reglas de esta sección se leyeron en el texto primario vigente. El Senado (Avance Jurídico) declara "Última actualización: 30 de septiembre de 2026"; el normograma DIAN, a la fecha de consulta.

Abreviaturas de fuente:

- **ET-pr0XX** = `http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr0XX.html`
- **CPACA-prXXX** = `http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011_prXXX.html` (sin sufijo = arts. 1-41)

### Caso A: fiscalización y liquidación tributaria (15 reglas)

| Regla | Texto operativo citado | Norma y artículo | Fuente URL | Confianza |
|---|---|---|---|---|
| Emplazamiento para corregir: plazo y efecto | "dentro del mes siguiente a su notificación… corrija la declaración"; "La no respuesta a este emplazamiento no ocasiona sanción alguna" | ET 685 | [ET-pr028](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr028.html) | Verificado |
| Requerimiento especial: requisito previo, una sola vez | "Antes de efectuar la liquidación de revisión, la Administración enviará… por una sola vez, un requerimiento especial que contenga todos los puntos que se proponga modificar" | ET 703 | [ET-pr029](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr029.html) | Verificado |
| Requerimiento especial: término para notificarlo | "deberá notificarse a más tardar dentro de los tres (3) años siguientes a la fecha de vencimiento del plazo para declarar"; si la declaración fue extemporánea, desde su presentación; si hay saldo a favor, 3 años desde la solicitud de devolución o compensación | ET 705 (mod. L. 1819/2016) | [ET-pr029](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr029.html) | Verificado |
| Suspensión del término del requerimiento | Inspección de oficio: "por el término de tres meses"; "durante el mes siguientes a la notificación del emplazamiento para corregir" | ET 706 | ET-pr029 | Verificado |
| Respuesta al requerimiento | "Dentro de los tres (3) meses siguientes, contados a partir de la fecha de notificación del requerimiento especial" | ET 707 | ET-pr029 | Verificado |
| Ampliación del requerimiento | "dentro de los tres (3) meses siguientes a la fecha del vencimiento del plazo para responderlo, ordenar su ampliación, por una sola vez"; respuesta en no menos de 3 ni más de 6 meses | ET 708 | ET-pr029 | Verificado |
| Corrección provocada por el requerimiento | La sanción por inexactitud "se reducirá a la cuarta parte de la planteada por la Administración", siempre que se corrija y se pruebe el pago o acuerdo de pago | ET 709 | ET-pr029 | Verificado |
| Liquidación de revisión: término | "Dentro de los seis meses siguientes a la fecha de vencimiento del término para dar respuesta al Requerimiento Especial o a su ampliación" | ET 710 | ET-pr029 | Verificado |
| Corrección provocada por la liquidación de revisión | Aceptando los hechos dentro del término del recurso, la inexactitud "se reducirá a la mitad" | ET 713 | ET-pr029 | Verificado |
| Firmeza general | "quedará en firme sí, dentro de los tres (3) años siguientes a la fecha del vencimiento del plazo para declarar, no se ha notificado requerimiento especial"; con saldo a favor, 3 años desde la solicitud de devolución o compensación; con pérdida fiscal, el mismo término que hay para compensarla | ET 714 (mod. L. 1819/2016) | ET-pr029 | Verificado |
| Beneficio de auditoría (firmeza abreviada) | Firmeza en 6 meses si el impuesto neto de renta aumenta al menos 35 %, o en 12 meses si aumenta al menos 25 %, con declaración y pago oportunos; periodos 2022 y 2023 "<2024, 2025, 2026>" | ET 689-3 (adic. L. 2155/2021; prórroga anotada) | [ET-pr028](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr028.html) | Verificado (texto); la ley que prorrogó a 2026 no se leyó |
| Emplazamiento por no declarar | "para que lo hagan en el término perentorio de un (1) mes"; si declara después del emplazamiento, sanción por extemporaneidad del art. 642 | ET 715 | ET-pr029 | Verificado |
| No declarar tras el emplazamiento y aforo | Vencido el emplazamiento, sanción por no declarar (ET 716). Aforo "dentro de los cinco (5) años siguientes al vencimiento del plazo señalado para declarar" | ET 716, 717 | ET-pr029 | Verificado |
| Corrección aritmética | Error aritmético (ET 697); se profiere "dentro de los dos años siguientes a la fecha de presentación de la respectiva declaración" | ET 697, 699 | ET-pr029 | Verificado |
| Corrección voluntaria | Que aumente el impuesto: "dentro de los tres (3) años siguientes al vencimiento del plazo para declarar y antes de que se les haya notificado requerimiento especial o pliego de cargos". Que lo disminuya: "dentro del año siguiente al vencimiento del término" | ET 588 (mod. L. 2010/2019), 589 | [ET-pr024](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr024.html) | Verificado |
| Sanción por corrección | 10 % antes del emplazamiento o del auto de inspección; 20 % después y antes del requerimiento o pliego; +5 % si la declaración inicial fue extemporánea | ET 644 | [ET-pr026](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr026.html) | Verificado |
| Extemporaneidad | 5 % por mes o fracción, tope 100 % (ET 641). Después del emplazamiento: 10 % por mes, tope 200 % (ET 642) | ET 641, 642 | ET-pr026 | Verificado |
| Sanción por no declarar | Renta: 20 % de consignaciones o ingresos brutos. IVA/consumo: 10 %. Si declara dentro del término del recurso, se reduce al 50 % (par. 2) | ET 643 | ET-pr026 | Verificado |
| Inexactitud | 100 % de la diferencia; 200 % si se omiten activos o se incluyen pasivos inexistentes; 160 % si hay proveedores ficticios o abuso | ET 647, 648 | ET-pr026 | Verificado |
| Gradualidad | Liquidada por el contribuyente: al 50 % sin reincidencia en 2 años y sin pliego, requerimiento ni emplazamiento; al 75 % sin reincidencia en 1 año. Impuesta por la DIAN: al 50 % o 75 % si se acepta y subsana. Reincidencia: +100 % | ET 640 (mod. L. 1819/2016) | ET-pr026 | Verificado |
| Sanción mínima | "será equivalente a la suma de 10 uvt" | ET 639 | ET-pr026 | Verificado |
| Prescripción de la facultad sancionatoria | En liquidación oficial, el mismo término de esta. En resolución independiente, pliego de cargos "dentro de los dos años siguientes" a la declaración de renta del periodo; no declarar e intereses: 5 años; 6 meses para sancionar tras la respuesta al pliego | ET 638 | ET-pr026 | Verificado |
| Recurso de reconsideración | "dentro de los dos meses siguientes a la notificación"; *per saltum*: "Cuando se hubiere atendido en debida forma el requerimiento especial… podrá prescindir del recurso… y acudir directamente… dentro de los cuatro (4) meses" | ET 720 (par. adic. L. 223/1995) | ET-pr029 | Verificado |
| Requisitos del recurso | Por escrito con "expresión concreta de los motivos de inconformidad"; en tiempo; por el interesado o apoderado acreditado; agente oficioso solo si es abogado, con ratificación en 2 meses | ET 722 | ET-pr029 | Verificado |
| Inadmisión del recurso | Auto "dentro del mes siguiente a la interposición"; reposición en 10 días; si en 15 días hábiles no hay auto, "se entenderá admitido" | ET 726 | ET-pr029 | Verificado |
| Término para fallar y silencio positivo | "un (1) año para resolver… contado a partir de su interposición en debida forma"; si vence, "se entenderá fallado a favor del recurrente" | ET 732, 734 (suspensión: ET 733) | [ET-pr030](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr030.html) | Verificado |
| Nulidades | Son nulos los actos "Cuando se practiquen por funcionario incompetente" o "Cuando se omita el requerimiento especial previo… o se pretermita el término señalado para la respuesta"; se alegan dentro del término del recurso | ET 730, 731 | ET-pr030 | Verificado |
| Notificación | Actos "deben notificarse de manera electrónica, personalmente o a través de la red oficial de correos"; los que deciden recursos, personalmente o por edicto si no comparece en 10 días | ET 565 (mod. L. 2010/2019), 566-1 | [ET-pr023](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr023.html) | Verificado |
| Correo devuelto | Aviso en el portal; para el contribuyente, el término corre "desde el día hábil siguiente a la publicación del aviso" | ET 568 | ET-pr023 | Verificado |

### Caso B: recaudo y cobranzas (14 reglas)

| Regla | Texto operativo citado | Norma y artículo | Fuente URL | Confianza |
|---|---|---|---|---|
| Títulos ejecutivos | "1. Las liquidaciones privadas y sus correcciones… desde el vencimiento de la fecha para su cancelación. 2. Las liquidaciones oficiales ejecutoriadas. 3. Los demás actos… debidamente ejecutoriados… 4. Las garantías y cauciones… 5. Las sentencias…" | ET 828 | [ET-pr033](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr033.html) | Verificado |
| Ejecutoria del título | Sin recurso procedente; vencido el término sin recurso o sin debida forma; renuncia o desistimiento; recursos o acciones decididos en forma definitiva | ET 829 | ET-pr033 | Verificado |
| Mandamiento de pago y notificación | Notificación personal "previa citación para que comparezca en un término de diez (10) días"; si no comparece, por correo. Puede referirse a varios títulos del mismo deudor. Desde la L. 2010/2019 también procede la notificación electrónica, también en el proceso de cobro (ET 566-1) | ET 826; ET 566-1 | ET-pr033; ET-pr023 | Verificado |
| Pagar o excepcionar | "Dentro de los quince (15) días siguientes a la notificación del mandamiento de pago" | ET 830 | ET-pr033 | Verificado |
| Excepciones (lista cerrada) | 1. pago efectivo; 2. acuerdo de pago; 3. falta de ejecutoria del título; 4. pérdida de ejecutoria por revocación o suspensión provisional; 5. demanda de restablecimiento o revisión ante lo contencioso; 6. prescripción de la acción de cobro; 7. falta de título o incompetencia. Deudor solidario: calidad de solidario e indebida tasación | ET 831 | ET-pr033 | Verificado |
| Trámite de excepciones | Decisión "Dentro del mes siguiente a la presentación del escrito". Si se prueban: terminación y levantamiento de medidas. Si se prueban sobre algunos títulos: sigue por los demás | ET 832, 833 | ET-pr033; [ET-pr034](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr034.html) | Verificado |
| Recursos en el cobro | Las actuaciones "son de trámite y contra ellas no procede recurso alguno" salvo norma expresa. Contra la resolución que rechaza excepciones, "únicamente el recurso de reposición… dentro del mes siguiente", que se resuelve en un mes | ET 833-1, 834 | ET-pr034 | Verificado |
| Orden de ejecución sin excepciones | Si no se excepciona ni se paga, resolución de ejecución y remate; "Contra esta resolución no procede recurso alguno" | ET 836 | ET-pr034 | Verificado |
| Control judicial | Solo son demandables las resoluciones que fallan excepciones y ordenan la ejecución; "la admisión de la demanda no suspende el proceso de cobro, pero el remate no se realizará" hasta el fallo definitivo | ET 835 | ET-pr034 | Verificado |
| Medidas cautelares | "Previa o simultáneamente con el mandamiento de pago, el funcionario podrá decretar el embargo y secuestro preventivo". Se levantan si se demuestra demanda admitida contra el título, o con garantía bancaria o de seguros si se demandó la resolución de excepciones | ET 837 | ET-pr034 | Verificado |
| Límite de embargos | "no podrá exceder del doble de la deuda más sus intereses" | ET 838 | ET-pr034 | Verificado |
| Inembargabilidad | Personas naturales: 25 SMMLV en la cuenta de ahorros más antigua. Personas jurídicas: sin límite. No se embargan inmuebles con patrimonio de familia o afectación a vivienda familiar ni cuentas en el Banco de la República | ET 837-1 (adic. L. 1066/2006, mod. L. 1430/2010) | ET-pr034 | Verificado |
| Prescripción de la acción de cobro | "prescribe en el término de cinco (5) años", contados desde el vencimiento del plazo (declaración oportuna), la presentación (extemporánea), la corrección (mayores valores) o la ejecutoria del acto | ET 817 (mod. L. 1739/2014) | ET-pr033 | Verificado |
| Interrupción y suspensión de la prescripción | "se interrumpe por la notificación del mandamiento de pago, por el otorgamiento de facilidades para el pago, por la admisión de la solicitud del concordato y por la declaratoria oficial de la liquidación forzosa administrativa"; se suspende desde el auto que suspende el remate | ET 818 | ET-pr033 | Verificado |
| Facilidades de pago | Hasta 5 años con garantía; garantías personales si la deuda ≤ 3.000 UVT; sin garantía si el plazo ≤ 1 año y no hubo incumplimiento el año anterior | ET 814 (incisos mod. L. 2277/2022, art. 81) | ET-pr033 | Verificado |
| Reorganización (Ley 1116) | "A partir de la fecha de inicio del proceso de reorganización no podrá admitirse ni continuarse demanda de ejecución o cualquier otro proceso de cobro en contra del deudor"; los procesos se remiten al concurso y las medidas quedan a disposición del juez del concurso | Ley 1116 de 2006, art. 20 | [Senado L. 1116](http://www.secretariasenado.gov.co/senado/basedoc/ley_1116_2006.html) | Verificado |
| Concursos y liquidaciones | El juez o funcionario informa a Cobranzas "dentro de los diez (10) días siguientes"; en disolución, aviso del representante legal en 10 días. Si omite, responsabilidad solidaria | ET 846, 847 | ET-pr034 | Verificado |

### Caso C: gestión jurídica y representación externa (12 reglas)

| Regla | Texto operativo citado | Norma y artículo | Fuente URL | Confianza |
|---|---|---|---|---|
| Nulidad simple | Contra actos generales; excepcionalmente particulares (sin restablecimiento automático, bienes de uso público, grave afectación, ley expresa) | CPACA 137 | [CPACA-pr003](http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011_pr003.html) | Verificado |
| Nulidad y restablecimiento | "Toda persona que se crea lesionada en un derecho subjetivo… podrá pedir que se declare la nulidad del acto administrativo particular, expreso o presunto, y se le restablezca el derecho" | CPACA 138 | CPACA-pr003 | Verificado |
| Caducidad: nulidad en cualquier tiempo | "En cualquier tiempo, cuando: a) Se pretenda la nulidad en los términos del artículo 137"; también contra actos producto del silencio administrativo (lit. d) | CPACA 164 num. 1 | [CPACA-pr004](http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011_pr004.html) | Verificado |
| Caducidad: nulidad y restablecimiento | "cuatro (4) meses contados a partir del día siguiente al de la comunicación, notificación, ejecución o publicación del acto administrativo" | CPACA 164 num. 2 lit. d | CPACA-pr004 | Verificado |
| Caducidad: reparación directa y contratos | Reparación directa: "dos (2) años, contados a partir del día siguiente al de la ocurrencia de la acción u omisión". Contratos: 2 años | CPACA 164 num. 2 lits. i, j | CPACA-pr004 | Verificado |
| Agotar recursos obligatorios | "deberán haberse ejercido y decidido los recursos que de acuerdo con la ley fueren obligatorios"; con silencio negativo frente a la primera petición se puede demandar el acto presunto | CPACA 161 num. 2 | CPACA-pr004 | Verificado |
| Conciliación como requisito de procedibilidad | "Cuando los asuntos sean conciliables, el trámite de la conciliación extrajudicial constituirá requisito de procedibilidad" en nulidad y restablecimiento, reparación directa y contractuales; sin ella, "rechazo de plano de la demanda" | Ley 2220 de 2022, art. 92; CPACA 161 num. 1 | [Senado L. 2220 pr002](http://www.secretariasenado.gov.co/senado/basedoc/ley_2220_2022_pr002.html) | Verificado |
| **Lo tributario no se concilia** | "No son susceptibles de conciliación extrajudicial en asuntos de lo contencioso administrativo: 1. Los que versen sobre conflictos de carácter tributario"; tampoco cuando caducó la acción o no se agotó el procedimiento administrativo | Ley 2220 de 2022, art. 90 | L. 2220 pr002 | Verificado |
| Suspensión de la caducidad por conciliación | La solicitud "suspende el término de prescripción o de caducidad… hasta… que se venza el término de tres (3) meses"; opera "por una sola vez y será improrrogable" | Ley 2220 de 2022, art. 56 | [Senado L. 2220 pr001](http://www.secretariasenado.gov.co/senado/basedoc/ley_2220_2022_pr001.html) | Verificado |
| Ante quién se concilia y aprobación | Ante "los agentes del Ministerio Público" (art. 95). El acta va al juez para aprobación dentro de 3 días (art. 113). Funciones del Comité de Conciliación (arts. 115, 120) | Ley 2220 de 2022, arts. 95, 113, 120 | L. 2220 pr002 | Verificado |
| Contestación de la demanda | Traslado "por el término de treinta (30) días" para contestar, proponer excepciones, pedir pruebas y llamar en garantía | CPACA 172 | CPACA-pr004 | Verificado |
| Medidas cautelares | Procede "antes de ser notificado, el auto admisorio de la demanda o en cualquier estado del proceso, a petición de parte debidamente sustentada" (229). Suspensión provisional: violación que surja de confrontar el acto con las normas invocadas (231). Traslado de 5 días (233). De urgencia, sin notificación previa (234) | CPACA 229, 231, 233, 234 | [CPACA-pr005](http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011_pr005.html) | Verificado |
| Oferta de revocatoria en juicio | Hasta antes de la sentencia de segunda instancia, "previa aprobación del Comité de Conciliación de la entidad" | CPACA 95 par. | [CPACA-pr002](http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011_pr002.html) | Verificado |
| Obligatoriedad de la doctrina DIAN | Los conceptos de la Dirección de Gestión Jurídica o la Subdirección de Normativa y Doctrina "constituyen interpretación oficial para los empleados públicos… tendrán carácter obligatorio para los mismos". "Los contribuyentes podrán sustentar sus actuaciones… con base en la ley" (aparte subrayado: "CONDICIONALMENTE exequible") | Ley 2010 de 2019, art. 131 | [Senado L. 2010](http://www.secretariasenado.gov.co/senado/basedoc/ley_2010_2019.html); [normograma](https://normograma.dian.gov.co/dian/compilacion/docs/ley_2010_2019.htm) | Verificado (texto). **No verificado:** qué sentencia lo condicionó y en qué sentido |
| Per saltum tributario | Con el requerimiento especial atendido en debida forma, demanda directa contra la liquidación oficial en 4 meses | ET 720 par. | ET-pr029 | Verificado |

### Caso D: aduanas y control cambiario (13 reglas)

> Vigencia: el DL 920 de 2023 rigió hasta el 19 o 20 de junio de 2026; desde el 19 de junio de 2026 rige la Ley 2586 de 2026. Ver la alerta 1. En las filas sancionatorias se citan **ambas** normas cuando el texto coincide.

| Regla | Texto operativo citado | Norma y artículo | Fuente URL | Confianza |
|---|---|---|---|---|
| Ley marco: reparto de competencias | El Gobierno, al modificar el régimen de aduanas, "no podrá exceder los términos establecidos en la presente ley" (art. 1). Circulares o conceptos tienen "naturaleza… de criterios auxiliares de interpretación" (art. 2 par. 1). Principios: debido proceso, buena fe, prevalencia de lo sustancial, entre otros (art. 4) | Ley 1609 de 2013, arts. 1, 2, 4 | [Senado L. 1609](http://www.secretariasenado.gov.co/senado/basedoc/ley_1609_2013.html) | Verificado |
| Obligación aduanera | "Es el vínculo jurídico entre la administración aduanera y cualquier persona directa o indirectamente relacionada con cualquier régimen, modalidad u operación aduanera" | Decreto 1165 de 2019, art. 4 | [normograma D. 1165](https://normograma.dian.gov.co/dian/compilacion/docs/decreto_1165_2019.htm) | Verificado |
| Permanencia en depósito y abandono | Hasta "un (1) mes, contado desde la fecha de su llegada", prorrogable un mes. Vencido sin levante, "operará el abandono legal"; rescate dentro del mes siguiente | D. 1165, art. 171 | normograma D. 1165 | Verificado |
| Firmeza de la declaración de importación | "quedará en firme transcurridos tres (3) años contados a partir de la fecha de su presentación y aceptación, salvo que se haya notificado Requerimiento Especial Aduanero" | D. 1165, art. 188 (inciso 2 con modificación diferida por D. 659 de 2024) | normograma D. 1165 | Verificado |
| Corrección voluntaria de la declaración | Solo para los errores listados (subpartida, tarifas, tasa de cambio, valor…), "por una sola vez" y dentro del término de firmeza | D. 1165, art. 296 | normograma D. 1165 | Verificado |
| Legalización | Mercancía con obligación incumplida que da lugar a aprehensión "podrán ser declaradas… en forma voluntaria o provocada" | D. 1165, art. 290 | normograma D. 1165 | Verificado |
| Objeción a la aprehensión | "quince (15) días hábiles siguientes a la notificación del Acta de Aprehensión" para presentar el escrito con pruebas de legal introducción o permanencia | Ley 2586/2026 art. 45; DL 920/2023 art. 88 (igual) | [normograma L. 2586](https://normograma.dian.gov.co/dian/compilacion/docs/ley_2586_2026.htm); [normograma DL 920](https://normograma.dian.gov.co/dian/compilacion/docs/decreto_0920_2023.htm) | Verificado |
| Pruebas en el decomiso | Auto de pruebas dentro de 20 días hábiles; reposición en 10 días hábiles contra la negativa; práctica en 2 meses (3 si es en el exterior) | Ley 2586 art. 46 | normograma L. 2586 | Verificado |
| Decisión de fondo del decomiso | "setenta (70) días hábiles para expedir y notificar el acto de fondo que decide sobre el proceso de decomiso" | Ley 2586 art. 47; DL 920 art. 90 | ambos normogramas | Verificado |
| Decomiso directo | El acta de aprehensión y decomiso directo "es una decisión de fondo y contra la cual procede únicamente el recurso de reconsideración"; el avalúo "será definitivo" | Ley 2586 art. 49 | normograma L. 2586 | Verificado |
| Requerimiento especial aduanero: respuesta | "dentro de los quince (15) días hábiles siguientes a su notificación"; ampliable sin superar 70 días hábiles para acreditar restricciones legales | Ley 2586 art. 70; DL 920 art. 111 | ambos | Verificado |
| Decisión de fondo (sanción o liquidación) | "setenta (70) días hábiles para expedir y notificar el acto administrativo que decida de fondo" | Ley 2586 art. 72; DL 920 art. 113 ("setenta (70) días") | ambos | Verificado |
| Reconsideración aduanera | Contra liquidaciones oficiales, decomisos y sanciones, "dentro de los quince (15) días hábiles siguientes a su notificación"; se decide en "cinco (5) meses" | Ley 2586 arts. 88, 94; DL 920 arts. 130, 136 | ambos | Verificado |
| Silencio positivo aduanero | Vencido el plazo para decidir de fondo o resolver la reconsideración, "dará lugar a la ocurrencia del silencio administrativo positivo" | Ley 2586 art. 96; DL 920 art. 138 | ambos | Verificado |
| Caducidad y prescripción aduanera | Facultad sancionatoria: "caduca en el término de tres (3) años contados a partir de la comisión del hecho". Cobro de la sanción: prescribe en 5 años desde la ejecutoria | Ley 2586 arts. 20, 21; DL 920 arts. 25, 26 | ambos | Verificado |
| Allanamiento (cambio en la Ley 2586) | Ley 2586: "Sin sanción" si reconoce sin intervención antes del requerimiento especial aduanero (no aplica a gravísimas); 20 % antes del requerimiento; 40 % después y antes de la decisión de fondo; 60 % dentro del término del recurso. DL 920: 20 %, 40 % y 60 %, sin el escalón "sin sanción" | Ley 2586 art. 19; DL 920 art. 24 | ambos | Verificado |
| Tránsito normativo | Operaciones iniciadas bajo el DL 920 se rigen por la norma vigente a su inicio, "sin perjuicio de la aplicación del principio de favorabilidad"; procesos en curso, por las normas vigentes al iniciarse | Ley 2586 art. 112 | normograma L. 2586 | Verificado |
| Cambiario: infracción y responsabilidad | "contravención administrativa de las disposiciones constitutivas del régimen cambiario" (art. 2); la responsabilidad "es objetiva" (art. 32) | DL 2245 de 2011, arts. 2, 32 | [normograma DL 2245](https://normograma.dian.gov.co/dian/compilacion/docs/decreto_2245_2011.htm) | Verificado |
| Cambiario: prescripción y traslado | Acto de formulación de cargos notificado "dentro de los cinco (5) años siguientes a la fecha en que ocurrieron los hechos" (art. 5). Traslado de "dos (2) meses", "única oportunidad" para descargos (art. 21) | DL 2245, arts. 5, 21 | normograma DL 2245 | Verificado |
| Cambiario: recurso y silencio | Reconsideración "dentro del mes siguiente a la notificación" (art. 26); se resuelve en "siete (7) meses" (art. 28); si vence, "se entenderá fallado este a favor del recurrente" (art. 30) | DL 2245, arts. 26, 28, 30 | normograma DL 2245 | Verificado |

No verificado para el caso D: el reparto de competencias cambiarias entre la DIAN, la Superintendencia de Sociedades y el Banco de la República (Decreto 1068 de 2015, Decreto 1742 de 2020). Hay que leerlo antes de hacer tarjetas sobre ese punto.

### Tronco común: CPACA, derecho de petición y disciplinario (14 reglas)

| Regla | Texto operativo citado | Norma y artículo | Fuente URL | Confianza |
|---|---|---|---|---|
| Petición: término general | "toda petición deberá resolverse dentro de los quince (15) días siguientes a su recepción" | CPACA 14 (sust. L. 1755/2015) | [CPACA (arts. 1-41)](http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011.html) | Verificado |
| Petición de documentos e información | "dentro de los diez (10) días"; si no se responde, "se entenderá… aceptada", con copias en 3 días | CPACA 14 num. 1 | CPACA | Verificado |
| Consultas | "dentro de los treinta (30) días" | CPACA 14 num. 2 | CPACA | Verificado |
| Prórroga | Informar antes del vencimiento, con plazo razonable "que no podrá exceder del doble del inicialmente previsto" | CPACA 14 par. | CPACA | Verificado |
| Petición incompleta | Requerir "dentro de los diez (10) días siguientes a la fecha de radicación para que la complete en el término máximo de un (1) mes"; si no cumple, desistimiento tácito por acto motivado | CPACA 17 (L. 1755) | CPACA | Verificado |
| Funcionario sin competencia | Informar y remitir "dentro de los cinco (5) días siguientes al de la recepción, si obró por escrito"; el término corre desde la recepción por el competente | CPACA 21 (L. 1755) | CPACA | Verificado |
| Citación y aviso | Citación "dentro de los cinco (5) días siguientes a la expedición del acto". Si no comparece en 5 días, aviso; la notificación queda surtida "al finalizar el día siguiente al de la entrega del aviso" | CPACA 68, 69 | [CPACA-pr001](http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011_pr001.html) | Verificado |
| Requisitos de la notificación personal | Copia íntegra del acto, recursos, autoridades y plazos; "El incumplimiento de cualquiera de estos requisitos invalidará la notificación" | CPACA 67 | CPACA-pr001 | Verificado |
| Recursos: oportunidad | Reposición y apelación "dentro de los diez (10) días siguientes" a la notificación. La apelación, cuando procede, "será obligatoria para acceder a la jurisdicción"; reposición y queja no lo son | CPACA 74, 76 | CPACA-pr001 | Verificado |
| Silencio negativo | Petición: "Transcurridos tres (3) meses… se entenderá que esta es negativa" (83). Recursos: "dos (2) meses" (86) | CPACA 83, 86 | CPACA-pr001, pr002 | Verificado |
| Firmeza del acto | Desde el día siguiente a la notificación si no hay recursos, a la decisión de los recursos, al vencimiento sin interponerlos, etc. | CPACA 87 | CPACA-pr002 | Verificado |
| Revocatoria directa | Causales (93). Procede "siempre que no se haya notificado auto admisorio de la demanda" y se resuelve en "dos (2) meses", sin recurso (95). Un acto particular no se revoca "sin el consentimiento previo, expreso y escrito del respectivo titular" (97) | CPACA 93, 95, 97 | CPACA-pr002 | Verificado |
| Disciplinario: prescripción | "La acción disciplinaria prescribirá en cinco (5) años"; se interrumpe con la notificación del fallo de primera instancia. Faltas del art. 52: 12 años | Ley 1952 de 2019, art. 33 (mod. L. 2094/2021) | [Senado L. 1952](http://www.secretariasenado.gov.co/senado/basedoc/ley_1952_2019.html) | Verificado |
| Disciplinario: dolo y culpa | Dolo: conoce los hechos, su ilicitud "y quiere su realización" (28). "La culpa leve no será sancionable" (29) | Ley 1952, arts. 28, 29 | Senado L. 1952 | Verificado |
| Disciplinario: sanciones | Gravísima dolosa: destitución e inhabilidad de 10 a 20 años. Gravísima con culpa gravísima: 8 a 10 años. Grave dolosa: suspensión de 3 a 18 meses. Grave culposa: suspensión de 1 a 12 meses. Leve dolosa: multa de 10 a 180 días. Leve culposa: amonestación escrita | Ley 1952, art. 48 (mod. L. 2094/2021) | [Senado L. 1952 pr001](http://www.secretariasenado.gov.co/senado/basedoc/ley_1952_2019_pr001.html) | Verificado |
| Conflicto de intereses | "deberá declararse impedido para actuar en un asunto cuando tenga interés particular y directo", también por cónyuge o parientes hasta el cuarto grado de consanguinidad, segundo de afinidad o primero civil | Ley 1952, art. 44 | Senado L. 1952 pr001 | Verificado |
| Términos de la actuación disciplinaria | Indagación previa: "seis (6) meses" (208). Investigación: "seis (6) meses", prorrogable por otro tanto (213) | Ley 1952, arts. 208, 213 (mod. L. 2094/2021) | [Senado L. 1952 pr005](http://www.secretariasenado.gov.co/senado/basedoc/ley_1952_2019_pr005.html) | Verificado |

**Conteo de reglas verificadas:** A: 29 filas (15 temas núcleo); B: 17; C: 14 (doctrina con salvedad); D: 20; tronco común: 17.

---

## 4. Patrones de escenarios situacionales (derivados)

> **Etiqueta obligatoria:** estos son **patrones construidos por el investigador** a partir del formato oficial de la GOA (caso, enunciado y tres opciones; los distractores suelen ser pasos válidos pero fuera de secuencia o de competencia) y de las reglas de la sección 3. **No son preguntas reales del examen.**

### Caso A: fiscalización y liquidación

1. **Respuesta extemporánea al requerimiento especial.** El contribuyente responde 3 meses y 10 días después de notificado. ¿Qué hace el Gestor? Lo correcto es seguir el trámite: la liquidación de revisión debe notificarse dentro de los 6 meses siguientes al vencimiento del término de respuesta (ET 707, 710). Distractores: "conceder un nuevo plazo" o "archivar". Variante: como el requerimiento no se "atendió en debida forma", no procede el *per saltum* (ET 720 par.).
2. **Firmeza.** Una declaración de renta vencida el 10 de mayo de 2023 recibe el requerimiento el 15 de mayo de 2026. Clave: la declaración quedó en firme; el requerimiento es extemporáneo (ET 705, 714). Variantes: declaración extemporánea (se cuenta desde la presentación), saldo a favor (desde la solicitud de devolución) o beneficio de auditoría (ET 689-3).
3. **Gradualidad de la inexactitud.** El contribuyente acepta parcialmente los hechos al responder el requerimiento. Clave: la inexactitud se reduce a la cuarta parte sobre los hechos aceptados, con corrección y prueba de pago o acuerdo (ET 709). Contraste: si acepta tras la liquidación de revisión, se reduce a la mitad (ET 713).
4. **Omiso en declarar.** El contribuyente no presenta la declaración tras el emplazamiento de 1 mes. Secuencia correcta: sanción por no declarar (ET 716, 643) y luego liquidación de aforo dentro de 5 años (ET 717). Distractor: "proferir requerimiento especial", que corresponde a declaraciones presentadas.
5. **Recurso de reconsideración.** Lo presenta un tercero no abogado como agente oficioso, o vence el año sin fallo. Claves: la agencia oficiosa es solo para abogados (ET 722); si vence el año, opera el silencio positivo y se declara de oficio o a petición (ET 732, 734).

### Caso B: recaudo y cobranzas

1. **Excepción improcedente.** El deudor alega "inconformidad con la liquidación oficial" contra el mandamiento de pago. Clave: no está en la lista cerrada del ET 831; se rechaza y se ordena seguir la ejecución, con reposición en 1 mes (ET 834).
2. **Prescripción.** Declaración oportuna vencida en abril de 2021 y mandamiento notificado en mayo de 2026. Clave: la acción prescribió (5 años, ET 817), lo que es excepción del num. 6 del ET 831. Variante: una facilidad de pago otorgada en 2023 interrumpió el término (ET 818).
3. **Embargo excesivo.** Los bienes embargados triplican la deuda. Clave: reducir el embargo hasta el doble de la deuda más intereses, de oficio o a solicitud (ET 838). Variante: cuenta de ahorros de persona natural con saldo bajo el límite de inembargabilidad (ET 837-1).
4. **Deudor en reorganización.** Se admite la reorganización (Ley 1116) con un proceso coactivo en curso. Clave: no continuar; remitir el proceso al juez del concurso y dejar las medidas a su disposición (Ley 1116, art. 20; ET 846). Distractor: "rematar antes de que avance el concurso".
5. **Título ejecutivo.** Se pretende cobrar una liquidación oficial con recurso de reconsideración en trámite. Clave: el título no está ejecutoriado (ET 828 num. 2, 829), así que no se libra mandamiento. Excepción aplicable: falta de ejecutoria (ET 831 num. 3).

### Caso C: gestión jurídica y representación externa

1. **Conciliación en lo tributario.** Un contribuyente pide conciliación prejudicial sobre una liquidación oficial de renta. Clave: no es conciliable por ser conflicto tributario (Ley 2220, art. 90 num. 1). Por eso la conciliación no es requisito para demandar.
2. **Caducidad.** El fallo del recurso de reconsideración se notifica el 3 de febrero y la demanda se radica el 10 de junio. Clave: se superaron los 4 meses (CPACA 164 num. 2 lit. d), así que el Gestor propone la excepción de caducidad.
3. **Medida cautelar.** El demandante pide la suspensión provisional de una resolución sanción. El Gestor tiene 5 días para pronunciarse, en escrito separado, sobre la solicitud (CPACA 233). El argumento útil: la violación no surge de la simple confrontación normativa (CPACA 231).
4. **Doctrina oficial.** Un funcionario de fiscalización quiere apartarse de un concepto vigente de la Subdirección de Normativa y Doctrina. Clave: el concepto es obligatorio para los empleados de la DIAN (Ley 2010, art. 131). Distractor: "aplicar su propia interpretación de la ley".
5. **Oferta de revocatoria.** En segunda instancia la DIAN advierte un vicio evidente. Clave: formular la oferta de revocatoria previa aprobación del Comité de Conciliación, antes de la sentencia de segunda instancia (CPACA 95 par.).

### Caso D: aduanas y control cambiario

1. **Objeción fuera de término.** El interesado presenta el escrito de objeción 20 días hábiles después de notificada el acta de aprehensión. Clave: es extemporáneo (15 días hábiles: Ley 2586, art. 45; DL 920, art. 88); el proceso sigue hacia la decisión de fondo.
2. **Mercancía en depósito sin levante.** Pasó 1 mes y 10 días sin prórroga desde la llegada. Clave: operó el abandono legal; procede el rescate dentro del mes siguiente (D. 1165, art. 171).
3. **Allanamiento.** El importador reconoce la infracción después del requerimiento especial aduanero y antes de la decisión de fondo. Clave: la multa se reduce al 40 % con prueba de pago (Ley 2586, art. 19; DL 920, art. 24).
4. **Silencio positivo aduanero.** Vencen los 5 meses sin decidir la reconsideración contra un decomiso. Clave: silencio positivo, declarado de oficio o a petición (Ley 2586, arts. 94, 96).
5. **Cambiario.** El investigado presenta descargos 3 meses después de notificada la formulación de cargos. Clave: el traslado de 2 meses es la única oportunidad (DL 2245, art. 21). Variante: reconsideración presentada a los 40 días; el plazo es de 1 mes (art. 26).

### Tronco común

1. Llega una petición de copias y se responde el día 12. Clave: el término era de 10 días y se entiende aceptada; las copias se entregan en 3 días (CPACA 14 num. 1).
2. Llega una petición dirigida a la DIAN que compete a otra entidad. Clave: remitir en 5 días e informar al peticionario (CPACA 21).
3. El Gestor tiene que proyectar un acto sobre la empresa de su primo hermano, que es pariente en cuarto grado. Clave: declararse impedido (Ley 1952, art. 44).
4. Un acto particular favorable resulta ilegal. Clave: no revocarlo sin el consentimiento del titular; si este no lo da, demandarlo (CPACA 97).

---

## Fuentes

**Oficiales (CNSC y operador)**

- [GOA DIAN 2676 (CNSC, octubre de 2026)](https://www.cnsc.gov.co/sites/default/files/2026-10/dian-2676_guia_orientacion_aspirante_presentacion-pruebas-escritas_0.pdf)
- [Aviso de publicación de la GOA 2676 (CNSC)](https://www.cnsc.gov.co/node/69407)
- [GOA DIAN 2667 (CNSC, julio de 2025)](https://www.cnsc.gov.co/sites/default/files/2025-07/goa_aplicacion-y-acceso-pruebas-escritas-dian-2667.pdf)
- [GOA DIAN 2022 (copia en Internet Archive del PDF CNSC)](https://web.archive.org/web/20231223105916/https://historico.cnsc.gov.co/index.php/dian-2022-guias?download=62977%3Aguia-de-orientacion-al-aspirante-presentacion-de-pruebas-escritas)
- [Bibliografía sugerida DIAN 2022 (archivo)](https://web.archive.org/web/20231223105923/https://historico.cnsc.gov.co/index.php/dian-2022-guias?download=62994%3Aanexo-bibliografia-sugerida-dian2022)
- [Aviso CNSC pruebas DIAN 2022](https://www.cnsc.gov.co/node/21312)
- [GOA DIAN 1461 de 2020 (archivo)](https://web.archive.org/web/20210803002125/https://www.cnsc.gov.co/index.php/1461-de-2020-dian-guias?download=43432:goa-presentacion-pruebas-escritas-dian)
- [Bibliografía general DIAN 1461 (archivo)](https://web.archive.org/web/20210625102643/https://www.cnsc.gov.co/index.php/1461-de-2020-dian-guias?download=43434:bibliografia-general)
- [Consulta de indicadores DIAN 2676 (Areandina, requiere inscripción)](http://dian-2676-areandina.com.co/indicadores-dian-2667/)

**Normas (texto primario)**

- Estatuto Tributario, Secretaría del Senado: [pr023](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr023.html), [pr024](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr024.html), [pr026](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr026.html), [pr028](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr028.html), [pr029](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr029.html), [pr030](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr030.html), [pr033](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr033.html), [pr034](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr034.html)
- CPACA, Ley 1437 de 2011 (con Ley 1755 de 2015 y Ley 2080 de 2021): [arts. 1-41](http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011.html), [pr001](http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011_pr001.html), [pr002](http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011_pr002.html), [pr003](http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011_pr003.html), [pr004](http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011_pr004.html), [pr005](http://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011_pr005.html)
- Ley 2220 de 2022: [pr001](http://www.secretariasenado.gov.co/senado/basedoc/ley_2220_2022_pr001.html), [pr002](http://www.secretariasenado.gov.co/senado/basedoc/ley_2220_2022_pr002.html)
- Ley 2010 de 2019: [Senado](http://www.secretariasenado.gov.co/senado/basedoc/ley_2010_2019.html), [normograma DIAN](https://normograma.dian.gov.co/dian/compilacion/docs/ley_2010_2019.htm)
- [Ley 1116 de 2006 (Senado)](http://www.secretariasenado.gov.co/senado/basedoc/ley_1116_2006.html)
- [Ley 1609 de 2013 (Senado)](http://www.secretariasenado.gov.co/senado/basedoc/ley_1609_2013.html)
- [Decreto 1165 de 2019 (normograma DIAN)](https://normograma.dian.gov.co/dian/compilacion/docs/decreto_1165_2019.htm)
- [Decreto Ley 920 de 2023 (normograma DIAN, con notas de derogatoria e inexequibilidad)](https://normograma.dian.gov.co/dian/compilacion/docs/decreto_0920_2023.htm)
- [Ley 2586 de 2026 (normograma DIAN)](https://normograma.dian.gov.co/dian/compilacion/docs/ley_2586_2026.htm)
- [Decreto Ley 2245 de 2011 (normograma DIAN)](https://normograma.dian.gov.co/dian/compilacion/docs/decreto_2245_2011.htm)
- Ley 1952 de 2019 (con Ley 2094 de 2021): [Senado](http://www.secretariasenado.gov.co/senado/basedoc/ley_1952_2019.html), [pr001](http://www.secretariasenado.gov.co/senado/basedoc/ley_1952_2019_pr001.html), [pr005](http://www.secretariasenado.gov.co/senado/basedoc/ley_1952_2019_pr005.html)

**Terceros (solo como referencia, no como fuente de reglas)**

- [Construyendo Méritos, "Divulgados ejes temáticos… DIAN Ascenso" (2022)](https://www.construyendomeritos.com/blog/divulgados-ejes-tematicos-a-evaluarse-en-la-convocatoria-dian-ascenso)
- [Grupo Geard, resumen de la GOA 2676](https://grupogeard.com/co/guias/guia-orientacion-aspirante-presentacion-pruebas-escritas-dian-2676/)
