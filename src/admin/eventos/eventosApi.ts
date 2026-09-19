import { supabase } from '../../lib/supabase';
import type { EventoInsert, EventoRow, EventoUpdate } from '../../lib/database.types';

/** Todos los eventos (borrador + publicado), para el panel. Orden por fecha. */
export async function listarEventosAdmin(): Promise<EventoRow[]> {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .order('fecha', { ascending: true });
  if (error) throw error;
  return data;
}

/** 'YYYY-MM-DD' de hace `dias` días, en horario local (no UTC). */
function fechaHaceDias(dias: number): string {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  return d.toLocaleDateString('en-CA'); // en-CA formatea como YYYY-MM-DD
}

/**
 * Eventos publicados, para el sitio público. Un evento sigue visible hasta
 * 3 días después de su fecha (para que la gente que llega tarde aún vea que
 * "acaba de pasar"); pasado ese margen se oculta solo, sin borrarse — sigue
 * disponible en el panel para editar/reactivar o borrar.
 */
export async function listarEventosPublicados(): Promise<EventoRow[]> {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('estado', 'publicado')
    .gte('fecha', fechaHaceDias(3))
    .order('fecha', { ascending: true });
  if (error) throw error;
  return data;
}

export async function crearEvento(evento: EventoInsert): Promise<EventoRow> {
  // .insert()/.update() tipan su argumento como never en este proyecto por
  // cómo TS infiere el genérico Database aquí; el contrato real lo garantiza
  // EventoInsert/EventoUpdate arriba, así que el cast es seguro.
  const { data, error } = await supabase.from('eventos').insert(evento as never).select().single();
  if (error) throw error;
  return data as EventoRow;
}

export async function actualizarEvento(id: string, cambios: EventoUpdate): Promise<EventoRow> {
  const { data, error } = await supabase.from('eventos').update(cambios as never).eq('id', id).select().single();
  if (error) throw error;
  return data as EventoRow;
}

/**
 * Borra un evento y, si tenía imagen propia en el bucket "eventos", también
 * la borra — así el storage no se va llenando con fotos de eventos que ya
 * no existen. Si el borrado de la imagen falla (p. ej. ya no existía), no
 * se aborta la operación: lo importante es que el evento se elimine.
 */
export async function borrarEvento(id: string, imagenUrl: string | null): Promise<void> {
  const { error } = await supabase.from('eventos').delete().eq('id', id);
  if (error) throw error;
  if (imagenUrl) await borrarImagenEvento(imagenUrl).catch(() => {});
}

/** Sube una imagen al bucket "eventos" y devuelve su URL pública. */
export async function subirImagenEvento(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from('eventos').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from('eventos').getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Borra un archivo del bucket "eventos" a partir de su URL pública. Se usa
 * al reemplazar la imagen de un evento (la vieja ya no sirve para nada) y al
 * borrar un evento completo — así el bucket no acumula fotos huérfanas.
 */
export async function borrarImagenEvento(imagenUrl: string): Promise<void> {
  const marcador = '/object/public/eventos/';
  const i = imagenUrl.indexOf(marcador);
  if (i === -1) return; // no es una URL de este bucket (o formato inesperado): no hay nada que borrar
  const path = imagenUrl.slice(i + marcador.length);
  const { error } = await supabase.storage.from('eventos').remove([path]);
  if (error) throw error;
}
