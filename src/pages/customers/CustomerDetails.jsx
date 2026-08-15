import { Box, Button, Card, CardContent, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorState } from '../../components/common/ErrorState';
import { EmptyState } from '../../components/common/EmptyState';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusChip } from '../../components/common/StatusChip';
import { StatCard } from '../../components/common/StatCard';
import { SwitchableChart } from '../../components/common/SwitchableChart';
import { useAppData } from '../../contexts/AppDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency, formatDate, formatDateTime, formatRelative } from '../../utils/format';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

export function CustomerDetails() {
  const { id } = useParams();
  const { customers, orders, customerActivity } = useAppData();
  const { hasPermission } = useAuth();
  const customer = customers.find((item) => item.id === id);
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  if (!customer) {
    return <ErrorState title="Customer not found" onRetry={() => navigate('/customers')} />;
  }

  const customerOrders = orders.filter((order) => order.customerId === customer.id);
  const activity = customerActivity.filter((item) => item.customerId === customer.id);
  const delivered = customerOrders.filter((order) => order.status === 'delivered').length;
  const chart = customerOrders.map((order) => ({ name: order.orderNumber.slice(-4), total: order.total }));

  return (
    <>
      <PageHeader
        title={customer.name}
        crumbs={[
          { label: 'Customers', to: '/customers' },
          { label: customer.name },
        ]}
        actions={
          hasPermission('customers.edit') ? (
            <Button variant="contained" onClick={() => navigate(`/customers/${customer.id}/edit`)}>
              Edit customer
            </Button>
          ) : undefined
        }
      />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <StatCard title="Orders" value={String(customerOrders.length || customer.totalOrders)} icon={<ShoppingCartOutlinedIcon />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Lifetime value" value={formatCurrency(customer.totalSpent)} icon={<CurrencyRupeeIcon />} tone="teal" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Delivered" value={String(delivered)} icon={<LocalShippingOutlinedIcon />} tone="indigo" />
        </Grid>
      </Grid>
      <Card>
        <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto" aria-label="Customer sections" sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Details" />
          <Tab label="Orders" />
          <Tab label="Activity" />
          <Tab label="Statistics" />
        </Tabs>
        <CardContent>
          {tab === 0 && (
            <Grid container spacing={2}>
              {[
                ['Email', customer.email],
                ['Phone', customer.phone],
                ['Status', customer.status],
                ['Joined', formatDate(customer.joinedAt)],
                ['Last order', formatDate(customer.lastOrderAt)],
              ].map(([label, value]) => (
                <Grid item xs={12} sm={6} md={4} key={label}>
                  <Typography variant="caption" color="text.secondary">
                    {label}
                  </Typography>
                  {label === 'Status' ? <Box><StatusChip value={String(value)} /></Box> : <Typography>{value}</Typography>}
                </Grid>
              ))}
            </Grid>
          )}
          {tab === 1 && (
            <Stack spacing={1.5}>
              {customerOrders.length === 0 && <EmptyState title="No orders yet" />}
              {customerOrders.map((order) => (
                <Stack
                  key={order.id}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={1}
                  sx={{ cursor: 'pointer', py: 0.5 }}
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  <Box>
                    <Typography fontWeight={600}>{order.orderNumber}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDateTime(order.createdAt)}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
                    <Typography>{formatCurrency(order.total)}</Typography>
                    <StatusChip value={order.status} />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          )}
          {tab === 2 && (
            <Stack spacing={1.5}>
              {activity.length === 0 && <EmptyState title="No activity recorded" />}
              {activity.map((item) => (
                <Box key={item.id} component="article">
                  <Typography>{item.description}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.type} · {formatRelative(item.createdAt)}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
          {tab === 3 && (
            <Box>
              {chart.length === 0 ? (
                <EmptyState title="Not enough order data" />
              ) : (
                <SwitchableChart
                  data={chart}
                  xKey="name"
                  height={280}
                  defaultType="bar"
                  formatter={(value) => formatCurrency(Number(value))}
                  series={[{ dataKey: 'total', name: 'Total', color: '#4f46e5' }]}
                />
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
}
