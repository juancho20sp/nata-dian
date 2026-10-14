"""Propone el índice de artículos (src/content/indice-normas.json) a partir de las copias.

Uso: python3 scripts/indexar-normas.py

Para cada artículo de cada copia en fuentes/normas/ propone un tema (el epígrafe del
artículo) y un nivel:
  1 = decide casos (términos, competencias, recursos, nulidades, caducidad, prescripción, sanciones)
  2 = contexto
  3 = no se estudia (derogado, vigencia y derogatorias)
El nivel 1 sale de la selección manual (scripts/seleccion-nivel1.json); en las entradas que
ya existen se conservan el tema y la razón, que pueden estar editados a mano. Se informa de
las entradas que sobran.
"""

import json
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
COPIAS = RAIZ / 'fuentes' / 'normas'
INDICE = RAIZ / 'src' / 'content' / 'indice-normas.json'
SELECCION = RAIZ / 'scripts' / 'seleccion-nivel1.json'

# Señales de nivel 1 en el texto del artículo
TERMINO = re.compile(
    r'\b(?:dentro de los?|en el t[ée]rmino de|a m[áa]s tardar|t[ée]rmino de|plazo de)\b[^.]{0,60}?'
    r'\b(?:d[íi]as?|meses?|a[ñn]os?|horas?)\b',
    re.I,
)
CONSECUENCIA = re.compile(
    r'\b(?:caduca|caducidad|prescrib|prescripci[óo]n|silencio administrativo|recurso de|procede[nr]? (?:el|la|los|únicamente)'
    r'|ser[áa]n? nul|nulidad|sanci[óo]n de|multa de|se entender[áa]|ejecutori|firmeza|quedar[áa] en firme|impedido|inhabilidad)',
    re.I,
)
NIVEL_3_TEMA = re.compile(r'\b(?:VIGENCIA|DEROGATORIAS?|DEROGA|TR[ÁA]NSITO DE LEGISLACI[ÓO]N)\b', re.I)


def tema(texto: str) -> str:
    """Epígrafe del artículo: lo que sigue a "ARTÍCULO N." hasta el primer punto."""
    m = re.match(r'ART[ÍI]CULO\s+[0-9]+(?:-[0-9]+)?\s*[oOº°]?\s*\.\s*([^.]{3,160})\.', texto)
    if not m:
        return ''
    t = m.group(1).strip()
    # Los epígrafes vienen en mayúsculas: se dejan en frase normal
    return t[:1] + t[1:].lower() if t.isupper() else t


def nivel(articulo: dict, tema_: str, seleccion: set[str] | None = None) -> int:
    """Nivel propuesto. Con selección manual, nivel 1 es solo lo seleccionado; sin ella, la heurística."""
    if articulo['estado'] == 'derogado' or NIVEL_3_TEMA.search(tema_):
        return 3
    if seleccion is not None:
        return 1 if articulo['numero'] in seleccion else 2
    if TERMINO.search(articulo['texto']) or CONSECUENCIA.search(articulo['texto']):
        return 1
    return 2


def main() -> None:
    actual = json.loads(INDICE.read_text(encoding='utf-8')) if INDICE.exists() else []
    seleccion = json.loads(SELECCION.read_text(encoding='utf-8')) if SELECCION.exists() else {}
    clave = lambda e: (e['norma'], e['numero'])  # noqa: E731
    existentes = {clave(e): e for e in actual}
    nuevo, vistos = [], set()
    for archivo in sorted(COPIAS.glob('*.json')):
        copia = json.loads(archivo.read_text(encoding='utf-8'))
        sel = set(seleccion[copia['id']]) if copia['id'] in seleccion else None
        if sel is None:
            print(f'⚠ {copia["id"]}: sin selección manual de nivel 1; se usa la heurística (revisar)')
        else:
            numeros = {a['numero'] for a in copia['articulos']}
            for n in sorted(sel - numeros):
                print(f'⚠ {copia["id"]}: el art. {n} seleccionado no está en la copia')
        for a in copia['articulos']:
            k = (copia['id'], a['numero'])
            vistos.add(k)
            t = tema(a['texto'])
            if k in existentes:
                # Se conservan tema y razón (pueden estar editados a mano); el nivel lo fija la selección.
                e = dict(existentes[k])
                if sel is not None:
                    e['nivel'] = nivel(a, t, sel)
                nuevo.append(e)
                continue
            nuevo.append({'id': f'{copia["id"]}:{a["numero"]}', 'norma': copia['id'], 'numero': a['numero'], 'nivel': nivel(a, t, sel), 'tema': t or f'Artículo {a["numero"]}'})
    sobran = [k for k in existentes if k not in vistos]
    INDICE.write_text(json.dumps(nuevo, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    conteo: dict[str, dict[int, int]] = {}
    for e in nuevo:
        conteo.setdefault(e['norma'], {1: 0, 2: 0, 3: 0})[e['nivel']] += 1
    for n, c in conteo.items():
        print(f'{n:20} nivel 1: {c[1]:4}  nivel 2: {c[2]:4}  nivel 3: {c[3]:4}')
    if sobran:
        print('Entradas del índice sin artículo en las copias (revisar):', sobran[:20])


if __name__ == '__main__':
    main()
