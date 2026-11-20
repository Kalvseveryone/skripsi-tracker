export type MilestoneStatus = 'not_started' | 'in_progress' | 'review' | 'revision' | 'completed';

export interface Milestone {
  id: string;
  order: number;
  title: string;
  category: 'Pra-Sempro' | 'Sempro' | 'Penelitian' | 'Semhas' | 'Sidang' | 'Pasca-Sidang';
  description: string;
  status: MilestoneStatus;
  progressPercentage: number;
  targetDate?: string;
  completedDate?: string;
  notes?: string;
  checklist: {
    id: string;
    text: string;
    completed: boolean;
  }[];
}

export interface Lecturer {
  name: string;
  nip?: string;
  email?: string;
  phone?: string;
  room?: string;
}

export interface StudentProfile {
  nama: string;
  nim: string;
  universitas: string;
  fakultas: string;
  programStudi: string;
  judulSkripsi: string;
  bidangKajian: string;
  dospem1: Lecturer;
  dospem2: Lecturer;
  targetSidang: string;
  tanggalMulai: string;
  targetBimbinganMin: number;
}

export type BimbinganMetode = 'tatap_muka' | 'zoom' | 'email_chat' | 'drive';
export type BimbinganStatus = 'acc' | 'revisi' | 'review';

export interface BimbinganLog {
  id: string;
  tanggal: string;
  dospem: 'dospem1' | 'dospem2';
  dospemName: string;
  babMateri: string;
  catatanDosen: string;
  tindakLanjut: string;
  status: BimbinganStatus;
  metode: BimbinganMetode;
  targetSelesaiRevisi?: string;
  attachmentName?: string;
  attachmentUrl?: string;
}

export type PriorityLevel = 'rendah' | 'sedang' | 'tinggi';

export interface TaskItem {
  id: string;
  title: string;
  bab?: string;
  priority: PriorityLevel;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
}

export interface DocumentDraft {
  id: string;
  version: string;
  title: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  uploadDate: string;
  notes: string;
  stage: string;
}

export interface AppData {
  profile: StudentProfile;
  milestones: Milestone[];
  bimbinganLogs: BimbinganLog[];
  tasks: TaskItem[];
  documents: DocumentDraft[];
}

