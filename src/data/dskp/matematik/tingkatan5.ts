import { BabMatematik, StandardPembelajaran } from '../../../types/rph';

function makeBmSp(
  kod: string,
  tajuk: string,
  skTajuk: string,
  babTajuk: string
): StandardPembelajaran {
  const cleanTitle = tajuk.replace(/\.$/, '');
  const lowerTitle = cleanTitle.charAt(0).toLowerCase() + cleanTitle.slice(1);
  return {
    kod,
    tajuk,
    objektifCadangan: [
      `Di akhir PdPc, murid dapat ${lowerTitle} dengan tepat mengikut kehendak DSKP KSSM Matematik.`,
      `Mengaplikasikan konsep ${skTajuk.toLowerCase()} untuk menyelesaikan sekurang-kurangnya 3 soalan latihan dan masalah berangka dengan betul.`,
    ],
    kriteriaKejayaanCadangan: [
      `Murid dapat menerangkan konsep dan langkah kerja matematik bagi SP ${kod} (${cleanTitle}) dengan tepat.`,
      `Murid dapat menyelesaikan sekurang-kurangnya 3 daripada 4 soalan latihan berkaitan ${skTajuk.toLowerCase()} dengan langkah pengiraan yang sistematik.`,
    ],
    cadanganAktiviti: {
      setInduksi: `Guru memaparkan situasi kehidupan harian atau masalah matematik mencabar berkaitan ${skTajuk} (${babTajuk}) dan mengemukakan soalan inkuiri untuk mencungkil pemikiran murid.`,
      aktivitiUtama: [
        `1. Guru menerangkan konsep, rumus dan kaedah penyelesaian SP ${kod}: ${cleanTitle} melalui contoh berangka dan demonstrasi visual.`,
        '2. Aktiviti Kolaboratif PAK-21 (Think-Pair-Share / Penyelesaian Masalah Berpandu): Murid membincangkan kaedah dan menyelesaikan masalah matematik dalam kumpulan.',
        '3. Wakil kumpulan membentangkan langkah kerja pengiraan di hadapan kelas dan menerima maklum balas formatif daripada guru dan rakan sekelas.',
      ],
      penutup: `Exit Ticket: Murid merumuskan konsep teras SP ${kod} dan menyelesaikan 1 soalan semakan pantas.`,
      aktiviti5E: {
        engage: `Guru menunjukkan aplikasi dunia sebenar bagi ${skTajuk} untuk mencetuskan rasa ingin tahu dan minat murid terhadap konsep matematik.`,
        explore: `Murid menyiasat pola, hubungan atau pembinaan rumus matematik menggunakan bahan manipulatif, kertas graf atau perisian dinamik (GeoGebra/kalkulator).`,
        explain: `Murid membentangkan kaedah kerja matematik secara lisan dan bertulis, manakala guru memperjelaskan konsep dan membetulkan sebarang miskonsepsi.`,
        elaborate: `Murid mengaplikasikan konsep ${skTajuk} dalam situasi masalah bukan rutin, konteks kehidupan harian dan soalan bertaraf SPM / KBAT.`,
        evaluate: `Guru mentaksir tahap penguasaan murid melalui semakan latihan formatif dan ketepatan langkah algoritma matematik.`,
      },
    },
    bbmCadangan: [
      'Buku Teks KSSM Matematik',
      'Kalkulator Saintifik',
      'Kertas Graf / Lembaran Kerja',
      'Peralatan Geometri / GeoGebra',
    ],
  };
}

export const DSKP_MATEMATIK_F5: BabMatematik[] = [
  {
    id: 'M_F5_B1',
    tingkatan: 'Tingkatan 5',
    nomborBab: 1,
    tema: 'Perkaitan dan Algebra',
    tajuk: 'Ubahan',
    peneranganRingkas: 'Bab 1 Matematik Tingkatan 5: Ubahan (Perkaitan dan Algebra)',
    skList: [
      {
        kod: '1.1',
        tajuk: 'Ubahan Langsung',
        spList: [
          makeBmSp('1.1.1', 'Menerangkan maksud ubahan langsung.', 'Ubahan Langsung', 'Ubahan'),
          makeBmSp('1.1.2', 'Menentukan hubungan antara dua pemboleh ubah bagi suatu ubahan langsung.', 'Ubahan Langsung', 'Ubahan'),
          makeBmSp('1.1.3', 'Menentukan hubungan antara tiga atau lebih pemboleh ubah bagi suatu ubahan tercantum.', 'Ubahan Langsung', 'Ubahan'),
          makeBmSp('1.1.4', 'Menyelesaikan masalah yang melibatkan ubahan langsung.', 'Ubahan Langsung', 'Ubahan'),
        ],
      },
      {
        kod: '1.2',
        tajuk: 'Ubahan Songsang',
        spList: [
          makeBmSp('1.2.1', 'Menerangkan maksud ubahan songsang.', 'Ubahan Songsang', 'Ubahan'),
          makeBmSp('1.2.2', 'Menentukan hubungan antara dua pemboleh ubah bagi suatu ubahan songsang.', 'Ubahan Songsang', 'Ubahan'),
          makeBmSp('1.2.3', 'Menyelesaikan masalah yang melibatkan ubahan songsang.', 'Ubahan Songsang', 'Ubahan'),
        ],
      },
      {
        kod: '1.3',
        tajuk: 'Ubahan Bergabung',
        spList: [
          makeBmSp('1.3.1', 'Menentukan hubungan antara tiga atau lebih pemboleh ubah bagi suatu ubahan bergabung.', 'Ubahan Bergabung', 'Ubahan'),
          makeBmSp('1.3.2', 'Menyelesaikan masalah yang melibatkan ubahan bergabung. 81 TAFSI.', 'Ubahan Bergabung', 'Ubahan'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B2',
    tingkatan: 'Tingkatan 5',
    nomborBab: 2,
    tema: 'Matematik Diskret',
    tajuk: 'Matriks',
    peneranganRingkas: 'Bab 2 Matematik Tingkatan 5: Matriks (Matematik Diskret)',
    skList: [
      {
        kod: '2.1',
        tajuk: 'Matriks',
        spList: [
          makeBmSp('2.1.1', 'Mewakilkan maklumat situasi sebenar dalam bentuk matriks.', 'Matriks', 'Matriks'),
          makeBmSp('2.1.2', 'Menentukan peringkat matriks dan seterusnya mengenal pasti unsur tertentu dalam suatu matriks.', 'Matriks', 'Matriks'),
          makeBmSp('2.1.3', 'Menentukan sama ada dua matriks adalah sama.', 'Matriks', 'Matriks'),
        ],
      },
      {
        kod: '2.2',
        tajuk: 'Operasi Asas Matriks',
        spList: [
          makeBmSp('2.2.1', 'Menambah dan menolak matriks.', 'Operasi Asas Matriks', 'Matriks'),
          makeBmSp('2.2.2', 'Mendarab matriks dengan suatu nombor.', 'Operasi Asas Matriks', 'Matriks'),
          makeBmSp('2.2.3', 'Mendarab dua matriks.', 'Operasi Asas Matriks', 'Matriks'),
          makeBmSp('2.2.4', 'Menerangkan ciri-ciri matriks identiti.', 'Operasi Asas Matriks', 'Matriks'),
          makeBmSp('2.2.5', 'Menerangkan maksud matriks songsang dan seterusnya menentukan matriks songsang bagi suatu matriks 2 ×.', 'Operasi Asas Matriks', 'Matriks'),
          makeBmSp('2.2.6', 'Menggunakan kaedah matriks untuk menyelesaikan persamaan linear serentak.', 'Operasi Asas Matriks', 'Matriks'),
          makeBmSp('2.2.7', 'Menyelesaikan masalah yang melibatkan matriks. 86 TAFS.', 'Operasi Asas Matriks', 'Matriks'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B3',
    tingkatan: 'Tingkatan 5',
    nomborBab: 3,
    tema: 'Nombor dan Operasi',
    tajuk: 'Matematik Pengguna: Insurans',
    peneranganRingkas: 'Bab 3 Matematik Tingkatan 5: Matematik Pengguna: Insurans (Nombor dan Operasi)',
    skList: [
      {
        kod: '3.1',
        tajuk: 'Risiko dan Perlindungan Insurans',
        spList: [
          makeBmSp('3.1.1', 'Menjelaskan maksud risiko dan kepentingan perlindungan insurans, dan seterusnya mengenal pasti jenis insurans hayat dan insurans am bag melindungi pelbagai jenis risiko.', 'Risiko dan Perlindungan Insurans', 'Matematik Pengguna: Insurans'),
          makeBmSp('3.1.2', 'Mengkaji, mentafsir dan membuat pengiraan yang melibatkan kadar dan premium insurans.', 'Risiko dan Perlindungan Insurans', 'Matematik Pengguna: Insurans'),
          makeBmSp('3.1.3', 'Menyelesaikan masalah yang melibatkan insurans termasuk deduktibel dan ko- insurans. 90 TAFSI.', 'Risiko dan Perlindungan Insurans', 'Matematik Pengguna: Insurans'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B4',
    tingkatan: 'Tingkatan 5',
    nomborBab: 4,
    tema: 'Nombor dan Operasi',
    tajuk: 'Matematik Pengguna: Percukaian',
    peneranganRingkas: 'Bab 4 Matematik Tingkatan 5: Matematik Pengguna: Percukaian (Nombor dan Operasi)',
    skList: [
      {
        kod: '4.1',
        tajuk: 'Percukaian',
        spList: [
          makeBmSp('4.1.1', 'Menghuraikan tujuan percukaian.', 'Percukaian', 'Matematik Pengguna: Percukaian'),
          makeBmSp('4.1.2', 'Menghuraikan pelbagai cukai dan seterusnya kesan pengelakan cukai tersebut dari aspek perundangan dan kewangan.', 'Percukaian', 'Matematik Pengguna: Percukaian'),
          makeBmSp('4.1.3', 'Mengkaji, mentafsir dan membuat pengiraan yang melibatkan pelbagai cukai.', 'Percukaian', 'Matematik Pengguna: Percukaian'),
          makeBmSp('4.1.4', 'Menyelesaikan masalah yang melibatkan percukaian. 94 TAFSI.', 'Percukaian', 'Matematik Pengguna: Percukaian'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B5',
    tingkatan: 'Tingkatan 5',
    nomborBab: 5,
    tema: 'Sukatan dan Geometri',
    tajuk: 'Kekongruenan, Pembesaran dan Gabungan Transformasi',
    peneranganRingkas: 'Bab 5 Matematik Tingkatan 5: Kekongruenan, Pembesaran dan Gabungan Transformasi (Sukatan dan Geometri)',
    skList: [
      {
        kod: '5.1',
        tajuk: 'Kekongruenan',
        spList: [
          makeBmSp('5.1.1', 'Membezakan antara bentuk kongruen dan bukan Pengg kongruen berdasarkan sisi dan sudut.', 'Kekongruenan', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
          makeBmSp('5.1.2', 'Membuat dan menentusahkan konjektur terhadap Aktiv kekongruenan segi tiga berdasarkan sisi dan sudut.', 'Kekongruenan', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
          makeBmSp('5.1.3', 'Menyelesaikan masalah yang melibatkan kekongruenan.', 'Kekongruenan', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
        ],
      },
      {
        kod: '5.2',
        tajuk: 'Pembesaran',
        spList: [
          makeBmSp('5.2.1', 'Menjelaskan maksud keserupaan objek geometri.', 'Pembesaran', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
          makeBmSp('5.2.2', 'Membuat perkaitan antara keserupaan dengan pembesaran dan seterusnya memerihalkan pembesaran menggunakan pelbagai perwakilan.', 'Pembesaran', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
          makeBmSp('5.2.3', 'Menentukan imej dan objek bagi suatu pembesaran.', 'Pembesaran', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
          makeBmSp('5.2.4', 'Membuat dan mengesahkan konjektur tentang hubungan antara luas imej dan luas objek bagi suatu pembesaran.', 'Pembesaran', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
          makeBmSp('5.2.5', 'Menyelesaikan masalah yang melibatkan pembesaran.', 'Pembesaran', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
        ],
      },
      {
        kod: '5.3',
        tajuk: 'Gabungan Transformasi',
        spList: [
          makeBmSp('5.3.1', 'Menentukan imej dan objek bagi suatu gabungan transformasi.', 'Gabungan Transformasi', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
          makeBmSp('5.3.2', 'Membuat dan menentusahkan konjektur tentang sifat kalis tukar tertib terhadap gabungan transformasi.', 'Gabungan Transformasi', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
          makeBmSp('5.3.3', 'Memerihalkan gabungan transformasi.', 'Gabungan Transformasi', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
          makeBmSp('5.3.4', 'Menyelesaikan masalah yang melibatkan gabungan transformasi.', 'Gabungan Transformasi', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
        ],
      },
      {
        kod: '5.4',
        tajuk: 'Teselasi',
        spList: [
          makeBmSp('5.4.1', 'Menjelaskan maksud teselasi.', 'Teselasi', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
          makeBmSp('5.4.2', 'Mereka bentuk teselasi yang melibatkan transformasi isometri. 100 TAFSI.', 'Teselasi', 'Kekongruenan, Pembesaran dan Gabungan Transformasi'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B6',
    tingkatan: 'Tingkatan 5',
    nomborBab: 6,
    tema: 'Sukatan dan Geometri',
    tajuk: 'Nisbah dan Graf Fungsi Trigonometri',
    peneranganRingkas: 'Bab 6 Matematik Tingkatan 5: Nisbah dan Graf Fungsi Trigonometri (Sukatan dan Geometri)',
    skList: [
      {
        kod: '6.1',
        tajuk: 'Nilai Sinus, Kosinus dan Tangen bagi Sudut θ',
        spList: [
          makeBmSp('6.1.1', 'Membuat dan menentusahkan konjektur tentang nilai sinus, kosinus dan tangen sudut dalam sukuan II, III dan IV dengan sudut rujukan sepadan.', 'Nilai Sinus, Kosinus dan Tangen bagi Sudut θ', 'Nisbah dan Graf Fungsi Trigonometri'),
          makeBmSp('6.1.2', 'Menentukan nilai sinus, kosinus dan tangen bagi sudut dalam sukuan II, III dan IV berdasarkan sudut rujukan sepadan.', 'Nilai Sinus, Kosinus dan Tangen bagi Sudut θ', 'Nisbah dan Graf Fungsi Trigonometri'),
          makeBmSp('6.1.3', 'Menentukan sudut apabila nilai sinus, kosinus dan tangen sudut tersebut diberi.', 'Nilai Sinus, Kosinus dan Tangen bagi Sudut θ', 'Nisbah dan Graf Fungsi Trigonometri'),
          makeBmSp('6.1.4', 'Menyelesaikan masalah yang melibatkan sinus, kosinus dan tangen.', 'Nilai Sinus, Kosinus dan Tangen bagi Sudut θ', 'Nisbah dan Graf Fungsi Trigonometri'),
        ],
      },
      {
        kod: '6.2',
        tajuk: 'Graf Fungsi Sinus, Kosinus dan Tangen',
        spList: [
          makeBmSp('6.2.1', 'Melukis graf fungsi trigonometri, , dan bagi 0 ≤ x ≤ 360 membandingbezakan ciri-ciri graf fungsi tersebut.', 'Graf Fungsi Sinus, Kosinus dan Tangen', 'Nisbah dan Graf Fungsi Trigonometri'),
          makeBmSp('6.2.2', 'Mengkaji dan membuat generalisasi tentang kesan perubahan pemalar a, b dan c bagi graf fungsi trigonometri: (i) y = a sin bx + c (ii) y = a kos bx + c (iii) y = a tan bx + c bagi a > 0, b >.', 'Graf Fungsi Sinus, Kosinus dan Tangen', 'Nisbah dan Graf Fungsi Trigonometri'),
          makeBmSp('6.2.3', 'Menyelesaikan masalah yang melibatkan graf fungsi sinus, kosinus dan tangen. 105 TAF.', 'Graf Fungsi Sinus, Kosinus dan Tangen', 'Nisbah dan Graf Fungsi Trigonometri'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B7',
    tingkatan: 'Tingkatan 5',
    nomborBab: 7,
    tema: 'Statistik dan Kebarangkalian',
    tajuk: 'Sukatan Serakan Data Terkumpul',
    peneranganRingkas: 'Bab 7 Matematik Tingkatan 5: Sukatan Serakan Data Terkumpul (Statistik dan Kebarangkalian)',
    skList: [
      {
        kod: '7.1',
        tajuk: 'Serakan',
        spList: [
          makeBmSp('7.1.1', 'Membina histogram dan poligon kekerapan bagi suatu set data terkumpul.', 'Serakan', 'Sukatan Serakan Data Terkumpul'),
          makeBmSp('7.1.2', 'Membanding dan mentafsir serakan dua atau lebih set data terkumpul berdasarkan histogram dan poligon kekerapan dan seterusnya membuat kesimpulan.', 'Serakan', 'Sukatan Serakan Data Terkumpul'),
          makeBmSp('7.1.3', 'Membina ogif bagi suatu set data terkumpul dan seterusnya menentukan kuartil. viii.', 'Serakan', 'Sukatan Serakan Data Terkumpul'),
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Sukatan Serakan',
        spList: [
          makeBmSp('7.2.1', 'Menentukan julat, julat antara kuartil, varians dan sisihan piawai sebagai sukatan untuk menghuraikan serakan bagi data terkumpul.', 'Sukatan Serakan', 'Sukatan Serakan Data Terkumpul'),
          makeBmSp('7.2.2', 'Membina dan mentafsir plot kotak bagi suatu set data terkumpul.', 'Sukatan Serakan', 'Sukatan Serakan Data Terkumpul'),
          makeBmSp('7.2.3', 'Membanding dan mentafsir dua atau lebih set data terkumpul, berdasarkan sukatan serakan yang sesuai dan seterusnya membuat kesimpulan.', 'Sukatan Serakan', 'Sukatan Serakan Data Terkumpul'),
          makeBmSp('7.2.4', 'Menyelesaikan masalah yang melibatkan sukatan serakan bagi data terkumpul.', 'Sukatan Serakan', 'Sukatan Serakan Data Terkumpul'),
          makeBmSp('7.2.5', 'Mereka bentuk dan melaksanakan suatu projek mini yang melibatkan penyiasatan statistik berdasarkan sukatan kecenderungan memusat dan sukatan serakan serta mentafsir dan mengkomunikasikan dapatan kajian. 110 TAFS.', 'Sukatan Serakan', 'Sukatan Serakan Data Terkumpul'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B8',
    tingkatan: 'Tingkatan 5',
    nomborBab: 8,
    tema: 'Aplikasi Matematik',
    tajuk: 'Pemodelan Matematik',
    peneranganRingkas: 'Bab 8 Matematik Tingkatan 5: Pemodelan Matematik (Aplikasi Matematik)',
    skList: [
      {
        kod: '8.1',
        tajuk: 'Pemodelan Matematik',
        spList: [
          makeBmSp('8.1.1', 'Menerangkan pemodelan matematik.', 'Pemodelan Matematik', 'Pemodelan Matematik'),
          makeBmSp('8.1.2', 'Menyelesaikan masalah kehidupan sebenar melalui pemodelan matematik yang melibatkan fungsi: (i) Linear (ii) Kuadratik (iii) Eksponen dan mengkomunikasikan proses pemodelan matematik yang dilaksanakan. 114 TAFSI.', 'Pemodelan Matematik', 'Pemodelan Matematik'),
        ],
      },
    ],
  },
];
