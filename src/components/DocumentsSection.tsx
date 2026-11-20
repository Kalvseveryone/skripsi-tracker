'use client';

import React, { useState, useRef } from 'react';
import { DocumentDraft } from '@/types';
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  FileUp, 
  HardDrive,
  FileCode,
  Tag
} from 'lucide-react';
import { formatDateIndo, formatBytes } from '@/lib/utils';
import { isSupabaseConnected } from '@/lib/supabase';
import { uploadFileToSupabaseStorage } from '@/lib/supabase-service';

interface DocumentsSectionProps {
  documents: DocumentDraft[];
  onAddDocument: (doc: DocumentDraft) => void;
  onDeleteDocument: (id: string) => void;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  documents,
  onAddDocument,
  onDeleteDocument,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [version, setVersion] = useState('');
  const [stage, setStage] = useState('Penelitian');
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
      if (!version) {
        setVersion(`v${documents.length + 1}.0`);
      }
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError('Pilih file terlebih dahulu.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      let fileUrl = '#';

      // 1. If Supabase is connected in browser, upload directly to Supabase Storage Bucket
      if (isSupabaseConnected()) {
        const uploadResult = await uploadFileToSupabaseStorage(selectedFile);
        if (uploadResult.success && uploadResult.fileUrl) {
          fileUrl = uploadResult.fileUrl;
        } else {
          console.warn('Direct Supabase upload failed, trying API route:', uploadResult.error);
        }
      }

      // 2. Fallback to /api/upload if not yet uploaded
      if (fileUrl === '#') {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || 'Gagal mengunggah file.');
        }
        fileUrl = json.fileUrl || '#';
      }

      const newDoc: DocumentDraft = {
        id: `doc-${Date.now()}`,
        version: version || `v${documents.length + 1}.0`,
        title: title || selectedFile.name,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileUrl,
        uploadDate: new Date().toISOString().slice(0, 10),
        notes: notes.trim(),
        stage,
      };

      onAddDocument(newDoc);

      // Reset form
      setSelectedFile(null);
      setTitle('');
      setVersion('');
      setNotes('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Terjadi kesalahan saat upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-emerald-600" />
            Repositori Naskah & Dokumen Skripsi
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Simpan dan kelola riwayat versi draft skripsi, naskah proposal, berkas persetujuan, dan lembar revisi.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <span>Total Berkas: {documents.length} Dokumen</span>
        </div>
      </div>

      {/* Upload Box */}
      <form
        onSubmit={handleUploadSubmit}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
      >
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileUp className="w-4 h-4 text-emerald-600" /> Unggah Versi Draft Baru
        </h3>

        {uploadError && (
          <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 text-xs rounded-xl">
            {uploadError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Dokumen (PDF, DOCX, ZIP)</label>
            <input
              ref={fileInputRef}
              type="file"
              required
              accept=".pdf,.doc,.docx,.zip,.rar"
              onChange={handleFileChange}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Label Judul Draft</label>
            <input
              type="text"
              required
              placeholder="Misal: Draft Bab 4 Hasil Pengujian"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Versi</label>
              <input
                type="text"
                placeholder="v1.2"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tahap Skripsi</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full text-xs px-2.5 py-2 border border-slate-200 rounded-xl"
              >
                <option value="Pra-Sempro">Pra-Sempro</option>
                <option value="Sempro">Sempro</option>
                <option value="Penelitian">Penelitian (Bab 4-5)</option>
                <option value="Semhas">Semhas</option>
                <option value="Sidang">Sidang Skripsi</option>
                <option value="Pasca-Sidang">Pasca-Sidang</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan Perubahan (Changelog Versi Ini)</label>
          <input
            type="text"
            placeholder="Misal: Sudah memperbaiki tabel perbandingan di Bab 2 dan menambahkan hasil uji fungsionalitas."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUploading || !selectedFile}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" />
            {isUploading ? 'Sedang Mengunggah...' : 'Unggah & Simpan Riwayat'}
          </button>
        </div>
      </form>

      {/* Documents List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Riwayat Naskah Terunggah
        </h3>

        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {doc.version}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {doc.stage}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{doc.title}</h4>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <span>{doc.fileName}</span>
                  <span>•</span>
                  <span>{formatBytes(doc.fileSize)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {formatDateIndo(doc.uploadDate)}
                  </span>
                </p>
                {doc.notes && (
                  <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {doc.notes}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
              <a
                href={doc.fileUrl}
                download={doc.fileName}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Unduh
              </a>
              <button
                onClick={() => {
                  if (confirm(`Hapus berkas "${doc.title}"?`)) {
                    onDeleteDocument(doc.id);
                  }
                }}
                className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg transition"
                title="Hapus Dokumen"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

