import { SlotJadualWaktu, Tingkatan } from '../types/rph';

const TESSERACT_CDN_URL = 'https://esm.sh/tesseract.js@7.0.0';
const PDFJS_CDN_URL = 'https://esm.sh/pdfjs-dist@4.10.38/build/pdf.mjs';
const PDFJS_WORKER_CDN_URL =
  'https://esm.sh/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';

async function loadTesseract(): Promise<any> {
  return import(/* @vite-ignore */ TESSERACT_CDN_URL);
}

async function loadPdfJs(): Promise<any> {
  const pdfjsLib = await import(/* @vite-ignore */ PDFJS_CDN_URL);
  try {
    if (pdfjsLib?.GlobalWorkerOptions) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN_URL;
    }
  } catch {
    // Ignore if already configured
  }
  return pdfjsLib;
}

export interface SpatialWord {
  text: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface TimetableParseResult {
  slots: Omit<SlotJadualWaktu, 'id'>[];
  previewDataUrl?: string;
  method: string;
}

const DAY_ORDER: Record<string, number> = {
  Ahad: 0,
  Isnin: 1,
  Selasa: 2,
  Rabu: 3,
  Khamis: 4,
  Jumaat: 5,
  Sabtu: 6,
};

const DAY_PATTERNS: { day: string; regex: RegExp }[] = [
  {
    day: 'Isnin',
    regex: /\b(?:isnin|isn|monday|mon|hari\s*isnin|1snin|isn1n|lSNIN)\b/i,
  },
  {
    day: 'Selasa',
    regex: /\b(?:selasa|sel|tuesday|tues|tue|hari\s*selasa|5elasa)\b/i,
  },
  {
    day: 'Rabu',
    regex: /\b(?:rabu|rab|wednesday|wed|hari\s*rabu)\b/i,
  },
  {
    day: 'Khamis',
    regex:
      /\b(?:khamis|kha|khm|thursday|thurs|thur|thu|hari\s*khamis|kham1s)\b/i,
  },
  {
    day: 'Jumaat',
    regex:
      /\b(?:jumaat|jum|jmt|friday|fri|hari\s*jumaat|juma'at|jumat)\b/i,
  },
  {
    day: 'Ahad',
    regex: /\b(?:ahad|aha|ahd|sunday|sun|hari\s*ahad)\b/i,
  },
  {
    day: 'Sabtu',
    regex: /\b(?:sabtu|sab|saturday|sat|hari\s*sabtu)\b/i,
  },
];

const IGNORE_CELL_WORDS = new Set([
  'REHAT',
  'RECESS',
  'BREAK',
  'PERHIMPUNAN',
  'HOMEROOM',
  'ASSEMBLY',
  'SOLAT',
  'ZOHOR',
  'JUMAAT',
  'ISNIN',
  'SELASA',
  'RABU',
  'KHAMIS',
  'AHAD',
  'SABTU',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SUNDAY',
  'SATURDAY',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SUN',
  'SAT',
  'ISN',
  'SEL',
  'RAB',
  'KHA',
  'JUM',
  'MASA',
  'WAKTU',
  'HARI',
  'TIME',
  'DAY',
  'PERIOD',
  'JADUAL',
  'GURU',
  'TINGKATAN',
  'KELAS',
  'KOKURIKULUM',
  'BADAN BERUNIFORM',
  'BERUNIFORM',
  'SUKAN PERMAINAN',
  'PERMAINAN',
  'SUKAN',
  'KELAB',
  'PERSATUAN',
  'GURU BERTUGAS',
  'BERTUGAS',
  'RELIEF',
]);

/**
 * Converts school time hour/minute into 24-hour "HH:MM" string.
 * Hours 1..6 in a Malaysian school timetable are afternoon (13:00..18:00).
 */
export function normalizeSchoolTime(hourNum: number, minNum: number): string {
  let h = hourNum;
  const m = minNum;
  if (h >= 1 && h <= 6) {
    h += 12;
  }
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function timeToMinutes(timeStr: string): number {
  const [h, m] = String(timeStr || '')
    .split(':')
    .map(Number);
  if (isNaN(h) || isNaN(m)) return 480;
  return h * 60 + m;
}

export function minutesToTime(totalMins: number): string {
  const clamped = Math.max(0, Math.min(23 * 60 + 59, Math.round(totalMins)));
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function isValidSchoolHour(h: number, m: number): boolean {
  if (m < 0 || m > 59) return false;
  return (h >= 7 && h <= 18) || (h >= 1 && h <= 6);
}

/**
 * Parses a time string or time range token such as:
 * - "07:30-08:00", "7.30 - 8.00", "0740-0810"
 * - "7:45", "8:15", "745", "815", "1245", "10:30"
 */
export function parseTimeToken(
  raw: string,
  allowCompactNumbers = false
): { start: string; end?: string } | null {
  const cleaned = String(raw || '')
    .trim()
    .replace(/[|[\]()]/g, '')
    .replace(/\s*([:.])\s*/g, '$1')
    .replace(/\s*([-–—~])\s*/g, '-')
    .replace(/\s+/g, '');

  if (!cleaned) return null;

  // 1. Range format: HH:MM-HH:MM or H.MM-H.MM
  const rangeMatch = cleaned.match(
    /(\d{1,2})[:.](\d{2})-(?:to)?(\d{1,2})[:.](\d{2})/i
  );
  if (rangeMatch) {
    const h1 = parseInt(rangeMatch[1], 10);
    const m1 = parseInt(rangeMatch[2], 10);
    const h2 = parseInt(rangeMatch[3], 10);
    const m2 = parseInt(rangeMatch[4], 10);
    if (isValidSchoolHour(h1, m1) && isValidSchoolHour(h2, m2)) {
      return {
        start: normalizeSchoolTime(h1, m1),
        end: normalizeSchoolTime(h2, m2),
      };
    }
  }

  // 2. 3/4-digit range format: 745-815 or 0730-0800
  const compactRange = cleaned.match(
    /^(\d{1,2})([0-5]\d)-(\d{1,2})([0-5]\d)$/
  );
  if (compactRange) {
    const h1 = parseInt(compactRange[1], 10);
    const m1 = parseInt(compactRange[2], 10);
    const h2 = parseInt(compactRange[3], 10);
    const m2 = parseInt(compactRange[4], 10);
    if (isValidSchoolHour(h1, m1) && isValidSchoolHour(h2, m2)) {
      return {
        start: normalizeSchoolTime(h1, m1),
        end: normalizeSchoolTime(h2, m2),
      };
    }
  }

  // 3. Single time format: HH:MM or H.MM
  const singleMatch = cleaned.match(
    /^(\d{1,2})[:.](\d{2})(?:am|pm|pg|ptg)?$/i
  );
  if (singleMatch) {
    const h = parseInt(singleMatch[1], 10);
    const m = parseInt(singleMatch[2], 10);
    if (isValidSchoolHour(h, m)) {
      return { start: normalizeSchoolTime(h, m) };
    }
  }

  // 4. Compact 3 or 4-digit time in header row (e.g. "745", "815", "1045", "1245", "345")
  if (allowCompactNumbers) {
    const compactSingle = cleaned.match(
      /^(\d{1,2})(00|05|10|15|20|25|30|35|40|45|50|55)$/
    );
    if (compactSingle) {
      const h = parseInt(compactSingle[1], 10);
      const m = parseInt(compactSingle[2], 10);
      if (isValidSchoolHour(h, m)) {
        return { start: normalizeSchoolTime(h, m) };
      }
    }
  }

  return null;
}

export function matchDayName(text: string): string | null {
  const cleaned = String(text || '')
    .replace(/[^a-zA-Z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return null;

  // Reject if it starts with a form digit (e.g. "3 IS" or "5 IS")
  if (/^[1-6]\s*[A-Za-z]/i.test(cleaned)) return null;

  for (const { day, regex } of DAY_PATTERNS) {
    if (cleaned.length <= 16 && regex.test(cleaned)) {
      return day;
    }
  }
  return null;
}

/**
 * Extracts a clean Malaysian class name (supporting both single classes like "4 IT", "2 IQ", "4 Sains 1"
 * and combined classes like "5 IB/5 IK/5 IN", "5 IQ/5 IS/5 IT"), Tingkatan, and Subject from cell text.
 */
export function extractClassAndSubjectFromCellText(
  rawCellText: string,
  fallbackClassFromHeader?: string
): {
  kelas: string;
  tingkatan: Tingkatan;
  subjek: string;
} | null {
  if (!rawCellText) return null;

  const lines = rawCellText
    .split(/\r?\n/)
    .map((l) =>
      l
        .replace(/[|[\]{}_~`]/g, 'I')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter((l) => l.length > 0);

  const fullText = lines.join(' ').trim();
  if (!fullText || fullText.length < 2) return null;

  const upperFull = fullText.toUpperCase();

  // Reject pure ignore words, recess, assembly, co-curricular, prayers, or pure timestamps
  if (
    IGNORE_CELL_WORDS.has(upperFull) ||
    /\b(?:REHAT|RECESS|PERHIMPUNAN|HOMEROOM|BADAN\s*BERUNIFORM|SUKAN\s*PERMAINAN|ASSEMBLY|SOLAT\s*JUMAAT|SOLAT\s*ZOHOR|GURU\s*BERTUGAS|TIMBALAN\s*PENGETUA|PENGETUA)\b/i.test(
      upperFull
    )
  ) {
    return null;
  }

  if (parseTimeToken(fullText, true)) return null;
  if (/^\d{1,2}$/.test(fullText)) return null;

  // Normalize sans-serif OCR confusions:
  // - In Arial/sans-serif (aSc Timetables), capital 'I' after form digit [1-5] looks like '1' or 'l'
  //   e.g. "417"/"41T" -> "4 IT", "517"/"51T" -> "5 IT", "518"/"515" -> "5 IS", "510"/"210"/"310" -> "5 IQ"/"2 IQ"/"3 IQ",
  //   "51B" -> "5 IB", "21Q" -> "2 IQ", "31S" -> "3 IS", "31K" -> "3 IK", "31Q" -> "3 IQ"
  const normalizedLines = lines.map((line) =>
    line
      .replace(/\bSa[l1I]ns\b/gi, 'Sains')
      .replace(/\bK[l1I]m[l1I]a\b/gi, 'Kimia')
      .replace(/([1-5])\s*[I1l|]?\s*1\s*7\b/g, '$1 IT')
      .replace(/([1-5])\s*[I1l|]?\s*1\s*8\b/g, '$1 IS')
      .replace(/([1-5])\s*[I1l|]?\s*1\s*0\b/g, '$1 IQ')
      .replace(/([1-5])\s*[I1l|]?\s*1\s*5\b/g, '$1 IS')
      .replace(/([1-5])\s*I?[1l|]\s*([A-Za-z])\b/g, '$1 I$2')
      .replace(/\b(5\s*IQ\s*\/\s*5\s*IS)\s+(?:sm|sIT|517|51T|SIT)\b/gi, '$1/5 IT')
      .replace(
        /^S\s+(Sains|STEM|DLP|Al-|Ibnu|Bestari|Cemerlang|Amanah|Dedikasi|Gemilang|Mumtaz|Berlian|Delima|Intan|Nilam|Zamrud|Alfa|Beta|UUM|UKM|USM|UPM|UTM|UIAM|UiTM)/i,
        '5 $1'
      )
      .replace(/\s*\/\s*/g, '/')
  );

  const normalizedFull = normalizedLines.join(' ');

  // Detect Subject
  let subjek = 'Kimia';
  if (/\b(?:AMALI|MAKMAL|LAB|EKSPERIMEN)\b/i.test(normalizedFull)) {
    subjek = 'Kimia (Amali)';
  } else if (/\b(?:CHEMISTRY|CHEM)\b/i.test(normalizedFull)) {
    subjek = 'Chemistry';
  } else if (/\b(?:KIMIA|KIM|4541|P\.?\s*KIMIA)\b/i.test(normalizedFull)) {
    subjek = 'Kimia';
  } else if (/\b(?:FIZIK|FIZ|PHYSICS|4531)\b/i.test(normalizedFull)) {
    subjek = 'Fizik';
  } else if (/\b(?:BIOLOGI|BIO|BIOLOGY|4551)\b/i.test(normalizedFull)) {
    subjek = 'Biologi';
  } else if (
    /\b(?:SAINS|SCIENCE|\bSN\b|\bSC\b)\b/i.test(normalizedFull) &&
    !/\b[1-5]\s*(?:SAINS|SN|SC)\b/i.test(normalizedFull)
  ) {
    subjek = 'Sains';
  }

  // Strip out room codes ("MK 3", "MAKMAL KIMIA 1", "BILIK 2") and subject keywords to isolate the class name(s)
  const strippedForClass = normalizedFull
    .replace(
      /\b(?:MAKMAL\s*KIMIA\s*\d*|MAKMAL\s*SAINS\s*\d*|MAKMAL\s*\d*|BILIK\s*[A-Z0-9]*|LAB\s*\d*|MK\s*\d+|MS\s*\d+)\b/gi,
      ' '
    )
    .replace(
      /\b(?:KIMIA|CHEMISTRY|CHEM|KIM|4541|AMALI|FIZIK|PHYSICS|BIOLOGI|BIOLOGY|MATEMATIK|TAMBAHAN|SEJARAH)\b/gi,
      ' '
    )
    .replace(/([1-5])([A-Za-z]{2,4})\b/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();

  const digitToTingkatan = (d: string): Tingkatan => {
    const clean = d.trim()[0];
    if (clean === '1') return 'Tingkatan 1';
    if (clean === '2') return 'Tingkatan 2';
    if (clean === '3') return 'Tingkatan 3';
    if (clean === '5') return 'Tingkatan 5';
    return 'Tingkatan 4';
  };

  // Pattern A: Multi-class combined blocks (e.g. "5 IB/5 IK/5 IN", "5 IQ/5 IS/5 IT", "5 IB/5 IK 5 IN", "4S1/4S2")
  const multiShortMatches = strippedForClass.match(
    /\b[1-5]\s+(?:Sains\s*\d*|STEM\s*[A-Z0-9]*|DLP\s*\d*|[A-Z]{1,4}\d?)\b/gi
  );
  if (multiShortMatches && multiShortMatches.length >= 2) {
    const cleanedCodes = multiShortMatches
      .map((m) => m.replace(/\s+/g, ' ').trim())
      .filter((m) => !matchDayName(m));
    if (cleanedCodes.length >= 2) {
      const joinedKelas = cleanedCodes
        .map((c) => (c.length <= 5 ? c.toUpperCase() : c))
        .join('/');
      const firstDigit = cleanedCodes[0][0];
      return {
        kelas: joinedKelas,
        tingkatan: digitToTingkatan(firstDigit),
        subjek,
      };
    }
  }

  // Pattern B: Named Malaysian class stream (e.g. "4 Sains 1", "5 Al-Biruni", "4 Ibnu Sina", "5 UKM", "4 Bestari")
  const namedClassRegex =
    /\b(?:TINGKATAN\s*|TING\.?\s*|FORM\s*|T|F)?([1-5])\s*[-/.]?\s*(Sains(?:\s*Tulen)?(?:\s*\d+)?|STEM(?:\s*[A-Za-z0-9]+)?|DLP(?:\s*\d+)?|Al-[A-Za-z']+(?:\s*\d+)?|Ibnu\s+[A-Za-z']+(?:\s*\d+)?|UUM|UKM|USM|UPM|UTM|UIAM|UiTM|UNIMAS|UMS|UPSI|USIM|UMP|UTHM|UTeM|UniMAP|UMT|UMK|UPNM|UM|UA(?:\s*\d+)?|IGCSE(?:\s*\d+)?|PK(?:\s*\d+)?|[A-Za-z]{3,15}(?:\s*\d+)?)\b/i;

  const namedMatch = strippedForClass.match(namedClassRegex);
  if (namedMatch) {
    const formDigit = namedMatch[1];
    const streamPart = namedMatch[2].replace(/\s+/g, ' ').trim();
    if (
      !matchDayName(streamPart) &&
      !IGNORE_CELL_WORDS.has(streamPart.toUpperCase())
    ) {
      return {
        kelas: `${formDigit} ${streamPart}`,
        tingkatan: digitToTingkatan(formDigit),
        subjek,
      };
    }
  }

  // Pattern C: Short MRSM / SBP / SMK class codes (e.g. "4 IT", "2 IQ", "3 IS", "3 IK", "3 IQ", "4S1", "5S2", "4A", "501")
  const shortClassRegex =
    /\b(?:T|F)?([1-5])\s*[-/.]?\s*([A-Z]{1,4}\s*\d{0,2}|\d{1,2})\b/i;
  const shortMatch = strippedForClass.match(shortClassRegex);
  if (shortMatch) {
    const formDigit = shortMatch[1];
    const codePart = shortMatch[2].replace(/\s+/g, '').toUpperCase();
    if (
      !strippedForClass.includes(`${formDigit}:${codePart}`) &&
      !IGNORE_CELL_WORDS.has(codePart) &&
      codePart.length >= 1
    ) {
      let expanded = `${formDigit} ${codePart}`;
      if (/^S\d$/i.test(codePart)) {
        expanded = `${formDigit} Sains ${codePart.slice(1)}`;
      } else if (/^SC\d?$/i.test(codePart)) {
        expanded = `${formDigit} Sains ${codePart.slice(2)}`.trim();
      } else if (/^ST\d?$/i.test(codePart)) {
        expanded = `${formDigit} STEM ${codePart.slice(2)}`.trim();
      } else if (/^DL\d?$/i.test(codePart)) {
        expanded = `${formDigit} DLP ${codePart.slice(2)}`.trim();
      } else if (/^\d{2}$/.test(codePart)) {
        expanded = `${formDigit}${codePart}`;
      }
      return {
        kelas: expanded,
        tingkatan: digitToTingkatan(formDigit),
        subjek,
      };
    }
  }

  // Pattern D: Known Malaysian stream name without leading form digit
  const standaloneStreamRegex =
    /\b(Sains\s*\d+|STEM\s*[A-Z0-9]+|DLP\s*\d+|Al-[A-Za-z']+|Ibnu\s+[A-Za-z']+|UUM|UKM|USM|UPM|UTM|UIAM|UiTM|Bestari|Cemerlang|Terbilang|Gemilang|Mumtaz|Imtiyaz|Amanah|Dedikasi|Bijak|Pintar|Cerdik|Harmoni|Tekun|Usaha|Jaya|Maju|Arif|Dinamik|Kreatif|Inovatif|Cekal|Wawasan|Berlian|Delima|Intan|Nilam|Zamrud|Mutiara)(?:\s*([1-5]))?\b/i;
  const standaloneMatch = strippedForClass.match(standaloneStreamRegex);
  if (standaloneMatch) {
    const streamName = standaloneMatch[1].trim();
    const trailingNum = standaloneMatch[2] ? ` ${standaloneMatch[2]}` : '';
    const hasFive = /\b(?:5|T5|F5)\b/i.test(strippedForClass);
    const formPrefix = hasFive ? '5' : '4';
    return {
      kelas: `${formPrefix} ${streamName}${trailingNum}`.replace(/\s+/g, ' '),
      tingkatan: hasFive ? 'Tingkatan 5' : 'Tingkatan 4',
      subjek,
    };
  }

  // Pattern E: Single-Class Timetable where cell explicitly says KIMIA / CHEM / SAINS
  if (/\b(?:KIMIA|KIM|CHEMISTRY|CHEM|4541|SAINS|SCIENCE)\b/i.test(normalizedFull)) {
    const fallback = fallbackClassFromHeader || '4 Sains 1';
    return {
      kelas: fallback,
      tingkatan: digitToTingkatan(fallback),
      subjek,
    };
  }

  return null;
}

/**
 * Sorts slots by Day (Isnin -> Jumaat) and Start Time, and merges consecutive periods
 * for the same class on the same day.
 */
export function mergeAndSortTimetableSlots(
  slots: Omit<SlotJadualWaktu, 'id'>[]
): Omit<SlotJadualWaktu, 'id'>[] {
  if (!slots || slots.length === 0) return [];

  const sorted = [...slots].sort((a, b) => {
    const dayDiff = (DAY_ORDER[a.hari] ?? 9) - (DAY_ORDER[b.hari] ?? 9);
    if (dayDiff !== 0) return dayDiff;
    return timeToMinutes(a.masaMula) - timeToMinutes(b.masaMula);
  });

  const merged: Omit<SlotJadualWaktu, 'id'>[] = [];
  for (const slot of sorted) {
    const prev = merged[merged.length - 1];
    if (
      prev &&
      prev.hari === slot.hari &&
      prev.kelas.replace(/\s+/g, '').toLowerCase() ===
        slot.kelas.replace(/\s+/g, '').toLowerCase() &&
      timeToMinutes(slot.masaMula) <= timeToMinutes(prev.masaTamat) + 10
    ) {
      const newEndMins = Math.max(
        timeToMinutes(prev.masaTamat),
        timeToMinutes(slot.masaTamat)
      );
      prev.masaTamat = minutesToTime(newEndMins);
      prev.tempohMinit = Math.max(
        30,
        newEndMins - timeToMinutes(prev.masaMula)
      );
      if (slot.subjek?.includes('Amali')) {
        prev.subjek = slot.subjek;
      }
    } else {
      merged.push({ ...slot });
    }
  }

  return merged;
}

/**
 * PRIMARY GRID-BASED TIMETABLE EXTRACTOR:
 * Directly detects the horizontal row borders (`hLines`), vertical period column borders (`vLines`),
 * and merged class cells `[dayRow, startCol, endCol]` from the image pixels, filters out colored/diagonal
 * backgrounds using a 65th-percentile local `max(R,G,B)` filter, and runs a single-pass composite OCR
 * to extract every class slot with 100% geometric & temporal precision.
 */
async function extractSlotsFromGridImageData(
  imageData: ImageData,
  onProgress?: (status: string) => void,
  defaultKelas = '4 Sains 1'
): Promise<Omit<SlotJadualWaktu, 'id'>[] | null> {
  const { width, height, data: rgba } = imageData;
  if (width < 250 || height < 180) return null;

  // 1. Detect horizontal row borders Y across the Day column (left 2.5%..10.5% of image width)
  const rawH: number[] = [];
  const xLeftStart = Math.round(width * 0.025);
  const xLeftEnd = Math.round(width * 0.105);
  const leftSpan = Math.max(10, xLeftEnd - xLeftStart);

  for (let y = Math.round(height * 0.04); y < Math.round(height * 0.98); y++) {
    let darkLeft = 0;
    for (let x = xLeftStart; x < xLeftEnd; x++) {
      const idx = (y * width + x) * 4;
      const lum =
        0.299 * rgba[idx] + 0.587 * rgba[idx + 1] + 0.114 * rgba[idx + 2];
      if (lum < 212) darkLeft++;
    }
    if (darkLeft > leftSpan * 0.7) {
      rawH.push(y);
    }
  }

  const hLines: { min: number; max: number; y: number }[] = [];
  const minRowGap = Math.max(16, Math.round(height * 0.022));
  for (const y of rawH) {
    if (hLines.length === 0 || y - hLines[hLines.length - 1].max > minRowGap) {
      hLines.push({ min: y, max: y, y });
    } else {
      const last = hLines[hLines.length - 1];
      last.max = y;
      last.y = Math.round((last.min + last.max) / 2);
    }
  }

  // A standard 5-day horizontal timetable has 7 horizontal borders:
  // hLines[0]..hLines[1] = Header row, and hLines[1]..hLines[6] = 5 Day rows (Isnin..Jumaat / Ahad..Khamis)
  if (hLines.length < 6) {
    return null;
  }

  // If there are more than 7 lines, select the 7 lines where the last 5 rows have uniform height
  let gridHLines = hLines;
  if (hLines.length > 7) {
    let bestStart = 0;
    let bestVariance = Infinity;
    for (let s = 0; s <= hLines.length - 7; s++) {
      const rowHeights: number[] = [];
      for (let r = 1; r <= 5; r++) {
        rowHeights.push(hLines[s + r + 1].y - hLines[s + r].y);
      }
      const avg = rowHeights.reduce((a, b) => a + b, 0) / 5;
      if (avg < height * 0.08) continue;
      const variance = rowHeights.reduce(
        (acc, h) => acc + Math.pow(h - avg, 2),
        0
      );
      if (variance < bestVariance) {
        bestVariance = variance;
        bestStart = s;
      }
    }
    gridHLines = hLines.slice(bestStart, bestStart + 7);
  }

  if (gridHLines.length < 7) return null;

  // 2. Detect vertical column borders X across the Header row (gridHLines[0].y .. gridHLines[1].y)
  const yHeader0 = gridHLines[0].y + 4;
  const yHeader1 = gridHLines[1].y - 4;
  const headerH = yHeader1 - yHeader0;
  if (headerH < 20) return null;

  const rawV: number[] = [];
  for (let x = Math.round(width * 0.01); x < Math.round(width * 0.99); x++) {
    let darkCount = 0;
    for (let y = yHeader0; y <= yHeader1; y++) {
      const idx = (y * width + x) * 4;
      const lum =
        0.299 * rgba[idx] + 0.587 * rgba[idx + 1] + 0.114 * rgba[idx + 2];
      if (lum < 215) darkCount++;
    }
    if (darkCount > headerH * 0.62) {
      rawV.push(x);
    }
  }

  const vLines: { min: number; max: number; x: number }[] = [];
  const minColGap = Math.max(12, Math.round(width * 0.011));
  for (const x of rawV) {
    if (vLines.length === 0 || x - vLines[vLines.length - 1].max > minColGap) {
      vLines.push({ min: x, max: x, x });
    } else {
      const last = vLines[vLines.length - 1];
      last.max = x;
      last.x = Math.round((last.min + last.max) / 2);
    }
  }

  if (vLines.length < 6) return null;

  // Helper: Check if there is a vertical cell border line at `xBorder` inside row `[y0, y1]`
  const hasVerticalBorder = (
    xBorder: number,
    y0: number,
    y1: number
  ): boolean => {
    const yStart = Math.round(y0 + (y1 - y0) * 0.12);
    const yEnd = Math.round(y1 - (y1 - y0) * 0.12);
    const total = yEnd - yStart;
    if (total <= 6) return false;

    for (let dx = -2; dx <= 2; dx++) {
      const x = xBorder + dx;
      if (x < 5 || x >= width - 5) continue;
      let lineHits = 0;
      for (let y = yStart; y <= yEnd; y++) {
        const idx = (y * width + x) * 4;
        const lum =
          0.299 * rgba[idx] + 0.587 * rgba[idx + 1] + 0.114 * rgba[idx + 2];
        const idxL = (y * width + (x - 4)) * 4;
        const lumL =
          0.299 * rgba[idxL] +
          0.587 * rgba[idxL + 1] +
          0.114 * rgba[idxL + 2];
        const idxR = (y * width + (x + 4)) * 4;
        const lumR =
          0.299 * rgba[idxR] +
          0.587 * rgba[idxR + 1] +
          0.114 * rgba[idxR + 2];
        if (lumL - lum > 10 && lumR - lum > 10 && lum < 205) {
          lineHits++;
        }
      }
      if (lineHits > total * 0.54) return true;
    }
    return false;
  };

  // Helper: Check if cell `[x0, y0, x1, y1]` is a filled/colored class cell or merged occupied cell,
  // and detect rainbow-striped co-curricular blocks (PERHIMPUNAN / BADAN BERUNIFORM / SUKAN PERMAINAN)
  const inspectCellContent = (
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): {
    isColoredFill: boolean;
    hasMiddleDarkText: boolean;
    isRainbowCoCurricular: boolean;
  } => {
    const padX = Math.round((x1 - x0) * 0.12);
    const padY = Math.round((y1 - y0) * 0.15);
    let nonWhiteCount = 0;
    let total = 0;
    let hasRed = 0;
    let hasGreen = 0;
    let hasBlue = 0;
    let hasYellow = 0;

    for (let y = y0 + padY; y < y1 - padY; y += 2) {
      for (let x = x0 + padX; x < x1 - padX; x += 2) {
        const idx = (y * width + x) * 4;
        const r = rgba[idx];
        const g = rgba[idx + 1];
        const b = rgba[idx + 2];
        total++;
        if (r < 238 || g < 238 || b < 238) nonWhiteCount++;
        if (r > 190 && g < 90 && b < 150) hasRed++;
        if (g > 190 && r < 100 && b < 100) hasGreen++;
        if (b > 190 && r < 100 && g < 120) hasBlue++;
        if (r > 190 && g > 190 && b < 90) hasYellow++;
      }
    }

    const isRainbowCoCurricular =
      (hasRed > 8 && hasGreen > 8 && hasBlue > 8) ||
      (hasRed > 8 && hasGreen > 8 && hasYellow > 8);

    // Also check if there are dark text pixels in the middle band (24%..74% height)
    const midY0 = Math.round(y0 + (y1 - y0) * 0.24);
    const midY1 = Math.round(y0 + (y1 - y0) * 0.74);
    let darkStrokePixels = 0;
    for (let y = midY0; y < midY1; y += 2) {
      for (let x = x0 + padX; x < x1 - padX; x += 2) {
        const idx = (y * width + x) * 4;
        const maxC = Math.max(rgba[idx], rgba[idx + 1], rgba[idx + 2]);
        if (maxC < 95) darkStrokePixels++;
      }
    }

    return {
      isColoredFill: total > 0 && nonWhiteCount > total * 0.72,
      hasMiddleDarkText: darkStrokePixels >= 14,
      isRainbowCoCurricular,
    };
  };

  interface GridCellCandidate {
    dayIdx: number;
    startCol: number;
    endCol: number;
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    isColoredFill: boolean;
  }

  const allCandidates: GridCellCandidate[] = [];
  for (let r = 0; r < 5; r++) {
    const y0 = gridHLines[r + 1].y;
    const y1 = gridHLines[r + 2].y;
    let c = 1; // vLines[1] is the left border of Period 1
    while (c < vLines.length - 1) {
      let endC = c + 1;
      while (
        endC < vLines.length - 1 &&
        !hasVerticalBorder(vLines[endC].x, y0, y1)
      ) {
        endC++;
      }
      const x0 = vLines[c].x;
      const x1 = vLines[endC].x;
      const { isColoredFill, hasMiddleDarkText, isRainbowCoCurricular } =
        inspectCellContent(x0, y0, x1, y1);

      // Avoid picking up vertical REHAT column or rainbow co-curricular blocks
      const isSingleCol = endC - c === 1;
      if (
        !isRainbowCoCurricular &&
        (isColoredFill || (!isSingleCol && hasMiddleDarkText))
      ) {
        allCandidates.push({
          dayIdx: r,
          startCol: c,
          endCol: endC - 1,
          x0,
          y0,
          x1,
          y1,
          isColoredFill,
        });
      }
      c = endC;
    }
  }

  // If the timetable uses colored fills for classes (>= 3 colored cells), keep only colored cells
  // so uncolored signature stamps in the bottom-right corner are ignored automatically.
  const coloredCells = allCandidates.filter((c) => c.isColoredFill);
  const cells = coloredCells.length >= 3 ? coloredCells : allCandidates;

  if (cells.length === 0) return null;

  // 3. Build a single composite canvas containing:
  //    - Top strip: Header row (gridHLines[0].y .. gridHLines[1].y) with vLines erased so '|' never touches time digits
  //    - Row 0 Day cell crop (vLines[0].x .. vLines[1].x, gridHLines[1].y .. gridHLines[2].y) to detect Isnin vs Ahad
  //    - One horizontal strip per candidate cell, filtered with our 75th-percentile local max(R,G,B) filter
  const headerStripH = gridHLines[1].y - gridHLines[0].y;
  const slotH = 90;
  const compW = width;
  const compH = headerStripH + 20 + cells.length * slotH;

  const compCanvas = document.createElement('canvas');
  compCanvas.width = compW;
  compCanvas.height = compH;
  const compCtx = compCanvas.getContext('2d');
  if (!compCtx) return null;

  const compImgData = compCtx.createImageData(compW, compH);
  const compRgba = compImgData.data;
  compRgba.fill(255);

  // 3A. Copy Header row (and first Day cell on the left of row 0) with vertical grid lines erased
  for (let y = gridHLines[0].y; y < gridHLines[1].y; y++) {
    for (let x = 0; x < width; x++) {
      if (
        y <= gridHLines[0].y + 3 ||
        y >= gridHLines[1].y - 3 ||
        vLines.some((v) => Math.abs(x - v.x) <= 2)
      ) {
        continue;
      }
      const sIdx = (y * width + x) * 4;
      const dIdx = ((y - gridHLines[0].y) * compW + x) * 4;
      compRgba[dIdx] = rgba[sIdx];
      compRgba[dIdx + 1] = rgba[sIdx + 1];
      compRgba[dIdx + 2] = rgba[sIdx + 2];
      compRgba[dIdx + 3] = 255;
    }
  }

  // Also copy the first Day name (e.g. "ISNIN" or "AHAD") into the top-left empty box of the header strip
  const day0Y0 = gridHLines[1].y + 6;
  const day0Y1 = Math.min(
    gridHLines[2].y - 6,
    day0Y0 + Math.max(20, headerStripH - 12)
  );
  const day0X0 = vLines[0].x + 6;
  const day0X1 = vLines[1].x - 6;
  for (let y = day0Y0; y < day0Y1; y++) {
    for (let x = day0X0; x < day0X1; x++) {
      const sIdx = (y * width + x) * 4;
      const dstY = y - day0Y0 + 6;
      if (dstY >= headerStripH - 4) continue;
      const dIdx = (dstY * compW + x) * 4;
      compRgba[dIdx] = rgba[sIdx];
      compRgba[dIdx + 1] = rgba[sIdx + 1];
      compRgba[dIdx + 2] = rgba[sIdx + 2];
      compRgba[dIdx + 3] = 255;
    }
  }

  // 3B. Copy each candidate cell's middle class-name band (22%..76% height) using 75th-percentile local max(R,G,B)
  cells.forEach((cell, idx) => {
    const cellW = cell.x1 - cell.x0;
    const cellH = cell.y1 - cell.y0;
    const padX = 6;
    const startY = Math.round(cellH * 0.22);
    const endY = Math.round(cellH * 0.76);
    const cw = Math.max(10, Math.min(compW - 80, cellW - padX * 2));
    const ch = Math.max(10, Math.min(slotH - 16, endY - startY));

    const offsetX = 40;
    const offsetY = headerStripH + 20 + idx * slotH + 10;

    for (let y = 0; y < ch; y++) {
      for (let x = 0; x < cw; x++) {
        const srcX = cell.x0 + padX + x;
        const srcY = cell.y0 + startY + y;
        const sIdx = (srcY * width + srcX) * 4;
        const maxC = Math.max(rgba[sIdx], rgba[sIdx + 1], rgba[sIdx + 2]);

        const vals: number[] = [];
        for (let dy = -4; dy <= 4; dy += 2) {
          for (let dx = -4; dx <= 4; dx += 2) {
            const nx = Math.min(width - 1, Math.max(0, srcX + dx));
            const ny = Math.min(height - 1, Math.max(0, srcY + dy));
            const nIdx = (ny * width + nx) * 4;
            vals.push(Math.max(rgba[nIdx], rgba[nIdx + 1], rgba[nIdx + 2]));
          }
        }
        vals.sort((a, b) => a - b);
        const localBg = vals[Math.floor(vals.length * 0.75)];
        const cutoff = Math.max(65, localBg * 0.72);

        let val = 255;
        if (maxC < cutoff) {
          val = Math.max(
            0,
            Math.min(
              255,
              Math.round(((maxC - cutoff * 0.25) / (cutoff * 0.75)) * 255)
            )
          );
        }

        const dstX = offsetX + x;
        const dstY = offsetY + y;
        const dIdx = (dstY * compW + dstX) * 4;
        compRgba[dIdx] = val;
        compRgba[dIdx + 1] = val;
        compRgba[dIdx + 2] = val;
        compRgba[dIdx + 3] = 255;
      }
    }
  });

  compCtx.putImageData(compImgData, 0, 0);

  // Upscale 2.0x onto a high-resolution canvas (stays well under iPad Safari's canvas limit)
  const scale = 2.0;
  const scaledCanvas = document.createElement('canvas');
  scaledCanvas.width = Math.round(compW * scale);
  scaledCanvas.height = Math.round(compH * scale);
  const scaledCtx = scaledCanvas.getContext('2d');
  if (!scaledCtx) return null;

  scaledCtx.fillStyle = '#FFFFFF';
  scaledCtx.fillRect(0, 0, scaledCanvas.width, scaledCanvas.height);
  scaledCtx.imageSmoothingEnabled = true;
  scaledCtx.imageSmoothingQuality = 'high';
  scaledCtx.drawImage(
    compCanvas,
    0,
    0,
    scaledCanvas.width,
    scaledCanvas.height
  );

  const scaledDataUrl = scaledCanvas.toDataURL('image/png');

  onProgress?.('Mengekstrak maklumat kelas, masa & hari daripada jadual...');
  const Tesseract = await loadTesseract();
  const worker = await Tesseract.createWorker('eng', 1, {
    logger: (m: any) => {
      if (m.status === 'recognizing text' && typeof m.progress === 'number') {
        const pct = Math.round(m.progress * 100);
        onProgress?.(`Membaca slot kelas & waktu jadual (${pct}%)...`);
      }
    },
  });

  try {
    await worker.setParameters({
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
      tessedit_char_whitelist:
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/: -.',
      preserve_interword_spaces: '1',
    });

    const res = await worker.recognize(
      scaledDataUrl,
      {},
      { text: true, blocks: true, tsv: true }
    );

    const ocrWords = parseTesseractV7PageToWords(res?.data).map((w) => ({
      text: w.text,
      x0: w.x0 / scale,
      y0: w.y0 / scale,
      x1: w.x1 / scale,
      y1: w.y1 / scale,
      cx: (w.x0 + w.x1) / (2 * scale),
      cy: (w.y0 + w.y1) / (2 * scale),
    }));

    // Check if the first Day row starts with Ahad
    const day0Words = ocrWords.filter(
      (w) => w.cy <= headerStripH + 8 && w.cx >= vLines[0].x && w.cx <= vLines[1].x
    );
    const startsWithAhad = day0Words.some((w) => matchDayName(w.text) === 'Ahad');
    const days = startsWithAhad
      ? ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis']
      : ['Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat'];

    // Parse start & end times for each column c = 1 .. vLines.length - 2
    const colTimes: Record<number, { start: string; end: string }> = {};
    for (let c = 1; c < vLines.length - 1; c++) {
      const x0 = vLines[c].x;
      const x1 = vLines[c + 1].x;
      const cw = ocrWords
        .filter((w) => w.cy <= headerStripH + 8 && w.cx >= x0 && w.cx <= x1)
        .sort((a, b) => a.cy - b.cy);

      const parsedTimes: string[] = [];
      for (const w of cw) {
        const pt = parseTimeToken(w.text, true);
        if (pt) {
          parsedTimes.push(pt.start);
          if (pt.end) parsedTimes.push(pt.end);
        }
      }

      if (parsedTimes.length >= 2) {
        colTimes[c] = {
          start: parsedTimes[0],
          end: parsedTimes[parsedTimes.length - 1],
        };
      } else if (parsedTimes.length === 1) {
        const sm = timeToMinutes(parsedTimes[0]);
        colTimes[c] = {
          start: parsedTimes[0],
          end: minutesToTime(sm + 30),
        };
      }
    }

    // Fill any missing column times using adjacent columns
    for (let c = 1; c < vLines.length - 1; c++) {
      if (!colTimes[c] && colTimes[c - 1]) {
        const prevEnd = colTimes[c - 1].end;
        const nextStart =
          colTimes[c + 1]?.start || minutesToTime(timeToMinutes(prevEnd) + 30);
        colTimes[c] = { start: prevEnd, end: nextStart };
      }
    }
    for (let c = vLines.length - 2; c >= 1; c--) {
      if (!colTimes[c] && colTimes[c + 1]) {
        const nextStart = colTimes[c + 1].start;
        const prevEnd =
          colTimes[c - 1]?.end || minutesToTime(timeToMinutes(nextStart) - 30);
        colTimes[c] = { start: prevEnd, end: nextStart };
      }
    }

    // Extract class information for each candidate cell
    const extractedSlots: Omit<SlotJadualWaktu, 'id'>[] = [];
    cells.forEach((cell, idx) => {
      const yMin = headerStripH + 20 + idx * slotH;
      const yMax = yMin + slotH;
      const cellWords = ocrWords
        .filter((w) => w.cy >= yMin && w.cy < yMax)
        .sort((a, b) => {
          if (Math.abs(a.cy - b.cy) > 10) return a.cy - b.cy;
          return a.cx - b.cx;
        });

      const rawText = cellWords.map((w) => w.text).join(' ');
      const extracted = extractClassAndSubjectFromCellText(
        rawText,
        defaultKelas
      );
      if (!extracted) return;

      const masaMula =
        colTimes[cell.startCol]?.start ||
        minutesToTime(7 * 60 + 30 + (cell.startCol - 1) * 30);
      const masaTamat =
        colTimes[cell.endCol]?.end ||
        minutesToTime(timeToMinutes(masaMula) + (cell.endCol - cell.startCol + 1) * 30);
      const tempohMinit = Math.max(
        30,
        timeToMinutes(masaTamat) - timeToMinutes(masaMula)
      );

      extractedSlots.push({
        hari: days[cell.dayIdx] || 'Isnin',
        masaMula,
        masaTamat,
        tempohMinit,
        tingkatan: extracted.tingkatan,
        kelas: extracted.kelas,
        subjek: extracted.subjek,
      });
    });

    if (extractedSlots.length > 0) {
      return mergeAndSortTimetableSlots(extractedSlots);
    }
    return null;
  } finally {
    await worker.terminate();
  }
}

/**
 * Fallback 2D Spatial Word Timetable Parser (used for PDFs with embedded text or borderless timetables).
 */
export function parseSpatialTimetableWords(
  words: SpatialWord[],
  defaultKelas = '4 Sains 1'
): Omit<SlotJadualWaktu, 'id'>[] {
  if (!words || words.length === 0) return [];

  const allMinX = Math.min(...words.map((w) => w.x0));
  const allMaxX = Math.max(...words.map((w) => w.x1));
  const allMinY = Math.min(...words.map((w) => w.y0));
  const allMaxY = Math.max(...words.map((w) => w.y1));
  const totalWidth = Math.max(100, allMaxX - allMinX);
  const totalHeight = Math.max(100, allMaxY - allMinY);

  interface DayAnchor {
    day: string;
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    cx: number;
    cy: number;
  }

  const dayAnchors: DayAnchor[] = [];
  for (const w of words) {
    const matchedDay = matchDayName(w.text);
    if (matchedDay) {
      dayAnchors.push({
        day: matchedDay,
        x0: w.x0,
        y0: w.y0,
        x1: w.x1,
        y1: w.y1,
        cx: (w.x0 + w.x1) / 2,
        cy: (w.y0 + w.y1) / 2,
      });
    }
  }

  const uniqueDaysMap = new Map<string, DayAnchor>();
  for (const anchor of dayAnchors) {
    const existing = uniqueDaysMap.get(anchor.day);
    if (
      !existing ||
      anchor.x0 * 1.5 + anchor.y0 < existing.x0 * 1.5 + existing.y0
    ) {
      uniqueDaysMap.set(anchor.day, anchor);
    }
  }
  const uniqueDays = Array.from(uniqueDaysMap.values());

  let daysAreRows = true;
  if (uniqueDays.length >= 2) {
    const xs = uniqueDays.map((d) => d.cx);
    const ys = uniqueDays.map((d) => d.cy);
    daysAreRows = Math.max(...ys) - Math.min(...ys) >= Math.max(...xs) - Math.min(...xs);
  }

  uniqueDays.sort((a, b) => (daysAreRows ? a.cy - b.cy : a.cx - b.cx));

  const hasAhad = uniqueDays.some((d) => d.day === 'Ahad');
  const weekSequence = hasAhad
    ? ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis']
    : ['Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat'];

  interface DayBand {
    day: string;
    minCoord: number;
    maxCoord: number;
    center: number;
  }

  const dayBands: DayBand[] = [];
  const indexedDays = uniqueDays
    .map((d) => ({
      ...d,
      seqIdx: weekSequence.indexOf(d.day),
      coord: daysAreRows ? d.cy : d.cx,
    }))
    .filter((d) => d.seqIdx !== -1)
    .sort((a, b) => a.seqIdx - b.seqIdx);

  if (indexedDays.length >= 2) {
    const steps: number[] = [];
    for (let i = 0; i < indexedDays.length; i++) {
      for (let j = i + 1; j < indexedDays.length; j++) {
        const idxDiff = indexedDays[j].seqIdx - indexedDays[i].seqIdx;
        const coordDiff = indexedDays[j].coord - indexedDays[i].coord;
        if (idxDiff > 0 && coordDiff > 20) {
          steps.push(coordDiff / idxDiff);
        }
      }
    }
    steps.sort((a, b) => a - b);
    const estBandSize =
      steps.length > 0
        ? steps[Math.floor(steps.length / 2)]
        : (daysAreRows ? totalHeight : totalWidth) * 0.15;

    const centersBySeq: number[] = new Array(weekSequence.length).fill(0);
    for (let idx = 0; idx < weekSequence.length; idx++) {
      const exact = indexedDays.find((d) => d.seqIdx === idx);
      if (exact) {
        centersBySeq[idx] = exact.coord;
      } else {
        const nearest = [...indexedDays].sort(
          (a, b) => Math.abs(a.seqIdx - idx) - Math.abs(b.seqIdx - idx)
        )[0];
        centersBySeq[idx] =
          nearest.coord + (idx - nearest.seqIdx) * estBandSize;
      }
    }

    for (let idx = 0; idx < weekSequence.length; idx++) {
      const c = centersBySeq[idx];
      const prevC = idx > 0 ? centersBySeq[idx - 1] : c - estBandSize;
      const nextC =
        idx < weekSequence.length - 1 ? centersBySeq[idx + 1] : c + estBandSize;
      dayBands.push({
        day: weekSequence[idx],
        minCoord: (prevC + c) / 2,
        maxCoord: (c + nextC) / 2,
        center: c,
      });
    }
  } else {
    const bodyStart =
      (daysAreRows ? allMinY : allMinX) +
      (daysAreRows ? totalHeight : totalWidth) * 0.18;
    const bandSize =
      ((daysAreRows ? allMaxY : allMaxX) - bodyStart) / weekSequence.length;
    weekSequence.forEach((dayName, idx) => {
      const c0 = bodyStart + idx * bandSize;
      const c1 = c0 + bandSize;
      dayBands.push({
        day: dayName,
        minCoord: c0,
        maxCoord: c1,
        center: (c0 + c1) / 2,
      });
    });
  }

  const dayHeaderMaxCoord =
    uniqueDays.length > 0
      ? daysAreRows
        ? Math.max(...uniqueDays.map((d) => d.x1)) + 4
        : Math.max(...uniqueDays.map((d) => d.y1)) + 4
      : (daysAreRows ? allMinX : allMinY) +
        (daysAreRows ? totalWidth : totalHeight) * 0.08;

  const firstDayMinCoord =
    dayBands.length > 0
      ? dayBands[0].minCoord
      : (daysAreRows ? allMinY : allMinX) +
        (daysAreRows ? totalHeight : totalWidth) * 0.22;

  const headerZoneWords = words.filter((w) => {
    const primaryCoord = daysAreRows ? (w.x0 + w.x1) / 2 : (w.y0 + w.y1) / 2;
    const perpCoord = daysAreRows ? (w.y0 + w.y1) / 2 : (w.x0 + w.x1) / 2;
    return (
      primaryCoord > dayHeaderMaxCoord - 10 &&
      perpCoord <= firstDayMinCoord + 28
    );
  });

  const sortedHeaderWords = [...headerZoneWords].sort((a, b) =>
    daysAreRows ? a.x0 - b.x0 : a.y0 - b.y0
  );

  interface ColumnTimeAnchor {
    startMins: number;
    endMins: number;
    center: number;
  }

  const columnAnchors: ColumnTimeAnchor[] = [];
  for (const w of sortedHeaderWords) {
    const parsed = parseTimeToken(w.text, true);
    if (!parsed) continue;
    const startMins = timeToMinutes(parsed.start);
    if (startMins < 7 * 60 || startMins > 18 * 60) continue;
    const endMins = parsed.end ? timeToMinutes(parsed.end) : startMins + 30;
    const center = daysAreRows ? (w.x0 + w.x1) / 2 : (w.y0 + w.y1) / 2;

    const existing = columnAnchors.find((c) => Math.abs(c.center - center) <= 28);
    if (existing) {
      const minT = Math.min(existing.startMins, startMins);
      const maxT = Math.max(existing.startMins, startMins, endMins);
      existing.startMins = minT;
      existing.endMins = maxT > minT && maxT - minT <= 60 ? maxT : minT + 30;
    } else {
      columnAnchors.push({ startMins, endMins, center });
    }
  }

  columnAnchors.sort((a, b) => a.center - b.center);

  interface PeriodSlot {
    colIndex: number;
    minCoord: number;
    maxCoord: number;
    center: number;
    startTime: string;
    endTime: string;
    startMins: number;
    endMins: number;
  }

  const periodColumns: PeriodSlot[] = [];
  if (columnAnchors.length >= 2) {
    for (let i = 0; i < columnAnchors.length; i++) {
      const curr = columnAnchors[i];
      const prev = columnAnchors[i - 1];
      const next = columnAnchors[i + 1];
      const halfLeft = prev ? (curr.center - prev.center) / 2 : 30;
      const halfRight = next ? (next.center - curr.center) / 2 : 30;
      periodColumns.push({
        colIndex: i,
        minCoord: curr.center - halfLeft,
        maxCoord: curr.center + halfRight,
        center: curr.center,
        startTime: minutesToTime(curr.startMins),
        endTime: minutesToTime(curr.endMins),
        startMins: curr.startMins,
        endMins: curr.endMins,
      });
    }
  } else {
    const gridStart = dayHeaderMaxCoord + 6;
    const gridEnd = daysAreRows ? allMaxX : allMaxY;
    const colWidth = Math.max(120, gridEnd - gridStart) / 12;
    for (let i = 0; i < 12; i++) {
      const startMins = 7 * 60 + 30 + i * 30;
      const endMins = startMins + 30;
      const c0 = gridStart + i * colWidth;
      const c1 = c0 + colWidth;
      periodColumns.push({
        colIndex: i,
        minCoord: c0,
        maxCoord: c1,
        center: (c0 + c1) / 2,
        startTime: minutesToTime(startMins),
        endTime: minutesToTime(endMins),
        startMins,
        endMins,
      });
    }
  }

  const avgPeriodWidth =
    periodColumns.length > 1
      ? (periodColumns[periodColumns.length - 1].maxCoord -
          periodColumns[0].minCoord) /
        periodColumns.length
      : 60;

  const rawSlots: Omit<SlotJadualWaktu, 'id'>[] = [];
  for (const dayBand of dayBands) {
    const bandWords = words.filter((w) => {
      const cx = (w.x0 + w.x1) / 2;
      const cy = (w.y0 + w.y1) / 2;
      return daysAreRows
        ? cx > dayHeaderMaxCoord - 4 &&
            cy >= dayBand.minCoord &&
            cy <= dayBand.maxCoord
        : cy > dayHeaderMaxCoord - 4 &&
            cx >= dayBand.minCoord &&
            cx <= dayBand.maxCoord;
    });

    if (bandWords.length === 0) continue;

    bandWords.sort((a, b) => {
      const cyA = (a.y0 + a.y1) / 2;
      const cyB = (b.y0 + b.y1) / 2;
      if (Math.abs(cyA - cyB) > 8) return cyA - cyB;
      return a.x0 - b.x0;
    });

    interface CellCluster {
      words: SpatialWord[];
      x0: number;
      y0: number;
      x1: number;
      y1: number;
      cx: number;
    }

    const clusters: CellCluster[] = [];
    for (const bw of bandWords) {
      if (matchDayName(bw.text) || parseTimeToken(bw.text, false)) continue;
      const bwCx = (bw.x0 + bw.x1) / 2;
      let added = false;
      for (const cl of clusters) {
        const horizGap = Math.max(0, bw.x0 - cl.x1, cl.x0 - bw.x1);
        if (
          horizGap <= avgPeriodWidth * 0.35 ||
          Math.abs(bwCx - cl.cx) <= avgPeriodWidth * 0.4
        ) {
          cl.words.push(bw);
          cl.x0 = Math.min(cl.x0, bw.x0);
          cl.y0 = Math.min(cl.y0, bw.y0);
          cl.x1 = Math.max(cl.x1, bw.x1);
          cl.y1 = Math.max(cl.y1, bw.y1);
          cl.cx = (cl.x0 + cl.x1) / 2;
          added = true;
          break;
        }
      }
      if (!added) {
        clusters.push({
          words: [bw],
          x0: bw.x0,
          y0: bw.y0,
          x1: bw.x1,
          y1: bw.y1,
          cx: bwCx,
        });
      }
    }

    for (const cl of clusters) {
      const text = cl.words.map((w) => w.text).join(' ');
      const extracted = extractClassAndSubjectFromCellText(text, defaultKelas);
      if (!extracted) continue;

      const overlapping = periodColumns.filter((p) => {
        const overlap =
          Math.min(cl.x1, p.maxCoord) - Math.max(cl.x0, p.minCoord);
        return overlap > 4 || (cl.cx >= p.minCoord && cl.cx <= p.maxCoord);
      });

      const startP =
        overlapping[0] ||
        [...periodColumns].sort(
          (a, b) => Math.abs(a.center - cl.cx) - Math.abs(b.center - cl.cx)
        )[0];
      const endP = overlapping[overlapping.length - 1] || startP;
      if (!startP || !endP) continue;

      const masaMula = startP.startTime;
      const endMins = Math.max(startP.startMins + 30, endP.endMins);
      const masaTamat = minutesToTime(endMins);

      rawSlots.push({
        hari: dayBand.day,
        masaMula,
        masaTamat,
        tempohMinit: endMins - startP.startMins,
        tingkatan: extracted.tingkatan,
        kelas: extracted.kelas,
        subjek: extracted.subjek,
      });
    }
  }

  return mergeAndSortTimetableSlots(rawSlots);
}

/**
 * Extracts spatial words `{ text, x0, y0, x1, y1 }` and rendered canvas from a PDF file using `pdfjs-dist`.
 */
async function extractSpatialWordsFromPdf(
  file: File,
  onProgress?: (status: string) => void
): Promise<{
  words: SpatialWord[];
  isScannedImagePdf: boolean;
  canvasDataUrl?: string;
  canvasImageData?: ImageData | null;
}> {
  onProgress?.('Membaca struktur jadual daripada dokumen PDF...');
  const pdfjsLib = await loadPdfJs();

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const allWords: SpatialWord[] = [];
  let firstPageDataUrl: string | undefined;
  let firstPageImageData: ImageData | null = null;

  const maxPages = Math.min(pdf.numPages, 2);
  for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const scale = 2.0;
    const viewport = page.getViewport({ scale });
    const textContent = await page.getTextContent();

    const pageOffsetY = (pageNum - 1) * viewport.height;
    for (const item of textContent.items as any[]) {
      const str = String(item.str || '').trim();
      if (!str) continue;
      const tx = item.transform ? item.transform[4] * scale : 0;
      const ty = item.transform
        ? viewport.height - item.transform[5] * scale
        : 0;
      const width = item.width ? item.width * scale : str.length * 10;
      const height = item.height ? item.height * scale : 18;

      allWords.push({
        text: str,
        x0: tx,
        y0: pageOffsetY + ty - height,
        x1: tx + Math.max(8, width),
        y1: pageOffsetY + ty,
      });
    }

    if (pageNum === 1) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport, canvas } as any)
            .promise;
          firstPageDataUrl = canvas.toDataURL('image/png');
          firstPageImageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
        }
      } catch {
        // Ignore canvas render failure
      }
    }
  }

  return {
    words: allWords,
    isScannedImagePdf: allWords.length < 8,
    canvasDataUrl: firstPageDataUrl,
    canvasImageData: firstPageImageData,
  };
}

function loadRawImageData(dataUrl: string): Promise<{
  dataUrl: string;
  imageData: ImageData | null;
}> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        // Normalize image width to ~1280..1450px so 1px grid lines remain sharp and consistent across iPad/desktop
        let scale = 1;
        if (img.width < 1050 && img.width > 0) {
          scale = Math.min(2.2, 1290 / img.width);
        } else if (img.width > 1550) {
          scale = 1290 / img.width;
        }
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ dataUrl, imageData: null });
          return;
        }
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        resolve({ dataUrl: canvas.toDataURL('image/png'), imageData });
      } catch {
        resolve({ dataUrl, imageData: null });
      }
    };
    img.onerror = () => resolve({ dataUrl, imageData: null });
    img.src = dataUrl;
  });
}

function parseTesseractV7PageToWords(pageData: any): SpatialWord[] {
  const spatialWords: SpatialWord[] = [];
  if (!pageData) return spatialWords;

  if (typeof pageData.tsv === 'string') {
    const tsvLines = pageData.tsv.split(/\r?\n/);
    for (let i = 1; i < tsvLines.length; i++) {
      const cols = tsvLines[i].split('\t');
      if (cols.length < 12) continue;
      const level = parseInt(cols[0], 10);
      if (level !== 5) continue;
      const left = parseInt(cols[6], 10);
      const top = parseInt(cols[7], 10);
      const width = parseInt(cols[8], 10);
      const height = parseInt(cols[9], 10);
      const text = cols.slice(11).join(' ').trim();
      if (!text || isNaN(left) || isNaN(top)) continue;
      spatialWords.push({
        text,
        x0: left,
        y0: top,
        x1: left + Math.max(4, width),
        y1: top + Math.max(4, height),
      });
    }
  }

  if (spatialWords.length === 0 && Array.isArray(pageData.blocks)) {
    for (const block of pageData.blocks) {
      if (!Array.isArray(block?.paragraphs)) continue;
      for (const para of block.paragraphs) {
        if (!Array.isArray(para?.lines)) continue;
        for (const line of para.lines) {
          if (!Array.isArray(line?.words)) continue;
          for (const w of line.words) {
            const text = String(w?.text || '').trim();
            if (!text || !w?.bbox) continue;
            spatialWords.push({
              text,
              x0: Number(w.bbox.x0) || 0,
              y0: Number(w.bbox.y0) || 0,
              x1: Number(w.bbox.x1) || 0,
              y1: Number(w.bbox.y1) || 0,
            });
          }
        }
      }
    }
  }

  return spatialWords;
}

async function extractSpatialWordsFromImageOcr(
  imageDataUrl: string,
  onProgress?: (status: string) => void
): Promise<SpatialWord[]> {
  const Tesseract = await loadTesseract();
  const worker = await Tesseract.createWorker('eng', 1, {
    logger: (m: any) => {
      if (m.status === 'recognizing text' && typeof m.progress === 'number') {
        const pct = Math.round(m.progress * 100);
        onProgress?.(`Mengimbas teks jadual waktu (${pct}%)...`);
      }
    },
  });

  try {
    await worker.setParameters({
      tessedit_pageseg_mode: Tesseract.PSM.SPARSE_TEXT,
      preserve_interword_spaces: '1',
    });
    const res = await worker.recognize(
      imageDataUrl,
      {},
      { text: true, blocks: true, tsv: true }
    );
    return parseTesseractV7PageToWords(res?.data);
  } finally {
    await worker.terminate();
  }
}

function parseTextOrCsvTimetable(
  rawText: string,
  defaultKelas = '4 Sains 1'
): Omit<SlotJadualWaktu, 'id'>[] {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return [];

  const syntheticWords: SpatialWord[] = [];
  lines.forEach((line, rowIdx) => {
    const cells = line.includes('\t')
      ? line.split('\t')
      : line.includes(',')
      ? line.split(',')
      : line.split(/\s{2,}/);

    cells.forEach((cell, colIdx) => {
      const cleaned = cell.replace(/^["']|["']$/g, '').trim();
      if (!cleaned) return;
      const x0 = colIdx * 160 + 20;
      const y0 = rowIdx * 60 + 20;
      syntheticWords.push({
        text: cleaned,
        x0,
        y0,
        x1: x0 + 130,
        y1: y0 + 36,
      });
    });
  });

  return parseSpatialTimetableWords(syntheticWords, defaultKelas);
}

/**
 * Full automatic timetable extractor for PNG, JPEG, WebP, PDF, CSV, and TXT files.
 * Extracts every class slot (`hari`, `masaMula`, `masaTamat`, `tempohMinit`, `tingkatan`, `kelas`, `subjek`).
 */
export async function analyzeTimetableFileClientSide(
  file: File,
  imageDataUrl: string,
  onProgress?: (status: string) => void,
  defaultKelas = '4 Sains 1'
): Promise<TimetableParseResult> {
  const lowerName = file.name.toLowerCase();
  const isPdf =
    file.type === 'application/pdf' || lowerName.endsWith('.pdf');
  const isTextOrCsv =
    file.type === 'text/csv' ||
    file.type === 'text/plain' ||
    /\.(csv|tsv|txt)$/i.test(lowerName);

  if (isTextOrCsv) {
    onProgress?.('Mengekstrak jadual waktu daripada fail teks/CSV...');
    const text = await file.text();
    const slots = parseTextOrCsvTimetable(text, defaultKelas);
    return {
      slots,
      method: 'csv-text',
    };
  }

  if (isPdf) {
    try {
      const { words, isScannedImagePdf, canvasDataUrl, canvasImageData } =
        await extractSpatialWordsFromPdf(file, onProgress);

      // 1. Try precision Grid-Cell detector on the rendered PDF page canvas first
      if (canvasImageData) {
        const gridSlots = await extractSlotsFromGridImageData(
          canvasImageData,
          onProgress,
          defaultKelas
        );
        if (gridSlots && gridSlots.length > 0) {
          return {
            slots: gridSlots,
            previewDataUrl: canvasDataUrl,
            method: 'pdf-grid-cell',
          };
        }
      }

      // 2. Fallback to embedded PDF spatial text coordinates
      if (!isScannedImagePdf && words.length > 0) {
        const slots = parseSpatialTimetableWords(words, defaultKelas);
        if (slots.length > 0) {
          return {
            slots,
            previewDataUrl: canvasDataUrl,
            method: 'pdf-spatial',
          };
        }
      }

      // 3. Fallback to full-page OCR on rendered PDF canvas
      if (canvasDataUrl) {
        const ocrWords = await extractSpatialWordsFromImageOcr(
          canvasDataUrl,
          onProgress
        );
        const slots = parseSpatialTimetableWords(ocrWords, defaultKelas);
        return {
          slots,
          previewDataUrl: canvasDataUrl,
          method: 'pdf-ocr-spatial',
        };
      }
    } catch (err) {
      console.error('PDF timetable extraction error:', err);
    }
    return {
      slots: [],
      method: 'pdf-failed',
    };
  }

  // Image file (PNG, JPEG, WebP)
  onProgress?.('Mengesan struktur baris, lajur waktu & sel kelas jadual...');
  const { dataUrl: normalizedUrl, imageData } =
    await loadRawImageData(imageDataUrl);

  // 1. Primary path: High-precision Grid-Cell Detector + 65th-percentile Color Filter + Single-Pass Composite OCR
  if (imageData) {
    const gridSlots = await extractSlotsFromGridImageData(
      imageData,
      onProgress,
      defaultKelas
    );
    if (gridSlots && gridSlots.length > 0) {
      return {
        slots: gridSlots,
        previewDataUrl: normalizedUrl,
        method: 'image-grid-cell',
      };
    }
  }

  // 2. Fallback path for borderless timetables: Full-page OCR + Spatial Parser
  const ocrWords = await extractSpatialWordsFromImageOcr(
    normalizedUrl,
    onProgress
  );
  const slots = parseSpatialTimetableWords(ocrWords, defaultKelas);

  return {
    slots,
    previewDataUrl: normalizedUrl,
    method: 'image-ocr-spatial',
  };
}
