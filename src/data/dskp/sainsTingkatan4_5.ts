import { BabKimia } from '../../types/rph';
import { binaSk, binaBabSains } from './sainsTingkatan2_3';

// ============================================================================
// DSKP SAINS TINGKATAN 4 (BAHASA MELAYU) - BAB 1 HINGGA BAB 12
// ============================================================================
export const DSKP_SAINS_F4: BabKimia[] = [
  binaBabSains(
    'S_F4_B1',
    'Tingkatan 4',
    1,
    'Kaedah Saintifik',
    'Langkah Keselamatan dalam Makmal',
    'Peralatan perlindungan diri, pelupusan bahan sisa dan pemadam kebakaran di makmal.',
    [
      binaSk('1.1', 'Peralatan Perlindungan Diri', [
        [
          '1.1.1',
          'Menjelaskan dengan contoh peralatan perlindungan diri serta fungsinya.',
        ],
      ]),
      binaSk('1.2', 'Pelupusan Bahan Sisa', [
        [
          '1.2.1',
          'Menerangkan dengan contoh bahan yang boleh dibuang ke dalam singki.',
        ],
        [
          '1.2.2',
          'Mencirikan bahan yang tidak boleh dibuang ke dalam singki.',
        ],
        [
          '1.2.3',
          'Mengurus bahan sisa biologi mengikut Prosedur Operasi Standard (POS).',
        ],
        [
          '1.2.4',
          'Berkomunikasi mengenai langkah mengurus kemalangan dalam makmal (tumpahan bahan kimia dan merkuri).',
        ],
      ]),
      binaSk('1.3', 'Pemadam Kebakaran', [
        ['1.3.1', 'Berkomunikasi mengenai jenis pemadam kebakaran.'],
        ['1.3.2', 'Menerangkan kaedah penggunaan pemadam kebakaran.'],
        ['1.3.3', 'Menjalankan audit alat pemadam kebakaran di sekolah.'],
        ['1.3.4', 'Mencipta alat pemadam kebakaran ringkas.'],
      ]),
    ]
  ),
  binaBabSains(
    'S_F4_B2',
    'Tingkatan 4',
    2,
    'Kaedah Saintifik',
    'Bantuan Kecemasan',
    'Resusitasi Kardiopulmonari (CPR) dan kaedah Heimlich Manoeuvre.',
    [
      binaSk('2.1', 'Resusitasi Kardiopulmonari (CPR)', [
        ['2.1.1', 'Menyatakan apakah itu CPR dan situasi yang memerlukan CPR.'],
        ['2.1.2', 'Menunjuk cara kaedah CPR.'],
        ['2.1.3', 'Menerangkan kepentingan CPR.'],
      ]),
      binaSk('2.2', 'Heimlich Manoeuvre', [
        ['2.2.1', 'Menerangkan Heimlich Manoeuvre dan kepentingannya.'],
        ['2.2.2', 'Membuat demonstrasi Heimlich Manoeuvre.'],
      ]),
    ]
  ),
  binaBabSains(
    'S_F4_B3',
    'Tingkatan 4',
    3,
    'Kaedah Saintifik',
    'Teknik Mengukur Parameter Kesihatan Badan',
    'Suhu badan, kadar denyutan nadi, tekanan darah dan Indeks Jisim Badan (BMI).',
    [
      binaSk('3.1', 'Suhu Badan', [
        ['3.1.1', 'Mengukur suhu badan menggunakan teknik yang betul.'],
        ['3.1.2', 'Menginterpretasi suhu badan.'],
      ]),
      binaSk('3.2', 'Kadar Denyutan Nadi', [
        ['3.2.1', 'Mengenal pasti titik nadi pada badan.'],
        [
          '3.2.2',
          'Menjalankan eksperimen bagi menentukan kadar denyutan nadi manusia.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 3.2.2: Menentukan kadar denyutan nadi manusia berdasarkan jantina, umur dan aktiviti fizikal.',
            radasBahan: ['Jam randik'],
          },
        ],
      ]),
      binaSk('3.3', 'Tekanan Darah', [
        [
          '3.3.1',
          'Mengenal pasti alat mengukur tekanan darah (sfigmomanometer).',
        ],
        [
          '3.3.2',
          'Mengukur dan merekod tekanan darah (sistolik dan diastolik).',
        ],
        ['3.3.3', 'Menginterpretasi data daripada bacaan tekanan darah.'],
      ]),
      binaSk('3.4', 'Indeks Jisim Badan (BMI)', [
        ['3.4.1', 'Mengira dan menentukan Indeks Jisim Badan.'],
        [
          '3.4.2',
          'Menginterpretasi Indeks Jisim Badan dan membuat keputusan mengenai tindakan yang perlu diambil.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F4_B4',
    'Tingkatan 4',
    4,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Teknologi Hijau dalam Melestarikan Alam',
    'Kelestarian alam sekitar, sektor tenaga, pengurusan sisa dan air sisa, pertanian/perhutanan serta pengangkutan hijau.',
    [
      binaSk('4.1', 'Kelestarian Alam Sekitar', [
        ['4.1.1', 'Mendefinisikan dan mewajarkan Teknologi Hijau dalam kehidupan.'],
        [
          '4.1.2',
          'Menghubung kait kecekapan tenaga dengan teknologi hijau.',
        ],
        [
          '4.1.3',
          'Mengenal pasti sektor dalam Teknologi Hijau.',
        ],
      ]),
      binaSk('4.2', 'Sektor Tenaga', [
        ['4.2.1', 'Memerihalkan isu sosiosaintifik berkaitan sektor tenaga.'],
        [
          '4.2.2',
          'Menerangkan isu sosiosaintifik dalam sektor tenaga.',
        ],
        [
          '4.2.3',
          'Mewajarkan aplikasi teknologi hijau dalam menangani isu sosiosaintifik sektor tenaga.',
        ],
      ]),
      binaSk('4.3', 'Sektor Pengurusan Sisa dan Air Sisa', [
        [
          '4.3.1',
          'Menerangkan isu sosiosaintifik dalam sektor pengurusan sisa dan air sisa.',
        ],
        [
          '4.3.2',
          'Mewajarkan aplikasi teknologi hijau dalam menangani isu sosiosaintifik sektor pengurusan sisa dan air sisa.',
        ],
      ]),
      binaSk('4.4', 'Sektor Pertanian dan Perhutanan', [
        [
          '4.4.1',
          'Menerangkan isu sosiosaintifik dalam sektor pertanian dan perhutanan.',
        ],
        [
          '4.4.2',
          'Mewajarkan aplikasi teknologi hijau dalam menangani isu sosiosaintifik sektor pertanian dan perhutanan.',
        ],
      ]),
      binaSk('4.5', 'Sektor Pengangkutan', [
        [
          '4.5.1',
          'Menerangkan isu sosiosaintifik dalam sektor pengangkutan.',
        ],
        [
          '4.5.2',
          'Mewajarkan aplikasi teknologi hijau dalam menangani isu sosiosaintifik sektor pengangkutan.',
        ],
      ]),
      binaSk('4.6', 'Teknologi Hijau dan Kehidupan', [
        [
          '4.6.1',
          'Mewajarkan peranan setiap individu dalam menangani fenomena pemanasan global dan perubahan iklim dalam mengurangkan jejak kaki karbon.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F4_B5',
    'Tingkatan 4',
    5,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Genetik',
    'Pembahagian sel (mitosis & meiosis), pewarisan, mutasi, teknologi kejuruteraan genetik dan variasi.',
    [
      binaSk('5.1', 'Pembahagian Sel', [
        ['5.1.1', 'Menerangkan gen, asid deoksiribonukleik (DNA) dan kromosom dalam nukleus.'],
        [
          '5.1.2',
          'Membanding dan membezakan mitosis dan meiosis.',
        ],
        [
          '5.1.3',
          'Mewajarkan kepentingan mitosis dan meiosis.',
        ],
      ]),
      binaSk('5.2', 'Pewarisan', [
        ['5.2.1', 'Menerangkan pewarisan dalam manusia.'],
        [
          '5.2.2',
          'Berkomunikasi tentang mekanisme pewarisan (gambar rajah skema kacukan monohibrid dan penentuan jantina).',
        ],
      ]),
      binaSk('5.3', 'Mutasi', [
        ['5.3.1', 'Menghuraikan maksud mutasi dan jenis mutasi (kromosom dan gen).'],
        [
          '5.3.2',
          'Menerangkan dengan contoh faktor yang menyebabkan mutasi gen dan mutasi kromosom.',
        ],
        [
          '5.3.3',
          'Menerangkan dengan contoh penyakit gangguan gen dengan ciri-cirinya dan kaedah mengesan penyakit tersebut.',
        ],
        [
          '5.3.4',
          'Membincangkan aplikasi penyelidikan genetik dalam meningkatkan kualiti kehidupan.',
        ],
        [
          '5.3.5',
          'Membahaskan kesan penyelidikan genetik terhadap kehidupan manusia.',
        ],
      ]),
      binaSk('5.4', 'Teknologi Kejuruteraan Genetik', [
        [
          '5.4.1',
          'Mewajarkan teknologi kejuruteraan genetik (DNA rekombinan dan organisma termodifikasi genetik - GMO).',
        ],
        [
          '5.4.2',
          'Membahaskan kesan teknologi kejuruteraan genetik dalam kehidupan.',
        ],
        [
          '5.4.3',
          'Mewajarkan etika dalam teknologi kejuruteraan genetik.',
        ],
      ]),
      binaSk('5.5', 'Variasi', [
        [
          '5.5.1',
          'Berkomunikasi mengenai variasi selanjar dan variasi tak selanjar.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 5.5.1: Mengkaji variasi selanjar (ketinggian / jisim badan) dan variasi tak selanjar (jenis cap ibu jari / kebolehan menggulung lidah) dalam kalangan murid.',
            radasBahan: [
              'Pita pengukur',
              'Penimbang berat',
              'Pad dakwat',
              'Kertas putih',
              'Kertas graf',
            ],
          },
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F4_B6',
    'Tingkatan 4',
    6,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Sokongan, Pergerakan dan Pertumbuhan',
    'Sokongan, pergerakan dan pertumbuhan haiwan, manusia dan tumbuhan.',
    [
      binaSk('6.1', 'Sokongan, Pergerakan dan Pertumbuhan Haiwan', [
        ['6.1.1', 'Menjelaskan dengan contoh jenis sokongan pada haiwan (rangka dalam, rangka luar dan rangka hidrostatik).'],
        ['6.1.2', 'Menghubungkaitkan saiz rangka luar dengan pertumbuhan.'],
        ['6.1.3', 'Menghubungkaitkan rangka hidrostatik dengan pergerakan.'],
        ['6.1.4', 'Menghuraikan fungsi rangka dalam bagi haiwan.'],
        ['6.1.5', 'Mencerakinkan sistem rangka manusia.'],
        [
          '6.1.6',
          'Menjalankan eksperimen untuk membandingkan kekuatan tulang yang padat dan tulang yang berongga.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 6.1.6: Membandingkan kekuatan silinder berongga dan silinder padat (model tulang berongga vs tulang padat).',
            radasBahan: [
              'Kertas A4',
              'Pita selofan',
              'Penutup kotak',
              'Buku teks / pemberat',
            ],
          },
        ],
        ['6.1.7', 'Menghubungkaitkan sistem sokongan dengan faktor kestabilan haiwan.'],
      ]),
      binaSk('6.2', 'Pergerakan dan Pertumbuhan Manusia', [
        [
          '6.2.1',
          'Menerangkan fungsi sendi dan otot dalam pergerakan.',
        ],
        [
          '6.2.2',
          'Menjana idea yang berkaitan masalah kesihatan berkaitan sendi dan otot dalam kehidupan harian.',
        ],
        ['6.2.3', 'Menerangkan pola pertumbuhan manusia.'],
        [
          '6.2.4',
          'Membanding dan membezakan pola pertumbuhan antara lelaki dan perempuan.',
        ],
      ]),
      binaSk('6.3', 'Sokongan, Pertumbuhan dan Kestabilan dalam Tumbuhan', [
        [
          '6.3.1',
          'Menerangkan sistem sokongan tumbuhan daratan dan akuatik.',
        ],
        ['6.3.2', 'Menentukan usia tumbuhan berkayu.'],
        ['6.3.3', 'Menghubungkaitkan sistem sokongan dan kestabilan dalam tumbuhan.'],
        [
          '6.3.4',
          'Menjalankan eksperimen untuk mendapatkan pola pertumbuhan tumbuhan.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 6.3.4: Mengkaji pola pertumbuhan anak benih kacang hijau.',
            radasBahan: [
              'Biji benih kacang hijau',
              'Kapas lembap',
              'Piring Petri',
              'Pembaris',
              'Benang',
            ],
          },
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F4_B7',
    'Tingkatan 4',
    7,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Koordinasi Badan',
    'Sistem endokrin manusia, gangguan kepada koordinasi badan serta minda yang sihat dan baik.',
    [
      binaSk('7.1', 'Sistem Endokrin Manusia', [
        ['7.1.1', 'Menerangkan sistem endokrin dan fungsinya.'],
        [
          '7.1.2',
          'Menjelaskan dengan contoh punca dan kesan ketidakseimbangan hormon ke atas kesihatan.',
        ],
      ]),
      binaSk('7.2', 'Gangguan kepada Koordinasi Badan', [
        [
          '7.2.1',
          'Menerangkan dengan contoh jenis dadah.',
        ],
        [
          '7.2.2',
          'Menaakul mengenai kesan penyalahgunaan dadah dan alkohol ke atas koordinasi badan dan kesihatan mental.',
        ],
      ]),
      binaSk('7.3', 'Minda yang Sihat', [
        [
          '7.3.1',
          'Mewajarkan keperluan masyarakat yang mempunyai minda yang sihat.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F4_B8',
    'Tingkatan 4',
    8,
    'Penerokaan Unsur dalam Alam',
    'Unsur dan Bahan',
    'Asas jirim (bahan atom, molekul, ion), Jadual Berkala Unsur Moden dan isotop.',
    [
      binaSk('8.1', 'Asas Jirim', [
        [
          '8.1.1',
          'Menerangkan dengan contoh bahan atom, bahan molekul dan bahan ion.',
        ],
        ['8.1.2', 'Menerangkan kewujudan unsur dalam pelbagai bentuk.'],
      ]),
      binaSk('8.2', 'Jadual Berkala Unsur Moden', [
        ['8.2.1', 'Mencerakinkan Jadual Berkala Unsur Moden.'],
        ['8.2.2', 'Mendeduksikan prinsip susunan unsur dalam Jadual Berkala Unsur Moden.'],
        ['8.2.3', 'Melakar dan menulis susunan elektron unsur dalam kumpulan.'],
        ['8.2.4', 'Menjelaskan pembentukan ion positif dan ion negatif.'],
        ['8.2.5', 'Mewajarkan pendermaan dan penerimaan elektron untuk mencapai susunan elektron stabil.'],
      ]),
      binaSk('8.3', 'Isotop', [
        ['8.3.1', 'Menerangkan isotop dengan contoh.'],
        ['8.3.2', 'Menentukan bilangan proton, bilangan neutron dan nombor nukleon dalam isotop.'],
        ['8.3.3', 'Berkomunikasi mengenai kegunaan isotop dalam pelbagai bidang.'],
      ]),
    ]
  ),
  binaBabSains(
    'S_F4_B9',
    'Tingkatan 4',
    9,
    'Penerokaan Unsur dalam Alam',
    'Kimia Industri',
    'Aloi dan superkonduktor, kaca dan seramik serta polimer semula jadi dan sintetik.',
    [
      binaSk('9.1', 'Aloi', [
        ['9.1.1', 'Mentakrif dan memberi contoh aloi berdasarkan komposisi unsur dalam aloi.'],
        [
          '9.1.2',
          'Menjalankan eksperimen bagi membanding ciri aloi dengan logam tulennya.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 9.1.2: Membandingkan ciri aloi dengan logam tulennya dari segi kekerasan dan ketahanan terhadap kakisan.',
            radasBahan: [
              'Bongkah kuprum',
              'Bongkah gangsa / loyang',
              'Bebola keluli',
              'Pemberat 1 kg',
              'Paku besi',
              'Paku keluli nirkarat',
              'Tabung uji',
            ],
          },
        ],
        ['9.1.3', 'Mewajarkan kegunaan aloi dalam kehidupan harian.'],
      ]),
      binaSk('9.2', 'Kaca dan Seramik', [
        ['9.2.1', 'Memerihalkan komponen kaca dan seramik.'],
        ['9.2.2', 'Menerangkan dengan contoh aplikasi kaca dan seramik.'],
        ['9.2.3', 'Mewajarkan kesesuaian penggunaan kaca dan seramik dalam kehidupan harian.'],
      ]),
      binaSk('9.3', 'Polimer', [
        ['9.3.1', 'Menerangkan polimer semula jadi dan polimer sintetik.'],
        ['9.3.2', 'Menerangkan proses pempolimeran penambahan.'],
        [
          '9.3.3',
          'Berkomunikasi mengenai ciri dan proses pemvulkanan getah.',
        ],
        [
          '9.3.4',
          'Menjana idea tentang teknologi terkini berasaskan getah.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F4_B10',
    'Tingkatan 4',
    10,
    'Penerokaan Unsur dalam Alam',
    'Kimia dalam Perubatan dan Kesihatan',
    'Perubatan tradisional, moden dan komplementari, radikal bebas, bahan antioksidan serta produk kesihatan.',
    [
      binaSk('10.1', 'Perubatan Tradisional, Perubatan Moden dan Perubatan Komplementari', [
        [
          '10.1.1',
          'Menerangkan ciri perubatan tradisional, perubatan moden dan perubatan komplementari.',
        ],
        [
          '10.1.2',
          'Menerangkan ubat-ubatan yang digunakan dalam perubatan tradisional, moden dan komplementari.',
        ],
        [
          '10.1.3',
          'Mewajarkan penggunaan perubatan tradisional, moden dan komplementari.',
        ],
        [
          '10.1.4',
          'Menaakul mengenai penggunaan ubat dari sumber semula jadi dan buatan manusia dalam perawatan dan penjagaan kesihatan.',
        ],
        [
          '10.1.5',
          'Merumuskan kesan penyalahgunaan ubat-ubatan.',
        ],
      ]),
      binaSk('10.2', 'Radikal Bebas', [
        ['10.2.1', 'Mendefinisikan radikal bebas.'],
        ['10.2.2', 'Menaakul mengenai kesan radikal bebas terhadap kesihatan manusia.'],
      ]),
      binaSk('10.3', 'Bahan Antioksidan', [
        ['10.3.1', 'Memerihalkan bahan antioksidan.'],
        ['10.3.2', 'Menerangkan tindakan bahan antioksidan ke atas radikal bebas.'],
        [
          '10.3.3',
          'Menjalankan eksperimen untuk mengkaji faktor-faktor yang mempengaruhi pengoksidaan makanan.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 10.3.3: Mengkaji kesan jenis larutan berbeza terhadap pengoksidaan hirisan buah epal.',
            radasBahan: [
              'Hirisan epal segar',
              'Jus limau',
              'Larutan natrium bikarbonat',
              'Larutan garam biasa',
              'Larutan gula',
              'Bikar',
            ],
          },
        ],
      ]),
      binaSk('10.4', 'Produk Kesihatan', [
        ['10.4.1', 'Menerangkan maksud bahan aktif dalam produk kesihatan.'],
        [
          '10.4.2',
          'Mewajarkan penggunaan produk kesihatan yang terdapat dalam pasaran.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F4_B11',
    'Tingkatan 4',
    11,
    'Tenaga dan Kelestarian Hidup',
    'Daya dan Gerakan',
    'Gerakan linear, graf gerakan linear, pecutan graviti dan jatuh bebas serta jisim dan inersia.',
    [
      binaSk('11.1', 'Gerakan Linear', [
        ['11.1.1', 'Menerangkan jarak dan sesaran serta unit S.I. masing-masing.'],
        [
          '11.1.2',
          'Menerangkan dengan contoh maksud laju, laju purata, halaju dan pecutan serta magnitud dan arahnya.',
        ],
        [
          '11.1.3',
          'Menyelesaikan masalah yang melibatkan laju, laju purata, halaju dan pecutan dalam kehidupan harian.',
        ],
        ['11.1.4', 'Membezakan jenis gerakan linear.'],
      ]),
      binaSk('11.2', 'Graf Gerakan Linear', [
        [
          '11.2.1',
          'Mentafsir jenis gerakan dari graf gerakan linear untuk menentukan jarak, sesaran, halaju, halaju purata dan pecutan.',
        ],
      ]),
      binaSk('11.3', 'Pecutan Graviti dan Jatuh Bebas', [
        [
          '11.3.1',
          'Menjalankan eksperimen untuk menentukan nilai pecutan graviti bumi, g.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 11.3.1: Menentukan nilai pecutan graviti bumi, g menggunakan jangka masa detik.',
            radasBahan: [
              'Jangka masa detik',
              'Pita detik',
              'Bekalan kuasa AU 12 V',
              'Pemberat',
              'Kaki retort',
            ],
          },
        ],
        ['11.3.2', 'Mentafsir graf gerakan untuk objek yang mengalami keadaan jatuh bebas.'],
        [
          '11.3.3',
          'Menjalankan eksperimen mengkaji keadaan jatuh bebas dan bukan jatuh bebas.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 11.3.3: Mengkaji masa yang diambil oleh objek jatuh bebas dan bukan jatuh bebas.',
            radasBahan: [
              'Tiub silinder lutsinar',
              'Pam vakum',
              'Bulu pelepah / Cebisan kertas',
              'Duit syiling / Bebola logam',
            ],
          },
        ],
      ]),
      binaSk('11.4', 'Jisim dan Inersia', [
        ['11.4.1', 'Menerangkan jisim.'],
        ['11.4.2', 'Menerangkan dengan contoh maksud inersia.'],
        [
          '11.4.3',
          'Menjalankan eksperimen untuk mengkaji hubungan antara jisim dan inersia.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 11.4.3: Mengkaji hubungan antara jisim dengan inersia menggunakan neraca inersia (bilah gergaji).',
            radasBahan: [
              'Bilah gergaji',
              'Pengapit-G',
              'Plastisin (pelbagai jisim)',
              'Jam randik',
            ],
          },
        ],
        [
          '11.4.4',
          'Berkomunikasi tentang kesan inersia dalam kehidupan harian.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F4_B12',
    'Tingkatan 4',
    12,
    'Tenaga dan Kelestarian Hidup',
    'Tenaga Nuklear',
    'Penggunaan tenaga nuklear, penghasilan tenaga nuklear (pembelahan & pelakuran) serta impak penggunaan tenaga nuklear.',
    [
      binaSk('12.1', 'Penggunaan Tenaga Nuklear', [
        [
          '12.1.1',
          'Mewajarkan penggunaan tenaga nuklear bagi negara yang telah dikenal pasti.',
        ],
      ]),
      binaSk('12.2', 'Penghasilan Tenaga Nuklear', [
        [
          '12.2.1',
          'Memerihalkan penghasilan tenaga nuklear melalui pembelahan nukleus dan pelakuran nukleus.',
        ],
        [
          '12.2.2',
          'Memerihalkan penjanaan tenaga elektrik daripada tenaga nuklear dalam reaktor nuklear.',
        ],
        [
          '12.2.3',
          'Mewajarkan penggunaan tenaga nuklear sebagai tenaga alternatif untuk menjana tenaga elektrik.',
        ],
      ]),
      binaSk('12.3', 'Impak Penggunaan Tenaga Nuklear', [
        ['12.3.1', 'Menceritakan impak penggunaan senjata nuklear kepada hidupan dan persekitaran.'],
        ['12.3.2', 'Merumuskan impak ujian nuklear ke atas persekitaran.'],
      ]),
      binaSk('12.4', 'Tenaga Nuklear di Malaysia', [
        [
          '12.4.1',
          'Mewajarkan pembinaan stesen janakuasa nuklear di Malaysia.',
        ],
      ]),
    ]
  ),
];

// ============================================================================
// DSKP SAINS TINGKATAN 5 (BAHASA MELAYU) - BAB 1 HINGGA BAB 9
// ============================================================================
export const DSKP_SAINS_F5: BabKimia[] = [
  binaBabSains(
    'S_F5_B1',
    'Tingkatan 5',
    1,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Mikroorganisma',
    'Dunia mikroorganisma (fungi, alga, protozoa, bakteria, virus), mikroorganisma berfaedah serta pencegahan dan rawatan penyakit.',
    [
      binaSk('1.1', 'Dunia Mikroorganisma', [
        ['1.1.1', 'Berkomunikasi mengenai mikroorganisma (flora normal dan pengelasan mikroorganisma).'],
        [
          '1.1.2',
          'Menjalankan eksperimen bagi menunjukkan kewujudan mikroorganisma.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 1.1.2: Menunjukkan kewujudan mikroorganisma pada tangan (sebelum dan selepas dibasuh).',
            radasBahan: [
              'Agar-agar nutrien steril',
              'Piring Petri',
              'Pita selofan',
              'Sabun / Pembersih tangan',
            ],
          },
        ],
        [
          '1.1.3',
          'Menjalankan eksperimen untuk mengkaji faktor yang mempengaruhi pertumbuhan mikroorganisma.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 1.1.3: Mengkaji faktor yang mempengaruhi pertumbuhan mikroorganisma (nutrien, kelembapan, cahaya, suhu dan nilai pH).',
            radasBahan: [
              'Agar-agar nutrien steril',
              'Kultur bakteria Bacillus subtilis',
              'Piring Petri',
              'Asid hidroklorik cair',
              'Natrium hidroksida cair',
            ],
          },
        ],
      ]),
      binaSk('1.2', 'Mikroorganisma Berfaedah', [
        [
          '1.2.1',
          'Mewajarkan aplikasi mikroorganisma berfaedah dalam kehidupan (perubatan, pertanian, perindustrian).',
        ],
        [
          '1.2.2',
          'Menjana idea potensi kegunaan mikroorganisma dalam bioteknologi dan kelestarian alam sekitar (serum bakteria, ekoenzim).',
        ],
      ]),
      binaSk('1.3', 'Pencegahan dan Rawatan Penyakit yang Disebabkan oleh Mikroorganisma', [
        ['1.3.1', 'Menjelaskan konsep "mencegah lebih baik daripada merawat" penyakit yang dibawa oleh mikroorganisma.'],
        ['1.3.2', 'Menerangkan teknik aseptik dalam pengawalan penyebaran mikroorganisma.'],
        [
          '1.3.3',
          'Menjalankan eksperimen mengkaji kesan antibiotik terhadap pertumbuhan bakteria.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 1.3.3: Mengkaji kesan kepekatan antibiotik (penisilin) terhadap pertumbuhan bakteria.',
            radasBahan: [
              'Agar-agar nutrien steril',
              'Kultur bakteria',
              'Cakera antibiotik (kepekatan berbeza)',
              'Cakera kertas turas',
              'Piring Petri',
              'Pembaris',
            ],
          },
        ],
        [
          '1.3.4',
          'Berkomunikasi tentang kaedah rawatan penyakit berjangkit (antibiotik, antifungal dan antiviral).',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F5_B2',
    'Tingkatan 5',
    2,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Nutrisi dan Teknologi Makanan',
    'Gizi seimbang dan nilai kalori, keperluan nutrien oleh tumbuhan, kitar nitrogen, teknologi pengeluaran dan pemprosesan makanan.',
    [
      binaSk('2.1', 'Gizi Seimbang dan Nilai Kalori', [
        ['2.1.1', 'Memerihalkan gizi seimbang.'],
        [
          '2.1.2',
          'Menjalankan eksperimen untuk menganggarkan nilai kalori dalam sampel makanan.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 2.1.2: Menganggarkan nilai kalori dalam beberapa sampel makanan menggunakan kalorimeter ringkas.',
            radasBahan: [
              'Tabung didih',
              'Termometer',
              'Jarum',
              'Plastisin',
              'Sampel makanan (kacang tanah, roti, ikan bilis)',
              'Air suling',
              'Neraca elektronik',
            ],
          },
        ],
        [
          '2.1.3',
          'Mewajarkan kesan pengambilan jumlah kalori yang tidak menepati keperluan individu.',
        ],
      ]),
      binaSk('2.2', 'Keperluan Nutrien oleh Tumbuhan', [
        [
          '2.2.1',
          'Menjelaskan dengan contoh fungsi makronutrien dan mikronutrien kepada tumbuhan.',
        ],
        [
          '2.2.2',
          'Menjalankan eksperimen untuk mengkaji kesan kekurangan makronutrien kepada tumbuhan.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 2.2.2: Mengkaji kesan kekurangan nitrogen, fosforus dan kalium terhadap pertumbuhan tumbuhan.',
            radasBahan: [
              'Tabung didih',
              'Larutan kultur Knop lengkap',
              'Larutan kultur tanpa nitrogen / fosforus / kalium',
              'Anak benih jagung / kacang hijau',
              'Kertas hitam',
            ],
          },
        ],
      ]),
      binaSk('2.3', 'Kitar Nitrogen', [
        [
          '2.3.1',
          'Berkomunikasi mengenai Kitar Nitrogen dan kepentingannya.',
        ],
      ]),
      binaSk('2.4', 'Teknologi Pengeluaran Makanan', [
        [
          '2.4.1',
          'Berkomunikasi mengenai cara meningkatkan kualiti dan kuantiti pengeluaran makanan.',
        ],
        [
          '2.4.2',
          'Menilai penggunaan racun serangga dan kawalan biologi dalam meningkatkan kualiti dan kuantiti pengeluaran makanan.',
        ],
      ]),
      binaSk('2.5', 'Teknologi Pemprosesan Makanan', [
        [
          '2.5.1',
          'Berkomunikasi mengenai teknologi pemprosesan makanan.',
        ],
      ]),
      binaSk('2.6', 'Makanan Kesihatan dan Suplemen Kesihatan', [
        [
          '2.6.1',
          'Berkomunikasi mengenai isu berkaitan makanan kesihatan dan suplemen kesihatan.',
        ],
        [
          '2.6.2',
          'Berkomunikasi mengenai isu berkaitan Status Halal makanan.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F5_B3',
    'Tingkatan 5',
    3,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Kelestarian Alam Sekitar',
    'Kitaran hayat produk, jejak kaki karbon, pencemaran alam sekitar (BOD & mikroorganisma efektif) serta pemeliharaan alam.',
    [
      binaSk('3.1', 'Kitaran Hayat Produk', [
        ['3.1.1', 'Menjelaskan maksud jejak kaki karbon (carbon footprint).'],
        ['3.1.2', 'Mencerakinkan produk yang digunakan dalam satu hari kehidupan seorang individu.'],
        [
          '3.1.3',
          'Mewajarkan tindakan yang perlu diambil iaitu langkah tapak tangan karbon (carbon handprint) bagi mengurangkan pembebasan gas rumah hijau dalam satu hari kehidupan individu.',
        ],
        ['3.1.4', 'Berkomunikasi mengenai kitar hayat satu produk (cradle-to-cradle & cradle-to-grave).'],
        ['3.1.5', 'Menjana idea pengurusan yang cekap bagi sisa plastik ke arah kelestarian alam sekitar.'],
      ]),
      binaSk('3.2', 'Pencemaran Alam Sekitar', [
        [
          '3.2.1',
          'Menerangkan jenis dan punca pencemaran alam sekitar.',
        ],
        [
          '3.2.2',
          'Mengkaji tahap pencemaran air daripada sisa domestik.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 3.2.2: Menentukan tahap pencemaran air (Keperluan Oksigen Biokimia, BOD) dalam pelbagai sampel air menggunakan larutan metilena biru.',
            radasBahan: [
              'Botol reagen bertutup',
              'Picagari',
              'Larutan metilena biru 0.1%',
              'Sampel air longkang / sungai / kolam / air suling',
              'Jam randik',
            ],
          },
        ],
        [
          '3.2.3',
          'Mereka cipta kaedah pembersihan air yang tercemar menggunakan teknologi hijau (bebola lumpur mikroorganisma efektif - EM).',
        ],
      ]),
      binaSk('3.3', 'Pemeliharaan dan Pemuliharaan Alam Sekitar', [
        [
          '3.3.1',
          'Mewajarkan peranan setiap individu dalam mengurus sumber semula jadi untuk mengekalkan keseimbangan alam sekitar.',
        ],
        [
          '3.3.2',
          'Membahaskan peranan Pertubuhan Bangsa-Bangsa Bersatu (PBB) dalam menangani isu alam sekitar pada peringkat global.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F5_B4',
    'Tingkatan 5',
    4,
    'Penerokaan Unsur dalam Alam',
    'Kadar Tindak Balas',
    'Pengenalan kadar tindak balas, faktor yang mempengaruhi kadar tindak balas dan aplikasi konsep kadar tindak balas.',
    [
      binaSk('4.1', 'Pengenalan Kadar Tindak Balas', [
        [
          '4.1.1',
          'Menjelaskan melalui contoh tindak balas cepat dan tindak balas perlahan dalam kehidupan harian.',
        ],
        ['4.1.2', 'Mentakrif kadar tindak balas.'],
        ['4.1.3', 'Menentukan kadar tindak balas (purata dan pada masa tertentu daripada graf).'],
      ]),
      binaSk('4.2', 'Faktor yang Mempengaruhi Kadar Tindak Balas', [
        [
          '4.2.1',
          'Menjalankan eksperimen untuk mengkaji faktor yang mempengaruhi kadar tindak balas.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 4.2.1: Mengkaji faktor suhu, kepekatan, saiz bahan tindak balas dan mangkin yang mempengaruhi kadar tindak balas.',
            radasBahan: [
              'Kelalang kon',
              'Buret',
              'Besen air',
              'Jam randik',
              'Larutan natrium tiosulfat',
              'Asid sulfurik / Asid hidroklorik',
              'Ketulan marmar',
              'Pita magnesium',
            ],
          },
        ],
      ]),
      binaSk('4.3', 'Aplikasi Konsep Kadar Tindak Balas', [
        [
          '4.3.1',
          'Berkomunikasi mengenai aplikasi konsep kadar tindak balas dalam kehidupan harian dan industri (Proses Haber dan Proses Sentuh).',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F5_B5',
    'Tingkatan 5',
    5,
    'Penerokaan Unsur dalam Alam',
    'Sebatian Karbon',
    'Kitar karbon, hidrokarbon (alkana & alkena), alkohol, lemak serta minyak sawit dan penghasilan sabun.',
    [
      binaSk('5.1', 'Pengenalan Sebatian Karbon', [
        ['5.1.1', 'Mengenal pasti sebatian karbon dalam alam.'],
        ['5.1.2', 'Menjelaskan kepentingan Kitar Karbon.'],
      ]),
      binaSk('5.2', 'Hidrokarbon', [
        ['5.2.1', 'Memerihalkan sebatian hidrokarbon dan menerangkan bagaimana sebatian hidrokarbon diperoleh daripada sumber semula jadi.'],
        ['5.2.2', 'Menamakan ahli kumpulan homolog alkana dan alkena dari karbon 1 hingga karbon 6.'],
        ['5.2.3', 'Berkomunikasi tentang sumber tenaga alternatif dan tenaga boleh baharu dalam kehidupan harian.'],
      ]),
      binaSk('5.3', 'Alkohol', [
        [
          '5.3.1',
          'Memerihalkan proses penyediaan alkohol.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 5.3.1: Menyediakan etanol melalui proses penapaian dan penyulingan.',
            radasBahan: [
              'Kelalang kon',
              'Yis',
              'Larutan glukosa / Jus buah',
              'Air kapur',
              'Radas penyulingan Liebig',
            ],
          },
        ],
        ['5.3.2', 'Mengenal pasti sifat fizik dan sifat kimia alkohol.'],
        ['5.3.3', 'Berkomunikasi tentang kegunaan alkohol dalam kehidupan harian.'],
        ['5.3.4', 'Berkomunikasi tentang kesan pengambilan alkohol secara berlebihan.'],
      ]),
      binaSk('5.4', 'Lemak', [
        ['5.4.1', 'Menyatakan kandungan lemak serta sumbernya.'],
        ['5.4.2', 'Membanding dan membezakan antara lemak tepu dan lemak tak tepu.'],
        ['5.4.3', 'Menjelaskan dengan contoh kesan pengambilan makanan yang mengandungi lemak berlebihan terhadap kesihatan.'],
      ]),
      binaSk('5.5', 'Minyak Sawit', [
        ['5.5.1', 'Memerihalkan struktur buah kelapa sawit.'],
        ['5.5.2', 'Mengenal pasti aspek kuantiti minyak daripada sabut dan isirung.'],
        ['5.5.3', 'Menerangkan urutan proses pengestrakan minyak sawit secara industri.'],
        ['5.5.4', 'Memerihalkan komponen dalam minyak sawit.'],
        ['5.5.5', 'Membanding dan membezakan komposisi minyak sawit dengan minyak sayuran lain.'],
        ['5.5.6', 'Menyatakan sifat kimia bagi minyak sawit.'],
        ['5.5.7', 'Menerangkan proses pengemulsian bagi minyak sawit.'],
        ['5.5.8', 'Menyenaraikan kandungan nutrisi dalam minyak sawit.'],
        ['5.5.9', 'Mewajarkan penggunaan minyak sawit dalam bidang penjagaan kesihatan dan makanan.'],
        [
          '5.5.10',
          'Menjalankan eksperimen menghasilkan sabun melalui proses saponifikasi.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 5.5.10: Menghasilkan sabun daripada minyak sawit melalui proses saponifikasi.',
            radasBahan: [
              'Minyak sawit',
              'Larutan natrium hidroksida pekat (5 M)',
              'Serbuk natrium klorida',
              'Bikar',
              'Penunu Bunsen',
              'Kertas turas',
            ],
          },
        ],
        ['5.5.11', 'Berkomunikasi mengenai tindakan pencucian sabun.'],
        ['5.5.12', 'Menjana idea pengurusan yang lestari dan kepentingannya dalam industri kelapa sawit.'],
      ]),
    ]
  ),
  binaBabSains(
    'S_F5_B6',
    'Tingkatan 5',
    6,
    'Penerokaan Unsur dalam Alam',
    'Elektrokimia',
    'Sel elektrolitik (elektrolisis dan penyaduran logam) serta sel kimia ringkas.',
    [
      binaSk('6.1', 'Sel Elektrolitik', [
        ['6.1.1', 'Memahami elektrolisis (anod, katod, anion, kation dan elektrolit).'],
        [
          '6.1.2',
          'Menjalankan eksperimen untuk mengkaji proses elektrolisis bagi sebatian ion dalam pelbagai keadaan.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 6.1.2: Mengkaji proses elektrolisis bagi sebatian ion dalam keadaan pepejal, leburan dan akueus.',
            radasBahan: [
              'Sel elektrolitik',
              'Elektrod karbon',
              'Mangkuk pijar',
              'Plumbum(II) bromida',
              'Larutan kuprum(II) sulfat',
              'Ammeter',
              'Bateri',
            ],
          },
        ],
        [
          '6.1.3',
          'Menjalankan eksperimen bagi mengkaji faktor yang mempengaruhi hasil elektrolisis.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 6.1.3: Mengkaji faktor kedudukan ion dalam siri elektrokimia, kepekatan elektrolit dan jenis elektrod yang mempengaruhi hasil elektrolisis.',
          },
        ],
        [
          '6.1.4',
          'Berkomunikasi mengenai aplikasi elektrolisis dalam industri (pengekstrakan logam, penyaduran logam, penulenan logam dan pengolahan air sisa).',
        ],
      ]),
      binaSk('6.2', 'Sel Kimia', [
        ['6.2.1', 'Menerangkan perubahan tenaga dalam sel kimia ringkas.'],
        [
          '6.2.2',
          'Menjana idea tentang aplikasi konsep sel kimia dalam menghasilkan tenaga elektrik daripada pelbagai sumber.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 6.2.2: Membina sel kimia ringkas menggunakan pasangan logam berbeza dan sumber elektrolit semula jadi (buah-buahan/air laut).',
            radasBahan: [
              'Kepingan kuprum',
              'Kepingan zink / magnesium / besi',
              'Voltmeter',
              'Larutan natrium klorida / Buah limau',
              'Wayar penyambung',
            ],
          },
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F5_B7',
    'Tingkatan 5',
    7,
    'Tenaga dan Kelestarian Hidup',
    'Cahaya dan Optik',
    'Pembentukan imej oleh kanta cembung dan kanta cekung serta peralatan optik (kanta pembesar, mikroskop, teleskop).',
    [
      binaSk('7.1', 'Pembentukan Imej oleh Kanta', [
        ['7.1.1', 'Memerihalkan kanta cembung sebagai kanta penumpu dan kanta cekung sebagai kanta pencapah.'],
        [
          '7.1.2',
          'Menentukan panjang fokus bagi suatu kanta cembung menggunakan objek jauh.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 7.1.2: Menentukan panjang fokus bagi suatu kanta cembung menggunakan objek jauh.',
            radasBahan: [
              'Kanta cembung',
              'Pemegang kanta',
              'Skrin putih',
              'Pembaris meter',
            ],
          },
        ],
        [
          '7.1.3',
          'Menentukan ciri imej melalui gambar rajah sinar untuk imej yang dibentuk oleh kanta cembung dan kanta cekung.',
        ],
      ]),
      binaSk('7.2', 'Peralatan Optik', [
        ['7.2.1', 'Memerihalkan pembentukan imej akhir oleh teleskop dan mikroskop.'],
        ['7.2.2', 'Mereka bentuk dan membina teleskop ringkas.'],
        ['7.2.3', 'Berkomunikasi tentang aplikasi kanta dalam peralatan optik.'],
      ]),
    ]
  ),
  binaBabSains(
    'S_F5_B8',
    'Tingkatan 5',
    8,
    'Tenaga dan Kelestarian Hidup',
    'Daya dan Tekanan',
    'Prinsip Pascal dan sistem hidraulik serta Prinsip Bernoulli dalam kehidupan harian.',
    [
      binaSk('8.1', 'Tekanan dalam Bendalir', [
        ['8.1.1', 'Menjelaskan konsep tekanan dalam bendalir dalam suatu sistem yang tertutup (Prinsip Pascal).'],
        [
          '8.1.2',
          'Berkomunikasi mengenai aplikasi Prinsip Pascal dalam kehidupan harian (jek hidraulik dan brek hidraulik).',
        ],
        [
          '8.1.3',
          'Menjelaskan perkaitan halaju bendalir dengan tekanan (Prinsip Bernoulli dan tiub Venturi).',
        ],
        [
          '8.1.4',
          'Berkomunikasi mengenai aplikasi Prinsip Bernoulli dalam kehidupan harian (bentuk aerofoil sayap kapal terbang, penunu Bunsen).',
        ],
        [
          '8.1.5',
          'Mereka bentuk alat menggunakan prinsip tekanan dalam bendalir.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F5_B9',
    'Tingkatan 5',
    9,
    'Penerokaan Bumi dan Angkasa Lepas',
    'Teknologi Angkasa Lepas',
    'Satelit (jenis orbit, fungsi, stesen angkasa lepas) dan Sistem Penentu Sejagat (GPS).',
    [
      binaSk('9.1', 'Satelit', [
        ['9.1.1', 'Menerangkan jenis-jenis orbit satelit (LEO, MEO, GEO, HEO, GSO).'],
        ['9.1.2', 'Menjelaskan dengan menggunakan gambar rajah kedudukan apogi dan perigi satu satelit dalam orbit elips.'],
        ['9.1.3', 'Membuat perkaitan hubungan antara ketinggian orbit dengan halaju satelit.'],
        ['9.1.4', 'Menerangkan bagaimana satelit dilancarkan dan ditempatkan dalam orbit.'],
        ['9.1.5', 'Menerangkan fungsi stesen angkasa lepas (ISS).'],
        ['9.1.6', 'Berkomunikasi mengenai kaedah menjejaki stesen angkasa lepas.'],
        ['9.1.7', 'Menghuraikan kesan perkembangan pesat dalam teknologi angkasa lepas (bahan buangan di angkasa lepas / space junk).'],
      ]),
      binaSk('9.2', 'Sistem Penentu Sejagat (Global Positioning System, GPS)', [
        ['9.2.1', 'Menerangkan tentang Sistem Penentu Sejagat (GPS).'],
        [
          '9.2.2',
          'Mengaplikasikan sistem koordinat GPS untuk tujuan navigasi (format DMS dan DD).',
        ],
      ]),
    ]
  ),
];
