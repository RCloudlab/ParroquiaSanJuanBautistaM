// Datos del Santo Rosario según el esquema promulgado por San Juan Pablo II
// en la carta apostólica "Rosarium Virginis Mariae" (16 de octubre de 2002),
// que incorpora los Misterios Luminosos y asigna los días de la semana así:
//   Gozosos: lunes y sábado · Luminosos: jueves
//   Dolorosos: martes y viernes · Gloriosos: miércoles y domingo

export type GrupoId = 'gozosos' | 'luminosos' | 'dolorosos' | 'gloriosos';

export interface Misterio {
  titulo: string;
  cita: string;      // referencia bíblica
  pasaje: string;    // texto breve del evangelio para meditar
  fruto: string;     // fruto del misterio
}

export interface GrupoMisterios {
  id: GrupoId;
  nombre: string;
  /** Adjetivo singular para "Primer Misterio Gozoso", etc. */
  singular: string;
  dias: string;
  /** getDay(): 0=domingo ... 6=sábado */
  diasSemana: number[];
  descripcion: string;
  misterios: Misterio[];
}

export interface Oracion {
  id: string;
  titulo: string;
  texto: string;
}

/* ─── Oraciones ─────────────────────────────────────────────────────────── */

export const ORACIONES: Record<string, Oracion> = {
  senal: {
    id: 'senal',
    titulo: 'Señal de la Cruz',
    texto:
      'Por la señal de la Santa Cruz, de nuestros enemigos líbranos, Señor, Dios nuestro. ' +
      'En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.',
  },
  credo: {
    id: 'credo',
    titulo: 'Credo de los Apóstoles',
    texto:
      'Creo en Dios, Padre todopoderoso, creador del cielo y de la tierra. ' +
      'Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, ' +
      'nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, ' +
      'descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos ' +
      'y está sentado a la derecha de Dios, Padre todopoderoso. ' +
      'Desde allí ha de venir a juzgar a vivos y muertos. ' +
      'Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, ' +
      'el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.',
  },
  padrenuestro: {
    id: 'padrenuestro',
    titulo: 'Padre Nuestro',
    texto:
      'Padre nuestro, que estás en el cielo, santificado sea tu Nombre; ' +
      'venga a nosotros tu Reino; hágase tu voluntad en la tierra como en el cielo. ' +
      'Danos hoy nuestro pan de cada día; perdona nuestras ofensas, ' +
      'como también nosotros perdonamos a los que nos ofenden; ' +
      'no nos dejes caer en la tentación, y líbranos del mal. Amén.',
  },
  avemaria: {
    id: 'avemaria',
    titulo: 'Ave María',
    texto:
      'Dios te salve, María, llena eres de gracia; el Señor es contigo. ' +
      'Bendita Tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. ' +
      'Santa María, Madre de Dios, ruega por nosotros, pecadores, ' +
      'ahora y en la hora de nuestra muerte. Amén.',
  },
  gloria: {
    id: 'gloria',
    titulo: 'Gloria',
    texto:
      'Gloria al Padre, y al Hijo, y al Espíritu Santo. ' +
      'Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.',
  },
  jaculatoria: {
    id: 'jaculatoria',
    titulo: 'Jaculatoria',
    texto:
      'María, Madre de gracia, Madre de misericordia, en la vida y en la muerte ampáranos, gran Señora.\n\n' +
      'Oh Jesús mío, perdona nuestros pecados, líbranos del fuego del infierno, ' +
      'lleva al cielo a todas las almas, especialmente a las más necesitadas de tu misericordia.',
  },
  salve: {
    id: 'salve',
    titulo: 'Salve',
    texto:
      'Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. ' +
      'A Ti llamamos los desterrados hijos de Eva; a Ti suspiramos, gimiendo y llorando en este valle de lágrimas. ' +
      'Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; ' +
      'y después de este destierro, muéstranos a Jesús, fruto bendito de tu vientre. ' +
      '¡Oh clementísima, oh piadosa, oh dulce Virgen María! ' +
      'Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar ' +
      'las promesas de nuestro Señor Jesucristo. Amén.',
  },
  bajoTuAmparo: {
    id: 'bajoTuAmparo',
    titulo: 'Bajo tu amparo',
    texto:
      'Bajo tu amparo nos acogemos, Santa Madre de Dios; ' +
      'no desprecies las súplicas que te dirigimos en nuestras necesidades; ' +
      'antes bien, líbranos de todo peligro, ¡oh Virgen gloriosa y bendita! Amén.',
  },
  oracionFinal: {
    id: 'oracionFinal',
    titulo: 'Oración final',
    texto:
      'Oh Dios, cuyo Unigénito Hijo, con su vida, muerte y resurrección, ' +
      'nos alcanzó el premio de la salvación eterna: concédenos, te rogamos, ' +
      'que venerando estos misterios del Santo Rosario de la Virgen María, ' +
      'imitemos lo que contienen y consigamos lo que prometen. ' +
      'Por Jesucristo, nuestro Señor. Amén.',
  },
};

/* ─── Letanías Lauretanas ───────────────────────────────────────────────── */

export interface SeccionLetania {
  respuesta: string;
  invocaciones: string[];
}

export const LETANIAS: SeccionLetania[] = [
  {
    respuesta: 'Ten piedad de nosotros',
    invocaciones: [
      'Señor',
      'Cristo',
      'Señor',
      'Cristo, óyenos',
      'Cristo, escúchanos',
      'Dios, Padre celestial',
      'Dios, Hijo, Redentor del mundo',
      'Dios, Espíritu Santo',
      'Santísima Trinidad, un solo Dios',
    ],
  },
  {
    respuesta: 'Ruega por nosotros',
    invocaciones: [
      'Santa María',
      'Santa Madre de Dios',
      'Santa Virgen de las vírgenes',
      'Madre de Cristo',
      'Madre de la Iglesia',
      'Madre de la misericordia',
      'Madre de la divina gracia',
      'Madre de la esperanza',
      'Madre purísima',
      'Madre castísima',
      'Madre siempre virgen',
      'Madre inmaculada',
      'Madre amable',
      'Madre admirable',
      'Madre del buen consejo',
      'Madre del Creador',
      'Madre del Salvador',
      'Virgen prudentísima',
      'Virgen digna de veneración',
      'Virgen digna de alabanza',
      'Virgen poderosa',
      'Virgen clemente',
      'Virgen fiel',
      'Espejo de justicia',
      'Trono de la sabiduría',
      'Causa de nuestra alegría',
      'Vaso espiritual',
      'Vaso digno de honor',
      'Vaso insigne de devoción',
      'Rosa mística',
      'Torre de David',
      'Torre de marfil',
      'Casa de oro',
      'Arca de la Alianza',
      'Puerta del cielo',
      'Estrella de la mañana',
      'Salud de los enfermos',
      'Refugio de los pecadores',
      'Consuelo de los migrantes',
      'Consoladora de los afligidos',
      'Auxilio de los cristianos',
      'Reina de los Ángeles',
      'Reina de los Patriarcas',
      'Reina de los Profetas',
      'Reina de los Apóstoles',
      'Reina de los Mártires',
      'Reina de los Confesores',
      'Reina de las Vírgenes',
      'Reina de todos los Santos',
      'Reina concebida sin pecado original',
      'Reina asunta a los cielos',
      'Reina del Santísimo Rosario',
      'Reina de la familia',
      'Reina de la paz',
    ],
  },
  {
    respuesta: 'Perdónanos, Señor · Escúchanos, Señor · Ten misericordia de nosotros',
    invocaciones: ['Cordero de Dios, que quitas el pecado del mundo'],
  },
];

/* ─── Misterios ─────────────────────────────────────────────────────────── */

export const GRUPOS_MISTERIOS: GrupoMisterios[] = [
  {
    id: 'gozosos',
    nombre: 'Misterios Gozosos',
    singular: 'Gozoso',
    dias: 'Lunes y sábado',
    diasSemana: [1, 6],
    descripcion:
      'Contemplan el gozo de la Encarnación: el «sí» de María y la infancia de Jesús.',
    misterios: [
      {
        titulo: 'La Encarnación del Hijo de Dios',
        cita: 'Lucas 1, 26-38',
        pasaje:
          'El ángel le dijo: «No temas, María, porque has hallado gracia delante de Dios; ' +
          'vas a concebir y a dar a luz un hijo, a quien pondrás por nombre Jesús». ' +
          'María respondió: «He aquí la esclava del Señor; hágase en mí según tu palabra».',
        fruto: 'La humildad',
      },
      {
        titulo: 'La Visitación de María a su prima Isabel',
        cita: 'Lucas 1, 39-45',
        pasaje:
          'María se puso en camino y fue aprisa a la montaña. Isabel, llena del Espíritu Santo, exclamó: ' +
          '«¡Bendita tú entre las mujeres y bendito el fruto de tu vientre!».',
        fruto: 'El amor al prójimo',
      },
      {
        titulo: 'El Nacimiento de Jesús en Belén',
        cita: 'Lucas 2, 6-7',
        pasaje:
          'Mientras estaban en Belén, le llegó a María el tiempo del parto y dio a luz a su hijo primogénito; ' +
          'lo envolvió en pañales y lo acostó en un pesebre, porque no había sitio para ellos en la posada.',
        fruto: 'El espíritu de pobreza',
      },
      {
        titulo: 'La Presentación de Jesús en el Templo',
        cita: 'Lucas 2, 22-32',
        pasaje:
          'Llevaron a Jesús a Jerusalén para presentarlo al Señor. El anciano Simeón lo tomó en brazos y bendijo a Dios diciendo: ' +
          '«Mis ojos han visto tu salvación, luz para alumbrar a las naciones».',
        fruto: 'La obediencia',
      },
      {
        titulo: 'El Niño Jesús perdido y hallado en el Templo',
        cita: 'Lucas 2, 41-50',
        pasaje:
          'A los tres días lo encontraron en el Templo, sentado en medio de los maestros. ' +
          'Jesús les dijo: «¿No sabían que yo debía estar en las cosas de mi Padre?».',
        fruto: 'La búsqueda de Dios en todas las cosas',
      },
    ],
  },
  {
    id: 'luminosos',
    nombre: 'Misterios Luminosos',
    singular: 'Luminoso',
    dias: 'Jueves',
    diasSemana: [4],
    descripcion:
      'Instituidos por San Juan Pablo II: la vida pública de Jesús, luz del mundo.',
    misterios: [
      {
        titulo: 'El Bautismo de Jesús en el Jordán',
        cita: 'Mateo 3, 13-17',
        pasaje:
          'Bautizado Jesús, se abrieron los cielos y se oyó una voz que decía: ' +
          '«Este es mi Hijo amado, en quien me complazco».',
        fruto: 'La fidelidad a las promesas del Bautismo',
      },
      {
        titulo: 'Las bodas de Caná',
        cita: 'Juan 2, 1-11',
        pasaje:
          'La madre de Jesús le dijo: «No tienen vino». Y a los sirvientes: «Hagan lo que Él les diga». ' +
          'Así, en Caná de Galilea, Jesús realizó el primero de sus signos.',
        fruto: 'La confianza en la intercesión de María',
      },
      {
        titulo: 'El anuncio del Reino de Dios',
        cita: 'Marcos 1, 14-15',
        pasaje:
          'Jesús proclamaba la Buena Nueva de Dios: «El tiempo se ha cumplido y el Reino de Dios está cerca; ' +
          'conviértanse y crean en el Evangelio».',
        fruto: 'La conversión del corazón',
      },
      {
        titulo: 'La Transfiguración del Señor',
        cita: 'Lucas 9, 28-36',
        pasaje:
          'Mientras oraba, el aspecto de su rostro cambió y sus vestidos brillaban de blancura. ' +
          'Y una voz desde la nube decía: «Este es mi Hijo, el Elegido; escúchenlo».',
        fruto: 'El deseo de santidad',
      },
      {
        titulo: 'La institución de la Eucaristía',
        cita: 'Mateo 26, 26-28',
        pasaje:
          'Jesús tomó pan, lo bendijo, lo partió y lo dio a sus discípulos diciendo: ' +
          '«Tomen y coman: esto es mi Cuerpo». Y tomando el cáliz: «Beban de él, porque esta es mi Sangre».',
        fruto: 'El amor a la Eucaristía',
      },
    ],
  },
  {
    id: 'dolorosos',
    nombre: 'Misterios Dolorosos',
    singular: 'Doloroso',
    dias: 'Martes y viernes',
    diasSemana: [2, 5],
    descripcion:
      'Acompañan a Jesús en su Pasión, junto a la Virgen de los Dolores.',
    misterios: [
      {
        titulo: 'La Oración de Jesús en el Huerto',
        cita: 'Mateo 26, 36-39',
        pasaje:
          'Comenzó a sentir tristeza y angustia, y les dijo: «Mi alma está triste hasta la muerte». ' +
          'Y oraba: «Padre mío, si es posible, que pase de mí este cáliz; pero no se haga como yo quiero, sino como quieres Tú».',
        fruto: 'El dolor de los pecados',
      },
      {
        titulo: 'La Flagelación del Señor',
        cita: 'Juan 19, 1',
        pasaje: 'Entonces Pilato tomó a Jesús y mandó azotarlo.',
        fruto: 'La pureza de corazón',
      },
      {
        titulo: 'La Coronación de espinas',
        cita: 'Mateo 27, 27-31',
        pasaje:
          'Trenzaron una corona de espinas y se la pusieron en la cabeza; ' +
          'y doblando la rodilla se burlaban de Él diciendo: «¡Salve, rey de los judíos!».',
        fruto: 'La fortaleza en las pruebas',
      },
      {
        titulo: 'Jesús con la Cruz a cuestas',
        cita: 'Juan 19, 17',
        pasaje:
          'Cargando con su cruz, salió Jesús hacia el lugar llamado Calvario, que en hebreo se dice Gólgota.',
        fruto: 'La paciencia',
      },
      {
        titulo: 'La Crucifixión y Muerte de Jesús',
        cita: 'Juan 19, 25-30',
        pasaje:
          'Junto a la cruz de Jesús estaba su madre. Jesús dijo: «Mujer, ahí tienes a tu hijo»; ' +
          'luego dijo al discípulo: «Ahí tienes a tu madre». Después, inclinando la cabeza, entregó el espíritu.',
        fruto: 'El perdón y la entrega total',
      },
    ],
  },
  {
    id: 'gloriosos',
    nombre: 'Misterios Gloriosos',
    singular: 'Glorioso',
    dias: 'Miércoles y domingo',
    diasSemana: [0, 3],
    descripcion:
      'Celebran el triunfo de Cristo resucitado y la gloria de María.',
    misterios: [
      {
        titulo: 'La Resurrección del Señor',
        cita: 'Mateo 28, 1-6',
        pasaje:
          'El ángel dijo a las mujeres: «No teman. Buscan a Jesús, el crucificado: ' +
          'no está aquí, ha resucitado, como lo había dicho».',
        fruto: 'La fe',
      },
      {
        titulo: 'La Ascensión del Señor',
        cita: 'Marcos 16, 19',
        pasaje:
          'El Señor Jesús, después de hablarles, fue elevado al cielo y está sentado a la derecha de Dios.',
        fruto: 'La esperanza',
      },
      {
        titulo: 'La Venida del Espíritu Santo',
        cita: 'Hechos 2, 1-4',
        pasaje:
          'Al llegar el día de Pentecostés, se llenaron todos del Espíritu Santo, ' +
          'que se posó sobre cada uno de ellos como lenguas de fuego.',
        fruto: 'El amor de Dios y sus dones',
      },
      {
        titulo: 'La Asunción de María al cielo',
        cita: 'Apocalipsis 12, 1',
        pasaje:
          'Apareció en el cielo una señal grandiosa: una Mujer vestida de sol, ' +
          'con la luna bajo sus pies y una corona de doce estrellas sobre su cabeza.',
        fruto: 'La gracia de una buena muerte',
      },
      {
        titulo: 'La Coronación de María como Reina del cielo',
        cita: 'cf. Apocalipsis 12, 1',
        pasaje:
          'María fue coronada por la Santísima Trinidad como Reina del cielo y de la tierra, ' +
          'Madre y abogada nuestra.',
        fruto: 'La perseverancia final',
      },
    ],
  },
];

/** Grupo de misterios que corresponde al día de hoy según Rosarium Virginis Mariae. */
export function grupoDelDia(fecha = new Date()): GrupoMisterios {
  const dia = fecha.getDay();
  return GRUPOS_MISTERIOS.find(g => g.diasSemana.includes(dia)) ?? GRUPOS_MISTERIOS[0];
}

/* ─── Secuencia del rezo ────────────────────────────────────────────────── */

export type TipoPaso =
  | 'inicio'
  | 'anuncio'
  | 'padrenuestro'
  | 'avemaria'
  | 'gloria'
  | 'jaculatoria'
  | 'final';

export interface Paso {
  tipo: TipoPaso;
  titulo: string;
  /** Contexto que se muestra arriba del título (misterio actual, etc.) */
  contexto: string;
  texto: string;
  /** 0 = oraciones iniciales · 1..5 = decenas · 6 = oraciones finales */
  decena: number;
  /** Para avemarías: número de cuenta dentro de la decena (1..10; 1..3 en el inicio) */
  cuenta?: number;
  /** Si existe, el paso se muestra como letanía: filas invocación → respuesta */
  letania?: FilaLetania[];
}

export interface FilaLetania {
  invocacion: string;
  respuesta: string;
}

/**
 * Genera la secuencia completa de pasos del rosario para un grupo de
 * misterios. Es una lista plana: rezar el rosario es avanzar un índice.
 */
export function generarSecuencia(grupo: GrupoMisterios): Paso[] {
  const O = ORACIONES;
  const pasos: Paso[] = [];
  const ordinales = ['Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto'];
  const inicio = 'Oraciones iniciales';

  pasos.push(
    { tipo: 'inicio', titulo: O.senal.titulo, contexto: inicio, texto: O.senal.texto, decena: 0 },
    { tipo: 'inicio', titulo: O.credo.titulo, contexto: inicio, texto: O.credo.texto, decena: 0 },
    { tipo: 'padrenuestro', titulo: O.padrenuestro.titulo, contexto: inicio, texto: O.padrenuestro.texto, decena: 0 },
  );
  const virtudes = ['por la fe', 'por la esperanza', 'por la caridad'];
  for (let i = 1; i <= 3; i++) {
    pasos.push({
      tipo: 'avemaria',
      titulo: `Ave María · ${i} de 3`,
      contexto: `${inicio} — ${virtudes[i - 1]}`,
      texto: O.avemaria.texto,
      decena: 0,
      cuenta: i,
    });
  }
  pasos.push({ tipo: 'gloria', titulo: O.gloria.titulo, contexto: inicio, texto: O.gloria.texto, decena: 0 });

  grupo.misterios.forEach((m, idx) => {
    const d = idx + 1;
    const nombreMisterio = `${ordinales[idx]} Misterio ${grupo.singular}`;
    pasos.push({
      tipo: 'anuncio',
      titulo: m.titulo,
      contexto: `${nombreMisterio} · ${m.cita}`,
      texto: `${m.pasaje}\n\nFruto del misterio: ${m.fruto}.`,
      decena: d,
    });
    pasos.push({
      tipo: 'padrenuestro',
      titulo: O.padrenuestro.titulo,
      contexto: nombreMisterio,
      texto: O.padrenuestro.texto,
      decena: d,
    });
    for (let i = 1; i <= 10; i++) {
      pasos.push({
        tipo: 'avemaria',
        titulo: `Ave María · ${i} de 10`,
        contexto: `${nombreMisterio}: ${m.titulo}`,
        texto: O.avemaria.texto,
        decena: d,
        cuenta: i,
      });
    }
    pasos.push({
      tipo: 'gloria',
      titulo: O.gloria.titulo,
      contexto: nombreMisterio,
      texto: O.gloria.texto,
      decena: d,
    });
    pasos.push({
      tipo: 'jaculatoria',
      titulo: O.jaculatoria.titulo,
      contexto: nombreMisterio,
      texto: O.jaculatoria.texto,
      decena: d,
    });
  });

  const cierre = 'Oraciones finales';
  pasos.push(
    { tipo: 'final', titulo: O.salve.titulo, contexto: cierre, texto: O.salve.texto, decena: 6 },
  );

  // Letanías Lauretanas (esquema de San Juan Pablo II) tras la Salve, en
  // formato de tabla invocación → respuesta. Las invocaciones marianas salen
  // de LETANIAS (la misma fuente que usa el Libro de oraciones); las súplicas
  // a Dios y el Cordero van literales porque su respuesta cambia línea a línea.
  const letanias = 'Letanías Lauretanas';
  const pasoLetania = (titulo: string, filas: FilaLetania[]): Paso => ({
    tipo: 'final',
    titulo,
    contexto: letanias,
    texto: filas.map(f => `${f.invocacion}: ${f.respuesta}.`).join('\n'),
    letania: filas,
    decena: 6,
  });

  pasos.push(
    pasoLetania('Súplicas a Dios', [
      { invocacion: 'Señor, ten piedad', respuesta: 'Señor, ten piedad' },
      { invocacion: 'Cristo, ten piedad', respuesta: 'Cristo, ten piedad' },
      { invocacion: 'Señor, ten piedad', respuesta: 'Señor, ten piedad' },
      { invocacion: 'Cristo, óyenos', respuesta: 'Cristo, óyenos' },
      { invocacion: 'Cristo, escúchanos', respuesta: 'Cristo, escúchanos' },
      { invocacion: 'Dios, Padre celestial', respuesta: 'Ten piedad de nosotros' },
      { invocacion: 'Dios, Hijo, Redentor del mundo', respuesta: 'Ten piedad de nosotros' },
      { invocacion: 'Dios, Espíritu Santo', respuesta: 'Ten piedad de nosotros' },
      { invocacion: 'Santísima Trinidad, un solo Dios', respuesta: 'Ten piedad de nosotros' },
    ]),
    pasoLetania(
      'Invocaciones a la Santísima Virgen',
      LETANIAS[1].invocaciones.map(inv => ({
        invocacion: inv,
        respuesta: 'Ruega por nosotros',
      })),
    ),
    pasoLetania('Cordero de Dios', [
      { invocacion: 'Cordero de Dios, que quitas el pecado del mundo', respuesta: 'Perdónanos, Señor' },
      { invocacion: 'Cordero de Dios, que quitas el pecado del mundo', respuesta: 'Escúchanos, Señor' },
      { invocacion: 'Cordero de Dios, que quitas el pecado del mundo', respuesta: 'Ten misericordia de nosotros' },
      {
        invocacion: 'Ruega por nosotros, Santa Madre de Dios',
        respuesta: 'Para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo',
      },
    ]),
    { tipo: 'final', titulo: O.bajoTuAmparo.titulo, contexto: cierre, texto: O.bajoTuAmparo.texto, decena: 6 },
    { tipo: 'final', titulo: O.oracionFinal.titulo, contexto: cierre, texto: O.oracionFinal.texto, decena: 6 },
    { tipo: 'final', titulo: O.senal.titulo, contexto: cierre, texto: O.senal.texto, decena: 6 },
  );

  return pasos;
}
