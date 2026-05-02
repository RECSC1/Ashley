// Tiny localStorage-backed log used by demo tools and admin dashboard.
// Safe in SSR — checks for window.

const KEYS = {
  COMMUTE: 'asr_commute_log',
  SCHOOLS: 'asr_school_log',
  DIRECTION: 'asr_direction_log',
  LANDMARKS: 'asr_landmark_log',
  COMPARE: 'asr_compare_log',
  MORTGAGE: 'asr_mortgage_log',
  VALUATION: 'asr_valuation_log',
  CONTACT: 'asr_contact_log',
  CHAT: 'asr_chat_log',
  ALERTS: 'asr_alert_log',
  GUIDES: 'asr_guide_downloads',
  LISTINGS_GEN: 'asr_listings_gen_log',
};

export function logEvent(key, payload) {
  if (typeof window === 'undefined') return;
  try {
    const list = JSON.parse(window.localStorage.getItem(key) || '[]');
    list.unshift({ ...payload, ts: new Date().toISOString() });
    window.localStorage.setItem(key, JSON.stringify(list.slice(0, 200)));
  } catch (_e) {
    // ignore
  }
}

export function readLog(key) {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(key) || '[]');
  } catch (_e) {
    return [];
  }
}

export function clearLog(key) {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
}

export { KEYS };
