import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Eye, 
  Share2, 
  Volume2, 
  Check, 
  Twitter, 
  MessageCircle, 
  Printer,
  ChevronRight,
  Bookmark,
  Newspaper,
  Zap,
  Sparkles
} from 'lucide-react';
import { NewsItem } from '../types';
import { AD_BANNERS } from '../data/newsData';
import { AdBanner } from './AdBanner';

interface NewsModalProps {
  news: NewsItem | null;
  onClose: () => void;
  onSelectRelated: (item: NewsItem) => void;
  allNews: NewsItem[];
}

export const NewsModal: React.FC<NewsModalProps> = ({ news, onClose, onSelectRelated, allNews }) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isCopied, setIsCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!news) return null;

  const relatedNews = allNews
    .filter(item => item.id !== news.id && (item.category === news.category || item.category === 'Guayaquil'))
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`*${news.title}* - Léelo en GYE TV+: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${news.title} vía @GYETVplus`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'xlarge':
        return 'text-xl leading-loose';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Editorial Sheet */}
      <div className="bg-[#080d1a] max-w-4xl w-full max-h-[94vh] flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.3)] overflow-hidden relative border-2 border-[#00f0ff] my-auto">
        
        {/* Editorial Top Masthead Bar */}
        <div className="p-3 sm:px-6 bg-black text-white flex items-center justify-between sticky top-0 z-30 border-b border-cyan-500/40">
          
          {/* Masthead identifier */}
          <div className="flex items-center gap-3">
            <span className="font-cyber font-black tracking-widest text-sm text-white">
              GYE <span className="text-[#00f0ff] neon-text-cyan">TV</span><span className="text-[#ff6600] neon-text-orange">+</span>
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-black border border-cyan-500/50 text-[10px] font-mono text-[#00f0ff]">
              {news.category.toUpperCase()}
            </span>
            <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
              Tiempo: {news.readTime}
            </span>
          </div>

          {/* Quick Tools */}
          <div className="flex items-center gap-2">
            
            {/* Font size adjuster */}
            <div className="hidden sm:flex items-center bg-black border border-cyan-500/40 p-0.5 text-xs font-mono">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 cursor-pointer font-bold ${fontSize === 'normal' ? 'bg-[#00f0ff] text-black' : 'text-slate-300'}`}
                title="Tipografía Estándar"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 cursor-pointer font-bold ${fontSize === 'large' ? 'bg-[#00f0ff] text-black' : 'text-slate-300'}`}
                title="Tipografía Grande"
              >
                A+
              </button>
            </div>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-black hover:bg-slate-900 text-slate-300 border border-cyan-500/40 text-xs font-mono transition-colors cursor-pointer"
              title="Imprimir documento"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>

            {/* Audio Reader */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold border transition-all cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-[#ff6600] text-black border-[#ff6600] shadow-[0_0_12px_rgba(255,102,0,0.8)]' 
                  : 'bg-black text-[#00f0ff] border-cyan-500/40 hover:border-[#00f0ff]'
              }`}
              title="Escuchar audio de la crónica"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isPlayingAudio ? 'Audio Activo' : 'Escuchar Crónica'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-[#ff6600] hover:bg-black transition-colors cursor-pointer ml-1"
              aria-label="Cerrar artículo"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Modal Scrollable Article */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-6 bg-[#050811] text-slate-200">
          
          {/* Subcategory & Urgency */}
          <div className="flex items-center gap-2 pb-2 border-b border-cyan-500/20">
            <span className="px-2.5 py-0.5 bg-black border border-cyan-500/40 text-[#00f0ff] text-[10px] font-mono font-bold uppercase tracking-widest">
              {news.subcategory || news.category}
            </span>
            {news.isUrgent && (
              <span className="px-2.5 py-0.5 bg-[#ff6600] text-black text-[10px] font-mono font-extrabold uppercase tracking-widest shadow-[0_0_10px_rgba(255,102,0,0.8)] animate-pulse">
                EDICIÓN EXTRAORDINARIA
              </span>
            )}
            <span className="text-xs text-slate-400 font-mono ml-auto">
              REF: GYE-{news.id.toUpperCase()}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-black text-white tracking-tight leading-tight">
            {news.title}
          </h1>

          {/* Subtitle / Epígrafe */}
          {news.subtitle && (
            <p className="text-base sm:text-lg text-[#00f0ff] border-l-4 border-[#ff6600] pl-4 py-1 leading-relaxed font-sans">
              {news.subtitle}
            </p>
          )}

          {/* Author Byline & Broadsheet Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-t border-b border-cyan-500/20 text-xs font-mono">
            <div className="flex items-center gap-3">
              <img
                src={news.author.avatar}
                alt={news.author.name}
                className="w-10 h-10 object-cover border border-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.4)]"
              />
              <div>
                <p className="font-bold text-white text-sm">Por {news.author.name}</p>
                <p className="text-[#ff8c33] text-[11px]">{news.author.role} • Corresponsalía Guayaquil</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>{news.date} • {news.time}</span>
              </span>
              <span className="text-cyan-500/30">|</span>
              <span className="flex items-center gap-1 text-[#00f0ff]">
                <Eye className="w-3.5 h-3.5 text-[#ff6600]" />
                <span>{news.viewsCount.toLocaleString()} lecturas</span>
              </span>
            </div>
          </div>

          {/* Main Article Image with Caption */}
          <div className="border border-cyan-500/30 bg-black p-2 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <div className="aspect-[16/9] overflow-hidden bg-black">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 text-[11px] text-slate-400 font-sans border-t border-cyan-500/20 mt-2 flex justify-between items-center">
              <span>Fotoperiodismo documental verificado para los servicios informativos de GYE TV+.</span>
              <span className="font-mono text-[10px] text-[#00f0ff]">GYE PRENSA ARCHIVO</span>
            </div>
          </div>

          {/* Audio Synthesizer Widget */}
          {isPlayingAudio && (
            <div className="p-4 bg-black text-white border-2 border-[#ff6600] shadow-[0_0_20px_rgba(255,102,0,0.4)] flex items-center justify-between gap-4 animate-in slide-in-from-top-2 font-mono">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#ff6600] text-black flex items-center justify-center font-bold">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Servicio de Locución Digital Informativa</p>
                  <p className="text-[11px] text-[#00f0ff]">Lectura automatizada en vivo • 01:15 / 03:00</p>
                </div>
              </div>
              <button
                onClick={() => setIsPlayingAudio(false)}
                className="text-xs text-[#ff6600] font-bold hover:underline cursor-pointer"
              >
                [DETENER]
              </button>
            </div>
          )}

          {/* Article Text */}
          <div className={`text-slate-200 space-y-4 font-sans ${getFontSizeClass()}`}>
            {news.content.map((paragraph, idx) => (
              <p 
                key={idx} 
                className={idx === 0 ? "drop-cap leading-relaxed text-white" : "leading-relaxed"}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* In-Feed Advertisement Banner */}
          <AdBanner config={AD_BANNERS.inFeedArticle} />

          {/* Tags */}
          <div className="pt-4 border-t border-cyan-500/20 font-mono">
            <p className="text-[11px] font-bold text-[#00f0ff] uppercase tracking-wider mb-2">
              TEMAS RELACIONADOS & DESCRIPTORES:
            </p>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-black border border-cyan-500/30 text-[#00f0ff] text-xs hover:border-[#00f0ff] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="p-4 bg-[#080d1a] border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
            <span className="text-xs font-bold text-white">
              Difundir este despacho en canales oficiales:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-black font-bold transition-colors cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                title="Compartir en WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={handleShareTwitter}
                className="p-2.5 bg-black hover:bg-slate-900 text-white border border-cyan-500/40 transition-colors cursor-pointer"
                title="Compartir en X"
              >
                <Twitter className="w-4 h-4 text-[#00f0ff]" />
              </button>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00f0ff] hover:bg-white text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.4)]"
              >
                {isCopied ? <Check className="w-4 h-4 text-black" /> : <Share2 className="w-4 h-4" />}
                <span>{isCopied ? 'Enlace copiado' : 'Copiar URL'}</span>
              </button>
            </div>
          </div>

          {/* Related News Section */}
          {relatedNews.length > 0 && (
            <div className="pt-6 border-t border-cyan-500/30">
              <div className="flex items-center gap-2 mb-4 font-mono">
                <Newspaper className="w-4 h-4 text-[#00f0ff]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  OTRAS CRÓNICAS Y COBERTURAS SUGERIDAS
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedNews.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => onSelectRelated(item)}
                    className="p-3 bg-black border border-cyan-500/20 hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="aspect-[16/10] overflow-hidden bg-black mb-2 border border-cyan-500/20">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                        />
                      </div>
                      <p className="text-[10px] font-bold text-[#ff8c33] uppercase font-mono mb-1">
                        {item.category}
                      </p>
                      <h4 className="text-xs font-headline font-bold text-white line-clamp-2 leading-snug group-hover:text-[#00f0ff]">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-2 pt-2 border-t border-cyan-500/15">
                      {item.date}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
