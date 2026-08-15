import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FRONT_PLANS, planPriceLabel } from '../../data/front';
import { CONTACT_PHONE, OWNER_NAME } from '../../data/seed';

export function PaymentPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const plan = FRONT_PLANS.find((item) => item.id === params.get('plan')) ?? FRONT_PLANS[1];
  const yearly = params.get('cycle') === 'yearly';
  const [paid, setPaid] = useState(false);
  const [form, setForm] = useState({
    name: OWNER_NAME,
    email: 'admin@demo.com',
    phone: CONTACT_PHONE,
    card: '4242 4242 4242 4242',
    expiry: '08/28',
    cvv: '123',
    method: 'card',
  });

  const total = useMemo(() => planPriceLabel(plan.monthly, yearly), [plan.monthly, yearly]);

  return (
    <div className="p-site">
      <header className="p-site__hero p-site__hero--compact">
        <div className="p-site__hero-inner">
          <p className="p-site__kicker">Payment</p>
          <h1>Complete your plan</h1>
          <p className="p-site__lead">
            {plan.name} · {yearly ? 'Yearly' : 'Monthly'} · {total}
          </p>
        </div>
      </header>

      <section className="p-site__section">
        <div className="p-site__inner p-site__split">
          <article className="p-site__panel">
            {paid && (
              <div className="p-site__alert" role="status">
                Payment recorded in this browser. Open the console to continue.
              </div>
            )}

            <form
              className="p-site__form"
              onSubmit={(event) => {
                event.preventDefault();
                setPaid(true);
              }}
            >
              <label className="p-site__field">
                <span>Name on card</span>
                <input
                  autoComplete="cc-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                <span>Phone</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </label>

              <fieldset className="p-site__methods">
                <legend>Payment method</legend>
                {[
                  { id: 'card', label: 'Card' },
                  { id: 'upi', label: 'UPI' },
                  { id: 'netbanking', label: 'Net banking' },
                ].map((method) => (
                  <label key={method.id} className={form.method === method.id ? 'is-active' : undefined}>
                    <input
                      type="radio"
                      name="method"
                      value={method.id}
                      checked={form.method === method.id}
                      onChange={() => setForm({ ...form, method: method.id })}
                    />
                    {method.label}
                  </label>
                ))}
              </fieldset>

              {form.method === 'card' && (
                <>
                  <label className="p-site__field">
                    <span>Card number</span>
                    <input
                      autoComplete="cc-number"
                      value={form.card}
                      onChange={(e) => setForm({ ...form, card: e.target.value })}
                      required
                    />
                  </label>
                  <div className="p-site__row">
                    <label className="p-site__field">
                      <span>Expiry</span>
                      <input
                        autoComplete="cc-exp"
                        value={form.expiry}
                        onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                        required
                      />
                    </label>
                    <label className="p-site__field">
                      <span>CVV</span>
                      <input
                        autoComplete="cc-csc"
                        value={form.cvv}
                        onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                        required
                      />
                    </label>
                  </div>
                </>
              )}

              {form.method === 'upi' && (
                <label className="p-site__field">
                  <span>UPI ID</span>
                  <input placeholder="name@upi" required />
                </label>
              )}

              {form.method === 'netbanking' && (
                <label className="p-site__field">
                  <span>Bank</span>
                  <select defaultValue="hdfc">
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="sbi">State Bank of India</option>
                  </select>
                </label>
              )}

              <button type="submit" className="p-site__btn p-site__btn--solid">
                Pay {total}
              </button>
            </form>
          </article>

          <aside className="p-site__summary">
            <h2>Order summary</h2>
            <div className="p-site__summary-plan">
              <strong>{plan.name}</strong>
              <span>
                {yearly ? 'Yearly' : 'Monthly'} billing
              </span>
            </div>
            <ul className="p-site__summary-list">
              {plan.features.slice(0, 4).map((feature) => (
                <li key={feature}>
                  <CheckRoundedIcon fontSize="small" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="p-site__summary-total">
              <span>Total due</span>
              <strong>{total}</strong>
            </div>
            <button type="button" className="p-site__btn p-site__btn--outline" onClick={() => navigate('/front/pricing')}>
              Change plan
            </button>
            {paid && (
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
