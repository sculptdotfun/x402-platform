import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatUSD(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}

export function generateShortId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function truncateAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function getDomainConfig() {
  const host = typeof window !== 'undefined' ? window.location.host : '';
  
  const isLink = host.includes('x402.link') || process.env.NEXT_PUBLIC_DOMAIN === 'x402.link';
  const isMe = host.includes('x402.me') || process.env.NEXT_PUBLIC_DOMAIN === 'x402.me';
  
  // Default to link for development
  if (!isLink && !isMe) {
    return {
      domain: 'x402.link',
      isLink: true,
      isMe: false,
    };
  }
  
  return {
    domain: isLink ? 'x402.link' : 'x402.me',
    isLink,
    isMe,
  };
}