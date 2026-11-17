import React, { useState, useRef } from 'react';
import { RPHData } from '../types/rph';
import {
  janaTeksFormatERph,
  muatTurunDokumenWord,
  muatTurunRPHMingguanWord,
  muatTurunDokumenPdf,
  muatTurunDokumenSpreadsheet,
  muatTurunRPHMingguanSpreadsheet,
  binaHtmlSatuRPH,
  simpanRPH,
} from '../utils/rphStorage';
import {
  simpanRPHKeCloud,
  logAktivitiPenggunaan,
  getGoogleClassroomAccessToken,
  connectGoogleClassroomToken,
} from '../services/firebase';
import { MoleculeWatermark, LabApparatusWatermark, BiologyDnaWatermark, PhysicsAtomWatermark } from './ChemistryDecor';
import {
  Printer,
  FileDown,
  FileSpreadsheet,
  Copy,
  Check,
  Bookmark,
  ArrowLeft,
  FlaskConical,
  Edit3,
  Minimize2,
  FileText,
  Send,
  BookOpen,
  Users,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
} from 'lucide-react';

const cleanListItem = (text: string): string => {
  if (!text) return '';
  return text.trim().replace(/^(\d+[\.\)]\s*|[-*•]\s*)/, '');
};

interface Step6PratontonProps {
  rph: RPHData;
  portalSubject?: string;
  onUpdateRph?: (updated: Partial<RPHData>) => void;
  onEditStep: (step: number) => void;
  onNewRph: () => void;
}

interface ClassroomCourse {
  id: string;
  name: string;
  section?: string;
}

export const Step6Pratonton: React.FC<Step6PratontonProps> = ({
  rph,
  portalSubject = 'kimia',
  onUpdateRph,
  onEditStep,
  onNewRph,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedClassIndex, setSelectedClassIndex] = useState<number>(-1); // -1 = Gabungan Semua Kelas
  const rphSheetRef = useRef<HTMLDivElement>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingWord, setIsDownloadingWord] = useState(false);
  const [isDownloadingExcel, setIsDownloadingExcel] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Google Classroom Modal State
  const [isClassroomModalOpen, setIsClassroomModalOpen] = useState(false);
  const [courses, setCourses] = useState<ClassroomCourse[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [postType, setPostType] = useState<'material' | 'announcement'>(
    'material'
  );
  const [isClassroomLoading, setIsClassroomLoading] = useState(false);
  const [classroomError, setClassroomError] = useState<string | null>(null);
  const [classroomConfirmStep, setClassroomConfirmStep] = useState(false);
  const [classroomSuccessUrl, setClassroomSuccessUrl] = useState<string | null>(
    null
  );

  // Microsoft OneNote Modal State
  const [isOneNoteModalOpen, setIsOneNoteModalOpen] = useState(false);
  const [oneNoteCopied, setOneNoteCopied] = useState(false);

  const isDlp = rph.bahasa === 'DLP';
  const isCompact = !!rph.isCompact;
  const isPink = portalSubject === 'biologi';
  const isAmber = portalSubject === 'fizik';
  const isTurquoise = portalSubject === 'sains';
  const isIndigo = portalSubject === 'matematik';
  const isCharcoal = portalSubject === 'matematik-tambahan';
  const extraClasses = rph.info.kelasTambahan || [];
  const hasMultipleClasses = extraClasses.length > 0;

  // Build list of class variants if teacher has multiple classes for this RPH
  const allClassVariants: RPHData[] = [
    rph,
    ...extraClasses.map((k, idx) => ({
      ...rph,
      id: `${rph.id}_cls_${idx + 1}`,
      info: {
        ...rph.info,
        kelas: k.kelas,
        masaMula: k.masaMula,
        masaTamat: k.masaTamat,
        bilanganMurid: k.bilanganMurid,
        kehadiranMurid: k.kehadiranMurid,
        kelasTambahan: [],
      },
    })),
  ];

  // Active RPH shown in preview
  const displayRph =
    selectedClassIndex >= 0 && selectedClassIndex < allClassVariants.length
      ? allClassVariants[selectedClassIndex]
      : rph;
  const isSains =
    displayRph.subjek === 'Sains' ||
    displayRph.info?.subjek === 'Sains' ||
    displayRph.babId?.startsWith('S_');

  // Dynamic Subject Resolution
  const currentSubject = displayRph.subjek || displayRph.info?.subjek || (isSains ? 'Sains' : portalSubject === 'biologi' ? 'Biologi' : portalSubject === 'fizik' ? 'Fizik' : portalSubject === 'matematik' ? 'Matematik' : portalSubject === 'matematik-tambahan' ? 'Matematik Tambahan' : 'Kimia');
  const isCurrentSains = currentSubject === 'Sains';
  const isCurrentMath = currentSubject === 'Matematik';
  const isCurrentAddMath = currentSubject === 'Matematik Tambahan';

  const subjectUpperBm = currentSubject.toUpperCase();
  const subjectUpperEn = currentSubject === 'Biologi' ? 'BIOLOGY' : currentSubject === 'Kimia' ? 'CHEMISTRY' : currentSubject === 'Fizik' ? 'PHYSICS' : currentSubject === 'Sains' ? 'SCIENCE' : currentSubject === 'Matematik' ? 'MATHEMATICS' : currentSubject === 'Matematik Tambahan' ? 'ADDITIONAL MATHEMATICS' : currentSubject.toUpperCase();

  const subjectTitleBm = isCurrentSains ? 'Sains KSSM' : isCurrentMath ? 'Matematik KSSM' : isCurrentAddMath ? 'Matematik Tambahan SPM' : `${currentSubject} SPM`;
  const subjectTitleEn = isCurrentSains ? 'Science KSSM' : isCurrentMath ? 'Mathematics KSSM' : isCurrentAddMath ? 'Additional Mathematics SPM' : `${currentSubject === 'Biologi' ? 'Biology' : currentSubject === 'Kimia' ? 'Chemistry' : currentSubject === 'Fizik' ? 'Physics' : currentSubject} SPM`;

  const ea = displayRph.elemenAktif || {};
  const showPak21 = ea.pak21 !== false && displayRph.pak21Kaedah.length > 0;
  const showKbat = ea.kbat !== false && displayRph.kbatAras.length > 0;
  const showKps =
    ea.kps !== false &&
    (displayRph.kemahiranSaintifik.length > 0 ||
      displayRph.kemahiranManipulatif.length > 0);
  const showBbm = ea.bbm !== false && displayRph.bbm.length > 0;
  const showEmk = ea.emk !== false && displayRph.emk.length > 0;
  const showNilai = ea.nilaiMurni !== false && displayRph.nilaiMurni.length > 0;
  const showPentaksiran =
    ea.pentaksiran !== false &&
    (displayRph.pentaksiranPbd.length > 0 ||
      displayRph.tahapPenguasaan.length > 0);
  const showAnyElemenTable =
    showPak21 ||
    showKbat ||
    showKps ||
    showBbm ||
    showEmk ||
    showNilai ||
    showPentaksiran;
  const showRefleksi = ea.refleksi !== false;

  const handleCopyText = async () => {
    const text = janaTeksFormatERph(displayRph);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownloadPdf = async () => {
    if (!rphSheetRef.current) return;
    setIsDownloadingPdf(true);
    setDownloadNotice('Menyediakan fail PDF berkualiti tinggi...');
    try {
      const res = await muatTurunDokumenPdf(rphSheetRef.current, displayRph, isCompact);
      if (res?.method === 'share') {
        setDownloadNotice('Menu perkongsian dibuka. Tekan "Save to Files" (Simpan ke Fail) untuk simpan ke peranti anda.');
      } else {
        setDownloadNotice('Fail PDF berjaya dimuat turun!');
      }
      setTimeout(() => setDownloadNotice(null), 6000);
      logAktivitiPenggunaan(
        'MUAT_TURUN_PDF',
        `Muat turun PDF: ${displayRph.info.tingkatan} (${displayRph.info.kelas}) • ${displayRph.babTajuk}`,
        displayRph.info.namaSekolah
      );
    } catch (err) {
      console.error('Ralat muat turun PDF:', err);
      setDownloadNotice('Gagal menjana PDF secara automatik. Sila gunakan butang "Cetak / AirPrint" sebagai alternatif.');
      setTimeout(() => setDownloadNotice(null), 6000);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadWord = async () => {
    setIsDownloadingWord(true);
    setDownloadNotice('Menyediakan fail Word (.doc)...');
    try {
      let res;
      if (hasMultipleClasses && selectedClassIndex === -1) {
        res = await muatTurunRPHMingguanWord(
          allClassVariants,
          `RPH_${currentSubject}_MultiKelas_${rph.info.tarikh}`
        );
      } else {
        res = await muatTurunDokumenWord(displayRph);
      }
      if (res?.method === 'share') {
        setDownloadNotice('Menu perkongsian dibuka. Tekan "Save to Files" atau buka dalam aplikasi Word.');
      } else {
        setDownloadNotice('Fail Word berjaya dimuat turun!');
      }
      setTimeout(() => setDownloadNotice(null), 5000);
      logAktivitiPenggunaan(
        'MUAT_TURUN_WORD',
        `Muat turun Word: ${displayRph.info.tingkatan} (${displayRph.info.kelas}) • ${displayRph.babTajuk}`,
        displayRph.info.namaSekolah
      );
    } catch (err) {
      console.error('Ralat muat turun Word:', err);
      setDownloadNotice('Gagal memuat turun fail Word. Sila cuba lagi.');
      setTimeout(() => setDownloadNotice(null), 5000);
    } finally {
      setIsDownloadingWord(false);
    }
  };

  const handleDownloadSpreadsheet = async () => {
    setIsDownloadingExcel(true);
    setDownloadNotice('Menyediakan fail Spreadsheet Excel (.xls)...');
    try {
      let res;
      if (hasMultipleClasses && selectedClassIndex === -1) {
        res = await muatTurunRPHMingguanSpreadsheet(
          allClassVariants,
          `RPH_${currentSubject}_MultiKelas_${rph.info.tarikh}`
        );
      } else {
        res = await muatTurunDokumenSpreadsheet(displayRph);
      }
      if (res?.method === 'share') {
        setDownloadNotice('Menu perkongsian dibuka. Tekan "Save to Files" atau buka dalam aplikasi Excel / Numbers.');
      } else {
        setDownloadNotice('Fail Spreadsheet berjaya dimuat turun!');
      }
      setTimeout(() => setDownloadNotice(null), 5000);
      logAktivitiPenggunaan(
        'MUAT_TURUN_SPREADSHEET',
        `Muat turun Spreadsheet: ${displayRph.info.tingkatan} (${displayRph.info.kelas}) • ${displayRph.babTajuk}`,
        displayRph.info.namaSekolah
      );
    } catch (err) {
      console.error('Ralat muat turun Spreadsheet:', err);
      setDownloadNotice('Gagal memuat turun fail Spreadsheet. Sila cuba lagi.');
      setTimeout(() => setDownloadNotice(null), 5000);
    } finally {
      setIsDownloadingExcel(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.error('Print failed:', e);
      handleDownloadPdf();
    }
  };

  const handleSaveToLibrary = async () => {
    if (hasMultipleClasses) {
      for (const variant of allClassVariants) {
        simpanRPH(variant);
        await simpanRPHKeCloud(variant);
      }
    } else {
      simpanRPH(rph);
      await simpanRPHKeCloud(rph);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // ============================================================================
  // GOOGLE CLASSROOM INTEGRATION
  // ============================================================================
  const handleOpenClassroomModal = async () => {
    setIsClassroomModalOpen(true);
    setClassroomError(null);
    setClassroomSuccessUrl(null);
    setClassroomConfirmStep(false);

    let token = getGoogleClassroomAccessToken();
    if (!token) {
      setIsClassroomLoading(true);
      const connectedToken = await connectGoogleClassroomToken();
      setIsClassroomLoading(false);
      if (!connectedToken) {
        setClassroomError(
          'Sila benarkan akses Google Classroom terlebih dahulu.'
        );
        return;
      }
      token = connectedToken;
    }

    await fetchClassroomCourses(token);
  };

  const fetchClassroomCourses = async (token: string) => {
    setIsClassroomLoading(true);
    setClassroomError(null);
    try {
      const response = await fetch(
        'https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        const refreshedToken = await connectGoogleClassroomToken();
        if (refreshedToken) {
          return fetchClassroomCourses(refreshedToken);
        }
        setClassroomError(
          'Sesi Google Classroom tamat atau belum dibenarkan. Sila klik Sambung Semula.'
        );
        return;
      }
      const data = await response.json();
      const list: ClassroomCourse[] = data.courses || [];
      setCourses(list);
      if (list.length > 0 && !selectedCourseId) {
        setSelectedCourseId(list[0].id);
      }
    } catch (e: any) {
      setClassroomError(
        e.message || 'Gagal memuatkan senarai kelas Google Classroom.'
      );
    } finally {
      setIsClassroomLoading(false);
    }
  };

  const handlePublishToClassroom = async () => {
    const token = getGoogleClassroomAccessToken();
    if (!token || !selectedCourseId) return;

    setIsClassroomLoading(true);
    setClassroomError(null);
    try {
      const rphTitle = `RPH ${currentSubject} ${displayRph.info.tingkatan} (${displayRph.info.kelas}) - ${displayRph.info.tarikh}: ${displayRph.babTajuk}`;
      const rphBodyText = janaTeksFormatERph(displayRph);

      if (postType === 'material') {
        const res = await fetch(
          `https://classroom.googleapis.com/v1/courses/${selectedCourseId}/courseWorkMaterials`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: rphTitle,
              description: rphBodyText,
              state: 'PUBLISHED',
            }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(
            data.error?.message || 'Gagal menghantar CourseWorkMaterial.'
          );
        }
        setClassroomSuccessUrl(
          data.alternateLink || 'https://classroom.google.com'
        );
      } else {
        const res = await fetch(
          `https://classroom.googleapis.com/v1/courses/${selectedCourseId}/announcements`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: `${rphTitle}\n\n${rphBodyText}`,
              state: 'PUBLISHED',
            }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(
            data.error?.message || 'Gagal menghantar Pengumuman Classroom.'
          );
        }
        setClassroomSuccessUrl(
          data.alternateLink || 'https://classroom.google.com'
        );
      }

      logAktivitiPenggunaan(
        'SIMPAN_RPH',
        `Hantar RPH ke Google Classroom (${displayRph.info.kelas})`,
        displayRph.info.namaSekolah
      );
      setClassroomConfirmStep(false);
    } catch (err: any) {
      setClassroomError(
        err.message || 'Ralat semasa menghantar ke Google Classroom.'
      );
    } finally {
      setIsClassroomLoading(false);
    }
  };

  // ============================================================================
  // MICROSOFT ONENOTE EXPORT / COPY RICH HTML
  // ============================================================================
  const handleCopyRichHtmlForOneNote = async () => {
    const htmlContent = binaHtmlSatuRPH(displayRph);
    const plainContent = janaTeksFormatERph(displayRph);
    try {
      if (typeof ClipboardItem !== 'undefined') {
        const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
        const textBlob = new Blob([plainContent], { type: 'text/plain' });
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob,
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(plainContent);
      }
      setOneNoteCopied(true);
      setTimeout(() => setOneNoteCopied(false), 3000);
    } catch {
      await navigator.clipboard.writeText(plainContent);
      setOneNoteCopied(true);
      setTimeout(() => setOneNoteCopied(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Action Header bar (Hidden on print) */}
      <div className={`relative overflow-hidden print:hidden ${
        isPink
          ? 'bg-gradient-to-r from-[#8c3d55]/90 via-[#9c4a63]/90 to-slate-900/90 shadow-pink-950/15'
          : isAmber
          ? 'bg-gradient-to-r from-[#8c490a]/90 via-[#9e540e]/90 to-slate-900/90 shadow-amber-950/15'
          : isTurquoise
          ? 'bg-gradient-to-r from-sky-800/90 via-cyan-800/90 to-slate-900/90 shadow-sky-950/15'
          : isIndigo
          ? 'bg-gradient-to-r from-[#312e81]/90 via-[#3730a3]/90 to-slate-900/90 shadow-indigo-950/15'
          : isCharcoal
          ? 'bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-zinc-900/95 shadow-slate-950/15'
          : 'bg-gradient-to-r from-emerald-800/90 via-teal-800/90 to-slate-900/90 shadow-emerald-950/15'
      } backdrop-blur-2xl rounded-3xl p-6 text-white shadow-xl border border-white/20 ring-1 ring-black/5 space-y-4`}>
        {isPink ? (
          <BiologyDnaWatermark className="w-56 h-56 text-white/10 absolute -right-6 -bottom-10" />
        ) : isAmber ? (
          <PhysicsAtomWatermark className="w-56 h-56 text-white/10 absolute -right-6 -bottom-10" />
        ) : (
          <>
            <MoleculeWatermark className="w-52 h-52 text-white/10 absolute -right-6 -bottom-10" />
            <LabApparatusWatermark className="w-40 h-40 text-white/10 absolute right-48 -top-6 hidden md:block" />
          </>
        )}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs mb-1.5 border border-white/20">
              <span>
                Langkah 6: Siap &amp; Sah DSKP •{' '}
                {isDlp ? 'DLP (English)' : 'Bahasa Melayu'} •{' '}
                {isCompact ? 'Compact 1 Muka Surat' : 'Standard'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              {isDlp
                ? 'Daily Lesson Plan (RPH) Ready!'
                : 'Rancangan Pengajaran Harian (RPH) Siap!'}
            </h2>
            <p className={`text-xs ${isPink ? 'text-pink-100' : isAmber ? 'text-amber-100' : isTurquoise ? 'text-teal-100' : 'text-emerald-100'}`}>
              Salin terus ke sistem e-RPH, muat turun Word, cetak PDF, atau
              hantar terus ke Google Classroom &amp; Microsoft OneNote.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSaveToLibrary}
              className={`${
                isPink ? 'apple-btn-pink' : isAmber ? 'apple-btn-amber' : isTurquoise ? 'apple-btn-icy' : isIndigo ? 'apple-btn-indigo' : isCharcoal ? 'apple-btn-charcoal' : 'apple-btn-emerald'
              } inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold transition shadow-sm cursor-pointer`}
            >
              <Bookmark className="w-4 h-4" />
              <span>
                {saved
                  ? 'Tersimpan di Pustaka!'
                  : hasMultipleClasses
                  ? `Simpan Semua (${allClassVariants.length} Kelas)`
                  : 'Simpan RPH'}
              </span>
            </button>
            <button
              onClick={onNewRph}
              className="apple-btn-glass inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-800 text-xs font-bold transition cursor-pointer"
            >
              <span>+ Buat RPH Baharu</span>
            </button>
          </div>
        </div>

        {/* Format & Multi-Class Quick Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/15 text-xs">
          <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-md p-1 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => onUpdateRph && onUpdateRph({ isCompact: false })}
              className={`px-3 py-1 rounded-xl font-bold transition-all flex items-center gap-1 ${
                !isCompact
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Standard</span>
            </button>
            <button
              type="button"
              onClick={() => onUpdateRph && onUpdateRph({ isCompact: true })}
              className={`px-3 py-1 rounded-xl font-bold transition-all flex items-center gap-1 ${
                isCompact
                  ? 'bg-amber-300 text-slate-950 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Compact RPH (1 Muka Surat)</span>
            </button>
          </div>

          {hasMultipleClasses && (
            <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-md p-1 rounded-2xl border border-white/10 flex-wrap">
              <span className="px-2 text-[11px] text-emerald-200 font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>Kelas:</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedClassIndex(-1)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                  selectedClassIndex === -1
                    ? 'bg-white text-emerald-950'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Gabungan ({allClassVariants.length} Kelas)
              </button>
              {allClassVariants.map((variant, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedClassIndex(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    selectedClassIndex === idx
                      ? 'bg-white text-emerald-950'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {variant.info.kelas}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 pt-2 border-t border-white/20">
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="action-btn-pdf inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold disabled:opacity-75 transition shadow-sm cursor-pointer"
            title="Muat turun fail PDF rasmi A4 (serasi iPad, iPhone, Android &amp; PC)"
          >
            {isDownloadingPdf ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileDown className="w-4 h-4" />
            )}
            <span>{isDownloadingPdf ? 'Menjana PDF...' : 'Muat Turun PDF'}</span>
          </button>

          <button
            onClick={handleDownloadWord}
            disabled={isDownloadingWord}
            className="action-btn-word inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold disabled:opacity-75 transition shadow-sm cursor-pointer"
            title="Muat turun fail Word .doc (serasi iPad, iPhone, Android &amp; PC)"
          >
            {isDownloadingWord ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileDown className="w-4 h-4" />
            )}
            <span>
              {isDownloadingWord
                ? 'Menyedia Word...'
                : hasMultipleClasses && selectedClassIndex === -1
                ? `Word (${allClassVariants.length} Kelas)`
                : 'Muat Turun Word'}
            </span>
          </button>

          <button
            onClick={handleDownloadSpreadsheet}
            disabled={isDownloadingExcel}
            className="action-btn-excel inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold disabled:opacity-75 transition shadow-sm cursor-pointer"
            title="Muat turun fail Spreadsheet Excel .xls (serasi Excel, Apple Numbers, Google Sheets &amp; WPS Office)"
          >
            {isDownloadingExcel ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileSpreadsheet className="w-4 h-4" />
            )}
            <span>
              {isDownloadingExcel
                ? 'Menyedia Excel...'
                : hasMultipleClasses && selectedClassIndex === -1
                ? `Excel (${allClassVariants.length} Kelas)`
                : 'Muat Turun Excel'}
            </span>
          </button>

          <button
            onClick={handlePrint}
            className="action-btn-silver inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold transition shadow-sm cursor-pointer"
            title="Cetak terus melalui AirPrint / Pencetak atau cetak ke PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / AirPrint</span>
          </button>

          <button
            onClick={handleCopyText}
            className="action-btn-silver inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold transition shadow-sm cursor-pointer"
            title="Salin teks lengkap RPH untuk tampal ke e-RPH sekolah atau portal guru"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copied ? 'Tersalin!' : 'Salin Teks e-RPH'}</span>
          </button>

          <button
            onClick={handleOpenClassroomModal}
            className="action-btn-google inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold transition shadow-sm cursor-pointer"
            title="Kongsi dan hantar bahan PdPC terus ke Google Classroom"
          >
            <Send className="w-4 h-4 text-amber-200" />
            <span>Google Classroom</span>
          </button>

          <button
            onClick={() => setIsOneNoteModalOpen(true)}
            className="action-btn-onenote col-span-2 sm:col-span-1 lg:col-span-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold transition shadow-sm cursor-pointer"
            title="Eksport RPH terus ke Microsoft OneNote / Class Notebook"
          >
            <BookOpen className="w-4 h-4" />
            <span>Microsoft OneNote</span>
          </button>
        </div>

        {/* Download notice banner */}
        {downloadNotice && (
          <div className="mt-2.5 p-2.5 rounded-xl bg-white text-emerald-950 text-xs font-medium border border-emerald-300 shadow-sm flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{downloadNotice}</span>
            </div>
            <button
              onClick={() => setDownloadNotice(null)}
              className="text-slate-400 hover:text-slate-700 text-xs font-bold px-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* iPad & Mobile Tip Strip */}
        <div className="pt-2 text-[11px] text-emerald-100/90 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-bold text-white bg-white/20 px-1.5 py-0.5 rounded text-[10px]">📱 iPad, iPhone & Android</span>
          <span>Bagi peranti mudah alih, pilih <strong>&quot;Save to Files&quot; (Simpan ke Fail)</strong> pada menu perkongsian atau buka terus fail dalam Microsoft Word, Excel, mahupun Apple Numbers.</span>
        </div>
      </div>

      {/* ================================================================== */}
      {/* DOCUMENT SHEET: COMPACT 1-PAGE MODE vs STANDARD MODE */}
      {/* ================================================================== */}
      <div ref={rphSheetRef} id="rph-printable-sheet" className="bg-white rounded-2xl">
      {isCompact ? (
        /* COMPACT 1-PAGE A4 RPH SHEET */
        <div className="bg-white border border-slate-300 rounded-2xl p-5 sm:p-6 shadow-lg text-slate-900 text-[11px] leading-snug font-sans space-y-2.5 print:border-none print:shadow-none print:p-0 print:text-[10px]">
          <div className="text-center border-b-2 border-slate-900 pb-2">
            <h1 className="text-sm sm:text-base font-extrabold uppercase tracking-wide">
              {displayRph.info.namaSekolah || 'SEKOLAH MENENGAH KEBANGSAAN'}
            </h1>
            <p className="text-xs font-bold text-slate-700 uppercase">
              {isDlp
                ? `DAILY LESSON PLAN (RPH) - KSSM ${subjectUpperEn} (1-PAGE COMPACT)`
                : `RANCANGAN PENGAJARAN HARIAN (RPH) ${subjectUpperBm} KSSM (PADAT 1 MUKA SURAT)`}
            </p>
          </div>

          <table className="w-full border-collapse border border-slate-400 text-[11px]">
            <tbody>
              <tr>
                <td className="bg-slate-100 font-bold border border-slate-400 p-1.5 w-[16%]">
                  {isDlp ? 'Subject' : 'Mata Pelajaran'}
                </td>
                <td className={`border border-slate-400 p-1.5 w-[34%] font-bold ${isPink ? 'text-pink-900' : 'text-emerald-900'}`}>
                  {isDlp ? `${subjectUpperEn} KSSM (DLP)` : `${subjectUpperBm} KSSM`}
                </td>
                <td className="bg-slate-100 font-bold border border-slate-400 p-1.5 w-[16%]">
                  {isDlp ? 'Week / Date' : 'Minggu / Tarikh'}
                </td>
                <td className="border border-slate-400 p-1.5 w-[34%]">
                  {isDlp ? 'Week' : 'Minggu'} {displayRph.info.mingguAkademik} •{' '}
                  {displayRph.info.tarikh} ({displayRph.info.hari})
                </td>
              </tr>
              <tr>
                <td className="bg-slate-100 font-bold border border-slate-400 p-1.5">
                  {isDlp ? 'Class & Time' : 'Kelas & Masa'}
                </td>
                <td
                  colSpan={3}
                  className="border border-slate-400 p-1.5 font-semibold"
                >
                  <div>
                    1. <strong>{displayRph.info.tingkatan} - {displayRph.info.kelas}</strong>{' '}
                    ({displayRph.info.masaMula} - {displayRph.info.masaTamat}) •{' '}
                    {isDlp ? 'Attendance' : 'Kehadiran'}:{' '}
                    {displayRph.info.kehadiranMurid}
                  </div>
                  {selectedClassIndex === -1 &&
                    extraClasses.map((k, idx) => (
                      <div key={idx} className="text-slate-700">
                        {idx + 2}.{' '}
                        <strong>
                          {displayRph.info.tingkatan} - {k.kelas}
                        </strong>{' '}
                        ({k.masaMula} - {k.masaTamat}) •{' '}
                        {isDlp ? 'Attendance' : 'Kehadiran'}: {k.kehadiranMurid}
                      </div>
                    ))}
                </td>
              </tr>
              <tr>
                <td className="bg-slate-100 font-bold border border-slate-400 p-1.5">
                  {isDlp ? 'Topic & Theme' : 'Tajuk & Tema'}
                </td>
                <td className="border border-slate-400 p-1.5 font-bold text-emerald-900">
                  {displayRph.babTajuk}{' '}
                  <span className="font-normal text-slate-500">
                    ({displayRph.tema})
                  </span>
                </td>
                <td className="bg-slate-100 font-bold border border-slate-400 p-1.5">
                  {isDlp ? 'Content Std (SK)' : 'Standard Kandungan'}
                </td>
                <td className="border border-slate-400 p-1.5 font-semibold">
                  {displayRph.skKod} {displayRph.skTajuk}
                </td>
              </tr>
              <tr>
                <td className="bg-slate-100 font-bold border border-slate-400 p-1.5">
                  {isDlp ? 'Learning Std (SP)' : 'Standard Pembelajaran'}
                </td>
                <td colSpan={3} className="border border-slate-400 p-1.5">
                  {displayRph.spKod.map((kod, i) => (
                    <div key={kod}>
                      <strong>{kod}</strong>: {displayRph.spTajuk[i] || ''}
                    </div>
                  ))}
                </td>
              </tr>
              <tr>
                <td className="bg-slate-100 font-bold border border-slate-400 p-1.5">
                  {isDlp ? 'Objectives (SMART)' : 'Objektif (SMART)'}
                </td>
                <td className="border border-slate-400 p-1.5 align-top">
                  <ol className="list-decimal pl-5 space-y-1 marker:font-semibold">
                    {displayRph.objektif.map((o, idx) => (
                      <li key={idx} className="leading-relaxed">{cleanListItem(o)}</li>
                    ))}
                  </ol>
                </td>
                <td className="bg-slate-100 font-bold border border-slate-400 p-1.5">
                  {isDlp ? 'Success Criteria' : 'Kriteria Kejayaan'}
                </td>
                <td className="border border-slate-400 p-1.5 align-top">
                  <ul className="list-disc pl-5 space-y-1 marker:text-emerald-600">
                    {displayRph.kriteriaKejayaan.map((k, idx) => (
                      <li key={idx} className="leading-relaxed">{cleanListItem(k)}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="bg-slate-100 font-bold border border-slate-400 p-1.5">
                  {isDlp ? 'Activities (PdPC)' : 'Aktiviti PdPC'}
                </td>
                <td colSpan={3} className="border border-slate-400 p-1.5 space-y-1">
                  {displayRph.modelPdpc === '5E Pedagogi HIKMAH (MRSM)' ? (
                    <div className="space-y-0.5">
                      <div>
                        <strong>1. Engage:</strong> {displayRph.aktiviti5E.engage}
                      </div>
                      <div>
                        <strong>2. Explore:</strong> {displayRph.aktiviti5E.explore}
                      </div>
                      <div>
                        <strong>3. Explain:</strong> {displayRph.aktiviti5E.explain}
                      </div>
                      <div>
                        <strong>4. Elaborate:</strong>{' '}
                        {displayRph.aktiviti5E.elaborate}
                      </div>
                      <div>
                        <strong>5. Evaluate:</strong>{' '}
                        {displayRph.aktiviti5E.evaluate}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      <div>
                        <strong>
                          {isDlp ? 'Starter:' : 'Set Induksi:'}
                        </strong>{' '}
                        {displayRph.setInduksi}
                      </div>
                      <div>
                        <strong>
                          {isDlp ? 'Main Activities:' : 'Aktiviti Utama:'}
                        </strong>
                        <ol className="list-decimal pl-5 space-y-1 marker:font-semibold">
                          {displayRph.aktivitiUtama.map((act, idx) => (
                            <li key={idx} className="leading-relaxed">{cleanListItem(act)}</li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <strong>{isDlp ? 'Closure:' : 'Penutup:'}</strong>{' '}
                        {displayRph.penutup}
                      </div>
                    </div>
                  )}
                  {displayRph.soalanKbatContoh && (
                    <div className="pt-0.5 text-indigo-950">
                      <strong>KBAT / HOTS:</strong>{' '}
                      {displayRph.soalanKbatContoh}
                    </div>
                  )}
                </td>
              </tr>
              {showAnyElemenTable && (
                <tr>
                  <td className="bg-slate-100 font-bold border border-slate-400 p-1.5">
                    PAK-21, KPS &amp; BBM
                  </td>
                  <td className="border border-slate-400 p-1.5 space-y-0.5">
                    {showPak21 && (
                      <div>
                        <strong>PAK-21:</strong>{' '}
                        {displayRph.pak21Kaedah.join(', ')}
                      </div>
                    )}
                    {showKps && (
                      <div>
                        <strong>{isDlp ? 'SPS:' : 'KPS:'}</strong>{' '}
                        {displayRph.kemahiranSaintifik.join(', ')}
                      </div>
                    )}
                    {showBbm && (
                      <div>
                        <strong>BBM:</strong> {displayRph.bbm.join(', ')}
                      </div>
                    )}
                  </td>
                  <td className="bg-slate-100 font-bold border border-slate-400 p-1.5">
                    KBAT, EMK &amp; PBD
                  </td>
                  <td className="border border-slate-400 p-1.5 space-y-0.5">
                    {showKbat && (
                      <div>
                        <strong>KBAT:</strong> {displayRph.kbatAras.join(', ')}
                      </div>
                    )}
                    {showEmk && (
                      <div>
                        <strong>EMK:</strong> {displayRph.emk.join(', ')}
                      </div>
                    )}
                    {showNilai && (
                      <div>
                        <strong>{isDlp ? 'Values:' : 'Nilai:'}</strong>{' '}
                        {displayRph.nilaiMurni.join(', ')}
                      </div>
                    )}
                    {showPentaksiran && (
                      <div>
                        <strong>PBD:</strong>{' '}
                        {displayRph.pentaksiranPbd.join(', ')}
                      </div>
                    )}
                  </td>
                </tr>
              )}
              {showRefleksi && (
                <tr>
                  <td className="bg-slate-100 font-bold border border-slate-400 p-1.5">
                    {isDlp ? 'Reflection' : 'Refleksi & Impak'}
                  </td>
                  <td colSpan={3} className="border border-slate-400 p-1.5">
                    <strong>
                      [{displayRph.refleksi.statusPdpc}]{' '}
                      {displayRph.refleksi.bilCapai} /{' '}
                      {displayRph.info.bilanganMurid}
                    </strong>{' '}
                    {isDlp
                      ? `pupils achieved the learning objectives (${displayRph.refleksi.bilTidakCapai || 0} require guidance).`
                      : `murid mencapai objektif (${displayRph.refleksi.bilTidakCapai || 0} orang memerlukan bimbingan).`}{' '}
                    {displayRph.refleksi.tindakanSusulan}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pt-3 grid grid-cols-2 gap-6 text-[10px] text-slate-700">
            <div>
              <p className="border-b border-slate-400 pb-4"></p>
              <p className="font-bold pt-0.5">
                {isDlp ? 'Subject Teacher' : 'Tandatangan Guru'}:{' '}
                {displayRph.info.namaGuru}
              </p>
            </div>
            <div>
              <p className="border-b border-slate-400 pb-4"></p>
              <p className="font-bold pt-0.5">
                {isDlp ? 'Verified By' : 'Disemak Oleh (Pengetua / GPK / GKMP)'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* STANDARD FULL KPM DOCUMENT SHEET */
        <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-10 shadow-lg text-slate-900 text-xs sm:text-sm font-sans space-y-5 print:border-none print:shadow-none print:p-0">
          {/* Document Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
            <h1 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide">
              {displayRph.info.namaSekolah || 'SEKOLAH MENENGAH KEBANGSAAN'}
            </h1>
            <h2 className="text-sm sm:text-base font-bold text-slate-700 uppercase tracking-tight">
              {isDlp
                ? `Daily Lesson Plan (RPH) KSSM - ${subjectTitleEn} (DLP)`
                : `Rancangan Pengajaran Harian (RPH) KSSM - ${subjectTitleBm}`}
            </h2>
            <p className="text-[11px] text-slate-500">
              Kurikulum Standard Sekolah Menengah (KSSM) • Format Rasmi
              Kementerian Pendidikan Malaysia
            </p>
          </div>

          {/* Table 1: Maklumat Asas */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 text-xs">
              <tbody>
                <tr>
                  <td className="bg-slate-100 font-bold border border-slate-300 p-2 w-1/4">
                    {isDlp ? 'Subject' : 'Mata Pelajaran'}
                  </td>
                  <td className={`border border-slate-300 p-2 w-1/4 font-semibold ${isPink ? 'text-pink-900' : isAmber ? 'text-amber-900' : 'text-emerald-900'}`}>
                    {isDlp ? `${subjectUpperEn} KSSM (DLP)` : `${subjectUpperBm} KSSM`}
                  </td>
                  <td className="bg-slate-100 font-bold border border-slate-300 p-2 w-1/4">
                    {isDlp ? 'Week / Day' : 'Minggu / Hari'}
                  </td>
                  <td className="border border-slate-300 p-2 w-1/4">
                    {isDlp ? 'Week' : 'Minggu'} {displayRph.info.mingguAkademik}{' '}
                    ({displayRph.info.hari})
                  </td>
                </tr>
                <tr>
                  <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                    {isDlp ? 'Form & Class(es)' : 'Tingkatan & Kelas'}
                  </td>
                  <td className="border border-slate-300 p-2 font-semibold">
                    <div>
                      {displayRph.info.tingkatan} - {displayRph.info.kelas}
                    </div>
                    {selectedClassIndex === -1 &&
                      extraClasses.map((k, idx) => (
                        <div key={idx} className="text-emerald-800 text-[11px]">
                          + {displayRph.info.tingkatan} - {k.kelas} ({k.masaMula}{' '}
                          - {k.masaTamat})
                        </div>
                      ))}
                  </td>
                  <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                    {isDlp ? 'Date & Time' : 'Tarikh & Masa'}
                  </td>
                  <td className="border border-slate-300 p-2">
                    {displayRph.info.tarikh} | {displayRph.info.masaMula} -{' '}
                    {displayRph.info.masaTamat} ({displayRph.info.tempohMinit}{' '}
                    Minit)
                  </td>
                </tr>
                <tr>
                  <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                    {isDlp ? 'Teacher Name' : 'Nama Guru'}
                  </td>
                  <td className="border border-slate-300 p-2">
                    {displayRph.info.namaGuru}
                  </td>
                  <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                    {isDlp ? 'Attendance' : 'Kehadiran Murid'}
                  </td>
                  <td className="border border-slate-300 p-2">
                    {displayRph.info.kehadiranMurid} (
                    {displayRph.info.bilanganMurid} orang)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 2: Fokus Kurikulum DSKP */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 text-xs">
              <thead>
                <tr className="bg-slate-800 text-white font-bold text-left">
                  <th colSpan={2} className="p-2 uppercase tracking-wide">
                    {isDlp
                      ? 'Curriculum Focus & Learning Standards (DSKP)'
                      : 'Fokus Kurikulum & Standard Pembelajaran (DSKP)'}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-slate-100 font-bold border border-slate-300 p-2 w-1/4">
                    {isDlp ? 'Theme & Chapter' : 'Tema & Bab'}
                  </td>
                  <td className="border border-slate-300 p-2">
                    <span className="font-bold text-emerald-800">
                      {displayRph.babTajuk}
                    </span>
                    <span className="text-slate-500 ml-2">
                      ({isDlp ? 'Theme' : 'Tema'}: {displayRph.tema})
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                    {isDlp
                      ? 'Content Standard (SK)'
                      : 'Standard Kandungan (SK)'}
                  </td>
                  <td className="border border-slate-300 p-2 font-semibold">
                    {displayRph.skKod} {displayRph.skTajuk}
                  </td>
                </tr>
                <tr>
                  <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                    {isDlp
                      ? 'Learning Standard (SP)'
                      : 'Standard Pembelajaran (SP)'}
                  </td>
                  <td className="border border-slate-300 p-2">
                    <ul className="list-disc pl-4 space-y-1">
                      {displayRph.spKod.map((kod, i) => (
                        <li key={kod}>
                          <strong>{kod}</strong>: {displayRph.spTajuk[i] || ''}
                        </li>
                      ))}
                    </ul>
                    {displayRph.isEksperimen && (
                      <div className="mt-2 p-1.5 rounded-md bg-red-50 text-red-700 font-bold flex items-center gap-1.5">
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>
                          {isDlp ? 'COMPULSORY EXPERIMENT' : 'AMALI WAJIB SPM'}:{' '}
                          {displayRph.namaEksperimen}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                    {isDlp ? 'Learning Objectives' : 'Objektif Pembelajaran'}
                  </td>
                  <td className="border border-slate-300 p-2 space-y-1">
                    <p className="font-semibold text-slate-700">
                      {isDlp
                        ? 'By the end of the lesson, pupils will be able to:'
                        : 'Pada akhir sesi pengajaran dan pembelajaran, murid dapat:'}
                    </p>
                    <ol className="list-decimal pl-5 space-y-1.5 marker:font-semibold">
                      {displayRph.objektif.map((o, idx) => (
                        <li key={idx} className="leading-relaxed">{cleanListItem(o)}</li>
                      ))}
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                    {isDlp ? 'Success Criteria' : 'Kriteria Kejayaan'}
                  </td>
                  <td className="border border-slate-300 p-2 space-y-1">
                    <p className="font-semibold text-slate-700">
                      {isDlp
                        ? 'Pupils are successful if they can:'
                        : 'Murid berjaya sekiranya dapat:'}
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-emerald-600">
                      {displayRph.kriteriaKejayaan.map((k, idx) => (
                        <li key={idx} className="leading-relaxed">{cleanListItem(k)}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 3: Aktiviti PdPC */}
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse border border-slate-300 text-xs">
              <colgroup>
                <col className="w-[26%]" />
                <col className="w-[74%]" />
              </colgroup>
              <thead>
                <tr className="bg-slate-800 text-white font-bold text-left">
                  <th colSpan={2} className="p-2.5 uppercase tracking-wide">
                    <div className="flex items-center justify-between gap-2 w-full">
                      <span>
                        {displayRph.modelPdpc === '5E Pedagogi HIKMAH (MRSM)'
                          ? isDlp
                            ? '5E HIKMAH Pedagogy Activity Framework (MRSM)'
                            : 'Kerangka Aktiviti 5E Pedagogi HIKMAH (MRSM)'
                          : isDlp
                          ? 'Teaching & Learning Activities Framework (PdPC)'
                          : 'Kerangka Aktiviti Pengajaran & Pembelajaran (PdPC)'}
                      </span>
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded bg-white/15 border border-white/20 shrink-0">
                        {displayRph.modelPdpc}
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayRph.modelPdpc === '5E Pedagogi HIKMAH (MRSM)' ? (
                  <>
                    <tr>
                      <td className="bg-slate-100 border border-slate-300 p-2.5 align-top">
                        <div className="font-bold text-slate-900">
                          1. Engage ({isDlp ? 'Engagement' : 'Penglibatan'})
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {isDlp
                            ? 'Elicit Prior Ideas & Starter • 5–10 min'
                            : 'Cungkil Idea & Inkuiri Awal • 5–10 minit'}
                        </div>
                      </td>
                      <td className="border border-slate-300 p-2.5 align-top whitespace-pre-line leading-relaxed text-slate-800">
                        {displayRph.aktiviti5E.engage}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-slate-100 border border-slate-300 p-2.5 align-top">
                        <div className="font-bold text-slate-900">
                          2. Explore ({isDlp ? 'Exploration' : 'Penerokaan'})
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {isDlp
                            ? 'Hands-on Inquiry / Lab • 20–30 min'
                            : 'Penyiasatan Hands-on / Amali • 20–30 minit'}
                        </div>
                      </td>
                      <td className="border border-slate-300 p-2.5 align-top whitespace-pre-line leading-relaxed text-slate-800">
                        {displayRph.aktiviti5E.explore}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-slate-100 border border-slate-300 p-2.5 align-top">
                        <div className="font-bold text-slate-900">
                          3. Explain ({isDlp ? 'Explanation' : 'Penerangan'})
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {isDlp
                            ? 'Conceptualisation & Equations • 15–20 min'
                            : 'Pembentangan & Konseptualisasi • 15–20 minit'}
                        </div>
                      </td>
                      <td className="border border-slate-300 p-2.5 align-top whitespace-pre-line leading-relaxed text-slate-800">
                        {displayRph.aktiviti5E.explain}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-slate-100 border border-slate-300 p-2.5 align-top">
                        <div className="font-bold text-slate-900">
                          4. Elaborate ({isDlp ? 'Elaboration' : 'Pengembangan'})
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {isDlp
                            ? 'HOTS / Real-World Application • 10–15 min'
                            : 'Aplikasi KBAT & Situasi Baharu • 10–15 minit'}
                        </div>
                      </td>
                      <td className="border border-slate-300 p-2.5 align-top whitespace-pre-line leading-relaxed text-slate-800">
                        {displayRph.aktiviti5E.elaborate}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-slate-100 border border-slate-300 p-2.5 align-top">
                        <div className="font-bold text-slate-900">
                          5. Evaluate ({isDlp ? 'Evaluation' : 'Penilaian'})
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {isDlp
                            ? 'Formative Assessment & Closure • 5–10 min'
                            : 'Pentaksiran Formatif & Rumusan • 5–10 minit'}
                        </div>
                      </td>
                      <td className="border border-slate-300 p-2.5 align-top whitespace-pre-line leading-relaxed text-slate-800">
                        {displayRph.aktiviti5E.evaluate}
                      </td>
                    </tr>
                    {(displayRph.atributHikmah.length > 0 ||
                      displayRph.nilaiSikapMrsm.length > 0) && (
                      <tr>
                        <td className="bg-amber-50/80 font-bold border border-slate-300 p-2.5 align-top text-amber-950">
                          {isDlp
                            ? 'HIKMAH Attributes & MRSM SIKAP Values'
                            : 'Atribut HIKMAH & Nilai Teras SIKAP (MRSM)'}
                        </td>
                        <td className="border border-slate-300 p-2.5 bg-amber-50/30 space-y-1 text-slate-800">
                          {displayRph.atributHikmah.length > 0 && (
                            <div>
                              <strong className="text-amber-950">
                                Atribut HIKMAH:
                              </strong>{' '}
                              {displayRph.atributHikmah
                                .map((a) => a.split(' (')[0])
                                .join(' • ')}
                            </div>
                          )}
                          {displayRph.nilaiSikapMrsm.length > 0 && (
                            <div>
                              <strong className="text-amber-950">
                                Nilai Teras SIKAP:
                              </strong>{' '}
                              {displayRph.nilaiSikapMrsm
                                .map((s) => s.split(' (')[0])
                                .join(' • ')}
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="bg-slate-100 font-bold border border-slate-300 p-2 w-1/4">
                        {isDlp
                          ? 'Starter / Set Induction (5 - 10 min)'
                          : 'Set Induksi (5 - 10 min)'}
                      </td>
                      <td className="border border-slate-300 p-2">
                        {displayRph.setInduksi}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                        {isDlp
                          ? 'Main Activities (PAK-21)'
                          : 'Aktiviti Utama (PAK-21)'}
                      </td>
                      <td className="border border-slate-300 p-2">
                        <ol className="list-decimal pl-5 space-y-1.5 marker:font-semibold">
                          {displayRph.aktivitiUtama.map((act, idx) => (
                            <li key={idx} className="leading-relaxed">{cleanListItem(act)}</li>
                          ))}
                        </ol>
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                        {isDlp
                          ? 'Closure (5 - 10 min)'
                          : 'Penutup (5 - 10 min)'}
                      </td>
                      <td className="border border-slate-300 p-2">
                        {displayRph.penutup}
                      </td>
                    </tr>
                  </>
                )}
                {displayRph.soalanKbatContoh && (
                  <tr>
                    <td className="bg-indigo-50 font-bold border border-slate-300 p-2 text-indigo-950">
                      {isDlp ? 'HOTS / KBAT Question' : 'Soalan KBAT & Jawapan'}
                    </td>
                    <td className="border border-slate-300 p-2 bg-indigo-50/30 text-indigo-950">
                      {displayRph.soalanKbatContoh}
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                    {isDlp ? 'Differentiation' : 'Strategi Pembezaan'}
                  </td>
                  <td className="border border-slate-300 p-2">
                    {displayRph.diferensiasi}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 4: Elemen Merentas Kurikulum & BBM */}
          {showAnyElemenTable && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-800 text-white font-bold text-left">
                    <th colSpan={2} className="p-2 uppercase tracking-wide">
                      {isDlp
                        ? 'Pedagogical Elements, Teaching Aids, Skills & Assessment'
                        : 'Elemen Pedagogi, BBM, Kemahiran & Pentaksiran'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {showPak21 && (
                    <tr>
                      <td className="bg-slate-100 font-bold border border-slate-300 p-2 w-1/4">
                        Pedagogi PAK-21
                      </td>
                      <td className="border border-slate-300 p-2">
                        {displayRph.pak21Kaedah.join(', ')}
                      </td>
                    </tr>
                  )}
                  {showKbat && (
                    <tr>
                      <td className="bg-slate-100 font-bold border border-slate-300 p-2 w-1/4">
                        {isDlp
                          ? 'Thinking Skills (HOTS)'
                          : 'Kemahiran Berfikir (KBAT)'}
                      </td>
                      <td className="border border-slate-300 p-2">
                        {displayRph.kbatAras.join(', ')}
                      </td>
                    </tr>
                  )}
                  {showKps && (
                    <tr>
                      <td className="bg-slate-100 font-bold border border-slate-300 p-2 w-1/4">
                        {isDlp
                          ? 'Scientific Skills (SPS/MS)'
                          : 'Kemahiran Saintifik (KPS/KMS)'}
                      </td>
                      <td className="border border-slate-300 p-2">
                        {[
                          ...displayRph.kemahiranSaintifik,
                          ...displayRph.kemahiranManipulatif,
                        ].join(', ')}
                      </td>
                    </tr>
                  )}
                  {showBbm && (
                    <tr>
                      <td className="bg-slate-100 font-bold border border-slate-300 p-2 w-1/4">
                        {isDlp
                          ? 'Teaching Aids (BBM)'
                          : 'Bahan Bantu Mengajar (BBM)'}
                      </td>
                      <td className="border border-slate-300 p-2">
                        {displayRph.bbm.join(', ')}
                      </td>
                    </tr>
                  )}
                  {(showEmk || showNilai) && (
                    <tr>
                      <td className="bg-slate-100 font-bold border border-slate-300 p-2 w-1/4">
                        {isDlp ? 'EMK & Moral Values' : 'EMK & Nilai Murni'}
                      </td>
                      <td className="border border-slate-300 p-2 space-y-1">
                        {showEmk && (
                          <div>
                            <strong>EMK:</strong> {displayRph.emk.join(', ')}
                          </div>
                        )}
                        {showNilai && (
                          <div>
                            <strong>{isDlp ? 'Values:' : 'Nilai:'}</strong>{' '}
                            {displayRph.nilaiMurni.join(', ')}
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                  {showPentaksiran && (
                    <tr>
                      <td className="bg-slate-100 font-bold border border-slate-300 p-2 w-1/4">
                        {isDlp
                          ? 'Classroom Assessment (PBD)'
                          : 'Pentaksiran Bilik Darjah (PBD)'}
                      </td>
                      <td className="border border-slate-300 p-2">
                        {displayRph.pentaksiranPbd.join(', ')}
                        {displayRph.tahapPenguasaan.length > 0 &&
                          ` (${displayRph.tahapPenguasaan
                            .map((t) => t.split(' - ')[0])
                            .join(', ')})`}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Table 5: Refleksi */}
          {showRefleksi && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-800 text-white font-bold text-left">
                    <th colSpan={2} className="p-2 uppercase tracking-wide">
                      {isDlp
                        ? 'Teaching Reflection & Follow-up Action'
                        : 'Refleksi Pengajaran & Tindakan Susulan'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-slate-100 font-bold border border-slate-300 p-2 w-1/4">
                      {isDlp ? 'Objective Achievement' : 'Pencapaian Objektif'}
                    </td>
                    <td className="border border-slate-300 p-2">
                      <strong>
                        {displayRph.refleksi.bilCapai} /{' '}
                        {displayRph.info.bilanganMurid}
                      </strong>{' '}
                      {isDlp
                        ? `pupils achieved the learning objectives today (${displayRph.refleksi.bilTidakCapai || 0} require guidance).`
                        : `murid berjaya mencapai objektif pembelajaran hari ini (${displayRph.refleksi.bilTidakCapai || 0} orang murid memerlukan bimbingan).`}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                      {isDlp ? 'Follow-up Action' : 'Tindakan Susulan'}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {displayRph.refleksi.tindakanSusulan}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-slate-100 font-bold border border-slate-300 p-2">
                      {isDlp
                        ? 'Status & Teacher Notes'
                        : 'Status & Catatan Guru'}
                    </td>
                    <td className="border border-slate-300 p-2">
                      <span className="px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 font-bold mr-2">
                        [{displayRph.refleksi.statusPdpc}]
                      </span>
                      {displayRph.refleksi.catatanTambahan}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Footer verification block */}
          <div className="pt-6 grid grid-cols-2 gap-8 text-xs text-slate-700">
            <div>
              <p className="border-b border-slate-400 pb-8"></p>
              <p className="font-bold pt-1">
                {isDlp
                  ? 'Subject Teacher Signature'
                  : 'Tandatangan Guru Mata Pelajaran'}
              </p>
              <p className="text-[11px] text-slate-500">
                Nama: {displayRph.info.namaGuru}
              </p>
              <p className="text-[11px] text-slate-500">
                Tarikh: {displayRph.info.tarikh}
              </p>
            </div>
            <div>
              <p className="border-b border-slate-400 pb-8"></p>
              <p className="font-bold pt-1">
                {isDlp
                  ? 'Verified By (Principal / Senior Assistant / Head of Science)'
                  : 'Disemak oleh (Pengetua / GPK / KB Sains)'}
              </p>
              <p className="text-[11px] text-slate-500">Cop Pengesahan:</p>
              <p className="text-[11px] text-slate-500">Tarikh:</p>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Navigation bottom */}
      <div className="print:hidden flex items-center justify-between pt-2">
        <button
          onClick={() => onEditStep(5)}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Elemen</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEditStep(2)}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Tukar Topik DSKP</span>
          </button>
        </div>
      </div>

      {/* ================================================================== */}
      {/* MODAL 1: HANTAR KE GOOGLE CLASSROOM */}
      {/* ================================================================== */}
      {isClassroomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in print:hidden">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Hantar RPH ke Google Classroom
                  </h3>
                  <p className="text-xs text-slate-500">
                    Masukkan RPH terus sebagai Bahan Kelas (Material) atau
                    Pengumuman.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsClassroomModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {classroomError && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>{classroomError}</span>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    const newToken = await connectGoogleClassroomToken();
                    if (newToken) {
                      fetchClassroomCourses(newToken);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition"
                >
                  Sambung Akaun Google Classroom
                </button>
              </div>
            )}

            {classroomSuccessUrl ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>RPH Berjaya Dihantar ke Google Classroom!</span>
                </div>
                <p>
                  Rekod RPH bagi <strong>{displayRph.babTajuk}</strong> telah
                  dimuat naik ke kelas anda.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={classroomSuccessUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
                  >
                    <span>Buka Google Classroom</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsClassroomModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    1. Pilih Kelas Google Classroom Anda
                  </label>
                  {isClassroomLoading ? (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500">
                      Memuatkan senarai kelas Google Classroom...
                    </div>
                  ) : courses.length === 0 ? (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-between">
                      <span>Tiada kelas aktif ditemui pada akaun ini.</span>
                      <button
                        type="button"
                        onClick={async () => {
                          const newToken = await connectGoogleClassroomToken();
                          if (newToken) fetchClassroomCourses(newToken);
                        }}
                        className="text-emerald-700 font-bold underline"
                      >
                        Muat Semula
                      </button>
                    </div>
                  ) : (
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900 bg-slate-50"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} {c.section ? `(${c.section})` : ''}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    2. Pilih Jenis Hantaran
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPostType('material')}
                      className={`p-2.5 rounded-xl border font-bold text-left transition ${
                        postType === 'material'
                          ? 'bg-amber-50 border-amber-500 text-amber-950'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      Bahan Kelas (CourseWork Material)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPostType('announcement')}
                      className={`p-2.5 rounded-xl border font-bold text-left transition ${
                        postType === 'announcement'
                          ? 'bg-amber-50 border-amber-500 text-amber-950'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      Pengumuman (Stream Announcement)
                    </button>
                  </div>
                </div>

                {/* Explicit Confirmation Step before mutating Classroom data */}
                {classroomConfirmStep ? (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-2.5">
                    <p className="font-bold text-amber-950">
                      Sahkan Penghantaran ke Google Classroom:
                    </p>
                    <p className="text-amber-900">
                      Anda akan menerbitkan{' '}
                      <strong>
                        RPH {displayRph.info.tingkatan} (
                        {displayRph.info.kelas}) - {displayRph.babTajuk}
                      </strong>{' '}
                      ke kelas yang dipilih. Teruskan?
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setClassroomConfirmStep(false)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold"
                      >
                        Kembali
                      </button>
                      <button
                        type="button"
                        disabled={isClassroomLoading}
                        onClick={handlePublishToClassroom}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                      >
                        {isClassroomLoading
                          ? 'Menghantar...'
                          : 'Ya, Sahkan & Hantar Sekarang'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsClassroomModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      disabled={!selectedCourseId || isClassroomLoading}
                      onClick={() => setClassroomConfirmStep(true)}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-extrabold transition"
                    >
                      Teruskan Penghantaran
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* MODAL 2: HANTAR KE MICROSOFT ONENOTE */}
      {/* ================================================================== */}
      {isOneNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in print:hidden">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Masukkan RPH ke Microsoft OneNote
                  </h3>
                  <p className="text-xs text-slate-500">
                    Eksport jadual penuh RPH terus ke Buku Rekod Mengajar
                    OneNote anda.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOneNoteModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                <p className="font-bold text-purple-950">
                  Langkah Pantas Masuk ke Microsoft OneNote:
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-purple-900">
                  <li>
                    Klik butang{' '}
                    <strong>"1. Salin Jadual Berformat OneNote"</strong> di
                    bawah (jadual penuh RPH disalin ke clipboard).
                  </li>
                  <li>
                    Klik <strong>"2. Buka Buku Nota OneNote"</strong> dan tekan{' '}
                    <kbd className="px-1.5 py-0.5 bg-white rounded border">
                      Ctrl + V
                    </kbd>{' '}
                    terus di dalam halaman OneNote anda, atau muat turun fail
                    Word untuk dilampirkan.
                  </li>
                </ol>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleCopyRichHtmlForOneNote}
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold flex items-center justify-center gap-2 transition shadow-sm"
                >
                  {oneNoteCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>
                        Jadual RPH Berformat Disalin! Sedia Tampal (Ctrl+V) di
                        OneNote
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>1. Salin Jadual RPH Berformat OneNote</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://www.onenote.com/notebooks"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <span>2. Buka OneNote Online</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleDownloadWord}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Muat Turun Fail .doc</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsOneNoteModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
