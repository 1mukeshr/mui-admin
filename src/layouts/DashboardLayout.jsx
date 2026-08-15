import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { BrandLogo } from '../components/common/BrandLogo';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { PageOutlet } from '../components/layout/PageOutlet';
import { HeaderSearch } from '../components/layout/HeaderSearch';
import { CommandPalette } from '../components/layout/CommandPalette';
import { ProfileMenu } from '../components/layout/ProfileMenu';
import { NotificationDropdown } from '../components/notifications/NotificationDropdown';
import { useAuth } from '../contexts/AuthContext';
import { useThemeMode } from '../contexts/ThemeModeContext';
import { HorizontalNav } from './HorizontalNav';
import { SidebarNav } from './SidebarNav';

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const { mode, semiDark, menu, navbar, setMenu } = useThemeMode();
  const sidebarDark = mode === 'dark' || semiDark;
  const horizontal = menu === 'horizontal';
  const collapsed = menu === 'collapsed';
  const navbarHidden = navbar === 'hidden';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name?.split(' ')[0] || 'there';

  const drawer = (
    <aside className="l-sidebar">
      <div className="l-sidebar__brand">
        <BrandLogo inverted={sidebarDark} compact={collapsed} />
      </div>
      <div className="l-sidebar__scroll">
        <SidebarNav collapsed={collapsed} onNavigate={() => setMobileOpen(false)} />
      </div>
    </aside>
  );

  return (
    <div className="l-app">
      <a className="l-skip" href="#main-content">
        Skip to content
      </a>

      {!horizontal && (
        <div className={`l-sidebar-slot ${collapsed ? 'is-collapsed' : ''}`}>
          <div className="l-drawer-desktop">{drawer}</div>
          <button
            type="button"
            className="l-sidebar-toggle"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setMenu(collapsed ? 'vertical' : 'collapsed')}
          >
            <span className="l-sidebar-toggle__icon" aria-hidden>
              {collapsed ? <ChevronRightIcon fontSize="inherit" /> : <ChevronLeftIcon fontSize="inherit" />}
            </span>
          </button>
        </div>
      )}

      {mobileOpen && (
        <div className="l-drawer-mobile" role="dialog" aria-modal="true" aria-label="Workspace">
          <button type="button" className="l-drawer-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />
          {drawer}
        </div>
      )}

      <div className="l-shell">
        <header className={`l-header ${navbarHidden ? 'is-slim' : ''}`}>
          <div className="l-header__bar">
            <button
              type="button"
              className="l-header__menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <MenuIcon />
            </button>

            {horizontal && (
              <div className="l-header__brand">
                <BrandLogo />
              </div>
            )}

            {!navbarHidden && (
              <div className="l-header__hello">
                <p>
                  {greeting}, {firstName}
                </p>
                {!horizontal && user?.department && <small>{user.department} workspace</small>}
              </div>
            )}

            <HeaderSearch />

            <div className="l-header__actions">
              <ThemeToggle />
              <NotificationDropdown />
              <ProfileMenu />
            </div>
          </div>

          {horizontal && !navbarHidden && (
            <div className="l-header__h-nav">
              <HorizontalNav />
            </div>
          )}
        </header>

        <main className="l-main" id="main-content">
          <div className="l-main__inner">
            <PageOutlet />
          </div>
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
