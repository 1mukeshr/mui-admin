const PREFIX = 'tejas-mui:';
const LEGACY_PREFIX = 'mui-admin:';

function readRaw(key) {
  return localStorage.getItem(PREFIX + key) ?? localStorage.getItem(LEGACY_PREFIX + key);
}

export function loadState(key, fallback) {
  try {
    const raw = readRaw(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveState(key, value) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
  localStorage.removeItem(LEGACY_PREFIX + key);
}

export function removeState(key) {
  localStorage.removeItem(PREFIX + key);
  localStorage.removeItem(LEGACY_PREFIX + key);
}
