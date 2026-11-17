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

export const DSKP_MATEMATIK_F2: BabMatematik[] = [
  {
    id: 'M_F2_B1',
    tingkatan: 'Tingkatan 2',
    nomborBab: 1,
    tema: 'Nombor dan Operasi',
    tajuk: 'Pola dan Jujukan',
    peneranganRingkas: 'Bab 1 Matematik Tingkatan 2: Pola dan Jujukan (Nombor dan Operasi)',
    skList: [
      {
        kod: '1.1',
        tajuk: 'Pola',
        spList: [
          makeBmSp('1.1.1', 'Mengenal dan memerihalkan pola pelbagai set nombor dan objek dalam kehidupan sebenar, dan seterusnya membuat rumusan tentang pola.', 'Pola', 'Pola dan Jujukan'),
        ],
      },
      {
        kod: '1.2',
        tajuk: 'Jujukan',
        spList: [
          makeBmSp('1.2.1', 'Menerangkan maksud jujukan.', 'Jujukan', 'Pola dan Jujukan'),
          makeBmSp('1.2.2', 'Mengenal pasti dan memerihalkan pola suatu jujukan, dan seterusnya melengkapkan dan melanjutkan jujukan tersebut.', 'Jujukan', 'Pola dan Jujukan'),
        ],
      },
      {
        kod: '1.3',
        tajuk: 'Pola dan Jujukan',
        spList: [
          makeBmSp('1.3.1', 'Membuat generalisasi tentang pola suatu jujukan menggunakan nombor, perkataan dan ungkapan algebra.', 'Pola dan Jujukan', 'Pola dan Jujukan'),
          makeBmSp('1.3.2', 'Menentukan sebutan tertentu bagi suatu jujukan.', 'Pola dan Jujukan', 'Pola dan Jujukan'),
          makeBmSp('1.3.3', 'Menyelesaikan masalah yang melibatkan jujukan.', 'Pola dan Jujukan', 'Pola dan Jujukan'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B2',
    tingkatan: 'Tingkatan 2',
    nomborBab: 2,
    tema: 'Perkaitan dan Algebra',
    tajuk: 'Pemfaktoran dan Pecahan Algebra',
    peneranganRingkas: 'Bab 2 Matematik Tingkatan 2: Pemfaktoran dan Pecahan Algebra (Perkaitan dan Algebra)',
    skList: [
      {
        kod: '2.1',
        tajuk: 'Kembangan',
        spList: [
          makeBmSp('2.1.1', 'Menerangkan maksud kembangan dua ungkapan algebra.', 'Kembangan', 'Pemfaktoran dan Pecahan Algebra'),
          makeBmSp('2.1.2', 'Melaksanakan kembangan dua ungkapan algebra.', 'Kembangan', 'Pemfaktoran dan Pecahan Algebra'),
          makeBmSp('2.1.3', 'Mempermudahkan ungkapan algebra yang melibatkan gabungan operasi termasuk kembangan.', 'Kembangan', 'Pemfaktoran dan Pecahan Algebra'),
          makeBmSp('2.1.4', 'Menyelesaikan masalah yang melibatkan kembangan dua ungkapan algebra.', 'Kembangan', 'Pemfaktoran dan Pecahan Algebra'),
        ],
      },
      {
        kod: '2.2',
        tajuk: 'Pemfaktoran',
        spList: [
          makeBmSp('2.2.1', 'Menghubungkaitkan pendaraban ungkapan algebra dengan konsep faktor dan pemfaktoran dan seterusnya menyenaraikan faktor bagi hasil darab ungkapan algebra tersebut.', 'Pemfaktoran', 'Pemfaktoran dan Pecahan Algebra'),
          makeBmSp('2.2.2', 'Memfaktorkan ungkapan algebra dengan pelbagai kaedah.', 'Pemfaktoran', 'Pemfaktoran dan Pecahan Algebra'),
          makeBmSp('2.2.3', 'Menyelesaikan masalah yang melibatkan pemfaktoran.', 'Pemfaktoran', 'Pemfaktoran dan Pecahan Algebra'),
        ],
      },
      {
        kod: '2.3',
        tajuk: 'Ungkapan Algebra dan Hukum Operasi Asas Aritmetik',
        spList: [
          makeBmSp('2.3.1', 'Melaksanakan penambahan dan penolakan ungkapan algebra yang melibatkan kembangan dan pemfaktoran. 36 RA.', 'Ungkapan Algebra dan Hukum Operasi Asas Aritmetik', 'Pemfaktoran dan Pecahan Algebra'),
          makeBmSp('2.3.2', 'Melaksanakan pendaraban dan pembahagian ungkapan algebra yang melibatkan kembangan dan pemfaktoran.', 'Ungkapan Algebra dan Hukum Operasi Asas Aritmetik', 'Pemfaktoran dan Pecahan Algebra'),
          makeBmSp('2.3.3', 'Melaksanakan gabungan operasi ungkapan algebra yang melibatkan kembangan dan pemfaktoran.', 'Ungkapan Algebra dan Hukum Operasi Asas Aritmetik', 'Pemfaktoran dan Pecahan Algebra'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B3',
    tingkatan: 'Tingkatan 2',
    nomborBab: 3,
    tema: 'Perkaitan dan Algebra',
    tajuk: 'Rumus Algebra',
    peneranganRingkas: 'Bab 3 Matematik Tingkatan 2: Rumus Algebra (Perkaitan dan Algebra)',
    skList: [
      {
        kod: '3.1',
        tajuk: 'Rumus Algebra',
        spList: [
          makeBmSp('3.1.1', 'Membentuk rumus berdasarkan suatu situasi.', 'Rumus Algebra', 'Rumus Algebra'),
          makeBmSp('3.1.2', 'Menukar perkara rumus bagi suatu persamaan algebra.', 'Rumus Algebra', 'Rumus Algebra'),
          makeBmSp('3.1.3', 'Menentukan nilai suatu pemboleh ubah apabila nilai pemboleh ubah lain diberi.', 'Rumus Algebra', 'Rumus Algebra'),
          makeBmSp('3.1.4', 'Menyelesaikan masalah yang melibatkan rumus.', 'Rumus Algebra', 'Rumus Algebra'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B4',
    tingkatan: 'Tingkatan 2',
    nomborBab: 4,
    tema: 'Sukatan dan Geometri',
    tajuk: 'Poligon',
    peneranganRingkas: 'Bab 4 Matematik Tingkatan 2: Poligon (Sukatan dan Geometri)',
    skList: [
      {
        kod: '4.1',
        tajuk: 'Poligon Sekata',
        spList: [
          makeBmSp('4.1.1', 'Menghuraikan sifat geometri poligon sekata menggunakan pelbagai perwakilan.', 'Poligon Sekata', 'Poligon'),
          makeBmSp('4.1.2', 'Membina poligon sekata menggunakan pelbagai kaedah dan menerangkan rasional langkah- langkah pembinaan.', 'Poligon Sekata', 'Poligon'),
        ],
      },
      {
        kod: '4.2',
        tajuk: 'Sudut Pedalaman dan Sudut Peluaran Poligon',
        spList: [
          makeBmSp('4.2.1', 'Menerbitkan rumus hasil tambah sudut pedalaman suatu poligon.', 'Sudut Pedalaman dan Sudut Peluaran Poligon', 'Poligon'),
          makeBmSp('4.2.2', 'Membuat dan mengesahkan konjektur tentang hasil tambah sudut peluaran poligon.', 'Sudut Pedalaman dan Sudut Peluaran Poligon', 'Poligon'),
          makeBmSp('4.2.3', 'Menentukan nilai sudut pedalaman, sudut peluaran dan bilangan sisi suatu poligon.', 'Sudut Pedalaman dan Sudut Peluaran Poligon', 'Poligon'),
          makeBmSp('4.2.4', 'Menyelesaikan masalah yang melibatkan poligon.', 'Sudut Pedalaman dan Sudut Peluaran Poligon', 'Poligon'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B5',
    tingkatan: 'Tingkatan 2',
    nomborBab: 5,
    tema: 'Sukatan dan Geometri',
    tajuk: 'Bulatan',
    peneranganRingkas: 'Bab 5 Matematik Tingkatan 2: Bulatan (Sukatan dan Geometri)',
    skList: [
      {
        kod: '5.1',
        tajuk: 'Sifat Bulatan',
        spList: [
          makeBmSp('5.1.1', 'Mengenal bahagian bulatan dan menerangkan sifat bulatan.', 'Sifat Bulatan', 'Bulatan'),
          makeBmSp('5.1.2', 'Membina suatu bulatan dan bahagian bulatan berdasarkan syarat yang diberi.', 'Sifat Bulatan', 'Bulatan'),
        ],
      },
      {
        kod: '5.2',
        tajuk: 'Sifat Simetri Perentas',
        spList: [
          makeBmSp('5.2.1', 'Menentusahkan dan menerangkan bahawa (i) diameter ialah paksi simetri bulatan; (ii) jejari yang berserenjang dengan perentas membahagi dua sama perentas itu dan sebaliknya; (iii) pembahagi dua sama serenjang dua perentas bertemu di pusat bulatan; (iv) perentas yang sama panjang menghasilkan lengkok yang sama panjang; dan (v) perentas yang sama panjang adalah sama jarak dari pusat bulatan dan sebaliknya.', 'Sifat Simetri Perentas', 'Bulatan'),
          makeBmSp('5.2.2', 'Menentukan pusat dan panjang jejari bagi suatu bulatan melalui pembinaan geometri.', 'Sifat Simetri Perentas', 'Bulatan'),
          makeBmSp('5.2.3', 'Menyelesaikan masalah yang melibatkan sifat simetri perentas.', 'Sifat Simetri Perentas', 'Bulatan'),
        ],
      },
      {
        kod: '5.3',
        tajuk: 'Lilitan dan Luas Bulatan',
        spList: [
          makeBmSp('5.3.1', 'Menentukan hubungan antara lilitan dan diameter bulatan, dan seterusnya mentakrifkan π dan menerbitkan rumus lilitan bulatan.', 'Lilitan dan Luas Bulatan', 'Bulatan'),
          makeBmSp('5.3.2', 'Menerbitkan rumus luas bulatan.', 'Lilitan dan Luas Bulatan', 'Bulatan'),
          makeBmSp('5.3.3', 'Menentukan lilitan, luas bulatan, panjang lengkok, luas sektor dan ukuran lain yang berkaitan.', 'Lilitan dan Luas Bulatan', 'Bulatan'),
          makeBmSp('5.3.4', 'Menyelesaikan masalah yang melibatkan bulatan.', 'Lilitan dan Luas Bulatan', 'Bulatan'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B6',
    tingkatan: 'Tingkatan 2',
    nomborBab: 6,
    tema: 'Sukatan dan Geometri',
    tajuk: 'Bentuk Geometri Tiga Dimensi',
    peneranganRingkas: 'Bab 6 Matematik Tingkatan 2: Bentuk Geometri Tiga Dimensi (Sukatan dan Geometri)',
    skList: [
      {
        kod: '6.1',
        tajuk: 'Sifat Geometri Bentuk Tiga Dimensi',
        spList: [
          makeBmSp('6.1.1', 'Membanding, membeza dan mengklasifikasikan bentuk tiga dimensi termasuk prisma, piramid, silinder, kon dan sfera, dan seterusnya menghuraikan sifat geometri prisma, piramid, silinder, kon dan sfera.', 'Sifat Geometri Bentuk Tiga Dimensi', 'Bentuk Geometri Tiga Dimensi'),
        ],
      },
      {
        kod: '6.2',
        tajuk: 'Bentangan Bentuk Tiga Dimensi',
        spList: [
          makeBmSp('6.2.1', 'Menganalisis pelbagai bentangan termasuk piramid, prisma, silinder dan kon , dan sete melukis bentangan dan membina model.', 'Bentangan Bentuk Tiga Dimensi', 'Bentuk Geometri Tiga Dimensi'),
        ],
      },
      {
        kod: '6.3',
        tajuk: 'Luas Permukaan Bentuk Tiga Dimensi',
        spList: [
          makeBmSp('6.3.1', 'Menerbitkan rumus luas permukaan kubus, kuboid, piramid, prisma, silinder dan kon, dan seterusnya menentukan luas permukaan bentuk tersebut.', 'Luas Permukaan Bentuk Tiga Dimensi', 'Bentuk Geometri Tiga Dimensi'),
          makeBmSp('6.3.2', 'Menentukan luas permukaan sfera dengan menggunakan rumus.', 'Luas Permukaan Bentuk Tiga Dimensi', 'Bentuk Geometri Tiga Dimensi'),
          makeBmSp('6.3.3', 'Menyelesaikan masalah yang melibatkan luas permukaan bentuk tiga dimensi.', 'Luas Permukaan Bentuk Tiga Dimensi', 'Bentuk Geometri Tiga Dimensi'),
        ],
      },
      {
        kod: '6.4',
        tajuk: 'Isi padu Bentuk Tiga Dimensi',
        spList: [
          makeBmSp('6.4.1', 'Menerbitkan rumus isi padu prisma dan silinder, dan seterusnya membentuk rumus piramid dan kon.', 'Isi padu Bentuk Tiga Dimensi', 'Bentuk Geometri Tiga Dimensi'),
          makeBmSp('6.4.2', 'Menentukan isi padu prisma, silinder, kon, piramid dan sfera dengan menggunakan rumus.', 'Isi padu Bentuk Tiga Dimensi', 'Bentuk Geometri Tiga Dimensi'),
          makeBmSp('6.4.3', 'Menyelesaikan masalah yang melibatkan isi padu bentuk tiga dimensi.', 'Isi padu Bentuk Tiga Dimensi', 'Bentuk Geometri Tiga Dimensi'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B7',
    tingkatan: 'Tingkatan 2',
    nomborBab: 7,
    tema: 'Perkaitan dan Algebra',
    tajuk: 'Koordinat',
    peneranganRingkas: 'Bab 7 Matematik Tingkatan 2: Koordinat (Perkaitan dan Algebra)',
    skList: [
      {
        kod: '7.1',
        tajuk: 'Jarak dalam Sistem Koordinat Cartes',
        spList: [
          makeBmSp('7.1.1', 'Menerangkan maksud jarak antara dua titik pada satah Cartes.', 'Jarak dalam Sistem Koordinat Cartes', 'Koordinat'),
          makeBmSp('7.1.2', 'Menerbitkan rumus jarak antara dua titik pada satah Cartes.', 'Jarak dalam Sistem Koordinat Cartes', 'Koordinat'),
          makeBmSp('7.1.3', 'Menentukan jarak antara dua titik pada satah Cartes.', 'Jarak dalam Sistem Koordinat Cartes', 'Koordinat'),
          makeBmSp('7.1.4', 'Menyelesaikan masalah yang melibatkan jarak antara dua titik dalam sistem koordinat Cartes.', 'Jarak dalam Sistem Koordinat Cartes', 'Koordinat'),
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Titik Tengah dalam Sistem Koordinat Cartes',
        spList: [
          makeBmSp('7.2.1', 'Menerangkan maksud titik tengah antara dua titik pada satah Cartes.', 'Titik Tengah dalam Sistem Koordinat Cartes', 'Koordinat'),
          makeBmSp('7.2.2', 'Menerbitkan rumus titik tengah antara dua titik pada satah Cartes.', 'Titik Tengah dalam Sistem Koordinat Cartes', 'Koordinat'),
          makeBmSp('7.2.3', 'Menentukan koordinat titik tengah antara dua titik pada satah Cartes.', 'Titik Tengah dalam Sistem Koordinat Cartes', 'Koordinat'),
          makeBmSp('7.2.4', 'Menyelesaikan masalah yang melibatkan titik tengah dalam sistem koordinat Cartes.', 'Titik Tengah dalam Sistem Koordinat Cartes', 'Koordinat'),
        ],
      },
      {
        kod: '7.3',
        tajuk: 'Sistem Koordinat Cartes',
        spList: [
          makeBmSp('7.3.1', 'Menyelesaikan masalah yang melibatkan sistem koordinat Cartes.', 'Sistem Koordinat Cartes', 'Koordinat'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B8',
    tingkatan: 'Tingkatan 2',
    nomborBab: 8,
    tema: 'Perkaitan dan Algebra',
    tajuk: 'Graf Fungsi',
    peneranganRingkas: 'Bab 8 Matematik Tingkatan 2: Graf Fungsi (Perkaitan dan Algebra)',
    skList: [
      {
        kod: '8.1',
        tajuk: 'Fungsi',
        spList: [
          makeBmSp('8.1.1', 'Menerangkan maksud fungsi.', 'Fungsi', 'Graf Fungsi'),
          makeBmSp('8.1.2', 'Mengenal pasti fungsi dan memberi justifikasi berdasarkan perwakilan fungsi dalam bentuk pasangan tertib, jadual, graf dan persamaan.', 'Fungsi', 'Graf Fungsi'),
        ],
      },
      {
        kod: '8.2',
        tajuk: 'Graf Fungsi',
        spList: [
          makeBmSp('8.2.1', 'Membina jadual nilai bagi fungsi linear dan bukan linear, dan seterusnya melukis graf menggunakan skala yang diberi.', 'Graf Fungsi', 'Graf Fungsi'),
          makeBmSp('8.2.2', 'Mentafsir graf fungsi.', 'Graf Fungsi', 'Graf Fungsi'),
          makeBmSp('8.2.3', 'Menyelesaikan masalah yang melibatkan graf fungsi.', 'Graf Fungsi', 'Graf Fungsi'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B9',
    tingkatan: 'Tingkatan 2',
    nomborBab: 9,
    tema: 'Perkaitan dan Algebra',
    tajuk: 'Laju dan Pecutan',
    peneranganRingkas: 'Bab 9 Matematik Tingkatan 2: Laju dan Pecutan (Perkaitan dan Algebra)',
    skList: [
      {
        kod: '9.1',
        tajuk: 'Laju',
        spList: [
          makeBmSp('9.1.1', 'Menerangkan maksud laju sebagai suatu kadar yang melibatkan jarak dan masa.', 'Laju', 'Laju dan Pecutan'),
          makeBmSp('9.1.2', 'Memerihal perbezaan antara laju seragam dan laju tak seragam.', 'Laju', 'Laju dan Pecutan'),
          makeBmSp('9.1.3', 'Melaksanakan pengiraan yang melibatkan laju dan laju purata termasuk penukaran unit.', 'Laju', 'Laju dan Pecutan'),
          makeBmSp('9.1.4', 'Menyelesaikan masalah yang melibatkan laju.', 'Laju', 'Laju dan Pecutan'),
        ],
      },
      {
        kod: '9.2',
        tajuk: 'Pecutan',
        spList: [
          makeBmSp('9.2.1', 'Menerangkan maksud pecutan dan nyahpecutan sebagai suatu kadar yang melibatkan laju dan masa.', 'Pecutan', 'Laju dan Pecutan'),
          makeBmSp('9.2.2', 'Melaksanakan pengiraan yang melibatkan pecutan termasuk penukaran unit.', 'Pecutan', 'Laju dan Pecutan'),
          makeBmSp('9.2.3', 'Menyelesaikan masalah yang melibatkan pecutan.', 'Pecutan', 'Laju dan Pecutan'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B10',
    tingkatan: 'Tingkatan 2',
    nomborBab: 10,
    tema: 'Perkaitan dan Algebra',
    tajuk: 'Kecerunan Garis Lurus',
    peneranganRingkas: 'Bab 10 Matematik Tingkatan 2: Kecerunan Garis Lurus (Perkaitan dan Algebra)',
    skList: [
      {
        kod: '10.1',
        tajuk: 'Kecerunan',
        spList: [
          makeBmSp('10.1.1', 'Memerihalkan kecuraman dan arah kecondongan berdasarkan situasi harian, dan seterusnya menerangkan maksud kecerunan sebagai nisbah jarak mencancang kepada jarak mengufuk.', 'Kecerunan', 'Kecerunan Garis Lurus'),
          makeBmSp('10.1.2', 'Menerbitkan rumus kecerunan suatu garis lurus pada satah Cartes.', 'Kecerunan', 'Kecerunan Garis Lurus'),
          makeBmSp('10.1.3', 'Membuat generalisasi tentang kecerunan garis lurus.', 'Kecerunan', 'Kecerunan Garis Lurus'),
          makeBmSp('10.1.4', 'Menentukan kecerunan suatu garis lurus.', 'Kecerunan', 'Kecerunan Garis Lurus'),
          makeBmSp('10.1.5', 'Menyelesaikan masalah yang melibatkan kecerunan garis lurus.', 'Kecerunan', 'Kecerunan Garis Lurus'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B11',
    tingkatan: 'Tingkatan 2',
    nomborBab: 11,
    tema: 'Sukatan dan Geometri',
    tajuk: 'Transformasi Isometri',
    peneranganRingkas: 'Bab 11 Matematik Tingkatan 2: Transformasi Isometri (Sukatan dan Geometri)',
    skList: [
      {
        kod: '11.1',
        tajuk: 'Transformasi',
        spList: [
          makeBmSp('11.1.1', 'Memerihalkan perubahan bentuk, saiz, kedudukan dan orientasi suatu objek yang melalui transformasi, dan seterusnya menerangkan idea padanan satu-dengan-satu antara titik-titik dal transformasi.', 'Transformasi', 'Transformasi Isometri'),
          makeBmSp('11.1.2', 'Menerangkan idea kekongruenan dalam transformasi.', 'Transformasi', 'Transformasi Isometri'),
        ],
      },
      {
        kod: '11.2',
        tajuk: 'Translasi',
        spList: [
          makeBmSp('11.2.1', 'Mengenal translasi.', 'Translasi', 'Transformasi Isometri'),
          makeBmSp('11.2.2', 'Memerihalkan translasi menggunakan pelbagai perwakilan termasuk dalam bentuk vektor translasi.', 'Translasi', 'Transformasi Isometri'),
          makeBmSp('11.2.3', 'Menentukan imej dan objek bagi suatu translasi.', 'Translasi', 'Transformasi Isometri'),
          makeBmSp('11.2.4', 'Menyelesaikan masalah yang melibatkan translasi.', 'Translasi', 'Transformasi Isometri'),
        ],
      },
      {
        kod: '11.3',
        tajuk: 'Pantulan',
        spList: [
          makeBmSp('11.3.1', 'Mengenal pantulan.', 'Pantulan', 'Transformasi Isometri'),
          makeBmSp('11.3.2', 'Memerihalkan pantulan menggunakan pelbagai perwakilan.', 'Pantulan', 'Transformasi Isometri'),
          makeBmSp('11.3.3', 'Menentukan imej dan objek bagi suatu pantulan.', 'Pantulan', 'Transformasi Isometri'),
          makeBmSp('11.3.4', 'Menyelesaikan masalah yang melibatkan pantulan.', 'Pantulan', 'Transformasi Isometri'),
        ],
      },
      {
        kod: '11.4',
        tajuk: 'Putaran',
        spList: [
          makeBmSp('11.4.1', 'Mengenal putaran.', 'Putaran', 'Transformasi Isometri'),
          makeBmSp('11.4.2', 'Memerihalkan putaran menggunakan pelbagai perwakilan.', 'Putaran', 'Transformasi Isometri'),
          makeBmSp('11.4.3', 'Menentukan imej dan objek bagi suatu putaran.', 'Putaran', 'Transformasi Isometri'),
          makeBmSp('11.4.4', 'Menyelesaikan masalah yang melibatkan putaran.', 'Putaran', 'Transformasi Isometri'),
        ],
      },
      {
        kod: '11.5',
        tajuk: 'Translasi, Pantulan dan Putaran sebagai Isometri',
        spList: [
          makeBmSp('11.5.1', 'Menyiasat hubungan antara kesan translasi, pantulan dan putaran terhadap jarak antara dua titik pada objek dan imej, dan seterusnya menerangkan isometri.', 'Translasi, Pantulan dan Putaran sebagai Isometri', 'Transformasi Isometri'),
          makeBmSp('11.5.2', 'Menerangkan hubungan antara isometri dan kekongruenan.', 'Translasi, Pantulan dan Putaran sebagai Isometri', 'Transformasi Isometri'),
          makeBmSp('11.5.3', 'Menyelesaikan masalah yang melibatkan isometri dan kekongruenan.', 'Translasi, Pantulan dan Putaran sebagai Isometri', 'Transformasi Isometri'),
        ],
      },
      {
        kod: '11.6',
        tajuk: 'Simetri Putaran',
        spList: [
          makeBmSp('11.6.1', 'Menerangkan simetri putaran.', 'Simetri Putaran', 'Transformasi Isometri'),
          makeBmSp('11.6.2', 'Menentukan peringkat simetri putaran bagi suatu objek.', 'Simetri Putaran', 'Transformasi Isometri'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B12',
    tingkatan: 'Tingkatan 2',
    nomborBab: 12,
    tema: 'Statistik dan Kebarangkalian',
    tajuk: 'Sukatan Kecenderungan Memusat',
    peneranganRingkas: 'Bab 12 Matematik Tingkatan 2: Sukatan Kecenderungan Memusat (Statistik dan Kebarangkalian)',
    skList: [
      {
        kod: '12.1',
        tajuk: 'Sukatan Kecenderungan Memusat',
        spList: [
          makeBmSp('12.1.1', 'Menentukan mod, min dan median bagi suatu set data tak terkumpul.', 'Sukatan Kecenderungan Memusat', 'Sukatan Kecenderungan Memusat'),
          makeBmSp('12.1.2', 'Membuat kesimpulan tentang kesan perubahan suatu set data terhadap nilai mod, min dan median.', 'Sukatan Kecenderungan Memusat', 'Sukatan Kecenderungan Memusat'),
          makeBmSp('12.1.3', 'Mengumpul data, membina dan mentafsir jadual kekerapan bagi data terkumpul.', 'Sukatan Kecenderungan Memusat', 'Sukatan Kecenderungan Memusat'),
          makeBmSp('12.1.4', 'Menentukan kelas mod dan min bagi suatu set data terkumpul.', 'Sukatan Kecenderungan Memusat', 'Sukatan Kecenderungan Memusat'),
          makeBmSp('12.1.5', 'Memilih dan menjustifikasikan sukatan kecenderungan memusat yang sesuai untuk memerihal taburan suatu set data, termasuk set data yang mempunyai nilai ekstrem.', 'Sukatan Kecenderungan Memusat', 'Sukatan Kecenderungan Memusat'),
          makeBmSp('12.1.6', 'Menentukan mod, min dan median daripada perwakilan data.', 'Sukatan Kecenderungan Memusat', 'Sukatan Kecenderungan Memusat'),
          makeBmSp('12.1.7', 'Mengaplikasikan kefahaman tentang sukatan kecenderungan memusat untuk membuat ramalan, membentuk hujah yang meyakinkan dan membuat kesimpulan.', 'Sukatan Kecenderungan Memusat', 'Sukatan Kecenderungan Memusat'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B13',
    tingkatan: 'Tingkatan 2',
    nomborBab: 13,
    tema: 'Statistik dan Kebarangkalian',
    tajuk: 'Kebarangkalian Mudah',
    peneranganRingkas: 'Bab 13 Matematik Tingkatan 2: Kebarangkalian Mudah (Statistik dan Kebarangkalian)',
    skList: [
      {
        kod: '13.1',
        tajuk: 'Kebarangkalian Eksperimen',
        spList: [
          makeBmSp('13.1.1', 'Melaksanakan eksperimen kebarangkalian mudah, dan seterusnya menentukan nisbah sebagai kebarangkalian eksperimen bagi suatu peristiwa.', 'Kebarangkalian Eksperimen', 'Kebarangkalian Mudah'),
          makeBmSp('13.1.2', 'Membuat kesimpulan tentang kebarangkalian eksperimen suatu peristiwa apabila bilangan cubaan cukup besar.', 'Kebarangkalian Eksperimen', 'Kebarangkalian Mudah'),
        ],
      },
      {
        kod: '13.2',
        tajuk: 'Kebarangkalian Teori yang Melibatkan Kesudahan Sama Boleh Jadi',
        spList: [
          makeBmSp('13.2.1', 'Menentukan ruang sampel dan peristiwa bagi suatu eksperimen.', 'Kebarangkalian Teori yang Melibatkan Kesudahan Sama Boleh Jadi', 'Kebarangkalian Mudah'),
          makeBmSp('13.2.2', 'Membina model kebarangkalian suatu peristiwa, dan seterusnya membuat perkaitan antara kebarangkalian teori dengan kebarangkalian eksperimen.', 'Kebarangkalian Teori yang Melibatkan Kesudahan Sama Boleh Jadi', 'Kebarangkalian Mudah'),
          makeBmSp('13.2.3', 'Menentukan kebarangkalian suatu peristiwa.', 'Kebarangkalian Teori yang Melibatkan Kesudahan Sama Boleh Jadi', 'Kebarangkalian Mudah'),
        ],
      },
      {
        kod: '13.3',
        tajuk: 'Kebarangkalian Peristiwa Pelengkap',
        spList: [
          makeBmSp('13.3.1', 'Memerihalkan peristiwa pelengkap dalam perkataan dan dengan menggunakan tatatanda set.', 'Kebarangkalian Peristiwa Pelengkap', 'Kebarangkalian Mudah'),
          makeBmSp('13.3.2', 'Menentukan kebarangkalian peristiwa pelengkap.', 'Kebarangkalian Peristiwa Pelengkap', 'Kebarangkalian Mudah'),
        ],
      },
      {
        kod: '13.4',
        tajuk: 'Kebarangkalian Mudah',
        spList: [
          makeBmSp('13.4.1', 'Menyelesaikan masalah yang melibatkan kebarangkalian suatu peristiwa.', 'Kebarangkalian Mudah', 'Kebarangkalian Mudah'),
        ],
      },
    ],
  },
];
