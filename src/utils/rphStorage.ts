import {
  RPHData,
  BabKimia,
  StandardPembelajaran,
  StandardKandungan,
  BahasaRPH,
  SlotJadualWaktu,
  SubjekRPH,
} from '../types/rph';
import {
  SENARAI_KELAS_DEFAULT,
} from '../data/pedagogiData';

const STORAGE_KEY = 'e_rph_kimia_saved_plans_v1';
const TEACHER_PROFILE_KEY = 'e_rph_kimia_teacher_profile';
const TIMETABLE_STORAGE_KEY = 'e_rph_kimia_timetable_slots_v2';
const TIMETABLE_FILE_KEY = 'e_rph_kimia_timetable_file_v2';

export interface ProfilGuru {
  namaGuru: string;
  namaSekolah: string;
  kelasKegemaran: string[];
}

export interface FailJadualWaktu {
  fileName: string;
  mimeType: string;
  previewDataUrl?: string;
  uploadedAt: string;
}

export function simpanProfilGuru(profil: ProfilGuru) {
  try {
    localStorage.setItem(TEACHER_PROFILE_KEY, JSON.stringify(profil));
  } catch (e) {
    console.error('Failed to save teacher profile', e);
  }
}

export function muatProfilGuru(): ProfilGuru {
  try {
    const data = localStorage.getItem(TEACHER_PROFILE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load teacher profile', e);
  }
  return {
    namaGuru: 'Cikgu Kimia',
    namaSekolah: 'SMK Seri Bintang Utama',
    kelasKegemaran: SENARAI_KELAS_DEFAULT,
  };
}

export function muatSlotJadualWaktu(): SlotJadualWaktu[] {
  try {
    const raw = localStorage.getItem(TIMETABLE_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

export function simpanSlotJadualWaktu(slots: SlotJadualWaktu[]) {
  try {
    localStorage.setItem(TIMETABLE_STORAGE_KEY, JSON.stringify(slots));
  } catch {
    // ignore
  }
}

export function muatFailJadualWaktu(): FailJadualWaktu | null {
  try {
    const raw = localStorage.getItem(TIMETABLE_FILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return null;
}

export function simpanFailJadualWaktu(fail: FailJadualWaktu | null) {
  try {
    if (!fail) {
      localStorage.removeItem(TIMETABLE_FILE_KEY);
    } else {
      localStorage.setItem(TIMETABLE_FILE_KEY, JSON.stringify(fail));
    }
  } catch {
    // If previewDataUrl is too large for localStorage, store metadata without previewDataUrl
    if (fail) {
      try {
        localStorage.setItem(
          TIMETABLE_FILE_KEY,
          JSON.stringify({
            fileName: fail.fileName,
            mimeType: fail.mimeType,
            uploadedAt: fail.uploadedAt,
          })
        );
      } catch {
        // ignore
      }
    }
  }
}

export function muatSemuaRPH(): RPHData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load RPH from localStorage', e);
  }
  return [];
}

export function simpanRPH(rph: RPHData): RPHData[] {
  const senarai = muatSemuaRPH();
  const index = senarai.findIndex((item) => item.id === rph.id);
  let updated: RPHData[];
  if (index >= 0) {
    updated = [...senarai];
    updated[index] = { ...rph, updatedAt: new Date().toISOString() };
  } else {
    updated = [rph, ...senarai];
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save RPH to localStorage', e);
  }
  return updated;
}

export function padamRPH(id: string): RPHData[] {
  const senarai = muatSemuaRPH();
  const updated = senarai.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete RPH', e);
  }
  return updated;
}

export function dapatkanTajukSubjek(
  subjek?: SubjekRPH | string,
  isDlp?: boolean,
  isHeader?: boolean
): {
  tajukPendek: string;
  tajukPenuh: string;
  tajukJadual: string;
} {
  const s = String(subjek || 'Kimia').toLowerCase();
  if (s === 'biologi' || s === 'biology') {
    return {
      tajukPendek: isDlp ? 'BIOLOGY' : 'BIOLOGI',
      tajukPenuh: isDlp ? 'BIOLOGY KSSM (DLP)' : (isHeader ? 'BIOLOGI SPM' : 'BIOLOGI KSSM'),
      tajukJadual: isDlp ? 'BIOLOGY KSSM (DLP)' : 'BIOLOGI KSSM',
    };
  }
  if (s === 'fizik' || s === 'physics') {
    return {
      tajukPendek: isDlp ? 'PHYSICS' : 'FIZIK',
      tajukPenuh: isDlp ? 'PHYSICS KSSM (DLP)' : (isHeader ? 'FIZIK SPM' : 'FIZIK KSSM'),
      tajukJadual: isDlp ? 'PHYSICS KSSM (DLP)' : 'FIZIK KSSM',
    };
  }
  if (s === 'sains' || s === 'science') {
    return {
      tajukPendek: isDlp ? 'SCIENCE' : 'SAINS',
      tajukPenuh: isDlp ? 'SCIENCE DLP' : 'SAINS KSSM',
      tajukJadual: isDlp ? 'SCIENCE KSSM (DLP)' : 'SAINS KSSM',
    };
  }
  return {
    tajukPendek: isDlp ? 'CHEMISTRY' : 'KIMIA',
    tajukPenuh: isDlp ? 'CHEMISTRY DLP' : (isHeader ? 'KIMIA SPM' : 'KIMIA KSSM'),
    tajukJadual: isDlp ? 'CHEMISTRY KSSM (DLP)' : 'KIMIA KSSM',
  };
}

export function ciptaRPHBaruDefault(initialSubject: SubjekRPH = 'Kimia'): RPHData {
  const profil = muatProfilGuru();
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const days = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
  const dayName = days[today.getDay()];

  const defaultGuruName =
    profil.namaGuru === 'Cikgu Kimia'
      ? initialSubject === 'Biologi'
        ? 'Cikgu Biologi'
        : initialSubject === 'Fizik'
        ? 'Cikgu Fizik'
        : initialSubject === 'Sains'
        ? 'Cikgu Sains'
        : 'Cikgu Kimia'
      : profil.namaGuru;

  return {
    id: 'rph_' + Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draf',
    subjek: initialSubject,
    bahasa: 'BM',
    isCompact: false,
    modelPdpc: 'Standard KPM',
    info: {
      namaGuru: defaultGuruName,
      namaSekolah: profil.namaSekolah,
      subjek: initialSubject,
      tingkatan: initialSubject === 'Sains' ? 'Tingkatan 2' : 'Tingkatan 4',
      kelas: initialSubject === 'Sains' ? '2 Sains 1' : '4 Sains 1',
      tarikh: dateStr,
      hari: dayName,
      masaMula: '08:00',
      masaTamat: '09:00',
      tempohMinit: 60,
      bilanganMurid: 30,
      kehadiranMurid: '30 / 30',
      mingguAkademik: 1,
      kelasTambahan: [],
    },
    babId: initialSubject === 'Biologi' ? 'F4_B2' : initialSubject === 'Fizik' ? 'F4_B2' : initialSubject === 'Sains' ? 'S_F2_B1' : 'F4_B2',
    babTajuk: initialSubject === 'Biologi' ? 'Bab 2: Biologi Sel dan Organisasi Sel' : initialSubject === 'Fizik' ? 'Bab 2: Daya dan Gerakan I' : initialSubject === 'Sains' ? 'Bab 1: Biodiversiti' : 'Bab 2: Jirim dan Struktur Atom',
    tema: initialSubject === 'Biologi' ? 'Asas Biologi' : initialSubject === 'Fizik' ? 'Mekanik Newton' : initialSubject === 'Sains' ? 'Penyenggaraan dan Kesinambungan Hidup' : 'Asas Kimia',
    skKod: initialSubject === 'Sains' ? '1.1' : '2.1',
    skTajuk: initialSubject === 'Biologi' ? 'Struktur dan Fungsi Sel' : initialSubject === 'Fizik' ? 'Gerakan Linear' : initialSubject === 'Sains' ? 'Kepelbagaian Organisma' : 'Konsep Jirim',
    spKod: [initialSubject === 'Sains' ? '1.1.1' : '2.1.1'],
    spTajuk: [initialSubject === 'Biologi' ? 'Menyediakan slaid sel haiwan dan sel tumbuhan.' : initialSubject === 'Fizik' ? 'Menghuraikan dan berkomunikasi tentang gerakan linear.' : initialSubject === 'Sains' ? 'Menghuraikan dan berkomunikasi mengenai biodiversiti.' : 'Memerihalkan jirim.'],
    isEksperimen: false,
    objektif: [
      'Di akhir sesi PdPc, murid dapat: Mentakrifkan nombor proton dan nombor nukleon dengan tepat.',
      'Menulis perwakilan piawai unsur (X-A-Z) dan melukis susunan elektron bagi sekurang-kurangnya 3 unsur Jadual Berkala.',
    ],
    kriteriaKejayaan: [
      'Murid berjaya mengira bilangan proton, neutron dan elektron daripada perwakilan piawai atom.',
      'Murid berjaya melukis rajah susunan elektron bagi atom natrium dan klorin dengan tepat.',
    ],
    setInduksi:
      'Guru memaparkan kad simbol unsur karbon C-12 dan bertanyakan murid maksud nombor 6 dan 12 pada simbol tersebut.',
    aktivitiUtama: [
      '1. Guru menerangkan konsep nombor proton, nombor nukleon dan susunan elektron menggunakan slaid.',
      '2. Aktiviti PAK-21 "Model Elektron": Murid menyusun manik/pelekat di atas template petala elektron secara berpasangan.',
      '3. Latihan pengukuhan berpasangan menulis susunan elektron dan elektron valens pada papan putih mini.',
    ],
    penutup:
      'Exit ticket: Murid menuliskan susunan elektron bagi Natrium (Z=11) dan Klorin (Z=17) pada sekeping nota lekat sebelum keluar.',
    aktiviti5E: {
      engage:
        'Guru memaparkan kad simbol unsur karbon C-12 dan mencungkil idea murid: "Apakah maksud nombor 6 dan 12 pada simbol ini?"',
      explore:
        'Murid menyusun model petala elektron menggunakan manik magnetik untuk menentukan lokasi proton, neutron dan elektron.',
      explain:
        'Wakil kumpulan menerangkan definisi nombor proton dan nombor nukleon serta formula A = p + n dalam perkataan mereka sendiri.',
      elaborate:
        'Murid menyelesaikan soalan KBAT meramal susunan elektron ion natrium Na+ berbanding atom natrium neutral.',
      evaluate:
        'Pentaksiran formatif kendiri melalui kuiz pantas 3 soalan di papan putih mini.',
    },
    atributHikmah: [
      'H1 - Hikmah (Kebijaksanaan: Memilih SK/SP/SPi tepat & pendekatan pedagogi bermakna)',
      'I - Itqan (Kesungguhan: Persediaan RPH rapi, ABM/BBM berkualiti & amali berkesan)',
      'A - Arif (Mengetahui Mendalam: Menguasai isi kandungan kimia, konsep & soalan KBKK)',
    ],
    nilaiSikapMrsm: [
      'S - Saintifik (Pemikiran teratur, sistematik & berasaskan fakta saintifik)',
      'I - Independen (Berdikari, inisiatif kendiri & proaktif menyelesaikan tugasan)',
    ],
    diferensiasi:
      'Bimbingan khusus diberikan kepada murid kumpulan sederhana untuk mengira bilangan neutron (A - Z). Pengayaan diberikan kepada kumpulan cemerlang untuk melukis susunan elektron sehingga unsur Kalsium (Z=20).',
    pak21Kaedah: [
      'Think-Pair-Share (Fikir-Pasang-Kongsi)',
      'Peta I-Think (Peta Buih/Peta Alir)',
      'Kuiz Pantas / Exit Ticket',
    ],
    kbatAras: ['Mengaplikasi', 'Menganalisis'],
    soalanKbatContoh:
      'Nombor nukleon bagi satu atom Y ialah 23 dan mempunyai 12 neutron. Terangkan bagaimana susunan elektron dan kedudukan unsur Y dalam Jadual Berkala dapat ditentukan.',
    kemahiranSaintifik: ['Memerhati', 'Mengelas', 'Mengukur dan menggunakan nombor'],
    kemahiranManipulatif: [
      'Menggunakan dan mengendalikan radas dan bahan sains dengan betul',
    ],
    emk: ['Sains dan Teknologi', 'Nilai Murni'],
    nilaiMurni: [
      'Berfikiran kritikal dan analitis',
      'Bekerjasama dan menghormati pendapat rakan',
    ],
    bbm: [
      'Buku Teks Kimia KSSM',
      'Jadual Berkala Unsur (JBU)',
      'Papan Putih Mini / Kertas Mahjong',
    ],
    pentaksiranPbd: [
      'Pemerhatian (Rubrik Sikap Saintifik & Amali)',
      'Lembaran Kerja / Latihan Bertulis',
      'Kuiz Pantas / Exit Ticket',
    ],
    tahapPenguasaan: [
      'TP2 - Memahami dan menjelaskan fenomena atau konsep kimia',
      'TP3 - Mengaplikasikan pengetahuan kimia untuk menerangkan kejadian alam / tugasan mudah',
    ],
    refleksi: {
      bilCapai: 28,
      bilTidakCapai: 2,
      tindakanSusulan:
        '2 orang murid yang belum menguasai pengiraan neutron diberikan sesi bimbingan rakan sebaya (peer tutoring) semasa waktu pengukuhan.',
      catatanTambahan:
        'PdPc berjalan lancar dengan penglibatan aktif murid dalam membina model susunan elektron.',
      statusPdpc: 'Selesai',
    },
  };
}

export function binaRPHDariMultiSp(
  bab: BabKimia,
  sk: StandardKandungan,
  spArray: StandardPembelajaran[],
  infoAsas?: Partial<RPHData['info']>,
  modelPdpc?: RPHData['modelPdpc'],
  bahasa: BahasaRPH = 'BM',
  isCompact: boolean = false,
  subjekOverride?: SubjekRPH
): RPHData {
  const profil = muatProfilGuru();
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const days = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];

  const isDlp = bahasa === 'DLP';
  const activeSubjek: SubjekRPH =
    subjekOverride ||
    infoAsas?.subjek ||
    (bab.id.startsWith('S_') ? 'Sains' : 'Kimia');
  const isSains = activeSubjek === 'Sains';
  const listSp = spArray.length > 0 ? spArray : [sk.spList[0]];
  const firstSp = listSp[0];

  // Combine unique objectives, success criteria, main activities, BBM, KPS, and experiments
  const mergedObjektif = Array.from(
    new Set(listSp.flatMap((s) => s.objektifCadangan))
  );
  const mergedKriteria = Array.from(
    new Set(listSp.flatMap((s) => s.kriteriaKejayaanCadangan))
  );
  const mergedAktivitiUtama = Array.from(
    new Set(listSp.flatMap((s) => s.cadanganAktiviti.aktivitiUtama))
  ).map((act, idx) => {
    const cleaned = act.replace(/^\d+\.\s*/, '');
    return `${idx + 1}. ${cleaned}`;
  });
  const mergedBbm = Array.from(new Set(listSp.flatMap((s) => s.bbmCadangan)));
  const mergedKps = Array.from(
    new Set(listSp.flatMap((s) => s.kemahiranSaintifikCadangan))
  );
  const hasExperiment = listSp.some((s) => !!s.eksperimenWajib);
  const expNames = listSp
    .filter((s) => s.namaEksperimen)
    .map((s) => s.namaEksperimen)
    .join(' / ');
  const mergedRadas = Array.from(
    new Set(listSp.flatMap((s) => s.radasBahan || []))
  );

  const combinedTitles = listSp.map((s) => s.tajuk).join('; ');

  const default5E =
    firstSp.cadanganAktiviti.aktiviti5E ||
    (isDlp
      ? {
          engage: firstSp.cadanganAktiviti.setInduksi,
          explore: `Pupils carry out inquiry exploration and hands-on activities related to ${combinedTitles} in small groups.`,
          explain: `Each group presents their conceptual findings (${listSp.map((s) => s.kod).join(', ')}) while the teacher reinforces accurate scientific terminology.`,
          elaborate: `Pupils apply the learned concepts to real-life problem solving and SPM HOTS questions.`,
          evaluate:
            firstSp.cadanganAktiviti.penutup ||
            'Formative assessment and reinforcement worksheet.',
        }
      : {
          engage: firstSp.cadanganAktiviti.setInduksi,
          explore: `Murid menjalankan penerokaan dan aktiviti hands-on berkaitan ${combinedTitles} dalam kumpulan kecil.`,
          explain: `Setiap kumpulan membentangkan dapatan konsep (${listSp.map((s) => s.kod).join(', ')}) dan guru membimbing istilah saintifik tepat.`,
          elaborate: `Murid mengaplikasikan konsep yang dipelajari kepada situasi penyelesaian masalah harian atau soalan KBAT.`,
          evaluate:
            firstSp.cadanganAktiviti.penutup ||
            'Pentaksiran formatif dan lembaran kerja pengukuhan.',
        });

  const babHeader = bab.isProgramKhas
    ? bab.tajuk
    : isDlp
    ? `Chapter ${bab.nomborBab}: ${bab.tajuk}`
    : `Bab ${bab.nomborBab}: ${bab.tajuk}`;

  const bilMurid =
    infoAsas?.bilanganMurid !== undefined ? infoAsas.bilanganMurid : 30;

  return {
    id: 'rph_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'siap',
    subjek: activeSubjek,
    bahasa,
    isCompact,
    modelPdpc: modelPdpc || 'Standard KPM',
    info: {
      namaGuru: infoAsas?.namaGuru || profil.namaGuru,
      namaSekolah: infoAsas?.namaSekolah || profil.namaSekolah,
      subjek: activeSubjek,
      tingkatan: bab.tingkatan,
      kelas:
        infoAsas?.kelas ||
        (bab.tingkatan === 'Tingkatan 2'
          ? '2 Sains 1'
          : bab.tingkatan === 'Tingkatan 3'
          ? '3 Sains 1'
          : bab.tingkatan === 'Tingkatan 4'
          ? '4 Sains 1'
          : '5 Sains 1'),
      tarikh: infoAsas?.tarikh || dateStr,
      hari: infoAsas?.hari || days[today.getDay()],
      masaMula: infoAsas?.masaMula || '08:00',
      masaTamat: infoAsas?.masaTamat || '09:00',
      tempohMinit: Number(infoAsas?.tempohMinit || 60),
      bilanganMurid: bilMurid,
      kehadiranMurid:
        infoAsas?.kehadiranMurid || `${bilMurid} / ${bilMurid}`,
      mingguAkademik: Number(infoAsas?.mingguAkademik || 1),
      kelasTambahan: infoAsas?.kelasTambahan || [],
    },
    babId: bab.id,
    babTajuk: babHeader,
    tema: bab.tema,
    skKod: sk.kod,
    skTajuk: sk.tajuk,
    spKod: listSp.map((s) => s.kod),
    spTajuk: listSp.map((s) => s.tajuk),
    isEksperimen: hasExperiment,
    namaEksperimen: expNames || undefined,
    radasBahanEksperimen: mergedRadas,
    objektif: mergedObjektif,
    kriteriaKejayaan: mergedKriteria,
    setInduksi: firstSp.cadanganAktiviti.setInduksi,
    aktivitiUtama: mergedAktivitiUtama,
    penutup: listSp[listSp.length - 1].cadanganAktiviti.penutup,
    aktiviti5E: default5E,
    atributHikmah: [
      'H1 - Hikmah (Kebijaksanaan: Memilih SK/SP/SPi tepat & pendekatan pedagogi bermakna)',
      'I - Itqan (Kesungguhan: Persediaan RPH rapi, ABM/BBM berkualiti & amali berkesan)',
      'A - Arif (Mengetahui Mendalam: Menguasai isi kandungan kimia, konsep & soalan KBKK)',
    ],
    nilaiSikapMrsm: [
      'S - Saintifik (Pemikiran teratur, sistematik & berasaskan fakta saintifik)',
      'I - Independen (Berdikari, inisiatif kendiri & proaktif menyelesaikan tugasan)',
    ],
    diferensiasi: isDlp
      ? 'Tiered approach: High-ability pupils tackle analytical and evaluative HOTS problems, while moderate-ability pupils are guided using structured templates.'
      : 'Pendekatan berperingkat: Murid berkeupayaan tinggi menjawab soalan analisis/aplikasi lanjutan, manakala murid berkeupayaan sederhana dibimbing menggunakan templat panduan.',
    pak21Kaedah: isDlp
      ? hasExperiment
        ? ['Laboratory Experiment / Practical Investigation', 'Think-Pair-Share', 'Quick Quiz / Exit Ticket']
        : ['Think-Pair-Share', 'Gallery Walk', 'Quick Quiz / Exit Ticket']
      : hasExperiment
      ? ['Eksperimen / Amali Makmal', 'Think-Pair-Share (Fikir-Pasang-Kongsi)', 'Kuiz Pantas / Exit Ticket']
      : ['Think-Pair-Share (Fikir-Pasang-Kongsi)', 'Gallery Walk (Jalan Galeri)', 'Kuiz Pantas / Exit Ticket'],
    kbatAras: isDlp ? ['Applying', 'Analysing'] : ['Mengaplikasi', 'Menganalisis'],
    kemahiranSaintifik:
      mergedKps.length > 0
        ? mergedKps
        : isDlp
        ? ['Observing', 'Interpreting Data']
        : ['Memerhati', 'Mentafsir data'],
    kemahiranManipulatif: isDlp
      ? hasExperiment
        ? [
            'Use and handle science apparatus and substances correctly',
            'Clean science apparatus correctly',
          ]
        : ['Draw specimens, apparatus and substances accurately']
      : hasExperiment
      ? [
          'Menggunakan dan mengendalikan radas dan bahan sains dengan betul',
          'Membersihkan radas sains dengan cara yang betul',
        ]
      : ['Melakar spesimen, radas dan bahan sains dengan tepat'],
    emk: isDlp
      ? ['Science and Technology', 'Noble Values']
      : ['Sains dan Teknologi', 'Nilai Murni'],
    nilaiMurni: isDlp
      ? [
          'Honest and accurate in recording and validating data',
          'Collaborate and respect peers’ opinions',
        ]
      : [
          'Jujur dan tepat dalam merekod dan mengesahkan data',
          'Bekerjasama dan menghormati pendapat rakan',
        ],
    bbm:
      mergedBbm.length > 0
        ? mergedBbm
        : isDlp
        ? [
            isSains ? 'KSSM Science Textbook (DLP)' : 'KSSM Chemistry Textbook (DLP)',
            'Structured Worksheet',
          ]
        : [
            isSains ? 'Buku Teks Sains KSSM' : 'Buku Teks Kimia KSSM',
            'Lembaran Kerja',
          ],
    pentaksiranPbd: isDlp
      ? hasExperiment
        ? ['Observation (Scientific Attitude & Practical Rubric)', 'Written (Laboratory / Experiment Report)']
        : ['Observation (Scientific Attitude & Practical Rubric)', 'Structured Worksheet / Written Exercise']
      : hasExperiment
      ? ['Pemerhatian (Rubrik Sikap Saintifik & Amali)', 'Penulisan (Laporan Amali / Eksperimen)']
      : ['Pemerhatian (Rubrik Sikap Saintifik & Amali)', 'Lembaran Kerja / Latihan Bertulis'],
    tahapPenguasaan: isDlp
      ? [
          isSains
            ? 'PL2 - Understand and explain Science concepts and phenomena'
            : 'PL2 - Understand and explain Chemistry concepts and phenomena',
          isSains
            ? 'PL3 - Apply knowledge and skills in Science to carry out simple tasks'
            : 'PL3 - Apply knowledge and skills in Chemistry to carry out simple tasks',
        ]
      : [
          isSains
            ? 'TP2 - Memahami dan menjelaskan fenomena atau konsep sains'
            : 'TP2 - Memahami dan menjelaskan fenomena atau konsep kimia',
          isSains
            ? 'TP3 - Mengaplikasikan pengetahuan sains untuk menerangkan kejadian alam / tugasan mudah'
            : 'TP3 - Mengaplikasikan pengetahuan kimia untuk menerangkan kejadian alam / tugasan mudah',
        ],
    refleksi: {
      bilCapai:
        typeof bilMurid === 'number' ? Math.max(0, bilMurid - 2) : 28,
      bilTidakCapai: 2,
      tindakanSusulan: isDlp
        ? 'Pupils who have not yet mastered the learning objectives are given targeted reinforcement exercises and peer coaching.'
        : 'Murid yang belum mencapai objektif diberi latihan pengukuhan dan bimbingan rakan sebaya.',
      catatanTambahan: isDlp
        ? 'T&L session achieved the intended learning objectives with active pupil participation.'
        : 'PdPc mencapai objektif yang ditetapkan dengan penglibatan aktif murid.',
      statusPdpc: 'Selesai',
    },
  };
}

export function binaRPHDariDskp(
  bab: BabKimia,
  sk: StandardKandungan,
  sp: StandardPembelajaran,
  infoAsas?: Partial<RPHData['info']>,
  modelPdpc?: RPHData['modelPdpc'],
  bahasa: BahasaRPH = 'BM'
): RPHData {
  return binaRPHDariMultiSp(bab, sk, [sp], infoAsas, modelPdpc, bahasa);
}

// Helper to format all classes (Primary + Additional classes)
export function formatSenaraiKelasRPH(rph: RPHData): string {
  const extra = rph.info.kelasTambahan || [];
  if (extra.length === 0) {
    return `${rph.info.tingkatan} - ${rph.info.kelas}`;
  }
  const all = [
    `${rph.info.kelas} (${rph.info.masaMula}-${rph.info.masaTamat})`,
    ...extra.map((k) => `${k.kelas} (${k.masaMula}-${k.masaTamat}, ${k.hari})`),
  ];
  return all.join(' & ');
}

// Helper to remove any duplicate leading bullet or numbering for clean nested lists
export function bersihkanTeksSenarai(text: string): string {
  if (!text) return '';
  return text.trim().replace(/^(\d+[\.\)]\s*|[-*•]\s*)/, '');
}

// Convert RPH to clean formatted text for e-RPH / Google Classroom copy/paste
export function janaTeksFormatERph(rph: RPHData): string {
  const is5E = rph.modelPdpc === '5E Pedagogi HIKMAH (MRSM)';
  const isDlp = rph.bahasa === 'DLP';
  const extraClasses = rph.info.kelasTambahan || [];

  let aktivitiText = '';
  if (is5E) {
    aktivitiText = isDlp
      ? `TEACHING & LEARNING ACTIVITIES (5E HIKMAH PEDAGOGY):
1. ENGAGE:
${rph.aktiviti5E.engage}

2. EXPLORE:
${rph.aktiviti5E.explore}

3. EXPLAIN:
${rph.aktiviti5E.explain}

4. ELABORATE:
${rph.aktiviti5E.elaborate}

5. EVALUATE:
${rph.aktiviti5E.evaluate}

HIKMAH ATTRIBUTES:
${rph.atributHikmah.join('\n')}

MRSM SIKAP CORE VALUES:
${rph.nilaiSikapMrsm.join(', ')}`
      : `KERANGKA AKTIVITI (KONSEP 5E PEDAGOGI HIKMAH MRSM):
1. ENGAGE (Penglibatan / Cungkil Idea):
${rph.aktiviti5E.engage}

2. EXPLORE (Penerokaan / Inkuiri):
${rph.aktiviti5E.explore}

3. EXPLAIN (Penerangan / Konseptualisasi):
${rph.aktiviti5E.explain}

4. ELABORATE (Pengembangan / Pengaplikasian KBAT):
${rph.aktiviti5E.elaborate}

5. EVALUATE (Penilaian / Pentaksiran):
${rph.aktiviti5E.evaluate}

ATRIBUT PEDAGOGI HIKMAH DITERAPKAN:
${rph.atributHikmah.join('\n')}

NILAI TERAS SIKAP MRSM:
${rph.nilaiSikapMrsm.join(', ')}`;
  } else {
    aktivitiText = isDlp
      ? `TEACHING & LEARNING ACTIVITIES (STANDARD KPM):
1. SET INDUCTION (${rph.info.tempohMinit >= 60 ? '10 mins' : '5 mins'}):
${rph.setInduksi}

2. MAIN ACTIVITIES (21st CENTURY LEARNING):
${rph.aktivitiUtama.join('\n')}

3. CLOSURE (${rph.info.tempohMinit >= 60 ? '10 mins' : '5 mins'}):
${rph.penutup}`
      : `RINGKASAN AKTIVITI PDPC (MODEL STANDARD KPM):
1. SET INDUKSI (${rph.info.tempohMinit >= 60 ? '10 minit' : '5 minit'}):
${rph.setInduksi}

2. AKTIVITI UTAMA:
${rph.aktivitiUtama.join('\n')}

3. PENUTUP (${rph.info.tempohMinit >= 60 ? '10 minit' : '5 minit'}):
${rph.penutup}`;
  }

  const extraKelasBlock =
    extraClasses.length > 0
      ? `\n${isDlp ? 'ADDITIONAL CLASSES (SAME LESSON)' : 'KELAS TAMBAHAN (SESI SAMA)'}:\n` +
        extraClasses
          .map(
            (c, i) =>
              `  ${i + 2}. ${c.tingkatan} - ${c.kelas} | ${c.tarikh} (${c.hari}) | ${c.masaMula} - ${c.masaTamat} | Kehadiran: ${c.kehadiranMurid}`
          )
          .join('\n')
      : '';

  const ea = rph.elemenAktif || {};
  const showPak21 = ea.pak21 !== false && rph.pak21Kaedah.length > 0;
  const showKbat = ea.kbat !== false && rph.kbatAras.length > 0;
  const showKps =
    ea.kps !== false &&
    (rph.kemahiranSaintifik.length > 0 || rph.kemahiranManipulatif.length > 0);
  const showBbm = ea.bbm !== false && rph.bbm.length > 0;
  const showEmk = ea.emk !== false && rph.emk.length > 0;
  const showNilai = ea.nilaiMurni !== false && rph.nilaiMurni.length > 0;
  const showPentaksiran =
    ea.pentaksiran !== false &&
    (rph.pentaksiranPbd.length > 0 || rph.tahapPenguasaan.length > 0);
  const showRefleksi = ea.refleksi !== false;

  if (isDlp) {
    const elemenLines = [
      showPak21
        ? `- 21st Century Learning (PAK-21): ${rph.pak21Kaedah.join(', ')}`
        : '',
      showKbat ? `- HOTS Level: ${rph.kbatAras.join(', ')}` : '',
      showKps
        ? `- Scientific Skills (SPS/MS): ${[...rph.kemahiranSaintifik, ...rph.kemahiranManipulatif].join(', ')}`
        : '',
      showEmk
        ? `- Elements Across Curriculum (EMK): ${rph.emk.join(', ')}`
        : '',
      showNilai ? `- Noble Values: ${rph.nilaiMurni.join(', ')}` : '',
      showBbm ? `- Teaching Aids (BBM): ${rph.bbm.join(', ')}` : '',
      showPentaksiran
        ? `- Classroom Assessment (PBD): ${rph.pentaksiranPbd.join(', ')}`
        : '',
      showPentaksiran && rph.tahapPenguasaan.length > 0
        ? `- Performance Level: ${rph.tahapPenguasaan.join('; ')}`
        : '',
    ].filter(Boolean);

    const isSains =
      rph.subjek === 'Sains' ||
      rph.info?.subjek === 'Sains' ||
      rph.babId?.startsWith('S_');
    return `=== DAILY LESSON PLAN (RPH) KSSM ${isSains ? 'SCIENCE' : 'CHEMISTRY'} (DLP) ===
PDPC MODEL: ${rph.modelPdpc}${rph.isCompact ? ' [COMPACT 1-PAGE]' : ''}
SUBJECT: ${isSains ? 'SCIENCE KSSM (DLP)' : 'CHEMISTRY KSSM (DLP)'}
FORM & CLASS: ${rph.info.tingkatan} - ${rph.info.kelas}
DATE / DAY: ${rph.info.tarikh} (${rph.info.hari})
TIME: ${rph.info.masaMula} - ${rph.info.masaTamat} (${rph.info.tempohMinit} Mins)
WEEK: Academic Week ${rph.info.mingguAkademik}
ATTENDANCE: ${rph.info.kehadiranMurid}${extraKelasBlock}

THEME: ${rph.tema}
LEARNING AREA / CHAPTER: ${rph.babTajuk}
CONTENT STANDARD (CS): ${rph.skKod} ${rph.skTajuk}
LEARNING STANDARD (LS):
${rph.spKod.map((k, i) => `${k} ${rph.spTajuk[i] || ''}`).join('\n')}
${rph.isEksperimen ? `COMPULSORY EXPERIMENT: ${rph.namaEksperimen || 'DSKP Experiment'}` : ''}

LEARNING OBJECTIVES:
By the end of the lesson, pupils are able to:
${rph.objektif.map((o, i) => `${i + 1}. ${o}`).join('\n')}

SUCCESS CRITERIA:
Pupils succeed if they are able to:
${rph.kriteriaKejayaan.map((k, i) => `${i + 1}. ${k}`).join('\n')}

${aktivitiText}

4. DIFFERENTIATION STRATEGY:
${rph.diferensiasi}
${rph.soalanKbatContoh ? `\n5. HOTS / KBAT QUESTION:\n${rph.soalanKbatContoh}\n` : ''}${
      elemenLines.length > 0
        ? `\nELEMENTS ACROSS CURRICULUM & PEDAGOGY:\n${elemenLines.join('\n')}\n`
        : ''
    }${
      showRefleksi
        ? `\nREFLECTION & FOLLOW-UP:
- Achievement: ${rph.refleksi.bilCapai}/${rph.info.bilanganMurid} pupils achieved the learning objectives (${rph.refleksi.bilTidakCapai || 0} require guidance).
- Follow-up Action: ${rph.refleksi.tindakanSusulan}
- Lesson Status: ${rph.refleksi.statusPdpc}
- Teacher's Note: ${rph.refleksi.catatanTambahan}\n`
        : ''
    }`;
  }

  const elemenLinesBm = [
    showPak21 ? `- Kaedah PAK-21: ${rph.pak21Kaedah.join(', ')}` : '',
    showKbat ? `- Aras KBAT: ${rph.kbatAras.join(', ')}` : '',
    showKps
      ? `- Kemahiran Saintifik (KPS/KMS): ${[...rph.kemahiranSaintifik, ...rph.kemahiranManipulatif].join(', ')}`
      : '',
    showEmk ? `- EMK: ${rph.emk.join(', ')}` : '',
    showNilai ? `- Nilai Murni: ${rph.nilaiMurni.join(', ')}` : '',
    showBbm ? `- Bahan Bantu Mengajar (BBM): ${rph.bbm.join(', ')}` : '',
    showPentaksiran
      ? `- Pentaksiran PBD: ${rph.pentaksiranPbd.join(', ')}`
      : '',
    showPentaksiran && rph.tahapPenguasaan.length > 0
      ? `- Tahap Penguasaan: ${rph.tahapPenguasaan.join('; ')}`
      : '',
  ].filter(Boolean);

  const subjInfo = dapatkanTajukSubjek(rph.subjek || rph.info?.subjek, false, false);
  return `=== RANCANGAN PENGAJARAN HARIAN (RPH) ${subjInfo.tajukPenuh} ===
MODEL PDPC: ${rph.modelPdpc}${rph.isCompact ? ' [COMPACT 1 MUKA SURAT]' : ''}
MATA PELAJARAN: ${subjInfo.tajukPenuh}
TINGKATAN: ${rph.info.tingkatan}
KELAS: ${rph.info.kelas}
TARIKH / HARI: ${rph.info.tarikh} (${rph.info.hari})
MASA: ${rph.info.masaMula} - ${rph.info.masaTamat} (${rph.info.tempohMinit} Minit)
MINGGU: Minggu ${rph.info.mingguAkademik}
KEHADIRAN: ${rph.info.kehadiranMurid}${extraKelasBlock}

TEMA: ${rph.tema}
BIDANG / BAB: ${rph.babTajuk}
STANDARD KANDUNGAN (SK): ${rph.skKod} ${rph.skTajuk}
STANDARD PEMBELAJARAN (SP):
${rph.spKod.map((k, i) => `${k} ${rph.spTajuk[i] || ''}`).join('\n')}
${rph.isEksperimen ? `AMALI / EKSPERIMEN WAJIB: ${rph.namaEksperimen || 'Eksperimen DSKP'}` : ''}

OBJEKTIF PEMBELAJARAN:
Pada akhir sesi PdPc, murid dapat:
${rph.objektif.map((o, i) => `${i + 1}. ${o}`).join('\n')}

KRITERIA KEJAYAAN:
Murid berjaya jika dapat:
${rph.kriteriaKejayaan.map((k, i) => `${i + 1}. ${k}`).join('\n')}

${aktivitiText}

4. STRATEGI PEMBEZAAN (DIFERENSIASI):
${rph.diferensiasi}
${rph.soalanKbatContoh ? `\n5. CONTOH SOALAN KBAT:\n${rph.soalanKbatContoh}\n` : ''}${
    elemenLinesBm.length > 0
      ? `\nELEMEN MERENTAS KURIKULUM & PEDAGOGI:\n${elemenLinesBm.join('\n')}\n`
      : ''
  }${
    showRefleksi
      ? `\nREFLEKSI & CATATAN GURU:
- Pencapaian Murid: ${rph.refleksi.bilCapai}/${rph.info.bilanganMurid} murid telah mencapai objektif pembelajaran.
- Murid yang memerlukan bimbingan: ${rph.refleksi.bilTidakCapai || 0} orang.
- Tindakan Susulan: ${rph.refleksi.tindakanSusulan}
- Status PdPc: ${rph.refleksi.statusPdpc}
- Catatan: ${rph.refleksi.catatanTambahan}\n`
      : ''
  }`;
}

// Build single RPH HTML table body (used for Word .doc, OneNote export, and Weekly batch .doc)
export function binaHtmlSatuRPH(rph: RPHData): string {
  const is5E = rph.modelPdpc === '5E Pedagogi HIKMAH (MRSM)';
  const isDlp = rph.bahasa === 'DLP';
  const isCompact = !!rph.isCompact;
  const isSains =
    rph.subjek === 'Sains' ||
    rph.info?.subjek === 'Sains' ||
    rph.babId?.startsWith('S_');
  const extraClasses = rph.info.kelasTambahan || [];

  const ea = rph.elemenAktif || {};
  const showPak21 = ea.pak21 !== false && rph.pak21Kaedah.length > 0;
  const showKbat = ea.kbat !== false && rph.kbatAras.length > 0;
  const showKps =
    ea.kps !== false &&
    (rph.kemahiranSaintifik.length > 0 || rph.kemahiranManipulatif.length > 0);
  const showBbm = ea.bbm !== false && rph.bbm.length > 0;
  const showEmk = ea.emk !== false && rph.emk.length > 0;
  const showNilai = ea.nilaiMurni !== false && rph.nilaiMurni.length > 0;
  const showPentaksiran =
    ea.pentaksiran !== false &&
    (rph.pentaksiranPbd.length > 0 || rph.tahapPenguasaan.length > 0);
  const showAnyElemenTable =
    showPak21 ||
    showKbat ||
    showKps ||
    showBbm ||
    showEmk ||
    showNilai ||
    showPentaksiran;
  const showRefleksi = ea.refleksi !== false;

  // =========================================================================
  // 1. COMPACT 1-PAGE RPH TABLE LAYOUT (Matches Compact PDF Preview 100%)
  // =========================================================================
  if (isCompact) {
    const kelasListHtml = [
      `<div>1. <strong>${rph.info.tingkatan} - ${rph.info.kelas}</strong> (${rph.info.masaMula} - ${rph.info.masaTamat}) &bull; ${isDlp ? 'Attendance' : 'Kehadiran'}: ${rph.info.kehadiranMurid}</div>`,
      ...extraClasses.map(
        (k, idx) =>
          `<div>${idx + 2}. <strong>${k.tingkatan || rph.info.tingkatan} - ${k.kelas}</strong> (${k.masaMula} - ${k.masaTamat}) &bull; ${isDlp ? 'Attendance' : 'Kehadiran'}: ${k.kehadiranMurid}</div>`
      ),
    ].join('');

    const compactAktivitiHtml = is5E
      ? `
        <div><strong>1. Engage:</strong> ${rph.aktiviti5E.engage}</div>
        <div><strong>2. Explore:</strong> ${rph.aktiviti5E.explore}</div>
        <div><strong>3. Explain:</strong> ${rph.aktiviti5E.explain}</div>
        <div><strong>4. Elaborate:</strong> ${rph.aktiviti5E.elaborate}</div>
        <div><strong>5. Evaluate:</strong> ${rph.aktiviti5E.evaluate}</div>
      `
      : `
        <div><strong>${isDlp ? 'Starter:' : 'Set Induksi:'}</strong> ${rph.setInduksi}</div>
        <div style="margin-top:2px;">
          <strong>${isDlp ? 'Main Activities:' : 'Aktiviti Utama:'}</strong>
          <ol style="margin:1px 0 1px 16px;padding:0;">
            ${rph.aktivitiUtama.map((act) => `<li style="margin:0;">${act.replace(/^\d+\.\s*/, '')}</li>`).join('')}
          </ol>
        </div>
        <div style="margin-top:2px;"><strong>${isDlp ? 'Closure:' : 'Penutup:'}</strong> ${rph.penutup}</div>
      `;

    const kbatHtml = rph.soalanKbatContoh
      ? `<div style="margin-top:3px;color:#1e1b4b;"><strong>KBAT / HOTS:</strong> ${rph.soalanKbatContoh}</div>`
      : '';

    const leftElemenHtml = [
      showPak21
        ? `<div><strong>PAK-21:</strong> ${rph.pak21Kaedah.join(', ')}</div>`
        : '',
      showKps
        ? `<div><strong>${isDlp ? 'SPS:' : 'KPS:'}</strong> ${rph.kemahiranSaintifik.join(', ')}</div>`
        : '',
      showBbm ? `<div><strong>BBM:</strong> ${rph.bbm.join(', ')}</div>` : '',
    ]
      .filter(Boolean)
      .join('');

    const rightElemenHtml = [
      showKbat
        ? `<div><strong>KBAT:</strong> ${rph.kbatAras.join(', ')}</div>`
        : '',
      showEmk ? `<div><strong>EMK:</strong> ${rph.emk.join(', ')}</div>` : '',
      showNilai
        ? `<div><strong>${isDlp ? 'Values:' : 'Nilai:'}</strong> ${rph.nilaiMurni.join(', ')}</div>`
        : '',
      showPentaksiran
        ? `<div><strong>PBD:</strong> ${rph.pentaksiranPbd.join(', ')}</div>`
        : '',
    ]
      .filter(Boolean)
      .join('');

    return `
      <div class="rph-sheet compact-sheet">
        <div style="text-align:center;border-bottom:2px solid #0f172a;padding-bottom:4px;margin-bottom:6px;">
          <h1 style="font-size:11.5pt;font-weight:bold;text-transform:uppercase;margin:0;color:#0f172a;">
            ${rph.info.namaSekolah || 'SEKOLAH MENENGAH KEBANGSAAN'}
          </h1>
          <h2 style="font-size:8.5pt;font-weight:bold;text-transform:uppercase;margin:2px 0 0 0;color:#334155;">
            ${
              isDlp
                ? `DAILY LESSON PLAN (RPH) - KSSM ${dapatkanTajukSubjek(rph.subjek || rph.info?.subjek, true, true).tajukPendek} (1-PAGE COMPACT)`
                : `RANCANGAN PENGAJARAN HARIAN (RPH) ${dapatkanTajukSubjek(rph.subjek || rph.info?.subjek, false, true).tajukPendek} KSSM (PADAT 1 MUKA SURAT)`
            }
          </h2>
        </div>

        <table class="rph-table" style="width:100%;table-layout:fixed;border-collapse:collapse;">
          <colgroup>
            <col style="width:18%;" />
            <col style="width:32%;" />
            <col style="width:18%;" />
            <col style="width:32%;" />
          </colgroup>
          <tbody>
            <tr>
              <th width="18%">${isDlp ? 'Subject' : 'Mata Pelajaran'}</th>
              <td width="32%"><strong style="color:#064e3b;">${dapatkanTajukSubjek(rph.subjek || rph.info?.subjek, isDlp, false).tajukJadual}</strong></td>
              <th width="18%">${isDlp ? 'Week / Date' : 'Minggu / Tarikh'}</th>
              <td width="32%">${isDlp ? 'Week' : 'Minggu'} ${rph.info.mingguAkademik} &bull; ${rph.info.tarikh} (${rph.info.hari})</td>
            </tr>
            <tr>
              <th width="18%">${isDlp ? 'Class & Time' : 'Kelas & Masa'}</th>
              <td colspan="3" width="82%">${kelasListHtml}</td>
            </tr>
            <tr>
              <th width="18%">${isDlp ? 'Topic & Theme' : 'Tajuk & Tema'}</th>
              <td width="32%"><strong style="color:#064e3b;">${rph.babTajuk}</strong> <span style="color:#64748b;">(${rph.tema})</span></td>
              <th width="18%">${isDlp ? 'Content Std (SK)' : 'Standard Kandungan'}</th>
              <td width="32%"><strong>${rph.skKod}</strong> ${rph.skTajuk}</td>
            </tr>
            <tr>
              <th width="18%">${isDlp ? 'Learning Std (SP)' : 'Standard Pembelajaran'}</th>
              <td colspan="3" width="82%">
                ${rph.spKod.map((kod, i) => `<div><strong>${kod}</strong>: ${rph.spTajuk[i] || ''}</div>`).join('')}
              </td>
            </tr>
            <tr>
              <th width="18%">${isDlp ? 'Objectives (SMART)' : 'Objektif (SMART)'}</th>
              <td width="32%">
                <ol style="margin:1px 0 1px 18px;padding:0;">
                  ${rph.objektif.map((o) => `<li style="margin:0 0 1px 0;line-height:1.35;">${bersihkanTeksSenarai(o)}</li>`).join('')}
                </ol>
              </td>
              <th width="18%">${isDlp ? 'Success Criteria' : 'Kriteria Kejayaan'}</th>
              <td width="32%">
                <ul style="margin:1px 0 1px 18px;padding:0;">
                  ${rph.kriteriaKejayaan.map((k) => `<li style="margin:0 0 1px 0;line-height:1.35;">${bersihkanTeksSenarai(k)}</li>`).join('')}
                </ul>
              </td>
            </tr>
            <tr>
              <th width="18%">${isDlp ? 'Activities (PdPC)' : 'Aktiviti PdPC'}</th>
              <td colspan="3" width="82%">
                ${compactAktivitiHtml}
                ${kbatHtml}
              </td>
            </tr>
            ${
              showAnyElemenTable
                ? `<tr>
                    <th width="18%">PAK-21, KPS &amp; BBM</th>
                    <td width="32%">${leftElemenHtml || '-'}</td>
                    <th width="18%">KBAT, EMK &amp; PBD</th>
                    <td width="32%">${rightElemenHtml || '-'}</td>
                  </tr>`
                : ''
            }
            ${
              showRefleksi
                ? `<tr>
                    <th width="18%">${isDlp ? 'Reflection' : 'Refleksi & Impak'}</th>
                    <td colspan="3" width="82%">
                      <strong>[${rph.refleksi.statusPdpc}] ${rph.refleksi.bilCapai} / ${rph.info.bilanganMurid}</strong> ${
                    isDlp
                      ? `pupils achieved the learning objectives (${rph.refleksi.bilTidakCapai || 0} require guidance).`
                      : `murid mencapai objektif (${rph.refleksi.bilTidakCapai || 0} orang memerlukan bimbingan).`
                  } ${rph.refleksi.tindakanSusulan}
                    </td>
                  </tr>`
                : ''
            }
          </tbody>
        </table>

        <table class="signature-table" style="width:100%;border-collapse:collapse;border:none;margin-top:14px;">
          <tr>
            <td width="48%" style="border:none;padding:12px 12px 0 0;vertical-align:bottom;">
              <div style="border-bottom:1px solid #64748b;height:18px;margin-bottom:3px;"></div>
              <div style="font-size:8pt;font-weight:bold;color:#334155;">
                ${isDlp ? 'Subject Teacher' : 'Tandatangan Guru'}: ${rph.info.namaGuru}
              </div>
            </td>
            <td width="4%" style="border:none;"></td>
            <td width="48%" style="border:none;padding:12px 0 0 12px;vertical-align:bottom;">
              <div style="border-bottom:1px solid #64748b;height:18px;margin-bottom:3px;"></div>
              <div style="font-size:8pt;font-weight:bold;color:#334155;">
                ${isDlp ? 'Verified By' : 'Disemak Oleh (Pengetua / GPK / GKMP)'}
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;
  }

  // =========================================================================
  // 2. STANDARD FULL KPM / 5E RPH TABLE LAYOUT
  // =========================================================================
  const extraClassesRows = extraClasses
    .map(
      (c, idx) => `
      <tr>
        <th width="18%">${isDlp ? `Class ${idx + 2}` : `Kelas Ke-${idx + 2}`}</th>
        <td width="32%"><strong>${c.tingkatan} - ${c.kelas}</strong> (${c.kehadiranMurid})</td>
        <th width="18%">${isDlp ? 'Date & Time' : 'Tarikh & Masa'}</th>
        <td width="32%">${c.tarikh} (${c.hari}) | ${c.masaMula} - ${c.masaTamat} (${c.tempohMinit}m)</td>
      </tr>`
    )
    .join('');

  const aktivitiRows = is5E
    ? `
      <tr>
        <th width="18%">1. Engage (${isDlp ? 'Engagement' : 'Penglibatan'})<br/><span style="font-weight:normal;font-size:8pt;color:#64748b;">5–10 min</span></th>
        <td colspan="3" width="82%">${rph.aktiviti5E.engage}</td>
      </tr>
      <tr>
        <th width="18%">2. Explore (${isDlp ? 'Exploration' : 'Penerokaan'})<br/><span style="font-weight:normal;font-size:8pt;color:#64748b;">20–30 min</span></th>
        <td colspan="3" width="82%">${rph.aktiviti5E.explore}</td>
      </tr>
      <tr>
        <th width="18%">3. Explain (${isDlp ? 'Explanation' : 'Penerangan'})<br/><span style="font-weight:normal;font-size:8pt;color:#64748b;">15–20 min</span></th>
        <td colspan="3" width="82%">${rph.aktiviti5E.explain}</td>
      </tr>
      <tr>
        <th width="18%">4. Elaborate (${isDlp ? 'Elaboration' : 'Pengembangan'})<br/><span style="font-weight:normal;font-size:8pt;color:#64748b;">10–15 min</span></th>
        <td colspan="3" width="82%">${rph.aktiviti5E.elaborate}</td>
      </tr>
      <tr>
        <th width="18%">5. Evaluate (${isDlp ? 'Evaluation' : 'Penilaian'})<br/><span style="font-weight:normal;font-size:8pt;color:#64748b;">5–10 min</span></th>
        <td colspan="3" width="82%">${rph.aktiviti5E.evaluate}</td>
      </tr>
      <tr>
        <th width="18%">Atribut HIKMAH &amp; SIKAP (MRSM)</th>
        <td colspan="3" width="82%"><strong>Atribut HIKMAH:</strong> ${rph.atributHikmah.map((a) => a.split(' (')[0]).join(' &bull; ')}<br/><strong>Nilai Teras SIKAP:</strong> ${rph.nilaiSikapMrsm.map((s) => s.split(' (')[0]).join(' &bull; ')}</td>
      </tr>`
    : `
      <tr>
        <th width="18%">${isDlp ? 'Set Induction (5–10 min)' : 'Set Induksi (5–10 min)'}</th>
        <td colspan="3" width="82%">${rph.setInduksi}</td>
      </tr>
      <tr>
        <th width="18%">${isDlp ? 'Main Activities (PAK-21)' : 'Aktiviti Utama (PAK-21)'}</th>
        <td colspan="3" width="82%">
          <ol style="margin:2px 0;padding-left:18px;">
            ${rph.aktivitiUtama.map((a) => `<li>${a.replace(/^\d+\.\s*/, '')}</li>`).join('')}
          </ol>
        </td>
      </tr>
      <tr>
        <th width="18%">${isDlp ? 'Closure (5–10 min)' : 'Penutup (5–10 min)'}</th>
        <td colspan="3" width="82%">${rph.penutup}</td>
      </tr>`;

  const row1Left = [
    showPak21 ? `<strong>PAK-21:</strong> ${rph.pak21Kaedah.join(', ')}` : '',
    showKbat ? `<strong>KBAT:</strong> ${rph.kbatAras.join(', ')}` : '',
  ]
    .filter(Boolean)
    .join('<br/>');

  const row1Right = [
    showKps
      ? `<strong>KPS:</strong> ${rph.kemahiranSaintifik.join(', ')}`
      : '',
    showBbm ? `<strong>BBM:</strong> ${rph.bbm.join(', ')}` : '',
  ]
    .filter(Boolean)
    .join('<br/>');

  const row2Left = [
    showEmk ? `<strong>EMK:</strong> ${rph.emk.join(', ')}` : '',
    showNilai
      ? `<strong>${isDlp ? 'Values' : 'Nilai'}:</strong> ${rph.nilaiMurni.join(', ')}`
      : '',
  ]
    .filter(Boolean)
    .join('<br/>');

  const row2Right = showPentaksiran
    ? `${rph.pentaksiranPbd.join(', ')}${
        rph.tahapPenguasaan.length > 0
          ? ` (${rph.tahapPenguasaan.map((t) => t.split(' - ')[0]).join(', ')})`
          : ''
      }`
    : '';

  return `
    <div class="rph-sheet">
      <h1>${rph.info.namaSekolah || 'SEKOLAH MENENGAH KEBANGSAAN'}</h1>
      <h2>${
        isDlp
          ? `DAILY LESSON PLAN (RPH) KSSM - ${dapatkanTajukSubjek(rph.subjek || rph.info?.subjek, true, true).tajukPenuh} (${rph.modelPdpc})`
          : `RANCANGAN PENGAJARAN HARIAN (RPH) KSSM - ${dapatkanTajukSubjek(rph.subjek || rph.info?.subjek, false, true).tajukPenuh} (${rph.modelPdpc})`
      }</h2>
      <table class="rph-table" style="width:100%;table-layout:fixed;border-collapse:collapse;">
        <colgroup>
          <col style="width:18%;" />
          <col style="width:32%;" />
          <col style="width:18%;" />
          <col style="width:32%;" />
        </colgroup>
        <tr>
          <th width="18%">${isDlp ? 'Subject' : 'Mata Pelajaran'}</th>
          <td width="32%"><strong>${dapatkanTajukSubjek(rph.subjek || rph.info?.subjek, isDlp, false).tajukJadual}</strong></td>
          <th width="18%">${isDlp ? 'Week / Day' : 'Minggu / Hari'}</th>
          <td width="32%">${isDlp ? 'Week' : 'Minggu'} ${rph.info.mingguAkademik} (${rph.info.hari})</td>
        </tr>
        <tr>
          <th width="18%">${isDlp ? 'Form / Class' : 'Tingkatan / Kelas'}</th>
          <td width="32%"><strong>${rph.info.tingkatan} - ${rph.info.kelas}</strong> (${rph.info.kehadiranMurid})</td>
          <th width="18%">${isDlp ? 'Date / Time' : 'Tarikh / Masa'}</th>
          <td width="32%">${rph.info.tarikh} | ${rph.info.masaMula} - ${rph.info.masaTamat} (${rph.info.tempohMinit} min)</td>
        </tr>
        ${extraClassesRows}
        <tr>
          <th width="18%">${isDlp ? 'Teacher' : 'Guru Pengajar'}</th>
          <td width="32%">${rph.info.namaGuru}</td>
          <th width="18%">${isDlp ? 'Theme & Chapter' : 'Tema & Bab'}</th>
          <td width="32%"><strong>${rph.babTajuk}</strong> (${rph.tema})</td>
        </tr>
        <tr>
          <th width="18%">${isDlp ? 'Content Standard (CS)' : 'Standard Kandungan (SK)'}</th>
          <td width="32%"><strong>${rph.skKod}</strong>: ${rph.skTajuk}</td>
          <th width="18%">${isDlp ? 'Learning Standard (LS)' : 'Standard Pembelajaran (SP)'}</th>
          <td width="32%">
            ${rph.spKod.map((k, i) => `<div><strong>${k}</strong>: ${rph.spTajuk[i] || ''}</div>`).join('')}
            ${rph.isEksperimen ? `<div style="color:#b91c1c;font-weight:bold;margin-top:2px;">* ${rph.namaEksperimen || ''}</div>` : ''}
          </td>
        </tr>
        <tr>
          <th width="18%">${isDlp ? 'Learning Objectives' : 'Objektif Pembelajaran'}</th>
          <td width="32%">
            <ol style="margin:2px 0;padding-left:18px;">
              ${rph.objektif.map((o) => `<li style="margin:0 0 2px 0;line-height:1.4;">${bersihkanTeksSenarai(o)}</li>`).join('')}
            </ol>
          </td>
          <th width="18%">${isDlp ? 'Success Criteria' : 'Kriteria Kejayaan'}</th>
          <td width="32%">
            <ul style="margin:2px 0;padding-left:18px;">
              ${rph.kriteriaKejayaan.map((k) => `<li style="margin:0 0 2px 0;line-height:1.4;">${bersihkanTeksSenarai(k)}</li>`).join('')}
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="4" width="100%" class="section-header">${
            is5E
              ? isDlp
                ? '5E HIKMAH PEDAGOGY ACTIVITY FRAMEWORK (MRSM)'
                : 'KERANGKA AKTIVITI 5E PEDAGOGI HIKMAH (MRSM)'
              : isDlp
              ? 'TEACHING & LEARNING ACTIVITIES (PdPC)'
              : 'KERANGKA AKTIVITI PENGAJARAN & PEMBELAJARAN (PdPC)'
          }</th>
        </tr>
        ${aktivitiRows}
        <tr>
          <th width="18%">${isDlp ? 'Differentiation' : 'Strategi Pembezaan'}</th>
          <td colspan="3" width="82%">${rph.diferensiasi}</td>
        </tr>
        ${
          rph.soalanKbatContoh
            ? `<tr>
                <th width="18%">${isDlp ? 'HOTS / KBAT Question' : 'Soalan KBAT'}</th>
                <td colspan="3" width="82%">${rph.soalanKbatContoh}</td>
              </tr>`
            : ''
        }
        ${
          row1Left || row1Right
            ? `<tr>
                <th width="18%">${isDlp ? 'PAK-21 & HOTS' : 'PAK-21 & KBAT'}</th>
                <td width="32%">${row1Left || '-'}</td>
                <th width="18%">${isDlp ? 'SPS & Teaching Aids' : 'KPS & BBM'}</th>
                <td width="32%">${row1Right || '-'}</td>
              </tr>`
            : ''
        }
        ${
          row2Left || row2Right
            ? `<tr>
                <th width="18%">${isDlp ? 'EMK & Noble Values' : 'EMK & Nilai Murni'}</th>
                <td width="32%">${row2Left || '-'}</td>
                <th width="18%">${isDlp ? 'Classroom Assessment (PBD)' : 'Pentaksiran PBD'}</th>
                <td width="32%">${row2Right || '-'}</td>
              </tr>`
            : ''
        }
        ${
          showRefleksi
            ? `<tr>
                <th width="18%">${isDlp ? 'Reflection & Impact' : 'Refleksi & Impak PdPC'}</th>
                <td colspan="3" width="82%">
                  <strong>[${rph.refleksi.statusPdpc}]</strong> ${rph.refleksi.bilCapai}/${rph.info.bilanganMurid} ${
                isDlp
                  ? `pupils achieved the objectives (${rph.refleksi.bilTidakCapai || 0} require guidance).`
                  : `murid mencapai objektif (${rph.refleksi.bilTidakCapai || 0} orang memerlukan bimbingan).`
              } ${rph.refleksi.tindakanSusulan} ${rph.refleksi.catatanTambahan}
                </td>
              </tr>`
            : ''
        }
      </table>
    </div>
  `;
}

// =============================================================================
// UNIVERSAL FILE DOWNLOAD & EXPORT (OPTIMIZED FOR iOS, iPadOS, ANDROID & PC)
// =============================================================================

// Dynamic loader for PDF generation engine (bundled jspdf & html2canvas-pro with OKLCH support)
export async function loadPdfEngine(): Promise<{ html2canvas: any; jsPDF: any }> {
  try {
    const [h2cModule, jsPdfModule] = await Promise.all([
      import('html2canvas-pro'),
      import('jspdf'),
    ]);
    const html2canvas = h2cModule.default || h2cModule;
    const jsPDF = jsPdfModule.jsPDF || jsPdfModule.default || jsPdfModule;
    if (html2canvas && jsPDF) {
      return { html2canvas, jsPDF };
    }
  } catch (importErr) {
    console.warn('Bundled PDF engine import error, checking window globals:', importErr);
  }

  // Fallback to window globals if already available
  const getH2C = () => (window as any).html2canvas;
  const getJsPdf = () => (window as any).jspdf?.jsPDF || (window as any).jsPDF;

  if (getH2C() && getJsPdf()) {
    return { html2canvas: getH2C(), jsPDF: getJsPdf() };
  }

  throw new Error('Modul penjanaan PDF tidak dapat dimulakan');
}

/**
 * Universal file downloader that works seamlessly on iOS (iPhone & iPad),
 * Android, and Desktop browsers.
 * - On Mobile: Uses Web Share API if supported so teachers can select "Save to Files",
 *   AirDrop, WhatsApp, or open in native apps.
 * - Resilient Anchor Fallback: Strictly avoids `target="_blank"` on blob URLs because
 *   mobile WebKit (iOS Safari) and Chrome open an empty tab and fail the download.
 */
export async function muatTurunFail(
  blob: Blob,
  fileName: string,
  mimeType: string
): Promise<{ success: boolean; method: 'share' | 'download'; error?: string }> {
  try {
    const isMobile =
      typeof navigator !== 'undefined' &&
      (/iPad|iPhone|iPod|Android/i.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

    // 1. Try native Web Share API on Mobile devices if supported
    if (isMobile && typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        const file = new File([blob], fileName, { type: mimeType });
        if (typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: fileName,
            text: 'Dokumen e-RPH Pintar',
          });
          return { success: true, method: 'share' };
        }
      } catch (shareErr: any) {
        if (shareErr.name === 'AbortError') {
          // User intentionally closed the share sheet
          return { success: true, method: 'share' };
        }
        console.warn('Native share failed or gesture expired, falling back to direct download', shareErr);
      }
    }

    // 2. Standard Blob Anchor download (Direct download in same frame - no blank tab!)
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    // CRITICAL: DO NOT use link.target = '_blank' here; iOS Safari / Android will open a blank tab and fail
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    // Keep object URL alive for 60 seconds so Mobile Safari/Android finishes streaming
    setTimeout(() => {
      try {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        URL.revokeObjectURL(url);
      } catch {
        // ignore
      }
    }, 60000);

    return { success: true, method: 'download' };
  } catch (err: any) {
    console.error('muatTurunFail error:', err);
    return { success: false, method: 'download', error: err?.message || String(err) };
  }
}

/**
 * Generates and downloads a real PDF (.pdf) file from an HTML element
 * Fully optimized for iPad, iPhone, Android, and Desktop.
 * - Forces A4 desktop virtual dimensions so mobile narrow screens don't produce squashed text.
 * - Supports modern OKLCH & Tailwind CSS v4 color formats.
 */
export async function muatTurunDokumenPdf(
  element: HTMLElement,
  rph: RPHData,
  isCompact?: boolean
): Promise<{ success: boolean; method?: 'share' | 'download'; error?: string }> {
  try {
    const { html2canvas, jsPDF } = await loadPdfEngine();

    const compactMode = isCompact ?? !!rph.isCompact;
    const isSainsDoc =
      rph.subjek === 'Sains' ||
      rph.info?.subjek === 'Sains' ||
      rph.babId?.startsWith('S_');
    const fileName = `RPH_${isSainsDoc ? 'Sains' : 'Kimia'}_${compactMode ? 'Compact_' : ''}${rph.bahasa === 'DLP' ? 'DLP_' : ''}${rph.info.kelas.replace(/\s+/g, '')}_${rph.info.tarikh}.pdf`;

    // Render target element using html2canvas-pro (native OKLCH support + fixed A4 width)
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1024,
      onclone: (clonedDoc: Document) => {
        const sheet = clonedDoc.getElementById('rph-printable-sheet');
        if (sheet) {
          sheet.style.backgroundColor = '#ffffff';
          sheet.style.width = '794px';
          sheet.style.minWidth = '794px';
          sheet.style.maxWidth = '794px';
          sheet.style.boxSizing = 'border-box';
          sheet.style.margin = '0 auto';
        }
      },
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = compactMode ? 5 : 8;
    const printableWidth = pageWidth - margin * 2;
    const printableHeight = pageHeight - margin * 2;
    const imgHeight = (canvas.height * printableWidth) / canvas.width;

    if (imgHeight <= printableHeight + 4) {
      // Single A4 page (fits Compact mode)
      pdf.addImage(imgData, 'JPEG', margin, margin, printableWidth, imgHeight, undefined, 'FAST');
    } else {
      // Multi-page A4 document
      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'JPEG', margin, position, printableWidth, imgHeight, undefined, 'FAST');
      heightLeft -= printableHeight;

      while (heightLeft > 2) {
        position = heightLeft - imgHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, printableWidth, imgHeight, undefined, 'FAST');
        heightLeft -= printableHeight;
      }
    }

    const pdfBlob: Blob = pdf.output('blob');
    return await muatTurunFail(pdfBlob, fileName, 'application/pdf');
  } catch (err: any) {
    console.error('muatTurunDokumenPdf error:', err);
    return { success: false, error: err?.message || String(err) };
  }
}

// Generate Word document (.doc) download (supports Compact 1-page & Standard mode)
export async function muatTurunDokumenWord(rph: RPHData) {
  const isCompact = !!rph.isCompact;
  const htmlBody = binaHtmlSatuRPH(rph);

  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>RPH Kimia - ${rph.babTajuk}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: 21cm 29.7cm;
          margin: ${isCompact ? '0.9cm 1.0cm 0.9cm 1.0cm' : '1.5cm 1.5cm 1.5cm 1.5cm'};
          mso-page-orientation: portrait;
        }
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          font-size: ${isCompact ? '8.5pt' : '10pt'};
          line-height: ${isCompact ? '1.15' : '1.3'};
          color: #0f172a;
          margin: 0;
          padding: 0;
        }
        h1 {
          font-size: ${isCompact ? '11.5pt' : '13.5pt'};
          text-align: center;
          color: #0f172a;
          margin: 0 0 2px 0;
        }
        h2 {
          font-size: ${isCompact ? '8.5pt' : '10.5pt'};
          text-align: center;
          color: #334155;
          margin: 0 0 ${isCompact ? '5px' : '10px'} 0;
          font-weight: bold;
        }
        table.rph-table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          margin-bottom: ${isCompact ? '4px' : '8px'};
        }
        table.rph-table th,
        table.rph-table td {
          border: 1px solid #64748b;
          padding: ${isCompact ? '3.5px 6px' : '5.5px 8px'};
          font-size: ${isCompact ? '8.5pt' : '9.5pt'};
          vertical-align: top;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        table.rph-table th {
          background-color: #f1f5f9;
          font-weight: bold;
          text-align: left;
          color: #0f172a;
        }
        table.rph-table th.section-header {
          background-color: #0f766e;
          color: #ffffff;
          font-weight: bold;
          font-size: ${isCompact ? '8.5pt' : '9.5pt'};
          text-align: left;
        }
      </style>
    </head>
    <body>
      ${htmlBody}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], {
    type: 'application/msword',
  });
  const isSainsDoc =
    rph.subjek === 'Sains' ||
    rph.info?.subjek === 'Sains' ||
    rph.babId?.startsWith('S_');
  const fileName = `RPH_${isSainsDoc ? 'Sains' : 'Kimia'}_${isCompact ? 'Compact_' : ''}${rph.bahasa === 'DLP' ? 'DLP_' : ''}${rph.info.kelas.replace(/\s+/g, '')}_${rph.info.tarikh}.doc`;

  return await muatTurunFail(blob, fileName, 'application/msword');
}

// Download a combined Word (.doc) file for a Weekly RPH Batch or Multi-Class RPH Batch
export async function muatTurunRPHMingguanWord(rphList: RPHData[], labelMinggu = 'Mingguan') {
  if (rphList.length === 0) return;
  const isCompact = rphList[0]?.isCompact ?? true;

  const pagesHtml = rphList
    .map(
      (item, idx) =>
        `${binaHtmlSatuRPH(item)}${
          idx < rphList.length - 1
            ? '<br clear="all" style="page-break-before:always" />'
            : ''
        }`
    )
    .join('\n');

  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>RPH Kimia ${labelMinggu}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: 21cm 29.7cm;
          margin: ${isCompact ? '0.9cm 1.0cm 0.9cm 1.0cm' : '1.4cm 1.4cm 1.4cm 1.4cm'};
          mso-page-orientation: portrait;
        }
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          font-size: ${isCompact ? '8.5pt' : '9.5pt'};
          line-height: ${isCompact ? '1.15' : '1.28'};
          color: #0f172a;
          margin: 0;
          padding: 0;
        }
        h1 { font-size: 11.5pt; text-align: center; margin: 0 0 2px 0; }
        h2 { font-size: 8.5pt; text-align: center; color: #334155; margin: 0 0 5px 0; }
        table.rph-table { width: 100%; table-layout: fixed; border-collapse: collapse; margin-bottom: 5px; }
        table.rph-table th, table.rph-table td { border: 1px solid #64748b; padding: ${isCompact ? '3.5px 6px' : '5px 8px'}; font-size: ${isCompact ? '8.5pt' : '9.5pt'}; vertical-align: top; word-wrap: break-word; }
        table.rph-table th { background-color: #f1f5f9; font-weight: bold; text-align: left; }
        table.rph-table th.section-header { background-color: #0f766e; color: #ffffff; font-weight: bold; }
      </style>
    </head>
    <body>
      ${pagesHtml}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], {
    type: 'application/msword',
  });
  const isSainsBatch = rphList.some(
    (r) =>
      r.subjek === 'Sains' ||
      r.info?.subjek === 'Sains' ||
      r.babId?.startsWith('S_')
  );
  const fileName = `RPH_${isSainsBatch ? 'Sains' : 'Kimia'}_${labelMinggu.replace(/\s+/g, '_')}_Minggu_${rphList[0].info.mingguAkademik || '1'}.doc`;

  return await muatTurunFail(blob, fileName, 'application/msword');
}

// =============================================================================
// SPREADSHEET (EXCEL .XLS) BUILDER & EXPORT
// =============================================================================

export function binaHtmlSpreadsheetSatuRPH(rph: RPHData): string {
  const isDlp = rph.bahasa === 'DLP';
  const is5E = rph.modelPdpc === '5E Pedagogi HIKMAH (MRSM)';
  const isSains =
    rph.subjek === 'Sains' ||
    rph.info?.subjek === 'Sains' ||
    rph.babId?.startsWith('S_');

  const cleanList = (items: string[]) =>
    items
      .map((it, idx) => `${idx + 1}. ${bersihkanTeksSenarai(it)}`)
      .join('<br/>');

  return `
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:Calibri,Arial,sans-serif;font-size:10pt;margin-bottom:20px;">
      <!-- Title -->
      <tr style="background-color:#065f46;color:#ffffff;font-size:12pt;font-weight:bold;text-align:center;">
        <td colspan="4" style="padding:10px;">
          RANCANGAN PENGAJARAN HARIAN (e-RPH) ${dapatkanTajukSubjek(rph.subjek || rph.info?.subjek, false, false).tajukPendek} KSSM
        </td>
      </tr>
      <tr style="background-color:#047857;color:#ffffff;font-size:9.5pt;font-weight:bold;text-align:center;">
        <td colspan="4" style="padding:6px;">
          ${rph.info.namaSekolah || 'SEKOLAH MENENGAH'} • MINGGU AKADEMIK ${rph.info.mingguAkademik}
        </td>
      </tr>

      <!-- Section: Maklumat Asas -->
      <tr style="background-color:#10b981;color:#ffffff;font-weight:bold;">
        <td colspan="4">1. MAKLUMAT ASAS & JADUAL WAKTU</td>
      </tr>
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;width:20%;">Tarikh / Hari</td>
        <td style="width:30%;">${rph.info.tarikh} (${rph.info.hari})</td>
        <td style="font-weight:bold;background-color:#f8fafc;width:20%;">Masa & Tempoh</td>
        <td style="width:30%;">${rph.info.masaMula} - ${rph.info.masaTamat} (${rph.info.tempohMinit} minit)</td>
      </tr>
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;">Tingkatan & Kelas</td>
        <td><strong>${rph.info.tingkatan}</strong> - ${rph.info.kelas}</td>
        <td style="font-weight:bold;background-color:#f8fafc;">Kehadiran Murid</td>
        <td>${rph.info.kehadiranMurid || '-'}/${rph.info.bilanganMurid || '-'} orang</td>
      </tr>
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;">Guru Pengajar</td>
        <td>${rph.info.namaGuru}</td>
        <td style="font-weight:bold;background-color:#f8fafc;">Model Instruksional</td>
        <td>${rph.modelPdpc}</td>
      </tr>

      <!-- Section: Kurikulum DSKP -->
      <tr style="background-color:#10b981;color:#ffffff;font-weight:bold;">
        <td colspan="4">2. KURIKULUM & STANDARD PEMBELAJARAN (DSKP)</td>
      </tr>
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;">Tema & Bab</td>
        <td colspan="3"><strong>${rph.babTajuk}</strong> (${rph.tema})</td>
      </tr>
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;">Standard Kandungan (SK)</td>
        <td colspan="3"><strong>${rph.skKod}</strong>: ${rph.skTajuk}</td>
      </tr>
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;">Standard Pembelajaran (SP)</td>
        <td colspan="3">
          ${rph.spKod.map((k, i) => `<strong>${k}</strong>: ${rph.spTajuk[i] || ''}`).join('<br/>')}
          ${rph.isEksperimen ? `<br/><span style="color:#b91c1c;font-weight:bold;">* Eksperimen Wajib: ${rph.namaEksperimen || ''}</span>` : ''}
        </td>
      </tr>

      <!-- Section: Objektif & Kriteria -->
      <tr style="background-color:#10b981;color:#ffffff;font-weight:bold;">
        <td colspan="4">3. OBJEKTIF PEMBELAJARAN & KRITERIA KEJAYAAN</td>
      </tr>
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;">Objektif Pembelajaran</td>
        <td colspan="3">${cleanList(rph.objektif)}</td>
      </tr>
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;">Kriteria Kejayaan</td>
        <td colspan="3">${cleanList(rph.kriteriaKejayaan)}</td>
      </tr>

      <!-- Section: Aktiviti PdPc -->
      <tr style="background-color:#10b981;color:#ffffff;font-weight:bold;">
        <td colspan="4">4. KERANGKA AKTIVITI PENGAJARAN & PEMBELAJARAN (PdPC)</td>
      </tr>
      ${
        is5E
          ? `
            <tr><td style="font-weight:bold;background-color:#f8fafc;">1. Engage (Pelibatan)</td><td colspan="3">${rph.aktiviti5E?.engage || '-'}</td></tr>
            <tr><td style="font-weight:bold;background-color:#f8fafc;">2. Explore (Penerokaan)</td><td colspan="3">${rph.aktiviti5E?.explore || '-'}</td></tr>
            <tr><td style="font-weight:bold;background-color:#f8fafc;">3. Explain (Penerangan)</td><td colspan="3">${rph.aktiviti5E?.explain || '-'}</td></tr>
            <tr><td style="font-weight:bold;background-color:#f8fafc;">4. Elaborate (Pengembangan)</td><td colspan="3">${rph.aktiviti5E?.elaborate || '-'}</td></tr>
            <tr><td style="font-weight:bold;background-color:#f8fafc;">5. Evaluate (Penilaian)</td><td colspan="3">${rph.aktiviti5E?.evaluate || '-'}</td></tr>
          `
          : `
            <tr><td style="font-weight:bold;background-color:#f8fafc;">Set Induksi (5-10 minit)</td><td colspan="3">${rph.setInduksi}</td></tr>
            <tr><td style="font-weight:bold;background-color:#f8fafc;">Aktiviti Utama</td><td colspan="3">${cleanList(rph.aktivitiUtama)}</td></tr>
            <tr><td style="font-weight:bold;background-color:#f8fafc;">Penutup & Rumusan</td><td colspan="3">${rph.penutup}</td></tr>
          `
      }
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;">Strategi Pembezaan</td>
        <td colspan="3">${rph.diferensiasi || 'Diferensiasi proses dan tahap bimbingan berstruktur mengikut keupayaan murid.'}</td>
      </tr>

      <!-- Section: Elemen Merentas Kurikulum -->
      <tr style="background-color:#10b981;color:#ffffff;font-weight:bold;">
        <td colspan="4">5. ELEMEN MERENTAS KURIKULUM & PEDAGOGI</td>
      </tr>
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;">PAK-21 & KBAT</td>
        <td>PAK-21: ${(rph.pak21Kaedah || []).join(', ') || '-'}<br/>KBAT: ${(rph.kbatAras || []).join(', ') || '-'}</td>
        <td style="font-weight:bold;background-color:#f8fafc;">BBM & KPS</td>
        <td>BBM: ${(rph.bbm || []).join(', ') || '-'}<br/>KPS: ${(rph.kemahiranSaintifik || []).join(', ') || '-'}</td>
      </tr>
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;">EMK & Nilai Murni</td>
        <td>EMK: ${(rph.emk || []).join(', ') || '-'}<br/>Nilai: ${(rph.nilaiMurni || []).join(', ') || '-'}</td>
        <td style="font-weight:bold;background-color:#f8fafc;">Pentaksiran PBD</td>
        <td>${(rph.pentaksiranPbd || []).join(', ') || '-'} (TP: ${(rph.tahapPenguasaan || []).join(', ') || '-'})</td>
      </tr>

      <!-- Section: Refleksi -->
      <tr style="background-color:#10b981;color:#ffffff;font-weight:bold;">
        <td colspan="4">6. REFLEKSI & CATATAN GURU</td>
      </tr>
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;">Status PdPc</td>
        <td><strong>${rph.refleksi?.statusPdpc || 'Selesai'}</strong></td>
        <td style="font-weight:bold;background-color:#f8fafc;">Pencapaian Murid</td>
        <td>${rph.refleksi?.bilCapai || '0'} capai objektif, ${rph.refleksi?.bilTidakCapai || '0'} belum capai</td>
      </tr>
      <tr>
        <td style="font-weight:bold;background-color:#f8fafc;">Tindakan Susulan</td>
        <td colspan="3">${rph.refleksi?.tindakanSusulan || '-'} ${rph.refleksi?.catatanTambahan ? `<br/>Catatan: ${rph.refleksi.catatanTambahan}` : ''}</td>
      </tr>
    </table>
  `;
}

export async function muatTurunDokumenSpreadsheet(rph: RPHData) {
  const isSains =
    rph.subjek === 'Sains' ||
    rph.info?.subjek === 'Sains' ||
    rph.babId?.startsWith('S_');
  const isCompact = !!rph.isCompact;
  const fileName = `RPH_${isSains ? 'Sains' : 'Kimia'}_${isCompact ? 'Compact_' : ''}${rph.bahasa === 'DLP' ? 'DLP_' : ''}${rph.info.kelas.replace(/\s+/g, '')}_${rph.info.tarikh}.xls`;

  const htmlTable = binaHtmlSpreadsheetSatuRPH(rph);

  const content = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>${(rph.info.kelas || 'RPH').replace(/[\\/*?:[\]]/g, '').substring(0, 31)}</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
    </head>
    <body>
      ${htmlTable}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], {
    type: 'application/vnd.ms-excel;charset=utf-8',
  });

  return await muatTurunFail(blob, fileName, 'application/vnd.ms-excel');
}

export async function muatTurunRPHMingguanSpreadsheet(rphList: RPHData[], labelMinggu = 'Mingguan') {
  if (rphList.length === 0) return;
  const isSainsBatch = rphList.some(
    (r) =>
      r.subjek === 'Sains' ||
      r.info?.subjek === 'Sains' ||
      r.babId?.startsWith('S_')
  );
  const fileName = `RPH_${isSainsBatch ? 'Sains' : 'Kimia'}_${labelMinggu.replace(/\s+/g, '_')}_Minggu_${rphList[0].info.mingguAkademik || '1'}.xls`;

  // 1. Summary Master Table (Jadual Ringkasan Mingguan)
  const summaryRows = rphList.map((r, i) => `
    <tr>
      <td style="text-align:center;">${i + 1}</td>
      <td>${r.info.tarikh}</td>
      <td>${r.info.hari}</td>
      <td>${r.info.masaMula} - ${r.info.masaTamat}</td>
      <td>${r.info.tingkatan}</td>
      <td><strong>${r.info.kelas}</strong></td>
      <td>${r.babTajuk}</td>
      <td>${r.skKod}: ${r.skTajuk}</td>
      <td>${r.spKod.join(', ')}</td>
      <td>${r.objektif.map(o => bersihkanTeksSenarai(o)).join('; ')}</td>
      <td>${r.refleksi?.statusPdpc || 'Selesai'} (${r.refleksi?.bilCapai || '0'} capai)</td>
    </tr>
  `).join('');

  const summaryTable = `
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:Calibri,Arial,sans-serif;font-size:9.5pt;margin-bottom:25px;">
      <tr style="background-color:#065f46;color:#ffffff;font-size:12pt;font-weight:bold;text-align:center;">
        <td colspan="11" style="padding:10px;">JADUAL RINGKASAN REKOD PENGAJARAN MINGGUAN (${labelMinggu})</td>
      </tr>
      <tr style="background-color:#047857;color:#ffffff;font-weight:bold;text-align:center;">
        <th style="width:40px;">Bil</th>
        <th>Tarikh</th>
        <th>Hari</th>
        <th>Masa</th>
        <th>Tingkatan</th>
        <th>Kelas</th>
        <th>Bab / Bidang</th>
        <th>Standard Kandungan</th>
        <th>Kod SP</th>
        <th>Objektif Pembelajaran</th>
        <th>Refleksi</th>
      </tr>
      ${summaryRows}
    </table>
  `;

  // 2. Full individual RPH tables
  const detailedTables = rphList.map(r => binaHtmlSpreadsheetSatuRPH(r)).join('<br/><br/>');

  const content = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Ringkasan Mingguan</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
    </head>
    <body>
      ${summaryTable}
      ${detailedTables}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], {
    type: 'application/vnd.ms-excel;charset=utf-8',
  });

  return await muatTurunFail(blob, fileName, 'application/vnd.ms-excel');
}
