import { AppData } from '@/types';

export const MOTIVATIONAL_QUOTES = [
  { text: "Skripsi yang baik adalah skripsi yang selesai, bukan yang sempurna tapi tak pernah tuntas.", author: "Pepatah Mahasiswa Akhir" },
  { text: "Revisi itu bukan tanda kamu gagal, tapi bukti skripsimu sedang dibentuk jadi mahakarya.", author: "Semangat Pejuang Toga" },
  { text: "Satu paragraf hari ini lebih berharga daripada seribu rencana di kepala besok.", author: "Akademisi Bijak" },
  { text: "Dosen pembimbingmu bukan monster, mereka hanya ingin kamu lulus dengan kepala tegak.", author: "Tips Bimbingan" },
  { text: "Ingat senyum orang tua saat kamu mengenakan toga dan memindahkan kuncir wisuda.", author: "Motivasi Terbesar" },
  { text: "Jangan biarkan Bab 3 atau olah data menghentikan impian sarjanamu. Terus melangkah!", author: "Fighter Kampus" },
  { text: "Lelah boleh, istirahat secukupnya, tapi jangan pernah menyerah sebelum ACC final!", author: "Pejuang Skripsi" }
];

// Clean template for new user (Kosong & Siap Diisi Sendiri)
export const INITIAL_APP_DATA: AppData = {
  profile: {
    nama: "",
    nim: "",
    universitas: "",
    fakultas: "",
    programStudi: "",
    judulSkripsi: "",
    bidangKajian: "",
    dospem1: {
      name: "",
      nip: "",
      email: "",
      phone: "",
      room: ""
    },
    dospem2: {
      name: "",
      nip: "",
      email: "",
      phone: "",
      room: ""
    },
    targetSidang: "",
    tanggalMulai: "",
    targetBimbinganMin: 8
  },
  milestones: [
    {
      id: "m-1",
      order: 1,
      title: "Pengajuan & ACC Judul",
      category: "Pra-Sempro",
      description: "Penetapan topik penelitian, rumusan ide awal, dan persetujuan tema oleh Dosen Pembimbing / Kaprodi.",
      status: "not_started",
      progressPercentage: 0,
      checklist: [
        { id: "c-1-1", text: "Studi literatur awal minimal 5 paper terkait", completed: false },
        { id: "c-1-2", text: "Penyusunan Form Pengajuan Judul (Form TA-1)", completed: false },
        { id: "c-1-3", text: "Konsultasi & persetujuan Dospem 1 & 2", completed: false },
        { id: "c-1-4", text: "Pengesahan dari Koordinator Skripsi / Kaprodi", completed: false }
      ]
    },
    {
      id: "m-2",
      order: 2,
      title: "Bab 1: Pendahuluan",
      category: "Pra-Sempro",
      description: "Penyusunan latar belakang masalah, rumusan masalah, batasan masalah, tujuan dan manfaat penelitian.",
      status: "not_started",
      progressPercentage: 0,
      checklist: [
        { id: "c-2-1", text: "Menulis latar belakang dengan fenomena & gap masalah", completed: false },
        { id: "c-2-2", text: "Menentukan rumusan masalah terukur", completed: false },
        { id: "c-2-3", text: "Menentukan batasan penelitian yang realistis", completed: false },
        { id: "c-2-4", text: "Bimbingan Bab 1 dan revisi pertama", completed: false }
      ]
    },
    {
      id: "m-3",
      order: 3,
      title: "Bab 2: Tinjauan Pustaka",
      category: "Pra-Sempro",
      description: "Kajian teori pendukung, landasan konseptual, tinjauan penelitian terdahulu, dan kerangka berpikir.",
      status: "not_started",
      progressPercentage: 0,
      checklist: [
        { id: "c-3-1", text: "Kumpulkan jurnal rujukan terindeks (Sinta / Scopus)", completed: false },
        { id: "c-3-2", text: "Susun tabel sintesis penelitian sejenis", completed: false },
        { id: "c-3-3", text: "Tulis landasan teori teknologi dan framework", completed: false },
        { id: "c-3-4", text: "Buat diagram alur kerangka berpikir penelitian", completed: false }
      ]
    },
    {
      id: "m-4",
      order: 4,
      title: "Bab 3: Metodologi Penelitian",
      category: "Pra-Sempro",
      description: "Metode perancangan / eksperimen, diagram arsitektur, teknik analisis data, & instrumen penelitian.",
      status: "not_started",
      progressPercentage: 0,
      checklist: [
        { id: "c-4-1", text: "Pilih & jelaskan metode penelitian / SDLC", completed: false },
        { id: "c-4-2", text: "Buat perancangan sistem / instrumen analisis", completed: false },
        { id: "c-4-3", text: "Tentukan parameter pengujian & evaluasi", completed: false },
        { id: "c-4-4", text: "Dapatkan ACC Proposal Bab 1-3 dari kedua Dospem", completed: false }
      ]
    },
    {
      id: "m-5",
      order: 5,
      title: "Seminar Proposal (Sempro)",
      category: "Sempro",
      description: "Pendaftaran sempro, presentasi proposal di depan dosen penguji, dan penyelesaian revisi sempro.",
      status: "not_started",
      progressPercentage: 0,
      checklist: [
        { id: "c-5-1", text: "Lengkapi berkas pendaftaran Sempro", completed: false },
        { id: "c-5-2", text: "Siapkan slide presentasi", completed: false },
        { id: "c-5-3", text: "Pelaksanaan Seminar Proposal", completed: false },
        { id: "c-5-4", text: "Tuntaskan revisi Sempro & tanda tangan pengesahan", completed: false }
      ]
    },
    {
      id: "m-6",
      order: 6,
      title: "Bab 4: Hasil & Pembahasan",
      category: "Penelitian",
      description: "Implementasi penelitian / sistem, pengujian, analisis hasil, dan pembahasan temuan.",
      status: "not_started",
      progressPercentage: 0,
      checklist: [
        { id: "c-6-1", text: "Pengumpulan data / coding implementasi sistem", completed: false },
        { id: "c-6-2", text: "Pelaksanaan pengujian atau evaluasi instrumen", completed: false },
        { id: "c-6-3", text: "Tulis pembahasan analisis hasil evaluasi & visualisasi grafik", completed: false },
        { id: "c-6-4", text: "Bimbingan Bab 4 ke Dospem", completed: false }
      ]
    },
    {
      id: "m-7",
      order: 7,
      title: "Bab 5: Kesimpulan & Saran",
      category: "Penelitian",
      description: "Menjawab rumusan masalah berdasarkan hasil penelitian dan memberikan saran penelitian lanjutan.",
      status: "not_started",
      progressPercentage: 0,
      checklist: [
        { id: "c-7-1", text: "Tulis poin kesimpulan menjawab rumusan masalah", completed: false },
        { id: "c-7-2", text: "Tulis saran teknis dan akademis", completed: false },
        { id: "c-7-3", text: "Lengkapi lampiran kode / kuesioner", completed: false }
      ]
    },
    {
      id: "m-8",
      order: 8,
      title: "Seminar Hasil & Prapendadaran",
      category: "Semhas",
      description: "Presentasi naskah lengkap dan demo sebelum mendaftar sidang skripsi akhir.",
      status: "not_started",
      progressPercentage: 0,
      checklist: [
        { id: "c-8-1", text: "Cek plagiasi Turnitin (< 20%)", completed: false },
        { id: "c-8-2", text: "Demo sistem / laporan bebas bug", completed: false },
        { id: "c-8-3", text: "Pendaftaran Seminar Hasil", completed: false },
        { id: "c-8-4", text: "ACC naskah lengkap dari kedua pembimbing", completed: false }
      ]
    },
    {
      id: "m-9",
      order: 9,
      title: "Sidang Skripsi (Pendadaran)",
      category: "Sidang",
      description: "Ujian komprehensif penentuan kelulusan sarjana di depan dewan penguji.",
      status: "not_started",
      progressPercentage: 0,
      checklist: [
        { id: "c-9-1", text: "Pengumpulan berkas pendaftaran sidang lengkap", completed: false },
        { id: "c-9-2", text: "Simulasi latihan tanya jawab", completed: false },
        { id: "c-9-3", text: "Pelaksanaan Sidang Skripsi", completed: false }
      ]
    },
    {
      id: "m-10",
      order: 10,
      title: "Revisi Pasca Sidang & Wisuda",
      category: "Pasca-Sidang",
      description: "Perbaikan naskah final, pengesahan dewan penguji, bebas pustaka, dan yudisium.",
      status: "not_started",
      progressPercentage: 0,
      checklist: [
        { id: "c-10-1", text: "Tuntaskan revisi naskah final", completed: false },
        { id: "c-10-2", text: "Tanda tangan lembar pengesahan penguji", completed: false },
        { id: "c-10-3", text: "Unggah naskah ke repositori perpustakaan", completed: false },
        { id: "c-10-4", text: "Bebas pinjam perpustakaan & daftar Yudisium", completed: false }
      ]
    }
  ],
  bimbinganLogs: [],
  tasks: [],
  documents: []
};

// Data Contoh / Mock Demonstration Data
export const DEMO_APP_DATA: AppData = {
  profile: {
    nama: "Muhammad Rayhan Pratama",
    nim: "210401088",
    universitas: "Universitas Indonesia",
    fakultas: "Fakultas Ilmu Komputer",
    programStudi: "Teknik Informatika",
    judulSkripsi: "Rancang Bangun Sistem Informasi Pemantauan Progres Tugas Akhir Berbasis Web dengan Rekomendasi Milestone Interaktif",
    bidangKajian: "Rekayasa Perangkat Lunak & Sistem Informasi",
    dospem1: {
      name: "Prof. Dr. Ir. Budi Rahardjo, M.T.",
      nip: "197805122003121002",
      email: "budi.rahardjo@univ.ac.id",
      phone: "+62 812-3456-7890",
      room: "Gedung A Lab Rekayasa Ruang 304"
    },
    dospem2: {
      name: "Dr. Siti Aminah, S.Kom., M.Kom.",
      nip: "198503202010122003",
      email: "siti.aminah@univ.ac.id",
      phone: "+62 813-9876-5432",
      room: "Gedung B Lt. 2 Ruang Dosen TI"
    },
    targetSidang: "2027-02-15",
    tanggalMulai: "2026-09-01",
    targetBimbinganMin: 8
  },
  milestones: [
    {
      id: "m-1",
      order: 1,
      title: "Pengajuan & ACC Judul",
      category: "Pra-Sempro",
      description: "Penetapan topik penelitian, rumusan ide awal, dan persetujuan tema oleh Dosen Pembimbing / Kaprodi.",
      status: "completed",
      progressPercentage: 100,
      targetDate: "2026-09-15",
      completedDate: "2026-09-14",
      notes: "Judul disetujui dospem 1 & 2 dengan catatan fokus pada studi kasus mahasiswa tingkat akhir.",
      checklist: [
        { id: "c-1-1", text: "Studi literatur awal minimal 5 paper terkait", completed: true },
        { id: "c-1-2", text: "Penyusunan Form Pengajuan Judul (Form TA-1)", completed: true },
        { id: "c-1-3", text: "Konsultasi & persetujuan Dospem 1 & 2", completed: true },
        { id: "c-1-4", text: "Pengesahan dari Koordinator Skripsi / Kaprodi", completed: true }
      ]
    },
    {
      id: "m-2",
      order: 2,
      title: "Bab 1: Pendahuluan",
      category: "Pra-Sempro",
      description: "Penyusunan latar belakang masalah, rumusan masalah, batasan masalah, tujuan dan manfaat penelitian.",
      status: "completed",
      progressPercentage: 100,
      targetDate: "2026-10-05",
      completedDate: "2026-10-04",
      notes: "Latar belakang sudah diperkuat dengan data statistik keterlambatan kelulusan.",
      checklist: [
        { id: "c-2-1", text: "Menulis latar belakang dengan fenomena & gap masalah", completed: true },
        { id: "c-2-2", text: "Menentukan rumusan masalah terukur (3 butir)", completed: true },
        { id: "c-2-3", text: "Menentukan batasan penelitian yang realistis", completed: true },
        { id: "c-2-4", text: "Bimbingan Bab 1 dan revisi pertama", completed: true }
      ]
    },
    {
      id: "m-3",
      order: 3,
      title: "Bab 2: Tinjauan Pustaka",
      category: "Pra-Sempro",
      description: "Kajian teori pendukung, landasan konseptual, tinjauan penelitian terdahulu, dan kerangka berpikir.",
      status: "completed",
      progressPercentage: 100,
      targetDate: "2026-10-25",
      completedDate: "2026-10-24",
      notes: "Tabel perbandingan 10 penelitian terdahulu sudah rapi sesuai format IEEE.",
      checklist: [
        { id: "c-3-1", text: "Kumpulkan 15 jurnal terindeks (Sinta / Scopus)", completed: true },
        { id: "c-3-2", text: "Susun tabel sintesis penelitian sejenis", completed: true },
        { id: "c-3-3", text: "Tulis landasan teori teknologi dan framework", completed: true },
        { id: "c-3-4", text: "Buat diagram alur kerangka berpikir penelitian", completed: true }
      ]
    },
    {
      id: "m-4",
      order: 4,
      title: "Bab 3: Metodologi Penelitian",
      category: "Pra-Sempro",
      description: "Metode pengembangan perangkat lunak (Agile / Waterfall), diagram arsitektur, teknik analisis data, & perancangan.",
      status: "completed",
      progressPercentage: 100,
      targetDate: "2026-11-10",
      completedDate: "2026-11-09",
      notes: "Diagram use case, ERD, dan flow data sistem telah disetujui Dospem 1.",
      checklist: [
        { id: "c-4-1", text: "Pilih & jelaskan metode SDLC yang digunakan", completed: true },
        { id: "c-4-2", text: "Buat perancangan sistem (Use Case, Activity, ERD)", completed: true },
        { id: "c-4-3", text: "Tentukan instrumen pengujian (Blackbox & SUS)", completed: true },
        { id: "c-4-4", text: "Dapatkan ACC Proposal Bab 1-3 dari kedua Dospem", completed: true }
      ]
    },
    {
      id: "m-5",
      order: 5,
      title: "Seminar Proposal (Sempro)",
      category: "Sempro",
      description: "Pendaftaran sempro, presentasi proposal di depan dosen penguji, dan penyelesaian revisi sempro.",
      status: "completed",
      progressPercentage: 100,
      targetDate: "2026-11-18",
      completedDate: "2026-11-18",
      notes: "Sempro berjalan lancar! Catatan revisi penguji: tambahkan modul notifikasi dan validasi file upload.",
      checklist: [
        { id: "c-5-1", text: "Lengkapi berkas pendaftaran Sempro ke TU", completed: true },
        { id: "c-5-2", text: "Siapkan slide presentasi (15 menit presentasi)", completed: true },
        { id: "c-5-3", text: "Pelaksanaan Seminar Proposal", completed: true },
        { id: "c-5-4", text: "Tuntaskan revisi Sempro & minta tanda tangan penguji", completed: true }
      ]
    },
    {
      id: "m-6",
      order: 6,
      title: "Bab 4: Hasil & Pembahasan",
      category: "Penelitian",
      description: "Implementasi perangkat lunak / sistem, pengujian fungsionalitas, uji usability (SUS), dan analisis hasil.",
      status: "in_progress",
      progressPercentage: 65,
      targetDate: "2026-12-20",
      notes: "Fitur utama dashboard dan logbook bimbingan selesai. Lanjut tahap integrasi ekspor PDF dan testing.",
      checklist: [
        { id: "c-6-1", text: "Coding implementasi frontend & backend sistem", completed: true },
        { id: "c-6-2", text: "Testing blackbox fungsional fitur", completed: true },
        { id: "c-6-3", text: "Sebar kuesioner System Usability Scale (SUS) ke 30 responden", completed: false },
        { id: "c-6-4", text: "Tulis pembahasan analisis hasil evaluasi & grafik", completed: false },
        { id: "c-6-5", text: "Bimbingan Bab 4 ke Dospem 1 & 2", completed: false }
      ]
    },
    {
      id: "m-7",
      order: 7,
      title: "Bab 5: Kesimpulan & Saran",
      category: "Penelitian",
      description: "Menjawab rumusan masalah berdasarkan hasil penelitian dan memberikan rekomendasi penelitian lanjutan.",
      status: "not_started",
      progressPercentage: 0,
      targetDate: "2027-01-05",
      notes: "Akan disusun setelah analisis data Bab 4 rampung.",
      checklist: [
        { id: "c-7-1", text: "Tulis poin kesimpulan menjawab rumusan masalah", completed: false },
        { id: "c-7-2", text: "Tulis saran teknis dan saran akademis", completed: false },
        { id: "c-7-3", text: "Lengkapi lampiran kode program dan lembar instrumen", completed: false }
      ]
    },
    {
      id: "m-8",
      order: 8,
      title: "Seminar Hasil & Prapendadaran",
      category: "Semhas",
      description: "Presentasi hasil implementasi lengkap dan demo aplikasi di hadapan tim penguji sebelum sidang akhir.",
      status: "not_started",
      progressPercentage: 0,
      targetDate: "2027-01-20",
      notes: "Syarat: Minimal 8x bimbingan per dosen dan cek plagiarisme Turnitin < 20%.",
      checklist: [
        { id: "c-8-1", text: "Cek plagiasi Turnitin naskah lengkap (< 20%)", completed: false },
        { id: "c-8-2", text: "Demo sistem siap running dan bebas bug kritis", completed: false },
        { id: "c-8-3", text: "Daftar Semhas ke koordinator tugas akhir", completed: false },
        { id: "c-8-4", text: "ACC naskah lengkap dari kedua pembimbing", completed: false }
      ]
    },
    {
      id: "m-9",
      order: 9,
      title: "Sidang Skripsi (Pendadaran)",
      category: "Sidang",
      description: "Ujian komprehensif penentuan kelulusan sarjana di depan dewan penguji.",
      status: "not_started",
      progressPercentage: 0,
      targetDate: "2027-02-15",
      notes: "Target utama kelulusan tepat waktu!",
      checklist: [
        { id: "c-9-1", text: "Pengumpulan berkas pendaftaran sidang (transkrip, TOEFL, bebas SPP)", completed: false },
        { id: "c-9-2", text: "Latihan simulasi tanya jawab teknis dan metodologi", completed: false },
        { id: "c-9-3", text: "Pelaksanaan Sidang Skripsi", completed: false }
      ]
    },
    {
      id: "m-10",
      order: 10,
      title: "Revisi Pasca Sidang & Wisuda",
      category: "Pasca-Sidang",
      description: "Perbaikan naskah final, penandatanganan lembar pengesahan, serah terima berkas perpustakaan, dan yudisium.",
      status: "not_started",
      progressPercentage: 0,
      targetDate: "2027-03-01",
      notes: "Perjuangan tuntas, siap menyandang gelar sarjana!",
      checklist: [
        { id: "c-10-1", text: "Revisi final sesuai berita acara sidang (maks 14 hari)", completed: false },
        { id: "c-10-2", text: "Tanda tangan lembar pengesahan dewan penguji", completed: false },
        { id: "c-10-3", text: "Submit jurnal / artikel ilmiah ke repositori kampus", completed: false },
        { id: "c-10-4", text: "Bebas pinjam perpustakaan & daftar Yudisium", completed: false }
      ]
    }
  ],
  bimbinganLogs: [
    {
      id: "b-1",
      tanggal: "2026-09-12",
      dospem: "dospem1",
      dospemName: "Prof. Dr. Ir. Budi Rahardjo, M.T.",
      babMateri: "Pengajuan Judul & Ruang Lingkup",
      catatanDosen: "Ide rancang bangun tracker skripsi bagus. Tambahkan benchmarking dengan tools manajemen tugas umum seperti Trello/Notion untuk melihat novelty-nya.",
      tindakLanjut: "Membuat tabel perbandingan fitur dan menyempurnakan batasan masalah.",
      status: "acc",
      metode: "tatap_muka"
    },
    {
      id: "b-2",
      tanggal: "2026-09-28",
      dospem: "dospem2",
      dospemName: "Dr. Siti Aminah, S.Kom., M.Kom.",
      babMateri: "Draft Bab 1 & Referensi Jurnal",
      catatanDosen: "Perbaiki alur latar belakang pada paragraf 3. Masukkan referensi terbaru (5 tahun terakhir) minimal 8 jurnal.",
      tindakLanjut: "Mencari 10 paper Scopus/Sinta 2 terkait student self-regulation dan thesis progress monitoring.",
      status: "revisi",
      metode: "tatap_muka",
      targetSelesaiRevisi: "2026-10-03"
    },
    {
      id: "b-3",
      tanggal: "2026-10-04",
      dospem: "dospem2",
      dospemName: "Dr. Siti Aminah, S.Kom., M.Kom.",
      babMateri: "Revisi Bab 1 (ACC)",
      catatanDosen: "Latar belakang sudah mengerucut dengan baik. Masalah dan urgensi jelas. Lanjut Bab 2.",
      tindakLanjut: "Mulai menyusun kerangka teori dan sintesis literatur Bab 2.",
      status: "acc",
      metode: "email_chat"
    },
    {
      id: "b-4",
      tanggal: "2026-10-22",
      dospem: "dospem1",
      dospemName: "Prof. Dr. Ir. Budi Rahardjo, M.T.",
      babMateri: "Draft Bab 2 & Bab 3 Awal",
      catatanDosen: "Gunakan standar diagram UML 2.0 yang tepat. Di Bab 3, pastikan instrumen usability testing dijelaskan detail indikatornya.",
      tindakLanjut: "Memperbaiki diagram activity dan menyusun instrumen kuesioner SUS.",
      status: "revisi",
      metode: "zoom",
      targetSelesaiRevisi: "2026-10-29"
    },
    {
      id: "b-5",
      tanggal: "2026-11-08",
      dospem: "dospem1",
      dospemName: "Prof. Dr. Ir. Budi Rahardjo, M.T.",
      babMateri: "Review Akhir Proposal Bab 1-3 (ACC Sempro)",
      catatanDosen: "Proposal sudah matang dan layak diujikan pada Seminar Proposal. Siapkan slide yang ringkas dan padat.",
      tindakLanjut: "Mencetak form pendaftaran sempro dan meminta tanda tangan persetujuan.",
      status: "acc",
      metode: "tatap_muka"
    },
    {
      id: "b-6",
      tanggal: "2026-11-19",
      dospem: "dospem2",
      dospemName: "Dr. Siti Aminah, S.Kom., M.Kom.",
      babMateri: "Evaluasi Pasca Sempro & Arsitektur Bab 4",
      catatanDosen: "Selamat atas sempronya. Perhatikan catatan penguji mengenai validasi upload dokumen dan keamanan data mahasiswa.",
      tindakLanjut: "Menambahkan modul validasi tipe mime file dan enkripsi data lokal.",
      status: "review",
      metode: "tatap_muka",
      targetSelesaiRevisi: "2026-11-26"
    }
  ],
  tasks: [
    {
      id: "t-1",
      title: "Selesaikan modul ekspor logbook bimbingan ke format cetak PDF",
      bab: "Bab 4",
      priority: "tinggi",
      completed: true,
      dueDate: "2026-11-21",
      createdAt: "2026-11-15"
    },
    {
      id: "t-2",
      title: "Desain kuesioner System Usability Scale (SUS) di Google Form",
      bab: "Bab 4",
      priority: "tinggi",
      completed: false,
      dueDate: "2026-11-25",
      createdAt: "2026-11-19"
    },
    {
      id: "t-3",
      title: "Uji blackbox testing fitur upload draft & download",
      bab: "Bab 4",
      priority: "sedang",
      completed: false,
      dueDate: "2026-11-28",
      createdAt: "2026-11-20"
    },
    {
      id: "t-4",
      title: "Tulis draf pembahasan hasil pengujian performa web",
      bab: "Bab 4",
      priority: "sedang",
      completed: false,
      dueDate: "2026-12-05",
      createdAt: "2026-11-20"
    },
    {
      id: "t-5",
      title: "Minta tanda tangan lembar berita acara revisi Sempro ke Penguji 2",
      bab: "Sempro",
      priority: "tinggi",
      completed: true,
      dueDate: "2026-11-20",
      createdAt: "2026-11-18"
    },
    {
      id: "t-6",
      title: "Update daftar pustaka Mendeley / Zotero untuk Bab 4",
      bab: "Bab 4",
      priority: "rendah",
      completed: false,
      dueDate: "2026-12-10",
      createdAt: "2026-11-20"
    }
  ],
  documents: [
    {
      id: "doc-1",
      version: "v1.0",
      title: "Draft Proposal Lengkap Bab 1-3 (Pra-Sempro)",
      fileName: "Proposal_Skripsi_Rayhan_v1.0.pdf",
      fileSize: 2450000,
      fileUrl: "#",
      uploadDate: "2026-11-10",
      notes: "Versi naskah yang diajukan untuk pendaftaran seminar proposal.",
      stage: "Sempro"
    },
    {
      id: "doc-2",
      version: "v1.1",
      title: "Naskah Proposal Pasca Revisi Penguji",
      fileName: "Proposal_Skripsi_Rayhan_v1.1_ACC_Revisi.pdf",
      fileSize: 2610000,
      fileUrl: "#",
      uploadDate: "2026-11-19",
      notes: "Sudah dilengkapi tanggapan revisi penguji dan tanda tangan lembar revisi.",
      stage: "Sempro"
    },
    {
      id: "doc-3",
      version: "v2.0-wip",
      title: "Draft Bab 4 Implementasi & Pengujian (Work in Progress)",
      fileName: "Draft_Bab4_Sistem_Tracker.docx",
      fileSize: 1840000,
      fileUrl: "#",
      uploadDate: "2026-11-20",
      notes: "Progress 65%, mencakup screenshot antarmuka dan hasil uji unit.",
      stage: "Penelitian"
    }
  ]
};
