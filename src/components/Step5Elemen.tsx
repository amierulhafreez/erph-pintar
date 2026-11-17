import React from 'react';
import { RPHData, ElemenAktifRPH } from '../types/rph';
import {
  SENARAI_PAK21,
  SENARAI_PAK21_DLP,
  SENARAI_KBAT,
  SENARAI_KBAT_DLP,
  SENARAI_KPS,
  SENARAI_KPS_DLP,
  SENARAI_BBM,
  SENARAI_BBM_DLP,
  SENARAI_EMK,
  SENARAI_EMK_DLP,
  SENARAI_NILAI_MURNI,
  SENARAI_NILAI_MURNI_DLP,
  SENARAI_PENTAKSIRAN,
  SENARAI_PENTAKSIRAN_DLP,
  SENARAI_TAHAP_PENGUASAAN,
  SENARAI_TAHAP_PENGUASAAN_DLP,
} from '../data/pedagogiData';
import {
  Layers,
  ArrowRight,
  ArrowLeft,
  Brain,
  FlaskConical,
  Dna,
  Award,
  PenTool,
  BookmarkCheck,
  FileText,
  Minimize2,
  CheckSquare,
  Square,
} from 'lucide-react';

interface Step5ElemenProps {
  rph: RPHData;
  portalSubject?: string;
  onChange: (updated: Partial<RPHData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step5Elemen: React.FC<Step5ElemenProps> = ({
  rph,
  portalSubject = 'kimia',
  onChange,
  onPrev,
  onNext,
}) => {
  const isDlp = rph.bahasa === 'DLP';
  const isPink = portalSubject === 'biologi';
  const isAmber = portalSubject === 'fizik';
  const isTurquoise = portalSubject === 'sains';
  const isIndigo = portalSubject === 'matematik';
  const isCharcoal = portalSubject === 'matematik-tambahan';

  const rawPak21List = isDlp ? SENARAI_PAK21_DLP : SENARAI_PAK21;
  const pak21List = isPink
    ? rawPak21List.map((item) =>
        item.includes('Simulasi Kimia')
          ? isDlp
            ? 'Interactive Digital Simulation (Simulasi Biologi Cikgu Hafreez / PhET / BioDigital)'
            : 'Simulasi Digital & Model 3D (Simulasi Biologi Cikgu Hafreez / PhET / BioDigital)'
          : item
      )
    : isAmber
    ? rawPak21List.map((item) =>
        item.includes('Simulasi Kimia')
          ? isDlp
            ? 'Interactive Digital Simulation (Simulasi Fizik Cikgu Hafreez / PhET / GeoGebra)'
            : 'Simulasi Digital & Radas Maya (Simulasi Fizik Cikgu Hafreez / PhET / GeoGebra)'
          : item
      )
    : isIndigo
    ? rawPak21List.map((item) =>
        item.includes('Simulasi Kimia')
          ? isDlp
            ? 'Interactive Digital Simulation (Simulasi Matematik Cikgu Hafreez / GeoGebra / Desmos)'
            : 'Simulasi Digital & Geometri Dinamik (Simulasi Matematik Cikgu Hafreez / GeoGebra / Desmos)'
          : item
      )
    : isCharcoal
    ? rawPak21List.map((item) =>
        item.includes('Simulasi Kimia')
          ? isDlp
            ? 'Interactive Digital Simulation (Simulasi AddMaths Cikgu Hafreez / GeoGebra / Desmos)'
            : 'Simulasi Digital & Geometri/Kalkulus Dinamik (Simulasi AddMaths Cikgu Hafreez / GeoGebra / Desmos)'
          : item
      )
    : rawPak21List;

  const kbatList = isDlp ? SENARAI_KBAT_DLP : SENARAI_KBAT;
  const kpsList = isDlp ? SENARAI_KPS_DLP : SENARAI_KPS;

  const rawBbmList = isDlp ? SENARAI_BBM_DLP : SENARAI_BBM;
  const bbmList = isPink
    ? rawBbmList.map((item) => {
        if (item.includes('Kimia') || item.includes('Chemistry')) {
          return isDlp ? 'KSSM Biology Textbook (DLP)' : 'Buku Teks Biologi KSSM';
        }
        if (item.includes('Berkala') || item.includes('Periodic')) {
          return isDlp ? 'Biological Charts & 3D Anatomy Models' : 'Carta & Model Anatomi/Biologi';
        }
        if (item.includes('Molymod')) {
          return isDlp ? 'Light Microscope & Prepared Slides' : 'Mikroskop Cahaya & Slaid Spesimen';
        }
        if (item.includes('Bahan Kimia') || item.includes('Chemical Reagents')) {
          return isDlp ? 'Biological Specimens & Staining Reagents' : 'Reagen & Bahan Biologi Makmal';
        }
        return item;
      })
    : isAmber
    ? rawBbmList.map((item) => {
        if (item.includes('Kimia') || item.includes('Chemistry')) {
          return isDlp ? 'KSSM Physics Textbook (DLP)' : 'Buku Teks Fizik KSSM';
        }
        if (item.includes('Berkala') || item.includes('Periodic')) {
          return isDlp ? 'Physics Formula Sheet & Circuit Components' : 'Senarai Rumus Fizik & Komponen Litar';
        }
        if (item.includes('Molymod')) {
          return isDlp ? 'Ticker Timer, Vernier Caliper & Micrometer Screw Gauge' : 'Jangka Masa Detik, Angkup Vernier & Tolok Skru Mikrometer';
        }
        if (item.includes('Bahan Kimia') || item.includes('Chemical Reagents')) {
          return isDlp ? 'Ray Box, Optical Slits, Prisms & Lenses' : 'Kotak Sinar, Celah Optik, Prisma & Kanta';
        }
        return item;
      })
    : isIndigo
    ? rawBbmList.map((item) => {
        if (item.includes('Kimia') || item.includes('Chemistry')) {
          return isDlp ? 'KSSM Mathematics Textbook (DLP)' : 'Buku Teks Matematik KSSM';
        }
        if (item.includes('Berkala') || item.includes('Periodic')) {
          return isDlp ? 'Geometry Tool Set (Ruler, Protractor, Compass)' : 'Set Alatan Geometri (Pembaris, Protraktor, Jangka Lukis)';
        }
        if (item.includes('Molymod')) {
          return isDlp ? 'Scientific Calculator & Graph Paper' : 'Kalkulator Saintifik & Kertas Graf';
        }
        if (item.includes('Bahan Kimia') || item.includes('Chemical Reagents')) {
          return isDlp ? 'Dynamic Math Software (GeoGebra / Desmos)' : 'Perisian Matematik Dinamik (GeoGebra / Desmos)';
        }
        return item;
      })
    : isCharcoal
    ? rawBbmList.map((item) => {
        if (item.includes('Kimia') || item.includes('Chemistry')) {
          return isDlp ? 'KSSM Additional Mathematics Textbook (DLP)' : 'Buku Teks Matematik Tambahan KSSM';
        }
        if (item.includes('Berkala') || item.includes('Periodic')) {
          return isDlp ? 'SPM Additional Mathematics Formula Sheet & Graph Paper' : 'Senarai Rumus Matematik Tambahan SPM & Kertas Graf';
        }
        if (item.includes('Molymod')) {
          return isDlp ? 'Scientific / Graphic Calculator (CASIO 570/991 / ClassWiz)' : 'Kalkulator Saintifik / Grafik (CASIO 570/991 / ClassWiz)';
        }
        if (item.includes('Bahan Kimia') || item.includes('Chemical Reagents')) {
          return isDlp ? 'Dynamic Math Software (GeoGebra / Desmos Graphing Calculator)' : 'Perisian Matematik Dinamik (GeoGebra / Graf Desmos)';
        }
        return item;
      })
    : rawBbmList;

  const emkList = isDlp ? SENARAI_EMK_DLP : SENARAI_EMK;
  const nilaiList = isDlp ? SENARAI_NILAI_MURNI_DLP : SENARAI_NILAI_MURNI;
  const pentaksiranList = isDlp ? SENARAI_PENTAKSIRAN_DLP : SENARAI_PENTAKSIRAN;
  const tpList = isDlp
    ? SENARAI_TAHAP_PENGUASAAN_DLP
    : SENARAI_TAHAP_PENGUASAAN;

  const elemenAktif: Required<ElemenAktifRPH> = {
    pak21: rph.elemenAktif?.pak21 !== false,
    kbat: rph.elemenAktif?.kbat !== false,
    kps: rph.elemenAktif?.kps !== false,
    bbm: rph.elemenAktif?.bbm !== false,
    emk: rph.elemenAktif?.emk !== false,
    nilaiMurni: rph.elemenAktif?.nilaiMurni !== false,
    pentaksiran: rph.elemenAktif?.pentaksiran !== false,
    refleksi: rph.elemenAktif?.refleksi !== false,
  };

  const toggleSectionActive = (sectionKey: keyof ElemenAktifRPH) => {
    const nextVal = !elemenAktif[sectionKey];
    onChange({
      elemenAktif: {
        ...elemenAktif,
        [sectionKey]: nextVal,
      },
    });
  };

  const toggleArrayItem = (
    key: keyof RPHData,
    item: string,
    sectionKey?: keyof ElemenAktifRPH
  ) => {
    const arr = (rph[key] as string[]) || [];
    const nextArr = arr.includes(item)
      ? arr.filter((x) => x !== item)
      : [...arr, item];

    if (sectionKey && !elemenAktif[sectionKey] && nextArr.length > 0) {
      onChange({
        [key]: nextArr,
        elemenAktif: {
          ...elemenAktif,
          [sectionKey]: true,
        },
      });
    } else {
      onChange({ [key]: nextArr });
    }
  };

  // Atomic update for reflection fields so updating bilCapai & bilTidakCapai together never overwrites one another
  const handleRefleksiPatch = (patch: Partial<RPHData['refleksi']>) => {
    onChange({
      refleksi: {
        ...rph.refleksi,
        ...patch,
      },
    });
  };

  const renderSectionToggle = (sectionKey: keyof ElemenAktifRPH) => {
    const isEnabled = elemenAktif[sectionKey];
    return (
      <button
        type="button"
        onClick={() => toggleSectionActive(sectionKey)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition select-none ${
          isEnabled
            ? isPink
              ? 'bg-pink-50 border-pink-300 text-pink-800 hover:bg-pink-100'
              : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
            : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'
        }`}
        title={
          isDlp
            ? 'Tick to include or exclude this section from the generated RPH'
            : 'Tandakan (tick) sama ada mahu masukkan bahagian ini dalam RPH yang dijana atau tidak'
        }
      >
        {isEnabled ? (
          <CheckSquare className={`w-4 h-4 ${isPink ? 'text-pink-600' : 'text-emerald-600'} shrink-0`} />
        ) : (
          <Square className="w-4 h-4 text-slate-400 shrink-0" />
        )}
        <span>
          {isEnabled
            ? isDlp
              ? 'Included in RPH'
              : 'Masukkan dalam RPH'
            : isDlp
            ? 'Excluded from RPH'
            : 'Tidak Digunakan'}
        </span>
      </button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className={`${
        isPink
          ? 'bg-gradient-to-r from-[#ab4f6c] via-[#b85b79] to-[#993f5b]'
          : isAmber
          ? 'bg-gradient-to-r from-[#ab5e19] via-[#ba6d23] to-[#994f11]'
          : isTurquoise
          ? 'bg-gradient-to-r from-sky-700 via-cyan-700 to-blue-800'
          : isIndigo
          ? 'bg-gradient-to-r from-[#312e81] via-[#3730a3] to-[#4338ca]'
          : isCharcoal
          ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-zinc-900'
          : 'bg-gradient-to-r from-blue-700 to-indigo-800'
      } rounded-2xl p-6 text-white shadow-md`}>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs mb-2">
          <span>
            Langkah 5 daripada 6 • {isDlp ? 'DLP (English)' : 'Bahasa Melayu'}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">
          {isDlp
            ? 'Supporting Elements, Teaching Aids, Assessment & Reflection'
            : 'Elemen Sokongan, BBM, Pentaksiran & Refleksi'}
        </h2>
        <p className={`text-sm ${isPink ? 'text-pink-100' : isAmber ? 'text-amber-100' : isTurquoise ? 'text-teal-100' : 'text-blue-100'} mt-1`}>
          {isDlp
            ? 'Tick the items you want to use, or toggle "Included in RPH" on any section to enable/disable it in the generated RPH.'
            : 'Tandakan (tick) kotak pada setiap item yang ingin digunakan, atau aktifkan/nyahaktifkan bahagian untuk dimasukkan ke dalam RPH yang dijana.'}
        </p>
      </div>

      {/* 1. Kaedah PAK-21 */}
      <div
        className={`bg-white rounded-2xl border p-6 shadow-xs space-y-3 transition ${
          elemenAktif.pak21
            ? 'border-slate-200'
            : 'border-slate-200/70 bg-slate-50/60 opacity-75'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {isDlp
                ? '21st Century Learning Pedagogy (PAK-21)'
                : 'Pedagogi Pembelajaran Abad Ke-21 (PAK-21)'}
            </h3>
          </div>
          {renderSectionToggle('pak21')}
        </div>

        <div className="flex flex-wrap gap-2">
          {pak21List.map((item) => {
            const isSelected = rph.pak21Kaedah.includes(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() => toggleArrayItem('pak21Kaedah', item, 'pak21')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 text-left ${
                  isSelected && elemenAktif.pak21
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : isSelected
                    ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isSelected ? (
                  <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Aras KBAT & Kemahiran Saintifik (KPS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aras KBAT */}
        <div
          className={`bg-white rounded-2xl border p-6 shadow-xs space-y-3 transition ${
            elemenAktif.kbat
              ? 'border-slate-200'
              : 'border-slate-200/70 bg-slate-50/60 opacity-75'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {isDlp
                  ? 'Higher Order Thinking Skills (HOTS / KBAT)'
                  : 'Aras Kemahiran Berfikir (KBAT)'}
              </h3>
            </div>
            {renderSectionToggle('kbat')}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {kbatList.map((item) => {
              const isSelected = rph.kbatAras.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleArrayItem('kbatAras', item, 'kbat')}
                  className={`p-2.5 rounded-lg text-xs font-semibold border transition flex items-center gap-2 ${
                    isSelected && elemenAktif.kbat
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : isSelected
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Kemahiran Proses Sains (KPS) */}
        <div
          className={`bg-white rounded-2xl border p-6 shadow-xs space-y-3 transition ${
            elemenAktif.kps
              ? 'border-slate-200'
              : 'border-slate-200/70 bg-slate-50/60 opacity-75'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              {isPink ? (
                <Dna className="w-4 h-4 text-pink-600" />
              ) : (
                <FlaskConical className="w-4 h-4 text-emerald-600" />
              )}
              <h3 className="text-sm font-bold text-slate-900">
                {isDlp
                  ? 'Science Process Skills (SPS)'
                  : 'Kemahiran Proses Sains (KPS)'}
              </h3>
            </div>
            {renderSectionToggle('kps')}
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
            {kpsList.map((item) => {
              const isSelected = rph.kemahiranSaintifik.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() =>
                    toggleArrayItem('kemahiranSaintifik', item, 'kps')
                  }
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium border transition flex items-center gap-1.5 text-left ${
                    isSelected && elemenAktif.kps
                      ? isPink ? 'bg-pink-600 text-white border-pink-600 shadow-xs' : 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : isSelected
                      ? isPink ? 'bg-pink-100 text-pink-900 border-pink-300' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? (
                    <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <Square className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Bahan Bantu Mengajar (BBM) */}
      <div
        className={`bg-white rounded-2xl border p-6 shadow-xs space-y-3 transition ${
          elemenAktif.bbm
            ? 'border-slate-200'
            : 'border-slate-200/70 bg-slate-50/60 opacity-75'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {isDlp
                ? 'Teaching & Learning Aids (BBM)'
                : 'Bahan Bantu Mengajar (BBM / ABM)'}
            </h3>
          </div>
          {renderSectionToggle('bbm')}
        </div>

        <div className="flex flex-wrap gap-2">
          {bbmList.map((item) => {
            const isSelected = rph.bbm.includes(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() => toggleArrayItem('bbm', item, 'bbm')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 text-left ${
                  isSelected && elemenAktif.bbm
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : isSelected
                    ? 'bg-blue-100 text-blue-900 border-blue-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isSelected ? (
                  <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. EMK & Nilai Murni */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`bg-white rounded-2xl border p-6 shadow-xs space-y-3 transition ${
            elemenAktif.emk
              ? 'border-slate-200'
              : 'border-slate-200/70 bg-slate-50/60 opacity-75'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {isDlp
                  ? 'Cross-Curricular Elements (EMK)'
                  : 'Elemen Merentas Kurikulum (EMK)'}
              </h3>
            </div>
            {renderSectionToggle('emk')}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {emkList.map((item) => {
              const isSelected = rph.emk.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleArrayItem('emk', item, 'emk')}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium border transition flex items-center gap-1.5 text-left ${
                    isSelected && elemenAktif.emk
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : isSelected
                      ? 'bg-purple-100 text-purple-900 border-purple-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? (
                    <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <Square className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`bg-white rounded-2xl border p-6 shadow-xs space-y-3 transition ${
            elemenAktif.nilaiMurni
              ? 'border-slate-200'
              : 'border-slate-200/70 bg-slate-50/60 opacity-75'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {isDlp
                  ? 'Noble Values & Scientific Attitudes'
                  : 'Nilai Murni & Sikap Saintifik'}
              </h3>
            </div>
            {renderSectionToggle('nilaiMurni')}
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
            {nilaiList.map((item) => {
              const isSelected = rph.nilaiMurni.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() =>
                    toggleArrayItem('nilaiMurni', item, 'nilaiMurni')
                  }
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium border transition flex items-center gap-1.5 text-left ${
                    isSelected && elemenAktif.nilaiMurni
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : isSelected
                      ? 'bg-teal-100 text-teal-900 border-teal-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? (
                    <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <Square className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Pentaksiran Bilik Darjah (PBD) */}
      <div
        className={`bg-white rounded-2xl border p-6 shadow-xs space-y-3 transition ${
          elemenAktif.pentaksiran
            ? 'border-slate-200'
            : 'border-slate-200/70 bg-slate-50/60 opacity-75'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {isDlp
                ? 'Classroom Assessment (PBD) & Mastery Level'
                : 'Kaedah Pentaksiran Bilik Darjah (PBD) & Tahap Penguasaan'}
            </h3>
          </div>
          {renderSectionToggle('pentaksiran')}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {pentaksiranList.map((item) => {
            const isSelected = rph.pentaksiranPbd.includes(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() =>
                  toggleArrayItem('pentaksiranPbd', item, 'pentaksiran')
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 text-left ${
                  isSelected && elemenAktif.pentaksiran
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : isSelected
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isSelected ? (
                  <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
                <span>{item}</span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-slate-500 font-semibold pt-1">
          {isDlp ? 'Targeted Mastery Level:' : 'Tahap Penguasaan Disasarkan:'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {tpList.map((tp) => {
            const isSelected = rph.tahapPenguasaan.includes(tp);
            return (
              <button
                type="button"
                key={tp}
                onClick={() =>
                  toggleArrayItem('tahapPenguasaan', tp, 'pentaksiran')
                }
                className={`p-2.5 text-left rounded-lg text-xs font-medium border transition flex items-start gap-2 ${
                  isSelected && elemenAktif.pentaksiran
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500/20'
                    : isSelected
                    ? 'bg-emerald-50/50 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isSelected ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <span>{tp}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Refleksi & Impak PdPC */}
      <div
        className={`bg-white rounded-2xl border p-6 shadow-xs space-y-4 transition ${
          elemenAktif.refleksi
            ? 'border-slate-200'
            : 'border-slate-200/70 bg-slate-50/60 opacity-75'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {isDlp
                ? 'Teacher Reflection & Follow-up Notes'
                : 'Refleksi Guru & Catatan PdPC'}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">
              {isDlp
                ? 'Can be updated before or after lesson'
                : 'Boleh dikemaskini sebelum atau selepas sesi'}
            </span>
            {renderSectionToggle('refleksi')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Status PdPC
            </label>
            <select
              value={rph.refleksi.statusPdpc}
              onChange={(e) =>
                handleRefleksiPatch({
                  statusPdpc: e.target.value as RPHData['refleksi']['statusPdpc'],
                })
              }
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
            >
              <option value="Selesai">
                {isDlp ? 'Completed Successfully' : 'Selesai Berjaya'}
              </option>
              <option value="Ditangguhkan">
                {isDlp
                  ? 'Postponed (School Event / Leave)'
                  : 'Ditangguhkan (Cuti/Aktiviti Sekolah)'}
              </option>
              <option value="Diteruskan">
                {isDlp
                  ? 'Continued in Next Lesson'
                  : 'Diteruskan ke Sesi Berikutnya'}
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isDlp ? 'Students Achieved Objective' : 'Murid Capai Objektif'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={rph.refleksi.bilCapai}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === '') {
                    handleRefleksiPatch({ bilCapai: '' });
                    return;
                  }
                  const val = Math.max(0, parseInt(raw, 10) || 0);
                  const total = Number(rph.info.bilanganMurid) || 0;
                  handleRefleksiPatch({
                    bilCapai: val,
                    bilTidakCapai: total > 0 ? Math.max(0, total - val) : rph.refleksi.bilTidakCapai,
                  });
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
              <span className="text-xs text-slate-500 font-bold whitespace-nowrap">
                / {rph.info.bilanganMurid}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isDlp ? 'Require Guidance' : 'Memerlukan Bimbingan'}
            </label>
            <input
              type="number"
              min="0"
              value={rph.refleksi.bilTidakCapai}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === '') {
                  handleRefleksiPatch({ bilTidakCapai: '' });
                  return;
                }
                const val = Math.max(0, parseInt(raw, 10) || 0);
                handleRefleksiPatch({ bilTidakCapai: val });
              }}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {isDlp ? 'Follow-up Action / Coaching' : 'Tindakan Susulan / Bimbingan'}
          </label>
          <input
            type="text"
            value={rph.refleksi.tindakanSusulan}
            onChange={(e) =>
              handleRefleksiPatch({ tindakanSusulan: e.target.value })
            }
            placeholder="cth: Murid yang belum capai diberi latihan pengukuhan dan bimbingan rakan sebaya."
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {isDlp ? 'Additional Teacher Notes' : 'Catatan Tambahan Guru'}
          </label>
          <input
            type="text"
            value={rph.refleksi.catatanTambahan}
            onChange={(e) =>
              handleRefleksiPatch({ catatanTambahan: e.target.value })
            }
            placeholder="cth: Murid sangat berminat semasa aktiviti amali dan membina model zarah."
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
          />
        </div>
      </div>

      {/* 7. Pilihan Format Pratonton Sebelum Jana (Standard vs Compact 1 Muka Surat) */}
      <div className={`${
        isPink
          ? 'bg-pink-50/80 border-pink-200'
          : 'bg-emerald-50/80 border-emerald-200'
      } rounded-2xl border p-5 shadow-xs space-y-3`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className={`text-sm font-extrabold ${isPink ? 'text-pink-950' : 'text-emerald-950'} flex items-center gap-2`}>
              <Minimize2 className={`w-4 h-4 ${isPink ? 'text-pink-600' : 'text-emerald-600'}`} />
              <span>
                {isDlp
                  ? 'Choose Preview & Print Layout Before Generating RPH'
                  : 'Pilihan Susun Atur Sebelum Pratonton RPH Dijana'}
              </span>
            </h3>
            <p className={`text-xs ${isPink ? 'text-pink-800' : 'text-emerald-800'}`}>
              {isDlp
                ? 'Choose Compact RPH to fit everything neatly onto a single A4 page.'
                : 'Pilih Compact RPH jika anda mahu RPH dipadatkan muat dalam 1 muka surat A4 sahaja.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange({ isCompact: false })}
            className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
              !rph.isCompact
                ? isPink
                  ? 'bg-white border-pink-600 ring-2 ring-pink-500/20 shadow-xs'
                  : 'bg-white border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                : 'bg-white/60 border-slate-200 hover:bg-white'
            }`}
          >
            <FileText
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                !rph.isCompact ? (isPink ? 'text-pink-600' : 'text-emerald-600') : 'text-slate-400'
              }`}
            />
            <div>
              <p className="text-xs font-extrabold text-slate-900">
                Standard RPH (Penuh & Terperinci)
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Format jadual rasmi KPM penuh dengan ruang tandatangan & ulasan.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ isCompact: true })}
            className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
              rph.isCompact
                ? isPink
                  ? 'bg-white border-pink-600 ring-2 ring-pink-500/20 shadow-xs'
                  : 'bg-white border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                : 'bg-white/60 border-slate-200 hover:bg-white'
            }`}
          >
            <Minimize2
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                rph.isCompact ? (isPink ? 'text-pink-600' : 'text-emerald-600') : 'text-slate-400'
              }`}
            />
            <div>
              <p className={`text-xs font-extrabold ${isPink ? 'text-pink-950' : 'text-emerald-950'} flex items-center gap-1.5`}>
                <span>Compact RPH (1 Muka Surat Sahaja)</span>
                <span className={`px-1.5 py-0.2 rounded ${
                  isPink ? 'bg-pink-100 text-pink-800' : 'bg-emerald-100 text-emerald-800'
                } text-[10px] font-bold`}>
                  Jimat Kertas
                </span>
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Susun atur padat 1 halaman A4 untuk cetakan pantas & fail e-RPH.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Navigation bottom */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isDlp ? 'Back' : 'Kembali'}</span>
        </button>
        <button
          onClick={onNext}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl ${
            isPink
              ? 'bg-pink-600 hover:bg-pink-700 shadow-pink-600/25'
              : isAmber
              ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
              : isTurquoise
              ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20'
              : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
          } text-white font-semibold text-sm transition shadow-md`}
        >
          <span>
            {isDlp
              ? 'Finish: Preview & Export RPH'
              : 'Selesai: Pratonton & Cetak'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
