import React from 'react';
import { ExternalLink, Tag, Sparkles } from 'lucide-react';
import { AdBannerConfig } from '../types';

interface AdBannerProps {
  config: AdBannerConfig;
  className?: string;
  onOpenContact?: () => void;
}

export const AdBanner: React.FC<AdBannerProps> = ({ config, className = '', onOpenContact }) => {
  return (
    <div className={`w-full my-6 select-none font-mono ${className}`}>
      {/* Top identifier */}
      <div className="flex items-center justify-between mb-1.5 px-1 text-[10px] text-slate-400 uppercase tracking-widest">
        <span className="flex items-center gap-1.5 text-[#00f0ff]">
          <Tag className="w-3 h-3 text-[#00f0ff]" />
          <span>INSERCIÓN COMERCIAL • CONVENIO PUBLICITARIO GYE TV+</span>
        </span>
        <span className="text-slate-500">
          MOD: {config.dimensions} | {config.slotName}
        </span>
      </div>

      {/* The Ad Container */}
      <div className="relative overflow-hidden border-2 border-cyan-500/40 bg-gradient-to-r from-[#080d1a] via-[#050811] to-[#080d1a] p-5 sm:p-6 text-center shadow-[0_0_25px_rgba(0,240,255,0.15)] hover:border-[#00f0ff] transition-all group">
        
        {/* Glow decoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/20 transition-all"></div>

        <div className="max-w-md mx-auto flex flex-col items-center justify-center relative z-10">
          <span className="px-2.5 py-0.5 bg-black border border-cyan-500/50 text-[#00f0ff] text-[10px] uppercase tracking-widest mb-2 font-bold shadow-[0_0_10px_rgba(0,240,255,0.2)]">
            ESPACIO INSTITUCIONAL & COMERCIAL
          </span>

          <h4 className="text-base sm:text-lg font-headline font-bold text-white group-hover:text-[#00f0ff] transition-colors">
            {config.title || 'Pauta y Anuncios en GYE TV+'}
          </h4>

          <p className="text-xs text-slate-300 mt-1 mb-4 max-w-md font-sans leading-relaxed">
            {config.subtitle || 'Difunda su marca ante la audiencia líder en información y análisis de Guayaquil y Ecuador.'}
          </p>

          {onOpenContact ? (
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00f0ff] hover:bg-white text-black text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
            >
              <span>Tarifario & Pauta Comercial</span>
              <ExternalLink className="w-3.5 h-3.5 text-black" />
            </button>
          ) : (
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00f0ff] hover:bg-white text-black text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
            >
              <span>Tarifario & Pauta Comercial</span>
              <ExternalLink className="w-3.5 h-3.5 text-black" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
