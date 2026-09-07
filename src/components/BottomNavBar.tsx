import React from 'react';
import { Home, Tv, Calendar, Newspaper, Film } from 'lucide-react';

interface BottomNavBarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenLive: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onTabChange, onOpenLive }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#050811]/95 backdrop-blur-md border-t border-cyan-500/40 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] lg:hidden">
      <div className="grid grid-cols-5 h-16 px-1">
        {[
          { id: 'inicio', label: 'Inicio', icon: Home },
          { id: 'envivo', label: 'En Vivo', icon: Tv, isLiveRed: true },
          { id: 'programacion', label: 'Guía', icon: Calendar },
          { id: 'programas', label: 'Shows', icon: Film },
          { id: 'noticias', label: 'Noticias', icon: Newspaper },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'envivo') {
                  onOpenLive();
                } else {
                  onTabChange(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
                item.isLiveRed
                  ? 'text-[#ff6600]'
                  : isActive
                  ? 'text-[#00f0ff]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className={`p-1 rounded-full ${item.isLiveRed ? 'bg-[#ff6600]/20 border border-[#ff6600]' : isActive ? 'bg-cyan-950/60 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.4)]' : ''}`}>
                <Icon className={`w-4 h-4 ${item.isLiveRed ? 'text-[#ff6600] animate-pulse' : ''}`} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider mt-1 truncate max-w-[60px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
