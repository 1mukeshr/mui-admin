export function StatCard({
  title,
  value,
  change,
  icon,
  tone = 'primary',
}) {
  const positive = change?.startsWith('+');

  return (
    <article className={`c-stat-card c-stat-card--${tone}`}>
      <div className="c-stat-card__inner">
        {icon ? <div className="c-stat-card__icon">{icon}</div> : null}
        <div className="c-stat-card__copy">
          <p className="c-stat-card__label">{title}</p>
          <p className="c-stat-card__value">{value}</p>
          {change ? (
            <p className={`c-stat-card__change ${positive ? 'is-up' : 'is-down'}`}>
              <span>{change}</span>
              <span className="c-stat-card__change-meta">vs last month</span>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
