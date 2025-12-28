// ============================================
// THE MIRROR - Utility Functions
// ============================================

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate a fake report ID for the UI
export function generateReportId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MR-${timestamp}-${random}`;
}

// Delay utility for animations
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Split text for typewriter effect
export function splitTextForTypewriter(text: string, chunkSize: number = 1): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(0, i + chunkSize));
  }
  return chunks;
}

// Parse the AI response into sections
export function parseReportSections(text: string): {
  mirror: string;
  origin: string;
  fatalSimulation: string;
} {
  const sections = {
    mirror: '',
    origin: '',
    fatalSimulation: ''
  };

  // Split by section headers
  const mirrorMatch = text.match(/【镜像投射】.*?\n([\s\S]*?)(?=【病灶溯源】|$)/);
  const originMatch = text.match(/【病灶溯源】.*?\n([\s\S]*?)(?=【宿命终局】|$)/);
  const fatalSimulationMatch = text.match(/【宿命终局】.*?\n([\s\S]*?)$/);

  if (mirrorMatch) sections.mirror = mirrorMatch[1].trim();
  if (originMatch) sections.origin = originMatch[1].trim();
  if (fatalSimulationMatch) sections.fatalSimulation = fatalSimulationMatch[1].trim();

  return sections;
}

// Generate random glitch characters
export function getGlitchChar(): string {
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▄▀■□▪▫';
  return glitchChars[Math.floor(Math.random() * glitchChars.length)];
}

// Create glitched text effect
export function glitchText(text: string, intensity: number = 0.1): string {
  return text
    .split('')
    .map(char => (Math.random() < intensity ? getGlitchChar() : char))
    .join('');
}

// Format timestamp for terminal logs
export function formatTimestamp(): string {
  const now = new Date();
  return `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}]`;
}
