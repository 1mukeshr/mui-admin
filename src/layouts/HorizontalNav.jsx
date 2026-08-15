import { Button, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isNavSelected, visibleNavGroups } from './nav';

export function HorizontalNav() {
  const { hasPermission } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const groups = useMemo(() => visibleNavGroups(hasPermission), [hasPermission]);
  const [anchor, setAnchor] = useState(null);

  return (
    <nav className="l-h-nav" aria-label="Workspace menu">
      {groups.map((group) => {
        const children = group.children ?? [];
        const siblingTos = children.map((child) => child.to);
        const active = group.to
          ? isNavSelected(location.pathname, group.to, [])
          : children.some((child) => isNavSelected(location.pathname, child.to, siblingTos));

        return (
          <div key={group.id}>
            <Button
              className="l-h-nav__btn"
              color={active ? 'primary' : 'inherit'}
              startIcon={<group.icon />}
              endIcon={children.length > 0 ? <ExpandMoreIcon fontSize="small" /> : undefined}
              onClick={(event) => {
                if (children.length === 0 && group.to) navigate(group.to);
                else setAnchor({ id: group.id, el: event.currentTarget });
              }}
            >
              {group.label}
            </Button>
            <Menu
              open={anchor?.id === group.id}
              anchorEl={anchor?.el}
              onClose={() => setAnchor(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              {children.map((child) => (
                <MenuItem
                  key={child.to}
                  selected={isNavSelected(location.pathname, child.to, siblingTos)}
                  onClick={() => {
                    navigate(child.to);
                    setAnchor(null);
                  }}
                >
                  {child.label}
                </MenuItem>
              ))}
            </Menu>
          </div>
        );
      })}
    </nav>
  );
}
