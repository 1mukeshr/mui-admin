import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useCallback, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Popup, ToastStack } from '../../components/common/Popup';
import { CONTACT_PHONE, OWNER_NAME } from '../../data/seed';

const DIALOGS = [
  {
    id: 'alert',
    title: 'Alert',
    body: 'One-action notice for tips and non-blocking messages.',
    tone: 'info',
    size: 'sm',
    Icon: InfoOutlinedIcon,
  },
  {
    id: 'confirm',
    title: 'Confirm',
    body: 'Ask before a destructive or irreversible change.',
    tone: 'danger',
    size: 'sm',
    Icon: ErrorOutlineIcon,
  },
  {
    id: 'success',
    title: 'Success',
    body: 'Confirm a save, invite, or payment finished cleanly.',
    tone: 'success',
    size: 'sm',
    Icon: CheckCircleOutlineIcon,
  },
  {
    id: 'warning',
    title: 'Warning',
    body: 'Flag risk before stock, billing, or role changes.',
    tone: 'warning',
    size: 'md',
    Icon: WarningAmberOutlinedIcon,
  },
  {
    id: 'form',
    title: 'Form',
    body: 'Collect a short input set without leaving the page.',
    tone: 'info',
    size: 'md',
    Icon: EditOutlinedIcon,
  },
  {
    id: 'large',
    title: 'Large',
    body: 'Wider panel for detail, previews, or longer copy.',
    tone: 'info',
    size: 'lg',
    Icon: OpenInFullOutlinedIcon,
  },
];

const TOASTS = [
  {
    id: 'toast-info',
    title: 'Toast info',
    body: 'Lightweight feedback that auto-dismisses.',
    tone: 'info',
    Icon: NotificationsNoneOutlinedIcon,
  },
  {
    id: 'toast-success',
    title: 'Toast success',
    body: 'Quick confirmation after an action.',
    tone: 'success',
    Icon: CheckCircleOutlineIcon,
  },
  {
    id: 'toast-danger',
    title: 'Toast error',
    body: 'Surface a failure without blocking the screen.',
    tone: 'danger',
    Icon: ErrorOutlineIcon,
  },
];

function DemoTile({ card, onLaunch }) {
  return (
    <article className={`p-popups__tile is-${card.tone}`}>
      <div className="p-popups__tile-top">
        <span className="p-popups__icon" aria-hidden>
          <card.Icon fontSize="small" />
        </span>
        {card.size && <em className="p-popups__size">{card.size}</em>}
      </div>
      <h2>{card.title}</h2>
      <p>{card.body}</p>
      <button type="button" className="p-popups__launch" onClick={() => onLaunch(card.id)}>
        Preview
      </button>
    </article>
  );
}

export function PopupsPage() {
  const [open, setOpen] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [inviteName, setInviteName] = useState(OWNER_NAME);
  const [inviteEmail, setInviteEmail] = useState('teammate@demo.com');

  const close = () => setOpen(null);

  const pushToast = useCallback((tone, title, message) => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((current) => [...current, { id, tone, title, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 4200);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const launch = (id) => {
    if (id === 'toast-info') {
      pushToast('info', 'Sync queued', 'Reports will refresh in the background.');
      return;
    }
    if (id === 'toast-success') {
      pushToast('success', 'Saved', 'Workspace settings updated on this device.');
      return;
    }
    if (id === 'toast-danger') {
      pushToast('danger', 'Could not export', 'Check the connection and try again.');
      return;
    }
    setOpen(id);
  };

  return (
    <div className="c-page p-popups">
      <PageHeader title="Popups" crumbs={[{ label: 'UI Kit' }, { label: 'Popups' }]} />

      <section className="p-popups__section">
        <header className="p-popups__section-head">
          <h2>Dialogs</h2>
        </header>
        <ul className="p-popups__grid">
          {DIALOGS.map((card) => (
            <li key={card.id}>
              <DemoTile card={card} onLaunch={launch} />
            </li>
          ))}
        </ul>
      </section>

      <section className="p-popups__section">
        <header className="p-popups__section-head">
          <h2>Toasts</h2>
        </header>
        <ul className="p-popups__grid p-popups__grid--toasts">
          {TOASTS.map((card) => (
            <li key={card.id}>
              <DemoTile card={card} onLaunch={launch} />
            </li>
          ))}
        </ul>
      </section>

      <Popup
        open={open === 'alert'}
        onClose={close}
        tone="info"
        title="Heads up"
        size="sm"
        footer={
          <button type="button" className="c-popup__btn c-popup__btn--primary" onClick={close}>
            Got it
          </button>
        }
      >
        <p className="c-popup__text">
          Demo data stays in this browser. Call {OWNER_NAME} on {CONTACT_PHONE} if you need a walkthrough.
        </p>
      </Popup>

      <Popup
        open={open === 'confirm'}
        onClose={close}
        tone="danger"
        title="Delete this order?"
        size="sm"
        footer={
          <>
            <button type="button" className="c-popup__btn c-popup__btn--ghost" onClick={close}>
              Cancel
            </button>
            <button
              type="button"
              className="c-popup__btn c-popup__btn--danger"
              onClick={() => {
                close();
                pushToast('success', 'Order removed', 'ORD-1050 was deleted from this browser.');
              }}
            >
              Delete
            </button>
          </>
        }
      >
        <p className="c-popup__text">This cannot be undone. Line items and payment notes will be cleared from local demo data.</p>
      </Popup>

      <Popup
        open={open === 'success'}
        onClose={close}
        tone="success"
        title="Invite sent"
        size="sm"
        footer={
          <button type="button" className="c-popup__btn c-popup__btn--primary" onClick={close}>
            Continue
          </button>
        }
      >
        <p className="c-popup__text">Priya Shah can join with the demo password once they open the invite link on this device.</p>
      </Popup>

      <Popup
        open={open === 'warning'}
        onClose={close}
        tone="warning"
        title="Low stock risk"
        size="md"
        footer={
          <>
            <button type="button" className="c-popup__btn c-popup__btn--ghost" onClick={close}>
              Not now
            </button>
            <button
              type="button"
              className="c-popup__btn c-popup__btn--primary"
              onClick={() => {
                close();
                pushToast('info', 'Restock noted', 'Canvas Field Jacket flagged for reorder.');
              }}
            >
              Restock
            </button>
          </>
        }
      >
        <p className="c-popup__text">Canvas Field Jacket is down to 9 units. Fulfillment may slip if another order lands today.</p>
      </Popup>

      <Popup
        open={open === 'form'}
        onClose={close}
        title="Invite teammate"
        size="md"
        footer={
          <>
            <button type="button" className="c-popup__btn c-popup__btn--ghost" onClick={close}>
              Cancel
            </button>
            <button
              type="button"
              className="c-popup__btn c-popup__btn--primary"
              onClick={() => {
                close();
                pushToast('success', 'Invite ready', `${inviteName} · ${inviteEmail}`);
              }}
            >
              Send invite
            </button>
          </>
        }
      >
        <div className="c-popup__fields">
          <label className="c-popup__field">
            <span>Name</span>
            <input value={inviteName} onChange={(e) => setInviteName(e.target.value)} />
          </label>
          <label className="c-popup__field">
            <span>Email</span>
            <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
          </label>
        </div>
      </Popup>

      <Popup
        open={open === 'large'}
        onClose={close}
        title="Release notes"
        size="lg"
        footer={
          <button type="button" className="c-popup__btn c-popup__btn--primary" onClick={close}>
            Close
          </button>
        }
      >
        <div className="c-popup__rich">
          <p>This console ships with dashboards, catalog, orders, chat, and a template customizer.</p>
          <ul>
            <li>Roles limited to Super Admin, Admin, and Viewer</li>
            <li>Prices and reports stay in Indian Rupees</li>
            <li>Everything persists in localStorage for this browser</li>
          </ul>
          <p>
            Need help? Reach {OWNER_NAME} at {CONTACT_PHONE}.
          </p>
        </div>
      </Popup>

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
