import React from 'react';
import { Film, Music, ChevronRight, Heart, Share2, Palette, Sparkles } from 'lucide-react';
import { NewsItem } from '../types';

interface EntertainmentSectionProps {
  newsList: NewsItem[];
  onSelectNews: (news: NewsItem) => void;
}

export const EntertainmentSection: React.FC<EntertainmentSectionProps> = ({ newsList, onSelectNews }) => {
  const entertainmentNews = newsList.filter(
    item => item.category === 'Entretenimiento' || item.category === 'Cultura'
  );

  return (
    <section id="entretenimiento" className="py-14 bg-[#050811] border-b-2 border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b-2 border-cyan-500/30 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono">
              <span className="px-2.5 py-0.5 bg-black border border-cyan-500/40 text-[#00f0ff] text-[10px] font-bold uppercase tracking-widest">
                SUPLEMENTO CULTURAL
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-[#00f0ff]" />
                Cultura, Artes & Sociedad
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-cyber font-black text-white tracking-tight flex items-center gap-2.5">
              <Film className="w-7 h-7 text-[#00f0ff]" />
              <span>CULTURA, <span className="text-[#00f0ff] neon-text-cyan">ARTE</span> & <span className="text-[#ff6600] neon-text-orange">ESPECTÁCULOS</span></span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md font-sans">
            Crítica de cine, artes plásticas, presentaciones musicales, literatura y la agenda cultural de Guayaquil.
          </p>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entertainmentNews.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="bg-[#080d1a] border border-cyan-500/25 hover:border-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] p-5 flex flex-col justify-between cursor-pointer group transition-all duration-300"
            >
              <div>
                {/* Image Box */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black mb-4 border border-cyan-500/30">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 bg-black/90 text-[#00f0ff] text-[10px] font-mono font-bold uppercase tracking-wider border border-cyan-500/40">
                      {item.subcategory || item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/90 text-slate-300 text-[10px] font-mono border border-cyan-500/30">
                    {item.readTime}
                  </div>
                </div>

                {/* Date & Time */}
                <div className="text-[11px] text-[#ff8c33] font-mono mb-1.5">
                  {item.date} • {item.time}
                </div>
                
                <h3 className="text-base sm:text-lg font-headline font-bold text-white group-hover:text-[#00f0ff] transition-colors leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4 font-sans">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-cyan-500/15 flex items-center justify-between font-mono">
                <span className="text-xs text-slate-400">
                  Por <strong className="text-white">{item.author.name}</strong>
                </span>
                <span className="text-xs font-bold text-[#00f0ff] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Leer</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
