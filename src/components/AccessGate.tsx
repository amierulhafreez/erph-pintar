import React, { useState } from 'react';
import {
  User,
  UserProfileDoc,
  LocalLicenseState,
  FREE_TRIAL_LIMIT,
  getUsedTrialCount,
  tebusKodAksesUnik,
} from '../services/firebase';
import {
  MoleculeWatermark,
  LabApparatusWatermark,
  BiologyDnaWatermark,
  PhysicsAtomWatermark,
  BackgroundHexPattern,
} from './ChemistryDecor';
import {
  FlaskConical,
  Atom,
  Dna,
  KeyRound,
  LogIn,
  LogOut,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Sparkles,
  FileDown,
  Layers,
  ShieldAlert,
  ArrowRight,
  Gift,
  ArrowLeft,
  MessageCircle,
  Send,
  QrCode,
  X,
} from 'lucide-react';

interface AccessGateProps {
  currentUser: User | null;
  userProfile: UserProfileDoc | null;
  authNotice?: string | null;
  currentSubjectKey?: string;
  onGoogleLogin: () => Promise<void>;
  onGoogleLogout: () => Promise<void>;
  onStartLocalTrial?: () => void;
  onBackToTrial?: () => void;
  onLicenseActivated: (
    updatedProfile?: UserProfileDoc,
    localLicense?: LocalLicenseState
  ) => void;
}

export const AccessGate: React.FC<AccessGateProps> = ({
  currentUser,
  userProfile,
  authNotice,
  currentSubjectKey = 'kimia',
  onGoogleLogin,
  onGoogleLogout,
  onStartLocalTrial,
  onBackToTrial,
  onLicenseActivated,
}) => {
  const [codeInput, setCodeInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  const usedTrials = getUsedTrialCount(currentUser, userProfile);
  const remainingTrials = Math.max(0, FREE_TRIAL_LIMIT - usedTrials);
  const isTrialExhausted = usedTrials >= FREE_TRIAL_LIMIT;
  const isRevoked = userProfile?.accessStatus === 'revoked';

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!codeInput.trim()) {
      setErrorMsg('Sila masukkan kod akses unik anda terlebih dahulu.');
      return;
    }

    setSubmitting(true);
    try {
      const result = await tebusKodAksesUnik(codeInput, currentSubjectKey);
      if (result.success) {
        setSuccessMsg(result.message);
        setTimeout(() => {
          onLicenseActivated(result.updatedProfile, result.localLicense);
        }, 450);
      } else {
        setErrorMsg(result.message);
      }
    } catch {
      setErrorMsg('Ralat semasa menyemak kod akses. Sila cuba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const isPink = currentSubjectKey === 'biologi';
  const isAmber = currentSubjectKey === 'fizik';
  const isTurquoise = currentSubjectKey === 'sains';
  const subjectDisplay = isPink ? 'Biologi' : isAmber ? 'Fizik' : isTurquoise ? 'Sains' : 'Kimia';

  return (
    <div className={`relative min-h-screen bg-slate-100/80 text-slate-800 flex flex-col justify-between font-sans ${isPink ? 'selection:bg-pink-400 theme-pink' : isAmber ? 'selection:bg-amber-400 theme-amber' : isTurquoise ? 'selection:bg-sky-400 theme-turquoise' : 'selection:bg-emerald-500'} selection:text-white`}>
      <BackgroundHexPattern theme={isPink ? 'pink' : isAmber ? 'amber' : isTurquoise ? 'teal' : 'emerald'} />

      {/* Top Bar */}
      <header className="relative z-20 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {isPink ? (
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c45b7c] via-[#d87190] to-[#e587a3] flex items-center justify-center text-white shadow-sm shadow-pink-300/30">
                <Dna className="w-5 h-5" />
              </div>
            ) : isAmber ? (
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#b26112] via-[#c97523] to-[#d98634] flex items-center justify-center text-white shadow-sm shadow-amber-300/30">
                <Atom className="w-5 h-5" />
              </div>
            ) : isTurquoise ? (
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-sm shadow-sky-400/25">
                <Sparkles className="w-5 h-5" />
              </div>
            ) : (
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm">
                <FlaskConical className="w-5 h-5" />
                <Atom className="w-3.5 h-3.5 text-emerald-200 absolute -top-1 -right-1 bg-emerald-800 rounded-full p-0.5" />
              </div>
            )}
            <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight whitespace-nowrap">
              e-RPH {subjectDisplay} KSSM Pintar{' '}
              <span className={`${isPink ? 'text-pink-700' : isAmber ? 'text-amber-700' : isTurquoise ? 'text-sky-700' : 'text-emerald-700'} font-bold text-sm sm:text-base`}>
                (by Cikgu Hafreez)
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {onBackToTrial && remainingTrials > 0 && !isRevoked && (
              <button
                type="button"
                onClick={onBackToTrial}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                  isPink
                    ? 'bg-pink-50 border-pink-200 text-pink-800 hover:bg-pink-100'
                    : isAmber
                    ? 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                    : isTurquoise
                    ? 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                } border text-xs font-bold transition`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Percubaan ({remainingTrials} Baki)</span>
              </button>
            )}

            {currentUser && (
              <>
                <span className="text-xs text-slate-600 hidden sm:inline font-medium">
                  {currentUser.email}
                </span>
                <button
                  type="button"
                  onClick={onGoogleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition whitespace-nowrap"
                >
                  <LogOut className="w-3.5 h-3.5 text-slate-500" />
                  <span>Log Keluar</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Showcase Panel */}
          <div className={`lg:col-span-7 relative overflow-hidden rounded-2xl ${
            isPink
              ? 'bg-gradient-to-br from-slate-900 via-rose-950 to-pink-950 border-pink-800/40'
              : isAmber
              ? 'bg-gradient-to-br from-slate-900 via-amber-950 to-orange-950 border-amber-800/40'
              : isTurquoise
              ? 'bg-gradient-to-br from-slate-900 via-teal-950 to-cyan-950 border-teal-800/40'
              : 'bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 border-emerald-800/40'
          } text-white p-8 sm:p-10 flex flex-col justify-between border shadow-xl`}>
            {isPink ? (
              <BiologyDnaWatermark className="w-64 h-64 text-white/10 absolute -right-10 -bottom-12" />
            ) : isAmber ? (
              <PhysicsAtomWatermark className="w-64 h-64 text-white/10 absolute -right-10 -bottom-12" />
            ) : isTurquoise ? (
              <MoleculeWatermark className="w-64 h-64 text-white/10 absolute -right-10 -bottom-12" />
            ) : (
              <>
                <MoleculeWatermark className="w-64 h-64 text-white/10 absolute -right-10 -bottom-12" />
                <LabApparatusWatermark className="w-48 h-48 text-white/10 absolute right-8 top-6" />
              </>
            )}

            <div className="relative z-10 space-y-5">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${
                isPink
                  ? 'bg-pink-400/15 border-pink-400/30 text-pink-300'
                  : isAmber
                  ? 'bg-amber-400/15 border-amber-400/30 text-amber-300'
                  : isTurquoise
                  ? 'bg-teal-400/15 border-teal-400/30 text-teal-300'
                  : 'bg-emerald-400/15 border-emerald-400/30 text-emerald-300'
              } border text-xs font-bold tracking-wide`}>
                <Gift className="w-4 h-4 text-amber-300" />
                <span>
                  Cuba Percuma {FREE_TRIAL_LIMIT} Kali Janaan RPH · Tiada Kad Kredit Diperlukan
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug text-white">
                Sediakan RPH {subjectDisplay} KSSM &amp; DLP Lengkap Dalam Masa 30 Saat.
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Dibangunkan khusus oleh <strong>Cikgu Hafreez</strong> untuk
                memudahkan guru-guru {subjectDisplay} SMK &amp; MRSM menjana Rancangan
                Pengajaran Harian mengikut DSKP terkini. Log masuk sekarang untuk mencuba{' '}
                <strong className={isPink ? 'text-pink-300' : isAmber ? 'text-amber-300' : isTurquoise ? 'text-teal-300' : 'text-emerald-300'}>
                  {FREE_TRIAL_LIMIT} kali janaan RPH secara percuma
                </strong>
                !
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className={`flex items-center gap-2 ${isPink ? 'text-pink-300' : isAmber ? 'text-amber-300' : 'text-emerald-300'} font-bold text-xs`}>
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>DSKP Lengkap BM &amp; DLP (T4 &amp; T5)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pilihan dropdown bertingkat (Bab → SK → SP), sokongan berbilang SP, serta Slot Ulangkaji, Gemilang &amp; Mumtaz.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                    <Layers className="w-4 h-4 shrink-0" />
                    <span>Standard KPM, 5E HIKMAH &amp; 1-M/S</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sokongan penuh format Standard KPM, Kerangka 5E Pedagogi HIKMAH MRSM serta pilihan Compact 1 Muka Surat.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>Mod Pantas 30s &amp; Simulasi Digital</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Jana RPH lengkap dalam 30 saat bersama integrasi Simulasi Kimia Cikgu Hafreez, PhET Simulation &amp; Eksperimen Wajib.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                    <FileDown className="w-4 h-4 shrink-0" />
                    <span>Jadual AI, Classroom &amp; OneNote</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Imbas jadual waktu guru, bina RPH berbilang kelas atau seminggu terus, dan hantar ke Google Classroom &amp; OneNote.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
              <span>Percubaan Percuma: {FREE_TRIAL_LIMIT}x Janaan RPH</span>
              <span>·</span>
              <span>Selepas {FREE_TRIAL_LIMIT}x: Kod Akses Unik Individu</span>
            </div>
          </div>

          {/* Right Authentication, Free Trial & Access Code Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-7 sm:p-8 shadow-lg flex flex-col justify-center space-y-6">
            {/* Step 1: Google Sign-In & Free Trial Entry */}
            {!currentUser ? (
              <div className="space-y-3.5 pb-5 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-extrabold mb-1">
                    <Gift className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {remainingTrials > 0
                        ? `PERCUBAAN PERCUMA (${remainingTrials}/${FREE_TRIAL_LIMIT} JANAAN TERSEDIA)`
                        : `PERCUBAAN PERCUMA TELAH TAMAT (${FREE_TRIAL_LIMIT}/${FREE_TRIAL_LIMIT})`}
                    </span>
                  </div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    1. Log Masuk untuk Mencuba Aplikasi
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {remainingTrials > 0
                      ? `Log masuk menggunakan akaun Google anda untuk terus mencuba semua ciri e-RPH Kimia secara percuma sebanyak ${FREE_TRIAL_LIMIT} kali janaan RPH.`
                      : `Anda telah menggunakan kesemua ${FREE_TRIAL_LIMIT} percubaan percuma. Sila log masuk dan masukkan Kod Akses Unik di bawah.`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onGoogleLogin}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <LogIn className="w-4 h-4 text-emerald-400" />
                  <span>
                    {remainingTrials > 0
                      ? `Log Masuk Google & Cuba Percuma (${remainingTrials}x)`
                      : 'Log Masuk dengan Google'}
                  </span>
                </button>

                {authNotice && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed space-y-2">
                    <p>{authNotice}</p>
                    {onStartLocalTrial && remainingTrials > 0 && (
                      <button
                        type="button"
                        onClick={onStartLocalTrial}
                        className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                      >
                        <span>
                          Teruskan Percubaan Percuma Tanpa Popup ({remainingTrials}/{FREE_TRIAL_LIMIT} Baki)
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName || 'Guru'}
                        className="w-9 h-9 rounded-full border border-emerald-300 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {(currentUser.displayName || 'G').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {currentUser.displayName || 'Guru Kimia'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-md shrink-0 border ${
                      isRevoked
                        ? 'text-red-700 bg-red-50 border-red-200'
                        : isTrialExhausted
                        ? 'text-amber-800 bg-amber-50 border-amber-200'
                        : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                    }`}
                  >
                    {isRevoked
                      ? 'Akses Digantung'
                      : isTrialExhausted
                      ? `Percubaan Tamat (${FREE_TRIAL_LIMIT}/${FREE_TRIAL_LIMIT})`
                      : `Baki Percubaan: ${remainingTrials}/${FREE_TRIAL_LIMIT}`}
                  </span>
                </div>

                {/* If user still has free trials left, let them jump right in */}
                {onBackToTrial && remainingTrials > 0 && !isRevoked && (
                  <button
                    type="button"
                    onClick={onBackToTrial}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-xs transition flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4 text-emerald-600" />
                    <span>
                      Teruskan Mencuba Aplikasi (Baki {remainingTrials} daripada {FREE_TRIAL_LIMIT} Percubaan Percuma)
                    </span>
                  </button>
                )}
              </div>
            )}

            {/* Banner when 7 Free Trials are exhausted */}
            {isTrialExhausted && !isRevoked && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1.5">
                <div className="font-extrabold text-sm flex items-center gap-1.5 text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Percubaan Percuma {FREE_TRIAL_LIMIT}/{FREE_TRIAL_LIMIT} Kali Telah Tamat
                  </span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  Terima kasih kerana telah mencuba <strong>{FREE_TRIAL_LIMIT} kali janaan RPH percuma</strong>! Untuk terus menjana dan memuat turun RPH {subjectDisplay} tanpa had, sila dapatkan <strong>Kod Akses Unik</strong> daripada <strong>Cikgu Hafreez</strong> dan masukkan di bawah.
                </p>
              </div>
            )}

            {isRevoked && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">
                    Lesen Akses Anda Telah Dinyahaktifkan
                  </p>
                  <p className="text-red-700 leading-relaxed">
                    Akses bagi akaun ini telah digantung oleh Admin. Sila
                    hubungi Cikgu Hafreez atau masukkan kod akses baharu di
                    bawah.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Unique Access Code Verification */}
            <div className="space-y-4">
              <div className="space-y-1">
                <div className={`flex items-center gap-1.5 ${isPink ? 'text-pink-700' : isAmber ? 'text-amber-700' : 'text-emerald-700'} font-bold text-xs`}>
                  <KeyRound className="w-4 h-4" />
                  <span>
                    {isTrialExhausted
                      ? 'Masukkan Kod Akses Unik Untuk Akses Tanpa Had'
                      : 'Sudah Ada Kod Akses Unik? Aktifkan Di Sini'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Masukkan kod akses unik daripada{' '}
                  <strong>Cikgu Hafreez</strong> untuk membuka akses penuh tanpa had (hanya perlu disahkan sekali sahaja).
                </p>
              </div>

              <form onSubmit={handleRedeem} className="space-y-3.5">
                <div>
                  <input
                    type="text"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                    placeholder={`${currentSubjectKey.toUpperCase()}-XXXXXX`}
                    className={`w-full px-4 py-3 text-base font-mono tabular-nums font-bold tracking-widest uppercase rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 ${isPink ? 'focus:ring-pink-500/20 focus:border-pink-600' : isAmber ? 'focus:ring-amber-500/20 focus:border-amber-600' : 'focus:ring-emerald-500/20 focus:border-emerald-600'} bg-slate-50 text-slate-900 placeholder:text-slate-400`}
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-3 px-5 rounded-xl ${
                    isPink
                      ? 'bg-pink-600 hover:bg-pink-700 shadow-pink-600/20'
                      : isAmber
                      ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
                      : isTurquoise
                      ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20'
                      : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                  } disabled:opacity-60 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md`}
                >
                  <span>
                    {submitting
                      ? 'Mengesahkan Kod Akses...'
                      : 'Sahkan & Aktifkan Akses Tanpa Had'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Contact Cikgu Hafreez to Get Access Code */}
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-extrabold text-slate-800">
                    Belum Ada Kod Akses? Hubungi Cikgu Hafreez:
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Dapatkan Kod Akses Unik anda melalui WhatsApp (Imbas QR) atau mesej terus di Telegram{' '}
                    <span className="font-bold text-slate-700">@amierulhafreez</span>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowQrModal(true)}
                    className="py-2.5 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>WhatsApp / Imbas QR</span>
                  </button>

                  <a
                    href="https://t.me/amierulhafreez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 shrink-0" />
                    <span>Telegram @amierulhafreez</span>
                  </a>
                </div>

                {/* Inline Compact QR Card */}
                <div
                  onClick={() => setShowQrModal(true)}
                  className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3 cursor-pointer hover:bg-emerald-50 transition group"
                >
                  <img
                    src="/assets/aistudio/photo_6289763529942307679_w_11c16b61.jpg"
                    alt="Kod QR WhatsApp Cikgu Amierul Hafreez"
                    className="w-16 h-16 object-cover rounded-lg border border-emerald-300 shadow-2xs shrink-0 bg-white"
                  />
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold text-xs">
                      <QrCode className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Imbas QR WhatsApp Cikgu Hafreez</span>
                    </div>
                    <p className="text-[11px] text-emerald-800/80 leading-snug">
                      Klik untuk besarkan Kod QR WhatsApp rasmi <strong>Amierul Hafreez</strong> bagi mendapatkan kod akses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* WhatsApp QR Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>HUBUNGI CIKGU HAFREEZ</span>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                Imbas Kod QR WhatsApp
              </h3>
              <p className="text-xs text-slate-500">
                Imbas menggunakan kamera WhatsApp anda untuk mendapatkan Kod Akses Unik e-RPH Kimia.
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
              <img
                src="/assets/aistudio/photo_6289763529942307679_w_11c16b61.jpg"
                alt="Kod QR WhatsApp Amierul Hafreez"
                className="w-full max-h-[380px] object-contain"
              />
            </div>

            <div className="space-y-2 pt-1">
              <a
                href="https://t.me/amierulhafreez"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Atau Hubungi di Telegram (@amierulhafreez)</span>
              </a>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-semibold text-slate-700">
            e-RPH Kimia KSSM Pintar (by Cikgu Hafreez)
          </p>
          <p className="text-slate-400">
            Percubaan Percuma {FREE_TRIAL_LIMIT}x Janaan RPH · Sistem Berlesen Individu
          </p>
        </div>
      </footer>
    </div>
  );
};
