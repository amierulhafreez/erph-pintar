import { initializeApp } from '@firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from '@firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  getDocFromServer,
} from '@firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { RPHData } from '../types/rph';
import { muatProfilGuru, simpanProfilGuru } from '../utils/rphStorage';
import { SENARAI_KELAS_DEFAULT } from '../data/pedagogiData';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const SCOPES = [
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.courseworkmaterials',
  'https://www.googleapis.com/auth/classroom.announcements',
];
SCOPES.forEach((scope) => googleProvider.addScope(scope));

// Cache Google OAuth access token in memory ONLY (never in localStorage/sessionStorage)
let cachedAccessToken: string | null = null;

export function getGoogleClassroomAccessToken(): string | null {
  return cachedAccessToken;
}

export async function connectGoogleClassroomToken(): Promise<string | null> {
  if (cachedAccessToken) return cachedAccessToken;
  try {
    googleProvider.setCustomParameters({ prompt: 'consent' });
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential?.accessToken) {
      cachedAccessToken = credential.accessToken;
      return cachedAccessToken;
    }
  } catch {
    // Popup closed or blocked
  }
  return null;
}

export const ADMIN_EMAILS = [
  'amierulhafreez@gmail.com',
  'AmierulHafreez@gmail.com',
];

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData.map((provider) => ({
          providerId: provider.providerId,
          displayName: provider.displayName,
          email: provider.email,
          photoUrl: provider.photoURL,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection to Firestore on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('the client is offline')
    ) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

export interface UserProfileDoc {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  namaSekolah?: string;
  role: 'teacher' | 'admin';
  accessStatus?: 'pending' | 'active' | 'revoked';
  accessCodeUsed?: string;
  licensedSubjects?: Record<string, {
    isActive: boolean;
    codeUsed?: string;
    activatedAt: string;
  }>;
  loginCount: number;
  rphGeneratedCount: number;
  lastLoginAt: string;
  createdAt: string;
}

export interface AccessCodeDoc {
  code: string;
  subject?: string; // 'kimia' | 'biologi' | 'fizik' | 'sains' | 'all'
  status: 'unused' | 'active' | 'revoked';
  note: string;
  redeemedByUid?: string;
  redeemedByEmail?: string;
  redeemedByName?: string;
  createdAt: string;
  redeemedAt?: string;
}

export interface SavedRphDoc {
  id: string;
  ownerId: string;
  ownerEmail: string;
  ownerName: string;
  namaSekolah: string;
  tingkatan: string;
  kelas: string;
  babTajuk: string;
  skKod: string;
  spKodList: string;
  modelPdpc: string;
  tarikh: string;
  rphJson: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsageLogDoc {
  id?: string;
  uid: string;
  email: string;
  displayName: string;
  namaSekolah?: string;
  action:
    | 'LOGIN'
    | 'AKTIFKAN_KOD'
    | 'JANA_RPH'
    | 'SIMPAN_RPH'
    | 'MUAT_TURUN_WORD'
    | 'MUAT_TURUN_PDF'
    | 'MUAT_TURUN_SPREADSHEET'
    | 'GUNA_AI';
  details: string;
  createdAt: string;
}

const LOCAL_LICENSE_STORAGE_KEY = 'e_rph_kimia_verified_license_v1';
const LOCAL_TRIAL_COUNT_KEY_PREFIX = 'e_rph_kimia_trial_used_v2_';
const LOCAL_TRIAL_SESSION_KEY = 'e_rph_kimia_trial_session_v1';
export const MASTER_ADMIN_CODE = 'ADMIN-HAFREEZ';
export const FREE_TRIAL_LIMIT = 5;

export interface LocalLicenseState {
  code: string;
  isAdmin: boolean;
  activatedAt: string;
  subject?: string;
}

export function getLocalLicenseKey(subject?: string): string {
  if (!subject || subject === 'kimia') return LOCAL_LICENSE_STORAGE_KEY;
  return `e_rph_${subject.toLowerCase()}_verified_license_v1`;
}

export function muatLesenTempatan(subject?: string): LocalLicenseState | null {
  try {
    const key = getLocalLicenseKey(subject);
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as LocalLicenseState;
    // Fallback: check legacy general license
    if (subject && subject !== 'kimia') {
      const legRaw = localStorage.getItem(LOCAL_LICENSE_STORAGE_KEY);
      if (legRaw) {
        const leg = JSON.parse(legRaw) as LocalLicenseState;
        if (leg.isAdmin) return leg;
      }
    }
  } catch {
    // ignore storage read error
  }
  return null;
}

export function simpanLesenTempatan(state: LocalLicenseState | null, subject?: string) {
  try {
    const key = getLocalLicenseKey(subject || state?.subject);
    if (!state) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(state));
    }
  } catch {
    // ignore storage write error
  }
}

export function muatSesiPercubaanTempatan(): boolean {
  try {
    return localStorage.getItem(LOCAL_TRIAL_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export function simpanSesiPercubaanTempatan(active: boolean) {
  try {
    if (active) {
      localStorage.setItem(LOCAL_TRIAL_SESSION_KEY, 'true');
    } else {
      localStorage.removeItem(LOCAL_TRIAL_SESSION_KEY);
    }
  } catch {
    // ignore
  }
}

export function getLocalTrialCount(uid?: string | null): number {
  try {
    const userKey = `${LOCAL_TRIAL_COUNT_KEY_PREFIX}${uid || 'guest'}`;
    const guestKey = `${LOCAL_TRIAL_COUNT_KEY_PREFIX}guest`;
    const uVal = parseInt(localStorage.getItem(userKey) || '0', 10);
    const gVal = parseInt(localStorage.getItem(guestKey) || '0', 10);
    return Math.max(
      Number.isNaN(uVal) ? 0 : uVal,
      uid ? 0 : Number.isNaN(gVal) ? 0 : gVal
    );
  } catch {
    return 0;
  }
}

export function setLocalTrialCount(uid: string | null | undefined, count: number) {
  try {
    const userKey = `${LOCAL_TRIAL_COUNT_KEY_PREFIX}${uid || 'guest'}`;
    localStorage.setItem(userKey, String(Math.max(0, count)));
  } catch {
    // ignore
  }
}

export function isUserAdmin(
  user: User | null,
  profile?: UserProfileDoc | null,
  localLicense?: LocalLicenseState | null
): boolean {
  if (localLicense?.isAdmin) return true;
  if (!user) return false;
  if (
    user.email &&
    ADMIN_EMAILS.some((e) => e.toLowerCase() === user.email?.toLowerCase())
  ) {
    return true;
  }
  return profile?.role === 'admin';
}

/**
 * Returns true ONLY if the user has full unlimited access (Admin or redeemed unique Access Code).
 */
export function isUserFullLicensed(
  user: User | null,
  profile: UserProfileDoc | null,
  localLicense?: LocalLicenseState | null,
  subject?: string
): boolean {
  if (isUserAdmin(user, profile, localLicense)) return true;
  if (profile?.accessStatus === 'revoked') return false;

  const targetSubject = (subject || 'kimia').toLowerCase();

  // If user is accessing Sains: active license for Kimia, Biologi, or Fizik also grants access to Sains!
  if (targetSubject === 'sains') {
    if (
      profile?.licensedSubjects?.sains?.isActive ||
      profile?.licensedSubjects?.kimia?.isActive ||
      profile?.licensedSubjects?.biologi?.isActive ||
      profile?.licensedSubjects?.fizik?.isActive ||
      profile?.accessStatus === 'active' // legacy Kimia license
    ) {
      return true;
    }

    if (localLicense && localLicense.code) {
      const lSubj = (localLicense.subject || 'kimia').toLowerCase();
      if (['sains', 'kimia', 'biologi', 'fizik', 'all'].includes(lSubj)) {
        return true;
      }
    }
    return false;
  }

  // Check subject-specific license in Firestore profile
  if (profile?.licensedSubjects?.[targetSubject]?.isActive) return true;

  // Legacy global license for kimia if accessStatus is active
  if (targetSubject === 'kimia' && profile?.accessStatus === 'active') return true;

  // Local device license check
  if (localLicense && localLicense.code) {
    if (!localLicense.subject || localLicense.subject === 'all' || localLicense.subject.toLowerCase() === targetSubject) {
      return true;
    }
  }

  return false;
}

/**
 * Returns how many RPH trial generations the user has used so far.
 */
export function getUsedTrialCount(
  user: User | null,
  profile: UserProfileDoc | null
): number {
  const cloudCount = profile?.rphGeneratedCount || 0;
  const localCount = getLocalTrialCount(user?.uid || profile?.uid);
  return Math.max(cloudCount, localCount);
}

/**
 * Returns how many free RPH generations remain (0 to 7, or Infinity if full licensed).
 */
export function getRemainingTrialCount(
  user: User | null,
  profile: UserProfileDoc | null,
  localLicense?: LocalLicenseState | null,
  subject?: string
): number {
  if (isUserFullLicensed(user, profile, localLicense, subject)) return Infinity;
  if (profile?.accessStatus === 'revoked') return 0;
  const used = getUsedTrialCount(user, profile);
  return Math.max(0, FREE_TRIAL_LIMIT - used);
}

/**
 * Returns true if the user can currently access the app (either Full Licensed OR logged-in with remaining Free Trial quota > 0).
 */
export function isUserLicensed(
  user: User | null,
  profile: UserProfileDoc | null,
  localLicense?: LocalLicenseState | null,
  localTrialSessionActive?: boolean,
  subject?: string
): boolean {
  if (isUserFullLicensed(user, profile, localLicense, subject)) return true;
  if (profile?.accessStatus === 'revoked') return false;
  const hasLoggedInOrStartedTrial = !!user || !!localTrialSessionActive;
  if (!hasLoggedInOrStartedTrial) return false;
  return getRemainingTrialCount(user, profile, localLicense, subject) > 0;
}

export async function loginDenganGoogle(): Promise<{
  profile: UserProfileDoc | null;
  errorMessage?: string;
}> {
  let user: User | null = null;
  try {
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential?.accessToken) {
      cachedAccessToken = credential.accessToken;
    }
    user = result.user;
  } catch (err: any) {
    const code = err?.code || '';
    const message = err?.message || '';
    if (code === 'auth/unauthorized-domain' || message.toLowerCase().includes('unauthorized')) {
      return {
        profile: null,
        errorMessage:
          'Domain aplikasi (localhost) belum didaftarkan dalam senarai Authorized Domains Firebase Authentication. Untuk log masuk serta-merta, sila masukkan Kod Akses Admin (ADMIN-HAFREEZ) di bawah, atau tambahkan "localhost" di Firebase Console > Authentication > Settings > Authorized Domains.',
      };
    }
    if (
      code === 'auth/popup-closed-by-user' ||
      code === 'auth/cancelled-popup-request'
    ) {
      return {
        profile: null,
        errorMessage:
          'Tetingkap log masuk Google telah ditutup. Sekiranya popup memaparkan "The requested action is invalid", ini kerana domain localhost belum didaftarkan di Firebase Console. Sila gunakan Kod Akses Admin (ADMIN-HAFREEZ) di bawah untuk akses penuh serta-merta.',
      };
    }
    if (code === 'auth/popup-blocked') {
      return {
        profile: null,
        errorMessage:
          'Pelayar anda menyekat tetingkap popup Google. Sila benarkan popup atau masukkan Kod Akses Unik anda secara terus di bawah.',
      };
    }
    return {
      profile: null,
      errorMessage:
        'Log masuk Google tidak dapat dilengkapkan pada pelayar ini. Anda boleh terus memasukkan Kod Akses Unik (cth: ADMIN-HAFREEZ) di bawah.',
    };
  }

  if (!user || !user.email) {
    return { profile: null };
  }

  const userPath = `users/${user.uid}`;
  const userRef = doc(db, 'users', user.uid);
  const nowIso = new Date().toISOString();
  const localProfil = muatProfilGuru();
  const localLicense = muatLesenTempatan();
  const isOwnerAdmin = ADMIN_EMAILS.some(
    (e) => e.toLowerCase() === user.email?.toLowerCase()
  );

  try {
    const snap = await getDoc(userRef);
    let profileData: UserProfileDoc;

    if (snap.exists()) {
      const existing = snap.data() as UserProfileDoc;
      const role: 'teacher' | 'admin' = isOwnerAdmin ? 'admin' : existing.role;
      const accessStatus: 'pending' | 'active' | 'revoked' = isOwnerAdmin
        ? 'active'
        : existing.accessStatus === 'revoked'
        ? 'revoked'
        : existing.accessStatus === 'active' || !!localLicense?.code
        ? 'active'
        : 'pending';

      const updatedProfile: UserProfileDoc = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || existing.displayName || 'Guru Kimia',
        photoURL: user.photoURL || existing.photoURL || '',
        namaSekolah:
          existing.namaSekolah || localProfil.namaSekolah || 'SMK / MRSM',
        role,
        accessStatus,
        ...(existing.accessCodeUsed || localLicense?.code
          ? { accessCodeUsed: existing.accessCodeUsed || localLicense?.code }
          : {}),
        loginCount: (existing.loginCount || 0) + 1,
        rphGeneratedCount: existing.rphGeneratedCount || 0,
        lastLoginAt: nowIso,
        createdAt: existing.createdAt || nowIso,
      };
      await setDoc(userRef, updatedProfile);
      profileData = updatedProfile;
    } else {
      const newProfile: UserProfileDoc = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || localProfil.namaGuru || 'Guru Kimia',
        photoURL: user.photoURL || '',
        namaSekolah: localProfil.namaSekolah || 'SMK / MRSM',
        role: isOwnerAdmin ? 'admin' : 'teacher',
        accessStatus: isOwnerAdmin || !!localLicense?.code ? 'active' : 'pending',
        ...(localLicense?.code ? { accessCodeUsed: localLicense.code } : {}),
        loginCount: 1,
        rphGeneratedCount: 0,
        lastLoginAt: nowIso,
        createdAt: nowIso,
      };
      await setDoc(userRef, newProfile);
      profileData = newProfile;
    }

    if (
      user.displayName &&
      (localProfil.namaGuru === 'Cikgu Kimia' || !localProfil.namaGuru)
    ) {
      simpanProfilGuru({
        namaGuru: user.displayName,
        namaSekolah: profileData.namaSekolah || localProfil.namaSekolah,
        kelasKegemaran: SENARAI_KELAS_DEFAULT,
      });
    }

    await logAktivitiPenggunaan(
      'LOGIN',
      `Log masuk berjaya melalui Google (${user.email})`,
      profileData.namaSekolah
    );

    return { profile: profileData };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, userPath);
    return { profile: null };
  }
}

export async function logKeluar(): Promise<void> {
  cachedAccessToken = null;
  simpanLesenTempatan(null);
  simpanSesiPercubaanTempatan(false);
  await signOut(auth);
}

/**
 * Redeem a unique 1-to-1 access code for the user (supports both Google-authenticated and direct code verification)
 */
export async function tebusKodAksesUnik(
  rawCode: string,
  currentSubject?: string
): Promise<{
  success: boolean;
  message: string;
  updatedProfile?: UserProfileDoc;
  localLicense?: LocalLicenseState;
}> {
  const normalizedCode = rawCode.trim().toUpperCase();
  if (normalizedCode.length < 3) {
    return {
      success: false,
      message: 'Sila masukkan kod akses yang lengkap.',
    };
  }

  // Master Admin Code shortcut for owner Cikgu Hafreez if popup is blocked
  if (normalizedCode === MASTER_ADMIN_CODE) {
    const adminLic: LocalLicenseState = {
      code: MASTER_ADMIN_CODE,
      isAdmin: true,
      activatedAt: new Date().toISOString(),
      subject: 'all',
    };
    simpanLesenTempatan(adminLic);
    return {
      success: true,
      message: 'Akses Penuh Admin (Cikgu Hafreez) telah diaktifkan!',
      localLicense: adminLic,
    };
  }

  const user = auth.currentUser;
  const codePath = `access_codes/${normalizedCode}`;
  const codeRef = doc(db, 'access_codes', normalizedCode);

  try {
    const codeSnap = await getDoc(codeRef);
    if (!codeSnap.exists()) {
      return {
        success: false,
        message:
          'Kod akses tidak ditemui atau tidak sah. Sila pastikan ejaan huruf besar/nombor tepat seperti yang diberikan oleh Cikgu Hafreez.',
      };
    }

    const codeData = codeSnap.data() as AccessCodeDoc;

    if (codeData.status === 'revoked') {
      return {
        success: false,
        message:
          'Kod akses ini telah dinyahaktifkan oleh Admin. Sila hubungi Cikgu Hafreez untuk bantuan lanjut.',
      };
    }

    // Determine target subject for the code
    const codeSubject = (
      codeData.subject ||
      (codeData.code.startsWith('BIO') ? 'biologi' :
       codeData.code.startsWith('KIMIA') ? 'kimia' :
       codeData.code.startsWith('FIZIK') ? 'fizik' :
       codeData.code.startsWith('SAINS') ? 'sains' : 'kimia')
    ).toLowerCase();

    // Subject mismatch check if user is on a specific subject portal
    const activePortalSubjek = (currentSubject || '').toLowerCase();
    if (activePortalSubjek && codeSubject !== 'all' && codeSubject !== activePortalSubjek) {
      return {
        success: false,
        message: `Kod akses ini adalah khusus untuk modul ${codeSubject.toUpperCase()}. Sila tebus di portal /${codeSubject}.`,
      };
    }

    if (
      codeData.status === 'active' &&
      codeData.redeemedByUid &&
      user &&
      codeData.redeemedByUid !== user.uid
    ) {
      return {
        success: false,
        message:
          'Kod akses ini telah pun ditebus oleh akaun Google yang lain. Setiap kod akses adalah unik untuk 1 individu sahaja.',
      };
    }

    if (
      codeData.status === 'active' &&
      !user &&
      codeData.redeemedByUid &&
      codeData.redeemedByUid !== 'local_device_user'
    ) {
      return {
        success: false,
        message:
          'Kod akses ini telah ditebus oleh pengguna lain. Sila log masuk dengan akaun Google yang berdaftar atau gunakan kod baharu.',
      };
    }

    const nowIso = new Date().toISOString();
    const localProfil = muatProfilGuru();

    // Mark the code as active in Firestore
    if (codeData.status === 'unused') {
      const updatedCodeDoc: AccessCodeDoc = {
        code: codeData.code,
        subject: codeSubject,
        status: 'active',
        note: codeData.note,
        redeemedByUid: user?.uid || 'local_device_user',
        redeemedByEmail: user?.email || 'pengguna@sekolah.edu.my',
        redeemedByName:
          user?.displayName || localProfil.namaGuru || 'Guru Cemerlang',
        createdAt: codeData.createdAt,
        redeemedAt: nowIso,
      };
      await setDoc(codeRef, updatedCodeDoc);
    }

    const licState: LocalLicenseState = {
      code: normalizedCode,
      isAdmin: false,
      activatedAt: nowIso,
      subject: codeSubject,
    };
    simpanLesenTempatan(licState, codeSubject);

    if (user && user.email) {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      let updatedProfile: UserProfileDoc;
      if (userSnap.exists()) {
        const existing = userSnap.data() as UserProfileDoc;
        const licensedSubjects = existing.licensedSubjects || {};
        licensedSubjects[codeSubject] = {
          isActive: true,
          codeUsed: normalizedCode,
          activatedAt: nowIso,
        };
        updatedProfile = {
          ...existing,
          accessStatus: 'active',
          accessCodeUsed: normalizedCode,
          licensedSubjects,
        };
      } else {
        updatedProfile = {
          uid: user.uid,
          email: user.email,
          displayName:
            user.displayName || localProfil.namaGuru || 'Guru Cemerlang',
          photoURL: user.photoURL || '',
          namaSekolah: localProfil.namaSekolah || 'SMK / MRSM',
          role: 'teacher',
          accessStatus: 'active',
          accessCodeUsed: normalizedCode,
          licensedSubjects: {
            [codeSubject]: {
              isActive: true,
              codeUsed: normalizedCode,
              activatedAt: nowIso,
            },
          },
          loginCount: 1,
          rphGeneratedCount: 0,
          lastLoginAt: nowIso,
          createdAt: nowIso,
        };
      }

      await setDoc(userRef, updatedProfile);
      await logAktivitiPenggunaan(
        'AKTIFKAN_KOD',
        `Mengaktifkan Kod Akses Modul ${codeSubject.toUpperCase()}: ${normalizedCode}`,
        updatedProfile.namaSekolah
      );

      return {
        success: true,
        message: `Tahniah! Kod akses modul ${codeSubject.toUpperCase()} berjaya diaktifkan dan akaun anda dibuka tanpa had.`,
        updatedProfile,
        localLicense: licState,
      };
    }

    return {
      success: true,
      message: `Tahniah! Kod akses modul ${codeSubject.toUpperCase()} sah dan aplikasi kini dibuka sepenuhnya pada peranti ini.`,
      localLicense: licState,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, codePath);
    return {
      success: false,
      message: 'Ralat semasa mengesahkan kod akses. Sila cuba sebentar lagi.',
    };
  }
}

/**
 * Admin: Generate 1 or multiple unique access codes
 */
export async function janaKodAksesAdmin(
  note: string,
  count: number = 1,
  customCode?: string,
  subject: string = 'kimia'
): Promise<string[]> {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const generatedCodes: string[] = [];
  const nowIso = new Date().toISOString();
  const targetSubj = subject.toLowerCase();
  const prefix = targetSubj === 'biologi' ? 'BIO' :
                 targetSubj === 'fizik' ? 'FIZIK' :
                 targetSubj === 'sains' ? 'SAINS' :
                 targetSubj === 'matematik' ? 'MATH' :
                 targetSubj === 'matematik-tambahan' ? 'ADDMATH' : 'KIMIA';

  const cleanNote = (note || `Lesen Individu e-RPH ${prefix}`).slice(0, 280);

  for (let i = 0; i < count; i++) {
    let codeStr = '';
    if (customCode && customCode.trim() && count === 1) {
      codeStr = customCode
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9_-]/g, '');
    } else {
      let rand = '';
      for (let j = 0; j < 6; j++) {
        rand += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      codeStr = `${prefix}-${rand}`;
    }

    const payload: AccessCodeDoc = {
      code: codeStr,
      subject: targetSubj,
      status: 'unused',
      note: cleanNote,
      createdAt: nowIso,
    };

    try {
      await setDoc(doc(db, 'access_codes', codeStr), payload);
      generatedCodes.push(codeStr);
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.CREATE,
        `access_codes/${codeStr}`
      );
    }
  }

  return generatedCodes;
}

/**
 * Admin: Toggle code status (active/unused <-> revoked) and sync bound user's accessStatus
 */
export async function tukarStatusKodAdmin(
  codeDoc: AccessCodeDoc,
  newStatus: 'unused' | 'active' | 'revoked'
): Promise<void> {
  const codePath = `access_codes/${codeDoc.code}`;
  try {
    const updatedCode: AccessCodeDoc = {
      ...codeDoc,
      status: newStatus,
    };
    await setDoc(doc(db, 'access_codes', codeDoc.code), updatedCode);

    // Also update the bound user's accessStatus if this code was redeemed by a user
    if (codeDoc.redeemedByUid) {
      const userRef = doc(db, 'users', codeDoc.redeemedByUid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const uData = userSnap.data() as UserProfileDoc;
        await setDoc(userRef, {
          ...uData,
          accessStatus: newStatus === 'revoked' ? 'revoked' : 'active',
        });
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, codePath);
  }
}

/**
 * Admin: Delete an access code document
 */
export async function padamKodAksesAdmin(code: string): Promise<void> {
  const codePath = `access_codes/${code}`;
  try {
    await deleteDoc(doc(db, 'access_codes', code));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, codePath);
  }
}

/**
 * Admin: Directly grant or revoke access on a UserProfileDoc
 */
export async function tukarStatusAksesPenggunaAdmin(
  targetUser: UserProfileDoc,
  newAccessStatus: 'active' | 'revoked' | 'pending'
): Promise<void> {
  const userPath = `users/${targetUser.uid}`;
  try {
    await setDoc(doc(db, 'users', targetUser.uid), {
      ...targetUser,
      accessStatus: newAccessStatus,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, userPath);
  }
}

/**
 * Admin or self-healing: Reset a user's RPH generated trial count to 0
 */
export async function resetKuotaPercubaanAdmin(
  targetUser: UserProfileDoc
): Promise<void> {
  const userPath = `users/${targetUser.uid}`;
  try {
    setLocalTrialCount(targetUser.uid, 0);
    await setDoc(doc(db, 'users', targetUser.uid), {
      ...targetUser,
      rphGeneratedCount: 0,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, userPath);
  }
}

export async function kemasKiniSekolahPengguna(
  uid: string,
  namaGuru: string,
  namaSekolah: string
): Promise<void> {
  const userPath = `users/${uid}`;
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const existing = snap.data() as UserProfileDoc;
      await setDoc(userRef, {
        ...existing,
        displayName: namaGuru.trim() || existing.displayName,
        namaSekolah: namaSekolah.trim() || existing.namaSekolah || '',
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, userPath);
  }
}

export async function logAktivitiPenggunaan(
  action: UsageLogDoc['action'],
  details: string,
  namaSekolahOverride?: string,
  incrementCountBy: number = 1
): Promise<number | undefined> {
  const user = auth.currentUser;

  // Always update local trial counter when JANA_RPH is triggered
  if (action === 'JANA_RPH') {
    const currentLocal = getLocalTrialCount(user?.uid);
    setLocalTrialCount(user?.uid, currentLocal + incrementCountBy);
  }

  if (!user || !user.email) {
    return action === 'JANA_RPH' ? getLocalTrialCount(null) : undefined;
  }

  const localProfil = muatProfilGuru();
  const logEntry: UsageLogDoc = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || localProfil.namaGuru || 'Guru Kimia',
    namaSekolah: namaSekolahOverride || localProfil.namaSekolah || '',
    action,
    details: details.slice(0, 950),
    createdAt: new Date().toISOString(),
  };

  try {
    await addDoc(collection(db, 'usage_logs'), logEntry);

    if (action === 'JANA_RPH') {
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data() as UserProfileDoc;
        const nextCount =
          Math.max(data.rphGeneratedCount || 0, getLocalTrialCount(user.uid) - incrementCountBy) +
          incrementCountBy;
        setLocalTrialCount(user.uid, nextCount);
        await setDoc(userRef, {
          ...data,
          rphGeneratedCount: nextCount,
          namaSekolah:
            namaSekolahOverride ||
            data.namaSekolah ||
            localProfil.namaSekolah ||
            '',
        });
        return nextCount;
      }
    }
  } catch (error) {
    console.warn('Gagal merekod log penggunaan:', error);
  }
  return undefined;
}

export async function simpanRPHKeCloud(rph: RPHData): Promise<void> {
  const user = auth.currentUser;
  if (!user || !user.email) return;

  const docId = `${user.uid}_${rph.id}`;
  const path = `rphs/${docId}`;
  const nowIso = new Date().toISOString();

  const payload: SavedRphDoc = {
    id: rph.id,
    ownerId: user.uid,
    ownerEmail: user.email,
    ownerName: rph.info.namaGuru || user.displayName || 'Guru Kimia',
    namaSekolah: rph.info.namaSekolah || 'SMK / MRSM',
    tingkatan: rph.info.tingkatan,
    kelas: rph.info.kelas,
    babTajuk: rph.babTajuk,
    skKod: rph.skKod,
    spKodList: rph.spKod.join(', '),
    modelPdpc: rph.modelPdpc,
    tarikh: rph.info.tarikh,
    rphJson: JSON.stringify(rph),
    createdAt: rph.createdAt || nowIso,
    updatedAt: nowIso,
  };

  try {
    await setDoc(doc(db, 'rphs', docId), payload);
    await logAktivitiPenggunaan(
      'SIMPAN_RPH',
      `${rph.info.tingkatan} (${rph.info.kelas}) • ${rph.babTajuk} • SP ${rph.spKod.join(', ')} [${rph.modelPdpc}]`,
      rph.info.namaSekolah
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function padamRPHDariCloud(rphId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) return;
  const docId = `${user.uid}_${rphId}`;
  const path = `rphs/${docId}`;
  try {
    await deleteDoc(doc(db, 'rphs', docId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export {
  onAuthStateChanged,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc,
};
export type { User };
