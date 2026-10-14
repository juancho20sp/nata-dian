import { describe, expect, it } from 'vitest';
import { fechaEnColombia } from '../src/lib/fechas';
import { estadosVigentes, limitarAntesDeLaPrueba, responder, resumenMazo, tocaHoy } from '../src/lib/repaso';

describe('responder', () => {
  it('acertar el 20-oct una tarjeta de la caja 2 la sube a la 3 y vuelve el 24-oct', () => {
    expect(responder({ caja: 2, proxima: '2026-10-20' }, true, '2026-10-20')).toEqual({ caja: 3, proxima: '2026-10-24' });
  });

  it('fallar una tarjeta de la caja 4 la devuelve a la caja 1 y vuelve al día siguiente', () => {
    expect(responder({ caja: 4, proxima: '2026-10-20' }, false, '2026-10-20')).toEqual({ caja: 1, proxima: '2026-10-21' });
  });

  it('una tarjeta sin estado que se acierta pasa a la caja 2', () => {
    expect(responder(undefined, true, '2026-10-13')).toEqual({ caja: 2, proxima: '2026-10-15' });
  });

  it('la caja 5 no sube más', () => {
    expect(responder({ caja: 5, proxima: '2026-10-13' }, true, '2026-10-13').caja).toBe(5);
  });

  it('el 30-oct, caja 4 a 5 (14 días) vuelve el 5-nov', () => {
    expect(responder({ caja: 4, proxima: '2026-10-30' }, true, '2026-10-30')).toEqual({ caja: 5, proxima: '2026-11-05' });
  });

  it('usa la fecha de Colombia: 11:30 p. m. del 20-oct en Bogotá sigue siendo el 20', () => {
    const hoy = fechaEnColombia(new Date('2026-10-21T04:30:00Z'));
    expect(hoy).toBe('2026-10-20');
    expect(responder({ caja: 1, proxima: hoy }, false, hoy).proxima).toBe('2026-10-21');
  });
});

describe('limitarAntesDeLaPrueba', () => {
  it('no toca fechas hasta el 7-nov', () => {
    expect(limitarAntesDeLaPrueba('2026-11-07', '2026-11-03')).toBe('2026-11-07');
  });

  it('después del 5-nov, una fecha que pasaría del 7 vuelve hoy', () => {
    expect(limitarAntesDeLaPrueba('2026-11-08', '2026-11-06')).toBe('2026-11-06');
    expect(responder({ caja: 3, proxima: '2026-11-06' }, true, '2026-11-06').proxima).toBe('2026-11-06');
  });
});

describe('tocaHoy y resumenMazo', () => {
  it('sin estado toca hoy; con fecha futura no', () => {
    expect(tocaHoy(undefined, '2026-10-20')).toBe(true);
    expect(tocaHoy({ caja: 2, proxima: '2026-10-20' }, '2026-10-20')).toBe(true);
    expect(tocaHoy({ caja: 2, proxima: '2026-10-21' }, '2026-10-20')).toBe(false);
  });

  it('cuenta total, para hoy y dominadas', () => {
    const estados = { a: { caja: 5, proxima: '2026-10-30' }, b: { caja: 2, proxima: '2026-10-19' } };
    expect(resumenMazo(['a', 'b', 'c'], estados, '2026-10-20')).toEqual({ total: 3, paraHoy: 2, dominadas: 1 });
  });
});

describe('estadosVigentes', () => {
  it('descarta tarjetas que ya no existen y datos corruptos', () => {
    const guardados = { a: { caja: 3, proxima: '2026-10-22' }, vieja: { caja: 2, proxima: '2026-10-22' }, b: { caja: 9, proxima: 'x' }, c: 'basura' };
    expect(estadosVigentes(guardados, ['a', 'b', 'c'])).toEqual({ a: { caja: 3, proxima: '2026-10-22' } });
    expect(estadosVigentes(null, ['a'])).toEqual({});
  });
});
