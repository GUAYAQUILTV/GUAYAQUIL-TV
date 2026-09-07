import React, { useState } from 'react';
import { Newspaper, ChevronRight, PlusCircle, Sparkles } from 'lucide-react';
import { NewsItem, CategoryType } from '../types';
import { NewsCard } from './NewsCard';

interface NewsSectionProps {
  newsList: NewsItem[];
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  onSelectNews: (news: NewsItem) => void;
}

const CATEGORIES_FILTER: { label: string; value: CategoryType }[] = [
  { label: 'TODAS LAS SECCIONES', value: 'Todas' },
  { label: 'SEGURIDAD & JUSTICIA', value: 'Seguridad' },
  { label: 'DEPORTES', value: 'Deportes' },
  { label: 'CULTURA & SOCIEDAD', value: 'Cultura' },
  { label: 'ESPECTÁCULOS & FARÁNDULA', value: 'Entretenimiento' }
];

export const NewsSection: React.FC<NewsSectionProps> = ({
  newsList,
  selectedCategory,
  onSelectCategory,
  onSelectNews
}) => {
  const [visibleCount, setVisibleCount] = useState(8);

  // Filter news based on active category
  const filteredNews = selectedCategory === 'Todas'
    ? newsList
    : newsList.filter(item => item.category === selectedCategory);

  const displayedNews = filteredNews.slice(0, visibleCount);

  return (
    <section id="ultimas-noticias" className="py-10 bg-[#050811] border-b border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-cyan-500/30 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"></span>
              <span className="text-[11px] font-cyber font-bold text-[#00f0ff] uppercase tracking-widest neon-text-cyan">
                COBERTURA Y ACTUALIDAD EN TIEMPO REAL
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-black text-white tracking-tight">
              Despachos de Última Hora
            </h2>
          </div>

          {/* Neon Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full font-mono">
            {CATEGORIES_FILTER.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => onSelectCategory(cat.value)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.7)]'
                      : 'bg-black text-slate-300 border-cyan-500/30 hover:border-[#00f0ff] hover:text-[#00f0ff]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* News Grid */}
        {displayedNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedNews.map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                onSelect={onSelectNews}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-[#080d1a] border border-cyan-500/30">
            <p className="text-slate-300 text-sm mb-3">No se registran despachos informativos en esta categoría en este momento.</p>
            <button
              onClick={() => onSelectCategory('Todas')}
              className="text-xs text-[#00f0ff] font-bold uppercase tracking-wider underline cursor-pointer hover:neon-text-cyan"
            >
              Restablecer a todas las secciones
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredNews.length > visibleCount && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#080d1a] hover:bg-[#00f0ff] text-[#00f0ff] hover:text-black text-xs font-extrabold uppercase tracking-wider border-2 border-[#00f0ff] transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>CARGAR MÁS NOTICIAS ({filteredNews.length - visibleCount} pendientes)</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
