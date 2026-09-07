import React, { useState } from 'react';
import { 
  Play, 
  Tv, 
  Clock, 
  Eye, 
  X, 
  Share2, 
  ExternalLink,
  ChevronRight,
  Film,
  Zap,
  Sparkles
} from 'lucide-react';
import { VideoItem } from '../types';
import { useData } from '../context/DataContext';

export const VideoSection: React.FC = () => {
  const { videos } = useData();
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section id="videos" className="py-14 bg-[#03060e] text-slate-100 border-t border-b border-cyan-500/20 relative overflow-hidden">
      
      {/* Neon Glow accent */}
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#00f0ff]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-cyan-500/30 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono">
              <span className="inline-block px-2.5 py-0.5 bg-black border border-cyan-500/40 text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                PRODUCCIONES ESPECIALES & REPORTAJES
              </span>
              <span className="text-[11px] text-[#ff8c33] font-mono tracking-wide">
                ARCHIVO AUDIOVISUAL
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-black text-white tracking-tight flex items-center gap-3">
              <Film className="w-7 h-7 text-[#00f0ff]" />
              <span>GYE TV+ | REPORTAJES & VIDEOTECA</span>
            </h2>
          </div>
          <p className="text-xs text-slate-300 max-w-md font-sans leading-relaxed">
            Coberturas de campo, crónicas urbanas, entrevistas exclusivas y transmisiones documentales registradas en alta definición.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <article
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="bg-[#080d1a] border border-cyan-500/20 hover:border-[#00f0ff] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all duration-300 flex flex-col cursor-pointer group"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                
                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <div className="w-13 h-13 rounded-none bg-[#00f0ff] text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.8)] group-hover:bg-[#ff6600] group-hover:shadow-[0_0_25px_rgba(255,102,0,0.9)] group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/90 text-[10px] font-mono font-bold text-[#00f0ff] border border-cyan-500/40 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#ff6600]" />
                  <span>{vid.duration}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-black/90 border border-cyan-500/40 text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                  {vid.category}
                </div>
              </div>

              {/* Video Info Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2 font-mono">
                    <span>{vid.date}</span>
                    <span className="text-cyan-500/40">•</span>
                    <span className="flex items-center gap-1 text-[#ff8c33]">
                      <Eye className="w-3 h-3 text-[#ff6600]" />
                      <span>{vid.views} visualizaciones</span>
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-headline font-bold text-white group-hover:text-[#00f0ff] transition-colors line-clamp-2 leading-snug">
                    {vid.title}
                  </h3>
                </div>

                <div className="pt-3 mt-3 border-t border-cyan-500/15 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="text-[11px] truncate text-slate-300">
                    {vid.presenter || 'Unidad de Investigación GYE TV+'}
                  </span>
                  <span className="text-[#00f0ff] font-bold text-[11px] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Ver informe</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ff6600]" />
                  </span>
                </div>

              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Video Modal Player Overlay */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#080d1a] border-2 border-[#00f0ff] max-w-4xl w-full overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.4)] relative">
            
            {/* Modal Header */}
            <div className="p-4 bg-black flex items-center justify-between border-b border-cyan-500/30">
              <div className="flex items-center gap-2 font-mono">
                <span className="px-2.5 py-0.5 bg-[#00f0ff] text-black text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.6)]">
                  {activeVideo.category}
                </span>
                <span className="text-xs text-[#ff8c33]">
                  Duración: {activeVideo.duration} • {activeVideo.views} vistas
                </span>
              </div>
              
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 text-slate-400 hover:text-[#ff6600] hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-[#ff6600] text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,102,0,0.8)] mb-4">
                  <Play className="w-8 h-8 fill-black ml-1" />
                </div>
                <h3 className="text-lg sm:text-xl font-headline font-bold text-white max-w-lg mb-2">
                  {activeVideo.title}
                </h3>
                <p className="text-xs text-slate-300 max-w-md font-sans">
                  {activeVideo.description || 'Reportaje audiovisual oficial emitido por GYE TV+.'}
                </p>
                <p className="text-[11px] text-[#00f0ff] font-mono mt-4">
                  ⚡ Transmisión del archivo institucional de noticias
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-black border-t border-cyan-500/30 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Redacción & Producción: <strong className="text-[#00f0ff]">{activeVideo.presenter || 'Equipo Audiovisual GYE TV+'}</strong>
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Enlace del reportaje copiado al portapapeles.');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00f0ff] hover:bg-white text-black text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.4)]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartir reporte</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
