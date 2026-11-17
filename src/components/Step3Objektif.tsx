import React, { useState } from 'react';
import { RPHData } from '../types/rph';
import {
  Target,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface Step3ObjektifProps {
  rph: RPHData;
  portalSubject?: string;
  onChange: (updated: Partial<RPHData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step3Objektif: React.FC<Step3ObjektifProps> = ({
  rph,
  portalSubject = 'kimia',
  onChange,
  onPrev,
  onNext,
}) => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const isDlp = rph.bahasa === 'DLP';
  const isPink = portalSubject === 'biologi';
  const isAmber = portalSubject === 'fizik';
  const isTurquoise = portalSubject === 'sains';
  const isIndigo = portalSubject === 'matematik';
  const isCharcoal = portalSubject === 'matematik-tambahan';
  const subjectName = isPink ? 'biologi' : isAmber ? 'fizik' : isTurquoise ? 'sains' : isIndigo ? 'matematik' : isCharcoal ? 'matematik tambahan' : 'kimia';
  const subjectNameEn = isPink ? 'biology' : isAmber ? 'physics' : isTurquoise ? 'science' : isIndigo ? 'mathematics' : isCharcoal ? 'additional mathematics' : 'chemistry';

  const handleUpdateObjective = (index: number, value: string) => {
    const updated = [...rph.objektif];
    updated[index] = value;
    onChange({ objektif: updated });
  };

  const handleAddObjective = () => {
    onChange({
      objektif: [
        ...rph.objektif,
        isDlp
          ? `Explain the key ${subjectNameEn} concepts accurately.`
          : `Menjelaskan konsep ${subjectName} utama dengan tepat.`,
      ],
    });
  };

  const handleRemoveObjective = (index: number) => {
    if (rph.objektif.length <= 1) return;
    const updated = rph.objektif.filter((_, i) => i !== index);
    onChange({ objektif: updated });
  };

  const handleUpdateCriteria = (index: number, value: string) => {
    const updated = [...rph.kriteriaKejayaan];
    updated[index] = value;
    onChange({ kriteriaKejayaan: updated });
  };

  const handleAddCriteria = () => {
    onChange({
      kriteriaKejayaan: [
        ...rph.kriteriaKejayaan,
        isDlp
          ? 'Students can answer at least 3 structured practice questions accurately.'
          : 'Murid berjaya menjawab sekurang-kurangnya 3 soalan latihan dengan tepat.',
      ],
    });
  };

  const handleRemoveCriteria = (index: number) => {
    if (rph.kriteriaKejayaan.length <= 1) return;
    const updated = rph.kriteriaKejayaan.filter((_, i) => i !== index);
    onChange({ kriteriaKejayaan: updated });
  };

  // AI helper: Enhance SMART Objectives
  const handleAiRefine = async () => {
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
          aktivitiPilihan: isDlp
            ? 'SMART Objectives & Differentiated Success Criteria'
            : 'Penekanan Kriteria SMART & Diferensiasi',
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        if (
          json.data.objektifPembelajaran &&
          Array.isArray(json.data.objektifPembelajaran)
        ) {
          onChange({
            objektif: json.data.objektifPembelajaran,
            kriteriaKejayaan:
              json.data.kriteriaKejayaan || rph.kriteriaKejayaan,
          });
        }
      } else {
        setAiError(
          'Gagal menjana bantuan AI. Anda masih boleh menyunting secara manual.'
        );
      }
    } catch (err: any) {
      console.error(err);
      setAiError('Ralat sambungan ke AI server. Sila semak semula.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className={`${
        isPink
          ? 'bg-gradient-to-r from-[#ab4f6c] via-[#b85b79] to-[#993f5b]'
          : isAmber
          ? 'bg-gradient-to-r from-[#ab5e19] via-[#ba6d23] to-[#994f11]'
          : isTurquoise
          ? 'bg-gradient-to-r from-sky-700 via-cyan-700 to-blue-800'
          : isIndigo
          ? 'bg-gradient-to-r from-[#312e81] via-[#3730a3] to-[#4338ca]'
          : isCharcoal
          ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-zinc-900'
          : 'bg-gradient-to-r from-emerald-700 to-teal-800'
      } rounded-2xl p-6 text-white shadow-md`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs mb-2">
              <span>
                Langkah 3 daripada 6 • {isDlp ? 'DLP (English)' : 'Bahasa Melayu'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              {isDlp
                ? 'Learning Objectives & Success Criteria (S.M.A.R.T)'
                : 'Objektif Pembelajaran & Kriteria Kejayaan (S.M.A.R.T)'}
            </h2>
            <p className={`text-sm ${isPink ? 'text-pink-100' : isAmber ? 'text-amber-100' : isTurquoise ? 'text-teal-100' : 'text-emerald-100'} mt-1`}>
              Topik: <strong>{rph.babTajuk}</strong> ({rph.skKod} {rph.skTajuk})
            </p>
          </div>

          <button
            onClick={handleAiRefine}
            disabled={isAiLoading}
            className={`self-start md:self-center inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white ${
              isPink
                ? 'text-pink-900 hover:bg-pink-50'
                : isAmber
                ? 'text-amber-900 hover:bg-amber-50'
                : isTurquoise
                ? 'text-teal-900 hover:bg-teal-50'
                : 'text-emerald-900 hover:bg-emerald-50'
            } text-xs font-bold transition shadow-sm disabled:opacity-50`}
          >
            <Sparkles
              className={`w-4 h-4 ${
                isPink
                  ? 'text-pink-600'
                  : isAmber
                  ? 'text-amber-600'
                  : isTurquoise
                  ? 'text-teal-600'
                  : 'text-emerald-600'
              } ${isAiLoading ? 'animate-spin' : ''}`}
            />
            <span>
              {isAiLoading
                ? isDlp
                  ? 'Generating SMART...'
                : 'Menjana SMART...'
                : isDlp
                ? 'Generate SMART with AI'
                : 'Jana SMART dengan AI'}
            </span>
          </button>
        </div>
      </div>

      {aiError && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          {aiError}
        </div>
      )}

      {/* SMART Guidelines Info Box */}
      <div className={`${
        isPink
          ? 'bg-pink-50/60 border-pink-200 text-pink-900'
          : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
      } rounded-2xl border p-4 flex items-start gap-3 text-xs`}>
        <HelpCircle className={`w-5 h-5 ${isPink ? 'text-pink-700' : 'text-emerald-700'} flex-shrink-0 mt-0.5`} />
        <div>
          <span className="font-bold">
            {isDlp ? 'MOE SMART Guidelines: ' : 'Panduan Format KPM SMART: '}
          </span>
          {isDlp ? (
            <>
              Ensure objectives contain measurable action verbs (e.g.,{' '}
              <em>state, calculate, draw, compare</em>) and achievement criteria
              (e.g., <em>at least 3 out of 4 questions accurately</em>).
            </>
          ) : (
            <>
              Pastikan objektif mengandungi kata kerja boleh diukur (cth:{' '}
              <em>menyatakan, menghitung, melukis, membandingkan</em>) berserta
              darjah pencapaian (cth:{' '}
              <em>sekurang-kurangnya 3 daripada 4 soalan dengan tepat</em>).
            </>
          )}
        </div>
      </div>

      {/* Objektif Pembelajaran Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Target className={`w-4 h-4 ${isPink ? 'text-pink-600' : 'text-emerald-600'}`} />
            <h3 className="text-sm font-bold text-slate-900">
              {isDlp
                ? 'Learning Objectives (SMART)'
                : 'Objektif Pembelajaran (SMART)'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddObjective}
            className={`inline-flex items-center gap-1 text-xs font-bold ${
              isPink ? 'text-pink-600 hover:text-pink-700' : 'text-emerald-600 hover:text-emerald-700'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isDlp ? 'Add Objective' : 'Tambah Objektif'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-500 italic">
          {isDlp
            ? '"By the end of the lesson, pupils will be able to:"'
            : '"Pada akhir sesi pengajaran dan pembelajaran, murid dapat:"'}
        </p>

        <div className="space-y-3">
          {rph.objektif.map((obj, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className={`w-6 h-6 rounded-md ${
                isPink ? 'bg-pink-100 text-pink-800' : 'bg-emerald-100 text-emerald-800'
              } text-xs font-bold flex items-center justify-center flex-shrink-0 mt-2`}>
                {index + 1}
              </span>
              <textarea
                rows={2}
                value={obj.replace(/^(\d+[\.\)]\s*|[-*•]\s*)/, '')}
                onChange={(e) => handleUpdateObjective(index, e.target.value)}
                className={`flex-1 p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 ${
                  isPink ? 'focus:ring-pink-500/20 focus:border-pink-500' : 'focus:ring-emerald-500/20 focus:border-emerald-500'
                } bg-white`}
                placeholder={
                  isDlp
                    ? 'Write learning objective...'
                    : 'Tuliskan objektif pembelajaran...'
                }
              />
              {rph.objektif.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveObjective(index)}
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

      {/* Kriteria Kejayaan (Success Criteria) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-4 h-4 ${isPink ? 'text-rose-500' : 'text-teal-600'}`} />
            <h3 className="text-sm font-bold text-slate-900">
              {isDlp
                ? 'Success Criteria'
                : 'Kriteria Kejayaan (Success Criteria)'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddCriteria}
            className={`inline-flex items-center gap-1 text-xs font-bold ${
              isPink ? 'text-rose-500 hover:text-rose-600' : 'text-teal-600 hover:text-teal-700'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isDlp ? 'Add Criteria' : 'Tambah Kriteria'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-500 italic">
          {isDlp
            ? '"Pupils are successful if they can:"'
            : '"Murid berjaya jika dapat:"'}
        </p>

        <div className="space-y-3">
          {rph.kriteriaKejayaan.map((crit, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className={`w-6 h-6 rounded-md ${
                isPink ? 'bg-rose-100 text-rose-800' : 'bg-teal-100 text-teal-800'
              } text-xs font-bold flex items-center justify-center flex-shrink-0 mt-2`}>
                ✓
              </span>
              <textarea
                rows={2}
                value={crit.replace(/^(\d+[\.\)]\s*|[-*•]\s*)/, '')}
                onChange={(e) => handleUpdateCriteria(index, e.target.value)}
                className={`flex-1 p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 ${
                  isPink ? 'focus:ring-rose-500/20 focus:border-rose-500' : 'focus:ring-teal-500/20 focus:border-teal-500'
                } bg-white`}
                placeholder={
                  isDlp
                    ? 'Write success criteria...'
                    : 'Tuliskan kriteria kejayaan murid...'
                }
              />
              {rph.kriteriaKejayaan.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCriteria(index)}
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
            {isDlp ? 'Next: Lesson Activities' : 'Seterusnya: Aktiviti PdPC'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
