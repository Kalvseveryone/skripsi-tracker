'use client';

import React, { useState, useRef } from 'react';
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
  Printer,
  Menu,
  X,
  ChevronRight,
  Database
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);
  const isCloudActive = typeof window !== 'undefined' ? isSupabaseConnected() : true;

  const navItems = [
    { id: 'overview', label: 'Ringkasan', description: 'Dashboard & Statistik Utama', icon: LayoutDashboard },
    { id: 'milestones', label: 'Tahapan & Bab', description: '10 Tahapan Skripsi & Checklist', icon: BookMarked },
    { id: 'bimbingan', label: 'Bimbingan', description: 'Logbook Konsultasi Dosen', icon: MessageSquare },
    { id: 'tasks', label: 'Tugas', description: 'Daftar To-Do Revisi & Prioritas', icon: ListTodo },
    { id: 'documents', label: 'Berkas', description: 'Draft Dokumen & Lampiran', icon: FileText },
    { id: 'print', label: 'Cetak', description: 'Kartu Kendali Bimbingan A4', icon: Printer },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden w-full max-w-full">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Brand Logo & Name */}
            <div 
              className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer shrink-0" 
              onClick={() => handleNavClick('overview')}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
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

            {/* Desktop Right Action Icons & Profile */}
            <div className="hidden md:flex items-center space-x-2 sm:space-x-2.5">
              <button
                onClick={onEditProfile}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition border ${
                  profile.nama
                    ? 'text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border-slate-200'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-300 font-bold animate-pulse'
                }`}
                title="Edit Profil Skripsi"
              >
                <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="max-w-[120px] truncate font-semibold">
                  {profile.nama ? profile.nama.split(' ')[0] : 'Isi Profil'}
                </span>
              </button>

              <div className="flex items-center space-x-1 border-l border-slate-200 pl-2">
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

            {/* Mobile Header Right: Cloud Pill & Hamburger Menu Button ONLY */}
            <div className="flex md:hidden items-center space-x-1.5 shrink-0">
              {onOpenSupabaseModal && (
                <button
                  onClick={onOpenSupabaseModal}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg border bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0"
                  title="Status Cloud Sync"
                >
                  <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px]">Cloud</span>
                </button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Buka Menu Navigasi"
                className="p-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 active:scale-95 transition border border-slate-200 shrink-0"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-800" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-800" />
                )}
              </button>
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

      {/* Mobile Hamburger Drawer Menu (Modern Slide-Over Overlay) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-over Drawer */}
          <div className="relative ml-auto w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
            
            {/* Drawer Header & Profile Card */}
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Menu Utama
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition"
                  aria-label="Tutup Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Student Profile Card */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {profile.nama ? profile.nama.charAt(0).toUpperCase() : 'M'}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate">
                      {profile.nama || 'Mahasiswa (Belum Diisi)'}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">
                      {profile.nim ? `NIM ${profile.nim}` : 'Klik untuk isi NIM'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onEditProfile();
                  }}
                  className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg shrink-0 transition"
                >
                  Edit
                </button>
              </div>

              {/* Overall Progress Widget in Drawer */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-600">Total Progres Skripsi</span>
                  <span className="font-extrabold text-emerald-700">{overallProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation Tabs List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Navigasi Halaman
              </p>
              {navItems.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleNavClick(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition ${
                      isActive
                        ? 'bg-emerald-600 text-white font-bold shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs">{tab.label}</div>
                        <div className={`text-[10px] ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                          {tab.description}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                  </button>
                );
              })}

              {/* Cloud Sync Status Info */}
              <div className="pt-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                  Sinkronisasi Cloud
                </p>
                {onOpenSupabaseModal && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenSupabaseModal();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Database className="w-4 h-4 text-emerald-700 shrink-0" />
                      <div className="text-left">
                        <div>Supabase Cloud Sync</div>
                        <div className="text-[10px] text-emerald-600 font-normal">Multi-Platform Terhubung</div>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </button>
                )}
              </div>

              {/* Data Tools / Backup / Demo */}
              <div className="pt-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                  Alat & Cadangan Data
                </p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onExportData();
                    }}
                    className="flex items-center justify-center gap-1.5 p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>Ekspor JSON</span>
                  </button>

                  <input
                    ref={mobileFileInputRef}
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      setIsMobileMenuOpen(false);
                      onImportData(e);
                    }}
                  />
                  <button
                    onClick={() => mobileFileInputRef.current?.click()}
                    className="flex items-center justify-center gap-1.5 p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-600" />
                    <span>Impor JSON</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLoadDemoData();
                    }}
                    className="flex items-center justify-center gap-1.5 p-2.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-xs font-semibold text-indigo-700 transition"
                  >
                    <Play className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Data Demo</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onResetData();
                    }}
                    className="flex items-center justify-center gap-1.5 p-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                    <span>Reset Data</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50 text-center text-[10px] text-slate-500 font-medium">
              SkripsiTracker • Versi 1.0
            </div>

          </div>
        </div>
      )}
    </>
  );
};
