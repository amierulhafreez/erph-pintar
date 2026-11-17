import React, { useState, useEffect } from 'react';
import {
  X,
  MessageSquareHeart,
  Send,
  Star,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  School,
  User as UserIcon,
  BookOpen,
  Sparkles,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { db } from '../services/firebase';
import { collection, addDoc } from '@firebase/firestore';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultNama?: string;
  defaultSekolah?: string;
  defaultSubjek?: string;
}

const SENARAI_SUBJEK_PANTAS = [
  'Kimia',
  'Biologi',
  'Fizik',
  'Sains',
  'Matematik',
  'Matematik Tambahan',
  'Lain-lain',
];

const SENARAI_KATEGORI = [
  'Cadangan Penambahbaikan',
  'Pembetulan DSKP / Topik',
  'Laporan Isu / Bug',
  'Pujian & Pengalaman Pengguna',
  'Pertanyaan Umum / Kod Akses',
];

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  defaultNama = '',
  defaultSekolah = '',
  defaultSubjek = 'Kimia',
}) => {
  const [nama, setNama] = useState(defaultNama);
  const [sekolah, setSekolah] = useState(defaultSekolah);
  const [subjek, setSubjek] = useState(defaultSubjek);
  const [kategori, setKategori] = useState('Cadangan Penambahbaikan');
  const [penarafan, setPenarafan] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [mesej, setMesej] = useState('');
  const [hubungan, setHubungan] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (!nama && defaultNama) setNama(defaultNama);
      if (!sekolah && defaultSekolah) setSekolah(defaultSekolah);
      if (defaultSubjek) setSubjek(defaultSubjek);
      setIsSuccess(false);
      setErrorMessage(null);
    }
  }, [isOpen, defaultNama, defaultSekolah, defaultSubjek]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !sekolah.trim() || !subjek.trim() || !mesej.trim()) {
      setErrorMessage('Sila lengkapkan Nama, Sekolah, Subjek Diajar dan Mesej maklum balas.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const feedbackPayload = {
      nama: nama.trim(),
      sekolah: sekolah.trim(),
      subjek: subjek.trim(),
      kategori,
      penarafan,
      mesej: mesej.trim(),
      emailAtauTelefon: hubungan.trim(),
      createdAt: new Date().toISOString(),
    };

    let serverSuccess = false;

    // 1. Simpan terus ke backend API (Express Server -> file spreadsheet .csv)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackPayload),
      });
      if (res.ok) {
        serverSuccess = true;
      }
    } catch (err) {
      console.warn('API /api/feedback error:', err);
    }

    // 2. Simpan sandaran awan ke Firebase Firestore (jika online)
    try {
      await addDoc(collection(db, 'feedback'), feedbackPayload);
    } catch (err) {
      console.warn('Firestore feedback collection error:', err);
    }

    // 3. Simpan sandaran setempat (localStorage)
    try {
      const existing = JSON.parse(localStorage.getItem('erph_feedback_submissions') || '[]');
      existing.unshift(feedbackPayload);
      localStorage.setItem('erph_feedback_submissions', JSON.stringify(existing.slice(0, 50)));
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md shadow-xs">
              <MessageSquareHeart className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white border border-white/25">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Pusat Maklum Balas Guru</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-white mt-0.5">
                Borang Maklum Balas e-RPH Pintar
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-900">
                  Terima Kasih, Cikgu!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Maklum balas anda telah berjaya dihantar terus kepada Cikgu Hafreez untuk semakan dan tindakan penambahbaikan berterusan modul e-RPH Pintar.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Nama:</span>
                  <span className="font-bold">{nama}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Sekolah:</span>
                  <span className="font-bold">{sekolah}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Subjek:</span>
                  <span className="font-bold text-blue-700">{subjek}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Penarafan:</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    {'⭐'.repeat(penarafan)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition cursor-pointer"
                >
                  Selesai &amp; Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-900 flex items-start gap-2.5">
                <MessageSquareHeart className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Maklum balas anda akan dihantar terus kepada <strong>Cikgu Hafreez</strong> untuk semakan kualiti dan penambahbaikan sistem e-RPH Pintar.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Baris 1: Nama & Sekolah */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>1. Nama Pendidik / Guru</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="cth: Cikgu Amierul Hafreez"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5 text-blue-600" />
                    <span>2. Nama Sekolah / Maktab</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={sekolah}
                    onChange={(e) => setSekolah(e.target.value)}
                    placeholder="cth: MRSM Bagan Datuk / SMK Seri Indah"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition font-medium"
                  />
                </div>
              </div>

              {/* Baris 2: Subjek Diajar */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>3. Mata Pelajaran yang Diajar</span>
                  <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {SENARAI_SUBJEK_PANTAS.map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => setSubjek(subj)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        subjek === subj
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              {/* Baris 3: Kategori & Penarafan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                    <span>Kategori Maklum Balas</span>
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition font-medium"
                  >
                    {SENARAI_KATEGORI.map((kat) => (
                      <option key={kat} value={kat}>
                        {kat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                    <span>Penarafan Kepuasan Sistem</span>
                  </label>
                  <div className="flex items-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setPenarafan(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110 cursor-pointer"
                        title={`${star} Bintang`}
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            (hoverRating || penarafan) >= star
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-500 ml-2">
                      ({penarafan} / 5 Bintang)
                    </span>
                  </div>
                </div>
              </div>

              {/* Baris 4: Mesej Maklum Balas */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <span>Mesej / Cadangan Maklum Balas</span>
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={mesej}
                  onChange={(e) => setMesej(e.target.value)}
                  placeholder="Kongsikan cadangan penambahbaikan, pengalaman penggunaan, atau sebarang isu silibus yang perlu disemak..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition font-medium resize-none"
                />
              </div>

              {/* Baris 5: Maklumat Hubungan (Pilihan) */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <span>E-mel / No. Telefon / Telegram (Pilihan untuk maklum balas susulan)</span>
                </label>
                <input
                  type="text"
                  value={hubungan}
                  onChange={(e) => setHubungan(e.target.value)}
                  placeholder="cth: nama@sekolah.edu.my atau @telegram_handle"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition font-medium"
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-3">
                <p className="text-[11px] text-slate-400">
                  Maklum balas dihantar terus kepada Cikgu Hafreez.
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-md shadow-blue-500/20 transition cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Hantar Maklum Balas</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
