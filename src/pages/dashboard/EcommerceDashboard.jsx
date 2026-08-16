import { Button, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import { ChartCard } from '../../components/common/ChartCard';
import { DateRangePicker } from '../../components/common/DateRangePicker';
import { DonutChart } from '../../components/common/DonutChart';
import { PageHeader } from '../../components/common/PageHeader';
import { SwitchableChart } from '../../components/common/SwitchableChart';
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
import { defaultDateRange } from '../../utils/dateRange';
import { formatCurrency, formatInrK, formatPercentChange } from '../../utils/format';

export function EcommerceDashboard() {
  const { orders, products, categories } = useAppData();
  const navigate = useNavigate();
  const theme = useTheme();
  const [range, setRange] = useState(() => defaultDateRange('30d'));
  const primary = theme.palette.primary.main;
  const success = theme.palette.success.main;
  const warning = theme.palette.warning.main;
  const error = theme.palette.error.main;
  const info = theme.palette.info.main;
  const slices = [primary, info, success, warning, error];

  const revenue = orders.filter((order) => order.paymentStatus === 'paid').reduce((sum, order) => sum + order.total, 0);
  const latest = ECOMMERCE_SERIES[ECOMMERCE_SERIES.length - 1];
  const previous = ECOMMERCE_SERIES[ECOMMERCE_SERIES.length - 2];
  const funnel = ECOMMERCE_FUNNEL;
  const abandon = Math.round((1 - funnel[3].value / funnel[1].value) * 100);
  const returns = ECOMMERCE_SERIES.reduce((sum, item) => sum + item.returns, 0);
  const lowStock = products.filter((item) => item.stock <= 18).length;
  const outOfStock = products.filter((item) => item.stock === 0).length;
  const channelLatest = ECOMMERCE_CHANNELS[ECOMMERCE_CHANNELS.length - 1];
  const channelTotal = channelLatest.organic + channelLatest.paid + channelLatest.social + channelLatest.email;
  const channelCards = [
    { name: 'Organic', value: channelLatest.organic, color: primary },
    { name: 'Paid ads', value: channelLatest.paid, color: info },
    { name: 'Social', value: channelLatest.social, color: warning },
    { name: 'Email', value: channelLatest.email, color: success },
  ];
  const topChannel = [...channelCards].sort((a, b) => b.value - a.value)[0];
  const categorySales = categories.map((category, index) => ({
    name: category.name,
    value: products
      .filter((product) => product.categoryId === category.id)
      .reduce((sum, product) => sum + product.price * Math.max(12 - Math.min(product.stock, 10), 2), 0),
    fill: slices[index % slices.length],
  }));
  const gmvChange = formatPercentChange(latest.revenue, previous.revenue);

  return (
    <div className="c-page p-ecommerce">
      <PageHeader
        title="Ecommerce"
        crumbs={[{ label: 'Dashboards', to: '/dashboard' }, { label: 'Ecommerce' }]}
        actions={
          <>
            <DateRangePicker value={range} onChange={setRange} />
            <Button size="small" variant="outlined" onClick={() => navigate('/orders')}>
              Orders
            </Button>
            <Button size="small" variant="contained" onClick={() => navigate('/products')}>
              Catalog
            </Button>
          </>
        }
      />

      <div className="p-ecom-stats" aria-label="Store metrics">
        {[
          {
            label: 'GMV',
            value: formatCurrency(revenue),
            change: gmvChange,
            icon: <CurrencyRupeeOutlinedIcon fontSize="inherit" />,
            tone: 'primary',
            featured: true,
          },
          {
            label: 'Orders',
            value: String(latest.orders),
            change: formatPercentChange(latest.orders, previous.orders),
            icon: <ShoppingBagOutlinedIcon fontSize="inherit" />,
            tone: 'cyan',
          },
          {
            label: 'Conversion',
            value: `${latest.conversion}%`,
            change: formatPercentChange(latest.conversion, previous.conversion),
            icon: <PercentOutlinedIcon fontSize="inherit" />,
            tone: 'green',
          },
          {
            label: 'Visits',
            value: latest.visits.toLocaleString('en-IN'),
            change: formatPercentChange(latest.visits, previous.visits),
            icon: <VisibilityOutlinedIcon fontSize="inherit" />,
            tone: 'amber',
          },
        ].map((item) => (
          <article
            key={item.label}
            className={`p-ecom-kpi p-ecom-kpi--${item.tone}${item.featured ? ' is-featured' : ''}`}
          >
            <div className="p-ecom-kpi__top">
              <p className="p-ecom-kpi__label">{item.label}</p>
              <span className="p-ecom-kpi__icon" aria-hidden>
                {item.icon}
              </span>
            </div>
            <p className="p-ecom-kpi__value">{item.value}</p>
            <p className={`p-ecom-kpi__delta ${item.change?.startsWith('+') ? 'is-up' : item.change?.startsWith('-') ? 'is-down' : 'is-muted'}`}>
              {item.change ? `${item.change} MoM` : 'Live'}
            </p>
          </article>
        ))}
      </div>

      <section className="p-ecom-health" aria-label="Store health">
        <article className="p-ecom-health__card is-warn">
          <span className="p-ecom-health__icon" aria-hidden>
            <Inventory2OutlinedIcon fontSize="inherit" />
          </span>
          <div>
            <span className="p-ecom-health__label">Inventory risk</span>
            <strong>{lowStock}</strong>
            <p>{outOfStock} out of stock SKUs</p>
          </div>
        </article>
        <article className="p-ecom-health__card is-ok">
          <span className="p-ecom-health__icon" aria-hidden>
            <ShoppingCartCheckoutOutlinedIcon fontSize="inherit" />
          </span>
          <div>
            <span className="p-ecom-health__label">Checkout health</span>
            <strong>{100 - abandon}%</strong>
            <p>Cart to paid completion</p>
          </div>
        </article>
        <article className="p-ecom-health__card">
          <span className="p-ecom-health__icon" aria-hidden>
            <ReplayOutlinedIcon fontSize="inherit" />
          </span>
          <div>
            <span className="p-ecom-health__label">Return pressure</span>
            <strong>{returns}</strong>
            <p>Units returned across the series</p>
          </div>
        </article>
        <article className="p-ecom-health__card">
          <span className="p-ecom-health__icon" aria-hidden>
            <CampaignOutlinedIcon fontSize="inherit" />
          </span>
          <div>
            <span className="p-ecom-health__label">Top channel</span>
            <strong>{topChannel.name}</strong>
            <p>{Math.round((topChannel.value / channelTotal) * 100)}% of latest month</p>
          </div>
        </article>
      </section>

      <div className="p-ecom-split">
        <ChartCard title="Revenue & conversion" description="Store performance over time">
          <SwitchableChart
            data={ECOMMERCE_SERIES}
            xKey="month"
            height={280}
            defaultType="line"
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
              { dataKey: 'orders', name: 'Orders', color: info, yAxisId: 'left' },
              { dataKey: 'conversion', name: 'Conversion', color: warning, yAxisId: 'right' },
            ]}
          />
        </ChartCard>
        <ChartCard title="Sales by category" description="Catalog contribution">
          <SwitchableChart
            data={categorySales}
            xKey="name"
            height={280}
            defaultType="bar"
            yTickFormatter={formatInrK}
            formatter={(value) => formatCurrency(Number(value))}
            series={[{ dataKey: 'value', name: 'Sales', color: info }]}
          />
        </ChartCard>
      </div>

      <div className="p-ecom-mid">
        <section className="p-ecom-panel" aria-label="Channel mix">
          <header className="p-ecom-panel__head">
            <div>
              <h2>Channel mix</h2>
              <p>Latest month order share</p>
            </div>
            <strong className="p-ecom-panel__total">{channelTotal} orders</strong>
          </header>
          <ul className="p-ecom-channels">
            {channelCards.map((item) => {
              const share = Math.round((item.value / channelTotal) * 100);
              return (
                <li key={item.name}>
                  <div className="p-ecom-channels__row">
                    <span className="p-ecom-channels__dot" style={{ background: item.color }} aria-hidden />
                    <span className="p-ecom-channels__name">{item.name}</span>
                    <strong>{item.value}</strong>
                    <em>{share}%</em>
                  </div>
                  <span className="p-ecom-channels__track" aria-hidden>
                    <i style={{ width: `${share}%`, background: item.color }} />
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <ChartCard
          title="Best sellers"
          description="Top products by movement"
          action={
            <Button size="small" onClick={() => navigate('/products')}>
              Catalog
            </Button>
          }
        >
          <TopProducts products={products} orders={orders} variant="ranked" limit={4} />
        </ChartCard>
      </div>

      <div className="p-ecom-split p-ecom-split--wide">
        <ChartCard title="Orders by channel" description="Stacked acquisition mix">
          <SwitchableChart
            data={ECOMMERCE_CHANNELS}
            xKey="month"
            height={240}
            defaultType="bar"
            stacked
            series={[
              { dataKey: 'organic', name: 'Organic', color: primary },
              { dataKey: 'paid', name: 'Paid ads', color: info },
              { dataKey: 'social', name: 'Social', color: warning },
              { dataKey: 'email', name: 'Email', color: success },
            ]}
          />
        </ChartCard>
        <ChartCard title="Hourly orders" description="Order volume through the day">
          <SwitchableChart
            data={ECOMMERCE_HOURLY}
            xKey="hour"
            height={240}
            defaultType="line"
            showToggle={false}
            series={[{ dataKey: 'orders', name: 'Orders', color: error }]}
          />
        </ChartCard>
      </div>

      <section className="p-ecom-stock">
        <ChartCard
          title="Restock now"
          description="SKUs below safe stock"
          action={
            <Button size="small" onClick={() => navigate('/products')}>
              Inventory
            </Button>
          }
        >
          <LowStock products={products} />
        </ChartCard>
      </section>

      <div className="p-ecom-split">
        <ChartCard title="Payment mix" description="Checkout method share">
          <DonutChart data={PAYMENT_MIX} height={240} centerValue="UPI" centerLabel="top method" formatter={(value) => `${value}%`} />
        </ChartCard>
        <ChartCard title="GMV by city" description="Geographic demand">
          <SwitchableChart
            data={CITY_ORDERS}
            xKey="name"
            height={240}
            defaultType="bar"
            layout="vertical"
            categoryWidth={92}
            showToggle={false}
            yTickFormatter={formatInrK}
            formatter={(value) => formatCurrency(Number(value))}
            series={[{ dataKey: 'value', name: 'GMV', color: success }]}
          />
        </ChartCard>
      </div>
    </div>
  );
}
