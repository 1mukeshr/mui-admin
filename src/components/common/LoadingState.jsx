export function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="c-status c-status--loading" role="status" aria-live="polite">
      <img className="c-status__art" src="/illustrations/loading.svg" alt="" />
      <div className="c-status__spinner" aria-hidden>
        <span />
      </div>
      <p className="c-status__text">{label}</p>
    </div>
  );
}
