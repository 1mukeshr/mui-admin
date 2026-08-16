import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { BRAND_FULL } from '../data/brand';
import { CONTACT_PHONE, OWNER_EMAIL } from '../data/seed';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Tech', to: '/#tech' },
  { label: 'Services', to: '/#services' },
  { label: 'Components', to: '/#components' },
  { label: 'Pricing', to: '/#pricing' },
];

const FOOTER_GROUPS = [
  {
    title: 'Product',
    items: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/#about' },
      { label: 'Tech stack', to: '/#tech' },
      { label: 'Services', to: '/#services' },
      { label: 'Components', to: '/#components' },
      { label: 'Pricing', to: '/#pricing' },
      { label: 'FAQ', to: '/#faq' },
    ],
  },
  {
    title: 'Console',
    items: [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Users', to: '/users' },
      { label: 'Catalog', to: '/products' },
      { label: 'Orders', to: '/orders' },
      { label: 'Customers', to: '/customers' },
      { label: 'Reports', to: '/reports/revenue' },
      { label: 'Roles & access', to: '/access/roles' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Help center', to: '/front/help' },
      { label: 'Checkout demo', to: '/front/checkout' },
      { label: 'Payment demo', to: '/front/payment' },
      { label: 'Sign in', to: '/login' },
      { label: 'Create account', to: '/register' },
      { label: 'GitHub', to: 'https://github.com/1mukeshr/mui-admin' },
      { label: 'Live demo', to: 'https://mui-admin-mukesh.vercel.app' },
    ],
  },
];

export function FrontLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const go = (to) => {
    setOpen(false);
    if (to.startsWith('http')) {
      window.open(to, '_blank', 'noopener,noreferrer');
      return;
    }
    if (to.startsWith('mailto:') || to.startsWith('tel:')) {
      window.location.href = to;
      return;
    }
    if (to === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (to.startsWith('/#')) {
      const id = to.slice(2);
      navigate({ pathname: '/', hash: id });
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }
    navigate(to);
  };

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/' && !location.hash;
    if (to.startsWith('/#')) return location.pathname === '/' && location.hash === to.slice(1);
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  const goLogin = () => {
    setOpen(false);
    navigate('/login', { state: { from: '/dashboard' } });
  };

  const goLivePreview = () => {
    setOpen(false);
    navigate({ pathname: '/', hash: 'preview' });
    window.setTimeout(() => {
      document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  return (
    <div className="l-front">
      <header className={`l-front__header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="l-front__bar">
          <RouterLink className="l-front__brand" to="/" aria-label={`${BRAND_FULL} home`}>
            <BrandLogo />
          </RouterLink>

          <nav className="l-front__nav" aria-label="Site">
            {LINKS.map((item) => (
              <button
                key={item.to}
                type="button"
                className={`l-front__link ${isActive(item.to) ? 'is-active' : ''}`}
                onClick={() => go(item.to)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="l-front__grow" />

          <div className="l-front__actions">
            <ThemeToggle />

            <div className="l-front__auth">
              <button type="button" className="l-front__ghost" onClick={goLogin}>
                Login
              </button>
              <button type="button" className="l-front__cta" onClick={goLivePreview}>
                Live Preview
              </button>
            </div>
          </div>

          <button
            type="button"
            className="l-front__menu-btn"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {open && (
          <nav className="l-front__mobile" aria-label="Mobile">
            {LINKS.map((item) => (
              <button key={item.to} type="button" className={`l-front__mobile-link ${isActive(item.to) ? 'is-active' : ''}`} onClick={() => go(item.to)}>
                {item.label}
              </button>
            ))}
            <button type="button" className="l-front__mobile-link" onClick={goLogin}>
              Login
            </button>
            <button type="button" className="l-front__cta is-block" onClick={goLivePreview}>
              Live Preview
            </button>
          </nav>
        )}
      </header>

      <main className="l-front__main">
        <Outlet />
      </main>

      <footer className="l-front__footer">
        <div className="l-front__footer-inner">
          <div className="l-front__footer-grid">
            <div className="l-front__footer-brand">
              <BrandLogo inverted />
              <p className="l-front__footer-copy">
                {BRAND_FULL} is a React + Material UI admin kit for teams that run users, catalog, and orders with Indian Rupee (₹) totals.
              </p>
              <p className="l-front__footer-meta">
                Dashboards, roles, reports, and theme controls — demo data stays in your browser.
              </p>
              <ul className="l-front__contacts">
                <li>
                  <a href={`tel:${CONTACT_PHONE}`}>
                    <CallOutlinedIcon fontSize="inherit" />
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${OWNER_EMAIL}`}>
                    <MailOutlineIcon fontSize="inherit" />
                    {OWNER_EMAIL}
                  </a>
                </li>
              </ul>
            </div>

            {FOOTER_GROUPS.map((group) => (
              <nav className="l-front__footer-col" aria-label={group.title} key={group.title}>
                <h2 className="l-front__group-title">{group.title}</h2>
                <ul className="l-front__links">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      {item.to.startsWith('http') || item.to.startsWith('mailto:') || item.to.startsWith('tel:') || item.to.startsWith('/#') ? (
                        <button type="button" className="l-front__link-btn" onClick={() => go(item.to)}>
                          {item.label}
                        </button>
                      ) : (
                        <RouterLink to={item.to}>{item.label}</RouterLink>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="l-front__bottom">
            <p className="l-front__note">© {new Date().getFullYear()} {BRAND_FULL}. All rights reserved.</p>
            <nav className="l-front__legal" aria-label="Legal">
              <RouterLink to="/front/help">Help</RouterLink>
              <RouterLink to="/front/help">Privacy</RouterLink>
              <RouterLink to="/front/help">Terms</RouterLink>
              <button type="button" className="l-front__link-btn" onClick={goLivePreview}>
                Live preview
              </button>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
