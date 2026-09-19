import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Loader2, CalendarX, Search, X,
} from 'lucide-react';
import type { EventoInsert, EventoRow, EventoEstado, EventoTipo } from '../../lib/database.types';
import {
  listarEventosAdmin, crearEvento, actualizarEvento, borrarEvento,
} from './eventosApi';
import EventoForm from './EventoForm';

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function fechaCorta(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MESES[(m - 1 + 12) % 12]} ${y}`;
}

// Mismo margen de 3 días que usa el sitio público (ver eventosApi.ts) antes
// de dejar de mostrar un evento: aquí solo se usa para la etiqueta visual,
// el evento nunca se borra ni se despublica solo.
function estaVencido(fechaIso: string): boolean {
  const [y, m, d] = fechaIso.split('-').map(Number);
  const limite = new Date(y, m - 1, d);
  limite.setDate(limite.getDate() + 3);
  limite.setHours(23, 59, 59, 999);
  return new Date() > limite;
}

const TIPO_LABELS: Record<EventoTipo, string> = {
  liturgico: 'Litúrgico',
  pastoral: 'Pastoral',
  social: 'Social',
  especial: 'Patronal',
  cultural: 'Cultural',
};

const TIPO_COLORS: Record<EventoTipo, string> = {
  especial: 'var(--gold-mid)',
  liturgico: 'var(--terracotta)',
  pastoral: 'var(--red-mid)',
  social: 'var(--teal-zocalo)',
  cultural: 'var(--purple-sorrow)',
};

const FILTROS_ESTADO: { value: EventoEstado | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'publicado', label: 'Publicados' },
  { value: 'borrador', label: 'Borradores' },
];

export default function EventosAdmin() {
  const [eventos, setEventos] = useState<EventoRow[] | null>(null);
  const [editando, setEditando] = useState<EventoRow | null | 'nuevo'>(null);
  const [error, setError] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState<string | null>(null); // id en operación

  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<EventoTipo | 'todos'>('todos');
  const [filtroEstado, setFiltroEstado] = useState<EventoEstado | 'todos'>('todos');

  const cargar = useCallback(async () => {
    try {
      setEventos(await listarEventosAdmin());
    } catch {
      setError('No se pudieron cargar los eventos. Revisa tu conexión e intenta de nuevo.');
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  const eventosFiltrados = useMemo(() => {
    if (!eventos) return null;
    const q = busqueda.trim().toLowerCase();
    return eventos.filter(ev => {
      if (filtroTipo !== 'todos' && ev.tipo !== filtroTipo) return false;
      if (filtroEstado !== 'todos' && ev.estado !== filtroEstado) return false;
      if (q && !ev.titulo.toLowerCase().includes(q) && !ev.lugar.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [eventos, busqueda, filtroTipo, filtroEstado]);

  const handleGuardar = async (datos: EventoInsert) => {
    if (editando && editando !== 'nuevo') {
      await actualizarEvento(editando.id, datos);
    } else {
      await crearEvento(datos);
    }
    setEditando(null);
    await cargar();
  };

  const handleBorrar = async (ev: EventoRow) => {
    if (!confirm(`¿Borrar "${ev.titulo}"? Esta acción no se puede deshacer.`)) return;
    setOcupado(ev.id);
    try {
      await borrarEvento(ev.id, ev.imagen_url);
      await cargar();
    } catch {
      setError('No se pudo borrar el evento.');
    } finally {
      setOcupado(null);
    }
  };

  const handleTogglePublicado = async (ev: EventoRow) => {
    setOcupado(ev.id);
    try {
      await actualizarEvento(ev.id, { estado: ev.estado === 'publicado' ? 'borrador' : 'publicado' });
      await cargar();
    } catch {
      setError('No se pudo actualizar el estado.');
    } finally {
      setOcupado(null);
    }
  };

  if (editando) {
    return (
      <div>
        <h1 className="admin-page-title">
          {editando === 'nuevo' ? 'Nuevo evento' : `Editar: ${editando.titulo}`}
        </h1>
        <EventoForm
          inicial={editando === 'nuevo' ? null : editando}
          onGuardar={handleGuardar}
          onCancelar={() => setEditando(null)}
        />
      </div>
    );
  }

  const hayFiltrosActivos = busqueda !== '' || filtroTipo !== 'todos' || filtroEstado !== 'todos';

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Eventos y Actividades</h1>
        <button className="btn-primary" onClick={() => setEditando('nuevo')}>
          <Plus size={16} /> Nuevo evento
        </button>
      </div>

      {error && <p className="admin-form-error">{error}</p>}

      {/* Buscador y filtros */}
      <div className="admin-filtros">
        <div className="admin-buscador">
          <Search size={16} className="admin-buscador__icon" />
          <input
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por título o lugar…"
          />
          {busqueda && (
            <button className="admin-buscador__limpiar" onClick={() => setBusqueda('')} aria-label="Limpiar búsqueda">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="admin-filtro-chips">
          {FILTROS_ESTADO.map(f => (
            <button
              key={f.value}
              className={`admin-chip${filtroEstado === f.value ? ' admin-chip--activo' : ''}`}
              onClick={() => setFiltroEstado(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <select
          className="admin-filtro-select"
          value={filtroTipo}
          onChange={e => setFiltroTipo(e.target.value as EventoTipo | 'todos')}
        >
          <option value="todos">Todos los tipos</option>
          {(Object.keys(TIPO_LABELS) as EventoTipo[]).map(t => (
            <option key={t} value={t}>{TIPO_LABELS[t]}</option>
          ))}
        </select>
      </div>

      {!eventosFiltrados ? (
        <div className="admin-loading-inline"><Loader2 size={22} className="admin-spin" /></div>
      ) : eventosFiltrados.length === 0 ? (
        <div className="admin-empty">
          <CalendarX size={32} />
          <p>
            {hayFiltrosActivos
              ? 'Ningún evento coincide con la búsqueda o los filtros.'
              : 'Aún no hay eventos. Crea el primero con el botón de arriba.'}
          </p>
        </div>
      ) : (
        <ul className="admin-list">
          {eventosFiltrados.map(ev => (
            <li key={ev.id} className={`admin-list__row${ocupado === ev.id ? ' admin-list__row--busy' : ''}`}>
              {ev.imagen_url ? (
                <img src={ev.imagen_url} alt="" className="admin-list__thumb" />
              ) : (
                <div className="admin-list__thumb admin-list__thumb--vacio" />
              )}

              <div className="admin-list__info">
                <span className="admin-list__titulo">{ev.titulo}</span>
                <span className="admin-list__meta">{fechaCorta(ev.fecha)} · {ev.lugar || 'Sin lugar'}</span>
              </div>

              <span
                className="admin-badge admin-badge--tipo"
                style={{ background: `${TIPO_COLORS[ev.tipo]}1f`, color: TIPO_COLORS[ev.tipo] }}
              >
                {TIPO_LABELS[ev.tipo] ?? ev.tipo}
              </span>

              <div className="admin-list__badges">
                <span className={`admin-badge admin-badge--${ev.estado}`}>
                  {ev.estado === 'publicado' ? 'Publicado' : 'Borrador'}
                </span>
                {estaVencido(ev.fecha) && (
                  <span className="admin-badge admin-badge--vencido" title="Ya no se muestra en el sitio: pasaron más de 3 días desde la fecha del evento">
                    Vencido
                  </span>
                )}
              </div>

              <div className="admin-list__actions">
                <button
                  onClick={() => handleTogglePublicado(ev)}
                  disabled={!!ocupado}
                  title={ev.estado === 'publicado' ? 'Ocultar del sitio' : 'Publicar en el sitio'}
                >
                  {ev.estado === 'publicado' ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button onClick={() => setEditando(ev)} disabled={!!ocupado} title="Editar">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleBorrar(ev)} disabled={!!ocupado} title="Borrar" className="admin-list__delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
