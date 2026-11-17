import React, { useState } from 'react';
import { RPHData } from '../types/rph';
import {
  SENARAI_ATRIBUT_HIKMAH,
  SENARAI_SIKAP_MRSM,
  PANDUAN_5E_HIKMAH,
} from '../data/pedagogiData';
import {
  Sparkles,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  FlaskConical,
  Clock,
  Layers,
  HelpCircle,
  Check,
  Compass,
} from 'lucide-react';

interface Step4AktivitiProps {
  rph: RPHData;
  portalSubject?: string;
  onChange: (updated: Partial<RPHData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step4Aktiviti: React.FC<Step4AktivitiProps> = ({
  rph,
  portalSubject = 'kimia',
  onChange,
  onPrev,
  onNext,
}) => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const is5E = rph.modelPdpc === '5E Pedagogi HIKMAH (MRSM)';
  const isDlp = rph.bahasa === 'DLP';
  const isPink = portalSubject === 'biologi';
  const isAmber = portalSubject === 'fizik';
  const isTurquoise = portalSubject === 'sains';
  const isIndigo = portalSubject === 'matematik';
  const isCharcoal = portalSubject === 'matematik-tambahan';

  const handleUpdateAktivitiUtama = (index: number, val: string) => {
    const updated = [...rph.aktivitiUtama];
    updated[index] = val;
    onChange({ aktivitiUtama: updated });
  };

  const handleAddAktivitiUtama = () => {
    onChange({
      aktivitiUtama: [
        ...rph.aktivitiUtama,
        isDlp
          ? 'Students present their findings briefly in front of the class.'
          : 'Murid membentangkan dapatan secara ringkas di hadapan kelas.',
      ],
    });
  };

  const handleRemoveAktivitiUtama = (index: number) => {
    if (rph.aktivitiUtama.length <= 1) return;
    const updated = rph.aktivitiUtama.filter((_, i) => i !== index);
    onChange({ aktivitiUtama: updated });
  };

  const handle5EChange = (phase: keyof RPHData['aktiviti5E'], val: string) => {
    onChange({
      aktiviti5E: {
        ...rph.aktiviti5E,
        [phase]: val,
      },
    });
  };

  const toggleAtributHikmah = (item: string) => {
    const current = rph.atributHikmah || [];
    if (current.includes(item)) {
      onChange({ atributHikmah: current.filter((x) => x !== item) });
    } else {
      onChange({ atributHikmah: [...current, item] });
    }
  };

  const toggleSikapMrsm = (item: string) => {
    const current = rph.nilaiSikapMrsm || [];
    if (current.includes(item)) {
      onChange({ nilaiSikapMrsm: current.filter((x) => x !== item) });
    } else {
      onChange({ nilaiSikapMrsm: [...current, item] });
    }
  };

  const handleAiGenerateActivities = async () => {
    setIsAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch('/api/gemini/generate-full-rph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tingkatan: rph.info.tingkatan,
          bab: rph.babTajuk,
          sk: `${rph.skKod} ${rph.skTajuk}`,
          sp: rph.spTajuk.join('; '),
          bahasa: rph.bahasa || 'BM',
          modelPdpc: rph.modelPdpc,
          aktivitiPilihan: is5E
            ? 'Model 5E Inkuiri Pedagogi HIKMAH MRSM (Engage, Explore, Explain, Elaborate, Evaluate)'
            : rph.isEksperimen
            ? 'Amali Makmal Kimia & Langkah Keselamatan'
            : 'Aktiviti PAK-21 Kolaboratif Menyeronokkan',
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        if (is5E) {
          onChange({
            aktiviti5E: {
              engage: json.data.setInduksi || rph.aktiviti5E.engage,
              explore: json.data.aktivitiUtama?.[0] || rph.aktiviti5E.explore,
              explain: json.data.aktivitiUtama?.[1] || rph.aktiviti5E.explain,
              elaborate: json.data.soalanKbat
                ? `${isDlp ? 'HOTS Application' : 'Aplikasi KBAT'}: ${json.data.soalanKbat}`
                : rph.aktiviti5E.elaborate,
              evaluate: json.data.penutup || rph.aktiviti5E.evaluate,
            },
            diferensiasi: json.data.diferensiasi || rph.diferensiasi,
          });
        } else {
          onChange({
            setInduksi: json.data.setInduksi || rph.setInduksi,
            aktivitiUtama: json.data.aktivitiUtama || rph.aktivitiUtama,
            penutup: json.data.penutup || rph.penutup,
            diferensiasi: json.data.diferensiasi || rph.diferensiasi,
          });
        }
      } else {
        setAiError('Gagal menjana idea aktiviti AI. Sila semak semula.');
      }
    } catch (e: any) {
      console.error(e);
      setAiError('Ralat sambungan AI.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div
        className={`rounded-2xl p-6 text-white shadow-md transition-all ${
          is5E
            ? 'bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900'
            : isPink
            ? 'bg-gradient-to-r from-[#ab4f6c] via-[#b85b79] to-[#993f5b]'
            : isAmber
            ? 'bg-gradient-to-r from-[#ab5e19] via-[#ba6d23] to-[#994f11]'
            : isTurquoise
            ? 'bg-gradient-to-r from-sky-700 via-cyan-700 to-blue-800'
            : isIndigo
            ? 'bg-gradient-to-r from-[#312e81] via-[#3730a3] to-[#4338ca]'
            : isCharcoal
            ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-zinc-900'
            : 'bg-gradient-to-r from-teal-700 to-cyan-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs mb-2">
              <span>
                Langkah 4 daripada 6 • {isDlp ? 'DLP (English)' : 'Bahasa Melayu'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              {is5E
                ? 'Kerangka 5E Pedagogi HIKMAH (MRSM)'
                : isDlp
                ? 'Teaching & Learning Activities Framework (PdPC)'
                : 'Kerangka Aktiviti Pengajaran & Pembelajaran (PdPC)'}
            </h2>
            <p className="text-sm opacity-90 mt-1">
              {is5E
                ? 'Model 5E Inkuiri: Engage, Explore, Explain, Elaborate, Evaluate dengan penerapan Atribut HIKMAH.'
                : isDlp
                ? 'Organize set induction, 21st-century collaborative activities, closure, and differentiation.'
                : 'Susun fasa set induksi, aktiviti utama PAK-21, penutup, dan strategi pembezaan.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
            <button
              onClick={handleAiGenerateActivities}
              disabled={isAiLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition shadow-sm disabled:opacity-50"
            >
              <Sparkles
                className={`w-4 h-4 text-indigo-600 ${
                  isAiLoading ? 'animate-spin' : ''
                }`}
              />
              <span>
                {isAiLoading
                  ? isDlp
                    ? 'Generating...'
                    : 'Menjana Aktiviti...'
                  : is5E
                  ? 'Jana 5E dengan AI'
                  : isDlp
                  ? 'Suggest Activities with AI'
                  : 'Cadang Aktiviti AI'}
              </span>
            </button>
          </div>
        </div>

        {/* Quick Model Switcher inside Step 4 */}
        <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-white/80">
            {isDlp ? 'Switch Lesson Model:' : 'Tukar Format PdPC:'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange({ modelPdpc: 'Standard KPM' })}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                !is5E
                  ? isPink ? 'bg-white text-pink-900 shadow-xs' : 'bg-white text-teal-900 shadow-xs'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {isDlp ? 'MOE Standard (3 Phases)' : 'Model Standard KPM (3 Fasa)'}
            </button>
            <button
              type="button"
              onClick={() =>
                onChange({ modelPdpc: '5E Pedagogi HIKMAH (MRSM)' })
              }
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                is5E
                  ? 'bg-indigo-400 text-slate-950 shadow-xs'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>5E Pedagogi HIKMAH (MRSM)</span>
            </button>
          </div>
        </div>
      </div>

      {aiError && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          {aiError}
        </div>
      )}

      {/* Amali Wajib Notice if applicable */}
      {rph.isEksperimen && (
        <div className="bg-red-50 rounded-2xl border border-red-200 p-4 flex items-start gap-3">
          <FlaskConical className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-red-900">
            <p className="font-bold">
              {isDlp
                ? `Compulsory SPM Experiment Mode: ${rph.namaEksperimen}`
                : `PdPC Mod Eksperimen Wajib SPM: ${rph.namaEksperimen}`}
            </p>
            <p className="text-red-700">
              {isDlp
                ? 'Ensure practical steps adhere to lab safety briefings (PPE) and manipulative skills.'
                : 'Pastikan langkah amali mematuhi taklimat keselamatan makmal (PPE) dan amalan kemahiran manipulatif (KMS).'}
            </p>
            {rph.radasBahanEksperimen &&
              rph.radasBahanEksperimen.length > 0 && (
                <p className="text-[11px] text-red-600 pt-1">
                  <strong>
                    {isDlp ? 'Apparatus & Materials:' : 'Radas & Bahan:'}
                  </strong>{' '}
                  {rph.radasBahanEksperimen.join(', ')}
                </p>
              )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5E PEDAGOGI HIKMAH MRSM MODE */}
      {/* ============================================================ */}
      {is5E ? (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-indigo-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Penerapan Atribut HIKMAH (Panduan Guru MRSM)
                </h3>
              </div>
              <span className="text-[11px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-md">
                Pilih yang berkaitan
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SENARAI_ATRIBUT_HIKMAH.map((item) => {
                const isSelected = rph.atributHikmah?.includes(item);
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleAtributHikmah(item)}
                    className={`p-2.5 text-left rounded-xl border text-xs font-semibold transition flex items-start gap-2 ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-1 ring-indigo-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Nilai Teras SIKAP Pelajar MRSM
            </h4>
            <div className="flex flex-wrap gap-2">
              {SENARAI_SIKAP_MRSM.map((item) => {
                const isSelected = rph.nilaiSikapMrsm?.includes(item);
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleSikapMrsm(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5E Phase 1: Engage */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span>Engage (Penglibatan / Cungkil Idea)</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {PANDUAN_5E_HIKMAH.engage.fokus}
                </p>
              </div>
              <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                {PANDUAN_5E_HIKMAH.engage.cadanganMasa}
              </span>
            </div>
            <textarea
              rows={3}
              value={rph.aktiviti5E.engage}
              onChange={(e) => handle5EChange('engage', e.target.value)}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              placeholder="Aktiviti fasa Engage..."
            />
          </div>

          {/* 5E Phase 2: Explore */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span>Explore (Penerokaan / Inkuiri Saintifik)</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {PANDUAN_5E_HIKMAH.explore.fokus}
                </p>
              </div>
              <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                {PANDUAN_5E_HIKMAH.explore.cadanganMasa}
              </span>
            </div>
            <textarea
              rows={3}
              value={rph.aktiviti5E.explore}
              onChange={(e) => handle5EChange('explore', e.target.value)}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              placeholder="Aktiviti fasa Explore..."
            />
          </div>

          {/* 5E Phase 3: Explain */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <span>Explain (Penerangan / Konseptualisasi)</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {PANDUAN_5E_HIKMAH.explain.fokus}
                </p>
              </div>
              <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full">
                {PANDUAN_5E_HIKMAH.explain.cadanganMasa}
              </span>
            </div>
            <textarea
              rows={3}
              value={rph.aktiviti5E.explain}
              onChange={(e) => handle5EChange('explain', e.target.value)}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              placeholder="Aktiviti fasa Explain..."
            />
          </div>

          {/* 5E Phase 4: Elaborate */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <span>Elaborate (Pengembangan / Aplikasi KBAT)</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {PANDUAN_5E_HIKMAH.elaborate.fokus}
                </p>
              </div>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                {PANDUAN_5E_HIKMAH.elaborate.cadanganMasa}
              </span>
            </div>
            <textarea
              rows={3}
              value={rph.aktiviti5E.elaborate}
              onChange={(e) => handle5EChange('elaborate', e.target.value)}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              placeholder="Aktiviti fasa Elaborate..."
            />
          </div>

          {/* 5E Phase 5: Evaluate */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-rose-100 text-rose-800 text-xs font-bold flex items-center justify-center">
                    5
                  </span>
                  <span>Evaluate (Penilaian / Pentaksiran Formatif)</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {PANDUAN_5E_HIKMAH.evaluate.fokus}
                </p>
              </div>
              <span className="text-xs text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-full">
                {PANDUAN_5E_HIKMAH.evaluate.cadanganMasa}
              </span>
            </div>
            <textarea
              rows={3}
              value={rph.aktiviti5E.evaluate}
              onChange={(e) => handle5EChange('evaluate', e.target.value)}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              placeholder="Aktiviti fasa Evaluate..."
            />
          </div>

          {/* Strategi Pembezaan */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Strategi Pembezaan (Differentiation)</span>
            </h4>
            <textarea
              rows={2}
              value={rph.diferensiasi}
              onChange={(e) => onChange({ diferensiasi: e.target.value })}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              placeholder="Strategi pembezaan pengajaran..."
            />
          </div>
        </div>
      ) : (
        /* ============================================================ */
        /* STANDARD KPM 3-PHASE MODE */
        /* ============================================================ */
        <div className="space-y-6">
          {/* 1. Set Induksi */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {isDlp
                    ? '1. Starter Phase: Set Induction (5 - 10 Minutes)'
                    : '1. Fasa Permulaan: Set Induksi (5 - 10 Minit)'}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                {isDlp ? 'Spark Interest & Inquiry' : 'Merangsang Minat & Inkuiri'}
              </span>
            </div>

            <textarea
              rows={3}
              value={rph.setInduksi}
              onChange={(e) => onChange({ setInduksi: e.target.value })}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
              placeholder={
                isDlp
                  ? 'Write set induction activity...'
                  : 'Tuliskan aktiviti set induksi...'
              }
            />
          </div>

          {/* 2. Aktiviti Utama */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {isDlp
                    ? '2. Development Phase: Main PdPC & 21st Century Activities'
                    : '2. Fasa Perkembangan: Aktiviti Utama PdPC & PAK-21'}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleAddAktivitiUtama}
                className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isDlp ? 'Add Step' : 'Tambah Langkah'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {rph.aktivitiUtama.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-md bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-2">
                    {idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    value={step.replace(/^(\d+[\.\)]\s*|[-*•]\s*)/, '')}
                    onChange={(e) =>
                      handleUpdateAktivitiUtama(idx, e.target.value)
                    }
                    className="flex-1 p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                    placeholder={`Langkah ${idx + 1}...`}
                  />
                  {rph.aktivitiUtama.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAktivitiUtama(idx)}
                      className="p-2 text-slate-400 hover:text-red-500 transition mt-1"
                      title="Padam"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Penutup */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {isDlp
                    ? '3. Closure Phase: Plenary & Quick Assessment (5 - 10 Minutes)'
                    : '3. Fasa Penutup: Rumusan & Pentaksiran Pantas (5 - 10 Minit)'}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700">
                Exit Ticket / Refleksi Kendiri
              </span>
            </div>

            <textarea
              rows={2}
              value={rph.penutup}
              onChange={(e) => onChange({ penutup: e.target.value })}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-white"
              placeholder={
                isDlp
                  ? 'Write closure activity...'
                  : 'Tuliskan aktiviti penutup...'
              }
            />
          </div>

          {/* 4. Strategi Pembezaan */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {isDlp
                    ? 'Differentiation Strategy'
                    : 'Strategi Pembezaan (Diferensiasi Murid)'}
                </h3>
              </div>
            </div>
            <textarea
              rows={2}
              value={rph.diferensiasi}
              onChange={(e) => onChange({ diferensiasi: e.target.value })}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
              placeholder={
                isDlp
                  ? 'Differentiation strategy...'
                  : 'Strategi pembezaan pengajaran...'
              }
            />
          </div>
        </div>
      )}

      {/* Navigation bottom */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isDlp ? 'Back' : 'Kembali'}</span>
        </button>
        <button
          onClick={onNext}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl ${
            isPink
              ? 'bg-pink-600 hover:bg-pink-700 shadow-pink-600/25'
              : isAmber
              ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
              : isTurquoise
              ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20'
              : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
          } text-white font-semibold text-sm transition shadow-md`}
        >
          <span>
            {isDlp
              ? 'Next: Elements & Assessment'
              : 'Seterusnya: Elemen & Pentaksiran'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
