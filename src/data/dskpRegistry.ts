import { BabKimia, BahasaRPH, SubjekRPH, Tingkatan } from '../types/rph';
import { SubjectKey } from '../config/subjects';

// Kimia DSKP
import { DSKP_F4 as DSKP_KIMIA_F4 } from './dskp/kimia/tingkatan4';
import { DSKP_F5 as DSKP_KIMIA_F5 } from './dskp/kimia/tingkatan5';
import { DSKP_KIMIA_DLP } from './dskp/kimia/englishDskp';
import {
  SPECIAL_PROGRAMMES_BM as SPECIAL_KIMIA_BM,
  SPECIAL_PROGRAMMES_DLP as SPECIAL_KIMIA_DLP,
  SPECIAL_PROGRAMMES_SAINS_BM,
  SPECIAL_PROGRAMMES_SAINS_DLP,
} from './dskp/kimia/specialProgrammes';

// Biologi DSKP
import { DSKP_F4 as DSKP_BIO_F4 } from './dskp/biologi/tingkatan4';
import { DSKP_F5 as DSKP_BIO_F5 } from './dskp/biologi/tingkatan5';
import { DSKP_BIOLOGI_DLP } from './dskp/biologi/englishDskp';

// Fizik DSKP
import { DSKP_F4 as DSKP_FIZIK_F4 } from './dskp/fizik/tingkatan4';
import { DSKP_F5 as DSKP_FIZIK_F5 } from './dskp/fizik/tingkatan5';
import { DSKP_FIZIK_DLP } from './dskp/fizik/englishDskp';

// Sains DSKP
import { DSKP_SAINS_F2, DSKP_SAINS_F3 } from './dskp/kimia/sainsTingkatan2_3';
import { DSKP_SAINS_F4, DSKP_SAINS_F5 } from './dskp/kimia/sainsTingkatan4_5';
import {
  DSKP_SAINS_F2_DLP,
  DSKP_SAINS_F3_DLP,
  DSKP_SAINS_F4_DLP,
  DSKP_SAINS_F5_DLP,
} from './dskp/kimia/sainsDlp';

// Matematik DSKP
import { DSKP_MATEMATIK_F2 } from './dskp/matematik/tingkatan2';
import { DSKP_MATEMATIK_F3 } from './dskp/matematik/tingkatan3';
import { DSKP_MATEMATIK_F4 } from './dskp/matematik/tingkatan4';
import { DSKP_MATEMATIK_F5 } from './dskp/matematik/tingkatan5';
import { DSKP_MATEMATIK_DLP } from './dskp/matematik/englishDskp';
import {
  SPECIAL_PROGRAMMES_MATEMATIK_BM,
  SPECIAL_PROGRAMMES_MATEMATIK_DLP,
} from './dskp/matematik/specialProgrammes';

// Matematik Tambahan DSKP
import { DSKP_ADDMATH_F4 } from './dskp/matematikTambahan/tingkatan4';
import { DSKP_ADDMATH_F5 } from './dskp/matematikTambahan/tingkatan5';
import { DSKP_ADDMATH_DLP } from './dskp/matematikTambahan/englishDskp';
import {
  SPECIAL_PROGRAMMES_ADDMATH_BM,
  SPECIAL_PROGRAMMES_ADDMATH_DLP,
} from './dskp/matematikTambahan/specialProgrammes';

// Kimia sets
export const DSKP_KIMIA: BabKimia[] = [
  ...SPECIAL_KIMIA_BM,
  ...DSKP_KIMIA_F4,
  ...DSKP_KIMIA_F5,
];

export const DSKP_KIMIA_DLP_FULL: BabKimia[] = [
  ...SPECIAL_KIMIA_DLP,
  ...DSKP_KIMIA_DLP,
];

// Biologi sets
export const DSKP_BIOLOGI: BabKimia[] = [
  ...SPECIAL_KIMIA_BM,
  ...DSKP_BIO_F4,
  ...DSKP_BIO_F5,
];

export const DSKP_BIOLOGI_DLP_FULL: BabKimia[] = [
  ...SPECIAL_KIMIA_DLP,
  ...DSKP_BIOLOGI_DLP,
];

// Fizik sets
export const DSKP_FIZIK: BabKimia[] = [
  ...SPECIAL_KIMIA_BM,
  ...DSKP_FIZIK_F4,
  ...DSKP_FIZIK_F5,
];

export const DSKP_FIZIK_DLP_FULL: BabKimia[] = [
  ...SPECIAL_KIMIA_DLP,
  ...DSKP_FIZIK_DLP,
];

// Sains sets
export const DSKP_SAINS: BabKimia[] = [
  ...SPECIAL_PROGRAMMES_SAINS_BM,
  ...DSKP_SAINS_F2,
  ...DSKP_SAINS_F3,
  ...DSKP_SAINS_F4,
  ...DSKP_SAINS_F5,
];

export const DSKP_SAINS_DLP_FULL: BabKimia[] = [
  ...SPECIAL_PROGRAMMES_SAINS_DLP,
  ...DSKP_SAINS_F2_DLP,
  ...DSKP_SAINS_F3_DLP,
  ...DSKP_SAINS_F4_DLP,
  ...DSKP_SAINS_F5_DLP,
];

// Matematik sets
export const DSKP_MATEMATIK: BabKimia[] = [
  ...SPECIAL_PROGRAMMES_MATEMATIK_BM,
  ...DSKP_MATEMATIK_F2,
  ...DSKP_MATEMATIK_F3,
  ...DSKP_MATEMATIK_F4,
  ...DSKP_MATEMATIK_F5,
];

export const DSKP_MATEMATIK_DLP_FULL: BabKimia[] = [
  ...SPECIAL_PROGRAMMES_MATEMATIK_DLP,
  ...DSKP_MATEMATIK_DLP,
];

// Matematik Tambahan sets
export const DSKP_ADDMATH: BabKimia[] = [
  ...SPECIAL_PROGRAMMES_ADDMATH_BM,
  ...DSKP_ADDMATH_F4,
  ...DSKP_ADDMATH_F5,
];

export const DSKP_ADDMATH_DLP_FULL: BabKimia[] = [
  ...SPECIAL_PROGRAMMES_ADDMATH_DLP,
  ...DSKP_ADDMATH_DLP,
];

export function getDskpBySubjectAndBahasa(
  subjectKey: SubjectKey,
  bahasa?: BahasaRPH,
  subjekVariant: SubjekRPH = 'Kimia'
): BabKimia[] {
  if (subjectKey === 'biologi' || subjekVariant === 'Biologi') {
    return bahasa === 'DLP' ? DSKP_BIOLOGI_DLP_FULL : DSKP_BIOLOGI;
  }
  if (subjectKey === 'fizik' || subjekVariant === 'Fizik') {
    return bahasa === 'DLP' ? DSKP_FIZIK_DLP_FULL : DSKP_FIZIK;
  }
  if (subjectKey === 'matematik' || subjekVariant === 'Matematik') {
    return bahasa === 'DLP' ? DSKP_MATEMATIK_DLP_FULL : DSKP_MATEMATIK;
  }
  if (
    subjectKey === 'matematik-tambahan' ||
    subjekVariant === 'Matematik Tambahan'
  ) {
    return bahasa === 'DLP' ? DSKP_ADDMATH_DLP_FULL : DSKP_ADDMATH;
  }
  if (subjectKey === 'sains' || subjekVariant === 'Sains') {
    return bahasa === 'DLP' ? DSKP_SAINS_DLP_FULL : DSKP_SAINS;
  }
  return bahasa === 'DLP' ? DSKP_KIMIA_DLP_FULL : DSKP_KIMIA;
}

export function getTingkatanListForSubject(
  subjectKey: SubjectKey,
  subjekVariant?: SubjekRPH
): Tingkatan[] {
  if (
    subjectKey === 'sains' ||
    subjekVariant === 'Sains' ||
    subjectKey === 'matematik' ||
    subjekVariant === 'Matematik'
  ) {
    return ['Tingkatan 2', 'Tingkatan 3', 'Tingkatan 4', 'Tingkatan 5'];
  }
  return ['Tingkatan 4', 'Tingkatan 5'];
}
