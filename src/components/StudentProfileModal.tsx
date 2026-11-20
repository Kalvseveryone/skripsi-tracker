'use client';

import React, { useState } from 'react';
import { X, Save, User, Building, BookText, Calendar, Users, Phone, Mail } from 'lucide-react';
import { StudentProfile } from '@/types';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSave: (updatedProfile: StudentProfile) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<StudentProfile>(profile);

  if (!isOpen) return null;

  const handleChange = (field: keyof StudentProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDospemChange = (dospem: 'dospem1' | 'dospem2', field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [dospem]: {
        ...prev[dospem],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Edit Profil & Informasi Skripsi</h3>
              <p className="text-xs text-slate-500">Sesuaikan data mahasiswa, pembimbing, dan target kelulusan.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Data Mahasiswa */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Identitas Mahasiswa
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => handleChange('nama', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">NIM / NPM</label>
                <input
                  type="text"
                  required
                  value={formData.nim}
                  onChange={(e) => handleChange('nim', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Universitas / Perguruan Tinggi</label>
                <input
                  type="text"
                  required
                  value={formData.universitas}
                  onChange={(e) => handleChange('universitas', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fakultas</label>
                <input
                  type="text"
                  value={formData.fakultas}
                  onChange={(e) => handleChange('fakultas', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Program Studi / Jurusan</label>
                <input
                  type="text"
                  required
                  value={formData.programStudi}
                  onChange={(e) => handleChange('programStudi', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bidang / Peminatan Kajian</label>
                <input
                  type="text"
                  value={formData.bidangKajian}
                  onChange={(e) => handleChange('bidangKajian', e.target.value)}
                  placeholder="Contoh: Rekayasa Perangkat Lunak"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Judul & Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BookText className="w-3.5 h-3.5" /> Judul & Jadwal Target
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Skripsi / Tugas Akhir</label>
                <textarea
                  rows={2}
                  required
                  value={formData.judulSkripsi}
                  onChange={(e) => handleChange('judulSkripsi', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Mulai Skripsi</label>
                  <input
                    type="date"
                    value={formData.tanggalMulai}
                    onChange={(e) => handleChange('tanggalMulai', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Sidang / Ujian</label>
                  <input
                    type="date"
                    value={formData.targetSidang}
                    onChange={(e) => handleChange('targetSidang', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Syarat Min. Bimbingan</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.targetBimbinganMin}
                    onChange={(e) => handleChange('targetBimbinganMin', parseInt(e.target.value) || 8)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dosen Pembimbing 1 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-600" /> Dosen Pembimbing 1 (Utama)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={formData.dospem1.name}
                  onChange={(e) => handleDospemChange('dospem1', 'name', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">NIP / NIDN</label>
                <input
                  type="text"
                  value={formData.dospem1.nip || ''}
                  onChange={(e) => handleDospemChange('dospem1', 'nip', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.dospem1.email || ''}
                  onChange={(e) => handleDospemChange('dospem1', 'email', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Kontak / WhatsApp</label>
                <input
                  type="text"
                  value={formData.dospem1.phone || ''}
                  onChange={(e) => handleDospemChange('dospem1', 'phone', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Dosen Pembimbing 2 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-teal-600" /> Dosen Pembimbing 2 (Pendamping)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={formData.dospem2.name}
                  onChange={(e) => handleDospemChange('dospem2', 'name', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">NIP / NIDN</label>
                <input
                  type="text"
                  value={formData.dospem2.nip || ''}
                  onChange={(e) => handleDospemChange('dospem2', 'nip', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.dospem2.email || ''}
                  onChange={(e) => handleDospemChange('dospem2', 'email', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Kontak / WhatsApp</label>
                <input
                  type="text"
                  value={formData.dospem2.phone || ''}
                  onChange={(e) => handleDospemChange('dospem2', 'phone', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

