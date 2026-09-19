-- Módulo de gestión del Evangelio del Día — Parroquia San Juan Bautista
--
-- Cómo ejecutar: pega este archivo completo en el SQL Editor de tu proyecto
-- de Supabase (dashboard → SQL Editor → New query) y dale "Run" una sola vez.
--
-- Qué hace:
--   1. Crea la tabla `evangelios`, uno por fecha (fecha es única: solo puede
--      haber un evangelio por día, igual que en la práctica real).
--   2. Activa Row Level Security: el público solo lee el evangelio publicado
--      de hoy; solo un usuario autenticado (tu admin) puede escribir.
--   3. Crea los buckets de Storage "evangelio-imagenes" y "evangelio-audio",
--      con las mismas reglas que "eventos": lectura pública, escritura solo
--      autenticada.

-- ─── 1. Tabla evangelios ────────────────────────────────────────────────

create table if not exists public.evangelios (
  id           uuid primary key default gen_random_uuid(),
  fecha        date not null unique,
  liturgia     text not null default '',
  titulo       text not null,
  referencia   text not null default '',
  cita         text not null default '',
  resumen      text not null default '',
  imagen_url   text,
  imagen_credito text not null default '',
  imagen_enlace  text,
  audio_url    text,
  autor_audio  text not null default '',
  duracion_audio text not null default '',
  texto        text[] not null default '{}',
  reflexion    text[] not null default '{}',
  estado       text not null default 'borrador'
               check (estado in ('borrador', 'publicado')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.evangelios is 'Evangelio del día, uno por fecha, gestionado desde /admin.';

-- Consulta más común del sitio público: el evangelio publicado de hoy.
create index if not exists evangelios_publicados_fecha_idx
  on public.evangelios (fecha)
  where estado = 'publicado';

drop trigger if exists evangelios_set_updated_at on public.evangelios;
create trigger evangelios_set_updated_at
  before update on public.evangelios
  for each row execute function public.set_updated_at();

-- ─── 2. Row Level Security ──────────────────────────────────────────────

alter table public.evangelios enable row level security;

drop policy if exists "Público lee evangelios publicados" on public.evangelios;
create policy "Público lee evangelios publicados"
  on public.evangelios for select
  to anon
  using (estado = 'publicado');

drop policy if exists "Admin lee todos los evangelios" on public.evangelios;
create policy "Admin lee todos los evangelios"
  on public.evangelios for select
  to authenticated
  using (true);

drop policy if exists "Admin crea evangelios" on public.evangelios;
create policy "Admin crea evangelios"
  on public.evangelios for insert
  to authenticated
  with check (true);

drop policy if exists "Admin edita evangelios" on public.evangelios;
create policy "Admin edita evangelios"
  on public.evangelios for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin borra evangelios" on public.evangelios;
create policy "Admin borra evangelios"
  on public.evangelios for delete
  to authenticated
  using (true);

-- ─── 3. Storage: imágenes y audio del evangelio ──────────────────────────

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'evangelio-imagenes',
  'evangelio-imagenes',
  true,
  15728640, -- 15 MB, igual que eventos
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'evangelio-audio',
  'evangelio-audio',
  true,
  20971520, -- 20 MB (los audios de ~11 MB caben con margen)
  array['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Público ve imágenes del evangelio" on storage.objects;
create policy "Público ve imágenes del evangelio"
  on storage.objects for select
  to public
  using (bucket_id = 'evangelio-imagenes');

drop policy if exists "Admin sube imágenes del evangelio" on storage.objects;
create policy "Admin sube imágenes del evangelio"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'evangelio-imagenes');

drop policy if exists "Admin actualiza imágenes del evangelio" on storage.objects;
create policy "Admin actualiza imágenes del evangelio"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'evangelio-imagenes');

drop policy if exists "Admin borra imágenes del evangelio" on storage.objects;
create policy "Admin borra imágenes del evangelio"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'evangelio-imagenes');

drop policy if exists "Público escucha audio del evangelio" on storage.objects;
create policy "Público escucha audio del evangelio"
  on storage.objects for select
  to public
  using (bucket_id = 'evangelio-audio');

drop policy if exists "Admin sube audio del evangelio" on storage.objects;
create policy "Admin sube audio del evangelio"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'evangelio-audio');

drop policy if exists "Admin actualiza audio del evangelio" on storage.objects;
create policy "Admin actualiza audio del evangelio"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'evangelio-audio');

drop policy if exists "Admin borra audio del evangelio" on storage.objects;
create policy "Admin borra audio del evangelio"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'evangelio-audio');
