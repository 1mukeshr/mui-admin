export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

/** Compact axis/tick label for chart values in thousands of rupees. */
export function formatInrK(value) {
  return `₹${Math.round(Number(value) / 1000)}k`;
}

/** Month-over-month style delta for StatCards (`+12.4%` / `-3%`). Pass `invert` when a drop is good (e.g. bounce). */
export function formatPercentChange(current, previous, { invert = false, digits = 1 } = {}) {
  if (current == null || previous == null || !Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) {
    return undefined;
  }
  let pct = ((Number(current) - Number(previous)) / Math.abs(Number(previous))) * 100;
  if (invert) pct = -pct;
  const factor = 10 ** digits;
  const rounded = Math.round(pct * factor) / factor;
  if (Object.is(rounded, -0) || rounded === 0) return '0%';
  return `${rounded > 0 ? '+' : ''}${rounded}%`;
}

export function formatDate(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export function formatDateTime(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export function formatNotificationAgo(value) {
  if (!value) return '—';
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000));
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1h ago';
  if (hours < 24) return `${hours}hr ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

export function formatRelative(value) {
  if (!value) return 'Never';
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(value);
}

export function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

export function roleLabel(role) {
  return role
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
