import { BabBiologi, StandardPembelajaran } from '../../../types/rph';

function makeBmSp(
 kod: string,
 tajuk: string,
 skTajuk: string,
 babTajuk: string,
 eksperimenWajib?: boolean
): StandardPembelajaran {
 const cleanTitle = tajuk.replace(/\.$/, '');
 const lowerTitle = cleanTitle.charAt(0).toLowerCase() + cleanTitle.slice(1);
 return {
 kod,
 tajuk,
 eksperimenWajib,
 namaEksperimen: eksperimenWajib ? `Eksperimen ${kod}: ${cleanTitle}` : undefined,
 objektifCadangan: [
 `Di akhir PdPc, murid dapat ${lowerTitle} dengan tepat mengikut kehendak DSKP KSSM Biologi.`,
 eksperimenWajib
 ? `Menjalankan penyiasatan saintifik (${cleanTitle}), merekod data pemerhatian secara sistematik, dan membuat kesimpulan biologi yang sah.`
 : `Mengaplikasikan konsep ${skTajuk.toLowerCase()} untuk menjawab sekurang-kurangnya 3 soalan latihan berstruktur dengan betul.`,
 ],
 kriteriaKejayaanCadangan: [
 `Murid dapat menerangkan konsep dan istilah biologi bagi SP ${kod} (${cleanTitle}) dengan tepat.`,
 eksperimenWajib
 ? 'Murid berjaya menyediakan radas dengan selamat, merekod data eksperimen lengkap dan menulis laporan amali.'
 : `Murid dapat menjawab sekurang-kurangnya 3 daripada 4 soalan formatif berkaitan ${skTajuk.toLowerCase()} dengan betul.`,
 ],
 cadanganAktiviti: {
 setInduksi: `Guru memaparkan fenomena kehidupan sebenar atau rangsangan visual berkaitan ${skTajuk} (${babTajuk}) dan mengemukakan soalan inkuiri untuk mencungkil pengetahuan sedia ada murid.`,
 aktivitiUtama: eksperimenWajib
 ? [
 `1. Guru memberi taklimat keselamatan makmal serta membincangkan hipotesis, pemboleh ubah (dimanipulasi, bergerak balas, dimalarkan) dan prosedur bagi: ${cleanTitle}.`,
 '2. Murid menjalankan eksperimen secara berkumpulan, memerhati spesimen/tindak balas dan merekod data secara sistematik.',
 '3. Pembentangan dapatan eksperimen, analisis graf/data dan perbincangan kesimpulan bersama guru.',
 ]
 : [
 `1. Guru menerangkan konsep teras SP ${kod}: ${cleanTitle} menggunakan rajah anatomi/sel atau simulasi interaktif.`,
 '2. Aktiviti Kolaboratif PAK-21 (Think-Pair-Share / Gallery Walk): Murid membina peta konsep, melabel rajah biologi atau menyelesaikan soalan berstruktur dalam kumpulan.',
 '3. Wakil kumpulan membentangkan hasil perbincangan dan menerima maklum balas formatif daripada rakan dan guru.',
 ],
 penutup: `Exit Ticket: Murid merumuskan isi penting SP ${kod} dan menjawab 2 soalan semakan pantas.`,
 aktiviti5E: {
 engage: `Guru menunjukkan fenomena biologi atau spesimen/video berkaitan ${skTajuk} dan menyoal murid untuk mencetuskan rasa ingin tahu.`,
 explore: eksperimenWajib
 ? `Murid menjalankan penyiasatan amali (${cleanTitle}) secara berkumpulan untuk mengumpul data empirikal.`
 : `Murid meneroka stesen pembelajaran / model biologi / simulasi untuk menyiasat ${cleanTitle} secara kolaboratif.`,
 explain: 'Wakil kumpulan membentangkan dapatan menggunakan istilah saintifik biologi yang tepat sambil guru memurnikan konsep.',
 elaborate: 'Murid mengaplikasikan kefahaman kepada situasi baharu dan soalan KBAT SPM berkaitan kesihatan, fisiologi atau alam sekitar.',
 evaluate: 'Pentaksiran formatif melalui kuiz papan putih mini / exit ticket bagi mengesahkan penguasaan objektif pembelajaran.',
 },
 },
 bbmCadangan: eksperimenWajib
 ? ['Buku Teks Biologi KSSM', 'Buku Amali Biologi', 'Radas Makmal & Spesimen/Reagen', 'Papan Putih Mini / Lembaran Kerja']
 : ['Buku Teks Biologi KSSM', 'Slaid / Carta Rajah Biologi', 'Simulasi Digital / Video', 'Lembaran Kerja Berstruktur'],
 kemahiranSaintifikCadangan: eksperimenWajib
 ? ['Memerhati', 'Mengukur dan menggunakan nombor', 'Mengawal pemboleh ubah', 'Membuat hipotesis', 'Mengeksperimen']
 : ['Memerhati', 'Mengelas', 'Mentafsir data', 'Berkomunikasi'],
 };
}

export const DSKP_F4: BabBiologi[] = [
 {
 id: "F4_B1",
 tingkatan: "Tingkatan 4",
 nomborBab: 1,
 tema: "Asas Biologi",
 tajuk: "Pengenalan kepada Biologi dan Peraturan Makmal",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Pengenalan kepada Biologi dan Peraturan Makmal.",
 skList: [
 {
 kod: "1.1",
 tajuk: "Bidang Biologi dan Kerjaya",
 spList: [
 makeBmSp("1.1.1", "Menyatakan maksud biologi.", "Bidang Biologi dan Kerjaya", "Pengenalan kepada Biologi dan Peraturan Makmal"),
 makeBmSp("1.1.2", "Menyenaraikan bidang kajian biologi, kerjaya dan kemajuan dalam bidang berkaitan.", "Bidang Biologi dan Kerjaya", "Pengenalan kepada Biologi dan Peraturan Makmal"),
 makeBmSp("1.1.3", "Menjana idea tentang perkembangan bidang biologi dan sumbangan teknologi biologi kepada manusia.", "Bidang Biologi dan Kerjaya", "Pengenalan kepada Biologi dan Peraturan Makmal"),
 makeBmSp("1.1.4", "Memberikan contoh kerjaya yang berkaitan dengan bidang biologi.", "Bidang Biologi dan Kerjaya", "Pengenalan kepada Biologi dan Peraturan Makmal"),
 ],
 },
 {
 kod: "1.2",
 tajuk: "Keselamatan dan Peraturan dalam Makmal Biologi",
 spList: [
 makeBmSp("1.2.1", "Menjelaskan peralatan perlindungan diri dan fungsinya.", "Keselamatan dan Peraturan dalam Makmal Biologi", "Pengenalan kepada Biologi dan Peraturan Makmal"),
 makeBmSp("1.2.2", "Mengenal pasti dan mewajarkan bahan yang boleh dibuang ke dalam sinki.", "Keselamatan dan Peraturan dalam Makmal Biologi", "Pengenalan kepada Biologi dan Peraturan Makmal"),
 makeBmSp("1.2.3", "Mengenal pasti dan mewajarkan bahan yang tidak boleh dibuang ke dalam sinki.", "Keselamatan dan Peraturan dalam Makmal Biologi", "Pengenalan kepada Biologi dan Peraturan Makmal"),
 makeBmSp("1.2.4", "Memerihalkan kaedah mengurus bahan sisa biologi.", "Keselamatan dan Peraturan dalam Makmal Biologi", "Pengenalan kepada Biologi dan Peraturan Makmal"),
 makeBmSp("1.2.5", "Berkomunikasi mengenai langkah- langkah mengurus kemalangan dalam makmal.", "Keselamatan dan Peraturan dalam Makmal Biologi", "Pengenalan kepada Biologi dan Peraturan Makmal"),
 makeBmSp("1.2.6", "Merumuskan amalan-amalan dalam makmal biologi.", "Keselamatan dan Peraturan dalam Makmal Biologi", "Pengenalan kepada Biologi dan Peraturan Makmal"),
 ],
 },
 {
 kod: "1.3",
 tajuk: "Berkomunikasi dalam Biologi",
 spList: [
 makeBmSp("1.3.1", "Berkomunikasi tentang data eksperimen dengan membina jadual berdasarkan data daripada eksperimen yang dijalankan.", "Berkomunikasi dalam Biologi", "Pengenalan kepada Biologi dan Peraturan Makmal", true),
 makeBmSp("1.3.2", "Melukis graf yang sesuai berdasarkan data daripada eksperimen yang dijalankan.", "Berkomunikasi dalam Biologi", "Pengenalan kepada Biologi dan Peraturan Makmal", true),
 makeBmSp("1.3.3", "Melakarkan lukisan biologi berdasarkan pemerhatian yang dibuat.", "Berkomunikasi dalam Biologi", "Pengenalan kepada Biologi dan Peraturan Makmal"),
 makeBmSp("1.3.4", "Mengenal pasti satah badan, keratan dan istilah arah dalam organisma.", "Berkomunikasi dalam Biologi", "Pengenalan kepada Biologi dan Peraturan Makmal"),
 ],
 },
 {
 kod: "1.4",
 tajuk: "Penyiasatan Saintifik dalam Biologi",
 spList: [
 makeBmSp("1.4.1", "Mereka bentuk eksperimen untuk menyelesaikan masalah dengan menggunakan kaedah penyiasatan saintifik. PENGENALAN KEPADA BIOLOGI DAN PERATURAN MAKMAL", "Penyiasatan Saintifik dalam Biologi", "Pengenalan kepada Biologi dan Peraturan Makmal", true),
 ],
 },
 ],
 },
 {
 id: "F4_B2",
 tingkatan: "Tingkatan 4",
 nomborBab: 2,
 tema: "Asas Biologi",
 tajuk: "Biologi Sel dan Organisasi Sel",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Biologi Sel dan Organisasi Sel.",
 skList: [
 {
 kod: "2.1",
 tajuk: "Struktur dan Fungsi Sel",
 spList: [
 makeBmSp("2.1.1", "Menyediakan slaid sel haiwan dan sel tumbuhan.", "Struktur dan Fungsi Sel", "Biologi Sel dan Organisasi Sel"),
 makeBmSp("2.1.2", "Mengenal pasti struktur sel haiwan dan sel tumbuhan berdasarkan pemerhatian menerusi mikroskop cahaya.", "Struktur dan Fungsi Sel", "Biologi Sel dan Organisasi Sel"),
 makeBmSp("2.1.3", "Menganalisis komponen dalam sel haiwan dan sel tumbuhan seperti yang dilihat pada mikrograf.", "Struktur dan Fungsi Sel", "Biologi Sel dan Organisasi Sel"),
 makeBmSp("2.1.4", "Menyatakan fungsi utama komponen dalam sel haiwan dan sel tumbuhan seperti yang dilihat pada mikrograf.", "Struktur dan Fungsi Sel", "Biologi Sel dan Organisasi Sel"),
 makeBmSp("2.1.5", "Membanding dan membezakan komponen antara sel haiwan dengan sel tumbuhan.", "Struktur dan Fungsi Sel", "Biologi Sel dan Organisasi Sel"),
 ],
 },
 {
 kod: "2.2",
 tajuk: "Proses Hidup Organisma Unisel",
 spList: [
 makeBmSp("2.2.1", "Mengkonsepsikan proses hidup organisma unisel seperti Amoeba sp. dan Paramecium sp..", "Proses Hidup Organisma Unisel", "Biologi Sel dan Organisasi Sel"),
 makeBmSp("2.2.2", "Mengitlak proses hidup organisma unisel seperti yang dilihat menerusi mikroskop cahaya.", "Proses Hidup Organisma Unisel", "Biologi Sel dan Organisasi Sel"),
 ],
 },
 {
 kod: "2.3",
 tajuk: "Proses Hidup Organisma Multisel",
 spList: [
 makeBmSp("2.3.1", "Menghubung kait keunikan struktur sel khusus dengan fungsi sel dalam organisma multisel.", "Proses Hidup Organisma Multisel", "Biologi Sel dan Organisasi Sel"),
 makeBmSp("2.3.2", "Mengenal pasti sel khusus dalam organisma multisel.", "Proses Hidup Organisma Multisel", "Biologi Sel dan Organisasi Sel"),
 makeBmSp("2.3.3", "Mencerakinkan kepadatan organel tertentu dengan fungsi sel khusus dalam organisma multisel.", "Proses Hidup Organisma Multisel", "Biologi Sel dan Organisasi Sel"),
 makeBmSp("2.3.4", "Menghuraikan kesan kekurangan, ketiadaan atau kegagalan fungsi suatu organel bagi sel tertentu dalam organisma multisel.", "Proses Hidup Organisma Multisel", "Biologi Sel dan Organisasi Sel"),
 ],
 },
 {
 kod: "2.4",
 tajuk: "Aras Organisasi",
 spList: [
 makeBmSp("2.4.1", "Membuat urutan aras organisasi dalam organisma multisel.", "Aras Organisasi", "Biologi Sel dan Organisasi Sel"),
 makeBmSp("2.4.2", "Mengenal pasti sel, tisu atau organ dalam suatu sistem organ.", "Aras Organisasi", "Biologi Sel dan Organisasi Sel"),
 makeBmSp("2.4.3", "Berkomunikasi tentang sistem organ dengan fungsi utamanya dalam organisma multisel. BIOLOGI SEL DAN ORGANISASI SEL", "Aras Organisasi", "Biologi Sel dan Organisasi Sel"),
 ],
 },
 ],
 },
 {
 id: "F4_B3",
 tingkatan: "Tingkatan 4",
 nomborBab: 3,
 tema: "Asas Biologi",
 tajuk: "Pergerakan Bahan Merentasi Membran Plasma",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Pergerakan Bahan Merentasi Membran Plasma.",
 skList: [
 {
 kod: "3.1",
 tajuk: "Struktur Membran Plasma",
 spList: [
 makeBmSp("3.1.1", "Mewajarkan keperluan pergerakan bahan merentasi membran plasma.", "Struktur Membran Plasma", "Pergerakan Bahan Merentasi Membran Plasma"),
 makeBmSp("3.1.2", "Memerihalkan komponen membran plasma dan fungsinya berdasarkan model mozek bendalir.", "Struktur Membran Plasma", "Pergerakan Bahan Merentasi Membran Plasma"),
 makeBmSp("3.1.3", "Melukis dan melabelkan komponen membran plasma berdasarkan model mozek bendalir.", "Struktur Membran Plasma", "Pergerakan Bahan Merentasi Membran Plasma"),
 makeBmSp("3.1.4", "Menghuraikan ketelapan membran plasma.", "Struktur Membran Plasma", "Pergerakan Bahan Merentasi Membran Plasma"),
 ],
 },
 {
 kod: "3.2",
 tajuk: "Konsep Pergerakan Bahan Merentasi Membran Plasma",
 spList: [
 makeBmSp("3.2.1", "Menyatakan ciri bahan yang dapat merentasi membran plasma dari aspek: (i) saiz molekul. (ii) kekutuban molekul. (iii) cas ion.", "Konsep Pergerakan Bahan Merentasi Membran Plasma", "Pergerakan Bahan Merentasi Membran Plasma"),
 makeBmSp("3.2.2", "Menjalankan eksperimen untuk mengkaji pergerakan bahan merentasi membran telap memilih dengan menggunakan: (i) tiub Visking. (ii) osmometer ringkas.", "Konsep Pergerakan Bahan Merentasi Membran Plasma", "Pergerakan Bahan Merentasi Membran Plasma", true),
 makeBmSp("3.2.3", "Menghuraikan dengan contoh pergerakan bahan merentasi membran plasma: (i) pengangkutan pasif. (ii) pengangkutan aktif.", "Konsep Pergerakan Bahan Merentasi Membran Plasma", "Pergerakan Bahan Merentasi Membran Plasma"),
 makeBmSp("3.2.4", "Membanding dan membezakan antara pengangkutan pasif dengan pengangkutan aktif.", "Konsep Pergerakan Bahan Merentasi Membran Plasma", "Pergerakan Bahan Merentasi Membran Plasma"),
 ],
 },
 {
 kod: "3.3",
 tajuk: "Pergerakan Bahan Merentasi Membran Plasma dalam Organisma Hidup",
 spList: [
 makeBmSp("3.3.1", "Menjelaskan dengan contoh proses pengangkutan pasif dalam organisma.", "Pergerakan Bahan Merentasi Membran Plasma dalam Organisma Hidup", "Pergerakan Bahan Merentasi Membran Plasma"),
 makeBmSp("3.3.2", "Menjelaskan dengan contoh proses pengangkutan aktif dalam organisma.", "Pergerakan Bahan Merentasi Membran Plasma dalam Organisma Hidup", "Pergerakan Bahan Merentasi Membran Plasma"),
 makeBmSp("3.3.3", "Mendefinisikan larutan: (i) hipotonik. (ii) hipertonik. (iii) isotonik.", "Pergerakan Bahan Merentasi Membran Plasma dalam Organisma Hidup", "Pergerakan Bahan Merentasi Membran Plasma"),
 makeBmSp("3.3.4", "Mengeksperimen untuk mengkaji kesan larutan yang berlainan kepekatan terhadap sel haiwan dan sel tumbuhan.", "Pergerakan Bahan Merentasi Membran Plasma dalam Organisma Hidup", "Pergerakan Bahan Merentasi Membran Plasma"),
 makeBmSp("3.3.5", "Berkomunikasi tentang kesan larutan hipotonik, hipertonik dan isotonik terhadap sel berdasarkan pergerakan molekul air: (i) sel haiwan. (ii) sel tumbuhan.", "Pergerakan Bahan Merentasi Membran Plasma dalam Organisma Hidup", "Pergerakan Bahan Merentasi Membran Plasma"),
 ],
 },
 {
 kod: "3.4",
 tajuk: "Pergerakan Bahan Merentasi Membran Plasma dalam Kehidupan Harian",
 spList: [
 makeBmSp("3.4.1", "Mengeksperimen untuk menentukan kepekatan sap sel tisu tumbuhan.", "Pergerakan Bahan Merentasi Membran Plasma dalam Kehidupan Harian", "Pergerakan Bahan Merentasi Membran Plasma"),
 makeBmSp("3.4.2", "Menghubung kait kepekatan sap sel suatu tisu tumbuhan dengan fenomena kelayuan tumbuhan.", "Pergerakan Bahan Merentasi Membran Plasma dalam Kehidupan Harian", "Pergerakan Bahan Merentasi Membran Plasma"),
 makeBmSp("3.4.3", "Menghuraikan dengan contoh aplikasi konsep pergerakan bahan merentasi membran plasma dalam kehidupan harian.", "Pergerakan Bahan Merentasi Membran Plasma dalam Kehidupan Harian", "Pergerakan Bahan Merentasi Membran Plasma"),
 makeBmSp("3.4.4", "Berkomunikasi tentang proses PERGERAKAN BAHAN MERENTASI MEMBRAN PLASMA", "Pergerakan Bahan Merentasi Membran Plasma dalam Kehidupan Harian", "Pergerakan Bahan Merentasi Membran Plasma"),
 ],
 },
 ],
 },
 {
 id: "F4_B4",
 tingkatan: "Tingkatan 4",
 nomborBab: 4,
 tema: "Asas Biologi",
 tajuk: "Komposisi Kimia dalam Sel",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Komposisi Kimia dalam Sel.",
 skList: [
 {
 kod: "4.1",
 tajuk: "Air",
 spList: [
 makeBmSp("4.1.1", "Memerihalkan sifat molekul air.", "Air", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.1.2", "Menghubung kait sifat air dengan kepentingannya dalam sel.", "Air", "Komposisi Kimia dalam Sel"),
 ],
 },
 {
 kod: "4.2",
 tajuk: "Karbohidrat",
 spList: [
 makeBmSp("4.2.1", "Menyenaraikan unsur dalam karbohidrat.", "Karbohidrat", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.2.2", "Menjelaskan jenis karbohidrat: (i) monosakarida. (ii) disakarida. (iii) polisakarida.", "Karbohidrat", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.2.3", "Mengkonsepsikan pembentukan dan penguraian: (i) disakarida. (ii) polisakarida.", "Karbohidrat", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.2.4", "Menulis dan menerangkan persamaan perkataan bagi pembentukan dan penguraian disakarida.", "Karbohidrat", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.2.5", "Mewajarkan kepentingan karbohidrat dalam sel.", "Karbohidrat", "Komposisi Kimia dalam Sel"),
 ],
 },
 {
 kod: "4.3",
 tajuk: "Protein",
 spList: [
 makeBmSp("4.3.1", "Menyenaraikan unsur-unsur dalam protein.", "Protein", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.3.2", "Mengkonsepsikan pembentukan dan penguraian dipeptida dan polipeptida.", "Protein", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.3.3", "Menulis dan menerangkan persamaan perkataan bagi pembentukan dan penguraian dipeptida.", "Protein", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.3.4", "Mewajarkan kepentingan protein dalam sel.", "Protein", "Komposisi Kimia dalam Sel"),
 ],
 },
 {
 kod: "4.4",
 tajuk: "Lipid",
 spList: [
 makeBmSp("4.4.1", "Menyenaraikan unsur dalam lipid.", "Lipid", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.4.2", "Menjelaskan jenis lipid yang utama.", "Lipid", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.4.3", "Memerihalkan pembentukan dan penguraian trigliserida.", "Lipid", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.4.4", "Menulis dan menerangkan persamaan perkataan bagi pembentukan dan penguraian trigliserida.", "Lipid", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.4.5", "Mewajarkan kepentingan lipid dalam sel dan organisma multisel.", "Lipid", "Komposisi Kimia dalam Sel"),
 ],
 },
 {
 kod: "4.5",
 tajuk: "Asid nukleik",
 spList: [
 makeBmSp("4.5.1", "Menyenaraikan unsur dalam asid nukleik.", "Asid nukleik", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.5.2", "Menerangkan struktur nukleotida: (i) gula bes bernitrogen. (ii) ribosa atau gula deoksiribosa. (iii) fosfat.", "Asid nukleik", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.5.3", "Menghuraikan struktur polinukleotida: (i) asid deoksiribonukleik (DNA). (ii) asid ribonukleik (RNA).", "Asid nukleik", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.5.4", "Mewajarkan kepentingan asid nukleik dalam sel: (i) pembawa maklumat pewarisan. (ii) penghasilan protein.", "Asid nukleik", "Komposisi Kimia dalam Sel"),
 makeBmSp("4.5.5", "Memerihalkan pembentukan kromosom daripada DNA dan protein. KOMPOSISI KIMIA DALAM SEL", "Asid nukleik", "Komposisi Kimia dalam Sel"),
 ],
 },
 ],
 },
 {
 id: "F4_B5",
 tingkatan: "Tingkatan 4",
 nomborBab: 5,
 tema: "Asas Biologi",
 tajuk: "Metabolisme dan Enzim",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Metabolisme dan Enzim.",
 skList: [
 {
 kod: "5.1",
 tajuk: "Metabolisme",
 spList: [
 makeBmSp("5.1.1", "Mendefinisikan metabolisme.", "Metabolisme", "Metabolisme dan Enzim"),
 makeBmSp("5.1.2", "Menyatakan jenis metabolisme dalam sel: (i) anabolisme. (ii) katabolisme.", "Metabolisme", "Metabolisme dan Enzim"),
 ],
 },
 {
 kod: "5.2",
 tajuk: "Enzim",
 spList: [
 makeBmSp("5.2.1", "Mendefinisikan enzim.", "Enzim", "Metabolisme dan Enzim"),
 makeBmSp("5.2.2", "Menaakul keperluan enzim dalam metabolisme.", "Enzim", "Metabolisme dan Enzim"),
 makeBmSp("5.2.3", "Memerihalkan penamaan enzim dengan penambahan \u2013ase pada substrat.", "Enzim", "Metabolisme dan Enzim"),
 makeBmSp("5.2.4", "Mencirikan sifat umum enzim.", "Enzim", "Metabolisme dan Enzim"),
 makeBmSp("5.2.5", "Berkomunikasi tentang penglibatan organel khusus dalam penghasilan: (i) enzim intrasel. (ii) enzim ekstrasel.", "Enzim", "Metabolisme dan Enzim"),
 makeBmSp("5.2.6", "Menerangkan mekanisme tindakan enzim dengan menggunakan hipotesis \u2018mangga dan kunci\u2019.", "Enzim", "Metabolisme dan Enzim"),
 makeBmSp("5.2.7", "Mentafsir rajah tenaga untuk menerangkan mekanisme tindakan enzim.", "Enzim", "Metabolisme dan Enzim"),
 makeBmSp("5.2.8", "Menghubung kait mekanisme tindakan enzim dengan perubahan faktor berikut: (i) suhu. (ii) pH. (iii) kepekatan substrat. (iv) kepekatan enzim.", "Enzim", "Metabolisme dan Enzim"),
 makeBmSp("5.2.9", "Mengeksperimen untuk mengkaji kesan suhu dan pH terhadap aktiviti enzim amilase dan pepsin.", "Enzim", "Metabolisme dan Enzim"),
 ],
 },
 {
 kod: "5.3",
 tajuk: "Aplikasi Enzim dalam Kehidupan Harian",
 spList: [
 makeBmSp("5.3.1", "Menjelaskan dengan contoh aplikasi enzim dalam kehidupan harian. METABOLISME DAN ENZIM", "Aplikasi Enzim dalam Kehidupan Harian", "Metabolisme dan Enzim"),
 ],
 },
 ],
 },
 {
 id: "F4_B6",
 tingkatan: "Tingkatan 4",
 nomborBab: 6,
 tema: "Asas Biologi",
 tajuk: "Pembahagian Sel",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Pembahagian Sel.",
 skList: [
 {
 kod: "6.1",
 tajuk: "Pembahagian Sel",
 spList: [
 makeBmSp("6.1.1", "Memerihalkan: (i) kariokinesis (pembahagian nukleus). (ii) sitokinesis (pembahagian sitoplasma).", "Pembahagian Sel", "Pembahagian Sel"),
 makeBmSp("6.1.2", "Memerihalkan haploid, diploid, kromatin, kromosom homolog, kromosom paternal dan kromosom maternal.", "Pembahagian Sel", "Pembahagian Sel"),
 ],
 },
 {
 kod: "6.2",
 tajuk: "Kitar Sel dan Mitosis",
 spList: [
 makeBmSp("6.2.1", "Memerihalkan fasa dalam kitar sel. (i) interfasa. (ii) fasa G1. (iii) fasa S. (iv) fasa G2. (v) fasa M. (vi) mitosis. (vii) sitokinesis.", "Kitar Sel dan Mitosis", "Pembahagian Sel"),
 makeBmSp("6.2.2", "Menyusun peringkat mitosis mengikut urutan.", "Kitar Sel dan Mitosis", "Pembahagian Sel"),
 makeBmSp("6.2.3", "Berkomunikasi tentang struktur sel dalam setiap peringkat mitosis dan sitokinesis melalui lukisan berlabel.", "Kitar Sel dan Mitosis", "Pembahagian Sel"),
 makeBmSp("6.2.4", "Membanding dan membezakan mitosis dan sitokinesis antara sel haiwan dengan sel tumbuhan.", "Kitar Sel dan Mitosis", "Pembahagian Sel"),
 makeBmSp("6.2.5", "Membincangkan keperluan mitosis dalam: (i) perkembangan embrio. (ii) pertumbuhan organisma. (iii) penyembuhan luka pada kulit. (iv) penjanaan semula. (v) pembiakan aseks.", "Kitar Sel dan Mitosis", "Pembahagian Sel"),
 ],
 },
 {
 kod: "6.3",
 tajuk: "Meiosis",
 spList: [
 makeBmSp("6.3.1", "Menyatakan pengertian meiosis.", "Meiosis", "Pembahagian Sel"),
 makeBmSp("6.3.2", "Mengenal pasti jenis sel yang menjalankan meiosis.", "Meiosis", "Pembahagian Sel"),
 makeBmSp("6.3.3", "Menyatakan keperluan meiosis dalam: (i) pembentukan gamet (gametogenesis). (ii) menghasilkan variasi genetik. (iii) mengekalkan bilangan kromosom diploid dari generasi ke generasi.", "Meiosis", "Pembahagian Sel"),
 makeBmSp("6.3.4", "Menerangkan peringkat-peringkat dalam meiosis mengikut urutan yang betul: (i) meiosis i. (ii) meiosis ii.", "Meiosis", "Pembahagian Sel"),
 makeBmSp("6.3.5", "Melukis dan melabel struktur sel dalam setiap peringkat meiosis I, meiosis II dan sitokinesis.", "Meiosis", "Pembahagian Sel"),
 makeBmSp("6.3.6", "Membanding dan membezakan antara meiosis dengan mitosis.", "Meiosis", "Pembahagian Sel"),
 ],
 },
 {
 kod: "6.4",
 tajuk: "Isu Pembahagian Sel Terhadap Kesihatan Manusia",
 spList: [
 makeBmSp("6.4.1", "Menghuraikan kesan ketidaknormalan mitosis terhadap kesihatan manusia: (i) tumor. (ii) kanser.", "Isu Pembahagian Sel Terhadap Kesihatan Manusia", "Pembahagian Sel"),
 makeBmSp("6.4.2", "Menilai kesan ketidaknormalan meiosis terhadap individu: (i) sindrom Down. PEMBAHAGIAN SEL", "Isu Pembahagian Sel Terhadap Kesihatan Manusia", "Pembahagian Sel"),
 ],
 },
 ],
 },
 {
 id: "F4_B7",
 tingkatan: "Tingkatan 4",
 nomborBab: 7,
 tema: "Asas Biologi",
 tajuk: "Respirasi Sel",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Respirasi Sel.",
 skList: [
 {
 kod: "7.1",
 tajuk: "Penghasilan Tenaga melalui Respirasi Sel",
 spList: [
 makeBmSp("7.1.1", "Mewajarkan keperluan tenaga dalam proses metabolisme.", "Penghasilan Tenaga melalui Respirasi Sel", "Respirasi Sel"),
 makeBmSp("7.1.2", "Mengenal pasti substrat utama dalam penghasilan tenaga.", "Penghasilan Tenaga melalui Respirasi Sel", "Respirasi Sel"),
 makeBmSp("7.1.3", "Menyenaraikan jenis respirasi sel: (i) respirasi aerob. (ii) respirasi anaerob. (iii) fermentasi.", "Penghasilan Tenaga melalui Respirasi Sel", "Respirasi Sel"),
 ],
 },
 {
 kod: "7.2",
 tajuk: "Respirasi Aerob",
 spList: [
 makeBmSp("7.2.1", "Mengkonsepsikan penghasilan tenaga daripada glukosa semasa respirasi aerob dalam sel.", "Respirasi Aerob", "Respirasi Sel"),
 makeBmSp("7.2.2", "Menulis persamaan perkataan bagi respirasi aerob dalam sel.", "Respirasi Aerob", "Respirasi Sel"),
 makeBmSp("7.2.3", "Mengeksperimen untuk mengkaji proses respirasi aerob.", "Respirasi Aerob", "Respirasi Sel"),
 ],
 },
 {
 kod: "7.3",
 tajuk: "Fermentasi",
 spList: [
 makeBmSp("7.3.1", "Menyatakan faktor yang menyebabkan fermentasi berlaku dalam sel.", "Fermentasi", "Respirasi Sel"),
 makeBmSp("7.3.2", "Menjelaskan dengan contoh penghasilan tenaga daripada glukosa semasa fermentasi dalam: (i) sel otot manusia. (ii) Lactobacillus. (iii) yis. (iv) tumbuhan seperti padi.", "Fermentasi", "Respirasi Sel"),
 makeBmSp("7.3.3", "Menulis dan menerangkan persamaan perkataan: (i) fermentasi asid laktik. (ii) fermentasi alkohol.", "Fermentasi", "Respirasi Sel"),
 makeBmSp("7.3.4", "Mengeksperimen untuk mengkaji fermentasi yis.", "Fermentasi", "Respirasi Sel"),
 makeBmSp("7.3.5", "Membanding dan membezakan antara respirasi aerob dengan fermentasi.", "Fermentasi", "Respirasi Sel"),
 ],
 },
 ],
 },
 {
 id: "F4_B8",
 tingkatan: "Tingkatan 4",
 nomborBab: 8,
 tema: "Fisiologi Manusia dan Haiwan",
 tajuk: "Sistem Respirasi dalam Manusia dan Haiwan",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Sistem Respirasi dalam Manusia dan Haiwan.",
 skList: [
 {
 kod: "8.1",
 tajuk: "Jenis Sistem Respirasi",
 spList: [
 makeBmSp("8.1.1", "Mengenal pasti struktur respirasi dalam: (i) serangga. (ii) ikan. (iii) amfibia. (iv) manusia.", "Jenis Sistem Respirasi", "Sistem Respirasi dalam Manusia dan Haiwan"),
 makeBmSp("8.1.2", "Memerihalkan penyesuaian struktur respirasi dan fungsinya dalam pertukaran gas bagi: (i) haiwan. (ii) manusia.", "Jenis Sistem Respirasi", "Sistem Respirasi dalam Manusia dan Haiwan"),
 makeBmSp("8.1.3", "Membanding dan membezakan antara struktur respirasi manusia dengan haiwan.", "Jenis Sistem Respirasi", "Sistem Respirasi dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "8.2",
 tajuk: "Mekanisme Pernafasan",
 spList: [
 makeBmSp("8.2.1", "Membanding dan membezakan antara mekanisme pernafasan dalam manusia dengan haiwan.", "Mekanisme Pernafasan", "Sistem Respirasi dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "8.3",
 tajuk: "Pertukaran Gas dalam Manusia",
 spList: [
 makeBmSp("8.3.1", "Berkomunikasi tentang respirasi luar dan respirasi dalam: (i) pertukaran gas antara peparu dengan darah. (ii) pengangkutan gas respirasi dari peparu ke tisu. (iii) pertukaran gas antara darah dengan tisu. (iv) pengangkutan gas respirasi dari tisu ke peparu.", "Pertukaran Gas dalam Manusia", "Sistem Respirasi dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "8.4",
 tajuk: "Isu Kesihatan Berkaitan Sistem Respirasi Manusia",
 spList: [
 makeBmSp("8.4.1", "Bercerita tentang kesan Chronic Obstructive Pulmonary Disease (COPD) terhadap sistem respirasi manusia: (i) asma. (ii) bronkitis kronik. (iii) emfisema. SISTEM RESPIRASI DALAM MANUSIA DAN HAIWAN", "Isu Kesihatan Berkaitan Sistem Respirasi Manusia", "Sistem Respirasi dalam Manusia dan Haiwan"),
 ],
 },
 ],
 },
 {
 id: "F4_B9",
 tingkatan: "Tingkatan 4",
 nomborBab: 9,
 tema: "Fisiologi Manusia dan Haiwan",
 tajuk: "Nutrisi dan Sistem Pencernaan Manusia",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Nutrisi dan Sistem Pencernaan Manusia.",
 skList: [
 {
 kod: "9.1",
 tajuk: "Sistem Pencernaan",
 spList: [
 makeBmSp("9.1.1", "Mengenal pasti struktur sistem pencernaan manusia.", "Sistem Pencernaan", "Nutrisi dan Sistem Pencernaan Manusia"),
 ],
 },
 {
 kod: "9.2",
 tajuk: "Pencernaan",
 spList: [
 makeBmSp("9.2.1", "Memerihalkan jenis pencernaan: (i) pencernaan fizikal. (ii) pencernaan kimia.", "Pencernaan", "Nutrisi dan Sistem Pencernaan Manusia"),
 makeBmSp("9.2.2", "Mencerakinkan proses dan hasil pencernaan karbohidrat dalam mulut.", "Pencernaan", "Nutrisi dan Sistem Pencernaan Manusia"),
 makeBmSp("9.2.3", "Mencerakinkan proses dan hasil pencernaan protein dalam perut.", "Pencernaan", "Nutrisi dan Sistem Pencernaan Manusia"),
 makeBmSp("9.2.4", "Memerihalkan pencernaan karbohidrat, protein dan lipid dalam usus kecil.", "Pencernaan", "Nutrisi dan Sistem Pencernaan Manusia"),
 makeBmSp("9.2.5", "Mengeksperimen untuk mengkaji pencernaan kanji, protein dan lipid dalam sampel makanan.", "Pencernaan", "Nutrisi dan Sistem Pencernaan Manusia"),
 ],
 },
 {
 kod: "9.3",
 tajuk: "Penyerapan",
 spList: [
 makeBmSp("9.3.1", "Mengenal pasti struktur vilus dalam ileum.", "Penyerapan", "Nutrisi dan Sistem Pencernaan Manusia"),
 makeBmSp("9.3.2", "Berkomunikasi tentang penyesuaian ileum dan vilus dalam penyerapan makanan tercerna.", "Penyerapan", "Nutrisi dan Sistem Pencernaan Manusia"),
 ],
 },
 {
 kod: "9.4",
 tajuk: "Asimilasi",
 spList: [
 makeBmSp("9.4.1", "Memerihalkan peranan sistem peredaran dalam asimilasi makanan tercerna.", "Asimilasi", "Nutrisi dan Sistem Pencernaan Manusia"),
 makeBmSp("9.4.2", "Membincangkan fungsi hati dalam asimilasi makanan tercerna: (i) metabolisme makanan tercerna (karbohidrat dan protein). (ii) penyimpanan nutrien. (iii) penyahtoksinan.", "Asimilasi", "Nutrisi dan Sistem Pencernaan Manusia"),
 ],
 },
 {
 kod: "9.5",
 tajuk: "Penyahtinjaan",
 spList: [
 makeBmSp("9.5.1", "Menerangkan fungsi usus besar: (i) penyerapan air dan vitamin. (ii) pembentukan tinja.", "Penyahtinjaan", "Nutrisi dan Sistem Pencernaan Manusia"),
 ],
 },
 {
 kod: "9.6",
 tajuk: "Gizi Seimbang",
 spList: [
 makeBmSp("9.6.1", "Mengeksperimen untuk mengkaji nilai tenaga dalam sampel makanan .", "Gizi Seimbang", "Nutrisi dan Sistem Pencernaan Manusia"),
 makeBmSp("9.6.2", "Mengeksperimen untuk menentukan kandungan vitamin C dalam jus buah- buahan atau jus sayur-sayuran.", "Gizi Seimbang", "Nutrisi dan Sistem Pencernaan Manusia"),
 makeBmSp("9.6.3", "Mewajarkan pengubahsuaian diet bagi individu yang: (i) mengalami obesiti. (ii) menghidap penyakit tertentu: - diabetes mellitus. - kardiovaskular. - kanser.", "Gizi Seimbang", "Nutrisi dan Sistem Pencernaan Manusia"),
 ],
 },
 {
 kod: "9.7",
 tajuk: "Isu Kesihatan Berkaitan Sistem Pencernaan dan Tabiat Pemakanan",
 spList: [
 makeBmSp("9.7.1", "Meramalkan kesan mengubahsuai organ pencernaan terhadap kesihatan manusia.", "Isu Kesihatan Berkaitan Sistem Pencernaan dan Tabiat Pemakanan", "Nutrisi dan Sistem Pencernaan Manusia"),
 makeBmSp("9.7.2", "Merangkakan isu-isu kesihatan berkaitan penyahtinjaan.", "Isu Kesihatan Berkaitan Sistem Pencernaan dan Tabiat Pemakanan", "Nutrisi dan Sistem Pencernaan Manusia"),
 makeBmSp("9.7.3", "Menghubungkaitkan isu kesihatan yang berkaitan tabiat pemakanan. NUTRISI DAN SISTEM PENCERNAAN MANUSIA", "Isu Kesihatan Berkaitan Sistem Pencernaan dan Tabiat Pemakanan", "Nutrisi dan Sistem Pencernaan Manusia"),
 ],
 },
 ],
 },
 {
 id: "F4_B10",
 tingkatan: "Tingkatan 4",
 nomborBab: 10,
 tema: "Fisiologi Manusia dan Haiwan",
 tajuk: "Pengangkutan dalam Manusia dan Haiwan",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Pengangkutan dalam Manusia dan Haiwan.",
 skList: [
 {
 kod: "10.1",
 tajuk: "Jenis Sistem Peredaran",
 spList: [
 makeBmSp("10.1.1", "Mewajarkan keperluan sistem pengangkutan dalam organisma multisel kompleks.", "Jenis Sistem Peredaran", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.1.2", "Mengenal pasti bahan yang diangkut oleh sistem pengangkutan: (i) bahan keperluan sel. (ii) bahan buangan sel.", "Jenis Sistem Peredaran", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.1.3", "Mengkonsepsikan jenis sistem peredaran dalam organisma multisel: (i) terbuka. (ii) tertutup.", "Jenis Sistem Peredaran", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.1.4", "Membanding dan membezakan antara sistem peredaran dalam organisma multisel: (i) serangga. (ii) ikan. (iii) amfibia. (iv) manusia.", "Jenis Sistem Peredaran", "Pengangkutan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "10.2",
 tajuk: "Sistem Peredaran Manusia",
 spList: [
 makeBmSp("10.2.1", "Memerihalkan komponen sistem peredaran manusia: (i) jantung. (ii) salur darah. (iii) darah.", "Sistem Peredaran Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.2.2", "Menerangkan komposisi darah: (i) plasma. (ii) sel darah.", "Sistem Peredaran Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.2.3", "Membanding dan membezakan antara jenis salur darah: (i) arteri. (ii) vena. (iii) kapilari.", "Sistem Peredaran Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.2.4", "Melabel struktur jantung manusia dan salur darah berkaitan: (i) aorta. (ii) vena kava. (iii) arteri pulmonari dan vena pulmonari. (iv) arteri koronari dan vena koronari. (v) injap sabit. (vi) injap bikuspid dan injap trikuspid. (vii) septum.", "Sistem Peredaran Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.2.5", "Memerihalkan fungsi bahagian jantung.", "Sistem Peredaran Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "10.3",
 tajuk: "Mekanisme Denyutan Jantung",
 spList: [
 makeBmSp("10.3.1", "Memerihalkan mekanisme denyutan jantung manusia: (i) nodus sinoatrium (perentak jantung). (ii) nodus atrioventrikel. (iii) berkas His. (iv) gentian Purkinje.", "Mekanisme Denyutan Jantung", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.3.2", "Berkomunikasi tentang daya yang menyebabkan peredaran darah dalam manusia: (i) pengepaman jantung. (ii) pengecutan otot rangka.", "Mekanisme Denyutan Jantung", "Pengangkutan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "10.4",
 tajuk: "Mekanisme Pembekuan Darah",
 spList: [
 makeBmSp("10.4.1", "Mewajarkan keperluan mekanisme pembekuan darah.", "Mekanisme Pembekuan Darah", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.4.2", "Memerihalkan mekanisme pembekuan darah.", "Mekanisme Pembekuan Darah", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.4.3", "Memerihalkan isu kesihatan yang berkaitan dengan pembekuan darah: (i) trombosis. (ii) embolisme. (iii) hemofilia.", "Mekanisme Pembekuan Darah", "Pengangkutan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "10.5",
 tajuk: "Kumpulan Darah Manusia",
 spList: [
 makeBmSp("10.5.1", "Memerihalkan kumpulan darah ABO.", "Kumpulan Darah Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.5.2", "Menghubung kait kumpulan darah ABO dengan pendermaan darah.", "Kumpulan Darah Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.5.3", "Memerihalkan faktor Rhesus.", "Kumpulan Darah Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.5.4", "Menaakul faktor Rhesus yang tidak sepadan terhadap kehamilan.", "Kumpulan Darah Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "10.6",
 tajuk: "Isu Kesihatan Berkaitan Sistem Peredaran Darah Manusia",
 spList: [
 makeBmSp("10.6.1", "Mewajarkan keperluan sistem peredaran yang sihat.", "Isu Kesihatan Berkaitan Sistem Peredaran Darah Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.6.2", "Berkomunikasi tentang penyakit kardiovaskular.", "Isu Kesihatan Berkaitan Sistem Peredaran Darah Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "10.7",
 tajuk: "Sistem Limfa Manusia",
 spList: [
 makeBmSp("10.7.1", "Mensintesis proses pembentukan bendalir tisu dan limfa.", "Sistem Limfa Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.7.2", "Membanding dan membezakan antara kandungan limfa dengan: (i) bendalir tisu. (ii) darah.", "Sistem Limfa Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.7.3", "Menghuraikan komponen sistem limfa: (i) limfa. (ii) kapilari limfa. (iii) salur limfa. (iv) nodus limfa. (v) organ limfa.", "Sistem Limfa Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 makeBmSp("10.7.4", "Mewajarkan keperluan sistem limfa: (i) pelengkap kepada sistem peredaran darah. (ii) pengangkutan bahan larut lemak. (iii) pertahanan badan.", "Sistem Limfa Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "10.8",
 tajuk: "Isu Kesihatan Berkaitan Sistem Limfa Manusia",
 spList: [
 makeBmSp("10.8.1", "Memerihalkan isu kesihatan berkaitan sistem limfa. PENGANGKUTAN DALAM MANUSIA DAN HAIWAN", "Isu Kesihatan Berkaitan Sistem Limfa Manusia", "Pengangkutan dalam Manusia dan Haiwan"),
 ],
 },
 ],
 },
 {
 id: "F4_B11",
 tingkatan: "Tingkatan 4",
 nomborBab: 11,
 tema: "Fisiologi Manusia dan Haiwan",
 tajuk: "Keimunan Manusia",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Keimunan Manusia.",
 skList: [
 {
 kod: "11.1",
 tajuk: "Pertahanan Badan",
 spList: [
 makeBmSp("11.1.1", "Mendefinisikan: (i) keimunan. (ii) antigen. (iii) antibodi.", "Pertahanan Badan", "Keimunan Manusia"),
 makeBmSp("11.1.2", "Memerihalkan tiga barisan pertahanan manusia: (i) barisan pertahanan pertama. - fizikal. - kimia. (ii) barisan pertahanan kedua. - demam. - keradangan. - fagositosis. (iii) barisan pertahanan ketiga. - antibodi. - sel memori.", "Pertahanan Badan", "Keimunan Manusia"),
 ],
 },
 {
 kod: "11.2",
 tajuk: "Tindakan Antibodi",
 spList: [
 makeBmSp("11.2.1", "Menjelaskan tindakan antibodi terhadap antigen asing: (i) peneutralan. (ii) pengaglutinan. (iii) pemendakan. (iv) pengopsoninan. (v) penguraian.", "Tindakan Antibodi", "Keimunan Manusia"),
 ],
 },
 {
 kod: "11.3",
 tajuk: "Jenis Keimunan",
 spList: [
 makeBmSp("11.3.1", "Berkomunikasi tentang jenis-jenis keimunan: (i) keimunan pasif. (ii) keimunan aktif.", "Jenis Keimunan", "Keimunan Manusia"),
 makeBmSp("11.3.2", "Membanding dan membezakan antara keimunan pasif dengan keimunan aktif.", "Jenis Keimunan", "Keimunan Manusia"),
 ],
 },
 {
 kod: "11.4",
 tajuk: "Isu Kesihatan Berkaitan Keimunan",
 spList: [
 makeBmSp("11.4.1", "Memerihalkan isu kesihatan berkaitan Acquired Immuno Deficiency Syndrome (AIDS). KEIMUNAN MANUSIA", "Isu Kesihatan Berkaitan Keimunan", "Keimunan Manusia"),
 ],
 },
 ],
 },
 {
 id: "F4_B12",
 tingkatan: "Tingkatan 4",
 nomborBab: 12,
 tema: "Fisiologi Manusia dan Haiwan",
 tajuk: "Koordinasi dan Gerak Balas dalam Manusia",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Koordinasi dan Gerak Balas dalam Manusia.",
 skList: [
 {
 kod: "12.1",
 tajuk: "Koordinasi dan Gerak Balas",
 spList: [
 makeBmSp("12.1.1", "Membuat urutan dan memerihalkan komponen dalam koordinasi manusia: (i) rangsangan. (ii) reseptor. (iii) pusat integrasi. (iv) efektor. (v) gerak balas.", "Koordinasi dan Gerak Balas", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.1.2", "Mengenal pasti dan memerihalkan rangsangan luar dan rangsangan dalam.", "Koordinasi dan Gerak Balas", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.1.3", "Menyenaraikan jenis reseptor deria berdasarkan rangsangan yang terlibat: (i) kemoreseptor. (ii) mekanoreseptor. (iii) fotoreseptor. (iv) termoreseptor. (v) baroreseptor. (vi) nosireseptor.", "Koordinasi dan Gerak Balas", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.1.4", "Mewajarkan keperluan bergerak balas terhadap rangsangan luar dan rangsangan dalam.", "Koordinasi dan Gerak Balas", "Koordinasi dan Gerak Balas dalam Manusia"),
 ],
 },
 {
 kod: "12.2",
 tajuk: "Sistem Saraf",
 spList: [
 makeBmSp("12.2.1", "Membina carta organisasi dan menerangkan struktur sistem saraf manusia: (i) sistem saraf pusat. - otak. - saraf tunjang. (ii) sistem saraf periferi. - reseptor deria. - saraf kranium. - saraf spina.", "Sistem Saraf", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.2.2", "Menerangkan fungsi bahagian sistem saraf pusat dalam koordinasi dan gerak balas: (i) otak. - serebrum. - serebelum. - medula oblongata. - hipotalamus. - kelenjar pituitari. (ii) saraf tunjang.", "Sistem Saraf", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.2.3", "Berkomunikasi tentang fungsi bahagian sistem saraf periferi dalam koordinasi dan gerak balas.", "Sistem Saraf", "Koordinasi dan Gerak Balas dalam Manusia"),
 ],
 },
 {
 kod: "12.3",
 tajuk: "Neuron dan Sinaps",
 spList: [
 makeBmSp("12.3.1", "Melukis dan melabel struktur neuron deria dan neuron motor: (i) dendrit. (ii) akson. (iii) badan sel. (iv) salut mielin. (v) nodus Ranvier.", "Neuron dan Sinaps", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.3.2", "Mencerakinkan fungsi setiap jenis neuron dalam penghantaran impuls.", "Neuron dan Sinaps", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.3.3", "Menjelaskan struktur sinaps dan fungsinya.", "Neuron dan Sinaps", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.3.4", "Menerangkan penghantaran impuls merentasi sinaps.", "Neuron dan Sinaps", "Koordinasi dan Gerak Balas dalam Manusia"),
 ],
 },
 {
 kod: "12.4",
 tajuk: "Tindakan Terkawal dan Tindakan Luar Kawal",
 spList: [
 makeBmSp("12.4.1", "Membanding dan membezakan antara tindakan terkawal dengan tindakan luar kawal.", "Tindakan Terkawal dan Tindakan Luar Kawal", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.4.2", "Memerihalkan tindakan refleks yang melibatkan: (i) dua neuron. (ii) tiga neuron.", "Tindakan Terkawal dan Tindakan Luar Kawal", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.4.3", "Melukis arka refleks.", "Tindakan Terkawal dan Tindakan Luar Kawal", "Koordinasi dan Gerak Balas dalam Manusia"),
 ],
 },
 {
 kod: "12.5",
 tajuk: "Isu Kesihatan Berkaitan Sistem Saraf",
 spList: [
 makeBmSp("12.5.1", "Berkomunikasi tentang isu kesihatan yang berkaitan dengan sistem saraf.", "Isu Kesihatan Berkaitan Sistem Saraf", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.5.2", "Memerihalkan kesan penyalahgunaan dadah dan alkohol terhadap koordinasi dan gerak balas manusia.", "Isu Kesihatan Berkaitan Sistem Saraf", "Koordinasi dan Gerak Balas dalam Manusia"),
 ],
 },
 {
 kod: "12.6",
 tajuk: "Sistem Endokrin",
 spList: [
 makeBmSp("12.6.1", "Menyatakan peranan kelenjar endokrin dalam manusia.", "Sistem Endokrin", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.6.2", "Mengenal pasti dan melabel kelenjar endokrin dalam manusia.", "Sistem Endokrin", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.6.3", "Mencerakinkan fungsi hormon yang dirembeskan oleh setiap jenis kelenjar endokrin: (i) hipotalamus. - hormon perembes gonadotrofin (GnRH). (ii) lobus anterior pituitari. - hormon pertumbuhan (GH). - hormon perangsang folikel (FSH). - hormon peluteinan (LH). - hormon perangsang tiroid (TSH). - hormon adrenokortikotrof (ACTH).", "Sistem Endokrin", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.6.4", "Membincangkan penglibatan sistem saraf dan sistem endokrin dalam situasi cemas.", "Sistem Endokrin", "Koordinasi dan Gerak Balas dalam Manusia"),
 makeBmSp("12.6.5", "Membanding dan membezakan antara sistem saraf dengan sistem endokrin.", "Sistem Endokrin", "Koordinasi dan Gerak Balas dalam Manusia"),
 ],
 },
 {
 kod: "12.7",
 tajuk: "Isu Kesihatan Berkaitan Sistem Endokrin",
 spList: [
 makeBmSp("12.7.1", "Meramalkan kesan ketidakseimbangan hormon terhadap kesihatan manusia. KOORDINASI DAN GERAK BALAS DALAM MANUSIA", "Isu Kesihatan Berkaitan Sistem Endokrin", "Koordinasi dan Gerak Balas dalam Manusia"),
 ],
 },
 ],
 },
 {
 id: "F4_B13",
 tingkatan: "Tingkatan 4",
 nomborBab: 13,
 tema: "Fisiologi Manusia dan Haiwan",
 tajuk: "Homeostasis dan Sistem Urinari Manusia",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Homeostasis dan Sistem Urinari Manusia.",
 skList: [
 {
 kod: "13.1",
 tajuk: "Homeostasis",
 spList: [
 makeBmSp("13.1.1", "Menerangkan maksud homeostasis.", "Homeostasis", "Homeostasis dan Sistem Urinari Manusia"),
 makeBmSp("13.1.2", "Mewajarkan keperluan untuk mengekalkan faktor fizikal dan faktor kimia persekitaran dalam.", "Homeostasis", "Homeostasis dan Sistem Urinari Manusia"),
 makeBmSp("13.1.3", "Memerihalkan penglibatan pelbagai jenis sistem organ untuk mengekalkan persekitaran dalam yang optimum.", "Homeostasis", "Homeostasis dan Sistem Urinari Manusia"),
 makeBmSp("13.1.4", "Mengaplikasikan pengetahuan tentang konsep homeostasis dalam pengawalaturan: (i) suhu badan. (ii) aras gula darah. (iii) tekanan separa karbon dioksida. (iv) tekanan darah.", "Homeostasis", "Homeostasis dan Sistem Urinari Manusia"),
 ],
 },
 {
 kod: "13.2",
 tajuk: "Sistem Urinari",
 spList: [
 makeBmSp("13.2.1", "Mengenal pasti struktur dan fungsi ginjal.", "Sistem Urinari", "Homeostasis dan Sistem Urinari Manusia"),
 makeBmSp("13.2.2", "Melukis, melabel dan menerangkan struktur nefron dan tubul pengumpul.", "Sistem Urinari", "Homeostasis dan Sistem Urinari Manusia"),
 makeBmSp("13.2.3", "Memerihalkan proses pembentukan air kencing: (i) ultraturasan. (ii) penyerapan semula. (iii) rembesan.", "Sistem Urinari", "Homeostasis dan Sistem Urinari Manusia"),
 makeBmSp("13.2.4", "Mensintesiskan konsep homeostasis dengan konsep suap balik negatif dalam pengosmokawalaturan.", "Sistem Urinari", "Homeostasis dan Sistem Urinari Manusia"),
 makeBmSp("13.2.5", "Mengeksperimen untuk mengkaji kesan pengambilan isipadu air yang berbeza terhadap pembentukan air kencing.", "Sistem Urinari", "Homeostasis dan Sistem Urinari Manusia"),
 ],
 },
 {
 kod: "13.3",
 tajuk: "Isu Kesihatan Berkaitan Sistem Urinari",
 spList: [
 makeBmSp("13.3.1", "Memerihalkan isu kesihatan yang berkaitan dengan sistem urinari.", "Isu Kesihatan Berkaitan Sistem Urinari", "Homeostasis dan Sistem Urinari Manusia"),
 ],
 },
 ],
 },
 {
 id: "F4_B14",
 tingkatan: "Tingkatan 4",
 nomborBab: 14,
 tema: "Fisiologi Manusia dan Haiwan",
 tajuk: "Sokongan dan Pergerakan dalam Manusia dan Haiwan",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Sokongan dan Pergerakan dalam Manusia dan Haiwan.",
 skList: [
 {
 kod: "14.1",
 tajuk: "Jenis Rangka",
 spList: [
 makeBmSp("14.1.1", "Menyenaraikan jenis rangka dalam manusia dan haiwan: (i) rangka hidrostatik. (ii) rangka luar. (iii) rangka dalam.", "Jenis Rangka", "Sokongan dan Pergerakan dalam Manusia dan Haiwan"),
 makeBmSp("14.1.2", "Mewajarkan keperluan rangka pada manusia dan haiwan.", "Jenis Rangka", "Sokongan dan Pergerakan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "14.2",
 tajuk: "Sistem Otot Rangka Manusia",
 spList: [
 makeBmSp("14.2.1", "Mengenal pasti tulang yang membentuk sistem rangka manusia: (i) rangka paksi. (ii) rangka apendaj.", "Sistem Otot Rangka Manusia", "Sokongan dan Pergerakan dalam Manusia dan Haiwan"),
 makeBmSp("14.2.2", "Mencirikan jenis vertebra dalam tulang belakang: (i) vertebra serviks (termasuk atlas dan axis). (ii) vertebra toraks. (iii) vertebra lumbar. (iv) vertebra sakrum. (v) vertebra kaudal.", "Sistem Otot Rangka Manusia", "Sokongan dan Pergerakan dalam Manusia dan Haiwan"),
 makeBmSp("14.2.3", "Membanding dan membezakan antara jenis vertebra.", "Sistem Otot Rangka Manusia", "Sokongan dan Pergerakan dalam Manusia dan Haiwan"),
 makeBmSp("14.2.4", "Menyatakan jenis sendi dalam sistem rangka manusia: (i) sendi tidak bergerak. (ii) sendi bergerak sedikit. (iii) sendi bebas bergerak.", "Sistem Otot Rangka Manusia", "Sokongan dan Pergerakan dalam Manusia dan Haiwan"),
 makeBmSp("14.2.5", "Melukis, melabel dan menerangkan struktur sendi engsel lengan manusia: (i) tulang. (ii) rawan. (iii) otot rangka. (iv) tendon. (v) ligamen. (vi) membran sinovia. (vii) bendalir sinovia.", "Sistem Otot Rangka Manusia", "Sokongan dan Pergerakan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "14.3",
 tajuk: "Mekanisme Pergerakan dan Gerak alih.",
 spList: [
 makeBmSp("14.3.1", "Menerangkan mekanisme pergerakan pada: (i) lengan manusia. (ii) kaki manusia(berjalan).", "Mekanisme Pergerakan dan Gerak alih.", "Sokongan dan Pergerakan dalam Manusia dan Haiwan"),
 makeBmSp("14.3.2", "Memerihalkan secara ringkas mekanisme gerak alih haiwan.", "Mekanisme Pergerakan dan Gerak alih.", "Sokongan dan Pergerakan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "14.4",
 tajuk: "Isu Kesihatan Berkaitan Sistem Otot Rangka Manusia",
 spList: [
 makeBmSp("14.4.1", "Memerihalkan isu kesihatan yang berkaitan dengan sistem otot rangka manusia: (i) osteoporosis. (ii) osteomalasia. (iii) rikets. (iv) artritis. (v) skoliosis.", "Isu Kesihatan Berkaitan Sistem Otot Rangka Manusia", "Sokongan dan Pergerakan dalam Manusia dan Haiwan"),
 makeBmSp("14.4.2", "Mewajarkan amalan untuk menjaga kesihatan sistem otot rangka. SOKONGAN DAN PERGERAKAN DALAM MANUSIA DAN HAIWAN", "Isu Kesihatan Berkaitan Sistem Otot Rangka Manusia", "Sokongan dan Pergerakan dalam Manusia dan Haiwan"),
 ],
 },
 ],
 },
 {
 id: "F4_B15",
 tingkatan: "Tingkatan 4",
 nomborBab: 15,
 tema: "Fisiologi Manusia dan Haiwan",
 tajuk: "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan.",
 skList: [
 {
 kod: "15.1",
 tajuk: "Sistem Pembiakan Manusia",
 spList: [
 makeBmSp("15.1.1", "Mencirikan anatomi: (i) sistem pembiakan lelaki. (ii) sistem pembiakan wanita.", "Sistem Pembiakan Manusia", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "15.2",
 tajuk: "Gametogenesis Manusia",
 spList: [
 makeBmSp("15.2.1", "Mewajarkan keperluan gametogenesis.", "Gametogenesis Manusia", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.2.2", "Memerihalkan pembentukan gamet: (i) spermatogenesis. (ii) oogenesis.", "Gametogenesis Manusia", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.2.3", "Mengenal pasti struktur: (i) sperma. - kepala. - bahagian tengah. - ekor. (ii) folikel Graaf. - oosit sekunder. - sel folikel.", "Gametogenesis Manusia", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.2.4", "Membanding dan membezakan antara spermatogenesis dengan oogenesis.", "Gametogenesis Manusia", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "15.3",
 tajuk: "Kitar Haid",
 spList: [
 makeBmSp("15.3.1", "Menganalisis perubahan aras hormon yang terlibat semasa: (i) haid. (ii) perkembangan folikel. (iii) penebalan endometrium. (iv) ovulasi. (v) pembentukan korpus luteum.", "Kitar Haid", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.3.2", "Menghubung kait perubahan aras hormon yang terlibat dengan: (i) kehamilan. (ii) keguguran.", "Kitar Haid", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.3.3", "Menyatakan maksud sindrom prahaid dan sindrom putus haid.", "Kitar Haid", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "15.4",
 tajuk: "Perkembangan Fetus Manusia",
 spList: [
 makeBmSp("15.4.1", "Menghuraikan proses persenyawaan dan pembentukan zigot.", "Perkembangan Fetus Manusia", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.4.2", "Membuat urutan dan menerangkan perkembangan awal embrio sehingga penempelan: (i) embrio dua sel. (ii) morula. (iii) blastosista.", "Perkembangan Fetus Manusia", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.4.3", "Menerangkan peranan hormon gonadotropin korion manusia (HCG) pada peringkat awal kehamilan.", "Perkembangan Fetus Manusia", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.4.4", "Berkomunikasi tentang peranan struktur berikut dalam perkembangan fetus: (i) plasenta. (ii) tali pusat.", "Perkembangan Fetus Manusia", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.4.5", "Mewajarkan keperluan sistem peredaran darah fetus dan sistem peredaran darah ibu yang berasingan.", "Perkembangan Fetus Manusia", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "15.5",
 tajuk: "Pembentukan Kembar",
 spList: [
 makeBmSp("15.5.1", "Memerihalkan proses pembentukan kembar: (i) kembar seiras. (ii) kembar tak seiras.", "Pembentukan Kembar", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.5.2", "Membanding dan membezakan antara kembar seiras dengan kembar tak seiras.", "Pembentukan Kembar", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.5.3", "Menghubung kait pembahagian sel dengan pembentukan kembar Siam.", "Pembentukan Kembar", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "15.6",
 tajuk: "Isu Kesihatan Berkaitan Sistem Pembiakan Manusia",
 spList: [
 makeBmSp("15.6.1", "Menyatakan maksud kemandulan.", "Isu Kesihatan Berkaitan Sistem Pembiakan Manusia", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.6.2", "Berkomunikasi tentang punca kemandulan manusia.", "Isu Kesihatan Berkaitan Sistem Pembiakan Manusia", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 ],
 },
 {
 kod: "15.7",
 tajuk: "Pertumbuhan dalam Manusia dan Haiwan",
 spList: [
 makeBmSp("15.7.1", "Menerangkan maksud pertumbuhan organisma.", "Pertumbuhan dalam Manusia dan Haiwan", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.7.2", "Menentukan parameter untuk mengukur pertumbuhan manusia dan haiwan.", "Pertumbuhan dalam Manusia dan Haiwan", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.7.3", "Memerihalkan pertumbuhan serangga: (i) metamorfosis lengkap. (ii) metamorfosis tidak lengkap.", "Pertumbuhan dalam Manusia dan Haiwan", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.7.4", "Menganalisis fasa pertumbuhan dalam lengkung pertumbuhan sigmoid manusia dan haiwan.", "Pertumbuhan dalam Manusia dan Haiwan", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 makeBmSp("15.7.5", "Mencerakinkan lengkung pertumbuhan berbentuk tangga bagi haiwan berangka luar. PEMBIAKAN SEKS, PERKEMBANGAN DAN PERTUMBUHAN DALAM MANUSIA DAN HAIWAN", "Pertumbuhan dalam Manusia dan Haiwan", "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan"),
 ],
 },
 ],
 },
];