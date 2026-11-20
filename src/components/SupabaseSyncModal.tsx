'use client';

import React, { useState } from 'react';
import { 
  Cloud, 
  Database, 
  Check, 
  Copy, 
  X, 
  Save, 
  RefreshCw, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { 
  getStoredSupabaseConfig, 
  saveStoredSupabaseConfig, 
  clearStoredSupabaseConfig, 
  getSupabaseClient 
} from '@/lib/supabase';

interface SupabaseSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncNow: () => Promise<void>;
  isSyncing: boolean;
}

export const SupabaseSyncModal: React.FC<SupabaseSyncModalProps> = ({
  isOpen,
  onClose,
  onSyncNow,
  isSyncing,
}) => {
  const [config, setConfig] = useState(getStoredSupabaseConfig());
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const sqlSchemaCode = `-- Jalankan ini di Supabase SQL Editor:
create table if not exists public.skripsi_sync (
  id text primary key default 'primary_student_data',
  payload jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.skripsi_sync enable row level security;
create policy "Allow read" on public.skripsi_sync for select using (true);
create policy "Allow insert" on public.skripsi_sync for insert with check (true);
create policy "Allow update" on public.skripsi_sync for update using (true);

insert into storage.buckets (id, name, public) values ('skripsi-documents', 'skripsi-documents', true)
on conflict (id) do update set public = true;
create policy "Public Access" on storage.objects for select using (bucket_id = 'skripsi-documents');
create policy "Public Upload" on storage.objects for insert with check (bucket_id = 'skripsi-documents');
create policy "Public Update" on storage.objects for update using (bucket_id = 'skripsi-documents');
create policy "Public Delete" on storage.objects for delete using (bucket_id = 'skripsi-documents');`;

  const handleTestConnection = async () => {
    if (!config.url || !config.anonKey) {
      setTestStatus('failed');
      setTestMessage('Mohon isi Supabase Project URL dan Anon Key.');
      return;
    }

    setTestStatus('testing');
    setTestMessage('Menghubungkan ke Supabase...');

    try {
      saveStoredSupabaseConfig(config);
      const client = getSupabaseClient();
      if (!client) {
        throw new Error('URL Supabase tidak valid (harus diawali https://).');
      }

      const { error } = await client.from('skripsi_sync').select('id').limit(1);
      if (error && error.code !== 'PGRST116') {
        if (error.message.includes('relation "public.skripsi_sync" does not exist')) {
          setTestStatus('failed');
          setTestMessage('Tabel "skripsi_sync" belum dibuat di Supabase. Jalankan SQL migration!');
          return;
        }
        throw new Error(error.message);
      }

      setTestStatus('success');
      setTestMessage('Koneksi Supabase Berhasil! Cloud sync aktif.');
    } catch (err: any) {
      setTestStatus('failed');
      setTestMessage(err.message || 'Gagal terhubung ke Supabase.');
    }
  };

  const handleSaveAndSync = async () => {
    saveStoredSupabaseConfig(config);
    await onSyncNow();
    onClose();
  };

  const handleClear = () => {
    if (confirm('Putuskan koneksi Supabase dan kembali ke penyimpanan lokal saja?')) {
      clearStoredSupabaseConfig();
      setConfig({ url: '', anonKey: '' });
      setTestStatus('idle');
      setTestMessage('');
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchemaCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const isConnected = Boolean(config.url && config.anonKey);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full max-w-2xl max-h-[92vh] sm:max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl shrink-0">
              <Database className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">Sinkronisasi Cloud Supabase</h3>
              <p className="text-[11px] text-slate-500">Database multi-platform (Akses via HP, Tablet, & Laptop).</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Status Alert */}
          <div className={`p-3.5 sm:p-4 rounded-xl border flex items-start gap-2.5 sm:gap-3 ${
            isConnected
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div className="mt-0.5 shrink-0">
              {isConnected ? (
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              )}
            </div>
            <div>
              <h4 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider">
                {isConnected ? 'Kredensial Terpasang & Aktif' : 'Mode Offline / Lokal'}
              </h4>
              <p className="text-xs mt-0.5 leading-relaxed">
                {isConnected
                  ? 'Data skripsi Anda otomatis tersinkronisasi di semua perangkat via Supabase PostgreSQL.'
                  : 'Hubungkan Supabase agar data Anda dapat dibuka dari HP maupun laptop lain!'}
              </p>
            </div>
          </div>

          {/* Form Credentials */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Supabase Project URL
              </label>
              <input
                type="text"
                placeholder="https://xyzcompany.supabase.co"
                value={config.url}
                onChange={(e) => setConfig({ ...config, url: e.target.value.trim() })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Supabase Anon (Public) Key
              </label>
              <input
                type="password"
                placeholder="sb_publishable_... / eyJhbGci..."
                value={config.anonKey}
                onChange={(e) => setConfig({ ...config, anonKey: e.target.value.trim() })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Test Connection Button */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testStatus === 'testing' || !config.url || !config.anonKey}
                className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-lg transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
                Uji Koneksi
              </button>

              {testMessage && (
                <span className={`text-xs font-medium ${
                  testStatus === 'success' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {testMessage}
                </span>
              )}
            </div>
          </div>

          {/* SQL Migration Helper */}
          <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                SQL Migration
              </span>
              <button
                onClick={handleCopySql}
                className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSql ? 'Tersalin!' : 'Salin SQL'}
              </button>
            </div>
            <pre className="text-[10px] bg-slate-900 text-slate-200 p-2.5 rounded-lg overflow-x-auto font-mono max-h-28">
              {sqlSchemaCode}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-50 shrink-0">
          {isConnected ? (
            <button
              onClick={handleClear}
              className="text-xs text-rose-600 hover:underline font-semibold"
            >
              Putuskan
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition"
            >
              Tutup
            </button>
            <button
              onClick={handleSaveAndSync}
              disabled={isSyncing}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSyncing ? 'Menyinkronkan...' : 'Simpan & Sinkronkan'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
