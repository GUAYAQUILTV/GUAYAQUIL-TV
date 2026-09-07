import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  MessageCircle, 
  Video, 
  Share2, 
  ArrowUpRight,
  Radio,
  Sparkles
} from 'lucide-react';
import { SOCIAL_LINKS } from '../data/newsData';

export const SocialSection: React.FC = () => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return <Facebook className="w-5 h-5 text-[#00f0ff]" />;
      case 'Instagram':
        return <Instagram className="w-5 h-5 text-[#ff6600]" />;
      case 'TikTok':
        return <Video className="w-5 h-5 text-[#00f0ff]" />;
      case 'YouTube':
        return <Youtube className="w-5 h-5 text-[#ff6600]" />;
      case 'X':
        return <Twitter className="w-5 h-5 text-white" />;
      case 'WhatsApp':
        return <MessageCircle className="w-5 h-5 text-emerald-400" />;
      default:
        return <Share2 className="w-5 h-5 text-[#00f0ff]" />;
    }
  };

  return (
    <section className="py-14 bg-[#080d1a] border-b-2 border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-2 font-mono">
            <Radio className="w-4 h-4 text-[#00f0ff]" />
            <span className="px-2.5 py-0.5 bg-black border border-cyan-500/40 text-[#00f0ff] text-[10px] font-bold uppercase tracking-widest">
              RED DE DIFUSIÓN MULTIPLATAFORMA
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-cyber font-black text-white tracking-tight">
            CANALES OFICIALES DE GYE <span className="text-[#00f0ff] neon-text-cyan">TV</span><span className="text-[#ff6600] neon-text-orange">+</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
            Siga nuestras transmisiones y coberturas de última hora en las plataformas digitales certificadas.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-black border border-cyan-500/30 hover:border-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-200 flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 bg-[#050811] border border-cyan-500/40 flex items-center justify-center mb-3 group-hover:bg-[#00f0ff] group-hover:text-black group-hover:border-white transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                {getSocialIcon(item.platform)}
              </div>

              {/* Platform Title */}
              <h3 className="text-xs font-headline font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                {item.name}
              </h3>

              {/* Handle */}
              <p className="text-[10px] font-mono text-slate-400 truncate max-w-[120px] mt-0.5">
                {item.handle}
              </p>

              {/* Followers count pill */}
              <span className="mt-2.5 px-2 py-0.5 bg-[#080d1a] border border-cyan-500/20 text-[10px] font-mono font-bold text-[#00f0ff]">
                {item.followers}
              </span>

              <div className="mt-3 flex items-center gap-0.5 text-[10px] font-mono font-bold text-[#ff8c33] group-hover:text-white transition-colors">
                <span>Suscribirse</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
