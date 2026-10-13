import { describe, expect, it } from 'vitest';
import { planDestino } from '../src/lib/plan-elegido';

const seleccionables = ['por-defecto', 'caso-a-fiscalizacion', 'caso-b-cobranzas'];

describe('planDestino', () => {
  it('lleva al plan guardado si existe', () => {
    expect(planDestino('caso-b-cobranzas', seleccionables)).toBe('caso-b-cobranzas');
  });

  it('sin elección o con un valor raro lleva al plan por defecto', () => {
    expect(planDestino(null, seleccionables)).toBe('por-defecto');
    expect(planDestino(42, seleccionables)).toBe('por-defecto');
    expect(planDestino('caso-z-inexistente', seleccionables)).toBe('por-defecto');
  });

  it('el tronco común no es seleccionable', () => {
    expect(planDestino('tronco-comun', seleccionables)).toBe('por-defecto');
  });
});
