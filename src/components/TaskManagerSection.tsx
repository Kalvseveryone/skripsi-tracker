'use client';

import React, { useState } from 'react';
import { TaskItem, PriorityLevel } from '@/types';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Calendar, 
  ListTodo,
  CheckSquare
} from 'lucide-react';
import { formatDateIndo } from '@/lib/utils';
import { triggerConfetti } from './ConfettiReward';

interface TaskManagerSectionProps {
  tasks: TaskItem[];
  onAddTask: (task: TaskItem) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskManagerSection: React.FC<TaskManagerSectionProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);

  // New task form state
  const [title, setTitle] = useState('');
  const [bab, setBab] = useState('Bab 4');
  const [priority, setPriority] = useState<PriorityLevel>('sedang');
  const [dueDate, setDueDate] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: TaskItem = {
      id: `t-${Date.now()}`,
      title: title.trim(),
      bab,
      priority,
      completed: false,
      dueDate: dueDate || undefined,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    onAddTask(newTask);
    setTitle('');
    setDueDate('');
    setIsAdding(false);
  };

  const handleToggle = (task: TaskItem) => {
    onToggleTask(task.id);
    if (!task.completed) {
      triggerConfetti();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'active' && task.completed) return false;
    if (filterStatus === 'completed' && !task.completed) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header and Counters */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-indigo-600" />
            Tugas & Target Harian
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pecah skripsimu ke langkah mikro yang terukur.
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2.5">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-bold text-[11px]">
              {activeCount} Aktif
            </span>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[11px]">
              {completedCount} Selesai
            </span>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Tambah Tugas
          </button>
        </div>
      </div>

      {/* Add Task Box */}
      {isAdding && (
        <form
          onSubmit={handleCreateTask}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-indigo-200 shadow-md space-y-3 animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-indigo-900">Buat Tugas Baru</h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Tutup
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Tugas</label>
            <input
              type="text"
              required
              placeholder="Misal: Perbaiki rumusan masalah Bab 1..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Terkait Bab</label>
              <select
                value={bab}
                onChange={(e) => setBab(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl"
              >
                <option value="Pra-Sempro">Pra-Sempro</option>
                <option value="Bab 1">Bab 1: Pendahuluan</option>
                <option value="Bab 2">Bab 2: Tinjauan Pustaka</option>
                <option value="Bab 3">Bab 3: Metodologi</option>
                <option value="Sempro">Sempro & Revisi</option>
                <option value="Bab 4">Bab 4: Hasil & Pembahasan</option>
                <option value="Bab 5">Bab 5: Kesimpulan</option>
                <option value="Sidang">Sidang Akhir</option>
                <option value="Administrasi">Administrasi & Yudisium</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Prioritas</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl font-medium"
              >
                <option value="tinggi">🔥 Prioritas Tinggi</option>
                <option value="sedang">⚡ Prioritas Sedang</option>
                <option value="rendah">🌱 Prioritas Rendah</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Deadline</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1.5">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
            >
              Simpan Tugas
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2.5 flex-wrap">
        <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${filterStatus === 'all' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}
          >
            Semua ({tasks.length})
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${filterStatus === 'active' ? 'bg-white shadow-xs text-indigo-700' : 'text-slate-600'}`}
          >
            Aktif ({activeCount})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${filterStatus === 'completed' ? 'bg-white shadow-xs text-emerald-700' : 'text-slate-600'}`}
          >
            Selesai ({completedCount})
          </button>
        </div>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white font-medium"
        >
          <option value="all">Semua Prioritas</option>
          <option value="tinggi">Tinggi</option>
          <option value="sedang">Sedang</option>
          <option value="rendah">Rendah</option>
        </select>
      </div>

      {/* Task Items List (Touch targets) */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <CheckSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-600">Tidak ada tugas pada filter ini.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 sm:p-4 rounded-2xl border transition-all gap-2 ${
                task.completed
                  ? 'bg-slate-50/70 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => handleToggle(task)}
                  className="p-1 text-slate-400 hover:text-emerald-600 transition shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 hover:text-slate-500" />
                  )}
                </button>

                <div className="min-w-0">
                  <p
                    className={`text-xs sm:text-sm font-semibold truncate ${
                      task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500 flex-wrap">
                    {task.bab && (
                      <span className="px-1.5 py-0.2 bg-slate-100 text-slate-700 font-medium rounded">
                        {task.bab}
                      </span>
                    )}
                    {task.dueDate && (
                      <span className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                        {formatDateIndo(task.dueDate)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    task.priority === 'tinggi'
                      ? 'bg-rose-100 text-rose-800'
                      : task.priority === 'sedang'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {task.priority}
                </span>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg transition"
                  title="Hapus Tugas"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
