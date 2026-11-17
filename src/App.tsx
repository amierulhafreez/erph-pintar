import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubjectConfig, SubjectKey } from './config/subjects';
import {
  RPHData,
  BabKimia,
  StandardKandungan,
  StandardPembelajaran,
  BahasaRPH,
  SubjekRPH,
} from './types/rph';
import {
  ciptaRPHBaruDefault,
  muatSemuaRPH,
  simpanRPH,
  binaRPHDariMultiSp,
} from './utils/rphStorage';
import {
  getDskpByBahasa,
  getTingkatanListBySubjek,
} from './data/dskpKimia';
import {
  auth,
  db,
  doc,
  onSnapshot,
  onAuthStateChanged,
  loginDenganGoogle,
  logKeluar,
  isUserAdmin,
  isUserLicensed,
  isUserFullLicensed,
  FREE_TRIAL_LIMIT,
  getUsedTrialCount,
  getRemainingTrialCount,
  muatLesenTempatan,
  muatSesiPercubaanTempatan,
  simpanSesiPercubaanTempatan,
  LocalLicenseState,
  logAktivitiPenggunaan,
  simpanRPHKeCloud,
  resetKuotaPercubaanAdmin,
  User,
  UserProfileDoc,
} from './services/firebase';
import { WizardHeader } from './components/WizardHeader';
import { Step1Info } from './components/Step1Info';
import { Step2Dskp } from './components/Step2Dskp';
import { Step3Objektif } from './components/Step3Objektif';
import { Step4Aktiviti } from './components/Step4Aktiviti';
import { Step5Elemen } from './components/Step5Elemen';
import { Step6Pratonton } from './components/Step6Pratonton';
import { QuickGeneratorModal } from './components/QuickGeneratorModal';
import { WeeklyRphModal } from './components/WeeklyRphModal';
import { SavedPlansModal } from './components/SavedPlansModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { UserGuideModal } from './components/UserGuideModal';
import { OfficialReferenceModal } from './components/OfficialReferenceModal';
import { FeedbackModal } from './components/FeedbackModal';
import { AccessGate } from './components/AccessGate';
import { BackgroundHexPattern } from './components/ChemistryDecor';
import {
  ShieldCheck,
  CloudCheck,
  KeyRound,
  HelpCircle,
  Gift,
  AlertCircle,
  Send,
  MessageCircle,
  MessageSquareHeart,
  BookOpen,
} from 'lucide-react';

export default function App() {
  const { subjectParam } = useParams<{ subjectParam?: string }>();
  const subjectConfig = getSubjectConfig(subjectParam);
  const activeSubjectKey = subjectConfig.key;
  const currentSubjName = subjectConfig.shortName as SubjekRPH;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [rph, setRph] = useState<RPHData>(() => ciptaRPHBaruDefault(currentSubjName));
  const [savedCount, setSavedCount] = useState<number>(0);

  useEffect(() => {
    document.title = `${subjectConfig.name} - eRPH Pintar STEM`;
  }, [subjectConfig.name]);

  // Firebase Auth & Profile State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileDoc | null>(null);
  const [localLicense, setLocalLicense] = useState<LocalLicenseState | null>(
    () => muatLesenTempatan(activeSubjectKey)
  );
  const [localTrialSession, setLocalTrialSession] = useState<boolean>(() =>
    muatSesiPercubaanTempatan()
  );
  const [showUpgradeGate, setShowUpgradeGate] = useState<boolean>(false);
  const [seventhTrialRphId, setSeventhTrialRphId] = useState<string | null>(
    null
  );
  const [, setTrialTick] = useState<number>(0);
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const countedRphIdsRef = React.useRef<Set<string>>(new Set());

  // Modals
  const [isQuickGenOpen, setIsQuickGenOpen] = useState(false);
  const [isWeeklyGenOpen, setIsWeeklyGenOpen] = useState(false);
  const [isSavedPlansOpen, setIsSavedPlansOpen] = useState(false);
  const [isUserGuideOpen, setIsUserGuideOpen] = useState(false);
  const [isOfficialRefOpen, setIsOfficialRefOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  useEffect(() => {
    setLocalLicense(muatLesenTempatan(activeSubjectKey));
    // Set default subject if matching subject exists
    if (activeSubjectKey === 'biologi' && rph.subjek !== 'Biologi') {
      handleSubjekChange('Biologi');
    } else if (activeSubjectKey === 'fizik' && rph.subjek !== 'Fizik') {
      handleSubjekChange('Fizik');
    } else if (activeSubjectKey === 'kimia' && rph.subjek !== 'Kimia') {
      handleSubjekChange('Kimia');
    } else if (activeSubjectKey === 'sains' && rph.subjek !== 'Sains') {
      handleSubjekChange('Sains');
    } else if (activeSubjectKey === 'matematik' && rph.subjek !== 'Matematik') {
      handleSubjekChange('Matematik');
    } else if (activeSubjectKey === 'matematik-tambahan' && rph.subjek !== 'Matematik Tambahan') {
      handleSubjekChange('Matematik Tambahan');
    }
  }, [activeSubjectKey]);

  // Listen to Firebase Auth state & real-time UserProfile document
  useEffect(() => {
    let unsubProfile: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (unsubProfile) {
        unsubProfile();
        unsubProfile = null;
      }

      if (user) {
        unsubProfile = onSnapshot(
          doc(db, 'users', user.uid),
          (snap) => {
            if (snap.exists()) {
              const prof = snap.data() as UserProfileDoc;
              // Auto-repair trial user whose 5/5 quota was prematurely consumed by the old Step 2 dropdown bug
              const repairKey = `e_rph_step2_quota_repaired_v2_${prof.uid}`;
              if (
                prof.role !== 'admin' &&
                prof.accessStatus !== 'active' &&
                (prof.rphGeneratedCount || 0) > 0 &&
                !localStorage.getItem(repairKey)
              ) {
                localStorage.setItem(repairKey, 'true');
                resetKuotaPercubaanAdmin(prof);
              }
              setUserProfile(prof);
              setRph((prev) => ({
                ...prev,
                info: {
                  ...prev.info,
                  namaGuru:
                    prev.info.namaGuru === 'Cikgu Kimia'
                      ? prof.displayName ||
                        user.displayName ||
                        prev.info.namaGuru
                      : prev.info.namaGuru,
                  namaSekolah:
                    prev.info.namaSekolah === 'SMK Seri Bintang Utama' &&
                    prof.namaSekolah
                      ? prof.namaSekolah
                      : prev.info.namaSekolah,
                },
              }));
            }
            setAuthLoading(false);
          },
          () => {
            setAuthLoading(false);
          }
        );
      } else {
        setUserProfile(null);
        setAuthLoading(false);
      }
    });

    return () => {
      unsubAuth();
      if (unsubProfile) unsubProfile();
    };
  }, []);

  const refreshSavedCount = () => {
    const list = muatSemuaRPH();
    setSavedCount(list.length);
  };

  const handleGoogleLogin = async () => {
    setAuthNotice(null);
    const { profile, errorMessage } = await loginDenganGoogle();
    if (errorMessage) {
      setAuthNotice(errorMessage);
      setShowUpgradeGate(true);
      return;
    }
    if (profile) {
      setUserProfile(profile);
      setRph((prev) => ({
        ...prev,
        info: {
          ...prev.info,
          namaGuru: profile.displayName || prev.info.namaGuru,
          namaSekolah: profile.namaSekolah || prev.info.namaSekolah,
        },
      }));
    }
  };

  const handleGoogleLogout = async () => {
    await logKeluar();
    setUserProfile(null);
    setLocalLicense(null);
    setLocalTrialSession(false);
    setShowUpgradeGate(false);
  };

  const adminStatus = isUserAdmin(currentUser, userProfile, localLicense);
  const fullLicensedStatus = isUserFullLicensed(
    currentUser,
    userProfile,
    localLicense,
    activeSubjectKey
  );
  const usedTrials = getUsedTrialCount(currentUser, userProfile);
  const remainingTrials = getRemainingTrialCount(
    currentUser,
    userProfile,
    localLicense,
    activeSubjectKey
  );

  // Helper to check & record 1 RPH generation attempt
  const checkAndRecordTrialGeneration = (
    details: string,
    generatedRphId: string
  ): boolean => {
    if (fullLicensedStatus) {
      logAktivitiPenggunaan('JANA_RPH', details, rph.info.namaSekolah);
      return true;
    }

    const currentUsed = getUsedTrialCount(currentUser, userProfile);
    if (currentUsed >= FREE_TRIAL_LIMIT) {
      setSeventhTrialRphId(null);
      setShowUpgradeGate(true);
      return false;
    }

    // Allow this generation and increment counter
    const nextUsed = currentUsed + 1;
    if (nextUsed >= FREE_TRIAL_LIMIT) {
      // Allow the user to view/export this 7th RPH before locking on the next action
      setSeventhTrialRphId(generatedRphId);
    }

    logAktivitiPenggunaan('JANA_RPH', details, rph.info.namaSekolah).then(
      (updatedCount) => {
        if (typeof updatedCount === 'number' && userProfile) {
          setUserProfile((prev) =>
            prev ? { ...prev, rphGeneratedCount: updatedCount } : prev
          );
        }
        setTrialTick((t) => t + 1);
      }
    );
    setTrialTick((t) => t + 1);
    return true;
  };

  // Update RPH state
  const handleUpdateRph = (fields: Partial<RPHData>) => {
    setRph((prev) => ({
      ...prev,
      ...fields,
      updatedAt: new Date().toISOString(),
    }));
  };

  const activeSubjek: SubjekRPH =
    activeSubjectKey === 'sains'
      ? 'Sains'
      : activeSubjectKey === 'matematik-tambahan'
      ? 'Matematik Tambahan'
      : (rph.subjek === 'Sains' || rph.info.subjek === 'Sains' || rph.babId?.startsWith('S_'))
      ? 'Sains'
      : activeSubjectKey === 'biologi'
      ? 'Biologi'
      : activeSubjectKey === 'fizik'
      ? 'Fizik'
      : activeSubjectKey === 'matematik'
      ? 'Matematik'
      : 'Kimia';

  // Switch between subjects and load default chapter for current form
  const handleSubjekChange = (newSubjek: SubjekRPH) => {
    // If inside Sains, Matematik, or AddMaths module, user cannot switch to another subject
    if (activeSubjectKey === 'sains' && newSubjek !== 'Sains') {
      return;
    }
    if (activeSubjectKey === 'matematik' && newSubjek !== 'Matematik') {
      return;
    }
    if (activeSubjectKey === 'matematik-tambahan' && newSubjek !== 'Matematik Tambahan') {
      return;
    }
    const validForms = getTingkatanListBySubjek(newSubjek);
    const nextTingkatan = validForms.includes(rph.info.tingkatan)
      ? rph.info.tingkatan
      : 'Tingkatan 4';
    const targetDskp = getDskpByBahasa(rph.bahasa || 'BM', newSubjek);
    const matchingBab =
      targetDskp.find((b) => b.tingkatan === nextTingkatan && !b.isProgramKhas) ||
      targetDskp.find((b) => b.tingkatan === nextTingkatan) ||
      targetDskp[0];
    const matchingSk = matchingBab.skList[0];
    const matchingSp = matchingSk.spList[0];

    const rebuilt = binaRPHDariMultiSp(
      matchingBab,
      matchingSk,
      [matchingSp],
      {
        ...rph.info,
        subjek: newSubjek,
        tingkatan: nextTingkatan,
      },
      rph.modelPdpc,
      rph.bahasa || 'BM',
      rph.isCompact,
      newSubjek
    );
    setRph((prev) => ({
      ...rebuilt,
      id: prev.id,
      elemenAktif: prev.elemenAktif,
    }));
  };

  // Switch between BM and DLP English and translate current DSKP selection
  const handleBahasaChange = (newBahasa: BahasaRPH) => {
    const targetDskp = getDskpByBahasa(newBahasa, activeSubjek);
    const matchingBab =
      targetDskp.find((b) => b.id === rph.babId) ||
      targetDskp.find((b) => b.tingkatan === rph.info.tingkatan) ||
      targetDskp[0];
    const matchingSk =
      matchingBab.skList.find((s) => s.kod === rph.skKod) ||
      matchingBab.skList[0];
    const matchingSps = matchingSk.spList.filter((s) =>
      rph.spKod.includes(s.kod)
    );
    const finalSps =
      matchingSps.length > 0 ? matchingSps : [matchingSk.spList[0]];

    const rebuilt = binaRPHDariMultiSp(
      matchingBab,
      matchingSk,
      finalSps,
      rph.info,
      rph.modelPdpc,
      newBahasa,
      rph.isCompact,
      activeSubjek
    );
    setRph((prev) => ({
      ...rebuilt,
      id: prev.id,
      elemenAktif: prev.elemenAktif,
    }));
  };

  // DSKP selection handler supporting 1 or multiple SPs (NEVER deducts trial quota here)
  const handleUpdateDskp = (
    bab: BabKimia,
    sk: StandardKandungan,
    spArray: StandardPembelajaran[],
    autoFillOthers: boolean,
    overrideBahasa?: BahasaRPH
  ) => {
    const activeBahasa = overrideBahasa || rph.bahasa || 'BM';
    const nextSubjek: SubjekRPH = bab.id.startsWith('S_') ? 'Sains' : activeSubjek;
    if (autoFillOthers) {
      const built = binaRPHDariMultiSp(
        bab,
        sk,
        spArray,
        { ...rph.info, subjek: nextSubjek, tingkatan: bab.tingkatan },
        rph.modelPdpc,
        activeBahasa,
        rph.isCompact,
        nextSubjek
      );
      setRph((prev) => ({
        ...built,
        id: prev.id,
        elemenAktif: prev.elemenAktif,
      }));
      } else {
        const hasExperiment = spArray.some((s) => !!s.eksperimenWajib);
        const expNames = spArray
          .filter((s) => s.namaEksperimen)
          .map((s) => s.namaEksperimen)
          .join(' / ');
        const mergedRadas = Array.from(
          new Set(spArray.flatMap((s) => s.radasBahan || []))
        );
        const isDlp = activeBahasa === 'DLP';

        setRph((prev) => ({
          ...prev,
          bahasa: activeBahasa,
          babId: bab.id,
          babTajuk: bab.isProgramKhas
            ? bab.tajuk
            : `${isDlp ? 'Chapter' : 'Bab'} ${bab.nomborBab}: ${bab.tajuk}`,
          tema: bab.tema,
          skKod: sk.kod,
          skTajuk: sk.tajuk,
          spKod: spArray.map((s) => s.kod),
          spTajuk: spArray.map((s) => s.tajuk),
          isEksperimen: hasExperiment,
          namaEksperimen: expNames || undefined,
          radasBahanEksperimen: mergedRadas,
        }));
      }
    };

    const goToStep = (step: number) => {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Navigate to Step 6 (Pratonton) and record 1 trial generation once per unique RPH ID
    const handleGoToPreviewStep6 = () => {
      if (!countedRphIdsRef.current.has(rph.id)) {
        const allowed = checkAndRecordTrialGeneration(
          `Jana RPH (${rph.bahasa || 'BM'}): ${rph.info.tingkatan} (${rph.info.kelas}) • ${rph.babTajuk} • SP (${rph.spKod.join(', ')})`,
          rph.id
        );
        if (!allowed) return;
        countedRphIdsRef.current.add(rph.id);
      }
      goToStep(6);
    };

    // New RPH reset
    const handleNewRph = () => {
      if (!fullLicensedStatus && usedTrials >= FREE_TRIAL_LIMIT) {
        setSeventhTrialRphId(null);
        setShowUpgradeGate(true);
        return;
      }
      setRph(ciptaRPHBaruDefault());
      setCurrentStep(1);
    };

    // Quick generator apply
    const handleApplyQuickGen = async (newRph: RPHData) => {
      const allowed = checkAndRecordTrialGeneration(
        `Mod Pantas 30s (${newRph.bahasa || 'BM'}): ${newRph.info.tingkatan} • ${newRph.babTajuk} • SP (${newRph.spKod.join(', ')})`,
        newRph.id
      );
      if (!allowed) {
        setIsQuickGenOpen(false);
        return;
      }
      countedRphIdsRef.current.add(newRph.id);
      setRph(newRph);
      simpanRPH(newRph);
      refreshSavedCount();
      setCurrentStep(6);
      if (currentUser) {
        await simpanRPHKeCloud(newRph);
      }
    };

    // Load from library
    const handleLoadSavedRph = (loadedRph: RPHData) => {
      countedRphIdsRef.current.add(loadedRph.id);
      setRph(loadedRph);
      setCurrentStep(6);
    };

  const canAccessApp =
    isUserLicensed(
      currentUser,
      userProfile,
      localLicense,
      localTrialSession,
      activeSubjectKey
    ) ||
    (!fullLicensedStatus &&
      usedTrials === FREE_TRIAL_LIMIT &&
      seventhTrialRphId === rph.id);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mx-auto font-bold text-sm">
            K
          </div>
          <p className="text-xs font-bold text-slate-700">
            Menyemak status akaun &amp; kuota percubaan...
          </p>
        </div>
      </div>
    );
  }

  // Gate application when not logged in, when 7 free trials are exhausted, or when user clicks "Tebus Kod Akses"
  if (!canAccessApp || (showUpgradeGate && !fullLicensedStatus)) {
    return (
      <AccessGate
        currentUser={currentUser}
        userProfile={userProfile}
        authNotice={authNotice}
        currentSubjectKey={activeSubjectKey}
        onGoogleLogin={handleGoogleLogin}
        onGoogleLogout={handleGoogleLogout}
        onStartLocalTrial={() => {
          simpanSesiPercubaanTempatan(true);
          setLocalTrialSession(true);
          setShowUpgradeGate(false);
        }}
        onBackToTrial={
          remainingTrials > 0
            ? () => {
                setShowUpgradeGate(false);
              }
            : undefined
        }
        onLicenseActivated={(updatedProfile, updatedLocalLicense) => {
          if (updatedProfile) setUserProfile(updatedProfile);
          if (updatedLocalLicense) setLocalLicense(updatedLocalLicense);
          setShowUpgradeGate(false);
        }}
      />
    );
  }

  const isPink = activeSubjectKey === 'biologi';
  const isAmber = activeSubjectKey === 'fizik';
  const isTurquoise = activeSubjectKey === 'sains';
  const isIndigo = activeSubjectKey === 'matematik';
  const isCharcoal = activeSubjectKey === 'matematik-tambahan';
  const themeClass = isPink
    ? 'theme-pink'
    : isAmber
    ? 'theme-amber'
    : isTurquoise
    ? 'theme-turquoise'
    : isIndigo
    ? 'theme-indigo'
    : isCharcoal
    ? 'theme-charcoal'
    : '';

  return (
    <div className={`relative min-h-screen liquid-glass-mesh text-slate-800 flex flex-col font-sans ${isPink ? 'selection:bg-pink-400' : isAmber ? 'selection:bg-amber-400' : isTurquoise ? 'selection:bg-sky-400' : isIndigo ? 'selection:bg-indigo-600' : isCharcoal ? 'selection:bg-slate-700' : 'selection:bg-emerald-500'} selection:text-white ${themeClass}`}>
      {/* Subtle non-cluttered background molecular & biological watermark with luminous liquid orbs */}
      <BackgroundHexPattern theme={subjectConfig.themeColor} />

      {/* Wizard Header */}
      <div className="print:hidden relative z-30">
        <WizardHeader
          currentStep={currentStep}
          subjek={activeSubjek}
          subjectTitle={subjectConfig.name}
          portalSubject={activeSubjectKey}
          onSubjekChange={handleSubjekChange}
          onSelectStep={(step) => {
            if (step === 6) {
              handleGoToPreviewStep6();
            } else {
              goToStep(step);
            }
          }}
          onOpenQuickGen={() => {
            if (!fullLicensedStatus && usedTrials >= FREE_TRIAL_LIMIT) {
              setSeventhTrialRphId(null);
              setShowUpgradeGate(true);
              return;
            }
            setIsQuickGenOpen(true);
          }}
          onOpenWeeklyGen={() => {
            if (!fullLicensedStatus && usedTrials >= FREE_TRIAL_LIMIT) {
              setSeventhTrialRphId(null);
              setShowUpgradeGate(true);
              return;
            }
            setIsWeeklyGenOpen(true);
          }}
          onOpenSavedPlans={() => setIsSavedPlansOpen(true)}
          onOpenUserGuide={() => setIsUserGuideOpen(true)}
          onOpenOfficialRef={() => setIsOfficialRefOpen(true)}
          onOpenFeedback={() => setIsFeedbackOpen(true)}
          onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
          savedCount={savedCount}
          currentUser={currentUser}
          isAdmin={adminStatus}
          onGoogleLogin={handleGoogleLogin}
          onGoogleLogout={handleGoogleLogout}
        />
      </div>

      {/* Cloud Auth, Free Trial Counter & License Strip (Hidden on print) */}
      <div className="print:hidden relative z-20 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-[0_2px_12px_rgba(0,0,0,0.02)] px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700 flex-wrap">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-0.5 rounded-full transition"
            >
              ← Portal Semua Subjek
            </Link>
            <span className={`inline-flex items-center gap-1 font-bold ${isPink ? 'text-[#9c3d5d]' : isAmber ? 'text-[#964f11]' : isTurquoise ? 'text-sky-700' : isIndigo ? 'text-indigo-800' : 'text-emerald-700'}`}>
              <CloudCheck className={`w-4 h-4 ${isPink ? 'text-[#c45b7c]' : isAmber ? 'text-[#c97523]' : isTurquoise ? 'text-sky-600' : isIndigo ? 'text-indigo-600' : 'text-emerald-600'}`} />
              <span>Akaun:</span>
            </span>
            <span className="font-semibold">
              {currentUser?.displayName || rph.info.namaGuru || (isPink ? 'Guru Biologi' : activeSubjectKey === 'fizik' ? 'Guru Fizik' : activeSubjectKey === 'sains' ? 'Guru Sains' : activeSubjectKey === 'matematik' ? 'Guru Matematik' : activeSubjectKey === 'matematik-tambahan' ? 'Guru Matematik Tambahan' : 'Guru Kimia')}
            </span>
            {currentUser?.email && (
              <span className="text-slate-400">({currentUser.email})</span>
            )}

            {fullLicensedStatus ? (
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-bold ${isPink ? 'text-[#70263f] bg-[#fdf4f7] border-[#fbcfe0]' : isAmber ? 'text-[#6b3503] bg-[#fefbf6] border-[#fae3cb]' : isTurquoise ? 'text-sky-900 bg-sky-500/10 border-sky-500/20' : isIndigo ? 'text-indigo-950 bg-indigo-50 border-indigo-200' : isCharcoal ? 'text-slate-900 bg-slate-200 border-slate-300' : 'text-emerald-900 bg-emerald-500/10 border-emerald-500/20'} px-3 py-0.5 rounded-full border backdrop-blur-xs`}>
                <KeyRound className={`w-3 h-3 ${isPink ? 'text-[#c45b7c]' : isAmber ? 'text-[#c97523]' : isTurquoise ? 'text-sky-600' : isIndigo ? 'text-indigo-600' : isCharcoal ? 'text-slate-700' : 'text-emerald-600'}`} />
                <span>
                  Lesen Penuh Aktif:{' '}
                  {userProfile?.accessCodeUsed ||
                    localLicense?.code ||
                    (adminStatus ? 'ADMIN' : 'AKTIF')}
                </span>
              </span>
            ) : (
              <div className="inline-flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-0.5 rounded-full border backdrop-blur-xs ${
                    remainingTrials <= 1
                      ? 'bg-amber-500/15 text-amber-950 border-amber-400/40'
                      : 'bg-indigo-500/10 text-indigo-950 border-indigo-300/40'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5 text-indigo-600" />
                  <span>
                    Percubaan Percuma: {Math.min(usedTrials, FREE_TRIAL_LIMIT)} /{' '}
                    {FREE_TRIAL_LIMIT} Janaan RPH Digunakan (Baki{' '}
                    {remainingTrials} Kali)
                  </span>
                </span>

                <button
                  type="button"
                  onClick={() => setShowUpgradeGate(true)}
                  className={`${isPink ? 'apple-btn-pink' : isAmber ? 'apple-btn-amber' : isTurquoise ? 'apple-btn-turquoise' : 'apple-btn-emerald'} inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs cursor-pointer`}
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Masukkan Kod Akses Penuh</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsOfficialRefOpen(true)}
              className="apple-btn-glass inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 px-3 py-1 rounded-full cursor-pointer"
              title="Akses DSKP KPM & Buku Teks Digital AnyFlip"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Rujukan DSKP &amp; Buku Teks</span>
            </button>

            <button
              type="button"
              onClick={() => setIsUserGuideOpen(true)}
              className={`apple-btn-glass inline-flex items-center gap-1.5 text-xs font-bold ${isPink ? 'text-[#70263f]' : isAmber ? 'text-[#6b3503]' : isTurquoise ? 'text-sky-950' : 'text-emerald-950'} px-3.5 py-1 rounded-full cursor-pointer`}
            >
              <HelpCircle className={`w-3.5 h-3.5 ${isPink ? 'text-[#c45b7c]' : isAmber ? 'text-[#c97523]' : isTurquoise ? 'text-sky-600' : 'text-emerald-600'}`} />
              <span>Bantuan &amp; Panduan Pengguna</span>
            </button>

            {adminStatus && (
              <button
                type="button"
                onClick={() => setIsAdminDashboardOpen(true)}
                className="apple-btn-purple inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1 rounded-full shadow-xs cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  Papan Pemuka Admin (Jana Kod Akses Unik &amp; Rekod Pengguna)
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Notice when user is viewing their 7th (final) Free Trial RPH */}
        {!fullLicensedStatus && usedTrials >= FREE_TRIAL_LIMIT && (
          <div className="max-w-7xl mx-auto mt-2 p-3 rounded-2xl glass-card border-amber-300/60 bg-amber-50/70 text-amber-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Ini adalah janaan RPH percubaan terakhir anda ({FREE_TRIAL_LIMIT}/{FREE_TRIAL_LIMIT}).</strong>{' '}
                Anda masih boleh mencetak atau memuat turun RPH ini sekarang. Untuk menjana RPH seterusnya, sila aktifkan Kod Akses Unik anda.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowUpgradeGate(true)}
              className="apple-btn-amber px-4 py-1.5 rounded-full text-white font-extrabold text-xs shrink-0 self-start sm:self-auto cursor-pointer"
            >
              Aktifkan Kod Akses Sekarang
            </button>
          </div>
        )}
      </div>

      {/* Main Body */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 print:p-0">
        {currentStep === 1 && (
          <Step1Info
            info={rph.info}
            subjek={activeSubjek}
            portalSubject={activeSubjectKey}
            modelPdpc={rph.modelPdpc}
            bahasa={rph.bahasa || 'BM'}
            isCompact={!!rph.isCompact}
            onSubjekChange={handleSubjekChange}
            onModelChange={(modelPdpc) => handleUpdateRph({ modelPdpc })}
            onBahasaChange={handleBahasaChange}
            onCompactChange={(isCompact) => handleUpdateRph({ isCompact })}
            onOpenWeeklyModal={() => setIsWeeklyGenOpen(true)}
            onOpenUserGuide={() => setIsUserGuideOpen(true)}
            onChange={(info) => handleUpdateRph({ info })}
            onNext={() => goToStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2Dskp
            rph={rph}
            portalSubject={activeSubjectKey}
            onUpdateDskp={handleUpdateDskp}
            onBahasaChange={(bahasa) => handleUpdateRph({ bahasa })}
            onSubjekChange={handleSubjekChange}
            onOpenUserGuide={() => setIsUserGuideOpen(true)}
            onPrev={() => goToStep(1)}
            onNext={() => goToStep(3)}
          />
        )}

        {currentStep === 3 && (
          <Step3Objektif
            rph={rph}
            portalSubject={activeSubjectKey}
            onChange={handleUpdateRph}
            onPrev={() => goToStep(2)}
            onNext={() => goToStep(4)}
          />
        )}

        {currentStep === 4 && (
          <Step4Aktiviti
            rph={rph}
            portalSubject={activeSubjectKey}
            onChange={handleUpdateRph}
            onPrev={() => goToStep(3)}
            onNext={() => goToStep(5)}
          />
        )}

        {currentStep === 5 && (
          <Step5Elemen
            rph={rph}
            portalSubject={activeSubjectKey}
            onChange={handleUpdateRph}
            onPrev={() => goToStep(4)}
            onNext={handleGoToPreviewStep6}
          />
        )}

        {currentStep === 6 && (
          <Step6Pratonton
            rph={rph}
            portalSubject={activeSubjectKey}
            onUpdateRph={handleUpdateRph}
            onEditStep={(step) => goToStep(step)}
            onNewRph={handleNewRph}
          />
        )}
      </main>

      {/* Footer (hidden on print) */}
      <footer className="relative z-10 print:hidden bg-white/90 backdrop-blur-md border-t border-slate-200/80 py-4 mt-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold text-slate-700">
            {subjectConfig.name} (by Cikgu Hafreez) · Menepati DSKP KPM
            (BM &amp; DLP English) &amp; Pedagogi HIKMAH MRSM
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setIsOfficialRefOpen(true)}
              className="text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3 h-3" />
              <span>Rujukan DSKP &amp; Buku Teks</span>
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setIsFeedbackOpen(true)}
              className="text-rose-600 hover:underline inline-flex items-center gap-1 cursor-pointer font-medium"
            >
              <MessageSquareHeart className="w-3 h-3" />
              <span>Maklum Balas</span>
            </button>
            <span>·</span>
            <a
              href="https://t.me/amierulhafreez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0088cc] hover:underline inline-flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Telegram Cikgu Hafreez</span>
            </a>
            <span>·</span>
            <a
              href="https://wa.me/amierulhafreez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp @amierulhafreez</span>
            </a>
            <span>·</span>
            <span>{subjectConfig.formsLabel} SPM</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <QuickGeneratorModal
        isOpen={isQuickGenOpen}
        onClose={() => setIsQuickGenOpen(false)}
        onApplyRph={handleApplyQuickGen}
        currentInfo={rph.info}
        currentSubjek={activeSubjek}
        portalSubject={activeSubjectKey}
        currentModelPdpc={rph.modelPdpc}
        currentBahasa={rph.bahasa}
        currentCompact={rph.isCompact}
      />

      <WeeklyRphModal
        isOpen={isWeeklyGenOpen}
        onClose={() => setIsWeeklyGenOpen(false)}
        baseRph={rph}
        portalSubject={activeSubjectKey}
        onInspectRph={(selectedRph) => {
          countedRphIdsRef.current.add(selectedRph.id);
          setRph(selectedRph);
          setCurrentStep(6);
        }}
        onSavedBatch={refreshSavedCount}
      />

      <SavedPlansModal
        isOpen={isSavedPlansOpen}
        onClose={() => setIsSavedPlansOpen(false)}
        onLoadRph={handleLoadSavedRph}
        onPlansUpdated={refreshSavedCount}
      />

      <UserGuideModal
        isOpen={isUserGuideOpen}
        onClose={() => setIsUserGuideOpen(false)}
        portalSubject={activeSubjectKey}
        onSelectStep={(step) => {
          if (step === 6) {
            handleGoToPreviewStep6();
          } else {
            goToStep(step);
          }
        }}
        onOpenQuickGen={() => setIsQuickGenOpen(true)}
        onOpenWeeklyGen={() => setIsWeeklyGenOpen(true)}
      />

      <OfficialReferenceModal
        isOpen={isOfficialRefOpen}
        onClose={() => setIsOfficialRefOpen(false)}
        defaultSubjectKey={activeSubjectKey}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        defaultNama={currentUser?.displayName || rph.info.namaGuru}
        defaultSekolah={rph.info.sekolah}
        defaultSubjek={activeSubjek}
      />

      {adminStatus && (
        <AdminDashboardModal
          isOpen={isAdminDashboardOpen}
          onClose={() => setIsAdminDashboardOpen(false)}
          onInspectRph={(inspectedRph) => {
            countedRphIdsRef.current.add(inspectedRph.id);
            setRph(inspectedRph);
            setCurrentStep(6);
          }}
        />
      )}
    </div>
  );
}
