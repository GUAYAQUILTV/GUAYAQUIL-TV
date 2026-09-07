/**
 * Helper utilities for extracting embed IDs from YouTube and Dailymotion URLs
 */

export function extractYouTubeId(input: string): string {
  if (!input) return 'jfKfPfyJRdk';
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{10,15}$/.test(trimmed)) {
    return trimmed;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  return (match && match[2].length === 11) ? match[2] : trimmed;
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
