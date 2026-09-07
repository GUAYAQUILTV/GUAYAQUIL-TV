import React from 'react';
import { 
  Newspaper, 
  Building2, 
  Globe, 
  Trophy, 
  Film, 
  Palette, 
  ArrowUpRight,
  Compass,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/newsData';
import { CategoryType } from '../types';

interface CategorySectionProps {
  onSelectCategory: (category: CategoryType) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Newspaper':
        return <Newspaper className="w-5 h-5 text-[#00f0ff]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#00f0ff]" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-[#ff8c33]" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-[#ff6600]" />;
      case 'Film':
        return <Film className="w-5 h-5 text-[#00f0ff]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#ff8c33]" />;
      default:
        return <Newspaper className="w-5 h-5 text-[#00f0ff]" />;
    }
  };

  const handleCategoryClick = (categorySlug: CategoryType) => {
    onSelectCategory(categorySlug);
    const targetSection = document.getElementById('ultimas-noticias');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-[#040711] border-b border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-cyan-500/30 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span className="px-2 py-0.5 bg-black text-[#00f0ff] border border-cyan-500/40 text-[10px] font-mono font-bold uppercase tracking-widest">
                DIRECTORIO DIGITAL
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-black text-white tracking-tight">
              SECCIONES & COBERTURAS
            </h2>
          </div>
          <p className="text-xs text-slate-300 font-sans max-w-md">
            Consulte la información clasificada por áreas temáticas y transmisiones especiales.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className="bg-[#080d1a] border border-cyan-500/20 hover:border-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              <div>
                {/* Icon */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="p-2 bg-black border border-cyan-500/30 group-hover:border-[#00f0ff] group-hover:bg-cyan-950/60 transition-colors">
                    {getIcon(cat.iconName)}
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="text-xs sm:text-sm font-headline font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                  {cat.name}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-snug hidden sm:block">
                  {cat.description}
                </p>
              </div>

              {/* Bottom Count and Arrow */}
              <div className="mt-3 pt-2 border-t border-cyan-500/15 flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-[#ff8c33]">
                  {cat.count} notas
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
