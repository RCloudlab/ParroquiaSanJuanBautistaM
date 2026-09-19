-- Sube el límite de tamaño de imagen del bucket "eventos" de 5 MB a 15 MB.
-- Motivo: 5 MB se sentía corto para fotos de celular sin comprimir.
--
-- Cómo ejecutar: pega este archivo en el SQL Editor de Supabase y dale Run.
-- (No afecta imágenes ya subidas, solo el límite para las nuevas.)

update storage.buckets
set file_size_limit = 15728640 -- 15 MB
where id = 'eventos';
