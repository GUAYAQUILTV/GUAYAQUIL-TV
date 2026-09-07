import React, { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Header } from './components/Header';
import { AdminBar } from './components/AdminBar';
import { AdminModal } from './components/AdminModal';
import { BreakingTicker } from './components/BreakingTicker';
import { Hero } from './components/Hero';
import { UrgentFeatured } from './components/UrgentFeatured';
import { LivePlayer } from './components/LivePlayer';
import { NewsSection } from './components/NewsSection';
import { CategorySection } from './components/CategorySection';
import { SportsSection } from './components/SportsSection';
import { EntertainmentSection } from './components/EntertainmentSection';
import { SocialSection } from './components/SocialSection';
import { NewsletterSection } from './components/NewsletterSection';
import { AdBanner } from './components/AdBanner';
import { Footer } from './components/Footer';
import { NewsModal } from './components/NewsModal';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import { WebmasterGuideModal } from './components/WebmasterGuideModal';

// New Restructured Views (10-point specifications)
import { ProgramScheduleView } from './components/ProgramScheduleView';
import { ShowsCatalogView } from './components/ShowsCatalogView';
import { NewsCatalogView } from './components/NewsCatalogView';
import { VideoLibraryView } from './components/VideoLibraryView';
import { BottomNavBar } from './components/BottomNavBar';
import { NewsItem, CategoryType } from './types';

function AppContent() {
  const { newsList, adBanners } = useData();
  const [currentTab, setCurrentTab] = useState<'inicio' | 'programacion' | 'programas' | 'noticias' | 'videos'>('inicio');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Todas');
  const [activeNewsModal, setActiveNewsModal] = useState<NewsItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isWebmasterGuideOpen, setIsWebmasterGuideOpen] = useState(false);
  
  // Admin modal state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState<'live' | 'news' | 'alerts' | 'sports' | 'videos' | 'ads' | 'backup'>('live');

  const handleOpenAdmin = (tab: 'live' | 'news' | 'alerts' | 'sports' | 'videos' | 'ads' | 'backup' = 'live') => {
    setAdminActiveTab(tab);
    setIsAdminOpen(true);
  };

  const heroFeaturedNews = newsList.find(n => n.isFeatured) || newsList[0];
  const urgentFeaturedNews = newsList.find(n => n.isUrgent && n.id !== heroFeaturedNews?.id) || newsList[1] || newsList[0];

  const handleOpenLive = () => {
    setCurrentTab('inicio');
    setTimeout(() => {
      const liveElem = document.getElementById('en-vivo');
      if (liveElem) {
        liveElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-[#00f0ff] selection:text-black font-sans relative pb-16 lg:pb-0">
      
      {/* Admin Fast Actions Sticky Bar */}
      <AdminBar onOpenAdmin={handleOpenAdmin} />

      {/* 1. Breaking News Ticker (Cintillo de Última Hora) */}
      <BreakingTicker
        news={newsList}
        onSelectNews={(item) => setActiveNewsModal(item)}
      />

      {/* 2. Main Header / Navigation */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentTab('noticias');
        }}
        selectedCategory={selectedCategory}
        onOpenWebmasterGuide={() => setIsWebmasterGuideOpen(true)}
        onOpenContactModal={() => setIsContactOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Secondary App Navigation Tabs Bar */}
      <div className="bg-[#040711] border-b border-cyan-500/20 hidden lg:block sticky top-[95px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2">
          <div className="flex items-center gap-1">
            {[
              {id: 'inicio', label: '🏠 INICIO'},
              {id: 'envivo', label: '🔴 EN VIVO', isLive: true},
              {id: 'programacion', label: '📺 PROGRAMACIÓN'},
              {id: 'programas', label: '🎬 PROGRAMAS'},
              {id: 'noticias', label: '📰 NOTICIAS'},
              {id: 'videos', label: '🎥 VIDEOS'},
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'envivo') {
                    handleOpenLive();
                  } else {
                    setCurrentTab(tab.id as any);
                  }
                }}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  tab.id === 'envivo'
                    ? 'bg-[#ff6600] text-black border-[#ff6600] shadow-[0_0_15px_rgba(255,102,0,0.6)] font-extrabold'
                    : currentTab === tab.id
                    ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.6)]'
                    : 'bg-transparent text-slate-200 hover:text-[#00f0ff] hover:bg-cyan-950/40 border-transparent hover:border-cyan-500/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff]">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping"></span>
            <span>GYE TV+ • PLATAFORMA DIGITAL INTEGRAL</span>
          </div>
        </div>
      </div>

      {/* Main Content Area based on Selected Tab */}
      <main className="flex-1">
        {currentTab === 'inicio' && (
          <>
            {/* Hero Section */}
            {heroFeaturedNews && (
              <Hero
                featuredNews={heroFeaturedNews}
                onSelectNews={(news) => setActiveNewsModal(news)}
                onOpenLive={handleOpenLive}
              />
            )}

            {/* Urgent News Featured */}
            {urgentFeaturedNews && (
              <UrgentFeatured
                news={urgentFeaturedNews}
                onSelectNews={(news) => setActiveNewsModal(news)}
              />
            )}

            {/* Ad Banner Leaderboard */}
            {adBanners.headerLeaderboard && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <AdBanner
                  config={adBanners.headerLeaderboard}
                  onOpenContact={() => setIsContactOpen(true)}
                />
              </div>
            )}

            {/* Recent News Grid */}
            <NewsSection
              newsList={newsList}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              onSelectNews={(news) => setActiveNewsModal(news)}
            />

            {/* Live Player Section (🔴 EN VIVO) */}
            <LivePlayer
              onOpenWebmasterGuide={() => setIsWebmasterGuideOpen(true)}
              onOpenAdmin={handleOpenAdmin}
            />

            {/* Categories */}
            <CategorySection
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setCurrentTab('noticias');
              }}
            />

            {/* Sports */}
            <SportsSection
              newsList={newsList}
              onSelectNews={(news) => setActiveNewsModal(news)}
            />

            {/* Entertainment */}
            <EntertainmentSection
              newsList={newsList}
              onSelectNews={(news) => setActiveNewsModal(news)}
            />

            {/* Social & Newsletter */}
            <SocialSection />
            <NewsletterSection />
          </>
        )}

        {currentTab === 'programacion' && (
          <ProgramScheduleView onOpenLive={handleOpenLive} />
        )}

        {currentTab === 'programas' && (
          <ShowsCatalogView onOpenLive={handleOpenLive} />
        )}

        {currentTab === 'noticias' && (
          <NewsCatalogView newsList={newsList} onSelectNews={(news) => setActiveNewsModal(news)} />
        )}

        {currentTab === 'videos' && (
          <VideoLibraryView onOpenLive={handleOpenLive} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentTab('noticias');
        }}
        onOpenWebmasterGuide={() => setIsWebmasterGuideOpen(true)}
        onOpenContactModal={() => setIsContactOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Bottom Navigation Bar for Mobile */}
      <BottomNavBar
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab as any)}
        onOpenLive={handleOpenLive}
      />

      {/* Modals */}
      <NewsModal
        news={activeNewsModal}
        onClose={() => setActiveNewsModal(null)}
        onSelectRelated={(item) => setActiveNewsModal(item)}
        allNews={newsList}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        newsList={newsList}
        onSelectNews={(news) => setActiveNewsModal(news)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <WebmasterGuideModal
        isOpen={isWebmasterGuideOpen}
        onClose={() => setIsWebmasterGuideOpen(false)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        initialTab={adminActiveTab}
      />

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
