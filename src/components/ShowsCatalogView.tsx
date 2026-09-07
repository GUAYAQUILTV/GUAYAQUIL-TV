import React, { useState } from 'react';
import { Film, Tv, Play, Sparkles, Star, Users, Clock, ChevronRight, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ShowsCatalogViewProps {
  onOpenLive: () => void;
}

export const ShowsCatalogView: React.FC<ShowsCatalogViewProps> = ({ onOpenLive }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeShowDetail, setActiveShowDetail] = useState<any | null>(null);

  const showsList = [
    {
      id: 'show-1',
      title: 'La Farándula Despierta',
      tagline: '¡Sí pasa, se cuenta!',
      category: 'Farándula',
      presenter: 'Valeria Solís y Diego Alarcón',
      schedule: 'Lunes a Viernes 08:30 - 11:00',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
      description: 'El programa líder de entretenimiento, chismes de la farándula nacional e internacional, entrevistas exclusivas y polémicas del espectáculo sin censura.',
      episodesCount: 240,
      rating: '4.9 / 5.0',
      bannerColor: 'from-orange-600 to-amber-600',
      episodes: [
        { id: 'ep-1', title: 'Ep. 240: Exclusivas de la semana y polémicas en la televisión nacional', duration: '1h 45m', date: '06 Sep 2026', views: '45K' },
        { id: 'ep-2', title: 'Ep. 239: Entrevista bomba con artistas invitados y debate en vivo', duration: '1h 30m', date: '05 Sep 2026', views: '52K' },
        { id: 'ep-3', title: 'Ep. 238: Detrás de cámaras de los realities y alfombra roja', duration: '1h 40m', date: '04 Sep 2026', views: '38K' },
      ]
    },
    {
      id: 'show-2',
      title: 'Guayaquil Despierta',
      tagline: 'El pulso de la noticia al amanecer',
      category: 'Noticias',
      presenter: 'Lic. Mariana Cordero y Carlos Mendoza',
      schedule: 'Lunes a Viernes 06:00 - 08:30',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
      description: 'Informativo matinal con enlaces en directo desde los barrios de Guayaquil, reportes viales, entrevistas a autoridades y servicios comunitarios.',
      episodesCount: 310,
      rating: '4.9 / 5.0',
      bannerColor: 'from-cyan-600 to-blue-600',
      episodes: [
        { id: 'ep-101', title: 'Edición Matinal: Operativos viales y clima en Guayaquil', duration: '2h 15m', date: '07 Sep 2026', views: '61K' },
        { id: 'ep-102', title: 'Edición Matinal: Diálogo con el Alcalde sobre obras barriales', duration: '2h 00m', date: '06 Sep 2026', views: '58K' }
      ]
    },
    {
      id: 'show-3',
      title: 'Deportes En Alta Definición',
      tagline: 'La pasión del fútbol ecuatoriano y mundial',
      category: 'Deportes',
      presenter: 'Diego Alarcón',
      schedule: 'Lunes a Viernes 13:00 - 15:00',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      description: 'Análisis táctico, polémicas arbitrales, entrevistas a futbolistas de la Liga Pro y cobertura completa de Barcelona SC, Emelec y La Tri.',
      episodesCount: 195,
      rating: '4.8 / 5.0',
      bannerColor: 'from-emerald-600 to-teal-600',
      episodes: [
        { id: 'ep-201', title: 'Previa de la fecha estelar: Análisis de plantillas en Guayaquil', duration: '1h 50m', date: '07 Sep 2026', views: '49K' },
        { id: 'ep-202', title: 'Debate post-partido y reacciones de los direct técnicos', duration: '1h 45m', date: '05 Sep 2026', views: '63K' }
      ]
    },
    {
      id: 'show-4',
      title: 'Conexión Urbana',
      tagline: 'Música, tendencias y juventud',
      category: 'Entretenimiento',
      presenter: 'Andrea Viteri',
      schedule: 'Lunes a Viernes 15:00 - 17:30',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      description: 'Espacio juvenil enfocado en la movida musical urbana, entrevistas a artistas emergentes y retos en vivo con la audiencia digital de GYE TV+.',
      episodesCount: 140,
      rating: '4.7 / 5.0',
      bannerColor: 'from-purple-600 to-indigo-600',
      episodes: [
        { id: 'ep-301', title: 'Sesión acústica en vivo con exponentes del género urbano', duration: '2h 00m', date: '06 Sep 2026', views: '32K' }
      ]
    },
    {
      id: 'show-5',
      title: 'Entrevistas de Fondo',
      tagline: 'Diálogos exclusivos con el Director',
      category: 'Entrevistas',
      presenter: 'Director General GYE TV+',
      schedule: 'Lunes a Viernes 21:00 - 22:30',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
      description: 'Entrevistas en profundidad con los principales protagonistas de la política, la economía, la cultura y el desarrollo social del Ecuador.',
      episodesCount: 96,
      rating: '4.9 / 5.0',
      bannerColor: 'from-blue-700 to-cyan-700',
      episodes: [
        { id: 'ep-401', title: 'Perspectivas económicas y desarrollo portuario en Guayaquil', duration: '1h 20m', date: '06 Sep 2026', views: '28K' }
      ]
    },
    {
      id: 'show-6',
      title: 'Guayaquil de Antaño y Presente',
      tagline: 'Nuestras raíces, nuestra identidad',
      category: 'Cultura',
      presenter: 'Isabel Carvajal',
      schedule: 'Sábados 08:00 - 10:30',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
      description: 'Serie documental dedicada a rescatar la historia arquitectónica, las leyendas urbanas y el patrimonio cultural del puerto principal.',
      episodesCount: 78,
      rating: '4.9 / 5.0',
      bannerColor: 'from-amber-700 to-yellow-600',
      episodes: [
        { id: 'ep-501', title: 'Especial Las Peñas y el centenario faro del Cerro Santa Ana', duration: '1h 00m', date: '05 Sep 2026', views: '24K' }
      ]
    }
  ];

  const categories = ['Todos', 'Noticias', 'Farándula', 'Deportes', 'Entretenimiento', 'Cultura', 'Entrevistas'];

  const filteredShows = selectedCategory === 'Todos' 
    ? showsList 
    : showsList.filter(s => s.category === selectedCategory);

  if (activeShowDetail) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
        <button
          onClick={() => setActiveShowDetail(null)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-cyan-500/40 text-[#00f0ff] hover:bg-cyan-950 text-xs font-mono uppercase tracking-wider mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo de Programas</span>
        </button>

        <div className="bg-[#070b18] border border-cyan-500/30 overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.15)]">
          <div className="relative h-72 sm:h-96 w-full">
            <img
              src={activeShowDetail.image}
              alt={activeShowDetail.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b18] via-[#070b18]/60 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-[#ff6600] text-black font-mono font-extrabold text-xs uppercase tracking-widest shadow-[0_0_10px_rgba(255,102,0,0.6)] inline-block mb-2">
                  {activeShowDetail.category} • {activeShowDetail.tagline}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-headline">
                  {activeShowDetail.title}
                </h1>
                <p className="text-xs sm:text-sm text-[#00f0ff] font-mono mt-1">
                  Conducción: {activeShowDetail.presenter} • {activeShowDetail.schedule}
                </p>
              </div>

              <button
                onClick={onOpenLive}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00f0ff] hover:bg-white text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.7)] transition-all cursor-pointer shrink-0"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Sintonizar Programa</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-sm font-mono text-[#00f0ff] uppercase tracking-wider font-bold mb-2">
                    Acerca del Programa
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {activeShowDetail.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-mono text-[#ff8c33] uppercase tracking-wider font-bold mb-3 flex items-center justify-between">
                    <span>Episodios y Contenido Destacado</span>
                    <span className="text-xs text-slate-400 font-mono">{activeShowDetail.episodes.length} Disponibles</span>
                  </h3>

                  <div className="space-y-3">
                    {activeShowDetail.episodes.map((ep: any) => (
                      <div
                        key={ep.id}
                        className="bg-black/80 border border-cyan-500/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#00f0ff] transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-[#00f0ff] shrink-0 group-hover:bg-[#00f0ff] group-hover:text-black transition-colors">
                            <Play className="w-4 h-4 fill-current" />
                          </div>
                          <div>
                            <h4 className="font-headline text-sm font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                              {ep.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mt-1">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#ff6600]" /> {ep.duration}</span>
                              <span>•</span>
                              <span>{ep.date}</span>
                              <span>•</span>
                              <span className="text-[#00f0ff]">{ep.views} vistas</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={onOpenLive}
                          className="px-4 py-2 bg-slate-900 hover:bg-[#00f0ff] hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider border border-cyan-500/40 transition-all cursor-pointer shrink-0"
                        >
                          Ver Episodio
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-black/60 border border-cyan-500/20 p-6 space-y-4">
                <h4 className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider font-bold border-b border-cyan-500/20 pb-2">
                  Ficha Técnica
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Categoría:</span>
                    <span className="text-white font-bold">{activeShowDetail.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Calificación:</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" /> {activeShowDetail.rating}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Episodios:</span>
                    <span className="text-white font-bold">{activeShowDetail.episodesCount} emitidos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Horario Estelar:</span>
                    <span className="text-[#00f0ff] font-mono">{activeShowDetail.schedule}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#070b18] via-[#0b1329] to-[#070b18] border border-cyan-500/30 p-6 sm:p-8 mb-8 relative overflow-hidden shadow-[0_0_25px_rgba(0,240,255,0.1)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 text-[#00f0ff] font-mono text-xs uppercase tracking-widest mb-3 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <Film className="w-3.5 h-3.5 text-[#ff6600]" />
              <span>CATÁLOGO OFICIAL DE PRODUCCIONES • GYE TV+</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-headline tracking-tight">
              Programas <span className="text-[#00f0ff] neon-text-cyan">Estelares</span>
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              Explora nuestra parrilla de producciones originales: noticias, entretenimiento, farándula, deportes y cultura. Cada programa con sus capítulos y contenido destacado.
            </p>
          </div>

          <button
            onClick={onOpenLive}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6600] to-[#ff3300] hover:from-[#ff7700] hover:to-[#ff4400] text-white font-black uppercase tracking-widest text-xs border border-white/20 shadow-[0_0_20px_rgba(255,102,0,0.6)] transition-all cursor-pointer shrink-0"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <span>Ver EN VIVO</span>
          </button>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                isActive
                  ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.6)]'
                  : 'bg-[#070b18] text-slate-300 border-cyan-500/20 hover:border-cyan-500/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Shows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShows.map((show) => (
          <div
            key={show.id}
            className="bg-[#070b18] border border-cyan-500/25 hover:border-[#00f0ff] transition-all flex flex-col justify-between group overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
          >
            <div>
              <div className="relative h-52 overflow-hidden bg-black">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b18] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/90 text-[#00f0ff] font-mono font-bold text-[10px] uppercase border border-cyan-500/40">
                  {show.category}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#ff6600] text-black font-mono font-extrabold text-[10px] uppercase">
                  ⭐ {show.rating}
                </div>
              </div>

              <div className="p-5">
                <span className="text-[11px] font-mono text-[#ff8c33] uppercase tracking-wider font-bold">
                  {show.tagline}
                </span>
                <h3 className="font-headline text-lg font-bold text-white mt-1 group-hover:text-[#00f0ff] transition-colors">
                  {show.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                  {show.description}
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-3">
                  Conducción: <strong className="text-white">{show.presenter}</strong>
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-cyan-500/15 mt-4 flex items-center justify-between">
              <span className="text-xs text-[#00f0ff] font-mono">
                {show.episodesCount} Episodios
              </span>
              <button
                onClick={() => setActiveShowDetail(show)}
                className="px-4 py-2 bg-slate-900 hover:bg-[#00f0ff] hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider border border-cyan-500/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explorar Espacio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
