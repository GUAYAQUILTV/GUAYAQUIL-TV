import React from 'react';
import { ShieldCheck, Tv, Plus, Settings, LogOut, Radio, RefreshCw, Zap } from 'lucide-react';
import { useData } from '../context/DataContext';

interface AdminBarProps {
  onOpenAdmin: (tab?: 'live' | 'news' | 'alerts' | 'sports' | 'videos' | 'ads' | 'backup') => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({ onOpenAdmin }) => {
  const { isAdmin, adminUser, logoutAdmin, liveConfig } = useData();

  if (!isAdmin) return null;

  return (
    <div className="bg-black text-white text-xs font-mono border-b-2 border-[#ff6600] py-1.5 px-4 sticky top-0 z-40 shadow-[0_4px_20px_rgba(255,102,0,0.3)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 px-2 py-0.5 bg-[#ff6600] text-black font-extrabold text-[10px] uppercase tracking-wider shadow-[0_0_10px_rgba(255,102,0,0.5)]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MODO DIRECTOR ACTIVO</span>
          </span>

          <span className="text-[11px] text-slate-300 font-mono hidden sm:inline">
            Sesión: <strong className="text-[#00f0ff]">{adminUser?.username}</strong> | {adminUser?.role}
          </span>

          {/* Live Status indicator */}
          <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 border ${
            liveConfig.isLive ? 'bg-black border-[#ff6600] text-[#ff8c33]' : 'bg-[#080d1a] border-cyan-500/30 text-slate-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${liveConfig.isLive ? 'bg-[#ff6600] animate-ping' : 'bg-slate-500'}`}></span>
            <span>{liveConfig.isLive ? 'EN VIVO AL AIRE' : 'STREAM PAUSADO'}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAdmin('live')}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-black hover:bg-[#ff6600] text-[#ff8c33] hover:text-black border border-[#ff6600]/80 text-[11px] font-bold cursor-pointer transition-all shadow-[0_0_10px_rgba(255,102,0,0.2)]"
          >
            <Tv className="w-3 h-3 text-[#ff6600]" />
            <span>Cambiar En Vivo</span>
          </button>

          <button
            onClick={() => onOpenAdmin('news')}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-black hover:bg-[#00f0ff] text-[#00f0ff] hover:text-black border border-cyan-500/80 text-[11px] font-bold cursor-pointer transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          >
            <Plus className="w-3 h-3" />
            <span>Nueva Noticia</span>
          </button>

          <button
            onClick={() => onOpenAdmin('live')}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-black hover:bg-white text-slate-200 hover:text-black border border-slate-700 text-[11px] font-bold cursor-pointer transition-colors"
          >
            <Settings className="w-3 h-3 text-[#00f0ff]" />
            <span>Panel Master</span>
          </button>

          <button
            onClick={logoutAdmin}
            title="Cerrar sesión de redacción"
            className="inline-flex items-center gap-1 px-2 py-1 bg-black hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 text-[11px] cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
