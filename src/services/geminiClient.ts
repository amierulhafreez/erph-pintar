import { GoogleGenAI, Type } from '@google/genai';
import { SlotJadualWaktu, Tingkatan } from '../types/rph';
import { analyzeTimetableFileClientSide } from '../utils/timetableParser';

function getBrowserGeminiClient(): GoogleGenAI {
  const apiKey =
    (typeof window !== 'undefined' &&
      ((window as any).GEMINI_API_KEY ||
        (window as any).API_KEY ||
        (window as any).process?.env?.GEMINI_API_KEY ||
        (window as any).process?.env?.API_KEY)) ||
    process.env.GEMINI_API_KEY ||
    'GEMINI_API_KEY';

  return new GoogleGenAI({ apiKey });
}

function normalizeMimeType(rawMime: string, fileName: string): string {
  const mime = String(rawMime || '').toLowerCase().trim();
  const lower = String(fileName || '').toLowerCase().trim();
  if (
    mime === 'image/jpg' ||
    mime === 'image/pjpeg' ||
    lower.endsWith('.jpg') ||
    lower.endsWith('.jpeg')
  ) {
    return 'image/jpeg';
  }
  if (mime === 'image/png' || lower.endsWith('.png')) {
    return 'image/png';
  }
  if (mime === 'image/webp' || lower.endsWith('.webp')) {
    return 'image/webp';
  }
  if (mime === 'application/pdf' || lower.endsWith('.pdf')) {
    return 'application/pdf';
  }
  return 'image/png';
}

function calculateDurationFromTimes(startStr: string, endStr: string): number {
  const [h1, m1] = String(startStr || '')
    .split(':')
    .map(Number);
  const [h2, m2] = String(endStr || '')
    .split(':')
    .map(Number);
  if (!isNaN(h1) && !isNaN(m1) && !isNaN(h2) && !isNaN(m2)) {
    const diff = h2 * 60 + m2 - (h1 * 60 + m1);
    if (diff > 0 && diff <= 300) return diff;
  }
  return 60;
}

/**
 * Parses an uploaded Teacher Timetable (PNG, JPEG, WebP, or PDF) using Gemini Vision
 * directly in the browser (leveraging AI Studio's iframe fetch bridge) just like the original
 * implementation, extracting every single class slot in the timetable.
 */
export async function parseTeacherTimetableWithAi(
  file: File,
  base64Data: string,
  dataUrl: string,
  defaultKelas: string = '4 Sains 1'
): Promise<SlotJadualWaktu[]> {
  const mimeType = normalizeMimeType(file.type, file.name);

  const prompt = `Analisis imej atau dokumen PDF Jadual Waktu Guru ini dengan sangat teliti.
Senaraikan SETIAP SATU slot kelas pengajaran yang terdapat di dalam jadual waktu ini (dari hari Isnin/Ahad hingga Jumaat) tanpa tertinggal walau satu kelas pun.

Arahan penting:
1. Perhatikan paksi HARI (Isnin, Selasa, Rabu, Khamis, Jumaat, Ahad, Sabtu) dan paksi MASA / WAKTU pada jadual.
2. Baca setiap kotak kelas pengajaran yang ada dalam jadual tersebut mengikut hari dan waktu sebenarnya.
3. Jika satu kelas yang sama berterusan untuk 2 atau 3 waktu berturutan (contohnya 2 waktu = 60 minit atau 3 waktu = 90 minit), gabungkan waktu mula kotak pertama dan waktu tamat kotak terakhir bagi sesi kelas tersebut.
4. Tukarkan waktu petang (contoh 1:00 - 5:30) kepada format 24-jam (13:00 - 17:30).
5. Jangan abaikan mana-mana kelas yang diajar oleh guru ini — keluarkan setiap satu maklumat kelas yang ada dalam jadual tersebut.

Bagi setiap slot kelas yang ditemui, ekstrak:
- hari: Hari dalam Bahasa Melayu ("Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Ahad", "Sabtu").
- masaMula: Waktu mula dalam format 24-jam HH:MM (contoh: "07:30", "08:00", "10:30").
- masaTamat: Waktu tamat dalam format 24-jam HH:MM (contoh: "08:30", "09:00", "11:30").
- tempohMinit: Tempoh masa dalam minit (contoh: 30, 60, 90).
- tingkatan: "Tingkatan 4" atau "Tingkatan 5" (jika kelas Tingkatan 5 letakkan "Tingkatan 5", selain itu letakkan "Tingkatan 4").
- kelas: Nama kelas tepat seperti yang tertera pada jadual (contoh: "4 Sains 1", "5 Al-Biruni", "4 Bestari", "5S1").
- subjek: Nama subjek seperti yang tertera di dalam kotak jadual (contoh: "Kimia", "Chemistry", "Sains").`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      slots: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            hari: { type: Type.STRING },
            masaMula: { type: Type.STRING },
            masaTamat: { type: Type.STRING },
            tempohMinit: { type: Type.NUMBER },
            tingkatan: { type: Type.STRING },
            kelas: { type: Type.STRING },
            subjek: { type: Type.STRING },
          },
          required: [
            'hari',
            'masaMula',
            'masaTamat',
            'tempohMinit',
            'tingkatan',
            'kelas',
          ],
        },
      },
    },
    required: ['slots'],
  };

  const modelsToTry = [
    'gemini-2.5-flash',
    'gemini-3-flash-preview',
    'gemini-3.8-flash',
    'gemini-flash-latest',
  ];

  // 1. Primary path: Direct client-side Gemini Vision call (proxied by AI Studio iframe bridge)
  const ai = getBrowserGeminiClient();
  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [
          {
            inlineData: {
              mimeType,
              data: base64Data,
            },
          },
          {
            text: prompt,
          },
        ],
        config: {
          responseMimeType: 'application/json',
          responseSchema,
        },
      });

      const text = response?.text;
      if (text) {
        const parsed = JSON.parse(text);
        if (parsed?.slots && Array.isArray(parsed.slots) && parsed.slots.length > 0) {
          return parsed.slots.map((s: any, idx: number) => {
            const masaMula = s.masaMula || '08:00';
            const masaTamat = s.masaTamat || '09:00';
            const tempohMinit =
              Number(s.tempohMinit) ||
              calculateDurationFromTimes(masaMula, masaTamat);
            const kelasStr = String(s.kelas || defaultKelas || '4 Sains 1').trim();
            const tingkatan: Tingkatan =
              s.tingkatan === 'Tingkatan 5' || kelasStr.startsWith('5')
                ? 'Tingkatan 5'
                : 'Tingkatan 4';
            return {
              id: `slot_${Date.now()}_${idx}`,
              hari: s.hari || 'Isnin',
              masaMula,
              masaTamat,
              tempohMinit,
              tingkatan,
              kelas: kelasStr,
              subjek: s.subjek || 'Kimia',
            };
          });
        }
      }
    } catch {
      // Try next model in list
    }
  }

  // 2. Secondary path: Try server endpoint if GEMINI_API_KEY is configured on server
  try {
    const res = await fetch('/api/gemini/parse-timetable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mimeType,
        base64Data,
        fileName: file.name,
      }),
    });
    const json = await res.json();
    if (json.success && Array.isArray(json.slots) && json.slots.length > 0) {
      return json.slots.map((s: any, idx: number) => ({
        id: `slot_${Date.now()}_${idx}`,
        hari: s.hari || 'Isnin',
        masaMula: s.masaMula || '08:00',
        masaTamat: s.masaTamat || '09:00',
        tempohMinit:
          Number(s.tempohMinit) ||
          calculateDurationFromTimes(s.masaMula, s.masaTamat),
        tingkatan:
          s.tingkatan === 'Tingkatan 5' ||
          String(s.kelas || '').trim().startsWith('5')
            ? 'Tingkatan 5'
            : 'Tingkatan 4',
        kelas: s.kelas || defaultKelas || '4 Sains 1',
        subjek: s.subjek || 'Kimia',
      }));
    }
  } catch {
    // Proceed to spatial parser fallback
  }

  // 3. Final fallback: Client-side PDF / OCR spatial parser
  const fallbackResult = await analyzeTimetableFileClientSide(file, dataUrl);
  return fallbackResult.slots.map((s, idx) => ({
    id: `slot_${Date.now()}_${idx}`,
    ...s,
  }));
}
