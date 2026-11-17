import { BabKimia, StandardPembelajaran } from '../../../types/rph';

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
      `Di akhir PdPc, murid dapat ${lowerTitle} dengan tepat mengikut kehendak DSKP KSSM Matematik Tambahan.`,
      `Mengaplikasikan konsep ${skTajuk.toLowerCase()} untuk menyelesaikan sekurang-kurangnya 3 soalan latihan dan masalah bukan rutin dengan jalan kerja yang tepat.`,
    ],
    kriteriaKejayaanCadangan: [
      `Murid dapat menerangkan konsep asas dan formula bagi SP ${kod} (${cleanTitle}) dengan jelas.`,
      `Murid dapat menyempurnakan sekurang-kurangnya 3 daripada 4 soalan berkaitan ${skTajuk.toLowerCase()} menggunakan kaedah matematik yang sistematik.`,
    ],
    cadanganAktiviti: {
      setInduksi: `Guru memaparkan simulasi visual / masalah berkonteks nyata berkaitan ${skTajuk} (${babTajuk}) dan merangsang pemikiran inkuiri murid.`,
      aktivitiUtama: [
        `1. Guru menerangkan konsep teras, rumus dan kaedah penyelesaian SP ${kod}: ${cleanTitle} melalui contoh berangka dan demonstrasi visual.`,
        '2. Aktiviti Kolaboratif PAK-21 (Think-Pair-Share / Penyelesaian Masalah Berpandu): Murid membincangkan strategi penyelesaian dan membina pemahaman mendalam dalam kumpulan.',
        '3. Wakil murid mempersembahkan kaedah penyelesaian pada papan putih / perisian GeoGebra dan menerima bimbingan guru.',
      ],
      penutup: `Exit Ticket: Murid merumuskan intipati SP ${kod} dan menjawab 1 soalan uji minda pantas.`,
      aktiviti5E: {
        engage: `Guru mempersembahkan senario dunia nyata atau visual grafik melibatkan ${skTajuk} untuk mencetuskan minat dan inkuiri murid.`,
        explore: `Murid menjalankan penerokaan menggunakan kalkulator saintifik / GeoGebra / perisian grafik untuk menyiasat pola dan hubungan matematik.`,
        explain: `Murid menerangkan definisi, langkah penyelesaian dan justifikasi rumus, manakala guru memantapkan kefahaman konsep.`,
        elaborate: `Murid menyelesaikan soalan format SPM / soalan KBAT bukan rutin yang mengintegrasikan pelbagai kemahiran matematik tambahan.`,
        evaluate: `Guru menyemak ketepatan kerja murid secara formatif melalui latihan berpandu dan maklum balas serta-merta.`,
      },
    },
    bbmCadangan: [
      'Buku Teks Matematik Tambahan KSSM',
      'Kalkulator Saintifik',
      'Kertas Graf / Lembaran Kerja Berpandu',
      'Perisian Dinamik (GeoGebra / Desmos)',
    ],
  };
}

export const DSKP_ADDMATH_F5: BabKimia[] = [
  {
    id: 'AM_F5_B1',
    tingkatan: 'Tingkatan 5',
    nomborBab: 1,
    tema: 'Trigonometri',
    tajuk: 'Sukatan Membulat',
    peneranganRingkas: 'Bab 1 Matematik Tambahan Tingkatan 5: Sukatan Membulat (Trigonometri)',
    skList: [
      {
        kod: '1.1',
        tajuk: 'Radian',
        spList: [
          makeBmSp('1.1.1', 'Membuat perkaitan antara ukuran sudut dalam.', 'Radian', 'Sukatan Membulat'),
        ],
      },
      {
        kod: '1.2',
        tajuk: 'Panjang Lengkok Suatu Bulatan',
        spList: [
          makeBmSp('1.2.1', 'Menentukan (i) panjang lengkok, (ii) jejari, dan (iii) sudut tercangkum di pusat bulatan.', 'Panjang Lengkok Suatu Bulatan', 'Sukatan Membulat'),
          makeBmSp('1.2.2', 'Menentukan perimeter tembereng suatu bulatan.', 'Panjang Lengkok Suatu Bulatan', 'Sukatan Membulat'),
          makeBmSp('1.2.3', 'Menyelesaikan masalah yang melibatkan panjang lengkok.', 'Panjang Lengkok Suatu Bulatan', 'Sukatan Membulat'),
        ],
      },
      {
        kod: '1.3',
        tajuk: 'Luas Sektor Suatu Bulatan',
        spList: [
          makeBmSp('1.3.1', 'Menentukan (i) luas sektor, (ii) jejari, dan (iii) sudut tercangkum di pusat bulatan.', 'Luas Sektor Suatu Bulatan', 'Sukatan Membulat'),
          makeBmSp('1.3.2', 'Menentukan luas tembereng suatu bulatan.', 'Luas Sektor Suatu Bulatan', 'Sukatan Membulat'),
          makeBmSp('1.3.3', 'Menyelesaikan masalah yang melibatkan luas sektor.', 'Luas Sektor Suatu Bulatan', 'Sukatan Membulat'),
        ],
      },
      {
        kod: '1.4',
        tajuk: 'Aplikasi Sukatan Membulat',
        spList: [
          makeBmSp('1.4.1', 'Menyelesaikan masalah yang melibatkan sukatan membulat.', 'Aplikasi Sukatan Membulat', 'Sukatan Membulat'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B2',
    tingkatan: 'Tingkatan 5',
    nomborBab: 2,
    tema: 'Kalkulus',
    tajuk: 'Pembezaan',
    peneranganRingkas: 'Bab 2 Matematik Tambahan Tingkatan 5: Pembezaan (Kalkulus)',
    skList: [
      {
        kod: '2.1',
        tajuk: 'Had dan Hubungannya dengan Pembezaan',
        spList: [
          makeBmSp('2.1.1', 'Menyiasat dan menentukan nilai had suatu sifar.', 'Had dan Hubungannya dengan Pembezaan', 'Pembezaan'),
          makeBmSp('2.1.2', 'Menentukan terbitan pertama suatu fungsi f(x)melalui pembezaan dengan prinsip pertama.', 'Had dan Hubungannya dengan Pembezaan', 'Pembezaan'),
        ],
      },
      {
        kod: '2.2',
        tajuk: 'Pembezaan Peringkat Pertama',
        spList: [
          makeBmSp('2.2.1', 'Menerbitkan rumus terbitan pertama secara induktif bagi fungsi integer.', 'Pembezaan Peringkat Pertama', 'Pembezaan'),
          makeBmSp('2.2.2', 'Menentukan terbitan pertama bagi suatu fungsi algebra.', 'Pembezaan Peringkat Pertama', 'Pembezaan'),
          makeBmSp('2.2.3', 'Menentukan terbitan pertama fungsi gubahan.', 'Pembezaan Peringkat Pertama', 'Pembezaan'),
          makeBmSp('2.2.4', 'Menentukan terbitan pertama bagi suatu fungsi yang melibatkan hasil darab dan hasil bahagi ungkapan algebra.', 'Pembezaan Peringkat Pertama', 'Pembezaan'),
        ],
      },
      {
        kod: '2.3',
        tajuk: 'Pembezaan Peringkat Kedua',
        spList: [
          makeBmSp('2.3.1', 'Menentukan terbitan kedua bagi fungsi algebra.', 'Pembezaan Peringkat Kedua', 'Pembezaan'),
        ],
      },
      {
        kod: '2.4',
        tajuk: 'Aplikasi Pembezaan',
        spList: [
          makeBmSp('2.4.1', 'Mentafsir kecerunan tangen kepada lengkung pada titik-titik yang berlainan.', 'Aplikasi Pembezaan', 'Pembezaan'),
          makeBmSp('2.4.2', 'Menentukan persamaan tangen dan normal kepada satu lengkung pada suatu titik.', 'Aplikasi Pembezaan', 'Pembezaan'),
          makeBmSp('2.4.3', 'Menyelesaikan tangen dan normal.', 'Aplikasi Pembezaan', 'Pembezaan'),
          makeBmSp('2.4.4', 'Menentukan titik pusingan dan menghuraikan sifat titik pusingan tersebut.', 'Aplikasi Pembezaan', 'Pembezaan'),
          makeBmSp('2.4.5', 'Menyelesaikan masalah yang melibatkan nilai maksimum dan nilai minimum serta mentafsir penyelesaian tersebut.', 'Aplikasi Pembezaan', 'Pembezaan'),
          makeBmSp('2.4.6', 'Mentafsir dan menentukan kadar perubahan bagi kuantiti yang terhubung.', 'Aplikasi Pembezaan', 'Pembezaan'),
          makeBmSp('2.4.7', 'Menyelesaikan masalah yang melibatkan kadar perubahan bagi kuantiti yang terhubung dan mentafsir penyelesaian tersebut.', 'Aplikasi Pembezaan', 'Pembezaan'),
          makeBmSp('2.4.8', 'Mentafsir dan menentukan perubahan kecil dan penghampiran suatu kuantiti.', 'Aplikasi Pembezaan', 'Pembezaan'),
          makeBmSp('2.4.9', 'Menyelesaikan masalah yang melibatkan perubahan kecil dan penghampiran suatu kuantiti.', 'Aplikasi Pembezaan', 'Pembezaan'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B3',
    tingkatan: 'Tingkatan 5',
    nomborBab: 3,
    tema: 'Kalkulus',
    tajuk: 'Pengamiran',
    peneranganRingkas: 'Bab 3 Matematik Tambahan Tingkatan 5: Pengamiran (Kalkulus)',
    skList: [
      {
        kod: '3.1',
        tajuk: 'Pengamiran Sebagai Songsangan Pembezaan',
        spList: [
          makeBmSp('3.1.1', 'Menjelaskan perkaitan antara pembezaan.', 'Pengamiran Sebagai Songsangan Pembezaan', 'Pengamiran'),
        ],
      },
      {
        kod: '3.2',
        tajuk: 'Kamiran Tak Tentu',
        spList: [
          makeBmSp('3.2.1', 'Menerbitkan rumus kamiran tak tentu secara induktif.', 'Kamiran Tak Tentu', 'Pengamiran'),
          makeBmSp('3.2.2', 'Menentukan kamiran tak tentu bagi fungsi algebra.', 'Kamiran Tak Tentu', 'Pengamiran'),
          makeBmSp('3.2.3', 'Menentukan kamiran tak tentu bagi fungsi berbentuk (𝑎𝑥 b ialah pemalar, n integer dan n  –1.', 'Kamiran Tak Tentu', 'Pengamiran'),
          makeBmSp('3.2.4', 'Menentukan persamaan lengkung daripada fungsi kecerunan.', 'Kamiran Tak Tentu', 'Pengamiran'),
        ],
      },
      {
        kod: '3.3',
        tajuk: 'Kamiran Tentu',
        spList: [
          makeBmSp('3.3.1', 'Menentukan nilai kamiran tentu bagi fungsi algebra.', 'Kamiran Tentu', 'Pengamiran'),
          makeBmSp('3.3.2', 'Menyiasat dan menerangkan perkaitan antara had bagi hasil tambah luas segi empat tepat dengan luas di bawah suatu lengkung.', 'Kamiran Tentu', 'Pengamiran'),
          makeBmSp('3.3.3', 'Menentukan luas suatu rantau.', 'Kamiran Tentu', 'Pengamiran'),
          makeBmSp('3.3.4', 'Menyiasat dan menerangkan perkaitan antara had bagi hasil tambah isi padu silinder dengan isi padu janaan daripada kisaran suatu rantau.', 'Kamiran Tentu', 'Pengamiran'),
          makeBmSp('3.3.5', 'Menentukan isi padu janaan bagi suatu rantau yang dikisarkan pada paksi-x atau paksi-y.', 'Kamiran Tentu', 'Pengamiran'),
        ],
      },
      {
        kod: '3.4',
        tajuk: 'Aplikasi Pengamiran',
        spList: [
          makeBmSp('3.4.1', 'Menyelesaikan masalah yang melibatkan pengamiran.', 'Aplikasi Pengamiran', 'Pengamiran'),
          makeBmSp('3.4.2', 'Menyelesaikan masalah yang melibatkan pengamiran.', 'Aplikasi Pengamiran', 'Pengamiran'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B4',
    tingkatan: 'Tingkatan 5',
    nomborBab: 4,
    tema: 'Statistik dan Kebarangkalian',
    tajuk: 'Pilih Atur dan Gabungan',
    peneranganRingkas: 'Bab 4 Matematik Tambahan Tingkatan 5: Pilih Atur dan Gabungan (Statistik dan Kebarangkalian)',
    skList: [
      {
        kod: '4.1',
        tajuk: 'Pilih Atur',
        spList: [
          makeBmSp('4.1.1', 'Menyiasat dan membuat generalisasi tentang.', 'Pilih Atur', 'Pilih Atur dan Gabungan'),
          makeBmSp('4.1.2', 'Menentukan bilangan pilih atur bagi: (i) n objek yang berbeza. (ii) n objek yang berbeza diambil r objek pada satu masa. (iii) n objek yang melibatkan objek secaman.', 'Pilih Atur', 'Pilih Atur dan Gabungan'),
          makeBmSp('4.1.3', 'Menyelesaikan masalah yang melibatkan pilih atur dengan syarat tertentu.', 'Pilih Atur', 'Pilih Atur dan Gabungan'),
        ],
      },
      {
        kod: '4.2',
        tajuk: 'Gabungan',
        spList: [
          makeBmSp('4.2.1', 'Membanding beza pilih atur dan gabungan.', 'Gabungan', 'Pilih Atur dan Gabungan'),
          makeBmSp('4.2.2', 'Menentukan bilangan gabungan daripada n objek yang berbeza pada satu masa.', 'Gabungan', 'Pilih Atur dan Gabungan'),
          makeBmSp('4.2.3', 'Menyelesaikan masalah yang melibatkan gabungan dengan syarat tertentu.', 'Gabungan', 'Pilih Atur dan Gabungan'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B5',
    tingkatan: 'Tingkatan 5',
    nomborBab: 5,
    tema: 'Statistik dan Kebarangkalian',
    tajuk: 'Taburan Kebarangkalian',
    peneranganRingkas: 'Bab 5 Matematik Tambahan Tingkatan 5: Taburan Kebarangkalian (Statistik dan Kebarangkalian)',
    skList: [
      {
        kod: '5.1',
        tajuk: 'Pemboleh Ubah Rawak',
        spList: [
          makeBmSp('5.1.1', 'Menjelaskan maksud pemboleh ubah.', 'Pemboleh Ubah Rawak', 'Taburan Kebarangkalian'),
          makeBmSp('5.1.2', 'Membanding dan membeza pemboleh ubah rawak diskret dan pemboleh ubah rawak selanjar.', 'Pemboleh Ubah Rawak', 'Taburan Kebarangkalian'),
          makeBmSp('5.1.3', 'Menerangkan maksud taburan kebarangkalian pemboleh ubah rawak diskret.', 'Pemboleh Ubah Rawak', 'Taburan Kebarangkalian'),
          makeBmSp('5.1.4', 'Membina jadual dan melukis graf taburan kebarangkalian pemboleh ubah rawak diskret.', 'Pemboleh Ubah Rawak', 'Taburan Kebarangkalian'),
        ],
      },
      {
        kod: '5.2',
        tajuk: 'Taburan Binomial',
        spList: [
          makeBmSp('5.2.1', 'Menerangkan maksud taburan binomial.', 'Taburan Binomial', 'Taburan Kebarangkalian'),
          makeBmSp('5.2.2', 'Menentukan kebarangkalian suatu peristiwa bagi taburan binomial.', 'Taburan Binomial', 'Taburan Kebarangkalian'),
          makeBmSp('5.2.3', 'Mentafsir maklumat, membina jadual dan melukis graf taburan binomial.', 'Taburan Binomial', 'Taburan Kebarangkalian'),
          makeBmSp('5.2.4', 'Menentukan dan menerangkan nilai min, varians dan sisihan piawai bagi suatu taburan binomial.', 'Taburan Binomial', 'Taburan Kebarangkalian'),
          makeBmSp('5.2.5', 'Menyelesaikan masalah yang melibatkan taburan binomial.', 'Taburan Binomial', 'Taburan Kebarangkalian'),
        ],
      },
      {
        kod: '5.3',
        tajuk: 'Taburan Normal',
        spList: [
          makeBmSp('5.3.1', 'Menyiasat dan menerangkan ciri-ciri graf taburan normal.', 'Taburan Normal', 'Taburan Kebarangkalian'),
          makeBmSp('5.3.2', 'Menerangkan maksud taburan normal piawai.', 'Taburan Normal', 'Taburan Kebarangkalian'),
          makeBmSp('5.3.3', 'Menentukan dan mentafsir skor piawai, Z.', 'Taburan Normal', 'Taburan Kebarangkalian'),
          makeBmSp('5.3.4', 'Menentukan kebarangkalian suatu peristiwa bagi taburan normal.', 'Taburan Normal', 'Taburan Kebarangkalian'),
          makeBmSp('5.3.5', 'Menyelesaikan masalah yang melibatkan taburan normal.', 'Taburan Normal', 'Taburan Kebarangkalian'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B6',
    tingkatan: 'Tingkatan 5',
    nomborBab: 6,
    tema: 'Trigonometri',
    tajuk: 'Fungsi Trigonometri',
    peneranganRingkas: 'Bab 6 Matematik Tambahan Tingkatan 5: Fungsi Trigonometri (Trigonometri)',
    skList: [
      {
        kod: '6.1',
        tajuk: 'Sudut Positif dan Sudut Negatif',
        spList: [
          makeBmSp('6.1.1', 'Mewakilkan sudut positif dan sudut negatif dalam satah Cartes.', 'Sudut Positif dan Sudut Negatif', 'Fungsi Trigonometri'),
        ],
      },
      {
        kod: '6.2',
        tajuk: 'Nisbah Trigonometri bagi Sebarang Sudut',
        spList: [
          makeBmSp('6.2.1', 'Membuat perkaitan antara sekan, kosekan dan kotangen dengan sinus, kosinus dan tangen bagi sebarang sudut dalam satah Cartes.', 'Nisbah Trigonometri bagi Sebarang Sudut', 'Fungsi Trigonometri'),
          makeBmSp('6.2.2', 'Menentukan nilai nisbah trigonometri bagi sebarang sudut.', 'Nisbah Trigonometri bagi Sebarang Sudut', 'Fungsi Trigonometri'),
        ],
      },
      {
        kod: '6.3',
        tajuk: 'Graf Fungsi Sinus, Kosinus dan Tangen',
        spList: [
          makeBmSp('6.3.1', 'Melukis dan melakar graf fungsi trigonometri: (i) y = a sin bx + c (ii) y = a kos bx + c (iii) y = a tan bx + c dengan a, b dan c ialah pemalar dan b >.', 'Graf Fungsi Sinus, Kosinus dan Tangen', 'Fungsi Trigonometri'),
          makeBmSp('6.3.2', 'Menyelesaikan persamaan trigonometri dengan kaedah graf.', 'Graf Fungsi Sinus, Kosinus dan Tangen', 'Fungsi Trigonometri'),
        ],
      },
      {
        kod: '6.4',
        tajuk: 'Identiti Asas',
        spList: [
          makeBmSp('6.4.1', 'Menerbitkan identiti asas: (i) sin2 𝐴 + kos2 𝐴 = 1 (ii) 1 + tan2 𝐴 =sek2 𝐴 (iii) 1+ kot2 𝐴 = kosek2 𝐴.', 'Identiti Asas', 'Fungsi Trigonometri'),
          makeBmSp('6.4.2', 'Membuktikan identiti trigonometri menggunakan identiti asas.', 'Identiti Asas', 'Fungsi Trigonometri'),
        ],
      },
      {
        kod: '6.5',
        tajuk: 'Rumus Sudut Majmuk dan Rumus Sudut Berganda',
        spList: [
          makeBmSp('6.5.1', 'Membuktikan identiti trigonometri dengan menggunakan rumus sudut majmuk bagi sin (A  B), kos (A  B) dan tan (A  B).', 'Rumus Sudut Majmuk dan Rumus Sudut Berganda', 'Fungsi Trigonometri'),
          makeBmSp('6.5.2', 'Menerbitkan rumus sudut berganda bagi sin 2𝐴, kos2𝐴 dan tan.', 'Rumus Sudut Majmuk dan Rumus Sudut Berganda', 'Fungsi Trigonometri'),
          makeBmSp('6.5.3', 'Membuktikan identiti trigonometri dengan menggunakan rumus sudut berganda.', 'Rumus Sudut Majmuk dan Rumus Sudut Berganda', 'Fungsi Trigonometri'),
        ],
      },
      {
        kod: '6.6',
        tajuk: 'Aplikasi Fungsi Trigonometri',
        spList: [
          makeBmSp('6.6.1', 'Menyelesaikan persamaan trigonometri.', 'Aplikasi Fungsi Trigonometri', 'Fungsi Trigonometri'),
          makeBmSp('6.6.2', 'Menyelesaikan masalah yang melibatkan fungsi trigonometri.', 'Aplikasi Fungsi Trigonometri', 'Fungsi Trigonometri'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B7',
    tingkatan: 'Tingkatan 5',
    nomborBab: 7,
    tema: 'Aplikasi Sains dan Teknologi',
    tajuk: 'Pengaturcaraan Linear',
    peneranganRingkas: 'Bab 7 Matematik Tambahan Tingkatan 5: Pengaturcaraan Linear (Aplikasi Sains dan Teknologi)',
    skList: [
      {
        kod: '7.1',
        tajuk: 'Model Pengaturcaraan Linear',
        spList: [
          makeBmSp('7.1.1', 'Membentuk model matematik bagi suatu seterusnya mewakilkan model tersebut secara grafik.', 'Model Pengaturcaraan Linear', 'Pengaturcaraan Linear'),
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Aplikasi Pengaturcaraan Linear',
        spList: [
          makeBmSp('7.2.1', 'Menyelesaikan masalah yang melibatkan pengaturcaraan linear secara graf.', 'Aplikasi Pengaturcaraan Linear', 'Pengaturcaraan Linear'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B8',
    tingkatan: 'Tingkatan 5',
    nomborBab: 8,
    tema: 'Aplikasi Sains dan Teknologi',
    tajuk: 'Kinematik Gerakan Linear',
    peneranganRingkas: 'Bab 8 Matematik Tambahan Tingkatan 5: Kinematik Gerakan Linear (Aplikasi Sains dan Teknologi)',
    skList: [
      {
        kod: '8.1',
        tajuk: 'Sesaran, Halaju dan Pecutan',
        spList: [
          makeBmSp('8.1.1', 'Memerihalkan dan menentukan pecutan seketika suatu zarah.', 'Sesaran, Halaju dan Pecutan', 'Kinematik Gerakan Linear'),
          makeBmSp('8.1.2', 'Menentukan jumlah jarak yang dilalui oleh suatu zarah dalam suatu tempoh masa tertentu.', 'Sesaran, Halaju dan Pecutan', 'Kinematik Gerakan Linear'),
        ],
      },
      {
        kod: '8.2',
        tajuk: 'Pembezaan dalam Kinematik Gerakan Linear',
        spList: [
          makeBmSp('8.2.1', 'Menghubung kait antara fungsi sesaran, fungsi halaju dan fungsi pecutan.', 'Pembezaan dalam Kinematik Gerakan Linear', 'Kinematik Gerakan Linear'),
          makeBmSp('8.2.2', 'Menentukan dan mentafsir halaju seketika suatu zarah daripada fungsi sesaran.', 'Pembezaan dalam Kinematik Gerakan Linear', 'Kinematik Gerakan Linear'),
          makeBmSp('8.2.3', 'Menentukan dan mentafsir pecutan seketika suatu zarah daripada fungsi halaju dan fungsi sesaran.', 'Pembezaan dalam Kinematik Gerakan Linear', 'Kinematik Gerakan Linear'),
        ],
      },
      {
        kod: '8.3',
        tajuk: 'Pengamiran dalam Kinematik Gerakan Linear',
        spList: [
          makeBmSp('8.3.1', 'Menentukan dan mentafsir halaju seketika suatu zarah daripada fungsi pecutan.', 'Pengamiran dalam Kinematik Gerakan Linear', 'Kinematik Gerakan Linear'),
          makeBmSp('8.3.2', 'Menentukan dan mentafsir sesaran seketika suatu zarah daripada fungsi halaju dan fungsi pecutan.', 'Pengamiran dalam Kinematik Gerakan Linear', 'Kinematik Gerakan Linear'),
        ],
      },
      {
        kod: '8.4',
        tajuk: 'Aplikasi Kinematik Gerakan Linear',
        spList: [
          makeBmSp('8.4.1', 'Menyelesaikan masalah kinematik gerakan linear yang melibatkan pembezaan dan pengamiran.', 'Aplikasi Kinematik Gerakan Linear', 'Kinematik Gerakan Linear'),
        ],
      },
    ],
  },
];
