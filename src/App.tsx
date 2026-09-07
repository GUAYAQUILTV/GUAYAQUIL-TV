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
import { NewsItem, CategoryType } from './types';

function AppContent() {
  const { newsList, adBanners } = useData();
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

  // Top featured and urgent news items (computed dynamically from live synchronized state)
  const heroFeaturedNews = newsList.find(n => n.isFeatured) || newsList[0];
  const urgentFeaturedNews = newsList.find(n => n.isUrgent && n.id !== heroFeaturedNews?.id) || newsList[1] || newsList[0];

  const handleOpenLive = () => {
    const liveElem = document.getElementById('en-vivo');
    if (liveElem) {
      liveElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-[#00f0ff] selection:text-black font-sans relative">
      
      {/* Admin Fast Actions Sticky Bar (Only visible when logged in as Admin) */}
      <AdminBar onOpenAdmin={handleOpenAdmin} />

      {/* 1. Breaking News Ticker (Cintillo de Última Hora - Real-time synchronized) */}
      <BreakingTicker
        news={newsList}
        onSelectNews={(item) => setActiveNewsModal(item)}
      />

      {/* 2. Main Header / Navigation */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        selectedCategory={selectedCategory}
        onOpenWebmasterGuide={() => setIsWebmasterGuideOpen(true)}
        onOpenContactModal={() => setIsContactOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 3. Hero Section (Portada Principal Guayaquil) */}
        {heroFeaturedNews && (
          <Hero
            featuredNews={heroFeaturedNews}
            onSelectNews={(news) => setActiveNewsModal(news)}
            onOpenLive={handleOpenLive}
          />
        )}

        {/* 4. Noticia Destacada / Urgente */}
        {urgentFeaturedNews && (
          <UrgentFeatured
            news={urgentFeaturedNews}
            onSelectNews={(news) => setActiveNewsModal(news)}
          />
        )}

        {/* Publicidad Banner Leaderboard Superior */}
        {adBanners.headerLeaderboard && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdBanner
              config={adBanners.headerLeaderboard}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </div>
        )}

        {/* 5. Últimas Noticias Grid */}
        <NewsSection
          newsList={newsList}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onSelectNews={(news) => setActiveNewsModal(news)}
        />

        {/* 6. GYE TV+ EN VIVO (Reproductor Live & Chat con sincronización inmediata) */}
        <LivePlayer
          onOpenWebmasterGuide={() => setIsWebmasterGuideOpen(true)}
          onOpenAdmin={handleOpenAdmin}
        />

        {/* 7. Explora GYE TV+ (Categorías) */}
        <CategorySection
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* 8. Deportes GYE TV+ (Liga Pro, BSC, Emelec, IDV, La Tri) */}
        <SportsSection
          newsList={newsList}
          onSelectNews={(news) => setActiveNewsModal(news)}
        />

        {/* 9. Entretenimiento (Música, Shows, Tendencias) */}
        <EntertainmentSection
          newsList={newsList}
          onSelectNews={(news) => setActiveNewsModal(news)}
        />

        {/* 10. Redes Sociales (Síguenos) */}
        <SocialSection />

        {/* 13. Boletín / Newsletter (Recibe las Noticias) */}
        <NewsletterSection />

      </main>

      {/* 14. Footer */}
      <Footer
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenWebmasterGuide={() => setIsWebmasterGuideOpen(true)}
        onOpenContactModal={() => setIsContactOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Modal 1: Article Reader Modal */}
      <NewsModal
        news={activeNewsModal}
        onClose={() => setActiveNewsModal(null)}
        onSelectRelated={(item) => setActiveNewsModal(item)}
        allNews={newsList}
      />

      {/* Modal 2: Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        newsList={newsList}
        onSelectNews={(news) => setActiveNewsModal(news)}
      />

      {/* Modal 3: Contact & Citizen Report Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Modal 4: Webmaster Technical & Configuration Guide Modal */}
      <WebmasterGuideModal
        isOpen={isWebmasterGuideOpen}
        onClose={() => setIsWebmasterGuideOpen(false)}
      />

      {/* Modal 5: Master Admin Modal (Real-time synchronization for admin guayaquiltv) */}
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
