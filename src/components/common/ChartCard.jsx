export function ChartCard({
  title,
  description,
  action,
  fill = false,
  children,
  footer,
}) {
  return (
    <article className={fill ? 'c-chart-card is-fill' : 'c-chart-card'}>
      <div className="c-chart-card__body">
        <div className="c-chart-card__head">
          <div className="c-chart-card__heading">
            <h2 className="c-chart-card__title">{title}</h2>
            {description ? <p className="c-chart-card__desc">{description}</p> : null}
          </div>
          {action}
        </div>
        <div className={fill ? 'c-chart-card__content is-fill' : 'c-chart-card__content'}>
          {children}
        </div>
        {footer ? <div className="c-chart-card__footer">{footer}</div> : null}
      </div>
    </article>
  );
}
