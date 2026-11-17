import { BabKimia, Tingkatan } from '../../../types/rph';

function createSpecialAddmathBabBM(tingkatan: Tingkatan): BabKimia {
  const num = tingkatan.replace(/\D/g, '') || '4';
  return {
    id: `AM_F${num}_KHAS`,
    tingkatan,
    nomborBab: 0,
    tema: 'Program Khas Akademik & Ko-Akademik (Tanpa Silibus)',
    tajuk: 'Ulangkaji, Slot Gemilang, Slot Mumtaz & Minggu Peperiksaan/Aktiviti',
    peneranganRingkas:
      'Khas untuk sesi ulangkaji berfokus SPM, Slot Gemilang, Slot Mumtaz MRSM/SBP, minggu peperiksaan dan klinik AddMaths.',
    isProgramKhas: true,
    skList: [
      {
        kod: 'K1.0',
        tajuk: 'Aktiviti Ulangkaji Berfokus & Klinik Matematik Tambahan',
        spList: [
          {
            kod: 'K1.1',
            tajuk: 'Ulangkaji Topikal & Latih Tubi Berfokus Kertas 1 dan Kertas 2 Matematik Tambahan SPM.',
            objektifCadangan: [
              'Di akhir sesi ulangkaji, murid dapat menyelesaikan sekurang-kurangnya 6 soalan Kertas 1 (Bahagian A & B) dan 2 soalan panjang Kertas 2 dengan kaedah pengiraan yang tepat dan sistematik.',
              'Mengenal pasti dan membetulkan kesilapan lazim (common pitfalls) dalam manipulasi algebra, kalkulus, vektor dan trigonometri.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid berjaya menjawab sekurang-kurangnya 75% soalan modul ulangkaji dengan langkah kerja mengikut skema penskoran SPM.',
              'Murid dapat menerangkan formula dan hukum matematik berkaitan secara lisan dan bertulis.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Guru mengimbas kembali rumus penting dan konsep kritikal topik sasaran melalui kuiz formula pantas 5 minit.',
              aktivitiUtama: [
                '1. Murid menjawab set soalan Ulangkaji Berfokus SPM secara individu dalam tempoh masa ditetapkan.',
                '2. Aktiviti Peer Tutoring / Think-Pair-Share: Murid membincangkan jalan kerja bersama rakan sebaya.',
                '3. Guru membuat bedah siasat soalan aras tinggi (KBAT) dan membimbing kaedah pemarkahan penuh SPM.',
              ],
              penutup:
                'Murid merumuskan 3 kesilapan lazim yang perlu dielakkan dan mencatat tips pemarkahan SPM.',
              aktiviti5E: {
                engage:
                  'Guru memaparkan soalan percubaan SPM terkini yang sering mengelirukan calon untuk mencetuskan perbincangan kritis.',
                explore:
                  'Murid menyelesaikan modul latihan terbeza dalam kumpulan kecil berpandukan formula senarai SPM.',
                explain:
                  'Murid membentangkan kaedah penyelesaian alternatif dan membandingkan ketepatan jawapan.',
                elaborate:
                  'Murid mengaplikasikan teknik penyelesaian pantas dan menyemak jawapan menggunakan kalkulator saintifik.',
                evaluate:
                  'Guru mentaksir penguasaan murid melalui semakan jalan kerja berpandukan skema rasmi Lembaga Peperiksaan.',
              },
            },
            bbmCadangan: [
              'Modul Ulangkaji Berfokus SPM Matematik Tambahan',
              'Kertas Soalan Peperiksaan Percubaan SPM Negeri',
              'Kalkulator Saintifik & Kertas Graf',
            ],
          },
        ],
      },
      {
        kod: 'K2.0',
        tajuk: 'Slot Gemilang / Slot Mumtaz (Kecemerlangan Akademik)',
        spList: [
          {
            kod: 'K2.1',
            tajuk: 'Bimbingan Intensif Aras Sederhana & Aras Tinggi (KBAT) Matematik Tambahan SPM.',
            objektifCadangan: [
              'Di akhir slot, murid dapat menguasai teknik menjawab soalan aras analisis dan sintesis Kertas 2 (Bahagian B & Bahagian C).',
              'Membina keyakinan murid dalam mengaitkan konsep rentas topik (cross-topical integration).',
            ],
            kriteriaKejayaanCadangan: [
              'Murid dapat menjawab sekurang-kurangnya 2 daripada 3 soalan KBAT integratif dengan jalan kerja terperinci.',
              'Murid mahir menggunakan rumus dan tatatanda matematik dengan betul.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Guru memaparkan senario masalah mencabar yang menggabungkan dua topik berbeza (cth: Kalkulus + Geometri Koordinat).',
              aktivitiUtama: [
                '1. Bimbingan berfokus konsep integratif dan analisis kata kunci soalan peperiksaan.',
                '2. Bengkel kerja murid berpasukan menyelesaikan masalah bukan rutin.',
                '3. Perbincangan rubrik pemarkahan dan justifikasi setiap markah kaedah (K) dan markah jawapan (N).',
              ],
              penutup:
                'Refleksi kendiri murid tentang tahap keyakinan bagi topik yang dibimbing.',
              aktiviti5E: {
                engage:
                  'Guru mencabar murid dengan 1 teka-teki matematik lanjutan untuk menguji pemikiran logik.',
                explore:
                  'Murid mengkaji pelbagai pendekatan penyelesaian masalah menggunakan kaedah algebraik dan grafik.',
                explain:
                  'Murid mempersembahkan penyelesaian di hadapan kelas dan menerima maklum balas pembetulan.',
                elaborate:
                  'Murid mengadaptasi kaedah kepada variasi soalan baharu bertaraf olimpiad / SPM.',
                evaluate:
                  'Guru menilai ketepatan konsep dan konsistensi jalan kerja murid.',
              },
            },
            bbmCadangan: [
              'Modul Slot Mumtaz / Gemilang',
              'Kalkulator Saintifik',
              'Papan Putih Mini / Kertas Mahjung',
            ],
          },
        ],
      },
      {
        kod: 'K3.0',
        tajuk: 'Minggu Peperiksaan / Pentaksiran / Pasca Peperiksaan',
        spList: [
          {
            kod: 'K3.1',
            tajuk: 'Pelaksanaan Peperiksaan / Pentaksiran Sumatif / Perbincangan Kertas Peperiksaan.',
            objektifCadangan: [
              'Murid menduduki kertas peperiksaan dengan mematuhi tatatertib dan pengurusan masa yang baik.',
              'Murid menganalisis kekuatan dan kelemahan diri melalui perbincangan jawapan dan pembetulan.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid menyelesaikan semua soalan dalam masa yang ditetapkan mengikut peraturan peperiksaan.',
              'Murid melengkapkan modul pembetulan kendiri bagi soalan yang kehilangan markah.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Guru memberi taklimat ringkas arahan peperiksaan / mengagihkan skrip jawapan murid bersama skema.',
              aktivitiUtama: [
                '1. Pelaksanaan peperiksaan bertulis mengikut jadual rasmi sekolah / Lembaga Peperiksaan.',
                '2. Perbincangan terperinci setiap soalan dan skema pemarkahan bersama murid.',
                '3. Murid membuat pembetulan kendiri dan mencatat ruang penambahbaikan dalam buku nota.',
              ],
              penutup:
                'Guru merumuskan prestasi keseluruhan murid dan menetapkan sasaran pencapaian sesi hadapan.',
              aktiviti5E: {
                engage:
                  'Guru mengimbas kembali soalan peperiksaan yang paling mencabar untuk menguji daya ingatan murid.',
                explore:
                  'Murid menyemak langkah kerja masing-masing berbanding skema pemarkahan rasmi.',
                explain:
                  'Guru menerangkan punca kehilangan markah lazim dan kaedah pemarkahan alternatif.',
                elaborate:
                  'Murid menyelesaikan semula soalan yang salah sehingga mendapat jawapan tepat.',
                evaluate:
                  'Guru merekod markah dan menganalisis headcount pencapaian murid.',
              },
            },
            bbmCadangan: [
              'Kertas Peperiksaan / Skema Pemarkahan Rasmi',
              'Buku Nota / Fail Pembetulan Peperiksaan',
            ],
          },
        ],
      },
    ],
  };
}

function createSpecialAddmathBabDLP(tingkatan: Tingkatan): BabKimia {
  const num = tingkatan.replace(/\D/g, '') || '4';
  return {
    id: `AM_F${num}_KHAS_DLP`,
    tingkatan,
    nomborBab: 0,
    tema: 'Academic & Non-Syllabus Special Programmes',
    tajuk: 'Revision, Gemilang/Mumtaz Clinic & Examination/Activity Week',
    peneranganRingkas:
      'Dedicated for SPM Additional Mathematics focused revision, Gemilang/Mumtaz clinics, examination weeks, and school academic activity weeks.',
    isProgramKhas: true,
    skList: [
      {
        kod: 'K1.0',
        tajuk: 'Focused Revision & Additional Mathematics Clinic',
        spList: [
          {
            kod: 'K1.1',
            tajuk: 'Topical Revision & Intensive Drill for SPM Paper 1 and Paper 2 Additional Mathematics.',
            objektifCadangan: [
              'By the end of the revision session, pupils are able to solve at least 6 Paper 1 questions and 2 Paper 2 structured questions with accurate and systematic mathematical working.',
              'Identify and rectify common misconceptions in algebraic manipulation, calculus, vectors, and trigonometry.',
            ],
            kriteriaKejayaanCadangan: [
              'Pupils successfully answer at least 75% of the topical revision worksheet with complete working steps.',
              'Pupils accurately state and explain the relevant mathematical formulae and rules.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Teacher reviews core concepts and essential formulae of the targeted topic via a 5-minute speed quiz.',
              aktivitiUtama: [
                '1. Pupils solve a focused SPM revision set individually within the allocated time.',
                '2. Peer-tutoring and Think-Pair-Share: Pupils compare calculation steps and discuss strategies with partners.',
                '3. Teacher conducts a walkthrough of high-difficulty HOTS questions and demonstrates full-mark working steps.',
              ],
              penutup:
                'Pupils record 3 common pitfalls to avoid and note key exam scoring tips in their revision log.',
              aktiviti5E: {
                engage:
                  'Teacher presents an intriguing SPM past-year question that frequently challenges candidates.',
                explore:
                  'Pupils work through differentiated revision tasks in small groups guided by the SPM formula list.',
                explain:
                  'Pupils present alternative problem-solving strategies and compare result precision.',
                elaborate:
                  'Pupils apply efficient calculation methods and check solutions using scientific calculators.',
                evaluate:
                  'Teacher assesses pupil mastery through methodical evaluation of working steps.',
              },
            },
            bbmCadangan: [
              'SPM Additional Mathematics Revision Module',
              'Trial Exam Papers / Past-Year Compilations',
              'Scientific Calculator & Graph Paper',
            ],
          },
        ],
      },
    ],
  };
}

export const SPECIAL_PROGRAMMES_ADDMATH_BM: BabKimia[] = [
  createSpecialAddmathBabBM('Tingkatan 4'),
  createSpecialAddmathBabBM('Tingkatan 5'),
];

export const SPECIAL_PROGRAMMES_ADDMATH_DLP: BabKimia[] = [
  createSpecialAddmathBabDLP('Tingkatan 4'),
  createSpecialAddmathBabDLP('Tingkatan 5'),
];
