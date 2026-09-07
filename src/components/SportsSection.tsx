import React, { useState } from 'react';
import { 
  Trophy, 
  ChevronRight, 
  Clock, 
  Calendar, 
  Activity, 
  Play, 
  Shield,
  Zap,
  Flame
} from 'lucide-react';
import { NewsItem } from '../types';
import { useData } from '../context/DataContext';

interface SportsSectionProps {
  newsList: NewsItem[];
  onSelectNews: (news: NewsItem) => void;
}

const SPORTS_TEAMS = ['Todos', 'Barcelona SC', 'Emelec', 'Independiente del Valle', 'Selección Ecuador', 'Liga Pro'];

export const SportsSection: React.FC<SportsSectionProps> = ({ newsList, onSelectNews }) => {
  const { sportsScores } = useData();
  const [activeFilter, setActiveFilter] = useState('Todos');

  // Filter sports news
  const sportsNews = newsList.filter(item => item.category === 'Deportes');
  const mainSport = sportsNews[0] || newsList[2];
  const otherSports = sportsNews.slice(1, 4);

  return (
    <section id="deportes" className="py-12 bg-[#04060f] text-slate-100 border-t border-b border-orange-500/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-orange-500/40 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono">
              <span className="px-2.5 py-0.5 bg-[#ff6600] text-black text-[10px] font-extrabold uppercase tracking-widest shadow-[0_0_12px_rgba(255,102,0,0.8)]">
                SUPLEMENTO DEPORTIVO
              </span>
              <span className="text-xs text-[#00f0ff] flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-[#ff6600]" />
                Liga Pro & Cobertura Selección Nacional
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-black text-white tracking-tight flex items-center gap-2.5">
              <Trophy className="w-7 h-7 text-[#ff8c33]" />
              <span>GYE TV+ | CRÓNICA DEPORTIVA</span>
            </h2>
          </div>

          {/* Quick Team Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono">
            {SPORTS_TEAMS.map(team => (
              <button
                key={team}
                onClick={() => setActiveFilter(team)}
                className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  activeFilter === team
                    ? 'bg-[#ff6600] text-black border-[#ff6600] shadow-[0_0_12px_rgba(255,102,0,0.7)]'
                    : 'bg-black text-slate-300 border-orange-500/30 hover:border-[#ff6600] hover:text-[#ff8c33]'
                }`}
              >
                {team}
              </button>
            ))}
          </div>
        </div>

        {/* Press Box Match Center / Scoreboard */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            <span className="text-[#00f0ff]">PIZARRA OFICIAL DE RESULTADOS & FIXTURE</span>
            <span className="text-[#ff6600] font-extrabold">CAMPEONATO NACIONAL 2026</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {sportsScores.map((match) => (
              <div
                key={match.id}
                className="p-3.5 bg-[#080d1a] border border-orange-500/30 flex flex-col justify-between hover:border-[#ff6600] hover:shadow-[0_0_15px_rgba(255,102,0,0.3)] transition-all"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 font-mono">
                  <span className="font-bold text-[#00f0ff]">{match.tournament}</span>
                  <span className="px-2 py-0.5 bg-black border border-orange-500/40 text-[#ff8c33] font-bold uppercase">
                    {match.status}
                  </span>
                </div>

                <div className="space-y-2 my-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{match.homeLogo}</span>
                      <span className="text-xs font-headline font-bold text-white">
                        {match.homeTeam}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#00f0ff] font-mono bg-black border border-cyan-500/30 px-2 py-0.5">
                      {match.homeScore}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{match.awayLogo}</span>
                      <span className="text-xs font-headline font-bold text-white">
                        {match.awayTeam}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#00f0ff] font-mono bg-black border border-cyan-500/30 px-2 py-0.5">
                      {match.awayScore}
                    </span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-cyan-500/15 text-[10px] text-slate-400 font-mono text-center">
                  Estadio: {match.venue}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sports Stories Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Sports Article (7 cols) */}
          {mainSport && (
            <article 
              onClick={() => onSelectNews(mainSport)}
              className="lg:col-span-7 bg-[#080d1a] border-2 border-orange-500/40 hover:border-[#ff6600] p-6 flex flex-col justify-between cursor-pointer group shadow-[0_0_20px_rgba(255,102,0,0.15)] hover:shadow-[0_0_30px_rgba(255,102,0,0.3)] transition-all"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-black mb-4 border border-cyan-500/30">
                  <img
                    src={mainSport.image}
                    alt={mainSport.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#ff6600] text-black text-[10px] font-mono font-extrabold uppercase tracking-wider shadow-[0_0_10px_rgba(255,102,0,0.8)]">
                    {mainSport.subcategory || 'Clásico del Astillero'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mb-2">
                  <span>{mainSport.date}</span>
                  <span className="text-orange-500/40">•</span>
                  <span className="text-[#ff8c33]">{mainSport.time}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-headline font-bold text-white leading-tight mb-2.5 group-hover:text-[#ff8c33] transition-colors">
                  {mainSport.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {mainSport.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-cyan-500/20">
                <span className="font-mono text-slate-300">Crónica de <strong className="text-white">{mainSport.author.name}</strong></span>
                <span className="text-[#00f0ff] font-mono font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Leer crónica deportiva completa</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff6600]" />
                </span>
              </div>
            </article>
          )}

          {/* Secondary Sports List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-orange-500/20">
            {otherSports.map((story) => (
              <article
                key={story.id}
                onClick={() => onSelectNews(story)}
                className="py-4 first:pt-0 last:pb-0 flex gap-4 cursor-pointer group items-start"
              >
                <div className="w-28 sm:w-32 h-20 overflow-hidden bg-black shrink-0 border border-cyan-500/30 group-hover:border-[#00f0ff] transition-all">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <span className="text-[10px] font-bold text-[#ff8c33] uppercase font-mono">
                      {story.subcategory || 'Fútbol Nacional'}
                    </span>
                    <h4 className="text-xs sm:text-sm font-headline font-bold text-white group-hover:text-[#00f0ff] line-clamp-2 leading-snug mt-0.5">
                      {story.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                    <span>{story.time}</span>
                    <span className="text-[#00f0ff] font-bold text-[11px] group-hover:translate-x-0.5 transition-transform">
                      Detalles →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
