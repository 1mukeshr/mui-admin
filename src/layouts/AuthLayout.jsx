import { Link as RouterLink, Outlet } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { ThemeToggle } from '../components/common/ThemeToggle';

export function AuthLayout() {
  return (
    <div className="l-auth">
      <header className="l-auth__header">
        <div className="l-auth__bar">
          <RouterLink className="l-auth__brand-link" to="/" aria-label="MUI Admin home">
            <BrandLogo />
          </RouterLink>
          <div className="l-auth__grow" />
          <div className="l-auth__tools">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="l-auth__main">
        <div className="l-auth__card">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
