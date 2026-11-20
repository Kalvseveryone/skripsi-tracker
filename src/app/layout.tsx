import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SkripsiTracker - Aplikasi Pemantau Progres Skripsi Mahasiswa',
  description: 'Pantau tahapan bab, logbook bimbingan dosen, to-do list revisi, dan cetak lembar kontrol skripsi secara real-time.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="w-full max-w-full overflow-x-hidden">
      <body className="min-h-screen bg-slate-50 antialiased selection:bg-emerald-500 selection:text-white w-full max-w-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
