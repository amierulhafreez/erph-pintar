import { BabKimia, BahasaRPH, SubjekRPH, Tingkatan } from '../types/rph';
import {
  DSKP_KIMIA,
  DSKP_KIMIA_DLP_FULL,
  DSKP_BIOLOGI,
  DSKP_BIOLOGI_DLP_FULL,
  DSKP_FIZIK,
  DSKP_FIZIK_DLP_FULL,
  DSKP_SAINS,
  DSKP_SAINS_DLP_FULL,
  DSKP_MATEMATIK,
  DSKP_MATEMATIK_DLP_FULL,
  DSKP_ADDMATH,
  DSKP_ADDMATH_DLP_FULL,
} from './dskpRegistry';

export {
  DSKP_KIMIA,
  DSKP_KIMIA_DLP_FULL,
  DSKP_BIOLOGI,
  DSKP_BIOLOGI_DLP_FULL,
  DSKP_FIZIK,
  DSKP_FIZIK_DLP_FULL,
  DSKP_SAINS,
  DSKP_SAINS_DLP_FULL,
  DSKP_MATEMATIK,
  DSKP_MATEMATIK_DLP_FULL,
  DSKP_ADDMATH,
  DSKP_ADDMATH_DLP_FULL,
};

export function getDskpByBahasa(
  bahasa?: BahasaRPH,
  subjek: SubjekRPH = 'Kimia'
): BabKimia[] {
  if (subjek === 'Biologi') {
    return bahasa === 'DLP' ? DSKP_BIOLOGI_DLP_FULL : DSKP_BIOLOGI;
  }
  if (subjek === 'Fizik') {
    return bahasa === 'DLP' ? DSKP_FIZIK_DLP_FULL : DSKP_FIZIK;
  }
  if (subjek === 'Matematik') {
    return bahasa === 'DLP' ? DSKP_MATEMATIK_DLP_FULL : DSKP_MATEMATIK;
  }
  if (subjek === 'Matematik Tambahan') {
    return bahasa === 'DLP' ? DSKP_ADDMATH_DLP_FULL : DSKP_ADDMATH;
  }
  if (subjek === 'Sains') {
    return bahasa === 'DLP' ? DSKP_SAINS_DLP_FULL : DSKP_SAINS;
  }
  return bahasa === 'DLP' ? DSKP_KIMIA_DLP_FULL : DSKP_KIMIA;
}

export function getTingkatanListBySubjek(
  subjek: SubjekRPH = 'Kimia'
): Tingkatan[] {
  if (subjek === 'Sains' || subjek === 'Matematik') {
    return ['Tingkatan 2', 'Tingkatan 3', 'Tingkatan 4', 'Tingkatan 5'];
  }
  return ['Tingkatan 4', 'Tingkatan 5'];
}


