import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export function keywordsToPipeline(keywords: string[]): string {
  return keywords.join(' | ');
}

export function keywordsToTags(keywords: string[]): string[] {
  return keywords.map(keyword =>
    keyword.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Hapus karakter khusus
      .split(/[\s-]+/) // Split berdasarkan spasi atau dash
      .filter(word => word.length > 0) // Hapus string kosong
      .join('-') // Gabung dengan dash
      .trim()
  );
}

export function getUrlFriendlyTags(keywords: string[]): string {
  return keywordsToTags(keywords).join(',');
}
