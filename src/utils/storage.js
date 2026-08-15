const PREFIX = 'mui-admin:';

export function loadState(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveState(key, value) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export function removeState(key) {
  localStorage.removeItem(PREFIX + key);
}
