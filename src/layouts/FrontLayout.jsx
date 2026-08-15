import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { CONTACT_PHONE, OWNER_NAME } from '../data/seed';

const LINKS = [
  { label: 'Product', to: '/#product' },
  { label: 'Pricing', to: '/front/pricing' },
  { label: 'Payment', to: '/front/payment' },
  { label: 'Help', to: '/front/help' },
];

const FOOTER_GROUPS = [
  {
    title: 'Product',
    items: [
      { label: 'Home', to: '/' },
      { label: 'Pricing', to: '/front/pricing' },
      { label: 'Payment', to: '/front/payment' },
      { label: 'Checkout', to: '/front/checkout' },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { label: 'Sign in', to: '/login' },
      { label: 'Create account', to: '/register' },
      { label: 'Overview', to: '/dashboard' },
      { label: 'CRM', to: '/dashboard/crm' },
      { label: 'Ecommerce', to: '/dashboard/ecommerce' },
      { label: 'Analytics', to: '/dashboard/analytics' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Help center', to: '/front/help' },
      { label: 'Forgot password', to: '/forgot-password' },
      { label: 'Orders', to: '/orders' },
      { label: 'Reports', to: '/reports/sales' },
      { label: 'Settings', to: '/settings' },
      { label: 'Chat', to: '/apps/chat' },
    ],
  },
];

export function FrontLayout() {
  const { user } = useAuth();
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
    if (to.startsWith('/#')) {
      navigate('/');
      const id = to.slice(2);
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }
    navigate(to);
  };

  const isActive = (to) => {
    if (to === '/' || to.startsWith('/#')) return location.pathname === '/';
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  const goLogin = () => {
    setOpen(false);
    navigate('/login', { state: { from: location.state?.from || '/dashboard' } });
  };

  return (
    <div className="l-front">
      <header className={`l-front__header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="l-front__bar">
          <RouterLink className="l-front__brand" to="/" aria-label="MUI Admin home">
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
              {!user && (
                <button type="button" className="l-front__ghost" onClick={goLogin}>
                  Log in
                </button>
              )}
              {!user ? (
                <button type="button" className="l-front__cta" onClick={() => go('/register')}>
                  Start free
                </button>
              ) : (
                <button type="button" className="l-front__cta" onClick={() => go('/dashboard')}>
                  Open dashboard
                </button>
              )}
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
            {!user && (
              <button type="button" className="l-front__mobile-link" onClick={goLogin}>
                Log in
              </button>
            )}
            {!user ? (
              <button type="button" className="l-front__cta is-block" onClick={() => go('/register')}>
                Start free
              </button>
            ) : (
              <button type="button" className="l-front__cta is-block" onClick={() => go('/dashboard')}>
                Open dashboard
              </button>
            )}
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
              <p className="l-front__footer-copy">Operations console for users, catalog, and orders in ₹. Built for {OWNER_NAME}.</p>
              <ul className="l-front__contacts">
                <li>
                  <a href={`tel:${CONTACT_PHONE}`}>
                    <CallOutlinedIcon fontSize="small" />
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li>
                  <a href="mailto:admin@demo.com">
                    <MailOutlineIcon fontSize="small" />
                    admin@demo.com
                  </a>
                </li>
              </ul>
              <button type="button" className="l-front__cta" onClick={() => go(user ? '/dashboard' : '/login')}>
                {user ? 'Open console' : 'Launch demo'}
              </button>
            </div>

            {FOOTER_GROUPS.map((group) => (
              <nav aria-label={group.title} key={group.title}>
                <h2 className="l-front__group-title">{group.title}</h2>
                <ul className="l-front__links">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <RouterLink to={item.to}>{item.label}</RouterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <hr className="l-front__rule" />

          <div className="l-front__bottom">
            <p className="l-front__note">© {new Date().getFullYear()} MUI Admin · Prices in Indian Rupees · Demo data stays in this browser</p>
            <nav className="l-front__legal" aria-label="Legal">
              <RouterLink to="/front/help">Help</RouterLink>
              <RouterLink to="/front/pricing">Pricing</RouterLink>
              <RouterLink to="/login">Privacy</RouterLink>
              <RouterLink to="/front/help">Terms</RouterLink>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
