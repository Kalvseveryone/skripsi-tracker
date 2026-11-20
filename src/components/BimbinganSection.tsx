'use client';

import React, { useState } from 'react';
import { 
  BimbinganLog, 
  BimbinganStatus, 
  BimbinganMetode,
  StudentProfile 
} from '@/types';
import { 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  User, 
  Video, 
  FileText, 
  Trash2, 
  Edit3, 
  X, 
  Save,
  Printer,
  FileCheck,
  Search
} from 'lucide-react';
import { formatDateIndo } from '@/lib/utils';
import { triggerConfetti } from './ConfettiReward';

interface BimbinganSectionProps {
  profile: StudentProfile;
  bimbinganLogs: BimbinganLog[];
  onAddLog: (newLog: BimbinganLog) => void;
  onUpdateLog: (updatedLog: BimbinganLog) => void;
  onDeleteLog: (id: string) => void;
  onNavigatePrint: () => void;
  isAddModalOpenInitially?: boolean;
}

export const BimbinganSection: React.FC<BimbinganSectionProps> = ({
  profile,
  bimbinganLogs,
  onAddLog,
  onUpdateLog,
  onDeleteLog,
  onNavigatePrint,
  isAddModalOpenInitially = false,
}) => {
  const [filterDospem, setFilterDospem] = useState<'all' | 'dospem1' | 'dospem2'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(isAddModalOpenInitially);
  const [editingLog, setEditingLog] = useState<BimbinganLog | null>(null);

  // Form State
  const initialFormState: Omit<BimbinganLog, 'id'> = {
    tanggal: new Date().toISOString().slice(0, 10),
    dospem: 'dospem1',
    dospemName: profile.dospem1.name,
    babMateri: '',
    catatanDosen: '',
    tindakLanjut: '',
    status: 'revisi',
    metode: 'tatap_muka',
    targetSelesaiRevisi: '',
  };

  const [formData, setFormData] = useState<Omit<BimbinganLog, 'id'>>(initialFormState);

  const openAddModal = () => {
    setEditingLog(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const openEditModal = (log: BimbinganLog) => {
    setEditingLog(log);
    setFormData({
      tanggal: log.tanggal,
      dospem: log.dospem,
      dospemName: log.dospemName,
      babMateri: log.babMateri,
      catatanDosen: log.catatanDosen,
      tindakLanjut: log.tindakLanjut,
      status: log.status,
      metode: log.metode,
      targetSelesaiRevisi: log.targetSelesaiRevisi || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dospemName = formData.dospem === 'dospem1' ? profile.dospem1.name : profile.dospem2.name;

    if (editingLog) {
      onUpdateLog({
        ...formData,
        dospemName,
        id: editingLog.id,
      });
    } else {
      const newLog: BimbinganLog = {
        ...formData,
        dospemName,
        id: `b-${Date.now()}`,
      };
      onAddLog(newLog);
      if (newLog.status === 'acc') {
        triggerConfetti();
      }
    }
    setIsModalOpen(false);
  };

  const filteredLogs = bimbinganLogs.filter((log) => {
    if (filterDospem !== 'all' && log.dospem !== filterDospem) return false;
    if (filterStatus !== 'all' && log.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        log.babMateri.toLowerCase().includes(q) ||
        log.catatanDosen.toLowerCase().includes(q) ||
        log.tindakLanjut.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getMetodeBadge = (metode: BimbinganMetode) => {
    switch (metode) {
      case 'tatap_muka':
        return <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Tatap Muka Langsung</span>;
      case 'zoom':
        return <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded"><Video className="w-3 h-3" /> Zoom / GMeet</span>;
      case 'email_chat':
        return <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded"><MessageSquare className="w-3 h-3" /> Chat / WhatsApp</span>;
      case 'drive':
        return <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Google Docs / Review</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Progress Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-emerald-600" />
              Logbook & Catatan Bimbingan Dosen
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Dokumentasikan setiap sesi konsultasi, arahan revisi, dan status persetujuan dari kedua dosen pembimbing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigatePrint}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              Cetak Format Kartu
            </button>
            <button
              onClick={openAddModal}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Catat Bimbingan Baru
            </button>
          </div>
        </div>

        {/* Quota Progress Track */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Pemenuhan Syarat Kuota Bimbingan Kampus</span>
            <span className={bimbinganLogs.length >= profile.targetBimbinganMin ? 'text-emerald-700' : 'text-amber-700'}>
              {bimbinganLogs.length} dari minimal {profile.targetBimbinganMin} sesi bimbingan ({Math.min(100, Math.round((bimbinganLogs.length / profile.targetBimbinganMin) * 100))}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                bimbinganLogs.length >= profile.targetBimbinganMin ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${Math.min(100, (bimbinganLogs.length / profile.targetBimbinganMin) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Dospem 1: <strong>{bimbinganLogs.filter(b => b.dospem === 'dospem1').length}x</strong> • Dospem 2: <strong>{bimbinganLogs.filter(b => b.dospem === 'dospem2').length}x</strong>
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter Dospem */}
            <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
              <button
                onClick={() => setFilterDospem('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${filterDospem === 'all' ? 'bg-white shadow-sm font-bold text-slate-900' : 'text-slate-600'}`}
              >
                Semua Dospem
              </button>
              <button
                onClick={() => setFilterDospem('dospem1')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${filterDospem === 'dospem1' ? 'bg-white shadow-sm font-bold text-emerald-800' : 'text-slate-600'}`}
              >
                Dospem 1
              </button>
              <button
                onClick={() => setFilterDospem('dospem2')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${filterDospem === 'dospem2' ? 'bg-white shadow-sm font-bold text-teal-800' : 'text-slate-600'}`}
              >
                Dospem 2
              </button>
            </div>

            {/* Filter Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white font-medium"
            >
              <option value="all">Semua Status</option>
              <option value="acc">ACC / Disetujui</option>
              <option value="revisi">Perlu Revisi</option>
              <option value="review">Menunggu Review</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari materi atau catatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg w-full sm:w-60 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Bimbingan List */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-sm">Belum ada catatan bimbingan</h3>
            <p className="text-xs text-slate-500 mt-1">
              Klik &quot;Catat Bimbingan Baru&quot; untuk mulai mencatat riwayat konsultasi skripsi.
            </p>
          </div>
        ) : (
          filteredLogs.slice().reverse().map((log, index) => (
            <div
              key={log.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      Sesi #{filteredLogs.length - index}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">{log.babMateri}</h3>
                    {getMetodeBadge(log.metode)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      {log.dospem === 'dospem1' ? profile.dospem1.name : profile.dospem2.name}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDateIndo(log.tanggal)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      log.status === 'acc'
                        ? 'bg-emerald-100 text-emerald-800'
                        : log.status === 'revisi'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {log.status === 'acc' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    {log.status === 'revisi' && <AlertCircle className="w-3.5 h-3.5 text-rose-600" />}
                    {log.status === 'review' && <Clock className="w-3.5 h-3.5 text-amber-600" />}
                    {log.status === 'acc' ? 'ACC' : log.status === 'revisi' ? 'Revisi' : 'Review'}
                  </span>

                  <button
                    onClick={() => openEditModal(log)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                    title="Edit Sesi"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Yakin ingin menghapus catatan bimbingan ini?')) {
                        onDeleteLog(log.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Hapus Sesi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Catatan Arahan Dosen */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2 mt-2">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Catatan & Arahan Dosen
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line italic">
                    &ldquo;{log.catatanDosen}&rdquo;
                  </p>
                </div>

                {log.tindakLanjut && (
                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                      Tindak Lanjut / Action Plan Mahasiswa
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {log.tindakLanjut}
                    </p>
                  </div>
                )}
              </div>

              {log.targetSelesaiRevisi && (
                <div className="flex items-center gap-1.5 text-[11px] text-amber-700 font-medium mt-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Target Selesai Revisi: {formatDateIndo(log.targetSelesaiRevisi)}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal Add / Edit Bimbingan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {editingLog ? 'Edit Catatan Bimbingan' : 'Catat Bimbingan Baru'}
                  </h3>
                  <p className="text-xs text-slate-500">Isi detail konsultasi bersama dosen pembimbing.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Bimbingan</label>
                  <input
                    type="date"
                    required
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Dosen Pembimbing</label>
                  <select
                    value={formData.dospem}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dospem: e.target.value as 'dospem1' | 'dospem2',
                        dospemName: e.target.value === 'dospem1' ? profile.dospem1.name : profile.dospem2.name,
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="dospem1">Dospem 1: {profile.dospem1.name}</option>
                    <option value="dospem2">Dospem 2: {profile.dospem2.name}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bab / Materi yang Dikonsultasikan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bab 3 - Diagram Arsitektur dan Instrumen Kuesioner"
                  value={formData.babMateri}
                  onChange={(e) => setFormData({ ...formData, babMateri: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Metode Bimbingan</label>
                  <select
                    value={formData.metode}
                    onChange={(e) => setFormData({ ...formData, metode: e.target.value as BimbinganMetode })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                  >
                    <option value="tatap_muka">Tatap Muka Langsung (Kampus)</option>
                    <option value="zoom">Online (Zoom / Google Meet)</option>
                    <option value="email_chat">Chat / WhatsApp / Email</option>
                    <option value="drive">Review Google Docs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status Hasil Bimbingan</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as BimbinganStatus })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg font-semibold"
                  >
                    <option value="revisi">⚠️ Perlu Revisi</option>
                    <option value="acc">✅ ACC / Disetujui</option>
                    <option value="review">⏳ Menunggu Review Lanjutan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan & Masukan Dosen Pembimbing</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tuliskan poin koreksi, saran literatur, atau rumus yang perlu diperbaiki..."
                  value={formData.catatanDosen}
                  onChange={(e) => setFormData({ ...formData, catatanDosen: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tindak Lanjut Mahasiswa (Action Plan)</label>
                <textarea
                  rows={2}
                  placeholder="Langkah yang akan kamu kerjakan untuk merevisi bab ini..."
                  value={formData.tindakLanjut}
                  onChange={(e) => setFormData({ ...formData, tindakLanjut: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Selesai Revisi (Opsional)</label>
                <input
                  type="date"
                  value={formData.targetSelesaiRevisi}
                  onChange={(e) => setFormData({ ...formData, targetSelesaiRevisi: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingLog ? 'Simpan Perubahan' : 'Tambah Bimbingan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

