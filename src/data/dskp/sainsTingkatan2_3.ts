import { BabKimia, StandardKandungan, StandardPembelajaran, Tingkatan } from '../../types/rph';

function binaSpSainsBM(
  kod: string,
  tajuk: string,
  opts?: {
    objektif?: string[];
    kriteria?: string[];
    setInduksi?: string;
    aktiviti?: string[];
    penutup?: string;
    eksperimenWajib?: boolean;
    namaEksperimen?: string;
    radasBahan?: string[];
    bbm?: string[];
    kps?: string[];
  }
): StandardPembelajaran {
  const isExp = !!opts?.eksperimenWajib;
  const cleanTitle = tajuk.replace(/\.$/, '');
  const objList = opts?.objektif || [
    `Di akhir sesi PdPc, murid dapat ${cleanTitle.charAt(0).toLowerCase() + cleanTitle.slice(1)} dengan tepat mengikut sukatan DSKP Sains KSSM.`,
    isExp && opts?.namaEksperimen
      ? `Menjalankan eksperimen wajib (${opts.namaEksperimen}) dengan mengendalikan radas makmal secara betul dan merekodkan pemerhatian/data secara sistematik.`
      : `Menghubungkaitkan konsep sains yang dipelajari (${kod}) dengan fenomena harian serta menyelesaikan sekurang-kurangnya 2 soalan latihan pengukuhan.`,
  ];

  const kriteriaList = opts?.kriteria || [
    `Murid berjaya menyatakan dan menghuraikan fakta saintifik utama bagi SP ${kod} (${cleanTitle}) dengan betul.`,
    isExp
      ? `Murid berjaya mengenal pasti pemboleh ubah (dimanipulasikan, bergerak balas, dimalarkan), membina jadual keputusan dan membuat kesimpulan eksperimen.`
      : `Murid berjaya melengkapkan aktiviti perbincangan kumpulan / peta pemikiran i-Think dan menjawab soalan kuiz formatif dengan tepat.`,
  ];

  const setInduksi =
    opts?.setInduksi ||
    `Guru memaparkan rangsangan visual / fenomena harian berkaitan "${cleanTitle}" dan mencungkil pengetahuan sedia ada murid melalui soalan pencetus idea.`;

  const aktivitiUtama =
    opts?.aktiviti ||
    (isExp
      ? [
          `1. Guru menerangkan tujuan penyiasatan saintifik, hipotesis, pemboleh ubah dan langkah keselamatan makmal bagi ${opts?.namaEksperimen || 'eksperimen'}.`,
          `2. Murid menjalankan eksperimen secara berkumpulan mengikut prosedur buku teks Sains KSSM, mengawal pemboleh ubah dan merekod pemerhatian/bacaan ke dalam jadual.`,
          `3. Wakil kumpulan membentangkan dapatan eksperimen, mentafsir data/graf dan merumuskan kesimpulan saintifik bersama guru.`,
        ]
      : [
          `1. Guru menerangkan konsep utama bagi SP ${kod} (${cleanTitle}) menggunakan slaid interaktif dan contoh situasi sebenar.`,
          `2. Aktiviti PAK-21 (Think-Pair-Share / Gallery Walk): Murid berbincang dalam kumpulan untuk membina peta konsep / melengkapkan lembaran kerja berstruktur.`,
          `3. Pembentangan hasil perbincangan kumpulan dan sesi soal jawab KBAT bersama guru bagi mengukuhkan kefahaman.`,
        ]);

  const penutup =
    opts?.penutup ||
    `Murid membuat rumusan isi pelajaran hari ini dan melengkapkan kuiz pantas (Exit Ticket) bagi menyemak penguasaan SP ${kod}.`;

  return {
    kod,
    tajuk,
    objektifCadangan: objList,
    kriteriaKejayaanCadangan: kriteriaList,
    cadanganAktiviti: {
      setInduksi,
      aktivitiUtama,
      penutup,
      aktiviti5E: {
        engage: setInduksi,
        explore: isExp
          ? `Murid menjalankan penyiasatan saintifik / eksperimen (${opts?.namaEksperimen || kod}) dalam kumpulan kecil dan mengumpul data empirikal.`
          : `Murid meneroka konsep "${cleanTitle}" melalui aktiviti inkuiri berkumpulan, analisis bahan rangsangan dan perbincangan rakan sebaya.`,
        explain: `Wakil kumpulan membentangkan hasil dapatan bagi SP ${kod} manakala guru memperkukuh istilah dan konsep saintifik yang tepat.`,
        elaborate: `Murid mengaplikasikan konsep yang dipelajari dalam situasi baharu / penyelesaian masalah kehidupan harian (KBAT).`,
        evaluate: penutup,
      },
    },
    bbmCadangan:
      opts?.bbm ||
      (isExp
        ? [
            'Buku Teks Sains KSSM',
            'Buku Amali / Modul Makmal Sains',
            'Radas & Bahan Makmal Sains',
            'Lembaran Kerja / Laporan Amali',
          ]
        : [
            'Buku Teks Sains KSSM',
            'Slaid Pembentangan / Video Sains',
            'Lembaran Kerja / Modul Latihan',
            'Papan Putih Mini / Kertas Mahjong',
          ]),
    kemahiranSaintifikCadangan:
      opts?.kps ||
      (isExp
        ? [
            'Memerhati',
            'Mengukur dan menggunakan nombor',
            'Mengawal pemboleh ubah',
            'Membuat hipotesis',
            'Mengeksperimen',
          ]
        : ['Memerhati', 'Mengelas', 'Membuat inferens', 'Berkomunikasi']),
    eksperimenWajib: opts?.eksperimenWajib,
    namaEksperimen: opts?.namaEksperimen,
    radasBahan: opts?.radasBahan,
  };
}

function binaSk(
  kod: string,
  tajuk: string,
  spItems: Array<
    | [string, string]
    | [
        string,
        string,
        {
          eksperimenWajib?: boolean;
          namaEksperimen?: string;
          radasBahan?: string[];
        },
      ]
  >
): StandardKandungan {
  return {
    kod,
    tajuk,
    spList: spItems.map((item) => binaSpSainsBM(item[0], item[1], item[2])),
  };
}

function binaBabSains(
  id: string,
  tingkatan: Tingkatan,
  nomborBab: number,
  tema: string,
  tajuk: string,
  peneranganRingkas: string,
  skList: StandardKandungan[]
): BabKimia {
  return {
    id,
    tingkatan,
    nomborBab,
    tema,
    tajuk,
    peneranganRingkas,
    skList,
  };
}

// ============================================================================
// DSKP SAINS TINGKATAN 2 (BAHASA MELAYU) - BAB 1 HINGGA BAB 13
// ============================================================================
export const DSKP_SAINS_F2: BabKimia[] = [
  binaBabSains(
    'S_F2_B1',
    'Tingkatan 2',
    1,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Biodiversiti',
    'Kepelbagaian organisma, kepentingan biodiversiti dan pengelasan haiwan serta tumbuhan.',
    [
      binaSk('1.1', 'Kepelbagaian Organisma', [
        ['1.1.1', 'Menghuraikan dan berkomunikasi mengenai biodiversiti.'],
        ['1.1.2', 'Mewajarkan keperluan pengurusan biodiversiti yang berkesan.'],
      ]),
      binaSk('1.2', 'Pengelasan Organisma', [
        [
          '1.2.1',
          'Membezakan organisma dengan kekunci dikotomi berdasarkan ciri-ciri sepunya.',
        ],
        [
          '1.2.2',
          'Mencirikan kumpulan taksonomi utama (Haiwan vertebrata/invertebrata, Tumbuhan monokotiledon/dikotiledon).',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F2_B2',
    'Tingkatan 2',
    2,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Ekosistem',
    'Aliran tenaga, kitar nutrien, saling bersandaran antara organisma dan peranan manusia.',
    [
      binaSk('2.1', 'Aliran Tenaga dalam Ekosistem', [
        [
          '2.1.1',
          'Menerangkan dengan contoh pengeluar, pengguna dan pengurai.',
        ],
        [
          '2.1.2',
          'Menginterpretasi rantai makanan dan siratan makanan.',
        ],
      ]),
      binaSk('2.2', 'Kitar Nutrien dalam Ekosistem', [
        [
          '2.2.1',
          'Menghuraikan dan berkomunikasi mengenai peranan benda hidup dalam kitar oksigen dan kitar karbon dalam ekosistem.',
        ],
        ['2.2.2', 'Mewajarkan peranan organisma dalam kitar air suatu ekosistem.'],
        [
          '2.2.3',
          'Menyelesaikan masalah apabila terdapat gangguan ke atas kitaran disebabkan aktiviti manusia.',
        ],
      ]),
      binaSk(
        '2.3',
        'Saling Bersandaran dan Interaksi antara Organisma dan antara Organisma dengan Persekitaran',
        [
          [
            '2.3.1',
            'Menjelaskan dengan contoh saling bersandaran antara benda hidup dan persekitaran untuk keseimbangan ekosistem.',
          ],
          [
            '2.3.2',
            'Mewajarkan kepentingan penyesuaian hidupan terhadap alam sekitar.',
          ],
          [
            '2.3.3',
            'Berkomunikasi mengenai contoh interaksi antara organisma hidup dan mengaplikasi interaksi tersebut dalam kehidupan harian (Simbiosis, Mangsa-pemangsa, Persaingan).',
          ],
          [
            '2.3.4',
            'Mencerakinkan faktor yang mempengaruhi saiz populasi dalam suatu ekosistem.',
          ],
          [
            '2.3.5',
            'Meramalkan bagaimana perubahan dalam ekosistem mempengaruhi sumber yang ada dan keseimbangan antara populasi.',
            {
              eksperimenWajib: true,
              namaEksperimen:
                'Eksperimen 2.3.5: Menjalankan eksperimen untuk menentukan faktor yang mempengaruhi saiz populasi atau taburan organisma dalam ekosistem.',
            },
          ],
        ]
      ),
      binaSk('2.4', 'Peranan Manusia dalam Mengekalkan Keseimbangan Alam', [
        [
          '2.4.1',
          'Mewajarkan dan berkomunikasi bahawa manusia memerlukan ekosistem yang stabil dan produktif demi kelestarian hidup.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F2_B3',
    'Tingkatan 2',
    3,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Nutrisi',
    'Kelas makanan, gizi seimbang, sistem pencernaan manusia serta proses penyerapan dan penyahtinjaan.',
    [
      binaSk('3.1', 'Kelas Makanan', [
        ['3.1.1', 'Menghuraikan dan berkomunikasi mengenai kelas makanan.'],
        [
          '3.1.2',
          'Menguji kehadiran kanji, glukosa, protein dan lemak dalam makanan.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 3.1.2: Menguji kehadiran kanji (ujian iodin), glukosa (ujian Benedict), protein (ujian Millon) dan lemak (ujian emulsi alkohol) dalam sampel makanan.',
            radasBahan: [
              'Tabung uji',
              'Bikar',
              'Penunu Bunsen',
              'Larutan iodin',
              'Larutan Benedict',
              'Reagen Millon',
              'Etanol',
              'Sampel makanan',
            ],
          },
        ],
      ]),
      binaSk('3.2', 'Kepentingan Gizi Seimbang', [
        ['3.2.1', 'Menghuraikan dan berkomunikasi mengenai gizi seimbang.'],
        [
          '3.2.2',
          'Menganggar kalori makanan yang diambil dalam setiap hidangan dan merancang satu gizi seimbang.',
        ],
        [
          '3.2.3',
          'Membuat kajian dan mewajarkan kepentingan gizi seimbang, senaman dan gaya hidup yang sihat dalam mengekalkan kesihatan badan.',
        ],
      ]),
      binaSk('3.3', 'Sistem Pencernaan Manusia', [
        ['3.3.1', 'Menghuraikan dan berkomunikasi mengenai pencernaan.'],
      ]),
      binaSk(
        '3.4',
        'Proses Penyerapan dan Pengangkutan Hasil Pencernaan serta Penyahtinjaan',
        [
          [
            '3.4.1',
            'Menjalankan eksperimen bagi menerangkan proses penyerapan hasil pencernaan.',
            {
              eksperimenWajib: true,
              namaEksperimen:
                'Eksperimen 3.4.1: Menjalankan eksperimen menggunakan tiub Visking bagi menerangkan penyerapan hasil pencernaan (glukosa dan kanji).',
              radasBahan: [
                'Tiub Visking',
                'Bikar',
                'Ampaian kanji 1%',
                'Larutan glukosa',
                'Larutan iodin',
                'Larutan Benedict',
                'Air suling',
              ],
            },
          ],
          [
            '3.4.2',
            'Menghubungkaitkan fungsi sistem pencernaan, sistem peredaran darah dan sistem respirasi.',
          ],
          ['3.4.3', 'Menghuraikan dan berkomunikasi mengenai penyahtinjaan.'],
        ]
      ),
    ]
  ),
  binaBabSains(
    'S_F2_B4',
    'Tingkatan 2',
    4,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Kesihatan Manusia',
    'Penyakit berjangkit dan tidak berjangkit serta sistem pertahanan badan manusia.',
    [
      binaSk('4.1', 'Penyakit Berjangkit dan Penyakit Tidak Berjangkit', [
        [
          '4.1.1',
          'Membezakan dan berkomunikasi mengenai penyakit berjangkit dan penyakit tidak berjangkit.',
        ],
        ['4.1.2', 'Menerangkan bagaimana penyakit berjangkit disebarkan.'],
        [
          '4.1.3',
          'Mencerakinkan penyebab dan penularan penyakit berjangkit.',
        ],
        [
          '4.1.4',
          'Menjana idea mekanisme menghalang penularan penyakit berjangkit.',
        ],
      ]),
      binaSk('4.2', 'Pertahanan Badan', [
        [
          '4.2.1',
          'Menghuraikan dan berkomunikasi mengenai fungsi sistem pertahanan badan.',
        ],
        ['4.2.2', 'Mendefinisikan antigen, antibodi dan keimunan badan.'],
        ['4.2.3', 'Mewajarkan kepentingan imunisasi.'],
        ['4.2.4', 'Membezakan keimunan pasif dan keimunan aktif.'],
        [
          '4.2.5',
          'Mewajarkan amalan yang baik ke arah keimunan yang mantap.',
        ],
        [
          '4.2.6',
          'Mewajarkan dan berkomunikasi mengenai kepentingan imunisasi dan tahap kesihatan individu terhadap keluarga, sosial, ekonomi dan negara.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F2_B5',
    'Tingkatan 2',
    5,
    'Penerokaan Unsur dalam Alam',
    'Air dan Larutan',
    'Sifat fizik air, larutan dan kadar keterlarutan serta pembersihan dan pembekalan air.',
    [
      binaSk('5.1', 'Sifat Fizik Air', [
        [
          '5.1.1',
          'Menghuraikan dan berkomunikasi mengenai air (takat didih, takat beku, tegangan permukaan, tindakan kapilari).',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 5.1.1: Menentukan komposisi unsur dalam molekul air melalui elektrolisis serta kesan bendasing terhadap takat lebur dan takat didih air.',
          },
        ],
        [
          '5.1.2',
          'Menjalankan eksperimen dan berkomunikasi mengenai proses penyejatan air dalam kehidupan harian.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 5.1.2: Mengkaji faktor-faktor yang mempengaruhi kadar penyejatan air (kelembapan udara, suhu persekitaran, luas permukaan dan gerakan udara).',
            radasBahan: [
              'Kertas turas',
              'Kalsium klorida kontang',
              'Serkup kaca',
              'Kipas',
              'Pengering rambut',
              'Air suling',
            ],
          },
        ],
      ]),
      binaSk('5.2', 'Larutan dan Kadar Keterlarutan', [
        [
          '5.2.1',
          'Menerangkan dengan contoh maksud larutan dan keterlarutan (larutan cair, pekat dan tepu).',
        ],
        [
          '5.2.2',
          'Menjalankan eksperimen bagi menentukan faktor yang mempengaruhi kadar keterlarutan.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 5.2.2: Mengkaji faktor yang mempengaruhi kadar keterlarutan (suhu pelarut, kadar kacauan dan saiz zat terlarut).',
            radasBahan: [
              'Bikar',
              'Rod kaca',
              'Penunu Bunsen',
              'Termometer',
              'Garam biasa (halus dan kasar)',
              'Air suling',
            ],
          },
        ],
        [
          '5.2.3',
          'Menerangkan dengan contoh maksud koloid dalam kehidupan harian.',
        ],
        ['5.2.4', 'Menghuraikan dan berkomunikasi mengenai kegunaan air sebagai pelarut semesta.'],
        [
          '5.2.5',
          'Menunjuk cara contoh pelarut bukan air dan kegunaannya dalam kehidupan.',
        ],
      ]),
      binaSk('5.3', 'Pembersihan dan Pembekalan Air', [
        ['5.3.1', 'Menunjuk cara kaedah pembersihan air.'],
        [
          '5.3.2',
          'Menyelesaikan masalah mendapatkan bekalan air untuk kegunaan harian.',
        ],
        ['5.3.3', 'Membina model dan berkomunikasi mengenai sistem pembekalan air.'],
        ['5.3.4', 'Mewajarkan kelestarian air sebagai kunci kehidupan yang sihat.'],
      ]),
    ]
  ),
  binaBabSains(
    'S_F2_B6',
    'Tingkatan 2',
    6,
    'Penerokaan Unsur dalam Alam',
    'Asid dan Alkali',
    'Sifat asid dan alkali, skala pH serta tindak balas peneutralan dalam kehidupan harian.',
    [
      binaSk('6.1', 'Sifat Asid dan Alkali', [
        ['6.1.1', 'Mendefinisikan secara operasi asid dan alkali.'],
        [
          '6.1.2',
          'Menerangkan dengan contoh bahan berasid dan beralkali.',
        ],
        [
          '6.1.3',
          'Menunjuk cara menentukan kekuatan asid dan alkali berdasarkan nilai pH.',
        ],
        [
          '6.1.4',
          'Mengenal pasti kegunaan asid dan alkali dalam kehidupan harian.',
        ],
      ]),
      binaSk('6.2', 'Peneutralan', [
        ['6.2.1', 'Menerangkan proses peneutralan (pentitratan asid-alkali).'],
        [
          '6.2.2',
          'Menerangkan dengan contoh penggunaan proses peneutralan dalam kehidupan harian.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F2_B7',
    'Tingkatan 2',
    7,
    'Tenaga dan Kelestarian Hidup',
    'Keelektrikan dan Kemagnetan',
    'Elektrostatik, arus, voltan, rintangan, litar bersiri/selari dan elektromagnet.',
    [
      binaSk('7.1', 'Keelektrikan', [
        ['7.1.1', 'Menghuraikan dan berkomunikasi mengenai tenaga.'],
        [
          '7.1.2',
          'Menerangkan dan berkomunikasi mengenai kewujudan cas elektrostatik.',
        ],
        [
          '7.1.3',
          'Menjelaskan dengan contoh elektrostatik dalam kehidupan seharian.',
        ],
        [
          '7.1.4',
          'Merumuskan cas yang mengalir menghasilkan arus elektrik.',
        ],
        [
          '7.1.5',
          'Mencirikan arus, voltan dan rintangan serta unitnya.',
        ],
        [
          '7.1.6',
          'Merumuskan perkaitan antara arus, voltan dan rintangan (Hukum Ohm).',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 7.1.6: Mengkaji kesan perubahan rintangan dan voltan terhadap arus elektrik (Hukum Ohm).',
            radasBahan: [
              'Ammeter',
              'Voltmeter',
              'Reostat',
              'Sel kering',
              'Dawai nikrom',
              'Suis',
            ],
          },
        ],
      ]),
      binaSk('7.2', 'Pengaliran Arus Elektrik dalam Litar Bersiri dan Litar Selari', [
        [
          '7.2.1',
          'Menghuraikan dan berkomunikasi mengenai pengaliran arus elektrik dalam litar bersiri dan litar selari.',
        ],
      ]),
      binaSk('7.3', 'Kemagnetan', [
        ['7.3.1', 'Merumuskan ciri magnet dan garisan medan magnet.'],
        ['7.3.2', 'Menghuraikan dan berkomunikasi mengenai elektromagnet.'],
        [
          '7.3.3',
          'Menjalankan eksperimen dan berkomunikasi mengenai kegunaan magnet dan elektromagnet dalam kehidupan seharian.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 7.3.3: Mengkaji faktor-faktor yang mempengaruhi kekuatan medan magnet bagi suatu elektromagnet (arus elektrik dan bilangan lilitan gegelung).',
            radasBahan: [
              'Paku besi',
              'Dawai kuprum bertebat',
              'Bekalan kuasa AT',
              'Ammeter',
              'Reostat',
              'Pin kertas',
            ],
          },
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F2_B8',
    'Tingkatan 2',
    8,
    'Tenaga dan Kelestarian Hidup',
    'Daya dan Gerakan',
    'Jenis daya, kesan daya, tuas, momen daya serta tekanan cecair dan tekanan atmosfera.',
    [
      binaSk('8.1', 'Daya', [
        ['8.1.1', 'Menghuraikan dan berkomunikasi mengenai daya.'],
        [
          '8.1.2',
          'Menerangkan daya mempunyai magnitud, arah dan titik aplikasi.',
        ],
        ['8.1.3', 'Mengukur daya dalam unit S.I. menggunakan neraca spring.'],
        [
          '8.1.4',
          'Menjelaskan dengan contoh setiap daya tindakan terdapat daya tindak balas yang sama magnitud tetapi bertentangan arah.',
        ],
      ]),
      binaSk('8.2', 'Kesan Daya', [
        ['8.2.1', 'Menghuraikan dan berkomunikasi mengenai kesan daya.'],
        [
          '8.2.2',
          'Menerangkan dan berkomunikasi mengenai perkaitan antara perbezaan ketumpatan dengan kesan keapungan dalam kehidupan harian.',
        ],
        ['8.2.3', 'Mengelas dan menyelesaikan masalah tuas berdasarkan kedudukan fulkrum, beban dan daya.'],
        ['8.2.4', 'Menerangkan dan berkomunikasi mengenai momen daya.'],
        [
          '8.2.5',
          'Menjalankan eksperimen dan berkomunikasi mengenai tekanan serta aplikasinya dalam kehidupan harian.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 8.2.5: Mengkaji hubungan antara luas permukaan dengan tekanan yang dihasilkan oleh daya yang sama.',
            radasBahan: ['Bongkah logam', 'Plastisin', 'Pembaris meter'],
          },
        ],
        [
          '8.2.6',
          'Menghuraikan dan berkomunikasi mengenai tekanan gas dengan merujuk kepada teori kinetik gas.',
        ],
        [
          '8.2.7',
          'Menerangkan dan berkomunikasi mengenai kewujudan tekanan atmosfera dan kesan altitud kepada tekanan atmosfera.',
        ],
        ['8.2.8', 'Menerangkan kesan kedalaman terhadap tekanan cecair.'],
      ]),
    ]
  ),
  binaBabSains(
    'S_F2_B9',
    'Tingkatan 2',
    9,
    'Tenaga dan Kelestarian Hidup',
    'Haba',
    'Hubungkait suhu dengan haba, pengaliran haba, pengembangan dan pengecutan jirim serta penyerapan/pembebasan haba.',
    [
      binaSk('9.1', 'Hubungkait Suhu dengan Haba', [
        ['9.1.1', 'Membanding beza antara haba dengan suhu.'],
      ]),
      binaSk('9.2', 'Pengaliran Haba dan Keseimbangan Terma', [
        [
          '9.2.1',
          'Menerangkan haba mengalir dari kawasan panas ke kawasan sejuk.',
        ],
        [
          '9.2.2',
          'Menerangkan dan berkomunikasi mengenai pengaliran haba dalam fenomena alam (konduksi, perolakan dan sinaran).',
        ],
        [
          '9.2.3',
          'Berkomunikasi mengenai konduktor haba dan penebat haba serta kegunaan konduktor dan penebat haba dalam kehidupan harian.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 9.2.3: Mengkaji kegunaan bahan berbeza sebagai penebat haba.',
          },
        ],
      ]),
      binaSk('9.3', 'Prinsip Pengembangan dan Pengecutan Jirim', [
        [
          '9.3.1',
          'Menerangkan bagaimana haba menyebabkan pengembangan dan pengecutan dalam pepejal, cecair dan gas.',
        ],
        [
          '9.3.2',
          'Berkomunikasi mengenai pelbagai kegunaan pengembangan dan pengecutan jirim dalam kehidupan harian.',
        ],
      ]),
      binaSk(
        '9.4',
        'Hubungkait Jenis Permukaan Objek dengan Penyerapan dan Pembebasan Haba',
        [
          [
            '9.4.1',
            'Menunjuk cara bagaimana objek yang gelap dan kusam menyerap haba lebih baik daripada objek putih dan berkilat.',
            {
              eksperimenWajib: true,
              namaEksperimen:
                'Eksperimen 9.4.1 & 9.4.2: Mengkaji penyerapan dan pembebasan haba bagi permukaan objek gelap/kusam berbanding putih/berkilat.',
              radasBahan: [
                'Tin aluminium dicat hitam kusam',
                'Tin aluminium putih berkilat',
                'Termometer',
                'Penunu Bunsen / Air panas',
              ],
            },
          ],
          [
            '9.4.2',
            'Menunjuk cara bagaimana objek yang gelap dan kusam membebaskan haba lebih baik daripada objek putih dan berkilat.',
          ],
          [
            '9.4.3',
            'Mengkonsepsikan dan mereka bentuk menggunakan konsep haba dalam kehidupan harian (Projek Bangunan Hijau).',
          ],
        ]
      ),
    ]
  ),
  binaBabSains(
    'S_F2_B10',
    'Tingkatan 2',
    10,
    'Tenaga dan Kelestarian Hidup',
    'Gelombang Bunyi',
    'Ciri gelombang bunyi, kekuatan dan kelangsingan bunyi serta fenomena pantulan bunyi dan kesan Doppler.',
    [
      binaSk('10.1', 'Ciri-ciri Gelombang Bunyi', [
        [
          '10.1.1',
          'Berkomunikasi mengenai ciri asas gelombang bunyi (memerlukan medium, boleh dipantulkan dan diserap).',
        ],
      ]),
      binaSk('10.2', 'Kekuatan dan Kelangsingan Bunyi', [
        ['10.2.1', 'Menerangkan frekuensi bunyi dan unitnya serta amplitud getaran.'],
        ['10.2.2', 'Menghubungkaitkan frekuensi dengan kelangsingan.'],
        ['10.2.3', 'Menghubungkaitkan amplitud dengan kekuatan.'],
        [
          '10.2.4',
          'Menjelaskan menggunakan contoh kekuatan dan kelangsingan menggunakan alatan muzik.',
        ],
      ]),
      binaSk('10.3', 'Fenomena dan Aplikasi Pantulan Gelombang Bunyi', [
        [
          '10.3.1',
          'Menjelaskan dengan contoh fenomena yang berkait dengan pantulan gelombang bunyi seperti gema dan kesan Doppler bunyi.',
        ],
        [
          '10.3.2',
          'Menjelaskan dengan contoh aplikasi pantulan gelombang bunyi (sonar, ultrabunyi).',
        ],
        [
          '10.3.3',
          'Menerangkan dan berkomunikasi mengenai had pendengaran bagi manusia dan haiwan.',
        ],
        [
          '10.3.4',
          'Menerangkan dengan contoh cara mengatasi had pendengaran manusia.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F2_B11',
    'Tingkatan 2',
    11,
    'Penerokaan Bumi dan Angkasa Lepas',
    'Bintang dan Galaksi dalam Alam Semesta',
    'Jenis galaksi, Bima Sakti serta kelahiran dan kematian bintang.',
    [
      binaSk('11.1', 'Bintang dan Galaksi dalam Alam Semesta', [
        [
          '11.1.1',
          'Berkomunikasi mengenai ciri objek angkasa (galaksi, Bima Sakti, nebula, kitar hidup bintang).',
        ],
        [
          '11.1.2',
          'Membanding dan membezakan bintang (termasuk Matahari) berdasarkan ciri bintang dan hubungkaitkan dengan pemerhatian bintang di Bumi.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F2_B12',
    'Tingkatan 2',
    12,
    'Penerokaan Bumi dan Angkasa Lepas',
    'Sistem Suria',
    'Jarak planet dari Matahari (A.U. dan tahun cahaya), ciri-ciri planet dan hubungan suhu serta graviti.',
    [
      binaSk('12.1', 'Sistem Suria', [
        [
          '12.1.1',
          'Membandingkan jarak planet dalam sistem suria daripada Matahari dengan menggunakan astronomical unit (a.u.) dan tahun cahaya.',
        ],
        [
          '12.1.2',
          'Membina jadual untuk membanding dan membezakan antara planet Sistem Suria dengan Bumi.',
        ],
        [
          '12.1.3',
          'Meneroka hubungan yang mungkin berdasarkan ciri planet dan memberi penjelasan tentang hubungan tersebut termasuk anomali yang mungkin wujud.',
        ],
        [
          '12.1.4',
          'Menaakul dan menganalogikan situasi hipotetikal berkaitan dengan Sistem Suria.',
        ],
        [
          '12.1.5',
          'Menjustifikasi Bumi merupakan planet yang paling sesuai untuk kehidupan berdasarkan data tentang Bumi.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F2_B13',
    'Tingkatan 2',
    13,
    'Penerokaan Bumi dan Angkasa Lepas',
    'Meteoroid, Asteroid, Komet',
    'Ciri dan pergerakan jasad lain dalam Sistem Suria (meteoroid, asteroid dan komet) serta kesan perlanggaran.',
    [
      binaSk('13.1', 'Jasad Lain dalam Sistem Suria iaitu Meteoroid, Asteroid dan Komet', [
        [
          '13.1.1',
          'Berkomunikasi tentang jasad lain dalam sistem suria iaitu meteoroid, asteroid dan komet.',
        ],
        [
          '13.1.2',
          'Membincangkan pergerakan meteoroid, asteroid dan komet dan kesannya terhadap Bumi berdasarkan data.',
        ],
        [
          '13.1.3',
          'Menjana idea bagaimana mengurangkan atau mengelakkan kemungkinan berlakunya perlanggaran asteroid dengan Bumi.',
        ],
      ]),
    ]
  ),
];

// ============================================================================
// DSKP SAINS TINGKATAN 3 (BAHASA MELAYU) - BAB 1 HINGGA BAB 10
// ============================================================================
export const DSKP_SAINS_F3: BabKimia[] = [
  binaBabSains(
    'S_F3_B1',
    'Tingkatan 3',
    1,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Rangsangan dan Gerak Balas',
    'Sistem saraf manusia, organ deria, gerak balas tumbuhan (tropisme dan nastik) serta penglihatan/pendengaran haiwan.',
    [
      binaSk('1.1', 'Sistem Saraf Manusia', [
        [
          '1.1.1',
          'Memerihalkan dengan lakaran struktur dan fungsi sistem saraf manusia.',
        ],
        ['1.1.2', 'Membuat urutan aliran impuls dalam tindakan terkawal dan luar kawal.'],
        [
          '1.1.3',
          'Mewajarkan kepentingan rangkaian sistem saraf manusia dalam kehidupan.',
        ],
      ]),
      binaSk('1.2', 'Rangsangan dan Gerak Balas dalam Manusia', [
        [
          '1.2.1',
          'Melakar struktur organ deria dan menerangkan fungsi serta kepekaannya terhadap rangsangan.',
        ],
        [
          '1.2.2',
          'Menerangkan mekanisme pendengaran dan penglihatan dengan lakaran.',
        ],
        [
          '1.2.3',
          'Menghubungkaitkan organ deria manusia dengan kepekaan terhadap pelbagai kombinasi rangsangan.',
        ],
        [
          '1.2.4',
          'Menjelaskan melalui contoh bagaimana had deria, kecacatan organ deria dan proses penuaan mempengaruhi pendengaran dan penglihatan manusia.',
        ],
        [
          '1.2.5',
          'Mewajarkan bagaimana inovasi dan teknologi boleh meningkatkan keupayaan organ deria.',
        ],
      ]),
      binaSk('1.3', 'Rangsangan dan Gerak Balas dalam Tumbuhan', [
        [
          '1.3.1',
          'Memerihalkan bahagian tumbuhan yang peka terhadap rangsangan.',
        ],
        [
          '1.3.2',
          'Mewajarkan bagaimana tumbuhan bergerak balas terhadap rangsangan untuk mendapatkan keadaan terbaik bagi tumbesaran.',
        ],
        [
          '1.3.3',
          'Menjalankan eksperimen mengkaji gerak balas tumbuhan terhadap pelbagai rangsangan.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 1.3.3: Mengkaji gerak balas tumbuhan terhadap cahaya (fototropisme), air (hidrotropisme), graviti (geotropisme) dan sentuhan (tigmotropisme).',
            radasBahan: [
              'Anak benih kacang hijau',
              'Kapas lembap',
              'Kotak berlubang',
              'Kalsium klorida kontang',
              'Piring Petri',
            ],
          },
        ],
      ]),
      binaSk(
        '1.4',
        'Kepentingan Gerak Balas terhadap Rangsangan dalam Haiwan Lain',
        [
          [
            '1.4.1',
            'Menjelaskan dengan contoh jenis penglihatan dan pendengaran haiwan (penglihatan stereoskopik/monokular dan pendengaran stereofonik).',
          ],
          [
            '1.4.2',
            'Berkomunikasi mengenai bagaimana organ deria memastikan kesinambungan haiwan di Bumi.',
          ],
        ]
      ),
    ]
  ),
  binaBabSains(
    'S_F3_B2',
    'Tingkatan 3',
    2,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Respirasi',
    'Sistem respirasi manusia, pertukaran gas di alveolus, kesihatan sistem respirasi dan stoma tumbuhan.',
    [
      binaSk('2.1', 'Sistem Respirasi', [
        [
          '2.1.1',
          'Melakar dan melabel struktur dalam sistem respirasi manusia serta memerihalkan mekanisme pernafasan.',
        ],
        [
          '2.1.2',
          'Menjalankan eksperimen mengkaji perbezaan kandungan gas dalam udara sedutan dan udara hembusan.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 2.1.2: Mengkaji perbezaan peratus kandungan oksigen dan karbon dioksida dalam udara sedutan dan udara hembusan.',
            radasBahan: [
              'Balang gas',
              'Lilin',
              'Besen air',
              'Air kapur / Penunjuk hidrogen karbonat',
              'Salur penghantar',
            ],
          },
        ],
      ]),
      binaSk('2.2', 'Pergerakan dan Pertukaran Gas di dalam Badan Manusia', [
        [
          '2.2.1',
          'Memerihalkan pergerakan dan pertukaran gas oksigen dan karbon dioksida dalam badan manusia.',
        ],
        [
          '2.2.2',
          'Mewajarkan kepentingan adaptasi struktur alveolus untuk meningkatkan kecekapan pertukaran gas dalam badan manusia.',
        ],
      ]),
      binaSk('2.3', 'Kesihatan Sistem Respirasi Manusia', [
        [
          '2.3.1',
          'Berkomunikasi mengenai bahan yang memudaratkan sistem respirasi beserta penyakit dan simptomnya.',
        ],
        [
          '2.3.2',
          'Menjalankan eksperimen untuk menunjukkan kesan merokok terhadap peparu.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 2.3.2: Menunjukkan kesan merokok terhadap peparu (suhu, tar rokok dan gas berasid).',
            radasBahan: [
              'Tiub-U',
              'Kapas putih',
              'Larutan penunjuk semesta / litmus',
              'Termometer',
              'Pam turas',
            ],
          },
        ],
      ]),
      binaSk('2.4', 'Adaptasi dalam Sistem Respirasi', [
        [
          '2.4.1',
          'Mewajarkan bagaimana sistem respirasi beradaptasi dalam situasi berbeza (insang, trakea, kulit luar lembap).',
        ],
      ]),
      binaSk('2.5', 'Pertukaran Gas dalam Tumbuhan', [
        ['2.5.1', 'Menerangkan mekanisme pertukaran gas dalam tumbuhan.'],
        [
          '2.5.2',
          'ari berkomunikasi bagi mewajarkan kepentingan persekitaran yang tidak tercemar untuk tumbesaran dan kemandirian tumbuhan.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F3_B3',
    'Tingkatan 3',
    3,
    'Penyenggaraan dan Kesinambungan Hidup',
    'Pengangkutan',
    'Sistem pengangkutan dalam organisma, sistem peredaran darah manusia, kumpulan darah dan transpirasi tumbuhan.',
    [
      binaSk('3.1', 'Sistem Pengangkutan dalam Organisma', [
        ['3.1.1', 'Memerihalkan fungsi sistem pengangkutan dalam organisma kompleks dan organisma ringkas.'],
        [
          '3.1.2',
          'Membanding dan membezakan fungsi sistem pengangkutan dalam organisma kompleks dan organisma ringkas.',
        ],
        ['3.1.3', 'Mewajarkan kepentingan fungsi sistem pengangkutan dalam organisma.'],
      ]),
      binaSk('3.2', 'Sistem Peredaran Darah', [
        [
          '3.2.1',
          'Mengitlak maksud sistem peredaran darah haiwan vertebrata.',
        ],
        [
          '3.2.2',
          'Berkomunikasi untuk menerangkan struktur dan fungsi jantung serta salur darah dalam sistem peredaran darah manusia.',
        ],
        [
          '3.2.3',
          'Menjalankan eksperimen untuk mengkaji faktor yang mempengaruhi kadar denyutan nadi.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 3.2.3: Mengkaji faktor yang mempengaruhi kadar denyutan nadi (jantina, umur dan aktiviti fizikal).',
            radasBahan: ['Jam randik'],
          },
        ],
        [
          '3.2.4',
          'Mewajarkan kepentingan mengekalkan jantung yang sihat.',
        ],
      ]),
      binaSk('3.3', 'Darah Manusia', [
        [
          '3.3.1',
          'Mencerakinkan komponen dan kandungan darah manusia.',
        ],
        [
          '3.3.2',
          'Mengenal pasti kumpulan darah serta kesan menerima darah yang tidak sepadan.',
        ],
        [
          '3.3.3',
          'Berkomunikasi mengenai kepentingan menderma darah dalam konteks kehidupan harian.',
        ],
      ]),
      binaSk('3.4', 'Pengangkutan dalam Tumbuhan', [
        [
          '3.4.1',
          'Memerihalkan transpirasi dalam tumbuhan.',
        ],
        [
          '3.4.2',
          'Menjalankan eksperimen untuk mengkaji faktor yang mempengaruhi kadar transpirasi.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 3.4.2: Mengkaji faktor yang mempengaruhi kadar transpirasi (keamatan cahaya, suhu, kelembapan udara dan pergerakan udara).',
            radasBahan: [
              'Potometer / Neraca elektronik',
              'Keratan pokok berdaun',
              'Kelalang kon',
              'Minyak',
              'Kipas',
              'Lampu',
            ],
          },
        ],
        [
          '3.4.3',
          'Membezakan struktur dan fungsi komponen dalam berkas vaskular pada tumbuhan (xilem dan floem).',
        ],
      ]),
      binaSk('3.5', 'Sistem Peredaran Darah Haiwan dan Sistem Pengangkutan Tumbuhan', [
        [
          '3.5.1',
          'Membandingkan sistem peredaran darah dalam haiwan dengan sistem pengangkutan dalam tumbuhan.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F3_B4',
    'Tingkatan 3',
    4,
    'Penerokaan Unsur dalam Alam',
    'Kereaktifan Logam',
    'Kepelbagaian mineral, siri kereaktifan logam dan pengekstrakan logam daripada bijihnya.',
    [
      binaSk('4.1', 'Kepelbagaian Mineral', [
        [
          '4.1.1',
          'Menjelaskan dengan contoh kepelbagaian bentuk mineral dalam kerak bumi.',
        ],
        ['4.1.2', 'Mengenal pasti unsur yang terdapat dalam sebatian semula jadi.'],
        [
          '4.1.3',
          'Menjelaskan dengan contoh ciri mineral semula jadi dengan kegunaan dalam kehidupan harian.',
        ],
      ]),
      binaSk('4.2', 'Siri Kereaktifan Logam', [
        [
          '4.2.1',
          'Membina siri kereaktifan logam berdasarkan tindak balas logam terhadap oksigen serta menulis persamaan perkataan bagi tindak balas tersebut.',
        ],
        [
          '4.2.2',
          'Menentukan kedudukan karbon dan hidrogen dalam siri kereaktifan logam.',
        ],
      ]),
      binaSk('4.3', 'Pengekstrakan Logam daripada Bijihnya', [
        [
          '4.3.1',
          'Berkomunikasi dengan melukis pengesktrakan logam daripada bijihnya.',
        ],
        [
          '4.3.2',
          'Menjana idea untuk menyelesaikan masalah kesan buruk daripada aktiviti perlombongan yang tidak dirancang dengan baik kepada semua hidupan di Bumi.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F3_B5',
    'Tingkatan 3',
    5,
    'Penerokaan Unsur dalam Alam',
    'Termokimia',
    'Tindak balas endotermik dan eksotermik serta aplikasinya dalam kehidupan harian.',
    [
      binaSk('5.1', 'Tindak Balas Endotermik dan Eksotermik', [
        ['5.1.1', 'Mendefinisikan tindak balas endotermik dan tindak balas eksotermik.'],
        [
          '5.1.2',
          'Menghubungkaitkan haba yang diserap atau dibebaskan dalam tindak balas kimia kepada tindak balas endotermik dan tindak balas eksotermik.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 5.1.2: Membanding dan membezakan tindak balas eksotermik dan endotermik.',
            radasBahan: [
              'Cawan polistirena',
              'Termometer',
              'Natrium hidroksida',
              'Ammonium klorida',
              'Asid hidroklorik cair',
              'Natrium hidrogen karbonat',
            ],
          },
        ],
        [
          '5.1.3',
          'Menjelaskan dengan contoh tindak balas eksotermik dan tindak balas endotermik.',
        ],
        [
          '5.1.4',
          'Mereka bentuk bahan yang menggunakan konsep tindak balas eksotermik dan endotermik bagi menyelesaikan masalah dalam kehidupan.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F3_B6',
    'Tingkatan 3',
    6,
    'Tenaga dan Kelestarian Hidup',
    'Keelektrikan dan Kemagnetan',
    'Penjanaan tenaga elektrik, transformer, penghantaran dan pengagihan elektrik serta pengiraan kos elektrik.',
    [
      binaSk('6.1', 'Penjanaan Tenaga Elektrik', [
        [
          '6.1.1',
          'Memerihalkan sumber tenaga kepada tenaga boleh baharu dan tenaga tidak boleh baharu.',
        ],
        [
          '6.1.2',
          'Menerangkan dengan contoh proses penjanaan tenaga elektrik daripada pelbagai sumber tenaga.',
        ],
        ['6.1.3', 'Membezakan antara arus terus dan arus ulang-alik.'],
        [
          '6.1.4',
          'Menyelesaikan masalah berkaitan bekalan tenaga elektrik dalam kehidupan.',
        ],
      ]),
      binaSk('6.2', 'Transformer', [
        [
          '6.2.1',
          'Menjalankan eksperimen membina transformer injak naik dan injak turun.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Eksperimen 6.2.1: Membina dan mengkaji fungsi transformer injak naik dan transformer injak turun.',
            radasBahan: [
              'Teras besi lembut berlamina',
              'Gegelung dawai kuprum bertebat',
              'Bekalan kuasa AU',
              'Voltmeter AU',
              'Mentol',
            ],
          },
        ],
        [
          '6.2.2',
          'Berkomunikasi mengenai transformer dan fungsi transformer dalam penggunaan peralatan elektrik di rumah.',
        ],
        [
          '6.2.3',
          'Menyelesaikan masalah berkaitan transformer menggunakan rumus Np/Ns = Vp/Vs.',
        ],
      ]),
      binaSk('6.3', 'Penghantaran dan Pengagihan Tenaga Elektrik', [
        [
          '6.3.1',
          'Menerangkan fungsi komponen dalam sistem penghantaran dan pengagihan tenaga elektrik dengan lakaran visual.',
        ],
        [
          '6.3.2',
          'Menerangkan dengan contoh pembekalan elektrik dan sistem pendawaian elektrik di rumah.',
        ],
        ['6.3.3', 'Membezakan komponen keselamatan dalam sistem pendawaian di rumah.'],
        [
          '6.3.4',
          'Berkomunikasi mengenai keselamatan dalam sistem penghantaran dan pengagihan tenaga elektrik dan penggunaan peralatan elektrik.',
        ],
      ]),
      binaSk('6.4', 'Pengiraan Kos Penggunaan Elektrik', [
        ['6.4.1', 'Mendefinisikan maksud kecekapan tenaga.'],
        [
          '6.4.2',
          'Menyenaraikan contoh teknologi yang berkonsepkan kecekapan tenaga.',
        ],
        [
          '6.4.3',
          'Menentukan jumlah penggunaan tenaga elektrik dalam peralatan elektrik.',
        ],
        [
          '6.4.4',
          'Menghubungkaitkan penggunaan tenaga elektrik, kuasa dan masa dengan mengira kos penggunaan tenaga elektrik peralatan elektrik.',
        ],
        [
          '6.4.5',
          'Membuat audit kos penggunaan tenaga elektrik rumah sebagai langkah penjimatan dalam penggunaan tenaga elektrik.',
        ],
        [
          '6.4.6',
          'Berkomunikasi mengenai kaedah penjimatan penggunaan tenaga elektrik.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F3_B7',
    'Tingkatan 3',
    7,
    'Tenaga dan Kelestarian Hidup',
    'Tenaga dan Kuasa',
    'Kerja, tenaga dan kuasa, tenaga keupayaan (graviti dan kenyal), tenaga kinetik dan Prinsip Keabadian Tenaga.',
    [
      binaSk('7.1', 'Kerja, Tenaga dan Kuasa', [
        [
          '7.1.1',
          'Mendefinisikan kerja dan menyelesaikan masalah berkaitan tenaga dalam kehidupan harian (W = Fs).',
        ],
        [
          '7.1.2',
          'Menghubungkaitkan kuasa dengan kerja dan menyelesaikan masalah dalam kehidupan harian (P = W/t).',
        ],
      ]),
      binaSk('7.2', 'Tenaga Keupayaan dan Tenaga Kinetik', [
        [
          '7.2.1',
          'Menerangkan dengan contoh tenaga keupayaan graviti dan menyelesaikan masalah dalam kehidupan harian (mgh).',
        ],
        ['7.2.2', 'Mengirakan tenaga keupayaan kenyal dalam kehidupan harian (1/2 Fx).'],
        ['7.2.3', 'Menerangkan dengan contoh tenaga kinetik dalam kehidupan harian (1/2 mv²).'],
      ]),
      binaSk('7.3', 'Prinsip Keabadian Tenaga', [
        ['7.3.1', 'Menerangkan dengan contoh Prinsip Keabadian Tenaga.'],
        [
          '7.3.2',
          'Menyelesaikan masalah kualitatif dan kuantitatif melibatkan perubahan tenaga kinetik dan tenaga keupayaan bagi suatu sistem tertutup.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F3_B8',
    'Tingkatan 3',
    8,
    'Tenaga dan Kelestarian Hidup',
    'Keradioaktifan',
    'Sejarah penemuan keradioaktifan, struktur atom dan isotop, sinaran mengion/tidak mengion serta kegunaan sinaran radioaktif.',
    [
      binaSk('8.1', 'Sejarah Penemuan Keradioaktifan', [
        ['8.1.1', 'Memerihalkan sejarah penemuan keradioaktifan.'],
        [
          '8.1.2',
          'Menerangkan dengan contoh maksud bahan radioaktif, keradioaktifan dan konsep separuh hayat pereputan radioaktif.',
        ],
      ]),
      binaSk('8.2', 'Atom dan Nukleus', [
        ['8.2.1', 'Melukis struktur atom yang menunjukkan keadaan stabil.'],
        ['8.2.2', 'Menerangkan pembentukan ion positif dan ion negatif.'],
      ]),
      binaSk('8.3', 'Sinaran Mengion dan Sinaran Tidak Mengion', [
        ['8.3.1', 'Memerihalkan sinaran mengion dan sinaran tidak mengion.'],
        ['8.3.2', 'Membezakan tiga jenis sinaran mengion dalam reputan radioaktif (alfa, beta, gama).'],
        [
          '8.3.3',
          'Menjelaskan dengan contoh sumber sinaran mengion dalam alam sekitar iaitu sumber semula jadi dan sumber buatan manusia.',
        ],
        [
          '8.3.4',
          'Membincangkan cara mengurus risiko terdedah kepada sinaran mengion semula jadi dan buatan manusia.',
        ],
      ]),
      binaSk('8.4', 'Kegunaan Sinaran Radioaktif', [
        [
          '8.4.1',
          'Berkomunikasi tentang kegunaan sinaran radioaktif untuk kesejahteraan manusia.',
        ],
        [
          '8.4.2',
          'Mewajarkan kepentingan mengendalikan bahan radioaktif dan sisa bahan radioaktif dengan sempurna.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F3_B9',
    'Tingkatan 3',
    9,
    'Penerokaan Bumi dan Angkasa Lepas',
    'Cuaca Angkasa Lepas',
    'Struktur dan fenomena di permukaan Matahari serta kesan cuaca angkasa lepas terhadap Bumi.',
    [
      binaSk('9.1', 'Aktiviti Matahari yang Memberi Kesan kepada Bumi', [
        [
          '9.1.1',
          'Menerangkan dengan lakaran mengenai struktur dan fenomena yang berlaku di permukaan Matahari.',
        ],
        [
          '9.1.2',
          'Mewajarkan kepentingan magnetosfera Bumi.',
        ],
      ]),
      binaSk('9.2', 'Cuaca Angkasa', [
        [
          '9.2.1',
          'Berkomunikasi mengenai cuaca angkasa lepas dan kesannya terhadap Bumi.',
        ],
      ]),
    ]
  ),
  binaBabSains(
    'S_F3_B10',
    'Tingkatan 3',
    10,
    'Penerokaan Bumi dan Angkasa Lepas',
    'Penerokaan Angkasa Lepas',
    'Perkembangan sejarah model Sistem Suria dan perkembangan teknologi dalam penerokaan angkasa lepas.',
    [
      binaSk('10.1', 'Perkembangan dalam Astronomi', [
        [
          '10.1.1',
          'Menerangkan dengan lakaran mengenai perkembangan sejarah model Sistem Suria (Ptolemy, Copernicus dan Kepler).',
        ],
      ]),
      binaSk('10.2', 'Perkembangan Teknologi dan Aplikasinya dalam Penerokaan Angkasa Lepas', [
        [
          '10.2.1',
          'Berkomunikasi mengenai kepentingan perkembangan teknologi dan aplikasinya dalam penerokaan angkasa lepas.',
        ],
        [
          '10.2.2',
          'Mewajarkan keperluan meneruskan penerokaan angkasa lepas.',
        ],
      ]),
    ]
  ),
];

export { binaSpSainsBM, binaSk, binaBabSains };
