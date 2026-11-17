import React, { useState, useMemo, useEffect } from 'react';
import {
  RPHData,
  BabKimia,
  StandardKandungan,
  StandardPembelajaran,
  Tingkatan,
  BahasaRPH,
  SubjekRPH,
} from '../types/rph';
import {
  getDskpByBahasa,
  getTingkatanListBySubjek,
} from '../data/dskpKimia';
import { MoleculeWatermark, LabApparatusWatermark, BiologyDnaWatermark, PhysicsAtomWatermark } from './ChemistryDecor';
import {
  Search,
  FlaskConical,
  Atom,
  Dna,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  BookOpen,
  CheckSquare,
  Square,
  X,
  Globe,
  Award,
  HelpCircle,
  Calculator,
  Compass,
} from 'lucide-react';

interface Step2DskpProps {
  rph: RPHData;
  portalSubject?: string;
  onUpdateDskp: (
    bab: BabKimia,
    sk: StandardKandungan,
    spArray: StandardPembelajaran[],
    autoFillOthers: boolean,
    overrideBahasa?: BahasaRPH
  ) => void;
  onBahasaChange?: (bahasa: BahasaRPH) => void;
  onSubjekChange?: (subjek: SubjekRPH) => void;
  onOpenUserGuide?: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step2Dskp: React.FC<Step2DskpProps> = ({
  rph,
  portalSubject = 'kimia',
  onUpdateDskp,
  onBahasaChange,
  onSubjekChange,
  onOpenUserGuide,
  onPrev,
  onNext,
}) => {
  const isDlp = rph.bahasa === 'DLP';
  const activeSubjek: SubjekRPH =
    rph.subjek ||
    rph.info.subjek ||
    (rph.babId?.startsWith('S_') ? 'Sains' : 'Kimia');
  const isSains = activeSubjek === 'Sains';
  const tingkatanList = useMemo(
    () => getTingkatanListBySubjek(activeSubjek),
    [activeSubjek]
  );
  const dskpList = useMemo(
    () => getDskpByBahasa(rph.bahasa, activeSubjek),
    [rph.bahasa, activeSubjek]
  );

  const [activeTingkatan, setActiveTingkatan] = useState<Tingkatan>(
    tingkatanList.includes(rph.info.tingkatan)
      ? rph.info.tingkatan
      : tingkatanList[0]
  );
  const [selectedBabId, setSelectedBabId] = useState<string>(rph.babId || '');
  const [selectedSkKod, setSelectedSkKod] = useState<string>(rph.skKod || '');
  const [isSpDropdownOpen, setIsSpDropdownOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoApplyDefaults, setAutoApplyDefaults] = useState(true);

  useEffect(() => {
    setSelectedBabId(rph.babId || '');
    setSelectedSkKod(rph.skKod || '');
    if (tingkatanList.includes(rph.info.tingkatan)) {
      setActiveTingkatan(rph.info.tingkatan);
    } else {
      setActiveTingkatan(tingkatanList[0]);
    }
  }, [rph.babId, rph.skKod, rph.info.tingkatan, tingkatanList]);

  // Filter chapters by form
  const babList = useMemo(() => {
    return dskpList.filter((b) => b.tingkatan === activeTingkatan);
  }, [dskpList, activeTingkatan]);

  // Special non-syllabus programme chapter for current form
  const specialBab = useMemo(() => {
    return babList.find((b) => b.isProgramKhas) || null;
  }, [babList]);

  // Selected chapter
  const currentBab = useMemo(() => {
    return babList.find((b) => b.id === selectedBabId) || null;
  }, [babList, selectedBabId]);

  // Selected SK
  const currentSk = useMemo(() => {
    if (!currentBab || !selectedSkKod) return null;
    return currentBab.skList.find((sk) => sk.kod === selectedSkKod) || null;
  }, [currentBab, selectedSkKod]);

  // Search filter across all SPs in current form
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const results: {
      bab: BabKimia;
      sk: StandardKandungan;
      sp: StandardPembelajaran;
    }[] = [];

    dskpList.forEach((b) => {
      if (b.tingkatan === activeTingkatan) {
        b.skList.forEach((sk) => {
          sk.spList.forEach((sp) => {
            if (
              sp.kod.toLowerCase().includes(q) ||
              sp.tajuk.toLowerCase().includes(q) ||
              sk.tajuk.toLowerCase().includes(q) ||
              b.tajuk.toLowerCase().includes(q) ||
              (sp.namaEksperimen &&
                sp.namaEksperimen.toLowerCase().includes(q))
            ) {
              results.push({ bab: b, sk, sp });
            }
          });
        });
      }
    });

    return results;
  }, [searchQuery, activeTingkatan, dskpList]);

  const handleToggleSp = (
    bab: BabKimia,
    sk: StandardKandungan,
    sp: StandardPembelajaran
  ) => {
    const isSameSk = rph.babId === bab.id && rph.skKod === sk.kod;

    let nextSpList: StandardPembelajaran[] = [];
    if (isSameSk) {
      const currentSelectedCodes = new Set(rph.spKod);
      if (currentSelectedCodes.has(sp.kod)) {
        const remainingCodes = rph.spKod.filter((k) => k !== sp.kod);
        nextSpList = sk.spList.filter((item) =>
          remainingCodes.includes(item.kod)
        );
        if (nextSpList.length === 0) {
          nextSpList = [sp];
        }
      } else {
        const updatedCodes = [...rph.spKod, sp.kod];
        nextSpList = sk.spList.filter((item) =>
          updatedCodes.includes(item.kod)
        );
      }
    } else {
      nextSpList = [sp];
    }

    onUpdateDskp(bab, sk, nextSpList, autoApplyDefaults);
  };

  const handleSelectAllSpInSk = () => {
    if (!currentBab || !currentSk) return;
    onUpdateDskp(currentBab, currentSk, currentSk.spList, autoApplyDefaults);
  };

  const handleResetSingleSp = () => {
    if (!currentBab || !currentSk || currentSk.spList.length === 0) return;
    onUpdateDskp(
      currentBab,
      currentSk,
      [currentSk.spList[0]],
      autoApplyDefaults
    );
  };

  const handleQuickSelectSpecialSk = (skKod: string) => {
    if (!specialBab) return;
    const skObj = specialBab.skList.find((s) => s.kod === skKod);
    if (!skObj || skObj.spList.length === 0) return;
    setSelectedBabId(specialBab.id);
    setSelectedSkKod(skObj.kod);
    setIsSpDropdownOpen(true);
    onUpdateDskp(specialBab, skObj, [skObj.spList[0]], autoApplyDefaults);
  };

  const handleSwitchLanguage = (newBahasa: BahasaRPH) => {
    if (onBahasaChange) {
      onBahasaChange(newBahasa);
    }
    const targetDskp = getDskpByBahasa(newBahasa, activeSubjek);
    const matchingBab =
      targetDskp.find((b) => b.id === selectedBabId) ||
      targetDskp.find((b) => b.tingkatan === activeTingkatan);
    if (matchingBab) {
      const matchingSk =
        matchingBab.skList.find((s) => s.kod === selectedSkKod) ||
        matchingBab.skList[0];
      if (matchingSk) {
        const matchingSps = matchingSk.spList.filter((s) =>
          rph.spKod.includes(s.kod)
        );
        const finalSps =
          matchingSps.length > 0 ? matchingSps : [matchingSk.spList[0]];
        onUpdateDskp(matchingBab, matchingSk, finalSps, true, newBahasa);
      }
    }
  };

  const isPink = portalSubject === 'biologi';
  const isAmber = portalSubject === 'fizik';
  const isTurquoise = portalSubject === 'sains';
  const isIndigo = portalSubject === 'matematik';
  const isCharcoal = portalSubject === 'matematik-tambahan';
  const majorName = isPink
    ? 'Biologi'
    : isAmber
    ? 'Fizik'
    : isTurquoise
    ? 'Sains'
    : isIndigo
    ? 'Matematik'
    : isCharcoal
    ? 'Matematik Tambahan'
    : 'Kimia';
  const majorNameEn = isPink
    ? 'Biology'
    : isAmber
    ? 'Physics'
    : isTurquoise
    ? 'Science'
    : isIndigo
    ? 'Mathematics'
    : isCharcoal
    ? 'Additional Mathematics'
    : 'Chemistry';

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Step banner */}
      <div className={`relative overflow-hidden ${
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
          : 'bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-700'
      } rounded-2xl p-6 text-white shadow-md`}>
        {isPink ? (
          <BiologyDnaWatermark className="w-56 h-56 text-white/15 absolute -right-6 -bottom-10" />
        ) : isAmber ? (
          <PhysicsAtomWatermark className="w-56 h-56 text-white/15 absolute -right-6 -bottom-10" />
        ) : isTurquoise ? (
          <MoleculeWatermark className="w-56 h-56 text-white/10 absolute -right-6 -bottom-10" />
        ) : isIndigo || isCharcoal ? (
          <MoleculeWatermark className="w-56 h-56 text-white/10 absolute -right-6 -bottom-10" />
        ) : (
          <>
            <MoleculeWatermark className="w-56 h-56 text-white/10 absolute -right-6 -bottom-10" />
            <LabApparatusWatermark className="w-40 h-40 text-white/10 absolute right-44 -top-6 hidden md:block" />
          </>
        )}

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white/20 backdrop-blur-xs mb-2">
              <span>
                Langkah 2 daripada 6 •{' '}
                {isSains
                  ? isDlp
                    ? 'DSKP Science Form 2–5 (DLP English)'
                    : 'DSKP Sains Tingkatan 2–5 (BM)'
                  : isIndigo
                  ? isDlp
                    ? 'DSKP Mathematics Form 2–5 (DLP English)'
                    : 'DSKP Matematik Tingkatan 2–5 (BM)'
                  : isDlp
                  ? `DSKP ${majorNameEn} Form 4–5 (DLP English)`
                  : `DSKP ${majorName} Tingkatan 4–5 (BM)`}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              {isDlp
                ? 'Select Topic, Content Standard (SK) & Learning Standard (SP)'
                : 'Pilih Topik, Standard Kandungan (SK) & Standard Pembelajaran (SP)'}
            </h2>
            <p className={`text-sm ${isPink ? 'text-pink-100' : isAmber ? 'text-amber-100' : isTurquoise ? 'text-teal-100' : isIndigo ? 'text-indigo-100' : 'text-teal-100'} mt-1 max-w-xl`}>
              {isDlp ? (
                <>
                  Choose a{' '}
                  {isSains
                    ? 'Form 2–5 Science'
                    : isIndigo
                    ? 'Form 2–5 Mathematics'
                    : `Form 4–5 ${majorNameEn}`}{' '}
                  chapter or{' '}
                  <strong className="text-white underline decoration-amber-300">
                    Revision / Slot Gemilang / Slot Mumtaz
                  </strong>
                  . You can combine multiple SPs in one lesson.
                </>
              ) : (
                <>
                  Pilih bab{' '}
                  {isSains
                    ? 'Sains (T2–T5)'
                    : isIndigo
                    ? 'Matematik (T2–T5)'
                    : `${majorName} (T4–T5)`}{' '}
                  atau{' '}
                  <strong className="text-white underline decoration-amber-300">
                    Ulangkaji / Slot Gemilang / Slot Mumtaz
                  </strong>
                  . Anda boleh memilih lebih daripada satu SP.
                </>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-2">
            {/* Subjek Switcher */}
            {onSubjekChange && (
              <div className="flex items-center gap-1 bg-black/25 p-1 rounded-xl backdrop-blur-xs">
                {portalSubject === 'sains' ? (
                  <span
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-sky-300 text-slate-950 flex items-center gap-1 select-none"
                  >
                    <Atom className="w-3 h-3" />
                    <span>Sains (T2–T5)</span>
                  </span>
                ) : portalSubject === 'matematik' ? (
                  <span
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-300 text-slate-950 flex items-center gap-1 select-none"
                  >
                    <Calculator className="w-3 h-3" />
                    <span>Matematik (T2–T5)</span>
                  </span>
                ) : portalSubject === 'matematik-tambahan' ? (
                  <span
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-300 text-slate-950 flex items-center gap-1 select-none"
                  >
                    <Compass className="w-3 h-3" />
                    <span>AddMaths (T4–T5)</span>
                  </span>
                ) : (
                  <>
                    {portalSubject === 'biologi' ? (
                      <button
                        type="button"
                        onClick={() => onSubjekChange('Biologi')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                          !isSains
                            ? 'bg-pink-400 text-slate-950'
                            : 'text-white/75 hover:text-white'
                        }`}
                      >
                        <Dna className="w-3 h-3" />
                        <span>Biologi (T4–T5)</span>
                      </button>
                    ) : portalSubject === 'fizik' ? (
                      <button
                        type="button"
                        onClick={() => onSubjekChange('Fizik')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                          !isSains
                            ? 'bg-amber-400 text-slate-950'
                            : 'text-white/75 hover:text-white'
                        }`}
                      >
                        <Atom className="w-3 h-3" />
                        <span>Fizik (T4–T5)</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSubjekChange('Kimia')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                          !isSains
                            ? 'bg-emerald-400 text-slate-950'
                            : 'text-white/75 hover:text-white'
                        }`}
                      >
                        <FlaskConical className="w-3 h-3" />
                        <span>Kimia (T4–T5)</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onSubjekChange('Sains')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                        isSains
                          ? 'bg-teal-300 text-slate-950'
                          : 'text-white/75 hover:text-white'
                      }`}
                    >
                      <Atom className="w-3 h-3" />
                      <span>Sains (T2–T5)</span>
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Tingkatan Switcher */}
            <div className="flex flex-wrap items-center gap-1 bg-black/25 p-1 rounded-xl backdrop-blur-xs">
              {tingkatanList.map((ting) => {
                const shortNum = ting.replace('Tingkatan ', '');
                return (
                  <button
                    key={ting}
                    type="button"
                    onClick={() => {
                      setActiveTingkatan(ting);
                      setSelectedBabId('');
                      setSelectedSkKod('');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      activeTingkatan === ting
                        ? 'bg-white text-emerald-950 shadow-xs'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {isDlp ? `Form ${shortNum}` : `Tingkatan ${shortNum}`}
                  </button>
                );
              })}
            </div>

            {/* Quick BM / DLP Switcher */}
            <div className="flex items-center gap-1 bg-black/25 p-1 rounded-xl backdrop-blur-xs">
              <Globe className="w-3.5 h-3.5 text-teal-200 ml-1.5" />
              <button
                type="button"
                onClick={() => handleSwitchLanguage('BM')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                  !isDlp
                    ? 'bg-emerald-400 text-slate-950'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                BM
              </button>
              <button
                type="button"
                onClick={() => handleSwitchLanguage('DLP')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                  isDlp
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                DLP (English)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Practical Tip for DSKP selection */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xs text-slate-700">
            <span className="font-extrabold text-slate-900 mr-1.5">
              {isDlp ? 'Quick Tip:' : 'Tip Pemilihan DSKP:'}
            </span>
            <span>
              {isDlp
                ? 'Select a chapter, then tick one or multiple Learning Standards (SP). Objectives & criteria are merged automatically.'
                : 'Pilih bab, kemudian tandakan satu atau lebih Standard Pembelajaran (SP). Objektif SMART akan digabungkan secara automatik.'}
            </span>
          </div>
        </div>
        {onOpenUserGuide && (
          <button
            type="button"
            onClick={onOpenUserGuide}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold transition shadow-2xs shrink-0 self-start sm:self-center cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Panduan Penuh</span>
          </button>
        )}
      </div>

      {/* Quick Bar: Program Khas / Minggu Peperiksaan & Aktiviti Tanpa Silibus */}
      {specialBab && (
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-amber-950 uppercase tracking-wide">
                {isDlp
                  ? 'Non-Syllabus Special Programmes & Revision (1-Click)'
                  : 'Pilihan Pantas Program Khas / Minggu Tanpa Silibus'}
              </h3>
              <p className="text-[11px] text-amber-800">
                {isDlp
                  ? 'Ideal for examination weeks, focused SPM revision, Slot Gemilang, or Slot Mumtaz.'
                  : 'Sesuai untuk minggu peperiksaan, ulangkaji berfokus, Slot Gemilang & Slot Mumtaz.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {specialBab.skList.map((sk) => {
              const isSelectedSpecial =
                selectedBabId === specialBab.id && selectedSkKod === sk.kod;
              const shortLabel =
                sk.kod === 'K1.0'
                  ? isDlp
                    ? 'Ulangkaji / Revision'
                    : 'Ulangkaji Berfokus'
                  : sk.kod === 'K2.0'
                  ? 'Slot Gemilang'
                  : sk.kod === 'K3.0'
                  ? 'Slot Mumtaz'
                  : isDlp
                  ? 'Exam / Activity Week'
                  : 'Minggu Peperiksaan / Aktiviti';

              return (
                <button
                  key={sk.kod}
                  type="button"
                  onClick={() => handleQuickSelectSpecialSk(sk.kod)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    isSelectedSpecial
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Search Bar & Auto-Fill Toggle */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isDlp
                ? "Quick search SP e.g. 'mole', 'titration', 'redox'..."
                : "Cari pantas SP cth: 'mol', 'titratan', 'ulangkaji'..."
            }
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              {isDlp ? 'Clear' : 'Kosongkan'}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoApplyDefaults}
              onChange={(e) => setAutoApplyDefaults(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {isDlp
                  ? 'Auto-populate SMART Objectives & Activities when SP is selected'
                  : 'Auto-gabung Objektif & Aktiviti cadangan apabila SP dipilih'}
              </span>
            </span>
          </label>
        </div>
      </div>

      {/* If Searching, show search results */}
      {searchResults ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>
              Hasil Carian: "{searchQuery}" ({searchResults.length} SP ditemui)
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-emerald-600 hover:underline font-semibold"
            >
              Kembali ke Menu Dropdown
            </button>
          </h3>

          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              Tiada Standard Pembelajaran yang sepadan dengan kata kunci ini.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {searchResults.map(({ bab, sk, sp }) => {
                const isSelected = rph.spKod.includes(sp.kod);
                return (
                  <div
                    key={sp.kod}
                    onClick={() => {
                      setSelectedBabId(bab.id);
                      setSelectedSkKod(sk.kod);
                      handleToggleSp(bab, sk, sp);
                    }}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 ring-1 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                          {bab.isProgramKhas
                            ? 'Program Khas'
                            : `${isDlp ? 'Chapter' : 'Bab'} ${bab.nomborBab}`}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          SK {sk.kod} {sk.tajuk}
                        </span>
                        {sp.eksperimenWajib && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-xs font-bold">
                            <FlaskConical className="w-3 h-3" />
                            <span>
                              {isDlp ? 'Compulsory Exp' : 'Amali Wajib SPM'}
                            </span>
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        {sp.kod} — {sp.tajuk}
                      </p>
                    </div>
                    <span
                      className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckSquare className="w-3.5 h-3.5" />
                          <span>{isDlp ? 'Selected' : 'Dipilih'}</span>
                        </>
                      ) : (
                        <>
                          <Square className="w-3.5 h-3.5" />
                          <span>{isDlp ? 'Select SP' : 'Pilih SP'}</span>
                        </>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Cascading Dropdown Panel: Topik -> SK -> Multi-SP */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          {/* STEP A: Pilih Topik / Bab (Dropdown) */}
          <div className="space-y-2">
            <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-md ${isPink ? 'bg-pink-600' : 'bg-emerald-600'} text-white flex items-center justify-center text-[11px]`}>
                  1
                </span>
                <span>
                  {isDlp
                    ? `Select Chapter / Programme (${activeTingkatan})`
                    : `Pilih Bab / Topik / Program Khas (${activeTingkatan})`}
                </span>
              </span>
              {currentBab && (
                <span className={`text-[11px] font-semibold ${
                  isPink
                    ? 'text-pink-700 bg-pink-50 border border-pink-200'
                    : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                } px-2 py-0.5 rounded-md`}>
                  {isDlp ? 'Theme' : 'Tema'}: {currentBab.tema}
                </span>
              )}
            </label>

            <div className="relative">
              <BookOpen className={`w-4 h-4 ${isPink ? 'text-pink-600' : 'text-emerald-600'} absolute left-3.5 top-3.5 pointer-events-none`} />
              <select
                value={selectedBabId}
                onChange={(e) => {
                  const newBabId = e.target.value;
                  setSelectedBabId(newBabId);
                  setSelectedSkKod('');
                }}
                className={`w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 ${
                  isPink
                    ? 'focus:ring-pink-500/20 focus:border-pink-600'
                    : 'focus:ring-emerald-500/20 focus:border-emerald-600'
                } bg-slate-50/70 hover:bg-white font-semibold text-slate-900 transition appearance-none cursor-pointer`}
              >
                <option value="">
                  {isDlp
                    ? `-- Select ${isSains ? 'Science' : majorNameEn} Chapter / Special Programme (${activeTingkatan}) --`
                    : `-- Sila Pilih Bab ${isSains ? 'Sains' : majorName} / Program Khas ${activeTingkatan} --`}
                </option>
                {babList.map((bab) => (
                  <option key={bab.id} value={bab.id}>
                    {bab.isProgramKhas
                      ? `★ ${bab.tajuk}`
                      : `${isDlp ? 'Chapter' : 'Bab'} ${bab.nomborBab}: ${bab.tajuk} (${bab.tema})`}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* STEP B: Pilih Standard Kandungan (SK) Dropdown */}
          {currentBab && (
            <div className="space-y-2 pt-3 border-t border-slate-100 animate-in fade-in">
              <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-md ${isPink ? 'bg-rose-500' : 'bg-teal-600'} text-white flex items-center justify-center text-[11px]`}>
                    2
                  </span>
                  <span>
                    {isDlp
                      ? 'Select Content Standard (SK) / Activity Slot'
                      : 'Pilih Standard Kandungan (SK) / Slot Aktiviti'}
                  </span>
                </span>
                <span className="text-[11px] font-normal text-slate-500">
                  {currentBab.skList.length}{' '}
                  {isDlp ? 'Content Standards' : 'Standard Kandungan tersedia'}
                </span>
              </label>

              <div className="relative">
                <Layers className={`w-4 h-4 ${isPink ? 'text-rose-500' : 'text-teal-600'} absolute left-3.5 top-3.5 pointer-events-none`} />
                <select
                  value={selectedSkKod}
                  onChange={(e) => {
                    const newSkKod = e.target.value;
                    setSelectedSkKod(newSkKod);
                    setIsSpDropdownOpen(true);
                    const foundSk = currentBab.skList.find(
                      (s) => s.kod === newSkKod
                    );
                    if (foundSk && foundSk.spList.length > 0) {
                      onUpdateDskp(
                        currentBab,
                        foundSk,
                        [foundSk.spList[0]],
                        autoApplyDefaults
                      );
                    }
                  }}
                  className={`w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 ${
                    isPink
                      ? 'focus:ring-rose-500/20 focus:border-rose-500'
                      : 'focus:ring-teal-500/20 focus:border-teal-600'
                  } bg-slate-50/70 hover:bg-white font-semibold text-slate-900 transition appearance-none cursor-pointer`}
                >
                  <option value="">
                    {isDlp
                      ? '-- Select Content Standard (SK) --'
                      : '-- Sila Pilih Standard Kandungan (SK) --'}
                  </option>
                  {currentBab.skList.map((sk) => (
                    <option key={sk.kod} value={sk.kod}>
                      SK {sk.kod} — {sk.tajuk} ({sk.spList.length} SP)
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>
          )}

          {/* STEP C: Pilih Standard Pembelajaran (SP) Multi-Select Dropdown */}
          {currentBab && currentSk && (
            <div className="space-y-3 pt-3 border-t border-slate-100 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <span className={`w-5 h-5 rounded-md ${isPink ? 'bg-pink-600' : 'bg-indigo-600'} text-white flex items-center justify-center text-[11px]`}>
                    3
                  </span>
                  <span>
                    {isDlp
                      ? 'Select Learning Standard (SP) — Can Select Multiple'
                      : 'Pilih Standard Pembelajaran (SP) — Boleh Pilih Lebih Daripada Satu'}
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSelectAllSpInSk}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
                  >
                    {isDlp
                      ? `Select All (${currentSk.spList.length} SP)`
                      : `Pilih Semua (${currentSk.spList.length} SP)`}
                  </button>
                  {rph.spKod.length > 1 && (
                    <button
                      type="button"
                      onClick={handleResetSingleSp}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                    >
                      {isDlp ? 'Select 1 Only' : 'Pilih 1 Sahaja'}
                    </button>
                  )}
                </div>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSpDropdownOpen((prev) => !prev)}
                  className={`w-full px-4 py-3 text-left rounded-xl border ${
                    isPink
                      ? 'border-pink-300 bg-pink-50/40 hover:bg-pink-50/80'
                      : 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50/80'
                  } transition flex items-center justify-between gap-3`}
                >
                  <div className="min-w-0">
                    <span className={`text-xs font-bold ${isPink ? 'text-pink-900' : 'text-emerald-900'} block`}>
                      {rph.spKod.length}{' '}
                      {isDlp
                        ? 'Learning Standard (SP) Selected:'
                        : 'Standard Pembelajaran (SP) Dipilih:'}
                    </span>
                    <span className="text-xs text-slate-700 font-medium truncate block mt-0.5">
                      {rph.spKod.join(', ')} — {rph.spTajuk.join(' | ')}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1.5 flex-shrink-0 text-xs font-bold ${isPink ? 'text-pink-700' : 'text-emerald-700'}`}>
                    <span>
                      {isSpDropdownOpen
                        ? isDlp
                          ? 'Hide List'
                          : 'Tutup Senarai'
                        : isDlp
                        ? 'Show SP List'
                        : 'Buka Senarai SP'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isSpDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {isSpDropdownOpen && (
                  <div className="mt-2 rounded-xl border border-slate-200 bg-white shadow-lg divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {currentSk.spList.map((sp) => {
                      const isChecked = rph.spKod.includes(sp.kod);
                      return (
                        <div
                          key={sp.kod}
                          onClick={() =>
                            handleToggleSp(currentBab, currentSk, sp)
                          }
                          className={`p-3.5 transition cursor-pointer flex items-start justify-between gap-3 ${
                            isChecked
                              ? 'bg-emerald-50/80 hover:bg-emerald-100/60'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 text-emerald-600 flex-shrink-0">
                              {isChecked ? (
                                <CheckSquare className="w-5 h-5 fill-emerald-600 text-white" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-400" />
                              )}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                                    isChecked
                                      ? 'bg-emerald-700 text-white'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  SP {sp.kod}
                                </span>
                                {sp.eksperimenWajib && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-md">
                                    <FlaskConical className="w-3 h-3" />
                                    <span>
                                      {isDlp
                                        ? 'Compulsory Lab Experiment'
                                        : 'Amali Wajib SPM'}
                                    </span>
                                  </span>
                                )}
                              </div>
                              <p
                                className={`text-xs sm:text-sm ${
                                  isChecked
                                    ? 'font-bold text-slate-900'
                                    : 'font-medium text-slate-700'
                                }`}
                              >
                                {sp.tajuk}
                              </p>
                              {sp.namaEksperimen && (
                                <p className="text-xs text-red-600 font-semibold">
                                  🧪 {sp.namaEksperimen}
                                </p>
                              )}
                            </div>
                          </div>

                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-md flex-shrink-0 ${
                              isChecked
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'text-slate-400'
                            }`}
                          >
                            {isChecked
                              ? isDlp
                                ? 'Selected ✓'
                                : 'Dipilih ✓'
                              : isDlp
                              ? 'Click to add'
                              : 'Klik untuk tambah'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Selected SPs Summary Cards */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {isDlp
                    ? `Selected SPs for This Lesson (${rph.spKod.length} SP):`
                    : `Senarai SP Yang Akan Diajar Dalam Sesi Kelas Ini (${rph.spKod.length} SP):`}
                </span>
              </span>
              <span className="text-xs font-semibold text-emerald-700">
                SK {rph.skKod}: {rph.skTajuk}
              </span>
            </div>

            <div className="space-y-1.5">
              {rph.spKod.map((kod, idx) => (
                <div
                  key={kod}
                  className="bg-white rounded-lg px-3 py-2 border border-slate-200 flex items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <span className="font-extrabold text-emerald-800 mr-2">
                      {kod}
                    </span>
                    <span className="text-slate-700 font-medium">
                      {rph.spTajuk[idx] || ''}
                    </span>
                  </div>
                  {rph.spKod.length > 1 && currentBab && currentSk && (
                    <button
                      type="button"
                      onClick={() => {
                        const targetSp = currentSk.spList.find(
                          (s) => s.kod === kod
                        );
                        if (targetSp) {
                          handleToggleSp(currentBab, currentSk, targetSp);
                        }
                      }}
                      className="text-slate-400 hover:text-red-600 p-1 rounded"
                      title="Buang SP ini"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${
            isPink
              ? 'bg-pink-500 text-white'
              : isAmber
              ? 'bg-amber-500 text-white'
              : isTurquoise
              ? 'bg-teal-500 text-white'
              : 'bg-emerald-500 text-slate-900'
          } flex items-center justify-center font-bold text-sm`}>
            {rph.spKod.length}
          </div>
          <div>
            <p className="text-xs text-slate-400">
              {isDlp
                ? 'Current DSKP Selection Summary:'
                : 'Ringkasan Pilihan DSKP Semasa:'}
            </p>
            <p className="text-sm font-bold text-white">
              {rph.babTajuk} • SK {rph.skKod} • SP ({rph.spKod.join(', ')})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onPrev}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isDlp ? 'Back' : 'Kembali'}</span>
          </button>
          <button
            type="button"
            onClick={onNext}
            className={`px-6 py-2 rounded-xl ${
              isPink
                ? 'bg-pink-500 hover:bg-pink-400 text-white shadow-pink-500/25'
                : isAmber
                ? 'bg-amber-500 hover:bg-amber-400 text-white shadow-amber-500/25'
                : isTurquoise
                ? 'bg-teal-500 hover:bg-teal-400 text-white shadow-teal-500/25'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
            } font-bold text-xs transition flex items-center gap-1.5 shadow-sm`}
          >
            <span>
              {isDlp ? 'Next: SMART Objectives' : 'Seterusnya: Objektif SMART'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
