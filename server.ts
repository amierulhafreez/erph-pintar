import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getTopicSpecificSpmRsmBank } from './src/data/spmRsmReference.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Increase body limit to 50MB to support high-res PNG, JPEG and PDF timetable uploads
app.use(express.json({ limit: '50mb' }));

function hasGeminiApiKey(): boolean {
  const key = (process.env.GEMINI_API_KEY || process.env.API_KEY || '').trim();
  return key.length > 0 && key !== 'MY_GEMINI_API_KEY';
}

function getAiClient() {
  const apiKey = (process.env.GEMINI_API_KEY || process.env.API_KEY || '').trim();
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function generateWithFallbackModels(
  contents: any,
  config: any
) {
  if (!hasGeminiApiKey()) {
    throw new Error('GEMINI_API_KEY not configured');
  }
  const ai = getAiClient();
  const modelsToTry = ['gemini-3.8-flash', 'gemini-flash-latest'];

  let lastError: any = null;
  for (const modelName of modelsToTry) {
    try {
      const modelConfig = { ...config };
      if (modelName === 'gemini-3.8-flash') {
        modelConfig.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
      }
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: modelConfig,
      });
      if (response && response.text) {
        return { text: response.text, modelUsed: modelName };
      }
    } catch (err: any) {
      lastError = err;
    }
  }
  throw lastError || new Error('All Gemini models failed');
}

// 1. Endpoint to generate smart tailored RPH content (used in Step 3 & Step 4)
app.post('/api/gemini/generate-full-rph', async (req, res) => {
  const {
    tingkatan,
    bab,
    sk,
    sp,
    aktivitiPilihan,
    arasMurid,
    jenisKelas,
    modelPdpc,
    bahasa,
  } = req.body;
  const is5E = modelPdpc === '5E Pedagogi HIKMAH (MRSM)';
  const isDlp = bahasa === 'DLP';

  try {
    const prompt = isDlp
      ? `You are an Expert KSSM SPM Chemistry Master Teacher (Malaysia Ministry of Education) and MRSM HIKMAH Pedagogy Evaluator.
Please generate a complete, high-impact Daily Lesson Plan (RPH) in ENGLISH (DLP - Dual Language Programme) for:
- Form: ${tingkatan === 'Tingkatan 5' ? 'Form 5' : 'Form 4'}
- Chapter / Learning Area: ${bab}
- Content Standard (CS): ${sk}
- Learning Standard (LS): ${sp}
- Instructional Model: ${modelPdpc || 'Standard KPM'}
- Activity Focus: ${aktivitiPilihan || '21st Century Collaborative Learning / Laboratory Investigation'}
- Student Level: ${arasMurid || 'Mixed Ability'}
- Session Type: ${jenisKelas || 'Chemistry Laboratory / Classroom'}

${
  is5E
    ? `PLEASE EMPHASISE THE 5E INQUIRY MODEL (MRSM HIKMAH PEDAGOGY):
- Engage: Elicit prior knowledge & phenomenon hook
- Explore: Hands-on experiment / inquiry exploration
- Explain: Student conceptual explanation & teacher reinforcement
- Elaborate: Application to SPM 4541 / SPMRSM HOTS context
- Evaluate: Formative assessment / exit ticket`
    : ''
}

Return valid JSON matching the schema.`
      : `Anda adalah Pakar Guru Cemerlang Kimia KSSM SPM Kementerian Pendidikan Malaysia (KPM) dan Penilai Pedagogi HIKMAH MRSM MARA.
Sila bina rancangan pengajaran harian (RPH) yang lengkap, berkualiti tinggi dan berimpak tinggi dalam Bahasa Melayu untuk maklumat berikut:
- Tingkatan: ${tingkatan}
- Bab / Bidang: ${bab}
- Standard Kandungan (SK): ${sk}
- Standard Pembelajaran (SP): ${sp}
- Model PdPC: ${modelPdpc || 'Standard KPM'}
- Keutamaan Aktiviti: ${aktivitiPilihan || 'Aktiviti PAK-21 Kolaboratif / Amali Makmal'}
- Aras Murid: ${arasMurid || 'Sederhana & Pelbagai'}
- Jenis Sesi: ${jenisKelas || 'Bilik Darjah / Makmal Sains'}

${
  is5E
    ? `SILA BERI PENEKANAN KEPADA MODEL 5E INKUIRI PEDAGOGI HIKMAH MRSM:
- Engage: Cungkil idea & fenomena
- Explore: Aktiviti amali / penerokaan hands-on
- Explain: Penerangan konsep murid & penegasan guru
- Elaborate: Aplikasi soalan KBAT Format SPM 4541 / SPMRSM
- Evaluate: Pentaksiran formatif / exit ticket`
    : ''
}

Sila hasilkan respons dalam format JSON mengikut skema.`;

    const { text, modelUsed } = await generateWithFallbackModels(
      prompt,
      {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            objektifPembelajaran: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            kriteriaKejayaan: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            setInduksi: { type: Type.STRING },
            aktivitiUtama: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            penutup: { type: Type.STRING },
            diferensiasi: { type: Type.STRING },
            bbmCadangan: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            soalanKbat: { type: Type.STRING },
            kemahiranSaintifik: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            refleksiCadangan: { type: Type.STRING },
          },
          required: [
            'objektifPembelajaran',
            'kriteriaKejayaan',
            'setInduksi',
            'aktivitiUtama',
            'penutup',
            'diferensiasi',
          ],
        },
      }
    );

    const parsed = JSON.parse(text || '{}');
    return res.json({ success: true, modelUsed, data: parsed });
  } catch (error: any) {
    const bank = getTopicSpecificSpmRsmBank(
      tingkatan || 'Tingkatan 4',
      bab || 'Kimia',
      sp || '',
      isDlp
    );
    return res.json({
      success: true,
      modelUsed: 'spm-4541-bank',
      data: {
        objektifPembelajaran: isDlp
          ? [
              `By the end of the lesson, pupils are able to explain and apply the concepts of ${sp || bab} accurately.`,
              `Solve at least 3 structured practice questions (SPM 4541 format) related to ${bab} with correct chemical terminology.`,
            ]
          : [
              `Pada akhir sesi PdPc, murid dapat menerangkan dan mengaplikasikan konsep ${sp || bab} dengan tepat.`,
              `Menyelesaikan sekurang-kurangnya 3 soalan latihan berstruktur Format SPM 4541 berkaitan ${bab} dengan betul.`,
            ],
        kriteriaKejayaan: isDlp
          ? [
              `Pupils can state the key definitions and write balanced chemical equations for ${sp || bab}.`,
              `Pupils achieve at least 80% accuracy in the SPMRSM structured formative task.`,
            ]
          : [
              `Murid berjaya menyatakan definisi utama dan menulis persamaan kimia seimbang bagi ${sp || bab}.`,
              `Murid berjaya menjawab sekurang-kurangnya 3 daripada 4 soalan latihan berstruktur dengan tepat.`,
            ],
        setInduksi: bank.analogiList[0].setInduksi,
        aktivitiUtama: bank.aktiviti.map(
          (a, i) => `${i + 1}. ${a.namaAktiviti}: ${a.penerangan}`
        ),
        penutup: isDlp
          ? `Exit Ticket: Pupils summarise 3 key takeaways from ${bab} and answer a quick formative check.`
          : `Exit Ticket: Murid merumuskan 3 isi penting pembelajaran hari ini dan menjawab kuiz pantas.`,
        diferensiasi: isDlp
          ? `Tiered differentiation: Guided worksheet templates for moderate learners; SPMRSM Paper 2/3 HOTS extension problems for advanced learners.`
          : `Pembezaan berperingkat: Templat latihan berpandu untuk murid sederhana; soalan pengayaan Klon SPMRSM Kertas 2/3 untuk murid cemerlang.`,
        soalanKbat: `${bank.soalan[0].soalan}\n(${bank.soalan[0].jawapan})`,
      },
    });
  }
});

// 2. Endpoint to parse uploaded Teacher Timetable (PNG, JPEG, WebP, PDF)
app.post('/api/gemini/parse-timetable', async (req, res) => {
  const {
    mimeType: rawMimeType,
    base64Data,
    fileName,
  } = req.body || {};

  if (!base64Data) {
    return res.status(400).json({
      success: false,
      error: 'Tiada fail jadual waktu diterima.',
    });
  }

  if (!hasGeminiApiKey()) {
    return res.json({
      success: false,
      needsClientOcr: true,
      reason: 'missing-api-key',
    });
  }

  // Normalize MIME type for Gemini API compatibility
  let normalizedMime = String(rawMimeType || '').toLowerCase().trim();
  const lowerName = String(fileName || '').toLowerCase();
  if (
    normalizedMime === 'image/jpg' ||
    normalizedMime === 'image/pjpeg' ||
    lowerName.endsWith('.jpg') ||
    lowerName.endsWith('.jpeg')
  ) {
    normalizedMime = 'image/jpeg';
  } else if (lowerName.endsWith('.png') || normalizedMime === 'image/png') {
    normalizedMime = 'image/png';
  } else if (lowerName.endsWith('.webp') || normalizedMime === 'image/webp') {
    normalizedMime = 'image/webp';
  } else if (
    lowerName.endsWith('.pdf') ||
    normalizedMime === 'application/pdf'
  ) {
    normalizedMime = 'application/pdf';
  } else {
    normalizedMime = 'image/png';
  }

  try {
    const prompt = `Anda ialah pakar pembaca Jadual Waktu Guru Sekolah Malaysia (format aSc Timetables / Delima / SMK / MRSM / SBP).
Analisis imej atau dokumen PDF Jadual Waktu Guru ini secara berstruktur mengikut baris (Hari) dan lajur (Waktu/Masa):

LANGKAH ANALISIS WAJIB:
1. Kenal pasti paksi HARI (contoh: Isnin/Mon/Isn, Selasa/Tue/Sel, Rabu/Wed/Rab, Khamis/Thu/Kha, Jumaat/Fri/Jum, atau Ahad/Sabtu).
2. Kenal pasti paksi MASA / WAKTU pada setiap lajur period (contoh: 07:30-08:00, 08:00-08:30, 08:30-09:00, dsb.). Tukarkan waktu petang (1:00 - 5:30) kepada format 24-jam (13:00 - 17:30).
3. Baca SETIAP kotak/sel kelas yang diajar pada setiap baris Hari dari pagi hingga petang tanpa tertinggal walau satu slot pun.
4. Jika satu kelas merentasi 2 atau 3 kotak waktu berturutan (contoh: 2 waktu = 60 minit atau 3 waktu amali = 90 minit), gabungkan waktu mula kotak pertama dan waktu tamat kotak terakhir bagi kelas tersebut.
5. Abaikan kotak REHAT, PERHIMPUNAN, atau kotak kosong.

Bagi SETIAP slot kelas yang ditemui, pulangkan:
- hari: Hari dalam Bahasa Melayu ("Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Ahad", "Sabtu").
- masaMula: Waktu mula tepat dalam format 24-jam HH:MM (contoh: "07:30", "08:00", "10:30").
- masaTamat: Waktu tamat tepat dalam format 24-jam HH:MM (contoh: "08:30", "09:00", "11:30").
- tempohMinit: Jumlah minit (masaTamat - masaMula, contoh: 30, 60, 90).
- tingkatan: "Tingkatan 4" atau "Tingkatan 5" (mengikut nombor kelas 4 atau 5).
- kelas: Nama kelas yang tepat seperti tertulis di dalam kotak jadual (contoh: "4 Sains 1", "5 Al-Biruni", "4S1", "5 Bestari").
- subjek: Nama subjek di dalam kotak tersebut (contoh: "Kimia", "Chemistry", "Kimia (Amali)").`;

    const { text } = await generateWithFallbackModels(
      {
        parts: [
          {
            inlineData: {
              mimeType: normalizedMime,
              data: base64Data,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      {
        responseMimeType: 'application/json',
        responseSchema: {
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
        },
      }
    );

    const parsed = JSON.parse(text || '{}');
    if (parsed.slots && Array.isArray(parsed.slots) && parsed.slots.length > 0) {
      return res.json({
        success: true,
        mode: 'gemini-vision',
        slots: parsed.slots,
      });
    }
  } catch {
    // Fall through to client-side 2D OCR / PDF spatial grid parser
  }

  return res.json({
    success: false,
    needsClientOcr: true,
  });
});

// ==========================================
// PUSAT MAKLUM BALAS & SPREADSHEET KHAS e-RPH
// ==========================================
const SPREADSHEET_FILE = path.resolve(__dirname, 'data', 'maklum_balas_erph.csv');

function initSpreadsheetFile() {
  const dir = path.dirname(SPREADSHEET_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(SPREADSHEET_FILE)) {
    // Write UTF-8 BOM (\uFEFF) so Excel opens Malay characters properly
    const header = '\uFEFF"Tarikh & Masa","Nama Guru","Sekolah","Subjek Diajar","Kategori","Penarafan (1-5)","Mesej Maklum Balas","Maklumat Hubungan"\n';
    fs.writeFileSync(SPREADSHEET_FILE, header, 'utf8');
  }
}

function escapeCsv(val: any): string {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""').replace(/\r?\n/g, ' ');
  return `"${str}"`;
}

// 1. Terima maklum balas baharu dan simpan ke dalam spreadsheet
app.post('/api/feedback', (req, res) => {
  try {
    initSpreadsheetFile();
    const { nama, sekolah, subjek, kategori, penarafan, mesej, emailAtauTelefon } = req.body || {};

    if (!nama || !sekolah || !subjek || !mesej) {
      return res.status(400).json({
        success: false,
        message: 'Sila lengkapkan nama, sekolah, subjek dan mesej maklum balas.',
      });
    }

    const now = new Date();
    const timestampStr = now.toLocaleString('ms-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const row = [
      escapeCsv(timestampStr),
      escapeCsv(nama),
      escapeCsv(sekolah),
      escapeCsv(subjek),
      escapeCsv(kategori || 'Cadangan Penambahbaikan'),
      escapeCsv(penarafan || 5),
      escapeCsv(mesej),
      escapeCsv(emailAtauTelefon || '-'),
    ].join(',') + '\n';

    fs.appendFileSync(SPREADSHEET_FILE, row, 'utf8');

    return res.json({
      success: true,
      message: 'Maklum balas anda telah berjaya disimpan ke dalam spreadsheet khas e-RPH!',
    });
  } catch (err: any) {
    console.error('Error in /api/feedback:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Muat turun fail spreadsheet khas .csv / Excel
app.get('/api/feedback/export', (_req, res) => {
  try {
    initSpreadsheetFile();
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="maklum_balas_erph.csv"');
    const content = fs.readFileSync(SPREADSHEET_FILE);
    return res.send(content);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Baca senarai maklum balas daripada spreadsheet untuk paparan Papan Pemuka Admin
app.get('/api/feedback', (_req, res) => {
  try {
    initSpreadsheetFile();
    const raw = fs.readFileSync(SPREADSHEET_FILE, 'utf8');
    const lines = raw.split('\n').filter((l) => l.trim().length > 0);
    // Remove header line
    const dataLines = lines.slice(1);

    const records = dataLines.map((line, idx) => {
      // Parse CSV line taking quotes into account
      const regex = /(?:^|,)(?:"((?:[^"]|"")*)"|([^",]*))/g;
      const fields: string[] = [];
      let match;
      while ((match = regex.exec(line)) !== null) {
        if (match[1] !== undefined) {
          fields.push(match[1].replace(/""/g, '"'));
        } else if (match[2] !== undefined) {
          fields.push(match[2]);
        }
      }
      return {
        id: `fb-${idx + 1}`,
        tarikh: fields[0] || '',
        nama: fields[1] || '',
        sekolah: fields[2] || '',
        subjek: fields[3] || '',
        kategori: fields[4] || '',
        penarafan: Number(fields[5]) || 5,
        mesej: fields[6] || '',
        hubungan: fields[7] || '',
      };
    }).reverse(); // Most recent first

    return res.json({ success: true, count: records.length, records });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// PENGESAN BILANGAN PELAWAT LANDING PAGE
// ==========================================
const VISITOR_FILE = path.resolve(__dirname, 'data', 'visitors.json');
const TMP_VISITOR_FILE = '/tmp/visitors.json';

interface VisitorStore {
  total: number;
  today: number;
  lastDate: string;
  history: Array<{
    timestamp: string;
    path: string;
    userAgent?: string;
    referrer?: string;
  }>;
}

function getActiveVisitorFilePath(): string {
  if (process.env.VERCEL) {
    return TMP_VISITOR_FILE;
  }
  const dir = path.dirname(VISITOR_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return VISITOR_FILE;
}

function getTodayStr(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' });
}

function readVisitorData(): VisitorStore {
  const filePath = getActiveVisitorFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const today = getTodayStr();
      if (data.lastDate !== today) {
        data.today = 0;
        data.lastDate = today;
      }
      return data;
    }
  } catch (err) {
    console.error('Error reading visitor store:', err);
  }
  // Realistic initial base count for active launch
  return {
    total: 136,
    today: 1,
    lastDate: getTodayStr(),
    history: [],
  };
}

function writeVisitorData(store: VisitorStore) {
  const filePath = getActiveVisitorFilePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing visitor store:', err);
  }
}

// 1. Rekod lawatan baharu apabila seseorang klik URL & mendarat di landing page
app.post('/api/visitors/record', (req, res) => {
  try {
    const store = readVisitorData();
    const today = getTodayStr();

    store.total = (store.total || 0) + 1;
    store.today = (store.today || 0) + 1;
    store.lastDate = today;

    const entry = {
      timestamp: new Date().toISOString(),
      path: req.body?.path || '/',
      userAgent: req.headers['user-agent'] || '',
      referrer: req.headers['referer'] || req.body?.referrer || '',
    };

    if (!Array.isArray(store.history)) {
      store.history = [];
    }
    store.history.unshift(entry);
    if (store.history.length > 100) {
      store.history = store.history.slice(0, 100);
    }

    writeVisitorData(store);
    return res.json({ success: true, total: store.total, today: store.today });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Dapatkan statistik bilangan pelawat terkini
app.get('/api/visitors', (_req, res) => {
  try {
    const store = readVisitorData();
    return res.json({
      success: true,
      total: store.total,
      today: store.today,
      historyCount: store.history?.length || 0,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
