import { describe, expect, it } from 'vitest';
import { DESTINOS, destinoActivo, quitarBase } from '../src/lib/destinos';

const activo = (ruta: string, base?: string) => destinoActivo(ruta, base)?.texto;

describe('DESTINOS', () => {
  it('son seis y en el orden acordado', () => {
    expect(DESTINOS.map((d) => d.texto)).toEqual(['Inicio', 'La prueba', 'Normativa', 'Convocatoria', 'Repasar', 'Mi plan']);
  });

  it('las etiquetas cortas de la barra inferior', () => {
    expect(DESTINOS.map((d) => d.corto)).toEqual(['Inicio', 'Prueba', 'Normas', 'Concurso', 'Repasar', 'Mi plan']);
  });
});

describe('destinoActivo', () => {
  it('las subpáginas de la prueba activan La prueba', () => {
    expect(activo('/prueba/dia')).toBe('La prueba');
    expect(activo('/prueba/practicar/')).toBe('La prueba');
  });

  it('el plan, el selector y las páginas de un plan activan Mi plan', () => {
    expect(activo('/plan')).toBe('Mi plan');
    expect(activo('/plan/elegir')).toBe('Mi plan');
    expect(activo('/planes/caso-b-cobranzas/')).toBe('Mi plan');
  });

  it('las subpáginas de Repasar activan Repasar', () => {
    expect(activo('/repasar')).toBe('Repasar');
    expect(activo('/repasar/quiz')).toBe('Repasar');
    expect(activo('/nata-dian/repasar/mis-tarjetas/', '/nata-dian')).toBe('Repasar');
  });

  it('la raíz solo activa Inicio y Fuentes no activa nada', () => {
    expect(activo('/')).toBe('Inicio');
    expect(activo('/fuentes')).toBeUndefined();
  });

  it('no confunde prefijos parecidos', () => {
    expect(activo('/pruebas')).toBeUndefined();
    expect(activo('/planeta')).toBeUndefined();
  });

  it('funciona con el base de GitHub Pages', () => {
    expect(activo('/nata-dian/', '/nata-dian')).toBe('Inicio');
    expect(activo('/nata-dian', '/nata-dian/')).toBe('Inicio');
    expect(activo('/nata-dian/prueba/dia/', '/nata-dian')).toBe('La prueba');
    expect(activo('/nata-dian/planes/por-defecto', '/nata-dian/')).toBe('Mi plan');
  });
});

describe('quitarBase', () => {
  it('no toca rutas que no empiezan por el base', () => {
    expect(quitarBase('/otra/ruta', '/nata-dian')).toBe('/otra/ruta');
  });
});
