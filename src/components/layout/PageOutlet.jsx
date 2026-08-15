import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

function pageClass(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'dashboard' && parts[1]) return `p-${parts[1]}`;
  if (parts[0] === 'front' && parts[1]) return `p-front-${parts[1]}`;
  if (parts[0] === 'pages' && parts[1]) return `p-${parts[1]}`;
  if (parts[0] === 'apps' && parts[1]) return `p-${parts[1]}`;
  if (parts[0] === 'forms') return 'p-forms';
  if (parts[0] === 'tables') return 'p-tables';
  if (parts[0] === 'access') return 'p-access';
  if (parts[0] === 'system') return 'p-system';
  return parts[0] ? `p-${parts[0]}` : 'p-home';
}

export function PageOutlet() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`l-page-outlet c-page ${pageClass(location.pathname)}`}>
      <Outlet />
    </div>
  );
}
