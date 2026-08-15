import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/format';

export function TopProducts({ products, orders, limit = 5, variant = 'ranked' }) {
  const navigate = useNavigate();
  const rows = [...products]
    .map((product) => ({
      ...product,
      sold: orders.reduce((sum, order) => sum + (order.items.find((item) => item.productId === product.id)?.quantity ?? 0), 0),
    }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, limit);
  const maxSold = Math.max(...rows.map((item) => item.sold), 1);

  if (variant === 'tiles') {
    return (
      <ul className="c-panel c-panel--tiles">
        {rows.map((product) => (
          <li key={product.id}>
            <button type="button" className="c-tile" onClick={() => navigate(`/products/${product.id}`)}>
              <span className="c-tile__top">
                <span className="c-tile__name">{product.name}</span>
              </span>
              <span className="c-meter" aria-hidden>
                <span style={{ width: `${(product.sold / maxSold) * 100}%` }} />
              </span>
              <span className="c-tile__foot">
                <span className="c-panel__meta">{product.sold} sold</span>
                <strong>{formatCurrency(product.price * product.sold)}</strong>
              </span>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="c-panel">
      {rows.map((product) => (
        <li key={product.id}>
          <button type="button" className="c-panel__item" onClick={() => navigate(`/products/${product.id}`)}>
            <span className="c-panel__lead">
              {product.image ? (
                <span className="c-panel__media is-square">
                  <img src={product.image} alt="" />
                </span>
              ) : (
                <span className="c-panel__media is-square" aria-hidden>
                  {product.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>
            <span className="c-panel__body">
              <span className="c-panel__title">{product.name}</span>
              <span className="c-panel__meta">
                {product.sku} · {product.sold} sold
              </span>
              <span className="c-meter" aria-hidden>
                <span style={{ width: `${(product.sold / maxSold) * 100}%` }} />
              </span>
            </span>
            <span className="c-panel__aside">
              <span className="c-panel__value">{formatCurrency(product.price * product.sold)}</span>
              <span className="c-panel__meta">{formatCurrency(product.price)} each</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
