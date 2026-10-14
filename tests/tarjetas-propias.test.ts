import { describe, expect, it } from 'vitest';
import { CLAVES } from '../src/lib/almacen';
import { crear, MAX_CARACTERES, nuevoId, propiasValidas, validar } from '../src/lib/tarjetas-propias';

describe('validar y crear', () => {
  it('rechaza frente o reverso vacíos, con un mensaje por campo', () => {
    expect(validar('  ', 'x').errores).toEqual({ frente: 'Escriba la pregunta del frente.' });
    expect(validar('x', '').errores).toEqual({ reverso: 'Escriba la respuesta del reverso.' });
    expect(crear('', '')).toEqual({ errores: { frente: expect.any(String), reverso: expect.any(String) } });
  });

  it('recorta espacios y limita a 300 caracteres', () => {
    const t = crear('  ¿Término para fallar?  ', 'a'.repeat(400), 'propia-x');
    expect(t).toEqual({ id: 'propia-x', frente: '¿Término para fallar?', reverso: 'a'.repeat(MAX_CARACTERES) });
  });

  it('genera ids con prefijo propia-', () => {
    expect(nuevoId(1_700_000_000_000, () => 0.5)).toMatch(/^propia-[a-z0-9]+-[a-z0-9]{4}$/);
  });
});

describe('propiasValidas', () => {
  it('descarta datos corruptos', () => {
    expect(propiasValidas([{ id: 'propia-1', frente: 'a', reverso: 'b' }, { id: 'tc-x', frente: 'a', reverso: 'b' }, null, 3])).toEqual([
      { id: 'propia-1', frente: 'a', reverso: 'b' },
    ]);
    expect(propiasValidas('nada')).toEqual([]);
  });
});

describe('claves de almacenamiento', () => {
  it('las claves existentes no cambian', () => {
    expect(CLAVES.plan).toBe('dian2676:plan');
    expect(CLAVES.tema).toBe('dian2676:tema');
    expect(CLAVES.progreso('por-defecto')).toBe('dian2676:progreso:por-defecto');
  });

  it('las nuevas usan el mismo prefijo y no chocan', () => {
    const nuevas = [CLAVES.tarjetasEstado, CLAVES.tarjetasPropias, CLAVES.repasoMeta, CLAVES.repasoDias];
    for (const c of nuevas) expect(c.startsWith('dian2676:')).toBe(true);
    expect(new Set(nuevas).size).toBe(4);
  });
});
