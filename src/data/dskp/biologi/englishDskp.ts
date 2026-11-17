import { BabBiologi, StandardPembelajaran } from '../../../types/rph';

function makeEnglishSp(
 kod: string,
 tajuk: string,
 skTajuk: string,
 babTajuk: string,
 eksperimenWajib?: boolean
): StandardPembelajaran {
 const cleanTitle = tajuk.replace(/\.$/, '');
 const lowerVerbTitle = cleanTitle.charAt(0).toLowerCase() + cleanTitle.slice(1);
 return {
 kod,
 tajuk,
 eksperimenWajib,
 namaEksperimen: eksperimenWajib ? `Experiment ${kod}: ${cleanTitle}` : undefined,
 objektifCadangan: [
 `By the end of the lesson, pupils are able to ${lowerVerbTitle} accurately in accordance with KSSM Biology curriculum specifications.`,
 eksperimenWajib
 ? `Conduct the scientific investigation (${cleanTitle}), record observations/data systematically, and draw valid biological conclusions.`
 : `Apply the concept of ${skTajuk.toLowerCase()} to solve at least 3 structured practice questions correctly.`,
 ],
 kriteriaKejayaanCadangan: [
 `Pupils can explain key concepts and biological terminology for LS ${kod} (${cleanTitle}) using accurate scientific language.`,
 eksperimenWajib
 ? 'Pupils successfully set up apparatus safely, record complete experimental data, and write an accurate lab report.'
 : `Pupils correctly answer at least 3 out of 4 formative exercises related to ${skTajuk.toLowerCase()}.`,
 ],
 cadanganAktiviti: {
 setInduksi: `Teacher presents a real-life biological phenomenon or visual stimulus related to ${skTajuk} (${babTajuk}) and poses inquiry questions to activate pupils' prior knowledge.`,
 aktivitiUtama: eksperimenWajib
 ? [
 `1. Teacher conducts a laboratory safety briefing and reviews the hypothesis, variables (manipulated, responding, fixed) and procedure for: ${cleanTitle}.`,
 '2. Pupils carry out the hands-on experiment in small groups, observing specimens/reactions and recording data systematically.',
 '3. Groups present their experimental findings, plot/analyse data, and discuss biological conclusions with teacher guidance.',
 ]
 : [
 `1. Teacher introduces and explains the core concepts of LS ${kod}: ${cleanTitle} using interactive biological diagrams/models.`,
 '2. 21st Century Learning (PAK-21) Collaborative Activity: Pupils work in pairs/groups (Think-Pair-Share / Gallery Walk) to construct concept maps, label biological diagrams, or solve structured problems.',
 '3. Group representatives present their solutions and receive immediate formative feedback from peers and the teacher.',
 ],
 penutup: `Exit Ticket: Pupils summarise the main takeaway for LS ${kod} (${cleanTitle}) and complete a quick 2-question formative check.`,
 aktiviti5E: {
 engage: `Teacher shows a real-world biological phenomenon or specimen/video related to ${skTajuk} and asks probing questions to spark curiosity.`,
 explore: eksperimenWajib
 ? `Pupils conduct the compulsory investigation (${cleanTitle}) in groups to collect empirical data and observations.`
 : `Pupils explore learning stations / biological models / simulations to investigate ${cleanTitle} collaboratively.`,
 explain: 'Group representatives explain their findings using accurate biological terminology, while the teacher reinforces key concepts.',
 elaborate: 'Pupils apply their understanding to solve SPM Higher Order Thinking Skills (HOTS) problems in health, physiology, or environmental contexts.',
 evaluate: 'Formative assessment via mini-whiteboard quiz / exit ticket to verify mastery of learning objectives and success criteria.',
 },
 },
 bbmCadangan: eksperimenWajib
 ? ['KSSM Biology Textbook (DLP)', 'Practical / Laboratory Manual', 'Laboratory Apparatus & Specimens/Reagents', 'Mini Whiteboards / Worksheet']
 : ['KSSM Biology Textbook (DLP)', 'Biological Charts / Models', 'Presentation Slides / Digital Simulation', 'Structured Worksheet & Mini Whiteboards'],
 kemahiranSaintifikCadangan: eksperimenWajib
 ? ['Observing', 'Measuring and using numbers', 'Controlling variables', 'Hypothesising', 'Experimenting']
 : ['Observing', 'Classifying', 'Interpreting data', 'Communicating'],
 };
}

export const DSKP_BIOLOGI_DLP: BabBiologi[] = [
 {
 id: "F4_B1",
 tingkatan: "Tingkatan 4",
 nomborBab: 1,
 tema: "Fundamentals of Biology",
 tajuk: "Introduction to Biology and Laboratory Rules",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Introduction to Biology and Laboratory Rules.",
 skList: [
 {
 kod: "1.1",
 tajuk: "Fields and Careers in Biology",
 spList: [
 makeEnglishSp("1.1.1", "State the meaning of biology.", "Fields and Careers in Biology", "Introduction to Biology and Laboratory Rules"),
 makeEnglishSp("1.1.2", "List the fields of study in biology, careers and development in related fields.", "Fields and Careers in Biology", "Introduction to Biology and Laboratory Rules"),
 makeEnglishSp("1.1.3", "Generate ideas about development in biology fields and contribution of technology in biology to humanity.", "Fields and Careers in Biology", "Introduction to Biology and Laboratory Rules"),
 makeEnglishSp("1.1.4", "Give examples of careers related to the fields of biology.", "Fields and Careers in Biology", "Introduction to Biology and Laboratory Rules"),
 ],
 },
 {
 kod: "1.2",
 tajuk: "Safety and Rules in Biology Laboratory",
 spList: [
 makeEnglishSp("1.2.1", "Explain self protective equipments and their functions.", "Safety and Rules in Biology Laboratory", "Introduction to Biology and Laboratory Rules"),
 makeEnglishSp("1.2.2", "Identify and justify substances that can be disposed into the sink.", "Safety and Rules in Biology Laboratory", "Introduction to Biology and Laboratory Rules"),
 makeEnglishSp("1.2.3", "Identify and justify substances that cannot be disposed into the sink.", "Safety and Rules in Biology Laboratory", "Introduction to Biology and Laboratory Rules"),
 makeEnglishSp("1.2.4", "Describe methods in managing biological wastes.", "Safety and Rules in Biology Laboratory", "Introduction to Biology and Laboratory Rules"),
 makeEnglishSp("1.2.5", "Communicate about steps to manage accidents in a laboratory.", "Safety and Rules in Biology Laboratory", "Introduction to Biology and Laboratory Rules"),
 makeEnglishSp("1.2.6", "Conclude safety practices in a Biology laboratory.", "Safety and Rules in Biology Laboratory", "Introduction to Biology and Laboratory Rules"),
 ],
 },
 {
 kod: "1.3",
 tajuk: "Communicating in Biology",
 spList: [
 makeEnglishSp("1.3.1", "Communicate by constructing tables based on experimental data.", "Communicating in Biology", "Introduction to Biology and Laboratory Rules"),
 makeEnglishSp("1.3.2", " Plot a suitable graph based on the data from an experiment.", "Communicating in Biology", "Introduction to Biology and Laboratory Rules", true),
 makeEnglishSp("1.3.3", "Sketch biological drawings based on observations.", "Communicating in Biology", "Introduction to Biology and Laboratory Rules"),
 makeEnglishSp("1.3.4", "Identify body planes, sections and directional terms in organisms.", "Communicating in Biology", "Introduction to Biology and Laboratory Rules"),
 ],
 },
 {
 kod: "1.4",
 tajuk: "Scientific Investigation in Biology",
 spList: [
 makeEnglishSp("1.4.1", "Design an experiment to solve a problem using scientific investigation methods. INTRODUCTION TO BIOLOGY AND LABORATORY RULES", "Scientific Investigation in Biology", "Introduction to Biology and Laboratory Rules", true),
 ],
 },
 ],
 },
 {
 id: "F4_B2",
 tingkatan: "Tingkatan 4",
 nomborBab: 2,
 tema: "Fundamentals of Biology",
 tajuk: "Cell Biology and Organisation",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Cell Biology and Organisation.",
 skList: [
 {
 kod: "2.1",
 tajuk: "Cell Structure and Function",
 spList: [
 makeEnglishSp("2.1.1", "Prepare microscope slides of animal and plant cells.", "Cell Structure and Function", "Cell Biology and Organisation"),
 makeEnglishSp("2.1.2", "Identify the structures of animal and plant cells based on observations through a light microscope.", "Cell Structure and Function", "Cell Biology and Organisation"),
 makeEnglishSp("2.1.3", "Analyse the components of animal and plant cells as seen on micrographs.", "Cell Structure and Function", "Cell Biology and Organisation"),
 makeEnglishSp("2.1.4", "State the main functions of components of animal and plant cells as seen on micrographs.", "Cell Structure and Function", "Cell Biology and Organisation"),
 makeEnglishSp("2.1.5", "Compare and contrast components of animal and plant cells.", "Cell Structure and Function", "Cell Biology and Organisation"),
 ],
 },
 {
 kod: "2.2",
 tajuk: "Living Processes in Unicellular Organisms",
 spList: [
 makeEnglishSp("2.2.1", "Conceptualise living processes in unicellular organisms such as Amoeba sp. and Paramecium sp..", "Living Processes in Unicellular Organisms", "Cell Biology and Organisation"),
 makeEnglishSp("2.2.2", "Deduce living processes in unicellular organisms as seen through a light microscope.", "Living Processes in Unicellular Organisms", "Cell Biology and Organisation"),
 ],
 },
 {
 kod: "2.3",
 tajuk: "Living Processes in Multicellular Organisms",
 spList: [
 makeEnglishSp("2.3.1", "Correlate the uniqueness of specialised cell structures with their functions in multicellular organisms.", "Living Processes in Multicellular Organisms", "Cell Biology and Organisation"),
 makeEnglishSp("2.3.2", "Identify specialised cells in multicellular organisms.", "Living Processes in Multicellular Organisms", "Cell Biology and Organisation"),
 makeEnglishSp("2.3.3", "Analyse the density of certain organelles with the functions of specialised cells in multicellular organisms.", "Living Processes in Multicellular Organisms", "Cell Biology and Organisation"),
 makeEnglishSp("2.3.4", "Describe the effects of deficiency, absence or failure in the function of an organelle of certain cells in multicellular organisms.", "Living Processes in Multicellular Organisms", "Cell Biology and Organisation"),
 ],
 },
 {
 kod: "2.4",
 tajuk: "Levels of Organisationin Multicellular Organisms",
 spList: [
 makeEnglishSp("2.4.1", "Make a sequence of levels of organisation in multicellular organisms.", "Levels of Organisationin Multicellular Organisms", "Cell Biology and Organisation"),
 makeEnglishSp("2.4.2", "Identify cells, tissues or organs in an organ system.", "Levels of Organisationin Multicellular Organisms", "Cell Biology and Organisation"),
 makeEnglishSp("2.4.3", "Communicate about organ systems in multicellular organisms with their main functions. CELL BIOLOGY AND ORGANISATION", "Levels of Organisationin Multicellular Organisms", "Cell Biology and Organisation"),
 ],
 },
 ],
 },
 {
 id: "F4_B3",
 tingkatan: "Tingkatan 4",
 nomborBab: 3,
 tema: "Fundamentals of Biology",
 tajuk: "Movement of Substances Across a Plasma Membrane",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Movement of Substances Across a Plasma Membrane.",
 skList: [
 {
 kod: "3.1",
 tajuk: "Structure of Plasma Membrane",
 spList: [
 makeEnglishSp("3.1.1", "Justify the necessity of movement of substances across a plasma membrane.", "Structure of Plasma Membrane", "Movement of Substances Across a Plasma Membrane"),
 makeEnglishSp("3.1.2", "Describe the components of a plasma membrane and its function based on the fluid mosaic model.", "Structure of Plasma Membrane", "Movement of Substances Across a Plasma Membrane"),
 makeEnglishSp("3.1.3", "Draw and label the components of a plasma membrane based on the fluid mosaic model.", "Structure of Plasma Membrane", "Movement of Substances Across a Plasma Membrane"),
 makeEnglishSp("3.1.4", "Describe the permeability of a plasma membrane.", "Structure of Plasma Membrane", "Movement of Substances Across a Plasma Membrane"),
 ],
 },
 {
 kod: "3.2",
 tajuk: "Concept of Movement of Substances Across a Plasma Membrane",
 spList: [
 makeEnglishSp("3.2.1", "State the characteristics of substances that are able to move across a plasma membrane in these aspects: (i) size of molecules. (ii) polarity of molecules. (iii) ionic charge.", "Concept of Movement of Substances Across a Plasma Membrane", "Movement of Substances Across a Plasma Membrane"),
 makeEnglishSp("3.2.2", "Conduct experiments to study the movement of substances across a selectively permeable membrane by using: (i) Visking tubing. (ii) simple osmometer.", "Concept of Movement of Substances Across a Plasma Membrane", "Movement of Substances Across a Plasma Membrane"),
 makeEnglishSp("3.2.3", "Describe by using examples movement of substances across a plasma membrane: (i) passive transport. (ii) active transport.", "Concept of Movement of Substances Across a Plasma Membrane", "Movement of Substances Across a Plasma Membrane"),
 makeEnglishSp("3.2.5", "Compare and contrast passive transport and active transport.", "Concept of Movement of Substances Across a Plasma Membrane", "Movement of Substances Across a Plasma Membrane"),
 ],
 },
 {
 kod: "3.3",
 tajuk: "Movement of Substances Across a Plasma Membrane in Living",
 spList: [
 makeEnglishSp("3.3.1", "Explain by using examples the Organisms process of passive transport in organisms.", "Movement of Substances Across a Plasma Membrane in Living", "Movement of Substances Across a Plasma Membrane"),
 makeEnglishSp("3.3.2", "Explain by using examples the process of active transport in organisms.", "Movement of Substances Across a Plasma Membrane in Living", "Movement of Substances Across a Plasma Membrane"),
 makeEnglishSp("3.3.3", "Define: (i) hypotonic solution. (ii) hypertonic solution. (iii) isotonic solution.", "Movement of Substances Across a Plasma Membrane in Living", "Movement of Substances Across a Plasma Membrane"),
 makeEnglishSp("3.3.4", "Design an experiment to study the effects of different concentrations of solution on animal and plant cells.", "Movement of Substances Across a Plasma Membrane in Living", "Movement of Substances Across a Plasma Membrane", true),
 makeEnglishSp("3.3.5", "Communicate about the effects of", "Movement of Substances Across a Plasma Membrane in Living", "Movement of Substances Across a Plasma Membrane"),
 ],
 },
 {
 kod: "3.4",
 tajuk: "Movement of Substances Across a Plasma Membrane and its Application in Daily Life.",
 spList: [
 makeEnglishSp("3.4.1", "Conduct an experiment to determine the concentration of cell sap of a plant tissue.", "Movement of Substances Across a Plasma Membrane and its Application in Daily Life.", "Movement of Substances Across a Plasma Membrane", true),
 makeEnglishSp("3.4.2", "Correlate the concentration of cell sap in a plant tissue with the phenomenon of plant wilting.", "Movement of Substances Across a Plasma Membrane and its Application in Daily Life.", "Movement of Substances Across a Plasma Membrane"),
 makeEnglishSp("3.4.3", "Explain by using examples the application of the concept of movement of substances across a plasma membrane in daily life.", "Movement of Substances Across a Plasma Membrane and its Application in Daily Life.", "Movement of Substances Across a Plasma Membrane"),
 makeEnglishSp("3.4.4", "Communicate about reverse osmosis in water purification. MOVEMENT OF SUBSTANCES ACROSS A PLASMA MEMBRANE", "Movement of Substances Across a Plasma Membrane and its Application in Daily Life.", "Movement of Substances Across a Plasma Membrane"),
 ],
 },
 ],
 },
 {
 id: "F4_B4",
 tingkatan: "Tingkatan 4",
 nomborBab: 4,
 tema: "Fundamentals of Biology",
 tajuk: "Chemical Compositions in a Cell",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Chemical Compositions in a Cell.",
 skList: [
 {
 kod: "4.1",
 tajuk: "Water",
 spList: [
 makeEnglishSp("4.1.1", "Describe the properities water molecule.", "Water", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.1.2", "Correlate the properties of water with its importance in the cell.", "Water", "Chemical Compositions in a Cell"),
 ],
 },
 {
 kod: "4.2",
 tajuk: "Carbohydrates",
 spList: [
 makeEnglishSp("4.2.1", "List the elements of carbohydrate.", "Carbohydrates", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.2.2", "Explain the types of carbohydrates: (i) monosaccharides. (ii) disaccharides. (iii) polysaccharides.", "Carbohydrates", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.2.3", "Conceptualise the formation and breakdown of: (i) disaccharides. (ii) polysaccharides.", "Carbohydrates", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.2.4", "Write and explain the word equation for the formation and the breakdown of disaccharides.", "Carbohydrates", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.2.5", "Justify the importance of carbohydrates in cell.", "Carbohydrates", "Chemical Compositions in a Cell"),
 ],
 },
 {
 kod: "4.3",
 tajuk: "Proteins",
 spList: [
 makeEnglishSp("4.3.1", "List the elements of proteins.", "Proteins", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.3.2", "Conceptualise the formation and the breakdown of dipeptides and polypeptides.", "Proteins", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.3.3", "Write and explain the word equation for the formation and the breakdown of dipeptides.", "Proteins", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.3.4", "Justify the importance of proteins in a cell.", "Proteins", "Chemical Compositions in a Cell"),
 ],
 },
 {
 kod: "4.4",
 tajuk: "Lipids FORM 4 BIOLOGY KSSM",
 spList: [
 makeEnglishSp("4.4.1", "List the elements in lipids.", "Lipids FORM 4 BIOLOGY KSSM", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.4.2", "Explain the main types of lipids. Notes: Types of lipids: (i) fat. (ii) wax. (iii) phospholipids. (iv) steroids (cholesterol, testosterone, oestrogen and progesterone).", "Lipids FORM 4 BIOLOGY KSSM", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.4.3", "Describe the formation and the breakdown of a triglyceride.", "Lipids FORM 4 BIOLOGY KSSM", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.4.4", "Write and explain the word equation for the formation and the breakdown of a triglyceride.", "Lipids FORM 4 BIOLOGY KSSM", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.4.5", "Justify the importance of lipids in cell and multicellular organisms.", "Lipids FORM 4 BIOLOGY KSSM", "Chemical Compositions in a Cell"),
 ],
 },
 {
 kod: "4.5",
 tajuk: "Nucleic acids",
 spList: [
 makeEnglishSp("4.5.1", "List the elements in nucleic acids.", "Nucleic acids", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.5.2", "Explain the structure of nucleotides: (i) nitrogenous base. (ii) ribose or deoxyribose sugars. (iii) phosphate.", "Nucleic acids", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.5.3", "Describe the structure of the nucleic acids: (i) deoxyribonucleic acid (DNA). (ii) ribonucleic acid (RNA).", "Nucleic acids", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.5.4", "Justify the importance of nucleic acids in cells: (i) carrier of herediritary information. (ii) production of proteins.", "Nucleic acids", "Chemical Compositions in a Cell"),
 makeEnglishSp("4.5.5", "Describe the formation of chromosomes from DNA and proteins. CHEMICAL COMPOSITION IN A CELL", "Nucleic acids", "Chemical Compositions in a Cell"),
 ],
 },
 ],
 },
 {
 id: "F4_B5",
 tingkatan: "Tingkatan 4",
 nomborBab: 5,
 tema: "Fundamentals of Biology",
 tajuk: "Metabolism and Enzymes",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Metabolism and Enzymes.",
 skList: [
 {
 kod: "5.1",
 tajuk: "Metabolism",
 spList: [
 makeEnglishSp("5.1.1", "Define metabolism.", "Metabolism", "Metabolism and Enzymes"),
 makeEnglishSp("5.1.2", "State the types of metabolism in a cell: (i) anabolism. (ii) catabolism.", "Metabolism", "Metabolism and Enzymes"),
 ],
 },
 {
 kod: "5.2",
 tajuk: "Enzymes",
 spList: [
 makeEnglishSp("5.2.1", "Define enzymes.", "Enzymes", "Metabolism and Enzymes"),
 makeEnglishSp("5.2.2", "Reason out the necessity of enzymes in metabolism.", "Enzymes", "Metabolism and Enzymes"),
 makeEnglishSp("5.2.3", "Describe the naming of enzymes with the addition of \u2013ase to their substrates.", "Enzymes", "Metabolism and Enzymes"),
 makeEnglishSp("5.2.4", "Characterise the general properties of enzymes.", "Enzymes", "Metabolism and Enzymes"),
 makeEnglishSp("5.2.5", "Communicate about the involvement of specific organelles in the production of:", "Enzymes", "Metabolism and Enzymes"),
 makeEnglishSp("5.2.6", "(i) intracellular enzymes. (ii) extracellular enzymes. Explain the mechanism of enzyme action using the \u2018lock and key\u2019 hypothesis.", "Enzymes", "Metabolism and Enzymes"),
 makeEnglishSp("5.2.7", "Interpret energy diagrams to explain the mechanism of enzyme action.", "Enzymes", "Metabolism and Enzymes"),
 makeEnglishSp("5.2.8", "Correlate the mechanism of enzyme action with the change in the following factors: (i) temperature. (ii) pH. (iii) substrate concentration. (iv) enzyme concentration.", "Enzymes", "Metabolism and Enzymes"),
 makeEnglishSp("5.2.9", "Design and conduct experiments to study the effects of temperature and pH on the activities of amylase and pepsin.", "Enzymes", "Metabolism and Enzymes"),
 ],
 },
 {
 kod: "5.3",
 tajuk: "Application of Enzymes in Daily Life",
 spList: [
 makeEnglishSp("5.3.1", "Explain by using examples the application of enzymes in daily life. METABOLISM AND ENZYMES", "Application of Enzymes in Daily Life", "Metabolism and Enzymes"),
 ],
 },
 ],
 },
 {
 id: "F4_B6",
 tingkatan: "Tingkatan 4",
 nomborBab: 6,
 tema: "Fundamentals of Biology",
 tajuk: "Cell Division",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Cell Division.",
 skList: [
 {
 kod: "6.1",
 tajuk: "Cell Division",
 spList: [
 makeEnglishSp("6.1.1", "Describe: (i) karyokinesis (nuclear division). (ii) cytokinesis (cytoplasmic division).", "Cell Division", "Cell Division"),
 makeEnglishSp("6.1.2", "Describe the terms haploid, diploid, chromatin, homologous chromosomes, paternal chromosome and maternal chromosome.", "Cell Division", "Cell Division"),
 ],
 },
 {
 kod: "6.2",
 tajuk: "Cell Cycle and Mitosis",
 spList: [
 makeEnglishSp("6.2.1", "Describe the phases in a cell cycle: (i) interphase. (ii) G1 phase. (iii) S phase. (iv) G2 phase. (v) M phase. (vi) mitosis. (vii) cytokinesis.", "Cell Cycle and Mitosis", "Cell Division"),
 makeEnglishSp("6.2.2", " Arrange the stages of mitosis in the correct order.", "Cell Cycle and Mitosis", "Cell Division"),
 makeEnglishSp("6.2.3", "Communicate about the cell structure of each stage of mitosis and cytokinesis by using labelled diagrams.", "Cell Cycle and Mitosis", "Cell Division"),
 makeEnglishSp("6.2.4", "Compare and contrast mitosis and cytokinesis in animal and plant cells.", "Cell Cycle and Mitosis", "Cell Division"),
 makeEnglishSp("6.2.5", "Discuss the necessity of mitosis in: (i) development of embryo. (ii) growth of organisms. (iii) healing of wounds on the skin. (iv) regeneration. (v) asexual reproduction.", "Cell Cycle and Mitosis", "Cell Division"),
 ],
 },
 {
 kod: "6.3",
 tajuk: "Meiosis",
 spList: [
 makeEnglishSp("6.3.1", "State the meaning of meiosis.", "Meiosis", "Cell Division"),
 makeEnglishSp("6.3.2", "Identify types of cells that undergo meiosis.", "Meiosis", "Cell Division"),
 makeEnglishSp("6.3.3", "State the necessity of meoisis in: (i) the formation of gametes. (gametogenesis). (ii) producing genetic variation. (iii) maintaining diploid chromosomal numbers from one generation to another.", "Meiosis", "Cell Division"),
 makeEnglishSp("6.3.4", "Explain the stages of meiosis in the correct order: (i) Meiosis I. (ii) Meiosis II.", "Meiosis", "Cell Division"),
 makeEnglishSp("6.3.5", "Draw and label the cell structure in each stage of meiosis I, meiosis II and cytokinesis.", "Meiosis", "Cell Division"),
 makeEnglishSp("6.3.7", "Compare and contrast meiosis and mitosis.", "Meiosis", "Cell Division"),
 ],
 },
 {
 kod: "6.4",
 tajuk: "Issues of Cell Division on Human Health",
 spList: [
 makeEnglishSp("6.4.1", "Explain the effects of abnormal mitosis on human health: (i) tumour. (ii) cancer.", "Issues of Cell Division on Human Health", "Cell Division"),
 makeEnglishSp("6.4.2", "Evaluate the effects of abnormal meiosis on Down Syndrome individuals. CELL DIVISION", "Issues of Cell Division on Human Health", "Cell Division"),
 ],
 },
 ],
 },
 {
 id: "F4_B7",
 tingkatan: "Tingkatan 4",
 nomborBab: 7,
 tema: "Fundamentals of Biology",
 tajuk: "Cellular Respiration",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Cellular Respiration.",
 skList: [
 {
 kod: "7.1",
 tajuk: "Production of energy through cellular respiration",
 spList: [
 makeEnglishSp("7.1.1", "Justify the necessity of energy in metabolic processes.", "Production of energy through cellular respiration", "Cellular Respiration"),
 makeEnglishSp("7.1.2", "Identify the main substrate used in energy production.", "Production of energy through cellular respiration", "Cellular Respiration"),
 makeEnglishSp("7.1.3", "List the types of cellular respiration: (i) aerobic respiration. (ii) anaerobic respiration. (iii) fermentation.", "Production of energy through cellular respiration", "Cellular Respiration"),
 ],
 },
 {
 kod: "7.2",
 tajuk: "Aerobic respiration",
 spList: [
 makeEnglishSp("7.2.1", "Conceptualise energy production from glucose during aerobic respiration in cells.", "Aerobic respiration", "Cellular Respiration"),
 makeEnglishSp("7.2.2", "Write a word equation for aerobic respiration in cells.", "Aerobic respiration", "Cellular Respiration"),
 makeEnglishSp("7.2.3", "Conduct an experiment to study aerobic respiration.", "Aerobic respiration", "Cellular Respiration", true),
 ],
 },
 {
 kod: "7.3",
 tajuk: "Fermentation FORM 4 BIOLOGY KSSM",
 spList: [
 makeEnglishSp("7.3.1", "State the factors that cause fermentation to occur in cells.", "Fermentation FORM 4 BIOLOGY KSSM", "Cellular Respiration"),
 makeEnglishSp("7.3.2", "Explain by using examples energy production from glucose during fermentation in: (i) human muscle cells. (ii) Lactobacillus. (iii) yeast. (iv) plants such as paddy.", "Fermentation FORM 4 BIOLOGY KSSM", "Cellular Respiration"),
 makeEnglishSp("7.3.3", "Write and explain word equations for: (i) lactic acid fermentation. (ii) alcohol fermentation.", "Fermentation FORM 4 BIOLOGY KSSM", "Cellular Respiration"),
 makeEnglishSp("7.3.4", "Conduct an experiment to study fermentation in yeast.", "Fermentation FORM 4 BIOLOGY KSSM", "Cellular Respiration", true),
 makeEnglishSp("7.3.6", "Compare and contrast aerobic respiration and fermentation. CELLULAR RESPIRATION", "Fermentation FORM 4 BIOLOGY KSSM", "Cellular Respiration"),
 ],
 },
 ],
 },
 {
 id: "F4_B8",
 tingkatan: "Tingkatan 4",
 nomborBab: 8,
 tema: "Physiology of Humans and Animals",
 tajuk: "Respiratory Systems in Humans and Animals",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Respiratory Systems in Humans and Animals.",
 skList: [
 {
 kod: "8.1",
 tajuk: "Types of Respiratory System",
 spList: [
 makeEnglishSp("8.1.1", "Identify respiratory structures in: (i) insects. (ii) fish. (iii) amphibians. (iv) humans.", "Types of Respiratory System", "Respiratory Systems in Humans and Animals"),
 makeEnglishSp("8.1.2", "Describe the adaptation of respiratory structures and their functions for gaseous exchange in: (i) animals. (ii) humans.", "Types of Respiratory System", "Respiratory Systems in Humans and Animals"),
 makeEnglishSp("8.1.3", "Compare and contrast respiratory structures in humans and animals.", "Types of Respiratory System", "Respiratory Systems in Humans and Animals"),
 ],
 },
 {
 kod: "8.2",
 tajuk: "Mechanisms of Breathing",
 spList: [
 makeEnglishSp("8.2.1", "Compare and contrast breathing mechanisms in humans and animals.", "Mechanisms of Breathing", "Respiratory Systems in Humans and Animals"),
 ],
 },
 {
 kod: "8.3",
 tajuk: "Gaseous Exchange in Humans",
 spList: [
 makeEnglishSp("8.3.1", "Communicate about external and internal respirations: (i) gaseous exchange between lungs and blood. (ii) transport of respiratory gases from lungs to tissues. (iii) gaseous exchange between blood and tissues. (iv) transport of respiratory gases from tissues to lungs.", "Gaseous Exchange in Humans", "Respiratory Systems in Humans and Animals"),
 ],
 },
 {
 kod: "8.4",
 tajuk: "Health Issues Related to the Human Respiratory System",
 spList: [
 makeEnglishSp("8.4.1", "Narrate the effects of Chronic Obstructive Pulmonary Disease (COPD) on the human respiratory system: (i) asthma. (ii) chronic bronchitis. (iii) emphysema. RESPIRATORY SYSTEMS IN HUMANS AND ANIMALS", "Health Issues Related to the Human Respiratory System", "Respiratory Systems in Humans and Animals"),
 ],
 },
 ],
 },
 {
 id: "F4_B9",
 tingkatan: "Tingkatan 4",
 nomborBab: 9,
 tema: "Physiology of Humans and Animals",
 tajuk: "Nutrition and Human Digestive System",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Nutrition and Human Digestive System.",
 skList: [
 {
 kod: "9.1",
 tajuk: "Digestive System",
 spList: [
 makeEnglishSp("9.1.1", "Identify structures of the human digestive system.", "Digestive System", "Nutrition and Human Digestive System"),
 ],
 },
 {
 kod: "9.2",
 tajuk: "Digestion",
 spList: [
 makeEnglishSp("9.2.1", "Describe the types of digestion: (i) physical digestion. (ii) chemical digestion.", "Digestion", "Nutrition and Human Digestive System"),
 makeEnglishSp("9.2.2", "Analyse the process and products of carbohydrate digestion in the mouth.", "Digestion", "Nutrition and Human Digestive System"),
 makeEnglishSp("9.2.3", "Analyse the process and products of protein digestion in the stomach.", "Digestion", "Nutrition and Human Digestive System"),
 makeEnglishSp("9.2.4", "Describe digestions of carbohydrates, proteins and lipids in the small intestine.", "Digestion", "Nutrition and Human Digestive System"),
 makeEnglishSp("9.2.5", "Conduct experiments to study digestions of starch, proteins and lipids in food samples.", "Digestion", "Nutrition and Human Digestive System"),
 ],
 },
 {
 kod: "9.3",
 tajuk: "Absorption",
 spList: [
 makeEnglishSp("9.3.1", "Identify the structure of a villus in the ileum.", "Absorption", "Nutrition and Human Digestive System"),
 makeEnglishSp("9.3.2", "Communicate about the adaptations of ileum and villus in the absorption of digested food.", "Absorption", "Nutrition and Human Digestive System"),
 ],
 },
 {
 kod: "9.4",
 tajuk: "Assimilation",
 spList: [
 makeEnglishSp("9.4.1", "Describe the roles of the circulatory system in assimilation of digested food.", "Assimilation", "Nutrition and Human Digestive System"),
 makeEnglishSp("9.4.2", "Discuss the functions of liver in assimilation of digested food: (i) metabolisms of digested food (carbohydrates and proteins). (ii) storage of nutrients. (iii) detoxification.", "Assimilation", "Nutrition and Human Digestive System"),
 ],
 },
 {
 kod: "9.5",
 tajuk: "Defaecation",
 spList: [
 makeEnglishSp("9.5.1", "Explain the functions of the large intestine: (i) absorption of water and vitamins. (ii) formation of faeces.", "Defaecation", "Nutrition and Human Digestive System"),
 ],
 },
 {
 kod: "9.6",
 tajuk: "Balanced Diet",
 spList: [
 makeEnglishSp("9.6.1", "Conduct an experiment to study the energy values in food samples.", "Balanced Diet", "Nutrition and Human Digestive System", true),
 makeEnglishSp("9.6.2", "Conduct an experiment to determine the contents of vitamin C in fruit or vegetables juices.", "Balanced Diet", "Nutrition and Human Digestive System", true),
 makeEnglishSp("9.6.3", "Justify the modification of diets for individuals that: (i) experience obesity. (ii) experience a specific disease - diabetes mellitus. - cardiovascular. - cancer.", "Balanced Diet", "Nutrition and Human Digestive System"),
 ],
 },
 {
 kod: "9.7",
 tajuk: "Health Issues Related to the Digestive System and Eating Habits",
 spList: [
 makeEnglishSp("9.7.1", "Predict the effects of modifying digestive organs on human health.", "Health Issues Related to the Digestive System and Eating Habits", "Nutrition and Human Digestive System"),
 makeEnglishSp("9.7.2", "Outline health issues related to defecation.", "Health Issues Related to the Digestive System and Eating Habits", "Nutrition and Human Digestive System"),
 makeEnglishSp("9.7.3", "Correlate health issues that are related to eating habits. NUTRITION AND HUMAN DIGESTIVE SYSTEM", "Health Issues Related to the Digestive System and Eating Habits", "Nutrition and Human Digestive System"),
 ],
 },
 ],
 },
 {
 id: "F4_B10",
 tingkatan: "Tingkatan 4",
 nomborBab: 10,
 tema: "Physiology of Humans and Animals",
 tajuk: "Transport in Humans and Animals",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Transport in Humans and Animals.",
 skList: [
 {
 kod: "10.1",
 tajuk: "Types of Circulatory System",
 spList: [
 makeEnglishSp("10.1.1", "Justify the necessity of transport systems in complex multicellular organisms.", "Types of Circulatory System", "Transport in Humans and Animals"),
 makeEnglishSp("10.1.2", "Identify substances that are transported by the transport system: (i) substances required by a cell. (ii) waste products of a cell.", "Types of Circulatory System", "Transport in Humans and Animals"),
 makeEnglishSp("10.1.3", "Conceptualise types of circulatory system in complex multicellular organisms. (i) open circulatory system. (ii) closed circulatory system.", "Types of Circulatory System", "Transport in Humans and Animals"),
 makeEnglishSp("10.1.4", "Compare and contrast circulatory systems in complex multicellular organisms: (i) insects. (ii) fish. (iii) amphibians. (iv) humans.", "Types of Circulatory System", "Transport in Humans and Animals"),
 ],
 },
 {
 kod: "10.2",
 tajuk: "Circulatory System of Humans",
 spList: [
 makeEnglishSp("10.2.1", "Describe components of the human circulatory system: (i) heart. (ii) blood vessel. (iii) blood.", "Circulatory System of Humans", "Transport in Humans and Animals"),
 makeEnglishSp("10.2.2", "Explain the composition of blood: (i) blood plasma. (ii) blood cells.", "Circulatory System of Humans", "Transport in Humans and Animals"),
 makeEnglishSp("10.2.3", "Compare and contrast the types of blood vessels: (i) artery. (ii) vein. (iii) capillary.", "Circulatory System of Humans", "Transport in Humans and Animals"),
 makeEnglishSp("10.2.4", "Label the structure of a human heart and associated blood vessels: (i) aorta. (ii) vena cava. (iii) pulmonary artery and pulmonary vein. (iv) coronary artery and coronary vein. (v) semilunar valve. (vi) bicuspid valve and tricuspid valve. (vii) septum.", "Circulatory System of Humans", "Transport in Humans and Animals"),
 makeEnglishSp("10.2.5", "Describe the functions of parts of the heart.", "Circulatory System of Humans", "Transport in Humans and Animals"),
 ],
 },
 {
 kod: "10.3",
 tajuk: "Mechanism of Heart Beat",
 spList: [
 makeEnglishSp("10.3.1", "Describe the human heart beat mechanism: (i) sinoatrial node (pacemaker) . (ii) atrioventricular node. (iii) bundle of His. (iv) Purkinje fibres.", "Mechanism of Heart Beat", "Transport in Humans and Animals"),
 makeEnglishSp("10.3.2", "Communicate about forces that cause the blood to circulate in humans: (i) pumping of the heart. (ii) contraction of skeletal muscles.", "Mechanism of Heart Beat", "Transport in Humans and Animals"),
 ],
 },
 {
 kod: "10.4",
 tajuk: "Mechanism of Blood Clotting",
 spList: [
 makeEnglishSp("10.4.1", "Justify the necessity for blood clotting mechanism.", "Mechanism of Blood Clotting", "Transport in Humans and Animals"),
 makeEnglishSp("10.4.2", "Describe blood clotting mechanism.", "Mechanism of Blood Clotting", "Transport in Humans and Animals"),
 makeEnglishSp("10.4.3", "Describe health issues related to blood clotting: (i) thrombosis. (ii) embolism. (iii) haemophilia.", "Mechanism of Blood Clotting", "Transport in Humans and Animals"),
 ],
 },
 {
 kod: "10.5",
 tajuk: "Blood Grouping in Humans",
 spList: [
 makeEnglishSp("10.5.1", "Describe ABO blood group.", "Blood Grouping in Humans", "Transport in Humans and Animals"),
 makeEnglishSp("10.5.2", "Emphasis is given to antigen A, antigen B, anti-A antibody and anti-B antibody. Correlate ABO blood group with blood donation.", "Blood Grouping in Humans", "Transport in Humans and Animals"),
 makeEnglishSp("10.5.3", "Describe Rhesus factor.", "Blood Grouping in Humans", "Transport in Humans and Animals"),
 makeEnglishSp("10.5.4", "Reason out incompatibility of Rhesus factor in pregnancies.", "Blood Grouping in Humans", "Transport in Humans and Animals"),
 ],
 },
 {
 kod: "10.6",
 tajuk: "Health Issues Related to the Human Circulatory System",
 spList: [
 makeEnglishSp("10.6.1", "Justify the necessity for a healthy circulatory system.", "Health Issues Related to the Human Circulatory System", "Transport in Humans and Animals"),
 makeEnglishSp("10.6.2", "Communicate about cardiovascular diseases.", "Health Issues Related to the Human Circulatory System", "Transport in Humans and Animals"),
 ],
 },
 {
 kod: "10.7",
 tajuk: "Lymphatic System of Humans",
 spList: [
 makeEnglishSp("10.7.1", "Synthesise the process of formation of tissue fluid and lymph.", "Lymphatic System of Humans", "Transport in Humans and Animals"),
 makeEnglishSp("10.7.2", "Compare and contrast the contents of lymph and: (i) tissue fluid. (ii) blood.", "Lymphatic System of Humans", "Transport in Humans and Animals"),
 makeEnglishSp("10.7.3", "Describe components of the lymphatic system: (i) lymph. (ii) lymphatic capillaries. (iii) lymphatic vessels. (iv) lymph nodes. (v) lymphatic organs.", "Lymphatic System of Humans", "Transport in Humans and Animals"),
 makeEnglishSp("10.7.4", "Justify the necessity of the lymphatic system: (i) complements the blood circulatory system. (ii) transports lipid soluble substances. (iii) body defence.", "Lymphatic System of Humans", "Transport in Humans and Animals"),
 ],
 },
 {
 kod: "10.8",
 tajuk: "Health Issues Related to the Human Lymphatic System",
 spList: [
 makeEnglishSp("10.8.1", "Describe health issues related to the lymphatic system. TRANSPORT IN HUMANS AND ANIMALS", "Health Issues Related to the Human Lymphatic System", "Transport in Humans and Animals"),
 ],
 },
 ],
 },
 {
 id: "F4_B11",
 tingkatan: "Tingkatan 4",
 nomborBab: 11,
 tema: "Physiology of Humans and Animals",
 tajuk: "Immunity in Humans",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Immunity in Humans.",
 skList: [
 {
 kod: "11.1",
 tajuk: "Body Defence",
 spList: [
 makeEnglishSp("11.1.1", "Define: (i) immunity. (ii) antigen. (iii) antibody.", "Body Defence", "Immunity in Humans"),
 makeEnglishSp("11.1.2", "Describe the three lines of body defence in humans: (i) first line of defence - physical - chemical (ii) second line of defence - fever - inflammation - phagocytosis (iii) third line of defence - antibody - memory cell", "Body Defence", "Immunity in Humans"),
 ],
 },
 {
 kod: "11.2",
 tajuk: "Actions of Antibodies",
 spList: [
 makeEnglishSp("11.2.1", "Discuss the actions of antibodies on foreign antigens: (i) neutralisation. (ii) agglutination. (iii) precipitation. (iv) opsonisation. (v) complement fixation.", "Actions of Antibodies", "Immunity in Humans"),
 ],
 },
 {
 kod: "11.3",
 tajuk: "Types of Immunity",
 spList: [
 makeEnglishSp("11.3.1", "Communicate about the types of immunity: (i) passive immunity. (ii) active immunity.", "Types of Immunity", "Immunity in Humans"),
 makeEnglishSp("11.3.2", "Compare and contrast passive immunity and active immunity.", "Types of Immunity", "Immunity in Humans"),
 ],
 },
 {
 kod: "11.4",
 tajuk: "Health Issues Related to Immunity",
 spList: [
 makeEnglishSp("11.4.1", "Describe health issues related to Acquired Immuno Deficiency Syndrome (AIDS). IMMUNITY IN HUMANS", "Health Issues Related to Immunity", "Immunity in Humans"),
 ],
 },
 ],
 },
 {
 id: "F4_B12",
 tingkatan: "Tingkatan 4",
 nomborBab: 12,
 tema: "Physiology of Humans and Animals",
 tajuk: "Coordination and Response in Humans",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Coordination and Response in Humans.",
 skList: [
 {
 kod: "12.1",
 tajuk: "Coordination and Response",
 spList: [
 makeEnglishSp("12.1.1", "Make a sequence and describe components in human coordination: (i) stimulus. (ii) receptor. (iii) integration centre. (iv) effector. (v) response.", "Coordination and Response", "Coordination and Response in Humans"),
 makeEnglishSp("12.1.2", "Identify and describe external and internal stimuli List the types of sensory receptors based on the stimuli involved: (i) chemoreceptor. (ii) mechanoreceptor. (iii) photoreceptor. (iv) thermoreceptor. (v) baroreceptor. (vi) nocireceptor.", "Coordination and Response", "Coordination and Response in Humans"),
 makeEnglishSp("12.1.3", "Justify the necessity to respond to external and internal stimuli.", "Coordination and Response", "Coordination and Response in Humans"),
 makeEnglishSp("12.1.4", " ", "Coordination and Response", "Coordination and Response in Humans"),
 ],
 },
 {
 kod: "12.2",
 tajuk: "Nervous System",
 spList: [
 makeEnglishSp("12.2.1", "Construct an organisational chart and explain the structures of the human nervous system: (i) central nervous system - brain - spinal cord (i) peripheral nervous system - sensory receptor - cranial nerve - spinal nerve", "Nervous System", "Coordination and Response in Humans"),
 makeEnglishSp("12.2.2", "Explain the functions of parts of in the central nervous system related to coordination and response. (i) brain - cerebrum - cerebellum - medulla oblongata - hypotalamus - pituitary gland (ii) spinal cord Communicate about the functions of parts of the peripheral nervous system in coordination and response.", "Nervous System", "Coordination and Response in Humans"),
 makeEnglishSp("12.2.3", " ", "Nervous System", "Coordination and Response in Humans"),
 ],
 },
 {
 kod: "12.3",
 tajuk: "Neurones and Synapse",
 spList: [
 makeEnglishSp("12.3.1", "Draw and label structures of a sensory neurone and a motor neurone: (i) dendrite. (ii) axon. (iii) cell body . (iv) myelin sheath. (v) node of Ranvier.", "Neurones and Synapse", "Coordination and Response in Humans"),
 makeEnglishSp("12.3.2", "Analyse the functions of each type of neurone in impulse transmission.", "Neurones and Synapse", "Coordination and Response in Humans"),
 makeEnglishSp("12.3.3", "Explain the structure and function of synapse.", "Neurones and Synapse", "Coordination and Response in Humans"),
 makeEnglishSp("12.3.4", "Explain the transmission of impulse across a synapse.", "Neurones and Synapse", "Coordination and Response in Humans"),
 ],
 },
 {
 kod: "12.4",
 tajuk: "Voluntary and Involuntary Actions",
 spList: [
 makeEnglishSp("12.4.1", "Compare and contrast voluntary and involuntary actions.", "Voluntary and Involuntary Actions", "Coordination and Response in Humans"),
 makeEnglishSp("12.4.2", "Describe the reflex actions involving: (i) two neurones. (ii) three neurones.", "Voluntary and Involuntary Actions", "Coordination and Response in Humans"),
 makeEnglishSp("12.4.3", "Draw a reflex arc.", "Voluntary and Involuntary Actions", "Coordination and Response in Humans"),
 ],
 },
 {
 kod: "12.5",
 tajuk: "Health Issues Related to the Nervous System",
 spList: [
 makeEnglishSp("12.5.1", "Communicate about the health issues related to the nervous system.", "Health Issues Related to the Nervous System", "Coordination and Response in Humans"),
 makeEnglishSp("12.5.2", "Describe the effects of drug and alcohol abuse on human coordination and response.", "Health Issues Related to the Nervous System", "Coordination and Response in Humans"),
 ],
 },
 {
 kod: "12.6",
 tajuk: "Endocrine System",
 spList: [
 makeEnglishSp("12.6.1", "State the role of endocrine glands in humans.", "Endocrine System", "Coordination and Response in Humans"),
 makeEnglishSp("12.6.2", "Identify and label the endocrine glands in humans.", "Endocrine System", "Coordination and Response in Humans"),
 makeEnglishSp("12.6.3", "Analyse the functions of hormones secreted by each endocrine glands: (i) hypothalamus - gonadotropin releasing hormone (GnRH) (ii) anterior lobe of pituitary - growth hormone (GH) - follicle stimulating hormone (FSH) - luteinising hormone (LH) - thyroid stimulating hormone (TSH) - adrenocorticotropic hormone (ACTH)", "Endocrine System", "Coordination and Response in Humans"),
 makeEnglishSp("12.6.4", "Discuss involvements of the nervous system and endocrine system in a \u201cfight or flight\u201d situation.", "Endocrine System", "Coordination and Response in Humans"),
 makeEnglishSp("12.6.5", "Compare and contrast the nervous and the endocrine system.", "Endocrine System", "Coordination and Response in Humans"),
 ],
 },
 {
 kod: "12.7",
 tajuk: "Health Issues Related to Endocrine System",
 spList: [
 makeEnglishSp("12.7.1", "Predict the effects of hormonal imbalances on human health.", "Health Issues Related to Endocrine System", "Coordination and Response in Humans"),
 ],
 },
 ],
 },
 {
 id: "F4_B13",
 tingkatan: "Tingkatan 4",
 nomborBab: 13,
 tema: "Physiology of Humans and Animals",
 tajuk: "Homeostasis and Human Urinary System",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Homeostasis and Human Urinary System.",
 skList: [
 {
 kod: "13.1",
 tajuk: "Homeostasis",
 spList: [
 makeEnglishSp("13.1.1", "Explain the meaning of homeostasis.", "Homeostasis", "Homeostasis and Human Urinary System"),
 makeEnglishSp("13.1.2", "Justify the neccesity to maintain physical and chemical factors in the internal environment.", "Homeostasis", "Homeostasis and Human Urinary System"),
 makeEnglishSp("13.1.3", "Describe the involvement of various organ systems in maintaining an optimal internal environment.", "Homeostasis", "Homeostasis and Human Urinary System"),
 makeEnglishSp("13.1.4", "Apply the knowledge of homeostasis concept in regulation of: (i) body temperature. (ii) blood sugar level. (iii) partial pressure of carbon dioxide. (iv) blood pressure.", "Homeostasis", "Homeostasis and Human Urinary System"),
 ],
 },
 {
 kod: "13.2",
 tajuk: "Urinary System",
 spList: [
 makeEnglishSp("13.2.1", "Identify the structure and functions of a kidney.", "Urinary System", "Homeostasis and Human Urinary System"),
 makeEnglishSp("13.2.2", "Draw, label and explain the structure of a nephrone and collecting duct.", "Urinary System", "Homeostasis and Human Urinary System"),
 makeEnglishSp("13.2.3", "Describe the formation of urine: (i) ultrafiltration. (ii) reabsorption. (iii) secretion.", "Urinary System", "Homeostasis and Human Urinary System"),
 makeEnglishSp("13.2.4", "Synthesise the concept of homeostasis by using negative feedback mechanism in osmoregulation.", "Urinary System", "Homeostasis and Human Urinary System"),
 makeEnglishSp("13.2.5", "Conduct an experiment to study the effects of different volumes of of water intake on urine formation.", "Urinary System", "Homeostasis and Human Urinary System", true),
 ],
 },
 {
 kod: "13.3",
 tajuk: "Health Issues Related to Urinary System",
 spList: [
 makeEnglishSp("13.3.1", "Describe health issues that are related to the urinary system. HOMEOSTASIS AND HUMAN URINARY SYSTEM", "Health Issues Related to Urinary System", "Homeostasis and Human Urinary System"),
 ],
 },
 ],
 },
 {
 id: "F4_B14",
 tingkatan: "Tingkatan 4",
 nomborBab: 14,
 tema: "Physiology of Humans and Animals",
 tajuk: "Support and Movement in Humans and Animals",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Support and Movement in Humans and Animals.",
 skList: [
 {
 kod: "14.1",
 tajuk: "Types of Skeleton",
 spList: [
 makeEnglishSp("14.1.1", "List the types of skeleton in humans and animals: (i) hydrostatic skeleton. (ii) exoskeleton. (iii) endoskeleton.", "Types of Skeleton", "Support and Movement in Humans and Animals"),
 makeEnglishSp("14.1.2", "Justify the necessity of skeletons in humans and animals.", "Types of Skeleton", "Support and Movement in Humans and Animals"),
 ],
 },
 {
 kod: "14.2",
 tajuk: "Musculoskeletal System of Humans",
 spList: [
 makeEnglishSp("14.2.1", "Identify bones that form the human skeletal system: (i) axial skeleton. (ii) appendicular skeleton.", "Musculoskeletal System of Humans", "Support and Movement in Humans and Animals"),
 makeEnglishSp("14.2.2", "Characterise types of vertebrae in the backbone: (i) cervical vertebrae (including atlas and axial). (ii) thoracic vertebrae. (iii) lumbar vertebrae. (iv) sacral vertebrae. (v) caudal vertebrae.", "Musculoskeletal System of Humans", "Support and Movement in Humans and Animals"),
 makeEnglishSp("14.2.3", "Compare and contrast the types of vertebrae.", "Musculoskeletal System of Humans", "Support and Movement in Humans and Animals"),
 makeEnglishSp("14.2.4", "State types of joints in the human skeletal system. (i) immovable joints. (ii) slightly moveable joints. (iii) freely moveable joints.", "Musculoskeletal System of Humans", "Support and Movement in Humans and Animals"),
 makeEnglishSp("14.2.5", "Draw, label and explain the human forearm hinge joint structure: (i) bones. (ii) cartilages. (iii) skeletal muscles. (iv) tendons. (v) ligaments. (vi) sinovial membrane. (vii) sinovial fluid.", "Musculoskeletal System of Humans", "Support and Movement in Humans and Animals"),
 ],
 },
 {
 kod: "14.3",
 tajuk: "Movement and Locomotion",
 spList: [
 makeEnglishSp("14.3.1", "Explain the movement mechanisms in: (i) human forearm. (ii) human leg (walking).", "Movement and Locomotion", "Support and Movement in Humans and Animals"),
 makeEnglishSp("14.3.2", "Describe briefly the locomotion mechanisms in animals.", "Movement and Locomotion", "Support and Movement in Humans and Animals"),
 ],
 },
 {
 kod: "14.4",
 tajuk: "Health Issues Related to the Human Musculoskeletal System",
 spList: [
 makeEnglishSp("14.4.1", "Describe health issues related to thehuman musculoskeletal system: (i) osteoporosis. (ii) osteomalacia. (iii) rickets. (iv) arthritis. (v) scoliosis.", "Health Issues Related to the Human Musculoskeletal System", "Support and Movement in Humans and Animals"),
 makeEnglishSp("14.4.2", "Justify practices to maintain a healthy musculoskeletal system. SUPPORT AND MOVEMENT IN HUMANS AND ANIMALS", "Health Issues Related to the Human Musculoskeletal System", "Support and Movement in Humans and Animals"),
 ],
 },
 ],
 },
 {
 id: "F4_B15",
 tingkatan: "Tingkatan 4",
 nomborBab: 15,
 tema: "Physiology of Humans and Animals",
 tajuk: "Sexual Reproduction, Development and Growth in Humans and Animals",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Sexual Reproduction, Development and Growth in Humans and Animals.",
 skList: [
 {
 kod: "15.1",
 tajuk: "Reproductive System of Humans",
 spList: [
 makeEnglishSp("15.1.1", "Characterise the anatomy of: (i) male reproductive system. (ii) female reproductive system.", "Reproductive System of Humans", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 ],
 },
 {
 kod: "15.2",
 tajuk: "Gametogenesis in Humans",
 spList: [
 makeEnglishSp("15.2.1", "Justify the necessity of gametogenesis.", "Gametogenesis in Humans", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.2.2", "Describe gamete formation: (i) spermatogenesis. (ii) oogenesis.", "Gametogenesis in Humans", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.2.3", "Identify the structure of: (i) sperm - head - middle piece - tail (ii) Graafian follicle - secondary oocyte - follicular cells", "Gametogenesis in Humans", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.2.4", "Compare and contrast between spermatogenesis and oogenesis.", "Gametogenesis in Humans", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 ],
 },
 {
 kod: "15.3",
 tajuk: "Menstrual Cycle",
 spList: [
 makeEnglishSp("15.3.1", "Analyse the changes in the levels of hormones involved during: (i) menstruation. (ii) folicle development. (iii) thickening of the endometrium. (iv) ovulation. (v) corpus luteum formation.", "Menstrual Cycle", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.3.2", "Correlate the changes in the levels of hormones involved with: (i) pregnancy. (ii) miscarriage.", "Menstrual Cycle", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.3.3", "State the meaning of premenstrual syndrome and menopausal syndrome.", "Menstrual Cycle", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 ],
 },
 {
 kod: "15.4",
 tajuk: "Development of Human Foetus",
 spList: [
 makeEnglishSp("15.4.1", "Describe fertilisation process and the formation of zygotes.", "Development of Human Foetus", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.4.2", "Make a sequences and explain the early development of an embryo until implantation: (i) two-celled embryo. (ii) morula. (iii) blastocyst.", "Development of Human Foetus", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.4.3", "Explain the role of human chorionic gonadotropin (HCG) hormone in the early stages of pregnancy.", "Development of Human Foetus", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.4.4", "Communicate about the roles of following structures in the development of a foetus: (i) placenta. (ii) umbilical cord.", "Development of Human Foetus", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.4.5", "Justify the necessity for separate foetal and maternal blood circulatory systems.", "Development of Human Foetus", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 ],
 },
 {
 kod: "15.5",
 tajuk: "Formation of Twins",
 spList: [
 makeEnglishSp("15.5.1", "Describe the processes in the formation of twins: (i) identical twins. (ii) fraternal twins.", "Formation of Twins", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.5.2", "Compare and contrast between identical and fraternal twins.", "Formation of Twins", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.5.3", "Correlate cellular division with the formation of conjoined twins.", "Formation of Twins", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 ],
 },
 {
 kod: "15.6",
 tajuk: "Health Issues Related to the Human Reproductive System",
 spList: [
 makeEnglishSp("15.6.1", "State the meaning of impotency.", "Health Issues Related to the Human Reproductive System", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.6.2", "Communicate about causes of human impotency.", "Health Issues Related to the Human Reproductive System", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 ],
 },
 {
 kod: "15.7",
 tajuk: "Growth in Humans and Animals",
 spList: [
 makeEnglishSp("15.7.1", "Explain the meaning of growth in organisms.", "Growth in Humans and Animals", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.7.2", "Determine parameters to measure growth in humans and animals.", "Growth in Humans and Animals", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.7.3", "Describe the growth of insects with exoskeleton: \u2022 complete metamorphosis. \u2022 incomplete metamorphosis.", "Growth in Humans and Animals", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.7.4", "Analyse the growth phases on sigmoid growth curves of humans and animals.", "Growth in Humans and Animals", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 makeEnglishSp("15.7.5", "Analyse the staircase-shaped growth curve of animals with exoskeletons. SEXUAL REPRODUCTION, DEVELOPMENT AND GROWTH IN HUMANS AND ANIMALS", "Growth in Humans and Animals", "Sexual Reproduction, Development and Growth in Humans and Animals"),
 ],
 },
 ],
 },
 {
 id: "F5_B16",
 tingkatan: "Tingkatan 5",
 nomborBab: 16,
 tema: "Physiology of Flowering Plants",
 tajuk: "Organisation of Plant Tissues and Growth",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Organisation of Plant Tissues and Growth.",
 skList: [
 {
 kod: "16.1",
 tajuk: "Organisation of Plant Tissues",
 spList: [
 makeEnglishSp("16.1.1", "Communicate about the types of plant tissue and their main functions.", "Organisation of Plant Tissues", "Organisation of Plant Tissues and Growth"),
 ],
 },
 {
 kod: "16.2",
 tajuk: "Meristematic Tissues and Growth",
 spList: [
 makeEnglishSp("16.2.1", "Identify the types and parts of tissue involved in growth.", "Meristematic Tissues and Growth", "Organisation of Plant Tissues and Growth"),
 makeEnglishSp("16.2.2", "Describe positions of zone of cell division, zone of cell elongation and zone of cell differentiation in shoots and roots. ", "Meristematic Tissues and Growth", "Organisation of Plant Tissues and Growth"),
 makeEnglishSp("16.2.3", "Identify zone of cell division, zone of cell elongation and zone of cell differentiation in a seed radicle.", "Meristematic Tissues and Growth", "Organisation of Plant Tissues and Growth"),
 makeEnglishSp("16.2.4", "Describe types of growth: (i) primary. (ii) secondary.", "Meristematic Tissues and Growth", "Organisation of Plant Tissues and Growth"),
 makeEnglishSp("16.2.5", "Justify the necessity of primary growth and secondary growth.", "Meristematic Tissues and Growth", "Organisation of Plant Tissues and Growth"),
 makeEnglishSp("16.2.6", "Compare and contrast primary growth and secondary growth in eudicotyledon plants.", "Meristematic Tissues and Growth", "Organisation of Plant Tissues and Growth"),
 makeEnglishSp("16.2.7", "Assess the economic importance of plants that have undergone secondary growth. ", "Meristematic Tissues and Growth", "Organisation of Plant Tissues and Growth"),
 ],
 },
 {
 kod: "16.3",
 tajuk: "Growth Curves",
 spList: [
 makeEnglishSp("16.3.1", "Describe types of plants based on their life cycles.", "Growth Curves", "Organisation of Plant Tissues and Growth"),
 makeEnglishSp("16.3.2", "Analyse growth curves of: (i) annual plants. (ii) biennial plants. (iii) perennial plants.", "Growth Curves", "Organisation of Plant Tissues and Growth"),
 makeEnglishSp("16.3.3", "Conduct an experiment to study the effects of factor on the growth curve of a plant. ", "Growth Curves", "Organisation of Plant Tissues and Growth", true),
 ],
 },
 ],
 },
 {
 id: "F5_B17",
 tingkatan: "Tingkatan 5",
 nomborBab: 17,
 tema: "Physiology of Flowering Plants",
 tajuk: "Leaf Structure and Function",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Leaf Structure and Function.",
 skList: [
 {
 kod: "17.1",
 tajuk: "Structure of a Leaf",
 spList: [
 makeEnglishSp("17.1.1", "Describe external structures of a leaf: (i) lamina. (ii) petiole.", "Structure of a Leaf", "Leaf Structure and Function"),
 makeEnglishSp("17.1.2", "Identify internal structures of a leaf lamina: (i) upper epidermis. (ii) palisade mesophyll. (iii) spongy mesophyll. (iv) lower epidermis. (v) vascular bundle.", "Structure of a Leaf", "Leaf Structure and Function"),
 ],
 },
 {
 kod: "17.2",
 tajuk: "Main Organ for Gaseous Exchange",
 spList: [
 makeEnglishSp("17.2.1", "Justify the necessity of gaseous exchange in plants. ", "Main Organ for Gaseous Exchange", "Leaf Structure and Function"),
 makeEnglishSp("17.2.2", "Explain the mechanism of stomatal opening and closing based on: (i) the uptake of potassium ions. (ii) changes in sucrose concentration.", "Main Organ for Gaseous Exchange", "Leaf Structure and Function"),
 makeEnglishSp("17.2.3", "Conduct an experiment to compare stomatal distribution on upper and lower epidermis of monocotyledon and eudicotyledon leaves.", "Main Organ for Gaseous Exchange", "Leaf Structure and Function", true),
 makeEnglishSp("17.2.4", "Predict with explanation the effect of water deficiency in plants on stomatal opening and closing.", "Main Organ for Gaseous Exchange", "Leaf Structure and Function"),
 ],
 },
 {
 kod: "17.3",
 tajuk: "Main Organ for Transpiration",
 spList: [
 makeEnglishSp("17.3.1", "plants. Justify the necessity of transpiration in", "Main Organ for Transpiration", "Leaf Structure and Function"),
 makeEnglishSp("17.3.2", "Describe environmental factors that affect rate of transpiration: (i) light intensity. (ii) temperature. (iii) air movement. (iv) relative air humidity. ", "Main Organ for Transpiration", "Leaf Structure and Function"),
 makeEnglishSp("17.3.3", "Conduct experiments to study the effects of environmental factors on rate of transpiration using a potometer.", "Main Organ for Transpiration", "Leaf Structure and Function"),
 ],
 },
 {
 kod: "17.4",
 tajuk: "Main Organ for Photosynthesis",
 spList: [
 makeEnglishSp("17.4.1", "Justify the necessity of photosynthesis in plants.", "Main Organ for Photosynthesis", "Leaf Structure and Function"),
 makeEnglishSp("17.4.2", "Relate the adaptations of internal structure of a leaf to photosynthesis.", "Main Organ for Photosynthesis", "Leaf Structure and Function"),
 makeEnglishSp("17.4.3", "Identify structures of a chloroplast: (i) granum. (ii) thylakoid. (iii) stroma.", "Main Organ for Photosynthesis", "Leaf Structure and Function"),
 makeEnglishSp("17.4.4", "Relate light-dependent and light- independent reactions in photosynthesis. ", "Main Organ for Photosynthesis", "Leaf Structure and Function"),
 makeEnglishSp("17.4.5", "Write a chemical equation to represent the process of photosynthesis.", "Main Organ for Photosynthesis", "Leaf Structure and Function"),
 makeEnglishSp("17.4.6", "Compare and contrast light- dependent and light-independent reactions in photosynthesis.", "Main Organ for Photosynthesis", "Leaf Structure and Function"),
 makeEnglishSp("17.4.7", "Explain environmental factors that affect the rate of photosynthesis: (i) light intensity. (ii) temperature. (iii) concentration of carbon dioxide.", "Main Organ for Photosynthesis", "Leaf Structure and Function"),
 makeEnglishSp("17.4.8", "Conduct experiments to study effects of environmental factors on the rate of photosynthesis.", "Main Organ for Photosynthesis", "Leaf Structure and Function"),
 makeEnglishSp("17.4.9", "Analyse the effects of different light intensities and colours of light on the rates of photosynthesis.", "Main Organ for Photosynthesis", "Leaf Structure and Function"),
 ],
 },
 {
 kod: "17.5",
 tajuk: "Compensation Point",
 spList: [
 makeEnglishSp("17.5.1", "Describe compensation point. ", "Compensation Point", "Leaf Structure and Function"),
 makeEnglishSp("17.5.2", "Compare and contrast photosynthesis and cellular respiration in plants.", "Compensation Point", "Leaf Structure and Function"),
 makeEnglishSp("17.5.3", "Analyse light intensity and attainment of compensation point using a graph.", "Compensation Point", "Leaf Structure and Function"),
 makeEnglishSp("17.5.4", "Predict the effect on plant growth if the rate of photosynthesis and the rate of cellular respiration remain at its compensation point. ", "Compensation Point", "Leaf Structure and Function"),
 ],
 },
 ],
 },
 {
 id: "F5_B18",
 tingkatan: "Tingkatan 5",
 nomborBab: 18,
 tema: "Physiology of Flowering Plants",
 tajuk: "Nutrition in Plants",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Nutrition in Plants.",
 skList: [
 {
 kod: "18.1",
 tajuk: "Main Inorganic Nutrients",
 spList: [
 makeEnglishSp("18.1.1", "Identify macronutrients and micronutrients required by plants.", "Main Inorganic Nutrients", "Nutrition in Plants"),
 makeEnglishSp("18.1.2", "Justify the necessity of macronutrients and micronutrients in plants.", "Main Inorganic Nutrients", "Nutrition in Plants"),
 ],
 },
 {
 kod: "18.2",
 tajuk: "Uptake of Water and Mineral Salts",
 spList: [
 makeEnglishSp("18.2.1", "Describe the root structure for water and mineral salts uptake.", "Uptake of Water and Mineral Salts", "Nutrition in Plants"),
 makeEnglishSp("18.2.2", "Justify root adaptations for water and mineral salts uptake. ", "Uptake of Water and Mineral Salts", "Nutrition in Plants"),
 ],
 },
 {
 kod: "18.3",
 tajuk: "Diversity in Plant Nutrition",
 spList: [
 makeEnglishSp("18.3.1", "Describe nutritional adaptations of plants. ", "Diversity in Plant Nutrition", "Nutrition in Plants"),
 ],
 },
 ],
 },
 {
 id: "F5_B19",
 tingkatan: "Tingkatan 5",
 nomborBab: 19,
 tema: "Physiology of Flowering Plants",
 tajuk: "Transport in Plants",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Transport in Plants.",
 skList: [
 {
 kod: "19.1",
 tajuk: "Vascular Tissues",
 spList: [
 makeEnglishSp("19.1.1", "Justify the necessity of transport in plants.", "Vascular Tissues", "Transport in Plants"),
 makeEnglishSp("19.1.2", "Relate structural adaptations of xylem vessels and tracheids to transport water and mineral salts.", "Vascular Tissues", "Transport in Plants"),
 makeEnglishSp("19.1.3", "Relate the structural adaptations of sieve tubes and companion cells to the transportation of organic substances.", "Vascular Tissues", "Transport in Plants"),
 ],
 },
 {
 kod: "19.2",
 tajuk: "Transport of Water and Mineral Salts",
 spList: [
 makeEnglishSp("19.2.1", "Describe factors involved in the pathway of water and mineral salts from soil to shoots: (i) root pressure. (ii) capillary action. (iii) transpirational pull. ", "Transport of Water and Mineral Salts", "Transport in Plants"),
 makeEnglishSp("19.2.2", "Explain guttation in plants.", "Transport of Water and Mineral Salts", "Transport in Plants"),
 makeEnglishSp("19.2.3", "Compare and contrast guttation and transpiration in plants.", "Transport of Water and Mineral Salts", "Transport in Plants"),
 makeEnglishSp("19.2.4", "Predict the condition of plants that do not undergo transpiration and guttation.", "Transport of Water and Mineral Salts", "Transport in Plants"),
 ],
 },
 {
 kod: "19.3",
 tajuk: "Translocation",
 spList: [
 makeEnglishSp("19.3.1", "Define translocation.", "Translocation", "Transport in Plants"),
 makeEnglishSp("19.3.2", "Justify the necessity of translocation in plants.", "Translocation", "Transport in Plants"),
 makeEnglishSp("19.3.3", "Describe pathways of translocation in plants. ", "Translocation", "Transport in Plants"),
 ],
 },
 {
 kod: "19.4",
 tajuk: "Phytoremediation ",
 spList: [
 makeEnglishSp("19.4.1", "Define phytoremediation.", "Phytoremediation ", "Transport in Plants"),
 makeEnglishSp("19.4.2", "Explain the uses of phytoremediation in life.", "Phytoremediation ", "Transport in Plants"),
 makeEnglishSp("19.4.3", "Conduct experiments to study the effectiveness of phytoremediation plants in controlling: (i) water pollution. (ii) soil pollution. TRANSPORT IN PLANTS", "Phytoremediation ", "Transport in Plants"),
 ],
 },
 ],
 },
 {
 id: "F5_B20",
 tingkatan: "Tingkatan 5",
 nomborBab: 20,
 tema: "Physiology of Flowering Plants",
 tajuk: "Response in Plants",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Response in Plants.",
 skList: [
 {
 kod: "20.1",
 tajuk: "Types of Responses",
 spList: [
 makeEnglishSp("20.1.1", "Describe types of plant responses: (i) tropism. (ii) nastic.", "Types of Responses", "Response in Plants"),
 ],
 },
 {
 kod: "20.2",
 tajuk: "Phytohormones",
 spList: [
 makeEnglishSp("20.2.1", "Describe phytohormone.", "Phytohormones", "Response in Plants"),
 makeEnglishSp("20.2.2", "State the functions of phytohormones: (i) auxins. (ii) gibberellins. (iii) cytokinins. (iv) abscisic acid. (v) ethylene.", "Phytohormones", "Response in Plants"),
 makeEnglishSp("20.2.3", "Make inferences on effects of auxins on growth response.", "Phytohormones", "Response in Plants"),
 makeEnglishSp("20.2.4", "Explain the roles of auxins in plant responses. (i) phototropism. (ii) geotropism. ", "Phytohormones", "Response in Plants"),
 ],
 },
 {
 kod: "20.3",
 tajuk: "Application of Phytohormones in Agriculture",
 spList: [
 makeEnglishSp("20.3.1", "Justify uses of phytohormones in agriculture.", "Application of Phytohormones in Agriculture", "Response in Plants"),
 makeEnglishSp("20.3.2", "Conduct an experiment to compare the effects of presence of a phytohormone on fruit ripening. RESPONSE IN PLANTS", "Application of Phytohormones in Agriculture", "Response in Plants", true),
 ],
 },
 ],
 },
 {
 id: "F5_B21",
 tingkatan: "Tingkatan 5",
 nomborBab: 21,
 tema: "Physiology of Flowering Plants",
 tajuk: "Sexual Reproduction in Flowering Plants",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Sexual Reproduction in Flowering Plants.",
 skList: [
 {
 kod: "21.1",
 tajuk: "Structure of a Flower",
 spList: [
 makeEnglishSp("21.1.1", "Identify structures of a flower.", "Structure of a Flower", "Sexual Reproduction in Flowering Plants"),
 makeEnglishSp("21.1.2", "Compare and contrast male and female structures in a flower.", "Structure of a Flower", "Sexual Reproduction in Flowering Plants"),
 ],
 },
 {
 kod: "21.2",
 tajuk: "Development of Pollen Grains and Embryo Sac",
 spList: [
 makeEnglishSp("21.2.1", "Describe the formation of pollen grains in an anther.", "Development of Pollen Grains and Embryo Sac", "Sexual Reproduction in Flowering Plants"),
 makeEnglishSp("21.2.2", "Describe the formation of embryo sac in an ovule.", "Development of Pollen Grains and Embryo Sac", "Sexual Reproduction in Flowering Plants"),
 ],
 },
 {
 kod: "21.3",
 tajuk: "Pollination and Fertilization",
 spList: [
 makeEnglishSp("21.3.1", "Describe pollination.", "Pollination and Fertilization", "Sexual Reproduction in Flowering Plants"),
 makeEnglishSp("21.3.2", "Describe the formation of pollen tube and the formation of male gametes. ", "Pollination and Fertilization", "Sexual Reproduction in Flowering Plants"),
 makeEnglishSp("21.3.3", "Explain double fertilization in the formation of diploid zygote and triploid nucleus.", "Pollination and Fertilization", "Sexual Reproduction in Flowering Plants"),
 makeEnglishSp("21.3.4", "Justify the importance of double fertilization for the survival of flowering plants.", "Pollination and Fertilization", "Sexual Reproduction in Flowering Plants"),
 ],
 },
 {
 kod: "21.4",
 tajuk: "Development of Seeds and Fruits",
 spList: [
 makeEnglishSp("21.4.1", "Describe double fertilization and development of seeds and fruits.", "Development of Seeds and Fruits", "Sexual Reproduction in Flowering Plants"),
 makeEnglishSp("21.4.2", "Relate the structure of seeds to ovules. ", "Development of Seeds and Fruits", "Sexual Reproduction in Flowering Plants"),
 makeEnglishSp("21.4.3", "Relate the structure of fruit to ovary. Carry out a multimedia presentation on the development of fruits from flowers. Collect specimens to study types of fruits: (i) simple. (ii) aggregates. (iii) multiple. (iv) accessories.", "Development of Seeds and Fruits", "Sexual Reproduction in Flowering Plants"),
 ],
 },
 {
 kod: "21.5",
 tajuk: "Importance of Seeds for Survival",
 spList: [
 makeEnglishSp("21.5.1", "Justify the importance of seeds for plant survival. SEXUAL REPRODUCTION IN FLOWERING PLANTS", "Importance of Seeds for Survival", "Sexual Reproduction in Flowering Plants"),
 ],
 },
 ],
 },
 {
 id: "F5_B22",
 tingkatan: "Tingkatan 5",
 nomborBab: 22,
 tema: "Physiology of Flowering Plants",
 tajuk: "Adaptations of Plants in Different Habitats",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Adaptations of Plants in Different Habitats.",
 skList: [
 {
 kod: "22.1",
 tajuk: "Adaptations of Plants in Different Habitats",
 spList: [
 makeEnglishSp("22.1.1", "Classify plants based on habitats.", "Adaptations of Plants in Different Habitats", "Adaptations of Plants in Different Habitats"),
 makeEnglishSp("22.1.2", "Describe the adaptive features of mesophytes, hydrophytes, halophytes and xerophytes in terms of: (i) uptake of water and mineral salts. (ii) gaseous exchange. (iii) support. (iv) photosynthesis. ", "Adaptations of Plants in Different Habitats", "Adaptations of Plants in Different Habitats"),
 ],
 },
 ],
 },
 {
 id: "F5_B23",
 tingkatan: "Tingkatan 5",
 nomborBab: 23,
 tema: "Ecosystem and Environmental Sustainability",
 tajuk: "Biodiversity",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Biodiversity.",
 skList: [
 {
 kod: "23.1",
 tajuk: "System of Classification and Naming of Organisms",
 spList: [
 makeEnglishSp("23.1.1", "Explain the necessity of classification system and naming of organisms C l", "System of Classification and Naming of Organisms", "Biodiversity"),
 makeEnglishSp("23.1.2", "Describe the hierarchical a s classification of organisms into six kingdoms: s i f i c a t (i) Archaebacteria. (ii) Eubacteria. (iii) Protista. (iv) Fungi. (v) Plantae. (vi) Animalia. i", "System of Classification and Naming of Organisms", "Biodiversity"),
 makeEnglishSp("23.1.3", "o Describe the main features of n organisms in each kingdom. a n d N a m i ", "System of Classification and Naming of Organisms", "Biodiversity"),
 makeEnglishSp("23.1.4", "r g Describe the naming of organisms according to the Binomial Nomenclature System.", "System of Classification and Naming of Organisms", "Biodiversity"),
 makeEnglishSp("23.1.5", "Construct dichotomous keys to classify organisms.", "System of Classification and Naming of Organisms", "Biodiversity"),
 ],
 },
 {
 kod: "23.2",
 tajuk: "Biodiversity",
 spList: [
 makeEnglishSp("23.2.1", "Synthesise the concept of biodiversity based on diversities of: (i) ecosystem. (ii) species. (iii) genetic.", "Biodiversity", "Biodiversity"),
 makeEnglishSp("23.2.2", "Describe the meaning of phylogenic tree.", "Biodiversity", "Biodiversity"),
 makeEnglishSp("23.2.3", "Justify the importance of biodiversity on the environment and humans. ", "Biodiversity", "Biodiversity"),
 ],
 },
 {
 kod: "23.3",
 tajuk: "Microorganisms and Viruses",
 spList: [
 makeEnglishSp("23.3.1", "Identify the main characteristics of microorganisms and viruses: (i) bacteria. (ii) protozoa. (iii) algae. (iv) fungi. (v) viruses.", "Microorganisms and Viruses", "Biodiversity"),
 makeEnglishSp("23.3.2", "Describe the roles of microorganisms in nitrogen cycle.", "Microorganisms and Viruses", "Biodiversity"),
 makeEnglishSp("23.3.3", "Explain the roles of microorganisms as: (i) producers. (ii) decomposers. (iii) symbions. (iv) parasites.", "Microorganisms and Viruses", "Biodiversity"),
 makeEnglishSp("23.3.4", "Define the terms: (i) pathogens. (ii) vectors. ", "Microorganisms and Viruses", "Biodiversity"),
 makeEnglishSp("23.3.5", "Explain the effects of pathogens on human health. KSSM BIOLOGY FORM", "Microorganisms and Viruses", "Biodiversity"),
 ],
 },
 ],
 },
 {
 id: "F5_B24",
 tingkatan: "Tingkatan 5",
 nomborBab: 24,
 tema: "Ecosystem and Environmental Sustainability",
 tajuk: "Ecosystem",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Ecosystem.",
 skList: [
 {
 kod: "24.1",
 tajuk: "Community and Ecosystem",
 spList: [
 makeEnglishSp("24.1.1", "Define the terms: (i) species. (ii) population. (iii) community. (iv) habitat. (v) niche. (vi) ecosystem.", "Community and Ecosystem", "Ecosystem"),
 makeEnglishSp("24.1.2", "Identify biotic and abiotic components in an ecosystem.", "Community and Ecosystem", "Ecosystem"),
 makeEnglishSp("24.1.3", "Explain autotrophic and heterotrophic nutritions. ", "Community and Ecosystem", "Ecosystem"),
 makeEnglishSp("24.1.4", "Communicate about biotic components according to trophic levels.", "Community and Ecosystem", "Ecosystem"),
 makeEnglishSp("24.1.5", "Describe energy flow in a food chain.", "Community and Ecosystem", "Ecosystem"),
 makeEnglishSp("24.1.6", "Describe ecological pyramids: (i) pyramid of numbers. (ii) pyramid of biomass. (iii) pyramid of energy.", "Community and Ecosystem", "Ecosystem"),
 makeEnglishSp("24.1.7", "Analyse types of interactions between biotic components: (i) parasitism. (ii) commensalism. (iii) mutualism. (iv) saprophytism. (v) competition. (vi) predation. ", "Community and Ecosystem", "Ecosystem"),
 makeEnglishSp("24.1.9", "Explain a mangrove ecosystem in terms of: (i) biotic components. (ii) abiotic components. (iii) adaptations of mangrove trees. (iv) colonisation and succession. (v) its importance.", "Community and Ecosystem", "Ecosystem"),
 ],
 },
 {
 kod: "24.2",
 tajuk: "Population Ecology",
 spList: [
 makeEnglishSp("24.2.1", "Describe factors affecting population distribution.", "Population Ecology", "Ecosystem"),
 makeEnglishSp("24.2.2", "Analyse data to estimate population size of organisms using: (i) quadrat sampling technique. (ii) capture-mark-release-recapture technique. ", "Population Ecology", "Ecosystem"),
 ],
 },
 ],
 },
 {
 id: "F5_B25",
 tingkatan: "Tingkatan 5",
 nomborBab: 25,
 tema: "Ecosystem and Environmental Sustainability",
 tajuk: "Environmental Sustainability",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Environmental Sustainability.",
 skList: [
 {
 kod: "25.1",
 tajuk: "Threats to the Environment",
 spList: [
 makeEnglishSp("25.1.1", "Describe the meaning of environmental sustainability.", "Threats to the Environment", "Environmental Sustainability"),
 makeEnglishSp("25.1.2", "Analyse threats to environment: (i) climate change. (ii) deforestation. (iii) pollutions. (iv) loss of biodiversity. (v) human population explosion. (vi) global warming. (vii) eutrophication. ", "Threats to the Environment", "Environmental Sustainability"),
 makeEnglishSp("25.1.3", "Conduct an experiment to compare the levels of Biochemical Oxygen Demand (BOD) in different water samples.", "Threats to the Environment", "Environmental Sustainability", true),
 ],
 },
 {
 kod: "25.2",
 tajuk: "Preservation, Conservation and Restoration of Ecosystems",
 spList: [
 makeEnglishSp("25.2.1", "Define the terms: (i) preservation of ecosystem. (ii) conservation of ecosystem. (iii) restoration of ecosystem.", "Preservation, Conservation and Restoration of Ecosystems", "Environmental Sustainability"),
 makeEnglishSp("25.2.2", "Justify the necessity of: (i) preservation of ecosystem. (ii) conservation of ecosystem. (iii) restoration of ecosystem. ", "Preservation, Conservation and Restoration of Ecosystems", "Environmental Sustainability"),
 ],
 },
 {
 kod: "25.3",
 tajuk: "Environmental Sustainability Practices",
 spList: [
 makeEnglishSp("25.3.1", " Generate ideas related to practices that contribute to environmental Sustainability.", "Environmental Sustainability Practices", "Environmental Sustainability"),
 makeEnglishSp("25.3.2", "Discuss the status of food security in Malaysia. ", "Environmental Sustainability Practices", "Environmental Sustainability"),
 ],
 },
 {
 kod: "25.4",
 tajuk: "Green Technology",
 spList: [
 makeEnglishSp("25.4.1", "Define green technology.", "Green Technology", "Environmental Sustainability"),
 makeEnglishSp("25.4.2", "Justify the use of green technology in environmental sustainability. ", "Green Technology", "Environmental Sustainability"),
 makeEnglishSp("25.4.3", "Communicate about applications of social science to solve environmental problems and challenges. KSSM BIOLOGY FORM", "Green Technology", "Environmental Sustainability"),
 ],
 },
 ],
 },
 {
 id: "F5_B26",
 tingkatan: "Tingkatan 5",
 nomborBab: 26,
 tema: "Inheritance and Genetic Technology",
 tajuk: "Inheritance",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Inheritance.",
 skList: [
 {
 kod: "26.1",
 tajuk: "Monohybrid Inheritance",
 spList: [
 makeEnglishSp("26.1.1", "Describe the meaning of a monohybrid cross.", "Monohybrid Inheritance", "Inheritance"),
 makeEnglishSp("26.1.2", "Explain a monohybrid cross based on Mendel\u2019s experiments.", "Monohybrid Inheritance", "Inheritance"),
 makeEnglishSp("26.1.3", "Differentiate terms related to inheritance: (i) genes and alleles. (ii) characteristics and traits. (iii) phenotypes and genotypes. (iv) dominant alleles and recessive alleles. (v) dominant traits and recessive traits. (vi) homozygotes and heterozygotes. (vii) pure breeds and hybrids. (viii) parental generation and filial generations. ", "Monohybrid Inheritance", "Inheritance"),
 makeEnglishSp("26.1.4", "Construct monohybrid cross diagrams.", "Monohybrid Inheritance", "Inheritance"),
 makeEnglishSp("26.1.5", "Determine genotypic and phenotypic ratios of filial generations in a monohybrid cross.", "Monohybrid Inheritance", "Inheritance"),
 makeEnglishSp("26.1.6", "Describe Mendel\u2019s First Law .", "Monohybrid Inheritance", "Inheritance"),
 ],
 },
 {
 kod: "26.2",
 tajuk: "Dihybrid Inheritance",
 spList: [
 makeEnglishSp("26.2.1", "cross. Describe the meaning of a dihybrid", "Dihybrid Inheritance", "Inheritance"),
 makeEnglishSp("26.2.2", "Explain a dihybrid cross based on Mendel's experiments.", "Dihybrid Inheritance", "Inheritance"),
 makeEnglishSp("26.2.3", "Construct a dihybrid cross diagram.", "Dihybrid Inheritance", "Inheritance"),
 makeEnglishSp("26.2.4", "Determine genotypic and phenotypic ratios of filial generations in a dihybrid cross. ", "Dihybrid Inheritance", "Inheritance"),
 makeEnglishSp("26.2.5", "Describe Mendel\u2019s Second Law.", "Dihybrid Inheritance", "Inheritance"),
 ],
 },
 {
 kod: "26.3",
 tajuk: "Genes and Alleles",
 spList: [
 makeEnglishSp("26.3.1", "Describe the meaning of locus.", "Genes and Alleles", "Inheritance"),
 makeEnglishSp("26.3.2", "Relate alleles and loci to genes in a chromosome.", "Genes and Alleles", "Inheritance"),
 ],
 },
 {
 kod: "26.4",
 tajuk: "Inheritance in Humans",
 spList: [
 makeEnglishSp("26.4.1", "Identify types of human chromosomes: (i) autosomes. (ii) sex chromosomes.", "Inheritance in Humans", "Inheritance"),
 makeEnglishSp("26.4.2", "Analyse and describe human karyotypes.", "Inheritance in Humans", "Inheritance"),
 makeEnglishSp("26.4.3", "Match paternal and maternal chromosomes of humans in a drawing/ micrograph to build a complete karyotype of an individual.", "Inheritance in Humans", "Inheritance"),
 makeEnglishSp("26.4.4", "Relate Mendel's Laws to human inheritance.", "Inheritance in Humans", "Inheritance"),
 makeEnglishSp("26.4.5", "Analyse human inheritance by constructing inheritance cross diagrams.", "Inheritance in Humans", "Inheritance"),
 makeEnglishSp("26.4.6", "Analyse human inheritance by studying family pedigrees. ", "Inheritance in Humans", "Inheritance"),
 ],
 },
 ],
 },
 {
 id: "F5_B27",
 tingkatan: "Tingkatan 5",
 nomborBab: 27,
 tema: "Inheritance and Genetic Technology",
 tajuk: "Variation",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Variation.",
 skList: [
 {
 kod: "27.1",
 tajuk: "Types and Factors of Variation",
 spList: [
 makeEnglishSp("27.1.1", "Describe the meaning of variation.", "Types and Factors of Variation", "Variation"),
 makeEnglishSp("27.1.2", "Justify the necessity of variation for the survival of species.", "Types and Factors of Variation", "Variation"),
 makeEnglishSp("27.1.3", "Describe the types of variation: (i) continuous variation. (ii) discontinuos variation.", "Types and Factors of Variation", "Variation"),
 makeEnglishSp("27.1.4", "Compare and contrast continuous and discontinuous variations.", "Types and Factors of Variation", "Variation"),
 makeEnglishSp("27.1.5", "Relate causes of variation to types of variation: (i) genetic factors. - crossing over - independent assortment of chromosomes - random fertilization - mutation ", "Types and Factors of Variation", "Variation"),
 makeEnglishSp("27.1.6", "Describe variation caused by interactions between genetic and environmental factors.", "Types and Factors of Variation", "Variation"),
 ],
 },
 {
 kod: "27.2",
 tajuk: "Variations in Humans",
 spList: [
 makeEnglishSp("27.2.1", "Relate variation to human inheritance.", "Variations in Humans", "Variation"),
 makeEnglishSp("27.2.2", "Conduct an experiment to study continuous and discontinuous variation in humans.", "Variations in Humans", "Variation", true),
 ],
 },
 {
 kod: "27.3",
 tajuk: "Mutation",
 spList: [
 makeEnglishSp("27.3.1", "Describe the terms: (i) mutagen. (ii) mutation. (iii) mutant. ", "Mutation", "Variation"),
 makeEnglishSp("27.3.2", " Describe the types of mutagen: (i) physical agents. (ii) chemical agents. (iii) biological agents.", "Mutation", "Variation"),
 makeEnglishSp("27.3.3", "Describe with examples types of mutations: (i) gene mutation. (ii) chromosomal mutation.", "Mutation", "Variation"),
 makeEnglishSp("27.3.4", "Relate mutations of somatic cells and gametes to variation. ", "Mutation", "Variation"),
 ],
 },
 ],
 },
 {
 id: "F5_B28",
 tingkatan: "Tingkatan 5",
 nomborBab: 28,
 tema: "Inheritance and Genetic Technology",
 tajuk: "Genetic Technology",
 peneranganRingkas: "Official KSSM Biology DSKP (DLP) Content and Learning Standards for Genetic Technology.",
 skList: [
 {
 kod: "28.1",
 tajuk: "Genetic Engineering",
 spList: [
 makeEnglishSp("28.1.1", "Describe the terms: (i) genetic engineering. (ii) genetically modified organisms (GMOs).", "Genetic Engineering", "Genetic Technology"),
 makeEnglishSp("28.1.2", "Explain the application of genetic engineering in the production of: (i) genetically modified organisms (GMOs). (ii) genetically modified foods (GMF). (iii) insulin.", "Genetic Engineering", "Genetic Technology"),
 ],
 },
 {
 kod: "28.2",
 tajuk: "Biotechnology",
 spList: [
 makeEnglishSp("28.2.1", "Explain the meaning of biotechnology.", "Biotechnology", "Genetic Technology"),
 makeEnglishSp("28.2.2", "Describe applications of biotechnology in life.", "Biotechnology", "Genetic Technology"),
 makeEnglishSp("28.2.3", "Justify the importance of biotechnology in life. KSSM BIOLOGY FORM", "Biotechnology", "Genetic Technology"),
 ],
 },
 ],
 },
];