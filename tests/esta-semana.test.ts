import { describe, expect, it } from 'vitest';
import { clavePanel, panelDeHoy } from '../src/lib/esta-semana';

const semanas = [
  { id: 's1', inicio: '2026-10-12', fin: '2026-10-18' },
  { id: 's2', inicio: '2026-10-19', fin: '2026-10-25' },
  { id: 's3', inicio: '2026-10-26', fin: '2026-11-01' },
  { id: 's4', inicio: '2026-11-02', fin: '2026-11-07' },
];
const en = (iso: string) => panelDeHoy(semanas, new Date(iso));

describe('panelDeHoy', () => {
  it('antes del 12 de octubre el plan no ha empezado', () => {
    expect(en('2026-10-11T20:00:00-05:00')).toEqual({ tipo: 'antes' });
  });

  it('el 12 de octubre es la semana 1, lunes', () => {
    expect(en('2026-10-12T07:00:00-05:00')).toEqual({ tipo: 'semana', id: 's1', indice: 0, domingo: false });
  });

  it('el 21 de octubre es la semana 2', () => {
    expect(clavePanel(en('2026-10-21T12:00:00-05:00'))).toBe('semana:s2');
  });

  it('el domingo 25 de octubre marca simulacro', () => {
    expect(en('2026-10-25T09:00:00-05:00')).toMatchObject({ tipo: 'semana', id: 's2', domingo: true });
  });

  it('el domingo en Colombia sigue siendo domingo aunque en UTC ya sea lunes', () => {
    expect(en('2026-10-26T03:00:00Z')).toMatchObject({ id: 's2', domingo: true });
  });

  it('el 8 de noviembre es el día de la prueba, también antes de las 8:00', () => {
    expect(en('2026-11-08T06:00:00-05:00')).toEqual({ tipo: 'prueba' });
    expect(en('2026-11-08T23:59:00-05:00')).toEqual({ tipo: 'prueba' });
  });

  it('desde el 9 de noviembre la prueba ya pasó', () => {
    expect(en('2026-11-09T00:00:00-05:00')).toEqual({ tipo: 'despues' });
  });

  it('un hueco entre semanas se informa', () => {
    expect(panelDeHoy([semanas[0]!, semanas[2]!], new Date('2026-10-21T12:00:00-05:00'))).toEqual({ tipo: 'hueco' });
  });
});
