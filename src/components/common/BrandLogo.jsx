import { BRAND_FULL, BRAND_NAME, BRAND_PRODUCT } from '../../data/brand';

/** Full Tejas MUI wordmark — always shows both names. */
export function BrandLogo({
  compact = false,
  className = '',
  inverted = false,
}) {
  const classes = [
    'c-brand',
    compact ? 'is-compact' : '',
    inverted ? 'is-inverted' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} aria-label={BRAND_FULL}>
      <span className="c-brand__text">
        <span className="c-brand__tejas">{BRAND_NAME}</span>
        <span className="c-brand__mui">{BRAND_PRODUCT}</span>
      </span>
    </span>
  );
}
