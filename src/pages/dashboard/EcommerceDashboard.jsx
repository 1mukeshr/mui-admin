import { Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { ChartCard } from '../../components/common/ChartCard';
import { DonutChart } from '../../components/common/DonutChart';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { SwitchableChart } from '../../components/common/SwitchableChart';
import { InsightList } from '../../components/dashboard/InsightList';
import { LowStock } from '../../components/dashboard/LowStock';
import { TopProducts } from '../../components/dashboard/TopProducts';
import { useAppData } from '../../contexts/AppDataContext';
import {
  CITY_ORDERS,
  ECOMMERCE_CHANNELS,
  ECOMMERCE_FUNNEL,
  ECOMMERCE_HOURLY,
  ECOMMERCE_SERIES,
  PAYMENT_MIX,
} from '../../data/seed';
import { formatCurrency } from '../../utils/format';

const inrK = (value) => `₹${Math.round(Number(value) / 1000)}k`;

export function EcommerceDashboard() {
  const { orders, products, categories } = useAppData();
  const navigate = useNavigate();
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const slices = [primary, '#06b6d4', '#10b981', '#f59e0b', '#f43f5e'];

  const revenue = orders.filter((order) => order.paymentStatus === 'paid').reduce((sum, order) => sum + order.total, 0);
  const aov = orders.length ? Math.round(revenue / orders.length) : 0;
  const latest = ECOMMERCE_SERIES[ECOMMERCE_SERIES.length - 1];
  const funnel = ECOMMERCE_FUNNEL;
  const abandon = Math.round((1 - funnel[3].value / funnel[1].value) * 100);
  const returns = ECOMMERCE_SERIES.reduce((sum, item) => sum + item.returns, 0);
  const categorySales = categories.map((category, index) => ({
    name: category.name,
    value: products
      .filter((product) => product.categoryId === category.id)
      .reduce((sum, product) => sum + product.price * Math.max(12 - Math.min(product.stock, 10), 2), 0),
    fill: slices[index % slices.length],
  }));

  return (
    <div className="c-page p-ecommerce">
      <PageHeader
        title="Ecommerce"
        crumbs={[{ label: 'Dashboards' }, { label: 'Ecommerce' }]}
      />
      <div className="c-grid">
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="GMV" value={formatCurrency(revenue)} change="+21.0%" icon={<CurrencyRupeeIcon />} />
        </div>
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Avg order value" value={formatCurrency(aov)} change="+3.4%" icon={<PaymentsOutlinedIcon />} tone="green" />
        </div>
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Cart abandonment" value={`${abandon}%`} change="-1.6%" icon={<RemoveShoppingCartOutlinedIcon />} tone="rose" />
        </div>
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Returns" value={String(returns)} change="+0.8%" icon={<ReplayOutlinedIcon />} tone="amber" />
        </div>

        <div className="c-span-lg-8">
          <ChartCard fill title="Revenue, orders, and conversion">
            <SwitchableChart
              data={ECOMMERCE_SERIES}
              xKey="month"
              height={300}
              defaultType="area"
              yTickFormatter={(value) => Number(value).toLocaleString('en-IN')}
              rightDomain={[1.4, 2.1]}
              rightTickFormatter={(value) => `${value}%`}
              formatter={(value, name) => {
                if (name === 'Revenue') return formatCurrency(Number(value));
                if (name === 'Conversion') return `${value}%`;
                return String(value);
              }}
              series={[
                { dataKey: 'revenue', name: 'Revenue', color: primary, yAxisId: 'left' },
                { dataKey: 'orders', name: 'Orders', color: '#06b6d4', yAxisId: 'left' },
                { dataKey: 'conversion', name: 'Conversion', color: '#f59e0b', yAxisId: 'right' },
              ]}
            />
          </ChartCard>
        </div>
        <div className="c-span-lg-4">
          <ChartCard fill title="Store pulse">
            <InsightList
              items={[
                { label: 'Visits', detail: 'Unique store sessions', value: latest.visits.toLocaleString('en-IN'), tone: 'up' },
                { label: 'Paid orders', detail: 'Completed checkouts', value: String(latest.orders), tone: 'up' },
                { label: 'Conversion', detail: 'Visit to paid order', value: `${latest.conversion}%` },
                { label: 'Returns', detail: 'Units sent back', value: String(latest.returns), tone: 'down' },
                { label: 'Peak hour', detail: 'Highest order volume', value: '6pm' },
              ]}
            />
          </ChartCard>
        </div>

        <div className="c-span-md-5">
          <ChartCard fill title="Purchase funnel">
            <SwitchableChart
              data={funnel}
              xKey="name"
              height={260}
              defaultType="bar"
              layout="vertical"
              categoryWidth={104}
              showToggle={false}
              formatter={(value) => Number(value).toLocaleString('en-IN')}
              series={[{ dataKey: 'value', name: 'Count', color: primary }]}
            />
          </ChartCard>
        </div>
        <div className="c-span-md-7">
          <ChartCard fill title="Sales by category">
            <SwitchableChart
              data={categorySales}
              xKey="name"
              height={260}
              defaultType="bar"
              yTickFormatter={inrK}
              formatter={(value) => formatCurrency(Number(value))}
              series={[{ dataKey: 'value', name: 'Sales', color: '#06b6d4' }]}
            />
          </ChartCard>
        </div>

        <div className="c-span-lg-8">
          <ChartCard fill title="Orders by channel">
            <SwitchableChart
              data={ECOMMERCE_CHANNELS}
              xKey="month"
              height={260}
              defaultType="bar"
              stacked
              series={[
                { dataKey: 'organic', name: 'Organic', color: primary },
                { dataKey: 'paid', name: 'Paid ads', color: '#06b6d4' },
                { dataKey: 'social', name: 'Social', color: '#f59e0b' },
                { dataKey: 'email', name: 'Email', color: '#10b981' },
              ]}
            />
          </ChartCard>
        </div>
        <div className="c-span-lg-4">
          <ChartCard fill title="Hourly orders">
            <SwitchableChart
              data={ECOMMERCE_HOURLY}
              xKey="hour"
              height={240}
              defaultType="area"
              showToggle={false}
              series={[{ dataKey: 'orders', name: 'Orders', color: '#f43f5e' }]}
            />
          </ChartCard>
        </div>

        <div className="c-span-md-5">
          <ChartCard fill title="Payment mix">
            <DonutChart data={PAYMENT_MIX} height={240} centerValue="UPI" centerLabel="top method" formatter={(value) => `${value}%`} />
          </ChartCard>
        </div>
        <div className="c-span-md-7">
          <ChartCard fill title="GMV by city">
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
            title="Best sellers"
            action={
              <Button size="small" onClick={() => navigate('/products')}>
                Catalog
              </Button>
            }
          >
            <TopProducts products={products} orders={orders} variant="tiles" />
          </ChartCard>
        </div>
        <div className="c-span-lg-6">
          <ChartCard
            fill
            title="Restock now"
            action={
              <Button size="small" onClick={() => navigate('/products')}>
                Inventory
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
