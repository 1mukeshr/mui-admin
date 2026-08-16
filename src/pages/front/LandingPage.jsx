import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BRAND_FULL, BRAND_NAME } from '../../data/brand';
import { FRONT_PLANS, planPriceLabel } from '../../data/front';
import {
  CssIcon,
  EmotionIcon,
  MuiIcon,
  ReactIcon,
  ReactRouterIcon,
  RechartsIcon,
  ViteIcon,
} from '../../components/front/TechBrandIcons';

const FEATURES = [
  { title: 'Responsive Design', body: 'Layouts that hold up from phone to wide desktop consoles.', Icon: DevicesOutlinedIcon },
  { title: 'Reusable Components', body: 'Shared building blocks for forms, tables, charts, and states.', Icon: ExtensionOutlinedIcon },
  { title: 'Theme Support', body: 'Light, dark, and custom primary colors from the customizer.', Icon: PaletteOutlinedIcon },
  { title: 'Accessibility', body: 'Semantic structure, focus states, and keyboard-friendly flows.', Icon: AccessibilityNewOutlinedIcon },
  { title: 'Fast Performance', body: 'Vite + lean CSS shell so demos feel snappy on first load.', Icon: SpeedOutlinedIcon },
  { title: 'Customizable UI', body: 'Menu, navbar, skin, and content width without a rebuild.', Icon: TuneOutlinedIcon },
];

const SHOWCASE = [
  { title: 'Buttons', body: 'Primary, outline, and ghost actions', to: '/pages/popups' },
  { title: 'Cards', body: 'Stat and chart surfaces', to: '/dashboard' },
  { title: 'Forms', body: 'Fields, layouts, and wizards', to: '/forms/elements/text' },
  { title: 'Dialogs', body: 'Alert, confirm, and form popups', to: '/pages/popups' },
  { title: 'Tables', body: 'Basic and data grids', to: '/tables/basic' },
  { title: 'Tabs', body: 'Basic, icons, pills, vertical', to: '/pages/tabs/basic' },
  { title: 'Alerts', body: 'Status and system pages', to: '/system/error' },
  { title: 'Chips', body: 'Status badges across lists', to: '/users' },
  { title: 'Avatars', body: 'Profile and chat faces', to: '/apps/chat' },
];

const STATS = [
  { value: '50+', label: 'Components' },
  { value: '100+', label: 'Screens' },
  { value: '99%', label: 'Responsive' },
  { value: '24/7', label: 'Demo access' },
];

const WHY = [
  { title: 'Consistent design', body: 'One token system across marketing, auth, and console.' },
  { title: 'Mobile responsive', body: 'Sidebar, tables, and forms adapt without a second layout.' },
  { title: 'Easy customization', body: 'Template customizer for color, skin, and navigation.' },
  { title: 'Developer friendly', body: 'React + MUI + clear folder structure you can extend.' },
];

const TECH = [
  { name: 'React 19', tag: 'UI runtime', body: 'Component model for marketing, auth, and the ops console.', Icon: ReactIcon },
  { name: 'Vite 6', tag: 'Build tool', body: 'Fast local dev and production builds for portfolio demos.', Icon: ViteIcon },
  { name: 'Material UI 6', tag: 'Components', body: 'Icons and primitives wired into a custom CSS shell.', Icon: MuiIcon },
  { name: 'Emotion', tag: 'Styling', body: 'Styling engine that powers MUI theme and overrides.', Icon: EmotionIcon },
  { name: 'React Router 7', tag: 'Routing', body: 'Public pages, guest auth, and protected console routes.', Icon: ReactRouterIcon },
  { name: 'Recharts', tag: 'Charts', body: 'Dashboard KPIs, funnels, and analytics visuals.', Icon: RechartsIcon },
  { name: 'CSS tokens', tag: 'Design system', body: 'Semantic HTML + CSS variables for light, dark, and skins.', Icon: CssIcon },
];

const TEMPLATES = [
  { title: 'Admin Dashboard', body: 'Overview KPIs, activity, and stock signals.', to: '/dashboard' },
  { title: 'E-commerce', body: 'GMV, funnel, and channel performance.', to: '/dashboard/ecommerce' },
  { title: 'CRM', body: 'Pipeline, win rate, and follow-ups.', to: '/dashboard/crm' },
  { title: 'Finance', body: '₹ reports with CSV and PDF export.', to: '/reports/revenue' },
  { title: 'Education', body: 'Roles and matrix for learning teams.', to: '/access/roles' },
  { title: 'Healthcare', body: 'Secure access patterns for sensitive ops.', to: '/access/permissions' },
];

const FAQS = [
  {
    q: 'What is Tejas MUI?',
    a: 'A React + Material UI operations console with dashboards, catalog, orders, roles, and a live theme customizer. Demo data stays in your browser.',
  },
  {
    q: 'How do I customize the UI?',
    a: 'Open the Template Customizer to change primary color, light/dark mode, skin, menu layout, and navbar — no rebuild required.',
  },
  {
    q: 'Does dark mode work?',
    a: 'Yes. Use the header theme toggle or the customizer preference. Your choice is saved locally for the next visit.',
  },
  {
    q: 'Is it mobile responsive?',
    a: 'Landing, auth, and the admin console adapt from phone to desktop, including sidebar, tables, and forms.',
  },
  {
    q: 'How do I run the project?',
    a: 'Clone the repo, run npm install, then npm run dev. Routes live in App.jsx and pages under src/pages.',
  },
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
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState(0);

  const openApp = (to) => {
    if (!user) {
      navigate('/login', { state: { from: to } });
      return;
    }
    navigate(to);
  };

  return (
    <div className="p-land">
      <section className="p-land__hero" aria-labelledby="land-hero-title">
        <div className="p-land__hero-bg" aria-hidden />
        <div className="p-land__hero-shell">
          <div className="p-land__hero-copy">
            <h1 id="land-hero-title" className="p-land__hero-title">
              Build your next UI faster
            </h1>
            <p className="p-land__hero-lead">
              A React + MUI operations console with reusable components, theme control, and live dashboards.
            </p>
            <div className="p-land__hero-actions">
              <button type="button" className="p-land__btn p-land__btn--light" onClick={() => navigate('/register')}>
                Get Started
                <ArrowForwardRoundedIcon fontSize="small" />
              </button>
              <button
                type="button"
                className="p-land__btn p-land__btn--ghost"
                onClick={() => navigate('/login', { state: { from: '/pages/components/buttons' } })}
              >
                Explore Components
              </button>
            </div>
          </div>

          <button
            type="button"
            id="preview"
            className="p-land__screen"
            aria-label="Overview dashboard preview — open demo"
            onClick={() => openApp('/dashboard')}
          >
            <div className="p-land__screen-chrome" aria-hidden>
              <span />
              <span />
              <span />
              <em>Overview · {BRAND_NAME}</em>
            </div>
            <div className="p-land__screen-body" aria-hidden>
              <aside className="p-land__screen-nav">
                <strong>T</strong>
                <i className="is-active" />
                <i />
                <i />
                <i />
                <i />
                <i />
              </aside>
              <div className="p-land__screen-app">
                <div className="p-land__screen-top">
                  <div>
                    <small>Dashboards</small>
                    <p>Overview</p>
                  </div>
                  <span className="p-land__screen-live">Live</span>
                </div>
                <div className="p-land__screen-kpis">
                  <article>
                    <small>Revenue</small>
                    <strong>₹4.2L</strong>
                    <em className="is-up">+12%</em>
                  </article>
                  <article>
                    <small>Orders</small>
                    <strong>1,284</strong>
                    <em className="is-up">+8%</em>
                  </article>
                  <article>
                    <small>Customers</small>
                    <strong>862</strong>
                    <em className="is-up">+5%</em>
                  </article>
                  <article>
                    <small>Refunds</small>
                    <strong>₹18k</strong>
                    <em className="is-down">−2%</em>
                  </article>
                </div>
                <div className="p-land__screen-grid">
                  <div className="p-land__screen-chart">
                    <header>
                      <span>Revenue trend</span>
                      <small>Last 6 months</small>
                    </header>
                    <div className="p-land__screen-bars">
                      <span style={{ '--h': '42%' }} />
                      <span style={{ '--h': '58%' }} />
                      <span style={{ '--h': '51%' }} />
                      <span style={{ '--h': '74%' }} />
                      <span style={{ '--h': '68%' }} />
                      <span style={{ '--h': '92%' }} />
                    </div>
                  </div>
                  <div className="p-land__screen-queue">
                    <header>
                      <span>Queue</span>
                      <small>Needs action</small>
                    </header>
                    <ul>
                      <li>
                        <i className="is-warn" />
                        <span>ORD-1052 pending</span>
                      </li>
                      <li>
                        <i className="is-stock" />
                        <span>Low stock · North Card</span>
                      </li>
                      <li>
                        <i className="is-warn" />
                        <span>Refund review</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </section>

      <Section id="about" tone="paper">
        <header className="p-land__head">
          <h2>Features that ship with the template</h2>
          <p>Everything you need to demo a modern MUI-based product UI.</p>
        </header>
        <ul className="p-land__features">
          {FEATURES.map(({ title, body, Icon }) => (
            <li key={title}>
              <span className="p-land__feature-icon" aria-hidden>
                <Icon fontSize="small" />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="tech">
        <header className="p-land__head">
          <h2>Tech stack in this project</h2>
          <p>Each tool has a clear job — kept lean so the demo stays fast and easy to extend.</p>
        </header>
        <ul className="p-land__tech">
          {TECH.map(({ name, tag, body, Icon }, index) => (
            <li key={name} className="p-land__tech-card" style={{ '--i': index }}>
              <span className="p-land__tech-icon" aria-hidden>
                <Icon />
              </span>
              <span className="p-land__tech-tag">{tag}</span>
              <h3>{name}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="components" tone="paper">
        <header className="p-land__head p-land__head--split">
          <div>
            <h2>MUI components showcase</h2>
            <p>Jump into live demos for the patterns teams reuse most.</p>
          </div>
          <button type="button" className="p-land__text-link" onClick={() => openApp('/pages/components/buttons')}>
            Open components
            <ArrowForwardRoundedIcon fontSize="small" />
          </button>
        </header>
        <div className="p-land__showcase">
          {SHOWCASE.map((item) => (
            <button
              key={item.title}
              type="button"
              className="p-land__show-card"
              onClick={() => openApp(`/pages/components/${item.title.toLowerCase()}`)}
            >
              <strong>{item.title}</strong>
              <span>{item.body}</span>
              <em>
                {user ? 'Open' : 'Login to open'}
                <ArrowForwardRoundedIcon fontSize="inherit" />
              </em>
            </button>
          ))}
        </div>
      </Section>

      <Section id="stats">
        <ul className="p-land__stats">
          {STATS.map((item) => (
            <li key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="services" tone="paper">
        <header className="p-land__head">
          <h2>Why choose {BRAND_NAME}</h2>
          <p>Built for demos, handoffs, and real product starting points.</p>
        </header>
        <div className="p-land__why">
          {WHY.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="templates" tone="paper">
        <header className="p-land__head">
          <h2>UI templates included</h2>
          <p>Open a ready workspace for common product surfaces.</p>
        </header>
        <div className="p-land__templates">
          {TEMPLATES.map((item) => (
            <button key={item.title} type="button" className="p-land__template" onClick={() => openApp(item.to)}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section id="pricing" tone="paper">
        <header className="p-land__head p-land__head--split">
          <div>
            <h2>Pricing</h2>
            <p>Free to explore the demo. Pro and Enterprise map to ₹ plans.</p>
          </div>
          <button type="button" className="p-land__text-link" onClick={() => navigate('/front/pricing')}>
            Full pricing page
            <ArrowForwardRoundedIcon fontSize="small" />
          </button>
        </header>
        <div className="p-land__plans">
          {FRONT_PLANS.map((plan) => (
            <article key={plan.id} className={plan.popular ? 'is-popular' : undefined}>
              <div className="p-land__plan-top">
                <h3>{plan.id === 'starter' ? 'Free' : plan.id === 'pro' ? 'Pro' : 'Enterprise'}</h3>
                {plan.popular && <span className="p-land__pill">Most used</span>}
              </div>
              <p className="p-land__amount">
                {plan.id === 'starter' ? '₹0 demo' : planPriceLabel(plan.monthly, false)}
              </p>
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
                onClick={() => navigate(plan.id === 'starter' ? '/register' : `/front/payment?plan=${plan.id}&cycle=monthly`)}
              >
                {plan.id === 'starter' ? 'Get Started' : `Choose ${plan.name}`}
              </button>
            </article>
          ))}
        </div>
      </Section>

      <Section id="faq">
        <div className="p-land__faq-layout">
          <header className="p-land__faq-intro">
            <h2>Questions, answered</h2>
            <p>
              Everything you need before opening the {BRAND_FULL} console. Still stuck? Reach the help center.
            </p>
            <button type="button" className="p-land__text-link" onClick={() => navigate('/front/help')}>
              Visit help center
              <ArrowForwardRoundedIcon fontSize="small" />
            </button>
          </header>

          <div className="p-land__faq" role="list">
            {FAQS.map((item, index) => {
              const open = openFaq === index;
              const panelId = `land-faq-panel-${index}`;
              const buttonId = `land-faq-btn-${index}`;
              return (
                <article key={item.q} className={`p-land__faq-item${open ? ' is-open' : ''}`} role="listitem">
                  <button
                    id={buttonId}
                    type="button"
                    className="p-land__faq-trigger"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(open ? -1 : index)}
                  >
                    <span className="p-land__faq-q">{item.q}</span>
                    <span className="p-land__faq-chevron" aria-hidden>
                      <ExpandMoreIcon fontSize="small" />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="p-land__faq-panel"
                    hidden={!open}
                  >
                    <p>{item.a}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
