import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { useEffect } from 'react';

const TONE_ICON = {
  info: InfoOutlinedIcon,
  success: CheckCircleOutlineIcon,
  warning: WarningAmberOutlinedIcon,
  danger: ErrorOutlineIcon,
};

export function Popup({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  tone,
  dismissible = true,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape' && dismissible) onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [dismissible, onClose, open]);

  if (!open) return null;

  const Icon = tone ? TONE_ICON[tone] : null;

  return (
    <div className="c-popup" role="presentation">
      <button
        type="button"
        className="c-popup__backdrop"
        aria-label="Close dialog"
        onClick={() => dismissible && onClose?.()}
      />
      <div
        className={`c-popup__panel c-popup__panel--${size}${tone ? ` is-${tone}` : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'c-popup-title' : undefined}
      >
        {(title || dismissible) && (
          <header className="c-popup__head">
            <div className="c-popup__title-wrap">
              {Icon && (
                <span className={`c-popup__tone-icon is-${tone}`} aria-hidden>
                  <Icon fontSize="small" />
                </span>
              )}
              {title && (
                <h2 id="c-popup-title" className="c-popup__title">
                  {title}
                </h2>
              )}
            </div>
            {dismissible && (
              <button type="button" className="c-popup__close" onClick={onClose} aria-label="Close">
                <CloseIcon fontSize="small" />
              </button>
            )}
          </header>
        )}
        <div className="c-popup__body">{children}</div>
        {footer && <footer className="c-popup__foot">{footer}</footer>}
      </div>
    </div>
  );
}

export function ToastStack({ toasts, onDismiss }) {
  if (!toasts?.length) return null;
  return (
    <div className="c-toast-stack" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = TONE_ICON[toast.tone] || InfoOutlinedIcon;
        return (
          <div key={toast.id} className={`c-toast is-${toast.tone || 'info'}`} role="status">
            <span className="c-toast__icon" aria-hidden>
              <Icon fontSize="small" />
            </span>
            <div className="c-toast__copy">
              {toast.title && <strong>{toast.title}</strong>}
              <span>{toast.message}</span>
            </div>
            <button type="button" className="c-toast__close" onClick={() => onDismiss(toast.id)} aria-label="Dismiss">
              <CloseIcon fontSize="inherit" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
