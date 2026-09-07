import React from 'react';
import { Clock, ChevronRight, Zap } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
  onSelect: (news: NewsItem) => void;
  featuredLayout?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, onSelect, featuredLayout = false }) => {
  return (
    <article className="bg-[#080d1a] border border-cyan-500/20 hover:border-[#00f0ff] hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Image Container */}
      <div 
        className="relative aspect-[16/10] w-full overflow-hidden bg-black cursor-pointer border-b border-cyan-500/20"
        onClick={() => onSelect(news)}
      >
        <img
          src={news.image}
          alt={news.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        
        {/* Category Label */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 bg-black/90 text-[#00f0ff] text-[10px] font-mono font-bold uppercase tracking-wider border border-cyan-500/40">
            {news.category}
          </span>
          {news.isUrgent && (
            <span className="px-2 py-0.5 bg-[#ff6600] text-black text-[10px] font-extrabold uppercase tracking-wider shadow-[0_0_10px_rgba(255,102,0,0.8)]">
              URGENTE
            </span>
          )}
        </div>

        {/* Read time badge */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/90 text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
          {news.readTime}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          
          {/* Dateline & Subcategory */}
          <div className="flex items-center gap-2 text-[11px] font-mono mb-2">
            <span className="text-[#ff8c33] font-bold uppercase tracking-wider">
              {news.subcategory || news.category}
            </span>
            <span className="text-cyan-500/30">/</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 text-[#00f0ff]" />
              <span>{news.date}</span>
            </span>
          </div>

          {/* Headline */}
          <h3 
            className="font-headline text-base sm:text-lg font-bold text-white leading-snug mb-2 group-hover:text-[#00f0ff] transition-colors cursor-pointer line-clamp-2"
            onClick={() => onSelect(news)}
          >
            {news.title}
          </h3>

          {/* Brief Description */}
          <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
            {news.description}
          </p>
        </div>

        {/* Footer info: Author & "Leer despacho" Button */}
        <div className="pt-3 border-t border-cyan-500/15 flex items-center justify-between gap-2 mt-auto text-xs font-sans">
          
          {/* Author snippet */}
          <div className="flex items-center gap-2">
            <img
              src={news.author.avatar}
              alt={news.author.name}
              className="w-6 h-6 border border-[#00f0ff] object-cover"
            />
            <span className="text-[11px] font-medium text-slate-300 truncate max-w-[120px]">
              {news.author.name}
            </span>
          </div>

          {/* Action Link */}
          <button
            onClick={() => onSelect(news)}
            className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#00f0ff] group-hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>Leer Noticia</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#ff6600]" />
          </button>

        </div>

      </div>

    </article>
  );
};
