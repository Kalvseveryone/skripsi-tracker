'use client';

import React from 'react';
import { 
  GraduationCap, 
  UserCheck, 
  Download, 
  Upload, 
  RotateCcw, 
  Sparkles,
  Play,
  Cloud,
  LayoutDashboard,
  BookMarked,
  MessageSquare,
  ListTodo,
  FileText,
  Printer
} from 'lucide-react';
import { StudentProfile } from '@/types';
import { isSupabaseConnected } from '@/lib/supabase';

interface NavbarProps {
  profile: StudentProfile;
  overallProgress: number;
  onEditProfile: () => void;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetData: () => void;
  onLoadDemoData: () => void;
  onOpenSupabaseModal?: () => void;
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
  onOpenSupabaseModal,
  activeTab,
  setActiveTab
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const isCloudActive = typeof window !== 'undefined' ? isSupabaseConnected() : true;

  const navItems = [
    { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
    { id: 'milestones', label: 'Tahapan & Bab', icon: BookMarked },
    { id: 'bimbingan', label: 'Bimbingan', icon: MessageSquare },
    { id: 'tasks', label: 'Tugas', icon: ListTodo },
    { id: 'documents', label: 'Berkas', icon: FileText },
    { id: 'print', label: 'Cetak', icon: Printer },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Brand Logo & Name */}
            <div 
              className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer shrink-0" 
              onClick={() => setActiveTab('overview')}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">SkripsiTracker</span>
                  <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                    v1.0
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block truncate max-w-xs">
                  {profile.programStudi ? `${profile.programStudi} • ${profile.universitas}` : 'Pantau Tugas Akhir Mahasiswa'}
                </p>
              </div>
            </div>

            {/* Desktop Center Progress & Cloud status */}
            <div className="hidden md:flex items-center space-x-3">
              {onOpenSupabaseModal && (
                <button
                  onClick={onOpenSupabaseModal}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition ${
                    isCloudActive
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                  }`}
                  title="Status Cloud Sync"
                >
                  <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cloud Aktif</span>
                </button>
              )}

              <div className="flex items-center space-x-2.5 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
                <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Progres:
                </span>
                <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-emerald-700">{overallProgress}%</span>
              </div>
            </div>

            {/* Right Action Icons & Profile */}
            <div className="flex items-center space-x-1.5 sm:space-x-2.5">
              {/* Mobile Cloud Status Pill */}
              {onOpenSupabaseModal && (
                <button
                  onClick={onOpenSupabaseModal}
                  className="md:hidden flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg border bg-emerald-50 text-emerald-700 border-emerald-200"
                  title="Cloud Sync Status"
                >
                  <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px]">Cloud</span>
                </button>
              )}

              {/* Profile Button */}
              <button
                onClick={onEditProfile}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 text-xs font-medium rounded-lg transition border ${
                  profile.nama
                    ? 'text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border-slate-200'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-300 font-bold animate-pulse'
                }`}
                title="Edit Profil Skripsi"
              >
                <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="max-w-[80px] sm:max-w-none truncate font-semibold">
                  {profile.nama ? profile.nama.split(' ')[0] : 'Isi Profil'}
                </span>
              </button>

              {/* Quick Actions (Desktop & Mobile) */}
              <div className="flex items-center space-x-0.5 sm:space-x-1 border-l border-slate-200 pl-1.5 sm:pl-2">
                <button
                  onClick={onLoadDemoData}
                  title="Muat Data Contoh / Demo"
                  className="hidden lg:flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 rounded-lg transition"
                >
                  <Play className="w-3 h-3 text-indigo-500" />
                  <span>Demo</span>
                </button>

                <button
                  onClick={onExportData}
                  title="Cadangkan / Ekspor Data JSON"
                  className="p-1.5 sm:p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition"
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
                  className="p-1.5 sm:p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition"
                >
                  <Upload className="w-4 h-4" />
                </button>

                <button
                  onClick={onResetData}
                  title="Kosongkan Data (Mulai Bersih)"
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Secondary Horizontal Navigation Bar */}
          <div className="hidden md:flex space-x-2 overflow-x-auto no-scrollbar border-t border-slate-100 py-2">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Modern Mobile Bottom Navigation Bar (Thumb-Friendly for Smartphones) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1 shadow-lg shadow-slate-900/10 print:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-emerald-700 font-bold scale-105'
                    : 'text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                <div className={`p-1 rounded-lg transition ${isActive ? 'bg-emerald-100/80 text-emerald-700' : 'text-slate-500'}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
