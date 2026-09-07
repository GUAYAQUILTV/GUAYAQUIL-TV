import React, { useState } from 'react';
import { X, Code, Tv, Share2, FileText, CheckCircle, Copy, BookOpen, Terminal, Sparkles } from 'lucide-react';

interface WebmasterGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebmasterGuideModal: React.FC<WebmasterGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const sampleNewsCode = `// En el archivo src/data/newsData.ts:
export const DEMO_NEWS: NewsItem[] = [
  {
    id: 'noticia-nueva-1',
    title: 'Titular Oficial del Despacho Noticioso',
    subtitle: 'Epígrafe o bajada explicativa con contexto...',
    category: 'Guayaquil', // 'Guayaquil' | 'Ecuador' | 'Deportes' | 'Entretenimiento' | 'Cultura' | 'Seguridad'
    image: 'https://images.unsplash.com/photo-...',
    date: '07 Sep 2026',
    time: '14:30',
    description: 'Resumen conciso para la edición digital...',
    content: [
      'Primer párrafo del cuerpo de la crónica...',
      'Segundo párrafo con declaraciones y antecedentes...'
    ],
    author: {
      name: 'Nombre del Cronista',
      role: 'Redacción GYE TV+',
      avatar: 'https://images.unsplash.com/photo-...'
    },
    readTime: '3 min',
    isFeatured: true,
    isUrgent: false,
    tags: ['Guayaquil', 'Noticias', 'Actualidad'],
    viewsCount: 1200
  }
];`;

  const sampleLiveCode = `// En el archivo src/data/newsData.ts:
export const LIVE_STREAM_CONFIG: LiveStreamConfig = {
  isLive: true,
  title: 'GYE TV+ EN VIVO | Emisión Estelar de Noticias',
  currentShow: 'Guayaquil al Día',
  presenter: 'Valeria Solís & Carlos Mendoza',
  viewersCount: 4890,
  streamSource: 'youtube', // Opciones: 'youtube' | 'custom' | 'demo'
  youtubeEmbedId: 'Tu_ID_de_YouTube_Live',
  schedule: [
    { time: '06:00 - 08:30', title: 'Amanecer Guayaco', host: 'Andrés Vera', category: 'Noticias' },
    { time: '11:00 - 13:00', title: 'Guayaquil al Día', host: 'Valeria Solís', isCurrent: true, category: 'En Vivo' }
  ]
};`;

  const sampleSocialCode = `// En el archivo src/data/newsData.ts:
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'fb',
    platform: 'Facebook',
    name: 'Facebook',
    url: 'https://facebook.com/tu-pagina-real',
    handle: '@GYETVplusOficial',
    followers: '185K seguidores',
    icon: 'Facebook',
    colorClass: 'text-blue-500',
    bgHover: 'hover:bg-blue-950/40'
  }
];`;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200 font-mono">
      
      <div className="bg-[#080d1a] max-w-3xl w-full max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.3)] overflow-hidden border-2 border-[#00f0ff] animate-in zoom-in-95 duration-200 my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-black text-white flex items-center justify-between border-b border-cyan-500/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#080d1a] border border-cyan-500/40 text-[#00f0ff]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                DOCUMENTACIÓN TÉCNICA & MANUAL DE SISTEMAS
              </span>
              <h3 className="text-base sm:text-lg font-cyber font-black text-white">
                GYE <span className="text-[#00f0ff] neon-text-cyan">TV</span><span className="text-[#ff6600] neon-text-orange">+</span> | Guía Editorial & Webmaster
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-[#ff6600] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm bg-[#050811] text-slate-300">
          
          {/* Section 1: Replace News */}
          <div className="p-4 sm:p-5 bg-black border border-cyan-500/30">
            <div className="flex items-center justify-between mb-3 border-b border-cyan-500/20 pb-2">
              <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-[#00f0ff]" />
                <span>1. Estructura de Publicación de Noticias & Crónicas</span>
              </h4>
              <button
                onClick={() => handleCopyCode(sampleNewsCode, 'news')}
                className="inline-flex items-center gap-1 text-[11px] text-[#00f0ff] hover:text-white font-bold cursor-pointer"
              >
                {copiedSection === 'news' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'news' ? '[COPIADO]' : '[COPIAR ESQUEMA]'}</span>
              </button>
            </div>
            <p className="text-slate-300 mb-3 text-xs leading-relaxed font-sans">
              Para incorporar o editar despachos informativos, modifique el archivo <code className="bg-[#080d1a] px-1.5 py-0.5 border border-cyan-500/30 text-[#00f0ff] text-[11px]">src/data/newsData.ts</code> dentro de la matriz <code className="text-[#ff8c33] font-bold">DEMO_NEWS</code> o utilice el panel de administración en vivo.
            </p>
            <pre className="p-3 bg-[#02040a] text-cyan-200 border border-cyan-500/20 overflow-x-auto text-[11px] leading-relaxed max-h-40">
              {sampleNewsCode}
            </pre>
          </div>

          {/* Section 2: YouTube Live Stream */}
          <div className="p-4 sm:p-5 bg-black border border-cyan-500/30">
            <div className="flex items-center justify-between mb-3 border-b border-cyan-500/20 pb-2">
              <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                <Tv className="w-4 h-4 text-[#ff6600]" />
                <span>2. Integración de Señal en Vivo (YouTube Live / HLS)</span>
              </h4>
              <button
                onClick={() => handleCopyCode(sampleLiveCode, 'live')}
                className="inline-flex items-center gap-1 text-[11px] text-[#ff8c33] hover:text-white font-bold cursor-pointer"
              >
                {copiedSection === 'live' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'live' ? '[COPIADO]' : '[COPIAR]'}</span>
              </button>
            </div>
            <p className="text-slate-300 mb-3 text-xs leading-relaxed font-sans">
              En <code className="bg-[#080d1a] px-1.5 py-0.5 border border-cyan-500/30 text-[#00f0ff] text-[11px]">src/data/newsData.ts</code>, configure la emisión oficial o use la pestaña de <span className="text-[#ff6600] font-bold">Transmisión En Vivo</span> en el panel del administrador.
            </p>
            <pre className="p-3 bg-[#02040a] text-orange-200 border border-cyan-500/20 overflow-x-auto text-[11px] leading-relaxed max-h-40">
              {sampleLiveCode}
            </pre>
          </div>

          {/* Section 3: Social Media Links */}
          <div className="p-4 sm:p-5 bg-black border border-cyan-500/30">
            <div className="flex items-center justify-between mb-3 border-b border-cyan-500/20 pb-2">
              <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                <Share2 className="w-4 h-4 text-[#00f0ff]" />
                <span>3. Canales de Distribución & Redes Institucionales</span>
              </h4>
              <button
                onClick={() => handleCopyCode(sampleSocialCode, 'social')}
                className="inline-flex items-center gap-1 text-[11px] text-[#00f0ff] hover:text-white font-bold cursor-pointer"
              >
                {copiedSection === 'social' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'social' ? '[COPIADO]' : '[COPIAR]'}</span>
              </button>
            </div>
            <p className="text-slate-300 mb-3 text-xs leading-relaxed font-sans">
              Ajuste los enlaces a perfiles oficiales en la constante <code className="text-[#00f0ff] font-bold">SOCIAL_LINKS</code> en <code className="bg-[#080d1a] px-1.5 py-0.5 border border-cyan-500/30 text-[#00f0ff] text-[11px]">src/data/newsData.ts</code>.
            </p>
            <pre className="p-3 bg-[#02040a] text-slate-200 border border-cyan-500/20 overflow-x-auto text-[11px] leading-relaxed max-h-32">
              {sampleSocialCode}
            </pre>
          </div>

          {/* Section 4: Operational commands */}
          <div className="p-4 bg-black text-white border-2 border-cyan-500/40">
            <h4 className="text-xs font-bold text-[#00f0ff] mb-2 uppercase tracking-wider">
              4. Comandos de Compilación & Despliegue en Servidor
            </h4>
            <div className="space-y-1 text-xs text-slate-300">
              <p>• Instalación de paquetes: <span className="text-white font-bold">npm install</span></p>
              <p>• Servidor de desarrollo: <span className="text-white font-bold">npm run dev</span></p>
              <p>• Compilación de producción: <span className="text-white font-bold">npm run build</span></p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-black border-t border-cyan-500/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#00f0ff] hover:bg-white text-black font-bold text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            Cerrar Manual
          </button>
        </div>

      </div>

    </div>
  );
};
