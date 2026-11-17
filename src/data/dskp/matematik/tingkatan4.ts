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

export const DSKP_MATEMATIK_F4: BabMatematik[] = [
  {
    id: 'M_F4_B1',
    tingkatan: 'Tingkatan 4',
    nomborBab: 1,
    tema: 'Perkaitan dan Algebra',
    tajuk: 'Fungsi dan Persamaan Kuadratik dalam Satu Pemboleh Ubah',
    peneranganRingkas: 'Bab 1 Matematik Tingkatan 4: Fungsi dan Persamaan Kuadratik dalam Satu Pemboleh Ubah (Perkaitan dan Algebra)',
    skList: [
      {
        kod: '1.1',
        tajuk: 'Fungsi dan Persamaan Kuadratik',
        spList: [
          makeBmSp('1.1.1', 'Mengenal pasti dan menerangkan ciri-ciri ungkapan kuadratik dalam satu pemboleh ubah.', 'Fungsi dan Persamaan Kuadratik', 'Fungsi dan Persamaan Kuadratik dalam Satu Pemboleh Ubah'),
          makeBmSp('1.1.2', 'Mengenal fungsi kuadratik sebagai hubungan banyak kepada satu, dan seterusnya memerihalkan ciri-ciri fungsi kuadratik.', 'Fungsi dan Persamaan Kuadratik', 'Fungsi dan Persamaan Kuadratik dalam Satu Pemboleh Ubah'),
          makeBmSp('1.1.3', 'Menyiasat dan membuat generalisasi tentang kesan perubahan nilai dan ke atas gra fungsi kuadratik,.', 'Fungsi dan Persamaan Kuadratik', 'Fungsi dan Persamaan Kuadratik dalam Satu Pemboleh Ubah'),
          makeBmSp('1.1.4', 'Membentuk fungsi kuadratik berdasarkan suatu situasi dan seterusnya menghubungkaitkan dengan persamaan kuadratik.', 'Fungsi dan Persamaan Kuadratik', 'Fungsi dan Persamaan Kuadratik dalam Satu Pemboleh Ubah'),
          makeBmSp('1.1.5', 'Menerangkan maksud punca suatu persamaan kuadratik.', 'Fungsi dan Persamaan Kuadratik', 'Fungsi dan Persamaan Kuadratik dalam Satu Pemboleh Ubah'),
          makeBmSp('1.1.6', 'Menentukan punca suatu persamaan kuadratik dengan kaedah pemfaktoran.', 'Fungsi dan Persamaan Kuadratik', 'Fungsi dan Persamaan Kuadratik dalam Satu Pemboleh Ubah'),
          makeBmSp('1.1.7', 'Melakar graf fungsi kuadratik.', 'Fungsi dan Persamaan Kuadratik', 'Fungsi dan Persamaan Kuadratik dalam Satu Pemboleh Ubah'),
          makeBmSp('1.1.8', 'Menyelesaikan masalah yang melibatkan persamaan kuadratik. 35 TAFSI.', 'Fungsi dan Persamaan Kuadratik', 'Fungsi dan Persamaan Kuadratik dalam Satu Pemboleh Ubah'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B2',
    tingkatan: 'Tingkatan 4',
    nomborBab: 2,
    tema: 'Nombor dan Operasi',
    tajuk: 'Asas Nombor',
    peneranganRingkas: 'Bab 2 Matematik Tingkatan 4: Asas Nombor (Nombor dan Operasi)',
    skList: [
      {
        kod: '2.1',
        tajuk: 'Asas Nombor',
        spList: [
          makeBmSp('2.1.1', 'Mewakil dan menjelaskan nombor dalam pelbagai asas dari segi angka, nilai tempat, nil digit dan nilai nombor berdasarkan proses pengumpulan.', 'Asas Nombor', 'Asas Nombor'),
          makeBmSp('2.1.2', 'Menukar nombor daripada satu asas kepada asas yang lain menggunakan pelbagai kaedah.', 'Asas Nombor', 'Asas Nombor'),
          makeBmSp('2.1.3', 'Membuat pengiraan yang melibatkan operasi tambah dan tolak bagi nombor dalam pelbagai asas.', 'Asas Nombor', 'Asas Nombor'),
          makeBmSp('2.1.4', 'Menyelesaikan masalah yang melibatkan asas nombor. 39 TAFSIR.', 'Asas Nombor', 'Asas Nombor'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B3',
    tingkatan: 'Tingkatan 4',
    nomborBab: 3,
    tema: 'Matematik Diskret',
    tajuk: 'Penaakulan Logik',
    peneranganRingkas: 'Bab 3 Matematik Tingkatan 4: Penaakulan Logik (Matematik Diskret)',
    skList: [
      {
        kod: '3.1',
        tajuk: 'Pernyataan',
        spList: [
          makeBmSp('3.1.1', 'Menerangkan maksud pernyataan dan seterusnya menentukan nilai kebenaran bagi suatu pernyataan.', 'Pernyataan', 'Penaakulan Logik'),
          makeBmSp('3.1.2', 'Menafikan suatu pernyataan.', 'Pernyataan', 'Penaakulan Logik'),
          makeBmSp('3.1.3', 'Menentukan nilai kebenaran suatu pernyataan majmuk.', 'Pernyataan', 'Penaakulan Logik'),
          makeBmSp('3.1.4', 'Membina pernyataan dalam bentuk implikasi (i) Jika p, maka q (ii) p jika dan hanya jika q.', 'Pernyataan', 'Penaakulan Logik'),
          makeBmSp('3.1.5', 'Membina dan membandingkan nilai kebenaran akas, songsangan dan kontrapositif bagi suatu implikasi.', 'Pernyataan', 'Penaakulan Logik'),
          makeBmSp('3.1.6', 'Menentukan contoh penyangkal untuk menafikan kebenaran pernyataan tertentu.', 'Pernyataan', 'Penaakulan Logik'),
        ],
      },
      {
        kod: '3.2',
        tajuk: 'Hujah',
        spList: [
          makeBmSp('3.2.1', 'Menerangkan maksud hujah, dan membezakan hujah deduktif dan hujah induktif.', 'Hujah', 'Penaakulan Logik'),
          makeBmSp('3.2.2', 'Menentu dan menjustifikasikan keesahan suatu hujah deduktif dan seterusnya menentukan sama ada hujah yang sah itu munasabah. 43.', 'Hujah', 'Penaakulan Logik'),
          makeBmSp('3.2.3', 'Membentuk hujah deduktif yang sah bagi suatu situasi.', 'Hujah', 'Penaakulan Logik'),
          makeBmSp('3.2.4', 'Menentu dan menjustifikasikan kekuatan suatu hujah induktif dan seterusnya menentukan sama ada hujah yang kuat itu meyakinkan.', 'Hujah', 'Penaakulan Logik'),
          makeBmSp('3.2.5', 'Membentuk hujah induktif yang kuat bagi suatu situasi.', 'Hujah', 'Penaakulan Logik'),
          makeBmSp('3.2.6', 'Menyelesaikan masalah yang melibatkan penaakulan logik. 45 TAFS.', 'Hujah', 'Penaakulan Logik'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B4',
    tingkatan: 'Tingkatan 4',
    nomborBab: 4,
    tema: 'Matematik Diskret',
    tajuk: 'Operasi Set',
    peneranganRingkas: 'Bab 4 Matematik Tingkatan 4: Operasi Set (Matematik Diskret)',
    skList: [
      {
        kod: '4.1',
        tajuk: 'Persilangan Set',
        spList: [
          makeBmSp('4.1.1', 'Menentu dan menghuraikan persilangan set menggunakan pelbagai perwakilan.', 'Persilangan Set', 'Operasi Set'),
          makeBmSp('4.1.2', 'Menentukan pelengkap bagi persilangan set.', 'Persilangan Set', 'Operasi Set'),
          makeBmSp('4.1.3', 'Menyelesaikan masalah yang melibatkan persilangan set.', 'Persilangan Set', 'Operasi Set'),
        ],
      },
      {
        kod: '4.2',
        tajuk: 'Kesatuan Set',
        spList: [
          makeBmSp('4.2.1', 'Menentu dan menghuraikan kesatuan set menggunakan pelbagai perwakilan.', 'Kesatuan Set', 'Operasi Set'),
          makeBmSp('4.2.2', 'Menentukan pelengkap bagi kesatuan set.', 'Kesatuan Set', 'Operasi Set'),
          makeBmSp('4.2.3', 'Menyelesaikan masalah yang melibatkan kesatuan set.', 'Kesatuan Set', 'Operasi Set'),
        ],
      },
      {
        kod: '4.3',
        tajuk: 'Gabungan Operasi Set',
        spList: [
          makeBmSp('4.3.1', 'Menentu dan menghuraikan gabungan operasi set menggunakan pelbagai perwakilan.', 'Gabungan Operasi Set', 'Operasi Set'),
          makeBmSp('4.3.2', 'Menentukan pelengkap bagi gabungan operasi set.', 'Gabungan Operasi Set', 'Operasi Set'),
          makeBmSp('4.3.3', 'Menyelesaikan masalah yang melibatkan gabungan operasi set. 49 TAF.', 'Gabungan Operasi Set', 'Operasi Set'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B5',
    tingkatan: 'Tingkatan 4',
    nomborBab: 5,
    tema: 'Matematik Diskret',
    tajuk: 'Rangkaian dalam Teori Graf',
    peneranganRingkas: 'Bab 5 Matematik Tingkatan 4: Rangkaian dalam Teori Graf (Matematik Diskret)',
    skList: [
      {
        kod: '5.1',
        tajuk: 'Rangkaian',
        spList: [
          makeBmSp('5.1.1', 'Mengenal dan menerangkan rangkaian sebagai graf.', 'Rangkaian', 'Rangkaian dalam Teori Graf'),
          makeBmSp('5.1.2', 'Membanding beza (i) Graf terarah dengan graf tak terarah. (ii) Graf berpemberat dengan graf tak berpemberat.', 'Rangkaian', 'Rangkaian dalam Teori Graf'),
          makeBmSp('5.1.3', 'Mengenal dan melukis subgraf dan pokok.', 'Rangkaian', 'Rangkaian dalam Teori Graf'),
          makeBmSp('5.1.4', 'Mewakilkan maklumat dalam bentuk rangkaian.', 'Rangkaian', 'Rangkaian dalam Teori Graf'),
          makeBmSp('5.1.5', 'Menyelesaikan masalah yang melibatkan rangkaian. 53 TAFSI.', 'Rangkaian', 'Rangkaian dalam Teori Graf'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B6',
    tingkatan: 'Tingkatan 4',
    nomborBab: 6,
    tema: 'Perkaitan dan Algebra',
    tajuk: 'Ketaksamaan Linear dalam Dua Pemboleh Ubah',
    peneranganRingkas: 'Bab 6 Matematik Tingkatan 4: Ketaksamaan Linear dalam Dua Pemboleh Ubah (Perkaitan dan Algebra)',
    skList: [
      {
        kod: '6.1',
        tajuk: 'Ketaksamaan Linear dalam Dua Pemboleh Ubah',
        spList: [
          makeBmSp('6.1.1', 'Mewakilkan situasi dalam bentuk ketaksamaan linear.', 'Ketaksamaan Linear dalam Dua Pemboleh Ubah', 'Ketaksamaan Linear dalam Dua Pemboleh Ubah'),
          makeBmSp('6.1.2', 'Membuat dan menentusahkan konjektur tentang titik dalam rantau dan penyelesaian bagi suatu ketaksamaan linear.', 'Ketaksamaan Linear dalam Dua Pemboleh Ubah', 'Ketaksamaan Linear dalam Dua Pemboleh Ubah'),
          makeBmSp('6.1.3', 'Menentukan dan melorek rantau yang memuaskan satu ketaksamaan linear.', 'Ketaksamaan Linear dalam Dua Pemboleh Ubah', 'Ketaksamaan Linear dalam Dua Pemboleh Ubah'),
        ],
      },
      {
        kod: '6.2',
        tajuk: 'Sistem Ketaksamaan Linear dalam Dua Pemboleh Ubah',
        spList: [
          makeBmSp('6.2.1', 'Mewakilkan situasi dalam bentuk sistem ketaksamaan linear.', 'Sistem Ketaksamaan Linear dalam Dua Pemboleh Ubah', 'Ketaksamaan Linear dalam Dua Pemboleh Ubah'),
          makeBmSp('6.2.2', 'Membuat dan menentusahkan konjektur tentang titik dalam rantau dan penyelesaian bagi suatu sistem ketaksamaan linear.', 'Sistem Ketaksamaan Linear dalam Dua Pemboleh Ubah', 'Ketaksamaan Linear dalam Dua Pemboleh Ubah'),
          makeBmSp('6.2.3', 'Menentukan dan melorek rantau yang memuaskan satu sistem ketaksamaan linear.', 'Sistem Ketaksamaan Linear dalam Dua Pemboleh Ubah', 'Ketaksamaan Linear dalam Dua Pemboleh Ubah'),
          makeBmSp('6.2.4', 'Menyelesaikan masalah yang melibatkan sistem ketaksamaan linear dalam dua pemboleh ubah. TAFSIRA.', 'Sistem Ketaksamaan Linear dalam Dua Pemboleh Ubah', 'Ketaksamaan Linear dalam Dua Pemboleh Ubah'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B7',
    tingkatan: 'Tingkatan 4',
    nomborBab: 7,
    tema: 'Perkaitan dan Algebra',
    tajuk: 'Graf Gerakan',
    peneranganRingkas: 'Bab 7 Matematik Tingkatan 4: Graf Gerakan (Perkaitan dan Algebra)',
    skList: [
      {
        kod: '7.1',
        tajuk: 'Graf Jarak-Masa',
        spList: [
          makeBmSp('7.1.1', 'Melukis graf jarak-masa.', 'Graf Jarak-Masa', 'Graf Gerakan'),
          makeBmSp('7.1.2', 'Mentafsir graf jarak-masa dan menghuraikan gerakan berdasarkan graf tersebut.', 'Graf Jarak-Masa', 'Graf Gerakan'),
          makeBmSp('7.1.3', 'Menyelesaikan masalah yang melibatkan graf jarak-masa.', 'Graf Jarak-Masa', 'Graf Gerakan'),
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Graf Laju-Masa',
        spList: [
          makeBmSp('7.2.1', 'Melukis graf laju-masa.', 'Graf Laju-Masa', 'Graf Gerakan'),
          makeBmSp('7.2.2', 'Membuat perkaitan antara luas di bawah graf laju-masa dengan jarak yang dilalui dan seterusnya menentukan jarak.', 'Graf Laju-Masa', 'Graf Gerakan'),
          makeBmSp('7.2.3', 'Mentafsir graf laju-masa dan menghuraikan gerakan berdasarkan graf tersebut.', 'Graf Laju-Masa', 'Graf Gerakan'),
          makeBmSp('7.2.4', 'Menyelesaikan masalah yang melibatkan graf laju-masa. 60 TAFSI.', 'Graf Laju-Masa', 'Graf Gerakan'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B8',
    tingkatan: 'Tingkatan 4',
    nomborBab: 8,
    tema: 'Statistik dan Kebarangkalian',
    tajuk: 'Sukatan Serakan Data Tak Terkumpul',
    peneranganRingkas: 'Bab 8 Matematik Tingkatan 4: Sukatan Serakan Data Tak Terkumpul (Statistik dan Kebarangkalian)',
    skList: [
      {
        kod: '8.1',
        tajuk: 'Serakan',
        spList: [
          makeBmSp('8.1.1', 'Menerangkan maksud serakan.', 'Serakan', 'Sukatan Serakan Data Tak Terkumpul'),
          makeBmSp('8.1.2', 'Membanding dan mentafsir serakan dua atau lebih set data berdasarkan plot batang-dan-daun dan plot titik dan seterusnya membuat kesimpulan.', 'Serakan', 'Sukatan Serakan Data Tak Terkumpul'),
        ],
      },
      {
        kod: '8.2',
        tajuk: 'Sukatan Serakan',
        spList: [
          makeBmSp('8.2.1', 'Menentukan julat, julat antara kuartil, varians dan sisihan piawai sebagai sukatan untuk menghuraikan serakan bagi data tak terkumpul.', 'Sukatan Serakan', 'Sukatan Serakan Data Tak Terkumpul'),
          makeBmSp('8.2.2', 'Menerangkan kelebihan dan kekurangan pelbagai sukatan serakan untuk menghuraikan data tak terkumpul.', 'Sukatan Serakan', 'Sukatan Serakan Data Tak Terkumpul'),
          makeBmSp('8.2.3', 'Membina dan mentafsir plot kotak bagi suatu set data tak terkumpul.', 'Sukatan Serakan', 'Sukatan Serakan Data Tak Terkumpul'),
          makeBmSp('8.2.4', 'Menentukan kesan perubahan data terhadap serakan berdasarkan: (i) Nilai sukatan serakan (ii) Perwakilan grafik.', 'Sukatan Serakan', 'Sukatan Serakan Data Tak Terkumpul'),
          makeBmSp('8.2.5', 'Membanding dan mentafsir dua atau lebih set data tak terkumpul, berdasarkan sukatan serakan yang sesuai dan seterusnya membuat kesimpulan.', 'Sukatan Serakan', 'Sukatan Serakan Data Tak Terkumpul'),
          makeBmSp('8.2.6', 'Menyelesaikan masalah yang melibatkan sukatan serakan. TAFSI.', 'Sukatan Serakan', 'Sukatan Serakan Data Tak Terkumpul'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B9',
    tingkatan: 'Tingkatan 4',
    nomborBab: 9,
    tema: 'Statistik dan Kebarangkalian',
    tajuk: 'Kebarangkalian Peristiwa Bergabung',
    peneranganRingkas: 'Bab 9 Matematik Tingkatan 4: Kebarangkalian Peristiwa Bergabung (Statistik dan Kebarangkalian)',
    skList: [
      {
        kod: '9.1',
        tajuk: 'Peristiwa Bergabung',
        spList: [
          makeBmSp('9.1.1', 'Memerihalkan peristiwa bergabung dan menyenaraikan peristiwa bergabung yang mungkin.', 'Peristiwa Bergabung', 'Kebarangkalian Peristiwa Bergabung'),
        ],
      },
      {
        kod: '9.2',
        tajuk: 'Peristiwa Bersandar dan Peristiwa Tak Bersandar',
        spList: [
          makeBmSp('9.2.1', 'Membezakan peristiwa bersandar dan peristiwa tak bersandar.', 'Peristiwa Bersandar dan Peristiwa Tak Bersandar', 'Kebarangkalian Peristiwa Bergabung'),
          makeBmSp('9.2.2', 'Membuat dan menentusahkan konjektur tentang rumus kebarangkalian peristiwa bergabung.', 'Peristiwa Bersandar dan Peristiwa Tak Bersandar', 'Kebarangkalian Peristiwa Bergabung'),
          makeBmSp('9.2.3', 'Menentukan kebarangkalian peristiwa bergabung bagi peristiwa bersandar dan peristiwa tak bersandar.', 'Peristiwa Bersandar dan Peristiwa Tak Bersandar', 'Kebarangkalian Peristiwa Bergabung'),
        ],
      },
      {
        kod: '9.3',
        tajuk: 'Peristiwa Saling Eksklusif dan Peristiwa Tidak Saling Eksklusif',
        spList: [
          makeBmSp('9.3.1', 'Membezakan peristiwa saling eksklusif dan peristiwa tidak saling eksklusif.', 'Peristiwa Saling Eksklusif dan Peristiwa Tidak Saling Eksklusif', 'Kebarangkalian Peristiwa Bergabung'),
          makeBmSp('9.3.2', 'Mengesahkan rumus kebarangkalian peristiwa bergabung bagi peristiwa saling eksklusif dan peristiwa tidak saling eksklusif.', 'Peristiwa Saling Eksklusif dan Peristiwa Tidak Saling Eksklusif', 'Kebarangkalian Peristiwa Bergabung'),
          makeBmSp('9.3.3', 'Menentukan kebarangkalian peristiwa bergabung bagi peristiwa saling eksklusif dan peristiwa tidak saling eksklusif.', 'Peristiwa Saling Eksklusif dan Peristiwa Tidak Saling Eksklusif', 'Kebarangkalian Peristiwa Bergabung'),
        ],
      },
      {
        kod: '9.4',
        tajuk: 'Aplikasi Kebarangkalian Peristiwa Bergabung',
        spList: [
          makeBmSp('9.4.1', 'Menyelesaikan masalah yang melibatkan kebarangkalian peristiwa bergabung. 70 TAFS.', 'Aplikasi Kebarangkalian Peristiwa Bergabung', 'Kebarangkalian Peristiwa Bergabung'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B10',
    tingkatan: 'Tingkatan 4',
    nomborBab: 10,
    tema: 'Nombor dan Operasi',
    tajuk: 'Matematik Pengguna: Pengurusan Kewangan',
    peneranganRingkas: 'Bab 10 Matematik Tingkatan 4: Matematik Pengguna: Pengurusan Kewangan (Nombor dan Operasi)',
    skList: [
      {
        kod: '10.1',
        tajuk: 'Perancangan dan Pengurusan Kewangan',
        spList: [
          makeBmSp('10.1.1', 'Menghuraikan proses pengurusan kewangan yang berkesan.', 'Perancangan dan Pengurusan Kewangan', 'Matematik Pengguna: Pengurusan Kewangan'),
          makeBmSp('10.1.2', 'Membina dan membentang pelan kewangan peribadi untuk mencapai matlamat kewangan jangka pendek dan jangka panjang, dan seterusnya menilai kebolehlaksanaan pelan kewangan tersebut. 74 TAFSIR.', 'Perancangan dan Pengurusan Kewangan', 'Matematik Pengguna: Pengurusan Kewangan'),
        ],
      },
    ],
  },
];
