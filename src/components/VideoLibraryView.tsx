import React, { useState } from 'react';
import { Video, Search, Play, Clock, Eye, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';

interface VideoLibraryViewProps {
  onOpenLive: () => void;
}

export const VideoLibraryView: React.FC<VideoLibraryViewProps> = ({ onOpenLive }) => {
  const { videos } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Todos', 'Programas', 'Entrevistas', 'Reportajes', 'Clips', 'Noticias', 'Exclusivos GYE TV+'];

  const filteredVideos = videos.filter(v => {
    const matchesCat = selectedCategory === 'Todos' || v.category === selectedCategory;
    const matchesQuery = !searchQuery.trim() || v.title.toLowerCase().includes(searchQuery.toLowerCase()) || (v.presenter && v.presenter.toLowerCase().includes(searchQuery.toLowerCase()));
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
              <Video className="w-3.5 h-3.5 text-[#ff6600]" />
              <span>BIBLIOTECA MULTIMEDIA BAJO DEMANDA • GYE TV+</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-headline tracking-tight">
              Videos y <span className="text-[#00f0ff] neon-text-cyan">Exclusivos</span>
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              Revive programas completos, entrevistas de fondo, reportajes especiales, clips y transmisiones pasadas en alta definición.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#00f0ff]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar videos, entrevistas..."
              className="w-full bg-black/90 border border-cyan-500/40 text-white text-xs pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#00f0ff] placeholder:text-slate-500 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
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

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            onClick={onOpenLive}
            className="bg-[#070b18] border border-cyan-500/25 hover:border-[#00f0ff] transition-all flex flex-col justify-between group overflow-hidden cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b18] via-transparent to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="w-12 h-12 bg-[#ff6600] text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,102,0,0.8)]">
                    <Play className="w-6 h-6 fill-black ml-0.5" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/90 text-[#00f0ff] font-mono font-bold text-[10px] uppercase border border-cyan-500/40">
                  {video.category}
                </div>
                
                <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/90 text-white font-mono text-[10px] border border-cyan-500/30 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#ff6600]" />
                  <span>{video.duration}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-headline text-base font-bold text-white group-hover:text-[#00f0ff] transition-colors leading-snug">
                  {video.title}
                </h3>
                {video.presenter && (
                  <p className="text-xs text-slate-300 mt-1.5 font-mono">
                    Conducción: <strong className="text-white">{video.presenter}</strong>
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-cyan-500/15 mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-[#00f0ff]" /> {video.views} vistas</span>
              <span className="text-[#ff8c33] font-bold group-hover:underline">Reproducir ahora ›</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
