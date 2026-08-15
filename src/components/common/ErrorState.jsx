export function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this page. Try again.',
  onRetry,
  image = '/illustrations/error.svg',
}) {
  return (
    <div className="c-status" role="alert">
      <img className="c-status__art" src={image} alt="" />
      <p className="c-status__title">{title}</p>
      <p className="c-status__text">{description}</p>
      {onRetry && (
        <button type="button" className="c-status__btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
