import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';

function StatusScreen({
  image,
  imageAlt,
  code,
  title,
  description,
  primaryLabel = 'Back to dashboard',
  onPrimary,
  secondaryLabel = 'Go back',
  onSecondary,
}) {
  return (
    <section className="p-status">
      <img className="p-status__art" src={image} alt={imageAlt || ''} />
      {code && <p className="p-status__code">{code}</p>}
      <h1 className="p-status__title">{title}</h1>
      <p className="p-status__lead">{description}</p>
      <div className="p-status__actions">
        {onPrimary && (
          <button type="button" className="p-status__btn p-status__btn--primary" onClick={onPrimary}>
            {primaryLabel}
          </button>
        )}
        {onSecondary && (
          <button type="button" className="p-status__btn p-status__btn--ghost" onClick={onSecondary}>
            {secondaryLabel}
          </button>
        )}
      </div>
    </section>
  );
}

function DemoShell({ title, crumb, children }) {
  return (
    <div className="c-page p-system">
      <PageHeader title={title} crumbs={[{ label: 'Misc' }, { label: crumb }]} />
      <div className="p-system__stage">{children}</div>
    </div>
  );
}

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <StatusScreen
      image="/illustrations/404.svg"
      imageAlt="Page not found"
      code="404"
      title="Page not found"
      description="This route is missing or was moved. Check the URL, or head back to the console."
      onPrimary={() => navigate('/dashboard')}
      onSecondary={() => navigate(-1)}
    />
  );
}

export function ForbiddenPage() {
  const navigate = useNavigate();
  return (
    <StatusScreen
      image="/illustrations/403.svg"
      imageAlt="Access denied"
      code="403"
      title="Access denied"
      description="Your role cannot open this page. Ask an admin if you need a different permission."
      primaryLabel="Open dashboard"
      onPrimary={() => navigate('/dashboard')}
      onSecondary={() => navigate(-1)}
    />
  );
}

export function ServerErrorPage() {
  const navigate = useNavigate();
  return (
    <StatusScreen
      image="/illustrations/500.svg"
      imageAlt="Server error"
      code="500"
      title="Something broke"
      description="An unexpected error stopped this screen. Retry, or return to the dashboard."
      primaryLabel="Try dashboard"
      onPrimary={() => navigate('/dashboard')}
      secondaryLabel="Reload"
      onSecondary={() => window.location.reload()}
    />
  );
}

export function SystemNotFoundPage() {
  return (
    <DemoShell title="404 page" crumb="404">
      <NotFoundPage />
    </DemoShell>
  );
}

export function SystemForbiddenPage() {
  return (
    <DemoShell title="403 page" crumb="403">
      <ForbiddenPage />
    </DemoShell>
  );
}

export function SystemServerErrorPage() {
  return (
    <DemoShell title="500 page" crumb="500">
      <ServerErrorPage />
    </DemoShell>
  );
}

export function SystemLoadingPage() {
  return (
    <DemoShell title="Loading state" crumb="Loading">
      <section className="p-status">
        <img className="p-status__art" src="/illustrations/loading.svg" alt="" />
        <div className="p-status__spinner" aria-hidden>
          <span />
        </div>
        <h1 className="p-status__title">Loading workspace</h1>
        <p className="p-status__lead">Fetching users, catalog, and orders for this browser session.</p>
      </section>
    </DemoShell>
  );
}

export function SystemEmptyPage() {
  const navigate = useNavigate();
  return (
    <DemoShell title="Empty state" crumb="Empty">
      <StatusScreen
        image="/illustrations/empty.svg"
        imageAlt="No records"
        title="No records yet"
        description="Nothing matches this view. Clear filters, or create the first record."
        primaryLabel="Go to users"
        onPrimary={() => navigate('/users')}
        secondaryLabel="Open products"
        onSecondary={() => navigate('/products')}
      />
    </DemoShell>
  );
}

export function SystemErrorPage() {
  return (
    <DemoShell title="Error state" crumb="Error">
      <StatusScreen
        image="/illustrations/error.svg"
        imageAlt="Section error"
        title="Could not load this section"
        description="Check the connection and try again. Demo data stays on this device."
        primaryLabel="Reload"
        onPrimary={() => window.location.reload()}
        secondaryLabel="Dashboard"
        onSecondary={() => {
          window.location.href = '/dashboard';
        }}
      />
    </DemoShell>
  );
}
