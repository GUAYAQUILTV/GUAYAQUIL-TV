import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Compass, 
  ChevronRight, 
  Bus, 
  Sun, 
  Landmark,
  Zap,
  Sparkles
} from 'lucide-react';
import { NewsItem } from '../types';

interface GuayaquilSectionProps {
  newsList: NewsItem[];
  onSelectNews: (news: NewsItem) => void;
}

const GYE_SUBTOPICS = ['Todos', 'Turismo & Ciudad', 'Comunidad y Orden', 'Movilidad Urbana', 'Cultura'];

export const GuayaquilSection: React.FC<GuayaquilSectionProps> = ({ newsList, onSelectNews }) => {
  const [activeSubtopic, setActiveSubtopic] = useState('Todos');

  // Filter news related to Guayaquil or local security/culture
  const guayaquilNews = newsList.filter(
    item => item.category === 'Guayaquil' || item.category === 'Seguridad' || item.category === 'Cultura'
  );

  const filteredGuayaquil = activeSubtopic === 'Todos'
    ? guayaquilNews
    : guayaquilNews.filter(item => item.subcategory?.includes(activeSubtopic) || item.category === activeSubtopic);

  const mainStory = filteredGuayaquil[0] || guayaquilNews[0];
  const sideStories = filteredGuayaquil.slice(1, 4);

  return (
    <section id="guayaquil" className="py-12 bg-[#050811] border-b border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Masthead Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-cyan-500/30 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono">
              <span className="px-2 py-0.5 bg-[#00f0ff] text-black text-[10px] font-extrabold uppercase tracking-widest shadow-[0_0_10px_rgba(0,240,255,0.6)]">
                CRÓNICA LOCAL & METROPOLITANA
              </span>
              <span className="text-xs text-[#00f0ff] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#ff6600]" />
                Guayaquil y Gran Guayaquil
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-black text-white tracking-tight flex items-center gap-2.5">
              <Landmark className="w-7 h-7 text-[#00f0ff]" />
              <span>INFORMACIÓN DE GUAYAQUIL</span>
            </h2>
          </div>

          {/* Quick Subtopic Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono">
            {GYE_SUBTOPICS.map(topic => (
              <button
                key={topic}
                onClick={() => setActiveSubtopic(topic)}
                className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  activeSubtopic === topic
                    ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                    : 'bg-black text-slate-300 border-cyan-500/20 hover:border-[#00f0ff] hover:text-[#00f0ff]'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Guayaquil Civic Indicators (Weather + Transit + Urban monitoring) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-8 border border-cyan-500/30 bg-[#080d1a] divide-y sm:divide-y-0 sm:divide-x divide-cyan-500/20">
          <div className="p-3.5 flex items-center gap-3">
            <div className="p-2 bg-black border border-cyan-500/40 text-[#ff8c33]">
              <Sun className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white font-sans">Meteorología Urbana</p>
              <p className="text-slate-400 text-[11px] font-mono">29°C • Humedad 72% • Viento 12 km/h</p>
            </div>
          </div>

          <div className="p-3.5 flex items-center gap-3">
            <div className="p-2 bg-black border border-cyan-500/40 text-[#00f0ff]">
              <Bus className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white font-sans">Red de Transporte & Metrovía</p>
              <p className="text-[#00f0ff] text-[11px] font-mono">Troncales 1, 2 y 3 operando 100%</p>
            </div>
          </div>

          <div className="p-3.5 flex items-center gap-3">
            <div className="p-2 bg-black border border-cyan-500/40 text-[#ff6600]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white font-sans">Seguridad y Monitoreo</p>
              <p className="text-slate-400 text-[11px]">Malecón 2000, 9 de Octubre y Samborondón</p>
            </div>
          </div>
        </div>

        {/* Editorial Layout for Guayaquil News */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Guayaquil Feature (7 cols) */}
          {mainStory && (
            <div className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-cyan-500/20 lg:pr-8 pb-6 lg:pb-0">
              <div 
                onClick={() => onSelectNews(mainStory)}
                className="cursor-pointer group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black mb-4 border border-cyan-500/30 group-hover:border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.15)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.35)] transition-all">
                  <img
                    src={mainStory.image}
                    alt={mainStory.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-black/90 text-[#00f0ff] text-[10px] font-mono font-bold uppercase tracking-wider border border-cyan-500/50">
                    {mainStory.category} • {mainStory.subcategory || 'Reportaje'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mb-2">
                  <span>{mainStory.date}</span>
                  <span className="text-cyan-500/40">—</span>
                  <span className="text-[#00f0ff]">{mainStory.time}</span>
                  <span className="text-cyan-500/40">•</span>
                  <span>Lectura: {mainStory.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-headline font-black text-white leading-tight mb-3 group-hover:text-[#00f0ff] transition-colors">
                  {mainStory.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {mainStory.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20 text-xs">
                  <span className="text-slate-400 font-mono">Por <strong className="text-white">{mainStory.author.name}</strong></span>
                  <span className="font-mono font-extrabold text-[#00f0ff] group-hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    <span>Leer informe completo</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ff6600]" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Guayaquil Stories Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-cyan-500/15">
            {sideStories.map((story) => (
              <article
                key={story.id}
                onClick={() => onSelectNews(story)}
                className="py-4 first:pt-0 last:pb-0 cursor-pointer group flex gap-4 items-start"
              >
                <div className="w-28 sm:w-32 h-20 overflow-hidden bg-black shrink-0 border border-cyan-500/25 group-hover:border-[#00f0ff] transition-all">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#00f0ff] uppercase font-mono mb-1">
                      <span>{story.category}</span>
                      <span className="text-cyan-500/40">•</span>
                      <span className="text-[#ff8c33] font-normal">{story.time}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-headline font-bold text-white group-hover:text-[#00f0ff] line-clamp-2 leading-snug">
                      {story.title}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#ff6600] group-hover:text-white flex items-center gap-0.5 mt-2 transition-colors">
                    <span>Ver cobertura</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
