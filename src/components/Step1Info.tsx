import React, { useState, useRef } from 'react';
import {
  MaklumatAsasRPH,
  Tingkatan,
  ModelPdpc,
  BahasaRPH,
  KelasTambahanItem,
  SlotJadualWaktu,
  SubjekRPH,
} from '../types/rph';
import { SENARAI_KELAS_DEFAULT } from '../data/pedagogiData';
import { getTingkatanListBySubjek } from '../data/dskpKimia';
import {
  simpanProfilGuru,
  muatSlotJadualWaktu,
  simpanSlotJadualWaktu,
} from '../utils/rphStorage';
import { analyzeTimetableFileClientSide, TimetableSection } from '../utils/timetableParser';
import { auth, kemasKiniSekolahPengguna } from '../services/firebase';
import {
  Calendar,
  Clock,
  School,
  User,
  Users,
  Award,
  ArrowRight,
  Check,
  Upload,
  Plus,
  Trash2,
  Globe,
  FileText,
  X,
  CalendarRange,
  CheckCircle2,
  Edit3,
  Eye,
  FlaskConical,
  Atom,
  Dna,
  Sparkles,
  HelpCircle,
  Calculator,
  Compass,
} from 'lucide-react';
import { MoleculeWatermark, LabApparatusWatermark, BiologyDnaWatermark, PhysicsAtomWatermark } from './ChemistryDecor';

interface Step1InfoProps {
  info: MaklumatAsasRPH;
  subjek: SubjekRPH;
  portalSubject?: string;
  modelPdpc: ModelPdpc;
  bahasa: BahasaRPH;
  isCompact: boolean;
  onSubjekChange: (subjek: SubjekRPH) => void;
  onModelChange: (model: ModelPdpc) => void;
  onBahasaChange: (bahasa: BahasaRPH) => void;
  onCompactChange: (isCompact: boolean) => void;
  onChange: (updated: MaklumatAsasRPH) => void;
  onOpenWeeklyModal: () => void;
  onOpenUserGuide?: () => void;
  onNext: () => void;
}

export const Step1Info: React.FC<Step1InfoProps> = ({
  info,
  subjek,
  portalSubject = 'kimia',
  modelPdpc,
  bahasa,
  isCompact,
  onSubjekChange,
  onModelChange,
  onBahasaChange,
  onCompactChange,
  onChange,
  onOpenWeeklyModal,
  onOpenUserGuide,
  onNext,
}) => {
  const [savedNotice, setSavedNotice] = useState(false);
  const [showQuickTips, setShowQuickTips] = useState(true);

  // Timetable Upload & Extracted Slots state
  const [timetableSlots, setTimetableSlots] = useState<SlotJadualWaktu[]>(() =>
    muatSlotJadualWaktu()
  );
  const [isExtractingTimetable, setIsExtractingTimetable] = useState(false);
  const [extractionStatus, setExtractionStatus] = useState<string>('');
  const [timetablePreviewUrl, setTimetablePreviewUrl] = useState<string | null>(
    null
  );
  const [showSlotEditor, setShowSlotEditor] = useState(false);
  const [pdfSections, setPdfSections] = useState<TimetableSection[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('');
  const [timetableNotice, setTimetableNotice] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const extraClasses = info.kelasTambahan || [];

  const calculateEndTime = (startStr: string, duration: number): string => {
    const [h, m] = startStr.split(':').map(Number);
    if (!isNaN(h) && !isNaN(m)) {
      const totalMinutes = h * 60 + m + duration;
      const endH = Math.floor(totalMinutes / 60) % 24;
      const endM = totalMinutes % 60;
      return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
    }
    return info.masaTamat;
  };

  const calculateDurationFromRange = (
    startStr: string,
    endStr: string
  ): number => {
    const [h1, m1] = String(startStr || '')
      .split(':')
      .map(Number);
    const [h2, m2] = String(endStr || '')
      .split(':')
      .map(Number);
    if (!isNaN(h1) && !isNaN(m1) && !isNaN(h2) && !isNaN(m2)) {
      const diff = h2 * 60 + m2 - (h1 * 60 + m1);
      if (diff > 0 && diff <= 300) return diff;
    }
    return 60;
  };

  const handleBatchUpdate = (updates: Partial<MaklumatAsasRPH>) => {
    const updated = { ...info, ...updates };

    // If date changes, automatically calculate the day in Malay
    if ('tarikh' in updates && updates.tarikh) {
      const parsedDate = new Date(updates.tarikh);
      if (!isNaN(parsedDate.getTime())) {
        const days = [
          'Ahad',
          'Isnin',
          'Selasa',
          'Rabu',
          'Khamis',
          'Jumaat',
          'Sabtu',
        ];
        updated.hari = days[parsedDate.getDay()];
      }
    }

    // If masaMula and tempohMinit change (and masaTamat wasn't explicitly passed), update masaTamat
    if (
      ('masaMula' in updates || 'tempohMinit' in updates) &&
      !('masaTamat' in updates)
    ) {
      const startStr =
        updates.masaMula !== undefined ? updates.masaMula : info.masaMula;
      const duration = Number(
        updates.tempohMinit !== undefined
          ? updates.tempohMinit
          : info.tempohMinit
      );
      updated.masaTamat = calculateEndTime(startStr, duration);
    }

    onChange(updated);
  };

  const handleFieldChange = (field: keyof MaklumatAsasRPH, value: any) => {
    handleBatchUpdate({ [field]: value });
  };

  const handleSimpanSebagaiProfilDefault = async () => {
    simpanProfilGuru({
      namaGuru: info.namaGuru,
      namaSekolah: info.namaSekolah,
      kelasKegemaran: SENARAI_KELAS_DEFAULT,
    });
    if (auth.currentUser) {
      await kemasKiniSekolahPengguna(
        auth.currentUser.uid,
        info.namaGuru,
        info.namaSekolah
      );
    }
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  // Handle PNG / JPEG / PDF / CSV Timetable file upload & automatic extraction
  const handleTimetableFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const lowerName = file.name.toLowerCase();
    const isSupportedMime = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/pjpeg',
      'image/webp',
      'application/pdf',
      'text/csv',
      'text/plain',
    ].includes(file.type.toLowerCase());
    const isSupportedExt = /\.(png|jpe?g|webp|pdf|csv|tsv|txt)$/i.test(
      lowerName
    );

    if (!isSupportedMime && !isSupportedExt) {
      setTimetableNotice({
        type: 'error',
        text: 'Format fail tidak disokong. Sila muat naik fail jadual dalam format PNG, JPEG, PDF atau CSV.',
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsExtractingTimetable(true);
    setExtractionStatus('Membaca fail jadual waktu...');
    setTimetableNotice(null);

    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(new Error('Gagal membaca fail'));
        reader.readAsDataURL(file);
      });

      const result = await analyzeTimetableFileClientSide(
        file,
        dataUrl,
        (status) => setExtractionStatus(status),
        info.kelas,
        subjek,
        info.namaGuru
      );

      if (result.previewDataUrl) {
        setTimetablePreviewUrl(result.previewDataUrl);
      }

      if (result.sections && result.sections.length > 1) {
        setPdfSections(result.sections);
        setSelectedSectionId(result.selectedSectionId || result.sections[0].id);
      } else {
        setPdfSections([]);
        setSelectedSectionId('');
      }

      if (result.slots.length > 0) {
        const extractedSlots: SlotJadualWaktu[] = result.slots.map((s, idx) => ({
          id: `slot_${Date.now()}_${idx}`,
          ...s,
        }));

        setTimetableSlots(extractedSlots);
        simpanSlotJadualWaktu(extractedSlots);

        // Automatically populate the form with the first extracted slot
        const firstSlot = extractedSlots[0];
        if (firstSlot) {
          handleBatchUpdate({
            tingkatan: firstSlot.tingkatan,
            kelas: firstSlot.kelas,
            hari: firstSlot.hari,
            masaMula: firstSlot.masaMula,
            masaTamat: firstSlot.masaTamat,
            tempohMinit: firstSlot.tempohMinit,
          });
        }

        const sectionMsg =
          result.sections && result.sections.length > 1
            ? ` (${result.sections.length} jadual guru/minggu ditemui dalam PDF — sila pilih jadual anda di bawah jika perlu)`
            : '';

        setTimetableNotice({
          type: 'success',
          text: `Berjaya mengekstrak ${extractedSlots.length} slot waktu kelas daripada fail jadual anda${sectionMsg}! Klik mana-mana slot di bawah untuk menetapkan kelas & masa secara terus.`,
        });
      } else {
        setShowSlotEditor(true);
        setTimetableNotice({
          type: 'error',
          text: 'Maklumat teks di dalam fail jadual agak kabur atau tidak dapat diekstrak secara automatik. Anda boleh menambah/menyunting slot jadual di bawah atau terus memilih waktu kelas secara manual.',
        });
      }
    } catch {
      setTimetableNotice({
        type: 'error',
        text: 'Masalah membaca fail jadual waktu. Anda boleh mengabaikan muat naik ini dan memilih waktu kelas secara terus di bawah.',
      });
    } finally {
      setIsExtractingTimetable(false);
      setExtractionStatus('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Apply a timetable slot to primary class (or add as extra class)
  const handleApplyTimetableSlot = (
    slot: SlotJadualWaktu,
    asExtraClass = false
  ) => {
    if (
      !asExtraClass &&
      slot.subjek?.toLowerCase() === 'sains' &&
      subjek !== 'Sains'
    ) {
      onSubjekChange('Sains');
    }
    if (asExtraClass) {
      const newExtra: KelasTambahanItem = {
        id: `extra_${Date.now()}`,
        tingkatan: slot.tingkatan,
        kelas: slot.kelas,
        tarikh: info.tarikh,
        hari: slot.hari,
        masaMula: slot.masaMula,
        masaTamat: slot.masaTamat,
        tempohMinit: slot.tempohMinit,
        bilanganMurid: info.bilanganMurid,
        kehadiranMurid: info.kehadiranMurid,
      };
      handleFieldChange('kelasTambahan', [...extraClasses, newExtra]);
    } else {
      handleBatchUpdate({
        tingkatan: slot.tingkatan,
        kelas: slot.kelas,
        hari: slot.hari,
        masaMula: slot.masaMula,
        masaTamat: slot.masaTamat,
        tempohMinit: slot.tempohMinit,
      });
    }
  };

  const handleAddManualSlotToTimetable = () => {
    const newSlot: SlotJadualWaktu = {
      id: `slot_${Date.now()}`,
      hari: info.hari,
      masaMula: info.masaMula,
      masaTamat: info.masaTamat,
      tempohMinit: info.tempohMinit,
      tingkatan: info.tingkatan,
      kelas: info.kelas,
      subjek,
    };
    const updated = [...timetableSlots, newSlot];
    setTimetableSlots(updated);
    simpanSlotJadualWaktu(updated);
  };

  const handleUpdateTimetableSlot = (
    id: string,
    updates: Partial<SlotJadualWaktu>
  ) => {
    const updated = timetableSlots.map((slot) => {
      if (slot.id !== id) return slot;
      const next = { ...slot, ...updates };
      if ('kelas' in updates && updates.kelas) {
        const firstDigit = updates.kelas.trim().charAt(0);
        next.tingkatan =
          firstDigit === '1'
            ? 'Tingkatan 1'
            : firstDigit === '2'
            ? 'Tingkatan 2'
            : firstDigit === '3'
            ? 'Tingkatan 3'
            : firstDigit === '5'
            ? 'Tingkatan 5'
            : 'Tingkatan 4';
      }
      if ('masaMula' in updates || 'masaTamat' in updates) {
        next.tempohMinit = calculateDurationFromRange(
          next.masaMula,
          next.masaTamat
        );
      }
      return next;
    });
    setTimetableSlots(updated);
    simpanSlotJadualWaktu(updated);
  };

  const handleRemoveTimetableSlot = (id: string) => {
    const updated = timetableSlots.filter((s) => s.id !== id);
    setTimetableSlots(updated);
    simpanSlotJadualWaktu(updated);
  };

  // Multi-Class (Kelas Tambahan) handlers
  const handleAddExtraClass = () => {
    const newItem: KelasTambahanItem = {
      id: `kelas_${Date.now()}`,
      tingkatan: info.tingkatan,
      kelas:
        info.tingkatan === 'Tingkatan 4' ? '4 Sains 2' : '5 Sains 2',
      tarikh: info.tarikh,
      hari: info.hari,
      masaMula: '10:30',
      masaTamat: '11:30',
      tempohMinit: info.tempohMinit,
      bilanganMurid: info.bilanganMurid,
      kehadiranMurid: info.kehadiranMurid,
    };
    handleFieldChange('kelasTambahan', [...extraClasses, newItem]);
  };

  const handleUpdateExtraClass = (
    index: number,
    updates: Partial<KelasTambahanItem>
  ) => {
    const list = [...extraClasses];
    const current = { ...list[index], ...updates };
    if ('masaMula' in updates || 'tempohMinit' in updates) {
      current.masaTamat = calculateEndTime(
        current.masaMula,
        Number(current.tempohMinit || 60)
      );
    }
    list[index] = current;
    handleFieldChange('kelasTambahan', list);
  };

  const handleRemoveExtraClass = (index: number) => {
    const list = extraClasses.filter((_, i) => i !== index);
    handleFieldChange('kelasTambahan', list);
  };

  const isPink = portalSubject === 'biologi';
  const isAmber = portalSubject === 'fizik';
  const isTurquoise = portalSubject === 'sains';
  const isIndigo = portalSubject === 'matematik';
  const isCharcoal = portalSubject === 'matematik-tambahan';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro banner with subtle SVG watermark */}
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
          : 'bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-600'
      } rounded-2xl p-6 text-white shadow-md`}>
        {isPink ? (
          <BiologyDnaWatermark className="w-56 h-56 text-white/15 absolute -right-6 -bottom-10" />
        ) : isAmber ? (
          <PhysicsAtomWatermark className="w-56 h-56 text-white/15 absolute -right-6 -bottom-10" />
        ) : isTurquoise ? (
          <MoleculeWatermark className="w-52 h-52 text-white/10 absolute -right-6 -bottom-10" />
        ) : isIndigo || isCharcoal ? (
          <MoleculeWatermark className="w-52 h-52 text-white/10 absolute -right-6 -bottom-10" />
        ) : (
          <>
            <MoleculeWatermark className="w-52 h-52 text-white/10 absolute -right-6 -bottom-10" />
            <LabApparatusWatermark className="w-40 h-40 text-white/10 absolute right-48 -top-6 hidden md:block" />
          </>
        )}

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white/20 backdrop-blur-xs mb-2">
              <span>
                Langkah 1 daripada 6 • Maklumat PdPC{' '}
                {subjek === 'Sains'
                  ? 'Sains KSSM (T2–T5)'
                  : subjek === 'Matematik'
                  ? 'Matematik KSSM (T2–T5)'
                  : isPink
                  ? 'Biologi KSSM (T4–T5)'
                  : isAmber
                  ? 'Fizik KSSM (T4–T5)'
                  : `${subjek} KSSM (T4–T5)`}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Maklumat Asas Kelas, Mata Pelajaran, Bahasa DLP &amp; Jadual Waktu
            </h2>
            <p className={`text-sm ${isPink ? 'text-pink-100' : isAmber ? 'text-amber-100' : isTurquoise ? 'text-teal-100' : 'text-emerald-100'} mt-1`}>
              {isTurquoise
                ? 'Tetapkan maklumat kelas Sains, mod bahasa (BM / DLP English), muat naik jadual waktu kelas, atau jana RPH untuk seminggu terus.'
                : `Tetapkan mata pelajaran (${isPink ? 'Biologi' : isAmber ? 'Fizik' : subjek} / Sains), mod bahasa (BM / DLP English), muat naik jadual waktu kelas, atau jana RPH untuk beberapa kelas & seminggu terus.`}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
            <button
              type="button"
              onClick={onOpenWeeklyModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-extrabold hover:bg-amber-300 transition shadow-sm"
            >
              <CalendarRange className="w-4 h-4" />
              <span>Jana RPH Seminggu</span>
            </button>
            <button
              type="button"
              onClick={handleSimpanSebagaiProfilDefault}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white ${
                isPink ? 'text-pink-800 hover:bg-pink-50' : 'text-emerald-800 hover:bg-emerald-50'
              } text-xs font-bold transition shadow-sm`}
            >
              {savedNotice ? (
                <Check className={`w-4 h-4 ${isPink ? 'text-pink-600' : 'text-emerald-600'}`} />
              ) : (
                <Award className="w-4 h-4" />
              )}
              <span>
                {savedNotice
                  ? 'Tersimpan Sebagai Default!'
                  : 'Kekalkan Nama & Sekolah'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* KAD PANDUAN PANTAS & TIP PRAKTIKAL (Collapsible) */}
      <div className={`${
        isPink
          ? 'bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-pink-200/90'
          : isAmber
          ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-amber-200/90'
          : isTurquoise
          ? 'bg-gradient-to-r from-teal-50 via-cyan-50 to-teal-50 border-teal-200/90'
          : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-emerald-200/90'
      } border rounded-2xl p-4 sm:p-5 shadow-xs space-y-3`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl ${isPink ? 'bg-pink-600' : isAmber ? 'bg-amber-500' : isTurquoise ? 'bg-teal-600' : 'bg-emerald-600'} text-white flex items-center justify-center shrink-0 shadow-xs`}>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>Tip Pantas: 3 Langkah Asas Penyediaan e-RPH</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isPink
                    ? 'bg-pink-100 text-pink-800 border-pink-200'
                    : isAmber
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : isTurquoise
                    ? 'bg-teal-100 text-teal-800 border-teal-200'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                } border hidden sm:inline-block`}>
                  {isPink ? 'Sains & Biologi' : isAmber ? 'Sains & Fizik' : isTurquoise ? 'Sains KSSM' : 'Sains & Kimia'}
                </span>
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600">
                Pilih mata pelajaran, tetapkan bahasa, dan terus ke Langkah 2 untuk memilih silibus DSKP.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onOpenUserGuide && (
              <button
                type="button"
                onClick={onOpenUserGuide}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white ${
                  isPink
                    ? 'hover:bg-pink-50 text-pink-800 border-pink-300'
                    : isAmber
                    ? 'hover:bg-amber-50 text-amber-800 border-amber-300'
                    : isTurquoise
                    ? 'hover:bg-teal-50 text-teal-800 border-teal-300'
                    : 'hover:bg-emerald-50 text-emerald-800 border-emerald-300'
                } border text-xs font-bold transition shadow-2xs cursor-pointer`}
              >
                <HelpCircle className={`w-3.5 h-3.5 ${isPink ? 'text-pink-600' : isAmber ? 'text-amber-600' : isTurquoise ? 'text-teal-600' : 'text-emerald-600'}`} />
                <span className="hidden sm:inline">Buka Panduan Penuh</span>
                <span className="sm:hidden">Panduan</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowQuickTips(!showQuickTips)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white/60 transition cursor-pointer"
              title={showQuickTips ? 'Sembunyikan Tip' : 'Tunjukkan Tip'}
            >
              {showQuickTips ? (
                <X className="w-4 h-4" />
              ) : (
                <HelpCircle className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {showQuickTips && (
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t ${isPink ? 'border-pink-200/60' : 'border-emerald-200/60'}`}>
            <div className={`bg-white/85 rounded-xl p-3 border ${isPink ? 'border-pink-100' : 'border-emerald-100'} space-y-1 shadow-2xs`}>
              <div className={`flex items-center gap-1.5 text-xs font-extrabold ${isPink ? 'text-pink-900' : 'text-emerald-900'}`}>
                <span className={`w-5 h-5 rounded-full ${isPink ? 'bg-pink-600' : 'bg-emerald-600'} text-white inline-flex items-center justify-center text-[11px] font-bold`}>1</span>
                <span>Pilih Subjek &amp; Bahasa</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed pl-6">
                Tukar antara <strong>{isPink ? 'Biologi (T4–T5)' : 'Kimia (T4–T5)'}</strong> atau <strong>Sains (T2–T5)</strong>. Pilih mod <strong>BM</strong> atau <strong>DLP English</strong>.
              </p>
            </div>

            <div className={`bg-white/85 rounded-xl p-3 border ${isPink ? 'border-pink-100' : 'border-emerald-100'} space-y-1 shadow-2xs`}>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-900">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white inline-flex items-center justify-center text-[11px] font-bold">2</span>
                <span>Tetapkan Kelas &amp; Jadual</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed pl-6">
                Masukkan maklumat masa atau muat naik jadual waktu mengajar untuk auto-isi waktu kelas.
              </p>
            </div>

            <div className={`bg-white/85 rounded-xl p-3 border ${isPink ? 'border-pink-100' : 'border-emerald-100'} space-y-1 shadow-2xs`}>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-900">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white inline-flex items-center justify-center text-[11px] font-bold">3</span>
                <span>Pilih DSKP di Langkah 2</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed pl-6">
                Pilih Bab, SK &amp; SP. Objektif SMART dan aktiviti PdPc akan dijana automatik mengikut sukatan KPM.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-6">
        {/* TOP SETTINGS BAR: Mata Pelajaran + Bahasa + Format Cetakan */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-stretch">
          {/* Card 1: Mata Pelajaran */}
          <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/90 flex flex-col justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl ${
                isPink
                  ? 'bg-pink-100 text-pink-700'
                  : isAmber
                  ? 'bg-amber-100 text-amber-700'
                  : isTurquoise
                  ? 'bg-teal-100 text-teal-700'
                  : 'bg-emerald-100 text-emerald-700'
              } flex items-center justify-center shrink-0`}>
                {isPink ? (
                  <Dna className="w-4 h-4" />
                ) : isAmber ? (
                  <Atom className="w-4 h-4" />
                ) : isTurquoise ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <FlaskConical className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide truncate">
                  Mata Pelajaran
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {portalSubject === 'biologi'
                    ? 'Biologi SPM atau Sains KSSM'
                    : portalSubject === 'fizik'
                    ? 'Fizik SPM atau Sains KSSM'
                    : portalSubject === 'sains'
                    ? 'Sains KSSM (Tingkatan 2 – 5)'
                    : portalSubject === 'matematik'
                    ? 'Matematik KSSM (Tingkatan 2 – 5)'
                    : portalSubject === 'matematik-tambahan'
                    ? 'Matematik Tambahan SPM (Tingkatan 4 & 5)'
                    : 'Kimia SPM atau Sains KSSM'}
                </p>
              </div>
            </div>
            <div className={`grid ${portalSubject === 'sains' || portalSubject === 'matematik' || portalSubject === 'matematik-tambahan' ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
              {portalSubject === 'sains' ? (
                <button
                  type="button"
                  className="min-h-[42px] px-2.5 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 apple-btn-icy text-white shadow-xs cursor-default"
                >
                  <Atom className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Sains KSSM (T2–T5)</span>
                </button>
              ) : portalSubject === 'matematik' ? (
                <button
                  type="button"
                  className="min-h-[42px] px-2.5 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 apple-btn-indigo text-white shadow-xs cursor-default"
                >
                  <Calculator className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Matematik KSSM (T2–T5)</span>
                </button>
              ) : portalSubject === 'matematik-tambahan' ? (
                <button
                  type="button"
                  className="min-h-[42px] px-2.5 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 apple-btn-charcoal text-white shadow-xs cursor-default"
                >
                  <Compass className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">AddMaths SPM (T4–T5)</span>
                </button>
              ) : (
                <>
                  {portalSubject === 'biologi' ? (
                    <button
                      type="button"
                      onClick={() => onSubjekChange('Biologi')}
                      className={`min-h-[42px] px-2.5 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        subjek === 'Biologi'
                          ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Dna className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Biologi (T4–T5)</span>
                    </button>
                  ) : portalSubject === 'fizik' ? (
                    <button
                      type="button"
                      onClick={() => onSubjekChange('Fizik')}
                      className={`min-h-[42px] px-2.5 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        subjek === 'Fizik'
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Atom className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Fizik (T4–T5)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSubjekChange('Kimia')}
                      className={`min-h-[42px] px-2.5 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        subjek === 'Kimia'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <FlaskConical className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Kimia (T4–T5)</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onSubjekChange('Sains')}
                    className={`min-h-[42px] px-2.5 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      subjek === 'Sains'
                        ? isPink
                          ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                          : isAmber
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Atom className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Sains (T2–T5)</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Card 2: Bahasa Pengantar RPH */}
          <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/90 flex flex-col justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide truncate">
                  Bahasa Pengantar (BM / DLP)
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {bahasa === 'DLP' ? 'Dual Language Programme' : 'Sukatan Bahasa Kebangsaan'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onBahasaChange('BM')}
                className={`min-h-[42px] px-2.5 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  bahasa !== 'DLP'
                    ? isPink ? 'bg-pink-600 text-white border-pink-600 shadow-xs' : 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="shrink-0">🇲🇾</span>
                <span className="truncate">Bahasa Melayu</span>
              </button>
              <button
                type="button"
                onClick={() => onBahasaChange('DLP')}
                className={`min-h-[42px] px-2.5 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  bahasa === 'DLP'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="shrink-0">🇬🇧</span>
                <span className="truncate">DLP (English)</span>
              </button>
            </div>
          </div>

          {/* Card 3: Saiz & Susun Atur Cetakan */}
          <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/90 flex flex-col justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl ${
                isPink
                  ? 'bg-pink-100 text-pink-700'
                  : isAmber
                  ? 'bg-amber-100 text-amber-700'
                  : isTurquoise
                  ? 'bg-teal-100 text-teal-700'
                  : 'bg-emerald-100 text-emerald-700'
              } flex items-center justify-center shrink-0`}>
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide truncate">
                  Format Susun Atur Cetakan
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {isCompact ? 'Padat 1 Halaman A4' : 'Lengkap Terperinci KPM/5E'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onCompactChange(false)}
                className={`min-h-[42px] px-2.5 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center cursor-pointer ${
                  !isCompact
                    ? isPink
                      ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                      : isAmber
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : isTurquoise
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">Standard (Penuh)</span>
              </button>
              <button
                type="button"
                onClick={() => onCompactChange(true)}
                className={`min-h-[42px] px-2.5 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center cursor-pointer ${
                  isCompact
                    ? isPink
                      ? 'bg-pink-700 text-white border-pink-700 shadow-xs'
                      : isAmber
                      ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                      : isTurquoise
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">Compact 1-M/S</span>
              </button>
            </div>
          </div>
        </div>

        {/* Identity Section */}
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <School className={`w-4 h-4 ${isPink ? 'text-pink-600' : 'text-emerald-600'}`} />
          <span>Identiti Guru &amp; Sekolah</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Guru
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={info.namaGuru}
                onChange={(e) => handleFieldChange('namaGuru', e.target.value)}
                placeholder="Cikgu Ahmad bin Salleh"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Sekolah / Maktab
            </label>
            <div className="relative">
              <School className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={info.namaSekolah}
                onChange={(e) =>
                  handleFieldChange('namaSekolah', e.target.value)
                }
                placeholder="SMK Seri Bintang Utara / MRSM"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
              />
            </div>
          </div>
        </div>

        {/* MUAT NAIK JADUAL WAKTU KELAS SECTION (Automatic Extraction of Kelas, Masa, Hari, Waktu) */}
        <div className="rounded-xl border border-emerald-200/90 bg-emerald-50/30 p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">
                  Muat Naik Jadual Waktu Kelas (PNG, JPEG, PDF &amp; CSV)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Muat naik jadual waktu anda — maklumat kelas, masa, hari &amp; tempoh waktu diekstrak secara automatik.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                id="timetable-upload-input"
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,application/pdf,text/csv,text/plain,.png,.jpg,.jpeg,.webp,.pdf,.csv,.txt"
                onChange={handleTimetableFileUpload}
                className="hidden"
              />
              <button
                type="button"
                disabled={isExtractingTimetable}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>
                  {isExtractingTimetable
                    ? extractionStatus || 'Mengekstrak Jadual...'
                    : 'Muat Naik Jadual (PNG / JPEG / PDF)'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleAddManualSlotToTimetable}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                title="Simpan waktu & kelas semasa ke senarai jadual anda"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simpan Slot Semasa</span>
              </button>

              {(timetableSlots.length > 0 || timetablePreviewUrl) && (
                <button
                  type="button"
                  onClick={() => setShowSlotEditor((prev) => !prev)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                >
                  {showSlotEditor ? (
                    <Eye className="w-3.5 h-3.5 text-teal-600" />
                  ) : (
                    <Edit3 className="w-3.5 h-3.5 text-teal-600" />
                  )}
                  <span>
                    {showSlotEditor ? 'Tutup Suntingan' : 'Sunting Slot Jadual'}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Non-blocking Notice */}
          {timetableNotice && (
            <div
              className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${
                timetableNotice.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-start gap-2">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    timetableNotice.type === 'success'
                      ? 'text-emerald-600'
                      : 'text-amber-600'
                  }`}
                />
                <span>{timetableNotice.text}</span>
              </div>
              <button
                type="button"
                onClick={() => setTimetableNotice(null)}
                className="text-slate-400 hover:text-slate-600 text-[11px] font-bold shrink-0"
              >
                Tutup
              </button>
            </div>
          )}

          {/* Multi-Teacher / Week A & B Selector for Master PDF */}
          {pdfSections.length > 1 && (
            <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                <CalendarRange className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Pilih Jadual Guru / Minggu daripada PDF ({pdfSections.length} jadual ditemui):</span>
              </div>
              <select
                value={selectedSectionId}
                onChange={(e) => {
                  const secId = e.target.value;
                  setSelectedSectionId(secId);
                  const found = pdfSections.find((s) => s.id === secId);
                  if (found) {
                    const mappedSlots: SlotJadualWaktu[] = found.slots.map((s, idx) => ({
                      id: `slot_${Date.now()}_${idx}`,
                      ...s,
                    }));
                    setTimetableSlots(mappedSlots);
                    simpanSlotJadualWaktu(mappedSlots);
                    if (mappedSlots[0]) {
                      handleBatchUpdate({
                        tingkatan: mappedSlots[0].tingkatan,
                        kelas: mappedSlots[0].kelas,
                        hari: mappedSlots[0].hari,
                        masaMula: mappedSlots[0].masaMula,
                        masaTamat: mappedSlots[0].masaTamat,
                        tempohMinit: mappedSlots[0].tempohMinit,
                      });
                    }
                  }
                }}
                className="px-3 py-1.5 rounded-lg border border-indigo-300 bg-white text-indigo-950 font-bold text-xs max-w-full sm:max-w-xs"
              >
                {pdfSections.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.label} ({sec.slots.length} slot)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Extracted / Saved Timetable Slots */}
          {timetableSlots.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span className="font-semibold">
                  Senarai Slot Jadual Waktu Kelas ({timetableSlots.length} slot — klik untuk isi kelas, hari, masa &amp; tempoh secara automatik):
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setTimetableSlots([]);
                    simpanSlotJadualWaktu([]);
                  }}
                  className="text-red-600 hover:underline font-semibold"
                >
                  Kosongkan Jadual
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {timetableSlots.map((slot) => {
                  const isActive =
                    info.hari === slot.hari &&
                    info.masaMula === slot.masaMula &&
                    info.kelas === slot.kelas;
                  return (
                    <div
                      key={slot.id}
                      className={`inline-flex items-center rounded-xl border text-xs transition overflow-hidden ${
                        isActive
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleApplyTimetableSlot(slot, false)}
                        className="px-3 py-1.5 text-left font-semibold flex items-center gap-1.5"
                      >
                        <span className="font-extrabold">{slot.hari}</span>
                        <span>•</span>
                        <span>
                          {slot.masaMula}–{slot.masaTamat} ({slot.tempohMinit}m)
                        </span>
                        <span>•</span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          {slot.kelas}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyTimetableSlot(slot, true)}
                        className={`px-2 py-1.5 border-l text-[10px] font-bold ${
                          isActive
                            ? 'border-emerald-600 hover:bg-emerald-800 text-emerald-100'
                            : 'border-slate-100 hover:bg-emerald-50 text-emerald-700'
                        }`}
                        title="Tambah sebagai kelas kedua/tambahan dalam RPH ini"
                      >
                        +Kelas
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveTimetableSlot(slot.id)}
                        className={`px-1.5 py-1.5 border-l ${
                          isActive
                            ? 'border-emerald-600 text-emerald-200 hover:text-white'
                            : 'border-slate-100 text-slate-400 hover:text-red-600'
                        }`}
                        title="Padam slot ini"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Optional Collapsible Slot Editor & Uploaded Timetable Preview */}
          {showSlotEditor && (
            <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-3 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800">
                  Sunting / Semak Slot Jadual Waktu Kelas
                </span>
                <button
                  type="button"
                  onClick={handleAddManualSlotToTimetable}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Baris Slot</span>
                </button>
              </div>

              {timetablePreviewUrl && (
                <div className="rounded-lg border border-slate-200 overflow-hidden bg-slate-50 max-h-64 overflow-y-auto p-1">
                  <img
                    src={timetablePreviewUrl}
                    alt="Pratonton Jadual Waktu"
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
              )}

              {timetableSlots.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {timetableSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 text-xs"
                    >
                      <select
                        value={slot.hari}
                        onChange={(e) =>
                          handleUpdateTimetableSlot(slot.id, {
                            hari: e.target.value,
                          })
                        }
                        className="w-full min-w-0 px-2 py-1.5 rounded border border-slate-200 bg-white font-semibold"
                      >
                        <option value="Isnin">Isnin</option>
                        <option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option>
                        <option value="Khamis">Khamis</option>
                        <option value="Jumaat">Jumaat</option>
                        <option value="Ahad">Ahad</option>
                        <option value="Sabtu">Sabtu</option>
                      </select>
                      <input
                        type="text"
                        value={slot.kelas}
                        onChange={(e) =>
                          handleUpdateTimetableSlot(slot.id, {
                            kelas: e.target.value,
                          })
                        }
                        placeholder="Nama Kelas"
                        className="w-full min-w-0 px-2 py-1.5 rounded border border-slate-200 bg-white font-bold"
                      />
                      <input
                        type="time"
                        value={slot.masaMula}
                        onChange={(e) =>
                          handleUpdateTimetableSlot(slot.id, {
                            masaMula: e.target.value,
                          })
                        }
                        className="w-full min-w-0 max-w-full px-2 py-1.5 rounded border border-slate-200 bg-white"
                      />
                      <input
                        type="time"
                        value={slot.masaTamat}
                        onChange={(e) =>
                          handleUpdateTimetableSlot(slot.id, {
                            masaTamat: e.target.value,
                          })
                        }
                        className="w-full min-w-0 max-w-full px-2 py-1.5 rounded border border-slate-200 bg-white"
                      />
                      <div className="flex items-center justify-between gap-1 min-w-0">
                        <span className="text-[11px] font-bold text-emerald-800 px-1.5 py-0.5 rounded bg-emerald-100 whitespace-nowrap">
                          {slot.tempohMinit} min
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTimetableSlot(slot.id)}
                          className="p-1 text-slate-400 hover:text-red-600 shrink-0"
                          title="Padam slot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Jadual & Butiran Kelas Utama */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 pt-2">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Jadual &amp; Butiran Kelas Utama</span>
          </h3>

          <button
            type="button"
            onClick={handleAddExtraClass}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span>Tambah Kelas Lain (Jana RPH Sama Untuk &gt;1 Kelas)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Tingkatan */}
          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tingkatan ({subjek === 'Sains' ? 'Sains KSSM' : 'Kimia KSSM'})
            </label>
            <select
              value={info.tingkatan}
              onChange={(e) =>
                handleFieldChange('tingkatan', e.target.value as Tingkatan)
              }
              className="w-full min-w-0 max-w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white font-medium text-emerald-900 cursor-pointer"
            >
              {getTingkatanListBySubjek(subjek).map((t) => {
                const formNum = t.replace('Tingkatan ', '');
                const label =
                  bahasa === 'DLP'
                    ? `Form ${formNum} (${subjek})`
                    : `${t} (${subjek})`;
                return (
                  <option key={t} value={t}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Kelas */}
          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Kelas Utama
            </label>
            <input
              type="text"
              list="senarai-kelas"
              value={info.kelas}
              onChange={(e) => handleFieldChange('kelas', e.target.value)}
              placeholder="cth: 4 Sains 1"
              className="w-full min-w-0 max-w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
            />
            <datalist id="senarai-kelas">
              {SENARAI_KELAS_DEFAULT.map((k) => (
                <option key={k} value={k} />
              ))}
            </datalist>
          </div>

          {/* Tarikh */}
          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tarikh PdPC
            </label>
            <input
              type="date"
              value={info.tarikh}
              onChange={(e) => handleFieldChange('tarikh', e.target.value)}
              className="w-full min-w-0 max-w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white box-border"
            />
          </div>

          {/* Hari */}
          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Hari
            </label>
            <select
              value={info.hari}
              onChange={(e) => handleFieldChange('hari', e.target.value)}
              className="w-full min-w-0 max-w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
            >
              <option value="Isnin">Isnin (Monday)</option>
              <option value="Selasa">Selasa (Tuesday)</option>
              <option value="Rabu">Rabu (Wednesday)</option>
              <option value="Khamis">Khamis (Thursday)</option>
              <option value="Jumaat">Jumaat (Friday)</option>
              <option value="Ahad">Ahad (Sunday)</option>
              <option value="Sabtu">Sabtu (Saturday)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Masa Mula */}
          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Masa Mula
            </label>
            <div className="relative min-w-0 overflow-hidden rounded-xl">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none z-10" />
              <input
                type="time"
                value={info.masaMula}
                onChange={(e) => handleFieldChange('masaMula', e.target.value)}
                className="w-full min-w-0 max-w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white box-border"
              />
            </div>
          </div>

          {/* Tempoh Minit */}
          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tempoh Sesi (Minit)
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[30, 60, 90, 120].map((dur) => (
                <button
                  type="button"
                  key={dur}
                  onClick={() => handleFieldChange('tempohMinit', dur)}
                  className={`py-2.5 px-1 text-xs font-bold rounded-lg border transition text-center ${
                    info.tempohMinit === dur
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {dur}m
                </button>
              ))}
            </div>
          </div>

          {/* Masa Tamat (Auto) */}
          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Masa Tamat (Auto)
            </label>
            <input
              type="time"
              value={info.masaTamat}
              onChange={(e) => handleFieldChange('masaTamat', e.target.value)}
              className="w-full min-w-0 max-w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50 font-medium text-slate-700 box-border"
            />
          </div>

          {/* Minggu Persekolahan */}
          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Minggu Akademik
            </label>
            <input
              type="number"
              min="1"
              max="45"
              value={info.mingguAkademik}
              onChange={(e) =>
                handleFieldChange('mingguAkademik', Number(e.target.value))
              }
              className="w-full min-w-0 max-w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
            />
          </div>
        </div>

        {/* MULTI-CLASS (KELAS TAMBAHAN) LIST IF TEACHER ADDS >1 CLASS FOR SAME LESSON */}
        {extraClasses.length > 0 && (
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-950">
                Kelas Tambahan Bagi RPH / Lesson Ini ({extraClasses.length}{' '}
                kelas tambahan):
              </span>
              <button
                type="button"
                onClick={handleAddExtraClass}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Kelas Lagi</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {extraClasses.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-emerald-200 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5 items-end"
                >
                  <div className="min-w-0">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nama Kelas Ke-{idx + 2}
                    </label>
                    <input
                      type="text"
                      list="senarai-kelas"
                      value={item.kelas}
                      onChange={(e) =>
                        handleUpdateExtraClass(idx, { kelas: e.target.value })
                      }
                      placeholder="cth: 4 Sains 2"
                      className="w-full min-w-0 max-w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 font-bold text-slate-900"
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Tarikh
                    </label>
                    <input
                      type="date"
                      value={item.tarikh}
                      onChange={(e) =>
                        handleUpdateExtraClass(idx, { tarikh: e.target.value })
                      }
                      className="w-full min-w-0 max-w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 box-border"
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Hari
                    </label>
                    <select
                      value={item.hari}
                      onChange={(e) =>
                        handleUpdateExtraClass(idx, { hari: e.target.value })
                      }
                      className="w-full min-w-0 max-w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="Isnin">Isnin</option>
                      <option value="Selasa">Selasa</option>
                      <option value="Rabu">Rabu</option>
                      <option value="Khamis">Khamis</option>
                      <option value="Jumaat">Jumaat</option>
                      <option value="Ahad">Ahad</option>
                      <option value="Sabtu">Sabtu</option>
                    </select>
                  </div>
                  <div className="min-w-0">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Masa Mula
                    </label>
                    <input
                      type="time"
                      value={item.masaMula}
                      onChange={(e) =>
                        handleUpdateExtraClass(idx, {
                          masaMula: e.target.value,
                        })
                      }
                      className="w-full min-w-0 max-w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 box-border"
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Masa Tamat
                    </label>
                    <input
                      type="time"
                      value={item.masaTamat}
                      onChange={(e) =>
                        handleUpdateExtraClass(idx, {
                          masaTamat: e.target.value,
                        })
                      }
                      className="w-full min-w-0 max-w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 box-border"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="flex-1 min-w-0">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Kehadiran
                      </label>
                      <input
                        type="text"
                        value={item.kehadiranMurid}
                        onChange={(e) =>
                          handleUpdateExtraClass(idx, {
                            kehadiranMurid: e.target.value,
                          })
                        }
                        className="w-full min-w-0 max-w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveExtraClass(idx)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition mt-4 shrink-0"
                      title="Buang kelas tambahan ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Model PdPC Selector: Standard KPM vs 5E Pedagogi Hikmah MRSM */}
        <div className="bg-gradient-to-r from-slate-50 to-emerald-50/40 rounded-xl p-4 border border-emerald-200/80 space-y-2">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Format &amp; Kerangka Model PdPC
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onModelChange('Standard KPM')}
              className={`p-3 rounded-xl border text-left transition flex items-start gap-3 ${
                modelPdpc === 'Standard KPM'
                  ? 'bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/20'
                  : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                  modelPdpc === 'Standard KPM'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {modelPdpc === 'Standard KPM' ? '✓' : '1'}
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Model Standard KPM (3 Fasa)
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Set Induksi (5-10m) • Aktiviti Utama PAK-21 • Penutup / Exit
                  Ticket
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onModelChange('5E Pedagogi HIKMAH (MRSM)')}
              className={`p-3 rounded-xl border text-left transition flex items-start gap-3 ${
                modelPdpc === '5E Pedagogi HIKMAH (MRSM)'
                  ? 'bg-white border-indigo-600 shadow-sm ring-2 ring-indigo-500/20'
                  : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                  modelPdpc === '5E Pedagogi HIKMAH (MRSM)'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {modelPdpc === '5E Pedagogi HIKMAH (MRSM)' ? '✓' : '2'}
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-900">
                    Konsep 5E Pedagogi HIKMAH (MRSM)
                  </p>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-extrabold">
                    MARA
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Engage • Explore • Explain • Elaborate • Evaluate + Atribut
                  HIKMAH
                </p>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Enrolmen Murid */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Bilangan Murid Keseluruhan
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                inputMode="numeric"
                value={info.bilanganMurid}
                onChange={(e) => {
                  const raw = e.target.value;
                  const parsed = raw === '' ? '' : parseInt(raw, 10) || raw;
                  handleBatchUpdate({
                    bilanganMurid: parsed,
                    kehadiranMurid: `${parsed} / ${parsed}`,
                  });
                }}
                placeholder="cth: 28"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white font-medium text-slate-900"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Anda boleh memasukkan sebarang bilangan murid (cth: 24, 28, 32).
            </p>
          </div>

          {/* Kehadiran */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Format Kehadiran PdPC
            </label>
            <input
              type="text"
              value={info.kehadiranMurid}
              onChange={(e) =>
                handleFieldChange('kehadiranMurid', e.target.value)
              }
              placeholder="cth: 28 / 28"
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white font-medium text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Navigation bottom */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${
            isPink
              ? 'bg-pink-600 hover:bg-pink-700 shadow-pink-600/25'
              : isAmber
              ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
              : isTurquoise
              ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20'
              : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
          } text-white font-semibold text-sm transition shadow-md`}
        >
          <span>Seterusnya: Pilih Sukatan DSKP / Program Khas</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
