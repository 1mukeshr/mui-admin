import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../components/common/DataTable';
import { FilterBar } from '../../components/common/FilterBar';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchField } from '../../components/common/SearchField';
import { StatusChip } from '../../components/common/StatusChip';
import { useAppData } from '../../contexts/AppDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { exportCsv } from '../../utils/export';
import { formatCurrency, formatDateTime } from '../../utils/format';

export function OrdersList() {
  const { orders } = useAppData();
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [payment, setPayment] = useState('all');

  const filtered = useMemo(
    () =>
      orders.filter((order) => {
        const matchesQuery = [order.orderNumber, order.customerName].some((value) =>
          value.toLowerCase().includes(query.toLowerCase()),
        );
        return matchesQuery && (status === 'all' || order.status === status) && (payment === 'all' || order.paymentStatus === payment);
      }),
    [orders, payment, query, status],
  );

  const columns = useMemo(
    () => [
      { id: 'orderNumber', label: 'Order', sortable: true, hideable: false, minWidth: 130 },
      { id: 'customerName', label: 'Customer', sortable: true, minWidth: 160 },
      {
        id: 'total',
        label: 'Total',
        sortable: true,
        align: 'right',
        minWidth: 110,
        render: (order) => formatCurrency(order.total),
      },
      {
        id: 'items',
        label: 'Items',
        sortable: true,
        align: 'right',
        minWidth: 80,
        getValue: (order) => order.items.reduce((sum, item) => sum + item.quantity, 0),
      },
      {
        id: 'status',
        label: 'Status',
        sortable: true,
        minWidth: 120,
        render: (order) => <StatusChip value={order.status} />,
      },
      {
        id: 'paymentStatus',
        label: 'Payment',
        sortable: true,
        minWidth: 120,
        render: (order) => <StatusChip value={order.paymentStatus} />,
      },
      { id: 'paymentMethod', label: 'Method', sortable: true, minWidth: 120 },
      {
        id: 'createdAt',
        label: 'Created',
        sortable: true,
        minWidth: 160,
        render: (order) => formatDateTime(order.createdAt),
      },
    ],
    [],
  );

  const exportOrders = () => {
    exportCsv(
      'orders.csv',
      ['Order', 'Customer', 'Total', 'Status', 'Payment', 'Created'],
      filtered.map((order) => [order.orderNumber, order.customerName, order.total, order.status, order.paymentStatus, order.createdAt]),
    );
  };

  return (
    <Box className="c-page p-orders">
      <PageHeader
        title="Orders"
        actions={
          hasPermission('orders.export') ? (
            <Button startIcon={<FileDownloadOutlinedIcon />} onClick={exportOrders}>
              Export CSV
            </Button>
          ) : undefined
        }
      />
      <Card>
        <DataTable
          id="orders"
          rows={filtered}
          columns={columns}
          getRowId={(order) => order.id}
          onRowClick={(order) => navigate(`/orders/${order.id}`)}
          filterKey={`${query}|${status}|${payment}`}
          defaultSort={{ key: 'createdAt', dir: 'desc' }}
          defaultHidden={['items', 'paymentMethod']}
          emptyTitle="No orders found"
          toolbar={
            <FilterBar>
              <SearchField
                placeholder="Search order or customer"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 160 } }}>
                <InputLabel>Order status</InputLabel>
                <Select label="Order status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 160 } }}>
                <InputLabel>Payment</InputLabel>
                <Select label="Payment" value={payment} onChange={(e) => setPayment(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  {['pending', 'paid', 'failed', 'refunded'].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FilterBar>
          }
        />
      </Card>
    </Box>
  );
}
