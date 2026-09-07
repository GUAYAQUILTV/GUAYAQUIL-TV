import React from 'react';
import { 
  Tv, 
  ArrowUp, 
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import { CategoryType } from '../types';

interface FooterProps {
  onSelectCategory?: (category: CategoryType) => void;
  onOpenWebmasterGuide: () => void;
  onOpenContactModal?: () => void;
  onOpenAdmin?: (tab?: 'live' | 'news' | 'alerts' | 'sports' | 'videos' | 'ads' | 'backup') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenWebmasterGuide,
  onOpenAdmin
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#02040a] text-slate-300 border-t-2 border-cyan-500/30 relative">
      
      {/* Top Banner / Masthead Footer Bar */}
      <div className="py-6 bg-[#050814]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-black border-2 border-[#00f0ff] flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <Tv className="w-6 h-6 text-[#00f0ff]" />
            </div>
            <div>
              <div className="text-xl font-cyber font-black text-white tracking-wider flex items-center gap-2">
                <span>GYE <span className="text-[#00f0ff] neon-text-cyan">TV</span><span className="text-[#ff6600] neon-text-orange">+</span></span>
                <span className="text-[10px] px-2 py-0.5 bg-black border border-cyan-500/40 text-[#00f0ff] font-mono">
                  MULTIMEDIOS GUAYAQUIL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Registro Nacional de Medios Digitales N° 0492-GYE-2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {onOpenAdmin && (
              <button
                onClick={() => onOpenAdmin('live')}
                className="px-3.5 py-2 bg-[#ff6600]/20 hover:bg-[#ff6600] text-[#ff8c33] hover:text-black text-xs font-mono font-extrabold border border-[#ff6600]/60 flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_10px_rgba(255,102,0,0.3)]"
                title="Acceso Administración y Redacción"
              >
                <ShieldCheck className="w-4 h-4 text-[#ff6600]" />
                <span>Acceso Redacción (Admin)</span>
              </button>
            )}

            <button
              onClick={onOpenWebmasterGuide}
              className="px-3.5 py-2 bg-black hover:bg-slate-900 text-[#00f0ff] hover:text-white text-xs font-mono font-bold border border-cyan-500/40 flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_8px_rgba(0,240,255,0.2)]"
            >
              <BookOpen className="w-4 h-4 text-[#00f0ff]" />
              <span>Manual Editorial</span>
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 bg-black hover:bg-[#00f0ff] hover:text-black text-[#00f0ff] border border-cyan-500/40 transition-all cursor-pointer shadow-[0_0_8px_rgba(0,240,255,0.2)]"
              title="Volver al inicio"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-cyan-500/20 bg-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono gap-3">
          <div>
            © {new Date().getFullYear()} GYE TV+ Multimedios Ecuador S.A. Todos los derechos reservados.
          </div>
          <div className="text-slate-400">
            <span>Guayaquil - Ecuador</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
