'use client';

import React from 'react';
import { StudentProfile, BimbinganLog } from '@/types';
import { formatDateIndo } from '@/lib/utils';
import { Printer, ArrowLeft, MoveHorizontal } from 'lucide-react';

interface PrintableLogbookProps {
  profile: StudentProfile;
  bimbinganLogs: BimbinganLog[];
  onBack: () => void;
}

export const PrintableLogbook: React.FC<PrintableLogbookProps> = ({
  profile,
  bimbinganLogs,
  onBack,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Action Header (Hidden in Print) */}
      <div className="bg-white p-3.5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between print:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-xs transition flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / PDF</span>
        </button>
      </div>

      {/* Mobile Scroll Notice */}
      <div className="md:hidden flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-800 text-[11px] rounded-xl border border-blue-200 print:hidden">
        <MoveHorizontal className="w-4 h-4 shrink-0 text-blue-600" />
        <span>Geser tabel ke samping untuk melihat seluruh kolom tanda tangan.</span>
      </div>

      {/* Official Printable Sheet Container */}
      <div className="bg-white p-5 sm:p-12 rounded-2xl border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0 text-slate-900 font-serif">
        {/* Kop Surat Resmi */}
        <div className="text-center border-b-2 border-slate-900 pb-3 mb-5">
          <h2 className="text-base sm:text-xl font-bold uppercase tracking-wider leading-snug">
            {profile.universitas || '[NAMA UNIVERSITAS / PERGURUAN TINGGI]'}
          </h2>
          <h3 className="text-sm sm:text-lg font-bold uppercase tracking-wider">
            {profile.fakultas || '[NAMA FAKULTAS]'}
          </h3>
          <p className="text-xs sm:text-sm font-medium tracking-wide">
            PROGRAM STUDI {(profile.programStudi || '[PROGRAM STUDI]').toUpperCase()}
          </p>
          <div className="mt-2.5 py-1 bg-slate-100 print:bg-transparent border-y border-slate-400">
            <h1 className="text-xs sm:text-base font-extrabold uppercase tracking-wider">
              KARTU KENDALI BIMBINGAN SKRIPSI / TUGAS AKHIR
            </h1>
          </div>
        </div>

        {/* Identitas Mahasiswa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm mb-6 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="flex">
              <span className="w-28 sm:w-32 font-bold shrink-0">Nama Mahasiswa</span>
              <span className="mr-2">:</span>
              <span className="font-semibold">{profile.nama || '...........................................'}</span>
            </div>
            <div className="flex">
              <span className="w-28 sm:w-32 font-bold shrink-0">NIM / NPM</span>
              <span className="mr-2">:</span>
              <span>{profile.nim || '...........................................'}</span>
            </div>
            <div className="flex">
              <span className="w-28 sm:w-32 font-bold shrink-0">Program Studi</span>
              <span className="mr-2">:</span>
              <span>{profile.programStudi || '...........................................'}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex">
              <span className="w-28 sm:w-32 font-bold shrink-0">Pembimbing 1</span>
              <span className="mr-2">:</span>
              <span>{profile.dospem1.name || '...........................................'}</span>
            </div>
            <div className="flex">
              <span className="w-28 sm:w-32 font-bold shrink-0">Pembimbing 2</span>
              <span className="mr-2">:</span>
              <span>{profile.dospem2.name || '...........................................'}</span>
            </div>
            <div className="flex">
              <span className="w-28 sm:w-32 font-bold shrink-0">Target Sidang</span>
              <span className="mr-2">:</span>
              <span>{profile.targetSidang ? formatDateIndo(profile.targetSidang) : '...........................................'}</span>
            </div>
          </div>

          <div className="sm:col-span-2 flex mt-1.5 pt-1.5 border-t border-slate-100">
            <span className="w-28 sm:w-32 font-bold shrink-0">Judul Skripsi</span>
            <span className="mr-2">:</span>
            <span className="italic font-medium leading-relaxed">{profile.judulSkripsi || '...................................................................................................'}</span>
          </div>
        </div>

        {/* Tabel Log Bimbingan (Horizontal scroll container on Mobile) */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full min-w-[650px] text-xs border-collapse border border-slate-400 text-left">
            <thead>
              <tr className="bg-slate-100 print:bg-slate-50 font-bold text-center">
                <th className="border border-slate-400 p-2 w-8">No</th>
                <th className="border border-slate-400 p-2 w-24">Tanggal</th>
                <th className="border border-slate-400 p-2 w-28">Pembimbing</th>
                <th className="border border-slate-400 p-2 w-32">Materi / Bab</th>
                <th className="border border-slate-400 p-2">Catatan & Pokok Bahasan</th>
                <th className="border border-slate-400 p-2 w-16">Status</th>
                <th className="border border-slate-400 p-2 w-24">Paraf Dosen</th>
              </tr>
            </thead>
            <tbody>
              {bimbinganLogs.length === 0 ? (
                Array.from({ length: 8 }).map((_, idx) => (
                  <tr key={`blank-${idx}`} className="h-10">
                    <td className="border border-slate-400 p-2 text-center">{idx + 1}</td>
                    <td className="border border-slate-400 p-2"></td>
                    <td className="border border-slate-400 p-2"></td>
                    <td className="border border-slate-400 p-2"></td>
                    <td className="border border-slate-400 p-2"></td>
                    <td className="border border-slate-400 p-2"></td>
                    <td className="border border-slate-400 p-2"></td>
                  </tr>
                ))
              ) : (
                <>
                  {bimbinganLogs.map((log, index) => (
                    <tr key={log.id} className="align-top">
                      <td className="border border-slate-400 p-2 text-center">{index + 1}</td>
                      <td className="border border-slate-400 p-2 text-center whitespace-nowrap">
                        {formatDateIndo(log.tanggal)}
                      </td>
                      <td className="border border-slate-400 p-2">
                        <span className="font-semibold block">
                          {log.dospem === 'dospem1' ? 'Dospem 1' : 'Dospem 2'}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          {log.dospem === 'dospem1' 
                            ? (profile.dospem1.name ? profile.dospem1.name.split(',')[0] : 'Dospem 1') 
                            : (profile.dospem2.name ? profile.dospem2.name.split(',')[0] : 'Dospem 2')}
                        </span>
                      </td>
                      <td className="border border-slate-400 p-2 font-semibold">
                        {log.babMateri}
                      </td>
                      <td className="border border-slate-400 p-2 leading-relaxed">
                        <p className="italic mb-1">{log.catatanDosen}</p>
                        {log.tindakLanjut && (
                          <p className="text-[10px] text-slate-600 font-sans">
                            <strong>Tindak Lanjut:</strong> {log.tindakLanjut}
                          </p>
                        )}
                      </td>
                      <td className="border border-slate-400 p-2 text-center uppercase font-bold text-[10px]">
                        {log.status}
                      </td>
                      <td className="border border-slate-400 p-2 text-center align-middle">
                        <div className="h-8 border-b border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                          [Paraf]
                        </div>
                      </td>
                    </tr>
                  ))}
                  {Array.from({ length: Math.max(0, 6 - bimbinganLogs.length) }).map((_, idx) => (
                    <tr key={`blank-extra-${idx}`} className="h-10">
                      <td className="border border-slate-400 p-2 text-center">{bimbinganLogs.length + idx + 1}</td>
                      <td className="border border-slate-400 p-2"></td>
                      <td className="border border-slate-400 p-2"></td>
                      <td className="border border-slate-400 p-2"></td>
                      <td className="border border-slate-400 p-2"></td>
                      <td className="border border-slate-400 p-2"></td>
                      <td className="border border-slate-400 p-2"></td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Tanda Tangan Pengesahan */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 text-xs sm:text-sm text-center pt-2">
          <div>
            <p className="text-[11px] sm:text-xs">Mengetahui,</p>
            <p className="font-bold">Dosen Pembimbing 1</p>
            <div className="h-14 sm:h-20" />
            <p className="font-bold underline text-xs sm:text-sm">{profile.dospem1.name || '...........................................'}</p>
            {profile.dospem1.nip && <p className="text-[10px] sm:text-xs">NIP. {profile.dospem1.nip}</p>}
          </div>

          <div>
            <p className="text-[11px] sm:text-xs">Mengetahui,</p>
            <p className="font-bold">Dosen Pembimbing 2</p>
            <div className="h-14 sm:h-20" />
            <p className="font-bold underline text-xs sm:text-sm">{profile.dospem2.name || '...........................................'}</p>
            {profile.dospem2.nip && <p className="text-[10px] sm:text-xs">NIP. {profile.dospem2.nip}</p>}
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400 print:text-slate-500">
          Dicetak otomatis melalui Aplikasi SkripsiTracker pada {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
        </div>
      </div>
    </div>
  );
};
