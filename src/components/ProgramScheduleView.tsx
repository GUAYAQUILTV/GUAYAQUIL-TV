import React, { useState } from 'react';
import { Calendar, Clock, Tv, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ProgramScheduleViewProps {
  onOpenLive: () => void;
}

export const ProgramScheduleView: React.FC<ProgramScheduleViewProps> = ({ onOpenLive }) => {
  const { liveConfig } = useData();
  const [selectedDay, setSelectedDay] = useState<'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'finDeSemana'>('lunes');

  const daysList = [
    { id: 'lunes', label: 'Lunes', subtitle: 'Inicio de semana informativa' },
    { id: 'martes', label: 'Martes', subtitle: 'Actualidad y comunidad' },
    { id: 'miercoles', label: 'Miércoles', subtitle: 'Debates y economía' },
    { id: 'jueves', label: 'Jueves', subtitle: 'Cultura y reportajes' },
    { id: 'viernes', label: 'Viernes', subtitle: 'Farándula y cierre estelar' },
    { id: 'finDeSemana', label: 'Fin de Semana', subtitle: 'Especiales GYE TV+' },
  ];

  // Schedule generator per day
  const getScheduleForDay = (day: string) => {
    switch (day) {
      case 'lunes':
      case 'martes':
      case 'miercoles':
      case 'jueves':
      case 'viernes':
        return [
          { time: '06:00 - 08:30', title: 'Guayaquil Despierta • Edición Matinal', host: 'Lic. Mariana Cordero y Carlos Mendoza', category: 'Noticias', image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80', desc: 'El pulso de la noticia al amanecer en Guayaquil y Ecuador con enlaces en directo desde los barrios.' },
          { time: '08:30 - 11:00', title: 'La Farándula Despierta — ¡Sí pasa, se cuenta!', host: 'Valeria Solís y Diego Alarcón', category: 'Farándula', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80', desc: 'Todo el entretenimiento, exclusivas del espectáculo nacional y entrevistas picantes sin censura.' },
          { time: '11:00 - 13:00', title: 'Guayaquil Al Día • Informativo Meridiano', host: 'Carlos Mendoza y equipo de redacción', category: 'Noticias', image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80', desc: 'Análisis profundo de los acontecimientos políticos, económicos y comunitarios del día.' },
          { time: '13:00 - 15:00', title: 'Deportes En Alta Definición', host: 'Diego Alarcón y panel deportivo', category: 'Deportes', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80', desc: 'Liga Pro, Barcelona SC, Emelec, La Tri y toda la actualidad futbolística nacional e internacional.' },
          { time: '15:00 - 17:30', title: 'Conexión Urbana • Entretenimiento y Música', host: 'Andrea Viteri', category: 'Entretenimiento', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80', desc: 'Tendencias digitales, entrevistas a artistas urbanos y concursos en vivo con la audiencia.' },
          { time: '19:00 - 21:00', title: 'Noticiero Central GYE TV+', host: 'Lic. Mariana Cordero', category: 'Noticias', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80', desc: 'El resumen estelar de la jornada con los hechos más impactantes de Guayaquil y el Ecuador.' },
          { time: '21:00 - 22:30', title: 'Entrevistas de Fondo con El Director', host: 'Director General GYE TV+', category: 'Entrevistas', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80', desc: 'Diálogos exclusivos con líderes de opinión, autoridades y personajes del desarrollo nacional.' }
        ];
      case 'finDeSemana':
        return [
          { time: '08:00 - 10:30', title: 'Guayaquil de Antaño y Presente', host: 'Isabel Carvajal', category: 'Cultura', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80', desc: 'Recorridos históricos por el Barrio Las Peñas, Malecón y las tradiciones porteñas.' },
          { time: '10:30 - 13:00', title: 'Sábado de Farándula Estelar', host: 'Valeria Solís', category: 'Farándula', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80', desc: 'El resumen imperdible con los escándalos, entrevistas y alfombras rojas del fin de semana.' },
          { time: '14:00 - 17:00', title: 'Cancha Abierta • Liga Pro En Vivo', host: 'Equipo Deportivo GYE TV+', category: 'Deportes', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80', desc: 'Cobertura previa, estadísticas en tiempo real y reacciones post-partido del fútbol ecuatoriano.' },
          { time: '20:00 - 22:00', title: 'Especiales GYE TV+ • Reportajes de Investigación', host: 'Unidad Investigativa', category: 'Especiales', image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80', desc: 'Investigaciones periodísticas a fondo sobre el desarrollo y desafíos de nuestra sociedad.' }
        ];
      default:
        return [];
    }
  };

  const currentList = getScheduleForDay(selectedDay);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#070b18] via-[#0b1329] to-[#070b18] border border-cyan-500/30 p-6 sm:p-8 mb-8 relative overflow-hidden shadow-[0_0_25px_rgba(0,240,255,0.1)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 text-[#00f0ff] font-mono text-xs uppercase tracking-widest mb-3 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <Calendar className="w-3.5 h-3.5 text-[#ff6600]" />
              <span>GUÍA DE PROGRAMACIÓN OFICIAL • GYE TV+</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-headline tracking-tight">
              Parrilla de <span className="text-[#00f0ff] neon-text-cyan">Emisión 24/7</span>
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              Consulta nuestra programación diaria en alta definición. Sintoniza en directo tus espacios favoritos de noticias, deportes, farándula y cultura desde Guayaquil para todo el Ecuador.
            </p>
          </div>

          <button
            onClick={onOpenLive}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6600] to-[#ff3300] hover:from-[#ff7700] hover:to-[#ff4400] text-white font-black uppercase tracking-widest text-xs border border-white/20 shadow-[0_0_20px_rgba(255,102,0,0.6)] hover:shadow-[0_0_30px_rgba(255,102,0,0.9)] transition-all cursor-pointer shrink-0"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <span>Ver Transmisión EN VIVO</span>
          </button>
        </div>
      </div>

      {/* Day selector tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {daysList.map((day) => {
          const isActive = selectedDay === day.id;
          return (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id as any)}
              className={`p-3 text-left transition-all border cursor-pointer ${
                isActive
                  ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.6)] font-bold'
                  : 'bg-[#070b18] hover:bg-cyan-950/40 text-slate-200 border-cyan-500/20 hover:border-cyan-500/50'
              }`}
            >
              <div className="font-mono text-xs uppercase tracking-wider flex items-center justify-between">
                <span>{day.label}</span>
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
              </div>
              <p className={`text-[11px] mt-1 truncate ${isActive ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                {day.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Schedule Items List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/25">
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider font-bold flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#ff6600]" />
            <span>Programación para {daysList.find(d => d.id === selectedDay)?.label} (Hora de Ecuador GMT-5)</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {currentList.length} Programas programados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentList.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-[#070b18] border border-cyan-500/25 hover:border-[#00f0ff] transition-all p-4 flex flex-col sm:flex-row gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                <div className="relative w-full sm:w-40 h-28 shrink-0 overflow-hidden bg-black border border-cyan-500/30">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/90 text-[#00f0ff] font-mono font-bold text-[9px] uppercase border border-cyan-500/50">
                    {item.category}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-[#ff8c33] bg-orange-950/40 px-2 py-0.5 border border-orange-500/30">
                        {item.time}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono uppercase">
                        HD Studio
                      </span>
                    </div>
                    <h3 className="font-headline text-sm sm:text-base font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-cyan-500/15 flex items-center justify-between text-xs text-slate-400">
                    <span className="truncate">Conducción: <strong className="text-white">{item.host}</strong></span>
                    <button
                      onClick={onOpenLive}
                      className="text-[#00f0ff] hover:text-white font-mono text-[11px] uppercase tracking-wider flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>Ver</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
