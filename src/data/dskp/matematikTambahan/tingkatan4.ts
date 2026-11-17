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

export const DSKP_ADDMATH_F4: BabKimia[] = [
  {
    id: 'AM_F4_B1',
    tingkatan: 'Tingkatan 4',
    nomborBab: 1,
    tema: 'Algebra',
    tajuk: 'Fungsi',
    peneranganRingkas: 'Bab 1 Matematik Tambahan Tingkatan 4: Fungsi (Algebra)',
    skList: [
      {
        kod: '1.1',
        tajuk: 'Fungsi',
        spList: [
          makeBmSp('1.1.1', 'Menerangkan fungsi menggunakan.', 'Fungsi', 'Fungsi'),
          makeBmSp('1.1.2', 'Menentukan domain dan julat bagi suatu fungsi.', 'Fungsi', 'Fungsi'),
          makeBmSp('1.1.3', 'Menentukan imej suatu fungsi apabila objek diberi dan sebaliknya.', 'Fungsi', 'Fungsi'),
        ],
      },
      {
        kod: '1.2',
        tajuk: 'Fungsi Gubahan',
        spList: [
          makeBmSp('1.2.1', 'Memerihalkan hasil gubahan dua fungsi.', 'Fungsi Gubahan', 'Fungsi'),
          makeBmSp('1.2.2', 'Menentukan fungsi gubahan.', 'Fungsi Gubahan', 'Fungsi'),
          makeBmSp('1.2.3', 'Menentukan imej suatu fungsi gubahan apabila objek diberi dan sebaliknya.', 'Fungsi Gubahan', 'Fungsi'),
          makeBmSp('1.2.4', 'Menentukan suatu fungsi berkaitan apabila fungsi gubahan dan salah satu fungsinya diberi.', 'Fungsi Gubahan', 'Fungsi'),
          makeBmSp('1.2.5', 'Menyelesaikan masalah yang melibatkan fungsi gubahan.', 'Fungsi Gubahan', 'Fungsi'),
        ],
      },
      {
        kod: '1.3',
        tajuk: 'Fungsi Songsang',
        spList: [
          makeBmSp('1.3.1', 'Memerihalkan songsangan suatu fungsi.', 'Fungsi Songsang', 'Fungsi'),
          makeBmSp('1.3.2', 'Membuat dan mengesahkan konjektur berkaitan sifat-sifat fungsi songsang.', 'Fungsi Songsang', 'Fungsi'),
          makeBmSp('1.3.3', 'Menentukan fungsi songsang.', 'Fungsi Songsang', 'Fungsi'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B2',
    tingkatan: 'Tingkatan 4',
    nomborBab: 2,
    tema: 'Algebra',
    tajuk: 'Fungsi Kuadratik',
    peneranganRingkas: 'Bab 2 Matematik Tambahan Tingkatan 4: Fungsi Kuadratik (Algebra)',
    skList: [
      {
        kod: '2.1',
        tajuk: 'Persamaan dan Ketaksamaan Kuadratik',
        spList: [
          makeBmSp('2.1.1', 'Menyelesaikan persamaan kuadratik menggunakan kaedah penyempurnaan kuasa dua dan rumus.', 'Persamaan dan Ketaksamaan Kuadratik', 'Fungsi Kuadratik'),
          makeBmSp('2.1.2', 'Membentuk persamaan kuadratik daripada punca-punca yang diberi.', 'Persamaan dan Ketaksamaan Kuadratik', 'Fungsi Kuadratik'),
          makeBmSp('2.1.3', 'Menyelesaikan ketaksamaan kuadratik.', 'Persamaan dan Ketaksamaan Kuadratik', 'Fungsi Kuadratik'),
        ],
      },
      {
        kod: '2.2',
        tajuk: 'Jenis-jenis Punca Persamaan Kuadratik',
        spList: [
          makeBmSp('2.2.1', 'Membuat perkaitan antara jenis-jenis punca persamaan kuadratik dan nilai pembezalayan.', 'Jenis-jenis Punca Persamaan Kuadratik', 'Fungsi Kuadratik'),
          makeBmSp('2.2.2', 'Menyelesaikan masalah yang melibatkan jenis-jenis punca dalam persamaan kuadratik.', 'Jenis-jenis Punca Persamaan Kuadratik', 'Fungsi Kuadratik'),
        ],
      },
      {
        kod: '2.3',
        tajuk: 'Fungsi Kuadratik',
        spList: [
          makeBmSp('2.3.1', 'Menganalisis dan membuat generalisasi tentang kesan perubahan terhadap bentuk dan kedudukan graf.', 'Fungsi Kuadratik', 'Fungsi Kuadratik'),
          makeBmSp('2.3.2', 'Menghubungkaitkan kedudukan graf fungsi kuadratik dengan jenis punca.', 'Fungsi Kuadratik', 'Fungsi Kuadratik'),
          makeBmSp('2.3.3', 'Membuat perkaitan antara bentuk verteks fungsi kuadratik, bentuk fungsi kuadratik yang lain.', 'Fungsi Kuadratik', 'Fungsi Kuadratik'),
          makeBmSp('2.3.4', 'Menganalisis dan membuat generalisasi tentang kesan perubahan fungsi kuadratik terhadap bentuk dan kedudukan graf.', 'Fungsi Kuadratik', 'Fungsi Kuadratik'),
          makeBmSp('2.3.5', 'Melakar graf fungsi kuadratik.', 'Fungsi Kuadratik', 'Fungsi Kuadratik'),
          makeBmSp('2.3.6', 'Menyelesaikan masalah yang melibatkan fungsi kuadratik.', 'Fungsi Kuadratik', 'Fungsi Kuadratik'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B3',
    tingkatan: 'Tingkatan 4',
    nomborBab: 3,
    tema: 'Algebra',
    tajuk: 'Sistem Persamaan',
    peneranganRingkas: 'Bab 3 Matematik Tambahan Tingkatan 4: Sistem Persamaan (Algebra)',
    skList: [
      {
        kod: '3.1',
        tajuk: 'Sistem Persamaan Linear dalam Tiga Pemboleh Ubah',
        spList: [
          makeBmSp('3.1.1', 'Memerihalkan sistem persamaan linear.', 'Sistem Persamaan Linear dalam Tiga Pemboleh Ubah', 'Sistem Persamaan'),
          makeBmSp('3.1.2', 'Menyelesaikan sistem persamaan linear dalam tiga pembolehubah.', 'Sistem Persamaan Linear dalam Tiga Pemboleh Ubah', 'Sistem Persamaan'),
          makeBmSp('3.1.3', 'Menyelesaikan masalah yang melibatkan sistem persamaan linear dalam tiga pemboleh ubah.', 'Sistem Persamaan Linear dalam Tiga Pemboleh Ubah', 'Sistem Persamaan'),
        ],
      },
      {
        kod: '3.2',
        tajuk: 'Persamaan Serentak yang Melibatkan Satu Persamaan Linear dan Satu Persamaan Tak Linear',
        spList: [
          makeBmSp('3.2.1', 'Menyelesaikan persamaan serentak yang n persamaan tak linear.', 'Persamaan Serentak yang Melibatkan Satu Persamaan Linear dan Satu Persamaan Tak Linear', 'Sistem Persamaan'),
          makeBmSp('3.2.2', 'Menyelesaikan masalah yang melibatkan persamaan serentak; satu persamaan linear dan satu persamaan tak linear.', 'Persamaan Serentak yang Melibatkan Satu Persamaan Linear dan Satu Persamaan Tak Linear', 'Sistem Persamaan'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B4',
    tingkatan: 'Tingkatan 4',
    nomborBab: 4,
    tema: 'Algebra',
    tajuk: 'Indeks, Surd dan Logaritma',
    peneranganRingkas: 'Bab 4 Matematik Tambahan Tingkatan 4: Indeks, Surd dan Logaritma (Algebra)',
    skList: [
      {
        kod: '4.1',
        tajuk: 'Hukum Indeks',
        spList: [
          makeBmSp('4.1.1', 'Mempermudahkan ungkapan algebra yang melibatkan indeks dengan menggunakan hukum indeks.', 'Hukum Indeks', 'Indeks, Surd dan Logaritma'),
          makeBmSp('4.1.2', 'Menyelesaikan masalah yang melibatkan indeks.', 'Hukum Indeks', 'Indeks, Surd dan Logaritma'),
        ],
      },
      {
        kod: '4.2',
        tajuk: 'Hukum Surd',
        spList: [
          makeBmSp('4.2.1', 'Membanding beza nombor nisbah dan nombor tak nisbah, dan seterusnya menghubungkaitkan surd dengan nombor tak nisbah.', 'Hukum Surd', 'Indeks, Surd dan Logaritma'),
          makeBmSp('4.2.2', 'Membuat dan mengesahkan konjektur tentang (i) (ii) dan seterusnya membuat generalisasi.', 'Hukum Surd', 'Indeks, Surd dan Logaritma'),
          makeBmSp('4.2.3', 'Mempermudahkan ungkapan yang melibatkan surd.', 'Hukum Surd', 'Indeks, Surd dan Logaritma'),
          makeBmSp('4.2.4', 'Mempermudahkan ungkapan yang melibatkan surd dengan menisbahkan penyebut.', 'Hukum Surd', 'Indeks, Surd dan Logaritma'),
          makeBmSp('4.2.5', 'Menyelesaikan masalah yang melibatkan surd.', 'Hukum Surd', 'Indeks, Surd dan Logaritma'),
        ],
      },
      {
        kod: '4.3',
        tajuk: 'Hukum Logaritma',
        spList: [
          makeBmSp('4.3.1', 'Menghubungkaitkan persamaan dalam bentuk indeks dengan bentuk logaritma, dan seterusnya menentukan nilai logaritma sesuatu nombor.', 'Hukum Logaritma', 'Indeks, Surd dan Logaritma'),
          makeBmSp('4.3.2', 'Membuktikan hukum logaritma.', 'Hukum Logaritma', 'Indeks, Surd dan Logaritma'),
          makeBmSp('4.3.3', 'Mempermudah ungkapan algebra dengan menggunakan hukum logaritma.', 'Hukum Logaritma', 'Indeks, Surd dan Logaritma'),
          makeBmSp('4.3.4', 'Membuktikan menggunakan hubungan tersebut untuk menentukan logaritma suatu nombor.', 'Hukum Logaritma', 'Indeks, Surd dan Logaritma'),
          makeBmSp('4.3.5', 'Menyelesaikan masalah yang melibatkan hukum logaritma.', 'Hukum Logaritma', 'Indeks, Surd dan Logaritma'),
        ],
      },
      {
        kod: '4.4',
        tajuk: 'Aplikasi Indeks, Surd dan Logaritma',
        spList: [
          makeBmSp('4.4.1', 'Menyelesaikan masalah yang melibatkan indeks, surd dan logaritma.', 'Aplikasi Indeks, Surd dan Logaritma', 'Indeks, Surd dan Logaritma'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B5',
    tingkatan: 'Tingkatan 4',
    nomborBab: 5,
    tema: 'Algebra',
    tajuk: 'Janjang',
    peneranganRingkas: 'Bab 5 Matematik Tambahan Tingkatan 4: Janjang (Algebra)',
    skList: [
      {
        kod: '5.1',
        tajuk: 'Janjang Aritmetik',
        spList: [
          makeBmSp('5.1.1', 'Mengenal pasti suatu jujukan ialah janjang.', 'Janjang Aritmetik', 'Janjang'),
          makeBmSp('5.1.2', 'Menerbitkan rumus sebutan ke-n, Tn, bagi janjang aritmetik, dan seterusnya menggunakan rumus tersebut dalam pelbagai situasi.', 'Janjang Aritmetik', 'Janjang'),
          makeBmSp('5.1.3', 'Menerbitkan rumus hasil tambah pertama, Sn, bagi janjang aritmetik, dan seterusnya menggunakan rumus tersebut dalam pelbagai situasi.', 'Janjang Aritmetik', 'Janjang'),
          makeBmSp('5.1.4', 'Menyelesaikan masalah yang melibatkan janjang aritmetik.', 'Janjang Aritmetik', 'Janjang'),
        ],
      },
      {
        kod: '5.2',
        tajuk: 'Janjang Geometri',
        spList: [
          makeBmSp('5.2.1', 'Mengenal pasti suatu jujukan ialah janjang geometri dan memberi justifikasi.', 'Janjang Geometri', 'Janjang'),
          makeBmSp('5.2.2', 'Menerbitkan rumus sebutan ke-n, Tn, bagi janjang geometri, dan seterusnya menggunakan rumus tersebut dalam pelbagai situasi.', 'Janjang Geometri', 'Janjang'),
          makeBmSp('5.2.3', 'Menerbitkan rumus hasil tambah pertama, Sn, bagi janjang geometri, dan seterusnya menggunakan rumus tersebut dalam pelbagai situasi.', 'Janjang Geometri', 'Janjang'),
          makeBmSp('5.2.4', 'Menentukan hasil tambah hingga ketakterhinggaan bagi janjang geometri, dan seterusnya menggunakan tambah ketakterhinggaan dalam pelbagai situasi.', 'Janjang Geometri', 'Janjang'),
          makeBmSp('5.2.5', 'Menyelesaikan masalah yang melibatkan janjang geometri.', 'Janjang Geometri', 'Janjang'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B6',
    tingkatan: 'Tingkatan 4',
    nomborBab: 6,
    tema: 'Geometri',
    tajuk: 'Hukum Linear',
    peneranganRingkas: 'Bab 6 Matematik Tambahan Tingkatan 4: Hukum Linear (Geometri)',
    skList: [
      {
        kod: '6.1',
        tajuk: 'Hubungan Linear dan Tak Linear',
        spList: [
          makeBmSp('6.1.1', 'Membezakan hubungan linear dan tak linear berdasarkan jadual data dan graf.', 'Hubungan Linear dan Tak Linear', 'Hukum Linear'),
          makeBmSp('6.1.2', 'Melukis garis lurus penyuaian terbaik bagi graf hubungan linear tanpa dan dengan menggunakan teknologi digital.', 'Hubungan Linear dan Tak Linear', 'Hukum Linear'),
          makeBmSp('6.1.3', 'Membentuk persamaan bagi garis lurus penyuaian terbaik.', 'Hubungan Linear dan Tak Linear', 'Hukum Linear'),
          makeBmSp('6.1.4', 'Mentafsir maklumat berdasarkan garis lurus penyuaian terbaik.', 'Hubungan Linear dan Tak Linear', 'Hukum Linear'),
        ],
      },
      {
        kod: '6.2',
        tajuk: 'Hukum Linear dan Hubungan Tak Linear',
        spList: [
          makeBmSp('6.2.1', 'Mengaplikasikan hukum linear kepada hubungan tak linear.', 'Hukum Linear dan Hubungan Tak Linear', 'Hukum Linear'),
        ],
      },
      {
        kod: '6.3',
        tajuk: 'Aplikasi Hukum Linear',
        spList: [
          makeBmSp('6.3.1', 'Menyelesaikan masalah yang melibatkan hukum linear.', 'Aplikasi Hukum Linear', 'Hukum Linear'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B7',
    tingkatan: 'Tingkatan 4',
    nomborBab: 7,
    tema: 'Geometri',
    tajuk: 'Geometri Koordinat',
    peneranganRingkas: 'Bab 7 Matematik Tambahan Tingkatan 4: Geometri Koordinat (Geometri)',
    skList: [
      {
        kod: '7.1',
        tajuk: 'Pembahagi Tembereng Garis',
        spList: [
          makeBmSp('7.1.1', 'Membuat perkaitan antara kedudukan titik yang membahagikan sesuatu tembereng garis dengan nisbah yang berkaitan.', 'Pembahagi Tembereng Garis', 'Geometri Koordinat'),
          makeBmSp('7.1.2', 'Menerbitkan rumus pembahagi tembereng garis pada satah Cartes dan seterusnya menggunakan rumus tersebut dalam pelbagai situasi.', 'Pembahagi Tembereng Garis', 'Geometri Koordinat'),
          makeBmSp('7.1.3', 'Menyelesaikan masalah yang melibatkan pembahagi tembereng garis.', 'Pembahagi Tembereng Garis', 'Geometri Koordinat'),
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Garis Lurus Selari dan Garis Lurus Serenjang',
        spList: [
          makeBmSp('7.2.1', 'Membuat dan mengesahkan konjektur tentang kecerunan bagi: (i) garis lurus selari, (ii) garis lurus serenjang dan seterusnya membuat generalisasi.', 'Garis Lurus Selari dan Garis Lurus Serenjang', 'Geometri Koordinat'),
          makeBmSp('7.2.2', 'Menyelesaikan masalah yang melibatkan persamaan garis lurus selari dan persamaan garis lurus serenjang.', 'Garis Lurus Selari dan Garis Lurus Serenjang', 'Geometri Koordinat'),
        ],
      },
      {
        kod: '7.3',
        tajuk: 'Luas Poligon',
        spList: [
          makeBmSp('7.3.1', 'Menerbitkan rumus luas segi tiga apabila koordinat setiap bucu diketahui.', 'Luas Poligon', 'Geometri Koordinat'),
          makeBmSp('7.3.2', 'Menentukan luas segi tiga dengan menggunakan rumus.', 'Luas Poligon', 'Geometri Koordinat'),
          makeBmSp('7.3.3', 'Menentukan luas sisi empat dengan menggunakan rumus.', 'Luas Poligon', 'Geometri Koordinat'),
          makeBmSp('7.3.4', 'Membuat generalisasi tentang rumus luas poligon apabila koordinat setiap bucu diketahui dan seterusnya menggunakan rumus tersebut untuk menentukan luas poligon.', 'Luas Poligon', 'Geometri Koordinat'),
          makeBmSp('7.3.5', 'Menyelesaikan masalah yang melibatkan luas poligon.', 'Luas Poligon', 'Geometri Koordinat'),
        ],
      },
      {
        kod: '7.4',
        tajuk: 'Persamaan Lokus',
        spList: [
          makeBmSp('7.4.1', 'Mewakilkan secara grafik, memenuhi syarat (i) jarak titik yang bergerak dari suatu titik tetap adalah malar (ii) nisbah jarak titik yang bergerak dari dua titik tetap adalah malar dan seterusnya lokus tersebut.', 'Persamaan Lokus', 'Geometri Koordinat'),
          makeBmSp('7.4.2', 'Menyelesaikan masalah yang melibatkan persamaan.', 'Persamaan Lokus', 'Geometri Koordinat'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B8',
    tingkatan: 'Tingkatan 4',
    nomborBab: 8,
    tema: 'Geometri',
    tajuk: 'Vektor',
    peneranganRingkas: 'Bab 8 Matematik Tambahan Tingkatan 4: Vektor (Geometri)',
    skList: [
      {
        kod: '8.1',
        tajuk: 'Vektor',
        spList: [
          makeBmSp('8.1.1', 'Membanding beza antara vektor dan skalar, dan seterusnya mengenal pasti sama ada suatu kuantiti ialah kuantiti vektor atau skalar dengan memberikan justifikasi.', 'Vektor', 'Vektor'),
          makeBmSp('8.1.2', 'Mewakilkan vektor menggunakan tembereng garis berarah dan tata tanda vektor serta menentukan magnitud dan arah vektor.', 'Vektor', 'Vektor'),
          makeBmSp('8.1.3', 'Membuat dan mengesahkan konjektur tentang sifat-sifat pendaraban vektor dengan skalar.', 'Vektor', 'Vektor'),
          makeBmSp('8.1.4', 'Membuat dan mengesahkan konjektur tentang vektor selari.', 'Vektor', 'Vektor'),
        ],
      },
      {
        kod: '8.2',
        tajuk: 'Penambahan dan Penolakan Vektor',
        spList: [
          makeBmSp('8.2.1', 'Membuat penambahan dan penolakan yang melibatkan dua atau lebih vektor bagi menghasilkan vektor paduan.', 'Penambahan dan Penolakan Vektor', 'Vektor'),
          makeBmSp('8.2.2', 'Menyelesaikan masalah yang melibatkan vektor.', 'Penambahan dan Penolakan Vektor', 'Vektor'),
        ],
      },
      {
        kod: '8.3',
        tajuk: 'Vektor dalam Satah Cartes',
        spList: [
          makeBmSp('8.3.1', 'Mewakilkan vektor dan menentukan magnitud vektor dalam satah Cartes.', 'Vektor dalam Satah Cartes', 'Vektor'),
          makeBmSp('8.3.2', 'Memerihal dan menentukan vektor unit dalam arah suatu vektor.', 'Vektor dalam Satah Cartes', 'Vektor'),
          makeBmSp('8.3.3', 'Melaksanakan operasi aritmetik ke atas dua atau lebih vektor.', 'Vektor dalam Satah Cartes', 'Vektor'),
          makeBmSp('8.3.4', 'Menyelesaikan masalah yang melibatkan vektor.', 'Vektor dalam Satah Cartes', 'Vektor'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B9',
    tingkatan: 'Tingkatan 4',
    nomborBab: 9,
    tema: 'Trigonometri',
    tajuk: 'Penyelesaian Segi Tiga',
    peneranganRingkas: 'Bab 9 Matematik Tambahan Tingkatan 4: Penyelesaian Segi Tiga (Trigonometri)',
    skList: [
      {
        kod: '9.1',
        tajuk: 'Petua Sinus',
        spList: [
          makeBmSp('9.1.1', 'Membuat dan mengesahkan konjektur sisi-sisi suatu segi tiga dengan sinus sudut- mentakrifkan petua sinus.', 'Petua Sinus', 'Penyelesaian Segi Tiga'),
          makeBmSp('9.1.2', 'Menyelesaikan segi tiga yang melibatkan petua sinus.', 'Petua Sinus', 'Penyelesaian Segi Tiga'),
          makeBmSp('9.1.3', 'Menentukan kewujudan kes berambiguiti suatu segi tiga dan seterusnya mengenal pasti syarat-syarat kewujudan kes tersebut.', 'Petua Sinus', 'Penyelesaian Segi Tiga'),
          makeBmSp('9.1.4', 'Menyelesaikan segi tiga yang melibatkan kes berambiguiti.', 'Petua Sinus', 'Penyelesaian Segi Tiga'),
          makeBmSp('9.1.5', 'Menyelesaikan masalah berkaitan segi tiga menggunakan petua sinus.', 'Petua Sinus', 'Penyelesaian Segi Tiga'),
        ],
      },
      {
        kod: '9.2',
        tajuk: 'Petua Kosinus',
        spList: [
          makeBmSp('9.2.1', 'Mentahkikkan petua kosinus.', 'Petua Kosinus', 'Penyelesaian Segi Tiga'),
          makeBmSp('9.2.2', 'Menyelesaikan segi tiga yang melibatkan petua kosinus.', 'Petua Kosinus', 'Penyelesaian Segi Tiga'),
          makeBmSp('9.2.3', 'Menyelesaikan masalah yang melibatkan petua kosinus.', 'Petua Kosinus', 'Penyelesaian Segi Tiga'),
        ],
      },
      {
        kod: '9.3',
        tajuk: 'Luas Segi Tiga',
        spList: [
          makeBmSp('9.3.1', 'Menerbitkan rumus luas segi tiga, dan seterusnya menentukan luas segi tiga.', 'Luas Segi Tiga', 'Penyelesaian Segi Tiga'),
          makeBmSp('9.3.2', 'Menentukan luas segi tiga menggunakan rumus Heron.', 'Luas Segi Tiga', 'Penyelesaian Segi Tiga'),
          makeBmSp('9.3.3', 'Menyelesaikan masalah yang melibatkan luas segi tiga.', 'Luas Segi Tiga', 'Penyelesaian Segi Tiga'),
        ],
      },
      {
        kod: '9.4',
        tajuk: 'Aplikasi Petua Sinus, Petua Kosinus dan Luas Segi Tiga',
        spList: [
          makeBmSp('9.4.1', 'Menyelesaikan masalah yang melibatkan segi tiga.', 'Aplikasi Petua Sinus, Petua Kosinus dan Luas Segi Tiga', 'Penyelesaian Segi Tiga'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B10',
    tingkatan: 'Tingkatan 4',
    nomborBab: 10,
    tema: 'Statistik',
    tajuk: 'Nombor Indeks',
    peneranganRingkas: 'Bab 10 Matematik Tambahan Tingkatan 4: Nombor Indeks (Statistik)',
    skList: [
      {
        kod: '10.1',
        tajuk: 'Nombor Indeks',
        spList: [
          makeBmSp('10.1.1', 'Mentakrifkan nombor indeks dan.', 'Nombor Indeks', 'Nombor Indeks'),
          makeBmSp('10.1.2', 'Menentukan dan mentafsir nombor indeks.', 'Nombor Indeks', 'Nombor Indeks'),
          makeBmSp('10.1.3', 'Menyelesaikan masalah yang melibatkan nombor indeks.', 'Nombor Indeks', 'Nombor Indeks'),
        ],
      },
      {
        kod: '10.2',
        tajuk: 'Indeks Gubahan',
        spList: [
          makeBmSp('10.2.1', 'Menentukan dan mentafsir indeks gubahan tanpa pemberat dan dengan pemberat.', 'Indeks Gubahan', 'Nombor Indeks'),
          makeBmSp('10.2.2', 'Menyelesaikan masalah yang melibatkan nombor indeks dan indeks gubahan.', 'Indeks Gubahan', 'Nombor Indeks'),
        ],
      },
    ],
  },
];
