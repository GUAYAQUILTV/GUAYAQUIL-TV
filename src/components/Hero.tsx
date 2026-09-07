import React from 'react';
import { 
  Play, 
  ChevronRight, 
  Clock, 
  Eye, 
  MapPin, 
  Tv, 
  Radio, 
  BookOpen, 
  Flame, 
  Sparkles,
  Zap
} from 'lucide-react';
import { NewsItem } from '../types';

interface HeroProps {
  featuredNews: NewsItem;
  onSelectNews: (news: NewsItem) => void;
  onOpenLive: () => void;
}

export const Hero: React.FC<HeroProps> = ({ featuredNews, onSelectNews, onOpenLive }) => {
  return (
    <section id="inicio" className="bg-[#050811] text-white py-8 lg:py-10 border-b border-cyan-500/20 relative overflow-hidden">
      
      {/* Background Neon Glow Ambient Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#ff6600]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Neon Section Header Bar */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"></span>
            <span className="text-xs font-cyber font-extrabold uppercase tracking-widest text-[#00f0ff] neon-text-cyan">
              PORTADA PRINCIPAL • GUAYAQUIL AL DÍA
            </span>
            <span className="text-cyan-500/40">|</span>
            <span className="text-xs text-slate-300 hidden sm:inline font-mono">
              COBERTURA ESPECIAL EN VIVO
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff8c33]">
            <Zap className="w-3.5 h-3.5 text-[#ff6600]" />
            <span className="hidden md:inline">DESPACHO EXCLUSIVO</span>
          </div>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Main Lead Story (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              {/* Category Badges & Dateline */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="bg-[#00f0ff] text-black px-2.5 py-0.5 font-mono font-extrabold shadow-[0_0_12px_rgba(0,240,255,0.6)]">
                  {featuredNews.category}
                </span>
                {featuredNews.subcategory && (
                  <span className="bg-slate-900 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 font-mono text-[11px]">
                    {featuredNews.subcategory}
                  </span>
                )}
                <span className="text-cyan-500/30">|</span>
                <span className="flex items-center gap-1 text-slate-300 font-normal text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#ff6600]" />
                  <span>Guayaquil, Ecuador</span>
                </span>
              </div>

              {/* Main Headline with High-Contrast White and Neon Hover */}
              <h1 
                onClick={() => onSelectNews(featuredNews)}
                className="font-headline text-2xl sm:text-4xl lg:text-[40px] font-black text-white leading-[1.18] tracking-tight mb-4 hover:text-[#00f0ff] hover:neon-text-cyan transition-all duration-300 cursor-pointer"
              >
                {featuredNews.title}
              </h1>

              {/* Excerpt / Bajada */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-5 font-normal">
                {featuredNews.description}
              </p>

              {/* High-Resolution Photo with Neon Frame Overlay */}
              <div 
                className="relative bg-slate-950 border border-cyan-500/30 hover:border-[#00f0ff] mb-4 cursor-pointer group overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300"
                onClick={() => onSelectNews(featuredNews)}
              >
                <img
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-72 sm:h-96 md:h-[420px] object-cover group-hover:scale-[1.02] transition-transform duration-500 opacity-95"
                />
                
                {/* Cyber Gradient overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#050811] via-[#050811]/70 to-transparent p-4 sm:p-5 text-white border-t border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-[#ff6600] text-black font-extrabold text-[10px] font-mono tracking-widest uppercase">
                      REPORTE DE CAMPO
                    </span>
                    <span className="text-[#00f0ff] text-[11px] font-mono">ENLACE DIRECTO</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">
                    «Panorámica de obras de desarrollo y transformación en el puerto de Guayaquil. Cobertura en directo por la unidad móvil de GYE TV+».
                  </p>
                </div>
              </div>

              {/* Byline & Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-cyan-500/20 text-xs text-slate-300 font-sans">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredNews.author.avatar}
                    alt={featuredNews.author.name}
                    className="w-9 h-9 border border-[#00f0ff] object-cover shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                  />
                  <div>
                    <span className="font-bold text-white block">{featuredNews.author.name}</span>
                    <span className="text-[11px] text-[#00f0ff] font-mono">{featuredNews.author.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-400 font-mono text-xs">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>{featuredNews.date} ({featuredNews.time})</span>
                  </span>
                  <span className="text-cyan-500/30">|</span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#ff6600]" />
                    <span className="text-white font-bold">{featuredNews.viewsCount.toLocaleString()}</span>
                    <span>vistas</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Read & Live Actions Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectNews(featuredNews)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00f0ff] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(0,240,255,0.6)] hover:shadow-[0_0_25px_rgba(255,255,255,0.9)] cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-black" />
                <span>LEER NOTICIA COMPLETA</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>

              <a
                href="#en-vivo"
                onClick={onOpenLive}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff6600] hover:bg-[#ff7700] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(255,102,0,0.6)] hover:shadow-[0_0_25px_rgba(255,102,0,0.9)] cursor-pointer"
              >
                <Radio className="w-4 h-4 text-black" />
                <span>VER SEÑAL EN VIVO</span>
              </a>
            </div>
          </div>

          {/* Right Column: Studio Live Card & Top Dispatches (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* 1. Neon Cyber Television Studio Box */}
            <div className="bg-[#080d1a] text-white p-5 border border-[#00f0ff]/40 shadow-[0_0_25px_rgba(0,240,255,0.15)] relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff6600] animate-ping"></span>
                  <span className="text-[11px] font-extrabold text-[#ff8c33] uppercase tracking-widest font-mono">
                    ESTUDIO EN DIRECTO
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-black text-[#00f0ff] border border-cyan-500/40">
                  1080p • 60 FPS
                </span>
              </div>

              {/* Video Monitor Frame */}
              <div 
                className="relative aspect-video bg-black border border-cyan-500/30 hover:border-[#00f0ff] mb-3.5 cursor-pointer group overflow-hidden transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                onClick={onOpenLive}
              >
                <img
                  src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80"
                  alt="Estudio Central GYE TV+"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-13 h-13 bg-[#ff6600] text-black flex items-center justify-center border-2 border-white group-hover:scale-110 shadow-[0_0_20px_rgba(255,102,0,0.8)] transition-all">
                    <Play className="w-6 h-6 fill-black ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/90 text-[10px] font-mono uppercase font-bold text-[#00f0ff] border border-cyan-500/40 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6600] animate-pulse"></span>
                  <span>4,890 ESPECTADORES</span>
                </div>
              </div>

              {/* Show Details */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00f0ff] font-mono block">
                  EMISIÓN CENTRAL DE LA MAÑANA
                </span>
                <h3 className="font-headline text-base font-bold text-white leading-snug">
                  Guayaquil al Día: Balance Informativo & Enlace Ciudadano
                </h3>
                <p className="text-xs text-slate-300 pt-1">
                  Conducción: Carlos Mendoza y Valeria Solís
                </p>
              </div>

              <a
                href="#en-vivo"
                onClick={onOpenLive}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-cyan-950 to-slate-900 hover:from-cyan-900 hover:to-slate-800 text-[#00f0ff] hover:text-white text-xs font-bold uppercase tracking-wider border border-cyan-500/40 hover:border-[#00f0ff] transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
              >
                <Tv className="w-4 h-4 text-[#00f0ff]" />
                <span>IR AL REPRODUCTOR PRINCIPAL</span>
              </a>
            </div>

            {/* 2. Neon Editorial Dispatch Column ("DESPACHOS DE PRIMERA PLANA") */}
            <div className="bg-[#080d1a] p-5 border border-cyan-500/20">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-cyan-500/30">
                <h3 className="text-xs font-cyber font-extrabold uppercase tracking-widest text-[#00f0ff] neon-text-cyan">
                  NOTAS DE PRIMERA PLANA
                </h3>
                <span className="text-[10px] text-[#ff8c33] font-mono">HOY</span>
              </div>

              <div className="divide-y divide-cyan-500/15">
                <div className="py-3">
                  <span className="text-[10px] font-mono font-bold text-[#00f0ff] uppercase tracking-wider">
                    GUAYAQUIL / VIALIDAD
                  </span>
                  <h4 className="font-headline text-sm font-bold text-white leading-snug mt-1 hover:text-[#00f0ff] transition-colors cursor-pointer">
                    Rehabilitación de arterias principales en el norte agiliza tiempos de traslado
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Autoridad de Tránsito reporta fluidez en horas pico.</p>
                </div>

                <div className="py-3">
                  <span className="text-[10px] font-mono font-bold text-[#ff8c33] uppercase tracking-wider">
                    ECONOMÍA & PUERTOS
                  </span>
                  <h4 className="font-headline text-sm font-bold text-white leading-snug mt-1 hover:text-[#ff6600] transition-colors cursor-pointer">
                    Exportaciones no tradicionales registran incremento del 14% en terminal marítima
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Cacao y camarón lideran cifras en el primer trimestre.</p>
                </div>

                <div className="py-3">
                  <span className="text-[10px] font-mono font-bold text-[#00f0ff] uppercase tracking-wider">
                    CULTURA CIUDADANA
                  </span>
                  <h4 className="font-headline text-sm font-bold text-white leading-snug mt-1 hover:text-[#00f0ff] transition-colors cursor-pointer">
                    Festival de Teatro en Las Peñas convoca a más de 30 compañías nacionales
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Agenda abierta al público durante todo el fin de semana.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
