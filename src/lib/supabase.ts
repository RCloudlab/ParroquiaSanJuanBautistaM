import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error(
    'Faltan las variables VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY. ' +
    'En local: copia .env.example a .env.local y complétalas. ' +
    'En producción (Vercel): Settings → Environment Variables, y luego Redeploy.'
  );
}

// Cliente único compartido por todo el sitio: el público lo usa para leer
// contenido publicado (RLS lo permite sin sesión) y el panel /admin lo usa,
// ya autenticado, para leer/escribir todo lo suyo.
export const supabase = createClient<Database>(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-key'
);
