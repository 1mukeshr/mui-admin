/** Date helpers for admin range filters (local calendar days). */

export function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function endOfDay(date) {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}

export function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function startOfMonth(date) {
  return startOfDay(new Date(date.getFullYear(), date.getMonth(), 1));
}

export function endOfMonth(date) {
  return endOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

export function sameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function isBeforeDay(a, b) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfterDay(a, b) {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function toInputValue(date) {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function fromInputValue(value) {
  if (!value) return null;
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return null;
  return startOfDay(new Date(y, m - 1, d));
}

export function formatRangeLabel(start, end) {
  if (!start || !end) return 'Select dates';
  const opts = { month: 'short', day: 'numeric', year: 'numeric' };
  const left = new Intl.DateTimeFormat('en-IN', opts).format(start);
  const right = new Intl.DateTimeFormat('en-IN', opts).format(end);
  if (sameDay(start, end)) return left;
  return `${left} – ${right}`;
}

export function inDateRange(value, start, end) {
  if (!value || !start || !end) return true;
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return true;
  return time >= startOfDay(start).getTime() && time <= endOfDay(end).getTime();
}

export const DATE_PRESETS = [
  {
    id: 'today',
    label: 'Today',
    range: () => {
      const today = startOfDay(new Date());
      return { start: today, end: endOfDay(today) };
    },
  },
  {
    id: '7d',
    label: 'Last 7 days',
    range: () => {
      const end = endOfDay(new Date());
      return { start: startOfDay(addDays(end, -6)), end };
    },
  },
  {
    id: '30d',
    label: 'Last 30 days',
    range: () => {
      const end = endOfDay(new Date());
      return { start: startOfDay(addDays(end, -29)), end };
    },
  },
  {
    id: 'month',
    label: 'This month',
    range: () => {
      const now = new Date();
      return { start: startOfMonth(now), end: endOfMonth(now) };
    },
  },
  {
    id: 'last_month',
    label: 'Last month',
    range: () => {
      const now = new Date();
      const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return { start: startOfMonth(prev), end: endOfMonth(prev) };
    },
  },
  { id: 'custom', label: 'Custom', range: null },
];

export function defaultDateRange(presetId = '30d') {
  const preset = DATE_PRESETS.find((item) => item.id === presetId) ?? DATE_PRESETS[2];
  const { start, end } = preset.range();
  return { start, end, preset: preset.id };
}

export function matchPreset(start, end) {
  return (
    DATE_PRESETS.find((item) => {
      if (!item.range) return false;
      const next = item.range();
      return sameDay(next.start, start) && sameDay(next.end, end);
    })?.id ?? 'custom'
  );
}
