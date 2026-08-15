export function EmptyState({
  title = 'Nothing here yet',
  description = 'There is no data to display for this view.',
  actionLabel,
  onAction,
  image = '/illustrations/empty.svg',
}) {
  return (
    <div className="c-status" role="status">
      <img className="c-status__art" src={image} alt="" />
      <p className="c-status__title">{title}</p>
      <p className="c-status__text">{description}</p>
      {actionLabel && onAction && (
        <button type="button" className="c-status__btn" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
