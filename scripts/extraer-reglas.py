"""Extrae las filas "Verificado" de fuentes/investigacion-casos.md (sección 3) a JSON.

Uso: python3 scripts/extraer-reglas.py > /tmp/filas.json
Es una ayuda de autoría: src/content/reglas.json se revisa y edita a mano.
"""
import json, re, sys

texto = open('fuentes/investigacion-casos.md', encoding='utf-8').read()
etiquetas = {m.group(1).strip(): m.group(2) for m in re.finditer(r'\[([^\]]+)\]\((https?://[^)\s]+)\)', texto)}
SENADO = 'http://www.secretariasenado.gov.co/senado/basedoc/'

def resolver(etiqueta):
    e = etiqueta.strip()
    if e in etiquetas:
        return etiquetas[e]
    if e in ('ambos', 'ambos normogramas'):
        # Filas de aduanas cuyo texto coincide en la Ley 2586 de 2026 y el DL 920 de 2023
        return [etiquetas['normograma L. 2586'], etiquetas['normograma DL 920']]
    m = re.fullmatch(r'(?:Senado )?L\. 2220 (pr\d{3})', e)
    if m:
        return etiquetas[f'Senado L. 2220 {m.group(1)}']
    m = re.fullmatch(r'ET-pr(\d{3})', e)
    if m:
        return f'{SENADO}estatuto_tributario_pr{m.group(1)}.html'
    m = re.fullmatch(r'CPACA(?:-pr(\d{3}))?', e)
    if m:
        return f'{SENADO}ley_1437_2011' + (f'_pr{m.group(1)}' if m.group(1) else '') + '.html'
    return None

seccion = texto.split('## 3. Sustancia verificada por caso')[1].split('## 4.')[0]
casos = {'Caso A': 'A', 'Caso B': 'B', 'Caso C': 'C', 'Caso D': 'D', 'Tronco común': 'T'}
filas, sin_url, caso = [], [], None
for linea in seccion.splitlines():
    if linea.startswith('### '):
        caso = next((v for k, v in casos.items() if linea[4:].startswith(k)), None)
        continue
    if not (linea.startswith('|') and re.search(r'\|\s*Verificado', linea)):
        continue
    c = [x.strip() for x in linea.strip().strip('|').split('|')]
    regla, cita, norma, fuente = c[0], c[1], c[2], c[3]
    links = re.findall(r'\((https?://[^)\s]+)\)', fuente)
    urls = links
    if not urls:
        for parte in re.split(r'[;,]\s*', re.sub(r'\[|\]\([^)]*\)', '', fuente)):
            u = resolver(parte)
            urls += u if isinstance(u, list) else ([u] if u else [])
    if not urls:
        sin_url.append((caso, regla, fuente))
    filas.append({'caso': caso, 'regla': regla, 'cita': cita, 'norma': norma, 'urls': urls, 'fuente': fuente})
json.dump(filas, sys.stdout, ensure_ascii=False, indent=1)
print(f'\n# filas={len(filas)} sin_url={len(sin_url)}', file=sys.stderr)
for s in sin_url:
    print('  SIN URL:', s, file=sys.stderr)
