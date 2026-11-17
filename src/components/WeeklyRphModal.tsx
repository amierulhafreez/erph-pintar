import React, { useState, useMemo, useEffect } from 'react';
import {
  RPHData,
  Tingkatan,
  BahasaRPH,
  ModelPdpc,
  SlotJadualWaktu,
  SubjekRPH,
} from '../types/rph';
import {
  getDskpByBahasa,
  getTingkatanListBySubjek,
} from '../data/dskpKimia';
import {
  binaRPHDariMultiSp,
  muatSlotJadualWaktu,
  muatTurunRPHMingguanWord,
  muatTurunRPHMingguanSpreadsheet,
  simpanRPH,
} from '../utils/rphStorage';
import {
  simpanRPHKeCloud,
  logAktivitiPenggunaan,
} from '../services/firebase';
import {
  CalendarRange,
  X,
  Plus,
  Trash2,
  FileDown,
  FileSpreadsheet,
  Bookmark,
  CheckCircle2,
  Eye,
  Sparkles,
  Clock,
  Layers,
  CheckSquare,
  Square,
  BookOpen,
  FlaskConical,
  Check,
  ChevronRight,
} from 'lucide-react';

function normalizeSubjekForPortal(rawSubjek: any, portalSubj: SubjekRPH): SubjekRPH {
  const str = String(rawSubjek || '').trim().toLowerCase();
  if (portalSubj === 'Matematik') return 'Matematik';
  if (portalSubj === 'Matematik Tambahan') return 'Matematik Tambahan';
  if (portalSubj === 'Sains') return 'Sains';
  // For Kimia, Biologi, Fizik portals:
  // Allow Sains only if explicitly saved as Sains
  if (str === 'sains' || str.includes('sains')) {
    return 'Sains';
  }
  // Otherwise strictly lock to the portal's major subject
  return portalSubj;
}

function normalizeSubjek(rawSubjek: any, tingkatanHint?: any, defaultSubjek: SubjekRPH = 'Kimia'): SubjekRPH {
  return normalizeSubjekForPortal(rawSubjek, defaultSubjek);
}

function normalizeTingkatan(raw: any, subjek: SubjekRPH = 'Kimia'): Tingkatan {
  const str = String(raw || '').trim().toLowerCase();
  if (str.includes('5')) return 'Tingkatan 5';
  if (str.includes('4')) return 'Tingkatan 4';
  if (str.includes('3')) return (subjek === 'Sains' || subjek === 'Matematik') ? 'Tingkatan 3' : 'Tingkatan 4';
  if (str.includes('2')) return (subjek === 'Sains' || subjek === 'Matematik') ? 'Tingkatan 2' : 'Tingkatan 4';
  if (str.includes('1')) return (subjek === 'Sains' || subjek === 'Matematik') ? 'Tingkatan 2' : 'Tingkatan 4';
  return (subjek === 'Sains' || subjek === 'Matematik') ? 'Tingkatan 2' : 'Tingkatan 4';
}

interface WeeklyRphModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseRph: RPHData;
  portalSubject?: string;
  onInspectRph: (rph: RPHData) => void;
  onSavedBatch: () => void;
}

interface WeeklySlotRow {
  id: string;
  hari: string;
  tarikh: string;
  subjek: SubjekRPH;
  tingkatan: Tingkatan;
  kelas: string;
  masaMula: string;
  masaTamat: string;
  bilanganMurid: string;
  kehadiranMurid?: string;
  babId: string;
  skKod: string;
  spKod: string[];
}

export const WeeklyRphModal: React.FC<WeeklyRphModalProps> = ({
  isOpen,
  onClose,
  baseRph,
  portalSubject = 'kimia',
  onInspectRph,
  onSavedBatch,
}) => {
  const activePortalSubj: SubjekRPH = useMemo(() => {
    switch (portalSubject) {
      case 'biologi':
        return 'Biologi';
      case 'fizik':
        return 'Fizik';
      case 'sains':
        return 'Sains';
      case 'matematik':
        return 'Matematik';
      case 'matematik-tambahan':
        return 'Matematik Tambahan';
      default:
        return 'Kimia';
    }
  }, [portalSubject]);

  const [subjek, setSubjek] = useState<SubjekRPH>(activePortalSubj);
  const [bahasa, setBahasa] = useState<BahasaRPH>(baseRph.bahasa || 'BM');
  const [isCompact, setIsCompact] = useState<boolean>(!!baseRph.isCompact);
  const [modelPdpc, setModelPdpc] = useState<ModelPdpc>(baseRph.modelPdpc);
  const [mingguAkademik, setMingguAkademik] = useState<string>(
    String(baseRph.info.mingguAkademik || 12)
  );
  const [slots, setSlots] = useState<WeeklySlotRow[]>([]);
  const [generatedRphs, setGeneratedRphs] = useState<RPHData[] | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [activeLessonPickerSlotIndex, setActiveLessonPickerSlotIndex] = useState<number | null>(null);

  const theme = useMemo(() => {
    switch (portalSubject) {
      case 'biologi':
        return {
          headerBg: 'bg-gradient-to-r from-[#83334d] via-[#9c3d5d] to-slate-900',
          accentText: 'text-[#ab4f6c]',
          badgeBg: 'bg-pink-100 text-pink-900 border-pink-200',
          btnClass: 'apple-btn-pink',
          activeTab: 'bg-[#ab4f6c] text-white border-[#ab4f6c]',
          cardBorder: 'border-pink-200/80',
          ringFocus: 'focus:ring-pink-500',
        };
      case 'fizik':
        return {
          headerBg: 'bg-gradient-to-r from-[#994f11] via-[#ab5e19] to-slate-900',
          accentText: 'text-[#ab5e19]',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
          btnClass: 'apple-btn-amber',
          activeTab: 'bg-[#ab5e19] text-white border-[#ab5e19]',
          cardBorder: 'border-amber-200/80',
          ringFocus: 'focus:ring-amber-500',
        };
      case 'sains':
        return {
          headerBg: 'bg-gradient-to-r from-sky-800 via-cyan-800 to-slate-900',
          accentText: 'text-sky-700',
          badgeBg: 'bg-sky-100 text-sky-900 border-sky-200',
          btnClass: 'apple-btn-icy',
          activeTab: 'bg-sky-600 text-white border-sky-600',
          cardBorder: 'border-sky-200/80',
          ringFocus: 'focus:ring-sky-500',
        };
      case 'matematik':
        return {
          headerBg: 'bg-gradient-to-r from-[#312e81] via-[#3730a3] to-slate-900',
          accentText: 'text-indigo-700',
          badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-200',
          btnClass: 'apple-btn-indigo',
          activeTab: 'bg-indigo-600 text-white border-indigo-600',
          cardBorder: 'border-indigo-200/80',
          ringFocus: 'focus:ring-indigo-500',
        };
      case 'matematik-tambahan':
        return {
          headerBg: 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950',
          accentText: 'text-slate-800',
          badgeBg: 'bg-slate-200 text-slate-900 border-slate-300',
          btnClass: 'apple-btn-charcoal',
          activeTab: 'bg-slate-800 text-white border-slate-800',
          cardBorder: 'border-slate-300/80',
          ringFocus: 'focus:ring-slate-500',
        };
      default: // kimia
        return {
          headerBg: 'bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900',
          accentText: 'text-emerald-700',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          btnClass: 'apple-btn-emerald',
          activeTab: 'bg-emerald-600 text-white border-emerald-600',
          cardBorder: 'border-emerald-200/80',
          ringFocus: 'focus:ring-emerald-500',
        };
    }
  }, [portalSubject]);

  const tingkatanOptions = useMemo(
    () => getTingkatanListBySubjek(subjek),
    [subjek]
  );
  const dskpList = useMemo(
    () => getDskpByBahasa(bahasa, subjek),
    [bahasa, subjek]
  );

  // Initialize default 3 slots in a week (or from AI timetable if available)
  useEffect(() => {
    if (!isOpen) return;
    setSubjek(activePortalSubj);
    setBahasa(baseRph.bahasa || 'BM');
    setIsCompact(!!baseRph.isCompact);
    setModelPdpc(baseRph.modelPdpc);
    setMingguAkademik(String(baseRph.info.mingguAkademik || 12));

    const savedTimetable: SlotJadualWaktu[] = muatSlotJadualWaktu();

    const baseDate = new Date(baseRph.info.tarikh || new Date());
    const addDays = (days: number) => {
      const d = new Date(baseDate);
      if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
      d.setDate(d.getDate() + days);
      return d.toISOString().split('T')[0];
    };

    if (savedTimetable.length > 0) {
      const dayOffsetMap: Record<string, number> = {
        Isnin: 0,
        Selasa: 1,
        Rabu: 2,
        Khamis: 3,
        Jumaat: 4,
        Sabtu: 5,
        Ahad: 6,
      };
      const initialRows: WeeklySlotRow[] = savedTimetable.map((st, idx) => {
        const slotSubjek = normalizeSubjekForPortal(st.subjek, activePortalSubj);
        const normTing = normalizeTingkatan(st.tingkatan, slotSubjek);
        const slotDskp = getDskpByBahasa(bahasa, slotSubjek);
        const b =
          slotDskp.find((chap) => chap.tingkatan === normTing && !chap.isProgramKhas) ||
          slotDskp.find((chap) => chap.tingkatan === normTing) ||
          slotDskp[0];
        const sk = b?.skList?.[0] || { kod: '', tajuk: '', spList: [] };
        const sp = sk?.spList?.[0];
        const dayOffset = dayOffsetMap[st.hari] ?? idx;
        const bil = String((st as any).bilanganMurid || baseRph.info.bilanganMurid || 30);
        const keh = (st as any).kehadiranMurid || baseRph.info.kehadiranMurid || `${bil} / ${bil}`;
        return {
          id: `wk_${idx}_${Date.now()}`,
          hari: st.hari || 'Isnin',
          tarikh: addDays(dayOffset),
          subjek: slotSubjek,
          tingkatan: normTing,
          kelas: st.kelas || (slotSubjek === 'Sains' ? `${normTing.replace('Tingkatan ', '')} IQ` : (normTing.includes('5') ? '5 Sains 1' : '4 Sains 1')),
          masaMula: st.masaMula || '08:00',
          masaTamat: st.masaTamat || '09:00',
          bilanganMurid: bil,
          kehadiranMurid: keh,
          babId: b?.id || '',
          skKod: sk?.kod || '',
          spKod: sp?.kod ? [sp.kod] : [],
        };
      });
      setSlots(initialRows);
    } else {
      const defaultSubjek = activePortalSubj;
      let t1: Tingkatan = 'Tingkatan 4';
      let t2: Tingkatan = 'Tingkatan 4';
      let t3: Tingkatan = 'Tingkatan 5';

      let kelas1 = '4 Sains 1';
      let kelas2 = '4 Sains 2';
      let kelas3 = '5 Sains 1';

      if (defaultSubjek === 'Sains') {
        t1 = 'Tingkatan 2';
        t2 = 'Tingkatan 2';
        t3 = 'Tingkatan 3';
        kelas1 = '2 IQ';
        kelas2 = '2 IK';
        kelas3 = '3 IQ';
      } else if (defaultSubjek === 'Matematik') {
        t1 = 'Tingkatan 2';
        t2 = 'Tingkatan 3';
        t3 = 'Tingkatan 4';
        kelas1 = '2 Alpha';
        kelas2 = '3 Alpha';
        kelas3 = '4 Alpha';
      } else if (defaultSubjek === 'Matematik Tambahan') {
        t1 = 'Tingkatan 4';
        t2 = 'Tingkatan 4';
        t3 = 'Tingkatan 5';
        kelas1 = '4 Ibnu Sina';
        kelas2 = '4 Al-Farabi';
        kelas3 = '5 Ibnu Sina';
      } else if (defaultSubjek === 'Biologi') {
        t1 = 'Tingkatan 4';
        t2 = 'Tingkatan 4';
        t3 = 'Tingkatan 5';
        kelas1 = '4 Biologi 1';
        kelas2 = '4 Biologi 2';
        kelas3 = '5 Biologi 1';
      } else if (defaultSubjek === 'Fizik') {
        t1 = 'Tingkatan 4';
        t2 = 'Tingkatan 4';
        t3 = 'Tingkatan 5';
        kelas1 = '4 Fizik 1';
        kelas2 = '4 Fizik 2';
        kelas3 = '5 Fizik 1';
      }

      const slotDskp = getDskpByBahasa(bahasa, defaultSubjek);
      const formChaps1 = slotDskp.filter((b) => b.tingkatan === t1 && !b.isProgramKhas);
      const b1 = formChaps1[0] || slotDskp[0];
      const sk1 = b1?.skList?.[0] || { kod: '', tajuk: '', spList: [] };
      const sp1 = sk1?.spList?.[0];

      const formChaps2 = slotDskp.filter((b) => b.tingkatan === t2 && !b.isProgramKhas);
      const b2 = formChaps2[1] || formChaps2[0] || b1;
      const sk2 = b2?.skList?.[0] || sk1;
      const sp2 = sk2?.spList?.[0] || sp1;

      const formChaps3 = slotDskp.filter((b) => b.tingkatan === t3 && !b.isProgramKhas);
      const b3 = formChaps3[0] || slotDskp.filter((b) => b.tingkatan === t3)[0] || b1;
      const sk3 = b3?.skList?.[0] || sk1;
      const sp3 = sk3?.spList?.[0] || sp1;

      setSlots([
        {
          id: 'wk_1',
          hari: 'Isnin',
          tarikh: addDays(0),
          subjek: defaultSubjek,
          tingkatan: t1,
          kelas: baseRph.info.subjek === defaultSubjek && baseRph.info.kelas ? baseRph.info.kelas : kelas1,
          masaMula: '08:00',
          masaTamat: '09:00',
          bilanganMurid: String(baseRph.info.bilanganMurid || 30),
          kehadiranMurid: baseRph.info.kehadiranMurid || `${baseRph.info.bilanganMurid || 30} / ${baseRph.info.bilanganMurid || 30}`,
          babId: b1.id,
          skKod: sk1.kod,
          spKod: sp1?.kod ? [sp1.kod] : [],
        },
        {
          id: 'wk_2',
          hari: 'Rabu',
          tarikh: addDays(2),
          subjek: defaultSubjek,
          tingkatan: t2,
          kelas: kelas2,
          masaMula: '10:30',
          masaTamat: '11:30',
          bilanganMurid: '28',
          kehadiranMurid: '28 / 28',
          babId: b2.id,
          skKod: sk2.kod,
          spKod: sp2?.kod ? [sp2.kod] : [],
        },
        {
          id: 'wk_3',
          hari: 'Khamis',
          tarikh: addDays(3),
          subjek: defaultSubjek,
          tingkatan: t3,
          kelas: kelas3,
          masaMula: '09:00',
          masaTamat: '10:00',
          bilanganMurid: '32',
          kehadiranMurid: '32 / 32',
          babId: b3.id,
          skKod: sk3.kod,
          spKod: sp3?.kod ? [sp3.kod] : [],
        },
      ]);
    }
    setGeneratedRphs(null);
  }, [isOpen, portalSubject, bahasa, activePortalSubj]);

  if (!isOpen) return null;

  const updateSlot = (index: number, patch: Partial<WeeklySlotRow>) => {
    setSlots((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...patch };
      return updated;
    });
    setGeneratedRphs(null);
  };

  const handleApplyGlobalSubjek = (newSubjek: SubjekRPH) => {
    setSubjek(newSubjek);
    setSlots((prev) =>
      prev.map((slot) => {
        const nextTingOptions = getTingkatanListBySubjek(newSubjek);
        const nextTing = nextTingOptions.includes(slot.tingkatan)
          ? slot.tingkatan
          : nextTingOptions[0];
        const nextDskp = getDskpByBahasa(bahasa, newSubjek);
        const nextBabList = nextDskp.filter((b) => b.tingkatan === nextTing);
        const firstB =
          nextBabList.find((b) => !b.isProgramKhas) ||
          nextBabList[0] ||
          nextDskp[0];
        const firstSk = firstB?.skList?.[0];
        const firstSp = firstSk?.spList?.[0];
        return {
          ...slot,
          subjek: newSubjek,
          tingkatan: nextTing,
          babId: firstB?.id || '',
          skKod: firstSk?.kod || '',
          spKod: firstSp?.kod ? [firstSp.kod] : [],
        };
      })
    );
    setGeneratedRphs(null);
  };

  const handleAddSlot = () => {
    const lastSlot = slots[slots.length - 1];
    const slotSubjek: SubjekRPH = (portalSubject === 'matematik' || portalSubject === 'matematik-tambahan' || portalSubject === 'sains')
      ? activePortalSubj
      : (lastSlot ? lastSlot.subjek : subjek);
    const defaultTing: Tingkatan = (slotSubjek === 'Sains' || slotSubjek === 'Matematik') ? 'Tingkatan 2' : 'Tingkatan 4';
    const slotDskp = getDskpByBahasa(bahasa, slotSubjek);
    const firstBab =
      slotDskp.find((b) => b.tingkatan === defaultTing && !b.isProgramKhas) ||
      slotDskp.find((b) => b.tingkatan === defaultTing) ||
      slotDskp[0];
    const firstSk = firstBab?.skList?.[0];
    const firstSp = firstSk?.spList?.[0];
    setSlots((prev) => [
      ...prev,
      {
        id: `wk_${Date.now()}`,
        hari: 'Jumaat',
        tarikh: baseRph.info.tarikh,
        subjek: slotSubjek,
        tingkatan: defaultTing,
        kelas: slotSubjek === 'Sains' ? `${defaultTing.replace('Tingkatan ', '')} IQ` : (slotSubjek === 'Matematik' ? `${defaultTing.replace('Tingkatan ', '')} Alpha` : '4 Sains 1'),
        masaMula: '08:00',
        masaTamat: '09:00',
        bilanganMurid: '30',
        kehadiranMurid: '30 / 30',
        babId: firstBab?.id || '',
        skKod: firstSk?.kod || '',
        spKod: firstSp?.kod ? [firstSp.kod] : [],
      },
    ]);
    setGeneratedRphs(null);
  };

  const handleRemoveSlot = (index: number) => {
    if (slots.length <= 1) return;
    setSlots((prev) => prev.filter((_, i) => i !== index));
    setGeneratedRphs(null);
  };

  const handleGenerateWeeklyBatch = () => {
    const builtList: RPHData[] = [];

    slots.forEach((slot) => {
      const slotSubjek: SubjekRPH = (portalSubject === 'matematik' || portalSubject === 'matematik-tambahan' || portalSubject === 'sains')
        ? activePortalSubj
        : (slot.subjek || subjek);
      const slotDskp = getDskpByBahasa(bahasa, slotSubjek);
      const normTing = normalizeTingkatan(slot.tingkatan, slotSubjek);
      let babOptions = slotDskp.filter((b) => b.tingkatan === normTing);
      if (babOptions.length === 0) {
        babOptions = slotDskp.filter((b) =>
          b.tingkatan.toLowerCase().includes(normTing.toLowerCase().replace('tingkatan ', ''))
        );
      }
      if (babOptions.length === 0) babOptions = slotDskp;

      const bab =
        babOptions.find((b) => b.id === slot.babId) ||
        slotDskp.find((b) => b.id === slot.babId) ||
        babOptions.find((b) => !b.isProgramKhas) ||
        babOptions[0];

      const skOptions = bab ? bab.skList : [];
      const sk =
        skOptions.find((s) => s.kod === slot.skKod) ||
        skOptions[0] || { kod: '', tajuk: '', spList: [] };

      // Multi-SP support
      const spCodes = Array.isArray(slot.spKod)
        ? slot.spKod
        : [slot.spKod].filter(Boolean);

      const spList = sk.spList.filter((s) => spCodes.includes(s.kod));
      const finalSpList = spList.length > 0 ? spList : (sk.spList[0] ? [sk.spList[0]] : []);

      const [h1, m1] = (slot.masaMula || '08:00').split(':').map(Number);
      const [h2, m2] = (slot.masaTamat || '09:00').split(':').map(Number);
      const diffMins = (h2 * 60 + m2) - (h1 * 60 + m1);

      const bil = Number(slot.bilanganMurid) || 30;
      const keh = slot.kehadiranMurid || `${bil} / ${bil}`;

      const slotInfo: RPHData['info'] = {
        ...baseRph.info,
        mingguAkademik: Number(mingguAkademik) || 12,
        tarikh: slot.tarikh,
        hari: slot.hari,
        tingkatan: normTing,
        kelas: slot.kelas,
        masaMula: slot.masaMula,
        masaTamat: slot.masaTamat,
        tempohMinit: diffMins > 0 ? diffMins : 60,
        bilanganMurid: bil,
        kehadiranMurid: keh,
        kelasTambahan: [],
        subjek: slotSubjek,
      };

      const rphItem = binaRPHDariMultiSp(
        bab,
        sk,
        finalSpList,
        { ...slotInfo, subjek: slotSubjek },
        modelPdpc,
        bahasa,
        isCompact,
        slotSubjek
      );
      builtList.push(rphItem);
    });

    setGeneratedRphs(builtList);
    logAktivitiPenggunaan(
      'JANA_RPH',
      `Jana RPH Seminggu (${builtList.length} sesi kelas) - Minggu ${mingguAkademik}`,
      baseRph.info.namaSekolah
    );
  };

  const handleSaveAllWeekly = async () => {
    if (!generatedRphs) return;
    for (const item of generatedRphs) {
      simpanRPH(item);
      await simpanRPHKeCloud(item);
    }
    onSavedBatch();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleDownloadWeeklyWord = () => {
    if (!generatedRphs) return;
    const subjekSummary = Array.from(new Set(slots.map((s) => s.subjek || subjek))).join('_');
    muatTurunRPHMingguanWord(
      generatedRphs,
      `RPH_${subjekSummary}_Minggu_${mingguAkademik}_${bahasa}`
    );
  };

  const handleDownloadWeeklySpreadsheet = () => {
    if (!generatedRphs) return;
    const subjekSummary = Array.from(new Set(slots.map((s) => s.subjek || subjek))).join('_');
    muatTurunRPHMingguanSpreadsheet(
      generatedRphs,
      `RPH_${subjekSummary}_Minggu_${mingguAkademik}_${bahasa}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xl animate-in fade-in">
      <div className="glass-panel rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-white/60 ring-1 ring-black/5 overflow-hidden">
        {/* Header */}
        <div className={`p-5 border-b border-white/20 flex items-center justify-between gap-3 ${theme.headerBg} text-white rounded-t-3xl backdrop-blur-xl`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <CalendarRange className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <span>Penjana RPH Seminggu Pintar ({activePortalSubj})</span>
              </h3>
              <p className="text-xs text-white/90">
                Sediakan 2 hingga 5 RPH kelas seminggu serentak dan muat turun
                dalam satu fail Word lengkap.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Global Settings Row */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Tukar Semua Subjek
              </label>
              <div className={`grid ${portalSubject === 'sains' || portalSubject === 'matematik' || portalSubject === 'matematik-tambahan' ? 'grid-cols-1' : 'grid-cols-2'} gap-1.5`}>
                {portalSubject === 'sains' ? (
                  <button
                    type="button"
                    className={`py-2 rounded-lg font-bold border transition ${theme.activeTab} cursor-default`}
                  >
                    Sains
                  </button>
                ) : portalSubject === 'matematik' ? (
                  <button
                    type="button"
                    className={`py-2 rounded-lg font-bold border transition ${theme.activeTab} cursor-default`}
                  >
                    Matematik
                  </button>
                ) : portalSubject === 'matematik-tambahan' ? (
                  <button
                    type="button"
                    className={`py-2 rounded-lg font-bold border transition ${theme.activeTab} cursor-default`}
                  >
                    Math Tambahan
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleApplyGlobalSubjek(activePortalSubj)}
                      className={`py-2 rounded-lg font-bold border transition cursor-pointer ${
                        subjek === activePortalSubj
                          ? theme.activeTab
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                      title={`Tetapkan semua sesi kelas kepada subjek ${activePortalSubj}`}
                    >
                      {activePortalSubj}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyGlobalSubjek('Sains')}
                      className={`py-2 rounded-lg font-bold border transition cursor-pointer ${
                        subjek === 'Sains'
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                      title="Tetapkan semua sesi kelas kepada subjek Sains"
                    >
                      Sains
                    </button>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Minggu Akademik
              </label>
              <select
                value={mingguAkademik}
                onChange={(e) => setMingguAkademik(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold cursor-pointer"
              >
                {Array.from({ length: 42 }, (_, i) => String(i + 1)).map(
                  (w) => (
                    <option key={w} value={w}>
                      Minggu {w}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Bahasa RPH
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setBahasa('BM')}
                  className={`py-2 rounded-lg font-bold border transition cursor-pointer ${
                    bahasa === 'BM'
                      ? theme.activeTab
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  BM
                </button>
                <button
                  type="button"
                  onClick={() => setBahasa('DLP')}
                  className={`py-2 rounded-lg font-bold border transition cursor-pointer ${
                    bahasa === 'DLP'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  DLP (Eng)
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Format Susun Atur
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsCompact(false)}
                  className={`py-2 rounded-lg font-bold border transition cursor-pointer ${
                    !isCompact
                      ? theme.activeTab
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Standard
                </button>
                <button
                  type="button"
                  onClick={() => setIsCompact(true)}
                  className={`py-2 rounded-lg font-bold border transition cursor-pointer ${
                    isCompact
                      ? theme.activeTab
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Compact 1-M/S
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Model PdPC
              </label>
              <select
                value={modelPdpc}
                onChange={(e) => setModelPdpc(e.target.value as ModelPdpc)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-300 bg-white font-semibold cursor-pointer"
              >
                <option value="Standard KPM">Standard KPM (3 Fasa)</option>
                <option value="5E Pedagogi HIKMAH (MRSM)">
                  5E HIKMAH (MRSM)
                </option>
              </select>
            </div>
          </div>

          {/* Slots Table / Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Clock className={`w-4 h-4 ${theme.accentText}`} />
                <span>
                  Senarai Sesi Kelas Dalam Minggu {mingguAkademik} (
                  {slots.length} Sesi Kelas)
                </span>
              </h4>
              <button
                type="button"
                onClick={handleAddSlot}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <Plus className={`w-3.5 h-3.5 ${theme.accentText}`} />
                <span>Tambah Sesi Kelas</span>
              </button>
            </div>

            <div className="space-y-3">
              {slots.map((slot, index) => {
                const slotSubjek: SubjekRPH = (portalSubject === 'matematik' || portalSubject === 'matematik-tambahan' || portalSubject === 'sains')
                  ? activePortalSubj
                  : (slot.subjek || subjek);
                const slotTingkatanOptions = getTingkatanListBySubjek(slotSubjek);
                const slotDskp = getDskpByBahasa(bahasa, slotSubjek);
                const normTing = normalizeTingkatan(slot.tingkatan, slotSubjek);
                let babOptions = slotDskp.filter(
                  (b) => b.tingkatan === normTing
                );
                if (babOptions.length === 0) {
                  babOptions = slotDskp.filter((b) =>
                    b.tingkatan.toLowerCase().includes(normTing.toLowerCase().replace('tingkatan ', ''))
                  );
                }
                if (babOptions.length === 0) {
                  babOptions = slotDskp;
                }

                const selectedBab =
                  babOptions.find((b) => b.id === slot.babId) ||
                  babOptions.find((b) => !b.isProgramKhas) ||
                  babOptions[0];
                const skOptions = selectedBab ? selectedBab.skList : [];
                const selectedSk =
                  skOptions.find((s) => s.kod === slot.skKod) || skOptions[0];
                const spOptions = selectedSk ? selectedSk.spList : [];
                const selectedSpCodes = Array.isArray(slot.spKod)
                  ? slot.spKod
                  : [slot.spKod].filter(Boolean);

                return (
                  <div
                    key={slot.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-xs space-y-3.5 text-xs transition hover:border-slate-300"
                  >
                    {/* Card Header: Session number, subject, class & Padam button */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div className="flex items-center flex-wrap gap-2">
                        <span className={`font-black text-xs px-2.5 py-0.5 rounded-full ${theme.badgeBg} border shadow-2xs`}>
                          Sesi #{index + 1}
                        </span>
                        <span
                          className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${
                            slotSubjek === 'Sains'
                              ? 'bg-sky-50 text-sky-800 border-sky-200'
                              : slotSubjek === 'Biologi'
                              ? 'bg-pink-50 text-pink-800 border-pink-200'
                              : slotSubjek === 'Fizik'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : slotSubjek === 'Matematik'
                              ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                              : slotSubjek === 'Matematik Tambahan'
                              ? 'bg-slate-100 text-slate-800 border-slate-300'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          {slotSubjek}
                        </span>
                        <span className="font-bold text-slate-700 text-xs">
                          {slot.hari} • {slot.kelas} ({normTing}) • {slot.masaMula} - {slot.masaTamat}
                        </span>
                      </div>
                      {slots.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSlot(index)}
                          className="text-slate-400 hover:text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-lg border border-transparent hover:border-red-200 inline-flex items-center gap-1 transition text-xs font-semibold cursor-pointer"
                          title="Padam sesi kelas ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Padam Sesi</span>
                        </button>
                      )}
                    </div>

                    {/* Row 1: Maklumat Jadual & Waktu (5 Lajur Luas) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Hari
                        </label>
                        <select
                          value={slot.hari}
                          onChange={(e) => updateSlot(index, { hari: e.target.value })}
                          className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500"
                        >
                          {['Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu', 'Ahad'].map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Tarikh
                        </label>
                        <input
                          type="date"
                          value={slot.tarikh}
                          onChange={(e) => updateSlot(index, { tarikh: e.target.value })}
                          className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Masa PdPc (Mula – Tamat)
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="time"
                            value={slot.masaMula}
                            onChange={(e) => updateSlot(index, { masaMula: e.target.value })}
                            className="w-full px-2 py-2 rounded-xl border border-slate-200 bg-slate-50/70 font-semibold text-slate-800 text-xs text-center"
                          />
                          <span className="text-slate-400 font-bold">-</span>
                          <input
                            type="time"
                            value={slot.masaTamat}
                            onChange={(e) => updateSlot(index, { masaTamat: e.target.value })}
                            className="w-full px-2 py-2 rounded-xl border border-slate-200 bg-slate-50/70 font-semibold text-slate-800 text-xs text-center"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Nama Kelas
                        </label>
                        <input
                          type="text"
                          value={slot.kelas}
                          onChange={(e) => updateSlot(index, { kelas: e.target.value })}
                          placeholder="cth: 4 Sains 1 / 2 IQ"
                          className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Kehadiran Pelajar
                        </label>
                        <input
                          type="text"
                          value={
                            slot.kehadiranMurid !== undefined
                              ? slot.kehadiranMurid
                              : `${slot.bilanganMurid || 30} / ${slot.bilanganMurid || 30}`
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            const parts = val.split('/');
                            const bil =
                              parts.length > 1
                                ? parts[1].trim()
                                : parseInt(val, 10)
                                ? String(parseInt(val, 10))
                                : slot.bilanganMurid;
                            updateSlot(index, {
                              kehadiranMurid: val,
                              bilanganMurid: bil || slot.bilanganMurid,
                            });
                          }}
                          placeholder="cth: 30 / 30"
                          className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Row 2: Silibus DSKP & Tajuk Pembelajaran (4 Lajur Luas) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 border-t border-slate-100">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Mata Pelajaran
                        </label>
                        <select
                          value={slotSubjek}
                          disabled={portalSubject === 'sains' || portalSubject === 'matematik' || portalSubject === 'matematik-tambahan'}
                          onChange={(e) => {
                            const nextSubjek = e.target.value as SubjekRPH;
                            const nextTingOptions = getTingkatanListBySubjek(nextSubjek);
                            const nextTing = nextTingOptions.includes(slot.tingkatan)
                              ? slot.tingkatan
                              : nextTingOptions[0];
                            const nextDskp = getDskpByBahasa(bahasa, nextSubjek);
                            const nextBabList = nextDskp.filter((b) => b.tingkatan === nextTing);
                            const firstB =
                              nextBabList.find((b) => !b.isProgramKhas) ||
                              nextBabList[0] ||
                              nextDskp[0];
                            const firstSk = firstB?.skList?.[0];
                            const firstSp = firstSk?.spList?.[0];
                            updateSlot(index, {
                              subjek: nextSubjek,
                              tingkatan: nextTing,
                              babId: firstB?.id || '',
                              skKod: firstSk?.kod || '',
                              spKod: firstSp?.kod ? [firstSp.kod] : [],
                            });
                          }}
                          className={`w-full px-2.5 py-2 rounded-xl border font-bold text-xs transition ${
                            slotSubjek === 'Sains'
                              ? 'border-sky-300 bg-sky-50 text-sky-900 focus:ring-2 focus:ring-sky-500'
                              : slotSubjek === 'Matematik'
                              ? 'border-indigo-300 bg-indigo-50 text-indigo-900 focus:ring-2 focus:ring-indigo-500'
                              : slotSubjek === 'Matematik Tambahan'
                              ? 'border-slate-300 bg-slate-100 text-slate-900 focus:ring-2 focus:ring-slate-500'
                              : slotSubjek === 'Biologi'
                              ? 'border-pink-300 bg-pink-50 text-pink-900 focus:ring-2 focus:ring-pink-500'
                              : slotSubjek === 'Fizik'
                              ? 'border-amber-300 bg-amber-50 text-amber-900 focus:ring-2 focus:ring-amber-500'
                              : 'border-emerald-300 bg-emerald-50 text-emerald-900 focus:ring-2 focus:ring-emerald-500'
                          }`}
                        >
                          {portalSubject === 'sains' ? (
                            <option value="Sains">Sains</option>
                          ) : portalSubject === 'matematik' ? (
                            <option value="Matematik">Matematik</option>
                          ) : portalSubject === 'matematik-tambahan' ? (
                            <option value="Matematik Tambahan">Matematik Tambahan</option>
                          ) : (
                            <>
                              <option value={activePortalSubj}>{activePortalSubj}</option>
                              <option value="Sains">Sains</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Tingkatan
                        </label>
                        <select
                          value={normTing}
                          onChange={(e) => {
                            const newTing = normalizeTingkatan(e.target.value, slotSubjek);
                            const targetBabList = slotDskp.filter(
                              (b) => b.tingkatan === newTing
                            );
                            const firstB =
                              targetBabList.find((b) => !b.isProgramKhas) ||
                              targetBabList[0] ||
                              slotDskp[0];
                            const firstSk = firstB?.skList?.[0];
                            const firstSp = firstSk?.spList?.[0];
                            updateSlot(index, {
                              tingkatan: newTing,
                              babId: firstB?.id || '',
                              skKod: firstSk?.kod || '',
                              spKod: firstSp?.kod ? [firstSp.kod] : [],
                            });
                          }}
                          className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500"
                        >
                          {slotTingkatanOptions.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Bab / Tajuk DSKP
                        </label>
                        <select
                          value={selectedBab?.id || ''}
                          onChange={(e) => {
                            const bObj =
                              babOptions.find((b) => b.id === e.target.value) ||
                              babOptions[0];
                            const skObj = bObj?.skList?.[0];
                            const spObj = skObj?.spList?.[0];
                            updateSlot(index, {
                              babId: bObj?.id || '',
                              skKod: skObj?.kod || '',
                              spKod: spObj?.kod ? [spObj.kod] : [],
                            });
                          }}
                          className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 text-xs truncate focus:ring-2 focus:ring-emerald-500"
                        >
                          {babOptions.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.isProgramKhas
                                ? `★ ${b.tajuk}`
                                : `Bab ${b.nomborBab}: ${b.tajuk}`}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[11px] font-bold text-slate-700">
                            SK &amp; SP
                          </label>
                          <button
                            type="button"
                            onClick={() => setActiveLessonPickerSlotIndex(index)}
                            className={`text-[11px] ${theme.accentText} font-bold inline-flex items-center gap-1 hover:underline cursor-pointer`}
                            title="Buka pemilih multi-SP dan aktiviti lesson"
                          >
                            <Layers className="w-3 h-3" />
                            <span>Multi-SP</span>
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          <select
                            value={selectedSk?.kod || ''}
                            onChange={(e) => {
                              const skObj =
                                skOptions.find((s) => s.kod === e.target.value) ||
                                skOptions[0];
                              const spObj = skObj?.spList?.[0];
                              updateSlot(index, {
                                skKod: skObj?.kod || '',
                                spKod: spObj?.kod ? [spObj.kod] : [],
                              });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800 text-xs truncate focus:ring-2 focus:ring-emerald-500"
                            title="Standard Kandungan (SK)"
                          >
                            {skOptions.map((sk) => (
                              <option key={sk.kod} value={sk.kod}>
                                {sk.kod} - {sk.tajuk}
                              </option>
                            ))}
                          </select>

                          <div className="flex items-center gap-1.5">
                            <select
                              value={selectedSpCodes[0] || ''}
                              onChange={(e) => {
                                const chosen = e.target.value;
                                updateSlot(index, {
                                  spKod: chosen ? [chosen] : [],
                                });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-slate-800 text-xs truncate focus:ring-2 focus:ring-emerald-500"
                              title="Standard Pembelajaran (SP)"
                            >
                              {spOptions.map((sp) => (
                                <option key={sp.kod} value={sp.kod}>
                                  {sp.kod} - {sp.tajuk}
                                </option>
                              ))}
                            </select>

                            <button
                              type="button"
                              onClick={() => setActiveLessonPickerSlotIndex(index)}
                              className={`px-2 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center shrink-0 cursor-pointer ${
                                selectedSpCodes.length > 1
                                  ? `${theme.activeTab} shadow-2xs`
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                              }`}
                              title={
                                selectedSpCodes.length > 1
                                  ? `${selectedSpCodes.length} SP dipilih: ${selectedSpCodes.join(', ')}`
                                  : 'Pilih Multi-SP'
                              }
                            >
                              {selectedSpCodes.length > 1 ? (
                                <span className="flex items-center gap-1">
                                  <CheckSquare className="w-3.5 h-3.5" />
                                  <span>{selectedSpCodes.length} SP</span>
                                </span>
                              ) : (
                                <Layers className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generated Result Box */}
          {generatedRphs && (
            <div className={`rounded-2xl p-4 sm:p-5 space-y-4 animate-in fade-in border ${theme.cardBorder} bg-white shadow-xs`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className={`flex items-center gap-2 font-black text-sm sm:text-base ${theme.accentText}`}>
                    <CheckCircle2 className={`w-5 h-5 ${theme.accentText}`} />
                    <span>
                      {generatedRphs.length} RPH Mingguan Siap Dijana (Minggu {mingguAkademik})!
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    📱 iPad &amp; iPhone: Tekan butang Word atau Excel dan pilih <strong>&quot;Save to Files&quot;</strong>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveAllWeekly}
                    className="apple-btn-glass inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-800 text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                    <span>
                      {savedNotice
                        ? 'Semua Disimpan ke Pustaka!'
                        : 'Simpan Semua ke Pustaka'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadWeeklyWord}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition shadow-sm cursor-pointer"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>
                      Muat Turun Word ({generatedRphs.length} RPH)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadWeeklySpreadsheet}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition shadow-sm cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>
                      Muat Turun Excel ({generatedRphs.length} RPH)
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {generatedRphs.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`glass-card rounded-2xl p-3.5 border ${theme.cardBorder} flex items-center justify-between gap-3 text-xs shadow-2xs hover:shadow-xs transition`}
                  >
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`font-black text-xs ${theme.accentText}`}>
                          {idx + 1}. {item.info.hari} ({item.info.tarikh})
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-slate-100 text-slate-700">
                          {item.info.kelas}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Hadir: {item.info.kehadiranMurid || '30 / 30'}
                        </span>
                      </div>
                      <p className="text-slate-600 truncate text-[11px] font-medium" title={`${item.babTajuk} — SP ${item.spKod.join(', ')}`}>
                        {item.babTajuk} — SP {item.spKod.join(', ')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onInspectRph(item);
                        onClose();
                      }}
                      className={`px-3 py-1.5 rounded-xl ${theme.badgeBg} hover:opacity-90 font-bold inline-flex items-center gap-1.5 shrink-0 transition text-xs whitespace-nowrap cursor-pointer shadow-2xs`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Buka Pratonton</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200/60 bg-white/60 backdrop-blur-md flex items-center justify-between rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="apple-btn-glass px-4 py-2 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={handleGenerateWeeklyBatch}
            className={`${theme.btnClass} inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-xs font-extrabold shadow-lg transition cursor-pointer`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Jana Semua {slots.length} RPH Minggu Ini Sekarang</span>
          </button>
        </div>

        {/* Lesson Picker Modal Overlay */}
        {activeLessonPickerSlotIndex !== null && slots[activeLessonPickerSlotIndex] && (() => {
          const slotIdx = activeLessonPickerSlotIndex;
          const slot = slots[slotIdx];
          const slotSubjek: SubjekRPH = (portalSubject === 'matematik' || portalSubject === 'matematik-tambahan' || portalSubject === 'sains')
            ? activePortalSubj
            : (slot.subjek || subjek);
          const slotDskp = getDskpByBahasa(bahasa, slotSubjek);
          const normTing = normalizeTingkatan(slot.tingkatan, slotSubjek);
          let babOptions = slotDskp.filter((b) => b.tingkatan === normTing);
          if (babOptions.length === 0) {
            babOptions = slotDskp.filter((b) =>
              b.tingkatan.toLowerCase().includes(normTing.toLowerCase().replace('tingkatan ', ''))
            );
          }
          if (babOptions.length === 0) babOptions = slotDskp;

          const selectedBab =
            babOptions.find((b) => b.id === slot.babId) ||
            babOptions.find((b) => !b.isProgramKhas) ||
            babOptions[0];
          const skOptions = selectedBab ? selectedBab.skList : [];
          const selectedSk =
            skOptions.find((s) => s.kod === slot.skKod) || skOptions[0];
          const spOptions = selectedSk ? selectedSk.spList : [];
          const selectedCodes = Array.isArray(slot.spKod) ? slot.spKod : [slot.spKod].filter(Boolean);

          const toggleSpCode = (code: string) => {
            let next: string[];
            if (selectedCodes.includes(code)) {
              if (selectedCodes.length === 1) return; // Keep at least 1
              next = selectedCodes.filter((c) => c !== code);
            } else {
              next = [...selectedCodes, code];
            }
            updateSlot(slotIdx, { spKod: next });
          };

          return (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className={`p-4 ${theme.headerBg} text-white flex items-center justify-between`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <Layers className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">
                        Pilih Standard Pembelajaran (SP) — Sesi #{slotIdx + 1}
                      </h4>
                      <p className="text-[11px] text-white/90 flex items-center gap-1.5 mt-0.5">
                        <span className="font-extrabold text-[10px] bg-white text-slate-900 px-1.5 py-0.2 rounded">
                          {slotSubjek}
                        </span>
                        <span>•</span>
                        <span>{slot.hari}</span>
                        <span>•</span>
                        <span>{slot.kelas}</span>
                        <span>•</span>
                        <span>{normTing}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveLessonPickerSlotIndex(null)}
                    className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/15 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Sub-header: Bab & SK selectors */}
                <div className="p-3.5 bg-slate-50 border-b border-slate-200 space-y-2 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Mata Pelajaran
                      </label>
                      <select
                        value={slotSubjek}
                        disabled={portalSubject === 'sains' || portalSubject === 'matematik' || portalSubject === 'matematik-tambahan'}
                        onChange={(e) => {
                          const nextSubjek = e.target.value as SubjekRPH;
                          const nextTingOptions = getTingkatanListBySubjek(nextSubjek);
                          const nextTing = nextTingOptions.includes(slot.tingkatan)
                            ? slot.tingkatan
                            : nextTingOptions[0];
                          const nextDskp = getDskpByBahasa(bahasa, nextSubjek);
                          const nextBabList = nextDskp.filter((b) => b.tingkatan === nextTing);
                          const firstB =
                            nextBabList.find((b) => !b.isProgramKhas) ||
                            nextBabList[0] ||
                            nextDskp[0];
                          const firstSk = firstB?.skList?.[0];
                          const firstSp = firstSk?.spList?.[0];
                          updateSlot(slotIdx, {
                            subjek: nextSubjek,
                            tingkatan: nextTing,
                            babId: firstB?.id || '',
                            skKod: firstSk?.kod || '',
                            spKod: firstSp?.kod ? [firstSp.kod] : [],
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-800"
                      >
                        {portalSubject === 'sains' ? (
                          <option value="Sains">Sains</option>
                        ) : portalSubject === 'matematik' ? (
                          <option value="Matematik">Matematik</option>
                        ) : portalSubject === 'matematik-tambahan' ? (
                          <option value="Matematik Tambahan">Matematik Tambahan</option>
                        ) : (
                          <>
                            <option value={activePortalSubj}>{activePortalSubj}</option>
                            <option value="Sains">Sains</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Bab / Tajuk ({slotSubjek})
                      </label>
                      <select
                        value={selectedBab?.id || ''}
                        onChange={(e) => {
                          const bObj =
                            babOptions.find((b) => b.id === e.target.value) ||
                            babOptions[0];
                          const skObj = bObj?.skList?.[0];
                          const spObj = skObj?.spList?.[0];
                          updateSlot(slotIdx, {
                            babId: bObj?.id || '',
                            skKod: skObj?.kod || '',
                            spKod: spObj?.kod ? [spObj.kod] : [],
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
                      >
                        {babOptions.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.isProgramKhas
                              ? `★ ${b.tajuk}`
                              : `Bab ${b.nomborBab}: ${b.tajuk}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Standard Kandungan (SK)
                    </label>
                    <select
                      value={selectedSk?.kod || ''}
                      onChange={(e) => {
                        const skObj =
                          skOptions.find((s) => s.kod === e.target.value) ||
                          skOptions[0];
                        const spObj = skObj?.spList?.[0];
                        updateSlot(slotIdx, {
                          skKod: skObj?.kod || '',
                          spKod: spObj?.kod ? [spObj.kod] : [],
                        });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
                    >
                      {skOptions.map((sk) => (
                        <option key={sk.kod} value={sk.kod}>
                          {sk.kod} - {sk.tajuk}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Pilih satu atau lebih SP untuk diajar dalam sesi ini:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          updateSlot(slotIdx, {
                            spKod: spOptions.map((s) => s.kod),
                          });
                        }}
                        className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition"
                      >
                        Pilih Semua
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (spOptions[0]) {
                            updateSlot(slotIdx, {
                              spKod: [spOptions[0].kod],
                            });
                          }
                        }}
                        className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
                      >
                        Reset Tunggal
                      </button>
                    </div>
                  </div>
                </div>

                {/* SP Checkbox List */}
                <div className="flex-1 overflow-y-auto p-3.5 space-y-2">
                  {spOptions.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs">
                      Tiada senarai SP bagi SK ini.
                    </div>
                  ) : (
                    spOptions.map((sp) => {
                      const isChecked = selectedCodes.includes(sp.kod);
                      return (
                        <div
                          key={sp.kod}
                          onClick={() => toggleSpCode(sp.kod)}
                          className={`p-3 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                            isChecked
                              ? `bg-slate-50 border-2 ${theme.cardBorder} shadow-xs`
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className={`mt-0.5 ${theme.accentText} shrink-0`}>
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 fill-current" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-300" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`font-extrabold text-xs px-1.5 py-0.5 rounded border ${theme.badgeBg}`}>
                                SP {sp.kod}
                              </span>
                              {sp.eksperimenWajib && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded">
                                  <FlaskConical className="w-3 h-3 text-amber-600" />
                                  <span>Eksperimen Wajib</span>
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed font-medium">
                              {sp.tajuk}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <span className={`text-xs font-semibold ${theme.accentText}`}>
                    {selectedCodes.length} SP dipilih untuk sesi ini
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveLessonPickerSlotIndex(null)}
                    className={`${theme.btnClass} px-4 py-1.5 rounded-xl text-white font-bold text-xs shadow-xs transition inline-flex items-center gap-1.5 cursor-pointer`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Selesai &amp; Simpan Pilihan</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
