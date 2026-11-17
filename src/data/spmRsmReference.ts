export interface SpmKbatQuestionItem {
  kertas: string; // cth: '4541/2 Bahagian A (Struktur KBAT)' | '4541/2 Bahagian C (Reka Bentuk Eksperimen)' | '4541/3 Ujian Amali' | '4541/1 Objektif Aras Tinggi'
  kodKonstruk: string; // cth: 'KK0302 Menganalisis Perkaitan' | 'KK0401 Menilai Berdasarkan Evidens' | 'KK0501 Mencipta' | 'SK0109 Mendefinisi Secara Operasi'
  aras: string;
  konteks: string;
  soalan: string;
  jawapan: string;
}

export interface AnalogiSetInduksiItem {
  tajukAnalogi: string;
  setInduksi: string;
  kaitanKonsep: string;
  soalanPencetus: string;
}

export interface Pak21ActivityItem {
  namaAktiviti: string;
  penerangan: string;
  alatBahan: string[];
  kelebihan: string;
}

export const PANDUAN_FORMAT_SPM_4541_PROMPT = `
PANDUAN RASMI FORMAT PENTAKSIRAN SPM KIMIA (KOD 4541) LEMBAGA PEPERIKSAAN KPM & KLON SPMRSM MARA:
1. Kertas 1 (4541/1 - Objektif Bertulis):
   - 40 soalan Aneka Pilihan & Aneka Gabungan (40 markah, 1 jam 15 minit).
   - Konstruk: Mengingat (PK01), Memahami (KK01), Mengaplikasi (KK02), Menganalisis (KK03).
   - Menggunakan stimulus rajah susunan radas, graf, jadual data, carta alir, atau dialog situasi harian.
2. Kertas 2 (4541/2 - Subjektif Bertulis, 100 markah, 2 jam 30 minit):
   - Bahagian A (60 markah, 8 soalan berstruktur): Soalan berperingkat (a)(i) Definisi/Konsep [1m], (a)(ii) Persamaan Kimia/Perwakilan Piawai [1-2m], (b) Pengiraan mol/kepekatan/haba [2-3m], (c) Banding & terangkan / Wajarkan pilihan berdasarkan jadual evidens [3m].
   - Bahagian B (20 markah, pilih 1 daripada 2 soalan esei respons terhad/terbuka): Carta alir tindak balas, perbandingan pemerhatian & penerangan zarah/ikatan/kejelagaan/redoks [3-6m].
   - Bahagian C (20 markah, 1 soalan wajib): Penyelesaian masalah situasi harian (5m - bandingkan kaedah, pilih kaedah terbaik & cadangkan penambahbaikan) serta Merancang Eksperimen (8m - Bahan, Prosedur bernombor dengan kuantiti/kepekatan spesifik, Penjadualan Data).
   - Kod Konstruk LP KPM:
     * KK0201 / KK0202: Mengaplikasi pengetahuan kimia & kemahiran berfikir kritis.
     * KK0301 / KK0302: Menganalisis unsur & perkaitan (contoh: perkaitan struktur dengan sifat fizik, kepekatan ion dengan nilai pH/kadar tindak balas).
     * KK0401: Menilai berdasarkan evidens dalaman (Mewajarkan pemilihan bahan/kaedah berdasarkan jadual sifat/kelebihan/kesan kesihatan/alam sekitar).
     * KK0501: Mencipta produk / kaedah / merancang eksperimen baharu menggunakan bahan makmal atau bahan di rumah.
3. Kertas 3 (4541/3 - Ujian Amali, 15 markah, 45 minit):
   - Kemahiran Proses Sains (SK01):
     * SK0112 Mengeksperimen: Merancang prosedur eksperimen lengkap dengan kuantiti spesifik (cth: sukat 20 cm³ larutan menggunakan silinder penyukat) [5 markah].
     * SK0106 Berkomunikasi: Membina jadual berlabel dengan unit bagi merekod pemerhatian/bacaan [4 markah].
     * SK0102 Mengelas: Mengelaskan larutan/bahan berdasarkan pemerhatian [2 markah].
     * SK0109 Mendefinisi Secara Operasi: Menyatakan tafsiran konsep berdasarkan PERKARA YANG DILAKUKAN (what is done) dan PERKARA YANG DIPERHATIKAN (what is observed) [2 markah].
     * SK0105 Meramal & SK0104 Membuat Inferens: Meramal pemerhatian bagi situasi baharu dan menerangkan sebab [2 markah].
`;

export function getTopicSpecificSpmRsmBank(
  tingkatan: string,
  bab: string,
  sp: string,
  isDlp: boolean,
  formatFilter: string = 'SEMUA'
): {
  soalan: SpmKbatQuestionItem[];
  analogiList: AnalogiSetInduksiItem[];
  aktiviti: Pak21ActivityItem[];
} {
  const bLower = (bab + ' ' + sp).toLowerCase();

  // Detect topic cluster from Bab/SP
  const isAtomPeriodic =
    bLower.includes('atom') ||
    bLower.includes('berkala') ||
    bLower.includes('periodic') ||
    bLower.includes('proton') ||
    bLower.includes('elektron') ||
    bLower.includes('2.') ||
    bLower.includes('4.');
  const isMoleFormula =
    bLower.includes('mol') ||
    bLower.includes('formula') ||
    bLower.includes('empirik') ||
    bLower.includes('persamaan') ||
    bLower.includes('3.');
  const isBonding =
    bLower.includes('ikatan') ||
    bLower.includes('bond') ||
    bLower.includes('ion') ||
    bLower.includes('kovalen') ||
    bLower.includes('5.');
  const isAcidSalt =
    bLower.includes('asid') ||
    bLower.includes('acid') ||
    bLower.includes('alkali') ||
    bLower.includes('garam') ||
    bLower.includes('salt') ||
    bLower.includes('ph') ||
    bLower.includes('titrat') ||
    bLower.includes('6.');
  const isRate =
    bLower.includes('kadar') ||
    bLower.includes('rate') ||
    bLower.includes('mankin') ||
    bLower.includes('catalyst') ||
    bLower.includes('7.');
  const isAlloyMaterial =
    bLower.includes('aloi') ||
    bLower.includes('alloy') ||
    bLower.includes('komposit') ||
    bLower.includes('composite') ||
    bLower.includes('kaca') ||
    bLower.includes('8.');
  const isRedox =
    bLower.includes('redoks') ||
    bLower.includes('redox') ||
    bLower.includes('elektrolisis') ||
    bLower.includes('sel') ||
    bLower.includes('karat') ||
    bLower.includes('9.') ||
    bLower.includes('1.1') ||
    bLower.includes('1.2') ||
    bLower.includes('1.3');
  const isCarbon =
    bLower.includes('karbon') ||
    bLower.includes('carbon') ||
    bLower.includes('alkana') ||
    bLower.includes('alkena') ||
    bLower.includes('alkohol') ||
    bLower.includes('ester') ||
    bLower.includes('homolog') ||
    bLower.includes('10.');
  const isThermo =
    bLower.includes('termokimia') ||
    bLower.includes('haba') ||
    bLower.includes('heat') ||
    bLower.includes('eksotermik') ||
    bLower.includes('11.');
  const isPolymer =
    bLower.includes('polimer') ||
    bLower.includes('polymer') ||
    bLower.includes('getah') ||
    bLower.includes('12.');
  const isConsumer =
    bLower.includes('konsumer') ||
    bLower.includes('sabun') ||
    bLower.includes('detergen') ||
    bLower.includes('ubat') ||
    bLower.includes('kosmetik') ||
    bLower.includes('13.');

  let soalanBM: SpmKbatQuestionItem[] = [];
  let soalanDLP: SpmKbatQuestionItem[] = [];
  let analogiBM: AnalogiSetInduksiItem[] = [];
  let analogiDLP: AnalogiSetInduksiItem[] = [];

  if (isAcidSalt) {
    soalanBM = [
      {
        kertas: '4541/2 Bahagian A (Klon SPMRSM 2026 S5 - Struktur KBAT)',
        kodKonstruk: 'KK0302 Menganalisis Perkaitan & KK0201 Mengaplikasi',
        aras: 'Menganalisis (Aras Tinggi)',
        konteks:
          'Satu eksperimen peneutralan dijalankan antara 20 cm³ larutan kalium hidroksida, KOH dengan asid hidroklorik, HCl 0.2 mol dm⁻³ menggunakan kaedah pentitratan konduktometri. Bacaan ammeter paling rendah dicapai apabila 10.0 cm³ asid hidroklorik ditambahkan. Eksperimen kemudian diulangi dengan menggantikan asid hidroklorik dengan asid sulfurik, H₂SO₄ 0.2 mol dm⁻³.',
        soalan:
          '(a) Tulis persamaan ion bagi mewakili tindak balas peneutralan yang berlaku. [1 markah]\n(b) Hitung kepekatan larutan kalium hidroksida, KOH yang digunakan. [3 markah]\n(c) Apabila asid sulfurik 0.2 mol dm⁻³ digunakan, takat akhir dicapai pada isi padu 5.0 cm³ sahaja berbanding 10.0 cm³ bagi asid hidroklorik. Terangkan mengapa terdapat perbezaan isi padu asid pada takat akhir. [2 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) P1: H⁺ + OH⁻ → H₂O [1m]\n(b) P1: Bilangan mol HCl = (0.2 × 10.0) / 1000 = 0.002 mol [1m]\n    P2: Daripada persamaan HCl + KOH → KCl + H₂O, nisbah mol = 1 : 1, maka mol KOH = 0.002 mol [1m]\n    P3: Kepekatan KOH = (0.002 × 1000) / 20.0 = 0.10 mol dm⁻³ [1m]\n(c) P1: Asid sulfurik ialah asid diprotik manakala asid hidroklorik ialah asid monoprotik [1m]\n    P2: 1 mol asid sulfurik mengion lengkap dalam air menghasilkan 2 mol ion hidrogen, H⁺ (kepekatan ion H⁺ adalah dua kali ganda), maka isi padu asid sulfurik yang diperlukan untuk meneutralkan bilangan mol ion OH⁻ yang sama adalah separuh [1m].',
      },
      {
        kertas: '4541/2 Bahagian B (Format LP KPM 4541 S9 - Esei Berstruktur)',
        kodKonstruk: 'KK0302 Menganalisis & KK0401 Menilai',
        aras: 'Menganalisis & Menilai (KBAT)',
        konteks:
          'Gas hidrogen klorida, HCl dialirkan ke dalam Bikar P yang mengandungi propanon dan Bikar Q yang mengandungi air suling. Ketulan kalsium karbonat kemudian dimasukkan ke dalam kedua-dua bikar.',
        soalan:
          '(a) Bandingkan pemerhatian dalam Bikar P dan Bikar Q apabila ketulan kalsium karbonat dimasukkan. Terangkan jawapan anda. [5 markah]\n(b) Encik Rahim mendapati nilai pH tanah di kebunnya ialah 2.5 menyebabkan tanaman kurang subur. Wajarkan penggunaan kalsium oksida berbanding natrium hidroksida untuk merawat tanah tersebut. [3 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) P1: Bikar P: Tiada perubahan / tiada gelembung gas terbebas. Bikar Q: Gelembung gas tidak berwarna terbebas. [1m]\n    P2: Dalam Bikar P (propanon), HCl wujud sebagai molekul kovalen neutral sahaja / tidak mengion. [1m]\n    P3: Tiada kehadiran ion hidrogen, H⁺ dalam Bikar P, maka sifat asid tidak ditunjukkan. [1m]\n    P4: Dalam Bikar Q (air), molekul HCl mengion lengkap menghasilkan ion hidrogen, H⁺. [1m]\n    P5: Kehadiran ion H⁺ bertindak balas dengan kalsium karbonat menghasilkan gas karbon dioksida, CO₂. [1m]\n(b) P1: Kalsium oksida bersifat bes lemah/kurang larut dan meneutralkan keasidan tanah secara beransur-ansur tanpa menjadikan tanah terlalu beralkali. [1m]\n    P2: Natrium hidroksida ialah alkali kuat yang sangat mengakis dan merosakkan akar tumbuhan. [1m]\n    P3: Kalsium oksida lebih murah, mudah dikendalikan dan membekalkan unsur kalsium kepada tanah. [1m]',
      },
      {
        kertas: '4541/3 Ujian Amali (Format LP KPM 4541/3 - Kemahiran Proses Sains)',
        kodKonstruk: 'SK0109 Mendefinisi Secara Operasi & SK0112 Mengeksperimen',
        aras: 'Kemahiran Proses Sains (Amali)',
        konteks:
          'Penyediaan garam tak terlarutkan plumbum(II) karbonat melalui tindak balas pemendakan antara larutan plumbum(II) nitrat 0.5 mol dm⁻³ dan larutan natrium karbonat 0.5 mol dm⁻³.',
        soalan:
          '(a) Nyatakan definisi secara operasi bagi pemendakan garam tak terlarutkan dalam eksperimen ini. [2 markah]\n(b) Ramalkan pemerhatian sekiranya larutan plumbum(II) nitrat digantikan dengan larutan kuprum(II) nitrat. Terangkan jawapan anda. [2 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) P1 (Perkara yang dilakukan): Apabila larutan natrium karbonat ditambahkan kepada larutan plumbum(II) nitrat, [1m]\n    P2 (Perkara yang diperhatikan): mendakan putih terbentuk. [1m]\n(b) P1: Mendakan hijau terbentuk. [1m]\n    P2: Kerana ion kuprum(II), Cu²⁺ bergabung dengan ion karbonat, CO₃²⁻ menghasilkan garam tak terlarutkan kuprum(II) karbonat, CuCO₃ yang berwarna hijau. [1m]',
      },
    ];
    soalanDLP = [
      {
        kertas: '4541/2 Section A (SPMRSM 2026 Clone Q5 - Structured HOTS)',
        kodKonstruk: 'KK0302 Analysing Relationships & KK0201 Applying',
        aras: 'Analysing (High Level)',
        konteks:
          'A neutralisation experiment is carried out between 20 cm³ of potassium hydroxide solution, KOH and 0.2 mol dm⁻³ hydrochloric acid, HCl using the conductometric titration method. The lowest ammeter reading is reached at 10.0 cm³ of HCl. The experiment is repeated by replacing hydrochloric acid with 0.2 mol dm⁻³ sulphuric acid, H₂SO₄.',
        soalan:
          '(a) Write the ionic equation to represent the neutralisation reaction that occurred. [1 mark]\n(b) Calculate the concentration of potassium hydroxide solution, KOH used. [3 marks]\n(c) When 0.2 mol dm⁻³ sulphuric acid is used, the end point is reached at 5.0 cm³ instead of 10.0 cm³. Explain why there is a difference in the volume of acid at the end point. [2 marks]',
        jawapan:
          'Analytical Marking Scheme (LP KPM):\n(a) P1: H⁺ + OH⁻ → H₂O [1m]\n(b) P1: Number of moles of HCl = (0.2 × 10.0) / 1000 = 0.002 mol [1m]\n    P2: From HCl + KOH → KCl + H₂O, mole ratio is 1:1, hence moles of KOH = 0.002 mol [1m]\n    P3: Concentration of KOH = (0.002 × 1000) / 20.0 = 0.10 mol dm⁻³ [1m]\n(c) P1: Sulphuric acid is a diprotic acid whereas hydrochloric acid is a monoprotic acid. [1m]\n    P2: 1 mole of sulphuric acid ionises completely in water to produce 2 moles of H⁺ ions (double the concentration of H⁺ ions), so half the volume is needed to neutralise the same number of moles of OH⁻ ions. [1m]',
      },
      {
        kertas: '4541/2 Section B (LP KPM Format Q9 - Structured Essay)',
        kodKonstruk: 'KK0302 Analysing & KK0401 Evaluating',
        aras: 'Analysing & Evaluating (HOTS)',
        konteks:
          'Hydrogen chloride gas, HCl is flowed into Beaker P containing propanone and Beaker Q containing distilled water. Calcium carbonate chips are then added into both beakers.',
        soalan:
          '(a) Compare the observations in Beaker P and Beaker Q when calcium carbonate chips are added. Explain your answer. [5 marks]\n(b) Mr. Rahim found that the pH value of soil in his farm is 2.5. Justify the use of calcium oxide instead of sodium hydroxide to treat the acidic soil. [3 marks]',
        jawapan:
          'Analytical Marking Scheme (LP KPM):\n(a) P1: Beaker P: No change / no gas bubbles released. Beaker Q: Colourless gas bubbles are released. [1m]\n    P2: In Beaker P (propanone), HCl exists only as neutral covalent molecules / does not ionise. [1m]\n    P3: There are no hydrogen ions, H⁺ present in Beaker P, so acidic properties are not shown. [1m]\n    P4: In Beaker Q (water), HCl molecules ionise completely to produce hydrogen ions, H⁺. [1m]\n    P5: H⁺ ions react with calcium carbonate to produce carbon dioxide gas. [1m]\n(b) P1: Calcium oxide is a mildly soluble base that neutralises soil acidity gradually without making the soil overly alkaline. [1m]\n    P2: Sodium hydroxide is a strong, corrosive alkali that damages plant roots. [1m]',
      },
      {
        kertas: '4541/3 Practical Test (LP KPM 4541/3 - Science Process Skills)',
        kodKonstruk: 'SK0109 Defining Operationally & SK0105 Predicting',
        aras: 'Science Process Skills (Practical)',
        konteks:
          'Preparation of insoluble lead(II) carbonate salt through precipitation reaction between 0.5 mol dm⁻³ lead(II) nitrate solution and 0.5 mol dm⁻³ sodium carbonate solution.',
        soalan:
          '(a) State the operational definition for the precipitation of insoluble salt in this experiment. [2 marks]\n(b) Predict the observation if lead(II) nitrate solution is replaced with copper(II) nitrate solution. Explain your answer. [2 marks]',
        jawapan:
          'Analytical Marking Scheme:\n(a) P1 (What is done): When sodium carbonate solution is added into lead(II) nitrate solution, [1m]\n    P2 (What is observed): a white precipitate is formed. [1m]\n(b) P1: A green precipitate is formed. [1m]\n    P2: Copper(II) ions, Cu²⁺ combine with carbonate ions, CO₃²⁻ to form insoluble copper(II) carbonate, CuCO₃ which is green. [1m]',
      },
    ];
  } else if (isRate) {
    soalanBM = [
      {
        kertas: '4541/2 Bahagian C (Klon SPMRSM 2026 S11 - Esei & Eksperimen Wajib)',
        kodKonstruk: 'KK0302 Menganalisis, KK0401 Menilai & KK0501 Mencipta',
        aras: 'Menganalisis, Menilai & Mencipta (KBAT)',
        konteks:
          'Set I menggunakan ketulan zink berlebihan + 50 cm³ asid hidroklorik 0.1 mol dm⁻³. Set II menggunakan serbuk zink berlebihan + 50 cm³ asid hidroklorik 0.1 mol dm⁻³. Dalam situasi harian pula, Puan Fauziah menyimpan pisang masak di dalam bekas bertutup rapat (Kaedah I) dan bekas terbuka (Kaedah II). Buah pisang yang masak membebaskan gas hormon etena.',
        soalan:
          '(a) Berdasarkan Set I dan Set II, nyatakan set eksperimen yang mengambil masa lebih singkat untuk mengumpulkan jumlah isi padu gas hidrogen yang sama. Terangkan jawapan anda berdasarkan Teori Perlanggaran. [4 markah]\n(b) Puan Fauziah ingin melambatkan proses pematangan pisang. Bandingkan Kaedah I dan Kaedah II, pilih kaedah terbaik dan cadangkan satu penambahbaikan. [5 markah]\n(c) Huraikan satu eksperimen untuk mengkaji kesan kepekatan terhadap kadar tindak balas menggunakan bahan yang terdapat di rumah (sertakan Bahan, Prosedur, dan Penjadualan Data). [8 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) P1: Set II mengambil masa lebih singkat. [1m]\n    P2: Saiz serbuk zink dalam Set II lebih kecil berbanding ketulan zink dalam Set I, maka jumlah luas permukaan zink yang terdedah kepada perlanggaran adalah lebih besar. [1m]\n    P3: Frekuensi perlanggaran antara atom zink dan ion hidrogen, H⁺ adalah lebih tinggi. [1m]\n    P4: Frekuensi perlanggaran berkesan meningkat, maka kadar tindak balas lebih tinggi. [1m]\n(b) P1: Dalam Kaedah I (bekas tertutup), gas etena terperangkap menyebabkan kepekatan gas etena tinggi. [1m]\n    P2: Dalam Kaedah II (bekas terbuka), gas etena meresap ke udara menyebabkan kepekatan etena rendah. [1m]\n    P3: Pisang dalam Kaedah I masak lebih cepat berbanding Kaedah II. [1m]\n    P4: Pilihan terbaik ialah Kaedah II. [1m]\n    P5: Penambahbaikan: Balut tangkai pisang dengan plastik pembalut / simpan di tempat sejuk untuk mengurangkan pembebasan etena. [1m]\n(c) Bahan: Cuka makan (asid etanoik), air paip, kulit telur yang dihancurkan / serbuk penaik. [1m]\n    Prosedur: 1. Sukat 50 cm³ cuka makan 100% ke dalam Bikar A dan campuran 25 cm³ cuka + 25 cm³ air ke dalam Bikar B. 2. Masukkan 5 g kulit telur hancur ke dalam Bikar A dan mulakan jam randik. 3. Rekod masa yang diambil sehingga tiada lagi gelembung gas terbebas. 4. Ulang langkah bagi Bikar B. [5m]\n    Jadual Data: Lajur Kepekatan Cuka dan Masa Diambil (s). [2m]',
      },
      {
        kertas: '4541/3 Ujian Amali (Format LP KPM 4541/3 Lampiran 3)',
        kodKonstruk: 'SK0110 Mengawal Pemboleh Ubah, SK0111 Hipotesis & SK0109 Definisi Operasi',
        aras: 'Kemahiran Proses Sains (Amali)',
        konteks:
          'Eksperimen menentukan kesan kepekatan asid hidroklorik (Set I: 1.8 mol dm⁻³, Set II: 1.4 mol dm⁻³, Set III: 1.0 mol dm⁻³) terhadap masa yang diambil untuk 3 cm pita magnesium melarut lengkap.',
        soalan:
          '(a) Nyatakan pemboleh ubah dimanipulasikan, bergerak balas dan dimalarkan. [3 markah]\n(b) Nyatakan satu hipotesis bagi eksperimen ini. [2 markah]\n(c) Nyatakan definisi secara operasi bagi kadar tindak balas dalam eksperimen ini. [2 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) PM: Kepekatan asid hidroklorik [1m]; PB: Masa yang diambil untuk pita magnesium melarut lengkap / Kadar tindak balas [1m]; PD: Panjang pita magnesium / Isi padu dan suhu asid hidroklorik [1m]\n(b) Semakin tinggi kepekatan asid hidroklorik, semakin singkat masa yang diambil untuk pita magnesium melarut lengkap (semakin tinggi kadar tindak balas). [2m]\n(c) Kadar tindak balas ialah masa yang diambil oleh jam randik (perkara diperhatikan) apabila 3 cm pita magnesium dimasukkan sehingga melarut lengkap di dalam asid hidroklorik (perkara dilakukan). [2m]',
      },
    ];
    soalanDLP = [
      {
        kertas: '4541/2 Section C (SPMRSM 2026 Clone Q11 - Essay & Experiment Design)',
        kodKonstruk: 'KK0302 Analysing, KK0401 Evaluating & KK0501 Creating',
        aras: 'Analysing, Evaluating & Creating (HOTS)',
        konteks:
          'Set I uses excess zinc granules + 50 cm³ of 0.1 mol dm⁻³ HCl. Set II uses excess zinc powder + 50 cm³ of 0.1 mol dm⁻³ HCl. Meanwhile, Puan Fauziah stores ripening bananas in a closed container (Method I) and an open container (Method II). Ripening fruits release ethene gas.',
        soalan:
          '(a) State which set takes a shorter time to collect the same total volume of hydrogen gas. Explain your answer using Collision Theory. [4 marks]\n(b) Puan Fauziah wants to slow down the ripening process. Compare Method I and Method II, choose the best method and suggest one improvement. [5 marks]\n(c) Describe an experiment to study the effect of concentration on the rate of reaction using household materials (include Materials, Procedure, and Tabulation of data). [8 marks]',
        jawapan:
          'Analytical Marking Scheme (LP KPM):\n(a) P1: Set II takes a shorter time. [1m]\n    P2: Zinc powder in Set II has a smaller size and larger total surface area exposed to collision compared to zinc granules in Set I. [1m]\n    P3: Frequency of collision between zinc atoms and H⁺ ions is higher. [1m]\n    P4: Frequency of effective collision increases, resulting in a higher rate of reaction. [1m]\n(b) P1: In Method I, ethene gas is trapped, resulting in a higher concentration of ethene. [1m]\n    P2: In Method II, ethene gas diffuses out, keeping ethene concentration low. [1m]\n    P3: Bananas in Method I ripen faster than in Method II. [1m]\n    P4: Best choice is Method II. [1m]\n    P5: Improvement: Wrap the banana crown/stem with plastic wrap to reduce ethene release. [1m]\n(c) Materials: Vinegar (ethanoic acid), water, crushed eggshells / baking soda, stopwatch. Procedure & Table included. [8m]',
      },
    ];
  } else if (isRedox) {
    soalanBM = [
      {
        kertas: '4541/2 Bahagian B (Klon SPMRSM 2026 S10 - Tindak Balas Redoks)',
        kodKonstruk: 'KK0302 Menganalisis Perkaitan & KK0201 Mengaplikasi',
        aras: 'Menganalisis (Aras Tinggi)',
        konteks:
          'Tiub-U mengandungi asid sulfurik cair sebagai titian garam. Dalam Set I, lengan kiri mengandungi larutan kalium bromida, KBr dan lengan kanan mengandungi larutan ferum(III) sulfat, Fe₂(SO₄)₃. Dalam Set II, larutan ferum(III) sulfat digantikan dengan larutan iodin, I₂. Diberi nilai E⁰: I₂/2I⁻ = +0.54 V, Fe³⁺/Fe²⁺ = +0.77 V, Br₂/2Br⁻ = +1.07 V.',
        soalan:
          '(a) Huraikan secara ringkas ujian pengesahan bagi hasil yang terbentuk pada larutan ferum(III) sulfat dalam Set I. [2 markah]\n(b) Berdasarkan nilai keupayaan elektrod piawai E⁰, terangkan mengapa larutan kalium bromida tidak menunjukkan sebarang perubahan dalam Set II. [3 markah]\n(c) Banding dan bezakan proses pengekstrakan logam daripada bijihnya menggunakan relau bagas (pengurangan oleh arang kok) dengan elektrolisis leburan bijih. [6 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) P1: Masukkan 2 cm³ larutan ke dalam tabung uji dan titiskan larutan natrium hidroksida, NaOH sehingga berlebihan. [1m]\n    P2: Mendakan hijau kotor terbentuk (mengesahkan kehadiran ion Fe²⁺). [1m]\n(b) P1: Nilai E⁰ bagi Br₂/2Br⁻ (+1.07 V) adalah lebih positif daripada nilai E⁰ bagi I₂/2I⁻ (+0.54 V). [1m]\n    P2: Ion bromida, Br⁻ sukar melepaskan elektron / tidak dioksidakan oleh molekul iodin, I₂. [1m]\n    P3: Iodin ialah agen pengoksidaan yang lebih lemah berbanding bromin, maka tiada tindak balas redoks berlaku. [1m]\n(c) Persamaan: Kedua-duanya melibatkan tindak balas penurunan oksida logam kepada logam tulen. [1m]\n    Perbezaan: Kaedah I menggunakan arang kok (karbon) sebagai agen penurunan bagi logam kurang reaktif daripada karbon (cth: Fe, Sn), manakala Kaedah II menggunakan arus elektrik (elektrolisis leburan) bagi logam lebih reaktif daripada karbon (cth: Al, Na). [5m]',
      },
      {
        kertas: '4541/1 Objektif Aras Tinggi (Klon SPMRSM 2026 S38 - Pengaratan)',
        kodKonstruk: 'KK0301 Menganalisis & KK0401 Menilai',
        aras: 'Menganalisis & Menilai',
        konteks:
          'Paku besi dililit dengan tiga logam berbeza T, U dan V dan dimasukkan ke dalam agar-agar panas + kalium heksasianoferat(III). Pemerhatian: Lilitan T (Banyak tompok biru tua), Lilitan U (Tiada perubahan), Lilitan V (Sedikit tompok biru tua).',
        soalan:
          '(a) Susun logam T, U, V dan ferum (Fe) mengikut tertib kelektropositifan menaik. Terangkan peranan logam U dalam menghalang pengaratan paku besi. [4 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\nP1: Tertib kelektropositifan menaik: T, V, Fe, U. [1m]\nP2: Logam U lebih elektropositif (lebih reaktif) daripada ferum, Fe. [1m]\nP3: Atom logam U cenderung melepaskan elektron membentuk ion U dan mengalami pengoksidaan (kakisan terkawal / perlindungan katodik). [1m]\nP4: Elektron mengalir ke paku besi (Fe) dan menghalang atom Fe daripada mengoksida kepada ion Fe²⁺, maka tiada tompok biru tua terbentuk. [1m]',
      },
    ];
    soalanDLP = [
      {
        kertas: '4541/2 Section B (SPMRSM 2026 Clone Q10 - Redox Reactions)',
        kodKonstruk: 'KK0302 Analysing & KK0201 Applying',
        aras: 'Analysing (High Level)',
        konteks:
          'A U-tube contains dilute sulphuric acid. In Set I, the left arm contains potassium bromide, KBr solution and the right arm contains iron(III) sulphate, Fe₂(SO₄)₃ solution. In Set II, iron(III) sulphate is replaced with iodine, I₂ solution. Given E⁰ values: I₂/2I⁻ = +0.54 V, Fe³⁺/Fe²⁺ = +0.77 V, Br₂/2Br⁻ = +1.07 V.',
        soalan:
          '(a) Describe briefly a confirmatory test for the product formed in the iron(III) sulphate solution in Set I. [2 marks]\n(b) Based on standard electrode potential E⁰ values, explain why potassium bromide solution remains unchanged in Set II. [3 marks]\n(c) Compare and contrast metal extraction using a blast furnace (coke reduction) versus electrolysis of molten ore. [6 marks]',
        jawapan:
          'Analytical Marking Scheme (LP KPM):\n(a) P1: Add sodium hydroxide, NaOH solution into 2 cm³ of the solution until in excess. [1m]\n    P2: Dirty green precipitate is formed (confirms Fe²⁺ ions). [1m]\n(b) P1: E⁰ value of Br₂/2Br⁻ (+1.07 V) is more positive than E⁰ of I₂/2I⁻ (+0.54 V). [1m]\n    P2: Bromide ions, Br⁻ do not release electrons to iodine molecules. [1m]\n    P3: Iodine is a weaker oxidising agent than bromine, so no redox reaction occurs. [1m]\n(c) Similarity: Both reduce metal oxides into pure metals. Differences: Method I uses carbon/coke for metals less reactive than carbon (Fe), whereas Method II uses electrolysis for metals more reactive than carbon (Al). [6m]',
      },
    ];
  } else if (isCarbon) {
    soalanBM = [
      {
        kertas: '4541/2 Bahagian B (Klon SPMRSM 2026 S9 - Sebatian Karbon)',
        kodKonstruk: 'KK0302 Menganalisis Perkaitan & KK0201 Mengaplikasi',
        aras: 'Menganalisis (Aras Tinggi)',
        konteks:
          'Sebatian E ialah propena (C₃H₆) dan Sebatian F ialah propana (C₃H₈). Kedua-dua sebatian dibakar lengkap di dalam oksigen berlebihan.',
        soalan:
          '(a) Air bromin digunakan untuk membezakan Sebatian E dan Sebatian F. Nyatakan pemerhatian dan tulis persamaan kimia bagi tindak balas yang berlaku. [3 markah]\n(b) Bandingkan kejelagaan nyalaan apabila Sebatian E dan Sebatian F terbakar. Terangkan jawapan anda berdasarkan peratus jisim karbon per molekul. [Jisim atom relatif: H = 1, C = 12] [4 markah]\n(c) Bandingkan kekonduksian elektrik antara etanol tulen (C₂H₅OH) dan asid etanoik akueus 1.0 mol dm⁻³ (CH₃COOH). Terangkan jawapan anda. [3 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) P1: Sebatian E (propena) melunturkan warna perang air bromin kepada tidak berwarna, manakala Sebatian F (propana) tidak mengubah warna perang air bromin. [2m]\n    P2: C₃H₆ + Br₂ → C₃H₆Br₂ [1m]\n(b) P1: % C dalam C₃H₆ = [3(12) / 42] × 100% = 85.71% [1m]\n    P2: % C dalam C₃H₈ = [3(12) / 44] × 100% = 81.82% [1m]\n    P3: Peratus jisim karbon per molekul dalam propena (Sebatian E) lebih tinggi berbanding propana (Sebatian F). [1m]\n    P4: Maka Sebatian E terbakar dengan nyalaan lebih berjelaga berbanding Sebatian F. [1m]\n(c) P1: Asid etanoik akueus boleh mengkonduksikan elektrik manakala etanol tulen tidak boleh mengkonduksikan elektrik. [1m]\n    P2: Asid etanoik mengion separa di dalam air menghasilkan ion-ion yang bebas bergerak (CH₃COO⁻ dan H⁺). [1m]\n    P3: Etanol tulen terdiri daripada molekul kovalen neutral sahaja dan tiada ion bebas bergerak. [1m]',
      },
      {
        kertas: '4541/2 Bahagian C (Format LP KPM 4541 S11 - Pengesteran & Lemak)',
        kodKonstruk: 'KK0401 Menilai Berdasarkan Evidens & KK0501 Mencipta',
        aras: 'Menilai & Mencipta (KBAT)',
        konteks:
          'Perisa nanas (etil butanoat, C₃H₇COOC₂H₅) dihasilkan melalui tindak balas pengesteran antara etanol dan asid butanoik. Manakala dalam masakan, Minyak A mengandungi 89% lemak tepu dan Minyak B mengandungi 51% lemak tak tepu.',
        soalan:
          '(a) Huraikan secara ringkas bagaimana anda menyediakan perisa nanas tersebut di dalam makmal berserta persamaan kimia. [5 markah]\n(b) Puan Aminah memilih Minyak B untuk menggoreng ayam secara goreng jeluk pada suhu tinggi. Adakah pemilihan Puan Aminah wajar? Berikan alasan berdasarkan kesan ke atas kesihatan. [4 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) P1: Campurkan 2 cm³ etanol dan 2 cm³ asid butanoik ke dalam tabung didih. [1m]\n    P2: Titiskan beberapa titik asid sulfurik pekat sebagai mangkin. [1m]\n    P3: Panaskan campuran dengan perlahan selama 2 minit dan tuangkan hasil ke dalam bikar berisi air sejuk. [1m]\n    P4: Cecair berbau manis buah-buahan (nanas) terapung di permukaan air. [1m]\n    P5: C₃H₇COOH + C₂H₅OH → C₃H₇COOC₂H₅ + H₂O [1m]\n(b) P1: Tidak wajar / Pilihan kurang tepat untuk goreng jeluk suhu tinggi. [1m]\n    P2: Minyak B mempunyai peratus lemak tak tepu yang tinggi (mengandungi ikatan ganda dua C=C). [1m]\n    P3: Lemak tak tepu mudah dioksidakan pada suhu tinggi semasa goreng jeluk. [1m]\n    P4: Pengoksidaan ini menghasilkan radikal bebas dan bahan berkarsinogen yang membahayakan kesihatan. [1m]',
      },
    ];
    soalanDLP = [
      {
        kertas: '4541/2 Section B (SPMRSM 2026 Clone Q9 - Carbon Compounds)',
        kodKonstruk: 'KK0302 Analysing & KK0201 Applying',
        aras: 'Analysing (High Level)',
        konteks:
          'Compound E is propene (C₃H₆) and Compound F is propane (C₃H₈). Both compounds burn completely in excess oxygen.',
        soalan:
          '(a) Bromine water is used to differentiate Compound E and Compound F. State the observations and write the chemical equation. [3 marks]\n(b) Compare the sootiness of the flame when Compound E and Compound F burn. Explain based on percentage of carbon by mass per molecule. [RAM: H=1, C=12] [4 marks]\n(c) Compare the electrical conductivity of pure ethanol (C₂H₅OH) and 1.0 mol dm⁻³ ethanoic acid (CH₃COOH). Explain your answer. [3 marks]',
        jawapan:
          'Analytical Marking Scheme (LP KPM):\n(a) P1: Compound E decolourises brown bromine water, whereas Compound F does not change the brown colour of bromine water. [2m]\n    P2: C₃H₆ + Br₂ → C₃H₆Br₂ [1m]\n(b) P1: % C in C₃H₆ = 85.71% [1m]; P2: % C in C₃H₈ = 81.82% [1m]\n    P3: Percentage of carbon by mass per molecule in propene is higher than in propane. [1m]\n    P4: Therefore, Compound E burns with a sootier flame than Compound F. [1m]\n(c) P1: Aqueous ethanoic acid conducts electricity whereas pure ethanol does not. [1m]\n    P2: Ethanoic acid ionises partially in water to produce freely moving ions (CH₃COO⁻ and H⁺), while pure ethanol consists only of neutral covalent molecules. [2m]',
      },
    ];
  } else if (isThermo) {
    soalanBM = [
      {
        kertas: '4541/2 Bahagian A (Klon SPMRSM 2026 S8 - Termokimia)',
        kodKonstruk: 'KK0302 Menganalisis & KK0401 Menilai Nilai Bahan Api',
        aras: 'Menganalisis & Menilai (KBAT)',
        konteks:
          'Pembakaran lengkap 1.0 g butanol (C₄H₉OH) membebaskan haba untuk memanaskan 250 cm³ air. Diberi ΔH pembakaran butanol = -2670 kJ mol⁻¹. Jadual juga menunjukkan haba pembakaran etanol (-1367 kJ mol⁻¹) dan gas hidrogen (-286 kJ mol⁻¹).',
        soalan:
          '(a) Hitungkan perubahan suhu air apabila 1.0 g butanol terbakar lengkap. [JAR: H=1, C=12, O=16; c = 4.2 J g⁻¹ °C⁻¹] [3 markah]\n(b) Eksperimen diulang menggunakan propanol. Bandingkan haba pembakaran antara propanol dan butanol serta terangkan sebabnya. [3 markah]\n(c) Buktikan pernyataan: "Pembakaran 1 gram gas hidrogen membebaskan haba lebih tinggi berbanding 1 gram etanol" menggunakan rumus Nilai Bahan Api. [2 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) P1: Bilangan mol butanol = 1.0 / 74 = 0.0135 mol [1m]\n    P2: Haba dibebaskan, Q = 0.0135 × 2670000 = 36081 J [1m]\n    P3: Perubahan suhu, θ = 36081 / (250 × 4.2) = 34.36 °C [1m]\n(b) P1: Haba pembakaran butanol lebih tinggi daripada propanol. [1m]\n    P2: Bilangan atom karbon dan hidrogen per molekul butanol (C₄H₉OH) lebih banyak daripada propanol (C₃H₇OH). [1m]\n    P3: Lebih banyak molekul karbon dioksida dan air terbentuk, maka lebih banyak tenaga haba dibebaskan semasa pembentukan ikatan. [1m]\n(c) P1: Nilai bahan api etanol = 1367 / 46 = 29.7 kJ g⁻¹; Nilai bahan api hidrogen = 286 / 2 = 143.0 kJ g⁻¹. [1m]\n    P2: Nilai bahan api gas hidrogen (143 kJ g⁻¹) jauh lebih tinggi daripada etanol (29.7 kJ g⁻¹). [1m]',
      },
    ];
    soalanDLP = [
      {
        kertas: '4541/2 Section A (SPMRSM 2026 Clone Q8 - Thermochemistry)',
        kodKonstruk: 'KK0302 Analysing & KK0401 Evaluating Fuel Value',
        aras: 'Analysing & Evaluating (HOTS)',
        konteks:
          'Complete combustion of 1.0 g of butanol (C₄H₉OH) heats 250 cm³ of water. Given ΔH of combustion of butanol = -2670 kJ mol⁻¹. Heat of combustion of ethanol = -1367 kJ mol⁻¹ and hydrogen gas = -286 kJ mol⁻¹.',
        soalan:
          '(a) Calculate the temperature change of water when 1.0 g of butanol burns completely. [RAM: H=1, C=12, O=16; c = 4.2 J g⁻¹ °C⁻¹] [3 marks]\n(b) Compare the heat of combustion of propanol and butanol and explain your answer. [3 marks]\n(c) Prove that 1 g of hydrogen gas releases more heat than 1 g of ethanol by calculating their fuel values. [2 marks]',
        jawapan:
          'Analytical Marking Scheme (LP KPM):\n(a) P1: Moles of butanol = 1.0 / 74 = 0.0135 mol [1m]; P2: Q = 0.0135 × 2670000 = 36081 J [1m]; P3: ΔT = 36081 / (250 × 4.2) = 34.36 °C [1m]\n(b) P1: Heat of combustion of butanol is higher than propanol. [1m] P2: Butanol has more carbon and hydrogen atoms per molecule, forming more CO₂ and H₂O molecules and releasing more heat energy. [2m]\n(c) P1: Fuel value of ethanol = 1367 / 46 = 29.7 kJ g⁻¹; Fuel value of H₂ = 286 / 2 = 143 kJ g⁻¹. [2m]',
      },
    ];
  } else if (isPolymer || isConsumer || isAlloyMaterial) {
    soalanBM = [
      {
        kertas: '4541/3 Ujian Amali (Klon SPMRSM 2026 Kertas 3 - Sabun & Air Liat)',
        kodKonstruk: 'SK0112 Mengeksperimen, SK0106 Berkomunikasi & SK0109 Definisi Operasi',
        aras: 'Kemahiran Proses Sains (Amali Kertas 3)',
        konteks:
          'Anda dibekalkan dengan Larutan L1, Larutan L2 dan Larutan L3 yang terdiri daripada air liat dan air lembut, serta Larutan Sabun di dalam bikar.',
        soalan:
          '(a) Rancang dan huraikan prosedur eksperimen untuk mengelaskan Larutan L1, L2 dan L3 kepada air liat atau air lembut menggunakan Larutan Sabun. [5 markah]\n(b) Nyatakan definisi secara operasi bagi air liat. [2 markah]\n(c) Ramalkan pemerhatian sekiranya Larutan Sabun ditambahkan ke dalam larutan magnesium nitrat dan terangkan jawapan anda. [2 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM (4541/3):\n(a) P1: Sukat 20 cm³ Larutan L1 menggunakan silinder penyukat dan tuangkan ke dalam bikar 100 cm³. [1m]\n    P2: Sukat 5 cm³ Larutan Sabun menggunakan silinder penyukat dan tambahkan ke dalam bikar berisi Larutan L1. [1m]\n    P3: Kacau campuran dengan rod kaca. [1m]\n    P4: Perhati dan rekodkan pembentukan kekat (mendakan putih) atau buih di dalam jadual. [1m]\n    P5: Ulang langkah 1 hingga 4 menggunakan Larutan L2 dan Larutan L3. [1m]\n(b) Air liat ialah larutan yang membentuk kekat (perkara diperhatikan) apabila Larutan Sabun ditambahkan ke dalamnya dan dikacau (perkara dilakukan). [2m]\n(c) P1: Kekat (mendakan putih) terbentuk. [1m]\n    P2: Kerana ion magnesium, Mg²⁺ bertindak balas dengan anion sabun membentuk garam magnesium sabun yang tidak larut dalam air (kekat). [1m]',
      },
      {
        kertas: '4541/2 Bahagian A (Klon SPMRSM 2026 S2, S3 & S7 - Polimer, Ubat & Komposit)',
        kodKonstruk: 'KK0401 Menilai Berdasarkan Evidens',
        aras: 'Menilai (KBAT)',
        konteks:
          'Beg plastik polietena mengambil masa 500 tahun untuk terurai di tapak pelupusan sampah. Manakala sebuah kilang minuman memerlukan tangki simpanan air berkapasiti besar yang tahan cuaca dan haba.',
        soalan:
          '(a) Tuliskan persamaan kimia pempolimeran etena dan cadangkan satu kaedah terbaik bagi mengatasi masalah lambakan sisa polimer polietena. [4 markah]\n(b) Berdasarkan sifat ketahanan haba, cuaca dan kekuatan mekanikal, wajarkan pemilihan tangki kaca gentian (bahan komposit) berbanding tangki plastik biasa. [3 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) P1: n C₂H₄ → -(CH₂-CH₂)ₙ- [2m]\n    P2: Kaedah: Kitar semula (pirolisis / penguraian kimia) atau menggantikannya dengan polimer terbiodegradasi (bioplastik). [1m]\n    P3: Penerangan: Polimer terbiodegradasi dapat diuraikan oleh bakteria/mikroorganisma secara semula jadi dalam masa singkat. [1m]\n(b) P1: Pilih tangki bahan komposit (kaca gentian). [1m]\n    P2: Mempunyai kekuatan regangan yang lebih tinggi dan lebih tahan haba berbanding plastik biasa. [1m]\n    P3: Tahan perubahan cuaca dan tidak mudah retak atau rapuh dalam jangka masa panjang. [1m]',
      },
    ];
    soalanDLP = [
      {
        kertas: '4541/3 Practical Test (SPMRSM 2026 Clone Paper 3 - Soap & Hard Water)',
        kodKonstruk: 'SK0112 Experimenting & SK0109 Defining Operationally',
        aras: 'Science Process Skills (Paper 3 Practical)',
        konteks:
          'You are supplied with Solution L1, Solution L2 and Solution L3 consisting of hard water and soft water, as well as Soap Solution.',
        soalan:
          '(a) Plan and describe the experimental procedure to classify Solutions L1, L2 and L3 into hard water or soft water using Soap Solution. [5 marks]\n(b) State the operational definition for hard water. [2 marks]\n(c) Predict the observation if Soap Solution is added into magnesium nitrate solution and explain your answer. [2 marks]',
        jawapan:
          'Analytical Marking Scheme (4541/3):\n(a) P1: Measure 20 cm³ of Solution L1 using a measuring cylinder into a 100 cm³ beaker. [1m]\n    P2: Measure 5 cm³ of Soap Solution and add into the beaker. [1m]\n    P3: Stir the mixture using a glass rod. [1m]\n    P4: Observe and record the formation of scum in a table. [1m]\n    P5: Repeat steps 1 to 4 using Solution L2 and Solution L3. [1m]\n(b) Hard water is a solution that forms scum (what is observed) when Soap Solution is added into it and stirred (what is done). [2m]\n(c) P1: White precipitate (scum) is formed. [1m] P2: Magnesium ions, Mg²⁺ react with soap anions to form insoluble magnesium salt of soap. [1m]',
      },
    ];
  } else {
    // Atom, Periodic Table, Mole, Chemical Bonding (Klon SPMRSM 2026 S1, S4, S6)
    soalanBM = [
      {
        kertas: '4541/2 Bahagian A (Klon SPMRSM 2026 S6 - Ikatan Kimia & Sifat Fizik)',
        kodKonstruk: 'KK0302 Menganalisis Perkaitan',
        aras: 'Menganalisis (Aras Tinggi)',
        konteks:
          'Jadual menunjukkan tiga bahan dengan struktur ikatan berbeza: Logam magnesium (Mg), Magnesium oksida (MgO), dan Gas oksigen (O₂).',
        soalan:
          '(a) Salah satu sifat fizik logam magnesium ialah dapat mengkonduksikan elektrik dalam keadaan pepejal. Terangkan bagaimana logam ini berupaya mengkonduksikan elektrik. [3 markah]\n(b) Bandingkan takat lebur dan takat didih bagi magnesium oksida (MgO) dan gas oksigen (O₂). Terangkan jawapan anda. [4 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) P1: Atom-atom magnesium melepaskan elektron valens untuk membentuk ion logam bercas positif (Mg²⁺) dan lautan elektron. [1m]\n    P2: Elektron-elektron valens dinyahsetempatkan di dalam lautan elektron. [1m]\n    P3: Elektron-elektron yang dinyahsetempatkan ini bebas bergerak membawa cas elektrik apabila arus elektrik dibekalkan. [1m]\n(b) P1: Takat lebur dan takat didih magnesium oksida adalah jauh lebih tinggi daripada gas oksigen. [1m]\n    P2: Ion Mg²⁺ dan ion O²⁻ dalam magnesium oksida ditarik oleh daya tarikan elektrostatik (ikatan ion) yang sangat kuat, manakala molekul O₂ ditarik oleh daya tarikan Van der Waals antara molekul yang lemah. [2m]\n    P3: Lebih banyak tenaga haba diperlukan untuk mengatasi daya tarikan elektrostatik yang kuat dalam MgO berbanding daya Van der Waals yang lemah dalam O₂. [1m]',
      },
      {
        kertas: '4541/2 Bahagian A (Klon SPMRSM 2026 S4 - Jadual Berkala & Stoikiometri)',
        kodKonstruk: 'KK0201 Mengaplikasi & KK0301 Menganalisis',
        aras: 'Mengaplikasi & Menganalisis (KBAT)',
        konteks:
          'Unsur Q (Nombor proton 11) bertindak balas dengan Unsur P (Nombor proton 8) yang berlebihan menghasilkan pepejal putih.',
        soalan:
          '(a) Nyatakan kedudukan Unsur Q dalam Jadual Berkala Unsur dan terangkan jawapan anda berdasarkan susunan elektron. [3 markah]\n(b) 0.5 mol unsur Q bertindak balas dengan unsur P berlebihan. Tuliskan persamaan kimia yang seimbang dan hitung jisim pepejal putih yang terhasil. [Jisim atom relatif: P = 16, Q = 23] [4 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) P1: Susunan elektron atom Q ialah 2.8.1. [1m]\n    P2: Terletak dalam Kumpulan 1 kerana mempunyai 1 elektron valens. [1m]\n    P3: Terletak dalam Kala 3 kerana mempunyai 3 petala berisi elektron. [1m]\n(b) P1: 4Q + P₂ → 2Q₂P (atau 4Na + O₂ → 2Na₂O) [2m]\n    P2: Daripada persamaan, 4 mol Q menghasilkan 2 mol Q₂P. Maka 0.5 mol Q menghasilkan 0.25 mol Q₂P. [1m]\n    P3: Jisim Q₂P = 0.25 mol × [2(23) + 16] g mol⁻¹ = 0.25 × 62 = 15.5 g [1m]',
      },
      {
        kertas: '4541/3 Ujian Amali (Format LP KPM 4541/3 - Formula Empirik / Takat Lebur)',
        kodKonstruk: 'SK0112 Mengeksperimen & SK0109 Mendefinisi Secara Operasi',
        aras: 'Kemahiran Proses Sains (Amali)',
        konteks:
          'Eksperimen menentukan formula empirik magnesium oksida melalui pemanasan pita magnesium di dalam mangkuk pijar.',
        soalan:
          '(a) Mengapakah penutup mangkuk pijar perlu dibuka sedikit dari semasa ke semasa semasa pemanasan dan ditutup semula dengan cepat? [2 markah]\n(b) Bagaimanakah anda memastikan tindak balas antara magnesium dan oksigen telah lengkap sepenuhnya? [1 markah]',
        jawapan:
          'Skema Pemarkahan Analitik LP KPM:\n(a) P1: Dibuka sedikit untuk membenarkan gas oksigen masuk bertindak balas dengan pita magnesium. [1m]\n    P2: Ditutup semula dengan cepat untuk mengelakkan wasap putih magnesium oksida daripada terbebas keluar ke persekitaran. [1m]\n(b) P1: Mengulangi proses pemanasan, penyejukan dan penimbangan sehingga jisim tetap diperoleh. [1m]',
      },
    ];
    soalanDLP = [
      {
        kertas: '4541/2 Section A (SPMRSM 2026 Clone Q6 - Chemical Bonding & Physical Properties)',
        kodKonstruk: 'KK0302 Analysing Relationships',
        aras: 'Analysing (High Level)',
        konteks:
          'Table shows three substances with different bonding structures: Magnesium metal (Mg), Magnesium oxide (MgO), and Oxygen gas (O₂).',
        soalan:
          '(a) Magnesium metal can conduct electricity in solid state. Explain how this metal can conduct electricity. [3 marks]\n(b) Compare the melting point and boiling point of magnesium oxide (MgO) and oxygen gas (O₂). Explain your answer. [4 marks]',
        jawapan:
          'Analytical Marking Scheme (LP KPM):\n(a) P1: Magnesium atoms release valence electrons to form positively charged metal ions (Mg²⁺) and a sea of electrons. [1m]\n    P2: Valence electrons are delocalised and move freely to carry electrical charges. [2m]\n(b) P1: Melting and boiling points of MgO are much higher than O₂. [1m]\n    P2: Mg²⁺ and O²⁻ ions are held together by strong electrostatic forces (ionic bonds), whereas O₂ molecules are held by weak Van der Waals forces. [2m]\n    P3: More heat energy is required to overcome the strong electrostatic forces in MgO. [1m]',
      },
      {
        kertas: '4541/2 Section A (SPMRSM 2026 Clone Q4 - Periodic Table & Stoichiometry)',
        kodKonstruk: 'KK0201 Applying & KK0301 Analysing',
        aras: 'Applying & Analysing (HOTS)',
        konteks:
          '0.5 mol of element Q (Proton number 11) reacts with excess element P (Proton number 8) to produce a white solid.',
        soalan:
          '(a) State the position of element Q in the Periodic Table and explain based on its electron arrangement. [3 marks]\n(b) Write the balanced chemical equation for the reaction and calculate the mass of the white solid produced. [RAM: P = 16, Q = 23] [4 marks]',
        jawapan:
          'Analytical Marking Scheme (LP KPM):\n(a) P1: Electron arrangement of Q is 2.8.1. [1m] P2: Group 1 because it has 1 valence electron; Period 3 because it has 3 shells filled with electrons. [2m]\n(b) P1: 4Q + P₂ → 2Q₂P [2m]; P2: Moles of Q₂P = 0.25 mol [1m]; P3: Mass = 0.25 × 62 = 15.5 g [1m]',
      },
    ];
  }

  analogiBM = [
    {
      tajukAnalogi: `Analogi Fenomena Harian & Visualisasi Zarah (${bab})`,
      setInduksi: `Guru menunjukkan simulasi interaktif (Simulasi Kimia Cikgu Hafreez / PhET) bersama bahan maujud harian yang berkait dengan ${sp || bab}. Murid diminta membuat ramalan pantas selama 60 saat tentang apa yang berlaku pada aras zarah/molekul sebelum guru mengaitkannya dengan objektif pembelajaran hari ini.`,
      kaitanKonsep: `Menghubungkan aras makroskopik (pemerhatian mata kasar di makmal/kehidupan harian) dengan aras submikroskopik (pergerakan atom/ion/molekul) dan aras simbolik (persamaan kimia) mengikut segi tiga Johnstone KSSM.`,
      soalanPencetus: `"Jika kita dapat mengecilkan diri kita sebesar saiz atom di dalam bikar ini, apakah perubahan zarah yang sedang berlaku sekarang?"`,
    },
    {
      tajukAnalogi: `Cetusan Inkuiri & Konflik Kognitif (Fasa Engage 5E HIKMAH)`,
      setInduksi: `Guru memaparkan satu situasi masalah sebenar daripada soalan Klon SPMRSM berkaitan ${bab} (contohnya mengapa dua bahan yang kelihatan serupa memberikan keputusan ujian makmal yang berbeza). Murid berbincang secara Think-Pair-Share selama 2 minit untuk mencadangkan hipotesis awal.`,
      kaitanKonsep: `Merangsang kemahiran membuat inferens (SK0104) dan menganalisis perkaitan (KK0302) sejak 5 minit pertama PdPC.`,
      soalanPencetus: `"Apakah bukti eksperimen yang kita perlukan untuk mengesahkan hipotesis kumpulan anda sebentar tadi?"`,
    },
    {
      tajukAnalogi: `Analogi Kehidupan Pelajar di Sekolah / Asrama`,
      setInduksi: `Guru mengumpamakan interaksi zarah dalam ${sp || bab} seperti situasi pelajar di dewan makan atau padang sekolah (contoh: susunan teratur vs rawak, perkongsian barang vs pemberian barang, atau laluan sesak vs laluan pantas).`,
      kaitanKonsep: `Memudahkan murid sederhana dan lemah mengingati konsep abstrak kimia menggunakan memori jangka panjang yang dekat dengan pengalaman harian mereka.`,
      soalanPencetus: `"Berdasarkan analogi tadi, bahagian manakah yang mewakili bahan tindak balas dan bahagian manakah yang mewakili hasil tindak balas?"`,
    },
  ];

  analogiDLP = [
    {
      tajukAnalogi: `Everyday Phenomenon & Submicroscopic Particle Hook (${bab})`,
      setInduksi: `Teacher displays an interactive digital simulation (Simulasi Kimia Cikgu Hafreez / PhET) alongside a real-life item related to ${sp || bab}. Pupils make a 60-second prediction on mini whiteboards about what happens at the submicroscopic particle level.`,
      kaitanKonsep: `Bridges macroscopic observations, submicroscopic particle interactions, and symbolic chemical equations (Johnstone's Chemistry Triangle).`,
      soalanPencetus: `"If we could zoom in 10 million times to observe the ions/molecules inside this beaker, what changes would we see?"`,
    },
    {
      tajukAnalogi: `SPMRSM Real-World Problem Inquiry Hook (5E Engage Phase)`,
      setInduksi: `Teacher presents a real-world dilemma from an SPMRSM Chemistry scenario related to ${bab}. Pupils discuss in pairs for 2 minutes to propose an initial scientific hypothesis.`,
      kaitanKonsep: `Activates Science Process Skills (Inferring SK0104) and HOTS Analysing (KK0302) within the first 5 minutes of the lesson.`,
      soalanPencetus: `"What chemical test or experimental evidence do we need to prove your hypothesis?"`,
    },
    {
      tajukAnalogi: `Student Daily-Life Analogy for ${bab}`,
      setInduksi: `Teacher relates the behaviour of particles/electrons in ${sp || bab} to a familiar student scenario (e.g., sharing vs transferring items, crowded hallway collision frequency).`,
      kaitanKonsep: `Helps mixed-ability learners visualise and retain abstract chemical principles effortlessly.`,
      soalanPencetus: `"Based on our analogy, which factor has the greatest impact on the outcome of this reaction?"`,
    },
  ];

  const aktivitiBM: Pak21ActivityItem[] = [
    {
      namaAktiviti: `Eksplorasi Simulasi Digital (Simulasi Kimia Cikgu Hafreez & PhET) + Papan Putih Mini`,
      penerangan: `1. Guru memaparkan Simulasi Kimia Cikgu Hafreez / PhET berkaitan ${sp || bab}.\n2. Murid dalam kumpulan berempat memanipulasikan pemboleh ubah pada simulasi dan memerhatikan perubahan aras zarah serta graf.\n3. Setiap kumpulan menulis persamaan kimia / rumusan konsep pada papan putih mini dan mengangkatnya serentak untuk semakan pantas PBD.`,
      alatBahan: [
        'Simulasi Kimia Cikgu Hafreez & PhET Simulation',
        'Papan putih mini & pen marker',
        'Lembaran kerja berpandu',
      ],
      kelebihan:
        'Visualisasi submikroskopik yang sangat jelas dan melibatkan 100% murid secara aktif.',
    },
    {
      namaAktiviti: `Stesen Berputar (Station Rotation): Klinik Skor A+ SPM 4541 (${bab})`,
      penerangan: `1. Murid bergerak secara berkumpulan melalui 3 stesen selama 15 minit:\n   • Stesen 1 (Konsep & Model): Melengkapkan rajah berlabel / susunan radas.\n   • Stesen 2 (Stoikiometri & Persamaan): Menyelesaikan persamaan kimia dan pengiraan.\n   • Stesen 3 (Cabaran KBAT SPMRSM): Menjawab 1 soalan struktur KBAT menggunakan teknik kata kunci skema LP KPM.\n2. Semakan silang antara kumpulan menggunakan pen merah.`,
      alatBahan: [
        'Kad Tugasan Stesen Klon SPMRSM',
        'Jadual Berkala Unsur',
        'Kit Model Molekul (Molymod)',
      ],
      kelebihan:
        'Melatih murid menjawab mengikut format rasmi Kertas 2 (4541/2) dan Kertas 3 (4541/3) Lembaga Peperiksaan.',
    },
    {
      namaAktiviti: `Gallery Walk: Peta Pemikiran i-Think & Pembentangan 2 Bintang 1 Harapan`,
      penerangan: `1. Setiap kumpulan membina peta alir / peta buih berganda bagi membandingkan konsep utama dalam ${sp || bab}.\n2. Hasil kerja ditampal di dinding makmal untuk sesi Gallery Walk.\n3. Kumpulan lain menilai ketepatan fakta dan meninggalkan maklum balas pada nota lekat (Sticky Notes).`,
      alatBahan: [
        'Kertas Mahjong / Kad A3',
        'Pen penanda warna-warni',
        'Sticky notes',
      ],
      kelebihan:
        'Memupuk komunikasi saintifik (SK0106), kolaborasi berpasukan dan pentaksiran rakan sebaya.',
    },
  ];

  const aktivitiDLP: Pak21ActivityItem[] = [
    {
      namaAktiviti: `Interactive Digital Simulation (Simulasi Kimia Cikgu Hafreez & PhET) + Rapid Whiteboard`,
      penerangan: `1. Teacher launches Simulasi Kimia Cikgu Hafreez / PhET for ${sp || bab}.\n2. Pupils in groups of 4 manipulate the variables and observe submicroscopic particle interactions.\n3. Groups write the balanced chemical equation and explanation on mini whiteboards for instant formative feedback.`,
      alatBahan: [
        'Simulasi Kimia Cikgu Hafreez & PhET Simulation',
        'Mini whiteboards & markers',
        'Guided inquiry sheet',
      ],
      kelebihan:
        'Makes abstract submicroscopic chemistry concepts tangible with 100% student engagement.',
    },
    {
      namaAktiviti: `Station Rotation: SPM 4541 Score A+ Mastery Clinic (${bab})`,
      penerangan: `1. Pupils rotate through 3 focused stations (15 mins):\n   • Station 1 (Apparatus & Concept): Labelling apparatus setup & particle diagrams.\n   • Station 2 (Equations & Calculation): Writing chemical/ionic equations.\n   • Station 3 (SPMRSM HOTS Challenge): Answering an SPM Paper 2/3 structured question using official LP KPM marking keywords.`,
      alatBahan: [
        'SPMRSM Station Task Cards',
        'Periodic Table of Elements',
        'Molecular Model Kit (Molymod)',
      ],
      kelebihan:
        'Directly trains students in official SPM 4541/2 and 4541/3 answering techniques.',
    },
    {
      namaAktiviti: `Gallery Walk: i-Think Concept Mapping & Peer Review`,
      penerangan: `1. Groups construct a Flow Map or Double Bubble Map summarizing ${sp || bab}.\n2. Work is displayed for a structured Gallery Walk using "2 Stars and 1 Wish" sticky notes.\n3. Teacher reinforces key IUPAC/KSSM terminology.`,
      alatBahan: ['Mahjong paper / A3 Card', 'Coloured markers', 'Sticky notes'],
      kelebihan:
        'Develops scientific communication skills (SK0106) and collaborative peer assessment.',
    },
  ];

  const chosenSoalan = isDlp ? soalanDLP : soalanBM;
  const filteredSoalan =
    formatFilter && formatFilter !== 'SEMUA'
      ? chosenSoalan.filter((q) =>
          q.kertas.toLowerCase().includes(formatFilter.toLowerCase())
        )
      : chosenSoalan;

  return {
    soalan: filteredSoalan.length > 0 ? filteredSoalan : chosenSoalan,
    analogiList: isDlp ? analogiDLP : analogiBM,
    aktiviti: isDlp ? aktivitiDLP : aktivitiBM,
  };
}
