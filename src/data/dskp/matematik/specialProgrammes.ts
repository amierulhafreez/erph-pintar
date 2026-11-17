import { BabMatematik, Tingkatan } from '../../../types/rph';

function createSpecialMatematikBabBM(tingkatan: Tingkatan): BabMatematik {
  const num = tingkatan.replace(/\D/g, '') || '4';
  return {
    id: `M_F${num}_KHAS`,
    tingkatan,
    nomborBab: 0,
    tema: 'Program Khas Akademik & Ko-Akademik (Tanpa Silibus)',
    tajuk: 'Ulangkaji, Slot Gemilang, Slot Mumtaz & Minggu Peperiksaan/Aktiviti',
    peneranganRingkas:
      'Khas untuk sesi ulangkaji berfokus, Slot Gemilang, Slot Mumtaz MRSM/SBP, minggu peperiksaan dan minggu aktiviti sekolah tanpa terikat kepada bab silibus.',
    isProgramKhas: true,
    skList: [
      {
        kod: 'K1.0',
        tajuk: 'Aktiviti Ulangkaji Berfokus & Klinik Matematik',
        spList: [
          {
            kod: 'K1.1',
            tajuk: 'Ulangkaji Topikal & Latih Tubi Berfokus Kertas 1 dan Kertas 2 Matematik.',
            objektifCadangan: [
              'Di akhir sesi ulangkaji, murid dapat menyelesaikan sekurang-kurangnya 10 soalan objektif Kertas 1 dan 2 soalan struktur/panjang Kertas 2 dengan kaedah pengiraan yang tepat.',
              'Mengenal pasti kesilapan lazim (common mistakes) dalam manipulasi algebra dan pengiraan berangka.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid berjaya menjawab sekurang-kurangnya 80% soalan ulangkaji topikal dengan langkah kerja lengkap.',
              'Murid dapat menerangkan formula dan kaedah algoritma yang betul mengikut skema pemarkahan.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Guru mengimbas kembali konsep utama topik sasaran menggunakan peta minda formula ringkas dan kuiz pantas 3 minit.',
              aktivitiUtama: [
                '1. Murid menjawab set soalan Ulangkaji Berfokus secara individu dalam tempoh masa ditetapkan.',
                '2. Aktiviti Think-Pair-Share: Murid menyemak jawapan bersama rakan sebaya dan membincangkan kaedah jalan kerja.',
                '3. Guru membuat bedah siasat soalan kritikal dan membimbing murid yang memerlukan pemulihan konsep.',
              ],
              penutup:
                'Murid mencatat 3 rumus/konsep penting yang dipelajari dan 1 perkara yang perlu diperkukuh pada buku nota ulangkaji.',
              aktiviti5E: {
                engage:
                  'Guru memaparkan 1 soalan soalan KBAT / soalan lazim peperiksaan yang sering berlaku kesilapan tanda negatif/algebra untuk mencetuskan perbincangan.',
                explore:
                  'Murid menyelesaikan modul ulangkaji berfokus dalam kumpulan kecil mengikut aras keupayaan.',
                explain:
                  'Wakil kumpulan membentangkan langkah penyelesaian di papan putih dan guru memperkemas teknik menjawab.',
                elaborate:
                  'Murid mencuba soalan variasi klon peperiksaan untuk menguji penguasaan konsep secara mendalam.',
                evaluate:
                  'Semakan kendiri berdasarkan skema pemarkahan dan exit ticket.',
              },
            },
            bbmCadangan: ['Modul Ulangkaji Berfokus Matematik', 'Koleksi Soalan Peperiksaan', 'Skema Pemarkahan'],
          },
          {
            kod: 'K1.2',
            tajuk: 'Perbincangan & Pembetulan Kertas Peperiksaan / Ujian Diagnostik Matematik.',
            objektifCadangan: [
              'Di akhir sesi PdPc, murid dapat mengenal pasti kelemahan jawapan masing-masing dan membuat pembetulan lengkap bagi semua soalan yang salah.',
              'Memahami skema pemarkahan peperiksaan matematik, markah kaedah (Method Marks) dan markah jawapan (Accuracy Marks).',
            ],
            kriteriaKejayaanCadangan: [
              'Semua murid melengkapkan pembetulan soalan dengan jalan kerja penuh.',
              'Murid dapat menyatakan sekurang-kurangnya 2 punca kehilangan markah dan strategi penambahbaikan.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Guru membentangkan analisis prestasi keseluruhan kelas, taburan gred dan soalan yang paling banyak mencatat ralat pengiraan.',
              aktivitiUtama: [
                '1. Murid meneliti skrip jawapan masing-masing berpandukan skema pemarkahan terperinci.',
                '2. Pembentangan langkah penyelesaian model oleh murid cemerlang bagi soalan mencabar.',
                '3. Sesi Pembetulan Berfokus: Murid membuat pembetulan dengan menulis justifikasi langkah kerja.',
              ],
              penutup:
                'Murid menandatangani borang analisis kendiri peperiksaan dan menetapkan sasaran markah ujian berikutnya.',
              aktiviti5E: {
                engage: 'Guru memaparkan statistik item soalan peperiksaan untuk membangkitkan kesedaran murid.',
                explore: 'Murid menyemak silang skrip jawapan dalam kumpulan bertiga untuk menganalisis kesilapan teknik.',
                explain: 'Guru memperincikan pemotongan markah (markah M dan A) berdasarkan peraturan pemarkahan rasmi.',
                elaborate: 'Murid menyelesaikan semula soalan setara (parallel questions) bagi menguji pemulihan kefahaman.',
                evaluate: 'Guru mengesahkan pembetulan jawapan dan rekod intervensi murid.',
              },
            },
            bbmCadangan: ['Skrip Jawapan Murid', 'Skema Pemarkahan Rasmi', 'Borang Analisis Item'],
          },
        ],
      },
      {
        kod: 'K2.0',
        tajuk: 'Slot Gemilang (Program Pecutan Lulus & Cemerlang Matematik)',
        spList: [
          {
            kod: 'K2.1',
            tajuk: 'Slot Gemilang: Bengkel Teknik Menjawab & Kuasai Soalan Format Peperiksaan.',
            objektifCadangan: [
              'Di akhir Slot Gemilang, murid dapat menguasai teknik menjawab soalan Bahagian A, B dan C mengikut format terkini.',
              'Menguruskan masa menjawab secara sistematik dan memaksimumkan perolehan markah kaedah.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid dapat mengelaskan soalan mengikut tahap kesukaran dan merancang masa menjawab.',
              'Murid berjaya memperoleh sekurang-kurangnya markah lulus/cemerlang sasaran bagi modul Slot Gemilang.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Tayangan tip pengurusan masa peperiksaan matematik dan strategi mendahulukan soalan mudah.',
              aktivitiUtama: [
                '1. Guru membimbing teknik membedah kata kunci soalan matematik.',
                '2. Murid mempraktikkan teknik menjawab secara simulasi masa sebenar (timed drill).',
                '3. Perbincangan jawapan dan penekanan kepada penulisan formula serta unit.',
              ],
              penutup: 'Murid melengkapkan senarai semak Kata Kunci Gemilang bagi topik yang dibincangkan.',
              aktiviti5E: {
                engage: 'Guru memaparkan contoh skrip jawapan penuh markah untuk memberi inspirasi.',
                explore: 'Murid bekerjasama dalam kumpulan menganalisis kehendak soalan dan menyusun langkah kerja.',
                explain: 'Wakil kumpulan membentangkan langkah kerja dan guru memberi maklum balas penambahbaikan.',
                elaborate: 'Latihan kendiri menjawab soalan Bahagian B/C dalam masa sebenar peperiksaan.',
                evaluate: 'Penilaian kendiri dan rakan sebaya berdasarkan skema pemarkahan.',
              },
            },
            bbmCadangan: ['Modul Slot Gemilang Matematik', 'Kertas Mahjong / Papan Putih Mini', 'Kalkulator Saintifik'],
          },
          {
            kod: 'K2.2',
            tajuk: 'Slot Gemilang: Klinik Pengukuhan Konsep Asas & Pengiraan Algebra/Geometri.',
            objektifCadangan: [
              'Di akhir Slot Gemilang, murid dapat menguasai kemahiran asas operasi nombor, pecahan algebra, dan formula geometri tanpa ralat.',
              'Membina keyakinan diri dan asas kukuh bagi murid kumpulan sasaran lulus.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid berjaya menyelesaikan sekurang-kurangnya 4 daripada 5 soalan latihan asas berpandu.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Uji minda pantas operasi aritmetik dan hukum tanda positif/negatif.',
              aktivitiUtama: [
                '1. Bimbingan berfokus langkah demi langkah bersama guru dan Guru Muda (Young Tutors).',
                '2. Latih tubi berperingkat (graded drills) daripada aras mudah kepada sederhana.',
                '3. Semakan jawapan segera secara individu.',
              ],
              penutup: 'Kuiz pengesahan penguasaan 2 soalan pantas.',
              aktiviti5E: {
                engage: 'Aktiviti kuiz kad imbasan rumus matematik asas.',
                explore: 'Murid menyelesaikan latihan berpandu dalam kumpulan kecil.',
                explain: 'Guru Muda membimbing rakan menerangkan langkah kerja pengiraan yang betul.',
                elaborate: 'Murid mencuba soalan latihan bertaraf peperiksaan dengan yakin.',
                evaluate: 'Exit ticket pengiraan asas.',
              },
            },
            bbmCadangan: ['Modul Asas Gemilang Matematik', 'Kalkulator Saintifik', 'Kad Imbasan Rumus'],
          },
        ],
      },
      {
        kod: 'K3.0',
        tajuk: 'Slot Mumtaz (Program Pecutan A+ & Pengayaan KBAT MRSM/SBP)',
        spList: [
          {
            kod: 'K3.1',
            tajuk: 'Slot Mumtaz: Klinik Pecutan A+ & Analisis Soalan KBAT Aras Tinggi (HOTS).',
            objektifCadangan: [
              'Di akhir Slot Mumtaz, murid dapat menganalisis dan menyelesaikan sekurang-kurangnya 3 soalan KBAT matematik bukan rutin dengan kaedah pemodelan yang tepat.',
              'Menghubungkaitkan pelbagai topik (cross-topic integration) dalam menyelesaikan masalah situasi sebenar.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid berjaya menghasilkan jalan kerja KBAT yang lengkap, tersusun dan tepat sehingga jawapan akhir.',
              'Murid memperoleh sekurang-kurangnya 85% markah dalam cabaran soalan Slot Mumtaz.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Guru mengemukakan satu permasalahan kehidupan sebenar/kewangan/kejuruteraan yang memerlukan pemodelan matematik.',
              aktivitiUtama: [
                '1. Analisis masalah kompleks menggunakan kaedah 4-Langkah Polya (Memahami -> Merancang -> Melaksana -> Menyemak).',
                '2. Perbincangan meja bulat (Round Table) dalam kumpulan murid pintar cerdas.',
                '3. Sesi Hot Seat: Wakil kumpulan mempertahankan formula dan justifikasi andaian di hadapan kelas.',
              ],
              penutup: 'Rumusan strategi mencapai gred A+ (Mumtaz) dan refleksi kendiri.',
              aktiviti5E: {
                engage: 'Paparan kajian kes simulasi dunia sebenar untuk dicungkil penyelesaian matematiknya.',
                explore: 'Murid meneroka pelbagai alternatif kaedah penyelesaian secara kolaboratif.',
                explain: 'Pembentangan jawapan menggunakan hujah logik dan tatatanda matematik jitu.',
                elaborate: 'Cabaran membina model matematik alternatif bagi mengoptimumkan kos atau masa.',
                evaluate: 'Penilaian rubrik A+ Slot Mumtaz.',
              },
            },
            bbmCadangan: ['Modul Pecutan A+ Slot Mumtaz', 'Koleksi Soalan KBAT SBP & MRSM', 'Kalkulator Saintifik'],
          },
        ],
      },
      {
        kod: 'K4.0',
        tajuk: 'Minggu Peperiksaan / Pentaksiran / Pasca-Peperiksaan',
        spList: [
          {
            kod: 'K4.1',
            tajuk: 'Pengurusan Peperiksaan: Taklimat, Ulangkaji Kendiri & Persediaan Mental.',
            objektifCadangan: [
              'Murid bersedia secara kognitif dan emosi menduduki kertas peperiksaan Matematik.',
              'Membuat semakan akhir formula, unit ukuran dan alatan geometri sebelum waktu ujian.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid mematuhi peraturan peperiksaan dan mengurus masa dengan tenang serta teratur.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Kata perangsang motivasi, peringatan etika peperiksaan dan doa kejayaan.',
              aktivitiUtama: [
                '1. Semakan alatan wajib (kalkulator yang diluluskan, pembaris, protraktor, jangka lukis).',
                '2. Ulangkaji kendiri senyap berfokus kepada rumus dan teorem utama.',
                '3. Bimbingan pantas guru terhadap keraguan minit-minit akhir murid.',
              ],
              penutup: 'Amanat akhir guru dan penegasan strategi menjawab soalan dengan tenang.',
              aktiviti5E: {
                engage: 'Sesi menenangkan minda dan pengurusan stres peperiksaan.',
                explore: 'Murid menyemak nota poket rumus penting.',
                explain: 'Guru menjawab soalan ringkas berkaitan istilah penting soalan.',
                elaborate: 'Peringatan tentang pembahagian masa bagi setiap bahagian kertas peperiksaan.',
                evaluate: 'Semakan kesiapsiagaan alatan dan mental.',
              },
            },
            bbmCadangan: ['Senarai Semak Alatan Geometri', 'Kad Rumus Poket', 'Slip Peperiksaan'],
          },
        ],
      },
    ],
  };
}

function createSpecialMatematikBabDLP(tingkatan: Tingkatan): BabMatematik {
  const base = createSpecialMatematikBabBM(tingkatan);
  const num = tingkatan.replace(/\D/g, '') || '4';
  return {
    ...base,
    id: `M_F${num}_KHAS_DLP`,
    tema: 'Special Academic & Co-Academic Programmes (Non-Syllabus)',
    tajuk: 'Revision, Gemilang Clinic, Mumtaz Clinic & Examination/Activity Weeks',
    peneranganRingkas:
      'Specially tailored for targeted revision, MRSM/SBP Gemilang and Mumtaz acceleration sessions, and examination weeks.',
    skList: base.skList.map((sk) => ({
      ...sk,
      tajuk: sk.tajuk
        .replace('Aktiviti Ulangkaji Berfokus & Klinik Matematik', 'Focused Revision & Mathematics Clinic')
        .replace('Slot Gemilang (Program Pecutan Lulus & Cemerlang Matematik)', 'Gemilang Acceleration Programme (Pass & Excellence)')
        .replace('Slot Mumtaz (Program Pecutan A+ & Pengayaan KBAT MRSM/SBP)', 'Mumtaz A+ Acceleration & HOTS Enrichment (MRSM/SBP)')
        .replace('Minggu Peperiksaan / Pentaksiran / Pasca-Peperiksaan', 'Examination / Assessment / Post-Examination Week'),
      spList: sk.spList.map((sp) => ({
        ...sp,
        tajuk: sp.tajuk
          .replace('Ulangkaji Topikal & Latih Tubi Berfokus Kertas 1 dan Kertas 2 Matematik.', 'Topical Revision & Focused Drills for Mathematics Paper 1 and Paper 2.')
          .replace('Perbincangan & Pembetulan Kertas Peperiksaan / Ujian Diagnostik Matematik.', 'Discussion & Error Analysis of Examination Paper / Mathematics Diagnostic Test.')
          .replace('Slot Gemilang: Bengkel Teknik Menjawab & Kuasai Soalan Format Peperiksaan.', 'Gemilang Session: Answering Technique Workshop & Exam Format Mastery.')
          .replace('Slot Gemilang: Klinik Pengukuhan Konsep Asas & Pengiraan Algebra/Geometri.', 'Gemilang Clinic: Basic Foundation Reinforcement & Algebra/Geometry Drills.')
          .replace('Slot Mumtaz: Klinik Pecutan A+ & Analisis Soalan KBAT Aras Tinggi (HOTS).', 'Mumtaz Clinic: A+ Sprint & Higher-Order Thinking Skills (HOTS) Analysis.')
          .replace('Pengurusan Peperiksaan: Taklimat, Ulangkaji Kendiri & Persediaan Mental.', 'Exam Management: Briefing, Independent Revision & Mental Preparedness.'),
        objektifCadangan: sp.objektifCadangan.map((o) =>
          o.replace(/murid dapat/gi, 'pupils are able to').replace(/Di akhir/gi, 'By the end of')
        ),
        bbmCadangan: sp.bbmCadangan.map((b) =>
          b.replace('Buku Teks KSSM Matematik', 'KSSM Mathematics Textbook').replace('Modul', 'Module')
        ),
      })),
    })),
  };
}

export const SPECIAL_PROGRAMMES_MATEMATIK_BM: BabMatematik[] = [
  createSpecialMatematikBabBM('Tingkatan 2'),
  createSpecialMatematikBabBM('Tingkatan 3'),
  createSpecialMatematikBabBM('Tingkatan 4'),
  createSpecialMatematikBabBM('Tingkatan 5'),
];

export const SPECIAL_PROGRAMMES_MATEMATIK_DLP: BabMatematik[] = [
  createSpecialMatematikBabDLP('Tingkatan 2'),
  createSpecialMatematikBabDLP('Tingkatan 3'),
  createSpecialMatematikBabDLP('Tingkatan 4'),
  createSpecialMatematikBabDLP('Tingkatan 5'),
];
