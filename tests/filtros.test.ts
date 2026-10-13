import { describe, expect, it } from 'vitest';
import { areaVisible, empleoDeLaUrl, recursoVisible, tiposDeEmpleo } from '../src/lib/filtros';

const areas = [
  { id: 'transversal', empleos: ['Todos'] },
  { id: 'cobro', empleos: ['Recaudo y cobranzas'] },
  { id: 'tributario', empleos: ['Fiscalización', 'Gestión masiva'] },
];
const visibles = (empleo: string | null) => areas.filter((a) => areaVisible(a.empleos, empleo)).map((a) => a.id);

describe('areaVisible', () => {
  it('sin filtro se ven todas', () => {
    expect(visibles(null)).toEqual(['transversal', 'cobro', 'tributario']);
  });

  it('un área de "Todos" aparece con cualquier empleo', () => {
    expect(visibles('Recaudo y cobranzas')).toEqual(['transversal', 'cobro']);
    expect(visibles('Fiscalización')).toEqual(['transversal', 'tributario']);
  });

  it('un empleo desconocido muestra solo las áreas comunes', () => {
    expect(visibles('Inexistente')).toEqual(['transversal']);
  });
});

describe('tiposDeEmpleo', () => {
  it('quita "Todos", no repite y ordena en español', () => {
    expect(tiposDeEmpleo([...areas, { empleos: ['Fiscalización', 'Asuntos disciplinarios'] }])).toEqual([
      'Asuntos disciplinarios',
      'Fiscalización',
      'Gestión masiva',
      'Recaudo y cobranzas',
    ]);
  });
});

describe('empleoDeLaUrl', () => {
  const tipos = ['Fiscalización', 'Recaudo y cobranzas'];

  it('acepta un tipo conocido, también con espacios y tildes codificados', () => {
    expect(empleoDeLaUrl('?empleo=Recaudo+y+cobranzas', tipos)).toBe('Recaudo y cobranzas');
    expect(empleoDeLaUrl('?empleo=Fiscalizaci%C3%B3n', tipos)).toBe('Fiscalización');
  });

  it('ignora valores desconocidos o vacíos', () => {
    expect(empleoDeLaUrl('?empleo=Otro', tipos)).toBeNull();
    expect(empleoDeLaUrl('?empleo=', tipos)).toBeNull();
    expect(empleoDeLaUrl('', tipos)).toBeNull();
  });
});

describe('recursoVisible', () => {
  it('"Solo oficiales" oculta los no oficiales; "Todos" los muestra', () => {
    expect(recursoVisible(false, 'oficiales')).toBe(false);
    expect(recursoVisible(true, 'oficiales')).toBe(true);
    expect(recursoVisible(false, 'todos')).toBe(true);
  });
});
