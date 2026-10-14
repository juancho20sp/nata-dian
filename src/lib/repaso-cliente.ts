/**
 * Estado de Repasar en el navegador: tarjetas del dossier (incrustadas en la página
 * por DatosTarjetas.astro), tarjetas propias, cajas, meta y registro de días.
 * Si localStorage falla, todo sigue funcionando en memoria durante la sesión.
 */
import { CLAVES, almacenDisponible, escribir, leer } from './almacen';
import { FECHA_PRUEBA, fechaEnColombia } from './fechas';
import { avanceDeHoy, metaValida, racha, sumar, type Meta, type Racha, type Registro } from './racha';
import { estadosVigentes, responder, tocaHoy, type Estados } from './repaso';
import { MAZO_PROPIAS, propiasValidas, type TarjetaPropia } from './tarjetas-propias';

export interface Tarjeta {
  id: string;
  mazo: string;
  frente: string;
  reverso: string;
  quiz: boolean;
  /** Página y sección de donde sale (solo tarjetas del dossier). */
  enlace?: string;
  /** Norma y artículo, URL del texto oficial y aviso de vigencia (solo tarjetas de reglas). */
  norma?: string;
  urlOficial?: string;
  aviso?: string;
}

export interface EstadoRepaso {
  dossier: Tarjeta[];
  propias: TarjetaPropia[];
  estados: Estados;
  registro: Registro;
  meta: Meta;
  /** false si el navegador no guarda nada. */
  guarda: boolean;
}

export function hoy(): string {
  return fechaEnColombia(new Date());
}

/** Después del día de la prueba, la meta y la racha dejan de mostrarse. */
export function pasoLaPrueba(dia: string = hoy()): boolean {
  return dia > FECHA_PRUEBA;
}

function leerDossier(): Tarjeta[] {
  try {
    const datos = JSON.parse(document.getElementById('datos-tarjetas')?.textContent ?? '[]');
    return Array.isArray(datos) ? (datos as Tarjeta[]) : [];
  } catch {
    return [];
  }
}

export function cargar(): EstadoRepaso {
  const dossier = leerDossier();
  const propias = propiasValidas(leer<unknown>(CLAVES.tarjetasPropias, []));
  const ids = [...dossier.map((t) => t.id), ...propias.map((t) => t.id)];
  const registroGuardado = leer<unknown>(CLAVES.repasoDias, {});
  return {
    dossier,
    propias,
    estados: estadosVigentes(leer<unknown>(CLAVES.tarjetasEstado, {}), ids),
    registro: registroGuardado && typeof registroGuardado === 'object' ? (registroGuardado as Registro) : {},
    meta: metaValida(leer<unknown>(CLAVES.repasoMeta, null)),
    guarda: almacenDisponible(),
  };
}

/** Tarjetas del dossier más las propias (mazo "Mis tarjetas", nunca en el quiz). */
export function todas(e: EstadoRepaso): Tarjeta[] {
  return [...e.dossier, ...e.propias.map((p) => ({ ...p, mazo: MAZO_PROPIAS, quiz: false }))];
}

export function paraHoy(e: EstadoRepaso, dia: string = hoy()): Tarjeta[] {
  return todas(e).filter((t) => tocaHoy(e.estados[t.id], dia));
}

/** Respuesta en Tarjetas: mueve la tarjeta de caja y suma 1 a la meta de hoy. */
export function responderTarjeta(e: EstadoRepaso, id: string, sabia: boolean, dia: string = hoy()): void {
  e.estados[id] = responder(e.estados[id], sabia, dia);
  e.registro = sumar(e.registro, dia);
  escribir(CLAVES.tarjetasEstado, e.estados);
  escribir(CLAVES.repasoDias, e.registro);
}

/** Respuesta en el quiz: si falló, la tarjeta vuelve a la caja 1; siempre suma 1 a la meta. */
export function responderQuiz(e: EstadoRepaso, id: string, acerto: boolean, dia: string = hoy()): void {
  if (!acerto) {
    e.estados[id] = responder(e.estados[id], false, dia);
    escribir(CLAVES.tarjetasEstado, e.estados);
  }
  e.registro = sumar(e.registro, dia);
  escribir(CLAVES.repasoDias, e.registro);
}

export function guardarMeta(e: EstadoRepaso, meta: Meta): void {
  e.meta = meta;
  escribir(CLAVES.repasoMeta, meta);
}

export function guardarPropias(e: EstadoRepaso, propias: TarjetaPropia[]): void {
  e.propias = propias;
  escribir(CLAVES.tarjetasPropias, propias);
  // Borrar una tarjeta propia borra también su estado.
  const vigentes = new Set([...e.dossier.map((t) => t.id), ...propias.map((t) => t.id)]);
  for (const id of Object.keys(e.estados)) if (!vigentes.has(id)) delete e.estados[id];
  escribir(CLAVES.tarjetasEstado, e.estados);
}

export interface ResumenMeta {
  avance: number;
  meta: Meta;
  cumplida: boolean;
  racha: Racha;
}

export function resumenMeta(e: EstadoRepaso, dia: string = hoy()): ResumenMeta {
  const avance = avanceDeHoy(e.registro, dia);
  return { avance, meta: e.meta, cumplida: avance >= e.meta, racha: racha(e.registro, e.meta, dia) };
}

export function textoRacha(r: Racha): string {
  return `${r.dias} ${r.dias === 1 ? 'día' : 'días'}`;
}
