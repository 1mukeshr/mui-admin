import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { EmptyState } from '../../components/common/EmptyState';
import { PageHeader } from '../../components/common/PageHeader';
import { NotificationAvatar } from '../../components/notifications/NotificationAvatar';
import { useAppData } from '../../contexts/AppDataContext';
import { formatNotificationAgo } from '../../utils/format';

export function NotificationsPage() {
  const { notifications, setNotifications } = useAppData();
  const unread = notifications.filter((item) => !item.read).length;

  return (
    <div className="c-page p-notifications">
      <PageHeader
        title="Notifications"
        actions={
          <div className="c-row c-row--wrap">
            <button
              type="button"
              className="c-notify-page__btn"
              disabled={unread === 0}
              onClick={() => setNotifications(notifications.map((item) => ({ ...item, read: true })))}
            >
              <DoneAllIcon fontSize="small" />
              Mark all read
            </button>
            <button
              type="button"
              className="c-notify-page__btn is-danger"
              disabled={notifications.length === 0}
              onClick={() => setNotifications([])}
            >
              <DeleteOutlineIcon fontSize="small" />
              Clear all
            </button>
          </div>
        }
      />

      <section className="c-notify-page__card">
        {notifications.length === 0 ? (
          <EmptyState title="No notifications" description="You are all caught up." />
        ) : (
          <ul className="c-notify-page__list" aria-label="Notifications">
            {notifications.map((item) => (
              <li key={item.id} className={`c-notify-page__row ${item.read ? '' : 'is-unread'}`}>
                <NotificationAvatar item={item} size="lg" />
                <div className="c-notify-page__copy">
                  <div className="c-notify-page__title">
                    <strong>{item.title}</strong>
                    <span className="c-badge c-badge--neutral">{item.type}</span>
                  </div>
                  <p>{item.message}</p>
                  <time>{formatNotificationAgo(item.createdAt)}</time>
                </div>
                <div className="c-notify-page__actions">
                  {!item.read && (
                    <button
                      type="button"
                      className="c-notify-page__btn is-ghost"
                      onClick={() => setNotifications(notifications.map((n) => (n.id === item.id ? { ...n, read: true } : n)))}
                    >
                      <DoneAllIcon fontSize="small" />
                      Mark read
                    </button>
                  )}
                  <button
                    type="button"
                    className="c-notify__action"
                    aria-label={`Delete ${item.title}`}
                    onClick={() => setNotifications(notifications.filter((n) => n.id !== item.id))}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
