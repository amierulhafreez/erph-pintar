import { BabKimia, StandardPembelajaran } from '../../../types/rph';

function makeEnglishSp(
  kod: string,
  tajuk: string,
  skTajuk: string,
  babTajuk: string
): StandardPembelajaran {
  const cleanTitle = tajuk.replace(/\.$/, '');
  const lowerTitle = cleanTitle.charAt(0).toLowerCase() + cleanTitle.slice(1);
  return {
    kod,
    tajuk,
    objektifCadangan: [
      `By the end of the lesson, pupils are able to ${lowerTitle} accurately according to the KSSM Additional Mathematics curriculum specifications.`,
      `Apply the concept of ${skTajuk.toLowerCase()} to solve at least 3 numerical exercises and non-routine mathematical problems correctly.`,
    ],
    kriteriaKejayaanCadangan: [
      `Pupils can explain mathematical concepts and calculation steps for LS ${kod} (${cleanTitle}) clearly.`,
      `Pupils correctly solve at least 3 out of 4 practice problems related to ${skTajuk.toLowerCase()} with systematic working steps.`,
    ],
    cadanganAktiviti: {
      setInduksi: `Teacher presents a real-world scenario or intriguing problem related to ${skTajuk} (${babTajuk}) to stimulate critical thinking.`,
      aktivitiUtama: [
        `1. Teacher explains core mathematical concepts, rules, and formulae for LS ${kod}: ${cleanTitle} through step-by-step worked examples.`,
        '2. 21st Century Learning (PAK-21) Activity: Pupils collaborate in small groups to solve guided problems and discuss strategies.',
        '3. Group representatives present mathematical solutions on the board / GeoGebra and receive constructive feedback from peers and the teacher.',
      ],
      penutup: `Exit Ticket: Pupils summarise key concepts of LS ${kod} and solve one rapid problem check.`,
      aktiviti5E: {
        engage: `Teacher introduces real-life applications of ${skTajuk} to arouse curiosity and show the practical relevance of additional mathematics.`,
        explore: `Pupils explore patterns, formulas, or relationships using guided investigative worksheets or dynamic mathematical tools (GeoGebra/Scientific Calculator).`,
        explain: `Pupils present and justify their mathematical reasoning while teacher clarifies concepts and addresses misconceptions.`,
        elaborate: `Pupils apply ${skTajuk} concepts to solve higher-order thinking (HOTS) and SPM-level non-routine problems.`,
        evaluate: `Teacher assesses pupils' understanding through formative questions and evaluates the precision of their mathematical steps.`,
      },
    },
    bbmCadangan: [
      'KSSM Additional Mathematics Textbook',
      'Scientific Calculator',
      'Graph Paper / Guided Worksheet',
      'Dynamic Geometry Software (GeoGebra / Desmos)',
    ],
  };
}

export const DSKP_ADDMATH_F4_DLP: BabKimia[] = [
  {
    id: 'AM_F4_B1_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 1,
    tema: 'Algebra',
    tajuk: 'Functions',
    peneranganRingkas: 'Chapter 1 Additional Mathematics Form 4: Functions (Algebra)',
    skList: [
      {
        kod: '1.1',
        tajuk: 'Functions',
        spList: [
          makeEnglishSp('1.1.1', 'Explain function using graphical representations and notations.', 'Functions', 'Functions'),
          makeEnglishSp('1.1.2', 'Determine domain and range of a function.', 'Functions', 'Functions'),
          makeEnglishSp('1.1.3', 'Determine the image of a function when the object is given and vice versa.', 'Functions', 'Functions'),
        ],
      },
      {
        kod: '1.2',
        tajuk: 'Composite Functions',
        spList: [
          makeEnglishSp('1.2.1', 'Describe the outcome of composition of two functions.', 'Composite Functions', 'Functions'),
          makeEnglishSp('1.2.2', 'Determine the composite functions.', 'Composite Functions', 'Functions'),
          makeEnglishSp('1.2.3', 'Determine the image of composite functions given the object and vice versa.', 'Composite Functions', 'Functions'),
          makeEnglishSp('1.2.4', 'Determine a related function given composite function and another function.', 'Composite Functions', 'Functions'),
          makeEnglishSp('1.2.5', 'Solve problems involving composite functions.', 'Composite Functions', 'Functions'),
        ],
      },
      {
        kod: '1.3',
        tajuk: 'Inverse Functions',
        spList: [
          makeEnglishSp('1.3.1', 'Describe inverse of a function.', 'Inverse Functions', 'Functions'),
          makeEnglishSp('1.3.2', 'Make and verify conjectures related to properties of inverse functions.', 'Inverse Functions', 'Functions'),
          makeEnglishSp('1.3.3', 'Determine the inverse functions.', 'Inverse Functions', 'Functions'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B2_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 2,
    tema: 'Algebra',
    tajuk: 'Quadratic Functions',
    peneranganRingkas: 'Chapter 2 Additional Mathematics Form 4: Quadratic Functions (Algebra)',
    skList: [
      {
        kod: '2.1',
        tajuk: 'Quadratic Equations and Inequalities',
        spList: [
          makeEnglishSp('2.1.1', 'Solve quadratic equations using the method of completing the square and formula.', 'Quadratic Equations and Inequalities', 'Quadratic Functions'),
          makeEnglishSp('2.1.2', 'Form quadratic equations from given roots.', 'Quadratic Equations and Inequalities', 'Quadratic Functions'),
          makeEnglishSp('2.1.3', 'Solve quadratic inequalities.', 'Quadratic Equations and Inequalities', 'Quadratic Functions'),
        ],
      },
      {
        kod: '2.2',
        tajuk: 'Types of Roots of Quadratic Equations',
        spList: [
          makeEnglishSp('2.2.1', 'Relate types of roots of quadratic equations to the discriminant value.', 'Types of Roots of Quadratic Equations', 'Quadratic Functions'),
          makeEnglishSp('2.2.2', 'Solve problems involving types of roots of quadratic equations.', 'Types of Roots of Quadratic Equations', 'Quadratic Functions'),
        ],
      },
      {
        kod: '2.3',
        tajuk: 'Quadratic Functions',
        spList: [
          makeEnglishSp('2.3.1', 'Analyse and make generalisation about the effects of changes of towards the shape and position of the graph.', 'Quadratic Functions', 'Quadratic Functions'),
          makeEnglishSp('2.3.2', 'Relate the position of the graph of quadratic functions with type of roots.', 'Quadratic Functions', 'Quadratic Functions'),
          makeEnglishSp('2.3.3', 'Relate the vertex form of quadratic functions, with other forms of quadratic functions.', 'Quadratic Functions', 'Quadratic Functions'),
          makeEnglishSp('2.3.4', 'Analyse and make generalisation about the effects of changes of functions shape and position of the graphs.', 'Quadratic Functions', 'Quadratic Functions'),
          makeEnglishSp('2.3.5', 'Sketch graphs of quadratic functions.', 'Quadratic Functions', 'Quadratic Functions'),
          makeEnglishSp('2.3.6', 'Solve problems involving quadratic functions.', 'Quadratic Functions', 'Quadratic Functions'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B3_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 3,
    tema: 'Algebra',
    tajuk: 'Systems of Equations',
    peneranganRingkas: 'Chapter 3 Additional Mathematics Form 4: Systems of Equations (Algebra)',
    skList: [
      {
        kod: '3.1',
        tajuk: 'Systems of Linear Equations in Three Variables',
        spList: [
          makeEnglishSp('3.1.1', 'Describe systems of linear equations in three variables.', 'Systems of Linear Equations in Three Variables', 'Systems of Equations'),
          makeEnglishSp('3.1.2', 'Solve systems of linear equations in three variables.', 'Systems of Linear Equations in Three Variables', 'Systems of Equations'),
          makeEnglishSp('3.1.3', 'Solve problems involving systems of linear equations in three variables.', 'Systems of Linear Equations in Three Variables', 'Systems of Equations'),
        ],
      },
      {
        kod: '3.2',
        tajuk: 'Simultaneous Equations Involving One Linear Equation and One Non-Linear Equation',
        spList: [
          makeEnglishSp('3.2.1', 'Solve simultaneous equations involving one Non-.', 'Simultaneous Equations Involving One Linear Equation and One Non-Linear Equation', 'Systems of Equations'),
          makeEnglishSp('3.2.2', 'Solve problems involving simultaneous equations; one linear equation and one non- linear equation.', 'Simultaneous Equations Involving One Linear Equation and One Non-Linear Equation', 'Systems of Equations'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B4_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 4,
    tema: 'Algebra',
    tajuk: 'Indices, Surds and Logarithms',
    peneranganRingkas: 'Chapter 4 Additional Mathematics Form 4: Indices, Surds and Logarithms (Algebra)',
    skList: [
      {
        kod: '4.1',
        tajuk: 'Laws of Indices',
        spList: [
          makeEnglishSp('4.1.1', 'Simplify algebraic expressions involving indices using the laws of indices.', 'Laws of Indices', 'Indices, Surds and Logarithms'),
          makeEnglishSp('4.1.2', 'Solve problems involving indices.', 'Laws of Indices', 'Indices, Surds and Logarithms'),
        ],
      },
      {
        kod: '4.2',
        tajuk: 'Laws of Surds',
        spList: [
          makeEnglishSp('4.2.1', 'Compare rational numbers and irrational numbers, and hence relate surds to irrational numbers.', 'Laws of Surds', 'Indices, Surds and Logarithms'),
          makeEnglishSp('4.2.2', 'Make and verify conjectures on (i) (ii) and hence make generalisation.', 'Laws of Surds', 'Indices, Surds and Logarithms'),
          makeEnglishSp('4.2.3', 'Simplify expressions involving surds.', 'Laws of Surds', 'Indices, Surds and Logarithms'),
          makeEnglishSp('4.2.4', 'Simplify expressions involving surds by rationalising the denominators.', 'Laws of Surds', 'Indices, Surds and Logarithms'),
          makeEnglishSp('4.2.5', 'Solve problems involving surds.', 'Laws of Surds', 'Indices, Surds and Logarithms'),
        ],
      },
      {
        kod: '4.3',
        tajuk: 'Laws of Logarithms',
        spList: [
          makeEnglishSp('4.3.1', 'Relate equations in the form of indices and logarithms, and hence determine the logarithm of a number.', 'Laws of Logarithms', 'Indices, Surds and Logarithms'),
          makeEnglishSp('4.3.2', 'Prove laws of logarithms.', 'Laws of Logarithms', 'Indices, Surds and Logarithms'),
          makeEnglishSp('4.3.3', 'Simplify algebraic expressions using the laws of logarithms.', 'Laws of Logarithms', 'Indices, Surds and Logarithms'),
          makeEnglishSp('4.3.4', 'Prove relationship to determine the logarithm of a number.', 'Laws of Logarithms', 'Indices, Surds and Logarithms'),
          makeEnglishSp('4.3.5', 'Solve problems involving the laws of.', 'Laws of Logarithms', 'Indices, Surds and Logarithms'),
        ],
      },
      {
        kod: '4.4',
        tajuk: 'Applications of Indices, Surds and Logarithms',
        spList: [
          makeEnglishSp('4.4.1', 'Solve problems involving indices, surds and logarithms.', 'Applications of Indices, Surds and Logarithms', 'Indices, Surds and Logarithms'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B5_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 5,
    tema: 'Algebra',
    tajuk: 'Progressions',
    peneranganRingkas: 'Chapter 5 Additional Mathematics Form 4: Progressions (Algebra)',
    skList: [
      {
        kod: '5.1',
        tajuk: 'Arithmetic Progressions',
        spList: [
          makeEnglishSp('5.1.1', 'Identify a sequence as an arithmetic progression and provide justification.', 'Arithmetic Progressions', 'Progressions'),
          makeEnglishSp('5.1.2', 'Derive the formula of the nth term, Tn, of arithmetic progressions, and hence use the formula in various situations.', 'Arithmetic Progressions', 'Progressions'),
          makeEnglishSp('5.1.3', 'Derive the formula of sum of the first n terms, Sn, of arithmetic progressions, and hence use the formula in various situations.', 'Arithmetic Progressions', 'Progressions'),
          makeEnglishSp('5.1.4', 'Solve problems involving arithmetic progressions.', 'Arithmetic Progressions', 'Progressions'),
        ],
      },
      {
        kod: '5.2',
        tajuk: 'Geometric Progressions',
        spList: [
          makeEnglishSp('5.2.1', 'Identify a sequence as a geometric progression and provide justification.', 'Geometric Progressions', 'Progressions'),
          makeEnglishSp('5.2.2', 'Derive the formula of the nth term, Tn, of geometric progressions, and hence use the formula in various situations.', 'Geometric Progressions', 'Progressions'),
          makeEnglishSp('5.2.3', 'Derive the formula of sum of the first n terms, Sn, of geometric hence use the formula in various situations.', 'Geometric Progressions', 'Progressions'),
          makeEnglishSp('5.2.4', 'Determine the sum to infinity of geometric progressions, in various situations.', 'Geometric Progressions', 'Progressions'),
          makeEnglishSp('5.2.5', 'Solve problems involving geometric progressions.', 'Geometric Progressions', 'Progressions'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B6_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 6,
    tema: 'Geometry',
    tajuk: 'Linear Law',
    peneranganRingkas: 'Chapter 6 Additional Mathematics Form 4: Linear Law (Geometry)',
    skList: [
      {
        kod: '6.1',
        tajuk: 'Linear and Non-Linear Relations',
        spList: [
          makeEnglishSp('6.1.1', 'Differentiate between linear and non-linear relations based on tables of data and graphs.', 'Linear and Non-Linear Relations', 'Linear Law'),
          makeEnglishSp('6.1.2', 'Draw lines of best fit for graph of linear relations with and without the use of digita technology.', 'Linear and Non-Linear Relations', 'Linear Law'),
          makeEnglishSp('6.1.3', 'Form equations of lines of best fit.', 'Linear and Non-Linear Relations', 'Linear Law'),
          makeEnglishSp('6.1.4', 'Interpret information based on lines of best fit.', 'Linear and Non-Linear Relations', 'Linear Law'),
        ],
      },
      {
        kod: '6.2',
        tajuk: 'Linear Law and Non-Linear Relations',
        spList: [
          makeEnglishSp('6.2.1', 'Apply linear law to non-linear relations.', 'Linear Law and Non-Linear Relations', 'Linear Law'),
        ],
      },
      {
        kod: '6.3',
        tajuk: 'Application of Linear Law',
        spList: [
          makeEnglishSp('6.3.1', 'Solve problems involving linear law.', 'Application of Linear Law', 'Linear Law'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B7_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 7,
    tema: 'Geometry',
    tajuk: 'Coordinate Geometry',
    peneranganRingkas: 'Chapter 7 Additional Mathematics Form 4: Coordinate Geometry (Geometry)',
    skList: [
      {
        kod: '7.1',
        tajuk: 'Divisor of a Line Segment',
        spList: [
          makeEnglishSp('7.1.1', 'Relate the position of a point that divides a line segment with the related ratio.', 'Divisor of a Line Segment', 'Coordinate Geometry'),
          makeEnglishSp('7.1.2', 'Derive the formula for divisor of a line segment on a Cartesian plane, and hence use the formula in various situations.', 'Divisor of a Line Segment', 'Coordinate Geometry'),
          makeEnglishSp('7.1.3', 'Solve problems involving divisor of a line segment.', 'Divisor of a Line Segment', 'Coordinate Geometry'),
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Parallel and Perpendicular Lines',
        spList: [
          makeEnglishSp('7.2.1', 'Make and verify conjectures about gradient of: (ii) perpendicular lines and hence, make generalisations.', 'Parallel and Perpendicular Lines', 'Coordinate Geometry'),
          makeEnglishSp('7.2.2', 'Solve problems involving equations of parallel and perpendicular lines.', 'Parallel and Perpendicular Lines', 'Coordinate Geometry'),
        ],
      },
      {
        kod: '7.3',
        tajuk: 'Areas of Polygons',
        spList: [
          makeEnglishSp('7.3.1', 'Derive the formula of area of triangles when the coordinates of each vertex are known.', 'Areas of Polygons', 'Coordinate Geometry'),
          makeEnglishSp('7.3.2', 'Determine the area of triangles by using the formula.', 'Areas of Polygons', 'Coordinate Geometry'),
          makeEnglishSp('7.3.3', 'Determine the area of quadrilaterals by using the formula.', 'Areas of Polygons', 'Coordinate Geometry'),
          makeEnglishSp('7.3.4', 'Make generalisation about the formula of area of polygons when the coordinates of each vertex are known, and hence use the formula to determine the area of polygons.', 'Areas of Polygons', 'Coordinate Geometry'),
          makeEnglishSp('7.3.5', 'Solve problems involving areas of polygons.', 'Areas of Polygons', 'Coordinate Geometry'),
        ],
      },
      {
        kod: '7.4',
        tajuk: 'Equations of Loci',
        spList: [
          makeEnglishSp('7.4.1', 'Represent graphically, the locus that satisfies these conditions: (i) the distance of a moving point from a fixed point is constant, (ii) the ratio of a moving point from two fixed points is constant, and hence determine the equation of the locus.', 'Equations of Loci', 'Coordinate Geometry'),
          makeEnglishSp('7.4.2', 'Solve problems involving equations of loci.', 'Equations of Loci', 'Coordinate Geometry'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B8_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 8,
    tema: 'Geometry',
    tajuk: 'Vectors',
    peneranganRingkas: 'Chapter 8 Additional Mathematics Form 4: Vectors (Geometry)',
    skList: [
      {
        kod: '8.1',
        tajuk: 'Vectors',
        spList: [
          makeEnglishSp('8.1.1', 'Compare and contrast between vectors and scalars, and hence identify whether a quantity is a vector or a scalar by providing justifications.', 'Vectors', 'Vectors'),
          makeEnglishSp('8.1.2', 'Represent vectors by using directed line segments and vector notations, and hence determine the magnitude and direction of vectors.', 'Vectors', 'Vectors'),
          makeEnglishSp('8.1.3', 'Make and verify conjectures about the properties of scalar multiplication on vectors.', 'Vectors', 'Vectors'),
          makeEnglishSp('8.1.4', 'Make and verify conjectures about parallel vectors.', 'Vectors', 'Vectors'),
        ],
      },
      {
        kod: '8.2',
        tajuk: 'Addition and Subtraction of Vectors',
        spList: [
          makeEnglishSp('8.2.1', 'Perform addition and substraction involving two or more vectors to obtain a resultant vector.', 'Addition and Subtraction of Vectors', 'Vectors'),
          makeEnglishSp('8.2.2', 'Solve problems involving vectors.', 'Addition and Subtraction of Vectors', 'Vectors'),
        ],
      },
      {
        kod: '8.3',
        tajuk: 'Vectors in a Cartesian Plane',
        spList: [
          makeEnglishSp('8.3.1', 'Represent vectors and determine the magnitude of the vectors in the Cartesian plane.', 'Vectors in a Cartesian Plane', 'Vectors'),
          makeEnglishSp('8.3.2', 'Describe and determine the unit vector in the direction of a vector.', 'Vectors in a Cartesian Plane', 'Vectors'),
          makeEnglishSp('8.3.3', 'Perform arithmetic operations onto two or more vectors.', 'Vectors in a Cartesian Plane', 'Vectors'),
          makeEnglishSp('8.3.4', 'Solve problems involving vectors.', 'Vectors in a Cartesian Plane', 'Vectors'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B9_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 9,
    tema: 'Trigonometry',
    tajuk: 'Solution of Triangles',
    peneranganRingkas: 'Chapter 9 Additional Mathematics Form 4: Solution of Triangles (Trigonometry)',
    skList: [
      {
        kod: '9.1',
        tajuk: 'Sine Rule',
        spList: [
          makeEnglishSp('9.1.1', 'Make and verify conjectures on the relationship between the ratio of length of opposite angles, and hence define the sine rule.', 'Sine Rule', 'Solution of Triangles'),
          makeEnglishSp('9.1.2', 'Solve triangles involving sine rule.', 'Sine Rule', 'Solution of Triangles'),
          makeEnglishSp('9.1.3', 'Determine the existence of ambiguous case of a triangle, and hence identify the conditions for such cases.', 'Sine Rule', 'Solution of Triangles'),
          makeEnglishSp('9.1.4', 'Solve triangles involving ambiguous cases.', 'Sine Rule', 'Solution of Triangles'),
          makeEnglishSp('9.1.5', 'Solve problems related to triangles using the sine rule.', 'Sine Rule', 'Solution of Triangles'),
        ],
      },
      {
        kod: '9.2',
        tajuk: 'Cosine Rule',
        spList: [
          makeEnglishSp('9.2.1', 'Verify the cosine rule.', 'Cosine Rule', 'Solution of Triangles'),
          makeEnglishSp('9.2.2', 'Solve triangles involving the cosine rule.', 'Cosine Rule', 'Solution of Triangles'),
          makeEnglishSp('9.2.3', 'Solve problems involving the cosine rule.', 'Cosine Rule', 'Solution of Triangles'),
        ],
      },
      {
        kod: '9.3',
        tajuk: 'Area of a Triangle',
        spList: [
          makeEnglishSp('9.3.1', 'Derive the formula for area of triangles, and hence determine the area of a triangle.', 'Area of a Triangle', 'Solution of Triangles'),
          makeEnglishSp('9.3.2', 'Determine the area of a triangle using the Heron’s formula.', 'Area of a Triangle', 'Solution of Triangles'),
          makeEnglishSp('9.3.3', 'Solve problems involving areas of triangles.', 'Area of a Triangle', 'Solution of Triangles'),
        ],
      },
      {
        kod: '9.4',
        tajuk: 'Application of Sine Rule, Cosine Rule and Area of a Triangle',
        spList: [
          makeEnglishSp('9.4.1', 'Solve problems involving triangles.', 'Application of Sine Rule, Cosine Rule and Area of a Triangle', 'Solution of Triangles'),
        ],
      },
    ],
  },
  {
    id: 'AM_F4_B10_DLP',
    tingkatan: 'Tingkatan 4',
    nomborBab: 10,
    tema: 'Statistics',
    tajuk: 'Index Numbers',
    peneranganRingkas: 'Chapter 10 Additional Mathematics Form 4: Index Numbers (Statistics)',
    skList: [
      {
        kod: '10.1',
        tajuk: 'Index Numbers',
        spList: [
          makeEnglishSp('10.1.1', 'Define index numbers and describe the use of it.', 'Index Numbers', 'Index Numbers'),
          makeEnglishSp('10.1.2', 'Determine and interpret index numbers.', 'Index Numbers', 'Index Numbers'),
          makeEnglishSp('10.1.3', 'Solve problems involving index numbers.', 'Index Numbers', 'Index Numbers'),
        ],
      },
      {
        kod: '10.2',
        tajuk: 'Composite Index',
        spList: [
          makeEnglishSp('10.2.1', 'Determine and interpret composite index with and without the weightage.', 'Composite Index', 'Index Numbers'),
          makeEnglishSp('10.2.2', 'Solve problems involving index numbers and composite index.', 'Composite Index', 'Index Numbers'),
        ],
      },
    ],
  },
];

export const DSKP_ADDMATH_F5_DLP: BabKimia[] = [
  {
    id: 'AM_F5_B1_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 1,
    tema: 'Trigonometry',
    tajuk: 'Circular Measure',
    peneranganRingkas: 'Chapter 1 Additional Mathematics Form 5: Circular Measure (Trigonometry)',
    skList: [
      {
        kod: '1.1',
        tajuk: 'Radian',
        spList: [
          makeEnglishSp('1.1.1', 'Relate angle measurement in radian and degree.', 'Radian', 'Circular Measure'),
        ],
      },
      {
        kod: '1.2',
        tajuk: 'Arc Length of a Circle',
        spList: [
          makeEnglishSp('1.2.1', 'Determine (i) (ii) radius, and (iii) angle subtended at the centre of a c.', 'Arc Length of a Circle', 'Circular Measure'),
          makeEnglishSp('1.2.2', 'Determine perimeter of segment of a circle.', 'Arc Length of a Circle', 'Circular Measure'),
          makeEnglishSp('1.2.3', 'Solve problems involving arc length.', 'Arc Length of a Circle', 'Circular Measure'),
        ],
      },
      {
        kod: '1.3',
        tajuk: 'Area of Sector of a Circle',
        spList: [
          makeEnglishSp('1.3.1', 'Determine (i) area of sector, (ii) radius, and (iii) angle subtended at the centre of a c.', 'Area of Sector of a Circle', 'Circular Measure'),
          makeEnglishSp('1.3.2', 'Determine the area of segment of a circle.', 'Area of Sector of a Circle', 'Circular Measure'),
          makeEnglishSp('1.3.3', 'Solve problems involving areas of sectors.', 'Area of Sector of a Circle', 'Circular Measure'),
        ],
      },
      {
        kod: '1.4',
        tajuk: 'Application of Circular Measures',
        spList: [
          makeEnglishSp('1.4.1', 'Solve problems involving circular measure.', 'Application of Circular Measures', 'Circular Measure'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B2_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 2,
    tema: 'Calculus',
    tajuk: 'Differentiation',
    peneranganRingkas: 'Chapter 2 Additional Mathematics Form 5: Differentiation (Calculus)',
    skList: [
      {
        kod: '2.1',
        tajuk: 'Limit and its Relation to Differentiation',
        spList: [
          makeEnglishSp('2.1.1', 'Investigate and determine the value of limit of a.', 'Limit and its Relation to Differentiation', 'Differentiation'),
          makeEnglishSp('2.1.2', 'Determine the first derivative of a function f(x) by using the first principle.', 'Limit and its Relation to Differentiation', 'Differentiation'),
        ],
      },
      {
        kod: '2.2',
        tajuk: 'The First Derivative',
        spList: [
          makeEnglishSp('2.2.1', 'Derive the formula of first derivative inductively for the function is an integer.', 'The First Derivative', 'Differentiation'),
          makeEnglishSp('2.2.2', 'Determine the first derivative of an algebraic function.', 'The First Derivative', 'Differentiation'),
          makeEnglishSp('2.2.3', 'Determine the first derivative of composite function.', 'The First Derivative', 'Differentiation'),
          makeEnglishSp('2.2.4', 'Determine the first derivative of a function involving expressions.', 'The First Derivative', 'Differentiation'),
        ],
      },
      {
        kod: '2.3',
        tajuk: 'The Second Derivative',
        spList: [
          makeEnglishSp('2.3.1', 'Determine the second derivative of an algebraic function.', 'The Second Derivative', 'Differentiation'),
        ],
      },
      {
        kod: '2.4',
        tajuk: 'Application of Differentiation',
        spList: [
          makeEnglishSp('2.4.1', 'Interpret gradient of tangent to a curve at different points.', 'Application of Differentiation', 'Differentiation'),
          makeEnglishSp('2.4.2', 'Determine equation of tangent and normal to a curve at a point.', 'Application of Differentiation', 'Differentiation'),
          makeEnglishSp('2.4.3', 'Solve problems involving tangent and normal.', 'Application of Differentiation', 'Differentiation'),
          makeEnglishSp('2.4.4', 'Determine the turning points and their nature.', 'Application of Differentiation', 'Differentiation'),
          makeEnglishSp('2.4.5', 'Solve minimum values and interpret the solutions.', 'Application of Differentiation', 'Differentiation'),
          makeEnglishSp('2.4.6', 'Interpret and determine rates of change for related quantities.', 'Application of Differentiation', 'Differentiation'),
          makeEnglishSp('2.4.7', 'Solve problems involving rates of change for related quantities and interpret the solutions.', 'Application of Differentiation', 'Differentiation'),
          makeEnglishSp('2.4.8', 'Interpret and determine small approximations of certain quantities.', 'Application of Differentiation', 'Differentiation'),
          makeEnglishSp('2.4.9', 'Solve problems involving small changes and approximations of certain quantities.', 'Application of Differentiation', 'Differentiation'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B3_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 3,
    tema: 'Calculus',
    tajuk: 'Integration',
    peneranganRingkas: 'Chapter 3 Additional Mathematics Form 5: Integration (Calculus)',
    skList: [
      {
        kod: '3.1',
        tajuk: 'Integration as the Inverse of Differentiation',
        spList: [
          makeEnglishSp('3.1.1', 'Explain the relation between differentiation.', 'Integration as the Inverse of Differentiation', 'Integration'),
        ],
      },
      {
        kod: '3.2',
        tajuk: 'Indefinite Integral',
        spList: [
          makeEnglishSp('3.2.1', 'Derive inductively.', 'Indefinite Integral', 'Integration'),
          makeEnglishSp('3.2.2', 'Determine indefinite integral for algebraic functions.', 'Indefinite Integral', 'Integration'),
          makeEnglishSp('3.2.3', 'Determine indefinite integral for functions in the form of constants, n is an integer and n  –1.', 'Indefinite Integral', 'Integration'),
          makeEnglishSp('3.2.4', 'Determine the equation of curve from its gradient function.', 'Indefinite Integral', 'Integration'),
        ],
      },
      {
        kod: '3.3',
        tajuk: 'Definite Integral',
        spList: [
          makeEnglishSp('3.3.1', 'Determine the value of definite integral for algebraic functions.', 'Definite Integral', 'Integration'),
          makeEnglishSp('3.3.2', 'Investigate and explain the relation between the limit of the sum of areas of rectangles and the area under a curve.', 'Definite Integral', 'Integration'),
          makeEnglishSp('3.3.3', 'Determine the area of a region.', 'Definite Integral', 'Integration'),
          makeEnglishSp('3.3.4', 'Investigate and explain the relation between the limits of the sum of volumes of cylinders and the generated volume by revolving a region.', 'Definite Integral', 'Integration'),
          makeEnglishSp('3.3.5', 'Determine the generated volume of a region revolved at the x-axis or the y-axis.', 'Definite Integral', 'Integration'),
        ],
      },
      {
        kod: '3.4',
        tajuk: 'Application of Integration',
        spList: [
          makeEnglishSp('3.4.1', 'Solve problems involving integration.', 'Application of Integration', 'Integration'),
          makeEnglishSp('3.4.2', 'Solve problems involving integration.', 'Application of Integration', 'Integration'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B4_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 4,
    tema: 'Statistics and Probability',
    tajuk: 'Permutation and Combination',
    peneranganRingkas: 'Chapter 4 Additional Mathematics Form 5: Permutation and Combination (Statistics and Probability)',
    skList: [
      {
        kod: '4.1',
        tajuk: 'Permutation',
        spList: [
          makeEnglishSp('4.1.1', 'Investigate.', 'Permutation', 'Permutation and Combination'),
          makeEnglishSp('4.1.2', 'Determine the number of permutations for (i) (ii) n different objects taken r at a tim (iii) n objects involving identical object.', 'Permutation', 'Permutation and Combination'),
          makeEnglishSp('4.1.3', 'Solve problems involving permutations with certain conditions.', 'Permutation', 'Permutation and Combination'),
        ],
      },
      {
        kod: '4.2',
        tajuk: 'Combination',
        spList: [
          makeEnglishSp('4.2.1', 'Compare combination.', 'Combination', 'Permutation and Combination'),
          makeEnglishSp('4.2.2', 'Determine the number of combinations of r objects chosen from n different objects at a t.', 'Combination', 'Permutation and Combination'),
          makeEnglishSp('4.2.3', 'Solve problems involving combinations with certain conditions.', 'Combination', 'Permutation and Combination'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B5_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 5,
    tema: 'Statistics and Probability',
    tajuk: 'Probability Distribution',
    peneranganRingkas: 'Chapter 5 Additional Mathematics Form 5: Probability Distribution (Statistics and Probability)',
    skList: [
      {
        kod: '5.1',
        tajuk: 'Random Variable',
        spList: [
          makeEnglishSp('5.1.1', 'Describe the meaning of random variable.', 'Random Variable', 'Probability Distribution'),
          makeEnglishSp('5.1.2', 'Compare and contrast discrete random variable and continuous random variable.', 'Random Variable', 'Probability Distribution'),
          makeEnglishSp('5.1.3', 'Describe distribution for discrete random variables.', 'Random Variable', 'Probability Distribution'),
          makeEnglishSp('5.1.4', 'Construct probability distribution for discrete ra variable.', 'Random Variable', 'Probability Distribution'),
        ],
      },
      {
        kod: '5.2',
        tajuk: 'Binomial Distribution',
        spList: [
          makeEnglishSp('5.2.1', 'Describe the meaning of binomial distribution.', 'Binomial Distribution', 'Probability Distribution'),
          makeEnglishSp('5.2.2', 'Determine the probability of an event for binomial distribution.', 'Binomial Distribution', 'Probability Distribution'),
          makeEnglishSp('5.2.3', 'Interpret information, construct table and draw graph of binomial distribution.', 'Binomial Distribution', 'Probability Distribution'),
          makeEnglishSp('5.2.4', 'Determine and describe the value of mean, binomial distribution.', 'Binomial Distribution', 'Probability Distribution'),
          makeEnglishSp('5.2.5', 'Solve problems involving binomial distributions.', 'Binomial Distribution', 'Probability Distribution'),
        ],
      },
      {
        kod: '5.3',
        tajuk: 'Normal Distribution',
        spList: [
          makeEnglishSp('5.3.1', 'Investigate and describe the properties of normal distribution graph.', 'Normal Distribution', 'Probability Distribution'),
          makeEnglishSp('5.3.2', 'Describe the meaning of standard normal distribution.', 'Normal Distribution', 'Probability Distribution'),
          makeEnglishSp('5.3.3', 'Determine and interprete standard score, Z.', 'Normal Distribution', 'Probability Distribution'),
          makeEnglishSp('5.3.4', 'Determine the probability of an event for normal distribution.', 'Normal Distribution', 'Probability Distribution'),
          makeEnglishSp('5.3.5', 'Solve problems involving normal distributions.', 'Normal Distribution', 'Probability Distribution'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B6_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 6,
    tema: 'Trigonometry',
    tajuk: 'Trigonometric Functions',
    peneranganRingkas: 'Chapter 6 Additional Mathematics Form 5: Trigonometric Functions (Trigonometry)',
    skList: [
      {
        kod: '6.1',
        tajuk: 'Positive Angles and Negative Angles',
        spList: [
          makeEnglishSp('6.1.1', 'Represent positive angles and negative angles in a Cartesian Plane.', 'Positive Angles and Negative Angles', 'Trigonometric Functions'),
        ],
      },
      {
        kod: '6.2',
        tajuk: 'Trigonometric Ratios of Any Angle',
        spList: [
          makeEnglishSp('6.2.1', 'Relate secant, cosecant and cotangent with sine, cosine and tangent of any angle in a Cartesian plane.', 'Trigonometric Ratios of Any Angle', 'Trigonometric Functions'),
          makeEnglishSp('6.2.2', 'Determine the values of trigonometric ratios of any angle.', 'Trigonometric Ratios of Any Angle', 'Trigonometric Functions'),
        ],
      },
      {
        kod: '6.3',
        tajuk: 'Graphs of Sine, Cosine and Tangent Functions',
        spList: [
          makeEnglishSp('6.3.1', 'Draw and s functions: (i) (ii) y = a cos bx + c (iii) y = a tan bx + c where a, b and c are constants and b >.', 'Graphs of Sine, Cosine and Tangent Functions', 'Trigonometric Functions'),
          makeEnglishSp('6.3.2', 'Solve trigonometric equations using graphical method.', 'Graphs of Sine, Cosine and Tangent Functions', 'Trigonometric Functions'),
        ],
      },
      {
        kod: '6.4',
        tajuk: 'Basic Identities',
        spList: [
          makeEnglishSp('6.4.1', 'Derive basic identities: (i) (ii) (iii).', 'Basic Identities', 'Trigonometric Functions'),
          makeEnglishSp('6.4.2', 'Prove trigonometric identities using basic identities.', 'Basic Identities', 'Trigonometric Functions'),
        ],
      },
      {
        kod: '6.5',
        tajuk: 'Addition Formulae and Double Angle Formulae',
        spList: [
          makeEnglishSp('6.5.1', 'Prove trigonometric identities using addition formulae for sin (A ± B), cos (A ± B) and tan (A ± B).', 'Addition Formulae and Double Angle Formulae', 'Trigonometric Functions'),
          makeEnglishSp('6.5.2', 'Derive double angle formulae for sin 2A, cos 2A and tan 2A.', 'Addition Formulae and Double Angle Formulae', 'Trigonometric Functions'),
          makeEnglishSp('6.5.3', 'Prove trigonometric identities using double angle formulae.', 'Addition Formulae and Double Angle Formulae', 'Trigonometric Functions'),
        ],
      },
      {
        kod: '6.6',
        tajuk: 'Application of Trigonometric Functions',
        spList: [
          makeEnglishSp('6.6.1', 'Solve trigonometric equations. tions.', 'Application of Trigonometric Functions', 'Trigonometric Functions'),
          makeEnglishSp('6.6.2', 'Solve problems involving trigonometric functions.', 'Application of Trigonometric Functions', 'Trigonometric Functions'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B7_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 7,
    tema: 'Application of Science and Technology',
    tajuk: 'Linear Programming',
    peneranganRingkas: 'Chapter 7 Additional Mathematics Form 5: Linear Programming (Application of Science and Technology)',
    skList: [
      {
        kod: '7.1',
        tajuk: 'Linear Programming Model',
        spList: [
          makeEnglishSp('7.1.1', 'Form a mathematical model for a situation represent the model graphically.', 'Linear Programming Model', 'Linear Programming'),
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Application of Linear Programming',
        spList: [
          makeEnglishSp('7.2.1', 'Solve problems involving linear programming graphically.', 'Application of Linear Programming', 'Linear Programming'),
        ],
      },
    ],
  },
  {
    id: 'AM_F5_B8_DLP',
    tingkatan: 'Tingkatan 5',
    nomborBab: 8,
    tema: 'Application of Science and Technology',
    tajuk: 'Kinematics of Linear Motion',
    peneranganRingkas: 'Chapter 8 Additional Mathematics Form 5: Kinematics of Linear Motion (Application of Science and Technology)',
    skList: [
      {
        kod: '8.1',
        tajuk: 'Displacement, Velocity and Acceleration',
        spList: [
          makeEnglishSp('8.1.1', 'Describe and determine instantaneous velocity, instantaneous acceleration of a particle.', 'Displacement, Velocity and Acceleration', 'Kinematics of Linear Motion'),
          makeEnglishSp('8.1.2', 'Determine the total distance travelled by a particle in a given period of time.', 'Displacement, Velocity and Acceleration', 'Kinematics of Linear Motion'),
        ],
      },
      {
        kod: '8.2',
        tajuk: 'Differentiation in Kinematics of Linear Motion',
        spList: [
          makeEnglishSp('8.2.1', 'Relate between displacement function, velocity function and acceleration function.', 'Differentiation in Kinematics of Linear Motion', 'Kinematics of Linear Motion'),
          makeEnglishSp('8.2.2', 'Determine and interpret instantaneous velocities of a particle from displacement function.', 'Differentiation in Kinematics of Linear Motion', 'Kinematics of Linear Motion'),
          makeEnglishSp('8.2.3', 'Determine and interpret instantaneous acceleration of a particle from velocity function and displacement function.', 'Differentiation in Kinematics of Linear Motion', 'Kinematics of Linear Motion'),
        ],
      },
      {
        kod: '8.3',
        tajuk: 'Integration in Kinematics of Linear Motion',
        spList: [
          makeEnglishSp('8.3.1', 'Determine and interpret instantaneous velocity of a particle from accelaration function.', 'Integration in Kinematics of Linear Motion', 'Kinematics of Linear Motion'),
          makeEnglishSp('8.3.2', 'Determine and interpret instantaneous displacement of a particle from velocity function and accelaration function.', 'Integration in Kinematics of Linear Motion', 'Kinematics of Linear Motion'),
        ],
      },
      {
        kod: '8.4',
        tajuk: 'Applications of Kinematics of Linear Motion',
        spList: [
          makeEnglishSp('8.4.1', 'Solve problems of kinematics of linear motion involving differentiation and integration.', 'Applications of Kinematics of Linear Motion', 'Kinematics of Linear Motion'),
        ],
      },
    ],
  },
];

export const DSKP_ADDMATH_DLP: BabKimia[] = [
  ...DSKP_ADDMATH_F4_DLP,
  ...DSKP_ADDMATH_F5_DLP,
];
