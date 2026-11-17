import { BabKimia, StandardKandungan, StandardPembelajaran, Tingkatan } from '../../types/rph';

function makeEnglishSp(
  kod: string,
  tajuk: string,
  skTajuk: string,
  babTajuk: string,
  eksperimenWajib?: boolean,
  namaEksperimen?: string,
  radasBahan?: string[]
): StandardPembelajaran {
  const cleanTitle = tajuk.replace(/\.$/, '');
  const lowerVerbTitle = cleanTitle.charAt(0).toLowerCase() + cleanTitle.slice(1);

  return {
    kod,
    tajuk,
    eksperimenWajib,
    namaEksperimen,
    radasBahan,
    objektifCadangan: [
      `By the end of the lesson, pupils are able to ${lowerVerbTitle} accurately in accordance with KSSM Chemistry curriculum specifications.`,
      eksperimenWajib
        ? `Conduct the scientific investigation (${namaEksperimen || cleanTitle}), record observations/data systematically, and draw valid chemical conclusions.`
        : `Apply the concept of ${skTajuk.toLowerCase()} to solve at least 3 structured practice questions correctly.`,
    ],
    kriteriaKejayaanCadangan: [
      `Pupils can explain key concepts and chemical terminology for LS ${kod} (${cleanTitle}) using accurate scientific language.`,
      eksperimenWajib
        ? `Pupils successfully set up apparatus safely, record complete experimental data, and write an accurate lab report.`
        : `Pupils correctly answer at least 3 out of 4 formative exercises / chemical equations related to ${skTajuk.toLowerCase()}.`,
    ],
    cadanganAktiviti: {
      setInduksi: `Teacher presents a real-life phenomenon or quick visual stimulus related to ${skTajuk} (${babTajuk}) and poses inquiry questions to activate pupils' prior knowledge.`,
      aktivitiUtama: eksperimenWajib
        ? [
            `1. Teacher conducts a laboratory safety briefing and reviews the hypothesis, variables (manipulated, responding, fixed) and procedure for: ${namaEksperimen || cleanTitle}.`,
            `2. Pupils carry out the hands-on experiment in small groups, observing and recording qualitative and quantitative data systematically.`,
            `3. Groups present their experimental findings, plot/analyse data, and discuss chemical equations and conclusions with teacher guidance.`,
          ]
        : [
            `1. Teacher introduces and explains the core concepts of LS ${kod}: ${cleanTitle} using interactive diagrams/models.`,
            `2. 21st Century Learning (PAK-21) Collaborative Activity: Pupils work in pairs/groups (Think-Pair-Share / Gallery Walk) to construct concept maps, chemical formulae/equations, or solve structured problems.`,
            `3. Group representatives present their solutions and receive immediate formative feedback from peers and the teacher.`,
          ],
      penutup: `Exit Ticket: Pupils summarise the main takeaway for LS ${kod} (${cleanTitle}) and complete a quick 2-question formative check.`,
      aktiviti5E: {
        engage: `Teacher shows a real-world phenomenon or chemical demonstration related to ${skTajuk} and asks probing questions to spark curiosity.`,
        explore: eksperimenWajib
          ? `Pupils conduct the compulsory investigation (${namaEksperimen || cleanTitle}) in groups to collect empirical data and observations.`
          : `Pupils explore learning stations / molecular models / simulations to investigate ${cleanTitle} collaboratively.`,
        explain: `Group representatives explain their findings using scientific terminology and chemical equations, while the teacher reinforces key concepts.`,
        elaborate: `Pupils apply their understanding to solve SPM Higher Order Thinking Skills (HOTS) problems and real-life industrial/environmental contexts.`,
        evaluate: `Formative assessment via mini-whiteboard quiz / exit ticket to verify mastery of learning objectives and success criteria.`,
      },
    },
    bbmCadangan: eksperimenWajib
      ? [
          'KSSM Chemistry Textbook (DLP)',
          'Practical / Laboratory Manual',
          'Laboratory Apparatus & Chemical Reagents',
          'Mini Whiteboards / Worksheet',
        ]
      : [
          'KSSM Chemistry Textbook (DLP)',
          'Periodic Table of Elements',
          'Presentation Slides / Digital Simulation',
          'Structured Worksheet & Mini Whiteboards',
        ],
    kemahiranSaintifikCadangan: eksperimenWajib
      ? ['Observing', 'Measuring and using numbers', 'Controlling variables', 'Hypothesising', 'Experimenting']
      : ['Observing', 'Classifying', 'Interpreting data', 'Communicating'],
  };
}

function buildBab(
  id: string,
  tingkatan: Tingkatan,
  nomborBab: number,
  tema: string,
  tajuk: string,
  peneranganRingkas: string,
  rawSkList: Array<{
    kod: string;
    tajuk: string;
    spItems: Array<{
      kod: string;
      tajuk: string;
      eksperimenWajib?: boolean;
      namaEksperimen?: string;
      radasBahan?: string[];
    }>;
  }>
): BabKimia {
  const skList: StandardKandungan[] = rawSkList.map((sk) => ({
    kod: sk.kod,
    tajuk: sk.tajuk,
    spList: sk.spItems.map((sp) =>
      makeEnglishSp(
        sp.kod,
        sp.tajuk,
        sk.tajuk,
        tajuk,
        sp.eksperimenWajib,
        sp.namaEksperimen,
        sp.radasBahan
      )
    ),
  }));

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

export const DSKP_KIMIA_DLP_F4: BabKimia[] = [
  // CHAPTER 1: INTRODUCTION TO CHEMISTRY
  buildBab(
    'F4_B1',
    'Tingkatan 4',
    1,
    'The Importance of Chemistry',
    'Introduction to Chemistry',
    'Development in chemistry field, scientific investigation, and usage/management of laboratory apparatus and materials.',
    [
      {
        kod: '1.1',
        tajuk: 'Development in chemistry field and its importance in daily life',
        spItems: [
          { kod: '1.1.1', tajuk: 'State the meaning of chemistry.' },
          { kod: '1.1.2', tajuk: 'State examples of chemicals commonly used in daily life.' },
          { kod: '1.1.3', tajuk: 'Generate ideas on the development of chemistry field and the contributions of chemical technology towards mankind.' },
          { kod: '1.1.4', tajuk: 'State examples of careers related to chemistry field.' },
        ],
      },
      {
        kod: '1.2',
        tajuk: 'Scientific investigation in chemistry',
        spItems: [
          { kod: '1.2.1', tajuk: 'Design an experiment to test a hypothesis.' },
          {
            kod: '1.2.2',
            tajuk: 'Investigate through experiment the effect of temperature on the solubility of salt in water using a scientific method.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 1.2.2: Effect of temperature on the solubility of salt in water',
            radasBahan: ['Beaker', 'Measuring cylinder', 'Thermometer', 'Bunsen burner', 'Electronic balance', 'Glass rod', 'Sodium chloride (NaCl)', 'Distilled water'],
          },
        ],
      },
      {
        kod: '1.3',
        tajuk: 'Usage, management and handling of apparatus and materials',
        spItems: [
          { kod: '1.3.1', tajuk: 'Explain the types and functions of self protective equipment and safety in the laboratory.' },
          { kod: '1.3.2', tajuk: 'Demonstrate methods of managing and handling apparatus and materials.' },
          { kod: '1.3.3', tajuk: 'Communicate about emergency management procedure in laboratory.' },
        ],
      },
    ]
  ),

  // CHAPTER 2: MATTER AND THE ATOMIC STRUCTURE
  buildBab(
    'F4_B2',
    'Tingkatan 4',
    2,
    'Fundamentals of Chemistry',
    'Matter and the Atomic Structure',
    'Basic concepts of matter, development of the atomic model, atomic structure, and isotopes and its uses.',
    [
      {
        kod: '2.1',
        tajuk: 'Basic concepts of matter',
        spItems: [
          { kod: '2.1.1', tajuk: 'Describe matter briefly.' },
          { kod: '2.1.2', tajuk: 'Explain the changes in the states of matter.' },
          {
            kod: '2.1.3',
            tajuk: 'Determine the melting point and freezing point of naphthalene through activity.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 2.1.3: Determine the melting point and freezing point of naphthalene',
            radasBahan: ['Boiling tube', 'Beaker', 'Thermometer (0-110°C)', 'Stopwatch', 'Bunsen burner', 'Retort stand', 'Conical flask', 'Naphthalene', 'Water'],
          },
        ],
      },
      {
        kod: '2.2',
        tajuk: 'The development of the atomic model',
        spItems: [
          { kod: '2.2.1', tajuk: 'State the subatomic particles in atoms of various elements.' },
          { kod: '2.2.2', tajuk: 'Compare and contrast the relative mass and relative charge of proton, electron and neutron.' },
          { kod: '2.2.3', tajuk: 'Sequence the atomic structure models based on Atomic Models of Dalton, Thomson, Rutherford, Bohr and Chadwick.' },
        ],
      },
      {
        kod: '2.3',
        tajuk: 'Atomic structure',
        spItems: [
          { kod: '2.3.1', tajuk: 'Define proton number and nucleon number.' },
          { kod: '2.3.2', tajuk: 'Determine the nucleon number, proton number and number of electrons in an atom.' },
          { kod: '2.3.3', tajuk: 'Write the standard representation of an atom.' },
          { kod: '2.3.4', tajuk: 'Construct an atomic structure diagram and electron arrangement.' },
        ],
      },
      {
        kod: '2.4',
        tajuk: 'Isotopes and its usage',
        spItems: [
          { kod: '2.4.1', tajuk: 'Deduce the meaning of isotopes.' },
          { kod: '2.4.2', tajuk: 'Calculate the relative atomic mass of isotopes.' },
          { kod: '2.4.3', tajuk: 'Justify the uses of isotopes in various fields.' },
        ],
      },
    ]
  ),

  // CHAPTER 3: THE MOLE CONCEPT, CHEMICAL FORMULA AND EQUATION
  buildBab(
    'F4_B3',
    'Tingkatan 4',
    3,
    'Fundamentals of Chemistry',
    'The Mole Concept, Chemical Formula and Equation',
    'Relative atomic/molecular mass, mole concept, empirical and molecular formulae, and balanced chemical equations.',
    [
      {
        kod: '3.1',
        tajuk: 'Relative atomic mass and relative molecular mass',
        spItems: [
          { kod: '3.1.1', tajuk: 'Conceptualise relative atomic mass and relative molecular mass based on the carbon-12 scale.' },
          { kod: '3.1.2', tajuk: 'Calculate relative molecular mass and relative formula mass.' },
        ],
      },
      {
        kod: '3.2',
        tajuk: 'Mole concept',
        spItems: [
          { kod: '3.2.1', tajuk: 'Define mole.' },
          { kod: '3.2.2', tajuk: 'Interrelate the Avogadro constant, NA, the number of particles and the number of moles.' },
          { kod: '3.2.3', tajuk: 'State the meaning of molar mass.' },
          { kod: '3.2.4', tajuk: 'Interrelate the molar mass, mass and the number of moles.' },
          { kod: '3.2.5', tajuk: 'State the meaning of molar volume.' },
          { kod: '3.2.6', tajuk: 'Interrelate the molar volume, volume of gas and the number of moles.' },
          { kod: '3.2.7', tajuk: 'Solve numerical problems involving the number of particles, number of moles, mass of the substance and volume of gases.' },
        ],
      },
      {
        kod: '3.3',
        tajuk: 'Chemical formula',
        spItems: [
          { kod: '3.3.1', tajuk: 'State the meaning of chemical formula, empirical formula and molecular formula.' },
          {
            kod: '3.3.2',
            tajuk: 'Determine the empirical formula of magnesium oxide (MgO) through an activity.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 3.3.2: Determine the empirical formula of magnesium oxide (MgO)',
            radasBahan: ['Crucible with lid', 'Pipe-clay triangle', 'Bunsen burner', 'Electronic balance', 'Tongs', 'Sandpaper', 'Magnesium ribbon'],
          },
          {
            kod: '3.3.3',
            tajuk: 'Determine the empirical formula of copper(II) oxide (CuO) through an activity.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 3.3.3: Determine the empirical formula of copper(II) oxide (CuO)',
            radasBahan: ['Combustion tube', 'Porcelain dish', 'Bunsen burner', 'U-tube', 'Copper(II) oxide powder', 'Zinc granules', 'Dilute hydrochloric acid', 'Anhydrous calcium chloride'],
          },
          { kod: '3.3.4', tajuk: 'Solve numerical problems involving empirical formula and molecular formula.' },
          { kod: '3.3.5', tajuk: 'Construct chemical formulae of compounds.' },
        ],
      },
      {
        kod: '3.4',
        tajuk: 'Chemical equation',
        spItems: [
          { kod: '3.4.1', tajuk: 'Write balanced chemical equations.' },
          { kod: '3.4.2', tajuk: 'Interpret chemical equations qualitatively and quantitatively.' },
          { kod: '3.4.3', tajuk: 'Solve stoichiometry numerical problems.' },
        ],
      },
    ]
  ),

  // CHAPTER 4: THE PERIODIC TABLE OF ELEMENTS
  buildBab(
    'F4_B4',
    'Tingkatan 4',
    4,
    'Fundamentals of Chemistry',
    'The Periodic Table of Elements',
    'Historical development, arrangement of elements, Group 18, Group 1, Group 17, Period 3, and transition elements.',
    [
      {
        kod: '4.1',
        tajuk: 'The development of The Periodic Table of Elements',
        spItems: [
          { kod: '4.1.1', tajuk: 'Describe the historical development of the Periodic Table of Elements.' },
          { kod: '4.1.2', tajuk: 'Deduce the basic principle of arrangement of elements in the Periodic Table of Elements.' },
        ],
      },
      {
        kod: '4.2',
        tajuk: 'The arrangement in The Periodic Table of Elements',
        spItems: [
          { kod: '4.2.1', tajuk: 'Describe briefly the modern Periodic Table of Elements.' },
          { kod: '4.2.2', tajuk: 'Generalise the relationship between the proton number and the position of elements in the Periodic Table of Elements.' },
        ],
      },
      {
        kod: '4.3',
        tajuk: 'Elements in Group 18',
        spItems: [
          { kod: '4.3.1', tajuk: 'Relate the inert nature of Group 18 elements to its stability.' },
          { kod: '4.3.2', tajuk: 'Generalise the changes in physical properties of elements when going down Group 18.' },
          { kod: '4.3.3', tajuk: 'Describe briefly the uses of Group 18 elements in daily life.' },
        ],
      },
      {
        kod: '4.4',
        tajuk: 'Elements in Group 1',
        spItems: [
          { kod: '4.4.1', tajuk: 'Generalise the changes in physical properties of elements when going down Group 1.' },
          {
            kod: '4.4.2',
            tajuk: 'Investigate through experiment the chemical properties of Group 1 elements with: (i) water (ii) oxygen gas (iii) chlorine.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 4.4.2: Chemical properties of Group 1 elements with water, oxygen gas and chlorine',
            radasBahan: ['Water trough', 'Gas jar and combustion spoon', 'Filter paper', 'Forceps', 'Knife', 'Lithium, Sodium, Potassium', 'Distilled water', 'Red litmus paper', 'Oxygen gas', 'Chlorine gas'],
          },
          { kod: '4.4.3', tajuk: 'Generalise the changes in the reactivity of elements when going down Group 1.' },
          { kod: '4.4.4', tajuk: 'Reason out the physical and chemical properties of the other elements in Group 1.' },
        ],
      },
      {
        kod: '4.5',
        tajuk: 'Elements in Group 17',
        spItems: [
          { kod: '4.5.1', tajuk: 'Generalise the changes in the physical properties of elements when going down Group 17.' },
          { kod: '4.5.2', tajuk: 'Summarise the chemical properties of Group 17 elements.' },
          { kod: '4.5.3', tajuk: 'Generalise the changes in the reactivity of elements when going down Group 17.' },
          { kod: '4.5.4', tajuk: 'Reason out the physical and chemical properties of other elements in Group 17.' },
        ],
      },
      {
        kod: '4.6',
        tajuk: 'Elements in Period 3',
        spItems: [
          { kod: '4.6.1', tajuk: 'Describe the trends in physical properties of elements across Period 3.' },
          {
            kod: '4.6.2',
            tajuk: 'Conduct an experiment to observe changes in the properties of the oxides of elements across Period 3.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 4.6.2: Properties of the oxides of elements across Period 3',
            radasBahan: ['Test tubes', 'Bunsen burner', 'pH meter / Universal indicator', 'Sodium oxide (Na2O)', 'Magnesium oxide (MgO)', 'Aluminium oxide (Al2O3)', 'Silicon(IV) oxide (SiO2)', 'Nitric acid', 'Sodium hydroxide solution'],
          },
          { kod: '4.6.3', tajuk: 'Describe briefly the uses of semi-metals.' },
        ],
      },
      {
        kod: '4.7',
        tajuk: 'Transition elements',
        spItems: [
          { kod: '4.7.1', tajuk: 'Determine the position of transition elements in the Periodic Table of Elements.' },
          { kod: '4.7.2', tajuk: 'Explain the special characteristics of a few transition elements with examples.' },
          { kod: '4.7.3', tajuk: 'List the uses of transition elements in industry.' },
        ],
      },
    ]
  ),

  // CHAPTER 5: CHEMICAL BOND
  buildBab(
    'F4_B5',
    'Tingkatan 4',
    5,
    'Fundamentals of Chemistry',
    'Chemical Bond',
    'Basics of compound formation, ionic bond, covalent bond, hydrogen bond, dative bond, metallic bond, and properties of ionic and covalent compounds.',
    [
      {
        kod: '5.1',
        tajuk: 'Basics of compound formation',
        spItems: [
          { kod: '5.1.1', tajuk: 'Explain the basics of compound formation.' },
        ],
      },
      {
        kod: '5.2',
        tajuk: 'Ionic bond',
        spItems: [
          { kod: '5.2.1', tajuk: 'Explain with examples the formation of ionic bond.' },
        ],
      },
      {
        kod: '5.3',
        tajuk: 'Covalent bond',
        spItems: [
          { kod: '5.3.1', tajuk: 'Explain with examples the formation of covalent bond.' },
          { kod: '5.3.2', tajuk: 'Compare ionic bonds and covalent bonds.' },
        ],
      },
      {
        kod: '5.4',
        tajuk: 'Hydrogen bond',
        spItems: [
          { kod: '5.4.1', tajuk: 'Explain with examples the formation of a hydrogen bond.' },
          { kod: '5.4.2', tajuk: 'Explain the effect of the hydrogen bond on the physical properties of substances.' },
        ],
      },
      {
        kod: '5.5',
        tajuk: 'Dative bond',
        spItems: [
          { kod: '5.5.1', tajuk: 'Explain with examples the formation of dative bond.' },
        ],
      },
      {
        kod: '5.6',
        tajuk: 'Metallic bond',
        spItems: [
          { kod: '5.6.1', tajuk: 'Explain the formation of metallic bond.' },
          { kod: '5.6.2', tajuk: 'Reason out the electrical conductivity of metal.' },
        ],
      },
      {
        kod: '5.7',
        tajuk: 'Properties of ionic and covalent compounds',
        spItems: [
          {
            kod: '5.7.1',
            tajuk: 'Compare the properties of ionic compounds and covalent compounds through experiment.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 5.7.1: Compare the properties of ionic and covalent compounds',
            radasBahan: ['Crucible', 'Carbon electrodes', 'Ammeter', 'Batteries', 'Test tubes', 'Bunsen burner', 'Magnesium chloride / Lead(II) bromide', 'Naphthalene / Cyclohexane', 'Distilled water'],
          },
          { kod: '5.7.2', tajuk: 'Explain with examples the uses of ionic compounds and covalent compounds in daily life.' },
        ],
      },
    ]
  ),

  // CHAPTER 6: ACID, BASE AND SALT
  buildBab(
    'F4_B6',
    'Tingkatan 4',
    6,
    'Interaction Between Matter',
    'Acid, Base and Salt',
    'Role of water, pH value, strength and chemical properties of acids/alkalis, concentration, standard solution, neutralisation, salts, and qualitative analysis.',
    [
      {
        kod: '6.1',
        tajuk: 'The role of water in showing acidic and alkaline properties',
        spItems: [
          { kod: '6.1.1', tajuk: 'Define acid and alkali.' },
          { kod: '6.1.2', tajuk: 'State the meaning of basicity of an acid.' },
          {
            kod: '6.1.3',
            tajuk: 'Investigate the role of water in showing acidic and alkaline properties through experiment.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 6.1.3: Role of water in showing acidic and alkaline properties',
            radasBahan: ['Test tubes', 'Dropper', 'Glacial ethanoic acid / Oxalic acid powder', 'Aqueous ammonia / Sodium hydroxide pellets', 'Propanone', 'Distilled water', 'Blue and red litmus papers'],
          },
        ],
      },
      {
        kod: '6.2',
        tajuk: 'pH value',
        spItems: [
          { kod: '6.2.1', tajuk: 'State the meaning of pH and its uses.' },
          { kod: '6.2.2', tajuk: 'Calculate pH values of acids and alkalis.' },
          {
            kod: '6.2.3',
            tajuk: 'Investigate the relationship between pH value and the concentration of hydrogen ions and hydroxide ions through experiment.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 6.2.3: Relationship between pH value and concentration of H+ and OH- ions',
            radasBahan: ['pH meter', 'Beakers', 'Hydrochloric acid (0.1 M, 0.01 M, 0.001 M)', 'Sodium hydroxide solution (0.1 M, 0.01 M, 0.001 M)'],
          },
        ],
      },
      {
        kod: '6.3',
        tajuk: 'Strength of acids and alkalis',
        spItems: [
          { kod: '6.3.1', tajuk: 'Define strong acid, weak acid, strong alkali and weak alkali.' },
          { kod: '6.3.2', tajuk: 'Explain the strength of acid and alkali based on its degree of dissociation in water.' },
        ],
      },
      {
        kod: '6.4',
        tajuk: 'Chemical properties of acids and alkalis',
        spItems: [
          {
            kod: '6.4.1',
            tajuk: 'Summarise the chemical properties of acids by carrying out the reactions between: (i) Acid and base (ii) Acid and reactive metal (iii) Acid and metal carbonate.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 6.4.1: Chemical properties of acids',
            radasBahan: ['Test tubes', 'Bunsen burner', 'Delivery tube', 'Dilute hydrochloric/sulphuric acid', 'Copper(II) oxide', 'Zinc powder', 'Calcium carbonate', 'Limewater', 'Wooden splinter'],
          },
          {
            kod: '6.4.2',
            tajuk: 'Summarise the chemical properties of alkalis by carrying out the reactions between: (i) Alkali and acid (ii) Alkali and metal ion (iii) Alkali and ammonium salt.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 6.4.2: Chemical properties of alkalis',
            radasBahan: ['Test tubes', 'Bunsen burner', 'Sodium hydroxide solution', 'Benzoic acid', 'Ammonium chloride', 'Copper(II) sulphate solution', 'Moist red litmus paper'],
          },
        ],
      },
      {
        kod: '6.5',
        tajuk: 'Concentration of aqueous solution',
        spItems: [
          { kod: '6.5.1', tajuk: 'State the meaning of concentration of aqueous solution.' },
          { kod: '6.5.2', tajuk: 'Solve numerical problems involving concentration of solution.' },
        ],
      },
      {
        kod: '6.6',
        tajuk: 'Standard solution',
        spItems: [
          { kod: '6.6.1', tajuk: 'State the meaning of standard solution.' },
          {
            kod: '6.6.2',
            tajuk: 'Describe the preparation of a standard solution through activity: (i) from a solid substance (ii) through dilution of an aqueous solution.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 6.6.2: Preparation of a standard solution from a solid and by dilution',
            radasBahan: ['Volumetric flask (100 cm3 / 250 cm3)', 'Pipette', 'Beaker', 'Filter funnel', 'Electronic balance', 'Dropper', 'Sodium carbonate solid', 'Distilled water'],
          },
          { kod: '6.6.3', tajuk: 'Solve numerical problems involving preparation of standard solution and dilution.' },
        ],
      },
      {
        kod: '6.7',
        tajuk: 'Neutralisation',
        spItems: [
          { kod: '6.7.1', tajuk: 'State the meaning of neutralisation.' },
          {
            kod: '6.7.2',
            tajuk: 'Determine the concentration of an unknown solution through titration method.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 6.7.2: Acid-base titration to determine unknown concentration',
            radasBahan: ['Burette', 'Pipette (25 cm3)', 'Conical flask', 'Retort stand', 'White tile', 'Hydrochloric acid', 'Sodium hydroxide solution', 'Phenolphthalein indicator'],
          },
          { kod: '6.7.3', tajuk: 'Solve numerical problems involving neutralisation.' },
        ],
      },
      {
        kod: '6.8',
        tajuk: 'Salts, crystals and their uses in daily life',
        spItems: [
          { kod: '6.8.1', tajuk: 'State the meaning of salt.' },
          { kod: '6.8.2', tajuk: 'Characterise the physical properties of salt crystals.' },
          { kod: '6.8.3', tajuk: 'Give examples of salts and their uses in daily life.' },
        ],
      },
      {
        kod: '6.9',
        tajuk: 'Preparation of salts',
        spItems: [
          {
            kod: '6.9.1',
            tajuk: 'Test the solubility of salt in water and classify them into soluble and insoluble salts through experiment.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 6.9.1: Solubility of nitrate, sulphate, chloride and carbonate salts in water',
            radasBahan: ['Test tubes', 'Spatula', 'Glass rod', 'Various nitrate, sulphate, chloride and carbonate salts', 'Distilled water'],
          },
          {
            kod: '6.9.2',
            tajuk: 'Describe the preparation of a soluble salt through activity.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 6.9.2: Preparation and recrystallisation of soluble salts',
            radasBahan: ['Beaker', 'Evaporating dish', 'Filter funnel', 'Filter paper', 'Bunsen burner', 'Dilute sulphuric acid', 'Copper(II) oxide powder'],
          },
          {
            kod: '6.9.3',
            tajuk: 'Describe the preparation of an insoluble salt through activity.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 6.9.3: Preparation of insoluble salt via double decomposition reaction',
            radasBahan: ['Beaker', 'Filter funnel', 'Filter paper', 'Glass rod', 'Lead(II) nitrate solution', 'Potassium iodide / Sodium sulphate solution'],
          },
          {
            kod: '6.9.4',
            tajuk: 'Construct an ionic equation using the continuous variation method through experiment.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 6.9.4: Continuous variation method to construct ionic equation',
            radasBahan: ['Test tubes of equal size', 'Burettes', 'Test tube rack', 'Ruler', '0.5 M Lead(II) nitrate solution', '0.5 M Potassium chromate(VI) solution'],
          },
        ],
      },
      {
        kod: '6.10',
        tajuk: 'Effect of heat on salts',
        spItems: [
          { kod: '6.10.1', tajuk: 'Describe briefly chemical tests to identify gases.' },
          {
            kod: '6.10.2',
            tajuk: 'Investigate the effect of heat on salts through experiment.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 6.10.2: Effect of heat on carbonate and nitrate salts',
            radasBahan: ['Boiling tubes', 'Delivery tube', 'Bunsen burner', 'Test tube holder', 'Carbonate and nitrate salts', 'Limewater', 'Glowing wooden splinter', 'Moist litmus paper'],
          },
        ],
      },
      {
        kod: '6.11',
        tajuk: 'Qualitative analysis',
        spItems: [
          {
            kod: '6.11.1',
            tajuk: 'Identify the cation and anion present in a salt through experiment.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 6.11.1: Qualitative analysis of cations and anions in salts',
            radasBahan: ['Test tubes', 'Dropper', 'Sodium hydroxide solution', 'Aqueous ammonia', 'Dilute nitric acid', 'Silver nitrate solution', 'Barium chloride solution', 'Iron(II) sulphate', 'Concentrated sulphuric acid'],
          },
          { kod: '6.11.2', tajuk: 'Describe the confirmatory tests to identify cations and anions.' },
        ],
      },
    ]
  ),

  // CHAPTER 7: RATE OF REACTION
  buildBab(
    'F4_B7',
    'Tingkatan 4',
    7,
    'Interaction Between Matter',
    'Rate of Reaction',
    'Determining rate of reaction, factors affecting rate of reaction, daily life applications, and collision theory.',
    [
      {
        kod: '7.1',
        tajuk: 'Determining rate of reaction',
        spItems: [
          { kod: '7.1.1', tajuk: 'Classify fast and slow reactions that occur in daily life.' },
          { kod: '7.1.2', tajuk: 'Explain the meaning of the rate of reaction.' },
          {
            kod: '7.1.3',
            tajuk: 'Identify changes which can be observed and measured during chemical reactions through activity.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 7.1.3: Observable and measurable changes during chemical reactions',
            radasBahan: ['Conical flask', 'Burette', 'Water trough', 'Delivery tube', 'Stopwatch', 'Zinc granules', 'Dilute hydrochloric acid'],
          },
          { kod: '7.1.4', tajuk: 'Determine the (i) average rate of reaction and (ii) instantaneous rate of reaction.' },
          { kod: '7.1.5', tajuk: 'Solve numerical problems based on the average and instantaneous rate of reaction.' },
        ],
      },
      {
        kod: '7.2',
        tajuk: 'Factors that affect the rate of reaction',
        spItems: [
          {
            kod: '7.2.1',
            tajuk: 'Investigate factors affecting the rate of reactions through experiment, based on: (i) size of reactants (ii) concentration (iii) temperature (iv) presence of catalyst.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 7.2.1: Factors affecting the rate of reaction (Size, Concentration, Temperature, Catalyst)',
            radasBahan: ['Conical flask', 'Burette', 'Stopwatch', 'Thermometer', 'Marble chips (CaCO3)', 'Hydrochloric acid', 'Sodium thiosulphate solution', 'Sulphuric acid', 'Hydrogen peroxide', 'Manganese(IV) oxide'],
          },
        ],
      },
      {
        kod: '7.3',
        tajuk: 'Application of factors that affect the rate of reaction in daily life',
        spItems: [
          { kod: '7.3.1', tajuk: 'Explain with examples the application of factors that affect the rate of reaction in daily life.' },
        ],
      },
      {
        kod: '7.4',
        tajuk: 'Collision theory',
        spItems: [
          { kod: '7.4.1', tajuk: 'Describe the collision theory.' },
          { kod: '7.4.2', tajuk: 'Explain activation energy using examples.' },
          { kod: '7.4.3', tajuk: 'Interpret an energy profile diagram for exothermic and endothermic reactions.' },
        ],
      },
    ]
  ),

  // CHAPTER 8: MANUFACTURED SUBSTANCES IN INDUSTRY
  buildBab(
    'F4_B8',
    'Tingkatan 4',
    8,
    'Industrial Chemistry',
    'Manufactured Substances in Industry',
    'Alloy and its importance, composition and uses of glass, ceramics, and composite materials.',
    [
      {
        kod: '8.1',
        tajuk: 'Alloy and its importance',
        spItems: [
          { kod: '8.1.1', tajuk: 'Describe briefly alloy with examples.' },
          {
            kod: '8.1.2',
            tajuk: 'Compare the properties of an alloy with its pure metal through experiment.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 8.1.2: Compare the hardness and resistance to corrosion of an alloy with its pure metal',
            radasBahan: ['Retort stand', '1 kg weight', 'Steel ball bearing', 'Meter rule', 'Ruler', 'Bronze block', 'Pure copper block', 'Iron nail', 'Stainless steel nail'],
          },
          { kod: '8.1.3', tajuk: 'Justify the usage of alloys based on their composition and properties.' },
        ],
      },
      {
        kod: '8.2',
        tajuk: 'Composition of glass and its uses',
        spItems: [
          { kod: '8.2.1', tajuk: 'Describe briefly with examples the type of glass, their composition, properties and uses.' },
        ],
      },
      {
        kod: '8.3',
        tajuk: 'Composition of ceramics and its uses',
        spItems: [
          { kod: '8.3.1', tajuk: 'Describe briefly with examples of ceramics, their composition, properties and uses.' },
          { kod: '8.3.2', tajuk: 'Explain the uses of ceramics in daily life.' },
        ],
      },
      {
        kod: '8.4',
        tajuk: 'Composite materials and their importance',
        spItems: [
          { kod: '8.4.1', tajuk: 'State the meaning and properties of composite materials.' },
          { kod: '8.4.2', tajuk: 'Describe with examples the uses of composite materials.' },
          { kod: '8.4.3', tajuk: 'Compare and contrast the properties of a composite material with its constituent materials.' },
        ],
      },
    ]
  ),
];

export const DSKP_KIMIA_DLP_F5: BabKimia[] = [
  // CHAPTER 9: REDOX EQUILIBRIUM
  buildBab(
    'F5_B9',
    'Tingkatan 5',
    9,
    'Chemical Process',
    'Redox Equilibrium',
    'Oxidation and reduction, standard electrode potential, voltaic cell, electrolytic cell, extraction of metal, and rusting.',
    [
      {
        kod: '9.1',
        tajuk: 'Oxidation and reduction',
        spItems: [
          {
            kod: '9.1.1',
            tajuk: 'Describe redox reactions through activities.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 9.1.1: Study the transfer of electrons at a distance in a U-tube',
            radasBahan: ['U-tube', 'Galvanometer', 'Carbon electrodes', 'Connecting wires', 'Dilute sulphuric acid', 'Iron(II) sulphate solution', 'Acidified potassium manganate(VII) solution'],
          },
          {
            kod: '9.1.2',
            tajuk: 'Explain redox reaction based on the change in oxidation number through activities.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 9.1.2: Conversion of Fe2+ ion to Fe3+ ion and vice versa',
            radasBahan: ['Test tubes', 'Dropper', 'Bunsen burner', 'Freshly prepared Iron(II) sulphate solution', 'Bromine water', 'Iron(III) chloride solution', 'Zinc powder', 'Sodium hydroxide solution'],
          },
          {
            kod: '9.1.3',
            tajuk: 'Investigate displacement reaction as a redox reaction through activities.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 9.1.3: Displacement of metal from its salt solution and displacement of halogen from its halide solution',
            radasBahan: ['Test tubes', 'Zinc strip', 'Copper strip', 'Copper(II) nitrate solution', 'Chlorine water', 'Bromine water', 'Potassium iodide', 'Potassium bromide', '1,1,1-trichloroethane'],
          },
        ],
      },
      {
        kod: '9.2',
        tajuk: 'Standard electrode potential',
        spItems: [
          { kod: '9.2.1', tajuk: 'Describe the standard electrode potential.' },
          { kod: '9.2.2', tajuk: 'Determine oxidising agent and reducing agent based on their value of standard electrode potentials.' },
        ],
      },
      {
        kod: '9.3',
        tajuk: 'Voltaic cell',
        spItems: [
          {
            kod: '9.3.1',
            tajuk: 'Explain redox reaction in voltaic cell through experiment.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 9.3.1: Simple voltaic cell and Daniell cell voltage and electrode polarity',
            radasBahan: ['Voltmeter', 'Beakers', 'Porous pot / Salt bridge', 'Magnesium, Zinc, Iron, Lead and Copper strips', 'Copper(II) sulphate solution', 'Zinc sulphate solution'],
          },
        ],
      },
      {
        kod: '9.4',
        tajuk: 'Electrolytic cell',
        spItems: [
          { kod: '9.4.1', tajuk: 'Describe electrolysis.' },
          {
            kod: '9.4.2',
            tajuk: 'Describe electrolysis of molten compound through activities.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 9.4.2: Electrolysis of molten lead(II) bromide',
            radasBahan: ['Crucible', 'Carbon electrodes', 'Ammeter', 'Batteries', 'Bunsen burner', 'Tripod stand', 'Lead(II) bromide powder'],
          },
          {
            kod: '9.4.3',
            tajuk: 'Explain factors that affect electrolysis of aqueous solution through experiment.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 9.4.3: Factors affecting electrolysis of aqueous solution (E0 value, concentration, electrode type)',
            radasBahan: ['Electrolytic cell', 'Carbon electrodes', 'Copper electrodes', 'Ammeter', 'Test tubes', 'Dilute sulphuric acid', 'Copper(II) sulphate solution', 'Concentrated and dilute hydrochloric acid'],
          },
          { kod: '9.4.4', tajuk: 'Compare voltaic cell and electrolytic cell.' },
          {
            kod: '9.4.5',
            tajuk: 'Describe electroplating and purification of metal by electrolysis through activities.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 9.4.5: Electroplating a metal object with copper and purification of copper',
            radasBahan: ['Beaker', 'Ammeter', 'Rheostat', 'Batteries', 'Iron key / spoon', 'Pure copper strip', 'Impure copper plate', 'Copper(II) sulphate solution'],
          },
        ],
      },
      {
        kod: '9.5',
        tajuk: 'Extraction of metal from its ore',
        spItems: [
          { kod: '9.5.1', tajuk: 'Explain extraction of metal from its ore through electrolysis process.' },
          { kod: '9.5.2', tajuk: 'Explain metal extraction from its ore through reduction process by carbon.' },
        ],
      },
      {
        kod: '9.6',
        tajuk: 'Rusting',
        spItems: [
          {
            kod: '9.6.1',
            tajuk: 'Describe metal corrosion process as redox reaction through activities.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 9.6.1: Corrosion of copper and iron',
            radasBahan: ['Petri dishes', 'Iron nails', 'Copper strip', 'Hot agar solution', 'Potassium hexacyanoferrate(III) solution', 'Phenolphthalein indicator'],
          },
          {
            kod: '9.6.2',
            tajuk: 'Experiment to prevent rusting.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 9.6.2: Effects of other metals in contact with iron towards rusting of iron',
            radasBahan: ['Test tubes', 'Iron nails', 'Magnesium ribbon', 'Zinc strip', 'Tin strip', 'Copper strip', 'Hot agar solution + Potassium hexacyanoferrate(III) + Phenolphthalein'],
          },
        ],
      },
    ]
  ),

  // CHAPTER 10: CARBON COMPOUND
  buildBab(
    'F5_B10',
    'Tingkatan 5',
    10,
    'Organic Chemistry',
    'Carbon Compound',
    'Types of carbon compound, homologous series, chemical properties and interconversion, and isomers and IUPAC naming.',
    [
      {
        kod: '10.1',
        tajuk: 'Types of carbon compound',
        spItems: [
          { kod: '10.1.1', tajuk: 'Understand carbon compound.' },
          { kod: '10.1.2', tajuk: 'Explain sources of hydrocarbon.' },
        ],
      },
      {
        kod: '10.2',
        tajuk: 'Homologous series',
        spItems: [
          { kod: '10.2.1', tajuk: 'Explain homologous series.' },
          { kod: '10.2.2', tajuk: 'Construct molecular formulae and structural formulae, and name the members of the homologous series.' },
          { kod: '10.2.3', tajuk: 'Describe physical properties of the compounds in a homologous series.' },
        ],
      },
      {
        kod: '10.3',
        tajuk: 'Chemical properties and interconversion between homologous series',
        spItems: [
          {
            kod: '10.3.1',
            tajuk: 'Describe the chemical properties of each homologous series through activities.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 10.3.1: Compare alkane and alkene (sootiness, bromine water, acidified KMnO4) & properties of alcohol and carboxylic acid',
            radasBahan: ['Evaporating dishes', 'Test tubes', 'Filter paper', 'Hexane', 'Hexene', 'Bromine water', 'Acidified potassium manganate(VII) solution', 'Ethanol', 'Ethanoic acid'],
          },
          {
            kod: '10.3.2',
            tajuk: 'Understand ester through activity.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 10.3.2: Preparation of esters through esterification reaction',
            radasBahan: ['Boiling tube', 'Beaker', 'Bunsen burner', 'Dropper', 'Glacial ethanoic acid', 'Absolute ethanol', 'Concentrated sulphuric acid'],
          },
        ],
      },
      {
        kod: '10.4',
        tajuk: 'Isomer and naming according to IUPAC nomenclature',
        spItems: [
          { kod: '10.4.1', tajuk: 'Describe structural isomerism.' },
          { kod: '10.4.2', tajuk: 'Construct structure of isomers.' },
          { kod: '10.4.3', tajuk: 'Explain with examples the uses of each homologous series in daily life.' },
        ],
      },
    ]
  ),

  // CHAPTER 11: THERMOCHEMISTRY
  buildBab(
    'F5_B11',
    'Tingkatan 5',
    11,
    'Heat',
    'Thermochemistry',
    'Heat change in reactions (exothermic and endothermic), heat of precipitation, displacement, neutralisation, combustion, and fuel value.',
    [
      {
        kod: '11.1',
        tajuk: 'Heat change in reactions',
        spItems: [
          {
            kod: '11.1.1',
            tajuk: 'Deduce exothermic and endothermic reactions through activities.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 11.1.1: Study exothermic and endothermic reactions by dissolving substances in water',
            radasBahan: ['Polystyrene cups', 'Thermometer', 'Spatula', 'Sodium hydroxide pellets', 'Anhydrous calcium chloride', 'Ammonium nitrate', 'Sodium thiosulphate', 'Distilled water'],
          },
          { kod: '11.1.2', tajuk: 'Interpret energy level diagram.' },
        ],
      },
      {
        kod: '11.2',
        tajuk: 'Heat of reaction',
        spItems: [
          {
            kod: '11.2.1',
            tajuk: 'Determine heat of precipitation through activity.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 11.2.1: Determine the heat of precipitation of silver chloride and magnesium carbonate',
            radasBahan: ['Polystyrene cups', 'Thermometer (0.1°C)', 'Measuring cylinder', '0.5 M Silver nitrate solution', '0.5 M Sodium chloride solution'],
          },
          {
            kod: '11.2.2',
            tajuk: 'Determine heat of displacement through activity.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 11.2.2: Determine the heat of displacement of copper from copper(II) sulphate solution by zinc/magnesium',
            radasBahan: ['Polystyrene cup', 'Thermometer', 'Measuring cylinder', '0.2 M Copper(II) sulphate solution', 'Zinc powder', 'Magnesium powder'],
          },
          {
            kod: '11.2.3',
            tajuk: 'Compare heat of neutralisation through experiments for reactions between: (a) strong acid and strong alkali (b) weak acid and strong alkali (c) strong acid and weak alkali (d) weak acid and weak alkali.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 11.2.3: Compare heat of neutralisation between strong/weak acids and strong/weak alkalis',
            radasBahan: ['Polystyrene cups', 'Thermometer', 'Measuring cylinders', '1.0 M Hydrochloric acid', '1.0 M Ethanoic acid', '1.0 M Sodium hydroxide solution', '1.0 M Aqueous ammonia'],
          },
          {
            kod: '11.2.4',
            tajuk: 'Compare heat of combustion for various types of alcohol through experiment.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 11.2.4: Compare heat of combustion of methanol, ethanol, propanol and butanol',
            radasBahan: ['Copper can', 'Spirit lamps', 'Thermometer', 'Electronic balance', 'Windshield', 'Tripod stand', 'Methanol, Ethanol, Propan-1-ol, Butan-1-ol', 'Water'],
          },
        ],
      },
      {
        kod: '11.3',
        tajuk: 'Application of endothermic and exothermic reactions in daily life',
        spItems: [
          { kod: '11.3.1', tajuk: 'State a few examples of application of exothermic and endothermic reactions in daily life.' },
          { kod: '11.3.2', tajuk: 'Analyse fuel value.' },
        ],
      },
    ]
  ),

  // CHAPTER 12: POLYMER CHEMISTRY
  buildBab(
    'F5_B12',
    'Tingkatan 5',
    12,
    'Technology in Chemistry',
    'Polymer Chemistry',
    'Polymer classification and polymerisation reactions, natural rubber (coagulation and vulcanisation), and synthetic rubber.',
    [
      {
        kod: '12.1',
        tajuk: 'Polymer',
        spItems: [
          { kod: '12.1.1', tajuk: 'Explain polymer.' },
          {
            kod: '12.1.2',
            tajuk: 'Explain polymerisation reaction through activities.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 12.1.2: Synthesis of nylon through condensation polymerisation',
            radasBahan: ['Beaker', 'Forceps', 'Glass rod', '1,6-hexanediamine solution', 'Decanedioyl dichloride solution', 'Sodium hydroxide pellets'],
          },
          { kod: '12.1.3', tajuk: 'Justify the use of polymers in daily life.' },
        ],
      },
      {
        kod: '12.2',
        tajuk: 'Natural rubber',
        spItems: [
          { kod: '12.2.1', tajuk: 'Explain on natural rubber in terms of naming, structural formula and its properties.' },
          {
            kod: '12.2.2',
            tajuk: 'Experiment on latex coagulation.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 12.2.2: Investigate latex coagulation and methods in preventing coagulation',
            radasBahan: ['Beakers', 'Glass rods', 'Measuring cylinder', 'Fresh latex', 'Ethanoic acid', 'Aqueous ammonia'],
          },
          {
            kod: '12.2.3',
            tajuk: 'Explain the vulcanisation process using sulphur through an activity.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 12.2.3: Produce vulcanised rubber using disulphurพร dichloride solution',
            radasBahan: ['Beaker', 'Glass plate', 'Forceps', 'Razor blade', 'Latex', 'Disulphur dichloride (S2Cl2) in methylbenzene'],
          },
          {
            kod: '12.2.4',
            tajuk: 'Study the elasticity of vulcanised rubber and unvulcanised rubber through experiments.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 12.2.4: Compare the elasticity of vulcanised rubber and unvulcanised rubber',
            radasBahan: ['Retort stand', 'Bulldog clips', 'Weights (50g)', 'Meter rule', 'Vulcanised rubber strip', 'Unvulcanised rubber strip'],
          },
        ],
      },
      {
        kod: '12.3',
        tajuk: 'Synthetic rubber',
        spItems: [
          { kod: '12.3.1', tajuk: 'Explain synthetic rubber.' },
          { kod: '12.3.2', tajuk: 'Justify the use of natural rubber and synthetic rubber.' },
        ],
      },
    ]
  ),

  // CHAPTER 13: CONSUMER AND INDUSTRIAL CHEMISTRY
  buildBab(
    'F5_B13',
    'Tingkatan 5',
    13,
    'Technology in Chemistry',
    'Consumer and Industrial Chemistry',
    'Oils and fats, cleaning agents (soap and detergent), food additives, medicines and cosmetics, nanotechnology, and green technology.',
    [
      {
        kod: '13.1',
        tajuk: 'Oils and Fats',
        spItems: [
          { kod: '13.1.1', tajuk: 'Compare and contrast oils and fats.' },
          { kod: '13.1.2', tajuk: 'Explain the conversion process of unsaturated fats to saturated fats.' },
          { kod: '13.1.3', tajuk: 'Justify the use of oils and fats in daily life.' },
        ],
      },
      {
        kod: '13.2',
        tajuk: 'Cleaning agents',
        spItems: [
          { kod: '13.2.1', tajuk: 'Describe soap and detergent.' },
          {
            kod: '13.2.2',
            tajuk: 'Describe soap preparation process through an activity.',
            eksperimenWajib: true,
            namaEksperimen: 'Activity 13.2.2: Preparation of soap through saponification process',
            radasBahan: ['Beaker', 'Bunsen burner', 'Filter funnel', 'Palm oil / Olive oil', 'Concentrated sodium hydroxide solution (5 M)', 'Sodium chloride powder', 'Distilled water'],
          },
          {
            kod: '13.2.3',
            tajuk: 'Compare the cleansing action of soap and detergent through experiments.',
            eksperimenWajib: true,
            namaEksperimen: 'Experiment 13.2.3: Compare the effectiveness of cleansing action of soap and detergent in hard water',
            radasBahan: ['Beakers', 'Glass rods', 'Cloth with oily stains', 'Soap solution', 'Detergent solution', 'Hard water (Magnesium sulphate / Calcium chloride solution)'],
          },
        ],
      },
      {
        kod: '13.3',
        tajuk: 'Food Additives',
        spItems: [
          { kod: '13.3.1', tajuk: 'Describe with examples the types of food additives and their functions.' },
          { kod: '13.3.2', tajuk: 'Justify the usage of food additives.' },
        ],
      },
      {
        kod: '13.4',
        tajuk: 'Medicines and cosmetics',
        spItems: [
          { kod: '13.4.1', tajuk: 'Explain with examples types of medicine, their functions and side effects.' },
          { kod: '13.4.2', tajuk: 'Justify the usage of medicines.' },
          { kod: '13.4.3', tajuk: 'Explain cosmetics with examples.' },
          { kod: '13.4.4', tajuk: 'Justify the usage of cosmetics.' },
        ],
      },
      {
        kod: '13.5',
        tajuk: 'Application of nanotechnology in industry',
        spItems: [
          { kod: '13.5.1', tajuk: 'Explain the meaning of nanotechnology.' },
          { kod: '13.5.2', tajuk: 'Describe nanotechnology with examples and its application in daily life.' },
        ],
      },
      {
        kod: '13.6',
        tajuk: 'Application of green technology in industrial waste management',
        spItems: [
          { kod: '13.6.1', tajuk: 'Explain green technology with examples.' },
          { kod: '13.6.2', tajuk: 'Describe application of Green Technology in the sectors of waste management and industrial waste water.' },
          { kod: '13.6.3', tajuk: 'Justify the application of Green Technology in daily life.' },
        ],
      },
    ]
  ),
];

export const DSKP_KIMIA_DLP: BabKimia[] = [
  ...DSKP_KIMIA_DLP_F4,
  ...DSKP_KIMIA_DLP_F5,
];
