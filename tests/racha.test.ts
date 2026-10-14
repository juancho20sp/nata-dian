import { describe, expect, it } from 'vitest';
import { fechaEnColombia } from '../src/lib/fechas';
import { avanceDeHoy, metaValida, racha, sumar, type Registro } from '../src/lib/racha';

const META = 20;
const cumplidos = (...dias: string[]): Registro => Object.fromEntries(dias.map((d) => [`2026-10-${d}`, META]));

describe('racha (escenarios de la spec)', () => {
  it('días seguidos: 19, 20 y 21 → 3', () => {
    expect(racha(cumplidos('19', '20', '21'), META, '2026-10-21')).toEqual({ dias: 3, graciaUsada: false });
  });

  it('un día perdido en la semana: 19, 21, 22 → 3, con día de gracia', () => {
    expect(racha(cumplidos('19', '21', '22'), META, '2026-10-22')).toEqual({ dias: 3, graciaUsada: true });
  });

  it('dos días perdidos seguidos: 19, 22 → 1', () => {
    expect(racha(cumplidos('19', '22'), META, '2026-10-22').dias).toBe(1);
  });

  it('dos huecos sueltos en la semana: 19, 21, 23 → 2', () => {
    expect(racha(cumplidos('19', '21', '23'), META, '2026-10-23').dias).toBe(2);
  });

  it('hoy aún sin cumplir: 20 y 21 cumplidos, hoy 22 con 5 → 2', () => {
    expect(racha({ ...cumplidos('20', '21'), '2026-10-22': 5 }, META, '2026-10-22').dias).toBe(2);
  });
});

describe('racha (bordes)', () => {
  it('sin registro es 0', () => {
    expect(racha({}, META, '2026-10-20')).toEqual({ dias: 0, graciaUsada: false });
  });

  it('un hueco en cada semana se perdona por separado', () => {
    // Semana del 12: cumple 16, falla 17, cumple 18. Semana del 19: cumple 19, falla 20, cumple 21.
    expect(racha(cumplidos('16', '18', '19', '21'), META, '2026-10-21')).toEqual({ dias: 4, graciaUsada: true });
  });

  it('el día de gracia de una semana anterior no marca graciaUsada esta semana', () => {
    expect(racha(cumplidos('16', '18', '19', '20'), META, '2026-10-20')).toEqual({ dias: 4, graciaUsada: false });
  });

  it('ayer sin cumplir y hoy sin cumplir → 0', () => {
    expect(racha(cumplidos('18'), META, '2026-10-20').dias).toBe(0);
  });

  it('respeta la meta elegida', () => {
    const r = { '2026-10-19': 15, '2026-10-20': 15 };
    expect(racha(r, 10, '2026-10-20').dias).toBe(2);
    expect(racha(r, 20, '2026-10-20').dias).toBe(0);
  });
});

describe('meta diaria', () => {
  it('suma al día de hoy y el cambio de día en Colombia empieza en 0', () => {
    let r = sumar({}, '2026-10-20', 12);
    expect(avanceDeHoy(r, '2026-10-20')).toBe(12);
    // 23:30 del 20 en Bogotá ya es 21 en UTC, pero sigue siendo el 20
    expect(fechaEnColombia(new Date('2026-10-21T04:30:00Z'))).toBe('2026-10-20');
    expect(avanceDeHoy(r, fechaEnColombia(new Date('2026-10-21T06:00:00Z')))).toBe(0);
    r = sumar(r, '2026-10-20');
    expect(avanceDeHoy(r, '2026-10-20')).toBe(13);
  });

  it('descarta días de hace más de 60 días', () => {
    const r = sumar({ '2026-08-01': 20, '2026-10-01': 20 }, '2026-10-20');
    expect(Object.keys(r).sort()).toEqual(['2026-10-01', '2026-10-20']);
  });

  it('meta válida: 10, 20 o 30; cualquier otra cosa es 20', () => {
    expect(metaValida(30)).toBe(30);
    expect(metaValida(25)).toBe(20);
    expect(metaValida('10')).toBe(20);
  });
});
