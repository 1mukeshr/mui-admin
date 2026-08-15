import { Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { ChartCard } from '../../components/common/ChartCard';
import { DonutChart } from '../../components/common/DonutChart';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { SwitchableChart } from '../../components/common/SwitchableChart';
import { InsightList } from '../../components/dashboard/InsightList';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { RecentOrders } from '../../components/dashboard/RecentOrders';
import { LowStock } from '../../components/dashboard/LowStock';
import { TopProducts } from '../../components/dashboard/TopProducts';
import { useAppData } from '../../contexts/AppDataContext';
import { CITY_ORDERS, PAYMENT_MIX, REVENUE_SERIES, WEEKLY_OPS } from '../../data/seed';
import { formatCurrency } from '../../utils/format';

const inrK = (value) => `₹${Math.round(Number(value) / 1000)}k`;

export function Dashboard() {
  const { orders, products, activities } = useAppData();
  const navigate = useNavigate();
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const paid = orders.filter((order) => order.paymentStatus === 'paid');
  const revenue = paid.reduce((sum, order) => sum + order.total, 0);
  const aov = orders.length ? Math.round(revenue / orders.length) : 0;
  const delivered = orders.filter((order) => order.status === 'delivered').length;
  const fulfillRate = orders.length ? Math.round((delivered / orders.length) * 100) : 0;
  const latest = REVENUE_SERIES[REVENUE_SERIES.length - 1];
  const previous = REVENUE_SERIES[REVENUE_SERIES.length - 2];
  const statusCounts = [
    { name: 'Pending', value: orders.filter((order) => order.status === 'pending').length, fill: '#f59e0b' },
    { name: 'Processing', value: orders.filter((order) => order.status === 'processing').length, fill: '#06b6d4' },
    { name: 'Shipped', value: orders.filter((order) => order.status === 'shipped').length, fill: primary },
    { name: 'Delivered', value: delivered, fill: '#10b981' },
    { name: 'Cancelled', value: orders.filter((order) => order.status === 'cancelled').length, fill: '#f43f5e' },
  ];

  return (
    <div className="c-page p-dashboard">
      <PageHeader
        title="Overview"
        crumbs={[{ label: 'Dashboards' }, { label: 'Overview' }]}
      />
      <div className="c-grid">
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Paid revenue" value={formatCurrency(revenue)} change="+21.0%" icon={<CurrencyRupeeIcon />} />
        </div>
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Orders" value={String(orders.length)} change="+8.1%" icon={<ShoppingCartOutlinedIcon />} tone="cyan" />
        </div>
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Avg order value" value={formatCurrency(aov)} change="+3.4%" icon={<PaymentsOutlinedIcon />} tone="green" />
        </div>
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Fulfillment" value={`${fulfillRate}%`} change="+5.2%" icon={<LocalShippingOutlinedIcon />} tone="amber" />
        </div>

        <div className="c-span-lg-8">
          <ChartCard fill title="Revenue vs refunds">
            <SwitchableChart
              data={REVENUE_SERIES}
              xKey="month"
              height={300}
              defaultType="area"
              yTickFormatter={inrK}
              formatter={(value) => formatCurrency(Number(value))}
              series={[
                { dataKey: 'revenue', name: 'Revenue', color: primary },
                { dataKey: 'refunds', name: 'Refunds', color: '#f43f5e' },
              ]}
            />
          </ChartCard>
        </div>
        <div className="c-span-lg-4">
          <ChartCard fill title="This month">
            <InsightList
              items={[
                { label: 'August GMV', detail: `vs ${formatCurrency(previous.revenue)} in July`, value: formatCurrency(latest.revenue), tone: 'up' },
                { label: 'Units sold', detail: 'Catalog movement this month', value: String(latest.sales), tone: 'up' },
                { label: 'New accounts', detail: 'Users added in August', value: String(latest.users), tone: 'up' },
                { label: 'Refunds', detail: 'Returned value this month', value: formatCurrency(latest.refunds), tone: 'down' },
                { label: 'Open catalog', detail: 'Active SKUs in stock', value: String(products.filter((item) => item.status === 'active').length) },
              ]}
            />
          </ChartCard>
        </div>

        <div className="c-span-md-7">
          <ChartCard fill title="This week">
            <SwitchableChart
              data={WEEKLY_OPS}
              xKey="day"
              height={260}
              defaultType="bar"
              yTickFormatter={inrK}
              formatter={(value, name) => (name === 'Revenue' ? formatCurrency(Number(value)) : String(value))}
              series={[
                { dataKey: 'revenue', name: 'Revenue', color: primary },
                { dataKey: 'orders', name: 'Orders', color: '#06b6d4' },
              ]}
            />
          </ChartCard>
        </div>
        <div className="c-span-md-5">
          <ChartCard fill title="Payment mix">
            <DonutChart
              data={PAYMENT_MIX}
              height={240}
              centerValue={`${PAYMENT_MIX[0].value}%`}
              centerLabel="UPI"
              formatter={(value) => `${value}%`}
            />
          </ChartCard>
        </div>

        <div className="c-span-md-5">
          <ChartCard fill title="Order status">
            <DonutChart
              data={statusCounts}
              height={240}
              centerValue={String(orders.length)}
              centerLabel="orders"
            />
          </ChartCard>
        </div>
        <div className="c-span-md-7">
          <ChartCard fill title="Demand by city">
            <SwitchableChart
              data={CITY_ORDERS}
              xKey="name"
              height={240}
              defaultType="bar"
              layout="vertical"
              categoryWidth={92}
              showToggle={false}
              yTickFormatter={inrK}
              formatter={(value) => formatCurrency(Number(value))}
              series={[{ dataKey: 'value', name: 'GMV', color: '#10b981' }]}
            />
          </ChartCard>
        </div>

        <div className="c-span-lg-6">
          <ChartCard
            fill
            title="Recent orders"
            action={
              <Button size="small" onClick={() => navigate('/orders')}>
                View all
              </Button>
            }
          >
            <RecentOrders orders={orders} variant="table" />
          </ChartCard>
        </div>
        <div className="c-span-lg-6">
          <ChartCard fill title="Recent activity">
            <RecentActivity activities={activities} variant="timeline" />
          </ChartCard>
        </div>
        <div className="c-span-lg-6">
          <ChartCard
            fill
            title="Top products"
            action={
              <Button size="small" onClick={() => navigate('/products')}>
                View all
              </Button>
            }
          >
            <TopProducts products={products} orders={orders} variant="ranked" />
          </ChartCard>
        </div>
        <div className="c-span-lg-6">
          <ChartCard
            fill
            title="Low stock"
            action={
              <Button size="small" onClick={() => navigate('/products')}>
                Restock
              </Button>
            }
          >
            <LowStock products={products} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
