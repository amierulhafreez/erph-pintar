import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  X,
  Zap,
  CalendarRange,
  FileText,
  BookOpen,
  Printer,
  Layers,
  CheckCircle2,
  ArrowRight,
  Upload,
  Users,
  Globe,
  Minimize2,
  ShieldCheck,
  Sparkles,
  FlaskConical,
  Atom,
  FileDown,
  Dna,
  Calculator,
  Binary,
  Compass,
  CheckSquare,
  Lightbulb,
} from 'lucide-react';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  portalSubject?: string;
  onSelectStep: (step: number) => void;
  onOpenQuickGen: () => void;
  onOpenWeeklyGen: () => void;
}

type GuideSubjectKey = 'kimia' | 'biologi' | 'fizik' | 'sains' | 'matematik' | 'matematik-tambahan';

export const UserGuideModal: React.FC<UserGuideModalProps> = ({
  isOpen,
  onClose,
  portalSubject = 'kimia',
  onSelectStep,
  onOpenQuickGen,
  onOpenWeeklyGen,
}) => {
  const [activeTab, setActiveTab] = useState<
    'panduan_subjek' | 'langkah' | 'pintar' | 'eksport' | 'faq'
  >('panduan_subjek');

  const [selectedSubj, setSelectedSubj] = useState<GuideSubjectKey>('kimia');

  useEffect(() => {
    if (portalSubject && ['kimia', 'biologi', 'fizik', 'sains', 'matematik', 'matematik-tambahan'].includes(portalSubject)) {
      setSelectedSubj(portalSubject as GuideSubjectKey);
    }
  }, [portalSubject, isOpen]);

  if (!isOpen) return null;

  const handleGoToStep = (step: number) => {
    onSelectStep(step);
    onClose();
  };

  const subjectMeta: Record<GuideSubjectKey, {
    title: string;
    sub: string;
    tingkatan: string;
    themeGradient: string;
    accentText: string;
    badgeClass: string;
    pillClass: string;
    btnClass: string;
    icon: React.ReactNode;
  }> = {
    kimia: {
      title: 'Kimia KSSM',
      sub: 'Penyedia e-RPH Kimia SPM (Tingkatan 4 & 5)',
      tingkatan: 'Tingkatan 4 & 5',
      themeGradient: 'from-emerald-900 via-teal-800 to-slate-900',
      accentText: 'text-emerald-700',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      pillClass: 'bg-emerald-600 text-white border-emerald-600',
      btnClass: 'apple-btn-emerald',
      icon: <FlaskConical className="w-4 h-4 text-emerald-400" />,
    },
    biologi: {
      title: 'Biologi KSSM',
      sub: 'Penyedia e-RPH Biologi SPM (Tingkatan 4 & 5)',
      tingkatan: 'Tingkatan 4 & 5',
      themeGradient: 'from-[#83334d] via-[#9c3d5d] to-slate-900',
      accentText: 'text-[#ab4f6c]',
      badgeClass: 'bg-pink-50 text-pink-800 border-pink-200',
      pillClass: 'bg-[#ab4f6c] text-white border-[#ab4f6c]',
      btnClass: 'apple-btn-pink',
      icon: <Dna className="w-4 h-4 text-pink-300" />,
    },
    fizik: {
      title: 'Fizik KSSM',
      sub: 'Penyedia e-RPH Fizik SPM (Tingkatan 4 & 5)',
      tingkatan: 'Tingkatan 4 & 5',
      themeGradient: 'from-[#994f11] via-[#ab5e19] to-slate-900',
      accentText: 'text-[#ab5e19]',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      pillClass: 'bg-[#ab5e19] text-white border-[#ab5e19]',
      btnClass: 'apple-btn-amber',
      icon: <Atom className="w-4 h-4 text-amber-300" />,
    },
    sains: {
      title: 'Sains KSSM',
      sub: 'Penyedia e-RPH Sains Lengkap (Tingkatan 2 – 5)',
      tingkatan: 'Tingkatan 2 – 5',
      themeGradient: 'from-sky-900 via-cyan-800 to-slate-900',
      accentText: 'text-sky-700',
      badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
      pillClass: 'bg-sky-600 text-white border-sky-600',
      btnClass: 'apple-btn-icy',
      icon: <Atom className="w-4 h-4 text-sky-300" />,
    },
    matematik: {
      title: 'Matematik KSSM',
      sub: 'Penyedia e-RPH Matematik Menengah (Tingkatan 2 – 5)',
      tingkatan: 'Tingkatan 2 – 5',
      themeGradient: 'from-[#312e81] via-[#3730a3] to-slate-900',
      accentText: 'text-indigo-700',
      badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      pillClass: 'bg-indigo-700 text-white border-indigo-700',
      btnClass: 'apple-btn-indigo',
      icon: <Calculator className="w-4 h-4 text-indigo-300" />,
    },
    'matematik-tambahan': {
      title: 'Matematik Tambahan KSSM',
      sub: 'Penyedia e-RPH Add Math SPM (Tingkatan 4 & 5)',
      tingkatan: 'Tingkatan 4 & 5',
      themeGradient: 'from-slate-950 via-slate-900 to-slate-800',
      accentText: 'text-slate-800',
      badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
      pillClass: 'bg-slate-800 text-white border-slate-800',
      btnClass: 'apple-btn-charcoal',
      icon: <Binary className="w-4 h-4 text-slate-300" />,
    },
  };

  const activeSubjData = subjectMeta[selectedSubj];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header with Dynamic Theme */}
        <div className={`p-4 sm:p-5 border-b border-white/20 flex items-center justify-between gap-3 bg-gradient-to-r ${activeSubjData.themeGradient} text-white`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0 shadow-inner">
              <HelpCircle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <h3 className="font-black text-base sm:text-lg tracking-tight">
                  Bantuan &amp; Panduan Penggunaan e-RPH Pintar
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold border border-white/30 flex items-center gap-1.5 shadow-2xs">
                  {activeSubjData.icon}
                  <span>{activeSubjData.title} ({activeSubjData.tingkatan})</span>
                </span>
              </div>
              <p className="text-xs text-white/85 mt-0.5">
                Panduan pedagogi DSKP rasmi, kaedah amali, DLP dwibahasa, jadual waktu, dan format cetak kemas 1-muka surat.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition shrink-0 cursor-pointer"
            title="Tutup Panduan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-4 bg-slate-50 text-xs font-bold overflow-x-auto scrollbar-thin">
          <button
            type="button"
            onClick={() => setActiveTab('panduan_subjek')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'panduan_subjek'
                ? 'border-indigo-600 text-indigo-900 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>1. Panduan Khusus Subjek</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('langkah')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'langkah'
                ? 'border-indigo-600 text-indigo-900 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>2. Aliran 6 Langkah Pantas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pintar')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'pintar'
                ? 'border-indigo-600 text-indigo-900 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>3. Jadual &amp; RPH Seminggu</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('eksport')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'eksport'
                ? 'border-indigo-600 text-indigo-900 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Printer className="w-4 h-4 text-amber-600" />
            <span>4. Format Cetak &amp; Word</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'faq'
                ? 'border-indigo-600 text-indigo-900 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-rose-600" />
            <span>5. Soalan Lazim (FAQ)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50 text-xs sm:text-sm text-slate-700">
          {/* ============================================================== */}
          {/* TAB 1: PANDUAN KHUSUS SETIAP SUBJEK                            */}
          {/* ============================================================== */}
          {activeTab === 'panduan_subjek' && (
            <div className="space-y-4">
              {/* Subject Selector Pills */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Pilih Subjek Untuk Panduan Khusus:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {(
                    [
                      { key: 'kimia', label: 'Kimia', icon: <FlaskConical className="w-3.5 h-3.5" /> },
                      { key: 'biologi', label: 'Biologi', icon: <Dna className="w-3.5 h-3.5" /> },
                      { key: 'fizik', label: 'Fizik', icon: <Atom className="w-3.5 h-3.5" /> },
                      { key: 'sains', label: 'Sains', icon: <Atom className="w-3.5 h-3.5" /> },
                      { key: 'matematik', label: 'Matematik', icon: <Calculator className="w-3.5 h-3.5" /> },
                      { key: 'matematik-tambahan', label: 'Math Tambahan', icon: <Binary className="w-3.5 h-3.5" /> },
                    ] as const
                  ).map((s) => {
                    const isSelected = selectedSubj === s.key;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setSelectedSubj(s.key)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${
                          isSelected
                            ? `${subjectMeta[s.key].pillClass} shadow-xs scale-[1.02]`
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {s.icon}
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subjek Detail Banner */}
              <div className={`p-4 rounded-2xl border ${activeSubjData.badgeClass} flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-slate-900">{activeSubjData.title}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                      {activeSubjData.tingkatan}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeSubjData.sub}. Disusun mengikut sukatan terkini Kementerian Pendidikan Malaysia (KPM).
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenQuickGen();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <Zap className="w-3 h-3 fill-current" />
                    <span>Mod Pantas 30s</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenWeeklyGen();
                    }}
                    className={`px-3 py-1.5 rounded-xl ${activeSubjData.pillClass} text-xs font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer`}
                  >
                    <CalendarRange className="w-3 h-3" />
                    <span>RPH Seminggu</span>
                  </button>
                </div>
              </div>

              {/* Specific Content Based on selectedSubj */}
              {selectedSubj === 'kimia' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                        <FlaskConical className="w-4 h-4 text-emerald-600" />
                        <span>Fokus Kurikulum Kimia KSSM (T4 &amp; T5)</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed marker:text-emerald-600">
                        <li><strong>Tingkatan 4:</strong> Kepentingan Kimia, Jirim &amp; Struktur Atom, Konsep Mol, Formula &amp; Persamaan Kimia, Jadual Berkala Unsur, Ikatan Kimia, Asid, Bes &amp; Garam, Kadar Tindak Balas.</li>
                        <li><strong>Tingkatan 5:</strong> Kimia Karbon, Termokimia, Kimia Konsumer &amp; Industri, Redoks, Polimer.</li>
                        <li><strong>Dwibahasa:</strong> Sokongan penuh BM dan DLP English (contoh: <em>Stoichiometry, Acid-Base Titration, Oxidation State</em>).</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>Panduan Amali &amp; Eksperimen Kimia</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed marker:text-emerald-600">
                        <li>Pilih Standard Pembelajaran amali (contoh: eksperimen penyediaan garam terlarutkan atau siri elektrokimia).</li>
                        <li>Sistem menjana langkah keselamatan makmal dan pemboleh ubah secara automatik pada Langkah 4 &amp; 5.</li>
                        <li>Integrasi simulasi digital PhET Chemistry dan bahan amali Cikgu Hafreez tersedia sebagai pilihan BBM.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                    <span className="font-extrabold text-slate-900 text-xs">Tip Khas Penyediaan RPH Kimia:</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Gunakan format <strong>5E Pedagogi HIKMAH (MRSM)</strong> bagi sesi eksperimen inkuiri makmal, dan pilih format <strong>Compact (1 Muka Surat)</strong> untuk cetakan rekod mengajar mingguan yang kemas.
                    </p>
                  </div>
                </div>
              )}

              {selectedSubj === 'biologi' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-black text-[#ab4f6c] text-sm">
                        <Dna className="w-4 h-4 text-[#ab4f6c]" />
                        <span>Fokus Kurikulum Biologi KSSM (T4 &amp; T5)</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed marker:text-[#ab4f6c]">
                        <li><strong>Tingkatan 4:</strong> Biologi Sel, Komposisi Kimia dalam Sel, Pergerakan Bahan Merentasi Membran Plasma, Enzim, Respirasi Sel, Nutrisi, Pengangkutan dalam Manusia &amp; Tumbuhan.</li>
                        <li><strong>Tingkatan 5:</strong> Fisiologi Tumbuhan Berbunga, Ekologi &amp; Kelestarian Alam Sekitar, Pewarisan, Variasi, Bioteknologi.</li>
                        <li><strong>DLP Biologi:</strong> Sokongan istilah biologi rasmi (cth: <em>Osmosis, Cellular Respiration, Meiosis, Genetic Inheritance</em>).</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-black text-[#ab4f6c] text-sm">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>Panduan Amali &amp; Lukisan Biologi</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed marker:text-[#ab4f6c]">
                        <li>Bagi sesi mikroskop dan penyediaan slaid (cth: sel pipi atau sel epidermis bawang), objektif SMART menumpukan kemahiran manipulatif.</li>
                        <li>Kriteria kejayaan memperincikan peraturan melukis rajah biologi berlabel garis lurus tanpa anak panah.</li>
                        <li>Mod Pantas 30s membolehkan guru Biologi menjana aktiviti inkuiri sel dan fisiologi dengan sekali klik.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                    <span className="font-extrabold text-slate-900 text-xs">Tip Khas Penyediaan RPH Biologi:</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Dalam modul Biologi, semua penjana (RPH Seminggu &amp; Mod Pantas) diasingkan khas kepada silibus Biologi SPM dan Sains bagi memastikan tiada silibus subjek lain bercampur aduk.
                    </p>
                  </div>
                </div>
              )}

              {selectedSubj === 'fizik' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-black text-[#ab5e19] text-sm">
                        <Atom className="w-4 h-4 text-[#ab5e19]" />
                        <span>Fokus Kurikulum Fizik KSSM (T4 &amp; T5)</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed marker:text-[#ab5e19]">
                        <li><strong>Tingkatan 4:</strong> Pengukuran, Daya &amp; Gerakan I, Kegravitian, Haba, Gelombang, Cahaya &amp; Optik.</li>
                        <li><strong>Tingkatan 5:</strong> Daya &amp; Gerakan II, Tekanan, Elektrik, Keelektromagnetan, Elektronik, Fizik Nuklear, Fizik Kuantum.</li>
                        <li><strong>DLP Fizik:</strong> Istilah saintifik lengkap (cth: <em>Newtonian Mechanics, Thermodynamics, Quantum Physics, Electromagnetism</em>).</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-black text-[#ab5e19] text-sm">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>Penyelesaian Masalah &amp; Analisis Graf</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed marker:text-[#ab5e19]">
                        <li>Objektif SMART Fizik menekankan langkah penyelesaian masalah berangka (rumus, gantian nilai &amp; unit SI yang tepat).</li>
                        <li>Aktiviti inkuiri merangkumi eksperimen hukum Fizik (cth: Hukum Hooke, Hukum Ohm, Hukum Gas) berserta analisis kecerunan graf.</li>
                        <li>Simulasi PhET Interactive Simulations Physics disertakan sebagai pilihan BBM utama.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                    <span className="font-extrabold text-slate-900 text-xs">Tip Khas Penyediaan RPH Fizik:</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sesi PdPc penyelesaian masalah numerikal boleh menggunakan model Standard KPM (3 Fasa) manakala sesi amali makmal sesuai menggunakan fasa 5E Inkuiri.
                    </p>
                  </div>
                </div>
              )}

              {selectedSubj === 'sains' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-black text-sky-900 text-sm">
                        <Atom className="w-4 h-4 text-sky-600" />
                        <span>Fokus Kurikulum Sains KSSM (Tingkatan 2 – 5)</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed marker:text-sky-600">
                        <li><strong>Menengah Rendah (T2 &amp; T3):</strong> Biodiversiti, Ekosistem, Nutrisi, Kesihatan Manusia, Rangsangan &amp; Gerak Balas, Sistem Respirasi, Pengangkutan, Termokimia, Elektrik.</li>
                        <li><strong>Menengah Atas (T4 &amp; T5):</strong> Langkah Keselamatan dalam Makmal, Bantuan Kecemasan, Teknik Mengukur Parameter Kesihatan, Genetik, Kimia Industri, Daya &amp; Gerakan, Radioaktiviti, Kelestarian Alam.</li>
                        <li><strong>DLP Sains:</strong> Sukatan rasmi Sains dwibahasa penuh.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-black text-sky-900 text-sm">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>Penyiasatan Saintifik &amp; Projek STEM</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed marker:text-sky-600">
                        <li>Membolehkan guru Sains merancang pembelajaran berasaskan masalah (PBL) dan aktiviti hands-on STEM.</li>
                        <li>Pilihan aktiviti PAK-21 teratur merangkumi Gallery Walk, Think-Pair-Share, dan pembentangan eksperimen.</li>
                        <li>Sesuai untuk guru yang mengajar gabungan kelas Menengah Rendah dan Menengah Atas sekaligus.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                    <span className="font-extrabold text-slate-900 text-xs">Tip Khas Penyediaan RPH Sains:</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Dalam penjana RPH Seminggu bagi Sains, guru boleh memilih sesi kelas Tingkatan 2, 3, 4 atau 5 secara serentak mengikut jadual mengajar harian anda.
                    </p>
                  </div>
                </div>
              )}

              {selectedSubj === 'matematik' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-black text-indigo-900 text-sm">
                        <Calculator className="w-4 h-4 text-indigo-700" />
                        <span>Fokus Kurikulum Matematik KSSM (T2 – T5)</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed marker:text-indigo-700">
                        <li><strong>Tingkatan 2:</strong> Pola &amp; Jujukan, Pemfaktoran &amp; Pecahan Algebra, Rumus Algebra, Poligon, Bulatan, Bentuk Geometri Tiga Dimensi, Koordinat, Graf Fungsi, Laju &amp; Pecutan, Kecerunan, Transformasi Isometri, Sukatan Kecenderungan Memusat, Kebarangkalian Mudah.</li>
                        <li><strong>Tingkatan 3:</strong> Indeks, Bentuk Piawai, Matematik Pengguna (Simpanan &amp; Pelaburan, Kredit), Lukisan Berskala, Nisbah Trigonometri, Sudut &amp; Tangen, Pelan &amp; Dongakan, Lokus dalam Dua Dimensi, Garis Lurus.</li>
                        <li><strong>Tingkatan 4:</strong> Fungsi &amp; Persamaan Kuadratik, Asas Nombor, Penaakulan Logik, Operasi Set, Rangkaian Teori Graf, Ketaksamaan Linear, Graf Gerakan, Sukatan Serakan, Kebarangkalian Peristiwa Bergabung, Matematik Pengguna (Kewangan).</li>
                        <li><strong>Tingkatan 5:</strong> Ubahan, Matriks, Matematik Pengguna (Insurans &amp; Percukaian), Kekongruenan &amp; Pembesaran, Nisbah &amp; Graf Trigonometri, Sukatan Serakan Data Terkumpul, Permodelan Matematik.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-black text-indigo-900 text-sm">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>Pemodelan &amp; Penyelesaian Masalah Harian</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed marker:text-indigo-700">
                        <li>Objektif SMART dirumus bagi memastikan murid memahami konsep, menguasai kemahiran mengira, dan mengaplikasikan konsep kepada masalah rutin &amp; bukan rutin (KBAT).</li>
                        <li>Menyokong penggunaan kalkulator saintifik, perisian GeoGebra, dan lembaran kerja berstruktur.</li>
                        <li>Pengasingan ketat: Modul Matematik hanya menjana RPH Matematik sahaja tanpa sebarang percampuran subjek sains.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                    <span className="font-extrabold text-slate-900 text-xs">Tip Khas Penyediaan RPH Matematik:</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Gunakan ciri <strong>Multi-SP</strong> di Langkah 2 apabila mengajar subtopik yang melibatkan gabungan kemahiran melakar graf dan menyelesaikan masalah dalam satu sesi pembelajaran 60 minit.
                    </p>
                  </div>
                </div>
              )}

              {selectedSubj === 'matematik-tambahan' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                        <Binary className="w-4 h-4 text-slate-700" />
                        <span>Fokus Kurikulum Add Math SPM (T4 &amp; T5)</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed marker:text-slate-700">
                        <li><strong>Tingkatan 4:</strong> Fungsi, Fungsi Kuadratik, Sistem Persamaan, Indeks, Surd &amp; Logaritma, Janjang (Aritmetik &amp; Geometri), Geometri Koordinat, Vektor, Trigonometri, Pilihatur &amp; Gabungan, Kebarangkalian Peristiwa, Taburan Kebarangkalian.</li>
                        <li><strong>Tingkatan 5:</strong> Sukatan Membulat, Pembezaan, Pengamiran, Pengaturcaraan Linear, Kinematik Gerakan Linear.</li>
                        <li><strong>Format Peperiksaan:</strong> Menepati piawaian format Kertas 1 &amp; Kertas 2 SPM.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>Kalkulus &amp; Penyelesaian Masalah Aras Tinggi (KBAT)</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed marker:text-slate-700">
                        <li>Rancangan aktiviti PdPc dirangka dengan pembuktian formula, pemahaman konsep grafikal, dan teknik mencongak algoritma.</li>
                        <li>Aktiviti pembezaan dan pengamiran dihubungkaitkan dengan masalah dunia nyata (contoh: kadar perubahan kuantiti dan luas di bawah graf).</li>
                        <li>Menyediakan latihan soalan klon SPM berperingkat bagi mengukuhkan keyakinan murid aliran sains tulen.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                    <span className="font-extrabold text-slate-900 text-xs">Tip Khas Penyediaan RPH Add Math:</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pilih format susun atur <strong>Compact (1 Muka Surat)</strong> untuk memuatkan keseluruhan langkah penyelesaian, BBM kalkulator grafik dan refleksi dalam satu helaian cetakan padat yang kemas.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: ALIRAN 6 LANGKAH PANTAS                                 */}
          {/* ============================================================== */}
          {activeTab === 'langkah' && (
            <div className="space-y-4">
              {/* Highlight Box: Tip Mod Pantas 30 Saat */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-900">
                    <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>Tip Pantas: Jana RPH Lengkap Dalam 30 Saat!</span>
                  </div>
                  <p className="text-xs text-amber-900/85 leading-relaxed">
                    Kesuntukan masa? Klik butang <strong>Mod Pantas 30s</strong> di bar navigasi atas. Pilih Tingkatan, Bab, dan SP — objektif SMART, aktiviti PdPc, BBM dan refleksi akan disiapkan secara automatik.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenQuickGen();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold transition shrink-0 shadow-xs flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Buka Mod Pantas 30s</span>
                </button>
              </div>

              {/* 6 Steps Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[
                  {
                    step: 1,
                    title: 'Langkah 1: Maklumat Asas, Subjek & Jadual Waktu',
                    desc: 'Tetapkan mata pelajaran, bahasa (BM / DLP), format susun atur (Standard / Compact), tarikh, masa, dan bilangan/kehadiran murid (cth: 30 / 30).',
                  },
                  {
                    step: 2,
                    title: 'Langkah 2: Sukatan DSKP & Pemilihan SP',
                    desc: 'Pilih Tingkatan, Bab, SK dan SP. Anda boleh memilih lebih daripada satu SP serentak untuk menghasilkan RPH multi-standard yang kemas.',
                  },
                  {
                    step: 3,
                    title: 'Langkah 3: Objektif SMART & Kriteria Kejayaan',
                    desc: 'Objektif dijana mengikut formula SMART KPM. Anda boleh mengedit atau menambah kriteria kejayaan spesifik mengikut tahap keupayaan kelas anda.',
                  },
                  {
                    step: 4,
                    title: 'Langkah 4: Aktiviti PdPc (Standard KPM / 5E HIKMAH)',
                    desc: 'Pilih model pedagogi Standard KPM (3 Fasa) atau 5E Pedagogi HIKMAH MRSM, lengkap dengan aktiviti inkuiri, amali, dan kaedah PAK-21.',
                  },
                  {
                    step: 5,
                    title: 'Langkah 5: EMK, BBM, PBD & Catatan Refleksi',
                    desc: 'Pilih Elemen Merentas Kurikulum, bahan bantu mengajar (BBM digital & simulasi), kaedah pentaksiran bilik darjah (PBD), dan rumusan refleksi guru.',
                  },
                  {
                    step: 6,
                    title: 'Langkah 6: Pratonton, Cetak PDF, Word & Classroom',
                    desc: 'Semak dokumen RPH rasmi, cetak terus, muat turun fail Word (.doc), hantar bahan ke Google Classroom, atau simpan ke Pustaka RPH anda.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between gap-3 hover:border-indigo-300 transition"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-indigo-700 text-white inline-flex items-center justify-center text-xs font-bold shrink-0">
                          {item.step}
                        </span>
                        <span className="text-xs font-extrabold text-slate-900">{item.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-8">
                        {item.desc}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleGoToStep(item.step)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900 pl-8 self-start cursor-pointer"
                    >
                      <span>Pergi ke Langkah {item.step}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: JADUAL, MULTI-KELAS & BATCH MINGGUAN                    */}
          {/* ============================================================== */}
          {activeTab === 'pintar' && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>1. Muat Naik Jadual Waktu Mengajar (PNG, JPEG, PDF)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Di <strong>Langkah 1</strong>, muat naik gambar atau fail PDF jadual waktu mengajar anda. Sistem akan mengekstrak slot kelas, hari, dan masa secara automatik supaya anda tidak perlu menaip manual berulang kali.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>2. Jana RPH Sama Untuk Banyak Kelas (Multi-Kelas)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mengajar topik yang sama untuk beberapa kelas? Klik <strong>+ Tambah Kelas Lain</strong> di Langkah 1. Pada Langkah 6, anda boleh mencetak atau memuat turun dokumen bagi setiap kelas secara berasingan atau sekaligus.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                    <CalendarRange className="w-4 h-4 text-indigo-600" />
                    <span>3. Jana RPH Seminggu Terus (Batch Mingguan)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenWeeklyGen();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition shadow-2xs cursor-pointer"
                  >
                    Buka RPH Seminggu
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Gunakan modal <strong>Jana RPH Seminggu</strong> untuk menyusun 2 hingga 9 sesi kelas bagi satu minggu dalam satu borang luas. Setiap sesi menyokong kehadiran murid, penetapan masa, pemilihan multi-SP, dan muat turun dokumen gabungan Word (.docx) atau Excel.
                </p>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: CETAK PDF & WORD 1-MUKA SURAT                           */}
          {/* ============================================================== */}
          {activeTab === 'eksport' && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                  <Minimize2 className="w-4 h-4 text-emerald-600" />
                  <span>1. Format Padat Compact (1-Muka Surat) vs Standard</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pilih <strong>Compact RPH (1 Muka Surat)</strong> untuk memuatkan keseluruhan RPH secara rapi dalam satu helaian kertas A4 sahaja (tiada halaman kedua tergantung). Pilih <strong>Standard</strong> untuk paparan terperinci dengan penerangan penuh fasa aktiviti.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                  <Printer className="w-4 h-4 text-slate-800" />
                  <span>2. Cetak / AirPrint &amp; Simpan Sebagai PDF</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tekan butang <strong>Cetak / AirPrint</strong> di Langkah 6. Sistem akan mengasingkan dokumen RPH rasmi tanpa sebarang butang atau bar sisi, sedia untuk dicetak atau disimpan sebagai fail PDF berkualiti tinggi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                  <FileDown className="w-4 h-4 text-blue-600" />
                  <span>3. Panduan Pengguna iPad &amp; iPhone (iOS/iPadOS)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Apabila anda menekan <strong>Muat Turun Word</strong> atau <strong>Muat Turun PDF</strong> di peranti Apple, menu perkongsian iOS akan dipaparkan. Pilih <strong>&quot;Save to Files&quot; (Simpan ke Fail)</strong> untuk menyimpannya ke folder peranti atau iCloud Drive anda.
                </p>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: SOALAN LAZIM (FAQ)                                      */}
          {/* ============================================================== */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              {[
                {
                  q: 'Bagaimanakah cara memasukkan bilangan kehadiran pelajar?',
                  a: 'Pada Langkah 1 (atau pada setiap sesi kelas dalam Penjana RPH Seminggu & Mod Pantas), masukkan bilangan kehadiran di ruangan "Kehadiran Pelajar" mengikut format cth: 30 / 30 atau 28 / 30. Nilai ini akan dipaparkan secara automatik dalam jadual RPH rasmi.',
                },
                {
                  q: 'Bolehkah saya memilih lebih daripada satu Standard Pembelajaran (SP) dalam satu sesi?',
                  a: 'Ya! Anda boleh menanda (tick) lebih daripada 1 SP pada borang DSKP atau klik "Pilih Lesson (Multi-SP)". Objektif SMART dan kriteria kejayaan akan digabungkan secara tersusun dengan nombor siri berasingan.',
                },
                {
                  q: 'Mengapa subjek Matematik tidak mempunyai pilihan subjek Sains?',
                  a: 'Modul Matematik dan Matematik Tambahan direka khas secara terpencil (isolated) mengikut DSKP Matematik KSSM KPM rasmi agar guru Matematik dapat fokus kepada sukatan matematik tanpa kekeliruan.',
                },
                {
                  q: 'Bagaimana cara menukar bahasa kepada DLP English?',
                  a: 'Di Langkah 1, klik kad "Bahasa Pengantar" dan pilih "DLP (English)". Seluruh tema, bab, Learning Standards, dan SMART Objectives akan bertukar kepada Bahasa Inggeris secara automatik.',
                },
                {
                  q: 'Adakah data RPH saya disimpan jika pelayar ditutup?',
                  a: 'Ya! Klik butang "Simpan ke Pustaka RPH" di Langkah 6. RPH disimpan selamat dalam storan pelayar anda dan boleh diakses semula pada bila-bila masa melalui menu Pustaka RPH di bar navigasi atas.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-start gap-2 font-extrabold text-slate-900 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item.q}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-700 shrink-0" />
            <span>
              e-RPH Pintar (by Cikgu Hafreez) — Menepati Sukatan DSKP Rasmi KPM &amp; Pedagogi HIKMAH MRSM.
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition self-end sm:self-auto cursor-pointer shadow-xs"
          >
            Faham &amp; Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
