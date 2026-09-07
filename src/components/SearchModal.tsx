import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Newspaper, BookOpen, Sparkles } from 'lucide-react';
import { NewsItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsList: NewsItem[];
  onSelectNews: (news: NewsItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  newsList,
  onSelectNews
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();
  const results = normalizedQuery === ''
    ? []
    : newsList.filter(item => 
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
      );

  const quickTags = ['Guayaquil', 'Deportes', 'Malecón', 'Liga Pro', 'Cultura', 'Seguridad'];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-start justify-center p-3 pt-12 sm:pt-20 animate-in fade-in duration-200">
      
      <div className="bg-[#080d1a] max-w-2xl w-full shadow-[0_0_40px_rgba(0,240,255,0.4)] overflow-hidden border-2 border-[#00f0ff] animate-in slide-in-from-top-3 duration-200 font-mono">
        
        {/* Masthead Header Banner */}
        <div className="bg-black text-white px-4 py-3 flex items-center justify-between border-b border-cyan-500/40">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#00f0ff]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#00f0ff]">
              MOTOR DE BÚSQUEDA DIGITAL GYE TV+
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#ff6600] hover:text-white p-1 text-xs cursor-pointer"
          >
            [ESC]
          </button>
        </div>

        {/* Search Header Input */}
        <div className="p-4 border-b border-cyan-500/25 flex items-center gap-3 bg-[#050811]">
          <Search className="w-5 h-5 text-[#00f0ff] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por titular, temática o sector de Guayaquil..."
            className="w-full bg-transparent text-white text-sm sm:text-base focus:outline-none placeholder:text-slate-500 font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-[#ff6600] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Tag Suggestions */}
        <div className="px-4 py-2.5 bg-black border-b border-cyan-500/20 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 text-[10px] uppercase tracking-wider shrink-0">
            DESCRIPTORES:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-[#080d1a] hover:bg-[#00f0ff] hover:text-black text-[#00f0ff] border border-cyan-500/30 text-[10px] font-bold transition-all cursor-pointer shrink-0"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto p-4 divide-y divide-cyan-500/15 bg-[#050811]">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-slate-400 text-xs sm:text-sm">
              <Newspaper className="w-8 h-8 text-[#00f0ff] mx-auto mb-2 opacity-80" />
              <p>Ingrese un criterio de búsqueda para consultar el archivo periodístico de <strong className="text-white">GYE TV+</strong></p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-[#ff8c33] uppercase tracking-widest mb-2">
                {results.length} REGISTRO(S) LOCALIZADO(S):
              </p>
              {results.map((item) => (
                <article
                  key={item.id}
                  onClick={() => {
                    onSelectNews(item);
                    onClose();
                  }}
                  className="p-3 hover:bg-[#080d1a] border border-transparent hover:border-cyan-500/40 transition-all cursor-pointer flex gap-3 group"
                >
                  <div className="w-20 h-16 shrink-0 bg-black border border-cyan-500/30 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90 group-hover:opacity-100"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#00f0ff] uppercase mb-0.5">
                      <span>{item.category}</span>
                      <span className="text-cyan-500/40">•</span>
                      <span className="text-slate-400 font-normal">{item.date}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-headline font-bold text-white group-hover:text-[#00f0ff] line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-sans">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#00f0ff] group-hover:translate-x-1 transition-transform self-center shrink-0" />
                </article>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-300 text-xs sm:text-sm">
              <p>No se encontraron despachos que coincidan con «<strong className="text-white">{query}</strong>».</p>
              <p className="text-slate-500 text-xs mt-1">Intente con términos como "Guayaquil", "Deportes" o "Cultura".</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
