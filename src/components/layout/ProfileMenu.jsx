import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useThemeMode } from '../../contexts/ThemeModeContext';
import { roleLabel } from '../../utils/format';

export function ProfileMenu() {
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  const initial = user?.name?.charAt(0) ?? '?';

  return (
    <div className="c-profile" ref={rootRef}>
      <button
        type="button"
        className="l-icon-btn l-icon-btn--avatar"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open profile menu"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {user?.avatar ? (
          <img className="c-profile__trigger-avatar" src={user.avatar} alt="" />
        ) : (
          <span className="c-profile__trigger-avatar is-fallback">{initial}</span>
        )}
      </button>

      {open && (
        <div className="c-profile__panel" role="menu" aria-label="Account menu">
          <div className="c-profile__head">
            <span className="c-profile__avatar-wrap">
              {user?.avatar ? (
                <img className="c-profile__avatar" src={user.avatar} alt="" />
              ) : (
                <span className="c-profile__avatar is-fallback">{initial}</span>
              )}
              <span className="c-profile__online" aria-hidden />
            </span>
            <div className="c-profile__meta">
              <strong>{user?.name}</strong>
              <span>{user?.email}</span>
              <span className="c-profile__role">{roleLabel(user?.role ?? '')}</span>
            </div>
          </div>

          <div className="c-profile__section">
            <button type="button" className="c-profile__item" role="menuitem" onClick={() => go('/settings/profile')}>
              <PersonOutlineIcon fontSize="small" />
              <span>Profile</span>
            </button>
            <button type="button" className="c-profile__item" role="menuitem" onClick={() => go('/settings/security')}>
              <LockOutlinedIcon fontSize="small" />
              <span>Security</span>
            </button>
            <button type="button" className="c-profile__item" role="menuitem" onClick={() => go('/notifications')}>
              <NotificationsNoneOutlinedIcon fontSize="small" />
              <span>Notifications</span>
            </button>
            <button type="button" className="c-profile__item" role="menuitem" onClick={() => go('/settings/appearance')}>
              <SettingsOutlinedIcon fontSize="small" />
              <span>Settings</span>
            </button>
          </div>

          <div className="c-profile__section">
            <button type="button" className="c-profile__item" role="menuitem" onClick={toggleMode}>
              <DarkModeOutlinedIcon fontSize="small" />
              <span>Dark mode</span>
              <span className={`c-profile__switch ${mode === 'dark' ? 'is-on' : ''}`} aria-hidden />
            </button>
          </div>

          <div className="c-profile__section">
            <button
              type="button"
              className="c-profile__item is-danger"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                logout();
                navigate('/');
              }}
            >
              <LogoutOutlinedIcon fontSize="small" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
