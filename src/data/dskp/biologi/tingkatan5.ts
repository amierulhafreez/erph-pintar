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

export const DSKP_F5: BabBiologi[] = [
 {
 id: "F5_B16",
 tingkatan: "Tingkatan 5",
 nomborBab: 16,
 tema: "Fisiologi Tumbuhan Berbunga",
 tajuk: "Organisasi Tisu Tumbuhan dan Pertumbuhan",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Organisasi Tisu Tumbuhan dan Pertumbuhan.",
 skList: [
 {
 kod: "16.1",
 tajuk: "Organisasi Tisu Tumbuhan",
 spList: [
 makeBmSp("16.1.1", "Berkomunikasi tentang jenis tisu tumbuhan dan fungsi utamanya.", "Organisasi Tisu Tumbuhan", "Organisasi Tisu Tumbuhan dan Pertumbuhan"),
 ],
 },
 {
 kod: "16.2",
 tajuk: "Tisu Meristem dan Pertumbuhan",
 spList: [
 makeBmSp("16.2.1", "Mengenal pasti jenis dan bahagia dan tisu yang terlibat dalam pertumbuhan.", "Tisu Meristem dan Pertumbuhan", "Organisasi Tisu Tumbuhan dan Pertumbuhan"),
 makeBmSp("16.2.2", "Menghuraikan kedudukan zon pembahagian sel, zon pemanjangan sel dan zon pembezaan sel dalam pucuk dan akar.", "Tisu Meristem dan Pertumbuhan", "Organisasi Tisu Tumbuhan dan Pertumbuhan"),
 makeBmSp("16.2.3", "Mengenal pasti zon pembahagian sel, zon pemanjangan sel dan zon pembezaan sel dalam radikel anak benih.", "Tisu Meristem dan Pertumbuhan", "Organisasi Tisu Tumbuhan dan Pertumbuhan"),
 makeBmSp("16.2.4", "Memerihalkan jenis pertumbuhan: (i) primer. (ii) sekunder.", "Tisu Meristem dan Pertumbuhan", "Organisasi Tisu Tumbuhan dan Pertumbuhan"),
 makeBmSp("16.2.5", "Mewajarkan kepentingan pertumbuhan primer dan pertumbuhan sekunder.", "Tisu Meristem dan Pertumbuhan", "Organisasi Tisu Tumbuhan dan Pertumbuhan"),
 makeBmSp("16.2.6", "Membanding dan membezakan antara pertumbuhan primer dengan pertumbuhan sekunder dalam tumbuhan eudikot.", "Tisu Meristem dan Pertumbuhan", "Organisasi Tisu Tumbuhan dan Pertumbuhan"),
 makeBmSp("16.2.7", "Menilai kepentingan tumbuhan yang mengalami pertumbuhan sekunder dari segi ekonomi.", "Tisu Meristem dan Pertumbuhan", "Organisasi Tisu Tumbuhan dan Pertumbuhan"),
 ],
 },
 {
 kod: "16.3",
 tajuk: "Lengkung Pertumbuhan",
 spList: [
 makeBmSp("16.3.1", "Memerihalkan jenis tumbuhan berdasarkan kitar hidup.", "Lengkung Pertumbuhan", "Organisasi Tisu Tumbuhan dan Pertumbuhan"),
 makeBmSp("16.3.2", "Mencerakinkan lengkung pertumbuhan: (i) tumbuhan semusim. (ii) tumbuhan dwimusim. (iii) tumbuhan saka.", "Lengkung Pertumbuhan", "Organisasi Tisu Tumbuhan dan Pertumbuhan"),
 makeBmSp("16.3.3", "Mengeksperimen untuk mengkaji lengkung pertumbuhan dalam tumbuhan. ORGANISASI TISU TUMBUHAN DAN PERTUMBUHAN", "Lengkung Pertumbuhan", "Organisasi Tisu Tumbuhan dan Pertumbuhan"),
 ],
 },
 ],
 },
 {
 id: "F5_B17",
 tingkatan: "Tingkatan 5",
 nomborBab: 17,
 tema: "Fisiologi Tumbuhan Berbunga",
 tajuk: "Struktur dan Fungsi Daun",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Struktur dan Fungsi Daun.",
 skList: [
 {
 kod: "17.1",
 tajuk: "Struktur Daun",
 spList: [
 makeBmSp("17.1.1", "Memerihalkan struktur luar daun: (i) lamina. (ii) petiol.", "Struktur Daun", "Struktur dan Fungsi Daun"),
 makeBmSp("17.1.2", "Mengenal pasti struktur dalaman lamina daun: (i) epidermis atas. (ii) mesofil palisad. (iii) mesofil berspan. (iv) epidermis bawah. (v) berkas vaskular.", "Struktur Daun", "Struktur dan Fungsi Daun"),
 ],
 },
 {
 kod: "17.2",
 tajuk: "Organ Utama Pertukaran Gas",
 spList: [
 makeBmSp("17.2.1", "Mewajarkan keperluan pertukaran gas dalam tumbuhan.", "Organ Utama Pertukaran Gas", "Struktur dan Fungsi Daun"),
 makeBmSp("17.2.2", "Menjelaskan mekanisme pembukaan dan penutupan stoma berdasarkan: (i) pengambilan ion kalium. (ii) perubahan kepekatan sukrosa.", "Organ Utama Pertukaran Gas", "Struktur dan Fungsi Daun"),
 makeBmSp("17.2.3", "Mengeksperimen untuk membandingkan taburan stoma pada epidermis atas dan epidermis bawah daun monokotiledon dan daun eudikot.", "Organ Utama Pertukaran Gas", "Struktur dan Fungsi Daun"),
 makeBmSp("17.2.4", "Meramalkan kesan kekurangan air dalam tumbuhan terhadap pembukaan dan penutupan stoma.", "Organ Utama Pertukaran Gas", "Struktur dan Fungsi Daun"),
 ],
 },
 {
 kod: "17.3",
 tajuk: "Organ Utama Transpirasi",
 spList: [
 makeBmSp("17.3.1", "Mewajarkan keperluan transpirasi dalam tumbuhan.", "Organ Utama Transpirasi", "Struktur dan Fungsi Daun"),
 makeBmSp("17.3.2", "Memerihalkan faktor persekitaran yang mempengaruhi kadar transpirasi: (i) keamatan cahaya. (ii) suhu. (iii) pergerakan udara. (iv) kelembapan relatif udara.", "Organ Utama Transpirasi", "Struktur dan Fungsi Daun"),
 makeBmSp("17.3.3", "Mengeksperimen untuk mengkaji kesan faktor persekitaran terhadap kadar transpirasi dengan menggunakan potometer.", "Organ Utama Transpirasi", "Struktur dan Fungsi Daun"),
 ],
 },
 {
 kod: "17.4",
 tajuk: "Organ Utama Fotosintesis",
 spList: [
 makeBmSp("17.4.1", "Mewajarkan keperluan fotosintesis dalam tumbuhan.", "Organ Utama Fotosintesis", "Struktur dan Fungsi Daun"),
 makeBmSp("17.4.2", "Menghubung kait penyesuaian struktur dalaman daun dengan fotosintesis.", "Organ Utama Fotosintesis", "Struktur dan Fungsi Daun"),
 makeBmSp("17.4.3", "Mengenal pasti struktur kloroplas: (i) granum. (ii) tilakoid. (iii) stroma.", "Organ Utama Fotosintesis", "Struktur dan Fungsi Daun"),
 makeBmSp("17.4.4", "Menghubung kait tindak balas bersandarkan cahaya dan tindak balas tidak bersandarkan cahaya dalam fotosintesis.", "Organ Utama Fotosintesis", "Struktur dan Fungsi Daun"),
 makeBmSp("17.4.5", "Menulis persamaan kimia bagi mewakili proses fotosintesis.", "Organ Utama Fotosintesis", "Struktur dan Fungsi Daun"),
 makeBmSp("17.4.6", "Membanding dan membezakan antara tindak balas bersandarkan cahaya dengan tindak balas tidak bersandarkan cahaya dalam fotosintesis.", "Organ Utama Fotosintesis", "Struktur dan Fungsi Daun"),
 makeBmSp("17.4.7", "Menerangkan faktor persekitaran yang mempengaruhi kadar fotosintesis: (i) keamatan cahaya. (ii) suhu. (iii) kepekatan karbon dioksida.", "Organ Utama Fotosintesis", "Struktur dan Fungsi Daun"),
 makeBmSp("17.4.8", "Mengeksperimen untuk mengkaji kesan faktor persekitaran terhadap kadar fotosintesis.", "Organ Utama Fotosintesis", "Struktur dan Fungsi Daun"),
 makeBmSp("17.4.9", "Menganalisis kesan perubahan keamatan cahaya dan warna cahaya terhadap kadar fotosintesis.", "Organ Utama Fotosintesis", "Struktur dan Fungsi Daun"),
 ],
 },
 {
 kod: "17.5",
 tajuk: "Titik Pampasan",
 spList: [
 makeBmSp("17.5.1", "Memerihalkan titik pampasan.", "Titik Pampasan", "Struktur dan Fungsi Daun"),
 makeBmSp("17.5.2", "Membanding dan membezakan antara fotosintesis dengan respirasi sel dalam tumbuhan.", "Titik Pampasan", "Struktur dan Fungsi Daun"),
 makeBmSp("17.5.3", "Menganalisis keamatan cahaya dan pencapaian titik pampasan dengan menggunakan graf.", "Titik Pampasan", "Struktur dan Fungsi Daun"),
 makeBmSp("17.5.4", "Meramalkan kesan kadar fotosintesis dan kadar respirasi sel yang kekal pada titik pampasan terhadap pertumbuhan dalam tumbuhan. STRUKTUR DAN FUNGSI DAUN", "Titik Pampasan", "Struktur dan Fungsi Daun"),
 ],
 },
 ],
 },
 {
 id: "F5_B18",
 tingkatan: "Tingkatan 5",
 nomborBab: 18,
 tema: "Fisiologi Tumbuhan Berbunga",
 tajuk: "Nutrisi dalam Tumbuhan",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Nutrisi dalam Tumbuhan.",
 skList: [
 {
 kod: "18.1",
 tajuk: "Nutrien Tak Organik Utama",
 spList: [
 makeBmSp("18.1.1", "Mengenal pasti makronutrien dan mikronutrien yang diperlukan oleh tumbuhan.", "Nutrien Tak Organik Utama", "Nutrisi dalam Tumbuhan"),
 makeBmSp("18.1.2", "Mewajarkan kepentingan makronutrien dan mikronutrien dalam tumbuhan.", "Nutrien Tak Organik Utama", "Nutrisi dalam Tumbuhan"),
 ],
 },
 {
 kod: "18.2",
 tajuk: "Organ Pengambilan Air dan Garam Mineral",
 spList: [
 makeBmSp("18.2.1", "Memerihalkan struktur akar dalam pengambilan air dan garam mineral.", "Organ Pengambilan Air dan Garam Mineral", "Nutrisi dalam Tumbuhan"),
 makeBmSp("18.2.2", "Mewajarkan penyesuaian akar untuk pengambilan air dan garam mineral.", "Organ Pengambilan Air dan Garam Mineral", "Nutrisi dalam Tumbuhan"),
 ],
 },
 {
 kod: "18.3",
 tajuk: "Kepelbagaian dalam Nutrisi Tumbuhan",
 spList: [
 makeBmSp("18.3.1", "Menerangkan penyesuaian nutrisi dalam tumbuhan. NUTRISI DALAM TUMBUHAN", "Kepelbagaian dalam Nutrisi Tumbuhan", "Nutrisi dalam Tumbuhan"),
 ],
 },
 ],
 },
 {
 id: "F5_B19",
 tingkatan: "Tingkatan 5",
 nomborBab: 19,
 tema: "Fisiologi Tumbuhan Berbunga",
 tajuk: "Pengangkutan dalam Tumbuhan",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Pengangkutan dalam Tumbuhan.",
 skList: [
 {
 kod: "19.1",
 tajuk: "Tisu Vaskular",
 spList: [
 makeBmSp("19.1.1", "Mewajarkan keperluan pengangkutan dalam tumbuhan.", "Tisu Vaskular", "Pengangkutan dalam Tumbuhan"),
 makeBmSp("19.1.2", "Menghubung kait penyesuaian struktur salur xilem dan trakeid dengan pengangkutan air dan garam mineral.", "Tisu Vaskular", "Pengangkutan dalam Tumbuhan"),
 makeBmSp("19.1.3", "Menghubung kait penyesuaian struktur tiub tapis dan sel rakan dengan pengangkutan bahan organik.", "Tisu Vaskular", "Pengangkutan dalam Tumbuhan"),
 ],
 },
 {
 kod: "19.2",
 tajuk: "Pengangkutan Air dan Garam Mineral",
 spList: [
 makeBmSp("19.2.1", "Menghuraikan faktor yang yang terlibat dalam laluan air dan garam mineral dari tanih ke daun: (i) tekanan akar. (ii) tindakan kapilari. (iii) tarikan transpirasi.", "Pengangkutan Air dan Garam Mineral", "Pengangkutan dalam Tumbuhan"),
 makeBmSp("19.2.2", "Menerangkan gutasi dalam tumbuhan.", "Pengangkutan Air dan Garam Mineral", "Pengangkutan dalam Tumbuhan"),
 makeBmSp("19.2.3", "Membanding dan membezakan antara gutasi dengan transpirasi dalam tumbuhan.", "Pengangkutan Air dan Garam Mineral", "Pengangkutan dalam Tumbuhan"),
 makeBmSp("19.2.4", "Meramalkan keadaan tumbuhan yang tidak menjalankan transpirasi dan gutasi.", "Pengangkutan Air dan Garam Mineral", "Pengangkutan dalam Tumbuhan"),
 ],
 },
 {
 kod: "19.3",
 tajuk: "Translokasi",
 spList: [
 makeBmSp("19.3.1", "Mendefinisikan translokasi.", "Translokasi", "Pengangkutan dalam Tumbuhan"),
 makeBmSp("19.3.2", "Mewajarkan keperluan translokasi dalam tumbuhan.", "Translokasi", "Pengangkutan dalam Tumbuhan"),
 makeBmSp("19.3.3", "Memerihalkan laluan translokasi dalam tumbuhan.", "Translokasi", "Pengangkutan dalam Tumbuhan"),
 ],
 },
 {
 kod: "19.4",
 tajuk: "Fitoremediasi",
 spList: [
 makeBmSp("19.4.1", "Mendefinisikan fitoremediasi.", "Fitoremediasi", "Pengangkutan dalam Tumbuhan"),
 makeBmSp("19.4.2", "Menerangkan penggunaan fitoremediasi dalam kehidupan.", "Fitoremediasi", "Pengangkutan dalam Tumbuhan"),
 makeBmSp("19.4.3", "Mengeksperimen untuk mengkaji keberkesanan tumbuhan fitoremediasi dalam pengawalan: (i) pencemaran air. (ii) pencemaran tanih. PENGANGKUTAN DALAM TUMBUHAN", "Fitoremediasi", "Pengangkutan dalam Tumbuhan"),
 ],
 },
 ],
 },
 {
 id: "F5_B20",
 tingkatan: "Tingkatan 5",
 nomborBab: 20,
 tema: "Fisiologi Tumbuhan Berbunga",
 tajuk: "Gerak Balas dalam Tumbuhan",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Gerak Balas dalam Tumbuhan.",
 skList: [
 {
 kod: "20.1",
 tajuk: "Jenis Gerak Balas",
 spList: [
 makeBmSp("20.1.1", "Memerihalkan jenis gerak balas tumbuhan: (i) tropisme. (ii) nasti.", "Jenis Gerak Balas", "Gerak Balas dalam Tumbuhan"),
 ],
 },
 {
 kod: "20.2",
 tajuk: "Fitohormon",
 spList: [
 makeBmSp("20.2.1", "Memerihalkan fitohormon.", "Fitohormon", "Gerak Balas dalam Tumbuhan"),
 makeBmSp("20.2.2", "Menyatakan fungsi fitohormon: (i) auksin. (ii) giberelin. (iii) sitokinin. (iv) asid absisik. (v) etilena.", "Fitohormon", "Gerak Balas dalam Tumbuhan"),
 makeBmSp("20.2.3", "Membuat inferens tentang kesan auksin terhadap gerak balas pertumbuhan.", "Fitohormon", "Gerak Balas dalam Tumbuhan"),
 makeBmSp("20.2.4", "Menerangkan peranan auksin dalam gerak balas tumbuhan. (i) fototropisme. (ii) geotropisme.", "Fitohormon", "Gerak Balas dalam Tumbuhan"),
 ],
 },
 {
 kod: "20.3",
 tajuk: "Aplikasi Fitohormon dalam Pertanian",
 spList: [
 makeBmSp("20.3.1", "Mewajarkan penggunaan fitohormon dalam pertanian.", "Aplikasi Fitohormon dalam Pertanian", "Gerak Balas dalam Tumbuhan"),
 makeBmSp("20.3.2", "Mengeksperimen untuk membandingkan kesan pemasakan buah dengan kehadiran fitohormon. GERAK BALAS DALAM TUMBUHAN", "Aplikasi Fitohormon dalam Pertanian", "Gerak Balas dalam Tumbuhan"),
 ],
 },
 ],
 },
 {
 id: "F5_B21",
 tingkatan: "Tingkatan 5",
 nomborBab: 21,
 tema: "Fisiologi Tumbuhan Berbunga",
 tajuk: "Pembiakan Seks dalam Tumbuhan Berbunga",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Pembiakan Seks dalam Tumbuhan Berbunga.",
 skList: [
 {
 kod: "21.1",
 tajuk: "Struktur Bunga",
 spList: [
 makeBmSp("21.1.1", "Mengenal pasti struktur bunga.", "Struktur Bunga", "Pembiakan Seks dalam Tumbuhan Berbunga"),
 makeBmSp("21.1.2", "Membanding dan membezakan struktur jantan dengan struktur betina dalam bunga.", "Struktur Bunga", "Pembiakan Seks dalam Tumbuhan Berbunga"),
 ],
 },
 {
 kod: "21.2",
 tajuk: "Pembentukan Debunga dan Pundi Embrio",
 spList: [
 makeBmSp("21.2.1", "Menghuraikan pembentukan debunga di dalam anter.", "Pembentukan Debunga dan Pundi Embrio", "Pembiakan Seks dalam Tumbuhan Berbunga"),
 makeBmSp("21.2.2", "Menghuraikan pembentukan pundi embrio di dalam ovul.", "Pembentukan Debunga dan Pundi Embrio", "Pembiakan Seks dalam Tumbuhan Berbunga"),
 ],
 },
 {
 kod: "21.3",
 tajuk: "Pendebungaan dan Persenyawaan",
 spList: [
 makeBmSp("21.3.1", "Memerihalkan pendebungaan.", "Pendebungaan dan Persenyawaan", "Pembiakan Seks dalam Tumbuhan Berbunga"),
 makeBmSp("21.3.2", "Menghuraikan pembentukan tiub debunga dan pembentukan gamet jantan.", "Pendebungaan dan Persenyawaan", "Pembiakan Seks dalam Tumbuhan Berbunga"),
 makeBmSp("21.3.3", "Menerangkan persenyawaan ganda dua dalam pembentukan zigot diploid dan pembentukan nukleus triploid.", "Pendebungaan dan Persenyawaan", "Pembiakan Seks dalam Tumbuhan Berbunga"),
 makeBmSp("21.3.4", "Mewajarkan kepentingan persenyawaan ganda dua dalam kemandirian tumbuhan berbunga.", "Pendebungaan dan Persenyawaan", "Pembiakan Seks dalam Tumbuhan Berbunga"),
 ],
 },
 {
 kod: "21.4",
 tajuk: "Perkembangan Biji Benih dan Buah",
 spList: [
 makeBmSp("21.4.1", "Menghuraikan persenyawaan ganda dua dengan perkembangan biji benih dan buah.", "Perkembangan Biji Benih dan Buah", "Pembiakan Seks dalam Tumbuhan Berbunga"),
 makeBmSp("21.4.2", "Menghubung kait struktur biji benih dengan ovul.", "Perkembangan Biji Benih dan Buah", "Pembiakan Seks dalam Tumbuhan Berbunga"),
 makeBmSp("21.4.3", "Menghubung kait struktur buah dengan ovari.", "Perkembangan Biji Benih dan Buah", "Pembiakan Seks dalam Tumbuhan Berbunga"),
 ],
 },
 {
 kod: "21.5",
 tajuk: "Kepentingan Biji Benih untuk Kemandirian",
 spList: [
 makeBmSp("21.5.1", "Mewajarkan kepentingan biji benih untuk kemandirian tumbuhan. PEMBIAKAN SEKS DALAM TUMBUHAN BERBUNGA", "Kepentingan Biji Benih untuk Kemandirian", "Pembiakan Seks dalam Tumbuhan Berbunga"),
 ],
 },
 ],
 },
 {
 id: "F5_B22",
 tingkatan: "Tingkatan 5",
 nomborBab: 22,
 tema: "Fisiologi Tumbuhan Berbunga",
 tajuk: "Penyesuaian Tumbuhan pada Habitat",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Penyesuaian Tumbuhan pada Habitat.",
 skList: [
 {
 kod: "22.1",
 tajuk: "Penyesuaian Tumbuhan",
 spList: [
 makeBmSp("22.1.1", "Mengelaskan tumbuhan berdasarkan habitat.", "Penyesuaian Tumbuhan", "Penyesuaian Tumbuhan pada Habitat"),
 makeBmSp("22.1.2", "Menerangkan ciri penyesuaian hidrofit, halofit dan xerofit dari aspek: (i) pengambilan air dan garam mineral. (ii) pertukaran gas. (iii) sokongan. (iv) fotosintesis. PENYESUAIAN TUMBUHAN PADA HABITAT", "Penyesuaian Tumbuhan", "Penyesuaian Tumbuhan pada Habitat"),
 ],
 },
 ],
 },
 {
 id: "F5_B23",
 tingkatan: "Tingkatan 5",
 nomborBab: 23,
 tema: "Ekosistem dan Kelestarian Alam Sekitar",
 tajuk: "Biodiversiti",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Biodiversiti.",
 skList: [
 {
 kod: "23.1",
 tajuk: "Sistem Pengelasan dan Penamaan Organisma",
 spList: [
 makeBmSp("23.1.1", "Menerangkan keperluan sistem pengelasan dan penamaan organisma.", "Sistem Pengelasan dan Penamaan Organisma", "Biodiversiti"),
 makeBmSp("23.1.2", "Memerihalkan pengelasan organisma secara heirarki dalam enam alam: (i) Archaebacteria. (ii) Eubacteria. (iii) Protista. (iv) Fungi. (v) Plantae. (vi) Animalia.", "Sistem Pengelasan dan Penamaan Organisma", "Biodiversiti"),
 makeBmSp("23.1.3", "Memerihalkan ciri utama organisma dalam setiap alam.", "Sistem Pengelasan dan Penamaan Organisma", "Biodiversiti"),
 makeBmSp("23.1.4", "Memerihalkan penamaan organisma mengikut Sistem Penamaan Binomial.", "Sistem Pengelasan dan Penamaan Organisma", "Biodiversiti"),
 makeBmSp("23.1.5", "Membina kekunci dikotomi untuk mengelaskan organisma.", "Sistem Pengelasan dan Penamaan Organisma", "Biodiversiti"),
 ],
 },
 {
 kod: "23.2",
 tajuk: "Biodiversiti",
 spList: [
 makeBmSp("23.2.1", "Mensintesiskan konsep biodiversiti berdasarkan diversiti: (i) ekosistem. (ii) spesies. (iii) genetik.", "Biodiversiti", "Biodiversiti"),
 makeBmSp("23.2.2", "Memerihalkan maksud pokok filogeni.", "Biodiversiti", "Biodiversiti"),
 makeBmSp("23.2.3", "Mewajarkan kepentingan biodiversiti terhadap alam sekitar dan manusia.", "Biodiversiti", "Biodiversiti"),
 ],
 },
 {
 kod: "23.3",
 tajuk: "Mikroorganisma dan Virus",
 spList: [
 makeBmSp("23.3.1", "Mengenal pasti ciri utama mikroorganisma dan virus: (i) bakteria. (ii) protozoa. (iii) alga. (iv) kulat. (v) virus.", "Mikroorganisma dan Virus", "Biodiversiti"),
 makeBmSp("23.3.2", "Memerihalkan peranan mikroorganisma dalam kitar nitrogen.", "Mikroorganisma dan Virus", "Biodiversiti"),
 makeBmSp("23.3.3", "Memerihalkan peranan mikroorganisma sebagai: (i) pengeluar. (ii) pengurai. (iii) simbion. (iv) parasit.", "Mikroorganisma dan Virus", "Biodiversiti"),
 makeBmSp("23.3.4", "Mendefinisikan istilah: (i) patogen. (ii) vektor.", "Mikroorganisma dan Virus", "Biodiversiti"),
 makeBmSp("23.3.5", "Memerihalkan kesan patogen terhadap kesihatan manusia. BIODIVERSITI", "Mikroorganisma dan Virus", "Biodiversiti"),
 ],
 },
 ],
 },
 {
 id: "F5_B24",
 tingkatan: "Tingkatan 5",
 nomborBab: 24,
 tema: "Ekosistem dan Kelestarian Alam Sekitar",
 tajuk: "Ekosistem",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Ekosistem.",
 skList: [
 {
 kod: "24.1",
 tajuk: "Komuniti dan Ekosistem",
 spList: [
 makeBmSp("24.1.1", "Mendefinisikan: (i) spesies. (ii) populasi. (iii) komuniti. (iv) habitat. (v) nic. (vi) ekosistem.", "Komuniti dan Ekosistem", "Ekosistem"),
 makeBmSp("24.1.2", "Mengenal pasti komponen biosis dan komponen abiosis dalam ekosistem.", "Komuniti dan Ekosistem", "Ekosistem"),
 makeBmSp("24.1.3", "Memerihalkan nutrisi autotrof dan nutrisi heterotrof.", "Komuniti dan Ekosistem", "Ekosistem"),
 makeBmSp("24.1.4", "Berkomunikasi tentang komponen biosis mengikut aras trof.", "Komuniti dan Ekosistem", "Ekosistem"),
 makeBmSp("24.1.5", "Memerihalkan pengaliran tenaga dalam rantai makanan.", "Komuniti dan Ekosistem", "Ekosistem"),
 makeBmSp("24.1.6", "Memerihalkan piramid ekologi: (i) piramid bilangan. (ii) piramid biojisim. (iii) piramid tenaga.", "Komuniti dan Ekosistem", "Ekosistem"),
 makeBmSp("24.1.7", "Mencerakinkan jenis interaksi antara komponen biosis: (i) parasitisme. (ii) komensalisme. (iii) mutualisme. (iv) saprofitisme. (v) persaingan. (vi) pemangsaan.", "Komuniti dan Ekosistem", "Ekosistem"),
 makeBmSp("24.1.9", "Menerangkan ekosistem paya bakau dari aspek: (i) komponen biosis. (ii) komponen abiosis. (iii) penyesuaian pokok bakau. (iv) pengkolonian dan sesaran. (v) kepentingan ekosistem paya bakau.", "Komuniti dan Ekosistem", "Ekosistem"),
 ],
 },
 {
 kod: "24.2",
 tajuk: "Ekologi Populasi",
 spList: [
 makeBmSp("24.2.1", "Menghuraikan faktor yang mempengaruhi taburan populasi.", "Ekologi Populasi", "Ekosistem"),
 makeBmSp("24.2.2", "Menganalisis data untuk menganggarkan saiz populasi organisma yang menggunakan: (i) teknik persampelan kuadrat. (ii) teknik tangkap-tanda-lepas- tangkap semula. EKOSISTEM", "Ekologi Populasi", "Ekosistem"),
 ],
 },
 ],
 },
 {
 id: "F5_B25",
 tingkatan: "Tingkatan 5",
 nomborBab: 25,
 tema: "Ekosistem dan Kelestarian Alam Sekitar",
 tajuk: "Kelestarian Alam Sekitar",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Kelestarian Alam Sekitar.",
 skList: [
 {
 kod: "25.1",
 tajuk: "Ancaman Alam Sekitar",
 spList: [
 makeBmSp("25.1.1", "Menghuraikan maksud kelestarian alam sekitar.", "Ancaman Alam Sekitar", "Kelestarian Alam Sekitar"),
 makeBmSp("25.1.2", "Menganalisis ancaman alam sekitar: (i) perubahan iklim. (ii) penyahutanan. (iii) pencemaran. (iv) kehilangan biodiversiti. (v) ledakan pertumbuhan populasi manusia. (vi) pemanasan global. (vii) eutrofikasi. (viii) pemanasan global.", "Ancaman Alam Sekitar", "Kelestarian Alam Sekitar"),
 makeBmSp("25.1.3", "Mengeksperimen untuk membanding tahap keperluan oksigen biokimia(BOD) dalam sampel air yang berbeza. Menyediakan pelan tindakan strategi bagi mengurangkan tahap pencemaran udara dan air di sekitar sekolah untuk sepuluh tahun akan datang.", "Ancaman Alam Sekitar", "Kelestarian Alam Sekitar"),
 ],
 },
 {
 kod: "25.2",
 tajuk: "Amalan dalam Melestarikan Alam Sekitar",
 spList: [
 makeBmSp("25.2.1", "Mendefinisikan: (i) pemeliharaan ekosistem. (ii) pemuliharaan ekosistem. (iii) pemulihan ekosistem.", "Amalan dalam Melestarikan Alam Sekitar", "Kelestarian Alam Sekitar"),
 makeBmSp("25.2.2", "Mewajarkan keperluan: (i) pemeliharaan ekosistem. (ii) pemuliharaan ekosistem. (iii) pemulihan ekosistem.", "Amalan dalam Melestarikan Alam Sekitar", "Kelestarian Alam Sekitar"),
 ],
 },
 {
 kod: "25.3",
 tajuk: "Pemeliharaan, Pemuliharaan dan Pemulihan Ekosistem",
 spList: [
 makeBmSp("25.3.1", "Menjana idea berkaitan amalan yang menyumbang kepada kelestarian alam.", "Pemeliharaan, Pemuliharaan dan Pemulihan Ekosistem", "Kelestarian Alam Sekitar"),
 makeBmSp("25.3.2", "Membincangkan status sekuriti makanan di Malaysia.", "Pemeliharaan, Pemuliharaan dan Pemulihan Ekosistem", "Kelestarian Alam Sekitar"),
 ],
 },
 {
 kod: "25.4",
 tajuk: "Teknologi Hijau",
 spList: [
 makeBmSp("25.4.1", "Mendefinisikan teknologi hijau.", "Teknologi Hijau", "Kelestarian Alam Sekitar"),
 makeBmSp("25.4.2", "Mewajarkan penggunaan teknologi hijau dalam melestarikan alam.", "Teknologi Hijau", "Kelestarian Alam Sekitar"),
 makeBmSp("25.4.3", "Berkomunikasi tentang aplikasi sains sosial untuk menyelesaikan masalah dan cabaran alam sekitar. KELESTARIAN ALAM", "Teknologi Hijau", "Kelestarian Alam Sekitar"),
 ],
 },
 ],
 },
 {
 id: "F5_B26",
 tingkatan: "Tingkatan 5",
 nomborBab: 26,
 tema: "Pewarisan dan Teknologi Genetik",
 tajuk: "Pewarisan",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Pewarisan.",
 skList: [
 {
 kod: "26.1",
 tajuk: "Pewarisan Monohibrid",
 spList: [
 makeBmSp("26.1.1", "Menghuraikan maksud kacukan monohibrid.", "Pewarisan Monohibrid", "Pewarisan"),
 makeBmSp("26.1.2", "Menerangkan kacukan monohibrid berdasarkan eksperimen Mendel.", "Pewarisan Monohibrid", "Pewarisan", true),
 makeBmSp("26.1.3", "Membezakan istilah yang berhubung dengan pewarisan: (i) gen dan alel. (ii) ciri dan trait. (iii) fenotip dan genotip. (iv) alel dominan dan alel resesif. (v) trait dominan dan trait resesif. (vi) homozigot dan heterozigot. (vii) baka tulen dan hibrid. (viii) generasi induk dan generasi filial.", "Pewarisan Monohibrid", "Pewarisan"),
 makeBmSp("26.1.4", "Membina rajah kacukan pewarisan monohibrid.", "Pewarisan Monohibrid", "Pewarisan"),
 makeBmSp("26.1.5", "Menentukan nisbah genotip dan nisbah fenotip bagi generasi filial dalam kacukan monohibrid.", "Pewarisan Monohibrid", "Pewarisan"),
 makeBmSp("26.1.6", "Memerihalkan Hukum Mendel I.", "Pewarisan Monohibrid", "Pewarisan"),
 ],
 },
 {
 kod: "26.2",
 tajuk: "Pewarisan Dihibrid",
 spList: [
 makeBmSp("26.2.1", "Menghuraikan maksud pewarisan kacukan dihibrid.", "Pewarisan Dihibrid", "Pewarisan"),
 makeBmSp("26.2.2", "Menerangkan kacukan dihibrid berdasarkan eksperimen Mendel.", "Pewarisan Dihibrid", "Pewarisan", true),
 makeBmSp("26.2.3", "Membina rajah kacukan pewarisan dihibrid.", "Pewarisan Dihibrid", "Pewarisan"),
 makeBmSp("26.2.4", "Menentukan nisbah genotip dan nisbah fenotip bagi generasi filial dalam kacukan dihibrid.", "Pewarisan Dihibrid", "Pewarisan"),
 makeBmSp("26.2.5", "Memerihalkan Hukum Mendel II. 182", "Pewarisan Dihibrid", "Pewarisan"),
 ],
 },
 {
 kod: "26.3",
 tajuk: "Gen dan Alel",
 spList: [
 makeBmSp("26.3.1", "Menghuraikan maksud lokus.", "Gen dan Alel", "Pewarisan"),
 makeBmSp("26.3.2", "Menghubung kait alel dan lokus dengan gen pada kromosom.", "Gen dan Alel", "Pewarisan"),
 ],
 },
 {
 kod: "26.4",
 tajuk: "Pewarisan Manusia",
 spList: [
 makeBmSp("26.4.1", "Mengenal pasti jenis kromosom manusia: (i) autosom. (ii) kromosom seks.", "Pewarisan Manusia", "Pewarisan"),
 makeBmSp("26.4.2", "Menganalisis dan menghuraikan kariotip manusia.", "Pewarisan Manusia", "Pewarisan"),
 makeBmSp("26.4.3", "Memadankan kromosom paternal dan kromosom maternal dalam lukisan/ mikrograf kromosom manusia untuk membina kariotip lengkap seseorang individu.", "Pewarisan Manusia", "Pewarisan"),
 makeBmSp("26.4.4", "Memerihalkan Hukum Mendel dengan pewarisan manusia.", "Pewarisan Manusia", "Pewarisan"),
 makeBmSp("26.4.5", "Menganalisis pewarisan manusia dengan membina rajah kacukan pewarisan.", "Pewarisan Manusia", "Pewarisan"),
 makeBmSp("26.4.6", "Menganalisis pewarisan manusia dengan mengkaji pedigri keluarga. PEWARISAN", "Pewarisan Manusia", "Pewarisan"),
 ],
 },
 ],
 },
 {
 id: "F5_B27",
 tingkatan: "Tingkatan 5",
 nomborBab: 27,
 tema: "Pewarisan dan Teknologi Genetik",
 tajuk: "Variasi",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Variasi.",
 skList: [
 {
 kod: "27.1",
 tajuk: "Jenis dan Faktor Variasi",
 spList: [
 makeBmSp("27.1.1", "Menghuraikan maksud variasi.", "Jenis dan Faktor Variasi", "Variasi"),
 makeBmSp("27.1.2", "Mewajarkan keperluan variasi untuk kemandirian spesies.", "Jenis dan Faktor Variasi", "Variasi"),
 makeBmSp("27.1.3", "Memerihalkan jenis variasi: (i) variasi selanjar. (ii) variasi tak selanjar.", "Jenis dan Faktor Variasi", "Variasi"),
 makeBmSp("27.1.4", "Membanding dan membezakan antara variasi selanjar dengan variasi tak selanjar.", "Jenis dan Faktor Variasi", "Variasi"),
 makeBmSp("27.1.5", "Menghubung kait punca variasi dengan jenis variasi: (i) faktor genetik. - pindah silang - penyusunan bebas kromosom - persenyawaan rawak - mutasi. (ii) faktor persekitaran. - suhu - cahaya - pH", "Jenis dan Faktor Variasi", "Variasi"),
 makeBmSp("27.1.6", "Memerihalkan variasi yang berpunca daripada interaksi antara faktor genetik dengan faktor persekitaran.", "Jenis dan Faktor Variasi", "Variasi"),
 ],
 },
 {
 kod: "27.2",
 tajuk: "Variasi dalam Manusia",
 spList: [
 makeBmSp("27.2.1", "Menghubung kait jenis variasi dengan pewarisan manusia.", "Variasi dalam Manusia", "Variasi"),
 makeBmSp("27.2.2", "Mengeksperimen untuk mengkaji variasi selanjar dan variasi tak selanjar dalam manusia dalam manusia.", "Variasi dalam Manusia", "Variasi"),
 ],
 },
 {
 kod: "27.3",
 tajuk: "Mutasi",
 spList: [
 makeBmSp("27.3.1", "Menghuraikan maksud: (i) mutagen. (ii) mutasi. (iii) mutan.", "Mutasi", "Variasi"),
 makeBmSp("27.3.2", "Memerihalkan jenis mutagen: (i) agen fizikal. (ii) agen kimia. (iii) agen biologi.", "Mutasi", "Variasi"),
 makeBmSp("27.3.3", "Menghuraikan jenis mutasi dengan contoh: (i) mutasi gen. (ii) mutasi kromosom.", "Mutasi", "Variasi"),
 makeBmSp("27.3.4", "Menghubung kait mutasi sel soma dan sel gamet dengan variasi. VARIASI", "Mutasi", "Variasi"),
 ],
 },
 ],
 },
 {
 id: "F5_B28",
 tingkatan: "Tingkatan 5",
 nomborBab: 28,
 tema: "Pewarisan dan Teknologi Genetik",
 tajuk: "Teknologi Genetik",
 peneranganRingkas: "Standard Kandungan dan Pembelajaran rasmi DSKP KSSM Biologi bagi Teknologi Genetik.",
 skList: [
 {
 kod: "28.1",
 tajuk: "Kejuruteraan Genetik",
 spList: [
 makeBmSp("28.1.1", "Menghuraikan maksud: (i) kejuruteraan genetik. T (ii) organisma terubahsuai genetik e k (genetically modified organism- n GMO). o", "Kejuruteraan Genetik", "Teknologi Genetik"),
 makeBmSp("28.1.2", "Menerangkan aplikasi kejuruteraan l o genetik dalam penghasilan: g (i) organisma terubahsuai genetik (GMO). (ii) makanan terubahsuai genetik (GMF). (iii) insulin.", "Kejuruteraan Genetik", "Teknologi Genetik"),
 ],
 },
 {
 kod: "28.2",
 tajuk: "Bioteknologi",
 spList: [
 makeBmSp("28.2.1", "Menghuraikan maksud bioteknologi. 190", "Bioteknologi", "Teknologi Genetik"),
 makeBmSp("28.2.2", "Memerihalkan aplikasi bioteknologi dalam kehidupan.", "Bioteknologi", "Teknologi Genetik"),
 makeBmSp("28.2.3", "Mewajarkan kepentingan bioteknologi dalam kehidupan. TEKNOLOGI GENETIK", "Bioteknologi", "Teknologi Genetik"),
 ],
 },
 ],
 },
];