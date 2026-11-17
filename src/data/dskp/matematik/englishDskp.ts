import { BabMatematik, StandardPembelajaran } from '../../../types/rph';

function makeEnglishSp(
  kod: string,
  tajuk: string,
  skTajuk: string,
  babTajuk: string
): StandardPembelajaran {
  const cleanTitle = tajuk.replace(/\.$/, '');
  const lowerVerbTitle = cleanTitle.charAt(0).toLowerCase() + cleanTitle.slice(1);
  return {
    kod,
    tajuk,
    objektifCadangan: [
      `By the end of the lesson, pupils are able to ${lowerVerbTitle} accurately according to the KSSM Mathematics curriculum specifications.`,
      `Apply the concept of ${skTajuk.toLowerCase()} to solve at least 3 numerical exercises and mathematical problems correctly.`,
    ],
    kriteriaKejayaanCadangan: [
      `Pupils can explain mathematical concepts and calculation steps for LS ${kod} (${cleanTitle}) clearly.`,
      `Pupils correctly solve at least 3 out of 4 practice problems related to ${skTajuk.toLowerCase()} with systematic working steps.`,
    ],
    cadanganAktiviti: {
      setInduksi: `Teacher presents a real-world scenario or intriguing mathematical problem related to ${skTajuk} (${babTajuk}) to stimulate critical thinking.`,
      aktivitiUtama: [
        `1. Teacher explains core mathematical concepts, rules, and formulae for LS ${kod}: ${cleanTitle} through step-by-step worked examples.`,
        '2. 21st Century Learning (PAK-21) Activity: Pupils collaborate in small groups to solve guided problems and discuss strategies.',
        '3. Group representatives present mathematical solutions on the board and receive constructive feedback from peers and the teacher.',
      ],
      penutup: `Exit Ticket: Pupils summarise key concepts of LS ${kod} and solve one rapid problem check.`,
      aktiviti5E: {
        engage: `Teacher introduces real-life applications of ${skTajuk} to arouse curiosity and show the practical relevance of mathematics.`,
        explore: `Pupils explore patterns, formulas, or relationships using guided investigative worksheets or dynamic mathematical tools (GeoGebra/Scientific Calculator).`,
        explain: `Pupils present and justify their mathematical reasoning while teacher clarifies concepts and addresses misconceptions.`,
        elaborate: `Pupils apply ${skTajuk} concepts to solve higher-order thinking (HOTS) and SPM-level non-routine problems.`,
        evaluate: `Teacher assesses pupils\' understanding through formative questions and evaluates the precision of their mathematical steps.`,
      },
    },
    bbmCadangan: [
      'KSSM Mathematics Textbook',
      'Scientific Calculator',
      'Graph Paper / Dynamic Geometry Software (GeoGebra)',
      'Formative Practice Worksheet',
    ],
  };
}

export const DSKP_MATEMATIK_F2_DLP: BabMatematik[] = [
  {
    id: 'M_F2_B1_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 1,
    tema: 'Number and Operations',
    tajuk: 'Patterns and Sequences',
    peneranganRingkas: 'Chapter 1 Mathematics Form 2: Patterns and Sequences (Number and Operations)',
    skList: [
      {
        kod: '1.1',
        tajuk: 'Patterns',
        spList: [
          makeEnglishSp('1.1.1', 'Recognise and describe pola pelbagai set nombor dan objek dalam kehidupan sebenar, dan seterusnya membuat rumusan tentang pola.', 'Patterns', 'Patterns and Sequences'),
        ],
      },
      {
        kod: '1.2',
        tajuk: 'Sequences',
        spList: [
          makeEnglishSp('1.2.1', 'Explain the meaning of jujukan.', 'Sequences', 'Patterns and Sequences'),
          makeEnglishSp('1.2.2', 'Identify and describe pola suatu jujukan, dan seterusnya melengkapkan dan melanjutkan jujukan tersebut.', 'Sequences', 'Patterns and Sequences'),
        ],
      },
      {
        kod: '1.3',
        tajuk: 'Patterns and Sequences',
        spList: [
          makeEnglishSp('1.3.1', 'Make generalisations about pola suatu jujukan menggunakan nombor, perkataan dan ungkapan algebra.', 'Patterns and Sequences', 'Patterns and Sequences'),
          makeEnglishSp('1.3.2', 'Determine specific terms of tertentu bagi suatu jujukan.', 'Patterns and Sequences', 'Patterns and Sequences'),
          makeEnglishSp('1.3.3', 'Solve problems involving jujukan.', 'Patterns and Sequences', 'Patterns and Sequences'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B2_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 2,
    tema: 'Relationship and Algebra',
    tajuk: 'Factorisation and Algebraic Fractions',
    peneranganRingkas: 'Chapter 2 Mathematics Form 2: Factorisation and Algebraic Fractions (Relationship and Algebra)',
    skList: [
      {
        kod: '2.1',
        tajuk: 'Expansion',
        spList: [
          makeEnglishSp('2.1.1', 'Explain the meaning of kembangan dua ungkapan algebra.', 'Expansion', 'Factorisation and Algebraic Fractions'),
          makeEnglishSp('2.1.2', 'Perform expansion of dua ungkapan algebra.', 'Expansion', 'Factorisation and Algebraic Fractions'),
          makeEnglishSp('2.1.3', 'Simplify algebraic expressions yang melibatkan gabungan operasi termasuk kembangan.', 'Expansion', 'Factorisation and Algebraic Fractions'),
          makeEnglishSp('2.1.4', 'Solve problems involving kembangan dua ungkapan algebra.', 'Expansion', 'Factorisation and Algebraic Fractions'),
        ],
      },
      {
        kod: '2.2',
        tajuk: 'Factorisation',
        spList: [
          makeEnglishSp('2.2.1', 'Relate pendaraban ungkapan algebra dengan konsep faktor dan pemfaktoran dan seterusnya menyenaraikan faktor bagi hasil darab ungkapan algebra tersebut.', 'Factorisation', 'Factorisation and Algebraic Fractions'),
          makeEnglishSp('2.2.2', 'Factorise algebraic expressions dengan pelbagai kaedah.', 'Factorisation', 'Factorisation and Algebraic Fractions'),
          makeEnglishSp('2.2.3', 'Solve problems involving pemfaktoran.', 'Factorisation', 'Factorisation and Algebraic Fractions'),
        ],
      },
      {
        kod: '2.3',
        tajuk: 'Algebraic Expressions and Law of Basic Arithmetic Operations',
        spList: [
          makeEnglishSp('2.3.1', 'Perform addition and subtraction of ungkapan algebra yang melibatkan kembangan dan pemfaktoran. 36 RA.', 'Algebraic Expressions and Law of Basic Arithmetic Operations', 'Factorisation and Algebraic Fractions'),
          makeEnglishSp('2.3.2', 'Perform multiplication and division of ungkapan algebra yang melibatkan kembangan dan pemfaktoran.', 'Algebraic Expressions and Law of Basic Arithmetic Operations', 'Factorisation and Algebraic Fractions'),
          makeEnglishSp('2.3.3', 'Perform gabungan operasi ungkapan algebra yang melibatkan kembangan dan pemfaktoran.', 'Algebraic Expressions and Law of Basic Arithmetic Operations', 'Factorisation and Algebraic Fractions'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B3_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 3,
    tema: 'Relationship and Algebra',
    tajuk: 'Algebraic Formulae',
    peneranganRingkas: 'Chapter 3 Mathematics Form 2: Algebraic Formulae (Relationship and Algebra)',
    skList: [
      {
        kod: '3.1',
        tajuk: 'Algebraic Formulae',
        spList: [
          makeEnglishSp('3.1.1', 'Formulate formulae based on a situation berdasarkan suatu situasi.', 'Algebraic Formulae', 'Algebraic Formulae'),
          makeEnglishSp('3.1.2', 'Change the subject of formula bagi suatu persamaan algebra.', 'Algebraic Formulae', 'Algebraic Formulae'),
          makeEnglishSp('3.1.3', 'Determine the value of suatu pemboleh ubah apabila nilai pemboleh ubah lain diberi.', 'Algebraic Formulae', 'Algebraic Formulae'),
          makeEnglishSp('3.1.4', 'Solve problems involving rumus.', 'Algebraic Formulae', 'Algebraic Formulae'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B4_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 4,
    tema: 'Measurement and Geometry',
    tajuk: 'Polygons',
    peneranganRingkas: 'Chapter 4 Mathematics Form 2: Polygons (Measurement and Geometry)',
    skList: [
      {
        kod: '4.1',
        tajuk: 'Regular Polygons',
        spList: [
          makeEnglishSp('4.1.1', 'Describe geometric properties of geometri poligon sekata menggunakan pelbagai perwakilan.', 'Regular Polygons', 'Polygons'),
          makeEnglishSp('4.1.2', 'Membina poligon sekata menggunakan pelbagai kaedah dan Explain rasional langkah- langkah pembinaan.', 'Regular Polygons', 'Polygons'),
        ],
      },
      {
        kod: '4.2',
        tajuk: 'Interior Angles and Exterior Angles of Polygons',
        spList: [
          makeEnglishSp('4.2.1', 'Derive the formula for hasil tambah sudut pedalaman suatu poligon.', 'Interior Angles and Exterior Angles of Polygons', 'Polygons'),
          makeEnglishSp('4.2.2', 'Make and verify conjectures about hasil tambah sudut peluaran poligon.', 'Interior Angles and Exterior Angles of Polygons', 'Polygons'),
          makeEnglishSp('4.2.3', 'Determine the value of sudut pedalaman, sudut peluaran dan bilangan sisi suatu poligon.', 'Interior Angles and Exterior Angles of Polygons', 'Polygons'),
          makeEnglishSp('4.2.4', 'Solve problems involving poligon.', 'Interior Angles and Exterior Angles of Polygons', 'Polygons'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B5_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 5,
    tema: 'Measurement and Geometry',
    tajuk: 'Circles',
    peneranganRingkas: 'Chapter 5 Mathematics Form 2: Circles (Measurement and Geometry)',
    skList: [
      {
        kod: '5.1',
        tajuk: 'Properties of Circles',
        spList: [
          makeEnglishSp('5.1.1', 'Recognise parts of bulatan dan menerangkan sifat bulatan.', 'Properties of Circles', 'Circles'),
          makeEnglishSp('5.1.2', 'Construct a circle dan bahagian bulatan berdasarkan syarat yang diberi.', 'Properties of Circles', 'Circles'),
        ],
      },
      {
        kod: '5.2',
        tajuk: 'Symmetry Properties of Chords',
        spList: [
          makeEnglishSp('5.2.1', 'Menentusahkan dan Explain bahawa (i) diameter ialah paksi simetri bulatan; (ii) jejari yang berserenjang dengan perentas membahagi dua sama perentas itu dan sebaliknya; (iii) pembahagi dua sama serenjang dua perentas bertemu di pusat bulatan; (iv) perentas yang sama panjang menghasilkan lengkok yang sama panjang; dan (v) perentas yang sama panjang adalah sama jarak dari pusat bulatan dan sebaliknya.', 'Symmetry Properties of Chords', 'Circles'),
          makeEnglishSp('5.2.2', 'Determine the center and radius of dan panjang jejari bagi suatu bulatan melalui pembinaan geometri.', 'Symmetry Properties of Chords', 'Circles'),
          makeEnglishSp('5.2.3', 'Solve problems involving sifat simetri perentas.', 'Symmetry Properties of Chords', 'Circles'),
        ],
      },
      {
        kod: '5.3',
        tajuk: 'Circumference and Area of a Circle',
        spList: [
          makeEnglishSp('5.3.1', 'Determine the relationship between antara lilitan dan diameter bulatan, dan seterusnya mentakrifkan π dan menerbitkan rumus lilitan bulatan.', 'Circumference and Area of a Circle', 'Circles'),
          makeEnglishSp('5.3.2', 'Derive the formula for luas bulatan.', 'Circumference and Area of a Circle', 'Circles'),
          makeEnglishSp('5.3.3', 'Determine circumference, area of a circle, arc length and area of sectors, luas bulatan, panjang lengkok, luas sektor dan ukuran lain yang berkaitan.', 'Circumference and Area of a Circle', 'Circles'),
          makeEnglishSp('5.3.4', 'Solve problems involving bulatan.', 'Circumference and Area of a Circle', 'Circles'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B6_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 6,
    tema: 'Measurement and Geometry',
    tajuk: 'Three-Dimensional Geometrical Shapes',
    peneranganRingkas: 'Chapter 6 Mathematics Form 2: Three-Dimensional Geometrical Shapes (Measurement and Geometry)',
    skList: [
      {
        kod: '6.1',
        tajuk: 'Geometric Properties of Three-Dimensional Shapes',
        spList: [
          makeEnglishSp('6.1.1', 'Membanding, membeza dan mengklasifikasikan bentuk tiga dimensi termasuk prisma, piramid, silinder, kon dan sfera, dan seterusnya Describe geometric properties of geometri prisma, piramid, silinder, kon dan sfera.', 'Geometric Properties of Three-Dimensional Shapes', 'Three-Dimensional Geometrical Shapes'),
        ],
      },
      {
        kod: '6.2',
        tajuk: 'Nets of Three-Dimensional Shapes',
        spList: [
          makeEnglishSp('6.2.1', 'Menganalisis pelbagai bentangan termasuk piramid, prisma, silinder dan kon , dan sete melukis bentangan dan Construct models.', 'Nets of Three-Dimensional Shapes', 'Three-Dimensional Geometrical Shapes'),
        ],
      },
      {
        kod: '6.3',
        tajuk: 'Surface Area of Three-Dimensional Shapes',
        spList: [
          makeEnglishSp('6.3.1', 'Menerbitkan rumus luas permukaan kubus, kuboid, piramid, prisma, silinder dan kon, dan seterusnya Determine surface area of bentuk tersebut.', 'Surface Area of Three-Dimensional Shapes', 'Three-Dimensional Geometrical Shapes'),
          makeEnglishSp('6.3.2', 'Determine surface area of sfera dengan menggunakan rumus.', 'Surface Area of Three-Dimensional Shapes', 'Three-Dimensional Geometrical Shapes'),
          makeEnglishSp('6.3.3', 'Solve problems involving luas permukaan bentuk tiga dimensi.', 'Surface Area of Three-Dimensional Shapes', 'Three-Dimensional Geometrical Shapes'),
        ],
      },
      {
        kod: '6.4',
        tajuk: 'Volume of Three-Dimensional Shapes',
        spList: [
          makeEnglishSp('6.4.1', 'Derive the formula for isi padu prisma dan silinder, dan seterusnya membentuk rumus piramid dan kon.', 'Volume of Three-Dimensional Shapes', 'Three-Dimensional Geometrical Shapes'),
          makeEnglishSp('6.4.2', 'Determine volume of prisma, silinder, kon, piramid dan sfera dengan menggunakan rumus.', 'Volume of Three-Dimensional Shapes', 'Three-Dimensional Geometrical Shapes'),
          makeEnglishSp('6.4.3', 'Solve problems involving isi padu bentuk tiga dimensi.', 'Volume of Three-Dimensional Shapes', 'Three-Dimensional Geometrical Shapes'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B7_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 7,
    tema: 'Relationship and Algebra',
    tajuk: 'Coordinates',
    peneranganRingkas: 'Chapter 7 Mathematics Form 2: Coordinates (Relationship and Algebra)',
    skList: [
      {
        kod: '7.1',
        tajuk: 'Distance in a Cartesian Coordinate System',
        spList: [
          makeEnglishSp('7.1.1', 'Explain the meaning of jarak antara dua titik pada satah Cartes.', 'Distance in a Cartesian Coordinate System', 'Coordinates'),
          makeEnglishSp('7.1.2', 'Derive the formula for jarak antara dua titik pada satah Cartes.', 'Distance in a Cartesian Coordinate System', 'Coordinates'),
          makeEnglishSp('7.1.3', 'Determine the distance antara dua titik pada satah Cartes.', 'Distance in a Cartesian Coordinate System', 'Coordinates'),
          makeEnglishSp('7.1.4', 'Solve problems involving jarak antara dua titik dalam sistem koordinat Cartes.', 'Distance in a Cartesian Coordinate System', 'Coordinates'),
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Midpoint in a Cartesian Coordinate System',
        spList: [
          makeEnglishSp('7.2.1', 'Explain the meaning of titik tengah antara dua titik pada satah Cartes.', 'Midpoint in a Cartesian Coordinate System', 'Coordinates'),
          makeEnglishSp('7.2.2', 'Derive the formula for titik tengah antara dua titik pada satah Cartes.', 'Midpoint in a Cartesian Coordinate System', 'Coordinates'),
          makeEnglishSp('7.2.3', 'Determine the coordinates of titik tengah antara dua titik pada satah Cartes.', 'Midpoint in a Cartesian Coordinate System', 'Coordinates'),
          makeEnglishSp('7.2.4', 'Solve problems involving titik tengah dalam sistem koordinat Cartes.', 'Midpoint in a Cartesian Coordinate System', 'Coordinates'),
        ],
      },
      {
        kod: '7.3',
        tajuk: 'The Cartesian Coordinate System',
        spList: [
          makeEnglishSp('7.3.1', 'Solve problems involving sistem koordinat Cartes.', 'The Cartesian Coordinate System', 'Coordinates'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B8_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 8,
    tema: 'Relationship and Algebra',
    tajuk: 'Graphs of Functions',
    peneranganRingkas: 'Chapter 8 Mathematics Form 2: Graphs of Functions (Relationship and Algebra)',
    skList: [
      {
        kod: '8.1',
        tajuk: 'Functions',
        spList: [
          makeEnglishSp('8.1.1', 'Explain the meaning of fungsi.', 'Functions', 'Graphs of Functions'),
          makeEnglishSp('8.1.2', 'Identify fungsi dan memberi justifikasi berdasarkan perwakilan fungsi dalam bentuk pasangan tertib, jadual, graf dan persamaan.', 'Functions', 'Graphs of Functions'),
        ],
      },
      {
        kod: '8.2',
        tajuk: 'Graphs of Functions',
        spList: [
          makeEnglishSp('8.2.1', 'Construct tables of values bagi fungsi linear dan bukan linear, dan seterusnya melukis graf menggunakan skala yang diberi.', 'Graphs of Functions', 'Graphs of Functions'),
          makeEnglishSp('8.2.2', 'Interpret graphs of functions.', 'Graphs of Functions', 'Graphs of Functions'),
          makeEnglishSp('8.2.3', 'Solve problems involving graf fungsi.', 'Graphs of Functions', 'Graphs of Functions'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B9_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 9,
    tema: 'Relationship and Algebra',
    tajuk: 'Speed and Acceleration',
    peneranganRingkas: 'Chapter 9 Mathematics Form 2: Speed and Acceleration (Relationship and Algebra)',
    skList: [
      {
        kod: '9.1',
        tajuk: 'Speed',
        spList: [
          makeEnglishSp('9.1.1', 'Explain the meaning of laju sebagai suatu kadar yang melibatkan jarak dan masa.', 'Speed', 'Speed and Acceleration'),
          makeEnglishSp('9.1.2', 'Describe perbezaan antara laju seragam dan laju tak seragam.', 'Speed', 'Speed and Acceleration'),
          makeEnglishSp('9.1.3', 'Perform calculations involving yang melibatkan laju dan laju purata termasuk penukaran unit.', 'Speed', 'Speed and Acceleration'),
          makeEnglishSp('9.1.4', 'Solve problems involving laju.', 'Speed', 'Speed and Acceleration'),
        ],
      },
      {
        kod: '9.2',
        tajuk: 'Acceleration',
        spList: [
          makeEnglishSp('9.2.1', 'Explain the meaning of pecutan dan nyahpecutan sebagai suatu kadar yang melibatkan laju dan masa.', 'Acceleration', 'Speed and Acceleration'),
          makeEnglishSp('9.2.2', 'Perform calculations involving yang melibatkan pecutan termasuk penukaran unit.', 'Acceleration', 'Speed and Acceleration'),
          makeEnglishSp('9.2.3', 'Solve problems involving pecutan.', 'Acceleration', 'Speed and Acceleration'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B10_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 10,
    tema: 'Relationship and Algebra',
    tajuk: 'Gradient of a Straight Line',
    peneranganRingkas: 'Chapter 10 Mathematics Form 2: Gradient of a Straight Line (Relationship and Algebra)',
    skList: [
      {
        kod: '10.1',
        tajuk: 'Gradient',
        spList: [
          makeEnglishSp('10.1.1', 'Describe the steepness dan arah kecondongan berdasarkan situasi harian, dan seterusnya menerangkan maksud kecerunan sebagai nisbah jarak mencancang kepada jarak mengufuk.', 'Gradient', 'Gradient of a Straight Line'),
          makeEnglishSp('10.1.2', 'Derive the formula for kecerunan suatu garis lurus pada satah Cartes.', 'Gradient', 'Gradient of a Straight Line'),
          makeEnglishSp('10.1.3', 'Make generalisations about kecerunan garis lurus.', 'Gradient', 'Gradient of a Straight Line'),
          makeEnglishSp('10.1.4', 'Determine the gradient of suatu garis lurus.', 'Gradient', 'Gradient of a Straight Line'),
          makeEnglishSp('10.1.5', 'Solve problems involving kecerunan garis lurus.', 'Gradient', 'Gradient of a Straight Line'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B11_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 11,
    tema: 'Measurement and Geometry',
    tajuk: 'Isometric Transformations',
    peneranganRingkas: 'Chapter 11 Mathematics Form 2: Isometric Transformations (Measurement and Geometry)',
    skList: [
      {
        kod: '11.1',
        tajuk: 'Transformations',
        spList: [
          makeEnglishSp('11.1.1', 'Describe changes in bentuk, saiz, kedudukan dan orientasi suatu objek yang melalui transformasi, dan seterusnya menerangkan idea padanan satu-dengan-satu antara titik-titik dal transformasi.', 'Transformations', 'Isometric Transformations'),
          makeEnglishSp('11.1.2', 'Explain the idea of kekongruenan dalam transformasi.', 'Transformations', 'Isometric Transformations'),
        ],
      },
      {
        kod: '11.2',
        tajuk: 'Translation',
        spList: [
          makeEnglishSp('11.2.1', 'Recognise translasi.', 'Translation', 'Isometric Transformations'),
          makeEnglishSp('11.2.2', 'Describe translasi menggunakan pelbagai perwakilan termasuk dalam bentuk vektor translasi.', 'Translation', 'Isometric Transformations'),
          makeEnglishSp('11.2.3', 'Determine images and objects of bagi suatu translasi.', 'Translation', 'Isometric Transformations'),
          makeEnglishSp('11.2.4', 'Solve problems involving translasi.', 'Translation', 'Isometric Transformations'),
        ],
      },
      {
        kod: '11.3',
        tajuk: 'Reflection',
        spList: [
          makeEnglishSp('11.3.1', 'Recognise pantulan.', 'Reflection', 'Isometric Transformations'),
          makeEnglishSp('11.3.2', 'Describe pantulan menggunakan pelbagai perwakilan.', 'Reflection', 'Isometric Transformations'),
          makeEnglishSp('11.3.3', 'Determine images and objects of bagi suatu pantulan.', 'Reflection', 'Isometric Transformations'),
          makeEnglishSp('11.3.4', 'Solve problems involving pantulan.', 'Reflection', 'Isometric Transformations'),
        ],
      },
      {
        kod: '11.4',
        tajuk: 'Rotation',
        spList: [
          makeEnglishSp('11.4.1', 'Recognise putaran.', 'Rotation', 'Isometric Transformations'),
          makeEnglishSp('11.4.2', 'Describe putaran menggunakan pelbagai perwakilan.', 'Rotation', 'Isometric Transformations'),
          makeEnglishSp('11.4.3', 'Determine images and objects of bagi suatu putaran.', 'Rotation', 'Isometric Transformations'),
          makeEnglishSp('11.4.4', 'Solve problems involving putaran.', 'Rotation', 'Isometric Transformations'),
        ],
      },
      {
        kod: '11.5',
        tajuk: 'Translation, Reflection and Rotation as an Isometry',
        spList: [
          makeEnglishSp('11.5.1', 'Menyiasat hubungan antara kesan translasi, pantulan dan putaran terhadap jarak antara dua titik pada objek dan imej, dan seterusnya Explain isometri.', 'Translation, Reflection and Rotation as an Isometry', 'Isometric Transformations'),
          makeEnglishSp('11.5.2', 'Explain hubungan antara isometri dan kekongruenan.', 'Translation, Reflection and Rotation as an Isometry', 'Isometric Transformations'),
          makeEnglishSp('11.5.3', 'Solve problems involving isometri dan kekongruenan.', 'Translation, Reflection and Rotation as an Isometry', 'Isometric Transformations'),
        ],
      },
      {
        kod: '11.6',
        tajuk: 'Rotational Symmetry',
        spList: [
          makeEnglishSp('11.6.1', 'Explain simetri putaran.', 'Rotational Symmetry', 'Isometric Transformations'),
          makeEnglishSp('11.6.2', 'Determine peringkat simetri putaran bagi suatu objek.', 'Rotational Symmetry', 'Isometric Transformations'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B12_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 12,
    tema: 'Statistics and Probability',
    tajuk: 'Measures of Central Tendency',
    peneranganRingkas: 'Chapter 12 Mathematics Form 2: Measures of Central Tendency (Statistics and Probability)',
    skList: [
      {
        kod: '12.1',
        tajuk: 'Measures of Central Tendency',
        spList: [
          makeEnglishSp('12.1.1', 'Determine mod, min dan median bagi suatu set data tak terkumpul.', 'Measures of Central Tendency', 'Measures of Central Tendency'),
          makeEnglishSp('12.1.2', 'Draw conclusions on kesan perubahan suatu set data terhadap nilai mod, min dan median.', 'Measures of Central Tendency', 'Measures of Central Tendency'),
          makeEnglishSp('12.1.3', 'Mengumpul data, Construct dan mentafsir jadual kekerapan bagi data terkumpul.', 'Measures of Central Tendency', 'Measures of Central Tendency'),
          makeEnglishSp('12.1.4', 'Determine modal class and mean of dan min bagi suatu set data terkumpul.', 'Measures of Central Tendency', 'Measures of Central Tendency'),
          makeEnglishSp('12.1.5', 'Memilih dan menjustifikasikan sukatan kecenderungan memusat yang sesuai untuk Describe taburan suatu set data, termasuk set data yang mempunyai nilai ekstrem.', 'Measures of Central Tendency', 'Measures of Central Tendency'),
          makeEnglishSp('12.1.6', 'Determine mod, min dan median daripada perwakilan data.', 'Measures of Central Tendency', 'Measures of Central Tendency'),
          makeEnglishSp('12.1.7', 'Mengaplikasikan kefahaman tentang sukatan kecenderungan memusat untuk membuat ramalan, membentuk hujah yang meyakinkan dan Draw conclusion.', 'Measures of Central Tendency', 'Measures of Central Tendency'),
        ],
      },
    ],
  },
  {
    id: 'M_F2_B13_DLP',
    tingkatan: 'Tingkatan 2',
    nomborBab: 13,
    tema: 'Statistics and Probability',
    tajuk: 'Simple Probability',
    peneranganRingkas: 'Chapter 13 Mathematics Form 2: Simple Probability (Statistics and Probability)',
    skList: [
      {
        kod: '13.1',
        tajuk: 'Experimental Probability',
        spList: [
          makeEnglishSp('13.1.1', 'Melaksanakan eksperimen kebarangkalian mudah, dan seterusnya Determine nisbah sebagai kebarangkalian eksperimen bagi suatu peristiwa.', 'Experimental Probability', 'Simple Probability'),
          makeEnglishSp('13.1.2', 'Draw conclusions on kebarangkalian eksperimen suatu peristiwa apabila bilangan cubaan cukup besar.', 'Experimental Probability', 'Simple Probability'),
        ],
      },
      {
        kod: '13.2',
        tajuk: 'Probability Theory Involving Equally Likely Outcomes',
        spList: [
          makeEnglishSp('13.2.1', 'Determine sample spaces dan peristiwa bagi suatu eksperimen.', 'Probability Theory Involving Equally Likely Outcomes', 'Simple Probability'),
          makeEnglishSp('13.2.2', 'Membina model kebarangkalian suatu peristiwa, dan seterusnya Make connections between kebarangkalian teori dengan kebarangkalian eksperimen.', 'Probability Theory Involving Equally Likely Outcomes', 'Simple Probability'),
          makeEnglishSp('13.2.3', 'Determine the probability of suatu peristiwa.', 'Probability Theory Involving Equally Likely Outcomes', 'Simple Probability'),
        ],
      },
      {
        kod: '13.3',
        tajuk: 'Probability of the Complement of an Event',
        spList: [
          makeEnglishSp('13.3.1', 'Describe peristiwa pelengkap dalam perkataan dan dengan menggunakan tatatanda set.', 'Probability of the Complement of an Event', 'Simple Probability'),
          makeEnglishSp('13.3.2', 'Determine the probability of peristiwa pelengkap.', 'Probability of the Complement of an Event', 'Simple Probability'),
        ],
      },
      {
        kod: '13.4',
        tajuk: 'Simple Probability',
        spList: [
          makeEnglishSp('13.4.1', 'Solve problems involving kebarangkalian suatu peristiwa.', 'Simple Probability', 'Simple Probability'),
        ],
      },
    ],
  },
];

export const DSKP_MATEMATIK_F3_DLP: BabMatematik[] = [
  {
    id: 'M_F3_B1_DLP',
    tingkatan: 'Tingkatan 3',
    nomborBab: 1,
    tema: 'Number and Operations',
    tajuk: 'Indices',
    peneranganRingkas: 'Chapter 1 Mathematics Form 3: Indices (Number and Operations)',
    skList: [
      {
        kod: '1.1',
        tajuk: 'Index Notation',
        spList: [
          makeEnglishSp('1.1.1', 'Mewakilkan pendaraban berulang dalam bentuk indeks dan Describe maksudnya.', 'Index Notation', 'Indices'),
          makeEnglishSp('1.1.2', 'Convert a number kepada nombor dalam bentuk indeks dan sebaliknya.', 'Index Notation', 'Indices'),
        ],
      },
      {
        kod: '1.2',
        tajuk: 'Law of Indices',
        spList: [
          makeEnglishSp('1.2.1', 'Relate pendaraban nombor dalam bentuk indeks yang mempunyai asas yang sama dengan pendaraban berulang, dan seterusnya membuat generalisasi.', 'Law of Indices', 'Indices'),
          makeEnglishSp('1.2.2', 'Relate pembahagian nombor dalam bentuk indeks yang mempunyai asas yang sama dengan pendaraban berulang, dan seterusnya membuat generalisasi.', 'Law of Indices', 'Indices'),
          makeEnglishSp('1.2.3', 'Relate nombor dalam bentuk indeks yang dikuasakan dengan pendaraban berulang, dan seterusnya membuat generalisasi.', 'Law of Indices', 'Indices'),
          makeEnglishSp('1.2.4', 'Verify a0 = 1 dan a–n = ; a .', 'Law of Indices', 'Indices'),
          makeEnglishSp('1.2.5', 'Determine and state hubungan antara indeks peca han dengan punca kuasa dan kuasa.', 'Law of Indices', 'Indices'),
          makeEnglishSp('1.2.6', 'Perform operations involving yang melibatkan hukum indeks.', 'Law of Indices', 'Indices'),
          makeEnglishSp('1.2.7', 'Solve problems involving hukum indeks. 33 TAFS.', 'Law of Indices', 'Indices'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B2_DLP',
    tingkatan: 'Tingkatan 3',
    nomborBab: 2,
    tema: 'Number and Operations',
    tajuk: 'Standard Form',
    peneranganRingkas: 'Chapter 2 Mathematics Form 3: Standard Form (Number and Operations)',
    skList: [
      {
        kod: '2.1',
        tajuk: 'Significant Figures',
        spList: [
          makeEnglishSp('2.1.1', 'Explain the meaning of angka bererti dan seterusnya menentukan bilangan angka bererti suatu nombor.', 'Significant Figures', 'Standard Form'),
          makeEnglishSp('2.1.2', 'Membundarkan suatu nombor kepada bilangan angka bererti yang tertentu.', 'Significant Figures', 'Standard Form'),
        ],
      },
      {
        kod: '2.2',
        tajuk: 'Standard Form',
        spList: [
          makeEnglishSp('2.2.1', 'Recognise and write nombor dalam bentuk piawai.', 'Standard Form', 'Standard Form'),
          makeEnglishSp('2.2.2', 'Perform operations involving asas aritmetik yang melibatkan nombor dalam bentuk piawai.', 'Standard Form', 'Standard Form'),
          makeEnglishSp('2.2.3', 'Solve problems involving nombor dalam bentuk piawai. TAFS.', 'Standard Form', 'Standard Form'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B3_DLP',
    tingkatan: 'Tingkatan 3',
    nomborBab: 3,
    tema: 'Number and Operations',
    tajuk: 'Consumer Mathematics: Savings and Investments, Credit and Debt',
    peneranganRingkas: 'Chapter 3 Mathematics Form 3: Consumer Mathematics: Savings and Investments, Credit and Debt (Number and Operations)',
    skList: [
      {
        kod: '3.1',
        tajuk: 'Savings and Investments',
        spList: [
          makeEnglishSp('3.1.1', 'Recognise various jenis simpanan dan pelaburan.', 'Savings and Investments', 'Consumer Mathematics: Savings and Investments, Credit and Debt'),
          makeEnglishSp('3.1.2', 'Membuat pengiraan yang melibatkan faedah mudah dan faedah kompaun bagi simpanan, dan seterusnya Explain kesan perubahan tempoh, kadar faedah atau pulangan dan kekerapan pengkompaunan terhadap nilai masa hadapan simpanan.', 'Savings and Investments', 'Consumer Mathematics: Savings and Investments, Credit and Debt'),
          makeEnglishSp('3.1.3', 'Membuat pengiraan yang melibatkan nilai pulangan pelaburan, dan seterusnya Explain faktor yang mempengaruhi pulangan pelaburan serta kesannya.', 'Savings and Investments', 'Consumer Mathematics: Savings and Investments, Credit and Debt'),
          makeEnglishSp('3.1.4', 'Membanding dan membeza potensi risiko, pulangan dan kecairan pelbagai jenis simpanan dan pelaburan.', 'Savings and Investments', 'Consumer Mathematics: Savings and Investments, Credit and Debt'),
          makeEnglishSp('3.1.5', 'Mengira purata kos sesyer bagi pelaburan saham menggunakan strategi pemurataan kos ringgit dan Explain manfaat strategi ini.', 'Savings and Investments', 'Consumer Mathematics: Savings and Investments, Credit and Debt'),
          makeEnglishSp('3.1.6', 'Solve problems involving simpanan dan pelaburan.', 'Savings and Investments', 'Consumer Mathematics: Savings and Investments, Credit and Debt'),
        ],
      },
      {
        kod: '3.2',
        tajuk: 'Credit and Debt Management',
        spList: [
          makeEnglishSp('3.2.1', 'Explain the concept of kredit dan hutang, dan seterusnya menghuraikan pengurusan yang bijaksana tentang kredit dan hutang.', 'Credit and Debt Management', 'Consumer Mathematics: Savings and Investments, Credit and Debt'),
          makeEnglishSp('3.2.2', 'Mengkaji dan Describe kelebihan dan kekurangan kad kredit dan penggunaannya secara bijaksana.', 'Credit and Debt Management', 'Consumer Mathematics: Savings and Investments, Credit and Debt'),
          makeEnglishSp('3.2.3', 'Mengkaji dan Describe kesan pembayaran minimum dan pembayaran lewat bagi penggunaan kad kredit.', 'Credit and Debt Management', 'Consumer Mathematics: Savings and Investments, Credit and Debt'),
          makeEnglishSp('3.2.4', 'Solve problems involving penggunaan kad kredit.', 'Credit and Debt Management', 'Consumer Mathematics: Savings and Investments, Credit and Debt'),
          makeEnglishSp('3.2.5', 'Mengira jumlah bayaran balik pinjaman dan bayaran ansuran, dengan pelbagai kadar faedah dan tempoh pinjaman yang berbeza.', 'Credit and Debt Management', 'Consumer Mathematics: Savings and Investments, Credit and Debt'),
          makeEnglishSp('3.2.6', 'Solve problems involving pinjaman.', 'Credit and Debt Management', 'Consumer Mathematics: Savings and Investments, Credit and Debt'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B4_DLP',
    tingkatan: 'Tingkatan 3',
    nomborBab: 4,
    tema: 'Measurement and Geometry',
    tajuk: 'Scale Drawings',
    peneranganRingkas: 'Chapter 4 Mathematics Form 3: Scale Drawings (Measurement and Geometry)',
    skList: [
      {
        kod: '4.1',
        tajuk: 'Scale Drawings',
        spList: [
          makeEnglishSp('4.1.1', 'Mengkaji dan menerangkan hubungan antara ukuran sebenar objek dan lukisan pelbagai saiz objek tersebut, dan seterusnya Explain the meaning of lukisan berskala.', 'Scale Drawings', 'Scale Drawings'),
          makeEnglishSp('4.1.2', 'Interpretkan skala suatu lukisan berskala.', 'Scale Drawings', 'Scale Drawings'),
          makeEnglishSp('4.1.3', 'Determine skala, ukuran objek atau ukuran lukisan berskala.', 'Scale Drawings', 'Scale Drawings'),
          makeEnglishSp('4.1.4', 'Draw lukisan berskala bagi suatu objek dan sebaliknya.', 'Scale Drawings', 'Scale Drawings'),
          makeEnglishSp('4.1.5', 'Solve problems involving lukisan berskala. 46 TA.', 'Scale Drawings', 'Scale Drawings'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B5_DLP',
    tingkatan: 'Tingkatan 3',
    nomborBab: 5,
    tema: 'Measurement and Geometry',
    tajuk: 'Trigonometric Ratios',
    peneranganRingkas: 'Chapter 5 Mathematics Form 3: Trigonometric Ratios (Measurement and Geometry)',
    skList: [
      {
        kod: '5.1',
        tajuk: 'Sine, Cosine and Tangent of Acute Angles in Right-angled Triangles',
        spList: [
          makeEnglishSp('5.1.1', 'Identify sisi bertentangan dan sisi bersebelahan berdasarkan suatu sudut tirus dalam segi tiga bersudut tegak.', 'Sine, Cosine and Tangent of Acute Angles in Right-angled Triangles', 'Trigonometric Ratios'),
          makeEnglishSp('5.1.2', 'Make and verify conjectures about hubungan antara sudut tirus dan nisbah sisi segi tiga bersudut tegak, dan seterusnya mentakrifkan sinus, kosinus dan tangen.', 'Sine, Cosine and Tangent of Acute Angles in Right-angled Triangles', 'Trigonometric Ratios'),
          makeEnglishSp('5.1.3', 'Make and verify conjectures about kesan perubahan saiz sudut terhadap nilai sinus, kosinus dan tangen.', 'Sine, Cosine and Tangent of Acute Angles in Right-angled Triangles', 'Trigonometric Ratios'),
          makeEnglishSp('5.1.4', 'Determine the value of sinus, kosinus dan tangen suatu sudut tirus.', 'Sine, Cosine and Tangent of Acute Angles in Right-angled Triangles', 'Trigonometric Ratios'),
          makeEnglishSp('5.1.5', 'Determine the value of sinus, kosinus dan tangen sudut 30, 45 dan 60 tanpa menggunakan kalkulator.', 'Sine, Cosine and Tangent of Acute Angles in Right-angled Triangles', 'Trigonometric Ratios'),
          makeEnglishSp('5.1.6', 'Melakukan pengiraan yang melibatkan sinus, kosinus dan tangen.', 'Sine, Cosine and Tangent of Acute Angles in Right-angled Triangles', 'Trigonometric Ratios'),
          makeEnglishSp('5.1.7', 'Solve problems involving sinus, kosinus dan tangen. TA.', 'Sine, Cosine and Tangent of Acute Angles in Right-angled Triangles', 'Trigonometric Ratios'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B6_DLP',
    tingkatan: 'Tingkatan 3',
    nomborBab: 6,
    tema: 'Measurement and Geometry',
    tajuk: 'Angles and Tangents of Circles',
    peneranganRingkas: 'Chapter 6 Mathematics Form 3: Angles and Tangents of Circles (Measurement and Geometry)',
    skList: [
      {
        kod: '6.1',
        tajuk: 'Angle at the Circumference and Central Angle Subtended by an Arc',
        spList: [
          makeEnglishSp('6.1.1', 'Make and verify conjectures about hubungan antara (i) sudut-sudut pada lilitan, (ii) sudut pada lilitan dan sudut pusat yang dicangkum oleh lengkok tertentu, dan seterusnya menggunakan hubungan tersebut untuk menentukan nilai sudut dalam bulatan.', 'Angle at the Circumference and Central Angle Subtended by an Arc', 'Angles and Tangents of Circles'),
          makeEnglishSp('6.1.2', 'Solve problems involving sudut dalam bulatan.', 'Angle at the Circumference and Central Angle Subtended by an Arc', 'Angles and Tangents of Circles'),
        ],
      },
      {
        kod: '6.2',
        tajuk: 'Cyclic Quadrilaterals',
        spList: [
          makeEnglishSp('6.2.1', 'Recognise and describe sisi empat kitaran.', 'Cyclic Quadrilaterals', 'Angles and Tangents of Circles'),
          makeEnglishSp('6.2.2', 'Make and verify conjectures about hubungan antara sudut-sudut pada sisi empat kitaran, dan seterusnya menggunakan hubungan tersebut untuk menentukan nilai sudut pada sisi empat kitaran.', 'Cyclic Quadrilaterals', 'Angles and Tangents of Circles'),
          makeEnglishSp('6.2.3', 'Solve problems involving sisi empat kitaran.', 'Cyclic Quadrilaterals', 'Angles and Tangents of Circles'),
        ],
      },
      {
        kod: '6.3',
        tajuk: 'Tangents to Circles',
        spList: [
          makeEnglishSp('6.3.1', 'Recognise and describe tangen kepada bulatan.', 'Tangents to Circles', 'Angles and Tangents of Circles'),
          makeEnglishSp('6.3.2', 'Make and verify conjectures about (i) sudut di antara tangen dengan jejari bulatan pada titik ketangenan, (ii) sifat-sifat berkaitan dengan dua tangen kepada suatu bulatan, (iii) hubungan sudut di antara tangen dan perentas dengan sudut dalam tembereng selang-seli yang dicangkum oleh perentas itu, dan seterusnya melakukan pengiraan yang berkaitan.', 'Tangents to Circles', 'Angles and Tangents of Circles'),
          makeEnglishSp('6.3.3', 'Solve problems involving tangen kepada bulatan.', 'Tangents to Circles', 'Angles and Tangents of Circles'),
        ],
      },
      {
        kod: '6.4',
        tajuk: 'Angles and Tangents to Circles',
        spList: [
          makeEnglishSp('6.4.1', 'Solve problems involving sudut dan tangen bagi bulatan. 55 TA.', 'Angles and Tangents to Circles', 'Angles and Tangents of Circles'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B7_DLP',
    tingkatan: 'Tingkatan 3',
    nomborBab: 7,
    tema: 'Measurement and Geometry',
    tajuk: 'Plans and Elevations',
    peneranganRingkas: 'Chapter 7 Mathematics Form 3: Plans and Elevations (Measurement and Geometry)',
    skList: [
      {
        kod: '7.1',
        tajuk: 'Orthogonal Projections',
        spList: [
          makeEnglishSp('7.1.1', 'Draw orthogonal projections.', 'Orthogonal Projections', 'Plans and Elevations'),
          makeEnglishSp('7.1.2', 'Membanding dan membeza antara objek dan unjuran ortogon yang sepadan.', 'Orthogonal Projections', 'Plans and Elevations'),
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Plans and Elevations',
        spList: [
          makeEnglishSp('7.2.1', 'Draw plans and elevations suatu objek mengikut skala.', 'Plans and Elevations', 'Plans and Elevations'),
          makeEnglishSp('7.2.2', 'Mensintesis pelan dan dongakan suatu objek dan melakar objek tersebut.', 'Plans and Elevations', 'Plans and Elevations'),
          makeEnglishSp('7.2.3', 'Solve problems involving pelan dan dongakan. 59 TAFS.', 'Plans and Elevations', 'Plans and Elevations'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B8_DLP',
    tingkatan: 'Tingkatan 3',
    nomborBab: 8,
    tema: 'Measurement and Geometry',
    tajuk: 'Loci in Two Dimensions',
    peneranganRingkas: 'Chapter 8 Mathematics Form 3: Loci in Two Dimensions (Measurement and Geometry)',
    skList: [
      {
        kod: '8.1',
        tajuk: 'Loci',
        spList: [
          makeEnglishSp('8.1.1', 'Recognise lokus dalam situasi kehidupan sebenar, dan seterusnya menerangkan maksud lokus.', 'Loci', 'Loci in Two Dimensions'),
        ],
      },
      {
        kod: '8.2',
        tajuk: 'Loci in Two Dimensions',
        spList: [
          makeEnglishSp('8.2.1', 'Describe lokus bagi titik yang (i) berjarak tetap dari satu titik tetap, (ii) berjarak sama dari dua titik tetap, (iii) berjarak tetap dari satu garis lurus, (iv) berjarak sama dari dua garis lurus yang selari, dan (v) berjarak sama dari dua garis lurus yang bersilang, dan seterusnya membina lokus tersebut.', 'Loci in Two Dimensions', 'Loci in Two Dimensions'),
          makeEnglishSp('8.2.2', 'Determine lokus yang memenuhi dua atau lebih syarat.', 'Loci in Two Dimensions', 'Loci in Two Dimensions'),
          makeEnglishSp('8.2.3', 'Solve problems involving lokus. 62 TAF.', 'Loci in Two Dimensions', 'Loci in Two Dimensions'),
        ],
      },
    ],
  },
  {
    id: 'M_F3_B9_DLP',
    tingkatan: 'Tingkatan 3',
    nomborBab: 9,
    tema: 'Relationship and Algebra',
    tajuk: 'Straight Lines',
    peneranganRingkas: 'Chapter 9 Mathematics Form 3: Straight Lines (Relationship and Algebra)',
    skList: [
      {
        kod: '9.1',
        tajuk: 'Straight Lines',
        spList: [
          makeEnglishSp('9.1.1', 'Membuat perkaitan antara persamaan, y = mx + c, dengan kecerunan dan pintasan-y, dan seterusnya Make generalisations about persamaan garis lurus.', 'Straight Lines', 'Straight Lines'),
          makeEnglishSp('9.1.2', 'Menyiasat dan mentafsir persamaan garis lurus dalam bentuk lain seperti ax + by = c dan + = 1, serta Convertkan kepada bentuk y = mx + c dan sebaliknya.', 'Straight Lines', 'Straight Lines'),
          makeEnglishSp('9.1.3', 'Investigate dan membuat inferens tentang hubungan antara titik pada garis lurus dengan persamaan garis lurus tersebut.', 'Straight Lines', 'Straight Lines'),
          makeEnglishSp('9.1.4', 'Investigate dan membuat inferens tentang kecerunan garis selari.', 'Straight Lines', 'Straight Lines'),
          makeEnglishSp('9.1.5', 'Determine persamaan suatu garis lurus.', 'Straight Lines', 'Straight Lines'),
          makeEnglishSp('9.1.6', 'Determine titik persilangan bagi dua garis lurus.', 'Straight Lines', 'Straight Lines'),
          makeEnglishSp('9.1.7', 'Solve problems involving garis lurus. 67 TAF.', 'Straight Lines', 'Straight Lines'),
        ],
      },
    ],
  },
];

export const DSKP_MATEMATIK_F4_DLP: BabMatematik[] = [
  {
    id: 'M_F4_B1_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 1,
    tema: 'Relationship and Algebra',
    tajuk: 'Quadratic Functions and Equations in One Variable',
    peneranganRingkas: 'Chapter 1 Mathematics Form 4: Quadratic Functions and Equations in One Variable (Relationship and Algebra)',
    skList: [
      {
        kod: '1.1',
        tajuk: 'Quadratic Functions and Equations',
        spList: [
          makeEnglishSp('1.1.1', 'Identify and describe ciri-ciri ungkapan kuadratik dalam satu pemboleh ubah.', 'Quadratic Functions and Equations', 'Quadratic Functions and Equations in One Variable'),
          makeEnglishSp('1.1.2', 'Recognise fungsi kuadratik sebagai hubungan banyak kepada satu, dan seterusnya memerihalkan ciri-ciri fungsi kuadratik.', 'Quadratic Functions and Equations', 'Quadratic Functions and Equations in One Variable'),
          makeEnglishSp('1.1.3', 'Menyiasat dan Make generalisations about kesan perubahan nilai dan ke atas gra fungsi kuadratik,.', 'Quadratic Functions and Equations', 'Quadratic Functions and Equations in One Variable'),
          makeEnglishSp('1.1.4', 'Membentuk fungsi kuadratik berdasarkan suatu situasi dan seterusnya Relate dengan persamaan kuadratik.', 'Quadratic Functions and Equations', 'Quadratic Functions and Equations in One Variable'),
          makeEnglishSp('1.1.5', 'Explain the meaning of punca suatu persamaan kuadratik.', 'Quadratic Functions and Equations', 'Quadratic Functions and Equations in One Variable'),
          makeEnglishSp('1.1.6', 'Determine punca suatu persamaan kuadratik dengan kaedah pemfaktoran.', 'Quadratic Functions and Equations', 'Quadratic Functions and Equations in One Variable'),
          makeEnglishSp('1.1.7', 'Melakar graf fungsi kuadratik.', 'Quadratic Functions and Equations', 'Quadratic Functions and Equations in One Variable'),
          makeEnglishSp('1.1.8', 'Solve problems involving persamaan kuadratik. 35 TAFSI.', 'Quadratic Functions and Equations', 'Quadratic Functions and Equations in One Variable'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B2_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 2,
    tema: 'Number and Operations',
    tajuk: 'Number Bases',
    peneranganRingkas: 'Chapter 2 Mathematics Form 4: Number Bases (Number and Operations)',
    skList: [
      {
        kod: '2.1',
        tajuk: 'Number Bases',
        spList: [
          makeEnglishSp('2.1.1', 'Mewakil dan Explain nombor dalam pelbagai asas dari segi angka, nilai tempat, nil digit dan nilai nombor berdasarkan proses pengumpulan.', 'Number Bases', 'Number Bases'),
          makeEnglishSp('2.1.2', 'Convert nombor daripada satu asas kepada asas yang lain menggunakan pelbagai kaedah.', 'Number Bases', 'Number Bases'),
          makeEnglishSp('2.1.3', 'Membuat pengiraan yang melibatkan operasi tambah dan tolak bagi nombor dalam pelbagai asas.', 'Number Bases', 'Number Bases'),
          makeEnglishSp('2.1.4', 'Solve problems involving asas nombor. 39 TAFSIR.', 'Number Bases', 'Number Bases'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B3_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 3,
    tema: 'Discrete Mathematics',
    tajuk: 'Logical Reasoning',
    peneranganRingkas: 'Chapter 3 Mathematics Form 4: Logical Reasoning (Discrete Mathematics)',
    skList: [
      {
        kod: '3.1',
        tajuk: 'Statements',
        spList: [
          makeEnglishSp('3.1.1', 'Explain the meaning of pernyataan dan seterusnya menentukan nilai kebenaran bagi suatu pernyataan.', 'Statements', 'Logical Reasoning'),
          makeEnglishSp('3.1.2', 'Menafikan suatu pernyataan.', 'Statements', 'Logical Reasoning'),
          makeEnglishSp('3.1.3', 'Determine the value of kebenaran suatu pernyataan majmuk.', 'Statements', 'Logical Reasoning'),
          makeEnglishSp('3.1.4', 'Construct pernyataan dalam bentuk implikasi (i) Jika p, maka q (ii) p jika dan hanya jika q.', 'Statements', 'Logical Reasoning'),
          makeEnglishSp('3.1.5', 'Construct dan membandingkan nilai kebenaran akas, songsangan dan kontrapositif bagi suatu implikasi.', 'Statements', 'Logical Reasoning'),
          makeEnglishSp('3.1.6', 'Determine contoh penyangkal untuk menafikan kebenaran pernyataan tertentu.', 'Statements', 'Logical Reasoning'),
        ],
      },
      {
        kod: '3.2',
        tajuk: 'Arguments',
        spList: [
          makeEnglishSp('3.2.1', 'Explain the meaning of hujah, dan membezakan hujah deduktif dan hujah induktif.', 'Arguments', 'Logical Reasoning'),
          makeEnglishSp('3.2.2', 'Menentu dan menjustifikasikan keesahan suatu hujah deduktif dan seterusnya Determine sama ada hujah yang sah itu munasabah. 43.', 'Arguments', 'Logical Reasoning'),
          makeEnglishSp('3.2.3', 'Membentuk hujah deduktif yang sah bagi suatu situasi.', 'Arguments', 'Logical Reasoning'),
          makeEnglishSp('3.2.4', 'Menentu dan menjustifikasikan kekuatan suatu hujah induktif dan seterusnya Determine sama ada hujah yang kuat itu meyakinkan.', 'Arguments', 'Logical Reasoning'),
          makeEnglishSp('3.2.5', 'Membentuk hujah induktif yang kuat bagi suatu situasi.', 'Arguments', 'Logical Reasoning'),
          makeEnglishSp('3.2.6', 'Solve problems involving penaakulan logik. 45 TAFS.', 'Arguments', 'Logical Reasoning'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B4_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 4,
    tema: 'Discrete Mathematics',
    tajuk: 'Operations on Sets',
    peneranganRingkas: 'Chapter 4 Mathematics Form 4: Operations on Sets (Discrete Mathematics)',
    skList: [
      {
        kod: '4.1',
        tajuk: 'Intersection of Sets',
        spList: [
          makeEnglishSp('4.1.1', 'Menentu dan Describe persilangan set menggunakan pelbagai perwakilan.', 'Intersection of Sets', 'Operations on Sets'),
          makeEnglishSp('4.1.2', 'Determine pelengkap bagi persilangan set.', 'Intersection of Sets', 'Operations on Sets'),
          makeEnglishSp('4.1.3', 'Solve problems involving persilangan set.', 'Intersection of Sets', 'Operations on Sets'),
        ],
      },
      {
        kod: '4.2',
        tajuk: 'Union of Sets',
        spList: [
          makeEnglishSp('4.2.1', 'Menentu dan Describe kesatuan set menggunakan pelbagai perwakilan.', 'Union of Sets', 'Operations on Sets'),
          makeEnglishSp('4.2.2', 'Determine pelengkap bagi kesatuan set.', 'Union of Sets', 'Operations on Sets'),
          makeEnglishSp('4.2.3', 'Solve problems involving kesatuan set.', 'Union of Sets', 'Operations on Sets'),
        ],
      },
      {
        kod: '4.3',
        tajuk: 'Combined Operations on Sets',
        spList: [
          makeEnglishSp('4.3.1', 'Menentu dan Describe gabungan operasi set menggunakan pelbagai perwakilan.', 'Combined Operations on Sets', 'Operations on Sets'),
          makeEnglishSp('4.3.2', 'Determine pelengkap bagi gabungan operasi set.', 'Combined Operations on Sets', 'Operations on Sets'),
          makeEnglishSp('4.3.3', 'Solve problems involving gabungan operasi set. 49 TAF.', 'Combined Operations on Sets', 'Operations on Sets'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B5_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 5,
    tema: 'Discrete Mathematics',
    tajuk: 'Network in Graph Theory',
    peneranganRingkas: 'Chapter 5 Mathematics Form 4: Network in Graph Theory (Discrete Mathematics)',
    skList: [
      {
        kod: '5.1',
        tajuk: 'Network',
        spList: [
          makeEnglishSp('5.1.1', 'Recognise dan menerangkan rangkaian sebagai graf.', 'Network', 'Network in Graph Theory'),
          makeEnglishSp('5.1.2', 'Membanding beza (i) Graf terarah dengan graf tak terarah. (ii) Graf berpemberat dengan graf tak berpemberat.', 'Network', 'Network in Graph Theory'),
          makeEnglishSp('5.1.3', 'Recognise dan melukis subgraf dan pokok.', 'Network', 'Network in Graph Theory'),
          makeEnglishSp('5.1.4', 'Represent information dalam bentuk rangkaian.', 'Network', 'Network in Graph Theory'),
          makeEnglishSp('5.1.5', 'Solve problems involving rangkaian. 53 TAFSI.', 'Network', 'Network in Graph Theory'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B6_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 6,
    tema: 'Relationship and Algebra',
    tajuk: 'Linear Inequalities in Two Variables',
    peneranganRingkas: 'Chapter 6 Mathematics Form 4: Linear Inequalities in Two Variables (Relationship and Algebra)',
    skList: [
      {
        kod: '6.1',
        tajuk: 'Linear Inequalities in Two Variables',
        spList: [
          makeEnglishSp('6.1.1', 'Represent situations dalam bentuk ketaksamaan linear.', 'Linear Inequalities in Two Variables', 'Linear Inequalities in Two Variables'),
          makeEnglishSp('6.1.2', 'Make and verify conjectures about titik dalam rantau dan penyelesaian bagi suatu ketaksamaan linear.', 'Linear Inequalities in Two Variables', 'Linear Inequalities in Two Variables'),
          makeEnglishSp('6.1.3', 'Determine dan melorek rantau yang memuaskan satu ketaksamaan linear.', 'Linear Inequalities in Two Variables', 'Linear Inequalities in Two Variables'),
        ],
      },
      {
        kod: '6.2',
        tajuk: 'Systems of Linear Inequalities in Two Variables',
        spList: [
          makeEnglishSp('6.2.1', 'Represent situations dalam bentuk sistem ketaksamaan linear.', 'Systems of Linear Inequalities in Two Variables', 'Linear Inequalities in Two Variables'),
          makeEnglishSp('6.2.2', 'Make and verify conjectures about titik dalam rantau dan penyelesaian bagi suatu sistem ketaksamaan linear.', 'Systems of Linear Inequalities in Two Variables', 'Linear Inequalities in Two Variables'),
          makeEnglishSp('6.2.3', 'Determine dan melorek rantau yang memuaskan satu sistem ketaksamaan linear.', 'Systems of Linear Inequalities in Two Variables', 'Linear Inequalities in Two Variables'),
          makeEnglishSp('6.2.4', 'Solve problems involving sistem ketaksamaan linear dalam dua pemboleh ubah. TAFSIRA.', 'Systems of Linear Inequalities in Two Variables', 'Linear Inequalities in Two Variables'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B7_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 7,
    tema: 'Relationship and Algebra',
    tajuk: 'Graphs of Motion',
    peneranganRingkas: 'Chapter 7 Mathematics Form 4: Graphs of Motion (Relationship and Algebra)',
    skList: [
      {
        kod: '7.1',
        tajuk: 'Distance-Time Graphs',
        spList: [
          makeEnglishSp('7.1.1', 'Draw graphs of jarak-masa.', 'Distance-Time Graphs', 'Graphs of Motion'),
          makeEnglishSp('7.1.2', 'Mentafsir graf jarak-masa dan Describe gerakan berdasarkan graf tersebut.', 'Distance-Time Graphs', 'Graphs of Motion'),
          makeEnglishSp('7.1.3', 'Solve problems involving graf jarak-masa.', 'Distance-Time Graphs', 'Graphs of Motion'),
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Speed-Time Graphs',
        spList: [
          makeEnglishSp('7.2.1', 'Draw graphs of laju-masa.', 'Speed-Time Graphs', 'Graphs of Motion'),
          makeEnglishSp('7.2.2', 'Make connections between luas di bawah graf laju-masa dengan jarak yang dilalui dan seterusnya menentukan jarak.', 'Speed-Time Graphs', 'Graphs of Motion'),
          makeEnglishSp('7.2.3', 'Mentafsir graf laju-masa dan Describe gerakan berdasarkan graf tersebut.', 'Speed-Time Graphs', 'Graphs of Motion'),
          makeEnglishSp('7.2.4', 'Solve problems involving graf laju-masa. 60 TAFSI.', 'Speed-Time Graphs', 'Graphs of Motion'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B8_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 8,
    tema: 'Statistics and Probability',
    tajuk: 'Measures of Dispersion for Ungrouped Data',
    peneranganRingkas: 'Chapter 8 Mathematics Form 4: Measures of Dispersion for Ungrouped Data (Statistics and Probability)',
    skList: [
      {
        kod: '8.1',
        tajuk: 'Dispersion',
        spList: [
          makeEnglishSp('8.1.1', 'Explain the meaning of serakan.', 'Dispersion', 'Measures of Dispersion for Ungrouped Data'),
          makeEnglishSp('8.1.2', 'Membanding dan mentafsir serakan dua atau lebih set data berdasarkan plot batang-dan-daun dan plot titik dan seterusnya Draw conclusion.', 'Dispersion', 'Measures of Dispersion for Ungrouped Data'),
        ],
      },
      {
        kod: '8.2',
        tajuk: 'Measures of Dispersion',
        spList: [
          makeEnglishSp('8.2.1', 'Menentukan julat, julat antara kuartil, varians dan sisihan piawai sebagai sukatan untuk Describe serakan bagi data tak terkumpul.', 'Measures of Dispersion', 'Measures of Dispersion for Ungrouped Data'),
          makeEnglishSp('8.2.2', 'Explain kelebihan dan kekurangan pelbagai sukatan serakan untuk menghuraikan data tak terkumpul.', 'Measures of Dispersion', 'Measures of Dispersion for Ungrouped Data'),
          makeEnglishSp('8.2.3', 'Construct dan mentafsir plot kotak bagi suatu set data tak terkumpul.', 'Measures of Dispersion', 'Measures of Dispersion for Ungrouped Data'),
          makeEnglishSp('8.2.4', 'Determine kesan perubahan data terhadap serakan berdasarkan: (i) Nilai sukatan serakan (ii) Perwakilan grafik.', 'Measures of Dispersion', 'Measures of Dispersion for Ungrouped Data'),
          makeEnglishSp('8.2.5', 'Membanding dan mentafsir dua atau lebih set data tak terkumpul, berdasarkan sukatan serakan yang sesuai dan seterusnya Draw conclusion.', 'Measures of Dispersion', 'Measures of Dispersion for Ungrouped Data'),
          makeEnglishSp('8.2.6', 'Solve problems involving sukatan serakan. TAFSI.', 'Measures of Dispersion', 'Measures of Dispersion for Ungrouped Data'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B9_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 9,
    tema: 'Statistics and Probability',
    tajuk: 'Probability of Combined Events',
    peneranganRingkas: 'Chapter 9 Mathematics Form 4: Probability of Combined Events (Statistics and Probability)',
    skList: [
      {
        kod: '9.1',
        tajuk: 'Combined Events',
        spList: [
          makeEnglishSp('9.1.1', 'Describe peristiwa bergabung dan menyenaraikan peristiwa bergabung yang mungkin.', 'Combined Events', 'Probability of Combined Events'),
        ],
      },
      {
        kod: '9.2',
        tajuk: 'Dependent and Independent Events',
        spList: [
          makeEnglishSp('9.2.1', 'Differentiate peristiwa bersandar dan peristiwa tak bersandar.', 'Dependent and Independent Events', 'Probability of Combined Events'),
          makeEnglishSp('9.2.2', 'Make and verify conjectures about rumus kebarangkalian peristiwa bergabung.', 'Dependent and Independent Events', 'Probability of Combined Events'),
          makeEnglishSp('9.2.3', 'Determine the probability of peristiwa bergabung bagi peristiwa bersandar dan peristiwa tak bersandar.', 'Dependent and Independent Events', 'Probability of Combined Events'),
        ],
      },
      {
        kod: '9.3',
        tajuk: 'Mutually Exclusive and Non-Mutually Exclusive Events',
        spList: [
          makeEnglishSp('9.3.1', 'Differentiate peristiwa saling eksklusif dan peristiwa tidak saling eksklusif.', 'Mutually Exclusive and Non-Mutually Exclusive Events', 'Probability of Combined Events'),
          makeEnglishSp('9.3.2', 'Mengesahkan rumus kebarangkalian peristiwa bergabung bagi peristiwa saling eksklusif dan peristiwa tidak saling eksklusif.', 'Mutually Exclusive and Non-Mutually Exclusive Events', 'Probability of Combined Events'),
          makeEnglishSp('9.3.3', 'Determine the probability of peristiwa bergabung bagi peristiwa saling eksklusif dan peristiwa tidak saling eksklusif.', 'Mutually Exclusive and Non-Mutually Exclusive Events', 'Probability of Combined Events'),
        ],
      },
      {
        kod: '9.4',
        tajuk: 'Application of Probability of Combined Events',
        spList: [
          makeEnglishSp('9.4.1', 'Solve problems involving kebarangkalian peristiwa bergabung. 70 TAFS.', 'Application of Probability of Combined Events', 'Probability of Combined Events'),
        ],
      },
    ],
  },
  {
    id: 'M_F4_B10_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 10,
    tema: 'Number and Operations',
    tajuk: 'Consumer Mathematics: Financial Management',
    peneranganRingkas: 'Chapter 10 Mathematics Form 4: Consumer Mathematics: Financial Management (Number and Operations)',
    skList: [
      {
        kod: '10.1',
        tajuk: 'Financial Planning and Management',
        spList: [
          makeEnglishSp('10.1.1', 'Describe the process of pengurusan kewangan yang berkesan.', 'Financial Planning and Management', 'Consumer Mathematics: Financial Management'),
          makeEnglishSp('10.1.2', 'Construct dan membentang pelan kewangan peribadi untuk mencapai matlamat kewangan jangka pendek dan jangka panjang, dan seterusnya menilai kebolehlaksanaan pelan kewangan tersebut. 74 TAFSIR.', 'Financial Planning and Management', 'Consumer Mathematics: Financial Management'),
        ],
      },
    ],
  },
];

export const DSKP_MATEMATIK_F5_DLP: BabMatematik[] = [
  {
    id: 'M_F5_B1_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 1,
    tema: 'Relationship and Algebra',
    tajuk: 'Variation',
    peneranganRingkas: 'Chapter 1 Mathematics Form 5: Variation (Relationship and Algebra)',
    skList: [
      {
        kod: '1.1',
        tajuk: 'Direct Variation',
        spList: [
          makeEnglishSp('1.1.1', 'Explain the meaning of ubahan langsung.', 'Direct Variation', 'Variation'),
          makeEnglishSp('1.1.2', 'Determine the relationship between antara dua pemboleh ubah bagi suatu ubahan langsung.', 'Direct Variation', 'Variation'),
          makeEnglishSp('1.1.3', 'Determine the relationship between antara tiga atau lebih pemboleh ubah bagi suatu ubahan tercantum.', 'Direct Variation', 'Variation'),
          makeEnglishSp('1.1.4', 'Solve problems involving ubahan langsung.', 'Direct Variation', 'Variation'),
        ],
      },
      {
        kod: '1.2',
        tajuk: 'Inverse Variation',
        spList: [
          makeEnglishSp('1.2.1', 'Explain the meaning of ubahan songsang.', 'Inverse Variation', 'Variation'),
          makeEnglishSp('1.2.2', 'Determine the relationship between antara dua pemboleh ubah bagi suatu ubahan songsang.', 'Inverse Variation', 'Variation'),
          makeEnglishSp('1.2.3', 'Solve problems involving ubahan songsang.', 'Inverse Variation', 'Variation'),
        ],
      },
      {
        kod: '1.3',
        tajuk: 'Combined Variation',
        spList: [
          makeEnglishSp('1.3.1', 'Determine the relationship between antara tiga atau lebih pemboleh ubah bagi suatu ubahan bergabung.', 'Combined Variation', 'Variation'),
          makeEnglishSp('1.3.2', 'Solve problems involving ubahan bergabung. 81 TAFSI.', 'Combined Variation', 'Variation'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B2_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 2,
    tema: 'Discrete Mathematics',
    tajuk: 'Matrices',
    peneranganRingkas: 'Chapter 2 Mathematics Form 5: Matrices (Discrete Mathematics)',
    skList: [
      {
        kod: '2.1',
        tajuk: 'Matrices',
        spList: [
          makeEnglishSp('2.1.1', 'Represent information situasi sebenar dalam bentuk matriks.', 'Matrices', 'Matrices'),
          makeEnglishSp('2.1.2', 'Menentukan peringkat matriks dan seterusnya Identify unsur tertentu dalam suatu matriks.', 'Matrices', 'Matrices'),
          makeEnglishSp('2.1.3', 'Determine sama ada dua matriks adalah sama.', 'Matrices', 'Matrices'),
        ],
      },
      {
        kod: '2.2',
        tajuk: 'Basic Operations on Matrices',
        spList: [
          makeEnglishSp('2.2.1', 'Add and subtract matrices.', 'Basic Operations on Matrices', 'Matrices'),
          makeEnglishSp('2.2.2', 'Mendarab matriks dengan suatu nombor.', 'Basic Operations on Matrices', 'Matrices'),
          makeEnglishSp('2.2.3', 'Mendarab dua matriks.', 'Basic Operations on Matrices', 'Matrices'),
          makeEnglishSp('2.2.4', 'Explain ciri-ciri matriks identiti.', 'Basic Operations on Matrices', 'Matrices'),
          makeEnglishSp('2.2.5', 'Explain the meaning of matriks songsang dan seterusnya menentukan matriks songsang bagi suatu matriks 2 ×.', 'Basic Operations on Matrices', 'Matrices'),
          makeEnglishSp('2.2.6', 'Menggunakan kaedah matriks untuk menyelesaikan persamaan linear serentak.', 'Basic Operations on Matrices', 'Matrices'),
          makeEnglishSp('2.2.7', 'Solve problems involving matriks. 86 TAFS.', 'Basic Operations on Matrices', 'Matrices'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B3_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 3,
    tema: 'Number and Operations',
    tajuk: 'Consumer Mathematics: Insurance',
    peneranganRingkas: 'Chapter 3 Mathematics Form 5: Consumer Mathematics: Insurance (Number and Operations)',
    skList: [
      {
        kod: '3.1',
        tajuk: 'Risk and Insurance Coverage',
        spList: [
          makeEnglishSp('3.1.1', 'Menjelaskan maksud risiko dan kepentingan perlindungan insurans, dan seterusnya Identify jenis insurans hayat dan insurans am bag melindungi pelbagai jenis risiko.', 'Risk and Insurance Coverage', 'Consumer Mathematics: Insurance'),
          makeEnglishSp('3.1.2', 'Mengkaji, Interpret dan membuat pengiraan yang melibatkan kadar dan premium insurans.', 'Risk and Insurance Coverage', 'Consumer Mathematics: Insurance'),
          makeEnglishSp('3.1.3', 'Solve problems involving insurans termasuk deduktibel dan ko- insurans. 90 TAFSI.', 'Risk and Insurance Coverage', 'Consumer Mathematics: Insurance'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B4_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 4,
    tema: 'Number and Operations',
    tajuk: 'Consumer Mathematics: Taxation',
    peneranganRingkas: 'Chapter 4 Mathematics Form 5: Consumer Mathematics: Taxation (Number and Operations)',
    skList: [
      {
        kod: '4.1',
        tajuk: 'Taxation',
        spList: [
          makeEnglishSp('4.1.1', 'Describe the purpose of percukaian.', 'Taxation', 'Consumer Mathematics: Taxation'),
          makeEnglishSp('4.1.2', 'Describe pelbagai cukai dan seterusnya kesan pengelakan cukai tersebut dari aspek perundangan dan kewangan.', 'Taxation', 'Consumer Mathematics: Taxation'),
          makeEnglishSp('4.1.3', 'Mengkaji, Interpret dan membuat pengiraan yang melibatkan pelbagai cukai.', 'Taxation', 'Consumer Mathematics: Taxation'),
          makeEnglishSp('4.1.4', 'Solve problems involving percukaian. 94 TAFSI.', 'Taxation', 'Consumer Mathematics: Taxation'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B5_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 5,
    tema: 'Measurement and Geometry',
    tajuk: 'Congruency, Enlargement and Combined Transformations',
    peneranganRingkas: 'Chapter 5 Mathematics Form 5: Congruency, Enlargement and Combined Transformations (Measurement and Geometry)',
    skList: [
      {
        kod: '5.1',
        tajuk: 'Congruency',
        spList: [
          makeEnglishSp('5.1.1', 'Differentiate between bentuk kongruen dan bukan Pengg kongruen berdasarkan sisi dan sudut.', 'Congruency', 'Congruency, Enlargement and Combined Transformations'),
          makeEnglishSp('5.1.2', 'Membuat dan Verify konjektur terhadap Aktiv kekongruenan segi tiga berdasarkan sisi dan sudut.', 'Congruency', 'Congruency, Enlargement and Combined Transformations'),
          makeEnglishSp('5.1.3', 'Solve problems involving kekongruenan.', 'Congruency', 'Congruency, Enlargement and Combined Transformations'),
        ],
      },
      {
        kod: '5.2',
        tajuk: 'Enlargement',
        spList: [
          makeEnglishSp('5.2.1', 'Explain the concept of keserupaan objek geometri.', 'Enlargement', 'Congruency, Enlargement and Combined Transformations'),
          makeEnglishSp('5.2.2', 'Membuat perkaitan antara keserupaan dengan pembesaran dan seterusnya Describe pembesaran menggunakan pelbagai perwakilan.', 'Enlargement', 'Congruency, Enlargement and Combined Transformations'),
          makeEnglishSp('5.2.3', 'Determine images and objects of bagi suatu pembesaran.', 'Enlargement', 'Congruency, Enlargement and Combined Transformations'),
          makeEnglishSp('5.2.4', 'Make and verify conjectures about hubungan antara luas imej dan luas objek bagi suatu pembesaran.', 'Enlargement', 'Congruency, Enlargement and Combined Transformations'),
          makeEnglishSp('5.2.5', 'Solve problems involving pembesaran.', 'Enlargement', 'Congruency, Enlargement and Combined Transformations'),
        ],
      },
      {
        kod: '5.3',
        tajuk: 'Combined Transformations',
        spList: [
          makeEnglishSp('5.3.1', 'Determine images and objects of bagi suatu gabungan transformasi.', 'Combined Transformations', 'Congruency, Enlargement and Combined Transformations'),
          makeEnglishSp('5.3.2', 'Make and verify conjectures about sifat kalis tukar tertib terhadap gabungan transformasi.', 'Combined Transformations', 'Congruency, Enlargement and Combined Transformations'),
          makeEnglishSp('5.3.3', 'Describe gabungan transformasi.', 'Combined Transformations', 'Congruency, Enlargement and Combined Transformations'),
          makeEnglishSp('5.3.4', 'Solve problems involving gabungan transformasi.', 'Combined Transformations', 'Congruency, Enlargement and Combined Transformations'),
        ],
      },
      {
        kod: '5.4',
        tajuk: 'Tessellation',
        spList: [
          makeEnglishSp('5.4.1', 'Explain the concept of teselasi.', 'Tessellation', 'Congruency, Enlargement and Combined Transformations'),
          makeEnglishSp('5.4.2', 'Mereka bentuk teselasi yang melibatkan transformasi isometri. 100 TAFSI.', 'Tessellation', 'Congruency, Enlargement and Combined Transformations'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B6_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 6,
    tema: 'Measurement and Geometry',
    tajuk: 'Ratios and Graphs of Trigonometric Functions',
    peneranganRingkas: 'Chapter 6 Mathematics Form 5: Ratios and Graphs of Trigonometric Functions (Measurement and Geometry)',
    skList: [
      {
        kod: '6.1',
        tajuk: 'Values of Sine, Cosine and Tangent for Angles θ',
        spList: [
          makeEnglishSp('6.1.1', 'Make and verify conjectures about nilai sinus, kosinus dan tangen sudut dalam sukuan II, III dan IV dengan sudut rujukan sepadan.', 'Values of Sine, Cosine and Tangent for Angles θ', 'Ratios and Graphs of Trigonometric Functions'),
          makeEnglishSp('6.1.2', 'Determine the value of sinus, kosinus dan tangen bagi sudut dalam sukuan II, III dan IV berdasarkan sudut rujukan sepadan.', 'Values of Sine, Cosine and Tangent for Angles θ', 'Ratios and Graphs of Trigonometric Functions'),
          makeEnglishSp('6.1.3', 'Determine sudut apabila nilai sinus, kosinus dan tangen sudut tersebut diberi.', 'Values of Sine, Cosine and Tangent for Angles θ', 'Ratios and Graphs of Trigonometric Functions'),
          makeEnglishSp('6.1.4', 'Solve problems involving sinus, kosinus dan tangen.', 'Values of Sine, Cosine and Tangent for Angles θ', 'Ratios and Graphs of Trigonometric Functions'),
        ],
      },
      {
        kod: '6.2',
        tajuk: 'Graphs of Sine, Cosine and Tangent Functions',
        spList: [
          makeEnglishSp('6.2.1', 'Draw graphs of fungsi trigonometri, , dan bagi 0 ≤ x ≤ 360 membandingbezakan ciri-ciri graf fungsi tersebut.', 'Graphs of Sine, Cosine and Tangent Functions', 'Ratios and Graphs of Trigonometric Functions'),
          makeEnglishSp('6.2.2', 'Mengkaji dan Make generalisations about kesan perubahan pemalar a, b dan c bagi graf fungsi trigonometri: (i) y = a sin bx + c (ii) y = a kos bx + c (iii) y = a tan bx + c bagi a > 0, b >.', 'Graphs of Sine, Cosine and Tangent Functions', 'Ratios and Graphs of Trigonometric Functions'),
          makeEnglishSp('6.2.3', 'Solve problems involving graf fungsi sinus, kosinus dan tangen. 105 TAF.', 'Graphs of Sine, Cosine and Tangent Functions', 'Ratios and Graphs of Trigonometric Functions'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B7_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 7,
    tema: 'Statistics and Probability',
    tajuk: 'Measures of Dispersion for Grouped Data',
    peneranganRingkas: 'Chapter 7 Mathematics Form 5: Measures of Dispersion for Grouped Data (Statistics and Probability)',
    skList: [
      {
        kod: '7.1',
        tajuk: 'Dispersion',
        spList: [
          makeEnglishSp('7.1.1', 'Construct histograms dan poligon kekerapan bagi suatu set data terkumpul.', 'Dispersion', 'Measures of Dispersion for Grouped Data'),
          makeEnglishSp('7.1.2', 'Membanding dan mentafsir serakan dua atau lebih set data terkumpul berdasarkan histogram dan poligon kekerapan dan seterusnya Draw conclusion.', 'Dispersion', 'Measures of Dispersion for Grouped Data'),
          makeEnglishSp('7.1.3', 'Construct ogif bagi suatu set data terkumpul dan seterusnya menentukan kuartil. viii.', 'Dispersion', 'Measures of Dispersion for Grouped Data'),
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Measures of Dispersion',
        spList: [
          makeEnglishSp('7.2.1', 'Menentukan julat, julat antara kuartil, varians dan sisihan piawai sebagai sukatan untuk Describe serakan bagi data terkumpul.', 'Measures of Dispersion', 'Measures of Dispersion for Grouped Data'),
          makeEnglishSp('7.2.2', 'Construct dan mentafsir plot kotak bagi suatu set data terkumpul.', 'Measures of Dispersion', 'Measures of Dispersion for Grouped Data'),
          makeEnglishSp('7.2.3', 'Membanding dan mentafsir dua atau lebih set data terkumpul, berdasarkan sukatan serakan yang sesuai dan seterusnya Draw conclusion.', 'Measures of Dispersion', 'Measures of Dispersion for Grouped Data'),
          makeEnglishSp('7.2.4', 'Solve problems involving sukatan serakan bagi data terkumpul.', 'Measures of Dispersion', 'Measures of Dispersion for Grouped Data'),
          makeEnglishSp('7.2.5', 'Mereka bentuk dan Perform suatu projek mini yang melibatkan penyiasatan statistik berdasarkan sukatan kecenderungan memusat dan sukatan serakan serta mentafsir dan mengkomunikasikan dapatan kajian. 110 TAFS.', 'Measures of Dispersion', 'Measures of Dispersion for Grouped Data'),
        ],
      },
    ],
  },
  {
    id: 'M_F5_B8_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 8,
    tema: 'Mathematical Applications',
    tajuk: 'Mathematical Modeling',
    peneranganRingkas: 'Chapter 8 Mathematics Form 5: Mathematical Modeling (Mathematical Applications)',
    skList: [
      {
        kod: '8.1',
        tajuk: 'Mathematical Modeling',
        spList: [
          makeEnglishSp('8.1.1', 'Explain pemodelan matematik.', 'Mathematical Modeling', 'Mathematical Modeling'),
          makeEnglishSp('8.1.2', 'Solve problems involving kehidupan sebenar melalui pemodelan matematik yang melibatkan fungsi: (i) Linear (ii) Kuadratik (iii) Eksponen dan mengkomunikasikan proses pemodelan matematik yang dilaksanakan. 114 TAFSI.', 'Mathematical Modeling', 'Mathematical Modeling'),
        ],
      },
    ],
  },
];

export const DSKP_MATEMATIK_DLP: BabMatematik[] = [
  ...DSKP_MATEMATIK_F2_DLP,
  ...DSKP_MATEMATIK_F3_DLP,
  ...DSKP_MATEMATIK_F4_DLP,
  ...DSKP_MATEMATIK_F5_DLP,
];
