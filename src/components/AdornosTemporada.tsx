import PapelPicado, { type TiraPapelPicado } from './PapelPicado';
import Veladora, { type ColorVeladora } from './Veladora';
import './AdornosTemporada.css';

// Adornos de Todos los Santos para todo el sitio (solo en temporada, ver
// esTemporadaSantos en data/todosLosSantos.ts):
// - PapelPicadoMenu: tira de papel picado de orilla a orilla colgando bajo
//   el menú; se recoge al hacer scroll para no estorbar.
// - OfrendaPie: veladoras y cempasúchil sobre el borde del pie de página, y
//   papel picado colgando de orilla a orilla debajo.

const TIRA_MENU: TiraPapelPicado[] = [{ ancho: 78, colgado: 14, ocupa: 0.72 }];
const TIRA_PIE: TiraPapelPicado[] = [
  { ancho: 96, colgado: 18, desfase: 3, fondo: true, escalonada: true, ocupa: 0.6 },
  { ancho: 96, colgado: 28, arriba: 14, ocupa: 0.72 },
];

export function PapelPicadoMenu() {
  return (
    <div className="adorno-menu" aria-hidden="true">
      <PapelPicado tiras={TIRA_MENU} />
    </div>
  );
}

// Repisa de la ofrenda: flores y veladoras alternadas, simétrica al centro.
const REPISA: ({ flor: string } | { vela: ColorVeladora; alto: number })[] = [
  { flor: 'flor-cempasuchil' }, { vela: 'blanca', alto: 34 }, { flor: 'flor-roja' },
  { vela: 'roja', alto: 44 }, { flor: 'flor-cempasuchil' }, { vela: 'ambar', alto: 38 },
  { flor: 'flor-cempasuchil' }, { vela: 'blanca', alto: 50 }, { flor: 'flor-cempasuchil' },
  { vela: 'ambar', alto: 38 }, { flor: 'flor-cempasuchil' }, { vela: 'roja', alto: 44 },
  { flor: 'flor-roja' }, { vela: 'blanca', alto: 34 }, { flor: 'flor-cempasuchil' },
];

export function OfrendaPie() {
  return (
    <div className="adorno-pie" aria-hidden="true">
      <div className="adorno-pie__repisa">
        {REPISA.map((p, i) => 'flor' in p
          ? <img key={i} className="adorno-pie__flor" src={`/todos-los-santos/${p.flor}.webp`} alt="" loading="lazy" />
          : <Veladora key={i} color={p.vela} alto={p.alto} semilla={i + 90} />)}
      </div>
      <PapelPicado tiras={TIRA_PIE} className="adorno-pie__papel" />
    </div>
  );
}
