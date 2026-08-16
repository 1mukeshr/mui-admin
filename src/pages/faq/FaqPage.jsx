import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { CONTACT_PHONE, OWNER_EMAIL, OWNER_NAME } from '../../data/seed';

const TYPES = [
  { id: 'basic', label: 'Basic' },
  { id: 'separated', label: 'Separated' },
  { id: 'filled', label: 'Filled' },
  { id: 'accent', label: 'Accent' },
];

const FAQS = [
  {
    category: 'Account',
    q: 'How do I sign in to the console?',
    a: `Use the owner account ${OWNER_EMAIL} with password Admin@123, or create a viewer account from Register.`,
  },
  {
    category: 'Account',
    q: 'Can I reset my password?',
    a: 'Yes. Open Forgot password, enter the account email, then follow the demo reset link generated in this browser.',
  },
  {
    category: 'Billing',
    q: 'What currency does the workspace use?',
    a: 'All amounts are shown in Indian Rupees (₹). Plans, invoices, and dashboard totals stay in ₹.',
  },
  {
    category: 'Billing',
    q: 'Where do I see order totals?',
    a: 'Open Orders or the Ecommerce dashboard. Paid totals and average order value use ₹ formatting.',
  },
  {
    category: 'Support',
    q: 'How can I contact the workspace owner?',
    a: `Contact ${OWNER_NAME} on ${CONTACT_PHONE} or ${OWNER_EMAIL}.`,
  },
  {
    category: 'Support',
    q: 'How do I change theme colors?',
    a: 'Open Template Customizer from the floating palette control. You can change primary color, light/dark theme, skin, and layout.',
  },
  {
    category: 'Catalog',
    q: 'How do I add a product?',
    a: 'Go to Products → Add product. You can set price in ₹, stock, category, and an image.',
  },
  {
    category: 'Catalog',
    q: 'Can I hide table columns?',
    a: 'Yes. On list pages and Datatables, use the Columns button to show or hide fields. Preferences are saved in this browser.',
  },
];

function FaqList({ variant, items, openId, onToggle, IconOpen, IconClosed }) {
  return (
    <div className={`p-faq__list p-faq__list--${variant}`}>
      {items.map((item, index) => {
        const id = `${variant}-${index}`;
        const open = openId === id;
        return (
          <article key={item.q} className={`p-faq__item ${open ? 'is-open' : ''}`}>
            <button
              type="button"
              className="p-faq__trigger"
              aria-expanded={open}
              onClick={() => onToggle(id)}
            >
              <span className="p-faq__copy">
                <span className="p-faq__category">{item.category}</span>
                <span className="p-faq__question">{item.q}</span>
              </span>
              <span className="p-faq__icon" aria-hidden>
                {open ? <IconOpen fontSize="small" /> : <IconClosed fontSize="small" />}
              </span>
            </button>
            {open && <p className="p-faq__answer">{item.a}</p>}
          </article>
        );
      })}
    </div>
  );
}

export function FaqPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const active = TYPES.some((item) => item.id === type) ? type : 'basic';
  const [openId, setOpenId] = useState('basic-0');

  const meta = useMemo(() => {
    switch (active) {
      case 'separated':
        return {
          title: 'Separated accordion',
          blurb: 'Each question sits in its own card with clear spacing.',
          IconOpen: ExpandMoreRoundedIcon,
          IconClosed: ExpandMoreRoundedIcon,
        };
      case 'filled':
        return {
          title: 'Filled accordion',
          blurb: 'Soft surface fill keeps the list calm and readable.',
          IconOpen: KeyboardArrowDownRoundedIcon,
          IconClosed: KeyboardArrowDownRoundedIcon,
        };
      case 'accent':
        return {
          title: 'Accent accordion',
          blurb: 'Left rail + plus/minus for a sharper ops-console feel.',
          IconOpen: RemoveRoundedIcon,
          IconClosed: AddRoundedIcon,
        };
      default:
        return {
          title: 'Basic accordion',
          blurb: 'Simple stacked rows with a light divider between items.',
          IconOpen: ExpandMoreRoundedIcon,
          IconClosed: ExpandMoreRoundedIcon,
        };
    }
  }, [active]);

  const onToggle = (id) => {
    setOpenId((current) => (current === id ? '' : id));
  };

  return (
    <section className="c-page p-faq">
      <PageHeader
        title="FAQ"
        crumbs={[{ label: 'Pages' }, { label: 'FAQ' }, { label: TYPES.find((item) => item.id === active)?.label }]}
      />

      <div className="p-faq__tabs" role="tablist" aria-label="FAQ accordion styles">
        {TYPES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active === item.id}
            className={`p-faq__tab ${active === item.id ? 'is-active' : ''}`}
            onClick={() => {
              navigate(`/pages/faq/${item.id}`);
              setOpenId(`${item.id}-0`);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <article className="p-faq__panel">
        <header className="p-faq__intro">
          <h2>{meta.title}</h2>
          <p>{meta.blurb}</p>
        </header>

        <FaqList
          variant={active}
          items={FAQS}
          openId={openId}
          onToggle={onToggle}
          IconOpen={meta.IconOpen}
          IconClosed={meta.IconClosed}
        />
      </article>
    </section>
  );
}
