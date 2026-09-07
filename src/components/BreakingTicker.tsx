import React from 'react';
import { Zap, Radio } from 'lucide-react';
import { NewsItem } from '../types';

interface BreakingTickerProps {
  news: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ news, onSelectNews }) => {
  const breakingItems = news.filter(n => n.isBreaking || n.isUrgent || n.isFeatured);
  const displayItems = breakingItems.length > 0 ? breakingItems : news.slice(0, 4);

  return (
    <div className="bg-[#03060f] text-white border-b border-[#ff6600]/30 text-xs overflow-hidden py-2 select-none shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
        {/* Neon High-Voltage Urgent Label Badge */}
        <div className="flex items-center gap-1.5 bg-[#ff6600] text-black px-3 py-1 font-extrabold uppercase tracking-wider text-[10px] shrink-0 border border-white/40 shadow-[0_0_15px_rgba(255,102,0,0.75)]">
          <Zap className="w-3 h-3 text-black fill-black animate-bounce" />
          <span className="tracking-widest">ÚLTIMA HORA</span>
        </div>

        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden relative group">
          <div className="flex items-center gap-8 whitespace-nowrap animate-ticker font-medium text-slate-200">
            {displayItems.map((item, idx) => (
              <button
                key={`${item.id}-${idx}`}
                onClick={() => onSelectNews(item)}
                className="inline-flex items-center gap-2 text-slate-200 hover:text-[#00f0ff] transition-all cursor-pointer group/item"
              >
                <span className="text-[#00f0ff] font-mono font-bold text-[11px] bg-cyan-950/60 px-1 py-0.2 border border-cyan-500/30">
                  {item.time}
                </span>
                <span className="font-bold text-[#ff8c33] uppercase tracking-wide text-[11px]">
                  {item.category}:
                </span>
                <span className="truncate max-w-xs sm:max-w-md md:max-w-xl text-white font-medium group-hover/item:text-[#00f0ff] group-hover/item:underline">
                  {item.title}
                </span>
                <span className="text-[#00f0ff]/60 font-mono">⚡</span>
              </button>
            ))}
          </div>
        </div>

        {/* Neon Live Broadcast Indicator */}
        <a
          href="#en-vivo"
          className="hidden md:flex items-center gap-2 text-xs text-[#00f0ff] hover:text-white font-bold uppercase tracking-wider shrink-0 pl-3 border-l border-cyan-500/20 transition-all group"
        >
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping shadow-[0_0_10px_#00f0ff]"></span>
          <span className="group-hover:neon-text-cyan transition-colors">SEÑAL EN VIVO</span>
        </a>
      </div>
    </div>
  );
};
