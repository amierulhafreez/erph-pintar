import { BabFizik, StandardPembelajaran } from '../../../types/rph';

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
      `Di akhir PdPc, murid dapat ${lowerTitle} dengan tepat mengikut kehendak DSKP KSSM Fizik.`,
      eksperimenWajib
        ? `Menjalankan penyiasatan saintifik (${cleanTitle}), merekod data pemerhatian secara sistematik, dan membuat kesimpulan fizik yang sah.`
        : `Mengaplikasikan konsep ${skTajuk.toLowerCase()} untuk menjawab sekurang-kurangnya 3 soalan latihan berstruktur dengan betul.`,
    ],
    kriteriaKejayaanCadangan: [
      `Murid dapat menerangkan konsep dan prinsip fizik bagi SP ${kod} (${cleanTitle}) dengan tepat.`,
      eksperimenWajib
        ? 'Murid berjaya menyediakan radas dengan selamat, merekod data eksperimen lengkap dan menulis laporan amali.'
        : `Murid dapat menjawab sekurang-kurangnya 3 daripada 4 soalan formatif berkaitan ${skTajuk.toLowerCase()} dengan betul.`,
    ],
    cadanganAktiviti: {
      setInduksi: `Guru memaparkan fenomena fizikal alam atau simulasi interaktif berkaitan ${skTajuk} (${babTajuk}) dan mengemukakan soalan inkuiri untuk mencungkil pemikiran saintifik murid.`,
      aktivitiUtama: eksperimenWajib
        ? [
            `1. Guru memberi taklimat keselamatan makmal serta membincangkan hipotesis, pemboleh ubah (dimanipulasi, bergerak balas, dimalarkan) dan prosedur bagi: ${cleanTitle}.`,
            '2. Murid menjalankan eksperimen secara berkumpulan, mengukur kuantiti fizik dan merekod data ke dalam jadual secara sistematik.',
            '3. Pembentangan dapatan eksperimen, pemplotan graf/analisis data dan perbincangan hukum/formula fizik bersama guru.',
          ]
        : [
            `1. Guru menerangkan konsep dan rumus teras SP ${kod}: ${cleanTitle} menggunakan demonstrasi atau visualisasi simulasi.`,
            '2. Aktiviti Kolaboratif PAK-21 (Think-Pair-Share / Penyelesaian Masalah Berpandu): Murid membina rumus, melakar graf fizik atau menyelesaikan soalan berstruktur dalam kumpulan.',
            '3. Wakil kumpulan membentangkan langkah kerja pengiraan/konsep dan menerima maklum balas formatif daripada rakan dan guru.',
          ],
      penutup: `Exit Ticket: Murid merumuskan hukum/prinsip utama SP ${kod} dan menyelesaikan 1 soalan semakan pantas.`,
      aktiviti5E: {
        engage: `Guru menunjukkan fenomena fizik harian atau demonstrasi ringkas berkaitan ${skTajuk} dan menyoal murid untuk mencetuskan rasa ingin tahu.`,
        explore: eksperimenWajib
          ? `Murid merancang susunan radas, memanipulasi pemboleh ubah dan mengukur parameter fizik untuk menguji hipotesis bagi: ${cleanTitle}.`
          : `Murid menyiasat hubungan antara kuantiti fizik melalui aktiviti berkumpulan atau simulasi maya berkaitan ${skTajuk}.`,
        explain: `Murid membentangkan tafsiran graf atau konsep fizik dan guru memperjelaskan definisi saintifik serta formula yang terlibat.`,
        elaborate: `Murid mengaplikasikan prinsip fizikal ${skTajuk} dalam konteks situasi harian sebenar, inovasi teknologi, atau penyelesaian masalah berangka.`,
        evaluate: `Guru mentaksir kefahaman murid melalui soalan formatif bertaraf SPM dan semakan ketepatan langkah penyelesaian.`,
      },
    },
  };
}

export const DSKP_F5: BabFizik[] = [
  {
    id: 'F5_B1',
    tingkatan: 'Tingkatan 5',
    nomborBab: 1,
    tema: "MEKANIK NEWTON",
    tajuk: "Daya dan Gerakan II",
    peneranganRingkas: "Daya paduan, leraian daya, keseimbangan daya dan kekenyalan.",
    skList: [
      {
        kod: '1.1',
        tajuk: "Daya Paduan",
        spList: [
          makeBmSp("1.1.1", "Menyatakan maksud daya paduan.", "Daya Paduan", "Daya dan Gerakan II"),
          makeBmSp("1.1.2", "Menentukan daya paduan.", "Daya Paduan", "Daya dan Gerakan II"),
          makeBmSp("1.1.3", "Berkomunikasi tentang daya paduan, F apabila objek berada dalam keadaan : (i) pegun, F = 0 N (ii) bergerak dengan halaju seragam, F = 0 N (iii) bergerak dengan pecutan seragam, F≠ 0 N", "Daya Paduan", "Daya dan Gerakan II"),
          makeBmSp("1.1.4", "Menyelesaikan masalah yang melibatkan daya paduan, jisim dan pecutan suatu objek.", "Daya Paduan", "Daya dan Gerakan II"),
        ],
      },
      {
        kod: '1.2',
        tajuk: "Leraian Daya",
        spList: [
          makeBmSp("1.2.1", "Memerihalkan leraian daya.", "Leraian Daya", "Daya dan Gerakan II"),
          makeBmSp("1.2.2", "Menyelesaikan masalah melibatkan daya paduan dan leraian daya.", "Leraian Daya", "Daya dan Gerakan II"),
        ],
      },
      {
        kod: '1.3',
        tajuk: "Keseimbangan Daya",
        spList: [
          makeBmSp("1.3.1", "Menerangkan maksud daya yang berada dalam keseimbangan.", "Keseimbangan Daya", "Daya dan Gerakan II"),
          makeBmSp("1.3.2", "Melakar segi tiga daya bagi tiga daya yang berada dalam keseimbangan.", "Keseimbangan Daya", "Daya dan Gerakan II"),
          makeBmSp("1.3.3", "Menyelesaikan masalah melibatkan keseimbangan daya.", "Keseimbangan Daya", "Daya dan Gerakan II"),
        ],
      },
      {
        kod: '1.4',
        tajuk: "Kekenyalan",
        spList: [
          makeBmSp("1.4.1", "Memerihalkan kekenyalan.", "Kekenyalan", "Daya dan Gerakan II"),
          makeBmSp("1.4.2", "Mengeksperimen untuk mencari hubungan antara daya, F dan pemanjangan spring, x.", "Kekenyalan", "Daya dan Gerakan II", true),
          makeBmSp("1.4.3", "Berkomunikasi tentang hukum yang berkaitan dengan daya, F dan pemanjangan spring, x.", "Kekenyalan", "Daya dan Gerakan II"),
          makeBmSp("1.4.4", "Menyelesaikan masalah melibatkan daya dan pemanjangan spring.", "Kekenyalan", "Daya dan Gerakan II"),
        ],
      },
    ],
  },
  {
    id: 'F5_B2',
    tingkatan: 'Tingkatan 5',
    nomborBab: 2,
    tema: "MEKANIK NEWTON",
    tajuk: "Tekanan",
    peneranganRingkas: "Tekanan cecair, atmosfera, gas, Prinsip Pascal, Archimedes dan Bernoulli.",
    skList: [
      {
        kod: '2.1',
        tajuk: "Tekanan Cecair",
        spList: [
          makeBmSp("2.1.1", "Berkomunikasi tentang konsep tekanan cecair P = hg", "Tekanan Cecair", "Tekanan"),
          makeBmSp("2.1.2", "Mengeksperimen untuk mengkaji faktor yang mempengaruhi tekanan cecair.", "Tekanan Cecair", "Tekanan", true),
          makeBmSp("2.1.3", "Menyelesaikan masalah yang melibatkan tekanan cecair.", "Tekanan Cecair", "Tekanan"),
          makeBmSp("2.1.4", "Berkomunikasi tentang aplikasi tekanan cecair dalam kehidupan.", "Tekanan Cecair", "Tekanan"),
        ],
      },
      {
        kod: '2.2',
        tajuk: "Tekanan Atmosfera",
        spList: [
          makeBmSp("2.2.1", "Memerihalkan tentang tekanan atmosfera.", "Tekanan Atmosfera", "Tekanan"),
          makeBmSp("2.2.2", "Berkomunikasi tentang nilai tekanan atmosfera.", "Tekanan Atmosfera", "Tekanan"),
          makeBmSp("2.2.3", "Menyelesaikan masalah dalam kehidupan harian yang melibatkan pelbagai unit tekanan.", "Tekanan Atmosfera", "Tekanan"),
          makeBmSp("2.2.4", "Memerihalkan kesan tekanan atmosfera ke atas objek pada altitud tinggi dan aras kedalaman di bawah laut.", "Tekanan Atmosfera", "Tekanan"),
        ],
      },
      {
        kod: '2.3',
        tajuk: "Tekanan Gas",
        spList: [
          makeBmSp("2.3.1", "Menentukan tekanan gas dengan menggunakan manometer.", "Tekanan Gas", "Tekanan", true),
          makeBmSp("2.3.2", "Menyelesaikan masalah dalam kehidupan harian yang melibatkan tekanan gas.", "Tekanan Gas", "Tekanan", true),
        ],
      },
      {
        kod: '2.4',
        tajuk: "Prinsip Pascal",
        spList: [
          makeBmSp("2.4.1", "Memerihalkan prinsip pemindahan tekanan dalam suatu bendalir yang tertutup.", "Prinsip Pascal", "Tekanan"),
          makeBmSp("2.4.2", "Berkomunikasi mengenai sistem hidraulik sebagai satu sistem pengganda daya.", "Prinsip Pascal", "Tekanan", true),
          makeBmSp("2.4.3", "Berkomunikasi tentang aplikasi prinsip Pascal.", "Prinsip Pascal", "Tekanan"),
          makeBmSp("2.4.4", "Menyelesaikan masalah dalam kehidupan harian yang melibatkan prinsip Pascal.", "Prinsip Pascal", "Tekanan"),
        ],
      },
      {
        kod: '2.5',
        tajuk: "Prinsip Archimedes",
        spList: [
          makeBmSp("2.5.1", "Memerihalkan perkaitan antara daya apungan dengan perbezaan tekanan cecair pada aras kedalaman yang berbeza bagi objek yang terendam.", "Prinsip Archimedes", "Tekanan"),
          makeBmSp("2.5.2", "Mengaitkan keseimbangan daya dengan keadaan keapungan suatu objek dalam bendalir.", "Prinsip Archimedes", "Tekanan"),
          makeBmSp("2.5.3", "Berkomunikasi tentang aplikasi prinsip Archimedes dalam kehidupan.", "Prinsip Archimedes", "Tekanan"),
          makeBmSp("2.5.4", "Menyelesaikan masalah yang melibatkan prinsip Archimedes dan keapungan.", "Prinsip Archimedes", "Tekanan"),
        ],
      },
      {
        kod: '2.6',
        tajuk: "Prinsip Bernoulli",
        spList: [
          makeBmSp("2.6.1", "Memerihalkan kesan halaju bendalir kepada tekanan.", "Prinsip Bernoulli", "Tekanan"),
          makeBmSp("2.6.2", "Menerangkan bahawa daya angkat terhasil akibat perbezaan tekanan disebabkan oleh halaju bendalir yang berbeza.", "Prinsip Bernoulli", "Tekanan"),
          makeBmSp("2.6.3", "Berkomunikasi tentang aplikasi prinsip Bernoulli dalam kehidupan.", "Prinsip Bernoulli", "Tekanan"),
        ],
      },
    ],
  },
  {
    id: 'F5_B3',
    tingkatan: 'Tingkatan 5',
    nomborBab: 3,
    tema: "ELEKTRIK DAN KEELEKTROMAGNETAN",
    tajuk: "Elektrik",
    peneranganRingkas: "Arus dan beza keupayaan, rintangan, daya gerak elektrik (d.g.e.) dan kuasa elektrik.",
    skList: [
      {
        kod: '3.1',
        tajuk: "Arus dan Beza Keupayaan",
        spList: [
          makeBmSp("3.1.1", "Menerangkan maksud medan elektrik.", "Arus dan Beza Keupayaan", "Elektrik"),
          makeBmSp("3.1.2", "Memerihalkan kekuatan medan elektrik, E", "Arus dan Beza Keupayaan", "Elektrik"),
          makeBmSp("3.1.3", "Menerangkan kelakuan zarah bercas di dalam suatu medan elektrik", "Arus dan Beza Keupayaan", "Elektrik"),
          makeBmSp("3.1.4", "Mendefinisi arus elektrik.", "Arus dan Beza Keupayaan", "Elektrik"),
          makeBmSp("3.1.5", "Mendefinisi beza keupayaan, V", "Arus dan Beza Keupayaan", "Elektrik"),
        ],
      },
      {
        kod: '3.2',
        tajuk: "Rintangan",
        spList: [
          makeBmSp("3.2.1", "Membanding dan membeza konduktor Ohm dan konduktor bukan Ohm.", "Rintangan", "Elektrik", true),
          makeBmSp("3.2.2", "Menyelesaikan masalah bagi sambungan litar kombinasi bersiri dan selari .", "Rintangan", "Elektrik"),
          makeBmSp("3.2.3", "Menerangkan maksud kerintangan dawai, ", "Rintangan", "Elektrik"),
          makeBmSp("3.2.4", "Memerihalkan faktor yang mempengaruhi rintangan dawai, melalui eksperimen dan merumuskan AR ρ", "Rintangan", "Elektrik", true),
          makeBmSp("3.2.5", "Berkomunikasi tentang aplikasi kerintangan dawai dalam kehidupan harian.", "Rintangan", "Elektrik"),
          makeBmSp("3.2.6", "Menyelesaikan masalah melibatkan rumus rintangan dawai, AR ρ", "Rintangan", "Elektrik"),
        ],
      },
      {
        kod: '3.3',
        tajuk: "Daya Gerak Elektrik (d.g.e.) dan Rintangan Dalam",
        spList: [
          makeBmSp("3.3.1", "Menerangkan daya gerak elektrik, Ɛ", "Daya Gerak Elektrik (d.g.e.) dan Rintangan Dalam", "Elektrik"),
          makeBmSp("3.3.2", "Menerangkan rintangan dalam, r", "Daya Gerak Elektrik (d.g.e.) dan Rintangan Dalam", "Elektrik"),
          makeBmSp("3.3.3", "Mengeksperimen untuk menentukan d.g.e. dan rintangan dalam sel kering.", "Daya Gerak Elektrik (d.g.e.) dan Rintangan Dalam", "Elektrik", true),
          makeBmSp("3.3.4", "Menyelesaikan masalah melibatkan d.g.e. dan rintangan dalam sel kering.", "Daya Gerak Elektrik (d.g.e.) dan Rintangan Dalam", "Elektrik"),
        ],
      },
      {
        kod: '3.4',
        tajuk: "Tenaga dan Kuasa Elektrik",
        spList: [
          makeBmSp("3.4.1", "Merumuskan hubungan antara tenaga elektrik (E), voltan (V), arus (I) dan masa (t).", "Tenaga dan Kuasa Elektrik", "Elektrik"),
          makeBmSp("3.4.2", "Merumuskan hubungan antara kuasa (P), voltan (V) dan arus (I).", "Tenaga dan Kuasa Elektrik", "Elektrik"),
          makeBmSp("3.4.3", "Menyelesaikan masalah dalam kehidupan harian yang melibatkan tenaga dan kuasa elektrik.", "Tenaga dan Kuasa Elektrik", "Elektrik"),
          makeBmSp("3.4.4", "Membandingkan kuasa dan kadar penggunaan tenaga pelbagai alatan elektrik.", "Tenaga dan Kuasa Elektrik", "Elektrik"),
          makeBmSp("3.4.5", "Mencadangkan langkah penjimatan penggunaan tenaga elektrik di rumah. ELEKTRIK", "Tenaga dan Kuasa Elektrik", "Elektrik"),
        ],
      },
    ],
  },
  {
    id: 'F5_B4',
    tingkatan: 'Tingkatan 5',
    nomborBab: 4,
    tema: "ELEKTRIK DAN KEELEKTROMAGNETAN",
    tajuk: "Keelektromagnetan",
    peneranganRingkas: "Daya konduktor dalam medan magnet, aruhan keelektromagnetan dan transformer.",
    skList: [
      {
        kod: '4.1',
        tajuk: "Daya ke atas Konduktor Pembawa Arus dalam Suatu Medan Magnet",
        spList: [
          makeBmSp("4.1.1", "Menghuraikan kesan suatu konduktor pembawa arus dalam suatu medan magnet.", "Daya ke atas Konduktor Pembawa Arus dalam Suatu Medan Magnet", "Keelektromagnetan", true),
          makeBmSp("4.1.2", "Melukis corak medan magnet paduan (medan lastik) untuk menentukan arah tindakan daya pada konduktor pembawa arus dalam suatu medan magnet.", "Daya ke atas Konduktor Pembawa Arus dalam Suatu Medan Magnet", "Keelektromagnetan"),
          makeBmSp("4.1.3", "Menerangkan faktor yang mempengaruhi magnitud daya yang bertindak ke atas konduktor pembawa arus dalam suatu medan magnet.", "Daya ke atas Konduktor Pembawa Arus dalam Suatu Medan Magnet", "Keelektromagnetan", true),
          makeBmSp("4.1.4", "Menghuraikan kesan gegelung pembawa arus dalam medan magnet.", "Daya ke atas Konduktor Pembawa Arus dalam Suatu Medan Magnet", "Keelektromagnetan"),
          makeBmSp("4.1.5", "Menghuraikan prinsip kerja motor arus terus.", "Daya ke atas Konduktor Pembawa Arus dalam Suatu Medan Magnet", "Keelektromagnetan"),
          makeBmSp("4.1.6", "Memerihalkan faktor yang mempengaruhi kelajuan putaran suatu motor elektrik.", "Daya ke atas Konduktor Pembawa Arus dalam Suatu Medan Magnet", "Keelektromagnetan"),
        ],
      },
      {
        kod: '4.2',
        tajuk: "Aruhan Keelektromagnetan",
        spList: [
          makeBmSp("4.2.1", "Menghuraikan aruhan elektromagnet dalam suatu: (i) dawai lurus (ii) solenoid.", "Aruhan Keelektromagnetan", "Keelektromagnetan"),
          makeBmSp("4.2.2", "Menerangkan faktor yang mempengaruhi magnitud d.g.e. aruhan.", "Aruhan Keelektromagnetan", "Keelektromagnetan"),
          makeBmSp("4.2.3", "Menentukan arah arus aruhan dalam: (i) dawai lurus (ii) solenoid", "Aruhan Keelektromagnetan", "Keelektromagnetan", true),
          makeBmSp("4.2.4", "Mereka bentuk penjana arus terus dan penjana arus ulang-alik.", "Aruhan Keelektromagnetan", "Keelektromagnetan"),
        ],
      },
      {
        kod: '4.3',
        tajuk: "Transformer",
        spList: [
          makeBmSp("4.3.1", "Menghuraikan prinsip kerja transformer ringkas.", "Transformer", "Keelektromagnetan"),
          makeBmSp("4.3.2", "Menghuraikan maksud transformer unggul.", "Transformer", "Keelektromagnetan"),
          makeBmSp("4.3.3", "Menghuraikan kehilangan tenaga dan cara untuk meningkatkan kecekapan transformer.", "Transformer", "Keelektromagnetan", true),
          makeBmSp("4.3.4", "Berkomunikasi tentang kegunaan transformer dalam kehidupan harian. Membuat pencarian maklumat tentang penggunaan transformer dalam kehidupan harian seperti dalam:  peralatan elektrik  sistem penghantaran dan pengagihan tenaga elektrik KEELEKTROMAGNETAN", "Transformer", "Keelektromagnetan"),
        ],
      },
    ],
  },
  {
    id: 'F5_B5',
    tingkatan: 'Tingkatan 5',
    nomborBab: 5,
    tema: "FIZIK GUNAAN",
    tajuk: "Elektronik",
    peneranganRingkas: "Pancaran termion, sinar katod, diod semikonduktor, rektifikasi dan transistor.",
    skList: [
      {
        kod: '5.1',
        tajuk: "Elektron",
        spList: [
          makeBmSp("5.1.1", "Menerangkan pancaran termion dan sinar katod.", "Elektron", "Elektronik"),
          makeBmSp("5.1.2", "Menerangkan kesan sinar katod di bawah pengaruh medan elektrik dan medan magnet.", "Elektron", "Elektronik"),
          makeBmSp("5.1.3", "Menentukan halaju elektron dalam tiub sinar katod.", "Elektron", "Elektronik"),
        ],
      },
      {
        kod: '5.2',
        tajuk: "Diod Semikonduktor",
        spList: [
          makeBmSp("5.2.1", "Menghuraikan fungsi diod semi konduktor.", "Diod Semikonduktor", "Elektronik"),
          makeBmSp("5.2.2", "Berkomunikasi tentang kegunaan diod semi konduktor dan kapasitor dalam rektifikasi arus ulang-alik.", "Diod Semikonduktor", "Elektronik"),
        ],
      },
      {
        kod: '5.3',
        tajuk: "Transistor",
        spList: [
          makeBmSp("5.3.1", "Menghuraikan fungsi dan kegunaan transistor sebagai amplifier arus.", "Transistor", "Elektronik"),
          makeBmSp("5.3.2", "Menghuraikan litar yang mengandungi transistor sebagai suis automatik.", "Transistor", "Elektronik"),
        ],
      },
    ],
  },
  {
    id: 'F5_B6',
    tingkatan: 'Tingkatan 5',
    nomborBab: 6,
    tema: "FIZIK MODEN",
    tajuk: "Fizik Nuklear",
    peneranganRingkas: "Reputan radioaktif, separuh hayat dan penjanaan tenaga nuklear.",
    skList: [
      {
        kod: '6.1',
        tajuk: "Reputan Radioaktif",
        spList: [
          makeBmSp("6.1.1", "Menjelaskan dengan contoh persamaan reputan bagi: (i) reputan α, (ii) reputan β (iii) reputan γ", "Reputan Radioaktif", "Fizik Nuklear"),
          makeBmSp("6.1.2", "Menjelaskan dengan contoh maksud separuh hayat.", "Reputan Radioaktif", "Fizik Nuklear"),
          makeBmSp("6.1.3", "Menentukan separuh hayat bahan sumber radioaktif daripada lengkung reputan.", "Reputan Radioaktif", "Fizik Nuklear"),
          makeBmSp("6.1.4", "Menyelesaikan masalah kehidupan harian yang melibatkan separuh hayat.", "Reputan Radioaktif", "Fizik Nuklear", true),
        ],
      },
      {
        kod: '6.2',
        tajuk: "Tenaga Nuklear",
        spList: [
          makeBmSp("6.2.1", "Berkomunikasi tentang tindak balas nuklear: (i) pembelahan nukleus (ii) pelakuran nukleus", "Tenaga Nuklear", "Fizik Nuklear"),
          makeBmSp("6.2.2", "Memerihalkan hubungan antara tenaga yang dibebaskan semasa tindak balas nuklear dengan cacat jisim: E = mc2", "Tenaga Nuklear", "Fizik Nuklear"),
          makeBmSp("6.2.3", "Menyelesaikan masalah yang melibatkan tenaga nuklear daripada reputan radioaktif dan tindak balas nuklear.", "Tenaga Nuklear", "Fizik Nuklear"),
          makeBmSp("6.2.4", "Memerihalkan penjanaan tenaga elektrik dalam reaktor nuklear.", "Tenaga Nuklear", "Fizik Nuklear"),
          makeBmSp("6.2.5", "Mewajarkan penggunaan tenaga nuklear sebagai tenaga alternatif untuk menjana tenaga elektrik.", "Tenaga Nuklear", "Fizik Nuklear"),
        ],
      },
    ],
  },
  {
    id: 'F5_B7',
    tingkatan: 'Tingkatan 5',
    nomborBab: 7,
    tema: "FIZIK MODEN",
    tajuk: "Fizik Kuantum",
    peneranganRingkas: "Teori kuantum cahaya, konsep foton, kesan fotoelektrik dan persamaan Einstein.",
    skList: [
      {
        kod: '7.1',
        tajuk: "Teori Kuantum Cahaya",
        spList: [
          makeBmSp("7.1.1", "Menjelaskan latar belakang pencetusan idea teori kuantum", "Teori Kuantum Cahaya", "Fizik Kuantum"),
          makeBmSp("7.1.2", "Menyatakan maksud kuantum tenaga.", "Teori Kuantum Cahaya", "Fizik Kuantum"),
          makeBmSp("7.1.3", "Menerangkan sifat kedualan gelombang- zarah", "Teori Kuantum Cahaya", "Fizik Kuantum"),
          makeBmSp("7.1.4", "Menerangkan konsep foton", "Teori Kuantum Cahaya", "Fizik Kuantum"),
          makeBmSp("7.1.5", "Menyelesaikan masalah bagi (i) tenaga foton, E=hf (ii) kuasa, P=nhf ; n ialah bilangan foton yang dipancarkan per saat.", "Teori Kuantum Cahaya", "Fizik Kuantum"),
        ],
      },
      {
        kod: '7.2',
        tajuk: "Kesan Fotoelektrik",
        spList: [
          makeBmSp("7.2.1", "Menerangkan kesan fotoelektrik.", "Kesan Fotoelektrik", "Fizik Kuantum"),
          makeBmSp("7.2.2", "Mengenal pasti empat ciri kesan fotoelektrik yang tidak dapat diterangkan menggunakan teori gelombang.", "Kesan Fotoelektrik", "Fizik Kuantum"),
        ],
      },
      {
        kod: '7.3',
        tajuk: "Teori Fotoelektrik Einstein",
        spList: [
          makeBmSp("7.3.1", "Menyatakan fungsi kerja minimum yang diperlukan oleh suatu logam bagi memancarkan elektron melalui persamaan Einstein. 2mv21Whf ", "Teori Fotoelektrik Einstein", "Fizik Kuantum"),
          makeBmSp("7.3.2", "Menerangkan frekuensi ambang, fo dan fungsi kerja, W", "Teori Fotoelektrik Einstein", "Fizik Kuantum"),
          makeBmSp("7.3.3", "Menentukan fungsi kerja logam berdasarkan rumus, W=hfo", "Teori Fotoelektrik Einstein", "Fizik Kuantum"),
          makeBmSp("7.3.4", "Menyelesaikan masalah melibatkan persamaan Einstein untuk kesan fotoelektrik 2mv21Whf ", "Teori Fotoelektrik Einstein", "Fizik Kuantum"),
          makeBmSp("7.3.5", "Menerangkan penghasilan arus fotoelektrik dalam sebuah litar sel foto.", "Teori Fotoelektrik Einstein", "Fizik Kuantum"),
          makeBmSp("7.3.6", "Menghuraikan aplikasi kesan fotoelektrik.", "Teori Fotoelektrik Einstein", "Fizik Kuantum"),
        ],
      },
    ],
  },
];
