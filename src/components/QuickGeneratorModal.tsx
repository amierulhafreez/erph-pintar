import React, { useState, useMemo, useEffect } from 'react';
import {
  getDskpByBahasa,
  getTingkatanListBySubjek,
} from '../data/dskpKimia';
import { Tingkatan, RPHData, BahasaRPH, SubjekRPH } from '../types/rph';
import { binaRPHDariMultiSp } from '../utils/rphStorage';
import {
  Zap,
  X,
  FlaskConical,
  Atom,
  Dna,
  Calculator,
  Binary,
  CheckCircle2,
  ArrowRight,
  CheckSquare,
  Square,
} from 'lucide-react';

interface QuickGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRph: (rph: RPHData) => void;
  currentInfo: RPHData['info'];
  currentSubjek?: SubjekRPH;
  portalSubject?: string;
  currentModelPdpc?: RPHData['modelPdpc'];
  currentBahasa?: BahasaRPH;
  currentCompact?: boolean;
}

export const QuickGeneratorModal: React.FC<QuickGeneratorModalProps> = ({
  isOpen,
  onClose,
  onApplyRph,
  currentInfo,
  currentSubjek = 'Kimia',
  portalSubject = 'kimia',
  currentModelPdpc,
  currentBahasa = 'BM',
  currentCompact = false,
}) => {
  const [subjek, setSubjek] = useState<SubjekRPH>(currentSubjek);
  const [bahasa, setBahasa] = useState<BahasaRPH>(currentBahasa);
  const [isCompact, setIsCompact] = useState<boolean>(currentCompact);
  const [tingkatan, setTingkatan] = useState<Tingkatan>(currentInfo.tingkatan);
  const [kehadiranMurid, setKehadiranMurid] = useState<string>(
    currentInfo.kehadiranMurid || `${currentInfo.bilanganMurid || 30} / ${currentInfo.bilanganMurid || 30}`
  );
  const [selectedBabId, setSelectedBabId] = useState<string>('');
  const [selectedSkKod, setSelectedSkKod] = useState<string>('');
  const [selectedSpKods, setSelectedSpKods] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      const initialSubj: SubjekRPH =
        portalSubject === 'biologi'
          ? (currentSubjek === 'Sains' ? 'Sains' : 'Biologi')
          : portalSubject === 'fizik'
          ? (currentSubjek === 'Sains' ? 'Sains' : 'Fizik')
          : portalSubject === 'matematik'
          ? (currentSubjek === 'Sains' ? 'Sains' : 'Matematik')
          : portalSubject === 'matematik-tambahan'
          ? 'Matematik Tambahan'
          : portalSubject === 'sains'
          ? 'Sains'
          : (currentSubjek === 'Sains' ? 'Sains' : 'Kimia');

      setSubjek(initialSubj);
      setBahasa(currentBahasa);
      setIsCompact(currentCompact);
      setKehadiranMurid(
        currentInfo.kehadiranMurid || `${currentInfo.bilanganMurid || 30} / ${currentInfo.bilanganMurid || 30}`
      );
      const validForms = getTingkatanListBySubjek(initialSubj);
      setTingkatan(validForms.includes(currentInfo.tingkatan) ? currentInfo.tingkatan : validForms[0]);
    }
  }, [isOpen, portalSubject, currentSubjek, currentBahasa, currentCompact, currentInfo.tingkatan, currentInfo.kehadiranMurid, currentInfo.bilanganMurid]);

  const tingkatanOptions = useMemo(
    () => getTingkatanListBySubjek(subjek),
    [subjek]
  );

  const dskpList = useMemo(
    () => getDskpByBahasa(bahasa, subjek),
    [bahasa, subjek]
  );

  const babList = useMemo(() => {
    return dskpList.filter((b) => b.tingkatan === tingkatan);
  }, [dskpList, tingkatan]);

  // Pre-select first bab, sk and sp for truly 30s quick generation
  useEffect(() => {
    if (isOpen && babList.length > 0) {
      const exists = babList.some((b) => b.id === selectedBabId);
      if (!selectedBabId || !exists) {
        const first = babList.find((b) => !b.isProgramKhas) || babList[0];
        setSelectedBabId(first.id);
        const firstSk = first.skList[0];
        if (firstSk) {
          setSelectedSkKod(firstSk.kod);
          setSelectedSpKods(firstSk.spList[0] ? [firstSk.spList[0].kod] : []);
        }
      }
    }
  }, [isOpen, babList, selectedBabId]);

  const activeBab = useMemo(() => {
    if (!selectedBabId) return null;
    return babList.find((b) => b.id === selectedBabId) || null;
  }, [babList, selectedBabId]);

  const activeSk = useMemo(() => {
    if (!activeBab || !selectedSkKod) return null;
    return activeBab.skList.find((s) => s.kod === selectedSkKod) || null;
  }, [activeBab, selectedSkKod]);

  if (!isOpen) return null;

  const handleToggleSp = (kod: string) => {
    setSelectedSpKods((prev) => {
      if (prev.includes(kod)) {
        const filtered = prev.filter((k) => k !== kod);
        return filtered.length > 0 ? filtered : [kod];
      }
      return [...prev, kod];
    });
  };

  const handleGenerate = () => {
    if (!activeBab || !activeSk) return;
    const chosenSpObjects = activeSk.spList.filter((sp) =>
      selectedSpKods.includes(sp.kod)
    );
    const finalSpObjects =
      chosenSpObjects.length > 0 ? chosenSpObjects : [activeSk.spList[0]];

    const parts = kehadiranMurid.split('/');
    const bil =
      parts.length > 1
        ? parseInt(parts[1].trim(), 10) || currentInfo.bilanganMurid || 30
        : parseInt(kehadiranMurid.trim(), 10) || currentInfo.bilanganMurid || 30;
    const finalKeh = kehadiranMurid.trim() || `${bil} / ${bil}`;

    const readyRph = binaRPHDariMultiSp(
      activeBab,
      activeSk,
      finalSpObjects,
      {
        ...currentInfo,
        subjek,
        tingkatan,
        kehadiranMurid: finalKeh,
        bilanganMurid: bil,
      },
      currentModelPdpc,
      bahasa,
      isCompact,
      subjek
    );
    onApplyRph(readyRph);
    onClose();
  };

  const isSingleSubj = portalSubject === 'sains' || portalSubject === 'matematik-tambahan' || portalSubject === 'matematik';

  const btnClass =
    portalSubject === 'biologi'
      ? 'apple-btn-pink'
      : portalSubject === 'fizik'
      ? 'apple-btn-amber'
      : portalSubject === 'sains'
      ? 'apple-btn-icy'
      : portalSubject === 'matematik'
      ? 'apple-btn-indigo'
      : portalSubject === 'matematik-tambahan'
      ? 'apple-btn-charcoal'
      : 'apple-btn-emerald';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xl animate-in fade-in">
      <div className="glass-panel rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-white/80 ring-1 ring-black/5 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/30">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Mod Pantas 30 Saat (Quick RPH)
              </h3>
              <p className="text-xs text-slate-500">
                Pilih Subjek ({subjek}), Kehadiran, Topik → SK → SP &amp; jana terus dalam 30 saat.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-white/80 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subjek, Kehadiran, Bahasa & Saiz Cetakan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Mata Pelajaran
            </label>
            <div className={`grid ${isSingleSubj ? 'grid-cols-1' : 'grid-cols-2'} gap-1.5`}>
              {portalSubject === 'sains' ? (
                <button
                  type="button"
                  className="py-1.5 px-2 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1 bg-sky-600 text-white border-sky-600 cursor-default"
                >
                  <Atom className="w-3 h-3" />
                  <span>Sains</span>
                </button>
              ) : portalSubject === 'matematik' ? (
                <button
                  type="button"
                  className="py-1.5 px-2 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1 bg-indigo-700 text-white border-indigo-700 cursor-default"
                >
                  <Calculator className="w-3 h-3" />
                  <span>Matematik</span>
                </button>
              ) : portalSubject === 'matematik-tambahan' ? (
                <button
                  type="button"
                  className="py-1.5 px-2 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1 bg-slate-800 text-white border-slate-800 cursor-default"
                >
                  <Binary className="w-3 h-3" />
                  <span>Add Math</span>
                </button>
              ) : (
                <>
                  {portalSubject === 'biologi' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSubjek('Biologi');
                        if (
                          tingkatan === 'Tingkatan 2' ||
                          tingkatan === 'Tingkatan 3'
                        ) {
                          setTingkatan('Tingkatan 4');
                        }
                        setSelectedBabId('');
                        setSelectedSkKod('');
                        setSelectedSpKods([]);
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1 cursor-pointer ${
                        subjek === 'Biologi'
                          ? 'bg-[#ab4f6c] text-white border-[#ab4f6c] shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Dna className="w-3 h-3" />
                      <span>Biologi</span>
                    </button>
                  ) : portalSubject === 'fizik' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSubjek('Fizik');
                        if (
                          tingkatan === 'Tingkatan 2' ||
                          tingkatan === 'Tingkatan 3'
                        ) {
                          setTingkatan('Tingkatan 4');
                        }
                        setSelectedBabId('');
                        setSelectedSkKod('');
                        setSelectedSpKods([]);
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1 cursor-pointer ${
                        subjek === 'Fizik'
                          ? 'bg-[#ab5e19] text-white border-[#ab5e19] shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Atom className="w-3 h-3" />
                      <span>Fizik</span>
                    </button>
                  ) : portalSubject === 'matematik' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSubjek('Matematik');
                        setSelectedBabId('');
                        setSelectedSkKod('');
                        setSelectedSpKods([]);
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1 cursor-pointer ${
                        subjek === 'Matematik'
                          ? 'bg-indigo-700 text-white border-indigo-700 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Calculator className="w-3 h-3" />
                      <span>Matematik</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setSubjek('Kimia');
                        if (
                          tingkatan === 'Tingkatan 2' ||
                          tingkatan === 'Tingkatan 3'
                        ) {
                          setTingkatan('Tingkatan 4');
                        }
                        setSelectedBabId('');
                        setSelectedSkKod('');
                        setSelectedSpKods([]);
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1 cursor-pointer ${
                        subjek === 'Kimia'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <FlaskConical className="w-3 h-3" />
                      <span>Kimia</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSubjek('Sains');
                      setSelectedBabId('');
                      setSelectedSkKod('');
                      setSelectedSpKods([]);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1 cursor-pointer ${
                      subjek === 'Sains'
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Atom className="w-3 h-3" />
                    <span>Sains</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Kehadiran Pelajar
            </label>
            <input
              type="text"
              value={kehadiranMurid}
              onChange={(e) => setKehadiranMurid(e.target.value)}
              placeholder="cth: 30 / 30"
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Bahasa RPH
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setBahasa('BM')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                  bahasa === 'BM'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                BM
              </button>
              <button
                type="button"
                onClick={() => setBahasa('DLP')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                  bahasa === 'DLP'
                    ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                DLP (Eng)
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Format Pratonton
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setIsCompact(false)}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                  !isCompact
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setIsCompact(true)}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                  isCompact
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Compact 1-M/S
              </button>
            </div>
          </div>
        </div>

        {/* 1. Tingkatan selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            1. Pilih Tingkatan ({subjek} KSSM {tingkatanOptions.length === 4 ? 'T2–T5' : 'T4–T5'})
          </label>
          <div className={`grid gap-2 ${tingkatanOptions.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'}`}>
            {tingkatanOptions.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => {
                  setTingkatan(t);
                  setSelectedBabId('');
                  setSelectedSkKod('');
                  setSelectedSpKods([]);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  tingkatan === t
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Chapter selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            2. Pilih Bab / Topik / Program Khas (Ulangkaji / Slot Gemilang / Mumtaz)
          </label>
          <select
            value={selectedBabId}
            onChange={(e) => {
              const bId = e.target.value;
              setSelectedBabId(bId);
              const bObj = babList.find((b) => b.id === bId);
              const firstSk = bObj?.skList?.[0];
              setSelectedSkKod(firstSk?.kod || '');
              setSelectedSpKods(firstSk?.spList?.[0] ? [firstSk.spList[0].kod] : []);
            }}
            className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/70 font-semibold text-slate-900 cursor-pointer"
          >
            <option value="">-- Sila Pilih Bab / Program Khas --</option>
            {babList.map((bab) => (
              <option key={bab.id} value={bab.id}>
                {bab.isProgramKhas
                  ? `★ ${bab.tajuk}`
                  : `Bab ${bab.nomborBab}: ${bab.tajuk} (${bab.tema})`}
              </option>
            ))}
          </select>
        </div>

        {/* 3. SK selector */}
        {activeBab && (
          <div className="space-y-1.5 animate-in fade-in">
            <label className="text-xs font-bold text-slate-700">
              3. Pilih Standard Kandungan (SK)
            </label>
            <select
              value={selectedSkKod}
              onChange={(e) => {
                const skKod = e.target.value;
                setSelectedSkKod(skKod);
                const skObj = activeBab.skList.find((s) => s.kod === skKod);
                if (skObj && skObj.spList.length > 0) {
                  setSelectedSpKods([skObj.spList[0].kod]);
                } else {
                  setSelectedSpKods([]);
                }
              }}
              className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/70 font-semibold text-slate-900 cursor-pointer"
            >
              <option value="">-- Sila Pilih Standard Kandungan (SK) --</option>
              {activeBab.skList.map((sk) => (
                <option key={sk.kod} value={sk.kod}>
                  SK {sk.kod} — {sk.tajuk} ({sk.spList.length} SP)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 4. Multi-SP selector */}
        {activeBab && activeSk && (
          <div className="space-y-1.5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                4. Pilih Standard Pembelajaran (SP) — Boleh Pilih &gt;1
              </label>
              <button
                type="button"
                onClick={() =>
                  setSelectedSpKods(activeSk.spList.map((s) => s.kod))
                }
                className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Pilih Semua ({activeSk.spList.length})
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1.5 border border-slate-200 rounded-xl p-2 bg-slate-50/50">
              {activeSk.spList.map((sp) => {
                const isSelected = selectedSpKods.includes(sp.kod);
                return (
                  <div
                    key={sp.kod}
                    onClick={() => handleToggleSp(sp.kod)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer transition flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-950 ring-1 ring-emerald-500/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="mt-0.5 text-emerald-600 flex-shrink-0">
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 fill-emerald-600 text-white" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-emerald-700 font-extrabold">
                          SP {sp.kod}
                        </span>
                        {sp.eksperimenWajib && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded-md font-bold">
                            <FlaskConical className="w-3 h-3" />
                            Amali Wajib
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 line-clamp-2">{sp.tajuk}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Summary Box */}
        {activeBab && activeSk && selectedSpKods.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                Sedia Dijana ({selectedSpKods.length} SP •{' '}
                {bahasa === 'DLP' ? 'DLP English' : 'Bahasa Melayu'} • Kehadiran: {kehadiranMurid} •{' '}
                {isCompact ? 'Compact 1 Muka Surat' : 'Standard'}):
              </span>
            </p>
            <p className="text-slate-600 pl-5">
              Objektif SMART, Kriteria Kejayaan, Aktiviti, BBM {subjek}, PAK-21,
              KBAT &amp; Refleksi akan digabungkan secara automatik.
            </p>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/50">
          <button
            type="button"
            onClick={onClose}
            className="apple-btn-glass px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={!activeBab || !activeSk || selectedSpKods.length === 0}
            onClick={handleGenerate}
            className={`${btnClass} inline-flex items-center gap-2 px-5 py-2.5 rounded-xl disabled:opacity-50 text-white text-xs font-extrabold shadow-lg transition cursor-pointer`}
          >
            <Zap className="w-4 h-4 fill-current text-amber-300" />
            <span>Jana RPH Lengkap Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

