import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { 
  NewsItem, 
  LiveStreamConfig, 
  VideoItem, 
  SportsScore, 
  AdBannerConfig, 
  AdminUser, 
  BreakingAlert,
  CategoryType,
  LiveChatMessage,
  BroadcastFlashAlert
} from '../types';
import { 
  DEMO_NEWS, 
  LIVE_STREAM_CONFIG, 
  DEMO_VIDEOS, 
  SPORTS_SCORES, 
  AD_BANNERS 
} from '../data/newsData';

const STORAGE_KEY_NEWS = 'gyetv_news_v2';
const STORAGE_KEY_LIVE = 'gyetv_live_config_v2';
const STORAGE_KEY_VIDEOS = 'gyetv_videos_v2';
const STORAGE_KEY_SCORES = 'gyetv_scores_v2';
const STORAGE_KEY_BANNERS = 'gyetv_banners_v2';
const STORAGE_KEY_ALERTS = 'gyetv_breaking_alerts_v2';
const STORAGE_KEY_ADMIN = 'gyetv_admin_session_v2';
const STORAGE_KEY_CHAT = 'gyetv_live_chat_v2';
const STORAGE_KEY_FLASH = 'gyetv_broadcast_flash_v2';
const STORAGE_KEY_PRESENCE = 'gyetv_presence_heartbeat_v2';
const SYNC_CHANNEL_NAME = 'gyetv_realtime_sync_channel_v2';

const INITIAL_ALERTS: BreakingAlert[] = [
  {
    id: 'alert-1',
    text: 'URGENTE: Operativos conjuntos en vías estratégicas de Guayaquil y Corredor 9 de Octubre.',
    timestamp: 'Hace 4 min',
    category: 'Seguridad',
    active: true
  },
  {
    id: 'alert-2',
    text: 'LIGA PRO: Se reporta lleno total de localidades para la jornada estelar en el Monumental.',
    timestamp: 'Hace 15 min',
    category: 'Deportes',
    active: true
  },
  {
    id: 'alert-3',
    text: 'CULTURA & CIUDAD: Cartelera cultural de fin de semana en el Malecón 2000 y Cerro Santa Ana.',
    timestamp: 'Hace 28 min',
    category: 'Cultura',
    active: true
  }
];

const INITIAL_CHAT_MESSAGES: LiveChatMessage[] = [
  { id: '1', user: 'Jefferson Morales (Urdesa)', text: 'Señal en alta definición recibida sin interrupciones.', time: '14:28' },
  { id: '2', user: 'Lic. Mariana Cordero', text: 'Excelente cobertura del reporte de seguridad en tiempo real.', time: '14:29' },
  { id: '3', user: 'Carlos E. Gómez', text: 'Sintonizando el noticiero central con audio nítido.', time: '14:30' },
  { id: '4', user: 'Dra. Patricia Valarezo', text: 'Transmisión estable y panel periodístico muy serio.', time: '14:31' }
];

interface DataContextType {
  // State
  newsList: NewsItem[];
  liveConfig: LiveStreamConfig;
  videos: VideoItem[];
  sportsScores: SportsScore[];
  adBanners: Record<string, AdBannerConfig>;
  breakingAlerts: BreakingAlert[];
  liveChatMessages: LiveChatMessage[];
  broadcastFlashAlert: BroadcastFlashAlert | null;
  isAdmin: boolean;
  adminUser: AdminUser | null;
  lastSyncTime: Date;

  // Real-time Synchronized Audience Presence
  syncedViewersCount: number;
  activeConnectedTabs: number;

  // Admin Auth
  loginAdmin: (user: string, pass: string) => { success: boolean; message: string };
  logoutAdmin: () => void;

  // Live Stream Actions
  updateLiveConfig: (updates: Partial<LiveStreamConfig>) => void;
  setLiveStreamActive: (isLive: boolean) => void;
  setLiveStreamSource: (source: 'youtube' | 'custom' | 'demo', embedIdOrUrl: string) => void;

  // Real-time Live Chat
  sendLiveChatMessage: (text: string, customAuthor?: string) => void;
  deleteChatMessage: (id: string) => void;

  // Emergency Broadcast Flash
  emitBroadcastFlash: (title: string, message: string, severity?: 'urgent' | 'breaking' | 'info') => void;
  dismissBroadcastFlash: () => void;

  // News Actions
  addNews: (item: Omit<NewsItem, 'id'> & { id?: string }) => NewsItem;
  updateNews: (id: string, updates: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  toggleNewsFeature: (id: string) => void;
  toggleNewsUrgent: (id: string) => void;
  toggleNewsBreaking: (id: string) => void;

  // Videos Actions
  addVideo: (video: Omit<VideoItem, 'id'> & { id?: string }) => VideoItem;
  updateVideo: (id: string, updates: Partial<VideoItem>) => void;
  deleteVideo: (id: string) => void;

  // Sports Scores Actions
  updateSportsScore: (id: string, updates: Partial<SportsScore>) => void;
  addSportsScore: (score: Omit<SportsScore, 'id'> & { id?: string }) => SportsScore;
  deleteSportsScore: (id: string) => void;

  // Ad Banners Actions
  updateAdBanner: (key: string, updates: Partial<AdBannerConfig>) => void;

  // Breaking Alerts Actions
  addBreakingAlert: (text: string, category?: string) => void;
  toggleBreakingAlert: (id: string) => void;
  deleteBreakingAlert: (id: string) => void;

  // Backup & Reset
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Generate unique tab session ID for this browser tab
const getTabSessionId = () => {
  if (typeof window === 'undefined') return 'server';
  let sid = sessionStorage.getItem('gyetv_tab_sid');
  if (!sid) {
    sid = 'tab_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    sessionStorage.setItem('gyetv_tab_sid', sid);
  }
  return sid;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial state loading with fallback to default demo data
  const [newsList, setNewsList] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NEWS);
      return saved ? JSON.parse(saved) : DEMO_NEWS;
    } catch {
      return DEMO_NEWS;
    }
  });

  const [liveConfig, setLiveConfig] = useState<LiveStreamConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LIVE);
      return saved ? JSON.parse(saved) : LIVE_STREAM_CONFIG;
    } catch {
      return LIVE_STREAM_CONFIG;
    }
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VIDEOS);
      return saved ? JSON.parse(saved) : DEMO_VIDEOS;
    } catch {
      return DEMO_VIDEOS;
    }
  });

  const [sportsScores, setSportsScores] = useState<SportsScore[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SCORES);
      return saved ? JSON.parse(saved) : SPORTS_SCORES;
    } catch {
      return SPORTS_SCORES;
    }
  });

  const [adBanners, setAdBanners] = useState<Record<string, AdBannerConfig>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BANNERS);
      return saved ? JSON.parse(saved) : AD_BANNERS;
    } catch {
      return AD_BANNERS;
    }
  });

  const [breakingAlerts, setBreakingAlerts] = useState<BreakingAlert[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ALERTS);
      return saved ? JSON.parse(saved) : INITIAL_ALERTS;
    } catch {
      return INITIAL_ALERTS;
    }
  });

  const [liveChatMessages, setLiveChatMessages] = useState<LiveChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHAT);
      return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
    } catch {
      return INITIAL_CHAT_MESSAGES;
    }
  });

  const [broadcastFlashAlert, setBroadcastFlashAlert] = useState<BroadcastFlashAlert | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FLASH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [activeConnectedTabs, setActiveConnectedTabs] = useState<number>(1);
  const [syncWaveStep, setSyncWaveStep] = useState<number>(0);

  // Broadcast sync helper
  const broadcastSync = useCallback((actionType: string, payload?: any) => {
    setLastSyncTime(new Date());
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        const bc = new BroadcastChannel(SYNC_CHANNEL_NAME);
        bc.postMessage({ type: actionType, time: Date.now(), payload });
        bc.close();
      } catch (e) {
        console.log('Broadcast error:', e);
      }
    }
  }, []);

  // Real-time Multi-Client Presence Heartbeat & Audience Synchronization
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tabId = getTabSessionId();

    const updatePresence = () => {
      try {
        const now = Date.now();
        const raw = localStorage.getItem(STORAGE_KEY_PRESENCE);
        let registry: Record<string, number> = raw ? JSON.parse(raw) : {};

        // Register this tab
        registry[tabId] = now;

        // Prune stale tabs (no heartbeat in past 6 seconds)
        const pruned: Record<string, number> = {};
        let activeCount = 0;
        for (const [id, lastSeen] of Object.entries(registry)) {
          if (now - lastSeen < 6000) {
            pruned[id] = lastSeen;
            activeCount++;
          }
        }

        localStorage.setItem(STORAGE_KEY_PRESENCE, JSON.stringify(pruned));
        setActiveConnectedTabs(Math.max(1, activeCount));
        setSyncWaveStep(Math.floor(now / 3000) % 100);
      } catch (err) {
        console.log('Presence heartbeat error:', err);
      }
    };

    updatePresence();
    const interval = setInterval(updatePresence, 2000);

    // Clean up on tab close
    const handleUnload = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_PRESENCE);
        if (raw) {
          const registry: Record<string, number> = JSON.parse(raw);
          delete registry[tabId];
          localStorage.setItem(STORAGE_KEY_PRESENCE, JSON.stringify(registry));
        }
      } catch {}
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  // Multi-tab real-time sync listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let bc: BroadcastChannel | null = null;
    if ('BroadcastChannel' in window) {
      try {
        bc = new BroadcastChannel(SYNC_CHANNEL_NAME);
        bc.onmessage = (event) => {
          const data = event.data;
          try {
            const savedNews = localStorage.getItem(STORAGE_KEY_NEWS);
            if (savedNews) setNewsList(JSON.parse(savedNews));
            const savedLive = localStorage.getItem(STORAGE_KEY_LIVE);
            if (savedLive) setLiveConfig(JSON.parse(savedLive));
            const savedVideos = localStorage.getItem(STORAGE_KEY_VIDEOS);
            if (savedVideos) setVideos(JSON.parse(savedVideos));
            const savedScores = localStorage.getItem(STORAGE_KEY_SCORES);
            if (savedScores) setSportsScores(JSON.parse(savedScores));
            const savedBanners = localStorage.getItem(STORAGE_KEY_BANNERS);
            if (savedBanners) setAdBanners(JSON.parse(savedBanners));
            const savedAlerts = localStorage.getItem(STORAGE_KEY_ALERTS);
            if (savedAlerts) setBreakingAlerts(JSON.parse(savedAlerts));
            const savedChat = localStorage.getItem(STORAGE_KEY_CHAT);
            if (savedChat) setLiveChatMessages(JSON.parse(savedChat));
            const savedFlash = localStorage.getItem(STORAGE_KEY_FLASH);
            setBroadcastFlashAlert(savedFlash ? JSON.parse(savedFlash) : null);
            setLastSyncTime(new Date());
          } catch (err) {
            console.error('Error reloading sync data:', err);
          }
        };
      } catch (e) {
        console.log('BroadcastChannel init error:', e);
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key) return;
      try {
        if (e.key === STORAGE_KEY_NEWS && e.newValue) setNewsList(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEY_LIVE && e.newValue) setLiveConfig(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEY_VIDEOS && e.newValue) setVideos(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEY_SCORES && e.newValue) setSportsScores(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEY_BANNERS && e.newValue) setAdBanners(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEY_ALERTS && e.newValue) setBreakingAlerts(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEY_CHAT && e.newValue) setLiveChatMessages(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEY_FLASH) setBroadcastFlashAlert(e.newValue ? JSON.parse(e.newValue) : null);
        if (e.key === STORAGE_KEY_ADMIN && e.newValue) setAdminUser(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEY_ADMIN && !e.newValue) setAdminUser(null);
        setLastSyncTime(new Date());
      } catch (err) {
        console.error('Storage event parse error:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (bc) bc.close();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Compute 100% synchronized audience count across all tabs & devices
  const syncedViewersCount = useMemo(() => {
    if (!liveConfig.isLive) return 0;
    const base = Number(liveConfig.viewersCount) || 3420;
    // Deterministic sine oscillation based on synchronized timestamp wave step
    const pseudoNoise = Math.floor(Math.sin(syncWaveStep * 0.4) * 8) + Math.floor(Math.cos(syncWaveStep * 0.2) * 5);
    // Real connected tabs count adds guaranteed real weight
    const tabWeight = activeConnectedTabs * 14;
    return Math.max(120, base + tabWeight + pseudoNoise);
  }, [liveConfig.isLive, liveConfig.viewersCount, activeConnectedTabs, syncWaveStep]);

  // Save changes to localStorage helper
  const saveNews = (updated: NewsItem[]) => {
    setNewsList(updated);
    localStorage.setItem(STORAGE_KEY_NEWS, JSON.stringify(updated));
    broadcastSync('NEWS_UPDATED');
  };

  const saveLive = (updated: LiveStreamConfig) => {
    setLiveConfig(updated);
    localStorage.setItem(STORAGE_KEY_LIVE, JSON.stringify(updated));
    broadcastSync('LIVE_UPDATED');
  };

  const saveVideos = (updated: VideoItem[]) => {
    setVideos(updated);
    localStorage.setItem(STORAGE_KEY_VIDEOS, JSON.stringify(updated));
    broadcastSync('VIDEOS_UPDATED');
  };

  const saveScores = (updated: SportsScore[]) => {
    setSportsScores(updated);
    localStorage.setItem(STORAGE_KEY_SCORES, JSON.stringify(updated));
    broadcastSync('SCORES_UPDATED');
  };

  const saveBanners = (updated: Record<string, AdBannerConfig>) => {
    setAdBanners(updated);
    localStorage.setItem(STORAGE_KEY_BANNERS, JSON.stringify(updated));
    broadcastSync('BANNERS_UPDATED');
  };

  const saveAlerts = (updated: BreakingAlert[]) => {
    setBreakingAlerts(updated);
    localStorage.setItem(STORAGE_KEY_ALERTS, JSON.stringify(updated));
    broadcastSync('ALERTS_UPDATED');
  };

  const saveChat = (updated: LiveChatMessage[]) => {
    setLiveChatMessages(updated);
    localStorage.setItem(STORAGE_KEY_CHAT, JSON.stringify(updated));
    broadcastSync('CHAT_UPDATED');
  };

  // 1. Admin Authentication
  const loginAdmin = (user: string, pass: string) => {
    const trimmedUser = user.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if (trimmedUser === 'guayaquiltv' && trimmedPass === '12345') {
      const authUser: AdminUser = {
        username: 'guayaquiltv',
        name: 'Director General & Editor en Jefe',
        role: 'Super Administrador Matriz',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        authenticatedAt: new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })
      };
      setAdminUser(authUser);
      localStorage.setItem(STORAGE_KEY_ADMIN, JSON.stringify(authUser));
      broadcastSync('ADMIN_LOGIN');
      return { success: true, message: 'Acceso editorial concedido como Administrador General de GYE TV+.' };
    }

    return { success: false, message: 'Credenciales no válidas. Verifique el usuario y la clave de redacción.' };
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem(STORAGE_KEY_ADMIN);
    broadcastSync('ADMIN_LOGOUT');
  };

  // 2. Live Stream Management
  const updateLiveConfig = (updates: Partial<LiveStreamConfig>) => {
    const updated = { ...liveConfig, ...updates };
    saveLive(updated);
  };

  const setLiveStreamActive = (isLive: boolean) => {
    const updated = { ...liveConfig, isLive };
    saveLive(updated);
  };

  const setLiveStreamSource = (source: 'youtube' | 'custom' | 'demo', embedIdOrUrl: string) => {
    let cleanId = embedIdOrUrl.trim();
    if (source === 'youtube') {
      const ytMatch = cleanId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (ytMatch && ytMatch[1]) {
        cleanId = ytMatch[1];
      }
    }

    const updated: LiveStreamConfig = {
      ...liveConfig,
      streamSource: source,
      youtubeEmbedId: source === 'youtube' ? cleanId : liveConfig.youtubeEmbedId,
      customStreamUrl: source === 'custom' ? cleanId : liveConfig.customStreamUrl
    };
    saveLive(updated);
  };

  // 3. Live Chat Actions (Synchronized instantly across all tabs)
  const sendLiveChatMessage = (text: string, customAuthor?: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg: LiveChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      user: customAuthor || (adminUser ? 'Director GYE TV+ (Oficial)' : 'Espectador Digital'),
      text: text.trim(),
      time,
      isAdmin: !!adminUser
    };
    const updated = [...liveChatMessages.slice(-40), newMsg];
    saveChat(updated);
  };

  const deleteChatMessage = (id: string) => {
    const updated = liveChatMessages.filter(m => m.id !== id);
    saveChat(updated);
  };

  // 4. Emergency Broadcast Flash Actions
  const emitBroadcastFlash = (title: string, message: string, severity: 'urgent' | 'breaking' | 'info' = 'breaking') => {
    const flash: BroadcastFlashAlert = {
      id: `flash_${Date.now()}`,
      title: title.trim(),
      message: message.trim(),
      severity,
      active: true,
      timestamp: new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })
    };
    setBroadcastFlashAlert(flash);
    localStorage.setItem(STORAGE_KEY_FLASH, JSON.stringify(flash));
    broadcastSync('FLASH_EMITTED', flash);
  };

  const dismissBroadcastFlash = () => {
    setBroadcastFlashAlert(null);
    localStorage.removeItem(STORAGE_KEY_FLASH);
    broadcastSync('FLASH_DISMISSED');
  };

  // 5. News Actions
  const addNews = (item: Omit<NewsItem, 'id'> & { id?: string }): NewsItem => {
    const newItem: NewsItem = {
      ...item,
      id: item.id || `noticia-${Date.now()}`,
      viewsCount: item.viewsCount || 1,
      date: item.date || new Date().toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: item.time || new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' }),
      readTime: item.readTime || '3 min',
      author: item.author || {
        name: adminUser?.name || 'Redacción GYE TV+',
        role: 'Mesa Central de Noticias',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      }
    };
    const updated = [newItem, ...newsList];
    saveNews(updated);
    return newItem;
  };

  const updateNews = (id: string, updates: Partial<NewsItem>) => {
    const updated = newsList.map(item => item.id === id ? { ...item, ...updates } : item);
    saveNews(updated);
  };

  const deleteNews = (id: string) => {
    const updated = newsList.filter(item => item.id !== id);
    saveNews(updated);
  };

  const toggleNewsFeature = (id: string) => {
    const target = newsList.find(n => n.id === id);
    if (!target) return;
    const isNowFeatured = !target.isFeatured;
    const updated = newsList.map(item => {
      if (item.id === id) return { ...item, isFeatured: isNowFeatured };
      if (isNowFeatured) return { ...item, isFeatured: false };
      return item;
    });
    saveNews(updated);
  };

  const toggleNewsUrgent = (id: string) => {
    const updated = newsList.map(item => item.id === id ? { ...item, isUrgent: !item.isUrgent } : item);
    saveNews(updated);
  };

  const toggleNewsBreaking = (id: string) => {
    const updated = newsList.map(item => item.id === id ? { ...item, isBreaking: !item.isBreaking } : item);
    saveNews(updated);
  };

  // 6. Videos Actions
  const addVideo = (video: Omit<VideoItem, 'id'> & { id?: string }): VideoItem => {
    const newVid: VideoItem = {
      ...video,
      id: video.id || `vid-${Date.now()}`,
      views: video.views || '1.2K',
      date: video.date || 'Reciente'
    };
    const updated = [newVid, ...videos];
    saveVideos(updated);
    return newVid;
  };

  const updateVideo = (id: string, updates: Partial<VideoItem>) => {
    const updated = videos.map(v => v.id === id ? { ...v, ...updates } : v);
    saveVideos(updated);
  };

  const deleteVideo = (id: string) => {
    const updated = videos.filter(v => v.id !== id);
    saveVideos(updated);
  };

  // 7. Sports Scores Actions
  const updateSportsScore = (id: string, updates: Partial<SportsScore>) => {
    const updated = sportsScores.map(s => s.id === id ? { ...s, ...updates } : s);
    saveScores(updated);
  };

  const addSportsScore = (score: Omit<SportsScore, 'id'> & { id?: string }): SportsScore => {
    const newScore: SportsScore = {
      ...score,
      id: score.id || `score-${Date.now()}`
    };
    const updated = [...sportsScores, newScore];
    saveScores(updated);
    return newScore;
  };

  const deleteSportsScore = (id: string) => {
    const updated = sportsScores.filter(s => s.id !== id);
    saveScores(updated);
  };

  // 8. Ad Banners Actions
  const updateAdBanner = (key: string, updates: Partial<AdBannerConfig>) => {
    const current = adBanners[key] || {
      id: key,
      slotName: key,
      format: 'in-feed',
      dimensions: 'Responsive',
      isPlaceholder: true
    };
    const updated = {
      ...adBanners,
      [key]: { ...current, ...updates }
    };
    saveBanners(updated);
  };

  // 9. Breaking Alerts Actions
  const addBreakingAlert = (text: string, category: string = 'Urgente') => {
    if (!text.trim()) return;
    const newAlert: BreakingAlert = {
      id: `alert-${Date.now()}`,
      text: text.trim(),
      timestamp: 'Ahora',
      category,
      active: true
    };
    const updated = [newAlert, ...breakingAlerts];
    saveAlerts(updated);
  };

  const toggleBreakingAlert = (id: string) => {
    const updated = breakingAlerts.map(a => a.id === id ? { ...a, active: !a.active } : a);
    saveAlerts(updated);
  };

  const deleteBreakingAlert = (id: string) => {
    const updated = breakingAlerts.filter(a => a.id !== id);
    saveAlerts(updated);
  };

  // 10. Reset & Backup
  const resetToDefaults = () => {
    if (window.confirm('¿Está seguro de restablecer todos los datos del portal a los valores oficiales de fábrica?')) {
      saveNews(DEMO_NEWS);
      saveLive(LIVE_STREAM_CONFIG);
      saveVideos(DEMO_VIDEOS);
      saveScores(SPORTS_SCORES);
      saveBanners(AD_BANNERS);
      saveAlerts(INITIAL_ALERTS);
      saveChat(INITIAL_CHAT_MESSAGES);
      dismissBroadcastFlash();
      alert('Datos de GYE TV+ restablecidos con éxito.');
    }
  };

  const exportDataJSON = () => {
    const dataPackage = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      newsList,
      liveConfig,
      videos,
      sportsScores,
      adBanners,
      breakingAlerts,
      liveChatMessages
    };
    return JSON.stringify(dataPackage, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.newsList) saveNews(parsed.newsList);
      if (parsed.liveConfig) saveLive(parsed.liveConfig);
      if (parsed.videos) saveVideos(parsed.videos);
      if (parsed.sportsScores) saveScores(parsed.sportsScores);
      if (parsed.adBanners) saveBanners(parsed.adBanners);
      if (parsed.breakingAlerts) saveAlerts(parsed.breakingAlerts);
      if (parsed.liveChatMessages) saveChat(parsed.liveChatMessages);
      return true;
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        newsList,
        liveConfig,
        videos,
        sportsScores,
        adBanners,
        breakingAlerts,
        liveChatMessages,
        broadcastFlashAlert,
        isAdmin: !!adminUser,
        adminUser,
        lastSyncTime,

        syncedViewersCount,
        activeConnectedTabs,

        loginAdmin,
        logoutAdmin,

        updateLiveConfig,
        setLiveStreamActive,
        setLiveStreamSource,

        sendLiveChatMessage,
        deleteChatMessage,

        emitBroadcastFlash,
        dismissBroadcastFlash,

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
