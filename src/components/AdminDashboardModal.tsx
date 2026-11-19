import React, { useEffect, useState, useMemo } from 'react';
import {
  db,
  collection,
  onSnapshot,
  UserProfileDoc,
  AccessCodeDoc,
  UsageLogDoc,
  SavedRphDoc,
  OperationType,
  handleFirestoreError,
  janaKodAksesAdmin,
  tukarStatusKodAdmin,
  padamKodAksesAdmin,
  tukarStatusAksesPenggunaAdmin,
  resetKuotaPercubaanAdmin,
  inferSubjectFromCode,
  FREE_TRIAL_LIMIT,
} from '../services/firebase';
import { getSubjectConfig } from '../config/subjects';
import { RPHData } from '../types/rph';
import { fetchVisitorStats, VisitorStats } from '../services/visitorTracker';
import {
  ShieldCheck,
  Users,
  Activity,
  FileText,
  X,
  Search,
  Download,
  School,
  Eye,
  KeyRound,
  Plus,
  Copy,
  Check,
  Ban,
  CheckCircle2,
  Trash2,
  MessageSquareShare,
  RotateCcw,
  MessageSquareHeart,
  FileSpreadsheet,
  Star,
  ExternalLink,
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInspectRph: (rph: RPHData) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onInspectRph,
}) => {
  const [activeTab, setActiveTab] = useState<
    'codes' | 'users' | 'logs' | 'rphs' | 'feedback'
  >('codes');
  const [accessCodes, setAccessCodes] = useState<AccessCodeDoc[]>([]);
  const [users, setUsers] = useState<UserProfileDoc[]>([]);
  const [logs, setLogs] = useState<UsageLogDoc[]>([]);
  const [cloudRphs, setCloudRphs] = useState<SavedRphDoc[]>([]);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [googleDriveUrl, setGoogleDriveUrl] = useState<string>(() =>
    localStorage.getItem('erph_google_drive_sheet_url') || ''
  );
  const [isUrlSaved, setIsUrlSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Code Generator State
  const [targetSubject, setTargetSubject] = useState<string>('kimia');
  const [buyerNote, setBuyerNote] = useState('');
  const [customCodeInput, setCustomCodeInput] = useState('');
  const [batchCount, setBatchCount] = useState<number>(1);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [codeGenError, setCodeGenError] = useState<string | null>(null);
  const [codeGenSuccess, setCodeGenSuccess] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  useEffect(() => {
    fetchVisitorStats().then(setVisitorStats).catch(console.error);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const unsubCodes = onSnapshot(
      collection(db, 'access_codes'),
      (snap) => {
        const list: AccessCodeDoc[] = [];
        snap.forEach((docSnap) => {
          list.push(docSnap.data() as AccessCodeDoc);
        });
        list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAccessCodes(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'access_codes')
    );

    const unsubUsers = onSnapshot(
      collection(db, 'users'),
      (snap) => {
        const list: UserProfileDoc[] = [];
        snap.forEach((docSnap) => {
          const u = docSnap.data() as UserProfileDoc;
          list.push(u);
          // Auto-repair trial users whose quota was prematurely consumed by the old Step 2 dropdown bug
          const adminRepairKey = `e_rph_admin_step2_repaired_v2_${u.uid}`;
          if (
            u.role !== 'admin' &&
            u.accessStatus !== 'active' &&
            (u.rphGeneratedCount || 0) > 0 &&
            !localStorage.getItem(adminRepairKey)
          ) {
            localStorage.setItem(adminRepairKey, 'true');
            resetKuotaPercubaanAdmin(u);
          }
        });
        list.sort(
          (a, b) =>
            new Date(b.lastLoginAt).getTime() -
            new Date(a.lastLoginAt).getTime()
        );
        setUsers(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'users')
    );

    const unsubLogs = onSnapshot(
      collection(db, 'usage_logs'),
      (snap) => {
        const list: UsageLogDoc[] = [];
        snap.forEach((docSnap) => {
          list.push({
            id: docSnap.id,
            ...(docSnap.data() as UsageLogDoc),
          });
        });
        list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setLogs(list.slice(0, 200));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'usage_logs')
    );

    const unsubRphs = onSnapshot(
      collection(db, 'rphs'),
      (snap) => {
        const list: SavedRphDoc[] = [];
        snap.forEach((docSnap) => {
          list.push(docSnap.data() as SavedRphDoc);
        });
        list.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setCloudRphs(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'rphs')
    );

    const fetchFeedback = async () => {
      try {
        const res = await fetch('/api/feedback');
        if (res.ok) {
          const data = await res.json();
          if (data.records) setFeedbackList(data.records);
        }
      } catch (err) {
        console.warn('Failed to load feedback in admin:', err);
      }
    };
    fetchFeedback();

    return () => {
      unsubCodes();
      unsubUsers();
      unsubLogs();
      unsubRphs();
    };
  }, [isOpen]);

  const activeCodesCount = useMemo(
    () => accessCodes.filter((c) => c.status === 'active').length,
    [accessCodes]
  );

  const unusedCodesCount = useMemo(
    () => accessCodes.filter((c) => c.status === 'unused').length,
    [accessCodes]
  );

  const totalRphGenerated = useMemo(
    () =>
      Math.max(
        cloudRphs.length,
        users.reduce((acc, u) => acc + (u.rphGeneratedCount || 0), 0)
      ),
    [users, cloudRphs]
  );

  const filteredCodes = useMemo(() => {
    if (!searchQuery.trim()) return accessCodes;
    const q = searchQuery.toLowerCase();
    return accessCodes.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.note.toLowerCase().includes(q) ||
        (c.redeemedByName && c.redeemedByName.toLowerCase().includes(q)) ||
        (c.redeemedByEmail && c.redeemedByEmail.toLowerCase().includes(q))
    );
  }, [accessCodes, searchQuery]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.displayName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.namaSekolah && u.namaSekolah.toLowerCase().includes(q)) ||
        (u.accessCodeUsed && u.accessCodeUsed.toLowerCase().includes(q))
    );
  }, [users, searchQuery]);

  const filteredLogs = useMemo(() => {
    if (!searchQuery.trim()) return logs;
    const q = searchQuery.toLowerCase();
    return logs.filter(
      (l) =>
        l.displayName.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.details.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q)
    );
  }, [logs, searchQuery]);

  const filteredRphs = useMemo(() => {
    if (!searchQuery.trim()) return cloudRphs;
    const q = searchQuery.toLowerCase();
    return cloudRphs.filter(
      (r) =>
        r.ownerName.toLowerCase().includes(q) ||
        r.ownerEmail.toLowerCase().includes(q) ||
        r.namaSekolah.toLowerCase().includes(q) ||
        r.babTajuk.toLowerCase().includes(q) ||
        r.spKodList.toLowerCase().includes(q)
    );
  }, [cloudRphs, searchQuery]);

  if (!isOpen) return null;

  const copyTextToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Fallback below
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  };

  const handleGenerateCodes = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingCode(true);
    setCodeGenError(null);
    setCodeGenSuccess(null);
    try {
      const created = await janaKodAksesAdmin(
        buyerNote.trim() || `Lesen Individu e-RPH ${targetSubject.toUpperCase()}`,
        batchCount,
        customCodeInput,
        targetSubject
      );
      if (created.length > 0) {
        setCodeGenSuccess(`Berjaya menjana ${created.length} kod akses: ${created.join(', ')}`);
      }
      setBuyerNote('');
      setCustomCodeInput('');
    } catch (err: any) {
      console.error('Error generating access code:', err);
      setCodeGenError(
        err?.message || 'Gagal menjana kod akses. Sila pastikan anda log masuk sebagai Admin.'
      );
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const handleCopyCode = async (code: string) => {
    const ok = await copyTextToClipboard(code);
    if (ok) {
      setCopiedCodeId(code);
      setTimeout(() => setCopiedCodeId(null), 2000);
    }
  };

  const handleCopyWhatsAppMsg = async (code: string, note: string) => {
    const subjKey = inferSubjectFromCode(code, note);
    const subjCfg = subjKey !== 'all' ? getSubjectConfig(subjKey) : null;
    const appOrigin = window.location.origin;
    const appUrl = subjCfg ? `${appOrigin}/${subjCfg.key}` : appOrigin;
    const appTitle = subjCfg ? `e-RPH ${subjCfg.name} Pintar (by Cikgu Hafreez)` : 'e-RPH Pintar STEM (by Cikgu Hafreez)';
    const ciriLabel = subjCfg ? `semua ciri RPH ${subjCfg.shortName} (${subjCfg.formsLabel})` : 'semua ciri RPH STEM KSSM';

    const msg = `Assalamualaikum & Salam Sejahtera,\n\nTerima kasih atas langganan aplikasi *${appTitle}*.\n\nBerikut adalah maklumat pengaktifan akaun anda:\n🔗 Pautan Aplikasi: ${appUrl}\n🔑 Kod Akses Unik Anda: *${code}*\n📌 Catatan: ${note}\n\nCara Pengaktifan:\n1. Buka pautan di atas dan klik *"Log Masuk dengan Google"*.\n2. Masukkan Kod Akses Unik di atas sekali sahaja.\n3. Akaun anda akan diaktifkan serta-merta untuk ${ciriLabel}.`;
    const ok = await copyTextToClipboard(msg);
    if (ok) {
      setCopiedMsgId(code);
      setTimeout(() => setCopiedMsgId(null), 2500);
    }
  };

  const handleExportCsv = () => {
    const headers = [
      'Nama Guru',
      'Email Google',
      'Nama Sekolah',
      'Status Akses',
      'Kod Akses Digunakan',
      'Jumlah Log Masuk',
      'Jumlah RPH Dijana',
      'Log Masuk Terakhir',
    ];
    const rows = users.map((u) => [
      `"${(u.displayName || '').replace(/"/g, '""')}"`,
      `"${u.email}"`,
      `"${(u.namaSekolah || '').replace(/"/g, '""')}"`,
      `"${u.role === 'admin' ? 'ADMIN' : u.accessStatus || 'pending'}"`,
      `"${u.accessCodeUsed || '-'}"`,
      u.loginCount || 0,
      u.rphGeneratedCount || 0,
      `"${new Date(u.lastLoginAt).toLocaleString('ms-MY')}"`,
    ]);
    const csvContent =
      '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_Pengguna_Lesen_eRPH_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatDateTime = (iso?: string) => {
    if (!iso) return '-';
    try {
      return new Date(iso).toLocaleString('ms-MY', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">
                  Papan Pemuka Admin · Kawalan Kod Akses &amp; Analitik
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500 text-slate-950">
                  Cikgu Hafreez (Owner)
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Jana kod akses unik bagi setiap pelanggan, kawal status lesen,
                dan pantau penggunaan RPH secara langsung.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Muat Turun CSV</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Summary KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-slate-50 border-b border-slate-200">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Pelawat Portal</span>
              <Eye className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
              {visitorStats?.total || 0}
            </p>
            <p className="text-[11px] text-purple-700 font-medium">
              +{visitorStats?.today || 0} Hari Ini
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Kod Akses Aktif / Tersedia</span>
              <KeyRound className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
              {activeCodesCount}{' '}
              <span className="text-sm font-semibold text-slate-400">
                / {accessCodes.length}
              </span>
            </p>
            <p className="text-[11px] text-emerald-700 font-medium">
              {unusedCodesCount} kod belum ditebus
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Guru Berdaftar</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
              {users.length}
            </p>
            <p className="text-[11px] text-blue-700 font-medium">
              Log Masuk Akaun Google
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Jumlah RPH Dijana</span>
              <FileText className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
              {totalRphGenerated}
            </p>
            <p className="text-[11px] text-amber-700 font-medium">
              {cloudRphs.length} RPH Tersimpan di Cloud
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Log Aktiviti</span>
              <Activity className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
              {logs.length}
            </p>
            <p className="text-[11px] text-indigo-700 font-medium">
              Rekod Penggunaan Terkini
            </p>
          </div>
        </div>

        {/* Tabs & Search Bar */}
        <div className="px-6 py-3 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('codes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'codes'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Kod Akses Unik ({accessCodes.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('users')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'users'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Senarai Pengguna ({users.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('logs')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'logs'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Log Aktiviti ({logs.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rphs')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'rphs'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Arkib RPH ({cloudRphs.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('feedback')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'feedback'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <MessageSquareHeart className="w-3.5 h-3.5 text-rose-500" />
              <span>Maklum Balas Guru ({feedbackList.length})</span>
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kod, nama guru, e-mel, sekolah..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: ACCESS CODES MANAGEMENT */}
          {activeTab === 'codes' && (
            <div className="space-y-6">
              {/* Generate New Access Code Form */}
              <form
                onSubmit={handleGenerateCodes}
                className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-emerald-600" />
                      <span>Jana Kod Akses Unik Baharu (1 Kod = 1 Pengguna)</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Setiap kod yang dijana hanya boleh ditebus oleh satu akaun
                      Google dan kekal aktif sehingga anda menyahaktifkannya.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subjek Modul
                    </label>
                    <select
                      value={targetSubject}
                      onChange={(e) => setTargetSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="kimia">Kimia (KIMIA-)</option>
                      <option value="biologi">Biologi (BIO-)</option>
                      <option value="sains">Sains (SAINS-)</option>
                      <option value="fizik">Fizik (FIZIK-)</option>
                      <option value="matematik">Maths (MATH-)</option>
                      <option value="matematik-tambahan">AddMaths (ADDMATH-)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Catatan Pembeli / Nama Guru / Rujukan Bayaran
                    </label>
                    <input
                      type="text"
                      value={buyerNote}
                      onChange={(e) => setBuyerNote(e.target.value)}
                      placeholder="cth: Cikgu Siti - SMK Putrajaya (Bayaran RM30)"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kod Khas (Pilihan)
                    </label>
                    <input
                      type="text"
                      value={customCodeInput}
                      onChange={(e) =>
                        setCustomCodeInput(e.target.value.toUpperCase())
                      }
                      disabled={batchCount > 1}
                      placeholder={`Auto (${getSubjectConfig(targetSubject).codePrefix}-XXXXXX)`}
                      className="w-full px-3 py-2 text-xs font-mono uppercase rounded-xl border border-slate-300 bg-white disabled:bg-slate-100 focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kuantiti
                    </label>
                    <select
                      value={batchCount}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setBatchCount(val);
                        if (val > 1) setCustomCodeInput('');
                      }}
                      className="w-full px-2.5 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white"
                    >
                      <option value={1}>1 Kod</option>
                      <option value={5}>5 Kod</option>
                      <option value={10}>10 Kod</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={isGeneratingCode}
                      className="w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4" />
                      <span>
                        {isGeneratingCode ? 'Menjana...' : 'Jana Kod'}
                      </span>
                    </button>
                  </div>
                </div>

                {codeGenError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    {codeGenError}
                  </div>
                )}

                {codeGenSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{codeGenSuccess}</span>
                  </div>
                )}
              </form>

              {/* Access Codes Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Kod Akses Unik</th>
                      <th className="p-3">Status Lesen</th>
                      <th className="p-3">Catatan Pembeli</th>
                      <th className="p-3">Ditebus Oleh (Akaun Google)</th>
                      <th className="p-3">Masa Dijana / Ditebus</th>
                      <th className="p-3 text-right">Tindakan Kawalan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCodes.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="p-8 text-center text-slate-400"
                        >
                          Tiada kod akses dijana lagi. Gunakan borang di atas
                          untuk menjana kod akses pertama anda.
                        </td>
                      </tr>
                    ) : (
                      filteredCodes.map((c) => (
                        <tr key={c.code} className="hover:bg-slate-50/80">
                          <td className="p-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono tabular-nums font-extrabold text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                                {c.code}
                              </span>
                              {(() => {
                                const sKey = inferSubjectFromCode(c.code, c.note, c.subject);
                                const label = sKey === 'all' ? 'Semua Subjek' : getSubjectConfig(sKey).shortName;
                                return (
                                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold">
                                    {label}
                                  </span>
                                );
                              })()}
                              <button
                                type="button"
                                onClick={() => handleCopyCode(c.code)}
                                className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
                                title="Salin Kod Sahaja"
                              >
                                {copiedCodeId === c.code ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyWhatsAppMsg(c.code, c.note)
                                }
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold transition whitespace-nowrap"
                                title="Salin Ayat Lengkap WhatsApp/Telegram untuk Dihantar kepada Pembeli"
                              >
                                {copiedMsgId === c.code ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span>Ayat Disalin!</span>
                                  </>
                                ) : (
                                  <>
                                    <MessageSquareShare className="w-3 h-3" />
                                    <span>Salin Ayat</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </td>

                          <td className="p-3">
                            {c.status === 'unused' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[11px]">
                                Tersedia (Belum Ditebus)
                              </span>
                            )}
                            {c.status === 'active' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px]">
                                Aktif Digunakan
                              </span>
                            )}
                            {c.status === 'revoked' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200 font-bold text-[11px]">
                                Dinyahaktifkan
                              </span>
                            )}
                          </td>

                          <td className="p-3 font-medium text-slate-700">
                            {c.note}
                          </td>

                          <td className="p-3">
                            {c.redeemedByEmail ? (
                              <div>
                                <p className="font-bold text-slate-900">
                                  {c.redeemedByName || 'Guru'}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {c.redeemedByEmail}
                                </p>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">
                                Belum ditebus
                              </span>
                            )}
                          </td>

                          <td className="p-3 text-slate-500 tabular-nums">
                            <div>Dijana: {formatDateTime(c.createdAt)}</div>
                            {c.redeemedAt && (
                              <div className="text-emerald-700 font-medium">
                                Ditebus: {formatDateTime(c.redeemedAt)}
                              </div>
                            )}
                          </td>

                          <td className="p-3 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              {c.status !== 'revoked' ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    tukarStatusKodAdmin(c, 'revoked')
                                  }
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[11px] transition whitespace-nowrap"
                                  title="Nyahaktifkan kod ini & gantung akses pengguna"
                                >
                                  <Ban className="w-3 h-3" />
                                  <span>Nyahaktif</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    tukarStatusKodAdmin(
                                      c,
                                      c.redeemedByUid ? 'active' : 'unused'
                                    )
                                  }
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] transition whitespace-nowrap"
                                  title="Aktifkan semula kod akses ini"
                                >
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Aktifkan Semula</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => {
                                  if (
                                    confirm(
                                      `Padam kod akses ${c.code} daripada sistem?`
                                    )
                                  ) {
                                    padamKodAksesAdmin(c.code);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                                title="Padam Kod"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: REGISTERED USERS */}
          {activeTab === 'users' && (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-3">Nama Guru</th>
                    <th className="p-3">E-mel Google</th>
                    <th className="p-3">Sekolah</th>
                    <th className="p-3">Status Lesen &amp; Kod</th>
                    <th className="p-3 text-center">Login</th>
                    <th className="p-3 text-center">RPH Dijana</th>
                    <th className="p-3 text-right">Kawalan Akses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="p-8 text-center text-slate-400"
                      >
                        Tiada rekod pengguna ditemui.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const isUserLicensedRow =
                        u.role === 'admin' || u.accessStatus === 'active';
                      return (
                        <tr key={u.uid} className="hover:bg-slate-50/80">
                          <td className="p-3 font-bold text-slate-900 flex items-center gap-2.5">
                            {u.photoURL ? (
                              <img
                                src={u.photoURL}
                                alt={u.displayName}
                                className="w-7 h-7 rounded-full border border-slate-200"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                                {u.displayName.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <span>{u.displayName}</span>
                              {u.role === 'admin' && (
                                <span className="ml-1.5 px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                                  ADMIN
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-slate-600">{u.email}</td>
                          <td className="p-3 text-slate-700 font-medium">
                            <span className="inline-flex items-center gap-1">
                              <School className="w-3.5 h-3.5 text-slate-400" />
                              <span>{u.namaSekolah || '-'}</span>
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-col gap-0.5">
                              {u.role === 'admin' ? (
                                <span className="text-emerald-700 font-bold">
                                  Akses Penuh (Owner)
                                </span>
                              ) : u.accessStatus === 'active' ? (
                                <span className="text-emerald-700 font-bold">
                                  Lesen Penuh ({u.accessCodeUsed || 'Manual'})
                                </span>
                              ) : u.accessStatus === 'revoked' ? (
                                <span className="text-red-700 font-bold">
                                  Digantung ({u.accessCodeUsed || '-'})
                                </span>
                              ) : (u.rphGeneratedCount || 0) >= FREE_TRIAL_LIMIT ? (
                                <span className="text-amber-700 font-bold">
                                  Tamat Percubaan ({FREE_TRIAL_LIMIT}/{FREE_TRIAL_LIMIT} • Perlu Kod)
                                </span>
                              ) : (
                                <span className="text-indigo-700 font-semibold">
                                  Percubaan Percuma ({u.rphGeneratedCount || 0}/{FREE_TRIAL_LIMIT})
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-center font-bold text-blue-700 tabular-nums">
                            {u.loginCount || 1}
                          </td>
                          <td className="p-3 text-center font-extrabold text-emerald-700 tabular-nums">
                            {u.rphGeneratedCount || 0}
                          </td>
                          <td className="p-3 text-right">
                            {u.role !== 'admin' && (
                              <div className="inline-flex items-center gap-1.5">
                                {!isUserLicensedRow &&
                                  (u.rphGeneratedCount || 0) > 0 && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        resetKuotaPercubaanAdmin(u)
                                      }
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] transition whitespace-nowrap"
                                      title={`Reset kuota percubaan pengguna ini kepada 0/${FREE_TRIAL_LIMIT}`}
                                    >
                                      <RotateCcw className="w-3 h-3" />
                                      <span>Reset Kuota (0/{FREE_TRIAL_LIMIT})</span>
                                    </button>
                                  )}
                                {isUserLicensedRow ? (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      tukarStatusAksesPenggunaAdmin(
                                        u,
                                        'revoked'
                                      )
                                    }
                                    className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[11px] transition whitespace-nowrap"
                                  >
                                    Gantung Akses
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      tukarStatusAksesPenggunaAdmin(u, 'active')
                                    }
                                    className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] transition whitespace-nowrap"
                                  >
                                    Aktifkan Terus
                                  </button>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: USAGE LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-2">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  Tiada log aktiviti ditemui.
                </div>
              ) : (
                filteredLogs.map((log, i) => (
                  <div
                    key={log.id || i}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] ${
                            log.action === 'LOGIN'
                              ? 'bg-blue-100 text-blue-800'
                              : log.action === 'AKTIFKAN_KOD'
                              ? 'bg-purple-100 text-purple-800'
                              : log.action === 'JANA_RPH' ||
                                log.action === 'SIMPAN_RPH'
                              ? 'bg-emerald-100 text-emerald-800'
                              : log.action === 'GUNA_AI'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {log.action}
                        </span>
                        <span className="font-bold text-slate-900">
                          {log.displayName}
                        </span>
                        <span className="text-slate-400">({log.email})</span>
                        {log.namaSekolah && (
                          <span className="text-emerald-700 font-semibold">
                            · {log.namaSekolah}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600">{log.details}</p>
                    </div>
                    <div className="text-[11px] text-slate-400 shrink-0 tabular-nums">
                      {formatDateTime(log.createdAt)}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: CLOUD RPHS */}
          {activeTab === 'rphs' && (
            <div className="space-y-2.5">
              {filteredRphs.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  Tiada RPH pengguna yang disimpan di Cloud buat masa ini.
                </div>
              ) : (
                filteredRphs.map((item) => (
                  <div
                    key={`${item.ownerId}_${item.id}`}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                          {item.tingkatan} · {item.kelas}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold">
                          {item.modelPdpc}
                        </span>
                        <span className="font-bold text-slate-800">
                          Oleh: {item.ownerName} ({item.namaSekolah})
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 text-sm">
                        {item.babTajuk} — SK {item.skKod} (SP: {item.spKodList})
                      </p>
                      <p className="text-slate-400 text-[11px] tabular-nums">
                        Tarikh PdPC: {item.tarikh} · Dikemas kini:{' '}
                        {formatDateTime(item.updatedAt)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const parsed = JSON.parse(item.rphJson) as RPHData;
                          onInspectRph(parsed);
                          onClose();
                        } catch (e) {
                          console.error('Failed to parse RPH JSON', e);
                        }
                      }}
                      className="self-end sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold transition shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat RPH</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: MAKLUM BALAS GURU & SPREADSHEET (ADMIN ONLY) */}
          {activeTab === 'feedback' && (
            <div className="space-y-4">
              {/* Google Drive Spreadsheet Integration Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/80 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        Rujukan Spreadsheet Google Drive (Admin Cikgu Hafreez)
                      </h4>
                      <p className="text-xs text-slate-600">
                        Pautan fail spreadsheet di Google Drive untuk rujukan dan semakan maklum balas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {googleDriveUrl ? (
                      <a
                        href={googleDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Buka di Google Drive</span>
                      </a>
                    ) : (
                      <a
                        href="https://drive.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white shadow-xs transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Buka Google Drive</span>
                      </a>
                    )}

                    <a
                      href="/api/feedback/export"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 shadow-2xs transition"
                      title="Muat turun fail sandaran .CSV"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Muat Turun .CSV</span>
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-200/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="url"
                    value={googleDriveUrl}
                    onChange={(e) => {
                      setGoogleDriveUrl(e.target.value);
                      setIsUrlSaved(false);
                    }}
                    placeholder="Tampal pautan Google Drive / Google Sheets anda di sini (cth: https://docs.google.com/spreadsheets/d/...)"
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem('erph_google_drive_sheet_url', googleDriveUrl.trim());
                      setIsUrlSaved(true);
                      setTimeout(() => setIsUrlSaved(false), 2500);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition cursor-pointer shrink-0"
                  >
                    {isUrlSaved ? '✓ Disimpan!' : 'Simpan Pautan'}
                  </button>
                </div>
              </div>

              {feedbackList.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs space-y-2">
                  <MessageSquareHeart className="w-8 h-8 mx-auto text-slate-300" />
                  <p>Belum ada maklum balas yang direkodkan dalam fail spreadsheet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {feedbackList
                    .filter((item) => {
                      if (!searchQuery) return true;
                      const q = searchQuery.toLowerCase();
                      return (
                        (item.nama && item.nama.toLowerCase().includes(q)) ||
                        (item.sekolah && item.sekolah.toLowerCase().includes(q)) ||
                        (item.subjek && item.subjek.toLowerCase().includes(q)) ||
                        (item.kategori && item.kategori.toLowerCase().includes(q)) ||
                        (item.mesej && item.mesej.toLowerCase().includes(q))
                      );
                    })
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-all space-y-2 text-xs shadow-2xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-sm">
                              {item.nama}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="font-medium text-slate-600">
                              {item.sekolah}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-200 text-[11px]">
                              {item.subjek}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                              {item.kategori}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            <span className="text-amber-500 font-bold text-sm">
                              {'⭐'.repeat(item.penarafan || 5)}
                            </span>
                            <span className="text-slate-400 text-[11px] tabular-nums">
                              {item.tarikh}
                            </span>
                          </div>
                        </div>

                        <p className="text-slate-800 text-xs leading-relaxed font-normal whitespace-pre-wrap">
                          {item.mesej}
                        </p>

                        {item.hubungan && item.hubungan !== '-' && (
                          <div className="pt-1.5 text-[11px] text-slate-500">
                            <span className="text-slate-400">Hubungi: </span>
                            <span className="font-semibold text-slate-700">{item.hubungan}</span>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
