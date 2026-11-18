import { doc, getDoc, setDoc, increment } from '@firebase/firestore';
import { db } from './firebase';

export interface VisitorStats {
  total: number;
  today: number;
}

const LOCAL_STORAGE_KEY = 'erph_visitor_stats_cache';

export async function recordLandingVisit(): Promise<VisitorStats> {
  let currentTotal = 136;
  let currentToday = 1;

  // 1. Read cached stats if available for instant display
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (typeof parsed.total === 'number') {
        currentTotal = parsed.total;
        currentToday = parsed.today || 1;
      }
    }
  } catch {
    // ignore
  }

  // 2. Record via Backend API (/api/visitors/record)
  try {
    const res = await fetch('/api/visitors/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || '',
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.total === 'number') {
        currentTotal = data.total;
        currentToday = data.today || 1;
      }
    }
  } catch (err) {
    console.warn('API visitor record fallback:', err);
  }

  // 3. Try syncing with Firestore (atomic global counter)
  try {
    const statsRef = doc(db, 'visitor_stats', 'landing_page');
    await setDoc(
      statsRef,
      {
        total: increment(1),
        lastVisitedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    const snap = await getDoc(statsRef);
    if (snap.exists()) {
      const firestoreTotal = snap.data()?.total;
      if (typeof firestoreTotal === 'number' && firestoreTotal > currentTotal) {
        currentTotal = firestoreTotal;
      }
    }
  } catch {
    // Firestore rules may restrict anonymous write, server endpoint handles count
  }

  // 4. Save to local storage for instant hydration next time
  try {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ total: currentTotal, today: currentToday, timestamp: Date.now() })
    );
  } catch {
    // ignore
  }

  return { total: currentTotal, today: currentToday };
}

export async function fetchVisitorStats(): Promise<VisitorStats> {
  let cachedStats: VisitorStats = { total: 136, today: 1 };
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.total === 'number') {
        cachedStats = { total: parsed.total, today: parsed.today || 1 };
      }
    }
  } catch {
    // ignore
  }

  try {
    const res = await fetch('/api/visitors');
    if (res.ok) {
      const data = await res.json();
      if (typeof data.total === 'number') {
        return { total: data.total, today: data.today || 1 };
      }
    }
  } catch {
    // ignore
  }

  try {
    const statsRef = doc(db, 'visitor_stats', 'landing_page');
    const snap = await getDoc(statsRef);
    if (snap.exists() && typeof snap.data()?.total === 'number') {
      return { total: snap.data().total, today: cachedStats.today };
    }
  } catch {
    // ignore
  }

  return cachedStats;
}
