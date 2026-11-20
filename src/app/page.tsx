'use client';

import React, { useState, useEffect } from 'react';
import { AppData, StudentProfile, Milestone, BimbinganLog, TaskItem, DocumentDraft } from '@/types';
import { loadAppData, saveAppData, resetAppData, loadDemoData, exportDataAsJson } from '@/lib/storage';
import { Navbar } from '@/components/Navbar';
import { DashboardOverview } from '@/components/DashboardOverview';
import { MilestonesSection } from '@/components/MilestonesSection';
import { BimbinganSection } from '@/components/BimbinganSection';
import { TaskManagerSection } from '@/components/TaskManagerSection';
import { DocumentsSection } from '@/components/DocumentsSection';
import { PrintableLogbook } from '@/components/PrintableLogbook';
import { StudentProfileModal } from '@/components/StudentProfileModal';

export default function HomePage() {
  const [data, setData] = useState<AppData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [openBimbinganModalInitially, setOpenBimbinganModalInitially] = useState(false);

  // Load state from localStorage on client mount
  useEffect(() => {
    const loaded = loadAppData();
    setData(loaded);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Memuat SkripsiTracker...</p>
        </div>
      </div>
    );
  }

  // Calculate Overall Progress
  const totalMilestones = data.milestones.length;
  const totalProgressSum = data.milestones.reduce((acc, m) => acc + m.progressPercentage, 0);
  const overallProgress = totalMilestones > 0 ? Math.round(totalProgressSum / totalMilestones) : 0;

  // Handlers
  const handleUpdateData = (updated: AppData) => {
    setData(updated);
    saveAppData(updated);
  };

  const handleUpdateProfile = (updatedProfile: StudentProfile) => {
    const updated: AppData = { ...data, profile: updatedProfile };
    handleUpdateData(updated);
  };

  const handleUpdateMilestone = (updatedMilestone: Milestone) => {
    const updatedMilestones = data.milestones.map((m) =>
      m.id === updatedMilestone.id ? updatedMilestone : m
    );
    handleUpdateData({ ...data, milestones: updatedMilestones });
  };

  const handleAddMilestone = (newMilestone: Milestone) => {
    handleUpdateData({ ...data, milestones: [...data.milestones, newMilestone] });
  };

  const handleAddBimbingan = (newLog: BimbinganLog) => {
    handleUpdateData({ ...data, bimbinganLogs: [...data.bimbinganLogs, newLog] });
  };

  const handleUpdateBimbingan = (updatedLog: BimbinganLog) => {
    const updated = data.bimbinganLogs.map((b) => (b.id === updatedLog.id ? updatedLog : b));
    handleUpdateData({ ...data, bimbinganLogs: updated });
  };

  const handleDeleteBimbingan = (id: string) => {
    const updated = data.bimbinganLogs.filter((b) => b.id !== id);
    handleUpdateData({ ...data, bimbinganLogs: updated });
  };

  const handleAddTask = (newTask: TaskItem) => {
    handleUpdateData({ ...data, tasks: [...data.tasks, newTask] });
  };

  const handleToggleTask = (id: string) => {
    const updated = data.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    handleUpdateData({ ...data, tasks: updated });
  };

  const handleDeleteTask = (id: string) => {
    const updated = data.tasks.filter((t) => t.id !== id);
    handleUpdateData({ ...data, tasks: updated });
  };

  const handleAddDocument = (newDoc: DocumentDraft) => {
    handleUpdateData({ ...data, documents: [newDoc, ...data.documents] });
  };

  const handleDeleteDocument = (id: string) => {
    const updated = data.documents.filter((d) => d.id !== id);
    handleUpdateData({ ...data, documents: updated });
  };

  const handleResetData = () => {
    if (confirm('Kosongkan semua data dan mulai baru dari awal?')) {
      const reset = resetAppData();
      setData(reset);
    }
  };

  const handleLoadDemo = () => {
    if (confirm('Muat data contoh (demo) untuk melihat simulasi lengkap aplikasi? Data saat ini akan digantikan dengan data contoh.')) {
      const demo = loadDemoData();
      setData(demo);
    }
  };

  const handleExportData = () => {
    exportDataAsJson(data);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile && parsed.milestones && parsed.bimbinganLogs) {
          handleUpdateData(parsed);
          alert('Data berhasil diimpor!');
        } else {
          alert('Format file JSON tidak sesuai struktur SkripsiTracker.');
        }
      } catch (err) {
        alert('Gagal membaca file JSON cadangan.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        profile={data.profile}
        overallProgress={overallProgress}
        onEditProfile={() => setIsProfileModalOpen(true)}
        onExportData={handleExportData}
        onImportData={handleImportData}
        onResetData={handleResetData}
        onLoadDemoData={handleLoadDemo}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <DashboardOverview
            profile={data.profile}
            milestones={data.milestones}
            bimbinganLogs={data.bimbinganLogs}
            tasks={data.tasks}
            overallProgress={overallProgress}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onQuickAddBimbingan={() => {
              setActiveTab('bimbingan');
              setOpenBimbinganModalInitially(true);
            }}
            onQuickAddTask={() => {
              setActiveTab('tasks');
            }}
            onOpenProfileModal={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'milestones' && (
          <MilestonesSection
            milestones={data.milestones}
            onUpdateMilestone={handleUpdateMilestone}
            onAddMilestone={handleAddMilestone}
          />
        )}

        {activeTab === 'bimbingan' && (
          <BimbinganSection
            profile={data.profile}
            bimbinganLogs={data.bimbinganLogs}
            onAddLog={handleAddBimbingan}
            onUpdateLog={handleUpdateBimbingan}
            onDeleteLog={handleDeleteBimbingan}
            onNavigatePrint={() => setActiveTab('print')}
            isAddModalOpenInitially={openBimbinganModalInitially}
          />
        )}

        {activeTab === 'tasks' && (
          <TaskManagerSection
            tasks={data.tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsSection
            documents={data.documents}
            onAddDocument={handleAddDocument}
            onDeleteDocument={handleDeleteDocument}
          />
        )}

        {activeTab === 'print' && (
          <PrintableLogbook
            profile={data.profile}
            bimbinganLogs={data.bimbinganLogs}
            onBack={() => setActiveTab('overview')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 print:hidden mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 SkripsiTracker • Sahabat Mahasiswa Menuju Kelulusan</p>
          <p className="text-emerald-700 font-medium">
            &ldquo;Skripsi yang baik adalah skripsi yang selesai.&rdquo;
          </p>
        </div>
      </footer>

      {/* Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={data.profile}
        onSave={handleUpdateProfile}
      />
    </div>
  );
}
