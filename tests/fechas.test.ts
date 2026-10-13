import { describe, expect, it } from 'vitest';
import {
  FIN_PRUEBA,
  INICIO_PRUEBA,
  cuentaRegresiva,
  fasePrueba,
  fechaConAnio,
  diaDeLaSemana,
  fechaEnColombia,
  rangoLegible,
  semanaActual,
  sumarDias,
} from '../src/lib/fechas';

const semanas = [
  { id: 's1', inicio: '2026-10-12', fin: '2026-10-18' },
  { id: 's2', inicio: '2026-10-19', fin: '2026-10-25' },
  { id: 's3', inicio: '2026-10-26', fin: '2026-11-01' },
  { id: 's4', inicio: '2026-11-02', fin: '2026-11-07' },
];

describe('fechaEnColombia', () => {
  it('usa la hora de Colombia y no la UTC', () => {
    // 2026-10-19 03:00 UTC = 2026-10-18 22:00 en Colombia
    expect(fechaEnColombia(new Date('2026-10-19T03:00:00Z'))).toBe('2026-10-18');
    // 2026-10-19 05:00 UTC = 2026-10-19 00:00 en Colombia
    expect(fechaEnColombia(new Date('2026-10-19T05:00:00Z'))).toBe('2026-10-19');
  });

  it('no depende de la zona horaria con que se construye el instante', () => {
    // El mismo instante expresado desde Madrid (UTC+2 en octubre)
    expect(fechaEnColombia(new Date('2026-10-19T04:30:00+02:00'))).toBe('2026-10-18');
  });
});

describe('semanaActual', () => {
  it('devuelve "antes" si el plan no ha empezado', () => {
    const r = semanaActual(semanas, new Date('2026-10-11T23:59:00-05:00'));
    expect(r.estado).toBe('antes');
  });

  it('el primer minuto del 12 de octubre en Colombia es la semana 1', () => {
    const r = semanaActual(semanas, new Date('2026-10-12T00:00:00-05:00'));
    expect(r).toMatchObject({ estado: 'durante', indice: 0, semana: { id: 's1' } });
  });

  it('el domingo 18 a las 11 p. m. en Colombia sigue en la semana 1 aunque en UTC ya sea lunes', () => {
    const r = semanaActual(semanas, new Date('2026-10-19T04:00:00Z'));
    expect(r).toMatchObject({ estado: 'durante', semana: { id: 's1' } });
  });

  it('una semana que cruza de mes se reconoce', () => {
    const r = semanaActual(semanas, new Date('2026-11-01T12:00:00-05:00'));
    expect(r).toMatchObject({ estado: 'durante', semana: { id: 's3' } });
  });

  it('el sábado 7 de noviembre es la última semana', () => {
    const r = semanaActual(semanas, new Date('2026-11-07T20:00:00-05:00'));
    expect(r).toMatchObject({ estado: 'durante', semana: { id: 's4' } });
  });

  it('el día de la prueba ya está después del plan', () => {
    const r = semanaActual(semanas, INICIO_PRUEBA);
    expect(r.estado).toBe('despues');
  });

  it('detecta huecos entre semanas', () => {
    const conHueco = [semanas[0]!, semanas[2]!];
    expect(semanaActual(conHueco, new Date('2026-10-21T12:00:00-05:00')).estado).toBe('hueco');
  });
});

describe('cuentaRegresiva', () => {
  it('la prueba empieza a las 8:00 a. m. hora de Colombia (13:00 UTC)', () => {
    expect(INICIO_PRUEBA.toISOString()).toBe('2026-11-08T13:00:00.000Z');
  });

  it('calcula días y horas restantes', () => {
    const r = cuentaRegresiva(new Date('2026-10-13T08:00:00-05:00'));
    expect(r).toEqual({ terminada: false, dias: 26, horas: 0, minutos: 0, segundos: 0 });
  });

  it('cuenta en hora de Colombia aunque el instante venga en otra zona', () => {
    // 2026-11-07 20:30 en Bogotá = 2026-11-08 01:30 UTC → faltan 11 h 30 min
    const r = cuentaRegresiva(new Date('2026-11-08T01:30:00Z'));
    expect(r).toMatchObject({ terminada: false, dias: 0, horas: 11, minutos: 30 });
  });

  it('a la hora exacta de inicio está terminada', () => {
    expect(cuentaRegresiva(INICIO_PRUEBA).terminada).toBe(true);
    expect(cuentaRegresiva(new Date('2026-11-09T00:00:00-05:00')).terminada).toBe(true);
  });

  it('un segundo antes no está terminada', () => {
    const r = cuentaRegresiva(new Date(INICIO_PRUEBA.getTime() - 1000));
    expect(r).toEqual({ terminada: false, dias: 0, horas: 0, minutos: 0, segundos: 1 });
  });
});

describe('fasePrueba', () => {
  it('está pendiente hasta las 8:00 a. m. de Colombia', () => {
    expect(fasePrueba(new Date('2026-11-08T07:59:59-05:00'))).toBe('pendiente');
  });

  it('está en curso de 8:00 a. m. a 1:00 p. m. de Colombia', () => {
    expect(fasePrueba(INICIO_PRUEBA)).toBe('en-curso');
    expect(fasePrueba(new Date('2026-11-08T17:59:00Z'))).toBe('en-curso');
    expect(FIN_PRUEBA.toISOString()).toBe('2026-11-08T18:00:00.000Z');
  });

  it('termina a la 1:00 p. m. de Colombia', () => {
    expect(fasePrueba(FIN_PRUEBA)).toBe('terminada');
  });
});

describe('utilidades de calendario', () => {
  it('formatea la fecha de actualización con el año', () => {
    expect(fechaConAnio('2026-10-12')).toBe('12 de octubre de 2026');
  });

  it('suma días cruzando de mes', () => {
    expect(sumarDias('2026-10-31', 1)).toBe('2026-11-01');
  });

  it('el 12 de octubre de 2026 es lunes y el 8 de noviembre es domingo', () => {
    expect(diaDeLaSemana('2026-10-12')).toBe(1);
    expect(diaDeLaSemana('2026-11-08')).toBe(0);
  });

  it('formatea rangos en español', () => {
    expect(rangoLegible('2026-10-12', '2026-10-18')).toBe('12 al 18 de octubre');
    expect(rangoLegible('2026-10-26', '2026-11-01')).toBe('26 de octubre al 1 de noviembre');
  });
});
