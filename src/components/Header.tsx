import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Calendar, 
  ChevronRight, 
  HelpCircle,
  Tv,
  FileText,
  Clock,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Flame,
  Sparkles,
  Users
} from 'lucide-react';
import { CategoryType } from '../types';
import { useData } from '../context/DataContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onSelectCategory: (category: CategoryType) => void;
  selectedCategory: CategoryType;
  onOpenWebmasterGuide: () => void;
  onOpenContactModal: () => void;
  onOpenAdmin: (tab?: 'live' | 'news' | 'alerts' | 'sports' | 'videos' | 'ads' | 'backup') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onSelectCategory,
  selectedCategory,
  onOpenWebmasterGuide,
  onOpenContactModal,
  onOpenAdmin
}) => {
  const { syncedViewersCount, activeConnectedTabs, liveConfig } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentDateString, setCurrentDateString] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const formattedDate = now.toLocaleDateString('es-EC', options);
    setCurrentDateString(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PORTADA', href: '#inicio', category: 'Todas' as CategoryType },
    { label: 'DEPORTES', href: '#deportes', category: 'Deportes' as CategoryType, highlight: 'orange' },
    { label: 'ENTRETENIMIENTO', href: '#entretenimiento', category: 'Entretenimiento' as CategoryType, highlight: 'cyan' },
    { label: 'CULTURA & SOCIEDAD', href: '#cultura', category: 'Cultura' as CategoryType },
    { label: 'MESA DE REDACCIÓN', action: onOpenContactModal }
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    if (link.action) {
      link.action();
    } else if (link.category) {
      onSelectCategory(link.category);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#060913]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_25px_rgba(0,0,0,0.6)] transition-all duration-200">
      
      {/* 1. TOP NEON BAR (Date, Weather, Live Synchronized Viewers, Admin) */}
      <div className="bg-[#03060f] text-slate-300 text-xs border-b border-cyan-500/15 hidden md:block py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-sans">
          
          {/* Left: Dateline & City Weather */}
          <div className="flex items-center gap-4 text-[11px] text-slate-300 tracking-wide">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>{currentDateString || 'Lunes, 7 de Septiembre de 2026'}</span>
            </span>
            <span className="text-cyan-500/30">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#ff6600]" />
              <span className="text-white font-medium">Guayaquil, Ecuador</span>
              <span className="text-cyan-400 font-mono text-[10px] bg-cyan-950/60 px-1.5 py-0.2 border border-cyan-500/40">1080p HD</span>
            </span>
            <span className="text-cyan-500/30">|</span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>29°C • Ría Guayas</span>
            </span>
          </div>

          {/* Center / Right: Synchronized Live Viewers & Verified Broadcast */}
          <div className="flex items-center gap-3 text-[11px]">
            {liveConfig.isLive && (
              <a
                href="#en-vivo"
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-cyan-950/60 border border-cyan-500/40 text-[#00f0ff] font-mono text-[11px] font-semibold hover:border-[#00f0ff] transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                title="Espectadores conectados y sincronizados en tiempo real"
              >
                <span className="w-2 h-2 rounded-full bg-[#ff6600] animate-ping"></span>
                <Users className="w-3 h-3 text-[#00f0ff]" />
                <span className="font-bold text-white tracking-wide">{syncedViewersCount.toLocaleString('es-EC')}</span>
                <span className="text-slate-400 text-[10px]">en vivo</span>
              </a>
            )}

            <span className="text-cyan-500/30">|</span>

            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/50 px-2 py-0.5 border border-emerald-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>SEÑAL OFICIAL</span>
            </span>

            <span className="text-cyan-500/30">|</span>

            <button 
              onClick={() => onOpenAdmin('live')}
              className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#ff6600]/20 hover:bg-[#ff6600] text-[#ff8c33] hover:text-black border border-[#ff6600]/70 font-bold uppercase text-[10px] tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_10px_rgba(255,102,0,0.3)] hover:shadow-[0_0_15px_rgba(255,102,0,0.7)]"
              title="Acceso editorial para administrar contenidos y transmisiones"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Panel Admin</span>
            </button>

            <span className="text-cyan-500/30">|</span>

            <button 
              onClick={onOpenWebmasterGuide}
              className="flex items-center gap-1 text-[#00f0ff] hover:text-white font-medium transition-colors cursor-pointer"
              title="Manual técnico de redacción y transmisión"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>Manual</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. NEON MASTHEAD BRAND SECTION */}
      <div className={`transition-all duration-200 ${isScrolled ? 'py-2.5' : 'py-3.5 sm:py-4.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Futuristic Neon Brand Logo */}
            <a 
              href="#inicio" 
              className="flex items-center gap-3 group cursor-pointer select-none"
              onClick={() => onSelectCategory('Todas')}
            >
              {/* Neon Emblem */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black border-2 border-[#00f0ff] flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] group-hover:border-[#ff6600] transition-all duration-300">
                <Tv className="w-6 h-6 text-[#00f0ff] group-hover:text-[#ff6600] transition-colors" />
              </div>
              
              {/* Brand Typography */}
              <div className="flex flex-col text-left">
                <div className="flex items-baseline leading-none">
                  <span className="font-cyber text-2xl sm:text-3xl font-extrabold tracking-wider text-white group-hover:text-[#00f0ff] transition-colors">
                    GYE
                  </span>
                  <span className="ml-1 text-2xl sm:text-3xl font-cyber font-extrabold text-[#00f0ff] neon-text-cyan">
                    TV
                  </span>
                  <span className="ml-1 text-2xl sm:text-3xl font-black text-[#ff6600] neon-text-orange animate-pulse">
                    +
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold text-[#00f0ff] font-mono">
                    PORTAL DIGITAL & TRANSMISIÓN
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6600] animate-ping"></span>
                </div>
              </div>
            </a>

            {/* Center: Prestigious Broadcast Slogan */}
            <div className="hidden xl:flex flex-col items-center justify-center text-center px-6 py-1 bg-black/40 border-x border-cyan-500/20">
              <div className="flex items-center gap-2 text-xs text-white font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span className="text-slate-200 tracking-wide font-sans">
                  INFORMACIÓN EN TIEMPO REAL • GUAYAQUIL Y EL MUNDO
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#ff6600]" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#00f0ff] font-mono mt-0.5">
                SEÑAL DIGITAL 24/7 EN ALTA DEFINICIÓN
              </span>
            </div>

            {/* Right: Controls (Search, Neon EN VIVO Button, Mobile Menu) */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-3.5 py-2 text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-[#00f0ff] transition-all duration-200 text-xs font-semibold cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                title="Buscar en archivo de noticias"
                aria-label="Buscar noticias"
              >
                <Search className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span className="hidden sm:inline font-sans uppercase tracking-wider text-[11px]">Buscar</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.2 text-[9px] font-mono text-[#00f0ff] bg-black border border-cyan-500/40">
                  Ctrl+K
                </kbd>
              </button>

              {/* High-Voltage Neon 🔴 EN DIRECTO Button */}
              <a
                href="#en-vivo"
                id="btn-header-en-vivo"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6600] to-[#ff3300] hover:from-[#ff7700] hover:to-[#ff4400] text-white font-extrabold text-xs uppercase tracking-widest border border-white/20 transition-all duration-200 shadow-[0_0_20px_rgba(255,102,0,0.6)] hover:shadow-[0_0_30px_rgba(255,102,0,0.9)] hover:scale-[1.02] cursor-pointer"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-[0_0_8px_#ffffff]"></span>
                </span>
                <span>EN VIVO</span>
              </a>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white bg-slate-900 border border-cyan-500/40 hover:border-[#00f0ff] transition-colors"
                aria-label="Menú de Secciones"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff6600]" /> : <Menu className="w-5 h-5 text-[#00f0ff]" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. NEON NAVIGATION ROW */}
      <div className="hidden lg:block bg-[#040711] border-t border-b border-cyan-500/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between py-1">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = link.category && selectedCategory === link.category && link.label !== 'PORTADA';
                const isPortadaActive = link.label === 'PORTADA' && selectedCategory === 'Todas';
                
                return link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => handleNavClick(link)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                      isActive || isPortadaActive
                        ? 'text-black bg-[#00f0ff] border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.7)]' 
                        : link.highlight === 'orange'
                        ? 'text-[#ff8c33] hover:text-white hover:bg-[#ff6600]/20 border-transparent hover:border-[#ff6600]/50'
                        : 'text-slate-200 hover:text-[#00f0ff] hover:bg-cyan-950/40 border-transparent hover:border-cyan-500/40'
                    }`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link)}
                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-[#ff6600] hover:bg-orange-950/30 border border-transparent hover:border-orange-500/40 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Synchronized Real-time Status Badge */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
              <span className="tracking-wider">TRANSMISIÓN SINCRONIZADA • {syncedViewersCount.toLocaleString('es-EC')} AUDIENCIA</span>
            </div>
          </nav>
        </div>
      </div>

      {/* 4. MOBILE SECTION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b18] border-b-2 border-[#00f0ff] shadow-[0_10px_30px_rgba(0,0,0,0.8)] px-4 py-4 animate-in slide-in-from-top duration-150">
          <div className="flex flex-col gap-2">
            
            <a
              href="#en-vivo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-[#ff6600] to-[#ff3300] text-white font-black uppercase tracking-wider text-xs border border-white/30 shadow-[0_0_15px_rgba(255,102,0,0.5)]"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>SINTONIZAR EN VIVO ({syncedViewersCount.toLocaleString('es-EC')} ESPECTADORES)</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </a>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href || '#'}
                  onClick={() => handleNavClick(link)}
                  className="flex items-center justify-between p-2.5 bg-slate-900/90 hover:bg-cyan-950/60 text-white hover:text-[#00f0ff] text-xs font-bold uppercase tracking-wide border border-cyan-500/20 hover:border-[#00f0ff] transition-all"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin('live');
                }}
                className="text-[#ff6600] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 bg-orange-950/40 px-2 py-1 border border-orange-500/40 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Acceso Admin</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWebmasterGuide();
                }}
                className="text-[#00f0ff] font-bold uppercase tracking-wider text-[11px] underline cursor-pointer"
              >
                Manual Técnico
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
