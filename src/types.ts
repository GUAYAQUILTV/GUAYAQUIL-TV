export type CategoryType = 
  | 'Todas'
  | 'Guayaquil' 
  | 'Ecuador' 
  | 'Deportes' 
  | 'Entretenimiento' 
  | 'Cultura' 
  | 'Seguridad';

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface NewsItem {
  id: string;
  title: string;
  subtitle?: string;
  category: CategoryType;
  subcategory?: string;
  image: string;
  date: string;
  time: string;
  description: string;
  content: string[];
  author: Author;
  readTime: string;
  isFeatured?: boolean;
  isUrgent?: boolean;
  isBreaking?: boolean;
  tags: string[];
  viewsCount: number;
  source?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  date: string;
  thumbnail: string;
  youtubeId?: string;
  views: string;
  presenter?: string;
  description?: string;
}

export interface LiveScheduleItem {
  time: string;
  title: string;
  host: string;
  isCurrent?: boolean;
  category: string;
}

export interface LiveStreamConfig {
  isLive: boolean;
  title: string;
  currentShow: string;
  presenter: string;
  viewersCount: number;
  streamSource: 'youtube' | 'custom' | 'demo';
  youtubeEmbedId: string;
  customStreamUrl?: string;
  schedule: LiveScheduleItem[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: CategoryType;
  emoji: string;
  iconName: string;
  description: string;
  count: number;
  color: string;
  gradient: string;
  image: string;
}

export interface SocialLink {
  id: string;
  platform: 'Facebook' | 'Instagram' | 'TikTok' | 'YouTube' | 'X' | 'WhatsApp';
  name: string;
  url: string;
  handle: string;
  followers: string;
  icon: string;
  colorClass: string;
  bgHover: string;
}

export interface AdBannerConfig {
  id: string;
  slotName: string;
  format: 'leaderboard' | 'sidebar' | 'in-feed';
  dimensions: string;
  isPlaceholder: boolean;
  customBannerUrl?: string;
  customLinkUrl?: string;
  title?: string;
  subtitle?: string;
}

export interface SportsScore {
  id: string;
  homeTeam: string;
  homeScore: number;
  homeLogo: string;
  awayTeam: string;
  awayScore: number;
  awayLogo?: string;
  tournament: string;
  status: string;
  venue: string;
}

export interface AdminUser {
  username: string;
  name: string;
  role: string;
  avatar: string;
  authenticatedAt: string;
}

export interface BreakingAlert {
  id: string;
  text: string;
  timestamp: string;
  category?: string;
  active: boolean;
}

export interface LiveChatMessage {
  id: string;
  user: string;
  text: string;
  time: string;
  isAdmin?: boolean;
  avatar?: string;
}

export interface BroadcastFlashAlert {
  id: string;
  title: string;
  message: string;
  severity: 'urgent' | 'breaking' | 'info';
  active: boolean;
  timestamp: string;
}
