export interface BookTextReference {
  tingkatan: string;
  tajuk: string;
  penerbit: string;
  url: string;
  tahun: string;
}

export interface DskpReference {
  tingkatan: string;
  kod: string;
  dokumen: string;
  penerbit: string;
  url: string;
  fokus: string;
}

export interface SubjectOfficialReference {
  key: string;
  name: string;
  shortName: string;
  themeColor: string;
  badgeClass: string;
  pillClass: string;
  accentText: string;
  borderClass: string;
  bpkUrl: string;
  dskpList: DskpReference[];
  bukuTeksList: BookTextReference[];
}

export const OFFICIAL_REFERENCES: Record<string, SubjectOfficialReference> = {
  kimia: {
    key: 'kimia',
    name: 'Kimia KSSM',
    shortName: 'Kimia',
    themeColor: 'emerald',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    pillClass: 'bg-emerald-600 text-white border-emerald-600',
    accentText: 'text-emerald-700',
    borderClass: 'border-emerald-200',
    bpkUrl: 'http://bpk.moe.gov.my/index.php/terbitan-bpk/dskp/kssm',
    dskpList: [
      {
        tingkatan: 'Tingkatan 4 & 5',
        kod: 'DSKP KSSM Kimia',
        dokumen: 'Dokumen Standard Kurikulum dan Pentaksiran Kimia Tingkatan 4 dan 5',
        penerbit: 'Bahagian Pembangunan Kurikulum (BPK), KPM',
        url: 'http://bpk.moe.gov.my/',
        fokus: 'Asas Kimia, Jirim, Ikatan Kimia, Asid-Bes-Garam, Redoks, Kimia Karbon, Termokimia, Kimia Industri.',
      },
    ],
    bukuTeksList: [
      {
        tingkatan: 'Tingkatan 4',
        tajuk: 'Buku Teks Kimia KSSM Tingkatan 4',
        penerbit: 'Pan Asia Publications Sdn. Bhd. / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Kimia+Tingkatan+4+KSSM',
        tahun: 'KSSM',
      },
      {
        tingkatan: 'Tingkatan 5',
        tajuk: 'Buku Teks Kimia KSSM Tingkatan 5',
        penerbit: 'Sasbadi Sdn. Bhd. / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Kimia+Tingkatan+5+KSSM',
        tahun: 'KSSM',
      },
    ],
  },

  biologi: {
    key: 'biologi',
    name: 'Biologi KSSM',
    shortName: 'Biologi',
    themeColor: 'pink',
    badgeClass: 'bg-pink-50 text-pink-800 border-pink-200',
    pillClass: 'bg-[#ab4f6c] text-white border-[#ab4f6c]',
    accentText: 'text-[#ab4f6c]',
    borderClass: 'border-pink-200',
    bpkUrl: 'http://bpk.moe.gov.my/index.php/terbitan-bpk/dskp/kssm',
    dskpList: [
      {
        tingkatan: 'Tingkatan 4 & 5',
        kod: 'DSKP KSSM Biologi',
        dokumen: 'Dokumen Standard Kurikulum dan Pentaksiran Biologi Tingkatan 4 dan 5',
        penerbit: 'Bahagian Pembangunan Kurikulum (BPK), KPM',
        url: 'http://bpk.moe.gov.my/',
        fokus: 'Asas Biologi, Fisiologi Manusia & Haiwan, Fisiologi Tumbuhan Berbunga, Ekologi, Pewarisan & Bioteknologi.',
      },
    ],
    bukuTeksList: [
      {
        tingkatan: 'Tingkatan 4',
        tajuk: 'Buku Teks Biologi KSSM Tingkatan 4',
        penerbit: 'Must Read Sdn. Bhd. / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Biologi+Tingkatan+4+KSSM',
        tahun: 'KSSM',
      },
      {
        tingkatan: 'Tingkatan 5',
        tajuk: 'Buku Teks Biologi KSSM Tingkatan 5',
        penerbit: 'Dewan Bahasa dan Pustaka / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Biologi+Tingkatan+5+KSSM',
        tahun: 'KSSM',
      },
    ],
  },

  fizik: {
    key: 'fizik',
    name: 'Fizik KSSM',
    shortName: 'Fizik',
    themeColor: 'amber',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    pillClass: 'bg-[#ab5e19] text-white border-[#ab5e19]',
    accentText: 'text-[#ab5e19]',
    borderClass: 'border-amber-200',
    bpkUrl: 'http://bpk.moe.gov.my/index.php/terbitan-bpk/dskp/kssm',
    dskpList: [
      {
        tingkatan: 'Tingkatan 4 & 5',
        kod: 'DSKP KSSM Fizik',
        dokumen: 'Dokumen Standard Kurikulum dan Pentaksiran Fizik Tingkatan 4 dan 5',
        penerbit: 'Bahagian Pembangunan Kurikulum (BPK), KPM',
        url: 'http://bpk.moe.gov.my/',
        fokus: 'Mekanik, Kegravitian, Termodinamik, Gelombang, Optik, Elektrik, Keelektromagnetan, Fizik Nuklear & Kuantum.',
      },
    ],
    bukuTeksList: [
      {
        tingkatan: 'Tingkatan 4',
        tajuk: 'Buku Teks Fizik KSSM Tingkatan 4',
        penerbit: 'Sasbadi Sdn. Bhd. / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Fizik+Tingkatan+4+KSSM',
        tahun: 'KSSM',
      },
      {
        tingkatan: 'Tingkatan 5',
        tajuk: 'Buku Teks Fizik KSSM Tingkatan 5',
        penerbit: 'Dewan Bahasa dan Pustaka / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Fizik+Tingkatan+5+KSSM',
        tahun: 'KSSM',
      },
    ],
  },

  sains: {
    key: 'sains',
    name: 'Sains KSSM',
    shortName: 'Sains',
    themeColor: 'sky',
    badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
    pillClass: 'bg-sky-600 text-white border-sky-600',
    accentText: 'text-sky-700',
    borderClass: 'border-sky-200',
    bpkUrl: 'http://bpk.moe.gov.my/index.php/terbitan-bpk/dskp/kssm',
    dskpList: [
      {
        tingkatan: 'Tingkatan 2 & 3',
        kod: 'DSKP Sains Menengah Rendah',
        dokumen: 'Dokumen Standard Kurikulum dan Pentaksiran Sains Tingkatan 2 dan 3',
        penerbit: 'BPK, Kementerian Pendidikan Malaysia',
        url: 'http://bpk.moe.gov.my/',
        fokus: 'Penyiasatan Saintifik, Biodiversiti, Ekosistem, Nutrisi, Rangsangan, Respirasi, Pengangkutan, Elektrik.',
      },
      {
        tingkatan: 'Tingkatan 4 & 5',
        kod: 'DSKP Sains Menengah Atas',
        dokumen: 'Dokumen Standard Kurikulum dan Pentaksiran Sains Tingkatan 4 dan 5',
        penerbit: 'BPK, Kementerian Pendidikan Malaysia',
        url: 'http://bpk.moe.gov.my/',
        fokus: 'Langkah Keselamatan Makmal, Bantuan Kecemasan, Parameter Kesihatan, Genetik, Daya, Nuklear, Kelestarian.',
      },
    ],
    bukuTeksList: [
      {
        tingkatan: 'Tingkatan 2',
        tajuk: 'Buku Teks Sains KSSM Tingkatan 2',
        penerbit: 'Dewan Bahasa dan Pustaka / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Sains+Tingkatan+2+KSSM',
        tahun: 'KSSM',
      },
      {
        tingkatan: 'Tingkatan 3',
        tajuk: 'Buku Teks Sains KSSM Tingkatan 3',
        penerbit: 'Dewan Bahasa dan Pustaka / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Sains+Tingkatan+3+KSSM',
        tahun: 'KSSM',
      },
      {
        tingkatan: 'Tingkatan 4',
        tajuk: 'Buku Teks Sains KSSM Tingkatan 4',
        penerbit: 'Dewan Bahasa dan Pustaka / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Sains+Tingkatan+4+KSSM',
        tahun: 'KSSM',
      },
      {
        tingkatan: 'Tingkatan 5',
        tajuk: 'Buku Teks Sains KSSM Tingkatan 5',
        penerbit: 'Dewan Bahasa dan Pustaka / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Sains+Tingkatan+5+KSSM',
        tahun: 'KSSM',
      },
    ],
  },

  matematik: {
    key: 'matematik',
    name: 'Matematik KSSM',
    shortName: 'Matematik',
    themeColor: 'indigo',
    badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    pillClass: 'bg-indigo-700 text-white border-indigo-700',
    accentText: 'text-indigo-700',
    borderClass: 'border-indigo-200',
    bpkUrl: 'http://bpk.moe.gov.my/index.php/terbitan-bpk/dskp/kssm',
    dskpList: [
      {
        tingkatan: 'Tingkatan 2 & 3',
        kod: 'DSKP Matematik Menengah Rendah',
        dokumen: 'Dokumen Standard Kurikulum dan Pentaksiran Matematik Tingkatan 2 dan 3',
        penerbit: 'BPK, Kementerian Pendidikan Malaysia',
        url: 'http://bpk.moe.gov.my/',
        fokus: 'Pola & Jujukan, Pemfaktoran, Rumus Algebra, Poligon, Bulatan, Geometri 3D, Graf Fungsi, Indeks, Garis Lurus.',
      },
      {
        tingkatan: 'Tingkatan 4 & 5',
        kod: 'DSKP Matematik Menengah Atas',
        dokumen: 'Dokumen Standard Kurikulum dan Pentaksiran Matematik Tingkatan 4 dan 5',
        penerbit: 'BPK, Kementerian Pendidikan Malaysia',
        url: 'http://bpk.moe.gov.my/',
        fokus: 'Fungsi Kuadratik, Asas Nombor, Penaakulan Logik, Operasi Set, Rangkaian Teori Graf, Ubahan, Matriks, Permodelan.',
      },
    ],
    bukuTeksList: [
      {
        tingkatan: 'Tingkatan 2',
        tajuk: 'Buku Teks Matematik KSSM Tingkatan 2',
        penerbit: 'Dewan Bahasa dan Pustaka / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Matematik+Tingkatan+2+KSSM',
        tahun: 'KSSM',
      },
      {
        tingkatan: 'Tingkatan 3',
        tajuk: 'Buku Teks Matematik KSSM Tingkatan 3',
        penerbit: 'Dewan Bahasa dan Pustaka / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Matematik+Tingkatan+3+KSSM',
        tahun: 'KSSM',
      },
      {
        tingkatan: 'Tingkatan 4',
        tajuk: 'Buku Teks Matematik KSSM Tingkatan 4',
        penerbit: 'Dewan Bahasa dan Pustaka / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Matematik+Tingkatan+4+KSSM',
        tahun: 'KSSM',
      },
      {
        tingkatan: 'Tingkatan 5',
        tajuk: 'Buku Teks Matematik KSSM Tingkatan 5',
        penerbit: 'Dewan Bahasa dan Pustaka / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Matematik+Tingkatan+5+KSSM',
        tahun: 'KSSM',
      },
    ],
  },

  'matematik-tambahan': {
    key: 'matematik-tambahan',
    name: 'Matematik Tambahan KSSM',
    shortName: 'Math Tambahan',
    themeColor: 'charcoal',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
    pillClass: 'bg-slate-800 text-white border-slate-800',
    accentText: 'text-slate-800',
    borderClass: 'border-slate-300',
    bpkUrl: 'http://bpk.moe.gov.my/index.php/terbitan-bpk/dskp/kssm',
    dskpList: [
      {
        tingkatan: 'Tingkatan 4 & 5',
        kod: 'DSKP KSSM Matematik Tambahan',
        dokumen: 'Dokumen Standard Kurikulum dan Pentaksiran Matematik Tambahan Tingkatan 4 dan 5',
        penerbit: 'Bahagian Pembangunan Kurikulum (BPK), KPM',
        url: 'http://bpk.moe.gov.my/',
        fokus: 'Fungsi, Kuadratik, Sistem Persamaan, Logaritma, Janjang, Geometri Koordinat, Vektor, Pembezaan, Pengamiran, Trigonometri.',
      },
    ],
    bukuTeksList: [
      {
        tingkatan: 'Tingkatan 4',
        tajuk: 'Buku Teks Matematik Tambahan Tingkatan 4',
        penerbit: 'Dewan Bahasa dan Pustaka / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Matematik+Tambahan+Tingkatan+4+KSSM',
        tahun: 'KSSM',
      },
      {
        tingkatan: 'Tingkatan 5',
        tajuk: 'Buku Teks Matematik Tambahan Tingkatan 5',
        penerbit: 'Dewan Bahasa dan Pustaka / KPM',
        url: 'https://anyflip.com/explore?q=Buku+Teks+Matematik+Tambahan+Tingkatan+5+KSSM',
        tahun: 'KSSM',
      },
    ],
  },
};
