import { AppData } from '@/types';
import { getSupabaseClient } from './supabase';

const SYNC_ROW_ID = 'primary_student_data';

export async function fetchCloudData(): Promise<AppData | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('skripsi_sync')
      .select('payload')
      .eq('id', SYNC_ROW_ID)
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetch notice:', error.message);
      return null;
    }

    if (data && data.payload) {
      return data.payload as AppData;
    }
  } catch (err) {
    console.error('Error fetching data from Supabase:', err);
  }

  return null;
}

export async function saveCloudData(appData: AppData): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('skripsi_sync')
      .upsert({
        id: SYNC_ROW_ID,
        payload: appData,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Failed to sync data to Supabase:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Exception syncing data to Supabase:', err);
    return false;
  }
}

export async function uploadFileToSupabaseStorage(file: File): Promise<{ success: boolean; fileUrl?: string; error?: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: false, error: 'Supabase belum terkonfigurasi' };
  }

  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `${Date.now()}_${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('skripsi-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      return { success: false, error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from('skripsi-documents')
      .getPublicUrl(filePath);

    return {
      success: true,
      fileUrl: publicUrlData.publicUrl,
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Gagal mengunggah ke Supabase Storage' };
  }
}

