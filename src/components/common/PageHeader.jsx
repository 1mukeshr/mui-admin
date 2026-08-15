import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router-dom';

export function PageHeader({
  title,
  crumbs,
  actions,
}) {
  return (
    <header className="c-page-header">
      <div className="c-page-header__copy">
        {crumbs && crumbs.length > 0 && (
          <nav className="c-breadcrumbs" aria-label="Breadcrumb">
            <ol className="c-breadcrumbs__list">
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="c-breadcrumbs__item">
                    {index > 0 && (
                      <NavigateNextIcon className="c-breadcrumbs__sep" fontSize="inherit" aria-hidden />
                    )}
                    {crumb.to && !last ? (
                      <RouterLink className="c-breadcrumbs__link" to={crumb.to}>
                        {crumb.label}
                      </RouterLink>
                    ) : (
                      <span className="c-breadcrumbs__current" aria-current={last ? 'page' : undefined}>
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        <div className="c-page-header__row">
          <h1 className="c-page-header__title">{title}</h1>
          {actions && <div className="c-page-header__actions">{actions}</div>}
        </div>
      </div>
    </header>
  );
}
