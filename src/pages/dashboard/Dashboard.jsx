import { Button, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { ChartCard } from '../../components/common/ChartCard';
import { DateRangePicker } from '../../components/common/DateRangePicker';
import { DonutChart } from '../../components/common/DonutChart';
import { PageHeader } from '../../components/common/PageHeader';
import { SwitchableChart } from '../../components/common/SwitchableChart';
import { InsightList } from '../../components/dashboard/InsightList';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { RecentOrders } from '../../components/dashboard/RecentOrders';
import { LowStock } from '../../components/dashboard/LowStock';
import { TopProducts } from '../../components/dashboard/TopProducts';
import { useAppData } from '../../contexts/AppDataContext';
import { CITY_ORDERS, PAYMENT_MIX, REVENUE_SERIES, WEEKLY_OPS } from '../../data/seed';
import { defaultDateRange, inDateRange } from '../../utils/dateRange';
import { formatCurrency, formatInrK, formatPercentChange } from '../../utils/format';

const MONTH_INDEX = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

export function Dashboard() {
  const { orders, products, activities, customers } = useAppData();
  const navigate = useNavigate();
  const theme = useTheme();
  const [range, setRange] = useState(() => defaultDateRange('30d'));
  const primary = theme.palette.primary.main;
  const success = theme.palette.success.main;
  const warning = theme.palette.warning.main;
  const error = theme.palette.error.main;
  const info = theme.palette.info.main;
  const refundColor = theme.palette.mode === 'dark' ? '#fbbf24' : '#d97706';

  const rangedOrders = useMemo(
    () => orders.filter((order) => inDateRange(order.createdAt, range.start, range.end)),
    [orders, range.end, range.start],
  );
  const rangedActivities = useMemo(
    () => activities.filter((item) => inDateRange(item.createdAt, range.start, range.end)),
    [activities, range.end, range.start],
  );
  const revenueSeries = useMemo(() => {
    const year = range.end.getFullYear();
    const filtered = REVENUE_SERIES.filter((item) => {
      const month = MONTH_INDEX[item.month];
      if (month == null) return true;
      return inDateRange(new Date(year, month, 15), range.start, range.end);
    });
    return filtered.length ? filtered : REVENUE_SERIES.slice(-3);
  }, [range.end, range.start]);

  const paid = rangedOrders.filter((order) => order.paymentStatus === 'paid');
  const revenue = paid.reduce((sum, order) => sum + order.total, 0);
  const aov = rangedOrders.length ? Math.round(revenue / rangedOrders.length) : 0;
  const delivered = rangedOrders.filter((order) => order.status === 'delivered').length;
  const fulfillRate = rangedOrders.length ? Math.round((delivered / rangedOrders.length) * 100) : 0;
  const pendingOrders = rangedOrders.filter((order) => order.status === 'pending' || order.status === 'processing');
  const lowStock = products.filter((item) => item.stock <= 18);
  const latest = revenueSeries[revenueSeries.length - 1];
  const previous = revenueSeries[revenueSeries.length - 2] ?? latest;
  const prevAov = previous.sales ? Math.round(previous.revenue / previous.sales) : 0;
  const latestAov = latest.sales ? Math.round(latest.revenue / latest.sales) : 0;
  const refundRate = latest.revenue ? Math.round((latest.refunds / latest.revenue) * 1000) / 10 : 0;
  const netGmv = latest.revenue - latest.refunds;
  const activeCustomers = customers.filter((c) => c.status === 'active').length;
  const queueItems = [
    ...pendingOrders.slice(0, 4).map((order) => ({
      key: order.id,
      kind: 'order',
      title: order.orderNumber,
      detail: `${order.customerName} · ${order.status}`,
      meta: formatCurrency(order.total),
      to: `/orders/${order.id}`,
    })),
    ...lowStock.slice(0, 3).map((item) => ({
      key: item.id,
      kind: 'stock',
      title: item.name,
      detail: item.stock === 0 ? 'Out of stock' : `${item.stock} left`,
      meta: 'Restock',
      to: `/products/${item.id}`,
    })),
  ];

  const statusCounts = [
    { name: 'Pending', value: rangedOrders.filter((order) => order.status === 'pending').length, fill: warning },
    { name: 'Processing', value: rangedOrders.filter((order) => order.status === 'processing').length, fill: info },
    { name: 'Shipped', value: rangedOrders.filter((order) => order.status === 'shipped').length, fill: primary },
    { name: 'Delivered', value: delivered, fill: success },
    { name: 'Cancelled', value: rangedOrders.filter((order) => order.status === 'cancelled').length, fill: error },
  ];

  return (
    <div className="c-page p-dashboard">
      <PageHeader
        title="Overview"
        crumbs={[{ label: 'Dashboards', to: '/dashboard' }, { label: 'Overview' }]}
        actions={
          <>
            <DateRangePicker value={range} onChange={setRange} />
            <Button size="small" variant="outlined" onClick={() => navigate('/products')}>
              Catalog
            </Button>
            <Button size="small" variant="contained" onClick={() => navigate('/orders')}>
              Orders
            </Button>
          </>
        }
      />

      <div className="p-ov-stats" aria-label="Overview metrics">
        {[
          {
            label: 'Paid revenue',
            value: formatCurrency(revenue),
            change: formatPercentChange(latest.revenue, previous.revenue),
            icon: <CurrencyRupeeOutlinedIcon fontSize="inherit" />,
            tone: 'primary',
          },
          {
            label: 'Orders',
            value: String(rangedOrders.length),
            change: formatPercentChange(latest.sales, previous.sales),
            icon: <ShoppingCartOutlinedIcon fontSize="inherit" />,
            tone: 'cyan',
          },
          {
            label: 'Avg order value',
            value: formatCurrency(aov),
            change: formatPercentChange(latestAov, prevAov),
            icon: <PaymentsOutlinedIcon fontSize="inherit" />,
            tone: 'green',
          },
          {
            label: 'Fulfillment',
            value: `${fulfillRate}%`,
            icon: <LocalShippingOutlinedIcon fontSize="inherit" />,
            tone: 'amber',
          },
        ].map((item) => (
          <article key={item.label} className={`p-ov-kpi p-ov-kpi--${item.tone}`}>
            <div className="p-ov-kpi__top">
              <p className="p-ov-kpi__label">{item.label}</p>
              <span className="p-ov-kpi__icon" aria-hidden>
                {item.icon}
              </span>
            </div>
            <p className="p-ov-kpi__value">{item.value}</p>
            {item.change ? (
              <p className={`p-ov-kpi__delta ${item.change.startsWith('+') ? 'is-up' : item.change.startsWith('-') ? 'is-down' : ''}`}>
                {item.change} MoM
              </p>
            ) : (
              <p className="p-ov-kpi__delta is-muted">Live</p>
            )}
          </article>
        ))}
      </div>

      <div className="p-ov-main">
        <ChartCard
          title="Revenue vs refunds"
          description="Monthly GMV against returned value"
          footer={
            <ul className="p-ov-chart-foot" aria-label="Month summary">
              <li>
                <span className="p-ov-chart-foot__icon is-gmv" aria-hidden>
                  <TrendingUpRoundedIcon fontSize="inherit" />
                </span>
                <span>
                  <strong>{formatCurrency(latest.revenue)}</strong>
                  <small>{latest.month} GMV</small>
                </span>
              </li>
              <li>
                <span className="p-ov-chart-foot__icon is-refund" aria-hidden>
                  <CurrencyRupeeOutlinedIcon fontSize="inherit" />
                </span>
                <span>
                  <strong>{formatCurrency(latest.refunds)}</strong>
                  <small>{refundRate}% refund rate</small>
                </span>
              </li>
              <li>
                <span className="p-ov-chart-foot__icon is-net" aria-hidden>
                  <PaymentsOutlinedIcon fontSize="inherit" />
                </span>
                <span>
                  <strong>{formatCurrency(netGmv)}</strong>
                  <small>Net after refunds</small>
                </span>
              </li>
              <li>
                <span className="p-ov-chart-foot__icon is-units" aria-hidden>
                  <ShoppingCartOutlinedIcon fontSize="inherit" />
                </span>
                <span>
                  <strong>{latest.sales}</strong>
                  <small>Units sold</small>
                </span>
              </li>
            </ul>
          }
        >
          <SwitchableChart
            data={revenueSeries}
            xKey="month"
            height={220}
            defaultType="bar"
            yTickFormatter={formatInrK}
            formatter={(value) => formatCurrency(Number(value))}
            series={[
              { dataKey: 'revenue', name: 'Revenue', color: primary },
              { dataKey: 'refunds', name: 'Refunds', color: refundColor },
            ]}
          />
        </ChartCard>

        <aside className="p-ov-side">
          <section className="p-ov-panel p-ov-panel--queue">
            <header>
              <h2>Queue</h2>
              <span>
                {pendingOrders.length} open · {lowStock.length} low stock
              </span>
            </header>
            {queueItems.length === 0 ? (
              <p className="p-ov-queue__empty">Nothing needs attention right now.</p>
            ) : (
              <ul className="p-ov-queue">
                {queueItems.map((item) => (
                  <li key={item.key}>
                    <button type="button" onClick={() => navigate(item.to)}>
                      <span className={`p-ov-queue__icon is-${item.kind}`} aria-hidden>
                        {item.kind === 'order' ? <WarningAmberRoundedIcon fontSize="inherit" /> : <Inventory2OutlinedIcon fontSize="inherit" />}
                      </span>
                      <span className="p-ov-queue__copy">
                        <strong>{item.title}</strong>
                        <small>{item.detail}</small>
                      </span>
                      <em>{item.meta}</em>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>

      <div className="p-ov-block">
        <ChartCard
          title="Recent orders"
          description="Orders in the selected range"
          action={
            <Button size="small" onClick={() => navigate('/orders')}>
              View all
            </Button>
          }
        >
          <RecentOrders orders={rangedOrders} variant="table" />
        </ChartCard>
      </div>

      <div className="p-ov-row">
        <ChartCard
          title="Top products"
          action={
            <Button size="small" onClick={() => navigate('/products')}>
              Catalog
            </Button>
          }
        >
          <TopProducts products={products} orders={rangedOrders} variant="ranked" />
        </ChartCard>
        <ChartCard
          title="Low stock"
          action={
            <Button size="small" onClick={() => navigate('/products')}>
              Restock
            </Button>
          }
        >
          <LowStock products={products} />
        </ChartCard>
        <ChartCard
          title="Customers"
          description={`${activeCustomers} active · ${customers.length} total`}
          action={
            <Button size="small" onClick={() => navigate('/customers')}>
              View all
            </Button>
          }
        >
          <InsightList
            items={customers.slice(0, 6).map((customer) => ({
              label: customer.name,
              detail: customer.company || customer.email,
              value: formatCurrency(customer.totalSpent || 0),
            }))}
          />
        </ChartCard>
      </div>

      <div className="p-ov-row p-ov-row--stretch">
        <ChartCard title="This week" description="Ops volume by weekday">
          <SwitchableChart
            data={WEEKLY_OPS}
            xKey="day"
            height={240}
            defaultType="bar"
            yTickFormatter={formatInrK}
            formatter={(value, name) => (name === 'Revenue' ? formatCurrency(Number(value)) : String(value))}
            series={[
              { dataKey: 'revenue', name: 'Revenue', color: primary },
              { dataKey: 'orders', name: 'Orders', color: info },
            ]}
          />
        </ChartCard>
        <ChartCard title="Payment mix" description="Share of paid methods">
          <DonutChart data={PAYMENT_MIX} height={220} centerValue={`${PAYMENT_MIX[0].value}%`} centerLabel="UPI" formatter={(value) => `${value}%`} />
        </ChartCard>
        <ChartCard title="Order status" description="Fulfillment pipeline mix">
          <DonutChart data={statusCounts} height={220} centerValue={String(rangedOrders.length)} centerLabel="orders" />
        </ChartCard>
      </div>

      <div className="p-ov-row p-ov-row--2 p-ov-row--stretch">
        <ChartCard title="Demand by city" description="GMV concentration">
          <SwitchableChart
            data={CITY_ORDERS}
            xKey="name"
            height={240}
            defaultType="bar"
            layout="vertical"
            categoryWidth={88}
            showToggle={false}
            yTickFormatter={formatInrK}
            formatter={(value) => formatCurrency(Number(value))}
            series={[{ dataKey: 'value', name: 'GMV', color: success }]}
          />
        </ChartCard>
        <ChartCard
          title="Recent activity"
          description="Workspace timeline in range"
          footer={
            <div className="p-ov-activity-meta">
              <span>
                <PeopleOutlineIcon fontSize="inherit" />
                {activeCustomers} customers
              </span>
              <span>
                <Inventory2OutlinedIcon fontSize="inherit" />
                {products.length} SKUs
              </span>
              <Button size="small" onClick={() => navigate('/notifications')}>
                Notifications
              </Button>
            </div>
          }
        >
          <RecentActivity activities={rangedActivities} variant="timeline" />
        </ChartCard>
      </div>
    </div>
  );
}
