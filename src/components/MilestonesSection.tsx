'use client';

import React, { useState } from 'react';
import { 
  Milestone, 
  MilestoneStatus 
} from '@/types';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Plus, 
  Sparkles,
  BookMarked,
  CheckSquare,
  Square
} from 'lucide-react';
import { formatDateIndo } from '@/lib/utils';
import { triggerConfetti } from './ConfettiReward';

interface MilestonesSectionProps {
  milestones: Milestone[];
  onUpdateMilestone: (updated: Milestone) => void;
  onAddMilestone: (newMilestone: Milestone) => void;
}

export const MilestonesSection: React.FC<MilestonesSectionProps> = ({
  milestones,
  onUpdateMilestone,
  onAddMilestone,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(milestones[0]?.id || null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [newChecklistText, setNewChecklistText] = useState('');

  const categories = ['all', 'Pra-Sempro', 'Sempro', 'Penelitian', 'Semhas', 'Sidang', 'Pasca-Sidang'];

  const filteredMilestones = milestones.filter((m) => {
    if (filterCategory === 'all') return true;
    return m.category === filterCategory;
  });

  const toggleChecklist = (milestone: Milestone, checklistId: string) => {
    const updatedChecklist = milestone.checklist.map((item) => {
      if (item.id === checklistId) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    const completedCount = updatedChecklist.filter((c) => c.completed).length;
    const totalCount = updatedChecklist.length;
    const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : milestone.progressPercentage;

    let newStatus: MilestoneStatus = milestone.status;
    if (newProgress === 100) {
      newStatus = 'completed';
      triggerConfetti();
    } else if (newProgress > 0 && newStatus === 'not_started') {
      newStatus = 'in_progress';
    }

    onUpdateMilestone({
      ...milestone,
      checklist: updatedChecklist,
      progressPercentage: newProgress,
      status: newStatus,
      completedDate: newProgress === 100 ? new Date().toISOString().slice(0, 10) : milestone.completedDate,
    });
  };

  const handleStatusChange = (milestone: Milestone, newStatus: MilestoneStatus) => {
    let newProgress = milestone.progressPercentage;
    let completedDate = milestone.completedDate;

    if (newStatus === 'completed') {
      newProgress = 100;
      completedDate = new Date().toISOString().slice(0, 10);
      triggerConfetti();
    } else if (newStatus === 'not_started') {
      newProgress = 0;
      completedDate = undefined;
    }

    onUpdateMilestone({
      ...milestone,
      status: newStatus,
      progressPercentage: newProgress,
      completedDate,
    });
  };

  const handleAddChecklistItem = (milestone: Milestone) => {
    if (!newChecklistText.trim()) return;
    const newItem = {
      id: `c-${Date.now()}`,
      text: newChecklistText.trim(),
      completed: false,
    };
    const updatedChecklist = [...milestone.checklist, newItem];
    const completedCount = updatedChecklist.filter((c) => c.completed).length;
    const newProgress = Math.round((completedCount / updatedChecklist.length) * 100);

    onUpdateMilestone({
      ...milestone,
      checklist: updatedChecklist,
      progressPercentage: newProgress,
    });
    setNewChecklistText('');
  };

  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Selesai / ACC
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <Clock className="w-3.5 h-3.5 text-blue-600" /> Sedang Dikerjakan
          </span>
        );
      case 'review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
            <AlertCircle className="w-3.5 h-3.5 text-purple-600" /> Review Dosen
          </span>
        );
      case 'revision':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Perlu Revisi
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
            Belum Dimulai
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-emerald-600" />
            Tahapan & Bab Skripsi
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pantau roadmap tugas akhir dari pengajuan judul, seminar proposal, bab pembahasan, hingga sidang yudisium.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                filterCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Semua Tahap' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Milestone Cards List */}
      <div className="space-y-4">
        {filteredMilestones.map((milestone) => {
          const isExpanded = expandedId === milestone.id;
          const completedTasksCount = milestone.checklist.filter((c) => c.completed).length;

          return (
            <div
              key={milestone.id}
              className={`bg-white rounded-2xl border transition-all duration-200 ${
                milestone.status === 'completed'
                  ? 'border-emerald-200 bg-emerald-50/20 shadow-sm'
                  : milestone.status === 'in_progress'
                  ? 'border-blue-200 ring-1 ring-blue-500/20 shadow-md'
                  : 'border-slate-200 shadow-sm'
              }`}
            >
              {/* Card Header */}
              <div
                className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                onClick={() => setExpandedId(isExpanded ? null : milestone.id)}
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      milestone.status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : milestone.status === 'in_progress'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {milestone.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      milestone.order
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                        {milestone.category}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base">{milestone.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{milestone.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  {getStatusBadge(milestone.status)}

                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden hidden md:block">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${milestone.progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-extrabold text-slate-700 w-8 text-right">
                      {milestone.progressPercentage}%
                    </span>
                    <button
                      className="p-1 text-slate-400 hover:text-slate-600 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(isExpanded ? null : milestone.id);
                      }}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-5 animate-in fade-in duration-150">
                  {/* Status & Date Settings */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Ubah Status Tahap
                      </label>
                      <select
                        value={milestone.status}
                        onChange={(e) => handleStatusChange(milestone, e.target.value as MilestoneStatus)}
                        className="w-full text-xs font-semibold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="not_started">Belum Dimulai</option>
                        <option value="in_progress">Sedang Dikerjakan</option>
                        <option value="review">Review Dosen</option>
                        <option value="revision">Perlu Revisi</option>
                        <option value="completed">Selesai / ACC (100%)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Target Selesai
                      </label>
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatDateIndo(milestone.targetDate)}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Tanggal Tuntas
                      </label>
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{milestone.completedDate ? formatDateIndo(milestone.completedDate) : 'Belum selesai'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes / Catatan Dosen */}
                  {milestone.notes && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                        Catatan & Catatan Revisi Dosen
                      </span>
                      <p className="text-xs text-amber-950 leading-relaxed italic">
                        &ldquo;{milestone.notes}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Checklist Subtasks */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                        Checklist Rincian Tugas ({completedTasksCount}/{milestone.checklist.length})
                      </h4>
                      <span className="text-xs text-slate-500">
                        Klik checklist untuk mengupdate progres otomatis
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {milestone.checklist.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => toggleChecklist(milestone, item.id)}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                            item.completed
                              ? 'bg-emerald-50/60 border-emerald-200 text-slate-500 line-through'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {item.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-300" />
                            )}
                          </div>
                          <span className="leading-snug">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Add Checklist Item */}
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Tambah rincian tugas baru untuk bab ini..."
                        value={newChecklistText}
                        onChange={(e) => setNewChecklistText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddChecklistItem(milestone);
                        }}
                        className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        onClick={() => handleAddChecklistItem(milestone)}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1 shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" /> Tambah
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

