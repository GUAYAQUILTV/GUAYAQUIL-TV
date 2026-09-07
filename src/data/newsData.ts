import { NewsItem, VideoItem, LiveStreamConfig, CategoryInfo, SocialLink, AdBannerConfig, SportsScore } from '../types';

/**
 * ============================================================================
 * GYE TV+ - ARCHIVO DE DATOS DEMO Y CONFIGURACIÓN CENTRAL
 * ============================================================================
 * 
 * GUÍA RÁPIDA PARA WEBMASTERS Y EDITORES:
 * 1. Para cambiar las NOTICIAS: edita el arreglo `DEMO_NEWS` a continuación.
 * 2. Para cambiar el STREAM EN VIVO: modifica `LIVE_STREAM_CONFIG.youtubeEmbedId` o `customStreamUrl`.
 * 3. Para cambiar REDES SOCIALES: edita el arreglo `SOCIAL_LINKS`.
 * 4. Para reemplazar los BANNERS DE PUBLICIDAD: actualiza `AD_BANNERS`.
 * ============================================================================
 */

export const DEMO_NEWS: NewsItem[] = [
  {
    id: 'noticia-1',
    title: 'Guayaquil se prepara para un nuevo fin de semana lleno de actividades culturales y turísticas en el Malecón 2000',
    subtitle: 'Música en vivo, festivales gastronómicos y paseos náuticos por el Río Guayas forman parte de la agenda oficial.',
    category: 'Guayaquil',
    subcategory: 'Turismo y Ciudad',
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80',
    date: '07 Sep 2026',
    time: '14:30',
    description: 'La Perla del Pacífico acoge a miles de visitantes nacionales y extranjeros con una variada cartelera cultural que impulsa el comercio y la convivencia ciudadana.',
    content: [
      'Guayaquil vivirá un intenso fin de semana de actividades culturales, gastronómicas y recreativas en el emblemático Malecón 2000 y el Cerro Santa Ana. Autoridades municipales y gestores culturales presentaron una nutrida agenda pensada para toda la familia.',
      'Entre los eventos principales destaca el Festival de Sabores Guayacos en la terraza del Centro Comercial Malecón, donde más de 30 exponentes tradicionales ofrecerán platos icónicos como el encebollado, el seco de chivo y los cangrejos al estilo porteño.',
      'Asimismo, la Dirección de Turismo confirmó que se incrementará la frecuencia de los recorridos turísticos en embarcaciones por el Río Guayas, brindando una perspectiva única del atardecer porteño bajo estrictos protocolos de seguridad y resguardo fluvial.'
    ],
    author: {
      name: 'Carlos Mendoza',
      role: 'Redacción GYE TV+',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '3 min',
    isFeatured: true,
    isBreaking: false,
    tags: ['Malecón 2000', 'Guayaquil', 'Turismo', 'Cultura', 'Río Guayas'],
    viewsCount: 14250,
    source: 'GYE TV+ Digital'
  },
  {
    id: 'noticia-2',
    title: 'Autoridades anuncian nuevos operativos de control y patrullaje preventivo en zonas estratégicas de la ciudad',
    subtitle: 'El plan integral contempla monitoreo con cámaras de alta definición y mayor despliegue táctico interinstitucional.',
    category: 'Seguridad',
    subcategory: 'Comunidad y Orden',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    date: '07 Sep 2026',
    time: '12:15',
    description: 'Fuerzas de seguridad refuerzan la vigilancia en corredores comerciales, paradas de transporte público y accesos principales del Gran Guayaquil.',
    content: [
      'En una rueda de prensa conjunta celebrada en la Corporación para la Seguridad Ciudadana de Guayaquil, se oficializó el inicio de la segunda fase del plan de patrullaje preventivo reforzado en puntos clave de la urbe.',
      'Las acciones coordinadas priorizan sectores como la Avenida 9 de Octubre, Urdesa, Vía a la Costa y la zona sur de la ciudad, con el apoyo de patrullas motorizadas y drones de vigilancia aérea.',
      'Representantes ciudadanos destacaron la importancia de mantener una comunicación fluida a través de las líneas directas de auxilio y botones de pánico comunitarios.'
    ],
    author: {
      name: 'Valeria Solís',
      role: 'Periodista de Actualidad',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '4 min',
    isFeatured: false,
    isUrgent: true,
    isBreaking: true,
    tags: ['Seguridad', 'Guayaquil', 'Operativos', 'Comunidad'],
    viewsCount: 22180,
    source: 'GYE TV+ Urgente'
  },
  {
    id: 'noticia-3',
    title: 'El deporte guayaquileño vuelve a ser protagonista: Barcelona SC y Emelec afinan detalles para la fecha definitoria',
    subtitle: 'Los clubes del Astillero concentran sus mejores plantillas de cara a los compromisos de la Liga Pro ecuatoriana.',
    category: 'Deportes',
    subcategory: 'Liga Pro Ecuador',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    date: '07 Sep 2026',
    time: '10:45',
    description: 'La emoción del fútbol ecuatoriano se enciende en Guayaquil con entrenamientos a doble jornada y gran expectativa entre los aficionados de ambos planteles.',
    content: [
      'El ambiente futbolístico en Guayaquil alcanza su máxima intensidad. Barcelona Sporting Club cumplió su práctica matutina en la cancha alterna del Estadio Monumental, enfocándose en la definición y la presión alta.',
      'Por su parte, el Club Sport Emelec entrenó en el complejo de Los Samanes con el retorno de sus figuras estelares tras superar molestias físicas, buscando sumar puntos decisivos en la tabla acumulada.',
      'La afición guayaquileña ya agota las localidades disponibles en puntos autorizados, previéndose un lleno total en los escenarios deportivos este fin de semana.'
    ],
    author: {
      name: 'Diego Alarcón',
      role: 'Editor de Deportes GYE TV+',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '3 min',
    isFeatured: false,
    tags: ['Deportes', 'Barcelona SC', 'Emelec', 'Liga Pro', 'Fútbol'],
    viewsCount: 31400,
    source: 'GYE TV+ Deportes'
  },
  {
    id: 'noticia-4',
    title: 'Eventos culturales y exposiciones de arte contemporáneo buscan atraer a más visitantes al barrio Las Peñas',
    subtitle: 'Artistas plásticos locales transforman las históricas escalinatas en galerías abiertas al aire libre.',
    category: 'Cultura',
    subcategory: 'Patrimonio y Arte',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
    date: '07 Sep 2026',
    time: '09:00',
    description: 'El tradicional barrio patrimonial de Guayaquil vibra con recitales de poesía, talleres de pintura en vivo y muestras fotográficas históricas.',
    content: [
      'Las icónicas 444 escalinatas del Cerro Santa Ana y la calle Numa Pompilio Llona en Las Peñas se consolidan como el epicentro cultural de Guayaquil gracias a una nueva muestra colectiva de artistas independientes.',
      'La iniciativa reúne a más de 40 creadores visuales que expondrán óleos, esculturas en madera reciclada e instalaciones lumínicas que rinden tributo a la historia marítima y fluvial de la urbe.',
      'Los asistentes podrán disfrutar de visitas guiadas gratuitas todos los fines de semana a partir de las 16:00 horas, con presentaciones de música acústica en los miradores.'
    ],
    author: {
      name: 'Isabel Carvajal',
      role: 'Cultura & Estilo de Vida',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '2 min',
    isFeatured: false,
    tags: ['Las Peñas', 'Cerro Santa Ana', 'Cultura', 'Arte', 'Guayaquil'],
    viewsCount: 8900,
    source: 'GYE TV+ Cultura'
  },
  {
    id: 'noticia-5',
    title: 'Modernización del sistema de transporte urbano: Nuevas unidades eléctricas entran en fase de prueba en Guayaquil',
    subtitle: 'El proyecto busca reducir las emisiones de carbono y mejorar la experiencia de miles de usuarios diarios.',
    category: 'Guayaquil',
    subcategory: 'Movilidad Urbana',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    date: '06 Sep 2026',
    time: '18:20',
    description: 'Buses 100% eléctricos con aire acondicionado, puertos USB y rampas de accesibilidad universal recorren los principales corredores viales.',
    content: [
      'La movilidad en Guayaquil da un paso decisivo hacia la sostenibilidad con la incorporación de modernas unidades de transporte eléctrico que ya circulan en fase de evaluación técnica.',
      'Los vehículos cuentan con tecnología de carga ultrarrápida, climatización automática adaptada al clima cálido de la ciudad y cámaras de seguridad enlazadas en tiempo real al sistema central.',
      'Usuarios que formaron parte de los primeros recorridos expresaron su satisfacción por el confort térmico y la notable reducción del ruido en el interior del autobús.'
    ],
    author: {
      name: 'Carlos Mendoza',
      role: 'Redacción GYE TV+',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '3 min',
    isFeatured: false,
    tags: ['Transporte', 'Guayaquil', 'Ecológico', 'Innovación'],
    viewsCount: 16700,
    source: 'GYE TV+ Movilidad'
  },
  {
    id: 'noticia-6',
    title: 'Festival Internacional de Música y Tendencias reúne a destacados artistas en el Parque Samanes',
    subtitle: 'Más de 20 mil asistentes corearon los éxitos de solistas nacionales y bandas internacionales invitadas.',
    category: 'Entretenimiento',
    subcategory: 'Música y Espectáculos',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    date: '06 Sep 2026',
    time: '15:10',
    description: 'Una fiesta inolvidable de luces, ritmo y energía celebró la diversidad musical en uno de los parques más extensos de Sudamérica.',
    content: [
      'El Parque Samanes vibró al ritmo del Festival GYE Beats 2026, una jornada maratónica de doce horas continuas de música en vivo, arte digital y experiencias inmersivas.',
      'El cartel incluyó a referentes del pop latino, música urbana, ritmos tropicales y fusión instrumental ecuatoriana, congregando a familias y jóvenes de todas las provincias del país.',
      'Los organizadores anunciaron que debido a la excelente acogida, la edición 2027 contará con dos fechas consecutivas y un escenario dedicado exclusivamente al talento emergente local.'
    ],
    author: {
      name: 'Sofía Noboa',
      role: 'Farándula y Espectáculos',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '3 min',
    isFeatured: false,
    tags: ['Música', 'Parque Samanes', 'Entretenimiento', 'Conciertos'],
    viewsCount: 25400,
    source: 'GYE TV+ Farándula'
  },
  {
    id: 'noticia-7',
    title: 'Ecuador consolida su liderazgo agroexportador: El cacao fino de aroma rompe récords de exportación mundial',
    subtitle: 'Productores de la costa ecuatoriana celebran la alta cotización en los mercados de Europa, Asia y Norteamérica.',
    category: 'Ecuador',
    subcategory: 'Economía Nacional',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=80',
    date: '05 Sep 2026',
    time: '11:00',
    description: 'El grano de oro ecuatoriano sigue conquistando los paladares más exigentes del mundo y fortaleciendo el empleo en el campo.',
    content: [
      'Las exportaciones ecuatorianas de cacao fino de aroma alcanzaron cifras históricas durante el último trimestre, impulsadas por la alta demanda de la chocolatería gourmet internacional.',
      'Gremios agrícolas de la provincia del Guayas y Los Ríos señalaron que las mejoras en procesos de trazabilidad sostenible y certificación orgánica han sido determinantes para posicionar el producto.',
      'El puerto marítimo de Guayaquil canalizó más del 80% de los envíos de exportación, consolidándose como el hub logístico por excelencia del Pacífico Sur.'
    ],
    author: {
      name: 'Carlos Mendoza',
      role: 'Redacción GYE TV+',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '4 min',
    isFeatured: false,
    tags: ['Ecuador', 'Economía', 'Cacao', 'Exportaciones', 'Puerto GYE'],
    viewsCount: 19800,
    source: 'GYE TV+ Economía'
  },
  {
    id: 'noticia-8',
    title: 'Selección de Ecuador alista nómina para la doble fecha de eliminatorias sudamericanas',
    subtitle: 'El cuerpo técnico tricolor dará a conocer la lista de convocados este jueves desde la Casa de la Selección.',
    category: 'Deportes',
    subcategory: 'La Tri',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    date: '05 Sep 2026',
    time: '08:30',
    description: 'Expectativa total en todo el país por conocer los jugadores convocados para los cruciales encuentros rumbo a la Copa Mundial.',
    content: [
      'La Federación Ecuatoriana de Fútbol confirmó la fecha y hora para la conferencia de prensa en la que se develará la nómina de seleccionados para los próximos desafíos internacionales.',
      'Analistas deportivos prevén el retorno de figuras que militan en las principales ligas europeas, así como la inclusión de jóvenes promesas que destacan en el torneo local.',
      'El primer cotejo se disputará en condición de local, donde se espera un marco imponente de aficionados alentando a la Tricolor.'
    ],
    author: {
      name: 'Diego Alarcón',
      role: 'Editor de Deportes GYE TV+',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '3 min',
    isFeatured: false,
    tags: ['Selección Ecuador', 'La Tri', 'Fútbol', 'Eliminatorias'],
    viewsCount: 41200,
    source: 'GYE TV+ Deportes'
  }
];

/**
 * CONFIGURACIÓN DE STREAMING EN VIVO (GYE TV+ EN VIVO)
 */
export const LIVE_STREAM_CONFIG: LiveStreamConfig = {
  isLive: true,
  title: 'GYE TV+ EN VIVO | Edición Central de Noticias & Actualidad Porteña',
  currentShow: 'Guayaquil al Día con Valeria Solís & Carlos Mendoza',
  presenter: 'Valeria Solís & Carlos Mendoza',
  viewersCount: 4892,
  streamSource: 'demo', // 'youtube' | 'custom' | 'demo'
  youtubeEmbedId: 'live_stream', // Puedes reemplazar con tu ID de YouTube (ej. 'jfKfPfyJRdk')
  customStreamUrl: '', // O tu URL HLS / MP4 directo
  schedule: [
    { time: '06:00 - 08:30', title: 'Amanecer Guayaco', host: 'Andrés Vera', category: 'Noticias & Tránsito' },
    { time: '08:30 - 11:00', title: 'Conexión Digital GYE', host: 'María Paz Jaramillo', category: 'Revista Matinal' },
    { time: '11:00 - 13:00', title: 'Guayaquil al Día (Edición Central)', host: 'Valeria Solís & Carlos Mendoza', isCurrent: true, category: 'En Vivo Urgente' },
    { time: '13:00 - 14:30', title: 'GYE Deportes Total', host: 'Diego Alarcón & Panel', category: 'Deportes' },
    { time: '14:30 - 17:00', title: 'Tarde Activa & Música', host: 'Sofía Noboa', category: 'Entretenimiento' },
    { time: '17:00 - 19:30', title: 'Pulso Informativo Ecuador', host: 'Roberto Calderón', category: 'Noticias Nacionales' },
    { time: '19:30 - 21:00', title: 'La Noche del Astillero', host: 'Especial Deportes', category: 'Fútbol & Análisis' },
    { time: '21:00 - 23:00', title: 'Zona GYE+ Prime', host: 'Equipo de Investigación', category: 'Especiales & Cultura' }
  ]
};

/**
 * GALERÍA DE VIDEOS DIGITALES
 */
export const DEMO_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Recorrido nocturno por el Malecón 2000 y el Cerro Santa Ana: La belleza iluminada de Guayaquil',
    category: 'Guayaquil',
    duration: '04:15',
    date: 'Hace 2 horas',
    thumbnail: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
    views: '18.4K',
    presenter: 'Equipo Audiovisual GYE TV+',
    description: 'Un viaje cinematográfico con drones 4K apreciando el Río Guayas y los miradores de la Perla del Pacífico.'
  },
  {
    id: 'vid-2',
    title: 'Resumen completo de la fecha: Golazos y jugadas polémicas de la Liga Pro',
    category: 'Deportes',
    duration: '08:32',
    date: 'Hace 4 horas',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    views: '34.1K',
    presenter: 'Diego Alarcón',
    description: 'El análisis táctico más completo de los partidos de Barcelona SC, Emelec e Independiente del Valle.'
  },
  {
    id: 'vid-3',
    title: 'Ruta del Encebollado Guayaco: Conoce los 5 rincones más famosos de la ciudad',
    category: 'Cultura & Sabor',
    duration: '06:40',
    date: 'Ayer',
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    views: '42.9K',
    presenter: 'Isabel Carvajal',
    description: 'Descubrimos las historias de los maestros huequeros que han deleitado a generaciones enteras.'
  },
  {
    id: 'vid-4',
    title: 'Entrevista exclusiva con la nueva promesa de la música urbana ecuatoriana',
    category: 'Entretenimiento',
    duration: '05:18',
    date: 'Hace 2 días',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    views: '21.0K',
    presenter: 'Sofía Noboa',
    description: 'Hablamos sobre sus nuevos lanzamientos, giras internacionales y proyectos discográficos.'
  },
  {
    id: 'vid-5',
    title: 'Reportaje especial: La transformación del transporte fluvial en el Gran Guayaquil',
    category: 'Guayaquil',
    duration: '07:22',
    date: 'Hace 3 días',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    views: '15.6K',
    presenter: 'Carlos Mendoza',
    description: 'Cómo las nuevas rutas marítimas y aerovía descongestionan el tránsito entre Guayaquil, Durán y Samborondón.'
  },
  {
    id: 'vid-6',
    title: 'Innovación y Emprendimiento: Jóvenes guayaquileños que triunfan en tecnología',
    category: 'Ecuador',
    duration: '04:55',
    date: 'Hace 4 días',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    views: '12.8K',
    presenter: 'Valeria Solís',
    description: 'Startups locales que exportan software, inteligencia artificial y soluciones logísticas al mundo.'
  }
];

/**
 * CATEGORÍAS PRINCIPALES DEL CANAL DIGITAL
 */
export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat-noticias',
    name: 'Noticias',
    slug: 'Todas',
    emoji: '📰',
    iconName: 'Newspaper',
    description: 'Última hora, sucesos y actualidad nacional en tiempo real.',
    count: 38,
    color: 'text-sky-600 bg-sky-50 border-sky-200',
    gradient: 'from-sky-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-seguridad',
    name: 'Seguridad',
    slug: 'Seguridad',
    emoji: '🛡️',
    iconName: 'Building2',
    description: 'Operativos, orden público, justicia y contingencias ciudadanas.',
    count: 35,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    gradient: 'from-cyan-600 to-blue-600',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-deportes',
    name: 'Deportes',
    slug: 'Deportes',
    emoji: '⚽',
    iconName: 'Trophy',
    description: 'Liga Pro, fútbol internacional y disciplinas de alto rendimiento.',
    count: 52,
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    gradient: 'from-orange-500 to-amber-600',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-entretenimiento',
    name: 'Entretenimiento',
    slug: 'Entretenimiento',
    emoji: '🎬',
    iconName: 'Film',
    description: 'Farándula, música, conciertos, tendencias virales y shows.',
    count: 31,
    color: 'text-pink-600 bg-pink-50 border-pink-200',
    gradient: 'from-pink-500 to-rose-600',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-cultura',
    name: 'Cultura',
    slug: 'Cultura',
    emoji: '🎨',
    iconName: 'Palette',
    description: 'Patrimonio, arte, gastronomía tradicional y letras.',
    count: 24,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    gradient: 'from-indigo-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80'
  }
];

/**
 * REDES SOCIALES OFICIALES (Configurables)
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'fb',
    platform: 'Facebook',
    name: 'Facebook',
    url: 'https://facebook.com',
    handle: '@GYETVplusOficial',
    followers: '185K seguidores',
    icon: 'Facebook',
    colorClass: 'text-blue-600',
    bgHover: 'hover:bg-blue-50 hover:border-blue-300'
  },
  {
    id: 'ig',
    platform: 'Instagram',
    name: 'Instagram',
    url: 'https://instagram.com',
    handle: '@gyetvplus',
    followers: '240K seguidores',
    icon: 'Instagram',
    colorClass: 'text-pink-600',
    bgHover: 'hover:bg-pink-50 hover:border-pink-300'
  },
  {
    id: 'tk',
    platform: 'TikTok',
    name: 'TikTok',
    url: 'https://tiktok.com',
    handle: '@gyetvplus',
    followers: '490K seguidores',
    icon: 'Video',
    colorClass: 'text-slate-900',
    bgHover: 'hover:bg-slate-100 hover:border-slate-400'
  },
  {
    id: 'yt',
    platform: 'YouTube',
    name: 'YouTube',
    url: 'https://youtube.com',
    handle: 'GYE TV+ Oficial',
    followers: '320K suscriptores',
    icon: 'Youtube',
    colorClass: 'text-red-600',
    bgHover: 'hover:bg-red-50 hover:border-red-300'
  },
  {
    id: 'x',
    platform: 'X',
    name: 'X (Twitter)',
    url: 'https://twitter.com',
    handle: '@GYETVplus',
    followers: '115K seguidores',
    icon: 'Twitter',
    colorClass: 'text-slate-800',
    bgHover: 'hover:bg-slate-100 hover:border-slate-400'
  },
  {
    id: 'wa',
    platform: 'WhatsApp',
    name: 'Canal de WhatsApp',
    url: 'https://whatsapp.com',
    handle: 'Comunidad GYE TV+',
    followers: '65K miembros',
    icon: 'MessageCircle',
    colorClass: 'text-emerald-600',
    bgHover: 'hover:bg-emerald-50 hover:border-emerald-300'
  }
];

/**
 * MARCADORES Y RESULTADOS EN VIVO DEPORTIVOS (LIGA PRO / GUAYAQUIL)
 */
export const SPORTS_SCORES: SportsScore[] = [
  {
    id: 'score-1',
    homeTeam: 'Barcelona SC',
    homeScore: 2,
    homeLogo: '🟡',
    awayTeam: 'Emelec',
    awayScore: 1,
    awayLogo: '🔵',
    tournament: 'Liga Pro Serie A',
    status: 'Finalizado',
    venue: 'Estadio Monumental'
  },
  {
    id: 'score-2',
    homeTeam: 'Independiente del Valle',
    homeScore: 1,
    homeLogo: '⚫',
    awayTeam: 'LDU Quito',
    awayScore: 1,
    awayLogo: '⚪',
    tournament: 'Liga Pro Serie A',
    status: 'Finalizado',
    venue: 'Estadio Banco Guayaquil'
  },
  {
    id: 'score-3',
    homeTeam: 'Guayaquil City',
    homeScore: 0,
    homeLogo: '🔵',
    awayTeam: 'Orense SC',
    awayScore: 0,
    awayLogo: '🟢',
    tournament: 'Liga Pro Serie A',
    status: 'Hoy 19:00',
    venue: 'Estadio Christian Benítez'
  },
  {
    id: 'score-4',
    homeTeam: 'Ecuador',
    homeScore: 2,
    homeLogo: '🇪🇨',
    awayTeam: 'Colombia',
    awayScore: 1,
    awayLogo: '🇨🇴',
    tournament: 'Eliminatorias Sudamericanas',
    status: 'Próxima Fecha',
    venue: 'Estadio Rodrigo Paz'
  }
];

/**
 * ESPACIOS PUBLICITARIOS PREPARADOS (BANNERS)
 */
export const AD_BANNERS: Record<string, AdBannerConfig> = {
  headerLeaderboard: {
    id: 'ad-header-top',
    slotName: 'Leaderboard Superior',
    format: 'leaderboard',
    dimensions: '728 x 90 px / 970 x 90 px',
    isPlaceholder: true,
    title: 'Espacio Publicitario Disponible',
    subtitle: 'Anúnciate en GYE TV+ y llega a más de 500,000 espectadores digitales mensuales'
  },
  sidebarMedium: {
    id: 'ad-sidebar-1',
    slotName: 'Robapáginas Lateral',
    format: 'sidebar',
    dimensions: '300 x 250 px / 300 x 600 px',
    isPlaceholder: true,
    title: 'Tu Marca Aquí',
    subtitle: 'Impacto visual continuo en la barra lateral de noticias'
  },
  inFeedArticle: {
    id: 'ad-infeed-news',
    slotName: 'Banner en Contenido de Noticias',
    format: 'in-feed',
    dimensions: 'Fluid Responsive x 120 px',
    isPlaceholder: true,
    title: 'Publicidad Patrocinada GYE TV+',
    subtitle: 'Conecta directamente con la audiencia guayaquileña'
  }
};
