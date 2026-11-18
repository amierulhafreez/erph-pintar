import React from 'react';
import {
  FileText,
  BookOpen,
  Target,
  Sparkles,
  Layers,
  Printer,
  Zap,
  Bookmark,
  FlaskConical,
  Atom,
  Dna,
  ShieldCheck,
  LogIn,
  LogOut,
  CalendarRange,
  HelpCircle,
  Calculator,
  Compass,
  MessageSquareHeart,
} from 'lucide-react';
import { User } from '../services/firebase';
import { SubjekRPH } from '../types/rph';

interface WizardHeaderProps {
  currentStep: number;
  subjek?: SubjekRPH;
  subjectTitle?: string;
  portalSubject?: string;
  onSubjekChange?: (subjek: SubjekRPH) => void;
  onSelectStep: (step: number) => void;
  onOpenQuickGen: () => void;
  onOpenWeeklyGen: () => void;
  onOpenSavedPlans: () => void;
  onOpenUserGuide: () => void;
  onOpenOfficialRef?: () => void;
  onOpenFeedback?: () => void;
  onOpenAdminDashboard: () => void;
  savedCount: number;
  currentUser: User | null;
  isAdmin: boolean;
  onGoogleLogin: () => void;
  onGoogleLogout: () => void;
}

const STEPS = [
  { id: 1, label: 'Info & Jadual', icon: FileText, desc: 'Kelas, DLP & Masa' },
  { id: 2, label: 'Sukatan DSKP', icon: BookOpen, desc: 'Bab, SK & SP' },
  { id: 3, label: 'Objektif SMART', icon: Target, desc: 'Kriteria Kejayaan' },
  { id: 4, label: 'Aktiviti PdPC', icon: Sparkles, desc: 'PAK-21 & Langkah' },
  { id: 5, label: 'Elemen & PBD', icon: Layers, desc: 'EMK, BBM & Format' },
  { id: 6, label: 'Pratonton & Hantar', icon: Printer, desc: 'Cetak / Classroom' },
];

export const WizardHeader: React.FC<WizardHeaderProps> = ({
  currentStep,
  subjek = 'Kimia',
  subjectTitle,
  portalSubject = 'kimia',
  onSubjekChange,
  onSelectStep,
  onOpenQuickGen,
  onOpenWeeklyGen,
  onOpenSavedPlans,
  onOpenUserGuide,
  onOpenOfficialRef,
  onOpenFeedback,
  onOpenAdminDashboard,
  savedCount,
  currentUser,
  isAdmin,
  onGoogleLogin,
  onGoogleLogout,
}) => {
  const isPink = portalSubject === 'biologi';
  const isAmber = portalSubject === 'fizik';
  const isTurquoise = portalSubject === 'sains';
  const isIndigo = portalSubject === 'matematik';
  const isCharcoal = portalSubject === 'matematik-tambahan';

  return (
    <header className="bg-white/75 backdrop-blur-2xl border-b border-white/70 sticky top-0 z-40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navbar */}
        <div className="py-2 flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-200/60">
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <img
              src="/assets/logo.png"
              alt="e-RPH Pintar"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover shadow-md shadow-amber-950/20 ring-1.5 ring-amber-400/40 shrink-0 hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
                <span className="font-black text-lg sm:text-xl lg:text-2xl text-slate-900 tracking-tight leading-tight">
                  {subjectTitle || `e-RPH ${subjek} KSSM Pintar`}{' '}
                  <span className={`${isPink ? 'text-pink-700' : isAmber ? 'text-amber-700' : isTurquoise ? 'text-sky-700' : isIndigo ? 'text-indigo-700' : 'text-emerald-700'} font-bold text-xs sm:text-sm lg:text-base`}>
                    (by Cikgu Hafreez)
                  </span>
                </span>
                <span className={`inline-flex items-center px-2 py-0.2 rounded-full text-[10px] font-bold ${
                  isPink
                    ? 'bg-pink-500/10 text-pink-900 border border-pink-500/20'
                    : isAmber
                    ? 'bg-amber-500/10 text-amber-900 border border-amber-500/20'
                    : isTurquoise
                    ? 'bg-sky-500/10 text-sky-900 border border-sky-500/20'
                    : isIndigo
                    ? 'bg-indigo-500/10 text-indigo-900 border border-indigo-500/20'
                    : 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20'
                } backdrop-blur-xs`}>
                  BM &amp; DLP English
                </span>
                <span className={`inline-flex items-center px-2 py-0.2 rounded-full text-[10px] font-semibold ${
                  isPink
                    ? 'bg-rose-500/10 text-rose-900 border border-rose-500/20'
                    : isAmber
                    ? 'bg-orange-500/10 text-orange-900 border border-orange-500/20'
                    : isTurquoise
                    ? 'bg-sky-500/10 text-sky-900 border border-sky-500/20'
                    : isIndigo
                    ? 'bg-indigo-500/10 text-indigo-900 border border-indigo-500/20'
                    : isCharcoal
                    ? 'bg-slate-700/10 text-slate-900 border border-slate-700/20'
                    : 'bg-teal-500/10 text-teal-800 border border-teal-500/20'
                } backdrop-blur-xs`}>
                  {subjek === 'Sains' ? 'Sains T2–T5' : subjek === 'Matematik' ? 'Matematik T2–T5' : subjek === 'Matematik Tambahan' ? 'AddMaths T4–T5' : `${subjek} T4–T5`}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block truncate">
                Penyedia RPH {subjek} Terpantas Mengikut DSKP Rasmi, Pedagogi HIKMAH
              </p>
            </div>
          </div>

          {/* Quick Utility & Google Auth Buttons */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            {/* Subject Switcher: If in Sains module, locked to Sains only. Otherwise allows major subject or Sains */}
            {onSubjekChange && (
              <div className="inline-flex items-center bg-slate-200/60 backdrop-blur-md p-0.5 rounded-full border border-white/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
                {portalSubject === 'sains' ? (
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-extrabold apple-btn-icy shadow-xs flex items-center gap-1 select-none"
                    title="Modul Sains KSSM Tingkatan 2 – 5"
                  >
                    <Atom className="w-3.5 h-3.5" />
                    <span>Sains (T2–T5)</span>
                  </span>
                ) : portalSubject === 'matematik' ? (
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-extrabold apple-btn-indigo shadow-xs flex items-center gap-1 select-none"
                    title="Modul Matematik KSSM Tingkatan 2 – 5"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Matematik (T2–T5)</span>
                  </span>
                ) : portalSubject === 'matematik-tambahan' ? (
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-extrabold apple-btn-charcoal shadow-xs flex items-center gap-1 select-none"
                    title="Modul Matematik Tambahan KSSM Tingkatan 4 & 5"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>AddMaths (T4–T5)</span>
                  </span>
                ) : (
                  <>
                    {portalSubject === 'biologi' ? (
                      <button
                        type="button"
                        onClick={() => onSubjekChange('Biologi')}
                        className={`px-2.5 py-1 rounded-full text-xs font-extrabold transition-all flex items-center gap-1 ${
                          subjek === 'Biologi'
                            ? 'apple-btn-pink shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Jana RPH Biologi KSSM Tingkatan 4 & 5"
                      >
                        <Dna className="w-3.5 h-3.5" />
                        <span>Biologi (T4–T5)</span>
                      </button>
                    ) : portalSubject === 'fizik' ? (
                      <button
                        type="button"
                        onClick={() => onSubjekChange('Fizik')}
                        className={`px-2.5 py-1 rounded-full text-xs font-extrabold transition-all flex items-center gap-1 ${
                          subjek === 'Fizik'
                            ? 'apple-btn-amber shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Jana RPH Fizik KSSM Tingkatan 4 & 5"
                      >
                        <Atom className="w-3.5 h-3.5" />
                        <span>Fizik (T4–T5)</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSubjekChange('Kimia')}
                        className={`px-2.5 py-1 rounded-full text-xs font-extrabold transition-all flex items-center gap-1 ${
                          subjek === 'Kimia'
                            ? 'apple-btn-emerald shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Jana RPH Kimia KSSM Tingkatan 4 & 5"
                      >
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>Kimia (T4–T5)</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onSubjekChange('Sains')}
                      className={`px-2.5 py-1 rounded-full text-xs font-extrabold transition-all flex items-center gap-1 ${
                        subjek === 'Sains'
                          ? isPink ? 'apple-btn-pink shadow-xs' : isAmber ? 'apple-btn-amber shadow-xs' : 'apple-btn-emerald shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Jana RPH Sains KSSM Tingkatan 2, 3, 4 & 5"
                    >
                      <Atom className="w-3.5 h-3.5" />
                      <span>Sains (T2–T5)</span>
                    </button>
                  </>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={onOpenQuickGen}
              className="apple-btn-amber inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs cursor-pointer"
              title="Jana RPH lengkap dalam 30 saat"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Mod Pantas 30s</span>
            </button>

            <button
              type="button"
              onClick={onOpenWeeklyGen}
              className={`${isPink ? 'apple-btn-pink' : isAmber ? 'apple-btn-amber' : isTurquoise ? 'apple-btn-turquoise' : 'apple-btn-emerald'} inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs cursor-pointer`}
              title="Bina RPH untuk seminggu terus"
            >
              <CalendarRange className="w-3.5 h-3.5 text-white/90" />
              <span>RPH Seminggu</span>
            </button>

            <button
              type="button"
              onClick={onOpenSavedPlans}
              className="apple-btn-blue inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-blue-100" />
              <span>Pustaka RPH</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/25 text-white font-black border border-white/30">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenUserGuide}
              className="apple-btn-glass inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 cursor-pointer"
              title="Panduan & Bantuan Pengguna Lengkap"
            >
              <HelpCircle className={`w-3.5 h-3.5 ${isPink ? 'text-pink-600' : isAmber ? 'text-amber-600' : isTurquoise ? 'text-teal-600' : 'text-teal-600'}`} />
              <span>Panduan</span>
            </button>

            {onOpenOfficialRef && (
              <button
                type="button"
                onClick={onOpenOfficialRef}
                className="apple-btn-glass inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 cursor-pointer"
                title="Rujukan Rasmi DSKP & Buku Teks Digital"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Rujukan</span>
              </button>
            )}

            {onOpenFeedback && (
              <button
                type="button"
                onClick={onOpenFeedback}
                className="apple-btn-glass inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 cursor-pointer"
                title="Borang Maklum Balas Guru"
              >
                <MessageSquareHeart className="w-3.5 h-3.5 text-rose-500" />
                <span>Maklum Balas</span>
              </button>
            )}

            {isAdmin && (
              <button
                type="button"
                onClick={onOpenAdminDashboard}
                className="apple-btn-purple inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs cursor-pointer"
                title="Papan Pemuka Admin & Analitik Penggunaan"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}

            {currentUser ? (
              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-300/60">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'Guru'}
                    className="w-6 h-6 rounded-full border border-white shadow-xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`w-6 h-6 rounded-full ${isPink ? 'apple-btn-pink' : isAmber ? 'apple-btn-amber' : isTurquoise ? 'apple-btn-icy' : isIndigo ? 'apple-btn-indigo' : 'apple-btn-emerald'} text-white flex items-center justify-center text-[10px] font-bold shrink-0`}>
                    {(currentUser.displayName || 'G').charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-bold text-slate-700 max-w-[95px] truncate">
                  {currentUser.displayName?.split(' ')[0]}
                </span>
                <button
                  type="button"
                  onClick={onGoogleLogout}
                  className="p-1 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50/80 transition"
                  title="Log Keluar"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onGoogleLogin}
                className={`${isPink ? 'apple-btn-pink' : isAmber ? 'apple-btn-amber' : isTurquoise ? 'apple-btn-icy' : isIndigo ? 'apple-btn-indigo' : 'apple-btn-emerald'} inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs cursor-pointer`}
                title="Log Masuk dengan Akaun Google untuk Simpan RPH di Cloud"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log Masuk Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Step Progress Stepper */}
        <nav aria-label="Progress" className="py-2">
          <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2">
            {STEPS.map((step) => {
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;

              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => onSelectStep(step.id)}
                    className={`w-full group flex items-center gap-2 p-1.5 sm:p-2 rounded-xl text-left transition-all border ${
                      isActive
                        ? isPink
                          ? 'bg-pink-500/15 backdrop-blur-md border-pink-500/40 shadow-[0_4px_14px_-2px_rgba(244,114,182,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)]'
                          : isAmber
                          ? 'bg-amber-500/15 backdrop-blur-md border-amber-500/35 shadow-[0_4px_14px_-2px_rgba(245,158,11,0.2),inset_0_1px_1px_rgba(255,255,255,0.9)]'
                          : isTurquoise
                          ? 'bg-sky-500/15 backdrop-blur-md border-sky-500/35 shadow-[0_4px_14px_-2px_rgba(14,165,233,0.2),inset_0_1px_1px_rgba(255,255,255,0.9)]'
                          : isIndigo
                          ? 'bg-indigo-500/15 backdrop-blur-md border-indigo-500/35 shadow-[0_4px_14px_-2px_rgba(99,102,241,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)]'
                          : isCharcoal
                          ? 'bg-slate-500/15 backdrop-blur-md border-slate-500/35 shadow-[0_4px_14px_-2px_rgba(71,85,105,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)]'
                          : 'bg-emerald-500/15 backdrop-blur-md border-emerald-500/35 shadow-[0_4px_14px_-2px_rgba(16,185,129,0.2),inset_0_1px_1px_rgba(255,255,255,0.9)]'
                        : isPast
                        ? 'bg-white/70 backdrop-blur-md border-white/90 hover:bg-white text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)]'
                        : 'bg-white/30 backdrop-blur-xs border-transparent hover:bg-white/60 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <span
                      className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold transition ${
                        isActive
                          ? isPink ? 'apple-btn-pink shadow-xs' : isAmber ? 'apple-btn-amber shadow-xs' : isTurquoise ? 'apple-btn-icy shadow-xs' : isIndigo ? 'apple-btn-indigo shadow-xs' : isCharcoal ? 'apple-btn-charcoal shadow-xs' : 'apple-btn-emerald shadow-xs'
                          : isPast
                          ? isPink
                            ? 'bg-pink-100 text-pink-800 border border-pink-300/50'
                            : isAmber
                            ? 'bg-amber-100 text-amber-800 border border-amber-300/40'
                            : isTurquoise
                            ? 'bg-sky-100 text-sky-800 border border-sky-300/40'
                            : isIndigo
                            ? 'bg-indigo-100 text-indigo-800 border border-indigo-300/40'
                            : isCharcoal
                            ? 'bg-slate-200 text-slate-800 border border-slate-300/40'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300/40'
                          : 'bg-slate-200/60 text-slate-500 group-hover:bg-slate-200'
                      }`}
                    >
                      {isPast ? '✓' : step.id}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-bold truncate ${
                          isActive
                            ? isPink ? 'text-pink-950 font-extrabold' : isAmber ? 'text-amber-950 font-extrabold' : isTurquoise ? 'text-sky-950 font-extrabold' : isIndigo ? 'text-indigo-950 font-extrabold' : isCharcoal ? 'text-slate-950 font-extrabold' : 'text-emerald-950 font-extrabold'
                            : isPast
                            ? 'text-slate-900 font-semibold'
                            : 'text-slate-500'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate leading-tight">
                        {step.desc}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
};
