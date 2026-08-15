import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useAppData } from '../../contexts/AppDataContext';
import { formatNotificationAgo } from '../../utils/format';
import { NotificationAvatar } from './NotificationAvatar';

export function NotificationDropdown() {
  const { notifications, setNotifications } = useAppData();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const navigate = useNavigate();
  const unread = notifications.filter((item) => !item.read).length;
  const preview = notifications.slice(0, 6);

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const markAllRead = () => {
    setNotifications(notifications.map((item) => ({ ...item, read: true })));
  };

  const dismiss = (id) => {
    setNotifications(notifications.filter((item) => item.id !== id));
  };

  return (
    <div className="c-notify" ref={rootRef}>
      <button
        type="button"
        className="c-notify__bell"
        onClick={() => setOpen((value) => !value)}
        aria-label={unread ? `${unread} unread notifications` : 'Notifications'}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <NotificationsNoneOutlinedIcon />
        {unread > 0 && <span className="c-notify__badge">{unread > 9 ? '9+' : unread}</span>}
      </button>

      {open && (
        <div className="c-notify__panel" role="dialog" aria-label="Notifications">
          <div className="c-notify__head">
            <div>
              <h2>Notifications</h2>
              {unread > 0 && <span className="c-badge c-badge--info">{unread} new</span>}
            </div>
            <button type="button" className="c-notify__action" onClick={markAllRead} disabled={unread === 0} aria-label="Mark all as read">
              <DoneAllIcon fontSize="small" />
            </button>
          </div>

          <ul className="c-notify__list">
            {preview.length === 0 && <li className="c-notify__empty">You are all caught up.</li>}
            {preview.map((item) => (
              <li key={item.id} className={`c-notify__item ${item.read ? '' : 'is-unread'}`}>
                <button
                  type="button"
                  className="c-notify__hit"
                  onClick={() => {
                    setNotifications(notifications.map((n) => (n.id === item.id ? { ...n, read: true } : n)));
                    setOpen(false);
                    navigate('/notifications');
                  }}
                >
                  <NotificationAvatar item={item} size="sm" />
                  <span className="c-notify__copy">
                    <strong>{item.title}</strong>
                    <span>{item.message}</span>
                    <time>{formatNotificationAgo(item.createdAt)}</time>
                  </span>
                </button>
                <div className="c-notify__meta">
                  {!item.read && <span className="c-notify__dot" aria-hidden />}
                  <button
                    type="button"
                    className="c-notify__dismiss"
                    aria-label="Dismiss notification"
                    onClick={() => dismiss(item.id)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="c-notify__foot">
            <button
              type="button"
              className="c-notify__view-all"
              onClick={() => {
                setOpen(false);
                navigate('/notifications');
              }}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
