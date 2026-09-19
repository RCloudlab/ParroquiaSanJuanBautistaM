import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { CAPILLAS } from '../../data/capillas';

// Lugares sugeridos: la parroquia + todas las capillas registradas. El campo
// sigue siendo texto libre (algunos eventos ya creados usan lugares que no
// están en esta lista, como "Parroquia de San Miguel Curahuango"), esta
// lista solo acelera el caso común con autocompletado.
const LUGARES_SUGERIDOS = [
  'Parroquia San Juan Bautista',
  ...CAPILLAS.map(c => c.nombre),
  // No es capilla anexa de San Juan Bautista, sino otra parroquia — se usa
  // igual para eventos conjuntos, por eso vive aquí y no en capillas.ts.
  'Parroquia de San Miguel Curahuango',
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

/** Campo de "Lugar": input de texto libre con desplegable-buscador de capillas. */
export default function LugarSelect({ value, onChange }: Props) {
  const [abierto, setAbierto] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);
  const listaId = useId();

  const opciones = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return LUGARES_SUGERIDOS;
    return LUGARES_SUGERIDOS.filter(l => l.toLowerCase().includes(q));
  }, [value]);

  useEffect(() => {
    if (!abierto) return;
    const onClickFuera = (e: MouseEvent) => {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    };
    document.addEventListener('mousedown', onClickFuera);
    return () => document.removeEventListener('mousedown', onClickFuera);
  }, [abierto]);

  return (
    <div className="admin-lugar" ref={contenedorRef}>
      <div className="admin-lugar__input-wrap">
        <MapPin size={15} className="admin-lugar__icon" />
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setAbierto(true)}
          placeholder="Escribe o elige una capilla…"
          role="combobox"
          aria-expanded={abierto}
          aria-controls={listaId}
          autoComplete="off"
        />
        <button
          type="button"
          className="admin-lugar__toggle"
          onClick={() => setAbierto(v => !v)}
          aria-label="Ver lista de capillas"
        >
          <ChevronDown size={15} />
        </button>
      </div>

      {abierto && (
        <ul className="admin-lugar__lista" id={listaId} role="listbox">
          {opciones.length === 0 ? (
            <li className="admin-lugar__vacio">
              Sin coincidencias — se usará "{value}" tal cual lo escribiste
            </li>
          ) : (
            opciones.map(lugar => (
              <li key={lugar}>
                <button
                  type="button"
                  className={`admin-lugar__opcion${lugar === value ? ' admin-lugar__opcion--activa' : ''}`}
                  onClick={() => { onChange(lugar); setAbierto(false); }}
                >
                  {lugar}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
