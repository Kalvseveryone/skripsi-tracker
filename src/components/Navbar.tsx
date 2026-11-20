'use client';

import React from 'react';
import { 
  GraduationCap, 
  UserCheck, 
  Download, 
  Upload, 
  RotateCcw, 
  Sparkles,
  HelpCircle,
  Play
} from 'lucide-react';
import { StudentProfile } from '@/types';

interface NavbarProps {
  profile: StudentProfile;
  overallProgress: number;
  onEditProfile: () => void;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetData: () => void;
  onLoadDemoData: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  overallProgress,
  onEditProfile,
  onExportData,
  onImportData,
  onResetData,
  onLoadDemoData,
  activeTab,
  setActiveTab
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const navItems = [
    { id: 'overview', label: 'Ringkasan' },
    { id: 'milestones', label: 'Tahapan & Bab' },
    { id: 'bimbingan', label: 'Log Bimbingan' },
    { id: 'tasks', label: 'Tugas & Target' },
    { id: 'documents', label: 'Naskah & Berkas' },
    { id: 'print', label: 'Cetak Lembar Kontrol' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-lg tracking-tight">SkripsiTracker</span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block truncate max-w-xs">
                {profile.programStudi ? `${profile.programStudi} • ${profile.universitas}` : 'Pantau Tugas Akhir Mahasiswa'}
              </p>
            </div>
          </div>

          {/* Quick Progress Bar */}
          <div className="hidden md:flex items-center space-x-3 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
            <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Progres Skripsi:
            </span>
            <div className="w-28 bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-emerald-700">{overallProgress}%</span>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onEditProfile}
              className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-medium rounded-lg transition border ${
                profile.nama
                  ? 'text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border-slate-200'
                  : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-300 font-bold animate-pulse'
              }`}
              title="Edit Profil & Dosen Pembimbing"
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>{profile.nama ? profile.nama.split(' ')[0] : 'Isi Profil Anda'}</span>
              {profile.nim && <span className="text-slate-400 hidden lg:inline">({profile.nim})</span>}
            </button>

            {/* Quick Demo & Reset Actions */}
            <div className="flex items-center space-x-1 border-l border-slate-200 pl-2">
              <button
                onClick={onLoadDemoData}
                title="Muat Data Contoh / Demo"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 rounded-lg transition"
              >
                <Play className="w-3 h-3 text-indigo-500" />
                <span>Demo</span>
              </button>

              <button
                onClick={onExportData}
                title="Cadangkan / Ekspor Data JSON"
                className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition"
              >
                <Download className="w-4 h-4" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={onImportData}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Pulihkan / Impor Data JSON"
                className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition"
              >
                <Upload className="w-4 h-4" />
              </button>

              <button
                onClick={onResetData}
                title="Kosongkan Data (Mulai Bersih)"
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar border-t border-slate-100 py-2">
          {navItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
