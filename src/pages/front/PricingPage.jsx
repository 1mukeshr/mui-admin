import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FRONT_PLANS, planPriceLabel } from '../../data/front';
import { CONTACT_PHONE, OWNER_NAME } from '../../data/seed';

export function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-site">
      <header className="p-site__hero">
        <div className="p-site__hero-inner">
          <p className="p-site__kicker">Pricing</p>
          <h1>Simple pricing in ₹</h1>
          <p className="p-site__lead">Pick a plan for the MUI Admin workspace. Yearly billing saves two months.</p>
          <div className="p-site__toggle" role="group" aria-label="Billing cycle">
            <button type="button" className={!yearly ? 'is-active' : undefined} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button type="button" className={yearly ? 'is-active' : undefined} onClick={() => setYearly(true)}>
              Yearly
            </button>
          </div>
        </div>
      </header>

      <section className="p-site__section">
        <div className="p-site__inner">
          <div className="p-site__plans">
            {FRONT_PLANS.map((plan) => (
              <article key={plan.id} className={plan.popular ? 'is-popular' : undefined}>
                <div className="p-site__plan-top">
                  <h2>{plan.name}</h2>
                  {plan.popular && <span className="p-site__pill">Popular</span>}
                </div>
                <p className="p-site__amount">{planPriceLabel(plan.monthly, yearly)}</p>
                <p className="p-site__blurb">{plan.blurb}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <CheckRoundedIcon fontSize="small" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={plan.popular ? 'p-site__btn p-site__btn--solid' : 'p-site__btn p-site__btn--outline'}
                  onClick={() => navigate(`/front/payment?plan=${plan.id}&cycle=${yearly ? 'yearly' : 'monthly'}`)}
                >
                  Choose {plan.name}
                </button>
              </article>
            ))}
          </div>
          <p className="p-site__note">
            Need a custom workspace? Call {OWNER_NAME} on {CONTACT_PHONE}.
          </p>
        </div>
      </section>
    </div>
  );
}
