import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatRelative } from '../../utils/format';

const TONE = {
  pending: 'warning',
  processing: 'info',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'danger',
};

function label(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}

export function RecentOrders({ orders, limit = 6, variant = 'feed' }) {
  const navigate = useNavigate();
  const rows = [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);

  if (variant === 'table') {
    return (
      <ul className="c-panel c-panel--table">
        <li className="c-panel__cols" aria-hidden>
          <span>Order</span>
          <span>Customer</span>
          <span>Total</span>
          <span>Status</span>
        </li>
        {rows.map((order) => (
          <li key={order.id}>
            <button type="button" className="c-panel__item" onClick={() => navigate(`/orders/${order.id}`)}>
              <span>
                <span className="c-panel__title">{order.orderNumber}</span>
                <span className="c-panel__meta">{order.items.length} item{order.items.length === 1 ? '' : 's'}</span>
              </span>
              <span>
                <span className="c-panel__title">{order.customerName}</span>
                <span className="c-panel__meta">{formatRelative(order.createdAt)}</span>
              </span>
              <span className="c-panel__value">{formatCurrency(order.total)}</span>
              <span className={`c-badge c-badge--${TONE[order.status] ?? 'neutral'}`}>{label(order.status)}</span>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="c-panel">
      {rows.map((order) => (
        <li key={order.id}>
          <button type="button" className="c-panel__item" onClick={() => navigate(`/orders/${order.id}`)}>
            <span className="c-panel__media" aria-hidden>
              {initials(order.customerName)}
            </span>
            <span className="c-panel__body">
              <span className="c-panel__title">{order.orderNumber}</span>
              <span className="c-panel__meta">
                {order.customerName} · {order.items.length} item{order.items.length === 1 ? '' : 's'} · {formatRelative(order.createdAt)}
              </span>
            </span>
            <span className="c-panel__aside">
              <span className="c-panel__value">{formatCurrency(order.total)}</span>
              <span className={`c-badge c-badge--${TONE[order.status] ?? 'neutral'}`}>{label(order.status)}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
