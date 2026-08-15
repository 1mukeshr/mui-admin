import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, Tab, Tabs, TextField, Typography, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { SwitchableChart } from '../../components/common/SwitchableChart';
import { useAppData } from '../../contexts/AppDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { REVENUE_SERIES } from '../../data/seed';
import { exportCsv, exportPdf } from '../../utils/export';
import { formatCurrency, formatDate } from '../../utils/format';

const TABS = ['Sales', 'Revenue', 'Users', 'Products', 'Orders'];
const TYPES = ['sales', 'revenue', 'users', 'products', 'orders'];

export function Reports() {
  const { orders, products, customers } = useAppData();
  const { users, hasPermission } = useAuth();
  const { type } = useParams();
  const navigate = useNavigate();
  const tab = Math.max(0, TYPES.indexOf(type ?? 'sales'));
  const [from, setFrom] = useState('2026-07-01');
  const [to, setTo] = useState('2026-08-15');

  const filteredOrders = useMemo(
    () => orders.filter((order) => order.createdAt.slice(0, 10) >= from && order.createdAt.slice(0, 10) <= to),
    [from, orders, to],
  );

  const rows = useMemo(() => {
    if (tab === 0 || tab === 1) {
      return filteredOrders.map((order) => [order.orderNumber, order.customerName, order.total, order.status, formatDate(order.createdAt)]);
    }
    if (tab === 2) {
      return users.map((user) => [user.name, user.email, user.role, user.status, user.createdAt]);
    }
    if (tab === 3) {
      return products.map((product) => [product.name, product.sku, product.price, product.stock, product.status]);
    }
    return filteredOrders.map((order) => [order.orderNumber, order.paymentStatus, order.status, order.total, formatDate(order.createdAt)]);
  }, [filteredOrders, products, tab, users]);

  const headers = useMemo(() => {
    if (tab === 2) return ['Name', 'Email', 'Role', 'Status', 'Created'];
    if (tab === 3) return ['Product', 'SKU', 'Price', 'Stock', 'Status'];
    if (tab === 4) return ['Order', 'Payment', 'Status', 'Total', 'Date'];
    return ['Order', 'Customer', 'Total', 'Status', 'Date'];
  }, [tab]);

  const canExport = hasPermission('reports.export');

  return (
    <>
      <PageHeader
        title="Reports"
        actions={
          canExport ? (
            <Stack direction="row" spacing={1}>
              <Button onClick={() => exportCsv(`${TABS[tab].toLowerCase()}-report.csv`, headers, rows)}>Export CSV</Button>
              <Button variant="contained" onClick={() => exportPdf(`${TABS[tab].toLowerCase()}-report.pdf`, `${TABS[tab]} report`, headers, rows)}>
                Export PDF
              </Button>
            </Stack>
          ) : undefined
        }
      />
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'flex-end' }}>
            <TextField size="small" label="From" type="date" value={from} onChange={(e) => setFrom(e.target.value)} InputLabelProps={{ shrink: true }} />
            <TextField size="small" label="To" type="date" value={to} onChange={(e) => setTo(e.target.value)} InputLabelProps={{ shrink: true }} />
            <FormControl>
              <FormLabel>Range</FormLabel>
              <RadioGroup
                row
                value={from === '2026-07-16' && to === '2026-08-15' ? '30' : 'custom'}
                onChange={(e) => {
                  if (e.target.value === '30') {
                    setFrom('2026-07-16');
                    setTo('2026-08-15');
                  }
                }}
              >
                <FormControlLabel value="custom" control={<Radio />} label="Custom" />
                <FormControlLabel value="30" control={<Radio />} label="Last 30 days" />
              </RadioGroup>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>
      <Card>
        <Tabs value={tab} onChange={(_, value) => navigate(`/reports/${TYPES[value]}`)} variant="scrollable" scrollButtons="auto">
          {TABS.map((label) => (
            <Tab key={label} label={`${label} report`} />
          ))}
        </Tabs>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <BoxChart tab={tab} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Summary
              </Typography>
              <Typography variant="body2">Orders in range: {filteredOrders.length}</Typography>
              <Typography variant="body2">
                Revenue: {formatCurrency(filteredOrders.filter((o) => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0))}
              </Typography>
              <Typography variant="body2">Users: {users.length}</Typography>
              <Typography variant="body2">Products: {products.length}</Typography>
              <Typography variant="body2">Customers: {customers.length}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

function BoxChart({ tab }) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const series =
    tab === 2
      ? [{ dataKey: 'users', name: 'Users', color: '#10b981' }]
      : tab === 3
        ? [{ dataKey: 'sales', name: 'Units', color: '#f59e0b' }]
        : [{ dataKey: tab === 0 ? 'sales' : 'revenue', name: tab === 0 ? 'Sales' : 'Revenue', color: primary }];

  return (
    <SwitchableChart
      data={REVENUE_SERIES}
      xKey="month"
      height={280}
      defaultType={tab === 3 ? 'bar' : 'line'}
      formatter={(value) => (tab === 1 ? formatCurrency(Number(value)) : String(value))}
      series={series}
    />
  );
}
