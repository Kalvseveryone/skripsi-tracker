import { AppData } from '@/types';
import { INITIAL_APP_DATA, DEMO_APP_DATA } from './constants';

const STORAGE_KEY = 'skripsi_tracker_app_data_v2';

export function loadAppData(): AppData {
  if (typeof window === 'undefined') {
    return INITIAL_APP_DATA;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveAppData(INITIAL_APP_DATA);
      return INITIAL_APP_DATA;
    }
    const parsed = JSON.parse(raw) as AppData;
    if (!parsed.profile || !parsed.milestones || !parsed.bimbinganLogs || !parsed.tasks) {
      return INITIAL_APP_DATA;
    }
    return parsed;
  } catch (error) {
    console.error('Failed to parse app data from localStorage:', error);
    return INITIAL_APP_DATA;
  }
}

export function saveAppData(data: AppData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save app data to localStorage:', error);
  }
}

export function resetAppData(): AppData {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    saveAppData(INITIAL_APP_DATA);
  }
  return INITIAL_APP_DATA;
}

export function loadDemoData(): AppData {
  if (typeof window !== 'undefined') {
    saveAppData(DEMO_APP_DATA);
  }
  return DEMO_APP_DATA;
}

export function exportDataAsJson(data: AppData): void {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  const date = new Date().toISOString().slice(0, 10);
  downloadAnchor.setAttribute('download', `skripsi-tracker-backup-${date}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
