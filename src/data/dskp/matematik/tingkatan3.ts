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

export const DSKP_MATEMATIK_F3: BabMatematik[] = [
  {
    id: 'M_F3_B1',
    tingkatan: 'Tingkatan 3',
    nomborBab: 1,
    tema: 'Nombor dan Operasi',
    tajuk: 'Indeks',
    peneranganRingkas: 'Bab 1 Matematik Tingkatan 3: Indeks (Nombor dan Operasi)',
    skList: [
      {
        kod: '1.1',
        tajuk: 'Tatatanda Indeks',
        spList: [
          makeBmSp('1.1.1', 'Mewakilkan pendaraban berulang dalam bentuk indeks dan menghuraikan maksudnya.', 'Tatatanda Indeks', 'Indeks'),
          makeBmSp('1.1.2', 'Menukar suatu nombor kepada nombor dalam bentuk indeks dan sebaliknya.', 'Tatatanda Indeks', 'Indeks'),
        ],
      },
      {
        kod: '1.2',
        tajuk: 'Hukum Indeks',
        spList: [
          makeBmSp('1.2.1', 'Menghubung kait pendaraban nombor dalam bentuk indeks yang mempunyai asas yang sama dengan pendaraban berulang, dan seterusnya membuat generalisasi.', 'Hukum Indeks', 'Indeks'),
          makeBmSp('1.2.2', 'Menghubung kait pembahagian nombor dalam bentuk indeks yang mempunyai asas yang sama dengan pendaraban berulang, dan seterusnya membuat generalisasi.', 'Hukum Indeks', 'Indeks'),
          makeBmSp('1.2.3', 'Menghubung kait nombor dalam bentuk indeks yang dikuasakan dengan pendaraban berulang, dan seterusnya membuat generalisasi.', 'Hukum Indeks', 'Indeks'),
          makeBmSp('1.2.4', 'Menentusahkan a0 = 1 dan a–n = ; a .', 'Hukum Indeks', 'Indeks'),
          makeBmSp('1.2.5', 'Menentu dan menyatakan hubungan antara indeks peca han dengan punca kuasa dan kuasa.', 'Hukum Indeks', 'Indeks'),
          makeBmSp('1.2.6', 'Melaksanakan operasi yang melibatkan hukum indeks.', 'Hukum Indeks', 'Indeks'),
          makeBmSp('1.2.7', 'Menyelesaikan masalah yang melibatkan hukum indeks. 33 TAFS.', 'Hukum Indeks', 'Indeks'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B2',
    tingkatan: 'Tingkatan 3',
    nomborBab: 2,
    tema: 'Nombor dan Operasi',
    tajuk: 'Bentuk Piawai',
    peneranganRingkas: 'Bab 2 Matematik Tingkatan 3: Bentuk Piawai (Nombor dan Operasi)',
    skList: [
      {
        kod: '2.1',
        tajuk: 'Angka Bererti',
        spList: [
          makeBmSp('2.1.1', 'Menerangkan maksud angka bererti dan seterusnya menentukan bilangan angka bererti suatu nombor.', 'Angka Bererti', 'Bentuk Piawai'),
          makeBmSp('2.1.2', 'Membundarkan suatu nombor kepada bilangan angka bererti yang tertentu.', 'Angka Bererti', 'Bentuk Piawai'),
        ],
      },
      {
        kod: '2.2',
        tajuk: 'Bentuk Piawai',
        spList: [
          makeBmSp('2.2.1', 'Mengenal dan menulis nombor dalam bentuk piawai.', 'Bentuk Piawai', 'Bentuk Piawai'),
          makeBmSp('2.2.2', 'Melaksanakan operasi asas aritmetik yang melibatkan nombor dalam bentuk piawai.', 'Bentuk Piawai', 'Bentuk Piawai'),
          makeBmSp('2.2.3', 'Menyelesaikan masalah yang melibatkan nombor dalam bentuk piawai. TAFS.', 'Bentuk Piawai', 'Bentuk Piawai'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B3',
    tingkatan: 'Tingkatan 3',
    nomborBab: 3,
    tema: 'Nombor dan Operasi',
    tajuk: 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang',
    peneranganRingkas: 'Bab 3 Matematik Tingkatan 3: Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang (Nombor dan Operasi)',
    skList: [
      {
        kod: '3.1',
        tajuk: 'Simpanan dan Pelaburan',
        spList: [
          makeBmSp('3.1.1', 'Mengenal pelbagai jenis simpanan dan pelaburan.', 'Simpanan dan Pelaburan', 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang'),
          makeBmSp('3.1.2', 'Membuat pengiraan yang melibatkan faedah mudah dan faedah kompaun bagi simpanan, dan seterusnya menerangkan kesan perubahan tempoh, kadar faedah atau pulangan dan kekerapan pengkompaunan terhadap nilai masa hadapan simpanan.', 'Simpanan dan Pelaburan', 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang'),
          makeBmSp('3.1.3', 'Membuat pengiraan yang melibatkan nilai pulangan pelaburan, dan seterusnya menerangkan faktor yang mempengaruhi pulangan pelaburan serta kesannya.', 'Simpanan dan Pelaburan', 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang'),
          makeBmSp('3.1.4', 'Membanding dan membeza potensi risiko, pulangan dan kecairan pelbagai jenis simpanan dan pelaburan.', 'Simpanan dan Pelaburan', 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang'),
          makeBmSp('3.1.5', 'Mengira purata kos sesyer bagi pelaburan saham menggunakan strategi pemurataan kos ringgit dan menjelaskan manfaat strategi ini.', 'Simpanan dan Pelaburan', 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang'),
          makeBmSp('3.1.6', 'Menyelesaikan masalah yang melibatkan simpanan dan pelaburan.', 'Simpanan dan Pelaburan', 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang'),
        ],
      },
      {
        kod: '3.2',
        tajuk: 'Pengurusan Kredit dan Hutang',
        spList: [
          makeBmSp('3.2.1', 'Menjelaskan maksud kredit dan hutang, dan seterusnya menghuraikan pengurusan yang bijaksana tentang kredit dan hutang.', 'Pengurusan Kredit dan Hutang', 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang'),
          makeBmSp('3.2.2', 'Mengkaji dan menghuraikan kelebihan dan kekurangan kad kredit dan penggunaannya secara bijaksana.', 'Pengurusan Kredit dan Hutang', 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang'),
          makeBmSp('3.2.3', 'Mengkaji dan menghuraikan kesan pembayaran minimum dan pembayaran lewat bagi penggunaan kad kredit.', 'Pengurusan Kredit dan Hutang', 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang'),
          makeBmSp('3.2.4', 'Menyelesaikan masalah yang melibatkan penggunaan kad kredit.', 'Pengurusan Kredit dan Hutang', 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang'),
          makeBmSp('3.2.5', 'Mengira jumlah bayaran balik pinjaman dan bayaran ansuran, dengan pelbagai kadar faedah dan tempoh pinjaman yang berbeza.', 'Pengurusan Kredit dan Hutang', 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang'),
          makeBmSp('3.2.6', 'Menyelesaikan masalah yang melibatkan pinjaman.', 'Pengurusan Kredit dan Hutang', 'Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B4',
    tingkatan: 'Tingkatan 3',
    nomborBab: 4,
    tema: 'Sukatan dan Geometri',
    tajuk: 'Lukisan Berskala',
    peneranganRingkas: 'Bab 4 Matematik Tingkatan 3: Lukisan Berskala (Sukatan dan Geometri)',
    skList: [
      {
        kod: '4.1',
        tajuk: 'Lukisan Berskala',
        spList: [
          makeBmSp('4.1.1', 'Mengkaji dan menerangkan hubungan antara ukuran sebenar objek dan lukisan pelbagai saiz objek tersebut, dan seterusnya menerangkan maksud lukisan berskala.', 'Lukisan Berskala', 'Lukisan Berskala'),
          makeBmSp('4.1.2', 'Mentafsirkan skala suatu lukisan berskala.', 'Lukisan Berskala', 'Lukisan Berskala'),
          makeBmSp('4.1.3', 'Menentukan skala, ukuran objek atau ukuran lukisan berskala.', 'Lukisan Berskala', 'Lukisan Berskala'),
          makeBmSp('4.1.4', 'Melukis lukisan berskala bagi suatu objek dan sebaliknya.', 'Lukisan Berskala', 'Lukisan Berskala'),
          makeBmSp('4.1.5', 'Menyelesaikan masalah yang melibatkan lukisan berskala. 46 TA.', 'Lukisan Berskala', 'Lukisan Berskala'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B5',
    tingkatan: 'Tingkatan 3',
    nomborBab: 5,
    tema: 'Sukatan dan Geometri',
    tajuk: 'Nisbah Trigonometri',
    peneranganRingkas: 'Bab 5 Matematik Tingkatan 3: Nisbah Trigonometri (Sukatan dan Geometri)',
    skList: [
      {
        kod: '5.1',
        tajuk: 'Sinus, Kosinus dan Tangen bagi Sudut Tirus dalam Segi Tiga Bersudut Tegak',
        spList: [
          makeBmSp('5.1.1', 'Mengenal pasti sisi bertentangan dan sisi bersebelahan berdasarkan suatu sudut tirus dalam segi tiga bersudut tegak.', 'Sinus, Kosinus dan Tangen bagi Sudut Tirus dalam Segi Tiga Bersudut Tegak', 'Nisbah Trigonometri'),
          makeBmSp('5.1.2', 'Membuat dan menentusahkan konjektur tentang hubungan antara sudut tirus dan nisbah sisi segi tiga bersudut tegak, dan seterusnya mentakrifkan sinus, kosinus dan tangen.', 'Sinus, Kosinus dan Tangen bagi Sudut Tirus dalam Segi Tiga Bersudut Tegak', 'Nisbah Trigonometri'),
          makeBmSp('5.1.3', 'Membuat dan menentusahkan konjektur tentang kesan perubahan saiz sudut terhadap nilai sinus, kosinus dan tangen.', 'Sinus, Kosinus dan Tangen bagi Sudut Tirus dalam Segi Tiga Bersudut Tegak', 'Nisbah Trigonometri'),
          makeBmSp('5.1.4', 'Menentukan nilai sinus, kosinus dan tangen suatu sudut tirus.', 'Sinus, Kosinus dan Tangen bagi Sudut Tirus dalam Segi Tiga Bersudut Tegak', 'Nisbah Trigonometri'),
          makeBmSp('5.1.5', 'Menentukan nilai sinus, kosinus dan tangen sudut 30, 45 dan 60 tanpa menggunakan kalkulator.', 'Sinus, Kosinus dan Tangen bagi Sudut Tirus dalam Segi Tiga Bersudut Tegak', 'Nisbah Trigonometri'),
          makeBmSp('5.1.6', 'Melakukan pengiraan yang melibatkan sinus, kosinus dan tangen.', 'Sinus, Kosinus dan Tangen bagi Sudut Tirus dalam Segi Tiga Bersudut Tegak', 'Nisbah Trigonometri'),
          makeBmSp('5.1.7', 'Menyelesaikan masalah yang melibatkan sinus, kosinus dan tangen. TA.', 'Sinus, Kosinus dan Tangen bagi Sudut Tirus dalam Segi Tiga Bersudut Tegak', 'Nisbah Trigonometri'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B6',
    tingkatan: 'Tingkatan 3',
    nomborBab: 6,
    tema: 'Sukatan dan Geometri',
    tajuk: 'Sudut dan Tangen bagi Bulatan',
    peneranganRingkas: 'Bab 6 Matematik Tingkatan 3: Sudut dan Tangen bagi Bulatan (Sukatan dan Geometri)',
    skList: [
      {
        kod: '6.1',
        tajuk: 'Sudut pada Lilitan dan Sudut Pusat yang Dicangkum oleh Suatu Lengkok',
        spList: [
          makeBmSp('6.1.1', 'Membuat dan menentusahkan konjektur tentang hubungan antara (i) sudut-sudut pada lilitan, (ii) sudut pada lilitan dan sudut pusat yang dicangkum oleh lengkok tertentu, dan seterusnya menggunakan hubungan tersebut untuk menentukan nilai sudut dalam bulatan.', 'Sudut pada Lilitan dan Sudut Pusat yang Dicangkum oleh Suatu Lengkok', 'Sudut dan Tangen bagi Bulatan'),
          makeBmSp('6.1.2', 'Menyelesaikan masalah yang melibatkan sudut dalam bulatan.', 'Sudut pada Lilitan dan Sudut Pusat yang Dicangkum oleh Suatu Lengkok', 'Sudut dan Tangen bagi Bulatan'),
        ],
      },
      {
        kod: '6.2',
        tajuk: 'Sisi Empat Kitaran',
        spList: [
          makeBmSp('6.2.1', 'Mengenal dan memerihalkan sisi empat kitaran.', 'Sisi Empat Kitaran', 'Sudut dan Tangen bagi Bulatan'),
          makeBmSp('6.2.2', 'Membuat dan menentusahkan konjektur tentang hubungan antara sudut-sudut pada sisi empat kitaran, dan seterusnya menggunakan hubungan tersebut untuk menentukan nilai sudut pada sisi empat kitaran.', 'Sisi Empat Kitaran', 'Sudut dan Tangen bagi Bulatan'),
          makeBmSp('6.2.3', 'Menyelesaikan masalah yang melibatkan sisi empat kitaran.', 'Sisi Empat Kitaran', 'Sudut dan Tangen bagi Bulatan'),
        ],
      },
      {
        kod: '6.3',
        tajuk: 'Tangen kepada Bulatan',
        spList: [
          makeBmSp('6.3.1', 'Mengenal dan memerihalkan tangen kepada bulatan.', 'Tangen kepada Bulatan', 'Sudut dan Tangen bagi Bulatan'),
          makeBmSp('6.3.2', 'Membuat dan menentusahkan konjektur tentang (i) sudut di antara tangen dengan jejari bulatan pada titik ketangenan, (ii) sifat-sifat berkaitan dengan dua tangen kepada suatu bulatan, (iii) hubungan sudut di antara tangen dan perentas dengan sudut dalam tembereng selang-seli yang dicangkum oleh perentas itu, dan seterusnya melakukan pengiraan yang berkaitan.', 'Tangen kepada Bulatan', 'Sudut dan Tangen bagi Bulatan'),
          makeBmSp('6.3.3', 'Menyelesaikan masalah yang melibatkan tangen kepada bulatan.', 'Tangen kepada Bulatan', 'Sudut dan Tangen bagi Bulatan'),
        ],
      },
      {
        kod: '6.4',
        tajuk: 'Sudut dan Tangen bagi Bulatan',
        spList: [
          makeBmSp('6.4.1', 'Menyelesaikan masalah yang melibatkan sudut dan tangen bagi bulatan. 55 TA.', 'Sudut dan Tangen bagi Bulatan', 'Sudut dan Tangen bagi Bulatan'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B7',
    tingkatan: 'Tingkatan 3',
    nomborBab: 7,
    tema: 'Sukatan dan Geometri',
    tajuk: 'Pelan dan Dongakan',
    peneranganRingkas: 'Bab 7 Matematik Tingkatan 3: Pelan dan Dongakan (Sukatan dan Geometri)',
    skList: [
      {
        kod: '7.1',
        tajuk: 'Unjuran Ortogon',
        spList: [
          makeBmSp('7.1.1', 'Melukis unjuran ortogon.', 'Unjuran Ortogon', 'Pelan dan Dongakan'),
          makeBmSp('7.1.2', 'Membanding dan membeza antara objek dan unjuran ortogon yang sepadan.', 'Unjuran Ortogon', 'Pelan dan Dongakan'),
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Pelan dan Dongakan',
        spList: [
          makeBmSp('7.2.1', 'Melukis pelan dan dongakan suatu objek mengikut skala.', 'Pelan dan Dongakan', 'Pelan dan Dongakan'),
          makeBmSp('7.2.2', 'Mensintesis pelan dan dongakan suatu objek dan melakar objek tersebut.', 'Pelan dan Dongakan', 'Pelan dan Dongakan'),
          makeBmSp('7.2.3', 'Menyelesaikan masalah yang melibatkan pelan dan dongakan. 59 TAFS.', 'Pelan dan Dongakan', 'Pelan dan Dongakan'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B8',
    tingkatan: 'Tingkatan 3',
    nomborBab: 8,
    tema: 'Sukatan dan Geometri',
    tajuk: 'Lokus dalam Dua Dimensi',
    peneranganRingkas: 'Bab 8 Matematik Tingkatan 3: Lokus dalam Dua Dimensi (Sukatan dan Geometri)',
    skList: [
      {
        kod: '8.1',
        tajuk: 'Lokus',
        spList: [
          makeBmSp('8.1.1', 'Mengenal lokus dalam situasi kehidupan sebenar, dan seterusnya menerangkan maksud lokus.', 'Lokus', 'Lokus dalam Dua Dimensi'),
        ],
      },
      {
        kod: '8.2',
        tajuk: 'Lokus dalam Dua Dimensi',
        spList: [
          makeBmSp('8.2.1', 'Memerihal lokus bagi titik yang (i) berjarak tetap dari satu titik tetap, (ii) berjarak sama dari dua titik tetap, (iii) berjarak tetap dari satu garis lurus, (iv) berjarak sama dari dua garis lurus yang selari, dan (v) berjarak sama dari dua garis lurus yang bersilang, dan seterusnya membina lokus tersebut.', 'Lokus dalam Dua Dimensi', 'Lokus dalam Dua Dimensi'),
          makeBmSp('8.2.2', 'Menentukan lokus yang memenuhi dua atau lebih syarat.', 'Lokus dalam Dua Dimensi', 'Lokus dalam Dua Dimensi'),
          makeBmSp('8.2.3', 'Menyelesaikan masalah yang melibatkan lokus. 62 TAF.', 'Lokus dalam Dua Dimensi', 'Lokus dalam Dua Dimensi'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B9',
    tingkatan: 'Tingkatan 3',
    nomborBab: 9,
    tema: 'Perkaitan dan Algebra',
    tajuk: 'Garis Lurus',
    peneranganRingkas: 'Bab 9 Matematik Tingkatan 3: Garis Lurus (Perkaitan dan Algebra)',
    skList: [
      {
        kod: '9.1',
        tajuk: 'Garis Lurus',
        spList: [
          makeBmSp('9.1.1', 'Membuat perkaitan antara persamaan, y = mx + c, dengan kecerunan dan pintasan-y, dan seterusnya membuat generalisasi tentang persamaan garis lurus.', 'Garis Lurus', 'Garis Lurus'),
          makeBmSp('9.1.2', 'Menyiasat dan mentafsir persamaan garis lurus dalam bentuk lain seperti ax + by = c dan + = 1, serta menukarkan kepada bentuk y = mx + c dan sebaliknya.', 'Garis Lurus', 'Garis Lurus'),
          makeBmSp('9.1.3', 'Menyiasat dan membuat inferens tentang hubungan antara titik pada garis lurus dengan persamaan garis lurus tersebut.', 'Garis Lurus', 'Garis Lurus'),
          makeBmSp('9.1.4', 'Menyiasat dan membuat inferens tentang kecerunan garis selari.', 'Garis Lurus', 'Garis Lurus'),
          makeBmSp('9.1.5', 'Menentukan persamaan suatu garis lurus.', 'Garis Lurus', 'Garis Lurus'),
          makeBmSp('9.1.6', 'Menentukan titik persilangan bagi dua garis lurus.', 'Garis Lurus', 'Garis Lurus'),
          makeBmSp('9.1.7', 'Menyelesaikan masalah yang melibatkan garis lurus. 67 TAF.', 'Garis Lurus', 'Garis Lurus'),
        ],
      },
    ],
  },
];
