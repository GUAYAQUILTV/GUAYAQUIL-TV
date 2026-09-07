import React, { useState } from 'react';
import { Newspaper, Search, Sparkles, Clock, Eye, ChevronRight, Filter } from 'lucide-react';
import { NewsItem, CategoryType } from '../types';

interface NewsCatalogViewProps {
  newsList: NewsItem[];
  onSelectNews: (news: NewsItem) => void;
}

export const NewsCatalogView: React.FC<NewsCatalogViewProps> = ({ newsList, onSelectNews }) => {
  const [selectedCat, setSelectedCat] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'Todas', label: '📰 Todas las Noticias', icon: '📰' },
    { id: 'Guayaquil', label: '🏙️ Guayaquil', icon: '🏙️' },
    { id: 'Ecuador', label: '🇪🇨 Ecuador', icon: '🇪🇨' },
    { id: 'Internacional', label: '🌎 Internacional', icon: '🌎' },
    { id: 'Deportes', label: '⚽ Deportes', icon: '⚽' },
    { id: 'Entretenimiento', label: '🎭 Entretenimiento', icon: '🎭' },
    { id: 'Seguridad', label: '🚨 Actualidad / Seguridad', icon: '🚨' },
  ];

  const filteredNews = newsList.filter(item => {
    const matchesCat = selectedCat === 'Todas' || item.category === selectedCat || (selectedCat === 'Seguridad' && item.category === 'Seguridad');
    const matchesQuery = !searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()) || item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#070b18] via-[#0b1329] to-[#070b18] border border-cyan-500/30 p-6 sm:p-8 mb-8 relative overflow-hidden shadow-[0_0_25px_rgba(0,240,255,0.1)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 text-[#00f0ff] font-mono text-xs uppercase tracking-widest mb-3 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <Newspaper className="w-3.5 h-3.5 text-[#ff6600]" />
              <span>CENTRAL DE NOTICIAS • GYE TV+</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-headline tracking-tight">
              Archivo y Actualidad <span className="text-[#00f0ff] neon-text-cyan">Periodística</span>
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              Información veraz, oportuna y de alta calidad organizada por categorías clave: Guayaquil, Ecuador, Internacional, Deportes, Entretenimiento y Actualidad.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#00f0ff]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en noticias..."
              className="w-full bg-black/90 border border-cyan-500/40 text-white text-xs pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#00f0ff] placeholder:text-slate-500 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const isActive = selectedCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                isActive
                  ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.6)]'
                  : 'bg-[#070b18] text-slate-300 border-cyan-500/20 hover:border-cyan-500/50 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <div className="bg-[#070b18] border border-cyan-500/30 p-12 text-center my-8">
          <p className="text-slate-400 font-mono text-sm">No se encontraron noticias en esta categoría con el término de búsqueda actual.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="bg-[#070b18] border border-cyan-500/25 hover:border-[#00f0ff] transition-all flex flex-col justify-between group overflow-hidden cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b18] via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/90 text-[#00f0ff] font-mono font-bold text-[10px] uppercase border border-cyan-500/40">
                    {item.category}
                  </div>
                  {item.isUrgent && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#ff6600] text-black font-mono font-extrabold text-[9px] uppercase shadow-[0_0_10px_rgba(255,102,0,0.8)]">
                      URGENTE
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#ff6600]" /> {item.date} • {item.time}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-[#00f0ff]" /> {item.viewsCount?.toLocaleString()}</span>
                  </div>
                  <h3 className="font-headline text-base font-bold text-white group-hover:text-[#00f0ff] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-cyan-500/15 mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono truncate">Por {item.author?.name || 'Redacción'}</span>
                <span className="text-[#00f0ff] font-mono font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Leer Nota</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
