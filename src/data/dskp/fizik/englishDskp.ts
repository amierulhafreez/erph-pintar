import { BabFizik, StandardPembelajaran } from '../../../types/rph';

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
      `By the end of the lesson, pupils are able to ${lowerVerbTitle} accurately in accordance with KSSM Physics curriculum specifications.`,
      eksperimenWajib
        ? `Conduct scientific investigation (${cleanTitle}), record observations and measurements systematically, and draw valid physical conclusions.`
        : `Apply the concept of ${skTajuk.toLowerCase()} to solve at least 3 structured numerical or conceptual physics problems correctly.`,
    ],
    kriteriaKejayaanCadangan: [
      `Pupils can explain key concepts, laws, and physics principles for LS ${kod} (${cleanTitle}) using precise scientific language.`,
      eksperimenWajib
        ? 'Pupils successfully set up apparatus safely, record complete experimental readings, and write an accurate physics lab report.'
        : `Pupils correctly answer at least 3 out of 4 formative exercises related to ${skTajuk.toLowerCase()}.`,
    ],
    cadanganAktiviti: {
      setInduksi: `Teacher presents a real-world physical phenomenon or interactive simulation related to ${skTajuk} (${babTajuk}) and poses inquiry questions to trigger scientific reasoning.`,
      aktivitiUtama: eksperimenWajib
        ? [
            `1. Teacher conducts a laboratory briefing and reviews the hypothesis, variables (manipulated, responding, constant) and apparatus setup for: ${cleanTitle}.`,
            '2. Pupils carry out the hands-on experiment in small groups, taking accurate measurements and recording readings systematically.',
            '3. Groups plot graphs, analyse data trends, and formulate physical conclusions with teacher guidance.',
          ]
        : [
            `1. Teacher introduces core physics concepts and formulae for LS ${kod}: ${cleanTitle} using interactive models and demonstrations.`,
            '2. 21st Century Learning (PAK-21) Activity: Pupils work in groups to analyse physics scenarios, sketch graphs, and solve calculation steps.',
            '3. Group representatives present their working methods and receive immediate formative feedback from peers and the teacher.',
          ],
      penutup: `Exit Ticket: Pupils summarise the key physics principles of LS ${kod} and solve a rapid check question.`,
      aktiviti5E: {
        engage: `Teacher demonstrates a real-world physics phenomenon or question related to ${skTajuk} to arouse pupils' curiosity.`,
        explore: eksperimenWajib
          ? `Pupils assemble the apparatus, manipulate physical variables, and record data to test the hypothesis for: ${cleanTitle}.`
          : `Pupils explore physical relationships through guided group tasks or virtual simulations relating to ${skTajuk}.`,
        explain: `Pupils explain graphical trends or conceptual reasoning, and teacher clarifies definitions, units, and physical laws.`,
        elaborate: `Pupils apply ${skTajuk} principles to solve real-life engineering problems, technology applications, or SPM-level calculation scenarios.`,
        evaluate: `Teacher assesses pupils' mastery via formative questions and evaluates conceptual clarity and problem-solving steps.`,
      },
    },
  };
}

export const DSKP_FIZIK_DLP: BabFizik[] = [
  {
    id: 'F4_B1',
    tingkatan: 'Tingkatan 4',
    nomborBab: 1,
    tema: "ELEMENTARY PHYSICS",
    tajuk: "Measurement",
    peneranganRingkas: "Physical quantities, units of measurement, and scientific investigation.",
    skList: [
      {
        kod: '1.1',
        tajuk: "Physical Quantities",
        spList: [
          makeEnglishSp("1.1.1", "Explain physical quantities.", "Physical Quantities", "Measurement"),
          makeEnglishSp("1.1.2", "Explain with examples base quantities and derived quantities.", "Physical Quantities", "Measurement"),
          makeEnglishSp("1.1.3", "Describe derived quantities in terms of base quantities and their corresponding S.I. units.", "Physical Quantities", "Measurement"),
          makeEnglishSp("1.1.4", "Explain with examples, scalar quantities and vector quantities.", "Physical Quantities", "Measurement"),
        ],
      },
      {
        kod: '1.2',
        tajuk: "Scientific Investigation",
        spList: [
          makeEnglishSp("1.2.1", "Interpret graph to determine the relationship between two physical quantities.", "Scientific Investigation", "Measurement"),
          makeEnglishSp("1.2.2", "Analyse graph to summarise an investigation.", "Scientific Investigation", "Measurement"),
          makeEnglishSp("1.2.3", "Carry out a scientific investigation and write a complete report for the Simple Pendulum Experiment.", "Scientific Investigation", "Measurement", true),
        ],
      },
    ],
  },
  {
    id: 'F4_B2',
    tingkatan: 'Tingkatan 4',
    nomborBab: 2,
    tema: "NEWTONIAN MECHANICS",
    tajuk: "Force and Motion I",
    peneranganRingkas: "Kinematics of linear motion, inertia, momentum, force, impulse and weight.",
    skList: [
      {
        kod: '2.1',
        tajuk: "Linear Motion",
        spList: [
          makeEnglishSp("2.1.1", "Describe the type of linear motion of an object in the following states: (i) stationary (ii) uniform velocity (iii) non-uniform velocity", "Linear Motion", "Force and Motion I"),
          makeEnglishSp("2.1.2", "Determine: (i) distance and displacement (ii) speed and velocity (iii) acceleration/ deceleration", "Linear Motion", "Force and Motion I", true),
          makeEnglishSp("2.1.3", "Solve problems involving linear motion using the following equations: (i) (ii) (iii) (iv)", "Linear Motion", "Force and Motion I"),
        ],
      },
      {
        kod: '2.2',
        tajuk: "Linear Motion Graphs",
        spList: [
          makeEnglishSp("2.2.1", "Interpret types of motion from the following: (i) displacement-time graph (ii) velocity-time graph (iii) acceleration-time graph", "Linear Motion Graphs", "Force and Motion I"),
          makeEnglishSp("2.2.2", "Analyse displacement-time graph to determine distance, displacement and velocity.", "Linear Motion Graphs", "Force and Motion I"),
          makeEnglishSp("2.2.3", "Analyse velocity-time graph to determine distance, displacement, velocity and acceleration.", "Linear Motion Graphs", "Force and Motion I"),
          makeEnglishSp("2.2.4", "Convert and sketch: (i) displacement-time graph to velocity-time graph and vice-versa (ii) velocity-time graph to acceleration-time graph and vice-versa.", "Linear Motion Graphs", "Force and Motion I"),
          makeEnglishSp("2.2.5", "Solve problems involving linear motion graphs.", "Linear Motion Graphs", "Force and Motion I"),
        ],
      },
      {
        kod: '2.3',
        tajuk: "Free Fall Motion",
        spList: [
          makeEnglishSp("2.3.1", "Explain with examples free fall motion and gravitational acceleration.", "Free Fall Motion", "Force and Motion I", true),
          makeEnglishSp("2.3.2", "Experiment to determine the value of gravitational acceleration.", "Free Fall Motion", "Force and Motion I", true),
          makeEnglishSp("2.3.3", "Solve problems involving the Earth’s gravitational acceleration for objects in free fall.", "Free Fall Motion", "Force and Motion I"),
        ],
      },
      {
        kod: '2.4',
        tajuk: "Inertia",
        spList: [
          makeEnglishSp("2.4.1", "Explain with examples the concept of inertia.", "Inertia", "Force and Motion I"),
          makeEnglishSp("2.4.2", "Experiment to find the relationship between inertia and mass.", "Inertia", "Force and Motion I", true),
          makeEnglishSp("2.4.3", "Justify the effects of inertia in daily life.", "Inertia", "Force and Motion I"),
        ],
      },
      {
        kod: '2.5',
        tajuk: "Momentum",
        spList: [
          makeEnglishSp("2.5.1", "Explain momentum, p as the product of mass, m and velocity, v. p = mv", "Momentum", "Force and Motion I"),
          makeEnglishSp("2.5.2", "Apply the Principle of Conservation of Momentum in collision and explosion.", "Momentum", "Force and Motion I"),
        ],
      },
      {
        kod: '2.6',
        tajuk: "Force",
        spList: [
          makeEnglishSp("2.6.1", "Define force as the rate of change of momentum.", "Force", "Force and Motion I"),
          makeEnglishSp("2.6.2", "Solve problems involving F= ma t mu mvF  maF maF", "Force", "Force and Motion I"),
        ],
      },
      {
        kod: '2.7',
        tajuk: "Impulse and Impulsive Force",
        spList: [
          makeEnglishSp("2.7.1", "Communicate to explain impulse and impulsive force.", "Impulse and Impulsive Force", "Force and Motion I"),
          makeEnglishSp("2.7.2", "Solve problems involving impulse and impulsive force. t mu mvF ", "Impulse and Impulsive Force", "Force and Motion I"),
        ],
      },
      {
        kod: '2.8',
        tajuk: "Weight",
        spList: [
          makeEnglishSp("2.8.1", "Describe weight as the gravitional force that acts on an object, W = mg", "Weight", "Force and Motion I"),
        ],
      },
    ],
  },
  {
    id: 'F4_B3',
    tingkatan: 'Tingkatan 4',
    nomborBab: 3,
    tema: "NEWTONIAN MECHANICS",
    tajuk: "Gravitation",
    peneranganRingkas: "Newton's Universal Law of Gravitation, Kepler's Laws, and satellite orbits.",
    skList: [
      {
        kod: '3.1',
        tajuk: "Newton's Universal Law of Gravitation",
        spList: [
          makeEnglishSp("3.1.1", "Explain Newton’s Universal Law of Gravitation: 2 1 r mGmF", "Newton's Universal Law of Gravitation", "Gravitation"),
          makeEnglishSp("3.1.2", "Solve problems involving Newton’s Universal Law of Gravitation for: (i) two static objects on the Earth (ii) objects on the Earth’s surface (iii) Earth and satelites (iv) Earth and Sun", "Newton's Universal Law of Gravitation", "Gravitation"),
          makeEnglishSp("3.1.3", "Relate gravitational acceleration, g on the surface of the Earth with the universal gravitational constant, G", "Newton's Universal Law of Gravitation", "Gravitation"),
          makeEnglishSp("3.1.4", "Justify the importance of knowing the values of gravitational acceleration of the planets in the Solar System.", "Newton's Universal Law of Gravitation", "Gravitation"),
          makeEnglishSp("3.1.5", "Describe the centripetal force in the motion of satellites and planets system. Centripetal Force, r mvF 2", "Newton's Universal Law of Gravitation", "Gravitation"),
          makeEnglishSp("3.1.6", "Determine the mass of the Earth and the Sun using Newton’s universal law of gravitation and centripetal force.", "Newton's Universal Law of Gravitation", "Gravitation"),
        ],
      },
      {
        kod: '3.2',
        tajuk: "Kepler's Laws",
        spList: [
          makeEnglishSp("3.2.1", "Explain Kepler’s Laws.", "Kepler's Laws", "Gravitation", true),
          makeEnglishSp("3.2.2", "Express Kepler’s Third Law T2 ∝ r3", "Kepler's Laws", "Gravitation"),
          makeEnglishSp("3.2.3", "Solve problems using Kepler’s Third Law", "Kepler's Laws", "Gravitation"),
        ],
      },
      {
        kod: '3.3',
        tajuk: "Man-made Satellites",
        spList: [
          makeEnglishSp("3.3.1", "Describe how an orbit of a satellite is maintained at a specific height by setting the necessary satellite’s velocity.", "Man-made Satellites", "Gravitation"),
          makeEnglishSp("3.3.2", "Communicate on geostationary and non- geostationary satellites.", "Man-made Satellites", "Gravitation"),
          makeEnglishSp("3.3.3", "Conceptualize escape velocity", "Man-made Satellites", "Gravitation", true),
          makeEnglishSp("3.3.4", "Solve problems involving the escape velocity,v for a rocket from the Earth’s surface, the Moon’s surface, Mars’ surface and the Sun’s surface.", "Man-made Satellites", "Gravitation"),
        ],
      },
    ],
  },
  {
    id: 'F4_B4',
    tingkatan: 'Tingkatan 4',
    nomborBab: 4,
    tema: "HEAT",
    tajuk: "Heat",
    peneranganRingkas: "Thermal equilibrium, specific heat capacity, specific latent heat, and gas laws.",
    skList: [
      {
        kod: '4.1',
        tajuk: "Thermal Equilibrium",
        spList: [
          makeEnglishSp("4.1.1", "Explain with examples thermal equilibrium in daily life.", "Thermal Equilibrium", "Heat", true),
          makeEnglishSp("4.1.2", "Calibrate a liquid-in-glass thermometer using two fixed points.", "Thermal Equilibrium", "Heat"),
        ],
      },
      {
        kod: '4.2',
        tajuk: "Specific Heat Capacity",
        spList: [
          makeEnglishSp("4.2.1", "Explain heat capacity, C.", "Specific Heat Capacity", "Heat"),
          makeEnglishSp("4.2.2", "Define specific heat capacity of a material, c", "Specific Heat Capacity", "Heat"),
          makeEnglishSp("4.2.3", "Experiment to determine: (i) the specific heat capacity of water (ii) the specific heat capacity of aluminum", "Specific Heat Capacity", "Heat", true),
          makeEnglishSp("4.2.4", "Communicate to explain the applications of specific heat capacity in daily life, material engineering and natural phenomena.", "Specific Heat Capacity", "Heat"),
          makeEnglishSp("4.2.5", "Solve problems involving specific heat capacity using formula: Q = mcѲ", "Specific Heat Capacity", "Heat"),
        ],
      },
      {
        kod: '4.3',
        tajuk: "Specific Latent Heat",
        spList: [
          makeEnglishSp("4.3.1", "Explain latent heat.", "Specific Latent Heat", "Heat"),
          makeEnglishSp("4.3.2", "Define: (i) specific latent heat, (ii) specific latent heat of fusion, 𝓁f (iii) specific latent heat of evaporization, 𝓁v", "Specific Latent Heat", "Heat"),
          makeEnglishSp("4.3.3", "Experiment to determine: (i) specific latent heat, 𝓁f of fusion of ice. (ii) specific latent heat of evaporation, 𝓁v of water", "Specific Latent Heat", "Heat", true),
          makeEnglishSp("4.3.4", "Communicate to explain the applications of specific latent heat in daily life.", "Specific Latent Heat", "Heat"),
          makeEnglishSp("4.3.5", "Solve problems involving latent heat.", "Specific Latent Heat", "Heat"),
        ],
      },
      {
        kod: '4.4',
        tajuk: "Gas Laws",
        spList: [
          makeEnglishSp("4.4.1", "Explain pressure, temperature and volume of gas in terms of the behaviour of gas molecules based on the Kinetic Theory of Gas.", "Gas Laws", "Heat"),
          makeEnglishSp("4.4.2", "Experiment to determine the relationship between the pressure and volume of a fixed mass of gas at constant temperature.", "Gas Laws", "Heat", true),
          makeEnglishSp("4.4.3", "Experiment to determine the relationship between the volume and temperature of a fixed mass of gas at constant pressure.", "Gas Laws", "Heat", true),
          makeEnglishSp("4.4.4", "Experiment to determine the relationship between the pressure and temperature of a fixed mass of gas at constant volume.", "Gas Laws", "Heat", true),
          makeEnglishSp("4.4.5", "Solve problems involving pressure, temperature and volume for a fixed mass of gas using Gas law formulas.", "Gas Laws", "Heat"),
        ],
      },
    ],
  },
  {
    id: 'F4_B5',
    tingkatan: 'Tingkatan 4',
    nomborBab: 5,
    tema: "WAVES, LIGHT AND OPTICS",
    tajuk: "Waves",
    peneranganRingkas: "Wave fundamentals, damping & resonance, reflection, refraction, diffraction, interference, and electromagnetic waves.",
    skList: [
      {
        kod: '5.1',
        tajuk: "Fundamentals of Waves",
        spList: [
          makeEnglishSp("5.1.1", "Describe waves.", "Fundamentals of Waves", "Waves"),
          makeEnglishSp("5.1.2", "State the types of waves.", "Fundamentals of Waves", "Waves"),
          makeEnglishSp("5.1.3", "Compare transverse waves and longitudinal waves.", "Fundamentals of Waves", "Waves"),
          makeEnglishSp("5.1.4", "Explain the characteristics of waves: (i) Amplitude (a) (ii) Period (T) (iii) Frequency (f) (iv) wavelength (λ) (v) wave speed (v)", "Fundamentals of Waves", "Waves"),
          makeEnglishSp("5.1.5", "Sketch and interpret wave graphs: (i) displacement - time (ii) displacement - distance", "Fundamentals of Waves", "Waves"),
          makeEnglishSp("5.1.6", "Determine wavelength, λ , frequency, f and wave speed, v.", "Fundamentals of Waves", "Waves"),
        ],
      },
      {
        kod: '5.2',
        tajuk: "Damping and Resonance",
        spList: [
          makeEnglishSp("5.2.1", "Describe damping and resonance for an oscillating/ vibrating system", "Damping and Resonance", "Waves"),
          makeEnglishSp("5.2.2", "Justify the effects of resonance in our daily lives.", "Damping and Resonance", "Waves"),
        ],
      },
      {
        kod: '5.3',
        tajuk: "Reflection of Waves",
        spList: [
          makeEnglishSp("5.3.1", "Describe reflection of waves from the following aspects: (i) angle of incidence (i) (ii) angle of reflection (r) (iii) wavelength (λ), (iv) frequency (f), (v) speed (v) (vi) direction of propagation of waves.", "Reflection of Waves", "Waves"),
          makeEnglishSp("5.3.2", "Draw a diagram to show the reflection of plane water waves by through a plane reflector.", "Reflection of Waves", "Waves"),
          makeEnglishSp("5.3.3", "Justify the application of reflection of waves in daily life.", "Reflection of Waves", "Waves"),
          makeEnglishSp("5.3.4", "Solve problems involving reflection of waves.", "Reflection of Waves", "Waves"),
        ],
      },
      {
        kod: '5.4',
        tajuk: "Refraction of Waves",
        spList: [
          makeEnglishSp("5.4.1", "Describe refraction of waves from the following aspects: (i) angle of incidence (i) (ii) angle of refraction (r) (iii) wavelength (λ) (iv) frequency (f) (v) speed (v) (vi) direction of propagation of waves.", "Refraction of Waves", "Waves"),
          makeEnglishSp("5.4.2", "Draw diagrams to show the refraction of waves for two different depths.", "Refraction of Waves", "Waves"),
          makeEnglishSp("5.4.3", "Explain natural phenomena of refraction of waves in daily life.", "Refraction of Waves", "Waves"),
          makeEnglishSp("5.4.4", "Solve problems involving refraction of waves.", "Refraction of Waves", "Waves"),
        ],
      },
      {
        kod: '5.5',
        tajuk: "Diffraction of Waves",
        spList: [
          makeEnglishSp("5.5.1", "Describe diffraction of waves from the following aspects: (i) wavelength (λ) (ii) frequency (f) (iii) speed (v) (iv) direction of propagation of waves", "Diffraction of Waves", "Waves"),
          makeEnglishSp("5.5.2", "Determine factors affecting diffraction of waves.", "Diffraction of Waves", "Waves"),
          makeEnglishSp("5.5.3", "Draw diagrams to show the pattern of diffraction of water waves and the effect of diffraction of light waves.", "Diffraction of Waves", "Waves"),
          makeEnglishSp("5.5.4", "Explain the applications of diffraction of waves in daily life.", "Diffraction of Waves", "Waves"),
        ],
      },
      {
        kod: '5.6',
        tajuk: "Interference of Waves",
        spList: [
          makeEnglishSp("5.6.1", "Explain the principle of superposition of waves.", "Interference of Waves", "Waves"),
          makeEnglishSp("5.6.2", "Describe the pattern of interference for: (i) water waves (ii) sound waves (iii) light waves", "Interference of Waves", "Waves"),
          makeEnglishSp("5.6.3", "Relate , a, x and D for the wave interference pattern.", "Interference of Waves", "Waves"),
          makeEnglishSp("5.6.4", "Solve problems involving interference of waves.", "Interference of Waves", "Waves"),
          makeEnglishSp("5.6.5", "Communicate on the applications of interference of waves in daily life.", "Interference of Waves", "Waves"),
        ],
      },
      {
        kod: '5.7',
        tajuk: "Electromagnetic Waves",
        spList: [
          makeEnglishSp("5.7.1", "Characterise electromagnetic waves", "Electromagnetic Waves", "Waves"),
          makeEnglishSp("5.7.2", "State the components of the electromagnetic spectrum according to wavelengths and frequencies.", "Electromagnetic Waves", "Waves"),
          makeEnglishSp("5.7.3", "Communicate to explain about the applications of each component in the electromagnetic spectrum in daily life.", "Electromagnetic Waves", "Waves"),
        ],
      },
    ],
  },
  {
    id: 'F4_B6',
    tingkatan: 'Tingkatan 4',
    nomborBab: 6,
    tema: "WAVES, LIGHT AND OPTICS",
    tajuk: "Light and Optics",
    peneranganRingkas: "Refraction of light, total internal reflection, thin lenses, optical instruments, and spherical mirrors.",
    skList: [
      {
        kod: '6.1',
        tajuk: "Refraction of Light",
        spList: [
          makeEnglishSp("6.1.1", "Describe refraction of light", "Refraction of Light", "Light and Optics"),
          makeEnglishSp("6.1.2", "Explain refractive index, n.", "Refraction of Light", "Light and Optics"),
          makeEnglishSp("6.1.3", "Conceptualize Snell's Law", "Refraction of Light", "Light and Optics"),
          makeEnglishSp("6.1.4", "Experiment to determine the refractive index, n for glass block or perspex.", "Refraction of Light", "Light and Optics", true),
          makeEnglishSp("6.1.5", "Explain real depth and apparent depth.", "Refraction of Light", "Light and Optics"),
          makeEnglishSp("6.1.6", "Experiment to determine refractive index of a medium using real depth and apparent depth.", "Refraction of Light", "Light and Optics", true),
          makeEnglishSp("6.1.7", "Solve problems related to refraction of light.", "Refraction of Light", "Light and Optics"),
        ],
      },
      {
        kod: '6.2',
        tajuk: "Total Internal Reflection",
        spList: [
          makeEnglishSp("6.2.1", "Describe critical angle and total internal reflection.", "Total Internal Reflection", "Light and Optics"),
          makeEnglishSp("6.2.2", "Relate critical angle with refrative index, n,", "Total Internal Reflection", "Light and Optics"),
          makeEnglishSp("6.2.3", "Communicate to explain natural phenomena and applications of total internal reflection in daily life.", "Total Internal Reflection", "Light and Optics"),
          makeEnglishSp("6.2.4", "Solve problems involving total internal reflection.", "Total Internal Reflection", "Light and Optics"),
        ],
      },
      {
        kod: '6.3',
        tajuk: "Image Formation by Lenses",
        spList: [
          makeEnglishSp("6.3.1", "Identify convex lenses as converging lenses and concave lenses as diverging lenses", "Image Formation by Lenses", "Light and Optics"),
          makeEnglishSp("6.3.2", "Estimate focal length for a convex lens using distant object.", "Image Formation by Lenses", "Light and Optics"),
          makeEnglishSp("6.3.3", "Determine the position and features of images formed by : (i) convex lens (ii) concave lens", "Image Formation by Lenses", "Light and Optics"),
          makeEnglishSp("6.3.4", "Explain linear magnification, m as:", "Image Formation by Lenses", "Light and Optics"),
        ],
      },
      {
        kod: '6.4',
        tajuk: "Thin Lens Formula",
        spList: [
          makeEnglishSp("6.4.1", "Experiment to: (i) Investigate the relationship between object distance, u and image distance, v for a convex lens. (ii) Determine the focal length of a thin lens using lens formula:", "Thin Lens Formula", "Light and Optics", true),
          makeEnglishSp("6.4.2", "Solve problems using lens formula for convex and concave lens.", "Thin Lens Formula", "Light and Optics"),
        ],
      },
      {
        kod: '6.5',
        tajuk: "Optical Instruments",
        spList: [
          makeEnglishSp("6.5.1", "Justify the usage of lenses in optical instruments such as magnifying lens, telescope and microscope.", "Optical Instruments", "Light and Optics"),
          makeEnglishSp("6.5.2", "Design and build a compound microscope and astronomical telescope.", "Optical Instruments", "Light and Optics"),
          makeEnglishSp("6.5.3", "Communicate application of small lenses in optical instrument technology.", "Optical Instruments", "Light and Optics"),
        ],
      },
      {
        kod: '6.6',
        tajuk: "Image Formation by Spherical Mirrors",
        spList: [
          makeEnglishSp("6.6.1", "Determine position and features of image formed by: (i) concave mirror (ii) convex mirror", "Image Formation by Spherical Mirrors", "Light and Optics"),
          makeEnglishSp("6.6.2", "Explain the applications of concave and convex mirrors in life.", "Image Formation by Spherical Mirrors", "Light and Optics"),
        ],
      },
    ],
  },
  {
    id: 'F5_B1',
    tingkatan: 'Tingkatan 5',
    nomborBab: 1,
    tema: "NEWTONIAN MECHANICS",
    tajuk: "Force and Motion II",
    peneranganRingkas: "Resultant force, resolution of forces, forces in equilibrium, and elasticity.",
    skList: [
      {
        kod: '1.1',
        tajuk: "Resultant Force",
        spList: [
          makeEnglishSp("1.1.1", "Describe resultant force", "Resultant Force", "Force and Motion II"),
          makeEnglishSp("1.1.2", "Determine the resultant force", "Resultant Force", "Force and Motion II"),
          makeEnglishSp("1.1.3", "Communicate about resultant force, F when an object is : (i) stationary, F = 0 N (ii) moving with constant velocity, F = 0 N (iii) moving with constant acceleration, F ≠ 0 N", "Resultant Force", "Force and Motion II"),
          makeEnglishSp("1.1.4", "Solve problems involving resultant force, mass and acceleration of an object", "Resultant Force", "Force and Motion II"),
        ],
      },
      {
        kod: '1.2',
        tajuk: "Resolution of Forces",
        spList: [
          makeEnglishSp("1.2.1", "Describe resolution of forces", "Resolution of Forces", "Force and Motion II"),
          makeEnglishSp("1.2.2", "Solve problems involving resultant force and resolution of forces", "Resolution of Forces", "Force and Motion II"),
        ],
      },
      {
        kod: '1.3',
        tajuk: "Forces in Equilibrium",
        spList: [
          makeEnglishSp("1.3.1", "Explain forces in equilibrium", "Forces in Equilibrium", "Force and Motion II"),
          makeEnglishSp("1.3.2", "Sketch a triangle of forces in equilibrium", "Forces in Equilibrium", "Force and Motion II"),
          makeEnglishSp("1.3.3", "Solve problems involving forces in equilibrium", "Forces in Equilibrium", "Force and Motion II"),
        ],
      },
      {
        kod: '1.4',
        tajuk: "Elasticity",
        spList: [
          makeEnglishSp("1.4.1", "Describe elasticity", "Elasticity", "Force and Motion II"),
          makeEnglishSp("1.4.2", "Experiment to investigate the relationship between force, F and extension of spring, x", "Elasticity", "Force and Motion II", true),
          makeEnglishSp("1.4.3", "Communicate about the law related to force, F and extension of spring, x", "Elasticity", "Force and Motion II"),
          makeEnglishSp("1.4.4", "Solve problems involving force and extension of spring", "Elasticity", "Force and Motion II"),
        ],
      },
    ],
  },
  {
    id: 'F5_B2',
    tingkatan: 'Tingkatan 5',
    nomborBab: 2,
    tema: "NEWTONIAN MECHANICS",
    tajuk: "Pressure",
    peneranganRingkas: "Liquid pressure, atmospheric pressure, gas pressure, Pascal, Archimedes and Bernoulli principles.",
    skList: [
      {
        kod: '2.1',
        tajuk: "Pressure in Liquids",
        spList: [
          makeEnglishSp("2.1.1", "Communicate about the concept of pressure in liquids P = hg", "Pressure in Liquids", "Pressure"),
          makeEnglishSp("2.1.2", "Experiment to investigate factors affecting pressure in liquids", "Pressure in Liquids", "Pressure", true),
          makeEnglishSp("2.1.3", "Solve problems involving pressure in liquids", "Pressure in Liquids", "Pressure"),
          makeEnglishSp("2.1.4", "Communicate about applications of pressure in liquids in daily life", "Pressure in Liquids", "Pressure"),
        ],
      },
      {
        kod: '2.2',
        tajuk: "Atmospheric Pressure",
        spList: [
          makeEnglishSp("2.2.1", "Describe atmospheric pressure", "Atmospheric Pressure", "Pressure"),
          makeEnglishSp("2.2.2", "Communicate about the value of atmospheric pressure", "Atmospheric Pressure", "Pressure"),
          makeEnglishSp("2.2.3", "Solve problems in daily life involving various pressure units", "Atmospheric Pressure", "Pressure"),
          makeEnglishSp("2.2.4", "Describe the effects of atmospheric pressure on objects at high altitude and underwater", "Atmospheric Pressure", "Pressure"),
        ],
      },
      {
        kod: '2.3',
        tajuk: "Gas Pressure",
        spList: [
          makeEnglishSp("2.3.1", "Determine gas pressure using a manometer", "Gas Pressure", "Pressure", true),
          makeEnglishSp("2.3.2", "Solve problems involving gas pressure in daily life", "Gas Pressure", "Pressure", true),
        ],
      },
      {
        kod: '2.4',
        tajuk: "Pascal's Principle",
        spList: [
          makeEnglishSp("2.4.1", "Describe the principle of pressure transmission in an enclosed fluid", "Pascal's Principle", "Pressure"),
          makeEnglishSp("2.4.2", "Communicate about hydraulic system as a force multiplier", "Pascal's Principle", "Pressure", true),
          makeEnglishSp("2.4.3", "Communicate about applications of Pascal’s principle", "Pascal's Principle", "Pressure"),
          makeEnglishSp("2.4.4", "Solve problems involving Pascal’s principle in daily life", "Pascal's Principle", "Pressure"),
        ],
      },
      {
        kod: '2.5',
        tajuk: "Archimedes' Principle",
        spList: [
          makeEnglishSp("2.5.1", "Describe the relationship between buoyant force and the difference in liquid pressure at different depths for a submerged object", "Archimedes' Principle", "Pressure"),
          makeEnglishSp("2.5.2", "Relate the balance of forces with the state of floatation of an object in a fluid", "Archimedes' Principle", "Pressure"),
          makeEnglishSp("2.5.3", "Communicate about applications of Archimedes’ principle in daily life", "Archimedes' Principle", "Pressure"),
          makeEnglishSp("2.5.4", "Solve problems involving Archimedes’ principle and buoyancy", "Archimedes' Principle", "Pressure"),
        ],
      },
      {
        kod: '2.6',
        tajuk: "Bernoulli's Principle",
        spList: [
          makeEnglishSp("2.6.1", "Describe the effect of fluid velocity on pressure", "Bernoulli's Principle", "Pressure"),
          makeEnglishSp("2.6.2", "Explain lift as a result of the difference in pressure due to different velocity of fluids", "Bernoulli's Principle", "Pressure"),
          makeEnglishSp("2.6.3", "Communicate about applications of Bernoulli’s principle in daily life", "Bernoulli's Principle", "Pressure"),
        ],
      },
    ],
  },
  {
    id: 'F5_B3',
    tingkatan: 'Tingkatan 5',
    nomborBab: 3,
    tema: "ELECTRICITY AND ELECTROMAGNETISM",
    tajuk: "Electricity",
    peneranganRingkas: "Current and potential difference, resistance, electromotive force (e.m.f.), and electrical power.",
    skList: [
      {
        kod: '3.1',
        tajuk: "Current and Potential Difference",
        spList: [
          makeEnglishSp("3.1.1", "Explain electric field", "Current and Potential Difference", "Electricity"),
          makeEnglishSp("3.1.2", "Define strength of electric field, E", "Current and Potential Difference", "Electricity"),
          makeEnglishSp("3.1.3", "Explain behaviour of charged particles in an electric field", "Current and Potential Difference", "Electricity"),
          makeEnglishSp("3.1.4", "Define electric current", "Current and Potential Difference", "Electricity"),
          makeEnglishSp("3.1.5", "Define potential difference, V", "Current and Potential Difference", "Electricity"),
        ],
      },
      {
        kod: '3.2',
        tajuk: "Resistance",
        spList: [
          makeEnglishSp("3.2.1", "Compare and contrast ohmic and non-ohmic conductor", "Resistance", "Electricity", true),
          makeEnglishSp("3.2.2", "Solve problems involving combination of series and parallel circuits", "Resistance", "Electricity"),
          makeEnglishSp("3.2.3", "Define resistivity of wire, ", "Resistance", "Electricity"),
          makeEnglishSp("3.2.4", "Describe factors that affect resistance of a wire through experiments to conclude AR ρ", "Resistance", "Electricity", true),
          makeEnglishSp("3.2.5", "Communicate about applications of resistivity of wire in daily life", "Resistance", "Electricity"),
          makeEnglishSp("3.2.6", "Solve problems involving the formula of wire resistance, AR ρ", "Resistance", "Electricity"),
        ],
      },
      {
        kod: '3.3',
        tajuk: "Electromotive Force (e.m.f.) and Internal Resistance",
        spList: [
          makeEnglishSp("3.3.1", "Define electromotive force, Ɛ", "Electromotive Force (e.m.f.) and Internal Resistance", "Electricity"),
          makeEnglishSp("3.3.2", "Explain internal resistance, r", "Electromotive Force (e.m.f.) and Internal Resistance", "Electricity"),
          makeEnglishSp("3.3.3", "Conduct an experiment to determine e.m.f and internal resistance in a dry cell", "Electromotive Force (e.m.f.) and Internal Resistance", "Electricity", true),
          makeEnglishSp("3.3.4", "Solve problems involving e.m.f and internal resistance in a dry cell", "Electromotive Force (e.m.f.) and Internal Resistance", "Electricity"),
        ],
      },
      {
        kod: '3.4',
        tajuk: "Electrical Energy and Power",
        spList: [
          makeEnglishSp("3.4.1", "Formulate relationship between electrical energy (E), voltage (V), current (I) and time (t)", "Electrical Energy and Power", "Electricity"),
          makeEnglishSp("3.4.2", "Formulate relationship between power (P), voltage (V), and current (I)", "Electrical Energy and Power", "Electricity"),
          makeEnglishSp("3.4.3", "Solve problems involving electrical energy and power in daily life", "Electrical Energy and Power", "Electricity"),
          makeEnglishSp("3.4.4", "Compare power and rate of energy consumptions in various electrical appliances", "Electrical Energy and Power", "Electricity"),
          makeEnglishSp("3.4.5", "Suggest ways to save usage of electrical energy in household ELECTRICITY", "Electrical Energy and Power", "Electricity"),
        ],
      },
    ],
  },
  {
    id: 'F5_B4',
    tingkatan: 'Tingkatan 5',
    nomborBab: 4,
    tema: "ELECTRICITY AND ELECTROMAGNETISM",
    tajuk: "Electromagnetism",
    peneranganRingkas: "Force on current-carrying conductor, electromagnetic induction, and transformers.",
    skList: [
      {
        kod: '4.1',
        tajuk: "Force on a Current-carrying Conductor in a Magnetic Field",
        spList: [
          makeEnglishSp("4.1.1", "Describe the effect of a current-carrying conductor in a magnetic field", "Force on a Current-carrying Conductor in a Magnetic Field", "Electromagnetism", true),
          makeEnglishSp("4.1.2", "Draw the pattern of the combined magnetic field (catapult field) to indicate the direction of force on a current-carrying conductor in a magnetic field", "Force on a Current-carrying Conductor in a Magnetic Field", "Electromagnetism"),
          makeEnglishSp("4.1.3", "Explain factors that affect the magnitude of force on a current-carrying conductor in a magnetic field", "Force on a Current-carrying Conductor in a Magnetic Field", "Electromagnetism", true),
          makeEnglishSp("4.1.4", "Describe the effect of a current-carrying coil in a magnetic field", "Force on a Current-carrying Conductor in a Magnetic Field", "Electromagnetism"),
          makeEnglishSp("4.1.5", "Describe the working principle of a direct current motor", "Force on a Current-carrying Conductor in a Magnetic Field", "Electromagnetism"),
          makeEnglishSp("4.1.6", "Describe factors that affect the speed of rotation in an electric motor", "Force on a Current-carrying Conductor in a Magnetic Field", "Electromagnetism"),
        ],
      },
      {
        kod: '4.2',
        tajuk: "Electromagnetic Induction",
        spList: [
          makeEnglishSp("4.2.1", "Describe electromagnetic induction in : (i) straight wire (ii) solenoid", "Electromagnetic Induction", "Electromagnetism"),
          makeEnglishSp("4.2.2", "Explain factors that affect magnitude of induced emf", "Electromagnetic Induction", "Electromagnetism"),
          makeEnglishSp("4.2.3", "Determine the direction of induced current in : (i) straight wire (ii) solenoid", "Electromagnetic Induction", "Electromagnetism", true),
          makeEnglishSp("4.2.4", "Design a direct current and alternating current generator", "Electromagnetic Induction", "Electromagnetism"),
        ],
      },
      {
        kod: '4.3',
        tajuk: "Transformer",
        spList: [
          makeEnglishSp("4.3.1", "Describe the working principle of a simple transformer", "Transformer", "Electromagnetism"),
          makeEnglishSp("4.3.2", "Describe an ideal transformer", "Transformer", "Electromagnetism"),
          makeEnglishSp("4.3.3", "Describe energy loss and ways to increase the efficiency of a transformer", "Transformer", "Electromagnetism", true),
          makeEnglishSp("4.3.4", "Communicate about the use of transformers in daily life Gather information on the use of transformers in daily life in:  electrical appliances  transmission and distribution of electrical energy ELECTROMAGNETISM", "Transformer", "Electromagnetism"),
        ],
      },
    ],
  },
  {
    id: 'F5_B5',
    tingkatan: 'Tingkatan 5',
    nomborBab: 5,
    tema: "APPLIED PHYSICS",
    tajuk: "Electronics",
    peneranganRingkas: "Thermionic emission, cathode rays, semiconductor diodes, rectification, and transistors.",
    skList: [
      {
        kod: '5.1',
        tajuk: "Electron",
        spList: [
          makeEnglishSp("5.1.1", "Describe thermionic emission and cathode rays", "Electron", "Electronics"),
          makeEnglishSp("5.1.2", "Describe effects of electric and magnetic fields on cathode rays", "Electron", "Electronics"),
          makeEnglishSp("5.1.3", "Determine velocity of an electron in cathode ray tube", "Electron", "Electronics"),
        ],
      },
      {
        kod: '5.2',
        tajuk: "Semiconductor Diode",
        spList: [
          makeEnglishSp("5.2.1", "Describe the function of semiconductor diode", "Semiconductor Diode", "Electronics"),
          makeEnglishSp("5.2.2", "Communicate about the function of semiconductor diode and capacitor as a rectifier", "Semiconductor Diode", "Electronics"),
        ],
      },
      {
        kod: '5.3',
        tajuk: "Transistor",
        spList: [
          makeEnglishSp("5.3.1", "Explain the function and use of a transistor as a current amplifier", "Transistor", "Electronics"),
          makeEnglishSp("5.3.2", "Describe circuits that consist of a transistor as an automatic switch", "Transistor", "Electronics"),
        ],
      },
    ],
  },
  {
    id: 'F5_B6',
    tingkatan: 'Tingkatan 5',
    nomborBab: 6,
    tema: "MODERN PHYSICS",
    tajuk: "Nuclear Physics",
    peneranganRingkas: "Radioactive decay, half-life, and nuclear energy generation.",
    skList: [
      {
        kod: '6.1',
        tajuk: "Radioactive Decay",
        spList: [
          makeEnglishSp("6.1.1", "Explain with examples decay equations: (i) α decay (ii) β decay (iii) γ decay", "Radioactive Decay", "Nuclear Physics"),
          makeEnglishSp("6.1.2", "Explain half-life through examples", "Radioactive Decay", "Nuclear Physics"),
          makeEnglishSp("6.1.3", "Determine half-life of radioactive sources from decay curve", "Radioactive Decay", "Nuclear Physics"),
          makeEnglishSp("6.1.4", "Solve problems involving half-life in daily life", "Radioactive Decay", "Nuclear Physics", true),
        ],
      },
      {
        kod: '6.2',
        tajuk: "Nuclear Energy",
        spList: [
          makeEnglishSp("6.2.1", "Communicate about nuclear reactions: (i) nuclear fission (ii) nuclear fusion", "Nuclear Energy", "Nuclear Physics"),
          makeEnglishSp("6.2.2", "Describe relationship between energy released during nuclear reaction and mass defect: E = mc2", "Nuclear Energy", "Nuclear Physics"),
          makeEnglishSp("6.2.3", "Solve problems involving nuclear energy due to radioactive decay and nuclear reactions", "Nuclear Energy", "Nuclear Physics"),
          makeEnglishSp("6.2.4", "Describe generation of electrical energy in nuclear reactor", "Nuclear Energy", "Nuclear Physics"),
          makeEnglishSp("6.2.5", "Justify the use of nuclear energy as an alternative energy to generate electrical energy", "Nuclear Energy", "Nuclear Physics"),
        ],
      },
    ],
  },
  {
    id: 'F5_B7',
    tingkatan: 'Tingkatan 5',
    nomborBab: 7,
    tema: "MODERN PHYSICS",
    tajuk: "Quantum Physics",
    peneranganRingkas: "Quantum theory of light, photon concept, photoelectric effect, and Einstein equation.",
    skList: [
      {
        kod: '7.1',
        tajuk: "Quantum Theory of Light",
        spList: [
          makeEnglishSp("7.1.1", "Explain the initiation of the quantum theory", "Quantum Theory of Light", "Quantum Physics"),
          makeEnglishSp("7.1.2", "Describe quantum of energy", "Quantum Theory of Light", "Quantum Physics"),
          makeEnglishSp("7.1.3", "Explain wave-particle duality", "Quantum Theory of Light", "Quantum Physics"),
          makeEnglishSp("7.1.4", "Explain concept of photon", "Quantum Theory of Light", "Quantum Physics"),
          makeEnglishSp("7.1.5", "Solve problems using : (i) photon energy, E=hf (ii) power, P=nhf ; n is number of photon emitted per second.", "Quantum Theory of Light", "Quantum Physics"),
        ],
      },
      {
        kod: '7.2',
        tajuk: "Photoelectric Effect",
        spList: [
          makeEnglishSp("7.2.1", "Explain photoelectric effect", "Photoelectric Effect", "Quantum Physics"),
          makeEnglishSp("7.2.2", "Identify four characteristics of photoelectric effect that cannot be explained using wave theory", "Photoelectric Effect", "Quantum Physics"),
        ],
      },
      {
        kod: '7.3',
        tajuk: "Einstein's Photoelectric Theory",
        spList: [
          makeEnglishSp("7.3.1", "State minimum work function needed by a metal to emit an electron using Einstein’s equation", "Einstein's Photoelectric Theory", "Quantum Physics"),
          makeEnglishSp("7.3.2", "Explain threshold frequency, fo and work function, W", "Einstein's Photoelectric Theory", "Quantum Physics"),
          makeEnglishSp("7.3.3", "Determine work function of metal, W=hfo", "Einstein's Photoelectric Theory", "Quantum Physics"),
          makeEnglishSp("7.3.4", "Solve problems involving Einstein’s equation for photoelectric effect. 2mv21Whf  ", "Einstein's Photoelectric Theory", "Quantum Physics"),
          makeEnglishSp("7.3.5", "Explain production of photoelectric current in a photocell circuit", "Einstein's Photoelectric Theory", "Quantum Physics"),
          makeEnglishSp("7.3.6", "Describe applications of photoelectric effect", "Einstein's Photoelectric Theory", "Quantum Physics"),
        ],
      },
    ],
  },
];
