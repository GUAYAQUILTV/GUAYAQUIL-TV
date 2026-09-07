/**
 * Universal Stream Parser & Helper for GYE TV+
 * Automatically detects and handles YouTube, Dailymotion, Iframe embed snippets, HLS (.m3u8), Direct video files (.mp4/.webm), and Image URLs.
 */

export type StreamType = 'youtube' | 'dailymotion' | 'iframe' | 'video' | 'image' | 'demo';

export interface ParsedStreamInfo {
  type: StreamType;
  src: string;
}

export function extractYouTubeId(input: string): string {
  if (!input) return 'jfKfPfyJRdk';
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{10,15}$/.test(trimmed)) {
    return trimmed;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  return (match && match[2] && match[2].length === 11) ? match[2] : trimmed;
}

export function extractDailymotionId(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (/^[a-z0-9]{6,16}$/i.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/(?:dailymotion\.com\/video\/|dai\.ly\/)([a-zA-Z0-9]+)/);
  return match ? match[1] : trimmed;
}

export function parseUniversalStream(inputUrl: string, fallbackType: string = 'demo'): ParsedStreamInfo {
  if (!inputUrl || !inputUrl.trim()) {
    return { type: (fallbackType as StreamType) || 'demo', src: '' };
  }

  const trimmed = inputUrl.trim();

  // 1. Check if pasted an iframe HTML embed code (e.g. <iframe src="..."></iframe>)
  if (trimmed.startsWith('<iframe') && trimmed.includes('src="')) {
    const srcMatch = trimmed.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
      return parseUniversalStream(srcMatch[1], fallbackType);
    }
  }

  // 2. Check if YouTube
  if (
    trimmed.includes('youtube.com') ||
    trimmed.includes('youtu.be') ||
    (trimmed.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(trimmed))
  ) {
    return { type: 'youtube', src: extractYouTubeId(trimmed) };
  }

  // 3. Check if Dailymotion
  if (trimmed.includes('dailymotion.com') || trimmed.includes('dai.ly')) {
    return { type: 'dailymotion', src: extractDailymotionId(trimmed) };
  }

  // 4. Check if direct video file or HLS stream (.mp4, .webm, .m3u8, blob:)
  if (
    trimmed.match(/\.(mp4|webm|ogg|mov|m3u8|ts)(\?.*)?$/i) ||
    trimmed.startsWith('blob:') ||
    trimmed.includes('commondatastorage.googleapis.com') ||
    trimmed.includes('hls') ||
    trimmed.includes('m3u8')
  ) {
    return { type: 'video', src: trimmed };
  }

  // 5. Check if image / photo URL
  if (trimmed.match(/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i) || trimmed.includes('unsplash.com')) {
    return { type: 'image', src: trimmed };
  }

  // 6. General URL (iframe embed)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return { type: 'iframe', src: trimmed };
  }

  return { type: 'demo', src: trimmed };
}
