export function InsightList({ items }) {
  return (
    <ul className="c-insight">
      {items.map((item) => (
        <li key={item.label}>
          <span className="c-insight__copy">
            <strong>{item.label}</strong>
            {item.detail && <span className="c-muted">{item.detail}</span>}
          </span>
          <span className={`c-insight__value ${item.tone === 'down' ? 'is-down' : item.tone === 'up' ? 'is-up' : ''}`}>
            {item.value}
          </span>
        </li>
      ))}
    </ul>
  );
}
