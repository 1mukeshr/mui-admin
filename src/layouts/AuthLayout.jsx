import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { BRAND_FULL } from '../data/brand';

export function AuthLayout() {
  return (
    <div className="l-auth">
      <header className="l-auth__header">
        <div className="l-auth__bar">
          <RouterLink className="l-auth__home" to="/" aria-label={`Back to ${BRAND_FULL} home`}>
            <ArrowBackRoundedIcon fontSize="inherit" />
            <span>Back to home</span>
          </RouterLink>

          <RouterLink className="l-auth__brand-link" to="/" aria-label={`${BRAND_FULL} home`}>
            <BrandLogo />
          </RouterLink>

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
