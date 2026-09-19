import { supabase } from '../../lib/supabase';
import type { EvangelioInsert, EvangelioRow, EvangelioUpdate } from '../../lib/database.types';

/** 'YYYY-MM-DD' de hoy, en horario local (no UTC). */
export function fechaHoy(): string {
  return new Date().toLocaleDateString('en-CA');
}

/** Todos los evangelios (borrador + publicado), para la vista semanal del panel. */
export async function listarEvangeliosAdmin(): Promise<EvangelioRow[]> {
  const { data, error } = await supabase
    .from('evangelios')
    .select('*')
    .order('fecha', { ascending: true });
  if (error) throw error;
  return data;
}

/** El evangelio de una fecha concreta (borrador o publicado), o null si no existe. */
export async function obtenerEvangelioPorFecha(fecha: string): Promise<EvangelioRow | null> {
  const { data, error } = await supabase
    .from('evangelios')
    .select('*')
    .eq('fecha', fecha)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** El evangelio publicado de hoy, para el sitio público. null si no se cargó. */
export async function obtenerEvangelioDeHoy(): Promise<EvangelioRow | null> {
  const { data, error } = await supabase
    .from('evangelios')
    .select('*')
    .eq('fecha', fechaHoy())
    .eq('estado', 'publicado')
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function crearEvangelio(evangelio: EvangelioInsert): Promise<EvangelioRow> {
  const { data, error } = await supabase.from('evangelios').insert(evangelio as never).select().single();
  if (error) throw error;
  return data as EvangelioRow;
}

export async function actualizarEvangelio(id: string, cambios: EvangelioUpdate): Promise<EvangelioRow> {
  const { data, error } = await supabase.from('evangelios').update(cambios as never).eq('id', id).select().single();
  if (error) throw error;
  return data as EvangelioRow;
}

export async function borrarEvangelio(id: string, imagenUrl: string | null, audioUrl: string | null): Promise<void> {
  const { error } = await supabase.from('evangelios').delete().eq('id', id);
  if (error) throw error;
  if (imagenUrl) await borrarImagenEvangelio(imagenUrl).catch(() => {});
  if (audioUrl) await borrarAudioEvangelio(audioUrl).catch(() => {});
}

/** 'YYYY-MM-DD' de hace `dias` días, en horario local (no UTC). */
function fechaHaceDias(dias: number): string {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  return d.toLocaleDateString('en-CA');
}

/**
 * Borra los evangelios de más de 3 días de antigüedad (con sus archivos de
 * imagen/audio) para no acumular basura en el bucket. No hay tarea
 * programada en el servidor (el plan gratis de Supabase no la ofrece sin
 * infraestructura extra); en su lugar, esta limpieza corre cada vez que se
 * abre el panel del Evangelio — "limpieza perezosa", suficiente para el
 * volumen de este sitio y sin depender de nada adicional.
 */
export async function limpiarEvangeliosVencidos(): Promise<void> {
  const limite = fechaHaceDias(3);
  const { data, error } = await supabase
    .from('evangelios')
    .select('id, imagen_url, audio_url')
    .lt('fecha', limite);
  if (error) throw error;
  const vencidos = data as Pick<EvangelioRow, 'id' | 'imagen_url' | 'audio_url'>[] | null;
  if (!vencidos || vencidos.length === 0) return;

  await Promise.all(
    vencidos.map(ev => borrarEvangelio(ev.id, ev.imagen_url, ev.audio_url).catch(() => {}))
  );
}

export async function subirImagenEvangelio(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from('evangelio-imagenes').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from('evangelio-imagenes').getPublicUrl(path);
  return data.publicUrl;
}

export async function borrarImagenEvangelio(imagenUrl: string): Promise<void> {
  const marcador = '/object/public/evangelio-imagenes/';
  const i = imagenUrl.indexOf(marcador);
  if (i === -1) return;
  const path = imagenUrl.slice(i + marcador.length);
  const { error } = await supabase.storage.from('evangelio-imagenes').remove([path]);
  if (error) throw error;
}

/**
 * Sube el audio del evangelio. A diferencia de la imagen (que puede convivir
 * con la del día anterior sin problema), aquí conviene borrar siempre el
 * audio anterior de este mismo evangelio al reemplazarlo — son archivos de
 * ~11 MB y no tiene sentido conservar versiones viejas de la misma fecha.
 */
export async function subirAudioEvangelio(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from('evangelio-audio').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from('evangelio-audio').getPublicUrl(path);
  return data.publicUrl;
}

export async function borrarAudioEvangelio(audioUrl: string): Promise<void> {
  const marcador = '/object/public/evangelio-audio/';
  const i = audioUrl.indexOf(marcador);
  if (i === -1) return;
  const path = audioUrl.slice(i + marcador.length);
  const { error } = await supabase.storage.from('evangelio-audio').remove([path]);
  if (error) throw error;
}
