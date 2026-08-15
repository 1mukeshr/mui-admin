import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTACT_PHONE, OWNER_NAME } from '../../data/seed';
import { formatCurrency } from '../../utils/format';

const ITEMS = [
  { name: 'Pulse Smartwatch', qty: 1, price: 1499 },
  { name: 'Canvas Field Jacket', qty: 1, price: 4290 },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name: OWNER_NAME,
    phone: CONTACT_PHONE,
    email: 'admin@demo.com',
    address: 'C-14, Civil Lines',
    city: 'Jaipur',
    pincode: '302006',
  });

  const subtotal = useMemo(() => ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0), []);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="p-site">
      <header className="p-site__hero p-site__hero--compact">
        <div className="p-site__hero-inner">
          <p className="p-site__kicker">Checkout</p>
          <h1>Ship the demo order</h1>
          <p className="p-site__lead">Catalog checkout in ₹. Nothing leaves this browser.</p>
        </div>
      </header>

      <section className="p-site__section">
        <div className="p-site__inner p-site__split">
          <article className="p-site__panel">
            {placed && (
              <div className="p-site__alert" role="status">
                Order placed in this browser. Confirmation can go to {form.phone}.
              </div>
            )}

            <form
              className="p-site__form"
              onSubmit={(event) => {
                event.preventDefault();
                setPlaced(true);
              }}
            >
              <h2 className="p-site__subhead">Shipping</h2>

              <label className="p-site__field">
                <span>Full name</span>
                <input
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>
              <label className="p-site__field">
                <span>Phone</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </label>
              <label className="p-site__field">
                <span>Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </label>
              <label className="p-site__field">
                <span>Address</span>
                <input
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                />
              </label>
              <div className="p-site__row">
                <label className="p-site__field">
                  <span>City</span>
                  <input
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    required
                  />
                </label>
                <label className="p-site__field">
                  <span>PIN code</span>
                  <input
                    autoComplete="postal-code"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    required
                  />
                </label>
              </div>

              <button type="submit" className="p-site__btn p-site__btn--solid">
                Place order · {formatCurrency(total)}
              </button>
            </form>
          </article>

          <aside className="p-site__summary">
            <h2>Order summary</h2>
            <ul className="p-site__lines">
              {ITEMS.map((item) => (
                <li key={item.name}>
                  <span>
                    {item.name}
                    <small>× {item.qty}</small>
                  </span>
                  <strong>{formatCurrency(item.price * item.qty)}</strong>
                </li>
              ))}
            </ul>
            <div className="p-site__summary-meta">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="p-site__summary-total">
              <span>Total due</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
            <button type="button" className="p-site__btn p-site__btn--outline" onClick={() => navigate('/front/pricing')}>
              View plans instead
            </button>
            {placed && (
              <button type="button" className="p-site__btn p-site__btn--solid" onClick={() => navigate('/login')}>
                Go to console
              </button>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
