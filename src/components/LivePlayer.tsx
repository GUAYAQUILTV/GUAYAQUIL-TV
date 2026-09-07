import React, { useState, useRef } from 'react';
import { extractYouTubeId, extractDailymotionId, parseUniversalStream } from '../utils/streamHelpers';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Radio, 
  Users, 
  Share2, 
  Tv, 
  Settings, 
  MessageSquare, 
  Send,
  Calendar,
  ShieldCheck,
  SignalHigh,
  Zap,
  Flame,
  Sparkles,
  Trash2
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface LivePlayerProps {
  onOpenWebmasterGuide?: () => void;
  onOpenAdmin?: (tab?: 'live' | 'news' | 'alerts' | 'sports' | 'videos' | 'ads' | 'backup') => void;
}

export const LivePlayer: React.FC<LivePlayerProps> = ({ onOpenWebmasterGuide, onOpenAdmin }) => {
  const { 
    liveConfig, 
    setLiveStreamSource, 
    isAdmin, 
    syncedViewersCount, 
    activeConnectedTabs,
    liveChatMessages,
    sendLiveChatMessage,
    deleteChatMessage
  } = useData();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState('1080p HD (Studio Master)');
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'chat'>('schedule');
  const [newComment, setNewComment] = useState('');
  const [userNameInput, setUserNameInput] = useState('');

  const playerContainerRef = useRef<HTMLDivElement>(null);

  const handleToggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => {
        console.log('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const author = userNameInput.trim() || undefined;
    sendLiveChatMessage(newComment, author);
    setNewComment('');
  };

  const handleApplyStreamSource = (source: 'demo' | 'youtube' | 'custom', customVal?: string) => {
    setLiveStreamSource(source, customVal || '');
    setShowConfigDrawer(false);
  };

  return (
    <section id="en-vivo" className="py-10 bg-[#03060f] text-slate-100 border-b border-cyan-500/20 relative overflow-hidden">
      
      {/* Background Neon Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-3 border-b border-cyan-500/30 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-sans">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ff6600] text-black text-[11px] font-mono font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(255,102,0,0.7)]">
                <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
                <span>SEÑAL EN VIVO 24/7</span>
              </span>
              <span className="text-[#00f0ff] text-xs uppercase tracking-wider font-mono font-semibold">
                Estudio Central Guayaquil • {syncedViewersCount.toLocaleString('es-EC')} Espectadores Sincronizados
              </span>
            </div>

            <h2 className="font-headline text-2xl sm:text-3xl font-black text-white tracking-tight">
              GYE TV+ Canal Digital en Directo
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Difusión ininterrumpida de información, análisis, entrevistas y crónica ciudadana
            </p>
          </div>

          {/* Quick Stream Settings Button */}
          <div className="flex items-center gap-2">
            {onOpenAdmin && (
              <button
                onClick={() => onOpenAdmin('live')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#ff6600]/20 hover:bg-[#ff6600] text-[#ff8c33] hover:text-black text-xs font-mono font-bold uppercase tracking-wider border border-[#ff6600]/60 transition-all duration-200 cursor-pointer shadow-[0_0_12px_rgba(255,102,0,0.3)] hover:shadow-[0_0_20px_rgba(255,102,0,0.7)]"
                title="Administrar señal en vivo como Editor en Jefe"
              >
                <ShieldCheck className="w-4 h-4 text-[#ff6600]" />
                <span>Panel Admin En Vivo</span>
              </button>
            )}

            <button
              onClick={() => setShowConfigDrawer(!showConfigDrawer)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-slate-900 text-[#00f0ff] hover:text-white text-xs font-mono font-semibold border border-cyan-500/40 hover:border-[#00f0ff] transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
            >
              <Settings className="w-4 h-4 text-[#00f0ff]" />
              <span>Fuente Rápida</span>
            </button>
          </div>
        </div>

        {/* Webmaster Live Source Drawer */}
        {showConfigDrawer && (
          <div className="mb-6 p-5 bg-[#080d1a] border-2 border-[#00f0ff] text-xs font-mono shadow-[0_0_25px_rgba(0,240,255,0.3)] animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-[#00f0ff]" />
                <h3 className="font-extrabold text-white uppercase tracking-wider">
                  Configuración Inmediata de Señal (YouTube Live / HLS / Estudio Master)
                </h3>
              </div>
              <button
                onClick={() => setShowConfigDrawer(false)}
                className="text-[#ff6600] hover:text-white underline cursor-pointer"
              >
                Cerrar
              </button>
            </div>
            <p className="text-slate-300 mb-3 font-sans text-xs">
              Seleccione la fuente activa de transmisión. Para cambiar título, conductores y programación, abra el <strong>Panel Admin</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleApplyStreamSource('demo')}
                className={`p-3.5 border text-left cursor-pointer transition-all ${
                  liveConfig.streamSource === 'demo'
                    ? 'bg-cyan-950/80 border-[#00f0ff] text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-black border-cyan-500/20 text-slate-300 hover:border-[#00f0ff]'
                }`}
              >
                <div className="font-bold text-[#00f0ff] mb-1">1. Estudio Master GYE TV+</div>
                <div className="text-[11px] text-slate-400 font-sans">Señal gráfica interactiva de la cadena porteña</div>
              </button>

              <button
                onClick={() => {
                  const ytid = prompt('Ingrese ID o URL de YouTube Live:', liveConfig.youtubeEmbedId || 'jfKfPfyJRdk');
                  if (ytid) handleApplyStreamSource('youtube', ytid);
                }}
                className={`p-3.5 border text-left cursor-pointer transition-all ${
                  liveConfig.streamSource === 'youtube'
                    ? 'bg-orange-950/80 border-[#ff6600] text-white shadow-[0_0_15px_rgba(255,102,0,0.4)]'
                    : 'bg-black border-cyan-500/20 text-slate-300 hover:border-[#ff6600]'
                }`}
              >
                <div className="font-bold text-[#ff8c33] mb-1">2. YouTube Live Oficial</div>
                <div className="text-[11px] text-slate-400 font-sans">Transmisión sincronizada de YouTube</div>
              </button>

              <button
                onClick={() => {
                  const url = prompt('Ingrese URL directa HLS / MP4 (.m3u8):', liveConfig.customStreamUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
                  if (url) handleApplyStreamSource('custom', url);
                }}
                className={`p-3.5 border text-left cursor-pointer transition-all ${
                  liveConfig.streamSource === 'custom'
                    ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                    : 'bg-black border-cyan-500/20 text-slate-300 hover:border-emerald-400'
                }`}
              >
                <div className="font-bold text-emerald-400 mb-1">3. Servidor Privado HLS / MP4</div>
                <div className="text-[11px] text-slate-400 font-sans">Flujo de video directo de baja latencia</div>
              </button>
            </div>
          </div>
        )}

        {/* Main Grid: Broadcast Screen (8 cols) + Console Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Broadcast Screen */}
          <div className="lg:col-span-8 flex flex-col">
            
            {/* The Video Screen Box */}
            <div 
              ref={playerContainerRef}
              className="relative aspect-video bg-black border-2 border-cyan-500/30 hover:border-[#00f0ff] flex flex-col justify-between group select-none shadow-[0_0_30px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300"
            >
              {/* Player Top HUD Overlay */}
              <div className="relative z-10 p-3 bg-gradient-to-b from-black/95 via-black/60 to-transparent flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <div className={`flex items-center gap-1.5 px-2.5 py-0.5 text-black font-extrabold uppercase text-[10px] tracking-wider ${
                    liveConfig.isLive ? 'bg-[#ff6600] shadow-[0_0_12px_rgba(255,102,0,0.8)]' : 'bg-slate-700 text-white'
                  }`}>
                    <span className={`w-2 h-2 rounded-full bg-black ${liveConfig.isLive ? 'animate-ping' : ''}`}></span>
                    <span>{liveConfig.isLive ? 'AL AIRE' : 'PAUSADO'}</span>
                  </div>
                  
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-black text-[#00f0ff] font-bold border border-cyan-500/40 text-[10px]">
                    1080p 60FPS
                  </span>

                  <span className="font-bold text-white truncate max-w-xs text-[11px]">
                    GYE TV+ Cadena Digital
                  </span>
                </div>

                {/* Real-time Synchronized Spectators Counter */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-black/90 text-[#00f0ff] border border-cyan-500/40 text-[11px] font-mono shadow-[0_0_8px_rgba(0,240,255,0.2)]">
                    <Users className="w-3.5 h-3.5 text-[#ff6600]" />
                    <span>{syncedViewersCount.toLocaleString('es-EC')} espectadores</span>
                    <span className="text-emerald-400 text-[9px] font-bold">● SYNC</span>
                  </div>
                </div>
              </div>

              {/* Video Content */}
              <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
                {!liveConfig.isLive ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#050811] p-6 text-center">
                    <div className="w-16 h-16 bg-black border-2 border-cyan-500/40 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                      <Tv className="w-8 h-8 text-[#00f0ff]" />
                    </div>
                    <span className="px-3 py-1 bg-black text-[#ff8c33] border border-[#ff6600]/40 font-mono text-xs uppercase tracking-widest mb-2 shadow-[0_0_10px_rgba(255,102,0,0.3)]">
                      SEÑAL FUERA DEL AIRE • PRÓXIMA EMISIÓN
                    </span>
                    <h4 className="font-headline text-lg text-white font-bold max-w-md">
                      {liveConfig.currentShow || 'Espacio informativo de GYE TV+'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Conducción: {liveConfig.presenter}
                    </p>
                    {onOpenAdmin && (
                      <button
                        onClick={() => onOpenAdmin('live')}
                        className="mt-4 px-5 py-2 bg-[#ff6600] hover:bg-[#ff7700] text-black text-xs font-mono font-black uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(255,102,0,0.6)]"
                      >
                        Reactivar Señal En Vivo (Admin)
                      </button>
                    )}
                  </div>
                ) : liveConfig.streamSource === 'youtube' ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(liveConfig.youtubeEmbedId)}?autoplay=1&mute=${isMuted ? 1 : 0}&enablejsapi=1`}
                    title="GYE TV+ Transmisión Oficial YouTube"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : liveConfig.streamSource === 'dailymotion' ? (
                  <iframe
                    src={`https://www.dailymotion.com/embed/video/${extractDailymotionId(liveConfig.dailymotionEmbedId || '')}?autoplay=1&mute=${isMuted ? 1 : 0}`}
                    title="GYE TV+ Transmisión Oficial Dailymotion"
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : liveConfig.streamSource === 'image' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={liveConfig.customImageUrl || 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1400&q=85'}
                      alt="GYE TV+ En Vivo Imagen"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-black/40 to-transparent"></div>
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-black/90 px-3 py-1 border border-purple-500/50 shadow-[0_0_12px_rgba(192,132,252,0.4)]">
                      <Tv className="w-4 h-4 text-purple-400" />
                      <span className="font-cyber font-extrabold text-xs tracking-wider text-white">
                        FOTO <span className="text-purple-400">EN DIRECTO</span>
                      </span>
                    </div>
                    <div className="absolute bottom-12 left-4 right-4 z-10 hidden sm:flex flex-col">
                      <div className="inline-flex items-center gap-1.5 self-start px-3 py-0.5 bg-purple-600 text-white font-mono font-extrabold text-[10px] uppercase tracking-wider shadow-[0_0_10px_rgba(192,132,252,0.6)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                        <span>TRANSMISIÓN ESPECIAL EN FOTO • GYE TV+</span>
                      </div>
                      <div className="p-3 bg-black/90 border-l-4 border-purple-400 border-y border-r border-purple-500/30 text-white shadow-[0_0_20px_rgba(192,132,252,0.2)] flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-widest">
                            {liveConfig.currentShow}
                          </p>
                          <p className="font-headline text-base font-extrabold text-white">
                            {liveConfig.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : liveConfig.streamSource === 'custom' && liveConfig.customStreamUrl ? (() => {
                  const parsed = parseUniversalStream(liveConfig.customStreamUrl);
                  if (parsed.type === 'youtube') {
                    return (
                      <iframe
                        src={`https://www.youtube.com/embed/${parsed.src}?autoplay=1&mute=${isMuted ? 1 : 0}&enablejsapi=1`}
                        title="GYE TV+ Custom YouTube"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    );
                  } else if (parsed.type === 'dailymotion') {
                    return (
                      <iframe
                        src={`https://www.dailymotion.com/embed/video/${parsed.src}?autoplay=1&mute=${isMuted ? 1 : 0}`}
                        title="GYE TV+ Custom Dailymotion"
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  } else if (parsed.type === 'iframe') {
                    return (
                      <iframe
                        src={parsed.src}
                        title="GYE TV+ Custom Embed"
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  } else if (parsed.type === 'image') {
                    return (
                      <div className="relative w-full h-full">
                        <img src={parsed.src} alt="GYE TV+ Custom Stream" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-black/30 to-transparent"></div>
                      </div>
                    );
                  } else {
                    return (
                      <video
                        src={parsed.src}
                        autoPlay
                        muted={isMuted}
                        controls={false}
                        className="w-full h-full object-cover"
                      />
                    );
                  }
                })() : (
                  <div className="relative w-full h-full">
                    <img
                      src="https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1400&q=85"
                      alt="GYE TV+ Estudio Central Guayaquil"
                      className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-90' : 'opacity-40'}`}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent"></div>

                    {/* Neon Digital TV Watermark */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-black/90 px-3 py-1 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                      <Tv className="w-4 h-4 text-[#00f0ff]" />
                      <span className="font-cyber font-extrabold text-xs tracking-wider text-white">
                        GYE <span className="text-[#00f0ff] neon-text-cyan">TV</span><span className="text-[#ff6600] neon-text-orange">+</span>
                      </span>
                    </div>

                    {/* Lower Third (Zócalo Periodístico Neón) */}
                    <div className="absolute bottom-12 left-4 right-4 z-10 hidden sm:flex flex-col">
                      <div className="inline-flex items-center gap-1.5 self-start px-3 py-0.5 bg-[#ff6600] text-black font-mono font-extrabold text-[10px] uppercase tracking-wider shadow-[0_0_10px_rgba(255,102,0,0.6)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
                        <span>INFORMACIÓN EN DIRECTO • GUAYAQUIL</span>
                      </div>
                      <div className="p-3 bg-black/90 border-l-4 border-[#00f0ff] border-y border-r border-cyan-500/30 text-white shadow-[0_0_20px_rgba(0,240,255,0.2)] flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-mono font-bold text-[#00f0ff] uppercase tracking-widest">
                            {liveConfig.currentShow}
                          </p>
                          <p className="font-headline text-base font-extrabold text-white">
                            {liveConfig.title}
                          </p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 pl-4 text-[10px] text-[#00f0ff] border-l border-cyan-500/30 font-mono">
                          <SignalHigh className="w-4 h-4 text-[#00f0ff]" />
                          <span>SEÑAL DIGITAL 100%</span>
                        </div>
                      </div>
                    </div>

                    {/* Paused Overlay */}
                    {!isPlaying && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 z-20">
                        <button
                          onClick={() => setIsPlaying(true)}
                          className="w-16 h-16 bg-[#ff6600] hover:bg-[#ff7700] text-black flex items-center justify-center transition-all shadow-[0_0_25px_rgba(255,102,0,0.8)] cursor-pointer"
                        >
                          <Play className="w-8 h-8 fill-black ml-1" />
                        </button>
                        <p className="text-xs font-mono text-[#00f0ff] mt-3">
                          Señal pausada • Clic para reanudar emisión
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Player Control Bar */}
              <div className="relative z-10 p-2.5 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex items-center justify-between text-xs font-mono border-t border-cyan-500/20">
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-slate-900 hover:bg-[#00f0ff] hover:text-black border border-cyan-500/40 text-white transition-all cursor-pointer"
                    title={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 bg-slate-900 hover:bg-[#00f0ff] hover:text-black border border-cyan-500/40 text-white transition-all cursor-pointer"
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#ff6600]" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  <div className="hidden sm:flex items-center gap-1.5 text-cyan-300 text-[10px] pl-2">
                    <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping"></span>
                    <span>Latencia: 0.3s • Sincronización Automática</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="bg-black border border-cyan-500/40 text-[#00f0ff] text-[10px] px-2.5 py-1.5 cursor-pointer focus:outline-none focus:border-[#00f0ff]"
                  >
                    <option value="1080p HD (Studio Master)">1080p HD Master</option>
                    <option value="720p">720p HD</option>
                    <option value="480p">480p SD</option>
                    <option value="Audio Only">Solo Audio</option>
                  </select>

                  <button
                    onClick={handleToggleFullscreen}
                    className="p-2 bg-slate-900 hover:bg-[#00f0ff] hover:text-black border border-cyan-500/40 text-white transition-all cursor-pointer"
                    title="Pantalla completa"
                  >
                    <Maximize className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Below Video Description Bar */}
            <div className="mt-3 p-4 bg-[#080d1a] border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-[#00f0ff] font-mono font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#ff6600] animate-pulse"></span>
                  <span>TRANSMISIÓN EN VIVO DESDE GUAYAQUIL</span>
                </div>
                <h3 className="font-headline text-base font-bold text-white mt-1">
                  {liveConfig.title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Conducción: <strong className="text-[#00f0ff]">{liveConfig.presenter}</strong> • Redacción y Producción Ejecutiva GYE TV+
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Enlace de transmisión copiado al portapapeles.');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#00f0ff] hover:bg-white text-black text-xs font-mono font-extrabold uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(0,240,255,0.5)] cursor-pointer shrink-0"
              >
                <Share2 className="w-3.5 h-3.5 text-black" />
                <span>Compartir Señal</span>
              </button>
            </div>

          </div>

          {/* Right: Broadcast Schedule & Live Synchronized Chat */}
          <div className="lg:col-span-4 bg-[#080d1a] border border-cyan-500/30 flex flex-col h-full min-h-[460px] font-sans">
            
            {/* Tab Header */}
            <div className="flex border-b border-cyan-500/25 bg-black">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`flex-1 py-3 text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'schedule'
                    ? 'text-black bg-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.6)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Parrilla ({liveConfig.schedule.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'chat'
                    ? 'text-black bg-[#ff6600] shadow-[0_0_15px_rgba(255,102,0,0.6)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat en Vivo ({liveChatMessages.length})</span>
              </button>
            </div>

            {/* Tab 1: Schedule */}
            {activeTab === 'schedule' && (
              <div className="p-4 flex-1 overflow-y-auto space-y-3 max-h-[420px]">
                <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 text-[11px] font-mono">
                  <span className="font-bold text-[#00f0ff] uppercase tracking-wider">
                    HORARIO DE EMISIÓN
                  </span>
                  <span className="text-[#ff8c33]">
                    Ecuador (GMT-5)
                  </span>
                </div>

                {liveConfig.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 border transition-all ${
                      item.isCurrent
                        ? 'bg-cyan-950/40 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                        : 'bg-black/60 border-cyan-500/15 hover:border-cyan-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-bold text-[#00f0ff] font-mono">
                        {item.time}
                      </span>
                      {item.isCurrent ? (
                        <span className="px-2 py-0.5 bg-[#ff6600] text-black font-extrabold text-[9px] font-mono uppercase tracking-wider shadow-[0_0_10px_rgba(255,102,0,0.7)]">
                          AL AIRE
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 uppercase font-mono">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <h4 className="font-headline text-xs sm:text-sm font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Conducción: {item.host}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Synchronized Interactive Chat */}
            {activeTab === 'chat' && (
              <div className="flex flex-col flex-1 h-full min-h-[400px] justify-between">
                
                <div className="p-4 flex-1 overflow-y-auto space-y-3 max-h-[320px]">
                  <div className="text-[11px] text-[#00f0ff] bg-black p-2.5 border border-cyan-500/30 text-center font-mono flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Chat sincronizado en directo con todos los espectadores.</span>
                  </div>

                  {liveChatMessages.map(msg => (
                    <div 
                      key={msg.id} 
                      className={`p-3 border text-xs relative group ${
                        msg.isAdmin 
                          ? 'bg-[#181104] border-[#ff6600]/60 shadow-[0_0_10px_rgba(255,102,0,0.2)]' 
                          : 'bg-black/80 border-cyan-500/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-bold ${msg.isAdmin ? 'text-[#ff8c33]' : 'text-white'}`}>
                            {msg.user}
                          </span>
                          {msg.isAdmin && (
                            <span className="px-1.5 py-0.2 bg-[#ff6600] text-black font-extrabold text-[8px] font-mono uppercase">
                              OFICIAL
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#00f0ff] font-mono">{msg.time}</span>
                      </div>
                      <p className="text-slate-300">{msg.text}</p>

                      {isAdmin && (
                        <button
                          onClick={() => deleteChatMessage(msg.id)}
                          className="absolute top-2 right-2 text-red-400 hover:text-red-300 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Eliminar mensaje (Admin)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendComment} className="p-3 border-t border-cyan-500/20 bg-black flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userNameInput}
                      onChange={(e) => setUserNameInput(e.target.value)}
                      placeholder={isAdmin ? "Director (guayaquiltv)" : "Tu nombre o sector..."}
                      className="w-1/3 bg-slate-900 border border-cyan-500/30 text-white text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#00f0ff] placeholder:text-slate-500"
                    />
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Escribir en directo..."
                      className="flex-1 bg-slate-900 border border-cyan-500/30 text-white text-xs px-3 py-1.5 focus:outline-none focus:border-[#00f0ff] placeholder:text-slate-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#00f0ff] hover:bg-white text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.4)] flex items-center justify-center"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
