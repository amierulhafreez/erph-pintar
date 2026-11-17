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

export const DSKP_F4: BabFizik[] = [
  {
    id: 'F4_B1',
    tingkatan: 'Tingkatan 4',
    nomborBab: 1,
    tema: "ASAS FIZIK",
    tajuk: "Pengukuran",
    peneranganRingkas: "Kuantiti fizik, unit pengukuran dan kaedah penyiasatan saintifik.",
    skList: [
      {
        kod: '1.1',
        tajuk: "Kuantiti Fizik",
        spList: [
          makeBmSp("1.1.1", "Menerangkan kuantiti fizik.", "Kuantiti Fizik", "Pengukuran"),
          makeBmSp("1.1.2", "Menerangkan dengan contoh kuantiti asas dan kuantiti terbitan.", "Kuantiti Fizik", "Pengukuran"),
          makeBmSp("1.1.3", "Memerihalkan kuantiti terbitan dalam sebutan kuantiti asas dan unit asas S.I.", "Kuantiti Fizik", "Pengukuran"),
          makeBmSp("1.1.4", "Menerangkan dengan contoh kuantiti skalar dan kuantiti vektor.", "Kuantiti Fizik", "Pengukuran"),
        ],
      },
      {
        kod: '1.2',
        tajuk: "Penyiasatan Saintifik",
        spList: [
          makeBmSp("1.2.1", "Mentafsir bentuk-bentuk graf untuk menentukan hubungan antara dua kuantiti fizik.", "Penyiasatan Saintifik", "Pengukuran"),
          makeBmSp("1.2.2", "Menganalisis graf untuk mendapatkan rumusan siasatan.", "Penyiasatan Saintifik", "Pengukuran"),
          makeBmSp("1.2.3", "Menjalankan penyiasatan saintifik dan menulis laporan lengkap melalui eksperimen bandul ringkas.", "Penyiasatan Saintifik", "Pengukuran", true),
        ],
      },
    ],
  },
  {
    id: 'F4_B2',
    tingkatan: 'Tingkatan 4',
    nomborBab: 2,
    tema: "MEKANIK NEWTON",
    tajuk: "Daya dan Gerakan I",
    peneranganRingkas: "Kinematik gerakan linear, inersia, momentum, daya, impuls dan berat.",
    skList: [
      {
        kod: '2.1',
        tajuk: "Gerakan Linear",
        spList: [
          makeBmSp("2.1.1", "Menghuraikan jenis gerakan linear bagi objek yang berada dalam keadaan: (i) pegun (ii) halaju seragam (iii) halaju tidak seragam", "Gerakan Linear", "Daya dan Gerakan I"),
          makeBmSp("2.1.2", "Menentukan: (i) jarak dan sesaran (ii) laju dan halaju (iii) pecutan/ nyahpecutan", "Gerakan Linear", "Daya dan Gerakan I", true),
          makeBmSp("2.1.3", "Menyelesaikan masalah gerakan linear dengan menggunakan persamaan: (i) (ii) (iii) (iv)", "Gerakan Linear", "Daya dan Gerakan I"),
        ],
      },
      {
        kod: '2.2',
        tajuk: "Graf Gerakan Linear",
        spList: [
          makeBmSp("2.2.1", "Mentafsir jenis gerakan dari graf: (i) sesaran-masa (ii) halaju-masa (iii) pecutan-masa", "Graf Gerakan Linear", "Daya dan Gerakan I"),
          makeBmSp("2.2.2", "Menganalisis graf sesaran-masa untuk menentukan jarak, sesaran dan halaju.", "Graf Gerakan Linear", "Daya dan Gerakan I"),
          makeBmSp("2.2.3", "Menganalisis graf halaju-masa untuk menentukan jarak, sesaran, halaju dan pecutan.", "Graf Gerakan Linear", "Daya dan Gerakan I"),
          makeBmSp("2.2.4", "Menterjemah dan melakar: (i) graf sesaran-masa kepada graf halaju- masa dan sebaliknya (ii) graf halaju-masa kepada graf pecutan- masa dan sebaliknya", "Graf Gerakan Linear", "Daya dan Gerakan I"),
          makeBmSp("2.2.5", "Menyelesaikan masalah melibatkan graf gerakan linear.", "Graf Gerakan Linear", "Daya dan Gerakan I"),
        ],
      },
      {
        kod: '2.3',
        tajuk: "Gerakan Jatuh Bebas",
        spList: [
          makeBmSp("2.3.1", "Menjelaskan gerakan jatuh bebas dan pecutan graviti melalui contoh.", "Gerakan Jatuh Bebas", "Daya dan Gerakan I", true),
          makeBmSp("2.3.2", "Mengeksperimen untuk menentukan nilai pecutan graviti.", "Gerakan Jatuh Bebas", "Daya dan Gerakan I", true),
          makeBmSp("2.3.3", "Menyelesaikan masalah yang melibatkan pecutan graviti bumi bagi objek yang jatuh bebas.", "Gerakan Jatuh Bebas", "Daya dan Gerakan I"),
        ],
      },
      {
        kod: '2.4',
        tajuk: "Inersia",
        spList: [
          makeBmSp("2.4.1", "Menerangkan konsep inersia melalui contoh.", "Inersia", "Daya dan Gerakan I"),
          makeBmSp("2.4.2", "Mengeksperimen untuk mengenal pasti hubungan antara inersia dan jisim.", "Inersia", "Daya dan Gerakan I", true),
          makeBmSp("2.4.3", "Mewajarkan kesan inersia dalam kehidupan harian.", "Inersia", "Daya dan Gerakan I"),
        ],
      },
      {
        kod: '2.5',
        tajuk: "Momentum",
        spList: [
          makeBmSp("2.5.1", "Menerangkan momentum, p sebagai hasil darab jisim, m dan halaju, v. p = mv", "Momentum", "Daya dan Gerakan I"),
          makeBmSp("2.5.2", "Mengaplikasi Prinsip Keabadian Momentum dalam pelanggaran dan letupan.", "Momentum", "Daya dan Gerakan I"),
        ],
      },
      {
        kod: '2.6',
        tajuk: "Daya",
        spList: [
          makeBmSp("2.6.1", "Mendefinisikan daya sebagai kadar perubahan momentum.", "Daya", "Daya dan Gerakan I"),
          makeBmSp("2.6.2", "Menyelesaikan masalah melibatkan rumus F = ma. t mumvF  maF maF", "Daya", "Daya dan Gerakan I"),
        ],
      },
      {
        kod: '2.7',
        tajuk: "Impuls dan Daya Impuls",
        spList: [
          makeBmSp("2.7.1", "Berkomunikasi untuk menerangkan impuls dan daya impuls", "Impuls dan Daya Impuls", "Daya dan Gerakan I"),
          makeBmSp("2.7.2", "Menyelesaikan masalah melibatkan impuls dan daya impuls. t mumvF ", "Impuls dan Daya Impuls", "Daya dan Gerakan I"),
        ],
      },
      {
        kod: '2.8',
        tajuk: "Berat",
        spList: [
          makeBmSp("2.8.1", "Menyatakan berat sebagai daya graviti yang bertindak ke atas suatu objek, W = mg", "Berat", "Daya dan Gerakan I"),
        ],
      },
    ],
  },
  {
    id: 'F4_B3',
    tingkatan: 'Tingkatan 4',
    nomborBab: 3,
    tema: "MEKANIK NEWTON",
    tajuk: "Kegravitian",
    peneranganRingkas: "Hukum Kegravitian Semesta Newton, Hukum Kepler dan orbit satelit.",
    skList: [
      {
        kod: '3.1',
        tajuk: "Hukum Kegravitian Semesta Newton",
        spList: [
          makeBmSp("3.1.1", "Menerangkan Hukum Kegravitian Semesta Newton: r mGmF", "Hukum Kegravitian Semesta Newton", "Kegravitian"),
          makeBmSp("3.1.2", "Menyelesaikan masalah melibatkan Hukum Kegravitian Semesta Newton bagi: (i) dua jasad pegun di Bumi (ii) jasad di atas permukaan Bumi (iii) Bumi dan satelit (iv) Bumi dan Matahari", "Hukum Kegravitian Semesta Newton", "Kegravitian"),
          makeBmSp("3.1.3", "Menghubung kait pecutan graviti, g di permukaan Bumi dengan pemalar kegravitian semesta, G.", "Hukum Kegravitian Semesta Newton", "Kegravitian"),
          makeBmSp("3.1.4", "Mewajarkan kepentingan mengetahui nilai pecutan graviti planet-planet dalam Sistem Suria.", "Hukum Kegravitian Semesta Newton", "Kegravitian"),
          makeBmSp("3.1.5", "Memerihalkan daya memusat dalam sistem gerakan satelit dan planet. Daya memusat, r mvF 2", "Hukum Kegravitian Semesta Newton", "Kegravitian"),
          makeBmSp("3.1.6", "Menentukan jisim Bumi dan Matahari menggunakan rumus Hukum Kegravitian Semesta Newton dan daya memusat", "Hukum Kegravitian Semesta Newton", "Kegravitian"),
        ],
      },
      {
        kod: '3.2',
        tajuk: "Hukum Kepler",
        spList: [
          makeBmSp("3.2.1", "Menjelaskan Hukum Kepler I, II dan III", "Hukum Kepler", "Kegravitian", true),
          makeBmSp("3.2.2", "Merumuskan Hukum Kepler III, T2 ∝ r3", "Hukum Kepler", "Kegravitian"),
          makeBmSp("3.2.3", "Menyelesaikan masalah menggunakan rumus Hukum Kepler III.", "Hukum Kepler", "Kegravitian"),
        ],
      },
      {
        kod: '3.3',
        tajuk: "Satelit Buatan Manusia",
        spList: [
          makeBmSp("3.3.1", "Menerangkan bagaimana orbit satu satelit dikekalkan pada ketinggian tertentu dengan menggunakan halaju satelit yang sesuai.", "Satelit Buatan Manusia", "Kegravitian"),
          makeBmSp("3.3.2", "Berkomunikasi untuk menerangkan satelit geopegun dan bukan geopegun.", "Satelit Buatan Manusia", "Kegravitian"),
          makeBmSp("3.3.3", "Mengkonsepsikan halaju lepas.", "Satelit Buatan Manusia", "Kegravitian", true),
          makeBmSp("3.3.4", "Menyelesaikan masalah yang melibatkan halaju lepas,v bagi roket dari permukaan Bumi, Bulan dan Marikh dan matahari.", "Satelit Buatan Manusia", "Kegravitian"),
        ],
      },
    ],
  },
  {
    id: 'F4_B4',
    tingkatan: 'Tingkatan 4',
    nomborBab: 4,
    tema: "HABA",
    tajuk: "Haba",
    peneranganRingkas: "Keseimbangan terma, muatan haba tentu, haba pendam tentu dan hukum-hukum gas.",
    skList: [
      {
        kod: '4.1',
        tajuk: "Keseimbangan Terma",
        spList: [
          makeBmSp("4.1.1", "Menjelaskan melalui contoh keseimbangan terma dalam kehidupan harian.", "Keseimbangan Terma", "Haba", true),
          makeBmSp("4.1.2", "Menentu ukur sebuah termometer cecair dalam kaca menggunakan dua takat tetap.", "Keseimbangan Terma", "Haba"),
        ],
      },
      {
        kod: '4.2',
        tajuk: "Muatan Haba Tentu",
        spList: [
          makeBmSp("4.2.1", "Menerangkan muatan haba, C.", "Muatan Haba Tentu", "Haba"),
          makeBmSp("4.2.2", "Mendefinisi muatan haba tentu bahan , c", "Muatan Haba Tentu", "Haba"),
          makeBmSp("4.2.3", "Mengeksperimen untuk menentukan: (i) Muatan haba tentu air (ii) Muatan haba tentu aluminium", "Muatan Haba Tentu", "Haba", true),
          makeBmSp("4.2.4", "Berkomunikasi untuk menerangkan aplikasi muatan haba tentu dalam kehidupan harian, kejuruteraan bahan dan fenomena alam.", "Muatan Haba Tentu", "Haba"),
          makeBmSp("4.2.5", "Menyelesaikan masalah yang melibatkan muatan haba tentu menggunakan rumus Q = mcѲ", "Muatan Haba Tentu", "Haba"),
        ],
      },
      {
        kod: '4.3',
        tajuk: "Haba Pendam Tentu",
        spList: [
          makeBmSp("4.3.1", "Menerangkan haba pendam.", "Haba Pendam Tentu", "Haba"),
          makeBmSp("4.3.2", "Mendefinisi (i) haba pendam tentu, (ii) haba pendam tentu perlakuran, (iii) haba pendam tentu pengewapan,", "Haba Pendam Tentu", "Haba"),
          makeBmSp("4.3.3", "Mengeksperimen untuk menentukan, (i) haba pendam tentu pelakuran ais (ii) haba pendam tentu pengewapan air", "Haba Pendam Tentu", "Haba", true),
          makeBmSp("4.3.4", "Berkomunikasi untuk menerangkan aplikasi haba pendam tentu dalam kehidupan harian.", "Haba Pendam Tentu", "Haba"),
          makeBmSp("4.3.5", "Menyelesaikan masalah yang melibatkan haba pendam.", "Haba Pendam Tentu", "Haba"),
        ],
      },
      {
        kod: '4.4',
        tajuk: "Hukum Gas",
        spList: [
          makeBmSp("4.4.1", "Menerangkan tekanan, suhu dan isi padu gas dari segi kelakuan molekul gas berdasarkan Teori Kinetik Gas.", "Hukum Gas", "Haba"),
          makeBmSp("4.4.2", "Mengeksperimen untuk menentukan hubungan antara tekanan dan isi padu bagi suatu gas berjisim tetap pada suhu malar.", "Hukum Gas", "Haba", true),
          makeBmSp("4.4.3", "Mengeksperimen untuk menentukan hubungan antara isi padu dan suhu bagi suatu gas berjisim tetap pada tekanan malar.", "Hukum Gas", "Haba", true),
          makeBmSp("4.4.4", "Mengeksperimen untuk menentukan hubungan antara tekanan dan suhu bagi suatu gas berjisim tetap pada isi padu malar.", "Hukum Gas", "Haba", true),
          makeBmSp("4.4.5", "Menyelesaikan masalah melibatkan tekanan, suhu dan isi padu suatu gas berjisim tetap dengan menggunakan rumus dari Hukum- hukum Gas.", "Hukum Gas", "Haba"),
        ],
      },
    ],
  },
  {
    id: 'F4_B5',
    tingkatan: 'Tingkatan 4',
    nomborBab: 5,
    tema: "GELOMBANG, CAHAYA DAN OPTIK",
    tajuk: "Gelombang",
    peneranganRingkas: "Asas gelombang, pelembapan & resonans, pantulan, pembiasan, pembelauan, interferens dan gelombang elektromagnet.",
    skList: [
      {
        kod: '5.1',
        tajuk: "Asas Gelombang",
        spList: [
          makeBmSp("5.1.1", "Memerihalkan gelombang.", "Asas Gelombang", "Gelombang"),
          makeBmSp("5.1.2", "Menyatakan jenis gelombang.", "Asas Gelombang", "Gelombang"),
          makeBmSp("5.1.3", "Membandingkan gelombang melintang dan gelombang membujur.", "Asas Gelombang", "Gelombang"),
          makeBmSp("5.1.4", "Menerangkan ciri-ciri gelombang: (i) Amplitud, A (ii) Tempoh, T (iii) Frekuensi, f (iv) Panjang gelombang, λ (v) Laju gelombang, v", "Asas Gelombang", "Gelombang"),
          makeBmSp("5.1.5", "Melakar dan mentafsir graf gelombang: (i) sesaran melawan masa (ii) sesaran melawan jarak", "Asas Gelombang", "Gelombang"),
          makeBmSp("5.1.6", "Menentukan panjang gelombang, λ, frekuensi, f dan laju gelombang, v.", "Asas Gelombang", "Gelombang"),
        ],
      },
      {
        kod: '5.2',
        tajuk: "Pelembapan dan Resonans",
        spList: [
          makeBmSp("5.2.1", "Memerihalkan pelembapan dan resonans bagi satu sistem ayunan/ getaran.", "Pelembapan dan Resonans", "Gelombang"),
          makeBmSp("5.2.2", "Mewajarkan kesan resonans terhadap kehidupan.", "Pelembapan dan Resonans", "Gelombang"),
        ],
      },
      {
        kod: '5.3',
        tajuk: "Pantulan Gelombang",
        spList: [
          makeBmSp("5.3.1", "Menghuraikan pantulan gelombang dari aspek: (i) sudut tuju, i (ii) sudut pantulan, r (iii) panjang gelombang, λ (iv) frekuensi, f (v) laju, v (vi) arah perambatan gelombang.", "Pantulan Gelombang", "Gelombang"),
          makeBmSp("5.3.2", "Melukis gambar rajah untuk menunjukkan pantulan gelombang air satah bagi pemantul satah.", "Pantulan Gelombang", "Gelombang"),
          makeBmSp("5.3.3", "Mewajarkan aplikasi pantulan gelombang dalam kehidupan harian.", "Pantulan Gelombang", "Gelombang"),
          makeBmSp("5.3.4", "Menyelesaikan masalah melibatkan pantulan gelombang.", "Pantulan Gelombang", "Gelombang"),
        ],
      },
      {
        kod: '5.4',
        tajuk: "Pembiasan Gelombang",
        spList: [
          makeBmSp("5.4.1", "Menghuraikan pembiasan gelombang dari aspek: (i) sudut tuju, i (ii) sudut biasan, r (iii) panjang gelombang, λ (iv) frekuensi, f (v) laju, v (vi) arah perambatan gelombang", "Pembiasan Gelombang", "Gelombang"),
          makeBmSp("5.4.2", "Melukis gambar rajah untuk menunjukkan pembiasan gelombang bagi dua kedalaman yang berbeza.", "Pembiasan Gelombang", "Gelombang"),
          makeBmSp("5.4.3", "Menjelaskan fenomena semula jadi akibat pembiasan gelombang dalam kehidupan harian.", "Pembiasan Gelombang", "Gelombang"),
          makeBmSp("5.4.4", "Menyelesaikan masalah melibatkan pembiasan gelombang.", "Pembiasan Gelombang", "Gelombang"),
        ],
      },
      {
        kod: '5.5',
        tajuk: "Pembelauan Gelombang",
        spList: [
          makeBmSp("5.5.1", "Menghuraikan pembelauan gelombang dari aspek: (i) panjang gelombang, λ (ii) frekuensi, f (iii) laju, v (iv) amplitud, A (v) arah perambatan gelombang", "Pembelauan Gelombang", "Gelombang"),
          makeBmSp("5.5.2", "Menentukan faktor-faktor yang mempengaruhi pembelauan gelombang.", "Pembelauan Gelombang", "Gelombang"),
          makeBmSp("5.5.3", "Melukis gambar rajah untuk menunjukkan corak pembelauan gelombang air dan kesan pembelauan cahaya.", "Pembelauan Gelombang", "Gelombang"),
          makeBmSp("5.5.4", "Menjelaskan aplikasi pembelauan gelombang dalam kehidupan harian.", "Pembelauan Gelombang", "Gelombang"),
        ],
      },
      {
        kod: '5.6',
        tajuk: "Interferens Gelombang",
        spList: [
          makeBmSp("5.6.1", "Menghuraikan prinsip superposisi gelombang.", "Interferens Gelombang", "Gelombang"),
          makeBmSp("5.6.2", "Menghuraikan corak gelombang interferens: (i) air (ii) bunyi (iii) cahaya", "Interferens Gelombang", "Gelombang"),
          makeBmSp("5.6.3", "Menghubung kait , a, x dan D berdasarkan corak intereferens gelombang.", "Interferens Gelombang", "Gelombang"),
          makeBmSp("5.6.4", "Menyelesaikan masalah yang melibatkan interferens gelombang.", "Interferens Gelombang", "Gelombang"),
          makeBmSp("5.6.5", "Berkomunikasi untuk menerangkan aplikasi interferens gelombang dalam kehidupan harian.", "Interferens Gelombang", "Gelombang"),
        ],
      },
      {
        kod: '5.7',
        tajuk: "Gelombang Elektromagnet",
        spList: [
          makeBmSp("5.7.1", "Mencirikan gelombang elektromagnet.", "Gelombang Elektromagnet", "Gelombang"),
          makeBmSp("5.7.2", "Menyatakan komponen-komponen spektrum elektromagnet mengikut urutan dari segi panjang gelombang dan frekuensi.", "Gelombang Elektromagnet", "Gelombang"),
          makeBmSp("5.7.3", "Berkomunikasi untuk menerangkan aplikasi setiap komponen spektrum elektromagnet dalam kehidupan.", "Gelombang Elektromagnet", "Gelombang"),
        ],
      },
    ],
  },
  {
    id: 'F4_B6',
    tingkatan: 'Tingkatan 4',
    nomborBab: 6,
    tema: "GELOMBANG, CAHAYA DAN OPTIK",
    tajuk: "Cahaya dan Optik",
    peneranganRingkas: "Pembiasan cahaya, pantulan dalam penuh, kanta nipis, peralatan optik dan cermin sfera.",
    skList: [
      {
        kod: '6.1',
        tajuk: "Pembiasan Cahaya",
        spList: [
          makeBmSp("6.1.1", "Memerihalkan fenomena pembiasan cahaya.", "Pembiasan Cahaya", "Cahaya dan Optik"),
          makeBmSp("6.1.2", "Menerangkan indeks biasan, n.", "Pembiasan Cahaya", "Cahaya dan Optik"),
          makeBmSp("6.1.3", "Mengkonsepsikan Hukum Snell.", "Pembiasan Cahaya", "Cahaya dan Optik"),
          makeBmSp("6.1.4", "Mengeksperimen untuk menentukan indeks biasan, n bagi blok kaca atau perspeks.", "Pembiasan Cahaya", "Cahaya dan Optik", true),
          makeBmSp("6.1.5", "Menerangkan dalam nyata dan dalam ketara.", "Pembiasan Cahaya", "Cahaya dan Optik"),
          makeBmSp("6.1.6", "Mengeksperimen untuk menentukan indeks biasan menggunakan dalam nyata dan dalam ketara.", "Pembiasan Cahaya", "Cahaya dan Optik", true),
          makeBmSp("6.1.7", "Menyelesaikan masalah yang berkaitan dengan pembiasan cahaya.", "Pembiasan Cahaya", "Cahaya dan Optik"),
        ],
      },
      {
        kod: '6.2',
        tajuk: "Pantulan Dalam Penuh",
        spList: [
          makeBmSp("6.2.1", "Menerangkan sudut genting dan pantulan dalam penuh.", "Pantulan Dalam Penuh", "Cahaya dan Optik"),
          makeBmSp("6.2.2", "Menghubung kait sudut genting dengan indeks biasan,", "Pantulan Dalam Penuh", "Cahaya dan Optik"),
          makeBmSp("6.2.3", "Berkomunikasi untuk menerangkan fenomena semula jadi dan aplikasi pantulan dalam penuh dalam kehidupan harian.", "Pantulan Dalam Penuh", "Cahaya dan Optik"),
          makeBmSp("6.2.4", "Menyelesaikan masalah yang melibatkan pantulan dalam penuh.", "Pantulan Dalam Penuh", "Cahaya dan Optik"),
        ],
      },
      {
        kod: '6.3',
        tajuk: "Pembentukan Imej oleh Kanta",
        spList: [
          makeBmSp("6.3.1", "Mengenal pasti kanta cembung sebagai kanta penumpu dan kanta cekung sebagai kanta pencapah.", "Pembentukan Imej oleh Kanta", "Cahaya dan Optik"),
          makeBmSp("6.3.2", "Mengganggar panjang fokus bagi suatu kanta cembung menggunakan objek jauh.", "Pembentukan Imej oleh Kanta", "Cahaya dan Optik"),
          makeBmSp("6.3.3", "Menentukan kedudukan imej dan ciri-ciri imej yang dibentuk oleh: (i) kanta cembung (ii) kanta cekung", "Pembentukan Imej oleh Kanta", "Cahaya dan Optik"),
          makeBmSp("6.3.4", "Menyatakan pembesaran linear, m sebagai:", "Pembentukan Imej oleh Kanta", "Cahaya dan Optik"),
        ],
      },
      {
        kod: '6.4',
        tajuk: "Formula Kanta Nipis",
        spList: [
          makeBmSp("6.4.1", "Mengeksperimen untuk : (i) mengkaji hubungan antara jarak objek, u dan jarak imej , v bagi satu kanta cembung. (ii) menentukan panjang fokus kanta nipis dengan menggunakan Formula Kanta:", "Formula Kanta Nipis", "Cahaya dan Optik", true),
          makeBmSp("6.4.2", "Menyelesaikan masalah yang melibatkan formula kanta nipis bagi kanta cembung dan kanta cekung.", "Formula Kanta Nipis", "Cahaya dan Optik"),
        ],
      },
      {
        kod: '6.5',
        tajuk: "Peralatan Optik",
        spList: [
          makeBmSp("6.5.1", "Mewajarkan penggunaan kanta dalam peralatan optik iaitu kanta pembesar, mikroskop majmuk dan teleskop.", "Peralatan Optik", "Cahaya dan Optik"),
          makeBmSp("6.5.2", "Mereka bentuk dan membina mikroskop majmuk dan teleskop.", "Peralatan Optik", "Cahaya dan Optik"),
          makeBmSp("6.5.3", "Berkomunikasi untuk menerangkan aplikasi kanta bersaiz kecil dalam teknologi peralatan optik.", "Peralatan Optik", "Cahaya dan Optik"),
        ],
      },
      {
        kod: '6.6',
        tajuk: "Pembentukan Imej oleh Cermin Sfera",
        spList: [
          makeBmSp("6.6.1", "Menentukan kedudukan imej dan ciri-ciri imej yang dibentuk oleh: (i) cermin cekung (ii) cermin cembung", "Pembentukan Imej oleh Cermin Sfera", "Cahaya dan Optik"),
          makeBmSp("6.6.2", "Berkomunikasi menerangkan aplikasi cermin cekung dan cermin cembung dalam kehidupan.", "Pembentukan Imej oleh Cermin Sfera", "Cahaya dan Optik"),
        ],
      },
    ],
  },
];
