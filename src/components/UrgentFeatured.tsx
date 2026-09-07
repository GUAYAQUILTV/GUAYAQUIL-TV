import React from 'react';
import { Clock, ChevronRight, BookOpen, Zap, Sparkles } from 'lucide-react';
import { NewsItem } from '../types';

interface UrgentFeaturedProps {
  news: NewsItem;
  onSelectNews: (news: NewsItem) => void;
}

export const UrgentFeatured: React.FC<UrgentFeaturedProps> = ({ news, onSelectNews }) => {
  if (!news) return null;

  return (
    <section className="py-8 bg-[#040711] border-b border-[#ff6600]/30 relative overflow-hidden">
      
      {/* Neon Glow accent */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#ff6600]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-2.5 mb-5 border-b border-[#ff6600]/40">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 bg-[#ff6600] shadow-[0_0_10px_#ff6600]"></span>
            <h2 className="text-xs sm:text-sm font-cyber font-extrabold uppercase tracking-widest text-[#ff8c33] neon-text-orange">
              INFORME ESPECIAL & DESARROLLO INFORMATIVO
            </h2>
          </div>
          <span className="text-xs text-[#00f0ff] font-mono hidden sm:inline">
            INVESTIGACIÓN PERIODÍSTICA GYE TV+
          </span>
        </div>

        {/* Neon Cyber Card */}
        <div className="bg-[#080d1a] border-2 border-[#ff6600]/40 hover:border-[#ff6600] p-6 sm:p-8 shadow-[0_0_30px_rgba(255,102,0,0.15)] hover:shadow-[0_0_40px_rgba(255,102,0,0.3)] transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Image with Cyber Neon Frame */}
            <div 
              className="lg:col-span-6 relative overflow-hidden group cursor-pointer border border-cyan-500/30 hover:border-[#00f0ff] shadow-[0_0_15px_rgba(0,0,0,0.8)]" 
              onClick={() => onSelectNews(news)}
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-64 sm:h-80 md:h-96 object-cover group-hover:scale-[1.03] transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-3 py-1 bg-[#ff6600] text-black font-extrabold text-[11px] font-mono uppercase tracking-wider shadow-[0_0_12px_rgba(255,102,0,0.8)]">
                  REPORTE URGENTE
                </span>
                <span className="px-2.5 py-1 bg-black text-[#00f0ff] font-bold text-[11px] uppercase border border-cyan-500/50">
                  {news.category}
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-[#050811]/90 px-3.5 py-2 text-white text-[11px] font-mono flex items-center justify-between border-t border-cyan-500/20">
                <span className="text-[#00f0ff]">FOTOPERIODISMO VERIFICADO</span>
                <span className="uppercase text-[9px] text-[#ff8c33] font-bold">GYE TV+ PRENSA</span>
              </div>
            </div>

            {/* Right Column: High-contrast Editorial Content */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                
                {/* Meta header */}
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5 font-mono">
                  <span className="font-bold text-[#00f0ff] uppercase tracking-wider">
                    {news.subcategory || 'POLÍTICA / CIUDAD'}
                  </span>
                  <span className="text-cyan-500/40">|</span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-[#ff6600]" />
                    <span>{news.date} ({news.time})</span>
                  </span>
                  <span className="text-cyan-500/40">|</span>
                  <span className="text-[#00f0ff] font-medium bg-cyan-950/60 px-2 py-0.5 border border-cyan-500/30">
                    {news.readTime}
                  </span>
                </div>

                {/* News Title */}
                <h3 
                  className="font-headline text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight mb-3 hover:text-[#00f0ff] transition-colors cursor-pointer"
                  onClick={() => onSelectNews(news)}
                >
                  {news.title}
                </h3>

                {/* Summary */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                  {news.description}
                </p>

                {/* Neon Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-black text-[#00f0ff] text-xs font-mono font-medium border border-cyan-500/30 hover:border-[#00f0ff] transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Byline & Action */}
              <div className="pt-4 border-t border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={news.author.avatar}
                    alt={news.author.name}
                    className="w-10 h-10 border border-[#00f0ff] object-cover shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{news.author.name}</p>
                    <p className="text-[11px] text-[#ff8c33] font-mono">{news.author.role}</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectNews(news)}
                  id="btn-destacada-leer-completa"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#00f0ff] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(0,240,255,0.6)] hover:shadow-[0_0_25px_rgba(255,255,255,0.9)] cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-black" />
                  <span>CONSULTAR INFORME COMPLETO</span>
                  <ChevronRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
