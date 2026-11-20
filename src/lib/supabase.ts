import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Kredensial Proyek Supabase default (Public/Anon Publishable Key)
export const DEFAULT_SUPABASE_URL = 'https://yxohqewnlufniwvrzmsn.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_6_jGHNrUl7o8RFtsQwVbfA_K1Oytshl';

const SUPABASE_CONFIG_STORAGE_KEY = 'skripsi_supabase_client_config';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getStoredSupabaseConfig(): SupabaseConfig {
  if (typeof window === 'undefined') {
    return {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY,
    };
  }

  // Check custom override in localStorage
  try {
    const raw = localStorage.getItem(SUPABASE_CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to read Supabase config from localStorage:', err);
  }

  // Check environment variables or use project defaults
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return {
    url: envUrl || DEFAULT_SUPABASE_URL,
    anonKey: envKey || DEFAULT_SUPABASE_ANON_KEY,
  };
}

export function saveStoredSupabaseConfig(config: SupabaseConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SUPABASE_CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save Supabase config to localStorage:', err);
  }
}

export function clearStoredSupabaseConfig(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SUPABASE_CONFIG_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear Supabase config:', err);
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getStoredSupabaseConfig();
  if (!url || !anonKey || !url.startsWith('https://')) {
    return null;
  }
  try {
    return createClient(url, anonKey);
  } catch (err) {
    console.error('Failed to create Supabase client:', err);
    return null;
  }
}

export function isSupabaseConnected(): boolean {
  const config = getStoredSupabaseConfig();
  return Boolean(config.url && config.anonKey && config.url.startsWith('https://'));
}
