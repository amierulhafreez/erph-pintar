import { BabKimia, StandardKandungan, StandardPembelajaran, Tingkatan } from '../../types/rph';

function binaSpSainsDLP(
  kod: string,
  tajuk: string,
  opts?: {
    eksperimenWajib?: boolean;
    namaEksperimen?: string;
    radasBahan?: string[];
  }
): StandardPembelajaran {
  const isExp = !!opts?.eksperimenWajib;
  const cleanTitle = tajuk.replace(/\.$/, '');
  const lowerStart = cleanTitle.charAt(0).toLowerCase() + cleanTitle.slice(1);

  const objList = [
    `By the end of the lesson, pupils are able to ${lowerStart} accurately in accordance with the KSSM Science DSKP.`,
    isExp && opts?.namaEksperimen
      ? `Carry out the compulsory experiment (${opts.namaEksperimen}) safely and record scientific observations/data systematically.`
      : `Relate the scientific concept (${kod}) to real-world phenomena and solve at least 2 structured reinforcement questions.`,
  ];

  const kriteriaList = [
    `Pupils successfully state and explain the key scientific concepts for LS ${kod} (${cleanTitle}) accurately.`,
    isExp
      ? `Pupils accurately identify the variables (manipulated, responding, constant), construct a data table, and formulate a valid conclusion.`
      : `Pupils actively complete the collaborative group task / i-Think map and answer the formative quiz questions correctly.`,
  ];

  const setInduksi = `Teacher displays a real-world stimulus / visual phenomenon related to "${cleanTitle}" and elicits pupils' prior knowledge through probing questions.`;

  const aktivitiUtama = isExp
    ? [
        `1. Teacher briefs pupils on the aim of investigation, hypothesis, variables, and laboratory safety precautions for ${opts?.namaEksperimen || 'the experiment'}.`,
        `2. Pupils carry out the experiment in groups following the KSSM Science textbook procedure, controlling variables and recording observations/readings in a table.`,
        `3. Group representatives present their experimental findings, interpret data/graphs, and formulate a scientific conclusion with the teacher.`,
      ]
    : [
        `1. Teacher explains the core concepts of LS ${kod} (${cleanTitle}) using interactive slides and real-life examples.`,
        `2. 21st Century Learning Activity (Think-Pair-Share / Gallery Walk): Pupils collaborate in groups to construct a concept map / complete a structured worksheet.`,
        `3. Group presentation of findings and HOTS Q&A session facilitated by the teacher to consolidate mastery.`,
      ];

  const penutup = `Pupils summarise the key takeaways of the lesson and complete a quick Exit Ticket to verify mastery of LS ${kod}.`;

  return {
    kod,
    tajuk,
    objektifCadangan: objList,
    kriteriaKejayaanCadangan: kriteriaList,
    cadanganAktiviti: {
      setInduksi,
      aktivitiUtama,
      penutup,
      aktiviti5E: {
        engage: setInduksi,
        explore: isExp
          ? `Pupils conduct the scientific investigation / compulsory experiment (${opts?.namaEksperimen || kod}) in small groups and collect empirical data.`
          : `Pupils explore the concept of "${cleanTitle}" through group inquiry, stimulus analysis, and peer discussion.`,
        explain: `Group representatives present their findings for LS ${kod} while the teacher reinforces accurate scientific terminology.`,
        elaborate: `Pupils apply the learned concepts to new contexts and real-life HOTS problem-solving scenarios.`,
        evaluate: penutup,
      },
    },
    bbmCadangan: isExp
      ? [
          'KSSM Science Textbook (DLP)',
          'Science Practical / Laboratory Manual',
          'Laboratory Apparatus & Materials',
          'Structured Practical Report Sheet',
        ]
      : [
          'KSSM Science Textbook (DLP)',
          'Presentation Slides / Science Video Clips',
          'Structured Worksheet / Revision Module',
          'Mini Whiteboards / Mahjong Paper',
        ],
    kemahiranSaintifikCadangan: isExp
      ? [
          'Observing',
          'Measuring and Using Numbers',
          'Controlling Variables',
          'Hypothesising',
          'Experimenting',
        ]
      : ['Observing', 'Classifying', 'Inferring', 'Communicating'],
    eksperimenWajib: opts?.eksperimenWajib,
    namaEksperimen: opts?.namaEksperimen,
    radasBahan: opts?.radasBahan,
  };
}

function binaSkDlp(
  kod: string,
  tajuk: string,
  spItems: Array<
    | [string, string]
    | [
        string,
        string,
        {
          eksperimenWajib?: boolean;
          namaEksperimen?: string;
          radasBahan?: string[];
        },
      ]
  >
): StandardKandungan {
  return {
    kod,
    tajuk,
    spList: spItems.map((item) => binaSpSainsDLP(item[0], item[1], item[2])),
  };
}

function binaBabDlp(
  id: string,
  tingkatan: Tingkatan,
  nomborBab: number,
  tema: string,
  tajuk: string,
  peneranganRingkas: string,
  skList: StandardKandungan[]
): BabKimia {
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

// ============================================================================
// KSSM SCIENCE FORM 2 (DLP ENGLISH) - CHAPTER 1 TO CHAPTER 13
// ============================================================================
export const DSKP_SAINS_F2_DLP: BabKimia[] = [
  binaBabDlp(
    'S_F2_B1',
    'Tingkatan 2',
    1,
    'Maintenance and Continuity of Life',
    'Biodiversity',
    'Diversity of organisms, importance of biodiversity and classification of animals and plants.',
    [
      binaSkDlp('1.1', 'Diversity of Organisms', [
        ['1.1.1', 'Elaborate and communicate about biodiversity.'],
        ['1.1.2', 'Justify the needs to manage biodiversity effectively.'],
      ]),
      binaSkDlp('1.2', 'Classification of Organisms', [
        [
          '1.2.1',
          'Differentiate organisms using a dichotomous key based on common characteristics.',
        ],
        [
          '1.2.2',
          'Characterise the major taxonomy groups (Vertebrates/Invertebrates, Monocotyledons/Dicotyledons).',
        ],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F2_B2',
    'Tingkatan 2',
    2,
    'Maintenance and Continuity of Life',
    'Ecosystem',
    'Energy flow in ecosystem, nutrient cycle, interdependence and interaction among organisms.',
    [
      binaSkDlp('2.1', 'Energy Flow in Ecosystem', [
        ['2.1.1', 'Explain with examples of producer, consumer and decomposer.'],
        ['2.1.2', 'Interpret food chain and food web.'],
      ]),
      binaSkDlp('2.2', 'Nutrient Cycle in the Ecosystem', [
        [
          '2.2.1',
          'Elaborate and communicate about the role of living things in the oxygen and carbon cycles in the ecosystem.',
        ],
        ['2.2.2', 'Justify the role of organisms in the water cycle of an ecosystem.'],
        [
          '2.2.3',
          'Solve problems when there are interferences to the cycles caused by human activities.',
        ],
      ]),
      binaSkDlp(
        '2.3',
        'Interdependence and Interaction among Organisms and between Organisms and the Environment',
        [
          [
            '2.3.1',
            'Explain with examples the interdependence among living things and the environment to maintain a balanced ecosystem.',
          ],
          [
            '2.3.2',
            'Justify the importance of adaptations of living things to the environment.',
          ],
          [
            '2.3.3',
            'Communicate examples of interactions between organisms and apply these interactions in daily life (Symbiosis, Prey-predator, Competition).',
          ],
          [
            '2.3.4',
            'Separate the factors that affect the size of population in an ecosystem.',
          ],
          [
            '2.3.5',
            'Predict how the changes in ecosystem affect the existing resources and balance of the population.',
            {
              eksperimenWajib: true,
              namaEksperimen:
                'Experiment 2.3.5: Determine the factors affecting the distribution or population size of organisms in an ecosystem.',
            },
          ],
        ]
      ),
      binaSkDlp('2.4', 'The Role of Human in Maintaining a Balanced Nature', [
        [
          '2.4.1',
          'Justify and communicate that man needs a stable and productive ecosystem to sustain life.',
        ],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F2_B3',
    'Tingkatan 2',
    3,
    'Maintenance and Continuity of Life',
    'Nutrition',
    'Classes of food, balanced diet, human digestive system, absorption and defecation.',
    [
      binaSkDlp('3.1', 'Classes of Food', [
        ['3.1.1', 'Elaborate and communicate about classes of food.'],
        [
          '3.1.2',
          'Test the presence of starch, glucose, protein and fats in food.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 3.1.2: Test the presence of starch (Iodine test), glucose (Benedict test), protein (Millon test) and fats (Alcohol-emulsion test) in food samples.',
          },
        ],
      ]),
      binaSkDlp('3.2', 'Importance of a Balanced Diet', [
        ['3.2.1', 'Elaborate and communicate about a balanced diet.'],
        [
          '3.2.2',
          'Estimate calories of food intake in a meal and plan a balanced diet.',
        ],
        [
          '3.2.3',
          'Conduct a research and justify the importance of a balanced diet, exercise and a healthy lifestyle in order to maintain a healthy body.',
        ],
      ]),
      binaSkDlp('3.3', 'Human Digestive System', [
        ['3.3.1', 'Elaborate and communicate about digestion.'],
      ]),
      binaSkDlp(
        '3.4',
        'Process of Absorption and Transportation of Digested Food and Defecation',
        [
          [
            '3.4.1',
            'Conduct an experiment to explain the absorption of the end products of digestion.',
            {
              eksperimenWajib: true,
              namaEksperimen:
                'Experiment 3.4.1: Explain the absorption of the end products of digestion using a Visking tube.',
            },
          ],
          [
            '3.4.2',
            'Relate the function of digestive system, blood circulatory system and respiratory system.',
          ],
          ['3.4.3', 'Elaborate and communicate about defecation.'],
        ]
      ),
    ]
  ),
  binaBabDlp(
    'S_F2_B4',
    'Tingkatan 2',
    4,
    'Maintenance and Continuity of Life',
    'Human Health',
    'Infectious and non-infectious diseases and body defence system.',
    [
      binaSkDlp('4.1', 'Infectious and Non-infectious Diseases', [
        [
          '4.1.1',
          'Differentiate and communicate about infectious and non-infectious diseases.',
        ],
        ['4.1.2', 'Explain how infectious diseases are spread.'],
        [
          '4.1.3',
          'Separate the cause and spread of infectious diseases.',
        ],
        [
          '4.1.4',
          'Generate ideas on the mechanism to prevent the spread of infectious diseases.',
        ],
      ]),
      binaSkDlp('4.2', 'Body Defence', [
        [
          '4.2.1',
          'Elaborate and communicate about the function of body defence system.',
        ],
        ['4.2.2', 'Define antigens, antibodies and immunity.'],
        ['4.2.3', 'Justify the importance of immunisation.'],
        ['4.2.4', 'Differentiate passive immunity and active immunity.'],
        ['4.2.5', 'Justify good practices towards attaining strong immunity.'],
        [
          '4.2.6',
          'Justify and communicate about the importance of immunisation and health level of individuals to the family, social, economy and nation.',
        ],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F2_B5',
    'Tingkatan 2',
    5,
    'Exploration of Elements in Nature',
    'Water and Solution',
    'Physical characteristics of water, solution and rate of solubility, water purification and supply.',
    [
      binaSkDlp('5.1', 'Physical Characteristics of Water', [
        [
          '5.1.1',
          'Elaborate and communicate about water (boiling point, freezing point, surface tension, capillary action).',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 5.1.1: Determine the composition of elements in a water molecule through electrolysis and the effect of impurities on the melting and boiling points of water.',
          },
        ],
        [
          '5.1.2',
          'Carry out experiments and communicate about the water evaporation process in daily life.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 5.1.2: Study the factors affecting the rate of water evaporation (humidity, surrounding temperature, exposed surface area and movement of air).',
          },
        ],
      ]),
      binaSkDlp('5.2', 'Solution and Rate of Solubility', [
        ['5.2.1', 'Explain with example the meaning of solution and solubility.'],
        [
          '5.2.2',
          'Carry out experiment to determine the factors affecting the rate of solubility.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 5.2.2: Determine the factors affecting the rate of solubility (temperature of solvent, rate of stirring and size of solute).',
          },
        ],
        ['5.2.3', 'Explain with examples the meaning of colloids in daily life.'],
        ['5.2.4', 'Elaborate and communicate the uses of water as a universal solvent.'],
        ['5.2.5', 'Demonstrate examples of organic solvents and their uses in daily life.'],
      ]),
      binaSkDlp('5.3', 'Water Purification and Water Supply', [
        ['5.3.1', 'Demonstrate the water purification method.'],
        ['5.3.2', 'Solve problems in getting water supply for daily life usage.'],
        ['5.3.3', 'Build a model and communicate about water supply system.'],
        ['5.3.4', 'Justify water sustainability as a key to healthy living.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F2_B6',
    'Tingkatan 2',
    6,
    'Exploration of Elements in Nature',
    'Acids and Alkalis',
    'Properties of acids and alkalis, pH scale and neutralisation in daily life.',
    [
      binaSkDlp('6.1', 'Properties of Acids and Alkalis', [
        ['6.1.1', 'Defining operationally acid and alkali.'],
        ['6.1.2', 'Explain with examples of acidic and alkaline substances.'],
        ['6.1.3', 'Demonstrate the technique to determine the strength of acid and alkali based on pH value.'],
        ['6.1.4', 'Identify the uses of acids and alkalis in daily life.'],
      ]),
      binaSkDlp('6.2', 'Neutralisation', [
        ['6.2.1', 'Explain the neutralization reaction (acid-alkali titration).'],
        ['6.2.2', 'Explain with examples the use of neutralization reaction in daily life.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F2_B7',
    'Tingkatan 2',
    7,
    'Energy and Sustainability of Life',
    'Electricity and Magnetism',
    'Electrostatics, current, voltage, resistance, series and parallel circuits, and electromagnetism.',
    [
      binaSkDlp('7.1', 'Electricity', [
        ['7.1.1', 'Describe and communicate about energy.'],
        ['7.1.2', 'Explain and communicate about the existence of electrostatic charges.'],
        ['7.1.3', 'Explain with examples on electrostatic in daily life.'],
        ['7.1.4', 'Draw a conclusion that the flow of charges produces electric current.'],
        ['7.1.5', 'Characterise current, voltage and resistance and their units.'],
        [
          '7.1.6',
          'Draw a conclusion on the relationship between current, voltage and resistance (Ohm’s Law).',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 7.1.6: Study the effects of changes in resistance and voltage on electric current (Ohm’s Law).',
          },
        ],
      ]),
      binaSkDlp('7.2', 'The Flow of Electric Current in Series Circuit and Parallel Circuit', [
        ['7.2.1', 'Elaborate and communicate about the flow of electric current in series circuit and parallel circuit.'],
      ]),
      binaSkDlp('7.3', 'Magnetism', [
        ['7.3.1', 'Draw a conclusion about the characteristics of a magnet.'],
        ['7.3.2', 'Describe and communicate about electromagnets.'],
        [
          '7.3.3',
          'Carry out an experiment and communicate about the uses of magnet and electromagnet in daily life.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 7.3.3: Study the factors that affect the strength of the magnetic field of an electromagnet (current and number of turns of coil).',
          },
        ],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F2_B8',
    'Tingkatan 2',
    8,
    'Energy and Sustainability of Life',
    'Force and Motion',
    'Types of forces, effects of force, levers, moment of force, and pressure.',
    [
      binaSkDlp('8.1', 'Force', [
        ['8.1.1', 'Elaborate and communicate about force.'],
        ['8.1.2', 'Explain that force has magnitude, direction and point of application.'],
        ['8.1.3', 'Measure force in S.I. unit using a spring balance.'],
        ['8.1.4', 'Explain with examples that every action force has an equal (same magnitude) reaction force acting in the opposite direction.'],
      ]),
      binaSkDlp('8.2', 'Effects of Force', [
        ['8.2.1', 'Elaborate and communicate about the effects of force.'],
        ['8.2.2', 'Explain and communicate the relationship between the differences in densities and the effects of buoyancy in daily life.'],
        ['8.2.3', 'Classify and solve problems on levers based on the position of fulcrum, load and effort.'],
        ['8.2.4', 'Explain and communicate about the moment of force.'],
        [
          '8.2.5',
          'Carry out an experiment and communicate about pressure and its application in daily life.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 8.2.5: Study the relationship between surface area and pressure produced by the same force.',
          },
        ],
        ['8.2.6', 'Elaborate and communicate about gas pressure based on the kinetic theory of gas.'],
        ['8.2.7', 'Explain and communicate about the existence of atmospheric pressure and the effects of altitude on the magnitude of pressure.'],
        ['8.2.8', 'Explain the effects of depth on liquid pressure.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F2_B9',
    'Tingkatan 2',
    9,
    'Energy and Sustainability of Life',
    'Heat',
    'Temperature and heat, heat flow and thermal equilibrium, expansion/contraction and absorption/radiation of heat.',
    [
      binaSkDlp('9.1', 'Relationship between Temperature and Heat', [
        ['9.1.1', 'Make a comparison between heat and temperature.'],
      ]),
      binaSkDlp('9.2', 'Heat Flow and Thermal Equilibrium', [
        ['9.2.1', 'Explain how heat flows from a hot region to a cold region.'],
        ['9.2.2', 'Explain and communicate about heat flow in natural phenomena (conduction, convection and radiation).'],
        [
          '9.2.3',
          'Communicate about heat conductors and heat insulators and their uses in daily life.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 9.2.3: Study the uses of different materials as heat insulators.',
          },
        ],
      ]),
      binaSkDlp('9.3', 'Principle of Expansion and Contraction of Matter', [
        ['9.3.1', 'Explain how heat can cause the expansion and contraction in solid, liquid and gas.'],
        ['9.3.2', 'Communicate about the various uses of expansion and contraction of matter in daily life.'],
      ]),
      binaSkDlp('9.4', 'Relation between the Types of Surfaces of Objects to Heat Absorption and Emission', [
        [
          '9.4.1',
          'Demonstrate how dark and dull objects absorb heat better than white and shiny objects.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 9.4.1 & 9.4.2: Study heat absorption and heat emission of dark/dull surfaces compared to white/shiny surfaces.',
          },
        ],
        ['9.4.2', 'Demonstrate how dark and dull objects radiate heat better than white and shiny objects.'],
        ['9.4.3', 'Conceptualise and design using the heat concept in daily life (Green Building Project).'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F2_B10',
    'Tingkatan 2',
    10,
    'Energy and Sustainability of Life',
    'Sound Waves',
    'Characteristics of sound waves, loudness and pitch of sound, and reflection of sound waves.',
    [
      binaSkDlp('10.1', 'Characteristics of Sound Waves', [
        ['10.1.1', 'Communicate about the basic characteristics of sound waves.'],
      ]),
      binaSkDlp('10.2', 'Loudness and Pitch of Sound', [
        ['10.2.1', 'Explain frequency and its unit, and amplitude of vibration.'],
        ['10.2.2', 'Relate frequency to pitch.'],
        ['10.2.3', 'Relate amplitude to loudness.'],
        ['10.2.4', 'Explain with examples loudness and pitch using musical instruments.'],
      ]),
      binaSkDlp('10.3', 'Phenomena and Applications of Reflection of Sound Waves', [
        ['10.3.1', 'Explain with example phenomena related to reflection of sound waves such as echo and Doppler effect.'],
        ['10.3.2', 'Explain with example the applications of reflection of sound waves (sonar, ultrasound).'],
        ['10.3.3', 'Elaborate and communicate about limitations of hearing for humans and animals.'],
        ['10.3.4', 'Explain with examples ways to overcome human limitations of hearing.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F2_B11',
    'Tingkatan 2',
    11,
    'Earth and Space Exploration',
    'Stars and Galaxies in the Universe',
    'Galaxies, the Milky Way, nebulae and the life cycle of stars.',
    [
      binaSkDlp('11.1', 'Stars and Galaxies in the Universe', [
        ['11.1.1', 'Communicate about the characteristics of objects in space.'],
        ['11.1.2', 'Compare and contrast the characteristics of stars (including the Sun) and relate them to the observation of stars on the Earth.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F2_B12',
    'Tingkatan 2',
    12,
    'Earth and Space Exploration',
    'Solar System',
    'Distance of planets from the Sun (A.U. and light years), planetary characteristics and hypothetical scenarios.',
    [
      binaSkDlp('12.1', 'Solar System', [
        ['12.1.1', 'Compare distances between the Sun and the planets in the Solar System using astronomical units (a.u.) and light years.'],
        ['12.1.2', 'Construct a table to compare and contrast the planets in the Solar System with the Earth.'],
        ['12.1.3', 'Explore the possible relationship based on the planets’ characteristics and explain the relationship including anomalies that may arise.'],
        ['12.1.4', 'Reason and make analogies in hypothetical situations related to the Solar System.'],
        ['12.1.5', 'Justify the Earth as the most ideal planet for life based on data collected.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F2_B13',
    'Tingkatan 2',
    13,
    'Earth and Space Exploration',
    'Meteoroid, Asteroid, Comet',
    'Other objects in the Solar System (meteoroids, asteroids and comets) and their movement.',
    [
      binaSkDlp('13.1', 'Other Objects in the Solar System: Meteoroids, Asteroids and Comets', [
        ['13.1.1', 'Communicate on other objects in the solar system, such as meteoroids, asteroids and comets.'],
        ['13.1.2', 'Discuss the movements of meteoroids, asteroids and comets and their effects on the Earth based on data.'],
        ['13.1.3', 'Generate ideas on how to reduce or prevent the possibility of asteroid collision with the Earth.'],
      ]),
    ]
  ),
];

// ============================================================================
// KSSM SCIENCE FORM 3 (DLP ENGLISH) - CHAPTER 1 TO CHAPTER 10
// ============================================================================
export const DSKP_SAINS_F3_DLP: BabKimia[] = [
  binaBabDlp(
    'S_F3_B1',
    'Tingkatan 3',
    1,
    'Maintenance and Continuity of Life',
    'Stimuli and Responses',
    'Human nervous system, sensory organs, tropisms and nastic responses in plants, and animal vision/hearing.',
    [
      binaSkDlp('1.1', 'Human Nervous System', [
        ['1.1.1', 'Describe the structures and functions of human nervous system through drawings.'],
        ['1.1.2', 'Make a sequence to show the pathway of impulses in voluntary and involuntary actions.'],
        ['1.1.3', 'Justify the importance of human nervous system in life.'],
      ]),
      binaSkDlp('1.2', 'Stimuli and Responses in Human', [
        ['1.2.1', 'Draw the structures of sensory organs and explain their functions and sensitivities towards stimuli.'],
        ['1.2.2', 'Explain the mechanism of hearing and sight through drawings.'],
        ['1.2.3', 'Relate the human sensory organs to the sensitivity towards various combination of stimuli.'],
        ['1.2.4', 'Explain through examples how the limitation of senses, defect in sensory organs and aging process affect human hearing and sight.'],
        ['1.2.5', 'Justify how innovations and technologies can improve the ability to sense in sensory organs.'],
      ]),
      binaSkDlp('1.3', 'The Stimuli and Responses in Plants', [
        ['1.3.1', 'Describe the parts of a plant that are sensitive towards stimuli.'],
        ['1.3.2', 'Justify how responses in plants ensure their sustainability and survival.'],
        [
          '1.3.3',
          'Carry out experiments to study responses in plants towards various stimuli.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 1.3.3: Study the responses of plants towards light (phototropism), water (hydrotropism), gravity (geotropism) and touch (thigmotropism).',
          },
        ],
      ]),
      binaSkDlp('1.4', 'Importance of Responses to Stimuli in Animals', [
        ['1.4.1', 'Explain with examples the types of sight and hearing in animals (stereoscopic/monocular vision and stereophonic hearing).'],
        ['1.4.2', 'Communicate how sensory organs ensure the survival of animals on Earth.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F3_B2',
    'Tingkatan 3',
    2,
    'Maintenance and Continuity of Life',
    'Respiration',
    'Human respiratory system, movement and exchange of gases, health of respiratory system and gas exchange in plants.',
    [
      binaSkDlp('2.1', 'Respiratory System', [
        ['2.1.1', 'Draw and label the internal structures of the human respiratory system and describe the breathing mechanism.'],
        [
          '2.1.2',
          'Carry out experiments to investigate the differences in the content of gases in inhaled and exhaled air.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 2.1.2: Investigate the percentage of oxygen and carbon dioxide in inhaled and exhaled air.',
          },
        ],
      ]),
      binaSkDlp('2.2', 'Movement and Exchange of Gases in the Human Body', [
        ['2.2.1', 'Describe the movement and exchange of oxygen and carbon dioxide in the human body.'],
        ['2.2.2', 'Justify the importance of adaptation of the alveolar structure to increase efficiency of gaseous exchange in the human body.'],
      ]),
      binaSkDlp('2.3', 'Health of Human Respiratory System', [
        ['2.3.1', 'Communicate about substances that are harmful to the respiratory system as well as diseases and their symptoms.'],
        [
          '2.3.2',
          'Carry out an experiment to show the effects of smoking on the lungs.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 2.3.2: Demonstrate the effects of smoking on the lungs (temperature, cigarette tar and acidic gases).',
          },
        ],
      ]),
      binaSkDlp('2.4', 'Adaptation in Respiratory System', [
        ['2.4.1', 'Justify how the respiratory system adapts in different situations (gills, trachea, moist outer skin).'],
      ]),
      binaSkDlp('2.5', 'Gaseous Exchange in Plants', [
        ['2.5.1', 'Explain the mechanism of gaseous exchange in plants.'],
        ['2.5.2', 'Communicate to justify the importance of an unpolluted environment for the growth and survival of plants.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F3_B3',
    'Tingkatan 3',
    3,
    'Maintenance and Continuity of Life',
    'Transportation',
    'Transport system in organisms, blood circulatory system, human blood groups and transpiration in plants.',
    [
      binaSkDlp('3.1', 'Transport System in Organisms', [
        ['3.1.1', 'Describe the function of transport systems in complex and simple organisms.'],
        ['3.1.2', 'Compare and contrast the functions of transport systems in complex and simple organisms.'],
        ['3.1.3', 'Justify the importance of the function of transport system in organisms.'],
      ]),
      binaSkDlp('3.2', 'Blood Circulatory System', [
        ['3.2.1', 'Generalise the meaning of blood circulatory system in animals.'],
        ['3.2.2', 'Communicate to explain the structure and functions of a heart and blood vessels in human blood circulatory system.'],
        [
          '3.2.3',
          'Carry out experiments to study factors that affect pulse rate.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 3.2.3: Study the factors that affect pulse rate (gender, age and physical activity).',
          },
        ],
        ['3.2.4', 'Justify the importance of maintaining a healthy heart.'],
      ]),
      binaSkDlp('3.3', 'Human Blood', [
        ['3.3.1', 'Separate the components and constituents of human blood.'],
        ['3.3.2', 'Identify blood groups and the effects of receiving incompatible blood groups.'],
        ['3.3.3', 'Communicate about the importance of blood donation in context of daily life.'],
      ]),
      binaSkDlp('3.4', 'Transport System in Plants', [
        ['3.4.1', 'Describe transpiration in plants.'],
        [
          '3.4.2',
          'Carry out experiments to investigate the factors affecting the rate of transpiration.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 3.4.2: Study the factors affecting the rate of transpiration (light intensity, temperature, air humidity and movement of air).',
          },
        ],
        ['3.4.3', 'Differentiate between the structure and functions of components in a vascular bundle of a plant (xylem and phloem).'],
      ]),
      binaSkDlp('3.5', 'Blood Circulatory System in Animals and Transport System in Plants', [
        ['3.5.1', 'Compare blood circulatory system in animals with transport system in plants.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F3_B4',
    'Tingkatan 3',
    4,
    'Exploration of Elements in Nature',
    'Reactivity of Metals',
    'Variety of minerals, reactivity series of metals and extraction of metals from their ores.',
    [
      binaSkDlp('4.1', 'Variety of Minerals', [
        ['4.1.1', 'Explain with examples minerals that are found in the Earth’s crust.'],
        ['4.1.2', 'Identify elements found in natural compounds.'],
        ['4.1.3', 'Explain with examples the characteristics of natural minerals and its uses in daily life.'],
      ]),
      binaSkDlp('4.2', 'Reactivity Series of Metals', [
        ['4.2.1', 'Construct a reactivity series of metals based on its reactivity with oxygen and write the word equation for the reactions.'],
        ['4.2.2', 'Determine the position of carbon and hydrogen in the reactivity series of metals.'],
      ]),
      binaSkDlp('4.3', 'Extraction of Metals from its Ore', [
        ['4.3.1', 'Communicate about the extraction of metals from its ore by illustrations.'],
        ['4.3.2', 'Generate ideas on how to solve problems from unplanned mining activities to life on Earth.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F3_B5',
    'Tingkatan 3',
    5,
    'Exploration of Elements in Nature',
    'Thermochemistry',
    'Endothermic and exothermic reactions and their applications in daily life.',
    [
      binaSkDlp('5.1', 'Endothermic and Exothermic Reactions', [
        ['5.1.1', 'Define endothermic and exothermic reactions.'],
        [
          '5.1.2',
          'Relate heat absorbed or released in a chemical reaction to endothermic and exothermic reactions.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 5.1.2: Compare and contrast exothermic and endothermic reactions.',
          },
        ],
        ['5.1.3', 'Explain with examples exothermic and endothermic reactions.'],
        ['5.1.4', 'Design materials using the concept of exothermic and endothermic processes to solve problems in life.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F3_B6',
    'Tingkatan 3',
    6,
    'Energy and Sustainability of Life',
    'Electricity and Magnetism',
    'Generation of electricity, transformers, transmission and distribution of electricity, and cost of electrical energy.',
    [
      binaSkDlp('6.1', 'Generation of Electricity', [
        ['6.1.1', 'Describe energy sources in terms of renewable energy and non-renewable energy.'],
        ['6.1.2', 'Explain with examples the process of generating electricity from various sources of energy.'],
        ['6.1.3', 'Differentiate between direct current and alternating current.'],
        ['6.1.4', 'Solve problems related to electricity supply in life.'],
      ]),
      binaSkDlp('6.2', 'Transformer', [
        [
          '6.2.1',
          'Carry out an experiment to build a step-up and a step-down transformer.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 6.2.1: Build and study the functions of step-up and step-down transformers.',
          },
        ],
        ['6.2.2', 'Communicate about transformers and the use of transformers in electrical home appliances.'],
        ['6.2.3', 'Solve numerical problems using formula related to transformers (Np/Ns = Vp/Vs).'],
      ]),
      binaSkDlp('6.3', 'Transmission and Distribution of Electricity', [
        ['6.3.1', 'Explain the function of components in the transmission and distribution of electricity by drawing.'],
        ['6.3.2', 'Explain with examples electricity supply and wiring systems in homes.'],
        ['6.3.3', 'Distinguish between safety components in a home electrical wiring system.'],
        ['6.3.4', 'Communicate about safety in transmission and distribution of electricity and the use of electrical appliances.'],
      ]),
      binaSkDlp('6.4', 'Calculate the Cost of Electricity Consumption', [
        ['6.4.1', 'Define energy efficiency.'],
        ['6.4.2', 'List examples of technology that applies the concept of energy efficiency.'],
        ['6.4.3', 'Determine the amount of electricity used in electrical appliances.'],
        ['6.4.4', 'Relate electrical energy consumption, power and time by calculating the cost of electrical energy used by electrical appliances.'],
        ['6.4.5', 'Conduct a home energy audit of electrical appliances used as a measure to save electricity usage at home.'],
        ['6.4.6', 'Communicate about ways of saving electrical energy usage at home.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F3_B7',
    'Tingkatan 3',
    7,
    'Energy and Sustainability of Life',
    'Energy and Power',
    'Work, energy and power, gravitational/elastic potential energy, kinetic energy and Principle of Conservation of Energy.',
    [
      binaSkDlp('7.1', 'Work, Energy and Power', [
        ['7.1.1', 'Define work and solve problems related to energy in the context of daily life (W = Fs).'],
        ['7.1.2', 'Relate power with work and solve problems in the context of daily life (P = W/t).'],
      ]),
      binaSkDlp('7.2', 'Potential Energy and Kinetic Energy', [
        ['7.2.1', 'Explain with examples gravitational potential energy and solve problems in the context of daily life.'],
        ['7.2.2', 'Calculate elastic potential energy in the context of daily life.'],
        ['7.2.3', 'Explain with examples kinetic energy in the context of daily life.'],
      ]),
      binaSkDlp('7.3', 'Principle of Conservation of Energy', [
        ['7.3.1', 'Explain with examples The Principle of Conservation of Energy.'],
        ['7.3.2', 'Solve qualitative and quantitative problems involving the transformation of kinetic energy and potential energy in a closed system.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F3_B8',
    'Tingkatan 3',
    8,
    'Energy and Sustainability of Life',
    'Radioactivity',
    'Discovery of radioactivity, atom and nucleus, ionising and non-ionising radiation, and uses of radioactive radiation.',
    [
      binaSkDlp('8.1', 'Discovery of Radioactivity', [
        ['8.1.1', 'Describe the history of the discovery of radioactivity.'],
        ['8.1.2', 'Explain with examples radioactive materials, radioactivity and the concept of half-life.'],
      ]),
      binaSkDlp('8.2', 'Atom and Nucleus', [
        ['8.2.1', 'Draw an atomic structure in a stable state.'],
        ['8.2.2', 'Explain the formation of positive ions and negative ions.'],
      ]),
      binaSkDlp('8.3', 'Ionising Radiation and Non-ionising Radiation', [
        ['8.3.1', 'Describe ionising radiation and non-ionising radiation.'],
        ['8.3.2', 'Differentiate the three types of ionising radiation in radioactive decay (alpha, beta, gamma).'],
        ['8.3.3', 'Explain with examples sources of ionising radiation in the environment, natural resources and man-made sources.'],
        ['8.3.4', 'Discuss ways to manage the risks from exposure to natural and man-made ionising radiation.'],
      ]),
      binaSkDlp('8.4', 'The Uses of Radioactive Radiation', [
        ['8.4.1', 'Communicate about the use of radioactive radiation for wellbeing.'],
        ['8.4.2', 'Justify the importance of proper handling of radioactive substances and radioactive waste.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F3_B9',
    'Tingkatan 3',
    9,
    'Earth and Space Exploration',
    'Space Weather',
    'The Sun’s activities that affect the Earth, Earth’s magnetosphere and space weather.',
    [
      binaSkDlp('9.1', 'The Sun’s Activities that Affect the Earth', [
        ['9.1.1', 'Explain the structure of the Sun and phenomena that occur on the Sun’s surface by drawing.'],
        ['9.1.2', 'Justify the importance of the Earth’s magnetosphere.'],
      ]),
      binaSkDlp('9.2', 'Space Weather', [
        ['9.2.1', 'Communicate about space weather and its effects on Earth.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F3_B10',
    'Tingkatan 3',
    10,
    'Earth and Space Exploration',
    'Space Exploration',
    'Development in astronomy and technology applications in space exploration.',
    [
      binaSkDlp('10.1', 'Development in Astronomy', [
        ['10.1.1', 'Explain the historical development of the Solar System model by drawing (Ptolemy, Copernicus and Kepler).'],
      ]),
      binaSkDlp('10.2', 'Development of Technology and its Application in Space Exploration', [
        ['10.2.1', 'Communicate about the importance of the development of technology and its application in space exploration.'],
        ['10.2.2', 'Justify the exploration need to continue space.'],
      ]),
    ]
  ),
];

// ============================================================================
// KSSM SCIENCE FORM 4 (DLP ENGLISH) - CHAPTER 1 TO CHAPTER 12
// ============================================================================
export const DSKP_SAINS_F4_DLP: BabKimia[] = [
  binaBabDlp(
    'S_F4_B1',
    'Tingkatan 4',
    1,
    'Scientific Methodology',
    'Safety Measures in the Laboratory',
    'Personal protective equipment, disposable of wastes and fire extinguishers in the laboratory.',
    [
      binaSkDlp('1.1', 'Personal Protective Equipment', [
        ['1.1.1', 'Explain with examples the personal protective equipment and their functions.'],
      ]),
      binaSkDlp('1.2', 'Disposable of Wastes', [
        ['1.2.1', 'Explain with examples wastes that can be disposed into wash basins.'],
        ['1.2.2', 'Characterise substances that cannot be disposed into wash basins.'],
        ['1.2.3', 'Manage biological wastes according to Standard Operating Procedures (SOP).'],
        ['1.2.4', 'Communicate about steps to handle accidents in the laboratory.'],
      ]),
      binaSkDlp('1.3', 'Fire Extinguishers', [
        ['1.3.1', 'Communicate about the types of fire extinguishers.'],
        ['1.3.2', 'Explain the method of using fire extinguishers.'],
        ['1.3.3', 'Carry out an audit on the fire extinguishers at school.'],
        ['1.3.4', 'Create a simple fire extinguisher.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F4_B2',
    'Tingkatan 4',
    2,
    'Scientific Methodology',
    'Emergency Help',
    'Cardiopulmonary Resuscitation (CPR) and Heimlich Manoeuvre.',
    [
      binaSkDlp('2.1', 'Cardiopulmonary Resuscitation (CPR)', [
        ['2.1.1', 'State what is CPR and the situation that requires CPR.'],
        ['2.1.2', 'Demonstrate CPR methods.'],
        ['2.1.3', 'Explain the importance of CPR.'],
      ]),
      binaSkDlp('2.2', 'Heimlich Manoeuvre', [
        ['2.2.1', 'Explain Heimlich Manoeuvre and its importance.'],
        ['2.2.2', 'Make a demonstration on Heimlich Manoeuvre.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F4_B3',
    'Tingkatan 4',
    3,
    'Scientific Methodology',
    'Techniques of Measuring the Parameters of Body Health',
    'Body temperature, pulse rate, blood pressure and Body Mass Index (BMI).',
    [
      binaSkDlp('3.1', 'Body Temperature', [
        ['3.1.1', 'Measure the body temperature using the correct technique.'],
        ['3.1.2', 'Interpret body temperature.'],
      ]),
      binaSkDlp('3.2', 'Pulse Rate', [
        ['3.2.1', 'Identify the pulse points on the body.'],
        [
          '3.2.2',
          'Conduct experiment to determine human pulse rate.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 3.2.2: Determine human pulse rate based on gender, age and physical activities.',
          },
        ],
      ]),
      binaSkDlp('3.3', 'Blood Pressure', [
        ['3.3.1', 'Identify the meter for measuring blood pressure (sphygmomanometer).'],
        ['3.3.2', 'Measure and record blood pressure (systolic and diastolic).'],
        ['3.3.3', 'Interpret data from blood pressure readings.'],
      ]),
      binaSkDlp('3.4', 'Body Mass Index (BMI)', [
        ['3.4.1', 'Calculate and determine Body Mass Index.'],
        ['3.4.2', 'Interpret the Body Mass Index and make decision what to do next.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F4_B4',
    'Tingkatan 4',
    4,
    'Maintenance and Continuity of Life',
    'Green Technology for Environmental Sustainability',
    'Environmental sustainability, energy, waste and wastewater management, agriculture/forestry and transportation sectors.',
    [
      binaSkDlp('4.1', 'Environmental Sustainability', [
        ['4.1.1', 'Define and justify green technology in life.'],
        ['4.1.2', 'Relate energy efficiency with green technology.'],
        ['4.1.3', 'Identify sectors in green technology.'],
      ]),
      binaSkDlp('4.2', 'Energy Sector', [
        ['4.2.1', 'Describe socio-scientific issues.'],
        ['4.2.2', 'Explain socio-scientific issues in the energy sector.'],
        ['4.2.3', 'Justify the application of green technology to overcome socio-scientific issues in the energy sector.'],
      ]),
      binaSkDlp('4.3', 'Waste and Wastewater Management Sector', [
        ['4.3.1', 'Explain socio-scientific issues in the waste and wastewater management sector.'],
        ['4.3.2', 'Justify the application of green technology to overcome socio-scientific issues in the waste and wastewater management sector.'],
      ]),
      binaSkDlp('4.4', 'Agriculture and Forestry Sector', [
        ['4.4.1', 'Explain socio-scientific issues in the agriculture and forestry sector.'],
        ['4.4.2', 'Justify the application of green technology to overcome socio-scientific issues in the agriculture and forestry sector.'],
      ]),
      binaSkDlp('4.5', 'Transportation Sector', [
        ['4.5.1', 'Explain socio-scientific issues in the transportation sector.'],
        ['4.5.2', 'Justify the application of green technology to overcome socio-scientific issues in the transportation sector.'],
      ]),
      binaSkDlp('4.6', 'Green Technology and Life', [
        ['4.6.1', 'Justify the role of individuals in addressing the phenomena of global warming and climate change in reducing carbon footprint.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F4_B5',
    'Tingkatan 4',
    5,
    'Maintenance and Continuity of Life',
    'Genetics',
    'Cell division (mitosis and meiosis), inheritance, mutation, genetic engineering technology and variation.',
    [
      binaSkDlp('5.1', 'Cell Division', [
        ['5.1.1', 'Explain gene, deoxyribonucleic acid (DNA), and chromosomes in the nucleus.'],
        ['5.1.2', 'Compare and contrast mitosis and meiosis.'],
        ['5.1.3', 'Justify the importance of mitosis and meiosis.'],
      ]),
      binaSkDlp('5.2', 'Inheritance', [
        ['5.2.1', 'Explain inheritance in human.'],
        ['5.2.2', 'Communicate about the inheritance mechanisms.'],
      ]),
      binaSkDlp('5.3', 'Mutation', [
        ['5.3.1', 'Describe mutation and types of mutation (chromosome and gene).'],
        ['5.3.2', 'Explain with examples the factors that cause gene mutation and chromosomal mutation.'],
        ['5.3.3', 'Explain with examples gene disorder diseases with their characteristics and the screening method of the disease.'],
        ['5.3.4', 'Discuss the applications of genetic research in increasing living quality.'],
        ['5.3.5', 'Debate the effects of genetics research on human life.'],
      ]),
      binaSkDlp('5.4', 'Genetic Engineering Technology', [
        ['5.4.1', 'Justify genetic engineering technology (recombinant DNA and GMO).'],
        ['5.4.2', 'Debate the effects of genetic engineering technology in life.'],
        ['5.4.3', 'Justify ethical issues in genetic engineering technology.'],
      ]),
      binaSkDlp('5.5', 'Variation', [
        [
          '5.5.1',
          'Communicate about continuous variation and discontinuous variation.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 5.5.1: Study continuous variation (height / body mass) and discontinuous variation (thumbprint types / tongue rolling) among pupils.',
          },
        ],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F4_B6',
    'Tingkatan 4',
    6,
    'Maintenance and Continuity of Life',
    'Support, Movement and Growth',
    'Support, movement and growth in animals, humans and plants.',
    [
      binaSkDlp('6.1', 'Support, Movement and Growth in Animals', [
        ['6.1.1', 'Explain with examples the types of support in animals (endoskeleton, exoskeleton and hydrostatic skeleton).'],
        ['6.1.2', 'Relate the size of exoskeleton with growth.'],
        ['6.1.3', 'Relate hydrostatic skeleton with movement.'],
        ['6.1.4', 'Elaborate the function of endoskeleton in animals.'],
        ['6.1.5', 'Dissect the human skeletal system.'],
        [
          '6.1.6',
          'Carry out an experiment to compare the strength of compact bones with hollow bones.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 6.1.6: Compare the strength of hollow cylinders and compact cylinders (hollow vs compact bones).',
          },
        ],
        ['6.1.7', 'Relate support system with animal stability.'],
      ]),
      binaSkDlp('6.2', 'Movement and Growth in Humans', [
        ['6.2.1', 'Explain the function of joints and muscles in movement.'],
        ['6.2.2', 'Generate ideas regarding problems with joints and muscles in daily life.'],
        ['6.2.3', 'Explain the growth pattern in humans.'],
        ['6.2.4', 'Compare and contrast the growth pattern between male and female.'],
      ]),
      binaSkDlp('6.3', 'Support, Growth and Stability in Plants', [
        ['6.3.1', 'Explain the support systems in terrestrial and aquatic plants.'],
        ['6.3.2', 'Determine the age of woody plants.'],
        ['6.3.3', 'Relate the support system and stability in plants.'],
        [
          '6.3.4',
          'Carry out an experiment to determine a plant’s growth pattern.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 6.3.4: Study the growth pattern of green bean seedlings.',
          },
        ],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F4_B7',
    'Tingkatan 4',
    7,
    'Maintenance and Continuity of Life',
    'Body Coordination',
    'Human endocrine system, disruptions to body coordination and healthy mind.',
    [
      binaSkDlp('7.1', 'Human Endocrine System', [
        ['7.1.1', 'Explain the endocrine system and its functions.'],
        ['7.1.2', 'Explain with examples the cause and effects of hormonal imbalance on health.'],
      ]),
      binaSkDlp('7.2', 'Disruptions to Body Coordination', [
        ['7.2.1', 'Explain with examples the types of drugs.'],
        ['7.2.2', 'Make reasoning on the effects of drug and alcohol abuse on body coordination and mental health.'],
      ]),
      binaSkDlp('7.3', 'Healthy Mind', [
        ['7.3.1', 'Justify the need for a community who have healthy minds.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F4_B8',
    'Tingkatan 4',
    8,
    'Exploration of Elements in Nature',
    'Elements and Substances',
    'Matter (atomic, molecular and ionic substances), Modern Periodic Table of Elements and isotopes.',
    [
      binaSkDlp('8.1', 'Matter', [
        ['8.1.1', 'Explain with examples atomic, molecular and ionic substances.'],
        ['8.1.2', 'Explain the existence of elements in various forms.'],
      ]),
      binaSkDlp('8.2', 'Modern Periodic Table of Elements', [
        ['8.2.1', 'Analyse the Modern Periodic Table of Elements.'],
        ['8.2.2', 'Deduce the principle of arranging the elements in the Modern Periodic Table of Elements.'],
        ['8.2.3', 'Draw and write the electron arrangement of elements in their respective groups.'],
        ['8.2.4', 'Explain the formation of positive and negative ions.'],
        ['8.2.5', 'Justify the loss and gain of electrons to achieve the stable electron arrangement.'],
      ]),
      binaSkDlp('8.3', 'Isotope', [
        ['8.3.1', 'Describe isotopes with examples.'],
        ['8.3.2', 'Determine the number of protons, number of neutrons and nucleon number in isotopes.'],
        ['8.3.3', 'Communicate about theenga uses of isotopes in various fields.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F4_B9',
    'Tingkatan 4',
    9,
    'Exploration of Elements in Nature',
    'Chemicals in Industry',
    'Alloys and superconductors, glass and ceramics, and natural/synthetic polymers.',
    [
      binaSkDlp('9.1', 'Alloy', [
        ['9.1.1', 'Define and give examples of alloys based on their composition of elements.'],
        [
          '9.1.2',
          'Carry out an experiment to compare alloys with its pure metals.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 9.1.2: Compare the properties of alloys and pure metals in terms of hardness and resistance to corrosion.',
          },
        ],
        ['9.1.3', 'Justify therit uses of alloys in daily life.'],
      ]),
      binaSkDlp('9.2', 'Glass and Ceramics', [
        ['9.2.1', 'Describe the components of glass and ceramics.'],
        ['9.2.2', 'Explain with examples the application of glass and ceramics.'],
        ['9.2.3', 'Justify the suitability of using glass and ceramics in daily life.'],
      ]),
      binaSkDlp('9.3', 'Polymer', [
        ['9.3.1', 'Explain natural polymers and synthetic polymers.'],
        ['9.3.2', 'Explain the process of addition polymerisation.'],
        ['9.3.3', 'Communicate about the characteristics and process of vulcanisation of rubber.'],
        ['9.3.4', 'Generate ideas about the latest technology based on rubber.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F4_B10',
    'Tingkatan 4',
    10,
    'Exploration of Elements in Nature',
    'Chemicals in Medicine and Health',
    'Traditional, modern and complementary medicine, free radicals, antioxidants and health products.',
    [
      binaSkDlp('10.1', 'Traditional Medicine, Modern Medicine and Complementary Medicine', [
        ['10.1.1', 'Explain the criteria of traditional medicine, modern medicine and complementary medicine.'],
        ['10.1.2', 'Explain the medicines used in traditional, modern and complementary medicine.'],
        ['10.1.3', 'Justify the use of traditional, modern and complementary medicine.'],
        ['10.1.4', 'Make reasoning on the use ofamo medicine from natural resources and man-made resources in treatments and healthcare.'],
        ['10.1.5', 'Conclude the effect of misuse of medicine.'],
      ]),
      binaSkDlp('10.2', 'Free Radicals', [
        ['10.2.1', 'Define free radicals.'],
        ['10.2.2', 'Do reasoning on the impact of free radicals on human health.'],
      ]),
      binaSkDlp('10.3', 'Antioxidant Substances', [
        ['10.3.1', 'Describe the antioxidant substances.'],
        ['10.3.2', 'Explain the action of antioxidant substance on free radicals.'],
        [
          '10.3.3',
          'Carry out an experiment to investigate the factors that affect the oxidation of food.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 10.3.3: Study the effects of different types of solutions on the oxidation of apple slices.',
          },
        ],
      ]),
      binaSkDlp('10.4', 'Health Products', [
        ['10.4.1', 'Explain the meaning of active ingredients in health products.'],
        ['10.4.2', 'Justify the use of health products available in the market.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F4_B11',
    'Tingkatan 4',
    11,
    'Energy and Sustainability of Life',
    'Force and Motion',
    'Linear motion, linear motion graphs, gravitational acceleration and free fall, and mass and inertia.',
    [
      binaSkDlp('11.1', 'Linear Motion', [
        ['11.1.1', 'Explain the difference between distance and displacement and their units in daily life.'],
        ['11.1.2', 'Explain with examples the meaning of speed, average speed, velocity and acceleration and their magnitudes and directions.'],
        ['11.1.3', 'Solve problems that involve speed, average speed, velocity and acceleration in daily life.'],
        ['11.1.4', 'Distinguish between the various types of linear motion.'],
      ]),
      binaSkDlp('11.2', 'Linear Motion Graphs', [
        ['11.2.1', 'Interpret the different types of motion from the linear motion graphs to determine distance, displacement, velocity, average velocity and acceleration.'],
      ]),
      binaSkDlp('11.3', 'Gravitational Acceleration and Free Fall', [
        [
          '11.3.1',
          'Carry out an experiment to determine the acceleration of the earth’s gravity, g.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 11.3.1: Determine the acceleration due to gravity, g using a ticker timer.',
          },
        ],
        ['11.3.2', 'Interpret the motion graph for a free fall object.'],
        [
          '11.3.3',
          'Carry out an experiment to study free fall and non-free fall.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 11.3.3: Study the time taken by an object falling in free fall and non-free fall conditions.',
          },
        ],
      ]),
      binaSkDlp('11.4', 'Mass and Inertia', [
        ['11.4.1', 'Explain mass.'],
        ['11.4.2', 'Explain with examples the meaning of inertia.'],
        [
          '11.4.3',
          'Carry out an experiment to study the relationship between mass and inertia.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 11.4.3: Study the relationship between mass and inertia using an inertial balance.',
          },
        ],
        ['11.4.4', 'Communicate the effects of inertia in daily life.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F4_B12',
    'Tingkatan 4',
    12,
    'Energy and Sustainability of Life',
    'Nuclear Energy',
    'Application of nuclear energy, production of nuclear energy (fission and fusion) and impact of using nuclear energy.',
    [
      binaSkDlp('12.1', 'Application of Nuclear Energy', [
        ['12.1.1', 'Justify the use of nuclear energy for a country that has been identified.'],
      ]),
      binaSkDlp('12.2', 'Production of Nuclear Energy', [
        ['12.2.1', 'Describe the production of nuclear energy by nuclear fission and nuclear fusion.'],
        ['12.2.2', 'Describe the generation of electricity from nuclear energy in a nuclear reactor.'],
        ['12.2.3', 'Justify the use of nuclear energy as an alternative energy to generate electricity.'],
      ]),
      binaSkDlp('12.3', 'Impact of Using Nuclear Energy', [
        ['12.3.1', 'Tell a story about the impact of the usage of nuclear weapons on life and the environment.'],
        ['12.3.2', 'Conclude the impact of nuclear tests on the environment.'],
      ]),
      binaSkDlp('12.4', 'Nuclear Energy in Malaysia', [
        ['12.4.1', 'Justify the construction of nuclear power plant in Malaysia.'],
      ]),
    ]
  ),
];

// ============================================================================
// KSSM SCIENCE FORM 5 (DLP ENGLISH) - CHAPTER 1 TO CHAPTER 9
// ============================================================================
export const DSKP_SAINS_F5_DLP: BabKimia[] = [
  binaBabDlp(
    'S_F5_B1',
    'Tingkatan 5',
    1,
    'Maintenance and Continuity of Life',
    'Microorganisms',
    'World of microorganisms, useful microorganisms, and prevention and treatment of diseases caused by microorganisms.',
    [
      binaSkDlp('1.1', 'World of Microorganisms', [
        ['1.1.1', 'Communicate about microorganisms (normal flora and classification of microorganisms).'],
        [
          '1.1.2',
          'Conduct an experiment to show the presence of microorganisms.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 1.1.2: Show the presence of microorganisms on hands (before and after washing).',
          },
        ],
        [
          '1.1.3',
          'Conduct an experiment to investigate factors that affect the growth of microorganisms.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 1.1.3: Study the factors that affect the growth of microorganisms (nutrients, humidity, light, temperature and pH value).',
          },
        ],
      ]),
      binaSkDlp('1.2', 'Useful Microorganisms', [
        ['1.2.1', 'Justify the applications of useful microorganisms in life.'],
        ['1.2.2', 'Generate ideas on the potential use of microorganisms in biotechnology and sustainability of the environment.'],
      ]),
      binaSkDlp('1.3', 'Prevention and Treatment of Diseases Caused by Microorganisms', [
        ['1.3.1', 'Explain the concept of "prevention is better than cure" for diseases caused by microorganisms.'],
        ['1.3.2', 'Explain the aseptic techniques to control the spreading of microorganisms.'],
        [
          '1.3.3',
          'Conduct an experiment to study the effect of antibiotic on bacterial growth.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 1.3.3: Study the effect of antibiotic concentration (penicillin) on bacterial growth.',
          },
        ],
        ['1.3.4', 'Communicate about methods of treatment of infectious diseases.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F5_B2',
    'Tingkatan 5',
    2,
    'Maintenance and Continuity of Life',
    'Nutrition and Food Technology',
    'Balanced diet and calorific value, nutrient requirements in plants, nitrogen cycle, food production and food processing technology.',
    [
      binaSkDlp('2.1', 'Balanced Diet and Calorific Value', [
        ['2.1.1', 'Describe balanced diet.'],
        [
          '2.1.2',
          'Conduct an experiment to estimate the energy value in food samples.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 2.1.2: Estimate the calorific value of several food samples using a simple calorimeter.',
          },
        ],
        ['2.1.3', 'Justify the effects of consuming calories that do not meet individual requirements.'],
      ]),
      binaSkDlp('2.2', 'Nutrient Requirements in Plants', [
        ['2.2.1', 'Explain with examples the functions of macronutrients and micronutrients to plants.'],
        [
          '2.2.2',
          'Conduct an experiment to study the effect of macronutrients deficiency on plants.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 2.2.2: Study the effects of nitrogen, phosphorus and potassium deficiency on plant growth.',
          },
        ],
      ]),
      binaSkDlp('2.3', 'Nitrogen Cycle', [
        ['2.3.1', 'Communicate about the Nitrogen Cycle and its importance.'],
      ]),
      binaSkDlp('2.4', 'Food Production Technology', [
        ['2.4.1', 'Communicate on how toouden improve resources, quality and quantity of food production.'],
        ['2.4.2', 'Evaluate the use of pesticides and biological controls to increase the quality and quantity of food production.'],
      ]),
      binaSkDlp('2.5', 'Food Processing Technology', [
        ['2.5.1', 'Communicate about food processing technology.'],
      ]),
      binaSkDlp('2.6', 'Health Foods and Health Supplements', [
        ['2.6.1', 'Communicate about issues related to health foods and health supplements.'],
        ['2.6.2', 'Communicate about issues related to Halal Food Status.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F5_B3',
    'Tingkatan 5',
    3,
    'Maintenance and Continuity of Life',
    'Sustainability of the Environment',
    'Product life cycle, carbon footprint/handprint, environmental pollution (BOD & effective microorganisms) and conservation.',
    [
      binaSkDlp('3.1', 'Product Life Cycle', [
        ['3.1.1', 'Explain the meaning of carbon footprint.'],
        ['3.1.2', 'Break down the products used by an individual in a day.'],
        ['3.1.3', 'Justify the action that needs to be taken, that is, carbon handprint to reduce the emission of greenhouse gases in one day of one’s life.'],
        ['3.1.4', 'Communicate about the life cycle of a product.'],
        ['3.1.5', 'Generate ideas about efficient management of plastic waste towards environmental sustainability.'],
      ]),
      binaSkDlp('3.2', 'Environmental Pollution', [
        ['3.2.1', 'Explain the types and sources of environmental pollution.'],
        [
          '3.2.2',
          'Study the water pollution level from domestic waste.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 3.2.2: Determine the water pollution level (Biochemical Oxygen Demand, BOD) of various water samples using methylene blue solution.',
          },
        ],
        ['3.2.3', 'Create and design a purification method for contaminated water using green technology (Effective Microorganism mud balls).'],
      ]),
      binaSkDlp('3.3', 'Preservation and Conservation of the Environment', [
        ['3.3.1', 'Justify the role of individuals in managing natural resources to maintain the balance in the environment.'],
        ['3.3.2', 'Debate the role of the United Nations (UN) in addressing environmental issues globally.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F5_B4',
    'Tingkatan 5',
    4,
    'Exploration of Elements in Nature',
    'Rate of Reaction',
    'Introduction to rate of reaction, factors affecting rate of reaction and its industrial applications.',
    [
      binaSkDlp('4.1', 'Introduction to Rate of Reaction', [
        ['4.1.1', 'Explain with examples of fast reactions and slow reactions in daily life.'],
        ['4.1.2', 'Define the rate of reaction.'],
        ['4.1.3', 'Determine the rate of reaction.'],
      ]),
      binaSkDlp('4.2', 'Factors Affecting Rate of Reaction', [
        [
          '4.2.1',
          'Carry out experiments to study factors affecting rate of reaction.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 4.2.1: Study the factors of temperature, concentration, size of reactant and catalyst that affect the rate of reaction.',
          },
        ],
      ]),
      binaSkDlp('4.3', 'Applications of the Concept of Rate of Reaction', [
        ['4.3.1', 'Communicate about the applications of the concept of rate of reaction in daily life and industries (Haber Process and Contact Process).'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F5_B5',
    'Tingkatan 5',
    5,
    'Exploration of Elements in Nature',
    'Carbon Compounds',
    'Carbon cycle, hydrocarbons (alkanes and alkenes), alcohol, fats and palm oil (saponification).',
    [
      binaSkDlp('5.1', 'Introduction to Carbon Compounds', [
        ['5.1.1', 'Identify carbon compounds in nature.'],
        ['5.1.2', 'Explain the importance of Carbon Cycle.'],
      ]),
      binaSkDlp('5.2', 'Hydrocarbons', [
        ['5.2.1', 'Describe hydrocarbon compounds and explain how carbon compounds are obtained from natural sources.'],
        ['5.2.2', 'Name members of the homologous series of alkanes and alkenes from carbon 1 to carbon 6.'],
        ['5.2.3', 'Communicate about alternative energy sources and renewable energy in daily life.'],
      ]),
      binaSkDlp('5.3', 'Alcohol', [
        [
          '5.3.1',
          'Describe the preparation of alcohol.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 5.3.1: Prepare ethanol through fermentation and distillation.',
          },
        ],
        ['5.3.2', 'Identify the physical properties and chemical properties of alcohol.'],
        ['5.3.3', 'Communicate about the uses of alcohol in daily life.'],
        ['5.3.4', 'Communicate about the effects of excessive alcohol consumption.'],
      ]),
      binaSkDlp('5.4', 'Fats', [
        ['5.4.1', 'State the content of fats and its sources.'],
        ['5.4.2', 'Compare and contrast between saturated and unsaturated fats.'],
        ['5.4.3', 'Explain with examples the effects of eating food containing excess fat on health.'],
      ]),
      binaSkDlp('5.5', 'Palm Oil', [
        ['5.5.1', 'Describe the structure of oil palm fruit.'],
        ['5.5.2', 'Identify the quantity aspect of oil from pulp and kernel.'],
        ['5.5.3', 'Explain in order the process of palm oil extraction in industry.'],
        ['5.5.4', 'Describes the components of palm oil.'],
        ['5.5.5', 'Compare and contrast the composition of palm oil with other vegetable oils.'],
        ['5.5.6', 'State the chemical properties of palm oil.'],
        ['5.5.7', 'Explain the emulsification process of palm oil.'],
        ['5.5.8', 'List the nutritional content of palm oil.'],
        ['5.5.9', 'Justify the use of palm oil in healthcare and food.'],
        [
          '5.5.10',
          'Carry out an experiment to produce soap through saponification process.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 5.5.10: Produce soap from palm oil through the saponification process.',
          },
        ],
        ['5.5.11', 'Communicate about the cleansing action of soap.'],
        ['5.5.12', 'Generate ideas on sustainable management and its importance in the palm oil industry.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F5_B6',
    'Tingkatan 5',
    6,
    'Exploration of Elements in Nature',
    'Electrochemistry',
    'Electrolytic cell (electrolysis and electroplating) and simple chemical cell.',
    [
      binaSkDlp('6.1', 'Electrolytic Cell', [
        ['6.1.1', 'Understand electrolysis.'],
        [
          '6.1.2',
          'Carry out an experiment to study electrolysis of ionic compounds in various conditions.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 6.1.2: Study the electrolysis of ionic compounds in solid, molten and aqueous states.',
          },
        ],
        [
          '6.1.3',
          'Carry out an experiment to study the factors affecting the products in electrolysis.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 6.1.3: Study the factors of position of ions in the electrochemical series, concentration of electrolyte and types of electrodes affecting the products of electrolysis.',
          },
        ],
        ['6.1.4', 'Communicate about the applications of electrolysis in the industries.'],
      ]),
      binaSkDlp('6.2', 'Chemical Cell', [
        ['6.2.1', 'Explain the energy change in a simple chemical cell.'],
        [
          '6.2.2',
          'Generate ideas on application of chemical cell concepts in generating electricity from a variety of sources.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 6.2.2: Construct a simple chemical cell using different metal pairs and natural electrolyte sources.',
          },
        ],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F5_B7',
    'Tingkatan 5',
    7,
    'Energy and Sustainability of Life',
    'Light and Optics',
    'Formation of images by convex and concave lenses, and optical instruments.',
    [
      binaSkDlp('7.1', 'Formation of Image by Lenses', [
        ['7.1.1', 'Describe convex lenses as a converging lens and concave lenses as a diverging lens.'],
        [
          '7.1.2',
          'Determine the focal length of a convex lens using a distant object.',
          {
            eksperimenWajib: true,
            namaEksperimen:
              'Experiment 7.1.2: Determine the focal length of a convex lens using a distant object.',
          },
        ],
        ['7.1.3', 'Determine the characteristics of images formed by convex and concave lenses using ray diagrams.'],
      ]),
      binaSkDlp('7.2', 'Optical Instruments', [
        ['7.2.1', 'Describe the formation of the final image by telescopes and microscopes.'],
        ['7.2.2', 'Design and build a simple telescope.'],
        ['7.2.3', 'Communicate about the application of lenses in optical instruments.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F5_B8',
    'Tingkatan 5',
    8,
    'Energy and Sustainability of Life',
    'Force and Pressure',
    'Pascal’s Principle, hydraulic systems and Bernoulli’s Principle in daily life.',
    [
      binaSkDlp('8.1', 'Pressure in Fluids', [
        ['8.1.1', 'Explain the concept of pressure in fluids in an enclosed system (Pascal’s principle).'],
        ['8.1.2', 'Communicate about the application of Pascal’s principle in everyday life.'],
        ['8.1.3', 'Explain the relationship between fluid velocity and pressure (Bernoulli’s principle and Venturi tube).'],
        ['8.1.4', 'Communicate about the application of Bernoulli’s principle in daily life.'],
        ['8.1.5', 'Design a tool using the principle of pressure in fluids.'],
      ]),
    ]
  ),
  binaBabDlp(
    'S_F5_B9',
    'Tingkatan 5',
    9,
    'Earth and Space Exploration',
    'Space Technology',
    'Satellites (types of orbits, apogee/perigee, ISS) and Global Positioning System (GPS).',
    [
      binaSkDlp('9.1', 'Satellite', [
        ['9.1.1', 'Explain the types of satellite orbits (LEO, MEO, GEO, HEO, GSO).'],
        ['9.1.2', 'Explain with diagrams the apogee and perigee positions of a satellite in an elliptical orbit.'],
        ['9.1.3', 'Relate the relationship between orbital height and satellite velocity.'],
        ['9.1.4', 'Explain how a satellite is launched and placed in orbit.'],
        ['9.1.5', 'Explain the function of the space station (ISS).'],
        ['9.1.6', 'Communicate about the methods for tracking space stations.'],
        ['9.1.7', 'Elaborate the impact of rapid development in space technology (space junk).'],
      ]),
      binaSkDlp('9.2', 'Global Positioning System (GPS)', [
        ['9.2.1', 'Explain about Global Positioning System (GPS).'],
        ['9.2.2', 'Apply GPS coordinate system for navigation purposes (DMS and DD formats).'],
      ]),
    ]
  ),
];
