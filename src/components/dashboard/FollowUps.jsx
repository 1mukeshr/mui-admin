import { formatCurrency } from '../../utils/format';

function dueTone(due) {
  if (due === 'Today') return 'danger';
  if (due === 'Tomorrow') return 'warning';
  return 'neutral';
}

function FollowUpRow({ item }) {
  return (
    <>
      <span className="c-panel__body">
        <strong>{item.company}</strong>
        <span className="c-panel__meta">
          {item.contact} · {item.owner}
        </span>
      </span>
      <span className="c-panel__aside">
        <span className="c-panel__value">{formatCurrency(item.value)}</span>
        <span className={`c-badge c-badge--${dueTone(item.due)}`}>
          {item.due} · {item.stage}
        </span>
      </span>
    </>
  );
}

export function FollowUps({ items, variant = 'list' }) {
  if (variant === 'board') {
    const groups = [
      { id: 'today', label: 'Due today', items: items.filter((item) => item.due === 'Today') },
      { id: 'week', label: 'Later this week', items: items.filter((item) => item.due !== 'Today') },
    ].filter((group) => group.items.length);

    return (
      <div className="c-board">
        {groups.map((group) => (
          <section key={group.id}>
            <h3 className="c-board__label">
              {group.label}
              <span>{group.items.length}</span>
            </h3>
            {group.items.map((item) => (
              <article className="c-board__card" key={item.id}>
                <FollowUpRow item={item} />
              </article>
            ))}
          </section>
        ))}
      </div>
    );
  }

  return (
    <ul className="c-panel">
      {items.map((item) => (
        <li key={item.id}>
          <div className="c-panel__item">
            <span className={`c-rank c-rank--${item.priority}`}>{item.stage.slice(0, 1)}</span>
            <FollowUpRow item={item} />
          </div>
        </li>
      ))}
    </ul>
  );
}
