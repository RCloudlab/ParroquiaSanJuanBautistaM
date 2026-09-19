// Tipos generados a mano a partir de supabase/migrations/*.sql.
// Si cambias algún esquema SQL, refleja el cambio aquí también (o instala la
// CLI de Supabase y genera este archivo con `supabase gen types typescript`).

export type EventoTipo = 'liturgico' | 'pastoral' | 'social' | 'especial' | 'cultural';
export type EventoEstado = 'borrador' | 'publicado';

export interface EventoRow {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string; // 'YYYY-MM-DD'
  hora: string;  // texto libre, p. ej. "11:00 – Misa Solemne"
  lugar: string;
  tipo: EventoTipo;
  imagen_url: string | null;
  estado: EventoEstado;
  orden: number;
  created_at: string;
  updated_at: string;
}

export type EventoInsert = Omit<EventoRow, 'id' | 'created_at' | 'updated_at'>;
export type EventoUpdate = Partial<EventoInsert>;

export type EvangelioEstado = 'borrador' | 'publicado';

export interface EvangelioRow {
  id: string;
  fecha: string; // 'YYYY-MM-DD', único por evangelio
  liturgia: string;
  titulo: string;
  referencia: string;
  cita: string;
  resumen: string;
  imagen_url: string | null;
  imagen_credito: string;
  imagen_enlace: string | null;
  audio_url: string | null;
  autor_audio: string;
  duracion_audio: string;
  texto: string[];
  reflexion: string[];
  estado: EvangelioEstado;
  created_at: string;
  updated_at: string;
}

export type EvangelioInsert = Omit<EvangelioRow, 'id' | 'created_at' | 'updated_at'>;
export type EvangelioUpdate = Partial<EvangelioInsert>;

export interface Database {
  public: {
    Tables: {
      eventos: {
        Row: EventoRow;
        Insert: EventoInsert;
        Update: EventoUpdate;
        Relationships: [];
      };
      evangelios: {
        Row: EvangelioRow;
        Insert: EvangelioInsert;
        Update: EvangelioUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
