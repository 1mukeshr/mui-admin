export function BrandLogo({
  inverted = false,
  compact = false,
}) {
  const className = ['c-brand', compact ? 'is-compact' : '', inverted ? 'is-inverted' : ''].filter(Boolean).join(' ');

  return (
    <span className={className} aria-label="MUI Admin">
      <span className="c-brand__mark" aria-hidden>
        M
      </span>
      {!compact && (
        <span className="c-brand__wordmark">
          <span className="c-brand__name">MUI</span>
          <span className="c-brand__name c-brand__name--soft">Admin</span>
        </span>
      )}
    </span>
  );
}
