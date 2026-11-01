// Datos de la página especial /eventos/todos-los-santos (Solemnidad de
// Todos los Santos, 1 de noviembre). Todo lo editable vive aquí para no
// tocar los componentes.
//
// TODO: confirmar el horario real de la Misa solemne — el de abajo es un
// placeholder de ejemplo. El 1 de noviembre de 2026 cae en domingo.

export const DETALLES = {
  fecha: 'Domingo 1 de noviembre',
  horario: '11:00 a.m. y 6:00 p.m. — Misa solemne',
};

/** Símbolo dibujado en la estampa y en el papel picado — ver SimboloSanto.tsx. */
export type SimboloSanto =
  | 'cruz' | 'paloma' | 'lirio' | 'estrella' | 'corazon' | 'custodia' | 'flor'
  | 'rosa' | 'concha' | 'trigo' | 'libro' | 'llaves' | 'lira' | 'palma'
  | 'montana' | 'llama';

/** Color de fondo de la estampa; cada uno se resuelve a un par de tonos en EstampaSanto. */
export type TonoSanto = 'vino' | 'terracota' | 'azul' | 'olivo' | 'mostaza';

export interface Santo {
  id: string;
  nombre: string;
  fiesta: string;
  patronazgo: string;
  /** Una o dos líneas: se usa en la galería y en la tarjeta de "Conoce a un santo". */
  descripcion: string;
  dato: string;
  frase: string;
  /** Párrafos que se muestran en "Conocer su historia". */
  historia: string[];
  simbolo: SimboloSanto;
  tono: TonoSanto;
  /** Foto o pintura del santo (en public/). Si falta, la estampa se dibuja
   *  con su símbolo. */
  imagen?: string;
}

/** Catálogo curado: santos muy queridos en México y algunos cercanos a los
 *  jóvenes. No es un santoral completo; el orden es el de la galería. */
export const SANTOS: Santo[] = [
  {
    id: 'juan-bautista',
    imagen: '/todos-los-santos/santos/juan-bautista.webp',
    nombre: 'San Juan Bautista',
    fiesta: '24 de junio',
    patronazgo: 'Patrono de nuestra parroquia',
    descripcion: 'El profeta que preparó el camino de Jesús en el desierto y lo señaló diciendo: «Este es el Cordero de Dios».',
    dato: 'Junto con Jesús y la Virgen María, es de los pocos cuyo nacimiento celebra la Iglesia con una fiesta propia.',
    frase: 'Es necesario que él crezca y que yo disminuya.',
    historia: [
      'Hijo de Zacarías e Isabel, pariente de la Virgen María, Juan nació cuando sus padres ya eran mayores. Desde joven se retiró al desierto, vestido con piel de camello, para predicar la conversión y bautizar en el río Jordán a quienes querían cambiar de vida.',
      'Su mayor alegría fue señalar a otro: cuando Jesús llegó al Jordán, Juan lo bautizó y lo presentó como el Cordero de Dios. Fue fiel a la verdad hasta el final, y Jesús dijo de él que entre los nacidos de mujer no había nadie más grande.',
    ],
    simbolo: 'concha',
    tono: 'vino',
  },
  {
    id: 'juan-diego',
    imagen: '/todos-los-santos/santos/juan-diego.webp',
    nombre: 'San Juan Diego',
    fiesta: '9 de diciembre',
    patronazgo: 'Patrono de los pueblos indígenas',
    descripcion: 'Un indígena sencillo de Cuautitlán a quien la Virgen de Guadalupe eligió como su mensajero en el Tepeyac.',
    dato: 'Fue el primer santo indígena de América: san Juan Pablo II lo canonizó en la Basílica de Guadalupe en 2002.',
    frase: 'Soy un hombrecillo, soy un mecapal, soy parihuela…',
    historia: [
      'En diciembre de 1531, camino a la doctrina, Juan Diego escuchó un canto en el cerro del Tepeyac y encontró a una Señora que le habló en náhuatl y le pidió que ahí se construyera un templo. El obispo, fray Juan de Zumárraga, le pidió una señal.',
      'La Virgen le indicó subir al cerro, donde en pleno invierno encontró rosas de Castilla. Al desplegar su tilma ante el obispo apareció la imagen de Santa María de Guadalupe. Juan Diego pasó el resto de su vida cuidando la ermita y recibiendo a los peregrinos.',
    ],
    simbolo: 'rosa',
    tono: 'olivo',
  },
  {
    id: 'jose',
    imagen: '/todos-los-santos/santos/jose.webp',
    nombre: 'San José',
    fiesta: '19 de marzo',
    patronazgo: 'Patrono de la Iglesia universal y de los trabajadores',
    descripcion: 'El carpintero de Nazaret que cuidó de María y de Jesús con un amor silencioso y fiel.',
    dato: 'Los Evangelios no recogen ni una sola palabra suya: toda su santidad se cuenta a través de lo que hizo.',
    frase: 'Hizo como el ángel del Señor le había mandado.',
    historia: [
      'José era un artesano de Nazaret, descendiente del rey David, comprometido con María. Cuando supo que ella esperaba un hijo, un ángel le reveló en sueños que era obra del Espíritu Santo, y José la recibió en su casa sin dudar.',
      'Protegió a la Sagrada Familia en la huida a Egipto, enseñó a Jesús su oficio y lo educó en la fe de Israel. El papa Francisco le dedicó un año especial con la carta «Con corazón de padre».',
    ],
    simbolo: 'lirio',
    tono: 'azul',
  },
  {
    id: 'francisco-asis',
    imagen: '/todos-los-santos/santos/francisco-asis.webp',
    nombre: 'San Francisco de Asís',
    fiesta: '4 de octubre',
    patronazgo: 'Patrono de la ecología y de los animales',
    descripcion: 'El joven rico de Asís que lo dejó todo para vivir pobre, alegre y hermano de toda la creación.',
    dato: 'En la Navidad de 1223 organizó en Greccio el primer nacimiento viviente de la historia.',
    frase: 'Alabado seas, mi Señor, con todas tus criaturas.',
    historia: [
      'Francisco soñaba con ser caballero, pero tras una enfermedad escuchó a Cristo que le pedía desde el crucifijo de San Damián: «Repara mi casa». Renunció a la herencia de su padre y comenzó a vivir en pobreza, cuidando a los leprosos y predicando la paz.',
      'Muy pronto otros jóvenes lo siguieron y nació la Orden de los Frailes Menores. Su Cántico de las criaturas, que llama hermanos al sol, a la luna y al agua, inspiró al papa Francisco a escribir la encíclica Laudato si’.',
    ],
    simbolo: 'paloma',
    tono: 'terracota',
  },
  {
    id: 'felipe-de-jesus',
    imagen: '/todos-los-santos/santos/felipe-de-jesus.webp',
    nombre: 'San Felipe de Jesús',
    fiesta: '5 de febrero',
    patronazgo: 'Patrono de la Ciudad de México',
    descripcion: 'El primer santo nacido en México: un joven inquieto que encontró su vocación al otro lado del mundo.',
    dato: 'Es el protomártir mexicano: el primer mexicano en dar la vida por la fe, en Nagasaki, Japón, en 1597.',
    frase: 'Cuando la higuera reverdezca, Felipillo será santo.',
    historia: [
      'Felipe de las Casas nació en la Ciudad de México hacia 1572. De joven fue travieso e inconstante: entró con los franciscanos, salió, y se fue a buscar fortuna a Filipinas. Allí, lejos de casa, volvió a sentir el llamado de Dios.',
      'De regreso a México para ordenarse sacerdote, una tormenta desvió su barco hacia Japón. Ahí dio testimonio de su fe junto a otros misioneros. Cuenta la tradición que una higuera seca de su casa reverdeció, como su nana había anunciado.',
    ],
    simbolo: 'palma',
    tono: 'vino',
  },
  {
    id: 'jose-sanchez-del-rio',
    imagen: '/todos-los-santos/santos/jose-sanchez-del-rio.webp',
    nombre: 'San José Sánchez del Río',
    fiesta: '10 de febrero',
    patronazgo: 'Modelo de fe para niños y adolescentes',
    descripcion: 'Un adolescente michoacano de Sahuayo que, con solo 14 años, se mantuvo firme en su fe.',
    dato: 'Es uno de los santos más cercanos a nosotros: nació en Sahuayo, Michoacán, y el papa Francisco lo canonizó en 2016.',
    frase: '¡Viva Cristo Rey y la Virgen de Guadalupe!',
    historia: [
      'Joselito nació en 1913 en Sahuayo. Durante la persecución religiosa de los años veinte, cuando se cerraron los templos en México, quiso apoyar a quienes defendían la libertad de creer y vivió su fe con valentía.',
      'Fue detenido y presionado para renegar de Cristo, pero respondió siempre con firmeza y con oración. Su testimonio, a tan corta edad, sigue inspirando a miles de jóvenes mexicanos.',
    ],
    simbolo: 'estrella',
    tono: 'olivo',
  },
  {
    id: 'teresita',
    imagen: '/todos-los-santos/santos/teresita.webp',
    nombre: 'Santa Teresita del Niño Jesús',
    fiesta: '1 de octubre',
    patronazgo: 'Patrona de las misiones',
    descripcion: 'Una joven carmelita francesa que descubrió el «caminito» de la confianza: hacer lo pequeño con mucho amor.',
    dato: 'Nunca salió de su convento en Lisieux y aun así es patrona de las misiones. En 1997 fue declarada Doctora de la Iglesia.',
    frase: 'Quiero pasar mi cielo haciendo el bien en la tierra.',
    historia: [
      'Teresa Martin entró al Carmelo a los 15 años, después de pedirle el permiso en persona al papa León XIII. Ahí vivió una vida escondida, sin hechos extraordinarios, ofreciendo cada gesto cotidiano como un acto de amor.',
      'Por obediencia escribió sus recuerdos, publicados como Historia de un alma, uno de los libros espirituales más leídos del mundo. Prometió dejar caer una «lluvia de rosas» sobre quienes le pidieran ayuda.',
    ],
    simbolo: 'flor',
    tono: 'terracota',
  },
  {
    id: 'martin-de-porres',
    imagen: '/todos-los-santos/santos/martin-de-porres.webp',
    nombre: 'San Martín de Porres',
    fiesta: '3 de noviembre',
    patronazgo: 'Patrono de la justicia social',
    descripcion: 'Fraile dominico de Lima que sirvió a pobres y enfermos con humildad y buen humor.',
    dato: 'Fue el primer santo mulato de América. San Juan XXIII lo canonizó en 1962, y se le representa con una escoba.',
    frase: 'Yo te curo, Dios te sana.',
    historia: [
      'Martín nació en Lima en 1579, hijo de un caballero español y de una mujer liberta, y desde niño sufrió el desprecio por el color de su piel. Aprendió el oficio de barbero y enfermero, y entró en el convento dominico del Rosario, donde aceptaba con gusto los trabajos más humildes.',
      'Curaba a enfermos de toda condición, repartía comida a los pobres y cuidaba incluso a los animales abandonados. Las crónicas cuentan que en su plato llegaron a comer juntos un perro, un gato y un ratón.',
    ],
    simbolo: 'cruz',
    tono: 'azul',
  },
  {
    id: 'judas-tadeo',
    imagen: '/todos-los-santos/santos/judas-tadeo.webp',
    nombre: 'San Judas Tadeo',
    fiesta: '28 de octubre',
    patronazgo: 'Patrono de las causas difíciles',
    descripcion: 'Apóstol y pariente de Jesús, intercesor de quienes atraviesan situaciones que parecen no tener salida.',
    dato: 'En la Ciudad de México, cada día 28 miles de personas visitan el templo de San Hipólito para agradecerle y pedir su ayuda.',
    frase: 'Manténganse en el amor de Dios.',
    historia: [
      'Fue uno de los doce apóstoles. En la Última Cena le preguntó a Jesús por qué se manifestaría a ellos y no al mundo, y recibió una respuesta llena de ternura: «El que me ama guardará mi palabra, y mi Padre lo amará».',
      'La tradición cuenta que predicó el Evangelio junto a san Simón en Mesopotamia y Persia. Se le representa con una llama sobre la cabeza, recuerdo de Pentecostés, y con una medalla con el rostro de Cristo.',
    ],
    simbolo: 'llama',
    tono: 'olivo',
  },
  {
    id: 'antonio-padua',
    imagen: '/todos-los-santos/santos/antonio-padua.webp',
    nombre: 'San Antonio de Padua',
    fiesta: '13 de junio',
    patronazgo: 'Patrono de los pobres y de las cosas perdidas',
    descripcion: 'Un fraile franciscano de palabra tan clara que, dice la tradición, hasta los peces salieron a escucharlo.',
    dato: 'Aunque se le conoce «de Padua», nació en Lisboa, Portugal. Es Doctor de la Iglesia.',
    frase: 'Cesen las palabras, hablen las obras.',
    historia: [
      'Fernando de Bulhões fue primero canónigo agustino, pero al conocer el testimonio de unos frailes franciscanos misioneros decidió hacerse fraile menor y tomó el nombre de Antonio. Quería misionar en África, pero una tormenta llevó su barco a Italia.',
      'Allí, casi por accidente, descubrieron su enorme don para predicar. San Francisco le confió la enseñanza de la teología a los frailes, y la gente lo buscaba por su sabiduría y su cercanía con los pobres.',
    ],
    simbolo: 'lirio',
    tono: 'terracota',
  },
  {
    id: 'rita-casia',
    imagen: '/todos-los-santos/santos/rita-casia.webp',
    nombre: 'Santa Rita de Casia',
    fiesta: '22 de mayo',
    patronazgo: 'Patrona de las causas imposibles',
    descripcion: 'Esposa, madre y religiosa italiana que hizo del perdón el centro de su vida.',
    dato: 'Se le representa con rosas: la tradición cuenta que, en pleno invierno, floreció una rosa en el huerto de su casa como señal de Dios.',
    frase: 'Donde hubo una herida, sembró perdón.',
    historia: [
      'Rita vivió en la región italiana de Umbría en el siglo XIV. Se casó joven con un hombre de carácter violento, a quien con paciencia y oración ayudó a cambiar. Cuando él perdió la vida en una disputa entre familias, Rita perdonó a los responsables y procuró que sus hijos no buscaran venganza.',
      'Más tarde entró con las agustinas de Casia, donde vivió cuarenta años de oración. Desde entonces se le invoca en lo que parece imposible: matrimonios heridos, reconciliaciones difíciles, causas sin salida.',
    ],
    simbolo: 'rosa',
    tono: 'vino',
  },
  {
    id: 'juan-pablo-ii',
    imagen: '/todos-los-santos/santos/juan-pablo-ii.webp',
    nombre: 'San Juan Pablo II',
    fiesta: '22 de octubre',
    patronazgo: 'Patrono de las familias y de la Jornada Mundial de la Juventud',
    descripcion: 'El papa peregrino que recorrió el mundo y llenó de esperanza a toda una generación de jóvenes.',
    dato: 'Visitó México cinco veces, entre 1979 y 2002, y aquí canonizó a san Juan Diego.',
    frase: '¡No tengan miedo! ¡Abran de par en par las puertas a Cristo!',
    historia: [
      'Karol Wojtyła nació en Wadowice, Polonia, en 1920. Fue obrero, actor de teatro y poeta antes de entrar al seminario clandestino durante la Segunda Guerra Mundial. Llegó a ser arzobispo de Cracovia y, en 1978, el primer papa no italiano en más de cuatro siglos.',
      'En casi 27 años de pontificado viajó a más de cien países, inició las Jornadas Mundiales de la Juventud y defendió la dignidad de toda persona. Fue canonizado en 2014.',
    ],
    simbolo: 'llaves',
    tono: 'mostaza',
  },
  {
    id: 'carlo-acutis',
    nombre: 'San Carlo Acutis',
    fiesta: '12 de octubre',
    patronazgo: 'Intercesor de los jóvenes en el mundo digital',
    descripcion: 'Un adolescente italiano apasionado por la informática que usó la tecnología para hablar de Jesús.',
    dato: 'Canonizado en septiembre de 2025, es el primer santo millennial. Creó una exposición web sobre los milagros eucarísticos.',
    frase: 'La Eucaristía es mi autopista al cielo.',
    historia: [
      'Carlo nació en 1991 en Londres y creció en Milán. Le gustaban los videojuegos, el futbol y programar; pero lo que más amaba era la Misa diaria y la adoración al Santísimo.',
      'Con sus conocimientos de informática diseñó una exposición sobre los milagros eucarísticos que ha recorrido cientos de parroquias en el mundo. Vivió su fe con naturalidad, ayudando a compañeros, migrantes y personas sin hogar de su barrio.',
    ],
    simbolo: 'custodia',
    tono: 'azul',
  },
  {
    id: 'clara-asis',
    nombre: 'Santa Clara de Asís',
    fiesta: '11 de agosto',
    patronazgo: 'Patrona de la televisión',
    descripcion: 'Amiga y discípula de san Francisco, fundó las Clarisas y vivió la pobreza con una alegría luminosa.',
    dato: 'Pío XII la nombró patrona de la televisión: estando enferma, pudo ver y oír la Misa de Navidad proyectada en la pared de su celda.',
    frase: 'Ama totalmente a quien totalmente se entregó por tu amor.',
    historia: [
      'Chiara Offreduccio, joven noble de Asís, escuchó predicar a Francisco y, a los 18 años, dejó su casa la noche del Domingo de Ramos para consagrarse a Dios.',
      'En San Damián fundó la comunidad de las Damas Pobres, hoy Clarisas. Se le representa con la custodia porque, según la tradición, defendió su convento mostrando el Santísimo Sacramento.',
    ],
    simbolo: 'custodia',
    tono: 'mostaza',
  },
  {
    id: 'cecilia',
    nombre: 'Santa Cecilia',
    fiesta: '22 de noviembre',
    patronazgo: 'Patrona de los músicos',
    descripcion: 'Joven romana de los primeros siglos que consagró su vida a Cristo y la vivió como un canto.',
    dato: 'Su patronazgo nace de un relato antiguo: mientras los instrumentos sonaban en su boda, ella cantaba en su corazón solo para Dios.',
    frase: 'Cantaba en su corazón solo para el Señor.',
    historia: [
      'Cecilia pertenecía a una familia noble de Roma en el siglo III. Según su relato tradicional, el día de su boda le confió a Valeriano que había entregado su vida a Dios; él, conmovido, se bautizó y compartió su fe.',
      'Ambos dieron testimonio de Cristo en tiempos de persecución. Su nombre se pronuncia hasta hoy en la plegaria eucarística de la Misa, y su basílica en el Trastevere de Roma es meta de peregrinos y músicos.',
    ],
    simbolo: 'lira',
    tono: 'azul',
  },
  {
    id: 'isidro-labrador',
    nombre: 'San Isidro Labrador',
    fiesta: '15 de mayo',
    patronazgo: 'Patrono de los agricultores y del campo',
    descripcion: 'Un campesino de Madrid que unió el trabajo de la tierra con la oración y la generosidad.',
    dato: 'En muchos pueblos de México su fiesta se celebra bendiciendo semillas, yuntas y animales. «San Isidro Labrador, quita el agua y pon el sol», dice el refrán.',
    frase: 'El trabajo hecho con amor también es oración.',
    historia: [
      'Isidro trabajó toda su vida como jornalero en las tierras de un señor de Madrid, en el siglo XII. Cada mañana iba a Misa antes de salir al campo; cuentan que, mientras rezaba, unos ángeles le ayudaban a arar.',
      'Junto con su esposa, santa María de la Cabeza, compartía lo poco que tenía con los pobres. Su vida recuerda que no hace falta salir del trabajo diario para encontrarse con Dios.',
    ],
    simbolo: 'trigo',
    tono: 'mostaza',
  },
  {
    id: 'ignacio-loyola',
    nombre: 'San Ignacio de Loyola',
    fiesta: '31 de julio',
    patronazgo: 'Patrono de los Ejercicios Espirituales',
    descripcion: 'Un soldado vasco que cambió los sueños de gloria por la vida de Cristo y fundó la Compañía de Jesús.',
    dato: 'Mientras se recuperaba de una herida solo había en casa vidas de santos; leyéndolas se preguntó: «¿Y si yo hiciese lo que hizo san Francisco?».',
    frase: 'En todo amar y servir.',
    historia: [
      'En 1521 una bala de cañón lo hirió en la defensa de Pamplona. En la larga convalecencia en el castillo de Loyola descubrió que los sueños de gloria lo dejaban vacío, mientras que pensar en Cristo le daba una paz duradera.',
      'De esa experiencia nacieron los Ejercicios Espirituales, un camino para discernir la voluntad de Dios. Con un grupo de amigos fundó en 1540 la Compañía de Jesús, presente hoy en escuelas y misiones de todo el mundo.',
    ],
    simbolo: 'libro',
    tono: 'vino',
  },
  {
    id: 'monica',
    nombre: 'Santa Mónica',
    fiesta: '27 de agosto',
    patronazgo: 'Patrona de las madres',
    descripcion: 'Madre de san Agustín, que oró durante años con paciencia y esperanza por la conversión de su hijo.',
    dato: 'Siguió a su hijo desde el norte de África hasta Milán, donde por fin lo vio bautizarse en la Pascua del año 387.',
    frase: 'Es imposible que se pierda el hijo de tantas lágrimas.',
    historia: [
      'Mónica nació en el norte de África en el siglo IV. Casada con un hombre de carácter difícil, lo ganó para la fe con su paciencia. Su hijo Agustín, brillante pero inquieto, se alejó de Dios durante años.',
      'Ella nunca dejó de rezar por él ni de acompañarlo. Un obispo la consoló con la frase que hoy la acompaña, y en Milán Agustín encontró a san Ambrosio y se convirtió.',
    ],
    simbolo: 'flor',
    tono: 'olivo',
  },
  {
    id: 'agustin',
    nombre: 'San Agustín de Hipona',
    fiesta: '28 de agosto',
    patronazgo: 'Patrono de los teólogos y de quienes buscan la verdad',
    descripcion: 'Un gran buscador de la verdad que, después de muchos caminos, encontró en Dios el descanso de su corazón.',
    dato: 'Sus Confesiones, escritas hacia el año 400, son consideradas una de las primeras autobiografías de la historia.',
    frase: 'Nos hiciste, Señor, para ti, y nuestro corazón está inquieto hasta que descanse en ti.',
    historia: [
      'Agustín fue un joven profesor de retórica, apasionado por las ideas y por los placeres del mundo. Buscó la verdad en muchas filosofías sin quedar satisfecho, mientras su madre, santa Mónica, rezaba por él.',
      'En un jardín de Milán escuchó una voz infantil que repetía «toma y lee»; abrió la Biblia y sintió que su vida cambiaba. Fue bautizado, más tarde obispo de Hipona, y sus escritos siguen siendo de los más influyentes de la Iglesia.',
    ],
    simbolo: 'corazon',
    tono: 'terracota',
  },
  {
    id: 'pio-pietrelcina',
    nombre: 'San Pío de Pietrelcina',
    fiesta: '23 de septiembre',
    patronazgo: 'Intercesor de los enfermos y de quienes sufren',
    descripcion: 'El fraile capuchino que pasaba horas en el confesionario y abrió un gran hospital para aliviar el sufrimiento.',
    dato: 'Fundó la Casa Alivio del Sufrimiento, en San Giovanni Rotondo, uno de los hospitales más modernos de Italia en su tiempo.',
    frase: 'Reza, espera y no te preocupes.',
    historia: [
      'Francesco Forgione nació en el sur de Italia en 1887 y entró de joven con los capuchinos. Vivió casi toda su vida en el convento de San Giovanni Rotondo, donde miles de personas acudían para confesarse con él.',
      'Llevó durante cincuenta años los estigmas de la Pasión de Cristo, que vivió con humildad y discreción. Sus «grupos de oración» siguen reuniéndose hoy en todo el mundo.',
    ],
    simbolo: 'cruz',
    tono: 'terracota',
  },
  {
    id: 'teresa-calcuta',
    nombre: 'Santa Teresa de Calcuta',
    fiesta: '5 de septiembre',
    patronazgo: 'Modelo de servicio a los más pobres',
    descripcion: 'Religiosa que dedicó su vida a servir a «los más pobres entre los pobres» en las calles de Calcuta.',
    dato: 'Recibió el Premio Nobel de la Paz en 1979 y pidió que se cancelara el banquete de honor para dar ese dinero a los pobres.',
    frase: 'No todos podemos hacer grandes cosas, pero sí cosas pequeñas con gran amor.',
    historia: [
      'Agnes Gonxha Bojaxhiu nació en Skopie en 1910 y viajó a la India como religiosa para enseñar. En 1946, en un tren, sintió lo que llamó «una llamada dentro de la llamada»: servir a Cristo en los más pobres.',
      'Fundó las Misioneras de la Caridad, que hoy acogen a enfermos, abandonados y personas sin hogar en todo el mundo. El papa Francisco la canonizó en 2016.',
    ],
    simbolo: 'corazon',
    tono: 'azul',
  },
  {
    id: 'juan-bosco',
    nombre: 'San Juan Bosco',
    fiesta: '31 de enero',
    patronazgo: 'Patrono de la juventud',
    descripcion: 'Sacerdote italiano que dedicó su vida a educar a los jóvenes con alegría, razón y fe.',
    dato: 'De niño aprendió trucos de magia y acrobacias para reunir a sus amigos y, al final del espectáculo, invitarlos a rezar.',
    frase: 'Basta que sean jóvenes para que yo los ame.',
    historia: [
      'Juan nació en 1815 en una familia campesina del Piamonte. A los nueve años tuvo un sueño en el que entendió que su misión sería ganarse el corazón de los jóvenes «no con golpes, sino con mansedumbre y caridad».',
      'En Turín abrió el Oratorio, donde acogía a muchachos de la calle para darles juego, oficio y fe. Fundó a los Salesianos y, con santa María Mazzarello, a las Hijas de María Auxiliadora.',
    ],
    simbolo: 'estrella',
    tono: 'mostaza',
  },
  {
    id: 'frassati',
    nombre: 'San Pier Giorgio Frassati',
    fiesta: '4 de julio',
    patronazgo: 'Modelo para estudiantes y deportistas',
    descripcion: 'Un joven de Turín, alpinista y estudiante, que unía la alegría de vivir con un servicio discreto a los pobres.',
    dato: 'Solía escribir «Verso l’alto» —«hacia lo alto»— en sus fotos de montaña. Fue canonizado en 2025, junto a Carlo Acutis.',
    frase: '¡Hacia lo alto!',
    historia: [
      'Pier Giorgio nació en 1901 en una familia influyente de Turín. Estudiaba ingeniería de minas y amaba la montaña, el teatro y las bromas con sus amigos.',
      'Sin que su familia lo supiera, visitaba a los pobres y enfermos de la ciudad y les daba su dinero, su tiempo y hasta su abrigo. San Juan Pablo II lo llamó «el hombre de las ocho bienaventuranzas».',
    ],
    simbolo: 'montana',
    tono: 'olivo',
  },
];
