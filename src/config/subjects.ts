export type SubjectKey = 'kimia' | 'biologi' | 'fizik' | 'sains' | 'matematik' | 'matematik-tambahan';

export interface SubjectConfig {
  key: SubjectKey;
  codePrefix: string; // e.g. KIMIA, BIO, FIZIK
  name: string; // e.g. Kimia KSSM
  shortName: string; // Kimia
  formsLabel: string; // T4–T5
  badge: string; // Kimia T4–T5
  tagline: string;
  themeColor: 'emerald' | 'pink' | 'cyan' | 'teal' | 'indigo' | 'amber' | 'charcoal';
  accentClass: string;
  heroGradient: string;
  btnClass: string;
  isReady: boolean;
  dskpId: 'kimia' | 'biologi' | 'fizik' | 'sains' | 'matematik' | 'matematik-tambahan';
}

export const SUBJECTS: Record<SubjectKey, SubjectConfig> = {
  kimia: {
    key: 'kimia',
    codePrefix: 'KIMIA',
    name: 'Kimia KSSM',
    shortName: 'Kimia',
    formsLabel: 'Tingkatan 4 & 5',
    badge: 'Kimia T4–T5',
    tagline: 'Penyedia RPH Kimia (T4–T5) Terpantas Mengikut DSKP Rasmi, Pedagogi HIKMAH',
    themeColor: 'emerald',
    accentClass: 'emerald',
    heroGradient: 'from-emerald-700 via-teal-700 to-emerald-600',
    btnClass: 'apple-btn-emerald',
    isReady: true,
    dskpId: 'kimia',
  },
  biologi: {
    key: 'biologi',
    codePrefix: 'BIO',
    name: 'Biologi KSSM',
    shortName: 'Biologi',
    formsLabel: 'Tingkatan 4 & 5',
    badge: 'Biologi T4–T5',
    tagline: 'Penyedia RPH Biologi (T4–T5) Terpantas Mengikut DSKP Rasmi, Pedagogi HIKMAH',
    themeColor: 'pink',
    accentClass: 'pink',
    heroGradient: 'from-[#ab4f6c] via-[#b85b79] to-[#993f5b]',
    btnClass: 'apple-btn-pink',
    isReady: true,
    dskpId: 'biologi',
  },
  fizik: {
    key: 'fizik',
    codePrefix: 'FIZIK',
    name: 'Fizik KSSM',
    shortName: 'Fizik',
    formsLabel: 'Tingkatan 4 & 5',
    badge: 'Fizik T4–T5',
    tagline: 'Penyedia RPH Fizik (T4–T5) Terpantas Mengikut DSKP Rasmi, Pedagogi HIKMAH',
    themeColor: 'amber',
    accentClass: 'amber',
    heroGradient: 'from-[#ab5e19] via-[#ba6d23] to-[#994f11]',
    btnClass: 'apple-btn-amber',
    isReady: true,
    dskpId: 'fizik',
  },
  sains: {
    key: 'sains',
    codePrefix: 'SAINS',
    name: 'Sains KSSM',
    shortName: 'Sains',
    formsLabel: 'Tingkatan 2 – 5',
    badge: 'Sains T2–T5',
    tagline: 'Penyedia RPH Sains (T2–T5) Terpantas Mengikut DSKP Rasmi, Pedagogi HIKMAH',
    themeColor: 'cyan',
    accentClass: 'cyan',
    heroGradient: 'from-sky-700 via-cyan-700 to-sky-600',
    btnClass: 'apple-btn-icy',
    isReady: true,
    dskpId: 'sains',
  },
  matematik: {
    key: 'matematik',
    codePrefix: 'MATH',
    name: 'Matematik KSSM',
    shortName: 'Matematik',
    formsLabel: 'Tingkatan 2 – 5',
    badge: 'Matematik T2–T5',
    tagline: 'Penyedia RPH Matematik (T2–T5) Terpantas Mengikut DSKP Rasmi, Pedagogi HIKMAH',
    themeColor: 'indigo',
    accentClass: 'indigo',
    heroGradient: 'from-[#312e81] via-[#3730a3] to-[#4338ca]',
    btnClass: 'apple-btn-indigo',
    isReady: true,
    dskpId: 'matematik',
  },
  'matematik-tambahan': {
    key: 'matematik-tambahan',
    codePrefix: 'ADDMATH',
    name: 'Matematik Tambahan KSSM',
    shortName: 'Matematik Tambahan',
    formsLabel: 'Tingkatan 4 & 5',
    badge: 'AddMaths T4–T5',
    tagline: 'Penyedia RPH Matematik Tambahan SPM Terpantas Mengikut DSKP Rasmi, Pedagogi HIKMAH',
    themeColor: 'charcoal',
    accentClass: 'slate',
    heroGradient: 'from-[#1e293b] via-[#334155] to-[#0f172a]',
    btnClass: 'apple-btn-charcoal',
    isReady: true,
    dskpId: 'matematik-tambahan',
  },
};

export function getSubjectConfig(pathOrKey?: string): SubjectConfig {
  const clean = (pathOrKey || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (clean === 'maths' || clean === 'matematik') return SUBJECTS.matematik;
  if (clean === 'addmaths' || clean === 'addmath' || clean === 'matematik-tambahan') return SUBJECTS['matematik-tambahan'];
  if (clean === 'biology' || clean === 'bio') return SUBJECTS.biologi;
  if (clean === 'physics') return SUBJECTS.fizik;
  if (clean === 'science') return SUBJECTS.sains;
  if (clean === 'chemistry') return SUBJECTS.kimia;

  if (clean in SUBJECTS) {
    return SUBJECTS[clean as SubjectKey];
  }
  // Default to kimia
  return SUBJECTS.kimia;
}
