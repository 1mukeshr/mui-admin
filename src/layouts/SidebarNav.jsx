import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isNavSelected, NAV_GROUPS, visibleNavGroups } from './nav';

export function SidebarNav({ onNavigate, collapsed = false }) {
  const { hasPermission } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const groups = useMemo(() => visibleNavGroups(hasPermission), [hasPermission]);
  const [flyout, setFlyout] = useState(null);
  const [open, setOpen] = useState({});

  useEffect(() => {
    setOpen((current) => {
      const next = { ...current };
      NAV_GROUPS.forEach((group) => {
        const childActive = group.children?.some((child) =>
          isNavSelected(location.pathname, child.to, group.children?.map((item) => item.to) ?? []),
        );
        if (childActive) next[group.id] = true;
      });
      return next;
    });
    setFlyout(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!flyout) return undefined;
    const close = () => setFlyout(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [flyout]);

  const go = (to) => {
    navigate(to);
    onNavigate?.();
    setFlyout(null);
  };

  return (
    <nav className={`l-nav ${collapsed ? 'is-collapsed' : ''}`} aria-label="Workspace">
      {groups.map((group) => {
        const children = group.children ?? [];
        const siblingTos = children.map((child) => child.to);
        const childActive = children.some((child) => isNavSelected(location.pathname, child.to, siblingTos));
        const selfActive = group.to ? isNavSelected(location.pathname, group.to, []) : childActive;
        const expanded = Boolean(open[group.id]);
        const selected = children.length === 0 ? selfActive : childActive && (collapsed || !expanded);
        const Icon = group.icon;

        return (
          <div className="l-nav__group" key={group.id}>
            <button
              type="button"
              className={`l-nav__item ${selected ? 'is-active' : ''}`}
              title={collapsed ? group.label : undefined}
              aria-expanded={children.length > 0 ? (collapsed ? flyout === group.id : expanded) : undefined}
              onClick={(event) => {
                event.stopPropagation();
                if (collapsed) {
                  if (children.length === 0 && group.to) go(group.to);
                  else setFlyout((current) => (current === group.id ? null : group.id));
                  return;
                }
                if (children.length === 0 && group.to) go(group.to);
                else setOpen((current) => ({ ...current, [group.id]: !expanded }));
              }}
            >
              <span className="l-nav__icon">
                <Icon fontSize="small" />
              </span>
              {!collapsed && <span className="l-nav__label">{group.label}</span>}
              {!collapsed && children.length > 0 && (
                <span className="l-nav__caret">{expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}</span>
              )}
            </button>

            {!collapsed && expanded && children.length > 0 && (
              <ul className="l-nav__sub">
                {children.map((child) => (
                  <li key={child.to}>
                    <button
                      type="button"
                      className={`l-nav__item l-nav__item--child ${isNavSelected(location.pathname, child.to, siblingTos) ? 'is-active' : ''}`}
                      onClick={() => go(child.to)}
                    >
                      <span className="l-nav__label">{child.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {collapsed && flyout === group.id && children.length > 0 && (
              <ul className="l-nav__flyout" role="menu">
                {children.map((child) => (
                  <li key={child.to}>
                    <button
                      type="button"
                      className={`l-nav__flyout-item ${isNavSelected(location.pathname, child.to, siblingTos) ? 'is-active' : ''}`}
                      onClick={() => go(child.to)}
                    >
                      {child.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
