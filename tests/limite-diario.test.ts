import { describe, expect, it } from 'vitest';
import { iniciadasHoy, limiteValido, nuevasIntercaladas, responder, seleccionDelDia, type Estados } from '../src/lib/repaso';

const mazos = ['A', 'B', 'C', 'D', 'E'];
const tarjetas = mazos.flatMap((m) => Array.from({ length: 20 }, (_, i) => ({ id: `${m}${i}`, mazo: m })));
const HOY = '2026-10-20';

describe('límite diario de tarjetas nuevas', () => {
  it('primera visita: 25 nuevas de mazos intercalados', () => {
    const hoy = seleccionDelDia(tarjetas, {}, HOY, 25);
    expect(hoy).toHaveLength(25);
    // Intercaladas: cada bloque de 5 tiene un mazo de cada tipo
    for (let i = 0; i < 25; i += 5) expect(new Set(hoy.slice(i, i + 5).map((t) => t.mazo)).size).toBe(5);
  });

  it('el orden de las nuevas es el mismo durante el día y cambia de un día a otro', () => {
    const a = nuevasIntercaladas(tarjetas, {}, HOY).map((t) => t.id);
    expect(nuevasIntercaladas(tarjetas, {}, HOY).map((t) => t.id)).toEqual(a);
    expect(nuevasIntercaladas(tarjetas, {}, '2026-10-21').map((t) => t.id)).not.toEqual(a);
  });

  it('agotado el límite, solo quedan las que tienen historial y tocan hoy', () => {
    const estados: Estados = {};
    const primeras = seleccionDelDia(tarjetas, {}, HOY, 25);
    for (const t of primeras) estados[t.id] = responder(undefined, true, HOY);
    expect(iniciadasHoy(estados, HOY)).toBe(25);
    // 8 tarjetas viejas (no tocadas hoy) que vencen hoy
    const viejas = tarjetas.filter((t) => !primeras.includes(t)).slice(0, 8).map((t) => t.id);
    for (const id of viejas) estados[id] = { caja: 2, proxima: HOY, inicio: '2026-10-15' };
    const siguiente = seleccionDelDia(tarjetas, estados, HOY, 25);
    expect(siguiente.map((t) => t.id).sort()).toEqual([...viejas].sort());
  });

  it('los estados viejos sin fecha de inicio no consumen el cupo de hoy', () => {
    const estados: Estados = { A0: { caja: 3, proxima: '2026-10-25' } };
    expect(iniciadasHoy(estados, HOY)).toBe(0);
    expect(seleccionDelDia(tarjetas, estados, HOY, 10)).toHaveLength(10);
  });

  it('las tarjetas exentas (propias) entran aunque se haya agotado el límite', () => {
    const conPropias = [...tarjetas, { id: 'propia-1', mazo: 'Mis tarjetas' }];
    const estados: Estados = Object.fromEntries(tarjetas.slice(0, 10).map((t) => [t.id, { caja: 2, proxima: '2026-10-30', inicio: HOY }]));
    const hoy = seleccionDelDia(conPropias, estados, HOY, 10, new Set(['propia-1']));
    expect(hoy.map((t) => t.id)).toEqual(['propia-1']);
  });

  it('responder guarda la fecha de inicio solo la primera vez', () => {
    const primero = responder(undefined, true, HOY);
    expect(primero.inicio).toBe(HOY);
    expect(responder(primero, true, '2026-10-22').inicio).toBe(HOY);
    expect(responder({ caja: 2, proxima: HOY }, true, HOY).inicio).toBeUndefined();
  });

  it('límite válido: 10, 25 o 50; cualquier otra cosa es 25', () => {
    expect(limiteValido(50)).toBe(50);
    expect(limiteValido(30)).toBe(25);
  });
});
