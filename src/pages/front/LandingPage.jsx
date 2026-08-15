import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FRONT_PLANS, planPriceLabel } from '../../data/front';
import { CONTACT_PHONE, OWNER_NAME } from '../../data/seed';
import { formatCurrency } from '../../utils/format';

const FEATURES = [
  { title: 'Users and roles', body: 'Invite the team. Decide who can edit catalog, orders, and reports.', Icon: PeopleOutlineIcon },
  { title: 'Catalog and stock', body: 'SKUs, categories, and restock alerts stay in one catalog.', Icon: Inventory2OutlinedIcon },
  { title: 'Orders in ₹', body: 'Invoices, payments, and fulfillment with Indian Rupee totals.', Icon: ReceiptLongOutlinedIcon },
  { title: 'Live dashboards', body: 'CRM, ecommerce, and analytics on the same workspace data.', Icon: AssessmentOutlinedIcon },
  { title: 'Chat and alerts', body: 'Keep conversations and notifications inside the console.', Icon: ChatBubbleOutlineIcon },
  { title: 'Access control', body: 'Roles, permissions, and a matrix for every module.', Icon: SecurityOutlinedIcon },
];

const MODULES = [
  { title: 'Overview', body: 'GMV, fulfillment, and the work still waiting.', to: '/dashboard' },
  { title: 'CRM', body: 'Pipeline value, owners, and follow-ups.', to: '/dashboard/crm' },
  { title: 'Ecommerce', body: 'Funnel, channels, and what is selling.', to: '/dashboard/ecommerce' },
  { title: 'Analytics', body: 'Sessions, devices, and demand by region.', to: '/dashboard/analytics' },
];

const STEPS = [
  { step: '01', title: 'Open the demo', body: 'Sign in with a sample account. Data stays in this browser.' },
  { step: '02', title: 'Load the workspace', body: 'Users, catalog, customers, and orders are already seeded.' },
  { step: '03', title: 'Run the day', body: 'Switch dashboards, chat, reports, and the template customizer.' },
];

const TESTIMONIALS = [
  {
    quote: 'CRM and orders finally live in one console. We stopped exporting sheets every Friday.',
    name: 'Priya Shah',
    role: 'People lead',
    initials: 'PS',
  },
  {
    quote: '₹ dashboards made month-end reporting faster. The customizer is enough for our brand.',
    name: 'Jordan Lee',
    role: 'Sales manager',
    initials: 'JL',
  },
  {
    quote: 'Staff can update stock without touching roles they should not see.',
    name: 'Taylor Chen',
    role: 'Fulfillment',
    initials: 'TC',
  },
];

const FAQS = [
  { q: 'Can I try before buying?', a: 'Yes. Use admin@demo.com / Admin@123. Everything stays local to this browser.' },
  { q: 'Is billing only in Indian Rupees?', a: 'Plans, invoices, and dashboard totals are in ₹. Yearly billing saves two months.' },
  { q: 'Can I restyle the console?', a: 'Open Template Customizer to change color, skin, menu, and content width.' },
  { q: 'Who helps with setup?', a: `Call ${OWNER_NAME} on ${CONTACT_PHONE} for a walkthrough of roles and reports.` },
];

function Section({ id, children, tone = 'plain' }) {
  return (
    <section id={id} className={`p-land__section p-land__section--${tone}`}>
      <div className="p-land__inner">{children}</div>
    </section>
  );
}

export function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="p-land">
      <section className="p-land__hero" aria-labelledby="land-hero-title">
        <div className="p-land__hero-bg" aria-hidden />
        <div className="p-land__hero-shell">
          <div className="p-land__hero-copy">
            <h1 id="land-hero-title" className="p-land__hero-title">
              Stock in view.
              <br />
              Customers close.
              <br />
              Cash in ₹.
            </h1>
            <p className="p-land__hero-lead">
              Roles, CRM, and live reports for {OWNER_NAME}’s team — without another spreadsheet.
            </p>
            <div className="p-land__hero-actions">
              <button type="button" className="p-land__btn p-land__btn--light" onClick={() => navigate('/login')}>
                Launch demo
                <ArrowForwardRoundedIcon fontSize="small" />
              </button>
              <button type="button" className="p-land__btn p-land__btn--ghost" onClick={() => navigate('/front/pricing')}>
                See plans in ₹
              </button>
            </div>
            <ul className="p-land__hero-points">
              <li>No install</li>
              <li>Demo in-browser</li>
              <li>{CONTACT_PHONE}</li>
            </ul>
          </div>

          <div className="p-land__hero-visual" aria-hidden>
            <div className="p-land__stage">
              <div className="p-land__stage-side">
                <span />
                <span />
                <span className="is-on" />
                <span />
                <span />
              </div>
              <div className="p-land__stage-main">
                <div className="p-land__stage-top">
                  <div>
                    <small>Good evening</small>
                    <p>Operations workspace</p>
                  </div>
                  <em>Live</em>
                </div>
                <div className="p-land__stage-row">
                  <div>
                    <small>Paid revenue</small>
                    <strong>{formatCurrency(30110)}</strong>
                  </div>
                  <div>
                    <small>Orders</small>
                    <strong>226</strong>
                  </div>
                  <div>
                    <small>Fulfillment</small>
                    <strong>92%</strong>
                  </div>
                </div>
                <div className="p-land__stage-chart">
                  {[42, 58, 51, 67, 74, 63, 88, 79, 91, 84].map((h, i) => (
                    <span key={i} style={{ '--h': `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section id="product" tone="plain">
        <header className="p-land__head">
          <h2>Built for the shift, not the slide deck.</h2>
          <p>Stock, invoices, chat, and permissions stay close so staff move faster and admins keep control.</p>
        </header>
        <ul className="p-land__features">
          {FEATURES.map((item) => (
            <li key={item.title}>
              <span className="p-land__icon">
                <item.Icon fontSize="small" aria-hidden />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <header className="p-land__head">
          <h2>Four dashboards. One source of truth.</h2>
          <p>Jump into the view your team already uses every morning.</p>
        </header>
        <div className="p-land__modules">
          {MODULES.map((item) => (
            <button key={item.title} type="button" className="p-land__module" onClick={() => navigate(item.to)}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span>
                Open
                <ArrowForwardRoundedIcon fontSize="inherit" />
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section tone="plain">
        <header className="p-land__head is-center">
          <h2>Live before the tea gets cold.</h2>
        </header>
        <ol className="p-land__steps">
          {STEPS.map((item) => (
            <li key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper">
        <header className="p-land__head">
          <h2>Quiet praise from the floor.</h2>
        </header>
        <div className="p-land__quotes">
          {TESTIMONIALS.map((item) => (
            <figure key={item.name}>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <span className="p-land__avatar">{item.initials}</span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section tone="plain">
        <header className="p-land__head p-land__head--split">
          <div>
            <h2>Clear ₹ plans</h2>
          </div>
          <button type="button" className="p-land__text-link" onClick={() => navigate('/front/pricing')}>
            Compare yearly billing
            <ArrowForwardRoundedIcon fontSize="small" />
          </button>
        </header>
        <div className="p-land__plans">
          {FRONT_PLANS.map((plan) => (
            <article key={plan.id} className={plan.popular ? 'is-popular' : undefined}>
              <div className="p-land__plan-top">
                <h3>{plan.name}</h3>
                {plan.popular && <span className="p-land__pill">Most used</span>}
              </div>
              <p className="p-land__amount">{planPriceLabel(plan.monthly, false)}</p>
              <p className="p-land__blurb">{plan.blurb}</p>
              <ul>
                {plan.features.slice(0, 4).map((feature) => (
                  <li key={feature}>
                    <CheckRoundedIcon fontSize="small" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={plan.popular ? 'p-land__btn p-land__btn--solid' : 'p-land__btn p-land__btn--outline'}
                onClick={() => navigate(`/front/payment?plan=${plan.id}&cycle=monthly`)}
              >
                Choose {plan.name}
              </button>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="p-land__faq-grid">
          <header className="p-land__head">
            <h2>Before you sign in</h2>
            <p>
              Still stuck? Call {OWNER_NAME} on {CONTACT_PHONE}.
            </p>
          </header>
          <div className="p-land__faq">
            {FAQS.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.q} className={open ? 'is-open' : undefined}>
                  <button type="button" onClick={() => setOpenFaq(open ? -1 : index)} aria-expanded={open}>
                    <span>{item.q}</span>
                    <ExpandMoreIcon fontSize="small" />
                  </button>
                  {open && <p>{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section tone="cta">
        <div className="p-land__cta">
          <div>
            <h2>Open the console and keep the day moving.</h2>
            <p>Demo credentials stay on this device. No install. No shared cloud tenant.</p>
          </div>
          <div className="p-land__cta-actions">
            <button type="button" className="p-land__btn p-land__btn--light" onClick={() => navigate('/login')}>
              Launch demo
            </button>
            <button type="button" className="p-land__btn p-land__btn--ghost" onClick={() => navigate('/front/help')}>
              <SupportAgentOutlinedIcon fontSize="small" />
              Talk to help
            </button>
          </div>
          <ul className="p-land__cta-points">
            <li>
              <SpeedOutlinedIcon fontSize="small" aria-hidden />
              Fast local demo
            </li>
            <li>
              <SecurityOutlinedIcon fontSize="small" aria-hidden />
              Role-ready access
            </li>
            <li>
              <ReceiptLongOutlinedIcon fontSize="small" aria-hidden />
              ₹ totals everywhere
            </li>
          </ul>
        </div>
      </Section>
    </div>
  );
}
