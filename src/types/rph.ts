export type SubjekRPH = 'Kimia' | 'Biologi' | 'Fizik' | 'Sains' | 'Matematik' | 'Matematik Tambahan';
export type Tingkatan =
  | 'Tingkatan 1'
  | 'Tingkatan 2'
  | 'Tingkatan 3'
  | 'Tingkatan 4'
  | 'Tingkatan 5';
export type ModelPdpc = 'Standard KPM' | '5E Pedagogi HIKMAH (MRSM)';
export type BahasaRPH = 'BM' | 'DLP';

export interface KelasTambahanItem {
  id: string;
  tingkatan: Tingkatan;
  kelas: string;
  tarikh: string;
  hari: string;
  masaMula: string;
  masaTamat: string;
  tempohMinit: number;
  bilanganMurid: number | string;
  kehadiranMurid: string;
}

export interface SlotJadualWaktu {
  id: string;
  hari: string;
  masaMula: string;
  masaTamat: string;
  tempohMinit: number;
  tingkatan: Tingkatan;
  kelas: string;
  subjek?: string;
}

export interface StandardPembelajaran {
  kod: string; // e.g. "1.1.1"
  tajuk: string;
  objektifCadangan: string[];
  kriteriaKejayaanCadangan: string[];
  cadanganAktiviti: {
    setInduksi: string;
    aktivitiUtama: string[];
    penutup: string;
    aktiviti5E?: {
      engage: string;
      explore: string;
      explain: string;
      elaborate: string;
      evaluate: string;
    };
  };
  bbmCadangan: string[];
  kemahiranSaintifikCadangan: string[];
  eksperimenWajib?: boolean;
  namaEksperimen?: string;
  radasBahan?: string[];
  notaGuru?: string;
}

export interface StandardKandungan {
  kod: string; // e.g. "1.1"
  tajuk: string;
  spList: StandardPembelajaran[];
}

export interface BabKimia {
  id: string; // e.g. "F4_B1"
  tingkatan: Tingkatan;
  nomborBab: number;
  tema: string;
  tajuk: string;
  peneranganRingkas: string;
  isProgramKhas?: boolean;
  skList: StandardKandungan[];
}

export type BabBiologi = BabKimia;
export type BabFizik = BabKimia;
export type BabMatematik = BabKimia;

export interface MaklumatAsasRPH {
  subjek?: SubjekRPH;
  namaGuru: string;
  namaSekolah: string;
  tingkatan: Tingkatan;
  kelas: string;
  tarikh: string;
  hari: string;
  masaMula: string;
  masaTamat: string;
  tempohMinit: number;
  bilanganMurid: number | string;
  kehadiranMurid: string;
  mingguAkademik: number;
  kelasTambahan?: KelasTambahanItem[];
}

export interface ElemenAktifRPH {
  pak21?: boolean;
  kbat?: boolean;
  kps?: boolean;
  bbm?: boolean;
  emk?: boolean;
  nilaiMurni?: boolean;
  pentaksiran?: boolean;
  refleksi?: boolean;
}

export interface RPHData {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'draf' | 'siap';
  subjek?: SubjekRPH;
  bahasa?: BahasaRPH;
  isCompact?: boolean;
  modelPdpc: ModelPdpc;
  info: MaklumatAsasRPH;
  babId: string;
  babTajuk: string;
  tema: string;
  skKod: string;
  skTajuk: string;
  spKod: string[];
  spTajuk: string[];
  isEksperimen: boolean;
  namaEksperimen?: string;
  radasBahanEksperimen?: string[];
  objektif: string[];
  kriteriaKejayaan: string[];
  // Standard 3-phase activities
  setInduksi: string;
  aktivitiUtama: string[];
  penutup: string;
  // 5E Pedagogi Hikmah MRSM activities
  aktiviti5E: {
    engage: string;
    explore: string;
    explain: string;
    elaborate: string;
    evaluate: string;
  };
  // Pedagogi Hikmah MRSM Attributes & SIKAP Core Values
  atributHikmah: string[];
  nilaiSikapMrsm: string[];
  diferensiasi: string;
  pak21Kaedah: string[];
  kbatAras: string[];
  soalanKbatContoh?: string;
  kemahiranSaintifik: string[];
  kemahiranManipulatif: string[];
  emk: string[];
  nilaiMurni: string[];
  bbm: string[];
  pentaksiranPbd: string[];
  tahapPenguasaan: string[];
  elemenAktif?: ElemenAktifRPH;
  refleksi: {
    bilCapai: number | string;
    bilTidakCapai: number | string;
    tindakanSusulan: string;
    catatanTambahan: string;
    statusPdpc: 'Selesai' | 'Ditangguhkan' | 'Diteruskan';
  };
}


