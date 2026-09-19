-- Módulo de gestión de Eventos — Parroquia San Juan Bautista
--
-- Cómo ejecutar: pega este archivo completo en el SQL Editor de tu proyecto
-- de Supabase (dashboard → SQL Editor → New query) y dale "Run" una sola vez.
--
-- Qué hace:
--   1. Crea la tabla `eventos` con orden manual y estado borrador/publicado.
--   2. Activa Row Level Security: el público solo lee eventos publicados;
--      solo un usuario autenticado (tu admin) puede escribir.
--   3. Crea el bucket de Storage "eventos" para las imágenes, con las mismas
--      reglas: lectura pública, escritura solo autenticada.

-- ─── 1. Tabla eventos ───────────────────────────────────────────────────

create table if not exists public.eventos (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null,
  descripcion text not null default '',
  fecha       date not null,
  hora        text not null default '',
  lugar       text not null default '',
  tipo        text not null default 'pastoral'
              check (tipo in ('liturgico', 'pastoral', 'social', 'especial', 'cultural')),
  imagen_url  text,
  estado      text not null default 'borrador'
              check (estado in ('borrador', 'publicado')),
  orden       integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.eventos is 'Eventos y actividades de la parroquia, gestionados desde /admin.';

-- Índice para la consulta más común del sitio público: eventos publicados
-- ordenados por posición manual y luego por fecha.
create index if not exists eventos_publicados_orden_idx
  on public.eventos (estado, orden, fecha)
  where estado = 'publicado';

-- Mantiene updated_at al día en cada edición, sin tener que acordarse en el
-- código del panel.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists eventos_set_updated_at on public.eventos;
create trigger eventos_set_updated_at
  before update on public.eventos
  for each row execute function public.set_updated_at();

-- ─── 2. Row Level Security ──────────────────────────────────────────────

alter table public.eventos enable row level security;

-- Cualquier visitante (sin sesión) puede leer únicamente los publicados.
drop policy if exists "Público lee eventos publicados" on public.eventos;
create policy "Público lee eventos publicados"
  on public.eventos for select
  to anon
  using (estado = 'publicado');

-- Un usuario autenticado (tu cuenta admin) puede leer TODO, incluidos
-- los borradores, para poder editarlos desde el panel.
drop policy if exists "Admin lee todos los eventos" on public.eventos;
create policy "Admin lee todos los eventos"
  on public.eventos for select
  to authenticated
  using (true);

-- Solo un usuario autenticado puede crear, editar o borrar eventos.
drop policy if exists "Admin crea eventos" on public.eventos;
create policy "Admin crea eventos"
  on public.eventos for insert
  to authenticated
  with check (true);

drop policy if exists "Admin edita eventos" on public.eventos;
create policy "Admin edita eventos"
  on public.eventos for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin borra eventos" on public.eventos;
create policy "Admin borra eventos"
  on public.eventos for delete
  to authenticated
  using (true);

-- ─── 3. Storage: bucket de imágenes de eventos ──────────────────────────

-- Nota: el límite de tamaño se subió de 5 MB a 15 MB en
-- 002_limite_imagen_eventos.sql. Se deja el valor original aquí porque este
-- script es el histórico de creación; para una base nueva desde cero basta
-- con correr ambos en orden.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'eventos',
  'eventos',
  true, -- lectura pública (necesaria para mostrar las imágenes en el sitio)
  5242880, -- 5 MB máximo por archivo (ver 002 para el límite actual)
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Público ve imágenes de eventos" on storage.objects;
create policy "Público ve imágenes de eventos"
  on storage.objects for select
  to public
  using (bucket_id = 'eventos');

drop policy if exists "Admin sube imágenes de eventos" on storage.objects;
create policy "Admin sube imágenes de eventos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'eventos');

drop policy if exists "Admin actualiza imágenes de eventos" on storage.objects;
create policy "Admin actualiza imágenes de eventos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'eventos');

drop policy if exists "Admin borra imágenes de eventos" on storage.objects;
create policy "Admin borra imágenes de eventos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'eventos');
