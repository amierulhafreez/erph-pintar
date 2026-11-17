import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SUBJECTS, SubjectConfig } from '../config/subjects';
import { BackgroundHexPattern } from '../components/ChemistryDecor';
import { OFFICIAL_REFERENCES, SubjectOfficialReference } from '../data/officialReferences';
import { FeedbackModal } from '../components/FeedbackModal';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Atom,
  FlaskConical,
  Dna,
  Calculator,
  Compass,
  FileCheck,
  Zap,
  Clock,
  Layers,
  KeyRound,
  CalendarRange,
  Cloud,
  Award,
  Send,
  MessageCircle,
  MessageSquareHeart,
  ExternalLink,
  FileText,
  BookmarkCheck,
  HelpCircle,
} from 'lucide-react';

export const LandingPortal: React.FC = () => {
  const [activeRefSubject, setActiveRefSubject] = useState<string>('kimia');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const selectedRef = OFFICIAL_REFERENCES[activeRefSubject] || OFFICIAL_REFERENCES.kimia;

  useEffect(() => {
    document.title = 'eRPH Pintar STEM';
  }, []);

  const getSubjectIcon = (key: string) => {
    switch (key) {
      case 'kimia':
        return <FlaskConical className="w-7 h-7 text-emerald-600" />;
      case 'biologi':
        return <Dna className="w-7 h-7 text-[#c45b7c]" />;
      case 'fizik':
        return <Atom className="w-7 h-7 text-[#c97523]" />;
      case 'sains':
        return <Sparkles className="w-7 h-7 text-sky-600" />;
      case 'matematik':
        return <Calculator className="w-7 h-7 text-indigo-600" />;
      case 'matematik-tambahan':
        return <Compass className="w-7 h-7 text-slate-700" />;
      default:
        return <BookOpen className="w-7 h-7 text-slate-600" />;
    }
  };

  const getSubjectIconBg = (key: string) => {
    switch (key) {
      case 'kimia':
        return 'bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/25 shadow-emerald-500/10';
      case 'biologi':
        return 'bg-gradient-to-br from-[#e587a3]/20 via-[#fce7ee] to-transparent border border-[#f8adc6] shadow-sm';
      case 'fizik':
        return 'bg-gradient-to-br from-[#e69949]/20 via-[#fdf3e7] to-transparent border border-[#f4c99c] shadow-sm';
      case 'sains':
        return 'bg-gradient-to-br from-sky-500/15 via-cyan-500/10 to-transparent border border-sky-500/25 shadow-sky-500/10';
      case 'matematik':
        return 'bg-gradient-to-br from-indigo-500/15 via-blue-500/10 to-transparent border border-indigo-500/25 shadow-indigo-500/10';
      case 'matematik-tambahan':
        return 'bg-gradient-to-br from-slate-700/15 via-zinc-600/10 to-transparent border border-slate-700/25 shadow-slate-700/10';
      default:
        return 'bg-slate-100 border border-slate-200';
    }
  };

  const getAmbientOrb = (theme: string) => {
    switch (theme) {
      case 'emerald':
        return 'from-emerald-400/20 via-teal-300/10';
      case 'pink':
        return 'from-[#e587a3]/25 via-[#fbcfe0]/15';
      case 'amber':
        return 'from-[#e69949]/25 via-[#fae3cb]/15';
      case 'cyan':
      case 'teal':
        return 'from-sky-400/25 via-cyan-300/15';
      case 'indigo':
        return 'from-indigo-400/20 via-blue-300/10';
      case 'charcoal':
        return 'from-slate-500/20 via-zinc-400/10';
      default:
        return 'from-slate-400/10 via-slate-300/5';
    }
  };

  const getBorderColor = (theme: string) => {
    switch (theme) {
      case 'emerald':
        return 'hover:border-emerald-500/50 hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.22)]';
      case 'pink':
        return 'hover:border-[#e587a3]/60 hover:shadow-[0_20px_50px_-10px_rgba(229,135,163,0.25)]';
      case 'amber':
        return 'hover:border-[#e69949]/60 hover:shadow-[0_20px_50px_-10px_rgba(230,153,73,0.22)]';
      case 'cyan':
      case 'teal':
        return 'hover:border-sky-500/50 hover:shadow-[0_20px_50px_-10px_rgba(14,165,233,0.22)]';
      case 'indigo':
        return 'hover:border-indigo-500/50 hover:shadow-[0_20px_50px_-10px_rgba(99,102,241,0.22)]';
      case 'charcoal':
        return 'hover:border-slate-600/60 hover:shadow-[0_20px_50px_-10px_rgba(30,41,59,0.3)]';
      default:
        return 'hover:border-slate-300';
    }
  };

  const getBadgeStyle = (theme: string) => {
    switch (theme) {
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-800 border-emerald-500/25';
      case 'pink':
        return 'bg-[#fdf4f7] text-[#9c3d5d] border-[#fbcfe0]';
      case 'amber':
        return 'bg-[#fefbf6] text-[#964f11] border-[#fae3cb]';
      case 'cyan':
      case 'teal':
        return 'bg-sky-500/10 text-sky-900 border-sky-500/25';
      case 'indigo':
        return 'bg-indigo-500/10 text-indigo-800 border-indigo-500/25';
      case 'charcoal':
        return 'bg-slate-700/10 text-slate-900 border-slate-700/25';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getButtonClass = (theme: string) => {
    switch (theme) {
      case 'pink':
        return 'apple-btn-pink';
      case 'emerald':
        return 'apple-btn-emerald';
      case 'cyan':
      case 'teal':
        return 'apple-btn-icy';
      case 'amber':
        return 'apple-btn-amber';
      case 'indigo':
        return 'apple-btn-indigo';
      case 'charcoal':
        return 'apple-btn-charcoal';
      default:
        return 'bg-slate-900 hover:bg-slate-800 text-white';
    }
  };

  const getAccentIconClass = (theme: string) => {
    switch (theme) {
      case 'pink':
        return 'text-[#c45b7c]';
      case 'cyan':
      case 'teal':
        return 'text-sky-600';
      case 'amber':
        return 'text-[#c97523]';
      case 'indigo':
        return 'text-indigo-600';
      case 'charcoal':
        return 'text-slate-700';
      default:
        return 'text-emerald-600';
    }
  };

  return (
    <div className="relative min-h-screen liquid-glass-mesh text-slate-900 font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden flex flex-col justify-between">
      {/* Background Luminous Liquid Chromatic Orbs */}
      <BackgroundHexPattern theme="portal" />

      {/* Top Navbar - Apple Frosted Glass */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-white/60 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.03)] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-[0_4px_14px_rgba(16,185,129,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)]">
              <Sparkles className="w-5 h-5 drop-shadow-xs" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-[-0.03em] text-slate-900 leading-none">
                  e-RPH Pintar
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900/5 text-slate-700 font-semibold border border-slate-900/10">
                  by Cikgu Hafreez
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight mt-0.5">
                Portal Janaan RPH KSSM Lengkap DSKP, AI &amp; Pedagogi HIKMAH
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsFeedbackOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-slate-700 hover:text-blue-600 border border-slate-200/80 shadow-xs text-xs font-bold transition cursor-pointer"
              title="Borang Maklum Balas Pengguna e-RPH"
            >
              <MessageSquareHeart className="w-3.5 h-3.5 text-rose-500" />
              <span>Maklum Balas</span>
            </button>

            <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sistem Pengaktifan Berlesen</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-14 flex-1 w-full">
        {/* Apple Keynote Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Top Apple Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)] text-slate-800 text-xs font-bold tracking-tight">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-500 font-medium">e-RPH PINTAR 2.0</span>
            <span className="text-slate-300">•</span>
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-bold">
              Ekosistem RPH Generasi Baharu
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-[-0.04em] leading-[1.08]">
            Penyedia RPH Terpantas Untuk{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-pink-600 bg-clip-text text-transparent drop-shadow-xs">
              Guru STEM Malaysia
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed tracking-[-0.01em] font-normal">
            Sediakan Rancangan Pengajaran Harian (RPH) mengikut sukatan DSKP rasmi,
            objektif SMART, aktiviti 5E Pedagogi HIKMAH dan muat turun PDF kemas 1 muka surat
            dalam masa 30 saat.
          </p>

          {/* Apple Quick Pill Highlights */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-semibold text-slate-700">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>30 Saat Sedia</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>DSKP Rasmi BM &amp; DLP</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-xs">
              <Award className="w-3.5 h-3.5 text-pink-600" />
              <span>Pedagogi HIKMAH &amp; SMART</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-xs">
              <FileCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Padat 1-Muka Surat</span>
            </div>
          </div>
        </div>

        {/* Apple Liquid Glass Bento Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {Object.values(SUBJECTS).map((sub: SubjectConfig) => {
            const isReady = sub.isReady;
            const borderStyle = getBorderColor(sub.themeColor);
            const badgeStyle = getBadgeStyle(sub.themeColor);
            const buttonClass = getButtonClass(sub.themeColor);
            const accentClass = getAccentIconClass(sub.themeColor);
            const iconBg = getSubjectIconBg(sub.key);
            const ambientOrb = getAmbientOrb(sub.themeColor);

            return (
              <div
                key={sub.key}
                className={`relative group rounded-[28px] p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isReady
                    ? `bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_-8px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:-translate-y-2 hover:bg-white/90 ${borderStyle}`
                    : 'bg-white/45 backdrop-blur-xl border border-white/50 opacity-70 shadow-xs'
                }`}
              >
                {/* Top specular reflection edge highlight */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none" />

                {/* Ambient glowing color orb inside card */}
                {isReady && (
                  <div
                    className={`absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-to-br ${ambientOrb} to-transparent blur-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                )}

                <div className="relative z-10 space-y-5">
                  {/* Card Header: Icon & Forms Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] ${iconBg}`}
                    >
                      {getSubjectIcon(sub.key)}
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border shadow-2xs backdrop-blur-md ${badgeStyle}`}
                    >
                      {sub.formsLabel}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-[-0.03em] flex items-center gap-2">
                      <span>{sub.name}</span>
                      {!isReady && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-900 border border-amber-500/25">
                          Akan Datang
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
                      {sub.tagline}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="pt-3 border-t border-slate-900/5 space-y-2 text-xs font-medium text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-white/90 shadow-2xs flex items-center justify-center shrink-0">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${accentClass}`} />
                      </div>
                      <span>DSKP Rasmi (BM &amp; DLP English)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-white/90 shadow-2xs flex items-center justify-center shrink-0">
                        <FileCheck className={`w-3.5 h-3.5 ${accentClass}`} />
                      </div>
                      <span>Format Cetakan Standard &amp; Padat 1 Muka Surat</span>
                    </div>
                  </div>
                </div>

                {/* Card Button */}
                <div className="relative z-10 pt-7">
                  {isReady ? (
                    <Link
                      to={`/${sub.key}`}
                      className={`w-full py-3 px-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${buttonClass}`}
                    >
                      <span>Buka Modul {sub.shortName}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm text-slate-400 bg-slate-100/80 border border-slate-200/80 cursor-not-allowed flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Dalam Pembangunan</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Apple Pro Bento Showcase Section */}
        <section className="relative rounded-[36px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 border border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] overflow-hidden">
          {/* Ambient luminous light orbs inside dark section */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/10 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Teknologi Pintar untuk Guru</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-[-0.03em] text-white">
                Satu Sistem. Pelbagai Mata Pelajaran.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Semua modul berkongsi enjin pintar yang sama. Akaun Google anda boleh
                mengaktifkan modul mengikut keperluan mata pelajaran yang diajar di sekolah.
              </p>
            </div>

            {/* Apple 4-Grid Glass Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="p-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.09] transition-all border border-white/10 backdrop-blur-xl shadow-xs space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm tracking-tight">
                  Lesen Bebas Mengikut Subjek
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Beli hanya modul subjek yang diajar dengan kod akses khusus tanpa komitmen pakej membazir.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.09] transition-all border border-white/10 backdrop-blur-xl shadow-xs space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
                  <CalendarRange className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm tracking-tight">
                  Jana Seminggu Terus
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Import jadual waktu sekali sahaja, sistem pintar auto-isi kelas, subjek, masa dan SP berturutan.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.09] transition-all border border-white/10 backdrop-blur-xl shadow-xs space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center">
                  <Cloud className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm tracking-tight">
                  Integrasi Classroom &amp; OneNote
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Hantar bahan pembelajaran terus ke Google Classroom murid atau fail digital OneNote guru.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.09] transition-all border border-white/10 backdrop-blur-xl shadow-xs space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm tracking-tight">
                  Pedagogi HIKMAH MRSM
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sokongan penuh model PdPc Standard KPM (3 Fasa) dan 5E Pedagogi HIKMAH eksklusif MRSM.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Bahagian Rujukan Rasmi DSKP & Buku Teks Digital Mengikut Subjek */}
        <section id="rujukan-rasmi" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80 mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Pusat Rujukan Rasmi KPM &amp; DSKP</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Rujukan Rasmi: DSKP &amp; Buku Teks Digital
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Pecahan dokumen sah DSKP Bahagian Pembangunan Kurikulum (BPK) KPM dan buku teks interaktif AnyFlip bagi setiap mata pelajaran.
              </p>
            </div>

            <a
              href="http://bpk.moe.gov.my/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white/80 hover:bg-white border border-slate-200/80 shadow-xs transition-all hover:border-slate-300 self-start md:self-auto"
            >
              <span>Portal BPK KPM Rasmi</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>

          {/* Subjek Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {Object.values(OFFICIAL_REFERENCES).map((sub) => {
              const isSelected = activeRefSubject === sub.key;
              return (
                <button
                  key={sub.key}
                  type="button"
                  onClick={() => setActiveRefSubject(sub.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? `${sub.pillClass} shadow-md scale-102`
                      : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <span className={isSelected ? 'text-white' : 'text-slate-600'}>
                    {getSubjectIcon(sub.key)}
                  </span>
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>

          {/* Kad Rujukan Terpilih */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${selectedRef.badgeClass} border`}>
                  {getSubjectIcon(selectedRef.key)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-black text-slate-900 tracking-tight">
                      {selectedRef.name}
                    </h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${selectedRef.badgeClass}`}>
                      KSSM Menengah
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kurikulum Standard Sekolah Menengah · Dokumen Rasmi &amp; Buku Teks AnyFlip
                  </p>
                </div>
              </div>

              <a
                href={selectedRef.bpkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${selectedRef.badgeClass} hover:opacity-90 self-start sm:self-auto`}
              >
                <span>Arkib DSKP {selectedRef.shortName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Grid DSKP & Buku Teks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Kolum DSKP */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Dokumen Standard Kurikulum (DSKP)</span>
                </div>

                <div className="space-y-3">
                  {selectedRef.dskpList.map((dskp, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 transition-all space-y-2 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
                            {dskp.tingkatan}
                          </span>
                          <h5 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {dskp.kod}
                          </h5>
                        </div>
                        <a
                          href={dskp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-all shadow-2xs shrink-0"
                          title="Buka Dokumen DSKP Rasmi"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {dskp.dokumen}
                      </p>

                      <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center justify-between">
                        <span className="truncate pr-2">Fokus: {dskp.fokus}</span>
                        <span className="shrink-0 font-medium text-slate-400">BPK KPM</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kolum Buku Teks Digital */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                  <span>Buku Teks Digital Interaktif (AnyFlip)</span>
                </div>

                <div className="space-y-3">
                  {selectedRef.bukuTeksList.map((bk, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 transition-all space-y-2.5 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {bk.tingkatan}
                          </span>
                          <h5 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {bk.tajuk}
                          </h5>
                        </div>
                        <span className="text-[11px] font-bold text-slate-400">
                          {bk.tahun}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <span className="text-xs text-slate-500">
                          {bk.penerbit}
                        </span>
                        <a
                          href={bk.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all shrink-0"
                        >
                          <span>Buka AnyFlip</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Bahagian Hubungi Cikgu Hafreez - Telegram & WhatsApp */}
        <section id="hubungi" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e1e2d] via-[#102438] to-[#0a1520] p-7 sm:p-10 border border-cyan-900/40 shadow-xl text-white">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#0088cc]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-[#0088cc]/20 text-[#54bbf5] border border-[#0088cc]/40">
                <Send className="w-3.5 h-3.5" />
                <span>Saluran Rasmi Pembangun</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Hubungi Cikgu Hafreez (Telegram &amp; WhatsApp)
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Ada sebarang pertanyaan berkaitan silibus DSKP, kod akses akaun sekolah/daerah, atau maklum balas penambahbaikan modul e-RPH Pintar? Anda dialu-alukan untuk terus berhubung melalui Telegram atau WhatsApp rasmi.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://t.me/amierulhafreez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#0088cc] to-[#00a2ed] hover:from-[#0077b5] hover:to-[#0091d5] text-white shadow-lg shadow-[#0088cc]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram @amierulhafreez</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                </a>

                <a
                  href="https://wa.me/amierulhafreez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7a6e] text-white shadow-lg shadow-[#25D366]/30 border border-[#25D366]/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>WhatsApp @amierulhafreez</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsFeedbackOpen(true)}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/30 border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MessageSquareHeart className="w-4 h-4 text-white" />
                  <span>Borang Maklum Balas</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/[0.06] backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0088cc] to-[#25D366] flex items-center justify-center text-white font-black text-lg shadow-md shrink-0">
                  CH
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Cikgu Hafreez</h4>
                  <p className="text-xs text-slate-300">Pembangun e-RPH Pintar &amp; Pendidik KSSM</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Telegram Rasmi:</span>
                  <a
                    href="https://t.me/amierulhafreez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#54bbf5] hover:underline inline-flex items-center gap-1"
                  >
                    <span>@amierulhafreez</span>
                    <ExternalLink className="w-3 h-3 text-[#54bbf5]/70" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Pautan WhatsApp:</span>
                  <a
                    href="https://wa.me/amierulhafreez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#25D366] hover:underline inline-flex items-center gap-1"
                  >
                    <span>@amierulhafreez</span>
                    <ExternalLink className="w-3 h-3 text-[#25D366]/70" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Masa Respons:</span>
                  <span className="font-semibold text-slate-200">Pantas (Hari yang sama)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Skop Bantuan:</span>
                  <span className="font-medium text-slate-200">DSKP, Lesen &amp; Maklum Balas</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Apple Minimal Footer */}
      <footer className="relative z-10 border-t border-slate-900/5 bg-white/40 backdrop-blur-md py-6 px-4 sm:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium">
            © {new Date().getFullYear()} e-RPH Pintar. Hak Cipta Terpelihara Cikgu Hafreez.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-600">
            <a href="#rujukan-rasmi" className="hover:text-blue-600 transition-colors">
              Rujukan DSKP &amp; Buku Teks
            </a>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsFeedbackOpen(true)}
              className="hover:text-blue-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <MessageSquareHeart className="w-3 h-3 text-rose-500" />
              <span>Borang Maklum Balas</span>
            </button>
            <span>•</span>
            <a
              href="https://t.me/amierulhafreez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0088cc] hover:underline inline-flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Telegram Cikgu Hafreez</span>
            </a>
            <span>•</span>
            <span>Kementerian Pendidikan Malaysia (KPM)</span>
          </div>
        </div>
      </footer>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  );
};
