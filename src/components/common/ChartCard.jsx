export function ChartCard({
  title,
  action,
  fill = false,
  children,
}) {
  return (
    <article className={fill ? 'c-chart-card is-fill' : 'c-chart-card'}>
      <div className="c-chart-card__body">
        <div className="c-chart-card__head">
          <h2 className="c-chart-card__title">{title}</h2>
          {action}
        </div>
        {children}
      </div>
    </article>
  );
}
