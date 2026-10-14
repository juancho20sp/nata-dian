"""Descarga el texto oficial de las normas enlazadas y guarda copias en fuentes/normas/.

Uso:
    python3 scripts/descargar-normas.py            # todas
    python3 scripts/descargar-normas.py ley-2586-2026 et

Solo guarda el texto normativo de cada artículo (ver fuentes/normas/LEEME.md):
quita las notas editoriales de la compilación (jurisprudencia, concordancias,
notas de vigencia, legislación anterior) y las anotaciones entre < >, de las que
solo conserva si el artículo está derogado o modificado. Compara con la copia
anterior y lista los artículos cuyo texto cambió. Python estándar, sin dependencias.
"""

import datetime
import html
import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / 'fuentes' / 'normas'
SENADO = 'http://www.secretariasenado.gov.co/senado/basedoc/'
NORMOGRAMA = 'https://normograma.dian.gov.co/dian/compilacion/docs/'
AGENTE = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'


def articulos_et(numero: str) -> bool:
    """Estatuto Tributario: Libro V (555 a 869-x) y los artículos que citan los planes."""
    base = int(re.match(r'\d+', numero).group())
    return 555 <= base <= 869 or base in (365, 366, 367, 368, 420)


NORMAS = {
    'et': ('Estatuto Tributario', 'senado', 'estatuto_tributario', articulos_et),
    'cpaca': ('Ley 1437 de 2011 (CPACA)', 'senado', 'ley_1437_2011', None),
    'ley-1952-2019': ('Ley 1952 de 2019 (Código General Disciplinario)', 'senado', 'ley_1952_2019', None),
    'ley-2220-2022': ('Ley 2220 de 2022 (conciliación)', 'senado', 'ley_2220_2022', None),
    'ley-1116-2006': ('Ley 1116 de 2006 (insolvencia)', 'senado', 'ley_1116_2006', None),
    'ley-1609-2013': ('Ley 1609 de 2013 (ley marco de aduanas)', 'senado', 'ley_1609_2013', None),
    'ley-2010-2019': ('Ley 2010 de 2019', 'normograma', 'ley_2010_2019', None),
    'decreto-1165-2019': ('Decreto 1165 de 2019 (régimen aduanero)', 'normograma', 'decreto_1165_2019', None),
    'dl-920-2023': ('Decreto Ley 920 de 2023 (régimen sancionatorio aduanero, derogado por la Ley 2586 de 2026)', 'normograma', 'decreto_0920_2023', None),
    'ley-2586-2026': ('Ley 2586 de 2026 (régimen sancionatorio aduanero)', 'normograma', 'ley_2586_2026', None),
    'dl-2245-2011': ('Decreto Ley 2245 de 2011 (régimen sancionatorio cambiario)', 'normograma', 'decreto_2245_2011', None),
    'dl-927-2023': ('Decreto Ley 927 de 2023 (carrera DIAN)', 'normograma', 'decreto_0927_2023', None),
}


CACHE = RAIZ / '.cache' / 'normas'


def bajar(url: str, intentos: int = 5) -> str | None:
    """Descarga una página (con caché en .cache/normas/ para poder reanudar) o None si no existe."""
    CACHE.mkdir(parents=True, exist_ok=True)
    archivo = CACHE / re.sub(r'[^A-Za-z0-9._-]', '_', url.split('//', 1)[1])
    if archivo.exists():
        crudo = archivo.read_bytes()
    else:
        pedido = urllib.request.Request(url, headers={'User-Agent': AGENTE})
        for intento in range(intentos):
            try:
                with urllib.request.urlopen(pedido, timeout=60) as r:
                    crudo = r.read()
                break
            except urllib.error.HTTPError:
                return None
            except (urllib.error.URLError, TimeoutError, ConnectionError, OSError) as e:
                # El servidor del Senado a veces no responde: se reintenta con espera creciente.
                if intento == intentos - 1:
                    raise RuntimeError(f'sin respuesta de {url}: {e}') from e
                print(f'  … reintento {intento + 1} de {url}', flush=True)
                time.sleep(10 * (intento + 1))
        archivo.write_bytes(crudo)
        print(f'  ↓ {url.rsplit("/", 1)[-1]} ({len(crudo) // 1024} KB)', flush=True)
    try:
        texto = crudo.decode('utf-8')
    except UnicodeDecodeError:
        texto = crudo.decode('latin-1')
    # El Senado responde 200 con una página "404 - Categoría no encontrada" si no existe
    return None if '404 - Categor' in texto[:2000] else texto


def paginas(fuente: str, base: str) -> list[tuple[str, str]]:
    if fuente == 'normograma':
        url = f'{NORMOGRAMA}{base}.htm'
        h = bajar(url)
        return [(url, h)] if h else []
    salida = []
    url = f'{SENADO}{base}.html'
    h = bajar(url)
    if h:
        salida.append((url, h))
    n = 1
    while True:
        url = f'{SENADO}{base}_pr{n:03d}.html'
        h = bajar(url)
        if not h:
            break
        salida.append((url, h))
        n += 1
    return salida


NOTAS = re.compile(
    r'<div>\s*<a class="caja_vja_encabezado"[^>]*>.*?</a>\s*</div>'
    r'|<table[^>]*>.*?</table>'
    r'|<a [^>]*title="Ir al inicio"[^>]*>.*?</a>'
    r'|<div[^>]*>\s*<a [^>]*href="[^"]*#top"[^>]*>.*?</a>\s*</div>',
    re.S | re.I,
)
ANOTACION = re.compile(r'<([^<>]{3,1500})>')


def limpiar(fragmento: str) -> tuple[str, str]:
    """Texto del artículo sin notas editoriales, y su estado."""
    sin_notas = NOTAS.sub(' ', fragmento)
    texto = html.unescape(re.sub(r'<[^>]+>', ' ', sin_notas))
    estado = 'vigente'
    for m in ANOTACION.finditer(texto):
        nota = m.group(1).lower().strip()
        # La nota habla del artículo entero o de la norma entera (p. ej. "Ley derogada por…"
        # en cada artículo del Decreto Ley 920 de 2023), no de un inciso o parágrafo.
        sobre_el_articulo = re.match(r'(?:art[íi]culo|ley|decreto(?: ley)?|norma)\b', nota) is not None
        if sobre_el_articulo and ('derogad' in nota or 'inexequible' in nota):
            # El artículo entero salió del ordenamiento (derogado o declarado inexequible).
            estado = 'derogado'
        elif estado == 'vigente' and any(p in nota for p in ('modificad', 'adicionad', 'sustituid', 'derogad', 'inexequible')):
            # Cambió el artículo o una parte (inciso, numeral, parágrafo).
            estado = 'modificado'
    texto = ANOTACION.sub(' ', texto)
    texto = re.sub(r'\s+', ' ', texto).strip()
    return texto, estado


# Pie de la compilación: se busca después del primer artículo (algunas páginas lo repiten arriba).
PIE = re.compile(
    r'Disposiciones analizadas por Avance|Avance Jur[íi]dico Casa Editorial|Las notas de vigencia, concordancias'
    r'|class="contenedor-barra-creditos"|class="contenedor-footer"',
    re.I,
)
# Firmas y fórmula final que siguen al último artículo de la norma.
FIRMAS = re.compile(
    r'\s(?:PUBL[ÍI]QUESE|COMUN[ÍI]QUESE|Dad[oa] en Bogot[áa]|El Presidente (?:del|de la)\s|El Secretario General'
    r'|REP[ÚU]BLICA DE COLOMBIA\s*-?\s*GOBIERNO NACIONAL)',
    re.I,
)


def articulos(html_pagina: str) -> list[dict]:
    primero = re.search(r'<a\b[^>]*\bname="[0-9]', html_pagina, re.I)
    if primero:
        fin = PIE.search(html_pagina, primero.start())
        if fin:
            html_pagina = html_pagina[: fin.start()]
    # Cada artículo empieza con un ancla con nombre cuyo texto es "ARTÍCULO N." (casi siempre
    # con class="bookmarkaj"; algunos, como el art. 2 del CPACA, solo con <A name="2">).
    # Se corta en toda ancla con nombre (artículos, títulos, capítulos) para que los encabezados
    # no queden pegados al artículo anterior; luego solo se conservan los artículos.
    partes = re.split(r'(?=<a\b[^>]*\bname="[^"]+")', html_pagina, flags=re.I)
    salida = []
    for i, parte in enumerate(partes[1:], start=1):
        texto, estado = limpiar(parte)
        # Las firmas solo siguen al último artículo de la página; en los demás, frases
        # como "El Presidente de la República" son texto normativo y no se cortan.
        firmas = FIRMAS.search(texto) if i == len(partes) - 1 else None
        if firmas:
            texto = texto[: firmas.start()].strip()
        texto = re.sub(r'\s*<\w*$', '', texto)
        m = re.match(r'ART[ÍI]CULO\s+([0-9]+(?:-[0-9]+)?)\s*[oOº°]?\s*\.', texto)
        if not m:
            continue  # títulos, capítulos, secciones
        if re.match(r'ART[ÍI]CULO\s+\S+\s*(?:\.\s*)?<?\s*$', texto) or len(texto) < 15:
            estado = 'derogado'
        salida.append({'numero': m.group(1), 'texto': texto, 'estado': estado})
    return salida


def descargar(id_norma: str) -> None:
    titulo, fuente, base, filtro = NORMAS[id_norma]
    pags = paginas(fuente, base)
    if not pags:
        print(f'✗ {id_norma}: no se pudo descargar')
        return
    vistos: dict[str, dict] = {}
    for _, h in pags:
        for a in articulos(h):
            if filtro and not filtro(a['numero']):
                continue
            # Si un número se repite (p. ej. textos citados), gana la primera aparición
            vistos.setdefault(a['numero'], a)
    copia = {
        'id': id_norma,
        'titulo': titulo,
        'fuentes': [u for u, _ in pags],
        'consultado': datetime.date.today().isoformat(),
        'articulos': list(vistos.values()),
    }
    ruta = DESTINO / f'{id_norma}.json'
    cambios = []
    if ruta.exists():
        anterior = {a['numero']: a['texto'] for a in json.loads(ruta.read_text(encoding='utf-8'))['articulos']}
        cambios = [a['numero'] for a in copia['articulos'] if a['numero'] in anterior and anterior[a['numero']] != a['texto']]
    ruta.write_text(json.dumps(copia, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    estados = {}
    for a in copia['articulos']:
        estados[a['estado']] = estados.get(a['estado'], 0) + 1
    print(f'✓ {id_norma}: {len(copia["articulos"])} artículos en {len(pags)} página(s) {estados}' + (f' · cambiaron: {", ".join(cambios)}' if cambios else ''))


if __name__ == '__main__':
    DESTINO.mkdir(parents=True, exist_ok=True)
    for id_norma in sys.argv[1:] or NORMAS:
        try:
            descargar(id_norma)
        except RuntimeError as e:
            print(f'✗ {id_norma}: {e}')
