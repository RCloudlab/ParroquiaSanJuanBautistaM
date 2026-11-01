import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PapelPicado, { type TiraPapelPicado } from './PapelPicado';
import EstampaSanto from './EstampaSanto';
import { SANTOS } from '../data/todosLosSantos';
import './TodosLosSantosPromo.css';

const TIRA: TiraPapelPicado[] = [{ ancho: 58, colgado: 10, desfase: 1 }];

/** Banner que lleva a la página de Todos los Santos. Adelanta la estética de
 *  la página de destino: papel marfil, papel picado y una estampita. */
export default function TodosLosSantosPromo() {
  return (
    <Link
      to="/eventos/todos-los-santos"
      className="santos-promo reveal"
      aria-label="Día de Todos los Santos, 1 de noviembre. Conoce las historias de los santos"
    >
      <PapelPicado tiras={TIRA} className="santos-promo__papel" />

      <div className="santos-promo__cuerpo">
        <div className="santos-promo__contenido">
          <span className="santos-promo__tag">1 de noviembre</span>
          <span className="santos-promo__titulo">Día de <em>Todos los Santos</em></span>
          <span className="santos-promo__sub">
            Conoce las historias de hombres y mujeres que hicieron de su vida un camino hacia Dios.
          </span>
          <span className="santos-promo__cta">
            Descubrir un santo <ArrowRight size={15} className="santos-promo__flecha" />
          </span>
        </div>

        <div className="santos-promo__estampa" aria-hidden="true">
          <EstampaSanto santo={SANTOS[0]} />
        </div>
      </div>
    </Link>
  );
}
