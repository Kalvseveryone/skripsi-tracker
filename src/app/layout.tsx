import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SkripsiTracker - Aplikasi Pemantau Progres Skripsi Mahasiswa',
  description: 'Pantau tahapan bab, logbook bimbingan dosen, to-do list revisi, dan cetak lembar kontrol skripsi secara real-time.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

