import { describe, expect, it } from 'vitest';
import { filtrarVigentes, resumir } from '../src/lib/progreso';

describe('filtrarVigentes', () => {
  const vigentes = ['semana:s1', 'semana:s2', 'tarea:a-uno'];

  it('descarta ids que ya no existen en el plan', () => {
    expect(filtrarVigentes(['semana:s1', 'tarea:renombrada'], vigentes)).toEqual(['semana:s1']);
  });

  it('tolera datos corruptos y duplicados', () => {
    expect(filtrarVigentes('basura', vigentes)).toEqual([]);
    expect(filtrarVigentes(null, vigentes)).toEqual([]);
    expect(filtrarVigentes(['semana:s2', 3, 'semana:s2'], vigentes)).toEqual(['semana:s2']);
  });
});

describe('resumir', () => {
  it('calcula el porcentaje redondeado', () => {
    expect(resumir(2, 7)).toEqual({ hechos: 2, total: 7, porcentaje: 29 });
  });

  it('un plan vacío no divide por cero', () => {
    expect(resumir(0, 0).porcentaje).toBe(0);
  });
});
