const TONE_MAP = {
  active: 'success',
  delivered: 'success',
  paid: 'success',
  pending: 'warning',
  processing: 'info',
  shipped: 'info',
  draft: 'neutral',
  inactive: 'neutral',
  cancelled: 'danger',
  failed: 'danger',
  refunded: 'warning',
  out_of_stock: 'danger',
};

function label(value) {
  return String(value)
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function StatusChip({ value }) {
  const tone = TONE_MAP[value] ?? 'neutral';
  return <span className={`c-badge c-badge--${tone}`}>{label(value)}</span>;
}
