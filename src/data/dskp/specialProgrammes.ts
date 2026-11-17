import { BabKimia, Tingkatan } from '../../types/rph';

function createSpecialBabBM(tingkatan: Tingkatan): BabKimia {
  const prefix = tingkatan === 'Tingkatan 4' ? 'F4' : 'F5';
  return {
    id: `${prefix}_KHAS`,
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
        tajuk: 'Aktiviti Ulangkaji Berfokus & Klinik Kimia',
        spList: [
          {
            kod: 'K1.1',
            tajuk: 'Ulangkaji Topikal & Latih Tubi Berfokus Kertas 1 dan Kertas 2 Kimia.',
            objektifCadangan: [
              'Di akhir sesi ulangkaji, murid dapat menyelesaikan sekurang-kurangnya 10 soalan objektif Kertas 1 dan 2 soalan struktur Kertas 2 dengan kaedah yang tepat.',
              'Mengenal pasti kesilapan lazim (common errors) dalam penulisan persamaan kimia dan pengiraan.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid berjaya menjawab sekurang-kurangnya 80% soalan ulangkaji topikal dengan tepat.',
              'Murid dapat menerangkan kata kunci jawapan mengikut skema pemarkahan SPM.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Guru mengimbas kembali konsep utama topik sasaran menggunakan peta minda ringkas dan kuiz pantas 3 minit.',
              aktivitiUtama: [
                '1. Murid menjawab set soalan Ulangkaji Berfokus secara individu dalam tempoh masa ditetapkan.',
                '2. Aktiviti Think-Pair-Share: Murid menyemak jawapan bersama rakan sebaya dan membincangkan kata kunci.',
                '3. Guru membuat bedah siasat soalan kritikal dan membimbing murid yang memerlukan pemulihan konsep.',
              ],
              penutup:
                'Murid mencatat 3 perkara penting yang dipelajari dan 1 perkara yang perlu diperkukuh pada buku nota ulangkaji.',
              aktiviti5E: {
                engage:
                  'Guru memaparkan 1 soalan perangkap SPM yang sering dijawab salah oleh calon untuk mencetuskan perbincangan.',
                explore:
                  'Murid menyelesaikan modul ulangkaji berfokus dalam kumpulan kecil mengikut aras keupayaan.',
                explain:
                  'Wakil kumpulan membentangkan langkah penyelesaian di papan putih dan guru memperkemas teknik menjawab.',
                elaborate:
                  'Murid mencuba soalan variasi klon SPM untuk menguji penguasaan konsep secara mendalam.',
                evaluate:
                  'Semakan kendiri berdasarkan rubrik pemarkahan dan exit ticket.',
              },
            },
            bbmCadangan: ['Modul Ulangkaji Berfokus Kimia', 'Koleksi Soalan Percubaan SPM', 'Skema Pemarkahan'],
            kemahiranSaintifikCadangan: ['Mentafsir data', 'Berkomunikasi', 'Menganalisis'],
          },
          {
            kod: 'K1.2',
            tajuk: 'Perbincangan & Pembetulan Kertas Peperiksaan / Ujian Diagnostik Kimia.',
            objektifCadangan: [
              'Di akhir sesi PdPc, murid dapat mengenal pasti kelemahan jawapan masing-masing dan membuat pembetulan lengkap bagi semua soalan yang salah.',
              'Menguasai teknik penulisan jawapan tepat mengikut kehendak kata tugas soalan (State, Explain, Compare, Calculate).',
            ],
            kriteriaKejayaanCadangan: [
              'Murid melengkapkan pembetulan Kertas 1 dan Kertas 2 menggunakan pen dakwat merah/biru dengan kemas.',
              'Murid dapat mengenal pasti sekurang-kurangnya 3 kata kunci wajib bagi soalan esei/struktur.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Guru membentangkan analisis pencapaian keseluruhan kelas dan memberikan motivasi positif.',
              aktivitiUtama: [
                '1. Guru mengedarkan skrip jawapan murid dan membincangkan soalan yang mempunyai peratus kesalahan tertinggi.',
                '2. Aktiviti Klinik Rakan Sebaya (Peer Coaching): Murid cemerlang membantu rakan sekumpulan membuat pembetulan.',
                '3. Murid menyalin semula skema jawapan lengkap bagi bahagian struktur dan esei.',
              ],
              penutup:
                'Guru menyemak buku/kertas pembetulan murid dan menetapkan sasaran peningkatan gred ujian seterusnya.',
              aktiviti5E: {
                engage: 'Guru berkongsi statistik item soalan paling mencabar dalam ujian baru-baru ini.',
                explore: 'Murid menyemak skrip jawapan sendiri dan membandingkannya dengan skema pemarkahan rasmi.',
                explain: 'Guru menghuraikan punca kehilangan markah (tiada unit, persamaan tidak seimbang, istilah kurang tepat).',
                elaborate: 'Murid menjawab semula 2 soalan mirip bagi mengukuhkan kefahaman selepas pembetulan.',
                evaluate: 'Pengesahan pembetulan oleh guru dan refleksi sasaran gred individu.',
              },
            },
            bbmCadangan: ['Skrip Jawapan Murid', 'Skema Pemarkahan Rasmi', 'Analisis Item Peperiksaan'],
            kemahiranSaintifikCadangan: ['Mentafsir data', 'Berkomunikasi'],
          },
          {
            kod: 'K1.3',
            tajuk: 'Ulangkaji Amali & Pemantapan Teknik Menjawab Kertas 3 (Amali Sains).',
            objektifCadangan: [
              'Di akhir sesi PdPc, murid dapat merekod bacaan alat pengukur dengan kejituan titik perpuluhan yang betul serta membina jadual keputusan eksperimen.',
              'Menyatakan hipotesis, pemboleh ubah (manipulasi, bergerak balas, dimalarkan) dan definisi secara operasi dengan tepat.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid berjaya melengkapkan simulasi / latihan laporan amali Kertas 3 dengan markah sekurang-kurangnya 12/15.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Guru memaparkan gambar bacaan meniskus buret dan termometer untuk diuji kejituan bacaan murid.',
              aktivitiUtama: [
                '1. Ulangkaji kemahiran proses sains (KPS): Pemboleh ubah, Hipotesis, Definisi Secara Operasi (DSO) dan Graf.',
                '2. Latihan amali berfokus / semakan senarai eksperimen wajib KSSM Kimia.',
                '3. Semakan silang jawapan Kertas 3 menggunakan senarai semak rubrik amali.',
              ],
              penutup: 'Rumusan tip skor penuh Kertas 3 Kimia SPM.',
              aktiviti5E: {
                engage: 'Soal jawab pantas kejituan alat radas (buret 2 t.p., silinder penyukat 1 t.p., jam randik).',
                explore: 'Murid menganalisis set data eksperimen dan melukis graf garis lurus/lengkung licin.',
                explain: 'Perbincangan cara menulis Definisi Secara Operasi (What is done + What is observed).',
                elaborate: 'Murid merangka prosedur eksperimen tidak berpandu (rekabentuk eksperimen).',
                evaluate: 'Pentaksiran formatif Kertas 3.',
              },
            },
            bbmCadangan: ['Modul Kertas 3 Amali Kimia', 'Kertas Graf', 'Radas Makmal Contoh'],
            kemahiranSaintifikCadangan: ['Mengawal pemboleh ubah', 'Membuat hipotesis', 'Mendefinisi secara operasi'],
          },
        ],
      },
      {
        kod: 'K2.0',
        tajuk: 'Slot Gemilang (Program Kecemerlangan & Pengukuhan Kimia)',
        spList: [
          {
            kod: 'K2.1',
            tajuk: 'Slot Gemilang: Bengkel Teknik Menjawab & Kata Kunci Pemarkahan Kimia SPM.',
            objektifCadangan: [
              'Di akhir Slot Gemilang, murid dapat mengaplikasikan teknik menjawab berstruktur (Formula 3K: Konsep, Kata Kunci, Kiraan) bagi soalan Kertas 2.',
              'Meningkatkan keyakinan menjawab soalan Bahagian B dan Bahagian C dengan sistematik.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid berjaya merangka jawapan penuh bagi sekurang-kurangnya 2 soalan struktur dan 1 soalan esei mengikut format pemarkahan.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Guru menerangkan objektif Slot Gemilang dan memaparkan perbandingan jawapan calon cemerlang vs jawapan umum.',
              aktivitiUtama: [
                '1. Pendedahan teknik menggariskan kata tugas dan maklumat penting dalam situasi soalan.',
                '2. Bengkel kumpulan: Murid merangka jawapan esei menggunakan jadual perbandingan dan poin berstruktur.',
                '3. Pembentangan kumpulan (Gallery Walk) dan pemberian markah secara langsung oleh guru.',
              ],
              penutup:
                'Murid melengkapkan senarai semak Kata Kunci Gemilang bagi topik yang dibincangkan.',
              aktiviti5E: {
                engage: 'Guru memaparkan contoh skrip jawapan penuh markah (full marks) untuk memberi inspirasi.',
                explore: 'Murid bekerjasama dalam kumpulan menganalisis kehendak soalan dan menyusun poin jawapan.',
                explain: 'Wakil kumpulan membentangkan rangka jawapan dan guru memberi maklum balas penambahbaikan.',
                elaborate: 'Latihan kendiri menjawab soalan Bahagian B/C dalam masa sebenar peperiksaan.',
                evaluate: 'Penilaian kendiri dan rakan sebaya berdasarkan skema pemarkahan.',
              },
            },
            bbmCadangan: ['Modul Slot Gemilang Kimia', 'Kertas Mahjong / Papan Putih Mini', 'Pen Penanda Warna'],
            kemahiranSaintifikCadangan: ['Berkomunikasi', 'Mentafsir data'],
          },
          {
            kod: 'K2.2',
            tajuk: 'Slot Gemilang: Klinik Pengukuhan Konsep Asas & Pengiraan Stoikiometri / Mol.',
            objektifCadangan: [
              'Di akhir Slot Gemilang, murid dapat menguasai langkah pengiraan mol, kepekatan dan persamaan kimia seimbang tanpa ralat.',
              'Membina penguasaan asas yang kukuh bagi murid kumpulan sederhana dan harapan lulus/cemerlang.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid berjaya menyelesaikan sekurang-kurangnya 4 daripada 5 soalan pengiraan langkah demi langkah.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Imbasan pantas segitiga formula mol (Jisim, Isi padu gas, Bilangan zarah, Kemolaran MV/1000).',
              aktivitiUtama: [
                '1. Bimbingan berfokus langkah 4-Step Stoikiometri (Tulis persamaan -> Kira mol -> Nisbah mol -> Jawapan akhir + unit).',
                '2. Latih tubi berperingkat dalam kumpulan kecil dengan bimbingan Guru Muda (Young Tutors).',
                '3. Semakan jawapan individu oleh guru.',
              ],
              penutup: 'Kuiz pengesahan penguasaan 2 soalan pantas.',
              aktiviti5E: {
                engage: 'Permainan kad padanan formula mol dan unit kimia.',
                explore: 'Murid menyelesaikan set soalan berpandu menggunakan templat 4-Langkah.',
                explain: 'Guru Muda membimbing rakan menerangkan langkah pengiraan yang betul.',
                elaborate: 'Murid menyelesaikan masalah gabungan kepekatan dan peneutralan/tindak balas.',
                evaluate: 'Exit ticket pengiraan mol.',
              },
            },
            bbmCadangan: ['Templat 4-Langkah Pengiraan Kimia', 'Modul Slot Gemilang', 'Kalkulator Saintifik'],
            kemahiranSaintifikCadangan: ['Mengukur dan menggunakan nombor', 'Berkomunikasi'],
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
              'Di akhir Slot Mumtaz, murid dapat menganalisis dan menyelesaikan sekurang-kurangnya 3 soalan KBAT aras Menganalisis, Menilai dan Mencipta dengan hujah saintifik yang jitu.',
              'Menghubungkaitkan konsep merentas bab (cross-topic integration) dalam menyelesaikan soalan klon SPM aras tinggi.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid berjaya menghasilkan jawapan KBAT yang lengkap merangkumi Pernyataan/Pilihan, Alasan Saintifik dan Kesimpulan.',
              'Murid memperoleh sekurang-kurangnya 85% markah dalam cabaran soalan Slot Mumtaz.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Guru mengemukakan satu senario industri/alam sekitar sebenar yang memerlukan penyelesaian kimia beraras tinggi.',
              aktivitiUtama: [
                '1. Analisis soalan KBAT merentas topik menggunakan pendekatan CER (Claim, Evidence, Reasoning).',
                '2. Perbincangan meja bulat (Round Table) dalam kalangan murid bagi merangka jawapan bernilai penuh.',
                '3. Sesi Hot Seat: Wakil kumpulan mempertahankan jawapan dan justifikasi pemilihan bahan/kaedah di hadapan kelas.',
              ],
              penutup:
                'Rumusan strategi mencapai gred A+ (Mumtaz) dan refleksi kendiri.',
              aktiviti5E: {
                engage: 'Paparan kajian kes permasalahan kimia industri / teknologi hijau untuk dicungkil penyelesaiannya.',
                explore: 'Murid menganalisis data jadual/graf kompleks secara kolaboratif bagi mencari pola saintifik.',
                explain: 'Pembentangan jawapan menggunakan kerangka Claim-Evidence-Reasoning (CER).',
                elaborate: 'Cabaran mereka cipta / mengubah suai eksperimen atau radas bagi meningkatkan keberkesanan tindak balas.',
                evaluate: 'Penilaian rubrik A+ Slot Mumtaz.',
              },
            },
            bbmCadangan: ['Modul Pecutan A+ Slot Mumtaz', 'Koleksi Soalan KBAT SBP & MRSM', 'Papan Putih Mini'],
            kemahiranSaintifikCadangan: ['Mentafsir data', 'Membuat inferens', 'Meramal', 'Berkomunikasi'],
          },
          {
            kod: 'K3.2',
            tajuk: 'Slot Mumtaz: Kuiz Cabaran Mumtaz & Simulasi Soalan Esei Reka Bentuk Eksperimen.',
            objektifCadangan: [
              'Di akhir Slot Mumtaz, murid dapat merangka laporan reka bentuk eksperimen (10 markah) secara lengkap dalam tempoh 15 minit.',
              'Menguasai ketepatan penggunaan istilah kimia, persamaan setengah, dan persamaan ion tanpa sebarang kecuaian.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid berjaya menulis prosedur eksperimen lengkap berserta gambar rajah berlabel, jadual data dan langkah berjaga-jaga.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Cabaran kilat 5 minit: Menulis persamaan kimia/ion seimbang tanpa rujukan buku.',
              aktivitiUtama: [
                '1. Simulasi menjawab soalan esei Bahagian C (Reka Bentuk Eksperimen) secara berpasangan.',
                '2. Pertukaran skrip jawapan antara kumpulan untuk semakan rakan sebaya (Peer Audit) menggunakan skema rasmi.',
                '3. Perbincangan kesilapan teknikal yang sering menghalang calon mendapat A+.',
              ],
              penutup: 'Penghargaan kepada kumpulan terbaik Slot Mumtaz.',
              aktiviti5E: {
                engage: 'Kuiz pantas persamaan ion & pemerhatian warna mendakan/larutan.',
                explore: 'Murid merangka pelan eksperimen lengkap berdasarkan pernyataan masalah yang diberikan.',
                explain: 'Audit silang skrip jawapan antara kumpulan dan pembentangan penambahbaikan.',
                elaborate: 'Perbincangan variasi soalan eksperimen daripada pelbagai kertas percubaan negeri/MRSM/SBP.',
                evaluate: 'Refleksi penguasaan skor 10/10 esei eksperimen.',
              },
            },
            bbmCadangan: ['Set Soalan Percubaan MRSM & SBP', 'Senarai Semak A+ Kimia'],
            kemahiranSaintifikCadangan: ['Mengeksperimen', 'Mengawal pemboleh ubah', 'Berkomunikasi'],
          },
        ],
      },
      {
        kod: 'K4.0',
        tajuk: 'Minggu Peperiksaan, Pentaksiran & Minggu Aktiviti Sekolah/Maktab',
        spList: [
          {
            kod: 'K4.1',
            tajuk: 'Pelaksanaan & Pengawasan Peperiksaan / Pentaksiran Sumatif Sekolah.',
            objektifCadangan: [
              'Memastikan murid menduduki peperiksaan / ujian sumatif mengikut jadual dan peraturan peperiksaan yang ditetapkan dengan lancar dan berintegriti.',
            ],
            kriteriaKejayaanCadangan: [
              '100% murid yang hadir menduduki kertas peperiksaan dengan mematuhi SOP peperiksaan.',
              'Skrip jawapan murid dikumpulkan dan direkodkan dengan lengkap.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Guru menyemak kehadiran murid, memastikan susunan meja mengikut jarak peperiksaan dan membacakan arahan peperiksaan.',
              aktivitiUtama: [
                '1. Mengedarkan kertas soalan peperiksaan kepada murid dan meminta murid menyemak bilangan halaman.',
                '2. Mengawasi perjalanan peperiksaan dengan rapi bagi memastikan ketenteraman dan kejujuran akademik.',
                '3. Mengumpulkan kertas jawapan murid mengikut urutan angka giliran/nama apabila masa tamat.',
              ],
              penutup: 'Guru mengesahkan bilangan skrip jawapan mencukupi sebelum menyerahkannya kepada bilik peperiksaan.',
              aktiviti5E: {
                engage: 'Taklimat ringkas peraturan peperiksaan dan semakan kehadiran calon.',
                explore: 'Calon menjawab kertas peperiksaan dalam tempoh masa yang ditetapkan.',
                explain: 'Guru memantau perjalanan peperiksaan dan mencatat kehadiran.',
                elaborate: 'Pengurusan masa menjawab oleh calon.',
                evaluate: 'Kutipan dan pengiraan skrip jawapan peperiksaan.',
              },
            },
            bbmCadangan: ['Kertas Soalan Peperiksaan', 'Kertas Jawapan / OMR', 'Rekod Kehadiran Peperiksaan'],
            kemahiranSaintifikCadangan: ['Memerhati', 'Berkomunikasi'],
          },
          {
            kod: 'K4.2',
            tajuk: 'Minggu Aktiviti Sekolah/Maktab: Karnival STEM, Eksplorasi Kimia & Projek Inovasi.',
            objektifCadangan: [
              'Di akhir sesi aktiviti, murid dapat mengaplikasikan konsep kimia secara menyeronokkan melalui aktiviti luar bilik darjah / projek STEM / pertandingan inovasi.',
              'Memupuk minat mendalam terhadap STEM serta kemahiran kerja berpasukan dan komunikasi.',
            ],
            kriteriaKejayaanCadangan: [
              'Murid melibatkan diri secara aktif dan berjaya menyelesaikan cabaran / demonstrasi stesen STEM Kimia.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Taklimat peraturan keselamatan dan pembahagian kumpulan bagi aktiviti Minggu STEM / Aktiviti Maktab.',
              aktivitiUtama: [
                '1. Pelaksanaan aktiviti stesen eksplorasi kimia / demonstrasi sains menarik (cth: Elephant Toothpaste, Indikator pH Semula Jadi, Roket Soda).',
                '2. Murid bekerjasama menyelesaikan cabaran kuiz / inovasi dalam kumpulan.',
                '3. Sesi soal jawab saintifik dan penilaian hasil kerja kumpulan.',
              ],
              penutup: 'Penyampaian maklum balas, refleksi nilai murni kerjasama dan pembersihan kawasan aktiviti.',
              aktiviti5E: {
                engage: 'Demonstrasi kimia menarik sebagai pembuka tirai aktiviti.',
                explore: 'Murid menjalankan aktiviti hands-on / cabaran STEM dalam kumpulan.',
                explain: 'Kumpulan menerangkan konsep sains di sebalik projek/cabaran mereka.',
                elaborate: 'Perbincangan aplikasi konsep tersebut dalam teknologi harian.',
                evaluate: 'Refleksi aktiviti dan penilaian penglibatan murid.',
              },
            },
            bbmCadangan: ['Bahan Projek STEM / Kit Eksplorasi Kimia', 'Borang Penilaian Aktiviti'],
            kemahiranSaintifikCadangan: ['Memerhati', 'Berkomunikasi', 'Mengeksperimen'],
          },
        ],
      },
    ],
  };
}

function createSpecialBabDLP(tingkatan: Tingkatan): BabKimia {
  const prefix = tingkatan === 'Tingkatan 4' ? 'F4' : 'F5';
  const formLabel = tingkatan === 'Tingkatan 4' ? 'Form 4' : 'Form 5';
  return {
    id: `${prefix}_KHAS`,
    tingkatan,
    nomborBab: 0,
    tema: 'Special Academic & Co-Academic Programme (Non-Syllabus)',
    tajuk: 'Revision, Slot Gemilang, Slot Mumtaz & Exam/Activity Week',
    peneranganRingkas:
      `Dedicated for ${formLabel} focused revision, Slot Gemilang, Slot Mumtaz (MRSM/SBP), examination week, and school activity week.`,
    isProgramKhas: true,
    skList: [
      {
        kod: 'K1.0',
        tajuk: 'Focused Revision & Chemistry Clinic (Ulangkaji Berfokus)',
        spList: [
          {
            kod: 'K1.1',
            tajuk: 'Topical Revision & Focused Drilling on Chemistry Paper 1 and Paper 2.',
            objektifCadangan: [
              'By the end of the revision session, pupils are able to solve at least 10 Paper 1 objective questions and 2 Paper 2 structured questions accurately.',
              'Identify and rectify common errors in writing balanced chemical equations and numerical calculations.',
            ],
            kriteriaKejayaanCadangan: [
              'Pupils successfully answer at least 80% of the topical revision questions correctly.',
              'Pupils can state the required marking scheme keywords accurately.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Teacher recaps core concepts of the target topic using a quick concept map and a 3-minute diagnostic quiz.',
              aktivitiUtama: [
                '1. Pupils complete the Focused Revision question set individually within the allocated time.',
                '2. Think-Pair-Share: Pupils cross-check answers with peers and highlight essential marking keywords.',
                '3. Teacher facilitates a detailed walkthrough of high-difficulty questions and coaches pupils needing remediation.',
              ],
              penutup:
                'Pupils jot down 3 key takeaways and 1 area for further revision in their Chemistry notebook.',
              aktiviti5E: {
                engage:
                  'Teacher displays a tricky SPM misconception question to spark discussion.',
                explore:
                  'Pupils work through the targeted revision module in small collaborative groups.',
                explain:
                  'Group representatives present their working steps on the whiteboard while the teacher refines their answering technique.',
                elaborate:
                  'Pupils attempt SPM clone variation questions to deepen conceptual mastery.',
                evaluate:
                  'Self-assessment against the marking rubric and exit ticket.',
              },
            },
            bbmCadangan: ['Focused Chemistry Revision Module', 'SPM Trial Past Papers', 'Official Marking Scheme'],
            kemahiranSaintifikCadangan: ['Interpreting data', 'Communicating', 'Analysing'],
          },
          {
            kod: 'K1.2',
            tajuk: 'Post-Mortem Discussion & Correction of Examination / Diagnostic Test Papers.',
            objektifCadangan: [
              'By the end of the lesson, pupils are able to identify their mistakes and complete thorough corrections for all incorrect items.',
              'Master precise answering techniques based on command words (State, Explain, Compare, Calculate, Justify).',
            ],
            kriteriaKejayaanCadangan: [
              'Pupils complete all Paper 1 and Paper 2 corrections neatly with complete working and units.',
              'Pupils can identify at least 3 mandatory keywords for structured and essay questions.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Teacher presents the overall class performance analysis and shares positive encouragement.',
              aktivitiUtama: [
                '1. Teacher distributes marked answer scripts and discusses items with the highest error rates.',
                '2. Peer Coaching Clinic: High-achieving pupils guide group members in doing corrections.',
                '3. Pupils write full model answers for structured and essay questions.',
              ],
              penutup:
                'Teacher verifies pupils’ correction work and sets individual target grades for the upcoming assessment.',
              aktiviti5E: {
                engage: 'Teacher highlights the most challenging questions from the recent examination.',
                explore: 'Pupils review their own scripts and compare their responses against the marking scheme.',
                explain: 'Teacher explains common causes of mark loss (missing units, unbalanced equations, vague terms).',
                elaborate: 'Pupils answer 2 parallel reinforcement questions to consolidate understanding.',
                evaluate: 'Teacher verification of corrections and target setting.',
              },
            },
            bbmCadangan: ['Pupils Answer Scripts', 'Official Marking Scheme', 'Item Analysis Report'],
            kemahiranSaintifikCadangan: ['Interpreting data', 'Communicating'],
          },
          {
            kod: 'K1.3',
            tajuk: 'Practical Revision & Mastering Paper 3 (Science Practical Assessment) Techniques.',
            objektifCadangan: [
              'By the end of the lesson, pupils are able to record measuring apparatus readings to the correct decimal places and construct complete experimental data tables.',
              'State the hypothesis, variables (manipulated, responding, fixed) and operational definition accurately.',
            ],
            kriteriaKejayaanCadangan: [
              'Pupils successfully complete a Paper 3 practical worksheet scoring at least 12/15.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Teacher displays meniscus readings of a burette and thermometer to test pupils’ precision.',
              aktivitiUtama: [
                '1. Revision of Science Process Skills (SPS): Variables, Hypothesis, Operational Definition, and Graph Plotting.',
                '2. Hands-on review of compulsory KSSM Chemistry experiments.',
                '3. Peer review of Paper 3 responses using the practical assessment rubric.',
              ],
              penutup: 'Summary of top tips for scoring full marks in SPM Chemistry Paper 3.',
              aktiviti5E: {
                engage: 'Quick quiz on apparatus precision (burette 2 d.p., measuring cylinder 1 d.p., stopwatch).',
                explore: 'Pupils analyse experimental datasets and plot smooth best-fit graphs.',
                explain: 'Discussion on formulating accurate Operational Definitions (What is done + What is observed).',
                elaborate: 'Pupils design an unguided experiment procedure based on a problem statement.',
                evaluate: 'Formative Paper 3 assessment.',
              },
            },
            bbmCadangan: ['Chemistry Paper 3 Practical Module', 'Graph Paper', 'Sample Laboratory Apparatus'],
            kemahiranSaintifikCadangan: ['Controlling variables', 'Hypothesising', 'Defining operationally'],
          },
        ],
      },
      {
        kod: 'K2.0',
        tajuk: 'Slot Gemilang (SPM Chemistry Excellence & Reinforcement Programme)',
        spList: [
          {
            kod: 'K2.1',
            tajuk: 'Slot Gemilang: SPM Chemistry Answering Technique Workshop & Marking Keywords.',
            objektifCadangan: [
              'By the end of Slot Gemilang, pupils are able to apply structured answering techniques (Concept, Keywords, Calculation) to Paper 2 questions.',
              'Build confidence in answering Section B and Section C essay questions systematically.',
            ],
            kriteriaKejayaanCadangan: [
              'Pupils successfully draft full-mark responses for at least 2 structured questions and 1 essay question.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Teacher introduces the objectives of Slot Gemilang and compares a full-mark sample answer against a weak answer.',
              aktivitiUtama: [
                '1. Technique briefing on underlining command words and extracting key chemical data from question stems.',
                '2. Group Workshop: Pupils draft structured essay answers using comparison tables and bulleted scientific points.',
                '3. Gallery Walk presentation and live marking feedback by the teacher.',
              ],
              penutup:
                'Pupils complete the Gemilang Keyword Checklist for the topic covered.',
              aktiviti5E: {
                engage: 'Teacher showcases an exemplary full-mark script to inspire pupils.',
                explore: 'Pupils collaborate in groups to dissect question requirements and organize key points.',
                explain: 'Representatives present their answer frameworks and receive constructive teacher feedback.',
                elaborate: 'Timed individual practice on Section B/C questions.',
                evaluate: 'Self and peer evaluation using the SPM marking rubric.',
              },
            },
            bbmCadangan: ['Slot Gemilang Chemistry Module', 'Mini Whiteboards / Mahjong Paper', 'Coloured Markers'],
            kemahiranSaintifikCadangan: ['Communicating', 'Interpreting data'],
          },
          {
            kod: 'K2.2',
            tajuk: 'Slot Gemilang: Core Concept Reinforcement & Stoichiometry / Mole Calculation Clinic.',
            objektifCadangan: [
              'By the end of Slot Gemilang, pupils are able to master mole calculations, molarity, and balanced chemical equations without errors.',
              'Strengthen foundational mastery among moderate and target-pass/credit pupils.',
            ],
            kriteriaKejayaanCadangan: [
              'Pupils accurately solve at least 4 out of 5 step-by-step stoichiometry calculation problems.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Quick recap of the Mole Formula Triangle (Mass, Gas Volume, Number of Particles, MV/1000).',
              aktivitiUtama: [
                '1. Guided coaching on the 4-Step Stoichiometry Method (Balanced Equation -> Calculate Moles -> Mole Ratio -> Final Answer + Unit).',
                '2. Tiered drilling in small groups assisted by Young Tutors.',
                '3. Individual checking and immediate feedback by the teacher.',
              ],
              penutup: '2-question mastery verification exit quiz.',
              aktiviti5E: {
                engage: 'Matching card game of mole formulas and chemical units.',
                explore: 'Pupils solve guided problem sets using the 4-Step Stoichiometry template.',
                explain: 'Young Tutors explain the working steps to their peers.',
                elaborate: 'Pupils solve combined molarity and neutralisation calculation problems.',
                evaluate: 'Mole calculation exit ticket.',
              },
            },
            bbmCadangan: ['4-Step Stoichiometry Template', 'Slot Gemilang Module', 'Scientific Calculator'],
            kemahiranSaintifikCadangan: ['Measuring and using numbers', 'Communicating'],
          },
        ],
      },
      {
        kod: 'K3.0',
        tajuk: 'Slot Mumtaz (A+ Sprint & HOTS Enrichment Programme — MRSM/SBP)',
        spList: [
          {
            kod: 'K3.1',
            tajuk: 'Slot Mumtaz: A+ Sprint Clinic & Higher Order Thinking Skills (HOTS) Analysis.',
            objektifCadangan: [
              'By the end of Slot Mumtaz, pupils are able to analyse and solve at least 3 HOTS questions (Analysing, Evaluating, Creating) with precise scientific justification.',
              'Synthesise cross-topic Chemistry concepts to solve high-level SPM clone problems.',
            ],
            kriteriaKejayaanCadangan: [
              'Pupils produce complete HOTS responses encompassing Claim/Choice, Scientific Evidence, and Reasoning (CER).',
              'Pupils achieve at least 85% in the Slot Mumtaz challenge set.',
            ],
            cadanganAktiviti: {
              setInduksi:
                'Teacher presents a real-world industrial or environmental Chemistry dilemma requiring higher-order problem solving.',
              aktivitiUtama: [
                '1. Deep-dive analysis of cross-topic HOTS questions using the Claim-Evidence-Reasoning (CER) framework.',
                '2. Round Table discussion among pupils to construct full-mark analytical and evaluative answers.',
                '3. Hot Seat session: Group representatives defend their chemical justifications and material choices.',
              ],
              penutup:
                'Summary of A+ (Mumtaz) strategies and personal mastery reflection.',
              aktiviti5E: {
                engage: 'Case study of an industrial or green technology chemical challenge.',
                explore: 'Pupils collaboratively analyse complex data tables/graphs to identify scientific patterns.',
                explain: 'Presentation of solutions structured using Claim-Evidence-Reasoning (CER).',
                elaborate: 'Challenge to modify or invent an experimental setup to optimise reaction yield/rate.',
                evaluate: 'Slot Mumtaz A+ rubric evaluation.',
              },
            },
            bbmCadangan: ['Slot Mumtaz A+ Sprint Module', 'MRSM & SBP Trial HOTS Collection', 'Mini Whiteboards'],
            kemahiranSaintifikCadangan: ['Interpreting data', 'Inferring', 'Predicting', 'Communicating'],
          },
          {
            kod: 'K3.2',
            tajuk: 'Slot Mumtaz: Mumtaz Challenge Quiz & Experimental Design Essay Simulation.',
            objektifCadangan: [
              'By the end of Slot Mumtaz, pupils are able to draft a complete 10-mark Experimental Design essay within 15 minutes.',
              'Ensure zero-error precision in chemical terminology, half-equations, and ionic equations.',
            ],
            kriteriaKejayaanCadangan: [
              'Pupils write a complete experimental procedure including labelled diagram, data table, and safety precautions.',
            ],
            cadanganAktiviti: {
              setInduksi: '5-minute lightning challenge: Writing balanced chemical and ionic equations from memory.',
              aktivitiUtama: [
                '1. Timed pair simulation of answering Section C (Experimental Design Essay).',
                '2. Peer Audit: Groups exchange scripts and grade each other using the official SPM rubric.',
                '3. Debrief on technical pitfalls that prevent candidates from securing an A+.',
              ],
              penutup: 'Recognition of the top-performing groups in Slot Mumtaz.',
              aktiviti5E: {
                engage: 'Rapid-fire quiz on ionic equations and precipitate/solution colour changes.',
                explore: 'Pupils design a complete experimental plan based on a given problem statement.',
                explain: 'Cross-group script audit and presentation of improvements.',
                elaborate: 'Discussion of experimental question variations from MRSM and SBP trial papers.',
                evaluate: '10/10 Experimental Design mastery reflection.',
              },
            },
            bbmCadangan: ['MRSM & SBP Trial Papers', 'Chemistry A+ Precision Checklist'],
            kemahiranSaintifikCadangan: ['Experimenting', 'Controlling variables', 'Communicating'],
          },
        ],
      },
      {
        kod: 'K4.0',
        tajuk: 'Examination Week, Assessment & School/College Activity Week',
        spList: [
          {
            kod: 'K4.1',
            tajuk: 'Administration & Invigilation of School Examination / Summative Assessment.',
            objektifCadangan: [
              'Ensure pupils sit for the examination / summative assessment smoothly and with academic integrity in accordance with examination regulations.',
            ],
            kriteriaKejayaanCadangan: [
              '100% of present pupils complete the examination paper adhering to examination SOPs.',
              'All answer scripts are collected, verified, and recorded accurately.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Teacher takes attendance, ensures desks are arranged according to examination standards, and reads out examination instructions.',
              aktivitiUtama: [
                '1. Distribute examination question papers and instruct pupils to verify the number of printed pages.',
                '2. Invigilate the examination session vigilantly to maintain order and academic honesty.',
                '3. Collect answer scripts systematically when time is called.',
              ],
              penutup: 'Teacher verifies the total number of scripts collected before handing them over to the examination room.',
              aktiviti5E: {
                engage: 'Briefing on examination rules and candidate attendance check.',
                explore: 'Candidates answer the examination paper within the stipulated duration.',
                explain: 'Teacher monitors the session and records attendance.',
                elaborate: 'Time management by candidates during the assessment.',
                evaluate: 'Collection and verification of examination answer scripts.',
              },
            },
            bbmCadangan: ['Examination Question Papers', 'Answer Scripts / OMR Sheets', 'Examination Attendance Sheet'],
            kemahiranSaintifikCadangan: ['Observing', 'Communicating'],
          },
          {
            kod: 'K4.2',
            tajuk: 'School/College Activity Week: STEM Carnival, Chemistry Exploration & Innovation Project.',
            objektifCadangan: [
              'By the end of the activity session, pupils are able to apply Chemistry concepts enjoyably through out-of-classroom STEM activities / innovation projects.',
              'Foster a strong passion for STEM, teamwork, and scientific communication skills.',
            ],
            kriteriaKejayaanCadangan: [
              'Pupils participate actively and successfully complete the Chemistry STEM station challenges / demonstrations.',
            ],
            cadanganAktiviti: {
              setInduksi: 'Safety briefing and group allocation for the STEM / College Activity Week programme.',
              aktivitiUtama: [
                '1. Execution of Chemistry exploration stations / interactive demonstrations (e.g., Elephant Toothpaste, Natural pH Indicators, Reaction Rockets).',
                '2. Pupils collaborate in teams to solve STEM quizzes and innovation challenges.',
                '3. Scientific Q&A session and evaluation of team outputs.',
              ],
              penutup: 'Feedback session, reflection on teamwork values, and cleanup of the activity area.',
              aktiviti5E: {
                engage: 'Captivating Chemistry demonstration to kick off the session.',
                explore: 'Pupils carry out hands-on STEM challenges in teams.',
                explain: 'Teams explain the scientific principles behind their project/challenge.',
                elaborate: 'Discussion on real-world applications of the demonstrated chemical principles.',
                evaluate: 'Activity reflection and participation assessment.',
              },
            },
            bbmCadangan: ['STEM Project Materials / Chemistry Exploration Kit', 'Activity Assessment Rubric'],
            kemahiranSaintifikCadangan: ['Observing', 'Communicating', 'Experimenting'],
          },
        ],
      },
    ],
  };
}

export const SPECIAL_PROGRAMMES_BM: BabKimia[] = [
  createSpecialBabBM('Tingkatan 4'),
  createSpecialBabBM('Tingkatan 5'),
];

export const SPECIAL_PROGRAMMES_DLP: BabKimia[] = [
  createSpecialBabDLP('Tingkatan 4'),
  createSpecialBabDLP('Tingkatan 5'),
];

function createSpecialSainsBabBM(tingkatan: Tingkatan): BabKimia {
  const num = tingkatan.replace(/\D/g, '') || '4';
  const base = createSpecialBabBM('Tingkatan 4');
  return {
    ...base,
    id: `S_F${num}_KHAS`,
    tingkatan,
    skList: base.skList.map((sk) => ({
      ...sk,
      tajuk: sk.tajuk.replace(/Kimia/g, 'Sains'),
      spList: sk.spList.map((sp) => ({
        ...sp,
        tajuk: sp.tajuk.replace(/Kimia/g, 'Sains'),
        objektifCadangan: sp.objektifCadangan.map((o) =>
          o.replace(/kimia/gi, 'sains')
        ),
        bbmCadangan: sp.bbmCadangan.map((b) => b.replace(/Kimia/g, 'Sains')),
      })),
    })),
  };
}

function createSpecialSainsBabDLP(tingkatan: Tingkatan): BabKimia {
  const num = tingkatan.replace(/\D/g, '') || '4';
  const base = createSpecialBabDLP('Tingkatan 4');
  return {
    ...base,
    id: `S_F${num}_KHAS`,
    tingkatan,
    peneranganRingkas: `Dedicated for Form ${num} Science focused revision, Slot Gemilang, Slot Mumtaz (MRSM/SBP), examination week, and school activity week.`,
    skList: base.skList.map((sk) => ({
      ...sk,
      tajuk: sk.tajuk.replace(/Chemistry/g, 'Science'),
      spList: sk.spList.map((sp) => ({
        ...sp,
        tajuk: sp.tajuk.replace(/Chemistry/g, 'Science'),
        objektifCadangan: sp.objektifCadangan.map((o) =>
          o.replace(/Chemistry/gi, 'Science')
        ),
        bbmCadangan: sp.bbmCadangan.map((b) =>
          b.replace(/Chemistry/g, 'Science')
        ),
      })),
    })),
  };
}

export const SPECIAL_PROGRAMMES_SAINS_BM: BabKimia[] = [
  createSpecialSainsBabBM('Tingkatan 2'),
  createSpecialSainsBabBM('Tingkatan 3'),
  createSpecialSainsBabBM('Tingkatan 4'),
  createSpecialSainsBabBM('Tingkatan 5'),
];

export const SPECIAL_PROGRAMMES_SAINS_DLP: BabKimia[] = [
  createSpecialSainsBabDLP('Tingkatan 2'),
  createSpecialSainsBabDLP('Tingkatan 3'),
  createSpecialSainsBabDLP('Tingkatan 4'),
  createSpecialSainsBabDLP('Tingkatan 5'),
];

