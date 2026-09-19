import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface Props {
  /** Valor combinado tal como se guarda, ej. "11:00 am — Misa Solemne". */
  value: string;
  onChange: (value: string) => void;
}

// Separa "11:00 am — Misa Solemne" en sus partes; si el texto no viene en
// ese formato (datos viejos, texto libre previo), se deja todo como nota y
// la hora arranca vacía — no se intenta adivinar una hora de un texto libre.
const PATRON = /^(\d{1,2}):(\d{2})\s*(am|pm)(?:\s*—\s*(.*))?$/i;

function parsear(value: string) {
  const m = value.trim().match(PATRON);
  if (!m) return { hora: '', minuto: '', periodo: 'am' as const, nota: value };
  const [, hora, minuto, periodo, nota = ''] = m;
  return { hora, minuto, periodo: periodo.toLowerCase() as 'am' | 'pm', nota };
}

function combinar(hora: string, minuto: string, periodo: 'am' | 'pm', nota: string) {
  if (!hora) return nota.trim();
  const h = String(Math.min(12, Math.max(1, Number(hora) || 12)));
  const m = minuto === '' ? '00' : String(Math.min(59, Math.max(0, Number(minuto) || 0))).padStart(2, '0');
  const base = `${h}:${m} ${periodo}`;
  return nota.trim() ? `${base} — ${nota.trim()}` : base;
}

/**
 * Selector de hora (hh + mm + am/pm) con nota opcional aparte, en vez de un
 * campo de texto libre donde cada quien escribía la hora en un formato
 * distinto. Si dejas los minutos vacíos, se autocompletan a "00" al salir
 * del campo (p. ej. escribir "11" y salir del campo da "11:00").
 */
export default function HoraSelect({ value, onChange }: Props) {
  const inicial = parsear(value);
  const [hora, setHora] = useState(inicial.hora);
  const [minuto, setMinuto] = useState(inicial.minuto);
  const [periodo, setPeriodo] = useState<'am' | 'pm'>(inicial.periodo);
  const [nota, setNota] = useState(inicial.nota);

  // Si el formulario carga otro evento (editar uno distinto), se resincroniza.
  useEffect(() => {
    const p = parsear(value);
    setHora(p.hora);
    setMinuto(p.minuto);
    setPeriodo(p.periodo);
    setNota(p.nota);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emitir = (h: string, m: string, p: 'am' | 'pm', n: string) => {
    onChange(combinar(h, m, p, n));
  };

  return (
    <div className="admin-hora">
      <div className="admin-hora__reloj">
        <Clock size={15} className="admin-hora__icon" />
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={12}
          placeholder="11"
          className="admin-hora__num"
          value={hora}
          onChange={e => {
            const v = e.target.value.slice(0, 2);
            setHora(v);
            emitir(v, minuto, periodo, nota);
          }}
          onBlur={() => {
            // Autocompleta minutos a "00" si se dejó la hora sin minutos,
            // igual que pediste: escribir "11" y salir deja "11:00".
            if (hora && minuto === '') {
              setMinuto('00');
              emitir(hora, '00', periodo, nota);
            }
          }}
        />
        <span className="admin-hora__separador">:</span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          max={59}
          placeholder="00"
          className="admin-hora__num"
          value={minuto}
          onChange={e => {
            const v = e.target.value.slice(0, 2);
            setMinuto(v);
            emitir(hora, v, periodo, nota);
          }}
          onBlur={() => {
            if (hora && minuto === '') {
              setMinuto('00');
              emitir(hora, '00', periodo, nota);
            }
          }}
        />
        <select
          className="admin-hora__periodo"
          value={periodo}
          onChange={e => {
            const v = e.target.value as 'am' | 'pm';
            setPeriodo(v);
            emitir(hora, minuto, v, nota);
          }}
        >
          <option value="am">a. m.</option>
          <option value="pm">p. m.</option>
        </select>
      </div>

      <input
        className="admin-hora__nota"
        value={nota}
        onChange={e => {
          setNota(e.target.value);
          emitir(hora, minuto, periodo, e.target.value);
        }}
        placeholder="Nota (opcional): Misa Solemne…"
      />
    </div>
  );
}
