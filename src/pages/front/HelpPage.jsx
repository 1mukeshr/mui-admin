import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchField } from '../../components/common/SearchField';
import { BRAND_FULL } from '../../data/brand';
import { CONTACT_PHONE, OWNER_EMAIL, OWNER_NAME } from '../../data/seed';

const TOPICS = [
  { title: 'Getting started', body: 'Sign in with a demo account and open the overview dashboard.', Icon: QuizOutlinedIcon, to: '/' },
  { title: 'Billing in ₹', body: 'Plans, invoices, and checkout totals use Indian Rupees only.', Icon: ReceiptLongOutlinedIcon, to: '/front/pricing' },
  { title: 'Chat and alerts', body: 'Use Apps → Chat and the header bell for workspace messages.', Icon: ChatBubbleOutlineIcon, to: '/apps/chat' },
  { title: 'Theme and layout', body: 'Open Template Customizer to change color, skin, and menu.', Icon: SettingsOutlinedIcon, to: '/login' },
];

const FAQS = [
  { q: 'Where does demo data live?', a: 'Everything stays in this browser. Clearing site data resets the workspace.' },
  { q: 'How do I change roles?', a: 'Sign in as Super Admin, then open Access → Roles to edit permissions.' },
  { q: 'Can I export reports?', a: 'Yes. Open Reports and use the CSV or PDF actions on each view.' },
  { q: 'Who do I call for help?', a: `Reach ${OWNER_NAME} on ${CONTACT_PHONE} or email ${OWNER_EMAIL}.` },
];

export function HelpPage() {
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOPICS.filter((item) => !q || item.title.toLowerCase().includes(q) || item.body.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="p-site">
      <header className="p-site__hero">
        <div className="p-site__hero-inner">
          <p className="p-site__kicker">Help</p>
          <h1>Help Center</h1>
          <p className="p-site__lead">
            Guides for the {BRAND_FULL} workspace. For a live question, call {OWNER_NAME} on {CONTACT_PHONE}.
          </p>
          <div className="p-site__search">
            <SearchField
              variant="pill"
              label="Search help"
              placeholder="Search help topics"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <section className="p-site__section">
        <div className="p-site__inner">
          <div className="p-site__topics">
            {filtered.map((item) => (
              <article key={item.title}>
                <span className="p-site__icon">
                  <item.Icon fontSize="small" aria-hidden />
                </span>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <button type="button" className="p-site__text-link" onClick={() => navigate(item.to)}>
                  Open guide
                </button>
              </article>
            ))}
          </div>

          {filtered.length === 0 && <p className="p-site__note">No matching topics.</p>}
        </div>
      </section>

      <section className="p-site__section p-site__section--paper">
        <div className="p-site__inner p-site__help-grid">
          <div>
            <p className="p-site__kicker">FAQ</p>
            <h2 className="p-site__subhead">Common questions</h2>
            <p className="p-site__muted">Still stuck? Use the contact options on the right.</p>
            <div className="p-site__faq">
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

          <aside className="p-site__contact">
            <h2>Talk to us</h2>
            <p>Demo support for onboarding, roles, and billing questions.</p>
            <a className="p-site__contact-row" href={`tel:${CONTACT_PHONE}`}>
              <CallOutlinedIcon fontSize="small" />
              {CONTACT_PHONE}
            </a>
            <a className="p-site__contact-row" href={`mailto:${OWNER_EMAIL}`}>
              <MailOutlineIcon fontSize="small" />
              {OWNER_EMAIL}
            </a>
            <button type="button" className="p-site__btn p-site__btn--solid" onClick={() => navigate('/pages/faq/basic')}>
              Browse in-app FAQ
            </button>
          </aside>
        </div>
      </section>
    </div>
  );
}
