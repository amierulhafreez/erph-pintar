import React, { useState, useEffect } from 'react';
import { RPHData } from '../types/rph';
import {
  muatSemuaRPH,
  padamRPH,
  muatTurunDokumenWord,
  muatTurunDokumenSpreadsheet,
  simpanRPH,
} from '../utils/rphStorage';
import {
  auth,
  db,
  collection,
  query,
  where,
  onSnapshot,
  simpanRPHKeCloud,
  padamRPHDariCloud,
  SavedRphDoc,
  OperationType,
  handleFirestoreError,
} from '../services/firebase';
import {
  Bookmark,
  X,
  Search,
  Trash2,
  FileDown,
  FileSpreadsheet,
  Copy,
  ExternalLink,
  FlaskConical,
  Calendar,
  Clock,
  Cloud,
} from 'lucide-react';

interface SavedPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadRph: (rph: RPHData) => void;
  onPlansUpdated: () => void;
}

export const SavedPlansModal: React.FC<SavedPlansModalProps> = ({
  isOpen,
  onClose,
  onLoadRph,
  onPlansUpdated,
}) => {
  const [localPlans, setLocalPlans] = useState<RPHData[]>(() => muatSemuaRPH());
  const [cloudPlans, setCloudPlans] = useState<RPHData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setLocalPlans(muatSemuaRPH());

    const user = auth.currentUser;
    if (!user) {
      setCloudPlans([]);
      return;
    }

    const q = query(
      collection(db, 'rphs'),
      where('ownerId', '==', user.uid)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: RPHData[] = [];
        snap.forEach((docSnap) => {
          const data = docSnap.data() as SavedRphDoc;
          try {
            const parsed = JSON.parse(data.rphJson) as RPHData;
            list.push(parsed);
          } catch (e) {
            console.error('Failed to parse cloud RPH', e);
          }
        });
        setCloudPlans(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'rphs')
    );

    return () => unsub();
  }, [isOpen]);

  if (!isOpen) return null;

  // Merge cloud and local plans by id (preferring newer updatedAt)
  const mergedMap = new Map<string, RPHData>();
  localPlans.forEach((p) => mergedMap.set(p.id, p));
  cloudPlans.forEach((p) => {
    const existing = mergedMap.get(p.id);
    if (
      !existing ||
      new Date(p.updatedAt).getTime() >= new Date(existing.updatedAt).getTime()
    ) {
      mergedMap.set(p.id, p);
    }
  });

  const allPlans = Array.from(mergedMap.values()).sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const filtered = allPlans.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.babTajuk.toLowerCase().includes(q) ||
      p.info.tingkatan.toLowerCase().includes(q) ||
      p.info.kelas.toLowerCase().includes(q) ||
      p.info.tarikh.toLowerCase().includes(q) ||
      p.spKod.some((k) => k.toLowerCase().includes(q))
    );
  });

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Adakah anda pasti untuk memadam RPH ini?')) {
      const updated = padamRPH(id);
      setLocalPlans(updated);
      if (auth.currentUser) {
        await padamRPHDariCloud(id);
      }
      onPlansUpdated();
    }
  };

  const handleDuplicate = async (rph: RPHData, e: React.MouseEvent) => {
    e.stopPropagation();
    const cloned: RPHData = {
      ...rph,
      id: 'rph_' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      info: {
        ...rph.info,
        kelas: rph.info.kelas + ' (Salinan)',
      },
    };
    const updated = simpanRPH(cloned);
    setLocalPlans(updated);
    if (auth.currentUser) {
      await simpanRPHKeCloud(cloned);
    }
    onPlansUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xl animate-in fade-in">
      <div className="glass-panel rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-white/80 ring-1 ring-black/5 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/60 flex items-center justify-between gap-3 bg-white/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl apple-btn-blue text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/25">
              <Bookmark className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base">
                  Pustaka RPH Saya ({allPlans.length} Disimpan)
                </h3>
                {auth.currentUser && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 text-[10px] font-bold border border-emerald-500/20 backdrop-blur-xs">
                    <Cloud className="w-3 h-3 text-emerald-600" />
                    <span>Disambung ke Google Cloud</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Akses rancangan pengajaran yang telah anda sediakan dan simpan.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-white/80 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari mengikut topik, tingkatan, kelas atau tarikh..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 space-y-2 text-slate-400">
              <Bookmark className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">
                {allPlans.length === 0
                  ? 'Tiada RPH disimpan lagi.'
                  : 'Tiada RPH yang sepadan dengan carian.'}
              </p>
              <p className="text-xs text-slate-400">
                Selepas menyiapkan RPH, tekan "Simpan RPH" di Langkah 6 untuk
                menyimpannya di sini.
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onLoadRph(item);
                  onClose();
                }}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      {item.info.tingkatan}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                      {item.info.kelas}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                      {item.modelPdpc}
                    </span>
                    {item.isEksperimen && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-red-100 text-red-700 text-[11px] font-bold">
                        <FlaskConical className="w-3 h-3" />
                        <span>Amali Wajib</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition truncate">
                    {item.babTajuk} • SP {item.spKod.join(', ')}
                  </h4>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.info.tarikh} ({item.info.hari})
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.info.masaMula} - {item.info.masaTamat}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  <button
                    type="button"
                    title="Salin untuk Kelas Lain (Duplicate)"
                    onClick={(e) => handleDuplicate(item, e)}
                    className="p-2 rounded-xl apple-btn-glass text-xs font-semibold shadow-xs"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    title="Muat Turun Dokumen Word"
                    onClick={(e) => {
                      e.stopPropagation();
                      muatTurunDokumenWord(item);
                    }}
                    className="p-2 rounded-xl apple-btn-blue text-xs font-semibold shadow-xs"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    title="Muat Turun Spreadsheet Excel"
                    onClick={(e) => {
                      e.stopPropagation();
                      muatTurunDokumenSpreadsheet(item);
                    }}
                    className="p-2 rounded-xl apple-btn-emerald text-xs font-semibold shadow-xs"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    title="Padam RPH"
                    onClick={(e) => handleDelete(item.id, e)}
                    className="p-2 rounded-xl apple-btn-rose text-xs font-semibold shadow-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl apple-btn-emerald text-xs font-bold shadow-xs"
                  >
                    <span>Buka RPH</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200/60 bg-white/40 backdrop-blur-md flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl apple-btn-glass text-xs font-bold shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
