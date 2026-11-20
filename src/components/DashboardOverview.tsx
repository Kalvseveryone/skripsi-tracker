'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Users, 
  Sparkles, 
  ArrowRight, 
  RefreshCw,
  Phone,
  Mail,
  Award,
  ChevronRight,
  Flame,
  FileCheck2,
  UserPlus
} from 'lucide-react';
import { StudentProfile, Milestone, BimbinganLog, TaskItem } from '@/types';
import { formatDateIndo, getDaysRemaining } from '@/lib/utils';
import { MOTIVATIONAL_QUOTES } from '@/lib/constants';

interface DashboardOverviewProps {
  profile: StudentProfile;
  milestones: Milestone[];
  bimbinganLogs: BimbinganLog[];
  tasks: TaskItem[];
  overallProgress: number;
  onNavigateTab: (tab: string) => void;
  onQuickAddBimbingan: () => void;
  onQuickAddTask: () => void;
  onOpenProfileModal?: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  profile,
  milestones,
  bimbinganLogs,
  tasks,
  overallProgress,
  onNavigateTab,
  onQuickAddBimbingan,
  onQuickAddTask,
  onOpenProfileModal
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const countdown = getDaysRemaining(profile.targetSidang);

  // Statistics
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const currentActiveMilestone = milestones.find(m => m.status === 'in_progress') || milestones.find(m => m.status !== 'completed');
  
  const totalBimbingan = bimbinganLogs.length;
  const bimbinganDospem1 = bimbinganLogs.filter(b => b.dospem === 'dospem1').length;
  const bimbinganDospem2 = bimbinganLogs.filter(b => b.dospem === 'dospem2').length;
  const bimbinganAcc = bimbinganLogs.filter(b => b.status === 'acc').length;
  const bimbinganRevisi = bimbinganLogs.filter(b => b.status === 'revisi').length;

  const completedTasks = tasks.filter(t => t.completed).length;
  const activeTasks = tasks.filter(t => !t.completed).length;

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];
  const isProfileIncomplete = !profile.nama || !profile.judulSkripsi;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Onboarding Banner if Profile is Empty */}
      {isProfileIncomplete && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm shrink-0">
              <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Mulai dengan Mengisi Profil Skripsi Anda</h3>
              <p className="text-xs text-amber-100 mt-0.5">
                Masukkan nama, NIM, universitas, judul, dan dosen pembimbing Anda.
              </p>
            </div>
          </div>
          {onOpenProfileModal && (
            <button
              onClick={onOpenProfileModal}
              className="w-full sm:w-auto text-center px-4 py-2 bg-white text-orange-700 font-bold text-xs sm:text-sm rounded-xl shadow hover:bg-amber-50 transition shrink-0"
            >
              Lengkapi Profil Sekarang &rarr;
            </button>
          )}
        </div>
      )}

      {/* Hero Welcome & Motivation */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-5 sm:p-8 shadow-lg">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-[11px] font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Pejuang Skripsi Aktif
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight mb-2 leading-tight">
            Halo, {profile.nama ? profile.nama.split(' ')[0] : 'Mahasiswa'}! 🎓
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
            &ldquo;{profile.judulSkripsi || 'Belum ada judul skripsi yang diisi. Klik untuk mengatur profil.'}&rdquo;
          </p>

          {/* Quick Action Buttons (Touch Friendly) */}
          <div className="mt-5 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigateTab('milestones')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-emerald-950/20"
            >
              Update Progres Bab
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onQuickAddBimbingan}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-xl border border-white/20 transition backdrop-blur-sm"
            >
              + Catat Bimbingan Baru
            </button>
            <button
              onClick={() => onNavigateTab('print')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-xl border border-white/20 transition backdrop-blur-sm"
            >
              <FileCheck2 className="w-4 h-4" />
              Cetak Kartu Kontrol
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Quote Widget */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 sm:p-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-amber-900 italic leading-snug">
              &ldquo;{currentQuote.text}&rdquo;
            </p>
            <p className="text-[11px] text-amber-700/80 mt-1 font-bold">
              — {currentQuote.author}
            </p>
          </div>
        </div>
        <button
          onClick={nextQuote}
          title="Ganti Kutipan Motivasi"
          className="p-1.5 text-amber-700 hover:bg-amber-100 rounded-lg transition shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Primary KPI Grid (2x2 on Mobile, 4 cols on Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Overall Progress */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Progres</span>
              <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <Award className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{overallProgress}%</span>
              <span className="text-[10px] sm:text-xs font-medium text-slate-500 hidden sm:inline">
                ({completedMilestones}/{milestones.length})
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 sm:h-2 rounded-full overflow-hidden mt-2.5">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-700" 
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-500 mt-2 line-clamp-1">
            {completedMilestones}/{milestones.length} Tahapan Selesai
          </p>
        </div>

        {/* Card 2: Countdown Sidang */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Target Sidang</span>
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <Calendar className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {profile.targetSidang ? countdown.days : '-'}
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-slate-500">
                {profile.targetSidang ? (countdown.isPassed ? 'Hari lewat' : 'Hari lagi') : 'Belum diisi'}
              </span>
            </div>
          </div>
          <div className="mt-2 text-[10px] sm:text-xs text-slate-500 line-clamp-1">
            {profile.targetSidang ? formatDateIndo(profile.targetSidang) : 'Atur di profil'}
          </div>
        </div>

        {/* Card 3: Bimbingan Log Status */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Bimbingan</span>
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <MessageSquare className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalBimbingan}</span>
              <span className="text-[10px] sm:text-xs font-medium text-slate-500">
                / {profile.targetBimbinganMin}x Min
              </span>
            </div>
          </div>
          <div className="mt-2 text-[10px] sm:text-xs font-medium text-emerald-600 line-clamp-1">
            {totalBimbingan >= profile.targetBimbinganMin ? '✓ Kuota Terpenuhi' : `Sisa ${profile.targetBimbinganMin - totalBimbingan}x lagi`}
          </div>
        </div>

        {/* Card 4: Tugas & Catatan Revisi */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Tugas To-Do</span>
              <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{activeTasks}</span>
              <span className="text-[10px] sm:text-xs font-medium text-slate-500">
                Aktif ({completedTasks} Beres)
              </span>
            </div>
          </div>
          <button 
            onClick={() => onNavigateTab('tasks')}
            className="text-[10px] sm:text-xs text-indigo-600 font-bold mt-2 text-left"
          >
            Lihat daftar &rarr;
          </button>
        </div>
      </div>

      {/* Middle Section: Active Tahap & Dosen Pembimbing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Active Milestone Highlight */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
          <div className="flex items-start sm:items-center justify-between gap-2 mb-3">
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-600 uppercase tracking-wider">Tahap Aktif Saat Ini</span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                {currentActiveMilestone ? currentActiveMilestone.title : 'Semua Tahap Selesai! 🎉'}
              </h3>
            </div>
            {currentActiveMilestone && (
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-bold rounded-full shrink-0">
                {currentActiveMilestone.category}
              </span>
            )}
          </div>

          {currentActiveMilestone ? (
            <div className="space-y-3.5">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentActiveMilestone.description}
              </p>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Progres Tahap Ini</span>
                  <span className="text-emerald-700">{currentActiveMilestone.progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${currentActiveMilestone.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Checklist preview */}
              <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/70 space-y-2">
                <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Checklist Rincian Bab ({currentActiveMilestone.checklist.filter(c => c.completed).length}/{currentActiveMilestone.checklist.length})
                </div>
                <div className="space-y-1.5">
                  {currentActiveMilestone.checklist.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center text-xs text-slate-700 gap-2 min-h-[32px]">
                      <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${item.completed ? 'bg-emerald-500 text-white' : 'border border-slate-300'}`}>
                        {item.completed && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <span className={`line-clamp-1 ${item.completed ? 'line-through text-slate-400' : ''}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                  {currentActiveMilestone.checklist.length > 3 && (
                    <p className="text-[11px] text-slate-400 pl-6">
                      +{currentActiveMilestone.checklist.length - 3} item lainnya...
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] sm:text-xs text-slate-500">
                  Target: <strong>{formatDateIndo(currentActiveMilestone.targetDate)}</strong>
                </span>
                <button
                  onClick={() => onNavigateTab('milestones')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  Kelola Bab <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <Award className="w-10 h-10 text-amber-500 mx-auto mb-2" />
              <h4 className="font-bold text-slate-800 text-sm">Selamat! Seluruh Tahapan Skripsi Telah Selesai</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Semua bab dan ujian telah dilewati. Selamat menyandang gelar sarjana!
              </p>
            </div>
          )}
        </div>

        {/* Dosen Pembimbing Contact Cards */}
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase text-emerald-700 block">Pembimbing 1 (Utama)</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                  {profile.dospem1.name || 'Belum Ditentukan'}
                </h4>
              </div>
            </div>
            <div className="space-y-1 text-xs text-slate-600 pt-1 border-t border-slate-100">
              {profile.dospem1.nip && <p className="text-[11px]">NIP: {profile.dospem1.nip}</p>}
              {profile.dospem1.email && (
                <p className="flex items-center gap-1.5 text-slate-500 truncate text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`mailto:${profile.dospem1.email}`} className="hover:text-emerald-600 underline truncate">
                    {profile.dospem1.email}
                  </a>
                </p>
              )}
              {profile.dospem1.phone && (
                <p className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`https://wa.me/${profile.dospem1.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-emerald-600 font-medium">
                    {profile.dospem1.phone}
                  </a>
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-teal-50 text-teal-700 rounded-lg shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase text-teal-700 block">Pembimbing 2 (Pendamping)</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                  {profile.dospem2.name || 'Belum Ditentukan'}
                </h4>
              </div>
            </div>
            <div className="space-y-1 text-xs text-slate-600 pt-1 border-t border-slate-100">
              {profile.dospem2.nip && <p className="text-[11px]">NIP: {profile.dospem2.nip}</p>}
              {profile.dospem2.email && (
                <p className="flex items-center gap-1.5 text-slate-500 truncate text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`mailto:${profile.dospem2.email}`} className="hover:text-teal-600 underline truncate">
                    {profile.dospem2.email}
                  </a>
                </p>
              )}
              {profile.dospem2.phone && (
                <p className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`https://wa.me/${profile.dospem2.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-teal-600 font-medium">
                    {profile.dospem2.phone}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bimbingan & Priority Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Latest Bimbingan Notes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Bimbingan Terkini
            </h3>
            <button
              onClick={() => onNavigateTab('bimbingan')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              Lihat Semua &rarr;
            </button>
          </div>

          <div className="space-y-2.5">
            {bimbinganLogs.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                Belum ada sesi bimbingan. Klik &quot;+ Catat Bimbingan Baru&quot; untuk mencatat.
              </div>
            ) : (
              bimbinganLogs.slice(-3).reverse().map((b) => (
                <div key={b.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-800 truncate max-w-[200px]">{b.babMateri}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                      b.status === 'acc' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : b.status === 'revisi' 
                        ? 'bg-rose-100 text-rose-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-1.5 italic">
                    &ldquo;{b.catatanDosen}&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 pt-1.5">
                    <span>{b.dospem === 'dospem1' ? 'Dospem 1' : 'Dospem 2'}</span>
                    <span>{formatDateIndo(b.tanggal)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Priority To-Do List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              Prioritas Tugas
            </h3>
            <button
              onClick={onQuickAddTask}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              + Tambah Tugas
            </button>
          </div>

          <div className="space-y-2">
            {tasks.filter(t => !t.completed).length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                Tidak ada tugas aktif. Klik &quot;+ Tambah Tugas&quot; untuk mencatat target revisi!
              </div>
            ) : (
              tasks.filter(t => !t.completed).slice(0, 4).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100/60 transition gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      task.priority === 'tinggi' 
                        ? 'bg-rose-500' 
                        : task.priority === 'sedang' 
                        ? 'bg-amber-500' 
                        : 'bg-slate-400'
                    }`} />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                        {task.bab && <span className="bg-slate-200 text-slate-700 px-1 rounded">{task.bab}</span>}
                        {task.dueDate && <span>{formatDateIndo(task.dueDate)}</span>}
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 px-1.5 py-0.5 shrink-0">
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
