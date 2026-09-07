import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  Tv, 
  Newspaper, 
  Radio, 
  Trophy, 
  Film, 
  Megaphone, 
  Sparkles, 
  Check, 
  AlertTriangle, 
  Trash2, 
  Edit3, 
  Plus, 
  RefreshCw, 
  Download, 
  Upload, 
  X, 
  Eye, 
  Flame, 
  Zap, 
  Star,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Layers,
  Clock,
  User,
  Image as ImageIcon
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { CategoryType, NewsItem, LiveScheduleItem, SportsScore, VideoItem } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'live' | 'news' | 'alerts' | 'sports' | 'videos' | 'ads' | 'backup';
}

const CATEGORIES: CategoryType[] = [
  'Guayaquil',
  'Seguridad',
  'Deportes',
  'Ecuador',
  'Entretenimiento',
  'Cultura'
];

const PRESET_IMAGES = [
  { label: 'Guayaquil Malecón 2000', url: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Seguridad / Patrullaje', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Fútbol / Deportes Guayaquil', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Cultura / Las Peñas', url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Movilidad / Tránsito Urbano', url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Economía / Cacao & Puerto', url: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Espectáculos & Música', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Selección Ecuador La Tri', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80' }
];

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, initialTab = 'live' }) => {
  const {
    newsList,
    liveConfig,
    videos,
    sportsScores,
    adBanners,
    breakingAlerts,
    isAdmin,
    adminUser,
    lastSyncTime,

    loginAdmin,
    logoutAdmin,

    updateLiveConfig,
    setLiveStreamActive,
    setLiveStreamSource,

    addNews,
    updateNews,
    deleteNews,
    toggleNewsFeature,
    toggleNewsUrgent,
    toggleNewsBreaking,

    addVideo,
    updateVideo,
    deleteVideo,

    updateSportsScore,
    addSportsScore,
    deleteSportsScore,

    updateAdBanner,

    addBreakingAlert,
    toggleBreakingAlert,
    deleteBreakingAlert,

    resetToDefaults,
    exportDataJSON,
    importDataJSON
  } = useData();

  // Login Form States
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccessNotice, setLoginSuccessNotice] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'live' | 'news' | 'alerts' | 'sports' | 'videos' | 'ads' | 'backup'>(initialTab);

  // News Editor State
  const [editingNewsItem, setEditingNewsItem] = useState<NewsItem | null>(null);
  const [isCreatingNews, setIsCreatingNews] = useState(false);
  const [newsFilterCat, setNewsFilterCat] = useState<string>('Todas');
  const [newsSearchTerm, setNewsSearchTerm] = useState('');

  // New Alert Input
  const [newAlertText, setNewAlertText] = useState('');
  const [newAlertCategory, setNewAlertCategory] = useState('Urgente');

  // Live Stream Form State
  const [liveForm, setLiveForm] = useState({
    title: liveConfig.title,
    currentShow: liveConfig.currentShow,
    presenter: liveConfig.presenter,
    streamSource: liveConfig.streamSource,
    youtubeEmbedId: liveConfig.youtubeEmbedId,
    dailymotionEmbedId: liveConfig.dailymotionEmbedId || '',
    customImageUrl: liveConfig.customImageUrl || PRESET_IMAGES[0].url,
    customStreamUrl: liveConfig.customStreamUrl || '',
    viewersCount: liveConfig.viewersCount,
    isLive: liveConfig.isLive
  });

  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Sync state with liveConfig when opened
  React.useEffect(() => {
    setLiveForm({
      title: liveConfig.title,
      currentShow: liveConfig.currentShow,
      presenter: liveConfig.presenter,
      streamSource: liveConfig.streamSource,
      youtubeEmbedId: liveConfig.youtubeEmbedId,
      dailymotionEmbedId: liveConfig.dailymotionEmbedId || '',
      customImageUrl: liveConfig.customImageUrl || PRESET_IMAGES[0].url,
      customStreamUrl: liveConfig.customStreamUrl || '',
      viewersCount: liveConfig.viewersCount,
      isLive: liveConfig.isLive
    });
  }, [liveConfig]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const result = loginAdmin(usernameInput, passwordInput);
    if (result.success) {
      setLoginSuccessNotice(result.message);
      setTimeout(() => setLoginSuccessNotice(''), 3000);
    } else {
      setLoginError(result.message);
    }
  };

  const handleSaveLiveStream = (e: React.FormEvent) => {
    e.preventDefault();
    updateLiveConfig({
      title: liveForm.title,
      currentShow: liveForm.currentShow,
      presenter: liveForm.presenter,
      streamSource: liveForm.streamSource,
      youtubeEmbedId: liveForm.youtubeEmbedId,
      dailymotionEmbedId: liveForm.dailymotionEmbedId,
      customImageUrl: liveForm.customImageUrl,
      customStreamUrl: liveForm.customStreamUrl,
      viewersCount: Number(liveForm.viewersCount) || 4800,
      isLive: liveForm.isLive
    });
    setSaveSuccessMsg('¡Transmisión en vivo actualizada y sincronizada en tiempo real!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleCreateOrUpdateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNewsItem) return;

    if (isCreatingNews) {
      addNews(editingNewsItem);
    } else {
      updateNews(editingNewsItem.id, editingNewsItem);
    }

    setEditingNewsItem(null);
    setIsCreatingNews(false);
    setSaveSuccessMsg('¡Noticia guardada y publicada en portada!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleStartNewArticle = () => {
    const freshArticle: NewsItem = {
      id: `noticia-${Date.now()}`,
      title: '',
      subtitle: '',
      category: 'Guayaquil',
      subcategory: 'Actualidad',
      image: PRESET_IMAGES[0].url,
      date: new Date().toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' }),
      description: '',
      content: [''],
      author: {
        name: adminUser?.name || 'Carlos Mendoza',
        role: 'Redacción GYE TV+',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      },
      readTime: '3 min',
      isFeatured: false,
      isUrgent: false,
      isBreaking: false,
      tags: ['Guayaquil', 'GYE TV+'],
      viewsCount: 120,
      source: 'GYE TV+ Digital'
    };
    setEditingNewsItem(freshArticle);
    setIsCreatingNews(true);
  };

  const handleDownloadBackup = () => {
    const dataStr = exportDataJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gyetv_respaldo_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importDataJSON(content);
        if (ok) {
          alert('¡Respaldo importado y sincronizado con éxito!');
        } else {
          alert('Error al leer el archivo JSON de respaldo.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto font-mono">
      <div className="relative w-full max-w-5xl bg-[#080d1a] border-2 border-[#00f0ff] shadow-[0_0_50px_rgba(0,240,255,0.35)] text-slate-200 my-auto max-h-[94vh] flex flex-col">
        
        {/* Master Header */}
        <div className="bg-black text-white p-4 border-b border-cyan-500/40 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ff6600]/20 border border-[#ff6600] flex items-center justify-center text-[#ff6600] font-bold shadow-[0_0_15px_rgba(255,102,0,0.5)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-cyber font-black tracking-wider uppercase">
                  PANEL MATRIZ • GYE <span className="text-[#00f0ff] neon-text-cyan">TV</span><span className="text-[#ff6600] neon-text-orange">+</span>
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-black border border-cyan-500/60 text-[#00f0ff] text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
                  SYNC EN TIEMPO REAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                {isAdmin ? (
                  <>Sesión activa: <strong className="text-[#00f0ff]">{adminUser?.username}</strong> ({adminUser?.role})</>
                ) : (
                  'Acceso exclusivo para directores, editores y operadores técnicos de emisión.'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 bg-black hover:bg-[#ff6600] text-[#ff6600] hover:text-black border border-[#ff6600]/60 text-xs font-bold cursor-pointer transition-all"
              >
                Cerrar Sesión
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-[#ff6600] transition-colors cursor-pointer"
              title="Cerrar panel"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Notice Banners */}
        {saveSuccessMsg && (
          <div className="bg-[#00f0ff]/10 border-b border-[#00f0ff]/50 text-[#00f0ff] px-4 py-2.5 text-xs flex items-center gap-2 font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Check className="w-4 h-4 text-[#00f0ff]" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* If NOT authenticated -> Show Formal Login Form */}
        {!isAdmin ? (
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center max-w-md mx-auto my-6 bg-[#050811] border border-cyan-500/30 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <div className="w-14 h-14 bg-black text-[#00f0ff] border-2 border-[#00f0ff] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,240,255,0.5)]">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-headline font-bold text-center text-white mb-1">
              Acceso a la Mesa de Redacción & Emisión
            </h3>
            <p className="text-xs text-slate-400 text-center mb-6 font-sans">
              Ingrese las credenciales del Director General para administrar la señal en vivo, artículos y configuración.
            </p>

            {loginError && (
              <div className="w-full mb-4 p-3 bg-red-950/60 border border-red-500 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {loginSuccessNotice && (
              <div className="w-full mb-4 p-3 bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00f0ff] shrink-0" />
                <span>{loginSuccessNotice}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Usuario Administrador
                </label>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Ingrese su usuario..."
                  className="w-full px-3.5 py-2.5 bg-black border border-cyan-500/40 text-sm text-white focus:border-[#00f0ff] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Contraseña de Seguridad
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-black border border-cyan-500/40 text-sm text-white focus:border-[#00f0ff] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#00f0ff] hover:bg-white text-black font-extrabold text-xs uppercase tracking-widest cursor-pointer transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                Autenticar & Abrir Consola
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#050811]">
            
            {/* Top Navigation Tabs */}
            <div className="bg-black border-b border-cyan-500/30 px-4 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-bold">
              <button
                onClick={() => { setActiveTab('live'); setEditingNewsItem(null); }}
                className={`px-3.5 py-2 flex items-center gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'live'
                    ? 'bg-[#ff6600] text-black border-[#ff6600] shadow-[0_0_12px_rgba(255,102,0,0.6)]'
                    : 'bg-[#080d1a] text-[#ff8c33] border-[#ff6600]/40 hover:bg-[#ff6600]/10'
                }`}
              >
                <Tv className="w-4 h-4" />
                <span>1. Transmisión En Vivo</span>
              </button>

              <button
                onClick={() => { setActiveTab('news'); setEditingNewsItem(null); }}
                className={`px-3.5 py-2 flex items-center gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'news'
                    ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                    : 'bg-[#080d1a] text-[#00f0ff] border-cyan-500/40 hover:bg-cyan-950/40'
                }`}
              >
                <Newspaper className="w-4 h-4" />
                <span>2. Noticias & Redacción ({newsList.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('alerts'); setEditingNewsItem(null); }}
                className={`px-3.5 py-2 flex items-center gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'alerts'
                    ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                    : 'bg-[#080d1a] text-slate-300 border-cyan-500/30 hover:bg-cyan-950/40'
                }`}
              >
                <Zap className="w-4 h-4 text-[#ff6600]" />
                <span>3. Cintillo Última Hora</span>
              </button>

              <button
                onClick={() => { setActiveTab('sports'); setEditingNewsItem(null); }}
                className={`px-3.5 py-2 flex items-center gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'sports'
                    ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                    : 'bg-[#080d1a] text-slate-300 border-cyan-500/30 hover:bg-cyan-950/40'
                }`}
              >
                <Trophy className="w-4 h-4 text-[#00f0ff]" />
                <span>4. Marcadores Deportivos</span>
              </button>

              <button
                onClick={() => { setActiveTab('videos'); setEditingNewsItem(null); }}
                className={`px-3.5 py-2 flex items-center gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'videos'
                    ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                    : 'bg-[#080d1a] text-slate-300 border-cyan-500/30 hover:bg-cyan-950/40'
                }`}
              >
                <Film className="w-4 h-4 text-[#ff8c33]" />
                <span>5. Videos ({videos.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('ads'); setEditingNewsItem(null); }}
                className={`px-3.5 py-2 flex items-center gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'ads'
                    ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                    : 'bg-[#080d1a] text-slate-300 border-cyan-500/30 hover:bg-cyan-950/40'
                }`}
              >
                <Megaphone className="w-4 h-4 text-[#00f0ff]" />
                <span>6. Pauta & Banners</span>
              </button>

              <button
                onClick={() => { setActiveTab('backup'); setEditingNewsItem(null); }}
                className={`px-3.5 py-2 flex items-center gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'backup'
                    ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                    : 'bg-[#080d1a] text-slate-300 border-cyan-500/30 hover:bg-cyan-950/40'
                }`}
              >
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                <span>7. Respaldo / Fábrica</span>
              </button>
            </div>

            {/* TAB CONTENT CONTAINER */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-slate-200">
              
              {/* ========================================================================= */}
              {/* TAB 1: LIVE STREAM MANAGEMENT */}
              {/* ========================================================================= */}
              {activeTab === 'live' && (
                <div className="space-y-6">
                  <div className="border-b border-cyan-500/30 pb-3 flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-lg font-cyber font-black text-white">
                        Control Master de Transmisión En Vivo (GYE TV+ EN VIVO)
                      </h3>
                      <p className="text-xs text-slate-400 font-sans">
                        Cambie la fuente de video (YouTube Live, HLS directo, demo), active/pause la emisión y configure el programa en tiempo real.
                      </p>
                    </div>

                    {/* Current Live Status Pill */}
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider border ${
                        liveForm.isLive 
                          ? 'bg-[#ff6600] text-black border-[#ff6600] shadow-[0_0_15px_rgba(255,102,0,0.8)] animate-pulse' 
                          : 'bg-black text-slate-400 border-slate-700'
                      }`}>
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                        <span>{liveForm.isLive ? 'AL AIRE (EN VIVO)' : 'FUERA DEL AIRE'}</span>
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSaveLiveStream} className="space-y-5">
                    
                    {/* Live Switch & Fast Settings */}
                    <div className="p-4 bg-black border border-cyan-500/30 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                          Estado de la Señal
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setLiveForm(prev => ({ ...prev, isLive: true }))}
                            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                              liveForm.isLive 
                                ? 'bg-[#ff6600] text-black border-[#ff6600] shadow-[0_0_12px_rgba(255,102,0,0.6)]' 
                                : 'bg-[#080d1a] text-slate-400 border-cyan-500/30 hover:text-white'
                            }`}
                          >
                            🔴 Emitir En Vivo
                          </button>
                          <button
                            type="button"
                            onClick={() => setLiveForm(prev => ({ ...prev, isLive: false }))}
                            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                              !liveForm.isLive 
                                ? 'bg-slate-800 text-white border-slate-600' 
                                : 'bg-[#080d1a] text-slate-400 border-cyan-500/30 hover:text-white'
                            }`}
                          >
                            ⚫ Pausar Transmisión
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                          Audiencia Simulada (Espectadores Conectados)
                        </label>
                        <input
                          type="number"
                          value={liveForm.viewersCount}
                          onChange={(e) => setLiveForm(prev => ({ ...prev, viewersCount: Number(e.target.value) }))}
                          className="w-full px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-sm text-[#00f0ff] focus:outline-none focus:border-[#00f0ff]"
                          placeholder="4800"
                        />
                      </div>
                    </div>

                    {/* Stream Source Selector */}
                    <div className="p-4 bg-black border border-cyan-500/30 space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#00f0ff]">
                        Origen del Flujo de Video (Stream Source)
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <label className={`p-3 border cursor-pointer transition-all flex flex-col ${
                          liveForm.streamSource === 'demo' ? 'bg-[#080d1a] border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.3)]' : 'bg-black border-cyan-500/20 hover:border-cyan-500/50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <input
                              type="radio"
                              name="streamSource"
                              checked={liveForm.streamSource === 'demo'}
                              onChange={() => setLiveForm(prev => ({ ...prev, streamSource: 'demo' }))}
                            />
                            <span className="font-bold text-xs text-white">1. Estudio Master GYE</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-sans">
                            Señal simulada con placa oficial y zócalo animado de noticias.
                          </span>
                        </label>

                        <label className={`p-3 border cursor-pointer transition-all flex flex-col ${
                          liveForm.streamSource === 'youtube' ? 'bg-[#080d1a] border-[#ff6600] shadow-[0_0_12px_rgba(255,102,0,0.3)]' : 'bg-black border-cyan-500/20 hover:border-cyan-500/50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <input
                              type="radio"
                              name="streamSource"
                              checked={liveForm.streamSource === 'youtube'}
                              onChange={() => setLiveForm(prev => ({ ...prev, streamSource: 'youtube' }))}
                            />
                            <span className="font-bold text-xs text-[#ff8c33]">2. YouTube Live</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-sans">
                            Canal en directo de YouTube (ID o URL de video).
                          </span>
                        </label>

                        <label className={`p-3 border cursor-pointer transition-all flex flex-col ${
                          liveForm.streamSource === 'custom' ? 'bg-[#080d1a] border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)]' : 'bg-black border-cyan-500/20 hover:border-cyan-500/50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <input
                              type="radio"
                              name="streamSource"
                              checked={liveForm.streamSource === 'custom'}
                              onChange={() => setLiveForm(prev => ({ ...prev, streamSource: 'custom' }))}
                            />
                            <span className="font-bold text-xs text-emerald-300">3. URL HLS / MP4 Directo</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-sans">
                            Flujo RTMP/HLS (.m3u8 o .mp4) desde servidor.
                          </span>
                        </label>
                      </div>

                      {/* YouTube Live Input */}
                      {liveForm.streamSource === 'youtube' && (
                        <div className="pt-3 border-t border-cyan-500/20">
                          <label className="block text-xs font-bold text-[#ff8c33] mb-1">
                            ID o Enlace Completo de YouTube Live:
                          </label>
                          <input
                            type="text"
                            value={liveForm.youtubeEmbedId}
                            onChange={(e) => {
                              let val = e.target.value;
                              const ytMatch = val.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
                              if (ytMatch && ytMatch[1]) {
                                val = ytMatch[1];
                              }
                              setLiveForm(prev => ({ ...prev, youtubeEmbedId: val }));
                            }}
                            placeholder="Ej: jfKfPfyJRdk o https://www.youtube.com/watch?v=..."
                            className="w-full px-3 py-2 bg-[#080d1a] border border-[#ff6600]/60 text-sm text-white focus:outline-none focus:border-[#ff6600]"
                          />
                          <p className="text-[11px] text-slate-400 mt-1 font-sans">
                            Tip: Al pegar un enlace de YouTube, se extrae automáticamente el ID del stream.
                          </p>
                        </div>
                      )}

                      {/* Custom URL Input */}
                      {liveForm.streamSource === 'custom' && (
                        <div className="pt-3 border-t border-cyan-500/20">
                          <label className="block text-xs font-bold text-emerald-400 mb-1">
                            URL directa de transmisión (.m3u8 / .mp4):
                          </label>
                          <input
                            type="text"
                            value={liveForm.customStreamUrl}
                            onChange={(e) => setLiveForm(prev => ({ ...prev, customStreamUrl: e.target.value }))}
                            placeholder="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            className="w-full px-3 py-2 bg-[#080d1a] border border-emerald-500/50 text-sm text-white focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                      )}
                    </div>

                    {/* Metadata Settings */}
                    <div className="p-4 bg-black border border-cyan-500/30 space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                          Título Principal de la Emisión
                        </label>
                        <input
                          type="text"
                          value={liveForm.title}
                          onChange={(e) => setLiveForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                          placeholder="GYE TV+ EN VIVO | Edición Central"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                            Nombre del Programa Actual
                          </label>
                          <input
                            type="text"
                            value={liveForm.currentShow}
                            onChange={(e) => setLiveForm(prev => ({ ...prev, currentShow: e.target.value }))}
                            className="w-full px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                            placeholder="Guayaquil al Día (Edición Central)"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                            Presentadores / Conductores
                          </label>
                          <input
                            type="text"
                            value={liveForm.presenter}
                            onChange={(e) => setLiveForm(prev => ({ ...prev, presenter: e.target.value }))}
                            className="w-full px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                            placeholder="Valeria Solís & Carlos Mendoza"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#00f0ff] hover:bg-white text-black font-extrabold text-xs uppercase tracking-widest cursor-pointer transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                      >
                        <Check className="w-4 h-4 text-black" />
                        <span>Guardar y Aplicar Cambios al Aire</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 2: NEWS & ARTICLES MANAGEMENT */}
              {/* ========================================================================= */}
              {activeTab === 'news' && (
                <div>
                  {/* If currently editing an article */}
                  {editingNewsItem ? (
                    <div className="bg-black p-5 border border-cyan-500/40 space-y-4">
                      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                        <div className="flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-[#00f0ff]" />
                          <h4 className="font-bold text-white uppercase tracking-wider text-sm font-cyber">
                            {isCreatingNews ? 'Redactar Nuevo Artículo para Portada' : `Editando Noticia: ${editingNewsItem.id}`}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingNewsItem(null)}
                          className="text-xs text-slate-400 hover:text-[#ff6600] underline cursor-pointer"
                        >
                          Cancelar y Volver al Listado
                        </button>
                      </div>

                      <form onSubmit={handleCreateOrUpdateNews} className="space-y-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-300 uppercase mb-1">
                            Titular Principal de la Noticia:
                          </label>
                          <input
                            type="text"
                            value={editingNewsItem.title}
                            onChange={(e) => setEditingNewsItem({ ...editingNewsItem, title: e.target.value })}
                            className="w-full px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-sm font-headline font-bold text-white focus:outline-none focus:border-[#00f0ff]"
                            placeholder="Titular informativo claro y directo..."
                            required
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-300 uppercase mb-1">
                            Bajada / Subtítulo / Epígrafe:
                          </label>
                          <input
                            type="text"
                            value={editingNewsItem.subtitle || ''}
                            onChange={(e) => setEditingNewsItem({ ...editingNewsItem, subtitle: e.target.value })}
                            className="w-full px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-xs text-[#00f0ff] focus:outline-none focus:border-[#00f0ff]"
                            placeholder="Detalle complementario de la noticia..."
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block font-bold text-slate-300 uppercase mb-1">
                              Sección / Categoría:
                            </label>
                            <select
                              value={editingNewsItem.category}
                              onChange={(e) => setEditingNewsItem({ ...editingNewsItem, category: e.target.value as CategoryType })}
                              className="w-full px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-xs text-white focus:outline-none"
                            >
                              {CATEGORIES.map(cat => (
                                <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block font-bold text-slate-300 uppercase mb-1">
                              Subcategoría / Tag Temático:
                            </label>
                            <input
                              type="text"
                              value={editingNewsItem.subcategory || ''}
                              onChange={(e) => setEditingNewsItem({ ...editingNewsItem, subcategory: e.target.value })}
                              className="w-full px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-xs text-white focus:outline-none focus:border-[#00f0ff]"
                              placeholder="Ej: Movilidad, Liga Pro, Arte..."
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-300 uppercase mb-1">
                              Autor / Periodista:
                            </label>
                            <input
                              type="text"
                              value={editingNewsItem.author.name}
                              onChange={(e) => setEditingNewsItem({
                                ...editingNewsItem,
                                author: { ...editingNewsItem.author, name: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-xs text-white focus:outline-none focus:border-[#00f0ff]"
                              placeholder="Nombre del redactor"
                            />
                          </div>
                        </div>

                        {/* Image URL with Presets */}
                        <div>
                          <label className="block font-bold text-slate-300 uppercase mb-1">
                            URL de la Fotografía Principal:
                          </label>
                          <input
                            type="url"
                            value={editingNewsItem.image}
                            onChange={(e) => setEditingNewsItem({ ...editingNewsItem, image: e.target.value })}
                            className="w-full px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-xs text-white focus:outline-none focus:border-[#00f0ff]"
                            placeholder="https://images.unsplash.com/..."
                            required
                          />

                          {/* Quick image picker */}
                          <div className="mt-2">
                            <span className="text-[11px] text-slate-400 font-sans">Fotografías editoriales sugeridas:</span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {PRESET_IMAGES.map((img, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setEditingNewsItem({ ...editingNewsItem, image: img.url })}
                                  className="px-2 py-1 bg-[#080d1a] hover:bg-[#00f0ff] hover:text-black border border-cyan-500/30 text-[10px] text-slate-300 cursor-pointer transition-colors"
                                >
                                  {img.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Summary / Description */}
                        <div>
                          <label className="block font-bold text-slate-300 uppercase mb-1">
                            Lead / Resumen del Despacho:
                          </label>
                          <textarea
                            rows={2}
                            value={editingNewsItem.description}
                            onChange={(e) => setEditingNewsItem({ ...editingNewsItem, description: e.target.value })}
                            className="w-full px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-xs text-white focus:outline-none focus:border-[#00f0ff]"
                            placeholder="Párrafo inicial introductorio..."
                            required
                          />
                        </div>

                        {/* Full Content Paragraphs */}
                        <div>
                          <label className="block font-bold text-slate-300 uppercase mb-1">
                            Cuerpo Completo del Artículo (Separar párrafos con un salto de línea):
                          </label>
                          <textarea
                            rows={6}
                            value={editingNewsItem.content.join('\n\n')}
                            onChange={(e) => setEditingNewsItem({
                              ...editingNewsItem,
                              content: e.target.value.split('\n\n').filter(p => p.trim())
                            })}
                            className="w-full px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-xs text-white focus:outline-none focus:border-[#00f0ff]"
                            placeholder="Escriba aquí los párrafos completos de la noticia..."
                            required
                          />
                        </div>

                        {/* Editorial Flags */}
                        <div className="p-3 bg-[#080d1a] border border-cyan-500/30 flex flex-wrap gap-6 items-center">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!editingNewsItem.isFeatured}
                              onChange={(e) => setEditingNewsItem({ ...editingNewsItem, isFeatured: e.target.checked })}
                            />
                            <span className="font-bold text-[#00f0ff]">⭐ Gran Portada / Destacado</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!editingNewsItem.isUrgent}
                              onChange={(e) => setEditingNewsItem({ ...editingNewsItem, isUrgent: e.target.checked })}
                            />
                            <span className="font-bold text-[#ff6600]">🔥 Noticia Urgente</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!editingNewsItem.isBreaking}
                              onChange={(e) => setEditingNewsItem({ ...editingNewsItem, isBreaking: e.target.checked })}
                            />
                            <span className="font-bold text-amber-400">⚡ Alerta Última Hora</span>
                          </label>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingNewsItem(null)}
                            className="px-4 py-2 bg-black border border-slate-700 text-slate-300 text-xs font-bold uppercase cursor-pointer hover:bg-slate-900"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#00f0ff] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                          >
                            Publicar en Portada
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    /* News Items Table & Search List */
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleStartNewArticle}
                            className="px-4 py-2 bg-[#00f0ff] hover:bg-white text-black text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.35)]"
                          >
                            <Plus className="w-4 h-4 text-black" />
                            <span>Redactar Noticia</span>
                          </button>

                          <span className="text-xs text-slate-400">
                            Total: <strong className="text-white">{newsList.length}</strong> artículos
                          </span>
                        </div>

                        {/* Search & Filter */}
                        <div className="flex items-center gap-2">
                          <select
                            value={newsFilterCat}
                            onChange={(e) => setNewsFilterCat(e.target.value)}
                            className="px-2.5 py-1.5 bg-black border border-cyan-500/30 text-xs text-white focus:outline-none"
                          >
                            <option value="Todas">Todas las Secciones</option>
                            {CATEGORIES.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>

                          <input
                            type="text"
                            value={newsSearchTerm}
                            onChange={(e) => setNewsSearchTerm(e.target.value)}
                            placeholder="Filtrar por título..."
                            className="px-2.5 py-1.5 bg-black border border-cyan-500/30 text-xs text-white focus:outline-none focus:border-[#00f0ff] w-40 sm:w-56"
                          />
                        </div>
                      </div>

                      {/* News List Items */}
                      <div className="divide-y divide-cyan-500/15 max-h-[50vh] overflow-y-auto">
                        {newsList
                          .filter(item => newsFilterCat === 'Todas' || item.category === newsFilterCat)
                          .filter(item => newsSearchTerm === '' || item.title.toLowerCase().includes(newsSearchTerm.toLowerCase()))
                          .map(item => (
                            <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#080d1a] px-2 transition-colors">
                              <div className="flex items-start gap-3 min-w-0">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-14 h-12 object-cover border border-cyan-500/30 shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 text-[10px]">
                                    <span className="px-1.5 py-0.5 bg-black border border-cyan-500/30 text-[#00f0ff] font-bold uppercase">
                                      {item.category}
                                    </span>
                                    {item.isFeatured && (
                                      <span className="text-yellow-400 font-bold">★ Portada</span>
                                    )}
                                    {item.isUrgent && (
                                      <span className="text-[#ff6600] font-bold">🔥 Urgente</span>
                                    )}
                                    <span className="text-slate-500">{item.date}</span>
                                  </div>
                                  <h5 className="text-xs sm:text-sm font-bold text-white truncate max-w-xl">
                                    {item.title}
                                  </h5>
                                  <p className="text-[11px] text-slate-400 truncate max-w-xl font-sans">
                                    {item.description}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                                <button
                                  onClick={() => toggleNewsFeature(item.id)}
                                  className={`p-1.5 border text-xs cursor-pointer ${
                                    item.isFeatured ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-black text-slate-400 border-slate-700 hover:text-white'
                                  }`}
                                  title="Alternar Portada Destacada"
                                >
                                  <Star className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => toggleNewsUrgent(item.id)}
                                  className={`p-1.5 border text-xs cursor-pointer ${
                                    item.isUrgent ? 'bg-[#ff6600] text-black border-[#ff6600]' : 'bg-black text-slate-400 border-slate-700 hover:text-white'
                                  }`}
                                  title="Alternar Noticia Urgente"
                                >
                                  <Flame className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => {
                                    setEditingNewsItem(item);
                                    setIsCreatingNews(false);
                                  }}
                                  className="p-1.5 bg-black hover:bg-[#00f0ff] hover:text-black text-[#00f0ff] border border-cyan-500/40 text-xs cursor-pointer transition-colors"
                                  title="Editar Noticia"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => {
                                    if (confirm(`¿Eliminar definitivamente "${item.title}"?`)) {
                                      deleteNews(item.id);
                                    }
                                  }}
                                  className="p-1.5 bg-black hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 text-xs cursor-pointer transition-colors"
                                  title="Eliminar Noticia"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 3: BREAKING ALERTS TICKER */}
              {/* ========================================================================= */}
              {activeTab === 'alerts' && (
                <div className="space-y-6">
                  <div className="border-b border-cyan-500/30 pb-3">
                    <h3 className="text-lg font-cyber font-black text-white">
                      Cintillo Superior de Última Hora & Alertas Urgentes
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      Los titulares activos rotan en tiempo real en la parte superior del portal informativo.
                    </p>
                  </div>

                  {/* Add Alert Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newAlertText.trim()) return;
                      addBreakingAlert(newAlertText.trim(), newAlertCategory);
                      setNewAlertText('');
                      setSaveSuccessMsg('¡Alerta agregada y transmitida en el cintillo!');
                      setTimeout(() => setSaveSuccessMsg(''), 3000);
                    }}
                    className="p-4 bg-black border border-cyan-500/30 flex flex-col sm:flex-row gap-3"
                  >
                    <select
                      value={newAlertCategory}
                      onChange={(e) => setNewAlertCategory(e.target.value)}
                      className="px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-xs text-white focus:outline-none"
                    >
                      <option value="Urgente">Urgente</option>
                      <option value="Guayaquil">Guayaquil</option>
                      <option value="Deportes">Deportes</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Seguridad">Seguridad</option>
                    </select>

                    <input
                      type="text"
                      value={newAlertText}
                      onChange={(e) => setNewAlertText(e.target.value)}
                      placeholder="Escriba el texto del cintillo de última hora..."
                      className="flex-1 px-3 py-2 bg-[#080d1a] border border-cyan-500/40 text-xs text-white focus:outline-none focus:border-[#00f0ff]"
                      required
                    />

                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#00f0ff] hover:bg-white text-black text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                    >
                      Agregar Alerta
                    </button>
                  </form>

                  {/* Alerts List */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Cintillos Activos ({breakingAlerts.length}):
                    </h4>
                    <div className="divide-y divide-cyan-500/15 bg-black border border-cyan-500/30 p-2">
                      {breakingAlerts.map(alert => (
                        <div key={alert.id} className="py-2.5 px-3 flex items-center justify-between gap-3 hover:bg-[#080d1a]">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="px-2 py-0.5 bg-[#080d1a] border border-cyan-500/40 text-[#00f0ff] text-[10px] font-bold">
                              {alert.category || 'Alerta'}
                            </span>
                            <span className="text-xs text-white truncate font-sans">{alert.text}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => toggleBreakingAlert(alert.id)}
                              className={`px-2 py-1 text-[10px] font-bold border cursor-pointer ${
                                alert.active ? 'bg-emerald-500 text-black border-emerald-500' : 'bg-black text-slate-400 border-slate-700'
                              }`}
                            >
                              {alert.active ? 'Activo' : 'Oculto'}
                            </button>

                            <button
                              onClick={() => deleteBreakingAlert(alert.id)}
                              className="p-1 text-red-400 hover:text-red-200 cursor-pointer"
                              title="Eliminar Alerta"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 4: SPORTS SCORES */}
              {/* ========================================================================= */}
              {activeTab === 'sports' && (
                <div className="space-y-6">
                  <div className="border-b border-cyan-500/30 pb-3">
                    <h3 className="text-lg font-cyber font-black text-white">
                      Marcadores Deportivos en Vivo (Liga Pro & La Tri)
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      Actualice resultados en tiempo real, minutos de juego y estatus del partido.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sportsScores.map(score => (
                      <div key={score.id} className="p-4 bg-black border border-cyan-500/30 space-y-3">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-bold text-[#00f0ff]">{score.tournament}</span>
                          <input
                            type="text"
                            value={score.status}
                            onChange={(e) => updateSportsScore(score.id, { status: e.target.value })}
                            className="px-2 py-0.5 bg-[#080d1a] border border-cyan-500/30 text-[10px] text-white w-28 text-right focus:outline-none"
                            placeholder="75' En Juego"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{score.homeTeam}</span>
                            <input
                              type="number"
                              value={score.homeScore}
                              onChange={(e) => updateSportsScore(score.id, { homeScore: Number(e.target.value) })}
                              className="w-12 px-2 py-1 bg-[#080d1a] border border-cyan-500/40 text-sm font-bold text-center text-[#00f0ff] focus:outline-none"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{score.awayTeam}</span>
                            <input
                              type="number"
                              value={score.awayScore}
                              onChange={(e) => updateSportsScore(score.id, { awayScore: Number(e.target.value) })}
                              className="w-12 px-2 py-1 bg-[#080d1a] border border-cyan-500/40 text-sm font-bold text-center text-[#00f0ff] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-cyan-500/15 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-mono text-[10px]">{score.status}</span>
                          <span className="text-slate-500 font-sans">{score.venue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 5: VIDEO ARCHIVE */}
              {/* ========================================================================= */}
              {activeTab === 'videos' && (
                <div className="space-y-6">
                  <div className="border-b border-cyan-500/30 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-cyber font-black text-white">
                        Archivo de Reportajes & Cápsulas de Video ({videos.length})
                      </h3>
                      <p className="text-xs text-slate-400 font-sans">
                        Administre la sección audiovisual interactiva de la portada.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {videos.map(vid => (
                      <div key={vid.id} className="p-3 bg-black border border-cyan-500/30 flex gap-3">
                        <img
                          src={vid.thumbnail}
                          alt={vid.title}
                          className="w-24 h-16 object-cover border border-cyan-500/20 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-[#ff8c33] font-bold uppercase">{vid.category}</span>
                          <h5 className="text-xs font-bold text-white truncate">{vid.title}</h5>
                          <p className="text-[10px] text-slate-400">Duración: {vid.duration} • {vid.views} vistas</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 6: ADS & BANNERS */}
              {/* ========================================================================= */}
              {activeTab === 'ads' && (
                <div className="space-y-6">
                  <div className="border-b border-cyan-500/30 pb-3">
                    <h3 className="text-lg font-cyber font-black text-white">
                      Pauta Institucional & Banners Comerciales
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      Controle la publicidad visible en la cabecera, laterales y dentro de las notas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(adBanners).map(([key, banner]) => (
                      <div key={key} className="p-4 bg-black border border-cyan-500/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#00f0ff] uppercase text-xs">Pauta: {key} ({banner.dimensions})</span>
                          <span className="text-[10px] text-slate-400 font-mono">Formato: {banner.format}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="block text-slate-400 mb-1">Título / Empresa:</label>
                            <input
                              type="text"
                              value={banner.title || ''}
                              onChange={(e) => updateAdBanner(key, { title: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-[#080d1a] border border-cyan-500/40 text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">URL / Enlace Personalizado:</label>
                            <input
                              type="text"
                              value={banner.customLinkUrl || ''}
                              onChange={(e) => updateAdBanner(key, { customLinkUrl: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-[#080d1a] border border-cyan-500/40 text-white focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 7: BACKUP & RESTORE */}
              {/* ========================================================================= */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div className="border-b border-cyan-500/30 pb-3">
                    <h3 className="text-lg font-cyber font-black text-white">
                      Mantenimiento, Respaldo y Restauración del Sistema
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      Descargue una copia de seguridad completa en JSON o restablezca a los valores predeterminados.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-black border border-cyan-500/30 space-y-3">
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#00f0ff]" />
                        <span>Exportar Respaldo JSON</span>
                      </h4>
                      <p className="text-xs text-slate-400 font-sans">
                        Descarga toda la base de noticias, configuración en vivo y marcadores en un archivo de respaldo.
                      </p>
                      <button
                        onClick={handleDownloadBackup}
                        className="px-4 py-2.5 bg-[#00f0ff] hover:bg-white text-black text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                      >
                        Descargar Archivo JSON
                      </button>
                    </div>

                    <div className="p-5 bg-black border border-cyan-500/30 space-y-3">
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#ff6600]" />
                        <span>Importar Respaldo</span>
                      </h4>
                      <p className="text-xs text-slate-400 font-sans">
                        Restaura una copia de seguridad JSON previamente exportada.
                      </p>
                      <label className="inline-block px-4 py-2.5 bg-[#080d1a] hover:bg-[#ff6600] text-[#ff8c33] hover:text-black border border-[#ff6600]/60 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all">
                        <span>Seleccionar Archivo JSON</span>
                        <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="p-5 bg-red-950/30 border border-red-500/40 space-y-3">
                    <h4 className="font-bold text-red-400 text-sm flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Restablecer a Valores de Fábrica</span>
                    </h4>
                    <p className="text-xs text-slate-300 font-sans">
                      Elimina todos los cambios locales y devuelve las noticias, directos y marcadores a la configuración inicial por defecto.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('¿Está seguro de restablecer toda la aplicación a los valores de fábrica?')) {
                          resetToDefaults();
                          setSaveSuccessMsg('¡Datos restablecidos con éxito!');
                          setTimeout(() => setSaveSuccessMsg(''), 3000);
                        }
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Restablecer Todo
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
