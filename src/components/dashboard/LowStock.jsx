import { useNavigate } from 'react-router-dom';

const THRESHOLD = 18;

export function LowStock({ products, limit = 5 }) {
  const navigate = useNavigate();
  const rows = [...products]
    .filter((product) => product.stock <= THRESHOLD || product.status === 'out_of_stock')
    .sort((a, b) => a.stock - b.stock)
    .slice(0, limit);

  if (!rows.length) {
    return <p className="c-panel__empty">All tracked SKUs are above the restock line.</p>;
  }

  return (
    <ul className="c-panel c-panel--stock">
      {rows.map((product) => {
        const empty = product.stock <= 0;

        return (
          <li key={product.id}>
            <button type="button" className="c-panel__item" onClick={() => navigate(`/products/${product.id}`)}>
              {product.image ? (
                <span className="c-panel__media is-square">
                  <img src={product.image} alt="" />
                </span>
              ) : (
                <span className="c-panel__media is-square" aria-hidden>
                  {product.name.slice(0, 2).toUpperCase()}
                </span>
              )}
              <span className="c-panel__body">
                <span className="c-panel__title">{product.name}</span>
                <span className="c-panel__meta">{product.sku}</span>
              </span>
              <span className="c-panel__aside">
                <span className={`c-panel__value ${empty ? 'is-danger' : 'is-warn'}`}>
                  {empty ? '0' : product.stock}
                </span>
                <span className="c-panel__meta">{empty ? 'Out of stock' : 'units left'}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
