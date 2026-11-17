import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  X,
  ExternalLink,
  ShieldCheck,
  Send,
  MessageCircle,
  Sparkles,
  FileText,
  BookmarkCheck,
  FlaskConical,
  Dna,
  Atom,
  Calculator,
  Compass,
} from 'lucide-react';
import { OFFICIAL_REFERENCES, SubjectOfficialReference } from '../data/officialReferences';

interface OfficialReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubjectKey?: string;
}

export const OfficialReferenceModal: React.FC<OfficialReferenceModalProps> = ({
  isOpen,
  onClose,
  defaultSubjectKey = 'kimia',
}) => {
  const [activeKey, setActiveKey] = useState<string>('kimia');

  useEffect(() => {
    if (defaultSubjectKey && OFFICIAL_REFERENCES[defaultSubjectKey]) {
      setActiveKey(defaultSubjectKey);
    }
  }, [defaultSubjectKey, isOpen]);

  if (!isOpen) return null;

  const currentRef: SubjectOfficialReference =
    OFFICIAL_REFERENCES[activeKey] || OFFICIAL_REFERENCES.kimia;

  const getSubjectIcon = (key: string) => {
    switch (key) {
      case 'kimia':
        return <FlaskConical className="w-4 h-4" />;
      case 'biologi':
        return <Dna className="w-4 h-4" />;
      case 'fizik':
        return <Atom className="w-4 h-4" />;
      case 'sains':
        return <Sparkles className="w-4 h-4" />;
      case 'matematik':
        return <Calculator className="w-4 h-4" />;
      case 'matematik-tambahan':
        return <Compass className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/20 flex items-center justify-between gap-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0 shadow-inner">
              <BookOpen className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <h3 className="font-black text-base sm:text-lg tracking-tight">
                  Pusat Rujukan Rasmi DSKP &amp; Buku Teks KPM
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-400/30 flex items-center gap-1 shadow-2xs">
                  <ShieldCheck className="w-3 h-3" />
                  Kementerian Pendidikan Malaysia (KSSM)
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Rujukan rasmi Bahagian Pembangunan Kurikulum (BPK) &amp; Buku Teks Digital mengikut subjek.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition shrink-0 cursor-pointer"
            title="Tutup Rujukan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subject Navigation Pills */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200">
          <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
            Pilih Subjek:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {Object.values(OFFICIAL_REFERENCES).map((sub) => {
              const isSelected = activeKey === sub.key;
              return (
                <button
                  key={sub.key}
                  type="button"
                  onClick={() => setActiveKey(sub.key)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${
                    isSelected
                      ? `${sub.pillClass} shadow-xs scale-[1.02]`
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {getSubjectIcon(sub.key)}
                  <span>{sub.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50 text-xs sm:text-sm text-slate-700">
          {/* Active Subject Card */}
          <div className={`p-4 rounded-2xl border ${currentRef.borderClass} ${currentRef.badgeClass} flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-slate-900">{currentRef.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                  KSSM Kebangsaan
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seluruh sukatan e-RPH Pintar disusun tepat menepati dokumen rasmi di bawah.
              </p>
            </div>

            <a
              href="https://t.me/amierulhafreez"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs self-start sm:self-center cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Hubungi Cikgu Hafreez (Telegram)</span>
            </a>
          </div>

          {/* Section 1: DSKP Rasmi KPM */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileText className={`w-4 h-4 ${currentRef.accentText}`} />
              <span>1. Dokumen Standard Kurikulum &amp; Pentaksiran (DSKP)</span>
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {currentRef.dskpList.map((dskp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-indigo-300 transition"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${currentRef.pillClass}`}>
                        {dskp.tingkatan}
                      </span>
                      <span className="font-extrabold text-xs text-slate-900">
                        {dskp.kod}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800">
                      {dskp.dokumen}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Penerbit: <strong>{dskp.penerbit}</strong>
                    </p>
                    <p className="text-xs text-slate-600 pt-0.5 leading-relaxed">
                      <strong>Cakupan Bidang Pembelajaran:</strong> {dskp.fokus}
                    </p>
                  </div>

                  <a
                    href={dskp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition self-start md:self-center cursor-pointer shrink-0 border border-slate-200"
                  >
                    <span>Layari Portal BPK KPM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Buku Teks Digital KPM */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <BookmarkCheck className={`w-4 h-4 ${currentRef.accentText}`} />
                <span>2. Buku Teks Digital KPM ({currentRef.name})</span>
              </h4>
              <span className="text-[11px] text-slate-500">
                Pautan Pembaca Digital Interaktif (AnyFlip / DBP)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentRef.bukuTeksList.map((book, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between gap-3 hover:border-indigo-300 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${currentRef.pillClass}`}>
                        {book.tingkatan}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {book.tahun}
                      </span>
                    </div>
                    <h5 className="font-extrabold text-xs text-slate-900 pt-1">
                      {book.tajuk}
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Penerbit Berlesen: {book.penerbit}
                    </p>
                  </div>

                  <a
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Buka Buku Teks Online (AnyFlip)</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Bantuan Langsung Telegram */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-black text-xs text-sky-950">
                <Send className="w-4 h-4 text-[#0088cc]" />
                <span>Ada Pertanyaan Berkaitan Silibus atau Cadangan?</span>
              </div>
              <p className="text-xs text-sky-900/80 leading-relaxed">
                Hubungi terus <strong>Cikgu Hafreez</strong> melalui Telegram di{' '}
                <a
                  href="https://t.me/amierulhafreez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-[#0088cc]"
                >
                  @amierulhafreez
                </a>{' '}
                untuk sebarang pertanyaan kod akses, modul sekolah, atau penambahbaikan sistem.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-center">
              <a
                href="https://t.me/amierulhafreez"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-extrabold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>

              <a
                href="https://wa.me/amierulhafreez"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7a6e] text-white text-xs font-extrabold transition flex items-center gap-1.5 shadow-xs cursor-pointer border border-[#25D366]/30"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
                <span>WhatsApp @amierulhafreez</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Semua dokumen rujukan adalah hak milik Kementerian Pendidikan Malaysia (KPM).
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition self-end sm:self-auto cursor-pointer shadow-xs"
          >
            Tutup Rujukan
          </button>
        </div>
      </div>
    </div>
  );
};
