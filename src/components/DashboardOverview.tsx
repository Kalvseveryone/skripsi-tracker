'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
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
    <div className="space-y-6">
      {/* Onboarding Banner if Profile is Empty */}
      {isProfileIncomplete && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Mulai dengan Mengisi Profil Skripsi Anda</h3>
              <p className="text-xs text-amber-100 mt-0.5">
                Data Anda masih kosong. Masukkan nama, NIM, universitas, judul skripsi, dan dosen pembimbing Anda.
              </p>
            </div>
          </div>
          {onOpenProfileModal && (
            <button
              onClick={onOpenProfileModal}
              className="px-4 py-2 bg-white text-orange-700 font-bold text-xs sm:text-sm rounded-xl shadow hover:bg-amber-50 transition shrink-0"
            >
              Lengkapi Profil Sekarang &rarr;
            </button>
          )}
        </div>
      )}

      {/* Hero Welcome & Motivation */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Pejuang Skripsi Aktif
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Halo, {profile.nama ? profile.nama.split(' ')[0] : 'Mahasiswa'}! Semangat Menuntaskan Skripsi 🎓
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed line-clamp-2">
            &ldquo;{profile.judulSkripsi || 'Belum ada judul skripsi yang diisi. Klik untuk mengatur profil.'}&rdquo;
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('milestones')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-emerald-900/30"
            >
              Update Progres Bab
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onQuickAddBimbingan}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-xl border border-white/20 transition backdrop-blur-sm"
            >
              + Catat Bimbingan Baru
            </button>
            <button
              onClick={() => onNavigateTab('print')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-xl border border-white/20 transition backdrop-blur-sm"
            >
              <FileCheck2 className="w-4 h-4" />
              Cetak Kartu Kontrol
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Quote Widget */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
            <Flame className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-900 italic">
              &ldquo;{currentQuote.text}&rdquo;
            </p>
            <p className="text-xs text-amber-700/80 mt-1 font-semibold">
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

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Overall Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Progres</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{overallProgress}%</span>
            <span className="text-xs font-medium text-slate-500">
              ({completedMilestones}/{milestones.length} Tahap)
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-700" 
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {overallProgress >= 80 ? 'Hampir tuntas! Siap ujian sidang!' : 'Terus cicil tahapan tiap minggunya.'}
          </p>
        </div>

        {/* Card 2: Countdown Sidang */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Sidang</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {profile.targetSidang ? countdown.days : '-'}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {profile.targetSidang ? (countdown.isPassed ? 'Hari lewat' : 'Hari lagi') : 'Belum diisi'}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Target: {profile.targetSidang ? formatDateIndo(profile.targetSidang) : 'Belum ditentukan'}</span>
          </div>
          <p className={`text-xs mt-2 font-medium ${countdown.days < 30 && profile.targetSidang ? 'text-amber-600' : 'text-emerald-600'}`}>
            {profile.targetSidang ? (countdown.days < 30 ? '⚠️ Waktu semakin dekat, prioritaskan revisi!' : '✓ Jadwal on-track.') : 'Atur target di profil.'}
          </p>
        </div>

        {/* Card 3: Bimbingan Log Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Log Bimbingan</span>
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <MessageSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalBimbingan}</span>
            <span className="text-xs font-medium text-slate-500">
              / Min. {profile.targetBimbinganMin}x
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Dospem 1: <strong className="text-slate-800">{bimbinganDospem1}x</strong></span>
            <span>Dospem 2: <strong className="text-slate-800">{bimbinganDospem2}x</strong></span>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            {totalBimbingan >= profile.targetBimbinganMin 
              ? '✓ Kuota syarat bimbingan terpenuhi!' 
              : `Kurang ${Math.max(0, profile.targetBimbinganMin - totalBimbingan)}x bimbingan lagi.`}
          </p>
        </div>

        {/* Card 4: Tugas & Catatan Revisi */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tugas & Revisi</span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{activeTasks}</span>
            <span className="text-xs font-medium text-slate-500">
              Tugas Aktif ({completedTasks} Selesai)
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
              {bimbinganAcc} ACC
            </span>
            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-full font-medium">
              {bimbinganRevisi} Perlu Revisi
            </span>
          </div>
          <button 
            onClick={() => onNavigateTab('tasks')}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold mt-2 inline-flex items-center gap-1"
          >
            Buka daftar to-do &rarr;
          </button>
        </div>
      </div>

      {/* Middle Section: Active Tahap & Dosen Pembimbing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Milestone Highlight */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Tahap Aktif Saat Ini</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {currentActiveMilestone ? currentActiveMilestone.title : 'Semua Tahap Selesai! 🎉'}
              </h3>
            </div>
            {currentActiveMilestone && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                {currentActiveMilestone.category}
              </span>
            )}
          </div>

          {currentActiveMilestone ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                {currentActiveMilestone.description}
              </p>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
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
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Checklist Rincian Bab ({currentActiveMilestone.checklist.filter(c => c.completed).length}/{currentActiveMilestone.checklist.length})
                </div>
                <div className="space-y-1.5">
                  {currentActiveMilestone.checklist.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center text-xs text-slate-700 gap-2">
                      <div className={`w-4 h-4 rounded flex items-center justify-center ${item.completed ? 'bg-emerald-500 text-white' : 'border border-slate-300'}`}>
                        {item.completed && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <span className={item.completed ? 'line-through text-slate-400' : ''}>
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

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  Target Selesai: <strong>{formatDateIndo(currentActiveMilestone.targetDate)}</strong>
                </span>
                <button
                  onClick={() => onNavigateTab('milestones')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  Kelola Detail Bab <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-amber-500 mx-auto mb-2" />
              <h4 className="font-bold text-slate-800">Selamat! Seluruh Tahapan Skripsi Telah Selesai</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Semua bab dan ujian telah dilewati. Selamat menyandang gelar sarjana!
              </p>
            </div>
          )}
        </div>

        {/* Dosen Pembimbing Contact Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-700">Pembimbing 1 (Utama)</span>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  {profile.dospem1.name || 'Belum Ditentukan'}
                </h4>
              </div>
            </div>
            <div className="space-y-1 text-xs text-slate-600 pt-1 border-t border-slate-100">
              {profile.dospem1.nip ? (
                <p>NIP: {profile.dospem1.nip}</p>
              ) : (
                <p className="text-slate-400 italic">Belum ada NIP</p>
              )}
              {profile.dospem1.email && (
                <p className="flex items-center gap-1.5 text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${profile.dospem1.email}`} className="hover:text-emerald-600 underline">
                    {profile.dospem1.email}
                  </a>
                </p>
              )}
              {profile.dospem1.phone && (
                <p className="flex items-center gap-1.5 text-slate-500">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`https://wa.me/${profile.dospem1.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-emerald-600 font-medium">
                    {profile.dospem1.phone}
                  </a>
                </p>
              )}
              {profile.dospem1.room && <p className="text-[11px] text-slate-400">Ruang: {profile.dospem1.room}</p>}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-50 text-teal-700 rounded-lg">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-teal-700">Pembimbing 2 (Pendamping)</span>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  {profile.dospem2.name || 'Belum Ditentukan'}
                </h4>
              </div>
            </div>
            <div className="space-y-1 text-xs text-slate-600 pt-1 border-t border-slate-100">
              {profile.dospem2.nip ? (
                <p>NIP: {profile.dospem2.nip}</p>
              ) : (
                <p className="text-slate-400 italic">Belum ada NIP</p>
              )}
              {profile.dospem2.email && (
                <p className="flex items-center gap-1.5 text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${profile.dospem2.email}`} className="hover:text-teal-600 underline">
                    {profile.dospem2.email}
                  </a>
                </p>
              )}
              {profile.dospem2.phone && (
                <p className="flex items-center gap-1.5 text-slate-500">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`https://wa.me/${profile.dospem2.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-teal-600 font-medium">
                    {profile.dospem2.phone}
                  </a>
                </p>
              )}
              {profile.dospem2.room && <p className="text-[11px] text-slate-400">Ruang: {profile.dospem2.room}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bimbingan & Priority Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Bimbingan Notes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Catatan Bimbingan Terkini
            </h3>
            <button
              onClick={() => onNavigateTab('bimbingan')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Lihat Semua &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {bimbinganLogs.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Belum ada sesi bimbingan yang dicatat. Klik &quot;+ Catat Bimbingan Baru&quot; untuk memulai.
              </div>
            ) : (
              bimbinganLogs.slice(-3).reverse().map((b) => (
                <div key={b.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-800">{b.babMateri}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      b.status === 'acc' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : b.status === 'revisi' 
                        ? 'bg-rose-100 text-rose-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-2 italic">
                    &ldquo;{b.catatanDosen}&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60 pt-2">
                    <span>{b.dospem === 'dospem1' ? 'Dospem 1' : 'Dospem 2'}</span>
                    <span>{formatDateIndo(b.tanggal)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Priority To-Do List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              Prioritas Tugas Minggu Ini
            </h3>
            <button
              onClick={onQuickAddTask}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              + Tambah Tugas
            </button>
          </div>

          <div className="space-y-2.5">
            {tasks.filter(t => !t.completed).length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Tidak ada tugas aktif. Klik &quot;+ Tambah Tugas&quot; untuk mencatat target revisi Anda!
              </div>
            ) : (
              tasks.filter(t => !t.completed).slice(0, 4).map((task) => (
                <div key={task.id} className="flex items-start justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100/60 transition">
                  <div className="flex items-start gap-2.5">
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      task.priority === 'tinggi' 
                        ? 'bg-rose-500' 
                        : task.priority === 'sedang' 
                        ? 'bg-amber-500' 
                        : 'bg-slate-400'
                    }`} />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        {task.bab && <span className="bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-medium">{task.bab}</span>}
                        {task.dueDate && <span>Deadline: {formatDateIndo(task.dueDate)}</span>}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-0.5">
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
