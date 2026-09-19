import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // El cliente de Supabase pesa ~150-200 KB; se usa en la sección
          // pública de Eventos (Home) y en todo /admin. Separarlo en su
          // propio chunk evita que infle el bundle principal que descarga
          // cualquier visitante que solo entra a ver horarios o el rosario.
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
})
