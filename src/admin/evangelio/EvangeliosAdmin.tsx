import { useEffect, useState, useCallback, useMemo } from 'react';
import { Eye, EyeOff, Trash2, Loader2, ImageOff, ChevronLeft, ChevronRight } from 'lucide-react';
import type { EvangelioInsert, EvangelioRow } from '../../lib/database.types';
import {
  listarEvangeliosAdmin, crearEvangelio, actualizarEvangelio, borrarEvangelio, fechaHoy,
  limpiarEvangeliosVencidos,
} from './evangelioApi';
import { calcularDiaLiturgico } from './calendarioLiturgico';
import EvangelioForm from './EvangelioForm';

const DIAS_SEMANA_CORTO = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MESES_CORTO = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MESES_LARGO = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function aFechaIso(d: Date): string {
  return d.toLocaleDateString('en-CA');
}

/** Todos los días (1 al último) del mes/año dados, como fechas 'YYYY-MM-DD'. */
function diasDelMes(anio: number, mesIdx0: number): string[] {
  const ultimoDia = new Date(anio, mesIdx0 + 1, 0).getDate();
  return Array.from({ length: ultimoDia }, (_, i) => aFechaIso(new Date(anio, mesIdx0, i + 1)));
}

function fechaCorta(iso: string) {
  const [, m, d] = iso.split('-').map(Number);
  return `${d} ${MESES_CORTO[m - 1]}`;
}

export default function EvangeliosAdmin() {
  const [evangelios, setEvangelios] = useState<EvangelioRow[] | null>(null);
  const [fechaEditando, setFechaEditando] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState<string | null>(null);

  const hoy = fechaHoy();
  const hoyDate = useMemo(() => new Date(), []);
  const [mesVisto, setMesVisto] = useState(() => ({ anio: hoyDate.getFullYear(), mes: hoyDate.getMonth() }));

  const dias = useMemo(() => diasDelMes(mesVisto.anio, mesVisto.mes), [mesVisto]);
  // Celdas vacías antes del día 1, para que el calendario alinee cada fecha
  // bajo su día de la semana real (como cualquier calendario de pared).
  const relleno = useMemo(() => new Date(mesVisto.anio, mesVisto.mes, 1).getDay(), [mesVisto]);

  const irMesAnterior = () => setMesVisto(({ anio, mes }) => (mes === 0 ? { anio: anio - 1, mes: 11 } : { anio, mes: mes - 1 }));
  const irMesSiguiente = () => setMesVisto(({ anio, mes }) => (mes === 11 ? { anio: anio + 1, mes: 0 } : { anio, mes: mes + 1 }));
  const irMesActual = () => setMesVisto({ anio: hoyDate.getFullYear(), mes: hoyDate.getMonth() });

  const cargar = useCallback(async () => {
    try {
      setEvangelios(await listarEvangeliosAdmin());
    } catch {
      setError('No se pudieron cargar los evangelios. Revisa tu conexión e intenta de nuevo.');
    }
  }, []);

  useEffect(() => {
    // Limpieza perezosa: borra evangelios de más de 3 días de antigüedad
    // (con su imagen/audio) antes de mostrar el calendario, para que el
    // bucket no vaya acumulando archivos de días muy pasados.
    limpiarEvangeliosVencidos()
      .catch(err => console.error('No se pudo limpiar evangelios vencidos:', err))
      .finally(cargar);
  }, [cargar]);

  const porFecha = useMemo(() => {
    const map = new Map<string, EvangelioRow>();
    evangelios?.forEach(ev => map.set(ev.fecha, ev));
    return map;
  }, [evangelios]);

  const handleGuardar = async (datos: EvangelioInsert) => {
    const existente = fechaEditando ? porFecha.get(fechaEditando) : undefined;
    if (existente) {
      await actualizarEvangelio(existente.id, datos);
    } else {
      await crearEvangelio(datos);
    }
    setFechaEditando(null);
    await cargar();
  };

  const handleTogglePublicado = async (ev: EvangelioRow) => {
    setOcupado(ev.id);
    try {
      await actualizarEvangelio(ev.id, { estado: ev.estado === 'publicado' ? 'borrador' : 'publicado' });
      await cargar();
    } catch {
      setError('No se pudo actualizar el estado.');
    } finally {
      setOcupado(null);
    }
  };

  const handleBorrar = async (ev: EvangelioRow) => {
    if (!confirm(`¿Borrar el evangelio de ${fechaCorta(ev.fecha)}? Esta acción no se puede deshacer.`)) return;
    setOcupado(ev.id);
    try {
      await borrarEvangelio(ev.id, ev.imagen_url, ev.audio_url);
      await cargar();
    } catch {
      setError('No se pudo borrar el evangelio.');
    } finally {
      setOcupado(null);
    }
  };

  if (fechaEditando) {
    const existente = porFecha.get(fechaEditando) ?? null;
    return (
      <div>
        <h1 className="admin-page-title">
          Evangelio del {fechaCorta(fechaEditando)}
          {fechaEditando === hoy && <span className="admin-badge admin-badge--publicado admin-evangelio__hoy-tag">Hoy</span>}
        </h1>
        <EvangelioForm
          fecha={fechaEditando}
          inicial={existente}
          onGuardar={handleGuardar}
          onCancelar={() => setFechaEditando(null)}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Evangelio del Día</h1>
      </div>

      {error && <p className="admin-form-error">{error}</p>}

      <p className="admin-evangelio__ayuda">
        Programa el evangelio de cualquier día del mes. El que corresponde a la
        fecha de hoy es el único que se muestra en el sitio mientras esté publicado.
      </p>

      <div className="admin-calendario__nav">
        <button onClick={irMesAnterior} aria-label="Mes anterior"><ChevronLeft size={18} /></button>
        <span className="admin-calendario__mes-actual">
          {MESES_LARGO[mesVisto.mes]} {mesVisto.anio}
        </span>
        <button onClick={irMesSiguiente} aria-label="Mes siguiente"><ChevronRight size={18} /></button>
        {(mesVisto.anio !== hoyDate.getFullYear() || mesVisto.mes !== hoyDate.getMonth()) && (
          <button className="admin-calendario__hoy-btn" onClick={irMesActual}>Hoy</button>
        )}
      </div>

      {!evangelios ? (
        <div className="admin-loading-inline"><Loader2 size={22} className="admin-spin" /></div>
      ) : (
        <div className="admin-calendario">
          {Array.from({ length: relleno }, (_, i) => (
            <div key={`relleno-${i}`} className="admin-calendario__relleno" aria-hidden="true" />
          ))}
          {dias.map(fecha => {
            const ev = porFecha.get(fecha);
            const [, m, d] = fecha.split('-').map(Number);
            const diaSemanaIdx = new Date(fecha + 'T00:00:00').getDay();
            const esHoy = fecha === hoy;
            // Días anteriores a hoy: ya pasaron, no tiene sentido cargarles
            // o editarles el evangelio. Se muestran atenuados y sin clic —
            // los de más de 3 días además se borran solos (arriba).
            const esPasado = fecha < hoy;
            const liturgico = calcularDiaLiturgico(fecha);

            return (
              <article
                key={fecha}
                className={`admin-calendario__dia${esHoy ? ' admin-calendario__dia--hoy' : ''}${esPasado ? ' admin-calendario__dia--pasado' : ''}${ocupado === ev?.id ? ' admin-calendario__dia--busy' : ''}`}
              >
                <button
                  className="admin-calendario__click"
                  onClick={() => !esPasado && setFechaEditando(fecha)}
                  disabled={esPasado}
                  title={esPasado ? 'Este día ya pasó' : undefined}
                >
                  {/* Imagen si existe; espacio en blanco liso si aún no se ha cargado. */}
                  <div className="admin-calendario__foto">
                    {ev?.imagen_url ? (
                      <img src={ev.imagen_url} alt="" loading="lazy" />
                    ) : (
                      <div className="admin-calendario__foto-vacia">
                        <ImageOff size={20} />
                      </div>
                    )}

                    <div className="admin-calendario__fecha">
                      <span className="admin-calendario__dia-nombre">{DIAS_SEMANA_CORTO[diaSemanaIdx]}</span>
                      <span className="admin-calendario__dia-num">{d}</span>
                      <span className="admin-calendario__mes">{MESES_CORTO[m - 1]}</span>
                    </div>

                    {esHoy && <span className="admin-calendario__hoy-tag">Hoy</span>}

                    {ev && (
                      <span className={`admin-calendario__estado-punto admin-calendario__estado-punto--${ev.estado}`} />
                    )}
                  </div>

                  <div className="admin-calendario__info">
                    <span className="admin-calendario__liturgico">{liturgico.nombre}</span>
                    {ev ? (
                      <span className="admin-calendario__titulo">{ev.titulo || '(sin título)'}</span>
                    ) : (
                      <span className="admin-calendario__pendiente">Sin cargar</span>
                    )}
                  </div>
                </button>

                {ev && !esPasado && (
                  <div className="admin-calendario__acciones">
                    <button
                      onClick={() => handleTogglePublicado(ev)}
                      disabled={!!ocupado}
                      title={ev.estado === 'publicado' ? 'Ocultar del sitio' : 'Publicar en el sitio'}
                    >
                      {ev.estado === 'publicado' ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button onClick={() => handleBorrar(ev)} disabled={!!ocupado} title="Borrar" className="admin-list__delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
