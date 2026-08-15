import { Box, Button, Card, CardContent, Grid, MenuItem, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorState } from '../../components/common/ErrorState';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusChip } from '../../components/common/StatusChip';
import { useAppData } from '../../contexts/AppDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency, formatDateTime } from '../../utils/format';
import { uid } from '../../utils/format';

const STEPS = ['pending', 'processing', 'shipped', 'delivered'];

export function OrderDetails() {
  const { id } = useParams();
  const { orders, setOrders } = useAppData();
  const { hasPermission } = useAuth();
  const order = orders.find((item) => item.id === id);
  const navigate = useNavigate();

  if (!order) return <ErrorState title="Order not found" onRetry={() => navigate('/orders')} />;

  const activeStep = order.status === 'cancelled' ? -1 : STEPS.indexOf(order.status);

  const update = (patch) => {
    setOrders(
      orders.map((item) =>
        item.id === order.id
          ? {
              ...item,
              ...patch,
              timeline: patch.status
                ? [
                    ...item.timeline,
                    { id: uid('oe'), status: patch.status, note: `Status set to ${patch.status}`, createdAt: new Date().toISOString() },
                  ]
                : item.timeline,
            }
          : item,
      ),
    );
  };

  return (
    <>
      <PageHeader
        title={order.orderNumber}
        crumbs={[
          { label: 'Orders', to: '/orders' },
          { label: order.orderNumber },
        ]}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" component="h2" sx={{ mb: 2 }}>
                Order timeline
              </Typography>
              {order.status === 'cancelled' ? (
                <Typography color="error">This order was cancelled.</Typography>
              ) : (
                <Stepper activeStep={Math.max(activeStep, 0)} alternativeLabel sx={{ overflowX: 'auto', pb: 1 }}>
                  {STEPS.map((step) => (
                    <Step key={step} completed={STEPS.indexOf(step) <= activeStep}>
                      <StepLabel>{step}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              )}
              <Stack spacing={1.5} sx={{ mt: 2 }}>
                {[...order.timeline].reverse().map((event) => (
                  <Box key={event.id} component="article">
                    <Typography fontWeight={600}>{event.note}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {event.status} · {formatDateTime(event.createdAt)}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" component="h2" sx={{ mb: 2 }}>
                Items
              </Typography>
              <Stack component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {order.items.map((item) => (
                <Stack component="li" key={item.productId} direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 1 }}>
                  <Typography sx={{ minWidth: 0 }}>
                    {item.name} × {item.quantity}
                  </Typography>
                  <Typography sx={{ flexShrink: 0 }}>{formatCurrency(item.price * item.quantity)}</Typography>
                </Stack>
              ))}
              </Stack>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total {formatCurrency(order.total)}
              </Typography>
            </CardContent>
          </Card>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4} component="aside">
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary" component="h2" sx={{ display: 'block' }}>
                    Order status
                  </Typography>
                  <Box>
                    <StatusChip value={order.status} />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Payment
                  </Typography>
                  <Box>
                    <StatusChip value={order.paymentStatus} />
                  </Box>
                  <Typography variant="body2">{order.paymentMethod}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Shipping
                  </Typography>
                  <Typography>{order.shippingAddress}</Typography>
                </Box>
                {hasPermission('orders.edit') && (
                  <>
                    <TextField
                      select
                      label="Update status"
                      value={order.status}
                      onChange={(e) => update({ status: e.target.value })}
                    >
                      {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      label="Payment status"
                      value={order.paymentStatus}
                      onChange={(e) => update({ paymentStatus: e.target.value })}
                    >
                      {['pending', 'paid', 'failed', 'refunded'].map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </>
                )}
                <Button onClick={() => navigate(`/customers/${order.customerId}`)}>View customer</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
